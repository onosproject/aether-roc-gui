/*
 * SPDX-FileCopyrightText: 2022-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { TargetsNames } from '../openapi3/top/level/models/targets-names';
import { ApiService as TopLevelApiService } from '../openapi3/top/level/services/api.service';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class EnterpriseService {
    enterprises: TargetsNames;

    constructor(private aetherService: TopLevelApiService) {}

    loadTargets() {
        this.aetherService
            .targetsTopLevel()
            .pipe(tap((e) => console.log('Loaded enterprises', e)))
            .subscribe((enterprises) => (this.enterprises = enterprises));
    }

    get isSingleton(): boolean {
        return this.enterprises.length === 1;
    }
}
