/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {Component, OnInit} from '@angular/core';
import {ConnectivityServiceConnectivityService} from '../../../openapi3/aether/2.1.0/models';
import {RocEditBase} from '../../roc-edit-base';
import {FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {BasketService} from '../../basket.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ConnectivityServiceConnectivityServiceService} from '../../../openapi3/aether/2.1.0/services';

@Component({
    selector: 'aether-connectivity-service-edit',
    templateUrl: './connectivity-service-edit.component.html',
    styleUrls: ['../../common-edit.component.scss']
})
export class ConnectivityServiceEditComponent extends RocEditBase<ConnectivityServiceConnectivityService> implements OnInit {
    data: ConnectivityServiceConnectivityService;

    csForm = this.fb.group({
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
        'spgwc-endpoint': ['', Validators.compose([
            Validators.minLength(1),
            Validators.maxLength(80),
        ])],
        'hss-endpoint': ['', Validators.compose([
            Validators.minLength(1),
            Validators.maxLength(80),
        ])],
        'pcrf-endpoint': ['', Validators.compose([
            Validators.minLength(1),
            Validators.maxLength(80),
        ])],
    });

    constructor(
        private connectivityServiceConnectivityServiceService: ConnectivityServiceConnectivityServiceService,
        protected route: ActivatedRoute,
        protected router: Router,
        private fb: FormBuilder,
        protected bs: BasketService,
        protected snackBar: MatSnackBar,
    ) {
        super(snackBar, bs, route, router, 'connectivity-service-2.1.0', 'connectivity-service');
        super.form = this.csForm;
        super.loadFunc = this.loadConnectivityServiceConnectivityService;
    }

    ngOnInit(): void {
        super.init();
    }

    loadConnectivityServiceConnectivityService(target: string, id: string): void {
        this.connectivityServiceConnectivityServiceService.getConnectivityServiceConnectivityService({
            target,
            id
        }).subscribe(
            (value => {
                this.data = value;
                this.csForm.get('display-name').setValue(value['display-name']);
                this.csForm.get('description').setValue(value.description);
                this.csForm.get('spgwc-endpoint').setValue(value['spgwc-endpoint']);
                this.csForm.get('hss-endpoint').setValue(value['hss-endpoint']);
                this.csForm.get('pcrf-endpoint').setValue(value['pcrf-endpoint']);
            }),
            error => {
                console.warn('Error getting ConnectivityServiceConnectivityService(s) for ', target, error);
            },
            () => {
                console.log('Finished loading ConnectivityServiceConnectivityService(s)', target, id);
            }
        );
    }
}