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
        path: 'ipdomain',
        loadChildren: () =>
            import('./aether-ip-domain/aether-ip-domain.module').then(
                (m) => m.AetherIpDomainModule
            ),
    },
    {
        path: 'basket',
        loadChildren: () =>
            import('./basket/basket.module').then((m) => m.BasketModule),
    },
    {
        path: 'device-group',
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
        path: 'small-cell',
        loadChildren: () =>
            import('./aether-small-cell/aether-small-cell.module').then(
                (m) => m.AetherSmallCellModule
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
        path: 'device',
        loadChildren: () =>
            import('./aether-device/aether-device.module').then(
                (m) => m.AetherDeviceModule
            ),
    },
    {
        path: 'sim-card',
        loadChildren: () =>
            import('./aether-sim-card/aether-sim-card.module').then(
                (m) => m.AetherSimCardModule
            ),
    },
    {
        path: 'slice',
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
        path: 'switch',
        loadChildren: () =>
            import('./fabric-switch/fabric-switch.module').then(
                (m) => m.FabricSwitchModule
            ),
    },
    {
        path: 'switch-model',
        loadChildren: () =>
            import('./fabric-switch-model/fabric-switch-model.module').then(
                (m) => m.FabricSwitchModelModule
            ),
    },
    {
        path: 'route',
        loadChildren: () =>
            import('./fabric-route/fabric-route.module').then(
                (m) => m.FabricRouteModule
            ),
    },
    {
        path: 'dhcp-server',
        loadChildren: () =>
            import('./fabric-dhcp-server/fabric-dhcp-server.module').then(
                (m) => m.FabricDhcpServerModule
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
