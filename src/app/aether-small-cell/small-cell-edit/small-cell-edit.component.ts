/*
 * SPDX-FileCopyrightText: 2022-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RocEditBase } from '../../roc-edit-base';
import { EnterprisesEnterpriseSiteSmallCell } from '../../../openapi3/aether/2.0.0/models';
import {
    EnterprisesEnterpriseService,
    Service as AetherService,
} from '../../../openapi3/aether/2.0.0/services';
import { ActivatedRoute, Router } from '@angular/router';
import {
    BasketService,
    ORIGINAL,
    REQDATTRIBS,
    TYPE,
} from '../../basket.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OpenPolicyAgentService } from '../../open-policy-agent.service';
import { EnterprisesEnterpriseSiteSmallCellService } from '../../../openapi3/aether/2.0.0/services';
import { AETHER_TARGET } from '../../../environments/environment';
import { SmallCellDatasource } from '../small-cell/small-cell-datasource';
import { smallCellModelPath } from '../../models-info';

@Component({
    selector: 'aether-small-cell-edit',
    templateUrl: './small-cell-edit.component.html',
    styleUrls: ['../../common-edit.component.scss'],
})
export class SmallCellEditComponent
    extends RocEditBase<SmallCellDatasource>
    implements OnInit
{
    data: EnterprisesEnterpriseSiteSmallCell;

    smallCellForm = this.fb.group({
        'small-cell-id': [
            undefined,
            Validators.compose([
                Validators.pattern('[a-z]([a-z0-9-]?[a-z0-9])*'),
                Validators.minLength(1),
                Validators.maxLength(63),
            ]),
        ],
        description: [
            undefined,
            Validators.compose([
                Validators.minLength(1),
                Validators.maxLength(1024),
            ]),
        ],
        'display-name': [
            undefined,
            Validators.compose([
                Validators.minLength(1),
                Validators.maxLength(80),
            ]),
        ],
        address: [
            undefined,
            Validators.compose([
                Validators.required,
                Validators.minLength(1),
                Validators.maxLength(80),
            ]),
        ],
        tac: [
            undefined,
            Validators.compose([
                Validators.required,
                Validators.pattern('[0-9A-F\\.]*'),
                Validators.minLength(4),
                Validators.maxLength(8),
            ]),
        ],
        enable: [undefined],
    });
    smallCellId: string;

    constructor(
        private smallCellService: EnterprisesEnterpriseSiteSmallCellService,
        protected entService: EnterprisesEnterpriseService,
        protected aetherService: AetherService,
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
            new SmallCellDatasource(aetherService, bs, AETHER_TARGET),
            smallCellModelPath,
            aetherService
        );
        super.form = this.smallCellForm;
        super.loadFunc = this.loadSmallCell;
        this.smallCellForm[REQDATTRIBS] = ['tac'];
        this.smallCellForm.get('enable')[TYPE] = 'boolean';
    }

    ngOnInit(): void {
        super.init();
    }

    private populateFormData(value: EnterprisesEnterpriseSiteSmallCell): void {
        if (value['small-cell-id']) {
            this.smallCellForm
                .get('small-cell-id')
                .setValue(value['small-cell-id']);
            this.smallCellForm.get('small-cell-id')[ORIGINAL] =
                value['small-cell-id'];
        }
        if (value['display-name']) {
            this.smallCellForm
                .get('display-name')
                .setValue(value['display-name']);
            this.smallCellForm.get('display-name')[ORIGINAL] =
                value['display-name'];
        }
        if (value.description) {
            this.smallCellForm.get('description').setValue(value.description);
            this.smallCellForm.get('description')[ORIGINAL] = value.description;
        }
        if (value['address']) {
            this.smallCellForm.get(['address']).setValue(value.address);
            this.smallCellForm.get(['address'])[ORIGINAL] = value.address;
        }
        if (value['tac']) {
            this.smallCellForm.get(['tac']).setValue(value.tac);
            this.smallCellForm.get(['tac'])[ORIGINAL] = value.tac;
        }
        if (value['enable']) {
            this.smallCellForm.get(['enable']).setValue(value.enable);
            this.smallCellForm.get(['enable'])[ORIGINAL] = value.enable;
        }
    }

    loadSmallCell(target: string, id: string): void {
        this.smallCellService
            .getEnterprisesEnterpriseSiteSmallCell({
                target: AETHER_TARGET,
                'small-cell-id': id,
                'enterprise-id': this.route.snapshot.params['enterprise-id'],
                'site-id': this.route.snapshot.params['site-id'],
            })
            .subscribe(
                (value) => {
                    this.data = value;
                    this.smallCellId = value['small-cell-id'];
                    this.populateFormData(value);
                },
                (error) => {
                    console.warn(
                        'Error getting EnterprisesEnterpriseSiteSmallCell(s) for ',
                        target,
                        error
                    );
                },
                () => {
                    const basketPreview = this.bs.buildPatchBody().Updates;
                    const [hasUpdates, model] = this.datasource.hasUpdates(
                        basketPreview,
                        smallCellModelPath,
                        this.data
                    );
                    if (hasUpdates) {
                        this.populateFormData(
                            model as EnterprisesEnterpriseSiteSmallCell
                        );
                    }
                    console.log(
                        'Finished loading EnterprisesEnterpriseSiteSmallCell(s)',
                        target,
                        id
                    );
                }
            );
    }
}
