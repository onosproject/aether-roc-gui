/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */

import {Component, OnInit} from '@angular/core'
import {RocMonitorBase} from '../../roc-monitor-base'
import {
    DeviceGroupDeviceGroupService,
    SiteSiteService,
    IpDomainIpDomainService
} from '../../../openapi3/aether/4.0.0/services'
import {ActivatedRoute, Router} from '@angular/router'
import {HttpClient} from '@angular/common/http'
import {OAuthService} from 'angular-oauth2-oidc'
import {AETHER_TARGETS} from '../../../environments/environment'
import {IdTokClaims} from '../../idtoken'
import {DeviceGroupDeviceGroup, SiteSite, IpDomainIpDomain} from '../../../openapi3/aether/4.0.0/models'

@Component({
    selector: 'aether-device-group-monitor',
    templateUrl: './device-group-monitor.component.html',
    styleUrls: ['../../common-profiles.component.scss']
})
export class DeviceGroupMonitorComponent extends RocMonitorBase implements OnInit {
    grafanaOrgId: number = 1;
    grafanaOrgName: string;
    thisDg: DeviceGroupDeviceGroup;
    site: SiteSite;
    ipDomain: IpDomainIpDomain;
    selectedUeId: number;

    constructor(
        protected dgService: DeviceGroupDeviceGroupService,
        protected siteService: SiteSiteService,
        protected ipDomainService: IpDomainIpDomainService,
        protected route: ActivatedRoute,
        protected router: Router,
        private httpClient: HttpClient,
        private oauthService: OAuthService,
    ) {
        super(route, router)
    }

    ngOnInit(): void {
        super.init()
        this.getChildrenOfDg(this.id)
        if (this.oauthService.hasValidIdToken()) { // TODO move this to base class
            const claims = this.oauthService.getIdentityClaims() as IdTokClaims
            // TODO: enhance this - it takes the last group, having all lower case as the Grafana Org.
            this.grafanaOrgName = claims.groups.find((g) => g === g.toLowerCase())
        }
    }

    private getChildrenOfDg(dgID: string): void {
        this.dgService.getDeviceGroupDeviceGroup({target: AETHER_TARGETS[0], id: dgID}).subscribe(
            (value) => {
                this.thisDg = value
                this.getSite(value.site)
                this.getIpDomain(value['ip-domain'])
            },
            err => console.warn('Error getting DG', dgID, err)
        )
    }

    private getSite(siteID: string): void {
        this.siteService.getSiteSite({target: AETHER_TARGETS[0], id: siteID}).subscribe(
            (value: SiteSite) => this.site = value,
            err => console.warn('Error loading site', siteID, err)
        )
    }

    private getIpDomain(ipDomainID: string): void {
        this.ipDomainService.getIpDomainIpDomain({target: AETHER_TARGETS[0], id: ipDomainID}).subscribe(
            (value: IpDomainIpDomain) => this.ipDomain = value,
            err => console.warn('Error loading IPDomain', ipDomainID, err)
        )
    }

}
