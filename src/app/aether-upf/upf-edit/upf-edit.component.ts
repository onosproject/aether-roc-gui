/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import {
    EnterpriseEnterprise,
    EnterpriseEnterpriseSite,
    EnterpriseEnterpriseSiteUpf,
} from '../../../openapi3/aether/2.0.0/models';
import { BasketService, ORIGINAL, REQDATTRIBS } from '../../basket.service';
import { Service as AetherService } from '../../../openapi3/aether/2.0.0/services';
import { RocEditBase } from '../../roc-edit-base';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OpenPolicyAgentService } from '../../open-policy-agent.service';
import { maxDeviceGroupRange } from '../../../environments/environment';
import { RocElement } from '../../../openapi3/top/level/models/elements';
import { UpfUpfService } from '../../../openapi3/aether/2.0.0/services/upf-upf.service';

@Component({
    selector: 'aether-upf-edit',
    templateUrl: './upf-edit.component.html',
    styleUrls: ['../../common-edit.component.scss'],
})
export class UpfEditComponent extends RocEditBase implements OnInit {
    data: EnterpriseEnterpriseSiteUpf;
    pathRoot = ('Enterprises-2.0.0/enterprise' +
        '[enterprise-id=' +
        this.route.snapshot.params['enterprise-id'] +
        ']/site' +
        '[site-id=' +
        this.route.snapshot.params['site-id'] +
        ']') as RocElement;
    pathListAttr = 'upf';
    SiteImisLength: number;
    ImsiRangeLimit: number;
    upfId: string;
    showParentDisplay = false;
    upfForm = this.fb.group({
        'upf-id': [
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
        'config-endpoint': [undefined],
        address: [
            undefined,
            Validators.compose([
                Validators.required,
                Validators.minLength(1),
                Validators.maxLength(80),
            ]),
        ],
        port: [
            undefined,
            Validators.compose([
                Validators.required,
                Validators.min(0),
                Validators.max(65535),
            ]),
        ],
    });

    constructor(
        private upfUpfService: UpfUpfService,
        private aetherService: AetherService,
        protected route: ActivatedRoute,
        protected router: Router,
        protected fb: FormBuilder,
        protected bs: BasketService,
        protected snackBar: MatSnackBar,
        public opaService: OpenPolicyAgentService
    ) {
        super(snackBar, bs, route, router, 'Enterprises-2.0.0', 'upf');
        super.form = this.upfForm;
        super.loadFunc = this.loadUpfUpf;
        this.upfForm[REQDATTRIBS] = ['enterprise', 'port', 'address', 'site'];
    }

    ngOnInit(): void {
        super.init();
    }

    closeShowParentCard(): void {
        this.showParentDisplay = false;
    }

    loadUpfUpf(target: string, id: string): void {
        this.upfUpfService
            .getUpfUpf({
                target,
                id,
                ent_id: this.route.snapshot.params['enterprise-id'],
                site_id: this.route.snapshot.params['site-id'],
            })
            .subscribe(
                (value) => {
                    this.data = value;
                    this.upfId = value['upf-id'];
                    this.populateFormData(value);
                },
                (error) => {
                    console.warn('Error getting UpfUpf(s) for ', target, error);
                },
                () => {
                    const basketPreview = this.bs.buildPatchBody().Updates;
                    if (
                        this.pathRoot in basketPreview &&
                        this.pathListAttr in basketPreview['Upf-2.0.0']
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
                                                SitebasketItems['upf'].forEach(
                                                    (basketItems) => {
                                                        if (
                                                            basketItems[
                                                                'upf-id'
                                                            ] === id
                                                        ) {
                                                            this.populateFormData(
                                                                basketItems
                                                            );
                                                        }
                                                    }
                                                );
                                            }
                                        }
                                    );
                                }
                            }
                        );
                    }
                    console.log('Finished loading UpfUpf(s)', target, id);
                }
            );
    }

    private populateFormData(value: EnterpriseEnterpriseSiteUpf): void {
        if (value['upf-id']) {
            this.upfForm.get('upf-id').setValue(value['upf-id']);
            this.upfForm.get('upf-id')[ORIGINAL] = value['upf-id'];
        }
        if (value['display-name']) {
            this.upfForm.get('display-name').setValue(value['display-name']);
            this.upfForm.get('display-name')[ORIGINAL] = value['display-name'];
        }
        if (value.description) {
            this.upfForm.get('description').setValue(value.description);
            this.upfForm.get('description')[ORIGINAL] = value.description;
        }
        if (value.enterprise != null) {
            this.upfForm.get('enterprise').setValue(value.enterprise);
            this.upfForm.get('enterprise')[ORIGINAL] = value.enterprise;
        }
        if (value['config-endpoint'] != null) {
            this.upfForm
                .get('config-endpoint')
                .setValue(value['config-endpoint']);
            this.upfForm.get('config-endpoint')[ORIGINAL] =
                value['config-endpoint'];
        }
        if (value.site) {
            this.upfForm.get('site').setValue(value.site);
            this.upfForm.get('site')[ORIGINAL] = value.site;
        }
        if (value.address) {
            this.upfForm.get('address').setValue(value.address);
            this.upfForm.get('address')[ORIGINAL] = value.address;
        }
        if (value.port) {
            this.upfForm.get('port').setValue(value.port);
            this.upfForm.get('port')[ORIGINAL] = value.port;
        }
    }
}
