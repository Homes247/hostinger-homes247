import { Component, OnInit, HostListener, Inject, PLATFORM_ID, ElementRef, ViewChild } from '@angular/core';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';
import { WINDOW, LOCAL_STORAGE } from '@ng-toolkit/universal';
import { DataService } from '../data.service';
import { City, flitercity, minmax, enquiry, MainEnquiry } from '../city/city';
import { ActivatedRoute, Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { CountdownComponent, CountdownEvent } from 'ngx-countdown';
import { Enquiry } from '../home/home';
import { CityService } from '../city.service';
import { DataService2 } from '../data.service2';
import { FormBuilder, FormGroup } from '@angular/forms';

declare var $: any;
declare var swal: any;

@HostListener('scroll', ['$event.target'])

@Component({
  selector: 'app-property-type',
  templateUrl: './property-type.component.html',
  styleUrls: ['./property-type.component.css']
})

export class PropertyTypeComponent {
  @ViewChild('cd', { static: false }) private countdown3: CountdownComponent;
  @ViewChild('cd2', { static: false }) private countdown4: CountdownComponent;
  @ViewChild('scrollapiloader') scrollapiloader: ElementRef;
  @ViewChild('cancel') cancel: ElementRef;
  private routeSub: Subscription;
  property_type: any;
  status_name: any;
  Relevance: any;
  LowtoHigh: any;
  HightoLow: any;
  Recent: any;
  citybread: any;
  description: boolean;
  citybreadcrump: any;
  builder: any;
  localtyname: any;
  zones: any;
  filterShowHide: boolean;
  sortShowHide: boolean;
  IsVisibleFilter: boolean;
  localityHide: boolean = true;
  projectTypeHide: boolean = false;
  statusHide: boolean = true;
  registerForm: FormGroup;
  apartmentSelect: boolean = false;
  villaSelect: boolean = false;
  plotSelect: boolean = false;
  oneBedroomSelect: boolean = false;
  twoBedroomSelect: boolean = false;
  threeBedroomSelect: boolean = false;
  fourBedroomSelect: boolean = false;
  fiveBedroomSelect: boolean = false;
  readyToMoveSelect: boolean = false;
  underConstructionSelect: boolean = false;
  newLaunchSelect: boolean = false;
  preLaunchSelect: boolean = false;
  noOfBedrooms = [];
  projectStatus = [];
  projecttype = [];
  proptypeId: any;
  minBugPrice: any;
  maxBugPrice: any;
  filterLoader: boolean = false;
  reraid: any;
  localId: any;
  filterSelectOne: boolean = false;
  budgetsLength: any;
  newBudget = [];
  hideDesktopLocality = true;
  minbudget_value: any;
  maxbudget_IDPK: any;
  maxbudget_value: any;
  minbudget_IDPK: string;
  propidarray = [];
  parsedarray = [];
  jsonparse = [];
  storagearr: any;
  localstoredivSeenProjects: any;
  seenProjectsStoragearr: any;
  UserId: any;
  localstorediv: any;
  localitylist: any;
  builderlist: any;
  statuslist: any;
  proptypelist: any;
  regionslist: any;
  // update by veera end
  static typecount: number;
  zeroprojects = false;
  proptypeurlparam: any;
  localityData = [];
  dropdownSettingsMobile = {};
  proptypedescription: any;
  propertyid: any;

  cityname: any;
  cityId: any;
  proptypename: any;
  proptypeid: any;
  cityzonelinks: any;
  cityzonelinks_types: any;
  cityid: any;
  loaded = false;
  FooterComponent: any;

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

  newProperties = [];
  newlaunchesloader: boolean = true;
  topProperties = [];
  topprojectsloader: boolean = true;
  topnewapiload = true;
  topnewdivreached = false;
  innerheader:any;
  formatsDateTest: string[] = [
    'dd/MM/yyyy',
  ];
  dateNow: Date = new Date();
  dateNowISO = this.dateNow.toISOString();
  dateNowMilliseconds = this.dateNow.getTime();
  currenturl: any;


  @HostListener('window:scroll', ['$event'])
  @HostListener('touchstart', ['$event'])
  onTouchLoad() {
    this.Service.mouseenterservice3();
  $('.border_div').removeAttr('id');
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const elementPosition = this.scrollapiloader.nativeElement.offsetTop;
    const scrollPosition = window.pageYOffset;
    if (this.topnewdivreached = scrollPosition >= elementPosition) {
      if (this.topnewapiload == true) {
        this.topnewapiload = false;
        let id = '1';
        var paramss = {
          cityId : this.cityId,
        };
        // this.Service.getnewproperties(paramss).subscribe((newProperties: any[]) => {
        //   this.newProperties = newProperties['deatils'];
        //   if (newProperties['status'] === 'True') {
        //     this.newlaunchesloader = false;           
        //   } else {
        //     this.newlaunchesloader = true;
        //   }
        // });
        this.luxuryPropDetails();
        this.onReadyToMoveDetails();
        this.getTopProjects();
        this.getTopLocalities();
      }
      // import('../innerheader/innerheader.module').then(mod => mod.InnerHeaderModule).then(InnerHeaderModule => {
      //   this.innerheader = InnerHeaderModule.components['lazy'];
      //   this.loaded = true;
      // });
    }
    let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    let max = document.documentElement.scrollHeight;
    if (pos == max) {
    }
  
    if ($(window).scrollTop() >= 140) {
      $('#hidefilter').addClass('hidefilter');
    } else {
      $('#hidefilter').removeClass('hidefilter');
    }
    if ($(window).scrollTop() >= $('.footerDiv').offset().top) {
      $('.compare_sort_filter_div').css('visibility', 'hidden');
    } else {
      $('.compare_sort_filter_div').css('visibility', 'visible');
    }
  }
  FilterTransition(){
    var lastScrollTop = 0;
      $(window).scroll(function (event) {
        var st = $(this).scrollTop();
        if (st > lastScrollTop) {
          document.getElementById("move").style.transform = "translateX(0) rotate(0)";
          document.getElementById("move").style.transition = " all 0.5s";
          document.getElementById("floatinglink").style.transform = "translateX(0%)";
          document.getElementById("floatinglink").style.transition = " all 0.8s";
          $('.floating-link').css( 'width','');
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
    transitionEnd(event){
      var dv = document.getElementById("floatinglink");
      var dvStyle = dv.getAttribute('style');
      if(dvStyle.indexOf("translateX(-584%)") > -1){
        $('.floating-link').css('width', '216px');
        $('.border_div').css('opacity', '1');
        $('#floating_img').css('display', 'none');
        
      }
    }

  luxuryPropList = [];
  luxuryproploader: boolean = true;
  HideLuxuryProp = true;
  luxuryPropDetails() {
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
    this.Service.getCity(this.city, param).subscribe(response => {
      const propertylists = response['deatils'];
      this.luxuryPropList = propertylists;
      if (this.luxuryPropList.length >= 0) {
        this.luxuryproploader = false;
      } else {
        this.luxuryproploader = true;
      }
      if (this.luxuryPropList.length <= 0) {
        this.HideLuxuryProp = false;
      } else {
        this.HideLuxuryProp = true;
      }
    });
  }

  affordablePropList = [];
  affordableproploader: boolean = true;
  HideAffordableProp = true;
  affordablePropDetails() {
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
    this.Service.getCity(this.city, param).subscribe(response => {
      const propertylists = response['deatils'];
      this.affordablePropList = propertylists;
      if (this.affordablePropList.length >= 0) {
        this.affordableproploader = false;
      } else {
        this.affordableproploader = true;
      }
      if (this.affordablePropList.length <= 0) {
        this.HideAffordableProp = false;
      } else {
        this.HideAffordableProp = true;
      }
    });
  }

  readyToMovePropList = [];
  readyToMoveproploader: boolean = true;
  HideReadyToMoveProp = true;
  onReadyToMoveDetails() {
    const limite = 4;
    const limitrows = 6;
    const statusid = '50307';
    let param = {
      limit: limite,
      limitrows: limitrows,
      statusid: statusid
    };
    this.Service.getCity(this.city, param).subscribe(response => {
      const propertylists = response['deatils'];
      this.readyToMovePropList = propertylists;
      if (this.readyToMovePropList.length >= 0) {
        this.readyToMoveproploader = false;
      } else {
        this.readyToMoveproploader = true;
      }
      if (this.readyToMovePropList.length <= 0) {
        this.HideReadyToMoveProp = false;
      } else {
        this.HideReadyToMoveProp = true;
      }
    });
  }

  HideTopPropSection = true;
  getTopProjects(){
    this.Service.gettopproperties(this.cityId).subscribe((topProperty: any[]) => {
      this.topProperties = topProperty['deatils'];
      if (topProperty['status'] === 'True') {
        this.topprojectsloader = false;
        this.shuffletopprojects(this.topProperties);
      } else {
        this.topprojectsloader = true;
      }
      if(this.topProperties.length <= 0){
        this.HideTopPropSection = false;
      }else{
        this.HideTopPropSection = true;
      }
    });
  }

  shuffletopprojects(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
  
    this.topProperties = a;
  }

  topLocalitiesList = [];
  topLocalityloader = false;
  localityOneName;
  localityOneCount;
  localityTwoName;
  localityTwoCount;
  localityThreeName;
  localityThreeCount;
  localityFourName;
  localityFourCount;
  localityFiveName;
  localityFiveCount;
  localitySixName;
  localitySixCount;
  localityOneId;
  localityTwoId;
  localityThreeId;
  localityFourId;
  localityFiveId;
  localitySixId;

  hideTopLocality = true;
  getTopLocalities() {
    var paramss = {
      cityId : this.cityId,
    };
    this.Service.getTopLocalities(paramss).subscribe((responce: any[]) => {
      this.topLocalitiesList = responce['localitylimitlist'];
      if (this.topLocalitiesList.length <= 0) {
        this.hideTopLocality = false;
      } else {
        this.hideTopLocality = true;
      }
      this.localityOneName = this.topLocalitiesList[0]['localityname'];
      this.localityOneCount = this.topLocalitiesList[0]['locality'][0]['counts'];
      this.localityOneId = this.topLocalitiesList[0]['id'];

      this.localityTwoName = this.topLocalitiesList[1]['localityname'];
      this.localityTwoCount = this.topLocalitiesList[1]['locality'][0]['counts'];
      this.localityTwoId = this.topLocalitiesList[1]['id'];

      this.localityThreeName = this.topLocalitiesList[2]['localityname'];
      this.localityThreeCount = this.topLocalitiesList[2]['locality'][0]['counts'];
      this.localityThreeId = this.topLocalitiesList[2]['id'];

      this.localityFourName = this.topLocalitiesList[3]['localityname'];
      this.localityFourCount = this.topLocalitiesList[3]['locality'][0]['counts'];
      this.localityFourId = this.topLocalitiesList[3]['id'];

      this.localityFiveName = this.topLocalitiesList[4]['localityname'];
      this.localityFiveCount = this.topLocalitiesList[4]['locality'][0]['counts'];
      this.localityFiveId = this.topLocalitiesList[4]['id'];

      this.localitySixName = this.topLocalitiesList[5]['localityname'];
      this.localitySixCount = this.topLocalitiesList[5]['locality'][0]['counts'];
      this.localitySixId = this.topLocalitiesList[5]['id'];

      if (this.topLocalitiesList.length >= 0) {
        this.topLocalityloader = false;
      } else {
        this.topLocalityloader = true;
      }
     
    });
  }

  constructor(private titleService: Title, private meta: Meta,
    public Service: DataService, private router: Router,
    private fb: FormBuilder, private activeroute: ActivatedRoute,
    public cityservice: CityService,public Service2: DataService2,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(WINDOW) private window: Window,
    @Inject(LOCAL_STORAGE) private Local_Storage: any, @Inject(DOCUMENT) private doc) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.router.events.subscribe((evt) => {
      // trick the Router into believing it's last link wasn't previously loaded
      this.router.navigated = false;
      // if you need to scroll back to top, here is the right place
      this.window.scrollTo(0, 0);
    });
  }

  ngOnInit() {
    this.metaseo();
    this.getcity();
    this.semanticjquery();
    this.scripts();
    this.getlocality();
    this.onresize();
    this.currenturl = this.router.url;
  
    this.sortfiltershowhide();
    if (isPlatformBrowser(this.platformId)) {
      this.cityname = this.Local_Storage.getItem('CityName');
      this.proptypename = this.Local_Storage.getItem('PropType');
      this.proptypeid = this.Local_Storage.getItem('ProptypeId');
    }
    this.registerForm = this.fb.group({
      projectType: [''],
      minBudget: [''],
      maxBudget: [''],
      posessionWithin: [''],
      locality: [''],
    });
    PropertyTypeComponent.typecount = 28;
    this.cityzonelinks = false;
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
    this.FilterTransition();
  }

  metaseo() {
    if (this.router.url.indexOf('bangalore') > -1) {
      this.cityzonelinks_types = true;
      this.cityid = '1';
    } else {
      this.cityzonelinks_types = false;
    }
    var value = this.cityservice.cityfinder(this.router.url);
    this.cityname = value.cityname.replace('-',' ');
    this.cityid = value.cityid;

    
    this.routeSub = this.activeroute.params.subscribe(params => {
      var lasturl = params['proptypename-:proptypeid'];
      var typeid = lasturl.split('-').pop().match(/[0-9]+/);
      var cityid = this.cityid;
      this.Service.getproptypemeta(typeid, cityid).subscribe(metatag => {
        let metatags = metatag['Typeseo'];
        this.titleService.setTitle(metatags[0].page_title);
        this.meta.updateTag({ name: 'description', content: metatags[0].meta_description });
        this.meta.updateTag({ property: 'og:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_mobile/images/logo/Homes247_NewWhite_Logo.svg' });
        this.meta.updateTag({ property: 'og:title', content: metatags[0].page_title });
        this.meta.updateTag({ property: 'og:description', content: metatags[0].meta_description });
        this.proptypedescription = metatags[0].type_description;
        // this.Service.createLinkForCanonicalURL();
        if (this.proptypedescription == '') {
          this.description = false;
        } else {
          this.description = true;
        }

        let link: HTMLLinkElement = this.doc.createElement('link');
        link.setAttribute('rel', 'canonical');
        this.doc.head.appendChild(link);
        if (this.router.url.indexOf('apartments') > -1) {
          let url = 'https://www.homes247.in/apartments-for-sale-in-bangalore-50401';
          link.setAttribute('href', url);
        } else if (this.router.url.indexOf('villas') > -1) {
          let url = 'https://www.homes247.in/villas-for-sale-in-bangalore-50402';
          link.setAttribute('href', url);
        } else if (this.router.url.indexOf('plots') > -1) {
          let url = 'https://www.homes247.in/plots-for-sale-in-bangalore-50403';
          link.setAttribute('href', url);
        }
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
      });
    });
  }

  SelectedPropName: any;

  propertyNameClick(PropertyName,RegionID,localityid,PropertyID) {
    this.SelectedPropName = PropertyName;
    
  }

  propertylists1 = [];
  propertylists2 = [];
  propertylists3 = [];
  propertylists4 = [];
  propertylists5 = [];
  propertylists6 = [];
  sectionFirstResponce: boolean = false;
  getcity() {
    PropertyTypeComponent.typecount = 28;
    this.routeSub = this.activeroute.params.subscribe(params => {
      var cityname = params['cityname'];
      var url = params['proptypename-:proptypeid'];
      this.proptypeurlparam = url;
      var typeid = url.split('-').pop().match(/[0-9]+/);
      var urlidremoval = url.replace('-' + typeid, '');
      var urlhyphenremove = urlidremoval.replace(/-/g, ' ');
      String.prototype.toLocaleUpperCase = function () {
        return this.replace(/\w\S*/g, function (txt) {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
      };
      var capsname = cityname.toLocaleUpperCase().replace('-',' ');
      var propertytype = urlhyphenremove.toLocaleUpperCase();
      this.city = capsname;
      this.citybreadcrump = cityname;
      this.property_type = propertytype;
      this.cityapi.limit = '0';
      this.cityapi.limitrows = '4';
      var limitparam = 25;
      var limitprprtyrows = 4;
      var proptypeid = typeid;
      var bedroom = this.noOfBedrooms;
      var min = this.minbudget_IDPK;
      var max = this.maxbudget_IDPK;
      var pos = this.possission;
      var loc = this.locality;
      this.UserId = this.Local_Storage.getItem("userID");
      var param = {
        limit: limitparam,
        limitrows: limitprprtyrows,
        proptypeid: proptypeid,
        bedroom: bedroom,
        minprice: min,
        maxprice: max,
        possission: pos,
        locality: loc,
        userId: this.UserId,
      };

      this.Service.getprojectscount(this.city, param).subscribe(countprojects => {
        let projectcount = countprojects['Counts'];
        this.projectcount = projectcount[0].PropertyCounts;
        
      });

      this.Service.getCity(this.city, param).subscribe(lists => {
        let propertylists = lists['deatils'];
        this.propertylists = propertylists;
        var proptypename = this.propertylists[0].propertyType;
        var property_type = this.propertylists[0].propertyType;
        var lowerproptype = property_type.replace(/\s+/g, '-').toLowerCase();
        var apicityname = this.propertylists[0].city_name;
        var apinamecity = apicityname.toLowerCase().replace(' ','-');
        let urlrouter = this.router.url;
        let typejoiner = lowerproptype + '-' + typeid;
        if (cityname != apinamecity) {
          this.router.navigate([apinamecity + '/sale/' + lowerproptype + '-' + typeid]);
        } else if (url != typejoiner) {
          this.router.navigate([apinamecity + '/sale/' + lowerproptype + '-' + typeid]);
        } else {
        }
      });
      // section 1
      var param1 = {
        limit: 0,
        limitrows: 4,
        proptypeid: proptypeid,
        bedroom: bedroom,
        minprice: min,
        maxprice: max,
        possission: pos,
        locality: loc,
        userId: this.UserId,
      };
      this.Service.getCity(this.city, param1).subscribe(lists => {
        const propertylists = lists['deatils'];
        this.propertylists1 = propertylists;
        // this.showLoader = true;
        // this.localityName = this.propertylists1[0]['locality_name'];
        this.sectionFirstResponce = true;
      });
      // section 1
      // section 2
      var param2 = {
        limit: 5,
        limitrows: 4,
        proptypeid: proptypeid,
        bedroom: bedroom,
        minprice: min,
        maxprice: max,
        possission: pos,
        locality: loc,
        userId: this.UserId,
      };
      this.Service.getCity(this.city, param2).subscribe(lists => {
        const propertylists = lists['deatils'];
        this.propertylists2 = propertylists;
      });
      // section 2
      // section 3
      var param3 = {
        limit: 9,
        limitrows: 4,
        proptypeid: proptypeid,
        bedroom: bedroom,
        minprice: min,
        maxprice: max,
        possission: pos,
        locality: loc,
        userId: this.UserId,
      };
      this.Service.getCity(this.city, param3).subscribe(lists => {
        const propertylists = lists['deatils'];
        this.propertylists3 = propertylists;
      });
      // section 3
      // section 4
      var param4 = {
        limit: 13,
        limitrows: 4,
        proptypeid: proptypeid,
        bedroom: bedroom,
        minprice: min,
        maxprice: max,
        possission: pos,
        locality: loc,
        userId: this.UserId,
      };
      this.Service.getCity(this.city, param4).subscribe(lists => {
        const propertylists = lists['deatils'];
        this.propertylists4 = propertylists;
      });
      // section 4
      // section 5
      var param5 = {
        limit: 17,
        limitrows: 4,
        proptypeid: proptypeid,
        bedroom: bedroom,
        minprice: min,
        maxprice: max,
        possission: pos,
        locality: loc,
        userId: this.UserId,
      };
      this.Service.getCity(this.city, param5).subscribe(lists => {
        const propertylists = lists['deatils'];
        this.propertylists5 = propertylists;
      });
      // section 5
      // section 6
      var param6 = {
        limit: 21,
        limitrows: 4,
        proptypeid: proptypeid,
        bedroom: bedroom,
        minprice: min,
        maxprice: max,
        possission: pos,
        locality: loc,
        userId: this.UserId,
      };
      this.Service.getCity(this.city, param6).subscribe(lists => {
        const propertylists = lists['deatils'];
        this.propertylists6 = propertylists;
      });
      // section 6
      this.affordablePropDetails();
    });
  }
  loadMore() {
    this.showLoader = true;
    this.routeSub = this.activeroute.params.subscribe(params => {
      var url = params['proptypename-:proptypeid'];
      var urlsplit = url.split('-');
      var typeid = url.split('-').pop().match(/[0-9]+/);
      var loopcount = 0;
      for (loopcount = 0; loopcount <= 10; loopcount++) {
      let totalcount = this.projectcount;
      const limit = PropertyTypeComponent.typecount += 1;
      let limitprprtyrows = 1;
      var proptypeid = typeid;
      var bedroom = this.noOfBedrooms;
      var min = this.minbudget_IDPK;
      var max = this.maxbudget_IDPK;
      var pos = this.possission;
      var loc = this.locality;
      this.UserId = this.Local_Storage.getItem("userID");
      let param = {
        city: this.cityId,
        limit: limit,
        limitrows: limitprprtyrows,
        proptypeid: proptypeid,
        bedroom: bedroom,
        minprice: min,
        maxprice: max,
        possission: pos,
        locality: loc,
        userId: this.UserId,
      };
      let livecount = this.propertylists?.length || 0;
      if (livecount < totalcount) {
           this.Service.getCity(this.cityname, param).subscribe(lists => {
            let propertylists = lists['deatils'];
            this.propertylists = this.propertylists.concat(propertylists);
          });
      } else {
        this.showLoader = false;
      }
    }
    });
  }
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

  ShowHideSort(){
    this.sortShowHide = this.sortShowHide ? false : true;
  }

  // HideSort() {
  //   this.sortShowHide = false;
  // }

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

 

  scripts() {
    $(function () {
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
    });
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
    var width = this.window.innerWidth;
    if (width < 1080) {
      this.filterShowHide = true;
    } else {
      this.filterShowHide = false;
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

  onReset() {
    PropertyTypeComponent.typecount = 28;
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
    this.apartmentSelect = false;
    this.villaSelect = false;
    this.plotSelect = false;
    this.readyToMoveSelect = false;
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
    this.getcity();

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
      this.projectStatus.push('50310');
    } else if (this.preLaunchSelect == false) {

      for (var i = 0; i < this.projectStatus.length; i++) {
        if (this.projectStatus[i] === '50310') {
          this.projectStatus.splice(i, 1);
        }
      }
    }
    this.filterSelectOne = false;
  }


  Date = new Date();
  user = new Enquiry();
  propertylists: any;
  projectcount: any;
  localitys: any;
  cityapi = new City();
  propertyimage = this.Service.imagesURL + 'uploadPropertyImgs/';


  minprice = new minmax();
  maxprice = new minmax();
  city: any;

  showLoader = true;
  fliterbedroom: string;
  possission = '';
  locality = [];
  bedroom = new flitercity();


  getlocality() {
    var value = this.cityservice.cityfinder(this.router.url);
    this.cityname = value.cityname.replace('-',' ');
    this.cityId = value.cityid;
    var regionid = '';
    var paramss = {
      cityId : this.cityId,
      regionid : regionid
    };
    this.Service.getlocality(paramss).subscribe(localitys => {
      this.localitys = localitys['details'];
    });
  }


  property_id: any;
  propertyname: any;
  enquiry = new Enquiry();

  getenquiry(id, name) {
    this.property_id = id;
    this.propertyname = name;

  }

  IsVisible = false;

  ShowHide() {
    this.IsVisible = this.IsVisible ? false : true;
  }

  readmore() {
    $('.banner_description').css('height', '330px');
    $('.about_us_banner label').css('top', '20%');
    $('p.banner_description').css('overflow-y', 'scroll');
    $('.down_arrow').css('display', 'none');
    $('.up_arrow').css('display', 'block');
  }

  propertyId: any;
  alertmesg: any;

  addwishlist(id) {
    this.propertyId = id;
    const userid = this.Local_Storage.getItem("userID");
    var param = {
      userid: userid,
      propid: this.propertyId
    };
    this.Service.addfavaourite(param).subscribe(response => {
      this.alertmesg = response['message'];
      if (response['status'] === 'True') {
        $('.toast').toast('show');
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
      this.parsedarray.push(id);
      this.Local_Storage.setItem('propertyID', JSON.stringify(this.parsedarray));
    } else {
      this.parsedarray = this.parsedarray.filter(function (item) {
        return item !== id;
      });
      this.Local_Storage.setItem('propertyID', JSON.stringify(this.parsedarray));
    }
  }

  readless() {
    var scrollToTarget = function (target, containerEl) {
      // Moved up here for readability:
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

  addenquiry() {
    if ($('#ename').val() == '') {
      $('#ename').focus().css('border-color', 'red').attr('placeholder', 'Please Enter Name');
      return false;
    } else {
      var enameFilter = /^([a-zA-Z]+\s)*[a-zA-Z]+$/;
      if (enameFilter.test($('#ename').val())) {
        $('#ename').removeAttr('style');
      } else {
        $('#ename').focus().css('border-color', 'red').attr('placeholder', 'Please enter valid name').val('');
        return false;
      }
    }
    if ($('#emobile').val() == '') {
      $('#mobile').focus().css('border-color', 'red').attr('placeholder', 'Please Enter Phone Number');
      return false;
    } else {
      var emobileno = /^[0-9]{10}$/;
      if (emobileno.test($('#emobile').val())) {
        $('#emobile').removeAttr('style');
      } else {
        $('#emobile').focus().css('border-color', 'red').attr('placeholder', 'Please enter valid contact number').val('');
        return false;
      }
    }

    swal({
      title: 'We Will Intimate you soon!',
      type: 'success',
      showConfirmButton: false,
      timer: 1500
    });
    this.cancel.nativeElement.click();
    var param = this.enquiry;
    this.Service.addPropertyCall(param).subscribe(enquiry => {
      this.enquiry.ename = '';
      this.enquiry.emobile = '';
      this.enquiry.propertyname = '';
    });
    this.IsVisible = false;
  }

  onLocalitySelect(eve) {
    this.localityData.push(eve.locality_IDPK);
    this.getcity();
  }

  onLocalityDeSelect(event) {
    var index = this.locality.indexOf(event);
    this.localityData.splice(index, 1);
    this.getcity();
  }
  // onLocalityOneClick(name, id) {
  //   const propertytype = name;
  //   const proptype = propertytype.replace(/\s+/g, '-').toLowerCase();
  //   const proptypeid = id;
  //   const cityName = this.cityname.toLowerCase();
  //   window.open(cityName + '/' + 'property-sale-in-' + proptype + '-' + proptypeid,'_blank');
  // }

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
    leftTime: 30,
    demand: true
  };
  otpexpired = false;

  handleEvent(e: CountdownEvent) {
    if (e.action === 'done') {
      this.otpexpired = true;
    }
  }

  onOtpChange(otp) {
    var param = this.user;
    param.otp = otp;
  }

  otploader = false;

  goback() {
    $('#modal-container2').addClass('out');
    $('body').removeClass('modal-active');
  }

  otpsend() {
    if ($('#name1').val() == '') {
      $('#name1').focus().css('border-color', 'red').attr('placeholder', 'Please Enter Name');
      return false;
    } else {
      var nameFilter = /^([a-zA-Z]+\s)*[a-zA-Z]+$/;
      if (nameFilter.test($('#name1').val())) {
        $('#name1').removeAttr('style');
      } else {
        $('#name1').focus().css('border-color', 'red').attr('placeholder', 'Please enter valid name').val('');
        return false;
      }
    }
    if ($('#mobile1').val() == '') {
      $('#mobile1').focus().css('border-color', 'red').attr('placeholder', 'Please Enter Phone Number');
      return false;
    } else {
      var mobileno = /^[0-9]{10}$/;
      if (mobileno.test($('#mobile1').val())) {
        $('#mobile1').removeAttr('style');
      } else {
        $('#mobile1').focus().css('border-color', 'red').attr('placeholder', 'Please enter valid contact number').val('');
        return false;
      }
    }
    this.otploader = true;
    $('body').addClass('bodyoverlay');
    var param = this.user;
    this.Service.otpsend(param).subscribe((success) => {
    var prestatus = success['messages'][0].status;
      // var status = prestatus[0].MessageErrorDescription;
      if (prestatus == 'ENQUEUED') {
        this.countdown3.begin();
        var buttonId = $('#one').attr('id');
        $('#modal-container').removeAttr('class').addClass(buttonId);
        $('body').addClass('modal-active');
        this.otploader = false;
        $('body').removeClass('bodyoverlay');
      } else {
        swal({
          title: 'Oops Something Error!',
          type: 'error',
          showConfirmButton: false,
          timer: 1500
        });
      }
    }, (err) => {
      
    });
  }

  otpvalidate() {
    var otplength = 4;
    if ($('#otp').val() == '') {
      swal({
        title: 'Please enter the OTP!',
        type: 'error',
        showConfirmButton: false,
        timer: 1000
      });
      return false;
    } else {
      var liveotpcount = $('#otp').val().length;
      if (liveotpcount < otplength) {
        swal({
          title: 'Please enter the valid OTP!',
          type: 'warning',
          showConfirmButton: false,
          timer: 1500
        });
        return false;
      } else {
      }
    }
    var param = this.user;
    this.otploader = true;
    $('body').addClass('bodyoverlay');
    this.Service.otpvalidcheck(param).subscribe((success) => {
      var status = success['status'];
      if (status == 'True') {
        this.callback();
        this.countdown3.restart();
      } else {
        this.otploader = false;
        $('body').removeClass('bodyoverlay');
        swal({
          title: 'Oops Something Error!',
          text: 'Its Not a valid OTP / OTP Expired!',
          type: 'error',
          showConfirmButton: false,
          timer: 1500
        });
      }
    }, (err) => {
      
    });
  }

  callback() {
    var param = this.user;
    var pageorgin = 'Property Type Page';

    this.Service.addAboutCall(param, pageorgin, this.cityid).subscribe((success) => {
      var status = success['status'];
      if (status == 'True') {
        this.otploader = false;
        $('body').removeClass('bodyoverlay');
        swal({
          title: 'OTP Verified',
          text: 'We Will Intimate you soon!',
          type: 'success',
          showConfirmButton: false,
          timer: 2500
        });
        this.ShowHide();
        $('#modal-container').addClass('out');
        $('body').removeClass('modal-active');
      } else {
        swal({
          title: 'Ooops!!',
          text: 'OTP Verified But Some Error Occured Please try again!',
          type: 'error',
          showConfirmButton: false,
          timer: 1500
        });
      }
    }, (err) => {
      
    });
    this.user.name = '';
    this.user.number = '';
    this.user.otp = '';
    $('#btn_reset').click();
  }

  onOtpChange2(otp) {
    var param = this.enquiry;
    param.otp = otp;
  }

  otpsend2() {
    if ($('#name').val() === '') {
      $('#name').focus().css('border-color', 'red').attr('placeholder', 'Please Enter Name');
      return false;
    } else {
      var enameFilter = /^([a-zA-Z]+\s)*[a-zA-Z]+$/;
      if (enameFilter.test($('#name').val())) {
        $('#name').removeAttr('style');
      } else {
        $('#name').focus().css('border-color', 'red').attr('placeholder', 'Please enter valid name').val('');
        return false;
      }
    }

    if ($('#mobile').val() === '') {
      $('#mobile').focus().css('border-color', 'red').attr('placeholder', 'Please Enter Phone Number');
      return false;
    } else {
      var emobileno = /^[0-9]{10}$/;
      if (emobileno.test($('#mobile').val())) {
        $('#mobile').removeAttr('style');
      } else {
        $('#mobile').focus().css('border-color', 'red').attr('placeholder', 'Please enter valid contact number').val('');
        return false;
      }
    }
    if ($('#email').val() === '') {
      $('#email').focus().css('border-color', 'red').attr('placeholder', 'Please Enter Email-id');
      return false;
    } else {
      var emai = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
      if (emai.test($('#email').val())) {
        $('#email').removeAttr('style');
      } else {
        $('#email').focus().css('border-color', 'red').attr('placeholder', 'Please enter valid email-id').val('');
        return false;
      }
    }
    this.otploader = true;
    this.getintouch();
    // $('body').addClass('bodyoverlay');
    // var param = this.enquiry;
    // this.Service.otpsend(param).subscribe((success) => {
    //   var prestatus = success['Data'];
    //   var status = prestatus[0].MessageErrorDescription;
    //   if (status == 'Success') {
    //     this.getintouch();
    //     this.countdown4.begin();
    //     var buttonId = $('#one').attr('id');
    //     $('#modal-container2').removeAttr('class').addClass(buttonId);
    //     $('body').addClass('modal-active');
    //     this.otploader = false;
    //     $('body').removeClass('bodyoverlay');
    //   } else {
    //     swal({
    //       title: 'Oops Something Error!',
    //       type: 'error',
    //       showConfirmButton: false,
    //       timer: 1500
    //     });
    //     this.otploader = false;
    //     $('body').removeClass('bodyoverlay');
    //   }
    // }, (err) => {
    //   
    // });
  }


  getintouch() {
    var param = this.enquiry;
    var pageorgin = this.property_type + '-' + this.cityname;
    this.Service.addAboutCall(param, pageorgin, this.cityid).subscribe((success) => {
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
        this.enquiry.name = '';
        this.enquiry.number = '';
        this.enquiry.otp = '';
        this.enquiry.email = '';
        $('#btn_reset').click();
      } else {
        swal({
          title: 'Something went wrong!',
          type: 'error',
          showConfirmButton: false,
          timer: 1500
        });
      }
    }, (err) => {
      
    });
  }

  save() {
    this.ngOnInit();
    $('.modal').removeClass('in');

    $('#myModal_city').hide();

    $('.modal-backdrop').remove();
    $('body').removeClass('modal-open');
    $('body').css('padding-right', '');
  }

  sortfiltershowhide() {
    var prevScrollpos = window.pageYOffset;
    var isScrolling;
    window.addEventListener('scroll', function (event) {
      var currentScrollPos = window.pageYOffset;
      if (prevScrollpos > currentScrollPos) {
        $('.sortfilter_div').css('display', 'block');
      } else {
        $('.sortfilter_div').css('display', 'none');
        $('#fixed-accordion').css('visibility', 'hidden');
      }
      prevScrollpos = currentScrollPos;
      window.clearTimeout(isScrolling);
      isScrolling = setTimeout(function () {
        $('.sortfilter_div').css('display', 'block');
      }, 2000);
      if ($(window).scrollTop() + $(window).height() > $(document).height() - 200) {
        $('.sortfilter_div').css('display', 'none');
        isScrolling = setTimeout(function () {
          $('.sortfilter_div').css('display', 'none');
        }, 2000);
      }
    }, false);
  }

  // compare properties
  Oncompareclick() {
    this.Service.mouseenterservice2();
    this.compareShowonimg = !this.compareShowonimg;
    this.compareproparray = JSON.parse(localStorage.getItem('ComparePropID'));
    if (this.compareproparray.length >= 1) {
      this.hideshowcompare = true;
      this.compareStorageArry = JSON.parse(localStorage.getItem('ComparePropID'));
      var compare1 = this.compareStorageArry[0];
      var compare2 = this.compareStorageArry[1];
      if (compare1 != undefined) {
      this.Service2.getpropertynew(compare1).subscribe(prop => {
        let propDetails = prop['details'];
        this.propertiesDetails = propDetails;
        this.propimag1 = this.propertiesDetails[0].images[0].name;
        this.propertyname1 = this.propertiesDetails[0]['propertyName'];
        this.propid1 = this.propertiesDetails[0]['property_info_IDPK'];
        this.compareloader1 = false;
        this.compareprop1 = true;
      });
    }
    if (compare2 != undefined) {
      this.Service2.getpropertynew(compare2).subscribe(prop => {
        let propDetails = prop['details'];
        this.propertiesDetails = propDetails;
        this.propimag2 = this.propertiesDetails[0].images[0].name;
        this.propertyname2 = this.propertiesDetails[0]['propertyName'];
        this.propid2 = this.propertiesDetails[0]['property_info_IDPK'];
        this.compareloader2 = false;
        this.compareprop2 = true;
      });
    }
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
        this.parsedarray = this.parsedarray.filter(function (item) {
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
        this.parsedarray = this.parsedarray.filter(function (item) {
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
    if (compare1 != undefined) {
    this.Service2.getpropertynew(compare1).subscribe(prop => {
      let propDetails = prop['details'];
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
  }
  if (compare2 != undefined) {
    this.Service2.getpropertynew(compare2).subscribe(prop => {
      let propDetails = prop['details'];
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
      this.parsedarray = this.parsedarray.filter(function (item) {
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
      this.parsedarray = this.parsedarray.filter(function (item) {
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
}
