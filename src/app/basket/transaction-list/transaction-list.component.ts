/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TransactionListService } from '../../../openapi3/top/level/services';
import { Transaction } from '../../../openapi3/top/level/models';
import { MatTableDataSource } from '@angular/material/table';
import { PathTarget } from '../../../openapi3/top/level/models';

type UiTransaction = Transaction & {
    dataSource: MatTableDataSource<PathTarget>;
};

@Component({
    selector: 'aether-transaction-list',
    templateUrl: './transaction-list.component.html',
    styleUrls: ['../../common-panel.component.scss'],
})
export class TransactionListComponent implements OnInit {
    @Output() closeEvent = new EventEmitter<boolean>();
    displayedColumns = ['path', 'deleted', 'value'];
    displayChanges = false;
    rowID: string;
    transactionListData: UiTransaction[];

    constructor(private topLevelApiService: TransactionListService) {}

    ngOnInit(): void {
        this.topLevelApiService
            .getTransactions()
            .subscribe((value: Transaction[]) => {
                this.transactionListData = value.reduce(
                    (list: UiTransaction[], t: Transaction) => {
                        return [
                            ...list,
                            {
                                ...t,
                                dataSource: new MatTableDataSource(
                                    t.details.change[0]['path-values']
                                ),
                            } as UiTransaction,
                        ];
                    },
                    []
                );
            });
    }

    closeCard(): void {
        this.closeEvent.emit(true);
    }
}
