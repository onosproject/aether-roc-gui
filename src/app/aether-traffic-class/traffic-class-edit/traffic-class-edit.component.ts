/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { BasketService, ORIGINAL } from '../../basket.service';
import { RocEditBase } from '../../roc-edit-base';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OpenPolicyAgentService } from '../../open-policy-agent.service';
import { EnterprisesEnterpriseTrafficClass } from '../../../openapi3/aether/2.0.0/models';
import {
    EnterprisesEnterpriseTrafficClassService,
    Service as AetherService,
} from '../../../openapi3/aether/2.0.0/services';
import { AETHER_TARGET } from '../../../environments/environment';
import { TrafficClassDatasource } from '../traffic-class/traffic-class-datasource';
import { trafficClassModelPath } from '../../models-info';

@Component({
    selector: 'aether-traffic-class-edit',
    templateUrl: './traffic-class-edit.component.html',
    styleUrls: ['../../common-edit.component.scss'],
})
export class TrafficClassEditComponent
    extends RocEditBase<TrafficClassDatasource>
    implements OnInit
{
    pathListAttr = 'traffic-class';
    data: EnterprisesEnterpriseTrafficClass;
    showParentDisplay = false;
    trafficClassId: string;
    tcForm = this.fb.group({
        'traffic-class-id': [
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
        arp: [
            undefined,
            Validators.compose([Validators.min(1), Validators.max(15)]),
        ],
        qci: [
            undefined,
            Validators.compose([Validators.min(1), Validators.max(32)]),
        ],
        pelr: [
            undefined,
            Validators.compose([Validators.min(0), Validators.max(10)]),
        ],
        pdb: [
            undefined,
            Validators.compose([Validators.min(0), Validators.max(1000)]),
        ],
    });

    constructor(
        private trafficClassTrafficClassService: EnterprisesEnterpriseTrafficClassService,
        protected aetherService: AetherService,
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
            route,
            new TrafficClassDatasource(aetherService, bs, AETHER_TARGET),
            trafficClassModelPath,
            aetherService
        );
        super.form = this.tcForm;
        super.loadFunc = this.loadTrafficClassTrafficClass;
    }

    ngOnInit(): void {
        super.init();
    }

    loadTrafficClassTrafficClass(target: string, id: string): void {
        this.trafficClassTrafficClassService
            .getEnterprisesEnterpriseTrafficClass({
                target: AETHER_TARGET,
                'traffic-class-id': id,
                'enterprise-id': this.route.snapshot.params['enterprise-id'],
            })
            .subscribe(
                (value) => {
                    this.data = value;
                    this.trafficClassId = value['traffic-class-id'];
                    this.populateFormData(value);
                },
                (error) => {
                    console.warn(
                        'Error getting EnterprisesEnterpriseTrafficClass(s) for ',
                        target,
                        error
                    );
                },
                () => {
                    const basketPreview = this.bs.buildPatchBody().Updates;
                    const [hasUpdates, model] = this.datasource.hasUpdates(
                        basketPreview,
                        trafficClassModelPath,
                        this.data
                    );
                    if (hasUpdates) {
                        this.populateFormData(
                            model as EnterprisesEnterpriseTrafficClass
                        );
                    }
                    console.log(
                        'Finished loading EnterprisesEnterpriseTrafficClass(s)',
                        target,
                        id
                    );
                }
            );
    }

    private populateFormData(value: EnterprisesEnterpriseTrafficClass): void {
        if (value['traffic-class-id']) {
            this.tcForm
                .get('traffic-class-id')
                .setValue(value['traffic-class-id']);
            this.tcForm.get('traffic-class-id')[ORIGINAL] =
                value['traffic-class-id'];
        }
        if (value['display-name']) {
            this.tcForm.get('display-name').setValue(value['display-name']);
            this.tcForm.get('display-name')[ORIGINAL] = value['display-name'];
        }
        if (value.description) {
            this.tcForm.get('description').setValue(value.description);
            this.tcForm.get('description')[ORIGINAL] = value.description;
        }
        if (value.pelr) {
            this.tcForm.get('pelr').setValue(value.pelr);
            this.tcForm.get('pelr')[ORIGINAL] = value.pelr;
        }
        if (value.pdb) {
            this.tcForm.get('pdb').setValue(value.pdb);
            this.tcForm.get('pdb')[ORIGINAL] = value.pdb;
        }
        if (value.arp) {
            this.tcForm.get('arp').setValue(value.arp);
            this.tcForm.get('arp')[ORIGINAL] = value.arp;
        }
        if (value.qci) {
            this.tcForm.get('qci').setValue(value.qci);
            this.tcForm.get('qci')[ORIGINAL] = value.qci;
        }
    }
}
