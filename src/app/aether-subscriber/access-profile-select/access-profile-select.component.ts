/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */

import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AETHER_TARGETS} from '../../../environments/environment';
import {Service} from '../../../openapi3/aether/2.1.0/services/service';
import {ApiService} from '../../../openapi3/aether/2.1.0/services/api.service';
import {FormBuilder} from '@angular/forms';
import {AccessProfileAccessProfile} from '../../../openapi3/aether/2.1.0/models';
import {mergeMap, pluck} from 'rxjs/operators';
import {from} from 'rxjs';

@Component({
    selector: 'aether-access-profile-select',
    templateUrl: './access-profile-select.component.html',
    styleUrls: ['../../common-panel.component.scss']
})
export class AccessProfileSelectComponent implements OnInit {
    target: string = AETHER_TARGETS[0];
    @Input() alreadySelectedAP: string[] = [];
    @Output() closeEvent = new EventEmitter<string>();
    displayList: AccessProfileAccessProfile[] = [];

    apForm = this.fb.group({
        'access-profile': [''],
    });

    constructor(
        private service: Service,
        private aetherApiService: ApiService,
        private fb: FormBuilder
    ) {
    }

    loadIntoSelect(target: string): void {
        this.service.getAccessProfile({
            target
        }).pipe(
            pluck('access-profile'),
            mergeMap((items: AccessProfileAccessProfile[]) => from(items)),
        ).subscribe(
            value => {
                const exists = this.alreadySelectedAP.indexOf(value.id);
                if (exists === -1) {
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
