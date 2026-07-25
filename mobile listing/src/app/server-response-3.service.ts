import { Inject, Injectable, Optional } from '@angular/core';
import { Response } from 'express';
import { RESPONSE } from './token';

@Injectable()
export class ServerResponseService {
  private response: Response;

  constructor(@Optional() @Inject(RESPONSE) response: any) {
    this.response = response;
  }

  setStatus(code: number,  builder_seo?:string, city_seo?:string, builderid?:number,  ): this {
    if (this.response) {
      this.response.redirect(code, "https://www.homes247.in/"+ city_seo +"/builder/"+ builder_seo +"-"+ builderid);
      // if (message) {
      //   this.response.statusMessage = message;
      // }
    }
    return this;
  }

  set301Status(builder_seo,city_seo,builderid): this {
    return this.setStatus(301,builder_seo,city_seo,builderid);
  }
}