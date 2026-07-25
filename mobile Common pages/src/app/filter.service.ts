import { Injectable } from '@angular/core';

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




  constructor() {}



}


