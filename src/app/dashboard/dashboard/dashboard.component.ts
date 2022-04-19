/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { BasketService } from '../../basket.service';
import { OpenPolicyAgentService } from '../../open-policy-agent.service';
import { Subscription } from 'rxjs';
import { ResizeService } from '../resize.service';

@Component({
    selector: 'aether-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['../../common-profiles.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
    innerWidth: number = window.innerWidth;
    innerHeight: number = window.innerHeight;
    private resizeSubscription: Subscription;

    constructor(
        private basketService: BasketService,
        public opaService: OpenPolicyAgentService,
        private resizeService: ResizeService
    ) {}

    ngOnInit(): void {
        this.resizeSubscription = this.resizeService.onResize$.subscribe(
            (window) => {
                this.innerWidth = window.innerWidth;
                this.innerHeight = window.innerHeight;
            }
        );
    }

    ngOnDestroy(): void {
        if (this.resizeSubscription) {
            this.resizeSubscription.unsubscribe();
        }
    }
}
