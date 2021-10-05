/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import { ApplicationApplicationService, Service } from 'src/openapi3/aether/4.0.0/services';
import {AETHER_TARGETS} from '../../../environments/environment';
import {Application} from '../../../openapi3/aether/4.0.0/models';
import {RocSelectBase} from '../../roc-select-base';

@Component({
  selector: 'aether-application-select',
  templateUrl: './application-select.component.html',
  styleUrls: [
  '../../common-panel.component.scss',
]
})
export class ApplicationSelectComponent  extends RocSelectBase<ApplicationApplicationService, Application>
implements OnInit {

@Input() alreadySelected: string[] = [];
@Output() closeEvent = new EventEmitter<string>();

constructor(
    protected service: Service,
    protected fb: FormBuilder,
) {
    super(fb);
}

ngOnInit(): void {
    super.getData(this.service.getApplication({target: AETHER_TARGETS[0]}),
        'application');
}
}
