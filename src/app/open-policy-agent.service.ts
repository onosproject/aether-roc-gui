/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import { Injectable } from '@angular/core';
import { authConfig } from '../environments/environment';

export const AETHER_ROC_ADMIN_USER = 'AetherROCAdmin';
export const ENTERPRISE_ADMIN_USER = 'EnterpriseAdmin';

@Injectable({
    providedIn: 'root',
})
export class OpenPolicyAgentService {
    userGroups: string[] = [];

    // TODO in future we will pull in OpenPolicyAgent REGO rules for RBAC.
    //  For the moment (Q1) we will just use a hardcoded crude RBAC mechanism
    //  i.e. if userGroups contains AetherROCAdmin then write access is allowed

    canRead(): boolean {
        return true;
    }

    // for Q12021 - while we have crude RBAC scheme, we allow write access regardless
    // of path, if 1) Security is turned off OR 2) user is in special group
    canWrite(path: string): boolean {
        if (
            authConfig.issuer === undefined ||
            this.userGroups.indexOf(AETHER_ROC_ADMIN_USER) > -1 ||
            this.userGroups.indexOf(ENTERPRISE_ADMIN_USER) > -1
        ) {
            return true;
        }

        return false;
    }
}
