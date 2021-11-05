/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'
import {BasketService} from '../../basket.service'

@Component({
    selector: 'aether-basket-preview',
    templateUrl: './basket-preview.component.html',
    styleUrls: ['../../common-panel.component.scss']
})
export class BasketPreviewComponent implements OnInit {
    @Input() totalThings: string;
    patchName: string = localStorage.getItem('patchName');
    @Output() closeEvent = new EventEmitter<boolean>();
    basketPreview: string;

    constructor(
        private bs: BasketService
    ) {
    }

    ngOnInit(): void {
        this.basketPreview = JSON.stringify(this.bs.buildPatchBody() as unknown as string, null, 4)
    }

    closeCard(): void {
        this.closeEvent.emit(true)
    }
}
