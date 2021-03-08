/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTable} from '@angular/material/table';
import {MatHeaderRow} from '@angular/material/table';
import {AETHER_TARGETS} from '../../../environments/environment';
import {BasketService} from '../../basket.service';
import {Service as AetherV200TargetService} from '../../../openapi3/aether/2.0.0/services/service';
import {ApiService} from '../../../openapi3/aether/2.0.0/services/api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ID_TOKEN_ATTR} from '../../aether.component';
import {PatchBody} from '../../../openapi3/top/level/models/patch-body';

interface BasketRow {
    path: string;
    value: any;
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
    pbDisplay: boolean = true;
    // pbPreview = [
    //     this.bs.buildPatchBody()
    // ]
    updateCounter = 0;
    deleteCounter = 0;
    displayedColumns = [
        'displayPath',
        'value',
        'remove'
    ];

    constructor(
        private aetherV200TargetService: AetherV200TargetService,
        private aetherApiService: ApiService,
        private route: ActivatedRoute,
        private router: Router,
        private bs: BasketService
    ) {
    }

    toggleDisplayDiv(): void {
        this.pbDisplay = !this.pbDisplay;
    }

    get patchBody(): string {
        return this.bs.buildPatchBody() as unknown as string;
    }

    ngOnInit(): void {
        Object.keys(localStorage)
            .filter((key) => key.startsWith('/basket'))
            .forEach((key => {
                const keyValue = localStorage.getItem(key);
                if (key.startsWith('/basket-update')) {
                    this.updateCounter = this.updateCounter + 1;
                } else if (key.startsWith('/basket-delete')) {
                    this.deleteCounter = this.deleteCounter + 1;
                }
                const basketRow = {
                    path: key,
                    value: keyValue,
                    deleted: key.startsWith('/basket-delete'),
                    displayPath: key.slice(14)
                } as BasketRow;
                this.data.push(basketRow);
                console.log('processing key', basketRow);
            }));
    }

    ngAfterViewInit(): void {
    }

    commitChanges(): void {
        const decision = confirm('Are you sure you want to commit these changes?');
        if (decision === true) {
            // Do post

            console.log(this.bs.buildPatchBody());
            alert('Confirmed: ' + this.bs.buildPatchBody());
            this.clearBasket();
        } else {

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
        localStorage.removeItem('profileID');
        localStorage.removeItem('pathID');
        this.updateCounter = 0;
        this.deleteCounter = 0;
        this.data = [];
    }

    discardAllChanges(): void {
        const decision = confirm('Are you sure you want to discard all changes?');
        if (decision === true) {
            this.clearBasket();
        }
    }
}
