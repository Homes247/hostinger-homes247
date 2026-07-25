import { RESPONSE } from '@nguniversal/express-engine/tokens';
import { Inject, Injectable, Optional } from '@angular/core';
import { Response } from 'express';

@Injectable()
export class ServerResponseService_withoutcity_btc {
  private response: Response;

  constructor(@Optional() @Inject(RESPONSE) response: any) {
    this.response = response;
  }

  setStatus(code: number,  noOfBedrooms?:number): this {
    if (this.response) {
      this.response.redirect(code, "https://www.homes247.in/btc/"+noOfBedrooms+"-bhk-flats-in-bangalore");
    }
    return this;
  }

  set301Status(noOfBedrooms): this {
    return this.setStatus(301,noOfBedrooms);
  }
}