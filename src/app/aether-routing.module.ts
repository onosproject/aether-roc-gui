/*
 * SPDX-FileCopyrightText: 2020-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/**
 * The set of Routes in the application - can be chosen from nav menu or
 * elsewhere like tabular icon for flows etc
 */
const aetherRoutes: Routes = [
    {
        path: 'dashboard',
        loadChildren: () =>
            import('./dashboard/dashboard.module').then(
                (m) => m.DashboardModule
            ),
    },
    {
        path: 'enterprise',
        loadChildren: () =>
            import('./aether-enterprise/aether-enterprise.module').then(
                (m) => m.AetherEnterpriseModule
            ),
    },
    {
        path: 'ipdomain',
        loadChildren: () =>
            import('./aether-ip-domain/aether-ip-domain.module').then(
                (m) => m.AetherIpDomainModule
            ),
    },
    {
        path: 'connectivity',
        loadChildren: () =>
            import(
                './aether-connectivity-service/aether-connectivity-service.module'
            ).then((m) => m.AetherConnectivityServiceModule),
    },
    {
        path: 'basket',
        loadChildren: () =>
            import('./basket/basket.module').then((m) => m.BasketModule),
    },
    {
        path: 'devicegroups',
        loadChildren: () =>
            import('./aether-device-group/aether-device-group.module').then(
                (m) => m.AetherDeviceGroupModule
            ),
    },
    {
        path: 'site',
        loadChildren: () =>
            import('./aether-site/aether-site.module').then(
                (m) => m.AetherSiteModule
            ),
    },
    {
        path: 'template',
        loadChildren: () =>
            import('./aether-template/aether-template.module').then(
                (m) => m.AetherTemplateModule
            ),
    },
    {
        path: 'upf',
        loadChildren: () =>
            import('./aether-upf/aether-upf.module').then(
                (m) => m.AetherUpfModule
            ),
    },
    {
        path: 'vcs',
        loadChildren: () =>
            import('./aether-slice/aether-slice.module').then(
                (m) => m.AetherSliceModule
            ),
    },
    {
        path: 'application',
        loadChildren: () =>
            import('./aether-application/aether-application.module').then(
                (m) => m.AetherApplicationModule
            ),
    },
    {
        path: 'traffic-class',
        loadChildren: () =>
            import('./aether-traffic-class/traffic-class.module').then(
                (m) => m.TrafficClassModule
            ),
    },
    {
        path: 'diagnostics',
        loadChildren: () =>
            import('./diagnostics/diagnostics.module').then(
                (m) => m.DiagnosticsModule
            ),
    },
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(aetherRoutes, {
            useHash: true,
            onSameUrlNavigation: 'reload',
            relativeLinkResolution: 'legacy',
        }),
    ],
    exports: [RouterModule],
    providers: [],
})
export class AetherRoutingModule {}
