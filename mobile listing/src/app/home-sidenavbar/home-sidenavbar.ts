import { Component, HostListener, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';

import { DataService } from '../data.service';
import { CityService } from '../city.service';
import { DataService2 } from '../data.service2';
import { FilterService } from '../filter.service';

// NOTE: Import your custom pipes here so the standalone component can use them in the template.
import { cleanUrlPipe, MyBHKPipe } from '../mainpipe-pipe';

declare var $: any;
@Component({
  selector: 'app-home-sidenavbar',
  imports: [CommonModule, RouterModule, cleanUrlPipe, MyBHKPipe],
  templateUrl: './home-sidenavbar.html',
  styleUrl: './home-sidenavbar.css',
})
export class HomeSidenavbar implements OnInit {
  constructor(
    private Service: DataService,
    public cityservice: CityService,
    private router: Router,
    private activeroute: ActivatedRoute,
    private dataService2: DataService2,
    public Filter: FilterService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) { }

  currentCity: any = 'bangalore';
  cityid: any = '1';
  public localityproperties: Object[] = [];
  public autoCompleteData_loc: Object[] = [];
  public autoCompleteData_loc_rev: Object[] = [];
  public autoCompleteData_build: Object[] = [];
  uploads: any;
  citiess: any;
  homeMainPage = true
  maincitypage = false;
  cityhomepage = false;
  newlaunchprojects: any;
  private routeSub: Subscription;
  cityId: string;
  localitycombo = false;
  citycombo = false;
  citystatuscombo = false;
  localname: any;
  cityname: string;
  readytomoveflats = false;
  newprojects = false;
  localityproperties_hide = false;
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
  residflatsforsale = false;
  budgetFlatTrue = false;
  villas = false;
  plots = false;
  home = false;
  stlc = false;
  btlc = false;
  upcoming_new_launch = false;
  status = false;
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
  zone = false;
  mainpage = false;
  agriculture = false;
  rentpage = false;
  projectandvideos = false;
  builder_locality = false;
  currentCity2: string;
  majorcities: any;
  builderid: any;
  forCareers = false;
  buildername: any;
  builderlocality: any;
  userName: any;
  userID: any;

  LoginId: any;
  profileDropDownOpen;
  imageUrls;
  buyProperty: boolean = false;
  rentProperty: boolean = false;
  commercialProperty: boolean = false;
  pgProperty: boolean = false;
  Matautocomplete: any;
  notSmartPropertyFinder: any = true

  ngOnInit(): void {

    if (this.router.url?.indexOf('/smart-property-finder') > -1) {
      this.notSmartPropertyFinder = false
    } else {
      this.notSmartPropertyFinder = true
    }

    this.userID = localStorage?.getItem('userID');
    this.userName = localStorage?.getItem('userName');
    this.LoginId = localStorage?.getItem('loginID');

    if (this.LoginId == null) {
      this.profileDropDownOpen = true;
    } else if (this.LoginId == '1') {
      this.profileDropDownOpen = false;
    }

    this.subSideNavBarContents();

    import('../mat-autocomplete-new/mat-autocomplete-new')
      .then(c => {
        this.Matautocomplete = c.MatAutocompleteNew;
      });
  }
  ProfileImage: string = '';

  dataloads() {
    this.ProfileImage = 'https://img-mb.homes247.in/images/userprofile/';
  }

  featured: any
  handpicked: any
  topsearch: any
  subSideNavBarContents() {
    window.onclick = (event) => {
      this.LoginId = localStorage?.getItem('loginID');
      this.userID = localStorage?.getItem('userID');
      this.userName = localStorage?.getItem('userName');


      if (this.LoginId == null) {
        this.profileDropDownOpen = true;
      } else if (this.LoginId == '1') {
        this.profileDropDownOpen = false;
      }
    };

    this.Service.getlocationlist().subscribe((city) => {
      if (city['status'] === 'True') {
        this.citiess = city['locations'];
      }
    });

    var value = this.cityservice.cityfinder(this.router.url);
    var cityid = value.cityid;
    this.cityid = cityid;
    if (cityid != undefined) {
      this.cityid = cityid;
    } else {
      this.cityid = '1';
    }

    var currentCity = value.cityname?.replace('-', ' ');
    if (currentCity != undefined) {
      this.currentCity = currentCity;
    } else {
      this.currentCity = 'bangalore';
    }
    var param = {
      cityid: this.cityid,
    };

    this.dataService2.getmajorcities().subscribe((majorcity: any[]) => {
      if ((majorcity['status']) === 'True') {
        this.majorcities = majorcity['locations'];
        // console.log(this.majorcities);

      }
    });

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


    this.Service.getlocalityreverseAuto(this.cityid).subscribe(
      (myLocalList: any[]) => {
        this.autoCompleteData_loc_rev = myLocalList['autolist'];
      },
    );

    this.Service.getlocalityAuto(this.cityid).subscribe(
      (myLocalList: any[]) => {
        this.autoCompleteData_loc = myLocalList['autolist'];
      },
    );

    this.dataService2.getmajorrecentupdatelist().subscribe((recents: any[]) => {
      if (recents['status'] === 'True') {
        this.uploads = recents['recentproperties'];
      }
    });

    this.Service.getbuilderAuto(this.cityid).subscribe((myLocalList: any[]) => {
      this.autoCompleteData_build = myLocalList['autolist'];
    });

    if (this.LoginId != null) {
      this.Service.userseenprojects(this.userID).subscribe((response) => {
        const projects = response['recent_view'] || [];
        this.UserSeenLength = projects.length;
      });
      this.Service.getContactedProjects(this.userID).subscribe((response) => {
        var UserContactedProjectsUnfiltered = response['pro_view'];
        var UserContactedProjects = UserContactedProjectsUnfiltered;
        this.UserContactedLength = UserContactedProjects.length;
      });
      this.Service.getUserDetailsById(this.userID).subscribe((response) => {
        if (response['status'] === 'True') {
          const userDetails = response['UserDetails'];
          this.imageUrls = userDetails[0]['user_profile'];
        }
      });
    }
  }

  UserSeenLength = 0;
  UserContactedLength = 0;
  burgerIconRedSideNav() {
    if (this.LoginId != null) {
      this.Service.userseenprojects(this.userID).subscribe((response) => {
        this.UserSeenLength = 0;

        if (response['status'] === 'True') {
          const projects = response['recent_view'] || [];
          this.UserSeenLength = projects.length;
        }
      });
      this.Service.getContactedProjects(this.userID).subscribe((response) => {
        this.UserContactedLength = 0;
        if (response['status'] === 'True') {
          var UserContactedProjectsUnfiltered = response['pro_view'];
          var UserContactedProjects = UserContactedProjectsUnfiltered;
          this.UserContactedLength = UserContactedProjects.length;
        }
      });
    }

    document.getElementById('sideNavBarId').style.width = '250px';
    document.body.style.overflow = 'hidden';
  }

  hello1: boolean = true;
  hello2: boolean = false;
  hoverSideNav(nooo) {
    const box = document.getElementById('icons' + nooo) as HTMLElement;
    const box1 = document.getElementById('ActiveIcons' + nooo) as HTMLElement;
    const arrow = document.getElementById('arrowIcons' + nooo) as HTMLElement;
    const arrow1 = document.getElementById(
      'activeArrowIcons' + nooo,
    ) as HTMLElement;
    box.classList.add('hidden');
    box.classList.remove('show');

    box1.classList.add('show');
    box1.classList.remove('hidden');
    if (nooo == 1 || nooo == 2 || nooo == 3 || nooo == 4) {
      arrow.classList.add('hidden');
      arrow.classList.remove('show');

      arrow1.classList.add('show');
      arrow1.classList.remove('hidden');
    }
  }

  hoverSideNavLeave(no) {
    const box = document.getElementById('icons' + no) as HTMLElement;
    const box1 = document.getElementById('ActiveIcons' + no) as HTMLElement;
    const arrow = document.getElementById('arrowIcons' + no) as HTMLElement;
    const arrow1 = document.getElementById(
      'activeArrowIcons' + no,
    ) as HTMLElement;
    // Normal icon
    box.classList.add('show');
    box.classList.remove('hidden');

    // Active icon
    box1.classList.add('hidden');
    box1.classList.remove('show');

    if (no == 1 || no == 2 || no == 3 || no == 4) {
      // Normal arrow
      arrow.classList.add('show');
      arrow.classList.remove('hidden');

      // Active arrow
      arrow1.classList.add('hidden');
      arrow1.classList.remove('show');
    }
  }
  newSideNavClossBtn() {
    if (
      this.buyProperty ||
      this.rentProperty ||
      this.commercialProperty ||
      this.pgProperty
    ) {
      document.getElementById('subSideNavBarId').style.width = '0px';
      setTimeout(() => {
        document.getElementById('sideNavBarId').style.width = '0px';
      }, 250);
    } else {
      document.getElementById('sideNavBarId').style.width = '0px';
    }
    document.body.style.overflow = '';
  }
  hello(id) {
    if (id == 1) {
      this.buyProperty = true;
      this.rentProperty = false;
      this.commercialProperty = false;
      this.pgProperty = false;
    } else if (id == 2) {
      this.rentProperty = true;
      this.commercialProperty = false;
      this.buyProperty = false;
      this.pgProperty = false;
    } else if (id == 3) {
      this.commercialProperty = true;
      this.rentProperty = false;
      this.pgProperty = false;
      this.buyProperty = false;
    } else if (id == 4) {
      this.pgProperty = true;
      this.rentProperty = false;
      this.commercialProperty = false;
      this.buyProperty = false;
    }
    setTimeout(() => {
      document.getElementById('subSideNavBarId').style.width = '250px';
    }, 100);
  }

  newSubSideNavClossBtn() {
    document.getElementById('subSideNavBarId').style.width = '0px';
  }

  sideNavExplore = [
    {
      label: 'Buy Property',
      Id: '1',
      icon: 'newSideNavBuyProperties.svg',
      activeIcon: 'newSideNavBuyPropertiesActive.svg',
    },
    {
      label: 'Rent Property',
      Id: '2',
      icon: 'newSideNavrentPropertie.svg',
      activeIcon: 'newSideNavrentPropertieActive.svg',
    },
    {
      label: 'Commercial',
      Id: '3',
      icon: 'newSideNavCommercial.svg',
      activeIcon: 'newSideNavCommercialActive.svg',
    },
    {
      label: 'PG / Co-Living',
      Id: '4',
      icon: 'newSideNavPG.svg',
      activeIcon: 'newSideNavPGActive.svg',
    },
  ];

  sideNavDiscover = [
    {
      label: 'Real Estate Blogs',
      Id: '5',
      icon: 'newSideNavR-E-Blogs.svg',
      activeIcon: 'newSideNavR-E-BlogsActive.svg',
      routerLink: 'https://www.homes247.in/blogs',
    },
    {
      label: 'Property Walkthrough',
      Id: '6',
      icon: 'newSideNavPropertyWalkthrough.svg',
      activeIcon: 'newSideNavPropertyWalkthroughActive.svg',
      routerLink: 'https://www.homes247.in/all-project-walkthrough-videos-in-india',
    },
    {
      label: 'Property Reviews',
      Id: '7',
      icon: 'newSideNavPropertyReview.svg',
      activeIcon: 'newSideNavPropertyReviewActive.svg',
      routerLink: 'https://www.homes247.in/all-project-reviews-in-india',
    },
  ];

  sideNavTools = [
    {
      label: 'Find IFSC Codes',
      Id: '8',
      icon: 'newSideNavfindIFSE.svg',
      activeIcon: 'newSideNavfindIFSEActive.svg',
      routerLink: 'https://www.homes247.in/find-ifsc-code',
    },
    {
      label: 'Find Pincode',
      Id: '9',
      icon: 'newSideNavPincode.svg',
      activeIcon: 'newSideNavPincodeActive.svg',
      routerLink: 'https://www.homes247.in/find-pincode',
    },
    {
      label: 'FAQ',
      Id: '10',
      icon: 'newSideNavFAQ.svg',
      activeIcon: 'newSideNavFAQActive.svg',
      routerLink: 'https://www.homes247.in/faq',
    },
  ];

  sideNavCompany = [
    {
      label: 'About Us',
      Id: '11',
      icon: 'newSideNavAboutUs.svg',
      activeIcon: 'newSideNavAboutUsActive.svg',
      routerLink: 'https://www.homes247.in/aboutus',
    },
    {
      label: 'Careers',
      Id: '12',
      icon: 'newSideNavCareers.svg',
      activeIcon: 'newSideNavCareersActive.svg',
      routerLink: 'https://www.homes247.in/careers',
    },
    {
      label: 'Contact Us',
      Id: '13',
      icon: 'newSideNavContactUs.svg',
      activeIcon: 'newSideNavContactUsActive.svg',
      routerLink: 'https://www.homes247.in/contactus',
    },
  ];

  socialIcons = [
    {
      name: 'Facebook',
      file: 'newSideNavFb',
      routerLink: 'https://www.facebook.com/Homes247.in/',
    },
    {
      name: 'Instagram',
      file: 'newSideNavInsta',
      routerLink: 'https://www.instagram.com/homes247.in',
    },
    { name: 'X', file: 'newSideNavX', routerLink: 'https://x.com/homes247_in' },
    {
      name: 'LinkedIn',
      file: 'newSideNavLinkedIn',
      routerLink: 'https://www.linkedin.com/company/homes247/',
    },
    {
      name: 'Pinterest',
      file: 'newSideNavPrintrest',
      routerLink: 'https://in.pinterest.com/Homestwofourseven/',
    },
    {
      name: 'YouTube',
      file: 'newSideNavYouTube',
      routerLink: 'https://www.youtube.com/channel/UCv6oEM925HtkqUi3yRNDOBQ/',
    },
  ];

  // refer

  PageIndex() {
    if (this.router.url?.indexOf('/property-sale') > -1) {
      this.maincitypage = true;
      this.cityhomepage = false;
      this.homeMainPage = false
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
    } else if (this.router.url?.indexOf('/real-estate-in') > -1) {
      this.maincitypage = false;
      this.homeMainPage = false
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
    } else if (
      this.router.url?.indexOf('/new-launch-projects/new-projects-in-') > -1
    ) {
      this.ready_new();
    } else if (
      this.router.url?.indexOf(
        '/ready-to-move-apartments/ready-to-move-flats-in-',
      ) > -1
    ) {
      this.ready_new();
    } else if (this.router.url?.indexOf('btc') > -1) {
      this.bhk_status_type_locality_city();
    } else if (this.router.url?.indexOf('bstc') > -1) {
      this.bhk_status_type_locality_city();
    } else if (this.router.url?.indexOf('bstlc') > -1) {
      this.bhk_status_type_locality_city();
    } else if (this.router.url?.indexOf('residential-flats-in') > -1) {
      this.fbc_residential();
    } else if (this.router.url?.indexOf('fbc') > -1) {
      this.fbc_residential();
    } else if (this.router.url?.indexOf('villas-for-sale-in-') > -1) {
      this.Villas();
    } else if (this.router.url?.indexOf('plots-in-') > -1) {
      this.Plots();
    } else if (this.router.url?.indexOf('home-for-sale-in-') > -1) {
      this.Home();
    } else if (
      this.router.url?.indexOf(
        'upcoming-new-launch-properties/new-projects-in-',
      ) > -1
    ) {
      this.Upcoming_new_launch();
    } else if (this.router.url?.indexOf('stlc') > -1) {
      this.Stlc();
    } else if (this.router.url?.indexOf('btlc') > -1) {
      this.Btlc();
    } else if (this.router.url?.indexOf('builder') > -1) {
      this.Builder();
    } else if (this.router.url?.indexOf('/status/') > -1) {
      this.Status();
    } else if (this.router.url?.indexOf('/zone/') > -1) {
      this.Zone();
    } else if (
      this.router.url?.indexOf('/agricultural-land-for-sale-in-') > -1
    ) {
      this.Agriculture();
    } else if (
      this.router.url?.indexOf('/all-project-walkthrough-videos-in-india') > -1
    ) {
      this.Project();
    } else if (this.router.url?.indexOf('/all-project-reviews-in-india') > -1) {
      this.Project();
    } else if (this.router.url?.indexOf('/pcv') > -1) {
      this.Project();
    } else if (this.router.url?.indexOf('/pclv') > -1) {
      this.Project();
    } else if (this.router.url?.indexOf('/pcr') > -1) {
      this.Project();
    } else if (this.router.url?.indexOf('/pclr') > -1) {
      this.Project();
    } else if (this.router.url?.indexOf('/prd') > -1) {
      this.Project();
    } else if (this.router.url?.indexOf('pincode') > -1) {
      this.maincitypage = false;
      this.homeMainPage = false
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
    } else if (this.router.url?.indexOf('ifsc') > -1) {
      this.maincitypage = false;
      this.homeMainPage = false
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
    } else if (this.router.url?.indexOf('/bplc/') > -1) {
      this.mainpage = false;
      this.rentpage = false;
      this.maincitypage = false;
      this.homeMainPage = false
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
        Cityid: this.cityid,
      };
      this.Service.getbuildermeta(this.cityname, param).subscribe((metatag) => {
        let metatags = metatag['Builderseo'];
        this.buildername = metatags[0].builderInfo_name;
      });

      var builder_loc = {
        cityid: this.cityid,
        builderId: this.builderid,
        statusid: this.projectStatus,
        proptypeid: this.projecttype,
        maxprice: this.minPrice,
        minprice: this.maxPrice,
        bedroom: this.noOfBedrooms,
      };
      this.Service.get_builder_locality(builder_loc).subscribe(
        (Builderlocality) => {
          let builderlocality = Builderlocality['builderlocality'];
          this.builderlocality = builderlocality;
        },
      );
    } else if (
      this.router.url.includes('/rent/') ||
      this.router.url.includes('/rental/') ||
      this.router.url.includes('/rentals/')
    ) {
      this.mainpage = false;
      this.maincitypage = false;
      this.homeMainPage = false
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
      // this.homeMainPage = false
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
      // $('.Header_part').css('box-shadow', '2px 2px 5px 2px rgba(0, 0, 0, 0.15)');
    }
  }

  ready_new() {
    this.maincitypage = false;
    this.homeMainPage = false
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
    this.routeSub = this.activeroute.params.subscribe((params) => {
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
      };
      this.Service.getlocalityproperties(autocomppropparams).subscribe(
        (lists) => {
          this.localityproperties = lists['autolist'];
        },
      );
    });
  }
  bhk_status_type_locality_city() {
    this.maincitypage = false;
    this.homeMainPage = false
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
    this.routeSub = this.activeroute.params.subscribe((params) => {
      var url =
        params[
        'bhk-:ready-to-move-:propertytype-in-:locality-:city-:localityId'
        ];
      if (this.router.url?.indexOf('bstc') > -1) {
        this.citystatuscombo = true;
        this.citycombo = false;
        this.localitycombo = false;
        this.projectStatus = '50307';
      } else if (this.router.url?.indexOf('btc') > -1) {
        this.citycombo = true;
        this.citystatuscombo = false;
        this.localitycombo = false;
      } else if (this.router.url?.indexOf('bstlc') > -1) {
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
        locality_id: this.locality,
      };
      this.Service.getlocalityproperties(autocomppropparams).subscribe(
        (lists) => {
          this.localityproperties = lists['autolist'];
        },
      );
      var paramlocality = {
        locid: localityId,
      };
      this.Service.getlocalitymeta(this.city, paramlocality).subscribe(
        (metatag) => {
          let metatags = metatag['Localityseo']; //gowshik edit//
          this.localityName = metatags[0].LocalityName;
        },
      );
    });
  }

  fbc_residential() {
    this.maincitypage = false;
    this.homeMainPage = false
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

    if (this.router.url?.indexOf('residential-flats-in') > -1) {
      this.projecttype = ['50401'];
      this.residflatsforsale = true;
      this.budgetFlatTrue = false;
    } else if (this.router.url?.indexOf('fbc/flats-for-30-lakhs-in') > -1) {
      this.projecttype = ['50401'];
      this.minPrice = '1';
      this.maxPrice = '4';
      this.budgetFlatTrue = true;
      this.residflatsforsale = false;
    } else if (
      this.router.url?.indexOf(
        '/fbc/flats-in-' + addhyphens + '-for-sale-30-lakhs-to-40-lakhs',
      ) > -1
    ) {
      this.projecttype = ['50401'];
      this.minPrice = '5';
      this.maxPrice = '6';
      this.budgetFlatTrue = true;
      this.residflatsforsale = false;
    } else if (
      this.router.url?.indexOf(
        '/fbc/flats-in-' + addhyphens + '-for-sale-40-lakhs-to-50-lakhs',
      ) > -1
    ) {
      this.projecttype = ['50401'];
      this.minPrice = '6';
      this.maxPrice = '7';
      this.budgetFlatTrue = true;
      this.residflatsforsale = false;
    } else if (
      this.router.url?.indexOf(
        '/fbc/flats-in-' + addhyphens + '-for-sale-50-lakhs-to-60-lakhs',
      ) > -1
    ) {
      this.projecttype = ['50401'];
      this.minPrice = '7';
      this.maxPrice = '8';
      this.budgetFlatTrue = true;
      this.residflatsforsale = false;
    } else if (
      this.router.url?.indexOf(
        '/fbc/flats-in-' + addhyphens + '-for-sale-60-lakhs-to-70-lakhs',
      ) > -1
    ) {
      this.projecttype = ['50401'];
      this.minPrice = '8';
      this.maxPrice = '9';
      this.budgetFlatTrue = true;
      this.residflatsforsale = false;
    } else if (
      this.router.url?.indexOf(
        '/fbc/flats-in-' + addhyphens + '-for-sale-70-lakhs-to-80-lakhs',
      ) > -1
    ) {
      this.projecttype = ['50401'];
      this.minPrice = '9';
      this.maxPrice = '10';
      this.budgetFlatTrue = true;
      this.residflatsforsale = false;
    } else if (
      this.router.url?.indexOf(
        '/fbc/flats-in-' + addhyphens + '-for-sale-80-lakhs-to-90-lakhs',
      ) > -1
    ) {
      this.projecttype = ['50401'];
      this.minPrice = '10';
      this.maxPrice = '11';
      this.budgetFlatTrue = true;
      this.residflatsforsale = false;
    } else if (
      this.router.url?.indexOf(
        '/fbc/flats-in-' + addhyphens + '-for-sale-90-lakhs-to-1-crore',
      ) > -1
    ) {
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
    };
    this.Service.getlocalityproperties(locpropparam).subscribe((lists) => {
      this.localityproperties = lists['autolist'];
    });
  }

  Villas() {
    this.maincitypage = false;
    this.homeMainPage = false
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
      cityid: this.cityId,
    };
    this.Service.getlocalityproperties(locpropparam).subscribe((lists) => {
      this.localityproperties = lists['autolist'];
    });
  }

  Plots() {
    this.maincitypage = false;
    this.homeMainPage = false
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
      cityid: this.cityId,
    };
    this.Service.getlocalityproperties(locpropparam).subscribe((lists) => {
      this.localityproperties = lists['autolist'];
    });
  }

  Home() {
    this.maincitypage = false;
    this.homeMainPage = false
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
      cityid: this.cityId,
    };
    this.Service.getlocalityproperties(locpropparam).subscribe((lists) => {
      this.localityproperties = lists['autolist'];
    });
  }

  Upcoming_new_launch() {
    this.maincitypage = false;
    this.homeMainPage = false
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
    this.routeSub = this.activeroute.params.subscribe((params) => {
      var url = params['new-projects-in-:locality-:city-:localityId'];
      this.locality = url.split('-').pop();
      this.projectStatus = '50310,50308';
      var autocomppropparams = {
        statusid: this.projectStatus,
        locality_id: this.locality,
      };
      this.Service.getlocalityproperties(autocomppropparams).subscribe(
        (lists) => {
          this.localityproperties = lists['autolist'];
        },
      );
    });
  }

  Stlc() {
    this.maincitypage = false;
    this.homeMainPage = false
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
    this.Service.getlocalitymeta(this.currentCity, paramlocality).subscribe(
      (metatag) => {
        let metatags = metatag['Localityseo']; //gowshik edit//
        this.localityName = metatags[0].LocalityName;
        this.localityName = this.localityName;
      },
    );
    this.routeSub = this.activeroute.params.subscribe((params) => {
      var url =
        params['status-:propertytype-in-:localityname-:city-:localityId'];
      this.localityId = url.split('-').pop();
      var statusId = '50307';
      var proptypeid = '50401';

      var value = this.cityservice.cityfinder(this.router.url);
      this.cityId = value.cityid;
      var autocomppropparams = {
        cityid: this.cityId,
        statusid: statusId,
        proptypeid: proptypeid,
        locality_id: this.localityId,
      };
      this.Service.getlocalityproperties(autocomppropparams).subscribe(
        (lists) => {
          this.localityproperties = lists['autolist'];
          if (lists['status'] == 'False') {
            this.localityproperties_hide = false;
          } else {
            this.localityproperties_hide = true;
          }
        },
      );
    });
  }

  Btlc() {
    this.maincitypage = false;
    this.homeMainPage = false
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
    this.Service.getlocalitymeta(this.currentCity, paramlocality).subscribe(
      (metatag) => {
        let metatags = metatag['Localityseo']; //gowshik edit//
        this.localityName = metatags[0].LocalityName;
        this.localityName = this.localityName;

        this.routeSub = this.activeroute.params.subscribe((params) => {
          var url = params['bhk-:propertytype-in-:locality-:city-:localityId'];
          var propertyTypeValue = url.split('-')[2];
          this.property_type =
            propertyTypeValue.charAt(0).toLocaleUpperCase() +
            propertyTypeValue.slice(1);
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
            bedroom: bedroom,
          };
          this.Service.getlocalityproperties(autocomppropparams).subscribe(
            (lists) => {
              this.localityproperties = lists['autolist'];
            },
          );
        });
      },
    );
  }

  Builder() {
    this.homeMainPage = false
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
    this.routeSub = this.activeroute.params.subscribe((params) => {
      if (this.router.url?.indexOf('/builder/') > -1) {
        var cityname = params['cityname'];
        var lasturl = params['buildername-:builderid'];
        this.builderid = lasturl.split('-').pop();
        var idremoved = lasturl.replace('-' + this.builderid, '');
        var buildername = idremoved.replace('-', ' ');
        this.builder = buildername;
      } else if (this.router.url?.indexOf('/all-builders-by-city/') > -1) {
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
        Cityid: this.cityId,
      };
      this.Service.getlocalityproperties(locpropparam).subscribe((lists) => {
        this.localityproperties = lists['autolist'];
      });
    });
  }

  Status() {
    this.homeMainPage = false
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
    this.routeSub = this.activeroute.params.subscribe((params) => {
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
        cityid: this.cityId,
      };
      this.Service.getlocalityproperties(locpropparam).subscribe((lists) => {
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
    this.homeMainPage = false
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
    this.routeSub = this.activeroute.params.subscribe((params) => {
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
      };
      this.Service.getlocalityproperties(locpropparam).subscribe((lists) => {
        this.localityproperties = lists['autolist'];
      });
      var paramss = {
        cityId: this.cityId,
        regionid: regionid,
      };
      this.Service.getlocality(paramss).subscribe((localitys) => {
        this.localitys = localitys['details'];
      });
      // this.Service.getAuto(this.cityId).subscribe((myLocalList: any[]) => {
      //   this.autoCompleteData = myLocalList['autolist'];
      // });
    });
  }
  property_typeId: any;
  Agriculture() {
    this.homeMainPage = false
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
    this.routeSub = this.activeroute.params.subscribe((params) => {
      var value = this.cityservice.cityfinder(this.router.url);
      this.currentCity = value.cityname;
      this.cityId = value.cityid;
      this.property_typeId = '50405';
      var locpropparam = {
        proptypeid: this.property_typeId,
        cityid: this.cityId,
      };
      this.Service.getlocalityproperties(locpropparam).subscribe((lists) => {
        this.localityproperties = lists['autolist'];
      });

      // this.Service.getAuto(this.cityId).subscribe((myLocalList: any[]) => {
      //   this.autoCompleteData = myLocalList['autolist'];
      // });
    });
  }

  Project() {
    this.homeMainPage = false
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

  // refer

  // Existing logic for inner dropdowns
  activeDrop: string = '';

  toggleDrop(index: number, sectionId: string) {
    const uniqueId = sectionId + index;
    this.activeDrop = this.activeDrop === uniqueId ? '' : uniqueId;
  }

  // NEW: Logic for the Outer City Headers (e.g. "Real Estate in Bangalore")
  activeCity: string = '';

  toggleCity(index: number, type: string) {
    const uniqueId = type + index;
    this.activeCity = this.activeCity === uniqueId ? '' : uniqueId;
  }

  onLogOut() {
    if (this.router.url.split('?')[0] === '/userauth/profile/' + this.userID) {
      // this.router.navigate(['/login']);
      window.location.href = 'https://www.homes247.in/login';
      localStorage.removeItem('userName');
      localStorage.removeItem('userID');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userNumber');
      localStorage.removeItem('loginID');
      localStorage.removeItem('userLastName');
    } else if (
      this.router.url.split('?')[0] ===
      '/userauth/wishlist/' + this.userID
    ) {
      // this.router.navigate(['/login']);
      window.location.href = 'https://www.homes247.in/login';
      localStorage.removeItem('userName');
      localStorage.removeItem('userID');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userNumber');
      localStorage.removeItem('loginID');
      localStorage.removeItem('userLastName');
    } else if (
      this.router.url.split('?')[0] ===
      '/userauth/seenprojects/' + this.userID
    ) {
      // this.router.navigate(['/login']);
      window.location.href = 'https://www.homes247.in/login';
      localStorage.removeItem('userName');
      localStorage.removeItem('userID');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userNumber');
      localStorage.removeItem('loginID');
      localStorage.removeItem('userLastName');
    } else if (
      this.router.url.split('?')[0] ===
      '/userauth/sellingprojects/' + this.userID
    ) {
      // this.router.navigate(['/login']);
      window.location.href = 'https://www.homes247.in/login';
      localStorage.removeItem('userName');
      localStorage.removeItem('userID');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userNumber');
      localStorage.removeItem('loginID');
      localStorage.removeItem('userLastName');
    } else {
      localStorage.removeItem('userName');
      localStorage.removeItem('userID');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userNumber');
      localStorage.removeItem('loginID');
      localStorage.removeItem('userLastName');

      location.reload();
    }
  }


  ShowHidecontact() {
    $('#FirstCityModal').modal('show');
    $('.modal-backdrop').removeClass('modal-backdrop fade show');

    $('.matAuto').css('display', 'block');
  }


}
