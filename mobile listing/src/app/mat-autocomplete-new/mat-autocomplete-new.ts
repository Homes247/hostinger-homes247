import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CommonModule, Location } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, ViewChild, ElementRef, PLATFORM_ID, Inject, OnDestroy, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, Subject } from 'rxjs';
import { debounceTime, map, take, takeUntil } from 'rxjs/operators';
import { AllindiaService } from '../allindia.service';
import { CityService } from '../city.service';
import { DataService } from '../data.service';
import { DataService2 } from '../data.service2';
import { myValue } from '../ejs-autocomplete/ejs-autocomplete';
import { FilterService } from '../filter.service';
import { SearchDropdownMainCity } from '../search-dropdown-main-city/search-dropdown-main-city';
import { RouterModule } from '@angular/router';
import { MyBHKPipe, OrderByPipes, ReplaceLineBreaks } from '../mainpipe-pipe';
import { SafeStorageService } from '../safe-storage.service';
import { NgZone } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
// import Swal from 'sweetalert2';
import { Modal } from 'bootstrap';


declare var $: any;

@Component({
  selector: 'app-mat-autocomplete-new',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatAutocompleteModule, MatInputModule, RouterModule, MyBHKPipe, OrderByPipes, SearchDropdownMainCity, ReplaceLineBreaks],
  templateUrl: './mat-autocomplete-new.html',
  styleUrl: './mat-autocomplete-new.css',
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatAutocompleteNew implements OnDestroy {
  // @ViewChild('myDiv') myDiv!: ElementRef;
  @ViewChild('componentTrigger', { static: false }) SearchDropdownMainCityComponent!: SearchDropdownMainCity;
  public autoCompleteData_build: { [key: string]: Object }[] = [];
  topCitiesMy = [
    { item: 'Bangalore' },
    { item: 'Hyderabad' },
    { item: 'Chennai' },
    { item: 'Mumbai' },
    { item: 'Kolkata' },
    { item: 'Delhi' },
  ];

  citiesss: any;
  Allcities: any;
  selectedCity: any;
  clickedCityName: any;
  cityid: any;
  registerForm!: UntypedFormGroup; // Using Untyped for compatibility with legacy form structures

  currentMin: string = '₹0';
  currentMax: string = '₹5.0 Cr';
  currentMin1: string = '₹0';
  currentMax1: string = '₹5.00 L';
  currentMin2: string = '₹0';
  currentMax2: string = '₹5.0 Cr';
  currentMin3: string = '₹0';
  currentMax3: string = '₹50000 T';
  currentMin4: string = '₹0';
  currentMax4: string = '₹1.0 Cr';


  currentMinSqft: string = '0 Sqft';
  currentMaxSqft: string = '10000 Sqft';
  currentMinSqft1: string = '0 Sqft';
  currentMaxSqft1: string = '10000 Sqft';
  currentMinSqft2: string = '0 Sqft';
  currentMaxSqft2: string = '10000 Sqft';
  currentMinSqft3: string = '0 Sqft';
  currentMaxSqft3: string = '100000  Sqft';

  checkedPrice: boolean = false;
  FromCitySelecting: boolean = false;
  private skipLocalityRestore = false;
  private isSecondModalOpen = false;
  // Bedroom Selects
  oneRKBedroomSelect: boolean = false;
  oneBedroomSelect: boolean = false;
  twoBedroomSelect: boolean = false;
  threeBedroomSelect: boolean = false;
  fourBedroomSelect: boolean = false;
  fiveBedroomSelect: boolean = false;
  sixBedroomSelect: boolean = false;
  sevenBedroomSelect: boolean = false;

  // Bathroom Selects
  oneBathroomSelect: boolean = false;
  twoBathroomSelect: boolean = false;
  threeBathroomSelect: boolean = false;
  fourBathroomSelect: boolean = false;
  fiveBathroomSelect: boolean = false;

  // Balcany Selects
  oneBalcanySelect: boolean = false;
  twoBalcanySelect: boolean = false;
  threeBalcanySelect: boolean = false;
  fourBalcanySelect: boolean = false;
  // Project Status Selects
  readyToMoveSelect: boolean = false;
  readyToMoveSelect1: boolean = false;
  underConstructionSelect: boolean = false;
  underConstructionSelect1: boolean = false;
  newLaunchSelect: boolean = false;
  preLaunchSelect: boolean = false;

  // Amenity Selects
  parkingSelect: boolean = false;
  powerBackupSelect: boolean = false;
  cctvSelect: boolean = false;
  elevatorSelect: boolean = false;

  // Type Selects
  BuySelect: boolean = false;
  RentSelect: boolean = false;
  ResaleSelect: boolean = false;

  BuyCommercialSelect: boolean = false;
  RentCommercialSelect: boolean = false;
  PGSelect: boolean = false;

  CommercialSelect: boolean = false;
  ResidentialSelect: boolean = false;

  // Property Type Selects
  apartmentSelect: boolean = false;
  villaSelect: boolean = false;
  plotSelect: boolean = false;
  HouseSelect: boolean = false;

  // Furnishing Selects
  Furnish: boolean = false;
  SemiFurnish: boolean = false;
  unFurnish: boolean = false;

  // Ownership Selects
  OwnerSelect: boolean = false;
  AgentSelect: boolean = false;

  // Possession Selects
  ImmediateSelect = false;
  SixMonthsSelect = false;
  OneYearSelect = false;
  twoYearSelect = false;

  // Other Selects
  ImmediateSelect1: boolean = false;
  Within15DaysSelect: boolean = false;
  Within30DaysSelect: boolean = false;
  After30DaysSelect: boolean = false;

  loadcomponent = false;
  SelectedLocality_id: any[] = [];

  bhklist: any;
  balconylist: any;
  Approvalslist: any;
  bathroomlist: any;
  furnishlist: any;
  Tenantslist: any;
  Ownershiplist: any;
  Propertytypelist: any;
  Doorfacelist: any;
  Amenitieslist: any;
  propertyTypes: any;
  Ejscomponent: any;
  SelectedType: any;
  SelectedLocality: any[] = [];
  SelectedLocalityName: any[] = [];
  newNearByLocalityArry: any[] = [];
  amenityId: any[] = [];
  testArray: any[] = [];
  isExpanded: { [key: string]: boolean } = {};

  projecttype: any[] = [];
  area_min: any[] = [];
  area_max: any[] = [];
  current_min: any[] = [];
  current_max: any[] = [];

  currentMinBudget: any;
  currentMaxBudget: any;
  projectcount: any;
  recentSearches: any[] = [];
  localityname: any;
  maxArea: any = [];
  maxBudget: any = [];

  private isTriggered = false;
  private isTriggered2 = false;
  isDivVisible = false;
  // price_on_request: any = 1;

  // PG & Commercial Lists
  pgRulesList: any;
  pgServiceList: any;
  roomTypes: any;
  pgFacilitiesList: any;
  roomOtherTypes: any;
  pgListingAsList: any;
  pgStartedYearList: any;
  pgAvailableForList: any;
  pgNoticePeriodList: any;
  pgBestSuitForList: any;
  pgFoodList: any;
  pgTenantsReturnByList: any;
  pgFoodChargesList: any;
  pgMealTypeList: any;
  Parking: any;
  imageslist: any;
  commercialPropertyTypeList: any;
  commercialListingAsList: any;
  suitedForList: any;
  plotTypeList: any;
  buildingTypeList: any;
  propertyStatusList: any;
  furnishTypeList: any;
  propertyAgeList: any;
  propertyFacingList: any;
  lockInPeriodList: any;
  isClearAllClicked: boolean = false;
  showChips: boolean = false;

  submitApplicationLoader = false;

  // Filter Props
  Localityid: any[] = [];
  noOfBedrooms: any[] = [];
  noOfBathrooms: any[] = [];
  noOfBalconies: any[] = [];
  possission: any[] = [];
  projectStatus: any[] = [];
  selectedFacings: any[] = [];
  selectedTenant: number | null = null;
  // todaydate: any;
  // futuredate: any;
  Sharing_Type: any[] = [];
  PG_For_Type: any[] = [];
  Suitable_For_Type: any[] = [];
  Food_Included_Type: any[] = [];
  buildingTypeListvalue: any[] = [];
  furnishTypeListvalue: any[] = [];
  propertyAgeListvalue: any[] = [];
  commercialPropertyType: any[] = [];
  Balcony: any[] = [];
  FurnishType: string[] = [];
  OwnerShip: string[] = [];
  FilterBYFloors: number[] = [];
  selectedStatus: string | null = null;
  selectedStatus1: string | null = null;
  sale_rent: any;
  Citylocalitys: any;
  rentCommercial: any;
  onlyLeased: any = 2;
  checkedLeased = false;

  numBudget!: number;
  numArea!: number;
  trending: any;
  topLocalitiesList: any[] = [];
  trendingdiv = false;
  count: number = 0;
  duplicateID: any;
  todaydate: string = '';
  futuredate: string = '';
  GroundFloor = false;
  FirstFloor = false;
  SecondFloor = false;
  ThirdFloor = false;
  FourthFloorAbove = false;
  BachelorTenant = false;
  FamilyTenant = false;
  AnyoneTenant = false;
  LadiesTenant = false;
  isRestoringFilters = false;
  isNavigating = false;
  removedLocalities: string[] = [];
  private destroy$ = new Subject<void>();

  // Mapped status for selection logic
  projectStatusMap: { [key: string]: string } = {
    readyToMove: '50307',
    newLaunch: '50310',
    underConstruction: '50309',
    upcoming: '50308',
  };

  projectStatusresaleMap: { [key: string]: string } = {
    readyToMove: '138564',
    underConstruction: '138565',
  };
  private filterTrigger = new Subject<void>();
  constructor(
    private allindia: AllindiaService,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    public Service: DataService,
    private Service2: DataService2,
    private cityservice: CityService,
    private fb: FormBuilder,
    private router: Router,
    public Filter: FilterService,
    private cdRef: ChangeDetectorRef, private storage: SafeStorageService, private ngZone: NgZone, @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.Service.componentloader = true;

    // if (this.isTriggered == false) {
    //   this.isTriggered = true;
    this.Service.mouseenterlisten5().pipe(takeUntil(this.destroy$)).subscribe((m: any) => {
      this.ngZone.run(() => {
        var city = this.storage.getItem('CityName');
        this.SecondModalOpen(city);
      });
    });
    // }

    // Listeners commented out in original code preserved
  }

  private async getSwal() {
    const { default: Swal } = await import('sweetalert2');
    return Swal;
  }

  ngOnDestroy() {
    this.Service.componentloader = false;
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit() {
    this.showChips = false;
    // alert('ngOnInit')
    this.clickedCityName = this.storage.getItem('CityName');
    this.selectedCity = this.clickedCityName;
    // alert(this.selectedCity);
    this.getlocationlist();

    if (!this.Service.skipQueryUpdate) {
      this.updateQueryParams();
    }



    this.Lazyload();

    let urlMatched = false;

    if (
      this.router.url.includes('/rent/') ||
      this.router.url.includes('/rental/') ||
      this.router.url.includes('property-for-rent-in')
    ) {
      urlMatched = true;
      this.RentSelect = true;
      this.ResidentialSelect = true;
      this.BuySelect = false;
      this.PGSelect = false;
      this.CommercialSelect = false;
      this.ResaleSelect = false;
      this.SelectedType = 'Rent';
      this.getfilterdatalist();
      this.Service.mouseenterservice7('Rent');
    }
    else if (
      this.router.url.includes('/projects-in') ||
      this.router.url.includes('/apartment-projects-in') ||
      this.router.url.includes('/villa-projects-in') ||
      this.router.url.includes('/land-projects-in') ||
      this.router.url.includes('/buy/')
    ) {
      urlMatched = true;
      this.ResaleSelect = true;
      this.ResidentialSelect = true;
      this.BuySelect = false;
      this.PGSelect = false;
      this.CommercialSelect = false;
      this.SelectedType = 'Resale';
      this.ResaleDataFilters();
      this.Service.mouseenterservice7('Resale');
    } else if (this.router.url.indexOf('/pgcl/pg-for-rent-in-') > -1) {
      urlMatched = true;
      this.PGSelect = true;
      this.ResidentialSelect = true;
      this.BuySelect = false;
      this.RentSelect = false;
      this.CommercialSelect = false;
      this.ResaleSelect = false;
      this.SelectedType = 'PG';
      this.PgDataFilters();
      this.Service.mouseenterservice7('PG');
    } else if (this.router.url.indexOf('/pg-home') > -1) {
      urlMatched = true;
      this.PGSelect = true;
      this.ResidentialSelect = true;
      this.BuySelect = false;
      this.RentSelect = false;
      this.ResaleSelect = false;
      this.CommercialSelect = false;
      this.SelectedType = 'PG';
      this.PgDataFilters();
      this.Service.mouseenterservice7('PG');
    } else if (this.router.url.indexOf('/commercial') > -1) {
      urlMatched = true;
      this.CommercialSelect = true;
      this.ResidentialSelect = false;
      this.BuySelect = false;
      this.ResaleSelect = false;
      this.RentSelect = false;
      this.PGSelect = false;
      if (this.router.url.indexOf('commercial-properties-for-sale-in') > -1) {

        this.sale_rent = 1;
        this.BuyCommercialSelect = true;
        this.RentCommercialSelect = false;

      }
      else if (this.router.url.indexOf('commercial-properties-for-rent-in') > -1) {
        this.sale_rent = 2;
        this.RentCommercialSelect = true;
        this.BuyCommercialSelect = false;
        this.rentCommercial = 'commercialRent';
      }
      else {
        // default BUY
        this.sale_rent = 1;
        this.BuyCommercialSelect = true;
        this.RentCommercialSelect = false;
      }
      this.SelectedType = 'Commercial';
      this.commercialDataFilter();
      this.Service.mouseenterservice7('Commercial');
    }

    // Default: home page → Buy
    if (!urlMatched) {
      this.BuySelect = true;
      this.ResidentialSelect = true;
      this.RentSelect = false;
      this.ResaleSelect = false;
      this.PGSelect = false;
      this.CommercialSelect = false;
      this.SelectedType = 'Buy';
      this.getbhkList();
      this.Service.mouseenterservice7('Buy');
    }

    this.activatedRoute.queryParamMap.subscribe(params => {
      if (this.skipLocalityRestore) {
        this.skipLocalityRestore = false;
        return;
      }
      const paramsObj = params['params'] || {}; // Safe access
      const localityidParam = params.get('localityid');
      const isEmpty = Object.keys(paramsObj).length === 0;
      if (isEmpty == false) {
        this.projecttype = paramsObj['propertytype'] ? (Array.isArray(paramsObj['propertytype']) ? paramsObj['propertytype'].map(String) : String(paramsObj['propertytype']).split(',')) : [];

        this.Localityid = localityidParam ? localityidParam.split(',') : [];
        if (this.Localityid.length > 0) {
          this.GowshikTest();
        }

        this.current_min = paramsObj['min'] ? (Array.isArray(paramsObj['min']) ? paramsObj['min'].map(String) : String(paramsObj['min']).split(',')) : [];
        this.current_max = paramsObj['max'] ? (Array.isArray(paramsObj['max']) ? paramsObj['max'].map(String) : String(paramsObj['max']).split(',')) : [];
        this.area_min = paramsObj['sqftmin'] ? (Array.isArray(paramsObj['sqftmin']) ? paramsObj['sqftmin'].map(String) : String(paramsObj['sqftmin']).split(',')) : [];
        this.area_max = paramsObj['sqftmax'] ? (Array.isArray(paramsObj['sqftmax']) ? paramsObj['sqftmax'].map(String) : String(paramsObj['sqftmax']).split(',')) : [];
        this.noOfBedrooms = paramsObj['bedroom'] ? (Array.isArray(paramsObj['bedroom']) ? paramsObj['bedroom'].map(String) : String(paramsObj['bedroom']).split(',')) : [];
        this.noOfBathrooms = paramsObj['bathroom'] ? (Array.isArray(paramsObj['bathroom']) ? paramsObj['bathroom'].map(String) : String(paramsObj['bathroom']).split(',')) : [];
        this.noOfBalconies = paramsObj['balconyId'] ? (Array.isArray(paramsObj['balconyId']) ? paramsObj['balconyId'].map(String) : String(paramsObj['balconyId']).split(',')) : [];
        this.possission = paramsObj['availability'] ? (Array.isArray(paramsObj['availability']) ? paramsObj['availability'].map(String) : String(paramsObj['availability']).split(',')) : [];
        // this.Filter.price_on_request = paramsObj['price_on_request'] ? (Array.isArray(paramsObj['price_on_request']) ? paramsObj['price_on_request'].map(String) : String(paramsObj['price_on_request']).split(',')) : [];
        this.projectStatus = paramsObj['status'] ? (Array.isArray(paramsObj['status']) ? paramsObj['status'].map(String) : String(paramsObj['status']).split(',')) : [];
        this.selectedStatus = Object.keys(this.projectStatusMap).find(key => this.projectStatus.includes(this.projectStatusMap[key])) || null;
        this.selectedStatus1 = Object.keys(this.projectStatusresaleMap).find(key => this.projectStatus.includes(this.projectStatusresaleMap[key])) || null;
        this.amenityId = paramsObj['amenities'] ? (Array.isArray(paramsObj['amenities']) ? paramsObj['amenities'].map(String) : String(paramsObj['amenities']).split(',')) : [];
        this.selectedFacings = paramsObj['doorfacing'] ? (Array.isArray(paramsObj['doorfacing']) ? paramsObj['doorfacing'].map(String) : String(paramsObj['doorfacing']).split(',')) : [];
        // this.selectedTenant = paramsObj['tenants'] ? (Array.isArray(paramsObj['tenants']) ? paramsObj['tenants'].map(String) : String(paramsObj['tenants']).split(',')) : [];
        this.selectedTenant = paramsObj['tenants'] ? Number(paramsObj['tenants']) : null;
        // this.todaydate = paramsObj['fromdate'] ? (Array.isArray(paramsObj['fromdate']) ? paramsObj['fromdate'].map(String) : String(paramsObj['fromdate']).split(',')) : [];
        // this.futuredate = paramsObj['futuredate'] ? (Array.isArray(paramsObj['futuredate']) ? paramsObj['futuredate'].map(String) : String(paramsObj['futuredate']).split(',')) : [];
        this.todaydate = paramsObj['fromdate'] ? String(paramsObj['fromdate']) : '';
        this.futuredate = paramsObj['futuredate'] ? String(paramsObj['futuredate']) : '';
        this.Sharing_Type = paramsObj['roomtype'] ? (Array.isArray(paramsObj['roomtype']) ? paramsObj['roomtype'].map(String) : String(paramsObj['roomtype']).split(',')) : [];
        this.PG_For_Type = paramsObj['pgavailablefor'] ? (Array.isArray(paramsObj['pgavailablefor']) ? paramsObj['pgavailablefor'].map(String) : String(paramsObj['pgavailablefor']).split(',')) : [];
        this.Suitable_For_Type = paramsObj['pgbestsuit'] ? (Array.isArray(paramsObj['pgbestsuit']) ? paramsObj['pgbestsuit'].map(String) : String(paramsObj['pgbestsuit']).split(',')) : [];
        this.Food_Included_Type = paramsObj['pgfoodtype'] ? (Array.isArray(paramsObj['pgfoodtype']) ? paramsObj['pgfoodtype'].map(String) : String(paramsObj['pgfoodtype']).split(',')) : [];
        this.buildingTypeListvalue = paramsObj['buildingtype'] ? (Array.isArray(paramsObj['buildingtype']) ? paramsObj['buildingtype'].map(String) : String(paramsObj['buildingtype']).split(',')) : [];
        this.furnishTypeListvalue = paramsObj['furnishstatus'] ? (Array.isArray(paramsObj['furnishstatus']) ? paramsObj['furnishstatus'].map(String) : String(paramsObj['furnishstatus']).split(',')) : [];
        this.propertyAgeListvalue = paramsObj['Plotage'] ? (Array.isArray(paramsObj['Plotage']) ? paramsObj['Plotage'].map(String) : String(paramsObj['Plotage']).split(',')) : [];
        this.commercialPropertyType = paramsObj['Propertype'] ? (Array.isArray(paramsObj['Propertype']) ? paramsObj['Propertype'].map(String) : String(paramsObj['Propertype']).split(',')) : [];
        this.FurnishType = paramsObj['furnish'] ? (Array.isArray(paramsObj['furnish']) ? paramsObj['furnish'].map(String) : String(paramsObj['furnish']).split(',')) : [];
        this.OwnerShip = paramsObj['postedby'] ? (Array.isArray(paramsObj['postedby']) ? paramsObj['postedby'].map(String) : String(paramsObj['postedby']).split(',')) : [];
        // this.FilterBYFloors = paramsObj['floorById'] ? (Array.isArray(paramsObj['floorById']) ? paramsObj['floorById'].map(String) : String(paramsObj['floorById']).split(',')) : [];
        this.FilterBYFloors = paramsObj['floorbyid'] ? (Array.isArray(paramsObj['floorbyid']) ? paramsObj['floorbyid'].map(Number) : String(paramsObj['floorbyid']).split(',').map(Number)) : [];
        // this.onlyLeased = paramsObj['leased'] ? (Array.isArray(paramsObj['leased']) ? paramsObj['leased'].map(String) : String(paramsObj['leased']).split(',')) : [];
        const leasedValue = paramsObj['leased']
          ? Number(paramsObj['leased'])
          : 2;

        this.onlyLeased = leasedValue;
        this.checkedLeased = this.onlyLeased === 1;

        this.GroundFloor = this.FilterBYFloors.includes(1);
        this.FirstFloor = this.FilterBYFloors.includes(2);
        this.SecondFloor = this.FilterBYFloors.includes(3);
        this.ThirdFloor = this.FilterBYFloors.includes(4);
        this.FourthFloorAbove = this.FilterBYFloors.includes(5);
        this.FourthFloorAbove = this.FilterBYFloors.some(id => ['5'].includes(String(id)));
        this.BachelorTenant = this.selectedTenant === 1;
        this.FamilyTenant = this.selectedTenant === 2;
        this.AnyoneTenant = this.selectedTenant === 3;
        this.LadiesTenant = this.selectedTenant === 4;
        this.OwnerSelect = this.OwnerShip.includes('654826');
        this.AgentSelect = this.OwnerShip.includes('654825');
        this.Furnish = this.FurnishType.some(id => ['1'].includes(id));
        this.SemiFurnish = this.FurnishType.some(id => ['2'].includes(id));
        this.unFurnish = this.FurnishType.some(id => ['3'].includes(id));
        this.apartmentSelect = this.projecttype.some(id => ['50401', '1'].includes(id));
        this.villaSelect = this.projecttype.some(id => ['50402', '2'].includes(id));
        this.plotSelect = this.projecttype.some(id => ['50403', '3'].includes(id));
        this.HouseSelect = this.projecttype.some(id => ['50404', '4'].includes(id));
        this.oneRKBedroomSelect = this.noOfBedrooms.some(id => ['3550', '9'].includes(id));
        this.oneBedroomSelect = this.noOfBedrooms.some(id => ['3551', '1'].includes(id));
        this.twoBedroomSelect = this.noOfBedrooms.some(id => ['3552', '2'].includes(id));
        this.threeBedroomSelect = this.noOfBedrooms.some(id => ['3553', '3'].includes(id));
        this.fourBedroomSelect = this.noOfBedrooms.some(id => ['3554', '4'].includes(id));
        this.fiveBedroomSelect = this.noOfBedrooms.some(id => ['3555', '5'].includes(id));
        this.sixBedroomSelect = this.noOfBedrooms.some(id => ['8'].includes(id));
        this.sevenBedroomSelect = this.noOfBedrooms.some(id => ['7'].includes(id));
        this.oneBathroomSelect = this.noOfBathrooms.some(id => ['24750', '1'].includes(id));
        this.twoBathroomSelect = this.noOfBathrooms.some(id => ['24751', '2'].includes(id));
        this.threeBathroomSelect = this.noOfBathrooms.some(id => ['24752', '3'].includes(id));
        this.fourBathroomSelect = this.noOfBathrooms.some(id => ['24753', '4'].includes(id));
        this.oneBalcanySelect = this.noOfBalconies.includes('87421');
        this.twoBalcanySelect = this.noOfBalconies.includes('87422');
        this.threeBalcanySelect = this.noOfBalconies.includes('87423');
        this.fourBalcanySelect = this.noOfBalconies.includes('87425');
        this.ImmediateSelect = this.possission.some(id => ['1'].includes(id));
        this.SixMonthsSelect = this.possission.some(id => ['6'].includes(id));
        this.OneYearSelect = this.possission.some(id => ['12'].includes(id));
        this.twoYearSelect = this.possission.some(id => ['24'].includes(id));
        this.readyToMoveSelect = this.projectStatus.some(id => ['50307'].includes(id));
        this.readyToMoveSelect1 = this.projectStatus.some(id => ['138564'].includes(id));
        this.underConstructionSelect = this.projectStatus.some(id => ['50309'].includes(id));
        this.underConstructionSelect1 = this.projectStatus.some(id => ['138565'].includes(id));
        this.newLaunchSelect = this.projectStatus.some(id => ['50310'].includes(id));
        this.preLaunchSelect = this.projectStatus.some(id => ['50308'].includes(id));
        this.parkingSelect = this.amenityId.some(id => ['41'].includes(id));
        this.powerBackupSelect = this.amenityId.some(id => ['32'].includes(id));
        this.cctvSelect = this.amenityId.some(id => ['42'].includes(id));
        this.elevatorSelect = this.amenityId.some(id => ['37'].includes(id));

        // ----------------------------Pradeesh---------------------------------
        const today = new Date().toISOString().split('T')[0];
        const date15 = new Date();
        date15.setDate(date15.getDate() + 15);
        const within15 = date15.toISOString().split('T')[0];
        const date30 = new Date();
        date30.setDate(date30.getDate() + 30);
        const within30 = date30.toISOString().split('T')[0];
        const date5 = new Date();
        date5.setDate(date5.getDate() + 5);
        const immediate = date5.toISOString().split('T')[0];
        // Reset all
        this.ImmediateSelect1 = false;
        this.Within15DaysSelect = false;
        this.Within30DaysSelect = false;
        this.After30DaysSelect = false;
        // Detect selection
        if (this.todaydate === new Date().toISOString().split('T')[0] && this.futuredate === immediate) {
          this.ImmediateSelect1 = true;
        }
        else if (this.todaydate === today && this.futuredate === within15) {
          this.Within15DaysSelect = true;
        }
        else if (this.todaydate === today && this.futuredate === within30) {
          this.Within30DaysSelect = true;
        }
        else if (this.todaydate === within30 && !this.futuredate) {
          this.After30DaysSelect = true;
        }

        const paramsLoc = {
          cityId: this.storage.getItem('CityID'),
          regionid: ''
        };
        this.Service.getlocality(paramsLoc).subscribe((localitys: any) => {
          this.Citylocalitys = localitys['details'].filter((item: any) => this.Localityid.includes(item.locality_IDPK.toString()));
        });

        // this.filterTrigger.next();
        this.showChips = true;
      }
      this.isRestoringFilters = false;
    });

    this.registerForm = this.fb.group({
      projectType: [''],
      minBudget: [''],
      maxBudget: [''],
      posessionWithin: [''],
      locality: [''],
    });
    this.projectcount = 0;
    this.recentSearches = this.getRecentSearches();

    // if (isPlatformBrowser(this.platformId)) {
    //   let node13 = document.createElement('link');
    //   node13.setAttribute(
    //     'href',
    //     'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css'
    //   );
    //   node13.rel = 'stylesheet';
    //   node13.type = 'text/css';
    //   document.getElementsByTagName('head')[0].appendChild(node13);
    // }
    this.activatedRoute.queryParamMap.pipe(takeUntil(this.destroy$)).subscribe(params => {

      const priceOnRequestParam = params.get('price_on_request');
      const leasedParam = params.get('leased'); // ← ADD

      this.Filter.price_on_request = priceOnRequestParam
        ? Number(priceOnRequestParam)
        : 1;

      this.onlyLeased = leasedParam ? Number(leasedParam) : 2;
      this.checkedLeased = this.onlyLeased === 1;

      this.checkedPrice = this.Filter.price_on_request === 2;

      setTimeout(() => {
        if (this.checkedPrice || this.checkedLeased) {
          $('.slider-container-disabled').css('pointer-events', 'none');
          $('.slider-container-disabled').css('opacity', '0.5');
          if (this.checkedPrice) {
            this.current_min = [];
            this.current_max = [];
          }
        } else {
          $('.slider-container-disabled').css('pointer-events', 'unset');
          $('.slider-container-disabled').css('opacity', '1');
        }
      }, 0);;
    });
    this.filterTrigger
      .pipe(debounceTime(300), takeUntil(this.destroy$))
      .subscribe(() => {
        if (!this.isRestoringFilters) {
          this.updatecount();
        }
      });
  }

  loadNoUiSlider(): void {
    if (isPlatformBrowser(this.platformId)) {
      let node3: any = document.createElement('link');
      node3.href = 'https://cdnjs.cloudflare.com/ajax/libs/noUiSlider/15.6.1/nouislider.min.css';
      node3.rel = 'stylesheet';
      node3.async = true;
      document.getElementsByTagName('head')[0].appendChild(node3);
      let node: any = document.createElement('script');
      node.src = 'https://cdnjs.cloudflare.com/ajax/libs/noUiSlider/15.6.1/nouislider.min.js';
      node.type = 'text/javascript';
      node.async = true;
      node.charset = 'utf-8';
      node.onload = () => {
        this.initializeSlider();
      };
      document.getElementsByTagName('head')[0].appendChild(node);
    }


  }

  updatecount() {
    if (this.SelectedType == 'Buy') {
      var param = {
        proptypeid: this.projecttype,
        locality: this.Localityid,
        property_minprice: this.current_min,
        property_maxprice: this.current_max,
        price_on_request: this.Filter.price_on_request,
        area_min: this.area_min,
        area_max: this.area_max,
        bedroom: this.noOfBedrooms,
        bathroom: this.noOfBathrooms,
        possission: this.possission,
        statusid: this.projectStatus,
        amenityId: this.amenityId
      };
      this.submitApplicationLoader = true;
      this.Service.getprojectscount(this.selectedCity, param).subscribe((countprojects: any) => {
        if (countprojects['status'] === 'True') {
          this.submitApplicationLoader = false;
          let projectcount = countprojects['Counts'];
          this.projectcount = projectcount[0].PropertyCounts;
        } else {
          this.projectcount = 0;
          this.submitApplicationLoader = false;
        }
      });
    } else if (this.SelectedType == 'Rent') {
      var param1 = {
        proptypeid: this.projecttype,
        locality: this.Localityid,
        bedroom: this.noOfBedrooms,
        bathroom: this.noOfBathrooms,
        price_on_request: this.Filter.price_on_request,
        only_lease: this.onlyLeased,
        minprice: this.current_min,
        maxprice: this.current_max,
        area_min: this.area_min,
        area_max: this.area_max,
        balcony: this.Balcony,
        furnish: this.FurnishType,
        ownership: this.OwnerShip,
        doorface: this.selectedFacings,
        tenant: this.selectedTenant,
        fromdate: this.todaydate,
        todate: this.futuredate,
        amenityId: this.amenityId,
        floorid: this.FilterBYFloors,
      }
      // alert(this.onlyLeased)
      this.submitApplicationLoader = true;
      this.Service.getRentprojectscount(this.selectedCity, param1).subscribe((countprojects: any) => {
        if (countprojects['status'] === 'True') {
          this.submitApplicationLoader = false;
          let projectcount = countprojects['Counts'];
          this.projectcount = projectcount[0].PropertyCounts;
        } else {
          this.projectcount = 0;
        }
      })
    } else if (this.SelectedType == 'PG') {
      var param2 = {
        localityId: this.Localityid,
        suited_for: this.Suitable_For_Type,
        food_included: this.Food_Included_Type,
        sharing_type: this.Sharing_Type,
        pg_type: this.PG_For_Type,
        price_min: this.current_min,
        price_max: this.current_max,
      };
      this.submitApplicationLoader = true;
      this.Service.PGRentCount(this.selectedCity, param2).subscribe((countprojects: any) => {
        if (countprojects['status'] === 'True') {
          this.submitApplicationLoader = false;
          let projectcount = countprojects['Counts'];
          this.projectcount = projectcount[0].PropertyCounts;
        } else {
          this.projectcount = 0;
        }
      })
    } else if (this.SelectedType == 'Commercial') {
      var param3 = {
        commerical_type: this.commercialPropertyType,
        locality: this.Localityid,
        sale_rent: this.sale_rent,
        todate: this.todaydate,
        on_request: this.Filter.price_on_request,
        only_lease: this.onlyLeased,
        fromdate: this.futuredate,
        area_max: this.area_max,
        area_min: this.area_min,
        Property_Age: this.propertyAgeListvalue,
        Furnishing: this.furnishTypeListvalue,
        minprice: this.current_min,
        maxprice: this.current_max,
        Building_type: this.buildingTypeListvalue,
      }
      this.submitApplicationLoader = true;
      this.Service.commercialSalePropertiesCount(this.selectedCity, param3).subscribe((countprojects: any) => {
        if (countprojects['status'] === 'True') {
          this.submitApplicationLoader = false;
          let projectcount = countprojects['Counts'];
          this.projectcount = projectcount[0].PropertyCounts;
        } else {
          this.projectcount = 0;
        }
      })
    } else if (this.SelectedType == 'Resale') {
      var param4 = {
        proptypeid: this.projecttype,
        locality: this.Localityid,
        bedroom: this.noOfBedrooms,
        bathroom: this.noOfBathrooms,
        minprice: this.current_min,
        maxprice: this.current_max,
        area_min: this.area_min,
        area_max: this.area_max,
        amenityId: this.amenityId,
        balcony: this.noOfBalconies,
        statusid: this.projectStatus
      }
      // alert(this.onlyLeased)
      this.submitApplicationLoader = true;
      this.Service.getindividualprojectscount(this.selectedCity, param4).subscribe((countprojects: any) => {
        if (countprojects['status'] === 'True') {
          this.submitApplicationLoader = false;
          let projectcount = countprojects['Counts'];
          this.projectcount = projectcount[0].PropertyCounts;
        } else {
          this.projectcount = 0;
        }
      })
    }
  }

  UpdateSliderBuy() {

    if (isPlatformBrowser(this.platformId)) {

      const slider =
        document.getElementById('price-slider');

      let maxBudgetInLakh =
        this.maxBudget > 10000
          ? Math.ceil(this.maxBudget / 100000 / 10) * 10
          : this.maxBudget;

      let startMin = 10;
      let startMax = maxBudgetInLakh;

      if (this.current_min && this.current_min.length > 0) {
        startMin =
          Number(this.current_min[0]) / 100000;
      }

      if (this.current_max && this.current_max.length > 0) {
        startMax =
          Number(this.current_max[0]) / 100000;
      }

      if (slider && (slider as any).noUiSlider) {

        (slider as any).noUiSlider
          .updateOptions({

            range: {
              min: 10,
              '50%': 100,
              max: maxBudgetInLakh
            },

            start: [startMin, startMax]

          });

      } else {

        this.loadNoUiSlider();

      }
    }
  }

  UpdateSliderResale() {
    if (isPlatformBrowser(this.platformId)) {
      const slider = document.getElementById('price-slider-resale');

      const minBudget = 100000;
      const maxBudget = this.maxBudget > 100000 ? this.maxBudget : 10000000;

      let startMin = minBudget;
      let startMax = maxBudget;

      if (this.current_min?.length) startMin = Number(this.current_min[0]);
      if (this.current_max?.length) startMax = Number(this.current_max[0]);

      if (startMin < minBudget) startMin = minBudget;
      if (startMax > maxBudget) startMax = maxBudget;

      if (slider && (slider as any).noUiSlider) {
        (slider as any).noUiSlider.updateOptions({
          range: {
            min: minBudget,
            '25%': 2500000,
            '50%': 10000000,
            '75%': 50000000,
            max: maxBudget
          },
          start: [startMin, startMax]
        });
      } else {
        this.loadNoUiSlider();
      }
    }
  }

  UpdateSliderRent() {
    if (isPlatformBrowser(this.platformId)) {

      const slider = document.getElementById('price-slider1');

      let maxRentBudget = this.numBudget || 2500000;
      let minRentBudget = 1000;

      let startMin = minRentBudget;
      let startMax = maxRentBudget;

      if (this.current_min?.length) {
        startMin = Number(this.current_min[0]);
      }

      if (this.current_max?.length) {
        startMax = Number(this.current_max[0]);
      }

      if (slider && (slider as any).noUiSlider) {

        (slider as any).noUiSlider.updateOptions({
          range: {
            min: minRentBudget,
            '10%': 10000,
            '50%': 100000,
            max: maxRentBudget
          },
          start: [startMin, startMax]   // ✅ restored
        });

      } else {
        this.loadNoUiSlider();
      }
    }
  }

  UpdateSliderPGRent() {
    if (isPlatformBrowser(this.platformId)) {

      this.numBudget = parseFloat(this.maxBudget);

      const slider = document.getElementById('price-slider2');

      let maxRentBudget = this.numBudget || 50000;
      let minRentBudget = 1000;

      let startMin = minRentBudget;
      let startMax = maxRentBudget;

      if (this.current_min?.length) {
        startMin = Number(this.current_min[0]);
      }

      if (this.current_max?.length) {
        startMax = Number(this.current_max[0]);
      }

      // ✅ Clamp to valid range — prevents slider jumping
      if (startMin < minRentBudget) startMin = minRentBudget;
      if (startMax > maxRentBudget) startMax = maxRentBudget;

      if (slider && (slider as any).noUiSlider) {

        (slider as any).noUiSlider.updateOptions({
          range: {
            min: minRentBudget,
            max: maxRentBudget
          },
          start: [startMin, startMax]
        });

      } else {
        this.loadNoUiSlider();
      }
    }
  }

  UpdateSliderCommercial() {
    if (isPlatformBrowser(this.platformId)) {
      this.numBudget = parseFloat(this.maxBudget);
      this.numArea = parseFloat(this.maxArea);

      const slider = document.getElementById('price-slider3');
      const sqft_slider3 = document.getElementById('sqft-slider2');

      // ─── Budget Slider ───────────────────────────────────────
      if (slider && (slider as any).noUiSlider) {

        // ✅ Match exact same fallback as initializeSlider
        let maxRentBudget = this.numBudget || 2500000;
        let minRentBudget = 1000;

        let startMin = minRentBudget;
        let startMax = maxRentBudget;

        // ✅ Only restore from query params if they exist
        if (this.current_min?.length) {
          startMin = Number(this.current_min[0]);
        }

        if (this.current_max?.length) {
          startMax = Number(this.current_max[0]);
        }

        // ✅ Clamp startMax to valid range — prevents slider jumping to end
        if (startMax > maxRentBudget) {
          startMax = maxRentBudget;
        }

        if (startMin < minRentBudget) {
          startMin = minRentBudget;
        }

        (slider as any).noUiSlider.updateOptions({
          range: {
            min: minRentBudget,
            '10%': 10000,
            '50%': 100000,
            max: maxRentBudget
          },
          start: [startMin, startMax]
        });

      } else {
        this.loadNoUiSlider();
      }
    }
  }
  private parseSliderValue(value: string): number {
    const num = parseFloat(value.replace(/[₹KLCr]/g, ''));
    if (value.includes('Cr')) return num * 10000000;
    if (value.includes('L')) return num * 100000;
    if (value.includes('K')) return num * 1000;
    return num;
  }
  initializeSlider(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.numBudget = parseFloat(this.maxBudget);
      this.numArea = parseFloat(this.maxArea);
      const price_slider = document.getElementById('price-slider');
      const price_slider1 = document.getElementById('price-slider1');
      const price_slider2 = document.getElementById('price-slider2');
      const price_slider3 = document.getElementById('price-slider3');
      const price_slider_resale = document.getElementById('price-slider-resale');

      // alert(this.currentMin +this.currentMax)

      const noUiSlider = (window as any).noUiSlider;
      // alert(this.currentMin +this.currentMax)


      if (this.SelectedType == 'Buy') {

        let maxBudgetInLakh = this.numBudget > 10000
          ? Math.ceil(this.numBudget / 100000 / 10) * 10
          : this.numBudget;

        let startMin = 10;
        let startMax = maxBudgetInLakh;

        if (this.current_min?.length) startMin = Number(this.current_min[0]) / 100000;
        if (this.current_max?.length) startMax = Number(this.current_max[0]) / 100000;

        if (price_slider && noUiSlider) {

          if ((price_slider as any).noUiSlider) {
            (price_slider as any).noUiSlider.destroy();
          }

          noUiSlider.create(price_slider as any, {
            start: [startMin, startMax],
            connect: true,
            range: { min: 10, '50%': 100, max: maxBudgetInLakh },
            step: 10,
            tooltips: false,
            format: {
              to: (value: any) => {
                value = Math.round(value);
                return value >= 100 ? `₹${value / 100} Cr` : `₹${value} L`;
              },
              from: (value: any) => {
                const num = parseFloat(value.replace(/₹|L|Cr/g, ''));
                return value.includes('Cr') ? num * 100 : num;
              }
            }
          });

          const minEl = document.getElementById('current-min');
          const maxEl = document.getElementById('current-max');

          (price_slider as any).noUiSlider.on('update', (values: string[]) => {
            this.currentMin = values[0];
            this.currentMax = values[1];
            if (minEl) minEl.innerHTML = this.currentMin;
            if (maxEl) maxEl.innerHTML = this.currentMax;
          });

          (price_slider as any).noUiSlider.on('slide', (values: string[], handle: number) => {
            const value = parseFloat(values[handle].replace(/₹|L|Cr/g, ''));
            (price_slider as any).noUiSlider.updateOptions({ step: value >= 100 ? 100 : 10 });
          });

          (price_slider as any).noUiSlider.on('change', (values: string[]) => {
            const rawMin = parseFloat(values[0].replace(/₹|L|Cr/g, '')) * (values[0].includes('Cr') ? 10000000 : 100000);
            const rawMax = parseFloat(values[1].replace(/₹|L|Cr/g, '')) * (values[1].includes('Cr') ? 10000000 : 100000);
            this.current_min = [rawMin];
            this.current_max = [rawMax];
            this.updateQueryParams();
          });
        }

        // ─── RENT ───────────────────────────────────────────────────
      } else if (this.SelectedType == 'Rent') {

        const minRentBudget = 500;
        const maxRentBudget = this.numBudget || 2500000;

        let startMin = minRentBudget;
        let startMax = maxRentBudget;
        // console.log(startMin)
        // console.log(startMax)

        if (this.current_min?.length) startMin = Number(this.current_min[0]);
        if (this.current_max?.length) startMax = Number(this.current_max[0]);

        if (price_slider1 && noUiSlider) {

          if ((price_slider1 as any).noUiSlider) {
            (price_slider1 as any).noUiSlider.destroy();
          }

          noUiSlider.create(price_slider1 as any, {
            start: [startMin, startMax],
            connect: true,
            range: { min: minRentBudget, '10%': 10000, '50%': 100000, max: maxRentBudget },
            step: 500,
            tooltips: false,
            format: {
              to: (value: any) => {
                if (value >= 10000000) return '₹' + (value / 10000000).toFixed(2) + 'Cr';
                if (value >= 100000) return '₹' + (value / 100000).toFixed(0) + 'L';
                if (value >= 1000) return '₹' + (value / 1000).toFixed(0) + 'K';
                return '₹' + value;
              },
              from: (value: any) => {
                value = value.replace('₹', '');
                if (value.includes('Cr')) return parseFloat(value.replace('Cr', '')) * 10000000;
                if (value.includes('L')) return parseFloat(value.replace('L', '')) * 100000;
                if (value.includes('K')) return parseFloat(value.replace('K', '')) * 1000;
                return parseFloat(value);
              }
            }
          });

          const minEl = document.getElementById('current-min1');
          const maxEl = document.getElementById('current-max1');

          (price_slider1 as any).noUiSlider.on('update', (values: string[]) => {

            this.currentMin1 = values[0];
            this.currentMax1 = values[1];

            if (minEl) minEl.innerHTML = this.currentMin1;
            if (maxEl) maxEl.innerHTML = this.currentMax1;

          });

          (price_slider1 as any).noUiSlider.on('slide', (values: string[], handle: number) => {

            const raw = this.parseSliderValue(values[handle]);

            (price_slider1 as any).noUiSlider.updateOptions({
              step: raw >= 100000 ? 10000 : 500
            });

          });

          (price_slider1 as any).noUiSlider.on('change', (values: string[]) => {

            this.current_min = [this.parseSliderValue(values[0])];
            this.current_max = [this.parseSliderValue(values[1])];
            // alert(this.current_min)
            // alert(this.current_max)

            this.updateQueryParams();

          });

        }
      } else if (this.SelectedType == 'PG') {
        const minRentBudget = 1000;
        const maxRentBudget = this.numBudget || 50000;

        let startMin = minRentBudget;
        let startMax = maxRentBudget;

        startMin = this.current_min?.[0] ? Number(this.current_min[0]) : minRentBudget;
        startMax = this.current_max?.[0] ? Number(this.current_max[0]) : maxRentBudget;

        if (price_slider2 && noUiSlider) {

          if ((price_slider2 as any).noUiSlider) {
            (price_slider2 as any).noUiSlider.destroy();
          }

          noUiSlider.create(price_slider2 as any, {
            start: [startMin, startMax],
            connect: true,
            range: { min: minRentBudget, max: maxRentBudget },
            step: 1000,
            tooltips: false,
            format: {
              to: (value: any) => value >= 1000 ? '₹' + Math.round(value / 1000) + 'K' : '₹' + value,
              from: (value: any) => {
                value = value.replace('₹', '');
                return value.includes('K')
                  ? parseInt(value.replace('K', ''), 10) * 1000
                  : parseFloat(value);
              }
            }
          });

          const minEl = document.getElementById('current-min3');
          const maxEl = document.getElementById('current-max3');

          (price_slider2 as any).noUiSlider.on('update', (values: string[]) => {

            this.currentMin3 = values[0];
            this.currentMax3 = values[1];

            if (minEl) minEl.innerHTML = values[0];
            if (maxEl) maxEl.innerHTML = values[1];

          });

          (price_slider2 as any).noUiSlider.on('change', (values: string[]) => {

            this.current_min = [this.parseSliderValue(values[0])];
            this.current_max = [this.parseSliderValue(values[1])];

            this.updateQueryParams();

          });

        }
      } else if (this.SelectedType == 'Commercial') {
        const minRentBudget = 1000;
        const maxRentBudget = this.numBudget || 2500000;

        let startMin = minRentBudget;
        let startMax = maxRentBudget;

        if (this.current_min?.length) startMin = Number(this.current_min[0]);
        if (this.current_max?.length) startMax = Number(this.current_max[0]);

        if (price_slider3 && noUiSlider) {

          if ((price_slider3 as any).noUiSlider) {
            (price_slider3 as any).noUiSlider.destroy();
          }

          noUiSlider.create(price_slider3 as any, {
            start: [startMin, startMax],
            connect: true,
            range: { min: minRentBudget, '10%': 10000, '50%': 100000, max: maxRentBudget },
            step: 500,
            tooltips: false,
            format: {
              to: (value: any) => {
                if (value >= 10000000) return '₹' + (value / 10000000).toFixed(2) + 'Cr';
                if (value >= 100000) return '₹' + (value / 100000).toFixed(0) + 'L';
                if (value >= 1000) return '₹' + (value / 1000).toFixed(0) + 'K';
                return '₹' + value;
              },
              from: (value: any) => {
                value = value.replace('₹', '');
                if (value.includes('Cr')) return parseFloat(value.replace('Cr', '')) * 10000000;
                if (value.includes('L')) return parseFloat(value.replace('L', '')) * 100000;
                if (value.includes('K')) return parseFloat(value.replace('K', '')) * 1000;
                return parseFloat(value);
              }
            }
          });

          const minEl = document.getElementById('current-min2');
          const maxEl = document.getElementById('current-max2');

          (price_slider3 as any).noUiSlider.on('update', (values: string[]) => {

            this.currentMin2 = values[0];
            this.currentMax2 = values[1];

            if (minEl) minEl.innerHTML = values[0];
            if (maxEl) maxEl.innerHTML = values[1];

          });

          (price_slider3 as any).noUiSlider.on('change', (values: string[]) => {

            this.current_min = [this.parseSliderValue(values[0])];
            this.current_max = [this.parseSliderValue(values[1])];

            this.updateQueryParams();

          });

        }
      } else if (this.SelectedType == 'Resale') {

        const price_slider_resale = document.getElementById('price-slider-resale');
        const sqft_slider_resale = document.getElementById('sqft-slider-resale');

        // ✅ Use raw rupee values like Rent/Commercial — no Lakh unit conversion
        const minBudget = 100000;          // ₹1 L
        const maxBudget = this.numBudget > 100000
          ? this.numBudget
          : 10000000;                      // fallback ₹1 Cr

        let startMin = minBudget;
        let startMax = maxBudget;

        if (this.current_min?.length) startMin = Number(this.current_min[0]);
        if (this.current_max?.length) startMax = Number(this.current_max[0]);

        // Clamp to valid range
        if (startMin < minBudget) startMin = minBudget;
        if (startMax > maxBudget) startMax = maxBudget;

        if (price_slider_resale && noUiSlider) {

          if ((price_slider_resale as any).noUiSlider) {
            (price_slider_resale as any).noUiSlider.destroy();
          }

          noUiSlider.create(price_slider_resale as any, {
            start: [startMin, startMax],
            connect: true,
            // ✅ Same pattern as Commercial — raw rupee breakpoints, NO dynamic step
            range: {
              min: minBudget,          // 1 L
              '25%': 2500000,          // 25 L
              '50%': 10000000,         // 1 Cr
              '75%': 50000000,         // 5 Cr
              max: maxBudget
            },
            step: 100000,              // ✅ Fixed step — 1 Lakh, no dynamic switching
            tooltips: false,
            format: {
              to: (value: any) => {
                value = Math.round(value);
                if (value >= 10000000) return `₹${(value / 10000000).toFixed(2)} Cr`;
                if (value >= 100000) return `₹${(value / 100000).toFixed(0)} L`;
                return `₹${value}`;
              },
              from: (value: any) => {
                value = value.replace('₹', '').trim();
                if (value.includes('Cr')) return parseFloat(value.replace('Cr', '')) * 10000000;
                if (value.includes('L')) return parseFloat(value.replace('L', '')) * 100000;
                return parseFloat(value);
              }
            }
          });

          const minEl = document.getElementById('current-min4');
          const maxEl = document.getElementById('current-max4');

          // ✅ No slide event needed — fixed step means no jumps
          (price_slider_resale as any).noUiSlider.on('update', (values: string[]) => {
            this.currentMin4 = values[0];
            this.currentMax4 = values[1];
            if (minEl) minEl.innerHTML = this.currentMin4;
            if (maxEl) maxEl.innerHTML = this.currentMax4;
          });

          (price_slider_resale as any).noUiSlider.on('change', (values: string[]) => {
            this.current_min = [this.parseSliderValue(values[0])];
            this.current_max = [this.parseSliderValue(values[1])];
            this.updateQueryParams();
          });
        }

        // ─── Area Slider (unchanged) ──────────────────────────────────
        if (sqft_slider_resale && noUiSlider) {

          if ((sqft_slider_resale as any).noUiSlider) {
            (sqft_slider_resale as any).noUiSlider.destroy();
          }

          const maxArea = this.numArea || 100000;
          const startMinSqft = this.area_min?.length ? Number(this.area_min[0]) : 100;
          const startMaxSqft = this.area_max?.length ? Number(this.area_max[0]) : maxArea;

          noUiSlider.create(sqft_slider_resale as any, {
            start: [startMinSqft, startMaxSqft],
            connect: true,
            range: {
              min: [100, 100],
              '25%': [1000, 500],
              '50%': [5000, 1000],
              max: maxArea
            },
            tooltips: false,
            format: {
              to: (value: number) => `${Math.round(value)} sqft`,
              from: (value: string) => parseFloat(value.replace(' sqft', ''))
            }
          });

          const minEl = document.getElementById('current-min-Sqft-resale');
          const maxEl = document.getElementById('current-max-Sqft-resale');

          (sqft_slider_resale as any).noUiSlider.on('update', (values: string[]) => {
            this.currentMinSqft3 = values[0];
            this.currentMaxSqft3 = values[1];
            if (minEl) minEl.innerHTML = values[0];
            if (maxEl) maxEl.innerHTML = values[1];
          });

          (sqft_slider_resale as any).noUiSlider.on('change', (values: string[]) => {
            this.area_min = [parseInt(values[0])];
            this.area_max = [parseInt(values[1])];
            this.updateQueryParams();
          });
        }
      }


      const sqft_slider1 = document.getElementById('sqft-slider');
      const sqft_slider2 = document.getElementById('sqft-slider1');
      const sqft_slider3 = document.getElementById('sqft-slider2');
      const noUiSlider1 = (window as any).noUiSlider;

      const initSqftSlider = (slider: HTMLElement, minDisplayId: string, maxDisplayId: string) => {

        if ((slider as any).noUiSlider) {
          (slider as any).noUiSlider.destroy();
        }

        const maxArea = this.numArea || 10000;
        const startMin = this.area_min?.length ? Number(this.area_min[0]) : 100;
        const startMax = this.area_max?.length ? Number(this.area_max[0]) : maxArea;

        noUiSlider1.create(slider, {
          start: [startMin, startMax],
          connect: true,
          range: {
            min: [100, 100],      // step 100 from 100
            '25%': [1000, 500],   // step 500 from 1000
            '50%': [5000, 1000],  // step 1000 from 5000
            max: maxArea
          },
          tooltips: false,
          format: {
            to: (value: number) => `${value} sqft`,
            from: (value: string) => parseFloat(value.replace(' sqft', ''))
          }
        });

        const minEl = document.getElementById(minDisplayId);
        const maxEl = document.getElementById(maxDisplayId);

        (slider as any).noUiSlider.on('update', (values: string[]) => {
          const [minSqft, maxSqft] = values.map(v => parseInt(v));
          if (minEl) minEl.innerHTML = `${minSqft} sqft`;
          if (maxEl) maxEl.innerHTML = `${maxSqft} sqft`;
        });

        (slider as any).noUiSlider.on('change', (values: string[]) => {
          this.area_min = [parseInt(values[0])];
          this.area_max = [parseInt(values[1])];
          this.updateQueryParams();
        });

      };

      if (this.SelectedType === 'Buy' && sqft_slider1 && noUiSlider1) {
        initSqftSlider(sqft_slider1, 'current-min-Sqft', 'current-max-Sqft');

      } else if (this.SelectedType === 'Rent' && sqft_slider2 && noUiSlider1) {
        initSqftSlider(sqft_slider2, 'current-min-Sqft1', 'current-max-Sqft1');

      } else if (this.SelectedType === 'Commercial' && sqft_slider3 && noUiSlider1) {
        initSqftSlider(sqft_slider3, 'current-min-Sqft2', 'current-max-Sqft2');
      }
    }
  }



  CloseModal() {
    if (isPlatformBrowser(this.platformId)) {
      $('#FirstCityModal').modal('hide');
      $('.head_stick').css('display', 'block');
      $('.modal-backdrop').removeClass('modal-backdrop fade show');
    }
  }

  CloseModal1() {
    if (isPlatformBrowser(this.platformId)) {
      this.cityservice.cityfinder('reset');
      var value = this.cityservice.cityfinder(this.router.url);
      let cityId = value.cityid;
      if (cityId == undefined || cityId == null) {
        $('#filterModal').modal('hide');
        $('#FirstCityModal').modal('hide');
        $('#SecondCityModal').modal('show');
      } else {
        $('#SecondCityModal').modal('hide');
        $('#filterModal').modal('hide');
        $('#FirstCityModal').modal('hide');
        $('.head_stick').css('display', 'block');
      }
      $('.modal-backdrop').removeClass('modal-backdrop fade show');
    }
  }

  FirstModalOpen() {
    if (isPlatformBrowser(this.platformId)) {
      this.selectedCity = undefined;
      $('#SecondCityModal').modal('hide');
      $('#FirstCityModal').modal('show');
      this.resetToggleShowMore();
      $('.modal-backdrop').removeClass('modal-backdrop fade show');
    }
  }

  ThirdModalOpen() {
    if (isPlatformBrowser(this.platformId)) {
      $('#FirstCityModal').modal('hide');
      $('#filterModal').modal('hide');
      $('#SecondCityModal').modal('show');
    }
  }

  async LocalityModalOpen(item: any) {

    if (this.Localityid.length >= 6) {
      // console.log(this.Localityid)
      const Swal = await this.getSwal();
      Swal.fire({
        title: 'Locality limit exceeded',
        icon: 'warning',
        showConfirmButton: false,
        timer: 1500,
        target: 'body'
      });
      return;
    }
    const transformedObject = {
      LocalityId: item.id,
      locality_name: item.localityname
    };
    this.storage.setItem('LocalityName', item.localityname);

    const isDuplicate = this.testArray.some(obj => String(obj.LocalityId) === String(item.id))
      || this.Localityid.some((id: any) => String(id) === String(item.id));

    if (!isDuplicate) {
      this.testArray.push(transformedObject);
      this.SelectedLocality_id.push(item.id);
      this.Localityid.push(item.id);

      this.Service.mouseenterservice4();
      if (isPlatformBrowser(this.platformId)) {
        $('#filterModal').modal('show');
      }
      this.Service.getNearlocalities(item.id).subscribe((prop: any) => {

        const nearByLocality = prop['details'] || [];

        const nearbyLocalities = nearByLocality
          .map((x: any) => x['locality'][0])
          .filter((loc: any) =>
            !this.testArray.some(
              sel => String(sel.LocalityId) === String(loc.LocalityId)
            )
          );
        const requiredCount = 6 - this.testArray.length;

        this.newNearByLocalityArry = [
          ...this.testArray,
          ...nearbyLocalities.slice(0, requiredCount)
        ].slice(0, 6);
        // this.SelectedLocalityName.push(...this.testArray)
        this.SelectedLocalityName = [...this.testArray];
      });
    } else {
      const Swal = await this.getSwal();
      Swal.fire({
        title: 'Locality already exists',
        icon: 'warning',
        showConfirmButton: false,
        timer: 1500,
        target: 'body'
      });
      if (isPlatformBrowser(this.platformId)) {
        $('#filterModal').modal('show');
      }
    }
    this.updateQueryParams();
    // console.log(this.SelectedLocalityName);

  }

  SecondModalOpen(item: any) {
    // alert("here ")
    this.selectedCity = item;
    var CityName = item || $('#City_Name').val();
    this.clickedCityName = CityName;

    if (this.selectedCity == undefined) {
    } else if (this.selectedCity == CityName) {
      this.SelectedLocalityName = [];
      this.testArray = [];
      // console.log('Before reset', this.testArray);
      this.newNearByLocalityArry = [];
      this.storage.setItem('CityName', CityName);

      // Remove stale backdrop from FirstCityModal
      $('.modal-backdrop').remove();
      $('body').removeClass('modal-open');
      $('body').css('padding-right', '');
      $('#SecondCityModal').modal('show');

      // }
      // if (isPlatformBrowser(this.platformId)) {

      //   // this.clickedCityName = city;

      //   const firstModal = $('#FirstCityModal');

      //   // Close ONLY first modal
      //   firstModal.modal('hide');

      //   // When it's fully closed → open second
      //   firstModal.one('hidden.bs.modal', () => {
      //     $('#SecondCityModal').modal('show');
      //   });
      // }
      this.SearchDropdownMainCityComponent.ValuePAssing();
      var lowercasecityname = CityName.toLowerCase();
      var value = this.cityservice.cityfinder(lowercasecityname);
      this.cityid = value.cityid;
      const prevCityId = this.storage.getItem('CityID');

      if (prevCityId && String(prevCityId) !== String(this.cityid)) {

        this.skipLocalityRestore = true;
        this.Localityid = [];
        this.SelectedLocality_id = [];
        this.testArray = [];
        this.SelectedLocalityName = [];
        this.newNearByLocalityArry = []

        // this.router.navigate([], {
        //   queryParams: { localityid: null },
        //   queryParamsHandling: 'merge'
        // }).then(() => {
        //   this.skipLocalityRestore = false; 

        // });

      }
      this.storage.setItem('CityID', this.cityid);

      this.Service.getbuilderAuto(this.cityid).subscribe((myLocalList: any) => {
        this.autoCompleteData_build = myLocalList['autolist'];
      });
      var param = {
        cityid: this.cityid,
      };
      var paramss = {
        cityId: this.cityid,
      };
      this.Service2.gettrendingprojects(param).subscribe((trend: any) => {
        this.trending = trend['Trending'][0]['properties'];
        if (this.trending == 0) {
          this.trendingdiv = false;
        } else {
          this.trendingdiv = true;
        }
      });
      this.Service.getTopLocalities(paramss).subscribe((responce: any) => {
        this.topLocalitiesList = responce['localitylimitlist'];
      });

      if (this.loadcomponent == false) {
        import('../ejs-autocomplete/ejs-autocomplete')
          .then(c => {
            this.Ejscomponent = c.EjsAutocomplete;
            this.loadcomponent = true;
          });
      } else {
        this.Service.mouseenterservice4();
      }
    }

    this.activatedRoute.queryParams.pipe(take(1)).subscribe(params => {
      if (this.skipLocalityRestore) return;
      if (params['localityid']) {
        this.Localityid = params['localityid']?.split(',').map((id: string) => id.trim()) || [];

        if (this.Localityid.length === 0) {
          return;
        }
        const lastlocalityid = this.Localityid[this.Localityid.length - 1];
        this.SelectedLocalityName = [];
        const localityPromises = this.Localityid.map(localityId => {
          const paramlocality = {
            locid: localityId
          };
          const currentCity = '';
          return this.Service.getlocalitymeta(currentCity, paramlocality).pipe(
            map((metatag: any) => {
              const metatags = metatag['Localityseo'];
              if (metatags.length > 0) {
                return {
                  LocalityId: metatags[0].locality_IDPK,
                  locality_name: metatags[0].LocalityName
                };
              }
              return null;
            })
          );
        });
        forkJoin(localityPromises).subscribe(selectedLocalities => {
          // console.log('After reset', this.testArray);
          // Restore selected localities
          this.SelectedLocalityName = selectedLocalities.filter(Boolean);

          // If no locality selected, stop
          if (!this.SelectedLocalityName.length) {
            this.newNearByLocalityArry = [];
            return;
          }

          // Use last selected locality to fetch nearby
          const lastLocalityId =
            this.SelectedLocalityName[this.SelectedLocalityName.length - 1].LocalityId;

          this.Service.getNearlocalities(lastLocalityId).subscribe((prop: any) => {

            const nearByLocality = prop['details'] || [];

            // Extract nearby locality objects
            const nearbyLocalities = nearByLocality
              .map((item: any) => item['locality'][0])
              .filter((loc: any) =>
                !this.SelectedLocalityName.some(
                  sel => String(sel.LocalityId) === String(loc.LocalityId)
                )
              );

            // Calculate how many more needed
            const requiredCount = 6 - this.SelectedLocalityName.length;

            // Merge selected + nearby
            this.newNearByLocalityArry = [
              ...this.SelectedLocalityName,
              ...nearbyLocalities.slice(0, requiredCount)
            ].slice(0, 6);
            // console.log(this.newNearByLocalityArry);
            // this.testArray.push(...this.SelectedLocalityName);
            this.testArray = [...this.SelectedLocalityName];

          });

        });

      }
    });

    if (this.router.url.includes('/rent/') || this.router.url.includes('/rental/')) {
      this.getfilterdatalist();
    } else if (this.router.url.indexOf('/cll/') > -1) {
      this.commercialDataFilter();
    } else if (this.router.url.indexOf('/pgcl/pg-for-rent-in-') > -1) {
      this.PgDataFilters();
    } else if (this.router.url.indexOf('/projects-in-') > -1) {
      this.ResaleDataFilters();
    } else {
      this.getbhkList();
    }
    this.FromCitySelecting = true;
    this.filterTrigger.next();
    // console.log(this.SelectedLocalityName);

  }

  getlocationlist() {
    this.allindia.getlocationlist().subscribe((city: any) => {
      this.citiesss = city['locations'];
      for (let i = 0; i < this.topCitiesMy.length; i++) {
        this.citiesss = this.citiesss?.filter((item: any) => item.city);
      }
      this.Allcities = city['locations'];
      for (let i = 0; i < this.topCitiesMy.length; i++) {
        this.Allcities = this.Allcities?.filter(
          (item: any) => item.city !== this.topCitiesMy[i].item
        );
      }
    });
  }


  // GowshikTest() {
  //   const localityPromises = this.Localityid.map(localityId => {
  //     const paramlocality = {
  //       locid: localityId
  //     };
  //     const currentCity = '';
  //     return this.Service.getlocalitymeta(currentCity, paramlocality).pipe(
  //       map((metatag: any) => {
  //         const metatags = metatag['Localityseo'];
  //         if (metatags.length > 0) {
  //           return {
  //             LocalityId: metatags[0].locality_IDPK,
  //             locality_name: metatags[0].LocalityName
  //           };
  //         }
  //         return null;
  //       })
  //     );
  //   });
  //   forkJoin(localityPromises).subscribe(selectedLocalities => {
  //     // console.log('After reset', this.testArray);
  //     // Restore selected localities
  //     this.SelectedLocalityName = selectedLocalities.filter(Boolean);

  //     // If no locality selected, stop
  //     if (!this.SelectedLocalityName.length) {
  //       this.newNearByLocalityArry = [];
  //       return;
  //     }

  //     // Use last selected locality to fetch nearby
  //     const lastLocalityId =
  //       this.SelectedLocalityName[this.SelectedLocalityName.length - 1].LocalityId;

  //     this.Service.getNearlocalities(lastLocalityId).subscribe((prop: any) => {

  //       const nearByLocality = prop['details'] || [];

  //       // Extract nearby locality objects
  //       const nearbyLocalities = nearByLocality
  //         .map((item: any) => item['locality'][0])
  //         .filter((loc: any) =>
  //           !this.SelectedLocalityName.some(
  //             sel => String(sel.LocalityId) === String(loc.LocalityId)
  //           )
  //         );

  //       // Calculate how many more needed
  //       const requiredCount = 6 - this.SelectedLocalityName.length;

  //       // Merge selected + nearby
  //       this.newNearByLocalityArry = [
  //         ...this.SelectedLocalityName,
  //         ...nearbyLocalities.slice(0, requiredCount)
  //       ].slice(0, 6);
  //       // console.log(this.newNearByLocalityArry);
  //       this.testArray.push(...this.SelectedLocalityName);

  //     });

  //   });
  // }
  private isRestoringLocality = false;

  GowshikTest() {
    const localityPromises = this.Localityid.map(localityId => {
      const paramlocality = { locid: localityId };
      const currentCity = '';
      return this.Service.getlocalitymeta(currentCity, paramlocality).pipe(
        map((metatag: any) => {
          const metatags = metatag['Localityseo'];
          if (metatags.length > 0) {
            return {
              LocalityId: String(metatags[0].locality_IDPK),
              locality_name: metatags[0].LocalityName
            };
          }
          return null;
        })
      );
    });


    this.isRestoringLocality = true;

    forkJoin(localityPromises).subscribe(selectedLocalities => {

      this.SelectedLocalityName = selectedLocalities.filter(Boolean);
      this.Localityid = this.SelectedLocalityName.map(loc => String(loc.LocalityId));
      this.testArray = [...this.SelectedLocalityName];

      if (!this.SelectedLocalityName.length) {
        this.newNearByLocalityArry = [];
        this.isRestoringLocality = false;
        return;
      }

      const lastLocalityId =
        this.SelectedLocalityName[this.SelectedLocalityName.length - 1].LocalityId;

      this.Service.getNearlocalities(lastLocalityId).subscribe((prop: any) => {

        const nearByLocality = prop['details'] || [];

        const nearbyLocalities = nearByLocality
          .map((item: any) => item['locality'][0])
          .filter((loc: any) =>
            loc &&
            !this.SelectedLocalityName.some(
              sel => String(sel.LocalityId) === String(loc.LocalityId)
            )
          );

        const requiredCount = 6 - this.SelectedLocalityName.length;

        this.newNearByLocalityArry = [
          ...this.SelectedLocalityName,
          ...nearbyLocalities.slice(0, requiredCount)
        ].slice(0, 6);


        this.isRestoringLocality = false;

      });

    });
  }
  private localitySub: any;


  // Lazyload() {

  //   myValue.subscribe(updatedValue => {

  //     this.SelectedLocality = updatedValue;
  //     this.Localityid = this.SelectedLocalityName.map(
  //       item => String(item.LocalityId)
  //     );
  //     // alert(this.Localityid)
  //     updatedValue.forEach((item) => {

  //       if (this.Localityid.includes(String(item.LocalityId))) {
  //         Swal.fire({
  //           title: 'Already locality name exist',
  //           icon: 'warning',
  //           showConfirmButton: false,
  //           timer: 1500,
  //           target: 'body'
  //         });
  //         return;
  //       }


  //       if (this.SelectedLocalityName.length >= 6) {
  //         Swal.fire({
  //           title: 'Locality limit exceeded',
  //           icon: 'warning',
  //           showConfirmButton: false,
  //           timer: 1500,
  //           target: 'body'
  //         });
  //         return;
  //       }

  //       this.Localityid.push(String(item.LocalityId));

  //       this.testArray.push(item);

  //       this.SelectedLocalityName = Array.from(
  //         new Map(
  //           [...this.SelectedLocalityName, item]
  //             .map(loc => [loc.LocalityId, loc])
  //         ).values()
  //       );

  //       this.Service.getNearlocalities(item.LocalityId).subscribe(prop => {

  //         const nearByLocality = prop['details'] || [];

  //         if (nearByLocality.length > 0) {

  //           const requiredCount = 6 - this.SelectedLocalityName.length;

  //           const nearbyLocalities = nearByLocality
  //             .map(n => n['locality'][0])
  //             .filter(loc =>
  //               !this.SelectedLocalityName.some(
  //                 sel => sel.LocalityId === loc.LocalityId
  //               )
  //             )
  //             .slice(0, requiredCount);

  //           this.newNearByLocalityArry = [
  //             ...this.SelectedLocalityName,
  //             ...nearbyLocalities
  //           ].slice(0, 6);

  //         } else {
  //           this.newNearByLocalityArry = [...this.SelectedLocalityName];
  //         }

  //       });

  //       this.updateQueryParams();

  //     });
  //     this.filterTrigger.next();
  //   });
  // }


  async Lazyload() {
    myValue.pipe(
      takeUntil(this.destroy$)
    ).subscribe(async updatedValue => {

      // safety check — ignore empty resets
      if (!updatedValue || updatedValue.length === 0) return;

      // take only last selected item
      const item = updatedValue[updatedValue.length - 1];

      // current selected ids
      this.Localityid = this.SelectedLocalityName.map(
        item => String(item.LocalityId)
      );

      // duplicate check
      if (this.Localityid.includes(String(item.LocalityId))) {
        const Swal = await this.getSwal();
        Swal.fire({
          title: 'Already locality name exist',
          icon: 'warning',
          showConfirmButton: false,
          timer: 1500,
          target: 'body'
        });
        return;
      }

      // limit check
      if (this.SelectedLocalityName.length >= 6) {
        const Swal = await this.getSwal();
        Swal.fire({
          title: 'Locality limit exceeded',
          icon: 'warning',
          showConfirmButton: false,
          timer: 1500,
          target: 'body'
        });
        return;
      }

      // push new locality id
      this.Localityid.push(String(item.LocalityId));
      this.testArray.push(item);

      // merge + deduplicate SelectedLocalityName
      this.SelectedLocalityName = Array.from(
        new Map(
          [...this.SelectedLocalityName, item]
            .map(loc => [loc.LocalityId, loc])
        ).values()
      );

      // nearby locality logic
      this.Service.getNearlocalities(item.LocalityId).subscribe(prop => {

        const nearByLocality = prop['details'] || [];

        if (nearByLocality.length > 0) {

          const requiredCount = 6 - this.SelectedLocalityName.length;

          const nearbyLocalities = nearByLocality
            .map(n => n['locality']?.[0])
            .filter(loc =>
              loc &&
              !this.SelectedLocalityName.some(
                sel => sel.LocalityId === loc.LocalityId
              )
            )
            .slice(0, requiredCount);

          this.newNearByLocalityArry = [
            ...this.SelectedLocalityName,
            ...nearbyLocalities
          ].slice(0, 6);

        } else {
          this.newNearByLocalityArry = [...this.SelectedLocalityName];
        }

      });

      // update filters
      this.updateQueryParams();
      this.filterTrigger.next();

    });
  }






  toggleLocality(locality: any) {
    if (this.SelectedLocalityName.includes(locality)) {
      // console.log("toogle locality1" + this.SelectedLocalityName)
      this.SelectedLocalityName = this.SelectedLocalityName.filter((loc) => loc !== locality);
      // console.log("toogle locality removed" + this.SelectedLocalityName)

      var testArray = this.testArray.filter((loc) => loc !== locality);
      this.testArray = testArray;
      this.duplicateID = null

    } else {
      this.SelectedLocalityName.push(locality);
      // console.log("toogle locality2" + this.SelectedLocalityName)
    }
  }

  toggleLocality1(locality: any) {
    const isAlreadySelected = this.SelectedLocalityName.some(
      (loc) => loc.LocalityId === locality.LocalityId
    );

    if (isAlreadySelected) {
      this.SelectedLocalityName = this.SelectedLocalityName.filter(
        (loc) => loc.LocalityId !== locality.LocalityId
      );

      this.testArray = this.testArray.filter(
        (loc) => loc.LocalityId !== locality.LocalityId
      );

      this.duplicateID = null;
    } else {
      this.SelectedLocalityName.push(locality);
    }
  }

  async LocalityIdClick(locality: any): Promise<void> {
    if (this.Localityid.includes(locality)) {
      this.Localityid = this.Localityid.filter((loc) => loc !== locality);
      this.SelectedLocality_id = this.SelectedLocality_id.filter((loc) => loc !== locality);
    } else if (this.Localityid.length == 6) {
      const Swal = await this.getSwal();
      Swal.fire({
        title: 'Already exceeded the locality selection',
        icon: 'warning',
        showConfirmButton: false,
        timer: 1500,
        target: 'body'
      });
      return;
    } else {
      this.Localityid.push(locality);
    }
    this.updateQueryParams();
  }

  resetToggleShowMore(): void {
    if (isPlatformBrowser(this.platformId)) {

      Object.keys(this.isExpanded).forEach((key) => {
        // const id = Number(key); // In original code it cast to Number, key is string in JS object
        this.isExpanded[key] = false;
        $('.toggled-list' + key).css({ 'overflow-y': 'hidden', height: '102px' });
      });
    }
  }

  toggleShowMore(id: number): void {
    if (isPlatformBrowser(this.platformId)) {
      const listElement = document.querySelector(`.toggled-list${id}`) as HTMLElement;
      if (!listElement) return;
      this.isExpanded[id] = !this.isExpanded[id];
      if (this.isExpanded[id]) {
        const contentHeight = listElement.scrollHeight;
        listElement.style.height = `${contentHeight}px`;
        listElement.style.overflowY = 'auto';
      } else {
        listElement.style.height = '102px';
        listElement.style.overflowY = 'hidden';
      }
    }
  }

  getfilterdatalist() {
    var value = this.cityservice.cityfinder(this.router.url);
    var cityId = value.cityid;
    this.submitApplicationLoader = true;
    this.Service.getrentfilterslistFilter(cityId).subscribe((list: any) => {
      if (list['status'] === 'True') {
        this.submitApplicationLoader = false;
        this.bhklist = list['Bhks'];
        this.balconylist = list['Balcony'];
        this.bathroomlist = list['Bathroom'];
        this.furnishlist = list['Furnish'];
        this.Tenantslist = list['Tenants'];
        this.Ownershiplist = list['Ownership'];
        this.Propertytypelist = list['Propertytype'];
        this.Doorfacelist = list['Doorface'];
        this.Amenitieslist = list['Amenities'];
        this.maxArea = list['MaxArea'];
        this.maxBudget = list['MaxBud'];
        this.UpdateSliderRent();
      }
    });
  }
  ResaleDataFilters() {
    // alert('hai')
    var value = this.cityservice.cityfinder(this.router.url);
    var cityId = value.cityid;
    this.submitApplicationLoader = true;
    this.Service.getindividualfilterslist().subscribe((list: any) => {
      if (list['status'] === 'True') {
        this.submitApplicationLoader = false;
        this.bhklist = list['Bhks'];
        this.balconylist = list['Balcony'];
        this.bathroomlist = list['Bathroom'];
        this.Propertytypelist = list['Propertytype'];
        this.Amenitieslist = list['Amenities'];
        this.maxArea = list['MaxArea'];
        this.maxBudget = list['MaxBud'];
        this.UpdateSliderResale()
      }
    });
  }

  getbhkList() {
    var city = this.storage.getItem('CityName');
    var value = this.cityservice.cityfinder(city);
    var cityId = value.cityid;
    this.maxBudget = [];
    this.maxArea = [];
    this.submitApplicationLoader = true;
    this.Service.getFiltersDatalistSaleTest(cityId).subscribe((response: any) => {
      if (response?.['status'] === 'True') {
        this.submitApplicationLoader = false;
        this.maxArea = response['MaxArea'];
        this.maxBudget = response['MaxBud'];
        this.UpdateSliderBuy();
      }
    });
  }

  PgDataFilters() {
    var city = this.storage.getItem('CityName');
    var value = this.cityservice.cityfinder(city);
    var cityId = value.cityid;
    var param = {
      CityId: cityId
    }
    this.submitApplicationLoader = true;
    this.Service.postPropNewPg(param).subscribe((list: any) => {
      if (list['status'] === 'True') {
        this.submitApplicationLoader = false;
        this.pgRulesList = list['pgRulesList'];
        this.pgServiceList = list['pgServiceList'];
        this.roomTypes = list['roomTypes'];
        this.pgFacilitiesList = list['pgFacilitiesList'];
        this.roomOtherTypes = list['roomOtherTypes'];
        this.pgListingAsList = list['pgListingAsList'];
        this.pgStartedYearList = list['pgStartedYearList'];
        this.pgAvailableForList = list['pgAvailableForList'];
        this.pgNoticePeriodList = list['pgNoticePeriodList'];
        this.pgBestSuitForList = list['pgBestSuitForList'];
        this.pgFoodList = list['meels'];
        this.pgTenantsReturnByList = list['pgTenantsReturnByList'];
        this.pgFoodChargesList = list['pgFoodChargesList'];
        this.pgMealTypeList = list['pgMealTypeList'];
        this.Parking = list['parking'];
        this.imageslist = list['imageslist'];
        this.maxBudget = list['max_bud'];
        this.UpdateSliderPGRent();
      }
    });
  }

  commercialDataFilter() {
    var city = this.storage.getItem('CityName');
    var value = this.cityservice.cityfinder(city);
    var cityId = value.cityid;
    var param = {
      CityId: cityId,
      sale_rent: this.sale_rent,
      typeid: this.commercialPropertyType,
    }
    this.submitApplicationLoader = true;
    this.Service.postPropNewCommercial(param).subscribe((list: any) => {
      if (list['status'] == "True") {
        this.submitApplicationLoader = false;
        this.commercialPropertyTypeList = list['commercialPropertyTypeList'];
        this.commercialListingAsList = list['commercialListingAsList'];
        this.suitedForList = list['suitedForList'];
        this.plotTypeList = list['plotTypeList'];
        this.buildingTypeList = list['buildingTypeList'];
        this.propertyStatusList = list['propertyStatusList'];
        this.furnishTypeList = list['furnishTypeList'];
        this.propertyAgeList = list['propertyAgeList'];
        this.propertyFacingList = list['propertyFacingList'];
        this.lockInPeriodList = list['lockInPeriodList'];
        this.maxArea = list['max_area'];
        this.maxBudget = list['max_bud'];
        this.UpdateSliderCommercial();
      }
    });
  }

  Buyclick() {
    if (!this.BuySelect) {
      this.SelectedType = 'Buy';
      this.RentSelect = false;
      this.ResaleSelect = false;
      this.CommercialSelect = false;
      this.PGSelect = false;
      this.BuySelect = true;
      this.filterTrigger.next();
      this.projecttype = [];
      this.getbhkList();
      this.resetCommonFilters();
      this.Service.mouseenterservice7('Buy');
    }
  }

  Resaleclick() {
    if (!this.ResaleSelect) {
      this.SelectedType = 'Resale';
      this.BuySelect = false;
      this.RentSelect = false;
      this.CommercialSelect = false;
      this.PGSelect = false;
      this.ResaleSelect = true;
      this.filterTrigger.next();
      this.projecttype = [];
      this.ResaleDataFilters();
      this.resetCommonFilters();
      this.Service.mouseenterservice7('Resale');
    }
  }

  Rentclick() {
    if (!this.RentSelect) {
      this.SelectedType = 'Rent';
      this.CommercialSelect = false;
      this.PGSelect = false;
      this.BuySelect = false;
      this.ResaleSelect = false;
      this.RentSelect = true;
      this.filterTrigger.next();
      this.getfilterdatalist();
      this.resetCommonFilters();
      this.Service.mouseenterservice7('Rent');
    }
  }

  BuyCommercialclick() {
    if (!this.BuyCommercialSelect) {
      this.SelectedType = 'Commercial';
      this.RentSelect = false;
      this.CommercialSelect = true;
      this.PGSelect = false;
      this.RentCommercialSelect = false;
      this.ResaleSelect = false;
      this.BuyCommercialSelect = true;
      this.sale_rent = 1;
      this.commercialDataFilter();
      this.filterTrigger.next();
      this.resetCommonFilters();
      this.Service.mouseenterservice7('Commercial');
    }
  }

  RentCommercialclick() {
    if (!this.RentCommercialSelect) {
      this.SelectedType = 'Commercial';
      this.rentCommercial = 'commercialRent';
      this.CommercialSelect = true;
      this.PGSelect = false;
      this.BuySelect = false;
      this.BuyCommercialSelect = false;
      this.ResaleSelect = false;
      this.RentCommercialSelect = true;
      this.sale_rent = 2;
      this.commercialDataFilter();
      this.filterTrigger.next();
      this.resetCommonFilters();
      this.Service.mouseenterservice7('Commercial');
    } else {
      this.rentCommercial = '';
    }
  }

  PGclick() {
    if (!this.PGSelect) {
      this.SelectedType = 'PG';
      this.BuySelect = false;
      this.RentSelect = false;
      this.CommercialSelect = false;
      this.ResaleSelect = false;
      this.PGSelect = true;
      this.filterTrigger.next();
      this.PgDataFilters();
      this.resetCommonFilters();
      this.Service.mouseenterservice7('PG');
    }
  }

  Commercialclick() {
    if (!this.CommercialSelect) {
      this.SelectedType = 'Commercial';
      this.BuyCommercialclick();
      this.BuySelect = false;
      this.RentSelect = false;
      this.ResaleSelect = false;
      this.PGSelect = false;
      this.CommercialSelect = true;
      this.ResidentialSelect = false;
      this.commercialDataFilter();
      this.resetCommonFilters();
      this.Service.mouseenterservice7('Commercial');
    }
  }

  Residentialclick() {
    if (!this.ResidentialSelect) {
      this.SelectedType = 'Residential';
      this.rentCommercial = '';
      this.Buyclick();
      this.BuySelect = false;
      this.RentSelect = false;
      this.ResaleSelect = false;
      this.PGSelect = false;
      this.CommercialSelect = false;
      this.ResidentialSelect = true;
      this.Service.mouseenterservice7('Rent');
    }
  }

  // Helper to reset common filters to avoid code duplication
  resetCommonFilters() {
    this.Filter.price_on_request = 1;
    this.checkedPrice = false;
    this.onlyLeased = 2;
    this.checkedLeased = false;

    $('.slider-container-disabled').css('pointer-events', 'unset');
    $('.slider-container-disabled').css('opacity', '1');
    this.projecttype = [];
    this.current_min = [];
    this.current_max = [];
    this.area_min = [];
    this.area_max = [];
    this.noOfBedrooms = [];
    this.noOfBathrooms = [];
    this.possission = [];
    this.projectStatus = [];
    this.amenityId = [];
    this.noOfBalconies = [];
    this.FurnishType = [];
    this.OwnerShip = [];
    this.selectedFacings = [];
    this.selectedTenant = null;
    this.todaydate = '';
    this.futuredate = '';
    this.FilterBYFloors = [];
    this.GroundFloor = false;
    this.FirstFloor = false;
    this.SecondFloor = false;
    this.ThirdFloor = false;
    this.FourthFloorAbove = false;
    this.BachelorTenant = false;
    this.FamilyTenant = false;
    this.AnyoneTenant = false;
    this.LadiesTenant = false;
    // PG-specific resets
    this.Sharing_Type = [];
    this.PG_For_Type = [];
    this.Suitable_For_Type = [];
    this.Food_Included_Type = [];
    // Commercial-specific resets
    this.buildingTypeListvalue = [];
    this.furnishTypeListvalue = [];
    this.propertyAgeListvalue = [];
    this.commercialPropertyType = [];
    // Boolean flags
    this.apartmentSelect = false;
    this.villaSelect = false;
    this.plotSelect = false;
    this.HouseSelect = false;
    this.oneBedroomSelect = false;
    this.twoBedroomSelect = false;
    this.threeBedroomSelect = false;
    this.fourBedroomSelect = false;
    this.fiveBedroomSelect = false;
    this.sixBedroomSelect = false;
    this.sevenBedroomSelect = false;
    this.oneBathroomSelect = false;
    this.twoBathroomSelect = false;
    this.threeBathroomSelect = false;
    this.fourBathroomSelect = false;
    this.oneBalcanySelect = false;
    this.twoBalcanySelect = false;
    this.threeBalcanySelect = false;
    this.fourBalcanySelect = false;
    this.ImmediateSelect = false;
    this.SixMonthsSelect = false;
    this.OneYearSelect = false;
    this.twoYearSelect = false;
    this.ImmediateSelect1 = false;
    this.Within15DaysSelect = false;
    this.Within30DaysSelect = false;
    this.After30DaysSelect = false;
    this.readyToMoveSelect = false;
    this.readyToMoveSelect1 = false;
    this.newLaunchSelect = false;
    this.underConstructionSelect = false;
    this.underConstructionSelect1 = false;
    this.preLaunchSelect = false;
    this.Furnish = false;
    this.SemiFurnish = false;
    this.unFurnish = false;
    this.OwnerSelect = false;
    this.AgentSelect = false;
    this.parkingSelect = false;
    this.powerBackupSelect = false;
    this.cctvSelect = false;
    this.elevatorSelect = false;
  }
  // -------------Pradeesh---------------------------
  reset() {
    if (isPlatformBrowser(this.platformId)) {

      this.isClearAllClicked = true;
      this.SelectedLocalityName = [];
      this.newNearByLocalityArry = []
      this.testArray = [];
      this.Localityid = [];
      this.FilterBYFloors = null;

      this.resetCommonFilters();

      this.oneRKBedroomSelect = false;
      this.selectedStatus = '';
      this.selectedStatus1 = '';

      // ✅ STEP 1: Clear stored values FIRST
      this.current_min = [];
      this.current_max = [];
      this.area_min = [];
      this.area_max = [];

      const priceSliderBuy = document.getElementById('price-slider');
      const priceSliderRent = document.getElementById('price-slider1');
      const priceSliderPG = document.getElementById('price-slider2');
      const priceSliderCommercial = document.getElementById('price-slider3');
      const priceSliderResale = document.getElementById('price-slider-resale');

      const sqftSliderBuy = document.getElementById('sqft-slider');
      const sqftSliderRent = document.getElementById('sqft-slider1');
      const sqftSliderCommercial = document.getElementById('sqft-slider2');

      let maxBudgetBuy =
        Math.ceil(
          (this.numBudget > 10000
            ? this.numBudget / 100000
            : this.numBudget) / 10
        ) * 10;

      let maxBudgetRent = this.numBudget || 2500000;
      // ✅ PG uses its own correct max
      let maxBudgetPG = this.numBudget || 50000;
      // ✅ Commercial uses same as Rent
      let maxBudgetCommercial = this.numBudget || 2500000;
      let maxBudgetResale = this.numBudget || 10000000;

      let maxArea = this.numArea || 10000;

      // ✅ STEP 2: Set sliders inside requestAnimationFrame
      requestAnimationFrame(() => {

        // BUY
        if (this.SelectedType === 'Buy') {

          if (priceSliderBuy && (priceSliderBuy as any).noUiSlider) {
            (priceSliderBuy as any).noUiSlider.set([10, maxBudgetBuy]);
          }

          if (sqftSliderBuy && (sqftSliderBuy as any).noUiSlider) {
            (sqftSliderBuy as any).noUiSlider.set([100, maxArea]);
          }

          this.currentMin = '₹10 L';
          this.currentMax = `₹${maxBudgetBuy} L`;

        }

        // RENT
        else if (this.SelectedType === 'Rent') {

          if (priceSliderRent && (priceSliderRent as any).noUiSlider) {
            (priceSliderRent as any).noUiSlider.set([500, maxBudgetRent]);
          }

          if (sqftSliderRent && (sqftSliderRent as any).noUiSlider) {
            (sqftSliderRent as any).noUiSlider.set([100, maxArea]);
          }

          this.currentMin1 = '₹500';
          this.currentMax1 = `₹${maxBudgetRent}`;

        }
        //Resale
        else if (this.SelectedType === 'Resale') {

          if (priceSliderResale && (priceSliderResale as any).noUiSlider) {
            const maxBudget = this.numBudget > 100000 ? this.numBudget : 10000000; // ✅ same fallback as initializeSlider
            (priceSliderResale as any).noUiSlider.set([100000, maxBudget]); // ✅ set to actual slider max
          }

          const sqftSliderResale = document.getElementById('sqft-slider-resale');
          if (sqftSliderResale && (sqftSliderResale as any).noUiSlider) {
            (sqftSliderResale as any).noUiSlider.set([100, 100000]);
          }

          // ✅ Reset display labels to match actual slider max
          this.currentMin4 = '₹1 L';
          this.currentMax4 = this.numBudget > 10000000
            ? `₹${(this.numBudget / 10000000).toFixed(2)} Cr`
            : this.numBudget > 100000
              ? `₹${(this.numBudget / 100000).toFixed(0)} L`
              : '₹1 Cr';
          this.currentMinSqft3 = '100 sqft';
          this.currentMaxSqft3 = '100000 sqft';
        }

        // PG ✅ use maxBudgetPG not maxBudgetRent
        else if (this.SelectedType === 'PG') {

          if (priceSliderPG && (priceSliderPG as any).noUiSlider) {
            (priceSliderPG as any).noUiSlider.set([1000, maxBudgetPG]);
          }

          this.currentMin3 = '₹1K';
          this.currentMax3 = `₹${maxBudgetPG}`;

        }

        // COMMERCIAL ✅ use 1000 min and maxBudgetCommercial
        else if (this.SelectedType === 'Commercial') {

          if (priceSliderCommercial && (priceSliderCommercial as any).noUiSlider) {
            (priceSliderCommercial as any).noUiSlider.set([1000, maxBudgetCommercial]);
          }

          if (sqftSliderCommercial && (sqftSliderCommercial as any).noUiSlider) {
            (sqftSliderCommercial as any).noUiSlider.set([100, maxArea]);
          }

          this.currentMin2 = '₹1K';
          this.currentMax2 = `₹${maxBudgetCommercial}`;

        }

        // Reset area display
        this.currentMinSqft = '100 sqft';
        this.currentMaxSqft = `${maxArea} sqft`;

      });

      // ✅ STEP 3: Trigger LAST
      this.filterTrigger.next();
      setTimeout(() => {
        this.FilterNavigation();
      }, 0);
      setTimeout(() => {
        $('body').removeClass('modal-open');
        $('body').css('overflow', '');
        $('body').css('padding-right', '');
        $('.modal-backdrop').remove();
      }, 100);
    }
  }

  reset2() {
    window.history.pushState({}, '', window.location.pathname);
  }

  getRecentSearches(): string[] {
    return JSON.parse(this.storage.getItem('recentSearches') || '[]');
  }

  FilterNavigation() {
    this.showChips = true;
    let targetUrl = ''; // ✅ declare at top

    if (this.isClearAllClicked) {
      this.isClearAllClicked = false;

      const city = this.selectedCity.replace(/\s+/g, '-').toLowerCase();

      if (this.SelectedType === 'Buy') {
        targetUrl = `/${city}/property-sale`;
      }
      else if (this.SelectedType === 'Rent') {
        targetUrl = `/rent/house-for-rent-in-${city}`;
      }
      else if (this.SelectedType === 'Resale') {
        targetUrl = `/projects-in-${city}`;
      }
      else if (this.SelectedType === 'PG') {
        targetUrl = `/pgcl/pg-for-rent-in-${city}`;
      }
      else if (this.SelectedType === 'Commercial') {
        targetUrl = this.BuyCommercialSelect
          ? `/cll/commercial-properties-for-sale-in-${city}`
          : `/cll/commercial-properties-for-rent-in-${city}`;
      }

      this.router.navigate([targetUrl]); // ✅ now works
      return;
    }
    if (this.SelectedType === 'Buy') {
      const queryParams: any = {};
      if (this.projecttype?.length) queryParams.propertytype = this.projecttype.join(',');
      if (this.Localityid?.length) queryParams.localityid = this.Localityid.join(',');
      if (this.current_min?.length) queryParams.min = this.current_min.join(',');
      if (this.current_max?.length) queryParams.max = this.current_max.join(',');
      if (this.area_min?.length) queryParams.sqftmin = this.area_min.join(',');
      if (this.area_max?.length) queryParams.sqftmax = this.area_max.join(',');
      if (this.noOfBedrooms?.length) queryParams.bedroom = this.noOfBedrooms.join(',');
      if (this.noOfBathrooms?.length) queryParams.bathroom = this.noOfBathrooms.join(',');
      if (this.possission?.length) queryParams.availability = this.possission.join(',');
      if (this.projectStatus?.length) queryParams.status = this.projectStatus.join(',');
      if (this.amenityId?.length) queryParams.amenities = this.amenityId.join(',');
      if (this.Filter.price_on_request === 2) {
        queryParams.price_on_request = 2;
      }
      else {
        delete queryParams.price_on_request;
      }

      const city = this.selectedCity.replace(/\s+/g, '-').toLowerCase();
      const targetUrl = `/${city}/property-sale`;

      // Build query string manually
      const newQuery = new URLSearchParams(queryParams).toString();

      // Current URL parts
      const currentPath = this.router.url.split('?')[0];
      const currentQuery = this.router.url.split('?')[1] || '';

      // if (currentPath === targetUrl && currentQuery === newQuery) {
      //   return;
      // }

      this.router.navigate(
        [targetUrl],
        {
          queryParams: Object.keys(queryParams).length ? queryParams : {},
        }
      );
      if (isPlatformBrowser(this.platformId)) {
        $('.modal').modal('hide');
      }
    }

    else if (this.SelectedType === 'Rent') {
      // alert('hai')
      const queryParams: any = {};
      const city = this.selectedCity.replace(/\s+/g, '-').toLowerCase();
      const targetUrl = `/rent/house-for-rent-in-${city}`;
      if (this.projecttype?.length) queryParams.propertytype = this.projecttype.join(',');
      if (this.Localityid?.length) queryParams.localityid = this.Localityid.join(',');
      if (this.noOfBedrooms?.length) queryParams.bedroom = this.noOfBedrooms.join(',');
      if (this.noOfBathrooms?.length) queryParams.bathroom = this.noOfBathrooms.join(',');
      if (this.current_min?.length) queryParams.min = this.current_min.join(',');
      if (this.current_max?.length) queryParams.max = this.current_max.join(',');
      if (this.area_min?.length) queryParams.sqftmin = this.area_min.join(',');
      if (this.area_max?.length) queryParams.sqftmax = this.area_max.join(',');
      if (this.FurnishType?.length) queryParams.furnish = this.FurnishType.join(',');
      if (this.OwnerShip?.length) queryParams.postedby = this.OwnerShip.join(',');
      if (this.selectedFacings?.length) queryParams.doorfacing = this.selectedFacings.join(',');
      if (this.amenityId?.length) queryParams.amenities = this.amenityId.join(',');
      if (this.FilterBYFloors?.length) { queryParams.floorbyid = this.FilterBYFloors.join(','); };
      if (this.selectedTenant !== null) { queryParams.tenants = this.selectedTenant; };
      if (this.todaydate) queryParams.fromdate = this.todaydate;
      if (this.futuredate) queryParams.futuredate = this.futuredate;
      if (this.onlyLeased === 1) {
        queryParams.leased = 1;
      }
      // console.log(this.Localityid);
      this.router.navigate(
        [targetUrl],
        {
          queryParams: Object.keys(queryParams).length ? queryParams : {},
        }
      );

      if (isPlatformBrowser(this.platformId)) {
        $('.modal').modal('hide');
      }
    }
    else if (this.SelectedType === 'Resale') {
      const queryParams: any = {};
      const city = this.selectedCity.replace(/\s+/g, '-').toLowerCase();
      const targetUrl = `/projects-in-${city}`;
      if (this.projecttype?.length) queryParams.propertytype = this.projecttype.join(',');
      if (this.Localityid?.length) queryParams.localityid = this.Localityid.join(',');
      if (this.noOfBedrooms?.length) queryParams.bedroom = this.noOfBedrooms.join(',');
      if (this.noOfBathrooms?.length) queryParams.bathroom = this.noOfBathrooms.join(',');
      if (this.noOfBalconies?.length) queryParams.balconyId = this.noOfBalconies.join(',');
      if (this.current_min?.length) queryParams.min = this.current_min.join(',');
      if (this.current_max?.length) queryParams.max = this.current_max.join(',');
      if (this.area_min?.length) queryParams.sqftmin = this.area_min.join(',');
      if (this.area_max?.length) queryParams.sqftmax = this.area_max.join(',');
      if (this.amenityId?.length) queryParams.amenities = this.amenityId.join(',');
      if (this.projectStatus?.length) queryParams.status = this.projectStatus.join(',');

      // console.log(this.Localityid);
      this.router.navigate(
        [targetUrl],
        {
          queryParams: Object.keys(queryParams).length ? queryParams : {},
        }
      );

      if (isPlatformBrowser(this.platformId)) {
        $('.modal').modal('hide');
      }
    }

    else if (this.SelectedType == 'PG') {
      const queryParams: any = {
        localityid: this.Localityid.length ? this.Localityid.join(',') : undefined,
        roomtype: this.Sharing_Type.length ? this.Sharing_Type.join(',') : undefined,
        pgavailablefor: this.PG_For_Type.length ? this.PG_For_Type.join(',') : undefined,
        pgbestsuit: this.Suitable_For_Type.length ? this.Suitable_For_Type.join(',') : undefined,
        pgfoodtype: this.Food_Included_Type.length ? this.Food_Included_Type.join(',') : undefined,
        min: this.current_min.length ? this.current_min.join(',') : undefined,  // Avoid empty arrays
        max: this.current_max.length ? this.current_max.join(',') : undefined,  // Avoid empty arrays
      };

      // // **Remove undefined, null, empty arrays, and empty strings**
      Object.keys(queryParams).forEach(key => {
        if (!queryParams[key] || queryParams[key] === 'undefined' || queryParams[key] === '') {
          delete queryParams[key];
        }
      });
      if (Object.keys(queryParams).length === 0) {
        this.router.navigate(['/pgcl/pg-for-rent-in-' + this.selectedCity.replace(/\s+/g, '-').toLowerCase()]);
      } else {
        // console.log("Query parameters:", queryParams);
        this.router.navigate(['/pgcl/pg-for-rent-in-' + this.selectedCity.replace(/\s+/g, '-').toLowerCase()], {
          relativeTo: this.activatedRoute,
          queryParams: queryParams,
          queryParamsHandling: 'merge'
        });
      }
      $('.modal').modal('hide');
    }
    else if (this.SelectedType == 'Commercial') {
      const queryParams: any = {
        localityid: this.Localityid.length ? this.Localityid.join(',') : undefined,
        buildingtype: this.buildingTypeListvalue.length ? this.buildingTypeListvalue.join(',') : undefined,
        furnishstatus: this.furnishTypeListvalue.length ? this.furnishTypeListvalue.join(',') : undefined,
        Plotage: this.propertyAgeListvalue.length ? this.propertyAgeListvalue.join(',') : undefined,
        possessionId: this.possission.length ? this.possission.join(',') : undefined,
        Propertype: this.commercialPropertyType.length ? this.commercialPropertyType.join(',') : undefined,
        min: this.current_min.length ? this.current_min.join(',') : undefined,
        max: this.current_max.length ? this.current_max.join(',') : undefined,
        sqftmin: this.area_min.length ? this.area_min.join(',') : undefined,
        sqftmax: this.area_max.length ? this.area_max.join(',') : undefined,
        fromdate: this.todaydate ? this.todaydate : undefined,
        futuredate: this.futuredate ? this.futuredate : undefined,
        price_on_request: this.Filter.price_on_request === 2 ? 2 : undefined,
        leased: this.onlyLeased === 1 ? 1 : undefined,
      };

      // // **Remove undefined, null, empty arrays, and empty strings**
      Object.keys(queryParams).forEach(key => {
        if (!queryParams[key] || queryParams[key] === 'undefined' || queryParams[key] === '') {
          delete queryParams[key];
        }
      });
      const city = this.selectedCity.replace(/\s+/g, '-').toLowerCase();

      const baseUrl = this.BuyCommercialSelect
        ? '/cll/commercial-properties-for-sale-in-'
        : '/cll/commercial-properties-for-rent-in-';

      if (Object.keys(queryParams).length === 0) {

        this.router.navigate([baseUrl + city]);

      } else {

        this.router.navigate(
          [baseUrl + city],
          {
            queryParams: queryParams,
            queryParamsHandling: 'merge'
          }
        );

      }

      $('.modal').modal('hide');
    }

    this.localityname = this.storage.getItem('LocalityName');
    this.Service.mouseenterservice1();
    this.saveSearch();

    // this.FilterNavigationChip()
  }

  FilterNavigationChip() {

    const queryParams: any = {};

    if (this.SelectedType === 'Buy') {
      if (this.projecttype?.length) queryParams.propertytype = this.projecttype.join(',');
      if (this.Localityid?.length) queryParams.localityid = this.Localityid.join(',');
      if (this.current_min?.length) queryParams.min = this.current_min.join(',');
      if (this.current_max?.length) queryParams.max = this.current_max.join(',');
      if (this.area_min?.length) queryParams.sqftmin = this.area_min.join(',');
      if (this.area_max?.length) queryParams.sqftmax = this.area_max.join(',');
      if (this.noOfBedrooms?.length) queryParams.bedroom = this.noOfBedrooms.join(',');
      if (this.noOfBathrooms?.length) queryParams.bathroom = this.noOfBathrooms.join(',');
      if (this.possission?.length) queryParams.availability = this.possission.join(',');
      if (this.projectStatus?.length) queryParams.status = this.projectStatus.join(',');
      if (this.amenityId?.length) queryParams.amenities = this.amenityId.join(',');

      if (this.Filter.price_on_request === 2) {
        queryParams.price_on_request = 2;
      }

    } else if (this.SelectedType === 'Rent') {
      queryParams.propertytype = this.projecttype?.length ? this.projecttype.join(',') : null;
      queryParams.localityid = this.Localityid?.length ? this.Localityid.join(',') : null;
      queryParams.bedroom = this.noOfBedrooms?.length ? this.noOfBedrooms.join(',') : null;
      queryParams.bathroom = this.noOfBathrooms?.length ? this.noOfBathrooms.join(',') : null;
      queryParams.min = this.current_min?.length ? this.current_min.join(',') : null;
      queryParams.max = this.current_max?.length ? this.current_max.join(',') : null;
      queryParams.sqftmin = this.area_min?.length ? this.area_min.join(',') : null;
      queryParams.sqftmax = this.area_max?.length ? this.area_max.join(',') : null;
      queryParams.balconyId = this.noOfBalconies?.length ? this.noOfBalconies.join(',') : null;
      queryParams.furnish = this.FurnishType?.length ? this.FurnishType.join(',') : null;
      queryParams.postedby = this.OwnerShip?.length ? this.OwnerShip.join(',') : null;
      queryParams.doorfacing = this.selectedFacings?.length ? this.selectedFacings.join(',') : null;
      queryParams.amenities = this.amenityId?.length ? this.amenityId.join(',') : null;
      queryParams.tenants = this.selectedTenant != null ? this.selectedTenant : null;
      queryParams.fromdate = this.todaydate?.length ? this.todaydate : null;
      queryParams.futuredate = this.futuredate?.length ? this.futuredate : null;
      queryParams.floorbyid = this.FilterBYFloors?.length ? this.FilterBYFloors.join(',') : null;

    } else if (this.SelectedType === 'Resale') {
      queryParams.propertytype = this.projecttype?.length ? this.projecttype.join(',') : null;
      queryParams.localityid = this.Localityid?.length ? this.Localityid.join(',') : null;
      queryParams.bedroom = this.noOfBedrooms?.length ? this.noOfBedrooms.join(',') : null;
      queryParams.bathroom = this.noOfBathrooms?.length ? this.noOfBathrooms.join(',') : null;
      queryParams.min = this.current_min?.length ? this.current_min.join(',') : null;
      queryParams.max = this.current_max?.length ? this.current_max.join(',') : null;
      queryParams.sqftmin = this.area_min?.length ? this.area_min.join(',') : null;
      queryParams.sqftmax = this.area_max?.length ? this.area_max.join(',') : null;
      queryParams.balconyId = this.noOfBalconies?.length ? this.noOfBalconies.join(',') : null;
      queryParams.amenities = this.amenityId?.length ? this.amenityId.join(',') : null;
      if (this.projectStatus?.length) queryParams.status = this.projectStatus.join(',');


    } else if (this.SelectedType === 'PG') {

      queryParams.localityid = this.Localityid?.length ? this.Localityid.join(',') : null;
      queryParams.roomtype = this.Sharing_Type?.length ? this.Sharing_Type.join(',') : null;
      queryParams.pgavailablefor = this.PG_For_Type?.length ? this.PG_For_Type.join(',') : null;
      queryParams.pgbestsuit = this.Suitable_For_Type?.length ? this.Suitable_For_Type.join(',') : null;
      queryParams.pgfoodtype = this.Food_Included_Type?.length ? this.Food_Included_Type.join(',') : null;
      queryParams.min = this.current_min?.length ? this.current_min.join(',') : null;
      queryParams.max = this.current_max?.length ? this.current_max.join(',') : null;

    } else if (this.SelectedType === 'Commercial') {

      queryParams.localityid = this.Localityid?.length ? this.Localityid.join(',') : null;
      queryParams.buildingtype = this.buildingTypeListvalue?.length ? this.buildingTypeListvalue.join(',') : null;
      queryParams.furnishstatus = this.furnishTypeListvalue?.length ? this.furnishTypeListvalue.join(',') : null;
      queryParams.Plotage = this.propertyAgeListvalue?.length ? this.propertyAgeListvalue.join(',') : null;
      queryParams.Propertype = this.commercialPropertyType?.length ? this.commercialPropertyType.join(',') : null;
      queryParams.min = this.current_min?.length ? this.current_min.join(',') : null;
      queryParams.max = this.current_max?.length ? this.current_max.join(',') : null;
      queryParams.sqftmin = this.area_min?.length ? this.area_min.join(',') : null;
      queryParams.sqftmax = this.area_max?.length ? this.area_max.join(',') : null;
      queryParams.fromdate = this.todaydate?.length ? this.todaydate : null;
      queryParams.futuredate = this.futuredate?.length ? this.futuredate : null;
      if (this.Filter.price_on_request === 2) {
        queryParams.price_on_request = 2;
      }

    }

    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: queryParams,
      replaceUrl: true
    });
    this.updateQueryParams();   // update URL
    this.filterTrigger.next();
  }




  getBaseUrl(search: any): string {
    return search.proptype === 'Buy'
      ? `/${search.city.toLowerCase()}/property-sale`
      : `/rent/house-for-rent-in-${search.city.toLowerCase()}`;
  }

  handleRecentClick(): void {
    const modalElement = document.getElementById('SecondCityModal');

    if (modalElement) {
      modalElement.classList.remove('show');
      modalElement.style.display = 'none';
      modalElement.setAttribute('aria-hidden', 'true');
    }
    document.body.classList.remove('modal-open');
    document.body.style.overflow = '';
    document.querySelectorAll('.modal-backdrop').forEach(el => el.remove());
  }


  getQueryParams(search: any): any {
    let queryParams: any = { localityid: search.localityId };
    if (search.bhkType) {
      queryParams.bedroom = search.bhkType.replace(' BHK', '');
    }
    return queryParams;
  }

  navigateToSearch(search: any) {

    if (isPlatformBrowser(this.platformId)) {
      document.body.classList.remove('modal-open');
      document.body.style.overflow = 'auto';

      const backdrops = document.getElementsByClassName('modal-backdrop');
      while (backdrops.length > 0) {
        backdrops[0].remove();
      }
    }

    const baseUrl = this.getBaseUrl(search);
    const queryParams = this.getQueryParams(search);

    this.router.navigate([baseUrl], { queryParams });
  }

  showInfo() {
    this.isDivVisible = !this.isDivVisible;
  }

  saveSearch() {
    let searches = JSON.parse(this.storage.getItem('recentSearches') || '[]');
    let normalizedLocalityId = Array.isArray(this.Localityid)
      ? [...new Set(this.Localityid.map(id => String(id)))].sort()
      : [String(this.Localityid)];
    let searchObj = {
      proptype: this.SelectedType,
      city: this.selectedCity,
      localityName: this.localityname,
      bhkType: this.noOfBedrooms && this.noOfBedrooms.toString().trim() ? this.noOfBedrooms + ' BHK' : '',
      localityId: normalizedLocalityId
    };
    let exists = searches.some((search: any) =>
      search.proptype === searchObj.proptype &&
      search.city === searchObj.city &&
      search.localityName === searchObj.localityName &&
      search.bhkType === searchObj.bhkType &&
      JSON.stringify(search.localityId) === JSON.stringify(searchObj.localityId)
    );
    if (!exists) {
      searches.unshift(searchObj);
    }
    searches = searches.slice(0, 5);
    this.storage.setItem('recentSearches', JSON.stringify(searches));
  }

  // Amenitiesclick(id: any) {
  //   var amenity = id;
  //   var amenityIdPassing;
  //   if (amenity == 1) {
  //     this.parkingSelect = !this.parkingSelect
  //     amenityIdPassing = 41;
  //   }
  //   else if (amenity == 2) {
  //     this.powerBackupSelect = !this.powerBackupSelect
  //     amenityIdPassing = 32;
  //   }
  //   else if (amenity == 3) {
  //     this.cctvSelect = !this.cctvSelect
  //     amenityIdPassing = 42;
  //   }
  //   else {
  //     this.elevatorSelect = !this.elevatorSelect
  //     amenityIdPassing = 37;
  //   }
  //   if (!this.amenityId.includes(amenityIdPassing)) {
  //     this.amenityId.push(amenityIdPassing);
  //   } else {
  //     this.amenityId = this.amenityId.filter(item => item !== amenityIdPassing);
  //   }
  //   this.updateQueryParams();
  // }
  Amenitiesclick(id: number) {

    // If same clicked → clear all
    // alert(this.Filter.price_on_request)

    if (
      (id === 1 && this.parkingSelect) ||
      (id === 2 && this.powerBackupSelect) ||
      (id === 3 && this.cctvSelect) ||
      (id === 4 && this.elevatorSelect)
    ) {

      // clear all
      this.parkingSelect = false;
      this.powerBackupSelect = false;
      this.cctvSelect = false;
      this.elevatorSelect = false;
      this.amenityId = [];

    } else {

      // clear all first
      this.parkingSelect = false;
      this.powerBackupSelect = false;
      this.cctvSelect = false;
      this.elevatorSelect = false;

      // set selected one
      if (id === 1) {
        this.parkingSelect = true;
        this.amenityId = [41];
      }
      else if (id === 2) {
        this.powerBackupSelect = true;
        this.amenityId = [32];
      }
      else if (id === 3) {
        this.cctvSelect = true;
        this.amenityId = [42];
      }
      else if (id === 4) {
        this.elevatorSelect = true;
        this.amenityId = [37];
      }

    }

    // console.log("amenityId:", this.amenityId);
    // alert(this.Filter.price_on_request)

    this.updateQueryParams();
    // alert(this.Filter.price_on_request)


  }



  updateQueryParams() {
    this.filterTrigger.next();
  }


  apartmentclick() {
    this.apartmentSelect = !this.apartmentSelect;
    if (this.apartmentSelect) {
      if (this.SelectedType == 'Buy') {
        this.projecttype.push('50401');
      } else {
        this.projecttype.push('1');
      }
    } else if (this.apartmentSelect == false) {
      for (var i = 0; i < this.projecttype.length; i++) {
        if (this.projecttype[i] === '50401') {
          this.projecttype.splice(i, 1);
        } else if (this.projecttype[i] === '1') {
          this.projecttype.splice(i, 1);
        }
      }
    }
    this.updateQueryParams();
  }

  villaclick() {
    this.villaSelect = !this.villaSelect;
    if (this.villaSelect) {
      if (this.SelectedType == 'Buy') {
        this.projecttype.push('50402');
      } else {
        this.projecttype.push('2');
      }
    } else if (this.villaSelect == false) {
      for (var i = 0; i < this.projecttype.length; i++) {
        if (this.projecttype[i] === '50402') {
          this.projecttype.splice(i, 1);
        } else if (this.projecttype[i] === '2') {
          this.projecttype.splice(i, 1);
        }
      }
    }
    this.updateQueryParams();
  }

  plotclick() {
    this.plotSelect = !this.plotSelect;
    if (this.plotSelect) {
      if (this.SelectedType == 'Buy') {
        this.projecttype.push('50403');
      } else {
        this.projecttype.push('3');
      }
    } else if (this.plotSelect == false) {
      for (var i = 0; i < this.projecttype.length; i++) {
        if (this.projecttype[i] === '50403') {
          this.projecttype.splice(i, 1);
        } else if (this.projecttype[i] === '3') {
          this.projecttype.splice(i, 1);
        }
      }
    }
    this.updateQueryParams();
  }

  houseclick() {
    this.HouseSelect = !this.HouseSelect;
    if (this.HouseSelect) {
      if (this.SelectedType == 'Buy') {
        this.projecttype.push('50404');
      } else {
        this.projecttype.push('4');
      }
    } else if (this.HouseSelect == false) {
      for (var i = 0; i < this.projecttype.length; i++) {
        if (this.projecttype[i] === '50404') {
          this.projecttype.splice(i, 1);
        } else if (this.projecttype[i] === '4') {
          this.projecttype.splice(i, 1);
        }
      }
    }
    this.updateQueryParams();
  }

  handleValueChange(newValue: string) {
    // 
  }

  oneRKBedroom() {
    this.oneRKBedroomSelect = !this.oneRKBedroomSelect;
    if (this.oneRKBedroomSelect) {
      if (this.SelectedType == 'Buy') {
        this.noOfBedrooms.push('9');
      } else {
        this.noOfBedrooms.push('3550');
      }
    } else if (this.oneRKBedroomSelect == false) {
      for (var i = 0; i < this.noOfBedrooms.length; i++) {
        if (this.noOfBedrooms[i] === '9') {
          this.noOfBedrooms.splice(i, 1);
        } else if (this.noOfBedrooms[i] === '3550') {
          this.noOfBedrooms.splice(i, 1);
        }
      }
    }
    this.updateQueryParams();
  }

  oneBedroom() {
    this.oneBedroomSelect = !this.oneBedroomSelect;
    if (this.oneBedroomSelect) {
      if (this.SelectedType == 'Buy') {
        this.noOfBedrooms.push('1');
      } else {
        this.noOfBedrooms.push('3551');
      }
    } else if (this.oneBedroomSelect == false) {
      for (var i = 0; i < this.noOfBedrooms.length; i++) {
        if (this.noOfBedrooms[i] === '1') {
          this.noOfBedrooms.splice(i, 1);
        } else if (this.noOfBedrooms[i] === '3551') {
          this.noOfBedrooms.splice(i, 1);
        }
      }
    }
    this.updateQueryParams();
  }

  // ... similar refactoring for other bedroom/bathroom/possession methods ...
  twoBedroom() {
    this.twoBedroomSelect = !this.twoBedroomSelect;
    if (this.twoBedroomSelect) {
      if (this.SelectedType == 'Buy') {
        this.noOfBedrooms.push('2');
      } else {
        this.noOfBedrooms.push('3552');
      }
    } else if (this.twoBedroomSelect == false) {
      for (var i = 0; i < this.noOfBedrooms.length; i++) {
        if (this.noOfBedrooms[i] === '2') {
          this.noOfBedrooms.splice(i, 1);
        } else if (this.noOfBedrooms[i] === '3552') {
          this.noOfBedrooms.splice(i, 1);
        }
      }
    }
    this.updateQueryParams();
  }

  threeBedroom() {
    this.threeBedroomSelect = !this.threeBedroomSelect;
    if (this.threeBedroomSelect) {
      if (this.SelectedType == 'Buy') {
        this.noOfBedrooms.push('3');
      } else {
        this.noOfBedrooms.push('3553');
      }
    } else if (this.threeBedroomSelect == false) {
      for (var i = 0; i < this.noOfBedrooms.length; i++) {
        if (this.noOfBedrooms[i] === '3') {
          this.noOfBedrooms.splice(i, 1);
        } else if (this.noOfBedrooms[i] === '3553') {
          this.noOfBedrooms.splice(i, 1);
        }
      }
    }
    this.updateQueryParams();
  }

  fourBedroom() {
    this.fourBedroomSelect = !this.fourBedroomSelect;
    if (this.fourBedroomSelect) {
      if (this.SelectedType == 'Buy') {
        this.noOfBedrooms.push('4');
      } else {
        this.noOfBedrooms.push('3554');
      }
    } else if (this.fourBedroomSelect == false) {
      for (var i = 0; i < this.noOfBedrooms.length; i++) {
        if (this.noOfBedrooms[i] === '4') {
          this.noOfBedrooms.splice(i, 1);
        } else if (this.noOfBedrooms[i] === '3554') {
          this.noOfBedrooms.splice(i, 1);
        }
      }
    }
    this.updateQueryParams();
  }

  fiveBedroom() {
    this.fiveBedroomSelect = !this.fiveBedroomSelect;
    if (this.fiveBedroomSelect) {
      if (this.SelectedType == 'Buy') {
        this.noOfBedrooms.push('5');
      } else {
        this.noOfBedrooms.push('3555');
      }
    } else if (this.fiveBedroomSelect == false) {
      for (var i = 0; i < this.noOfBedrooms.length; i++) {
        if (this.noOfBedrooms[i] === '5') {
          this.noOfBedrooms.splice(i, 1);
        } else if (this.noOfBedrooms[i] === '3555') {
          this.noOfBedrooms.splice(i, 1);
        }
      }
    }
    this.updateQueryParams();
  }

  sixBedroom() {
    this.sixBedroomSelect = !this.sixBedroomSelect;
    if (this.sixBedroomSelect) {
      if (this.SelectedType == 'Buy') {
        this.noOfBedrooms.push('8');
      }
    } else if (this.sixBedroomSelect == false) {
      for (var i = 0; i < this.noOfBedrooms.length; i++) {
        if (this.noOfBedrooms[i] === '8') {
          this.noOfBedrooms.splice(i, 1);
        }
      }
    }
    this.updateQueryParams();
  }

  sevenBedroom() {
    this.sevenBedroomSelect = !this.sevenBedroomSelect;
    if (this.sevenBedroomSelect) {
      if (this.SelectedType == 'Buy') {
        this.noOfBedrooms.push('7');
      }
    } else if (this.sevenBedroomSelect == false) {
      for (var i = 0; i < this.noOfBedrooms.length; i++) {
        if (this.noOfBedrooms[i] === '7') {
          this.noOfBedrooms.splice(i, 1);
        }
      }
    }
    this.updateQueryParams();
  }

  oneBalcany() {
    this.oneBalcanySelect = !this.oneBalcanySelect;

    if (this.oneBalcanySelect) {

      this.noOfBalconies.push('87421');

    } else {

      this.noOfBalconies = this.noOfBalconies.filter(id => id !== '87421');

    }

    this.updateQueryParams();
  }

  twoBalcany() {
    this.twoBalcanySelect = !this.twoBalcanySelect;

    if (this.twoBalcanySelect) {
      this.noOfBalconies.push('87422');
    } else {
      this.noOfBalconies = this.noOfBalconies.filter(id => id !== '87422');
    }

    this.updateQueryParams();
    this.filterTrigger.next();
  }

  threeBalcany() {
    this.threeBalcanySelect = !this.threeBalcanySelect;

    if (this.threeBalcanySelect) {
      this.noOfBalconies.push('87423');
    } else {
      this.noOfBalconies = this.noOfBalconies.filter(id => id !== '87423');
    }

    this.updateQueryParams();
    this.filterTrigger.next();
  }

  fourBalcany() {
    this.fourBalcanySelect = !this.fourBalcanySelect;

    if (this.fourBalcanySelect) {
      this.noOfBalconies.push('87425');
    } else {
      this.noOfBalconies = this.noOfBalconies.filter(id => id !== '87425');
    }

    this.updateQueryParams();
    this.filterTrigger.next();
  }


  oneBathroom() {
    this.oneBathroomSelect = !this.oneBathroomSelect;
    if (this.oneBathroomSelect) {
      if (this.SelectedType == 'Buy') {
        this.noOfBathrooms.push('1');
      } else {
        this.noOfBathrooms.push('24750');
      }
    } else if (this.oneBathroomSelect == false) {
      for (var i = 0; i < this.noOfBathrooms.length; i++) {
        if (this.noOfBathrooms[i] === '1') {
          this.noOfBathrooms.splice(i, 1);
        } else if (this.noOfBathrooms[i] === '24750') {
          this.noOfBathrooms.splice(i, 1);
        }
      }
    }
    this.updateQueryParams();
  }

  twoBathroom() {
    this.twoBathroomSelect = !this.twoBathroomSelect;
    if (this.twoBathroomSelect) {
      if (this.SelectedType == 'Buy') {
        this.noOfBathrooms.push('2');
      } else {
        this.noOfBathrooms.push('24751');
      }
    } else if (this.twoBathroomSelect == false) {
      for (var i = 0; i < this.noOfBathrooms.length; i++) {
        if (this.noOfBathrooms[i] === '2') {
          this.noOfBathrooms.splice(i, 1);
        } else if (this.noOfBathrooms[i] === '24751') {
          this.noOfBathrooms.splice(i, 1);
        }
      }
    }
    this.updateQueryParams();
  }

  threeBathroom() {
    this.threeBathroomSelect = !this.threeBathroomSelect;
    if (this.threeBathroomSelect) {
      if (this.SelectedType == 'Buy') {
        this.noOfBathrooms.push('3');
      } else {
        this.noOfBathrooms.push('24752');
      }
    } else if (this.threeBathroomSelect == false) {
      for (var i = 0; i < this.noOfBathrooms.length; i++) {
        if (this.noOfBathrooms[i] === '3') {
          this.noOfBathrooms.splice(i, 1);
        } else if (this.noOfBathrooms[i] === '24752') {
          this.noOfBathrooms.splice(i, 1);
        }
      }
    }
    this.updateQueryParams();
  }

  fourBathroom() {
    this.fourBathroomSelect = !this.fourBathroomSelect;
    if (this.fourBathroomSelect) {
      if (this.SelectedType == 'Buy') {
        this.noOfBathrooms.push('4');
      } else {
        this.noOfBathrooms.push('24753');
      }
    } else if (this.fourBathroomSelect == false) {
      for (var i = 0; i < this.noOfBathrooms.length; i++) {
        if (this.noOfBathrooms[i] === '4') {
          this.noOfBathrooms.splice(i, 1);
        } else if (this.noOfBathrooms[i] === '24753') {
          this.noOfBathrooms.splice(i, 1);
        }
      }
    }
    this.updateQueryParams();
  }


  PosessionImmediate() {
    this.ImmediateSelect = !this.ImmediateSelect;
    if (this.ImmediateSelect === false) {
      this.possission = [''];
      this.ImmediateSelect = false;
    } else if (this.ImmediateSelect === true) {
      this.possission = ['1'];
      this.ImmediateSelect = true;
      this.SixMonthsSelect = false;
      this.OneYearSelect = false;
      this.twoYearSelect = false;
    }
    this.updateQueryParams();
  }

  PosessionSixMonths() {
    this.SixMonthsSelect = !this.SixMonthsSelect;
    if (this.SixMonthsSelect === false) {
      this.possission = [''];
    } else if (this.SixMonthsSelect === true) {
      this.possission = ['6'];
      this.ImmediateSelect = false;
      this.SixMonthsSelect = true;
      this.OneYearSelect = false;
      this.twoYearSelect = false;
    }
    this.updateQueryParams();
  }

  PosessionOneYear() {
    this.OneYearSelect = !this.OneYearSelect;
    if (this.OneYearSelect === false) {
      this.possission = [''];
      this.OneYearSelect = false;
    } else if (this.OneYearSelect === true) {
      this.possission = ['12'];
      this.ImmediateSelect = false;
      this.SixMonthsSelect = false;
      this.OneYearSelect = true;
      this.twoYearSelect = false;
    }
    this.updateQueryParams();
  }

  PosessionTwoYearAbove() {
    this.twoYearSelect = !this.twoYearSelect;
    if (this.twoYearSelect === false) {
      this.possission = [''];
      this.twoYearSelect = false;
    } else if (this.twoYearSelect === true) {
      this.possission = ['24'];
      this.ImmediateSelect = false;
      this.SixMonthsSelect = false;
      this.OneYearSelect = false;
      this.twoYearSelect = true;
    }
    this.updateQueryParams();
  }

  Immediateclick() {
    if (this.ImmediateSelect1 === true) {
      this.todaydate = '';
      this.futuredate = '';
      this.ImmediateSelect1 = false;
    } else if (this.ImmediateSelect1 === false) {
      this.todaydate = '';
      var fdate = new Date();
      fdate.setDate(fdate.getDate() + 5);
      this.todaydate = new Date().toISOString().split('T')[0];
      this.futuredate = fdate.toISOString().split('T')[0];
      this.ImmediateSelect1 = true;
      this.Within15DaysSelect = false;
      this.Within30DaysSelect = false;
      this.After30DaysSelect = false;
    }
    this.updateQueryParams();
  }

  Within15Daysclick() {
    if (this.Within15DaysSelect === true) {
      this.todaydate = '';
      this.futuredate = '';
      this.Within15DaysSelect = false;
    } else if (this.Within15DaysSelect === false) {
      this.todaydate = new Date().toISOString().split('T')[0];
      var fdate = new Date();
      fdate.setDate(fdate.getDate() + 15);
      this.futuredate = fdate.toISOString().split('T')[0];
      this.ImmediateSelect1 = false;
      this.Within15DaysSelect = true;
      this.Within30DaysSelect = false;
      this.After30DaysSelect = false;
    }
    this.updateQueryParams();
  }

  Within30Daysclick() {
    if (this.Within30DaysSelect === true) {
      this.todaydate = '';
      this.futuredate = '';
      this.Within30DaysSelect = false;
    } else if (this.Within30DaysSelect === false) {
      this.todaydate = new Date().toISOString().split('T')[0];
      var fdate = new Date();
      fdate.setDate(fdate.getDate() + 30);
      this.futuredate = fdate.toISOString().split('T')[0];
      this.ImmediateSelect1 = false;
      this.Within15DaysSelect = false;
      this.Within30DaysSelect = true;
      this.After30DaysSelect = false;
    }
    this.updateQueryParams();
  }

  After30Daysclick() {
    if (this.After30DaysSelect === true) {
      this.todaydate = '';
      this.futuredate = '';
      this.After30DaysSelect = false;
    } else if (this.After30DaysSelect === false) {
      var fdate = new Date();
      fdate.setDate(fdate.getDate() + 30);
      this.todaydate = fdate.toISOString().split('T')[0];
      this.futuredate = '';
      this.ImmediateSelect1 = false;
      this.Within15DaysSelect = false;
      this.Within30DaysSelect = false;
      this.After30DaysSelect = true;
    }
    this.updateQueryParams();
  }

  selectStatus(statusKey: string) {
    if (this.selectedStatus === statusKey) {
      this.selectedStatus = null;
      this.projectStatus = [];
    } else {
      this.selectedStatus = statusKey;
      this.projectStatus = [this.projectStatusMap[statusKey]];
    }
    const queryParams: any = { ...this.activatedRoute.snapshot.queryParams };
    if (this.selectedStatus) {
      queryParams['status'] = this.projectStatusMap[this.selectedStatus];
    } else {
      delete queryParams['status'];
    }
    this.updateQueryParams();
  }

  selectStatus1(statusKey: string) {
    if (this.selectedStatus1 === statusKey) {
      this.selectedStatus1 = null;
      this.projectStatus = [];
    } else {
      this.selectedStatus1 = statusKey;
      this.projectStatus = [this.projectStatusresaleMap[statusKey]];
    }
    const queryParams: any = { ...this.activatedRoute.snapshot.queryParams };
    if (this.selectedStatus1) {
      queryParams['status'] = this.projectStatusresaleMap[this.selectedStatus1];
    } else {
      delete queryParams['status'];
    }
    this.updateQueryParams();
  }

  readyToMove() {
    this.readyToMoveSelect = !this.readyToMoveSelect;
    if (this.readyToMoveSelect) {
      this.projectStatus.push('50307');
    } else if (this.readyToMoveSelect == false) {
      for (var i = 0; i < this.projectStatus.length; i++) {
        if (this.projectStatus[i] === '50307') {
          this.projectStatus.splice(i, 1);
        }
      }
    }
  }

  readyToMoveResale() {
    this.readyToMoveSelect1 = !this.readyToMoveSelect1;
    if (this.readyToMoveSelect1) {
      this.projectStatus.push('138564');
    } else if (this.readyToMoveSelect1 == false) {
      for (var i = 0; i < this.projectStatus.length; i++) {
        if (this.projectStatus[i] === '138564') {
          this.projectStatus.splice(i, 1);
        }
      }
    }
  }

  underConstruction() {
    this.underConstructionSelect = !this.underConstructionSelect;
    if (this.underConstructionSelect) {
      this.projectStatus.push('50309');
    } else if (this.underConstructionSelect == false) {
      for (var i = 0; i < this.projectStatus.length; i++) {
        if (this.projectStatus[i] === '50309') {
          this.projectStatus.splice(i, 1);
        }
      }
    }
    this.updateQueryParams();
  }

  underConstructionResale() {
    this.underConstructionSelect1 = !this.underConstructionSelect1;
    if (this.underConstructionSelect1) {
      this.projectStatus.push('138565');
    } else if (this.underConstructionSelect1 == false) {
      for (var i = 0; i < this.projectStatus.length; i++) {
        if (this.projectStatus[i] === '138565') {
          this.projectStatus.splice(i, 1);
        }
      }
    }
    this.updateQueryParams();
  }

  newLaunch() {
    this.newLaunchSelect = !this.newLaunchSelect;
    if (this.newLaunchSelect) {
      this.projectStatus.push('50310');
    } else if (this.newLaunchSelect == false) {
      for (var i = 0; i < this.projectStatus.length; i++) {
        if (this.projectStatus[i] === '50310') {
          this.projectStatus.splice(i, 1);
        }
      }
    }
    this.updateQueryParams();
  }

  upcoming() {
    this.preLaunchSelect = !this.preLaunchSelect;
    if (this.preLaunchSelect) {
      this.projectStatus.push('50308');
    } else if (this.preLaunchSelect == false) {
      for (var i = 0; i < this.projectStatus.length; i++) {
        if (this.projectStatus[i] === '50308') {
          this.projectStatus.splice(i, 1);
        }
      }
    }
    this.updateQueryParams();
  }

  sammy: any = false
  changeFurnishestype() {
    this.sammy = true
    if (this.Furnish == true) {
      this.FurnishType = [];
      this.Furnish = false;
    } else if (this.Furnish === false) {
      // alert(this.Furnish)
      this.FurnishType = ['1'];
      this.Furnish = true;
      this.SemiFurnish = false;
      this.unFurnish = false;
    }
    this.updateQueryParams();
  }

  changeSemiFurnishestype() {
    if (this.SemiFurnish == true) {
      this.FurnishType = [];        // ← [] instead of ''
      this.SemiFurnish = false;
    } else if (this.SemiFurnish === false) {
      this.FurnishType = ['2'];
      this.SemiFurnish = true;
      this.Furnish = false;
      this.unFurnish = false;
    }
    this.updateQueryParams();
  }

  changeunFurnishestype() {
    if (this.unFurnish == true) {
      this.FurnishType = [];
      this.unFurnish = false;
    } else if (this.unFurnish === false) {
      this.FurnishType = ['3'];
      this.unFurnish = true;
      this.SemiFurnish = false;
      this.Furnish = false;
    }
    this.updateQueryParams();
  }




  changeownership() {
    if (this.OwnerSelect == true) {
      this.OwnerShip = []
      this.OwnerSelect = false;
    } else if (this.OwnerSelect === false) {
      this.OwnerShip = ['654826']
      this.OwnerSelect = true;
      this.AgentSelect = false;
    }
    this.updateQueryParams();
  }

  changeagentship() {
    if (this.AgentSelect == true) {
      this.OwnerShip = []
      this.AgentSelect = false;
    } else if (this.AgentSelect === false) {
      this.OwnerShip = ['654825']
      this.AgentSelect = true;
      this.OwnerSelect = false;
    }
    this.updateQueryParams();
  }

  DoorFacing(id: any) {
    if (this.selectedFacings.includes(id)) {
      this.selectedFacings = this.selectedFacings.filter(facing => facing !== id);
    } else {
      this.selectedFacings.push(id);
    }
    this.updateQueryParams();
  }

  // BalconyClick(id: any) {
  //   if (this.Balcony.includes(id)) {
  //     this.Balcony = this.Balcony.filter(facing => facing !== id);
  //   } else {
  //     this.Balcony.push(id);
  //   }
  //   this.updateQueryParams();
  // }

  ageFilterOptions = [
    { id: 1, label: 'Below 2 Years' },
    { id: 2, label: 'Between 2 to 6 Years' },
    { id: 3, label: 'Above 6 Years' }
  ];

  FilterBYFloorsFilterOptions = [
    { id: 1, label: 'Ground Floor' },
    { id: 2, label: '1st Floor' },
    { id: 3, label: '2nd Floor' },
    { id: 4, label: '3rd Floor' },
    { id: 5, label: '4th Floor & Above' },
  ];

  FilterBYFloorsSelection(id: number): void {
    if (this.FilterBYFloors.includes(id)) {
      this.FilterBYFloors = [];
    } else {
      this.FilterBYFloors = [id];
    }
    this.updateQueryParams();
  }


  TenentFilterOptions = [
    { tenants: "Bachelor", id: "1" },
    { tenants: "Family", id: "2" },
    { tenants: "Anyone", id: "3" },
    { tenants: "Ladies", id: "4" }
  ];

  toggleTenantSelection(id: number): void {

    if (this.selectedTenant === id) {
      this.selectedTenant = null;
    } else {
      this.selectedTenant = id;
    }

    this.updateQueryParams();
  }

  toggleTenantSelection1(id: number): void {
    if (this.selectedTenant === id) {
      this.selectedTenant = null;
    } else {
      this.selectedTenant = id;
    }
    this.updateQueryParams();
  }

  Sharing_TypeSelection(id: number): void {
    if (this.Sharing_Type.includes(id)) {
      this.Sharing_Type = this.Sharing_Type.filter(facing => facing !== id);
    } else {
      this.Sharing_Type.push(id);
    }
    this.updateQueryParams();
  }

  PG_ForSelection(id: number): void {
    if (this.PG_For_Type.includes(id)) {
      this.PG_For_Type = this.PG_For_Type.filter(facing => facing !== id);
    } else {
      this.PG_For_Type.push(id);
    }
    this.updateQueryParams();
  }

  Suitable_For_TypeSelection(id: number): void {
    if (this.Suitable_For_Type.includes(id)) {
      this.Suitable_For_Type = this.Suitable_For_Type.filter(facing => facing !== id);
    } else {
      this.Suitable_For_Type.push(id);
    }
    this.updateQueryParams();
  }

  Food_Included_TypeSelection(id: number): void {
    if (this.Food_Included_Type.includes(id)) {
      this.Food_Included_Type = this.Food_Included_Type.filter(facing => facing !== id);
    } else {
      this.Food_Included_Type.push(id);
    }
    this.updateQueryParams();
  }

  // commercialPropertyTypeListing(id: number): void {
  //   if (this.commercialPropertyType.includes(id)) {
  //     this.commercialPropertyType = this.commercialPropertyType.filter(facing => facing !== id);
  //   } else {
  //     this.commercialPropertyType.push(id);
  //   }
  //   this.updateQueryParams();
  //   this.commercialDataFilter();
  // }

  commercialPropertyTypeListing(id: number): void {
    const PLOT_KEY = 3;

    if (this.commercialPropertyType.includes(id)) {
      this.commercialPropertyType = this.commercialPropertyType.filter(facing => facing !== id);
    } else {
      this.commercialPropertyType.push(id);
    }

    // Use local check instead of getter — checks the UPDATED array directly
    const onlyPlotSelected = this.commercialPropertyType.length > 0 &&
      this.commercialPropertyType.every(id => Number(id) === PLOT_KEY);

    if (onlyPlotSelected) {
      this.buildingTypeListvalue = [];
      this.furnishTypeListvalue = [];
      this.propertyAgeListvalue = [];
    }

    this.updateQueryParams();
    this.commercialDataFilter();
  }

  // Also fix the getter with Number() for HTML binding
  get isOnlyPlotSelected(): boolean {
    const PLOT_KEY = 3;
    return this.commercialPropertyType.length > 0 &&
      this.commercialPropertyType.every(id => Number(id) === PLOT_KEY);
  }

  buildingTypeListing(id: number): void {
    if (this.buildingTypeListvalue.includes(id)) {
      this.buildingTypeListvalue = this.buildingTypeListvalue.filter(facing => facing !== id);
    } else {
      this.buildingTypeListvalue.push(id);
    }
    this.updateQueryParams();
  }

  furnishTypeListing(id: number): void {
    if (this.furnishTypeListvalue.includes(id)) {
      this.furnishTypeListvalue = this.furnishTypeListvalue.filter(facing => facing !== id);
    } else {
      this.furnishTypeListvalue.push(id);
    }
    this.updateQueryParams();
  }

  propertyAgeListing(id: number): void {
    if (this.propertyAgeListvalue.includes(id)) {
      this.propertyAgeListvalue = this.propertyAgeListvalue.filter(facing => facing !== id);
    } else {
      this.propertyAgeListvalue.push(id);
    }
    this.updateQueryParams();
  }

  priceOnRequestPropList() {

    if (!isPlatformBrowser(this.platformId)) return;

    this.checkedPrice = !this.checkedPrice;
    if (this.checkedPrice) {

      this.Filter.price_on_request = 2;

      $('.slider-container-disabled').css('pointer-events', 'none');
      $('.slider-container-disabled').css('opacity', '0.5');

      this.current_max = [];
      this.current_min = [];

    }
    else {

      this.Filter.price_on_request = 1;

      $('.slider-container-disabled').css('pointer-events', 'unset');
      $('.slider-container-disabled').css('opacity', '1');

    }
    // alert(this.Filter.price_on_request)
    // ALWAYS update query params
    this.updateQueryParams();

  }

  LeasedRequestPropList() {
    this.checkedLeased = !this.checkedLeased;
    this.onlyLeased = this.checkedLeased ? 1 : 2;

    if (this.onlyLeased === 1) {
      this.current_min = [];
      this.current_max = [];
      $('.slider-container-disabled').css({
        'pointer-events': 'none',
        'opacity': '0.5'
      });
    } else {
      $('.slider-container-disabled').css({
        'pointer-events': 'unset',
        'opacity': '1'
      });
    }

    this.updateQueryParams();
  }

  private isClearing = false;

  clearBudgetChip() {

    this.isClearing = true;

    this.current_min = [];
    this.current_max = [];

    this.currentMin = '';
    this.currentMax = '';

    this.currentMin1 = '';
    this.currentMax1 = '';

    this.currentMin2 = '';
    this.currentMax2 = '';

    this.currentMin3 = '';
    this.currentMax3 = '';

    this.currentMin4 = '';
    this.currentMax4 = '';

    if (this.SelectedType === 'Buy') {

      const slider = document.getElementById('price-slider');

      if (slider && (slider as any).noUiSlider) {

        let maxBudgetInLakh =
          this.maxBudget > 10000
            ? Math.ceil(this.maxBudget / 100000 / 10) * 10
            : this.maxBudget;

        (slider as any).noUiSlider.set([10, maxBudgetInLakh]);
      }

    }

    else if (this.SelectedType === 'Rent') {

      const slider = document.getElementById('price-slider1');

      if (slider && (slider as any).noUiSlider) {
        (slider as any).noUiSlider.set([500, this.numBudget || 2500000]);
      }

    }

    else if (this.SelectedType === 'Resale') {
      const slider = document.getElementById('price-slider-resale');
      if (slider && (slider as any).noUiSlider) {
        (slider as any).noUiSlider.set([100000, 10000000]); // ✅ ₹1L to ₹1Cr in raw rupees
      }
      this.currentMin4 = '₹1 L';
      this.currentMax4 = '₹1 Cr';
    }

    else if (this.SelectedType === 'PG') {

      const slider = document.getElementById('price-slider2');

      if (slider && (slider as any).noUiSlider) {
        (slider as any).noUiSlider.set([1000, this.numBudget || 50000]);
      }

    }

    else if (this.SelectedType === 'Commercial') {

      const slider = document.getElementById('price-slider3');

      if (slider && (slider as any).noUiSlider) {
        (slider as any).noUiSlider.set([1000, this.numBudget || 2500000]);
      }

    }

    this.isClearing = false;

    this.updateQueryParams();
  }

  clearAreaChip() {
    this.area_min = [];
    this.area_max = [];

    if (this.SelectedType === 'Buy') {
      const slider = document.getElementById('sqft-slider');
      if (slider && (slider as any).noUiSlider) {
        (slider as any).noUiSlider.set([100, this.numArea || 10000]);
      }
    } else if (this.SelectedType === 'Rent') {
      const slider = document.getElementById('sqft-slider1');
      if (slider && (slider as any).noUiSlider) {
        (slider as any).noUiSlider.set([100, this.numArea || 10000]);
      }
    } else if (this.SelectedType === 'Commercial') {
      const slider = document.getElementById('sqft-slider2');
      if (slider && (slider as any).noUiSlider) {
        (slider as any).noUiSlider.set([100, this.numArea || 10000]);
      }
    } else if (this.SelectedType === 'Resale') {
      const slider = document.getElementById('sqft-slider-resale');
      if (slider && (slider as any).noUiSlider) {
        (slider as any).noUiSlider.set([100, 100000]);
      }
    }

    this.updateQueryParams();
  }

  removeLocalityChip(loc: any) {

    const id = String(loc.LocalityId);

    // ✅ track removed
    this.removedLocalities.push(id);

    this.SelectedLocalityName =
      this.SelectedLocalityName.filter(
        item => String(item.LocalityId) !== id
      );

    this.Localityid =
      this.Localityid.filter(
        val => String(val) !== id
      );

    this.testArray =
      this.testArray.filter(
        item => String(item.LocalityId) !== id
      );

    this.newNearByLocalityArry = [...this.SelectedLocalityName];

    this.skipLocalityRestore = true;
    this.updateQueryParams();
  }


  onChipRemove() {

    // ✅ Update UI immediately
    this.cdRef.detectChanges();

    // ✅ Apply filter (this updates URL + count)
    this.FilterNavigation();

  }




}