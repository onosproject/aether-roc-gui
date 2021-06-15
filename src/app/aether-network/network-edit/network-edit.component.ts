/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormArray, FormBuilder, FormControl, Validators} from '@angular/forms';
import {NetworkNetworkService} from '../../../openapi3/aether/3.0.0/services';
import {BasketService, IDATTRIBS, ORIGINAL, TYPE} from '../../basket.service';
import {MatHeaderRow, MatTable} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {RocEditBase} from '../../roc-edit-base';
import {MatSnackBar} from '@angular/material/snack-bar';
import {OpenPolicyAgentService} from '../../open-policy-agent.service';
import { NetworkNetwork } from 'src/openapi3/aether/3.0.0/models';

// interface Row {
//   id: string;
//   enabled: boolean;
// }

@Component({
  selector: 'aether-network-edit',
  templateUrl: './network-edit.component.html',
  styleUrls: [ '../../common-edit.component.scss']
})
export class NetworkEditComponent extends RocEditBase<NetworkNetwork> implements OnInit {
  data: NetworkNetwork;

  pathRoot = 'service-netwrok-3.0.0';
  pathListAttr = 'service-network';
  networkForm = this.fb.group({
    id: ['', Validators.compose([
        Validators.minLength(1),
        Validators.maxLength(32),
    ])],
    'display-name': ['', Validators.compose([
        Validators.minLength(1),
        Validators.maxLength(80),
    ])],
    mcc : ['', Validators.compose([
      Validators.minLength(1),
      Validators.maxLength(999),
  ])],
    mnc : ['', Validators.compose([
      Validators.minLength(1),
      Validators.maxLength(999),
  ])],
    description: ['', Validators.compose([
        Validators.minLength(1),
        Validators.maxLength(100),
    ])],
});

constructor(
  private networkNetworkService: NetworkNetworkService,
  protected route: ActivatedRoute,
  protected router: Router,
  protected fb: FormBuilder,
  protected bs: BasketService,
  protected snackBar: MatSnackBar,
  public opaService: OpenPolicyAgentService,
) {
  super(snackBar, bs, route, router, 'service-network-3.0.0', 'service-network');
  super.form = this.networkForm;
  super.loadFunc = this.loadNetworkNetwork;
  this.networkForm.get(['mcc'])[TYPE] = 'number';
  this.networkForm.get(['mnc'])[TYPE] = 'number';

}

ngOnInit(): void {
  super.init();
}

loadNetworkNetwork(target: string, id: string): void {
  this.networkNetworkService.getNetworkNetwork({
      target,
      id
  }).subscribe(
      (value => {
          this.data = value;
          this.populateFormData(value);
      }),
      error => {
          console.warn('Error getting NetworkNetwork(s) for ', target, error);
      },
      () => {
          const basketPreview = this.bs.buildPatchBody().Updates;
          if (this.pathRoot in basketPreview && this.pathListAttr in basketPreview['service-network-3.0.0']) {
              basketPreview['service-network-3.0.0']['service-network'].forEach((basketItems) => {
                  if (basketItems.id === id){
                      this.populateFormData(basketItems);
                  }
              });
          }
          console.log('Finished loading NetworkNetwork(s)', target, id);
      }
  );
}

private populateFormData(value: NetworkNetwork): void{
  if (value['display-name']) {
      this.networkForm.get('display-name').setValue(value['display-name']);
  }
  if (value.mcc){
    this.networkForm.get(['mcc']).setValue(value.mcc);
  }
  if (value.mnc){
    this.networkForm.get(['mnc']).setValue(value.mnc);
  }
  if (value.description){
    this.networkForm.get('description').setValue(value.description);
  }
}

}
