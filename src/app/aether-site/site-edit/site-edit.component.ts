/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {Component, InjectionToken, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Service as AetherService, SiteSiteService} from '../../../openapi3/aether/3.0.0/services';
import {BasketService, IDATTRIBS, ORIGINAL, TYPE} from '../../basket.service';
import {RocEditBase} from '../../roc-edit-base';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Observable} from 'rxjs';
import {OpenPolicyAgentService} from '../../open-policy-agent.service';
import {isEmpty, map, startWith} from 'rxjs/operators';
import {SiteSite, NetworkNetwork, EnterpriseEnterprise} from 'src/openapi3/aether/3.0.0/models';

@Component({
    selector: 'aether-site-edit',
    templateUrl: './site-edit.component.html',
    styleUrls: ['../../common-edit.component.scss']
})
export class SiteEditComponent extends RocEditBase<SiteSite> implements OnInit {
    enterprises: Array<EnterpriseEnterprise>;
    networks: Array<NetworkNetwork>;
    data: SiteSite;
    pathRoot = 'site-3.0.0';
    pathListAttr = 'site';
    siteForm = this.fb.group({
        id: ['', Validators.compose([
            Validators.pattern('([A-Za-z0-9\\-\\_]+)'),
            Validators.minLength(1),
            Validators.maxLength(31),
        ])],
        'display-name': ['', Validators.compose([
            Validators.minLength(1),
            Validators.maxLength(80),
        ])],
        description: ['', Validators.compose([
            Validators.minLength(1),
            Validators.maxLength(80),
        ])],
        enterprise: [''],
        network: [''],
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
    }

    ngOnInit(): void {
        super.init();
        this.loadEnterprises(this.target);
        this.loadNetworks(this.target);
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

    private populateFormData(value: SiteSite): void {
        if (value['display-name']) {
            this.siteForm.get('display-name').setValue(value['display-name']);
        }
        if (value.description) {
            this.siteForm.get(['description']).setValue(value.description);
        }
        if (value.enterprise) {
            this.siteForm.get(['enterprise']).setValue(value.enterprise);
            this.siteForm.get('enterprise')[ORIGINAL] = value.enterprise;
        }
        if (value.network) {
            this.siteForm.get(['network']).setValue(value.network);
            this.siteForm.get('network')[ORIGINAL] = value.network;
        }
    }

    loadEnterprises(target: string): void {
        this.aetherService.getEnterprise({
            target,
        }).subscribe(
            (value => {
                this.enterprises = value.enterprise;
                console.log('Got', value.enterprise.length, 'Enterprise');
            }),
            error => {
                console.warn('Error getting Enterprise for ', target, error);
            }
        );
    }

    loadNetworks(target: string): void {
        this.aetherService.getNetwork({
            target,
        }).subscribe(
            (value => {
                this.networks = value.network;
                console.log('Got', value.network.length, 'Network');
            }),
            error => {
                console.warn('Error getting Network for ', target, error);
            }
        );
    }
}
