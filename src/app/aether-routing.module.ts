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
        path: 'subscribers',
        loadChildren: () =>  import('./aether-subscriber/aether-subscriber.module').then(m => m.AetherSubscriberModule)
    },
    {
        path: 'profiles',
        loadChildren: () =>  import('./aether-profiles/aether-profiles.module').then(m => m.AetherProfilesModule)
    },
    {
        path: 'rbac',
        loadChildren: () =>  import('./rbac/rbac.module').then(m => m.RbacModule)
    },
    {
        path: '',
        redirectTo: 'subscribers',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(aetherRoutes, {useHash: true})
    ],
    exports: [RouterModule],
    providers: []
})
export class AetherRoutingModule {
}
