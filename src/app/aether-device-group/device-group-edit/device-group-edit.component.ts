import {Component, OnInit} from '@angular/core';
import {RocEditBase} from "../../roc-edit-base";
import {DeviceGroupDeviceGroup} from "../../../openapi3/aether/3.0.0/models/device-group-device-group";
import {FormArray, FormBuilder, Validators} from "@angular/forms";
import {OpenPolicyAgentService} from "../../open-policy-agent.service";
import {ActivatedRoute, Router} from "@angular/router";
import {BasketService, IDATTRIBS, ORIGINAL, TYPE} from "../../basket.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DeviceGroupDeviceGroupService} from "../../../openapi3/aether/3.0.0/services/device-group-device-group.service";
import {DeviceGroupDeviceGroupImsis} from "../../../openapi3/aether/3.0.0/models/device-group-device-group-imsis";

@Component({
    selector: 'aether-device-group-edit',
    templateUrl: './device-group-edit.component.html',
    styleUrls: ['./device-group-edit.component.scss']
})
export class DeviceGroupEditComponent extends RocEditBase<DeviceGroupDeviceGroup> implements OnInit {

    data: DeviceGroupDeviceGroup;
    imsis: Array<DeviceGroupDeviceGroupImsis>;
    showImsiDisplay: boolean = false;

    deviceGroupForm = this.fb.group({
        id: ['', Validators.compose([
            Validators.minLength(1),
            Validators.maxLength(31),
        ])],
        'display-name': ['', Validators.compose([
            Validators.minLength(1),
            Validators.maxLength(80),
        ])],
        'ip-domain': [''],
        site: [''],
        imsis: this.fb.array([])
    });

    constructor(
        private deviceGroupDeviceGroupService: DeviceGroupDeviceGroupService,
        protected route: ActivatedRoute,
        protected router: Router,
        private fb: FormBuilder,
        protected bs: BasketService,
        protected snackBar: MatSnackBar,
        public opaService: OpenPolicyAgentService,
    ) {
        super(snackBar, bs, route, router, 'device-group-3.0.0', 'device-group');
        super.form = this.deviceGroupForm;
        super.loadFunc = this.loadDeviceGroupDeviceGroup;
    }

    ngOnInit(): void {
        super.init();
    }

    get imsiControls(): FormArray {
        //console.log(this.deviceGroupForm.get('imisis') as FormArray, 'Controls')
        return this.deviceGroupForm.get(['imsis']) as FormArray;
    }

    get imsisExisting(): string[] {
        const existingList: string[] = [];
        (this.deviceGroupForm.get(['imisis']) as FormArray).controls.forEach((ap) => {
            existingList.push(ap.get('imisis').value);
        });
        return existingList;
    }

    private populateFormData(value: DeviceGroupDeviceGroup): void {
        if (value['display-name']) {
            this.deviceGroupForm.get('display-name').setValue(value['display-name']);
            this.deviceGroupForm.get('display-name')[ORIGINAL] = value['display-name'];
        }
        if (value.description) {
            this.deviceGroupForm.get('description').setValue(value['description']);
            this.deviceGroupForm.get('description')[ORIGINAL] = value['description'];
        }
        if (value['imsis']) {
            if (this.deviceGroupForm.value['imsis'].length === 0) {
                for (const dg of value['imsis']) {
                    const nameFormControl = this.fb.control(dg.name);
                    nameFormControl[ORIGINAL] = dg.name;

                    const imsiRangeFromFormControl = this.fb.control(dg['imsi-range-from']);
                    imsiRangeFromFormControl[ORIGINAL] = dg['imsi-range-from'];
                    imsiRangeFromFormControl[TYPE] = 'number';

                    const imsiRangeToFormControl = this.fb.control(dg["imsi-range-to"]);
                    imsiRangeToFormControl[ORIGINAL] = dg['imsi-range-to'];
                    imsiRangeToFormControl[TYPE] = 'number';

                    (this.deviceGroupForm.value['imsis'] as FormArray).push(this.fb.group({
                        name: nameFormControl,
                        'imsi-range-from': imsiRangeFromFormControl,
                        'imsi-range-to': imsiRangeToFormControl
                    }));
                }
                console.log('Got imsi', value);
            } else {
                for (const eachValueImsis of value['imsis']) {
                    let eachFormRulePosition = 0;
                    for (const eachFormSubscribe of this.deviceGroupForm.value['imsis']) {
                        if (eachValueImsis['imsis'] === eachFormSubscribe['imsis']) {
                            this.deviceGroupForm.value['imsis'].name = eachValueImsis.name;
                            this.deviceGroupForm.value['imsis']['imsi-range-from'] = eachValueImsis['imsi-range-from'];
                            this.deviceGroupForm.value['imsis']['imsi-range-to'] = eachValueImsis['imsi-range-to'];
                        }
                        eachFormRulePosition++;
                    }
                }
            }
        }
    }

    loadDeviceGroupDeviceGroup(target: string, id: string): void {
        this.deviceGroupDeviceGroupService.getDeviceGroupDeviceGroup({
            target,
            id
        }).subscribe(
            (value => {
                this.data = value;
                this.populateFormData(value);
            }),
            error => {
                console.warn('Error getting DeviceGroupDeviceGroup(s) for ', target, error);
            },
            () => {
                const basketPreview = this.bs.buildPatchBody().Updates;
                if (this.pathRoot in basketPreview && this.pathListAttr in basketPreview['device-group-3.0.0']) {
                    basketPreview['device-group-3.0.0']['device-group'].forEach((basketItems) => {
                        if (basketItems.id === id) {
                            this.populateFormData(basketItems);
                        }
                    });
                }
                console.log('Finished loading DeviceGroupDeviceGroup(s)', target, id);
            }
        );
    }

}
