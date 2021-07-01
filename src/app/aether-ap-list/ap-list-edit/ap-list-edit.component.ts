/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {Component, EventEmitter, OnInit} from '@angular/core';
import {RocEditBase} from '../../roc-edit-base';
import {FormArray, FormBuilder, FormControl, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {BasketService, IDATTRIBS, ORIGINAL, TYPE} from '../../basket.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Service as AetherService} from '../../../openapi3/aether/3.0.0/services';
import {OpenPolicyAgentService} from '../../open-policy-agent.service';
import {ApListApList} from '../../../openapi3/aether/3.0.0/models/ap-list-ap-list';
import {ApListApListService} from '../../../openapi3/aether/3.0.0/services';
import {ApListApListAccessPoints} from '../../../openapi3/aether/3.0.0/models/ap-list-ap-list-access-points';
import {AccessPointParam} from '../access-point-select/access-point-select.component';
import {EnterpriseEnterprise} from '../../../openapi3/aether/3.0.0/models/enterprise-enterprise';


@Component({
    selector: 'aether-ap-list-edit',
    templateUrl: './ap-list-edit.component.html',
    styleUrls: ['../../common-edit.component.scss']
})
export class ApListEditComponent extends RocEditBase<ApListApList> implements OnInit {

    data: ApListApList;
    enterprises: Array<EnterpriseEnterprise>;
    accessPoints: Array<ApListApListAccessPoints>;
    showAccessDisplay: boolean = false;

    apForm = this.fb.group({
        id: ['', Validators.compose([
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
            Validators.maxLength(80),
        ])],
        'access-points': this.fb.array([])
    });

    constructor(
        private apListApListService: ApListApListService,
        private aetherService: AetherService,
        protected route: ActivatedRoute,
        protected router: Router,
        private fb: FormBuilder,
        protected bs: BasketService,
        protected snackBar: MatSnackBar,
        public opaService: OpenPolicyAgentService,
    ) {
        super(snackBar, bs, route, router, 'ap-list-3.0.0', 'ap-list');
        super.form = this.apForm;
        super.loadFunc = this.loadApListApList;
        this.apForm.get(['access-points'])[IDATTRIBS] = ['address'];
    }

    ngOnInit(): void {
        this.loadEnterprises(this.target);
        super.init();
    }

    get accessPointControls(): FormArray {
        return this.apForm.get(['access-points']) as FormArray;
    }

    get accessPointExisting(): string[] {
        const existingList: string[] = [];
        (this.apForm.get(['access-points']) as FormArray).controls.forEach((ap) => {
            existingList.push(ap.get('access-points').value);
        });
        return existingList;
    }

    deleteFromSelect(ap: FormControl): void {
        this.bs.deleteIndexedEntry('/ap-list-3.0.0/ap-list[id=' + this.id +
            ']/access-points[address=' + ap + ']', 'access-points');
        const index = (this.apForm.get(['access-points']) as FormArray)
            .controls.findIndex((c) => c.value[Object.keys(c.value)[0]] === ap);
        (this.apForm.get(['access-points']) as FormArray).removeAt(index);
    }

    private populateFormData(value: ApListApList): void {
        if (value['display-name']) {
            this.apForm.get('display-name').setValue(value['display-name']);
            this.apForm.get('display-name')[ORIGINAL] = value['display-name'];
        }
        if (value.description) {
            this.apForm.get('description').setValue(value.description);
            this.apForm.get('description')[ORIGINAL] = value.description;
        }
        if (value.enterprise != null) {
            this.apForm.get('enterprise').setValue(value.enterprise);
            this.apForm.get('enterprise')[ORIGINAL] = value.enterprise;
        }
        if (value['access-points'] && this.apForm.value['access-points'].length === 0) {
            for (const ap of value['access-points']) {
                let isDeleted = false;
                Object.keys(localStorage)
                    .filter(checkerKey => checkerKey.startsWith('/basket-delete/ap-list-3.0.0/ap-list[id=' + value.id +
                        ']/access-points[address='))
                    .forEach((checkerKey) => {
                        if (checkerKey.includes(ap.address)) {
                            isDeleted = true;
                        }
                    });
                if (!isDeleted) {
                    const addressFormControl = this.fb.control(ap.address);
                    addressFormControl[ORIGINAL] = ap.address;

                    const tacFormControl = this.fb.control(ap.tac);
                    tacFormControl[ORIGINAL] = ap.tac;
                    tacFormControl[TYPE] = 'number';

                    const enabledFormControl = this.fb.control(ap.enable);
                    enabledFormControl[ORIGINAL] = ap.enable;
                    enabledFormControl[TYPE] = 'boolean';

                    (this.apForm.get('access-points') as FormArray).push(this.fb.group({
                        address: addressFormControl,
                        tac: tacFormControl,
                        enable: enabledFormControl
                    }));
                }
                isDeleted = false;
            }
        } else if (value['access-points'] && this.apForm.value['access-points'].length !== 0) {
            // All Access Points
            for (const eachValueAp of value['access-points']) {
                (this.apForm.get('access-points') as FormArray).push(this.fb.group({
                    address: eachValueAp.address,
                    tac: eachValueAp.tac,
                    enable: eachValueAp.enable
                }));
            }
        }
    }

    openAccessDisplayCard(event: AccessPointParam): void {
        this.showAccessDisplay = !this.showAccessDisplay;
        if (event.cancelled === false) {

            this.apForm.markAsDirty();
            this.apForm.markAsTouched();

            const addressFormControl = this.fb.control(event.address);
            addressFormControl.markAsTouched();
            addressFormControl.markAsDirty();

            const tacFormControl = this.fb.control(event.tac);
            tacFormControl.markAsTouched();
            tacFormControl.markAsDirty();
            tacFormControl[TYPE] = 'number';

            const enableFormControl = this.fb.control(event.enable);
            enableFormControl.markAsTouched();
            enableFormControl.markAsDirty();
            enableFormControl[TYPE] = 'boolean';

            (this.apForm.get('access-points') as FormArray).push(this.fb.group({
                address: addressFormControl,
                tac: tacFormControl,
                enable: enableFormControl
            }));
        } else {
            return;
        }

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

    loadApListApList(target: string, id: string): void {
        this.apListApListService.getApListApList({
            target,
            id
        }).subscribe(
            (value => {
                this.data = value;
                this.populateFormData(value);
            }),
            error => {
                console.warn('Error getting ApListApList(s) for ', target, error);
            },
            () => {
                const basketPreview = this.bs.buildPatchBody().Updates;
                if (this.pathRoot in basketPreview && this.pathListAttr in basketPreview['ap-list-3.0.0']) {
                    basketPreview['ap-list-3.0.0']['ap-list'].forEach((basketItems) => {
                        if (basketItems.id === id) {
                            this.populateFormData(basketItems);
                        }
                    });
                }
                console.log('Finished loading ApListApList(s)', target, id);
            }
        );
    }
}
