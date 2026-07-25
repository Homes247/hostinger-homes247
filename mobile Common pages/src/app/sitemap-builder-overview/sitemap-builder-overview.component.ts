import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { WINDOW } from '@ng-toolkit/universal';
import {Meta, Title} from '@angular/platform-browser';
import { DataService } from '../data.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
// import { RentalsService } from '../rentals.service';
import { CityService } from '../city.service';
declare var $: any;
@Component({
  selector: 'app-sitemap-builder-overview',
  templateUrl: './sitemap-builder-overview.component.html',
  styleUrls: ['./sitemap-builder-overview.component.css']
})
export class SitemapBuilderOverviewComponent implements OnInit {
  firstCopy = false;
  propertyimage = this.Service.imagesURL + 'uploadPropertyImgs/';
  ImageUrlstories = this.Service.imagesURL + 'stories/';
  thirtyLakhs: any;
  fourtytofifety;
  fifetytosixety;
  sixetytoseventy;
  seventytoeighty;
  ninetytocrore;
  eightytoninety;
  aboveonecrore;
  allbuildercount;
  value = '1';
  thirtytofourty;
  upComingDetails;
  bestOffersList;
  bestOffersCount;
  maxPrice;
  minPrice;
  btccount;
  btccount3;
  btccount4;
  flats30lakhscounts;
  flats50to60lakhscounts;
  flats60to70lakhscounts;
  bstccount;
  bstccount3;
  bstccount4;
  rentalsProjectCount;
  IndividualPropertiesCount;
  readyToMoveDetailsList;
  underConstructionDetailLists;
  allBlogs;
  localityShow = true;
  showLoaderreadyToMove = true;
  showLoaderBestOffers = true;
  showLoaderunderConstructionDetailLists = true;
  // cityId = '1';
  cityDescp: string;

  // city = 'bangalore';
  customOptionsOffers: OwlOptions = {
    loop: true,
    autoplay: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 500,
    // animateIn: 'fadeIn',
    // animateOut: 'fadeOut',
    // nav: false,
    // navText: ['<img src=https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_mobile/images/leftarrow.png alt=\'LeftArrow\' class=\'owl-nav owl-prev left-icon\'>',
    //   '<img src=https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_mobile/images/rightarrow.png alt=\'RightArrow\' class=\'owl-nav owl-next right-icon\'>'],
    responsive: {
      0: {
        items: 1
      },
      480: {
        items: 2
      },
      700: {
        items: 5
      },
      940: {
        items: 5
      }
    },
  };

  customOptionsOffers1: OwlOptions = {
    loop: true,
    autoplay: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 500,
    // animateIn: 'fadeIn',
    // animateOut: 'fadeOut',
    // nav: false,
    // navText: ['<img src=https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_mobile/images/leftarrow.png alt=\'LeftArrow\' class=\'owl-nav owl-prev left-icon\'>',
    //   '<img src=https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_mobile/images/rightarrow.png alt=\'RightArrow\' class=\'owl-nav owl-next right-icon\'>'],
    responsive: {
      0: {
        items: 6
      },
      480: {
        items: 6
      },
      700: {
        items: 5
      },
      940: {
        items: 5
      }
    },
  };

  customOptionsOffers2: OwlOptions = {
    loop: true,
    autoplay: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 500,
    // animateIn: 'fadeIn',
    // animateOut: 'fadeOut',
    // nav: false,
    // navText: ['<img src=https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_mobile/images/leftarrow.png alt=\'LeftArrow\' class=\'owl-nav owl-prev left-icon\'>',
    //   '<img src=https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_mobile/images/rightarrow.png alt=\'RightArrow\' class=\'owl-nav owl-next right-icon\'>'],
    responsive: {
      0: {
        items: 6
      },
      480: {
        items: 6
      },
      700: {
        items: 6
      },
      940: {
        items: 6
      }
    },
  };
  citylower: any;
  city: any;
  cityId: any;
  autoCompleteData: any;
  builder_seo: any;
  builder: any;
  builderid: any;
  metacity: any;
  constructor(private router: Router,
    private _location: Location,
    public Service: DataService,
    // public RentService: RentalsService,
    public cityservice: CityService,private titleService: Title,private meta: Meta,
    // private completerService: CompleterService,
    @Inject(WINDOW) private window: Window) {
    this.bestOffersList = [];
    this.readyToMoveDetailsList = [];
    this.underConstructionDetailLists = [];
  }
  cityname:any;
  @HostListener('window:scroll', ['$event'])
  @HostListener('touchstart', ['$event'])
  onWindowScroll() {
    this.Service.mouseenterservice3();
  }
  ngOnInit() {
    
    var value = this.cityservice.cityfinder(this.router.url);
    this.cityname = value.cityname;
    this.citylower = value.cityname.toLowerCase();
    this.cityId = value.cityid;
   
    this.getmeta();
    this.allProperties();
    this.allProperties2();
    this.onReadyToMove();
    this.flatscitycount();
    this.villascitycount();
    this.villascitycount2();
    this.villascitycount3();
    this.villascitycount4();
    this.villascitycount5();

    this.onNewLanches();
    this.upComingProp();
    this.btcdatafetch();
    this.fbcdatafetch();
    this.bstccountfetch();
    this.bologsList();
    this.getTopProjects();
    // this.getOffersDesktopView();
    // this.rentalsCount();
    // this.individualCount();
    this.getAutocomp();

    var giftofspeed = document.createElement('link');
    giftofspeed.rel = 'stylesheet';
    giftofspeed.href = 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/plugins/ngx-owl-carousel-o/lib/styles/prebuilt-themes/owl.carousel.min.css';
    giftofspeed.type = 'text/css';
    var godefer = document.getElementsByTagName('link')[0];
    godefer.parentNode.insertBefore(giftofspeed, godefer);

    var giftofspeed2 = document.createElement('link');
    giftofspeed2.rel = 'stylesheet';
    giftofspeed2.href = 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/plugins/ngx-owl-carousel-o/lib/styles/prebuilt-themes/owl.theme.default.min.css';
    giftofspeed2.type = 'text/css';
    var godefer2 = document.getElementsByTagName('link')[0];
    godefer2.parentNode.insertBefore(giftofspeed2, godefer2);
  }
  getmeta() {
    String.prototype.toLocaleUpperCase = function () {
      return this.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
    };
    var capsname = this.cityname.toLocaleUpperCase();
    this.city = capsname.replace('-', ' ');
    this.metacity = this.city.toLowerCase().replace(/\s+/g, '-');
    var urelend = this.router.url.split('-').pop().match(/[0-9]+/);
    this.builderid = urelend;

    var param = {
      buildid: urelend,
      Cityid: this.cityId
    };
    this.Service.getbuildermeta(this.cityname, param).subscribe(metatag => {
      let metatags = metatag['Builderseo'];
      this.builder = metatags[0].builderInfo_name;
      var builder_seo = metatags[0].builderInfo_name;
      this.builder_seo = builder_seo.toLowerCase().replace(/\s+/g, '-');

      if (this.router.url.indexOf('/builder-overview/'+ this.builder_seo + '-' + this.metacity +'-overview-'+ urelend +'') > -1){
      }
      else{
        // this.router.navigate(['/404'], { skipLocationChange: true });
      }

      this.titleService.setTitle("An Overview of "+builder_seo+' '+this.cityname+" City | Select your category and get your Property easily");
      this.meta.updateTag({name: 'description', content: "An Overview of "+this.cityname+" City. Here you can select your property from our categorized section easily."});
      this.Service.createLinkForCanonicalURL();
    });
  }
  allProperties(){

    let param = {
      buliderId: this.builderid,

    };
    this.Service.getprojectscount(this.citylower, param).subscribe(response => {
      this.allbuildercount = response['Counts'][0]['PropertyCounts'];
    });
  }
  allProperties2(){
    const min = 1;
    const max = 4;
    let param = {
      buliderId: this.builderid,
      minprice: min,
      maxprice: max,
    };
    this.Service.getprojectscount(this.citylower, param).subscribe(response => {
      this.thirtyLakhs = response['Counts'][0]['PropertyCounts'];
    });
  }

  onReadyToMove() {
    const min = 6;
    const max = 7;
    let param = {
      buliderId: this.builderid,
      minprice: min,
      maxprice: max,
    };
    this.Service.getprojectscount(this.citylower, param).subscribe(response => {
      this.fourtytofifety = response['Counts'][0]['PropertyCounts'];
    });
  }

  flatscitycount() {
    const min = 7;
    const max = 8;
    let param = {
      buliderId: this.builderid,
      minprice: min,
      maxprice: max,
    };
    this.Service.getprojectscount(this.citylower, param).subscribe(response => {
      this.fifetytosixety = response['Counts'][0]['PropertyCounts'];
    });
  }

  villascitycount() {
    const min = 8;
    const max = 9;
    let param = {
      buliderId: this.builderid,
      minprice: min,
      maxprice: max,
    };
    this.Service.getprojectscount(this.citylower, param).subscribe(response => {
      this.sixetytoseventy = response['Counts'][0]['PropertyCounts'];
    });
  }
  villascitycount2() {
    const min = 9;
    const max = 10;
    let param = {
      buliderId: this.builderid,
      minprice: min,
      maxprice: max,
    };
    this.Service.getprojectscount(this.citylower, param).subscribe(response => {
      this.seventytoeighty = response['Counts'][0]['PropertyCounts'];
    });
  }
  villascitycount3() {
    const min = 10;
    const max = 11;
    let param = {
      buliderId: this.builderid,
      minprice: min,
      maxprice: max,
    };
    this.Service.getprojectscount(this.citylower, param).subscribe(response => {
      this.eightytoninety = response['Counts'][0]['PropertyCounts'];
    });
  }
  villascitycount4() {
    const min = 11;
    const max = 12;
    let param = {
      buliderId: this.builderid,
      minprice: min,
      maxprice: max,
    };
    this.Service.getprojectscount(this.citylower, param).subscribe(response => {
      this.ninetytocrore = response['Counts'][0]['PropertyCounts'];
    });
  }
  villascitycount5() {
    const min = 12;
    const max = 24;
    let param = {
      buliderId: this.builderid,
      minprice: min,
      maxprice: max,
    };
    this.Service.getprojectscount(this.citylower, param).subscribe(response => {
      this.aboveonecrore = response['Counts'][0]['PropertyCounts'];
    });
  }

  onNewLanches() {
    const min = 5;
    const max = 6;
    let param = {
      buliderId: this.builderid,
      minprice: min,
      maxprice: max,
    };
    this.Service.getprojectscount(this.citylower, param).subscribe(response => {
      this.thirtytofourty = response['Counts'][0]['PropertyCounts'];
    });
  }

  upComingProp() {
    const limite = 4;
    const limitrows = 6;
    const statusid = '50308';
    let param = {
      limit: limite,
      limitrows: limitrows,
      statusid: statusid
    };
    this.Service.getprojectscount(this.citylower, param).subscribe(response => {
      this.upComingDetails = response['Counts'][0]['PropertyCounts'];
    });
  }

  btcdatafetch() {
    const limite = 4;
    const limitrows = 6;
    let param = {
      limit: limite,
      limitrows: limitrows,
      bedroom: '1',
      proptypeid: '50401'
    };
    this.Service.getprojectscount(this.citylower, param).subscribe(response => {
      this.btccount = response['Counts'][0]['PropertyCounts'];
    });

    let param1 = {
      limit: limite,
      limitrows: limitrows,
      bedroom: '3',
      proptypeid: '50401'
    };
    this.Service.getprojectscount(this.citylower, param1).subscribe(response => {
      this.btccount3 = response['Counts'][0]['PropertyCounts'];
    });

    let param2 = {
      limit: limite,
      limitrows: limitrows,
      bedroom: '4',
      proptypeid: '50401'
    };
    this.Service.getprojectscount(this.citylower, param2).subscribe(response => {
      this.btccount4 = response['Counts'][0]['PropertyCounts'];
    });

  }

  fbcdatafetch() {
    const limite = 4;
    const limitrows = 6;
    let param = {
      limit: limite,
      limitrows: limitrows,
      minprice: '1',
      maxprice: '4',
      proptypeid: '50401'
    };
    this.Service.getprojectscount(this.citylower, param).subscribe(response => {
      this.flats30lakhscounts = response['Counts'][0]['PropertyCounts'];
    });

    let param1 = {
      limit: limite,
      limitrows: limitrows,
      minprice: '7',
      maxprice: '8',
      proptypeid: '50401'
    };
    this.Service.getprojectscount(this.citylower, param1).subscribe(response => {
      this.flats50to60lakhscounts = response['Counts'][0]['PropertyCounts'];
    });

    let param2 = {
      limit: limite,
      limitrows: limitrows,
      minprice: '8',
      maxprice: '9',
      proptypeid: '50401'
    };
    this.Service.getprojectscount(this.citylower, param2).subscribe(response => {
      this.flats60to70lakhscounts = response['Counts'][0]['PropertyCounts'];
    });

  }

  bstccountfetch() {
    const limite = 4;
    const limitrows = 6;
    let param = {
      limit: limite,
      limitrows: limitrows,
      bedroom: '1',
      proptypeid: '50401',
      statusid: '50307',
    };
    this.Service.getprojectscount(this.citylower, param).subscribe(response => {
      this.bstccount = response['Counts'][0]['PropertyCounts'];
    });

    let param3 = {
      limit: limite,
      limitrows: limitrows,
      bedroom: '3',
      proptypeid: '50401',
      statusid: '50307',
    };
    this.Service.getprojectscount(this.citylower, param3).subscribe(response => {
      this.bstccount3 = response['Counts'][0]['PropertyCounts'];
    });

    let param4 = {
      limit: limite,
      limitrows: limitrows,
      bedroom: '4',
      proptypeid: '50401',
      statusid: '50307',
    };
    this.Service.getprojectscount(this.citylower, param4).subscribe(response => {
      this.bstccount4 = response['Counts'][0]['PropertyCounts'];
    });
  }


  // rentalsCount() {
  //   const limite = 4;
  //   const limitrows = 6;
  //   var param = {
  //     limit: limite,
  //     limitrows: limitrows,
  //   };
  //   this.RentService.getRentListCount(this.citylower, param).subscribe(countprojects => {
  //     let projectcount = countprojects['Counts'];
  //     this.rentalsProjectCount = projectcount[0].PropertyCounts;
  //   });
  // }

  // individualCount() {
  //   const limite = 4;
  //   const limitrows = 6;
  //   var param = {
  //     limit: limite,
  //     limitrows: limitrows,
  //   };
  //   this.Service.getIndividualListCount(this.citylower, param).subscribe(countprojects => {
  //     this.IndividualPropertiesCount = countprojects['Counts'][0]['PropertyCounts'];
  //   });
  // }

  getAutocomp() {
    var value = this.cityservice.cityfinder(this.router.url);
    this.Service.getAuto(value.cityid).subscribe(myLocalList => {
      this.autoCompleteData = myLocalList['autolist'];
    });
  }



  bologsList() {
    this.Service.getrecentblogs().subscribe(response => {
      this.allBlogs = response['locations'];
    });
  }


  newlaunchesloader: boolean = true;
  newProperties = [];
  topprojectsloader: boolean = true;
  topProperties = [];

  getTopProjects() {
    var limitparam = 0;
    var limitrows = 30;
    var param = {
      limit: limitparam,
      limitrows: limitrows,
      buliderId: this.builderid,
      Cityid: this.cityId
    };
    this.Service.getCity(this.citylower, param).subscribe(response => {
      let propertylists1 = response['deatils'];
      this.topProperties = propertylists1;
    });
  }

  alloffersList = [];
  offershowLoader: Boolean = true;

  getOffersDesktopView() {
    var limitparam = 0;
    var limitrows = 0;
    var param = {
      limit: limitparam,
      limitrows: limitrows,
      statusid: '50310,50308'
    };

    this.Service.getCity(this.citylower, param).subscribe(response => {
      let propertylists1 = response['deatils'];
      this.alloffersList = propertylists1;
    });

    var limitparam = 20;
    var limitrows = 20;
    var param1 = {
      limit: limitparam,
      limitrows: limitrows,
      statusid: '50310,50308'
    };
    this.Service.getCity(this.citylower, param1).subscribe(response => {
      let propertylists1 = response['deatils'];
      this.newProperties = propertylists1;
    });
  }
}
