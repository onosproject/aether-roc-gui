/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */

import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'hex'
})
export class HexPipe implements PipeTransform {

    static hexAsInt(hexString: string): number {
        return parseInt(hexString, 16);
    }

    transform(value: number): string {
        if (value === null || value === undefined) {
            return undefined;
        }
        return value.toString(16).toUpperCase();
    }
}
