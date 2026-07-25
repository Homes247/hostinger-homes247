// ServerResponseService_btc
import { Inject, Injectable, Optional } from '@angular/core';
import { Response } from 'express';
import { RESPONSE } from './token';

@Injectable()
export class ServerResponseService_btc {
  private response: Response;

  constructor(@Optional() @Inject(RESPONSE) response: any) {
    this.response = response;
  }

  setStatus(code: number, noOfBedrooms?: number, City_Seo?: string, propertyType: string = 'flats'): this {
    if (this.response) {
      this.response.redirect(code, `https://www.homes247.in/btc/${noOfBedrooms}-bhk-${propertyType}-in-${City_Seo}`);
    }
    return this;
  }

  set301Status(noOfBedrooms: number | string, City_Seo: string, propertyType: string = 'flats'): this {
  return this.setStatus(301, Number(noOfBedrooms), City_Seo, propertyType);
}
}