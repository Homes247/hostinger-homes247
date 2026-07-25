import { Component, OnInit, HostListener, Inject, PLATFORM_ID, ElementRef, ViewChild } from '@angular/core';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';
import { WINDOW, LOCAL_STORAGE } from '@ng-toolkit/universal';
import { DataService } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CountdownComponent, CountdownEvent } from "ngx-countdown";
import { Enquiry } from "../home/home";
import { City, minmax, flitercity } from '../city/city';
import { CityService } from '../city.service';
import { DataService2 } from '../data.service2';
import { FilterService } from '../filter.service';

declare var $: any;
declare var swal: any;

declare var $: any;
@Component({
  selector: 'app-proptype-with-status',
  templateUrl: './proptype-with-status.component.html',
  styleUrls: ['./proptype-with-status.component.css']
})
export class ProptypeWithStatusComponent implements OnInit {

  @ViewChild('cd', { static: false }) private countdown3: CountdownComponent;
  @ViewChild('cd2', { static: false }) private countdown4: CountdownComponent;
  @ViewChild('scrollapiloader') scrollapiloader: ElementRef;
  @ViewChild('cancel') cancel: ElementRef;
  private routeSub: Subscription;
  property_type: any;
  proptypesecondory: any;
  proptypethird: any;
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
  property_typeId: any;
  statusId = '';

  topnewapiload = true;
  topnewdivreached = false;
  innerheader:any;

  enquiryFormComponent: any;
  otploader = false;

  componentloads = false;


  
  @HostListener('window:scroll', ['$event'])
  @HostListener('touchstart', ['$event'])

  onWindowScroll() {
    const elementPosition = this.scrollapiloader.nativeElement.offsetTop;
    const scrollPosition = window.pageYOffset;
    if (this.topnewdivreached = scrollPosition >= elementPosition) {
      if (this.topnewapiload == true) {
        this.topnewapiload = false;

        this.luxuryPropDetails();
        this.onReadyToMoveDetails();

      }
      // import('../innerheader/innerheader.module').then(mod => mod.InnerHeaderModule).then(InnerHeaderModule => {
      //   this.innerheader = InnerHeaderModule.components['lazy'];
      //   this.loaded = true;
      // });

    }


    if(this.componentloads == false){
      this.componentloads = true;
   

    import('../enquiry-form/enquiry-form.module').then(mod => mod.enquiryFormModule).then(enquiryFormModule =>{
      this.enquiryFormComponent = enquiryFormModule.components['lazy'];
    $('.modal-login').css('z-index', '99999');
    });
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
    // if ($(window).scrollTop() >= $(".footerDiv").offset().top) {
    //   $('.compare_sort_filter_div').css('visibility', 'hidden')
    // } else {
    //   $('.compare_sort_filter_div').css('visibility', 'visible')
    // }
    this.Service.mouseenterservice3();

  }

  constructor(private titleService: Title, private meta: Meta,
    public Filter: FilterService,
    public Service: DataService, private router: Router,
    private fb: FormBuilder, private activeroute: ActivatedRoute,
    public cityservice: CityService,public Service2: DataService2,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(WINDOW) private window: Window,
    @Inject(LOCAL_STORAGE) private Local_Storage: any, @Inject(DOCUMENT) private doc) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }
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
    ProptypeWithStatusComponent.typecount = 0;
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
    import('../footer/footer.module').then(mod => mod.FooterModule).then(FooterModule => {
      this.FooterComponent = FooterModule.components['lazy'];
      this.loaded = true;
    });
  }

  SelectedPropName: any;

  propertyNameClick(PropertyName,RegionID,localityid,PropertyID) {
    this.SelectedPropName = PropertyName;
    this.Filter.PropertyName = PropertyName;
    this.Filter.RegionID = RegionID;
    this.Filter.localityid = localityid;
    this.Filter.propid = PropertyID;
    $('#otpValidate').css('display','block');
  }

  readyToMovePropList = [];
  readyToMoveproploader: boolean = true;
  HideReadyToMoveProp = true;
  onReadyToMoveDetails() {
    const limite = 4;
    const limitrows = 6;
    const statusid = '50307';
    var locname = this.localtyname;
    var locid = '';
    let param = {
      limit: limite,
      limitrows: limitrows,
      statusid: statusid,
      localityname: locname,
      locality: locid,
    };
    this.Service.getCity(this.cityname, param).subscribe(response => {
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

  affordablePropList = [];
  affordableproploader: boolean = true;
  HideAffordableProp = true;
  affordablePropDetails() {
    const limite = 4;
    const limitrows = 6;
    const statusid = '50307';
    const min = 6;
    const max = 9;
    var locname = this.localtyname;
    var locid = '';
    let param = {
      limit: limite,
      limitrows: limitrows,
      statusid: statusid,
      minprice: min,
      maxprice: max,
      localityname: locname,
      locality: locid,
    };
    this.Service.getCity(this.cityname, param).subscribe(response => {
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
  luxuryPropList = [];
  luxuryproploader: boolean = true;
  HideLuxuryProp = true;
  luxuryPropDetails() {
    const limite = 4;
    const limitrows = 6;
    const statusid = '50307';
    const min = 13;
    const max = 24;
    var locname = this.localtyname;
    var locid = '';
    let param = {
      limit: limite,
      limitrows: limitrows,
      statusid: statusid,
      minprice: min,
      maxprice: max,
      localityname: locname,
      locality: locid,
    };
    this.Service.getCity(this.cityname, param).subscribe(response => {
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

  metaseo() {
    if (this.router.url.indexOf("bangalore") > -1) {
      this.cityzonelinks_types = true;
    } else {
      this.cityzonelinks_types = false;
    }
    var value = this.cityservice.cityfinder(this.router.url);
    this.cityname = value.cityname.replace('-',' ');
    this.cityid = value.cityid;

    if (this.router.url.split('?')[0] === '/ready-to-move-flats-in-bangalore') {
      this.property_typeId = '50401';
      this.statusId = '50307';
      this.cityid = '1';
      this.city = 'bangalore';
      this.property_type = 'Ready to move flats';
      this.proptypesecondory = 'Ready to move Apartments';
      this.proptypethird = "Ready to move Apartments";
      this.titleService.setTitle('Buy Ready to Move flats in Bangalore | Ready to Move Apartments | Homes247.in');
      this.meta.updateTag({ name: 'description', content: 'Explore & Buy Best Ready to Move Flats in Bangalore. Get the best deals for the Ready to Move Apartments in Bangalore from the top Developers only from Homes247.in' });
    } else if (this.router.url.split('?')[0] === '/under-construction-projects-in-bangalore') {
      this.property_typeId = '';
      this.statusId = '50309';
      this.cityid = '1';
      this.city = 'bangalore';
      this.property_type = 'Under Construction Projects';
      this.proptypesecondory = 'Ongoing projects';
      this.proptypethird = "Ongoing projects";
      this.titleService.setTitle('Buy Under construction projects in Bangalore | Ongoing Projects');
      this.meta.updateTag({ name: 'description', content: 'Explore and Buy the Best Under Construction Projects in Bangalore. Get the best Deals for the Ongoing Projects in Bangalore only from Homes247.in' });
    } else if (this.router.url.split('?')[0] === '/upcoming-projects-in-bangalore') {
      this.property_typeId = '';
      this.statusId = '50310,50308';
      this.cityid = '1';
      this.city = 'bangalore';
      this.property_type = 'Upcoming Projects';
      this.proptypesecondory = 'Prelaunch Projects';
      this.proptypethird = "New projects";
      this.titleService.setTitle('Buy Upcoming projects in bangalore | Prelaunch and New Projects in Bangalore');
      this.meta.updateTag({ name: 'description', content: 'Explore and the Buy Best Upcoming projects in bangalore. Avail the best deals for Prelaunch and New projects in bangalore.' });
    }
    this.Service.createLinkForCanonicalURL();
  }

  propertylists1 = [];
  propertylists2 = [];
  propertylists3 = [];
  propertylists4 = [];
  propertylists5 = [];
  propertylists6 = [];
  sectionFirstResponce: boolean = false;
  getcity() {
    ProptypeWithStatusComponent.typecount = 0;

    this.routeSub = this.activeroute.params.subscribe(params => {
      var cityname = this.city.replace('-',' ');
      var url = params['proptypename-:proptypeid'];
      this.proptypeurlparam = url;
      var typeid = this.property_typeId;

      this.citybreadcrump = cityname;

      this.cityapi.limit = '0';
      this.cityapi.limitrows = '4';
      var limitparam = 0;
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
        statusid: this.statusId,
      }

      this.Service.getprojectscount(this.city, param).subscribe(countprojects => {
        let projectcount = countprojects['Counts'];
        this.projectcount = projectcount[0].PropertyCounts;

      })

      this.Service.getCity(this.city, param).subscribe(lists => {
        let propertylists = lists['deatils'];
        this.propertylists = propertylists;
        var proptypename = this.propertylists[0].propertyType;
        var property_type = this.propertylists[0].propertyType;
        var lowerproptype = property_type.replace(/\s+/g, '-').toLowerCase();
        var apicityname = this.propertylists[0].city_name;
        var apinamecity = apicityname.toLowerCase();
        let urlrouter = this.router.url;
        let typejoiner = lowerproptype + "-" + typeid;

      })
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
        statusid: this.statusId,
      };
      this.Service.getCity(this.city, param1).subscribe(lists => {
        const propertylists = lists['deatils'];
        this.propertylists1 = propertylists;
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
        statusid: this.statusId,
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
        statusid: this.statusId,
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
        statusid: this.statusId,
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
        statusid: this.statusId,
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
        statusid: this.statusId,
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
      var typeid = this.property_typeId;
      let totalcount = this.projectcount;
      var loopcount = 0;
      for (loopcount = 0; loopcount <= 10; loopcount++) {
        const limit = ProptypeWithStatusComponent.typecount += 1;
        let limitprprtyrows = 1;
        var proptypeid = typeid;
        var bedroom = this.noOfBedrooms;
        var min = this.minbudget_IDPK;
        var max = this.maxbudget_IDPK;
        var pos = this.possission;
        var loc = this.locality;
        var statusid = this.statusId;
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
          statusid: this.statusId
        }
        let livecount = this.propertylists?.length || 0;
        if (livecount < totalcount) {
          this.Service.getCity(this.city, param).subscribe(lists => {
            let propertylists = lists['deatils'];
            this.propertylists = this.propertylists.concat(propertylists);
          })
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

  ShowHideSort() {
    this.sortShowHide = true;
  }

  HideSort() {
    this.sortShowHide = false;
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
    });
    if ('userID' in this.Local_Storage) {
      this.localstorediv = false;
    } else {
      this.localstorediv = true;
    }
    if ("propertyID" in this.Local_Storage) {
      this.storagearr = JSON.parse(this.Local_Storage.getItem('propertyID'));
    } else {
      this.Local_Storage.setItem("propertyID", "[]");
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
    ProptypeWithStatusComponent.typecount = 0;
    this.registerForm.reset({
      projectType: '',
      minBudget: '',
      maxBudget: '',
      posessionWithin: '',
      locality: '',
    })
    this.minbudget_IDPK = '';
    this.maxbudget_IDPK = "";
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
    this.possission = "";
    this.proptypeId = "";
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
    this.getcity();

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
      this.projectStatus.push("50310");
    } else if (this.preLaunchSelect == false) {

      for (var i = 0; i < this.projectStatus.length; i++) {
        if (this.projectStatus[i] === "50310") {
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
  propertyimage = this.Service.imagesURL + "uploadPropertyImgs/";
  minprice = new minmax();
  maxprice = new minmax();
  city: any;
  showLoader = true;
  possission = "";
  locality = [];

  getlocality() {
    var value = this.cityservice.cityfinder(this.router.url);
    this.cityname = value.cityname;
    this.cityId = value.cityid;
    var regionid = "";
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

  propertyId: any;
  alertmesg: any;

  addwishlist(id) {
    this.propertyId = id;
    const userid = this.Local_Storage.getItem("userID");
    var param = {
      userid: userid,
      propid: this.propertyId
    }
    this.Service.addfavaourite(param).subscribe(response => {
      this.alertmesg = response['message']
      if (response['status'] === 'True') {
        $('.toast').toast('show');
      }
    });
  }

  wishlistaddstorage(id) {
    if ("propertyID" in this.Local_Storage) {
    } else {
      this.Local_Storage.setItem("propertyID", "[]");
    }
    const proparray = this.Local_Storage.getItem('propertyID');
    const jsonpars = JSON.parse(proparray);
    const itemToRemoveIndex = jsonpars.indexOf(id);

    this.parsedarray = JSON.parse(proparray);
    if (itemToRemoveIndex == -1) {
      this.parsedarray.push(id);
      this.Local_Storage.setItem("propertyID", JSON.stringify(this.parsedarray));
    } else {
      this.parsedarray = this.parsedarray.filter(function (item) {
        return item !== id
      })
      this.Local_Storage.setItem("propertyID", JSON.stringify(this.parsedarray));
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

  

  onLocalitySelect(eve) {
    this.localityData.push(eve.locality_IDPK);
    this.getcity();
  }

  onLocalityDeSelect(event) {
    var index = this.locality.indexOf(event);
    this.localityData.splice(index, 1);
    this.getcity();
  }

 

  sortfiltershowhide() {
    var prevScrollpos = window.pageYOffset;
    var isScrolling;
    window.addEventListener('scroll', function (event) {
      var currentScrollPos = window.pageYOffset;
      if (prevScrollpos > currentScrollPos) {
        $('.sortfilter_div').css('display', 'block')
      } else {
        $('.sortfilter_div').css('display', 'none')
        $('#fixed-accordion').css('visibility', 'hidden');
      }
      prevScrollpos = currentScrollPos;
      window.clearTimeout(isScrolling);
      isScrolling = setTimeout(function () {
        $('.sortfilter_div').css('display', 'block')
      }, 2000);
      if ($(window).scrollTop() + $(window).height() > $(document).height() - 200) {
        $('.sortfilter_div').css('display', 'none')
        isScrolling = setTimeout(function () {
          $('.sortfilter_div').css('display', 'none')
        }, 2000);
      }
    }, false);
  }

  // compare properties
  Oncompareclick() {
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
          })
        } else {
          this.parsedarray.push(propid);
          this.Local_Storage.setItem('ComparePropID', JSON.stringify(this.parsedarray));
          this.compareproparray = JSON.parse(localStorage.getItem('ComparePropID'));
        }
      } else {
        this.parsedarray = this.parsedarray.filter(function (item) {
          return item !== propid;
        })
        this.compareloader1 = true;
        this.compareprop1 = false;
        this.compareloader2 = true;
        this.compareprop2 = false;
        if (this.compareproparray.length == 1) {
          this.hideshowcompare = false;
          this.Local_Storage.removeItem("comparePropType1");
        } else {
          this.hideshowcompare = true;
        }
        this.Local_Storage.setItem("ComparePropID", JSON.stringify(this.parsedarray));
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
          })
        } else {
          this.parsedarray.push(propid);
          this.Local_Storage.setItem('ComparePropID', JSON.stringify(this.parsedarray));
          this.compareproparray = JSON.parse(localStorage.getItem('ComparePropID'));
        }
      } else {
        this.parsedarray = this.parsedarray.filter(function (item) {
          return item !== propid;
        })
        this.compareloader1 = true;
        this.compareprop1 = false;
        this.compareloader2 = true;
        this.compareprop2 = false;
        if (this.compareproparray.length == 1) {
          this.hideshowcompare = false;
          this.Local_Storage.removeItem("comparePropType1");
        } else {
          this.hideshowcompare = true;
        }
        this.Local_Storage.setItem("ComparePropID", JSON.stringify(this.parsedarray));
        this.compareproparray = JSON.parse(localStorage.getItem('ComparePropID'));
      }
    } else {
      swal({
        text: 'Compare only with same Property Type',
        type: 'error',
        showConfirmButton: false,
        timer: 2000
      })
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
      this.Local_Storage.setItem("comparePropType1", this.proptype1);
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
      this.Local_Storage.setItem("comparePropType2", this.proptype2);
      this.compareloader2 = false;
      this.compareprop2 = true;
    });
  }
  }

  closeprop1(propid1) {
    this.compareproparray = JSON.parse(localStorage.getItem('ComparePropID'));
    if (this.compareproparray.length == 1) {
      this.hideshowcompare = false;
      this.Local_Storage.removeItem("comparePropType1");
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
      })
      this.compareloader1 = true;
      this.compareprop1 = false;
      this.Local_Storage.setItem("ComparePropID", JSON.stringify(this.parsedarray));
      this.compareproparray = JSON.parse(localStorage.getItem('ComparePropID'));
    }
  }

  closeprop2(propid2) {
    this.compareproparray = JSON.parse(localStorage.getItem('ComparePropID'));
    if (this.compareproparray.length == 1) {
      this.hideshowcompare = false;
      this.Local_Storage.removeItem("comparePropType1");
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
      })
      this.compareloader2 = true;
      this.compareprop2 = false;
      this.Local_Storage.setItem("ComparePropID", JSON.stringify(this.parsedarray));
      this.compareproparray = JSON.parse(localStorage.getItem('ComparePropID'));
    }
  }

  CompareNow() {
    this.router.navigate(["/compare-properties"]);
    this.Local_Storage.setItem("cityname", this.cityname);
  }


}
