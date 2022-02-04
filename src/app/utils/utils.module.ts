/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafePipe } from './safe.pipe';
import { TruncateTextPipe } from './truncate-text.pipe';
import { HexPipe } from './hex.pipe';

@NgModule({
    declarations: [SafePipe, TruncateTextPipe, HexPipe],
    imports: [CommonModule],
    exports: [SafePipe, TruncateTextPipe, HexPipe],
})
export class UtilsModule {}
