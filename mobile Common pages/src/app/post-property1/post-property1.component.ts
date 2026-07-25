import { ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, ViewChild, NgZone } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatChip, MatChipSelectionChange } from '@angular/material/chips';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { DataService } from '../data.service';
// import { RentalsService } from '../rentals.service';
// import { IndividualService } from '../individual.service';
import { MatStepper } from '@angular/material/stepper';
import { CityService } from '../city.service';
import { enquiry } from '../city/city';
// import { IndividualService } from '../individual.service';
// import { RentalsService } from '../rentals.service';
import { CountdownComponent, CountdownEvent } from 'ngx-countdown';
import { ElitedataService } from '../elitedata.service';

declare var swal: any;
declare var $: any;
declare var Razorpay: any;

declare var $: any;
@Component({
  selector: 'app-post-property1',
  templateUrl: './post-property1.component.html',
  styleUrls: ['./post-property1.component.css']
})
export class PostProperty1Component implements OnInit {
  @ViewChild('cd1', { static: false }) private countdown: CountdownComponent;
  @ViewChild('stepper') stepper!: MatStepper; // Import MatStepper and ViewChild
  @ViewChild('fileInput') fileInput: ElementRef;
  imageUrl: any = 'usericon.jpg';
  ProfileImage = this.Service.ProfileImage
  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  secondFormGroup1: FormGroup;
  secondFormGroup2: FormGroup;
  secondFormGroup6: FormGroup;
  secondFormGroup3: FormGroup;
  secondFormGroup7: FormGroup;
  secondFormGroup4: FormGroup;
  secondFormGroup8: FormGroup;
  secondFormGroup5: FormGroup;
  plotsFormGroup: FormGroup;
  OtherPropTypeFormGroup: FormGroup;
  citiess = [];
  localitys = [];
  regionList = [];
  PropNameList = [];
  localityArray = [];
  noOfAminities = [];
  ApprovalsArray = [];
  noOfFacilities = [];
  noOfNearby = [];
  noOfParking: any;
  locationSelectedId: any;
  selectedLocation: any;
  currentCity: any;
  AAuthority: any;
  onReadyToMoveInSelect = false;
  UnderConstructionSelect = false;
  submitted = false;
  submitted2 = false;
  submitted21 = false;
  submitted3 = false;
  submitted4 = false;
  submitted41 = false;
  submitted5 = false;
  submitted51 = false;
  submitted6 = false;
  submitted7 = false;
  PlotsSubmitted = false;
  otherPropTypeSubmited = false;
  OwnerSelect = true;
  BrokerSelect = false;
  yesSelect = false;
  noSelect = false;
  SellSelect = true;
  RentSelect = false;
  urls = [];
  CoverImage = [];
  MasterPlanImage = [];
  FloorPlanImage = [];
  dropdownSettings = {};
  selecteditemsRoot = [];
  galleryimages: string[] = [];


  uploadResponse;
  CarParkingSelect: boolean;
  powerbackupSelect: boolean;
  securitySelect: boolean;
  liftSelect: boolean;
  gymSelect: boolean;
  filterSelectOne: boolean;
  waterSelect: boolean;
  powerSelect: boolean;
  AmenitiesTrue = false;
  CoveredParkingTrue = false;
  TwowheelerParkingTrue = false;
  FourwheelerParkingTrue = false;
  OpenParkingTrue = false;
  OnClickOther = false;
  OnClickOtherNearBy = false;
  plotsFormView = false;
  otherPropTypeFormView = true;
  plotSixeOther = false;
  coverAlert = false;
  otpexpired = false;

  ShowAddressTextareaRestaurant = false;
  ShowAddressTextareaMetroStation = false;
  ShowAddressTextareaSuperMarket = false;
  ShowAddressTextareaHospital = false;

  myControl = new FormControl();
  options;
  filteredOptions: Observable<any>;
  propertyAutoName = '';
  myControlSellLocality = new FormControl();
  optionsSellLocality;
  filteredOptionsSellLocality: Observable<any>;
  propertyAutoLocalityName = '';

  myControlRentLocality = new FormControl();
  optionsRentLocality;
  filteredOptionsRentLocality: Observable<any>;
  propertyAutoRentLocalityName = '';
  toggleAmmentities = false;


  searchTerm1: string = '';
  filteredData2: any[] = [];
  filteredData1: any[] = [];
  filteredData2length: boolean = false;
  filteredData1length: boolean = false;

  isButtonDisabled: boolean = false;

  BHKs = [];
  Bathrooms = [];
  Balconys = [];
  Tenants = [];
  FurnishLists = [];
  ApprovalsLists = [];
  AmenitiesLists = [];
  DoorfaceLists = [];
  OwnershipLists = [];
  PropertytypeLists = [];
  FacilitiesLists = [];
  NearbyLists = [];
  ParkingLists = [];
  PlotTypeLists = [];
  PlotSizeLists = [];
  ApprovalsViewTrue = true;
  UserId: any;
  user = new enquiry();
  submitionLoader = false;

  fileFormatError = false;
  fileFormatError1 = false;
  fileFormatError2 = false;
  fileFormatError3 = false;


  RegistrationForm: FormGroup;
  imageUrls: any;
  otherPlotSize: any;

  whatYouAre: any;
  EmailId: any;
  purpose: any;
  CityName: any;
  PropTypeArea: any;
  Locality: any;
  Region: any;
  PropertyType: any;
  BHKDetails: any;
  PropertyArea: any;
  AreaType = 'Sq.feet';

  Balconies: any;
  PropertyStatus: any;
  BathroomsDeatils: any;
  PropertyAge: any;
  PropertyAgeMonth: any;
  PossessionDate: any;
  PropertyName: any;
  Amenities: any;
  Facilities: any;
  Approvals: any;
  Nearby: any;
  Nearbydetails: any;

  FurnishingStatus: any;
  Coveredparking: any;
  Openparking: any;
  BrokerageSelect: any;
  Price: any;
  Pricevalue: any;
  BrokerageValue: any;
  DoorFacing: any;
  proptitle: any;
  WaterSupply: any;


  MonthlyRent: any;
  Maintenancecharge: any;
  Securitydeposit: any;
  TenentType: any;
  Address: any;
  CityVal: any;
  State: any;
  Postalcode: any;
  TotalFloor: any;
  WhichFloor: any;
  AvailableFrom: any;
  AvailableFromDate: any;
  NearByLandmarkAddress: any;
  userID: any;
  loginId: any;
  loginShowHide = false;
  PlotType: any;
  PlotSize: any;
  PlotAge: any;
  ProjectDescription: any;
  BuilderId = 0;

  otploader: any;
  emailLogIn = false;
  numberLogIn = true;
  otpValidating = false;
  storagearr = [];
  seenproparr = [];
  UserName;
  LastName;
  UserEmail;
  UserNumber;
  PropTypeAreaReview: any;
  userDetails: any;
  userEmail: any;
  email: any;
  userNumber: any;
  lastUsername: any;
  TenentTypeReviewValue: any;
  ParkingReviewValue: any;
  plotSizeReviewValue: any;
  DoorFacingReviewValue: any;
  FurnishingStatusReviewValue: any;
  BalconyReviewValue: any;
  BathroomReviewValue: any;
  BedroomReviewValue: any;
  plotTypeReviewValue: any;
  PropTypeNameReviewValue: any;
  proptypeid: any;
  noOfParkingReviewVAlue = [];
  noOfNearbyReviewValue = [];
  finalnoOfNearbyArray = [];
  nearByTest;
  ApprovalsArrayReviewValue = [];
  finalApprovalsArray = [];
  noOfFacilitiesReviewValue = [];
  finalnoOfFacilitiesArray = [];
  noOfAminitiesReviewValue = [];
  finalAminitiesArray = [];
  LocalityReviewName: any;
  selectedLoc: any;
  ReadyTomoveActive;
  WouldYouLikeToReviewValue: any;
  YouAreAReviewValue: any;
  statusReview: any;
  cityNameReviewValue: any;
  PropertyID;
  newAvailableFromdate: any;
  priceReviewValue: any;
  newpossesiondate: any;
  newpossesiondate1: any;
  otpexpired1 = false;
  Property_status = true;
  Visiblebrochure = false;
  otpValidationComponent: any;
  imageFormat = true;


  parkingSelected = false


  parkingSelectedArray: string[] = [];
  ammmentitiesArray = []
  detailedSubmit = true;




  public autoCompleteData: { [key: string]: Object }[] = [];
  public fields: Object = { groupBy: 'Name', value: 'Name' };
  public text: string = "Enter a locality name *";
  public minLength: Number = 2;
  public highlight: Boolean = true;
  loadComponent = false;
  parkingPath = 'https://img-mb.homes247.in/images/rentals/icons_parking/';
  facilitiesPath = 'https://img-mb.homes247.in/images/rentals/icons_facilities/';
  AmentitiesPath = 'https://img-mb.homes247.in/images/amenites/amenities-new/';
  valueChange: any;
  testAge: any;
  showFormBtn = false;
  amenitiesclose: string;
  Purpose_Identify: any;



  constructor(private fb: FormBuilder,
    public eliteService: ElitedataService,
    // public Service: IndividualService,
    private cd: ChangeDetectorRef,
    // public Individual: IndividualService,
    public Service: DataService,
    // public Service: RentalsService,

    // public Service: RentalsService,
    // public Service: IndividualService,
    private router: Router,
    private ngZone: NgZone,
    private titleService: Title,
    public cityservice: CityService,
    private meta: Meta) {
    this.amount = null;
    this.Service.mouseenterlistenOtp().subscribe((m: any) => {
      if (window.location.hash === '#postsellprop') {
        this.postProp()
      } else if (window.location.hash === '#postrentprop') {
        this.postPropRentals()
      }
    })
  }

  ngOnInit(): void {
    this.relaxDataFilter()
    if (this.router.url.includes('?Type=Sale')) {
      setTimeout(() => {
        $('#Residential').click();
        $('#sell').click();
      }, 100);
    } else if (this.router.url.includes('?Type=Rent')) {
      setTimeout(() => {
        $('#Residential').click();
        $('#rent').click();
      }, 100);
    }

    $('body').removeClass('modal-open');
    $('#aiModalButton').click();
    this.metatags();
    this.getIndividualDataFiltersList();
    this.checkuserlogin();
    this.getUserById();
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'ID',
      textField: 'Name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: true,
      limitSelection: 1
    };
    this.UserId = localStorage.getItem('userID');
    this.UserName = localStorage.getItem('userName');
    this.lastUsername = localStorage.getItem('lastName');
    this.getlocationlist();





    this.firstFormGroup = this.fb.group({
      YouAre: ['', [Validators.required]],
      emailId: ['', [Validators.required, Validators.pattern('^(?!.*[@]{2,})(?!.*[.]{2,})(?!.*[-]{2,})[a-zA-Z0-9]+([._-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9]+([.-]?[a-zA-Z0-9]+)*\.[a-zA-Z]{2,}$')]], Purpose: ['', [Validators.required]],
      PropTypeArea: ['', [Validators.required]],
      PropertyName: ['', [Validators.required, this.validateInput]],
      City: ['', [Validators.required]],
      // Region: ['', [Validators.required]],
      Localities: ['', [Validators.required, this.validateInput11]],
      PropertyType: ['', [Validators.required]],

      PropertyStatus: ['', [Validators.required]],
      PropertyAge: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],


      PropertyAgeMonths: ['1'],
      PropertyPossession: [''],

      Address: ['', [Validators.required, this.validateInput1]],
      Postalcode: ['', [Validators.required, Validators.pattern('[0-9]{6}')]],


    });
    this.plotsFormGroup = this.fb.group({
      PlotsType: ['', [Validators.required]],
      // Plotsize: ['', [Validators.required ]],
      Plotsize: ['', [Validators.required, Validators.pattern(/^\d+\*\d+$/)]],
      PropertyAge: ['', [Validators.pattern('^[0-9]+$')]],
      DoorFacing: ['', [Validators.required]],
      // Description: ['', [Validators.required]],
      PlotArea: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      AreaType: ['sq.feet', [Validators.required]],
      PropertyAgeMonths: ['1'],

    });
    this.OtherPropTypeFormGroup = this.fb.group({

      BHKDetails: ['', [Validators.required]],
      PropertyArea: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      Bathrooms: ['', [Validators.required]],
      Balconies: ['', [Validators.required]],
      DoorFacing: ['', [Validators.required]],
      FurnishingStatus: ['', [Validators.required]],
      Parking: ['', [Validators.required]],
      Coveredparking: ['', [Validators.required]],
      Openparking: ['', [Validators.required]],
      AreaType: ['sq.feet', [Validators.required]],
    });
    this.secondFormGroup = this.fb.group({
      TotalFloor: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      WhichFloor: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      // WaterSupply: ['', [Validators.required]],
      Price: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.min(100000)]],
      Maintenancecharge: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      BrokerageSelect: ['', [Validators.required]],
      BrokerageValue: ['0'],
      // proptitle: ['', [Validators.required]],
      // NearByLandmarkAddress: ['', [Validators.required]],
      // nearBy: ['', [Validators.required]],
      Description: ['', [Validators.required, this.validateInput1]]
      // DoorFacing: ['', [Validators.required]],
      // parking: ['0', [Validators.required]],
    });
    this.secondFormGroup1 = this.fb.group({
      // WaterSupply: ['', [Validators.required]],
      Price: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.min(25000)]],
      Maintenancecharge: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      BrokerageSelect: ['', [Validators.required]],
      BrokerageValue1: ['0'],
      // proptitle: ['', [Validators.required]],
      // NearByLandmarkAddress: ['', [Validators.required]],
      // nearBy: ['', [Validators.required]],
      Description: ['', [Validators.required, this.validateInput1]]
      // DoorFacing: ['', [Validators.required]],
      // parking: ['0', [Validators.required]],
    });
    this.secondFormGroup2 = this.fb.group({
      TotalFloor: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      WhichFloor: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      // WaterSupply2: ['', [Validators.required]],
      Price2: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.min(100000)]],
      Maintenancecharge: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      // proptitle2: ['', [Validators.required]],
      // NearByLandmarkAddress: ['', [Validators.required]],
      // nearBy: ['', [Validators.required]],
      Description: ['', [Validators.required, this.validateInput1]]
      // DoorFacing2: ['', [Validators.required]],
      // Coveredparking2: ['', [Validators.required]],
      // Parking: [''],
      // Openparking2: ['', [Validators.required]],
      // parking: ['0', [Validators.required]],

    });



    this.secondFormGroup6 = this.fb.group({
      // WaterSupply2: ['', [Validators.required]],
      Price2: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.min(25000)]],
      Maintenancecharge: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      // proptitle2: ['', [Validators.required]],
      // NearByLandmarkAddress: ['', [Validators.required]],
      // nearBy: ['', [Validators.required]],
      Description: ['', [Validators.required, this.validateInput1]]
      // DoorFacing2: ['', [Validators.required]],
      // Coveredparking2: ['', [Validators.required]],
      // Parking: [''],
      // Openparking2: ['', [Validators.required]],
      // parking: ['0', [Validators.required]],
    });
    this.secondFormGroup3 = this.fb.group({
      TotalFloor: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      WhichFloor: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      // WaterSupply3: ['', [Validators.required]],
      TenentType: ['', [Validators.required]],
      MonthlyRent: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      Maintenancecharge: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      Securitydeposit: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      AvailableFrom: ['', [Validators.required, this.dateRangeValidator]],

      // nearBy: ['0', [Validators.required]],
      // NearByLandmarkAddress: ['0', [Validators.required]],
      Description: ['', [Validators.required, this.validateInput1]]
      // Coveredparking3: ['', [Validators.required]],
      // Openparking3: ['', [Validators.required]],
      // Parking: ['', [Validators.required]],
      // parking: ['0', [Validators.required]],
      // DoorFacing: ['', [Validators.required]],
    });
    this.secondFormGroup7 = this.fb.group({
      MonthlyRent: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      Maintenancecharge: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      Securitydeposit: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      AvailableFrom: ['', [Validators.required, this.dateRangeValidator]],
      // nearBy: ['0', [Validators.required]],
      // NearByLandmarkAddress: ['0', [Validators.required]],
      Description: ['', [Validators.required, this.validateInput1]]
      // Coveredparking3: ['', [Validators.required]],
      // Openparking3: ['', [Validators.required]],
      // Parking: ['', [Validators.required]],
      // parking: ['0', [Validators.required]],
      // DoorFacing: ['', [Validators.required]],
    });
    this.secondFormGroup4 = this.fb.group({
      TotalFloor: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      WhichFloor: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      // WaterSupply4: ['', [Validators.required]],
      TenentType1: ['', [Validators.required]],
      MonthlyRent1: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      Maintenancecharge1: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      Securitydeposit1: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      AvailableFrom1: ['', [Validators.required, this.dateRangeValidator]],
      BrokerageSelect1: ['', [Validators.required]],
      BrokerageValue2: ['0'],
      // nearBy: ['', [Validators.required]],
      // NearByLandmarkAddress: ['0', [Validators.required]],
      Description: ['', [Validators.required, this.validateInput1]]
      // Coveredparking4: ['', [Validators.required]],
      // Parking: ['', [Validators.required]],
      // Openparking4: ['', [Validators.required]],
      // parking: ['0'],
      // DoorFacing: ['', [Validators.required]],

    });
    this.secondFormGroup8 = this.fb.group({
      MonthlyRent1: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      Maintenancecharge1: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      Securitydeposit1: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      AvailableFrom1: ['', [Validators.required, this.dateRangeValidator]],
      BrokerageSelect1: ['', [Validators.required]],
      BrokerageValue3: ['0'],
      // nearBy: ['', [Validators.required]],
      // NearByLandmarkAddress: ['0', [Validators.required]],
      Description: ['', [Validators.required, this.validateInput1]]
      // Coveredparking4: ['', [Validators.required]],
      // Parking: ['', [Validators.required]],
      // Openparking4: ['', [Validators.required]],
      // parking: ['0'],
      // DoorFacing: ['', [Validators.required]],

    });
    this.secondFormGroup5 = this.fb.group({
      photos: [''],
      file: [''],
      coverImage: ['', [Validators.required]],
      cover: [''],
      master: [''],
      floorplan: [''],
      gallery: [''],
      fileSource: [''],
      masterPlanImage: [''],
      floorPlanImage: [''],
      coverImage2: [''],
    });
    this.RegistrationForm = new FormGroup({
      newUserName: new FormControl(''),
      newUserNumber: new FormControl(''),
    });


    // $('.ui.dropdown')
    //   .dropdown({
    //     maxSelections: 1,
    //     clearable: true,
    //   });
    // new multiple select locality

    $(function () {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      $('.ui.dropdown').dropdown();
      // $('.ui.search.dropdown').dropdown({
      //   minCharacters: 2,
      //   useLabels: false
      // });
    });

    // if(this.ammmentitiesArray.length < 3){

    //   this.showFormBtn = false;
    // }else if(this.ammmentitiesArray.length > 3){
    //   this.showFormBtn = true;

    // }


  }


  coverParkingSelected = false
  coveredParkingOptions = [
    { value: 0, label: '0' },
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
    { value: 4, label: '4' },
    { value: 5, label: '5' }
  ];

  openParkingOptions = [
    { value: 0, label: '0' },
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
    { value: 4, label: '4' },
    { value: 5, label: '5' }
  ];
  // selectedCoveredParking: any[] = [];
  // selectedOpenParking: any[] = [];

  openParkingSelected: boolean = false;


  OnParkingClick(parking: any, id: any) {
    this.ammmentitiesArray.push(parking);
    this.ParkingReviewValue = parking;
    this.noOfParking = id
  }

  coveredParking(covered, id) {
    this.ammmentitiesArray.push(covered);
    this.Coveredparking = id;
  }

  Openparkings(openParking, id) {
    // this.openParkingSelected = true;
    this.Openparking = id;
    if (this.Openparking) {
      this.toggleAmmentities = false;
    }
  }






  amount: number;

  formatInput() {
    // Ensure amount is valid number
    if (typeof this.amount !== 'number' || isNaN(this.amount)) {
      this.amount = null;
    }
  }
  // Custom validation function
  validateInput(control) {
    // const regExp = /^(?!\s)(?=.*[a-zA-Z])[a-zA-Z0-9\s]{3,}$/;
    const regExp = /^(?=\s*\S)(?=.*[a-zA-Z])[a-zA-Z0-9\s]{3,}$/;

    if (regExp.test(control.value)) {
      return null; // Validation passes
    } else {
      return { invalidInput: true }; // Validation fails
    }
  }
  validateInput11(control) {
    // const regExp = /^(?!\s)(?=.*[a-zA-Z])[a-zA-Z0-9][a-zA-Z0-9\s\W]{1,}[a-zA-Z0-9]$/;
    const regExp = /^(?=\s*\S)(?=.*[a-zA-Z])[a-zA-Z0-9\s]{3,}$/;


    if (regExp.test(control.value)) {
      return null; // Validation passes
    } else {
      return { invalidInputLoc: true }; // Validation fails
    }
  }

  validateInput2(control) {
    const regExp = /^(?!-?\s)(?!-?$)\d+$/;
    if (regExp.test(control.value)) {
      return null; // Validation passes
    } else {
      return { invalidInput2: true }; // Validation fails
    }
  }
  validateInput1(control) {
    const regExp = /^(?=.*[a-zA-Z])(?=.*[^\s])[a-zA-Z0-9\s\S]{3,}$/m;
    // const regExp = /^(?!\s)[a-zA-Z0-9\s\S]{0,}(?=.*[a-zA-Z0-9]{3,})[a-zA-Z0-9\s\S]{0,}(?!\s)$/m;

    if (regExp.test(control.value)) {
      return null; // Validation passes
    } else {
      return { invalidInput1: true }; // Validation fails
    }
  }

  @HostListener('mouseenter') mouseover($event) {
    $('body').removeClass('bodyhiddenclass');

  }

  metatags() {
    const PAGEID = '40';
    this.Service.getstaticmeta(PAGEID).subscribe(metatags => {
      this.titleService.setTitle(metatags['Pageseo'][0].page_title);
      this.meta.updateTag({ name: 'description', content: metatags['Pageseo'][0].meta_description });
      this.meta.updateTag({ property: 'og:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_mobile/images/og/about.jpg' });
      this.meta.updateTag({ property: 'og:title', content: metatags['Pageseo'][0].page_title });
      this.meta.updateTag({ property: 'og:description', content: metatags['Pageseo'][0].meta_description });
      this.Service.createLinkForCanonicalURL();
    });
  }
  // Custom validator function to check date range
  dateRangeValidator(control: FormControl): { [key: string]: boolean } | null {
    const selectedDate = new Date(control.value);
    const currentDate = new Date();
    const nextSixMonths = new Date();
    nextSixMonths.setMonth(currentDate.getMonth() + 6);

    if (selectedDate < currentDate || selectedDate > nextSixMonths) {
      return { 'invalidDateRange': true };
    }
    return null;
  }

  checkuserlogin() {
    this.userID = localStorage.getItem('userID');
    this.loginId = localStorage.getItem('loginID');
    if (this.loginId === null || this.loginId === undefined || this.loginId === '') {
      this.loginShowHide = false;
    } else {
      this.loginShowHide = true;
    }
    // if (this.userID === null) {
    //   this.router.navigate(['/login']);
    // } else {
    // }
  }

  isAddNewLocBtnDisabled: boolean = true;
  onInputChangeSell() {

    // var enameFilter = /^([a-zA-Z]+\s)*[a-zA-Z]+$/;
    // if (enameFilter.test($('#localityIdPassing').val())) {
    //   $('#localityIdPassing').removeAttr('style');
    // } else {
    //   $('#localityIdPassing')
    //     .focus()
    //     .css('border-color', 'red')
    //     .attr('placeholder', 'Please enter valid Locality name')
    //     .val('');
    //     return false;

    //   }

    this.isAddNewLocBtnDisabled = this.propertyAutoLocalityName.length === 0;
    this.Locality = undefined;
    this.selectedLoc = undefined;
    if (this.localitys == undefined) {
      this.isButtonDisabled = true;
    } else {
      this.isButtonDisabled = false;
    }
    this.filteredData2 = this.localitys.filter(item => {
      return item.locality_name.toLowerCase().includes(this.propertyAutoLocalityName.toLowerCase());
    });



    const match = this.filteredData2.find(locality => locality.locality_name === this.propertyAutoLocalityName);
    if (match) {
      this.isButtonDisabled = false;
    } else {
      this.isButtonDisabled = true;


    }
    this.filteredData2length = this.filteredData2.length === 0;
    if (this.filteredData2.length == 0) {
      this.isButtonDisabled = true;
    } else {
      this.isButtonDisabled = false;
    }


  }

  onInputChangeRent() {

    this.isAddNewLocBtnDisabled = this.propertyAutoRentLocalityName.length === 0;
    this.Locality = undefined;
    this.selectedLoc = undefined;
    if (this.localitys == undefined) {
      this.isButtonDisabled = true;
    } else {
      this.isButtonDisabled = false;
    }



    this.filteredData1 = this.localitys.filter(item => {
      return item.locality_name.toLowerCase().includes(this.propertyAutoRentLocalityName.toLowerCase());
    });


    const match = this.filteredData1.find(locality => locality.locality_name === this.propertyAutoRentLocalityName);
    if (match) {
      this.isButtonDisabled = false;
    } else {
      this.isButtonDisabled = true;

    }
    this.filteredData1length = this.filteredData1.length === 0;
    if (this.filteredData1.length == 0) {
      this.isButtonDisabled = true;
    } else {
      this.isButtonDisabled = false;
    }
  }


  onItemSelectSell(selected) {
    this.propertyAutoLocalityName = selected.locality_name;
    this.LocalityReviewName = selected.locality_name;
    this.Locality = selected.locality_IDPK;
    this.selectedLoc = selected.locality_name;

    const match = this.filteredData2.find(locality => locality.locality_name.toLowerCase() === this.propertyAutoLocalityName.toLowerCase());
    if (match) {
      this.isButtonDisabled = false;
    } else {
      this.isButtonDisabled = true;

    }

  }

  onItemSelectRent(selected) {
    this.propertyAutoRentLocalityName = selected.locality_name;
    this.LocalityReviewName = selected.locality_name;
    this.selectedLoc = selected.locality_name;
    this.Locality = selected.locality_IDPK;

    const match = this.filteredData1.find(locality => locality.locality_name.toLowerCase() === this.propertyAutoRentLocalityName.toLowerCase());
    if (match) {
      this.isButtonDisabled = false;
    } else {
      this.isButtonDisabled = true;
    }
  }

  onItemSelect(selected) {
    var currentCity = selected.city;
    this.BuilderId = selected.Builder;
    this.propertyAutoName = selected.name;
  }
  goback() {
    $('.OtpDiv').css('display', 'none');

    this.numberLogIn = true;

    this.countdownconfig = {
      leftTime: 30,
      demand: true
    };
    this.countdown.begin();
    this.otpValidating = false;
  }


  handleEvent(e: CountdownEvent) {
    if (e.action === 'done') {
      this.otpexpired = true;
      $('.countdown_maindiv').hide()

    }
  }


  get f() {
    return this.firstFormGroup.controls;
  }

  get s() {
    return this.secondFormGroup.controls;
  }
  get s1() {
    return this.secondFormGroup1.controls;
  }

  get s2() {
    return this.secondFormGroup2.controls;
  }
  get s6() {
    return this.secondFormGroup6.controls;
  }

  get s3() {
    return this.secondFormGroup3.controls;
  }
  get s31() {
    return this.secondFormGroup7.controls;
  }

  get s4() {
    return this.secondFormGroup4.controls;
  }
  get s41() {
    return this.secondFormGroup8.controls;
  }

  get s5() {
    return this.secondFormGroup5.controls;
  }

  get plot() {
    return this.plotsFormGroup.controls;
  }

  get otherPropType() {
    return this.OtherPropTypeFormGroup.controls;
  }



  onPotsSubmite() {
    this.PlotsSubmitted = true;

    if (this.plotSixeOther === true) {
      this.plotSizeReviewValue = this.otherPlotSize
    }


    if (this.plotsFormGroup.invalid) {
      return;
    } else if (this.plotsFormGroup.valid) {
      this.PlotType = this.plotsFormGroup.value.PlotsType;
      this.PlotSize = this.plotsFormGroup.value.Plotsize;
      this.PlotAge = this.plotsFormGroup.value.PropertyAge;
      this.PropertyAgeMonth = this.plotsFormGroup.value.PropertyAgeMonths;
      this.PropertyArea = this.plotsFormGroup.value.PlotArea;
      this.AreaType = this.plotsFormGroup.value.AreaType;
      this.DoorFacing = this.plotsFormGroup.value.DoorFacing;
      // this.ProjectDescription = this.plotsFormGroup.value.Description.replace(/\s+/g, ' ').trim();;



    }
  }


  public displayname(value) {
    if (value) {
      return value.name;
    }
  }
  resetStepper() {

    swal({
      title: 'Reset Form ?',
      text: 'This will reset all form fields to their default values. Do you want to proceed?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, reset it!'
    }).then((result) => {
      if (result.value === true) {

        this.stepper.reset();
        this.onReadyToMoveInSelect = false;
        this.UnderConstructionSelect = false;
        this.CoverImage = [];
        this.MasterPlanImage = [];
        this.FloorPlanImage = [];
        this.galleryimages = [];

        swal(
          'Reset!',
          'Your form has been reset.',
          'success'
        );
      }
    })
  }
  ammentitiesProperty = true;

  // testting() {

  //   if(this.parkingSelectedArray.length == 3 ){
  //     
  //     
  // }
  // }
  ammentitiesPropertymodel = false;
  otherPropTypeSubmite() {
    this.otherPropTypeSubmited = true;

    if (this.parkingSelectedArray.length == 3) {
      // 
      // 

      // $('#ammentitiesProperty').css('display', 'block')
      // $('#ammentitiesPropertymodel').css('display', 'none')


      this.ammentitiesProperty = true;
      this.ammentitiesPropertymodel = false;


    }
    else {

      this.ammentitiesProperty = false;
      this.ammentitiesPropertymodel = true;
      // $('#ammentitiesPropertymodel').css('display', 'block')
      // $('#ammentitiesProperty').css('display', 'none')



    }
    if (this.OtherPropTypeFormGroup.invalid) {
      $('#ammentitiesPropertymodel').css('display', 'block')
      $('#ammentitiesProperty').css('display', 'none')
      return;
    } else if (this.OtherPropTypeFormGroup.valid) {
      $('#ammentitiesProperty').css('display', 'block')
      $('#ammentitiesPropertymodel').css('display', 'none')

      // 
      // this.PropertyStatus = this.OtherPropTypeFormGroup.value.PropertyStatus;
      this.PropertyAge = this.OtherPropTypeFormGroup.value.PropertyAge;
      // this.PropertyAgeMonth = this.OtherPropTypeFormGroup.value.PropertyAgeMonths;
      // this.PossessionDate = this.OtherPropTypeFormGroup.value.PropertyPossession;
      this.BHKDetails = this.OtherPropTypeFormGroup.value.BHKDetails;
      this.BathroomsDeatils = this.OtherPropTypeFormGroup.value.Bathrooms;
      this.Balconies = this.OtherPropTypeFormGroup.value.Balconies;
      this.DoorFacing = this.OtherPropTypeFormGroup.value.DoorFacing;
      this.FurnishingStatus = this.OtherPropTypeFormGroup.value.FurnishingStatus;
      // this.noOfParking = this.OtherPropTypeFormGroup.value.Parking;
      // this.Coveredparking = this.OtherPropTypeFormGroup.value.Coveredparking;
      // this.Openparking = this.OtherPropTypeFormGroup.value.Openparking;
      this.PropertyArea = this.OtherPropTypeFormGroup.value.PropertyArea;
      this.AreaType = this.OtherPropTypeFormGroup.value.AreaType;
      /*this.TotalFloor = this.OtherPropTypeFormGroup.value.TotalFloor;
      this.WhichFloor = this.OtherPropTypeFormGroup.value.WhichFloor;
      this.ProjectDescription = this.OtherPropTypeFormGroup.value.Description.replace(/\s+/g, ' ').trim();;*/
      // this.Dateconvert();
    }
    /* PropertyStatus: ['', [Validators.required]],
       PropertyAge: [''],
       PropertyAgeMonths: ['0'],
       PropertyPossession: [''],
       BHKDetails: ['', [Validators.required]],
       PropertyArea: ['', [Validators.required]],
       Bathrooms: ['', [Validators.required]],
       Balconies: ['', [Validators.required]],
       DoorFacing: ['', [Validators.required]],
       FurnishingStatus: ['', [Validators.required]],
       Parking: [''],
       Coveredparking: ['', [Validators.required]],
       Openparking: ['', [Validators.required]],
       AreaType: ['sq.feet', [Validators.required]],*/
  }



  Dateconvert() {
    if (this.PossessionDate === '') {
      this.newpossesiondate = '';
    } else {
      var dateObj = this.PossessionDate;
      var month = dateObj.getUTCMonth() + 1; //months from 1-12
      var day = dateObj.getUTCDate() + 1;
      var year = dateObj.getUTCFullYear();
      const newdate = year + '/' + month + '/' + day;
      this.newpossesiondate = newdate;
      this.newpossesiondate1 = year + '-' + month + '-' + day;
    }
  }



  onSubmit() {
    this.submitted = true;
    if (this.firstFormGroup.invalid) {

      return;
    } else if (this.firstFormGroup.valid) {
      // 
      this.whatYouAre = this.firstFormGroup.value.YouAre;

      // 

      this.EmailId = this.firstFormGroup.value.emailId;
      // 

      this.purpose = this.firstFormGroup.value.Purpose;

      this.PropertyAge = this.firstFormGroup.value.PropertyAge;
      this.testAge = this.PropertyAge

      this.PropertyStatus = this.firstFormGroup.value.PropertyStatus;




      this.PropertyAgeMonth = this.firstFormGroup.value.PropertyAgeMonths;

      this.CityName = this.locationSelectedId;
      this.PropTypeArea = this.firstFormGroup.value.PropTypeArea;
      this.Region = this.firstFormGroup.value.Region;
      // this.Locality = this.firstFormGroup.value.Localities;

      this.PropertyType = this.firstFormGroup.value.PropertyType;
      this.PossessionDate = this.firstFormGroup.value.PropertyPossession;




      this.Postalcode = this.firstFormGroup.value.Postalcode;
      this.LocalityReviewName = this.firstFormGroup.value.Localities.replace(/\s+/g, ' ').trim();
      this.PropertyName = this.firstFormGroup.value.PropertyName.replace(/\s+/g, ' ').trim();;
      this.Address = this.firstFormGroup.value.Address.replace(/\s+/g, ' ').trim();;
      this.Dateconvert();


      let param = {
        regid: this.UserId,
        name: this.UserName,
        lname: this.lastUsername,
        mail: this.EmailId
      };
      this.Service.updateuserdata(param).subscribe(responce => {

      });
    }
  }

  onSubmit2() {
    this.submitted2 = true;
    if (this.secondFormGroup.invalid) {
      return;
    } else if (this.secondFormGroup.valid) {

      this.TotalFloor = this.secondFormGroup.value.TotalFloor;
      this.WhichFloor = this.secondFormGroup.value.WhichFloor;
      this.WaterSupply = this.secondFormGroup.value.WaterSupply;
      this.proptitle = this.secondFormGroup.value.proptitle;
      this.Price = this.secondFormGroup.value.Price;
      this.BrokerageValue = this.secondFormGroup.value.BrokerageValue;
      this.Maintenancecharge = this.secondFormGroup.value.Maintenancecharge;
      this.Nearbydetails = this.NearByLandmarkAddress;
      this.ProjectDescription = this.secondFormGroup.value.Description.replace(/\s+/g, ' ').trim();;
      this.numDifferentiation(this.Price);
      // this.DoorFacing = this.secondFormGroup.value.DoorFacing;
      /*this.Coveredparking = this.secondFormGroup.value.Coveredparking;
      this.Openparking = this.secondFormGroup.value.Openparking;*/
      // this.noOfParking = this.secondFormGroup.value.Parking;
    }
  }
  onSubmit8() {
    this.submitted21 = true;
    if (this.secondFormGroup1.invalid) {
      return;
    } else if (this.secondFormGroup1.valid) {

      this.WaterSupply = this.secondFormGroup1.value.WaterSupply;
      this.proptitle = this.secondFormGroup1.value.proptitle;
      this.Price = this.secondFormGroup1.value.Price;
      this.BrokerageValue = this.secondFormGroup1.value.BrokerageValue1;
      this.Maintenancecharge = this.secondFormGroup1.value.Maintenancecharge;
      this.Nearbydetails = this.NearByLandmarkAddress;
      this.ProjectDescription = this.secondFormGroup1.value.Description.replace(/\s+/g, ' ').trim();;
      this.numDifferentiation(this.Price);
      // this.DoorFacing = this.secondFormGroup1.value.DoorFacing;
      /*this.Coveredparking = this.secondFormGroup1.value.Coveredparking;
      this.Openparking = this.secondFormGroup1.value.Openparking;*/
      // this.noOfParking = this.secondFormGroup1.value.Parking;
    }
  }


  numDifferentiation(value) {
    this.priceReviewValue = Math.abs(value);
    if (this.priceReviewValue >= 10000000) {
      this.priceReviewValue = (this.priceReviewValue / 10000000).toFixed(1) + ' Cr';
    } else if (this.priceReviewValue >= 100000) {
      this.priceReviewValue = (this.priceReviewValue / 100000).toFixed(0) + ' Lac';
    }
    return this.priceReviewValue;
  }

  onSubmit3() {
    this.submitted3 = true;
    if (this.secondFormGroup2.invalid) {
      return;
    } else if (this.secondFormGroup2.valid) {

      this.TotalFloor = this.secondFormGroup2.value.TotalFloor;
      this.WhichFloor = this.secondFormGroup2.value.WhichFloor;
      this.WaterSupply = this.secondFormGroup2.value.WaterSupply2;
      this.Price = this.secondFormGroup2.value.Price2;
      this.Maintenancecharge = this.secondFormGroup2.value.Maintenancecharge;
      this.proptitle = this.secondFormGroup2.value.proptitle2;
      this.Nearbydetails = this.NearByLandmarkAddress;
      this.ProjectDescription = this.secondFormGroup2.value.Description.replace(/\s+/g, ' ').trim();;
      // this.DoorFacing = this.secondFormGroup2.value.DoorFacing2;
      // this.Coveredparking = this.secondFormGroup2.value.Coveredparking2;
      // this.Openparking = this.secondFormGroup2.value.Openparking2;
      // this.noOfParking = this.secondFormGroup2.value.Parking;
      /* this.Address = this.secondFormGroup2.value.Address.replace(/\s+/g, ' ').trim();;
       this.Postalcode = this.secondFormGroup2.value.Postalcode;*/
      this.numDifferentiation(this.Price);
    }
  }
  onSubmit7() {
    this.submitted7 = true;
    if (this.secondFormGroup6.invalid) {
      return;
    } else if (this.secondFormGroup6.valid) {

      this.TotalFloor = this.secondFormGroup6.value.TotalFloor;
      this.WhichFloor = this.secondFormGroup6.value.WhichFloor;
      this.WaterSupply = this.secondFormGroup6.value.WaterSupply2;
      this.Price = this.secondFormGroup6.value.Price2;
      this.Maintenancecharge = this.secondFormGroup6.value.Maintenancecharge;
      this.proptitle = this.secondFormGroup6.value.proptitle2;
      this.Nearbydetails = this.NearByLandmarkAddress;
      this.ProjectDescription = this.secondFormGroup6.value.Description.replace(/\s+/g, ' ').trim();;
      this.numDifferentiation(this.Price);
    }
  }

  onSubmit4() {
    this.submitted4 = true;
    if (this.secondFormGroup3.invalid) {
      return;
    } else if (this.secondFormGroup3.valid) {

      this.TotalFloor = this.secondFormGroup3.value.TotalFloor;
      this.WhichFloor = this.secondFormGroup3.value.WhichFloor;
      this.WaterSupply = this.secondFormGroup3.value.WaterSupply3;
      this.MonthlyRent = this.secondFormGroup3.value.MonthlyRent;
      this.Maintenancecharge = this.secondFormGroup3.value.Maintenancecharge;
      this.Securitydeposit = this.secondFormGroup3.value.Securitydeposit;
      this.TenentType = this.secondFormGroup3.value.TenentType;
      this.AvailableFrom = this.secondFormGroup3.value.AvailableFrom;
      var date = new Date(this.AvailableFrom);
      this.AvailableFromDate = date.toString().split(' ').slice(0, 4).join(' ');
      this.Nearbydetails = this.NearByLandmarkAddress;
      this.ProjectDescription = this.secondFormGroup3.value.Description.replace(/\s+/g, ' ').trim();;
      // this.Coveredparking = this.secondFormGroup3.value.Coveredparking3;
      // this.Openparking = this.secondFormGroup3.value.Openparking3;
      // this.noOfParking = this.secondFormGroup3.value.Parking;
      /*  this.Address = this.secondFormGroup3.value.Address.replace(/\s+/g, ' ').trim();;
        this.Postalcode = this.secondFormGroup3.value.Postalcode;*/
      // this.DoorFacing = this.secondFormGroup3.value.DoorFacing;
      this.AvailableDateconvert();
    }
  }
  onSubmit9() {
    this.submitted41 = true;
    if (this.secondFormGroup7.invalid) {
      return;
    } else if (this.secondFormGroup7.valid) {

      this.TotalFloor = this.secondFormGroup7.value.TotalFloor;
      this.WhichFloor = this.secondFormGroup7.value.WhichFloor;
      this.WaterSupply = this.secondFormGroup7.value.WaterSupply3;
      this.MonthlyRent = this.secondFormGroup7.value.MonthlyRent;
      this.Maintenancecharge = this.secondFormGroup7.value.Maintenancecharge;
      this.Securitydeposit = this.secondFormGroup7.value.Securitydeposit;
      this.TenentType = this.secondFormGroup7.value.TenentType;
      this.AvailableFrom = this.secondFormGroup7.value.AvailableFrom;
      var date = new Date(this.AvailableFrom);
      this.AvailableFromDate = date.toString().split(' ').slice(0, 4).join(' ');
      this.Nearbydetails = this.NearByLandmarkAddress;
      this.ProjectDescription = this.secondFormGroup7.value.Description.replace(/\s+/g, ' ').trim();;
      // this.Coveredparking = this.secondFormGroup7.value.Coveredparking3;
      // this.Openparking = this.secondFormGroup7.value.Openparking3;
      // this.noOfParking = this.secondFormGroup7.value.Parking;
      /*  this.Address = this.secondFormGroup7.value.Address.replace(/\s+/g, ' ').trim();;
        this.Postalcode = this.secondFormGroup7.value.Postalcode;*/
      // this.DoorFacing = this.secondFormGroup7.value.DoorFacing;
      this.AvailableDateconvert();
    }
  }



  AvailableDateconvert() {
    if (this.AvailableFrom === '') {
      this.newAvailableFromdate = '';
    } else {
      var dateObj = this.AvailableFrom;
      var month = dateObj.getUTCMonth() + 1; //months from 1-12
      var day = dateObj.getUTCDate() + 1;
      var year = dateObj.getUTCFullYear();
      const newdate = year + '/' + month + '/' + day;
      this.newAvailableFromdate = newdate;
    }
  }

  onSubmit5() {
    this.submitted5 = true;

    if (this.secondFormGroup4.invalid) {
      // 
      return;
    } else if (this.secondFormGroup4.valid) {

      this.TotalFloor = this.secondFormGroup4.value.TotalFloor;
      this.WhichFloor = this.secondFormGroup4.value.WhichFloor;
      this.MonthlyRent = this.secondFormGroup4.value.MonthlyRent1;
      this.Maintenancecharge = this.secondFormGroup4.value.Maintenancecharge1;
      this.Securitydeposit = this.secondFormGroup4.value.Securitydeposit1;
      this.TenentType = this.secondFormGroup4.value.TenentType1;
      this.BrokerageValue = this.secondFormGroup4.value.BrokerageValue2;
      this.AvailableFrom = this.secondFormGroup4.value.AvailableFrom1;
      var date = new Date(this.AvailableFrom);
      this.AvailableFromDate = date.toString().split(' ').slice(0, 4).join(' ');
      this.Nearbydetails = this.NearByLandmarkAddress;
      this.WaterSupply = this.secondFormGroup4.value.WaterSupply4;
      this.ProjectDescription = this.secondFormGroup4.value.Description.replace(/\s+/g, ' ').trim();;
      // this.DoorFacing = this.secondFormGroup4.value.DoorFacing;
      // this.Coveredparking = this.secondFormGroup4.value.Coveredparking4;
      // this.noOfParking = this.secondFormGroup4.value.Parking;
      // this.Openparking = this.secondFormGroup4.value.Openparking4;
      /* this.Address = this.secondFormGroup4.value.Address1;
      this.Postalcode = this.secondFormGroup4.value.Postalcode1;*/
      this.AvailableDateconvert();
    }
  }
  onSubmit10() {
    this.submitted51 = true;
    if (this.secondFormGroup8.invalid) {
      return;
    }
    else if (this.secondFormGroup8.valid) {


      this.TotalFloor = this.secondFormGroup8.value.TotalFloor;
      this.WhichFloor = this.secondFormGroup8.value.WhichFloor;
      this.MonthlyRent = this.secondFormGroup8.value.MonthlyRent1;
      this.Maintenancecharge = this.secondFormGroup8.value.Maintenancecharge1;
      this.Securitydeposit = this.secondFormGroup8.value.Securitydeposit1;
      // this.TenentType = this.secondFormGroup8.value.TenentType1;
      this.BrokerageValue = this.secondFormGroup8.value.BrokerageValue3;
      this.AvailableFrom = this.secondFormGroup8.value.AvailableFrom1;
      var date = new Date(this.AvailableFrom);
      this.AvailableFromDate = date.toString().split(' ').slice(0, 4).join(' ');
      // this.Nearbydetails = this.NearByLandmarkAddress;
      // this.WaterSupply = this.secondFormGroup8.value.WaterSupply4;
      this.ProjectDescription = this.secondFormGroup8.value.Description.replace(/\s+/g, ' ').trim();;
      // this.DoorFacing = this.secondFormGroup8.value.DoorFacing;
      // this.Coveredparking = this.secondFormGroup8.value.Coveredparking4;
      // this.noOfParking = this.secondFormGroup8.value.Parking;
      // this.Openparking = this.secondFormGroup8.value.Openparking4;
      /* this.Address = this.secondFormGroup8.value.Address1;
      this.Postalcode = this.secondFormGroup8.value.Postalcode1;*/
      this.AvailableDateconvert();
    }
  }

  onSubmit6() {
    // this.submitted6 = true;
    // if (this.secondFormGroup5.invalid) {
    //   return;
    // } else if (this.secondFormGroup5.valid) {
    // }

    this.submitted6 = true;

    // If the form is invalid, prevent advancing
    if (this.secondFormGroup5.invalid) {
      this.stepper.selected.completed = false;  // Prevents moving to the next step
      return;
    }

    // Proceed with form submission logic if the form is valid
    // Add your submission code here
  }



  postProp() {
    this.billingShowSummary = false
    console.log('postProp')

    this.loginId = localStorage.getItem('loginID');
    if (this.loginId === null || this.loginId === undefined || this.loginId === '') {
      window.location.hash = 'postsellprop';
      swal({
        title: 'Almost There!',
        text: 'Are you ready to list your property?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'submit'
      }).then((result) => {
        // if (result.value === true) {
        //   this.detailedSubmit = false;
        //   $('#otpValidate').css('display', 'block')
        //   if (this.loadComponent == false) {
        //     this.loadComponent = true;
        //     import('../OtpLoginNewModule/otp-validation.module').then(mod => mod.OtpValidationModule).then(otpValidationComponent => {
        //       this.otpValidationComponent = otpValidationComponent.components['lazy'];
        //     });
        //     this.Visiblebrochure = this.Visiblebrochure ? false : true;
        //     $('.modal-login').css('z-index', '1')
        //   } else {
        //     // this.loadComponent = false;
        //   }
        // }


        if (result.value === true) {
          this.detailedSubmit = false;
          if (this.loadComponent == false) {
            this.loadComponent = true;
            import('../otp-login-new/otp-login-new.moduel').then(mod => mod.OtpLoginNewModule).then(otpValidationComponent => {
              this.otpValidationComponent = otpValidationComponent.components['lazy'];
            });
            this.Visiblebrochure = this.Visiblebrochure ? false : true;
          } else {
            this.loadComponent = false;
          }
        }
      })

    } else {
      this.UserId = localStorage.getItem('userID');
      this.UserNumber = localStorage.getItem('userNumber');
      const param = {
        userId: this.UserId,
        number: this.UserNumber,
        propertyId: null,
        categoryId: null,
      }

      this.eliteService.checkPostPropertyCredits(param).subscribe(response => {
        console.log('hello')

        if (response['status'] == 'True') {

          if (this.loadComponent == false) {
            swal({
              title: 'Submit Form ?',
              text: 'Your Property will be Listed',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'submit!'
            }).then((result) => {
              if (result.value === true) {
                this.detailedSubmit = false;
                this.submitionLoader = true;
                this.UserName = localStorage.getItem('userName');
                this.lastUsername = localStorage.getItem('lastName');
                this.UserId = localStorage.getItem('userID');
                this.UserEmail = localStorage.getItem('userEmail');
                this.UserNumber = localStorage.getItem('userNumber');
                let browserInfo = navigator.userAgent;
                let browser;
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
                // plot
                if (this.proptypeid === '50403') {
                  this.PropertyAge = this.plotsFormGroup.value.PropertyAge;
                  this.PlotType = this.plotsFormGroup.value.PlotsType;
                  this.PropertyAgeMonth = '';
                  this.PropertyAge = ''
                }
                // villas
                else if (this.proptypeid === '50402') {
                  this.PropertyAge = this.firstFormGroup.value.PropertyAge;
                  this.PlotAge = ''
                }
                // independent house
                else if (this.proptypeid === '50407') {
                  this.PropertyAge = this.firstFormGroup.value.PropertyAge;
                  this.PlotAge = ''
                }
                // apartment
                else if (this.proptypeid === '50401') {
                  this.PropertyAge = this.firstFormGroup.value.PropertyAge;
                  this.PlotAge = ''
                }

                if (this.statusReview === '138564') {
                  this.statusReview = 'Ready to move in';
                  this.PossessionDate = ''
                  this.onReadyToMoveInSelect = true;
                  this.UnderConstructionSelect = false;
                  this.firstFormGroup.get('PropertyAge').setValidators([Validators.required, Validators.pattern('^[0-9]+$')]);
                  this.firstFormGroup.get('PropertyPossession').setValidators(null);
                  this.firstFormGroup.get('PropertyPossession').setValue(null);

                }

                // 


                if (this.Locality != undefined) {
                  this.propertyAutoLocalityName = '';
                } else {

                }

                const params = {
                  Propertyname: this.PropertyName,
                  Price: this.Price,
                  Maintanencecharge: this.Maintenancecharge,
                  Totalfloor: this.TotalFloor,
                  Propertyfloor: this.WhichFloor,
                  Doorfacing: this.DoorFacing,
                  City: this.CityName,
                  Locality: this.Locality,
                  Region: this.Region,
                  PropertyType: this.PropertyType,
                  BuildingType: this.PropTypeArea,
                  Status: this.PropertyStatus,
                  Furnish: this.FurnishingStatus,
                  Ownership: this.whatYouAre,
                  PossesionDate: this.newpossesiondate1,
                  PropertyAgeYear: this.PropertyAge,
                  PropertyAgeMonth: this.PropertyAgeMonth,
                  BrokerageCharge: this.BrokerageValue,
                  Address: this.Address,
                  Zipcode: this.Postalcode,
                  BHK: this.BHKDetails,
                  Bathroom: this.BathroomsDeatils,
                  Balcony: this.Balconies,
                  Area: this.PropertyArea,
                  AreaType: this.AreaType,
                  Openparking: this.Openparking,
                  Coveredparking: this.Coveredparking,
                  Khatatype: this.proptitle,
                  Watersupply: this.WaterSupply,
                  Amenities: this.finalAminitiesArray,
                  Facilities: this.finalnoOfFacilitiesArray,
                  Approvals: this.finalApprovalsArray,
                  Nearby: this.finalnoOfNearbyArray,
                  Nearbydetails: this.Nearbydetails,
                  PlotType: this.PlotType,
                  PlotSize: this.PlotSize,
                  PlotAge: this.PlotAge,
                  Parking: this.noOfParking,
                  Userid: this.UserId,
                  Description: this.ProjectDescription,
                  BuilderID: this.BuilderId,
                  newlocality: this.propertyAutoLocalityName,
                  Username: this.UserName,
                  Localityname: this.selectedLoc,
                  useremail: this.EmailId,
                  Browser: browser,
                  Device: '1'
                };

                this.Service.postlisting(params).subscribe(responce => {
                  // 
                  if (responce['status'] === 'True') {
                    this.submitionLoader = false;
                    this.PropertyID = responce['Data'];

                    const creditParam = {
                      userId: this.UserId,
                      number: this.UserNumber,
                      propertyId: this.PropertyID,
                      categoryId: 1,
                    }
                    this.eliteService.checkPostPropertyCredits(creditParam).subscribe(response => {
                      if (response['status'] == 'True') {
                        this.photoUpload();
                        window.location.hash = '';
                        swal(
                          'Submited!',
                          'Your Property Added Successfully',
                          'success'
                        );
                      }
                    })
                  }
                });
              }
            })
          } else {
            this.submitionLoader = true;
            this.UserName = localStorage.getItem('userName');
            this.lastUsername = localStorage.getItem('lastName');
            this.UserId = localStorage.getItem('userID');
            this.UserEmail = localStorage.getItem('userEmail');
            this.UserNumber = localStorage.getItem('userNumber');
            let browserInfo = navigator.userAgent;
            let browser;
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
            // plot
            if (this.proptypeid === '50403') {
              this.PropertyAge = this.plotsFormGroup.value.PropertyAge;
              this.PlotType = this.plotsFormGroup.value.PlotsType;
              this.PropertyAgeMonth = '';
              this.PropertyAge = ''
            }
            // villas
            else if (this.proptypeid === '50402') {
              this.PropertyAge = this.firstFormGroup.value.PropertyAge;
              this.PlotAge = ''
            }
            // independent house
            else if (this.proptypeid === '50407') {
              this.PropertyAge = this.firstFormGroup.value.PropertyAge;
              this.PlotAge = ''
            }
            // apartment
            else if (this.proptypeid === '50401') {
              this.PropertyAge = this.firstFormGroup.value.PropertyAge;
              this.PlotAge = ''
            }
            if (this.statusReview === '138564') {
              this.statusReview = 'Ready to move in';
              this.PossessionDate = ''
              this.onReadyToMoveInSelect = true;
              this.UnderConstructionSelect = false;
              this.firstFormGroup.get('PropertyAge').setValidators([Validators.required, Validators.pattern('^[0-9]+$')]);
              this.firstFormGroup.get('PropertyPossession').setValidators(null);
              this.firstFormGroup.get('PropertyPossession').setValue(null);

            }
            // 


            if (this.Locality != undefined) {
              // 

              this.propertyAutoLocalityName = ''
            } else {

            }
            const params = {
              Propertyname: this.PropertyName,
              Price: this.Price,
              Maintanencecharge: this.Maintenancecharge,
              Totalfloor: this.TotalFloor,
              Propertyfloor: this.WhichFloor,
              Doorfacing: this.DoorFacing,
              City: this.CityName,
              Locality: this.Locality,
              Region: this.Region,
              PropertyType: this.PropertyType,
              BuildingType: this.PropTypeArea,
              Status: this.PropertyStatus,
              Furnish: this.FurnishingStatus,
              Ownership: this.whatYouAre,
              PossesionDate: this.newpossesiondate1,
              PropertyAgeYear: this.PropertyAge,
              PropertyAgeMonth: this.PropertyAgeMonth,
              BrokerageCharge: this.BrokerageValue,
              Address: this.Address,
              Zipcode: this.Postalcode,
              BHK: this.BHKDetails,
              Bathroom: this.BathroomsDeatils,
              Balcony: this.Balconies,
              Area: this.PropertyArea,
              AreaType: this.AreaType,
              Openparking: this.Openparking,
              Coveredparking: this.Coveredparking,
              Khatatype: this.proptitle,
              Watersupply: this.WaterSupply,
              Amenities: this.finalAminitiesArray,
              Facilities: this.finalnoOfFacilitiesArray,
              Approvals: this.finalApprovalsArray,
              Nearby: this.finalnoOfNearbyArray,
              Nearbydetails: this.Nearbydetails,
              PlotType: this.PlotType,
              PlotSize: this.PlotSize,
              PlotAge: this.PlotAge,
              Parking: this.noOfParking,
              Userid: this.UserId,
              Description: this.ProjectDescription,
              BuilderID: this.BuilderId,
              newlocality: this.propertyAutoLocalityName,
              Localityname: this.selectedLoc,
              useremail: this.EmailId,
              Username: this.UserName,
              Browser: browser,
              Device: '1'
            };

            this.Service.postlisting(params).subscribe(responce => {
              // 
              if (responce['status'] === 'True') {
                this.submitionLoader = false;
                this.PropertyID = responce['Data'];
                this.photoUpload();
                swal(
                  'Submited!',
                  'Your Property Added Successfully',
                  'success'
                );
              }
            });
          }

        } else {
          $('#propertyLimitTrigger').click()
        }
      })

    }
  }

  photoUpload() {
    const formData = new FormData();
    formData.append('cover', this.secondFormGroup5.get('cover').value);
    formData.append('master', this.secondFormGroup5.get('master').value);
    formData.append('floorplan', this.secondFormGroup5.get('floorplan').value);
    formData.append('PropID', this.PropertyID);
    for (var i = 0; i < this.galleryimages.length; i++) {
      formData.append('file[]', this.galleryimages[i]);
    }

    this.Service.uploadFile(formData).subscribe((res) => {
      this.uploadResponse = res;
      if (res['status'] === 'True') {
       this.ngZone.run(() => {
  this.router.navigate(['/userauth/sellingprojects', this.UserId]);
});
      }
      // 
    }, (err) => {
      // 
    });
  }






  postPropRentals() {


    this.loginId = localStorage.getItem('loginID');
    if (this.loginId === null || this.loginId === undefined || this.loginId === '') {
      window.location.hash = 'postrentprop';

      // document.getElementById('id01').style.display = 'block';


      swal({
        title: 'Submit Form ?',
        text: 'Your Property will be Listed',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'submit'
      }).then((result) => {
        // if (result.value === true) {
        //   this.detailedSubmit = false;
        //   $('#otpValidate').css('display', 'block')
        //   if (this.loadComponent == false) {
        //     this.loadComponent = true;
        //     import('../otp-validation/otp-validation.module').then(mod => mod.OtpValidationModule).then(otpValidationComponent => {
        //       this.otpValidationComponent = otpValidationComponent.components['lazy'];
        //     });
        //     this.Visiblebrochure = this.Visiblebrochure ? false : true;
        //     $('.modal-login').css('z-index', '1')
        //   } else {
        //     // this.loadComponent = false;
        //   }


        // }


        if (result.value === true) {
          this.detailedSubmit = false;
          if (this.loadComponent == false) {
            this.loadComponent = true;

            import('../otp-login-new/otp-login-new.moduel').then(mod => mod.OtpLoginNewModule).then(otpValidationComponent => {
              this.otpValidationComponent = otpValidationComponent.components['lazy'];
            });
            this.Visiblebrochure = this.Visiblebrochure ? false : true;
          } else {
            this.loadComponent = false;
          }
        }


      })

    } else {

      this.UserId = localStorage.getItem('userID');
      this.UserNumber = localStorage.getItem('userNumber');
      const param = {
        userId: this.UserId,
        number: this.UserNumber,
        propertyId: null,
        categoryId: null,
      }

      this.eliteService.checkPostPropertyCredits(param).subscribe(response => {
        if (response['status'] == 'True') {
          if (this.loadComponent == false) {

            swal({
              title: 'Submit Form ?',
              text: 'Your Property will be Listed',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'submit'
            }).then((result) => {
              if (result.value === true) {
                this.detailedSubmit = false;
                this.submitionLoader = true;
                this.UserName = localStorage.getItem('userName');
                this.lastUsername = localStorage.getItem('lastName');
                this.UserId = localStorage.getItem('userID');
                this.UserEmail = localStorage.getItem('userEmail');
                this.UserNumber = localStorage.getItem('userNumber');


                let browserInfo = navigator.userAgent;
                let browser;

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

                // plot
                if (this.proptypeid === '50403') {
                  this.PropertyAge = this.plotsFormGroup.value.PropertyAge;
                  this.PlotType = this.plotsFormGroup.value.PlotsType;

                  this.PropertyAgeMonth = '';
                  this.PropertyAge = ''

                }
                // villas
                else if (this.proptypeid === '50402') {
                  this.PropertyAge = this.firstFormGroup.value.PropertyAge;

                  this.PlotAge = ''


                }
                // independent house
                else if (this.proptypeid === '50407') {
                  this.PropertyAge = this.firstFormGroup.value.PropertyAge;

                  this.PlotAge = ''


                }


                // apartment
                else if (this.proptypeid === '50401') {
                  this.PropertyAge = this.firstFormGroup.value.PropertyAge;

                  this.PlotAge = ''

                }

                if (this.Locality != undefined) {
                  this.propertyAutoRentLocalityName = ''
                } else {

                }

                const params = {

                  Propertyname: this.PropertyName,
                  Purpose: this.purpose,
                  // Price: this.Price,
                  Rent: this.MonthlyRent,
                  Deposit: this.Securitydeposit,
                  Maintanencecharge: this.Maintenancecharge,
                  Totalfloor: this.TotalFloor,
                  Propertyfloor: this.WhichFloor,
                  Doorfacing: this.DoorFacing,
                  City: this.CityName,
                  Locality: this.Locality,
                  // Region: this.Region,
                  PropertyType: this.PropertyType,
                  BuildingType: this.PropTypeArea,
                  Furnish: this.FurnishingStatus,
                  Ownership: this.whatYouAre,
                  // Status: this.PropertyStatus,
                  // PossesionDate: this.newpossesiondate1,
                  PropertyAgeYear: this.PropertyAge,
                  PropertyAgeMonth: this.PropertyAgeMonth,
                  BrokerageCharge: this.BrokerageValue,
                  Address: this.Address,
                  Zipcode: this.Postalcode,
                  BHK: this.BHKDetails,
                  Bathroom: this.BathroomsDeatils,
                  Balcony: this.Balconies,
                  Area: this.PropertyArea,
                  AreaType: this.AreaType,
                  Openparking: this.Openparking,
                  Coveredparking: this.Coveredparking,
                  // Khatatype: this.proptitle,
                  Watersupply: this.WaterSupply,
                  Amenities: this.finalAminitiesArray,
                  Facilities: this.finalnoOfFacilitiesArray,
                  // Approvals: this.ApprovalsArray,
                  Nearby: this.finalnoOfNearbyArray,
                  Nearbydetails: this.Nearbydetails,
                  PlotType: this.PlotType,
                  PlotSize: this.PlotSize,
                  PlotAge: this.PlotAge,
                  Parking: this.noOfParking,
                  Userid: this.UserId,
                  Description: this.ProjectDescription,
                  Availabledate: this.newAvailableFromdate,
                  Tenant: this.TenentType,
                  BuilderID: this.BuilderId,
                  newlocality: this.propertyAutoRentLocalityName,
                  Localityname: this.selectedLoc,
                  useremail: this.EmailId,
                  Username: this.UserName,
                  Browser: browser,
                  Device: '1'
                };
                // 
                this.Service.postrentlisting(params).subscribe(responce => {
                  // 
                  if (responce['status'] === 'True') {
                    this.submitionLoader = false;
                    this.PropertyID = responce['Data'];

                    const creditParam = {
                      userId: this.UserId,
                      number: this.UserNumber,
                      propertyId: this.PropertyID,
                      categoryId: 1,
                    }
                    this.eliteService.checkPostPropertyCredits(creditParam).subscribe(response => {
                      if (response['status'] == 'True') {
                        this.photoUploadRentals();

                        swal(
                          'Submited!',
                          'Your Property Added Successfully',
                          'success'
                        );
                      }
                    })
                  }
                });

              }
            })
          } else {


            this.submitionLoader = true;
            this.UserName = localStorage.getItem('userName');
            this.lastUsername = localStorage.getItem('lastName');
            this.UserId = localStorage.getItem('userID');
            this.UserEmail = localStorage.getItem('userEmail');
            this.UserNumber = localStorage.getItem('userNumber');

            let browserInfo = navigator.userAgent;
            let browser;

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



            // plot
            if (this.proptypeid === '50403') {
              this.PropertyAge = this.plotsFormGroup.value.PropertyAge;
              this.PlotType = this.plotsFormGroup.value.PlotsType;

              this.PropertyAgeMonth = '';
              this.PropertyAge = ''

            }
            // villas
            else if (this.proptypeid === '50402') {
              this.PropertyAge = this.firstFormGroup.value.PropertyAge;

              this.PlotAge = ''


            }
            // independent house
            else if (this.proptypeid === '50407') {
              this.PropertyAge = this.firstFormGroup.value.PropertyAge;

              this.PlotAge = ''


            }


            // apartment
            else if (this.proptypeid === '50401') {
              this.PropertyAge = this.firstFormGroup.value.PropertyAge;

              this.PlotAge = ''

            }

            if (this.Locality != undefined) {
              this.propertyAutoRentLocalityName = ''
            } else {

            }


            const params = {

              Propertyname: this.PropertyName,
              Purpose: this.purpose,

              // Price: this.Price,
              Rent: this.MonthlyRent,
              Deposit: this.Securitydeposit,
              Maintanencecharge: this.Maintenancecharge,
              Totalfloor: this.TotalFloor,
              Propertyfloor: this.WhichFloor,
              Doorfacing: this.DoorFacing,
              City: this.CityName,
              Locality: this.Locality,
              // Region: this.Region,
              PropertyType: this.PropertyType,
              BuildingType: this.PropTypeArea,
              Furnish: this.FurnishingStatus,
              Ownership: this.whatYouAre,
              // Status: this.PropertyStatus,
              // PossesionDate: this.newpossesiondate1,
              PropertyAgeYear: this.PropertyAge,
              PropertyAgeMonth: this.PropertyAgeMonth,
              BrokerageCharge: this.BrokerageValue,
              Address: this.Address,
              Zipcode: this.Postalcode,
              BHK: this.BHKDetails,
              Bathroom: this.BathroomsDeatils,
              Balcony: this.Balconies,
              Area: this.PropertyArea,
              AreaType: this.AreaType,
              Openparking: this.Openparking,
              Coveredparking: this.Coveredparking,
              // Khatatype: this.proptitle,
              Watersupply: this.WaterSupply,
              Amenities: this.finalAminitiesArray,
              Facilities: this.finalnoOfFacilitiesArray,
              // Approvals: this.ApprovalsArray,
              Nearby: this.finalnoOfNearbyArray,
              Nearbydetails: this.Nearbydetails,
              PlotType: this.PlotType,
              PlotSize: this.PlotSize,
              PlotAge: this.PlotAge,
              Parking: this.noOfParking,
              Userid: this.UserId,
              Description: this.ProjectDescription,
              Availabledate: this.newAvailableFromdate,
              Tenant: this.TenentType,
              BuilderID: this.BuilderId,
              newlocality: this.propertyAutoRentLocalityName,
              Localityname: this.selectedLoc,
              useremail: this.EmailId,
              Username: this.UserName,
              Browser: browser,
              Device: '1'
            };
            // 
            this.Service.postrentlisting(params).subscribe(responce => {
              // 
              if (responce['status'] === 'True') {
                this.submitionLoader = false;
                this.PropertyID = responce['Data'];

                const creditParam = {
                  userId: this.UserId,
                  number: this.UserNumber,
                  propertyId: this.PropertyID,
                  categoryId: 1,
                }

                this.eliteService.checkPostPropertyCredits(creditParam).subscribe(response => {
                  if (response['status'] == 'True') {
                    this.photoUploadRentals();
                    swal(
                      'Submited!',
                      'Your Property Added Successfully',
                      'success'
                    );
                  }
                })
              }
            });



          }

        } else {
          $('#propertyLimitTrigger').click()
        }
      })

    }
  }


  photoUploadRentals() {
    const formData = new FormData();
    formData.append('cover', this.secondFormGroup5.get('cover').value);
    formData.append('PropID', this.PropertyID);
    for (var i = 0; i < this.galleryimages.length; i++) {
      formData.append('file[]', this.galleryimages[i]);
    }
    this.Service.RentuploadFile(formData).subscribe((res) => {
      this.uploadResponse = res;
      if (res['status'] === 'True') {
        this.router.navigate(['/userauth/sellingprojects/' + this.UserId]);
      }
    }, (err) => {
    });
  }

  getlocationlist() {
    // this.Service.getindividualcity().subscribe(city => {
    //   this.citiess = city['citys'];
    //   this.selectedLocation = this.citiess[0]['city'];
    // });

    this.Service.getlocationlist().subscribe(city => {
      this.citiess = city['locations'];
      this.selectedLocation = this.citiess[0]['city'];
    });
  }


  isSelected = false;
  selectionChange(event) {
    this.isSelected = true;
    const cityName = event.value;
    const cityName1 = cityName.toLowerCase();
    var value = this.cityservice.cityfinder(cityName1);
    this.locationSelectedId = value.cityid;
    localStorage.setItem('CityName', cityName1);
    this.cityNameReviewValue = cityName;
    localStorage.setItem('CityID', this.locationSelectedId);
    this.onChangeRegion();
    this.getPropNameAutoCompleate(this.locationSelectedId, this.proptypeid);
    this.getApprovals(this.locationSelectedId);
    this.propertyAutoLocalityName = '';
    this.filteredData2 = [];
  }


  getPropNameAutoCompleate(cityId, propTypeId) {
    this.Service.getpropertyonCity(cityId, this.proptypeid).subscribe(properties => {
      this.apioptions(properties['autolist']);
    });
  }

  getPropNameAutoCompleateRent(cityId, propTypeId) {
    this.Service.getrentpropertyonCity(cityId, this.proptypeid).subscribe(properties => {
      this.apioptions(properties['autolist']);
    });
  }

  apioptions(apivalue) {
    this.options = apivalue;
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => value.length >= 1 ? this._filter(value) : [])
    );
  }

  private _filter(value: string) {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  onChangeRegion() {
    const regionid = '';
    var params = {
      cityId: this.locationSelectedId,
      regionid: ''
    };
    this.Service.getlocality(params).subscribe(localitys => {
      this.localitys = localitys['details'];

      if (this.localitys == undefined) {
        this.isButtonDisabled = true;
      } else {
        this.isButtonDisabled = false;
      }
      this.autoCompleteData = localitys['details'];

      this.apioptionsSellLocality(localitys['details']);
    });
  }

  apioptionsSellLocality(apivalue) {
    this.optionsSellLocality = apivalue;
    this.filteredOptionsSellLocality = this.myControlSellLocality.valueChanges.pipe(
      startWith(''),
      map(value => value.length >= 1 ? this._filterSellLocality(value) : [])
    );
  }

  private _filterSellLocality(value: string) {
    const filterValue = value.toLowerCase();
    return this.optionsSellLocality.filter(option => option.locality_name.toLowerCase().includes(filterValue));
  }

  getlocationRentlist() {
    // this.Service.getRentcity().subscribe(city => {
    //   this.citiess = city['citys'];
    //   this.selectedLocation = this.citiess[0]['city'];
    // });

    this.Service.getlocationlist().subscribe(city => {
      this.citiess = city['locations'];
      this.selectedLocation = this.citiess[0]['city'];
    });
  }

  selectionChangeRent(event) {
    const cityName = event.value;
    const cityName1 = cityName.toLowerCase();
    var value = this.cityservice.cityfinder(cityName1);
    this.locationSelectedId = value.cityid;
    localStorage.setItem('CityName', cityName1);
    this.cityNameReviewValue = cityName;
    localStorage.setItem('CityID', this.locationSelectedId);
    this.getclickAutoRent(this.locationSelectedId);
    this.onChangeRegionRent();
    this.getPropNameAutoCompleateRent(this.locationSelectedId, this.proptypeid);
    this.propertyAutoLocalityName = '';
    this.filteredData1 = [];
  }

  getclickAutoRent(cityId) {
    this.Service.getRentRegionList(cityId).subscribe(localitys => {
      this.regionList = localitys['Zones'];
      this.propertyAutoRentLocalityName = '';
    });
  }

  onChangeRegionRent() {
    // 
    const regionid = '';
    var params = {
      cityId: this.locationSelectedId,
      regionid: ''
    };
    this.Service.getlocality(params).subscribe(localitys => {
      this.localitys = localitys['details'];
      if (this.localitys == undefined) {
        this.isButtonDisabled = true;
      } else {
        this.isButtonDisabled = false;
      }
      this.apioptionsRentLocality(localitys['details']);
    });
  }

  apioptionsRentLocality(apivalue) {
    this.optionsRentLocality = apivalue;
    this.filteredOptionsRentLocality = this.myControlRentLocality.valueChanges.pipe(
      startWith(''),
      map(value => value.length >= 1 ? this._filterRentLocality(value) : [])
    );
  }

  private _filterRentLocality(value: string) {
    const filterValue = value.toLowerCase();
    return this.optionsRentLocality.filter(option => option.locality_name.toLowerCase().includes(filterValue));
  }
  allSelectionsMade() {
    // Check if the first page selections are made
    return this.BedroomReviewValue !== undefined &&
      this.BathroomReviewValue !== undefined &&
      this.BalconyReviewValue !== undefined &&
      this.DoorFacingReviewValue !== undefined &&
      this.FurnishingStatusReviewValue !== undefined &&
      this.PropertyArea !== '' && this.PropertyArea !== null;
  }

  modalSelectionsMade() {
    // Check if the modal selections are made
    return this.ParkingReviewValue !== undefined &&
      this.Coveredparking !== undefined &&
      this.Openparking !== undefined;
  }

  handleNextButtonClick(): void {
    this.PropertyArea = this.OtherPropTypeFormGroup.value.PropertyArea;
    this.otherPropTypeSubmited = true;
    if (this.amenitiesclose == 'true') {
      this.openModal();
    } else {
      if (this.allSelectionsMade() && !this.modalSelectionsMade()) {
        this.openModal();
      } else if (this.modalSelectionsMade() && this.allSelectionsMade()) {
        this.stepper.next();
      }
    }

  }
  openModal(): void {
    ($('#exampleModal') as any).modal('show');
  }
  // onReadyToMoveInClick() {
  //   this.onReadyToMoveInSelect = !this.onReadyToMoveInSelect;
  //   if (this.onReadyToMoveInSelect) {
  //     this.onReadyToMoveInSelect = true;
  //     this.UnderConstructionSelect = false;
  //     this.statusReview = 'Ready to move in';
  //   } else if (this.onReadyToMoveInSelect === false) {
  //     this.onReadyToMoveInSelect = false;
  //     // this.statusReview = '';
  //   }
  // }

  // onUnderConstructionClick() {
  //   this.UnderConstructionSelect = !this.UnderConstructionSelect;
  //   if (this.UnderConstructionSelect) {
  //     this.UnderConstructionSelect = true;
  //     this.onReadyToMoveInSelect = false;
  //     this.statusReview = 'Under construction';
  //   } else if (this.UnderConstructionSelect === false) {
  //     this.UnderConstructionSelect = false;
  //     // this.statusReview = '';
  //   }
  // }
  // isUnderConstructionSubmitted = false;
  onReadyToMoveInClick(data) {
    if (data === '138564') {

      // 
      this.statusReview = 'Ready to move in';
      this.newpossesiondate1 = ''


      this.onReadyToMoveInSelect = true;
      this.UnderConstructionSelect = false;
      this.firstFormGroup.get('PropertyAge').setValidators([Validators.required, Validators.pattern('^[0-9]+$')]);
      this.firstFormGroup.get('PropertyPossession').setValidators(null);
      this.firstFormGroup.get('PropertyPossession').setValue(null);
      this.firstFormGroup.get('PropertyAgeMonths').setValue('1');
    }




  }

  onUnderConstructionClick(data) {
    if (data === '138565') {
      this.statusReview = 'Under construction';
    }
    this.onReadyToMoveInSelect = false;
    this.UnderConstructionSelect = true;
    // this.isUnderConstructionSubmitted = true;
    this.firstFormGroup.get('PropertyPossession').setValidators(Validators.required);
    this.firstFormGroup.get('PropertyAge').setValidators(null);
    this.firstFormGroup.get('PropertyAge').setValue(null);
    this.firstFormGroup.get('PropertyAgeMonths').setValue(null);
    this.firstFormGroup.get('PropertyAgeMonths').setValidators(null);
    this.PropertyAgeMonth = '';
    this.PropertyAge = '';


  }



  onOwnerClick() {
    this.OwnerSelect = true;
    this.BrokerSelect = false;
    this.YouAreAReviewValue = 'Owner';
  }

  onBrokerClick() {
    this.BrokerSelect = true;
    this.OwnerSelect = false;
    this.YouAreAReviewValue = 'Broker';
  }

  onYesClick() {


    this.yesSelect = true;
    this.noSelect = false;

    // this.secondFormGroup.get('BrokerageSelect').setValue(null);


    if (this.BrokerSelect && this.SellSelect && !this.plotsFormView) {
      this.secondFormGroup.get('BrokerageValue').setValidators([Validators.required, Validators.pattern('^[0-9]+$')]);
      // this.OtherPropTypeFormGroup.get('PropertyPossession').setValidators(null);
    } else if (this.BrokerSelect && this.SellSelect && this.plotsFormView) {
      this.secondFormGroup1.get('BrokerageValue1').setValidators([Validators.required, Validators.pattern('^[0-9]+$')]);

    } else if (this.BrokerSelect && this.RentSelect && !this.plotsFormView) {
      this.secondFormGroup4.get('BrokerageValue2').setValidators([Validators.required, Validators.pattern('^[0-9]+$')]);

    } else if (this.BrokerSelect && this.RentSelect && this.plotsFormView) {
      this.secondFormGroup8.get('BrokerageValue3').setValidators([Validators.required, Validators.pattern('^[0-9]+$')]);
    }

    // if (this.yesSelect) {
    //   this.yesSelect = true;
    //   this.noSelect = false;
    // } else if (this.yesSelect === false) {
    //   this.yesSelect = false;
    // }
  }

  onNoClick() {

    this.noSelect = true;
    this.yesSelect = false;

    this.secondFormGroup.get('BrokerageValue')?.clearValidators();
    this.secondFormGroup.get('BrokerageValue').setValue(null);

    this.secondFormGroup1.get('BrokerageValue1')?.clearValidators();
    this.secondFormGroup1.get('BrokerageValue1').setValue(null);

    this.secondFormGroup4.get('BrokerageValue2')?.clearValidators();
    this.secondFormGroup4.get('BrokerageValue2').setValue(null);

    this.secondFormGroup8.get('BrokerageValue3')?.clearValidators();
    this.secondFormGroup8.get('BrokerageValue3').setValue(null);


    this.secondFormGroup.get('BrokerageValue')?.updateValueAndValidity();
    this.secondFormGroup1.get('BrokerageValue1')?.updateValueAndValidity();
    this.secondFormGroup4.get('BrokerageValue2')?.updateValueAndValidity();
    this.secondFormGroup8.get('BrokerageValue3')?.updateValueAndValidity();




    // if (this.noSelect) {
    //   this.noSelect = true;
    //   this.yesSelect = false;
    // } else if (this.noSelect === false) {
    //   this.noSelect = false;
    // }
  }



  onSellClick() {
    this.SellSelect = true;
    this.RentSelect = false;
    this.Property_status = true;
    // this.onReadyToMoveInSelect = true;
    this.WouldYouLikeToReviewValue = 'Sell';
    // this.getIndividualDataFiltersList();
    if (this.locationSelectedId !== '') {
      // this.getclickAuto(this.locationSelectedId);
    }
    if (this.PropTypeNameReviewValue == 'Plot') {
      this.Property_status = false
    }
    this.propertyAutoRentLocalityName = '';
    this.firstFormGroup.get('PropertyStatus').setValidators(Validators.required);
    // this.firstFormGroup.get('PropertyStatus').setValue(null);

    this.noSelect = true;
    this.yesSelect = false;

    this.secondFormGroup.get('BrokerageValue')?.clearValidators();
    this.secondFormGroup.get('BrokerageValue').setValue(null);

    this.secondFormGroup1.get('BrokerageValue1')?.clearValidators();
    this.secondFormGroup1.get('BrokerageValue1').setValue(null);

    this.secondFormGroup4.get('BrokerageValue2')?.clearValidators();
    this.secondFormGroup4.get('BrokerageValue2').setValue(null);

    this.secondFormGroup8.get('BrokerageValue3')?.clearValidators();
    this.secondFormGroup8.get('BrokerageValue3').setValue(null);

  }

  getIndividualDataFiltersList() {
    this.Service.getindividualfilterslist().subscribe(reponce => {
      this.BHKs = reponce['Bhks'];
      this.Bathrooms = reponce['Bathroom'];
      this.Balconys = reponce['Balcony'];
      this.Tenants = reponce['Tenants'];
      this.FurnishLists = reponce['Furnish'];

      this.AmenitiesLists = reponce['Amenities'];
      this.DoorfaceLists = reponce['Doorface'];
      this.OwnershipLists = reponce['Ownership'];
      this.PropertytypeLists = reponce['Propertytype'];
      this.FacilitiesLists = reponce['Facilities'];
      this.NearbyLists = reponce['Nearby'];
      this.ParkingLists = reponce['Parking'];
      this.PlotTypeLists = reponce['PlotType'];
      this.PlotSizeLists = reponce['PlotSize'];
      // 
    });
  }

  getApprovals(cityId) {
    this.Service.getApprovalsData(cityId).subscribe(responce => {
      // 
      this.ApprovalsLists = responce['Approvals'];
    });
  }


  onRentClick() {


    // this.plotsFormView = false;
    this.RentSelect = true;
    this.SellSelect = false;
    this.Purpose_Identify = 'Monthly Rent';

    this.WouldYouLikeToReviewValue = 'Rent';
    this.ReadyTomoveActive = '138564';
    this.getlocationRentlist();
    this.getbhkList();
    if (this.locationSelectedId !== '') {
      this.onChangeRegionRent();
    }
    this.propertyAutoLocalityName = ''
    this.statusReview = '';
    this.PossessionDate = '';
    if (this.PropTypeNameReviewValue == 'Plot') {
    } else {
      this.onReadyToMoveInSelect = true;
    }

    // this.firstFormGroup.get('PropertyStatus').setValue(null);
    // this.firstFormGroup.get('PropertyStatus').setValidators(null);
    // this.firstFormGroup.get('PropertyPossession').setValue(null);
    this.firstFormGroup.get('PropertyStatus').setValidators(null);
    this.firstFormGroup.get('PropertyStatus').setValue("");
    this.firstFormGroup.get('PropertyStatus').setErrors(null);
    this.firstFormGroup.get('PropertyAgeMonths').setValue('1');



    this.noSelect = true;
    this.yesSelect = false;

    this.secondFormGroup.get('BrokerageValue')?.clearValidators();
    this.secondFormGroup.get('BrokerageValue').setValue(null);

    this.secondFormGroup1.get('BrokerageValue1')?.clearValidators();
    this.secondFormGroup1.get('BrokerageValue1').setValue(null);

    this.secondFormGroup4.get('BrokerageValue2')?.clearValidators();
    this.secondFormGroup4.get('BrokerageValue2').setValue(null);

    this.secondFormGroup8.get('BrokerageValue3')?.clearValidators();
    this.secondFormGroup8.get('BrokerageValue3').setValue(null);


    // this.firstFormGroup.get('PropertyAge').setValidators([Validators.required, Validators.pattern('^[0-9]+$')]);
    // this.firstFormGroup.get('PropertyType').setValidators(null);

  }

  onLeaseClick() {


    // this.plotsFormView = false;
    this.RentSelect = true;
    this.SellSelect = false;
    this.Purpose_Identify = 'Lease Amount';

    this.WouldYouLikeToReviewValue = 'Lease';
    this.ReadyTomoveActive = '138564';
    this.getlocationRentlist();
    this.getbhkList();
    if (this.locationSelectedId !== '') {
      this.onChangeRegionRent();
    }
    this.propertyAutoLocalityName = ''
    this.statusReview = '';
    this.PossessionDate = '';
    if (this.PropTypeNameReviewValue == 'Plot') {
    } else {
      this.onReadyToMoveInSelect = true;
    }

    // this.firstFormGroup.get('PropertyStatus').setValue(null);
    // this.firstFormGroup.get('PropertyStatus').setValidators(null);
    // this.firstFormGroup.get('PropertyPossession').setValue(null);
    this.firstFormGroup.get('PropertyStatus').setValidators(null);
    this.firstFormGroup.get('PropertyStatus').setValue("");
    this.firstFormGroup.get('PropertyStatus').setErrors(null);
    this.firstFormGroup.get('PropertyAgeMonths').setValue('1');



    this.noSelect = true;
    this.yesSelect = false;

    this.secondFormGroup.get('BrokerageValue')?.clearValidators();
    this.secondFormGroup.get('BrokerageValue').setValue(null);

    this.secondFormGroup1.get('BrokerageValue1')?.clearValidators();
    this.secondFormGroup1.get('BrokerageValue1').setValue(null);

    this.secondFormGroup4.get('BrokerageValue2')?.clearValidators();
    this.secondFormGroup4.get('BrokerageValue2').setValue(null);

    this.secondFormGroup8.get('BrokerageValue3')?.clearValidators();
    this.secondFormGroup8.get('BrokerageValue3').setValue(null);


    // this.firstFormGroup.get('PropertyAge').setValidators([Validators.required, Validators.pattern('^[0-9]+$')]);
    // this.firstFormGroup.get('PropertyType').setValidators(null);

  }

  getbhkList() {
    this.Service.getrentfilterslist().subscribe(reponce => {
      this.BHKs = reponce['Bhks'];
      this.Bathrooms = reponce['Bathroom'];
      this.Balconys = reponce['Balcony'];
      this.Tenants = reponce['Tenants'];
      this.FurnishLists = reponce['Furnish'];
      this.ApprovalsLists = reponce['Approvals'];
      // this.AmenitiesLists = reponce['Amenities'];
      this.DoorfaceLists = reponce['Doorface'];
      this.OwnershipLists = reponce['Ownership'];
      this.PropertytypeLists = reponce['Propertytype'];
      // this.FacilitiesLists = reponce['Facilities'];
      this.NearbyLists = reponce['Nearby'];
      // this.ParkingLists = reponce['Parking'];
      // 
    });
  }

  submit() {
    // 
    // 
  }

  gallerySectionDetails = false;

  removeImage(i) {
    // this. UploadGalleryImages=true;
    // this.UploadGalleryFile=false;


    this.urls.splice(i, 1);
    this.galleryimages.splice(i, 1)
    this.imageFormat = true;
    if (this.urls.length == 0) {
      this.UploadGalleryImages = true;
      this.UploadGalleryFile = false;
    }

    if (this.urls.length > 0) {
      this.gallerySectionDetails = true;

    }
    else {
      this.gallerySectionDetails = false;

    }


  }

  removeCoverImage(i) {

    // this.imageFormat = true;


    // this.coverImages = false;
    // this.coverUploadFile = true;
    // this.CoverImage.splice(i, 1);

    // this.secondFormGroup5.get('cover').setValue('');
    // this.coverAlert = true;
    this.imageFormat = true;

    this.coverImages = false;
    this.coverUploadFile = true;
    this.CoverImage.splice(i, 1);

    // Clear the cover image field to make the form invalid
    this.secondFormGroup5.get('coverImage').setValue('');
    this.secondFormGroup5.get('coverImage').markAsTouched();
    this.secondFormGroup5.get('coverImage').updateValueAndValidity();

    this.coverAlert = true;

  }

  masterPlanImageImage(i) {
    this.MasterPlanImage.splice(i, 1)

    this.masterUploadFile = false;
    this.masterCoverImages = true;
    // this.imageFormat = true;

    this.MasterPlanImage.splice(i, 1);
    this.secondFormGroup5.get('master').setValue('');

    this.secondFormGroup5.get('master').setValue(null);

  }

  FloorPlanImageImage(i) {

    this.FloorPlanImage.splice(i, 1)

    // this.imageFormat = true;
    this.UploadFloorImages = true;
    this.UploadFloorFile = false;
    this.FloorPlanImage.splice(i, 1);
    this.secondFormGroup5.get('floorplan').setValue('');
    this.secondFormGroup5.get('floorplan').setValue(null);
  }

  onmasterPlanSelectFile(event) {
    if (event.target.files[0].size > 2000000) {
      swal({
        icon: 'error',
        title: 'Image Size is too big.',
        text: 'Image Size should be less than 2 mb.',
        showConfirmButton: true,
      });
      this.fileInput.nativeElement.value = '';
      event.target.value = '';

    } else {
      if (event.target.files && event.target.files[0]) {

        this.masterCoverImages = false;
        this.masterUploadFile = true;



        const allowedFormats = ['.png', '.jpg', '.jpeg', '.avif', '.webp'];
        const fileNameParts = event.target.files[0].name.split('.');
        const fileExtension = fileNameParts[fileNameParts.length - 1].toLowerCase();
        if (!allowedFormats.includes('.' + fileExtension)) {
          this.fileFormatError1 = true;
          // Clear the file input to allow the user to select another file
          this.MasterPlanImage = [];
          this.secondFormGroup5.get('master').setValue('');
        } else {
          this.fileFormatError1 = false;
          var reader = new FileReader();
          reader.onload = (event: any) => {
            this.MasterPlanImage = [];
            this.MasterPlanImage.push(event.target.result);

            if (this.MasterPlanImage.length < 0) {
              // this.imageFormat = true;

            } else {
              this.imageFormat = false;
            }




          };
          reader.readAsDataURL(event.target.files[0]);
        }

      }
      if (event.target.files.length > 0) {
        const file = event.target.files[0];
        this.secondFormGroup5.get('master').setValue(file);
      }
    }
  }


  onFloorPlanSelectFile(event) {
    if (event.target.files[0].size > 2000000) {
      swal({
        icon: 'error',
        title: 'Image Size is too big.',
        text: 'Image Size should be less than 2 mb.',
        showConfirmButton: true,
      });
      this.fileInput.nativeElement.value = '';
      event.target.value = '';

    } else {
      if (event.target.files && event.target.files[0]) {
        this.UploadFloorImages = false;
        this.UploadFloorFile = true;



        const allowedFormats = ['.png', '.jpg', '.jpeg', '.avif', '.webp'];
        const fileNameParts = event.target.files[0].name.split('.');
        const fileExtension = fileNameParts[fileNameParts.length - 1].toLowerCase();
        if (!allowedFormats.includes('.' + fileExtension)) {
          this.fileFormatError2 = true;
          // Clear the file input to allow the user to select another file
          this.FloorPlanImage = [];
          this.secondFormGroup5.get('floorplan').setValue('');
        } else {
          this.fileFormatError2 = false;
          var reader = new FileReader();
          reader.onload = (event: any) => {
            this.FloorPlanImage = [];
            this.FloorPlanImage.push(event.target.result);



            if (this.FloorPlanImage.length < 0) {
              // this.imageFormat = true;

            } else {
              this.imageFormat = false;
            }

          };
          reader.readAsDataURL(event.target.files[0]);


        }
      }
      if (event.target.files.length > 0) {
        const file = event.target.files[0];
        this.secondFormGroup5.get('floorplan').setValue(file);
        // 
      }
    }
  }



  onCoverSelectFile(event) {

    if (event.target.files[0].size > 2000000) {
      swal({
        icon: 'error',
        title: 'Image Size is too big.',
        text: 'Image Size should be less than 2 mb.',
        showConfirmButton: true,
      });
      this.fileInput.nativeElement.value = '';
      event.target.value = ''
      this.secondFormGroup5.get('coverImage').setValue('');
      this.secondFormGroup5.get('coverImage').markAsTouched();
      this.secondFormGroup5.get('coverImage').updateValueAndValidity();




    } else {
      if (event.target.files && event.target.files[0]) {

        this.coverImages = true;
        this.coverUploadFile = false;
        const allowedFormats = ['.png', '.jpg', '.jpeg', '.avif', '.webp'];
        const fileNameParts = event.target.files[0].name.split('.');
        const fileExtension = fileNameParts[fileNameParts.length - 1].toLowerCase();
        if (!allowedFormats.includes('.' + fileExtension)) {
          this.fileFormatError = true;
          this.CoverImage = [];
          this.secondFormGroup5.get('cover').setValue('');
        } else {
          this.fileFormatError = false;
          var reader = new FileReader();
          reader.onload = (event: any) => {
            this.CoverImage = [];
            this.CoverImage.push(event.target.result);
            if (this.CoverImage.length < 0) {
              this.imageFormat = true;
            } else {
              this.imageFormat = false;
              this.coverAlert = false;

            }




          };
          reader.readAsDataURL(event.target.files[0]);





        }



      }
      if (event.target.files.length > 0) {
        const file = event.target.files[0];
        this.secondFormGroup5.get('cover').setValue(file);
      }



    }
  }


  onSelectFile(event) {

    // this.UploadGalleryImages = false;
    this.UploadGalleryFile = true;

    const maxFileSize = 2000000; // 2 MB
    const allowedFormats = ['.png', '.jpg', '.jpeg', '.avif', '.webp'];

    for (let i = 0; i < event.target.files.length; i++) {
      const file = event.target.files[i];
      const fileSize = file.size;
      const fileNameParts = file.name.split('.');
      const fileExtension = fileNameParts[fileNameParts.length - 1].toLowerCase();

      if (fileSize > maxFileSize) {
        swal({
          icon: 'error',
          title: 'Image Size is too big.',
          text: 'Image Size should be less than 2 MB.',
          showConfirmButton: true,
        });
        // Clear the file input to allow the user to select another file
        this.fileInput.nativeElement.value = '';
        event.target.value = '';

      } else if (!allowedFormats.includes('.' + fileExtension)) {
        this.fileFormatError3 = true;
        // Clear the file input to allow the user to select another file
        this.galleryimages = [];
        if (this.galleryimages.length < 0) {
          this.imageFormat = true;
        }
        else {
          this.imageFormat = false;
        }
      } else {
        this.galleryimages.push(file);
        var reader = new FileReader();
        reader.onload = (event: any) => {
          this.urls.push(event.target.result);


          // 
          if (this.urls.length < 0) {
            this.gallerySectionDetails = false;
          }
          else {
            this.gallerySectionDetails = true;
          }
        };
        reader.readAsDataURL(file);
      }
    }
  }
  onSelectFile2(event, i) {
    if (event.target.files[0].size > 2000000) {
      swal({
        icon: 'error',
        title: 'Image Size is too big.',
        text: 'Image Size should be less than 2 mb.',
        showConfirmButton: true,

      });
      this.fileInput.nativeElement.value = '';
      event.target.value = '';

    } else {
      if (event.target.files && event.target.files[0]) {
        var filesAmount = event.target.files.length;
        for (let j = 0; j < filesAmount; j++) {
          var reader = new FileReader();

          reader.onload = (event: any) => {
            if (i > -1) {
              this.urls.splice(i, 1, event.target.result);
            } else {
              this.urls.push(event.target.result);
            }
          };
          reader.readAsDataURL(event.target.files[j]);
        }
      }
    }
  }






  // onLocalitySelect(eve) {
  //   this.localityArray.push(eve.Name);
  //   this.Locality = this.localityArray[0];
  //   this.LocalityReviewName = eve.Name;
  // }

  onLocalityDeSelect(event) {
    var index = this.localityArray.indexOf(event);
    this.localityArray.splice(index, 1);
  }
  selectedParking: string;

  toggleSelection1(chip: MatChip, option) {
    if (!chip.selected) {
      chip.toggleSelected();
      // Add any additional logic if needed, such as pushing to an array
    }
    if (chip.selected) {
      this.otherPropType.Parking.setValue(option.id);
    } else {
      this.otherPropType.Parking.setValue(null);
    }
    this.otherPropType.Parking.markAsTouched();
  }

  toggleSelection2(chip: MatChip, option) {
    if (!chip.selected) {
      chip.toggleSelected();
      // Add any additional logic if needed, such as pushing to an array
    }
    if (chip.selected) {
      this.otherPropType.Coveredparking.setValue(option.label);
    } else {
      this.otherPropType.Coveredparking.setValue(null);
    }
    this.otherPropType.Coveredparking.markAsTouched();
  }

  toggleSelection3(chip: MatChip, option) {
    if (!chip.selected) {
      chip.toggleSelected();
      // Add any additional logic if needed, such as pushing to an array
    }
    if (chip.selected) {
      this.otherPropType.Openparking.setValue(option.label);
    } else {
      this.otherPropType.Openparking.setValue(null);
    }
    this.otherPropType.Openparking.markAsTouched();
  }

  toggleSelection(chip: MatChip, option) {
    chip.toggleSelected();
  }



  changeSelectedAmenities($event: MatChipSelectionChange, option) {
    // 
    if ($event.selected === true) {
      this.noOfAminities.push(option.id);
      this.noOfAminitiesReviewValue.push(option.amenities);
    } else if ($event.selected === false) {
      for (var i = 0; i < this.noOfAminities.length; i++) {
        if (this.noOfAminities[i] === option.id) {
          this.noOfAminities.splice(i, 1);
          this.noOfAminitiesReviewValue.splice(i, 1);
        }
      }
    }
    // 
    this.finalAminitiesArray = this.noOfAminities.filter((c, index) => {
      return this.noOfAminities.indexOf(c) === index;
    });
  }



  changeSelectedFacilities($event: MatChipSelectionChange, option) {
    // 
    if ($event.selected === true) {
      this.noOfFacilities.push(option.id);
      this.noOfFacilitiesReviewValue.push(option.facilities);
    } else if ($event.selected === false) {
      for (var i = 0; i < this.noOfFacilities.length; i++) {
        if (this.noOfFacilities[i] === option.id) {
          this.noOfFacilities.splice(i, 1);
          this.noOfFacilitiesReviewValue.splice(i, 1);
        }
      }
    }
    this.finalnoOfFacilitiesArray = this.noOfFacilities.filter((c, index) => {
      return this.noOfFacilities.indexOf(c) === index;
    });
  }



  // changeSelectedApprovals($event: MatChipSelectionChange, option) {
  //   // 
  //   this.AAuthority = option.approvals;
  //   if ($event.selected === true) {
  //     this.ApprovalsArray.push(option.id);
  //     this.ApprovalsArrayReviewValue.push(option.approvals);
  //   } else if ($event.selected === false) {
  //     for (var i = 0; i < this.ApprovalsArray.length; i++) {
  //       if (this.ApprovalsArray[i] === option.id) {
  //         this.ApprovalsArray.splice(i, 1);
  //         this.ApprovalsArrayReviewValue.splice(i, 1);
  //       }
  //     }
  //   }
  //   this.finalApprovalsArray = this.ApprovalsArray.filter((c, index) => {
  //     return this.ApprovalsArray.indexOf(c) === index;
  //   });
  // }



  // changeSelectedNearby($event: MatChipSelectionChange, option) {
  //   if ($event.selected === true) {
  //     this.nearByTest = option.id;
  //     this.noOfNearby.push(option.id);
  //     this.noOfNearbyReviewValue.push(option.nearby);
  //   } else if ($event.selected === false) {
  //     if (this.noOfNearby.length <= 1) {
  //       this.nearByTest = '';
  //     }
  //     for (var i = 0; i < this.noOfNearby.length; i++) {
  //       if (this.noOfNearby[i] === option.id) {
  //         this.noOfNearby.splice(i, 1);
  //         this.noOfNearbyReviewValue.splice(i, 1);
  //       }
  //     }
  //   }
  //   this.finalnoOfNearbyArray = this.noOfNearby.filter((c, index) => {
  //     return this.noOfNearby.indexOf(c) === index;
  //   });
  // }





  AmenitiesTrueClick() {
    if (this.AmenitiesTrue === false) {
      this.AmenitiesTrue = true;
    }
  }

  CoveredTrueClick() {
    if (this.CoveredParkingTrue === false) {
      this.CoveredParkingTrue = true;
    }
  }

  OpenParkingTrueClick() {
    if (this.OpenParkingTrue === false) {
      this.OpenParkingTrue = true;
    }
  }

  onOtherClick() {
    if (this.OnClickOther === false) {
      this.OnClickOther = true;
    }
  }

  onOtherNearByClick() {
    if (this.OnClickOtherNearBy === false) {
      this.OnClickOtherNearBy = true;
    }
  }



  onotherPropTypeClick(propName, propId) {
    this.PropTypeNameReviewValue = propName;

    if (propName === 'Plot') {
      this.proptypeid = '50403';
      this.plotsFormView = true;
      this.otherPropTypeFormView = false;
      this.onReadyToMoveInSelect = false;
      this.UnderConstructionSelect = false
      this.Property_status = false;
      this.firstFormGroup.get('PropertyPossession').setValidators(null);
      this.firstFormGroup.get('PropertyPossession').setValue("");
      this.firstFormGroup.get('PropertyPossession').setErrors(null);

      // this.firstFormGroup.get('PropertyAgeMonths').setValidators(null);
      // this.firstFormGroup.get('PropertyStatus').setValidators(null);
      // this.firstFormGroup.get('PropertyStatus').setValue(null);
      this.firstFormGroup.get('PropertyAge').setValidators(null);
      this.firstFormGroup.get('PropertyAge').setValue(null);

      this.firstFormGroup.get('PropertyStatus').setValidators(null);
      this.firstFormGroup.get('PropertyStatus').setValue("");
      this.firstFormGroup.get('PropertyStatus').setErrors(null);

      // params empty
      this.TotalFloor = '';
      this.WhichFloor = '';
      this.newpossesiondate1 = '';
      this.BHKDetails = '';
      this.BathroomsDeatils = '';
      this.Balconies = '';
      this.Openparking = '';
      this.Coveredparking = '';
      this.noOfParking = '';
      this.FurnishingStatus = '';
      this.PropertyAge = '';
      this.PropertyAgeMonth = '';
      this.finalAminitiesArray = [];
      this.finalnoOfFacilitiesArray = [];
      this.ParkingReviewValue = '';

      this.noOfFacilitiesReviewValue = [];
      this.noOfAminitiesReviewValue = [];
      this.toggleAmmentities = false;
      const openParkingRadios = document.querySelectorAll('input[type="radio"][name="OpenParking"]') as NodeListOf<HTMLInputElement>;
      const coveredParkingRadios = document.querySelectorAll('input[type="radio"][name="CoveredParking"]') as NodeListOf<HTMLInputElement>;
      const ParkingRadios = document.querySelectorAll('input[type="radio"][name="Parking"]') as NodeListOf<HTMLInputElement>;

      openParkingRadios.forEach(radio => {
        radio.checked = false;
      });

      coveredParkingRadios.forEach(radio => {
        radio.checked = false;
      });

      ParkingRadios.forEach(radio => {
        radio.checked = false;
      });
    } else {
      this.otherPropTypeFormView = true;
      this.plotsFormView = false;
      this.firstFormGroup.get('PropertyStatus').setValidators(Validators.required);
    }

    if (propName === 'Apartment') {
      this.proptypeid = '50401';
      this.PlotType = ''
      this.PlotSize = ''
      this.PlotAge = ''
      this.Property_status = true;

    }
    if (propName === 'Villa') {
      this.proptypeid = '50402';
      this.proptypeid = '50402';
      this.PlotType = ''
      this.PlotSize = ''
      this.PlotAge = ''
      this.Property_status = true;

    }
    if (propName === 'Independent House') {
      this.proptypeid = '50407';
      this.proptypeid = '50407';
      this.PlotType = ''
      this.PlotSize = ''
      this.PlotAge = ''
      this.Property_status = true;

    }

    this.noSelect = true;
    this.yesSelect = false;

    this.secondFormGroup.get('BrokerageValue')?.clearValidators();
    this.secondFormGroup.get('BrokerageValue').setValue(null);

    this.secondFormGroup1.get('BrokerageValue1')?.clearValidators();
    this.secondFormGroup1.get('BrokerageValue1').setValue(null);

    this.secondFormGroup4.get('BrokerageValue2')?.clearValidators();
    this.secondFormGroup4.get('BrokerageValue2').setValue(null);

    this.secondFormGroup8.get('BrokerageValue3')?.clearValidators();
    this.secondFormGroup8.get('BrokerageValue3').setValue(null);


  }
  readyToMove = true;

  test = true;
  onotherPropTypeClickRent(propName, propId) {
    this.PropTypeNameReviewValue = propName;
    //   this.firstFormGroup.get('PropertyStatus').setValidators(null);
    // this.firstFormGroup.get('PropertyStatus').setErrors(null)'
    this.Property_status = false;

    if (propName === 'Plot') {
      this.proptypeid = '50403';
      this.plotsFormView = true;
      this.plotsFormView = true;
      this.otherPropTypeFormView = false;
      this.onReadyToMoveInSelect = false;

      this.firstFormGroup.get('PropertyPossession').setValidators(null);
      this.firstFormGroup.get('PropertyPossession').setValue("");
      this.firstFormGroup.get('PropertyPossession').setErrors(null);
      // this.firstFormGroup.get('PropertyPossession').setValidators(null);
      // this.firstFormGroup.get('PropertyPossession').setValue("");
      // this.firstFormGroup.get('PropertyAgeMonths').setValidators(null);
      // this.firstFormGroup.get('PropertyStatus').setValidators(null);
      this.firstFormGroup.get('PropertyAge').setValidators(null);
      this.firstFormGroup.get('PropertyAge').setValue(null);

      this.firstFormGroup.get('PropertyStatus').setValidators(null);
      this.firstFormGroup.get('PropertyStatus').setValue("");
      this.firstFormGroup.get('PropertyStatus').setErrors(null);


      // params empty

      this.TotalFloor = '';
      this.WhichFloor = '';
      this.PossessionDate = '';
      this.BHKDetails = '';
      this.BathroomsDeatils = '';
      this.Balconies = '';
      this.Openparking = '';
      this.Coveredparking = '';
      this.noOfParking = '';
      this.FurnishingStatus = '';
      this.PropertyAge = '';
      this.PropertyAgeMonth = '';
      this.finalAminitiesArray = [];
      this.finalnoOfFacilitiesArray = [];
      this.newpossesiondate1 = '';
      this.ParkingReviewValue = '';
      this.noOfFacilitiesReviewValue = [];
      this.noOfAminitiesReviewValue = [];
      this.toggleAmmentities = false;


      const openParkingRadios = document.querySelectorAll('input[type="radio"][name="OpenParking"]') as NodeListOf<HTMLInputElement>;
      const coveredParkingRadios = document.querySelectorAll('input[type="radio"][name="CoveredParking"]') as NodeListOf<HTMLInputElement>;
      const ParkingRadios = document.querySelectorAll('input[type="radio"][name="Parking"]') as NodeListOf<HTMLInputElement>;

      openParkingRadios.forEach(radio => {
        radio.checked = false;
      });

      coveredParkingRadios.forEach(radio => {
        radio.checked = false;
      });

      ParkingRadios.forEach(radio => {
        radio.checked = false;
      });

    } else {
      this.otherPropTypeFormView = true;
      this.plotsFormView = false;
      this.firstFormGroup.get('PropertyAge').setValidators([Validators.required, Validators.pattern('^[0-9]+$')]);

      // this.firstFormGroup.get('PropertyStatus').setValidators(Validators.required);
    }

    if (propName === 'Apartment') {
      // this.test = false;
      this.proptypeid = '50401';
      // this.readyToMove = false;
      this.onReadyToMoveInSelect = true;
      this.UnderConstructionSelect = false;

      // this.firstFormGroup.get('PropertyStatus').setErrors(null)


      // params empty
      this.PlotType = ''
      this.PlotSize = ''
      this.PlotAge = ''

    }
    if (propName === 'Villa') {
      // this.firstFormGroup.get('PropertyStatus').setErrors(null)

      this.proptypeid = '50402';
      this.onReadyToMoveInSelect = true;

      this.UnderConstructionSelect = false;
      // params empty
      this.proptypeid = '50402';
      this.PlotType = ''
      this.PlotSize = ''
      this.PlotAge = ''


    }
    if (propName === 'Independent House') {
      // this.firstFormGroup.get('PropertyStatus').setErrors(null)
      this.UnderConstructionSelect = false;
      this.onReadyToMoveInSelect = true;

      this.proptypeid = '50407';
      // params empty
      this.proptypeid = '50407';
      this.PlotType = ''
      this.PlotSize = ''
      this.PlotAge = ''
    }
    this.noSelect = true;
    this.yesSelect = false;

    this.secondFormGroup.get('BrokerageValue')?.clearValidators();
    this.secondFormGroup.get('BrokerageValue').setValue(null);

    this.secondFormGroup1.get('BrokerageValue1')?.clearValidators();
    this.secondFormGroup1.get('BrokerageValue1').setValue(null);

    this.secondFormGroup4.get('BrokerageValue2')?.clearValidators();
    this.secondFormGroup4.get('BrokerageValue2').setValue(null);

    this.secondFormGroup8.get('BrokerageValue3')?.clearValidators();
    this.secondFormGroup8.get('BrokerageValue3').setValue(null);


  }

  onClickPlotsSizeOthers() {
    if (this.plotSixeOther === false) {
      this.plotSixeOther = true;
    }


    const radioButtons = document.getElementsByClassName('onPlotSize');
    // Loop through the collection of elements
    for (let i = 0; i < radioButtons.length; i++) {
      // Cast each element as an HTMLInputElement
      const radioButton = radioButtons[i] as HTMLInputElement;
      // Set the checked property to false for each element
      radioButton.checked = false;
    }
    // this.plotSizeReviewValue = this.otherPlotSize
  }

  NearbyclickRestaurant() {
    this.ShowAddressTextareaRestaurant = true;
  }



  onPlotTypeClick(plottype: any) {
    this.plotTypeReviewValue = plottype;
    if (plottype === 'Independent Plot') {
      this.ApprovalsViewTrue = false;
    } else {
      this.ApprovalsViewTrue = true;
    }
  }


  // nextArray = [];

  onBedroomClick(bhk: any) {
    this.BedroomReviewValue = bhk;
    // this.nextArray = bhk;
  }



  OnBathroomClick(bathroom: any) {

    this.BathroomReviewValue = bathroom;
    // this.nextArray = bathroom;

  }



  OnBalconiesClick(balcony: any) {

    this.BalconyReviewValue = balcony;
    // this.nextArray = balcony;

  }



  onFurnishingStatus(furnish: any) {

    this.FurnishingStatusReviewValue = furnish;
    // this.nextArray = furnish;


  }



  onDoorFacingClick(doorface: any) {

    this.DoorFacingReviewValue = doorface;
    // this.nextArray = doorface;

  }



  onPlotSizeClick(plotsize: any) {

    this.plotSizeReviewValue = plotsize;
    const radioButton = document.getElementById('other2') as HTMLInputElement;
    radioButton.checked = false;
    this.plotSixeOther = false;
    // this.nextArray = plotsize;

  }








  onTenentType(tenants) {

    this.TenentTypeReviewValue = tenants;
  }



  getUserById() {
    this.UserId = localStorage.getItem('userID');
    if (this.UserId === null || this.UserId === undefined || this.UserId === '') {

    } else {
      this.Service.getUserDetailsById(this.UserId).subscribe(response => {
        this.userDetails = response['UserDetails'];
        this.UserName = this.userDetails[0]['user_name'];
        this.userEmail = this.userDetails[0]['user_email'];
        this.email = this.userDetails[0]['user_email'];
        this.userNumber = this.userDetails[0]['number'];
        this.lastUsername = this.userDetails[0]['last_name'];
        this.imageUrls = this.userDetails[0]['user_profile']
        // this.forgetPassEmail = this.email;
      });
    }

  }


  onBuildingType(data) {
    if (data === 'Residential') {


      this.PropTypeAreaReview = 'Residential';

    } else {
      this.PropTypeAreaReview = 'Commercial';
    }
  }










  otpvalidate() {

    var otplength = 4;
    if ($('#otp').val() == '') {
      swal({
        title: 'Please enter the OTP!',
        type: 'error',
        showConfirmButton: false,
        timer: 1000
      });
      return false;
    } else {
      var liveotpcount = $('#otp').val().length;
      if (liveotpcount < otplength) {
        swal({
          title: 'Please enter the valid OTP!',
          type: 'warning',
          showConfirmButton: false,
          timer: 1500
        });
        return false;
      } else {
      }
    }
    var param = this.user;
    this.otploader = true;
    $('body').addClass('bodyoverlay');
    this.Service.otpvalidcheck(param).subscribe((success) => {
      var status = success['status'];
      if (status == 'True') {
        // this.CheckFormMobileLogIn();
        this.otpUserLoginNewAPI();
        this.countdown.restart();
        $('body').removeClass('bodyoverlay');
      } else {
        this.otploader = false;
        swal({
          title: 'Oops Something Error!',
          text: 'Its Not a valid OTP / OTP Expired!',
          type: 'error',
          showConfirmButton: false,
          timer: 1500
        });
      }
    }, (err) => {

    });
  }

  otpUserLoginNewAPI() {
    if (this.user.name === undefined) {
      this.user.name = 'Guest User';
      var param = this.user;
    } else {
      var param = this.user;
    }
    this.Service.userLoginWithOtpNewAPI(param).subscribe(responce => {
      if (responce['status'] === 'True') {
        localStorage.setItem('loginID', '1');
        swal({
          title: 'Login successfully',
          text: '',
          type: 'success',
          showConfirmButton: false,
          timer: 2000
        });

        this.userDetails = responce['UserDetails'];
        // Store
        localStorage.setItem('userName', this.userDetails[0]['user_name']);
        localStorage.setItem('lastName', this.userDetails[0]['last_name']);
        localStorage.setItem('userID', this.userDetails[0]['reg_IDPK']);
        localStorage.setItem('userEmail', this.userDetails[0]['user_email']);
        localStorage.setItem('userNumber', this.userDetails[0]['number']);
        // Retrieve
        // this.Username = localStorage.getItem('userName');
        this.UserName = localStorage.getItem('userName');
        this.lastUsername = localStorage.getItem('lastName');
        this.UserId = localStorage.getItem('userID');
        this.UserEmail = localStorage.getItem('userEmail');
        this.UserNumber = localStorage.getItem('userNumber');
        let param = {
          regid: this.UserId,
          name: this.UserName,
          lname: this.lastUsername,
          mail: this.EmailId
        };
        this.Service.updateuserdata(param).subscribe(responce => {

        });
        // 
        if (typeof (Storage) !== 'undefined') {
          // Store
          localStorage.setItem('userName', this.userDetails[0]['user_name']);
          localStorage.setItem('lastName', this.userDetails[0]['last_name']);
          localStorage.setItem('userID', this.userDetails[0]['reg_IDPK']);
          localStorage.setItem('userEmail', this.userDetails[0]['user_email']);
          localStorage.setItem('userNumber', this.userDetails[0]['number']);
          // Retrieve
          this.UserName = localStorage.getItem('userName');
          this.lastUsername = localStorage.getItem('lastName');
          this.UserId = localStorage.getItem('userID');
          this.UserEmail = localStorage.getItem('userEmail');
          this.UserNumber = localStorage.getItem('userNumber');
          // 
        } else {
          document.getElementById('result').innerHTML = 'Sorry, your browser does not support Web Storage...';
        }
        if ('SeenPropertyID' in localStorage) {
          this.seenproparr = JSON.parse(localStorage.getItem('SeenPropertyID'));
          const userid = localStorage.getItem('userID');
          var param1 = {
            userid: userid,
            propid: this.seenproparr
          };
          if (this.seenproparr.length === 0) { } else {
            this.Service.addUserSeenProjects(param1).subscribe(response => {
              if (response['status'] === 'True') {
                localStorage.setItem('SeenPropertyID', '[]');
              } else {
              }
            });
          }

        }

        if ('propertyID' in localStorage) {
          this.storagearr = JSON.parse(localStorage.getItem('propertyID'));
          const userid = localStorage.getItem('userID');
          var param2 = {
            userid: userid,
            propid: this.storagearr
          };
          if (this.storagearr.length === 0) { } else {
            this.Service.addfavaourite(param2).subscribe(response => {
              if (response['status'] === 'True') {
                localStorage.setItem('propertyID', '[]');
              } else {
              }
            });
          }
        } else {
        }
        // var urlData = localStorage.getItem('currentURl');
        // this.router.navigate([urlData]);
        // window.history.back();
        // $('#myModal').hide();
        $('.modal-backdrop').remove();
        if (this.RentSelect === true) {
          this.postPropRentals();
        } else if (this.SellSelect === true) {
          this.postProp();
        }
      } else { }
    });
  }
  onOtpChange(otp) {
    var param = this.user;
    param.otp = otp;
  }
  config = {
    allowNumbersOnly: false,
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



  masterCoverImages = true;
  coverImages = false;
  coverUploadFile = true;
  masterUploadFile = false;
  UploadFloorImages = true;
  UploadFloorFile = false;
  UploadGalleryImages = true;
  UploadGalleryFile = false;
  ammentitiesboxModel = true;
  secondPageAmentities = true;
  amenitiesParking = false;



  closeAmenitiesModal() {
    this.amenitiesclose = 'true';
  }

  amentitiesAdd() {
    this.amenitiesclose = 'false'
    this.secondPageAmentities = true

    if (this.ammmentitiesArray.length < 3) {
      this.showFormBtn = false;
    } else if (this.ammmentitiesArray.length > 3) {
      this.showFormBtn = true;
    }

    if (this.ammmentitiesArray.length < 0) {
      this.toggleAmmentities = false;
    }
    else {
      this.toggleAmmentities = true;
    }

  }




  // OnFacilitiesClick(facilities: any) {
  //   this.Facilities = facilities;
  //   this.ammmentitiesArray.push(facilities)
  // }

  // OnAmenitiesClick(amenities: any) {
  //   this.ammmentitiesArray.push(amenities)
  //   this.Amenities = amenities;
  // }

  selectedParkings: any[] = [];
  // selectedParkingNames: string[] = [];


  // addMoreAmmentities() {




  // }

  inputValue: string = ''; // Default empty value

  increaseValue() {
    if (this.inputValue === '') {
      this.inputValue = '1';
    } else {
      this.inputValue = (parseInt(this.inputValue, 10) + 1).toString();
    }
    this.updateNumbers();
  }

  decreaseValue() {
    if (this.inputValue !== '' && parseInt(this.inputValue, 10) > 0) {
      this.inputValue = (parseInt(this.inputValue, 10) - 1).toString();
      if (this.inputValue === '0') {
        this.inputValue = ''; // Optionally set to empty if it reaches zero
      }
    }
    this.updateNumbers();
  }

  selectedFloor: number;
  numbers: number[] = this.generateNumbers(this.inputValue);

  generateNumbers(max: string): number[] {
    const maxNumber = max === '' ? 0 : parseInt(max, 10);
    return Array.from({ length: maxNumber + 1 }, (_, i) => i);
  }

  updateNumbers() {
    this.numbers = this.generateNumbers(this.inputValue);
    const maxNumber = this.inputValue === '' ? 0 : parseInt(this.inputValue, 10);
    if (this.selectedFloor > maxNumber) {
      this.selectedFloor = maxNumber;
    }
  }
  updateModel(value: any) {
    // Update component property or perform any required logic
    this.amount = value;
  }





  addNewLoc() {

    this.isButtonDisabled = false

  }



  closeIframemodal() {
    $('#homiCloseButton').click()
    $('#IframeModalButton').click()
  }




  // Subscription Plan

  payNow1() {

    const options = {
      key: 'rzp_test_SrCNGDNDmuT8MF', // Replace with Razorpay Key ID
      amount: 4900,
      currency: 'INR',
      name: 'My Store',
      description: 'Test Payment',

      handler: function (response: any) {
        alert('Payment Successful');
        console.log('Payment ID:', response.razorpay_payment_id);
        console.log('Order ID:', response.razorpay_order_id);
        console.log('Signature:', response.razorpay_signature);
      },

      prefill: {
        name: 'John Doe',
        email: 'john@example.com',
        contact: '9999999999'
      },

      theme: {
        color: '#3399cc'
      }
    };

    const rzp = new Razorpay(options);
    rzp.open();
  }


  selectedUser: string = '';
  selectedUserId: string = '';
  plansList: any[] = [];
  eliteUserPlans: any;
  mobileImg: any;
  instantPost: any[] = []
  eliteUserName: any;
  planDetailesImagePath = 'http://192.168.0.120/right2shout_LIVE/images/dataFilterimg/'

  relaxDataFilter() {
    this.eliteService.relaxDataFilter().subscribe((res: any) => {
      const resDeta = res.subscriptionDetails;
      // ====================== dropdown data ======================
      this.eliteUserName = resDeta.eliteUserName;
      // ====================== plans data =========================
      this.eliteUserPlans = resDeta.elitePlans;
      // ====================== mobile Img data =========================
      this.mobileImg = resDeta.mobileImg;
      // ====================== mobile instant post data =========================
      this.instantPost = resDeta.instantPlan;
      // ====================== Default Buyer Plan =================
      const buyerPlan = this.eliteUserPlans.find(
        p => p.eliteUserId == '1'
      );
      if (buyerPlan) {
        this.selectedUser = buyerPlan.eliteUserType;
        this.selectedUserId = buyerPlan.eliteUserId;
        this.plansList = buyerPlan.plans;
        console.log('Elite User Plans (Buyer)', this.plansList);
      }
    });
  }

  userSelected: any = null;

  billingSummaryList: any = {}
  selectedPlan(planId: any, plan: any) {
    console.log(plan)
    this.billingSummaryList = plan
    this.userSelected = planId;
    this.selectedUserId = '2'
    this.selectedUser = this.selectedUser;
    console.log(this.selectedUserId, this.selectedUser, 'Selected Plan:', this.userSelected);
  }

  billingShowSummary: boolean = false
  payNowAndPost(instantPost) {
    this.billingShowSummary = true
    this.billingSummaryList = instantPost[0]
    this.selectedUserId = this.billingSummaryList.eliteUserId;
    this.userSelected = this.billingSummaryList.planId;
    this.propertyLimitReached = false
    $('#propertyCloseBtn').click()
  }
  paymentPlan() {
    this.billingShowSummary = true
  }
  closeBillingSummary() {
    this.billingShowSummary = false
  }

  userChoosesPlan: boolean = false
  propertyLimitReached: boolean = true
  choosePlan() {
    this.propertyLimitReached = false
    this.userChoosesPlan = true
  }
  subscriptionModalOpen() {
    this.propertyLimitReached = true
    this.userChoosesPlan = false
  }


  payment() {
    this.billingShowSummary = false
    const userId = localStorage.getItem('userID');
    const userNumber = localStorage.getItem('userNumber');
    const orderData = {
      user_id: userId,
      user_number: userNumber,
      elite_user_id: this.selectedUserId,
      plan_id: this.userSelected,
    };
    console.log(this.selectedUserId, this.userSelected)

    console.log(orderData)
    this.eliteService.createOrder(orderData).subscribe({
      next: (res: any) => {
        if (!res.status) {
          alert('Failed to create order. Please try again.');
          return;
        }

        const options = {
          key: res.key_id,
          amount: res.amount,
          currency: res.currency,
          name: 'Homes247',
          image: "https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_mobile/images/logo1_1.png",
          description: this.selectedUser + ' Subscription',
          order_id: res.order_id,
          prefill: {
            contact: this.userNumber,
          },
          theme: {
            color: '#971b47'
          },

          handler: (response: any) => {
            const verifyData = {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              user_id: userId,
              user_number: this.userNumber,
              elite_user_id: this.selectedUserId,
              plan_id: this.userSelected,
            };

            this.eliteService.verifyPayment(verifyData).subscribe({
              next: (verifyRes: any) => {
                if (verifyRes.status) {
                    this.closeBillingSummary()
                  this.loadComponent == true
                    this.postProp()
                  alert('Payment Successful! Subscription active until ' + verifyRes.expiry_date);
                } else {
                  alert('Verification failed. Please contact support.');
                }
              },
              error: () => {
                alert('Verification error. Please contact support.');
              }
            });
          },

          modal: {
            ondismiss: () => {
              console.log('Popup closed.');
            }
          }
        };

        const rzp = new (window as any).Razorpay(options);
        rzp.on('payment.failed', (response: any) => {
          console.log('Payment failed:', response);
          alert('Payment Failed. Please try again.');
        });
        rzp.open();
      },
      error: () => {
        alert('Something went wrong. Please try again.');
      }
    });
  }



}
