/*
 * SPDX-FileCopyrightText: 2022-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, OnInit } from '@angular/core';
import { RocEditBase } from '../../roc-edit-base';
import { EnterprisesEnterpriseSiteSimCard } from '../../../openapi3/aether/2.0.0/models/enterprises-enterprise-site-sim-card';
import { RocElement } from '../../../openapi3/top/level/models/elements';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BasketService, ORIGINAL, TYPE } from '../../basket.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OpenPolicyAgentService } from '../../open-policy-agent.service';
import { EnterprisesEnterpriseSiteSimCardService } from '../../../openapi3/aether/2.0.0/services/enterprises-enterprise-site-sim-card.service';
import { AETHER_TARGET } from '../../../environments/environment';

@Component({
    selector: 'aether-sim-card-edit',
    templateUrl: './sim-card-edit.component.html',
    styleUrls: ['../../common-edit.component.scss'],
})
export class SimCardEditComponent extends RocEditBase implements OnInit {
    data: EnterprisesEnterpriseSiteSimCard;
    pathRoot = ('Enterprises-2.0.0/enterprise' +
        '[enterprise-id=' +
        this.route.snapshot.params['enterprise-id'] +
        ']/site' +
        '[site-id=' +
        this.route.snapshot.params['site-id'] +
        ']') as RocElement;
    pathListAttr = 'sim-card';
    simCardId: string;
    showParentDisplay = false;

    simCardForm = this.fb.group({
        'sim-id': [
            undefined,
            Validators.compose([
                Validators.pattern('([A-Za-z0-9\\-\\_\\.]+)'),
                Validators.minLength(1),
                Validators.maxLength(32),
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
        iccid: [
            undefined,
            Validators.compose([
                Validators.pattern('([0-9]{18,21}[0-9A-F])'),
                Validators.minLength(19),
                Validators.maxLength(22),
            ]),
        ],
        imsi: [undefined],
    });

    constructor(
        private simCardService: EnterprisesEnterpriseSiteSimCardService,
        protected route: ActivatedRoute,
        protected router: Router,
        protected fb: FormBuilder,
        protected bs: BasketService,
        protected snackBar: MatSnackBar,
        public opaService: OpenPolicyAgentService
    ) {
        super(
            snackBar,
            bs,
            route,
            router,
            'Enterprises-2.0.0',
            'sim-card',
            'sim-id'
        );
        super.form = this.simCardForm;
        super.loadFunc = this.loadSimCard;
    }

    ngOnInit(): void {
        super.init();
        this.simCardForm.get('imsi')[TYPE] = 'number';
    }

    closeShowParentCard(): void {
        this.showParentDisplay = false;
    }

    loadSimCard(target: string, simCardId: string): void {
        this.simCardService
            .getEnterprisesEnterpriseSiteSimCard({
                target: AETHER_TARGET,
                'enterprise-id': this.route.snapshot.params['enterprise-id'],
                'site-id': this.route.snapshot.params['site-id'],
                'sim-id': simCardId,
            })
            .subscribe(
                (value) => {
                    this.data = value;
                    this.simCardId = value['sim-id'];
                    this.populateFormData(value);
                },
                (error) => {
                    console.warn(
                        'Error getting EnterprisesEnterpriseSiteSimCard(s) for ',
                        target,
                        error
                    );
                },
                () => {
                    const basketPreview = this.bs.buildPatchBody().Updates;
                    if (
                        this.pathRoot in basketPreview &&
                        this.pathListAttr in basketPreview['SimCard-2.0.0']
                    ) {
                        basketPreview['Enterprises-2.0.0'].enterprise.forEach(
                            (enterpriseBasketItems) => {
                                if (
                                    enterpriseBasketItems['enterprise-id'] ===
                                    this.route.snapshot.params['enterprise-id']
                                ) {
                                    enterpriseBasketItems.site.forEach(
                                        (SitebasketItems) => {
                                            if (
                                                SitebasketItems['site-id'] ===
                                                this.route.snapshot.params[
                                                    'site-id'
                                                ]
                                            ) {
                                                SitebasketItems[
                                                    'sim-card'
                                                ].forEach((basketItems) => {
                                                    if (
                                                        basketItems[
                                                            'sim-id'
                                                        ] === simCardId
                                                    ) {
                                                        this.populateFormData(
                                                            basketItems
                                                        );
                                                    }
                                                });
                                            }
                                        }
                                    );
                                }
                            }
                        );
                    }
                    console.log(
                        'Finished loading EnterprisesEnterpriseSiteSimCard(s)',
                        target,
                        simCardId
                    );
                }
            );
    }

    private populateFormData(value: EnterprisesEnterpriseSiteSimCard): void {
        if (value['sim-id']) {
            this.simCardForm.get('sim-id').setValue(value['sim-id']);
            this.simCardForm.get('sim-id')[ORIGINAL] = value['sim-id'];
        }
        if (value['display-name']) {
            this.simCardForm
                .get('display-name')
                .setValue(value['display-name']);
            this.simCardForm.get('display-name')[ORIGINAL] =
                value['display-name'];
        }
        if (value.description) {
            this.simCardForm.get('description').setValue(value.description);
            this.simCardForm.get('description')[ORIGINAL] = value.description;
        }
        if (value.iccid != null) {
            this.simCardForm.get('iccid').setValue(value['iccid']);
            this.simCardForm.get('iccid')[ORIGINAL] = value['iccid'];
        }
        if (value.imsi) {
            this.simCardForm.get('imsi').setValue(value.imsi);
            this.simCardForm.get('imsi')[ORIGINAL] = value.imsi;
        }
    }
}
