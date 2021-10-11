/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Service} from "../../../openapi3/aether/4.0.0/services/service";

export interface EdgeDeviceParam {
    name: string;
    'display-name': string;
    description: string;
}

@Component({
  selector: 'aether-edge-device',
  templateUrl: './edge-device.component.html',
    styleUrls: [
        '../../common-panel.component.scss',
    ]
})
export class EdgeDeviceComponent {
    @Output() closeEdgeDeviceEvent = new EventEmitter<EdgeDeviceParam>();

    edgeDeviceForm = this.fb.group({
        name: [undefined, Validators.compose([
            Validators.minLength(1),
            Validators.maxLength(80),
        ])],
        'display-name': [undefined, Validators.compose([
            Validators.minLength(1),
            Validators.maxLength(80),
        ])],
        description: [undefined]
    })

    constructor(
        protected service: Service,
        protected fb: FormBuilder) {

    }

    closeCard(cancelled: boolean): void {
        if (cancelled) {
            this.closeEdgeDeviceEvent.emit();
        } else {
            this.closeEdgeDeviceEvent.emit({
                name: this.edgeDeviceForm.get('name').value,
                'display-name': this.edgeDeviceForm.get('display-name').value,
                description: this.edgeDeviceForm.get('description').value,
            } as EdgeDeviceParam);
        }
    }


}
