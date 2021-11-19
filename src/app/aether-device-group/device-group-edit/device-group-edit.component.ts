/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */

import {Component, OnInit} from '@angular/core';
import {RocEditBase} from '../../roc-edit-base';
import {DeviceGroupDeviceGroup} from '../../../openapi3/aether/4.0.0/models/device-group-device-group';
import {
    AbstractControl,
    FormArray,
    FormBuilder, FormControlName, FormGroup,
    ValidationErrors,
    ValidatorFn,
    Validators
} from '@angular/forms';
import {OpenPolicyAgentService} from '../../open-policy-agent.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Service as AetherService} from '../../../openapi3/aether/4.0.0/services';
import {BasketService, IDATTRIBS, ORIGINAL, REQDATTRIBS, TYPE} from '../../basket.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {DeviceGroupDeviceGroupService} from '../../../openapi3/aether/4.0.0/services/device-group-device-group.service';
import {DeviceGroupDeviceGroupImsis} from '../../../openapi3/aether/4.0.0/models/device-group-device-group-imsis';
import {IpDomainIpDomain} from '../../../openapi3/aether/4.0.0/models/ip-domain-ip-domain';
import {SiteSite} from '../../../openapi3/aether/4.0.0/models/site-site';
import {ImsiParam} from '../imsis-select/imsis-select.component';
import {maxDeviceGroupRange} from "../../../environments/environment";
import {map, startWith} from "rxjs/operators";
import {Bandwidths} from "../../aether-template/template-edit/template-edit.component";
import {Observable} from "rxjs";
import {TrafficClassTrafficClass} from "../../../openapi3/aether/4.0.0/models/traffic-class-traffic-class";

const ValidateImsiRange: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    if (control.get(['imsis']).value.length !== 0) {
        const imsiFormvalue = control.get(['imsis']).value;
        let isValid: ValidationErrors = null;
        imsiFormvalue.forEach(eachImsi => {
            if (eachImsi['imsi-range-from'] > eachImsi['imsi-range-to']) {
                isValid = {individualRangeReversed: true}
                return;
            } else if (eachImsi['imsi-range-to'] - eachImsi['imsi-range-from'] > maxDeviceGroupRange) {
                isValid = {individualRangeExceeded: true}
                return;
            }
            for (const eachImsiFormValues of imsiFormvalue) {
                if (eachImsiFormValues['imsi-id'] !== eachImsi['imsi-id']) {
                    if ((eachImsi['imsi-range-to'] < eachImsiFormValues['imsi-range-from'] ||
                            eachImsi['imsi-range-from'] > eachImsiFormValues['imsi-range-to'])
                        && (eachImsiFormValues['imsi-range-from'] <= eachImsiFormValues['imsi-range-to']
                            && eachImsi['imsi-range-from'] <= eachImsi['imsi-range-to'] &&
                            eachImsi['imsi-range-to'] <= (maxDeviceGroupRange + (eachImsi['imsi-range-from'])) &&
                            eachImsiFormValues['imsi-range-to'] <=
                            (maxDeviceGroupRange + (eachImsiFormValues['imsi-range-from'])))) {
                    } else {
                        isValid = {isRangeNotValid: true};
                        return;
                    }
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
    ImsiRangeLimit: number;
    showParentDisplay: boolean = false;
    trafficClass: Array<TrafficClassTrafficClass>;
    options: Bandwidths[] = [
        {megabyte: {numerical: 1000000, inMb: '1Mbps'}},
        {megabyte: {numerical: 2000000, inMb: '2Mbps'}},
        {megabyte: {numerical: 5000000, inMb: '5Mbps'}},
        {megabyte: {numerical: 10000000, inMb: '10Mbps'}},
        {megabyte: {numerical: 25000000, inMb: '25Mbps'}},
        {megabyte: {numerical: 50000000, inMb: '50Mbps'}},
        {megabyte: {numerical: 100000000, inMb: '100Mbps'}},
        {megabyte: {numerical: 500000000, inMb: '500Mbps'}}
    ];
    bandwidthOptions: Observable<Bandwidths[]>;

    deviceGroupForm = this.fb.group({
        id: [undefined, Validators.compose([
            Validators.pattern('([A-Za-z0-9\\-\\_\\.]+)'),
            Validators.minLength(1),
            Validators.maxLength(31),
        ])],
        description: [undefined, Validators.compose([
            Validators.minLength(1),
            Validators.maxLength(1024),
        ])],
        'display-name': [undefined, Validators.compose([
            Validators.minLength(1),
            Validators.maxLength(80),
        ])],
        'ip-domain': [undefined],
        site: [undefined],
        device: this.fb.group({
            mbr: this.fb.group({
                uplink: [undefined, Validators.compose([
                    Validators.min(0),
                    Validators.max(4294967295)
                ])],
                downlink: [undefined, Validators.compose([
                    Validators.min(0),
                    Validators.max(4294967295)
                ])],
            }),
            'traffic-class':[undefined]
        }),
        imsis: this.fb.array([])
    }, {validators: ValidateImsiRange});
    private deviceGroupId: string;

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
        super(snackBar, bs, route, router, 'device-group-4.0.0', 'device-group');
        super.form = this.deviceGroupForm;
        super.loadFunc = this.loadDeviceGroupDeviceGroup;
        this.deviceGroupForm[REQDATTRIBS] = ['site'];
        this.deviceGroupForm.get(['device'])[REQDATTRIBS] = ['traffic-class'];
        this.deviceGroupForm.get(['device', 'mbr'])[REQDATTRIBS] = ['uplink', 'downlink'];
        this.deviceGroupForm.get(['imsis'])[IDATTRIBS] = ['imsi-id'];
    }

    ngOnInit(): void {
        this.loadIpDomains(this.target);
        this.loadTrafficClass(this.target);
        super.init();
        if (this.isNewInstance) {
            this.loadSites(this.target);
        }
        this.deviceGroupForm.get(['device','mbr','uplink'])[TYPE] = 'number';
        this.deviceGroupForm.get(['device','mbr','downlink'])[TYPE] = 'number';
        this.deviceGroupForm.get(['device','traffic-class'])[TYPE] = 'string';
        this.bandwidthOptions = this.deviceGroupForm.valueChanges
            .pipe(
                startWith(''),
                map(value => typeof value === 'number' ? value : value.megabyte),
                map(megabyte => megabyte ? this._filter(megabyte) : this.options.slice())
            );
    }

    fetchTooltipContent(): string {
        this.ImsiRangeLimit = Math.pow(10, this.SiteImisLength) - 1;
        return 'UE ID is suffix of IMSI. Ranges must not overlap. Maximum value: ' + this.ImsiRangeLimit + ' Maximum each range: ' + maxDeviceGroupRange;
    }

    private _filter(bandwidthIndex: number): Bandwidths[] {
        const filterValue = bandwidthIndex;
        return this.options.filter(option => option.megabyte.numerical);
    }


    get imsiControls(): FormArray {
        return this.deviceGroupForm.get(['imsis']) as FormArray;
    }

    get deviceMbrControls(): FormGroup {
        return this.deviceGroupForm.get(['device','mbr']) as FormGroup;
    }

    get deviceTrafficClassControls(): FormGroup {
        return this.deviceGroupForm.get('device') as FormGroup;
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
        this.bs.deleteIndexedEntry('/device-group-4.0.0/device-group[id=' + this.id +
            ']/imsis[imsi-id=' + im + ']', 'imsi-id', im, this.ucmap(im));
        const index = (this.deviceGroupForm.get(['imsis']) as FormArray)
            .controls.findIndex((c) => c.value[Object.keys(c.value)[0]] === im);
        (this.deviceGroupForm.get(['imsis']) as FormArray).removeAt(index);
        this.snackBar.open('Deletion of ' + im + ' added to basket', undefined, {duration: 2000});
    }

    private ucmap(im: string): Map<string, string> {
        const ucMap = new Map<string, string>();
        const dgId = '/device-group-4.0.0/device-group[id=' + this.id + ']';
        let parentUc = localStorage.getItem(dgId);
        if (parentUc === null) {
            parentUc = this.deviceGroupForm[REQDATTRIBS];
        }
        ucMap.set(dgId, parentUc);

        return ucMap;
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
        if (value.device && value.device['traffic-class']) {
            this.deviceGroupForm.get(['device','traffic-class']).setValue(value.device['traffic-class']);
            this.deviceGroupForm.get(['device','traffic-class'])[ORIGINAL] = value.device['traffic-class'];

        }
        if (value.device && value.device.mbr) {
            this.deviceGroupForm.get(['device','mbr','uplink']).setValue(value.device.mbr.uplink);
            this.deviceGroupForm.get(['device','mbr','downlink']).setValue(value.device.mbr.downlink);
            this.deviceGroupForm.get(['device','mbr','downlink'])[ORIGINAL] = value.device.mbr.uplink;
            this.deviceGroupForm.get(['device','mbr','downlink'])[ORIGINAL] = value.device.mbr.downlink;
        }
        if (value.imsis && this.deviceGroupForm.value.imsis.length === 0) {
            for (const im of value.imsis) {
                let isDeleted = false;
                Object.keys(localStorage)
                    .filter(checkerKey => checkerKey.startsWith('/basket-delete/device-group-4.0.0/device-group[id=' + value.id +
                        ']/imsis[imsi-id='))
                    .forEach((checkerKey) => {
                        if (checkerKey.includes(im['imsi-id'])) {
                            isDeleted = true;
                        }
                    });
                if (!isDeleted) {
                    const imsiIdFormControl = this.fb.control(im['imsi-id']);
                    imsiIdFormControl[ORIGINAL] = im['imsi-id'];

                    const imsiNameFormControl = this.fb.control(im['display-name']);
                    imsiNameFormControl[ORIGINAL] = im['display-name'];

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
                        'imsi-id': imsiIdFormControl,
                        'display-name': imsiNameFormControl,
                        'imsi-range-from': imsiRangeFromFormControl,
                        'imsi-range-to': imsiRangeToFormControl
                    }));
                }
                isDeleted = false;
            }
        } else if (value.imsis && this.deviceGroupForm.value.imsis.length !== 0) {
            for (const eachValueImsis of value.imsis) {
                (this.deviceGroupForm.get('imsis') as FormArray).push(this.fb.group({
                    'imsi-id': eachValueImsis['imsi-id'],
                    'display-name': eachValueImsis['display-name'],
                    'imsi-range-from': eachValueImsis['imsi-range-from'],
                    'imsi-range-to': eachValueImsis['imsi-range-to']
                }));
            }
        }
        this.imsis = this.deviceGroupForm.get('imsis').value;
    }

    imsiSelectCardClosed(event: ImsiParam): void {
        this.showImsiDisplay = !this.showImsiDisplay;
        if (event === undefined) {
            return;
        }

        const imsiIdFormControl = this.fb.control(event['imsi-id']);
        imsiIdFormControl.markAsTouched();
        imsiIdFormControl.markAsDirty();

        const imsiNameFormControl = this.fb.control(event['display-name']);
        imsiNameFormControl.markAsTouched();
        imsiNameFormControl.markAsDirty();

        const imsiRangeFromFormControl = this.fb.control(event['imsi-range-from']);
        imsiRangeFromFormControl.markAsTouched();
        imsiRangeFromFormControl.markAsDirty();
        imsiRangeFromFormControl[TYPE] = 'number';

        const imsiRangeToFormControl = this.fb.control(event['imsi-range-to']);
        imsiRangeToFormControl.markAsTouched();
        imsiRangeToFormControl.markAsDirty();
        imsiRangeToFormControl[TYPE] = 'boolean';

        (this.deviceGroupForm.get('imsis') as FormArray).push(this.fb.group({
            'imsi-id': imsiIdFormControl,
            'display-name': imsiNameFormControl,
            'imsi-range-from': imsiRangeFromFormControl,
            'imsi-range-to': imsiRangeToFormControl
        }));
        this.deviceGroupForm.markAsDirty();
        this.deviceGroupForm.markAsTouched();
    }

    loadDeviceGroupDeviceGroup(target: string, id: string): void {
        this.deviceGroupDeviceGroupService.getDeviceGroupDeviceGroup({
            target,
            id
        }).subscribe(
            (value => {
                this.data = value;
                this.deviceGroupId = value.id;
                this.populateFormData(value);
            }),
            error => {
                console.warn('Error getting DeviceGroupDeviceGroup(s) for ', target, error);
            },
            () => {
                const basketPreview = this.bs.buildPatchBody().Updates;
                if (this.pathRoot in basketPreview && this.pathListAttr in basketPreview['device-group-4.0.0']) {
                    basketPreview['device-group-4.0.0']['device-group'].forEach((basketItems) => {
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

    loadTrafficClass(target: string): void {
        this.aetherService.getTrafficClass({
            target,
        }).subscribe(
            (value => {
                this.trafficClass = value['traffic-class'];
                console.log('Got', value['traffic-class'].length, 'Traffic Class');
            }),
            error => {
                console.warn('Error getting Traffic Class for ', target, error);
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
