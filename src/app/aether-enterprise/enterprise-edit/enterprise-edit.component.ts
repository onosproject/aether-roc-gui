/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {AETHER_TARGETS} from "../../../environments/environment";
import {ActivatedRoute, Router} from "@angular/router";
import {FormArray, FormBuilder, FormControl, Validators} from "@angular/forms";
import {
    ApiService,
    Service,
    EnterpriseEnterpriseService
} from "../../../openapi3/aether/2.0.0/services";
import {
    EnterpriseEnterprise, EnterpriseEnterpriseConnectivityService
} from "../../../openapi3/aether/2.0.0/models";
import {BasketService} from "../../basket.service";
import {MatHeaderRow, MatTable} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";

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
    connectivityServices: Array<EnterpriseEnterpriseConnectivityService>;
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
        'connectivity-services': this.fb.array([
        ])
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
        // this.loadConnectivityServices(this.target);
    }

    toggleDisplayDiv(): void {
        this.showConnectDisplay = ! this.showConnectDisplay;
    }

    // loadConnectivityServices(target: string): void{
    //     this.service.getConnectivityService({
    //         target,
    //     }).subscribe(
    //         (value => {
    //             this.connectivityServices = value['connectivity-service'];
    //             // const connectivityServiceRow = {
    //             //     display: value["connectivity-service"],
    //             //     enabled: value.enabled
    //             // } as unknown as ConnectivityServiceRow;
    //             // this.tableData.push(connectivityServiceRow);
    //             console.log('Got Connectivity Profiles', value['connectivity-service'].length);
    //         }),
    //         error => {
    //             console.warn('Error getting Connectivity Services for ', target, error);
    //         },
    //         () => {
    //             console.log('Finished loading Connectivity Services', target);
    //         }
    //     );
    // }

    pushToList(): void{

    }

    get connectivityServiceControls() {
        return this.entForm.controls['connectivity-services'] as FormArray;
    }

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
                this.data = value;
                this.entForm.get('id').setValue(value.id);
                this.entForm.get('display-name').setValue(value["display-name"]);
                this.entForm.get('description').setValue(value.description);

                // this.entForm.get('connectivity-services').get('connectivity-service').setValue(value["id"]);
                // this.entForm.get('connectivity-services').get('connectivity-service').setValue(value['enabled']);

                for (const cs of value['connectivity-service']) {
                    (this.entForm.get('connectivity-services') as FormArray).push(this.fb.group({
                        'connectivity-service': new FormControl({value: cs['connectivity-service']}),
                        enabled: cs['enabled']
                    }));
                }

                console.log('PRINTING CS: ', this.entForm);
                console.log('PRINTING CS: ', this.entForm);
            }),
            error => {
                console.warn('Error getting Enterprise Profiles for ', target, error);
            },
            () => {
                console.log('Finished loading Enterprise Profiles', target);
            }
        );
    }

    onSubmit(): void {
        console.log('Submitted!', this.entForm.getRawValue());
        let submitId = this.id;
        if (this.id === undefined) {
            submitId = this.entForm.get('id').value as unknown as string;
        }
        this.bs.logKeyValuePairs(this.entForm, 'enterprise-2.0.0/enterprise[' + this.id + ']');
        console.log(this.bs.buildPatchBody());
        this.aetherApiService.postEnterpriseEnterprise({
            id: submitId,
            target: AETHER_TARGETS[0],
            body: this.entForm.getRawValue()
        }).subscribe(
            value => {
                console.log('POST Response', value);
                // TODO: Add a string to the response in the OpenAPI yaml (so that this is not unknown)
                this.router.navigate(['/enterprise', 'enterprises', value as unknown as string]);
            },
            error => console.warn('POST error', error),
            () => {
                console.log('POST finished');
            }
        );
    }


}
