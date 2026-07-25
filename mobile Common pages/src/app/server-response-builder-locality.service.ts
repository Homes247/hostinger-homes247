import { RESPONSE } from '@nguniversal/express-engine/tokens';
import { Inject, Injectable, Optional } from '@angular/core';
import { Response } from 'express';

@Injectable()
export class ServerResponseService_builderLocality {
  private response: Response;

  constructor(@Optional() @Inject(RESPONSE) response: any) {
    this.response = response;
  }

  setStatus(code: number, Builder_Seo?:string, Locality_Seo?:string, City_Seo?:string, localityid?:number, builderid?:number  ): this {
    if (this.response) {
      this.response.redirect(code, "https://www.homes247.in/bplc/"+Builder_Seo+"-properties-in-"+Locality_Seo+"-"+City_Seo+"-"+localityid+"-"+builderid+"");
    }
    return this;
  }

  set301Status(Builder_Seo,Locality_Seo,City_Seo,localityid,builderid): this {
    return this.setStatus(301,Builder_Seo,Locality_Seo,City_Seo,localityid,builderid);
  }
}