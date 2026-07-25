import { Inject, Injectable, Optional } from '@angular/core';
import { Response } from 'express';
import { RESPONSE } from './token';

@Injectable()
export class ServerResponseService_atc {
  private response: Response;

  constructor(@Optional() @Inject(RESPONSE) response: any) {
    this.response = response;
  }

  setStatus(code: number, City_Seo?:string,): this {
    if (this.response) {
      this.response.redirect(code, "/atc/affordable-flats-in-"+City_Seo);
    }
    return this;
  }
  setStatus1(code: number, City_Seo?:string,): this {
    if (this.response) {
      this.response.redirect(code, "/ltc/luxury-flats-in-"+City_Seo);
    }
    return this;
  }
  setStatus2(code: number, City_Seo?:string,): this {
    if (this.response) {
      this.response.redirect(code, "/apc/affordable-projects-in-"+City_Seo);
    }
    return this;
  }
  setStatus3(code: number, City_Seo?:string,): this {
    if (this.response) {
      this.response.redirect(code, "/lpc/luxury-projects-in-"+City_Seo);
    }
    return this;
  }
  setStatus4(code: number, noOfBedrooms?:number, City_Seo?:string,): this {
    if (this.response) {
      this.response.redirect(code, "/btac/"+noOfBedrooms+"-bhk-affordable-flats-apartments-in-"+City_Seo);
    }
    return this;
  }
  setStatus5(code: number, noOfBedrooms?:number, City_Seo?:string,): this {
    if (this.response) {
      this.response.redirect(code, "/btac/"+noOfBedrooms+"-bhk-affordable-villas-in-"+City_Seo);
    }
    return this;
  }

  set301Status(City_Seo): this {
    return this.setStatus(301,City_Seo);
  }
  set301Status1(City_Seo): this {
    return this.setStatus1(301,City_Seo);
  }
  set301Status2(City_Seo): this {
    return this.setStatus2(301,City_Seo);
  }
  set301Status3(City_Seo): this {
    return this.setStatus3(301,City_Seo);
  }
  set301Status4(noOfBedrooms,City_Seo): this {
    return this.setStatus4(301, noOfBedrooms,City_Seo);
  }
  set301Status5(noOfBedrooms,City_Seo): this {
    return this.setStatus5(301, noOfBedrooms,City_Seo);
  }

}