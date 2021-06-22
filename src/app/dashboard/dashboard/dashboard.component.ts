/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {Component, OnInit} from '@angular/core';
import {Service as AetherService} from '../../../openapi3/aether/3.0.0/services/service';
import {BasketService} from '../../basket.service';
import {OpenPolicyAgentService} from '../../open-policy-agent.service';

@Component({
    selector: 'aether-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['../../common-profiles.component.scss']
})
export class DashboardComponent implements OnInit {

    constructor(
        private aetherService: AetherService,
        private basketService: BasketService,
        public opaService: OpenPolicyAgentService,
    ) {
    }

    ngOnInit(): void {
    }

}
