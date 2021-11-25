/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */

import { TruncateTextPipe } from './truncate-text.pipe';

describe('TruncateTextPipe', () => {
    it('create an instance', () => {
        const pipe = new TruncateTextPipe();
        expect(pipe).toBeTruthy();
    });

    it('do a conversion', () => {
        const pipe = new TruncateTextPipe();
        expect(pipe.transform('this is a long sentence', 20)).toEqual(
            'this is a long...'
        );
    });
});
