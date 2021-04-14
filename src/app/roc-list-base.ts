/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */

export abstract class RocListBase<T> {
    public dataSource: T;

    protected constructor(datasource: T) {
        this.dataSource = datasource;
    }

    delete(id: string): void {
        // @ts-ignore
        this.dataSource.delete(id);
    }
}
