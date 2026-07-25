import { Location } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { AllindiaService } from '../allindia.service';
import { CityService } from '../city.service';
import { DataService } from '../data.service';
import { DataService2 } from '../data.service2';
import { myValue } from '../ejs-autocomplete/ejs-autocomplete.component';
import { FilterService } from '../filter.service';
import { SearchDropdownMainCityComponent } from '../search-dropdown-main-city/search-dropdown-main-city.component';
declare var $: any;
declare var swal: any;


declare var $: any;
@Component({
  selector: 'app-mat-autocomplete-new',
  templateUrl: './mat-autocomplete-new.component.html',
  styleUrls: ['./mat-autocomplete-new.component.css']
})

export class MatAutocompleteNewComponent implements OnInit {
  // @ViewChild('myDiv') myDiv!: ElementRef;
  @ViewChild('componentTrigger') SearchDropdownMainCityComponent!: SearchDropdownMainCityComponent;
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
  registerForm: FormGroup;


  currentMin: string = '₹0';
  currentMax: string = '₹5.0 Cr';

  currentMin1: string = '₹0';
  currentMax1: string = '₹5.00 L';

  currentMin2: string = '₹0';
  currentMax2: string = '₹5.0 Cr';

  currentMin3: string = '₹0';
  currentMax3: string = '₹50000 T';

  currentMinSqft: string = '0 Sqft';
  currentMaxSqft: string = '10000 Sqft';

  currentMinSqft1: string = '0 Sqft';
  currentMaxSqft1: string = '10000 Sqft';

  currentMinSqft2: string = '0 Sqft';
  currentMaxSqft2: string = '10000 Sqft';

  checkedPrice: boolean = false;
  FromCitySelecting: boolean = false;
  oneRKBedroomSelect: boolean = false;
  oneBedroomSelect: boolean = false;
  twoBedroomSelect: boolean = false;
  threeBedroomSelect: boolean = false;
  fourBedroomSelect: boolean = false;
  fiveBedroomSelect: boolean = false;
  sixBedroomSelect: boolean = false;
  sevenBedroomSelect: boolean = false;

  oneBathroomSelect: boolean = false;
  twoBathroomSelect: boolean = false;
  threeBathroomSelect: boolean = false;
  fourBathroomSelect: boolean = false;
  fiveBathroomSelect: boolean = false;

  readyToMoveSelect: boolean = false;
  underConstructionSelect: boolean = false;
  newLaunchSelect: boolean = false;
  preLaunchSelect: boolean = false;

  parkingSelect: boolean = false;
  powerBackupSelect: boolean = false;
  cctvSelect: boolean = false;
  elevatorSelect: boolean = false;


  BuySelect: boolean = false;
  RentSelect: boolean = false;
  BuyCommercialSelect: boolean = false;
  RentCommercialSelect: boolean = false;
  PGSelect: boolean = false;
  CommercialSelect: boolean = false;
  ResidentialSelect: boolean = false;

  apartmentSelect: boolean = false;
  villaSelect: boolean = false;
  plotSelect: boolean = false;
  HouseSelect: boolean = false;

  Furnish: boolean = false;
  SemiFurnish: boolean = false;
  unFurnish: boolean = false;

  OwnerSelect: boolean = false;
  AgentSelect: boolean = false;

  ImmediateSelect = false;
  SixMonthsSelect = false;
  OneYearSelect = false;
  twoYearSelect = false;
  loadcomponent = false;



  SelectedLocality_id = [];

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
  SelectedLocality = [];
  SelectedLocalityName = [];
  newNearByLocalityArry = [];
  amenityId = [];
  testArray: any = [];
  isExpanded = {};
  projecttype = [];
  area_min = [];
  area_max = [];
  current_min = [];
  current_max = [];
  currentMinBudget: any;
  currentMaxBudget: any;
  projectcount: any;
  recentSearches = [];
  localityname: any;
  maxArea: any = [];
  maxBudget: any = [];
  private isTriggered = false;
  isDivVisible = false;
  price_on_request: any = 1;
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


  constructor(private allindia: AllindiaService, private location: Location, private activatedRoute: ActivatedRoute, public Service: DataService, private Service2: DataService2, private cityservice: CityService, private fb: FormBuilder, private router: Router,
    public Filter: FilterService, private cdRef: ChangeDetectorRef
  ) {
    if (this.isTriggered == false) {
      this.isTriggered = true;
      this.Service.mouseenterlisten5().subscribe((m: any) => {
        var city = localStorage.getItem('CityName');
        this.SecondModalOpen(city);
      })
    }

  }
  sale_rent: any;
  ngOnInit(): void {
    this.clickedCityName = localStorage.getItem('CityName');
    this.selectedCity = this.clickedCityName;
    this.getlocationlist();
    this.Lazyload();
    if (this.router.url.indexOf('/rent/') > -1) {
      this.Rentclick();
      this.Residentialclick();
    } else if (this.router.url.indexOf('/rental/') > -1) {
      this.Rentclick();
      this.Residentialclick();
    } else if (this.router.url.indexOf('/pgcl/pg-for-rent-in-') > -1) {
      this.Residentialclick();
      this.PGclick();
    } else if (this.router.url.indexOf('/pg-home') > -1) {
      this.Residentialclick();
      this.PGclick();
    } else if (this.router.url.indexOf('/commercial') > -1) {
      this.Commercialclick();
      if (this.router.url.indexOf("commercial-properties-for-sale-in") > -1) {
        this.sale_rent = 1;
        this.BuyCommercialclick();
      } else if (this.router.url.indexOf("commercial-properties-for-rent-in") > -1) {
        this.sale_rent = 2;
        this.RentCommercialclick();
      } else {

      }
    }
    else {
      this.Residentialclick();
      this.Buyclick();
    }
    this.Buyclick()
    this.activatedRoute.queryParamMap.subscribe(params => {
      const isEmpty = Object.keys(params['params']).length === 0;
      if (isEmpty == false) {
        this.projecttype = params['params']['propertytype'] ? (Array.isArray(params['params']['propertytype']) ? params['params']['propertytype'].map(String) : String(params['params']['propertytype']).split(',')) : [];
        this.Localityid = params['params']['localityid'] ? (Array.isArray(params['params']['localityid']) ? params['params']['localityid'].map(String) : String(params['params']['localityid']).split(',')) : [];
        // ;
        this.current_min = params['params']['min'] ? (Array.isArray(params['params']['min']) ? params['params']['min'].map(String) : String(params['params']['min']).split(',')) : [];
        this.current_max = params['params']['max'] ? (Array.isArray(params['params']['max']) ? params['params']['max'].map(String) : String(params['params']['max']).split(',')) : [];
        this.area_min = params['params']['sqftmin'] ? (Array.isArray(params['params']['sqftmin']) ? params['params']['sqftmin'].map(String) : String(params['params']['sqftmin']).split(',')) : [];
        this.area_max = params['params']['sqftmax'] ? (Array.isArray(params['params']['sqftmax']) ? params['params']['sqftmax'].map(String) : String(params['params']['sqftmax']).split(',')) : [];
        this.noOfBedrooms = params['params']['bedroom'] ? (Array.isArray(params['params']['bedroom']) ? params['params']['bedroom'].map(String) : String(params['params']['bedroom']).split(',')) : [];
        this.noOfBathrooms = params['params']['bathroom'] ? (Array.isArray(params['params']['bathroom']) ? params['params']['bathroom'].map(String) : String(params['params']['bathroom']).split(',')) : [];
        this.possission = params['params']['availability'] ? (Array.isArray(params['params']['availability']) ? params['params']['availability'].map(String) : String(params['params']['availability']).split(',')) : [];
        // this.projectStatus = params['params']['status'] ? (Array.isArray(params['params']['status']) ? params['params']['status'].map(String) : String(params['params']['status']).split(',')) : [];
        this.projectStatus = params['params']['status'] ? (Array.isArray(params['params']['status']) ? params['params']['status'].map(String) : String(params['params']['status']).split(',')) : [];
        this.selectedStatus = Object.keys(this.projectStatusMap).find(key => this.projectStatus.includes(this.projectStatusMap[key])) || null;
        this.amenityId = params['params']['amenities'] ? (Array.isArray(params['params']['amenities']) ? params['params']['amenities'].map(String) : String(params['params']['amenities']).split(',')) : [];
        this.selectedFacings = params['params']['doorfacing'] ? (Array.isArray(params['params']['doorfacing']) ? params['params']['doorfacing'].map(String) : String(params['params']['doorfacing']).split(',')) : [];
        // this.selectedAge = params['params']['propertyage'] ? (Array.isArray(params['params']['propertyage']) ? params['params']['propertyage'].map(String) : String(params['params']['propertyage']).split(',')) : [];
        this.selectedTenant = params['params']['tenants'] ? (Array.isArray(params['params']['tenants']) ? params['params']['tenants'].map(String) : String(params['params']['tenants']).split(',')) : [];
        this.todaydate = params['params']['fromdate'] ? (Array.isArray(params['params']['fromdate']) ? params['params']['fromdate'].map(String) : String(params['params']['fromdate']).split(',')) : [];
        this.futuredate = params['params']['available'] ? (Array.isArray(params['params']['available']) ? params['params']['available'].map(String) : String(params['params']['available']).split(',')) : [];

        this.Sharing_Type = params['params']['roomtype'] ? (Array.isArray(params['params']['roomtype']) ? params['params']['roomtype'].map(String) : String(params['params']['roomtype']).split(',')) : [];
        this.PG_For_Type = params['params']['pgavailablefor'] ? (Array.isArray(params['params']['pgavailablefor']) ? params['params']['pgavailablefor'].map(String) : String(params['params']['pgavailablefor']).split(',')) : [];
        this.Suitable_For_Type = params['params']['pgbestsuit'] ? (Array.isArray(params['params']['pgbestsuit']) ? params['params']['pgbestsuit'].map(String) : String(params['params']['pgbestsuit']).split(',')) : [];
        this.Food_Included_Type = params['params']['pgfoodtype'] ? (Array.isArray(params['params']['pgfoodtype']) ? params['params']['pgfoodtype'].map(String) : String(params['params']['pgfoodtype']).split(',')) : [];

        this.buildingTypeListvalue = params['params']['buildingtype'] ? (Array.isArray(params['params']['buildingtype']) ? params['params']['buildingtype'].map(String) : String(params['params']['buildingtype']).split(',')) : [];
        this.furnishTypeListvalue = params['params']['furnishstatus'] ? (Array.isArray(params['params']['furnishstatus']) ? params['params']['furnishstatus'].map(String) : String(params['params']['furnishstatus']).split(',')) : [];
        this.propertyAgeListvalue = params['params']['Plotage'] ? (Array.isArray(params['params']['Plotage']) ? params['params']['Plotage'].map(String) : String(params['params']['Plotage']).split(',')) : [];
        this.commercialPropertyType = params['params']['Propertype'] ? (Array.isArray(params['params']['Propertype']) ? params['params']['Propertype'].map(String) : String(params['params']['Propertype']).split(',')) : [];


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
        this.sixBedroomSelect = this.noOfBedrooms.some(id => ['8'].includes(id)); // No rent ID given
        this.sevenBedroomSelect = this.noOfBedrooms.some(id => ['7'].includes(id)); // No rent ID given

        this.oneBathroomSelect = this.noOfBathrooms.some(id => ['24750', '1'].includes(id));
        this.twoBathroomSelect = this.noOfBathrooms.some(id => ['24751', '2'].includes(id));
        this.threeBathroomSelect = this.noOfBathrooms.some(id => ['24752', '3'].includes(id));
        this.fourBathroomSelect = this.noOfBathrooms.some(id => ['24753', '4'].includes(id));

        this.ImmediateSelect = this.possission.some(id => ['1'].includes(id));
        this.SixMonthsSelect = this.possission.some(id => ['6'].includes(id));
        this.OneYearSelect = this.possission.some(id => ['12'].includes(id));
        this.twoYearSelect = this.possission.some(id => ['24'].includes(id));

        this.readyToMoveSelect = this.projectStatus.some(id => ['50307'].includes(id));
        this.underConstructionSelect = this.projectStatus.some(id => ['50309'].includes(id));
        this.newLaunchSelect = this.projectStatus.some(id => ['50310'].includes(id));
        this.preLaunchSelect = this.projectStatus.some(id => ['50308'].includes(id));

        this.parkingSelect = this.amenityId.some(id => ['41'].includes(id));
        this.powerBackupSelect = this.amenityId.some(id => ['32'].includes(id));
        this.cctvSelect = this.amenityId.some(id => ['42'].includes(id));
        this.elevatorSelect = this.amenityId.some(id => ['37'].includes(id));
        this.updatecount();
      }
    });
    this.registerForm = this.fb.group({
      projectType: [''],
      minBudget: [''],
      maxBudget: [''],
      posessionWithin: [''],
      locality: [''],
    });
    this.projectcount = 0
    this.recentSearches = this.getRecentSearches();

    // this.location.subscribe((event: any) => {
    //   if (event.pop) {
    //     // ;
    //     $('#filterModal').modal('show');
    //   }
    // });
  }
  // checkQueryParamsAndOpenModal() {
  //   this.activatedRoute.queryParams.subscribe((params) => {
  //     if (Object.keys(params).length > 0) {

  //     }
  //   });
  // }

  numBudget: number;
  numArea: number;
  loadNoUiSlider(): void {
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

      this.Service.getprojectscount(this.selectedCity, param).subscribe(countprojects => {
        if (countprojects['status'] === 'True') {
          let projectcount = countprojects['Counts'];
          this.projectcount = projectcount[0].PropertyCounts;
        } else {
          this.projectcount = 0;
        }

      });

    } else if (this.SelectedType == 'Rent') {
      var param1 = {
        proptypeid: this.projecttype,
        locality: this.Localityid,
        bedroom: this.noOfBedrooms,
        bathroom: this.noOfBathrooms,
        price_on_request: this.Filter.price_on_request,
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
        // propertyage: this.selectedAge
      }

      this.Service.getRentprojectscount(this.selectedCity, param1).subscribe(countprojects => {
        if (countprojects['status'] === 'True') {
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

      this.Service.PGRentCount(this.selectedCity, param2).subscribe(countprojects => {
        if (countprojects['status'] === 'True') {
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
        fromdate: this.futuredate,
        area_max: this.area_max,
        area_min: this.area_min,
        Property_Age: this.propertyAgeListvalue,
        Furnishing: this.furnishTypeListvalue,
        minprice: this.current_min,
        maxprice: this.current_max,
        Building_type: this.buildingTypeListvalue,
      }

      this.Service.commercialSalePropertiesCount(this.selectedCity, param3).subscribe(countprojects => {
        if (countprojects['status'] === 'True') {
          let projectcount = countprojects['Counts'];
          this.projectcount = projectcount[0].PropertyCounts;
        } else {
          this.projectcount = 0;
        }
      })
    }
  }

  UpdateSliderBuy() {
    const slider = document.getElementById('price-slider');
    if (slider && (slider as any).noUiSlider) {
      // Update slider values dynamically
      (slider as any).noUiSlider.updateOptions({
        range: {
          'min': 10,
          '50%': 100,
          'max': this.maxBudget > 10000 ? Math.ceil(this.maxBudget / 100000 / 10) * 10 : this.maxBudget
        },
        start: [10, this.maxBudget > 10000 ? this.maxBudget / 100000 : this.maxBudget]
      });
    } else {
      // If slider is not initialized, load it
      this.loadNoUiSlider();
    }
  }

  UpdateSliderRent() {
    this.numBudget = parseFloat(this.maxBudget);
    this.numArea = parseFloat(this.maxArea);
    const slider = document.getElementById('price-slider1');
    if (slider && (slider as any).noUiSlider) {
      // Update slider values dynamically
      let maxRentBudget = this.numBudget || 2500000; // Default max budget (25L)
      let minRentBudget = 1000; // Set minimum value to 500
      (slider as any).noUiSlider.updateOptions({
        range: {
          'min': minRentBudget,
          '10%': 10000,
          '50%': 100000,
          'max': maxRentBudget
        },
        start: [minRentBudget, maxRentBudget],
      });
    } else {
      this.loadNoUiSlider();
    }
  }

  UpdateSliderPGRent() {
    this.numBudget = parseFloat(this.maxBudget);
    // 
    const slider = document.getElementById('price-slider2');
    if (slider && (slider as any).noUiSlider) {
      let maxRentBudget = this.numBudget || 50000;
      let minRentBudget = 1000;
      (slider as any).noUiSlider.updateOptions({
        range: {
          'min': minRentBudget,
          'max': maxRentBudget
        },
        start: [minRentBudget, maxRentBudget],
      });
    } else {
      this.loadNoUiSlider();
    }
  }

  UpdateSliderCommercial() {
    this.numBudget = parseFloat(this.maxBudget);
    this.numArea = parseFloat(this.maxArea);
    const slider = document.getElementById('price-slider3');
    const sqft_slider3 = document.getElementById('sqft-slider2');

    if (slider && (slider as any).noUiSlider) {
      let maxRentBudget = this.numBudget || 50000;
      let minRentBudget = 1000;
      (slider as any).noUiSlider.updateOptions({
        range: {
          'min': minRentBudget,
          '10%': 10000,
          '50%': 100000,
          'max': maxRentBudget
        },
        start: [minRentBudget, maxRentBudget],
      });
    } else {
      this.loadNoUiSlider();
    }
    if (sqft_slider3 && (sqft_slider3 as any).noUiSlider) {
      let maxArea = this.numArea || 10000;
      let minArea = 100;

      (sqft_slider3 as any).noUiSlider.updateOptions({
        range: {
          'min': 100,
          '25%': 1000,
          '50%': 5000,
          'max': maxArea
        },
        start: [minArea, maxArea],
      });
    } else {
      this.loadNoUiSlider();
    }

  }

  initializeSlider(): void {
    this.numBudget = parseFloat(this.maxBudget);
    this.numArea = parseFloat(this.maxArea);
    const price_slider = document.getElementById('price-slider');
    const price_slider1 = document.getElementById('price-slider1');
    const price_slider2 = document.getElementById('price-slider2');
    const price_slider3 = document.getElementById('price-slider3');
    const noUiSlider = (window as any).noUiSlider;

    if (this.SelectedType == 'Buy') {
      let maxBudgetInLakh = this.numBudget > 10000 ? this.numBudget / 100000 : this.numBudget;
      maxBudgetInLakh = Math.ceil(maxBudgetInLakh / 10) * 10;

      if (price_slider && noUiSlider) {
        noUiSlider.create(price_slider as any, {
          start: [10, maxBudgetInLakh], // Initial slider range
          connect: true,
          range: {
            'min': 10,
            '50%': 100, // 100L (1Cr) at midpoint
            'max': maxBudgetInLakh
          },
          step: 10, // Default step 10L
          tooltips: false,
          format: {
            to: function (value) {
              value = Math.round(value);
              return value >= 100 ? `₹${value / 100} Cr` : `₹${value} L`;
            },
            from: function (value) {
              let numericValue = parseFloat(value.replace(/₹|L|Cr/g, ''));
              return value.includes('Cr') ? numericValue * 100 : numericValue;
            }
          }
        });

        const minValue = document.getElementById('current-min');
        const maxValue = document.getElementById('current-max');

        (price_slider as any).noUiSlider.on('update', (values: string[]) => {
          this.currentMin = values[0];
          this.currentMax = values[1];

          if (minValue) minValue.innerHTML = this.currentMin;
          if (maxValue) maxValue.innerHTML = this.currentMax;
        });

        // Adjust step dynamically
        (price_slider as any).noUiSlider.on('slide', (values: string[], handle: number) => {
          let value = parseFloat(values[handle].replace(/₹|L|Cr/g, ''));

          let stepSize = value >= 100 ? 100 : 10; // If >= 1Cr, step by 1Cr, else step by 10L

          (price_slider as any).noUiSlider.updateOptions({
            step: stepSize
          });
        });

        (price_slider as any).noUiSlider.on('change', (values: string[]) => {
          const rawMinValue = parseFloat(values[0].replace(/₹|L|Cr/g, '')) * (values[0].includes('Cr') ? 10000000 : 100000);
          const rawMaxValue = parseFloat(values[1].replace(/₹|L|Cr/g, '')) * (values[1].includes('Cr') ? 10000000 : 100000);

          this.current_min = [rawMinValue];
          this.current_max = [rawMaxValue];
          this.updatecount();
          this.updateQueryParams();
        });
      }
    } else if (this.SelectedType == 'Rent') {
      let maxRentBudget = this.numBudget || 2500000; // Default max budget (25L)
      let minRentBudget = 500; // Set minimum value to 500
      if (price_slider1 && noUiSlider) {
        noUiSlider.create(price_slider1 as any, {
          start: [minRentBudget, maxRentBudget],
          connect: true,
          range: {
            'min': minRentBudget,
            '10%': 10000,
            '50%': 100000,
            'max': maxRentBudget
          },
          step: 500, // Default step size (500 for values in thousands)
          tooltips: false,
          format: {
            to: function (value) {
              if (value >= 10000000) {
                return '₹' + (value / 10000000).toFixed(2) + 'Cr'; // Convert to Crores
              } else if (value >= 100000) {
                return '₹' + (value / 100000).toFixed(0) + 'L'; // Convert to Lakhs
              } else if (value >= 1000) {
                return '₹' + (value / 1000).toFixed(0) + 'K'; // Convert to Thousands
              } else {
                return '₹' + value;
              }
            },
            from: function (value) {
              value = value.replace('₹', '');
              if (value.includes('Cr')) {
                return parseFloat(value.replace('Cr', '')) * 10000000;
              } else if (value.includes('L')) {
                return parseFloat(value.replace('L', '')) * 100000;
              } else if (value.includes('K')) {
                return parseFloat(value.replace('K', '')) * 1000;
              } else {
                return parseFloat(value);
              }
            }
          }
        });

        const minValue = document.getElementById('current-min1');
        const maxValue = document.getElementById('current-max1');

        (price_slider1 as any).noUiSlider.on('update', (values: string[]) => {
          this.currentMin1 = values[0];
          this.currentMax1 = values[1];

          if (minValue) minValue.innerHTML = this.currentMin1;
          if (maxValue) maxValue.innerHTML = this.currentMax1;
        });

        (price_slider1 as any).noUiSlider.on('change', (values: string[]) => {
          const rawMinValue = parseFloat(values[0].replace(/[₹KLCr]/g, '')) *
            (values[0].includes('Cr') ? 10000000 : values[0].includes('L') ? 100000 : values[0].includes('K') ? 1000 : 1);
          const rawMaxValue = parseFloat(values[1].replace(/[₹KLCr]/g, '')) *
            (values[1].includes('Cr') ? 10000000 : values[1].includes('L') ? 100000 : values[1].includes('K') ? 1000 : 1);

          this.current_min = [rawMinValue];
          this.current_max = [rawMaxValue];
          this.updatecount();
          this.updateQueryParams();
          // Dynamically adjust step sizes AFTER sliding stops
          let newStepMin = rawMinValue < 100000 ? 500 : 10000; // <1L → 500, ≥1L → 10K
          let newStepMax = rawMaxValue < 100000 ? 500 : 10000; // <1L → 500, ≥1L → 10K

          (price_slider1 as any).noUiSlider.updateOptions({ step: [newStepMin, newStepMax] });
        });
      }
    } else if (this.SelectedType == 'PG') {
      let maxRentBudget = this.numBudget || 50000;
      let minRentBudget = 1000;

      const noUiSlider = (window as any).noUiSlider;

      if (price_slider2 && noUiSlider) {
        noUiSlider.create(price_slider2 as any, {
          start: [minRentBudget, maxRentBudget],
          connect: true,
          range: {
            min: minRentBudget,
            max: maxRentBudget
          },
          step: 1000, // jump exactly in 1K increments
          tooltips: false,
          format: {
            to: function (value) {
              if (value >= 1000) {
                return '₹' + Math.round(value / 1000) + 'K'; // no decimals
              } else {
                return '₹' + value;
              }
            },
            from: function (value) {
              value = value.replace('₹', '');
              if (value.includes('K')) {
                return parseInt(value.replace('K', ''), 10) * 1000;
              } else {
                return parseFloat(value);
              }
            }
          }
        });

        const minValue = document.getElementById('current-min3');
        const maxValue = document.getElementById('current-max3');

        (price_slider2 as any).noUiSlider.on('update', (values: string[]) => {
          this.currentMin3 = values[0];
          this.currentMax3 = values[1];
          if (minValue) minValue.innerHTML = values[0];
          if (maxValue) maxValue.innerHTML = values[1];
        });

        (price_slider2 as any).noUiSlider.on('change', (values: string[]) => {
          const rawMinValue =
            parseInt(values[0].replace(/[₹K]/g, ''), 10) * 1000;
          const rawMaxValue =
            parseInt(values[1].replace(/[₹K]/g, ''), 10) * 1000;

          this.current_min = [rawMinValue];
          this.current_max = [rawMaxValue];
          this.updatecount();
          this.updateQueryParams();
        });
      }

    } else if (this.SelectedType == 'Commercial') {
      let maxRentBudget = this.numBudget || 2500000; // Default max budget (25L)
      let minRentBudget = 1000;
      const noUiSlider = (window as any).noUiSlider;

      if (price_slider3 && noUiSlider) {
        noUiSlider.create(price_slider3 as any, {
          start: [minRentBudget, maxRentBudget],
          connect: true,
          range: {
            'min': minRentBudget,
            '10%': 10000,
            '50%': 100000,
            'max': maxRentBudget
          },
          step: 500,
          tooltips: false,
          format: {
            to: function (value) {
              if (value >= 10000000) {
                return '₹' + (value / 10000000).toFixed(2) + 'Cr';
              } else if (value >= 100000) {
                return '₹' + (value / 100000).toFixed(0) + 'L';
              } else if (value >= 1000) {
                return '₹' + (value / 1000).toFixed(0) + 'K';
              } else {
                return '₹' + value;
              }
            },
            from: function (value) {
              value = value.replace('₹', '');
              if (value.includes('Cr')) {
                return parseFloat(value.replace('Cr', '')) * 10000000;
              } else if (value.includes('L')) {
                return parseFloat(value.replace('L', '')) * 100000;
              } else if (value.includes('K')) {
                return parseFloat(value.replace('K', '')) * 1000;
              } else {
                return parseFloat(value);
              }
            }
          }
        });

        const minValue = document.getElementById('current-min2');
        const maxValue = document.getElementById('current-max2');

        (price_slider3 as any).noUiSlider.on('update', (values: string[]) => {
          this.currentMin2 = values[0];
          this.currentMax2 = values[1];
          if (minValue) minValue.innerHTML = values[0];
          if (maxValue) maxValue.innerHTML = values[1];
        });

        (price_slider3 as any).noUiSlider.on('change', (values: string[]) => {
          const rawMinValue =
            parseFloat(values[0].replace(/[₹KLCr]/g, '')) *
            (values[0].includes('Cr')
              ? 10000000
              : values[0].includes('L')
                ? 100000
                : values[0].includes('K')
                  ? 1000
                  : 1);
          const rawMaxValue =
            parseFloat(values[1].replace(/[₹KLCr]/g, '')) *
            (values[1].includes('Cr')
              ? 10000000
              : values[1].includes('L')
                ? 100000
                : values[1].includes('K')
                  ? 1000
                  : 1);

          this.current_min = [rawMinValue];
          this.current_max = [rawMaxValue];
          this.updatecount();
          this.updateQueryParams();

          let newStepMin = rawMinValue < 100000 ? 500 : 10000;
          let newStepMax = rawMaxValue < 100000 ? 500 : 10000;
          (price_slider3 as any).noUiSlider.updateOptions({
            step: [newStepMin, newStepMax]
          });
        });
      }
    }

    const sqft_slider1 = document.getElementById('sqft-slider');
    const sqft_slider2 = document.getElementById('sqft-slider1');
    const sqft_slider3 = document.getElementById('sqft-slider2');
    const noUiSlider1 = (window as any).noUiSlider

    if (this.SelectedType == 'Buy') {
      let maxRentArea = this.numArea || 10000; // Default max area 10K sqft
      let minRentArea = 100; // Set minimum value to 100

      if (sqft_slider1 && noUiSlider1) {
        noUiSlider1.create(sqft_slider1, {
          start: [minRentArea, maxRentArea],
          connect: true,
          range: {
            'min': 100,
            '25%': 1000,
            '50%': 5000,
            'max': maxRentArea
          },
          step: 100, // Initial step
          tooltips: false,
          format: {
            to: (value: number) => `${value} sqft`,
            from: (value: string) => parseFloat(value.replace(' sqft', ''))
          }
        });

        const minValue = document.getElementById('current-min-Sqft');
        const maxValue = document.getElementById('current-max-Sqft');

        (sqft_slider1 as any).noUiSlider.on('update', (values: string[]) => {
          const [minSqft, maxSqft] = values.map(value => parseInt(value));
          if (minValue) minValue.innerHTML = `${minSqft} sqft`;
          if (maxValue) maxValue.innerHTML = `${maxSqft} sqft`;
        });

        (sqft_slider1 as any).noUiSlider.on('change', (values: string[]) => {
          this.area_min = [parseInt(values[0])];
          this.area_max = [parseInt(values[1])];
          this.updatecount();
          this.updateQueryParams();
        });

        // Dynamically adjust step sizes for better range control
        (sqft_slider1 as any).noUiSlider.on('slide', (values: string[], handle: number) => {
          let rawValue = parseInt(values[handle]);

          let newStep;
          if (rawValue < 1000) {
            newStep = 100; // Steps of 100 below 1K
          } else if (rawValue < 5000) {
            newStep = 500; // Steps of 500 from 1K to 5K
          } else {
            newStep = 1000; // Steps of 1000 above 5K
          }

          (sqft_slider1 as any).noUiSlider.updateOptions({ step: newStep });
        });
      }
    } else if (this.SelectedType == 'Rent') {
      let maxRentArea = this.numArea || 10000; // Default max Area (10K)
      let minRentArea = 100; // Set minimum value to 500

      if (sqft_slider2 && noUiSlider1) {
        noUiSlider1.create(sqft_slider2, {
          start: [minRentArea, maxRentArea],
          connect: true,
          range: {
            'min': 100,
            '25%': 1000,
            '50%': 5000,
            'max': maxRentArea
          },
          step: 100,
          tooltips: false,
          format: {
            to: (value: number) => `${value} sqft`,
            from: (value: string) => parseFloat(value.replace(' sqft', ''))
          }
        });
        const minValue = document.getElementById('current-min-Sqft1');
        const maxValue = document.getElementById('current-max-Sqft1');
        (sqft_slider2 as any).noUiSlider.on('update', (values: string[]) => {
          const [minSqft, maxSqft] = values.map(value => parseInt(value));
          if (minValue) minValue.innerHTML = `${minSqft} sqft`;
          if (maxValue) maxValue.innerHTML = `${maxSqft} sqft`;
        });
        (sqft_slider2 as any).noUiSlider.on('change', (values: string[]) => {
          this.area_min = [parseInt(values[0])];
          this.area_max = [parseInt(values[1])];
          this.updatecount();
          this.updateQueryParams();
        });
      }
    } else if (this.SelectedType == 'Commercial') {
      let maxArea = this.numArea || 10000;
      let minArea = 100;
      const noUiSlider1 = (window as any).noUiSlider;

      if (sqft_slider3 && noUiSlider1) {
        noUiSlider1.create(sqft_slider3, {
          start: [minArea, maxArea],
          connect: true,
          range: {
            'min': 100,
            '25%': 1000,
            '50%': 5000,
            'max': maxArea
          },
          step: 100,
          tooltips: false,
          format: {
            to: (value: number) => `${value} sqft`,
            from: (value: string) => parseFloat(value.replace(' sqft', ''))
          }
        });

        const minValue = document.getElementById('current-min-Sqft2');
        const maxValue = document.getElementById('current-max-Sqft2');

        (sqft_slider3 as any).noUiSlider.on('update', (values: string[]) => {
          const [minSqft, maxSqft] = values.map(value => parseInt(value));
          if (minValue) minValue.innerHTML = `${minSqft} sqft`;
          if (maxValue) maxValue.innerHTML = `${maxSqft} sqft`;
          this.currentMinSqft2 = `${minSqft} sqft`;
          this.currentMaxSqft2 = `${maxSqft} sqft`;

        });

        (sqft_slider3 as any).noUiSlider.on('change', (values: string[]) => {
          this.area_min = [parseInt(values[0])];
          this.area_max = [parseInt(values[1])];
          this.updatecount();
          this.updateQueryParams();
        });
      }
    }
  }

  CloseModal() {
    (document.activeElement as HTMLElement)?.blur();
    $('#FirstCityModal').modal('hide');
    $('.head_stick').css('display', 'block');
    $('.modal-backdrop').removeClass('modal-backdrop fade show');

  }

  CloseModal1() {
    (document.activeElement as HTMLElement)?.blur();
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

  FirstModalOpen() {
    (document.activeElement as HTMLElement)?.blur();
    this.selectedCity = undefined;
    $('#SecondCityModal').modal('hide');
    $('#FirstCityModal').modal('show');
    this.resetToggleShowMore();
    $('.modal-backdrop').removeClass('modal-backdrop fade show');

  }

  ThirdModalOpen() {

    // this.selectedCity = undefined;   
    $('#FirstCityModal').modal('hide');
    $('#filterModal').modal('hide');
    $('#SecondCityModal').modal('show');
  }
  trending: any;
  topLocalitiesList = [];
  trendingdiv = false;

  LocalityModalOpen(item) {
    const transformedObject = {
      LocalityId: item.id,
      locality_name: item.localityname
    };
    // console.log(transformedObject);
    localStorage.setItem('LocalityName', item.localityname);
    // Check if item with the same LocalityId already exists
    const isDuplicate = this.testArray.some(obj => obj.LocalityId === item.id);

    if (!isDuplicate) {
      this.testArray.push(transformedObject);
      this.SelectedLocality_id.push(item.id);
      this.Localityid.push(item.id);
      // ;
      this.Service.mouseenterservice4();
      $('#filterModal').modal('show');

      this.Service.getNearlocalities(item.id).subscribe(prop => {
        const nearByLocality = prop['details'];
        this.newNearByLocalityArry = [];

        if (nearByLocality.length > 0) {
          const requiredCount = 6 - this.SelectedLocalityName.length;
          const nearbyLocalities = nearByLocality
            .map(item => item['locality'][0])
            .filter(loc => !this.SelectedLocalityName.some(sel => sel.locality_name === loc.locality_name));

          this.newNearByLocalityArry = nearbyLocalities.slice(0, requiredCount);
        }

        this.SelectedLocalityName = this.testArray;
        this.newNearByLocalityArry = [...this.SelectedLocalityName, ...this.newNearByLocalityArry].slice(0, 6);
      });
    } else {
      // Alert user if it's a duplicate
      swal({
        title: 'Locality already exists',
        type: 'warning',
        showConfirmButton: false,
        timer: 1500
      });
      $('#filterModal').modal('show');

    }
    this.updatecount();
    this.updateQueryParams();
  }

  SecondModalOpen(item) {
    this.selectedCity = item;
    var CityName = item || $('#City_Name').val();
    this.clickedCityName = CityName;

    if (this.selectedCity == undefined) {
    } else if (this.selectedCity == CityName) {
      this.SelectedLocalityName = [];
      this.testArray = [];
      this.newNearByLocalityArry = [];

      localStorage.setItem('CityName', CityName);
      $('#SecondCityModal').modal('show');
      this.SearchDropdownMainCityComponent.ValuePAssing();
      var lowercasecityname = CityName.toLowerCase();

      var value = this.cityservice.cityfinder(lowercasecityname);
      this.cityid = value.cityid;

      // this.Service.getbuilderAuto(this.cityid).subscribe((myLocalList: any[]) => {
      //   this.autoCompleteData_build = myLocalList['autolist'];
      // });
      this.Service.getbuilderAuto(this.cityid).subscribe((myLocalList) => {
        this.autoCompleteData_build = myLocalList?.autolist || [];
      });
      var param = {
        cityid: this.cityid,
      };

      var paramss = {
        cityId: this.cityid,
      };

      this.Service2.gettrendingprojects(param).subscribe((trend: any[]) => {
        this.trending = trend['Trending'][0]['properties'];
        if (this.trending == 0) {
          this.trendingdiv = false;
        } else {
          this.trendingdiv = true;

        }
      });

      this.Service.getTopLocalities(paramss).subscribe((responce: any[]) => {
        this.topLocalitiesList = responce['localitylimitlist'];
      });

      if (this.loadcomponent == false) {
        import('../ejs-autocomplete/ejs-autocomplete-module').then(mod => mod.EjsAutocompleteModule).then(EjsAutocompleteModule => {
          this.Ejscomponent = EjsAutocompleteModule.components['lazy'];
          this.loadcomponent = true;
        });
      } else {
        this.Service.mouseenterservice4();
      }

    } else {
    }
    this.activatedRoute.queryParams.subscribe(params => {
      if (params['localityid']) {
        this.Localityid = params['localityid']?.split(',').map(id => id.trim()) || [];
        // ;
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
            map(metatag => {
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
          this.SelectedLocalityName = selectedLocalities.filter(Boolean);
          this.Service.getNearlocalities(lastlocalityid).subscribe(prop => {
            const nearByLocality = prop['details'] || [];
            this.newNearByLocalityArry = [];

            if (nearByLocality.length > 0) {
              const requiredCount = 6 - this.SelectedLocalityName.length;
              const nearbyLocalities = nearByLocality
                .map(item => item['locality'][0])
                .filter(loc => !this.SelectedLocalityName.some(sel => sel.locality_name === loc))
                .slice(-requiredCount);

              this.newNearByLocalityArry = [...this.SelectedLocalityName, ...nearbyLocalities];
            } else {
              this.newNearByLocalityArry = [...this.SelectedLocalityName];
            }

            this.newNearByLocalityArry = this.newNearByLocalityArry.slice(0, 6);
          });
        });
      } else {
      }
    });

    if (this.router.url.includes('/rent/') || this.router.url.includes('/rental/')) {
      this.getfilterdatalist();
    } else if (this.router.url.indexOf('/cll/') > -1) {
      this.commercialDataFilter();
    } else if (this.router.url.indexOf('/pgcl/pg-for-rent-in-') > -1) {
      this.PgDataFilters();
    } else {
      this.getbhkList();
    }
    this.FromCitySelecting = true;
    this.updatecount();
  }

  getlocationlist() {
    this.allindia.getlocationlist().subscribe((city: any[]) => {
      this.citiesss = city['locations'];
      for (let i = 0; i < this.topCitiesMy.length; i++) {
        this.citiesss = this.citiesss.filter((item) => item.city);
      }
      this.Allcities = city['locations'];
      for (let i = 0; i < this.topCitiesMy.length; i++) {
        this.Allcities = this.Allcities.filter(
          (item) => item.city !== this.topCitiesMy[i].item
        );
      }
    });
  }
  Lazyload() {

    myValue.subscribe(updatedValue => {
      // console.log('updatedValue', updatedValue);

      this.SelectedLocality = updatedValue;
      updatedValue.forEach((item) => {
        this.SelectedLocality_id = item.LocalityId;
        if (this.FromCitySelecting == true) {
          this.FromCitySelecting = false;
          this.Localityid = [];
          this.Localityid.push(this.SelectedLocality_id);
          // 
        } else {
          this.Localityid.push(this.SelectedLocality_id);

        }
        if (!this.testArray.some((obj) => obj.LocalityId === item.LocalityId)) {
          this.testArray.push(item);

          this.Service.getNearlocalities(this.SelectedLocality_id).subscribe(prop => {
            var nearByLocality = prop['details'];
            this.newNearByLocalityArry = [];

            if (nearByLocality.length > 0) {
              let requiredCount = 6 - this.SelectedLocalityName.length;
              const nearbyLocalities = nearByLocality.map(item => item['locality'][0]).filter(loc => !this.SelectedLocalityName.includes(loc));
              this.newNearByLocalityArry = nearbyLocalities.slice(0, requiredCount);
            }
            this.SelectedLocalityName = this.testArray;
            this.newNearByLocalityArry = [...this.SelectedLocalityName, ...this.newNearByLocalityArry].slice(0, 6);
            this.newNearByLocalityArry = Array.from(
              new Map(this.newNearByLocalityArry.map(item => [item.LocalityId, item])).values()
            ).slice(0, 6);

            // console.log('newNearByLocalityArry', this.newNearByLocalityArry);
          });
          this.updateQueryParams();
        } else {
          swal({
            title: 'Already locality name exist',
            type: 'warning',
            showConfirmButton: false,
            timer: 1500
          });
        }
      });
      this.updatecount();
    });

  }

  toggleLocality(locality) {
    if (this.SelectedLocalityName.includes(locality)) {
      this.SelectedLocalityName = this.SelectedLocalityName.filter((loc) => loc !== locality);
      var testArray = this.testArray.filter((loc) => loc !== locality);
      this.testArray = testArray;
    } else {
      this.SelectedLocalityName.push(locality);
    }
  }

  Localityid = [];
  LocalityIdClick(locality): void {
    if (this.Localityid.includes(locality)) {
      this.Localityid = this.Localityid.filter((loc) => loc !== locality);
      // 
    } else {
      this.Localityid.push(locality);
      // 
    }
    this.updateQueryParams();
  }
  resetToggleShowMore(): void {
    Object.keys(this.isExpanded).forEach((key) => {
      const id = Number(key);
      this.isExpanded[id] = false;
      $('.toggled-list' + id).css({ 'overflow-y': 'hidden', height: '102px' });
    });
  }
  // toggleShowMore(id: number): void {
  //   this.isExpanded[id] = !this.isExpanded[id];

  //   if (this.isExpanded[id]) {
  //     if (id == 1) {
  //       $('.toggled-list' + id).css({ 'overflow-y': 'scroll', height: '240px' });
  //     } else {
  //       $('.toggled-list' + id).css({ 'overflow-y': 'scroll', height: '540px' });
  //     }
  //   } else {
  //     $('.toggled-list' + id).css({ 'overflow-y': 'hidden', height: '102px' });
  //     var scrollToTarget = function (target, containerEl) {
  //       // Moved up here for readability:
  //       var isElement = target && target.nodeType === 1,
  //         isNumber = Object.prototype.toString.call(target) === '[object Number]';

  //       if (isElement) {
  //         containerEl.scrollTop = target.offsetTop;
  //       } else if (isNumber) {
  //         containerEl.scrollTop = target;
  //       } else if (target === 'bottom') {
  //         containerEl.scrollTop = containerEl.scrollHeight - containerEl.offsetHeight;
  //       } else if (target === 'top') {
  //         containerEl.scrollTop = 0;
  //       }
  //     };
  //     var scrollableDiv = document.getElementById('developer' + id);
  //     scrollToTarget('top', scrollableDiv);
  //   }
  // }
  toggleShowMore(id: number): void {
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



  getfilterdatalist() {
    var value = this.cityservice.cityfinder(this.router.url);
    var cityId = value.cityid;
    this.Service.getrentfilterslistFilter(cityId).subscribe(list => {
      if (list?.status === 'True') {
        this.bhklist = list['Bhks'];
        this.balconylist = list['Balcony'];
        this.bathroomlist = list['Bathroom'];
        this.furnishlist = list['Furnish'];
        this.Tenantslist = list['Tenants'];
        this.Ownershiplist = list['Ownership'];
        this.Propertytypelist = list['Propertytype'];
        this.Doorfacelist = list['Doorface'];
        // this.Approvalslist = list['Approvals'];
        this.Amenitieslist = list['Amenities'];
        this.maxArea = list['MaxArea'];
        this.maxBudget = list['MaxBud'];
        this.UpdateSliderRent();
      }
    });
  }

  getbhkList() {
    var city = localStorage.getItem('CityName');
    var value = this.cityservice.cityfinder(city);
    var cityId = value.cityid;
    this.maxBudget = [];
    this.maxArea = [];
    // this.Service.getFiltersDatalistSaleTest(cityId).subscribe(response => {
    //   if (response['status'] === 'True') {
    //     this.maxArea = response['MaxArea'];
    //     this.maxBudget = response['MaxBud'];
    //     this.UpdateSliderBuy();
    //   }
    // });
    this.Service.getFiltersDatalistSaleTest(cityId).subscribe(response => {
      if (response?.status === 'True') {
        this.maxArea = response.MaxArea;
        this.maxBudget = response.MaxBud;
        this.UpdateSliderBuy();
      }
    });

  }

  PgDataFilters() {
    var city = localStorage.getItem('CityName');
    var value = this.cityservice.cityfinder(city);
    var cityId = value.cityid;
    var param = {
      CityId: cityId
    }
    this.Service.postPropNewPg(param).subscribe(list => {
      if (list['status'] === 'True') {
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
    var city = localStorage.getItem('CityName');
    var value = this.cityservice.cityfinder(city);
    var cityId = value.cityid;
    // if (this.router.url.indexOf("commercial-properties-for-sale-in") > -1) {
    //   this.sale_rent = 1;
    // } else {
    //   this.sale_rent = 2;
    // }
    var param = {
      CityId: cityId,
      sale_rent: this.sale_rent,
      typeid: this.commercialPropertyType,
    }
    this.Service.postPropNewCommercial(param).subscribe(list => {
      if (list['status'] == "True") {
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
      this.CommercialSelect = false;
      this.PGSelect = false;
      this.BuySelect = true;
      // $('#price-slider').show();
      // $('#price-slider111').hide();
      // $('#sqft-slider').show();
      // $('#sqft-slider222').hide();
      // setTimeout(() => {
      //   $('.filter-section').css('all', 'unset');
      // }, 500);
      this.updatecount();
      this.projecttype = [];
      this.getbhkList();
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
      this.Balcony = [];
      this.FurnishType = [];
      this.OwnerShip = [];
      this.selectedFacings = [];
      this.selectedTenant = [];
      this.todaydate = [];
      this.futuredate = [];
      // this.selectedAge = [];
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
      this.ImmediateSelect = false;
      this.SixMonthsSelect = false;
      this.OneYearSelect = false;
      this.twoYearSelect = false;
      this.ImmediateSelect1 = false;
      this.Within15DaysSelect = false;
      this.Within30DaysSelect = false;
      this.After30DaysSelect = false;
      this.readyToMoveSelect = false;
      this.newLaunchSelect = false;
      this.underConstructionSelect = false;
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
      this.Service.mouseenterservice7('Buy');
    }
  }

  Rentclick() {
    if (!this.RentSelect) {
      this.SelectedType = 'Rent';
      this.CommercialSelect = false;
      this.PGSelect = false;
      this.BuySelect = false;
      this.RentSelect = true;
      // $('#price-slider').hide();
      // $('#price-slider111').show();
      // $('#sqft-slider').hide();
      // $('#sqft-slider222').show();
      // setTimeout(() => {
      //   $('.filter-section').css('all', 'unset');
      // }, 500);
      this.updatecount();
      this.getfilterdatalist();
      this.projecttype = [];
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
      this.Balcony = [];
      this.FurnishType = [];
      this.OwnerShip = [];
      this.selectedFacings = [];
      this.selectedTenant = [];
      this.todaydate = [];
      this.futuredate = [];
      // this.selectedAge = [];
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
      this.ImmediateSelect = false;
      this.SixMonthsSelect = false;
      this.OneYearSelect = false;
      this.twoYearSelect = false;
      this.ImmediateSelect1 = false;
      this.Within15DaysSelect = false;
      this.Within30DaysSelect = false;
      this.After30DaysSelect = false;
      this.readyToMoveSelect = false;
      this.newLaunchSelect = false;
      this.underConstructionSelect = false;
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
      this.BuyCommercialSelect = true;
      // $('#price-slider').show();
      // $('#price-slider111').hide();
      // $('#sqft-slider').show();
      // $('#sqft-slider222').hide();
      // setTimeout(() => {
      //   $('.filter-section').css('all', 'unset');
      // }, 500);
      this.sale_rent = 1;
      this.commercialDataFilter();
      this.updatecount();
      this.projecttype = [];
      // this.getbhkList();
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
      this.Balcony = [];
      this.FurnishType = [];
      this.OwnerShip = [];
      this.selectedFacings = [];
      this.selectedTenant = [];
      this.todaydate = [];
      this.futuredate = [];
      // this.selectedAge = [];
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
      this.ImmediateSelect = false;
      this.SixMonthsSelect = false;
      this.OneYearSelect = false;
      this.twoYearSelect = false;
      this.ImmediateSelect1 = false;
      this.Within15DaysSelect = false;
      this.Within30DaysSelect = false;
      this.After30DaysSelect = false;
      this.readyToMoveSelect = false;
      this.newLaunchSelect = false;
      this.underConstructionSelect = false;
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
      this.Service.mouseenterservice7('Commercial');
    }
  }

  RentCommercialclick() {
    if (!this.RentCommercialSelect) {
      this.SelectedType = 'Commercial';
      this.CommercialSelect = true;
      this.PGSelect = false;
      this.BuySelect = false;
      this.BuyCommercialSelect = false;
      this.RentCommercialSelect = true;
      // $('#price-slider').hide();
      // $('#price-slider111').show();
      // $('#sqft-slider').hide();
      // $('#sqft-slider222').show();
      // setTimeout(() => {
      //   $('.filter-section').css('all', 'unset');
      // }, 500);
      this.sale_rent = 2;
      this.commercialDataFilter();

      this.updatecount();
      this.projecttype = [];
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
      this.Balcony = [];
      this.FurnishType = [];
      this.OwnerShip = [];
      this.selectedFacings = [];
      this.selectedTenant = [];
      this.todaydate = [];
      this.futuredate = [];
      // this.selectedAge = [];
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
      this.ImmediateSelect = false;
      this.SixMonthsSelect = false;
      this.OneYearSelect = false;
      this.twoYearSelect = false;
      this.ImmediateSelect1 = false;
      this.Within15DaysSelect = false;
      this.Within30DaysSelect = false;
      this.After30DaysSelect = false;
      this.readyToMoveSelect = false;
      this.newLaunchSelect = false;
      this.underConstructionSelect = false;
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
      this.Service.mouseenterservice7('Commercial');

    }
  }

  PGclick() {
    if (!this.PGSelect) {
      this.SelectedType = 'PG';
      this.BuySelect = false;
      this.RentSelect = false;
      this.CommercialSelect = false;
      this.PGSelect = true;
      // $('#price-slider').hide();
      // $('#price-slider111').show();
      // $('#sqft-slider').hide();
      // $('#sqft-slider222').show();
      // setTimeout(() => {
      //   $('.filter-section').css('all', 'unset');
      // }, 500);
      this.updatecount();
      this.PgDataFilters();
      this.projecttype = [];
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
      this.Balcony = [];
      this.FurnishType = [];
      this.OwnerShip = [];
      this.selectedFacings = [];
      this.selectedTenant = [];
      this.todaydate = [];
      this.futuredate = [];
      // this.selectedAge = [];
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
      this.ImmediateSelect = false;
      this.SixMonthsSelect = false;
      this.OneYearSelect = false;
      this.twoYearSelect = false;
      this.ImmediateSelect1 = false;
      this.Within15DaysSelect = false;
      this.Within30DaysSelect = false;
      this.After30DaysSelect = false;
      this.readyToMoveSelect = false;
      this.newLaunchSelect = false;
      this.underConstructionSelect = false;
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
      this.Service.mouseenterservice7('PG');

    }
  }

  Commercialclick() {
    if (!this.CommercialSelect) {
      this.SelectedType = 'Commercial';
      this.BuySelect = false;
      this.RentSelect = false;
      this.PGSelect = false;
      this.CommercialSelect = true;
      this.ResidentialSelect = false;
      // $('#price-slider').hide();
      // $('#price-slider').show();
      // // $('#sqft-slider').hide();
      // $('#sqft-slider222').show();
      // setTimeout(() => {
      //   $('.filter-section').css('all', 'unset');
      // }, 500);
      // this.updatecount();
      this.commercialDataFilter();
      this.projecttype = [];
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
      this.Balcony = [];
      this.FurnishType = [];
      this.OwnerShip = [];
      this.selectedFacings = [];
      this.selectedTenant = [];
      this.todaydate = [];
      this.futuredate = [];
      // this.selectedAge = [];
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
      this.ImmediateSelect = false;
      this.SixMonthsSelect = false;
      this.OneYearSelect = false;
      this.twoYearSelect = false;
      this.ImmediateSelect1 = false;
      this.Within15DaysSelect = false;
      this.Within30DaysSelect = false;
      this.After30DaysSelect = false;
      this.readyToMoveSelect = false;
      this.newLaunchSelect = false;
      this.underConstructionSelect = false;
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
      this.Service.mouseenterservice7('Commercial');

    }
    this.BuyCommercialclick()
  }

  Residentialclick() {
    if (!this.ResidentialSelect) {
      this.SelectedType = 'Residential';
      this.BuySelect = false;
      this.RentSelect = false;
      this.PGSelect = false;
      this.CommercialSelect = false;
      this.ResidentialSelect = true;
      this.Service.mouseenterservice7('Rent');
    }
    this.Buyclick()
  }

  reset() {
    this.SelectedLocalityName = [];
    this.testArray = [];
    this.newNearByLocalityArry = [];
    this.Localityid = [];
    this.projecttype = [];
    this.current_min = [];
    this.current_max = [];
    this.area_min = [];
    this.area_max = [];
    this.selectedStatus = '';
    this.noOfBedrooms = [];
    this.noOfBathrooms = [];
    this.possission = [];
    this.projectStatus = [];
    this.amenityId = [];
    this.Balcony = [];
    this.FurnishType = [];
    this.OwnerShip = [];
    this.selectedFacings = [];
    this.selectedTenant = [];
    this.todaydate = [];
    this.futuredate = [];
    // this.selectedAge = [];
    this.apartmentSelect = false;
    this.villaSelect = false;
    this.plotSelect = false;
    this.HouseSelect = false;
    this.oneRKBedroomSelect = false;
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
    this.ImmediateSelect = false;
    this.SixMonthsSelect = false;
    this.OneYearSelect = false;
    this.twoYearSelect = false;
    this.ImmediateSelect1 = false;
    this.Within15DaysSelect = false;
    this.Within30DaysSelect = false;
    this.After30DaysSelect = false;
    this.readyToMoveSelect = false;
    this.newLaunchSelect = false;
    this.underConstructionSelect = false;
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




    const priceSlider = document.getElementById('price-slider');
    const priceSliderRent = document.getElementById('price-slider111');
    const sqftSlider = document.getElementById('sqft-slider');
    const sqftSliderRent = document.getElementById('sqft-slider222');

    if (this.SelectedType === 'Buy') {
      if (priceSlider && (priceSlider as any).noUiSlider) {
        (priceSlider as any).noUiSlider.set([10, Math.ceil((this.numBudget > 10000 ? this.numBudget / 100000 : this.numBudget) / 10) * 10]);
      }
      if (sqftSlider && (sqftSlider as any).noUiSlider) {
        (sqftSlider as any).noUiSlider.set([100, this.numArea || 10000]);
      }
    } else if (this.SelectedType === 'Rent') {
      if (priceSliderRent && (priceSliderRent as any).noUiSlider) {
        (priceSliderRent as any).noUiSlider.set([500, this.numBudget || 2500000]);
      }
      if (sqftSliderRent && (sqftSliderRent as any).noUiSlider) {
        (sqftSliderRent as any).noUiSlider.set([100, this.numArea || 10000]);
      }
    }

    // Reset displayed values
    this.currentMin = this.SelectedType === 'Buy' ? '₹10 L' : '₹500';
    this.currentMax = this.SelectedType === 'Buy' ? `₹${Math.ceil((this.numBudget > 10000 ? this.numBudget / 100000 : this.numBudget) / 10) * 10} L` : `₹${this.numBudget || 2500000}`;

    this.currentMinSqft = '100 sqft';
    this.currentMaxSqft = `${this.numArea || 10000} sqft`;

    this.updatecount();
  }
  reset2() {
    window.history.pushState({}, '', window.location.pathname);
  }
  getRecentSearches(): string[] {
    return JSON.parse(localStorage.getItem('recentSearches') || '[]');
  }

  FilterNavigation() {
    if (this.SelectedType === 'Buy') {
      const queryParams: any = {};
      if (this.router.url.indexOf('?localityid') > -1) {
        // 
      } else {
        // 
      }
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

      // Debugging log to check query parameters before navigation

      // If no valid query parameters exist, navigate without parameters
      if (Object.keys(queryParams).length === 0) {
        this.router.navigate(['/' + this.selectedCity.replace(/\s+/g, '-').toLowerCase() + '/property-sale']);
      } else {
        this.router.navigate(['/' + this.selectedCity.replace(/\s+/g, '-').toLowerCase() + '/property-sale'], {
          relativeTo: this.activatedRoute,
          queryParams: queryParams,
          queryParamsHandling: 'merge'
        });
      }

      $('.modal').modal('hide');
    }
    else if (this.SelectedType == 'Rent') {
      const queryParams: any = {
        propertytype: this.projecttype.length ? this.projecttype.join(',') : undefined,
        localityid: this.Localityid.length ? this.Localityid.join(',') : undefined,
        bedroom: this.noOfBedrooms.length ? this.noOfBedrooms.join(',') : undefined,
        bathroom: this.noOfBathrooms.length ? this.noOfBathrooms.join(',') : undefined,
        min: this.current_min.length ? this.current_min.join(',') : undefined,  // Avoid empty arrays
        max: this.current_max.length ? this.current_max.join(',') : undefined,  // Avoid empty arrays
        sqftmin: this.area_min && this.area_min.length ? this.area_min.join(',') : undefined,  // Avoid empty arrays
        sqftmax: this.area_max && this.area_max.length ? this.area_max.join(',') : undefined,  // Avoid empty arrays
        balcony: this.Balcony.length ? this.Balcony.join(',') : undefined,  // Avoid empty arrays
        furnish: this.FurnishType.length ? this.FurnishType.join(',') : undefined,  // Avoid empty arrays
        postedby: this.OwnerShip.length ? this.OwnerShip.join(',') : undefined,
        doorfacing: this.selectedFacings.length ? this.selectedFacings.join(',') : undefined,
        amenities: this.amenityId.length ? this.amenityId.join(',') : undefined,
        tenants: this.selectedTenant.length ? this.selectedTenant.join(',') : undefined,
        fromdate: this.todaydate.length ? this.todaydate.join(',') : undefined,
        available: this.futuredate.length ? this.futuredate.join(',') : undefined,
        // propertyage: this.selectedAge.length ? this.selectedAge.join(',') : undefined,
      };

      // // **Remove undefined, null, empty arrays, and empty strings**
      Object.keys(queryParams).forEach(key => {
        if (!queryParams[key] || queryParams[key] === 'undefined' || queryParams[key] === '') {
          delete queryParams[key];
        }
      });
      if (Object.keys(queryParams).length === 0) {
        this.router.navigate(['/rent/house-for-rent-in-' + this.selectedCity.replace(/\s+/g, '-').toLowerCase()]);
      } else {
        // console.log("Query parameters:", queryParams);
        this.router.navigate(['/rent/house-for-rent-in-' + this.selectedCity.replace(/\s+/g, '-').toLowerCase()], {
          relativeTo: this.activatedRoute,
          queryParams: queryParams,
          queryParamsHandling: 'merge'
        });
      }
      $('.modal').modal('hide');
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
      };

      // // **Remove undefined, null, empty arrays, and empty strings**
      Object.keys(queryParams).forEach(key => {
        if (!queryParams[key] || queryParams[key] === 'undefined' || queryParams[key] === '') {
          delete queryParams[key];
        }
      });
      if (Object.keys(queryParams).length === 0) {
        if (this.router.url.indexOf("commercial-properties-for-sale-in") > -1) {
          this.router.navigate(['/cll/commercial-properties-for-sale-in-' + this.selectedCity.replace(/\s+/g, '-').toLowerCase()]);
        } else {
          this.router.navigate(['/cll/commercial-properties-for-rent-in-' + this.selectedCity.replace(/\s+/g, '-').toLowerCase()]);
        }
      } else {

        if (this.router.url.indexOf("commercial-properties-for-sale-in") > -1) {
          this.router.navigate(['/cll/commercial-properties-for-sale-in-' + this.selectedCity.replace(/\s+/g, '-').toLowerCase()], {
            relativeTo: this.activatedRoute,
            queryParams: queryParams,
            queryParamsHandling: 'merge'
          });
        } else {
          this.router.navigate(['/cll/commercial-properties-for-rent-in-' + this.selectedCity.replace(/\s+/g, '-').toLowerCase()], {
            relativeTo: this.activatedRoute,
            queryParams: queryParams,
            queryParamsHandling: 'merge'
          });
        }

      }
      $('.modal').modal('hide');
    }
    this.localityname = localStorage.getItem('LocalityName');
    this.Service.mouseenterservice1();
    this.saveSearch();
  }
  getBaseUrl(search: any): string {
    return search.proptype === 'Buy'
      ? `/${search.city.toLowerCase()}/property-sale`
      : `/rent/house-for-rent-in-${search.city.toLowerCase()}`;
  }

  getQueryParams(search: any): any {
    let queryParams: any = { localityid: search.localityId };

    if (search.bhkType) {
      queryParams.bedroom = search.bhkType.replace(' BHK', '');
    }

    return queryParams;
  }

  showInfo() {
    this.isDivVisible = !this.isDivVisible;
  }
  saveSearch() {
    let searches = JSON.parse(localStorage.getItem('recentSearches') || '[]');

    // Normalize localityId to an array of unique, sorted strings
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

    // Check if the search object already exists
    let exists = searches.some(search =>
      search.proptype === searchObj.proptype &&
      search.city === searchObj.city &&
      search.localityName === searchObj.localityName &&
      search.bhkType === searchObj.bhkType &&
      JSON.stringify(search.localityId) === JSON.stringify(searchObj.localityId) // Strictly compare arrays
    );

    if (!exists) {
      searches.unshift(searchObj); // Add new search at the top
    }

    // Keep only the last 5 searches
    searches = searches.slice(0, 5);

    localStorage.setItem('recentSearches', JSON.stringify(searches));
  }

  Amenitiesclick(id) {
    var amenity = id;

    if (amenity == 1) {
      this.parkingSelect = !this.parkingSelect
      var amenityIdPassing = 41;
    }
    else if (amenity == 2) {
      this.powerBackupSelect = !this.powerBackupSelect
      var amenityIdPassing = 32;
    }
    else if (amenity == 3) {
      this.cctvSelect = !this.cctvSelect
      var amenityIdPassing = 42;
    }
    else {
      this.elevatorSelect = !this.elevatorSelect
      var amenityIdPassing = 37;
    }

    if (!this.amenityId.includes(amenityIdPassing)) {
      this.amenityId.push(amenityIdPassing);
    } else {
      this.amenityId = this.amenityId.filter(item => item !== amenityIdPassing);
    }
    this.updateQueryParams();
  }

  updateQueryParams() {
    // 
    let queryParams = [];
    if (this.projecttype?.length) {
      queryParams.push(`propertytype=${this.projecttype.join(',')}`);
    }
    if (this.Localityid?.length) {
      queryParams.push(`localityid=${this.Localityid.join(',')}`);
    }
    if (this.current_min?.length) {
      queryParams.push(`min=${this.current_min.join(',')}`);
    }
    if (this.current_max?.length) {
      queryParams.push(`max=${this.current_max.join(',')}`);
    }
    if (this.area_min?.length) {
      queryParams.push(`sqftmin=${this.area_min.join(',')}`);
    }
    if (this.area_max?.length) {
      queryParams.push(`sqftmax=${this.area_max.join(',')}`);
    }
    if (this.noOfBedrooms?.length) {
      queryParams.push(`bedroom=${this.noOfBedrooms.join(',')}`);
    }
    if (this.noOfBathrooms?.length) {
      queryParams.push(`bathroom=${this.noOfBathrooms.join(',')}`);
    }
    if (this.possission?.length) {
      queryParams.push(`availability=${this.possission.join(',')}`);
    }
    if (this.todaydate?.length) {
      queryParams.push(`todaydate=${this.todaydate}`);
    }
    if (this.futuredate?.length) {
      queryParams.push(`futuredate=${this.futuredate}`);
    }
    if (this.projectStatus?.length) {
      queryParams.push(`status=${this.projectStatus.join(',')}`);
    }
    if (this.amenityId?.length) {
      queryParams.push(`amenities=${this.amenityId.join(',')}`);
    }
    if (this.FurnishType?.length) {
      queryParams.push(`furnishType=${this.FurnishType}`);
    }
    if (this.OwnerShip?.length) {
      queryParams.push(`ownership=${this.OwnerShip}`);
    }
    if (this.selectedFacings?.length) {
      queryParams.push(`doorfacing=${this.selectedFacings.join(',')}`);
    }
    if (this.Balcony?.length) {
      queryParams.push(`balcony=${this.Balcony.join(',')}`);
    }
    if (this.FilterBYFloors !== null && this.FilterBYFloors !== undefined) {
      queryParams.push(`filterbyfloors=${this.FilterBYFloors}`);
    }
    if (this.Sharing_Type?.length) {
      queryParams.push(`roomtype=${this.Sharing_Type}`);
    }
    if (this.PG_For_Type?.length) {
      queryParams.push(`pgavailablefor=${this.PG_For_Type}`);
    }
    if (this.Suitable_For_Type?.length) {
      queryParams.push(`pgbestsuit=${this.Suitable_For_Type}`);
    }
    if (this.Food_Included_Type?.length) {
      queryParams.push(`pgfoodtype=${this.Food_Included_Type}`);
    }

    if (this.buildingTypeListvalue?.length) {
      queryParams.push(`buildingtype=${this.buildingTypeListvalue}`);
    }
    if (this.furnishTypeListvalue?.length) {
      queryParams.push(`furnishstatus=${this.furnishTypeListvalue}`);
    }
    if (this.propertyAgeListvalue?.length) {
      queryParams.push(`Plotage=${this.propertyAgeListvalue}`);
    }
    if (this.commercialPropertyType?.length) {
      queryParams.push(`Propertype=${this.commercialPropertyType}`);
    }


    let queryString = queryParams?.length ? queryParams.join('&') : '';
    this.location.replaceState(this.location.path().split('?')[0], queryString);
    this.Service.updateQueryParamsforcity(queryString);
    // this.Service.mouseenterservice1();
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
      // this.myDiv.nativeElement.style.removeProperty('all');

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
    // console.log('Received from child:', newValue);
  }
  noOfBedrooms = [];
  noOfBathrooms = [];
  projectStatus = [];
  possission = [];
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
    // this.Filter.Bedrooms = this.noOfBedrooms;
    // this.filterSelectOne = false;
    // this.Service.mouseenterservice1();
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
      //   this.SixMonthsSelect = false;
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
  todaydate: any;
  futuredate: any;
  ImmediateSelect1: boolean = false;
  Within15DaysSelect: boolean = false;
  Within30DaysSelect: boolean = false;
  After30DaysSelect: boolean = false;
  Immediateclick() {
    if (this.ImmediateSelect1 === true) {

      this.todaydate = '';
      this.futuredate = '';
      this.ImmediateSelect1 = false;
    } else if (this.ImmediateSelect1 === false) {
      this.todaydate = '';
      var fdate = new Date();
      fdate.setDate(fdate.getDate() + 5);
      this.todaydate = '2022-01-01';
      this.futuredate = fdate.toISOString().split('T')[0];
      this.ImmediateSelect1 = true;
      this.Within15DaysSelect = false;
      this.Within30DaysSelect = false;
      this.After30DaysSelect = false;
    }
    // 
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

  }
  selectedStatus: string | null = null; // Store the selected status

  projectStatusMap = {
    readyToMove: '50307',
    newLaunch: '50310',
    underConstruction: '50309',
    upcoming: '50308',
  };

  selectStatus(statusKey: string) {
    if (this.selectedStatus === statusKey) {
      this.selectedStatus = null;
      this.projectStatus = [];
    } else {
      this.selectedStatus = statusKey;
      this.projectStatus = [this.projectStatusMap[statusKey]];
    }

    // Update query params dynamically
    const queryParams: any = { ...this.activatedRoute.snapshot.queryParams };
    if (this.selectedStatus) {
      queryParams['status'] = this.projectStatusMap[this.selectedStatus];
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
    // this.Filter.statusid = this.projectStatus
    // this.filterSelectOne = false;
    // this.Service.mouseenterservice1();
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
    // this.Filter.statusid = this.projectStatus
    // this.filterSelectOne = false;
    // this.Service.mouseenterservice1();
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
    // this.Filter.statusid = this.projectStatus
    // this.filterSelectOne = false;
    // this.Service.mouseenterservice1();
    this.updateQueryParams();
  }
  FurnishType: any;

  changeFurnishestype() {
    if (this.Furnish == true) {

      this.FurnishType = ''
      this.Furnish = false
    } else if (this.Furnish === false) {
      this.FurnishType = '1'
      this.Furnish = true
      this.SemiFurnish = false;
      this.unFurnish = false;
    }
    this.updateQueryParams();
  }

  changeSemiFurnishestype() {
    if (this.SemiFurnish == true) {
      this.FurnishType = ''
      this.SemiFurnish = false;
    } else if (this.SemiFurnish === false) {
      this.FurnishType = '2'
      this.SemiFurnish = true;
      this.Furnish = false;
      this.unFurnish = false;
    }
    this.updateQueryParams();

  }

  changeunFurnishestype() {
    if (this.unFurnish == true) {
      this.FurnishType = ''
      this.unFurnish = false;
    } else if (this.unFurnish === false) {
      this.FurnishType = '3'
      this.unFurnish = true;
      this.SemiFurnish = false;
      this.Furnish = false;
    }
    this.updateQueryParams();

  }
  OwnerShip: any;
  changeownership() {
    if (this.OwnerSelect == true) {
      this.OwnerShip = ''
      this.OwnerSelect = false;
    } else if (this.OwnerSelect === false) {
      this.OwnerShip = '654826'
      this.OwnerSelect = true;
      this.AgentSelect = false;
    }
    this.updateQueryParams();

  }
  changeagentship() {
    if (this.AgentSelect == true) {
      this.OwnerShip = ''
      this.AgentSelect = false;
    } else if (this.AgentSelect === false) {
      this.OwnerShip = '654825'
      this.AgentSelect = true;
      this.OwnerSelect = false;

    }
    this.updateQueryParams();

  }
  selectedFacings: number[] = [];
  DoorFacing(id) {
    if (this.selectedFacings.includes(id)) {
      // Remove from selection if already selected
      this.selectedFacings = this.selectedFacings.filter(facing => facing !== id);
    } else {
      // Add to selection
      this.selectedFacings.push(id);
    }
    this.updateQueryParams();

  }

  Balcony: number[] = [];

  BalconyClick(id) {
    if (this.Balcony.includes(id)) {
      // Remove from selection if already selected
      this.Balcony = this.Balcony.filter(facing => facing !== id);
    } else {
      // Add to selection
      this.Balcony.push(id);
    }
    this.updateQueryParams();

  }
  ageFilterOptions = [
    { id: 1, label: 'Below 2 Years' },
    { id: 2, label: 'Between 2 to 6 Years' },
    { id: 3, label: 'Above 6 Years' }
  ];

  // selectedAge: number | null = null;
  // selectedAge: any;

  // toggleAgeSelection(id: number): void {
  //   this.selectedAge = this.selectedAge === id ? null : id;
  //   this.updateQueryParams();

  // }
  FilterBYFloorsFilterOptions = [
    { id: 1, label: 'Ground Floor' },
    { id: 2, label: '1st Floor' },
    { id: 3, label: '2nd Floor' },
    { id: 4, label: '3rd Floor' },
    { id: 5, label: '4th Floor & Above' },
  ];

  // selectedAge: number | null = null;
  FilterBYFloors: number | null = null; // Single selection

  FilterBYFloorsSelection(id: number): void {
    // Toggle selection (only one can be selected)
    this.FilterBYFloors = this.FilterBYFloors === id ? null : id;

    this.updateQueryParams(); // Update URL params
  }

  TenentFilterOptions = [
    { tenants: "Bachelor", id: "1" },
    { tenants: "Family", id: "2" },
    { tenants: "Anyone", id: "3" },
    { tenants: "Ladies", id: "4" }
  ];

  // selectedTenant: number | null = null;
  selectedTenant: any;

  toggleTenantSelection(id: number): void {
    if (!Array.isArray(this.selectedTenant)) {
      this.selectedTenant = []; // Ensure it's an array
    }

    if (this.selectedTenant.includes(id)) {
      this.selectedTenant = this.selectedTenant.filter(floorId => floorId !== id); // Remove id
    } else {
      this.selectedTenant.push(id); // Add id
    }

    this.updateQueryParams();
  }

  Sharing_Type: number[] = [];
  Sharing_TypeSelection(id: number): void {
    // this.Sharing_Type = this.Sharing_Type === id ? null : id;
    if (this.Sharing_Type.includes(id)) {
      this.Sharing_Type = this.Sharing_Type.filter(facing => facing !== id);
    } else {
      this.Sharing_Type.push(id);
    }
    this.updateQueryParams(); // Update URL params
  }

  PG_For_Type: number[] = [];
  PG_ForSelection(id: number): void {
    // this.PG_For_Type = this.PG_For_Type === id ? null : id;
    if (this.PG_For_Type.includes(id)) {
      this.PG_For_Type = this.PG_For_Type.filter(facing => facing !== id);
    } else {
      this.PG_For_Type.push(id);
    }
    this.updateQueryParams(); // Update URL params
  }

  Suitable_For_Type: number[] = [];
  Suitable_For_TypeSelection(id: number): void {
    // this.Suitable_For_Type = this.Suitable_For_Type === id ? null : id;
    if (this.Suitable_For_Type.includes(id)) {
      this.Suitable_For_Type = this.Suitable_For_Type.filter(facing => facing !== id);
    } else {
      this.Suitable_For_Type.push(id);
    }
    this.updateQueryParams(); // Update URL params

  }

  Food_Included_Type: number[] = [];
  Food_Included_TypeSelection(id: number): void {
    if (this.Food_Included_Type.includes(id)) {
      this.Food_Included_Type = this.Food_Included_Type.filter(facing => facing !== id);
    } else {
      this.Food_Included_Type.push(id);
    }
    this.updateQueryParams();
  }


  commercialPropertyType: number[] = [];
  commercialPropertyTypeListing(id: number): void {
    if (this.commercialPropertyType.includes(id)) {
      this.commercialPropertyType = this.commercialPropertyType.filter(facing => facing !== id);
    } else {
      this.commercialPropertyType.push(id);
    }
    this.updateQueryParams(); // Update URL params
    this.commercialDataFilter();
  }

  buildingTypeListvalue: number[] = [];
  buildingTypeListing(id: number): void {
    if (this.buildingTypeListvalue.includes(id)) {
      this.buildingTypeListvalue = this.buildingTypeListvalue.filter(facing => facing !== id);
    } else {
      this.buildingTypeListvalue.push(id);
    }
    this.updateQueryParams(); // Update URL params
  }

  furnishTypeListvalue: number[] = [];
  furnishTypeListing(id: number): void {
    if (this.furnishTypeListvalue.includes(id)) {
      this.furnishTypeListvalue = this.furnishTypeListvalue.filter(facing => facing !== id);
    } else {
      this.furnishTypeListvalue.push(id);
    }
    this.updateQueryParams(); // Update URL params
  }

  propertyAgeListvalue: number[] = [];
  propertyAgeListing(id: number): void {
    // this.propertyAgeListvalue = this.propertyAgeListvalue === id ? null : id;
    if (this.propertyAgeListvalue.includes(id)) {
      this.propertyAgeListvalue = this.propertyAgeListvalue.filter(facing => facing !== id);
    } else {
      this.propertyAgeListvalue.push(id);
    }
    this.updateQueryParams(); // Update URL params
  }


  priceOnRequestPropList() {
    this.checkedPrice = !this.checkedPrice;

    if (this.checkedPrice) {
      $('.slider-container1').css('pointer-events', 'none');
      $('.slider-container1').css('opacity', '0.5');
      this.Filter.price_on_request = 2;
      this.currentMaxBudget = '';
      this.currentMinBudget = '';
    } else {
      $('.slider-container1').css('pointer-events', 'unset');
      $('.slider-container1').css('opacity', '1');
      this.Filter.price_on_request = 1;
    }


  }
}



