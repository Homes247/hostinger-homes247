import {
  Component,
  AfterViewInit,
  ElementRef,
  HostListener,
  Inject,
  OnInit,
  ViewChild,
  ViewChildren,
  QueryList,
  DOCUMENT,
  PLATFORM_ID,
  NgZone,
  ChangeDetectorRef,
} from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Location, CommonModule, isPlatformBrowser } from '@angular/common';
import { DataService } from '../data.service';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OwlOptions, CarouselModule } from 'ngx-owl-carousel-o';
import { CountdownComponent, CountdownEvent } from 'ngx-countdown';
// import { enquiry } from '../prop-details/class';
import { CityService } from '../city.service';
import { Title, Meta } from '@angular/platform-browser';
import { FilterService } from '../filter.service';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NgOtpInputModule } from 'ng-otp-input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { cleanUrlPipe, Convertnumber, PriceFormatterPipe } from '../mainpipe-pipe';
import { SanitizeHtmlPipe } from '../mainpipe-pipe';
// import { InnerHeaderComponent } from '../innerheader/innerheader.component';
// import { ScrollSpy2Directive } from '../scroll-spy2-individual-detail.directive';
// import { ScrollSpyDirective } from '../scroll-spy.directive';
import { PhotoGalleryModule } from '@twogate/ngx-photo-gallery';
import { enquiry } from '../class/class';
import { ScrollSpyDirective } from '../scroll-spy.directive';

import { SafeStorageService } from '../safe-storage.service';
import { InnerHeader } from '../inner-header/inner-header';
import { ElitedataService } from '../elitedata.service';


declare var swal: any;
declare var $: any;
interface VisibilityStep {
  icon: string;
  label: string;
  subLabel?: string;
  state: 'completed' | 'active' | 'pending';
}


@Component({
  selector: 'app-individual-details',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CarouselModule,
    NgxSkeletonLoaderModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    NgOtpInputModule,
    MatProgressBarModule,
    PhotoGalleryModule,
    cleanUrlPipe,
    SanitizeHtmlPipe,
    Convertnumber,
    InnerHeader,
    ScrollSpyDirective,
    PriceFormatterPipe


    // InnerHeaderComponent,
    // ScrollSpyDirectiv,
    // ScrollSpy2Directive,
  ],
  templateUrl: './individual-detail.html',
  styleUrls: ['./individual-detail.css'],
  host: { ngSkipHydration: 'true' },
})


export class IndividualDetailsComponent implements OnInit, AfterViewInit {
  @ViewChild('cd2', { static: false }) private countdown: CountdownComponent;
  @ViewChild('cancel') cancel: ElementRef;
  @ViewChildren('navItm') navItm: QueryList<ElementRef>;


  user = new enquiry();
  offers: any;

  masterplan: string = '';
  Floorplan: string = '';
  ImageUrl: string = '';
  amenitesImages: string = '';
  FooterComponent: any;
  IsVisibleEnquery: any;
  routeSub: any;
  propDetails: any;
  approval = [];
  approvalnew = [];
  newapprov: any;
  NearByprop = [];
  nearBy = [];
  propAllIssue: any[] = [];
  NearByProperties: any;
  proparea: any;
  propareatype: any;
  bhk: any;
  proptype: any;
  propname: any;
  otploader: boolean = true;
  amenitiesHide = false;
  FacilitiesHide = false;
  detailed: any;
  requestCallback: boolean = false;
  imagesCallback: Boolean = false;
  gallerySection1 = false;
  section = 'section1';
  selectedTab: string = 'gallery';

  enquiryFormindComponent: any;
  localId: any;
  propId: any;
  CityName: any;

  window!: Window;
  isBrowser: boolean;
  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
    public Services: DataService,
    private _location: Location,
    private activatedRoute: ActivatedRoute,
    public Service: DataService,
    public Filter: FilterService,
    public cityservice: CityService,
    private titleService: Title,
    private meta: Meta,
    public eliteService: ElitedataService,

    private storage: SafeStorageService,
    private zone: NgZone,
    @Inject(DOCUMENT) private doc,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    this.window = this.doc.defaultView as Window & typeof globalThis;
    // this.isBrowser = isPlatformBrowser(platformId)

    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  divreached = false;
  @ViewChild('scrollapiloader') scrollapiloader: ElementRef;

  loaded = false;
  mousemovement = false;


  @HostListener('window:scroll', [])
  @HostListener('touchstart', [])
  onWindowScroll() {
     import('../footer-new-mobile/footer-new-mobile').then(m => {
      this.FooterComponent = m.FooterNewMobile;
    });
    this.coverimages = this.Service.SellImages + 'cover/';
    this.Service.mouseenterservice3();
    this.mousemovement = true;
    if (isPlatformBrowser(this.platformId)) {
      $('.agreementPopup').css('display', 'none');
    }

    this.Service.mouseenterservice3();
    const elementPosition = this.scrollapiloader.nativeElement.offsetTop;
    const scrollPosition = window.pageYOffset;

    if ((this.divreached = scrollPosition >= elementPosition)) {
      // import('../enquiry-form-ind/enquiry-form-ind.module').then(mod => mod.enquiryFormindModule).then(enquiryFormindModule => {
      //   this.enquiryFormindComponent = enquiryFormindModule.components['lazy'];
      //   $('.modal-login').css('z-index', '99999');
      // });

      import('../enquiry-form-individual/enquiry-form-individual').then(m => {
        this.enquiryFormindComponent = m.EnquiryFormIndividual
        $('.modal-login').css('z-index', '99999');
      })



    }
  }

  footerGallery: boolean = false;
  currenturl: any;
  login: boolean = false
  userId: any
  userNumber: any
  contactedList: any
  elitePropertyId: any = [];
  eliteView: boolean = false;
  verificationDetailStatus: any
  contactData: any = {};

  ngOnInit(): void {

    this.dataLoads();
    this.getindividualPropDetails();
    this.titleService.setTitle('Individual Properties For Sale | Homes247.in');
    this.meta.updateTag({
      name: 'description',
      content:
        'Homes247.in - Easy way to find properties in India. Welcome to the Best Indian Real Estate Website and search among millions of Apartments, Flats and Villas in India',
    });
    this.Service.createLinkForCanonicalURL();


    this.section = 'section0';
    this.currenturl = this.router.url;


    const value = this.storage.getItem('propertyID');
    if (value) {
      this.storagearr = JSON.parse(this.storage.getItem('propertyID')!);
    } else {

      this.storage.setItem('propertyID', '[]');

      this.storagearr = JSON.parse(this.storage.getItem('propertyID')!);
    }
    $(window).scroll(function () {
      if ($(this).scrollTop() > 440) {
        $('.nav-tabs').first().css('position', 'fixed');
      } else {
        $('.nav-tabs').first().css('position', 'sticky');
      }
    });


  }



  coverimages: string = 'https://img.homes247.in/images/individuallistings/cover/';

  dataLoads() {

    // this.coverimages = this.Service.SellImages + 'cover/';
    this.masterplan = this.Service.SellImages + 'master/';
    this.Floorplan = this.Service.SellImages + 'floorplan/';
    this.ImageUrl = this.Service.SellImages + 'gallery/';
    this.amenitesImages = this.Service.amenitiesImageURL + 'amenites/amenities-new/';
  }

  randomnumber: any;
  numberOfViewers: any = 0;
  resetView() {

    this.numberOfViewers = Math.floor(Math.random() * (50 - 10 + 1)) + 10;

    this.storage.setItem('viewCount', this.numberOfViewers);
    this.storage.setItem('lastUpdated', String(Date.now()));
  }

  ngOnDestroy(): void {
    if (this.numberOfViewers) {
      clearInterval(this.numberOfViewers);
    }
    this.unlockBodyScroll();
  }

  ngAfterViewInit() {

    setTimeout(() => {
      this.toggleHomiDetailAiSheet();
    }, 500);

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
      this.randomnumber = setInterval(
        () => {
          this.resetView();
        },
        2 * 60 * 1000,
      );

    });

   


    this.scrollToActiveNav();
    setTimeout(() => {
      this.scrollTo(this.section);
    }, 100);
  }

  private scrollToActiveNav() {
    const activeNavItem1 = this.navItm.find((item) =>
      item.nativeElement.classList.contains('actives'),

    );

    if (activeNavItem1) {
      activeNavItem1.nativeElement.scrollIntoView({ behavior: 'smooth', inline: 'center' });
    }
  }

  activeSection(type: any) {
    if (type == 'proprty') {
      $('.other_section').removeClass('.active');
      $('.property_section').addClass('.active');
    } else if (type == 'mas') {
      $('.other_section').removeClass('.active');
      $('.master_section').addClass('.active');
    } else if (type == 'floo') {
      $('.other_section').removeClass('.active');
      $('.floor_section').addClass('.active');
    }
  }

  userID: any;
  hideGallerySection = true;
  verificationStatus: any;
  userNameAi: any;

  getindividualPropDetails() {

    this.routeSub = this.activatedRoute.params.subscribe((params) => {
      var localityname = params['locality'];
      var lasturl = params['individualproperty'];
      var propid = lasturl
        .split('-')
        .pop()
        .match(/[0-9]+/);
      this.propId = propid;
      this.otploader = true
      this.Service.getindividualpropertydetails(propid).subscribe((prop) => {
        if (prop['verification_status'] == '0') {
          this.verificationStatus = 0;
        } else if (prop['verification_status'] == '1') {
          this.verificationStatus = 1;
        }

        this.propDetails = prop['propertydetails'];
        this.otploader = false
        this.cdr.markForCheck();
        this.CityName = this.propDetails[0]['City'];
        this.detailed = this.propDetails[0]['Price'];
        this.userNameAi = this.propDetails[0]['uTag'];
        this.userID = this.propDetails[0]['userIDFK'];
        this.bhk = this.propDetails[0]['BHK'];
        this.proptype = this.propDetails[0]['PropertyType'];
        this.propname = this.propDetails[0]['PropertyName'];
        this.approval = this.propDetails[0]['Approvals'];
        this.NearByprop = this.propDetails[0]['Nearby'];
        this.localId = this.propDetails[0]['LocalityID'];
        for (let i = 0; i < this.approval.length; i++) {
          this.approvalnew.push(this.approval[i].approvals);
          this.newapprov = this.approvalnew.join();
        }
        for (let i = 0; i < this.NearByprop.length; i++) {
          this.nearBy.push(this.NearByprop[i].nearby);
          this.NearByProperties = this.nearBy.join();
        }
        const amenities = this.propDetails[0]['Amenities'];
        if (amenities.length === 0) {
          this.amenitiesHide = false;
        } else {
          this.amenitiesHide = true;
        }
        const Facilities = this.propDetails[0]['Facilities'];
        if (Facilities.length === 0) {
          this.FacilitiesHide = false;
        } else {
          this.FacilitiesHide = true;
        }
        if (this.propDetails[0]['images'].length === 0) {
          this.hideGallerySection = false;
        }
        this.numDifferentiation(this.propDetails[0]['Price']);

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
          this.otploader = false
          this.login = false;
        }


      });







    });
  }

  price: any;

  numDifferentiation(value: any) {
    this.price = Math.abs(value);
    if (this.price >= 10000000) {
      this.price = (this.price / 10000000).toFixed(2) + ' Cr';
    } else if (this.price >= 100000) {
      this.price = (this.price / 100000).toFixed(2) + ' Lac';
    }
  }

  customOptionsLocality: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    autoplay: false,
    autoplaySpeed: 300,
    nav: false,
    navText: ['<img src=https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_mobile/images/mini_banner_left_arrow.png alt=\'LeftArrow\' class=\'locality_review owl-nav owl-prev main_move_left\'>',
      '<img src=https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_mobile/images/mini_banner_right_arrow.png alt=\'RightArrow\' class=\'locality_review owl-nav owl-next main_move_right\'>'],
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

  ShowHideEnquery(bhk: any, proptype: any, propname: any, userIdfk: any, data: any) {
    this.Filter.localityid = this.localId;
    this.Filter.proptype = proptype;
    this.Filter.PropertyName = propname;
    this.Filter.Bedrooms = bhk;
    this.Filter.userIdfk = userIdfk;
    this.Filter.area = this.proparea;
    this.Filter.areatype = this.propareatype;
    this.Filter.propid = data.PropertyID;

    $('#otpValidateind').css('display', 'block');
    $('.loginModelImg13').css('display', 'block');
    $('.loginModelImg12').css('display', 'none');
  }

  ShowHideEnquery1(
    proparea: any,
    propareatype: any,
    proptype: any,
    propname: any,
    userIdfk: any,
    data: any,
  ) {
    this.Filter.localityid = this.localId;
    this.Filter.proptype = proptype;
    this.Filter.PropertyName = propname;
    this.Filter.userIdfk = userIdfk;
    this.Filter.area = proparea;
    this.Filter.areatype = propareatype;
    this.Filter.propid = data.PropertyID;
    $('#otpValidateind').css('display', 'block');
    $('.loginModelImg12').css('display', 'block');
    $('.loginModelImg13').css('display', 'none');
  }

  Brochure: boolean = false;
  brochureEnquery() {
    this.Brochure = true;
    this.contactButton = true;
    this.checkBox = true;
    this.requestCallback = false;
    this.RequestButton = false;
    this.imagesCallback = false;
    this.IsVisibleEnquery = this.IsVisibleEnquery ? false : true;
  }

  otpsend() {
    if ($('#uname').val() == '') {
      $('#uname').focus().css('border-color', 'red').attr('placeholder', 'Please Enter Name');
      return false;
    } else {
      var enameFilter = /^([a-zA-Z]+\s)*[a-zA-Z]+$/;
      if (enameFilter.test($('#uname').val())) {
        $('#uname').removeAttr('style');
      } else {
        $('#uname')
          .focus()
          .css('border-color', 'red')
          .attr('placeholder', 'Please enter valid name')
          .val('');
        return false;
      }
    }

    if ($('#uemail').val() === '') {
      $('#uemail').focus().css('border-color', 'red').attr('placeholder', 'Please Enter Email-id');
      return false;
    } else {
      var emai = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
      if (emai.test($('#uemail').val())) {
        $('#uemail').removeAttr('style');
      } else {
        $('#uemail')
          .focus()
          .css('border-color', 'red')
          .attr('placeholder', 'Please enter valid email-id')
          .val('');
        return false;
      }
    }

    if ($('#unumber').val() == '') {
      $('#unumber')
        .focus()
        .css('border-color', 'red')
        .attr('placeholder', 'Please Enter Phone Number');
      return false;
    } else {
      var mobilee = /^[0-9]{10}$/;
      if (mobilee.test($('#unumber').val())) {
        $('#unumber').removeAttr('style');
      } else {
        $('#unumber')
          .focus()
          .css('border-color', 'red')
          .attr('placeholder', 'Please enter valid contact number')
          .val('');
        return false;
      }
    }

    this.otploader = true;
    this.SubmitForm();

    return true;
  }

  SubmitForm() {
    var param = this.user;
    const Exactpage = this.bhk + '-' + this.proptype + '-' + this.propname;
    this.Service.individuallistenq(param, Exactpage, this.propname, this.userID).subscribe(
      (success) => {
        if (success['status'] === 'True') {
          this.otploader = false;
          this.cdr.markForCheck();
          $('body').removeClass('bodyoverlay');
          swal({
            text: 'We Will Intimate you soon!',
            type: 'success',
            showConfirmButton: false,
            timer: 2500,
          });
          $('#modal-container2').addClass('out');
          $('body').removeClass('modal-active');
          this.user.name = '';
          this.user.number = '';
          this.user.mail = '';
          this.user.otp = '';
          this.requestImages();
          $('#btn_reset2').click();
        } else {
          swal({
            type: 'error',
            title: 'Something Went Wrong',
            showConfirmButton: false,
            timer: 1500,
          });
        }
      },
    );
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

  checkBox: boolean = false;
  contactButton: boolean = false;
  RequestButton: boolean = false;

  requestImages() {
    this.Brochure = false;
    this.checkBox = false;
    this.contactButton = false;
    this.RequestButton = true;
    this.requestCallback = false;
    this.imagesCallback = true;
    this.IsVisibleEnquery = this.IsVisibleEnquery ? false : true;
  }

  reviewbutton: any;
  loginbutton: any;
  UserId: any;
  parsedarray: any[] = [];

  wishlistaddstorage(id: any) {
    if ('propertyID' in this.storage) {
    } else {
      this.storage.setItem('propertyID', '[]')

    }
    const proparray = this.storage.getItem('propertyID');
    const jsonpars = JSON.parse(proparray!);
    const itemToRemoveIndex = jsonpars.indexOf(id);

    this.parsedarray = JSON.parse(proparray!);
    if (itemToRemoveIndex == -1) {
      this.parsedarray.push(id);
      this.storage.setItem('propertyID', JSON.stringify(this.parsedarray));

    } else {
      this.parsedarray = this.parsedarray.filter(function (item) {
        return item !== id;
      });
      this.storage.setItem('propertyID', JSON.stringify(this.parsedarray));
    }
    if ('propertyID' in this.storage) {
      this.storagearr = JSON.parse(this.storage.getItem('propertyID')!);
    } else {
      this.storage.setItem('propertyID', '[]');
      this.storagearr = JSON.parse(this.storage.getItem('propertyID')!);
    }
  }

  storagearr = [];
  public currentActive = 0;

  isInWishlist(propertyID: number): boolean {

    return this.storagearr?.includes(propertyID);
  }

  Heart_Transtion(propertyID: number) {


    const index = this.storagearr.indexOf(propertyID);
    var loginID = localStorage.getItem('loginID')
    if (index !== -1) {
      this.storagearr.splice(index, 1);
      if (loginID == '1') {
        const userid = localStorage.getItem('userID');
        var param = {
          userid: userid,
          propid: propertyID,
          CatagoryId: 2
        };
        this.Services.removeFavaourite(param).subscribe(response => {
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
          CatagoryId: 2
        };
        this.Services.addfavaourite(param).subscribe(response => {
        });
      }
    }
    localStorage.setItem('individualPropertyID', JSON.stringify(this.storagearr));
  }

  // Heart_Transtion1(propertyID: number) {
  //   const index = this.storagearr.indexOf(propertyID);
  //   if (index !== -1) {
  //     this.storagearr.splice(index, 1);
  //   } else {
  //     this.storagearr.push(propertyID);
  //   }
  //   this.storage.setItem('propertyID', JSON.stringify(this.storagearr));
  //   if ('propertyID' in this.storage) {
  //     this.storagearr = JSON.parse(this.storage.getItem('propertyID')!);
  //   } else {
  //     this.storage.setItem('propertyID', '[]');
  //     this.storagearr = JSON.parse(this.storage.getItem('propertyID')!);
  //   }
  // }

  shareContent(propertydemo: any) {
    if ((window.navigator as any).share) {
      (window.navigator as any)
        .share({
          title: 'Homes247.in',
          text: 'Check out this amazing Property!',
          url:
            'https://www.homes247.in/property/' +
            propertydemo.City.toLowerCase().replace(/\s+/g, '-') +
            '/' +
            propertydemo.Locality.toLowerCase().replace(/\s+/g, '-') +
            '/' +
            propertydemo.PropertyName.toLowerCase().replace(/\s+/g, '-') +
            '-' +
            propertydemo.PropertyID,
        })
        .then(() => console.log('Shared Successfully'))
        .catch((error: any) => console.error('Error sharing:', error));
    }
  }

  gallerySection() {

    this.gallerySection1 = true;
    this.section = 'section0';
    $('body').css('overflow', 'hidden');
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


    if (sectionId != undefined) {

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


        const navContainer1 = document.querySelector('#sublinks_sticky .nav-tabs1') as HTMLElement;
        const activeEl1 = document.querySelector('#sublinks_sticky .nav-tabs1 li.actives') as HTMLElement;

        if (navContainer1 && activeEl1) {
          navContainer1.scrollTo({
            left: activeEl1.offsetLeft - (navContainer1.offsetWidth / 2) + (activeEl1.offsetWidth / 2),
            behavior: 'smooth'
          });
        }






      }, 300);

    }

  }

  // scrollToGallery(section: string): void {
  //   // this.section = section;
  //   // console.log('scrollToGallery',this.section)
  //   setTimeout(() => {
  //     const gallery = document.querySelector('.gallery') as HTMLElement;
  //     const targetElement = document.getElementById(section);

  //     if (targetElement) {
  //       const targetTop = targetElement.getBoundingClientRect().top;
  //       if (gallery && gallery.contains(targetElement)) {
  //         const galleryTop = gallery.getBoundingClientRect().top;
  //         const scrollOffset = targetTop - galleryTop + gallery.scrollTop - 87;
  //         gallery.scrollTo({ top: scrollOffset, behavior: 'smooth' });
  //       } else {
  //         const scrollOffset = window.scrollY + targetTop - 87;
  //         window.scrollTo({ top: scrollOffset, behavior: 'smooth' });
  //       }
  //     }
  //   }, 50);
  // }



  scrollToGallery(section: string): void {

    if (section == 'section0') {
      this.section = section;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (section == 'section10') {
      this.section = section;
    }


    setTimeout(() => {
      const gallery = document.querySelector('.gallery') as HTMLElement;
      const targetElement = document.getElementById(section);

      if (targetElement) {
        const targetTop = targetElement.getBoundingClientRect().top;
        if (gallery && gallery.contains(targetElement)) {
          const galleryTop = gallery.getBoundingClientRect().top;
          const scrollOffset = targetTop - galleryTop + gallery.scrollTop - 87;
          gallery.scrollTo({ top: scrollOffset, behavior: 'smooth' });
        } else {
          const scrollOffset = window.scrollY + targetTop - 87;
          window.scrollTo({ top: scrollOffset, behavior: 'smooth' });
        }

      }
    }, 50);
  }


  // onSectionChange(sectionId: any) {
  // console.log(sectionId)
  //    if(sectionId!=undefined){

  //      this.section = sectionId;
  //      this.scrollToActiveNav();

  //    }
  // }

  backPageIcon() {
    this.gallerySection1 = false;
    $('body').removeClass('modal-open');
    $('.modal-backdrop').removeClass();
    $('body').css('overflow', 'scroll');
    this.section = 'section1';
  }

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

  isAnyIssueSelected(): boolean {
    return this.propAllIssue.some((issue) => issue.isSelected);
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

  isHomiDetailSheetOpen = false;

  toggleHomiDetailAiSheet() {
    if (this.isHomiDetailSheetOpen) return;

    const sheet = document.getElementById('homiDetailAiSheet') as HTMLElement;
    const header = document.getElementById('homiDetailAiHeader') as HTMLElement;
    const body = document.getElementById('homiDetailAiBody') as HTMLElement;
    const backdrop = document.getElementById('customModalBackdrop') as HTMLElement;

    if (!sheet || !header || !body || !backdrop) return;
    backdrop.classList.add('active');
    sheet.style.height = '360px';

    setTimeout(() => {
      header.classList.add('homiHeadderHide');
      body.classList.add('homiActiveSlide');
    }, 50);

    this.isHomiDetailSheetOpen = true;
  }

  closeHomiDetailAiSheet() {
    const sheet = document.getElementById('homiDetailAiSheet') as HTMLElement;
    const header = document.getElementById('homiDetailAiHeader') as HTMLElement;
    const body = document.getElementById('homiDetailAiBody') as HTMLElement;
    const backdrop = document.getElementById('customModalBackdrop') as HTMLElement;

    if (!sheet || !header || !body || !backdrop) return;

    backdrop.classList.remove('active');
    sheet.style.height = '60px';
    header.classList.remove('homiHeadderHide');
    body.classList.remove('homiActiveSlide');

    this.isHomiDetailSheetOpen = false;
  }


  close() {
    $('#contactModal').on('hide.bs.modal', function (e) {
      $(this).addClass('hide-down'); // add slide-down class
    });

    $('#contactModal').on('hidden.bs.modal', function (e) {
      $(this).removeClass('hide-down'); // cleanup
    });

  }


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
    // alert('h')
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
      category_id: 2
    }

    this.eliteService.detailesCard(param).subscribe(response => {
      if (response['status'] == 'True') {
        this.elitePropertyId.push(propertyId);
        this.contactData = response['contacteddata'];
        this.verificationStatus = 2
        setTimeout(() => {
          this.toggleSubscriptionSheet()

        }, 200);

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
