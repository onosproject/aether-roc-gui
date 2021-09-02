/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */

import {Component, OnInit} from '@angular/core';
import {RocEditBase} from '../../roc-edit-base';
import {DeviceGroupDeviceGroup} from '../../../openapi3/aether/3.0.0/models/device-group-device-group';
import {
    AbstractControl,
    FormArray,
    FormBuilder,
    ValidationErrors,
    ValidatorFn,
    Validators
} from '@angular/forms';
import {OpenPolicyAgentService} from '../../open-policy-agent.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Service as AetherService} from '../../../openapi3/aether/3.0.0/services';
import {BasketService, IDATTRIBS, ORIGINAL, REQDATTRIBS, TYPE} from '../../basket.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {DeviceGroupDeviceGroupService} from '../../../openapi3/aether/3.0.0/services/device-group-device-group.service';
import {DeviceGroupDeviceGroupImsis} from '../../../openapi3/aether/3.0.0/models/device-group-device-group-imsis';
import {IpDomainIpDomain} from '../../../openapi3/aether/3.0.0/models/ip-domain-ip-domain';
import {SiteSite} from '../../../openapi3/aether/3.0.0/models/site-site';
import {ImsiParam} from '../imsis-select/imsis-select.component';

const ValidateImsiRange: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    if (control.get(['imsis']).value.length !== 0) {
        const imsiFormvalue = control.get(['imsis']).value;
        let isValid: ValidationErrors;
        imsiFormvalue.every(eachImsi => {
            for (const eachImsiFormValues of imsiFormvalue) {
                if (eachImsiFormValues.name !== eachImsi.name) {
                    isValid = ((eachImsi['imsi-range-to'] < eachImsiFormValues['imsi-range-from'] ||
                        eachImsi['imsi-range-from'] > eachImsiFormValues['imsi-range-to'])
                        && (eachImsiFormValues['imsi-range-from'] <= eachImsiFormValues['imsi-range-to']
                            && eachImsi['imsi-range-from'] <= eachImsi['imsi-range-to'] &&
                            eachImsi['imsi-range-to'] <= (100 + (eachImsi['imsi-range-from'])) &&
                            eachImsiFormValues['imsi-range-to'] <=
                            (100 + (eachImsiFormValues['imsi-range-from'])))) ? null : {isRangeNotValid: true};
                }
            }
        });
        return isValid;
    }
};

@Component({
    selector: 'aether-device-group-edit',
    templateUrl: './device-group-edit.component.html',
    styleUrls: ['../../common-edit.component.scss']
})

export class DeviceGroupEditComponent extends RocEditBase<DeviceGroupDeviceGroup> implements OnInit {

    data: DeviceGroupDeviceGroup;
    ipdomain: Array<IpDomainIpDomain>;
    site: Array<SiteSite>;
    imsis: Array<DeviceGroupDeviceGroupImsis> = [];
    showImsiDisplay: boolean = false;
    showAddImsi: boolean = false;
    SiteImisLength: number;
    ImsiRangeLimit :number;

    deviceGroupForm = this.fb.group({
        id: [undefined, Validators.compose([
            Validators.pattern('([A-Za-z0-9\\-\\_\\.]+)'),
            Validators.minLength(1),
            Validators.maxLength(31),
        ])],
        description: [undefined, Validators.compose([
            Validators.minLength(1),
            Validators.maxLength(80),
        ])],
        'display-name': [undefined, Validators.compose([
            Validators.minLength(1),
            Validators.maxLength(80),
        ])],
        'ip-domain': [undefined],
        site: [undefined],
        imsis: this.fb.array([])
    }, {validators: ValidateImsiRange});

    constructor(
        private deviceGroupDeviceGroupService: DeviceGroupDeviceGroupService,
        private aetherService: AetherService,
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
        this.deviceGroupForm[REQDATTRIBS] = ['site'];
        this.deviceGroupForm.get(['imsis'])[IDATTRIBS] = ['name'];
    }

    ngOnInit(): void {
        this.loadIpDomains(this.target);
        super.init();
        if (this.isNewInstance) {
            this.loadSites(this.target);
        }
    }

    fetchTooltipContent(): string {
        this.ImsiRangeLimit = Math.pow(10, this.SiteImisLength) - 1;
        return 'Maximum value: '+ this.ImsiRangeLimit +' Maximum range: 100'
    }

    get imsiControls(): FormArray {
        return this.deviceGroupForm.get(['imsis']) as FormArray;
    }

    get imsisExisting(): string[] {
        const existingList: string[] = [];
        (this.deviceGroupForm.get(['imsis']) as FormArray).controls.forEach((ap) => {
            existingList.push(ap.get('imsis').value);
        });
        return existingList;
    }

    displayImsiAdd(): void {
        this.showAddImsi = !!this.deviceGroupForm.get('site').value;
        this.site.forEach(eachSite => {
            if (eachSite.id === this.deviceGroupForm.get('site').value) {
                this.SiteImisLength = (eachSite['imsi-definition'].format.length - eachSite['imsi-definition'].format.indexOf('S'));
            }
        });

    }

    deleteFromSelect(im: string): void {
        this.bs.deleteIndexedEntry('/device-group-3.0.0/device-group[id=' + this.id +
            ']/imsis[name=' + im + ']', 'name', im);
        const index = (this.deviceGroupForm.get(['imsis']) as FormArray)
            .controls.findIndex((c) => c.value[Object.keys(c.value)[0]] === im);
        (this.deviceGroupForm.get(['imsis']) as FormArray).removeAt(index);
        this.snackBar.open('Deletion of ' + im + ' added to basket', undefined, {duration: 2000});
    }


    private populateFormData(value: DeviceGroupDeviceGroup): void {
        if (value['display-name']) {
            this.deviceGroupForm.get('display-name').setValue(value['display-name']);
            this.deviceGroupForm.get('display-name')[ORIGINAL] = value['display-name'];
        }
        if (value['ip-domain']) {
            this.deviceGroupForm.get('ip-domain').setValue(value['ip-domain']);
            this.deviceGroupForm.get('ip-domain')[ORIGINAL] = value['ip-domain'];
        }
        if (value.description) {
            this.deviceGroupForm.get('description').setValue(value.description);
            this.deviceGroupForm.get('description')[ORIGINAL] = value.description;
        }
        if (value.site) {
            this.deviceGroupForm.get('site').setValue(value.site);
            this.deviceGroupForm.get('site')[ORIGINAL] = value.site;
            this.loadSites(this.target);
        }
        if (value.imsis && this.deviceGroupForm.value.imsis.length === 0) {
            for (const im of value.imsis) {
                let isDeleted = false;
                Object.keys(localStorage)
                    .filter(checkerKey => checkerKey.startsWith('/basket-delete/device-group-3.0.0/device-group[id=' + value.id +
                        ']/imsis[name='))
                    .forEach((checkerKey) => {
                        if (checkerKey.includes(im.name)) {
                            isDeleted = true;
                        }
                    });
                if (!isDeleted) {
                    const nameFormControl = this.fb.control(im.name);
                    nameFormControl[ORIGINAL] = im.name;

                    let fromValue = im['imsi-range-from'];
                    if (fromValue === undefined) {
                        fromValue = 0;
                    }
                    const imsiRangeFromFormControl = this.fb.control(fromValue);
                    imsiRangeFromFormControl[ORIGINAL] = fromValue;
                    imsiRangeFromFormControl[TYPE] = 'number';

                    const imsiRangeToFormControl = this.fb.control(im['imsi-range-to']);
                    imsiRangeToFormControl[ORIGINAL] = im['imsi-range-to'];
                    imsiRangeToFormControl[TYPE] = 'number';

                    (this.deviceGroupForm.get('imsis') as FormArray).push(this.fb.group({
                        name: nameFormControl,
                        'imsi-range-from': imsiRangeFromFormControl,
                        'imsi-range-to': imsiRangeToFormControl
                    }));
                }
                isDeleted = false;
            }
        } else if (value.imsis && this.deviceGroupForm.value.imsis.length !== 0) {
            for (const eachValueImsis of value.imsis) {
                (this.deviceGroupForm.get('imsis') as FormArray).push(this.fb.group({
                    name: eachValueImsis.name,
                    'imsi-range-from': eachValueImsis['imsi-range-from'],
                    'imsi-range-to': eachValueImsis['imsi-range-to']
                }));
            }
        }
        this.imsis = this.deviceGroupForm.get('imsis').value;
    }

    openDeviceGroupCard(event: ImsiParam): void {
        this.showImsiDisplay = !this.showImsiDisplay;
        if (event.cancelled === false) {

            this.deviceGroupForm.markAsDirty();
            this.deviceGroupForm.markAsTouched();

            const nameFormControl = this.fb.control(event.name);
            nameFormControl.markAsTouched();
            nameFormControl.markAsDirty();

            const imsiRangeFromFormControl = this.fb.control(event['imsi-range-from']);
            imsiRangeFromFormControl.markAsTouched();
            imsiRangeFromFormControl.markAsDirty();
            imsiRangeFromFormControl[TYPE] = 'number';

            const imsiRangeToFormControl = this.fb.control(event['imsi-range-to']);
            imsiRangeToFormControl.markAsTouched();
            imsiRangeToFormControl.markAsDirty();
            imsiRangeToFormControl[TYPE] = 'boolean';

            (this.deviceGroupForm.get('imsis') as FormArray).push(this.fb.group({
                name: nameFormControl,
                'imsi-range-from': imsiRangeFromFormControl,
                'imsi-range-to': imsiRangeToFormControl
            }));
        } else {
            return;
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

    loadIpDomains(target: string): void {
        this.aetherService.getIpDomain({
            target,
        }).subscribe(
            (value => {
                this.ipdomain = value['ip-domain'];
                console.log('Got Ip Domain', value['ip-domain'].length);
            }),
            error => {
                console.warn('Error getting Ip Domain for ', target, error);
            },
            () => {
                console.log('Finished loading Ip Domains', target);
            }
        );
    }

    loadSites(target: string): void {
        this.aetherService.getSite({
            target,
        }).subscribe(
            (value => {
                this.site = value.site;
                this.displayImsiAdd();
                console.log('Got Site', value.site.length);
            }),
            error => {
                console.warn('Error getting Site for ', target, error);
            },
            () => {
                console.log('Finished loading Site', target);
            }
        );
    }

}
