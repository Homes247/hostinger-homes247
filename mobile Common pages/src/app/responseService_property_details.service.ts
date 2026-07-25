import { RESPONSE } from '@nguniversal/express-engine/tokens';
import { Inject, Injectable, Optional } from '@angular/core';
import { Response } from 'express';

@Injectable()
export class ServerResponseService_PropertyDetails {
  private response: Response;

  constructor(@Optional() @Inject(RESPONSE) response: any) {
    this.response = response;
  }

  setStatus(code: number,  apinamecity?:string, apilocality?:string, apipropertyname?:string, propid?:number, ): this {
    if (this.response) {
      this.response.redirect(code, 'https://www.homes247.in/property/' + apinamecity + '/' + apilocality + '/' + apipropertyname + '-' + propid);
    }
    return this;
  }

  set301Status(apinamecity,apilocality,apipropertyname,propid): this {
    return this.setStatus(301,apinamecity,apilocality,apipropertyname,propid);
  }
}