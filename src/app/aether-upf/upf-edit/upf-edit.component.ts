/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormArray, FormBuilder, FormControl, Validators} from '@angular/forms';
import { UpfUpfService} from '../../../openapi3/aether/3.0.0/services';
import { UpfUpf } from '../../../openapi3/aether/3.0.0/models';
import {BasketService, IDATTRIBS, ORIGINAL, TYPE} from '../../basket.service';
import {MatHeaderRow, MatTable} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {RocEditBase} from '../../roc-edit-base';
import {MatSnackBar} from '@angular/material/snack-bar';
import {OpenPolicyAgentService} from '../../open-policy-agent.service';

@Component({
  selector: 'aether-upf-edit',
  templateUrl: './upf-edit.component.html',
  styleUrls: [
    '../../common-edit.component.scss',
]
})
export class UpfEditComponent extends RocEditBase<UpfUpf> implements OnInit {
  data: UpfUpf;
  pathRoot = 'upf-2.1.0';
    pathListAttr = 'upf';
    upfForm = this.fb.group({
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
          Validators.maxLength(80),
        ])],
        address: ['', Validators.compose([
          Validators.minLength(1),
          Validators.maxLength(80),
        ])],
        port: ['', Validators.compose([
          Validators.minLength(1),
          Validators.maxLength(80),
      ])],
  });

  constructor(
    private upfUpfService: UpfUpfService,
    protected route: ActivatedRoute,
    protected router: Router,
    protected fb: FormBuilder,
    protected bs: BasketService,
    protected snackBar: MatSnackBar,
    public opaService: OpenPolicyAgentService,
) {
    super(snackBar, bs, route, router, 'upf-2.1.0', 'upf');
    super.form = this.upfForm;
    super.loadFunc = this.loadUpfUpf;
}

ngOnInit(): void {
  super.init();
  }

loadUpfUpf(target: string, id: string): void {
  this.upfUpfService.getUpfUpf({
      target,
      id
  }).subscribe(
      (value => {
          this.data = value;
          this.populateFormData(value);
      }),
      error => {
          console.warn('Error getting UpfUpf(s) for ', target, error);
      },
      () => {
          const basketPreview = this.bs.buildPatchBody().Updates;
          if (this.pathRoot in basketPreview && this.pathListAttr in basketPreview['upf-2.1.0']) {
              basketPreview['upf-2.1.0'].upf.forEach((basketItems) => {
                  if (basketItems.id === id){
                      this.populateFormData(basketItems);
                  }
              });
          }
          console.log('Finished loading UpfUpf(s)', target, id);
      }
  );
}

private populateFormData(value: UpfUpf): void{
  if (value['display-name']) {
      this.upfForm.get('display-name').setValue(value['display-name']);
  }
  if (value.description) {
    this.upfForm.get('description').setValue(value.description);
  }
  if (value.address) {
    this.upfForm.get('address').setValue(value.address);
  }
  if (value.port) {
    this.upfForm.get('port').setValue(value.port);
  }
}
}
