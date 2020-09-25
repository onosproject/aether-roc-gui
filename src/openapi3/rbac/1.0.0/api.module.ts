// GENERATED CODE -- DO NOT EDIT!
/* tslint:disable */
import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration, ApiConfigurationParams } from './api-configuration';

import { RbacV100TargetService } from './services/rbac-v-100-target.service';
import { ApiService } from './services/api.service';
import { RbacV100TargetRbacService } from './services/rbac-v-100-target-rbac.service';
import { RbacV100TargetRbacGroupService } from './services/rbac-v-100-target-rbac-group.service';
import { RbacV100TargetRbacRoleService } from './services/rbac-v-100-target-rbac-role.service';

/**
 * Module that provides all services and configuration.
 */
@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    RbacV100TargetService,
    ApiService,
    RbacV100TargetRbacService,
    RbacV100TargetRbacGroupService,
    RbacV100TargetRbacRoleService,
    ApiConfiguration
  ],
})
export class ApiModule {
  static forRoot(params: ApiConfigurationParams): ModuleWithProviders<ApiModule> {
    return {
      ngModule: ApiModule,
      providers: [
        {
          provide: ApiConfiguration,
          useValue: params
        }
      ]
    }
  }

  constructor(
    @Optional() @SkipSelf() parentModule: ApiModule,
    @Optional() http: HttpClient
  ) {
    if (parentModule) {
      throw new Error('ApiModule is already loaded. Import in your base AetherModule only.');
    }
    if (!http) {
      throw new Error('You need to import the HttpClientModule in your AetherModule! \n' +
      'See also https://github.com/angular/angular/issues/20575');
    }
  }
}
