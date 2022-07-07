/*
 * SPDX-FileCopyrightText: 2022-present Intel Corporation
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, OnInit } from '@angular/core';
import { RocEditBase } from '../../roc-edit-base';
import { RouteDatasource } from '../route/route-datasource';
import { Route, Switch } from '../../../openapi3/sdn-fabric/0.1.0/models';
import { FormBuilder, Validators } from '@angular/forms';
import { EnterpriseService as FabricService } from '../../enterprise.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
    BasketService,
    ORIGINAL,
    REQDATTRIBS,
    TYPE,
} from '../../basket.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OpenPolicyAgentService } from '../../open-policy-agent.service';
import { routePath, switchPath } from '../../models-info';
import { RouteService } from '../../../openapi3/sdn-fabric/0.1.0/services';

@Component({
    selector: 'aether-route-edit',
    templateUrl: './route-edit.component.html',
    styleUrls: ['../../common-edit.component.scss'],
})
export class RouteEditComponent
    extends RocEditBase<RouteDatasource>
    implements OnInit
{
    pathListAttr: 'route';
    routeId: string;
    data: Route;

    routeForm = this.fb.group({
        'route-id': [
            undefined,
            Validators.compose([
                // inet:domain-name
                Validators.pattern(`[a-zA-Z_][a-zA-Z0-9\\-_.]*`),
                Validators.minLength(1),
                Validators.maxLength(100),
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
        prefix: [
            undefined,
            Validators.compose([
                Validators.required,
                Validators.pattern(
                    `(([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\\.){3}([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])/(([0-9])|([1-2][0-9])|(3[0-2]))`
                ),
                Validators.maxLength(253),
            ]),
        ],
        address: [
            undefined,
            Validators.compose([
                Validators.required,
                Validators.pattern(
                    `(([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\\.){3}([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])`
                ),
                Validators.maxLength(253),
            ]),
        ],
        metric: [
            undefined,
            Validators.compose([
                Validators.required,
                Validators.min(0),
                Validators.max(255),
            ]),
        ],
    });

    constructor(
        protected fabricService: FabricService,
        protected route: ActivatedRoute,
        protected router: Router,
        protected fb: FormBuilder,
        protected bs: BasketService,
        protected snackBar: MatSnackBar,
        public opaService: OpenPolicyAgentService,
        protected routeService: RouteService
    ) {
        super(
            snackBar,
            bs,
            fabricService,
            null,
            route,
            new RouteDatasource(bs, fabricService),
            routePath,
            'fabric-id',
            'unknownfabric'
        );
        super.form = this.routeForm;
        super.loadFunc = this.loadRoute;
        this.routeForm[REQDATTRIBS] = ['prefix', 'address', 'metric'];
        this.routeForm.get('metric')[TYPE] = 'number';
    }

    ngOnInit(): void {
        super.init();
    }

    loadRoute(id: string): void {
        this.routeService
            .getRoute({
                'route-id': id,
                'fabric-id': this.route.snapshot.params['fabric-id'],
            })
            .subscribe(
                (value) => {
                    this.data = value;
                    this.routeId = value['route-id'];
                    this.populateFormData(value);
                },
                (error) => {
                    console.warn(
                        'Error getting Route(s) for ',
                        this.targetId,
                        error
                    );
                },
                () => {
                    const basketPreview = this.bs.buildPatchBody().Updates;
                    const [hasUpdates, route] = this.datasource.hasUpdates(
                        basketPreview,
                        routePath,
                        this.data
                    );
                    if (hasUpdates) {
                        this.populateFormData(route as Route);
                    }
                    console.log('Finished loading Route', this.targetId, id);
                }
            );
    }

    private populateFormData(value: Route): void {
        if (value['route-id']) {
            this.routeForm.get('route-id').setValue(value['route-id']);
            this.routeForm.get('route-id')[ORIGINAL] = value['route-id'];
        }
        if (value['display-name']) {
            this.routeForm.get('display-name').setValue(value['display-name']);
            this.routeForm.get('display-name')[ORIGINAL] =
                value['display-name'];
        }
        if (value.description) {
            this.routeForm.get('description').setValue(value.description);
            this.routeForm.get('description')[ORIGINAL] = value.description;
        }
        if (value.prefix) {
            this.routeForm.get('prefix').setValue(value.prefix);
            this.routeForm.get('prefix')[ORIGINAL] = value.prefix;
        }
        if (value.address) {
            this.routeForm.get('address').setValue(value.address);
            this.routeForm.get('address')[ORIGINAL] = value.address;
        }
        if (value.metric) {
            this.routeForm.get('metric').setValue(value.metric);
            this.routeForm.get('metric')[ORIGINAL] = value.metric;
        }
    }
}
