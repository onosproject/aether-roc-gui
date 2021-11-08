/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {UpfUpfService} from '../../../openapi3/aether/4.0.0/services';
import {EnterpriseEnterprise, SiteSite, UpfUpf} from '../../../openapi3/aether/4.0.0/models';
import {BasketService, ORIGINAL, REQDATTRIBS, TYPE} from '../../basket.service';
import {Service as AetherService} from '../../../openapi3/aether/4.0.0/services';
import {RocEditBase} from '../../roc-edit-base';
import {MatSnackBar} from '@angular/material/snack-bar';
import {OpenPolicyAgentService} from '../../open-policy-agent.service';
import {maxDeviceGroupRange} from "../../../environments/environment";

@Component({
    selector: 'aether-upf-edit',
    templateUrl: './upf-edit.component.html',
    styleUrls: [
        '../../common-edit.component.scss',
    ]
})
export class UpfEditComponent extends RocEditBase<UpfUpf> implements OnInit {
    data: UpfUpf;
    enterprises: Array<EnterpriseEnterprise>;
    pathRoot = 'upf-4.0.0';
    pathListAttr = 'upf';
    SiteImisLength: number;
    site: Array<SiteSite>;
    ImsiRangeLimit: number;
    showAddImsi: boolean = false;
    upfId: string;
    showParentDisplay: boolean = false;
    upfForm = this.fb.group({
        id: [undefined, Validators.compose([
            Validators.pattern('([A-Za-z0-9\\-\\_\\.]+)'),
            Validators.minLength(1),
            Validators.maxLength(31),
        ])],
        'display-name': [undefined, Validators.compose([
            Validators.minLength(1),
            Validators.maxLength(80),
        ])],
        description: [undefined, Validators.compose([
            Validators.minLength(1),
            Validators.maxLength(1024),
        ])],
        'config-endpoint': [undefined],
        enterprise: [undefined],
        site: [undefined],
        address: [undefined, Validators.compose([
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(80),
        ])],
        port: [undefined, Validators.compose([
            Validators.required,
            Validators.min(0),
            Validators.max(65535)
        ])],
    });

    constructor(
        private upfUpfService: UpfUpfService,
        private aetherService: AetherService,
        protected route: ActivatedRoute,
        protected router: Router,
        protected fb: FormBuilder,
        protected bs: BasketService,
        protected snackBar: MatSnackBar,
        public opaService: OpenPolicyAgentService,
    ) {
        super(snackBar, bs, route, router, 'upf-4.0.0', 'upf');
        super.form = this.upfForm;
        super.loadFunc = this.loadUpfUpf;
        this.upfForm[REQDATTRIBS] = ['enterprise', 'port', 'address', 'site'];
    }

    ngOnInit(): void {
        this.loadEnterprises(this.target);
        super.init();
    }

    closeShowParentCard(close: boolean): void {
        this.showParentDisplay = false;
    }

    setOnlyEnterprise(lenEnterprises: number): void {
        if (lenEnterprises === 1) {
            this.upfForm.get('enterprise').markAsTouched();
            this.upfForm.get('enterprise').markAsDirty();
            this.upfForm.get('enterprise').setValue(this.enterprises[0].id);
        }
    }



    fetchTooltipContent(): string {
        this.ImsiRangeLimit = Math.pow(10, this.SiteImisLength) - 1;
        return 'UE ID is suffix of IMSI. Ranges must not overlap. Maximum value: ' + this.ImsiRangeLimit + ' Maximum each range: ' + maxDeviceGroupRange;
    }

    loadUpfUpf(target: string, id: string): void {
        this.upfUpfService.getUpfUpf({
            target,
            id
        }).subscribe(
            (value => {
                this.data = value;
                this.upfId = value.id
                this.populateFormData(value);
            }),
            error => {
                console.warn('Error getting UpfUpf(s) for ', target, error);
            },
            () => {
                const basketPreview = this.bs.buildPatchBody().Updates;
                if (this.pathRoot in basketPreview && this.pathListAttr in basketPreview['upf-4.0.0']) {
                    basketPreview['upf-4.0.0'].upf.forEach((basketItems) => {
                        if (basketItems.id === id) {
                            this.populateFormData(basketItems);
                        }
                    });
                }
                console.log('Finished loading UpfUpf(s)', target, id);
            }
        );
    }

    loadEnterprises(target: string): void {
        this.aetherService.getEnterprise({
            target,
        }).subscribe(
            (value => {
                this.enterprises = value.enterprise;
                this.setOnlyEnterprise(value.enterprise.length);
                console.log('Got Enterprises', value.enterprise.length);
            }),
            error => {
                console.warn('Error getting Enterprises for ', target, error);
            },
            () => {
                console.log('Finished loading Enterprises', target);
            }
        );
    }

    loadSites(target: string): void {
        this.aetherService.getSite({
            target,
        }).subscribe(
            (value => {
                this.site = value.site;
                console.log('Got Site', value.site.length);
            }),
            error => {
                console.warn('Error getting Site for ', target, error);
            },
            () => {
                console.log('Finished loading Site', target);
            }
        );
    }

    private populateFormData(value: UpfUpf): void {
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
            this.upfForm.get('config-endpoint').setValue(value['config-endpoint']);
            this.upfForm.get('config-endpoint')[ORIGINAL] = value['config-endpoint'];
        }
        if (value.site) {
            this.upfForm.get('site').setValue(value.site);
            this.upfForm.get('site')[ORIGINAL] = value.site;
            this.loadSites(this.target);
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
