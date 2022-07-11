/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import {
    BasketService,
    ORIGINAL,
    REQDATTRIBS,
    TYPE,
} from '../../basket.service';
import { RocEditBase } from '../../roc-edit-base';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OpenPolicyAgentService } from '../../open-policy-agent.service';
import { UpfDatasource } from '../upf/upf-datasource';
import { upfModelPath } from '../../models-info';
import { EnterpriseService } from '../../enterprise.service';
import { SiteUpf } from '../../../openapi3/aether/2.1.0/models';
import {
    SiteService,
    SiteUpfService,
} from '../../../openapi3/aether/2.1.0/services';

@Component({
    selector: 'aether-upf-edit',
    templateUrl: './upf-edit.component.html',
    styleUrls: ['../../common-edit.component.scss'],
})
export class UpfEditComponent
    extends RocEditBase<UpfDatasource>
    implements OnInit
{
    data: SiteUpf;
    pathListAttr = 'upf';
    SiteImisLength: number;
    upfId: string;
    showParentDisplay = false;
    upfForm = this.fb.group({
        'upf-id': [
            undefined,
            Validators.compose([
                Validators.pattern('[a-z]([a-z0-9-]?[a-z0-9])*'),
                Validators.minLength(1),
                Validators.maxLength(63),
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
        private upfUpfService: SiteUpfService,
        protected enterpriseService: EnterpriseService,
        protected siteService: SiteService,
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
            enterpriseService,
            siteService,
            route,
            fb,
            new UpfDatasource(enterpriseService, bs),
            upfModelPath
        );
        super.form = this.upfForm;
        super.loadFunc = this.loadUpfUpf;
        this.upfForm[REQDATTRIBS] = ['port', 'address'];
        this.upfForm.get('port')[TYPE] = 'number';
    }

    ngOnInit(): void {
        super.init();
    }

    closeShowParentCard(): void {
        this.showParentDisplay = false;
    }

    loadUpfUpf(upfId: string): void {
        this.upfUpfService
            .getSiteUpf({
                'upf-id': upfId,
                'enterprise-id': this.route.snapshot.params['enterprise-id'],
                'site-id': this.route.snapshot.params['site-id'],
            })
            .subscribe(
                (value) => {
                    this.data = value;
                    this.upfId = value['upf-id'];
                    this.populateFormData(value);
                },
                (error) => {
                    console.warn(
                        'Error getting SiteUpf(s) for ',
                        this.targetId,
                        this.siteId,
                        error
                    );
                },
                () => {
                    const basketPreview = this.bs.buildPatchBody().Updates;
                    const [hasUpdates, model] = this.datasource.hasUpdates(
                        basketPreview,
                        upfModelPath,
                        this.data
                    );
                    if (hasUpdates) {
                        this.populateFormData(model as SiteUpf);
                    }
                    console.log(
                        'Finished loading SiteUpf(s)',
                        this.targetId,
                        this.siteId,
                        upfId
                    );
                }
            );
    }

    private populateFormData(value: SiteUpf): void {
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
        if (value['config-endpoint'] != null) {
            this.upfForm
                .get('config-endpoint')
                .setValue(value['config-endpoint']);
            this.upfForm.get('config-endpoint')[ORIGINAL] =
                value['config-endpoint'];
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
