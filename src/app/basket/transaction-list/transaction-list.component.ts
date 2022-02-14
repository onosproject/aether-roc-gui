/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import {
    Component,
    EventEmitter,
    OnInit,
    Output,
    ViewChild,
} from '@angular/core';
import { TransactionListService } from '../../../openapi3/top/level/services';
import { MatTable } from '@angular/material/table';
import { Transaction } from '../../../openapi3/top/level/models';

export interface TransactionList {
    id: string;
    username: string;
    changes: string;
    updated: string;
    status: string;
}

@Component({
    selector: 'aether-transaction-list',
    templateUrl: './transaction-list.component.html',
    styleUrls: ['../../common-panel.component.scss'],
})
export class TransactionListComponent implements OnInit {
    @ViewChild(MatTable)
    table: MatTable<TransactionList>;
    @Output() closeEvent = new EventEmitter<boolean>();
    displayedColumns = ['id', 'username', 'updated', 'status', 'changes'];
    displayChanges = false;
    rowID: string;
    transactionListData: Transaction[];

    constructor(private topLevelApiService: TransactionListService) {}

    ngOnInit(): void {
        this.topLevelApiService.getTransactions().subscribe((value) => {
            this.transactionListData = value;
        });
    }

    closeCard(): void {
        this.closeEvent.emit(true);
    }
    ViewChanges(id: string): void {
        this.rowID = id;
        this.displayChanges = !this.displayChanges;
    }

    showTransactionDetails(id: string): boolean {
        if (this.displayChanges && this.rowID === id) {
            return true;
        } else {
            false;
        }
    }
}
