import { RESPONSE } from '@nguniversal/express-engine/tokens';
import { Inject, Injectable, Optional } from '@angular/core';
import { Response } from 'express';

@Injectable()
export class ServerResponseService_city {
  private response: Response;

  constructor(@Optional() @Inject(RESPONSE) response: any) {
    this.response = response;
  }

  setStatus(code: number,  City_Seo?:string,): this {
    if (this.response) {
      this.response.redirect(code, "https://www.homes247.in/"+City_Seo+"/property-sale");
    }
    return this;
  }

  set301Status(City_Seo): this {
    return this.setStatus(301,City_Seo);
  }
}