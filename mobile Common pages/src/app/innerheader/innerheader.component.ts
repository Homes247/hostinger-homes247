import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, ViewChild, } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LOCAL_STORAGE, WINDOW } from '@ng-toolkit/universal';
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { CityService } from '../city.service';
import { DataService } from '../data.service';
import { DataService2 } from '../data.service2';

declare var $: any;


@Component({
  selector: 'app-innerheader',
  templateUrl: './innerheader.component.html',
  styleUrls: ['./innerheader.component.css'],
})

export class InnerheaderComponent implements OnInit {
  @ViewChild('scrollapiloader') scrollapiloader: ElementRef;
  userlogin = false;
  loginshow = true;
  changeText: boolean;
  myControl = new FormControl();
  options;
  filteredOptions: Observable<any>;
  locationSelectedId = '1';
  searchstring: any;

  uploads: any;
  trending: any;
  featured: any;
  handpicked: any;
  launched: any;
  topsearch: any;
  buildername: any;

  citiess: any;
  cityid: any;
  selected: any;
  currentCity: any = 'Select City';
  testli_data: any[] = [];
  testLi2_data: any[] = [];
  showCities = false;
  RecentCityStorage = [];

  // currentCitySearchNav;
  cityyy: any;
  citynav: any;
  countryExist: any;
  recenthide = false;
  citiesss: any;
  SelectCity = 'Select City';
  topnewdivreached = false;
  // defined the array of data
  // public autoCompleteData: { [key: string]: Object }[] = [];
  public localityproperties: { [key: string]: Object }[] = [];
  public autoCompleteData_loc: { [key: string]: Object }[] = [];
  public autoCompleteData_loc_rev: { [key: string]: Object }[] = [];
  public autoCompleteData_build: { [key: string]: Object }[] = [];

  // maps the appropriate column to fields property
  public fields: Object = { groupBy: 'title', value: 'name' };

  // set the placeholder to the AutoComplete input
  public text: string = 'Enter a location';
  //enable the highlight property to highlight the matched character in suggestion list
  public highlight: Boolean = true;
  //set the minLength to restrict the remote request until search key contains 3 characters.
  public minLength: Number = 2;
  maincitypage = true;
  cityhomepage = true;
  newlaunchprojects: any;
  private routeSub: Subscription;
  cityId: string;
  localitycombo = true;
  citycombo = true;
  citystatuscombo = true;
  localname: any;
  cityname: string;
  readytomoveflats = true;
  newprojects = true;
  localityproperties_hide = true;
  statusId: any;
  noOfBedrooms: any;
  localityName: any;
  projectStatus: any;
  locality = [];
  localityId: any;
  property_type: any;
  bhkValue: any;
  proptypeid: any;
  city: any;
  projecttype = [];
  residflatsforsale = true;
  budgetFlatTrue = true;
  villas = true;
  plots = true;
  home = true;
  stlc = true;
  btlc = true;
  upcoming_new_launch = true;
  status = true;
  maxPrice;
  minPrice;
  locname: any;
  proptypeurlparam: any;
  propertytypeid: any;
  builder: any;
  status_name: any;
  zoneid: any;
  regionid: any;
  zones: any;
  localitys: any;
  zone = true;
  mainpage = true;
  agriculture = true;
  rentpage = true;
  projectandvideos = true;
  builder_locality = true;
  currentCity2: string;
  majorcities: any;
  builderid: any;
  forCareers = false;

  constructor(
    public Service: DataService,
    private router: Router,
    private dataService2: DataService2,
    public cityservice: CityService,
    private activeroute: ActivatedRoute,
    @Inject(WINDOW) private window: Window,
    @Inject(LOCAL_STORAGE) private Local_Storage: any, @Inject(DOCUMENT) private doc
  ) {
    this.changeText = false;
    this.Service.mouseenterlisten3().subscribe((m: any) => {
      this.Lazyload();
    })
  }
  IsVisiblee = false;
  ShowHide_More() {
    this.IsVisiblee = this.IsVisiblee ? false : true;
  }
  ngOnInit() {
    // this.getlocationlist();
    this.getAutocomp();
    this.PageIndex();
    this.Login();
    this.semanticjquery();

    if (this.router.url.indexOf('/careers') > -1) {
      // this.forCareers = true;
      $('.head_sticky').css('display', 'none');
      $('.head_sticky1').css('display', 'flex');
      $('#mySidenavs').addClass('sidenav1');
      $('#mySidenavs').removeClass('sidenav');
    } else {
      // this.forCareers = false;
      $('.head_sticky').css('display', 'block');
      $('.head_sticky1').css('display', 'none');
      $('#mySidenavs').addClass('sidenav');
      $('#mySidenavs').removeClass('sidenav1');

      $(this.window).scroll(function () {
        if ($(this).scrollTop() > 250) {
          $('#refer_li').addClass('scroll_offer');
          $('#refer_li').removeClass('refer_earn');
          $('#top_right').addClass('top_row_right');
          $('#brgr_white').hide();
          $('#brgr_ash').show();
        }
        if ($(this).scrollTop() < 250) {
          $('#refer_li').removeClass('scroll_offer');
          $('#refer_li').addClass('refer_earn');
          $('#top_right').addClass('top_row_right2');
          $('#brgr_white').show();
          $('#brgr_ash').hide();
        }

        if ($(this).scrollTop() > 55) {
          // 
          $('.Header_part').css('position', 'fixed');
          // $('.Header_part').css('transition', '.8s');
          $('.Header_part').css('top', '0');
          $('.fixed_section_main').css('display', 'block');
          $('.fixed_section_main').addClass('fixed_search');
          $('#hidefilter').css('display', 'block');
          $('#hidefilter').addClass('hidefilter');
          // $('.Header_part').css('z-index', '121');
          // if (this.router.url.indexOf('/real-estate-in') > -1) {
          $('.Header_part').css('box-shadow', '2px 2px 5px 2px rgba(0, 0, 0, 0.08)');
          // }
        } else {
          // 
          // 
          $('.Header_part').css('position', 'sticky');
          // $('.Header_part').css('transition', '1s');
          $('.Header_part').css('top', '0');
          // $('.Header_part').css('z-index', '99');
          $('.fixed_section_main').css('display', 'none');
          $('#hidefilter').css('display', 'block');
          $('#hidefilter').removeClass('hidefilter');
          $('.Header_part').css('box-shadow', 'none');

        }
      });
    }

    var trigger = $('.dropdown-toggle');
    var overlay = $('.fadeInLeft');
    var trigger2 = $('.hamburger');
    var overlay2 = $('.overlay');
    var isClosed = false;
    var isClosed2 = false;

    trigger.click(function () {
      hamburger_cross();
    });
    trigger2.click(function () {
      hamburger_cross2();
    });
    function hamburger_cross2() {
      if (isClosed2 == true) {
        overlay2.hide();
        trigger2.removeClass('is-open');
        trigger2.addClass('is-closed');
        $('.test').css('display', 'none')

        isClosed2 = false;

      } else {
        trigger2.removeClass('is-closed');
        trigger2.addClass('is-open');
        setTimeout(() => {
          $('.test').css('display', 'block')
        }, 300);

        overlay2.show();
        isClosed2 = true;

      }
    }
    function hamburger_cross() {
      if (isClosed == true) {
        overlay.removeClass('show');
        setTimeout(() => {
          $('body').click();
        }, 300);
        isClosed = false;
      } else {
        overlay.toggleClass('show');
        isClosed = true;
      }
    }
    $('[data-toggle="offcanvas"]').click(function () {
      $('#wrapper').toggleClass('toggled');
    });
  }

  Modalopen() {
    $('#FirstCityModal').modal('hide');
    $('#filterModal').modal('hide');
    // $('#SecondCityModal').modal('show');
    setTimeout(() => {
      if ($('#FirstCityModal').hasClass('show') || $('#filterModal').hasClass('show') || $('#SecondCityModal').hasClass('show')) {
        $('.head_stick').css('display', 'none');
      } else {
        $('.head_stick').css('display', 'block'); // Show again when no modal is open
      }
      $('.modal-backdrop').removeClass('modal-backdrop fade show');
    }, 300);
    this.Service.mouseenterservice5();
  }
  builderlocality: any;
  PageIndex() {
    if (this.router.url.indexOf('/property-sale') > -1) {
      this.maincitypage = true;
      this.cityhomepage = false;
      this.readytomoveflats = false;
      this.newprojects = false;
      this.citystatuscombo = false;
      this.citycombo = false;
      this.localitycombo = false;
      this.budgetFlatTrue = false;
      this.residflatsforsale = false;
      this.villas = false;
      this.plots = false;
      this.home = false;
      this.upcoming_new_launch = false;
      this.stlc = false;
      this.btlc = false;
      this.builder = false;
      this.status = false;
      this.zone = false;
      this.agriculture = false;
      this.mainpage = false;
      this.projectandvideos = false;
      this.builder_locality = false;
      this.rentpage = false;
    } else if (this.router.url.indexOf('/real-estate-in') > -1) {
      this.maincitypage = false;
      this.cityhomepage = true;
      this.readytomoveflats = false;
      this.newprojects = false;
      this.citystatuscombo = false;
      this.citycombo = false;
      this.localitycombo = false;
      this.budgetFlatTrue = false;
      this.residflatsforsale = false;
      this.villas = false;
      this.plots = false;
      this.home = false;
      this.upcoming_new_launch = false;
      this.stlc = false;
      this.btlc = false;
      this.builder = false;
      this.status = false;
      this.zone = false;
      this.agriculture = false;
      this.mainpage = false;
      this.rentpage = false;
      this.projectandvideos = false;
      this.builder_locality = false;
    } else if (this.router.url.indexOf('/new-launch-projects/new-projects-in-') > -1) {
      this.ready_new();
    } else if (this.router.url.indexOf('/ready-to-move-apartments/ready-to-move-flats-in-') > -1) {
      this.ready_new();
    } else if (this.router.url.indexOf('btc') > -1) {
      this.bhk_status_type_locality_city();
    } else if (this.router.url.indexOf('bstc') > -1) {
      this.bhk_status_type_locality_city();
    } else if (this.router.url.indexOf('bstlc') > -1) {
      this.bhk_status_type_locality_city();
    } else if (this.router.url.indexOf('residential-flats-in') > -1) {
      this.fbc_residential();
    } else if (this.router.url.indexOf('fbc') > -1) {
      this.fbc_residential();
    } else if (this.router.url.indexOf('villas-for-sale-in-') > -1) {
      this.Villas();
    } else if (this.router.url.indexOf('plots-in-') > -1) {
      this.Plots();
    } else if (this.router.url.indexOf('home-for-sale-in-') > -1) {
      this.Home();
    } else if (this.router.url.indexOf('upcoming-new-launch-properties/new-projects-in-') > -1) {
      this.Upcoming_new_launch();
    } else if (this.router.url.indexOf('stlc') > -1) {
      this.Stlc();
    } else if (this.router.url.indexOf('btlc') > -1) {
      this.Btlc();
    } else if (this.router.url.indexOf('builder') > -1) {
      this.Builder();
    } else if (this.router.url.indexOf('/status/') > -1) {
      this.Status();
    } else if (this.router.url.indexOf('/zone/') > -1) {
      this.Zone();
    } else if (this.router.url.indexOf('/agricultural-land-for-sale-in-') > -1) {
      this.Agriculture();
    } else if (this.router.url.indexOf('/all-project-walkthrough-videos-in-india') > -1) {
      this.Project();
    } else if (this.router.url.indexOf('/all-project-reviews-in-india') > -1) {
      this.Project();
    } else if (this.router.url.indexOf('/pcv') > -1) {
      this.Project();
    } else if (this.router.url.indexOf('/pclv') > -1) {
      this.Project();
    } else if (this.router.url.indexOf('/pcr') > -1) {
      this.Project();
    } else if (this.router.url.indexOf('/pclr') > -1) {
      this.Project();
    } else if (this.router.url.indexOf('/prd') > -1) {
      this.Project();
    } else if (this.router.url.indexOf('pincode') > -1) {
      this.maincitypage = false;
      this.cityhomepage = false;
      this.readytomoveflats = false;
      this.newprojects = false;
      this.citystatuscombo = false;
      this.citycombo = false;
      this.localitycombo = false;
      this.budgetFlatTrue = false;
      this.residflatsforsale = false;
      this.villas = false;
      this.plots = false;
      this.home = false;
      this.upcoming_new_launch = false;
      this.stlc = false;
      this.btlc = false;
      this.builder = false;
      this.status = false;
      this.zone = false;
      this.agriculture = false;
      this.mainpage = false;
      this.rentpage = false;
      this.projectandvideos = false;
      this.builder_locality = false;
    } else if (this.router.url.indexOf('ifsc') > -1) {
      this.maincitypage = false;
      this.cityhomepage = false;
      this.readytomoveflats = false;
      this.newprojects = false;
      this.citystatuscombo = false;
      this.citycombo = false;
      this.localitycombo = false;
      this.budgetFlatTrue = false;
      this.residflatsforsale = false;
      this.villas = false;
      this.plots = false;
      this.home = false;
      this.upcoming_new_launch = false;
      this.stlc = false;
      this.btlc = false;
      this.builder = false;
      this.status = false;
      this.zone = false;
      this.agriculture = false;
      this.mainpage = false;
      this.rentpage = false;
      this.projectandvideos = false;
      this.builder_locality = false;
    } else if (this.router.url.indexOf('/bplc/') > -1) {
      this.mainpage = false;
      this.rentpage = false;
      this.maincitypage = false;
      this.cityhomepage = false;
      this.readytomoveflats = false;
      this.newprojects = false;
      this.citystatuscombo = false;
      this.citycombo = false;
      this.localitycombo = false;
      this.budgetFlatTrue = false;
      this.residflatsforsale = false;
      this.villas = false;
      this.plots = false;
      this.home = false;
      this.upcoming_new_launch = false;
      this.stlc = false;
      this.btlc = false;
      this.builder = false;
      this.status = false;
      this.zone = false;
      this.agriculture = false;
      this.projectandvideos = false;
      this.builder_locality = true;

      var builderiid = this.router.url.split('-').pop();
      this.builderid = builderiid;
      var value = this.cityservice.cityfinder(this.router.url);
      this.cityid = value.cityid;
      var param = {
        buildid: this.builderid,
        Cityid: this.cityid
      };
      this.Service.getbuildermeta(this.cityname, param).subscribe(metatag => {
        let metatags = metatag['Builderseo'];
        this.buildername = metatags[0].builderInfo_name;
      })

      var builder_loc = {
        cityid: this.cityid,
        builderId: this.builderid,
        statusid: this.projectStatus,
        proptypeid: this.projecttype,
        maxprice: this.minPrice,
        minprice: this.maxPrice,
        bedroom: this.noOfBedrooms,
      }
      this.Service.get_builder_locality(builder_loc).subscribe(Builderlocality => {
        let builderlocality = Builderlocality['builderlocality'];
        this.builderlocality = builderlocality;
      });
    } else if (this.router.url.includes('/rent/') || this.router.url.includes('/rental/') || this.router.url.includes('/rentals/')) {
      this.mainpage = false;
      this.maincitypage = false;
      this.cityhomepage = false;
      this.readytomoveflats = false;
      this.newprojects = false;
      this.citystatuscombo = false;
      this.citycombo = false;
      this.localitycombo = false;
      this.budgetFlatTrue = false;
      this.residflatsforsale = false;
      this.villas = false;
      this.plots = false;
      this.home = false;
      this.upcoming_new_launch = false;
      this.stlc = false;
      this.btlc = false;
      this.builder = false;
      this.status = false;
      this.zone = false;
      this.agriculture = false;
      this.projectandvideos = false;
      this.builder_locality = false;
      this.rentpage = true;
    } else {
      this.mainpage = true;
      this.rentpage = false;
      this.maincitypage = false;
      this.cityhomepage = false;
      this.readytomoveflats = false;
      this.newprojects = false;
      this.citystatuscombo = false;
      this.citycombo = false;
      this.localitycombo = false;
      this.budgetFlatTrue = false;
      this.residflatsforsale = false;
      this.villas = false;
      this.plots = false;
      this.home = false;
      this.upcoming_new_launch = false;
      this.stlc = false;
      this.btlc = false;
      this.builder = false;
      this.status = false;
      this.zone = false;
      this.agriculture = false;
      this.projectandvideos = false;
      this.builder_locality = false;
      $('.Header_part').css('box-shadow', '2px 2px 5px 2px rgba(0, 0, 0, 0.15)');
    }

  }
  ready_new() {
    this.maincitypage = false;
    this.cityhomepage = false;
    // this.readytomoveflats = false;
    // this.newprojects = false;
    this.citystatuscombo = false;
    this.citycombo = false;
    this.localitycombo = false;
    this.budgetFlatTrue = false;
    this.residflatsforsale = false;
    this.villas = false;
    this.plots = false;
    this.home = false;
    this.upcoming_new_launch = false;
    this.stlc = false;
    this.btlc = false;
    this.builder = false;
    this.status = false;
    this.zone = false;
    this.agriculture = false;
    this.mainpage = false;
    this.rentpage = false;
    this.projectandvideos = false;
    this.builder_locality = false;
    var value = this.cityservice.cityfinder(this.router.url);
    this.cityId = value.cityid;
    this.routeSub = this.activeroute.params.subscribe(params => {
      var url = params['status-:propertytype-in-:city'];
      var statusValue = url.split('-')[0];
      if (statusValue === 'ready') {
        this.readytomoveflats = true;
        this.newprojects = false;
        this.statusId = '50307';
        this.proptypeid = '50401';
      } else if (statusValue === 'new') {
        this.newprojects = true;
        this.readytomoveflats = false;
        this.statusId = '50310,50308';
      }
      var status = this.statusId;
      var proptypeid = this.proptypeid;
      var autocomppropparams = {
        cityid: this.cityId,
        statusid: status,
        proptypeid: proptypeid,
      }
      this.Service.getlocalityproperties(autocomppropparams).subscribe(lists => {
        this.localityproperties = lists['autolist'];
      });
    })
  }

  bhk_status_type_locality_city() {
    this.maincitypage = false;
    this.cityhomepage = false;
    this.readytomoveflats = false;
    this.newprojects = false;
    // this.citystatuscombo = false;
    // this.citycombo = false;
    // this.localitycombo = false;
    this.budgetFlatTrue = false;
    this.residflatsforsale = false;
    this.villas = false;
    this.plots = false;
    this.home = false;
    this.upcoming_new_launch = false;
    this.stlc = false;
    this.btlc = false;
    this.builder = false;
    this.status = false;
    this.zone = false;
    this.agriculture = false;
    this.mainpage = false;
    this.rentpage = false;
    this.projectandvideos = false;
    this.builder_locality = false;
    var value = this.cityservice.cityfinder(this.router.url);
    this.cityId = value.cityid;
    this.routeSub = this.activeroute.params.subscribe(params => {
      var url = params['bhk-:ready-to-move-:propertytype-in-:locality-:city-:localityId'];
      if (this.router.url.indexOf('bstc') > -1) {
        this.citystatuscombo = true;
        this.citycombo = false;
        this.localitycombo = false;
        this.projectStatus = '50307';
      } else if (this.router.url.indexOf('btc') > -1) {
        this.citycombo = true;
        this.citystatuscombo = false;
        this.localitycombo = false;
      } else if (this.router.url.indexOf('bstlc') > -1) {
        this.localitycombo = true;
        this.citycombo = false;
        this.citystatuscombo = false;
        this.projectStatus = '50307';
        this.locality = url.split('-').pop();
      }
      var localityId = url.split('-').pop();
      this.localityId = localityId;
      var propertyTypeValue = url.split('-')[5];
      this.property_type = propertyTypeValue;
      var propertyTypeValue = this.property_type;
      this.bhkValue = url.charAt(0);
      this.noOfBedrooms = this.bhkValue;
      this.proptypeid = '50401';
      var cityname = this.currentCity;
      var typeid = this.proptypeid;
      var capsname = cityname;
      this.city = capsname.replace('-', ' ');
      var limitparam = 25;
      var limitprprtyrows = 4;
      var proptypeid = typeid;
      var bedroom = this.noOfBedrooms;
      var loc = this.locality;
      var status = this.projectStatus;

      // this.cityid = value.cityid;
      var autocomppropparams = {
        cityid: this.cityId,
        statusid: status,
        proptypeid: proptypeid,
        bedroom: this.bhkValue,
        locality_id: this.locality
      }
      this.Service.getlocalityproperties(autocomppropparams).subscribe(lists => {
        this.localityproperties = lists['autolist'];
      });
      var paramlocality = {
        locid: localityId,
      };
      // Pradeesh edit
      this.Service.getlocalitymeta(this.city, paramlocality).subscribe(metatag => {
        let metatags = metatag['Localityseo'] || [];
        this.localityName = metatags[0]?.LocalityName || '';
      })
    })
  }

  fbc_residential() {
    this.maincitypage = false;
    this.cityhomepage = false;
    this.readytomoveflats = false;
    this.newprojects = false;
    this.citystatuscombo = false;
    this.citycombo = false;
    this.localitycombo = false;
    // this.budgetFlatTrue = false;
    // this.residflatsforsale = false;    
    this.villas = false;
    this.plots = false;
    this.home = false;
    this.upcoming_new_launch = false;
    this.stlc = false;
    this.btlc = false;
    this.builder = false;
    this.status = false;
    this.zone = false;
    this.agriculture = false;
    this.mainpage = false;
    this.rentpage = false;
    this.projectandvideos = false;
    this.builder_locality = false;
    var value = this.cityservice.cityfinder(this.router.url);
    this.cityname = value.cityname;
    this.cityId = value.cityid;
    var city = this.cityname.toLowerCase();
    var addhyphens = city.replace(' ', '-');
    this.currentCity = value.cityname.replace('-', ' ');
    String.prototype.toLocaleLowerCase = function () {
      return this.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toLowerCase() + txt.substr(1).toLowerCase();
      });
    };

    if (this.router.url.indexOf('residential-flats-in') > -1) {
      this.projecttype = ['50401'];
      this.residflatsforsale = true;
      this.budgetFlatTrue = false;

    }
    else if (this.router.url.indexOf('fbc/flats-for-30-lakhs-in') > -1) {
      this.projecttype = ['50401'];
      this.minPrice = '1';
      this.maxPrice = '4';
      this.budgetFlatTrue = true;
      this.residflatsforsale = false;
    }
    else if (this.router.url.indexOf('/fbc/flats-in-' + addhyphens + '-for-sale-30-lakhs-to-40-lakhs') > -1) {
      this.projecttype = ['50401'];
      this.minPrice = '5';
      this.maxPrice = '6';
      this.budgetFlatTrue = true;
      this.residflatsforsale = false;
    }
    else if (this.router.url.indexOf('/fbc/flats-in-' + addhyphens + '-for-sale-40-lakhs-to-50-lakhs') > -1) {
      this.projecttype = ['50401'];
      this.minPrice = '6';
      this.maxPrice = '7';
      this.budgetFlatTrue = true;
      this.residflatsforsale = false;
    }
    else if (this.router.url.indexOf('/fbc/flats-in-' + addhyphens + '-for-sale-50-lakhs-to-60-lakhs') > -1) {
      this.projecttype = ['50401'];
      this.minPrice = '7';
      this.maxPrice = '8';
      this.budgetFlatTrue = true;
      this.residflatsforsale = false;
    }
    else if (this.router.url.indexOf('/fbc/flats-in-' + addhyphens + '-for-sale-60-lakhs-to-70-lakhs') > -1) {
      this.projecttype = ['50401'];
      this.minPrice = '8';
      this.maxPrice = '9';
      this.budgetFlatTrue = true;
      this.residflatsforsale = false;
    }
    else if (this.router.url.indexOf('/fbc/flats-in-' + addhyphens + '-for-sale-70-lakhs-to-80-lakhs') > -1) {
      this.projecttype = ['50401'];
      this.minPrice = '9';
      this.maxPrice = '10';
      this.budgetFlatTrue = true;
      this.residflatsforsale = false;
    }
    else if (this.router.url.indexOf('/fbc/flats-in-' + addhyphens + '-for-sale-80-lakhs-to-90-lakhs') > -1) {
      this.projecttype = ['50401'];
      this.minPrice = '10';
      this.maxPrice = '11';
      this.budgetFlatTrue = true;
      this.residflatsforsale = false;
    }
    else if (this.router.url.indexOf('/fbc/flats-in-' + addhyphens + '-for-sale-90-lakhs-to-1-crore') > -1) {
      this.projecttype = ['50401'];
      this.minPrice = '11';
      this.maxPrice = '12';
      this.budgetFlatTrue = true;
      this.residflatsforsale = false;
    } else {
      this.budgetFlatTrue = false;
      this.residflatsforsale = false;
    }
    var min = this.minPrice;
    var max = this.maxPrice;
    var locpropparam = {
      proptypeid: this.projecttype,
      cityid: this.cityId,
      minprice: min,
      maxprice: max,
    }
    this.Service.getlocalityproperties(locpropparam).subscribe(lists => {
      this.localityproperties = lists['autolist'];
    });
  }

  Villas() {
    this.maincitypage = false;
    this.cityhomepage = false;
    this.readytomoveflats = false;
    this.newprojects = false;
    this.citystatuscombo = false;
    this.citycombo = false;
    this.localitycombo = false;
    this.budgetFlatTrue = false;
    this.residflatsforsale = false;
    this.villas = true;
    this.plots = false;
    this.home = false;
    this.upcoming_new_launch = false;
    this.stlc = false;
    this.btlc = false;
    this.builder = false;
    this.status = false;
    this.zone = false;
    this.agriculture = false;
    this.mainpage = false;
    this.rentpage = false;
    this.projectandvideos = false;
    this.builder_locality = false;
    var value = this.cityservice.cityfinder(this.router.url);
    this.cityId = value.cityid;
    // this.Service.getAuto(this.cityId).subscribe((myLocalList: any[]) => {
    //   this.autoCompleteData = myLocalList['autolist'];
    // });
    this.projecttype = ['50402'];
    var locpropparam = {
      proptypeid: this.projecttype,
      cityid: this.cityId
    }
    this.Service.getlocalityproperties(locpropparam).subscribe(lists => {
      this.localityproperties = lists['autolist'];
    })
  }

  Plots() {
    this.maincitypage = false;
    this.cityhomepage = false;
    this.readytomoveflats = false;
    this.newprojects = false;
    this.citystatuscombo = false;
    this.citycombo = false;
    this.localitycombo = false;
    this.budgetFlatTrue = false;
    this.residflatsforsale = false;
    this.villas = false;
    this.plots = true;
    this.home = false;
    this.upcoming_new_launch = false;
    this.stlc = false;
    this.btlc = false;
    this.builder = false;
    this.status = false;
    this.zone = false;
    this.agriculture = false;
    this.mainpage = false;
    this.rentpage = false;
    this.projectandvideos = false;
    this.builder_locality = false;
    var value = this.cityservice.cityfinder(this.router.url);
    this.cityId = value.cityid;
    this.projecttype = ['50403'];
    var locpropparam = {
      proptypeid: this.projecttype,
      cityid: this.cityId
    }
    this.Service.getlocalityproperties(locpropparam).subscribe((lists) => {
      this.localityproperties = lists['autolist'];
    }
    );
  }

  Home() {
    this.maincitypage = false;
    this.cityhomepage = false;
    this.readytomoveflats = false;
    this.newprojects = false;
    this.citystatuscombo = false;
    this.citycombo = false;
    this.localitycombo = false;
    this.budgetFlatTrue = false;
    this.residflatsforsale = false;
    this.villas = false;
    this.plots = false;
    this.home = true;
    this.upcoming_new_launch = false;
    this.stlc = false;
    this.btlc = false;
    this.builder = false;
    this.status = false;
    this.zone = false;
    this.agriculture = false;
    this.mainpage = false;
    this.rentpage = false;
    this.projectandvideos = false;
    this.builder_locality = false;
    var value = this.cityservice.cityfinder(this.router.url);
    this.cityId = value.cityid;
    this.projecttype = ['50401', '50402'];
    var locpropparam = {
      proptypeid: this.projecttype,
      cityid: this.cityId
    }
    this.Service.getlocalityproperties(locpropparam).subscribe((lists) => {
      this.localityproperties = lists['autolist'];
    });
  }

  Upcoming_new_launch() {
    this.maincitypage = false;
    this.cityhomepage = false;
    this.readytomoveflats = false;
    this.newprojects = false;
    this.citystatuscombo = false;
    this.citycombo = false;
    this.localitycombo = false;
    this.budgetFlatTrue = false;
    this.residflatsforsale = false;
    this.villas = false;
    this.plots = false;
    this.home = false;
    this.upcoming_new_launch = true;
    this.stlc = false;
    this.btlc = false;
    this.builder = false;
    this.status = false;
    this.zone = false;
    this.agriculture = false;
    this.mainpage = false;
    this.rentpage = false;
    this.projectandvideos = false;
    this.builder_locality = false;
    this.routeSub = this.activeroute.params.subscribe(params => {
      var url = params['new-projects-in-:locality-:city-:localityId'];
      this.locality = url.split('-').pop();
      this.projectStatus = '50310,50308';
      var autocomppropparams = {
        statusid: this.projectStatus,
        locality_id: this.locality,
      }
      this.Service.getlocalityproperties(autocomppropparams).subscribe(lists => {
        this.localityproperties = lists['autolist'];
      });
    })
  }

  Stlc() {
    this.maincitypage = false;
    this.cityhomepage = false;
    this.readytomoveflats = false;
    this.newprojects = false;
    this.citystatuscombo = false;
    this.citycombo = false;
    this.localitycombo = false;
    this.budgetFlatTrue = false;
    this.residflatsforsale = false;
    this.villas = false;
    this.plots = false;
    this.home = false;
    this.upcoming_new_launch = false;
    this.stlc = true;
    this.btlc = false;
    this.builder = false;
    this.status = false;
    this.zone = false;
    this.agriculture = false;
    this.mainpage = false;
    this.rentpage = false;
    this.projectandvideos = false;
    this.builder_locality = false;

    var localityId_1 = this.router.url.split('-').pop();
    var paramlocality = {
      locid: localityId_1,
    };
    this.Service.getlocalitymeta(this.currentCity, paramlocality).subscribe(metatag => {
      let metatags = metatag['Localityseo'];  //gowshik edit//
      this.localityName = metatags[0].LocalityName;
      this.localityName = this.localityName;
    })
    this.routeSub = this.activeroute.params.subscribe(params => {
      var url = params['status-:propertytype-in-:localityname-:city-:localityId'];
      this.localityId = url.split('-').pop();
      var statusId = '50307';
      var proptypeid = '50401';

      var value = this.cityservice.cityfinder(this.router.url);
      this.cityId = value.cityid;
      var autocomppropparams = {
        cityid: this.cityId,
        statusid: statusId,
        proptypeid: proptypeid,
        locality_id: this.localityId
      }
      this.Service.getlocalityproperties(autocomppropparams).subscribe(lists => {
        this.localityproperties = lists['autolist'];
        if ((lists['status']) == 'False') {
          this.localityproperties_hide = false;
        } else {
          this.localityproperties_hide = true;

        }
      })

    });
  }

  Btlc() {
    this.maincitypage = false;
    this.cityhomepage = false;
    this.readytomoveflats = false;
    this.newprojects = false;
    this.citystatuscombo = false;
    this.citycombo = false;
    this.localitycombo = false;
    this.budgetFlatTrue = false;
    this.residflatsforsale = false;
    this.villas = false;
    this.plots = false;
    this.home = false;
    this.upcoming_new_launch = false;
    this.stlc = false;
    this.btlc = true;
    this.builder = false;
    this.status = false;
    this.zone = false;
    this.agriculture = false;
    this.mainpage = false;
    this.rentpage = false;
    this.projectandvideos = false;
    this.builder_locality = false;
    var localityId_1 = this.router.url.split('-').pop();
    var paramlocality = {
      locid: localityId_1,
    };
    this.Service.getlocalitymeta(this.currentCity, paramlocality).subscribe(metatag => {
      let metatags = metatag['Localityseo'];  //gowshik edit//
      this.localityName = metatags[0].LocalityName;
      this.localityName = this.localityName;

      this.routeSub = this.activeroute.params.subscribe(params => {
        var url = params['bhk-:propertytype-in-:locality-:city-:localityId'];
        var propertyTypeValue = url.split('-')[2];
        this.property_type = propertyTypeValue.charAt(0).toLocaleUpperCase() + propertyTypeValue.slice(1);
        // 
        var propertyTypeValue = this.property_type;
        // 
        var bhkValue = url.charAt(0);
        this.noOfBedrooms = bhkValue;
        // 
        this.proptypeurlparam = url;
        var localityId = url.split('-').pop();
        this.localityId = localityId;
        if (propertyTypeValue === 'Flats') {
          this.proptypeid = '50401';
          this.propertytypeid = '50401';
          // this.secondkeyword = 'Apartment';
        } else if (propertyTypeValue === 'Villas') {
          this.proptypeid = '50402';
          this.propertytypeid = '50402';
          // this.secondkeyword = 'Villa';
        }
        // 
        var loc = localityId;
        var bedroom = bhkValue;
        var autocomppropparams = {
          locality_id: loc,
          proptypeid: this.proptypeid,
          bedroom: bedroom
        }
        this.Service.getlocalityproperties(autocomppropparams).subscribe(lists => {
          this.localityproperties = lists['autolist'];
        });
      })
    })
  }

  Builder() {
    this.maincitypage = false;
    this.cityhomepage = false;
    this.readytomoveflats = false;
    this.newprojects = false;
    this.citystatuscombo = false;
    this.citycombo = false;
    this.localitycombo = false;
    this.budgetFlatTrue = false;
    this.residflatsforsale = false;
    this.villas = false;
    this.plots = false;
    this.home = false;
    this.upcoming_new_launch = false;
    this.stlc = false;
    this.btlc = false;
    this.builder = true;
    this.status = false;
    this.zone = false;
    this.agriculture = false;
    this.mainpage = false;
    this.rentpage = false;
    this.projectandvideos = false;
    this.builder_locality = false;
    this.routeSub = this.activeroute.params.subscribe(params => {
      if (this.router.url.indexOf('/builder/') > -1) {
        var cityname = params['cityname'];
        var lasturl = params['buildername-:builderid'];
        this.builderid = lasturl.split('-').pop();
        var idremoved = lasturl.replace('-' + this.builderid, '');
        var buildername = idremoved.replace('-', ' ');
        this.builder = buildername;
      } else if (this.router.url.indexOf('/all-builders-by-city/') > -1) {
        var builderiid = this.router.url.split('/').pop();
        this.builderid = builderiid;
        var value = this.cityservice.cityfinder(this.router.url);
        this.cityId = value.cityid;
      } else {
        var builderiid = this.router.url.split('-').pop();
        this.builderid = builderiid;
        var value = this.cityservice.cityfinder(this.router.url);
        this.cityId = value.cityid;
      }

      // this.builder = buildername;
      this.cityname = cityname;
      var locpropparam = {
        buildid: this.builderid,
        Cityid: this.cityId
      };
      this.Service.getlocalityproperties(locpropparam).subscribe(lists => {
        this.localityproperties = lists['autolist'];
      });
    });
  }

  Status() {
    this.maincitypage = false;
    this.cityhomepage = false;
    this.readytomoveflats = false;
    this.newprojects = false;
    this.citystatuscombo = false;
    this.citycombo = false;
    this.localitycombo = false;
    this.budgetFlatTrue = false;
    this.residflatsforsale = false;
    this.villas = false;
    this.plots = false;
    this.home = false;
    this.upcoming_new_launch = false;
    this.stlc = false;
    this.btlc = false;
    this.builder = false;
    this.zone = false;
    this.agriculture = false;
    this.mainpage = false;
    this.rentpage = false;
    this.projectandvideos = false;
    this.builder_locality = false;
    this.status = true;
    this.routeSub = this.activeroute.params.subscribe(params => {
      var cityname = params['cityname'];
      var url = params['statusname-:statusid'];
      // this.urlparam = url;
      var statid = url.split('-').pop();
      var statusid = statid;
      var value = this.cityservice.cityfinder(this.router.url);
      this.cityId = value.cityid;
      // 
      var locpropparam = {
        statusid: statusid,
        cityid: this.cityId
      }
      this.Service.getlocalityproperties(locpropparam).subscribe(lists => {
        this.localityproperties = lists['autolist'];
      });

      // this.Service.getAuto(this.cityId).subscribe((myLocalList: any[]) => {
      //   this.autoCompleteData = myLocalList['autolist'];
      // });
      //  
      var urlidremoval = url.replace('-' + statid, '');
      var urlhyphenremoval = urlidremoval.replace(/-/g, ' ');
      String.prototype.toLocaleUpperCase = function () {
        return this.replace(/\w\S*/g, function (txt) {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
      };
      var property_status = urlhyphenremoval.toLocaleUpperCase();
      var capsname = cityname.toLocaleUpperCase();
      this.city = capsname.replace('-', ' ');
      this.status_name = property_status;
    });
  }

  Zone() {
    this.maincitypage = false;
    this.cityhomepage = false;
    this.readytomoveflats = false;
    this.newprojects = false;
    this.citystatuscombo = false;
    this.citycombo = false;
    this.localitycombo = false;
    this.budgetFlatTrue = false;
    this.residflatsforsale = false;
    this.villas = false;
    this.plots = false;
    this.home = false;
    this.upcoming_new_launch = false;
    this.stlc = false;
    this.btlc = false;
    this.builder = false;
    this.status = false;
    this.zone = true;
    this.agriculture = false;
    this.mainpage = false;
    this.rentpage = false;
    this.projectandvideos = false;
    this.builder_locality = false;
    this.routeSub = this.activeroute.params.subscribe(params => {
      var cityname = params['cityname'];
      var url = params['zonename-:zoneid'];
      // this.urlparam = url;
      var regionid = url.split('-').pop();
      var idremoval = url.replace('-' + regionid, '');
      var hyphenremoval = idremoval.replace(/-/g, ' ');
      String.prototype.toLocaleUpperCase = function () {
        return this.replace(/\w\S*/g, function (txt) {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
      };
      var value = this.cityservice.cityfinder(this.router.url);
      this.cityId = value.cityid;

      var regionid = url.split('-').pop();
      this.zoneid = regionid;
      this.regionid = regionid;
      // 
      var prop_zone = hyphenremoval.toLocaleUpperCase();
      var capsname = cityname.toLocaleUpperCase();
      this.city = capsname.replace('-', ' ');
      // this.citybreadcrump = cityname;
      this.zones = prop_zone;

      var locpropparam = {
        regionid: this.zoneid,
      }
      this.Service.getlocalityproperties(locpropparam).subscribe(lists => {
        this.localityproperties = lists['autolist'];
      });
      var paramss = {
        cityId: this.cityId,
        regionid: regionid
      };
      this.Service.getlocality(paramss).subscribe(localitys => {
        this.localitys = localitys['details'];
      });
      // this.Service.getAuto(this.cityId).subscribe((myLocalList: any[]) => {
      //   this.autoCompleteData = myLocalList['autolist'];
      // });
    });
  }
  property_typeId: any;
  Agriculture() {
    this.maincitypage = false;
    this.cityhomepage = false;
    this.readytomoveflats = false;
    this.newprojects = false;
    this.citystatuscombo = false;
    this.citycombo = false;
    this.localitycombo = false;
    this.budgetFlatTrue = false;
    this.residflatsforsale = false;
    this.villas = false;
    this.plots = false;
    this.home = false;
    this.upcoming_new_launch = false;
    this.stlc = false;
    this.btlc = false;
    this.builder = false;
    this.status = false;
    this.zone = false;
    this.agriculture = true;
    this.mainpage = false;
    this.rentpage = false;
    this.projectandvideos = false;
    this.builder_locality = false;
    this.routeSub = this.activeroute.params.subscribe(params => {
      var value = this.cityservice.cityfinder(this.router.url);
      this.currentCity = value.cityname;
      this.cityId = value.cityid;
      this.property_typeId = '50405';
      var locpropparam = {
        proptypeid: this.property_typeId,
        cityid: this.cityId
      }
      this.Service.getlocalityproperties(locpropparam).subscribe(lists => {
        this.localityproperties = lists['autolist'];
      });

      // this.Service.getAuto(this.cityId).subscribe((myLocalList: any[]) => {
      //   this.autoCompleteData = myLocalList['autolist'];
      // });

    });
  }

  Project() {
    this.maincitypage = false;
    this.cityhomepage = false;
    this.readytomoveflats = false;
    this.newprojects = false;
    this.citystatuscombo = false;
    this.citycombo = false;
    this.localitycombo = false;
    this.budgetFlatTrue = false;
    this.residflatsforsale = false;
    this.villas = false;
    this.plots = false;
    this.home = false;
    this.upcoming_new_launch = false;
    this.stlc = false;
    this.btlc = false;
    this.builder = false;
    this.status = false;
    this.zone = false;
    this.agriculture = false;
    this.mainpage = false;
    this.rentpage = false;
    this.projectandvideos = true;
    this.builder_locality = false;
  }

  // tran(n) {
  //   $('div[data-page=' + n + ']').removeClass('closed').addClass('open');
  //   $('div.open[data-page!=' + n + ']').removeClass('open').addClass('closed');
  //   // this.currentCitySearchNav = this.Local_Storage .getItem('CityName') .toLocaleLowerCase();
  //   this.citynav = JSON.parse(this.Local_Storage.getItem('CityNames'));
  //   this.selectedLocation = this.SelectCity;
  //   // ))
  //   // this.citiess.sort((a, b) => a.cityname.city.localeCompare(b.cityname.city))
  // }
  username: any;
  UserId: any;

  Login() {
    const loginid = this.Local_Storage.getItem('loginID');
    const username = this.Local_Storage.getItem('userName');
    const userid = this.Local_Storage.getItem('userID');
    // 
    if (loginid == '1') {
      this.userlogin = true;
      this.loginshow = false;
      this.username = username;
      this.UserId = userid;
    }
  }
  showText() {
    const loginid = this.Local_Storage.getItem('loginID');
    if (loginid == '1') {
      if ($('.After_login').css('display') === 'none') {
        $('.After_login').css('display', 'block');
      } else if ($('.After_login').css('display') === 'block') {
        $('.After_login').css('display', 'none');
      }

    } else if (loginid != '1') {
      if ($('.Before_login').css('display') === 'none') {
        $('.Before_login').css('display', 'block');
      } else {
        $('.Before_login').css('display', 'none');
      }

    }
  }
  // Profile(){
  //   this.router.navigate(["/login"])
  //   this.window.location.hash = 'Profile';

  // }
  // Wishlist(){
  //   // this.window.location.hash = 'Wishlist';
  //   this.router.navigate(["/login"])
  // }
  // SeenProjects(){
  //   // this.window.location.hash = 'SeenProjects';
  //   this.router.navigate(["/login"])
  // }

  Logout() {
    this.Local_Storage.clear();
    this.window.location.reload();
  }
  Mousemovement: boolean = false;
  HideMovement: boolean = true;
  Matautocomplete: any;
  loaded = false;
  IsVisible = false;

  viewMoreCities() {
    $('#FirstCityModal').modal('show');
    $('#filterModal').modal('hide');
    $('#SecondCityModal').modal('hide');
    setTimeout(() => {
      if ($('#FirstCityModal').hasClass('show') || $('#filterModal').hasClass('show') || $('#SecondCityModal').hasClass('show')) {
        $('.head_stick').css('display', 'none');
      } else {
        $('.head_stick').css('display', 'block'); // Show again when no modal is open
      }
    }, 300);
  }

  Ejscomponent: any;
  componentloads = false;

  Lazyload() {
    if (this.componentloads == false) {
      this.componentloads = true;
      import('../mat-autocomplete-new/mat-autocomplete-new.module').then(mod => mod.MatAutocompleteNewModule).then(MatAutocompleteNewModule => {
        this.Matautocomplete = MatAutocompleteNewModule.components['lazy'];
      });
    }
  }

  semanticjquery() {
    $('.ui.dropdown').dropdown({});


  }

  clickNavopen() {
    this.doc.getElementById('mySidenavs').style.width = '250px';
    $('body').css('overflow', 'hidden')
  }

  clickNavclose() {
    this.doc.getElementById('mySidenavs').style.width = '0';
    $('body').css('overflow', 'scroll')

  }



  // getlocationlist() {

  // }

  showhide() {
    if ($('#fixed-accordion').css('visibility') == 'hidden')
      $('#fixed-accordion').css('visibility', 'visible');
    else $('#fixed-accordion').css('visibility', 'hidden');
  }

  public displayname(value) {
    if (value) {
      return value.name;
    }
  }

  // Based_On_City_Click

  // getclickAuto(cityid) {
  //   this.Service.getAuto(cityid).subscribe((myLocalList) => {
  //     this.apioptions(myLocalList['autolist']);
  //     this.autoCompleteData = myLocalList['autolist'];
  //   });
  // }

  // Based_On_City_Click

  // Based_On_First_Load
  getAutocomp() {
    this.Service.getlocationlist().subscribe((city) => {
      if ((city['status']) === 'True') {
        this.citiess = city['locations'];
      }
    });

    this.dataService2.getmajorcities().subscribe((majorcity: any[]) => {
      if ((majorcity['status']) === 'True') {
        this.majorcities = majorcity['locations'];
      }
    });

    this.dataService2.getmajorrecentupdatelist().subscribe((recents: any[]) => {
      if ((recents['status']) === 'True') {
        this.uploads = recents['recentproperties'];
      }
    });



    var value = this.cityservice.cityfinder(this.router.url);
    if (value.cityid === undefined) {
      this.currentCity = 'Bangalore'
      this.cityid = '1';
    } else {
      this.cityid = value.cityid;
      this.cityname = value.cityname;
      this.currentCity = value.cityname.replace('-', ' ');
      localStorage.setItem('CityName', this.cityname);

    }

    var param = {
      cityid: this.cityid,
    };
    this.dataService2.getfeaturedprojects(param).subscribe((featur: any[]) => {
      if ((featur['status']) === 'True') {
        this.featured = featur['Featured'];
      }
    });

    this.dataService2.getpriorityprojects(param).subscribe((prior: any[]) => {
      if ((prior['status']) === 'True') {
        this.handpicked = prior['Priority'];
      }
    });

    this.dataService2.gettopprojects(param).subscribe((top: any[]) => {
      if ((top['status']) === 'True') {
        this.topsearch = top['Topprojects'];
      }
    });

    this.Service.getlocalityAuto(this.cityid).subscribe((myLocalList: any[]) => {
      this.autoCompleteData_loc = myLocalList['autolist'];
    });

    this.Service.getlocalityreverseAuto(this.cityid).subscribe((myLocalList: any[]) => {
      this.autoCompleteData_loc_rev = myLocalList['autolist'];
    });

    // this.Service.getbuilderAuto(this.cityid).subscribe((myLocalList: any[]) => {
    //   this.autoCompleteData_build = myLocalList['autolist'];
    // });

    this.Service.getbuilderAuto(this.cityid).subscribe((myLocalList) => {
      this.autoCompleteData_build = myLocalList?.autolist || [];
    });


    // this.dataService2.getnewprojects(param).subscribe((launch: any[]) => {
    //   this.launched = launch['Newprojects'];
    // });

    // this.Service.getAuto(this.cityid).subscribe((myLocalList) => {
    //   this.apioptions(myLocalList['autolist']);
    //   this.autoCompleteData = myLocalList['autolist'];
    // });

    // this.dataService2.gettrendingprojects().subscribe((trend: any[]) => {
    //   this.trending = trend['Trending'];
    // });
  }

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

  // Based_On_First_Load
  // selectedLocation;
  selectEvent(event) {

    var currentCity = event.itemData.city;
    var selected = event.itemData;
    this.onItemSelect(selected);
  }
  onItemSelect(selected) {
    var currentCity = selected.city;
    // this.getProjectsmain(currentCity,selected);
    var cityname = currentCity.toLowerCase().replace(' ', '-');
    if (this.Local_Storage.getItem('CityName') === null) {
      this.currentCity = 'Bangalore';
      this.Local_Storage.setItem('CityName', currentCity);
      this.Local_Storage.setItem('ReraID', '');
      var cityname = currentCity.toLowerCase();
      this.router.navigate([cityname + '/property-sale']);
    } else {
      this.currentCity = this.Local_Storage.getItem("CityName");
      // var cityname = this.currentCity.toLowerCase();
      // this.router.navigate([cityname + '/property-sale'],{ queryParams: { Searches: this.searchstring} });
    }
    // var selectedcity = this.Local_Storage.getItem('CityName');

    if (selected.type == 'builder_name') {
      var buildname = selected.name;
      this.searchstring = buildname;
      var buildername = buildname.replace(/\s+/g, '-').toLowerCase();
      var buildid = selected.id;
      this.Local_Storage.setItem('BuilderName', buildname);
      this.Local_Storage.setItem('BuilderId', buildid);
      // this.cookieService.set('BuilderName', buildername );
      // this.cookieService.set('BuilderId', buildid );
      this.router.navigate([
        cityname + '/builder/' + buildername + '-' + buildid,
      ]);
    } else {
    }
    if (selected.type == 'locality_name') {
      var locname = selected.name;
      this.searchstring = locname;
      var localityname = locname.replace(/\s+/g, '-').toLowerCase();
      var staticlocurl = 'property-sale-in';
      var locid = selected.id;
      this.Local_Storage.setItem('LocalityName', locname);
      this.Local_Storage.setItem('LocalityId', locid);
      // this.cookieService.set('LocalityName', localityname );
      // this.cookieService.set('LocalityId', locid );
      this.router.navigate([
        cityname + '/' + staticlocurl + '-' + localityname + '-' + locid,
      ]);
    } else {
    }
    if (selected.type == 'regions') {
      var zone = selected.name;
      this.searchstring = zone;
      var zonename = zone.replace(/\s+/g, '-').toLowerCase();
      var zoneid = selected.id;
      this.Local_Storage.setItem('Zone', zone);
      this.Local_Storage.setItem('ZoneId', zoneid);
      // this.cookieService.set('Zone', zonename );
      // this.cookieService.set('ZoneId', zoneid );
      this.router.navigate([cityname + '/zone/' + zonename + '-' + zoneid]);
    } else {
    }
    if (selected.type == 'status') {
      var status = selected.name;
      this.searchstring = status;
      var statusname = status.replace(/\s+/g, '-').toLowerCase();
      var statusid = selected.id;
      this.Local_Storage.setItem('Status', status);
      this.Local_Storage.setItem('StatusId', statusid);
      // this.cookieService.set('Status', statusname );
      // this.cookieService.set('StatusId', statusid );
      this.router.navigate([
        cityname + '/status/' + statusname + '-' + statusid,
      ]);
    } else {
    }
    if (selected.type == 'PropType') {
      var propertytype = selected.name;
      this.searchstring = propertytype;
      var proptype = propertytype.replace(/\s+/g, '-').toLowerCase();
      var proptypeid = selected.id;
      this.Local_Storage.setItem('PropType', propertytype);
      this.Local_Storage.setItem('ProptypeId', proptypeid);
      // this.cookieService.set('PropType', proptype );
      // this.cookieService.set('ProptypeId', proptypeid );
      this.router.navigate([cityname + '/sale/' + proptype + '-' + proptypeid]);
    } else {
    }
    if (selected.type == 'reraId') {
      var reraid = selected.id;
      this.searchstring = reraid;
      this.Local_Storage.setItem('ReraID', reraid);
      // this.cookieService.set('ReraID', reraid );
      this.router.navigate([cityname + '/property-sale']);
    } else {
    }
    if (selected.type == 'property_name') {
      var propname = selected.name;
      this.searchstring = propname;
      var propurlname = propname.replace(/\s+/g, '-').toLowerCase();
      var propid = selected.id;
      var proplocality = selected.locality;
      var locurlname = proplocality.replace(/\s+/g, '-').toLowerCase();
      this.router.navigate([]).then((result) => {
        this.window.open(
          '/property/' +
          cityname +
          '/' +
          locurlname +
          '/' +
          propurlname +
          '-' +
          propid,
          '_blank'
        );
      });
    } else {
    }
  }

  getProjectsmain(currentCity, selected) {
    this.currentCity = this.Local_Storage.getItem('CityName');
    var cityname = this.currentCity.toLowerCase().replace(' ', '-');
    this.router.navigate([cityname + '/property-sale'], {
      queryParams: { Searches: this.searchstring },
    });
  }

  closeAndroidApp() {
    $('#Headerrentel').removeClass('main_banner_div');
    $('#HeaderId').removeClass('main_banner_div');
    $('.androidApp').css('display', 'none');
    $('.city_search_filter').css('margin', '60px 0 0 0');
    $('.body_color').css('margin', '-50px 0 0 0');
    $('.cityhome').css('margin', '44px 0 0 0');
    $('.card-headerr').css('margin', '58px 0 0 0');
    $('.topbarcolor').css('margin', '58px 0 0 0');
    $('.innerheader_top').css('margin', '39px 0 0 0');
    $('.pageBackground').css('margin-top', '18px');
    $('#conatctbutton').css('margin-top', '58px');
    $('.main_div').css('margin-top', '58px');
    $('#blog_section').css('margin-top', '0');
    $('#testimonial_section').css('margin-top', '58px');
    $('.mainDivAboutUs').css('margin-top', '58px');
    $('.about_us_banner').css('margin-top', '49px');
    $('.breadcrumbsection_del').css('margin-top', '42px');
  }

  applinkClick() {
    this.window.location.hash = 'AppInstallLink';
    this.window.location.href = 'https://play.google.com/store/apps/details?id=vsnap.homes247.in&showAllReviews=true';
  }
}
