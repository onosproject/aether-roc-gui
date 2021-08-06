/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormArray, FormBuilder, FormControl, Validators} from '@angular/forms';
import {EnterpriseEnterpriseService} from '../../../openapi3/aether/3.0.0/services';
import {
    EnterpriseEnterprise, EnterpriseEnterpriseConnectivityService
} from '../../../openapi3/aether/3.0.0/models';
import {BasketService, IDATTRIBS, ORIGINAL, TYPE} from '../../basket.service';
import {MatHeaderRow, MatTable} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {RocEditBase} from '../../roc-edit-base';
import {MatSnackBar} from '@angular/material/snack-bar';
import {OpenPolicyAgentService} from '../../open-policy-agent.service';

interface ConnectivityServiceRow {
    id: string;
    enabled: boolean;
}

@Component({
    selector: 'aether-enterprise-edit',
    templateUrl: './enterprise-edit.component.html',
    styleUrls: [
        '../../common-edit.component.scss',
    ]
})
export class EnterpriseEditComponent extends RocEditBase<EnterpriseEnterprise> implements OnInit {

    @ViewChild(MatTable) table: MatTable<Array<ConnectivityServiceRow>>;
    @ViewChild(MatHeaderRow) row: MatHeaderRow;
    @ViewChild(MatSort) sort: MatSort;
    showConnectDisplay: boolean = false;
    enterpriseConnectivityServices: EnterpriseEnterpriseConnectivityService;
    data: EnterpriseEnterprise;

    displayedColumns = [
        'connectivity-service',
        'enabled'
    ];

    entForm = this.fb.group({
        id: ['', Validators.compose([
            Validators.pattern('([A-Za-z0-9\\-\\_\\.]+)'),
            Validators.minLength(1),
            Validators.maxLength(31),
        ])],
        'display-name': ['', Validators.compose([
            Validators.minLength(1),
            Validators.maxLength(80),
        ])],
        description: ['', Validators.compose([
            Validators.minLength(1),
            Validators.maxLength(100)
        ])],
        'connectivity-service': this.fb.array([])
    });

    constructor(
        private enterpriseEnterpriseService: EnterpriseEnterpriseService,
        protected route: ActivatedRoute,
        protected router: Router,
        private fb: FormBuilder,
        protected bs: BasketService,
        protected snackBar: MatSnackBar,
        public opaService: OpenPolicyAgentService,
    ) {
        super(snackBar, bs, route, router, 'enterprise-3.0.0', 'enterprise');
        super.form = this.entForm;
        super.loadFunc = this.loadEnterpriseEnterprises;
        this.entForm.get('connectivity-service')[IDATTRIBS] = ['connectivity-service'];
    }

    get connectivityServices(): FormArray {
        return this.entForm.get('connectivity-service') as FormArray;
    }

    get connectivityServiceExists(): string[] {
        const existingList: string[] = [];
        (this.entForm.get(['connectivity-service']) as FormArray).controls.forEach((cs) => {
            existingList.push(cs.get('connectivity-service').value);
        });
        return existingList;
    }

    csSelected(selected: string): void {
        // Push into form
        if (selected !== undefined && selected !== '') {
            const csFormControl = this.fb.control(selected);
            csFormControl.markAsTouched();
            csFormControl.markAsDirty();
            const enabledControl = this.fb.control(false);
            enabledControl.markAsTouched();
            enabledControl.markAsDirty();
            enabledControl[TYPE] = 'boolean';
            (this.entForm.get('connectivity-service') as FormArray).push(this.fb.group({
                'connectivity-service': csFormControl,
                enabled: enabledControl,
            }));
            console.log('Adding new Value', selected);
        }
        this.showConnectDisplay = false;
    }

    ngOnInit(): void {
        super.init();
    }

    private populateFormData(value: EnterpriseEnterprise, id: string): void {
        if (value['display-name']) {
            this.entForm.get('display-name').setValue(value['display-name']);
            this.entForm.get('display-name')[ORIGINAL] = value['display-name'];
        }
        if (value.description) {
            this.entForm.get('description').setValue(value.description);
            this.entForm.get('description')[ORIGINAL] = value.description;
        }
        if (value['connectivity-service'] && this.entForm.value['connectivity-service'].length === 0) {
            for (const cs of value['connectivity-service']) {
                let isDeleted = false;
                Object.keys(localStorage)
                    .filter(checkerKey => checkerKey.startsWith('/basket-delete/enterprise-3.0.0/enterprise[id=' + id +
                        ']/connectivity-service[connectivity-service='))
                    .forEach((checkerKey) => {
                        if (checkerKey.includes(cs['connectivity-service'])) {
                            isDeleted = true;
                        }
                    });
                if (!isDeleted) {
                    const csFormControl = this.fb.control(cs['connectivity-service']);
                    csFormControl[ORIGINAL] = cs['connectivity-service'];

                    const enabledControl = this.fb.control(cs.enabled);
                    enabledControl[ORIGINAL] = cs.enabled;
                    enabledControl[TYPE] = 'boolean';

                    (this.entForm.get('connectivity-service') as FormArray).push(this.fb.group({
                        'connectivity-service': csFormControl,
                        enabled: enabledControl,
                    }));
                }
                isDeleted = false;
            }
        } else if (value['connectivity-service'] && this.entForm.value['connectivity-service'].length !== 0) {
            this.entForm.value['connectivity-service'].forEach((eachValueCs, eachFormCsPosition) => {
                for (const eachFormCs of value['connectivity-service']) {
                    if (eachValueCs['connectivity-service'] === eachFormCs['connectivity-service']) {
                        this.entForm.get(['connectivity-service', eachFormCsPosition, 'enabled']).setValue(eachFormCs.allow);
                    } else {
                        (this.entForm.get(['connectivity-service']) as FormArray).push(this.fb.group({
                            'connectivity-service': eachFormCs.application,
                            enabled: eachFormCs.enabled
                        }));
                    }
                }
            });
        }

    }

    loadEnterpriseEnterprises(target: string, id: string): void {
        this.enterpriseEnterpriseService.getEnterpriseEnterprise({
            target,
            id
        }).subscribe(
            (value => {
                this.data = value;
                this.populateFormData(value, id);
            }),
            error => {
                console.warn('Error getting Enterprise Profiles for ', target, error);
            },
            () => {
                const basketPreview = this.bs.buildPatchBody().Updates;
                if (this.pathRoot in basketPreview && this.pathListAttr in basketPreview['enterprise-3.0.0']) {
                    basketPreview['enterprise-3.0.0'].enterprise.forEach((basketItems) => {
                        if (basketItems.id === id) {
                            this.populateFormData(basketItems, id);
                        }
                    });
                }
                console.log('Finished loading Enterprise Profiles', target);
            }
        );
    }

    deleteFromSelect(cs: FormControl): void {
        this.bs.deleteIndexedEntry('/enterprise-3.0.0/enterprise[id=' + this.id +
            ']/connectivity-service[connectivity-service=' + cs + ']', 'connectivity-service', '' + cs);
        const index = (this.entForm.get('connectivity-service') as FormArray)
            .controls.findIndex((c) => c.value[Object.keys(c.value)[0]] === cs);
        (this.entForm.get('connectivity-service') as FormArray).removeAt(index);
    }
}
