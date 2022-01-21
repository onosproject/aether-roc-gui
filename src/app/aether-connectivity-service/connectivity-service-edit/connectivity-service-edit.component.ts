/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import { Component, OnInit } from '@angular/core';
import { ConnectivityServiceConnectivityService } from '../../../openapi3/aether/4.0.0/models';
import { RocEditBase } from '../../roc-edit-base';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BasketService, ORIGINAL } from '../../basket.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConnectivityServiceConnectivityServiceService } from '../../../openapi3/aether/4.0.0/services';
import { OpenPolicyAgentService } from '../../open-policy-agent.service';

@Component({
    selector: 'aether-connectivity-service-edit',
    templateUrl: './connectivity-service-edit.component.html',
    styleUrls: ['../../common-edit.component.scss'],
})
export class ConnectivityServiceEditComponent
    extends RocEditBase
    implements OnInit
{
    data: ConnectivityServiceConnectivityService;

    csForm = this.fb.group({
        id: [
            undefined,
            Validators.compose([
                Validators.pattern('([A-Za-z0-9\\-\\_\\.]+)'),
                Validators.minLength(1),
                Validators.maxLength(31),
            ]),
        ],
        'display-name': [
            undefined,
            Validators.compose([
                Validators.minLength(1),
                Validators.maxLength(80),
            ]),
        ],
        description: [
            undefined,
            Validators.compose([
                Validators.minLength(1),
                Validators.maxLength(1024),
            ]),
        ],
        'core-5g-endpoint': [
            undefined,
            Validators.compose([
                Validators.minLength(1),
                Validators.maxLength(80),
            ]),
        ],
    });
    showParentDisplay = false;
    connectivityServiceId: string;

    constructor(
        private connectivityServiceConnectivityServiceService: ConnectivityServiceConnectivityServiceService,
        protected route: ActivatedRoute,
        protected router: Router,
        private fb: FormBuilder,
        protected bs: BasketService,
        protected snackBar: MatSnackBar,
        public opaService: OpenPolicyAgentService
    ) {
        super(
            snackBar,
            bs,
            route,
            router,
            'Connectivity-service-4.0.0',
            'connectivity-service'
        );
        super.form = this.csForm;
        super.loadFunc = this.loadConnectivityServiceConnectivityService;
    }

    ngOnInit(): void {
        super.init();
    }

    private populateFormData(
        value: ConnectivityServiceConnectivityService
    ): void {
        if (value['display-name']) {
            this.csForm.get('display-name').setValue(value['display-name']);
            this.csForm.get('display-name')[ORIGINAL] = value['display-name'];
        }
        if (value.description) {
            this.csForm.get('description').setValue(value.description);
            this.csForm.get('description')[ORIGINAL] = value.description;
        }
        if (value['core-5g-endpoint']) {
            this.csForm
                .get('core-5g-endpoint')
                .setValue(value['core-5g-endpoint']);
            this.csForm.get('core-5g-endpoint')[ORIGINAL] =
                value['core-5g-endpoint'];
        }
    }

    loadConnectivityServiceConnectivityService(
        target: string,
        id: string
    ): void {
        this.connectivityServiceConnectivityServiceService
            .getConnectivityServiceConnectivityService({
                target,
                id,
            })
            .subscribe(
                (value) => {
                    this.data = value;
                    this.connectivityServiceId = value.id;
                    this.populateFormData(value);
                },
                (error) => {
                    console.warn(
                        'Error getting ConnectivityServiceConnectivityService(s) for ',
                        target,
                        error
                    );
                },
                () => {
                    const basketPreview = this.bs.buildPatchBody().Updates;
                    if (
                        this.pathRoot in basketPreview &&
                        this.pathListAttr in
                            basketPreview['Connectivity-service-4.0.0']
                    ) {
                        basketPreview['Connectivity-service-4.0.0'][
                            'connectivity-service'
                        ].forEach((basketItems) => {
                            if (basketItems.id === id) {
                                this.populateFormData(basketItems);
                            }
                        });
                    }
                    console.log(
                        'Finished loading ConnectivityServiceConnectivityService(s)',
                        target,
                        id
                    );
                }
            );
    }
}
