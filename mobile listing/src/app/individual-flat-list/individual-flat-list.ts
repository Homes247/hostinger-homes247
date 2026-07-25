import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, DOCUMENT, ElementRef, HostListener, Inject, OnDestroy, OnInit, PLATFORM_ID, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatChip, MatChipSelectionChange, MatChipsModule } from '@angular/material/chips';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CountdownComponent, CountdownEvent } from 'ngx-countdown';
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
// Swal lazy-loaded
import { InnerHeadderWithSidenav } from '../inner-headder-with-sidenav/inner-headder-with-sidenav';
import { ElitedataService } from '../elitedata.service';
import { AdCardsComponent } from "../ad-cards/ad-cards.component";

declare var $: any;
// declare var swal: any;


@Component({
  selector: 'app-individual-flat-list',
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
  templateUrl: './individual-flat-list.html',
  styleUrl: './individual-flat-list.css',
})
export class IndividualFlatList implements OnInit, AfterViewInit, OnDestroy {
  myControl = new FormControl();
  @ViewChild('scrollAnchor', { static: false }) scrollAnchor!: ElementRef;
  @ViewChild('cd', { static: false }) private countdown: CountdownComponent;
  @ViewChild('cancel') cancel: ElementRef;
  public n: number = 1;
  user = new enquiry();
  filterShowHide: boolean;
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
  projectcountRent: any;
  projectpgcount: any;
  projectcountcommercial: any;
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
  FurnishType: any;
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
  ReadyToMoveSelect = false;
  statusid = [];
  UnderConstructionSelect = false;
  listarraylength: any;
  urlcityname: string;
  propertiescount: any;
  propbhk: any;
  proptype: any;
  propname: any;
  IsVisibleEnquery: boolean;
  otploader: boolean = true;
  proparea: any;
  propareatype: any;
  propertyenquire: string;
  userRentalFavList = [];
  propertyIds = [];

  formatsDateTest: string[] = [
    'dd/MM/yyyy',
  ];
  dateNow: Date = new Date();
  dateNowISO = this.dateNow.toISOString();
  dateNowMilliseconds = this.dateNow.getTime();
  @ViewChildren(MatChip) chips!: QueryList<MatChip>;
  currentTab: any;
  currenturl: any;
  Matautocomplete: any;

  // fb: any;

  constructor(private titleService: Title, private meta: Meta,
    public Service: DataService,
    private router: Router,
    public cityservice: CityService,
    private activeroute: ActivatedRoute,
    private Filter: FilterService,
    private eliteService: ElitedataService,

    @Inject(PLATFORM_ID) private platformId: Object,
    private storage: SafeStorageService,
    @Inject(DOCUMENT) private doc,
    private fb: FormBuilder,
  ) {
    this.window = this.doc.defaultView!;
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
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
  innerheader: any;
  propertyimage: any = 'https://img.homes247.in/images/individuallistings/cover/'
  Mousemovement: boolean = false
  @HostListener('window:scroll', [])
  @HostListener('touchstart', [])
  onWindowScroll() {
    this.Mousemovement = true
    this.propertyimage = this.Service.SellImages + 'cover/';
    let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    let max = document.documentElement.scrollHeight;
    if ($(window).scrollTop() >= 140) {
      $('#hidefilter').addClass('hidefilter');
    } else {
      $('#hidefilter').removeClass('hidefilter');
    }
    this.Service.mouseenterservice3();

    import('../enquiry-form-individual/enquiry-form-individual')
      .then(c => {
        this.enquiryFormindComponent = c.EnquiryFormIndividual;
        if (isPlatformBrowser(this.platformId)) {
          $('.modal-login').css('z-index', '99999');
        }
      });
    // const link = document.createElement('link');
    // link.rel = 'preload';
    // link.as = 'style';
    // link.href =
    //   'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css';
    // link.onload = () => {
    //   link.rel = 'stylesheet';
    // };
    // document.head.appendChild(link);
  }
  enquiryFormindComponent: any
  loginidNew: any
  login: boolean = false
  userId: any
  userNumber: any
  contactedList: any
  ngOnInit() {
    // this.FilterTransition();
    // this.dataloads();
    this.geturlparams();
    this.getlocality();
    this.getindividuallist();
    this.getbedrooms();
    this.getpossissions();
    this.getbudgets();
    // this.getindividualfilterdatalist();
    //  this.sortfiltershowhide();
    IndividualFlatList.citycount = 0;
    this.searches = this.activeroute.queryParams['_value']['Searches'];
    this.UserId = this.storage?.getItem('userID');

    //query params connect visibile compare button
    this.activeroute.queryParams.subscribe(params => {
      this.currentTab = params['tab']
    })

    this.userID = this.storage?.getItem('userID');
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
  }
  // propertyimage: any
  // dataloads() {

  // }

  geturlparams() {
    this.routeSub = this.activeroute.params.subscribe(params => {
      this.cityname = params['cityname'];
      String.prototype.toLocaleUpperCase = function () {
        return this.replace(/\w\S*/g, function (txt) {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
      };
      var capsname = this.cityname;
      this.city = capsname;
      this.citybread = capsname;
      this.cityhead = capsname;
      if (this.router.url?.indexOf('bangalore') > -1) {
        this.cityzonelinks = true;
      } else {
        this.cityzonelinks = false;
      }
      // import('../footer/footer.module').then(mod => mod.FooterModule).then(FooterModule => {
      //   this.FooterComponent = FooterModule.components['lazy'];
      //   this.loaded = true;
      // });
      this.currenturl = this.router.url;

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
      });
    });
  }

  getindividuallist() {
    this.otploader = true
    IndividualFlatList.citycount = 4;
    this.routeSub = this.activeroute.params.subscribe(params => {
      var citiname = params['cityname'];
      this.cityapi.limit = '0';
      this.cityapi.limitrows = '4';
      this.citybreadcrump = citiname;
      var limit = '0';
      var limitrows = '4';
      var proptypeid = '1';
      var bedroom = this.bhkarray;
      var min = this.minbudget_IDPK;
      var max = this.maxbudget_IDPK;
      var loc = this.locality;
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
      };


      // console.log(param);
      this.Service.getindividualprojectscount(this.urlcityname, param).subscribe(countprojects => {
        // this.showLoader = true;
        let projectcount = countprojects['Counts'];
        this.propertiescount = projectcount[0].PropertyCounts;
      });
      var param1 = { proptypeid: '50401' };

      this.Service.getprojectscount(this.urlcityname, param1).subscribe(countprojects => {
        let projectcount = countprojects['Counts'];
        this.projectcount = projectcount[0].PropertyCounts;
      });
      var paramrent = {
        proptypeid: "1"
      }
      this.Service.getRentprojectscount(this.urlcityname, paramrent).subscribe(countprojects => {
        let projectcount = countprojects['Counts'];
        this.projectcountRent = projectcount[0].PropertyCounts;
      });
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
      this.Service.getIndividualList(this.urlcityname, param).subscribe(lists => {
        if (lists['status'] === 'True') {
          setTimeout(() => {

            this.otploader = false
          }, 200);
          let propertylists = lists['listings'];
          // this.listarraylength = this.propertylists.length;
          this.propertylists = propertylists;
          this.localId = propertylists[0].Localityid;
          this.listarraylength = false;
          if (this.propertylists.length === 0) {
            this.showLoader = false;
          }
        }

      });
    });
  }

  private observer: IntersectionObserver | null = null;

  ngAfterViewInit() {
    this.initIntersectionObserver();

    this.scripts();
    this.onresize();
    if (this.currentTab == "apartment") {
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
    // this.showLoader = true;
    this.routeSub = this.activeroute.params.subscribe(params => {
      let totalcount = this.propertiescount;
      // const limit = IndividualFlatList.citycount += 4;
      const limit = IndividualFlatList.citycount;
      IndividualFlatList.citycount += 4;
      let limitprprtyrows = 4;
      var rera = this.reraid;
      var bedroom = this.noOfBedrooms;
      var min = this.minbudget_IDPK;
      var max = this.maxbudget_IDPK;
      var pos = this.possission;
      var loc = this.locality;
      var proptypeid = '1';
      var projectStatus = this.projectStatus;
      // var proptypeId = this.projecttype;
      var furnished = this.FurnishType;
      var posted = this.postedby;
      this.UserId = this.storage?.getItem('userID');
      let param = {
        city: this.cityId,
        limit: limit,
        limitrows: limitprprtyrows,
        reraId: rera,
        bedroom: bedroom,
        minprice: min,
        maxprice: max,
        possission: pos,
        locality: loc,
        statusid: projectStatus,
        proptypeid: proptypeid,
        ownership: posted,
        furnish: furnished,
        // userId: this.UserId,
      };
      let livecount = this.propertylists?.length || 0;
      if (livecount < totalcount) {
        return this.Service.getIndividualList(this.urlcityname, param).subscribe(propertylists => {
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
    this.urlcityname = value.cityname.toLowerCase();
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
      $('.ui.search.dropdown').dropdown({
        minCharacters: 3,
        useLabels: false
      });
      $('ui.price_filter.dropdown').dropdown({
        fullTextSearch: true
      });
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
      if (this.router.url?.indexOf('hyderabad') > -1) {
        $('.about_us_banner label.nodescrip').css('top', '67%');
        $('.about_us_banner img').css('height', '140px');
        $('.breadcrumbs_city').css('top', '35%');
      } else if (this.router.url?.indexOf('chennai') > -1) {
        $('.about_us_banner label.nodescrip').css('top', '67%');
        $('.about_us_banner img').css('height', '140px');
        $('.breadcrumbs_city').css('top', '35%');
      } else if (this.router.url?.indexOf('kochi') > -1) {
        $('.about_us_banner label.nodescrip').css('top', '67%');
        $('.about_us_banner img').css('height', '140px');
        $('.breadcrumbs_city').css('top', '35%');
      } else if (this.router.url?.indexOf('pune') > -1) {
        $('.about_us_banner label.nodescrip').css('top', '67%');
        $('.about_us_banner img').css('height', '140px');
        $('.breadcrumbs_city').css('top', '35%');
      }
    } else {

    }

    const userId = this.storage?.getItem('userID');
    if (userId) {
      this.UserId = this.storage?.getItem('userID');


      // this.Service1.getUserWishListByIdTest(this.UserId, 3).subscribe(response => {
      // });

      if ('individualPropertyID' in this.storage) {
        // this.userFavListthis.storage = JSON.parse(this.storage?.getItem('individualPropertyID'));

      } else {
        this.storage.setItem('individualPropertyID', '[]');
        // this.userFavListthis.storage = JSON.parse(this.storage?.getItem('individualPropertyID'));
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


  // onReset() {
  //   this.chips.forEach(chip => chip.deselect());

  //   IndividualFlatList.citycount = 0;
  //   this.localityData = [];

  //   this.localityplace = [];
  //   this.locality = [];
  //   this.balconyarray = [''];
  //   this.FurnishType = [''];
  //   this.postedBy = [''];
  //   this.projecttype = [''];
  //   this.doorfacings = [''];
  //   this.approvals = [''];
  //   this.amenities = [''];
  //   this.bhkarray = [''];
  //   this.possission = '';
  //   this.maxbudget_IDPK = [''];
  //   this.minbudget_IDPK = [''];
  //   this.localityData = [];
  //   this.statusid = [];
  //   this.ReadyToMoveSelect = false;
  //   this.UnderConstructionSelect = false;
  //   this.tweentylaksSelect = false;
  //   this.tweentylaksTosixtylakhsSelect = false;
  //   this.sixtylakhsToEhightylakhsSelect = false;
  //   this.EhightylakhsTooneCrSelect = false;
  //   this.ReadyToMoveSelect = false;


  //   this.getindividuallist();



  // }

  projectType(projectType) {
    this.proptypeId = projectType;
    this.filterSelectOne = false;
  }

  posessionWithin(posession) {
    this.possission = posession;
    this.filterSelectOne = false;

  }


  minbugvalue(id) {
    // debugger
    this.budgetsLength = this.budgets.length;
    this.newBudget = this.budgets.slice(id, this.budgetsLength);
    this.minBugPrice = id;
    this.filterSelectOne = false;

  }

  maxbugvalue(id) {
    // debugger
    this.maxBugPrice = id;
    this.filterSelectOne = false;

  }

  applyFilter() {
    if (this.noOfBedrooms.length != 0 || this.minBugPrice != undefined
      || this.possission != undefined || this.localId != undefined
      || this.proptypeId != undefined
      || this.projectStatus.length != 0 || this.projecttype.length != 0) {
      this.ShowHideFilter();
    } else if (this.noOfBedrooms.length == 0 || this.minBugPrice == undefined
      || this.possission == undefined || this.localId == undefined
      || this.proptypeId == undefined
      || this.projectStatus.length == 0 || this.projecttype.length != 0) {
      this.filterSelectOne = true;
    }
  }

  // update by veera end


  minpriceclick() {
    this.modeldata = this.minprice.budget_IDPK;
    this.budget_show = false;
    this.bud_val_show = true;
    this.minprice_value = this.minprice.budget_value;
  };

  maxpriceclick() {
    this.modelmindata = this.maxprice.budget_IDPK;
    this.budget_show = false;
    this.bud_val_show = true;
    if (this.minprice_value == null) {
      this.minprice_value = '1 L';
    } else {
      this.maxprice_value = this.maxprice.budget_value;
      this.minprice_value = this.minprice.budget_value;
    }
    this.maxprice_value = this.maxprice.budget_value;
  };

  tweentylaksSelect = false;
  tweentylaksTosixtylakhsSelect = false;
  sixtylakhsToEhightylakhsSelect = false;
  EhightylakhsTooneCrSelect = false;
  oneCrAboveCrSelect = false;

  lessThntweentylaks() {
    if (this.tweentylaksSelect === true) {
      this.maxbudget_IDPK = '';
      this.minbudget_IDPK = '';
      this.tweentylaksSelect = false;
    } else if (this.tweentylaksSelect === false) {
      this.maxbudget_IDPK = '200000';
      this.minbudget_IDPK = '1';
      this.tweentylaksSelect = true;
      this.tweentylaksTosixtylakhsSelect = false;
      this.sixtylakhsToEhightylakhsSelect = false;
      this.EhightylakhsTooneCrSelect = false;
      this.oneCrAboveCrSelect = false;
    }
  }

  tweentylaksTosixtylakhs() {
    if (this.tweentylaksTosixtylakhsSelect === true) {
      this.maxbudget_IDPK = '';
      this.minbudget_IDPK = '';
      this.tweentylaksTosixtylakhsSelect = false;
    } else if (this.tweentylaksTosixtylakhsSelect === false) {
      this.maxbudget_IDPK = '600000';
      this.minbudget_IDPK = '200000';
      this.tweentylaksSelect = false;
      this.tweentylaksTosixtylakhsSelect = true;
      this.sixtylakhsToEhightylakhsSelect = false;
      this.EhightylakhsTooneCrSelect = false;
      this.oneCrAboveCrSelect = false;
    }
  }

  sixtylakhsToEhightylakhs() {
    if (this.sixtylakhsToEhightylakhsSelect === true) {
      this.maxbudget_IDPK = '';
      this.minbudget_IDPK = '';
      this.sixtylakhsToEhightylakhsSelect = false;
    } else if (this.sixtylakhsToEhightylakhsSelect === false) {
      this.maxbudget_IDPK = '800000';
      this.minbudget_IDPK = '600000';
      this.tweentylaksSelect = false;
      this.tweentylaksTosixtylakhsSelect = false;
      this.sixtylakhsToEhightylakhsSelect = true;
      this.EhightylakhsTooneCrSelect = false;
      this.oneCrAboveCrSelect = false;
    }
  }

  EhightylakhsTooneCr() {
    if (this.EhightylakhsTooneCrSelect === true) {
      this.maxbudget_IDPK = '';
      this.minbudget_IDPK = '';
      this.EhightylakhsTooneCrSelect = false;
    } else if (this.EhightylakhsTooneCrSelect === false) {
      this.maxbudget_IDPK = '10000000';
      this.minbudget_IDPK = '800000';
      this.tweentylaksSelect = false;
      this.tweentylaksTosixtylakhsSelect = false;
      this.sixtylakhsToEhightylakhsSelect = false;
      this.EhightylakhsTooneCrSelect = true;
      this.oneCrAboveCrSelect = false;
    }
  }

  oneCrAbove() {
    if (this.oneCrAboveCrSelect === true) {
      this.maxbudget_IDPK = '';
      this.minbudget_IDPK = '';
      this.oneCrAboveCrSelect = false;
    } else if (this.oneCrAboveCrSelect === false) {
      this.maxbudget_IDPK = '50000000';
      this.minbudget_IDPK = '10000000';
      this.tweentylaksSelect = false;
      this.tweentylaksTosixtylakhsSelect = false;
      this.sixtylakhsToEhightylakhsSelect = false;
      this.EhightylakhsTooneCrSelect = false;
      this.oneCrAboveCrSelect = true;
    }
  }

  ImmediateSelect = false;
  SixMonthsSelect = false;
  OneYearSelect = false;
  twoYearSelect = false;


  ReadyToMoveclick() {
    this.ReadyToMoveSelect = !this.ReadyToMoveSelect;
    if (this.ReadyToMoveSelect) {
      // this.statusid = '138564';
      this.statusid.push('138564');
    } else if (this.ReadyToMoveSelect === false) {
      for (var i = 0; i < this.statusid.length; i++) {
        if (this.statusid[i] === '138564') {
          this.statusid.splice(i, 1);
        }
      }
    }
  }

  UnderConstructionclick() {
    this.UnderConstructionSelect = !this.UnderConstructionSelect;
    if (this.UnderConstructionSelect) {
      this.statusid.push('138565');
    } else if (this.UnderConstructionSelect === false) {
      // this.statusid = '138565';
      for (var i = 0; i < this.statusid.length; i++) {
        if (this.statusid[i] === '138565') {
          this.statusid.splice(i, 1);
        }
      }
    }
  }

  PosessionImmediate() {
    if (this.ImmediateSelect === true) {
      this.possission = '';
      this.ImmediateSelect = false;
    } else if (this.ImmediateSelect === false) {
      this.possission = '1';
      this.ImmediateSelect = true;
      this.SixMonthsSelect = false;
      this.OneYearSelect = false;
      this.twoYearSelect = false;
    }
  }

  PosessionSixMonths() {
    if (this.SixMonthsSelect === true) {
      this.possission = '';
      this.SixMonthsSelect = false;
    } else if (this.SixMonthsSelect === false) {
      this.possission = '6';
      this.ImmediateSelect = false;
      this.SixMonthsSelect = true;
      this.OneYearSelect = false;
      this.twoYearSelect = false;
    }
  }

  PosessionOneYear() {
    if (this.OneYearSelect === true) {
      this.possission = '';
      this.OneYearSelect = false;
    } else if (this.OneYearSelect === false) {
      this.possission = '12';
      this.ImmediateSelect = false;
      this.SixMonthsSelect = false;
      this.OneYearSelect = true;
      this.twoYearSelect = false;
    }
  }

  PosessionTwoYearAbove() {
    if (this.twoYearSelect === true) {
      this.possission = '';
      this.twoYearSelect = false;
    } else if (this.twoYearSelect === false) {
      this.possission = '24';
      this.ImmediateSelect = false;
      this.SixMonthsSelect = false;
      this.OneYearSelect = false;
      this.twoYearSelect = true;
    }
  }




  localityplace = [];

  onLocalityDeSelect(event) {
    this.localityplace = this.localityplace.filter((item) => item !== event);
    this.locality = this.locality.filter((item) => item !== event.locality_IDPK);

    // this.Filter.servicelocality = this.locality;
    // this.Service.mouseenterservice1();
    // this.getcity();
    this.getindividuallist();

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
    });
  }

  getbudgets() {
    this.Service.getbudgets().subscribe(budgets => {
      this.budgets = budgets['budget'];
    });
  }

  getpossissions() {
    this.Service.getpossissions().subscribe(possissions => {
      this.possissions = possissions['possission'];
    });
  }

  onLocalitySelect(event) {
    this.locality.push(event.locality_IDPK);

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
        $('.compare_sort_filter_div').css('visibility', 'visible');
      } else {
        $('.compare_sort_filter_div').css('visibility', 'hidden');
        $('#fixed-accordion').css('visibility', 'hidden');
      }
      prevScrollpos = currentScrollPos;
      window.clearTimeout(isScrolling);
      isScrolling = setTimeout(function () {
        $('.compare_sort_filter_div').css('visibility', 'visible');
      }, 2000);
      if ($(window).scrollTop() + $(window).height() > $(document).height() - 200) {
        $('.compare_sort_filter_div').css('visibility', 'hidden');
        isScrolling = setTimeout(function () {
          $('.compare_sort_filter_div').css('visibility', 'hidden');
        }, 2000);
      }
    }, false);
  }

  ShowHideSort() {
    this.sortShowHide = this.sortShowHide ? false : true;
  }

  // HideSort() {
  //   this.sortShowHide = false;
  // }

  // new radha update

  // filters list

  // getindividualfilterdatalist() {
  //   this.Service.getindividualfilterslist().subscribe(list => {
  //     this.bhklist = list['Bhks'];
  //     this.balconylist = list['Balcony'];
  //     this.bathroomlist = list['Bathroom'];
  //     this.furnishlist = list['Furnish'];
  //     this.Tenantslist = list['Tenants'];
  //     this.Ownershiplist = list['Ownership'];
  //     this.Propertytypelist = list['Propertytype'];
  //     this.Doorfacelist = list['Doorface'];
  //     this.Approvalslist = list['Approvals'];
  //     this.Amenitieslist = list['Amenities'];
  //   });
  // }


  // toggleSelectionbhk(chip: MatChip, option) {
  //   chip.toggleSelected();
  // }

  changeSelectedbhk($event: MatChipSelectionChange, option) {
    // console.log($event.selected);
    if ($event.selected === true) {
      this.bhkarray.push(option.id);
    } else if ($event.selected === false) {
      for (var i = 0; i < this.bhkarray.length; i++) {
        if (this.bhkarray[i] === option.id) {
          this.bhkarray.splice(i, 1);
        }
      }
    }
    //  this.GetRentalList();
  }

  changeSelectedFurnishestype($event: MatChipSelectionChange, option) {
    if ($event.selected === true) {
      this.FurnishType = option.id;
    }
    else if ($event.selected === false) {
      this.FurnishType = '';
    }

  }

  // toggleSelectionFurnishedtype(chip: MatChip, option) {
  //   chip.toggleSelected();
  // }

  // toggleSelectionbalcony(chip: MatChip, option) {
  //   chip.toggleSelected();
  // }

  // changeSelectedbalcony($event: MatChipSelectionChange, option) {
  //   // console.log($event.selected);
  //   if ($event.selected === true) {
  //     this.balconyarray.push(option.id);
  //   } else if ($event.selected === false) {
  //     for (var i = 0; i < this.balconyarray.length; i++) {
  //       if (this.balconyarray[i] === option.id) {
  //         this.balconyarray.splice(i, 1);
  //       }
  //     }
  //   }
  //   //  this.GetRentalList();
  // }

  // toggleSelectionbathroom(chip: MatChip, option) {
  //   chip.toggleSelected();
  // }

  // changeSelectedbathroom($event: MatChipSelectionChange, option) {
  //   // console.log($event.selected);
  //   if ($event.selected === true) {
  //     this.bathroomarray.push(option.id);
  //   } else if ($event.selected === false) {
  //     for (var i = 0; i < this.bathroomarray.length; i++) {
  //       if (this.bathroomarray[i] === option.id) {
  //         this.bathroomarray.splice(i, 1);
  //       }
  //     }
  //   }
  //   //  this.GetRentalList();
  // }

  changeSelectedfurnished(option) {
    this.FurnishType = option.id;
  }



  // changeSelectedownership($event: MatChipSelectionChange, option) {

  //   if ($event.selected === true) {
  //     this.postedBy = option.id;
  //   }
  //   else if ($event.selected === false) {
  //     this.postedBy = ''


  //   }

  // }
  // toggleSelectionpostedtype(chip: MatChip, option) {

  //   chip.toggleSelected();

  // }
  // toggleSelectionpropertytype(chip: MatChip, option) {
  //   chip.toggleSelected();
  // }

  changeSelectedpropertytype($event: MatChipSelectionChange, option) {
    // console.log($event.selected);
    if ($event.selected === true) {
      this.projecttype.push(option.id);
    } else if ($event.selected === false) {
      for (var i = 0; i < this.projecttype.length; i++) {
        if (this.projecttype[i] === option.id) {
          this.projecttype.splice(i, 1);
        }
      }
    }
  }

  // toggleSelectiondoorface(chip: MatChip, option) {
  //   chip.toggleSelected();
  // }

  changeSelecteddoorface($event: MatChipSelectionChange, option) {
    // console.log($event.selected);
    if ($event.selected === true) {
      this.doorfacings.push(option.id);
    } else if ($event.selected === false) {
      for (var i = 0; i < this.doorfacings.length; i++) {
        if (this.doorfacings[i] === option.id) {
          this.doorfacings.splice(i, 1);
        }
      }
    }
    //  this.GetRentalList();
  }


  // toggleSelectionamenities(chip: MatChip, option) {
  //   chip.toggleSelected();
  // }

  changeSelectedamenities($event: MatChipSelectionChange, option) {
    if ($event.selected === true) {
      this.amenities.push(option.id);
    } else if ($event.selected === false) {
      for (var i = 0; i < this.amenities.length; i++) {
        if (this.amenities[i] === option.id) {
          this.amenities.splice(i, 1);
        }
      }
    }
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
    if (this.proptype !== 'Plot') {
      var pageOrgin = this.propbhk + '-' + this.proptype + '-' + this.propname;
      // var propertyname = this.propname;
      this.propertyenquire = pageOrgin;
    }
    if (this.proptype === 'Plot') {
      // var propertyname = this.propname;
      var pageOrgin = this.proparea + ' ' + this.propareatype + '-' + this.proptype + '-' + this.propname;
      this.propertyenquire = pageOrgin;
    }
    this.Service.individuallistenq(param, this.propertyenquire, this.propname, this.propUserIDPK).subscribe(async success => {
      if (success['status'] === 'True') {
        this.otploader = false;
        this.cancel.nativeElement.click();
        $('body').removeClass('bodyoverlay');
        const Swal = await this.getSwal();
        Swal.fire({
          text: 'We Will Intimate you soon!',
          icon: 'success',
          showConfirmButton: false,
          timer: 2500
        });
        $('#modal-container2').addClass('out');
        $('body').removeClass('modal-active');
        this.user.name = '';
        this.user.number = '';
        this.user.mail = '';
        this.user.otp = '';
        this.IsVisibleEnquery = false;
        $('#btn_reset2').click();
        $('#uname').attr('placeholder', 'Username');
        $('#uemail').attr('placeholder', 'Email');
        $('#unumber').attr('placeholder', '+91');
        $('#contactButton2').attr('disabled', true);
        // $('#exampleCheck2').attr('disabled',false); 
        $('#exampleCheck2').attr('checked', false); // Unchecks 
      } else {
        const Swal = await this.getSwal();
        Swal.fire({
          icon: 'error',
          title: 'Something Went Wrong',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  }
  transitionEnd(event) {
    var dv = document.getElementById("floatinglink");
    var dvStyle = dv.getAttribute('style');
    if (dvStyle?.indexOf("translateX(-584%)") > -1) {
      $('.floating-link').css('width', '216px');
      $('.border_div').css('opacity', '1');
      $('#floating_img').css('display', 'none');

    }
  }





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


    this.storage.setItem('page_type', 'Allapartment')
    this.router.navigate(['/compare-properties']);
    this.storage.setItem('cityname', this.cityname);
  }
  private async getSwal() {
    const { default: Swal } = await import('sweetalert2');
    return Swal;
  }


  async oncompareshowimgclick(propid, proptype) {

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
          const Swal = await this.getSwal();
          Swal.fire({
            text: 'Upto two properties can compare at a time',
            icon: 'error',
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

          const Swal = await this.getSwal();
          Swal.fire({
            text: 'Upto two properties can compare at a time',
            icon: 'error',
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
      const Swal = await this.getSwal();
      Swal.fire({
        text: 'Compare only with same Property Type',
        icon: 'error',
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

  // isInWishlist(propertyID: number): boolean {
  //   const userId = this.storage?.getItem('userID');
  //   if (userId) {
  //     this.storagearr = this.propertyIds
  //     // this.storagearr.push(this.userFavListthis.storage);
  //     return this.storagearr.includes(propertyID);

  //   } else {

  //     return this.storagearr.includes(propertyID);
  //   }
  // }

  isInWishlist(propertyID: number): boolean {
    const userId = this.storage?.getItem('userID');

    return userId
      ? (this.storagearr = this.propertyIds, this.storagearr.includes(propertyID) ?? false)
      : this.storagearr.includes(propertyID) ?? false;
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

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
    // Clean up the click listener to avoid memory leaks
    // if (this.clickListener) {
    //   this.clickListener();
    // }
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


