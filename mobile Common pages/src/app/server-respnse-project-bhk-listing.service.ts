import { RESPONSE } from '@nguniversal/express-engine/tokens';
import { Inject, Injectable, Optional } from '@angular/core';
import { Response } from 'express';

@Injectable()
export class ServerResponseService_Project_bhk_listing {
  private response: Response;

  constructor(@Optional() @Inject(RESPONSE) response: any) {
    this.response = response;
  }

  setStatus(code: number,  propertyNameSeo?:string, city_nameSeo?:string, propid?:number, ): this {
    if (this.response) {
      this.response.redirect(code, 'https://www.homes247.in/project/'+propertyNameSeo+'-for-sale-in-'+city_nameSeo+'-'+propid);
    }
    return this;
  }

  set301Status(propertyNameSeo,city_nameSeo,propid): this {
    return this.setStatus(301,propertyNameSeo,city_nameSeo,propid);
  }
}