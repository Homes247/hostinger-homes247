import { CommonModule, isPlatformBrowser, Location } from '@angular/common';
import { AfterViewInit, Component, DOCUMENT, ElementRef, HostListener, Inject, OnDestroy, OnInit, PLATFORM_ID, QueryList, Renderer2, viewChild, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatChipOption, MatChipsModule, MatChipSelectionChange } from '@angular/material/chips';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CountdownComponent, CountdownEvent } from "ngx-countdown";
import { Observable, Subscription } from 'rxjs';
import { CityService } from '../city.service';
import { DataService } from '../data.service';
import { FilterService } from '../filter.service';
import { Enquiry } from '../home/home';
import { SafeStorageService } from '../safe-storage.service';
import { cleanUrlPipe, customPriceFormatPipe } from '../mainpipe-pipe';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
// import { InnerHeader } from '../inner-header/inner-header';
// Swal lazy-loaded
import { NgOtpInputModule } from 'ng-otp-input';
import { InnerHeadderWithSidenav } from '../inner-headder-with-sidenav/inner-headder-with-sidenav';
import { ElitedataService } from '../elitedata.service';
import { AdCardsComponent } from "../ad-cards/ad-cards.component";

declare var swal: any;
declare var $: any;



@Component({
  selector: 'app-rent-locality-listing',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatChipsModule,
    cleanUrlPipe,
    customPriceFormatPipe,
    InnerHeadderWithSidenav, NgxSkeletonLoaderModule,
    NgOtpInputModule,
    CountdownComponent,
    AdCardsComponent
],
  templateUrl: './rent-locality-listing.html',
  styleUrl: './rent-locality-listing.css',
})
export class RentLocalityListing implements OnInit, AfterViewInit, OnDestroy {
  math = Math;
  @ViewChild('scrollAnchor', { static: false }) scrollAnchor!: ElementRef;
  readonly countdown4 = viewChild<CountdownComponent>('cd4');
  readonly ngOtpInput = viewChild<any>('ngOtpInput');
  @ViewChild('cancel') cancel!: ElementRef;
  user = new Enquiry();
  public n: number = 1;
  citiess: any;
  cityid: any;
  selected: any;
  currentCity: any;
  changeText!: boolean;

  filter: boolean = false;
  filterLoader: boolean = false;
  myControl = new FormControl();
  options: any;
  filteredOptions!: Observable<any>;
  locationSelectedId = '1';
  searchstring: any;
  blogs: any;
  blogsloader: boolean = true;
  showloader = false;
  offers: any;
  FooterComponent: any;
  IsVisibleFilter!: boolean;
  IsVisibleEnquery = false;
  plotSelect!: boolean;
  projecttype: any = [];
  Availability: any = [];
  FurnishType: any;
  RentRange: any = [];
  TenantType: any;
  BhkRange: any = [];
  postedBy: any;
  bhkarray: any = []
  balconyarray: any = []
  doorfacings: any = []
  approvals: any = []
  amenities: any = []
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
  ThreeBHKSelect!: boolean;
  TwoBHKSelect: any;
  OneBHKSelect: boolean = false;
  OneRKSelect: boolean = false;
  AgentSelect: any;
  OwnerSelect: any;
  static citycount: number;
  private routeSub!: Subscription;
  proptypeurlparam: any;
  property_typeId: any;
  // citybreadcrump: any;
  cityapi: any;
  noOfBedrooms: any;
  locality: any;
  statusId: any;
  projectcount: any;
  propertiescount: any;
  propertylists: any = [];
  propertylists1: any = [];
  propertylists2: any = [];
  propertylists3: any = [];
  propertylists4: any = [];
  propertylists5: any = [];
  propertylists6: any = [];
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
  bathroomarray: any = [];
  listarraylength: any;
  localityData: any = [];
  dropdownSettingsMobile = {};
  localitys: any;
  todaydate!: string;
  futuredate!: string;
  otploader: boolean = true;
  propbhk: any;
  proptype: any;
  propname: any;
  proparea: any;
  propareatype: any;
  propertyenquire!: string;
  cityId!: string;
  city!: string;
  projectcount_city: any;
  Tenant!: string;
  storagearr: number[] = [];
  availability_text!: string;
  localityName: any;
  Locality_Seo: any;
  zeroprojects = false
  localityid: any;
  propertyId: any;
  UserId: any;
  userRentalFavList: any = [];
  propertyIds: any = [];
  projectcommercialcount: any;
  PGprojectcount: any;
  Matautocomplete: any;



  constructor(
    private activeroute: ActivatedRoute,
    private router: Router,
    private _location: Location,
    public cityservice: CityService,
        private eliteService: ElitedataService,
    
    public Service: DataService, private titleService: Title, private meta: Meta,
    private fb: FormBuilder,
    private Filter: FilterService,
    private renderer: Renderer2, private elRef: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object,
    private storage: SafeStorageService,
    @Inject(DOCUMENT) private doc,
  ) {
    this.window = this.doc.defaultView!;
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    this.router.events.subscribe((evt) => {
      // trick the Router into believing it's last link wasn't previously loaded
      this.router.navigated = false;
      // if you need to scroll back to top, here is the right place
      this.window.scrollTo(0, 0);
    });

    if (this.window.innerWidth <= 340) {
      this.Tenant = "TENANT TYPE";
      this.availability_text = "AVAILABILITY"
    } else {
      this.Tenant = "PREFERRED TENANT";
      this.availability_text = "AVAILABLE FROM";

    }
  }
  window!: Window;
  loginidNew: any

    login: boolean = false
  userId: any
  userNumber: any
  contactedList: any


  ngOnInit() {
    this.buildConfigs();
    var localityid = this.router.url.split('-').pop()!.match(/[0-9]+/) as any;
    this.localityid = localityid;
    var param11 = {
      locid: localityid,
    };
    this.Service.getlocalitymeta('', param11).subscribe((metatag: any) => {
      let metatags = metatag['Localityseo'];
      var localityName = metatags[0].LocalityName;
      const Locality_Seo = localityName.toLowerCase().replace(/\s+/g, '-');
      this.localityName = Locality_Seo;
      this.Locality_Seo = localityName;
      this.GetRentalList();
    });


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
  }

  coverimage: any = 'https://img.homes247.in/images/rentals/cover/';

  // dataloads() {
  //   this.coverimage = this.Service.RentCoverImage;
  // }


  GetRentalList() {
    RentLocalityListing.citycount = -4;
    this.showloader = true;
    this.routeSub = this.activeroute.params.subscribe(params => {
      var url = params['flats-for-rent-in-:localityname-:cityname-:id'];
      var localityid = url.split('-').pop().match(/[0-9]+/);
      this.localityData = localityid;
      var value = this.cityservice.cityfinder(this.router.url);
      this.currentCity = value.cityname;
      this.city = value.cityname.toLowerCase();
      var cityname = value.cityname.toLowerCase().replace(/\s+/g, '-');
      this.projecttype = []

      const propertyTypesMap: { [key: string]: string } = {
        'house': '',
        'flats': '1',
        'villas': '2',
        'plots': '3',
        'independent-house': '4'
      };

      const propertyTypesMap1: { [key: string]: string } = {
        'flats': '1',
        'villas': '2'
      };

      const Furnishing_Type: { [key: string]: string } = {
        'semi-furnished': '1',
        'furnished': '2',
        'unfurnished': '3'
      };

      const bhkMap: { [key: string]: string } = {
        '1-rk': '3550',
        '1-bhk': '3551',
        '2-bhk': '3552',
        '3-bhk': '3553',
        '4-bhk': '3554',
        '5-bhk': '3555'
      };

      const budgetRanges = [
        { urlPart: '-price-under-10000', min: '1000', max: '10000' },
        { urlPart: '-price-10000-to-20000', min: '10000', max: '20000' },
        { urlPart: '-price-20000-to-30000', min: '20000', max: '30000' },
        { urlPart: '-price-30000-to-40000', min: '30000', max: '40000' },
        { urlPart: '-price-40000-to-50000', min: '40000', max: '50000' },
        { urlPart: '-price-above-50000', min: '50000', max: '1500000' }
      ];
      let isValidUrl = false;

      Object.keys(propertyTypesMap).forEach(type => {
        if (this.router.url.split('?')[0] === `/rental/${type}-for-rent-in-${this.localityName}-${cityname}-${localityid}`) {
          this.projecttype = [propertyTypesMap[type]];
          isValidUrl = true;
        } else {
          budgetRanges.forEach(range => {
            if (this.router.url.split('?')[0] === `/rental/${type}-for-rent-in-${this.localityName}-${cityname}${range.urlPart}-${localityid}`) {
              this.projecttype = [propertyTypesMap[type]];
              this.minbudget_IDPK = range.min;
              this.maxbudget_IDPK = range.max;
              isValidUrl = true;
            }
          });
        }
      });

      Object.keys(propertyTypesMap1).forEach(type => {
        Object.keys(bhkMap).forEach(bhk => {
          const bhkUrl = `/rental/${bhk}-${type}-for-rent-in-${this.localityName}-${cityname}-${localityid}`;
          if (this.router.url.split('?')[0] === bhkUrl) {
            this.projecttype = [propertyTypesMap1[type]];
            this.bhkarray = [bhkMap[bhk]];
            isValidUrl = true;
          }
        });
      });

      Object.keys(propertyTypesMap1).forEach(type => {
        Object.keys(Furnishing_Type).forEach(furtype => {
          const bhkUrl = `/rental/${furtype}-${type}-for-rent-in-${this.localityName}-${cityname}-${localityid}`;
          if (this.router.url.split('?')[0] === bhkUrl) {
            this.projecttype = [propertyTypesMap1[type]];
            this.FurnishType = [Furnishing_Type[furtype]];
            isValidUrl = true;
          }
        });
      });

      Object.keys(propertyTypesMap).forEach(type => {
        const Url = `/rental/no-brokerage-${type}-for-rent-in-${this.localityName}-${cityname}-${localityid}`;
        const Url2 = `/rental/${type}-for-rent-from-owners-in-${this.localityName}-${cityname}-${localityid}`;
        if (this.router.url.split('?')[0] === Url) {
          this.projecttype = [propertyTypesMap[type]];
          this.postedBy = '654825';
          isValidUrl = true;
        } else if (this.router.url.split('?')[0] === Url2) {
          this.projecttype = [propertyTypesMap[type]];
          this.postedBy = '654825';
          isValidUrl = true;
        }
      });

      const currentUrl = this.router.url;
      if (currentUrl.includes('?furnish')) {
        isValidUrl = true;
      } else if (currentUrl.includes('?tenants')) {
        isValidUrl = true;
      } else if (currentUrl.includes('?utm_source')) {
        isValidUrl = true;
      }
      if (!isValidUrl) {
        this.router.navigate(['/404'], { skipLocationChange: true });
      }

      var limit = 0;
      var limitrows = 2;
      var proptypeid = this.projecttype;
      var bedroom = this.bhkarray;
      var min = this.minbudget_IDPK;
      var max = this.maxbudget_IDPK;
      var loc = this.localityData;
      var balcony = this.balconyarray;
      var Furnish = this.FurnishType;
      var Tenant = this.TenantType;
      var posted = this.postedBy;
      var doorfacing = this.doorfacings;
      var approvals = this.approvals;
      var amenities = this.amenities;
      var availability = this.Availability;
      var bathroom = this.bathroomarray;
      var fromdate = this.todaydate
      var todate = this.futuredate
      // this.enquiryId = this.storage?.getItem("userID");
      var param = {
        limit: limit,
        limitrows: limitrows,
        proptypeid: proptypeid,
        bedroom: bedroom,
        minprice: min,
        maxprice: max,
        locality: loc,
        balcony: balcony,
        furnish: Furnish,
        ownership: posted,
        doorface: doorfacing,
        bathroom: bathroom,
        tenant: Tenant,
        fromdate: fromdate,
        todate: todate,
        sort: this.selectedSortValue,
      }
      this.otploader = true;

      this.Service.getRentprojectscount(this.city, param).subscribe(countprojects => {
        let projectcount = countprojects['Counts'];
        this.projectcount = projectcount[0].PropertyCounts;
        this.showloader = true;
        if (this.projectcount <= 0) {
          this.showloader = false;
          this.zeroprojects = true;
        }
      })
      this.Service.getrentalList(this.city, param).subscribe((lists: any) => {
        this.otploader = true;

        if (lists['status'] === 'True') {
          this.propertylists = lists['listings'];
          this.otploader = false;
          this.propertylists.slice(0, 4).forEach((item: any) => {
            if (item.Coverimage) {

              const link = this.doc.createElement('link');
              link.rel = 'preload';
              link.as = 'image';

              link.href =
                this.coverimage + item.Coverimage + '?width=272&height=160';

              link.setAttribute('fetchpriority', 'high');

              this.doc.head.appendChild(link);
            }
          });

          if (this.propertylists.length === 0) {
            this.zeroprojects = true;
          } else {
            this.zeroprojects = false;
          }

        } else {
          this.propertylists = [];
          this.zeroprojects = true;
          this.showloader = false;
        }

      });



      this.updateSelectedChips();

    });




    const userId = this.storage?.getItem('userID');
    if (userId) {
      this.UserId = this.storage?.getItem('userID');

      if ('rentalPropertyID' in this.storage) {
        // this.userFavListLocalStorage = JSON.parse(this.storage?.getItem('rentalPropertyID'));

      } else {
        this.storage.setItem('rentalPropertyID', '[]');
        // this.userFavListLocalStorage = JSON.parse(this.storage?.getItem('rentalPropertyID'));
      }

      this.Service.getUserWishListByIdTest(this.UserId, 3).subscribe(userFavList => {
        this.userRentalFavList = userFavList['favouritelist'];
        this.propertyIds = this.userRentalFavList.map((item: any) => item.propertyId) || [];



      });



    } else {
      if ('rentalPropertyID' in this.storage) {
        this.storagearr = JSON.parse(this.storage?.getItem('rentalPropertyID'));
      } else {
        this.storage.setItem('rentalPropertyID', '[]');
        this.storagearr = JSON.parse(this.storage?.getItem('rentalPropertyID'));
      }
    }
  }


  propertyCountFunction() {
    var paramInd = {};

    this.Service.getindividualprojectscount(this.city, paramInd).subscribe(projectcounts => {
      let projectcount = projectcounts['Counts'];

      this.propertiescount = projectcount[0].PropertyCounts;
    });

    this.Service.getprojectscount(this.city, paramInd).subscribe((projectcount: any) => {
      this.projectcount_city = projectcount['Counts'][0].PropertyCounts;
    });

    this.Service.commercialSalePropertiesCount(this.city, paramInd).subscribe(countprojects => {
      let projectcount = countprojects['Counts'];
      this.projectcommercialcount = projectcount[0].PropertyCounts;
    })
    this.Service.PGRentCount(this.city, paramInd).subscribe(countprojects => {
      let projectcount = countprojects['Counts'];
      this.PGprojectcount = projectcount[0].PropertyCounts;
    })
  }

  onScrollOnce: boolean = true
  Mousemovement: boolean = false
  // @HostListener('window:scroll', [])
  @HostListener('touchstart', [])
  onWindowScroll() {

    if (this.onScrollOnce) {
      this.Mousemovement = true
      this.coverimage = this.Service.RentCoverImage;
    }
  }

  shareContent(data: any) {
    if ((this.window.navigator as any).share) {
      if (data.propertyype != 'Plot') {
        (this.window.navigator as any)
          .share({
            title: "Homes247.in",
            text: 'Check out this amazing Property!',
            url: 'https://www.homes247.in/rentals/' + data.BHK.toLowerCase().replace(/\s+/g, '-') + '-' + data.PropertyType.toLowerCase().replace(/\s+/g, '-') + '-for-rent-in-' + data.Locality.toLowerCase().replace(/\s+/g, '-') + '-' + data.City.toLowerCase().replace(/\s+/g, '-') + '-at-' + data.PropertyName.toLowerCase().replace(/\s+/g, '-') + '-' + data.PropertyID, // Your URL here
          })
          .then(() => console.log('Shared Successfully'))
          .catch((error: any) => console.error('Error sharing:', error));

      } else {
        (this.window.navigator as any)
          .share({
            title: "Homes247.in",
            text: 'Check out this amazing Property!',
            url: 'https://www.homes247.in/rentals/' + data.PropertyArea.toLowerCase().replace(/\s+/g, '-') + 'acres-' + data.PropertyType.toLowerCase().replace(/\s+/g, '-') + '-for-rent-in-' + data.Locality.toLowerCase().replace(/\s+/g, '-') + '-' + data.City.toLowerCase().replace(/\s+/g, '-') + '-at-' + data.PropertyName.toLowerCase().replace(/\s+/g, '-') + '-' + data.PropertyID, // Your URL here
          })
          .then(() => console.log('Shared Successfully'))
          .catch((error: any) => console.error('Error sharing:', error));
      }

    } else {

    }
  }
  updateSelectedChips(): void {
    this.projecttype.forEach((option: any) => {
      if (option && typeof option === 'object') {
        option.selected = this.projecttype.includes(option.id);
      }
    })
  }

  isInWishlist(propertyID: number): boolean {
    const userId = this.storage?.getItem('userID');
    if (userId) {
      this.storagearr = this.propertyIds
      // this.storagearr.push(this.userFavListLocalStorage);
      return this.storagearr.includes(propertyID);

    } else {

      return this.storagearr.includes(propertyID);
    }
  }


  Heart_Transtion(propertyID: number) {
    const index = this.storagearr?.indexOf(propertyID);
    var loginID = this.storage?.getItem('loginID')
    if (index !== -1) {
      this.storagearr.splice(index, 1);
      if (loginID == '1') {
        const userid = this.storage?.getItem('userID');
        var param = {
          userid: userid,
          propid: propertyID,
          CatagoryId: 3
        };
        this.Service.removeFavaourite(param).subscribe(response => {
        });
      }
    }
    else {
      this.storagearr.push(propertyID);
      if (loginID == '1') {
        const userid = this.storage?.getItem('userID');
        var param = {
          userid: userid,
          propid: propertyID,
          CatagoryId: 3
        };
        this.Service.addfavaourite(param).subscribe(response => {
        });
      }
    }
    this.storage.setItem('rentalPropertyID', JSON.stringify(this.storagearr));
  }

  getlocality() {
    var value = this.cityservice.cityfinder(this.router.url);
    this.currentCity = value.cityname;
    this.cityId = value.cityid;
    var regionid = ''
    var paramss = {
      cityId: this.cityId,
      regionid: regionid
    };
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


  private observer: IntersectionObserver | null = null;

  ngAfterViewInit() {
    this.initIntersectionObserver();
    this.getlocality();
    this.onresize();
    import('../mat-autocomplete-new/mat-autocomplete-new')
      .then(c => {
        this.Matautocomplete = c.MatAutocompleteNew;
      });
    // this.FilterTransition();
    this.activeroute.queryParamMap.subscribe((params: any) => {
      this.FurnishType = params['params']['furnish'];
      this.TenantType = params['params']['tenants'];
      this.postedBy = params['params']['postedby'];
      this.futuredate = params['params']['available'];
      this.minbudget_IDPK = params['params']['min'];
      this.maxbudget_IDPK = params['params']['max'];
      var noOfBedrooms = params['params']['bed'];
      if (noOfBedrooms === '1') {
        this.bhkarray = ['3551'];
      } else if (noOfBedrooms === '2') {
        this.bhkarray = ['3552'];
      } else if (noOfBedrooms === '3') {
        this.bhkarray = ['3553'];
      } else if (noOfBedrooms === '4') {
        this.bhkarray = ['3554'];
      }
    });


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
    if (isPlatformBrowser(this.platformId)) {
      const preloadLink = document.createElement('link');
      preloadLink.rel = 'preload';
      preloadLink.as = 'image';
      preloadLink.href = 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_mobile_3/assets/icons/bar.svg';
      // 👇 This is correct for priority loading
      preloadLink.setAttribute('fetchpriority', 'high');
      const head = document.head;
      if (head.firstChild) {
        head.insertBefore(preloadLink, head.firstChild);
      } else {
        head.appendChild(preloadLink);
      }
    }

    $('.head_sticky').css('padding-bottom', '56px');


    setTimeout(() => {
      this.propertyCountFunction()
    }, 500);
  }

  // ngOnDestroy() {

  // }

  private initIntersectionObserver() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.loadMore();
        }
      });
    });

    if (this.scrollAnchor) {
      this.observer.observe(this.scrollAnchor.nativeElement);
    }
  }
  selectedSortValue: number | null = null;
  onSortChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.selectedSortValue = +value; // Convert string to number and store
    // 
    this.GetRentalList();
  }

  sortShowHide!: boolean;

  ShowHideSort() {
    this.sortShowHide = this.sortShowHide ? false : true;

  }

  loadMore() {
    this.showloader = true;
    this.routeSub = this.activeroute.params.subscribe(params => {
      var url = params['flats-for-rent-in-:localityname-:cityname-:id'];
      var localityid = this.router.url.split('-').pop()!.match(/[0-9]+/) as any;
      this.localityData = localityid
      let totalcount = this.projectcount;
      const limit = RentLocalityListing.citycount += 4;
      var limitrows = '4';
      var proptypeid = this.projecttype;
      var bedroom = this.bhkarray;
      var min = this.minbudget_IDPK;
      var max = this.maxbudget_IDPK;
      var loc = this.localityData;
      var balcony = this.balconyarray;
      var Furnish = this.FurnishType;
      var Tenant = this.TenantType;
      var posted = this.postedBy;
      var doorfacing = this.doorfacings;
      var approvals = this.approvals;
      var amenities = this.amenities;
      var availability = this.Availability;
      var bathroom = this.bathroomarray;

      var fromdate = this.todaydate
      var todate = this.futuredate
      // this.enquiryId = this.storage?.getItem("userID");
      var param = {
        limit: limit,
        limitrows: limitrows,
        proptypeid: proptypeid,
        bedroom: bedroom,
        minprice: min,
        maxprice: max,
        locality: loc,
        balcony: balcony,
        furnish: Furnish,
        ownership: posted,
        doorface: doorfacing,
        bathroom: bathroom,
        tenant: Tenant,
        fromdate: fromdate,
        todate: todate,
        sort: this.selectedSortValue,
        // amenties : amenities,
        // userId: this.enquiryId,
      }

      let livecount = this.propertylists?.length || 0;
      if (livecount < totalcount) {
        if (isPlatformBrowser(this.platformId)) {
          $('.search-results').css('padding-bottom', '88px');
        }
        return this.Service.getrentalList(this.city, param).subscribe(propertylists => {
          var status = propertylists['status'];
          if (status == "False") {
            this.showloader = false;
            if (isPlatformBrowser(this.platformId)) {
              $('.search-results').css('padding-bottom', '88px');
            }
          } else {
            this.propertylists = this.propertylists.concat(propertylists['listings']);
          }
        });
      } else {
        this.showloader = false;
      }
    });
  }



  //  filter function
  ShowHideFilter() {
    this.Service.mouseenterservice5();
    setTimeout(() => {
      if ($('#FirstCityModal').hasClass('show') || $('#filterModal').hasClass('show') || $('#SecondCityModal').hasClass('show')) {
        $('.head_stick').css('display', 'none');
      } else {
        $('.head_stick').css('display', 'block'); // Show again when no modal is open
      }
    }, 300);

    window.scroll(0, 0);

  }




  checkBox: boolean = false;
  contactButton: boolean = false;
  RequestButton: boolean = false;
  resquestImages: boolean = false;
  resquestCall: boolean = false;

  propUserIDFK: any;
  Homes247NewBlackLogo: boolean = false

  ShowHideEnquery(bhk: any, proptype: any, propname: any, data: any) {
    this.Homes247NewBlackLogo = true

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
    // this.enquiry.otp = '';

    this.resquestImages = true;
    this.RequestButton = true;

    this.checkBox = false;
    this.contactButton = false;
    this.resquestCall = false;
    this.checkBox = false

  }
  goBackFromEnq() {
    this.IsVisibleEnquery = this.IsVisibleEnquery ? false : true;
  }



  numberLogIn = true;
  otpValidating = false;
  enquiry = new Enquiry();


  otpsend() {
    if ($('#uname').val() == "") {
      $('#uname').focus().css("border-color", "red").attr('placeholder', 'Please Enter Name');
      return false;
    }
    else {
      var enameFilter = /^([a-zA-Z]+\s)*[a-zA-Z]+$/;
      if (enameFilter.test($('#uname').val())) {
        $('#uname').removeAttr("style");
      }
      else {
        $('#uname').focus().css("border-color", "red").attr('placeholder', 'Please enter valid name').val('');
        return false;
      }
    }

    if ($('#uemail').val() === '') {
      // $('#uemail').focus().css('border-color', 'red').attr('placeholder', 'Please Enter Email-id');
      // return false;
    } else {
      var emai = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
      if (emai.test($('#uemail').val())) {
        $('#uemail').removeAttr('style');
      } else {
        $('#uemail').focus().css('border-color', 'red').attr('placeholder', 'Please enter valid email-id').val('');
        return false;
      }
    }

    if ($('#unumber').val() == "") {
      $('#unumber').focus().css("border-color", "red").attr('placeholder', 'Please Enter Phone Number');
      return false;
    }
    else {
      var mobilee = /^[0-9]{10}$/;
      if (mobilee.test($('#unumber').val())) {
        $('#unumber').removeAttr("style");
      }
      else {
        $('#unumber').focus().css("border-color", "red").attr('placeholder', 'Please enter valid contact number').val('');
        return false;
      }
    }

    this.otploader = true;
    this.SubmitForm();
  }
  countdownconfig = {
    leftTime: 30,
    demand: true
  };
  goback1() {
    $('.OtpDiv').css('display', 'none');
    $('.enqiery').css('display', 'block');
    this.numberLogIn = true;

    // this.countdownconfig = {
    //   leftTime: 30,
    //   demand: true
    // };
    this.countdown4().restart();
    // this.countdown4.begin();
    this.otpValidating = false;

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
  clickCount = 0;
  otpBasedLogin1() {
    this.clickCount++;
    const paramNum = {
      number: this.enquiry.number
    }
    this.countdownconfig = {
      leftTime: 30,
      demand: true
    };
    this.ngOtpInput().setValue('');
    this.otploader = true;
    this.Service.otpsend(paramNum).subscribe(async (success: { messages: any }) => {
      var status = success.messages[0].status;
      if (status == 'ENQUEUED') {
        $('.countdown_maindiv').css('display', 'block');
        $('.otpexpireclass').css('display', 'none');
        this.countdown4().begin();
        this.otploader = false;
        // var buttonId = $('#one').attr('id');
        // $('#modal-container').removeAttr('class').addClass(buttonId);
        // $('body').addClass('modal-active');
        // $('body').removeClass('bodyoverlay');

      } else {
        const Swal = await this.getSwal();
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
      (err: any) => {

      });



  }
  private async getSwal() {
    const { default: Swal } = await import('sweetalert2');
    return Swal;
  }

  onOtpChange(otp: any) {
    var param = this.enquiry;
    param.otp = otp;
  }

  async otpvalidate4() {
    var otplength = 4;
    if ($('#otp').val() == '') {

      this.ngOtpInput().setValue('');
      const Swal = await this.getSwal();
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

        this.ngOtpInput().setValue('');
        const Swal = await this.getSwal();
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
    this.Service.otpvalidcheck(param).subscribe(async (success: any) => {
      var status = success['status'];
      if (status == 'True') {
        this.enquiry.verification = 2;
        this.SubmitForm();
        this.IsVisibleEnquery = false;

        //  this.otploader = false;
        this.countdown4().restart();
      } else {
        this.ngOtpInput().setValue('');
        this.otploader = false;
        const Swal = await this.getSwal();
        Swal.fire({
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
        // this.loader = false;

        // this.otpValidating = true;
        var buttonId = $('#one').attr('id');
      } else {
        const Swal = await this.getSwal();
        Swal.fire({
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
  ShowHideEnquery1(proparea: any, PropertyID: any, propname: any, data: any, PropertyType: any) {
    this.proparea = proparea;
    // this.propareatype = propareatype;
    this.proptype = PropertyType;
    this.propname = propname;
    this.propUserIDFK = data;
    this.propertyId = PropertyID

    this.IsVisibleEnquery = this.IsVisibleEnquery ? false : true;


    $('.form-field__input').removeAttr('style');
    // $('#uname').attr('placeholder', 'Username');
    // $('#uemail').attr('placeholder', 'Email');otploader
    // $('#unumber').attr('placeholder', '+91');


    this.enquiry.name = '';
    this.enquiry.number = '';
    this.enquiry.mail = '';
    // this.enquiry.otp = '';

    this.checkBox = true;
    this.contactButton = true;
    this.resquestCall = true;
    this.checkBox = true;


    this.resquestImages = false;
    this.RequestButton = false;

  }
  contactedRentalarr: any = [];

  SubmitForm() {
    this.otploader = true;

    var param = this.enquiry;
    const varient = 'varient';
    if (this.proptype !== 'Plot') {
      var propertyname = this.propname;
      this.propertyenquire = this.proparea + ' ' + this.proptype + '-' + propertyname;
    }
    if (this.proptype === 'Plot') {
      var propertyname = this.propname;
      this.propertyenquire = this.proparea + ' ' + this.proptype + '-' + propertyname;
    }
    this.enquiry.propertyid = this.propertyId;
    this.enquiry.localityId = this.localityid;
    this.Service.rentalsenq(param, this.propertyenquire, propertyname, this.propUserIDFK).subscribe(async (success: any) => {
      if (success['status'] === 'True') {
        this.otploader = false;
        if (success['code'] === "3") {
          this.otpHandle();
        } else {
          // this.cancel.nativeElement.click();
          $('body').removeClass('bodyoverlay');
          const Swal = await this.getSwal();
          Swal.fire({
            text: 'We Will Intimate you soon!',
            icon: 'success',
            showConfirmButton: false,
            timer: 2500
          });
          if ('contactedRentalPropId' in this.storage) {
            this.contactedRentalarr = JSON.parse(this.storage?.getItem('contactedRentalPropId') || '[]');
          } else {
            this.contactedRentalarr = [];
          }
          if (!this.contactedRentalarr.includes(this.propertyId)) {
            this.contactedRentalarr.push(this.propertyId);
            this.storage.setItem('contactedRentalPropId', JSON.stringify(this.contactedRentalarr));
          }
          $('#modal-container2').addClass('out');
          $('body').removeClass('modal-active');
          this.enquiry.name = '';
          this.enquiry.number = '';
          this.enquiry.mail = '';
          // this.enquiry.otp = '';
          $('#btn_reset2').click();
          $('#uname').attr('placeholder', '');
          $('#uemail').attr('placeholder', '');
          $('#unumber').attr('placeholder', '');
          this.IsVisibleEnquery = false
        }

      } else {
        const Swal = await this.getSwal();
        Swal.fire({
          icon: 'error',
          title: 'Something Went Wrong',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
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


  @ViewChildren(MatChipOption) chips!: QueryList<MatChipOption>;
  registerForm!: FormGroup;
  filterShowHide!: boolean;

  onresize() {

    this.registerForm = this.fb.group({
      locality: [''],
    });
    // this.cityzonelinks_types = false;
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
    if (width < 1080) {
      this.filterShowHide = true;
    } else {
      this.filterShowHide = false;
    }
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
    // this.possission = '';
    this.maxbudget_IDPK = [];
    this.minbudget_IDPK = [];
    // this.localityData = [];
    // this.statusid =[];
    this.RentRange1Select = false;
    this.RentRange2Select = false;
    this.RentRange3Select = false;
    this.RentRange4Select = false;
    this.RentRange5Select = false;
    this.RentRange6Select = false;
    this.Furnish = false;
    this.SemiFurnish = false;
    this.unFurnish = false;
    this.ImmediateSelect = false;
    this.Within15DaysSelect = false;
    this.Within30DaysSelect = false;
    this.After30DaysSelect = false;

    // this.RentRange6Select = false;

    // this.ReadyToMoveSelect=false;

    this.GetRentalList();

  }

  transitionEnd(event: any) {
    var dv: any = document.getElementById("floatinglink");
    var dvStyle = dv.getAttribute('style');
    if (dvStyle?.indexOf("translateX(-584%)") > -1) {
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

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
    // Clean up the click listener to avoid memory leaks
    if (this.clickListener) {
      this.clickListener();
    }
    if (this.observer) {
      this.observer.disconnect();
    }
  }



  // Pradeesh meta data

  metaDB_locality: any = {

    'flats': {
      h1: (city: string, locality: string) => `Flats for Rent in ${locality}, ${city}`,
      title: (city: string, locality: string) => `Checkout flats for rent in ${locality}, ${city} - Homes247`,
      desc: (city: string, locality: string) => `Find the best flats for rent in ${locality}, ${city}. Explore a wide range of affordable 1, 2, and 3 BHK apartments for rent with top amenities.`,
    },

    'villas': {
      h1: (city: string, locality: string) => `Villas for Rent in ${locality}, ${city}`,
      title: (city: string, locality: string) => `Checkout villas for rent in ${locality}, ${city} - Homes247`,
      desc: (city: string, locality: string) => `Explore the various types of villas for rent in ${locality}, ${city}. Discover luxurious and affordable villa options for your perfect stay. Browse listings and book today!`,
    },

    'house': {
      h1: (city: string, locality: string) => `House for Rent in ${locality}, ${city}`,
      title: (city: string, locality: string) => `Checkout house for rent in ${locality}, ${city} - Homes247`,
      desc: (city: string, locality: string) => `Find the best house for rent in ${locality}, ${city}. Explore a wide range of affordable 1, 2, and 3 BHK apartments for rent with top amenities.`,
    },

    'independent-house': {
      h1: (city: string, locality: string) => `Independent House for Rent in ${locality}, ${city}`,
      title: (city: string, locality: string) => `Checkout independent house for rent in ${locality}, ${city}`,
      desc: (city: string, locality: string) => `Find the best independent house for rent in ${locality}, ${city}. Explore a wide range of affordable 1, 2, and 3 BHK apartments for rent with top amenities.`,
    },

    'plots': {
      h1: (city: string, locality: string) => `Plots for Rent in ${locality}, ${city}`,
      title: (city: string, locality: string) => `Checkout plots for rent in ${locality}, ${city} - Homes247`,
      desc: (city: string, locality: string) => `Explore a wide range of land for rent in ${locality}, ${city} at Homes247.in. Find the perfect land for commercial or residential purposes with reasonable pricing.`,
    },

    'furnished-flats': {
      h1: (city: string, locality: string) => `Furnished Flats for Rent in ${locality}, ${city}`,
      title: (city: string, locality: string) => `Furnished Flats for Rent in ${locality}, ${city}`,
      desc: (city: string, locality: string) => `Find furnished flats for rent in ${locality}, ${city}. Explore verified listings with top amenities.`,
    },

    'semi-furnished-flats': {
      h1: (city: string, locality: string) => `Semi Furnished Flats for Rent in ${locality}, ${city}`,
      title: (city: string, locality: string) => `Semi Furnished Flats for Rent in ${locality}, ${city}`,
      desc: (city: string, locality: string) => `Find semi furnished flats for rent in ${locality}, ${city}. Explore verified listings with top amenities.`,
    },

    'unfurnished-flats': {
      h1: (city: string, locality: string) => `Unfurnished Flats for Rent in ${locality}, ${city}`,
      title: (city: string, locality: string) => `Unfurnished Flats for Rent in ${locality}, ${city}`,
      desc: (city: string, locality: string) => `Find unfurnished flats for rent in ${locality}, ${city}. Explore verified listings with top amenities.`,
    },

    'furnished-villas': {
      h1: (city: string, locality: string) => `Furnished Villas for Rent in ${locality}, ${city}`,
      title: (city: string, locality: string) => `Furnished Villas for Rent in ${locality}, ${city}`,
      desc: (city: string, locality: string) => `Find furnished villas for rent in ${locality}, ${city}. Explore verified listings with top amenities.`,
    },

    'semi-furnished-villas': {
      h1: (city: string, locality: string) => `Semi Furnished Villas for Rent in ${locality}, ${city}`,
      title: (city: string, locality: string) => `Semi Furnished Villas for Rent in ${locality}, ${city}`,
      desc: (city: string, locality: string) => `Find semi furnished villas for rent in ${locality}, ${city}. Explore verified listings with top amenities.`,
    },

    'unfurnished-villas': {
      h1: (city: string, locality: string) => `Unfurnished Villas for Rent in ${locality}, ${city}`,
      title: (city: string, locality: string) => `Unfurnished Villas for Rent in ${locality}, ${city}`,
      desc: (city: string, locality: string) => `Find unfurnished villas for rent in ${locality}, ${city}. Explore verified listings with top amenities.`,
    },

    '1-rk-flats': {
      h1: (city: string, locality: string) => `1-RK Flats for Rent in ${locality}, ${city}`,
      title: (city: string, locality: string) => `1-RK Flats for Rent in ${locality}, ${city} - Homes247`,
      desc: (city: string, locality: string) => `Browse 1-rk flats for rent in ${locality}, ${city}. Explore verified listings with modern amenities.`,
    },

    '1-bhk-flats': {
      h1: (city: string, locality: string) => `1-BHK Flats for Rent in ${locality}, ${city}`,
      title: (city: string, locality: string) => `1-BHK Flats for Rent in ${locality}, ${city} - Homes247`,
      desc: (city: string, locality: string) => `Browse 1-bhk flats for rent in ${locality}, ${city}. Explore verified listings with modern amenities.`,
    },

    '2-bhk-flats': {
      h1: (city: string, locality: string) => `2-BHK Flats for Rent in ${locality}, ${city}`,
      title: (city: string, locality: string) => `2-BHK Flats for Rent in ${locality}, ${city} - Homes247`,
      desc: (city: string, locality: string) => `Browse 2-bhk flats for rent in ${locality}, ${city}. Explore verified listings with modern amenities.`,
    },

    '3-bhk-flats': {
      h1: (city: string, locality: string) => `3-BHK Flats for Rent in ${locality}, ${city}`,
      title: (city: string, locality: string) => `3-BHK Flats for Rent in ${locality}, ${city} - Homes247`,
      desc: (city: string, locality: string) => `Browse 3-bhk flats for rent in ${locality}, ${city}. Explore verified listings with modern amenities.`,
    },

    '4-bhk-flats': {
      h1: (city: string, locality: string) => `4-BHK Flats for Rent in ${locality}, ${city}`,
      title: (city: string, locality: string) => `4-BHK Flats for Rent in ${locality}, ${city} - Homes247`,
      desc: (city: string, locality: string) => `Browse 4-bhk flats for rent in ${locality}, ${city}. Explore verified listings with modern amenities.`,
    },

    '5-bhk-flats': {
      h1: (city: string, locality: string) => `5-BHK Flats for Rent in ${locality}, ${city}`,
      title: (city: string, locality: string) => `5-BHK Flats for Rent in ${locality}, ${city} - Homes247`,
      desc: (city: string, locality: string) => `Browse 5-bhk flats for rent in ${locality}, ${city}. Explore verified listings with modern amenities.`,
    },

    '1-rk-villas': {
      h1: (city: string, locality: string) => `1-RK Villas for Rent in ${locality}, ${city}`,
      title: (city: string, locality: string) => `1-RK Villas for Rent in ${locality}, ${city} - Homes247`,
      desc: (city: string, locality: string) => `Browse 1-rk villas for rent in ${locality}, ${city}. Explore verified listings with modern amenities.`,
    },

    '1-bhk-villas': {
      h1: (city: string, locality: string) => `1-BHK Villas for Rent in ${locality}, ${city}`,
      title: (city: string, locality: string) => `1-BHK Villas for Rent in ${locality}, ${city} - Homes247`,
      desc: (city: string, locality: string) => `Browse 1-bhk villas for rent in ${locality}, ${city}. Explore verified listings with modern amenities.`,
    },

    '2-bhk-villas': {
      h1: (city: string, locality: string) => `2-BHK Villas for Rent in ${locality}, ${city}`,
      title: (city: string, locality: string) => `2-BHK Villas for Rent in ${locality}, ${city} - Homes247`,
      desc: (city: string, locality: string) => `Browse 2-bhk villas for rent in ${locality}, ${city}. Explore verified listings with modern amenities.`,
    },

    '3-bhk-villas': {
      h1: (city: string, locality: string) => `3-BHK Villas for Rent in ${locality}, ${city}`,
      title: (city: string, locality: string) => `3-BHK Villas for Rent in ${locality}, ${city} - Homes247`,
      desc: (city: string, locality: string) => `Browse 3-bhk villas for rent in ${locality}, ${city}. Explore verified listings with modern amenities.`,
    },

    '4-bhk-villas': {
      h1: (city: string, locality: string) => `4-BHK Villas for Rent in ${locality}, ${city}`,
      title: (city: string, locality: string) => `4-BHK Villas for Rent in ${locality}, ${city} - Homes247`,
      desc: (city: string, locality: string) => `Browse 4-bhk villas for rent in ${locality}, ${city}. Explore verified listings with modern amenities.`,
    },

    '5-bhk-villas': {
      h1: (city: string, locality: string) => `5-BHK Villas for Rent in ${locality}, ${city}`,
      title: (city: string, locality: string) => `5-BHK Villas for Rent in ${locality}, ${city} - Homes247`,
      desc: (city: string, locality: string) => `Browse 5-bhk villas for rent in ${locality}, ${city}. Explore verified listings with modern amenities.`,
    },

    'flats-price-under-10000': {
      h1: (city: string, locality: string) => `Flats for Rent in ${locality}, ${city} Price Below 10000`,
      title: (city: string, locality: string) => `Flats for Rent in ${locality}, ${city} Under 10000 | Homes247`,
      desc: (city: string, locality: string) => `Looking for budget-friendly flats for rent in ${locality}, ${city}? Browse Homes247 for verified listings under ₹10,000 and make your dream home a reality.`,
    },

    'flats-price-10000-to-20000': {
      h1: (city: string, locality: string) => `Flats for Rent in ${locality}, ${city} between 10000 to 20000`,
      title: (city: string, locality: string) => `Flats for Rent in ${locality}, ${city} from 10000 to 20000`,
      desc: (city: string, locality: string) => `Get flats for rent in ${locality}, ${city} starting at just Rs 10,000 to Rs 20000. Browse verified listings and locate your perfect flats with Homes247.`,
    },

    'flats-price-20000-to-30000': {
      h1: (city: string, locality: string) => `Flats for Rent in ${locality}, ${city} between 20000 to 30000`,
      title: (city: string, locality: string) => `Flats for Rent in ${locality}, ${city} from 20000 to 30000`,
      desc: (city: string, locality: string) => `Get flats for rent in ${locality}, ${city} starting at just Rs 20,000 to Rs 30,000. Browse verified listings and locate your perfect flats with Homes247.`,
    },

    'flats-price-30000-to-40000': {
      h1: (city: string, locality: string) => `Flats for Rent in ${locality}, ${city} between 30000 to 40000`,
      title: (city: string, locality: string) => `Flats for Rent in ${locality}, ${city} from 30000 to 40000`,
      desc: (city: string, locality: string) => `Get flats for rent in ${locality}, ${city} starting at Rs 30,000 to Rs 40,000. Browse verified listings and locate your perfect flats with Homes247.`,
    },

    'flats-price-40000-to-50000': {
      h1: (city: string, locality: string) => `Flats for Rent in ${locality}, ${city} between 40000 to 50000`,
      title: (city: string, locality: string) => `Flats for Rent in ${locality}, ${city} from 40000 to 50000`,
      desc: (city: string, locality: string) => `Get flats for rent in ${locality}, ${city} starting at Rs 40,000 to Rs 50,000. Browse verified listings and locate your perfect flats with Homes247.`,
    },

    'flats-price-above-50000': {
      h1: (city: string, locality: string) => `Flats for Rent in ${locality}, ${city} Price Above 50000`,
      title: (city: string, locality: string) => `Flats for Rent in ${locality}, ${city} Above 50000 | Homes247`,
      desc: (city: string, locality: string) => `Explore luxurious flats for rent in ${locality}, ${city} with price above ₹50,000. Browse through verified listings and find your premium flats with Homes247.`,
    },

    'villas-price-under-10000': {
      h1: (city: string, locality: string) => `Villas for Rent in ${locality}, ${city} Price Below 10000`,
      title: (city: string, locality: string) => `Villas for Rent in ${locality}, ${city} Under 10000 | Homes247`,
      desc: (city: string, locality: string) => `Looking for budget-friendly villas for rent in ${locality}, ${city}? Browse Homes247 for verified listings under ₹10,000 and make your dream home a reality.`,
    },

    'villas-price-10000-to-20000': {
      h1: (city: string, locality: string) => `Villas for Rent in ${locality}, ${city} between 10000 to 20000`,
      title: (city: string, locality: string) => `Villas for Rent in ${locality}, ${city} from 10000 to 20000`,
      desc: (city: string, locality: string) => `Get villas for rent in ${locality}, ${city} starting at just Rs 10,000 to Rs 20000. Browse verified listings and locate your perfect villas with Homes247.`,
    },

    'villas-price-20000-to-30000': {
      h1: (city: string, locality: string) => `Villas for Rent in ${locality}, ${city} between 20000 to 30000`,
      title: (city: string, locality: string) => `Villas for Rent in ${locality}, ${city} from 20000 to 30000`,
      desc: (city: string, locality: string) => `Get villas for rent in ${locality}, ${city} starting at just Rs 20,000 to Rs 30,000. Browse verified listings and locate your perfect villas with Homes247.`,
    },

    'villas-price-30000-to-40000': {
      h1: (city: string, locality: string) => `Villas for Rent in ${locality}, ${city} between 30000 to 40000`,
      title: (city: string, locality: string) => `Villas for Rent in ${locality}, ${city} from 30000 to 40000`,
      desc: (city: string, locality: string) => `Get villas for rent in ${locality}, ${city} starting at Rs 30,000 to Rs 40,000. Browse verified listings and locate your perfect villas with Homes247.`,
    },

    'villas-price-40000-to-50000': {
      h1: (city: string, locality: string) => `Villas for Rent in ${locality}, ${city} between 40000 to 50000`,
      title: (city: string, locality: string) => `Villas for Rent in ${locality}, ${city} from 40000 to 50000`,
      desc: (city: string, locality: string) => `Get villas for rent in ${locality}, ${city} starting at Rs 40,000 to Rs 50,000. Browse verified listings and locate your perfect villas with Homes247.`,
    },

    'villas-price-above-50000': {
      h1: (city: string, locality: string) => `Villas for Rent in ${locality}, ${city} Price Above 50000`,
      title: (city: string, locality: string) => `Villas for Rent in ${locality}, ${city} Above 50000 | Homes247`,
      desc: (city: string, locality: string) => `Explore luxurious villas for rent in ${locality}, ${city} with price above ₹50,000. Browse through verified listings and find your premium villas with Homes247.`,
    },

    'house-price-under-10000': {
      h1: (city: string, locality: string) => `House for Rent in ${locality}, ${city} Price Below 10000`,
      title: (city: string, locality: string) => `House for Rent in ${locality}, ${city} Under 10000 | Homes247`,
      desc: (city: string, locality: string) => `Looking for budget-friendly house for rent in ${locality}, ${city}? Browse Homes247 for verified listings under ₹10,000 and make your dream home a reality.`,
    },

    'house-price-10000-to-20000': {
      h1: (city: string, locality: string) => `House for Rent in ${locality}, ${city} between 10000 to 20000`,
      title: (city: string, locality: string) => `House for Rent in ${locality}, ${city} from 10000 to 20000`,
      desc: (city: string, locality: string) => `Get house for rent in ${locality}, ${city} starting at just Rs 10,000 to Rs 20000. Browse verified listings and locate your perfect house with Homes247.`,
    },

    'house-price-20000-to-30000': {
      h1: (city: string, locality: string) => `House for Rent in ${locality}, ${city} between 20000 to 30000`,
      title: (city: string, locality: string) => `House for Rent in ${locality}, ${city} from 20000 to 30000`,
      desc: (city: string, locality: string) => `Get house for rent in ${locality}, ${city} starting at just Rs 20,000 to Rs 30,000. Browse verified listings and locate your perfect house with Homes247.`,
    },

    'house-price-30000-to-40000': {
      h1: (city: string, locality: string) => `House for Rent in ${locality}, ${city} between 30000 to 40000`,
      title: (city: string, locality: string) => `House for Rent in ${locality}, ${city} from 30000 to 40000`,
      desc: (city: string, locality: string) => `Get house for rent in ${locality}, ${city} starting at Rs 30,000 to Rs 40,000. Browse verified listings and locate your perfect house with Homes247.`,
    },

    'house-price-40000-to-50000': {
      h1: (city: string, locality: string) => `House for Rent in ${locality}, ${city} between 40000 to 50000`,
      title: (city: string, locality: string) => `House for Rent in ${locality}, ${city} from 40000 to 50000`,
      desc: (city: string, locality: string) => `Get house for rent in ${locality}, ${city} starting at Rs 40,000 to Rs 50,000. Browse verified listings and locate your perfect house with Homes247.`,
    },

    'house-price-above-50000': {
      h1: (city: string, locality: string) => `House for Rent in ${locality}, ${city} Price Above 50000`,
      title: (city: string, locality: string) => `House for Rent in ${locality}, ${city} Above 50000 | Homes247`,
      desc: (city: string, locality: string) => `Explore luxurious house for rent in ${locality}, ${city} with price above ₹50,000. Browse through verified listings and find your premium house with Homes247.`,
    },

    'independent-house-price-under-10000': {
      h1: (city: string, locality: string) => `Independent House for Rent in ${locality}, ${city} Price Below 10000`,
      title: (city: string, locality: string) => `Independent House for Rent in ${locality}, ${city} Under 10k`,
      desc: (city: string, locality: string) => `Looking for budget-friendly independent house for rent in ${locality}, ${city}? Browse Homes247 for verified listings under ₹10,000 and make your dream home a reality.`,
    },

    'independent-house-price-10000-to-20000': {
      h1: (city: string, locality: string) => `Independent House for Rent in ${locality}, ${city} between 10000 to 20000`,
      title: (city: string, locality: string) => `Independent House for Rent in ${locality}, ${city} from 10k-20k`,
      desc: (city: string, locality: string) => `Get independent house for rent in ${locality}, ${city} starting at just Rs 10,000 to Rs 20000. Browse verified listings and locate your perfect independent house with Homes247.`,
    },

    'independent-house-price-20000-to-30000': {
      h1: (city: string, locality: string) => `Independent House for Rent in ${locality}, ${city} between 20000 to 30000`,
      title: (city: string, locality: string) => `Independent House for Rent in ${locality}, ${city} from 20k-30k`,
      desc: (city: string, locality: string) => `Get independent house for rent in ${locality}, ${city} starting at just Rs 20,000 to Rs 30,000. Browse verified listings and locate your perfect independent house with Homes247.`,
    },

    'independent-house-price-30000-to-40000': {
      h1: (city: string, locality: string) => `Independent House for Rent in ${locality}, ${city} between 30000 to 40000`,
      title: (city: string, locality: string) => `Independent House for Rent in ${locality}, ${city} from 30k-40k`,
      desc: (city: string, locality: string) => `Get independent house for rent in ${locality}, ${city} starting at Rs 30,000 to Rs 40,000. Browse verified listings and locate your perfect independent house with Homes247.`,
    },

    'independent-house-price-40000-to-50000': {
      h1: (city: string, locality: string) => `Independent House for Rent in ${locality}, ${city} between 40000 to 50000`,
      title: (city: string, locality: string) => `Independent House for Rent in ${locality}, ${city} from 40k-50k`,
      desc: (city: string, locality: string) => `Get independent house for rent in ${locality}, ${city} starting at Rs 40,000 to Rs 50,000. Browse verified listings and locate your perfect independent house with Homes247.`,
    },

    'independent-house-price-above-50000': {
      h1: (city: string, locality: string) => `Independent House for Rent in ${locality}, ${city} Price Above 50000`,
      title: (city: string, locality: string) => `Independent House for Rent in ${locality}, ${city} Above 50k`,
      desc: (city: string, locality: string) => `Explore luxurious independent house for rent in ${locality}, ${city} with price above ₹50,000. Browse through verified listings and find your premium independent house with Homes247.`,
    },

    'plots-price-under-10000': {
      h1: (city: string, locality: string) => `Plots for Rent in ${locality}, ${city} Price Below 10000`,
      title: (city: string, locality: string) => `Plots for Rent in ${locality}, ${city} Under 10000 | Homes247`,
      desc: (city: string, locality: string) => `Looking for budget-friendly plots for rent in ${locality}, ${city}? Browse Homes247 for verified listings under ₹10,000 and make your dream home a reality.`,
    },

    'plots-price-10000-to-20000': {
      h1: (city: string, locality: string) => `Plots for Rent in ${locality}, ${city} between 10000 to 20000`,
      title: (city: string, locality: string) => `Plots for Rent in ${locality}, ${city} from 10000 to 20000`,
      desc: (city: string, locality: string) => `Get plots for rent in ${locality}, ${city} starting at just Rs 10,000 to Rs 20000. Browse verified listings and locate your perfect plots with Homes247.`,
    },

    'plots-price-20000-to-30000': {
      h1: (city: string, locality: string) => `Plots for Rent in ${locality}, ${city} between 20000 to 30000`,
      title: (city: string, locality: string) => `Plots for Rent in ${locality}, ${city} from 20000 to 30000`,
      desc: (city: string, locality: string) => `Get plots for rent in ${locality}, ${city} starting at just Rs 20,000 to Rs 30,000. Browse verified listings and locate your perfect plots with Homes247.`,
    },

    'plots-price-30000-to-40000': {
      h1: (city: string, locality: string) => `Plots for Rent in ${locality}, ${city} between 30000 to 40000`,
      title: (city: string, locality: string) => `Plots for Rent in ${locality}, ${city} from 30000 to 40000`,
      desc: (city: string, locality: string) => `Get plots for rent in ${locality}, ${city} starting at Rs 30,000 to Rs 40,000. Browse verified listings and locate your perfect plots with Homes247.`,
    },

    'plots-price-40000-to-50000': {
      h1: (city: string, locality: string) => `Plots for Rent in ${locality}, ${city} between 40000 to 50000`,
      title: (city: string, locality: string) => `Plots for Rent in ${locality}, ${city} from 40000 to 50000`,
      desc: (city: string, locality: string) => `Get plots for rent in ${locality}, ${city} starting at Rs 40,000 to Rs 50,000. Browse verified listings and locate your perfect plots with Homes247.`,
    },

    'plots-price-above-50000': {
      h1: (city: string, locality: string) => `Plots for Rent in ${locality}, ${city} Price Above 50000`,
      title: (city: string, locality: string) => `Plots for Rent in ${locality}, ${city} Above 50000 | Homes247`,
      desc: (city: string, locality: string) => `Explore luxurious plots for rent in ${locality}, ${city} with price above ₹50,000. Browse through verified listings and find your premium plots with Homes247.`,
    },
    'owner': {
      h1: (city: string, propertyLabel: string, locality: string) => `${propertyLabel} for Rent in ${locality},${city} - Direct from Owners`,
      title: (city: string, propertyLabel: string, locality: string) => `${propertyLabel} for Rent in ${locality},${city} - by Owner`,
      desc: (city: string, propertyLabel: string, locality: string) => `Find ${propertyLabel.toLowerCase()} for rent in ${locality},${city} directly from owners. Browse verified listings of ${propertyLabel.toLowerCase()} for rent in ${locality},${city}. Book your dream home now.`
    },
    'no-brokerage': {
      h1: (city: string, propertyLabel: string, locality: string) => `No Brokerage ${propertyLabel} for Rent in ${locality},${city}`,
      title: (city: string, propertyLabel: string, locality: string) => `No Brokerage ${propertyLabel} for Rent in ${locality}.`,
      desc: (city: string, propertyLabel: string, locality: string) => `Find no brokerage ${propertyLabel.toLowerCase()} for rent in ${locality},${city}. Explore a wide range of ${propertyLabel.toLowerCase()} without brokerage. Start your search now on Homes247.`
    },

  }

  citySlug: any;
  configs: any[] = [];
  h1Text: any;


  private capitalize(word: string) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
  private formatProperty(property: string) {
    return property.replace('-', ' ');
  }


  furnishingTypes = ['furnished', 'semi-furnished', 'unfurnished'];
  propertyTypes = ['flats', 'villas', 'house', 'independent-house', 'plots'];
  propertyTypes1 = ['flats', 'villas'];
  bhkbased = ['1-rk', '1-bhk', '2-bhk', '3-bhk', '4-bhk', '5-bhk'];
  budgetbased = ['-price-under-10000', '-price-10000-to-20000', '-price-20000-to-30000', '-price-30000-to-40000', '-price-40000-to-50000', '-price-above-50000']

  buildConfigs() {
    // 
    const value = this.cityservice.cityfinder(this.router.url);
    this.currentCity = value.cityname;
    const UrlcurrentCity = this.currentCity.toLowerCase().replace(/\s+/g, '-');
    const rawCity = value.cityname.trim();
    this.citySlug = rawCity.toLowerCase().replace(/\s+/g, '-');
    this.city = rawCity.charAt(0).toUpperCase() + rawCity.slice(1).toLowerCase();
    var localityid = this.router.url.split('-').pop()!.match(/[0-9]+/) as any;
    this.localityid = localityid;
    var param11 = {
      locid: localityid,
    };

    this.Service.getlocalitymeta('', param11).subscribe((metatag: any) => {
      let metatags = metatag['Localityseo'];
      var localityName = metatags[0].LocalityName;
      const Locality_Seo = localityName.toLowerCase().replace(/\s+/g, '-');
      this.localityName = Locality_Seo;

      this.propertyTypes.forEach(property => {
        const meta = this.metaDB_locality[property];

        this.configs.push({
          key: `/rental/${property}-for-rent-in-${this.localityName}-${this.citySlug}-${this.localityid}`,
          h1: meta.h1(this.city, localityName),
          title: meta.title(this.city, localityName),
          desc: meta.desc(this.city, localityName),
          ogTitle: meta.title(this.city, localityName),
          ogDesc: meta.desc(this.city, localityName)
        });
      });

      this.furnishingTypes.forEach(furnish => {
        this.propertyTypes1.forEach(property => {
          const dbKey = `${furnish}-${property}`;
          const meta = this.metaDB_locality[dbKey];

          if (meta) {
            this.configs.push({
              key: `/rental/${dbKey}-for-rent-in-${this.localityName}-${this.citySlug}-${this.localityid}`,
              h1: meta.h1(this.city, localityName),
              title: meta.title(this.city, localityName),
              desc: meta.desc(this.city, localityName),
              ogTitle: meta.title(this.city, localityName),
              ogDesc: meta.desc(this.city, localityName)
            });
          }
        });
      });

      this.propertyTypes1.forEach(property => {
        this.bhkbased.forEach(bhk => {
          const dbKey = `${bhk}-${property}`;
          const meta = this.metaDB_locality[dbKey];

          if (meta) {
            this.configs.push({
              key: `/rental/${dbKey}-for-rent-in-${this.localityName}-${this.citySlug}-${this.localityid}`,
              h1: meta.h1(this.city, localityName),
              title: meta.title(this.city, localityName),
              desc: meta.desc(this.city, localityName),
              ogTitle: meta.title(this.city, localityName),
              ogDesc: meta.desc(this.city, localityName)
            });
          }
        });
      });

      this.propertyTypes.forEach(property => {
        this.budgetbased.forEach(budget => {
          const budgetKey = budget.replace(/^-/, "");
          const dbKey = `${property}-${budgetKey}`;
          const meta = this.metaDB_locality[dbKey];

          const key = `/rental/${property}-for-rent-in-${this.localityName}-${this.citySlug}${budget}-${this.localityid}`;

          if (meta) {
            this.configs.push({
              key,
              h1: meta.h1(this.city, localityName),
              title: meta.title(this.city, localityName),
              desc: meta.desc(this.city, localityName),
              ogTitle: meta.title(this.city, localityName),
              ogDesc: meta.desc(this.city, localityName)
            });
          }
        });
      });

      this.propertyTypes.forEach(property => {
        const label = this.formatProperty(property);
        // owner
        const ownerMeta = this.metaDB_locality['owner'];
        this.configs.push({
          key: `/rental/${property}-for-rent-from-owners-in-${this.localityName}-${this.citySlug}-${this.localityid}`,
          h1: ownerMeta.h1(this.city, label, localityName),
          title: ownerMeta.title(this.city, label, localityName),
          desc: ownerMeta.desc(this.city, label, localityName),
          ogTitle: ownerMeta.title(this.city, label, localityName),
          ogDesc: ownerMeta.desc(this.city, label, localityName)
        });

        // no-brokerage
        const nbMeta = this.metaDB_locality['no-brokerage'];
        this.configs.push({
          key: `/rental/no-brokerage-${property}-for-rent-in-${this.localityName}-${this.citySlug}-${this.localityid}`,
          h1: nbMeta.h1(this.city, label, localityName),
          title: nbMeta.title(this.city, label, localityName),
          desc: nbMeta.desc(this.city, label, localityName),
          ogTitle: nbMeta.title(this.city, label, localityName),
          ogDesc: nbMeta.desc(this.city, label, localityName)
        });
      });

      this.updateMetaTags(this.router.url);

    });
  }

  updateMetaTags(currentUrl: string) {
    const url = currentUrl;
    this.configs.forEach(cfg => {
      const pattern = cfg.key;

      if (pattern === url) {
        this.h1Text = cfg.h1;
        const title = cfg.title;
        const desc = cfg.desc;
        const ogTitle = cfg.ogTitle;
        const ogDesc = cfg.ogDesc;

        this.titleService.setTitle(title);
        this.meta.updateTag({ name: 'description', content: desc });
        this.meta.updateTag({ property: 'og:title', content: ogTitle });
        this.meta.updateTag({ property: 'og:description', content: ogDesc });
      }
    });

    this.Service.createLinkForCanonicalURL();
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
      category_id: 3
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