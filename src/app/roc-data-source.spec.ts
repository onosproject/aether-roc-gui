/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { RocDataSource } from './roc-data-source';
import { SliceDatasource } from './aether-slice/slice/slice-datasource';
import { Service } from '../openapi3/aether/2.0.0/services';
import { ApiConfiguration } from '../openapi3/aether/2.0.0/api-configuration';
import { BasketService } from './basket.service';
import { AETHER_TARGET } from '../environments/environment';
import {
    Enterprises,
    EnterprisesEnterpriseApplication,
    EnterprisesEnterpriseSiteSlice,
} from '../openapi3/aether/2.0.0/models';
import { SiteDatasource } from './aether-site/site/site-datasource';
import { EnterpriseDatasource } from './aether-enterprise/enterprise/enterprise-datasource';
import { Elements } from '../openapi3/top/level/models/elements';
import { Element } from '@angular/compiler';
import { slice } from 'lodash';

describe('ROC Data Source', () => {
    let component: RocDataSource<EnterprisesEnterpriseSiteSlice, Enterprises>;

    beforeEach(() => {
        component = new SliceDatasource(
            new Service(
                new ApiConfiguration(),
                jasmine.createSpyObj('HttpClient', ['post', 'get'])
            ),
            new BasketService(),
            AETHER_TARGET
        );
    });

    describe('the fullPath method', function () {
        it('should create a full path from slice', () => {
            const fp = component.fullPath('ent1', 'site1', 'slice1');
            expect(fp).toEqual(
                'Enterprises-2.0.0/enterprise[enterprise-id=ent1]/site[site-id=site1]/slice[slice-id=slice1]'
            );
        });

        it('should create a delete path from slice', () => {
            const fp = component.deletePath('ent1', 'site1', 'slice1');
            expect(fp).toEqual(
                '/Enterprises-2.0.0/enterprise[enterprise-id=ent1]/site[site-id=site1]/slice[slice-id=slice1]/slice-id'
            );
        });

        it('should create a path from Site', () => {
            const siteComponent = new SiteDatasource(
                new Service(
                    new ApiConfiguration(),
                    jasmine.createSpyObj('HttpClient', ['post', 'get'])
                ),
                new BasketService(),
                AETHER_TARGET
            );
            const fp = siteComponent.fullPath('ent1', 'site1');
            expect(fp).toEqual(
                'Enterprises-2.0.0/enterprise[enterprise-id=ent1]/site[site-id=site1]'
            );
        });

        it('should create a path from Enterprise', () => {
            const entComponent = new EnterpriseDatasource(
                new Service(
                    new ApiConfiguration(),
                    jasmine.createSpyObj('HttpClient', ['post', 'get'])
                ),
                new BasketService(),
                AETHER_TARGET
            );
            const fp = entComponent.fullPath('ent1');
            expect(fp).toEqual(
                'Enterprises-2.0.0/enterprise[enterprise-id=ent1]'
            );
        });
    });

    describe('the hasUpdates method', () => {
        // this test uses the Application Model as an example,
        // it doesn't really matter which model we are using since
        // hasUpdates is a pure function
        let existingModels: EnterprisesEnterpriseApplication[] = [];
        const applicationModelPath: string[] = [
            'Enterprises-2.0.0',
            'enterprise',
            'application',
            'application-id',
        ];
        beforeEach(() => {
            existingModels = [
                {
                    'application-id': 'app-1',
                    'enterprise-id': 'test-enterprise',
                    address: 'app-1-address',
                },
                {
                    'application-id': 'app-2',
                    'enterprise-id': 'test-enterprise',
                    address: 'app-2-address',
                },
            ];
        });
        const basket: Elements = {
            'Enterprises-2.0.0': {
                enterprise: [
                    {
                        'enterprise-id': 'test-enterprise',
                        application: [
                            {
                                'application-id': 'app-1',
                                address: 'app-1-address-updated',
                            },
                        ],
                    },
                ],
            },
        };
        it('should return true if a model has updates in the basked', () => {
            // put some updates for app1 in the basket

            const [hasUpdates, updatedModel] = component.hasUpdates(
                basket,
                applicationModelPath,
                existingModels[0]
            );
            expect(hasUpdates).toBeTruthy();
            const updatedApplication =
                updatedModel as EnterprisesEnterpriseApplication;
            expect(updatedApplication).toEqual({
                'application-id': 'app-1',
                address: 'app-1-address-updated',
            });
        });
    });

    describe('the merge method', function () {
        // this represents the existing data
        const existingItems: EnterprisesEnterpriseSiteSlice[] = [
            {
                'slice-id': 'slice1',
                'default-behavior': 'DENY',
                enterprise: 'onf',
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
            'Enterprises-2.0.0': {
                enterprise: [
                    {
                        'enterprise-id': 'test-enterprise',
                        site: [
                            {
                                'site-id': 'test-site',
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
                                                'device-group':
                                                    'acme-chicago-default',
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
                    },
                ],
            },
        };

        const sliceModelPath = [
            'Enterprises-2.0.0',
            'enterprise',
            'site',
            'slice',
            'slice-id',
        ];

        it('should combine basic fields from the basket with basic fields in the datasource', () => {
            component.data = existingItems;
            component.merge(basketItems, component.data, sliceModelPath, [
                { fieldName: 'filter', idAttr: 'application' },
                { fieldName: 'device-group', idAttr: 'device-group' },
            ]);
            const updatedSlice = component.data[0];
            const basketSlice =
                basketItems['Enterprises-2.0.0'].enterprise[0].site[0].slice[0];
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
            const basketSlice =
                basketItems['Enterprises-2.0.0'].enterprise[0].site[0].slice[0];
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
            const basketSlice =
                basketItems['Enterprises-2.0.0'].enterprise[0].site[0].slice[0];

            expect(updatedSlice['device-group'].length).toBe(3);
            expect(updatedSlice['device-group'][0].enable).toBeTrue();
        });
    });
});
