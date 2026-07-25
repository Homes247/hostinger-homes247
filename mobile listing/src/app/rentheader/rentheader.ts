import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, ElementRef, HostListener, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { Router, RouterModule } from '@angular/router';
// import { CountdownComponent, CountdownModule } from 'ngx-countdown';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AllindiaService } from '../allindia.service';
import { CityService } from '../city.service';
import { DataService } from '../data.service';
import { Enquiry, User } from '../home/home';
import { CountdownComponent } from 'ngx-countdown';
import { HomeSidenavbar } from '../home-sidenavbar/home-sidenavbar';

declare var $: any;
declare var swal: any;

@Component({
  selector: 'app-rentheader',
  templateUrl: './rentheader.html',
  styleUrls: ['./rentheader.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HomeSidenavbar
    // CountdownModule,
  ],
})
export class Rentheader implements OnInit {
  @ViewChild('cancel') cancel: ElementRef;
  @ViewChild('scrollapiloader') scrollapiloader: ElementRef;
  @ViewChild('cd', { static: false }) private countdown: CountdownComponent;

  id: any;
  products = [];
  metas = [];
  citiess: any;
  SelectCity = 'Select City';
  selectedLocation: any;
  topProperties = [];
  newProperties = [];
  testimonialListing: any;
  blogs: any;
  loginshow = true;
  userlogin = false;
  propertyname: any;
  cityid: any;
  currentCity: any;
  searchstring: any;

  date: any;
  user = new User();
  enquiry = new Enquiry();
  blogsloader = true;
  newlaunchesloader = true;
  topprojectsloader = true;

  myControl = new FormControl();
  options: any;
  filteredOptions: Observable<any>;
  currentCitySearchNav: any;
  locationSelectedId = '1';

  changeText: boolean = false;
  hidemobile: boolean;
  hidedesktop: boolean;
  Autocomplete: any;
  pageTitleSeo: any;
  pageDescriptionSeo: any;
  dateModified: any;
  urlcityname: any;
  // Matautocomplete: any;

  public autoCompleteData: { [key: string]: Object }[] = [];
  public fields: Object = { groupBy: 'title', value: 'name' };
  public text: string = 'Search by locality';
  public highlight: Boolean = true;
  public minLength: Number = 2;

  // private window = window;

  constructor(
    private router: Router,
    public Service: DataService,
    private allindia: AllindiaService,
    private dataService: DataService,
    public cityservice: CityService,
    private _formBuilder: FormBuilder,
    private titleService: Title,
    private meta: Meta,

    @Inject(DOCUMENT) private doc: any,
  ) {
    this.window = this.doc.defaultView!;

    this.changeText = false;
    this.router.events.subscribe((evt) => {
      this.router.navigated = false;
      window.scrollTo(0, 0);
    });
    // import('../ejs-autocomplete/ejs-autocomplete-module').then(mod => mod.EjsAutocompleteModule).then(EjsAutocompletModule => {
    //   this.Autocomplete = EjsAutocompletModule.components['lazy'];
    //   this.loaded = true;
    // });
  }
  window!: Window;

  scrollTo(section: any) {
    document.querySelector('#' + section).scrollIntoView();
  }

  ngAfterViewInit(): void {
    $('.ui.dropdown').dropdown({});
  }

  ngOnInit() {
    this.dateModified = new Date();
    this.getlocationlist();
    this.semanticjquery();
    this.Login();
    this.selectedLocation = this.SelectCity;
  }

  imagepath: any
  propertyimage: any
  blogimagePath: any
  testimonialImage: any
  dataLoads() {
    this.imagepath = this.dataService.imagesURL + 'cities/';
    this.propertyimage = this.dataService.imagesURL + 'uploadPropertyImgs/';
    this.blogimagePath = this.dataService.imagesURL + 'stories/';
    this.testimonialImage = this.dataService.imagesURL + 'TestimonialImage/';
  }

  closeAndroidApp() {
    $('.androidApp').css('display', 'none');
  }

  username: any;
  UserId: any;
  IsVisible = false;
  IsVisibleMat = false;
  loadAutoComplete = false;

  nevigateToList() {
    this.router.navigate(['/rent/house-for-rent-in-' + this.currentCity.replace(/\s+/g, '-').toLowerCase()]);
  }

  ShowHidecontact() {
    // alert('hai')
    // import('../mat-autocomplete/mat-autocomplete-module').then(mod => mod.MatAutocompleteModuless).then(MatAutocompleteModuless => {
    //   this.Matautocomplete = MatAutocompleteModuless.components['lazy'];
    // });
    $('#FirstCityModal').modal('show');
    $('.modal-backdrop').removeClass('modal-backdrop fade show');
    $('.matAuto').css('display', 'block');
  }

  Login() {
    const loginid = localStorage?.getItem('loginID');
    const username = localStorage?.getItem('userName');
    const userid = localStorage?.getItem('userID');
    if (loginid === '1') {
      this.userlogin = true;
      this.loginshow = false;
      this.username = username;
      this.UserId = userid;
    }
  }

  IsVisiblee = false;
  ShowHide_More() {
    this.IsVisiblee = this.IsVisiblee ? false : true;
  }
  headerOnScroll = false;
  @HostListener('touchstart', ['$event'])
  @HostListener('window:scroll', ['$event'])
  handleTouch(event: any) {
    const scrollTop = window.scrollY;

    if (scrollTop > 80 && !this.headerOnScroll) {
      this.headerOnScroll = true;
    }

    if (scrollTop <= 80 && this.headerOnScroll) {
      this.headerOnScroll = false;
    }
    // import('../footer/footer.module').then(mod => mod.FooterModule).then(FooterModule => {
    //   this.FooterComponent = FooterModule.components['lazy'];
    //   this.loaded = true;
    // });

    if (this.loadAutoComplete == false) {
      this.loadAutoComplete = true;
      this.getAutocomp();
    }

    this.dataService.mouseenterservice3();
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

  Logout() {
    localStorage.clear();
    window.location.reload();
  }

  semanticjquery() {
    // $('.ui.dropdown').dropdown({});
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
        $('.fixed_section_main').css('display', 'block');
        $('.fixed_section_main').addClass('fixed_search');
        $('.Header_parts').addClass('box_shadow');
        $('.Header_parts').css('position', 'fixed');
        $('.Header_parts').css('display', 'block');
        $('.blur').css('display', 'none');
      } else {
        $('.blur').css('display', 'block');
        $('.Header_parts').removeClass('box_shadow');
        $('.Header_parts').css('display', 'none');
        $('.fixed_section_main').css('display', 'none');
      }
    });

    $(document).ready(function () {
      $('#myNavbar a').on('click', function (event: any) {
        if (this.hash !== '') {
          event.preventDefault();
          var hash = this.hash;
          $('html, body').animate({ scrollTop: $(hash).offset().top }, 800, function () {
            window.location.hash = hash;
          });
        }
      });

      $('#myNavbar2 a').on('click', function (event: any) {
        if (this.hash !== '') {
          event.preventDefault();
          var hash = this.hash;
          $('html, body').animate({ scrollTop: $(hash).offset().top }, 800, function () {
            window.location.hash = hash;
          });
        }
      });

      $('#myNavbarpages a').on('click', function (event: any) {
        if (this.hash !== '') {
          event.preventDefault();
          var hash = this.hash;
          $('html, body').animate({ scrollTop: $(hash).offset().top }, 800, function () {
            window.location.hash = hash;
          });
        }
      });
    });
  }

  openFixedNav() {
    document.getElementById('FixedmySidenavs').style.width = '250px';
  }

  closeFixedNav() {
    document.getElementById('FixedmySidenavs').style.width = '0';
  }

  clickNavopen() {
    document.getElementById('mySidenavsss').style.width = '250px';
    $('body').css('overflow', 'hidden');
  }

  clickNavclose() {
    document.getElementById('mySidenavsss').style.width = '0';
    $('body').css('overflow', 'scroll');
  }

  selected: any;

  getAutocomp() {
    var value = this.cityservice.cityfinder(this.router.url);
    this.currentCity = value.cityname;
    this.cityid = value.cityid;
    this.allindia.getAuto(this.cityid).subscribe((response: any) => {
      const myLocalList = response.autolist || response.someOtherProperty;
      if (Array.isArray(myLocalList)) {
        const localityList = myLocalList.filter((item: any) => item.type === 'locality_name');
        this.autoCompleteData = localityList as { [key: string]: Object }[];
      }
    });
  }

  blogapiload = true;
  topnewapiload = true;
  sectionloader = false;
  topnewdivreached = false;
  loaded = false;
  FooterComponent: any;

  onItemSelect(selected: any) {
    var currentCity = selected.city;
    this.getProjectsclick(currentCity, selected);
  }

  selectEvent(event: any) {
    var currentCity = event.itemData.city;
    var selected = event.itemData;
    this.getProjectsclick(currentCity, selected);
  }

  getProjectsclick(currentCity: any, selected: any) {
    this.currentCity = currentCity;
    var cityname = currentCity.toLowerCase();
    if (selected.type == 'locality_name') {
      var locname = selected.name;
      this.searchstring = locname;
      var localityname = locname.replace(/\s+/g, '-').toLowerCase();
      var locid = selected.id;
      localStorage.setItem('LocalityName', locname);
      localStorage.setItem('LocalityId', locid);
      this.router.navigate(['/rental/flats-for-rent-in-' + localityname + '-' + this.currentCity.replace(' ', '-').toLowerCase() + '-' + locid]);
    }
  }

  apioptions(apivalue: any) {
    this.options = apivalue;
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => value.length >= 1 ? this._filter(value) : [])
    );
  }

  private _filter(value: string) {
    const filterValue = value.toLowerCase();
    return this.options.filter((option: any) => option.name.toLowerCase().includes(filterValue));
  }

  getlocationlist() {
    this.dataService.getlocationlist().subscribe((city: any[]) => {
      this.citiess = city['locations'];
      var value = this.cityservice.cityfinder(this.router.url);
      this.currentCity = value.cityname;
      this.cityid = value.cityid;
      this.urlcityname = value.cityname.toLowerCase();
      // alert()
    });
  }

  apartmentroute() {
    if (this.currentCity === 'Select City') {
      swal({ title: 'Please Select city', type: 'error', showConfirmButton: false, timer: 1500 });
    }
  }

  villasroute() {
    if (this.currentCity === 'Select City') {
      swal({ title: 'Please Select city', type: 'error', showConfirmButton: false, timer: 1500 });
    }
  }

  plotsroute() {
    if (this.currentCity === 'Select City') {
      swal({ title: 'Please Select city', type: 'error', showConfirmButton: false, timer: 1500 });
    }
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

  selectionChange(event: any) {
    const city = event.value;
    this.urlcityname = city.toLowerCase();
    this.cityservice.citybasedrouterRentals(city);
    this.currentCity = city;
  }

  getcityname(event: any) {
    var city = event.target.value;
    this.dataService.getlocationlist().subscribe((citynam: any[]) => {
      this.citiess = citynam['locations'];
      for (let i = 0; i <= this.citiess.length; i++) {
        try {
          if (city == this.citiess[i].city) {
            var cityid = this.citiess[i].id;
            this.getclickAuto();
          }
        } catch (e) { }
      }
    });
    this.currentCitySearchNav = localStorage?.getItem('CityName')!.toLocaleLowerCase();
  }

  getclickAuto() {
    this.dataService.allindiaAuto().subscribe((myLocalList: any[]) => {
      if (myLocalList['status'] === 'True') {
        this.apioptions(myLocalList['autolist']);
        var All_autocomplete_1 = myLocalList['autolist'];
        this.dataService.allindiaAuto2().subscribe((myLocalList1: any[]) => {
          if (myLocalList1['status'] === 'True') {
            this.apioptions(myLocalList1['autolist']);
            var All_autocomplete_2 = myLocalList1['autolist'];
            this.autoCompleteData = [...All_autocomplete_1, ...All_autocomplete_2];
          }
        });
      }
    });
  }

  getProjectsmain(currentCity: any) {
    if (this.currentCity === 'Select City') {
      swal({ title: 'Please Select city', type: 'error', showConfirmButton: false, timer: 1500 });
    } else {
      var city = this.currentCity.toLowerCase();
      this.router.navigate(['/rent/house-for-rent-in-' + city]);
    }
  }

  applinkClick() {
    window.location.hash = 'AppInstallLink';
    window.location.href = 'https://play.google.com/store/apps/details?id=vsnap.homes247.in&showAllReviews=true';
  }
}