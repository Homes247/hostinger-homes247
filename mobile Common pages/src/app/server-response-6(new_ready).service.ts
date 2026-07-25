import { RESPONSE } from '@nguniversal/express-engine/tokens';
import { Inject, Injectable, Optional } from '@angular/core';
import { Response } from 'express';

@Injectable()
export class ServerResponseService_new_ready {
  private response: Response;

  constructor(@Optional() @Inject(RESPONSE) response: any) {
    this.response = response;
  }

  setStatus(code: number, City_Seo?:string,): this {
    if (this.response) {
      this.response.redirect(code, "https://www.homes247.in/new-launch-projects/new-projects-in-"+City_Seo);
    }
    return this;
  }
  setStatus1(code: number, City_Seo?:string,): this {
    if (this.response) {
      this.response.redirect(code, "https://www.homes247.in/ready-to-move-apartments/ready-to-move-flats-in-"+City_Seo);
    }
    return this;
  }

  set301Status(City_Seo): this {
    return this.setStatus(301,City_Seo);
  }
  set301Status1(City_Seo): this {
    return this.setStatus1(301,City_Seo);
  }
}