/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormArray, FormBuilder, FormControl, Validators} from '@angular/forms';
import { Service as AetherService, TrafficClassTrafficClassService} from '../../../openapi3/aether/3.0.0/services';
import {  TrafficClassTrafficClass } from '../../../openapi3/aether/3.0.0/models';
import {BasketService, IDATTRIBS, ORIGINAL, TYPE} from '../../basket.service';
import {MatHeaderRow, MatTable} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {RocEditBase} from '../../roc-edit-base';
import {MatSnackBar} from '@angular/material/snack-bar';
import { OpenPolicyAgentService } from '../../open-policy-agent.service';
import { Observable } from 'rxjs';
import { map, startWith} from 'rxjs/operators';

@Component({
  selector: 'aether-traffic-class-edit',
  templateUrl: './traffic-class-edit.component.html',
  styleUrls: [
    '../../common-edit.component.scss',
]
})
export class TrafficClassEditComponent extends RocEditBase<TrafficClassTrafficClass> implements OnInit {


  pathRoot = 'traffic-class-3.0.0';
  pathListAttr = 'traffic-class';
  data: TrafficClassTrafficClass;
  TcForm = this.fb.group({
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
    pelr: [0],
    pdb: [0],
    qci: [0],
});

  constructor(
    private trafficClassTrafficClassService: TrafficClassTrafficClassService,
    private aetherService: AetherService,
    protected route: ActivatedRoute,
    protected router: Router,
    protected fb: FormBuilder,
    protected bs: BasketService,
    protected snackBar: MatSnackBar,
    public opaService: OpenPolicyAgentService
    ) {
      super(snackBar, bs, route, router, 'traffic-class-3.0.0', 'traffic-class');
      super.form = this.TcForm;
      super.loadFunc = this.loadTrafficClassTrafficClass;
    }

  ngOnInit(): void {
    super.init();
  }

  loadTrafficClassTrafficClass(target: string, id: string): void {
    this.trafficClassTrafficClassService.getTrafficClassTrafficClass({
        target,
        id
    }).subscribe(
        (value => {
            this.data = value;
            this.populateFormData(value);
        }),
        error => {
            console.warn('Error getting TrafficClassTrafficClass(s) for ', target, error);
        },
        () => {
            const basketPreview = this.bs.buildPatchBody().Updates;
            if (this.pathRoot in basketPreview && this.pathListAttr in basketPreview['traffic-class-3.0.0']) {
                basketPreview['traffic-class-3.0.0']['traffic-class'].forEach((basketItems) => {
                    if (basketItems.id === id){
                        this.populateFormData(basketItems);
                    }
                });
            }
            console.log('Finished loading TrafficClassTrafficClass(s)', target, id);
        }
    );
  }

  private populateFormData(value: TrafficClassTrafficClass): void{
    if (value['display-name']) {
        this.TcForm.get('display-name').setValue(value['display-name']);
    }
    if (value.description) {
        this.TcForm.get(['description']).setValue(value.description);
    }
    if (value.pelr) {
        this.TcForm.get(['pelr']).setValue(value.pelr);
    }
    if (value.pdb){
        this.TcForm.get(['pdb']).setValue(value.pdb);
    }
    if (value.qci) {
        this.TcForm.get(['qci']).setValue(value.qci);
    }
  }
}
