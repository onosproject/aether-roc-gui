/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import {
    webSocket,
    WebSocketSubject,
    WebSocketSubjectConfig,
} from 'rxjs/webSocket';
import { WEBSOCKET_PROXY } from '../environments/environment';
import { Observable, Observer, Subject, Subscription, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SocketService {
    // eslint-disable-next-line
    public webSocketSubject: WebSocketSubject<any>;
    private connectedObservers: Array<Observer<boolean>>;
    private permanentSub: Subscription;

    constructor() {
        this.connectedObservers = new Array<Observer<boolean>>();
    }

    // With Chrome connect() has been called before the panel-slice calls on subscribe
    // With Firefox connect() has not called yet at that stage, so we want to callback
    // the panel VCS when it is
    private onConnected(observer: Observer<boolean>): void {
        if (!this.webSocketSubject || this.webSocketSubject.closed) {
            observer.next(false); // For firefox
            this.connectedObservers.push(observer);
        } else {
            observer.next(true); // For chrome
            observer.complete();
        }
    }

    public subscribe(filter: string): Observable<unknown> {
        const responseObs = new Subject();
        this.onConnected({
            next: (x) =>
                x
                    ? console.log(
                          'WebSocket not ready when subscribing for',
                          filter
                      )
                    : null,
            error: (err) => throwError(err),
            complete: () => {
                console.log(
                    'Web Socket connection ready - subscribing to:',
                    filter
                );
                setTimeout(() => {
                    // responseObs.next(from(['d', 'e', 'f']));
                    responseObs.next(
                        this.webSocketSubject.multiplex(
                            () => ({ subscribe: filter }),
                            () => ({ unsubscribe: filter }),
                            (message) => message[filter] !== undefined
                        )
                    );
                }, 10);
            },
        });
        return responseObs;
    }

    public connect(token?: string): void {
        if (!this.webSocketSubject || this.webSocketSubject.closed) {
            const config = {
                url: WEBSOCKET_PROXY,
                openObserver: {
                    next: () => {
                        console.log(
                            'Websocket connection to',
                            WEBSOCKET_PROXY,
                            'opened'
                        );
                    },
                },
                closeObserver: {
                    next: () => {
                        console.log(
                            'Websocket connection to ',
                            WEBSOCKET_PROXY,
                            'closed'
                        );
                        this.webSocketSubject = undefined;
                        // this.connect({ reconnect: true });
                    },
                },
            } as WebSocketSubjectConfig<unknown>;
            this.webSocketSubject = webSocket(config);
            // Send the OpenID Connect JWT token down in first message
            this.sendMessage({ idToken: token });
            // Always keep one subscribe open
            const testObs = this.webSocketSubject.multiplex(
                () => ({ subscribe: 'heartbeat' }),
                () => ({ unsubscribe: 'heartbeat' }),
                (message) => message.heartbeat !== undefined
            );
            this.permanentSub = testObs.subscribe(
                () => null, // No need to log websockets - use browser debugger
                (err) => throwError(err),
                () => console.log('Closed web socket subscription')
            );
            // With Firefox connected has always been set at this stage
            // with Chrome it has never been set
            if (this.connectedObservers.length > 0) {
                this.connectedObservers
                    .filter((co) => !co.closed)
                    .forEach((co) => {
                        co.next(true);
                        co.complete();
                    });
                this.connectedObservers = []; // Clear the list
            }
        }
    }

    private sendMessage(msg: unknown): void {
        this.webSocketSubject.next(msg);
    }

    close(): void {
        console.log('Closed Web Socket');
        if (this.permanentSub) {
            this.permanentSub.unsubscribe();
        }
        if (this.webSocketSubject) {
            this.webSocketSubject.complete();
        }
    }
}
