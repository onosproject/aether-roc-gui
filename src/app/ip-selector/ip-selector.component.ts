/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'aether-ip-selector',
    templateUrl: './ip-selector.component.html',
    styleUrls: ['../common-profiles.component.scss']
})
export class IpSelectorComponent implements OnInit {
    mode = 'ipv4';
    @Input() value: string;
    @Output() newIP = new EventEmitter<string>();
    @Output() closeEvent = new EventEmitter<boolean>();

    constructor() {

    }

    ngOnInit(): void {
        this.checkIfUndefined();
        this.checkIPType();
    }

    checkIfUndefined(): void {
        if (this.value === undefined) {
            this.value = '';
        }
    }

    checkIPType(): void {
        let ipType: number;
        if (this.value.includes('.')) {
            ipType = 1;
        } else if (this.value.includes(':')) {
            ipType = 2;
        } else if (this.value.includes('/')){
            ipType = 3;
        }
        switch (ipType) {
            case 1:
                this.mode = 'ipv4';
                console.log('V4');
                break;
            case 2:
                this.mode = 'ipv6';
                console.log('V6');
                break;
            case 3:
                this.mode = 'ipv4WithMask';
        }
    }

    emitNewIP(ip: string): void {
        this.newIP.emit(ip);
    }

    closeCard(): void {
        this.closeEvent.emit(true);
    }
}
