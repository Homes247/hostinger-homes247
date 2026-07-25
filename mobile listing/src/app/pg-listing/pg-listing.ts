import { Location, CommonModule, TitleCasePipe, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, DOCUMENT, ElementRef, HostListener, Inject, OnDestroy, OnInit, PLATFORM_ID, QueryList, Renderer2, viewChild, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatChip, MatChipSelectionChange, MatChipsModule } from '@angular/material/chips';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { CityService } from '../city.service';
import { DataService } from '../data.service';
import { FilterService } from '../filter.service';
import { Enquiry } from '../home/home';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { NgOtpInputModule } from 'ng-otp-input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CountdownComponent, CountdownEvent } from 'ngx-countdown';
import { MatChipOption } from '@angular/material/chips';
import { cleanUrlPipe, OrderByPipe2, MyFilterunique2, SanitizeHtmlPipe, ReplaceLineBreaksany, PriceFormatterPipe, customPriceFormatPipe } from '../mainpipe-pipe';
import { SafeStorageService } from '../safe-storage.service';

// Swal lazy-loaded
import { InnerHeadderWithSidenav } from '../inner-headder-with-sidenav/inner-headder-with-sidenav';
import { ElitedataService } from '../elitedata.service';
import { AdCardsComponent } from "../ad-cards/ad-cards.component";


declare var $: any;

@Component({
  selector: 'app-pg-listing',
  templateUrl: './pg-listing.html',
  styleUrls: ['./pg-listing.css'],

  standalone: true,
  imports: [
    cleanUrlPipe,
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSkeletonLoaderModule,
    NgOtpInputModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatChipsModule,
    InnerHeadderWithSidenav,
    customPriceFormatPipe,
    CountdownComponent,
    AdCardsComponent
],
})
export class PgListing implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('scrollAnchor', { static: false }) scrollAnchor!: ElementRef;
  @ViewChild('scrollPart', { read: ElementRef }) scrollPart!: ElementRef<HTMLElement>;
  @ViewChild('cancel') cancel!: ElementRef;
  readonly countdown4 = viewChild<CountdownComponent>('cd4');
  readonly ngOtpInput = viewChild<any>('ngOtpInput')


  propertylists: any[] = [];

  enquiry = new Enquiry();
  public n: number = 1;
  citiess: any;
  cityid: any;
  selected: any;
  currentCity: any;
  changeText: boolean = false;
  zeroProjects: boolean = false
  delayLoaded: boolean = false
  filter: boolean = false;
  filterLoader: boolean = false;
  myControl = new FormControl();
  options: any;
  filteredOptions!: Observable<any>;
  locationSelectedId = '1';
  searchstring: any;
  blogs: any;
  blogsloader: boolean = true;
  showloader = true;
  offers: any;
  FooterComponent: any;
  IsVisibleFilter: boolean = false;
  IsVisibleEnquery: boolean = false;
  plotSelect: boolean = false;
  projecttype: any[] = [];
  Availability: any[] = [];
  FurnishType: any;
  RentRange: any[] = [];
  TenantType: any;
  BhkRange: any[] = [];
  postedBy: any;
  bhkarray: any[] = [];
  balconyarray: any[] = [];
  doorfacings: any[] = [];
  approvals: any[] = [];
  amenities: any[] = [];
  villaSelect: boolean = false;
  filterSelectOne: boolean = false;
  apartmentSelect: boolean = false;
  ImmediateSelect: boolean = false;
  Within15DaysSelect: boolean = false;
  Within30DaysSelect: boolean = false;
  After30DaysSelect: boolean = false;
  FullFurnishSelect: boolean = false;
  NoFurnishSelect: boolean = false;
  SemiFurnishSelect: boolean = false;
  RentRange1Select: boolean = false;
  RentRange2Select: boolean = false;
  RentRange3Select: boolean = false;
  RentRange4Select: boolean = false;
  RentRange5Select: boolean = false;
  RentRange6Select: boolean = false;
  Furnish: boolean = false;
  SemiFurnish: boolean = false;
  unFurnish: boolean = false;
  maxbudget_IDPK: any;
  minbudget_IDPK: any;
  FamilySelect: boolean = false;
  BachelorSelect: boolean = false;
  FamilyBachelorSelect: boolean = false;
  ThreeBHKSelect: boolean = false;
  TwoBHKSelect: any;
  OneBHKSelect: boolean = false;
  OneRKSelect: boolean = false;
  AgentSelect: any;
  OwnerSelect: any;
  static citycount: number;
  private routeSub!: Subscription;
  proptypeurlparam: any;
  property_typeId: any;
  cityapi: any;
  noOfBedrooms: any;
  locality: any;
  statusId: any;
  projectcount: any;
  PGprojectcount: any;
  propertiescount: any;

  bhklist: any;
  balconylist: any;
  bathroomlist: any;
  furnishlist: any;
  Tenantslist: any;
  Ownershiplist: any;
  Propertytypelist: any;
  Doorfacelist: any;
  Approvalslist: any;
  Amenitieslist: any;
  bathroomarray: any[] = [];
  listarraylength: any;
  localityData: any[] = [];
  dropdownSettingsMobile: any = {};
  localitys: any;
  todaydate: string = '';
  futuredate: string = '';
  otploader: boolean = true;
  propbhk: any;
  proptype: any;
  propname: any;
  proparea: any;
  propareatype: any;
  propertyenquire: string = '';
  cityId: string = '';
  city: string = '';
  projectcount_city: any;
  projectcommercialcount: any;
  Tenant: string = '';
  storagearr: number[] = [];
  availability_text: string = '';
  buildingtype: any;
  RegionType: any;

  selectedAge: any;
  propertyId: any;
  currenturl: any;
  topprojectsloader = true;
  selectedOption: any;
  regionid: any;
  cityname: any;
  pageOrigin: any;
  propAllIssue: any[] = [];
  otpValidationComponent: any;
  loadComponent = false;

  Visiblebrochure = false;
  minPrice: any;
  maxPrice: any;
  contactedRentalarr: any;
  TypeList: any;
  SuitedTypeList: any;
  FoodTypeList: any;
  RoomTypeList: any;
  RoomTypeList1: any;
  parking_avl: any[] = [];
  meal_type: any[] = [];
  ParkingTypeList: any;
  h1Text: any;
  air_conditioner: any[] = [];
  AcTypeList: any;
  userRentalFavList: any[] = [];
  propertyIds: any[] = [];
  Matautocomplete: any;






  configs = [
    {
      key: 'pg-for-rent-in-',
      h1: (city: string) => `PGs for Rent in ${city}`,
      title: (city: string) => `Affordable PGs for Rent in ${city} – Boys & Girls`,
      desc: (city: string) => `Discover budget-friendly PGs in ${city} with meals, Wi-Fi, modern amenities, and verified listings for boys, girls & co-living spaces for safe stays.`,
      ogTitle: (city: string) => `PGs for Rent in ${city}`,
      ogDesc: (city: string) => `Browse trusted PGs for rent in ${city} with all facilities. Verified boys, girls, and co-living PGs available now for comfortable and safe living.`,
    },
    {
      key: 'pg-for-boys-in-',
      h1: (city: string) => `Boys PGs in ${city}`,
      title: (city: string) => `Best Boys PGs in ${city} – Meals & Facilities Included`,
      desc: (city: string) => `Explore verified boys PGs in ${city} with affordable rent, meals, Wi-Fi, and 24/7 security. Comfortable, safe, and convenient stays for students & professionals.`,
      ogTitle: (city: string) => `Boys PGs in ${city}`,
      ogDesc: (city: string) => `Verified boys PGs in ${city} with meals, Wi-Fi & modern amenities. Budget-friendly, secure, and comfortable living options for all tenants.`,
    },
    {
      key: 'pg-for-girls-in-',
      h1: (city: string) => `Girls PGs in ${city}`,
      title: (city: string) => `Top Girls PGs in ${city} – Safe & Comfortable`,
      desc: (city: string) => `Find secure PGs for girls in ${city} with verified listings, meals, Wi-Fi, and 24/7 safety. Comfortable and convenient stays in prime locations.`,
      ogTitle: (city: string) => `Girls PGs in ${city}`,
      ogDesc: (city: string) => `Safe, verified girls PGs in ${city} with modern amenities, meals, and Wi-Fi. Comfortable and secure accommodation for students and professionals.`,
    },
    {
      key: 'pg-for-co-living-in-',
      h1: (city: string) => `Co-Living PGs in ${city}`,
      title: (city: string) => `Co-Living Spaces in ${city} – Budget & Modern`,
      desc: (city: string) => `Discover co-living PGs in ${city} with shared facilities, flexible rent, meals, Wi-Fi, and verified amenities. Comfortable and modern living for students & professionals.`,
      ogTitle: (city: string) => `Co-Living PGs in ${city}`,
      ogDesc: (city: string) => `Browse co-living PGs in ${city} with budget-friendly rent, shared spaces, verified facilities, and modern amenities for a convenient lifestyle.`,
    },
    {
      key: 'pg-for-rent-in-*-price-under-10000',
      h1: (city: string) => `PGs in ${city} under ₹10,000`,
      title: (city: string) => `Affordable PGs in ${city} – Below ₹10,000`,
      desc: (city: string) => `Find verified PGs under ₹10,000 in ${city} with meals, Wi-Fi, security, and modern amenities. Budget-friendly options for boys, girls & co-living spaces.`,
      ogTitle: (city: string) => `PGs under ₹10,000 in ${city}`,
      ogDesc: (city: string) => `Explore budget PGs in ${city} under ₹10,000. Verified listings with meals, Wi-Fi, security, and modern facilities for safe and comfortable living.`,
    },
    {
      key: 'pg-for-rent-in-*-price-10000-to-15000',
      h1: (city: string) => `PGs in ${city} ₹10,000 – ₹15,000`,
      title: (city: string) => `PGs for Rent in ${city} ₹10,000 - ₹15,000`,
      desc: (city: string) => `Browse verified PGs in ${city} priced ₹10,000 to ₹15,000 with meals, Wi-Fi, security, and modern amenities. Comfortable stays for boys, girls & co-living tenants.`,
      ogTitle: (city: string) => `PGs ₹10,000 - ₹15,000 in ${city}`,
      ogDesc: (city: string) => `Verified PGs in ${city} within ₹10,000 - ₹15,000 with meals, Wi-Fi, security, and modern facilities. Budget-friendly and comfortable accommodation.`,
    },
    {
      key: 'pg-for-rent-in-*-price-15000-to-20000',
      h1: (city: string) => `PGs in ${city} ₹15,000 – ₹20,000`,
      title: (city: string) => `Premium PGs in ${city} ₹15,000 - ₹20,000`,
      desc: (city: string) => `Discover premium PGs in ${city} priced ₹15,000 - ₹20,000. Verified listings with meals, Wi-Fi, security, and modern amenities for a comfortable and safe stay.`,
      ogTitle: (city: string) => `PGs ₹15,000 - ₹20,000 in ${city}`,
      ogDesc: (city: string) => `Explore verified premium PGs in ${city} from ₹15,000 - ₹20,000. Modern amenities, meals, Wi-Fi, and secure living for students and professionals.`,
    },
    {
      key: 'pg-for-students-in-',
      h1: (city: string) => `Student PGs in ${city}`,
      title: (city: string) => `Affordable Student PGs in ${city} with Meals & Wi-Fi`,
      desc: (city: string) => `Find student-friendly PGs in ${city} with meals, Wi-Fi, study-friendly environment, verified facilities, and affordable rent. Comfortable stays for students.`,
      ogTitle: (city: string) => `Student PGs in ${city}`,
      ogDesc: (city: string) => `Verified student PGs in ${city} with meals, Wi-Fi, and modern facilities. Comfortable, safe, and budget-friendly options for students.`,
    },
    {
      key: 'pg-for-working-professionals-in-',
      h1: (city: string) => `PGs for Professionals in ${city}`,
      title: (city: string) => `Top PGs for Working Professionals in ${city}`,
      desc: (city: string) => `Explore PGs for working professionals in ${city} with meals, Wi-Fi, security, and modern facilities. Verified listings for safe, comfortable, and convenient living.`,
      ogTitle: (city: string) => `PGs for Professionals in ${city}`,
      ogDesc: (city: string) => `Verified professional PGs in ${city} with meals, Wi-Fi, and modern amenities. Safe, comfortable, and budget-friendly accommodation for working professionals.`,
    },
    {
      key: 'veg-pg-in-',
      h1: (city: string) => `Veg PGs in ${city}`,
      title: (city: string) => `Top Veg PGs in ${city} – Meals Included`,
      desc: (city: string) => `Browse pure veg PGs in ${city} with meals, Wi-Fi, verified facilities, and affordable rent. Comfortable and safe stays with modern amenities for all tenants.`,
      ogTitle: (city: string) => `Veg PGs in ${city}`,
      ogDesc: (city: string) => `Verified veg PGs in ${city} with meals, Wi-Fi, modern facilities, and budget-friendly rent. Safe and comfortable accommodation for students & professionals.`,
    },
    {
      key: 'veg-nonveg-pg-in-',
      h1: (city: string) => `Veg & Non-Veg PGs in ${city}`,
      title: (city: string) => `PGs in ${city} with Veg & Non-Veg Food`,
      desc: (city: string) => `Find PGs in ${city} offering veg & non-veg meals. Verified listings with affordable rent, Wi-Fi, and modern amenities for safe, comfortable, and secure living.`,
      ogTitle: (city: string) => `Veg & Non-Veg PG in ${city}`,
      ogDesc: (city: string) => `Browse verified PGs in ${city} serving veg & non-veg meals. Modern facilities, budget-friendly, and safe accommodation options for all tenants.`,
    },
    {
      key: 'private-room-pg-in-',
      h1: (city: string) => `Private Room PGs in ${city}`,
      title: (city: string) => `Top Private PG Rooms in ${city} – Meals & Wi-Fi`,
      desc: (city: string) => `Explore PGs with private rooms in ${city} with meals, Wi-Fi, verified facilities, and comfortable, safe, and budget-friendly living options for students & professionals.`,
      ogTitle: (city: string) => `Private Room PGs in ${city}`,
      ogDesc: (city: string) => `Verified private room PGs in ${city} with meals, Wi-Fi, modern facilities, and safe, budget-friendly options for tenants.`,
    },
    {
      key: 'two-sharing-pg-in-',
      h1: (city: string) => `Two Sharing PGs in ${city}`,
      title: (city: string) => `Affordable Two Sharing PGs in ${city}`,
      desc: (city: string) => `Find two sharing PGs in ${city} with meals, Wi-Fi, verified facilities, and budget-friendly, safe, and comfortable stays for students, working professionals, and co-living tenants.`,
      ogTitle: (city: string) => `Two Sharing PG in ${city}`,
      ogDesc: (city: string) => `Explore verified two sharing PGs in ${city} with meals, Wi-Fi, modern amenities, and safe, comfortable, budget-friendly accommodation.`,
    },
    {
      key: 'three-sharing-pg-in-',
      h1: (city: string) => `Three Sharing PGs in ${city}`,
      title: (city: string) => `Best Three Sharing PGs in ${city} – Meals & Wi-Fi`,
      desc: (city: string) => `Discover three sharing PGs in ${city} with verified facilities, meals, Wi-Fi, and safe, comfortable accommodation at affordable rates.`,
      ogTitle: (city: string) => `Three Sharing PG in ${city}`,
      ogDesc: (city: string) => `Browse verified three sharing PGs in ${city}. Affordable, secure, and comfortable stays with modern amenities and meals included.`,
    },
    {
      key: 'four-sharing-pg-in-',
      h1: (city: string) => `Four Sharing PGs in ${city}`,
      title: (city: string) => `Top Four Sharing PGs in ${city} – Verified & Affordable`,
      desc: (city: string) => `Find four sharing PGs in ${city} with meals, Wi-Fi, and verified amenities. Budget-friendly, secure, and comfortable stays for students and professionals.`,
      ogTitle: (city: string) => `Four Sharing PG in ${city}`,
      ogDesc: (city: string) => `Explore verified four sharing PGs in ${city}. Safe, modern, and affordable accommodations with meals and Wi-Fi.`,
    },
    {
      key: 'five-sharing-pg-in-',
      h1: (city: string) => `Five Sharing PGs in ${city}`,
      title: (city: string) => `Affordable Five Sharing PGs in ${city} – Verified Listings`,
      desc: (city: string) => `Browse five sharing PGs in ${city} with safe and verified facilities, meals, Wi-Fi, and affordable rent. Ideal for students and working professionals.`,
      ogTitle: (city: string) => `Five Sharing PG in ${city}`,
      ogDesc: (city: string) => `Verified five sharing PGs in ${city} with modern amenities, secure stays, meals, and budget-friendly pricing.`,
    },
    {
      key: 'six-sharing-pg-in-',
      h1: (city: string) => `Six Sharing PGs in ${city}`,
      title: (city: string) => `Budget Six Sharing PGs in ${city} – Meals & Wi-Fi Included`,
      desc: (city: string) => `Find six sharing PGs in ${city} with verified amenities, Wi-Fi, meals, and affordable pricing. Comfortable and safe stays for all residents.`,
      ogTitle: (city: string) => `Six Sharing PG in ${city}`,
      ogDesc: (city: string) => `Browse six sharing PGs in ${city} with meals, Wi-Fi, secure facilities, and budget-friendly accommodation.`,
    },
    {
      key: 'seven-sharing-pg-in-',
      h1: (city: string) => `Seven Sharing PGs in ${city}`,
      title: (city: string) => `Top Seven Sharing PGs in ${city} – Verified & Affordable`,
      desc: (city: string) => `Affordable seven sharing PGs in ${city} with meals, Wi-Fi, and verified modern amenities. Safe and comfortable accommodations for all residents.`,
      ogTitle: (city: string) => `Seven Sharing PG in ${city}`,
      ogDesc: (city: string) => `Explore seven sharing PGs in ${city} with verified amenities, meals, Wi-Fi, and secure, budget-friendly stays.`,
    },
    {
      key: 'eight-sharing-pg-in-',
      h1: (city: string) => `Eight Sharing PGs in ${city}`,
      title: (city: string) => `Budget Eight Sharing PGs in ${city} – Meals & Wi-Fi`,
      desc: (city: string) => `Find eight sharing PGs in ${city} with verified facilities, meals, Wi-Fi, and safe accommodations. Affordable and comfortable living for students and professionals.`,
      ogTitle: (city: string) => `Eight Sharing PG in ${city}`,
      ogDesc: (city: string) => `Browse eight sharing PGs in ${city}. Verified listings with modern amenities, meals, Wi-Fi, and budget-friendly rates.`,
    },
    {
      key: 'nine-sharing-pg-in-',
      h1: (city: string) => `Nine Sharing PGs in ${city}`,
      title: (city: string) => `Affordable Nine Sharing PGs in ${city} – Verified & Comfortable`,
      desc: (city: string) => `Discover nine sharing PGs in ${city} with meals, Wi-Fi, and verified facilities. Safe, comfortable, and budget-friendly accommodation for all residents.`,
      ogTitle: (city: string) => `Nine Sharing PG in ${city}`,
      ogDesc: (city: string) => `Verified nine sharing PGs in ${city} with meals, Wi-Fi, modern amenities, and secure stays at affordable rates.`,
    },
    {
      key: 'ten-sharing-pg-in-',
      h1: (city: string) => `Ten Sharing PGs in ${city}`,
      title: (city: string) => `Top Ten Sharing PGs in ${city} – Affordable & Verified`,
      desc: (city: string) => `Find ten sharing PGs in ${city} with verified facilities, meals, Wi-Fi, and safe accommodation. Budget-friendly options for students and working professionals.`,
      ogTitle: (city: string) => `Ten Sharing PG in ${city}`,
      ogDesc: (city: string) => `Browse verified ten sharing PGs in ${city} with meals, Wi-Fi, modern amenities, and comfortable, secure stays.`,
    },
    {
      key: 'ac-pg-in-',
      h1: (city: string) => `AC PGs in ${city}`,
      title: (city: string) => `Air Conditioned PGs in ${city} – Comfortable & Verified`,
      desc: (city: string) => `Find AC PGs in ${city} with verified facilities, Wi-Fi, meals, and modern amenities. Comfortable and safe stays at affordable rent.`,
      ogTitle: (city: string) => `AC PGs in ${city}`,
      ogDesc: (city: string) => `Browse verified AC PGs in ${city}. Budget-friendly, comfortable, and modern stays with meals and Wi-Fi.`,
    },
    {
      key: 'pg-with-parking-in-',
      h1: (city: string) => `PGs with Parking in ${city}`,
      title: (city: string) => `Top PGs with Parking in ${city} – Verified & Secure`,
      desc: (city: string) => `Find PGs in ${city} with parking, verified facilities, Wi-Fi, meals, and safe accommodations. Comfortable and budget-friendly options for residents.`,
      ogTitle: (city: string) => `PG with Parking in ${city}`,
      ogDesc: (city: string) => `Browse verified PGs in ${city} with parking, modern amenities, meals, and Wi-Fi. Secure and affordable stays for all.`,
    },
  ];

  constructor(
    private activeroute: ActivatedRoute,
    private router: Router,
    private _location: Location,
    public cityservice: CityService,
    public Service: DataService,
    private titleService: Title,
    private meta: Meta,
    private fb: FormBuilder,
    private Filter: FilterService,
    private renderer: Renderer2,
    private elRef: ElementRef,
    private eliteService: ElitedataService,
    private storage: SafeStorageService,
    @Inject(DOCUMENT) private doc,
    @Inject(PLATFORM_ID) private platformId: Object,


  ) {
    this.window = this.doc.defaultView!;

    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    this.router.events.subscribe((evt) => {
      this.router.navigated = false;
      if (typeof window !== 'undefined') {
        window.scrollTo(0, 0);
      };
    });

    this.Service.mouseenterlistenOtp().subscribe((m: any) => {
      if (this.window.location.hash === '#reportissue') {
        this.submitFormReport();
      } else if (this.window.location.hash === '#ViewAddress') {
        this.SubmitForm();
      }
    });
  }
  window!: Window;
  login: boolean = false
  userId: any
  userNumber: any 
  contactedList: any
  ngOnInit() {
    this.propertylists = [];
    this.getlocality();
    this.GetRentalList();
    this.metatags();

    const loginid = this.storage?.getItem('loginID');
    if (loginid === '1') {
      this.login = true;
      this.userId = this.storage?.getItem('userID');
      this.userNumber = this.storage?.getItem('userNumber');
     this.eliteService.getContactedList(this.userId).subscribe(response => {
        if (response['status'] == "True") {
          this.contactedList = response['pro_view']

          this.elitePropertyId = this.contactedList.map((item: any) => {
            this.contactData[String(item.property_IDPK)] = item.owner_details;

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



    this.loginidNew = loginid
    this.UserId = this.storage?.getItem("userID");
    $('.head_sticky').css('padding-bottom', '54px');
  }


  loginidNew: any


  sortShowHide: boolean = false;

  ShowHideSort() {
    this.sortShowHide = this.sortShowHide ? false : true;
  }

  updateSelectedChips(): void { }

  selectedSortValue: number | null = null;
  onSortChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.selectedSortValue = +value;
    this.GetRentalList();
  }

  isInWishlist(propertyID: number): boolean {
    const userId = this.storage?.getItem('userID');
    if (userId) {
      this.storagearr = this.propertyIds;
      return this.storagearr.includes(propertyID);
    } else {
      return this.storagearr.includes(propertyID);
    }
  }

  Heart_Transtion(propertyID: number) {
    const index = this.storagearr?.indexOf(propertyID);
    var loginID = localStorage?.getItem('loginID');
    if (index !== -1) {
      this.storagearr.splice(index, 1);
      if (loginID == '1') {
        const userid = localStorage?.getItem('userID');
        var param = { userid: userid, propid: propertyID, CatagoryId: 5 };
        this.Service.removeFavaourite(param).subscribe(response => { });
      }
    } else {
      this.storagearr.push(propertyID);
      if (loginID == '1') {
        const userid = localStorage?.getItem('userID');
        var param = { userid: userid, propid: propertyID, CatagoryId: 5 };
        this.Service.addfavaourite(param).subscribe(response => { });
      }
    }
    localStorage.setItem('pgPropertyID', JSON.stringify(this.storagearr));
    if ('pgPropertyID' in localStorage) {
      this.storagearr = JSON.parse(localStorage?.getItem('pgPropertyID')!);
    } else {
      localStorage.setItem('pgPropertyID', '[]');
      this.storagearr = JSON.parse(localStorage?.getItem('pgPropertyID')!);
    }
  }

  metatags() {
    const url = this.router.url;
    this.configs.forEach(cfg => {
      const pattern = cfg.key.replace('*', '([a-zA-Z0-9-]+)');
      const regex = new RegExp(pattern);
      if (regex.test(url)) {
        this.h1Text = cfg.h1(this.currentCity);
        this.titleService.setTitle(cfg.title(this.currentCity));
        this.meta.updateTag({ name: 'description', content: cfg.desc(this.currentCity) });
        this.meta.updateTag({ property: 'og:title', content: cfg.ogTitle(this.currentCity) });
        this.meta.updateTag({ property: 'og:description', content: cfg.ogDesc(this.currentCity) });
      }
    });
    this.Service.createLinkForCanonicalURL();
  }

  getlocality() {
    var value = this.cityservice.cityfinder(this.router.url);
    this.currentCity = value.cityname;
    this.cityId = value.cityid;
  }











  roomtypepg: any[] = [];
  pgAvailableForListvalue: any[] = [];
  pgBestSuitForListvalue: any[] = [];
  pgFoodListvalue: any[] = [];

  calculateDate(daysToAdd: number): string {
    const date = new Date();
    date.setDate(date.getDate() + daysToAdd);
    return date.toISOString().split('T')[0];
  }

  lessDepositeAmt: any;
  LowBudgetData: any;
  area_max: any;
  area_min: any;
  amenityId: any[] = [];



  GetRentalList() {
    PgListing.citycount = -4;
    this.showloader = true;
    this.routeSub = this.activeroute.params.subscribe(params => {
      var value = this.cityservice.cityfinder(this.router.url);
      this.currentCity = value.cityname;
      this.city = value.cityname.toLowerCase();
      var UrlcurrentCity = this.currentCity.toLowerCase().replace(/\s+/g, '-');

      this.activeroute.queryParamMap.subscribe((params: any) => {
        if (params['params']) {
          if (params['params']['roomtype']) { this.roomtypepg = params['params']['roomtype']; }
          if (params['params']['pgavailablefor']) { this.pgAvailableForListvalue = params['params']['pgavailablefor']; }
          if (params['params']['pgbestsuit']) { this.pgBestSuitForListvalue = params['params']['pgbestsuit']; }
          if (params['params']['pgfoodtype']) { this.pgFoodListvalue = params['params']['pgfoodtype']; }
          if (params['params']['min']) { this.minPrice = params['params']['min']; }
          if (params['params']['max']) { this.maxPrice = params['params']['max']; }
          if (params['params']['localityid']) { this.locality = params['params']['localityid']; }
        }
      });


      var limit = 0;
      var limitrows = 4;
      var param1 = {
        limit, limitrows,
        localityId: this.locality,
        suited_for: this.pgBestSuitForListvalue,
        food_included: this.pgFoodListvalue,
        sharing_type: this.roomtypepg,
        pg_type: this.pgAvailableForListvalue,
        price_min: this.minPrice,
        price_max: this.maxPrice,
        meal_type: this.meal_type,
        parking_avl: this.parking_avl,
        air_conditioner: this.air_conditioner,
        price_sort: this.selectedSortValue,
        userId: this.storage?.getItem('userID'),
      };
      this.otploader = true;


      this.Service.PGRent(this.city, param1).subscribe((topProperty: any) => {
        if (topProperty['status'] === 'True') {
          this.propertylists = topProperty['details'];
          this.otploader = false;


          this.propertylists.slice(0, 4).forEach((item: any) => {
            if (item.Cover_images) {
              const link = this.doc.createElement('link');
              link.rel = 'preload';
              link.as = 'image';
              link.href = `https://img.homes247.in/images/pg_img/gallery/${item.Cover_images}?width=280&height=140`;
              link.setAttribute('fetchpriority', 'high');
              this.doc.head.appendChild(link);
            }
          });


          if (isPlatformBrowser(this.platformId)) {

          }

          if (this.propertylists.length == 0) {
            this.zeroProjects = true;
          } else {
            this.zeroProjects = false;
          }
          this.topprojectsloader = false;
        } else {
          this.topprojectsloader = true;
        }

      });

      let isValidUrl = false;
      this.Service.postPropNewPg2().subscribe((list: any) => {
        if (list['status'] === 'True') {
          this.TypeList = list['pgAvailableForList'];
          this.SuitedTypeList = list['pgBestSuitForList'];
          this.RoomTypeList = list['roomTypes'];
          this.RoomTypeList1 = list['roomOtherTypes'];
          this.ParkingTypeList = list['parking'];
          this.AcTypeList = list['pgFacilitiesList'];

          const budgetRanges = [
            { urlPart: '-price-under-10000', min: '1000', max: '10000' },
            { urlPart: '-price-10000-to-15000', min: '10000', max: '15000' },
            { urlPart: '-price-15000-to-20000', min: '15000', max: '20000' },
          ];
          const FoodTypeList = [
            { urlPart: 'veg', value: '1' },
            { urlPart: 'veg-nonveg', value: '2' },
          ];

          this.TypeList.forEach((type: any) => {
            const Url = `/pgcl/pg-for-${type.label.toLowerCase().replace(/\s+/g, '-')}-in-${UrlcurrentCity}`;
            if (this.router.url.split('&utm_source')[0] === Url) {
              if (!this.pgAvailableForListvalue.includes(type.key)) { this.pgAvailableForListvalue.push(type.key); }
              isValidUrl = true;
            }
          });

          this.SuitedTypeList.slice(0, -1).forEach((type: any) => {
            const Url = `/pgcl/pg-for-${type.label.toLowerCase().replace(/\s+/g, '-')}-in-${UrlcurrentCity}`;
            if (this.router.url.split('&utm_source')[0] === Url) {
              if (!this.pgBestSuitForListvalue.includes(type.key)) { this.pgBestSuitForListvalue.push(type.key); }
              isValidUrl = true;
            }

          });

          this.RoomTypeList.slice(0, -1).forEach((type: any) => {
            const Url = `/pgcl/${type.label.toLowerCase().replace(/\s+/g, '-')}-pg-in-${UrlcurrentCity}`;
            if (this.router.url.split('&utm_source')[0] === Url) {
              if (!this.roomtypepg.includes(type.value)) { this.roomtypepg.push(type.value); }
              isValidUrl = true;
            }
          });

          this.RoomTypeList1.forEach((type: any) => {
            const Url = `/pgcl/${type.label.toLowerCase().replace(/\s+/g, '-')}-pg-in-${UrlcurrentCity}`;
            if (this.router.url.split('&utm_source')[0] === Url) {
              if (!this.roomtypepg.includes(type.value)) { this.roomtypepg.push(type.value); }
              isValidUrl = true;
            }
          });

          this.ParkingTypeList.forEach((type: any) => {
            const Url = `/pgcl/pg-with-parking-in-${UrlcurrentCity}`;
            if (this.router.url.split('&utm_source')[0] === Url) {
              if (!this.parking_avl.includes(type.key)) { this.parking_avl.push(type.key); }
              isValidUrl = true;
            }
          });

          this.AcTypeList.forEach((type: any) => {
            const Url = `/pgcl/ac-pg-in-${UrlcurrentCity}`;
            if (this.router.url.split('&utm_source')[0] === Url) {
              if (!this.air_conditioner.includes(31)) { this.air_conditioner.push(31); }
              isValidUrl = true;
            }
          });

          FoodTypeList.forEach(type => {
            const Url = `/pgcl/${type.urlPart.toLowerCase().replace(/\s+/g, '-')}-pg-in-${UrlcurrentCity}`;
            if (this.router.url.split('&utm_source')[0] === Url) {
              if (!this.meal_type.includes(type.value)) { this.meal_type.push(type.value); }
              isValidUrl = true;
            }
          });

          budgetRanges.forEach(type => {
            const Url = `/pgcl/pg-for-rent-in-${UrlcurrentCity}${type.urlPart}`;
            if (this.router.url.split('&utm_source')[0] === Url) {
              this.minPrice = type.min;
              this.maxPrice = type.max;
              isValidUrl = true;
            }
          });

          if (this.router.url.includes('pgcl/pg-for-rent-in-')) { isValidUrl = true; }
          if (!isValidUrl) { this.router.navigate(['/404'], { skipLocationChange: true }); }

          var limit = 0;
          var limitrows = 4;
          var param = {
            limit, limitrows,
            localityId: this.locality,
            suited_for: this.pgBestSuitForListvalue,
            food_included: this.pgFoodListvalue,
            sharing_type: this.roomtypepg,
            pg_type: this.pgAvailableForListvalue,
            price_min: this.minPrice,
            price_max: this.maxPrice,
            meal_type: this.meal_type,
            parking_avl: this.parking_avl,
            air_conditioner: this.air_conditioner,
            price_sort: this.selectedSortValue,
            userId: this.storage?.getItem('userID'),
          };

          this.Service.PGRentCount(this.city, param).subscribe((countprojects: any) => {
            this.PGprojectcount = countprojects['Counts'][0].PropertyCounts;
          });


          this.updateSelectedChips();
        }
      });
    });

    const userId = this.storage?.getItem('userID');
    if (userId) {
      this.UserId = this.storage?.getItem('userID');
      if (!('pgPropertyID' in this.storage)) {
        this.storage.setItem('pgPropertyID', '[]');
      }
      this.Service.getUserWishListByIdTest(this.UserId, 5).subscribe((userFavList: any) => {
        this.userRentalFavList = userFavList['favouritelist'];
        this.propertyIds = this.userRentalFavList.map(item => item.propertyId);
      });
    } else {
      if ('pgPropertyID' in this.storage) {
        this.storagearr = JSON.parse(this.storage?.getItem('pgPropertyID')!);
      } else {
        this.storage.setItem('pgPropertyID', '[]');
        this.storagearr = JSON.parse(this.storage?.getItem('pgPropertyID')!);
      }
    }
  }



  loadTabCounts() {
    var paramInd = {};
    var param = {
      localityId: this.locality,
      suited_for: this.pgBestSuitForListvalue,
      food_included: this.pgFoodListvalue,
      sharing_type: this.roomtypepg,
      pg_type: this.pgAvailableForListvalue,
      price_min: this.minPrice,
      price_max: this.maxPrice,
      meal_type: this.meal_type,
      parking_avl: this.parking_avl,
      air_conditioner: this.air_conditioner,
    };

    this.Service.getRentprojectscount(this.city, param).subscribe((c: any) => {
      this.projectcount = c['Counts'][0].PropertyCounts;
    });
    this.Service.getindividualprojectscount(this.city, paramInd).subscribe((c: any) => {
      this.propertiescount = c['Counts'][0].PropertyCounts;
    });
    this.Service.getprojectscount(this.city, paramInd).subscribe((c: any) => {
      this.projectcount_city = c['Counts'][0].PropertyCounts;
    });
    this.Service.commercialSalePropertiesCount(this.city, param).subscribe((c: any) => {
      this.projectcommercialcount = c['Counts'][0].PropertyCounts;
    });
  }
  coverimage: any = 'https://img.homes247.in/images/pg_img/gallery/';
  onScrollOnce: boolean = true

  enquiryFormComponent: any
  // @HostListener('window:scroll', [])
  @HostListener('touchstart', [])
  onWindowScroll() {
    if (this.onScrollOnce) {
      this.coverimage = this.Service.PGImg + 'gallery/';
      this.Service.mouseenterservice3();
      import('../enquiry-form/enquiry-form')
        .then(c => {
          this.enquiryFormComponent = c.EnquiryFormComponent;
          if (isPlatformBrowser(this.platformId)) {
            $('.modal-login').css('z-index', '99999');
          }
        });

    }




  }

  shareContent(data: any) {
    if ((window.navigator as any).share) {
      (window.navigator as any).share({
        title: 'Checkout this Property - ' + data.PropertyName,
        text: 'Check out ' + 'Test',
        url: 'https://www.homes247.in/pgd/pg-for-rent-in-' + data.city.toLowerCase() + '-' + data.propartid,
      })
        .then(() => console.log('Shared successfully'))
        .catch((error: any) => console.error('Error sharing:', error));
    } else {
      console.log('Web Share API not supported on this device.');
    }
  }

  private observer: IntersectionObserver | null = null;

  ngAfterViewInit() {
    requestAnimationFrame(() => {
      this.onresize();
      if (isPlatformBrowser(this.platformId)) {
        $('.head_sticky').css('padding-bottom', '54px');
      }
    });

    import('../mat-autocomplete-new/mat-autocomplete-new')
      .then(c => {
        this.Matautocomplete = c.MatAutocompleteNew;
      });
    setTimeout(() => this.centerActiveButton(), 80);

    this.initIntersectionObserver();
    setTimeout(() => this.loadTabCounts(), 800);
  }

  private initIntersectionObserver() {
    this.observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { this.loadMore(); }
      });
    });
    if (this.scrollAnchor?.nativeElement) {

      // console.log('Observer attached');

      this.observer.observe(this.scrollAnchor.nativeElement);

    }
  }

  loadMore() {
    // alert('load more called');
    this.showloader = true;
    this.routeSub = this.activeroute.params.subscribe(params => {
      let totalcount = this.PGprojectcount;
      const limit = PgListing.citycount += 4;
      var limitrows = 4;
      var param = {
        limit, limitrows,
        localityId: this.locality,
        suited_for: this.pgBestSuitForListvalue,
        food_included: this.pgFoodListvalue,
        sharing_type: this.roomtypepg,
        pg_type: this.pgAvailableForListvalue,
        price_min: this.minPrice,
        price_max: this.maxPrice,
        meal_type: this.meal_type,
        parking_avl: this.parking_avl,
        air_conditioner: this.air_conditioner,
        userId: this.storage?.getItem('userID'),
      };




      let livecount = this.propertylists.length;
      if (livecount < totalcount) {
        this.Service.PGRent(this.city, param).subscribe((propertylists: any) => {
          if (propertylists['status'] == 'False') {
            this.showloader = false;
            $('.search-results').css('padding-bottom', '110px');
          } else {
            this.propertylists = this.propertylists.concat(propertylists['details']);
          }
        });
      } else {
        this.showloader = false;
      }
    });
  }

  ShowHideFilter() {
    this.Service.mouseenterservice5();
    setTimeout(() => {
      if ($('#FirstCityModal').hasClass('show') || $('#filterModal').hasClass('show') || $('#SecondCityModal').hasClass('show')) {
        $('.head_stick').css('display', 'none');
      } else {
        $('.head_stick').css('display', 'block');
      }
    }, 300);
    $('#filterModal').modal('show');
    window.scroll(0, 0);
  }

  checkBox: boolean = false;
  contactButton: boolean = false;
  RequestButton: boolean = false;
  resquestImages: boolean = false;
  resquestCall: boolean = false;
  propUserIDFK: any;
  Homes247NewBlackLogo: boolean = false

  ShowHideEnquery(bhk: any, proptype: any, propname: any, data: any, Localityid: any) {
    this.Homes247NewBlackLogo = true

    this.localityid = Localityid;
    this.propbhk = bhk;
    this.proptype = proptype;
    this.propname = propname;
    this.propUserIDFK = data;
    this.IsVisibleEnquery = this.IsVisibleEnquery ? false : true;
    $('.form-field__input').removeAttr('style');
    $('#uname').attr('placeholder', 'Username');
    $('#uemail').attr('placeholder', 'Email');
    $('#unumber').attr('placeholder', '+91');
    this.enquiry.name = '';
    this.enquiry.number = '';
    this.enquiry.mail = '';
    this.enquiry.otp = '';
    this.resquestImages = true;
    this.RequestButton = true;
    this.checkBox = false;
    this.contactButton = false;
    this.resquestCall = false;
    this.checkBox = false;
  }

  goBackFromEnq() {
    this.IsVisibleEnquery = this.IsVisibleEnquery ? false : true;
  }































































































  toggleSelection(chip: MatChipOption, option: any) { chip.selected = !chip.selected; }
  changeSelected($event: MatChipSelectionChange, option: any) {
    if ($event.selected) { this.bhkarray.push(option.id); }
    else { this.bhkarray = this.bhkarray.filter(id => id !== option.id); }
  }

  toggleSelectionbathroom(chip: MatChipOption, option: any) { chip.selected = !chip.selected; }
  changeSelectedbathroom($event: MatChipSelectionChange, option: any) {
    if ($event.selected) { this.bathroomarray.push(option.id); }
    else { this.bathroomarray = this.bathroomarray.filter(id => id !== option.id); }
  }

  toggleSelectionbalcony(chip: MatChipOption, option: any) { chip.selected = !chip.selected; }
  changeSelectedbalcony($event: MatChipSelectionChange, option: any) {
    if ($event.selected) { this.balconyarray.push(option.id); }
    else { this.balconyarray = this.balconyarray.filter(id => id !== option.id); }
  }

  changeSelectedtenants($event: MatChipSelectionChange, option: any) {
    this.TenantType = $event.selected ? option.id : '';
  }

  toggleSelectionFurnishedtype(chip: MatChipOption, option: any) { chip.selected = !chip.selected; }

  changeSelectedownership($event: MatChipSelectionChange, option: any) {
    this.postedBy = $event.selected ? option.id : '';
  }
  toggleSelectionpostedtype(chip: MatChipOption, option: any) { chip.selected = !chip.selected; }

  toggleSelectionpropertytype(chip: MatChipOption, option: any) { chip.selected = !chip.selected; }
  changeSelectedpropertytype($event: MatChipSelectionChange, option: any) {
    if ($event.selected) { this.projecttype.push(option.id); }
    else { this.projecttype = this.projecttype.filter(id => id !== option.id); }
  }

  toggleSelectiondoorface(chip: MatChipOption, option: any) { chip.selected = !chip.selected; }
  changeSelecteddoorface($event: MatChipSelectionChange, option: any) {
    if ($event.selected) { this.doorfacings.push(option.id); }
    else { this.doorfacings = this.doorfacings.filter(id => id !== option.id); }
  }

  toggleSelectionapproval(chip: MatChipOption, option: any) { chip.selected = !chip.selected; }
  changeSelectedapproval($event: MatChipSelectionChange, option: any) {
    if ($event.selected) { this.approvals.push(option.id); }
    else { this.approvals = this.approvals.filter(id => id !== option.id); }
  }

  numberLogIn = true;
  otpValidating = false;

  otpsend() {
    if ($('#uname').val() == '') {
      $('#uname').focus().css('border-bottom', '1px solid red').attr('placeholder', 'Please Enter Name');
      return false;
    } else {
      var enameFilter = /^([a-zA-Z]+\s)*[a-zA-Z]+$/;
      if (enameFilter.test($('#uname').val())) { $('#uname').removeAttr('style'); }
      else { $('#uname').focus().css('border-bottom', '1px solid red').attr('placeholder', 'Please enter valid name').val(''); return false; }
    }
    if ($('#unumber').val() == '') {
      $('#unumber').focus().css('border-bottom', '1px solid red').attr('placeholder', 'Please Enter Phone Number');
      return false;
    } else {
      var mobilee = /^[0-9]{10}$/;
      if (mobilee.test($('#unumber').val())) { $('#unumber').removeAttr('style'); }
      else { $('#unumber').focus().css('border-bottom', '1px solid red').attr('placeholder', 'Please enter valid contact number').val(''); return false; }
    }
    if ($('#uemail').val() !== '') {
      var emai = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
      if (emai.test($('#uemail').val())) { $('#uemail').removeAttr('style'); }
      else { $('#uemail').focus().css('border-color', 'red').attr('placeholder', 'Please enter valid email-id').val(''); return false; }
    }
    this.otploader = true;
    this.SubmitForm();
    return;
  }

  countdownconfig = { leftTime: 60, demand: true };

  goback1() {
    $('.OtpDiv').css('display', 'none');
    $('.enqiery').css('display', 'block');
    this.numberLogIn = true;

    this.countdown4().restart();
    this.otpValidating = false;
  }

  handleEvent(e: CountdownEvent) {
    if (e.action === 'done') {
      $('.countdown_maindiv').css('display', 'none');
      $('.otpexpireclass').css('display', 'block');
    }
  }

  onOtpChange(otp: any) {
    this.enquiry.otp = otp;
  }
  private async getSwal() {
    const { default: Swal } = await import('sweetalert2');
    return Swal;
  }

  async otpvalidate4() {
    var otplength = 4;
    if ($('#otp').val() == '') {
      this.ngOtpInput().setValue('');
      const Swal = await this.getSwal();
      Swal.fire({ title: 'Please enter the OTP!', icon: 'error', showConfirmButton: false, timer: 1000 });
      return false;
    } else {
      if ($('#otp').val().length < otplength) {
        this.ngOtpInput().setValue('');
        const Swal = await this.getSwal();
        Swal.fire({ title: 'Please enter the valid OTP!', icon: 'warning', showConfirmButton: false, timer: 1500 });
        return false;
      }
    }
    this.otploader = true;
    this.Service.otpvalidcheck(this.enquiry).subscribe(async (success: any) => {
      if (success['status'] == 'True') {
        this.enquiry.verification = 2;
        this.SubmitForm();
        this.IsVisibleEnquery = false;
        this.countdown4().restart();
      } else {
        this.ngOtpInput().setValue('');
        this.otploader = false;
        const Swal = await this.getSwal();
        Swal.fire({ title: 'Oops Something Error!', text: 'Its Not a valid OTP / OTP Expired!', icon: 'error', showConfirmButton: false, timer: 1500 });
      }
    }, (err: any) => { });
    return;
  }

  otpHandle() {
    var param = this.enquiry;
    this.Filter.name = param.name;
    this.Filter.number = param.number;
    this.Filter.email = param.email;
    this.Service.otpsend(param).subscribe(async (success: any) => {
      if (success.messages[0].status == 'ENQUEUED') {
        this.numberLogIn = false;
        this.otpValidating = true;
        this.otploader = false;
        $('.enqiery').css('display', 'none');
        $('.OtpDiv').css('display', 'block');
        $('.countdown_maindiv').css('display', 'block');
        $('.otpexpireclass').css('display', 'none');
        this.countdown4().begin();
        this.ngOtpInput().setValue('');
        var buttonId = $('#one').attr('id');
      } else {
        const Swal = await this.getSwal();
        Swal.fire({ title: 'Oops Something Error!', icon: 'error', showConfirmButton: false, timer: 1500 });
      }
    }, (err: any) => { });
  }

  otpexpired = false;
  userDetails: any[] = [];
  UserName: any;
  UserId: any;
  UserEmail: any;
  UserNumber: any;

  config = {
    allowNumbersOnly: true, length: 4, isPasswordInput: false,
    disableAutoFocus: false, placeholder: '',
    inputStyles: { width: '50px', height: '50px' },
  };

  otpBasedLogin1() {
    const paramNum = { number: this.enquiry.number };
    this.countdownconfig = { leftTime: 60, demand: true };
    this.ngOtpInput().setValue('');
    this.otploader = true;
    this.Service.otpsend(paramNum).subscribe(async (success: any) => {
      if (success.messages[0].status == 'ENQUEUED') {
        $('.countdown_maindiv').css('display', 'block');
        $('.otpexpireclass').css('display', 'none');
        this.countdown4().begin();
        this.otploader = false;
      } else {
        const Swal = await this.getSwal();
        Swal.fire({ title: 'Oops Something Error!', icon: 'error', showConfirmButton: false, timer: 1500 });
      }
    }, (err: any) => { console.log('Connection Failed'); });
  }

  ShowHideEnquery1(data: any) {
    this.localityid = data.LocalityID;
    this.proptype = data.PG_TYPE;
    this.propname = data.pg_name;
    this.propUserIDFK = 229518;
    this.cityid = data.cityid;
    this.propertyId = data.propartid;
    this.regionid = '';
    this.IsVisibleEnquery = this.IsVisibleEnquery ? false : true;
    $('.enqiery').css('display', 'block');
    $('.OtpDiv').css('display', 'none');
    $('.form-field__input').removeAttr('style');
    $('#uname').attr('placeholder', 'Username');
    $('#uemail').attr('placeholder', 'Email');
    $('#unumber').attr('placeholder', '+91');
    this.enquiry.name = '';
    this.enquiry.number = '';
    this.enquiry.mail = '';
    this.enquiry.otp = '';
    this.checkBox = true;
    this.contactButton = true;
    this.resquestCall = true;
    this.resquestImages = false;
    this.RequestButton = false;
  }

  localityid: any;

  SubmitForm() {
    this.otploader = true;
    this.enquiry.propertyname = this.propname;
    this.enquiry.propertyid = this.propertyId;
    this.enquiry.regionId = this.regionid;
    this.enquiry.localityId = this.localityid;
    var cityid = this.cityid;
    this.propertyenquire = this.propname;
    var value = this.cityservice.cityfinder(this.router.url);
    this.cityname = value.cityname.replace('-', ' ');
    var urlValue = this.cityservice.urlFinder(this.router.url);
    this.pageOrigin = urlValue.pageOrigin;
    let browserInfo = navigator.userAgent;
    let browser: string;
    var pageorgin = this.cityname + '_' + this.pageOrigin;
    if (browserInfo.includes('Opera') || browserInfo.includes('Opr')) { browser = 'Opera'; }
    else if (browserInfo.includes('Edg')) { browser = 'Edge'; }
    else if (browserInfo.includes('Chrome')) { browser = 'Chrome'; }
    else if (browserInfo.includes('Safari')) { browser = 'Safari'; }
    else if (browserInfo.includes('Firefox')) { browser = 'Firefox'; }
    else { browser = 'unknown'; }
    var utm_medium = this.activeroute.snapshot.queryParamMap.get('utm_medium');
    if (utm_medium) {
      this.enquiry.source = 'Homes247-Campaign';
      this.enquiry.propertyname = this.Filter.PropertyName + ' && ' + utm_medium;
    } else {
      this.enquiry.source = 'Homes247-Mobile';
    }
    this.Service.pgenq(this.enquiry, pageorgin, cityid, browser).subscribe(async (success: any) => {
      if (success['status'] === 'True') {
        this.otploader = false;
        if (success['code'] === '3') {
          this.otpHandle();
        } else {
          const Swal = await this.getSwal();
          Swal.fire({ text: 'We Will Intimate you soon!', icon: 'success', showConfirmButton: false, timer: 2500 });
          if (Array.isArray(this.propertyId)) { this.propertyId = this.propertyId[0]; }
          this.propertyId = String(this.propertyId);
          if ('contactedpgPropID' in this.storage) {
            this.contactedRentalarr = JSON.parse(this.storage?.getItem('contactedpgPropID') || '[]');
          } else {
            this.contactedRentalarr = [];
          }
          if (!this.contactedRentalarr.includes(this.propertyId)) {
            this.contactedRentalarr.push(this.propertyId);
            this.storage.setItem('contactedpgPropID', JSON.stringify(this.contactedRentalarr));
          }
          this.IsVisibleEnquery = false;
        }
        $('body').removeClass('bodyoverlay');
        this.enquiry.verification = 1;
      } else {
        this.otploader = false;
        const Swal = await this.getSwal();
        Swal.fire({ icon: 'error', title: 'Something Went Wrong', showConfirmButton: false, timer: 1500 });
      }
    });
  }










  @ViewChildren(MatChipOption) chips!: QueryList<MatChipOption>;
  registerForm!: FormGroup;
  filterShowHide: boolean = false;

  onresize() {
    if (typeof window !== 'undefined') {
      if (window.innerWidth <= 360) {
        this.Tenant = 'TENANT TYPE';
        this.availability_text = 'AVAILABILITY';
      } else {
        this.Tenant = 'PREFERRED TENANT';
        this.availability_text = 'AVAILABLE FROM';
      }
    }
    this.registerForm = this.fb.group({ locality: [''] });
    this.dropdownSettingsMobile = {
      singleSelection: false, idField: 'locality_IDPK', textField: 'locality_name',
      selectAllText: 'Select All', unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3, allowSearchFilter: true, limitSelection: 3,
    };
    if (typeof window !== 'undefined') {
      var width = this.window.innerWidth;
      this.filterShowHide = width < 1080;
    }
  }



  transitionEnd(event: any) {
    var dv = document.getElementById('floatinglink');
    var dvStyle = dv!.getAttribute('style');
    if (dvStyle!?.indexOf('translateX(-584%)') > -1) {
      $('.floating-link').css('width', '216px');
      $('.border_div').css('opacity', '1');
      $('#floating_img').css('display', 'none');
    }
  }

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

  ngOnDestroy() {
    this.onresize();

    if (this.observer) { this.observer.disconnect(); }
    if (this.clickListener) { this.clickListener(); }
  }

  SelectedPropName: any;

  propertyNameClick(PropertyName: any, RegionID: any, localityid: any, PropertyID: any) {
    this.SelectedPropName = PropertyName;
    this.Filter.PropertyName = PropertyName;
    this.Filter.RegionID = RegionID;
    this.Filter.localityid = localityid;
    this.Filter.propid = PropertyID;
    $('#otpValidate').css('display', 'block');
  }

  onSelectionChange() { }

  submitFormReport() {
    var usernumber = this.storage?.getItem('userNumber');
    var userName = this.storage?.getItem('userName');
    var loginId = this.storage?.getItem('loginID');
    if (loginId === '1') {
      this.otploader = true;
      var param = {
        report_IDFK: this.selectedOption.IDPK,
        report_name: this.selectedOption.report_types,
        username: userName,
        usernumber: usernumber,
      };
      this.Service.submitOption(param).subscribe(async (responce: any) => {
        if ((responce['status'] = 'True')) {
          this.otploader = false;
          this.propAllIssue.forEach(propIssue => { propIssue.isSelected = false; });
          $('.modal_close').click();
          $('.modal-backdrop').remove();
          const Swal = await this.getSwal();
          Swal.fire({ title: 'Report Filed Successfully', text: 'Thank you for your Support', icon: 'success', showConfirmButton: false, timer: 2500 });
        }
      });
    } else {
      window.location.hash = 'reportissue';
      $('#otpValidate').css('display', 'block');
      if (this.loadComponent == false) {
        this.loadComponent = true;



        this.Visiblebrochure = this.Visiblebrochure ? false : true;
        $('.modal-login').css('z-index', '1');
      }
    }
  }

  LoginView = false;
  topicIssueRaised: any;
  IdissueRaised: any;

  selectIssue(issue: any, id: any) {
    if (issue) {
      this.topicIssueRaised = issue;
      this.IdissueRaised = id;
      $('.issueSubmitBtn').removeAttr('disabled').addClass('issueSubmitBtnActive').removeClass('issueSubmitBtn');
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
      if (isAnySelected) { submitButton.classList.add('issueSubmitBtnActive'); submitButton.removeAttribute('disabled'); }
      else { submitButton.classList.remove('issueSubmitBtnActive'); submitButton.setAttribute('disabled', 'true'); }
    }
  }

  Address_Hide = true;
  Address_Show = false;

  centerActiveButton() {
    const container = this.scrollPart?.nativeElement;
    if (!container) return;
    const target = container.querySelector('.btn-Project') as HTMLElement | null;
    if (!target) return;
    const offset = target.offsetLeft - (container.clientWidth / 2) + (target.clientWidth / 2);
    const maxScroll = container.scrollWidth - container.clientWidth;
    const scrollTo = Math.max(0, Math.min(offset, maxScroll));
    container.scrollTo({ left: scrollTo, behavior: 'smooth' });
  }






  // subscription code
  elitePropertyId: any = [];
  contactingPropertyId: any[] = [];
  eliteView: boolean = false;

  contactData: { [key: string]: any } = {};

  elitePlanView(propertyId: string | number) {
    const exists = this.elitePropertyId.includes(propertyId) || this.contactingPropertyId.includes(propertyId);

    if (exists) {
      console.log('Duplicate entry — not added');
      return;
    }

    this.contactingPropertyId.push(propertyId);

    var param = {
      number: this.userNumber,
      userId: this.userId,
      propid: propertyId,
      category_id: 5
    }

    this.eliteService.detailesCard(param).subscribe(response => {
      this.contactingPropertyId = this.contactingPropertyId.filter(id => id !== propertyId);
    if (response['status'] == "True") {
        this.elitePropertyId.push(propertyId);
        this.contactData[String(propertyId)] = response['contacteddata'];

      } else {
        this.elitePlan();
      }
    }, error => {
      this.contactingPropertyId = this.contactingPropertyId.filter(id => id !== propertyId);
    })


    // if (this.elitePropertyId.length < 3) {
    //   this.elitePropertyId.push(propertyId);
    //   console.log('Added:', this.elitePropertyId);
    //   this.eliteView = true;
    //   let stored = JSON.parse(localStorage.getItem('Elite_contact') || '[]');
    //   if (!Array.isArray(stored)) {
    //     stored = [];
    //   }
    //   if (!stored.includes(propertyId)) {
    //     stored.push(propertyId);
    //   }
    //   localStorage.setItem('Elite_contact', JSON.stringify(stored));
    // } else {
    //   console.log('Cannot add more than 3. Calling elitePlan()...');
    //   this.elitePlan();
    // }


    //  this.eliteService.getContactedList(this.userId).subscribe(response => {
    //   this.contactedList = response['pro_view']
    //   this.elitePropertyId = this.contactedList.map(
    //     (item: any) => item.property_IDPK
    //   );
    //  if (this.elitePropertyId.length == 0) {

    // } else {
    //   this.eliteView = true;
    // }
    // })


  }



  // isEliteOpen = true;
  elitePlan() {
    $('#elitePlanModal').modal('show');
  }
  elitePlanRouter() {
    $('#elitePlanClose').click();
     // this.router.navigate(['/homes-elite']);
     window.location.href = 'https://hostinger.homes247.in/homes-elite#1';
  }



}