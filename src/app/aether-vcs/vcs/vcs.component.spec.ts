/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {ComponentFixture, TestBed} from '@angular/core/testing'
import {HttpClientTestingModule} from '@angular/common/http/testing'
import {RouterTestingModule} from '@angular/router/testing'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {MatPaginatorModule} from '@angular/material/paginator'
import {MatSortModule} from '@angular/material/sort'
import {MatTableModule} from '@angular/material/table'
import {MatSnackBarModule} from '@angular/material/snack-bar'
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatIconModule} from '@angular/material/icon'
import {ApiModule} from '../../../openapi3/aether/4.0.0/api.module'
import {ActivatedRoute} from '@angular/router'
import {VcsComponent} from './vcs.component'
import {VcsDatasource} from './vcs-datasource'
import {AETHER_TARGETS} from '../../../environments/environment'
import {BasketService} from '../../basket.service'
import SpyObj = jasmine.SpyObj
import {of} from 'rxjs'

describe('VcsComponent', () => {
    let component: VcsComponent
    let fixture: ComponentFixture<VcsComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [VcsComponent],
            imports: [
                HttpClientTestingModule,
                RouterTestingModule,
                BrowserAnimationsModule,
                MatPaginatorModule,
                MatSortModule,
                MatTableModule,
                MatSnackBarModule,
                MatToolbarModule,
                MatIconModule,
                ApiModule
            ],
            providers: [
                {provide: ActivatedRoute, useValue: {paramMap: of({get: () => 'value'})}},
            ],
        })
            .compileComponents()
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(VcsComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    describe('once data are loaded', () => {
        const bs: SpyObj<BasketService> = jasmine.createSpyObj('vcs-data-source', {
            buildPatchBody: {
                Updates: {
                    'Vcs-4.0.0': {
                        'vcs': [
                            {
                                additionalProperties: {unchanged: 'sd,sst,enterprise,site,default-behavior'},
                                description: 'vcs-2-updated',
                                id: 'vcs-2',
                            },
                            {
                                additionalProperties: {unchanged: 'sd,sst,enterprise,site,default-behavior'},
                                filter: [
                                    {allow: true, application: 'added-app'}, // this app has been added
                                    {allow: true, application: 'test-app'} // this app has been updated
                                ],
                                id: 'vcs-3',
                            }
                        ]
                    }
                },
                'default-target': AETHER_TARGETS[0]
            }
        })

        const dataSource: VcsDatasource = new VcsDatasource(null, bs, AETHER_TARGETS[0])
        dataSource.data = [
            {id: 'vcs-1', description: 'vcs-1', enterprise: 'enterprise-1', sd: 1, sst: 1, site: 'site-1'},
            {id: 'vcs-2', description: 'vcs-2', enterprise: 'enterprise-2', sd: 2, sst: 2, site: 'site-2'},
            {
                id: 'vcs-3', description: 'vcs-3', enterprise: 'enterprise-3', sd: 3, sst: 3, site: 'site-3', filter: [{
                    allow: false,
                    application: 'test-app'
                }]
            },
        ]

        beforeEach(() => {
            // mockBasketService.calls.reset()
            bs.buildPatchBody.calls.reset()
        })

        it('should merge the backend content with the basked updates', () => {
            component.onDataLoaded(dataSource)
            expect(bs.buildPatchBody).toHaveBeenCalledOnceWith()

            expect(dataSource.data[1].description).toContain('updated')
            expect(dataSource.data[2].filter.length).toEqual(2)
        })
    })
})
