/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {Component, Input, EventEmitter, OnInit, Output} from '@angular/core';
import {RocSelectBase} from '../../roc-select-base';
import {ApList} from '../../../openapi3/aether/4.0.0/models';
import {Service} from '../../../openapi3/aether/4.0.0/services/service';
import {FormBuilder, Validators} from '@angular/forms';
import {ApListApListService} from '../../../openapi3/aether/4.0.0/services/ap-list-ap-list.service';
import {AETHER_TARGETS} from '../../../environments/environment';

export interface AccessPointParam {
    address: string;
    tac: number;
    enable: boolean;
}

@Component({
    selector: 'aether-access-point-select',
    templateUrl: './access-point-select.component.html',
    styleUrls: ['../../common-panel.component.scss']
})
export class AccessPointSelectComponent implements OnInit {

    // @Input() alreadySelected: string[] = [];
    checked: boolean = false;
    @Output() closeEvent = new EventEmitter<AccessPointParam>();

    accessPointForm = this.fb.group({
        address: [undefined, Validators.compose([
            Validators.minLength(1),
            Validators.maxLength(80),
        ])],
        tac: [undefined, Validators.compose([
            Validators.pattern('[0-9A-F\\.]*'),
            Validators.minLength(4),
            Validators.maxLength(8),
        ])],
        enable: true,
    });

    constructor(
        protected fb: FormBuilder,
    ) {
    }

    closeCard(cancelled: boolean): void {
        if (cancelled === true) {
            this.closeEvent.emit();
        } else {
            this.closeEvent.emit({
                address: this.accessPointForm.get('address').value,
                tac: this.accessPointForm.get('tac').value,
                enable: this.accessPointForm.get('enable').value,
                cancelled: false
            } as AccessPointParam);
        }
    }

    ngOnInit(): void {
        this.checked = false;
    }
}



