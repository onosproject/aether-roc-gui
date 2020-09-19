/*
 * SPDX-FileCopyrightText: 2020-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */

import {Injectable} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

const TOKEN_HEADER_KEY = 'Authorization';
const BEARER_KEYWORD = 'Bearer';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>,
              next: HttpHandler): Observable<HttpEvent<any>> {

        const idToken = localStorage.getItem('id_token');

        if (idToken) {
            const cloned = req.clone({
                headers: req.headers.set(TOKEN_HEADER_KEY,
                    BEARER_KEYWORD + idToken)
            });

            return next.handle(cloned).pipe(
                tap(x => x, err => {
                    // Handle this err
                    console.error(`Error performing request, status code = ${err.status}`);
                })
            );
        } else {
            return next.handle(req);
        }
    }
}
