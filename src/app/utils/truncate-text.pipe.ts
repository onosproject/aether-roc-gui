/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-1.0
 */

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'truncateText',
})
export class TruncateTextPipe implements PipeTransform {
    transform(value: string, length: number): string {
        const biggestWord = 50;
        const elipses = '...';
        if (typeof value === 'undefined') {
            return value;
        }
        if (value.length <= length) {
            return value;
        }

        // .. truncate to about correct length
        let truncatedText = value.slice(0, length + biggestWord);

        // .. now nibble ends till correct length
        while (truncatedText.length > length - elipses.length) {
            const lastSpace = truncatedText.lastIndexOf(' ');
            if (lastSpace === -1) {
                break;
            }
            truncatedText = truncatedText
                .slice(0, lastSpace)
                .replace(/[!,.?;:]$/, '');
        }
        return truncatedText + elipses;
    }
}
