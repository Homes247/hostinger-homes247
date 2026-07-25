import { CommonModule, isPlatformBrowser, Location } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, DOCUMENT, ElementRef, HostListener, Inject, NgZone, OnDestroy, OnInit, PLATFORM_ID, QueryList, Renderer2, viewChild, ViewChild, ViewChildren } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
// import { CountdownComponent, CountdownEvent, CountdownModule } from 'ngx-countdown';
import { OwlOptions, CarouselModule } from 'ngx-owl-carousel-o';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
// import { InfiniteScrollModule } from 'ngx-infinite-scroll';
// import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgOtpInputModule } from 'ng-otp-input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { PhotoGalleryModule } from '@twogate/ngx-photo-gallery';
import { CityService } from '../city.service';
import { DataService } from '../data.service';
import { FilterService } from '../filter.service';
import { Enquiry } from '../home/home';
import { CountdownComponent, CountdownEvent } from 'ngx-countdown';
import { InnerHeader } from '../inner-header/inner-header';
import { cleanUrlPipe, customPriceFormatPipe, PriceFormatterPipe, SanitizeHtmlPipe } from '../mainpipe-pipe';
import { SafeStorageService } from '../safe-storage.service';
import Swal from 'sweetalert2';
import { ScrollSpyDirective } from '../scroll-spy.directive';
import { ElitedataService } from '../elitedata.service';

// import { PipeModule } from '../pipe/pipe.module';
// import { Shared3Module } from '../shared/shared.module3';
// import { ScrollSpy4Directive } from '../scroll-spy4.directive';

// declare var swal: any;
declare var $: any;

@Component({
  selector: 'app-pg-details',
  templateUrl: './pg-details.html',
  styleUrls: ['./pg-details.css'],
  standalone: true,
  host: { ngSkipHydration: 'true' },
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSkeletonLoaderModule,
    ScrollSpyDirective,
    NgOtpInputModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    PhotoGalleryModule,
    CarouselModule,
    MatProgressBarModule,
    cleanUrlPipe,
    InnerHeader,
    customPriceFormatPipe,
    SanitizeHtmlPipe,
    PriceFormatterPipe,
    CountdownComponent,
  ],
})
export class PgDetailsComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('cd2', { static: false }) private countdown: CountdownComponent;
  @ViewChildren('navItems') navItems: QueryList<ElementRef>;
  @ViewChild('cancel') cancel: ElementRef;

  enquiry = new Enquiry();
  offers: any;
  FooterComponent: any;
  IsVisibleEnquery = false;
  propdetails = [];
  Approval = [];
  Approval1 = [];
  approvalNew: any;
  routeSub: any;

  imagepath = 'https://img-mpg.homes247.in';
  pgServices = 'https://img-mpg.homes247.in/assets/images/individual/active/';
  otploader: boolean = true;
  bhk: any;
  proptype: any;
  propname: any;
  numbernan = false;
  ratingreviews = true;

  averagerating1: any;
  numbernan1 = false;
  ratingreviews1 = true;

  totaluserratings: any;
  totaluserratings1: any;
  reviwcount: any;
  reviwcount1: any;
  reviews: any[] = [];
  reviews1: any[] = [];
  averagerating: any;

  safety: any;
  averageReviewsLoc: any;
  community: any;
  lifestyle: any;

  fivestarcounts: any;
  fourstarcounts: any;
  threestarcounts: any;
  twostarcounts: any;
  onestarcounts: any;

  FiveStarCountHtml: any;
  FourStarCountHtml: any;
  threeStarCountHtml: any;
  TwoStarCountHtml: any;
  OneStarCountHtml: any;

  fivestarcounts1: any;
  fourstarcounts1: any;
  threestarcounts1: any;
  twostarcounts1: any;
  onestarcounts1: any;

  FiveStarCountHtml1: any;
  FourStarCountHtml1: any;
  threeStarCountHtml1: any;
  TwoStarCountHtml1: any;
  OneStarCountHtml1: any;
  Citynamelowcase: any;
  locationnamelowcase: any;

  nearByLocality = [];
  newNearByLocalityArry = [];
  nearByLocalityLen = true;
  cityId: any;
  bhkId: any;
  propRent: any;
  showSimilarProp: boolean;
  propId: any;
  currentCity: any;
  localityname: any;
  bhkValue: any;
  localityid: any;
  mapurl: any;
  commercialPropertiesSale = [];
  citiess: any;
  allBuilders = [];
  topprojectsloader = true;
  blogsloader = true;
  blogs: any;
  commercialPropertiesRent = [];
  UserId: any;
  trendingBlogs: any[] = [];
  blogapiload = true;
  allCommercialProperties = [];
  roomFac: any;
  regionid: any;
  pageOrigin: any;
  cityname: any;
  About_Description = false;
  aboutdiscription: any;
  userRentalFavList = [];
  propertyIds = [];


  rentamount: any;
  contactedRentalarr = [];

  // private storage = localStorage;
  // private window = window;

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
    private Filter: FilterService,
    public cityservice: CityService,
    private _location: Location,
    public Service: DataService,
    private renderer: Renderer2,
    private elRef: ElementRef,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private meta: Meta,
    private storage: SafeStorageService,
    public eliteService: ElitedataService,
    private zone: NgZone,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private doc,
  ) {
    this.window = this.doc.defaultView!;

    this.Service.mouseenterlistenOtp().subscribe((m: any) => {
      if (this.window.location.hash === '#reportissue') {
        this.submitFormReport();
      } else if (this.window.location.hash === '#ViewAddress') {
        this.SubmitForm();
      }
    });
  }

  window!: Window;
  ImageUrl: any
  propertyimage: any
  propertyimageRent: any
  builderLogo: any
  blogimagePath: any
  amenitesImages: any

  coverimage: string = "https://img.homes247.in/images/pg_img/gallery/"

  dataLoads() {
    // this.coverimage = this.Service.PGImg + 'gallery/';
    this.ImageUrl = this.Service.PGImg + 'gallery/';
    this.propertyimage = this.Service.PgCoverImagelink;
    this.propertyimageRent = this.Service.RentCoverImagelink;
    this.builderLogo = this.Service.imagesURL + 'builder/';
    this.blogimagePath = this.Service.blogimageURL + 'stories/';
    this.amenitesImages = this.Service.ImageURL + 'amenites/amenities-new/active/';
  }


  login: boolean = false
  userId: any
  userNumber: any
  contactedList: any
  elitePropertyId: any = [];
  eliteView: boolean = false;
  verificationDetailStatus: any
  contactData: any = {};
  ngOnInit(): void {
    this.dataLoads()
    this.getpropDetailsBYId();



  }

  randomnumber: any;
  numberOfViewers: any = 0;
  resetView() {
    this.numberOfViewers = Math.floor(Math.random() * (50 - 10 + 1)) + 10;
    this.storage.setItem('viewCount', this.numberOfViewers);
    this.storage.setItem('lastUpdated', String(Date.now()));
  }

  mousemovement = false;

  @HostListener('window:scroll', [])
  @HostListener('touchstart', [])
  onWindowScroll() {
    this.coverimage = this.Service.PGImg + 'gallery/';

    this.Service.mouseenterservice3(); // sam


    this.mousemovement = true;

    $('.agreementPopup').css('display', 'none');


  }

  onclickshare(data: any) {
    if ((window.navigator as any).share) {
      (window.navigator as any).share({
        title: 'Checkout this Property - ' + data.property_name,
        text: 'Check out ' + 'Test',
        url: 'https://www.homes247.in' + this.router.url,
      })
        .then(() => console.log('Shared successfully'))
        .catch((error: any) => console.error('Error sharing:', error));
    }
  }

  onclickshareSimilarprop(data: any) {
    if ((window.navigator as any).share) {
      (window.navigator as any).share({
        title: 'Checkout this Property - ' + data.property_name,
        text: 'Check out ' + 'Test',
        url: 'https://www.homes247.in' + `/pgd/pg-for-rent-in-${data.city_name}-${data.prope_ID}`,
      })
        .then(() => console.log('Shared successfully'))
        .catch((error: any) => console.error('Error sharing:', error));
    } else {
      console.log('Web Share API not supported on this device.');
    }
  }

  onclickshareNearBy(data: any) {
    if ((window.navigator as any).share) {
      (window.navigator as any).share({
        title: 'Checkout this Property - ' + data.property_name,
        text: 'Check out ' + 'Test',
        url: 'https://www.homes247.in' + `/pgd/pg-for-rent-in-${data.city_name}-${data.prope_ID}`,
      })
        .then(() => console.log('Shared successfully'))
        .catch((error: any) => console.error('Error sharing:', error));
    } else {
      console.log('Web Share API not supported on this device.');
    }
  }

  Apex: any;
  amenitiesHide = false;
  FacilitiesHide = false;
  userID: any;
  propAllIssue: any[] = [];
  propertyTypeId: any;
  onSelectionChange() { }

  selectedOption: any;

  submitFormReport() {
    var usernumber = this.storage.getItem('userNumber');
    var userName = this.storage.getItem('userName');
    var loginId = this.storage.getItem('loginID');
    if (loginId === '1') {
      this.otploader = true;
      var param = {
        propId: this.propId,
        report_IDFK: this.selectedOption.IDPK,
        report_name: this.selectedOption.report_types,
        username: userName,
        usernumber: usernumber,
      };
      this.Service.submitOption(param).subscribe((responce) => {
        if ((responce['status'] = 'True')) {
          this.otploader = false;
          this.propAllIssue.forEach(propIssue => {
            propIssue.isSelected = false;
          });
          $('.modal_close').click();
          $('.modal-backdrop').remove();
          Swal.fire({ title: 'Report Filed Successfully', text: 'Thank you for your Support', icon: 'success', showConfirmButton: false, timer: 2500 });
        }
      });
    } else {
      window.location.hash = 'reportissue';
      $('#otpValidate').css('display', 'block');
      if (this.loadComponent == false) {
        this.loadComponent = true;
        // import('../otp-validation/otp-validation.module').then(mod => mod.OtpValidationModule).then(otpValidationComponent => {
        //   this.otpValidationComponent = otpValidationComponent.components['lazy'];
        // });
        this.Visiblebrochure = this.Visiblebrochure ? false : true;
        $('.modal-login').css('z-index', '1');
      }
    }
  }

  otpValidationComponent: any;
  loadComponent = false;
  Visiblebrochure = false;

  ngAfterViewInit() {

    this.lazyloadingApis()
    this.getlocationlist();



    const lastUpdated = this.storage.getItem('lastUpdated');
    const savedViewCount = this.storage.getItem('viewCount');
    const nowtime = Date.now();
    if (lastUpdated && savedViewCount) {
      const timeCheck = nowtime - Number(lastUpdated);
      if (timeCheck < 2 * 60 * 1000) {
        this.numberOfViewers = Number(savedViewCount);
      } else {
        this.resetView();
      }
    } else {
      this.resetView();
    }
    this.zone.runOutsideAngular(() => {
      this.randomnumber = setInterval(() => {
        this.resetView();
      }, 2 * 60 * 1000);
    });
    this.currenturl = this.router.url;

    $(this.window).scroll(function () {
      if ($(this).scrollTop() > 440) {
        $('.nav-tabs').css('position', 'fixed');
      } else {
        $('.nav-tabs').css('position', 'sticky');
      }
    });
    this.scrollToActiveNav();

    import('../footer-new-mobile/footer-new-mobile').then(m => {
      this.FooterComponent = m.FooterNewMobile;
    });
  }

  private scrollToActiveNav() {

    const activeNavItem = this.navItems.find((item) => item.nativeElement.classList.contains('actives'));
    if (activeNavItem) {
      activeNavItem.nativeElement.scrollIntoView({ behavior: 'smooth', inline: 'center' });
    }
  }

  pg_typeId: any;

  getpropDetailsBYId() {
    this.otploader = true
    this.routeSub = this.activatedRoute.params.subscribe(params => {

      var lasturl = params['pg-for-rent-in-cityname-:id'];
      var propid = lasturl.split('-').pop().match(/[0-9]+/);
      this.Service.getpgDetailsById(propid).subscribe(offers => {
        if (offers['status'] === 'True') {
          this.propdetails = offers['propertydetails'];
          this.otploader = false
          this.cdr.markForCheck();

          this.userID = this.propdetails[0]['user_ID'];
          this.proptype = this.propdetails[0]['PG_TYPE'];
          this.propname = this.propdetails[0]['pgName'];
          const amenities = this.propdetails[0]['ammunites'];
          const propName = this.propdetails[0]['pgName'];
          const PropertyType = this.propdetails[0]['PG_TYPE'];
          const Locality_Id = this.propdetails[0]['locality_IDFK'];
          this.localityname = this.propdetails[0]['Locality_name'];
          this.rentamount = this.propdetails[0]['min_pric'].amount;
          this.localityid = Locality_Id;
          const City = this.propdetails[0]['city'];
          this.currentCity = City;
          this.propAllIssue = this.propdetails[0]['report_list'];
          this.propertyTypeId = this.propdetails[0]['pg_type'];
          this.cityId = this.propdetails[0]['cityid'];
          this.propId = this.propdetails[0]['propartyID'];
          var ROOM_cat = this.propdetails[0]['ROOM_cat'];
          this.roomFac = ROOM_cat[0]['facility'];
          this.regionid = this.propdetails[0]['region_ID'];
          this.pg_typeId = this.propdetails[0]['pg_type'];

          this.titleService.setTitle(this.propname + ' PG in ' + this.localityname + ', ' + this.currentCity + ' | Rent ₹' + this.rentamount);
          this.meta.updateTag({ name: 'description', content: this.propname + ' PG located in ' + this.localityname + ', ' + this.currentCity + '. Fully furnished with food, WiFi, 24/7 security & easy commute. Rent starts from ₹' + this.rentamount + '.' });
          this.meta.updateTag({ property: 'og:title', content: this.propname + ' PG in ' + this.localityname + ', ' + this.currentCity });
          this.meta.updateTag({ property: 'og:description', content: 'Book ' + this.propname + ' PG in ' + this.localityname + ', ' + this.currentCity + '. Comfortable stay with food, WiFi & housekeeping. Rent from ₹' + this.rentamount + '.' });
          this.Service.createLinkForCanonicalURL();

          if (amenities?.length === 0) {
            this.amenitiesHide = false;
          } else {
            this.amenitiesHide = true;
          }
          const Facilities = this.propdetails[0]['PGrules'];
          if (Facilities?.length === 0) {
            this.FacilitiesHide = false;
          } else {
            this.FacilitiesHide = true;
          }
          for (let i = 0; i < this.Approval?.length; i++) {
            this.Approval1.push(this.Approval[i]['approval']);
            this.approvalNew = this.Approval1.join();
          }



          this.otploader = true
          const loginid = localStorage?.getItem('loginID');
          if (loginid === '1') {
            this.login = true;
            this.userId = localStorage?.getItem('userID');
            this.userNumber = localStorage?.getItem('userNumber');
            this.eliteService.getContactedList(this.userId).subscribe(response => {
              if (response['status'] == "True") {
                this.contactedList = response['pro_view']
                this.elitePropertyId = this.contactedList.map((item: any) => {
                  console.log('this.propId          ' + this.propId);
                  if (this.propId == item.property_IDPK) {
                    this.contactData = item.owner_details;
                   
                    this.verificationDetailStatus = 2
                    this.otploader = false
                    setTimeout(() => {
                      this.toggleSubscriptionSheet()
                    }, 100);
                  }else{
                                       this.otploader = false

                  }

                  return item.property_IDPK;
                });
                if (this.elitePropertyId?.length == 0) {
                } else {
                  this.eliteView = true;
                    this.otploader = false

                }
              }else{
                    this.otploader = false

              }

            })

          } else {
            this.login = false;
            this.otploader = false

          }

        }
      });

      var loginId = this.storage.getItem('loginID');
      var userID = this.storage.getItem('userID');
      var param = { userid: userID, propid: this.propId, db_category_id: 5 };
      if (loginId === '1') {
        this.Service.addUserSeenProjects(param).subscribe(responce => { });
      }
      const index = this.storagearrseen.indexOf(this.propId);
      if (index !== -1) {
      } else {
        this.storagearrseen.push(this.propId);
      }
      this.storage.setItem('pgSeenPropertyID', JSON.stringify(this.storagearrseen));

    });
  }


  lazyloadingApis() {
    var paramlocalityid = { locality_ID: this.localityid };
    this.Service.getNearLocalityPGsCount(paramlocalityid).subscribe(prop => {
      this.nearByLocality = prop['data'];
      for (let i = 0; i < this.nearByLocality?.length; i++) {
        this.newNearByLocalityArry.push(this.nearByLocality[i]);
      }
      if (this.nearByLocality?.length === 0) {
        this.nearByLocalityLen = false;
      } else {
        this.nearByLocalityLen = true;
      }
    });

    var param2 = { locid: this.localityid };
    this.Service.getlocalitymeta(this.currentCity, param2).subscribe(metatag => {
      if ((metatag['status'] == 'True')) {
        let aboutdiscription = metatag['Localityseo'];
        this.aboutdiscription = aboutdiscription[0]?.Description;
        if (this.aboutdiscription == null || this.aboutdiscription == '') {
          this.About_Description = false;
        } else {
          this.About_Description = true;
        }
      } else {
        this.About_Description = false;
      }
    });

    this.Service.getlocalityReview(paramlocalityid).subscribe(response => {
      var checkData = response['locality_review'];
      if (checkData?.length == 0) {
        this.numbernan1 = true;
      } else {
        this.reviews1 = response['locality_review'];
        this.averageReviewsLoc = response['locality_review_avgper'];
        this.community = Math.round(this.averageReviewsLoc.community * 10) / 10;
        this.lifestyle = Math.round(this.averageReviewsLoc.lifestyle * 10) / 10;
        this.safety = Math.round(this.averageReviewsLoc.safety * 10) / 10;
        this.reviwcount1 = this.reviews1?.length;
        if (!this.reviews1?.length) {
          this.ratingreviews1 = false;
        } else {
          this.ratingreviews1 = true;
        }
        const fivestar = '5';
        const fivestarcount = this.reviews1.filter((obj) => Math.round(obj.avgrating).toString() === fivestar)?.length;
        this.fivestarcounts1 = fivestarcount / this.reviwcount1 * 100;
        this.FiveStarCountHtml1 = fivestarcount;

        const fourstar = '4';
        const fourstarcount = this.reviews1.filter((obj) => Math.round(obj.avgrating).toString() === fourstar)?.length;
        this.fourstarcounts1 = fourstarcount / this.reviwcount1 * 100;
        this.FourStarCountHtml1 = fourstarcount;

        const thirdstar = '3';
        const threestarcount = this.reviews1.filter((obj) => Math.round(obj.avgrating).toString() === thirdstar)?.length;
        this.threestarcounts1 = threestarcount / this.reviwcount1 * 100;
        this.threeStarCountHtml1 = threestarcount;

        const twostar = '2';
        const twostarcount = this.reviews1.filter((obj) => Math.round(obj.avgrating).toString() === twostar)?.length;
        this.twostarcounts1 = twostarcount / this.reviwcount1 * 100;
        this.TwoStarCountHtml1 = twostarcount;

        const onestar = '1';
        const onestarcount = this.reviews1.filter((obj) => Math.round(obj.avgrating).toString() === onestar)?.length;
        this.onestarcounts1 = onestarcount / this.reviwcount1 * 100;
        this.OneStarCountHtml1 = onestarcount;

        const totalratings = fivestarcount + fourstarcount + threestarcount + twostarcount + onestarcount;
        this.totaluserratings1 = totalratings;
        this.averagerating1 = (Math.round(5 * fivestarcount + 4 * fourstarcount + 3 * threestarcount + 2 * twostarcount + 1 * onestarcount) / totalratings).toFixed(1);
        if (isNaN(parseFloat(this.averagerating))) {
          this.numbernan1 = true;
          this.averagerating1 = '0';
          this.totaluserratings1 = '0';
        }
      }
    });

    var paramSimilar = { pg_type: this.pg_typeId, city_id: this.cityId, currentpg_id: this.propertyTypeId };
    this.Service.getSimilarPG(paramSimilar).subscribe((response) => {
      const recentlyAddedProp = response['data'];
      this.similarRentalProp = recentlyAddedProp;
      var similarPropLength = this.similarRentalProp?.length;
      if (similarPropLength == 0) {
        this.showSimilarProp = false;
      } else {
        this.showSimilarProp = true;
      }
    });

    var paramNearbyLocProp = { pg_type: this.pg_typeId, locality_ID: this.localityid, currentpg_id: this.propertyTypeId };
    this.Service.getNearbyLocPGs(paramNearbyLocProp).subscribe((response) => {
      const recentlyAddedProp = response['data'];
      this.nearbyLocProp = recentlyAddedProp;
      var nearbyLocPropLength = this.nearbyLocProp?.length;
      if (nearbyLocPropLength == 0) {
        this.showNearbyLocProp = false;
      } else {
        this.showNearbyLocProp = true;
      }
    });
  }
  nearbyLocProp: any[] = [];
  showNearbyLocProp = false;

  LoginView = false;
  topicIssueRaised: any;
  IdissueRaised: any;

  selectIssue(issue: any, id: any) {
    if (issue) {
      this.topicIssueRaised = issue;
      this.IdissueRaised = id;
      $('.issueSubmitBtn').removeAttr('disabled');
      $('.issueSubmitBtn').addClass('issueSubmitBtnActive');
      $('.issueSubmitBtn').removeClass('issueSubmitBtn');
      this.propAllIssue.forEach(propIssue => {
        propIssue.isSelected = (propIssue.report_types === issue && propIssue.IDPK === id);
      });
      this.checkSubmitButtonState();
    } else {
      $('.issueSubmitBtn').attr('disabled', true);
    }
  }

  isAnyIssueSelected(): boolean {
    return this.propAllIssue.some(issue => issue.isSelected);
  }

  issueSubmit() { this.LoginView = true; }

  checkSubmitButtonState() {
    const isAnySelected = this.isAnyIssueSelected();
    const submitButton = document.querySelector('.issueSubmitBtn');
    if (submitButton) {
      if (isAnySelected) {
        submitButton.classList.add('issueSubmitBtnActive');
        submitButton.removeAttribute('disabled');
      } else {
        submitButton.classList.remove('issueSubmitBtnActive');
        submitButton.setAttribute('disabled', 'true');
      }
    }
  }

  Address_Hide = true;
  Address_Show = false;

  customOptionsRoomcategory: OwlOptions = {
    loop: false, mouseDrag: false, touchDrag: false, pullDrag: false, dots: false,
    navSpeed: 700, autoplay: false, autoplayHoverPause: false, margin: 10,
    autoWidth: false, center: false, lazyLoad: false, autoplayTimeout: 3000, smartSpeed: 600,
    nav: true,
    navText: ['<img src="https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_mobile_3/assets/images/commercial_list/leftArrow.svg" alt=\'LeftArrow\' class=\'prop_indi_owl owl-nav owl-prev main_move_left_gallery\'>',
      '<img src="https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_mobile_3/assets/images/commercial_list/rightArrow.svg" alt=\'RightArrow\' class=\'prop_indi_owl owl-nav owl-next main_move_right_gallery\'>'],
    responsive: { 0: { items: 1 }, 400: { items: 1 }, 740: { items: 1 }, 940: { items: 1 } },
  };

  customOptionsGallery: OwlOptions = {
    loop: true, mouseDrag: true, touchDrag: true, pullDrag: true, dots: false,
    navSpeed: 700, autoplay: true, autoplaySpeed: 300,
    responsive: { 0: { items: 1 }, 400: { items: 2 }, 740: { items: 2 }, 940: { items: 2 } },
  };

  readmore() {
    $('.propDesc2').css('max-height', '200px');
    $('.propDesc2').css('overflow-y', 'scroll');
    $('.down_arrow').css('display', 'none');
    $('.up_arrow').css('display', 'block');
  }

  readless() {
    $('.propDesc2').css('max-height', '80px');
    $('.propDesc2').css('overflow-y', 'hidden');
    $('.down_arrow').css('display', 'block');
    $('.up_arrow').css('display', 'none');
    var scrollToTarget = function (target: any, containerEl: any) {
      var isElement = target && target.nodeType === 1, isNumber = Object.prototype.toString.call(target) === '[object Number]';
      if (isElement) { containerEl.scrollTop = target.offsetTop; }
      else if (isNumber) { containerEl.scrollTop = target; }
      else if (target === 'bottom') { containerEl.scrollTop = containerEl.scrollHeight - containerEl.offsetHeight; }
      else if (target === 'top') { containerEl.scrollTop = 0; }
    };
    var scrollableDiv = document.getElementById('scrollable2');
    scrollToTarget('top', scrollableDiv);
  }

  readmore1() {
    $('.propDesc1').css('max-height', '200px');
    $('.propDesc1').css('overflow-y', 'scroll');
    $('.down_arrow2').css('display', 'none');
    $('.up_arrow2').css('display', 'block');
  }

  readless1() {
    $('.propDesc1').css('max-height', '80px');
    $('.propDesc1').css('overflow-y', 'hidden');
    $('.down_arrow2').css('display', 'block');
    $('.up_arrow2').css('display', 'none');
    var scrollToTarget = function (target: any, containerEl: any) {
      var isElement = target && target.nodeType === 1, isNumber = Object.prototype.toString.call(target) === '[object Number]';
      if (isElement) { containerEl.scrollTop = target.offsetTop; }
      else if (isNumber) { containerEl.scrollTop = target; }
      else if (target === 'bottom') { containerEl.scrollTop = containerEl.scrollHeight - containerEl.offsetHeight; }
      else if (target === 'top') { containerEl.scrollTop = 0; }
    };
    var scrollableDiv = document.getElementById('scrollable1');
    scrollToTarget('top', scrollableDiv);
  }

  checkBox: boolean = false;
  contactButton: boolean = false;
  RequestButton: boolean = false;
  resquestImages: boolean = false;
  resquestCall: boolean = false;

  isInWishlist(propertyID: number): boolean {
    const userId = this.storage.getItem('userID');
    if (userId) {
      this.storagearr = this.propertyIds;
      return this.storagearr.includes(propertyID);
    } else {
      return this.storagearr.includes(propertyID);
    }
  }

  Heart_Transtion(propertyID: number) {
    const index = this.storagearr.indexOf(propertyID);
    var loginID = this.storage.getItem('loginID');
    if (index !== -1) {
      this.storagearr.splice(index, 1);
      if (loginID == '1') {
        const userid = this.storage.getItem('userID');
        var param = { userid: userid, propid: propertyID, CatagoryId: 5 };
        this.Service.removeFavaourite(param).subscribe(response => { });
      }
    } else {
      this.storagearr.push(propertyID);
      if (loginID == '1') {
        const userid = this.storage.getItem('userID');
        var param = { userid: userid, propid: propertyID, CatagoryId: 5 };
        this.Service.addfavaourite(param).subscribe(response => { });
      }
    }
    this.storage.setItem('pgPropertyID', JSON.stringify(this.storagearr));
    if ('pgPropertyID' in localStorage) {
      this.storagearr = JSON.parse(this.storage.getItem('pgPropertyID')!);
    } else {
      this.storage.setItem('pgPropertyID', '[]');
      this.storagearr = JSON.parse(this.storage.getItem('pgPropertyID')!);
    }
  }

  similarRentalProp: any[] = [];

  shareContent() {
    if ((window.navigator as any).share) {
      (window.navigator as any).share({ title: 'Homes247.in', text: 'Check out this amazing Property!', url: 'https://www.homes247.in' + this.router.url })
        .then(() => console.log('Shared Successfully'))
        .catch((error: any) => console.error('Error sharing:', error));
    }
  }

  Report() { $('.ReportPopup').css('display', 'block'); }

  shareContent1(data: any) {
    if ((window.navigator as any).share) {
      (window.navigator as any).share({ title: 'Checkout this Property - ' + data.property_name, text: 'Check out ' + 'Test', url: 'https://www.homes247.in' + this.router.url })
        .then(() => console.log('Shared successfully'))
        .catch((error: any) => console.error('Error sharing:', error));
    } else {
      console.log('Web Share API not supported on this device.');
    }
  }

  public currentActive = 0;
  facilitiesPath = 'https://img-mpg.homes247.in/images/rentals/icons_facilities/';

  private popupJustOpened = false;
  selectedIndex: number | null = null;
  selectedItem: any = null;
  private clickListener!: () => void;

  showPopup(index: number) {
    $('.agreementPopup').css('display', 'block');
    this.selectedIndex = index;
    this.popupJustOpened = true;
    setTimeout(() => {
      this.popupJustOpened = false;
      this.clickListener = this.renderer.listen('document', 'click', (event: any) => {
        const popupElement = this.elRef.nativeElement.querySelector('.agreementPopup');
        if (!this.popupJustOpened && popupElement && !popupElement.contains(event.target) && !event.target.closest('.agreementDetails')) {
          this.closePopup(index);
        }
      });
    }, 0);
  }

  closePopup(index: number) {
    $('.agreementPopup').css('display', 'none');
    if (this.clickListener) { this.clickListener(); }
  }

  private observer: IntersectionObserver | null = null;

  ngOnDestroy() {
    if (this.observer) { this.observer.disconnect(); }
    if (this.clickListener) { this.clickListener(); }
    if (this.numberOfViewers) { clearInterval(this.numberOfViewers); }
  }

  CloseModal() {
    $('.enqiery').css('display', 'none');
    $('.OtpDiv').css('display', 'none');
    this.IsVisibleEnquery = false;
  }

  ShowHideEnquery() {
    this.IsVisibleEnquery = true;
    $('.enqiery').css('display', 'block');
    this.RequestButton = true;
    this.resquestImages = true;
    this.checkBox = false;
    this.resquestCall = false;
    this.contactButton = false;
    $('.form-field__input').removeAttr('style');
    $('#uname').attr('placeholder', 'Username');
    $('#uemail').attr('placeholder', 'Email');
    $('#unumber').attr('placeholder', '+91');
  }

  ExploreNearBylocation(id: any) {
    let thisPage = new URL('https://www.homes247.in/' + this.Citynamelowcase + '/property-sale-in-' + this.locationnamelowcase + '-' + id);
    location.href = thisPage.toString();
  }

  ShowHideEnquery1() {
    var loginId = this.storage.getItem('loginID');
    if (loginId === '1') {
      this.Address_Show = true;
      this.Address_Hide = false;
    } else {
      window.location.hash = 'ViewAddress';
      $('#otpValidate').css('display', 'block');
      if (this.loadComponent == false) {
        this.loadComponent = true;
        // import('../otp-validation/otp-validation.module').then(mod => mod.OtpValidationModule).then(otpValidationComponent => {
        //   this.otpValidationComponent = otpValidationComponent.components['lazy'];
        // });
        this.Visiblebrochure = this.Visiblebrochure ? false : true;
        $('.modal-login').css('z-index', '1');
      }
    }
  }

  ShowHideEnquery2() { this.goBackFromEnq(); }

  goBackFromEnq() {
    this.IsVisibleEnquery = this.IsVisibleEnquery ? false : true;
    $('.enqiery').css('display', 'block');
    $('.OtpDiv').css('display', 'none');
    this.resquestCall = true;
    this.resquestImages = false;
  }

  numberLogIn = true;
  otpValidating = false;
  readonly countdown4 = viewChild<CountdownComponent>('cd4');
  readonly ngOtpInput = viewChild<any>('ngOtpInput');

  otpvalidate4() {
    var otplength = 4;
    if ($('#otp').val() == '') {
      this.ngOtpInput()?.setValue('');
      Swal.fire({ title: 'Please enter the OTP!', icon: 'error', showConfirmButton: false, timer: 1000 });
      return false;
    } else {
      var liveotpcount = $('#otp').val()?.length;
      if (liveotpcount < otplength) {
        this.ngOtpInput()?.setValue('');
        Swal.fire({ title: 'Please enter the valid OTP!', icon: 'warning', showConfirmButton: false, timer: 1500 });
        return false;
      }
    }
    this.otploader = true;
    var param = this.enquiry;
    this.Service.otpvalidcheck(param).subscribe((success) => {
      var status = success['status'];
      if (status == 'True') {
        this.enquiry.verification = 2;
        this.SubmitForm();
        this.IsVisibleEnquery = false;
        this.countdown4()?.restart();
      } else {
        this.ngOtpInput()?.setValue('');
        this.otploader = false;
        Swal.fire({ title: 'Oops Something Error!', text: 'Its Not a valid OTP / OTP Expired!', icon: 'error', showConfirmButton: false, timer: 1500 });
      }
    }, (err) => { });

    return true;
  }

  otpHandle() {
    var param = this.enquiry;
    this.Service.otpsend(param).subscribe((success: { messages: any }) => {
      var status = success.messages[0].status;
      if (status == 'ENQUEUED') {
        this.numberLogIn = false;
        this.otpValidating = true;
        this.otploader = false;
        $('.enqiery').css('display', 'none');
        $('.OtpDiv').css('display', 'block');
        $('.countdown_maindiv').css('display', 'block');
        $('.otpexpireclass').css('display', 'none');
        this.countdown4()?.begin();
        this.ngOtpInput()?.setValue('');
        var buttonId = $('#one').attr('id');
      } else {
        Swal.fire({ title: 'Oops Something Error!', icon: 'error', showConfirmButton: false, timer: 1500 });
      }
    }, (err) => { });
  }

  config = { allowNumbersOnly: true, length: 4, isPasswordInput: false, disableAutoFocus: false, placeholder: '', inputStyles: { 'width': '50px', 'height': '50px' } };
  countdownconfig = { leftTime: 60, demand: true };

  otpBasedLogin1() {
    const paramNum = { number: this.enquiry.number };
    // this.countdownconfig = { leftTime: 60, demand: true };
    this.countdown4()?.restart();
    this.ngOtpInput()?.setValue('');
    this.otploader = true;
    this.Service.otpsend(paramNum).subscribe((success: { messages: any }) => {
      var status = success.messages[0].status;
      if (status == 'ENQUEUED') {
        $('.countdown_maindiv').css('display', 'block');
        $('.otpexpireclass').css('display', 'none');
        this.countdown4()?.begin();
        this.otploader = false;
      } else {
        Swal.fire({ title: 'Oops Something Error!', icon: 'error', showConfirmButton: false, timer: 1500 });
      }
    }, (err) => { console.log('Connection Failed'); });
  }

  goback1() {
    $('.OtpDiv').css('display', 'none');
    $('.enqiery').css('display', 'block');
    this.numberLogIn = true;
    // this.countdownconfig = { leftTime: 60, demand: true };
    this.countdown4()?.restart();


    this.otpValidating = false;
  }

  handleEvent(e: CountdownEvent) {
    if (e.action === 'done') {
      $('.countdown_maindiv').css('display', 'none');
      $('.otpexpireclass').css('display', 'block');
    }
  }

  onOtpChange(otp: any) {
    var param = this.enquiry;
    param.otp = otp;
  }

  otpsend() {
    if ($('#uname').val() == '') {
      $('#uname').focus().css('border-bottom', '1px solid red').attr('placeholder', 'Please Enter Name');
      return false;
    } else {
      var enameFilter = /^([a-zA-Z]+\s)*[a-zA-Z]+$/;
      if (enameFilter.test($('#uname').val())) {
        $('#uname').removeAttr('style');
      } else {
        $('#uname').focus().css('border-bottom', '1px solid red').attr('placeholder', 'Please enter valid name').val('');
        return false;
      }
    }
    if ($('#uemail').val() === '') {
    } else {
      var emai = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
      if (emai.test($('#uemail').val())) {
        $('#uemail').removeAttr('style');
      } else {
        $('#uemail').focus().css('border-color', 'red').attr('placeholder', 'Please enter valid email-id').val('');
        return false;
      }
    }
    if ($('#unumber').val() == '') {
      $('#unumber').focus().css('border-bottom', '1px solid red').attr('placeholder', 'Please Enter Phone Number');
      return false;
    } else {
      var mobilee = /^[0-9]{10}$/;
      if (mobilee.test($('#unumber').val())) {
        $('#unumber').removeAttr('style');
      } else {
        $('#unumber').focus().css('border-bottom', '1px solid red').attr('placeholder', 'Please enter valid contact number').val('');
        return false;
      }
    }
    this.SubmitForm();
    return true;

  }

  SubmitForm() {

    this.otploader = true;
    var param = this.enquiry;
    this.enquiry.localityId = this.localityid;
    this.enquiry.propertyid = this.propId;
    var cityid = this.cityId;
    this.enquiry.regionId = '';
    this.enquiry.propertyname = this.propname;

    var value = this.cityservice.cityfinder(this.router.url);
    this.cityname = value.cityname.replace('-', ' ');
    var urlValue = this.cityservice.urlFinder(this.router.url);
    this.pageOrigin = urlValue.pageOrigin;

    let browserInfo = navigator.userAgent;
    let browser: any;
    var pageorgin = this.cityname + '_' + this.pageOrigin;
    if (browserInfo.includes('Opera') || browserInfo.includes('Opr')) { browser = 'Opera'; }
    else if (browserInfo.includes('Edg')) { browser = 'Edge'; }
    else if (browserInfo.includes('Chrome')) { browser = 'Chrome'; }
    else if (browserInfo.includes('Safari')) { browser = 'Safari'; }
    else if (browserInfo.includes('Firefox')) { browser = 'Firefox'; }
    else { browser = 'unknown'; }

    var utm_medium = this.activatedRoute.snapshot.queryParamMap.get('utm_medium');
    if (utm_medium) {
      this.enquiry.source = 'Homes247-Campaign';
      this.enquiry.propertyname = this.Filter.PropertyName + ' && ' + utm_medium;
    } else {
      this.enquiry.source = 'Homes247-Mobile';
    }

    this.Service.pgenq(param, pageorgin, cityid, browser).subscribe(success => {
      if (success['status'] === 'True') {
        if (success['code'] === '3') {

          this.otpHandle();
          $('#otpValidate').css('display', 'none');
        } else {
          this.IsVisibleEnquery = false;
          this.otploader = false;
          this.cdr.markForCheck();
          Swal.fire({ text: 'We Will Intimate you soon!', icon: 'success', showConfirmButton: false, timer: 2500 });
          this.enquiry.number = '';

          if (Array.isArray(this.propId)) { this.propId = this.propId[0]; }
          this.propId = String(this.propId);
          if ('contactedpgPropID' in this.storage) {
            this.contactedRentalarr = JSON.parse(this.storage.getItem('contactedpgPropID') || '[]');
          } else {
            this.contactedRentalarr = [];
          }
          if (!this.contactedRentalarr.includes(this.propId)) {
            this.contactedRentalarr.push(this.propId);
            this.storage.setItem('contactedpgPropID', JSON.stringify(this.contactedRentalarr));
          }
        }
        this.otploader = false;
        this.Address_Show = true;
        this.Address_Hide = false;
        $('.blurred-text').remove();
        $('body').removeClass('bodyoverlay');
        $('#modal-container2').addClass('out');
        $('body').removeClass('modal-active');
        // this.enquiry.name = '';
        this.enquiry.mail = '';
        this.enquiry.otp = '';
        $('.form-field__input').removeAttr('style');
        $('#uname').attr('placeholder', 'Username');
        $('#uemail').attr('placeholder', 'Email');
        $('#unumber').attr('placeholder', '+91');
        this.enquiry.verification = 1;
      } else {
        this.otploader = false;
        Swal.fire({ icon: 'error', title: 'Something Went Wrong', showConfirmButton: false, timer: 1500 });
      }
    });
  }

  onGalleryClick() {
    var topPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    window.location.hash = 'openmaingallery';
    document.documentElement.scrollTop = topPos;
  }

  checkboxClick2() {
    if ($('#exampleCheck2').is(':checked')) {
      $('#contactButton2').removeAttr('disabled');
      $('#contactButton2').addClass('contactButton2Active');
    } else {
      $('#contactButton2').attr('disabled', true);
      $('#contactButton2').removeClass('contactButton2Active');
      $('#contactButton2').addClass('contactButton2');
    }
  }

  currenturl: any;
  parsedarray: any[] = [];
  storagearr = [];
  storagearr1 = [];
  storagearrseen = [];
  gallerySection1 = false;
  section = 'section1';

  gallerySection() { this.gallerySection1 = true; }

  scrollTo(section: any): void {
    const headerHeight = 120;
    const targetElement = document.querySelector<any>('#' + section);
    if (targetElement) {
      const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset;
      const adjustedTopPosition = offsetTop - headerHeight;
      window.scrollTo({ top: adjustedTopPosition, behavior: 'smooth' });
    }
  }
  onSectionChange(sectionId: string) {
    this.section = sectionId;

    setTimeout(() => {
      const navContainer = document.querySelector('#sublinks_sticky .nav-tabs') as HTMLElement;
      const activeEl = document.querySelector('#sublinks_sticky .nav-tabs li.actives') as HTMLElement;



      if (navContainer && activeEl) {
        navContainer.scrollTo({
          left: activeEl.offsetLeft - (navContainer.offsetWidth / 2) + (activeEl.offsetWidth / 2),
          behavior: 'smooth'
        });
      }
    }, 300);
  }

  backPageIcon() {
    this.gallerySection1 = false;
    $('body').removeClass('modal-open');
    $('.modal-backdrop').removeClass();
  }

  getlocationlist() {
    this.Service.getlocationlist().subscribe((city: any[]) => { this.citiess = city['locations']; });
    this.Service.gettopBuildersCommercial().subscribe((topBuilders: any[]) => { this.allBuilders = topBuilders['builderinfo']; });
    this.Service.getrecentblogs().subscribe((blogs: any[]) => {
      if (blogs['status'] === 'True') {
        this.blogsloader = false;
        this.blogs = blogs['locations'];
        this.blogapiload = false;
      } else {
        this.blogsloader = true;
      }

      const UserId = localStorage.getItem('userID');
      if (UserId) {
        this.UserId = localStorage.getItem('userID');
        if ('commercialPropertyID' in localStorage) {
          // this.userFavListLocalStorage = JSON.parse(localStorage.getItem('commercialPropertyID'));
        } else {
          localStorage.setItem('commercialPropertyID', '[]');
          // this.userFavListLocalStorage = JSON.parse(localStorage.getItem('commercialPropertyID'));
        }
        this.Service.getUserWishListByIdTest(this.UserId, 5).subscribe(userFavList => {
          this.userRentalFavList = userFavList['favouritelist'];
          this.propertyIds = this.userRentalFavList?.map(item => item.propertyId) || [];
        });
      } else {
        if ('commercialPropertyID' in localStorage) {
          this.storagearr = JSON.parse(localStorage.getItem('commercialPropertyID'));
        } else {
          localStorage.setItem('commercialPropertyID', '[]');
          this.storagearr = JSON.parse(localStorage.getItem('commercialPropertyID'));
        }
      }
    });

    const trendingId = '1';
    this.Service.getTrendingblogsList(trendingId).subscribe(responce => {
      if (responce['status'] === 'True') { this.trendingBlogs = responce['blogcategory']; }
    });

    var param = { cityId: '1', userId: this.UserId };
    this.Service.commercialSaleProperties1(param).subscribe((topProperty: any[]) => {
      if (topProperty['status'] === 'True') {
        this.topprojectsloader = false;
        this.commercialPropertiesSale = topProperty['Propdetails'];
      } else {
        this.topprojectsloader = true;
      }
    });

    const userId = this.storage.getItem('userID');
    if (userId) {
      this.UserId = this.storage.getItem('userID');
      if (!('pgPropertyID' in this.storage)) {
        this.storage.setItem('pgPropertyID', '[]');
      }
      this.Service.getUserWishListByIdTest(this.UserId, 5).subscribe(userFavList => {
        this.userRentalFavList = userFavList['favouritelist'];
        this.propertyIds = this.userRentalFavList?.map(item => item.propertyId) || [];
      });
    } else {
      if ('pgPropertyID' in this.storage) {
        this.storagearr = JSON.parse(this.storage.getItem('pgPropertyID')!);
      } else {
        this.storage.setItem('pgPropertyID', '[]');
        this.storagearr = JSON.parse(this.storage.getItem('pgPropertyID')!);
      }
    }
  }





  isHomiDetailSheetOpen = false;

  toggleSubscriptionSheet() {

    if (this.isHomiDetailSheetOpen) return;

    const sheet = document.getElementById('subscriptionMainSheet') as HTMLElement;
    const header = document.getElementById('subscriptionDetailHeader') as HTMLElement;
    const body = document.getElementById('subscriptionDetailsBody') as HTMLElement;
    const backdrop = document.getElementById('customModalBackdropSubscription') as HTMLElement;

    if (!sheet || !header || !body || !backdrop) return;
    backdrop.classList.add('active');
    sheet.style.height = '278px';

    setTimeout(() => {
      header.classList.add('homiHeadderHide');
      body.classList.add('homiActiveSlide');
    }, 50);

    this.isHomiDetailSheetOpen = true;
  }


  closeSubscriptionSheet() {
    const sheet = document.getElementById('subscriptionMainSheet') as HTMLElement;
    const header = document.getElementById('subscriptionDetailHeader') as HTMLElement;
    const body = document.getElementById('subscriptionDetailsBody') as HTMLElement;
    const backdrop = document.getElementById('customModalBackdropSubscription') as HTMLElement;

    if (!sheet || !header || !body || !backdrop) return;

    backdrop.classList.remove('active');
    sheet.style.height = '60px';
    header.classList.remove('homiHeadderHide');
    body.classList.remove('homiActiveSlide');

    this.isHomiDetailSheetOpen = false;
  }







  // subscription
  elitePlanView(propertyId: string | number) {
    const exists = this.elitePropertyId.includes(propertyId);

    if (exists) {
      console.log('Duplicate entry — not added');
      return;
    }


    var param = {
      number: this.userNumber,
      userId: this.userId,
      propid: propertyId,
      category_id: 5
    }

    this.eliteService.detailesCard(param).subscribe(response => {
      if (response['status'] == 'True') {
        this.elitePropertyId.push(propertyId);
        this.contactData = response['contacteddata'];
        this.verificationDetailStatus = 2
        setTimeout(() => {
          this.toggleSubscriptionSheet()
        }, 100);

      } else {
        this.elitePlan();
      }
    })




  }



  // isEliteOpen = true;
  elitePlan() {
    $('#elitePlanModal').modal('show');
  }
  elitePlanRouter() {
    $('#elitePlanClose').click();
   window.location.href = 'https://hostinger.homes247.in/homes-elite#1';
  }





  // visibility level

  /** Controls whether the bottom sheet is rendered/visible */
  isVisible: any = true



  /** Progress timeline steps */
  steps = ([
    {
      icon: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/subscription%20management/propertyTickIcon.svg',
      label: 'Posted',
      subLabel: 'Completed',
      state: 'completed'
    },
    {
      icon: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/subscription%20management/propertyBoostedIcon.svg',
      label: 'Boost',
      subLabel: 'In Progress',
      state: 'active'
    },
    {
      icon: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/subscription%20management/getMoreEnquiryIcon.svg',
      label: 'Get More Enquiries',
      state: 'pending'
    }
  ]);

  /** Opens the bottom sheet and locks body scroll */
  // open(): void {
  //   this.isVisible = true
  //   this.lockBodyScroll();
  // }

  /** Closes the bottom sheet and restores body scroll */
  closeVsibilityPopup(): void {
    this.isVisible = false
    this.unlockBodyScroll();
  }

  /** Handles backdrop tap-to-close */
  onBackdropClick(): void {
    this.closeVsibilityPopup();
  }

  /** Closes the sheet when ESC is pressed, only while open */
  @HostListener('document:keydown.escape')
  onEsc(): void {
    if (this.isVisible) {
      this.closeVsibilityPopup();
    }
  }

  /** Primary CTA handler */
  increaseVisibility(): void {
    // this.increaseVisibilityClick.emit();
  }

  private lockBodyScroll(): void {
    document.body.style.overflow = 'hidden';
  }

  private unlockBodyScroll(): void {
    document.body.style.overflow = '';
  }



}

