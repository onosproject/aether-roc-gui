/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTable} from '@angular/material/table';
import {MatHeaderRow} from '@angular/material/table';
import {BasketService, BasketValue} from '../../basket.service';
import {ApiService} from '../../../openapi3/top/level/services';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {OpenPolicyAgentService} from '../../open-policy-agent.service';

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
    styleUrls: ['../../common-profiles.component.scss']
})
export class BasketComponent implements AfterViewInit, OnInit {
    data: Array<BasketRow> = [];
    @ViewChild(MatTable) table: MatTable<Array<BasketRow>>;
    @ViewChild(MatHeaderRow) row: MatHeaderRow;
    @ViewChild(MatSort) sort: MatSort;

    patchName: string;
    pbDisplay: boolean = false;
    updateCounter = 0;
    deleteCounter = 0;
    displayedColumns = [
        'displayPath',
        'oldChangeValue',
        'newChangeValue',
        'remove'
    ];

    constructor(
        private topLevelApiService: ApiService,
        private route: ActivatedRoute,
        private router: Router,
        private snackBar: MatSnackBar,
        private bs: BasketService,
        public opaService: OpenPolicyAgentService,
    ) {
    }

    addPatchName(): void{
        localStorage.setItem('patchName', this.patchName);
    }

    toggleDisplayDiv(): void {
        this.pbDisplay = !this.pbDisplay;
    }

    ngOnInit(): void {
        Object.keys(localStorage)
            .filter((key) => key.startsWith('/basket'))
            .forEach((key => {
                const valueFromLocalStorage = localStorage.getItem(key).toString();
                console.log('processing key', key, valueFromLocalStorage);
                const changeObject: BasketValue = JSON.parse(valueFromLocalStorage);
                if (key.startsWith('/basket-update')) {
                    this.updateCounter = this.updateCounter + 1;
                } else if (key.startsWith('/basket-delete')) {
                    this.deleteCounter = this.deleteCounter + 1;
                }
                const basketRow = {
                    path: key,
                    oldChangeValue: changeObject.oldValue,
                    newChangeValue: changeObject.newValue,
                    deleted: key.startsWith('/basket-delete'),
                    displayPath: key.slice(14)
                } as unknown as BasketRow;
                this.data.push(basketRow);
                console.log('processing key', basketRow);
            }));
    }

    ngAfterViewInit(): void {
    }

    commitChanges(): void {
        const decision = confirm('Are you sure you want to commit these changes?');
        if (decision === true) {
            const patchBody = this.bs.buildPatchBody();
            console.log('SENDING', patchBody);

            this.topLevelApiService.patchTopLevel({body: patchBody}).subscribe(
                (resp) => {
                    console.log('Complete', resp);
                    this.snackBar.open('Complete' + resp, undefined, {duration: 2000});
                },
                (err) => {
                    console.warn('error posting patch body', err);
                    this.snackBar.open('Error:' + err.error, 'Dismiss', {duration: 20000});
                }
            );

            this.clearBasket();
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

    clearBasket(): void {
        Object.keys(localStorage)
            .filter(key => key.startsWith('/basket'))
            .forEach((key) => {
                localStorage.removeItem(key);
            });
        this.updateCounter = 0;
        this.deleteCounter = 0;
        this.data = [];
        this.pbDisplay = false;
    }

    discardAllChanges(): void {
        const decision = confirm('Are you sure you want to discard all changes?');
        if (decision === true) {
            this.clearBasket();
        }
    }
}
