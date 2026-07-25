import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CityService } from '../city.service';
import { DataService } from '../data.service';
declare var $: any;
declare var $: any;
@Component({
  selector: 'app-cityhome',
  templateUrl: './cityhome.component.html',
  styleUrls: ['./cityhome.component.css']
})
export class CityhomeComponent implements OnInit {
  @ViewChild('scrollapiloader') scrollapiloader: ElementRef;
  cityId: any;
  city: any;
  cityDescp:any;
  currentCity: any;
  propertyimage = this.Service.imagesURL + 'uploadPropertyImgs/';
  ImageUrlstories = this.Service.imagesURL + 'stories/';
  blogimagePath = this.Service.imagesURL + 'stories/';
  readyToMoveDetails;
  underConstructionDetails;
  value = '1';
  allNewProperties;
  upComingDetails;
  bestOffersList;
  bestOffersCount;
  luxuryPropCountDetails;
  affordablePropCountDetails;
  lowbudgetPropCountDetails;
  rentalsProjectCount;
  IndividualPropertiesCount;
  readyToMoveDetailsList;
  underConstructionDetailLists;
  allBlogs;
  localityShow = true;
  showLoaderreadyToMove = true;
  showLoaderBestOffers = true;
  showLoaderunderConstructionDetailLists = true;
  constructor(private router: Router,
    public Service: DataService,
    public cityservice: CityService,) { }

  ngOnInit(): void {
    var value = this.cityservice.cityfinder(this.router.url);
    this.city = value.cityname.toLowerCase().replace('-', ' ');
    this.currentCity = value.cityname;
    this.cityId = value.cityid;
    this.onReadyToMove();
    this.underConstruction();
    this.onNewLanches();
    this.upComingProp();
    this.luxuryPropCount();
    this.affordablePropCount();
    this.lowBudgetPropCount();
    this.onReadyToMoveList();
    this.bologsList();
    this.getDescOfCity();
    this.bestOffers();
    this.getNewProjects();
    this.getTopProjects();
    this.getOffersDesktopView();
    this.rentalsCount();
    this.individualCount();
  }

  getDescOfCity() {
    this.Service.getseocitymeta(this.cityId).subscribe(metatags => {
      this.cityDescp = metatags['Cityseo'][0]['city_description'];
      // 
    });
  }
  topnewdivreached = false;
  loaded = false;
  innerheader:any;
  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const elementPosition = this.scrollapiloader.nativeElement.offsetTop;
    const scrollPosition = window.pageYOffset;
    if (this.topnewdivreached = scrollPosition >= elementPosition) {
      // import('../innerheader/innerheader.module').then(mod => mod.InnerHeaderModule).then(InnerHeaderModule => {
      //   this.innerheader = InnerHeaderModule.components['lazy'];
      //   this.loaded = true;
      // });

    }
  }
  readmore() {
    $('.city_div img').css('filter', 'brightness(.2)');
    $('.banner_description').css('height', '330px');
    $('.city_div').css('height', '510px');
    $('.about_us_banner label').css('top', '20%');
    $('p.banner_description').css('overflow-y', 'scroll');
    $('.down_arrow').css('display', 'none');
    $('.up_arrow').css('display', 'block');
  }

  readless() {
    var scrollToTarget = function (target, containerEl) {
      // Moved up here for readability;
      var isElement = target && target.nodeType === 1,
        isNumber = Object.prototype.toString.call(target) === '[object Number]';

      if (isElement) {
        containerEl.scrollTop = target.offsetTop;
      } else if (isNumber) {
        containerEl.scrollTop = target;
      } else if (target === 'bottom') {
        containerEl.scrollTop = containerEl.scrollHeight - containerEl.offsetHeight;
      } else if (target === 'top') {
        containerEl.scrollTop = 0;
      }
    };
    var scrollableDiv = document.getElementById('scrollable');
    scrollToTarget('top', scrollableDiv);
    $('.banner_description').css('height', '50px');
    $('.about_us_banner label').css('top', '40%');
    $('.about_us_banner label.descrip').css('top', '28%');
    $('p.banner_description').css('overflow-y', 'hidden');
    $('.down_arrow').css('display', 'block');
    $('.up_arrow').css('display', 'none');
  }

  onReadyToMove() {
    const limite = 4;
    const limitrows = 6;
    const statusid = '50307';
    let param = {
      limit: limite,
      limitrows: limitrows,
      statusid: statusid
    };
    this.Service.getprojectscount(this.city, param).subscribe(response => {
      this.readyToMoveDetails = response['Counts'][0]['PropertyCounts'];
      
    });
  }

  underConstruction() {
    const limite = 4;
    const limitrows = 6;
    const statusid = '50309';
    let param = {
      limit: limite,
      limitrows: limitrows,
      statusid: statusid
    };
    this.Service.getprojectscount(this.city, param).subscribe(response => {
      this.underConstructionDetails = response['Counts'][0]['PropertyCounts'];
    });
  }

  onNewLanches() {
    const limite = 4;
    const limitrows = 6;
    const statusid = '50310';
    let param = {
      limit: limite,
      limitrows: limitrows,
      statusid: statusid
    };
    this.Service.getprojectscount(this.city, param).subscribe(response => {
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
    this.Service.getprojectscount(this.city, param).subscribe(response => {
      this.upComingDetails = response['Counts'][0]['PropertyCounts'];
    });
  }

  luxuryPropCount() {
    const limite = 4;
    const limitrows = 6;
    // const statusid = '50308';
    const min = 13;
    const max = 24;
    let param = {
      limit: limite,
      limitrows: limitrows,
      // statusid: statusid,
      minprice: min,
      maxprice: max,
    };
    this.Service.getprojectscount(this.city, param).subscribe(response => {
      this.luxuryPropCountDetails = response['Counts'][0]['PropertyCounts'];
    });
  }

  affordablePropCount() {
    const limite = 4;
    const limitrows = 6;
    // const statusid = '50308';
    const min = 6;
    const max = 9;
    let param = {
      limit: limite,
      limitrows: limitrows,
      // statusid: statusid,
      minprice: min,
      maxprice: max,
    };
    this.Service.getprojectscount(this.city, param).subscribe(response => {
      this.affordablePropCountDetails = response['Counts'][0]['PropertyCounts'];
    });
  }

  lowBudgetPropCount() {
    const limite = 4;
    const limitrows = 6;
    // const statusid = '50308';
    const min = 1;
    const max = 5;
    let param = {
      limit: limite,
      limitrows: limitrows,
      // statusid: statusid,
      minprice: min,
      maxprice: max,
    };
    this.Service.getprojectscount(this.city, param).subscribe(response => {
      this.lowbudgetPropCountDetails = response['Counts'][0]['PropertyCounts'];
    });
  }


  rentalsCount() {
    const limite = 4;
    const limitrows = 6;
    var param = {
      limit: limite,
      limitrows: limitrows,
    };
    this.Service.getRentprojectscount(this.city, param).subscribe(countprojects => {
      let projectcount = countprojects['Counts'];
      this.rentalsProjectCount = projectcount[0].PropertyCounts;
    });
  }

  individualCount() {
    const limite = 4;
    const limitrows = 6;
    var param = {
      limit: limite,
      limitrows: limitrows,
    };
    this.Service.getindividualprojectscount(this.city, param).subscribe(countprojects => {
      this.IndividualPropertiesCount = countprojects['Counts'][0]['PropertyCounts'];
    });
  }


  bestOffers() {
    const limite = 0;
    const limitrows = 6;
    let param = {
      limit: limite,
      limitrows: limitrows
    };
    this.Service.getOffersCount(this.city, param).subscribe(response => {
      this.bestOffersCount = response['Counts'][0]['PropertyCounts'];
      if (this.bestOffersList.length !== 0) {
        this.showLoaderBestOffers = false;
      } else if (this.bestOffersList.length === 0) {
        this.showLoaderBestOffers = true;
      }
    });
  }

  onReadyToMoveList() {
    const limite = 4;
    const limitrows = 6;
    const statusid = '50307';
    // this.Service.getListByStatus(limite, limitrows, statusid).subscribe(response => {
    //   this.readyToMoveDetailsList = response['deatils'];
    //   if (this.readyToMoveDetailsList.length !== 0) {
    //     this.showLoaderreadyToMove = false;
    //   } else if (this.readyToMoveDetailsList.length === 0) {
    //     this.showLoaderreadyToMove = true;
    //   }
    // });
  }

  underConstructionList() {
    const limite = 4;
    const limitrows = 6;
    const statusid = '50309';
    // this.Service.getListByStatus(limite, limitrows, statusid).subscribe(response => {
    //   this.underConstructionDetailLists = response['deatils'];
    //   if (this.underConstructionDetailLists.length !== 0) {
    //     this.showLoaderunderConstructionDetailLists = false;
    //   } else if (this.underConstructionDetailLists.length === 0) {
    //     this.showLoaderunderConstructionDetailLists = true;
    //   }
    // });
  }


  blogsloader = true;
  bologsList() {
    this.Service.getrecentblogs().subscribe(response => {
      this.allBlogs = response['locations'];
      if(this.allBlogs.length >= 0){
        this.blogsloader = false;
      }else{
        this.blogsloader = true;
      }
    });
  }

  onlocalityClick() {
    if (this.localityShow === true) {
      this.localityShow = false;
    } else if (this.localityShow === false) {
      this.localityShow = true;
    }
  }
  newlaunchesloader: boolean = true;
  newProperties = [];
  topprojectsloader: boolean = true;
  topProperties = [];
  getNewProjects() {
    // this.Service.getnewproperties(this.cityId).subscribe((newProperties: any[]) => {
    //   this.newProperties = newProperties['deatils'];
    //   if (this.newProperties.length >= 0) {
    //     this.newlaunchesloader = false;
    //   } else {
    //     this.newlaunchesloader = true;
    //   }
    // });

  }
  getTopProjects() {
    this.Service.gettopproperties(this.cityId).subscribe((topProperty: any[]) => {
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
    var limitrows = 10;
    var limitcountrows = 5000;
    var city = this.city;
    var param = {
      limit: limitparam,
      limitrows: limitrows
    };

    this.Service.getOffers(city, param).subscribe(offers => {
      this.shuffle(offers['offer_deatils']);
      if (offers['offer_deatils'].length !== 0) {
        this.offershowLoader = false;
      } else if (offers['offer_deatils'].length === 0) {
        this.offershowLoader = true;
      }
    });
  }
  shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    this.alloffersList = a;
  }

  buyShow: boolean = true;
  rentShow: boolean = false;
  buyClick() {
    if (this.buyShow == false) {
      this.buyShow = true;
      this.rentShow = false;
    }
  }
  rentClick() {
    if (this.rentShow == false) {
      this.rentShow = true;
      this.buyShow = false;
    }
  }

  onebhk: boolean = false;
  twobhk: boolean = false;
  threebhk: boolean = false;
  fourbhk: boolean = false;
  noOfBedrooms: any;
  onebhkClick() {
    if (this.onebhk == false) {
      this.onebhk = true;
      this.twobhk = false;
      this.threebhk = false;
      this.fourbhk = false;
      this.noOfBedrooms ='1';
    }
  }
  twobhkClick() {
    if (this.twobhk == false) {
      this.onebhk = false;
      this.twobhk = true;
      this.threebhk = false;
      this.fourbhk = false;
      this.noOfBedrooms ='2';
    } 
  }
  threebhkClick() {
    if (this.threebhk == false) {
      this.onebhk = false;
      this.twobhk = false;
      this.threebhk = true;
      this.fourbhk = false;
      this.noOfBedrooms ='3';
    }
  }
  fourbhkClick() {
    if (this.fourbhk == false) {
      this.onebhk = false;
      this.twobhk = false;
      this.threebhk = false;
      this.fourbhk = true;
      this.noOfBedrooms ='4';
    }
  }

  lessThnThirty: boolean = false;
  fourtyToFifty: boolean = false;
  sixtyToSevent: boolean = false;
  eightyToNinty: boolean = false;
  oneToTwo: boolean = false;
  twoCr: boolean = false;
  minPrice: any;
  maxPrice: any;
  lessBudget() {
    if (this.lessThnThirty == false) {
      this.lessThnThirty = true;
      this.fourtyToFifty = false;
      this.sixtyToSevent = false;
      this.eightyToNinty = false;
      this.oneToTwo = false;
      this.twoCr = false;
      this.maxPrice = '5';
      this.minPrice = '1';
    } else {
      this.lessThnThirty = false;
      this.fourtyToFifty = false;
      this.sixtyToSevent = false;
      this.eightyToNinty = false;
      this.oneToTwo = false;
      this.twoCr = false;
      this.maxPrice = '';
      this.minPrice = '';
    }
  }
  fourtyToFiftyLac() {
    if (this.fourtyToFifty == false) {
      this.lessThnThirty = false;
      this.fourtyToFifty = true;
      this.sixtyToSevent = false;
      this.eightyToNinty = false;
      this.oneToTwo = false;
      this.twoCr = false;
      this.maxPrice = '8';
      this.minPrice = '6';
    } else {
      this.lessThnThirty = false;
      this.fourtyToFifty = false;
      this.sixtyToSevent = false;
      this.eightyToNinty = false;
      this.oneToTwo = false;
      this.twoCr = false;
      this.maxPrice = '';
      this.minPrice = '';
    }
  }
  sixtyToSeventLac() {
    if (this.sixtyToSevent == false) {
      this.lessThnThirty = false;
      this.fourtyToFifty = false;
      this.sixtyToSevent = true;
      this.eightyToNinty = false;
      this.oneToTwo = false;
      this.twoCr = false;
      this.maxPrice = '9';
      this.minPrice = '8';
    } else {
      this.lessThnThirty = false;
      this.fourtyToFifty = false;
      this.sixtyToSevent = false;
      this.eightyToNinty = false;
      this.oneToTwo = false;
      this.twoCr = false;
      this.maxPrice = '';
      this.minPrice = '';
    }
  }
  eightyToNintyLac() {
    if (this.eightyToNinty == false) {
      this.lessThnThirty = false;
      this.fourtyToFifty = false;
      this.sixtyToSevent = false;
      this.eightyToNinty = true;
      this.oneToTwo = false;
      this.twoCr = false;
      this.maxPrice = '11';
      this.minPrice = '10';
    } else {
      this.lessThnThirty = false;
      this.fourtyToFifty = false;
      this.sixtyToSevent = false;
      this.eightyToNinty = false;
      this.oneToTwo = false;
      this.twoCr = false;
      this.maxPrice = '';
      this.minPrice = '';
    }
  }
  oneToTwoCr() {
    if (this.oneToTwo == false) {
      this.lessThnThirty = false;
      this.fourtyToFifty = false;
      this.sixtyToSevent = false;
      this.eightyToNinty = false;
      this.oneToTwo = true;
      this.twoCr = false;
      this.maxPrice = '13';
      this.minPrice = '12';
    } else {
      this.lessThnThirty = false;
      this.fourtyToFifty = false;
      this.sixtyToSevent = false;
      this.eightyToNinty = false;
      this.oneToTwo = false;
      this.twoCr = false;
      this.maxPrice = '';
      this.minPrice = '';
    }
  }
  twoCrPlus() {
    if (this.twoCr == false) {
      this.lessThnThirty = false;
      this.fourtyToFifty = false;
      this.sixtyToSevent = false;
      this.eightyToNinty = false;
      this.oneToTwo = false;
      this.twoCr = true;
      this.maxPrice = '24';
      this.minPrice = '13';
    } else {
      this.lessThnThirty = false;
      this.fourtyToFifty = false;
      this.sixtyToSevent = false;
      this.eightyToNinty = false;
      this.oneToTwo = false;
      this.twoCr = false;
      this.maxPrice = '';
      this.minPrice = '';
    }
  }
}
