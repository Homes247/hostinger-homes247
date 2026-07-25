import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { WINDOW } from '@ng-toolkit/universal';
import { Meta, Title } from '@angular/platform-browser';
import { DataService } from '../data.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CityService } from '../city.service';


declare var $: any;
declare var swal: any;

declare var $: any;
@Component({
  selector: 'app-city-home',
  templateUrl: './city-home.component.html',
  styleUrls: ['./city-home.component.css']
})
export class CityHomeComponent implements OnInit {
  firstCopy = false;
  propertyimage = this.Service.imagesURL + 'uploadPropertyImgs/';
  ImageUrlstories = this.Service.imagesURL + 'stories/';
  allpropertycount: any;
  readyToMoveDetails;
  flatsincitycount;
  villasincitycount;
  value = '1';
  allNewProperties;
  upComingDetails;
  bestOffersList;
  bestOffersCount;

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
  constructor(private router: Router,
    private _location: Location,
    public Service: DataService,
    public cityservice: CityService, private titleService: Title, private meta: Meta,
    // private completerService: CompleterService,
    @Inject(WINDOW) private window: Window) {
    this.bestOffersList = [];
    this.readyToMoveDetailsList = [];
    this.underConstructionDetailLists = [];
  }
  getSeoTitle(shortTitle: string, longTitle: string): string {
    return shortTitle.length <= 60 ? shortTitle : longTitle;
  }

  ngOnInit() {
    this.getmeta();
    var value = this.cityservice.cityfinder(this.router.url);
    this.city = value.cityname;
    this.citylower = value.cityname.toLowerCase();
    this.cityId = value.cityid;
    const title = this.getSeoTitle(
      `${this.city} Real Estate Market Overview | Homes247.in`,
      `${this.city} Real Estate Market Overview | Homes247.in`
    );

    const description = `Explore ${this.city}’s property market. Get expert insights on real estate trends, prices, and top residential localities at Homes247.in.`;

    this.titleService.setTitle(title);

    this.meta.updateTag({
      name: 'description',
      content: description
    });
    const image = 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp';
    const url = 'https://www.homes247.in' + this.router.url;

    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:image', content: image });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:type', content: 'website' });


    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: title });
    this.meta.updateTag({ name: 'twitter:description', content: description });
    this.meta.updateTag({ name: 'twitter:image', content: image });
    this.Service.createLinkForCanonicalURL();
    this.allProperties();
    this.onReadyToMove();
    this.flatscitycount();
    this.villascitycount();
    this.onNewLanches();
    this.upComingProp();
    this.btcdatafetch();
    this.fbcdatafetch();
    this.bstccountfetch();
    this.bologsList();
    this.getTopProjects();
    this.getOffersDesktopView();
    this.individualCount();
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
  cityname: any;
  getmeta() {
    var cityname = this.router.url.split('/city-overview/')[1];
    String.prototype.toLocaleUpperCase = function () {
      return this.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
    };
    var idremove = cityname.split('-overview')[0].toLocaleUpperCase();
    this.cityname = idremove;
    var capsname = this.cityname.toLocaleUpperCase();
    this.city = capsname.replace('-', ' ');
    var value = this.cityservice.cityfinder(this.router.url);
    var urelend = this.router.url.split('-').pop();
    // 
    // 


    if (this.city !== value.cityname) {
      // this.router.navigate(['/404'], { skipLocationChange: true });
    }
    var citynam = this.city.toLowerCase();
    var citynamehyphen = citynam.replace(' ', '-');

    if (this.router.url.indexOf('--') > -1) {
      // this.router.navigate(['/404'], { skipLocationChange: true });
    }
    if (this.router.url.indexOf('/city-overview/' + citynamehyphen + '-overview') > -1) {
    }
    else {
      // this.router.navigate(['/404'], { skipLocationChange: true });
    }
    if (urelend !== 'overview') {
      // this.router.navigate(['/404'], { skipLocationChange: true });
    }
    else {
    }
  }
  allProperties() {
    const limite = 0;
    const limitrows = 6;
    let param = {
      limit: limite,
      limitrows: limitrows
    };
    this.Service.getprojectscount(this.citylower, param).subscribe(response => {
      this.allpropertycount = response['Counts'][0]['PropertyCounts'];
    });
  }

  onReadyToMove() {
    const limite = 4;
    const limitrows = 6;
    let param = {
      limit: limite,
      limitrows: limitrows,
      statusid: '50307',
      proptypeid: '50401'
    };
    this.Service.getprojectscount(this.citylower, param).subscribe(response => {
      this.readyToMoveDetails = response['Counts'][0]['PropertyCounts'];
    });
  }

  flatscitycount() {
    const limite = 4;
    const limitrows = 6;
    let param = {
      limit: limite,
      limitrows: limitrows,
      proptypeid: '50401'
    };
    this.Service.getprojectscount(this.citylower, param).subscribe(response => {
      this.flatsincitycount = response['Counts'][0]['PropertyCounts'];
    });
  }

  villascitycount() {
    const limite = 4;
    const limitrows = 6;
    let param = {
      limit: limite,
      limitrows: limitrows,
      proptypeid: '50402'
    };
    this.Service.getprojectscount(this.citylower, param).subscribe(response => {
      this.villasincitycount = response['Counts'][0]['PropertyCounts'];
    });
  }

  onNewLanches() {
    const limite = 4;
    const limitrows = 6;
    const statusid = '50310,50308';
    let param = {
      limit: limite,
      limitrows: limitrows,
      statusid: statusid
    };
    this.Service.getprojectscount(this.citylower, param).subscribe(response => {
      this.allNewProperties = response['Counts'][0]['PropertyCounts'];
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

  individualCount() {
    const limite = 4;
    const limitrows = 6;
    var param = {
      limit: limite,
      limitrows: limitrows,
    };
    this.Service.getindividualprojectscount(this.citylower, param).subscribe(countprojects => {
      this.IndividualPropertiesCount = countprojects['Counts'][0]['PropertyCounts'];
    });
  }

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
    this.Service.gettoppropertiesupdated(this.cityId).subscribe((topProperty: any[]) => {
      this.topProperties = topProperty['deatils'];
      if (this.topProperties.length >= 0) {
        this.topprojectsloader = false;
      } else {
        this.topprojectsloader = true;
      }
    });
  }

  alloffersList = [];
  offershowLoader: Boolean = true;

  getOffersDesktopView() {
    var limitparam = 0;
    var limitrows = 20;
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

  // buyShow: boolean = true;
  // rentShow: boolean = false;
  // buyClick() {
  //   if (this.buyShow == false) {
  //     this.buyShow = true;
  //     this.rentShow = false;
  //   }
  // }
  // rentClick() {
  //   if (this.rentShow == false) {
  //     this.rentShow = true;
  //     this.buyShow = false;
  //   }
  // }

  // onebhk: boolean = false;
  // twobhk: boolean = false;
  // threebhk: boolean = false;
  // fourbhk: boolean = false;
  // noOfBedrooms: any;
  // onebhkClick() {
  //   if (this.onebhk == false) {
  //     this.onebhk = true;
  //     this.twobhk = false;
  //     this.threebhk = false;
  //     this.fourbhk = false;
  //     this.noOfBedrooms ='1';
  //   }
  // }
  // twobhkClick() {
  //   if (this.twobhk == false) {
  //     this.onebhk = false;
  //     this.twobhk = true;
  //     this.threebhk = false;
  //     this.fourbhk = false;
  //     this.noOfBedrooms ='2';
  //   } 
  // }
  // threebhkClick() {
  //   if (this.threebhk == false) {
  //     this.onebhk = false;
  //     this.twobhk = false;
  //     this.threebhk = true;
  //     this.fourbhk = false;
  //     this.noOfBedrooms ='3';
  //   }
  // }
  // fourbhkClick() {
  //   if (this.fourbhk == false) {
  //     this.onebhk = false;
  //     this.twobhk = false;
  //     this.threebhk = false;
  //     this.fourbhk = true;
  //     this.noOfBedrooms ='4';
  //   }
  // }

  // lessThnThirty: boolean = false;
  // fourtyToFifty: boolean = false;
  // sixtyToSevent: boolean = false;
  // eightyToNinty: boolean = false;
  // oneToTwo: boolean = false;
  // twoCr: boolean = false;
  // minPrice: any;
  // maxPrice: any;
  // lessBudget() {
  //   if (this.lessThnThirty == false) {
  //     this.lessThnThirty = true;
  //     this.fourtyToFifty = false;
  //     this.sixtyToSevent = false;
  //     this.eightyToNinty = false;
  //     this.oneToTwo = false;
  //     this.twoCr = false;
  //     this.maxPrice = '5';
  //     this.minPrice = '1';
  //   } else {
  //     this.lessThnThirty = false;
  //     this.fourtyToFifty = false;
  //     this.sixtyToSevent = false;
  //     this.eightyToNinty = false;
  //     this.oneToTwo = false;
  //     this.twoCr = false;
  //     this.maxPrice = '';
  //     this.minPrice = '';
  //   }
  // }
  // fourtyToFiftyLac() {
  //   if (this.fourtyToFifty == false) {
  //     this.lessThnThirty = false;
  //     this.fourtyToFifty = true;
  //     this.sixtyToSevent = false;
  //     this.eightyToNinty = false;
  //     this.oneToTwo = false;
  //     this.twoCr = false;
  //     this.maxPrice = '8';
  //     this.minPrice = '6';
  //   } else {
  //     this.lessThnThirty = false;
  //     this.fourtyToFifty = false;
  //     this.sixtyToSevent = false;
  //     this.eightyToNinty = false;
  //     this.oneToTwo = false;
  //     this.twoCr = false;
  //     this.maxPrice = '';
  //     this.minPrice = '';
  //   }
  // }
  // sixtyToSeventLac() {
  //   if (this.sixtyToSevent == false) {
  //     this.lessThnThirty = false;
  //     this.fourtyToFifty = false;
  //     this.sixtyToSevent = true;
  //     this.eightyToNinty = false;
  //     this.oneToTwo = false;
  //     this.twoCr = false;
  //     this.maxPrice = '9';
  //     this.minPrice = '8';
  //   } else {
  //     this.lessThnThirty = false;
  //     this.fourtyToFifty = false;
  //     this.sixtyToSevent = false;
  //     this.eightyToNinty = false;
  //     this.oneToTwo = false;
  //     this.twoCr = false;
  //     this.maxPrice = '';
  //     this.minPrice = '';
  //   }
  // }
  // eightyToNintyLac() {
  //   if (this.eightyToNinty == false) {
  //     this.lessThnThirty = false;
  //     this.fourtyToFifty = false;
  //     this.sixtyToSevent = false;
  //     this.eightyToNinty = true;
  //     this.oneToTwo = false;
  //     this.twoCr = false;
  //     this.maxPrice = '11';
  //     this.minPrice = '10';
  //   } else {
  //     this.lessThnThirty = false;
  //     this.fourtyToFifty = false;
  //     this.sixtyToSevent = false;
  //     this.eightyToNinty = false;
  //     this.oneToTwo = false;
  //     this.twoCr = false;
  //     this.maxPrice = '';
  //     this.minPrice = '';
  //   }
  // }
  // oneToTwoCr() {
  //   if (this.oneToTwo == false) {
  //     this.lessThnThirty = false;
  //     this.fourtyToFifty = false;
  //     this.sixtyToSevent = false;
  //     this.eightyToNinty = false;
  //     this.oneToTwo = true;
  //     this.twoCr = false;
  //     this.maxPrice = '13';
  //     this.minPrice = '12';
  //   } else {
  //     this.lessThnThirty = false;
  //     this.fourtyToFifty = false;
  //     this.sixtyToSevent = false;
  //     this.eightyToNinty = false;
  //     this.oneToTwo = false;
  //     this.twoCr = false;
  //     this.maxPrice = '';
  //     this.minPrice = '';
  //   }
  // }
  // twoCrPlus() {
  //   if (this.twoCr == false) {
  //     this.lessThnThirty = false;
  //     this.fourtyToFifty = false;
  //     this.sixtyToSevent = false;
  //     this.eightyToNinty = false;
  //     this.oneToTwo = false;
  //     this.twoCr = true;
  //     this.maxPrice = '24';
  //     this.minPrice = '13';
  //   } else {
  //     this.lessThnThirty = false;
  //     this.fourtyToFifty = false;
  //     this.sixtyToSevent = false;
  //     this.eightyToNinty = false;
  //     this.oneToTwo = false;
  //     this.twoCr = false;
  //     this.maxPrice = '';
  //     this.minPrice = '';
  //   }
  // }

}
