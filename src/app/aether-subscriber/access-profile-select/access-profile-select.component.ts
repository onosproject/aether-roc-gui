/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */

import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Service} from '../../../openapi3/aether/2.1.0/services/service';
import {FormBuilder} from '@angular/forms';
import {AccessProfile, AccessProfileAccessProfile} from '../../../openapi3/aether/2.1.0/models';
import {RocSelectBase} from '../../roc-select-base';
import {AETHER_TARGETS} from '../../../environments/environment';

@Component({
    selector: 'aether-access-profile-select',
    templateUrl: './access-profile-select.component.html',
    styleUrls: ['../../common-panel.component.scss']
})
export class AccessProfileSelectComponent extends RocSelectBase<AccessProfileAccessProfile, AccessProfile> implements OnInit {
    @Input() alreadySelected: string[] = [];
    @Output() closeEvent = new EventEmitter<string>();

    constructor(
        protected service: Service,
        protected fb: FormBuilder,
    ) {
        super(fb);
    }

    ngOnInit(): void {
        super.getData(this.service.getAccessProfile({target: AETHER_TARGETS[0]}),
            'access-profile');
    }
}
