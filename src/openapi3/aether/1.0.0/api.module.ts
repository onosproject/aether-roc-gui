// GENERATED CODE -- DO NOT EDIT!
/* tslint:disable */
import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration, ApiConfigurationParams } from './api-configuration';

import { AetherV100TargetService } from './services/aether-v-100-target.service';
import { ApiService } from './services/api.service';
import { AetherV100TargetAccessProfileService } from './services/aether-v-100-target-access-profile.service';
import { AetherV100TargetApnProfileService } from './services/aether-v-100-target-apn-profile.service';
import { AetherV100TargetQosProfileService } from './services/aether-v-100-target-qos-profile.service';
import { AetherV100TargetQosProfileQosProfileService } from './services/aether-v-100-target-qos-profile-qos-profile.service';
import { AetherV100TargetSubscriberService } from './services/aether-v-100-target-subscriber.service';
import { AetherV100TargetSubscriberUeService } from './services/aether-v-100-target-subscriber-ue.service';
import { AetherV100TargetSubscriberUeProfilesService } from './services/aether-v-100-target-subscriber-ue-profiles.service';
import { AetherV100TargetUpProfileService } from './services/aether-v-100-target-up-profile.service';

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
    AetherV100TargetAccessProfileService,
    AetherV100TargetApnProfileService,
    AetherV100TargetQosProfileService,
    AetherV100TargetQosProfileQosProfileService,
    AetherV100TargetSubscriberService,
    AetherV100TargetSubscriberUeService,
    AetherV100TargetSubscriberUeProfilesService,
    AetherV100TargetUpProfileService,
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
