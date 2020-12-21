// GENERATED CODE -- DO NOT EDIT!
/* tslint:disable */
import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration, ApiConfigurationParams } from './api-configuration';

import { AetherV100TargetService } from './services/aether-v-100-target.service';
import { ApiService } from './services/api.service';
import { AetherV100TargetAccessProfileAccessProfileidService } from './services/aether-v-100-target-access-profile-access-profileid.service';
import { AetherV100TargetApnProfileApnProfileidService } from './services/aether-v-100-target-apn-profile-apn-profileid.service';
import { AetherV100TargetQosProfileQosProfileidService } from './services/aether-v-100-target-qos-profile-qos-profileid.service';
import { AetherV100TargetSubscriberUeueidService } from './services/aether-v-100-target-subscriber-ueueid.service';
import { AetherV100TargetSubscriberUeueidProfilesAccessProfileaccessProfileService } from './services/aether-v-100-target-subscriber-ueueid-profiles-access-profileaccess-profile.service';
import { AetherV100TargetUpProfileUpProfileidService } from './services/aether-v-100-target-up-profile-up-profileid.service';

/**
 * Module that provides all services and configuration.
 */
@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    AetherV100TargetService,
    ApiService,
    AetherV100TargetAccessProfileAccessProfileidService,
    AetherV100TargetApnProfileApnProfileidService,
    AetherV100TargetQosProfileQosProfileidService,
    AetherV100TargetSubscriberUeueidService,
    AetherV100TargetSubscriberUeueidProfilesAccessProfileaccessProfileService,
    AetherV100TargetUpProfileUpProfileidService,
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
      throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
    }
    if (!http) {
      throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
      'See also https://github.com/angular/angular/issues/20575');
    }
  }
}
