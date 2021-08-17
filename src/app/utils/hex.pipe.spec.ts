/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */
import {HexPipe} from './hex.pipe';

describe('HexPipe', () => {
    it('create an instance', () => {
        const pipe = new HexPipe();
        expect(pipe).toBeTruthy();
    });

    it('do a conversion', () => {
        const pipe = new HexPipe();
        expect(pipe.transform(7654321)).toEqual('74CBB1');
    });
});
