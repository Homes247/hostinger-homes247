import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';



@Pipe({
  name: 'limitTo',
})
export class TruncatePipe {
  transform(value: string, args: string): string {
    // let limit = args.length > 0 ? parseInt(args[0], 10) : 10;
    // let trail = args.length > 1 ? args[1] : '...';
    let limit = args ? parseInt(args, 1) : 1;
    let trail = '...';

    return value.length > limit ? value.substring(0, limit) + trail : value;
  }
}

@Pipe({
  name: 'ellipsis',
})
export class EllipsisPipe {
  transform(val, args) {
    if (args === undefined) {
      return val;
    }

    if (val.length > args) {
      return val.substring(0, args) + '...';
    } else {
      return val;
    }
  }
}

@Pipe({ name: 'sanitizeHtml' })
export class SanitizeHtmlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }
  transform(value: any): any {
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }
}

@Pipe({ name: 'replaceLineBreaks' })

export class ReplaceLineBreaks implements PipeTransform {
  transform(value: string): string {
    if (!value) {
      return ''; // Return an empty string or a default value if `value` is undefined or null
    }
    let doublehyphen = "--";
    let doublehyphen1 = new RegExp(`\\b${doublehyphen}\\b`, 'gi');
    return value.replace(/\s+/g, '-').replace(/[\(\)\.\,\&\/]/g, '-').replace(doublehyphen1, '-');
  }
}

@Pipe({ name: 'replaceLineBreaksany' })

export class ReplaceLineBreaksany implements PipeTransform {
  transform(value) {
    if (!value) {
      return ''; // Return an empty string or a default value if `value` is undefined or null
    }
    let doublehyphen = "--";
    let doublehyphen1 = new RegExp(`\\b${doublehyphen}\\b`, 'gi');
    return value.replace(/\s+/g, '-').replace(/[\(\)\.\,\&\/]/g, '').replace(doublehyphen1, '');
  }
}

@Pipe({
  name: 'unique',
  pure: false,
})
export class MyFilterunique implements PipeTransform {
  transform(items: any[], field: string): any[] {
    if (!items) return [];
    var flags = [],
      output = [],
      l = items.length,
      i;
    for (i = 0; i < l; i++) {
      if (flags[items[i][field]]) continue;
      flags[items[i][field]] = true;
      output.push(items[i]);
    }
    return output;
  }
}


@Pipe({
  name: 'orderBy2'
})
export class OrderByPipe2 implements PipeTransform {

  transform(value: Array<any>): any {
    if (value == null || value.length <= 1) {
      return value;
    }

    if (typeof value[0] === 'string' || value[0] instanceof String) {
      return [...value].sort((a, b) => -b.localeCompare(a));
    }
    return [...value].sort((a, b) => a - b);
  }
}

@Pipe({
  name: 'replaceEightWithSix'
})
export class ReplaceEightWithSixPipe implements PipeTransform {
  transform(value: any): string {
    if (!value) return ''; // Handle null or undefined values

    // Convert to an array if it's a string
    let bhkArray = Array.isArray(value) ? value : value.toString().split(',');

    // Trim spaces and replace '8' with '6'
    bhkArray = bhkArray.map(num => num.trim() === '8' ? '6' : num.trim());

    return bhkArray.join(', ');
  }
}

@Pipe({
  name: 'unique2',
  pure: false,
})
export class MyFilterunique2 implements PipeTransform {

  transform(items: any[]): any[] {
    if (!items) return [];
    var flags = [], l = items.length, i
    for (i = 0; i < l; i++) {
      if (flags.indexOf(items[i]) === -1) {
        flags.push(items[i]);
      }
    }
    return flags
  }
}
@Pipe({
  name: 'myfilter',
  pure: false,
})
export class MyBHKPipe implements PipeTransform {
  // transform(items: any[], filter: Object): any {
  //     if (!items || !filter) {
  //         return items;
  //     }

  //     return items.filter(item => item.BHK.indexOf(filter.BHK) !== -1);
  // }
  transform(items: any[], field: string, value: string): any[] {
    if (!items) return [];
    if (!value || value.length == 0) return items;
    return items.filter(
      (bhk) => bhk[field].toLowerCase().indexOf(value.toLowerCase()) != -1
    );
  }
}

@Pipe({
  name: 'orderBy',
})
export class OrderByPipe implements PipeTransform {
  transform(value: Array<any>, field: string): any {
    if (value == null || value.length <= 1) {
      return value;
    }
    // if (field.startsWith('-')) {
    //   field = field.substring(1);
    //   if (typeof value[0][field] === 'string' || value[0][field] instanceof String) {
    //     return [...value].sort((a, b) => b[field].localeCompare(a[field]));
    //   }
    //   return [...value].sort((a, b) => b[field] - a[field]);
    // }
    // else {
    if (
      typeof value[0][field] === 'string' ||
      value[0][field] instanceof String
    ) {
      return [...value].sort((a, b) => -b[field].localeCompare(a[field]));
    }
    return [...value].sort((a, b) => a[field] - b[field]);
    // }
  }
}

@Pipe({
  name: 'amountToWord',
})
export class AmountToWordPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (value) {
      value = parseFloat(value).toFixed(2);
      let amounth = value.toString().split('.');
      let price: any = amounth[0];
      let pointer: any = amounth.length > 0 ? amounth[1] : null;
      var singleDigit = [
        'Zero',
        'One',
        'Two',
        'Three',
        'Four',
        'Five',
        'Six',
        'Seven',
        'Eight',
        'Nine',
      ],
        doubleDigit = [
          'Ten',
          'Eleven',
          'Twelve',
          'Thirteen',
          'Fourteen',
          'Fifteen',
          'Sixteen',
          'Seventeen',
          'Eighteen',
          'Nineteen',
        ],
        tensPlace = [
          '',
          'Ten',
          'Twenty',
          'Thirty',
          'Forty',
          'Fifty',
          'Sixty',
          'Seventy',
          'Eighty',
          'Ninety',
        ],
        handle_tens = function (digit: any, prevdigit: any) {
          return 0 == digit
            ? ''
            : ' ' + (1 == digit ? doubleDigit[prevdigit] : tensPlace[digit]);
        },
        handle_utlc = function (digit: any, nextdigit: any, denom: any) {
          return (
            (0 != digit && 1 != nextdigit ? ' ' + singleDigit[digit] : '') +
            (0 != nextdigit || digit > 0 ? ' ' + denom : '')
          );
        };

      var rupees = '',
        digitIndex = 0,
        digit = 0,
        nextDigit = 0,
        words = [],
        paisaWords = [],
        paisa = '';
      if (((price += ''), isNaN(parseFloat(price)))) rupees = '';
      else if (parseFloat(price) > 0 && price.length <= 10) {
        for (digitIndex = price.length - 1; digitIndex >= 0; digitIndex--)
          switch (
          ((digit = price[digitIndex] - 0),
            (nextDigit = digitIndex > 0 ? price[digitIndex - 1] - 0 : 0),
            price.length - digitIndex - 1)
          ) {
            case 0:
              words.push(handle_utlc(digit, nextDigit, ''));
              break;
            case 1:
              words.push(handle_tens(digit, price[digitIndex + 1]));
              break;
            case 2:
              words.push(
                0 != digit
                  ? ' ' +
                  singleDigit[digit] +
                  ' Hundred' +
                  (0 != price[digitIndex + 1] && 0 != price[digitIndex + 2]
                    ? ' and'
                    : '')
                  : ''
              );
              break;
            case 3:
              words.push(handle_utlc(digit, nextDigit, 'Thousand'));
              break;
            case 4:
              words.push(handle_tens(digit, price[digitIndex + 1]));
              break;
            case 5:
              words.push(handle_utlc(digit, nextDigit, 'Lakh'));
              break;
            case 6:
              words.push(handle_tens(digit, price[digitIndex + 1]));
              break;
            case 7:
              words.push(handle_utlc(digit, nextDigit, 'Crore'));
              break;
            case 8:
              words.push(handle_tens(digit, price[digitIndex + 1]));
              break;
            case 9:
              words.push(
                0 != digit
                  ? ' ' +
                  singleDigit[digit] +
                  ' Hundred' +
                  (0 != price[digitIndex + 1] || 0 != price[digitIndex + 2]
                    ? ' and'
                    : ' Crore')
                  : ''
              );
          }
        rupees = words.reverse().join('');
      } else rupees = '';

      if (rupees) rupees = `${rupees} Rupees`;

      if (pointer != '00') {
        digitIndex = 0;
        digit = 0;
        nextDigit = 0;

        for (digitIndex = pointer.length - 1; digitIndex >= 0; digitIndex--)
          switch (
          ((digit = pointer[digitIndex] - 0),
            (nextDigit = digitIndex > 0 ? pointer[digitIndex - 1] - 0 : 0),
            pointer.length - digitIndex - 1)
          ) {
            case 0:
              paisaWords.push(handle_utlc(digit, nextDigit, ''));
              break;
            case 1:
              paisaWords.push(handle_tens(digit, pointer[digitIndex + 1]));
              break;
          }
        paisa = paisaWords.reverse().join('');
        if (rupees) rupees = `${rupees} and ${paisa} Paisa`;
        else rupees = `${paisa} Paisa`;
      }
      return rupees;
    }
  }
}

@Pipe({
  name: 'numberconvert',
})
export class Convertnumber implements PipeTransform {
  transform(value: any, ...args: any[]) {
    if (value >= 10000000) {
      value = (value / 10000000).toFixed(2) + ' Crores';
    } else if (value >= 100000) {
      value = (value / 100000).toFixed(2) + ' Lacs';
    }
    return value;
  }
}

@Pipe({ name: 'randomOrder' })
export class RandomOrderPipe implements PipeTransform {
  transform(list: Array<any>): Array<any> {
    const newList = [...list];
    newList.sort(() => Math.random() - 0.5);
    return newList;
  }
}
@Pipe({
  name: 'orderByy',
})
// export class OrderByPipes implements PipeTransform {
//   transform(array: any, field: string): any[] {
//     array.sort((a: any, b: any) => {
//       if (a[field] < b[field]) {
//         return -1;
//       } else if (a[field] > b[field]) {
//         return 1;
//       } else {
//         return 0;
//       }
//     });
//     return array;
//   }
// }
export class OrderByPipes implements PipeTransform {
  transform(array: any[], field: string): any[] {
    // Prevent error when array is undefined or null
    if (!array || !Array.isArray(array)) {
      return [];
    }

    return array.sort((a: any, b: any) => {
      if (a[field] < b[field]) {
        return -1;
      } else if (a[field] > b[field]) {
        return 1;
      } else {
        return 0;
      }
    });
  }
}
@Pipe({ name: 'startsWithLetterlocality' })
export class startsWithLetterPipelocality implements PipeTransform {
  transform(items, letter) {
    var filtered = [];
    var letterMatch = new RegExp(letter, 'i');
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      if (letterMatch.test(item.name.substring(0, 1))) {
        filtered.push(item);
      }
    }
    return filtered;
  };
}

@Pipe({ name: 'startsWithLettercity' })
export class startsWithLetterPipecity implements PipeTransform {
  transform(items, letter) {
    var filtered = [];
    var letterMatch = new RegExp(letter, 'i');
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      if (letterMatch.test(item.city.substring(0, 1))) {
        filtered.push(item);
      }
    }
    return filtered;
  };
}
@Pipe({ name: 'startsWithLetterbank' })
export class startsWithLetterPipebank implements PipeTransform {
  // transform(items, letter) {
  //   var filtered = [];
  //   var letterMatch = new RegExp(letter, 'i');
  //   for (var i = 0; i < items.length; i++) {
  //     var item = items[i];
  //     if (letterMatch.test(item.bank_name.substring(0, 1))) {
  //       filtered.push(item);
  //     }
  //   }
  //   return filtered;
  // };

  transform(items, letter) {
    if (!items || !Array.isArray(items)) {
      return [];
    }
    var filtered = [];
    var letterMatch = new RegExp(letter, 'i');
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      if (
        item &&
        item.bank_name &&
        item.bank_name.substring(0, 1) &&
        letterMatch.test(item.bank_name.substring(0, 1))
      ) {
        filtered.push(item);
      }
    }
    return filtered;
  };
}
@Pipe({ name: 'priceFormatter' })
export class PriceFormatterPipe implements PipeTransform {
  transform(price: number): string {
    if (price >= 10000000) {
      // Convert to Crores
      const priceInCrores = (price / 10000000).toFixed(2);
      return parseFloat(priceInCrores).toFixed(parseFloat(priceInCrores) % 1 === 0 ? 0 : 1) + 'Cr';
    } else if (price < 100000) {
      // Convert to thousand
      const priceInThousand = (price / 1000).toFixed(2);
      return parseFloat(priceInThousand).toFixed(parseFloat(priceInThousand) % 1 === 0 ? 0 : 1) + 'K';
    } else {
      // Convert to Lakhs
      const priceInLakhs = (price / 100000).toFixed(2);
      return parseFloat(priceInLakhs).toFixed(parseFloat(priceInLakhs) % 1 === 0 ? 0 : 1) + 'L';
    }
  }


}


@Pipe({
  name: 'replaceSpecialCharacters',
})
export class ReplaceSpecialCharactersPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) {
      return value;
    }
    // Replace all non-alphanumeric characters with a space
    return value.replace(/[^a-zA-Z0-9]/g, ' ');
  }
}


@Pipe({ name: 'countFormatter' })
export class countFormatterPipe implements PipeTransform {
  transform(price: number): string {
    if (price < 1000) {
      // Return the actual number without any suffix
      return price.toString();
    } else if (price < 100000) {
      // Convert to thousand
      const priceInThousand = price / 1000;
      return (priceInThousand % 1 === 0 ? priceInThousand.toFixed(0) : priceInThousand.toFixed(1)) + 'K';
    } else if (price < 10000000) {
      // Convert to Lakhs
      const priceInLakhs = price / 100000;
      return (priceInLakhs % 1 === 0 ? priceInLakhs.toFixed(0) : priceInLakhs.toFixed(1)) + 'L';
    } else {
      // Convert to Crores
      const priceInCrores = price / 10000000;
      return (priceInCrores % 1 === 0 ? priceInCrores.toFixed(0) : priceInCrores.toFixed(1)) + 'Cr';
    }
  }

}

@Pipe({
  name: 'sortNumbers'
})
export class SortNumbersPipe implements PipeTransform {
  transform(value: string | string[]): number[] {
    if (!value) return [];

    let arr: number[] = [];

    if (typeof value === 'string') {
      arr = value.split(',').map(v => +v.trim());  // convert to number
    } else {
      arr = value.map(v => +v);
    }

    return arr.sort((a, b) => a - b); // ascending order
  }
}

@Pipe({
  name: 'customPriceFormat'
})
export class customPriceFormatPipe implements PipeTransform {
  transform(value: number): string {
    const numValue = Number(value);
    if (isNaN(numValue)) return String(value);

    if (numValue >= 10000000) {
      // Crore with Indian commas
      return `₹ ${(numValue / 10000000).toLocaleString('en-IN', { maximumFractionDigits: 2 })} Cr`;
    } else if (numValue >= 100000) {
      // Lakh with Indian commas
      return `₹ ${(numValue / 100000).toLocaleString('en-IN', { maximumFractionDigits: 2 })} Lacs`;
    } else {
      // Normal numbers (with commas)
      return `₹ ${numValue.toLocaleString('en-IN')}`;
    }
  }
}

@Pipe({
  name: 'cleanUrl'
})
export class cleanUrlPipe implements PipeTransform {
  // transform(value: string): string {
  //   if (!value) return '';
  //   return value
  //     // Decode and remove unwanted encoded parts
  //     .replace(/%20|%C2%A0|%0A|%0D|%09|%22|%3E|%3C|%3Cbr%20\/%3E/gi, '')
  //     // Remove hidden characters like non-breaking spaces, tabs, and newlines
  //     .replace(/[\u00A0\r\n\t"]/g, '')
  //     // Replace ( ) . , & / symbols with a dash
  //     .replace(/[\(\)\.\,\&\/]/g, '-')
  //     // Replace multiple spaces or underscores with single dash
  //     .replace(/[\s_]+/g, '-')
  //     // Replace double hyphens (--) with single hyphen (-)
  //     .replace(/--+/g, '-')
  //     // Remove stray HTML tags (like <br>)
  //     .replace(/<[^>]*>/g, '')
  //     // Trim leading or trailing hyphens or spaces
  //     .replace(/^-+|-+$/g, '')
  //     .trim()
  //     // Convert to lowercase for consistent URLs
  //     .toLowerCase();
  // }

  transform(value: string): string {
    if (!value) return '';

    // If value is a pure number -> return as is
    if (/^\d+$/.test(value)) {
      return value;
    }

    return value
      .replace(/%20|%C2%A0|%0A|%0D|%09|%22|%3E|%3C|%3Cbr%20\/%3E/gi, '')
      .replace(/[\u00A0\r\n\t"]/g, '')
      .replace(/[\(\)\.\,\&\/]/g, '-')
      .replace(/[\s_]+/g, '-')
      .replace(/--+/g, '-')
      .replace(/<[^>]*>/g, '')
      .replace(/^-+|-+$/g, '')
      .trim()
      .toLowerCase();
  }
}


