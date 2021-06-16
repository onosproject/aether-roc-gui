/*
 * SPDX-FileCopyrightText: 2020-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

/**
 * The set of Routes in the application - can be chosen from nav menu or
 * elsewhere like tabular icon for flows etc
 */
const aetherRoutes: Routes = [
    {
        path: 'enterprise',
        loadChildren: () => import('./aether-enterprise/aether-enterprise.module').then(m => m.AetherEnterpriseModule)
    },
    {
        path: 'ipdomain',
        loadChildren: () => import('./aether-ip-domain/aether-ip-domain.module').then(m => m.AetherIpDomainModule)
    },
    {
        path: 'connectivity',
        loadChildren: () => import('./aether-connectivity-service/aether-connectivity-service.module')
            .then(m => m.AetherConnectivityServiceModule)
    },
    {
        path: 'aplist',
        loadChildren: () => import('./aether-ap-list/aether-ap-list.module')
            .then(m => m.AetherApListModule)
    },
    {
        path: 'basket',
        loadChildren: () => import('./basket/basket.module').then(m => m.BasketModule)
    },
    {
        path: 'network',
        loadChildren: () => import('./aether-network/aether-network.module').then(m => m.AetherNetworkModule)
    },
    {
        path: 'devicegroups',
        loadChildren: () => import('./aether-device-group/aether-device-group.module').then(m => m.AetherDeviceGroupModule)
    },
    {
        path: 'site',
        loadChildren: () => import('./aether-site/aether-site.module').then(m => m.AetherSiteModule)
    },
    {
        path: 'template',
        loadChildren: () => import('./aether-template/aether-template.module').then(m => m.AetherTemplateModule)
    },
    {
        path: 'upf',
        loadChildren: () => import('./aether-upf/aether-upf.module').then(m => m.AetherUpfModule)
    },
    {
        path: 'vcs',
        loadChildren: () => import('./aether-vcs/aether-vcs.module').then(m => m.AetherVcsModule)
    },
    {
        path: 'application',
        loadChildren: () => import('./aether-application/aether-application.module').then(m => m.AetherApplicationModule)
    },
    {
        path: '',
        redirectTo: 'vcs', // TODO change to dashboard once it has been added
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(aetherRoutes, {useHash: true, onSameUrlNavigation: 'reload'})
    ],
    exports: [RouterModule],
    providers: []
})
export class AetherRoutingModule {
}
