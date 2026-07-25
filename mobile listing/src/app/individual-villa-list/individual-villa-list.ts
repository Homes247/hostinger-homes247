import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, DOCUMENT, ElementRef, HostListener, Inject, OnDestroy, OnInit, PLATFORM_ID, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatChip, MatChipSelectionChange, MatChipsModule } from '@angular/material/chips';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CountdownComponent, CountdownEvent } from "ngx-countdown";
import { Subscription } from 'rxjs';
import { CityService } from '../city.service';
import { City, flitercity, minmax, } from '../city-based-listing/citybasedlisting';
import { DataService } from '../data.service';
import { FilterService } from '../filter.service';
import { enquiry } from '../prop-details-new/class';
import { SafeStorageService } from '../safe-storage.service';
import { cleanUrlPipe, Convertnumber } from '../mainpipe-pipe';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
// import { InnerHeader } from '../inner-header/inner-header';
import { InnerHeadderWithSidenav } from '../inner-headder-with-sidenav/inner-headder-with-sidenav';
import { ElitedataService } from '../elitedata.service';
import { AdCardsComponent } from "../ad-cards/ad-cards.component";

declare var $: any;
declare var swal: any;

@Component({
  selector: 'app-individual-villa-list',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatChipsModule,
    cleanUrlPipe,
    Convertnumber,
    InnerHeadderWithSidenav, NgxSkeletonLoaderModule,
    AdCardsComponent
],
  templateUrl: './individual-villa-list.html',
  styleUrl: './individual-villa-list.css',
})
export class IndividualVillaList implements OnInit, AfterViewInit, OnDestroy {
  myControl = new FormControl();
  @ViewChild('scrollAnchor', { static: false }) scrollAnchor!: ElementRef;
  @ViewChild('cd', { static: false }) private countdown: CountdownComponent;
  @ViewChild('cd2', { static: false }) private countdown2: CountdownComponent;
  @ViewChild('cancel') cancel: ElementRef;
  public n: number = 1;
  user = new enquiry();
  filterShowHide: boolean;
  Matautocomplete: any;
  sortShowHide: boolean;
  IsVisibleFilter: boolean;
  oneBedroomSelect: boolean = false;
  twoBedroomSelect: boolean = false;
  threeBedroomSelect: boolean = false;
  fourBedroomSelect: boolean = false;
  fiveBedroomSelect: boolean = false;
  registerForm: FormGroup;
  apartmentSelect: boolean = false;
  villaSelect: boolean = false;
  plotSelect: boolean = false;
  readyToMoveSelect: boolean = false;
  underConstructionSelect: boolean = false;
  newLaunchSelect: boolean = false;
  preLaunchSelect: boolean = false;
  newBudget = [];
  budgetsLength: any;
  noOfBedrooms = [];
  projectStatus = [];
  projecttype = [];
  proptypeId: any;
  localId: any;
  filterLoader: boolean = false;
  minBugPrice: any;
  maxBugPrice: any;
  filterSelectOne: boolean = false;
  localityHide: boolean = true;
  statusHide: boolean = true;
  projectTypeHide: boolean = true;
  hideDesktopLocality = true;
  minbudget_IDPK;
  maxbudget_IDPK;
  minbudget_value: any;
  maxbudget_value: any;
  static citycount: number;
  proptypeurlparam: any;
  propertyid: any;
  alertmesg: any;
  propidarray = [];
  parsedarray = [];
  jsonparse = [];
  storagearr: any;
  seenProjectsStoragearr: any;
  localstorediv: any;
  localstoredivSeenProjects: any;

  zeroprojects = false;
  citybreadcrump: any;
  localityName;
  dropdownSettingsMobile = {};
  localityData = [];
  searches: any;
  localitydescription: any;
  description: boolean;
  seenproject: any;
  UserId: any;
  userID: string | null = null;
  Date = new Date();
  propertylists: any;

  projectcount: any;
  bedrooms: any;
  budgets: any;
  possissions: any;
  localitys: any;
  cityapi = new City();
  city: any;
  citybread: any;
  builder: any;
  localtyname: any;
  zones: any;
  status_name: any;
  budget_show = true;
  bud_val_show = false;

  sortedCollection: any[];
  private routeSub: Subscription;
  cityname: any;

  cityId: any;
  reraid = [];
  cityhead: any;
  cityidseo: any;
  cityzonelinks: any;
  cityzonelinks_types: any;

  loaded = false;
  FooterComponent: any;

  Relevance: any;
  LowtoHigh: any;
  HightoLow: any;
  Recent: any;

  minprice = new minmax();
  maxprice = new minmax();
  modelmindata: any;
  minprice_value: any;
  maxprice_value: any;
  modeldata: any;

  showLoader = false;
  fliterbedroom: string;
  possission: string;
  locality = [];
  bedroom = new flitercity();
  hideshowcompare: boolean = false;
  compareShowonimg: boolean = false;
  propertiesDetails: any;
  image: any;
  propName: any;
  compareloader1: boolean = true;
  compareloader2: boolean = true;
  compareloader3: boolean = true;
  propertyname1: any;
  propimag1: any;
  propertyname2: any;
  propimag2: any;
  propertyname3: any;
  propimag3: any;
  comparePropType: any;
  compareStorageArry: any;
  propID: any;
  propid1: any;
  compareprop1: boolean = false;
  compareprop2: boolean = false;
  compareprop3: boolean = false;
  propid2: any;
  propid3: any;
  showselectitem: boolean = false;
  showcomparenow: boolean = false;
  addedShow: boolean = false;
  proptype1: any;
  proptype2: any;
  proptype3: any;
  showadded: boolean = false;
  compareproparray: any;
  onebathroomSelect: boolean = false;
  twobathroomSelect: boolean = false;
  threebathroomSelect: boolean = false;
  fourbathroomSelect: boolean = false;
  fiveplusbathroomSelect: boolean = false;
  bathroom: any;
  ownerSelect: boolean = false;
  brokerselect: boolean = false;
  postedby: any;
  NoFurnishSelect: boolean;
  FurnishType: any
  SemiFurnishSelect: boolean;
  FullFurnishSelect: boolean;
  bhklist: any;
  balconylist: any;
  bathroomlist: any;
  furnishlist: any;
  Tenantslist: any;
  Ownershiplist: any;
  Propertytypelist: any;
  Doorfacelist: any;
  Approvalslist: any;
  Amenitieslist: any;
  amenities = [];
  approvals = [];
  doorfacings = [];
  postedBy: any;
  balconyarray = [];
  bhkarray = [];
  bathroomarray = [];
  ReadyToMoveSelect: boolean;
  statusid = [];
  UnderConstructionSelect: boolean;
  listarraylength: any;
  citynameurl: string;
  propertiescount: any;
  projectcountRent: any;
  projectpgcount: any;
  projectcountcommercial: any;
  propbhk: any;
  proptype: any;
  propname: any;
  IsVisibleEnquery: boolean;
  otploader: boolean;
  proparea: any;
  propareatype: any;
  formatsDateTest: string[] = [
    'dd/MM/yyyy',
  ];
  dateNow: Date = new Date();
  dateNowISO = this.dateNow.toISOString();
  dateNowMilliseconds = this.dateNow.getTime();
  currentTab: any;
  currenturl: any;
  userRentalFavList = [];
  propertyIds = [];

  constructor(private titleService: Title, private meta: Meta,
    public Service: DataService,
    private router: Router,
    public cityservice: CityService,
    private activeroute: ActivatedRoute,
    private Filter: FilterService,
    private eliteService: ElitedataService,

    private fb: FormBuilder,
    @Inject(PLATFORM_ID) private platformId: Object,
    private storage: SafeStorageService,
    @Inject(DOCUMENT) private doc,
  ) {
    this.window = this.doc.defaultView!;
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }
    this.router.events.subscribe((evt) => {
      // trick the Router into believing it's last link wasn't previously loaded
      this.router.navigated = false;
      // if you need to scroll back to top, here is the right place
      this.window.scrollTo(0, 0);
    });
    setTimeout(() => {
      this.n = this.n += 4;
    }, 1000);
  }
  window!: Window;
  enquiryFormindComponent: any

  innerheader: any;
  propertyimage: any = 'https://img.homes247.in/images/individuallistings/cover/';

  @HostListener('window:scroll', [])
  @HostListener('touchstart', [])
  onWindowScroll() {

    this.propertyimage = this.Service.SellImages + 'cover/';



    this.Service.mouseenterservice3();
    let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    let max = document.documentElement.scrollHeight;
    import('../enquiry-form-individual/enquiry-form-individual')
      .then(c => {
        this.enquiryFormindComponent = c.EnquiryFormIndividual;
        if (isPlatformBrowser(this.platformId)) {
          $('.modal-login').css('z-index', '99999');
        }
      });
    this.currenturl = this.router.url;
    if ($(window).scrollTop() >= 140) {
      $('#hidefilter').addClass('hidefilter');
    }
    else {
      $('#hidefilter').removeClass('hidefilter');
    }
    this.Service.mouseenterservice3();
  }
  loginidNew: any
  login: boolean = false
  userId: any
  userNumber: any
  contactedList: any
  ngOnInit() {
    // this.dataloads();
    this.geturlparams();
    this.getindividuallist();
    this.getlocality();
    // this.scripts();
    this.getbedrooms();
    this.getpossissions();
    this.getbudgets();
    // this.onresize();
    //  this.sortfiltershowhide();
    IndividualVillaList.citycount = 0;
    this.searches = this.activeroute.queryParams['_value']['Searches'];
    this.UserId = this.storage?.getItem("userid");

    //query params connect visibile compare button
    this.activeroute.queryParams.subscribe(params => {
      this.currentTab = params['tab']
    })
    // if (this.currentTab == "Villa") {
    //   this.Oncompareclick();
    //   this.compareShowonimg = true;
    //   this.hideshowcompare = true;
    // }
    const loginid = this.storage?.getItem('loginID');
    if (loginid === '1') {
      this.login = true;
      this.userId = this.storage?.getItem('userID');
      this.userNumber = this.storage?.getItem('userNumber');

  this.eliteService.getContactedList(this.userId).subscribe(response => {
        if (response['status'] == "True") {
          this.contactedList = response['pro_view']

          this.elitePropertyId = this.contactedList.map((item: any) => {
            this.contactData[String(item.property_IDPK)] = item.owner_details;

            return item.property_IDPK;

          });
          if (this.elitePropertyId?.length == 0) {

          } else {
            this.eliteView = true;
          }
        }
      })

    } else {
      this.login = false;
    }
    this.loginidNew = loginid
    this.UserId = this.storage?.getItem("userID");


    $('.head_sticky').css('padding-bottom', '54px');
    this.userID = this.storage?.getItem('userID');

  }



  // dataloads() {
  //   this.propertyimage = this.Service.SellImages + 'cover/';

  // }

  transitionEnd(event) {
    var dv = document.getElementById("floatinglink");
    var dvStyle = dv.getAttribute('style');
    if (dvStyle?.indexOf("translateX(-584%)") > -1) {
      $('.floating-link').css('width', '216px');
      $('.border_div').css('opacity', '1');
      $('#floating_img').css('display', 'none');

    }
  }
  geturlparams() {
    this.routeSub = this.activeroute.params.subscribe(params => {
      this.cityname = params['cityname'];
      String.prototype.toLocaleUpperCase = function () {
        return this.replace(/\w\S*/g, function (txt) {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
      };
      var capsname = this.cityname?.toLocaleUpperCase();
      this.city = capsname;
      this.citybread = capsname;
      this.cityhead = capsname;

      var value = this.cityservice.cityfinder(this.router.url);
      // this.currentCity = value.cityname;
      this.cityname = value.cityname;
      this.cityidseo = value.cityid;
      var idcity = this.cityidseo;
      this.Service.getseocitylistmeta(idcity).subscribe(metatag => {
        let metatags = metatag['Citylistingseo'];
        this.titleService.setTitle(metatags[0].page_title);
        this.meta.updateTag({ name: 'description', content: metatags[0].meta_description });
        this.meta.updateTag({ property: 'og:title', content: metatags[0].page_title });
        this.meta.updateTag({ property: 'og:description', content: metatags[0].meta_description });
        this.Service.createLinkForCanonicalURL();
        this.localitydescription = metatags[0].city_description;
        if (this.localitydescription == '') {
          this.description = false;
        } else {
          this.description = true;
        }
      })

      if (this.router.url?.indexOf("bangalore") > -1) {
        this.cityzonelinks = true;
      } else {
        this.cityzonelinks = false;
      }
    });
  }

  getindividuallist() {
    var value = this.cityservice.cityfinder(this.router.url);
    this.citynameurl = value.cityname.toLowerCase();
    this.cityname = value.cityname;
    this.cityId = value.cityid;
    IndividualVillaList.citycount = 4;
    this.routeSub = this.activeroute.params.subscribe(params => {
      var citiname = this.citynameurl;
      this.cityapi.limit = '0';
      this.cityapi.limitrows = '4';
      this.citybreadcrump = citiname;
      var limit = '0';
      var limitrows = '4';
      var limitparam = 0;
      var limitprprtyrows = 4;
      var proptypeid = '2';
      var bedroom = this.bhkarray;
      var min = this.minbudget_IDPK;
      var max = this.maxbudget_IDPK;
      var loc = this.localityData;
      var balcony = this.balconyarray;
      var Furnish = this.FurnishType;
      var posted = this.postedBy;
      var doorfacing = this.doorfacings;
      // var amenities = this.amenities;
      var availability = this.statusid;
      var bathroom = this.bathroomarray;

      var param = {
        limit: limit,
        limitrows: limitrows,
        proptypeid: proptypeid,
        bedroom: bedroom,
        minprice: min,
        maxprice: max,
        locality: loc,
        balcony: balcony,
        furnish: Furnish,
        ownership: posted,
        doorface: doorfacing,
        bathroom: bathroom,
        // amenties : amenities,
        statusid: availability
        // userId: this.UserId,
      }
      var param1 = { proptypeid: '50402' }
      this.Service.getindividualprojectscount(citiname, param).subscribe(countprojects => {
        //  this.showLoader = true;
        let projectcount = countprojects['Counts'];
        this.propertiescount = projectcount[0].PropertyCounts;
      })

      var ParamRent = {
        proptypeid: '2'
      }

      this.Service.getRentprojectscount(this.cityname, ParamRent).subscribe(countprojects => {
        let projectcount = countprojects['Counts'];
        this.projectcountRent = projectcount[0].PropertyCounts;
      })
      this.Service.getprojectscount(this.citynameurl, param1).subscribe(countprojects => {
        //  this.showLoader = true;
        let projectcount = countprojects['Counts'];
        this.projectcount = projectcount[0].PropertyCounts;
      })
      var param2 = {
        limit: '',
        limitrows: ''
      };

      this.Service.PGRentCount(citiname, param2).subscribe(countprojects => {
        let projectcount = countprojects['Counts'];
        this.projectpgcount = projectcount[0].PropertyCounts;
      })

      this.Service.commercialSalePropertiesCount(citiname, param2).subscribe(countprojects => {
        let projectcount = countprojects['Counts'];
        this.projectcountcommercial = projectcount[0].PropertyCounts;
      })
      this.Service.getIndividualList(citiname, param).subscribe(lists => {
        let propertylists = lists['listings'];
        // this.listarraylength = this.propertylists.length;
        this.propertylists = propertylists;
        this.localId = propertylists[0].Localityid;
        this.showLoader = true;
        if (this.propertylists <= 0) {
          this.showLoader = false;
          this.zeroprojects = true;
        }
        if (this.propertylists < 4) {
          this.showLoader = false;
        }


      });
    });
  }

  private observer: IntersectionObserver | null = null;

  ngAfterViewInit() {

    // const link = document.createElement('link');
    // link.rel = 'preload';
    // link.as = 'style';
    // link.href =
    //   'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css';
    // link.onload = () => {
    //   link.rel = 'stylesheet';
    // };
    // document.head.appendChild(link);


    this.initIntersectionObserver();

    this.scripts();
    this.onresize();
    if (this.currentTab == "Villa") {
      this.Oncompareclick();
      this.compareShowonimg = true;
      this.hideshowcompare = true;
    }

    import('../mat-autocomplete-new/mat-autocomplete-new')
      .then(c => {
        this.Matautocomplete = c.MatAutocompleteNew;
      });

    $('.head_sticky').css('padding-bottom', '54px');

  }



  private initIntersectionObserver() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.loadMore();
        }
      });
    });

    if (this.scrollAnchor) {
      this.observer.observe(this.scrollAnchor.nativeElement);
    }
  }

  isAllDataLoaded = false;

  loadMore() {
    this.showLoader = true;
    this.routeSub = this.activeroute.params.subscribe(params => {
      var citiname = this.citynameurl;
      let totalcount = this.propertiescount;
      // const limit = IndividualVillaList.citycount += 4;
      const limit = IndividualVillaList.citycount;
      IndividualVillaList.citycount += 4;
      let limitprprtyrows = 4;
      var proptypeid = '2';
      var bedroom = this.bhkarray;
      var min = this.minbudget_IDPK;
      var max = this.maxbudget_IDPK;
      var loc = this.localityData;
      var balcony = this.balconyarray;
      var Furnish = this.FurnishType;
      var posted = this.postedBy;
      var doorfacing = this.doorfacings;
      // var amenities = this.amenities;
      var availability = this.statusid;
      var bathroom = this.bathroomarray;

      var param = {
        limit: limit,
        limitrows: limitprprtyrows,
        proptypeid: proptypeid,
        bedroom: bedroom,
        minprice: min,
        maxprice: max,
        locality: loc,
        balcony: balcony,
        furnish: Furnish,
        ownership: posted,
        doorface: doorfacing,
        bathroom: bathroom,
        // amenties : amenities,
        status: availability
        // userId: this.UserId,
      }
      let livecount = this.propertylists?.length || 0;
      if (livecount < totalcount) {
        return this.Service.getIndividualList(citiname, param).subscribe(propertylists => {
          var status = propertylists['status'];
          if (status == "False") {
            this.showLoader = false;
            this.isAllDataLoaded = true;
            $('.search-resultss').css('padding-bottom', '41px');
          } else {
            const newData = propertylists['listings'] || [];
            this.propertylists = this.propertylists.concat(newData);

            // Recalculate livecount here
            livecount = this.propertylists.length;

            if (livecount >= totalcount || newData.length === 0) {
              this.isAllDataLoaded = true;
              this.showLoader = false;
            }
          }
        });
      } else {
        this.isAllDataLoaded = true;
        this.showLoader = false;
      }
      // this.Service.getRentprojectscount(this.city, param).subscribe(countprojects => {
      //   let projectcount = countprojects['Counts'];
      //   this.projectcount = projectcount[0].PropertyCounts;
      // });
    });
  }


  getlocality() {
    var value = this.cityservice.cityfinder(this.router.url);
    this.citynameurl = value.cityname.toLowerCase();
    this.cityname = value.cityname;
    this.cityId = value.cityid;
    var regionid = '';
    var paramss = {
      cityId: this.cityId,
      regionid: regionid
    };
    this.Service.getlocality(paramss).subscribe(localitys => {
      this.localitys = localitys['details'];
    });

  }

  scripts() {
    $(function () {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      // $('.ui.dropdown').dropdown();
      // $('.ui.search.dropdown').dropdown({
      //   minCharacters: 3,
      //   useLabels: false
      // });
      $('ui.price_filter.dropdown').dropdown({
        fullTextSearch: true
      })
      $('.ui.budget_minprice.search.dropdown').dropdown({
        // minCharacters : 1
        onChange: function () {
          $('.budget_minprice').removeClass('minbud');
          $('.budget_maxprice').addClass('maxbud');
          if (this.maxprice_value != null) {
            $('#budgetmodal').addClass('collapsed');
            $('#budgetmodal').removeClass('expanded');
            $('.budget_minprice').addClass('minbud');
            $('.budget_maxprice').removeClass('maxbud');
          }
        },
        forceSelection: false,
      });
      $('.ui.budget_maxprice.search.dropdown').dropdown({
        // minCharacters : 1
        onChange: function () {
          $('#budgetmodal').addClass('collapsed');
          $('#budgetmodal').removeClass('expanded');
          $('.budget_minprice').addClass('minbud');
          $('.budget_maxprice').removeClass('maxbud');

        },
        forceSelection: false
      });
    });
    var width = this.window.innerWidth;
    if (width < 420) {
      if (this.router.url?.indexOf("hyderabad") > -1) {
        $(".about_us_banner label.nodescrip").css('top', "67%");
        $(".about_us_banner img").css('height', "140px");
        $(".breadcrumbs_city").css('top', "35%");
      } else if (this.router.url?.indexOf("chennai") > -1) {
        $(".about_us_banner label.nodescrip").css('top', "67%");
        $(".about_us_banner img").css('height', "140px");
        $(".breadcrumbs_city").css('top', "35%");
      } else if (this.router.url?.indexOf("kochi") > -1) {
        $(".about_us_banner label.nodescrip").css('top', "67%");
        $(".about_us_banner img").css('height', "140px");
        $(".breadcrumbs_city").css('top', "35%");
      } else if (this.router.url?.indexOf("pune") > -1) {
        $(".about_us_banner label.nodescrip").css('top', "67%");
        $(".about_us_banner img").css('height', "140px");
        $(".breadcrumbs_city").css('top', "35%");
      }
    } else {

    }

    const userId = this.storage?.getItem('userID');
    if (userId) {
      this.UserId = this.storage?.getItem('userID');


      // this.Service1.getUserWishListByIdTest(this.UserId, 3).subscribe(response => {
      // });

      if ('individualPropertyID' in this.storage) {
        // this.userFavListLocalStorage = JSON.parse(this.storage?.getItem('individualPropertyID'));

      } else {
        this.storage.setItem('individualPropertyID', '[]');
        // this.userFavListLocalStorage = JSON.parse(this.storage?.getItem('individualPropertyID'));
      }

      this.Service.getUserWishListByIdTest(this.UserId, 2).subscribe(userFavList => {
        this.userRentalFavList = userFavList['favouritelist'];
        this.propertyIds = this.userRentalFavList.map(item => item.propertyId) || [];

        // 
      });



    } else {
      if ('individualPropertyID' in this.storage) {
        this.storagearr = JSON.parse(this.storage?.getItem('individualPropertyID'));
      } else {
        this.storage.setItem('individualPropertyID', '[]');
        this.storagearr = JSON.parse(this.storage?.getItem('individualPropertyID'));
      }
    }
  }

  ShowHideFilter() {
    this.Service.mouseenterservice5();
    setTimeout(() => {
      if ($('#FirstCityModal').hasClass('show') || $('#filterModal').hasClass('show') || $('#SecondCityModal').hasClass('show')) {
        $('.head_stick').css('display', 'none');
      } else {
        $('.head_stick').css('display', 'block'); // Show again when no modal is open
      }
    }, 300);
    $('#filterModal').modal('show');
    window.scroll(0, 0);
  }

  // update by veera end

  getbedrooms() {
    this.Service.getbedrooms().subscribe(bedrooms => {
      this.bedrooms = bedrooms['bedroom'];
    })
  }

  getbudgets() {
    this.Service.getbudgets().subscribe(budgets => {
      this.budgets = budgets['budget'];
    })
  }

  getpossissions() {
    this.Service.getpossissions().subscribe(possissions => {
      this.possissions = possissions['possission'];
    })
  }

  onLocalitySelect(eve) {
    this.localityData.push(eve.locality_IDPK);
    this.getindividuallist();
  }



  config = {
    allowNumbersOnly: true,
    length: 4,
    isPasswordInput: false,
    disableAutoFocus: true,
    placeholder: '',
    inputStyles: {
      'width': '50px',
      'height': '50px'
    }
  };
  countdownconfig = {
    leftTime: 120,
    demand: true
  };
  otpexpired = false;

  handleEvent(e: CountdownEvent) {
    if (e.action === 'done') {
      this.otpexpired = true;
    }
  }

  // new radha update
  sortfiltershowhide() {
    var prevScrollpos = window.pageYOffset;
    var isScrolling;
    window.addEventListener('scroll', function (event) {
      var currentScrollPos = window.pageYOffset;
      if (prevScrollpos > currentScrollPos) {
        $('.compare_sort_filter_div').css('visibility', 'visible')
      } else {
        $('.compare_sort_filter_div').css('visibility', 'hidden')
        $('#fixed-accordion').css('visibility', 'hidden');
      }
      prevScrollpos = currentScrollPos;
      window.clearTimeout(isScrolling);
      isScrolling = setTimeout(function () {
        $('.compare_sort_filter_div').css('visibility', 'visible')
      }, 2000);
      if ($(window).scrollTop() + $(window).height() > $(document).height() - 200) {
        $('.compare_sort_filter_div').css('visibility', 'hidden')
        isScrolling = setTimeout(function () {
          $('.compare_sort_filter_div').css('visibility', 'hidden')
        }, 2000);
      }
    }, false);
  }

  ShowHideSort() {
    this.sortShowHide = this.sortShowHide ? false : true;
  }


  checkBox: boolean = false;
  contactButton: boolean = false;
  RequestButton: boolean = false;
  resquestImages: boolean = false;
  resquestCall: boolean = false;



  propUserIDPK: any;
  ShowHideEnquery1(proparea, propareatype, proptype, propname, userIdfk, data) {
    // this.proparea = proparea;
    // this.propareatype = propareatype;
    // this.proptype = proptype;
    // this.propname = propname;
    // this.propUserIDPK = data;
    this.Filter.localityid = this.localId;
    this.Filter.proptype = proptype;
    this.Filter.PropertyName = propname;
    this.Filter.Bedrooms = this.propbhk;
    this.Filter.userIdfk = userIdfk;
    this.Filter.area = proparea;
    this.Filter.areatype = propareatype;
    this.Filter.propid = data.PropertyID;
    $('#otpValidateind').css('display', 'block');
    $('.loginModelImg12').css('display', 'block');
    $('.loginModelImg13').css('display', 'none');


  }
  ShowHideEnquery(bhk, proptype, propname, userIdfk, data) {
    // this.propbhk = bhk;
    // this.proptype = proptype;
    // this.propname = propname;
    // this.propUserIDPK = data;
    this.Filter.localityid = this.localId;
    this.Filter.proptype = proptype;
    this.Filter.PropertyName = propname;
    this.Filter.Bedrooms = bhk;
    this.Filter.userIdfk = userIdfk;
    this.Filter.area = this.proparea;
    this.Filter.areatype = this.propareatype;
    this.Filter.propid = data.PropertyID;

    $('#otpValidateind').css('display', 'block');
    $('.loginModelImg13').css('display', 'block');
    $('.loginModelImg12').css('display', 'none');

    // this.IsVisibleEnquery = this.IsVisibleEnquery ? false : true;
  }

  goBackFromEnq() {
    this.IsVisibleEnquery = this.IsVisibleEnquery ? false : true;
  }
  otpsend() {
    if ($('#uname').val() == "") {
      $('#uname').focus().css("border-color", "red").attr('placeholder', 'Please Enter Name');
      return false;
    }
    else {
      var enameFilter = /^([a-zA-Z]+\s)*[a-zA-Z]+$/;
      if (enameFilter.test($('#uname').val())) {
        $('#uname').removeAttr("style");
      }
      else {
        $('#uname').focus().css("border-color", "red").attr('placeholder', 'Please enter valid name').val('');
        return false;
      }
    }

    if ($('#uemail').val() === '') {
      // $('#uemail').focus().css('border-color', 'red').attr('placeholder', 'Please Enter Email-id');
      // return false;
    } else {
      var emai = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
      if (emai.test($('#uemail').val())) {
        $('#uemail').removeAttr('style');
      } else {
        $('#uemail').focus().css('border-color', 'red').attr('placeholder', 'Please enter valid email-id').val('');
        return false;
      }
    }

    if ($('#unumber').val() == "") {
      $('#unumber').focus().css("border-color", "red").attr('placeholder', 'Please Enter Phone Number');
      return false;
    }
    else {
      var mobilee = /^[0-9]{10}$/;
      if (mobilee.test($('#unumber').val())) {
        $('#unumber').removeAttr("style");
      }
      else {
        $('#unumber').focus().css("border-color", "red").attr('placeholder', 'Please enter valid contact number').val('');
        return false;
      }
    }

    this.otploader = true;
    this.SubmitForm();
  }

  SubmitForm() {
    var param = this.user;
    const varient = 'varient';
    const propertyname = this.propbhk + '-' + this.proptype + '-' + this.propname;
    this.Service.individuallistenq(param, propertyname, propertyname, this.propUserIDPK).subscribe(success => {
      if (success['status'] === 'True') {
        this.otploader = false;
        this.cancel.nativeElement.click();
        $('body').removeClass('bodyoverlay');
        swal({
          text: 'We Will Intimate you soon!',
          type: 'success',
          showConfirmButton: false,
          timer: 2500
        });
        $('#modal-container2').addClass('out');
        $('body').removeClass('modal-active');
        this.user.name = '';
        this.user.number = '';
        this.user.mail = '';
        this.user.otp = '';
        $('#btn_reset2').click();
        $('#uname').attr('placeholder', 'Username')
        $('#uemail').attr('placeholder', 'Email')
        $('#unumber').attr('placeholder', '+91')

      } else {
        swal({
          type: 'error',
          title: 'Something Went Wrong',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  }




  onresize() {
    this.registerForm = this.fb.group({
      locality: [''],
    });
    this.cityzonelinks_types = false;
    this.dropdownSettingsMobile = {
      singleSelection: false,
      idField: 'locality_IDPK',
      textField: 'locality_name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      limitSelection: 3
    };
    var width = this.window.innerWidth;
    if (width < 1080) {
      this.filterShowHide = true;
    } else {
      this.filterShowHide = false;
    }
  }
  @ViewChildren(MatChip) chips!: QueryList<MatChip>;


  Oncompareclick() {
    this.storage.removeItem('ComparePropID');
    this.storage.removeItem('comparePropType1');
    this.storage.removeItem('comparePropType2');

    // this.Services.mouseenterservice2();
    this.compareShowonimg = this.compareShowonimg ? false : true;
    this.compareproparray = JSON.parse(this.storage?.getItem('ComparePropID1_ReSale'));
    if (this.compareproparray.length >= 1) {
      this.hideshowcompare = true;
      this.compareStorageArry = JSON.parse(this.storage?.getItem('ComparePropID1_ReSale'));
      var compare1 = this.compareStorageArry[0];
      var compare2 = this.compareStorageArry[1];
      if (compare1 != undefined) {
        this.Service.getindividualpropertydetails(compare1).subscribe(prop => {
          let propDetails = prop['propertydetails'];
          this.propertiesDetails = propDetails;
          this.propimag1 = this.propertiesDetails[0]['property_coverimage'];
          this.propertyname1 = this.propertiesDetails[0]['PropertyName'];
          this.propid1 = this.propertiesDetails[0]['PropertyID'];
          this.compareloader1 = false;
          this.compareprop1 = true;
        });
      }
      if (compare2 != undefined) {
        this.Service.getindividualpropertydetails(compare2).subscribe(prop => {
          let propDetails = prop['propertydetails'];
          this.propertiesDetails = propDetails;
          this.propimag2 = this.propertiesDetails[0]['property_coverimage'];
          this.propertyname2 = this.propertiesDetails[0]['PropertyName'];
          this.propid2 = this.propertiesDetails[0]['PropertyID'];
          this.compareloader2 = false;
          this.compareprop2 = true;
        });
      }
    } else {
      this.hideshowcompare = false;
    }
    this.sortShowHide = false;

  }
  closeprop1(propid1) {
    this.compareproparray = JSON.parse(this.storage?.getItem('ComparePropID1_ReSale'));
    if (this.compareproparray.length == 1) {
      this.hideshowcompare = false;
    } else {
      this.hideshowcompare = true;
    }
    if ('ComparePropID1_ReSale' in this.storage) {
    } else {
      this.storage.setItem('ComparePropID1_ReSale', '[]');
    }
    const proparray = this.storage?.getItem('ComparePropID1_ReSale');
    const jsonpars = JSON.parse(proparray);
    const itemToRemoveIndex = jsonpars?.indexOf(propid1);
    this.parsedarray = JSON.parse(proparray);
    {
      this.parsedarray = this.parsedarray.filter(function (item) {
        return item !== propid1;
      });
      this.compareloader1 = true;
      this.compareprop1 = false;
      this.storage.setItem('ComparePropID1_ReSale', JSON.stringify(this.parsedarray));
      this.compareproparray = JSON.parse(this.storage?.getItem('ComparePropID1_ReSale'));
    }
    this.storage.removeItem('comparePropType_ReSale_1');
  }

  closeprop2(propid2) {
    this.compareproparray = JSON.parse(this.storage?.getItem('ComparePropID1_ReSale'));
    if (this.compareproparray.length == 1) {
      this.hideshowcompare = false;
    } else {
      this.hideshowcompare = true;
    }
    if ('ComparePropID1_ReSale' in this.storage) {
    } else {
      this.storage.setItem('ComparePropID1_ReSale', '[]');
    }
    const proparray = this.storage?.getItem('ComparePropID1_ReSale');
    const jsonpars = JSON.parse(proparray);
    const itemToRemoveIndex = jsonpars?.indexOf(propid2);

    this.parsedarray = JSON.parse(proparray);
    {
      this.parsedarray = this.parsedarray.filter(function (item) {
        return item !== propid2;
      });
      this.compareloader2 = true;
      this.compareprop2 = false;
      this.storage.setItem('ComparePropID1_ReSale', JSON.stringify(this.parsedarray));
      this.compareproparray = JSON.parse(this.storage?.getItem('ComparePropID1_ReSale'));
    }
    this.storage.removeItem('comparePropType_ReSale_2');

  }
  CompareNow() {


    this.storage.setItem('page_type', 'Villa')
    this.router.navigate(['/compare-properties']);
    this.storage.setItem('cityname', this.cityname);
  }
  oncompareshowimgclick(propid, proptype) {

    this.hideshowcompare = true;
    if ('ComparePropID1_ReSale' in this.storage) {
    } else {
      this.storage.setItem('ComparePropID1_ReSale', '[]');
    }

    if ('comparePropType_ReSale_1' in this.storage) {
      this.comparePropType = this.storage?.getItem('comparePropType_ReSale_1');
    } else {
      this.comparePropType = this.storage?.getItem('comparePropType_ReSale_2');
    }
    const proparray = this.storage?.getItem('ComparePropID1_ReSale');
    const jsonpars = JSON.parse(proparray);
    this.compareproparray = JSON.parse(this.storage?.getItem('ComparePropID1_ReSale'));
    if (this.comparePropType == null) {
      const itemToRemoveIndex = jsonpars?.indexOf(propid);
      this.parsedarray = JSON.parse(proparray);
      if (itemToRemoveIndex == -1) {
        if (this.compareproparray.length >= 2) {
          swal({
            text: 'Upto two properties can compare at a time',
            type: 'error',
            showConfirmButton: false,
            timer: 2000
          });
        } else {
          this.parsedarray.push(propid);

          this.storage.setItem('ComparePropID1_ReSale', JSON.stringify(this.parsedarray));
          this.compareproparray = JSON.parse(this.storage?.getItem('ComparePropID1_ReSale'));
        }
      } else {
        this.parsedarray = this.parsedarray.filter(function (item) {
          return item !== propid;
        });
        this.compareloader1 = true;
        this.compareprop1 = false;
        this.compareloader2 = true;
        this.compareprop2 = false;
        if (this.compareproparray.length == 1) {
          this.hideshowcompare = false;
          this.storage.removeItem('comparePropType_ReSale_1');
        } else {
          this.hideshowcompare = true;
        }
        this.storage.setItem('ComparePropID1_ReSale', JSON.stringify(this.parsedarray));
        this.compareproparray = JSON.parse(this.storage?.getItem('ComparePropID1_ReSale'));
      }
      this.compareStorageArry = JSON.parse(this.storage?.getItem('ComparePropID1_ReSale'));
      var compare1 = this.compareStorageArry[0];
      var compare2 = this.compareStorageArry[1];
    } else if (this.comparePropType == proptype) {
      const proparray = this.storage?.getItem('ComparePropID1_ReSale');
      const jsonpars = JSON.parse(proparray);
      const itemToRemoveIndex = jsonpars?.indexOf(propid);
      this.parsedarray = JSON.parse(proparray);
      if (itemToRemoveIndex == -1) {
        if (this.compareproparray.length >= 2) {

          swal({
            text: 'Upto two properties can compare at a time',
            type: 'error',
            showConfirmButton: false,
            timer: 2000
          });
        } else {
          this.parsedarray.push(propid);
          this.storage.setItem('ComparePropID1_ReSale', JSON.stringify(this.parsedarray));
          this.compareproparray = JSON.parse(this.storage?.getItem('ComparePropID1_ReSale'));
        }
      }
      else {
        this.parsedarray = this.parsedarray.filter(function (item) {
          return item !== propid;
        });
        this.compareloader1 = true;
        this.compareprop1 = false;
        this.compareloader2 = true;
        this.compareprop2 = false;
        if (this.compareproparray.length == 1) {
          this.hideshowcompare = false;
          this.storage.removeItem('comparePropType_ReSale_1');
        } else {
          this.hideshowcompare = true;
        }
        this.storage.setItem('ComparePropID1_ReSale', JSON.stringify(this.parsedarray));
        this.compareproparray = JSON.parse(this.storage?.getItem('ComparePropID1_ReSale'));
      }
      this.compareStorageArry = JSON.parse(this.storage?.getItem('ComparePropID1_ReSale'));
      var compare1 = this.compareStorageArry[0];
      var compare2 = this.compareStorageArry[1];
    } else {
      swal({
        text: 'Compare only with same Property Type',
        type: 'error',
        showConfirmButton: false,
        timer: 2000
      });
    }
    if (this.comparePropType == null || this.comparePropType == proptype) {
      if (compare1 != undefined) {
        this.Service.getindividualpropertydetails(compare1).subscribe(prop => {
          let propDetails = prop['propertydetails'];
          this.propertiesDetails = propDetails;
          this.propimag1 = this.propertiesDetails[0]['property_coverimage'];
          this.propertyname1 = this.propertiesDetails[0]['PropertyName'];
          this.propid1 = this.propertiesDetails[0]['PropertyID'];
          this.proptype1 = this.propertiesDetails[0]['PropertyType'];
          this.cityname = this.propertiesDetails[0]['City'];
          this.storage.setItem('comparePropType_ReSale_1', this.proptype1);
          this.compareloader1 = false;
          this.compareprop1 = true;
        });
      }
      if (compare2 != undefined) {
        this.Service.getindividualpropertydetails(compare2).subscribe(prop => {
          let propDetails = prop['propertydetails'];
          this.propertiesDetails = propDetails;
          this.propimag2 = this.propertiesDetails[0]['property_coverimage'];
          this.propertyname2 = this.propertiesDetails[0]['PropertyName'];
          this.propid2 = this.propertiesDetails[0]['PropertyID'];
          this.proptype2 = this.propertiesDetails[0]['PropertyType'];
          this.cityname = this.propertiesDetails[0]['City'];
          this.storage.setItem('comparePropType_ReSale_2', this.proptype2);
          this.compareloader2 = false;
          this.compareprop2 = true;
        });
      }
    }
  }

  checkboxClick2() {
    if ($('#exampleCheck2').is(':checked')) {
      $('#contactButton2').removeAttr('disabled'); //enable input
      $('#contactButton2').addClass('contactButton2Active');
    } else {
      $('#contactButton2').attr('disabled', true); //disable input

      $('#contactButton2').removeClass('contactButton2Active');
      $('#contactButton2').addClass('contactButton2');
    }
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
    // Clean up the click listener to avoid memory leaks
    // if (this.clickListener) {
    //   this.clickListener();
    // }
  }

  shareContent(propertydemo) {
    if ((window.navigator as any).share) {
      // if(propertydemo.propertyype != 'Plot'){
      (window.navigator as any)
        .share({
          title: "Homes247.in",
          text: 'Check out this amazing Property!',
          url: 'https://www.homes247.in/property/' + propertydemo.City.toLowerCase().replace(/\s+/g, '-') + '/' + propertydemo.Locality.toLowerCase().replace(/\s+/g, '-') + '/' + propertydemo.PropertyName.toLowerCase().replace(/\s+/g, '-') + '-' + propertydemo.PropertyID,
        })
        .then(() => console.log('Shared Successfully'))
        .catch((error: any) => console.error('Error sharing:', error));

    } else {
      console.log('Web Share API not supported on this device.');
    }
  }


  // isInWishlist(propertyID: number): boolean {
  //   const userId = this.storage?.getItem('userID');
  //   if (userId) {
  //     this.storagearr = this.propertyIds
  //     // this.storagearr.push(this.userFavListLocalStorage);
  //     return this.storagearr.includes(propertyID);

  //   } else {

  //     return this.storagearr.includes(propertyID);
  //   }
  // }

  isInWishlist(propertyID: number): boolean {
    const userId = this.storage?.getItem('userID');

    return userId
      ? (this.storagearr = this.propertyIds, this.storagearr?.includes(propertyID) ?? false)
      : this.storagearr?.includes(propertyID) ?? false;
  }


  //  Pradeesh
  Heart_Transtion(propertyID: number) {
    const index = this.storagearr?.indexOf(propertyID);
    var loginID = this.storage?.getItem('loginID')
    if (index !== -1) {
      this.storagearr.splice(index, 1);
      if (loginID == '1') {
        const userid = this.storage?.getItem('userID');
        var param = {
          userid: userid,
          propid: propertyID,
          CatagoryId: 2
        };
        this.Service.removeFavaourite(param).subscribe(response => {
        });
      }
    }
    else {
      this.storagearr.push(propertyID);
      if (loginID == '1') {
        const userid = this.storage?.getItem('userID');
        var param = {
          userid: userid,
          propid: propertyID,
          CatagoryId: 2
        };
        this.Service.addfavaourite(param).subscribe(response => {
        });
      }
    }
    this.storage.setItem('individualPropertyID', JSON.stringify(this.storagearr));
  }

  // subscription code
  elitePropertyId: any = [];
  contactingPropertyId: any[] = [];
  eliteView: boolean = false;

  contactData: { [key: string]: any } = {};

  elitePlanView(propertyId: string | number) {
    const exists = this.elitePropertyId.includes(propertyId) || this.contactingPropertyId.includes(propertyId);

    if (exists) {
      console.log('Duplicate entry — not added');
      return;
    }

    this.contactingPropertyId.push(propertyId);

    var param = {
      number: this.userNumber,
      userId: this.userId,
      propid: propertyId,
      category_id: 2
    }

    this.eliteService.detailesCard(param).subscribe(response => {
      this.contactingPropertyId = this.contactingPropertyId.filter(id => id !== propertyId);
     if (response['status'] == "True") {
        this.elitePropertyId.push(propertyId);
        this.contactData[String(propertyId)] = response['contacteddata'];

      } else {
        this.elitePlan();
      }
    }, error => {
      this.contactingPropertyId = this.contactingPropertyId.filter(id => id !== propertyId);
    })


    // if (this.elitePropertyId.length < 3) {
    //   this.elitePropertyId.push(propertyId);
    //   console.log('Added:', this.elitePropertyId);
    //   this.eliteView = true;
    //   let stored = JSON.parse(localStorage.getItem('Elite_contact') || '[]');
    //   if (!Array.isArray(stored)) {
    //     stored = [];
    //   }
    //   if (!stored.includes(propertyId)) {
    //     stored.push(propertyId);
    //   }
    //   localStorage.setItem('Elite_contact', JSON.stringify(stored));
    // } else {
    //   console.log('Cannot add more than 3. Calling elitePlan()...');
    //   this.elitePlan();
    // }


    //  this.eliteService.getContactedList(this.userId).subscribe(response => {
    //   this.contactedList = response['pro_view']
    //   this.elitePropertyId = this.contactedList.map(
    //     (item: any) => item.property_IDPK
    //   );
    //  if (this.elitePropertyId.length == 0) {

    // } else {
    //   this.eliteView = true;
    // }
    // })


  }



  // isEliteOpen = true;
  elitePlan() {
    $('#elitePlanModal').modal('show');
  }
  elitePlanRouter() {
    $('#elitePlanClose').click();
     // this.router.navigate(['/homes-elite']);
     window.location.href = 'https://hostinger.homes247.in/homes-elite#1';
  }



}


