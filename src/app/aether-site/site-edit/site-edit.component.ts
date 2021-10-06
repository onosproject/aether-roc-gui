/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {Component, InjectionToken, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Service as AetherService, SiteSiteService} from '../../../openapi3/aether/4.0.0/services';
import {BasketService, IDATTRIBS, ORIGINAL, REQDATTRIBS, TYPE} from '../../basket.service';
import {RocEditBase} from '../../roc-edit-base';
import {MatSnackBar} from '@angular/material/snack-bar';
import {OpenPolicyAgentService} from '../../open-policy-agent.service';
import {isEmpty, map, startWith} from 'rxjs/operators';
import {SiteSite, EnterpriseEnterprise} from 'src/openapi3/aether/4.0.0/models';
import {SmallCellParam} from "../small-cell-select/small-cell-select.component";

@Component({
    selector: 'aether-site-edit',
    templateUrl: './site-edit.component.html',
    styleUrls: ['../../common-edit.component.scss']
})
export class SiteEditComponent extends RocEditBase<SiteSite> implements OnInit {
    enterprises: Array<EnterpriseEnterprise>;
    data: SiteSite;
    pathRoot = 'site-4.0.0';
    pathListAttr = 'site';
    showConnectDisplay: boolean = false;
    showSmallCellAddButton: boolean = true;
    siteForm = this.fb.group({
        id: [undefined, Validators.compose([
            Validators.pattern('([A-Za-z0-9\\-\\_\\.]+)'),
            Validators.minLength(1),
            Validators.maxLength(31),
        ])],
        'display-name': [undefined, Validators.compose([
            Validators.minLength(1),
            Validators.maxLength(80),
        ])],
        description: [undefined, Validators.compose([
            Validators.minLength(1),
            Validators.maxLength(1024),
        ])],
        'small-cell': this.fb.array([]),
        enterprise: [undefined],
        'imsi-definition': this.fb.group({
            mcc: [undefined, Validators.compose([
                Validators.pattern('[0-9]{3}'),
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(3),
            ])],
            mnc: [undefined, Validators.compose([
                Validators.pattern('[0-9]{2,3}'),
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(3),
            ])],
            enterprise: [undefined, Validators.required],
            format: [undefined, Validators.compose([
                Validators.pattern('[0CENS]{15}'),
                Validators.minLength(15),
                Validators.maxLength(15)
            ])]
        })
    });
    showParentDisplay: boolean = false;
    siteId: string;

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
        super(snackBar, bs, route, router, 'site-4.0.0', 'site');
        super.form = this.siteForm;
        super.loadFunc = this.loadSiteSite;
        this.siteForm.get(['imsi-definition', 'enterprise'])[TYPE] = 'number';
        this.siteForm[REQDATTRIBS] = ['enterprise'];
        this.siteForm.get(['imsi-definition'])[REQDATTRIBS] = ['mcc', 'mnc', 'enterprise', 'format'];
        this.siteForm.get(['small-cell'])[IDATTRIBS] = ['name'];
    }

    ngOnInit(): void {
        super.init();
        this.loadEnterprises(this.target);
    }

    setOnlyEnterprise(lenEnterprises: number): void {
        if (lenEnterprises === 1) {
            this.siteForm.get('enterprise').markAsTouched();
            this.siteForm.get('enterprise').markAsDirty();
            this.siteForm.get('enterprise').setValue(this.enterprises[0].id);
        }
    }

    closeShowParentCard(close: boolean): void {
        this.showParentDisplay = false;
    }

    loadSiteSite(target: string, id: string): void {
        this.siteSiteService.getSiteSite({
            target,
            id
        }).subscribe(
            (value => {
                this.data = value;
                this.siteId = value.id;
                this.populateFormData(value);
            }),
            error => {
                console.warn('Error getting SiteSite(s) for ', target, error);
            },
            () => {
                const basketPreview = this.bs.buildPatchBody().Updates;
                if (this.pathRoot in basketPreview && this.pathListAttr in basketPreview['site-4.0.0']) {
                    basketPreview['site-4.0.0'].site.forEach((basketItems) => {
                        if (basketItems.id === id) {
                            console.log(basketItems, "basketItems----------------------")
                            this.populateFormData(basketItems);
                        }
                    });
                }
                console.log('Finished loading SiteSite(s)', target, id);
            }
        );
    }

    get ImsiControls(): FormGroup {
        return this.siteForm.get(['imsi-definition']) as FormGroup;
    }

    private populateFormData(value: SiteSite): void {
        if (value['display-name']) {
            this.siteForm.get('display-name').setValue(value['display-name']);
            this.siteForm.get('display-name')[ORIGINAL] = value['display-name'];
        }
        if (value.description) {
            this.siteForm.get(['description']).setValue(value.description);
            this.siteForm.get('description')[ORIGINAL] = value.description;
        }

        if (value['small-cell'] && this.siteForm.value['small-cell'].length === 0) {
            for (const sm of value['small-cell']) {
                let isDeleted = false;
                Object.keys(localStorage)
                    .filter(checkerKey => checkerKey.startsWith('/basket-delete/site-4.0.0/site[id=' + value.id +
                        ']/small-cell[name='))
                    .forEach((checkerKey) => {
                        if (checkerKey.includes(sm.name)) {
                            isDeleted = true;
                        }
                    });
                if (!isDeleted) {
                    const smNameControl = this.fb.control(sm.name);
                    smNameControl[ORIGINAL] = sm.name;

                    const smAddressControl = this.fb.control(sm.address);
                    smAddressControl[ORIGINAL] = sm.address;
                    const smTacControl = this.fb.control(sm.tac);
                    smTacControl[ORIGINAL] = sm.tac;
                    const smEnabledcontrol = this.fb.control(sm.enabled);
                    smEnabledcontrol[ORIGINAL] = sm.enabled;

                    (this.siteForm.get('small-cell') as FormArray).push(this.fb.group({
                        name: smNameControl,
                        address: smAddressControl,
                        tac: smTacControl,
                        enabled: smEnabledcontrol,
                    }));
                }
                isDeleted = false;
            }
        } else if (value['small-cell'] && this.siteForm.value['small-cell'].length !== 0) {
            for (const eachValueSM of value['small-cell']) {
                (this.siteForm.get('small-cell') as FormArray).push(this.fb.group({
                    name: eachValueSM.name,
                    address: eachValueSM.address,
                    tac: eachValueSM.tac,
                    enabled: eachValueSM.enabled
                }));
            }
        }

        if (value.enterprise) {
            this.siteForm.get(['enterprise']).setValue(value.enterprise);
            this.siteForm.get('enterprise')[ORIGINAL] = value.enterprise;
        }
        if (value['imsi-definition']) {
            this.siteForm.get(['imsi-definition', 'mcc']).setValue(value['imsi-definition'].mcc);
            this.siteForm.get(['imsi-definition', 'mcc'])[ORIGINAL] = value['imsi-definition'].mcc;
            this.siteForm.get(['imsi-definition', 'mnc']).setValue(value['imsi-definition'].mnc);
            this.siteForm.get(['imsi-definition', 'mnc'])[ORIGINAL] = value['imsi-definition'].mnc;
            this.siteForm.get(['imsi-definition', 'enterprise']).setValue(value['imsi-definition'].enterprise);
            this.siteForm.get(['imsi-definition', 'enterprise'])[ORIGINAL] = value['imsi-definition'].enterprise;
            this.siteForm.get(['imsi-definition', 'format']).setValue(value['imsi-definition'].format);
            this.siteForm.get(['imsi-definition', 'format'])[ORIGINAL] = value['imsi-definition'].format;
        }
    }

    smallCellSelected(selected: SmallCellParam): void {
        this.showConnectDisplay = false;

        if (selected === undefined) {
            return;
        }
        const epNameControl = this.fb.control(selected.name);
        epNameControl.markAsTouched();
        epNameControl.markAsDirty();

        const epAddressControl = this.fb.control(selected.address);
        epAddressControl.markAsTouched();
        epAddressControl.markAsDirty();

        const epTacControl = this.fb.control(selected.tac);
        epTacControl.markAsTouched();
        epTacControl.markAsDirty();

        const epEnabledcontrol = this.fb.control(selected.enabled);
        epEnabledcontrol.markAsTouched();
        epEnabledcontrol.markAsDirty();

        const epGroupControl = this.fb.group({
            name: epNameControl,
            address: epAddressControl,
            tac: epTacControl,
            enabled: epEnabledcontrol,
        });
        epGroupControl[REQDATTRIBS] = ['tac'];

        (this.siteForm.get('small-cell') as FormArray).push(epGroupControl);
        console.log('Adding new Value', selected);
        this.siteForm.markAllAsTouched();
    }


    deleteFromSelect(sc: string): void {
        this.bs.deleteIndexedEntry('/site-4.0.0/site[id=' + this.id +
            ']/small-cell[name=' + sc + ']', 'name', sc, this.ucmap(sc));
        const index = (this.siteForm.get('small-cell') as FormArray)
            .controls.findIndex((c) => c.value[Object.keys(c.value)[0]] === sc);
        (this.siteForm.get('small-cell') as FormArray).removeAt(index);
        this.showSmallCellAddButton = true;
        this.snackBar.open('Deletion of ' + sc + ' added to basket', undefined, {duration: 2000});
    }

    private ucmap(sc: string): Map<string, string> {
        const ucMap = new Map<string, string>();
        const siteId = '/site-4.0.0/site[id=' + this.id + ']';
        let parentUc = localStorage.getItem(siteId);
        if (parentUc === null) {
            parentUc = this.siteForm[REQDATTRIBS];
        }
        ucMap.set(siteId, parentUc);

        const epId = siteId + '/small-cell[name=' + sc + ']';
        let epUc = localStorage.getItem(epId);
        if (epUc === null) {
            const epFormArray = this.siteForm.get(['small-cell']) as FormArray;
            const epCtl = epFormArray.controls.findIndex((c) => c.value[Object.keys(c.value)[0]] === sc);
            console.log('Getting', epCtl, 'for', epId);
            epUc = epFormArray.controls[epCtl][REQDATTRIBS];
        }
        ucMap.set(epId, epUc);
        return ucMap;
    }

    get smallCellControls(): FormArray {
        return this.siteForm.get(['small-cell']) as FormArray;
    }

    loadEnterprises(target: string): void {
        this.aetherService.getEnterprise({
            target,
        }).subscribe(
            (value => {
                this.enterprises = value.enterprise;
                this.setOnlyEnterprise(value.enterprise.length);
                console.log('Got', value.enterprise.length, 'Enterprise');
            }),
            error => {
                console.warn('Error getting Enterprise for ', target, error);
            }
        );
    }
}
