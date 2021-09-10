/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {Component, InjectionToken, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Service as AetherService, SiteSiteService} from '../../../openapi3/aether/3.0.0/services';
import {BasketService, IDATTRIBS, ORIGINAL, REQDATTRIBS, TYPE} from '../../basket.service';
import {RocEditBase} from '../../roc-edit-base';
import {MatSnackBar} from '@angular/material/snack-bar';
import {OpenPolicyAgentService} from '../../open-policy-agent.service';
import {isEmpty, map, startWith} from 'rxjs/operators';
import {SiteSite, EnterpriseEnterprise} from 'src/openapi3/aether/3.0.0/models';

@Component({
    selector: 'aether-site-edit',
    templateUrl: './site-edit.component.html',
    styleUrls: ['../../common-edit.component.scss']
})
export class SiteEditComponent extends RocEditBase<SiteSite> implements OnInit {
    enterprises: Array<EnterpriseEnterprise>;
    data: SiteSite;
    pathRoot = 'site-3.0.0';
    pathListAttr = 'site';
    siteForm = this.fb.group({
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
            Validators.maxLength(80),
        ])],
        enterprise: [undefined],
        'imsi-definition': this.fb.group({
            mcc: [undefined, Validators.compose([
                Validators.pattern('[0-9]{3}'),
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(3),
            ])],
            mnc: [undefined, Validators.compose([
                Validators.pattern('[0-9]{2,3}'),
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(3),
            ])],
            enterprise: [undefined, Validators.required],
            format: [undefined, Validators.compose([
                Validators.pattern('[0CENS]{15}'),
                Validators.minLength(15),
                Validators.maxLength(15)
            ])]
        })
    });

    constructor(
        private siteSiteService: SiteSiteService,
        private aetherService: AetherService,
        protected route: ActivatedRoute,
        protected router: Router,
        protected fb: FormBuilder,
        protected bs: BasketService,
        protected snackBar: MatSnackBar,
        public opaService: OpenPolicyAgentService,
    ) {
        super(snackBar, bs, route, router, 'site-3.0.0', 'site');
        super.form = this.siteForm;
        super.loadFunc = this.loadSiteSite;
        this.siteForm.get(['imsi-definition', 'enterprise'])[TYPE] = 'number';
        this.siteForm[REQDATTRIBS] = ['enterprise'];
        this.siteForm.get(['imsi-definition'])[REQDATTRIBS] = ['mcc', 'mnc', 'enterprise', 'format'];
    }

    ngOnInit(): void {
        super.init();
        this.loadEnterprises(this.target);
    }

    setOnlyEnterprise(lenEnterprises: number): void {
        if (lenEnterprises === 1) {
            this.siteForm.get('enterprise').markAsTouched();
            this.siteForm.get('enterprise').markAsDirty();
            this.siteForm.get('enterprise').setValue(this.enterprises[0].id);
        }
    }

    loadSiteSite(target: string, id: string): void {
        this.siteSiteService.getSiteSite({
            target,
            id
        }).subscribe(
            (value => {
                this.data = value;
                this.populateFormData(value);
            }),
            error => {
                console.warn('Error getting SiteSite(s) for ', target, error);
            },
            () => {
                const basketPreview = this.bs.buildPatchBody().Updates;
                if (this.pathRoot in basketPreview && this.pathListAttr in basketPreview['site-3.0.0']) {
                    basketPreview['site-3.0.0'].site.forEach((basketItems) => {
                        if (basketItems.id === id) {
                            this.populateFormData(basketItems);
                        }
                    });
                }
                console.log('Finished loading SiteSite(s)', target, id);
            }
        );
    }

    get ImsiControls(): FormGroup {
        return this.siteForm.get(['imsi-definition']) as FormGroup;
    }

    private populateFormData(value: SiteSite): void {
        if (value['display-name']) {
            this.siteForm.get('display-name').setValue(value['display-name']);
            this.siteForm.get('display-name')[ORIGINAL] = value['display-name'];
        }
        if (value.description) {
            this.siteForm.get(['description']).setValue(value.description);
            this.siteForm.get('description')[ORIGINAL] = value.description;
        }
        if (value.enterprise) {
            this.siteForm.get(['enterprise']).setValue(value.enterprise);
            this.siteForm.get('enterprise')[ORIGINAL] = value.enterprise;
        }
        if (value['imsi-definition']) {
            this.siteForm.get(['imsi-definition', 'mcc']).setValue(value['imsi-definition'].mcc);
            this.siteForm.get(['imsi-definition', 'mcc'])[ORIGINAL] = value['imsi-definition'].mcc;
            this.siteForm.get(['imsi-definition', 'mnc']).setValue(value['imsi-definition'].mnc);
            this.siteForm.get(['imsi-definition', 'mnc'])[ORIGINAL] = value['imsi-definition'].mnc;
            this.siteForm.get(['imsi-definition', 'enterprise']).setValue(value['imsi-definition'].enterprise);
            this.siteForm.get(['imsi-definition', 'enterprise'])[ORIGINAL] = value['imsi-definition'].enterprise;
            this.siteForm.get(['imsi-definition', 'format']).setValue(value['imsi-definition'].format);
            this.siteForm.get(['imsi-definition', 'format'])[ORIGINAL] = value['imsi-definition'].format;
        }
    }

    loadEnterprises(target: string): void {
        this.aetherService.getEnterprise({
            target,
        }).subscribe(
            (value => {
                this.enterprises = value.enterprise;
                this.setOnlyEnterprise(value.enterprise.length);
                console.log('Got', value.enterprise.length, 'Enterprise');
            }),
            error => {
                console.warn('Error getting Enterprise for ', target, error);
            }
        );
    }
}
