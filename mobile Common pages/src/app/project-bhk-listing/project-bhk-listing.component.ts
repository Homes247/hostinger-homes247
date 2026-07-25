import {Component, ElementRef, HostListener, Inject, OnInit, PLATFORM_ID, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {CountdownComponent, CountdownEvent} from 'ngx-countdown';
import {Enquiry} from '../home/home';
import {City, flitercity, minmax} from '../city/city';
import {Observable, Subscription} from 'rxjs';
import {Meta, Title} from '@angular/platform-browser';
import {DataService} from '../data.service';
import {ActivatedRoute, Router} from '@angular/router';
import {LOCAL_STORAGE, WINDOW} from '@ng-toolkit/universal';
import {DataService2} from '../data.service2';
import { map, startWith } from 'rxjs/operators';
import { ServerResponseService_Project_bhk_listing } from '../server-respnse-project-bhk-listing.service';
import { FilterService } from '../filter.service';


declare var $: any;
declare var swal: any;

declare var $: any;
@Component({
  selector: 'app-project-bhk-listing',
  templateUrl: './project-bhk-listing.component.html',
  styleUrls: ['./project-bhk-listing.component.css'],
  providers: [ServerResponseService_Project_bhk_listing]

})

export class ProjectBhkListingComponent implements OnInit {
  myControl = new FormControl();
  @ViewChild('cd', {static: false}) private countdown: CountdownComponent;
  @ViewChild('cd2', {static: false}) private countdown2: CountdownComponent;
  @ViewChild('cancel') cancel: ElementRef;
  public autoCompleteData: { [key: string]: Object }[] = [];
  public localityproperties: { [key: string]: Object }[] = [];
  public n: number = 1;

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

  Date = new Date();
  user = new Enquiry();
  enquiry = new Enquiry();
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
  propertyimage = this.Service.imagesURL + 'uploadPropertyImgs/';
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
  formatsDateTest: string[] = [
    'dd/MM/yyyy',
  ];
  dateNow: Date = new Date();
  dateNowISO = this.dateNow.toISOString();
  dateNowMilliseconds = this.dateNow.getTime();
  minprice = new minmax();
  maxprice = new minmax();
  modelmindata: any;
  minprice_value: any;
  maxprice_value: any;
  modeldata: any;

  showLoader = true;
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
  propertyNameSeo: any;
  city_nameSeo: any;
  currenturl: any;

  componentloads = false;


  enquiryFormComponent: any;
  otploader = false;

  constructor(private titleService: Title, private meta: Meta,
              public Service: DataService,
              public Service2: DataService2,
              public Filter: FilterService,

              private router: Router,
              private activeroute: ActivatedRoute,
              public responseService_Project_bhk_listing: ServerResponseService_Project_bhk_listing,

              @Inject(PLATFORM_ID) private platformId: Object, @Inject(WINDOW) private window: Window,
              private fb: FormBuilder, @Inject(LOCAL_STORAGE) private Local_Storage: any,
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
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
  innerheader:any;
  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    let max = document.documentElement.scrollHeight;

    if(this.componentloads == false){
      this.componentloads = true;
   

    import('../enquiry-form/enquiry-form.module').then(mod => mod.enquiryFormModule).then(enquiryFormModule =>{
      this.enquiryFormComponent = enquiryFormModule.components['lazy'];
    $('.modal-login').css('z-index', '99999');
    });
  }

    // import('../innerheader/innerheader.module').then(mod => mod.InnerHeaderModule).then(InnerHeaderModule => {
    //   this.innerheader = InnerHeaderModule.components['lazy'];
    //   this.loaded = true;
    // });
    // if ($(window).scrollTop() >= $('.footerDiv').offset().top) {
    //   $('#conatctbutton').addClass('conatctbuttonhide');
    //   $('.filterHide').addClass('conatctbuttonhide');
    //   $('.compare_sort_filter_div').css('visibility', 'hidden');
    // } else {
    //   $('#conatctbutton').removeClass('conatctbuttonhide');
    //   $('.filterHide').removeClass('conatctbuttonhide');
    //   $('.compare_sort_filter_div').css('visibility', 'visible');
    // }
    // if ($(window).scrollTop() >= 140) {
    //   $('#hidefilter').addClass('hidefilter');
    // } else {
    //   $('#hidefilter').removeClass('hidefilter');
    // }
  }

  ngOnInit() {
    // this.geturlparams();
    this.getcity();
    this.dataloads();
    this.CheckCity();
    this.getlocality();
    this.semanticjquery();
    this.scripts();
    this.getbedrooms();
    this.getpossissions();
    this.getbudgets();
    this.onresize();
    this.FilterTransition();
    this.currenturl = this.router.url;
    //  this.sortfiltershowhide();
    ProjectBhkListingComponent.citycount = 4;
    this.searches = this.activeroute.queryParams['_value']['Searches'];
    this.Service.getAuto(this.cityId).subscribe((myLocalList) => {
      this.apioptions(myLocalList['autolist']);
      this.autoCompleteData = myLocalList['autolist'];
      
    });
    var autocomppropparams = {
      cityid: this.cityId,
      statusid: status,
      proptypeid: this.proptypeid,
      locality_id: this.loc
    }
    this.Service.getlocalityproperties(autocomppropparams).subscribe(
      (lists) => {
        this.localityproperties = lists['autolist'];
      }
    );
  }
  galleryimages: any;
  galleryimagesLength: any;
  floorplans: any;
  Amenities: any;
  banks: any;
  approvals: any;
  approvalsfaq: any;
  bankfaq: any;
  bhkfilter: any;
  bhkdata: any;
  descriptions: any;
  PropDescription: any;
  areamin: any;
  areamax: any;
  pricemin: any;
  pricemax: any;
  dimension: any;
  totalflats: any;
  converted: any;
  builderdetails: any;
  fielddata: any;
  propertiesDetailsnew: any;
  propertyType: any;
  pertyTypeH2: any;
  locality_name: any;
  city_name: any;
  Status: any;
  BuliderName: any;
  propertyName: any;
  floorplansCounts: any;
  updateddate: any;
  masterImgPath: any;
  onVillasSelect: boolean;
  onPlotsSelect: boolean;
  onApartmentSelect: boolean;
  ImageUrl = this.Service.imagesURL + 'uploadPropertyImgs/';
  masterimages = this.Service.imagesURL + 'masterImgs/';
  uploadBHKImages = this.Service.imagesURL + 'uploadBHKImgs/';
  amenitesImages = this.Service.amenitiesImageURL + 'amenites//amenities-new/';
  property_info_IDPK: any;

  dataloads() {
    // this.imageforstructuredata = this.ImageUrl.replace('https://img.gs/gzsqchnjxv/full/', '');
    this.routeSub = this.activeroute.params.subscribe(params => {
      var cityname = params['cityname'];
      var localityname = params['locality'];
      var lasturl = params['propname-for-sale-in-:cityname-:propid'];
      var propid = lasturl.split('-').pop().match(/[0-9]+/);
      this.propID = propid;
      var propnamedashes = lasturl.replace(propid, '');
      var propname = propnamedashes.replace(/-/g, ' ');
      // Property Basic Details For First Load Starts
      this.Service2.getpropertynew(propid).subscribe(prop => {
        const datadetails = prop['details'];
        this.propertiesDetails = datadetails;
        this.propertyType = datadetails[0]['propertyType'];
        if (this.propertyType === 'Apartments') {
          this.onApartmentSelect = true;
          this.pertyTypeH2 = 'Apartment';
        } else if (this.propertyType === 'Villas') {
          this.onVillasSelect = true;
          this.pertyTypeH2 = 'Villa';
        } else if (this.propertyType === 'Plots') {
          this.onPlotsSelect = true;
          this.pertyTypeH2 = 'Plot';
        }
        this.locality_name = datadetails[0]['locality_name'];
        this.city_name = datadetails[0]['city_name'];
        this.Status = datadetails[0]['Status'];
        this.BuliderName = datadetails[0]['BuilderName'];
        this.propertyName = datadetails[0]['propertyName'];
        this.updateddate = datadetails[0]['lastupdated'];
        this.masterImgPath = datadetails[0]['masterImgPath'];
        this.property_info_IDPK = datadetails[0]['property_info_IDPK'];

        this.propertyNameSeo =  this.propertyName.toLowerCase().replace(/\s+/g, '-')
        var propertyNameSeo =  this.propertyName.toLowerCase().replace(/\s+/g, '-')
        this.city_nameSeo =  this.city_name.toLowerCase().replace(/\s+/g, '-')
        var city_nameSeo =  this.city_name.toLowerCase().replace(/\s+/g, '-')

        if(this.router.url.indexOf('/project/'+propertyNameSeo+'-for-sale-in-'+city_nameSeo+'-'+propid) > -1) {
        }else{
          this.responseService_Project_bhk_listing.set301Status(propertyNameSeo,city_nameSeo,propid);
        }
        this.titleService.setTitle(this.propertyName + ' Sale, Resale Price, Properties & Flats for sale in ' + this.propertyName + ' ' + this.city_name);
        this.meta.updateTag({
          name: 'description',
          content: 'Check out the Price & Reviews of ' + this.propertyName + ' '+ this.locality_name +', '+this.city_name+'. Explore the Best Flats, Best Amenities and Exclusive Deals from Homes247.in'
        });
      });
      // Property Basic Details For First Load Ends

      // Property Amenities,Approvals,banks,gallery,bhkdetails with floorplan Starts

      this.Service2.get_amen_appro_banks(this.propID).subscribe(datadetails => {
        let otherdatas = datadetails['details'];
        this.galleryimages = otherdatas[0].images;
        this.galleryimagesLength = otherdatas[0]['images'].length;
        this.floorplans = otherdatas[0].BHK_Details;
        this.floorplansCounts = otherdatas[0].BHK_Details.length;
        this.Amenities = otherdatas[0].Amenities_Details;
        this.banks = otherdatas[0].Bank_Details;
        this.showLoader = false;
      });

      // Property Amenities,Approvals,banks,gallery,bhkdetails with floorplan Ends

      this.Service.getfields(this.propID).subscribe(fields => {
        let fielddetails = fields['fielddetails'];
        this.fielddata = fielddetails;
        this.areamin = this.fielddata[0].value;
        this.areamax = this.fielddata[1].value;
        this.pricemin = this.fielddata[3].value;
        this.pricemax = this.fielddata[4].value;
        this.dimension = this.fielddata[2].value;
        this.totalflats = this.fielddata[5].value;
        const minpricenumbers = this.pricemin.replace(/[^\d.-]/g, '');
        const minpricevalue = this.pricemin.replace(/\d./g, '').trim();
        if (minpricevalue == 'Cr') {
          this.converted = minpricenumbers * 10000000;
        } else {
          this.converted = minpricenumbers * 100000;
        }
      });

      //  Property BHK Data for First load Starts

      this.Service2.getbhkbyid(this.propID).subscribe(bhk => {
        let bhkdetails = bhk['bhkdetails'];
        this.bhkdata = bhkdetails;
      });

      //  Property BHK Data for First load Ends

      // Property Builder and locality descriptions Starts

      this.Service2.getdescriptionsbyid(this.propID).subscribe(desc => {
        let description = desc['descriptions'];
        this.descriptions = description;
        this.builderdetails = description[0].Builder_details[0];
      });

      // Property Builder and locality descriptions Ends
    });
  }
  currentCity: any;
  CheckCity(){
    if (this.router.url.indexOf('bangalore') > -1) {
      this.cityId = '1';
      this.currentCity = 'Bangalore';
    } else if (this.router.url.indexOf('hyderabad') > -1) {
      this.cityId = '2';
      this.currentCity = 'Hyderabad';
    } else if (this.router.url.indexOf('chennai') > -1) {
      this.cityId = '3';
      this.currentCity = 'Chennai';
    } else if (this.router.url.indexOf('kochi') > -1) {
      this.cityId = '4';
      this.currentCity = 'Kochi';
    } else if (this.router.url.indexOf('pune') > -1) {
      this.cityId = '5';
      this.currentCity = 'Pune';
    } else if (this.router.url.indexOf('delhi') > -1) {
      this.cityId = '6';
      this.currentCity = 'Delhi';
    } else if (this.router.url.indexOf('kolkata') > -1) {
      this.cityId = '7';
      this.currentCity = 'Kolkata';
    } else if (this.router.url.indexOf('mumbai') > -1) {
      this.cityId = '8';
      this.currentCity = 'Mumbai';
    }else if (this.router.url.indexOf('goa') > -1) {
      this.cityId = '9';
      this.currentCity = 'Goa';
    } else if (this.router.url.indexOf('gurgaon') > -1) {
      this.cityId = '10';
      this.currentCity = 'Gurgaon';
    } else if (this.router.url.indexOf('mysore') > -1) {
      this.cityId = '11';
      this.currentCity = 'Mysore';
    } else if (this.router.url.indexOf('coimbatore') > -1) {
      this.cityId = '12';
      this.currentCity = 'Coimbatore';
    } else if (this.router.url.indexOf('ahmedabad') > -1) {
      this.cityId = '13';
      this.currentCity = 'Ahmedabad';
    } else if (this.router.url.indexOf('trivandrum') > -1) {
      this.cityId = '14';
      this.currentCity = 'Trivandrum';
    } else if (this.router.url.indexOf('navi-mumbai') > -1) {
      this.cityId = '15';
      this.currentCity = 'Navi Mumbai';
    }
    var individualParm = {
    };
  }

  geturlparams() {
    this.routeSub = this.activeroute.params.subscribe(params => {
      this.cityname = params['cityname'];
      String.prototype.toLocaleUpperCase = function() {
        return this.replace(/\w\S*/g, function(txt) {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
      };
      var capsname = this.cityname.toLocaleUpperCase();
      this.city = capsname.replace('-',' ');
      this.citybread = capsname;
      this.cityhead = capsname;
      if (this.router.url.indexOf('bangalore') > -1) {
        this.cityzonelinks = true;
        this.cityidseo = '1';
        this.meta.updateTag({property: 'og:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp'});
      } else if (this.router.url.indexOf('hyderabad') > -1) {
        this.cityzonelinks = false;
        this.cityidseo = '2';
        this.meta.updateTag({property: 'og:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_mobile/images/og/hyderabad.png'});

      } else if (this.router.url.indexOf('chennai') > -1) {
        this.cityzonelinks = false;
        this.cityidseo = '3';
        this.meta.updateTag({property: 'og:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_mobile/images/og/chennai.png'});

      } else if (this.router.url.indexOf('kochi') > -1) {
        this.cityzonelinks = false;
        this.cityidseo = '4';
        this.meta.updateTag({property: 'og:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_mobile/images/og/kochi.png'});

      } else if (this.router.url.indexOf('pune') > -1) {
        this.cityzonelinks = false;
        this.cityidseo = '5';
        this.meta.updateTag({property: 'og:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_mobile/images/og/pune.png'});
        $('.about_us_banner label.nodescrip').css('top', '67%');
        $('.about_us_banner img').css('height', '140px');
        $('.breadcrumbs_city').css('top', '35%');
      } else if (this.router.url.indexOf('mumbai') > -1) {
        this.cityzonelinks = false;
        this.cityidseo = '8';
        this.meta.updateTag({
          property: 'og:image',
          content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_mobile/images/city-banners/mumbai.jpg'
        });
      } else if (this.router.url.indexOf('delhi') > -1) {
        this.cityzonelinks = false;
        this.cityidseo = '6';
        this.meta.updateTag({
          property: 'og:image',
          content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_mobile/images/city-banners/delhi.jpg'
        });
      } else if (this.router.url.indexOf('kolkata') > -1) {
        this.cityzonelinks = false;
        this.cityidseo = '7';
        this.meta.updateTag({
          property: 'og:image',
          content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_mobile/images/city-banners/kolkata.jpg'
        });
      } else if (this.router.url.indexOf('goa') > -1) {
        this.cityzonelinks = false;
        this.cityidseo = '9';
      }
    });
  }
  proptypeid: any;
  loc:any;
  @HostListener('touchstart', ['$event'])
  OnTouch() {
    this.Service.mouseenterservice3();
  }

  FilterTransition() {
    var lastScrollTop = 0;
    $(window).scroll(function (event) {
      var st = $(this).scrollTop();
      if (st > lastScrollTop) {
        document.getElementById("move").style.transform = "translateX(0) rotate(0)";
        document.getElementById("move").style.transition = " all 0.5s";
        document.getElementById("floatinglink").style.transform = "translateX(0%)";
        document.getElementById("floatinglink").style.transition = " all 0.8s";
        $('.floating-link').css('width', '');
        $('.border_div').css('opacity', '0');
        $('#floating_img').css('display', 'block');
      } else {
        document.getElementById("move").style.transform = "translateX(0) rotate(-360deg)";
        document.getElementById("move").style.transition = " all 0.5s";
        document.getElementById("floatinglink").style.transform = "translateX(-584%)";
        document.getElementById("floatinglink").style.transition = " all 0.8s";
        $('.border_div').removeAttr('id');
      }
      lastScrollTop = st;
    });

    $(window).scroll(function () {
      clearTimeout($.data(this, 'scrollTimer'));
      $.data(this, 'scrollTimer', setTimeout(function () {
        document.getElementById("move").style.transform = "translateX(0) rotate(-360deg)";
        document.getElementById("move").style.transition = " all 0.5s";
        document.getElementById("floatinglink").style.transform = "translateX(-584%)";
        document.getElementById("floatinglink").style.transition = " all 0.8s";
        $('.border_div').removeAttr('id');
      }, 1000));
    });

  }
  transitionEnd(event) {
    var dv = document.getElementById("floatinglink");
    var dvStyle = dv.getAttribute('style');
    if (dvStyle.indexOf("translateX(-584%)") > -1) {
      $('.floating-link').css('width', '216px');
      $('.border_div').css('opacity', '1');
      $('#floating_img').css('display', 'none');

    }
  }
  getcity() {
    // this.showLoader = true;
    this.routeSub = this.activeroute.params.subscribe(params => {
      var citiname = params['cityname'].replace('-',' ');
      this.cityapi.limit = '0';
      this.cityapi.limitrows = '4';
      this.citybreadcrump = citiname;
      var limitparam = 0;
      var limitprprtyrows = 4;
      var search = this.searches;
      this.UserId = this.Local_Storage.getItem("userID");
      var param = {
        limit: limitparam,
        limitrows: limitprprtyrows,
        reraId: this.reraid,
        bedroom: this.noOfBedrooms,
        minprice: this.minbudget_IDPK,
        maxprice: this.maxbudget_IDPK,
        possission: this.possission,
        locality: this.locality,
        searches: search,
        userId: this.UserId,
      };


      this.Service.getprojectscount(citiname, param).subscribe(countprojects => {
        this.showLoader = true;
        let projectcount = countprojects['Counts'];
        this.projectcount = projectcount[0].PropertyCounts;
      });
  
    });
    import('../footer/footer.module').then(mod => mod.FooterModule).then(FooterModule => {
      this.FooterComponent = FooterModule.components['lazy'];
      this.loaded = true;
    });
  }
  options;
  filteredOptions: Observable<any>;
  apioptions(apivalue) {
    this.options = apivalue;
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => (value.length >= 1 ? this._filter(value) : []))
    );
  }

  private _filter(value: string) {
    const filterValue = value.toLowerCase();
    return this.options.filter((option) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }
  IsVisibles = false;
  SHowinternallinks() {
    this.IsVisibles = this.IsVisibles ? false : true;
  }
  internallinkhide0() {
    $('.f0').css('position', 'relative', 'z-index', '999');
    $('.f1').css('position', 'relative', 'z-index', '0');
    $('.f2').css('position', 'relative', 'z-index', '0');
    $('.f3').css('position', 'relative', 'z-index', '0');
    $('.f4').css('position', 'relative', 'z-index', '0');
    $('.f5').css('position', 'relative', 'z-index', '0');
    $('.f6').css('position', 'relative', 'z-index', '0');
    $('.f7').css('position', 'relative', 'z-index', '0');
    $('#a0').css('box-shadow', 'inset 0 100px 0 0 rgba(255, 255, 255, 1)');
    $('#a1').removeAttr('style');
    $('#a2').removeAttr('style');
    $('#a3').removeAttr('style');
    $('#a4').removeAttr('style');
    // $('#a5').removeAttr('style');
    // $('#a6').removeAttr('style');
    // $('#a7').removeAttr('style');
    // $('#a8').removeAttr('style');
    // $('#a9').removeAttr('style');
    // $('#a10').removeAttr('style');
    // $('#a11').removeAttr('style');
    $('label').removeClass('statinghovertab');
  }
  internallinkhide1() {
    $('.f0').css('position', 'relative', 'z-index', '0');
    $('.f1').css('position', 'relative', 'z-index', '999');
    $('.f2').css('position', 'relative', 'z-index', '0');
    $('.f3').css('position', 'relative', 'z-index', '0');
    $('.f4').css('position', 'relative', 'z-index', '0');
    $('.f5').css('position', 'relative', 'z-index', '0');
    $('.f6').css('position', 'relative', 'z-index', '0');
    $('.f7').css('position', 'relative', 'z-index', '0');
    $('#a0').removeAttr('style');
    $('#a1').css('box-shadow', 'inset 0 100px 0 0 rgba(255, 255, 255, 1)');
    $('#a2').removeAttr('style');
    $('#a3').removeAttr('style');
    $('#a4').removeAttr('style');
    // $('#a5').removeAttr('style');
    // $('#a6').removeAttr('style');
    // $('#a7').removeAttr('style');
    // $('#a8').removeAttr('style');
    // $('#a9').removeAttr('style');
    // $('#a10').removeAttr('style');
    // $('#a11').removeAttr('style');
    $('label').removeClass('statinghovertab');
  }
  internallinkhide2() {
    $('.f0').css('position', 'relative', 'z-index', '0');
    $('.f1').css('position', 'relative', 'z-index', '0');
    $('.f2').css('position', 'relative', 'z-index', '999');
    $('.f3').css('position', 'relative', 'z-index', '0');
    $('.f4').css('position', 'relative', 'z-index', '0');
    $('.f5').css('position', 'relative', 'z-index', '0');
    $('.f6').css('position', 'relative', 'z-index', '0');
    $('.f7').css('position', 'relative', 'z-index', '0');
    $('#a0').removeAttr('style');
    $('#a1').removeAttr('style');
    $('#a2').css('box-shadow', 'inset 0 100px 0 0 rgba(255, 255, 255, 1)');
    $('#a3').removeAttr('style');
    $('#a4').removeAttr('style');
    // $('#a5').removeAttr('style');
    // $('#a6').removeAttr('style');
    // $('#a7').removeAttr('style');
    // $('#a8').removeAttr('style');
    // $('#a9').removeAttr('style');
    // $('#a10').removeAttr('style');
    // $('#a11').removeAttr('style');
    $('label').removeClass('statinghovertab');
  }
  internallinkhide3() {
    $('.f0').css('position', 'relative', 'z-index', '0');
    $('.f1').css('position', 'relative', 'z-index', '0');
    $('.f2').css('position', 'relative', 'z-index', '0');
    $('.f3').css('position', 'relative', 'z-index', '999');
    $('.f4').css('position', 'relative', 'z-index', '0');
    $('.f5').css('position', 'relative', 'z-index', '0');
    $('.f6').css('position', 'relative', 'z-index', '0');
    $('.f7').css('position', 'relative', 'z-index', '0');
    $('#a0').removeAttr('style');
    $('#a1').removeAttr('style');
    $('#a2').removeAttr('style');
    $('#a3').css('box-shadow', 'inset 0 100px 0 0 rgba(255, 255, 255, 1)');
    $('#a4').removeAttr('style');
    // $('#a5').removeAttr('style');
    // $('#a6').removeAttr('style');
    // $('#a7').removeAttr('style');
    // $('#a8').removeAttr('style');
    // $('#a9').removeAttr('style');
    // $('#a10').removeAttr('style');
    // $('#a11').removeAttr('style');
    $('label').removeClass('statinghovertab');
  }
  internallinkhide4() {
    $('.f0').css('position', 'relative', 'z-index', '0');
    $('.f1').css('position', 'relative', 'z-index', '0');
    $('.f2').css('position', 'relative', 'z-index', '0');
    $('.f3').css('position', 'relative', 'z-index', '0');
    $('.f4').css('position', 'relative', 'z-index', '999');
    $('.f5').css('position', 'relative', 'z-index', '0');
    $('.f6').css('position', 'relative', 'z-index', '0');
    $('.f7').css('position', 'relative', 'z-index', '0');
    $('#a0').removeAttr('style');
    $('#a1').removeAttr('style');
    $('#a2').removeAttr('style');
    $('#a3').removeAttr('style');
    $('#a4').css('box-shadow', 'inset 0 100px 0 0 rgba(255, 255, 255, 1)');
    // $('#a5').removeAttr('style');
    // $('#a6').removeAttr('style');
    // $('#a7').removeAttr('style');
    // $('#a8').removeAttr('style');
    // $('#a9').removeAttr('style');
    // $('#a10').removeAttr('style');
    // $('#a11').removeAttr('style');
    $('label').removeClass('statinghovertab');
  }
  internallinkhide5() {
    $('.f0').css('position', 'relative', 'z-index', '0');
    $('.f1').css('position', 'relative', 'z-index', '0');
    $('.f2').css('position', 'relative', 'z-index', '0');
    $('.f3').css('position', 'relative', 'z-index', '0');
    $('.f4').css('position', 'relative', 'z-index', '0');
    $('.f5').css('position', 'relative', 'z-index', '999');
    $('.f6').css('position', 'relative', 'z-index', '0');
    $('.f7').css('position', 'relative', 'z-index', '0');
    $('#a0').removeAttr('style');
    $('#a1').removeAttr('style');
    $('#a2').removeAttr('style');
    $('#a3').removeAttr('style');
    $('#a4').removeAttr('style');
    $('#a5').css('box-shadow', 'inset 0 100px 0 0 rgba(255, 255, 255, 1)');
    // $('#a6').removeAttr('style');
    // $('#a7').removeAttr('style');
    // $('#a8').removeAttr('style');
    // $('#a9').removeAttr('style');
    // $('#a10').removeAttr('style');
    // $('#a11').removeAttr('style');
    $('label').removeClass('statinghovertabs');
  }
  internallinkhide6() {
    $('.f0').css('position', 'relative', 'z-index', '0');
    $('.f1').css('position', 'relative', 'z-index', '0');
    $('.f2').css('position', 'relative', 'z-index', '0');
    $('.f3').css('position', 'relative', 'z-index', '0');
    $('.f4').css('position', 'relative', 'z-index', '0');
    $('.f5').css('position', 'relative', 'z-index', '0');
    $('.f6').css('position', 'relative', 'z-index', '999');
    // $('.f7').css('position', 'relative', 'z-index', '0');

    // $('#a1').removeAttr('style');
    // $('#a2').removeAttr('style');
    // $('#a3').removeAttr('style');
    // $('#a4').removeAttr('style');
    $('#a5').removeAttr('style');
    $('#a6').css('box-shadow', 'inset 0 100px 0 0 rgba(255, 255, 255, 1)');
    // $('#a7').removeAttr('style');
    // $('#a8').removeAttr('style');
    // $('#a9').removeAttr('style');
    // $('#a10').removeAttr('style');
    // $('#a11').removeAttr('style');
    $('label').removeClass('statinghovertabs');
  }

  getlocality() {
    if (this.router.url.indexOf('bangalore') > -1) {
      this.cityId = '1';
    } else if (this.router.url.indexOf('hyderabad') > -1) {
      this.cityId = '2';
    } else if (this.router.url.indexOf('chennai') > -1) {
      this.cityId = '3';
    } else if (this.router.url.indexOf('kochi') > -1) {
      this.cityId = '4';
    } else if (this.router.url.indexOf('pune') > -1) {
      this.cityId = '5';
    } else if (this.router.url.indexOf('delhi') > -1) {
      this.cityId = '6';
    } else if (this.router.url.indexOf('kolkata') > -1) {
      this.cityId = '7';
    } else if (this.router.url.indexOf('mumbai') > -1) {
      this.cityId = '8';
    } else if (this.router.url.indexOf('amaravati') > -1) {
      this.cityId = '9';
    }
    var regionid = '';
    var paramss = {
      cityId : this.cityId,
      regionid : regionid
    };
    this.Service.getlocality(paramss).subscribe(localitys => {
      this.localitys = localitys['details'];
    });

  }

  scripts() {
    $(function() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      $('.ui.dropdown').dropdown();
      $('.ui.search.dropdown').dropdown({
        minCharacters: 3,
        useLabels: false
      });
      $('ui.price_filter.dropdown').dropdown({
        fullTextSearch: true
      });
      $('.ui.budget_minprice.search.dropdown').dropdown({
        // minCharacters : 1
        onChange: function() {
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
        onChange: function() {
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
      if (this.router.url.indexOf('hyderabad') > -1) {
        $('.about_us_banner label.nodescrip').css('top', '67%');
        $('.about_us_banner img').css('height', '140px');
        $('.breadcrumbs_city').css('top', '35%');
      } else if (this.router.url.indexOf('chennai') > -1) {
        $('.about_us_banner label.nodescrip').css('top', '67%');
        $('.about_us_banner img').css('height', '140px');
        $('.breadcrumbs_city').css('top', '35%');
      } else if (this.router.url.indexOf('kochi') > -1) {
        $('.about_us_banner label.nodescrip').css('top', '67%');
        $('.about_us_banner img').css('height', '140px');
        $('.breadcrumbs_city').css('top', '35%');
      } else if (this.router.url.indexOf('pune') > -1) {
        $('.about_us_banner label.nodescrip').css('top', '67%');
        $('.about_us_banner img').css('height', '140px');
        $('.breadcrumbs_city').css('top', '35%');
      }
    } else {

    }

    if ('userID' in this.Local_Storage) {
      this.localstorediv = false;
    } else {
      this.localstorediv = true;
    }
    if ('propertyID' in this.Local_Storage) {
      this.storagearr = JSON.parse(this.Local_Storage.getItem('propertyID'));
    } else {
      this.Local_Storage.setItem('propertyID', '[]');
      this.storagearr = JSON.parse(this.Local_Storage.getItem('propertyID'));
    }
    // seen projects
    if ('userID' in this.Local_Storage) {
      this.localstoredivSeenProjects = false;
    } else {
      this.localstoredivSeenProjects = true;
    }
    if ('SeenPropertyID' in this.Local_Storage) {
      this.seenProjectsStoragearr = JSON.parse(this.Local_Storage.getItem('SeenPropertyID'));
    } else {
      this.Local_Storage.setItem('SeenPropertyID', '[]');
      this.seenProjectsStoragearr = JSON.parse(this.Local_Storage.getItem('SeenPropertyID'));
    }
    // seen projects
  }

  semanticjquery() {
    $('.ui.dropdown').dropdown({});
  }

  onresize() {
    this.registerForm = this.fb.group({
      projectType: [''],
      minBudget: [''],
      maxBudget: [''],
      posessionWithin: [''],
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
  }


  onReset() {
    ProjectBhkListingComponent.citycount = 0;
    this.registerForm.reset({
      projectType: '',
      minBudget: '',
      maxBudget: '',
      posessionWithin: '',
      locality: '',
    });
    this.minbudget_IDPK = '';
    this.maxbudget_IDPK = '';
    this.oneBedroomSelect = false;
    this.twoBedroomSelect = false;
    this.threeBedroomSelect = false;
    this.fourBedroomSelect = false;
    this.fiveBedroomSelect = false;
    this.readyToMoveSelect = false;
    this.apartmentSelect = false;
    this.villaSelect = false;
    this.plotSelect = false;
    this.underConstructionSelect = false;
    this.newLaunchSelect = false;
    this.preLaunchSelect = false;
    var dropdown = $('.ui.dropdown.commonMobileDropdown');
    $(dropdown).dropdown('clear');
    $(dropdown).dropdown('destroy');
    $(dropdown).dropdown('restore defaults');
    this.noOfBedrooms = [];
    this.projectStatus = [];
    this.projecttype = [];
    this.possission = '';
    this.proptypeId = '';
    this.minBugPrice = '';
    this.maxBugPrice = '';
    this.tweentylaksSelect = false;
    this.tweentylaksTosixtylakhsSelect = false;
    this.sixtylakhsToEhightylakhsSelect = false;
    this.EhightylakhsTooneCrSelect = false;
    this.oneCrAboveCrSelect = false;
    this.ImmediateSelect = false;
    this.SixMonthsSelect = false;
    this.OneYearSelect = false;
    this.twoYearSelect = false;
    this.localityData = [];
    this.getCityMobileView();

  }

  onResetDesktopFilter() {
    this.minBugPrice = '';
    this.maxBugPrice = '';
    this.noOfBedrooms = [];
    this.possission = '';
    this.localId = '';
    this.proptypeId = '';
    this.projectStatus = [];
    this.projecttype = [];
    this.minbudget_IDPK = '';
    this.maxbudget_IDPK = '';
    var dropdown = $('.commonDesktopDropdown');
    $(dropdown).dropdown('clear');
    $(dropdown).dropdown('destroy');
    $(dropdown).dropdown('restore defaults');
    this.budget_show = true;
    this.bud_val_show = false;
    this.ngOnInit();
  }

  oneBedroom() {
    this.oneBedroomSelect = !this.oneBedroomSelect;
    if (this.oneBedroomSelect) {
      this.noOfBedrooms.push('1');
    } else if (this.oneBedroomSelect == false) {

      for (var i = 0; i < this.noOfBedrooms.length; i++) {
        if (this.noOfBedrooms[i] === '1') {
          this.noOfBedrooms.splice(i, 1);
        }
      }
    }
    this.filterSelectOne = false;

  }

  twoBedroom() {
    this.twoBedroomSelect = !this.twoBedroomSelect;
    if (this.twoBedroomSelect) {
      this.noOfBedrooms.push('2');
    } else if (this.twoBedroomSelect == false) {

      for (var i = 0; i < this.noOfBedrooms.length; i++) {
        if (this.noOfBedrooms[i] === '2') {
          this.noOfBedrooms.splice(i, 1);
        }
      }
    }
    this.filterSelectOne = false;

  }

  threeBedroom() {
    this.threeBedroomSelect = !this.threeBedroomSelect;
    if (this.threeBedroomSelect) {
      this.noOfBedrooms.push('3');
    } else if (this.threeBedroomSelect == false) {

      for (var i = 0; i < this.noOfBedrooms.length; i++) {
        if (this.noOfBedrooms[i] === '3') {
          this.noOfBedrooms.splice(i, 1);
        }
      }
    }
    this.filterSelectOne = false;

  }

  fourBedroom() {
    this.fourBedroomSelect = !this.fourBedroomSelect;
    if (this.fourBedroomSelect) {
      this.noOfBedrooms.push('4');
    } else if (this.fourBedroomSelect == false) {

      for (var i = 0; i < this.noOfBedrooms.length; i++) {
        if (this.noOfBedrooms[i] === '4') {
          this.noOfBedrooms.splice(i, 1);
        }
      }
    }
    this.filterSelectOne = false;

  }

  fiveBedroom() {
    this.fiveBedroomSelect = !this.fiveBedroomSelect;
    if (this.fiveBedroomSelect) {
      this.noOfBedrooms.push('5');
    } else if (this.fiveBedroomSelect == false) {

      for (var i = 0; i < this.noOfBedrooms.length; i++) {
        if (this.noOfBedrooms[i] === '5') {
          this.noOfBedrooms.splice(i, 1);
        }
      }
    }
    this.filterSelectOne = false;

  }

  apartmentclick() {
    this.apartmentSelect = !this.apartmentSelect;
    if (this.apartmentSelect) {
      this.projecttype.push('50401');
    } else if (this.apartmentSelect == false) {
      for (var i = 0; i < this.projecttype.length; i++) {
        if (this.projecttype[i] === '50401') {
          this.projecttype.splice(i, 1);
        }
      }
    }
    this.filterSelectOne = false;
  }

  villaclick() {
    this.villaSelect = !this.villaSelect;
    if (this.villaSelect) {
      this.projecttype.push('50402');
    } else if (this.villaSelect == false) {
      for (var i = 0; i < this.projecttype.length; i++) {
        if (this.projecttype[i] === '50402') {
          this.projecttype.splice(i, 1);
        }
      }
    }
    this.filterSelectOne = false;
  }

  plotclick() {
    this.plotSelect = !this.plotSelect;
    if (this.plotSelect) {
      this.projecttype.push('50403');
    } else if (this.plotSelect == false) {
      for (var i = 0; i < this.projecttype.length; i++) {
        if (this.projecttype[i] === '50403') {
          this.projecttype.splice(i, 1);
        }
      }
    }
    this.filterSelectOne = false;
  }

  readyToMove() {
    this.readyToMoveSelect = !this.readyToMoveSelect;
    if (this.readyToMoveSelect) {
      this.projectStatus.push('50307');
    } else if (this.readyToMoveSelect == false) {

      for (var i = 0; i < this.projectStatus.length; i++) {
        if (this.projectStatus[i] === '50307') {
          this.projectStatus.splice(i, 1);
        }
      }
    }
    this.filterSelectOne = false;
  }

  projectType(projectType) {
    this.proptypeId = projectType;
    this.filterSelectOne = false;
  }

  posessionWithin(posession) {
    this.possission = posession;
    this.filterSelectOne = false;

  }

  underConstruction() {
    this.underConstructionSelect = !this.underConstructionSelect;
    if (this.underConstructionSelect) {
      this.projectStatus.push('50309');
    } else if (this.underConstructionSelect == false) {
      for (var i = 0; i < this.projectStatus.length; i++) {
        if (this.projectStatus[i] === '50309') {
          this.projectStatus.splice(i, 1);
        }
      }
    }
    this.filterSelectOne = false;

  }

  newLaunch() {
    this.newLaunchSelect = !this.newLaunchSelect;
    if (this.newLaunchSelect) {
      this.projectStatus.push('50310');
    } else if (this.newLaunchSelect == false) {

      for (var i = 0; i < this.projectStatus.length; i++) {
        if (this.projectStatus[i] === '50310') {
          this.projectStatus.splice(i, 1);
        }
      }
    }
    this.filterSelectOne = false;

  }

  upcoming() {
    this.preLaunchSelect = !this.preLaunchSelect;
    if (this.preLaunchSelect) {
      this.projectStatus.push('50308');
    } else if (this.preLaunchSelect == false) {

      for (var i = 0; i < this.projectStatus.length; i++) {
        if (this.projectStatus[i] === '50308') {
          this.projectStatus.splice(i, 1);
        }
      }
    }
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

  minbugvalueDesktopView() {
// debugger
    this.budgetsLength = this.budgets.length;
    this.newBudget = this.budgets.slice(this.minbudget_IDPK, this.budgetsLength);
    this.minBugPrice = this.minbudget_IDPK;
    this.filterSelectOne = false;
    for (var i = 0; i < this.budgets.length; i++) {
      if (this.budgets[i].budget_IDPK == this.minbudget_IDPK) {
        this.minbudget_value = this.budgets[i].budget_value;
      }
    }
  }

  maxbugvalueDesktopView() {
// debugger
    this.maxBugPrice = this.maxbudget_IDPK;
    this.filterSelectOne = false;
    for (var i = 0; i < this.budgets.length; i++) {
      if (this.budgets[i].budget_IDPK == this.maxbudget_IDPK) {
        this.maxbudget_value = this.budgets[i].budget_value;
      }
    }
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

  toggleSearch() {
    $('#budgetmodal').toggleClass('expanded');
    $('#budgetmodal').toggleClass('collapsed');
  };

  clickedSomewherecity() {
    $('#budgetmodal').addClass('collapsed');
    $('#budgetmodal').removeClass('expanded');
  };

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
      this.maxbudget_IDPK = '4';
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
      this.maxbudget_IDPK = '8';
      this.minbudget_IDPK = '4';
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
      this.maxbudget_IDPK = '10';
      this.minbudget_IDPK = '8';
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
      this.maxbudget_IDPK = '12';
      this.minbudget_IDPK = '10';
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
      this.maxbudget_IDPK = '24';
      this.minbudget_IDPK = '12';
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
    // this.ImmediateSelect = !this.ImmediateSelect ;
    // if(this.ImmediateSelect === true){
    //     this.possission = '1';
    //    this.ImmediateSelect = true;
    // }else{
    //   if(this.ImmediateSelect === false)
    //   this.possission = '';
    //   this.ImmediateSelect = false;
    // }
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

  loadMore() {
    this.showLoader = true;
    this.routeSub = this.activeroute.params.subscribe(params => {
      var citiname = params['cityname'];
      var loopcount = 0;
      for (loopcount = 0; loopcount <= 10; loopcount++) {
        let totalcount = this.projectcount;
        const limit = ProjectBhkListingComponent.citycount += 1;
        let limitprprtyrows = 1;
        var rera = this.reraid;
        var bedroom = this.noOfBedrooms;
        var min = this.minbudget_IDPK;
        var max = this.maxbudget_IDPK;
        var pos = this.possission;
        var loc = this.locality;
        var projectStatus = this.projectStatus;
        var proptypeId = this.projecttype;
        this.UserId = this.Local_Storage.getItem("userID");
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
          proptypeid: proptypeId,
          userId: this.UserId,
        };
        let livecount = this.propertylists?.length || 0;
        if (livecount < totalcount) {
          if (this.minbudget_IDPK == undefined || this.minbudget_IDPK == '') {
            this.Service.getCity(citiname, param).subscribe(propertylists => {
              this.propertylists = this.propertylists.concat(propertylists['deatils']);
            });
          } else {
            this.Service.getbudgetfilterdata(param).subscribe(propertylists => {
              this.propertylists = this.propertylists.concat(propertylists['deatils']);
            });
          }

        } else {
          this.showLoader = false;
        }
      }

      const limit = ProjectBhkListingComponent.citycount += 1;
      let limitprprtyrows = 1;
      var rera = this.reraid;
      var bedroom = this.noOfBedrooms;
      var min = this.minbudget_IDPK;
      var max = this.maxbudget_IDPK;
      var pos = this.possission;
      var loc = this.locality;
      var projectStatus = this.projectStatus;
      var proptypeId = this.projecttype;
      this.UserId = this.Local_Storage.getItem("userID");
      let parama = {
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
        proptypeid: proptypeId,
        userId: this.UserId,
      };
      this.Service.getprojectscount(citiname, parama).subscribe(projectcounts => {
        let projectcount = projectcounts['Counts'];
        this.projectcount = projectcount[0].PropertyCounts;
      });
    });
  }


  // update by veera start
  getCityMobileView() {
    ProjectBhkListingComponent.citycount = 0;
    this.filterLoader = true;
    this.routeSub = this.activeroute.params.subscribe(params => {
      var citiname = params['cityname'];
      this.cityapi.limit = '0';
      this.cityapi.limitrows = '4';
      var limitparam = 0;
      var limitprprtyrows = 4;
      var rera = this.reraid;
      var bedroom = this.noOfBedrooms;
      var min = this.minbudget_IDPK;
      var max = this.maxbudget_IDPK;
      var pos = this.possission;
      var loc = this.localityData;
      var projectStatus = this.projectStatus;
      var proptypeId = this.projecttype;
      var param = {
        limit: limitparam,
        limitrows: limitprprtyrows,
        reraId: rera,
        bedroom: bedroom,
        minprice: min,
        maxprice: max,
        possission: pos,
        locality: loc,
        statusid: projectStatus,
        proptypeid: proptypeId,
      };
      this.Service.getprojectscount(citiname, param).subscribe(projectcounts => {
        let projectcount = projectcounts['Counts'];
        this.projectcount = projectcount[0].PropertyCounts;
        this.filterLoader = false;
      });
      this.Service.getCity(citiname, param).subscribe(lists => {
        let propertylists = lists['deatils'];
        this.propertylists = propertylists;
        this.filterLoader = false;
        var apicityname = this.propertylists[0].city_name;
      });
    });
    window.scroll(0, 0);
  }

  // getbudgetcity()
  // {
  //   CityComponent.citycount = 0;
  //   this.filterLoader = true;
  //   this.routeSub = this.activeroute.params.subscribe(params => {
  //     var citiname = params['cityname'];
  //     this.cityapi.limit = '0';
  //     this.cityapi.limitrows = '4';
  //     var limitparam = 0;
  //     var limitprprtyrows = 4;
  //     var rera = this.reraid;
  //     var bedroom = this.noOfBedrooms;
  //     var min = this.minbudget_IDPK;
  //     var max = this.maxbudget_IDPK;
  //     var pos = this.possission;
  //     var loc = this.localityData;
  //     var projectStatus = this.projectStatus;
  //     var proptypeId = this.projecttype;
  //     var param = {
  //       city: this.cityId,
  //       limit: limitparam,
  //       limitrows: limitprprtyrows,
  //       reraId: rera,
  //       bedroom: bedroom,
  //       minprice: min,
  //       maxprice: max,
  //       possission: pos,
  //       locality: loc,
  //       statusid: projectStatus,
  //       proptypeid: proptypeId,
  //     }
  //     this.Service.getprojectsbudgetcount(param).subscribe(projectcounts => {
  //       let projectcount = projectcounts['Counts'];
  //       this.projectcount = projectcount[0].PropertyCounts;
  //       this.filterLoader = false;
  //     })
  //     this.Service.getbudgetfilterdata(param).subscribe(lists => {
  //       let propertylists = lists['deatils'];
  //       this.propertylists = propertylists;
  //       this.filterLoader = false;
  //       var apicityname = this.propertylists[0].city_name;
  //     })
  //   });
  // }

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
    var scrollToTarget = function(target, containerEl) {
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

  property_id: any;
  propertyname: any;

  

  SelectedPropName: any;

  propertyNameClick(PropertyName,RegionID,localityid,PropertyID) {
    this.Filter.PropertyName = PropertyName;
    this.Filter.RegionID = RegionID;
    this.Filter.localityid = localityid;
    this.Filter.PropertyName = this.BuliderName;
    this.Filter.propid = PropertyID;
    $('#otpValidate').css('display','block');
  }

 

  onLocalitySelect(eve) {
    this.localityData.push(eve.locality_IDPK);
    this.getCityMobileView();
  }

  onLocalityDeSelect(event) {
    var index = this.locality.indexOf(event);
    this.localityData.splice(index, 1);
    this.getCityMobileView();
  }

  

  // new radha update
  sortfiltershowhide() {
    var prevScrollpos = window.pageYOffset;
    var isScrolling;
    // window.addEventListener('scroll', function(event) {
    //   var currentScrollPos = window.pageYOffset;
    //   if (prevScrollpos > currentScrollPos) {
    //     $('.compare_sort_filter_div').css('visibility', 'visible');
    //   } else {
    //     $('.compare_sort_filter_div').css('visibility', 'hidden');
    //     $('#fixed-accordion').css('visibility', 'hidden');
    //   }
    //   prevScrollpos = currentScrollPos;
    //   window.clearTimeout(isScrolling);
    //   isScrolling = setTimeout(function() {
    //     $('.compare_sort_filter_div').css('visibility', 'visible');
    //   }, 2000);
    //   if ($(window).scrollTop() + $(window).height() > $(document).height() - 200) {
    //     $('.compare_sort_filter_div').css('visibility', 'hidden');
    //     isScrolling = setTimeout(function() {
    //       $('.compare_sort_filter_div').css('visibility', 'hidden');
    //     }, 2000);
    //   }
    // }, false);
  }

  addwishlist(id) {
    this.propertyid = id;
    const userid = this.Local_Storage.getItem("userID");
    var param = {
      userid: userid,
      propid: this.propertyid
    };
    this.Service.addfavaourite(param).subscribe(response => {
      this.alertmesg = response['message'];
      if (response['status'] === 'True') {
        $('.toast').toast('show');
        // $('.toast').fadeOut(4000);
      }
    });
  }

  wishlistaddstorage(id) {
    if ('propertyID' in this.Local_Storage) {
    } else {
      this.Local_Storage.setItem('propertyID', '[]');
    }
    const proparray = this.Local_Storage.getItem('propertyID');
    const jsonpars = JSON.parse(proparray);
    const itemToRemoveIndex = jsonpars.indexOf(id);

    this.parsedarray = JSON.parse(proparray);
    if (itemToRemoveIndex == -1) {
      // 
      this.parsedarray.push(id);
      this.Local_Storage.setItem('propertyID', JSON.stringify(this.parsedarray));
    } else {
      // 
      this.parsedarray = this.parsedarray.filter(function(item) {
        return item !== id;
      });
      this.Local_Storage.setItem('propertyID', JSON.stringify(this.parsedarray));
    }
  }

  ShowHideSort(){
    this.sortShowHide = this.sortShowHide ? false : true;
  }

  // HideSort() {
  //   this.sortShowHide = false;
  // }

  Oncompareclick() {
    this.compareShowonimg = !this.compareShowonimg;
    this.compareproparray = JSON.parse(localStorage.getItem('ComparePropID'));
    if (this.compareproparray.length >= 1) {
      this.hideshowcompare = true;
      this.compareStorageArry = JSON.parse(localStorage.getItem('ComparePropID'));
      var compare1 = this.compareStorageArry[0];
      var compare2 = this.compareStorageArry[1];
      this.Service.getproperty(compare1).subscribe(prop => {
        let propDetails = prop['deatils'];
        this.propertiesDetails = propDetails;
        this.propimag1 = this.propertiesDetails[0].images[0].name;
        this.propertyname1 = this.propertiesDetails[0]['propertyName'];
        this.propid1 = this.propertiesDetails[0]['property_info_IDPK'];
        this.compareloader1 = false;
        this.compareprop1 = true;
      });
      this.Service.getproperty(compare2).subscribe(prop => {
        let propDetails = prop['deatils'];
        this.propertiesDetails = propDetails;
        this.propimag2 = this.propertiesDetails[0].images[0].name;
        this.propertyname2 = this.propertiesDetails[0]['propertyName'];
        this.propid2 = this.propertiesDetails[0]['property_info_IDPK'];
        this.compareloader2 = false;
        this.compareprop2 = true;
      });
    } else {
      this.hideshowcompare = false;
    }
  }

  oncompareshowimgclick(propid, proptype) {
    this.hideshowcompare = true;
    if ('ComparePropID' in this.Local_Storage) {
    } else {
      this.Local_Storage.setItem('ComparePropID', '[]');
    }
    this.comparePropType = this.Local_Storage.getItem('comparePropType1');
    const proparray = this.Local_Storage.getItem('ComparePropID');
    const jsonpars = JSON.parse(proparray);
    this.compareproparray = JSON.parse(localStorage.getItem('ComparePropID'));
    if (this.comparePropType == null) {
      const itemToRemoveIndex = jsonpars.indexOf(propid);
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
          this.Local_Storage.setItem('ComparePropID', JSON.stringify(this.parsedarray));
          this.compareproparray = JSON.parse(localStorage.getItem('ComparePropID'));
        }
      } else {
        this.parsedarray = this.parsedarray.filter(function(item) {
          return item !== propid;
        });
        this.compareloader1 = true;
        this.compareprop1 = false;
        this.compareloader2 = true;
        this.compareprop2 = false;
        if (this.compareproparray.length == 1) {
          this.hideshowcompare = false;
          this.Local_Storage.removeItem('comparePropType1');
        } else {
          this.hideshowcompare = true;
        }
        this.Local_Storage.setItem('ComparePropID', JSON.stringify(this.parsedarray));
        this.compareproparray = JSON.parse(localStorage.getItem('ComparePropID'));
      }
    } else if (this.comparePropType == proptype) {
      const proparray = this.Local_Storage.getItem('ComparePropID');
      const jsonpars = JSON.parse(proparray);
      const itemToRemoveIndex = jsonpars.indexOf(propid);
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
          this.Local_Storage.setItem('ComparePropID', JSON.stringify(this.parsedarray));
          this.compareproparray = JSON.parse(localStorage.getItem('ComparePropID'));
        }
      } else {
        this.parsedarray = this.parsedarray.filter(function(item) {
          return item !== propid;
        });
        this.compareloader1 = true;
        this.compareprop1 = false;
        this.compareloader2 = true;
        this.compareprop2 = false;
        if (this.compareproparray.length == 1) {
          this.hideshowcompare = false;
          this.Local_Storage.removeItem('comparePropType1');
        } else {
          this.hideshowcompare = true;
        }
        this.Local_Storage.setItem('ComparePropID', JSON.stringify(this.parsedarray));
        this.compareproparray = JSON.parse(localStorage.getItem('ComparePropID'));
      }
    } else {
      swal({
        text: 'Compare only with same Property Type',
        type: 'error',
        showConfirmButton: false,
        timer: 2000
      });
    }
    this.compareStorageArry = JSON.parse(localStorage.getItem('ComparePropID'));
    var compare1 = this.compareStorageArry[0];
    var compare2 = this.compareStorageArry[1];

    this.Service.getproperty(compare1).subscribe(prop => {
      let propDetails = prop['deatils'];
      this.propertiesDetails = propDetails;
      this.propimag1 = this.propertiesDetails[0].images[0].name;
      this.propertyname1 = this.propertiesDetails[0]['propertyName'];
      this.propid1 = this.propertiesDetails[0]['property_info_IDPK'];
      this.proptype1 = this.propertiesDetails[0]['propertyType'];
      this.cityname = this.propertiesDetails[0]['city_name'];
      this.Local_Storage.setItem('comparePropType1', this.proptype1);
      this.compareloader1 = false;
      this.compareprop1 = true;
    });
    this.Service.getproperty(compare2).subscribe(prop => {
      let propDetails = prop['deatils'];
      this.propertiesDetails = propDetails;
      this.propimag2 = this.propertiesDetails[0].images[0].name;
      this.propertyname2 = this.propertiesDetails[0]['propertyName'];
      this.propid2 = this.propertiesDetails[0]['property_info_IDPK'];
      this.proptype2 = this.propertiesDetails[0]['propertyType'];
      this.cityname = this.propertiesDetails[0]['city_name'];
      this.Local_Storage.setItem('comparePropType2', this.proptype2);
      this.compareloader2 = false;
      this.compareprop2 = true;
    });
  }

  closeprop1(propid1) {
    this.compareproparray = JSON.parse(localStorage.getItem('ComparePropID'));
    if (this.compareproparray.length == 1) {
      this.hideshowcompare = false;
      this.Local_Storage.removeItem('comparePropType1');
    } else {
      this.hideshowcompare = true;
    }
    if ('ComparePropID' in this.Local_Storage) {
    } else {
      this.Local_Storage.setItem('ComparePropID', '[]');
    }
    const proparray = this.Local_Storage.getItem('ComparePropID');
    const jsonpars = JSON.parse(proparray);
    const itemToRemoveIndex = jsonpars.indexOf(propid1);

    this.parsedarray = JSON.parse(proparray);
    {
      this.parsedarray = this.parsedarray.filter(function(item) {
        return item !== propid1;
      });
      this.compareloader1 = true;
      this.compareprop1 = false;
      this.Local_Storage.setItem('ComparePropID', JSON.stringify(this.parsedarray));
      this.compareproparray = JSON.parse(localStorage.getItem('ComparePropID'));
    }
  }

  closeprop2(propid2) {
    this.compareproparray = JSON.parse(localStorage.getItem('ComparePropID'));
    if (this.compareproparray.length == 1) {
      this.hideshowcompare = false;
      this.Local_Storage.removeItem('comparePropType1');
    } else {
      this.hideshowcompare = true;
    }
    if ('ComparePropID' in this.Local_Storage) {
    } else {
      this.Local_Storage.setItem('ComparePropID', '[]');
    }
    const proparray = this.Local_Storage.getItem('ComparePropID');
    const jsonpars = JSON.parse(proparray);
    const itemToRemoveIndex = jsonpars.indexOf(propid2);

    this.parsedarray = JSON.parse(proparray);
    {
      this.parsedarray = this.parsedarray.filter(function(item) {
        return item !== propid2;
      });
      this.compareloader2 = true;
      this.compareprop2 = false;
      this.Local_Storage.setItem('ComparePropID', JSON.stringify(this.parsedarray));
      this.compareproparray = JSON.parse(localStorage.getItem('ComparePropID'));
    }
  }

  CompareNow() {
    this.router.navigate(['/compare-properties']);
    this.Local_Storage.setItem('cityname', this.cityname);
  }

  // new radha update

  // start()
  // {
  //   this.countdown.begin();
  // }
  // reset()
  // {
  //   this.countdown.restart();
  // }

  // getintouch()
  // {
  //     if($('#name').val()=="")
  //      {
  //          $('#name').focus().css("border-color","red").attr('placeholder','Please Enter Name');
  //          return false;
  //      }
  //     else
  //     {
  //         var nameFilter=/^([a-zA-Z]+\s)*[a-zA-Z]+$/;
  //         if(nameFilter.test($('#name').val()))
  //            {
  //             $('#name').removeAttr("style");
  //            }
  //         else
  //         {
  //             $('#name').focus().css("border-color","red").attr('placeholder','Please enter valid name').val('');
  //             return false;
  //         }
  //     }
  //
  //     if($('#mobile').val()=="")
  //      {
  //          $('#mobile').focus().css("border-color","red").attr('placeholder','Please Enter Phone Number');
  //          return false;
  //      }
  //     else
  //     {
  //        var mobileno=/^[0-9]{10}$/;
  //          if(mobileno.test($('#mobile').val()))
  //          {
  //              $('#mobile').removeAttr("style");
  //          }
  //           else{
  //                $('#mobile').focus().css("border-color","red").attr('placeholder','Please enter valid contact number').val('');
  //                return false;
  //           }
  //       }
  //       swal({
  //         title: 'We Will Intimate you soon!',
  //         type: 'success',
  //         showConfirmButton: false,
  //         timer: 1500
  //         })
  //        var param = this.user;
  //        var pageorgin = "City Page";
  //
  //         this.Service.addAboutCall(param,pageorgin).subscribe((success) => {
  //               // this.user = success;
  //               // var status = success.status;
  //               this.user.name = '';
  //               this.user.number = '';
  //         }, (err) => {
  //           
  //         });
  //      }


// save(){
//   this.ngOnInit();
//   $('.modal').removeClass('in');
//
//   $('#myModal_city').hide();
//
//   $('.modal-backdrop').remove();
//   $('body').removeClass('modal-open');
//   $('body').css('padding-right',"");
//  }

}
