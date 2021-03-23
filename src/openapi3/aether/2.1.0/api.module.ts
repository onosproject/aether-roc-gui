// GENERATED CODE -- DO NOT EDIT!
/* tslint:disable */
/* eslint-disable */
import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration, ApiConfigurationParams } from './api-configuration';

import { Service } from './services/service';
import { ApiService } from './services/api.service';
import { AccessProfileAccessProfileService } from './services/access-profile-access-profile.service';
import { ApnProfileApnProfileService } from './services/apn-profile-apn-profile.service';
import { ConnectivityServiceConnectivityServiceService } from './services/connectivity-service-connectivity-service.service';
import { EnterpriseEnterpriseService } from './services/enterprise-enterprise.service';
import { EnterpriseEnterpriseConnectivityServiceService } from './services/enterprise-enterprise-connectivity-service.service';
import { QosProfileQosProfileService } from './services/qos-profile-qos-profile.service';
import { SecurityProfileSecurityProfileService } from './services/security-profile-security-profile.service';
import { ServiceGroupServiceGroupService } from './services/service-group-service-group.service';
import { ServiceGroupServiceGroupServicePoliciesService } from './services/service-group-service-group-service-policies.service';
import { ServicePolicyServicePolicyService } from './services/service-policy-service-policy.service';
import { ServicePolicyServicePolicyRulesService } from './services/service-policy-service-policy-rules.service';
import { ServiceRuleServiceRuleService } from './services/service-rule-service-rule.service';
import { ServiceRuleServiceRuleQosService } from './services/service-rule-service-rule-qos.service';
import { SubscriberUeService } from './services/subscriber-ue.service';
import { SubscriberUeProfilesAccessProfileService } from './services/subscriber-ue-profiles-access-profile.service';
import { UpProfileUpProfileService } from './services/up-profile-up-profile.service';

/**
 * Module that provides all services and configuration.
 */
@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    Service,
    ApiService,
    AccessProfileAccessProfileService,
    ApnProfileApnProfileService,
    ConnectivityServiceConnectivityServiceService,
    EnterpriseEnterpriseService,
    EnterpriseEnterpriseConnectivityServiceService,
    QosProfileQosProfileService,
    SecurityProfileSecurityProfileService,
    ServiceGroupServiceGroupService,
    ServiceGroupServiceGroupServicePoliciesService,
    ServicePolicyServicePolicyService,
    ServicePolicyServicePolicyRulesService,
    ServiceRuleServiceRuleService,
    ServiceRuleServiceRuleQosService,
    SubscriberUeService,
    SubscriberUeProfilesAccessProfileService,
    UpProfileUpProfileService,
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
