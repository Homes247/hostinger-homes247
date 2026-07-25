import {Component, OnInit, HostListener, Inject, PLATFORM_ID, ElementRef, ViewChild} from '@angular/core';
import {isPlatformBrowser, DOCUMENT} from '@angular/common';
import {WINDOW} from '@ng-toolkit/universal';
import {DataService} from '../data.service';
import {City, flitercity, minmax, enquiry, MainEnquiry} from './filter';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {Meta, Title} from '@angular/platform-browser';
import {Subscription} from 'rxjs';
import {FormControl, FormGroup, FormBuilder} from '@angular/forms';
import {count} from 'rxjs/operators';
import {CountdownComponent, CountdownEvent} from "ngx-countdown";
import {Enquiry} from "../home/home";

declare var $: any;
declare var swal: any;

@HostListener('scroll', ['$event.target'])
declare var $: any;
@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})

export class FilterComponent implements OnInit {
  myControl = new FormControl();
  @ViewChild('cd', {static: false}) private countdown: CountdownComponent;
  @ViewChild('cd2', {static: false}) private countdown2: CountdownComponent;
  @ViewChild('cancel') cancel: ElementRef;
  public n: number = 1;

  // update by veera start
  
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
  proptypeId = [];
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
  zeroprojects = false;
  citybreadcrump: any;
  localityName;
  dropdownSettingsMobile = {};
  localityData = [];
  citiess: any;
  locationSelectedId: string;
  selected: any;
  urlpropertyid;
  urlbedroom;
  urlmin;
  urlmax;
  urlpos;
  urlloc;
  urlstatusid;
  urlcityname = 'Bangalore';
  //city_name:any;
   city_name = 'Bangalore';
  constructor(private titleService: Title, private meta: Meta,
              public Service: DataService,
              private router: Router,
              private activeroute: ActivatedRoute,
              @Inject(PLATFORM_ID) private platformId: Object, @Inject(WINDOW) private window: Window,
              private fb: FormBuilder
  ) {
    //  this.projecttype = [];
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }
    this.router.events.subscribe((evt) => {
      this.router.navigated = false;
      this.window.scrollTo(0, 0);
    });
    setTimeout(() => {
      this.n = this.n += 4;
    }, 1000);
  }

  sortedCollection: any[];
  private routeSub: Subscription;
  cityname: any;

  cityId: any;
  reraid = [];
  cityhead: any;
  cityidseo: any;
  cityzonelinks: any;
  cityzonelinks_types: any;

  ngOnInit() {
      this.geturlparams();
    this.getcity();
    this.getlocality();
    this.semanticjquery();
    this.scripts();
    this.getlocationlist()
    this.getbedrooms();
    this.getpossissions();
    this.getbudgets();
    this.onresize();
    FilterComponent.citycount = 0;
  }

  geturlparams() {
    this.routeSub = this.activeroute.params.subscribe(params => {
      this.cityname = params['cityname'];
      String.prototype.toLocaleUpperCase = function () {
        return this.replace(/\w\S*/g, function (txt) {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
      };
      var capsname = this.cityname.toLocaleUpperCase();
      this.city = capsname;
      this.citybread = capsname;
      this.cityhead = capsname;
      if (this.router.url.indexOf("bangalore") > -1) {
        this.cityzonelinks = true;
        this.cityidseo = '1';
        this.meta.updateTag({property: 'og:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp'});
      } else if (this.router.url.indexOf("hyderabad") > -1) {
        this.cityzonelinks = false;
        this.cityidseo = '2';
        this.meta.updateTag({property: 'og:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_mobile/images/og/hyderabad.png'});

      } else if (this.router.url.indexOf("chennai") > -1) {
        this.cityzonelinks = false;
        this.cityidseo = '3';
        this.meta.updateTag({property: 'og:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_mobile/images/og/chennai.png'});

      } else if (this.router.url.indexOf("kochi") > -1) {
        this.cityzonelinks = false;
        this.cityidseo = '4';
        this.meta.updateTag({property: 'og:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_mobile/images/og/kochi.png'});

      } else if (this.router.url.indexOf("pune") > -1) {
        this.cityzonelinks = false;
        this.cityidseo = '5';
        this.meta.updateTag({property: 'og:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_mobile/images/og/pune.png'});
        $(".about_us_banner label.nodescrip").css('top', "67%");
        $(".about_us_banner img").css('height', "140px");
        $(".breadcrumbs_city").css('top', "35%");
      }else if (this.router.url.indexOf("mumbai") > -1){
        this.cityzonelinks = false;
        this.cityidseo = '6';
        this.meta.updateTag({ property: 'og:image', 
        content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_mobile/images/city-banners/mumbai.jpg' });
      }
      else if(this.router.url.indexOf("delhi") > -1){
        this.cityzonelinks = false;
        this.cityidseo = '7';
        this.meta.updateTag({ property: 'og:image', 
        content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_mobile/images/city-banners/delhi.jpg' });
      }
      else if(this.router.url.indexOf("kolkata") > -1){
        this.cityzonelinks = false;
        this.cityidseo = '8';
        this.meta.updateTag({ property: 'og:image', 
        content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_mobile/images/city-banners/kolkata.jpg' });
      }
      else if(this.router.url.indexOf("amaravati") > -1){
        this.cityzonelinks = false;
        this.cityidseo = '9';
        this.meta.updateTag({ property: 'og:image', 
        content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_mobile/images/city-banners/amaravathi.jpg' });
      }
      var idcity = this.cityidseo;
      this.Service.getseocitylistmeta(idcity).subscribe(metatag => {
        let metatags = metatag['Cityseo'];
        this.titleService.setTitle(metatags[0].page_title);
        this.meta.updateTag({name: 'description', content: metatags[0].meta_description});
        this.meta.updateTag({name: 'keywords', content: metatags[0].meta_keywords});
        this.meta.updateTag({property: 'og:title', content: metatags[0].page_title});
        this.meta.updateTag({property: 'og:description', content: metatags[0].meta_description});
        this.Service.createLinkForCanonicalURL();
      })
    });
  }

  loaded = false;
  FooterComponent: any;

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    let max = document.documentElement.scrollHeight;
    if (pos == max) {
      import('../footer/footer.module').then(mod => mod.FooterModule).then(FooterModule => {
        this.FooterComponent = FooterModule.components['lazy'];
        this.loaded = true;
      });
    }
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
      })
      $('.ui.budget_minprice.search.dropdown').dropdown({
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
          if (this.router.url.indexOf("hyderabad") > -1) {
            $(".about_us_banner label.nodescrip").css('top', "67%");
            $(".about_us_banner img").css('height', "140px");
            $(".breadcrumbs_city").css('top', "35%");
          } else if (this.router.url.indexOf("chennai") > -1) {
            $(".about_us_banner label.nodescrip").css('top', "67%");
            $(".about_us_banner img").css('height', "140px");
            $(".breadcrumbs_city").css('top', "35%");
          } else if (this.router.url.indexOf("kochi") > -1) {
            $(".about_us_banner label.nodescrip").css('top', "67%");
            $(".about_us_banner img").css('height', "140px");
            $(".breadcrumbs_city").css('top', "35%");
          } else if (this.router.url.indexOf("pune") > -1) {
            $(".about_us_banner label.nodescrip").css('top', "67%");
            $(".about_us_banner img").css('height', "140px");
            $(".breadcrumbs_city").css('top', "35%");
          }
        } else {

        }
  }

  semanticjquery() {
    $('.ui.dropdown').dropdown({});
  }

  onReset() {
    FilterComponent.citycount = 0;
    this.registerForm.reset({
      projectType: '',
      minBudget: '',
      maxBudget: '',
      posessionWithin: '',
      locality: '',
    })
    this.minbudget_IDPK = "";
    this.maxbudget_IDPK = "";
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
    this.proptypeId = [];
    this.minBugPrice = "";
    this.maxBugPrice = "";
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
    // this.router.navigate([],
    //   {
    //     queryParams: {cityId:'',proptypeid:'',bedroom:'',minprice:'', maxprice:'',possission:'',locality:'',location:'',statusid:''}
    //   });
  }

  oneBedroom() {
    this.oneBedroomSelect = !this.oneBedroomSelect;
    if (this.oneBedroomSelect) {
      this.noOfBedrooms.push("1");
    } else if (this.oneBedroomSelect == false) {

      for (var i = 0; i < this.noOfBedrooms.length; i++) {
        if (this.noOfBedrooms[i] === "1") {
          this.noOfBedrooms.splice(i, 1);
        }
      }
    }
    this.filterSelectOne = false;

  }

  twoBedroom() {
    this.twoBedroomSelect = !this.twoBedroomSelect;
    if (this.twoBedroomSelect) {
      this.noOfBedrooms.push("2");
    } else if (this.twoBedroomSelect == false) {

      for (var i = 0; i < this.noOfBedrooms.length; i++) {
        if (this.noOfBedrooms[i] === "2") {
          this.noOfBedrooms.splice(i, 1);
        }
      }
    }
    this.filterSelectOne = false;

  }

  threeBedroom() {
    this.threeBedroomSelect = !this.threeBedroomSelect;
    if (this.threeBedroomSelect) {
      this.noOfBedrooms.push("3");
    } else if (this.threeBedroomSelect == false) {

      for (var i = 0; i < this.noOfBedrooms.length; i++) {
        if (this.noOfBedrooms[i] === "3") {
          this.noOfBedrooms.splice(i, 1);
        }
      }
    }
    this.filterSelectOne = false;

  }

  fourBedroom() {
    this.fourBedroomSelect = !this.fourBedroomSelect;
    if (this.fourBedroomSelect) {
      this.noOfBedrooms.push("4");
    } else if (this.fourBedroomSelect == false) {

      for (var i = 0; i < this.noOfBedrooms.length; i++) {
        if (this.noOfBedrooms[i] === "4") {
          this.noOfBedrooms.splice(i, 1);
        }
      }
    }
    this.filterSelectOne = false;

  }

  fiveBedroom() {
    this.fiveBedroomSelect = !this.fiveBedroomSelect;
    if (this.fiveBedroomSelect) {
      this.noOfBedrooms.push("5");
    } else if (this.fiveBedroomSelect == false) {

      for (var i = 0; i < this.noOfBedrooms.length; i++) {
        if (this.noOfBedrooms[i] === "5") {
          this.noOfBedrooms.splice(i, 1);
        }
      }
    }
    this.filterSelectOne = false;

  }

  apartmentclick() {
    this.apartmentSelect = !this.apartmentSelect;
    if (this.apartmentSelect) {
      this.projecttype.push("50401");
    } else if (this.apartmentSelect == false) {
      for (var i = 0; i < this.projecttype.length; i++) {
        if (this.projecttype[i] === "50401") {
          this.projecttype.splice(i, 1);
        }
      }
    }
    this.filterSelectOne = false;
  }

  villaclick() {
    this.villaSelect = !this.villaSelect;
    if (this.villaSelect) {
      this.projecttype.push("50402");
    } else if (this.villaSelect == false) {
      for (var i = 0; i < this.projecttype.length; i++) {
        if (this.projecttype[i] === "50402") {
          this.projecttype.splice(i, 1);
        }
      }
    }
    this.filterSelectOne = false;
  }

  plotclick() {
    this.plotSelect = !this.plotSelect;
    if (this.plotSelect) {
      this.projecttype.push("50403");
    } else if (this.plotSelect == false) {
      for (var i = 0; i < this.projecttype.length; i++) {
        if (this.projecttype[i] === "50403") {
          this.projecttype.splice(i, 1);
        }
      }
    }
    this.filterSelectOne = false;
  }

  readyToMove() {
    this.readyToMoveSelect = !this.readyToMoveSelect;
    if (this.readyToMoveSelect) {
      this.projectStatus.push("50307");
    } else if (this.readyToMoveSelect == false) {

      for (var i = 0; i < this.projectStatus.length; i++) {
        if (this.projectStatus[i] === "50307") {
          this.projectStatus.splice(i, 1);
        }
      }
    }
    this.filterSelectOne = false;
  }

  // projectType(projectType) {
  //   this.proptypeId = projectType;
  //   this.filterSelectOne = false;
  // }

  posessionWithin(posession) {
    this.possission = posession;
    this.filterSelectOne = false;

  }

  underConstruction() {
    this.underConstructionSelect = !this.underConstructionSelect;
    if (this.underConstructionSelect) {
      this.projectStatus.push("50309");
    } else if (this.underConstructionSelect == false) {

      for (var i = 0; i < this.projectStatus.length; i++) {
        if (this.projectStatus[i] === "50309") {
          this.projectStatus.splice(i, 1);
        }
      }
    }
    this.filterSelectOne = false;

  }

  newLaunch() {
    this.newLaunchSelect = !this.newLaunchSelect;
    if (this.newLaunchSelect) {
      this.projectStatus.push("50310");
    } else if (this.newLaunchSelect == false) {

      for (var i = 0; i < this.projectStatus.length; i++) {
        if (this.projectStatus[i] === "50310") {
          this.projectStatus.splice(i, 1);
        }
      }
    }
    this.filterSelectOne = false;

  }

  upcoming() {
    this.preLaunchSelect = !this.preLaunchSelect;
    if (this.preLaunchSelect) {
      this.projectStatus.push("50308");
    } else if (this.preLaunchSelect == false) {

      for (var i = 0; i < this.projectStatus.length; i++) {
        if (this.projectStatus[i] === "50308") {
          this.projectStatus.splice(i, 1);
        }
      }
    }
    this.filterSelectOne = false;
  }

  minbugvalue(id) {
    this.budgetsLength = this.budgets.length;
    this.newBudget = this.budgets.slice(id, this.budgetsLength);
    this.minBugPrice = id;
    this.filterSelectOne = false;

  }

  maxbugvalue(id) {
    this.maxBugPrice = id;
    this.filterSelectOne = false;

  }

  minbugvalueDesktopView() {
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

  Date = new Date();
  user = new Enquiry();
  enquiry = new Enquiry();
  propertylists: any;
  crawlproperty: any;
  localitylist: any;
  builderlist: any;
  statuslist: any;
  proptypelist: any;
  regionslist: any;
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
  property_type: any;
  propertyimage = this.Service.imagesURL + "uploadPropertyImgs/";
  budget_show = true;
  bud_val_show = false;

  toggleSearch() {
    $('#budgetmodal').toggleClass('expanded');
    $('#budgetmodal').toggleClass('collapsed');
  };

  clickedSomewherecity() {
    $('#budgetmodal').addClass('collapsed');
    $('#budgetmodal').removeClass('expanded');
  };

  minprice = new minmax();
  maxprice = new minmax();
  modelmindata: any;
  minprice_value: any;
  maxprice_value: any;
  modeldata: any;

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
      this.minprice_value = "1 L";
    } else {
      this.maxprice_value = this.maxprice.budget_value;
      this.minprice_value = this.minprice.budget_value;
    }
    this.maxprice_value = this.maxprice.budget_value;
  };
  // radha update
  getlocationlist() {
    this.Service.getlocationlist().subscribe((city: any[]) => {
      this.citiess = city['locations'];
      // this.selectedLocation = this.citiess[0]['city'];
    });
  }

  passurl(){
     var proptypeId = [this.projecttype];
     var bedroom = [this.noOfBedrooms];
     var min = this.minbudget_IDPK;
     var max = this.maxbudget_IDPK;
     var loc = [this.localityData];
     var pos = this.possission;
     var statusid = [this.projectStatus];
     var location = [this.localityName];
     this.router.navigate([],
       {
         queryParams: {proptypeid:proptypeId,bedroom:bedroom,minprice:min,maxprice:max,possission:pos,locality:loc,location:location,statusid:statusid}
       });
 }

 getfilters(){
  FilterComponent.citycount = 0;
  this.filterLoader = true;
  var limitparam = 0;
  var limitprprtyrows = 4;
  var crawllimitprprty = 5000;
  this.activeroute.queryParamMap.subscribe(queryParams => {
       this.urlpropertyid = queryParams.getAll('proptypeid');
       
       this.urlbedroom = queryParams.getAll('bedroom');
       this.urlmin = queryParams.getAll('minprice');
       this.urlmax = queryParams.getAll('maxprice');
       this.urlpos = queryParams.getAll('possission');
       this.urlloc = queryParams.getAll('locality');
       this.urlstatusid = queryParams.getAll('statusid');
       this.urlcityname = queryParams.get('cityId');
      });
    var param = {
     limit: limitparam,
     limitrows: limitprprtyrows,
     proptypeid: this.urlpropertyid,
     bedroom: this.urlbedroom,
     minprice:this.urlmin,
     maxprice:this.urlmax,
     locality:  this.urlloc,
     possission: this.urlpos,
     statusid:  this.urlstatusid 
   }
   
   this.Service.getprojectscount('Bangalore', param).subscribe(countprojects => {
    let projectcount = countprojects['Counts'];
    this.projectcount = projectcount[0].PropertyCounts;
    this.filterLoader = false;
  })

  this.Service.getCity('Bangalore', param).subscribe(lists => {
    let propertylists = lists['deatils'];
    this.propertylists = propertylists;
  })

}
   
   onOptionsSelected(value:string){
    const city = value;
    this.city_name = city;
    if (city == 'Bangalore'){
      this.locationSelectedId = '1';
    }else if (city == 'Hyderabad') {
      this.locationSelectedId = '2';
    }else if (city == 'Chennai') {
      this.locationSelectedId = '3';
    }else if (city == 'Kochi') {
      this.locationSelectedId = '4';
    }else if (city == 'Pune') {
      this.locationSelectedId = '5';
    }else if (city == 'Delhi') {
      this.locationSelectedId = '6';
    }else if (city == 'Kolkata') {
      this.locationSelectedId = '7';
    }else if (city == 'Mumbai') {
      this.locationSelectedId = '8';
    }else if (city == 'Amaravati') {
      this.locationSelectedId = '9';
    }
    var regionid = "";
    // this.Service.getlocality(this.locationSelectedId, regionid).subscribe(localitys => {
    //   this.localitys = localitys['details'];
    // })

    var paramss = {
      cityid : this.locationSelectedId,
      regionid : regionid
    };
    this.Service.getlocality(paramss).subscribe(localitys => {
      this.localitys = localitys['details'];
    });
    this.getCityMobileView();
}


   getcity() {
    FilterComponent.citycount = 0;
    this.routeSub = this.activeroute.params.subscribe(params => {
      var citiname =  this.city_name;
      this.cityapi.limit = '0';
      this.cityapi.limitrows = '4';
      this.citybreadcrump =  this.city_name;
      var limitparam = 0;
      var limitprprtyrows = 4;
      var limitcrawlrows = 5000;

      var param = {
        limit: limitparam,
        limitrows: limitprprtyrows,
        reraId: this.reraid,
        bedroom: this.noOfBedrooms,
        minprice: this.minbudget_IDPK,
        maxprice: this.maxbudget_IDPK,
        possission: this.possission,
        locality: this.locality
      }
      var crawlparam = {
        limit: limitparam,
        limitrows: limitcrawlrows,
      }
      this.Service.getprojectscount(citiname, param).subscribe(countprojects => {
        let projectcount = countprojects['Counts'];
        this.projectcount = projectcount[0].PropertyCounts;
      })

      this.Service.getCity(citiname, param).subscribe(lists => {
        let propertylists = lists['deatils'];
        this.propertylists = propertylists;
        
        var apicityname = this.propertylists[0].city_name;
        var apinamecity = apicityname.toLowerCase();

        // if (citiname != apinamecity) {
        //   this.router.navigate([apinamecity + '/property-sale']);
        // }
        // else if(lasturl != "property-sale"){
        //   window.location.href = apinamecity+"/property-sale";
        // }
      })
      this.Service.getcrawlcity(citiname, crawlparam).subscribe(propertycrawl => {
        this.crawlproperty = propertycrawl['deatils'];
      })
    });
  }

  getlocality() {
    this.locationSelectedId = '1';
    var regionid = "";
    var paramss = {
      cityid : this.locationSelectedId,
      regionid : regionid
    };
    this.Service.getlocality(paramss).subscribe(localitys => {
      this.localitys = localitys['details'];
    });
  }
  loadMore() {
    this.routeSub = this.activeroute.params.subscribe(params => {
      var citiname = this.city_name;
      let totalcount = this.projectcount;
      const limit = FilterComponent.citycount += 4;
      let limitprprtyrows = 4;
      var rera = this.reraid;
      var bedroom = this.noOfBedrooms;
      var min = this.minbudget_IDPK;
      var max = this.maxbudget_IDPK;
      var pos = this.possission;
      var loc = this.locality;
      var projectStatus = this.projectStatus;
      var proptypeId = [this.projecttype];
      let param = {
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
      }
      let livecount = this.propertylists?.length || 0;
      if (livecount < totalcount) {
        return this.Service.getCity(citiname, param).subscribe(propertylists => {
          this.propertylists = this.propertylists.concat(propertylists['deatils']);
        })
      } else {
        this.showLoader = false;
      }
      this.Service.getprojectscount(citiname, param).subscribe(projectcounts => {
        let projectcount = projectcounts['Counts'];
        this.projectcount = projectcount[0].PropertyCounts;
      })
    });
  }


  getCityMobileView() {
    FilterComponent.citycount = 0;
    this.filterLoader = true;
    this.routeSub = this.activeroute.params.subscribe(params => {
      var citiname =  this.city_name;
      this.cityapi.limit = '0';
      this.cityapi.limitrows = '4';
      var limitparam = 0;
      var limitprprtyrows = 4;
      var limitcrawlrows = 5000;
      var rera = this.reraid;
      var bedroom = this.noOfBedrooms;
      var min = this.minbudget_IDPK;
      var max = this.maxbudget_IDPK;
      var pos = this.possission;
      var loc = this.localityData;
      var projectStatus = this.projectStatus;
      var proptypeId = [this.projecttype];
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
      }
      var crawlparam = {
        limit: limitparam,
        limitrows: limitcrawlrows,
      }
      this.Service.getprojectscount(citiname, param).subscribe(projectcounts => {
        let projectcount = projectcounts['Counts'];
        this.projectcount = projectcount[0].PropertyCounts;
        this.filterLoader = false;
      })
      this.Service.getCity(citiname, param).subscribe(lists => {
        let propertylists = lists['deatils'];
        this.propertylists = propertylists;
        this.filterLoader = false;
        var apicityname = this.propertylists[0].city_name;
        var apinamecity = apicityname.toLowerCase();
      })
    });
  }

    // radha update

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


  showLoader = true;
  fliterbedroom: string;
  possission: string;
  locality = [];
  bedroom = new flitercity();

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

  readmore() {
    $(".city_div img").css('filter', "brightness(.2)");
    $(".banner_description").css('height', "260px");
    $(".city_div").css('height', "510px");
    $(".about_us_banner label").css('top', "20%");
    $(".city_zone_links").css('top', "27%");
    $("p.banner_description").css('top', "35%");
    $("p.banner_description").css('padding', "0px 130px 0 130px");
    $("p.banner_description").css('overflow-y', "scroll");
    $(".arrow").css('top', "89%");
    $(".down_arrow").css('display', "none");
    $(".up_arrow").css('display', "block");
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
    $(".city_div img").css('filter', "brightness(.3)");
    $(".banner_description").css('height', "35px");
    $(".city_div").css('height', "300px");
    $(".about_us_banner label").css('top', "40%");
    $(".about_us_banner label.descrip").css('top', "28%");
    $(".city_zone_links").css('top', "43%");
    $("p.banner_description").css('top', "60%");
    $("p.banner_description").css('padding', "0px 270px 0 270px");
    $("p.banner_description").css('overflow-y', "hidden");
    $(".arrow").css('top', "75%");
    $(".down_arrow").css('display', "block");
    $(".up_arrow").css('display', "none");
  }

  property_id: any;
  propertyname: any;

  getenquiry(id, name) {
    this.property_id = id;
    this.enquiry.propertyname = name;
  }

  IsVisible = false;


  ShowHide() {
    this.IsVisible = this.IsVisible ? false : true;
  }

  addenquiry() {
    if ($('#ename').val() == "") {
      $('#ename').focus().css("border-color", "red").attr('placeholder', 'Please Enter Name');
      return false;
    } else {
      var enameFilter = /^([a-zA-Z]+\s)*[a-zA-Z]+$/;
      if (enameFilter.test($('#ename').val())) {
        $('#ename').removeAttr("style");
      } else {
        $('#ename').focus().css("border-color", "red").attr('placeholder', 'Please enter valid name').val('');
        return false;
      }
    }

    if ($('#emobile').val() == "") {
      $('#emobile').focus().css("border-color", "red").attr('placeholder', 'Please Enter Phone Number');
      return false;
    } else {
      var emobileno = /^[0-9]{10}$/;
      if (emobileno.test($('#emobile').val())) {
        $('#emobile').removeAttr("style");
      } else {
        $('#emobile').focus().css("border-color", "red").attr('placeholder', 'Please enter valid contact number').val('');
        return false;
      }
    }
    swal({
      title: 'We Will Intimate you soon!',
      type: 'success',
      showConfirmButton: false,
      timer: 1500
    })
    this.cancel.nativeElement.click();
    var param = this.enquiry;
    this.Service.addPropertyCall(param).subscribe((enquiry) => {
      this.enquiry.ename = '';
      this.enquiry.emobile = '';
      this.enquiry.propertyname = '';
    })
    this.IsVisible = false
  }


  onLocalitySelect(eve) {
    this.localityData.push(eve.locality_IDPK);
  }

  onLocalityDeSelect(event) {
    var index = this.locality.indexOf(event);
    this.localityData.splice(index, 1);
  }

  config = {
    allowNumbersOnly: true,
    length: 6,
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
    $('#modal-container').addClass('out');
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
      var prestatus = success['Data'];
      var status = prestatus[0].MessageErrorDescription;
      if (status == 'Success') {
        this.countdown.begin();
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
    var otplength = 6;
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
        this.countdown.restart();
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
    var pageorgin = 'City Page';

    this.Service.addAboutCall(param, pageorgin, this.cityidseo).subscribe((success) => {
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

    this.otploader = true;
    $('body').addClass('bodyoverlay');
    var param = this.enquiry;
    this.Service.otpsend(param).subscribe((success) => {
      var prestatus = success['Data'];
      var status = prestatus[0].MessageErrorDescription;
      if (status == 'Success') {
        this.countdown2.begin();
        var buttonId = $('#one').attr('id');
        $('#modal-container2').removeAttr('class').addClass(buttonId);
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
        this.otploader = false;
        $('body').removeClass('bodyoverlay');
      }
    }, (err) => {
      
    });
  }

  otpvalidate2() {
    var otplength = 6;
    if ($('#otp2').val() == '') {
      swal({
        title: 'Please enter the OTP!',
        type: 'error',
        showConfirmButton: false,
        timer: 1000
      });
      return false;
    } else {
      var liveotpcount = $('#otp2').val().length;
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
    var param = this.enquiry;
    this.otploader = true;
    $('body').addClass('bodyoverlay');
    this.Service.otpvalidcheck(param).subscribe((success) => {
      var status = success['status'];
      if (status == 'True') {
        this.getintouch();
        this.countdown2.restart();
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

  getintouch() {
    var param = this.enquiry;
    var pageorgin = 'City Page';
    this.Service.addAboutCall(param, pageorgin, this.cityidseo).subscribe((success) => {
      if (success['status'] === 'True') {
        this.otploader = false;
        this.cancel.nativeElement.click();
        $('body').removeClass('bodyoverlay');
        swal({
          title: 'OTP Verified',
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
}





