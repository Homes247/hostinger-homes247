import { Component, ElementRef, HostListener, OnInit, ViewChild, PLATFORM_ID, Inject, AfterViewInit } from '@angular/core';
import { DOCUMENT, CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { SafeStorageService } from '../safe-storage.service';
import { cleanUrlPipe, MyBHKPipe } from '../mainpipe-pipe';
import { isPlatformBrowser } from '@angular/common';



// Services
import { CityService } from '../city.service';
import { DataService } from '../data.service';
import { DataService2 } from '../data.service2';

declare var $: any;

@Component({
  selector: 'app-inner-header',
  imports: [CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule, cleanUrlPipe, MyBHKPipe],
  templateUrl: './inner-header.html',
  styleUrl: './inner-header.css',
})
export class InnerHeader  {

  @ViewChild('scrollapiloader') scrollapiloader: ElementRef;
  userlogin = false;
  loginshow = true;
  sammy: boolean = true

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
  currentCity: string = '';
  testli_data: any[] = [];
  testLi2_data: any[] = [];
  showCities = false;
  RecentCityStorage = [];

  cityyy: any;
  citynav: any;
  countryExist: any;
  recenthide = false;
  citiesss: any;
  SelectCity = 'Select City';
  topnewdivreached = false;

  public localityproperties: { [key: string]: Object }[] = [];
  public autoCompleteData_loc: { [key: string]: Object }[] = [];
  public autoCompleteData_loc_rev: { [key: string]: Object }[] = [];
  public autoCompleteData_build: { [key: string]: Object }[] = [];

  public fields: Object = { groupBy: 'title', value: 'name' };
  public text: string = 'Enter a location';
  public highlight: Boolean = true;
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
  window!: Window;

  constructor(
    public Service: DataService,
    private router: Router,
    private dataService2: DataService2,
    public cityservice: CityService,
    private activeroute: ActivatedRoute,
    @Inject(DOCUMENT) private doc: Document,
    private storage: SafeStorageService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.window = this.doc.defaultView!;
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
        var value = this.cityservice.cityfinder(this.router.url);
      this.cityid = value.cityid;
      
    const loginid = this.storage.getItem('loginID');
    this.loginidNew = loginid

  }

  ngAfterViewInit() {

        if (isPlatformBrowser(this.platformId)) {
      this.getAutocomp();
      this.PageIndex();
      this.Login();
      this.semanticjquery();
      this.showText()

      if (this.router.url.indexOf('/careers') > -1) {
        if (isPlatformBrowser(this.platformId)) {
          $('.head_sticky').css('display', 'none');
          $('.head_sticky1').css('display', 'flex');
          $('#mySidenavs').addClass('sidenav1');
          $('#mySidenavs').removeClass('sidenav');
        }

      } else {
        if (isPlatformBrowser(this.platformId)) {
          $('.head_sticky').css('display', 'block');
          $('.head_sticky1').css('display', 'none');
          $('#mySidenavs').addClass('sidenav');
          $('#mySidenavs').removeClass('sidenav1');
        }

      }
      if (isPlatformBrowser(this.platformId)) {
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
    }
    if (isPlatformBrowser(this.platformId)) {
      this.headerEl = document.querySelector('.Header_part') as HTMLElement;
      this.fixedSectionEl = document.querySelector('.fixed_section_main') as HTMLElement;
      this.hideFilterEl = document.getElementById('hidefilter');
    }


    // alert("here")
    // this.headerEl = document.querySelector('.Header_part') as HTMLElement;
    // this.fixedSectionEl = document.querySelector('.fixed_section_main') as HTMLElement;
    // this.hideFilterEl = document.getElementById('hidefilter');

    // if (isPlatformBrowser(this.platformId)) {


    //   const link = document.createElement('link');
    //   link.rel = 'preload';
    //   link.as = 'style';
    //   link.href =
    //     'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css';

    //   link.onload = () => {
    //     link.rel = 'stylesheet';
    //   };

    //   document.head.appendChild(link);

    // }
  }

  // @HostListener('window:scroll', [])
  // onWindowScroll() {
  //   const scrollTop = window.scrollY || 0;
  //   const header = document.querySelector('.Header_part') as HTMLElement;


  //   if (scrollTop > 55) {
  //     // alert('hi')
  //     this.fixHeader(true);
  //     header.style.position = 'fixed';
  //   } else {
  //     // console.log('hello')

  //     this.fixHeader(false);
  //     header.style.position = 'sticky';
  //   }

  //   if (scrollTop > 250) {
  //     this.toggleClass('refer_li', true);
  //     this.toggleClass('top_right', true);
  //     this.toggleBurger(false);
  //   } else {
  //     this.toggleClass('refer_li', false);
  //     this.toggleClass('top_right', false);
  //     this.toggleBurger(true);
  //   }



  //   if (!this.sammy) {
  //     if (isPlatformBrowser(this.platformId)) {
  //       $('.Header_part').css('position', 'fixed', 'important');
  //     }
  //   }
  // }
  // Cache elements as class properties
  private headerEl: HTMLElement | null = null;
  private fixedSectionEl: HTMLElement | null = null;
  private hideFilterEl: HTMLElement | null = null;
  private ticking = false;

  // ngAfterViewInit() {
  //   // Query DOM once, not on every scroll
  //   this.headerEl = document.querySelector('.Header_part') as HTMLElement;
  //   this.fixedSectionEl = document.querySelector('.fixed_section_main') as HTMLElement;
  //   this.hideFilterEl = document.getElementById('hidefilter');
  // }

  private fixHeader(fix: boolean) {
    this.headerEl = document.querySelector('.Header_part') as HTMLElement;
    if (!isPlatformBrowser(this.platformId) || !this.headerEl) return;

    if (fix) {
    
      this.headerEl.style.position = 'fixed';
      this.headerEl.style.top = '0';
      this.headerEl.style.boxShadow = '2px 2px 5px 2px rgba(0,0,0,0.08)';
      this.fixedSectionEl?.classList.add('fixed_search');
      if (this.fixedSectionEl) this.fixedSectionEl.style.display = 'block';
      this.hideFilterEl?.classList.add('hidefilter');
    } else {
    

      this.headerEl.style.position = this.sammy ? 'sticky' : 'fixed';
      this.headerEl.style.boxShadow = 'none';
      if (this.fixedSectionEl) this.fixedSectionEl.style.display = 'none';
      this.hideFilterEl?.classList.remove('hidefilter');
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Bail out if already waiting for next frame
    if (this.ticking) return;

    this.ticking = true;
    requestAnimationFrame(() => {
      const scrollTop = window.scrollY || 0;

      if (scrollTop > 55) {
        this.fixHeader(true);
       
        
      } else {
        this.fixHeader(false);
        if (this.headerEl) this.headerEl.style.position = 'sticky';
        
        

      }

      if (scrollTop > 250) {
        this.toggleClass('refer_li', true);
        this.toggleClass('top_right', true);
        this.toggleBurger(false);
      } else {
        this.toggleClass('refer_li', false);
        this.toggleClass('top_right', false);
        this.toggleBurger(true);
      }

      if (!this.sammy && this.headerEl) {
        this.headerEl.style.position = 'fixed';
      }

      this.ticking = false;
    });
  }

  private toggleClass(id: string, isScrolled: boolean) {
    if (isPlatformBrowser(this.platformId)) {
      const el = document.getElementById(id);
      if (!el) return;
      if (id === 'refer_li') {
        el.classList.toggle('scroll_offer', isScrolled);
        el.classList.toggle('refer_earn', !isScrolled);
      }

      if (id === 'top_right') {
        el.classList.toggle('top_row_right', isScrolled);
        el.classList.toggle('top_row_right2', !isScrolled);
      }
    }

  }

  private toggleBurger(showWhite: boolean) {
    if (isPlatformBrowser(this.platformId)) {
      const white = document.getElementById('brgr_white');
      const ash = document.getElementById('brgr_ash');
      if (white && ash) {
        white.style.display = showWhite ? 'block' : 'none';
        ash.style.display = showWhite ? 'none' : 'block';
      }
    }

  }
  preventHideFilter = false;
  // private fixHeader(fix: boolean) {
  //   if (isPlatformBrowser(this.platformId)) {
  //     const header = document.querySelector('.Header_part') as HTMLElement;
  //     const fixedSection = document.querySelector('.fixed_section_main') as HTMLElement;
  //     const hideFilter = document.getElementById('hidefilter');

  //     if (!header) return;

  //     if (fix) {
  //       alert("here")
  //       header.style.position = 'fixed';
  //       header.style.top = '0';
  //       header.style.boxShadow = '2px 2px 5px 2px rgba(0,0,0,0.08)';
  //       fixedSection?.classList.add('fixed_search');
  //       fixedSection && (fixedSection.style.display = 'block');
  //       hideFilter?.classList.add('hidefilter');
  //     } else {
  //       if (this.sammy) {
  //         header.style.position = 'sticky';;
  //       }
  //       header.style.boxShadow = 'none';
  //       fixedSection && (fixedSection.style.display = 'none');
  //       hideFilter?.classList.remove('hidefilter');
  //     }
  //   }
  // }

  Modalopen() {
    if (isPlatformBrowser(this.platformId)) {
      $('#FirstCityModal').modal('hide');
      $('#filterModal').modal('hide');
    }
    setTimeout(() => {
      if (isPlatformBrowser(this.platformId)) {
        if ($('#FirstCityModal').hasClass('show') || $('#filterModal').hasClass('show') || $('#SecondCityModal').hasClass('show')) {
          // $('.head_stick').css('display', 'none');
        } else {
          $('.head_stick').css('display', 'block');
        }
        $('.modal-backdrop').removeClass('modal-backdrop fade show');
      }

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
    } else if (this.router.url.indexOf('pincode') > -1 || this.router.url.indexOf('ifsc') > -1) {
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
      var param = { buildid: this.builderid, Cityid: this.cityid };
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
      if (isPlatformBrowser(this.platformId)) {
        $('.Header_part').css('box-shadow', '2px 2px 5px 2px rgba(0, 0, 0, 0.15)');
      }
    }
  }

  ready_new() {
    this.maincitypage = false;
    this.cityhomepage = false;
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
      this.bhkValue = url.charAt(0);
      this.noOfBedrooms = this.bhkValue;
      this.proptypeid = '50401';
      var cityname = this.currentCity;
      this.city = cityname?.replace('-', ' ');

      var autocomppropparams = {
        cityid: this.cityId,
        statusid: this.projectStatus,
        proptypeid: this.proptypeid,
        bedroom: this.bhkValue,
        locality_id: this.locality
      }
      this.Service.getlocalityproperties(autocomppropparams).subscribe(lists => {
        this.localityproperties = lists['autolist'];
      });
      var paramlocality = { locid: localityId };
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
    var addhyphens = city?.replace(' ', '-');
    this.currentCity = value?.cityname?.replace('-', ' ');

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

    var locpropparam = {
      proptypeid: this.projecttype,
      cityid: this.cityId,
      minprice: this.minPrice,
      maxprice: this.maxPrice,
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
    this.projecttype = ['50402'];
    var locpropparam = { proptypeid: this.projecttype, cityid: this.cityId }
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
    var locpropparam = { proptypeid: this.projecttype, cityid: this.cityId }
    this.Service.getlocalityproperties(locpropparam).subscribe((lists) => {
      this.localityproperties = lists['autolist'];
    });
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
    var locpropparam = { proptypeid: this.projecttype, cityid: this.cityId }
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
      var autocomppropparams = { statusid: this.projectStatus, locality_id: this.locality }
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
    var paramlocality = { locid: localityId_1 };
    this.Service.getlocalitymeta(this.currentCity, paramlocality).subscribe(metatag => {
      let metatags = metatag['Localityseo'];
      this.localityName = metatags[0].LocalityName;
    })
    this.routeSub = this.activeroute.params.subscribe(params => {
      var url = params['status-:propertytype-in-:localityname-:city-:localityId'];
      this.localityId = url.split('-').pop();
      var value = this.cityservice.cityfinder(this.router.url);
      this.cityId = value.cityid;
      var autocomppropparams = {
        cityid: this.cityId,
        statusid: '50307',
        proptypeid: '50401',
        locality_id: this.localityId
      }
      this.Service.getlocalityproperties(autocomppropparams).subscribe(lists => {
        this.localityproperties = lists['autolist'];
        this.localityproperties_hide = (lists['status'] !== 'False');
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
    var paramlocality = { locid: localityId_1 };
    this.Service.getlocalitymeta(this.currentCity, paramlocality).subscribe(metatag => {
      let metatags = metatag['Localityseo'];
      this.localityName = metatags[0].LocalityName;

      this.routeSub = this.activeroute.params.subscribe(params => {
        var url = params['bhk-:propertytype-in-:locality-:city-:localityId'];
        var propertyTypeValue = url.split('-')[2];
        this.property_type = propertyTypeValue.charAt(0).toUpperCase() + propertyTypeValue.slice(1);
        this.noOfBedrooms = url.charAt(0);
        this.proptypeurlparam = url;
        var localityId = url.split('-').pop();
        this.localityId = localityId;

        if (this.property_type === 'Flats') {
          this.proptypeid = '50401';
          this.propertytypeid = '50401';
        } else if (this.property_type === 'Villas') {
          this.proptypeid = '50402';
          this.propertytypeid = '50402';
        }

        var autocomppropparams = {
          locality_id: localityId,
          proptypeid: this.proptypeid,
          bedroom: this.noOfBedrooms
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
        this.builder = idremoved.replace('-', ' ');
      } else {
        this.builderid = this.router.url.split('/').pop()?.split('-').pop();
        var value = this.cityservice.cityfinder(this.router.url);
        this.cityId = value.cityid;
      }

      var locpropparam = { buildid: this.builderid, Cityid: this.cityId };
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
      var statusid = url.split('-').pop();
      var value = this.cityservice.cityfinder(this.router.url);
      this.cityId = value.cityid;

      var locpropparam = { statusid: statusid, cityid: this.cityId }
      this.Service.getlocalityproperties(locpropparam).subscribe(lists => {
        this.localityproperties = lists['autolist'];
      });

      var urlidremoval = url.replace('-' + statusid, '');
      this.status_name = urlidremoval.replace(/-/g, ' ').toUpperCase();
      this.city = cityname?.toUpperCase().replace('-', ' ');
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
      var regionid = url.split('-').pop();
      var idremoval = url.replace('-' + regionid, '');
      var value = this.cityservice.cityfinder(this.router.url);
      this.cityId = value.cityid;

      this.zoneid = regionid;
      this.regionid = regionid;
      this.zones = idremoval.replace(/-/g, ' ').toUpperCase();
      this.city = cityname?.toUpperCase().replace('-', ' ');

      var locpropparam = { regionid: this.zoneid };
      this.Service.getlocalityproperties(locpropparam).subscribe(lists => {
        this.localityproperties = lists['autolist'];
      });
      this.Service.getlocality({ cityId: this.cityId, regionid: regionid }).subscribe(localitys => {
        this.localitys = localitys['details'];
      });
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
      var locpropparam = { proptypeid: this.property_typeId, cityid: this.cityId }
      this.Service.getlocalityproperties(locpropparam).subscribe(lists => {
        this.localityproperties = lists['autolist'];
      });
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

  username: any;
  UserId: any;

  Login() {
    const loginid = this.storage.getItem('loginID');
    const username = this.storage.getItem('userName');
    const userid = this.storage.getItem('userID');
    if (loginid == '1') {
      this.userlogin = true;
      this.loginshow = false;
      this.username = username;
      this.UserId = userid;
    }
  }

  loginidNew: any
  showText() {
    const loginid = this.storage.getItem('loginID');
    this.loginidNew = loginid
    if (isPlatformBrowser(this.platformId)) {
      if (loginid == '1') {
        $('.After_login').toggle();
      } else {
        $('.Before_login').toggle();
      }
    }
  }

  Logout() {
    this.storage.clear();
    this.window.location.reload();
  }

  Mousemovement: boolean = false;
  HideMovement: boolean = true;
  Matautocomplete: any;
  loaded = false;
  IsVisible = false;

  viewMoreCities() {
    if (isPlatformBrowser(this.platformId)) {
      $('#FirstCityModal').modal('show');
      $('#filterModal').modal('hide');
      $('#SecondCityModal').modal('hide');
    }
    setTimeout(() => {
      if (isPlatformBrowser(this.platformId)) {
        if ($('#FirstCityModal').hasClass('show') || $('#filterModal').hasClass('show') || $('#SecondCityModal').hasClass('show')) {
          $('.head_stick').css('display', 'none');
        } else {
          $('.head_stick').css('display', 'block');
        }
      }
    }, 300);
  }

  componentloads = false;
  Lazyload() {
    if (this.componentloads == false) {
      this.componentloads = true;
      // In standalone, logic for lazy loading dynamic modules usually shifts to 
      // routes, but keeping your original flow here:
      import('../mat-autocomplete-new/mat-autocomplete-new')
        .then(c => {
          this.Matautocomplete = c.MatAutocompleteNew;
        });
    }
  }

  semanticjquery() {
    if (isPlatformBrowser(this.platformId)) {
      $('.ui.dropdown').dropdown({});
    }
  }

  clickNavopen() {
    if (isPlatformBrowser(this.platformId)) {
      this.doc.getElementById('mySidenavs')!.style.width = '250px';
      $('body').css('overflow', 'hidden')
    }
  }

  clickNavclose() {
    if (isPlatformBrowser(this.platformId)) {
      this.doc.getElementById('mySidenavs')!.style.width = '0';
      $('body').css('overflow', 'scroll')
    }
  }

  showhide() {
    if (isPlatformBrowser(this.platformId)) {
      if ($('#fixed-accordion').css('visibility') == 'hidden')
        $('#fixed-accordion').css('visibility', 'visible');
      else $('#fixed-accordion').css('visibility', 'hidden');
    }
  }

  public displayname(value) {
    if (value) return value.name;
  }

  getAutocomp() {
    this.Service.getlocationlist().subscribe((city) => {
      if ((city['status']) === 'True') this.citiess = city['locations'];
    });

    this.dataService2.getmajorcities().subscribe((majorcity: any[]) => {
      if ((majorcity['status']) === 'True') this.majorcities = majorcity['locations'];
    });

    this.dataService2.getmajorrecentupdatelist().subscribe((recents: any[]) => {
      if ((recents['status']) === 'True') this.uploads = recents['recentproperties'];
    });

    Promise.resolve().then(() => {
      var value = this.cityservice.cityfinder(this.router.url);

      if (value.cityid === undefined) {
        this.currentCity = 'Bangalore';
        this.cityid = '1';
      } else {
        this.cityid = value.cityid;
        this.cityname = value?.cityname;
        this.currentCity = value.cityname?.replace('-', ' ');
        this.storage.setItem('CityName', this.cityname);
      }
    });

    var param = { cityid: this.cityid };
    // this.dataService2.getfeaturedprojects(param).subscribe((featur: any[]) => {
    //   if ((featur['status']) === 'True') this.featured = featur['Featured'];
    // });
    this.dataService2.getfeaturedprojects(param)
      .subscribe((res: any) => {
        if (res?.status === 'True') {
          this.featured = res.Featured || [];
        }
      });

    // this.dataService2.getpriorityprojects(param).subscribe((prior: any[]) => {
    //   if ((prior['status']) === 'True') this.handpicked = prior['Priority'];
    // });
    this.dataService2.getpriorityprojects(param)
      .subscribe((res: any) => {
        if (res?.status === 'True') {
          this.handpicked = res.Priority || [];
        }
      });

    // this.dataService2.gettopprojects(param).subscribe((top: any[]) => {
    //   if ((top['status']) === 'True') this.topsearch = top['Topprojects'];
    // });
    this.dataService2.gettopprojects(param)
      .subscribe((res: any) => {
        if (res?.status === 'True') {
          this.topsearch = res.Topprojects || [];
        }
      });

    // this.Service.getlocalityAuto(this.cityid).subscribe((myLocalList: any[]) => {
    //   this.autoCompleteData_loc = myLocalList['autolist'];
    // });

    this.Service.getlocalityAuto(this.cityid)
      .subscribe((res: any) => {
        this.autoCompleteData_loc = res?.autolist || [];
      });

    // this.Service.getlocalityreverseAuto(this.cityid).subscribe((myLocalList: any[]) => {
    //   this.autoCompleteData_loc_rev = myLocalList['autolist'];
    // });

    this.Service.getlocalityreverseAuto(this.cityid)
      .subscribe((res: any) => {
        this.autoCompleteData_loc_rev = res?.autolist || [];
      });

    // this.Service.getbuilderAuto(this.cityid).subscribe((myLocalList) => {
    //   this.autoCompleteData_build = myLocalList?.autolist || [];
    // });

    this.Service.getbuilderAuto(this.cityid)
      .subscribe((res: any) => {
        this.autoCompleteData_build = res?.autolist || [];
      });
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

  selectEvent(event) {
    var selected = event.itemData;
    this.onItemSelect(selected);
  }

  onItemSelect(selected) {
    var currentCity = selected.city;
    var cityname = currentCity?.toLowerCase().replace(' ', '-');
    if (this.storage.getItem('CityName') === null) {
      this.currentCity = 'Bangalore';
      this.storage.setItem('CityName', currentCity);
      this.storage.setItem('ReraID', '');
      this.router.navigate([currentCity.toLowerCase() + '/property-sale']);
    } else {
      this.currentCity = this.storage.getItem("CityName");
    }

    if (selected.type == 'builder_name') {
      var buildname = selected.name;
      this.searchstring = buildname;
      var buildername = buildname.replace(/\s+/g, '-').toLowerCase();
      this.storage.setItem('BuilderName', buildname);
      this.storage.setItem('BuilderId', selected.id);
      this.router.navigate([cityname + '/builder/' + buildername + '-' + selected.id]);
    }
    else if (selected.type == 'locality_name') {
      var locname = selected.name;
      this.searchstring = locname;
      var localityname = locname.replace(/\s+/g, '-').toLowerCase();
      this.storage.setItem('LocalityName', locname);
      this.storage.setItem('LocalityId', selected.id);
      this.router.navigate([cityname + '/property-sale-in-' + localityname + '-' + selected.id]);
    }
    else if (selected.type == 'regions') {
      var zonename = selected.name.replace(/\s+/g, '-').toLowerCase();
      this.storage.setItem('Zone', selected.name);
      this.storage.setItem('ZoneId', selected.id);
      this.router.navigate([cityname + '/zone/' + zonename + '-' + selected.id]);
    }
    else if (selected.type == 'status') {
      var statusname = selected.name.replace(/\s+/g, '-').toLowerCase();
      this.storage.setItem('Status', selected.name);
      this.storage.setItem('StatusId', selected.id);
      this.router.navigate([cityname + '/status/' + statusname + '-' + selected.id]);
    }
    else if (selected.type == 'PropType') {
      var proptype = selected.name.replace(/\s+/g, '-').toLowerCase();
      this.storage.setItem('PropType', selected.name);
      this.storage.setItem('ProptypeId', selected.id);
      this.router.navigate([cityname + '/sale/' + proptype + '-' + selected.id]);
    }
    else if (selected.type == 'reraId') {
      this.storage.setItem('ReraID', selected.id);
      this.router.navigate([cityname + '/property-sale']);
    }
    else if (selected.type == 'property_name') {
      var propurlname = selected.name.replace(/\s+/g, '-').toLowerCase();
      var locurlname = selected.locality.replace(/\s+/g, '-').toLowerCase();
      this.window.open('/property/' + cityname + '/' + locurlname + '/' + propurlname + '-' + selected.id, '_blank');
    }
  }

  getProjectsmain(currentCity, selected) {
    this.currentCity = this.storage.getItem('CityName');
    var cityname = this.currentCity?.toLowerCase().replace(' ', '-');
    this.router.navigate([cityname + '/property-sale'], { queryParams: { Searches: this.searchstring } });
  }

  closeAndroidApp() {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        $('.Header_part').css('position', 'fixed', 'important');
      }, 100);
      this.sammy = false
      // $('#Headerrentel').removeClass('main_banner_div');
      $('#HeaderId').removeClass('main_banner_div');
      $('.androidApp').css('display', 'none');
      $('.city_search_filter').css('margin', '68px 0 0 0');
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
      $('.breadcrumbsection_del').css('margin-top', '60px');
      $('.breadcrumbsection').css('margin-top', '64px');
      $('.topMarginBreadCrumb').css('height', '60px');
      $('.topMarginBreadCrumb1').css('height', '0px');

      
    }


  }

  applinkClick() {
    this.window.location.hash = 'AppInstallLink';
    this.window.location.href = 'https://play.google.com/store/apps/details?id=vsnap.homes247.in&showAllReviews=true';
  }
}
