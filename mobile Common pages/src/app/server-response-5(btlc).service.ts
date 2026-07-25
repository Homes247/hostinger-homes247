import { RESPONSE } from '@nguniversal/express-engine/tokens';
import { Inject, Injectable, Optional } from '@angular/core';
import { Response } from 'express';

@Injectable()
export class ServerResponseService_btlc {
  private response: Response;

  constructor(@Optional() @Inject(RESPONSE) response: any) {
    this.response = response;
  }

  setStatus(code: number, noOfBedrooms?:number, City_Seo?:string, Locality_Seo?:string, localityid?:number,  ): this {
    if (this.response) {
      this.response.redirect(code, "https://www.homes247.in/btlc/"+noOfBedrooms+"-bhk-villas-in-"+Locality_Seo+"-"+City_Seo+"-"+localityid);
    }
    return this;
  }

  set301Status(noOfBedrooms,City_Seo,Locality_Seo,localityid): this {
    return this.setStatus(301,noOfBedrooms,City_Seo,Locality_Seo,localityid);
  }
}