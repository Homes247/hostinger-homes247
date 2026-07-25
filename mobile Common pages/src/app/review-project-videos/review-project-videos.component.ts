import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
// import { map, startWith } from 'rxjs/operators';
import { WINDOW } from '@ng-toolkit/universal';
import { ActivatedRoute, Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { CityService } from '../city.service';
import { ServerResponseService_pclv } from '../server-response-pclv.service';
import { ServerResponseService_pcv } from '../server-response-pcv.service';
import { ServerResponseService_mainhome } from '../server-response-main-home.service';
declare var $: any;


declare var $: any;
@Component({
  selector: 'app-review-project-videos',
  templateUrl: './review-project-videos.component.html',
  styleUrls: ['./review-project-videos.component.css'],
  providers: [ServerResponseService_pclv, ServerResponseService_pcv, ServerResponseService_mainhome]

})
export class ReviewProjectVideosComponent implements OnInit {



  // currentCitySearchNav;
  data: any
  currentPropertyId: any
  topProperties = [];
  myControl = new FormControl();
  options;
  filteredOptions: Observable<any>;

  public minLength: Number = 2;
  public highlight: Boolean = true;
  public fields: Object = { groupBy: 'locality', value: 'property' };
  public autoCompleteData: { [key: string]: Object }[] = [];
  public text: string = "Enter Properties and Localities";


  errorMsg = false;
  LocalityName: any;
  LocalityId: any;
  localityValue: any
  localityList: any;
  p: number = 1;
  locid: any;
  citiess: any;
  currentCity = '';
  reviewPropertyVideos: any;
  videoList1: any;
  videoList2: any;
  cityid: any;
  VideoName: any;
  VideoDate: any;
  VideoId: any;
  VideoUrlstruture: any;
  testing: any;
  localityNameId: any;
  locName: any;

  locality_Seo: any;
  locality_Seo1: any;
  cityName_seo1: any;
  currentCity_seo: any;
  currentCity_seo1: any;
  mainTag = false;
  Seo_LocalityId: any;
  SEO_currentCity: string;
  LocalityId_seo: string;


  constructor(private titleService: Title, private meta: Meta, private activatedRoute: ActivatedRoute, private dataService: DataService, private router: Router, @Inject(WINDOW) private window: Window, private cityservice: CityService,
    public responseService_pclv: ServerResponseService_pclv,
    public responseService_pcv: ServerResponseService_pcv,
    public responseService_Main_Home: ServerResponseService_mainhome,) { }

  ngOnInit(): void {
    this.getlocationlist();
    this.getautocomplete();
    this.dataService.createLinkForCanonicalURL();
  }
  @HostListener('window:scroll', ['$event'])
  @HostListener('touchstart', ['$event'])
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

    if (this.router.url.indexOf('/pclv/') > -1) {

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
        var CityName = metatags[0].city_name


      var shortLocalityName = this.LocalityName?.split(' ').slice(0, 3).join(' ');

        this.titleService.setTitle(
          this.getSeoTitle(
            `View Property Walkthroughs in ${this.LocalityName} | Homes247.in`,
            `Walkthroughs ${shortLocalityName}`
          )
        );

        this.meta.updateTag({
          name: 'description',
          content: `Watch latest project walkthrough videos for residential properties in ${this.LocalityName}. Find your dream home on Homes247.in today.`
        });
        const image = 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp';
        const url = 'https://www.homes247.in' + this.router.url;

        // Open Graph
        this.meta.updateTag({ property: 'og:title', content: 'Uncover the Beauty of ' + this.LocalityName + ' Property Walkthrough Videos' });
        this.meta.updateTag({ property: 'og:description', content: 'Take a Virtual Tour with our captivating property walkthrough videos of ' + this.LocalityName + ' properties. Discover elevations, interiors, & unique features of your perfect home' });
        this.meta.updateTag({ property: 'og:image', content: image });
        this.meta.updateTag({ property: 'og:url', content: url });
        this.meta.updateTag({ property: 'og:type', content: 'website' });

        // Twitter Card
        this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
        this.meta.updateTag({ name: 'twitter:title', content: 'Uncover the Beauty of ' + this.LocalityName + ' Property Walkthrough Videos' });
        this.meta.updateTag({ name: 'twitter:description', content: 'Explore every corner of your dream property with our immersive property walkthrough video. Get a virtual tour of the stunning interiors, luxurious amenities, and breathtaking views.' });
        this.meta.updateTag({ name: 'twitter:image', content: image });


        if (this.router.url.indexOf('/pclv/') > -1) {
          var urlstructure1 = '/pclv/project-walkthrough-videos-in-' + Locality_Seo + '-' + City_Seo + '-' + localityid;
        } else {
        }

        if (this.router.url.indexOf('--') > -1) {
          this.responseService_pclv.set301Status(City_Seo, Locality_Seo, localityid);
        } else if (this.router.url.indexOf(urlstructure1) > -1) {
        } else {
          this.responseService_pclv.set301Status(City_Seo, Locality_Seo, localityid);
        }
      })

      this.mainTag = false;
      this.CityTag = false;
      this.LocalityTag = true;
      if (this.LocalityId === null) {
        this.localityValue = 'Select Locality'
      } else {
        this.localityValue = this.LocalityName;
      }
    } else if (this.router.url.indexOf('/pcv/') > -1) {

      if (this.currentCity == undefined) {
        this.responseService_Main_Home.set301Status();
      } else {
        var City_Seo = this.currentCity.toLowerCase().replace(/\s+/g, '-');
      }

      if (this.router.url.indexOf('/pcv/') > -1) {
        var urlstructure1 = '/pcv/project-walkthrough-videos-in-' + City_Seo;
      } else {
      }

      if (this.router.url.indexOf('--') > -1) {
        this.responseService_pcv.set301Status(City_Seo);
      } else if (this.router.url.indexOf(urlstructure1) > -1) {
      } else {
        this.responseService_pcv.set301Status(City_Seo);
      }



      this.titleService.setTitle(
        this.getSeoTitle(
          `Watch Project Walkthrough Videos in ${this.currentCity} | Homes247`,
          `Watch Project Walkthrough Videos: ${this.currentCity} | Homes247`
        )
      );

      this.meta.updateTag({
        name: 'description',
        content: `Watch project walkthrough videos in ${this.currentCity}. Explore flats, villas & projects with virtual tours only on Homes247.in. Visit now!`
      });
      const image = 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp';
      const url = 'https://www.homes247.in' + this.router.url;

      // Open Graph
      this.meta.updateTag({ property: 'og:title', content: 'Exclusive ' + this.currentCity + ' Property Walkthrough Videos - Homes247' });
      this.meta.updateTag({ property: 'og:description', content: 'Experience the best properties in ' + this.currentCity + ' through our immersive property walkthrough videos. Explore stunning villas & apartments in the city & find your perfect place to call home.' });
      this.meta.updateTag({ property: 'og:image', content: image });
      this.meta.updateTag({ property: 'og:url', content: url });
      this.meta.updateTag({ property: 'og:type', content: 'website' });

      // Twitter Card
      this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
      this.meta.updateTag({ name: 'twitter:title', content: 'Exclusive ' + this.currentCity + ' Property Walkthrough Videos - Homes247' });
      this.meta.updateTag({ name: 'twitter:description', content: 'Experience the best properties in ' + this.currentCity + ' through our immersive property walkthrough videos. Explore stunning villas & apartments in the city & find your perfect place to call home.' });
      this.meta.updateTag({ name: 'twitter:image', content: image });


      this.mainTag = false;
      this.CityTag = true;
      this.LocalityTag = false;
    } else if (this.router.url.indexOf('all-project-walkthrough-videos-in-india') > -1) {
      this.titleService.setTitle('Explore your Dream Home: Captivating Property Walkthroughs');
      this.meta.updateTag({
        name: 'description',
        content: 'Explore every corner of your dream property with our immersive property walkthrough video. Get a virtual tour of the stunning interiors, luxurious amenities, and breathtaking views.'
      });
      const image = 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp';
      const url = 'https://www.homes247.in' + this.router.url;

      // Open Graph
      this.meta.updateTag({ property: 'og:title', content: 'Explore your Dream Home: Captivating Property Walkthroughs' });
      this.meta.updateTag({ property: 'og:description', content: 'Explore every corner of your dream property with our immersive property walkthrough video. Get a virtual tour of the stunning interiors, luxurious amenities, and breathtaking views.' });
      this.meta.updateTag({ property: 'og:image', content: image });
      this.meta.updateTag({ property: 'og:url', content: url });
      this.meta.updateTag({ property: 'og:type', content: 'website' });

      // Twitter Card
      this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
      this.meta.updateTag({ name: 'twitter:title', content: 'Explore your Dream Home: Captivating Property Walkthroughs' });
      this.meta.updateTag({ name: 'twitter:description', content: 'Explore every corner of your dream property with our immersive property walkthrough video. Get a virtual tour of the stunning interiors, luxurious amenities, and breathtaking views.' });
      this.meta.updateTag({ name: 'twitter:image', content: image });
      this.mainTag = true;
      this.CityTag = false;
      this.LocalityTag = false;
    } else {
      this.titleService.setTitle('Explore your Dream Home: Captivating Property Walkthroughs');
      this.meta.updateTag({
        name: 'description',
        content: 'Explore every corner of your dream property with our immersive property walkthrough video. Get a virtual tour of the stunning interiors, luxurious amenities, and breathtaking views.'
      });

      const image = 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp';
      const url = 'https://www.homes247.in' + this.router.url;

      // Open Graph
      this.meta.updateTag({ property: 'og:title', content: 'Explore your Dream Home: Captivating Property Walkthroughs' });
      this.meta.updateTag({ property: 'og:description', content: 'Explore every corner of your dream property with our immersive property walkthrough video. Get a virtual tour of the stunning interiors, luxurious amenities, and breathtaking views.' });
      this.meta.updateTag({ property: 'og:image', content: image });
      this.meta.updateTag({ property: 'og:url', content: url });
      this.meta.updateTag({ property: 'og:type', content: 'website' });

      // Twitter Card
      this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
      this.meta.updateTag({ name: 'twitter:title', content: 'Explore your Dream Home: Captivating Property Walkthroughs' });
      this.meta.updateTag({ name: 'twitter:description', content: 'Explore every corner of your dream property with our immersive property walkthrough video. Get a virtual tour of the stunning interiors, luxurious amenities, and breathtaking views.' });
      this.meta.updateTag({ name: 'twitter:image', content: image });
    }

    var param = {
      cityid: this.cityid,
      locid: this.LocalityId
    };
    this.dataService.getPropertyReviewsVideos(param).subscribe((myLocalList: any[]) => {
      if (myLocalList['status'] == 'True') {
        this.autoCompleteData = myLocalList['property_videos'];
        this.reviewPropertyVideos = this.autoCompleteData;
        var prostatus = myLocalList['status']
        if (prostatus === 'False') {
          this.errorMsg = true;
          this.reviewPropertyVideos = [];
          this.currentCity = value.cityname
        } else {
          this.errorMsg = false;
        }
        this.videoList1 = this.reviewPropertyVideos.length
        this.videoList2 = this.reviewPropertyVideos.length / 2;

        // if (this.router.url.indexOf('all-project-walkthrough-videos-in-india') > -1) {
        //   // this.mainTag = true;
        //   // this.CityTag = false;
        //   // this.LocalityTag = false;
        // } else {
        //   this.currentCity_seo = this.currentCity.replace(/\s+/g, '-').toLowerCase();
        //   this.currentCity_seo1 = this.currentCity;
        //   this.LocalityId = this.LocalityId;
        // }
        // var paramlocality = {
        //   locid: this.LocalityId,
        // };
        // this.dataService.getlocalitymeta(this.currentCity, paramlocality).subscribe(metatag => {
        //   let metatags = metatag['Localityseo'];
        //   this.LocalityName = metatags[0].LocalityName;
        //   this.locality_Seo = this.LocalityName.replace(/\s+/g, '-').toLowerCase();
        // if (this.router.url.indexOf('pclv/project-walkthrough-videos-in-' + this.locality_Seo + '-' + this.currentCity_seo + '-' + this.LocalityId) > -1) {
        //   this.mainTag = false;
        //   this.CityTag = false;
        //   this.LocalityTag = true;
        // }
        // if (this.LocalityId === null) {
        //   this.localityValue = 'Select Locality'
        // } else {
        //   this.localityValue = this.LocalityName;
        // }

        // });
        // if (this.router.url.indexOf('pcv/project-walkthrough-videos-in-' + this.currentCity_seo) > -1) {
        //   this.mainTag = false;
        //   this.CityTag = true;
        //   this.LocalityTag = false;
        // }
      }
    });
  }


  CityTag = false;
  getcityname(event) {
    this.localityValue = 'Select Locality';
    var CityName = event.target.value;
    this.currentCity = CityName.toLowerCase();
    this.currentCity_seo = this.currentCity.replace(/\s+/g, '-')
    this.currentCity_seo1 = CityName;
    var value = this.cityservice.cityfinder(this.currentCity);
    this.cityid = value.cityid;
    this.router.navigate(['/pcv/project-walkthrough-videos-in-' + this.currentCity.replace(/\s+/g, '-')]);

    if (this.router.url.indexOf('pcv/project-walkthrough-videos-in-' + this.currentCity_seo) > -1) {
      this.mainTag = false;
      this.CityTag = true;
      this.LocalityTag = false;
    }

    this.locid = [];
    var param = {
      cityid: this.cityid,
    };
    this.dataService.getPropertyReviewsVideos(param).subscribe((myLocalList: any[]) => {
      this.autoCompleteData = myLocalList['property_videos'];
      this.reviewPropertyVideos = this.autoCompleteData;
      var prostatus = myLocalList['status']
      if (prostatus == 'False') {
        this.reviewPropertyVideos = [];
        this.errorMsg = true;
        this.LocalityName = ''
      } else {
        this.errorMsg = false;
        this.reviewPropertyVideos = this.autoCompleteData;

      }
      this.videoList1 = this.reviewPropertyVideos.length
      this.videoList2 = this.reviewPropertyVideos.length / 2
      // this.getautocomplete();
    });

    // 

    var params = {
      cityId: this.cityid,
    };
    this.dataService.getlocality(params).subscribe(localitys => {
      this.localityList = localitys['details'];
    });
  }
  LocalityTag = false;
  onLocalityChange(event) {
    this.LocalityName = event.target.options[event.target.selectedIndex].text;
    this.LocalityId = event.target.value;
    // 

    this.router.navigate(['/pclv/project-walkthrough-videos-in-' + this.LocalityName.replace(/\s+/g, '-').toLowerCase() + '-' + this.currentCity.toLowerCase().replace(/\s+/g, '-') + '-' + this.LocalityId]);

    this.currentCity_seo = this.currentCity.toLowerCase().replace(/\s+/g, '-')

    var param = {
      cityid: this.cityid,
      locid: this.LocalityId
    };
    this.dataService.getPropertyReviewsVideos(param).subscribe((myLocalList: any[]) => {
      this.autoCompleteData = myLocalList['property_videos'];
      this.reviewPropertyVideos = this.autoCompleteData;
      var prostatus = myLocalList['status']
      if (prostatus === 'False') {
        this.errorMsg = true
        this.reviewPropertyVideos = []
      } else {
        this.errorMsg = false
        this.reviewPropertyVideos = this.autoCompleteData;
      }
      this.videoList1 = this.reviewPropertyVideos.length
      this.videoList2 = this.reviewPropertyVideos.length / 2

      this.locality_Seo = this.LocalityName.replace(/\s+/g, '-').toLowerCase();

      if (this.router.url.indexOf('pclv/project-walkthrough-videos-in-' + this.LocalityName.replace(/\s+/g, '-').toLowerCase() + '-' + this.currentCity_seo + '-' + this.LocalityId) > -1) {
        this.mainTag = false;
        this.CityTag = false;
        this.LocalityTag = true;
      }

    });

  }
  Closing_video() {
    $(".modal-body iframe").attr("src", $(".modal-body iframe").attr("src"));
  }
  youtubeVideo(video_URL, blogDetail) {

    var video_wrapper = $('.modal-body');

    video_wrapper.html('<iframe class="embed-responsive-item" width="80%;" height="320px" frameborder="0" allowfullscreen src="' + video_URL + '?"></iframe>');
    // 
    this.VideoName = blogDetail['property'];
    this.VideoUrlstruture = blogDetail['video_URL'];

  }


  selectEvent(event) {
    var currentCity = event.itemData.city;
    this.currentPropertyId = event.itemData.propertyid;
    // 

    this.getProjectsclick(currentCity);
  }

  getProjectsclick(currentCity) {
    this.currentCity = 'Bangalore';
    localStorage.setItem('CityName', currentCity);
    var cityname = currentCity.toLowerCase();
    this.router.navigate([cityname + '/property-sale']);
  }

  getlocationlist() {
    this.dataService.getlocationlist().subscribe((city: any[]) => {
      this.citiess = city['locations'];
    });
  }

  scrollTop() {
    this.window.scroll({
      top: 300,
      left: 0,
      behavior: 'smooth'
    });
  }

}
