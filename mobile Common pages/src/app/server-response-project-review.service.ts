import { RESPONSE } from '@nguniversal/express-engine/tokens';
import { Inject, Injectable, Optional } from '@angular/core';
import { Response } from 'express';

@Injectable()
export class ServerResponseService_projectreview {
  private response: Response;

  constructor(@Optional() @Inject(RESPONSE) response: any) {
    this.response = response;
  }

  setStatus(code: number, currentPropName_seo?:string, currentPropId?:number  ): this {
    if (this.response) {
      this.response.redirect(code, "https://www.homes247.in/prd/rating-and-reviews-of-"+ currentPropName_seo +"-"+ currentPropId );
    }
    return this;
  }

  set301Status(currentPropName_seo,currentPropId): this {
    return this.setStatus(301,currentPropName_seo,currentPropId);
  }
}