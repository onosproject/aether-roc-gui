import {Component, OnInit} from '@angular/core';
import {RocEditBase} from '../../roc-edit-base';
import {FormArray, FormBuilder, FormControl, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {BasketService, IDATTRIBS, ORIGINAL, TYPE} from '../../basket.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {OpenPolicyAgentService} from '../../open-policy-agent.service';
import {ApplicationApplication} from "../../../openapi3/aether/3.0.0/models/application-application";
import {ApplicationApplicationService} from "../../../openapi3/aether/3.0.0/services/application-application.service";
import {ApplicationApplicationEndpoint} from "../../../openapi3/aether/3.0.0/models/application-application-endpoint";

@Component({
    selector: 'aether-application-edit',
    templateUrl: './application-edit.component.html',
    styleUrls: ['../../common-edit.component.scss']
})
export class ApplicationEditComponent extends RocEditBase<ApplicationApplication> implements OnInit {

    data: ApplicationApplication;
    endPoint: Array<ApplicationApplicationEndpoint>;
    showEndPointDisplay: boolean = false;

    applicationForm = this.fb.group({
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
        endpoint: this.fb.array([])
    });

    constructor(
        private applicationApplicationService: ApplicationApplicationService,
        protected route: ActivatedRoute,
        protected router: Router,
        private fb: FormBuilder,
        protected bs: BasketService,
        protected snackBar: MatSnackBar,
        public opaService: OpenPolicyAgentService,
    ) {
        super(snackBar, bs, route, router, 'application-3.0.0', 'application');
        super.form = this.applicationForm;
        super.loadFunc = this.loadApplicationApplication;
    }

    ngOnInit(): void {
        super.init();
    }

    get endPointControls(): FormArray {
        return this.applicationForm.get(['endpoint']) as FormArray;
    }

    get endPointExisting(): string[] {
        const existingList: string[] = [];
        (this.applicationForm.get(['endpoint']) as FormArray).controls.forEach((ap) => {
            existingList.push(ap.get(['endpoint']).value);
        });
        return existingList;
    }

    private populateFormData(value: ApplicationApplication): void {
        if(value['display-name']) {
            this.applicationForm.get('display-name').setValue(value['display-name']);
            this.applicationForm.get('display-name')[ORIGINAL] = value['display-name'];
        }
        if(value.description) {
            this.applicationForm.get('description').setValue(value['description']);
            this.applicationForm.get('description')[ORIGINAL] = value['description'];
        }
        if(value['endpoint']) {
            if (this.applicationForm.value['endpoint'].length === 0) {
                for (const ap of value['endpoint']) {
                    const nameFormControl = this.fb.control(ap.name);
                    nameFormControl[ORIGINAL] = ap.name;

                    const addressFormControl = this.fb.control(ap.address);
                    addressFormControl[ORIGINAL] = ap.address;

                    const portStartFormControl = this.fb.control(ap['port-start']);
                    portStartFormControl[ORIGINAL] = ap['port-start'];

                    const portEndFormControl = this.fb.control(ap['port-end']);
                    portEndFormControl[ORIGINAL] = ap['port-end'];

                    const protocolFormControl = this.fb.control(ap.protocol);
                    protocolFormControl[ORIGINAL] = ap.protocol;

                    (this.applicationForm.value['endpoint'] as FormArray).push(this.fb.group({
                        name: nameFormControl,
                        address: addressFormControl,
                        'port-start': portStartFormControl,
                        'port-end': portEndFormControl,
                        protocol: protocolFormControl,
                    }));
                }
                console.log('Got endpoint', value);
            }
            else {
                for (const eachValueEndPoint of value['endpoint']) {
                    let eachFormRulePosition = 0;
                    for (const eachFormSubscribe of this.applicationForm.value['endpoint']) {
                        if (eachValueEndPoint['endpoint'] === eachFormSubscribe['endpoint']){
                            this.applicationForm.value['endpoint'].name = eachValueEndPoint.name;
                            this.applicationForm.value['endpoint'].address = eachValueEndPoint.address;
                            this.applicationForm.value['endpoint']['port-start'] = eachValueEndPoint['port-start'];
                            this.applicationForm.value['endpoint']['port-end'] = eachValueEndPoint['port-end'];
                            this.applicationForm.value['endpoint'].protocol = eachValueEndPoint.protocol;
                        }
                        eachFormRulePosition++;
                    }
                }
            }
        }
    }

    loadApplicationApplication(target: string, id: string): void {
        this.applicationApplicationService.getApplicationApplication({
            target,
            id
        }).subscribe(
            (value => {
                this.data = value;
                this.populateFormData(value);
            }),
            error => {
                console.warn('Error getting ApplicationApplication(s) for ', target, error);
            },
            () => {
                const basketPreview = this.bs.buildPatchBody().Updates;
                if (this.pathRoot in basketPreview && this.pathListAttr in basketPreview['application-3.0.0']) {
                    basketPreview['application-3.0.0']['application'].forEach((basketItems) => {
                        if (basketItems.id === id) {
                            this.populateFormData(basketItems);
                        }
                    });
                }
                console.log('Finished loading ApplicationApplication(s)', target, id);
            }
        );
    }

}
