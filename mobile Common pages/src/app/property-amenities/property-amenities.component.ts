import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { DataService2 } from '../data.service2';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import {enquiry } from './class';
import { CityService } from '../city.service';
import { WINDOW} from '@ng-toolkit/universal';
import { Location } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';
import {ServerResponseService_amenities} from '../server-response-propertydetails.service'

declare var $: any;
declare var swal: any;

declare var $: any;
@Component({
  selector: 'app-property-amenities',
  templateUrl: './property-amenities.component.html',
  styleUrls: ['./property-amenities.component.css'],
  providers: [ServerResponseService_amenities],
})
export class PropertyAmenitiesComponent implements OnInit {
  localityName: any;
  cityName: any;


  constructor(public Service2: DataService2,public responseService: ServerResponseService_amenities,private titleService: Title,private meta: Meta,private router: Router,public Service: DataService,public cityservice: CityService,@Inject(WINDOW) private window: Window,public location: Location) { }
  Amenities: any;
  propID:any;
  propertiesDetailsnew: any;
  currentCity: any;
  cityname = '';
  cityid: any;
  otploader = false;
  propName: any;

  amenitesImages = this.Service.ImageURL + 'amenites/amenities-new/';


  ngOnInit(): void {
    this.dataLoads()
    
  }
  @HostListener('window:scroll', ['$event'])
  @HostListener('touchstart', ['$event'])
  onTouchLoad() {
    this.Service.mouseenterservice3();
  }
  dataLoads(){
    var propid = this.router.url.split('-').pop().match(/[0-9]+/);;
      this.propID = propid;


      this.Service2.getpropertynew(this.propID).subscribe(data => {

        let datadetails = data['details'];
        this.propertiesDetailsnew = datadetails;
        this.propName = this.propertiesDetailsnew[0]['propertyName'];
        
        this.localityName = this.propertiesDetailsnew[0]['locality_name'];
        this.cityName = this.propertiesDetailsnew[0]['city_name'];

        var propName = this.propertiesDetailsnew[0]['propertyName'].toLowerCase().replace(/\s+/g, '-');
        var cityName = this.propertiesDetailsnew[0]['city_name'].toLowerCase().replace(/\s+/g, '-');;
        var localityName = this.propertiesDetailsnew[0]['locality_name'].toLowerCase().replace(/\s+/g, '-');

        var urlstructure1 = '/pas/'+propName+'-in-'+localityName+'-'+cityName+'-amenities-'+propid

        if (this.router.url.indexOf(urlstructure1) > -1) {
        } else{
          this.responseService.set301Status(propName,localityName,cityName,propid);
        }


        this.titleService.setTitle(this.propName +' Amenities Details - Homes247.in');
        this.meta.updateTag({
          name: 'description',
          content: 'Get Amenities details of  '+this.propName+', '+this.localityName +', '+ this.cityName +'. For free property assistance and inquiries, contact Homes247.in.'
        });
        this.Service.createLinkForCanonicalURL();
    });



    this.Service2.get_amen_appro_banks(this.propID).subscribe(datadetails => {
      let otherdatas = datadetails['details'];
      this.Amenities = otherdatas[0].Amenities_Details;
    });

  

  
   
  }

  



}
