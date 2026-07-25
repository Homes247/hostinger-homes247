import { RESPONSE } from '@nguniversal/express-engine/tokens';
import { Inject, Injectable, Optional } from '@angular/core';
import { Response } from 'express';

@Injectable()
export class ServerResponseService_pclr {
  private response: Response;

  constructor(@Optional() @Inject(RESPONSE) response: any) {
    this.response = response;
  }

  setStatus(code: number,  City_Seo?:string, Locality_Seo?:string, localityid?:number,  ): this {
    if (this.response) {
      this.response.redirect(code, 'https://www.homes247.in/pclr/project-reviews-in-'+Locality_Seo+'-'+City_Seo+'-'+localityid);
    }
    return this;
  }

  set301Status(Locality_Seo,City_Seo,localityid): this {
    return this.setStatus(301,Locality_Seo,City_Seo,localityid);
  }
}