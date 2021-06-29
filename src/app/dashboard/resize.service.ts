/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */

import { EventManager } from '@angular/platform-browser';
import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable()
export class ResizeService {

    get onResize$(): Observable<Window> {
        return this.resizeSubject.asObservable();
    }

    private resizeSubject: Subject<Window>;

    constructor(private eventManager: EventManager) {
        this.resizeSubject = new Subject();
        this.eventManager.addGlobalEventListener('window', 'resize', this.onResize.bind(this));
    }

    private onResize(event: UIEvent): void {
        this.resizeSubject.next(event.target as Window);
    }
}
