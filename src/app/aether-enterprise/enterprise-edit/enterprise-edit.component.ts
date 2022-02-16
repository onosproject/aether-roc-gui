/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { EnterprisesEnterprise } from '../../../openapi3/aether/2.0.0/models';
import {
    BasketService,
    IDATTRIBS,
    ORIGINAL,
    REQDATTRIBS,
    TYPE,
} from '../../basket.service';
import { MatHeaderRow, MatTable } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { RocEditBase } from '../../roc-edit-base';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OpenPolicyAgentService } from '../../open-policy-agent.service';
import { EnterprisesEnterpriseService } from '../../../openapi3/aether/2.0.0/services';
import { AETHER_TARGET } from '../../../environments/environment';

interface ConnectivityServiceRow {
    id: string;
    enabled: boolean;
}

@Component({
    selector: 'aether-enterprise-edit',
    templateUrl: './enterprise-edit.component.html',
    styleUrls: ['../../common-edit.component.scss'],
})
export class EnterpriseEditComponent extends RocEditBase implements OnInit {
    @ViewChild(MatTable) table: MatTable<Array<ConnectivityServiceRow>>;
    @ViewChild(MatHeaderRow) row: MatHeaderRow;
    @ViewChild(MatSort) sort: MatSort;
    showConnectDisplay = false;
    data: EnterprisesEnterprise;
    entpriseid: string;

    displayedColumns = ['connectivity-service', 'enabled'];

    entForm = this.fb.group({
        'enterprise-id': [
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
        'connectivity-service': this.fb.array([]),
    });

    constructor(
        private enterpriseEnterpriseService: EnterprisesEnterpriseService,
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
            'Enterprises-2.0.0',
            'enterprise',
            'enterprise-id'
        );
        super.form = this.entForm;
        super.loadFunc = this.loadEnterprisesEnterprises;
        this.entForm.get('connectivity-service')[IDATTRIBS] = [
            'connectivity-service',
        ];
    }

    get connectivityServices(): FormArray {
        return this.entForm.get('connectivity-service') as FormArray;
    }

    get connectivityServiceExists(): string[] {
        const existingList: string[] = [];
        (
            this.entForm.get(['connectivity-service']) as FormArray
        ).controls.forEach((cs) => {
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
            const enabledControl = this.fb.control(true);
            enabledControl.markAsTouched();
            enabledControl.markAsDirty();
            enabledControl[TYPE] = 'boolean';
            (this.entForm.get('connectivity-service') as FormArray).push(
                this.fb.group({
                    'connectivity-service': csFormControl,
                    enabled: enabledControl,
                })
            );
            (
                this.entForm.get('connectivity-service') as FormArray
            ).markAsTouched();
            console.log('Adding new Value', selected);
        }
        this.showConnectDisplay = false;
    }

    ngOnInit(): void {
        super.init();
    }

    private populateFormData(value: EnterprisesEnterprise, id: string): void {
        if (value['enterprise-id']) {
            this.entForm.get('enterprise-id').setValue(value['enterprise-id']);
            this.entForm.get('enterprise-id')[ORIGINAL] =
                value['enterprise-id'];
        }
        if (value['display-name']) {
            this.entForm.get('display-name').setValue(value['display-name']);
            this.entForm.get('display-name')[ORIGINAL] = value['display-name'];
        }
        if (value.description) {
            this.entForm.get('description').setValue(value.description);
            this.entForm.get('description')[ORIGINAL] = value.description;
        }
        if (
            value['connectivity-service'] &&
            this.entForm.value['connectivity-service'].length === 0
        ) {
            for (const cs of value['connectivity-service']) {
                let isDeleted = false;
                Object.keys(localStorage)
                    .filter((checkerKey) =>
                        checkerKey.startsWith(
                            '/basket-delete/Enterprises-2.0.0/enterprise[enterprise-id=' +
                                id +
                                ']/connectivity-service[connectivity-service='
                        )
                    )
                    .forEach((checkerKey) => {
                        if (checkerKey.includes(cs['connectivity-service'])) {
                            isDeleted = true;
                        }
                    });
                if (!isDeleted) {
                    const csFormControl = this.fb.control(
                        cs['connectivity-service']
                    );
                    csFormControl[ORIGINAL] = cs['connectivity-service'];

                    const enabledControl = this.fb.control(cs.enabled);
                    enabledControl[ORIGINAL] = cs.enabled;
                    enabledControl[TYPE] = 'boolean';

                    (
                        this.entForm.get('connectivity-service') as FormArray
                    ).push(
                        this.fb.group({
                            'connectivity-service': csFormControl,
                            enabled: enabledControl,
                        })
                    );
                }
                isDeleted = false;
            }
        } else if (
            value['connectivity-service'] &&
            this.entForm.value['connectivity-service'].length !== 0
        ) {
            this.entForm.value['connectivity-service'].forEach(
                (eachValueCs, eachFormCsPosition) => {
                    for (const eachFormCs of value['connectivity-service']) {
                        if (
                            eachValueCs['connectivity-service'] ===
                            eachFormCs['connectivity-service']
                        ) {
                            this.entForm
                                .get([
                                    'connectivity-service',
                                    eachFormCsPosition,
                                    'enabled',
                                ])
                                .setValue(eachFormCs.enabled);
                        } else {
                            (
                                this.entForm.get([
                                    'connectivity-service',
                                ]) as FormArray
                            ).push(
                                this.fb.group({
                                    'connectivity-service':
                                        eachFormCs['connectivity-service'],
                                    enabled: eachFormCs.enabled,
                                })
                            );
                        }
                    }
                }
            );
        }
    }

    loadEnterprisesEnterprises(target: string, id: string): void {
        this.enterpriseEnterpriseService
            .getEnterprisesEnterprise({
                target: AETHER_TARGET,
                'enterprise-id': id,
            })
            .subscribe(
                (value) => {
                    this.data = value;
                    this.entpriseid = value['enterprise-id'];
                    this.populateFormData(value, id);
                },
                (error) => {
                    console.warn(
                        'Error getting Enterprise Profiles for ',
                        target,
                        error
                    );
                },
                () => {
                    const basketPreview = this.bs.buildPatchBody().Updates;
                    if (
                        this.pathRoot in basketPreview &&
                        this.pathListAttr in basketPreview['Enterprises-2.0.0']
                    ) {
                        basketPreview['Enterprises-2.0.0'].enterprise.forEach(
                            (basketItems) => {
                                if (basketItems['enterprise-id'] === id) {
                                    this.populateFormData(basketItems, id);
                                }
                            }
                        );
                    }
                    console.log('Finished loading Enterprise Profiles', target);
                }
            );
    }

    deleteFromSelect(cs: string): void {
        this.bs.deleteIndexedEntry(
            '/Enterprises-2.0.0/enterprise[enterprise-id=' +
                this.data['enterprise-id'] +
                ']/connectivity-service[connectivity-service=' +
                cs +
                ']',
            'connectivity-service',
            cs,
            this.ucmap
        );
        const index = (
            this.entForm.get('connectivity-service') as FormArray
        ).controls.findIndex((c) => c.value[Object.keys(c.value)[0]] === cs);
        (this.entForm.get('connectivity-service') as FormArray).removeAt(index);
        this.snackBar.open(
            'Deletion of ' + cs + ' added to basket',
            undefined,
            { duration: 2000 }
        );
    }

    private get ucmap(): Map<string, string> {
        const vcsId =
            '/Enterprises-2.0.0/enterprise[enterprise-id=' + this.id + ']';
        let parentUc = localStorage.getItem(vcsId);
        if (parentUc === null) {
            parentUc = this.entForm[REQDATTRIBS];
        }
        const ucMap = new Map<string, string>();
        ucMap.set(vcsId, parentUc);
        return ucMap;
    }
}
