/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */

import { RocDataSource } from './roc-data-source';
import { Vcs } from '../openapi3/aether/2.0.0/models/vcs';
import { VcsDatasource } from './aether-vcs/vcs/vcs-datasource';
import { Service } from '../openapi3/aether/2.0.0/services';
import { ApiConfiguration } from '../openapi3/aether/2.0.0/api-configuration';
import { BasketService } from './basket.service';
import { AETHER_TARGETS } from '../environments/environment';
import { EnterpriseEnterpriseSiteVcs } from '../openapi3/aether/2.0.0/models/enterprise-enterprise-site-vcs';

describe('ROC Data Source', () => {
    let component: RocDataSource<EnterpriseEnterpriseSiteVcs, Vcs>;

    // this represents the existing data
    const existingItems: EnterpriseEnterpriseSiteVcs[] = [
        {
            'vcs-id': 'vcs1',
            'default-behavior': 'DENY',
            enterprise: 'onf',
            sd: 1,
            site: 'menlo',
            sst: 1,
            'device-group': [
                {
                    'device-group': 'acme-chicago-default', // this is the ID, must match with below
                    enable: false,
                },
            ],
        },
    ];

    // this represents the updated data in the basket (id must match)
    const basketItems: EnterpriseEnterpriseSiteVcs[] = [
        {
            'vcs-id': 'vcs1',
            'default-behavior': 'DENY-updated',
            enterprise: 'onf-updated',
            sd: 2,
            site: 'menlo-updated',
            sst: 2,

            // optional data
            description: 'updated-descr',
            slice: {
                mbr: {
                    'uplink-burst-size': 30,
                    'downlink-burst-size': 40,
                    uplink: 20,
                },
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
        component = new VcsDatasource(
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
            const updatedVcs = component.data[0];
            const basketVcs = basketItems[0];
            expect(updatedVcs['default-behavior']).toEqual(
                basketVcs['default-behavior']
            );
            expect(updatedVcs.enterprise).toEqual(basketVcs.enterprise);
            expect(updatedVcs.sd).toEqual(basketVcs.sd);
            expect(updatedVcs.site).toEqual(basketVcs.site);
            expect(updatedVcs.sst).toEqual(basketVcs.sst);
        });

        it('should combine nested fields from the basked with nested fields in the datasource', () => {
            component.data = existingItems;
            component.merge(basketItems, [
                { fieldName: 'filter', idAttr: 'application' },
                { fieldName: 'device-group', idAttr: 'device-group' },
            ]);
            const updatedVcs = component.data[0];
            const basketVcs = basketItems[0];
            expect(updatedVcs.slice.mbr).toEqual(basketVcs.slice.mbr);
        });

        it('should combine nested list from the basket with nested lists in the datasource', () => {
            component.data = existingItems;
            component.merge(basketItems, [
                { fieldName: 'filter', idAttr: 'application' },
                { fieldName: 'device-group', idAttr: 'device-group' },
            ]);
            const updatedVcs = component.data[0];
            const basketVcs = basketItems[0];
            expect(updatedVcs.slice.mbr.downlink).toEqual(
                basketVcs.slice.mbr.downlink
            );
            expect(updatedVcs.slice.mbr.uplink).toEqual(
                basketVcs.slice.mbr.uplink
            );
            expect(updatedVcs.slice.mbr['downlink-burst-size']).toEqual(
                basketVcs.slice.mbr['downlink-burst-size']
            );
            expect(updatedVcs.slice.mbr['uplink-burst-size']).toEqual(
                basketVcs.slice.mbr['uplink-burst-size']
            );

            expect(updatedVcs['device-group'].length).toBe(2);
            expect(updatedVcs['device-group'][0].enable).toBeTrue();
        });
    });
});
