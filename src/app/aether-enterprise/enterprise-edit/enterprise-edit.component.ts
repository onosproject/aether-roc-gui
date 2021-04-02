/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {AETHER_TARGETS} from '../../../environments/environment';
import {ActivatedRoute, Router} from '@angular/router';
import {FormArray, FormBuilder, FormControl, Validators} from '@angular/forms';
import {
    ApiService,
    Service,
    EnterpriseEnterpriseService
} from '../../../openapi3/aether/2.0.0/services';
import {
    EnterpriseEnterprise, EnterpriseEnterpriseConnectivityService
} from '../../../openapi3/aether/2.0.0/models';
import {BasketService} from '../../basket.service';
import {MatHeaderRow, MatTable} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';

interface ConnectivityServiceRow {
    id: string;
    enabled: boolean;
}

@Component({
    selector: 'aether-enterprise-edit',
    templateUrl: './enterprise-edit.component.html',
    styleUrls: [
        '../../common-edit.component.scss',
        './enterprise-edit.component.scss'
    ]
})
export class EnterpriseEditComponent implements OnInit {
    @Input() target: string = AETHER_TARGETS[0];
    @Input() id: string;
    @ViewChild(MatTable) table: MatTable<Array<ConnectivityServiceRow>>;
    @ViewChild(MatHeaderRow) row: MatHeaderRow;
    @ViewChild(MatSort) sort: MatSort;
    showConnectDisplay: boolean = false;
    isNew: boolean;
    enterpriseConnectivityServices: EnterpriseEnterpriseConnectivityService;
    // connectivityServices: Array<EnterpriseEnterpriseConnectivityService>;
    // tableData : Array<ConnectivityServiceRow>
    data: EnterpriseEnterprise;

    displayedColumns = [
        'connectivity-service',
        'enabled'
    ];

    entForm = this.fb.group({
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
            Validators.maxLength(100)
        ])],
        connectivityServices: this.fb.array([])
    });

    constructor(
        private enterpriseEnterpriseService: EnterpriseEnterpriseService,
        private service: Service,
        private aetherApiService: ApiService,
        private route: ActivatedRoute,
        private router: Router,
        private fb: FormBuilder,
        private bs: BasketService
    ) {
    }

    get connectivityServices(): FormArray {
        return this.entForm.get('connectivityServices') as FormArray;
    }

    ngOnInit(): void {
        this.route.paramMap.subscribe(
            value => {
                if (value.get('id') === 'new') {
                    this.isNew = true;
                } else {
                    this.id = value.get('id');
                    this.loadEnterpriseEnterprises(this.target, this.id);
                }
            }
        );
    }

    // TODO - Add toggle div function

    populateConnectServices(): void {
        const connectivityServiceForm = this.fb.group({
            'connectivity-service': ['', Validators.compose([
                Validators.minLength(1),
                Validators.maxLength(31),
            ])],
            enabled: ['']
        });
        this['connectivity-services'].push(connectivityServiceForm);
    }

    loadEnterpriseEnterprises(target: string, id: string): void {
        this.enterpriseEnterpriseService.getEnterpriseEnterprise({
            target,
            id
        }).subscribe(
            (value => {
                let isDeleted = false;
                this.data = value;
                this.entForm.get('id').setValue(value.id);
                this.entForm.get('display-name').setValue(value['display-name']);
                this.entForm.get('description').setValue(value.description);
                for (const cs of value['connectivity-service']) {
                    isDeleted = false;
                    Object.keys(localStorage)
                        .filter(checkerKey => checkerKey.startsWith('/delete-ids'))
                        .forEach((checkerKey) => {
                            console.log(checkerKey);
                            if (checkerKey.includes(cs['connectivity-service'])) {
                                isDeleted = true;
                            }
                        });
                    if (isDeleted === false) {
                        (this.entForm.get('connectivityServices') as FormArray).push(this.fb.group({
                            connectivityService: cs['connectivity-service'],
                            enabled: [cs.enabled],
                        }));
                    }
                    isDeleted = false;
                }
            }),
            error => {
                console.warn('Error getting Enterprise Profiles for ', target, error);
            },
            () => {
                console.log('Finished loading Enterprise Profiles', target);
            }
        );
    }

    deleteFromSelect(cs: any): void {
        localStorage.setItem('/delete-ids/enterprise-2.0.0/enterprise[' + this.id + ']/connectivity-service[' + cs +
            ']connectivity-service', cs);
        localStorage.setItem('/basket-delete/enterprise-2.0.0/enterprise[' + this.id +
            ']/connectivity-service[' + cs + ']connectivity-service', '');
        const index = (this.entForm.get('connectivityServices') as FormArray)
            .controls.findIndex((c) => c.value[Object.keys(c.value)[0]] === cs);
        (this.entForm.get('connectivityServices') as FormArray).removeAt(index);
    }

    onSubmit(): void {
        this.bs.logKeyValuePairs(this.entForm, 'enterprise-2.0.0/enterprise[' + this.id + ']');
    }


}
