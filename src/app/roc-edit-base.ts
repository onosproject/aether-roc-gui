/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BasketService, REQDATTRIBS } from './basket.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {
    GenericRocDataSource,
    RocGenericContainerType,
    RocGenericModelType,
} from './roc-data-source';
import { TargetName } from '../openapi3/top/level/models';
import { EnterpriseService } from './enterprise.service';
import { SiteService } from '../openapi3/aether/2.1.0/services/site.service';
import { mergeMap } from 'rxjs/operators';
import { from } from 'rxjs';
import { MatOptionSelectionChange } from '@angular/material/core';
import { SiteList } from '../openapi3/aether/2.1.0/models/site-list';

export interface SiteID {
    siteID: string;
    displayName: string;
}

export abstract class RocEditBase<
    T extends GenericRocDataSource<RocGenericModelType, RocGenericContainerType>
> {
    protected form: FormGroup;
    public isNewInstance: boolean; // For tests
    protected loadFunc: (id: string) => void;
    protected initFunc: () => string;
    public showParentDisplay = false;
    protected fullPath: string;
    public enterpriseId: TargetName;
    public sites: SiteID[] = [];
    public siteId: string;
    public unknownEnterprise = 'unknownent';
    public unknownSite = 'unknownsite';
    public datasource: T;

    /**
     * @param snackBar The MatSnackBar service
     * @param bs The BasketService
     * @param enterpriseService EnterpriseService
     * @param route The current route
     * @param ds A class that extends RocDataSource
     * @param modelPath The path for this model in the Yang tree
     */
    protected constructor(
        protected snackBar: MatSnackBar,
        protected bs: BasketService,
        protected enterpriseService: EnterpriseService,
        protected siteService: SiteService,
        protected route: ActivatedRoute,
        public ds: T,
        public modelPath: string[]
    ) {
        this.datasource = ds;
    }

    init(): void {
        this.route.paramMap.subscribe((value) => {
            this.loadIds(value);
            if (value.get('id') === 'newinstance') {
                this.isNewInstance = true;
            } else {
                this.loadFunc(value.get('id'));
            }
            this.fullPath = this.calcFullPath(value);
            console.log('Full path', this.fullPath);
        });
    }

    loadIds(params: ParamMap): void {
        this.siteId = params.get('site-id');
        this.enterpriseId = {
            name: params.get('enterprise-id'),
        } as TargetName;
        console.log(
            `Populated component with {enterpriseId: ${this.enterpriseId.name}, siteId: ${this.siteId}}`
        );
    }

    onSubmit(): void {
        console.log('Submitted!', this.form.getRawValue());
        const idAttr = this.modelPath[this.modelPath.length - 1];
        const submitId = this.form.get(idAttr).value as unknown as string;
        console.log(this.fullPath, this.enterpriseId, this.siteId);
        if (this.fullPath.includes(this.unknownEnterprise)) {
            this.fullPath = this.fullPath.replace(
                this.unknownEnterprise,
                this.enterpriseId.name
            );
        }
        if (this.fullPath.includes(this.unknownSite)) {
            this.fullPath = this.fullPath.replace(
                this.unknownSite,
                this.siteId
            );
        }
        if (this.fullPath.includes('newinstance')) {
            this.fullPath = this.fullPath.replace(
                'newinstance',
                this.form.get(idAttr).value
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

    public get isNew(): boolean {
        return this.isNewInstance;
    }

    closeShowParentCard(): void {
        this.showParentDisplay = false;
    }

    // TODO this needs to be built out of modelPath, don't base it on the URL params,
    // just read them
    public calcFullPath(paramMap: ParamMap): string {
        // set the base for the full path
        let fullPath = paramMap.get('enterprise-id');

        if (paramMap.has('site-id')) {
            fullPath += `/${this.modelPath[0]}[site-id=${paramMap.get(
                'site-id'
            )}]`;
        } else if (paramMap.has('application-id')) {
            fullPath += `/${this.modelPath[0]}[application-id=${paramMap.get(
                'application-id'
            )}]`;
        } else if (paramMap.has('template-id')) {
            fullPath += `/${this.modelPath[0]}[template-id=${paramMap.get(
                'template-id'
            )}]`;
        } else if (paramMap.has('traffic-class-id')) {
            fullPath += `/${this.modelPath[0]}[traffic-class-id=${paramMap.get(
                'traffic-class-id'
            )}]`;
        }

        const idAttr = this.modelPath[this.modelPath.length - 1];
        const modelName = this.modelPath[this.modelPath.length - 2];

        fullPath += `/${modelName}[${idAttr}=${paramMap.get('id')}]`;
        return fullPath;
    }

    public sitesOfEnterprise(optChange: MatOptionSelectionChange): void {
        if (!optChange.isUserInput) {
            return;
        }
        this.sites = [];
        this.siteService
            .getSiteList({
                'enterprise-id': optChange.source.value['name'],
            })
            .pipe(mergeMap((siteList: SiteList) => from(siteList)))
            .subscribe((site) => {
                this.sites.push({
                    siteID: site['site-id'],
                    displayName: site['display-name'],
                } as SiteID);
            });
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
