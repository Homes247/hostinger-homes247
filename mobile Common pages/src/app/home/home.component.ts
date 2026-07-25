import { Component, HostListener, OnInit, ElementRef, Inject, ViewChild } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Location, DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { DataService } from '../data.service';
import { DataService2 } from '../data.service2';
import { User, Enquiry } from './home';
import { FormBuilder, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { LOCAL_STORAGE, WINDOW } from '@ng-toolkit/universal';
import { CountdownComponent, CountdownEvent } from 'ngx-countdown';
import { CityService } from '../city.service';
import { AllindiaService } from '../allindia.service';
import { MessageService } from '../property.service';
import { FilterService } from '../filter.service';

declare var $: any;
declare var swal: any;

declare var $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  @ViewChild('cancel') cancel: ElementRef;
  @ViewChild('scrollapiloader') scrollapiloader: ElementRef;
  @ViewChild('cd', { static: false }) private countdown: CountdownComponent;
  id;

  allSpotlightProp: any;

  loginshow = true;
  userlogin = false;
  products = [];
  metas = [];
  citiess: any;
  SelectCity = 'Select City';
  selectedLocation;
  topProperties: any;
  newProperties = [];
  blogs: any;
  propertyname: any;
  // cityid: any;
  currentCity: any;
  imagepath = this.dataService.imagesURL + 'cities/';
  propertyimage = this.dataService.imagesURL + 'uploadPropertyImgs/';
  propertyimage1 = this.allindia.imagesURL + 'spotlight_images/';

  blogimagePath = this.dataService.imagesURL + 'stories/';
  offersimages = this.dataService.imagesURL + 'OffersImage/';
  ImageUrlBuilderLogo = this.allindia.imagesURL + 'builder/';

  date: any;
  user = new User();
  enquiry = new Enquiry();
  blogsloader = true;
  newlaunchesloader = true;
  topprojectsloader = true;
  bestoffesrloader = true;

  myControl = new FormControl();
  options;
  filteredOptions: Observable<any>;
  currentCitySearchNav;
  locationSelectedId = '1';

  bangalore = false;
  hyderabad = false;
  kochi = false;
  chennai = false;
  pune = false;
  mumbai = false;
  kolkata = false;
  amaravathi = false;
  delhi = false;
  goa = false;
  gurgaon = false;
  mysore = false;
  coimbatore = false;
  ahmedabad = false;
  trivandrum = false;
  naviMumbai = false;
  topLocalitiesList;
  localityOneName;
  localityOneId;
  localityTwoName;
  localityTwoId;
  localityThreeName;
  localityThreeId;
  localityFourName;
  localityFourId;
  localityFiveName;
  localityFiveId;
  localitySixName;
  localitySixId;
  trendingBlogs: any;
  changeText: boolean;
  // myControl = new FormControl();
  // options;
  // filteredOptions: Observable<any>;
  hidemobile: boolean;
  hidedesktop: boolean;
  offers = [];
  searchstring: any;
  projectcount: any;
  villacount: any;
  plotcount: any;
  apartmentcount: any;
  sarjapurcount: any;
  UserId: any;
  uploads: any;
  trending: any;
  featured: any;
  handpicked: any;
  launched: any;
  topsearch: any;

  ShowBangalore = false;
  ShowHyderabad = false;
  ShowChennai = false;
  ShowKochi = false;
  ShowPune = false;
  ShowDelhi = false;
  ShowKolkata = false;
  ShowMumbai = false;
  ShowGoa = false;
  ShowGurgaon = false;
  ShowMysore = false;
  ShowCoimbatore = false;
  ShowAhmedabad = false;
  ShowTrivandrum = false;
  ShowNaviMumbai = false;
  cityId: string;
  localityOneCount: any;
  localityTwoCount: any;
  localityThreeCount: any;
  localityFourCount: any;
  localityFiveCount: any;
  localitySixCount: any;
  showSpotLight = false;
  showProjectFocus = false;

  localstorediv: any;
  storagearr = [];

  readyToMoveprojectcount: any;
  newLaunchesprojectcount: any;
  affordableprojectcount: any;
  luxuryprojectcount: any;
  userID: any;
  userid: any;
  cityname: string;
  dropdownVisible = false;

  addRoot = this.allindia.imagesURL + 'expertsads/';
  // addRoot = this.allindia.ipimagesURL + 'expertsads/';


  serviceFormComponent: any;

  interiorAdds = []
  homeLoanAdds = []
  floorPlanAdds = []
  globalAddsArray = [];
  legalAdds = []
  vastuAdds = []
  homeInspectionAdds = []
  propertyManagementAdds = []
  realEstateMarketAdds = []


  // locationSelectedId = '1';
  // defined the array of data
  // public autoCompleteData: { [key: string]: Object }[] = [];

  // maps the appropriate column to fields property
  // public fields: Object = { groupBy: 'title', value: 'name' };

  // set the placeholder to the AutoComplete input
  // public text: string = "Enter a location";
  //enable the highlight property to highlight the matched character in suggestion list
  // public highlight: Boolean = true;
  //set the minLength to restrict the remote request until search key contains 3 characters.
  // public minLength: Number = 2;
  constructor(private dataService: DataService, private dataService2: DataService2, private _formBuilder: FormBuilder, private allindia: AllindiaService,
    private titleService: Title, public Filter: FilterService,
    private meta: Meta, private router: Router,
    private _location: Location, @Inject(DOCUMENT) private doc,
    @Inject(WINDOW) private window: Window,
    public cityservice: CityService, @Inject(LOCAL_STORAGE) private Local_Storage: any, private _messageService: MessageService,
  ) {
    this.router.events.subscribe((evt) => {
      // trick the Router into believing it's last link wasn't previously loaded
      this.router.navigated = false;
      // if you need to scroll back to top, here is the right place
      window.scrollTo(0, 0);
    });
  }

  scrollTo(section) {
    document.querySelector('#' + section)
      .scrollIntoView();
  }

  ngAfterViewInit(): void {
    // $('.ui.dropdown').dropdown({});
  }

  ngOnInit() {
    this.metatags();
    this.geturlparams();
    // this.getOffers();
    this.getlocationlists();
    this.battleInit();
    this.Login();
    this.getapartmentscount();
    this.getvillacount();
    this.getplotcount();

    this.addsLoading()
    $('body').removeClass('modal-open');



    this.userID = this.Local_Storage.getItem('userID');
    if (this.userID != undefined || null) {
      this.userid = this.userID = this.Local_Storage.getItem('userID');
    } else {
      this.userid = ''
    }

    var paramsss = {
      cityId: this.cityId,
      userId: this.UserId,
    }

    this.dataService.gettopproperties(paramsss).subscribe((topProperty: any[]) => {
      if (topProperty['status'] === 'True') {
        //  this.topprojectsloader = false;
        this.topProperties = topProperty['deatils'];
        var lengthPropArray = this.topProperties.length;
        if (lengthPropArray == 0) {
          this.showProjectFocus = false;
        } else {
          this.showProjectFocus = true;
        }
      } else {
        //  this.topprojectsloader = true;
      }
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


    // 
    // 
    // if(this.currentCity === this.cityname){
    //   this.ShowBangalore = true;
    // }else if(this.currentCity === 'Hyderabad'){
    //   this.ShowHyderabad = true;
    // }else if(this.currentCity === 'Chennai'){
    //   this.ShowChennai = true;
    // }else if(this.currentCity === 'Kochi'){
    //   this.ShowKochi = true;
    // }else if(this.currentCity ==='Pune'){
    //   this.ShowPune = true;
    // }else if(this.currentCity === 'Delhi'){
    //   this.ShowDelhi = true;
    // }else if(this.currentCity === 'Kolkata'){
    //   this.ShowKolkata = true;
    // }else if(this.currentCity === 'Mumbai'){
    //   this.ShowMumbai = true;
    // }else if(this.currentCity === 'Goa'){
    //   this.ShowGoa = true;
    // }else if(this.currentCity === 'Gurgaon'){
    //   this.ShowGurgaon = true;
    // }else if(this.currentCity === 'Mysore'){
    //   this.ShowMysore = true;
    // }else if(this.currentCity === 'Coimbatore'){
    //   this.ShowCoimbatore = true;
    // }else if(this.currentCity === 'Ahmedabad'){
    //   this.ShowAhmedabad = true;
    // }else if(this.currentCity === 'Trivandrum'){
    //   this.ShowTrivandrum = true;
    // }else if(this.currentCity === 'Navi Mumbai'){
    //   this.ShowNaviMumbai = true;
    // }
    this.id = setInterval(() => {
      this.battleInit();
    }, 1000);
    this.getinitialloads();
  }

  // interiors(){
  //   this.Filter.selectedService =  'interiors';

  //   $('#myModal_services').css('display','block');
  //   this.dataService.mouseenterservice1();

  // }

  // homeLoan(){
  //   this.Filter.selectedService =  'home_loan';

  //   $('#myModal_services').css('display','block');
  //   this.dataService.mouseenterservice1();

  // }
  // realEstate(){
  //   this.Filter.selectedService =  'real_estate';
  //   $('#myModal_services').css('display','block');

  //   this.dataService.mouseenterservice1();

  // }

  clickedService(id) {
    this.Filter.selectedService = id;

    $('#myModal_services').css('display', 'block');

    this.dataService.mouseenterservice1();

  }


  addsLoading() {

    var params = {
      viewpagess: '1',
    };
    this.allindia.getAdds(params).subscribe(responce => {
      let allAddsCategory = responce['expertyinfo'];
      this.interiorAdds = allAddsCategory['Interior Designers'];
      this.homeLoanAdds = allAddsCategory['Home Loan'];
      this.floorPlanAdds = allAddsCategory['Floorplan'];
      this.legalAdds = allAddsCategory['Legal'];
      this.vastuAdds = allAddsCategory['Vastu'];
      this.homeInspectionAdds = allAddsCategory['Home Inspection'];
      this.propertyManagementAdds = allAddsCategory['Property Management'];
      this.realEstateMarketAdds = allAddsCategory['Real Estate Market'];

      let mergedArray = [...this.floorPlanAdds, ...this.legalAdds, ...this.homeInspectionAdds, ...this.propertyManagementAdds, ...this.realEstateMarketAdds, ...this.vastuAdds];
      this.globalAddsArray = mergedArray

      this.shuffleGlobalAdds(this.globalAddsArray)

      this.shuffleInterior(this.interiorAdds);
      this.shuffleHomeLoan(this.homeLoanAdds);
    })
  }

  shuffleInterior(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    this.interiorAdds = a;
  }
  shuffleHomeLoan(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    this.homeLoanAdds = a;
  }

  shuffleGlobalAdds(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    // return a;
    this.globalAddsArray = a;
  }


  // Add Wishlish property carousel functionality Start //



  whishLishId: any

  parsedarray = [];
  wishlistaddstorage(id) {
    this.whishLishId = id
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

  userfav: any;


  logincheck() {
    this.UserId = this.Local_Storage.getItem("userID");
    if ('loginID' in this.Local_Storage) {

      this._messageService.getpropertyfavparam(this.whishLishId, this.UserId).subscribe(prop => {
        let propDetails = prop['deatils'];
        this.userfav = propDetails[0].user_fav;
      });
    } else {

    }
  }

  addwishlist(id) {
    const userid = this.Local_Storage.getItem("userID");
    var param = {
      userid: userid,
      propid: id
    };
    this._messageService.addfavaourite(param).subscribe(response => {
    });
  }

  // Add Wishlish property carousel functionality End //


  onclickshare(locProp) {
    // this.toggle = !this.toggle;
    if ((window.navigator as any).share) {
      (window.navigator as any)
        .share({
          title: locProp.propertyName,
          text: 'Check out this amazing property ' + locProp.propertyName,
          url: 'https://www.homes247.in' + '/property/' + locProp.city_name.toLowerCase().replace(/\s+/g, '-') + '/' + locProp.locality_name.toLowerCase().replace(/\s+/g, '-') + '' + locProp.propertyName.toLowerCase().replace(/\s+/g, '-') + '-' + locProp.property_info_IDPK,
        })
        .then(() => console.log('Shared successfully'))
        .catch((error: any) => console.error('Error sharing:', error));
    } else {
      console.log('Web Share API not supported on this device.');
    }
  }





  metatags() {
    var value = this.cityservice.cityfinder(this.router.url);
    this.currentCity = value.cityname;
    this.cityId = value.cityid;
    this.dataService.getcityhomepageseo(this.cityId).subscribe((metatags: any[]) => {
      this.metas = metatags['Pageseo'];
      let meta = this.metas[0].page_title;
      if (meta == null) {
        this.titleService.setTitle("Real Estate in " + this.currentCity + " | Flats in " + this.currentCity + " | Homes247.in");
        this.meta.updateTag({
          name: 'description',
          content: ' Search real estate in' + this.currentCity + '..Have a look on top flats in ' + this.currentCity + 'on Homes247.in. Call Us: +91 9164247247 for Enquiry or visit @ Homes247.in'
        });
      } else {
        this.titleService.setTitle(this.metas[0].page_title);
        this.meta.updateTag({ name: 'description', content: this.metas[0].meta_description });
      }

    });
    this.dataService.createLinkForCanonicalURL();
    let giftofspeed = document.createElement('link');
    giftofspeed.rel = 'stylesheet';
    giftofspeed.href = 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/plugins/ngx-owl-carousel-o/lib/styles/prebuilt-themes/owl.carousel.min.css';
    giftofspeed.type = 'text/css';
    let godefer = document.getElementsByTagName('link')[0];
    godefer.parentNode.insertBefore(giftofspeed, godefer);

    let giftofspeed2 = document.createElement('link');
    giftofspeed2.rel = 'stylesheet';
    giftofspeed2.href = 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/plugins/ngx-owl-carousel-o/lib/styles/prebuilt-themes/owl.theme.default.min.css';
    giftofspeed2.type = 'text/css';
    let godefer2 = document.getElementsByTagName('link')[0];
    godefer2.parentNode.insertBefore(giftofspeed2, godefer2);

    // $('body').removeClass('modal-open');

  }
  IsVisiblee = false;
  ShowHide_More() {
    this.IsVisiblee = this.IsVisiblee ? false : true;
  }

  // showMeViewMoreCities = false;
  // ShowHide() {
  //   this.IsVisible = true;
  //   // this.showMeViewMoreCities = this.showMeViewMoreCities ? false : true;
  // }
  showhide() {
    if ($('#fixed-accordion').css('visibility') == 'hidden')
      $('#fixed-accordion').css('visibility', 'visible');
    else
      $('#fixed-accordion').css('visibility', 'hidden');
  }
  tran(n) {
    $("div[data-page=" + n + "]").removeClass("closed").addClass("open");
    $("div.open[data-page!=" + n + "]").removeClass("open").addClass("closed");
  }

  closeAndroidApp() {
    $('.androidApp').css('display', 'none');
  }

  username: any;

  Login() {
    const loginid = localStorage.getItem('loginID');
    const username = localStorage.getItem("userName");
    const userid = localStorage.getItem("userID");
    if (loginid === '1') {
      this.userlogin = true;
      this.loginshow = false;
      this.username = username;
      this.UserId = userid;
    }
  }

  Logout() {
    localStorage.clear();
    window.location.reload();
  }


  blogapiload = true;
  topnewapiload = false;
  topnewdivreached = false;
  loaded = false;
  FooterComponent: any;
  Autocomplete: any;
  FloatContact: any;
  Fixedfooter: any;
  Matautocomplete: any;
  Mousemovement: boolean = false;

  componentloads = false;


  @HostListener('document:click', ['$event'])
  @HostListener('touchstart', ['$event'])
  // @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    import('../float-contact/float-contact.module').then(mod => mod.FloatContactComponentModule).then(FloatContactComponentModule => {
      this.FloatContact = FloatContactComponentModule.components['lazy'];
      this.loaded = true;
    });
    import('../fixedfooter/fixedfooter.module').then(mod => mod.FixedfooterComponentModule).then(FixedfooterComponentModule => {
      this.Fixedfooter = FixedfooterComponentModule.components['lazy'];
      this.loaded = true;
    });
    import('../ejs-autocomplete/ejs-autocomplete-module').then(mod => mod.EjsAutocompleteModule).then(EjsAutocompletModule => {
      this.Autocomplete = EjsAutocompletModule.components['lazy'];
      this.loaded = true;
    });

    if (this.componentloads == false) {
      this.componentloads = true;
      import('../service-form/service-form.module').then(mod => mod.serviceFormModule).then(EnquiryFormComponent => {
        this.serviceFormComponent = EnquiryFormComponent.components['lazy'];
      });
      import('../mat-autocomplete-new/mat-autocomplete-new.module').then(mod => mod.MatAutocompleteNewModule).then(MatAutocompleteNewModule => {
        this.Matautocomplete = MatAutocompleteNewModule.components['lazy'];
      });
      this.dataService.mouseenterservice3();
    }



    this.Mousemovement = true;

    if (this.blogapiload == true) {
      this.dataService.getrecentblogs().subscribe((blogs: any[]) => {
        if (blogs['status'] === 'True') {
          this.blogsloader = false;
          this.blogs = blogs['locations'];
          this.blogapiload = false;
        } else {
          this.blogsloader = true;
        }
      });

      const trendingId = '1';
      this.dataService2.getcategoryblogs(trendingId).subscribe(responce => {
        if (responce['status'] === 'True') {
          this.trendingBlogs = responce['blogcategory'];
        }
      });



    }
    this.dataService.mouseenterservice3();
  }


  IsVisible = false;

  nevigateToList() {
    this.router.navigate([this.currentCity.replace(/\s+/g, '-').toLowerCase() + '/property-sale']);

  }
  ShowHidecontact() {
    import('../mat-autocomplete-new/mat-autocomplete-new.module').then(mod => mod.MatAutocompleteNewModule).then(MatAutocompleteNewModule => {
      this.Matautocomplete = MatAutocompleteNewModule.components['lazy'];
    });
    // this.IsVisibleMat = true
    $('.matAuto').css('display', 'block');
    // this.router.navigate([this.currentCity.replace(/\s+/g, '-').toLowerCase() + '/property-sale']);

    this.IsVisible = this.IsVisible ? false : true;
    $("#modal-container3").addClass("hidden");
    $("#modal-container3").addClass("scroll");
  }
  shuffletopprojects(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    this.topProperties = a;
  }

  battleInit() {
    // Remove .active class from the active li, select next li sibling.
    var next = $('ul li.best_price_icon_hover').removeClass('best_price_icon_hover').next('li');
    // Did we reach the last element? Of so: select first sibling
    if (!next.length) {
      next = next.prevObject.siblings(':first');
    }
    // Add .active class to the li next in line.
    next.addClass('best_price_icon_hover');
  }

  ngOnDestroy() {
    if (this.id) {
      clearInterval(this.id);
    }
  }

  // getautocomplete()
  // {
  //   let cityid = 1;
  //   this.dataService.getAuto(cityid).subscribe((myLocalList: any[]) => {
  //     this.apioptions(myLocalList['autolist']);
  //   })
  // }

  // Based_On_First_Load
  // getAuto() {
  //   // var cookiecityid = this.cookieService.get('CityID');
  //   // var cookiecityname = this.cookieService.get('CityName');
  //   var cookiecityid = localStorage.getItem('CityID');
  //   var cookiecityname = localStorage.getItem('CityName');
  //   if (cookiecityid == null) {
  //     // this.cityId = '1';
  //     // this.currentCity = this.cityname;
  //     // this.cookieService.set('CityID', this.cityId );
  //     // this.cookieService.set('CityName', this.currentCity );
  //     localStorage.setItem('CityID', this.cityId);
  //     localStorage.setItem('CityName', this.currentCity);
  //     this.dataService.getAuto(this.cityId).subscribe((myLocalList: any[]) => {
  //       this.apioptions(myLocalList['autolist']);
  //       this.autoCompleteData = myLocalList['autolist'];
  //     });
  //   } else if (cookiecityid == '') {
  //     // this.cityId = '1';
  //     // this.currentCity = this.cityname;
  //     // this.cookieService.set('CityID', this.cityId );
  //     // this.cookieService.set('CityName', this.currentCity );
  //     localStorage.setItem('CityID', this.cityId);
  //     localStorage.setItem('CityName', this.currentCity);
  //     this.dataService.getAuto(this.cityId).subscribe((myLocalList: any[]) => {
  //       this.apioptions(myLocalList['autolist']);
  //       this.autoCompleteData = myLocalList['autolist'];
  //     });
  //   } else {
  //     this.currentCity = cookiecityname;
  //     // this.cookieService.set('CityID', cookiecityid );
  //     localStorage.setItem('CityID', cookiecityid);
  //     this.dataService.getAuto(this.cityId).subscribe((myLocalList: any[]) => {
  //       this.apioptions(myLocalList['autolist']);
  //       this.autoCompleteData = myLocalList['autolist'];
  //     });
  //   }
  // }

  // Based_On_First_Load

  onItemSelect(selected) {
    var currentCity = selected.city;
    this.getProjectsclick(currentCity, selected);
  }

  selectEvent(event) {
    var currentCity = event.itemData.city;
    var selected = event.itemData;
    this.getProjectsclick(currentCity, selected);
  }

  getProjectsclick(currentCity, selected) {
    var cityname = currentCity.toLowerCase().replace(' ', '-');
    this.router.navigate([cityname + '/property-sale']);
    try {
      if (selected.type == 'builder_name') {
        var buildname = selected.name;
        this.searchstring = buildname;
        var buildername = buildname.replace(/\s+/g, '-').toLowerCase();
        var buildid = selected.id;
        localStorage.setItem('BuilderName', buildname);
        localStorage.setItem('BuilderId', buildid);
        // this.cookieService.set('BuilderName', buildername );
        // this.cookieService.set('BuilderId', buildid );
        this.router.navigate([cityname + '/builder/' + buildername + '-' + buildid]);
      } else {
      }
      if (selected.type == 'locality_name') {
        var locname = selected.name;
        this.searchstring = locname;
        var localityname = locname.replace(/\s+/g, '-').toLowerCase();
        var staticlocurl = 'property-sale-in';
        var locid = selected.id;
        localStorage.setItem('LocalityName', locname);
        localStorage.setItem('LocalityId', locid);
        // this.cookieService.set('LocalityName', localityname );
        // this.cookieService.set('LocalityId', locid );
        this.router.navigate([cityname + '/' + staticlocurl + '-' + localityname + '-' + locid]);
      } else {
      }
      if (selected.type == 'regions') {
        var zone = selected.name;
        this.searchstring = zone;
        var zonename = zone.replace(/\s+/g, '-').toLowerCase();
        var zoneid = selected.id;
        localStorage.setItem('Zone', zone);
        localStorage.setItem('ZoneId', zoneid);
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
        localStorage.setItem('Status', status);
        localStorage.setItem('StatusId', statusid);
        // this.cookieService.set('Status', statusname );
        // this.cookieService.set('StatusId', statusid );
        this.router.navigate([cityname + '/status/' + statusname + '-' + statusid]);
      } else {
      }
      if (selected.type == 'PropType') {
        var propertytype = selected.name;
        this.searchstring = propertytype;
        var proptype = propertytype.replace(/\s+/g, '-').toLowerCase();
        var proptypeid = selected.id;
        localStorage.setItem('PropType', propertytype);
        localStorage.setItem('ProptypeId', proptypeid);
        // this.cookieService.set('PropType', proptype );
        // this.cookieService.set('ProptypeId', proptypeid );
        this.router.navigate([cityname + '/sale/' + proptype + '-' + proptypeid]);
      } else {
      }
      if (selected.type == 'reraId') {
        var reraid = selected.id;
        this.searchstring = reraid;
        localStorage.setItem('ReraID', reraid);
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
        localStorage.setItem('PropID', propid);
        localStorage.setItem('PropName', propname);
        // localStorage.setItem('CityName', currentCity);
        this.router.navigate([]).then(result => {
          window.open('/property/' + cityname + '/' + locurlname + '/' + propurlname + '-' + propid, '_blank');
        });
      } else {
      }
    } catch (e) {
    }
  }

  apioptions(apivalue) {
    this.options = apivalue;
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => value.length >= 1 ? this._filter(value) : [])
      );
  }

  private _filter(value: string) {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  removeCity(parts: any) {
    localStorage.removeItem('CityNames');

    this.RecentCityStorage = this.RecentCityStorage.filter(item => item !== parts);

    // save it to the local storage recente search cities --> 

    localStorage.setItem('CityNames', JSON.stringify(this.RecentCityStorage));



  }
  citiesss: any;
  getlocationlists() {
    var value = this.cityservice.cityfinder(this.router.url);
    this.cityId = value.cityid;

    var param = {
      cityid: this.cityId,
    };
    this.dataService.getlocationlist().subscribe((city: any[]) => {
      this.citiess = city['locations'];
    });
    this.dataService.getlocationlist().subscribe((city: any[]) => {
      this.citiesss = city['locations'];
      let splited_list = [];

      const size = 3; // row count of test box 

      for (let j = 0; j <= this.citiesss.length; j += size) {
        splited_list.push(this.citiesss.slice(j, j + size));
      }

      let slide_Tests = []
      const count = 4; // RowCount to show first
      for (let i = 0; i < count; i++) {
        var slid = [];
        slid[i] = splited_list[i];
        this.testli_data.push(slid[i]);
      }

      // console.log("new :", this.testli_data);
      //this.showCities = !this.showCities

      for (let n = count; n < splited_list.length; n++) {
        var slid2 = [];
        slid2[n] = splited_list[n];

        this.testLi2_data.push(slid2[n]);
      }

      // console.log("next more:", this.testLi2_data);


    });
    // this.dataService2.getrecentupdatelist().subscribe((recents: any[]) => {
    //   this.uploads = recents['recentproperties'];
    // });

    this.dataService2.gettrendingprojects(param).subscribe((trend: any[]) => {
      this.trending = trend['Trending'];
    });

    this.dataService2.getfeaturedprojects(param).subscribe((featur: any[]) => {
      this.featured = featur['Featured'];
    });

    this.dataService2.getpriorityprojects(param).subscribe((prior: any[]) => {
      this.handpicked = prior['Priority'];
    });

    this.dataService2.getnewprojects(param).subscribe((launch: any[]) => {
      this.launched = launch['Newprojects'];
    });

    this.dataService2.gettopprojects(param).subscribe((top: any[]) => {
      this.topsearch = top['Topprojects'];
    });

    var param1 = {
      cityId: this.cityId,
    }
    this.allindia.getSpotLightCityProp(param1).subscribe((majorcity: any[]) => {
      this.allSpotlightProp = majorcity['projectspotlight'];
      var spotlightLength = this.allSpotlightProp.length
      if (spotlightLength == 0) {
        this.showSpotLight = false
      } else {
        this.showSpotLight = true;
      }
    });

  }

  apartmentroute() {
    this.router.navigate(['/residential-flats-in-' + this.currentCitySearchNav + '-for-sale']);
    // this.router.navigate(["/apartments-for-sale-in-"+this.currentCitySearchNav]);
  }

  villasroute() {
    // this.router.navigate([this.currentCitySearchNav+"/sale/villas-50402"]);
    this.router.navigate(['/villas-for-sale-in-' + this.currentCitySearchNav]);
  }

  plotsroute() {
    // this.router.navigate([this.currentCitySearchNav+"/sale/plots-50403"]);
    this.router.navigate(['/plots-in-' + this.currentCitySearchNav]);
  }

  readytomoveroute() {
    this.router.navigate([this.currentCitySearchNav + '/status/ready-to-move-50307']);
  }

  underconst() {
    this.router.navigate([this.currentCitySearchNav + '/status/under-construction-50309']);
  }

  newlaunchroute() {
    this.router.navigate([this.currentCitySearchNav + '/status/new-launch-50310']);
  }

  upcomingroute() {
    this.router.navigate([this.currentCitySearchNav + '/status/up-coming-50308']);
  }

  onChange(event) {
    const id = event.target.value;
    this.dataService.gettopproperties(id).subscribe((topProperties: any[]) => {
      this.topProperties = topProperties['deatils'];

      var paramss = {
        cityId: this.cityId,
      };
      // this.dataService.getnewproperties(paramss).subscribe((newProperties: any[]) => {
      //   this.newProperties = newProperties['deatils'];

      //   if (this.newProperties.length == 0) {
      //     this.newProperties = [];
      //   }
      // });
    });
  }

  cityyy: any;
  citynav: any;
  countryExist: any;
  recenthide = false;
  testli_data: any[] = [];
  testLi2_data: any[] = [];
  RecentCityStorage = [];
  //   selectionChange(event) {
  //     this.cityservice.citybasedrouter(event.target.value);
  //     var city = event.target.value;
  //     this.cityyy = city.toLowerCase();
  //     let Cityloc;
  //     if(localStorage.getItem('CityNames')){
  //       Cityloc = JSON.parse(localStorage.getItem('CityNames'));
  //     }else{
  //       Cityloc=[];
  //     }
  //    console.log("testing",Cityloc);
  //     localStorage.setItem('CityNames', JSON.stringify(Cityloc));
  //     this.citynav = JSON.parse(localStorage.getItem('CityNames'))
  // const str = this.cityyy;
  // if (Cityloc.indexOf(str) === -1) {
  //   Cityloc.push(str);
  //   localStorage.setItem('CityNames', JSON.stringify(Cityloc));
  //   this.citynav = JSON.parse(localStorage.getItem('CityNames'))
  // }

  //   }

  getcityname(event) {
    var city = event.target.value;
    // this.cookieService.set('CityName', city );
    localStorage.setItem('CityName', city);
    this.dataService.getlocationlist().subscribe((citynam: any[]) => {
      this.citiess = citynam['locations'];
      for (let i = 0; i <= this.citiess.length; i++) {
        try {
          if (city == this.citiess[i].city) {
            // console.log(this.citiess[i].id);
            var cityid = this.citiess[i].id;
            // ;
            this.getclickAuto(cityid);
            // this.cookieService.set('CityID', cityid );
            localStorage.setItem('CityID', cityid);
          }
        } catch (e) {
        }
      }
    });
    this.currentCitySearchNav = localStorage.getItem('CityName').toLocaleLowerCase().replace(' ', '-');
  }

  getclickAuto(cityid) {
    this.dataService.getAuto(cityid).subscribe((myLocalList: any[]) => {
      this.apioptions(myLocalList['autolist']);
    });
  }

  getProjectsmain(currentCity) {
    var cityname = currentCity.toLowerCase().replace(' ', '-');
    this.router.navigate([cityname + '/property-sale'], { queryParams: { Searches: this.searchstring } });
  }


  bestoffersOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    autoplay: true,
    animateIn: 'fadeIn',
    animateOut: 'fadeOut',
    navSpeed: 500,
    nav: false,
    navText: ['<img src=https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_mobile/images/leftarrow.png alt=\'LeftArrow\' class=\'owl-nav owl-prev bestoff_left-icon\'>',
      '<img src=https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_mobile/images/rightarrow.png alt=\'RightArrow\' class=\'owl-nav owl-next bestoff_right-icon\'>'],
    responsive: {
      0: {
        items: 1
      },
      480: {
        items: 1
      },
      700: {
        items: 1
      },
      940: {
        items: 1
      }
    },
  };
  bestoffersOptions1: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    autoplay: true,
    animateIn: 'fadeIn',
    animateOut: 'fadeOut',
    navSpeed: 500,
    nav: false,
    navText: ['<img src=https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_mobile/images/leftarrow.png alt=\'LeftArrow\' class=\'owl-nav owl-prev bestoff_left-icon\'>',
      '<img src=https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_mobile/images/rightarrow.png alt=\'RightArrow\' class=\'owl-nav owl-next bestoff_right-icon\'>'],
    responsive: {
      0: {
        items: 1
      },
      480: {
        items: 1
      },
      700: {
        items: 1
      },
      940: {
        items: 1
      }
    },
  };

  customNew: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    autoplay: false,
    navSpeed: 200,
    nav: false,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      480: {
        items: 1
      },
      700: {
        items: 3
      },
      940: {
        items: 3
      }
    },
  };

  slideblogs: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 500,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1
      },
      480: {
        items: 1
      },
      700: {
        items: 3
      },
      940: {
        items: 3
      }
    },
  };

  getenquiry(id, name) {
    this.enquiry.propertyname = name;
  }

  getintouch() {
    if ($('#name').val() == '') {
      $('#name').focus().css('border-color', 'red').attr('placeholder', 'Please Enter Name');
      return false;
    } else {
      var nameFilter = /^([a-zA-Z]+\s)*[a-zA-Z]+$/;
      if (nameFilter.test($('#name').val())) {
        $('#name').removeAttr('style');
      } else {
        $('#name').focus().css('border-color', 'red').attr('placeholder', 'Please enter valid name').val('');
        return false;
      }
    }


    if ($('#mobile').val() == '') {
      $('#mobile').focus().css('border-color', 'red').attr('placeholder', 'Please Enter Phone Number');
      return false;
    } else {
      var mobileno = /^[0-9]{10}$/;
      if (mobileno.test($('#mobile').val())) {
        $('#mobile').removeAttr('style');
      } else {
        $('#mobile').focus().css('border-color', 'red').attr('placeholder', 'Please enter valid contact number').val('');
        return false;
      }
    }

    swal({
      title: 'We Will Intimate you soon!',
      type: 'success',
      showConfirmButton: false,
      timer: 1500
    });
    var param = this.user;
    var pageorgin = 'Home Page';

    // this.Service.addAboutCall(param, pageorgin).subscribe((success) => {
    //   // this.user = success;
    //   var status = success.status;
    // }, (err) => {
    //   console.log("Connection Failed")
    // });
    this.user.name = '';
    this.user.number = '';
  }

  // addenquiry() {
  //
  //   if ($('#ename').val() == "") {
  //     $('#ename').focus().css("border-color", "red").attr('placeholder', 'Please Enter Name');
  //     return false;
  //   } else {
  //     var enameFilter = /^([a-zA-Z]+\s)*[a-zA-Z]+$/;
  //     if (enameFilter.test($('#ename').val())) {
  //       $('#ename').removeAttr("style");
  //     } else {
  //       $('#ename').focus().css("border-color", "red").attr('placeholder', 'Please enter valid name').val('');
  //       return false;
  //     }
  //   }
  //   if ($('#emobile').val() == "") {
  //     $('#mobile').focus().css("border-color", "red").attr('placeholder', 'Please Enter Phone Number');
  //     return false;
  //   } else {
  //     var emobileno = /^[0-9]{10}$/;
  //     if (emobileno.test($('#emobile').val())) {
  //       $('#emobile').removeAttr("style");
  //     } else {
  //       $('#emobile').focus().css("border-color", "red").attr('placeholder', 'Please enter valid contact number').val('');
  //       return false;
  //     }
  //   }
  //   swal({
  //     title: 'We Will Intimate you soon!',
  //     type: 'success',
  //     showConfirmButton: false,
  //     timer: 1500
  //   })
  //   this.cancel.nativeElement.click();
  //   var param = this.enquiry;
  //   // this.Service.addPropertyCall(param).subscribe((success) => {
  //   //   //  this.enquiry = success;
  //   //   var status = success.status;
  //   //   this.enquiry.ename = '';
  //   //   this.enquiry.emobile = '';
  //   // }, (err) => {
  //   //   console.log("Connection Failed")
  //   // });
  //
  // }
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
    leftTime: 120,
    demand: true
  };
  otpexpired = false;

  handleEvent(e: CountdownEvent) {
    if (e.action === 'done') {
      this.otpexpired = true;
    }
  }

  // start()
  // {
  //   this.countdown.begin();
  // }
  // reset()
  // {
  //   this.countdown.restart();
  // }
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
    if ($('#name').val() == '') {
      $('#name').focus().css('border-color', 'red').attr('placeholder', 'Please Enter Name');
      return false;
    } else {
      var nameFilter = /^([a-zA-Z]+\s)*[a-zA-Z]+$/;
      if (nameFilter.test($('#name').val())) {
        $('#name').removeAttr('style');
      } else {
        $('#name').focus().css('border-color', 'red').attr('placeholder', 'Please enter valid name').val('');
        return false;
      }
    }
    if ($('#mobile').val() == '') {
      $('#mobile').focus().css('border-color', 'red').attr('placeholder', 'Please Enter Phone Number');
      return false;
    } else {
      var mobileno = /^[0-9]{10}$/;
      if (mobileno.test($('#mobile').val())) {
        $('#mobile').removeAttr('style');
      } else {
        $('#mobile').focus().css('border-color', 'red').attr('placeholder', 'Please enter valid contact number').val('');
        return false;
      }
    }
    this.otploader = true;
    $('body').addClass('bodyoverlay');
    var param = this.user;
    this.dataService.otpsend(param).subscribe((success) => {
      var prestatus = success['messages'][0].status;
      // var status = prestatus[0].MessageErrorDescription;
      if (prestatus == 'ENQUEUED') {
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
      console.log('Connection Failed');
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
    this.dataService.otpvalidcheck(param).subscribe((success) => {
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
      console.log('Connection Failed');
    });
  }

  callback() {
    var param = this.user;
    var pageorgin = 'Home Page';

    this.dataService.addAboutCall(param, pageorgin, this.cityId).subscribe((success) => {
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
      console.log('Connection Failed');
    });
    this.user.name = '';
    this.user.number = '';
    this.user.otp = '';
    $('#btn_reset').click();
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
    this.dataService.addPropertyCall(param).subscribe((success) => {
      //  this.enquiry = success;
      // var status = success.status;
      this.enquiry.ename = '';
      this.enquiry.emobile = '';
    }, (err) => {
      console.log('Connection Failed');
    });

  }

  getinitialloads() {
    this.currentCitySearchNav = localStorage.getItem('CityName').toLocaleLowerCase().replace(' ', '-');
    var windowWidth = $(window).width();
    $(window).scroll(function () {
      if ($(this).scrollTop() > 250) {
        $('#homepge_nav').addClass('hme_back');
        $('#refer_li').addClass('scroll_offer');
        $('#refer_li').removeClass('refer_earn');
        $('#top_right').removeClass('top_row_right2');
        $('#top_right').addClass('top_row_right');
        $('#brgr_white').hide();
        $('#brgr_ash').show();
      }
      if ($(this).scrollTop() < 250) {
        $('#homepge_nav').removeClass('hme_back');
        $('#refer_li').removeClass('scroll_offer');
        $('#refer_li').addClass('refer_earn');
        $('#top_right').removeClass('top_row_right');
        $('#top_right').addClass('top_row_right2');
        $('#brgr_white').show();
        $('#brgr_ash').hide();
      }


      if ($(this).scrollTop() > 140) {
        // $('.top_section_main').css('display', 'none');
        $('.fixed_section_main').css('display', 'block');
        $('.fixed_section_main').addClass('fixed_search');
        $('.Header_parts').addClass('box_shadow');
        $('.Header_parts').css('position', 'fixed');
        $('.Header_parts').css('display', 'block');
      } else {
        // $('.top_section_main').css('display', 'block');
        $('.fixed_section_main').css('display', 'none');
        $('.Header_parts').removeClass('box_shadow');
        $('.Header_parts').css('display', 'none');
      }
    });

    $(document).ready(function () {


      // Add smooth scrolling on all links inside the navbar
      $('#myNavbar a').on('click', function (event) {
        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== '') {
          // Prevent default anchor click behavior
          event.preventDefault();

          // Store hash
          var hash = this.hash;

          // Using jQuery's animate() method to add smooth page scroll
          // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
          $('html, body').animate({
            scrollTop: $(hash).offset().top
          }, 800, function () {

            // Add hash (#) to URL when done scrolling (default click behavior)
            window.location.hash = hash;
          });
        }  // End if
      });

      $('#myNavbar2 a').on('click', function (event) {
        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== '') {
          // Prevent default anchor click behavior
          event.preventDefault();

          // Store hash
          var hash = this.hash;

          // Using jQuery's animate() method to add smooth page scroll
          // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
          $('html, body').animate({
            scrollTop: $(hash).offset().top
          }, 800, function () {

            // Add hash (#) to URL when done scrolling (default click behavior)
            window.location.hash = hash;
          });
        }  // End if
      });

      $('#myNavbarpages a').on('click', function (event) {
        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== '') {
          // Prevent default anchor click behavior
          event.preventDefault();

          // Store hash
          var hash = this.hash;

          // Using jQuery's animate() method to add smooth page scroll
          // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
          $('html, body').animate({
            scrollTop: $(hash).offset().top
          }, 800, function () {

            // Add hash (#) to URL when done scrolling (default click behavior)
            window.location.hash = hash;
          });
        }  // End if
      });
    });
    this.currentCitySearchNav = localStorage.getItem('CityName').toLocaleLowerCase();
    this.citynav = JSON.parse(localStorage.getItem('CityNames'))
    this.selectedLocation = this.SelectCity;

    if (this.citynav === 0) {
      this.recenthide = true
    } else {
      this.recenthide = true;
    }

    let RecentCities = [];
    if (this.citynav && Array.isArray(this.citynav) && this.citynav.length > 0) {
      let decresse5 = this.citynav.length - 5;
      if (decresse5 < 0) decresse5 = 0;
      for (let i = this.citynav.length - 1; i >= decresse5; i--) {
        RecentCities.push(this.citynav[i]);
      }
    }

    for (let n = 0; n < RecentCities.length; n++) {
      var slid2 = [];
      slid2[n] = RecentCities[n];

      this.RecentCityStorage.push(slid2[n]);
    }


    for (var i = 0; i < this.RecentCityStorage.length; i++) {
      var items = JSON.parse(items[i]);
      if (items.itemId == 3) {
        items.splice(i, 1);
      }
    }
  }

  geturlparams() {
    // if (this.router.url.indexOf('bangalore') > -1) {
    //   this.cityId = '1';
    //   this.currentCity = 'bangalore';
    //   this.selectedLocation = this.cityname;
    //   // $('.cityhome').css('margin','100px 0 0 0;');
    // } else if (this.router.url.indexOf('hyderabad') > -1) {
    //   this.cityId = '2';
    //   this.currentCity = 'hyderabad';
    //   this.selectedLocation = 'hyderabad';
    // } else if (this.router.url.indexOf('chennai') > -1) {
    //   this.cityId = '3';
    //   this.currentCity = 'chennai';
    // } else if (this.router.url.indexOf('kochi') > -1) {
    //   this.cityId = '4';
    //   this.currentCity = 'kochi';
    // } else if (this.router.url.indexOf('pune') > -1) {
    //   this.cityId = '5';
    //   this.currentCity = 'pune';
    // }  else if (this.router.url.indexOf('delhi') > -1) {
    //   this.cityId = '6';
    //   this.currentCity = 'delhi';
    // } else if (this.router.url.indexOf('kolkata') > -1) {
    //   this.cityId = '7';
    //   this.currentCity = 'kolkata';
    // } else if (this.router.url.indexOf('mumbai') > -1) {
    //   this.cityId = '8';
    //   this.currentCity = 'mumbai';
    // } else if (this.router.url.indexOf('goa') > -1) {
    //   this.cityId = '9';
    //   this.currentCity = 'goa';
    // } else if (this.router.url.indexOf('gurgaon') > -1) {
    //   this.cityId = '10';
    //   this.currentCity = 'gurgaon';
    // } else if (this.router.url.indexOf('mysore') > -1) {
    //   this.cityId = '11';
    //   this.currentCity = 'mysore';
    // } else if (this.router.url.indexOf('coimbatore') > -1) {
    //   this.cityId = '12';
    //   this.currentCity = 'coimbatore';
    // } else if (this.router.url.indexOf('ahmedabad') > -1) {
    //   this.cityId = '13';
    //   this.currentCity = 'ahmedabad';
    // } else if (this.router.url.indexOf('trivandrum') > -1) {
    //   this.cityId = '14';
    //   this.currentCity = 'trivandrum';
    // } else if (this.router.url.indexOf('navi') > -1) {
    //   this.cityId = '15';
    //   this.currentCity = 'navi Mumbai';
    // }

    this.onCitySelect();
    import('../footer/footer.module').then(mod => mod.FooterModule).then(FooterModule => {
      this.FooterComponent = FooterModule.components['lazy'];
      this.loaded = true;
    });
  }

  onCitySelect() {
    // if (this.currentCity === 'bangalore') {

    //   this.bangalore = true;
    //   this.hyderabad = false;
    //   this.kochi = false;
    //   this.chennai = false;
    //   this.pune = false;
    //   this.mumbai = false;
    //   this.kolkata = false;
    //   this.amaravathi = false;
    //   this.delhi = false;
    //   this.goa = false;
    //   this.gurgaon = false;
    //   this.mysore = false;
    //   this.coimbatore = false;
    //   this.ahmedabad = false;
    //   this.trivandrum = false;
    //   this.naviMumbai = false;
    // } else if (this.currentCity === 'hyderabad') {
    //   this.bangalore = false;
    //   this.hyderabad = true;
    //   this.kochi = false;
    //   this.chennai = false;
    //   this.pune = false;
    //   this.mumbai = false;
    //   this.kolkata = false;
    //   this.amaravathi = false;
    //   this.delhi = false;
    //   this.goa = false;
    //   this.gurgaon = false;
    //   this.mysore = false;
    //   this.coimbatore = false;
    //   this.ahmedabad = false;
    //   this.trivandrum = false;
    //   this.naviMumbai = false;
    // } else if (this.currentCity === 'kochi') {
    //   this.kochi = true;
    //   this.bangalore = false;
    //   this.hyderabad = false;
    //   this.chennai = false;
    //   this.pune = false;
    //   this.mumbai = false;
    //   this.kolkata = false;
    //   this.amaravathi = false;
    //   this.delhi = false;
    //   this.goa = false;
    //   this.gurgaon = false;
    //   this.mysore = false;
    //   this.coimbatore = false;
    //   this.ahmedabad = false;
    //   this.trivandrum = false;
    //   this.naviMumbai = false;
    // } else if (this.currentCity === 'chennai') {
    //   this.kochi = false;
    //   this.bangalore = false;
    //   this.hyderabad = false;
    //   this.chennai = true;
    //   this.pune = false;
    //   this.mumbai = false;
    //   this.kolkata = false;
    //   this.amaravathi = false;
    //   this.delhi = false;
    //   this.goa = false;
    //   this.gurgaon = false;
    //   this.mysore = false;
    //   this.coimbatore = false;
    //   this.ahmedabad = false;
    //   this.trivandrum = false;
    //   this.naviMumbai = false;
    // } else if (this.currentCity === 'pune') {
    //   this.kochi = false;
    //   this.bangalore = false;
    //   this.hyderabad = false;
    //   this.chennai = false;
    //   this.pune = true;
    //   this.mumbai = false;
    //   this.kolkata = false;
    //   this.amaravathi = false;
    //   this.delhi = false;
    //   this.goa = false;
    //   this.gurgaon = false;
    //   this.mysore = false;
    //   this.coimbatore = false;
    //   this.ahmedabad = false;
    //   this.trivandrum = false;
    //   this.naviMumbai = false;
    // } else if (this.currentCity === 'mumbai') {
    //   this.kochi = false;
    //   this.bangalore = false;
    //   this.hyderabad = false;
    //   this.chennai = false;
    //   this.pune = false;
    //   this.mumbai = true;
    //   this.kolkata = false;
    //   this.amaravathi = false;
    //   this.delhi = false;
    //   this.goa = false;
    //   this.gurgaon = false;
    //   this.mysore = false;
    //   this.coimbatore = false;
    //   this.ahmedabad = false;
    //   this.trivandrum = false;
    //   this.naviMumbai = false;
    // } else if (this.currentCity === 'delhi') {
    //   this.kochi = false;
    //   this.bangalore = false;
    //   this.hyderabad = false;
    //   this.chennai = false;
    //   this.pune = false;
    //   this.mumbai = false;
    //   this.kolkata = false;
    //   this.amaravathi = false;
    //   this.delhi = true;
    //   this.goa = false;
    //   this.gurgaon = false;
    //   this.mysore = false;
    //   this.coimbatore = false;
    //   this.ahmedabad = false;
    //   this.trivandrum = false;
    //   this.naviMumbai = false;
    // } else if (this.currentCity === 'kolkata') {
    //   this.kochi = false;
    //   this.bangalore = false;
    //   this.hyderabad = false;
    //   this.chennai = false;
    //   this.pune = false;
    //   this.mumbai = false;
    //   this.kolkata = true;
    //   this.amaravathi = false;
    //   this.delhi = false;
    //   this.goa = false;
    //   this.gurgaon = false;
    //   this.mysore = false;
    //   this.coimbatore = false;
    //   this.ahmedabad = false;
    //   this.trivandrum = false;
    //   this.naviMumbai = false;
    // } else if (this.currentCity === 'amaravati') {
    //   this.kochi = false;
    //   this.bangalore = false;
    //   this.hyderabad = false;
    //   this.chennai = false;
    //   this.pune = false;
    //   this.mumbai = false;
    //   this.kolkata = false;
    //   this.amaravathi = true;
    //   this.delhi = false;
    //   this.goa = false;
    //   this.gurgaon = false;
    //   this.mysore = false;
    //   this.coimbatore = false;
    //   this.ahmedabad = false;
    //   this.trivandrum = false;
    //   this.naviMumbai = false;
    // } else if (this.currentCity === 'goa') {
    //   this.kochi = false;
    //   this.bangalore = false;
    //   this.hyderabad = false;
    //   this.chennai = false;
    //   this.pune = false;
    //   this.mumbai = false;
    //   this.kolkata = false;
    //   this.amaravathi = false;
    //   this.delhi = false;
    //   this.goa = true;
    //   this.gurgaon = false;
    //   this.mysore = false;
    //   this.coimbatore = false;
    //   this.ahmedabad = false;
    //   this.trivandrum = false;
    //   this.naviMumbai = false;
    // }else if (this.currentCity === 'gurgaon') {
    //   this.kochi = false;
    //   this.bangalore = false;
    //   this.hyderabad = false;
    //   this.chennai = false;
    //   this.pune = false;
    //   this.mumbai = false;
    //   this.kolkata = false;
    //   this.amaravathi = false;
    //   this.delhi = false;
    //   this.goa = false;
    //   this.gurgaon = true;
    //   this.mysore = false;
    //   this.coimbatore = false;
    //   this.ahmedabad = false;
    //   this.trivandrum = false;
    //   this.naviMumbai = false;
    // }else if (this.currentCity === 'mysore') {
    //   this.kochi = false;
    //   this.bangalore = false;
    //   this.hyderabad = false;
    //   this.chennai = false;
    //   this.pune = false;
    //   this.mumbai = false;
    //   this.kolkata = false;
    //   this.amaravathi = false;
    //   this.delhi = false;
    //   this.goa = false;
    //   this.gurgaon = false;
    //   this.mysore = true;
    //   this.coimbatore = false;
    //   this.ahmedabad = false;
    //   this.trivandrum = false;
    //   this.naviMumbai = false;
    // }else if (this.currentCity === 'coimbatore') {
    //   this.kochi = false;
    //   this.bangalore = false;
    //   this.hyderabad = false;
    //   this.chennai = false;
    //   this.pune = false;
    //   this.mumbai = false;
    //   this.kolkata = false;
    //   this.amaravathi = false;
    //   this.delhi = false;
    //   this.goa = false;
    //   this.gurgaon = false;
    //   this.mysore = false;
    //   this.coimbatore = true;
    //   this.ahmedabad = false;
    //   this.trivandrum = false;
    //   this.naviMumbai = false;
    // }else if (this.currentCity === 'ahmedabad') {
    //   this.kochi = false;
    //   this.bangalore = false;
    //   this.hyderabad = false;
    //   this.chennai = false;
    //   this.pune = false;
    //   this.mumbai = false;
    //   this.kolkata = false;
    //   this.amaravathi = false;
    //   this.delhi = false;
    //   this.goa = false;
    //   this.gurgaon = false;
    //   this.mysore = false;
    //   this.coimbatore = false;
    //   this.ahmedabad = true;
    //   this.trivandrum = false;
    //   this.naviMumbai = false;
    // }else if (this.currentCity === 'trivandrum') {
    //   this.kochi = false;
    //   this.bangalore = false;
    //   this.hyderabad = false;
    //   this.chennai = false;
    //   this.pune = false;
    //   this.mumbai = false;
    //   this.kolkata = false;
    //   this.amaravathi = false;
    //   this.delhi = false;
    //   this.goa = false;
    //   this.gurgaon = false;
    //   this.mysore = false;
    //   this.coimbatore = false;
    //   this.ahmedabad = false;
    //   this.trivandrum = true;
    //   this.naviMumbai = false;
    // }else if (this.currentCity === 'navi Mumbai') {
    //   this.kochi = false;
    //   this.bangalore = false;
    //   this.hyderabad = false;
    //   this.chennai = false;
    //   this.pune = false;
    //   this.mumbai = false;
    //   this.kolkata = false;
    //   this.amaravathi = false;
    //   this.delhi = false;
    //   this.goa = false;
    //   this.gurgaon = false;
    //   this.mysore = false;
    //   this.coimbatore = false;
    //   this.ahmedabad = false;
    //   this.trivandrum = false;
    //   this.naviMumbai = true;
    // }
    this.getTopLocalities();
  }

  getTopLocalities() {
    var paramss = {
      cityId: this.cityId,
    };
    this.dataService.getTopLocalities(paramss).subscribe((newProperties: any[]) => {
      if (newProperties['status'] === 'True') {
        this.newlaunchesloader = false;
        this.topLocalitiesList = newProperties['localitylimitlist'];
        this.localityOneName = this.topLocalitiesList[0]['localityname'];
        this.localityOneId = this.topLocalitiesList[0]['id'];
        this.localityOneCount = this.topLocalitiesList[0]['locality'][0]['counts'];
        this.localityTwoName = this.topLocalitiesList[1]['localityname'];
        this.localityTwoId = this.topLocalitiesList[1]['id'];
        this.localityTwoCount = this.topLocalitiesList[1]['locality'][0]['counts'];
        this.localityThreeName = this.topLocalitiesList[2]['localityname'];
        this.localityThreeId = this.topLocalitiesList[2]['id'];
        this.localityThreeCount = this.topLocalitiesList[2]['locality'][0]['counts'];
        this.localityFourName = this.topLocalitiesList[3]['localityname'];
        this.localityFourId = this.topLocalitiesList[3]['id'];
        this.localityFourCount = this.topLocalitiesList[3]['locality'][0]['counts'];
        this.localityFiveName = this.topLocalitiesList[4]['localityname'];
        this.localityFiveId = this.topLocalitiesList[4]['id'];
        this.localityFiveCount = this.topLocalitiesList[4]['locality'][0]['counts'];
        this.localitySixName = this.topLocalitiesList[5]['localityname'];
        this.localitySixId = this.topLocalitiesList[5]['id'];
        this.localitySixCount = this.topLocalitiesList[5]['locality'][0]['counts'];
      } else {
        this.newlaunchesloader = true;
      }
    });
  }

  // getlocalitycount(){
  //   var citiname = this.currentCity;
  //   var limitparam = 0;
  //   var limitprprtyrows = 6;
  //   var locid = this.localityOneId
  //   var param = {
  //     limit: limitparam,
  //     limitrows: limitprprtyrows,
  //     locality: locid
  //   }
  //   console.log(param)
  //   this.dataService.getprojectscount(citiname, param).subscribe(projectcount => {
  //     let locationcount = projectcount['Counts'];
  //     this.sarjapurcount = locationcount[0].PropertyCounts;
  //   });
  // }
  onLocalityOneClick(name, id) {
    const propertytype = name;
    const proptype = propertytype.replace(/\s+/g, '-').toLowerCase();
    const proptypeid = id;
    const cityName = this.currentCity.toLowerCase();
    this.router.navigate([cityName + '/' + 'property-sale-in-' + proptype + '-' + proptypeid]);
  }

  onresize() {
    const width = this.window.innerWidth;
    if (width > 420) {
      this.hidemobile = true;
      this.hidedesktop = false;
    } else {
      this.hidemobile = false;
      this.hidedesktop = true;
    }
  }

  semanticjquery() {
    $('.ui.dropdown').dropdown({});
  }

  openFixedNav() {
    document.getElementById('FixedmySidenavs').style.width = '250px';
  }

  closeFixedNav() {
    document.getElementById('FixedmySidenavs').style.width = '0';
  }

  clickNavopen() {
    document.getElementById('mySidenavsss').style.width = '250px';
    $('body').css('overflow', 'hidden')

  }

  clickNavclose() {
    document.getElementById('mySidenavsss').style.width = '0';
    $('body').css('overflow', 'scroll')

  }

  // citiess:any;
  // cityid: any;
  selected: any;
  // currentCity: any;

  // public displayname(value) {
  //   if (value) {
  //     return value.name;
  //   }
  // }
  // Based_On_City_Click
  // getclickAuto(cityid){
  //   this.dataService.getAuto(cityid).subscribe(myLocalList => {
  //     // this.dataService = this.completerService.local(myLocalList, 'name', 'name');
  //     this.apioptions(myLocalList['autolist']);
  //   })
  // }
  // Based_On_City_Click
  // Based_On_First_Load

  getAutocomp() {

    if (this.router.url.indexOf('bangalore') > -1) {
      this.cityId = '1';
      this.currentCity = this.cityname;
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
    } else {
      this.cityId = localStorage.getItem('CityID');
      this.currentCity = localStorage.getItem('CityName');

    }
    this.dataService.getAuto(this.cityId).subscribe(myLocalList => {
      this.apioptions(myLocalList['autolist']);
    });
  }


  //  best offers
  // getOffers() {
  //   this.bestoffesrloader = true;
  //   var id = '1';
  //   this.dataService.getcityofferslist(id).subscribe(offers => {
  //     this.offers = offers['deatils'];
  //     this.shuffle(this.offers);
  //     this.bestoffesrloader = false;
  //   });
  // }

  //  best offers

  shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    // return a;
    this.offers = a;
  }

  getapartmentscount() {
    var citiname = this.currentCity;
    var limitparam = 0;
    var limitprprtyrows = 6;
    var param = {
      limit: limitparam,
      limitrows: limitprprtyrows,
      proptypeid: '50401',
    };
    this.dataService.getprojectscount(citiname, param).subscribe(projectcount => {
      this.apartmentcount = projectcount['Counts'][0].PropertyCounts;
    });
  }

  getvillacount() {
    var citiname = this.currentCity;
    var limitparam = 0;
    var limitprprtyrows = 6;
    var param = {
      limit: limitparam,
      limitrows: limitprprtyrows,
      proptypeid: '50402',
    };
    this.dataService.getprojectscount(citiname, param).subscribe(projectcount => {
      this.villacount = projectcount['Counts'][0].PropertyCounts;
    });
  }

  getplotcount() {
    var value = this.cityservice.cityfinder(this.router.url);
    this.cityname = value.cityname.replace('-', ' ');
    const limite = 0;
    const limitrows = 6;
    const status = '50307';
    const proptypeid = '50401';
    var param = {
      limit: limite,
      limitrows: limitrows,
      statusid: status,
      proptypeid: proptypeid

    };
    this.dataService.getprojectscount(this.cityname, param).subscribe(countprojects => {
      let projectcount = countprojects['Counts'];
      this.readyToMoveprojectcount = projectcount[0].PropertyCounts;
    });


    const status1 = '50310,50308';
    var param1 = {
      limit: limite,
      limitrows: limitrows,
      statusid: status1,
    };
    this.dataService.getprojectscount(this.cityname, param1).subscribe(countprojects => {
      let projectcount = countprojects['Counts'];
      this.newLaunchesprojectcount = projectcount[0].PropertyCounts;
    });



    var param2 = {
      limit: limite,
      limitrows: limitrows,
      proptypeid: proptypeid,
      minprice: '1',
      maxprice: '6'
    };
    this.dataService.getprojectscount(this.cityname, param2).subscribe(countprojects => {
      let projectcount = countprojects['Counts'];
      this.affordableprojectcount = projectcount[0].PropertyCounts;
    });


    var param3 = {
      limit: limite,
      limitrows: limitrows,
      proptypeid: proptypeid,
      minprice: '7',
      maxprice: '24'
    };
    this.dataService.getprojectscount(this.cityname, param3).subscribe(countprojects => {
      let projectcount = countprojects['Counts'];
      this.luxuryprojectcount = projectcount[0].PropertyCounts;
    });





    // let id = '1';
    var paramss = {
      cityId: this.cityId,
    };
    // 
    // this.dataService.getnewproperties(paramss).subscribe((newProperties: any[]) => {
    //   if (newProperties['status'] === 'True') {
    //     this.newlaunchesloader = false;
    //     this.newProperties = newProperties['deatils'];
    //   } else {
    //     this.newlaunchesloader = true;
    //   }
    // });

    var citiname = this.currentCity;
    var limitparam = 0;
    var limitprprtyrows = 6;
    var paramsss = {
      limit: limitparam,
      limitrows: limitprprtyrows,
      proptypeid: '50403',
    };
    this.dataService.getprojectscount(citiname, paramsss).subscribe(projectcount => {
      this.plotcount = projectcount['Counts'][0].PropertyCounts;
    });
  }

  applinkClick() {
    window.location.hash = 'AppInstallLink';
    window.location.href = 'https://play.google.com/store/apps/details?id=vsnap.homes247.in&showAllReviews=true';
  }

  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }

  isInWishlist(propertyID: number): boolean {
    return this.storagearr.includes(propertyID);
  }


  propertyid: any;
  Heart_Transtion(propertyID: number) {
    // ;
    const index = this.storagearr.indexOf(propertyID);
    if ('userID' in localStorage) {
      this.propertyid = propertyID;
      const userid = localStorage.getItem('userID');
      var param = {
        userid: userid,
        propid: this.propertyid,
        CatagoryId: 1
      };
      this.dataService.addfavaourite(param).subscribe(response => {

      });
      let rentalPropertyIDs = JSON.parse(localStorage.getItem('propertyID') || '[]');
      if (!rentalPropertyIDs.includes(propertyID)) {
        rentalPropertyIDs.push(propertyID);
        this.storagearr.push(propertyID);

      } else {
        this.storagearr.splice(index, 1);
        rentalPropertyIDs = rentalPropertyIDs.filter(id => id !== propertyID);
      }
      localStorage.setItem('propertyID', JSON.stringify(rentalPropertyIDs));
    } else {
      const index = this.storagearr.indexOf(propertyID);
      if (index !== -1) {
        this.storagearr.splice(index, 1);
      }
      else {
        this.storagearr.push(propertyID);
      }
      localStorage.setItem('propertyID', JSON.stringify(this.storagearr));
    }
  }


  // onDocumentClick(event: MouseEvent): void {
  //   const target = event.target as HTMLElement;
  //   const clickedInside = target.closest('.dropdown');
  //   if (!clickedInside) {
  //     this.dropdownVisible = false;
  //   }
  // }

  // toggleDropdown(event: MouseEvent) {
  //   event.stopPropagation(); // Prevent body listener
  //   this.dropdownVisible = !this.dropdownVisible;
  // }

  ShowHidecontact1() {

    // this.router.navigateByUrl(this.router.url.split('?')[0], { replaceUrl: true });

    $('#FirstCityModal').modal('show');
    $('.modal-backdrop').removeClass('modal-backdrop fade show');

    // Show the modal


    // Close the modal
    // $('#selectCityModal').modal('hide');
    // this.IsVisibleMat = true
    $('.matAuto').css('display', 'block');

    // this.IsVisible = this.IsVisible ? false : true;
  }

  getProjectsmain1(SelectCity) {
    if (this.SelectCity === 'Select City') {
      swal({
        title: 'Please Select city',
        type: 'error',
        showConfirmButton: false,
        timer: 1500
      });
    }
  }
}
