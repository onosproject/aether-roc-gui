/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Component, OnInit } from '@angular/core';
import { ConnectivityServicesConnectivityService } from '../../../openapi3/aether/2.0.0/models';
import { RocEditBase } from '../../roc-edit-base';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BasketService, ORIGINAL } from '../../basket.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OpenPolicyAgentService } from '../../open-policy-agent.service';
import { ConnectivityServicesConnectivityServiceService } from '../../../openapi3/aether/2.0.0/services';
import { AETHER_TARGET } from '../../../environments/environment';

@Component({
    selector: 'aether-connectivity-service-edit',
    templateUrl: './connectivity-service-edit.component.html',
    styleUrls: ['../../common-edit.component.scss'],
})
export class ConnectivityServiceEditComponent
    extends RocEditBase
    implements OnInit
{
    data: ConnectivityServicesConnectivityService;

    csForm = this.fb.group({
        'connectivity-service-id': [
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
        private connectivityServiceConnectivityServiceService: ConnectivityServicesConnectivityServiceService,
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
            'Connectivity-services-2.0.0',
            'connectivity-service',
            'connectivity-service-id'
        );
        super.form = this.csForm;
        super.loadFunc = this.loadConnectivityServicesConnectivityService;
    }

    ngOnInit(): void {
        super.init();
    }

    private populateFormData(
        value: ConnectivityServicesConnectivityService
    ): void {
        if (value['connectivity-service-id']) {
            this.csForm
                .get('connectivity-service-id')
                .setValue(value['connectivity-service-id']);
            this.csForm.get('connectivity-service-id')[ORIGINAL] =
                value['connectivity-service-id'];
        }
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

    loadConnectivityServicesConnectivityService(
        target: string,
        id: string
    ): void {
        this.connectivityServiceConnectivityServiceService
            .getConnectivityServicesConnectivityService({
                target: AETHER_TARGET,
                'connectivity-service-id': id,
            })
            .subscribe(
                (value) => {
                    this.data = value;
                    this.connectivityServiceId =
                        value['connectivity-service-id'];
                    this.populateFormData(value);
                },
                (error) => {
                    console.warn(
                        'Error getting ConnectivityServicesConnectivityService(s) for ',
                        target,
                        error
                    );
                },
                () => {
                    const basketPreview = this.bs.buildPatchBody().Updates;
                    if (
                        this.pathRoot in basketPreview &&
                        this.pathListAttr in
                            basketPreview['Connectivity-services-2.0.0']
                    ) {
                        basketPreview['Connectivity-services-2.0.0'][
                            'connectivity-service'
                        ].forEach((basketItems) => {
                            if (basketItems['connectivity-service-id'] === id) {
                                this.populateFormData(basketItems);
                            }
                        });
                    }
                    console.log(
                        'Finished loading ConnectivityServicesConnectivityService(s)',
                        target,
                        id
                    );
                }
            );
    }
}
