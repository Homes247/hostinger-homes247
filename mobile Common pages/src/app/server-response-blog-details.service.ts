import { RESPONSE } from '@nguniversal/express-engine/tokens';
import { Inject, Injectable, Optional } from '@angular/core';
import { Response } from 'express';

@Injectable()
export class ServerResponseService_blogsdetails {
  private response: Response;

  constructor(@Optional() @Inject(RESPONSE) response: any) {
    this.response = response;
  }

  setStatus(code: number, urlstructure?:string, id?:number  ): this {
    if (this.response) {
      this.response.redirect(code, "https://www.homes247.in/blogs/" + urlstructure + '-' + id);
    }
    return this;
  }

  set301Status(urlstructure,id): this {
    return this.setStatus(301,urlstructure,id);
  }
}