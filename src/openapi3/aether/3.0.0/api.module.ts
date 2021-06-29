/* tslint:disable */
/* eslint-disable */
import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration, ApiConfigurationParams } from './api-configuration';

import { Service } from './services/service';
import { ApiService } from './services/api.service';
import { ApListApListService } from './services/ap-list-ap-list.service';
import { ApListApListAccessPointsService } from './services/ap-list-ap-list-access-points.service';
import { ApplicationApplicationService } from './services/application-application.service';
import { ApplicationApplicationEndpointService } from './services/application-application-endpoint.service';
import { ConnectivityServiceConnectivityServiceService } from './services/connectivity-service-connectivity-service.service';
import { DeviceGroupDeviceGroupService } from './services/device-group-device-group.service';
import { DeviceGroupDeviceGroupImsisService } from './services/device-group-device-group-imsis.service';
import { EnterpriseEnterpriseService } from './services/enterprise-enterprise.service';
import { EnterpriseEnterpriseConnectivityServiceService } from './services/enterprise-enterprise-connectivity-service.service';
import { IpDomainIpDomainService } from './services/ip-domain-ip-domain.service';
import { NetworkNetworkService } from './services/network-network.service';
import { SiteSiteService } from './services/site-site.service';
import { TemplateTemplateService } from './services/template-template.service';
import { TrafficClassTrafficClassService } from './services/traffic-class-traffic-class.service';
import { UpfUpfService } from './services/upf-upf.service';
import { VcsVcsService } from './services/vcs-vcs.service';
import { VcsVcsApplicationService } from './services/vcs-vcs-application.service';
import { VcsVcsDeviceGroupService } from './services/vcs-vcs-device-group.service';

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
    ApListApListService,
    ApListApListAccessPointsService,
    ApplicationApplicationService,
    ApplicationApplicationEndpointService,
    ConnectivityServiceConnectivityServiceService,
    DeviceGroupDeviceGroupService,
    DeviceGroupDeviceGroupImsisService,
    EnterpriseEnterpriseService,
    EnterpriseEnterpriseConnectivityServiceService,
    IpDomainIpDomainService,
    NetworkNetworkService,
    SiteSiteService,
    TemplateTemplateService,
    TrafficClassTrafficClassService,
    UpfUpfService,
    VcsVcsService,
    VcsVcsApplicationService,
    VcsVcsDeviceGroupService,
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
