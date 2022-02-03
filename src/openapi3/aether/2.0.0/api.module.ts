// GENERATED CODE -- DO NOT EDIT!
/* tslint:disable */
/* eslint-disable */
import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration, ApiConfigurationParams } from './api-configuration';

import { Service } from './services/service';
import { ApiService } from './services/api.service';
import { ApplicationApplicationService } from './services/application-application.service';
import { ApplicationApplicationEndpointService } from './services/application-application-endpoint.service';
import { ConnectivityServiceConnectivityServiceService } from './services/connectivity-service-connectivity-service.service';
import { DeviceGroupDeviceGroupService } from './services/device-group-device-group.service';
import { DeviceGroupDeviceGroupDeviceService } from './services/device-group-device-group-device.service';
import { EnterpriseEnterpriseService } from './services/enterprise-enterprise.service';
import { EnterpriseEnterpriseConnectivityServiceService } from './services/enterprise-enterprise-connectivity-service.service';
import { IpDomainIpDomainService } from './services/ip-domain-ip-domain.service';
import { SiteSiteService } from './services/site-site.service';
import { SiteSiteMonitoringEdgeDeviceService } from './services/site-site-monitoring-edge-device.service';
import { SiteSiteSmallCellService } from './services/site-site-small-cell.service';
import { TemplateTemplateService } from './services/template-template.service';
import { TemplateTemplateSliceService } from './services/template-template-slice.service';
import { TrafficClassTrafficClassService } from './services/traffic-class-traffic-class.service';
import { UpfUpfService } from './services/upf-upf.service';
import {SliceSliceService} from "./services/slice-slice.service";
import {SliceSliceDeviceGroupService} from "./services/slice-slice-device-group.service";
import {SliceSliceFilterService} from "./services/slice-slice-filter.service";
import {SliceSliceSliceService} from "./services/slice-slice-slice.service";
import {DeviceDeviceService} from "./services/device-device.service";

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
        ApplicationApplicationService,
        ApplicationApplicationEndpointService,
        ConnectivityServiceConnectivityServiceService,
        DeviceDeviceService,
        DeviceGroupDeviceGroupService,
        DeviceGroupDeviceGroupDeviceService,
        EnterpriseEnterpriseService,
        EnterpriseEnterpriseConnectivityServiceService,
        IpDomainIpDomainService,
        SiteSiteService,
        SiteSiteMonitoringEdgeDeviceService,
        SiteSiteSmallCellService,
        TemplateTemplateService,
        TemplateTemplateSliceService,
        TrafficClassTrafficClassService,
        UpfUpfService,
        SliceSliceService,
        SliceSliceDeviceGroupService,
        SliceSliceFilterService,
        SliceSliceSliceService,
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
