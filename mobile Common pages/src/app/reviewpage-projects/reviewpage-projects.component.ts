import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable, Subscription } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CityService } from '../city.service';
import { WINDOW } from '@ng-toolkit/universal';
import { Meta, Title } from '@angular/platform-browser';
import { DataService2 } from '../data.service2';
import { ServerResponseService_mainhome } from '../server-response-main-home.service';
import { ServerResponseService_pclr } from '../server-response-pclr.service';
import { ServerResponseService_pcr } from '../server-response-pcr.service';

declare var $: any;

declare var $: any;
@Component({
  selector: 'app-reviewpage-projects',
  templateUrl: './reviewpage-projects.component.html',
  styleUrls: ['./reviewpage-projects.component.css'],
  providers: [ServerResponseService_pclr, ServerResponseService_pcr, ServerResponseService_mainhome]

})
export class ReviewpageProjectsComponent implements OnInit {

  p: number = 1;
  myControl = new FormControl();
  options;
  filteredOptions: Observable<any>;

  public minLength: Number = 2;
  public highlight: Boolean = true;
  public fields: Object = { groupBy: 'locality', value: 'property' };
  public autoCompleteData: { [key: string]: Object }[] = [];
  public text: string = "Enter Properties and Localities";



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
    private activeroute: ActivatedRoute, public responseService_pclr: ServerResponseService_pclr,
    public responseService_pcr: ServerResponseService_pcr,
    public responseService_Main_Home: ServerResponseService_mainhome,) { }


  ngOnInit(): void {
    this.getlocationlist();
    this.getautocomplete();
    this.dataService.createLinkForCanonicalURL();
  }

  @HostListener('window:scroll', [])
  @HostListener('touchstart', [])
  onTouchLoad() {
    this.dataService.mouseenterservice3();
  }
  ngAfterViewInit(): void {
    $('.ui.dropdown').dropdown({});
  }

  getSeoTitle(shortTitle: string, longTitle: string): string {
    return shortTitle.length <= 60 ? shortTitle : longTitle;
  }

  getautocomplete() {
    var value = this.cityservice.cityfinder(this.router.url);
    // this.currentCity = value.cityname;
    
    if (value.cityname == undefined) {
      this.currentCity = 'Select City';
      this.cityid = '1';
    } else {
      this.currentCity = value.cityname
      this.cityid = value.cityid;
      this.LocalityName = ''
    }

    var params = {
      cityId: this.cityid,
    };
    this.dataService.getlocality(params).subscribe(localitys => {
      this.localityList = localitys['details'];
    });

    this.localityValue = 'Select Locality'
    this.LocalityId = this.router.url.split('-').pop().match(/[0-9]+/);
    this.LocalityId_seo = this.router.url.split('-').pop().match(/[0-9]+/);;

    if (this.router.url.indexOf('/pclr/') > -1) {

      var localityid = this.router.url.split('-').pop().match(/[0-9]+/);
      if (Number(localityid)) {  
      } else if (localityid.indexOf('?') > -1) {
      } else {
        this.responseService_Main_Home.set301Status();
      }

      var paramlocality = {
        locid: localityid,
      };
      this.dataService.getlocalitymeta(this.currentCity, paramlocality).subscribe(metatag => {
        let metatags = metatag['Localityseo'];  //gowshik edit//
        this.LocalityName = metatags[0].LocalityName;
        var Locality_Seo = this.LocalityName.toLowerCase().replace(/\s+/g, '-');
        var City_Seo = metatags[0].city_name.toLowerCase().replace(/\s+/g, '-');

        var shortLocalityName = this.LocalityName?.split(' ').slice(0, 3).join(' ');



        this.titleService.setTitle(
          this.getSeoTitle(
            `Project Reviews in ${this.LocalityName}, ${this.currentCity} | Homes247`,
            `Project Reviews ${shortLocalityName}`
          )
        );

        this.meta.updateTag({
          name: 'description',
          content: `Read genuine customer ratings and expert reviews for residential projects in ${this.LocalityName}. Find your dream home on Homes247.`
        });

        const image = 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp';
        const url = 'https://www.homes247.in' + this.router.url;
        // Open Graph
        this.meta.updateTag({ property: 'og:title', content: 'Project Reviews ' + this.LocalityName + ' ' + this.currentCity });
        this.meta.updateTag({ property: 'og:description', content: 'Get genuine Ratings and Reviews for ' + this.LocalityName + ', ' + this.currentCity + ' properties? Explore the best projects in ' + this.LocalityName + ' on Homes247 portal.' });
        this.meta.updateTag({ property: 'og:image', content: image });
        this.meta.updateTag({ property: 'og:url', content: url });
        this.meta.updateTag({ property: 'og:type', content: 'website' });

        // Twitter Card
        this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
        this.meta.updateTag({ name: 'twitter:title', content: 'Project Reviews ' + this.LocalityName + ' ' + this.currentCity });
        this.meta.updateTag({ name: 'twitter:description', content: 'Get genuine Ratings and Reviews for ' + this.LocalityName + ', ' + this.currentCity + ' properties? Explore the best projects in ' + this.LocalityName + ' on Homes247 portal.' });
        this.meta.updateTag({ name: 'twitter:image', content: image });

        if (this.router.url.indexOf('/pclr/') > -1) {
          var urlstructure1 = '/pclr/project-reviews-in-' + Locality_Seo + '-' + City_Seo + '-' + localityid;
        } else {
        }

        if (this.router.url.indexOf('--') > -1) {
          this.responseService_pclr.set301Status(City_Seo, Locality_Seo, localityid);
        } else if (this.router.url.indexOf(urlstructure1) > -1) {
        } else {
          this.responseService_pclr.set301Status(City_Seo, Locality_Seo, localityid);
        }
      })

      this.Main_heading = false;
      this.Main_heading_city = false;
      this.Main_heading_locality = true;

      if (this.LocalityId === null) {
        this.localityValue = 'Select Locality'
      } else {
        this.localityValue = this.LocalityName;
      }
    } else if (this.router.url.indexOf('/pcr/') > -1) {

      if (this.currentCity == undefined) {
        this.responseService_Main_Home.set301Status();
      } else {
        var City_Seo = this.currentCity.toLowerCase().replace(/\s+/g, '-');
      }

      if (this.router.url.indexOf('/pcr/') > -1) {
        var urlstructure1 = '/pcr/project-reviews-in-' + City_Seo;
      } else {
      }

      if (this.router.url.indexOf('--') > -1) {
        this.responseService_pcr.set301Status(City_Seo);
      } else if (this.router.url.indexOf(urlstructure1) > -1) {
      } else {
        this.responseService_pcr.set301Status(City_Seo);
      }

      this.titleService.setTitle('Customer Ratings & Reviews of ' + this.currentCity + ' Properties-Homes247');
      this.meta.updateTag({
        name: 'description',
        content: 'Get genuine Ratings and Reviews for ' + this.currentCity + ' properties on our Homes247 portal.Explore the best projects in ' + this.currentCity + '. Check it out now!'
      });

      const image = 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp';
      const url = 'https://www.homes247.in' + this.router.url;
      // Open Graph
      this.meta.updateTag({ property: 'og:title', content: 'Customer Ratings & Reviews of ' + this.currentCity + ' Properties-Homes247' });
      this.meta.updateTag({ property: 'og:description', content: 'Get genuine Ratings and Reviews for ' + this.currentCity + ' properties on our Homes247 portal.Explore the best projects in ' + this.currentCity + '. Check it out now!' });
      this.meta.updateTag({ property: 'og:image', content: image });
      this.meta.updateTag({ property: 'og:url', content: url });
      this.meta.updateTag({ property: 'og:type', content: 'website' });

      // Twitter Card
      this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
      this.meta.updateTag({ name: 'twitter:title', content: 'Customer Ratings & Reviews of ' + this.currentCity + ' Properties-Homes247' });
      this.meta.updateTag({ name: 'twitter:description', content: 'Get genuine Ratings and Reviews for ' + this.currentCity + ' properties on our Homes247 portal.Explore the best projects in ' + this.currentCity + '. Check it out now!' });
      this.meta.updateTag({ name: 'twitter:image', content: image });



      this.Main_heading = false;
      this.Main_heading_city = true;
      this.Main_heading_locality = false;

    } else if (this.router.url.indexOf('all-project-reviews-in-india') > -1) {
      this.titleService.setTitle('Ratings and Reviews For All Properties in India | Homes247');
      this.meta.updateTag({
        name: 'description',
        content: 'Looking for project ratings and reviews? Discover the best projects on our dedicated portal. Get valuable insights and make informed decisions based on Customer ratings and feedback.'
      });
      const image = 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp';
      const url = 'https://www.homes247.in' + this.router.url;
      // Open Graph
      this.meta.updateTag({ property: 'og:title', content: 'Ratings and Reviews For All Properties in India | Homes247' });
      this.meta.updateTag({ property: 'og:description', content: 'Looking for project ratings and reviews? Discover the best projects on our dedicated portal. Get valuable insights and make informed decisions based on Customer ratings and feedback.' });
      this.meta.updateTag({ property: 'og:image', content: image });
      this.meta.updateTag({ property: 'og:url', content: url });
      this.meta.updateTag({ property: 'og:type', content: 'website' });

      // Twitter Card
      this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
      this.meta.updateTag({ name: 'twitter:title', content: 'Ratings and Reviews For All Properties in India | Homes247' });
      this.meta.updateTag({ name: 'twitter:description', content: 'Looking for project ratings and reviews? Discover the best projects on our dedicated portal. Get valuable insights and make informed decisions based on Customer ratings and feedback.' });
      this.meta.updateTag({ name: 'twitter:image', content: image });

      this.Main_heading = true;
      this.Main_heading_city = false;
      this.Main_heading_locality = false;
    } else {

    }


    var param = {
      cityid: this.cityid,
      locid: this.LocalityId
    };

    this.dataService.getPropertyReviews(param).subscribe((myLocalList: any[]) => {
      if (myLocalList['status'] == 'True') {
        this.autoCompleteData = myLocalList['property_reviews'];
        this.propertyName = this.autoCompleteData;
        var prostatus = myLocalList['status']
        if (prostatus === 'False') {
          this.errorMsg = true;
          this.propertyName = [];
          this.currentCity = value.cityname
        } else {
          this.errorMsg = false
        }
      }
    });
  }


  getcityname(event) {
    this.localityValue = 'Select Locality';
    var CityName = event.target.value;
    this.currentCity = CityName.toLowerCase();
    this.currentCity_seo = this.currentCity.replace(/\s+/g, '-')
    this.currentCity_seo1 = CityName;
    var value = this.cityservice.cityfinder(this.currentCity);
    this.cityid = value.cityid;
    this.router.navigate(['/pcr/project-reviews-in-' + this.currentCity.replace(/\s+/g, '-')]);
    var param = {
      cityid: this.cityid,
    };
    this.dataService.getPropertyReviews(param).subscribe((myLocalList: any[]) => {
      this.autoCompleteData = myLocalList['property_reviews'];
      this.propertyName = this.autoCompleteData;
      var prostatus = myLocalList['status']
      if (prostatus == 'False') {
        this.propertyName = [];
        this.errorMsg = true;
        this.LocalityName = ''
      } else {
        this.errorMsg = false;
        this.propertyName = this.autoCompleteData;
      }

    });


    var params = {
      cityId: this.cityid,
    };
    this.dataService.getlocality(params).subscribe(localitys => {
      this.localityList = localitys['details'];
    });
  }

  onLocalityChange(event) {
    this.LocalityName = event.target.options[event.target.selectedIndex].text;
    this.LocalityId = event.target.value;
    this.router.navigate(['/pclr/project-reviews-in-' + this.LocalityName.replace(/\s+/g, '-').toLowerCase() + '-' + this.currentCity.toLowerCase().replace(/\s+/g, '-') + '-' + this.LocalityId]);
    this.currentCity_seo = this.currentCity.toLowerCase().replace(/\s+/g, '-')

    var param = {
      cityid: this.cityid,
      locid: this.LocalityId
    };
    this.dataService.getPropertyReviews(param).subscribe((myLocalList: any[]) => {
      this.autoCompleteData = myLocalList['property_reviews'];
      this.propertyName = this.autoCompleteData;
      var prostatus = myLocalList['status']
      if (prostatus === 'False') {
        this.errorMsg = true
        this.propertyName = []
      } else {
        this.errorMsg = false
        this.propertyName = this.autoCompleteData;
      }
      this.locality_Seo = this.LocalityName.replace(/\s+/g, '-').toLowerCase();
    });

  }



  selectEvent(event) {
    var currentProperty = event.itemData.property;
    var currentPropertyId = event.itemData.propertyid;
    this.getProjectsclick(currentProperty, currentPropertyId);
  }

  getProjectsclick(currentProperty, currentPropertyId) {
    localStorage.setItem('Property_Name', currentProperty);
    var propName = currentProperty.toLowerCase();
    var propID = currentPropertyId
    this.router.navigate(['/prd/rating-and-reviews-of-' + propName.replace(/\s+/g, '-') + '-' + propID]);
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
