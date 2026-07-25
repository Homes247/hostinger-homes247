import { Location } from '@angular/common';
import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { WINDOW } from '@ng-toolkit/universal';
import { CityService } from '../city.service';
import { DataService } from '../data.service';
import { DataService2 } from '../data.service2';
import { ServerResponseService_gallery } from '../server-response-propertydetails.service';


declare var $: any;
declare var swal: any;

declare var $: any;
@Component({
  selector: 'app-property-gallery',
  templateUrl: './property-gallery.component.html',
  styleUrls: ['./property-gallery.component.css'],
  providers: [ServerResponseService_gallery],

})
export class PropertyGalleryComponent implements OnInit {
  Videoloader: boolean;

  constructor(public Service2: DataService2, private router: Router, public Service: DataService, public responseService: ServerResponseService_gallery, public cityservice: CityService, @Inject(WINDOW) private window: Window, public location: Location, private titleService: Title, private meta: Meta,) { }
  galleryimages: any;

  propID: any;
  propertiesDetailsnew: any;
  currentCity: any;
  cityname = '';
  cityid: any;
  otploader = false;
  propName: any;
  hideImage = true;

  localityName: any;
  cityName: any;
  ImageUrl = this.Service.imagesURL + 'uploadPropertyImgs/';

  videoimgUrl = 'https://img-mb.homes247.in/images/property_youtube/';


  ngOnInit(): void {
    this.dataLoads()

  }
  @HostListener('window:scroll', ['$event'])
  @HostListener('touchstart', ['$event'])
  onTouchLoad() {
    this.Service.mouseenterservice3();
  }
  dataLoads() {
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

      var urlstructure1 = '/pgv/' + propName + '-in-' + localityName + '-' + cityName + '-photo-gallery-' + propid

      if (this.router.url.indexOf(urlstructure1) > -1) {
      } else {
        this.responseService.set301Status(propName, localityName, cityName, propid);
      }
      this.titleService.setTitle(this.propName + ' Photos & Videos, ' + this.localityName + ', ' + this.cityName);
      this.meta.updateTag({
        name: 'description',
        content: 'Discover images of ' + this.propName + ' in ' + this.localityName + ', ' + this.cityName + '. View all project photos and videos Now, For free property assistance and inquiries, contact - Homes247.in.'
      });
      this.Service.createLinkForCanonicalURL();
    });



    this.Service2.get_amen_appro_banks(this.propID).subscribe(datadetails => {
      let otherdatas = datadetails['details'];
      this.galleryimages = otherdatas[0].images;
    });





  }

  youtube(youtubeLink) {
    this.Videoloader = true;
    var video_wrapper = $('.video_section');
    if (video_wrapper.length) {
      video_wrapper.html('<iframe class="embed-responsive-item" width="100%" height="200" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen src="' + youtubeLink + '?autoplay=1"></iframe>');
    }
    $('.video_section').addClass('video_section_afterclick');
    this.Videoloader = false;
    this.hideImage = false;
  }



}
