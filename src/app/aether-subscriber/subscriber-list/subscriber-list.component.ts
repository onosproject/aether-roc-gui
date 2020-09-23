/*
 * SPDX-FileCopyrightText: 2020-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {Component, OnInit} from '@angular/core';
import {ApiService as ApiServiceRbac} from '../../../openapi3/rbac/1.0.0/services/api.service';
import {ApiService as ApiServiceAether} from '../../../openapi3/aether/1.0.0/services/api.service';
import {AetherV100TargetAccessProfileService} from '../../../openapi3/aether/1.0.0/services/aether-v-100-target-access-profile.service';

@Component({
    selector: 'aether-subscriber-list',
    templateUrl: './subscriber-list.component.html',
    styleUrls: ['./subscriber-list.component.scss']
})
export class SubscriberListComponent implements OnInit {

    constructor(
        private apiServiceRbac: ApiServiceRbac,
        private apiServiceAether: ApiServiceAether,
        private aetherV100TargetAccessProfileService: AetherV100TargetAccessProfileService,
    ) {
        const target = 'spgw-1';
        const apId = 'profile1';
        aetherV100TargetAccessProfileService.getAetherV100TargetAccessProfileAccessProfile({
            id: apId,
            target
        }).subscribe(
            (value => {
                console.log('Got the Access Profile for Target: ', target, ' Access Profile: ', apId, 'Value', value);
            }),
            error => {
                console.log('Error getting Access Profile:', apId, 'for Target: ', target, '. Error: ', error);
            }
        );
    }

    ngOnInit(): void {
    }

}
