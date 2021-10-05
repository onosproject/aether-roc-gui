/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Service} from "../../../openapi3/aether/4.0.0/services/service";
import {EndPointParam} from "../../aether-application/endpoint-select/endpoint-select.component";

export interface SmallCellParam {
    name: string;
    address: string;
    tac: string;
    enabled: boolean;
}

@Component({
    selector: 'aether-small-cell-select',
    templateUrl: './small-cell-select.component.html',
    styleUrls: [
        '../../common-panel.component.scss',
    ]
})
export class SmallCellSelectComponent {

    @Output() closeEvent = new EventEmitter<SmallCellParam>();

    smallCellForm = this.fb.group({
        name: [undefined, Validators.compose([
            Validators.minLength(1),
            Validators.maxLength(80),
        ])],
        address: [undefined],
        tac: [undefined],
        enabled: [undefined]
    })

    constructor(
        protected service: Service,
        protected fb: FormBuilder) {

    }

    closeCard(cancelled: boolean): void {
        if (cancelled) {
            this.closeEvent.emit();
        } else {
            this.closeEvent.emit({
                name: this.smallCellForm.get('name').value,
                address: this.smallCellForm.get('address').value,
                tac: this.smallCellForm.get('tac').value,
                enabled: this.smallCellForm.get('enabled').value
            } as SmallCellParam);
        }
    }


}
