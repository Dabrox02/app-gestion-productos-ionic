import { compileClassDebugInfo } from '@angular/compiler';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyPipe',
  standalone: true
})
export class CurrencyPipePipe implements PipeTransform {
  transform(
    value: number,
    currencyCode: string = 'USD',
    locale: string = 'en-US'
  ): string | null {
    if (value == null) return null;
    const options: Intl.NumberFormatOptions = {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    };

    return new Intl.NumberFormat(locale, options).format(value);
  }
}
