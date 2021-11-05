/*
 * SPDX-FileCopyrightText: 2020-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */

import {Injectable} from '@angular/core'
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http'
import {Observable} from 'rxjs'
import {tap} from 'rxjs/operators'
import {ID_TOKEN_ATTR} from './aether.component'

const TOKEN_HEADER_KEY = 'Authorization'
const BEARER_KEYWORD = 'Bearer '

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>,
              next: HttpHandler): Observable<HttpEvent<any>> {
        const idToken = localStorage.getItem(ID_TOKEN_ATTR)
        if (idToken) {
            const cloned = req.clone({
                headers: req.headers.set(TOKEN_HEADER_KEY,
                    BEARER_KEYWORD + idToken)
            })
            console.log('Interceptor', cloned)

            return next.handle(cloned).pipe(
                tap(x => x, err => {
                    // Handle this err
                    console.error(`Error performing request, status code = ${err.status}`)
                })
            )
        } else {
            return next.handle(req)
        }
    }
}
