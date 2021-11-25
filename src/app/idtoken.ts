/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */

export interface IdTokClaims {
    at_hash: string;
    aud: string;
    email: string;
    email_verified: boolean;
    exp: number;
    groups: string[];
    iat: number;
    iss: string;
    name: string;
    nonce: string;
    sub: string;
}

export class Idtoken {}
