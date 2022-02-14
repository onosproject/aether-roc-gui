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
import { AETHER_TARGETS } from '../environments/environment';
import { EnterprisesEnterpriseSiteSlice } from '../openapi3/aether/2.0.0/models';

describe('ROC Data Source', () => {
    let component: RocDataSource<EnterprisesEnterpriseSiteSlice, any>;

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
                'uplink-burst-size': 30,
                'downlink-burst-size': 40,
                uplink: 20,
            },
            'device-group': [
                {
                    'device-group': 'acme-chicago-default', // this is the ID, must match with below
                    enable: false,
                },
            ],
        },
    ];

    // this represents the updated data in the basket (id must match)
    const basketItems: EnterprisesEnterpriseSiteSlice[] = [
        {
            'slice-id': 'slice1',
            'default-behavior': 'DENY-updated',
            enterprise: 'onf-updated',
            sd: 2,
            site: 'menlo-updated',
            sst: 2,

            // optional data
            description: 'updated-descr',
            mbr: {
                'uplink-burst-size': 30,
                'downlink-burst-size': 40,
                uplink: 20,
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
    ];

    beforeEach(() => {
        component = new SliceDatasource(
            new Service(
                new ApiConfiguration(),
                jasmine.createSpyObj('HttpClient', ['post', 'get'])
            ),
            new BasketService(),
            AETHER_TARGETS[0]
        );
    });

    describe('the merge method', function () {
        it('should combine basic fields from the basket with basic fields in the datasource', () => {
            component.data = existingItems;
            component.merge(basketItems, [
                { fieldName: 'filter', idAttr: 'application' },
                { fieldName: 'device-group', idAttr: 'device-group' },
            ]);
            const updatedSlice = component.data[0];
            const basketSlice = basketItems[0];
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
            component.merge(basketItems, [
                { fieldName: 'filter', idAttr: 'application' },
                { fieldName: 'device-group', idAttr: 'device-group' },
            ]);
            const updatedSlice = component.data[0];
            const basketSlice = basketItems[0];
            expect(updatedSlice.mbr).toEqual(basketSlice.mbr);
        });

        it('should combine nested list from the basket with nested lists in the datasource', () => {
            component.data = existingItems;
            component.merge(basketItems, [
                { fieldName: 'filter', idAttr: 'application' },
                { fieldName: 'device-group', idAttr: 'device-group' },
            ]);
            const updatedSlice = component.data[0];
            const basketSlice = basketItems[0];
            expect(updatedSlice.mbr.downlink).toEqual(basketSlice.mbr.downlink);
            expect(updatedSlice.mbr.uplink).toEqual(basketSlice.mbr.uplink);
            expect(updatedSlice.mbr['downlink-burst-size']).toEqual(
                basketSlice.mbr['downlink-burst-size']
            );
            expect(updatedSlice.mbr['uplink-burst-size']).toEqual(
                basketSlice.mbr['uplink-burst-size']
            );

            expect(updatedSlice['device-group'].length).toBe(2);
            expect(updatedSlice['device-group'][0].enable).toBeTrue();
        });
    });
});
