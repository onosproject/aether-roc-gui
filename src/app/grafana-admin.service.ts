/*
 * SPDX-FileCopyrightText: 2020-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */

import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Grafana} from './k8sclient.service';
import {catchError, mergeMap, pluck} from 'rxjs/operators';
import {of, Observable, from} from 'rxjs';
import {IdTokClaims} from './aether.component';

const orgsResource = '/api/orgs';
const orgsUserResource = '/api/org/users';
const userResource = '/api/users/lookup';
const usingResource = '/api/user/using';
const apiKeyResource = '/api/auth/keys';

export interface GrafanaOrg {
    id: number;
    name: string;
}

export interface GrafanaUser {
    id: number;
    email: string;
    name: string;
    login: string;
    orgId: number;
    orgName: string;
}

@Injectable({
    providedIn: 'root'
})
export class GrafanaAdminService {
    basicAuth: string;

    constructor(
        private http: HttpClient,
        @Inject('grafana_api_proxy') private grafanaApiUrl: string,
    ) {
    }

    setBasicAuth(grafanaAdmin: Grafana): void {
        const adminU = atob(grafanaAdmin['admin-user']);
        const adminP = atob(grafanaAdmin['admin-password']);
        this.basicAuth = btoa(adminU + ':' + adminP);
    }

    getUserOrgDetails(idTokClaims: IdTokClaims): void {
        const fullUrl = this.grafanaApiUrl + userResource;
        const hdrs = new HttpHeaders({Authorization: 'Basic ' + this.basicAuth});
        const reqparams = new HttpParams()
            .set('loginOrEmail', idTokClaims.email);
        this.http.get<GrafanaUser>(fullUrl, {headers: hdrs, params: reqparams}).pipe(
            catchError((err) => {
                console.log('Error getting user', idTokClaims.email);
                const orgsUrl = this.grafanaApiUrl + orgsResource;
                this.http.get<GrafanaOrg[]>(orgsUrl, {headers: hdrs})
                    .pipe(
                        mergeMap((items: GrafanaOrg[]) => from(items))
                    )
                    .subscribe(
                    (org) => {
                        if (idTokClaims.groups.find((group) => org.name === group) !== undefined) {
                            console.log('Matched org', org.name, '(', org.id + ') to groups', idTokClaims.groups);
                            localStorage.setItem('orgID', String(org.id));
                            localStorage.setItem('orgName', org.name);
                            // // Need to add this user to the Grafana Org - first set current
                            // const usingUrl = this.grafanaApiUrl + usingResource + '/' + org.id;
                            // this.http.post(usingUrl, null, {headers: hdrs});
                            // // Then add the user
                            // const addUserBody = {role: 'Viewer', loginOrEmail: idTokClaims.email};
                            // this.http.post(orgsUserResource, addUserBody, {headers: hdrs}).pipe(
                            //     pluck('userId')
                            // );
                            return of({orgId: org.id, orgName: org.name, email: idTokClaims.email} as GrafanaUser);
                        }
                    }
                );
                return of({} as GrafanaUser);
            })
        ).subscribe(
            (user) => {
                if (user.orgId !== undefined) {
                    console.log('User details', user);
                    localStorage.setItem('orgID', String(user.orgId));
                    localStorage.setItem('orgName', user.orgName);
                }
            }
        );
    }

    getApiKey(orgID: number, keyname: string): void {
        const usingUrl = this.grafanaApiUrl + usingResource + '/' + orgID;
        const keysUrl = this.grafanaApiUrl + apiKeyResource;
        const hdrs = new HttpHeaders({Authorization: 'Basic ' + this.basicAuth});
        this.http.post(usingUrl, null, {headers: hdrs}).subscribe(
            (resp) => {
                const postBody = {
                    name: keyname,
                    role: 'Editor'
                };
                console.log('Requesting API Key for org ', orgID, 'as', keyname);
                this.http.post<string>(keysUrl, postBody, {headers: hdrs}).pipe(
                    pluck('key')
                ).subscribe(
                    (key) => {
                        console.log('API Key', key);
                        localStorage.setItem('GrafanaAPIKey', String(key));
                    },
                    (err) => console.warn('Unable to get API Key for Org', orgID, err)
                );
            },
            (err) => console.warn('unable to switch to Org', orgID, err)
        );
    }
}
