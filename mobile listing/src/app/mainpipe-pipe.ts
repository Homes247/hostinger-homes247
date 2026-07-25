import { Pipe, PipeTransform, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
@Pipe({
  name: 'mainpipe',
  standalone: true
})
export class MainpipePipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }
}
@Pipe({ name: 'replaceLineBreaks' })
export class ReplaceLineBreaks implements PipeTransform {
  transform(value: string): string {
    let doublehyphen = "--";
    let doublehyphen1 = new RegExp(`\\b${doublehyphen}\\b`, 'gi');
    return value.replace(/\s+/g, '-').replace(/[\(\)\.\,\&\/]/g, '-').replace(doublehyphen1, '-');
  }
}
@Pipe({ name: 'priceFormatter' })
export class PriceFormatterPipe implements PipeTransform {
  transform(price: number): string {
    if (price >= 10000000) {
      // Convert to Crores
      const priceInCrores = (price / 10000000).toFixed(2);
      return priceInCrores + ' Cr';
    } else {
      // Convert to Lakhs
      const priceInLakhs = (price / 100000).toFixed(2);
      return priceInLakhs + ' L';
    }
  }
}
// @Pipe({name: 'replaceLineBreaksany'})
// export class ReplaceLineBreaksany implements PipeTransform {
//   transform(value) {
//     let doublehyphen = "--";
//     let doublehyphen1 = new RegExp(`\\b${doublehyphen}\\b`, 'gi');
//     return value.replace(/\s+/g, '-').replace(/[\(\)\.\,\&\/]/g, '').replace(doublehyphen1, '');
//   }
// }
@Pipe({ name: 'replaceLineBreaksany' })
export class ReplaceLineBreaksany implements PipeTransform {
  transform(value: any) {
    let doublehyphen = "--";
    let doublehyphen1 = new RegExp(`\\b${doublehyphen}\\b`, 'gi');
    return value.replace(/\s+/g, '-').replace(/[\(\)\.\,\&\/]/g, '').replace(doublehyphen1, '');
  }
}
@Pipe({ name: 'sanitizeHtml' })
export class SanitizeHtmlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }
  transform(value: any): any {
    return this.sanitizer.bypassSecurityTrustHtml(value);
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
  name: 'myfilter',
  pure: false,
})
export class MyBHKPipe implements PipeTransform {
  // transform(items: any[], filter: Object): any {
  //     if (!items || !filter) {
  //         return items;
  //     }
  //     return items.filter(item => item.BHK?.indexOf(filter.BHK) !== -1);
  // }
  transform(items: any[], field: string, value: string): any[] {
    if (!items) return [];
    if (!value || value.length == 0) return items;
    return items.filter(
      (bhk) => bhk[field].toLowerCase()?.indexOf(value.toLowerCase()) != -1
    );
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
  name: 'unique2',
  pure: false,
})
export class MyFilterunique2 implements PipeTransform {
  transform(items: any[]): any[] {
    if (!items) return [];
    var flags = [], l = items.length, i
    for (i = 0; i < l; i++) {
      if (flags?.indexOf(items[i]) === -1) {
        flags.push(items[i]);
      }
    }
    return flags
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
  name: 'cleanUrl'
})
export class cleanUrlPipe implements PipeTransform {

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

@Pipe({
  name: 'orderByy',
})
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

