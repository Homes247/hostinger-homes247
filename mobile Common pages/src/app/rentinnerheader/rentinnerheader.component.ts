import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { DataService } from '../data.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { WINDOW } from '@ng-toolkit/universal';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { CityService } from '../city.service';

declare var $: any;

declare var $: any;
@Component({
  selector: 'app-rentinnerheader',
  templateUrl: './rentinnerheader.component.html',
  styleUrls: ['./rentinnerheader.component.css']
})
export class RentinnerheaderComponent implements OnInit {
  userlogin = false;
  loginshow = true;
  changeText: boolean;
  myControl = new FormControl();
  options;
  filteredOptions: Observable<any>;
  hidemobile: boolean;
  hidedesktop: boolean;
  locationSelectedId = '1';
  searchstring: any;
  // defined the array of data
  public autoCompleteData: { [key: string]: Object }[] = [];

  // maps the appropriate column to fields property
  public fields: Object = { groupBy: 'title', value: 'name' };

  // set the placeholder to the AutoComplete input
  public text: string = "Enter a location";
  //enable the highlight property to highlight the matched character in suggestion list
  public highlight: Boolean = true;
  //set the minLength to restrict the remote request until search key contains 3 characters.
  public minLength: Number = 2;
  constructor(
    private router: Router,
    private _location: Location,
    public Service: DataService,
    public cityservice: CityService,
    @Inject(WINDOW) private window: Window
  ) {
    this.changeText = false;

  }

  ngOnInit() {
    this.getlocationlist();
    this.getAutocomp();
    this.semanticjquery();
    this.Login();
    var windowWidth = $(window).width();


    const urlcity = localStorage.getItem('CityName');
    this.currentCity = urlcity;


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
      if (windowWidth <= 480) {
        if ($(this).scrollTop() > 250) {

        }
        if ($(this).scrollTop() < 250) {

        }
      }

      if ($(this).scrollTop() > 140) {
        $('.top_section_main').css('display', 'none');
        $('.fixed_section_main').css('display', 'block');
        $('.fixed_section_main').addClass('fixed_search');
      } else {
        $('.top_section_main').css('display', 'block');
        $('.fixed_section_main').css('display', 'none');
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
  }
  closeAndroidApp() {
    $('.androidApp').css('display', 'none');
  }

  username: any;
  UserId: any;

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
    document.getElementById('mySidenavs').style.width = '250px';
  }

  clickNavclose() {
    document.getElementById('mySidenavs').style.width = '0';
  }

  citiess: any;
  cityid: any;
  selected: any;
  currentCity;


  getlocationlist() {
    this.Service.getlocationlist().subscribe(city => {
      // 
      this.citiess = city['locations'];
      this.selectedLocation = this.citiess[0]['city'];
      var value = this.cityservice.cityfinder(this.router.url);
      this.currentCity = value.cityname;
      // if (this.router.url.indexOf('bangalore') > -1) {
      //   // this.routerCityName = 'bangalore';
      //   this.currentCity = 'Bangalore';
      // } else if (this.router.url.indexOf('hyderabad') > -1) {
      //   // this.routerCityName = 'hyderabad';
      //   this.currentCity = 'Hyderabad';
      // } else if (this.router.url.indexOf('chennai') > -1) {
      //   // this.routerCityName = 'chennai';
      //   this.currentCity = 'Chennai';
      // } else if (this.router.url.indexOf('kochi') > -1) {
      //   // this.routerCityName = 'kochi';
      //   this.currentCity = 'Kochi';
      // } else if (this.router.url.indexOf('pune') > -1) {
      //   // this.routerCityName = 'pune';
      //   this.currentCity = 'Pune';
      // } else if (this.router.url.indexOf('delhi') > -1) {
      //   // this.routerCityName = 'delhi';
      //   this.currentCity = 'Delhi';
      // } else if (this.router.url.indexOf('kolkata') > -1) {
      //   // this.routerCityName = 'kolkata';
      //   this.currentCity = 'Kolkata';
      // } else if (this.router.url.indexOf('mumbai') > -1) {
      //   // this.routerCityName = 'mumbai';
      //   this.currentCity = 'Mumbai';
      // } else if (this.router.url.indexOf('amaravati') > -1) {
      //   // this.routerCityName = 'amaravati';
      //   this.currentCity = 'Amaravati';
      // }
    });
  }

  selectionChange(event) {
    const cityName = event.value;
    localStorage.setItem('CityName', cityName);
    this.currentCity = cityName;
    var city = this.currentCity.toLowerCase();
    this.router.navigate(['/rent/house-for-rent-in-' + city]);
    // 
    // if (cityName === 'Bangalore') {
    //   this.locationSelectedId = '1';
    //   localStorage.setItem('CityID', '1');
    // } else if (cityName === 'Hyderabad') {
    //   this.locationSelectedId = '2';
    //   localStorage.setItem('CityID', '2');
    // } else if (cityName === 'Chennai') {
    //   this.locationSelectedId = '3';
    //   localStorage.setItem('CityID', '3');
    // } else if (cityName === 'Kochi') {
    //   this.locationSelectedId = '4';
    //   localStorage.setItem('CityID', '4');
    // } else if (cityName === 'Pune') {
    //   this.locationSelectedId = '5';
    //   localStorage.setItem('CityID', '5');
    // } else if (cityName === 'Delhi') {
    //   this.locationSelectedId = '6';
    //   localStorage.setItem('CityID', '6');
    // } else if (cityName === 'Kolkata') {
    //   this.locationSelectedId = '7';
    //   localStorage.setItem('CityID', '7');
    // } else if (cityName === 'Mumbai') {
    //   this.locationSelectedId = '8';
    //   localStorage.setItem('CityID', '8');
    // } else if (cityName === 'Goa') {
    //   this.locationSelectedId = '9';
    //   localStorage.setItem('CityID', '9');
    // } else if (cityName === 'Amaravati') {
    //   this.locationSelectedId = '10';
    //   localStorage.setItem('CityID', '10');
    // }

    this.getclickAuto(this.locationSelectedId);
  }

  public displayname(value) {
    if (value) {
      return value.name;
    }
  }
  componentloads= false;
  @HostListener('window:scroll', ['$event'])
  @HostListener('touchstart', ['$event'])
  onWindowScroll() {
    this.Service.mouseenterservice3();
    if (this.componentloads == false) {
      this.componentloads = true;
      this.getAutocomp();
    }
    }
  // Based_On_City_Click
  getclickAuto(cityid) {
    this.Service.getAuto(cityid).subscribe(myLocalList => {
      // this.dataService = this.completerService.local(myLocalList, 'name', 'name');
      this.apioptions(myLocalList['autolist']);
    });
  }

  // Based_On_City_Click
  // Based_On_First_Load
  getAutocomp() {
    // if (this.router.url.indexOf('bangalore') > -1) {
    //   this.cityid = '1';
    //   this.currentCity = 'Bangalore';
    // } else if (this.router.url.indexOf('hyderabad') > -1) {
    //   this.cityid = '2';
    //   this.currentCity = 'Hyderabad';
    // } else if (this.router.url.indexOf('chennai') > -1) {
    //   this.cityid = '3';
    //   this.currentCity = 'Chennai';
    // } else if (this.router.url.indexOf('kochi') > -1) {
    //   this.cityid = '4';
    //   this.currentCity = 'Kochi';
    // } else if (this.router.url.indexOf('pune') > -1) {
    //   this.cityid = '5';
    //   this.currentCity = 'Pune';
    // } else if (this.router.url.indexOf('delhi') > -1) {
    //   this.cityid = '6';
    //   this.currentCity = 'Delhi';
    // } else if (this.router.url.indexOf('kolkata') > -1) {
    //   this.cityid = '7';
    //   this.currentCity = 'Kolkata';
    // } else if (this.router.url.indexOf('mumbai') > -1) {
    //   this.cityid = '8';
    //   this.currentCity = 'Mumbai';
    // } else if (this.router.url.indexOf('goa') > -1) {
    //   this.cityid = '9';
    //   this.currentCity = 'Goa';
    // } else {
    //   this.cityid = localStorage.getItem('CityID');
    //   this.currentCity = localStorage.getItem('CityName');
    // }
    var value = this.cityservice.cityfinder(this.router.url);
    this.currentCity = value.cityname;
    // this.cityname = value.cityname;
    this.cityid = value.cityid;
    this.Service.getAuto(this.cityid).subscribe(myLocalList => {
      this.apioptions(myLocalList['autolist']);
      this.autoCompleteData = myLocalList['autolist'];
    });
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

  // Based_On_First_Load
  selectedLocation;
  selectEvent(event) {
    
    var currentCity = event.itemData.city;
    var selected = event.itemData;
    this.onItemSelect(selected);
  }
  onItemSelect(selected) {
    var currentCity = selected.city;
    // this.getProjectsmain(currentCity,selected);
    var cityname = currentCity.toLowerCase();
    if (localStorage.getItem('CityName') === null) {
      // this.currentCity = 'Bangalore';
      // localStorage.setItem('CityName', currentCity);
      // localStorage.setItem('ReraID', '');
      // var cityname = currentCity.toLowerCase();
      // this.router.navigate([cityname + '/property-sale']);
    } else {
      // this.currentCity = localStorage.getItem("CityName");
      // var cityname = this.currentCity.toLowerCase();
      // this.router.navigate([cityname + '/property-sale'],{ queryParams: { Searches: this.searchstring} });
    }
    // var selectedcity = localStorage.getItem('CityName');


    if (selected.type == 'builder_name') {
      // var buildname = selected.name;
      // this.searchstring = buildname;
      // var buildername = buildname.replace(/\s+/g, '-').toLowerCase();
      // var buildid = selected.id;
      // localStorage.setItem('BuilderName', buildname);
      // localStorage.setItem('BuilderId', buildid);
      // // this.cookieService.set('BuilderName', buildername );
      // // this.cookieService.set('BuilderId', buildid );
      // this.router.navigate([cityname + '/builder/' + buildername + '-' + buildid]);
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
      // this.router.navigate([cityname + '/' + staticlocurl + '-' + localityname + '-' + locid]);
      this.router.navigate(['/rent/flats-for-rent-in-' + localityname + '-' + this.currentCity.toLowerCase() + '-' + locid]);
    } else {
    }
    if (selected.type == 'regions') {
      // var zone = selected.name;
      // this.searchstring = zone;
      // var zonename = zone.replace(/\s+/g, '-').toLowerCase();
      // var zoneid = selected.id;
      // localStorage.setItem('Zone', zone);
      // localStorage.setItem('ZoneId', zoneid);
      // // this.cookieService.set('Zone', zonename );
      // // this.cookieService.set('ZoneId', zoneid );
      // this.router.navigate([cityname + '/zone/' + zonename + '-' + zoneid]);
    } else {
    }
    if (selected.type == 'status') {
      // var status = selected.name;
      // this.searchstring = status;
      // var statusname = status.replace(/\s+/g, '-').toLowerCase();
      // var statusid = selected.id;
      // localStorage.setItem('Status', status);
      // localStorage.setItem('StatusId', statusid);
      // // this.cookieService.set('Status', statusname );
      // // this.cookieService.set('StatusId', statusid );
      // this.router.navigate([cityname + '/status/' + statusname + '-' + statusid]);
    } else {
    }
    if (selected.type == 'PropType') {
      // var propertytype = selected.name;
      // this.searchstring = propertytype;
      // var proptype = propertytype.replace(/\s+/g, '-').toLowerCase();
      // var proptypeid = selected.id;
      // localStorage.setItem('PropType', propertytype);
      // localStorage.setItem('ProptypeId', proptypeid);
      // // this.cookieService.set('PropType', proptype );
      // // this.cookieService.set('ProptypeId', proptypeid );
      // this.router.navigate([cityname + '/sale/' + proptype + '-' + proptypeid]);
    } else {
    }
    if (selected.type == 'reraId') {
      // var reraid = selected.id;
      // this.searchstring = reraid;
      // localStorage.setItem('ReraID', reraid);
      // // this.cookieService.set('ReraID', reraid );
      // this.router.navigate([cityname + '/property-sale']);
    } else {
    }
    if (selected.type == 'property_name') {
      // var propname = selected.name;
      // this.searchstring = propname;
      // var propurlname = propname.replace(/\s+/g, '-').toLowerCase();
      // var propid = selected.id;
      // var proplocality = selected.locality;
      // var locurlname = proplocality.replace(/\s+/g, '-').toLowerCase();
      // this.router.navigate([]).then(result => {
      //   window.open('/property/' + cityname + '/' + locurlname + '/' + propurlname + '-' + propid, '_blank');
      // });
    } else {
    }

  }

  getProjectsmain() {
    var city = this.currentCity.toLowerCase();
    this.router.navigate(['/rent/house-for-rent-in-' + city]);
    // if (this.currentCity === 'Bangalore') {
    //   this.router.navigate(['/rent/house-for-rent-in-bangalore']);
    // } else if (this.currentCity === 'Hyderabad') {
    //   this.router.navigate(['/rent/house-for-rent-in-hyderabad']);
    // } else if (this.currentCity === 'Chennai') {
    //   this.router.navigate(['/rent/house-for-rent-in-chennai']);
    // } else if (this.currentCity === 'Kochi') {
    //   this.router.navigate(['/rent/house-for-rent-in-kochi']);
    // } else if (this.currentCity === 'Pune') {
    //   this.router.navigate(['/rent/house-for-rent-in-pune']);
    // } else if (this.currentCity === 'Mumbai') {
    //   this.router.navigate(['/rent/house-for-rent-in-mumbai']);
    // } else if (this.currentCity === 'Delhi') {
    //   this.router.navigate(['/rent/house-for-rent-in-delhi']);
    // } else if (this.currentCity === 'Kolkata') {
    //   this.router.navigate(['/rent/house-for-rent-in-kolkata']);
    // } else if (this.currentCity === 'Amaravati') {
    //   this.router.navigate(['/rent/house-for-rent-in-amaravati']);
    // } else if (this.currentCity === 'Goa') {
    //   this.router.navigate(['/rent/house-for-rent-in-goa']);
    // }
  }

  applinkClick(){
    window.location.hash = 'AppInstallLink';
    window.location.href = 'https://play.google.com/store/apps/details?id=vsnap.homes247.in&showAllReviews=true';
  }

}
