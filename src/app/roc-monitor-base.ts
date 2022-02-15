/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ActivatedRoute, Router } from '@angular/router';
import {
    EnterprisesEnterpriseSite,
    EnterprisesEnterpriseSiteImsiDefinition,
} from '../openapi3/aether/2.0.0/models';

export abstract class RocMonitorBase {
    id: string;

    protected constructor(
        protected route: ActivatedRoute,
        protected router: Router
    ) {}

    init(): void {
        this.route.paramMap.subscribe((value) => {
            this.id = value.get('id');
        });
    }

    range(start: number, end: number): number[] {
        if (start === undefined) {
            return undefined;
        }
        const len = end - start + 1;
        return Array(len)
            .fill(start)
            .map((x, y) => x + y);
    }

    public imsiListString(start: number, end: number): string {
        if (start === undefined) {
            return undefined;
        }
        return this.range(start, end).join(', ');
    }

    public imsiList(start: number, end: number): number[] {
        if (start === undefined) {
            start = 0;
        }
        return this.range(start, end);
    }

    // We expect the Site to have a format specified like CCCNNNEEESSSSSS
    public fullImsi(site: EnterprisesEnterpriseSite, imsiId: number): string {
        const imsiDef = site[
            'imsi-definition'
        ] as EnterprisesEnterpriseSiteImsiDefinition;
        const lenMcc = imsiDef.format.lastIndexOf('C') + 1;
        const lenMnc = imsiDef.format.lastIndexOf('N') + 1 - lenMcc;
        const lenEnt = imsiDef.format.lastIndexOf('E') + 1 - lenMnc - lenMcc;
        const lenImsi =
            imsiDef.format.lastIndexOf('S') + 1 - lenMnc - lenMcc - lenEnt;
        const mcc = ('0'.repeat(lenMcc) + imsiDef.mcc.toString()).slice(
            -lenMcc
        );
        const mnc = ('0'.repeat(lenMnc) + imsiDef.mnc.toString()).slice(
            -lenMnc
        );
        const ent = ('0'.repeat(lenEnt) + imsiDef.enterprise.toString()).slice(
            -lenEnt
        );
        const imsi = ('0'.repeat(lenImsi) + imsiId.toString()).slice(-lenImsi);
        return mcc + '-' + mnc + '-' + ent + '-' + imsi;
    }
}
