import { Location, DOCUMENT, CommonModule, NgComponentOutlet, SlicePipe, DatePipe, DecimalPipe } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, Inject, OnDestroy, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CountdownComponent, CountdownEvent } from 'ngx-countdown';
import { OwlOptions, CarouselModule } from 'ngx-owl-carousel-o';
import { DataService } from '../data.service';
import { Enquiry } from '../home/home';
import { FormsModule } from '@angular/forms';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { NgOtpInputModule } from 'ng-otp-input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
// import { InnerheaderComponent } from '../innerheader/innerheader.component';
import { cleanUrlPipe, SanitizeHtmlPipe } from '../mainpipe-pipe';
// import { sanitizeHtmlPipe } from '../mainpipe-pipe';
import { PriceFormatterPipe } from '../mainpipe-pipe';
import { ScrollSpyDirective } from '../scroll-spy.directive';

import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { SafeStorageService } from '../safe-storage.service';
import { InnerHeader } from '../inner-header/inner-header';
import { PhotoGalleryModule } from '@twogate/ngx-photo-gallery';
import swal from 'sweetalert2';
import { ElitedataService } from '../elitedata.service';

// declare var swal: any;
declare var $: any;

@Component({
  selector: 'app-rentdetails',
  standalone: true,
  templateUrl: './rentdetails.html',
  styleUrls: ['./rentdetails.css'],
  host: { ngSkipHydration: 'true' },
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgxSkeletonLoaderModule,
    // CountdownModule,
    NgOtpInputModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    CarouselModule,
    cleanUrlPipe,
    SanitizeHtmlPipe,
    InnerHeader,
    ScrollSpyDirective,
    PhotoGalleryModule,
    CountdownComponent,




    // InnerheaderComponent,


  ]
})
export class Rentdetails implements OnInit, OnDestroy, AfterViewInit {
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
  ImageUrl: string = '';
  // amenitesImages = this.Service.amenitiesImageURL + 'amenites/amenities-new/';
  otploader: boolean = false;
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
  // propertydetails: any;
  bhkId: any;
  propRent: any;
  showSimilarProp: boolean = false;
  propId: any;
  currentCity: any;
  localityname: any;
  bhkValue: any;
  localityid: any;
  UserId: any;
  userRentalFavList = [];
  propertyIds = [];
  propertyimage: any;
  amenitesImages: any
  Address_Hide = true;
  Address_Show = false;
  // private window = window;

  window!: Window;
  isBrowser: boolean;
  galleryOptions = {};
  constructor(private router: Router,
    private cdr: ChangeDetectorRef,
    public eliteService: ElitedataService,

    private _location: Location,
    public Service: DataService,
    private renderer: Renderer2, private elRef: ElementRef,
    private storage: SafeStorageService,
    @Inject(DOCUMENT) private doc,
    private activatedRoute: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: Object,
    private titleService: Title, private meta: Meta) {

    this.isBrowser = isPlatformBrowser(this.platformId);
    this.window = this.doc.defaultView!;
    this.Service.mouseenterlistenOtp().subscribe((m: any) => {
      if (this.window.location.hash === '#reportissue') {
        this.submitFormReport();
      } else if (this.window.location.hash === '#ViewAddress') {
        this.SubmitForm();
      }
    });
  }
  Demo: any

  coverimage: string = 'https://img.homes247.in/images/rentals/cover/';
  login: boolean = false
  userId: any
  userNumber: any
  contactedList: any
  elitePropertyId: any = [];
  eliteView: boolean = false;
  contactData: any = {};
  ngOnInit(): void {

    // this.coverimage = this.Service.RenImages + 'cover/';
    this.ImageUrl = this.Service.RenImages + 'gallery/';

    this.getpropDetailsBYId();



    import('../footer-new-mobile/footer-new-mobile').then(m => {
      this.FooterComponent = m.FooterNewMobile;

    });

    // Nitin
    import('../apex-card3/apex-chart3.component').then(m => {
      this.Apex = m.ApexChart3Component;
    });

    this.cdr.detectChanges();



    import('../otp-validation/otp-validation.component').then(m => {
      this.otpValidationComponent = m.OtpValidationComponent;
    })
    this.numberOfViewers = Math.floor(Math.random() * (50 - 10 + 1)) + 10;
    this.currenturl = this.router.url;

    $(this.window).scroll(function () {

      if ($(this).scrollTop() > 440) {
        // 
        $('.nav-tabs').css('position', 'fixed');
      } else {
        $('.nav-tabs').css('position', 'sticky');
      }
    });

    setTimeout(() => {
      this.toggleHomiDetailAiSheet();
    }, 500);

    this.getDataLoad()
  }

  getDataLoad() {
    this.propertyimage = this.Service.imagesURL + 'rentals/cover/';

    this.amenitesImages = this.Service.ImageURL + 'amenites/amenities-new/active/';
  }

  mousemovement = false;

  @HostListener('window:scroll', [])
  @HostListener('touchstart', [])
  onWindowScroll() {
    this.coverimage = this.Service.RenImages + 'cover/';
    this.Service.mouseenterservice3();
    this.mousemovement = true;
    if (isPlatformBrowser(this.platformId)) {
      $('.agreementPopup').css('display', 'none');
    }
  }

  onclickshare(data: any) {
    if ((window.navigator as any).share) {
      (window.navigator as any)
        .share({
          title: 'Checkout this Property - ' + data.property_name,
          text: 'Check out ' + 'Test',
          url: 'https://www.homes247.in' + this.router.url,
        })
        .then(() => console.log('Shared Successfully'))
        .catch((error: any) => console.error('Error sharing:', error));
    } else {
      // 
    }
  }
  Apex: any;
  amenitiesHide = false;
  FacilitiesHide = false;
  userID: any;
  propAllIssue: any[] = [];
  propertyTypeId: any;
  onSelectionChange() {
    // 
    // Here you can use `this.selectedValue` as needed
  }

  selectedOption: any;

  submitFormReport() {
    var usernumber = this.storage.getItem('userNumber');
    var userName = this.storage.getItem('userName');
    var loginId = this.storage.getItem('loginID');
    if (loginId === '1') {
      this.otploader = false;
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

          swal.fire({
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
        import('../otp-validation/otp-validation.component').then(m => {
          this.otpValidationComponent = m.OtpValidationComponent;
        })

        //      import('../footer-new-mobile/footer-new-mobile').then(m => {
        //        this.FooterComponent = m.FooterNewMobile;
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
    // Scroll to the correct nav item initially if a section is already active
    this.scrollToActiveNav();
  }


  private scrollToActiveNav() {
    const activeNavItem = this.navItems.find((item) => item.nativeElement.classList.contains('actives'));
    if (activeNavItem) {
      activeNavItem.nativeElement.scrollIntoView({ behavior: 'smooth', inline: 'center' });
    }
  }

  verificationStatus: any;
  userNameAi: any;



  getpropDetailsBYId() {
    this.routeSub = this.activatedRoute.params.subscribe(params => {
      var lasturl = params['bhk-:propertytype-for-rent-in-:locality-:cityname-:propname-:id'];
      var propid = lasturl.split('-').pop().match(/[0-9]+/);
      this.otploader = true
      // console.log(this.otploader)
      this.cdr.markForCheck();
      this.Service.getRentalsDetailsById(propid).subscribe(offers => {

        if (offers['success'] == 'success') {
          this.otploader = false
          // console.log(this.otploader)
          this.cdr.markForCheck();
        }

        if (offers['verification_status'] == '0') {
          this.verificationStatus = 0;
        } else if (offers['verification_status'] == '1') {
          this.verificationStatus = 1;
        }

        this.propdetails = offers['propertydetails'];


        this.userID = this.propdetails[0]['userIDFK'];
        this.bhk = this.propdetails[0]['BHK'];
        this.proptype = this.propdetails[0]['PropertyType'];
        this.propname = this.propdetails[0]['PropertyName'];
        this.userNameAi = this.propdetails[0]['uTag'];

        // this.Approval = this.propdetails[0]['Approvals'];
        const amenities = this.propdetails[0]['Amenities'];
        const propName = this.propdetails[0]['PropertyName'];
        const BHK = this.propdetails[0]['BHK'];
        this.bhkValue = BHK;
        const PropertyType = this.propdetails[0]['PropertyType'];
        const Locality = this.propdetails[0]['Locality'];
        this.localityname = Locality;
        const Locality_Id = this.propdetails[0]['LocalityId'];
        this.localityid = Locality_Id;
        const City = this.propdetails[0]['City'];
        this.currentCity = City;
        this.propAllIssue = this.propdetails[0]['report_list'];
        this.propertyTypeId = this.propdetails[0]['property_typeIDFK'];
        this.cityId = this.propdetails[0]['Cityid'];
        this.bhkId = this.propdetails[0]['property_bhk'];
        this.propId = this.propdetails[0]['PropertyID'];
        this.propRent = this.propdetails[0]['Rent'];

        this.Citynamelowcase = City.replace(/\s+/g, '-').toLowerCase();
        this.locationnamelowcase = Locality.replace(/\s+/g, '-').toLowerCase();
        this.titleService.setTitle(propName + ' ' + BHK + ' ' + PropertyType + ' ' + 'Rent in ' + Locality + ',' + ' ' + City);
        this.meta.updateTag({
          name: 'description',
          content: 'Enquire for ' + propName + ' ' + BHK + ' ' + PropertyType + ' available for rent in ' + Locality + ',' + ' ' + City + '. Visit Homes247.in to contact owner or to get more details'
        });
        this.meta.updateTag({
          property: 'og:title',
          content: propName + ' ' + BHK + ' ' + PropertyType + ' ' + 'Rent in ' + Locality + ',' + ' ' + City
        });
        this.meta.updateTag({
          property: 'og:description',
          content: 'Enquire for ' + propName + ' ' + BHK + ' ' + PropertyType + ' available for rent in ' + Locality + ',' + ' ' + City + '. Visit Homes247.in to contact owner or to get more details'
        });
        this.Service.createLinkForCanonicalURL();
        if (amenities.length === 0) {
          this.amenitiesHide = false;
        } else {
          this.amenitiesHide = true;
        }
        const Facilities = this.propdetails[0]['Facilities'];
        if (Facilities.length === 0) {
          this.FacilitiesHide = false;
        } else {
          this.FacilitiesHide = true;
        }
        for (let i = 0; i < this.Approval.length; i++) {
          this.Approval1.push(this.Approval[i]['approval']);
          this.approvalNew = this.Approval1.join();
          // 
        }

        var paramlocalityid = {
          localityId: Locality_Id,
        };
        this.Service.getNearLocalityRental(paramlocalityid).subscribe(prop => {
          this.nearByLocality = prop['details'];
          for (let i = 0; i < this.nearByLocality.length; i++) {
            this.newNearByLocalityArry.push(this.nearByLocality[i]['locality'][0]);
          }
          if (this.nearByLocality.length === 0) {
            this.nearByLocalityLen = false;
          } else {
            this.nearByLocalityLen = true;
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
            this.fourstarcounts1 = fourstarcount / this.reviwcount1 * 100;
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
          Proptype: this.propertyTypeId,
          prize: this.propRent,
          bhk: this.bhkId,
          cityId: this.cityId
        };

        this.Service.getSimilarProp(paramSimilar).subscribe(
          (response) => {
            const recentlyAddedProp = response['similar_prop_list'];
            this.similarRentalProp = recentlyAddedProp;
            var similarPropLength = this.similarRentalProp.length;
            if (similarPropLength == 0) {
              this.showSimilarProp = false;
            } else {
              this.showSimilarProp = true;
            }
          }
        );

        var paramNearbyLocProp = {
          Proptype: this.propertyTypeId,
          localityId: this.propId,
        };

        this.Service.getNearbyLocProp(paramNearbyLocProp).subscribe(
          (response) => {
            var nearbyLocPropLength = this.nearbyLocProp.length;

            if (nearbyLocPropLength == 0) {
              this.showNearbyLocProp = false;
            } else {
              this.showNearbyLocProp = true;
            }
          }
        );

        var loginId = this.storage.getItem('loginID');
        var userID = this.storage.getItem('userID');
        var param = {
          userid: userID,
          propid: this.propId,
          db_category_id: 3
        };
        if (loginId === '1') {
          this.Address_Show = true;
          this.Address_Hide = false;
          this.Service.addUserSeenProjects(param).subscribe(responce => {
          });
        }
        const index = this.storagearrseen.indexOf(this.propId);
        if (index !== -1) {
        }
        else {
          this.storagearrseen.push(this.propId);
        }
        this.storage.setItem('rentalSeenPropertyID', JSON.stringify(this.storagearrseen));


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
                  this.verificationStatus = 2
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
            } else {
              this.otploader = false

            }
          })

        } else {
          this.login = false;
          this.otploader = false

        }


      });
    });
    if ('userID' in this.storage) {
      this.UserId = this.storage.getItem('userID');
      const value = this.storage.getItem('rentalPropertyID');
      if (value) {
        // this.userFavListthis.storage = JSON.parse(this.storage.getItem('rentalPropertyID'));
      } else {
        this.storage.setItem('rentalPropertyID', '[]');
        // this.userFavListthis.storage = JSON.parse(this.storage.getItem('rentalPropertyID'));
      }

      this.Service.getUserWishListByIdTest(this.UserId, 3).subscribe(userFavList => {
        this.userRentalFavList = userFavList['favouritelist'];
        this.propertyIds = this.userRentalFavList.map(item => item.propertyId);
      });

    } else {
      const value = this.storage.getItem('rentalPropertyID');
      if (value) {
        this.storagearr = JSON.parse(this.storage.getItem('rentalPropertyID')!);
      } else {
        this.storage.setItem('rentalPropertyID', '[]');
        this.storagearr = JSON.parse(this.storage.getItem('rentalPropertyID')!);
      }
    }

    if ('rentalSeenPropertyID' in this.storage) {
      this.storagearrseen = JSON.parse(this.storage.getItem('rentalSeenPropertyID')!);
    } else {
      this.storage.setItem('rentalSeenPropertyID', '[]');
      this.storagearrseen = JSON.parse(this.storage.getItem('rentalSeenPropertyID')!);
    }
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


  customOptionsGallery: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    autoplay: true,
    autoplaySpeed: 300,
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
    $('.propDesc1').css('max-height', '460px');
    $('.propDesc1').css('overflow-y', 'scroll');
    $('.down_arrow').css('display', 'none');
    $('.up_arrow').css('display', 'block');
  }

  readless() {
    $('.propDesc1').css('max-height', '230px');
    $('.propDesc1').css('overflow-y', 'hidden');
    $('.down_arrow').css('display', 'block');
    $('.up_arrow').css('display', 'none');
    var scrollToTarget = function (target: any, containerEl: any) {
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
  readmore1() {
    $('.propDesc2').css('max-height', '200px');
    $('.propDesc2').css('overflow-y', 'scroll');
    $('.down_arrow').css('display', 'none');
    $('.up_arrow').css('display', 'block');
  }

  readless1() {
    $('.propDesc2').css('max-height', '80px');
    $('.propDesc2').css('overflow-y', 'hidden');
    $('.down_arrow').css('display', 'block');
    $('.up_arrow').css('display', 'none');
    var scrollToTarget = function (target: any, containerEl: any) {
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


  isInWishlist1(propertyID: number): boolean {
    return this.storagearr.includes(propertyID);
  }

  // Pradeesh
  isInWishlist(propertyID: number): boolean {
    if ('userID' in this.storage) {
      this.storagearr = this.propertyIds;
      // this.storagearr.push(this.userFavListthis.storage);
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
        var param = {
          userid: userid,
          propid: propertyID,
          CatagoryId: 3,
        };
        this.Service.removeFavaourite(param).subscribe((response) => { });
      }
    } else {
      this.storagearr.push(propertyID);
      if (loginID == '1') {
        const userid = this.storage.getItem('userID');
        var param = {
          userid: userid,
          propid: propertyID,
          CatagoryId: 3,
        };
        this.Service.addfavaourite(param).subscribe((response) => { });
      }
    }
    this.storage.setItem('rentalPropertyID', JSON.stringify(this.storagearr));
  }


  Heart_Transtion1(propertyID: number) {
    if ('userID' in this.storage) {
      const userid = this.storage.getItem('userID');
      var param = {
        userid: userid,
        propid: propertyID,
        CatagoryId: 3,
      };
      this.Service.addfavaourite(param).subscribe((response) => { });
    }
    const index = this.storagearr.indexOf(propertyID);
    if (index !== -1) {
      this.storagearr.splice(index, 1);
    } else {
      this.storagearr.push(propertyID);
    }
    this.storage.setItem('rentalPropertyID', JSON.stringify(this.storagearr));

    const value = this.storage.getItem('rentalPropertyID');
    if (value) {
      this.storagearr = JSON.parse(this.storage.getItem('rentalPropertyID')!);
    } else {
      this.storage.setItem('rentalPropertyID', '[]');
      this.storagearr = JSON.parse(this.storage.getItem('rentalPropertyID')!);
    }
  }


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
      // 
    }
  }
  Report() {
    $('.ReportPopup').css('display', 'block');
  }
  shareContent1(data: any) {
    if ((window.navigator as any).share) {
      (window.navigator as any)
        .share({
          title: 'Checkout this Property - ' + data.property_name,
          text: 'Check out ' + 'Test',
          url: 'https://www.homes247.in' + this.router.url,
        })
        .then(() => console.log('Shared Successfully'))
        .catch((error: any) => console.error('Error sharing:', error));
    } else {
      // 
    }
  }
  public currentActive = 0;
  facilitiesPath = 'https://img-mr.homes247.in/images/rentals/icons_facilities/';


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

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
    // Clean up the click listener to avoid memory leaks
    if (this.clickListener) {
      this.clickListener();
    }
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
    var loginId = this.storage.getItem('loginID');
    if (loginId === '1') {
      this.Address_Show = true;
      this.Address_Hide = false;
    } else {
      window.location.hash = 'ViewAddress';
      // document.getElementById('id01').style.display = 'block';
      $('#otpValidate').css('display', 'block');
      if (this.loadComponent == false) {
        this.loadComponent = true;

        import('../otp-validation/otp-validation.component').then(m => {
          this.otpValidationComponent = m.OtpValidationComponent;
        })
        this.Visiblebrochure = this.Visiblebrochure ? false : true;
        $('.modal-login').css('z-index', '1');
      }
    }
  }

  ShowHideEnquery2() {
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
  @ViewChild('cd4', { static: false }) private countdown4: CountdownComponent;
  @ViewChild('ngOtpInput', { static: false }) ngOtpInput: any;

  otpvalidate4() {

    var otplength = 4;
    var otpValue = $('#otp').val();

    if ($('#otp').val() == '') {
      this.ngOtpInput.setValue('');
      swal.fire({
        title: 'Please enter the OTP!',
        icon: 'error',
        showConfirmButton: false,
        timer: 1000
      });
      return false;
    } else {

      var liveotpcount = $('#otp').val().length;
      if (liveotpcount < otplength) {

        this.ngOtpInput.setValue('');

        swal.fire({
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
        this.countdown4.restart();
      } else {
        this.ngOtpInput.setValue('');
        this.otploader = false;
        swal.fire({
          title: 'Oops Something Error!',
          text: 'Its Not a valid OTP / OTP Expired!',
          icon: 'error',
          showConfirmButton: false,
          timer: 1500
        });
      }
    }, (err: any) => {
      // 
    });

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
        this.countdown4.begin();
        this.ngOtpInput.setValue('');

        var buttonId = $('#one').attr('id');
      } else {
        swal.fire({
          title: 'Oops Something Error!',
          icon: 'error',
          showConfirmButton: false,
          timer: 1500
        });
      }
    }, (err: any) => {
      // 
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
    leftTime: 30,
    demand: true
  };
  clickCount = 0;
  otpBasedLogin1() {
    this.clickCount++;
    const paramNum = {
      number: this.enquiry.number
    };
    // this.countdownconfig = {
    //   leftTime: 30,
    //   demand: true
    // };
    this.countdown4?.restart();
    this.ngOtpInput.setValue('');
    this.otploader = true;
    this.Service.otpsend(paramNum).subscribe((success: { messages: any }) => {
      var status = success.messages[0].status;
      if (status == 'ENQUEUED') {
        $('.countdown_maindiv').css('display', 'block');
        $('.otpexpireclass').css('display', 'none');
        this.countdown4.begin();
        this.otploader = false;
      } else {
        swal.fire({
          title: 'Oops Something Error!',
          icon: 'error',
          showConfirmButton: false,
          timer: 1500
        });
      }
    },
      (err: any) => {
      });
  }
  goback1() {
    $('.OtpDiv').css('display', 'none');
    $('.enqiery').css('display', 'block');
    this.numberLogIn = true;

    // this.countdownconfig = {
    //   leftTime: 30,
    //   demand: true
    // };
    // this.countdown4.begin(); 
    this.countdown4.restart();
    this.otpValidating = false;
  }
  handleEvent(e: CountdownEvent) {
    if (e.action === 'done') {
      $('.countdown_maindiv').css('display', 'none');
      if (this.clickCount == 2) {
        $('.otpexpireclass2').css('display', 'block');
      } else {
        $('.otpexpireclass').css('display', 'block');
      }
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
    return true;
  }

  contactedRentalarr = [];

  SubmitForm() {
    this.otploader = true;
    var param = this.enquiry;
    this.enquiry.localityId = this.localityid;
    this.enquiry.propertyid = this.propId;
    const Exactpage = this.bhk + '-' + this.proptype + '-' + this.propname;
    this.Service.rentalsenq(param, Exactpage, this.propname, this.userID).subscribe(success => {
      if (success['status'] === 'True') {


        if (success['code'] === "3") {



          this.otpHandle();
          $('#otpValidate').css('display', 'none');

        } else {

          this.IsVisibleEnquery = false;
          swal.fire({
            text: 'We Will Intimate you soon!',
            icon: 'success',
            showConfirmButton: false,
            timer: 2500
          });
          this.enquiry.name = '';
          this.enquiry.number = '';
          this.enquiry.mail = '';
          if ('contactedRentalPropId' in this.storage) {
            this.contactedRentalarr = JSON.parse(this.storage.getItem('contactedRentalPropId') || '[]');
          } else {
            this.contactedRentalarr = [];
          }
          if (!this.contactedRentalarr.includes(this.propId)) {
            this.contactedRentalarr.push(this.propId);
            this.storage.setItem('contactedRentalPropId', JSON.stringify(this.contactedRentalarr));
          }
        }
        this.otploader = false;
        this.cdr.markForCheck();
        this.Address_Show = true;
        this.Address_Hide = false;
        $('.blurred-text').remove();
        $('body').removeClass('bodyoverlay');

        $('#modal-container2').addClass('out');
        $('body').removeClass('modal-active');
        $('.form-field__input').removeAttr('style');
        $('#uname').attr('placeholder', 'Username');
        $('#uemail').attr('placeholder', 'Email');
        $('#unumber').attr('placeholder', '+91');
        this.enquiry.verification = 1;
      } else {
        this.otploader = false;
        swal.fire({
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

  numberOfViewers: number = 0;
  storagearr = [];
  storagearr1 = [];
  storagearrseen = [];

  gallerySection1 = false;
  section = '';

  gallerySection() {
    this.gallerySection1 = true;
    this.section = 'section1'
  }

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
  };

  // homi sam

  isHomiDetailSheetOpen = false;
  toggleHomiDetailAiSheet() {
    // Prevent closing by tapping the header again
    if (this.isHomiDetailSheetOpen) return;

    const sheet = document.getElementById("homiDetailAiSheet") as HTMLElement;
    const header = document.getElementById("homiDetailAiHeader") as HTMLElement;
    const body = document.getElementById("homiDetailAiBody") as HTMLElement;
    const backdrop = document.getElementById("customModalBackdrop") as HTMLElement;

    if (!sheet || !header || !body || !backdrop) return;
    backdrop.classList.add("active");
    sheet.style.height = "360px";

    setTimeout(() => {
      header.classList.add("homiHeadderHide");
      body.classList.add("homiActiveSlide");
    }, 50);

    this.isHomiDetailSheetOpen = true;
  }

  closeHomiDetailAiSheet() {
    const sheet = document.getElementById("homiDetailAiSheet") as HTMLElement;
    const header = document.getElementById("homiDetailAiHeader") as HTMLElement;
    const body = document.getElementById("homiDetailAiBody") as HTMLElement;
    const backdrop = document.getElementById("customModalBackdrop") as HTMLElement;

    if (!sheet || !header || !body || !backdrop) return;

    // Hide backdrop
    backdrop.classList.remove("active");

    // Slide sheet down
    sheet.style.height = "60px";

    // Reset visibility
    header.classList.remove("homiHeadderHide");
    body.classList.remove("homiActiveSlide");

    this.isHomiDetailSheetOpen = false;
  }

  // subscriptionDetailHeader

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
      category_id: 3
    }

    this.eliteService.detailesCard(param).subscribe(response => {
      if (response['status'] == 'True') {
        this.elitePropertyId.push(propertyId);
        this.contactData = response['contacteddata'];
        this.verificationStatus = 2
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

