/*
 * SPDX-FileCopyrightText: 2020-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {Component, Input, OnInit} from '@angular/core';
import {ApiService as ApiServiceRbac} from '../../../openapi3/rbac/1.0.0/services/api.service';
import {ApiService as ApiServiceAether} from '../../../openapi3/aether/1.0.0/services/api.service';
import {AetherV100TargetService} from '../../../openapi3/aether/1.0.0/services';
import {from} from 'rxjs';
import {mergeMap} from 'rxjs/operators';
import {
    AetherV100TargetApnProfile,
    AetherV100TargetApnProfileApnProfile,
    AetherV100TargetQosProfile,
    AetherV100TargetQosProfileQosProfile,
    AetherV100TargetAccessProfile,
    AetherV100TargetAccessProfileAccessProfile,
    AetherV100TargetUpProfile,
    AetherV100TargetUpProfileUpProfile,
    AetherV100TargetSubscriber,
    AetherV100TargetSubscriberUe,
} from '../../../openapi3/aether/1.0.0/models';

@Component({
    selector: 'aether-subscriber-list',
    templateUrl: './subscriber-list.component.html',
    styleUrls: ['./subscriber-list.component.scss']
})
export class SubscriberListComponent implements OnInit {
    @Input() targets: string[] = ['spgw-1'];

    accessProfiles: Map<string, AetherV100TargetAccessProfileAccessProfile> = new Map();
    qosProfiles: Map<string, AetherV100TargetQosProfileQosProfile> = new Map();
    apnProfiles: Map<string, AetherV100TargetApnProfileApnProfile> = new Map();
    upProfiles: Map<string, AetherV100TargetUpProfileUpProfile> = new Map();
    subscriberUes: Map<string, AetherV100TargetSubscriberUe> = new Map();

    constructor(
        private apiServiceRbac: ApiServiceRbac,
        private apiServiceAether: ApiServiceAether,
        private aetherV100TargetService: AetherV100TargetService,
    ) {
    }

    ngOnInit(): void {
        this.loadAccessProfiles();
        this.loadQosProfiles();
        this.loadApnProfiles();
        this.loadUpProfiles();
        this.loadSubscriberUe();
    }

    loadAccessProfiles(): void {
        this.aetherV100TargetService.getAetherV100TargetAccessProfile({
            target: this.targets[0]
        })
            .pipe(
                mergeMap((items: AetherV100TargetAccessProfile) => from(items.ListAetherV100targetAccessProfileAccessProfile))
            )
            .subscribe(
                (value => {
                    this.accessProfiles.set(value.id, value);
                }),
                error => {
                    console.warn('Error getting Access Profiles for ', this.targets, error);
                }
            );
    }

    loadQosProfiles(): void {
        this.aetherV100TargetService.getAetherV100TargetQosProfile({
            target: this.targets[0]
        })
            .pipe(
                mergeMap((items: AetherV100TargetQosProfile) => from(items.ListAetherV100targetQosProfileQosProfile))
            )
            .subscribe(
                (value => {
                    this.qosProfiles.set(value.id, value);
                }),
                error => {
                    console.warn('Error getting Qos Profiles for ', this.targets, error);
                }
            );
    }

    loadApnProfiles(): void {
        this.aetherV100TargetService.getAetherV100TargetApnProfile({
            target: this.targets[0]
        })
            .pipe(
                mergeMap((items: AetherV100TargetApnProfile) => from(items.ListAetherV100targetApnProfileApnProfile))
            )
            .subscribe(
                (value => {
                    this.apnProfiles.set(value.id, value);
                }),
                error => {
                    console.warn('Error getting Apn Profiles for ', this.targets, error);
                }
            );
    }

    loadUpProfiles(): void {
        this.aetherV100TargetService.getAetherV100TargetUpProfile({
            target: this.targets[0]
        })
            .pipe(
                mergeMap((items: AetherV100TargetUpProfile) => from(items.ListAetherV100targetUpProfileUpProfile))
            )
            .subscribe(
                (value => {
                    this.upProfiles.set(value.id, value);
                }),
                error => {
                    console.warn('Error getting Up Profiles for ', this.targets, error);
                }
            );
    }

    loadSubscriberUe(): void {
        this.aetherV100TargetService.getAetherV100TargetSubscriber({
            target: this.targets[0]
        })
            .pipe(
                mergeMap((items: AetherV100TargetSubscriber) => from(items.ListAetherV100targetSubscriberUe))
            )
            .subscribe(
                (value => {
                    this.subscriberUes.set(value.ueid, value);
                }),
                error => {
                    console.warn('Error getting Up Profiles for ', this.targets, error);
                }
            );
    }
}
