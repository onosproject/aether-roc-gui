/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {AfterViewInit, Component, Inject, OnInit} from '@angular/core';
import {RocMonitorBase} from '../../roc-monitor-base';
import {ActivatedRoute, Router} from '@angular/router';
import {Service as AetherService} from '../../../openapi3/aether/3.0.0/services';
import {AETHER_TARGETS} from '../../../environments/environment';
import {filter, mergeMap, pluck} from 'rxjs/operators';
import {DeviceGroupDeviceGroup, VcsVcs, VcsVcsDeviceGroup} from '../../../openapi3/aether/3.0.0/models';
import {from, Observable} from 'rxjs';
import {IdTokClaims} from '../../idtoken';
import {OAuthService} from 'angular-oauth2-oidc';

@Component({
    selector: 'aether-vcs-monitor',
    templateUrl: './vcs-monitor.component.html',
    styleUrls: ['../../common-profiles.component.scss']
})
export class VcsMonitorComponent extends RocMonitorBase implements OnInit, AfterViewInit {

    performancePanels: string[] = [];
    ueConnectivityPanels: string[] = [];
    deviceGroups: DeviceGroupDeviceGroup[];
    panelUrl: string;
    grafanaOrgId: number = 1;
    grafanaOrgName: string;

    constructor(
        protected aetherService: AetherService,
        protected route: ActivatedRoute,
        protected router: Router,
        private oauthService: OAuthService,
        @Inject('grafana_api_proxy') private grafanaUrl: string,
    ) {
        super(route, router);
        this.deviceGroups = new Array<DeviceGroupDeviceGroup>();
    }

    ngOnInit(): void {
        super.init();
        this.getDeviceGroupsOfVcs();
    }

    ngAfterViewInit(): void {
        if (this.oauthService.hasValidIdToken()) {
            const claims = this.oauthService.getIdentityClaims() as IdTokClaims;
            // TODO: enhance this - it takes the last group, having all lower case as the Grafana Org.
            this.grafanaOrgName = claims.groups.find((g) => g === g.toLowerCase());
            this.panelUrl = this.vcsPanelUrl(this.grafanaOrgId, this.grafanaOrgName, this.id);
        }
    }

    private getDeviceGroupsOfVcs(): void {
        this.aetherService.getVcs({target: AETHER_TARGETS[0]}).pipe(
            pluck('vcs'),
            mergeMap((items: VcsVcs[]) => from(items)),
            filter((vcs: VcsVcs) => vcs.id === this.id)
        ).subscribe(
            (vcs) => {
                console.log('Found VCS', vcs.id, 'Has device Groups', vcs['device-group']);
                const enabledDg = new Array<string>();
                vcs['device-group'].filter((dg: VcsVcsDeviceGroup) => dg.enable).forEach((dg) => {
                    enabledDg.push(dg['device-group']);
                });
                this.getDeviceGroupDetails(enabledDg).subscribe(
                    (dg) => this.deviceGroups.push(dg),
                    (err) => console.warn('Error getting device groups', enabledDg, err)
                );
            },
            (err) => console.warn('VCS', this.id, 'not found.', err)
        );
    }

    private getDeviceGroupDetails(deviceGroups: string[]): Observable<DeviceGroupDeviceGroup> {
        return this.aetherService.getDeviceGroup({target: AETHER_TARGETS[0]}).pipe(
            pluck('device-group'),
            mergeMap((items: DeviceGroupDeviceGroup[]) => from(items)),
            filter((dg: DeviceGroupDeviceGroup) => deviceGroups.includes(dg.id))
        );
    }

    vcsPanelUrl(orgId: number, orgName: string, vcsName: string): string {
        return this.grafanaUrl + '/d-solo/' + vcsName + '-ue-conn?orgId=' + orgId +
            '&theme=light&panelId=1';
    }

    range(start: number, end: number): number[] {
        if (start === undefined) {
            return undefined;
        }
        const len = end - start + 1;
        return Array(len).fill(start).map((x, y) => x + y);
    }

    imsiList(start: number, end: number): string {
        if (start === undefined) {
            return undefined;
        }
        return this.range(start, end).join(', ');
    }
}
