/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { MatHeaderRow } from '@angular/material/table';
import { BasketService, BasketValue, HEX2NUM } from '../../basket.service';
import { ApiService } from '../../../openapi3/top/level/services';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
    AETHER_ROC_ADMIN_USER,
    OpenPolicyAgentService,
} from '../../open-policy-agent.service';

interface BasketRow {
    path: string;
    oldValue: any;
    newValue: any;
    deleted: boolean;
    displayPath: string;
}

@Component({
    selector: 'aether-basket',
    templateUrl: './basket.component.html',
    styleUrls: ['../../common-profiles.component.scss'],
})
export class BasketComponent implements OnInit {
    data: Array<BasketRow> = [];
    @ViewChild(MatTable) table: MatTable<Array<BasketRow>>;
    @ViewChild(MatHeaderRow) row: MatHeaderRow;
    @ViewChild(MatSort) sort: MatSort;
    AETHER_ROC_ADMIN_USER = AETHER_ROC_ADMIN_USER;

    patchName: string;
    pbDisplay: boolean = false;
    showTransactionList = false;
    updateCounter = 0;
    deleteCounter = 0;
    displayedColumns = [
        'displayPath',
        'oldChangeValue',
        'newChangeValue',
        'remove',
    ];

    constructor(
        private topLevelApiService: ApiService,
        private route: ActivatedRoute,
        private router: Router,
        private snackBar: MatSnackBar,
        private bs: BasketService,
        public opaService: OpenPolicyAgentService
    ) {}

    addPatchName(): void {
        localStorage.setItem('patchName', this.patchName);
    }

    toggleDisplayDiv(): void {
        this.pbDisplay = !this.pbDisplay;
    }

    ngOnInit(): void {
        Object.keys(localStorage)
            .filter((key) => key.startsWith('/basket'))
            .forEach((key) => {
                const valueFromLocalStorage = localStorage
                    .getItem(key)
                    .toString();
                // console.log('processing key', key, valueFromLocalStorage);
                const changeObject: BasketValue = JSON.parse(
                    valueFromLocalStorage
                );
                if (key.startsWith('/basket-update')) {
                    this.updateCounter = this.updateCounter + 1;
                } else if (key.startsWith('/basket-delete')) {
                    this.deleteCounter = this.deleteCounter + 1;
                }
                const basketRow = {
                    path: key,
                    oldValue: changeObject.oldValue,
                    newValue: changeObject.newValue,
                    deleted: key.startsWith('/basket-delete'),
                    displayPath: key.slice(14),
                } as unknown as BasketRow;
                if (changeObject.type === HEX2NUM) {
                    basketRow.oldValue =
                        changeObject.oldValue +
                        ' (' +
                        parseInt(changeObject.oldValue, 16) +
                        ')';
                    basketRow.newValue =
                        changeObject.newValue +
                        ' (' +
                        parseInt(changeObject.newValue, 16) +
                        ')';
                }
                this.data.push(basketRow);
                // console.log('processing key', basketRow);
            });
    }

    commitChanges(): void {
        const decision = confirm(
            'Are you sure you want to commit these changes?'
        );
        if (decision === true) {
            const patchBody = this.bs.buildPatchBody();
            console.info('SENDING', patchBody);

            this.topLevelApiService
                .patchTopLevel({ body: patchBody })
                .subscribe(
                    (resp) => {
                        console.log('Complete', resp);
                        this.snackBar.open('Complete' + resp, undefined, {
                            duration: 2000,
                        });
                        this.clearBasket();
                    },
                    (err) => {
                        console.warn('error posting patch body', err);
                        this.snackBar.open('Error:' + err.error, 'Dismiss', {
                            duration: 20000,
                        });
                    }
                );
        }
    }

    deletePath(key: string): void {
        localStorage.removeItem(key);
        const tempData = this.data.slice();
        const rowIdx = tempData.findIndex((obj) => obj.path === key);
        tempData.splice(rowIdx, 1);
        // Binding will not detect changes to elements in array - only changes in the array
        this.data = tempData.slice();
        if (key.startsWith('/basket-update')) {
            this.updateCounter = this.updateCounter - 1;
        } else if (key.startsWith('/basket-delete')) {
            this.deleteCounter = this.deleteCounter - 1;
        }
    }

    checkHistory(): void {
        this.showTransactionList = true;
    }

    clearBasket(): void {
        Object.keys(localStorage)
            .filter(
                (key) =>
                    key.startsWith('/basket') || key.startsWith('/unchanged-')
            )
            .forEach((key) => {
                localStorage.removeItem(key);
            });
        this.updateCounter = 0;
        this.deleteCounter = 0;
        this.data = [];
        this.pbDisplay = false;
    }

    discardAllChanges(): void {
        const decision = confirm(
            'Are you sure you want to discard all changes?'
        );
        if (decision === true) {
            this.clearBasket();
        }
    }
}
