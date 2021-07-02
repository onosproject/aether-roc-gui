/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormArray, FormBuilder, FormControl, Validators} from '@angular/forms';
import {NetworkNetworkService} from '../../../openapi3/aether/3.0.0/services';
import {BasketService, IDATTRIBS, ORIGINAL, TYPE} from '../../basket.service';
import {MatHeaderRow, MatTable} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {Service as AetherService} from '../../../openapi3/aether/3.0.0/services';
import {RocEditBase} from '../../roc-edit-base';
import {MatSnackBar} from '@angular/material/snack-bar';
import {OpenPolicyAgentService} from '../../open-policy-agent.service';
import {EnterpriseEnterprise, NetworkNetwork} from 'src/openapi3/aether/3.0.0/models';

@Component({
    selector: 'aether-network-edit',
    templateUrl: './network-edit.component.html',
    styleUrls: ['../../common-edit.component.scss']
})
export class NetworkEditComponent extends RocEditBase<NetworkNetwork> implements OnInit {
    data: NetworkNetwork;
    enterprises: Array<EnterpriseEnterprise>;
    pathRoot = 'network-3.0.0';
    pathListAttr = 'network';
    networkForm = this.fb.group({
        id: ['', Validators.compose([
            Validators.pattern('([A-Za-z0-9\\-\\_]+)'),
            Validators.minLength(1),
            Validators.maxLength(31),
        ])],
        'display-name': ['', Validators.compose([
            Validators.minLength(1),
            Validators.maxLength(80),
        ])],
        enterprise: [''],
        description: ['', Validators.compose([
            Validators.minLength(1),
            Validators.maxLength(100),
        ])],
        mcc: [0, Validators.compose([
            Validators.min(0),
            Validators.max(999)
        ])],
        mnc: [0, Validators.compose([
            Validators.min(0),
            Validators.max(999)
        ])],
    });

    constructor(
        private networkNetworkService: NetworkNetworkService,
        private aetherService: AetherService,
        protected route: ActivatedRoute,
        protected router: Router,
        protected fb: FormBuilder,
        protected bs: BasketService,
        protected snackBar: MatSnackBar,
        public opaService: OpenPolicyAgentService,
    ) {
        super(snackBar, bs, route, router, 'network-3.0.0', 'network');
        super.form = this.networkForm;
        super.loadFunc = this.loadNetworkNetwork;
        this.networkForm.get(['mcc'])[TYPE] = 'number';
        this.networkForm.get(['mnc'])[TYPE] = 'number';

    }

    ngOnInit(): void {
        this.loadEnterprises(this.target);
        super.init();
    }

    loadNetworkNetwork(target: string, id: string): void {
        this.networkNetworkService.getNetworkNetwork({
            target,
            id
        }).subscribe(
            (value => {
                this.data = value;
                this.populateFormData(value);
            }),
            error => {
                console.warn('Error getting NetworkNetwork(s) for ', target, error);
            },
            () => {
                const basketPreview = this.bs.buildPatchBody().Updates;
                if (this.pathRoot in basketPreview && this.pathListAttr in basketPreview['network-3.0.0']) {
                    basketPreview['network-3.0.0'].network.forEach((basketItems) => {
                        if (basketItems.id === id) {
                            this.populateFormData(basketItems);
                        }
                    });
                }
                console.log('Finished loading NetworkNetwork(s)', target, id);
            }
        );
    }
    loadEnterprises(target: string): void {
        this.aetherService.getEnterprise({
            target,
        }).subscribe(
            (value => {
                this.enterprises = value.enterprise;
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

    private populateFormData(value: NetworkNetwork): void {
        if (value['display-name']) {
            this.networkForm.get('display-name').setValue(value['display-name']);
            this.networkForm.get('display-name')[ORIGINAL] = value['display-name'];
        }
        if (value.description) {
            this.networkForm.get('description').setValue(value.description);
            this.networkForm.get('description')[ORIGINAL] = value.description;
        }
        if (value.enterprise != null) {
            this.networkForm.get('enterprise').setValue(value.enterprise);
            this.networkForm.get('enterprise')[ORIGINAL] = value.enterprise;
        }
        if (value.mcc) {
            this.networkForm.get('mcc').setValue(value.mcc);
            this.networkForm.get('mcc')[ORIGINAL] = value.mcc;
        }
        if (value.mnc) {
            this.networkForm.get('mnc').setValue(value.mnc);
            this.networkForm.get('mnc')[ORIGINAL] = value.mnc;
        }
    }

}
