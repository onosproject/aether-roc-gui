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
import {OpenPolicyAgentService} from '../../open-policy-agent.service';
import {ApListApList} from "../../../openapi3/aether/3.0.0/models/ap-list-ap-list";
import {ApListApListService} from "../../../openapi3/aether/3.0.0/services";
import {ApListApListAccessPoints} from "../../../openapi3/aether/3.0.0/models/ap-list-ap-list-access-points";


@Component({
    selector: 'aether-ap-list-edit',
    templateUrl: './ap-list-edit.component.html',
    styleUrls: ['../../common-edit.component.scss']
})
export class ApListEditComponent extends RocEditBase<ApListApList> implements OnInit {

    data: ApListApList;
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
        description: ['', Validators.compose([
            Validators.minLength(1),
            Validators.maxLength(80),
        ])],
        'access-points': this.fb.array([])
    });

    constructor(
        private apListApListService: ApListApListService,
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
        // this.apForm.get(['access-points'])[IDATTRIBS] = ['access-points'];
    }

    ngOnInit(): void {
        super.init();
    }

    get accessPointControls(): FormArray {
        //console.log(this.apForm.get('access-points') as FormArray, 'Controls')
        return this.apForm.get(['access-points']) as FormArray;
    }

    get accessPointExisting(): string[] {
        const existingList: string[] = [];
        (this.apForm.get(['access-points']) as FormArray).controls.forEach((ap) => {
            existingList.push(ap.get('access-points').value);
        });
        return existingList;
    }

    // apSelected(selected: string): void {
    //     // Push into form
    //     if (selected !== undefined && selected !== '') {
    //         const addressFormControl = this.fb.control(selected);
    //         addressFormControl.markAsTouched();
    //         addressFormControl.markAsDirty();
    //         const tacFormControl = this.fb.control(0);
    //         tacFormControl.markAsTouched();
    //         tacFormControl.markAsDirty();
    //         tacFormControl[TYPE] = 'number';
    //         const enableFormControl = this.fb.control(false);
    //         enableFormControl.markAsTouched();
    //         enableFormControl.markAsDirty();
    //         enableFormControl[TYPE] = 'boolean';
    //         (this.apForm.get(['access-points']) as FormArray).push(this.fb.group({
    //             'address': addressFormControl,
    //             tac: tacFormControl,
    //             enable: enableFormControl
    //         }));
    //         console.log('Adding new Value', selected);
    //     }
    //     this.showAccessDisplay = false;
    // }

    // deleteFromSelect(ap: FormControl): void {
    //     this.bs.deleteIndexedEntry('/ipdomain-3.0.0/access-point[id=' + this.id +
    //         ']/access-profile[access-profile=' + ap + ']', 'access-profile');
    //     const index = (this.apForm.get(['profiles', 'access-profile']) as FormArray)
    //         .controls.findIndex((c) => c.value[Object.keys(c.value)[0]] === ap);
    //     (this.apForm.get(['access-profile']) as FormArray).removeAt(index);
    // }

    updateFormWhenPopulated(address: string, tac: number, enable: boolean) {

    }

    private populateFormData(value: ApListApList): void {
        if(value['display-name']) {
            this.apForm.get('display-name').setValue(value['display-name']);
            this.apForm.get('display-name')[ORIGINAL] = value['display-name'];
        }
        if(value.description) {
            this.apForm.get('description').setValue(value['description']);
            this.apForm.get('description')[ORIGINAL] = value['description'];
        }
        if(value['access-points']) {
            if ((this.apForm.get('access-points') as FormArray).length === 0) {
                for (const ap of value['access-points']) {
                    const addressFormControl = this.fb.control(ap.address);
                    addressFormControl[ORIGINAL] = ap.address;

                    const tacFormControl = this.fb.control(ap.tac);
                    tacFormControl[ORIGINAL] = ap.tac;
                    tacFormControl[TYPE] = 'number';

                    const enabledFormControl = this.fb.control(ap.enable);;
                    enabledFormControl[ORIGINAL] = ap.enable;
                    enabledFormControl[TYPE] = 'boolean';

                    (this.apForm.get('access-points') as FormArray).push(this.fb.group({
                        address: addressFormControl,
                        tac: tacFormControl,
                        enable: enabledFormControl
                    }));
                }
                console.log('Got access-point', value);
            }
            else {
               for (const eachValueAccessPoint of value['access-points']) {
                   let eachFormRulePosition = 0;
                   for (const eachFormSubscribe of this.apForm.get('access-points').value) {
                       if (eachValueAccessPoint['access-points'] === eachFormSubscribe['access-points']){
                           this.apForm.value['access-points'].address = eachValueAccessPoint.address;
                           this.apForm.value['access-points'].tac = eachValueAccessPoint.tac;
                           this.apForm.value['access-points'].enable = eachValueAccessPoint.enable;
                       }
                       eachFormRulePosition++;
                   }
               }
            }
        }
    }

    openAccessDisplayCard(): void {
        this.showAccessDisplay = !this.showAccessDisplay;
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
