/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ApplicationApplicationService, Service as AetherService} from '../../../openapi3/aether/3.0.0/services';
import {
  ApplicationApplication,
    EnterpriseEnterprise
} from '../../../openapi3/aether/3.0.0/models';
import {BasketService, IDATTRIBS, ORIGINAL, TYPE} from '../../basket.service';
import {MatHeaderRow, MatTable} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {RocEditBase} from '../../roc-edit-base';
import {MatSnackBar} from '@angular/material/snack-bar';
import {OpenPolicyAgentService} from '../../open-policy-agent.service';

@Component({
  selector: 'aether-application-edit',
  templateUrl: './application-edit.component.html',
  styleUrls:  [
    '../../common-edit.component.scss',
]
})
export class ApplicationEditComponent extends RocEditBase<ApplicationApplication> implements OnInit {

  enterprises: Array<EnterpriseEnterprise>;
  pathRoot = 'application-3.0.0';
  pathListAttr = 'application';
  data: ApplicationApplication;
  appForm = this.fb.group({
    id: ['', Validators.compose([
        Validators.minLength(1),
        Validators.maxLength(32),
    ])],
    'display-name': ['', Validators.compose([
        Validators.minLength(1),
        Validators.maxLength(80),
    ])],
    description: ['', Validators.compose([
        Validators.minLength(1),
        Validators.maxLength(100),
    ])],
    endpoint: this.fb.array([]),
    enterprise: ['']
});

  constructor(
    private applicationApplicationService: ApplicationApplicationService,
    private aetherService: AetherService,
    protected route: ActivatedRoute,
    protected router: Router,
    protected fb: FormBuilder,
    protected bs: BasketService,
    protected snackBar: MatSnackBar,
    public opaService: OpenPolicyAgentService,
  ) {
    super(snackBar, bs, route, router, 'application-3.0.0', 'application');
    super.form = this.appForm;
    super.loadFunc = this.loadApplicationApplication;
  }

  ngOnInit(): void {
    super.init();
    this.loadEnterprise(this.target);
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
                basketPreview['application-3.0.0'].application.forEach((basketItems) => {
                    if (basketItems.id === id){
                        this.populateFormData(basketItems);
                    }
                });
            }
            console.log('Finished loading ApplicationApplication(s)', target, id);
        }
    );
  }

  private populateFormData(value: ApplicationApplication): void{
    if (value['display-name']) {
        this.appForm.get('display-name').setValue(value['display-name']);
    }
    if (value.description) {
        this.appForm.get(['description']).setValue(value.description);
    }
    if (value.endpoint){
      if (this.appForm.value.endpoint.length === 0) {
          for (const ep of value.endpoint) {
            const epNameControl = this.fb.control(ep.name);
            epNameControl[ORIGINAL] = ep.name;
            const epAddressControl = this.fb.control(ep.address);
            epAddressControl[ORIGINAL] = ep.address;
            const epPortStartControl = this.fb.control(ep['port-start']);
            epPortStartControl[ORIGINAL] = ep.name;
            const epPortEndControl = this.fb.control(ep['port-end']);
            epPortEndControl[ORIGINAL] = ep.protocol;
            const epProtocolontrol = this.fb.control(ep.protocol);
            epProtocolontrol[ORIGINAL] = ep.name;
            (this.appForm.get(['endpoint']) as FormArray).push(this.fb.group({
                name: epNameControl,
                address: epAddressControl,
                'port-start': epPortStartControl,
                'port-end': epPortEndControl,
                protocol: epProtocolontrol
              }));
          }
      } else {
          for (const eachValueEndpoint of value.endpoint) {
              let eachFormEndpointPosition = 0;
              for (const eachFormEndpoint of this.appForm.value.endpoint){
                  if (eachValueEndpoint.name === eachFormEndpoint.name){
                      this.appForm.value.endpoint.address = eachValueEndpoint.address;
                  }
                  eachFormEndpointPosition++;
              }
          }
      }
  }
  }

  get endpointControls(): FormArray {
    return this.appForm.get(['endpoint']) as FormArray;
}
  loadEnterprise(target: string): void {
    this.aetherService.getEnterprise({
        target,
    }).subscribe(
        (value => {
            this.enterprises = value.enterprise;
            console.log('Got', value.enterprise.length, 'Enterprise');
        }),
        error => {
            console.warn('Error getting Enterprise for ', target, error);
        }
    );
}

}
