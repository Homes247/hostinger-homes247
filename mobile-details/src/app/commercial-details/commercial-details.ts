import { Location, DOCUMENT, CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
// import { CountdownModule } from 'ngx-countdown';
import { NgOtpInputModule } from 'ng-otp-input';
import { PhotoGalleryModule } from '@twogate/ngx-photo-gallery';
// import { ScrollSpy3Directive } from '../../app/scroll-spy3.directive';
import { cleanUrlPipe, customPriceFormatPipe, SanitizeHtmlPipe } from '../mainpipe-pipe';
// import { InnerHeader } from '../inner-header/inner-header.component';
import { AfterViewInit, Component, ElementRef, HostListener, Inject, OnDestroy, OnInit, PLATFORM_ID, QueryList, Renderer2, viewChild, ViewChild, ViewChildren } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CountdownComponent, CountdownEvent } from 'ngx-countdown';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CityService } from '../city.service';
import { DataService } from '../data.service';
import { FilterService } from '../filter.service';
import { Enquiry } from '../home/home';
import { ScrollSpyDirective } from '../scroll-spy.directive';
import { InnerHeader } from '../inner-header/inner-header';
import Swal from 'sweetalert2';
import { ChangeDetectorRef } from '@angular/core';
import { ElitedataService } from '../elitedata.service';
// declare var swal: any;
declare var $: any;
@Component({
  selector: 'app-commercial-details',
  templateUrl: './commercial-details.html',
  styleUrls: ['./commercial-details.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    // CountdownModule,
    NgOtpInputModule,
    PhotoGalleryModule,
    // ScrollSpy3Directive,
    cleanUrlPipe,
    customPriceFormatPipe,
    SanitizeHtmlPipe,
    InnerHeader,
    ScrollSpyDirective,
    CountdownComponent
    // InnerHeader,
  ]
})
export class CommercialDetailsComponent implements OnInit, OnDestroy, AfterViewInit {
  // [x: string]: any;
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
  propcommercialdetails: any[] = [];

  // amenitesImages = this.Service.amenitiesImageURL + 'amenites/amenities-new/';
  otploader: boolean;
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
  safety: any
  averageReviewsLoc: any
  community: any
  lifestyle: any
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
  cityid: any;
  // propertydetails: any;
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
  allBuilders = []
  topprojectsloader = true;
  blogsloader = true;
  blogs: any;
  commercialPropertiesRent = [];
  UserId: any;
  trendingBlogs: any[] = [];
  blogapiload = true;
  allCommercialProperties = [];
  pageOrigin: any;
  cityname: any;
  commercialtype_ID: any;
  sale_rent: any;
  About_Description = false;
  aboutdiscription: any;
  userRentalFavList = [];
  propertyIds = [];

  price: any;
  private window: Window & typeof globalThis;
  constructor(private router: Router,
    private cdr: ChangeDetectorRef,
    public eliteService: ElitedataService,
    private _location: Location,
    public cityservice: CityService,
    public Service: DataService,
    private renderer: Renderer2, private elRef: ElementRef,
    private activatedRoute: ActivatedRoute, private titleService: Title, private meta: Meta,
    private Filter: FilterService,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private doc: Document) {
    this.window = this.doc.defaultView as Window & typeof globalThis;
    this.Service.mouseenterlistenOtp().subscribe((m: any) => {
      if (this.window.location.hash === '#reportissue') {
        this.submitFormReport()
      } else if (this.window.location.hash === '#ViewAddress') {
        this.SubmitForm();
      }
    })
  }

  login: boolean = false
  userId: any
  userNumber: any
  contactedList: any
  elitePropertyId: any = [];
  eliteView: boolean = false;
  contactData: any = {};
  verificationDetailStatus: any

  ngOnInit(): void {
    this.dataLoads()
    this.getpropDetailsBYId();



  }


  coverimage: any = 'https://img.homes247.in/images/commerical_img/gallery/'
  ImageUrl: any
  propertyimage: any
  propertyimageRent: any
  builderLogo: any
  blogimagePath: any
  imagepath: any
  facilitiesPath: any
  amenitesImages: any
  dataLoads() {
    // this.coverimage = this.Service.commercialImg + 'gallery/';
    this.coverimage = 'https://img.homes247.in/images/commerical_img/gallery/'

    this.ImageUrl = this.Service.commercialImg + 'gallery/';
    this.propertyimage = this.Service.commercialImg + 'gallery/';
    this.propertyimageRent = this.Service.RentCoverImagelink;
    this.builderLogo = this.Service.imagesURL + 'builder/';
    this.blogimagePath = this.Service.blogimageURL + 'stories/';
    this.imagepath = "https://img-mc.homes247.in"
    this.facilitiesPath = 'https://img-mc.homes247.in/images/rentals/icons_facilities/';
    this.amenitesImages = this.Service.ImageURL + 'amenites/amenities-new/';
  }
  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
    // Clean up the click listener to avoid memory leaks
    if (this.clickListener) {
      this.clickListener();
    }
    if (this.numberOfViewers) {
      clearInterval(this.numberOfViewers);
    }
  }
  randomnumber: any;
  numberOfViewers: any = 0;
  resetView() {
    this.numberOfViewers = Math.floor(Math.random() * (50 - 10 + 1)) + 10;
    localStorage.setItem('viewCount', this.numberOfViewers);
    localStorage.setItem('lastUpdated', String(Date.now()));
  }
  // touchstart = false;
  // @HostListener('touchstart', ['$event'])
  // @HostListener('touchmove', ['$event'])
  // @HostListener('touchend', ['$event'])
  // @HostListener('touchcancel', ['$event'])
  // handleevent(event){
  // onStart(event: any) {
  //   if (this.touchstart == false) {
  //     const video_wrapper = $('#iFrameBlog');
  //     if (video_wrapper.length) {
  //       video_wrapper.html(
  //         '<iframe width="100%" height="260" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="' +
  //         this.mapurl +
  //         '"></iframe>'
  //       );
  //     }
  //     // this.brochuredownload();
  //     this.touchstart = true;
  //   }
  //   $('body').addClass('bodyscrollclass');
  //   $('body').removeClass('bodyhiddenclass');
  //   // $('.divhide').css('display', 'block');
  // }
  mousemovement = false
  @HostListener('window:scroll')
  @HostListener('touchstart')
  onWindowScroll() {
    // this.coverimage = this.Service.commercialImg + 'gallery/';
    this.Service.mouseenterservice3();
    this.mousemovement = true;
    import('../footer-new-mobile/footer-new-mobile').then(m => {
      this.FooterComponent = m.FooterNewMobile;
    });
    $('.agreementPopup').css('display', 'none');
  }
  // @HostListener('window:scroll', ['$event'])
  // onWindowScroll() {
  // const video_wrapper = $('#iFrameBlog');
  // console.log( video_wrapper)
  // if (video_wrapper.length) {
  //   video_wrapper.html('<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15552.035395803161!2d77.6071884!3d12.9712854!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x7facc77feaa26898!2sHomes247.in!5e0!3m2!1sen!2sin!4v1617708573014!5m2!1sen!2sin" width="100%" height="260" style="border:0;" allowfullscreen="" loading="lazy"></iframe>');
  // }
  // }
  // sectionOffsets = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  // @HostListener('window:scroll', [])
  // onScroll() {
  //   const scrollPosition = window.pageYOffset + 150; // Adjust offset if needed
  //   // Determine the active section based on the scroll position
  //   this.sectionOffsets.forEach((offset, index) => {
  //     if (scrollPosition >= offset) {
  //       this.currentActive = index + 1;
  //     console.log("here");
  //     }
  //   });
  // }
  // ngAfterViewInit() {
  //   // Calculate the offset positions of each section for scroll tracking
  //   this.sectionOffsets = [
  //     document.getElementById('section1').offsetTop,
  //     document.getElementById('section2').offsetTop,
  //     document.getElementById('section3')?.offsetTop || 0,
  //     document.getElementById('section4')?.offsetTop || 0,
  //     document.getElementById('section5').offsetTop,
  //     document.getElementById('section6').offsetTop,
  //     document.getElementById('section7')?.offsetTop || 0,
  //     document.getElementById('section8')?.offsetTop || 0,
  //     document.getElementById('section9')?.offsetTop || 0
  //   ];
  // }
  onclickshare(data: any) {
    if ((window.navigator as any).share) {
      (window.navigator as any)
        .share({
          title: 'Checkout this Property - ' + data.property_name,
          text: 'Check out ' + 'Test',
          url: 'https://www.homes247.in' + this.router.url,
        })
        .then(() => console.log('Shared successfully'))
        .catch((error: any) => console.error('Error sharing:', error));
    } else {
      // console.log('Web Share API not supported on this device.');
    }
  }


  onClickShareSimilarProp(data: any) {

    if (this.sale_rent == 1) {
      if ((window.navigator as any).share) {
        (window.navigator as any)
          .share({
            title: 'Checkout this Property - ' + data.property_name,
            text: 'Check out ' + 'Test',
            url: 'https://www.homes247.in' + `/cld/commercial-properties-for-sale-in-${(data.city_name)}-${data.commercial_ID}-${data.prope_id}`,
          })
          .then(() => console.log('Shared successfully'))
          .catch((error: any) => console.error('Error sharing:', error));
      }
    }
    else if (this.sale_rent == 2) {
      if ((window.navigator as any).share) {
        (window.navigator as any)
          .share({
            title: 'Checkout this Property - ' + data.property_name,
            text: 'Check out ' + 'Test',
            url: 'https://www.homes247.in' + `/cld/commercial-properties-for-rent-in-${(data.city_name)}-${data.commercial_ID}-${data.prope_id}`,
          })
          .then(() => console.log('Shared successfully'))
          .catch((error: any) => console.error('Error sharing:', error));
      }
    }
  }

  onClickShareNearProp(data: any) {
    if (this.sale_rent == 1) {
      if ((window.navigator as any).share) {
        (window.navigator as any)
          .share({
            title: 'Checkout this Property - ' + data.property_name,
            text: 'Check out ' + 'Test',
            url: 'https://www.homes247.in' + `/cld/commercial-properties-for-sale-in-${(data.city_name)}-${data.commercial_ID}-${data.property_id}`,
          })
          .then(() => console.log('Shared successfully'))
          .catch((error: any) => console.error('Error sharing:', error));
      }
    } else if (this.sale_rent == 2) {
      if ((window.navigator as any).share) {
        (window.navigator as any)
          .share({
            title: 'Checkout this Property - ' + data.property_name,
            text: 'Check out ' + 'Test',
            url: 'https://www.homes247.in' + `/cld/commercial-properties-for-rent-in-${(data.city_name)}-${data.commercial_ID}-${data.property_id}`,
          })
          .then(() => console.log('Shared successfully'))
          .catch((error: any) => console.error('Error sharing:', error));
      }
    }
  }




  Apex: any
  amenitiesHide = false;
  FacilitiesHide = false;
  userID: any;
  propAllIssue: any[] = [];
  propertyTypeId: any;
  onSelectionChange() {
    // console.log('Selected value:', this.selectedOption);
    // Here you can use `this.selectedValue` as needed
  }
  selectedOption: any;
  submitFormReport() {
    var usernumber = localStorage.getItem('userNumber');
    var userName = localStorage.getItem('userName');
    var loginId = localStorage.getItem('loginID');
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
          Swal.fire({
            title: 'Report Filed Successfully',
            text: 'Thank you for your Support',
            icon: 'success',
            showConfirmButton: false,
            timer: 2500
          });
        }
      });
    } else {
      window.location.hash = 'reportissue';
      // document.getElementById('id01').style.display = 'block';
      $('#otpValidate').css('display', 'block');
      if (this.loadComponent == false) {
        this.loadComponent = true;
        // sam
        // import('../otp-validation/otp-validation.module').then(mod => mod.OtpValidationModule).then(otpValidationComponent => {
        //   this.otpValidationComponent = otpValidationComponent.components['lazy'];
        // });
        import('../otp-validation/otp-validation.component').then(m => {
          this.otpValidationComponent = m.OtpValidationComponent;
        })
        this.Visiblebrochure = this.Visiblebrochure ? false : true;
        $('.modal-login').css('z-index', '1')
      }
    }
  }
  otpValidationComponent: any;
  loadComponent = false;
  Visiblebrochure = false;
  ngAfterViewInit() {

    setTimeout(() => {
      this.apiCallAfterDetails();
    }, 4000);

    setTimeout(() => {

      this.getlocationlist()
    }, 4000);

    const lastUpdated = localStorage.getItem('lastUpdated');
    const savedViewCount = localStorage.getItem('viewCount');
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
    this.randomnumber = setInterval(() => {
      this.resetView();
    }, 2 * 60 * 1000);
    this.currenturl = this.router.url;
    $(this.window).scroll(function () {
      if ($(this).scrollTop() > 440) {

        $('.nav-tabs').css('position', 'fixed');
      } else {
        $('.nav-tabs').css('position', 'sticky');
      }
    });


  }

  private scrollToActiveNav() {
    const activeNavItem = this.navItems.find((item) => item.nativeElement.classList.contains('actives'));

    if (activeNavItem) {
      activeNavItem.nativeElement.scrollIntoView({ behavior: 'smooth', inline: 'center' });
    }
  }
  cover_img: any
  commercialPropType_ID: any;
  getpropDetailsBYId() {
    this.otploader = true
    this.routeSub = this.activatedRoute.params.subscribe(params => {
      var lasturl = params['commercial-properties-for-sale_rent-in-:cityname-:typeid-:id'];
      var propid = lasturl.split('-').pop().match(/[0-9]+/);
      const inputString = lasturl
      const parts = inputString.split('-');
      const numberValue = parseInt(parts[parts.length - 2]);
      this.commercialtype_ID = numberValue;
      // 

      this.Service.getCommercialDetailsById(propid, this.commercialtype_ID).subscribe(offers => {
        if (offers['status'] === 'True') {
          console.log(offers)
          this.otploader = false
          this.cdr.markForCheck();

          this.propcommercialdetails = offers['propertydetails'];
          this.userID = this.propcommercialdetails[0]['userIDFK'];
          this.cover_img = this.propcommercialdetails[0]['cover_img'];
          if (this.cover_img) {
            const preloadLink = document.createElement('link');
            preloadLink.rel = 'preload';
            preloadLink.as = 'image';
            preloadLink.href = this.coverimage + this.cover_img + '?width=288&height=153';
            preloadLink.setAttribute('fetchpriority', 'high');
            document.head.appendChild(preloadLink);
          }
          // this.bhk = this.propdetails[0]['BHK'];
          // this.proptype = this.propdetails[0]['PropertyType'];
          this.propname = this.propcommercialdetails[0]['property_title'];
          // // this.Approval = this.propdetails[0]['Approvals'];
          const amenities = this.propcommercialdetails[0]['Amenities'];
          const propName = this.propcommercialdetails[0]['property_title'];
          this.cityid = this.propcommercialdetails[0]['cityid'];
          this.commercialPropType_ID = this.propcommercialdetails[0]['proparty_Type_Id'];

          // this.cityname = this.propcommercialdetails[0]['city_name'];
          // const BHK = this.propdetails[0]['BHK'];
          // this.bhkValue = BHK;
          // const PropertyType = this.propdetails[0]['Building_Type'];
          const Locality = this.propcommercialdetails[0]['locality_name'];
          this.localityname = Locality
          // const Locality_Id = this.propcommercialdetails[0]['localityid'];
          const Locality_Id = this.propcommercialdetails[0]['localityid'];
          this.localityid = Locality_Id;
          this.propAllIssue = this.propcommercialdetails[0]['report_list'];
          this.price = this.propcommercialdetails[0]['Price'];
          // this.propertyTypeId = this.propdetails[0]['property_typeIDFK'];
          // this.cityId = this.propdetails[0]['Cityid'];
          // this.bhkId = this.propdetails[0]['property_bhk'];
          this.propId = this.propcommercialdetails[0]['Property_ID'];
          this.cityname = this.propcommercialdetails[0]['city_name'];
          if (this.router.url.indexOf("commercial-properties-for-sale-in") > -1) {
            this.sale_rent = 1;
            // this.commercialrent = true;
          } else {
            this.sale_rent = 2
            // this.commercialrent = false;
          }
          // this.propRent = this.propdetails[0]['Rent'];
          // this.Citynamelowcase = City.replace(/\s+/g, '-').toLowerCase();
          // this.locationnamelowcase = Locality.replace(/\s+/g, '-').toLowerCase();
          // this.titleService.setTitle(propName + ' ' + BHK + ' ' + PropertyType + ' ' + 'Rent in ' + Locality + ',' + ' ' + City);
          // this.meta.updateTag({
          //   name: 'description',
          //   content: 'Enquire for ' + propName + ' ' + BHK + ' ' + PropertyType + ' available for rent in ' + Locality + ',' + ' ' + City + '. Visit Homes247.in to contact owner or to get more details'
          // });
          // this.meta.updateTag({
          //   property: 'og:title',
          //   content: propName + ' ' + BHK + ' ' + PropertyType + ' ' + 'Rent in ' + Locality + ',' + ' ' + City
          // });
          // this.meta.updateTag({
          //   property: 'og:description',
          //   content: 'Enquire for ' + propName + ' ' + BHK + ' ' + PropertyType + ' available for rent in ' + Locality + ',' + ' ' + City + '. Visit Homes247.in to contact owner or to get more details'
          // });
          this.titleService.setTitle(this.propname + ' | Commercial Space in ' + this.localityname + ', ' + this.cityname + ' | ₹' + this.price);
          this.meta.updateTag({
            name: 'description',
            content: this.propname + ' commercial property in ' + this.localityname + ', ' + this.cityname +
              '. Ideal for offices, shops & startups. Rent starts at ₹' + this.price + '.'
          });
          this.meta.updateTag({
            property: 'og:title',
            content: this.propname + ' Commercial Space in ' + this.localityname + ', ' + this.cityname
          });
          this.meta.updateTag({
            property: 'og:description',
            content: 'Find ' + this.propname + ' in ' + this.localityname + ', ' + this.cityname +
              '. Prime commercial property for offices & retail. Rent from ₹' + this.price + '.'
          });
          this.Service.createLinkForCanonicalURL();
          if (amenities.length === 0) {
            this.amenitiesHide = false;
          } else {
            this.amenitiesHide = true;
          }
          const Facilities = this.propcommercialdetails[0]['facilities'];
          if (Facilities.length === 0) {
            this.FacilitiesHide = false;
          } else {
            this.FacilitiesHide = true;
          }
          // for (let i = 0; i < this.Approval.length; i++) {
          //   this.Approval1.push(this.Approval[i]['approval']);
          //   this.approvalNew = this.Approval1.join();
          //   // console.log(this.approvalNew);
          // }
          const loginid = localStorage?.getItem('loginID');
          if (loginid === '1') {
            this.login = true;
            this.userId = localStorage?.getItem('userID');
            this.userNumber = localStorage?.getItem('userNumber');
            this.eliteService.getContactedList(this.userId).subscribe(response => {
              if (response['status'] == "True") {
                this.contactedList = response['pro_view']
                this.elitePropertyId = this.contactedList.map((item: any) => {
                  if (this.propId == item.property_IDPK) {
                    this.contactData = item.owner_details;
                    this.verificationDetailStatus = 2
                    this.otploader = false
                    setTimeout(() => {
                      this.toggleSubscriptionSheet()
                    }, 100);
                  } else {
                    this.otploader = false
                  }
                  return item.property_IDPK;
                });
                if (this.elitePropertyId?.length == 0) {
                } else {
                  this.eliteView = true;
                }
              }
            })
          } else {
            this.login = false;
          }
        }
      });
      var loginId = localStorage.getItem('loginID');
      var userID = localStorage.getItem('userID');
      var param = {
        userid: userID,
        propid: this.propId,
        db_category_id: 4
      };
      if (loginId === '1') {
        this.Address_Show = true;
        this.Address_Hide = false;
        this.Service.addUserSeenProjects(param).subscribe(responce => {
        });
      }
      const index = this.storagearrseen.indexOf(this.propId);
      if (index === -1) {
        this.storagearrseen.push(this.propId);
      }
      let existingData = localStorage.getItem('commercialSeenPropertyData');
      let dataArray = existingData ? JSON.parse(existingData) : [];
      const existingIndex = dataArray.findIndex(
        (item: any) => item.commercialPropertyID === this.propId
      );
      if (existingIndex === -1) {
        const finalObject = {
          commercialPropertyID: this.propId,
          commercialType: this.commercialtype_ID
        };
        dataArray.push(finalObject);
      } else {
        dataArray[existingIndex].commercialType = this.commercialtype_ID;
      }
      localStorage.setItem('commercialSeenPropertyData', JSON.stringify(dataArray));
    });
    var loginId = localStorage.getItem('loginID');
    if (loginId === '1') {
      this.Address_Show = true;
      this.Address_Hide = false;
    }
  }
  // propertyimage = this.Service.imagesURL + 'rentals/cover/';
  nearbyLocProp: any[] = [];
  showNearbyLocProp = false;
  LoginView = false;
  topicIssueRaised: any;
  IdissueRaised: any;
  selectIssue(issue: any, id: any) {
    if (issue) {
      this.topicIssueRaised = issue;
      this.IdissueRaised = id;
      $('.issueSubmitBtn').removeAttr('disabled'); //enable submitBtn
      $('.issueSubmitBtn').addClass('issueSubmitBtnActive');
      $('.issueSubmitBtn').removeClass('issueSubmitBtn');
      this.propAllIssue.forEach(propIssue => {
        propIssue.isSelected = (propIssue.report_types === issue && propIssue.IDPK === id);
      });
      this.checkSubmitButtonState();
    }
    else {
      $('.issueSubmitBtn').attr('disabled', true); //disable input
    }
  }



  apiCallAfterDetails() {
    var paramlocalityid = {
      localityId: this.localityid,
    };
    this.Service.getNearLocalityCommercialPropCount(paramlocalityid).subscribe(prop => {
      // 
      this.nearByLocality = prop['data'];
      for (let i = 0; i < this.nearByLocality.length; i++) {
        this.newNearByLocalityArry.push(this.nearByLocality[i]['locality']);
      }
      if (this.nearByLocality.length === 0) {
        this.nearByLocalityLen = false;
      } else {
        this.nearByLocalityLen = true;
      }
    });
    var param2 = {
      locid: this.localityid
    }
    this.Service.getlocalitymeta(this.cityname, param2).subscribe(metatag => {
      if ((metatag['status'] == 'True')) {
        let aboutdiscription = metatag['Localityseo'];
        this.aboutdiscription = aboutdiscription[0].Description;
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
      if (checkData.length == 0) {
        this.numbernan1 = true;
      } else {
        this.reviews1 = response['locality_review'];
        this.averageReviewsLoc = response['locality_review_avgper'];
        this.community = Math.round(this.averageReviewsLoc.community * 10) / 10;
        this.lifestyle = Math.round(this.averageReviewsLoc.lifestyle * 10) / 10;
        this.safety = Math.round(this.averageReviewsLoc.safety * 10) / 10;
        this.reviwcount1 = this.reviews1.length;
        if (!this.reviews1.length) {
          this.ratingreviews1 = false;
        } else {
          this.ratingreviews1 = true;
        }
        const fivestar = '5';
        const fivestarcount = this.reviews1.filter((obj) => Math.round(obj.avgrating).toString() === fivestar).length;
        this.fivestarcounts1 = fivestarcount / this.reviwcount1 * 100;
        this.FiveStarCountHtml1 = fivestarcount;
        const fourstar = '4';
        const fourstarcount = this.reviews1.filter((obj) => Math.round(obj.avgrating).toString() === fourstar).length;
        this.fourstarcounts1 = fourstarcount / this.reviwcount1 * 100
        this.FourStarCountHtml1 = fourstarcount;
        const thirdstar = '3';
        const threestarcount = this.reviews1.filter((obj) => Math.round(obj.avgrating).toString() === thirdstar).length;
        this.threestarcounts1 = threestarcount / this.reviwcount1 * 100;
        this.threeStarCountHtml1 = threestarcount;
        const twostar = '2';
        const twostarcount = this.reviews1.filter((obj) => Math.round(obj.avgrating).toString() === twostar).length;
        this.twostarcounts1 = twostarcount / this.reviwcount1 * 100;
        this.TwoStarCountHtml1 = twostarcount;
        const onestar = '1';
        const onestarcount = this.reviews1.filter((obj) => Math.round(obj.avgrating).toString() === onestar).length;
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
    var paramSimilar = {
      availabelitytype: this.sale_rent,
      commercial_type: this.commercialPropType_ID,
      cityID: this.cityid,
      prope_id: this.propId,

    };
    this.Service.getSimilarCommercialProp(paramSimilar).subscribe(
      (response) => {
        const recentlyAddedProp = response['data'];
        this.similarRentalProp = recentlyAddedProp;
        var similarPropLength = this.similarRentalProp.length
        if (similarPropLength == 0) {
          this.showSimilarProp = false;
        } else {
          this.showSimilarProp = true;
        }
      }
    );
    var paramNearbyLocProp = {
      locality_ID: this.localityid,
      property_type: this.commercialPropType_ID,
      currentproperty_id: this.propId,
      availablelitytype: this.sale_rent,
    };
    this.Service.getNearbyLocCommercialProp(paramNearbyLocProp).subscribe(
      (response) => {
        const recentlyAddedProp = response['data'];
        this.nearbyLocProp = recentlyAddedProp;
        var nearbyLocPropLength = this.nearbyLocProp.length
        if (nearbyLocPropLength == 0) {
          this.showNearbyLocProp = false;
        } else {
          this.showNearbyLocProp = true;
        }
      }
    );

  }
  isAnyIssueSelected(): boolean {
    return this.propAllIssue.some(issue => issue.isSelected);
  }
  issueSubmit() {
    this.LoginView = true;
  }
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
    loop: false,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    autoplay: false,
    autoplayHoverPause: false,
    margin: 10,
    autoWidth: false, // Ensure images do not exceed container width
    center: false, // Keeps the image centered
    lazyLoad: false, // Improves image loading
    autoplayTimeout: 3000, // Set delay for auto sliding
    smartSpeed: 600, // Smooth sliding animation
    // autoplaySpeed: 300,
    nav: true,
    navText: ['<img src="https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_mobile_3/assets/images/individual/leftArrow.svg" alt=\'LeftArrow\' class=\'prop_indi_owl owl-nav owl-prev main_move_left_gallery\'>',
      '<img src="https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_mobile_3/assets/images/individual/rightArrow.svg" alt=\'RightArrow\' class=\'prop_indi_owl owl-nav owl-next main_move_right_gallery\'>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
  };
  customOptionsGallery: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    autoplay: true,
    autoplaySpeed: 300,
    // nav: true,
    // navText: ['<img src=https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_mobile_3/assets/images/mini_banner_left_arrow.png alt=\'LeftArrow\' class=\'prop_details_owl owl-nav owl-prev main_move_left_gallery\'>',
    //   '<img src=https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_mobile_3/assets/images/mini_banner_right_arrow.png alt=\'RightArrow\' class=\'prop_details_owl owl-nav owl-next main_move_right_gallery\'>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 2
      },
      940: {
        items: 2
      }
    },
  };
  readmore() {
    $('.propDesc1').css('max-height', '200px');
    $('.propDesc1').css('overflow-y', 'scroll');
    $('.down_arrow').css('display', 'none');
    $('.up_arrow').css('display', 'block');
  }
  readless() {
    $('.propDesc1').css('max-height', '80px');
    $('.propDesc1').css('overflow-y', 'hidden');
    $('.down_arrow').css('display', 'block');
    $('.up_arrow').css('display', 'none');
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
    var scrollableDiv = document.getElementById('scrollable1');
    scrollToTarget('top', scrollableDiv);
  }
  readmore1() {
    $('.propDesc2').css('max-height', '200px');
    $('.propDesc2').css('overflow-y', 'scroll');
    $('.down_arrow2').css('display', 'none');
    $('.up_arrow2').css('display', 'block');
  }
  readless1() {
    $('.propDesc2').css('max-height', '80px');
    $('.propDesc2').css('overflow-y', 'hidden');
    $('.down_arrow2').css('display', 'block');
    $('.up_arrow2').css('display', 'none');
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
    var scrollableDiv = document.getElementById('scrollable2');
    scrollToTarget('top', scrollableDiv);
  }
  checkBox: boolean = false;
  contactButton: boolean = false;
  RequestButton: boolean = false;
  resquestImages: boolean = false;
  resquestCall: boolean = false;
  isInWishlist(propertyID: number): boolean {
    if ('userID' in localStorage) {
      this.storagearr = this.propertyIds
      // this.storagearr.push(this.userFavListLocalStorage);
      return this.storagearr.includes(propertyID);
    } else {
      return this.storagearr.includes(propertyID);
    }
  }
  // Pradeesh 
  Heart_Transtion(propertyID: number, commercial_type) {
    const index = this.storagearr.indexOf(propertyID);
    var loginID = localStorage.getItem('loginID')
    if (index !== -1) {
      this.storagearr.splice(index, 1); //local
      if (loginID == '1') {  // api
        const userid = localStorage.getItem('userID');
        var param = {
          userid: userid,
          propid: propertyID,
          CatagoryId: 4
        };
        this.Service.removeFavaourite(param).subscribe(response => {
        });
      }
    }
    else {
      this.storagearr.push(propertyID);
      if (loginID == '1') {
        const userid = localStorage.getItem('userID');
        var param = {
          userid: userid,
          propid: propertyID,
          CatagoryId: 4
        };
        this.Service.addfavaourite(param).subscribe(response => {
        });
      }
    }
    let existingData = localStorage.getItem('commercialPropertyData');
    let dataArray = existingData ? JSON.parse(existingData) : [];
    if (index === -1) {
      const finalObject = {
        commercialPropertyID: propertyID,
        commercialType: commercial_type
      };
      dataArray.push(finalObject);
    } else {
      dataArray = dataArray.filter(
        (item: any) => item.commercialPropertyID !== propertyID
      );
    }
    localStorage.setItem('commercialPropertyData', JSON.stringify(dataArray));
    localStorage.setItem('commercialPropertyID', JSON.stringify(this.storagearr));
  }


  // Heart_Transtion1(propertyID: number, commercial_type) {
  //   const index = this.storagearr.indexOf(propertyID);
  //   if (index !== -1) {
  //     this.storagearr.splice(index, 1);
  //   } else {
  //     this.storagearr.push(propertyID);
  //   }
  //   let existingData = localStorage.getItem('commercialPropertyData');
  //   let dataArray = existingData ? JSON.parse(existingData) : [];
  //   if (index === -1) {
  //     const finalObject = {
  //       commercialPropertyID: propertyID,
  //       commercialType: commercial_type
  //     };
  //     dataArray.push(finalObject);
  //   } else {
  //     dataArray = dataArray.filter(
  //       (item: any) => item.commercialPropertyID !== propertyID
  //     );
  //   }
  //   localStorage.setItem('commercialPropertyData', JSON.stringify(dataArray));
  //   localStorage.setItem('commercialPropertyID', JSON.stringify(this.storagearr));
  // }
  similarRentalProp: any[] = [];
  shareContent() {
    if ((window.navigator as any).share) {
      (window.navigator as any)
        .share({
          title: "Homes247.in",
          text: 'Check out this amazing Property!',
          url: 'https://www.homes247.in' + this.router.url,
        })
        .then(() => console.log('Shared Successfully'))
        .catch((error: any) => console.error('Error sharing:', error));
    } else {
      // console.log('Web Share API not supported on this device.');
    }
  }
  Report() {
    $('.ReportPopup').css('display', 'block');
  }
  shareContent1(data) {
    if ((window.navigator as any).share) {
      (window.navigator as any)
        .share({
          title: 'Checkout this Property - ' + data.property_name,
          text: 'Check out ' + 'Test',
          url: 'https://www.homes247.in' + this.router.url,
        })
        .then(() => console.log('Shared successfully'))
        .catch((error: any) => console.error('Error sharing:', error));
    } else {
      // console.log('Web Share API not supported on this device.');
    }
  }
  public currentActive = 0;

  private popupJustOpened = false;
  selectedIndex: number | null = null;
  selectedItem: any = null;
  private clickListener!: () => void;
  showPopup(index: number) {
    $('.agreementPopup').css('display', 'block');
    this.selectedIndex = index;
    // Set popupJustOpened to true to prevent immediate closure
    this.popupJustOpened = true;
    // Use a timeout to allow the opening click to finish before attaching the listener
    setTimeout(() => {
      this.popupJustOpened = false;
      // Attach event listener for clicks outside the popup
      this.clickListener = this.renderer.listen('document', 'click', (event: any) => {
        const popupElement = this.elRef.nativeElement.querySelector('.agreementPopup');
        // If the click happens outside the popup and not on the button
        if (!this.popupJustOpened && popupElement && !popupElement.contains(event.target) && !event.target.closest('.agreementDetails')) {
          this.closePopup(index);
        }
      });
    }, 0);  // Small delay to let the click event finish
  }
  closePopup(index: number) {
    $('.agreementPopup').css('display', 'none');
    // this.selectedIndex = -1;
    // Remove the click listener when the popup is closed
    if (this.clickListener) {
      this.clickListener();
    }
  }
  private observer: IntersectionObserver | null = null;
  CloseModal() {
    $('.enqiery').css('display', 'none');
    $('.OtpDiv').css('display', 'none');
    this.IsVisibleEnquery = false
  }
  ShowHideEnquery() {
    // var loginId = localStorage.getItem('loginID');
    // if (loginId === '1') {
    //   this.SubmitForm();
    // } else {
    this.IsVisibleEnquery = true;
    $('.enqiery').css('display', 'block');
    // }
    this.RequestButton = true;
    this.resquestImages = true;
    this.checkBox = false;
    this.resquestCall = false;
    this.contactButton = false;
    // this.enquiry.name='';
    // this.enquiry.mail='';
    // this.enquiry.number='';
    $('.form-field__input').removeAttr('style');
    $('#uname').attr('placeholder', 'Username');
    $('#uemail').attr('placeholder', 'Email');
    $('#unumber').attr('placeholder', '+91');
  }
  ExploreNearBylocation(id: any) {
    let thisPage = new URL(
      'https://www.homes247.in/' +
      this.Citynamelowcase +
      '/property-sale-in-' +
      this.locationnamelowcase +
      '-' +
      id
    );
    location.href = thisPage.toString();
  }
  ShowHideEnquery1() {
    var loginId = localStorage.getItem('loginID');
    if (loginId === '1') {
      this.Address_Show = true;
      this.Address_Hide = false;
    } else {
      window.location.hash = 'ViewAddress';
      // document.getElementById('id01').style.display = 'block';
      $('#otpValidate').css('display', 'block');
      if (this.loadComponent == false) {
        this.loadComponent = true;
        // sam
        // import('../otp-validation/otp-validation.module').then(mod => mod.OtpValidationModule).then(otpValidationComponent => {
        //   this.otpValidationComponent = otpValidationComponent.components['lazy'];
        // });
        this.Visiblebrochure = this.Visiblebrochure ? false : true;
        $('.modal-login').css('z-index', '1')
      }
    }
  }
  ShowHideEnquery2() {
    // var loginId = localStorage.getItem('loginID');
    // if (loginId === '1') {
    //   this.Address_Show = true;
    //   this.Address_Hide = false;
    //   this.SubmitForm();
    // }else {
    //   window.location.hash = 'ViewAddress';
    //   // document.getElementById('id01').style.display = 'block';
    //   $('#otpValidate').css('display','block');
    //   if(this.loadComponent == false){
    //   this.loadComponent = true;
    //   import('../otp-validation/otp-validation.module').then(mod => mod.OtpValidationModule).then(otpValidationComponent => {
    //     this.otpValidationComponent = otpValidationComponent.components['lazy'];
    //   });
    //   this.Visiblebrochure = this.Visiblebrochure ? false : true;
    //   $('.modal-login').css('z-index', '1')
    // }
    // }
    // $('.OtpDiv').css('display','none');
    this.goBackFromEnq();
  }
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
      Swal.fire({
        title: 'Please enter the OTP!',
        icon: 'error',
        showConfirmButton: false,
        timer: 1000
      });
      return false;
    } else {
      var liveotpcount = $('#otp').val().length;
      if (liveotpcount < otplength) {
        this.ngOtpInput()?.setValue('');
        Swal.fire({
          title: 'Please enter the valid OTP!',
          icon: 'warning',
          showConfirmButton: false,
          timer: 1500
        });
        return false;
      } else {
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
        this.otploader = false;
        this.countdown4()?.restart();
      } else {
        this.ngOtpInput()?.setValue('');
        this.otploader = false;





        Swal.fire({
          title: 'Oops Something Error!',
          text: 'Its Not a valid OTP / OTP Expired!',
          icon: 'error',
          showConfirmButton: false,
          timer: 1500
        });
      }
    }, (err) => {
      // console.log('Connection Failed');
    });

    return true;
  }
  otpHandle() {
    var param = this.enquiry;
    // this.Filter.name = param.name;
    // this.Filter.number   = param.number;
    // this.Filter.email = param.email;
    this.Service.otpsend(param).subscribe((success: { messages }) => {
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
        // this.loader = false;
        // this.otpValidating = true;
        var buttonId = $('#one').attr('id');
      } else {
        Swal.fire({
          title: 'Oops Something Error!',
          icon: 'error',
          showConfirmButton: false,
          timer: 1500
        });
      }
    }, (err) => {
      // console.log('Connection Failed');
    });
  }
  config = {
    allowNumbersOnly: true,
    length: 4,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      'width': '50px',
      'height': '50px'
    }
  };
  countdownconfig = {
    leftTime: 60,
    demand: true
  };
  otpBasedLogin1() {
    const paramNum = {
      number: this.enquiry.number
    }
    // this.countdownconfig = {
    //   leftTime: 60,
    //   demand: true
    // };
    this.countdown4()?.restart();
    this.ngOtpInput()?.setValue('');
    this.otploader = true;




    this.Service.otpsend(paramNum).subscribe((success: { messages }) => {
      var status = success.messages[0].status;
      if (status == 'ENQUEUED') {
        $('.countdown_maindiv').css('display', 'block');
        $('.otpexpireclass').css('display', 'none');
        this.countdown4()?.begin();
        this.otploader = false;





        // var buttonId = $('#one').attr('id');
        // $('#modal-container').removeAttr('class').addClass(buttonId);
        // $('body').addClass('modal-active');
        // $('body').removeClass('bodyoverlay');
      } else {
        Swal.fire({
          title: 'Oops Something Error!',
          icon: 'error',
          showConfirmButton: false,
          timer: 1500
        });
        // this.otploader = false;
        // $('body').removeClass('bodyoverlay');
      }
    },
      (err) => {
        console.log('Connection Failed');
      });
  }
  goback1() {
    $('.OtpDiv').css('display', 'none');
    $('.enqiery').css('display', 'block');
    this.numberLogIn = true;
    // this.countdownconfig = {
    //   leftTime: 60,
    //   demand: true
    // };
    this.countdown4()?.restart();
    // this.otpValidating = false;
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
    // this.otploader = true;
    this.SubmitForm();
    // var loginId = localStorage.getItem('loginID');
    // if (loginId === '1') {
    //   this.Address_Show = true;
    //   this.Address_Hide = false;
    //   this.SubmitForm();
    // }else {
    //   window.location.hash = 'ViewAddress';
    //   // document.getElementById('id01').style.display = 'block';
    //   $('#otpValidate').css('display','block');
    //   if(this.loadComponent == false){
    //   this.loadComponent = true;
    //   import('../otp-validation/otp-validation.module').then(mod => mod.OtpValidationModule).then(otpValidationComponent => {
    //     this.otpValidationComponent = otpValidationComponent.components['lazy'];
    //   });
    //   this.Visiblebrochure = this.Visiblebrochure ? false : true;
    //   $('.modal-login').css('z-index', '1')
    // }
    // }

    return true
  }
  contactedRentalarr = [];
  SubmitForm() {

    this.otploader = true;




    var param = this.enquiry;
    this.enquiry.localityId = this.localityid;
    this.enquiry.propertyid = this.propId;
    var cityid = this.cityid
    this.enquiry.regionId = 1
    this.enquiry.propertyname = this.propname
    var value = this.cityservice.cityfinder(this.router.url);
    this.cityname = value.cityname.replace('-', ' ');
    this.cityId = value.cityid;
    // 
    // this.cityid = value.cityid;
    var urlValue = this.cityservice.urlFinder(this.router.url);
    this.pageOrigin = urlValue.pageOrigin
    let browserInfo = navigator.userAgent;
    let browser;
    var pageorgin = this.cityname + '_' + this.pageOrigin;
    if (browserInfo.includes('Opera') || browserInfo.includes('Opr')) {
      browser = 'Opera';
    } else if (browserInfo.includes('Edg')) {
      browser = 'Edge';
    } else if (browserInfo.includes('Chrome')) {
      browser = 'Chrome';
    } else if (browserInfo.includes('Safari')) {
      browser = 'Safari';
    } else if (browserInfo.includes('Firefox')) {
      browser = 'Firefox'
    } else {
      browser = 'unknown'
    }
    var utm_medium = this.activatedRoute.snapshot.queryParamMap.get('utm_medium');
    if (utm_medium) {
      this.enquiry.source = 'Homes247-Campaign'
      this.enquiry.propertyname = this.Filter.PropertyName + ' && ' + utm_medium;
    } else {
      this.enquiry.source = 'Homes247-Mobile';
    }
    this.Service.commercialenq(param, pageorgin, cityid, browser).subscribe(success => {

      if (success['status'] === 'True') {
        this.otploader = false;
        this.cdr.markForCheck();




        // 
        if (success['code'] === "3") {
          this.otpHandle();
          $('#otpValidate').css('display', 'none');
        } else {
          this.IsVisibleEnquery = false;
          Swal.fire({
            text: 'We Will Intimate you soon!',
            icon: 'success',
            showConfirmButton: false,
            timer: 2500
          });
          const index = this.storagearr.indexOf(this.propId);
          if (index === -1) {
            this.storagearr.push(this.propId);
          }
          let existingData = localStorage.getItem('contactedcommercialPropData');
          let dataArray = existingData ? JSON.parse(existingData) : [];
          const existingIndex = dataArray.findIndex(
            (item: any) => item.commercialPropertyID === this.propId
          );
          if (existingIndex === -1) {
            const finalObject = {
              commercialPropertyID: this.propId,
              commercialType: this.commercialtype_ID
            };
            dataArray.push(finalObject);
          } else {
            dataArray[existingIndex].commercialType = this.commercialtype_ID;
          }
          localStorage.setItem('contactedcommercialPropData', JSON.stringify(dataArray));
        }




        this.Address_Show = true;
        this.Address_Hide = false;
        $('.blurred-text').remove();
        // this.cancel.nativeElement.click();
        $('body').removeClass('bodyoverlay');
        $('#modal-container2').addClass('out');
        $('body').removeClass('modal-active');
        // this.enquiry.name = '';
        // this.enquiry.number = '';
        // this.enquiry.mail = '';
        // this.enquiry.otp = '';
        $('.form-field__input').removeAttr('style');
        $('#uname').attr('placeholder', 'Username');
        $('#uemail').attr('placeholder', 'Email');
        $('#unumber').attr('placeholder', '+91');
        // $('.close-login').click();
        this.enquiry.verification = 1;
      } else {
        this.otploader = false;




        Swal.fire({
          icon: 'error',
          title: 'Something Went Wrong',
          showConfirmButton: false,
          timer: 1500,
        });
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
      $('#contactButton2').removeAttr('disabled'); //enable input
      $('#contactButton2').addClass('contactButton2Active');
    } else {
      $('#contactButton2').attr('disabled', true); //disable input
      $('#contactButton2').removeClass('contactButton2Active');
      $('#contactButton2').addClass('contactButton2');
    }
  }
  currenturl: any;
  parsedarray: any[] = [];
  storagearr = [];
  storagearrseen = [];
  storagearr1 = [];
  gallerySection1 = false;
  section = 'section1';
  gallerySection() {
    this.gallerySection1 = true
    // $("#modal-fullscreen-xl3").css("display","block")
  }
  scrollTo(section: any): void {
    const headerHeight = 120;
    const targetElement = document.querySelector<any>('#' + section);
    if (targetElement) {
      const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset;
      const adjustedTopPosition = offsetTop - headerHeight;
      window.scrollTo({
        top: adjustedTopPosition,
        behavior: 'smooth'
      });
    }
    // document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
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
  };
  getlocationlist() {
    this.Service.getlocationlist().subscribe((city: any[]) => {
      this.citiess = city['locations'];
    });
    this.Service.gettopBuildersCommercial().subscribe((topBuilders: any[]) => {
      this.allBuilders = topBuilders['builderinfo'];
    })
    this.Service.getrecentblogs().subscribe((blogs: any[]) => {
      if (blogs['status'] === 'True') {
        this.blogsloader = false;
        this.blogs = blogs['locations'];
        this.blogapiload = false;
      } else {
        this.blogsloader = true;
      }
    });
    const trendingId = '1';
    this.Service.getTrendingblogsList(trendingId).subscribe(responce => {
      if (responce['status'] === 'True') {
        this.trendingBlogs = responce['blogcategory'];
      }
    });
    var param = {
      cityId: '1',
      userId: this.UserId,
    }
    this.Service.commercialSaleProperties1(param).subscribe((topProperty: any[]) => {
      // 
      if (topProperty['status'] === 'True') {
        this.topprojectsloader = false;
        this.commercialPropertiesSale = topProperty['Propdetails'];
      } else {
        this.topprojectsloader = true;
      }
    });
    // this.Service.commercialRentProperties(param).subscribe((topProperty: any[]) => {
    //   if (topProperty['status'] === 'True') {
    //     this.topprojectsloader = false;
    //     this.commercialPropertiesRent = topProperty['Propdetails'];
    //   } else {
    //     this.topprojectsloader = true;
    //   }
    // });
    // this.Service.commercialProperties(param).subscribe((topProperty: any[]) => {
    //   if (topProperty['status'] === 'True') {
    //     this.topprojectsloader = false;
    //     this.allCommercialProperties = topProperty['builderinfo'];
    //   }
    // });
    if ('userID' in localStorage) {
      this.UserId = localStorage.getItem('userID');
      if ('commercialPropertyID' in localStorage) {
        // this.userFavListLocalStorage = JSON.parse(localStorage.getItem('commercialPropertyID'));
      } else {
        localStorage.setItem('commercialPropertyID', '[]');
        // this.userFavListLocalStorage = JSON.parse(localStorage.getItem('commercialPropertyID'));
      }
      this.Service.getUserWishListByIdTest(this.UserId, 4).subscribe(userFavList => {
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
      category_id: 4
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
  isVisible: any = false



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


