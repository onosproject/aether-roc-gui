/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { RocDataSource } from './roc-data-source';
import { SliceDatasource } from './aether-slice/slice/slice-datasource';
import { SiteDatasource } from './aether-site/site/site-datasource';
import { Elements } from '../openapi3/top/level/models';
import { SiteSlice, SiteList } from '../openapi3/aether/2.1.0/models';
import { sliceModelPath } from './models-info';

describe('ROC Data Source', () => {
    let component: RocDataSource<SiteSlice, SiteList>;

    const basketService = jasmine.createSpyObj('mockBasketService', [
        'containsDeleteEntry',
    ]);

    const enterpriseService = jasmine.createSpyObj('mockEnterpriseService', [
        'enterprises',
    ]);
    beforeEach(() => {
        component = new SliceDatasource(enterpriseService, basketService);
    });

    describe('the fullPath method', () => {
        it('should create a full path from slice', () => {
            const fp = component.fullPath('ent1', 'site1', 'slice1');
            expect(fp).toEqual(
                'enterprise-id/ent1/site-2.1.0[site-id=site1]/slice[slice-id=slice1]'
            );
        });

        it('should create a delete path from slice', () => {
            const fp = component.deletePath('ent1', 'site1', 'slice1');
            expect(fp).toEqual(
                '/enterprise-id/ent1/site-2.1.0[site-id=site1]/slice[slice-id=slice1]/slice-id'
            );
        });

        it('should create a path from Site', () => {
            const siteComponent = new SiteDatasource(
                enterpriseService,
                basketService
            );
            const fp = siteComponent.fullPath('ent1', 'site1');
            expect(fp).toEqual('enterprise-id/ent1/site-2.1.0[site-id=site1]');
        });
    });

    describe('the hasUpdates method', () => {
        // this test uses the Application Model as an example,
        // it doesn't really matter which model we are using since
        // hasUpdates is a pure function
        let existingModels: SiteSlice[] = [];
        const sliceModelPath: string[] = ['site-2.1.0', 'slice', 'slice-id'];
        beforeEach(() => {
            existingModels = [
                {
                    'slice-id': 'slice-1',
                    'enterprise-id': 'test-enterprise',
                    sd: 11,
                    sst: 12,
                    'default-behavior': 'ALLOW-ALL',
                },
                {
                    'slice-id': 'slice-2',
                    'enterprise-id': 'test-enterprise',
                    sd: 21,
                    sst: 22,
                    'default-behavior': 'DENY-ALL',
                },
            ];
        });
        const basket: Elements = {
            'site-2.1.0': [
                {
                    'site-id': 'site-1',
                    'additional-properties': {
                        'enterprise-id': 'test-enterprise',
                    },
                    slice: [
                        {
                            'slice-id': 'slice-1',
                            sd: 11,
                            sst: 12,
                            'default-behavior': 'DENY-ALL',
                        },
                        {
                            'slice-id': 'slice-2',
                            sd: 21,
                            sst: 22,
                            'default-behavior': 'ALLOW-ALL',
                        },
                    ],
                },
            ],
        } as Elements;
        it('should return true if a model has updates in the basket', () => {
            // put some updates for site-1 in the basket

            const [hasUpdates, updatedModel] = component.hasUpdates(
                basket,
                sliceModelPath,
                existingModels[0]
            );
            expect(hasUpdates).toBeTruthy();
            const updatedSite = updatedModel as SiteSlice;
            expect(updatedSite).toEqual({
                'slice-id': 'slice-1',
                sd: 11,
                sst: 12,
                'default-behavior': 'DENY-ALL',
            });
        });
    });

    describe('the merge method', () => {
        // this represents the existing data
        const existingItems: SiteSlice[] = [
            {
                'slice-id': 'slice1',
                'default-behavior': 'DENY',
                sd: 1,
                site: 'menlo',
                sst: 1,
                mbr: {
                    'uplink-burst-size': 10,
                    'downlink-burst-size': 10,
                    uplink: 10,
                },
                'device-group': [
                    {
                        'device-group': 'acme-chicago-default', // this is the ID, must match with below
                        enable: false,
                    },
                    {
                        'device-group': 'acme-chicago-not-updated',
                        enable: true,
                    },
                ],
            },
        ];

        // this represents the updated data in the basket (id must match)
        const basketItems: Elements = {
            'site-2.1.0': [
                {
                    'site-id': 'test-site',
                    additionalProperty: {
                        'enterprise-id': 'ent-1',
                    },
                    slice: [
                        {
                            'slice-id': 'slice1',
                            'default-behavior': 'ALLOW-ALL',
                            sd: 22,
                            sst: 12,
                            enterprise: 'onf-updated',
                            site: 'menlo-updated',

                            // optional data
                            description: 'updated-descr',
                            mbr: {
                                'uplink-burst-size': 30,
                                downlink: 30,
                            },
                            'device-group': [
                                {
                                    'device-group': 'acme-chicago-default',
                                    enable: true,
                                },
                                {
                                    'device-group': 'a-new-group',
                                    enable: true,
                                },
                            ],
                        },
                    ],
                },
            ],
        };

        it('should combine basic fields from the basket with basic fields in the datasource', () => {
            component.data = existingItems;
            component.merge(basketItems, component.data, sliceModelPath, [
                { fieldName: 'filter', idAttr: 'site' },
                { fieldName: 'device-group', idAttr: 'device-group' },
            ]);
            const updatedSlice = component.data[0];
            const basketSlice = basketItems['site-2.1.0'][0].slice[0];
            expect(updatedSlice['default-behavior']).toEqual(
                basketSlice['default-behavior']
            );
            expect(updatedSlice.enterprise).toEqual(basketSlice.enterprise);
            expect(updatedSlice.sd).toEqual(basketSlice.sd);
            expect(updatedSlice.site).toEqual(basketSlice.site);
            expect(updatedSlice.sst).toEqual(basketSlice.sst);
        });

        it('should combine nested fields from the basked with nested fields in the datasource', () => {
            component.data = existingItems;
            component.merge(basketItems, component.data, sliceModelPath, [
                { fieldName: 'filter', idAttr: 'application' },
                { fieldName: 'device-group', idAttr: 'device-group' },
            ]);
            const updatedSlice = component.data[0];
            expect(updatedSlice.mbr.uplink).toEqual(10); // this field was not updated
            expect(updatedSlice.mbr['downlink-burst-size']).toEqual(10); // this field was not updated
            expect(updatedSlice.mbr['uplink-burst-size']).toEqual(30); // this field was updated
            expect(updatedSlice.mbr.downlink).toEqual(30); // this field was added
        });

        it('should combine nested list from the basket with nested lists in the datasource', () => {
            component.data = existingItems;
            component.merge(basketItems, component.data, sliceModelPath, [
                { fieldName: 'filter', idAttr: 'application' },
                { fieldName: 'device-group', idAttr: 'device-group' },
            ]);
            const updatedSlice = component.data[0];

            expect(updatedSlice['device-group'].length).toBe(3);
            expect(updatedSlice['device-group'][0].enable).toBeTrue();
        });
    });
});
