/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
    ApplicationApplicationService,
    Service,
} from 'src/openapi3/aether/4.0.0/services';
import {
    Application,
    ApplicationApplication,
} from '../../../openapi3/aether/4.0.0/models';
import { RocSelectBase } from '../../roc-select-base';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface SelectAppParam {
    application: string;
    priority: number;
}

@Component({
    selector: 'aether-application-select',
    templateUrl: './application-select.component.html',
    styleUrls: ['../../common-panel.component.scss'],
})
export class ApplicationSelectComponent
    extends RocSelectBase<ApplicationApplicationService, Application>
    implements OnInit
{
    closeEvent: EventEmitter<string>;
    SliceApplicationEndpointLimit: number = 5;
    ApplicationOptions: Array<ApplicationApplication> = [];
    selectForm = this.fb.group({
        'select-item': [
            undefined,
            Validators.compose([
                Validators.pattern('([A-Za-z0-9\\-\\_\\.]+)'),
                Validators.minLength(1),
                Validators.maxLength(31),
            ]),
        ],
        priority: [
            undefined,
            Validators.compose([
                Validators.minLength(1),
                Validators.maxLength(255),
            ]),
        ],
    });
    @Input() alreadySelected: string[] = [];
    @Input() applicationList: Array<ApplicationApplication> = ([] = []);
    @Output() appcloseEvent = new EventEmitter<SelectAppParam>();

    constructor(
        protected service: Service,
        protected fb: FormBuilder,
        protected snackBar: MatSnackBar
    ) {
        super(fb);
    }

    ngOnInit(): void {
        if (this.alreadySelected.length !== 0) {
            const alreadySelectedAppArray = this.applicationList?.filter(
                (eachApplication) =>
                    this.alreadySelected.includes(eachApplication.id)
            );
            alreadySelectedAppArray?.forEach((application) => {
                this.SliceApplicationEndpointLimit =
                    this.SliceApplicationEndpointLimit -
                    application.endpoint.length;
            });
        }
        this.applicationList?.forEach((eachApplication) => {
            const exists = this.alreadySelected.indexOf(eachApplication.id);
            if (
                exists === -1 &&
                eachApplication.endpoint.length <=
                    this.SliceApplicationEndpointLimit
            ) {
                this.ApplicationOptions.push(eachApplication);
            }
        });
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
