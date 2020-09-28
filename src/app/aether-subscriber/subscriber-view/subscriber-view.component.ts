/*
 * SPDX-FileCopyrightText: 2020-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */

import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AetherV100TargetSubscriberUe} from '../../../openapi3/aether/1.0.0/models/aether-v-100-target-subscriber-ue';

@Component({
    selector: 'aether-subscriber-view',
    templateUrl: './subscriber-view.component.html',
    styleUrls: ['./subscriber-view.component.scss']
})
export class SubscriberViewComponent implements OnInit {
    @Input() subscriber: AetherV100TargetSubscriberUe;
    @Output() closeEvent = new EventEmitter<boolean>();

    constructor() {
    }

    ngOnInit(): void {
    }

    closeCard(): void {
        this.closeEvent.emit(true);
    }

}
