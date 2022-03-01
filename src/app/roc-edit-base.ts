/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BasketService, REQDATTRIBS } from './basket.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AETHER_TARGET } from '../environments/environment';
import { RocElement } from '../openapi3/top/level/models/elements';
import { Service as AetherService } from '../openapi3/aether/2.0.0/services';

export interface EnterpriseID {
    enterpriseId: string;
    displayName: string;
    sites: SiteID[];
}

export interface SiteID {
    siteID: string;
    displayName: string;
}

export abstract class RocEditBase {
    protected form: FormGroup;
    public isNewInstance: boolean; // For tests
    protected loadFunc: (target: string, id: string) => void;
    protected initFunc: () => string;
    public showParentDisplay = false;
    protected fullPath: string;
    public enterprises = new Array<EnterpriseID>();
    public newEnterpriseId: string;
    public newSiteId: string;

    protected constructor(
        protected snackBar: MatSnackBar,
        protected bs: BasketService,
        protected route: ActivatedRoute,
        protected router: Router,
        protected pathRoot: RocElement,
        protected pathListAttr: string,
        protected idAttr: string = 'id',
        protected aetherService?: AetherService
    ) {}

    init(): void {
        this.route.paramMap.subscribe((value) => {
            this.fullPath = this.calcFullPath(value);
            console.log('Full path', this.fullPath);
            if (value.get('id') === 'newinstance') {
                this.isNewInstance = true;
                if (value.keys.length > 1) {
                    this.loadEnterprises();
                }
            } else {
                this.loadFunc(this.target, value.get('id'));
            }
        });
    }

    onSubmit(): void {
        if (this.newEnterpriseId == undefined || !this.newEnterpriseId) {
            this.snackBar.open('Enterprise must be set', undefined, {
                duration: 5000,
                politeness: 'assertive',
            });
            return;
        }
        if (this.newSiteId == undefined || !this.newSiteId) {
            this.snackBar.open('Site must be set', undefined, {
                duration: 5000,
                politeness: 'assertive',
            });
            return;
        }
        console.log('Submitted!', this.form.getRawValue());
        const submitId = this.form.get(this.idAttr).value as unknown as string;
        console.log(this.fullPath, this.newEnterpriseId, this.newSiteId);
        if (this.fullPath.includes('unknownent')) {
            this.fullPath = this.fullPath.replace(
                'unknownent',
                this.newEnterpriseId
            );
        }
        if (this.fullPath.includes('unknownsite')) {
            this.fullPath = this.fullPath.replace(
                'unknownsite',
                this.newSiteId
            );
        }
        if (this.fullPath.includes('newinstance')) {
            this.fullPath = this.fullPath.replace(
                'newinstance',
                this.form.get(this.idAttr).value
            );
        }
        console.log('Updated', this.fullPath);
        if (submitId !== '' && submitId !== undefined) {
            this.bs.logKeyValuePairs(this.form, this.fullPath);
            this.snackBar.open('Added to basket', undefined, {
                duration: 2000,
                politeness: 'polite',
            });
        } else {
            this.snackBar.open('ID must be set', undefined, {
                duration: 5000,
                politeness: 'assertive',
            });
        }
    }

    get id(): string {
        return '??????????????????????????????/';
    }

    get target(): string {
        return AETHER_TARGET;
    }

    public get isNew(): boolean {
        return this.isNewInstance;
    }

    closeShowParentCard(): void {
        this.showParentDisplay = false;
    }

    private calcFullPath(paramMap: ParamMap): string {
        let fullPath = this.pathRoot;
        if (paramMap.has('enterprise-id')) {
            fullPath +=
                '/enterprise[enterprise-id=' +
                paramMap.get('enterprise-id') +
                ']';
        }
        if (paramMap.has('site-id')) {
            fullPath += '/site[site-id=' + paramMap.get('site-id') + ']';
        }
        fullPath +=
            '/' +
            this.pathListAttr +
            '[' +
            this.idAttr +
            '=' +
            paramMap.get('id') +
            ']';
        return fullPath;
    }

    loadEnterprises(): void {
        this.aetherService
            .getEnterprises({ target: AETHER_TARGET })
            .subscribe((es) => {
                es.enterprise.forEach((e) => {
                    const entID = {
                        enterpriseId: e['enterprise-id'],
                        displayName: e['display-name'],
                        sites: new Array<SiteID>(),
                    } as EnterpriseID;
                    e.site.forEach((s) =>
                        entID.sites.push({
                            siteID: s['site-id'],
                            displayName: s['display-name'],
                        })
                    );

                    this.enterprises.push(entID);
                });
            });
    }

    public sitesOfEnterprise(entID: string): SiteID[] {
        if (this.enterprises.length && entID !== undefined) {
            return this.enterprises.find((e) => e.enterpriseId === entID).sites;
        }
    }

    protected ucmap(): Map<string, string> {
        const ucMap = new Map<string, string>();
        const sliceId = '/' + this.fullPath;
        let parentUc = localStorage.getItem(sliceId);
        if (parentUc === null) {
            parentUc = this.form[REQDATTRIBS];
        }
        ucMap.set(sliceId, parentUc);
        return ucMap;
    }
}
