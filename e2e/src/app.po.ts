/*
 * SPDX-FileCopyrightText: 2020-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { browser, by, element } from 'protractor';

export class AppPage {
    navigateTo(): Promise<unknown> {
        return browser.get(browser.baseUrl) as Promise<unknown>;
    }

    getTitleText(): Promise<string> {
        return element(
            by.css('app-root .content span')
        ).getText() as Promise<string>;
    }
}
