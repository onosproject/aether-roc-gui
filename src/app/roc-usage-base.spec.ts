/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { RocUsageBase, UsageColumns } from './roc-usage-base';
import { ShowVcsUsageComponent } from './aether-device-group/show-vcs-usage/show-vcs-usage.component';

describe('Roc Usage Base', () => {
    let component: RocUsageBase;

    beforeEach(() => {
        // Using the Device Group Usage panel
        component = new ShowVcsUsageComponent(
            undefined,
            undefined,
            undefined,
            undefined
        );
    });

    it('should create an instance', () => {
        expect(component).toBeTruthy();
    });

    it('should give display-columns', () => {
        expect(component.displayColumns.length).toEqual(3);
    });

    it('should calculate route', () => {
        const sampleRow = {
            type: 'Slice',
            'attr-names': ['enterprise', 'site', 'slice'],
            ids: ['ent-1', 'site-1', 'slice-1'],
            route: '/slice/slice-edit',
            'display-name': 'Slice 1',
        } as UsageColumns;
        expect(component.routeCalc(sampleRow)).toEqual(
            '/slice/slice-edit/ent-1/site-1/slice-1'
        );
    });
});
