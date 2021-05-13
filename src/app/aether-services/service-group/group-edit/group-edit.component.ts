/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormArray, FormBuilder, FormControl, Validators} from '@angular/forms';
import {ServiceGroupServiceGroupService} from '../../../../openapi3/aether/2.1.0/services';
import {ServiceGroupServiceGroup} from '../../../../openapi3/aether/2.1.0/models';
import {BasketService, IDATTRIBS, ORIGINAL, TYPE} from '../../../basket.service';
import {RocEditBase} from '../../../roc-edit-base';
import {MatSnackBar} from '@angular/material/snack-bar';
import {OpenPolicyAgentService} from '../../../open-policy-agent.service';

@Component({
    selector: 'aether-group-edit',
    templateUrl: './group-edit.component.html',
    styleUrls: [
        '../../../common-edit.component.scss',
    ]
})
export class GroupEditComponent extends RocEditBase<ServiceGroupServiceGroup> implements OnInit {
    data: ServiceGroupServiceGroup;
    showAddComponent: boolean = false;

    groupForm = this.fb.group({
        id: ['', Validators.compose([
            Validators.minLength(1),
            Validators.maxLength(31),
        ])],
        'display-name': ['', Validators.compose([
            Validators.minLength(1),
            Validators.maxLength(80),
        ])],
        description: ['', Validators.compose([
            Validators.minLength(1),
            Validators.maxLength(100),
        ])],
        ['service-policies']: this.fb.array([])
    });

    constructor(
        private serviceGroupServiceGroupService: ServiceGroupServiceGroupService,
        protected route: ActivatedRoute,
        protected router: Router,
        protected fb: FormBuilder,
        protected bs: BasketService,
        protected snackBar: MatSnackBar,
        public opaService: OpenPolicyAgentService,
    ) {
        super(snackBar, bs, route, router, 'service-group-2.1.0', 'service-group');
        super.form = this.groupForm;
        super.loadFunc = this.loadServiceGroupServiceGroup;
        this.groupForm.get(['service-policies'])[IDATTRIBS] = ['service-policy'];
    }
    get policyServices(): FormArray {
        return this.groupForm.get('service-policies') as FormArray;
    }

    get serviceRuleExists(): string[] {
        const existingList: string[] = [];
        (this.groupForm.get(['service-policies']) as FormArray).controls.forEach((sp) => {
            existingList.push(sp.get('service-policy').value);
        });
        return existingList;
    }

    ruleSelected(selected: string): void {
        // Push into form
        if (selected !== undefined && selected !== '') {
            const policyFormControl = this.fb.control(selected);
            policyFormControl.markAsTouched();
            policyFormControl.markAsDirty();
            const kindControl = this.fb.control('default');
            kindControl.markAsTouched();
            kindControl.markAsDirty();
            (this.groupForm.get('service-policies') as FormArray).push(this.fb.group({
                'service-policy': policyFormControl,
                kind: kindControl,
            }));
            console.log('Adding new Value', selected);
        }
        this.showAddComponent = false;
    }

    ngOnInit(): void {
        super.init();
    }

    loadServiceGroupServiceGroup(target: string, id: string): void {
        this.serviceGroupServiceGroupService.getServiceGroupServiceGroup({
            target,
            id
        }).subscribe(
            (value => {
                this.data = value;
                this.groupForm.get('display-name').setValue(value['display-name']);
                this.groupForm.get('display-name')[ORIGINAL] = value['display-name'];

                this.groupForm.get('description').setValue(value.description);
                this.groupForm.get('description')[ORIGINAL] = value.description;

                for (const eachPolicy of value['service-policies']) {
                    const policyFormControl = this.fb.control(eachPolicy['service-policy']);
                    policyFormControl[ORIGINAL] = eachPolicy['service-policy'];
                    const kindControl = this.fb.control(eachPolicy.kind);
                    kindControl[ORIGINAL] = eachPolicy.kind;

                    (this.groupForm.get(['service-policies']) as FormArray).push(this.fb.group({
                    ['service-policy']: policyFormControl,
                        kind: kindControl,
                    }));
                }
            }),
            error => {
                console.warn('Error getting ServiceGroupServiceGroup(s) for ', target, error);
            },
            () => {
                console.log('Finished loading ServiceGroupServiceGroup(s)', target, id);
            }
        );
    }
    deleteFromSelect(policy: FormControl): void {
        this.bs.deleteIndexedEntry('/service-group-2.1.0/service-group[id=' + this.id +
            ']/service-policies[service-policy=' + policy + ']', 'service-policy');
        const index = (this.groupForm.get(['service-policies']) as FormArray)
            .controls.findIndex((c) => c.value[Object.keys(c.value)[0]] === policy);
        (this.groupForm.get(['service-policies']) as FormArray).removeAt(index);
    }
}
