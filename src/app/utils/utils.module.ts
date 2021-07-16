/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SafePipe} from './safe.pipe';

@NgModule({
    declarations: [SafePipe],
    imports: [
        CommonModule
    ],
    exports: [
        SafePipe
    ]
})
export class UtilsModule {
}
