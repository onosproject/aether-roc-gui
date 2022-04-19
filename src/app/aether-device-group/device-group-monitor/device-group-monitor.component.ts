/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, OnInit } from '@angular/core';
import { RocMonitorBase } from '../../roc-monitor-base';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { OAuthService } from 'angular-oauth2-oidc';
import { IdTokClaims } from '../../idtoken';
import {
    SiteIpDomain,
    Site,
    SiteDeviceGroup,
} from '../../../openapi3/aether/2.1.0/models';
import {
    SiteDeviceGroupService,
    SiteService,
    SiteIpDomainService,
} from '../../../openapi3/aether/2.1.0/services';

@Component({
    selector: 'aether-device-group-monitor',
    templateUrl: './device-group-monitor.component.html',
    styleUrls: ['../../common-profiles.component.scss'],
})
export class DeviceGroupMonitorComponent
    extends RocMonitorBase
    implements OnInit
{
    grafanaOrgId = 1;
    grafanaOrgName: string;
    thisDg: SiteDeviceGroup;
    site: Site;
    ipDomain: SiteIpDomain;
    selectedUeId: string;

    constructor(
        protected dgService: SiteDeviceGroupService,
        protected siteService: SiteService,
        protected ipDomainService: SiteIpDomainService,
        protected route: ActivatedRoute,
        protected router: Router,
        private httpClient: HttpClient,
        private oauthService: OAuthService
    ) {
        super(route, router);
    }

    ngOnInit(): void {
        super.init();
        this.getChildrenOfDg(this.id);
        if (this.oauthService.hasValidIdToken()) {
            // TODO move this to base class
            const claims = this.oauthService.getIdentityClaims() as IdTokClaims;
            // TODO: enhance this - it takes the last group, having all lower case as the Grafana Org.
            this.grafanaOrgName = claims.groups.find(
                (g) => g === g.toLowerCase()
            );
        }
    }

    private getChildrenOfDg(dgID: string): void {
        this.dgService
            .getSiteDeviceGroup({
                'enterprise-id': this.route.snapshot.params['enterprise-id'],
                'site-id': this.route.snapshot.params['site-id'],
                'device-group-id': dgID,
            })
            .subscribe(
                (value) => {
                    this.thisDg = value;
                    this.getSiteIpDomain(value['ip-domain']);
                },
                (err) => console.warn('Error getting DG', dgID, err)
            );
    }

    private getSite(siteID: string): void {
        this.siteService
            .getSite({
                'enterprise-id': this.route.snapshot.params['enterprise-id'],
                'site-id': siteID,
            })
            .subscribe(
                (value: Site) => (this.site = value),
                (err) => console.warn('Error loading site', siteID, err)
            );
    }

    private getSiteIpDomain(ipDomainID: string): void {
        this.ipDomainService
            .getSiteIpDomain({
                'enterprise-id': this.route.snapshot.params['enterprise-id'],
                'site-id': this.route.snapshot.params['site-id'],
                'ip-domain-id': ipDomainID,
            })
            .subscribe(
                (value: SiteIpDomain) => (this.ipDomain = value),
                (err) => console.warn('Error loading IPDomain', ipDomainID, err)
            );
    }
}
