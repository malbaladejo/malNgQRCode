import { Injectable } from '@angular/core';
import { EmailStrategy } from './emailStrategy';
import { FormattedCode } from './formattedCode';
import { FormattedCodeType } from './formattedCodeType';
import { KeyValueStrategy } from './keyValueStrategy';
import { RawStrategy } from './rawStrategy';
import { UrlStrategy } from './urlStrategy';

@Injectable({
    providedIn: 'root'
})
export class FormatCodeService {
    private strategies = [
        new UrlStrategy(),
        new EmailStrategy(),
        new KeyValueStrategy()
    ];

    private defaultStrategy = new RawStrategy();

    public getType(code: string): FormattedCodeType {
        for (const strategy of this.strategies) {
            if (strategy.canFormat(code)) {
                return strategy.getType();
            }
        }

        return this.defaultStrategy.getType();
    }

    public format(code: string): FormattedCode {
        for (const strategy of this.strategies) {
            if (strategy.canFormat(code)) {
                return strategy.format(code);
            }
        }

        return this.defaultStrategy.format(code);
    }

}
