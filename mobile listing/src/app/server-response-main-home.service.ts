import { Inject, Injectable, Optional } from '@angular/core';
import { Response } from 'express';
import { RESPONSE } from './token';

@Injectable()
export class ServerResponseService_mainhome {
  private response: Response;

  constructor(@Optional() @Inject(RESPONSE) response: any) {
    this.response = response;
  }

  setStatus(code: number,): this {
    if (this.response) {
      this.response.redirect(code, "https://www.homes247.in");
    }
    return this;
  }

  set301Status(): this {
    return this.setStatus(301);
  }
}