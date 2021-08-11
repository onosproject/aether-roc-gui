/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SafePipe} from './safe.pipe';
import {TruncateTextPipe} from './truncate-text.pipe';

@NgModule({
    declarations: [SafePipe, TruncateTextPipe],
    imports: [
        CommonModule
    ],
    exports: [
        SafePipe,
        TruncateTextPipe
    ]
})
export class UtilsModule {
}
