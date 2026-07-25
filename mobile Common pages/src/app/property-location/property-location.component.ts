import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { DataService2 } from '../data.service2';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import {enquiry } from './class';
import { CityService } from '../city.service';
import { WINDOW} from '@ng-toolkit/universal';
import { Location } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import {ServerResponseService_location} from '../server-response-propertydetails.service'


declare var $: any;
declare var swal: any;

declare var $: any;
@Component({
  selector: 'app-property-location',
  templateUrl: './property-location.component.html',
  styleUrls: ['./property-location.component.css'],
  providers:[ServerResponseService_location],
})
export class PropertyLocationComponent implements OnInit {
  touchstart = false;

 
  constructor(public Service2: DataService2,private router: Router,public responseService: ServerResponseService_location,public Service: DataService,public cityservice: CityService,@Inject(WINDOW) private window: Window,public location: Location, private titleService: Title, private meta: Meta,) { }
  Amenities: any;
  propID:any;
  propertiesDetailsnew: any;
  currentCity: any;
  cityname = '';
  cityid: any;
  otploader = false;
  propName: any;
  mapurl: any;
  lat: number;
  lng: number;
  amenitesImages = this.Service.ImageURL+ 'amenites/amenities-new/';
  localityName: any;
  cityName: any;

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

        var propName = this.propertiesDetailsnew[0]['propertyName'].toLowerCase().replace(/\s+/g, '-');
        var cityName = this.propertiesDetailsnew[0]['city_name'].toLowerCase().replace(/\s+/g, '-');;
        var localityName = this.propertiesDetailsnew[0]['locality_name'].toLowerCase().replace(/\s+/g, '-');
        this.propName = this.propertiesDetailsnew[0]['propertyName'];

        this.localityName = this.propertiesDetailsnew[0]['locality_name'];
        this.cityName = this.propertiesDetailsnew[0]['city_name'];


        this.titleService.setTitle(this.propName +' | '+ this.localityName +', '+ this.cityName + ' - Location Map');
        this.meta.updateTag({
          name: 'description',
          content: ' Find the exact location of  '+ this.propName +' on '+this.localityName +', '+ this.cityName +'. Contact us for free property assistance and start your journey!'
        });
        this.Service.createLinkForCanonicalURL();

        var urlstructure1 = '/plm/'+propName+'-in-'+localityName+'-'+cityName+'-location-map-'+propid

        if (this.router.url.indexOf(urlstructure1) > -1) {
        } else{
          this.responseService.set301Status(propName,localityName,cityName,propid);
        }

        
        this.lat = this.propertiesDetailsnew[0].latitude * 1;
        this.lng = this.propertiesDetailsnew[0].longitude * 1;
        this.mapurl = 'https://www.google.com/maps?hl=en&amp;q=' + this.lat + ',' + this.lng + '&amp;t=&amp;z=12&amp;ie=UTF8&amp;iwloc=B&amp;output=embed';

        const video_wrapper = $('#iFrameBlog');
        if (video_wrapper.length) {
          video_wrapper.html('<iframe width="100%" height="360" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="' + this.mapurl + '"></iframe>');
        }

        
  
    });
        this.Service2.get_amen_appro_banks(this.propID).subscribe(datadetails => {
        let otherdatas = datadetails['details'];
        this.Amenities = otherdatas[0].Amenities_Details;
    });
  }

  


}
