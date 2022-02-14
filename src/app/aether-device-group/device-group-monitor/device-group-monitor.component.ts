/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, OnInit } from '@angular/core';
import { RocMonitorBase } from '../../roc-monitor-base';
import {
    EnterprisesEnterpriseSiteDeviceGroupService,
    EnterprisesEnterpriseSiteService,
    EnterprisesEnterpriseSiteIpDomainService,
} from '../../../openapi3/aether/2.0.0/services';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { OAuthService } from 'angular-oauth2-oidc';
import { AETHER_TARGETS } from '../../../environments/environment';
import { IdTokClaims } from '../../idtoken';
import {
    EnterprisesEnterpriseSiteDeviceGroup,
    EnterprisesEnterpriseSite,
    EnterprisesEnterpriseSiteIpDomain,
} from '../../../openapi3/aether/2.0.0/models';

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
    thisDg: EnterprisesEnterpriseSiteDeviceGroup;
    site: EnterprisesEnterpriseSite;
    ipDomain: EnterprisesEnterpriseSiteIpDomain;
    selectedUeId: number;

    constructor(
        protected dgService: EnterprisesEnterpriseSiteDeviceGroupService,
        protected siteService: EnterprisesEnterpriseSiteService,
        protected ipDomainService: EnterprisesEnterpriseSiteIpDomainService,
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
            .getEnterprisesEnterpriseSiteDeviceGroup({
                target: AETHER_TARGETS[0],
                'enterprise-id': '????????',
                'site-id': '????????',
                'device-group-id': dgID,
            })
            .subscribe(
                (value) => {
                    this.thisDg = value;
                    this.getEnterprisesEnterpriseSiteIpDomain(
                        value['ip-domain']
                    );
                },
                (err) => console.warn('Error getting DG', dgID, err)
            );
    }

    private getSite(siteID: string): void {
        this.siteService
            .getEnterprisesEnterpriseSite({
                target: AETHER_TARGETS[0],
                'enterprise-id': '?????????',
                'site-id': siteID,
            })
            .subscribe(
                (value: EnterprisesEnterpriseSite) => (this.site = value),
                (err) => console.warn('Error loading site', siteID, err)
            );
    }

    private getEnterprisesEnterpriseSiteIpDomain(ipDomainID: string): void {
        this.ipDomainService
            .getEnterprisesEnterpriseSiteIpDomain({
                target: AETHER_TARGETS[0],
                'enterprise-id': '???????',
                'site-id': '???????',
                'ip-domain-id': ipDomainID,
            })
            .subscribe(
                (value: EnterprisesEnterpriseSiteIpDomain) =>
                    (this.ipDomain = value),
                (err) => console.warn('Error loading IPDomain', ipDomainID, err)
            );
    }
}
