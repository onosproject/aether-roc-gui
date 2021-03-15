/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {Component, OnInit} from '@angular/core';
import {BasketService} from '../../basket.service';

@Component({
    selector: 'aether-basket-preview',
    templateUrl: './basket-preview.component.html',
    styleUrls: ['./basket-preview.component.scss']
})
export class BasketPreviewComponent implements OnInit {
    basketPreview: string;

    constructor(
        private bs: BasketService
    ) {
    }

    ngOnInit(): void {
        this.basketPreview = JSON.stringify(this.bs.buildPatchBody() as unknown as string, null, 4);
    }

}
