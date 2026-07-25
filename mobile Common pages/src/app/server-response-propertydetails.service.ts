import { RESPONSE } from '@nguniversal/express-engine/tokens';
import { Inject, Injectable, Optional } from '@angular/core';
import { Response } from 'express';

@Injectable()
export class ServerResponseService_amenities {
  private response: Response;

  constructor(@Optional() @Inject(RESPONSE) response: any) {
    this.response = response;
  }

  setStatus(code: number, propName_seo?:string, localityName?:string, cityName?:string, propid?:number,  ): this {
    if (this.response) {
      this.response.redirect(code, 'https://www.homes247.in/pas/'+propName_seo+'-in-'+localityName+'-'+cityName+'-amenities-'+propid);
    }
    return this;
  }

  set301Status(propName_seo,localityName,cityName,propid): this {
    return this.setStatus(301,propName_seo,localityName,cityName,propid);
  }
}
@Injectable()
export class ServerResponseService_brochure {
  private response: Response;

  constructor(@Optional() @Inject(RESPONSE) response: any) {
    this.response = response;
  }

  setStatus(code: number, propName_seo?:string, localityName?:string, cityName?:string, propid?:number,  ): this {
    if (this.response) {
      this.response.redirect(code, 'https://www.homes247.in/pbd/'+propName_seo+'-in-'+localityName+'-'+cityName+'-brochure-download-'+propid);
    }
    return this;
  }

  set301Status(propName_seo,localityName,cityName,propid): this {
    return this.setStatus(301,propName_seo,localityName,cityName,propid);
  }
}

@Injectable()
export class ServerResponseService_location {
  private response: Response;

  constructor(@Optional() @Inject(RESPONSE) response: any) {
    this.response = response;
  }

  setStatus(code: number, propName_seo?:string, localityName?:string, cityName?:string, propid?:number,  ): this {
    if (this.response) {
      this.response.redirect(code, 'https://www.homes247.in/plm/'+propName_seo+'-in-'+localityName+'-'+cityName+'-location-map-'+propid);
    }
    return this;
  }

  set301Status(propName_seo,localityName,cityName,propid): this {
    return this.setStatus(301,propName_seo,localityName,cityName,propid);
  }
}
@Injectable()
export class ServerResponseService_gallery {
  private response: Response;

  constructor(@Optional() @Inject(RESPONSE) response: any) {
    this.response = response;
  }

  setStatus(code: number, propName_seo?:string, localityName?:string, cityName?:string, propid?:number,  ): this {
    if (this.response) {
      this.response.redirect(code, 'https://www.homes247.in/pgv/'+propName_seo+'-in-'+localityName+'-'+cityName+'-photo-gallery-'+propid);
    }
    return this;
  }

  set301Status(propName_seo,localityName,cityName,propid): this {
    return this.setStatus(301,propName_seo,localityName,cityName,propid);
  }
}
@Injectable()
export class ServerResponseService_forum {
  private response: Response;

  constructor(@Optional() @Inject(RESPONSE) response: any) {
    this.response = response;
  }

  setStatus(code: number, propName_seo?:string, localityName?:string, cityName?:string, propid?:number,  ): this {
    if (this.response) {
      this.response.redirect(code, 'https://www.homes247.in/dfl/'+propName_seo+'-in-'+localityName+'-'+cityName+'-disscussion-forum-list-'+propid);
    }
    return this;
  }

  set301Status(propName_seo,localityName,cityName,propid): this {
    return this.setStatus(301,propName_seo,localityName,cityName,propid);
  }
}
@Injectable()
export class ServerResponseService_floorplans {
  private response: Response;

  constructor(@Optional() @Inject(RESPONSE) response: any) {
    this.response = response;
  }

  setStatus(code: number, propName_seo?:string, localityName?:string, cityName?:string, propid?:number,  ): this {
    if (this.response) {
      this.response.redirect(code, 'https://www.homes247.in/fpl/'+propName_seo+'-in-'+localityName+'-'+cityName+'-floorplans-'+propid);
    }
    return this;
  }

  set301Status(propName_seo,localityName,cityName,propid): this {
    return this.setStatus(301,propName_seo,localityName,cityName,propid);
  }
}