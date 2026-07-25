import { RESPONSE } from '@nguniversal/express-engine/tokens';
import { Inject, Injectable, Optional } from '@angular/core';
import { Response } from 'express';

@Injectable()
export class ServerResponseService_locality {
  private response: Response;

  constructor(@Optional() @Inject(RESPONSE) response: any) {
    this.response = response;
  }

  setStatus(code: number,  City_Seo?:string, Locality_Seo?:string, localityid?:number,  ): this {
    if (this.response) {
      this.response.redirect(code, "https://www.homes247.in/"+City_Seo+"/property-sale-in-"+Locality_Seo+"-"+localityid);
    }
    return this;
  }

  set301Status(City_Seo,Locality_Seo,localityid): this {
    return this.setStatus(301,City_Seo,Locality_Seo,localityid);
  }
}