/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EnterprisesEnterpriseService } from 'src/openapi3/aether/2.0.0/services';
import {
    EnterprisesEnterprise,
    EnterprisesEnterpriseApplication,
} from '../../../openapi3/aether/2.0.0/models';
import { RocSelectBase } from '../../roc-select-base';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AETHER_TARGET } from '../../../environments/environment';
import { from } from 'rxjs';
import { mergeMap, pluck } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';

export interface SelectAppParam {
    application: string;
    priority: number;
    endpointsRemaining: number;
}

const ENDPOINTSALLOWEDLIMIT = 5;

@Component({
    selector: 'aether-application-select',
    templateUrl: './application-select.component.html',
    styleUrls: ['../../common-panel.component.scss'],
})
export class ApplicationSelectComponent
    extends RocSelectBase<
        EnterprisesEnterpriseApplication,
        EnterprisesEnterprise
    >
    implements OnInit
{
    closeEvent: EventEmitter<string>;
    ApplicationOptions: Array<EnterprisesEnterpriseApplication> = [];
    selectForm = this.fb.group({
        'select-item': [
            { value: undefined, disabled: true },
            Validators.compose([
                Validators.pattern('[a-z]([a-z0-9-]?[a-z0-9])*'),
                Validators.minLength(1),
                Validators.maxLength(63),
            ]),
        ],
        priority: [
            { value: undefined, disabled: true },
            Validators.compose([
                Validators.minLength(1),
                Validators.maxLength(255),
            ]),
        ],
    });
    @Input() alreadySelected: string[] = [];
    @Input() selectedEnterprise: string;
    @Output() appcloseEvent = new EventEmitter<SelectAppParam>();

    public endpointsAllowed: number = ENDPOINTSALLOWEDLIMIT;
    public existingApplications: MatTableDataSource<EnterprisesEnterpriseApplication> =
        new MatTableDataSource([]);
    public columnsToDisplay = ['application', 'endpoints'];
    public errorMessage = '';

    constructor(
        protected enterpriseService: EnterprisesEnterpriseService,
        protected fb: FormBuilder,
        protected snackBar: MatSnackBar
    ) {
        super(fb, 'application-id');
    }

    ngOnInit(): void {
        // Not using the base class getData, as this is more complex
        console.log('Already selected', this.alreadySelected);
        const candidates = new Array<EnterprisesEnterpriseApplication>();
        this.enterpriseService
            .getEnterprisesEnterprise({
                target: AETHER_TARGET,
                'enterprise-id': this.selectedEnterprise,
            })
            .pipe(
                pluck('application'),
                mergeMap((items: EnterprisesEnterpriseApplication[]) =>
                    from(items)
                )
            )
            .subscribe(
                (value) => {
                    const exists = this.alreadySelected.includes(
                        value['application-id']
                    );
                    if (exists) {
                        this.endpointsAllowed -= value.endpoint.length;
                    } else {
                        candidates.push(value);
                    }
                },
                (error) => console.warn('Error getting applications', error),
                () => {
                    // if there are no candidates it means all the Apps for this Enterprise are already
                    // used in this Slice
                    if (candidates.length === 0) {
                        this.errorMessage =
                            'There are no available Applications in this Enterprise';
                        return;
                    }
                    candidates.forEach((c) => {
                        if (c.endpoint.length <= this.endpointsAllowed) {
                            this.displayList.push(c);
                        }
                    });
                    // if the display list is empty it means all the Apps have more endpoints that allowed
                    if (this.displayList.length === 0) {
                        this.errorMessage = `All the applications in this enterprise have more endpoints than the limit allows.
                        You have ${this.endpointsAllowed} Endpoints available of ${ENDPOINTSALLOWEDLIMIT} allowed.`;
                        this.existingApplications.data = candidates;
                        return;
                    }
                    this.selectForm.get('select-item').enable();
                    this.selectForm.get('priority').enable();
                }
            );
    }

    close(cancelled: boolean): void {
        if (cancelled) {
            this.appcloseEvent.emit();
        } else {
            this.appcloseEvent.emit({
                application: this.selectForm.get('select-item').value,
                priority: this.selectForm.get('priority').value,
                endpointsRemaining: this.endpointsAllowed,
            } as SelectAppParam);
        }
    }
}
