import { CommonModule, isPlatformBrowser, Location, TitleCasePipe } from '@angular/common';
import { AfterViewInit, Component, DOCUMENT, ElementRef, HostListener, Inject, OnDestroy, OnInit, PLATFORM_ID, QueryList, Renderer2, viewChild, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatChip, MatChipOption, MatChipSelectionChange, MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
// import { CountdownComponent, CountdownEvent, CountdownModule } from 'ngx-countdown';
import { NgOtpInputModule } from 'ng-otp-input';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
// import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { Observable, Subscription } from 'rxjs';
import { CityService } from '../city.service';
import { DataService } from '../data.service';
import { FilterService } from '../filter.service';
import { Enquiry } from '../home/home';
import { CountdownComponent, CountdownEvent } from 'ngx-countdown';
import { SafeStorageService } from '../safe-storage.service';
import { cleanUrlPipe, customPriceFormatPipe } from '../mainpipe-pipe';
// import { InnerHeader } from '../inner-header/inner-header';
// import { enquiry } from '../prop-details/class';
// import { PipeModule } from '../pipe/pipe.module';
// import { Shared3Module } from '../shared/shared.module3';
// import { InfiniteScrollModule } from 'ngx-infinite-scroll';
// Swal lazy-loaded
import { InnerHeadderWithSidenav } from '../inner-headder-with-sidenav/inner-headder-with-sidenav';
import { ElitedataService } from '../elitedata.service';
import { AdCardsComponent } from "../ad-cards/ad-cards.component";


// declare var swal: any;
declare var $: any;

@Component({
  selector: 'app-pg-locality',
  templateUrl: './pg-locality.html',
  styleUrls: ['./pg-locality.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    NgxSkeletonLoaderModule,
    // NgMultiSelectDropDownModule,
    // CountdownModule,
    NgOtpInputModule,
    // PipeModule,
    // Shared3Module,
    // InfiniteScrollModule,
    InnerHeadderWithSidenav,
    customPriceFormatPipe,
    cleanUrlPipe,
    CountdownComponent,
    AdCardsComponent
],
})
export class PgLocality implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('scrollAnchor', { static: false }) scrollAnchor!: ElementRef;
  @ViewChild('cancel') cancel!: ElementRef;
  readonly countdown4 = viewChild<CountdownComponent>('cd4');
  readonly ngOtpInput = viewChild<any>('ngOtpInput')
  // user = new enquiry();
  enquiry = new Enquiry();
  public n: number = 1;
  citiess: any;
  cityid: any;
  selected: any;
  currentCity: any;
  changeText: boolean = false;
  Matautocomplete: any;
  filter: boolean = false;
  filterLoader: boolean = false;
  myControl = new FormControl();
  options: any;
  filteredOptions: Observable<any>;
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
  projecttype = [];
  Availability = [];
  FurnishType: any;
  RentRange = [];
  TenantType: any;
  BhkRange = [];
  postedBy: any;
  bhkarray = [];
  balconyarray = [];
  doorfacings = [];
  approvals = [];
  amenities = [];
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
  private routeSub: Subscription;
  proptypeurlparam: any;
  property_typeId: any;
  cityapi: any;
  noOfBedrooms: any;
  locality = [];
  statusId: any;
  projectcount: any;
  PGprojectcount: any;
  propertiescount: any;
  propertylists = [];

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
  bathroomarray = [];
  listarraylength: any;
  localityData = [];
  dropdownSettingsMobile = {};
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
  zeroprojects = false;
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
  localityName: any;
  Locality_Seo: any;
  TypeList: any;
  SuitedTypeList: any;
  FoodTypeList: any;
  RoomTypeList: any;
  RoomTypeList1: any;
  parking_avl = [];
  meal_type = [];
  ParkingTypeList: any;
  currentLocality = '';
  currentLocalityId = '';
  air_conditioner = [];
  AcTypeList: any;
  userRentalFavList = [];
  propertyIds = [];

  // Window and localStorage — replaced from @ng-toolkit/universal
  // private window = window;
  // private storage = localStorage;

  configs = [
    {
      key: 'pg-for-rent-in-',
      h1: (city: string, locality: string, id: string) => `PGs for Rent in ${locality}, ${city}`,
      title: (city: string, locality: string, id: string) => `PGs for Rent in ${locality}, ${city} | Boys & Girls`,
      desc: (city: string, locality: string, id: string) => `Explore affordable PGs for rent in ${locality}, ${city}. Choose from verified listings for boys, girls, and co-living spaces with meals, Wi-Fi, and secure facilities.`,
      ogTitle: (city: string, locality: string, id: string) => `PGs for Rent in ${locality}, ${city}`,
      ogDesc: (city: string, locality: string, id: string) => `Explore affordable PGs for rent in ${locality}, ${city}. Verified options with food, Wi-Fi, and safe accommodation for students & professionals.`,
    },
    {
      key: 'pg-for-boys-in-',
      h1: (city: string, locality: string, id: string) => `Boys PG in ${locality}, ${city}`,
      title: (city: string, locality: string, id: string) => `Boys PG in ${locality}, ${city} | Verified Listings`,
      desc: (city: string, locality: string, id: string) => `Find boys PGs in ${locality}, ${city} with meals, Wi-Fi, and affordable rent. Verified and safe PG accommodations ideal for students and working professionals.`,
      ogTitle: (city: string, locality: string, id: string) => `Boys PG in ${locality}, ${city}`,
      ogDesc: (city: string, locality: string, id: string) => `Verified boys PGs in ${locality}, ${city} with meals, Wi-Fi & secure facilities for students and employees.`,
    },
    {
      key: 'pg-for-girls-in-',
      h1: (city: string, locality: string, id: string) => `Girls PG in ${locality}, ${city}`,
      title: (city: string, locality: string, id: string) => `Safe Girls PG in ${locality}, ${city} | Secure Stays`,
      desc: (city: string, locality: string, id: string) => `Discover girls PGs in ${locality}, ${city} with food, Wi-Fi, and top safety features. Verified PG listings suitable for students and professionals.`,
      ogTitle: (city: string, locality: string, id: string) => `Girls PG in ${locality}, ${city}`,
      ogDesc: (city: string, locality: string, id: string) => `Safe & verified girls PGs in ${locality}, ${city} with meals, Wi-Fi, and secure stays.`,
    },
    {
      key: 'pg-for-co-living-in-',
      h1: (city: string, locality: string, id: string) => `Co-Living PGs in ${locality}, ${city}`,
      title: (city: string, locality: string, id: string) => `Co-Living PGs in ${locality}, ${city} | Shared Living`,
      desc: (city: string, locality: string, id: string) => `Browse co-living PGs in ${locality}, ${city}. Affordable shared living spaces with food, Wi-Fi, and modern facilities for students and working professionals.`,
      ogTitle: (city: string, locality: string, id: string) => `Co-Living PGs in ${locality}, ${city}`,
      ogDesc: (city: string, locality: string, id: string) => `Affordable co-living PGs in ${locality}, ${city} with shared spaces, meals & Wi-Fi.`,
    },
    {
      key: 'pg-for-students-in',
      h1: (locality: string, city: string) => `Students PG in ${locality}, ${city}`,
      title: (locality: string, city: string) => `Students PG in ${locality}, ${city} | Affordable & Safe`,
      desc: (locality: string, city: string) => `Find affordable students PGs in ${locality}, ${city} with meals, Wi-Fi, study-friendly environment and verified safety. Ideal for college students and young learners.`,
      ogTitle: (locality: string, city: string) => `Students PG in ${locality}, ${city} | Affordable & Safe`,
      ogDesc: (locality: string, city: string) => `Explore verified PGs for students in ${locality}, ${city} with Wi-Fi, meals and a secure, study-focused environment.`,
    },
    {
      key: 'pg-for-working-professionals-in-',
      h1: (locality: string, city: string) => `Working Professionals PG in ${locality}, ${city}`,
      title: (locality: string, city: string) => `PG for Working Professionals in ${locality}, ${city}`,
      desc: (locality: string, city: string) => `Discover PGs for working professionals in ${locality}, ${city}. Verified stays with meals, Wi-Fi, AC and parking. Perfect for corporate employees seeking comfort and connectivity.`,
      ogTitle: (locality: string, city: string) => `PGs for Professionals in ${locality}, ${city}`,
      ogDesc: (locality: string, city: string) => `Verified PGs for working professionals in ${locality}, ${city} with meals, Wi-Fi, AC and parking.`,
    },
    {
      key: 'pg-for-rent-in-*-price-under-10000',
      h1: (city: string, locality: string, id: string) => `PGs under ₹10,000 in ${locality}, ${city}`,
      title: (city: string, locality: string, id: string) => `PGs under 10000 in ${locality}, ${city} | Budget Friendly`,
      desc: (city: string, locality: string, id: string) => `Explore PGs under ₹10,000 in ${locality}, ${city}. Affordable and verified PG accommodations with food, Wi-Fi, and basic facilities for students and professionals.`,
      ogTitle: (city: string, locality: string, id: string) => `Budget PGs under 10000 in ${locality}, ${city}`,
      ogDesc: (city: string, locality: string, id: string) => `Find affordable PGs under 10K in ${locality}, ${city}. Verified listings with meals, Wi-Fi & secure options.`,
    },
    {
      key: 'pg-for-rent-in-*-price-10000-to-15000',
      h1: (city: string, locality: string, id: string) => `PGs ₹10,000–₹15,000 in ${locality}, ${city}`,
      title: (city: string, locality: string, id: string) => `PGs 10000 to 15000 in ${locality}, ${city} | Verified`,
      desc: (city: string, locality: string, id: string) => `Find PGs in ${locality}, ${city} priced ₹10,000–₹15,000. Choose from verified listings with food, Wi-Fi, and premium facilities at convenient locations.`,
      ogTitle: (city: string, locality: string, id: string) => `Verified PGs 10K–15K in ${locality}, ${city}`,
      ogDesc: (city: string, locality: string, id: string) => `Explore PGs priced 10K–15K in ${locality}, ${city}. Verified accommodations with meals, Wi-Fi & safety.`,
    },
    {
      key: 'pg-for-rent-in-*-price-15000-to-20000',
      h1: (city: string, locality: string, id: string) => `PGs ₹15,000–₹20,000 in ${locality}, ${city}`,
      title: (city: string, locality: string, id: string) => `PGs 15000 to 20000 in ${locality}, ${city} | Premium`,
      desc: (city: string, locality: string, id: string) => `Browse premium PGs in ${locality}, ${city} priced between ₹15,000–₹20,000. Verified accommodations with meals, Wi-Fi, AC rooms, and modern amenities.`,
      ogTitle: (city: string, locality: string, id: string) => `Premium PGs 15K–20K in ${locality}, ${city}`,
      ogDesc: (city: string, locality: string, id: string) => `Verified premium PGs priced 15K–20K in ${locality}, ${city}. Includes meals, Wi-Fi & AC rooms.`,
    },
    {
      key: 'veg-pg-in-',
      h1: (locality: string, city: string) => `Veg PGs in ${locality}, ${city}`,
      title: (locality: string, city: string) => `Vegetarian PGs in ${locality}, ${city} | Pure Veg`,
      desc: (locality: string, city: string) => `Find vegetarian PGs in ${locality}, ${city} offering pure veg meals, hygienic kitchens and verified stays. Ideal for residents seeking vegetarian-only food with Wi-Fi and secure facilities.`,
      ogTitle: (locality: string, city: string) => `Vegetarian PGs in ${locality}, ${city}`,
      ogDesc: (locality: string, city: string) => `Explore pure veg PGs in ${locality}, ${city} with hygienic meals, Wi-Fi and verified accommodation options.`,
    },
    {
      key: 'veg-nonveg-pg-in-',
      h1: (locality: string, city: string) => `Veg & Non-Veg PGs in ${locality}, ${city}`,
      title: (locality: string, city: string) => `Veg & Non-Veg PGs in ${locality}, ${city} | Food Options`,
      desc: (locality: string, city: string) => `Discover PGs in ${locality}, ${city} offering both veg and non-veg meal options. Verified listings with flexible food plans, Wi-Fi and safe living for students and professionals.`,
      ogTitle: (locality: string, city: string) => `Veg & Non-Veg PGs in ${locality}, ${city}`,
      ogDesc: (locality: string, city: string) => `Find PGs in ${locality}, ${city} with veg & non-veg meal choices. Verified PGs with meals, Wi-Fi and secure facilities.`,
    },
    {
      key: 'private-room-pg-in-',
      h1: (city: string, locality: string, id: string) => `Private Room PG in ${locality}, ${city}`,
      title: (city: string, locality: string, id: string) => `Private Room PG in ${locality}, ${city} | Secure Stay`,
      desc: (city: string, locality: string, id: string) => `Find private room PGs in ${locality}, ${city}. Perfect for students and professionals who prefer privacy. Verified accommodations with meals, Wi-Fi, and safe facilities.`,
      ogTitle: (city: string, locality: string, id: string) => `Private PG Rooms in ${locality}, ${city}`,
      ogDesc: (city: string, locality: string, id: string) => `Explore verified private room PGs in ${locality}, ${city} with meals, Wi-Fi, and secure housing options.`,
    },
    {
      key: 'two-sharing-pg-in-',
      h1: (city: string, locality: string, id: string) => `Two Sharing PG in ${locality}, ${city}`,
      title: (city: string, locality: string, id: string) => `Two Sharing PG in ${locality}, ${city} | Affordable`,
      desc: (city: string, locality: string, id: string) => `Discover two sharing PGs in ${locality}, ${city}. Affordable living with shared rooms, meals, Wi-Fi, and verified PG facilities for students and professionals.`,
      ogTitle: (city: string, locality: string, id: string) => `2 Sharing PGs in ${locality}, ${city}`,
      ogDesc: (city: string, locality: string, id: string) => `Explore affordable two sharing PGs in ${locality}, ${city}. Includes meals, Wi-Fi, and secure housing.`,
    },
    {
      key: 'three-sharing-pg-in-',
      h1: (city: string, locality: string, id: string) => `Three Sharing PG in ${locality}, ${city}`,
      title: (city: string, locality: string, id: string) => `Three Sharing PG in ${locality}, ${city} | Budget`,
      desc: (city: string, locality: string, id: string) => `Affordable three sharing PGs in ${locality}, ${city}. Verified listings with meals, Wi-Fi, and secure facilities. Ideal for students and working professionals.`,
      ogTitle: (city: string, locality: string, id: string) => `3 Sharing PGs in ${locality}, ${city}`,
      ogDesc: (city: string, locality: string, id: string) => `Budget three sharing PGs in ${locality}, ${city} with meals, Wi-Fi, and trusted facilities.`,
    },
    {
      key: 'four-sharing-pg-in-',
      h1: (city: string, locality: string, id: string) => `Four Sharing PG in ${locality}, ${city}`,
      title: (city: string, locality: string, id: string) => `Four Sharing PG in ${locality}, ${city} | Verified`,
      desc: (city: string, locality: string, id: string) => `Find four sharing PGs in ${locality}, ${city}. Affordable and verified stays with meals, Wi-Fi, and trusted facilities for groups of students or employees.`,
      ogTitle: (city: string, locality: string, id: string) => `4 Sharing PGs in ${locality}, ${city}`,
      ogDesc: (city: string, locality: string, id: string) => `Explore verified four sharing PGs in ${locality}, ${city} with meals, Wi-Fi, and safe housing.`,
    },
    {
      key: 'five-sharing-pg-in-',
      h1: (city: string, locality: string, id: string) => `Five Sharing PG in ${locality}, ${city}`,
      title: (city: string, locality: string, id: string) => `Five Sharing PG in ${locality}, ${city} | Affordable`,
      desc: (city: string, locality: string, id: string) => `Explore five sharing PGs in ${locality}, ${city}. Budget-friendly PG options with meals, Wi-Fi, and verified safe living for students and young professionals.`,
      ogTitle: (city: string, locality: string, id: string) => `5 Sharing PGs in ${locality}, ${city}`,
      ogDesc: (city: string, locality: string, id: string) => `Affordable five sharing PGs in ${locality}, ${city}. Includes meals, Wi-Fi, and verified safe living.`,
    },
    {
      key: 'six-sharing-pg-in-',
      h1: (city: string, locality: string, id: string) => `Six Sharing PG in ${locality}, ${city}`,
      title: (city: string, locality: string, id: string) => `Six Sharing PG in ${locality}, ${city} | Budget Friendly`,
      desc: (city: string, locality: string, id: string) => `Find six sharing PGs in ${locality}, ${city}. Budget accommodations with meals, Wi-Fi, and safe housing for students and professionals.`,
      ogTitle: (city: string, locality: string, id: string) => `6 Sharing PGs in ${locality}, ${city}`,
      ogDesc: (city: string, locality: string, id: string) => `Budget six sharing PGs in ${locality}, ${city} with verified listings, meals & Wi-Fi.`,
    },
    {
      key: 'seven-sharing-pg-in-',
      h1: (city: string, locality: string, id: string) => `Seven Sharing PG in ${locality}, ${city}`,
      title: (city: string, locality: string, id: string) => `Seven Sharing PG in ${locality}, ${city} | Verified`,
      desc: (city: string, locality: string, id: string) => `Affordable seven sharing PGs in ${locality}, ${city}. Verified PG options with food, Wi-Fi, and secure facilities for students and professionals.`,
      ogTitle: (city: string, locality: string, id: string) => `7 Sharing PGs in ${locality}, ${city}`,
      ogDesc: (city: string, locality: string, id: string) => `Verified seven sharing PGs in ${locality}, ${city} with meals, Wi-Fi & safe housing.`,
    },
    {
      key: 'eight-sharing-pg-in-',
      h1: (city: string, locality: string, id: string) => `Eight Sharing PG in ${locality}, ${city}`,
      title: (city: string, locality: string, id: string) => `Eight Sharing PG in ${locality}, ${city} | Budget Options`,
      desc: (city: string, locality: string, id: string) => `Discover eight sharing PGs in ${locality}, ${city}. Verified and budget-friendly PG accommodations with meals, Wi-Fi, and secure stays for groups.`,
      ogTitle: (city: string, locality: string, id: string) => `8 Sharing PGs in ${locality}, ${city}`,
      ogDesc: (city: string, locality: string, id: string) => `Budget-friendly eight sharing PGs in ${locality}, ${city} with meals, Wi-Fi & safe facilities.`,
    },
    {
      key: 'nine-sharing-pg-in-',
      h1: (city: string, locality: string, id: string) => `Nine Sharing PG in ${locality}, ${city}`,
      title: (city: string, locality: string, id: string) => `Nine Sharing PG in ${locality}, ${city} | Affordable`,
      desc: (city: string, locality: string, id: string) => `Find nine sharing PGs in ${locality}, ${city}. Affordable accommodations with meals, Wi-Fi, and verified PG listings for students and professionals.`,
      ogTitle: (city: string, locality: string, id: string) => `9 Sharing PGs in ${locality}, ${city}`,
      ogDesc: (city: string, locality: string, id: string) => `Affordable nine sharing PGs in ${locality}, ${city} with meals, Wi-Fi & secure group stays.`,
    },
    {
      key: 'ten-sharing-pg-in-',
      h1: (city: string, locality: string, id: string) => `Ten Sharing PG in ${locality}, ${city}`,
      title: (city: string, locality: string, id: string) => `Ten Sharing PG in ${locality}, ${city} | Budget Friendly`,
      desc: (city: string, locality: string, id: string) => `Explore ten sharing PGs in ${locality}, ${city}. Affordable PG stays with meals, Wi-Fi, and secure facilities. Perfect for groups of students and young professionals.`,
      ogTitle: (city: string, locality: string, id: string) => `10 Sharing PGs in ${locality}, ${city}`,
      ogDesc: (city: string, locality: string, id: string) => `Verified ten sharing PGs in ${locality}, ${city}. Affordable group stays with meals, Wi-Fi & safety.`,
    },
    {
      key: 'ac-pg-in-',
      h1: (city: string, locality: string, id: string) => `AC PG in ${locality}, ${city}`,
      title: (city: string, locality: string, id: string) => `AC PG in ${locality}, ${city} | Comfortable Stays`,
      desc: (city: string, locality: string, id: string) => `Find AC PGs in ${locality}, ${city}. Stay cool and comfortable with verified air-conditioned PG accommodations, meals, Wi-Fi, and secure facilities.`,
      ogTitle: (city: string, locality: string, id: string) => `AC PGs in ${locality}, ${city}`,
      ogDesc: (city: string, locality: string, id: string) => `Air-conditioned PGs in ${locality}, ${city} with meals, Wi-Fi & verified comfort.`,
    },
    {
      key: 'pg-with-parking-in-',
      h1: (city: string, locality: string, id: string) => `PG with Parking in ${locality}, ${city}`,
      title: (city: string, locality: string, id: string) => `PG with Parking in ${locality}, ${city} | Verified Options`,
      desc: (city: string, locality: string, id: string) => `Discover PGs with parking in ${locality}, ${city}. Verified accommodations offering meals, Wi-Fi, and secure vehicle parking for students and professionals.`,
      ogTitle: (city: string, locality: string, id: string) => `PGs with Parking in ${locality}, ${city}`,
      ogDesc: (city: string, locality: string, id: string) => `Find PGs in ${locality}, ${city} with secure parking, meals & Wi-Fi. Verified options for students & professionals.`,
    },
  ];

  constructor(
    private activeroute: ActivatedRoute,
    private router: Router,
    private _location: Location,
    public cityservice: CityService,
    public Service: DataService,
    private titleService: Title,
    private eliteService: ElitedataService,

    private meta: Meta,
    private fb: FormBuilder,
    private Filter: FilterService,
    private renderer: Renderer2,
    private elRef: ElementRef,
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
      this.window.scrollTo(0, 0);
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
  loginidNew: any

  login: boolean = false
  userId: any
  userNumber: any
  contactedList: any

  // pg locality
  ngOnInit() {
  this.otploader = true;

    var value = this.cityservice.cityfinder(this.router.url);
    this.currentCity = value.cityname;
    var localityid = this.router.url.split('-').pop().match(/[0-9]+/);
    this.localityid = localityid;
    var param11 = { locid: localityid };
    this.Service.getlocalitymeta('', param11).subscribe((metatag) => {
      let metatags = metatag['Localityseo'];
      var localityName = metatags[0].LocalityName;
      const Locality_Seo = localityName.toLowerCase().replace(/\s+/g, '-');
      this.localityName = Locality_Seo;
      this.Locality_Seo = localityName;
      this.getlocality();
      this.metatags();
      this.GetRentalList();
      this.onresize();
      const loginid = this.storage?.getItem('loginID');
      this.loginidNew = loginid
      this.UserId = this.storage?.getItem("userID");
    });
    const loginid = this.storage?.getItem('loginID');
    if (loginid === '1') {
      this.login = true;
      this.userId = this.storage?.getItem('userID');
      this.userNumber = this.storage?.getItem('userNumber');
this.otploader = true
      this.eliteService.getContactedList(this.userId).subscribe(response => {
        if (response['status'] == "True") {
          this.contactedList = response['pro_view']

          this.elitePropertyId = this.contactedList.map((item: any) => {
            this.contactData[String(item.property_IDPK)] = item.owner_details;

            return item.property_IDPK;

          });
this.otploader = false

          if (this.elitePropertyId?.length == 0) {

          } else {
            this.eliteView = true;
          }
        }
      })

    } else {
      this.login = false;
    }
    this.dropdownSettingsMobile = {
      singleSelection: false,
      idField: 'locality_IDPK',
      textField: 'locality_name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      limitSelection: 3
    };
    $('.head_sticky').css('padding-bottom', '54px');
  }


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
        this.h1Text = cfg.h1(this.currentCity, this.localityName, this.localityid);
        this.titleService.setTitle(cfg.title(this.currentCity, this.localityName, this.localityid));
        this.meta.updateTag({ name: 'description', content: cfg.desc(this.currentCity, this.localityName, this.localityid) });
        this.meta.updateTag({ property: 'og:title', content: cfg.ogTitle(this.currentCity, this.localityName, this.localityid) });
        this.meta.updateTag({ property: 'og:description', content: cfg.ogDesc(this.currentCity, this.localityName, this.localityid) });
      }
    });
    this.Service.createLinkForCanonicalURL();
  }

  getlocality() {
    var value = this.cityservice.cityfinder(this.router.url);
    this.currentCity = value.cityname;
    this.cityId = value.cityid;
    var regionid = '';
    var paramss = { cityId: this.cityId, regionid: regionid };
    this.Service.getlocality(paramss).subscribe(localitys => {
      this.localitys = localitys['details'];
    });
  }

  onLocalitySelect(eve: any) {
    this.localityData.push(eve.locality_IDPK);
    this.GetRentalList();
  }

  onLocalityDeSelect(event: any) {
    var index = this.localityData?.indexOf(event);
    this.localityData.splice(index, 1);
    this.GetRentalList();
  }

  roomtypepg = [];
  pgAvailableForListvalue = [];
  pgBestSuitForListvalue = [];
  pgFoodListvalue = [];

  calculateDate(daysToAdd: number): string {
    const date = new Date();
    date.setDate(date.getDate() + daysToAdd);
    return date.toISOString().split('T')[0];
  }

  lessDepositeAmt: any;
  LowBudgetData: any;
  area_max: any;
  area_min: any;
  amenityId = [];
  h1Text: any;

  GetRentalList() {
    PgLocality.citycount = -4;
    this.showloader = true;
    this.routeSub = this.activeroute.params.subscribe(params => {
      var value = this.cityservice.cityfinder(this.router.url);
      this.currentCity = value.cityname;
      this.city = value.cityname.toLowerCase();

      this.activeroute.queryParamMap.subscribe((params) => {
        if (params['params']) {
          if (params['params']['roomtype']) { this.roomtypepg = params['params']['roomtype']; }
          if (params['params']['pgavailablefor']) { this.pgAvailableForListvalue = params['params']['pgavailablefor']; }
          if (params['params']['pgbestsuit']) { this.pgBestSuitForListvalue = params['params']['pgbestsuit']; }
          if (params['params']['pgfoodtype']) { this.pgFoodListvalue = params['params']['pgfoodtype']; }
          if (params['params']['min']) { this.minPrice = params['params']['min']; }
          if (params['params']['max']) { this.maxPrice = params['params']['max']; }
          if (params['params']['localityId']) { this.locality = params['params']['localityId']; }
        }
      });

      const newId = this.router.url.split('-').pop().match(/[0-9]+/)[0];
      if (newId) {
        const index = this.locality?.indexOf(newId);
        if (index === -1) { this.locality.push(newId); }
      }

      let isValidUrl = false;
      this.Service.postPropNewPg2().subscribe(list => {
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

          this.TypeList.forEach(type => {
            const Url = `/pgll/pg-for-${type.label.toLowerCase().replace(/\s+/g, '-')}-in-${this.localityName}-${this.city}-${this.locality}`;
            if (this.router.url.split('&utm_source')[0] === Url) {
              if (!this.pgAvailableForListvalue.includes(type.key)) { this.pgAvailableForListvalue.push(type.key); }
              isValidUrl = true;
            }
          });

          this.SuitedTypeList.slice(0, -1).forEach(type => {
            const Url = `/pgll/pg-for-${type.label.toLowerCase().replace(/\s+/g, '-')}-in-${this.localityName}-${this.city}-${this.locality}`;
            if (this.router.url.split('&utm_source')[0] === Url) {
              if (!this.pgBestSuitForListvalue.includes(type.key)) { this.pgBestSuitForListvalue.push(type.key); }
              isValidUrl = true;
            }
          });

          this.RoomTypeList.slice(0, -1).forEach(type => {
            const Url = `/pgll/${type.label.toLowerCase().replace(/\s+/g, '-')}-pg-in-${this.localityName}-${this.city}-${this.locality}`;
            if (this.router.url.split('&utm_source')[0] === Url) {
              if (!this.roomtypepg.includes(type.value)) { this.roomtypepg.push(type.value); }
              isValidUrl = true;
            }
          });

          this.RoomTypeList1.forEach(type => {
            const Url = `/pgll/${type.label.toLowerCase().replace(/\s+/g, '-')}-pg-in-${this.localityName}-${this.city}-${this.locality}`;
            if (this.router.url.split('&utm_source')[0] === Url) {
              if (!this.roomtypepg.includes(type.value)) { this.roomtypepg.push(type.value); }
              isValidUrl = true;
            }
          });

          this.ParkingTypeList.forEach(type => {
            const Url = `/pgll/pg-with-parking-in-${this.localityName}-${this.city}-${this.locality}`;
            if (this.router.url.split('&utm_source')[0] === Url) {
              if (!this.parking_avl.includes(type.key)) { this.parking_avl.push(type.key); }
              isValidUrl = true;
            }
          });

          this.AcTypeList.forEach(type => {
            const Url = `/pgll/ac-pg-in-${this.localityName}-${this.city}-${this.locality}`;
            if (this.router.url.split('&utm_source')[0] === Url) {
              if (!this.air_conditioner.includes(31)) { this.air_conditioner.push(31); }
              isValidUrl = true;
            }
          });

          budgetRanges.forEach(type => {
            const Url = `/pgll/pg-for-rent-in-${this.localityName}-${this.city}${type.urlPart}-${this.locality}`;
            if (this.router.url.split('&utm_source')[0] === Url) {
              this.minPrice = type.min;
              this.maxPrice = type.max;
              isValidUrl = true;
            }
          });

          FoodTypeList.forEach(type => {
            const Url = `/pgll/${type.urlPart.toLowerCase().replace(/\s+/g, '-')}-pg-in-${this.localityName}-${this.city}-${this.locality}`;
            if (this.router.url.split('&utm_source')[0] === Url) {
              if (!this.meal_type.includes(type.value)) { this.meal_type.push(type.value); }
              isValidUrl = true;
            }
          });

          const currentUrl = this.router.url;
          if (currentUrl.includes('/pgll/pg-for-rent-in-')) { isValidUrl = true; }
          if (!isValidUrl) { this.router.navigate(['/404'], { skipLocationChange: true }); }

          var limit = 0;
          var limitrows = 4;
          var param = {
            limit: limit, limitrows: limitrows,
            localityId: this.locality, suited_for: this.pgBestSuitForListvalue,
            food_included: this.pgFoodListvalue, sharing_type: this.roomtypepg,
            pg_type: this.pgAvailableForListvalue, price_min: this.minPrice,
            price_max: this.maxPrice, meal_type: this.meal_type,
            parking_avl: this.parking_avl, userId: this.storage?.getItem('userID')
          };
          this.Service.PGRent(this.city, param).subscribe((topProperty: any[]) => {
            this.otploader = true
            if (topProperty['status'] === 'True') {
              this.propertylists = topProperty['details'];
              this.otploader = false

              this.topprojectsloader = false;
            } else {
              this.topprojectsloader = true;
            }
          });

          this.Service.PGRentCount(this.city, param).subscribe(countprojects => {
            this.PGprojectcount = countprojects['Counts'][0].PropertyCounts;
            // console.log(this.PGprojectcount);

          });

          this.updateSelectedChips();
        }
      });
    });


  }


  propertyCount() {
    var limit = 0;
    var limitrows = 4;
    var param = {
      limit: limit, limitrows: limitrows,
      localityId: this.locality, suited_for: this.pgBestSuitForListvalue,
      food_included: this.pgFoodListvalue, sharing_type: this.roomtypepg,
      pg_type: this.pgAvailableForListvalue, price_min: this.minPrice,
      price_max: this.maxPrice, meal_type: this.meal_type,
      parking_avl: this.parking_avl, userId: this.storage?.getItem('userID')
    };
    this.Service.getRentprojectscount(this.city, param).subscribe(countprojects => {
      this.projectcount = countprojects['Counts'][0].PropertyCounts;
    });

    var paramInd = {};
    this.Service.getindividualprojectscount(this.city, paramInd).subscribe(projectcounts => {
      this.propertiescount = projectcounts['Counts'][0].PropertyCounts;
    });
    this.Service.getprojectscount(this.city, paramInd).subscribe((projectcount) => {
      this.projectcount_city = projectcount['Counts'][0].PropertyCounts;
    });
    this.Service.commercialSalePropertiesCount(this.city, param).subscribe(countprojects => {
      this.projectcommercialcount = countprojects['Counts'][0].PropertyCounts;
    });

    const userId = this.storage?.getItem('userID');
    if (userId) {
      this.UserId = this.storage?.getItem('userID');
      if (!('pgPropertyID' in this.storage)) {
        this.storage.setItem('pgPropertyID', '[]');
      }
      this.Service.getUserWishListByIdTest(this.UserId, 5).subscribe(userFavList => {
        this.userRentalFavList = userFavList['favouritelist'];
        this.propertyIds = this.userRentalFavList.map(item => item.propertyId) || [];
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
  enquiryFormComponent: any
  coverimage: any = 'https://img.homes247.in/images/pg_img/gallery/'
  // dataLoads() {

  // }
  onScrollOnce: boolean = true

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
      import('../mat-autocomplete-new/mat-autocomplete-new')
        .then(c => {
          this.Matautocomplete = c.MatAutocompleteNew;
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
    this.initIntersectionObserver();


    setTimeout(() => {
      this.propertyCount()
    }, 800);
  }

  private initIntersectionObserver() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
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
      const limit = PgLocality.citycount += 4;
      var limitrows = 4;
      var param = {
        limit: limit, limitrows: limitrows,
        localityId: this.locality, suited_for: this.pgBestSuitForListvalue,
        food_included: this.pgFoodListvalue, sharing_type: this.roomtypepg,
        pg_type: this.pgAvailableForListvalue, price_min: this.minPrice,
        price_max: this.maxPrice, meal_type: this.meal_type,
        parking_avl: this.parking_avl, userId: this.storage?.getItem('userID')
      };
      let livecount = this.propertylists?.length || 0;
      if (livecount < totalcount) {
        return this.Service.PGRent(this.city, param).subscribe(propertylists => {
          var status = propertylists['status'];
          if (status == 'False') {
            this.showloader = false;
            $('.search-results').css('padding-bottom', '110px');
          } else {
            this.propertylists = this.propertylists.concat(propertylists['details']);
            // console.log(this.propertylists);

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
  }

  goBackFromEnq() {
    this.IsVisibleEnquery = this.IsVisibleEnquery ? false : true;
  }

  Immediateclick() {
    if (this.ImmediateSelect === true) {
      this.todaydate = ''; this.futuredate = ''; this.ImmediateSelect = false;
    } else {
      this.todaydate = '2022-01-01';
      var fdate = new Date(); fdate.setDate(fdate.getDate() + 5);
      this.futuredate = fdate.toISOString().split('T')[0];
      this.ImmediateSelect = true; this.Within15DaysSelect = false; this.Within30DaysSelect = false; this.After30DaysSelect = false;
    }
  }

  Within15Daysclick() {
    if (this.Within15DaysSelect === true) {
      this.todaydate = ''; this.futuredate = ''; this.Within15DaysSelect = false;
    } else {
      this.todaydate = new Date().toISOString().split('T')[0];
      var fdate = new Date(); fdate.setDate(fdate.getDate() + 15);
      this.futuredate = fdate.toISOString().split('T')[0];
      this.ImmediateSelect = false; this.Within15DaysSelect = true; this.Within30DaysSelect = false; this.After30DaysSelect = false;
    }
  }

  Within30Daysclick() {
    if (this.Within30DaysSelect === true) {
      this.todaydate = ''; this.futuredate = ''; this.Within30DaysSelect = false;
    } else {
      this.todaydate = new Date().toISOString().split('T')[0];
      var fdate = new Date(); fdate.setDate(fdate.getDate() + 30);
      this.futuredate = fdate.toISOString().split('T')[0];
      this.ImmediateSelect = false; this.Within15DaysSelect = false; this.Within30DaysSelect = true; this.After30DaysSelect = false;
    }
  }

  After30Daysclick() {
    if (this.After30DaysSelect === true) {
      this.todaydate = ''; this.futuredate = ''; this.After30DaysSelect = false;
    } else {
      var fdate = new Date(); fdate.setDate(fdate.getDate() + 30);
      this.todaydate = fdate.toISOString().split('T')[0];
      this.futuredate = '';
      this.ImmediateSelect = false; this.Within15DaysSelect = false; this.Within30DaysSelect = false; this.After30DaysSelect = true;
    }
  }

  RentRange1click() {
    if (this.RentRange1Select === true) { this.maxbudget_IDPK = ''; this.minbudget_IDPK = ''; this.RentRange1Select = false; }
    else { this.maxbudget_IDPK = '5000'; this.minbudget_IDPK = ''; this.RentRange1Select = true; this.RentRange2Select = false; this.RentRange3Select = false; this.RentRange4Select = false; this.RentRange5Select = false; this.RentRange6Select = false; }
  }
  RentRange2click() {
    if (this.RentRange2Select === true) { this.maxbudget_IDPK = ''; this.minbudget_IDPK = ''; this.RentRange2Select = false; }
    else { this.maxbudget_IDPK = '10000'; this.minbudget_IDPK = '5000'; this.RentRange1Select = false; this.RentRange2Select = true; this.RentRange3Select = false; this.RentRange4Select = false; this.RentRange5Select = false; this.RentRange6Select = false; }
  }
  RentRange3click() {
    if (this.RentRange3Select === true) { this.maxbudget_IDPK = ''; this.minbudget_IDPK = ''; this.RentRange3Select = false; }
    else { this.maxbudget_IDPK = '20000'; this.minbudget_IDPK = '10000'; this.RentRange1Select = false; this.RentRange2Select = false; this.RentRange3Select = true; this.RentRange4Select = false; this.RentRange5Select = false; this.RentRange6Select = false; }
  }
  RentRange4click() {
    if (this.RentRange4Select === true) { this.maxbudget_IDPK = ''; this.minbudget_IDPK = ''; this.RentRange4Select = false; }
    else { this.maxbudget_IDPK = '30000'; this.minbudget_IDPK = '20000'; this.RentRange1Select = false; this.RentRange2Select = false; this.RentRange3Select = false; this.RentRange4Select = true; this.RentRange5Select = false; this.RentRange6Select = false; }
  }
  RentRange5click() {
    if (this.RentRange5Select === true) { this.maxbudget_IDPK = ''; this.minbudget_IDPK = ''; this.RentRange5Select = false; }
    else { this.maxbudget_IDPK = '50000'; this.minbudget_IDPK = '30000'; this.RentRange1Select = false; this.RentRange2Select = false; this.RentRange3Select = false; this.RentRange4Select = false; this.RentRange5Select = true; this.RentRange6Select = false; }
  }
  RentRange6click() {
    if (this.RentRange6Select === true) { this.maxbudget_IDPK = ''; this.minbudget_IDPK = ''; this.RentRange6Select = false; }
    else { this.maxbudget_IDPK = ''; this.minbudget_IDPK = '50000'; this.RentRange1Select = false; this.RentRange2Select = false; this.RentRange3Select = false; this.RentRange4Select = false; this.RentRange5Select = false; this.RentRange6Select = true; }
  }

  changeFurnishestype() {
    if (this.Furnish == true) { this.FurnishType = ''; this.Furnish = false; }
    else { this.FurnishType = '1'; this.Furnish = true; this.SemiFurnish = false; this.unFurnish = false; }
  }
  changeSemiFurnishestype() {
    if (this.SemiFurnish == true) { this.FurnishType = ''; this.SemiFurnish = false; }
    else { this.FurnishType = '2'; this.SemiFurnish = true; this.Furnish = false; this.unFurnish = false; }
  }
  changeunFurnishestype() {
    if (this.unFurnish == true) { this.FurnishType = ''; this.unFurnish = false; }
    else { this.FurnishType = '3'; this.unFurnish = true; this.SemiFurnish = false; this.Furnish = false; }
  }

  // getfilterdatalist() {
  //   this.Service.getrentfilterslist().subscribe(list => {
  //     this.bhklist = list['Bhks'];
  //     this.balconylist = list['Balcony'];
  //     this.bathroomlist = list['Bathroom'];
  //     this.furnishlist = list['Furnish'];
  //     this.Tenantslist = list['Tenants'];
  //     this.Ownershiplist = list['Ownership'];
  //     this.Propertytypelist = list['Propertytype'];
  //     this.Doorfacelist = list['Doorface'];
  //     this.Amenitieslist = list['Amenities'];
  //   });
  // }

  toggleSelection(chip: MatChipOption, option: any) { chip.selected = !chip.selected; }
  changeSelected($event: MatChipSelectionChange, option: any) {
    if ($event.selected === true) { this.bhkarray.push(option.id); }
    else { for (var i = 0; i < this.bhkarray.length; i++) { if (this.bhkarray[i] === option.id) { this.bhkarray.splice(i, 1); } } }
  }
  toggleSelectionbathroom(chip: MatChipOption, option: any) { chip.selected = !chip.selected; }
  changeSelectedbathroom($event: MatChipSelectionChange, option: any) {
    if ($event.selected === true) { this.bathroomarray.push(option.id); }
    else { for (var i = 0; i < this.bathroomarray.length; i++) { if (this.bathroomarray[i] === option.id) { this.bathroomarray.splice(i, 1); } } }
  }
  toggleSelectionbalcony(chip: MatChipOption, option: any) { chip.selected = !chip.selected; }
  changeSelectedbalcony($event: MatChipSelectionChange, option: any) {
    if ($event.selected === true) { this.balconyarray.push(option.id); }
    else { for (var i = 0; i < this.balconyarray.length; i++) { if (this.balconyarray[i] === option.id) { this.balconyarray.splice(i, 1); } } }
  }
  changeSelectedtenants($event: MatChipSelectionChange, option: any) {
    if ($event.selected === true) { this.TenantType = option.id; } else { this.TenantType = ''; }
  }
  toggleSelectionFurnishedtype(chip: MatChipOption, option: any) { chip.selected = !chip.selected; }
  changeSelectedownership($event: MatChipSelectionChange, option: any) {
    if ($event.selected === true) { this.postedBy = option.id; } else { this.postedBy = ''; }
  }
  toggleSelectionpostedtype(chip: MatChipOption, option: any) { chip.selected = !chip.selected; }
  toggleSelectionpropertytype(chip: MatChipOption, option: any) { chip.selected = !chip.selected; }
  changeSelectedpropertytype($event: MatChipSelectionChange, option: any) {
    if ($event.selected === true) { this.projecttype.push(option.id); }
    else { for (var i = 0; i < this.projecttype.length; i++) { if (this.projecttype[i] === option.id) { this.projecttype.splice(i, 1); } } }
  }
  toggleSelectiondoorface(chip: MatChipOption, option: any) { chip.selected = !chip.selected; }
  changeSelecteddoorface($event: MatChipSelectionChange, option: any) {
    if ($event.selected === true) { this.doorfacings.push(option.id); }
    else { for (var i = 0; i < this.doorfacings.length; i++) { if (this.doorfacings[i] === option.id) { this.doorfacings.splice(i, 1); } } }
  }
  toggleSelectionapproval(chip: MatChipOption, option: any) { chip.selected = !chip.selected; }
  changeSelectedapproval($event: MatChipSelectionChange, option: any) {
    if ($event.selected === true) { this.approvals.push(option.id); }
    else { for (var i = 0; i < this.approvals.length; i++) { if (this.approvals[i] === option.id) { this.approvals.splice(i, 1); } } }
  }

  numberLogIn = true;
  otpValidating = false;

  otpsend() {
    if ($('#uname').val() == '') {
      $('#uname').focus().css('border-bottom', '1px solid red').attr('placeholder', 'Please Enter Name'); return false;
    } else {
      var enameFilter = /^([a-zA-Z]+\s)*[a-zA-Z]+$/;
      if (enameFilter.test($('#uname').val())) { $('#uname').removeAttr('style'); }
      else { $('#uname').focus().css('border-bottom', '1px solid red').attr('placeholder', 'Please enter valid name').val(''); return false; }
    }
    if ($('#unumber').val() == '') {
      $('#unumber').focus().css('border-bottom', '1px solid red').attr('placeholder', 'Please Enter Phone Number'); return false;
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
  }

  countdownconfig = { leftTime: 60, demand: true };

  goback1() {
    $('.OtpDiv').css('display', 'none');
    $('.enqiery').css('display', 'block');
    this.numberLogIn = true;
    // this.countdownconfig = { leftTime: 60, demand: true };
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
    var param = this.enquiry;
    param.otp = otp;
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
      var liveotpcount = $('#otp').val().length;
      if (liveotpcount < otplength) {
        this.ngOtpInput().setValue('');
        const Swal = await this.getSwal();
        Swal.fire({ title: 'Please enter the valid OTP!', icon: 'warning', showConfirmButton: false, timer: 1500 });
        return false;
      }
    }
    this.otploader = true;
    var param = this.enquiry;
    this.Service.otpvalidcheck(param).subscribe(async (success) => {
      var status = success['status'];
      if (status == 'True') {
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
    });
  }

  otpHandle() {
    var param = this.enquiry;
    this.Filter.name = param.name;
    this.Filter.number = param.number;
    this.Filter.email = param.email;
    this.Service.otpsend(param).subscribe(async (success: { messages: any }) => {
      var status = success.messages[0].status;
      if (status == 'ENQUEUED') {
        this.numberLogIn = false;
        this.otpValidating = true;
        this.otploader = false;
        $('.enqiery').css('display', 'none');
        $('.OtpDiv').css('display', 'block');
        $('.countdown_maindiv').css('display', 'block');
        $('.otpexpireclass').css('display', 'none');
        this.countdown4().begin();
        this.ngOtpInput().setValue('');
      } else {
        const Swal = await this.getSwal();
        Swal.fire({ title: 'Oops Something Error!', icon: 'error', showConfirmButton: false, timer: 1500 });
      }
    });
  }

  otpexpired = false;
  userDetails = [];
  UserName: any;
  UserId: any;
  UserEmail: any;
  UserNumber: any;

  config = {
    allowNumbersOnly: true,
    length: 4,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: { 'width': '50px', 'height': '50px' }
  };

  otpBasedLogin1() {
    const paramNum = { number: this.enquiry.number };
    this.countdownconfig = { leftTime: 60, demand: true };
    this.ngOtpInput().setValue('');
    this.otploader = true;
    this.Service.otpsend(paramNum).subscribe(async (success: { messages: any }) => {
      var status = success.messages[0].status;
      if (status == 'ENQUEUED') {
        $('.countdown_maindiv').css('display', 'block');
        $('.otpexpireclass').css('display', 'none');
        this.countdown4().begin();
        this.otploader = false;
      } else {
        const Swal = await this.getSwal();
        Swal.fire({ title: 'Oops Something Error!', icon: 'error', showConfirmButton: false, timer: 1500 });
      }
    }, (err) => { console.log('Connection Failed'); });
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
    var param = this.enquiry;
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
    var param = this.enquiry;
    this.Service.pgenq(param, pageorgin, cityid, browser).subscribe(async success => {
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

  // @ViewChildren(MatChip) chips!: QueryList<MatChip>;
  @ViewChildren(MatChipOption) chips!: QueryList<MatChipOption>;

  registerForm: FormGroup;
  filterShowHide: boolean = false;

  onresize() {
    if (window.innerWidth <= 360) {
      this.Tenant = 'TENANT TYPE';
      this.availability_text = 'AVAILABILITY';
    } else {
      this.Tenant = 'PREFERRED TENANT';
      this.availability_text = 'AVAILABLE FROM';
    }
    this.registerForm = this.fb.group({ locality: [''] });
    this.dropdownSettingsMobile = {
      singleSelection: false,
      idField: 'locality_IDPK',
      textField: 'locality_name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      limitSelection: 3
    };
    var width = this.window.innerWidth;
    if (width < 1080) { this.filterShowHide = true; } else { this.filterShowHide = false; }
  }

  onReset() {
    this.chips.forEach(chip => chip.deselect());
    this.localityData = [];
    this.locality = [];
    this.balconyarray = [];
    this.FurnishType = [];
    this.postedBy = [];
    this.projecttype = [];
    this.doorfacings = [];
    this.approvals = [];
    this.amenities = [];
    this.bhkarray = [];
    this.maxbudget_IDPK = [];
    this.minbudget_IDPK = [];
    this.RentRange1Select = false; this.RentRange2Select = false; this.RentRange3Select = false;
    this.RentRange4Select = false; this.RentRange5Select = false; this.RentRange6Select = false;
    this.Furnish = false; this.SemiFurnish = false; this.unFurnish = false;
    this.ImmediateSelect = false; this.Within15DaysSelect = false; this.Within30DaysSelect = false; this.After30DaysSelect = false;
    this.GetRentalList();
  }

  transitionEnd(event: any) {
    var dv = document.getElementById('floatinglink');
    var dvStyle = dv.getAttribute('style');
    if (dvStyle?.indexOf('translateX(-584%)') > -1) {
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
    if (this.observer) { this.observer.disconnect(); }
    if (this.clickListener) { this.clickListener(); }
  }

  SelectedPropName: any;

  propertyNameClick(PropertyName, RegionID, localityid, PropertyID) {
    this.SelectedPropName = PropertyName;
    this.Filter.PropertyName = PropertyName;
    this.Filter.RegionID = RegionID;
    this.Filter.localityid = localityid;
    this.Filter.propid = PropertyID;
    $('#otpValidate').css('display', 'block');
  }

  onSelectionChange() { }

  submitFormReport() {
    var usernumber = localStorage?.getItem('userNumber');
    var userName = localStorage?.getItem('userName');
    var loginId = localStorage?.getItem('loginID');
    if (loginId === '1') {
      this.otploader = true;
      var param = {
        report_IDFK: this.selectedOption.IDPK,
        report_name: this.selectedOption.report_types,
        username: userName,
        usernumber: usernumber,
      };
      this.Service.submitOption(param).subscribe(async (responce) => {
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
        // import('../otp-validation/otp-validation.module').then(mod => mod.OtpValidationModule).then(otpValidationComponent => {
        //   this.otpValidationComponent = otpValidationComponent.components['lazy'];
        // });
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



  activeDrop: string | null = null;

  // View More States (for the internal "View More" buttons)
  showMoreLux: boolean = false;
  showMoreAff: boolean = false;





  toggleDrop(index: number, key: string): void {
    const combinedKey = key + index;

    // If clicking the same one, close it. Otherwise, open the new one.
    if (this.activeDrop === combinedKey) {
      this.activeDrop = null;
    } else {
      this.activeDrop = combinedKey;
    }

    // Reset the "View More" buttons when switching categories for a clean UI
    this.showMoreLux = false;
    this.showMoreAff = false;
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
        this.eliteView = true;
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