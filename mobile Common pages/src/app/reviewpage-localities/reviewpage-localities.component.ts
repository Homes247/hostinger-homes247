import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable, Subscription } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CityService } from '../city.service';
import { WINDOW } from '@ng-toolkit/universal';
import { Meta, Title } from '@angular/platform-browser';
import { DataService2 } from '../data.service2';
// import { ServerResponseService_mainhome } from '../server-response-main-home.service';
// import { ServerResponseService_pclr } from '../server-response-pclr.service';
// import { ServerResponseService_pcr } from '../server-response-pcr.service';
declare var $: any;

declare var $: any;
@Component({
  selector: 'app-reviewpage-localities',
  templateUrl: './reviewpage-localities.component.html',
  styleUrls: ['./reviewpage-localities.component.css']
})
export class ReviewpageLocalitiesComponent implements OnInit {
  p: number = 1;
  myControl = new FormControl();
  options;
  filteredOptions: Observable<any>;

  public minLength: Number = 2;
  public highlight: Boolean = true;
  public fields: Object = { groupBy: 'city', value: 'name' };
  public autoCompleteData: { [key: string]: Object }[] = [];
  public text: string = "Enter Locality Name";



  // current_city_seo:any


  errorMsg = false
  localityValue: any
  totaluserratings: any;
  reviwcount: any;
  citiess: any;
  currentCity = '';
  propertyName: any;
  localityList: any;
  locid: any;
  cityid: any;
  locality_Seo: any;
  locality_Seo1: any;
  cityName_seo1: any;
  currentCity_seo: any;
  LocalityName: any;
  LocalityId: any;
  testing: any;
  currentCity_seo1: any;
  Main_heading = false;
  Main_heading_city = false;
  Main_heading_locality = false;
  propertyimage = this.dataService.imagesURL + 'uploadPropertyImgs/';
  Seo_LocalityId: any;
  SEO_currentCity: any;
  LocalityId_seo: any;

  constructor(private titleService: Title, private meta: Meta, public Service2: DataService2, private dataService: DataService, private router: Router, @Inject(WINDOW) private window: Window, private cityservice: CityService,
    private activeroute: ActivatedRoute
  ) { }


  ngOnInit(): void {
    this.getlocationlist();
    this.getautocomplete();
  }

  @HostListener('window:scroll', ['$event'])
  @HostListener('touchstart', ['$event'])
  onTouchLoad() {
    this.dataService.mouseenterservice3();
  }
  ngAfterViewInit(): void {
    $('.ui.dropdown').dropdown({});
  }

  getautocomplete() {
    var value = this.cityservice.cityfinder(this.router.url);
    this.cityid = value.cityid;
    this.currentCity = value.cityname;

    var params = {
      cityId: this.cityid,
    };
    this.dataService.getlocality(params).subscribe(localitys => {
      this.localityList = localitys['details'];

      if (value.cityname == undefined) {
        this.currentCity = 'Select City';
      } else {
        this.currentCity = value.cityname
        this.LocalityName = ''
      }
    });

    this.localityValue = 'Select Locality'
    this.LocalityId = this.router.url.split('-').pop().match(/[0-9]+/);
    this.LocalityId_seo = this.router.url.split('-').pop().match(/[0-9]+/);;

    if (this.router.url.indexOf('/pclr/') > -1) {

      var localityid = this.router.url.split('-').pop().match(/[0-9]+/);
      if (Number(localityid)) {
      } else if (localityid.indexOf('?') > -1) {
      } else {
        // this.responseService_Main_Home.set301Status();
      }

      var paramlocality = {
        locid: localityid,
      };
      this.dataService.getlocalitymeta(this.currentCity, paramlocality).subscribe(metatag => {
        let metatags = metatag['Localityseo'];  //gowshik edit//
        this.LocalityName = metatags[0].LocalityName;
        var Locality_Seo = this.LocalityName.toLowerCase().replace(/\s+/g, '-');
        var City_Seo = metatags[0].city_name.toLowerCase().replace(/\s+/g, '-');

        if (this.router.url.indexOf('/pclr/') > -1) {
          var urlstructure1 = '/pclr/project-reviews-in-' + Locality_Seo + '-' + City_Seo + '-' + localityid;
        } else {
        }

        if (this.router.url.indexOf('--') > -1) {
          // this.responseService_pclr.set301Status(City_Seo, Locality_Seo, localityid);
        } else if (this.router.url.indexOf(urlstructure1) > -1) {
        } else {
          // this.responseService_pclr.set301Status(City_Seo, Locality_Seo, localityid);
        }
      })
    } else if (this.router.url.indexOf('/pcr/') > -1) {

      if (this.currentCity == undefined) {
        // this.responseService_Main_Home.set301Status();
      } else {
        var City_Seo = this.currentCity.toLowerCase().replace(/\s+/g, '-');
      }

      if (this.router.url.indexOf('/lcr/') > -1) {
        var urlstructure1 = '/lcr/locality-reviews-in-' + City_Seo;
      } else {
      }

      if (this.router.url.indexOf('--') > -1) {
        // this.responseService_pcr.set301Status(City_Seo);
      } else if (this.router.url.indexOf(urlstructure1) > -1) {
      } else {
        // this.responseService_pcr.set301Status(City_Seo);
      }
    } else {
    }

   
    var param = {
      cityId: this.cityid,
    };
    this.dataService.getLocalityReviews(param).subscribe((myLocalList: any[]) => {
      this.propertyName = myLocalList['locality_review_count'];
     
      var prostatus = myLocalList['status']
      if (this.propertyName.length == 0 ) {
        this.errorMsg = true;
        this.propertyName = [];
        this.currentCity = value.cityname
      } else {
        this.errorMsg = false
      }

      if (this.router.url.indexOf('all-locality-reviews-in-india') > -1) {
        this.titleService.setTitle('Across India  - All Locality Reviews & Insights!');
        this.meta.updateTag({
          name: 'description',
          content: 'Get all localities reviews across India. Explore locality highlights, amenities, and real estate trends to find the perfect location for your next investment  - Homes247.in'
        });
        this.dataService.createLinkForCanonicalURL();
        this.Main_heading = true;
        this.Main_heading_city = false;
        this.Main_heading_locality = false;
      } else {
        this.currentCity_seo = this.currentCity.replace(/\s+/g, '-').toLowerCase();
        this.currentCity_seo1 = this.currentCity;
        this.LocalityId = this.LocalityId;
      }
      // var paramlocality = {
      //   locid: this.LocalityId,
      // };
      // this.dataService.getlocalitymeta(this.currentCity, paramlocality).subscribe(metatag => {
      //   let metatags = metatag['Localityseo'];
      //   this.LocalityName = metatags[0].LocalityName;

      //   this.locality_Seo = this.LocalityName.replace(/\s+/g, '-').toLowerCase();

      //   if (this.router.url.indexOf('pclr/project-reviews-in-' + this.locality_Seo + '-' + this.currentCity_seo + '-' + this.LocalityId) > -1) {
      //     this.titleService.setTitle('All customer Ratings and Reviews for ' + this.LocalityName + ', ' + this.currentCity + ' properties | Homes247');
      //     this.meta.updateTag({
      //       name: 'description',
      //       content: 'Get genuine Ratings and Reviews for ' + this.LocalityName + ', ' + this.currentCity + ' properties? Explore the best projects in ' + this.LocalityName + ' on Homes247 portal.'
      //     });
      //     this.dataService.createLinkForCanonicalURL();
      //     this.Main_heading = false;
      //     this.Main_heading_city = false;
      //     this.Main_heading_locality = true;
      //   }
      //   if (this.LocalityId === null) {
      //     this.localityValue = 'Select Locality'
      //   } else {
      //     this.localityValue = this.LocalityName;
      //   }
      // });

      

      if (this.router.url.indexOf('lcr/locality-reviews-in-' + this.currentCity_seo) > -1) {
        // this.titleService.setTitle('Customer Ratings & Reviews of ' + this.currentCity_seo1 + ' Properties-Homes247');
        // this.meta.updateTag({
        //   name: 'description',
        //   content: 'Get genuine Ratings and Reviews for ' + this.currentCity_seo1 + ' properties on our Homes247 portal.Explore the best projects in ' + this.currentCity_seo1 + '. Check it out now!'
        // });
        // this.dataService.createLinkForCanonicalURL();

        this.titleService.setTitle( this.currentCity_seo1 + ' - All Localities Reviews | Explore Before You Move!');
      this.meta.updateTag({
        name: 'description',
        content: 'Check ' + this.currentCity_seo1 + ' Localities Reviews. Unveil insights, amenities, safety, development, and many more before deciding to invest or move in. Check Out Now - Homes247.in '
      });
      this.dataService.createLinkForCanonicalURL();


        this.Main_heading = false;
        this.Main_heading_city = true;
        this.Main_heading_locality = false;
      }
    });

    var param1 = {
      city_id: this.cityid,
    };

    this.dataService.getLocalityautoComplete(param1).subscribe((myLocalList: any[]) => {
      this.autoCompleteData = myLocalList['localityautolist'];

    })

   
  }


  getcityname(event) {
    this.localityValue = 'Select Locality';
    var CityName = event.target.value;
    this.currentCity = CityName.toLowerCase();
    this.currentCity_seo = this.currentCity.replace(/\s+/g, '-')
    this.currentCity_seo1 = CityName;
    var value = this.cityservice.cityfinder(this.currentCity);
    this.cityid = value.cityid;
    this.router.navigate(['/lcr/locality-reviews-in-' + this.currentCity.replace(/\s+/g, '-')]);

    if (this.router.url.indexOf('lcr/locality-reviews-in-' + this.currentCity_seo) > -1) {
      this.titleService.setTitle( this.currentCity_seo1 + ' - All Localities Reviews | Explore Before You Move!');
      this.meta.updateTag({
        name: 'description',
        content: 'Check ' + this.currentCity_seo1 + ' Localities Reviews. Unveil insights, amenities, safety, development, and many more before deciding to invest or move in. Check Out Now - Homes247.in '
      });
      this.dataService.createLinkForCanonicalURL();
      this.Main_heading = false;
      this.Main_heading_city = true;
      this.Main_heading_locality = false;
    }

    var param = {
      cityId: this.cityid,
    };
    this.dataService.getLocalityReviews(param).subscribe((myLocalList: any[]) => {
      this.propertyName = myLocalList['locality_review_count'];
     
      var prostatus = myLocalList['status']
      if (this.propertyName.length == 0 ) {
        this.propertyName = [];
        this.errorMsg = true;
        this.LocalityName = ''
      } else {
        this.errorMsg = false;
       

      }

    });


    var params = {
      cityId: this.cityid,
    };
    this.dataService.getlocality(params).subscribe(localitys => {
      this.localityList = localitys['details'];
    });
  }





  selectEvent(event) {
  
    var currentLocality = event.itemData.name;
    var currentLocalityId = event.itemData.id;
    var currentCityId = event.itemData.cityId;
    this.getProjectsclick(currentLocality, currentLocalityId,currentCityId);
  }

  getProjectsclick(currentLocality, currentLocalityId,currentCityId) {
    localStorage.setItem('Locality_Name', currentLocality);
    var locality = currentLocality.toLowerCase();
    var localityId = currentLocalityId;
  
    this.router.navigate(['/lrd/rating-and-reviews-of-' + locality.replace(/\s+/g, '-') + '-' + localityId +'-'+ currentCityId]);
  }
  scrollTop() {
    this.window.scroll({
      top: 400,
      left: 0,
      behavior: 'smooth'
    });
  }

  getlocationlist() {
    this.dataService.getlocationlist().subscribe((city: any[]) => {
      this.citiess = city['locations'];
    });
  }

}
