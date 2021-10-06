/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ApplicationApplicationService, Service} from 'src/openapi3/aether/4.0.0/services';
import {AETHER_TARGETS} from '../../../environments/environment';
import {Application} from '../../../openapi3/aether/4.0.0/models';
import {RocSelectBase} from '../../roc-select-base';
import {EndPointParam} from "../../aether-application/endpoint-select/endpoint-select.component";


export interface SelectAppParam {
    application: string;
    priority: number;
}

@Component({
    selector: 'aether-application-select',
    templateUrl: './application-select.component.html',
    styleUrls: [
        '../../common-panel.component.scss',
    ]
})

export class ApplicationSelectComponent extends RocSelectBase<ApplicationApplicationService, Application>
    implements OnInit {
    closeEvent: EventEmitter<string>;
    selectForm = this.fb.group({
        'select-item': [undefined, Validators.compose([
            Validators.pattern('([A-Za-z0-9\\-\\_\\.]+)'),
            Validators.minLength(1),
            Validators.maxLength(31),
        ])],
        'priority': [undefined, Validators.compose([
            Validators.minLength(1),
            Validators.maxLength(255),
        ])]
    })

    @Input() alreadySelected: string[] = [];
    @Output() appcloseEvent = new EventEmitter<SelectAppParam>();

    constructor(
        protected service: Service,
        protected fb: FormBuilder,
    ) {
        super(fb);
    }

    ngOnInit(): void {
        super.getData(this.service.getApplication({target: AETHER_TARGETS[0]}),
            'application');
    }

    close(cancelled: boolean): void {
        if (cancelled) {
            this.appcloseEvent.emit();
        } else {
            this.appcloseEvent.emit({
                application: this.selectForm.get('select-item').value,
                priority: this.selectForm.get('priority').value,
            } as SelectAppParam);
        }
    }
}
