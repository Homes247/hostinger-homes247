import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  Bedrooms=[];
  price_on_request: any = 1
  Bathrooms=[];
  proptypeid=[];
  statusid=[];
  min=[];
  max=[];
  property_minprice=[];
  property_maxprice=[];
  sqftmax=[];
  sqftmin=[];
  possission=[];
  servicelocality=[];
  CityName= [];
  cityid= [];
  amenities= [];
  PropertyName:any;
  RegionID:any;
  localityid:any;
  selectedService:any
  name:any
  number:any
  email:any
  userIdfk:any
  area:any
  areatype:any

  propid = [];
  proptype = '';
  Compare = '';

  componentloads:boolean = false
  componentloadsejs:boolean = false


  constructor() {}



}


