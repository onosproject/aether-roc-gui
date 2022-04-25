/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
    BasketService,
    IDATTRIBS,
    ORIGINAL,
    REQDATTRIBS,
    TYPE,
} from '../../basket.service';
import { RocEditBase } from '../../roc-edit-base';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OpenPolicyAgentService } from '../../open-policy-agent.service';
import { EdgeDeviceParam } from '../edge-device/edge-device.component';
import { SiteDatasource } from '../site/site-datasource';
import { siteModelPath } from '../../models-info';
import { EnterpriseService } from '../../enterprise.service';
import { Site } from '../../../openapi3/aether/2.1.0/models';
import { SiteService } from '../../../openapi3/aether/2.1.0/services';

@Component({
    selector: 'aether-site-edit',
    templateUrl: './site-edit.component.html',
    styleUrls: ['../../common-edit.component.scss'],
})
export class SiteEditComponent
    extends RocEditBase<SiteDatasource>
    implements OnInit
{
    data: Site;
    pathListAttr = 'site';
    showConnectDisplay = false;
    showEdgeDeviceDisplay = false;
    showSmallCellAddButton = true;
    siteForm = this.fb.group({
        'site-id': [
            undefined,
            Validators.compose([
                Validators.pattern('[a-z]([a-z0-9-]?[a-z0-9])*'),
                Validators.minLength(1),
                Validators.maxLength(63),
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
        monitoring: this.fb.group({
            'edge-cluster-prometheus-url': [undefined],
            'edge-monitoring-prometheus-url': [undefined],
            'edge-device': this.fb.array([]),
        }),
        'imsi-definition': this.fb.group({
            mcc: [
                undefined,
                Validators.compose([
                    Validators.pattern('[0-9]{3}'),
                    Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(3),
                ]),
            ],
            mnc: [
                undefined,
                Validators.compose([
                    Validators.pattern('[0-9]{2,3}'),
                    Validators.required,
                    Validators.minLength(2),
                    Validators.maxLength(3),
                ]),
            ],
            enterprise: [undefined, Validators.required],
            format: [
                undefined,
                Validators.compose([
                    Validators.pattern('[0CENS]{15}'),
                    Validators.minLength(15),
                    Validators.maxLength(15),
                ]),
            ],
        }),
    });
    showParentDisplay = false;
    siteId: string;

    constructor(
        private siteSiteService: SiteService,
        protected enterpriseService: EnterpriseService,

        protected route: ActivatedRoute,
        protected router: Router,
        protected fb: FormBuilder,
        protected bs: BasketService,
        protected snackBar: MatSnackBar,
        public opaService: OpenPolicyAgentService
    ) {
        super(
            snackBar,
            bs,
            enterpriseService,
            undefined,
            route,
            new SiteDatasource(enterpriseService, bs),
            siteModelPath
        );
        super.form = this.siteForm;
        super.loadFunc = this.loadSiteSite;
        this.siteForm.get(['imsi-definition', 'enterprise'])[TYPE] = 'number';
        this.siteForm.get(['imsi-definition'])[REQDATTRIBS] = [
            'mcc',
            'mnc',
            'format',
            'enterprise',
        ];
        this.siteForm.get(['monitoring', 'edge-device'])[IDATTRIBS] = [
            'edge-device-id',
        ];
    }

    ngOnInit(): void {
        super.init();
    }

    loadSiteSite(id: string): void {
        this.siteSiteService
            .getSite({
                'site-id': id,
                'enterprise-id': this.route.snapshot.params['enterprise-id'],
            })
            .subscribe(
                (value) => {
                    this.data = value;
                    this.siteId = value['site-id'];
                    this.populateFormData(value);
                },
                (error) => {
                    console.warn(
                        'Error getting Site(s) for ',
                        this.enterpriseId,
                        error
                    );
                },
                () => {
                    const basketPreview = this.bs.buildPatchBody().Updates;
                    const [hasUpdates, model] = this.datasource.hasUpdates(
                        basketPreview,
                        siteModelPath,
                        this.data
                    );
                    if (hasUpdates) {
                        this.populateFormData(model as Site);
                    }
                    console.log(
                        'Finished loading Site(s)',
                        this.enterpriseId,
                        id
                    );
                }
            );
    }

    get ImsiControls(): FormGroup {
        return this.siteForm.get(['imsi-definition']) as FormGroup;
    }

    get MonitoringControls(): FormGroup {
        return this.siteForm.get(['monitoring']) as FormGroup;
    }

    private populateFormData(value: Site): void {
        if (value['site-id']) {
            this.siteForm.get('site-id').setValue(value['site-id']);
            this.siteForm.get('site-id')[ORIGINAL] = value['site-id'];
        }
        if (value['display-name']) {
            this.siteForm.get('display-name').setValue(value['display-name']);
            this.siteForm.get('display-name')[ORIGINAL] = value['display-name'];
        }
        if (value.description) {
            this.siteForm.get(['description']).setValue(value.description);
            this.siteForm.get('description')[ORIGINAL] = value.description;
        }

        if (value.monitoring) {
            if (value.monitoring['edge-cluster-prometheus-url']) {
                this.siteForm
                    .get(['monitoring', 'edge-cluster-prometheus-url'])
                    .setValue(value.monitoring['edge-cluster-prometheus-url']);
            }
            if (value.monitoring['edge-monitoring-prometheus-url']) {
                this.siteForm
                    .get(['monitoring', 'edge-monitoring-prometheus-url'])
                    .setValue(
                        value.monitoring['edge-monitoring-prometheus-url']
                    );
            }
            if (
                value.monitoring['edge-device'] &&
                this.siteForm.value.monitoring['edge-device'].length === 0
            ) {
                for (const ed of value.monitoring['edge-device']) {
                    let isDeleted = false;
                    Object.keys(localStorage)
                        .filter((checkerKey) =>
                            checkerKey.startsWith(
                                '/basket-delete/Site-2.1.0/site[id=' +
                                    value['site-id'] +
                                    ']/monitoring/edge-device[edge-device-id='
                            )
                        )
                        .forEach((checkerKey) => {
                            if (checkerKey.includes(ed['edge-device-id'])) {
                                isDeleted = true;
                            }
                        });
                    if (!isDeleted) {
                        const edIDControl = this.fb.control(
                            ed['edge-device-id']
                        );
                        edIDControl[ORIGINAL] = ed['edge-device-id'];
                        const edDisplayNameControl = this.fb.control(
                            ed['display-name']
                        );
                        edDisplayNameControl[ORIGINAL] = ed['display-name'];
                        const edDescriptionControl = this.fb.control(
                            ed.description
                        );
                        edDescriptionControl[ORIGINAL] = ed.description;

                        (
                            this.siteForm.get([
                                'monitoring',
                                'edge-device',
                            ]) as FormArray
                        ).push(
                            this.fb.group({
                                'edge-device-id': edIDControl,
                                ['display-name']: edDisplayNameControl,
                                description: edDescriptionControl,
                            })
                        );
                    }
                    isDeleted = false;
                }
            } else if (
                value.monitoring['edge-device'] &&
                this.siteForm.value.monitoring['edge-device'].length !== 0
            ) {
                for (const eachValueED of value.monitoring['edge-device']) {
                    (
                        this.siteForm.get([
                            'monitoring',
                            'edge-device',
                        ]) as FormArray
                    ).push(
                        this.fb.group({
                            'edge-device-id': eachValueED['edge-device-id'],
                            'display-name': eachValueED['display-name'],
                            description: eachValueED.description,
                        })
                    );
                }
            }
        }
        if (value['imsi-definition']) {
            this.siteForm
                .get(['imsi-definition', 'mcc'])
                .setValue(value['imsi-definition'].mcc);
            this.siteForm.get(['imsi-definition', 'mcc'])[ORIGINAL] =
                value['imsi-definition'].mcc;
            this.siteForm
                .get(['imsi-definition', 'mnc'])
                .setValue(value['imsi-definition'].mnc);
            this.siteForm.get(['imsi-definition', 'mnc'])[ORIGINAL] =
                value['imsi-definition'].mnc;
            this.siteForm
                .get(['imsi-definition', 'enterprise'])
                .setValue(value['imsi-definition'].enterprise);
            this.siteForm.get(['imsi-definition', 'enterprise'])[ORIGINAL] =
                value['imsi-definition'].enterprise;
            this.siteForm
                .get(['imsi-definition', 'format'])
                .setValue(value['imsi-definition'].format);
            this.siteForm.get(['imsi-definition', 'format'])[ORIGINAL] =
                value['imsi-definition'].format;
        }
    }

    closeEdgeDeviceCard(selected: EdgeDeviceParam): void {
        this.showEdgeDeviceDisplay = false;

        if (selected === undefined) {
            return;
        }
        const edNameControl = this.fb.control(selected['edge-device-id']);
        edNameControl.markAsTouched();
        edNameControl.markAsDirty();

        const edDisplayNameControl = this.fb.control(selected['display-name']);
        edDisplayNameControl.markAsTouched();
        edDisplayNameControl.markAsDirty();

        const edDescriptionControl = this.fb.control(selected.description);
        edDescriptionControl.markAsTouched();
        edDescriptionControl.markAsDirty();

        const epGroupControl = this.fb.group({
            'edge-device-id': edNameControl,
            'display-name': edDisplayNameControl,
            description: edDescriptionControl,
        });
        (this.siteForm.get(['monitoring', 'edge-device']) as FormArray).push(
            epGroupControl
        );
        console.log('Adding new Value', selected);
        this.siteForm.markAllAsTouched();
    }

    deleteEDFromSelect(ed: string): void {
        this.bs.deleteIndexedEntry(
            '/enterprises-2.1.0/enterprise[enterprise-id=' +
                this.route.snapshot.params['enterprise-id'] +
                ']/site[site-id=' +
                this.siteId +
                ']/monitoring/edge-device[edge-device-id=' +
                ed +
                ']',
            'edge-device-id',
            ed
        );
        const index = (
            this.siteForm.get(['monitoring', 'edge-device']) as FormArray
        ).controls.findIndex((c) => c.value[Object.keys(c.value)[0]] === ed);
        (
            this.siteForm.get(['monitoring', 'edge-device']) as FormArray
        ).removeAt(index);
        this.showSmallCellAddButton = true;
        this.snackBar.open(
            'Deletion of ' + ed + ' added to basket',
            undefined,
            { duration: 2000 }
        );
    }

    get edgeDeviceControls(): FormArray {
        return this.siteForm.get(['monitoring', 'edge-device']) as FormArray;
    }
}
