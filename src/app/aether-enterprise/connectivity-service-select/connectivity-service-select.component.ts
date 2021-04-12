/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EnterpriseEnterpriseConnectivityService} from '../../../openapi3/aether/2.0.0/models/enterprise-enterprise-connectivity-service';
import {EnterpriseEnterpriseService} from '../../../openapi3/aether/2.1.0/services/enterprise-enterprise.service';
import {Service} from '../../../openapi3/aether/2.1.0/services/service';
import {ApiService} from '../../../openapi3/aether/2.1.0/services/api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormArray, FormBuilder, FormControl, Validators} from '@angular/forms';
import {BasketService, TYPE} from '../../basket.service';
import {EnterpriseEnterprise} from '../../../openapi3/aether/2.1.0/models/enterprise-enterprise';
import {AETHER_TARGETS} from '../../../environments/environment';
import {mergeMap, pluck} from 'rxjs/operators';
import {from} from 'rxjs';
import {ConnectivityServiceConnectivityService} from '../../../openapi3/aether/2.1.0/models/connectivity-service-connectivity-service';
import {RocEditBase} from '../../roc-edit-base';
@Component({
    selector: 'aether-connectivity-service-select',
    templateUrl: './connectivity-service-select.component.html',
    styleUrls: [
        '../../common-panel.component.scss',
    ]
})
export class ConnectivityServiceSelectComponent implements OnInit {
    target: string = AETHER_TARGETS[0];
    @Input() alreadySelectedCS: string[];
    @Output() closeEvent = new EventEmitter<string>();
    displayList: ConnectivityServiceConnectivityService[] = [];
    entConnForm = this.fb.group({
        'connectivity-service': ['']
    });

    constructor(
        private service: Service,
        private aetherApiService: ApiService,
        private fb: FormBuilder
    ) {
    }

    loadIntoSelect(target: string): void {
        this.service.getConnectivityService({
            target
        }).pipe(
            pluck('connectivity-service'),
            mergeMap((items: ConnectivityServiceConnectivityService[]) => from(items)),
        ).subscribe(
            value => {
                const exists = this.alreadySelectedCS.indexOf(value.id);
                if (exists === -1){
                    this.displayList.push(value);
                }
            }
        );
    }

    ngOnInit(): void {
        this.loadIntoSelect(this.target);
    }

    closeCard(selected: string): void {
        this.closeEvent.emit(selected);
    }

}
