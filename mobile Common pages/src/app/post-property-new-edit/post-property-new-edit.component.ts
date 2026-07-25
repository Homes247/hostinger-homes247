import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { WINDOW } from '@ng-toolkit/universal';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Observable, of, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { CityService } from '../city.service';
import { DataService } from '../data.service';
declare var $: any;
declare var swal: any;
interface Room {
  type: string;       // Unique ID (for "Others": `other_${timestamp}_${random}`)
  baseType?: string;  // Original type from backend ("1", "2", "6" etc)
  label: string;      // Display name (for "Others": selected sharing type)
  rent: number;
  deposit: number;
  roomCount?: number;
  OtherRoomCount?: number;
  facilities: any;
}
@Component({
  selector: 'app-post-property-new-edit',
  templateUrl: './post-property-new-edit.component.html',
  styleUrls: ['./post-property-new-edit.component.css'],
  animations: [trigger('stepTransition', [transition('void => forward',
    [animate('800ms ease-in-out', keyframes([
      style({ transform: 'translateY(0)', offset: 0 }),
      style({ transform: 'translateY(-50px)', offset: 0.25 }),
      style({ transform: 'translateY(-100px)', offset: 0.5 }),
      style({ transform: 'translateY(-150px)', offset: 0.75 }),
      style({ transform: 'translateY(-150px)', offset: 1 })
    ])
    )
    ]),
  transition('void => backward', [
    animate(
      '800ms ease-in-out',
      keyframes([
        style({ transform: 'translateY(-150px)', offset: 0 }),
        style({ transform: 'translateY(-100px)', offset: 0.25 }),
        style({ transform: 'translateY(-50px)', offset: 0.5 }),
        style({ transform: 'translateY(0)', offset: 0.75 }),
        style({ transform: 'translateY(0)', offset: 1 })
      ])
    )
  ])
  ])
  ]
})
export class PostPropertyNewEditComponent implements OnInit {
  @ViewChild('modalElement', { static: false }) modalRef!: ElementRef;
  @ViewChild('scrollableDiv') scrollableDiv!: ElementRef;
  PropertyID: any;
  coverImageLabel: any;
  first: boolean = true;
  Second: boolean = false;
  Third: boolean = false;
  Fourth: boolean = false;
  Fifth: boolean = false;
  six: boolean = false;
  Seven: boolean = false;
  Eight: boolean = false;
  Residential_Section: boolean = true;
  Commercial_Section: boolean = true;
  Property_Type = 'Residential_Pg';
  isDraggingFiles = false;
  noAlcoholChecked = false;
  noNonVegChecked = false;
  noPartyChecked = false;
  noLoudMusicChecked = false;
  noOppositeGenderChecked = false;
  noVisitorsEntryChecked = false;
  noGuardiansStayChecked = false;
  receptionChecked = false;
  conferenceChecked = false;
  pantryChecked = false;
  auditoriumChecked = false;
  sharedWashroomChecked = false;
  privateWashroomChecked = false;
  serverRoomChecked = false;
  waterSupplyPlotChecked = false;
  electricityPlotChecked = false;
  sewagePlotChecked = false;
  gatedSecurityPlotChecked = false;
  streetLightsPlotChecked = false;
  waterSupplyShopChecked = false;
  conferenceShopChecked = false;
  electricityShopChecked = false;
  sewageShopChecked = false;
  gatedSecurityShopChecked = false;
  storageAreaShopChecked = false;
  pantryShopChecked = false;
  waterSupplyWarehouseChecked = false;
  electricityWarehouseChecked = false;
  sewageWarehouseChecked = false;
  gatedSecurityWarehouseChecked = false;
  minPossessionDate: string;
  years: number[] = [];
  selectedYear: number | null = null;
  roomSummaryData: any;
  form: FormGroup;
  submittedData: Room[] = [];
  showModal = false;
  propertyForm!: FormGroup;
  images = [];
  commercial: boolean = false;
  constructor(@Inject(WINDOW) private window: Window, private fb: FormBuilder,
    public cityservice: CityService,
    public Service: DataService,
    private cdRef: ChangeDetectorRef,
    private router: Router,
    private titleService: Title,
    private meta: Meta,
    private datePipe: DatePipe,
    private activeroute: ActivatedRoute,
  ) {
    this.Service.mouseenterlistenOtp().subscribe((m: any) => {
      if (window.location.hash === '#postsellpropnew') {
        this.loadComponent = true;
        this.postProp();
      }
    })
  }
  ngOnInit(): void {
    // this.router.events
    //   .pipe(filter(event => event instanceof NavigationStart))
    //   .subscribe((event: any) => {
    //     if (event.navigationTrigger === 'popstate') {
    //       // User clicked browser back/forward button
    //       window.location.reload(); // 🔄 Full refresh
    //     }
    //   });
    this.UserId = localStorage.getItem('userID');
    this.metatags();
    this.formValidator();                 // Validators & Extra Logic
    if (this.router.url.includes('/pg/')) {
      this.PgDataFilters();
    }
    else {
      this.commercialDataFilter();
    }

    // if (this.router.url.includes('?Type=PG')) {
    //   setTimeout(() => {
    //     $('#propertyTypeList0').click();
    //     $('#propertyAvailableList2').click();
    //   }, 500);
    // } else if (this.router.url.includes('?Type=Commercial')) {
    //   setTimeout(() => {
    //     $('#propertyTypeList1').click();
    //   }, 500);
    // }


  }


  todayDateUI: any = '';
  todayDatySplit: any;
  onlyDateSplitted: any[] = [];
  ngAfterViewInit(): void {
    this.getlocationlist();               // API (optional if not blocking form)                   
    this.updateStepFlags();               // Flag for UI visibility
    this.stickyload();
    const today = new Date();
    today.setDate(today.getDate() - 30);
    this.minPossessionDate = today.toISOString().split('T')[0];
    const todayDate = new Date();
    const dd = String(todayDate.getDate()).padStart(2, '0');
    const mm = String(todayDate.getMonth() + 1).padStart(2, '0');
    const yyyy = todayDate.getFullYear();
    // this.todayDateUI = `${dd}-${mm}-${yyyy}`;
    this.filteredCities = this.citiess;
    this.myControlCity.valueChanges.subscribe(value => {
      this.filteredCities = this._filterCities(value);
    });
    this.watchRoomCategorySelection();
    this.SeventhFormGroup.get('propertyDescription')?.valueChanges.subscribe(val => {
      this.showRegenerateButton = !!val?.trim();
    });
  }
  userID: any;
  loginId: any;
  loginShowHide = false;
  checkuserlogin() {
    this.userID = localStorage.getItem('userID');
    this.loginId = localStorage.getItem('loginID');
    if (this.loginId === null || this.loginId === undefined || this.loginId === '') {
      this.loginShowHide = false;
    } else {
      this.loginShowHide = true;
    }
  }
  metatags() {
    const PAGEID = '40';
    this.Service.getstaticmeta(PAGEID).subscribe(metatags => {
      this.titleService.setTitle(metatags['Pageseo'][0].page_title);
      this.meta.updateTag({ name: 'description', content: metatags['Pageseo'][0].meta_description });
      this.meta.updateTag({ property: 'og:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop/images/og/about.jpg' });
      this.meta.updateTag({ property: 'og:title', content: metatags['Pageseo'][0].page_title });
      this.meta.updateTag({ property: 'og:description', content: metatags['Pageseo'][0].meta_description });
      this.Service.createLinkForCanonicalURL();
    });
  }
  dragAndDrop() {
    window.addEventListener('dragover', (e) => {
      e.preventDefault();
      this.isDraggingFiles = true;
    });
    window.addEventListener('dragleave', (e) => {
      e.preventDefault();
      this.isDraggingFiles = false;
    });
    window.addEventListener('drop', (e) => {
      e.preventDefault();
      this.isDraggingFiles = false;
      this.handleGlobalDrop(e);
    });

  }
  watchRoomCategorySelection() {
    this.roomCategoryError = false;  // initialize
    setInterval(() => {
      if (this.submittedModal) {
        this.roomCategoryError = this.selectedRoomTypes.length === 0 && this.submittedData.length === 0;
      }
    }, 300); // ⚠️ Can be optimized to trigger only when needed
  }
  displayRoomTypes: string[] = [];
  updateDisplayRoomTypes() {
    this.displayRoomTypes = this.submittedData
      .map(room => room.label.replace(' Sharing', '').replace(' sharing', ''))
      .slice(0, 3); // Only show first 3
  }
  createForm() {
    this.form = this.fb.group({
      rent: ['', [Validators.required, Validators.min(1000), Validators.max(99999)]],
      deposit: ['', [Validators.required, Validators.min(1000), Validators.max(99999)]],
      roomCount: ['', [Validators.required, Validators.pattern(/^\d{1,2}$/)]],
      otherSharingLabel: ['', Validators.required],
      OtherRoomCount: [''],
      attachedBathroom: [false],
      tableFan: [false],
      television: [false],
      geyser: [false],
      mattress: [false],
      cupboard: [false],
      airConditioner: [false],
      tableChair: [false]
    }, {
      validators: this.atLeastOneFacilityValidator.bind(this)  // ✅ bind `this` context
    });
    this.watchFacilityChanges();
  }
  openModal() {
    this.showModal = true;
  }
  closeModalNew() {
    const submittedTypes = this.submittedData.map(data => data.type);
    this.selectedRoomTypes = this.selectedRoomTypes.filter(type =>
      submittedTypes.includes(type)
    );
    this.submittedModal = false;
    this.facilityError = false;
    this.currentIndex = 0;
    this.isOthersRoomActive = false;
    this.selectedRoomTypes = []
    this.form.reset();
    this.form.markAsPristine();
    this.form.markAsUntouched();
    this.hideModalWithBackdrop();
  }
  getFacilitiesFromForm() {
    const facilities = {};
    this.pgFacilitiesList.forEach(facility => {
      facilities[facility.key] = this.form.get(facility.key)?.value || false;
    });
    return facilities;
  }
  currentEditIndex: number | null = null;
  currentRoomType: any;
  orderedByRoomType: any[] = []
  getOrderedSubmittedData() {
    const order = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
    this.orderedByRoomType = this.submittedData.slice().sort((a, b) => {
      const aValue = a.baseType;
      const bValue = b.baseType;
      const indexA = order.findIndex(val => val === aValue);
      const indexB = order.findIndex(val => val === bValue);
      return indexA - indexB;
    });
  }
  // getFacilityKeys(facilities: any): string[] {
  //   return Object.keys(facilities).filter(key => facilities[key]);
  // }
  countincreement_commercial = 0
  Commercial() {
    this.selectedAmenities = [];
    this.countincreement_commercial++;
    if (this.countincreement_commercial == 1) {
      // this.commercialDataFilter();
    }
    this.Property_Type = 'Commercial'
    this.property_for = '';
    this.Commercial_Section = true;
    this.Residential_Section = false;
    const selected = this.firstFormGroup.get('Property_Available')?.value;
    if (selected === 'pgHostels') {
      this.firstFormGroup.get('Property_Available')?.setValue('');
      this.firstFormGroup.get('Property_Available')?.markAsUntouched();
      this.firstFormGroup.get('Property_Available')?.updateValueAndValidity();
    }
    // this.emptyResidentialPg()
  }
  countincreement_pg = 0
  Residential() {
    this.selectedAmenities = [];
    this.countincreement_pg++;
    if (this.countincreement_pg == 1) {
      // this.PgDataFilters();
    }
    this.Property_Type = 'Residential_Pg'
    this.property_for = '';
    this.Residential_Section = true;
    this.Commercial_Section = false;
    const selected = this.firstFormGroup.get('Property_Available')?.value;
    if (selected !== 'Sale' && selected !== 'rentLease') {
      this.firstFormGroup.get('Property_Available')?.setValue('');
      this.firstFormGroup.get('Property_Available')?.markAsUntouched();
      this.firstFormGroup.get('Property_Available')?.updateValueAndValidity();
    }
    // this.emptyCommercial()
  }
  stickyload() {
    $(this.window).scroll(function () {
      if ($(this).scrollTop() > 10) {
        $('.top_section_mainheader').css('display', 'none');
      } else {
        $('.top_section_mainheader').css('display', 'block');
      }
    })
  }
  currentStep = 1;
  get progress(): number {
    const totalSteps = 8;
    return (this.currentStep - 1) / (totalSteps - 1) * 100;
  }
  isStepVisible(step: number): boolean {
    return true; // all other steps are shown
  }
  stepDirection = '';
  goNext(): void {
    let next = this.currentStep + 1;
    while (next <= 8 && !this.isStepVisible(next)) {
      next++;
    }
    if (next <= 8) {
      this.currentStep = next;
      this.updateStepFlags();
    }



  }
  goBack(): void {
    let prev = this.currentStep - 1;
    while (prev >= 1 && !this.isStepVisible(prev)) {
      prev--;
    }
    if (prev >= 1) {
      this.currentStep = prev;
      this.updateStepFlags();
    }
  }
  updateStepFlags() {
    this.first = this.currentStep === 1;
    this.Second = this.currentStep === 2;
    this.Third = this.currentStep === 3;
    this.Fourth = this.currentStep === 4;
    this.Fifth = this.currentStep === 5;
    this.six = this.currentStep === 6;
    this.Seven = this.currentStep === 7;
    this.Eight = this.currentStep === 8;
  }
  previewUrls: string[] = [];
  customOptionsGallery: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    autoplay: false,
    autoplayHoverPause: false,
    margin: 10,
    autoWidth: false, // Ensure images do not exceed container width
    center: true, // Keeps the image centered
    lazyLoad: true, // Improves image loading
    autoplayTimeout: 3000, // Set delay for auto sliding
    smartSpeed: 600, // Smooth sliding animation
    nav: true,
    navText: ['<img src="https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_3/assets/images/individual/leftArrow.svg" alt=\'LeftArrow\' class=\'prop_indi_owl owl-nav owl-prev main_move_left_gallery\'>',
      '<img src="https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_3/assets/images/individual/rightArrow.svg" alt=\'RightArrow\' class=\'prop_indi_owl owl-nav owl-next main_move_right_gallery\'>'],
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
  Commercial_Type: any;
  property_for: any;
  forlease: boolean = false;
  officeSpace() {
    this.Commercial_Type = 'officeSpace';
    this.selectedAmenities = [];
    // this.emptyCommercialTypes()
  }
  shopShowroom() {
    this.Commercial_Type = 'shopShowroom';
    this.selectedAmenities = [];
    // this.emptyCommercialTypes()
  }
  Plot() {
    this.Commercial_Type = 'Plot';
    this.selectedAmenities = [];
    // this.emptyCommercialTypes()
  }
  warehouse() {
    this.Commercial_Type = 'warehouse';
    this.selectedAmenities = [];
    // this.emptyCommercialTypes()
  }
  Others() {
    this.Commercial_Type = 'Others';
    this.selectedAmenities = [];
    // this.emptyCommercialTypes()
  }
  forSale() {
    this.property_for = 'sale';
  }
  forRent() {
    this.property_for = 'rent';
  }
  forPG() {
    this.property_for = 'pg';
  }
  onlyforlease(value: boolean, Value): void {

    if (this.Commercial_Type == 'Plot' || this.Commercial_Type == 'officeSpace') {
      this.Only_Lease_value = Value;
    }
    if (this.Commercial_Type == 'shopShowroom' || this.Commercial_Type == 'warehouse') {
      this.Only_Lease_Shop_value = Value;
    }
    this.forlease = value;
    if (value) {
      const input = document.getElementById('leaseOrDepositInput') as HTMLInputElement;
      if (input) {
        input.value = '';
      }
      this.IncludedInRent_Value = '2'
    }
    if (value) {
      this.Security_Deposit_value = ''
      this.Rent_Per_Month_Shop_value = ''
      this.Rent_Per_Month_value = ''
      this.Rent_Per_Month_ForLease_value = ''
      this.IncludedInRent_Value = '2'
    } else {
      this.total_lease_amount_value = ''
    }
  }
  propertyStatus: any;
  status(val: string, Value, label) {
    this.PropertyStatuslabel = label;
    this.propertyStatus = val;
    this.Property_Status_value = Value;
    if (val === 'Ready_To_Move') {
      this.Possession_Date_value = '';
      this.FifthFormGroup.get('Possession_Date')?.reset();
    } else if (val === 'Under_Construction') {
      this.Age_Of_Property_value = '';
      this.FifthFormGroup.get('Age_of_Property')?.reset();
    }
  }
  selectedCity: string = '';
  addRoomDetailsActive: boolean = false
  roomSharing() {
    this.addRoomDetailsActive == !this.addRoomDetailsActive
  }
  parkingAvaliable: boolean = false;
  foodAvaliable: boolean = false;
  parking(value: boolean, Value1): void {
    this.parkingAvaliable = value;
    this.Parking_Avaliable_value = Value1;
  }
  foodProvides(value, Value1): void {
    this.foodAvaliable = value;
    this.Food_Provided_value = Value1;
    if (!value) {

      this.PG_Food_value = []
      this.PG_Food_labels = []
      this.PG_Food_Charges_value = ''
      this.Meal_Type_value = ''
      this.PG_Food_labels = []
      this.PGFoodChargeslabel = ''
      this.FifthFormGroup.get('PG_Food')?.setValue([]);

      this.FifthFormGroup.get('PG_Food_Charges')?.reset('');

      this.FifthFormGroup.get('Meal_Type')?.reset('');

      this.FifthFormGroup.get('PG_Food_Charges')?.setValue([]);

      this.FifthFormGroup.get('Meal_Type')?.setValue([]);
    }
  }
  showModalWithBackdrop() {
    const backdrop = document.getElementById('customModalBackdrop');
    if (backdrop) backdrop.style.display = 'block';
    setTimeout(() => {
      ($('#addRoomDetailsModal') as any).modal({
        backdrop: 'static',
        keyboard: false
      });
    }, 0);
    ($('#addRoomDetailsModal') as any).modal('show');
    $('body').addClass('modal-open');
    this.updateShowNextButton();
  }
  hideModalWithBackdrop() {
    const backdrop = document.getElementById('customModalBackdrop');
    if (backdrop) backdrop.style.display = 'none';
    setTimeout(() => {
      ($('#addRoomDetailsModal') as any).modal({
        backdrop: 'static',
        keyboard: false
      });
    }, 0);
    ($('#addRoomDetailsModal') as any).modal('hide');
    $('body').removeClass('modal-open');
  }
  selectedRoomTypes: string[] = [];
  roomFormData: any = {}; // Stores data for each room
  currentIndex = 0;
  roomDetails: any = {}; // Final storage for all room data
  disabledRoomTypes: string[] = []; // Tracks disabled room types
  multiEntryTypes: string[] = ['other']; // Only 'other' can be added multiple times
  selectedRoomType: string = '';
  isEditMode: boolean = false;
  currentModalTitle = '';
  initForm() {
    const formGroupConfig: any = {
      roomCount: ['', [Validators.max(99)]],
      OtherRoomCount: ['', [Validators.max(99)]],
      rent: ['', [Validators.required, Validators.min(1000), Validators.max(99999)]],
      deposit: ['', [Validators.required, Validators.min(1000), Validators.max(99999)]],
      otherSharingLabel: ['', Validators.required]
    };
    this.pgFacilitiesList.forEach(facility => {
      formGroupConfig[facility.key] = [false];
    });
    this.form = this.fb.group(formGroupConfig, {
      validators: this.atLeastOneFacilityValidator.bind(this)
    });
    this.watchFacilityChanges();
  }
  onRoomTypeChange(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    const value = checkbox.value;
    if (checkbox.checked) {
      if (!this.selectedRoomTypes.includes(value)) {
        this.selectedRoomTypes.push(value);
      }
    } else {
      this.selectedRoomTypes = this.selectedRoomTypes.filter(val => val !== value);
    }
  }
  isOthersRoomActive = false;
  currentSharingSelection = '';
  openRoomTypeModals(forcedRoomType?: string) {
    if (forcedRoomType) {
      this.currentIndex = this.selectedRoomTypes.indexOf(forcedRoomType);
      if (this.currentIndex === -1) this.currentIndex = 0;
    } else {
      let seenOther = false;
      this.selectedRoomTypes = this.selectedRoomTypes.filter(type => {
        if (type.startsWith('other_')) return true;
        if (type === 'other' || type === '13') {
          if (seenOther) return false;
          seenOther = true;
          return true;
        }
        return !this.roomDetails[type];
      });
      this.selectedRoomTypes = this.selectedRoomTypes.map(type => {
        if (type === '13') {
          const generated = this.generateOtherRoomId();
          return generated;
        }
        return type;
      });
      const modalRoomOrder = ['1', '2', '3', '4']; // No '13' anymore
      this.selectedRoomTypes.sort((a, b) => {
        const isOtherA = a.startsWith('other_');
        const isOtherB = b.startsWith('other_');
        if (isOtherA && !isOtherB) return 1;
        if (!isOtherA && isOtherB) return -1;
        const orderA = modalRoomOrder.indexOf(a);
        const orderB = modalRoomOrder.indexOf(b);
        return orderA - orderB;
      });
      this.currentIndex = 0;
    }
    this.pgFacilitiesList.forEach(facility => {
      const key = facility.key.toString();  // Make sure it's string
      if (!this.form.contains(key)) {
        this.form.addControl(key, new FormControl(false));
      }
    });
    this.isOthersRoomActive = false;
    this.currentSharingSelection = '';
    this.isEditMode = false;
    this.loadCurrentRoomData();
    this.showModalWithBackdrop();
  }
  loadCurrentRoomData() {
    const type = this.selectedRoomTypes[this.currentIndex];
    this.selectedRoomType = type;
    this.isOthersRoomActive = type === '13' || type.startsWith('other_');
    if (this.isOthersRoomActive) {
      const saved = this.roomFormData[type] || {};
      const labelFromMap = this.roomOtherTypes.find(r => r.value === type)?.label;
      this.currentModalTitle = labelFromMap || this.getOtherSharingLabel(saved.otherSharingLabel) || 'Others';
    } else {
      this.currentModalTitle = this.getRoomTitle(type);
    }
    const saved = this.roomFormData[type] || {};
    this.form.reset({
      roomCount: saved.roomCount || '',
      OtherRoomCount: saved.OtherRoomCount || '',
      rent: saved.rent || '',
      deposit: saved.deposit || '',
      otherSharingLabel: this.isOthersRoomActive ? (saved.otherSharingLabel || '') : '',
      ...this.getDefaultFacilities(saved)
    });
    if (this.isOthersRoomActive && saved.otherSharingLabel) {
      this.currentSharingSelection = saved.otherSharingLabel;
    }
    this.showModalWithBackdrop();
  }
  getDefaultFacilities(savedData: any) {
    const defaults = {};
    this.pgFacilitiesList.forEach(facility => {
      defaults[facility.key] = savedData[facility.key] || false;
    });
    return defaults;
  }
  saveCurrentRoomData() {
    const type = this.selectedRoomTypes[this.currentIndex];
    const formValue = this.form.value;
    if (!type) return;
    this.roomFormData[type] = formValue;
    this.roomDetails[type] = formValue;
    if (!this.multiEntryTypes.includes(type) && !this.disabledRoomTypes.includes(type)) {
      this.disabledRoomTypes.push(type);
    }
  }
  nextRoomType() {
    this.form.markAllAsTouched();
    const rentInvalid = this.form.get('rent')?.invalid;
    const depositInvalid = this.form.get('deposit')?.invalid;
    const rentRoom = this.form.get('roomCount')?.invalid;
    const rentOtherRoom = this.form.get('OtherRoomCount')?.invalid;
    const hasFacility = this.pgFacilitiesList.some(facility =>
      this.form.get(facility.key.toString())?.value
    );
    this.facilityError = !hasFacility;
    if (rentInvalid || depositInvalid || this.facilityError || rentRoom || rentOtherRoom) {
      return;
    }
    this.saveCurrentRoomData();
    const type = String(this.selectedRoomTypes[this.currentIndex]);
    const data = this.roomFormData[type];
    const alreadyExists = this.submittedData.some(item => String(item.type) === type);
    if (!alreadyExists) {
      this.submittedData.push({
        type,
        label: this.getRoomTitle(type),
        rent: data.rent,
        deposit: data.deposit,
        roomCount: data.roomCount,
        OtherRoomCount: data.OtherRoomCount,
        facilities: { ...data }
      });
      this.getOrderedSubmittedData()
    }
    this.currentIndex++;
    if (this.currentIndex < this.selectedRoomTypes.length) {
      this.loadCurrentRoomData();
    } else {
      this.hideModalWithBackdrop();
      this.selectedRoomTypes = [];
      this.facilityError = false;
    }
    this.updateShowNextButton()
  }
  goBackModal() {
    this.saveCurrentRoomData();
    this.currentIndex--;
    this.loadCurrentRoomData();
  }
  // hasNextRoomType(): boolean {
  //   return this.selectedRoomTypes.slice(this.currentIndex + 1).some(type =>
  //     !this.submittedData.some(data => String(data.type) === String(type))
  //   );
  // }
  showNextButton: boolean = false;
  updateShowNextButton(): void {
    this.showNextButton = this.selectedRoomTypes
      .slice(this.currentIndex + 1)
      .some(type => !this.submittedData.some(data => String(data.type) === String(type)));
  }
  imagepath = "https://img-mb.homes247.in"
  getRoomTitle(type: string) {
    const room = this.roomTypes.find(r => r.value === type);
    return room ? room.label : type;
  }

  onSubmitModal() {
    this.form.markAllAsTouched();
    this.submittedModal = true;
    const isOthersRoom = String(this.selectedRoomTypes[this.currentIndex]) === '13' || this.selectedRoomTypes[this.currentIndex].startsWith('other_');
    if (this.isOthersRoomActive && !this.form.value.otherSharingLabel) {
      this.form.get('otherSharingLabel')?.setErrors({ required: true });
      return;
    }
    const rentInvalid = this.form.get('rent')?.invalid;
    const rentRoom = this.form.get('roomCount')?.invalid;
    const rentOtherRoom = this.form.get('OtherRoomCount')?.invalid;

    const depositInvalid = this.form.get('deposit')?.invalid;
    const hasFacility = this.pgFacilitiesList.some(facility =>
      this.form.get(facility.key.toString())?.value
    );
    this.facilityError = !hasFacility;

    if (rentInvalid || depositInvalid || this.facilityError || rentRoom || rentOtherRoom) {
      return;
    }
    const formValue = this.form.value;
    const submittedRoomTypes = this.submittedData.map(d => d.type);
    const unsubmittedRoomTypes = this.selectedRoomTypes.filter(
      type => !this.submittedData.some(data => data.type === type)
    );
    const activeRoom = unsubmittedRoomTypes[0];
    let currentType = this.selectedRoomTypes[this.currentIndex];
    let roomLabel = '';
    let baseType = currentType;
    let roomType = currentType;
    if (roomType.startsWith('other_')) {
      const selectedLabelKey = this.form.value.otherSharingLabel;
      const matched = this.roomOtherTypes.find(item => item.value === selectedLabelKey);
      roomLabel = matched?.label || selectedLabelKey;
      baseType = '13';
      this.currentSharingSelection = roomLabel;
    }
    else if (!roomType.startsWith('other_')) {
      const roomObj = this.roomTypes.find(item => item.value === currentType);
      roomLabel = roomObj?.label || currentType;
    }
    if (this.isEditMode && this.currentEditIndex !== null) {
      this.submittedData[this.currentEditIndex] = {
        type: roomType,
        baseType,
        label: roomLabel,
        rent: formValue.rent,
        deposit: formValue.deposit,
        roomCount: formValue.roomCount,
        OtherRoomCount: formValue.OtherRoomCount,
        facilities: this.getFacilitiesFromForm()
      };

      this.isEditMode = false;

      this.currentEditIndex = null;

      // this.submittedData = [...this.submittedData]; // ✅ new reference
      // this.getOrderedSubmittedData();
      this.submittedData = [...this.submittedData];
      this.getOrderedSubmittedData();
      this.orderedByRoomType = [...this.orderedByRoomType];
      this.roomOtherTypes = [... this.roomOtherTypes]

    } else {
      this.submittedData = this.submittedData.filter(d => {
        if (baseType === '13') {
          return d.label !== roomLabel; // Remove existing same-labeled "others"
        }
        return String(d.type) !== currentType;
      });
      this.sortSubmittedData();
      this.submittedData.push({
        type: roomType,
        baseType,
        label: roomLabel,
        rent: formValue.rent,
        deposit: formValue.deposit,
        roomCount: formValue.roomCount,
        OtherRoomCount: formValue.OtherRoomCount,
        facilities: this.getFacilitiesFromForm()
      });
      this.submittedData = [...this.submittedData];
      this.getOrderedSubmittedData();
      this.orderedByRoomType = [...this.orderedByRoomType];
    }
    if (roomType.startsWith('other_')) {
      const selectedSharing = formValue.otherSharingLabel;
      if (selectedSharing && !this.usedOtherSharings.includes(selectedSharing)) {
        this.usedOtherSharings.push(selectedSharing);
      }
    }
    if (!isOthersRoom && !this.disabledRoomTypes.includes(currentType)) {
      this.disabledRoomTypes.push(currentType);
    }
    this.isOthersRoomActive = false;
    this.submittedModal = false;
    this.submittedData.forEach(room => {
    });
    if (this.showNextButton) {
      this.currentIndex++;
      this.loadCurrentRoomData();
    } else {
      this.closeModalNew();
    }
    this.minimumRent = this.getMinimumRent(); // Call after submission
    this.updateShowNextButton();

    this.updateRoomOtherTypesDisabled()
    this.updateDisabledRoomMap()
  }


  minimumRent: any;
  getMinimumRent(): number | null {
    if (!this.submittedData.length) return null;
    const rents = this.submittedData
      .map(room => Number(room.rent))
      .filter(rent => !isNaN(rent));  // Clean invalid entries
    if (rents.length === 0) return null;
    return Math.min(...rents);
  }
  // isOtherSharingDisabled(item: any) {
  //   return this.usedOtherSharings.includes(item.value);
  // }
  updateRoomOtherTypesDisabled() {
    this.roomOtherTypes = this.roomOtherTypes.map(item => ({
      ...item,
      disabled: this.usedOtherSharings.includes(item.value)
    }));
  }
  editRoomDetails(roomType: string) {
    const room = this.submittedData.find(data => data.type === roomType);
    if (!room) return;
    this.isEditMode = true;
    this.currentEditIndex = this.submittedData.findIndex(data => data.type === roomType);
    if (room.baseType === '13') {
      this.currentSharingSelection = room.label;
      const matched = this.roomOtherTypes.find(item => item.label.trim() === room.label.trim());
      const otherValue = matched ? matched.value : '';
      this.form.reset({
        roomCount: room.OtherRoomCount, // 👈 keep both populated
        rent: room.rent,
        deposit: room.deposit,
        otherSharingLabel: otherValue,
        ...room.facilities
      });
      this.selectedRoomTypes = [room.type]; // Keep the actual `other_...` ID
      this.selectedRoomType = room.type;
    } else {
      this.form.reset({
        roomCount: room.roomCount,
        rent: room.rent,
        deposit: room.deposit,
        ...room.facilities
      });
      this.selectedRoomTypes = [room.baseType || roomType];
      this.selectedRoomType = room.baseType || roomType;
    }
    this.submittedData = [...this.submittedData];
    this.getOrderedSubmittedData();
    this.orderedByRoomType = [...this.orderedByRoomType];
    this.minimumRent = this.getMinimumRent();
    this.currentIndex = 0;
    this.currentModalTitle = room.label;
    this.showModalWithBackdrop();
    this.updateShowNextButton();
  }
  // removeRoomDetails(roomType: string) {
  //   const isOther = roomType && roomType.startsWith('other_');
  //   if (isOther) {
  //     const removedRoom = this.submittedData.find(d => d.type === roomType);
  //     if (removedRoom) {
  //       const removedLabel = removedRoom.label;
  //       const removedKey = this.roomOtherTypes.find(item => item.label === removedLabel)?.value;
  //       this.submittedData = this.submittedData.filter(data => data.type !== roomType);
  //       this.sortSubmittedData();
  //       if (removedKey) {
  //         const stillUsed = this.submittedData.some(
  //           room => room.label === removedLabel && room.type.startsWith('other_')
  //         );
  //         if (!stillUsed) {
  //           const idx = this.usedOtherSharings.indexOf(removedKey);
  //           if (idx > -1) {
  //             this.usedOtherSharings.splice(idx, 1);
  //           }
  //         }
  //       }
  //     }
  //   } else {
  //     delete this.roomDetails[roomType];
  //     delete this.roomFormData[roomType];
  //     const index = this.disabledRoomTypes.indexOf(roomType);
  //     if (index !== -1) {
  //       this.disabledRoomTypes.splice(index, 1);
  //     }
  //     this.submittedData = this.submittedData.filter(data => data.type !== roomType);
  //   }
  //   this.getOrderedSubmittedData()
  //   this.updateShowNextButton()
  //   this.updateRoomOtherTypesDisabled()
  //   this.updateDisabledRoomMap()
  // }

  removeRoomDetails(roomType: string) {

    // ✅ Fix: consider both "other_X" and plain numbers 5–10 as Others
    const isOther = roomType && (roomType.startsWith('other_') || ['5', '6', '7', '8', '9', '10'].includes(roomType));

    if (isOther) {
      const removedRoom = this.submittedData.find(d => d.type === roomType);

      if (removedRoom) {
        const removedLabel = removedRoom.label;
        const removedKey = this.roomOtherTypes.find(item => item.label === removedLabel)?.value
          || removedRoom.type.replace('other_', '');  // fallback if only number
        // Remove from submittedData
        this.submittedData = this.submittedData.filter(data => data.type !== roomType);
        this.sortSubmittedData();

        if (removedKey) {
          const stillUsed = this.submittedData.some(
            room => room.type === `other_${removedKey}` || room.type === removedKey
          );


          if (!stillUsed) {
            const idx = this.usedOtherSharings.indexOf(removedKey);


            if (idx > -1) {
              this.usedOtherSharings.splice(idx, 1);

            }
          }
        }
      }
    } else {
      // Standard rooms
      delete this.roomDetails[roomType];
      delete this.roomFormData[roomType];

      const index = this.disabledRoomTypes.indexOf(roomType);


      if (index !== -1) {
        this.disabledRoomTypes.splice(index, 1);

      }

      this.submittedData = this.submittedData.filter(data => data.type !== roomType);

    }

    this.getOrderedSubmittedData();
    this.updateShowNextButton();
    this.updateRoomOtherTypesDisabled();
    this.updateDisabledRoomMap();

    // 🔥 Final State



  }

  isRoomDisabled(roomValue: string): boolean {
    if (roomValue === '13') return false;
    return this.submittedData.some(data =>
      data.type === roomValue && !this.isOtherRoom(data.type)
    );
  }
  // ✅ Add this property
  disabledRoomMap: { [key: string]: boolean } = {};
  // ✅ Add this method
  updateDisabledRoomMap(): void {
    // 
    this.disabledRoomMap = {};
    this.roomTypes.forEach(room => {
      if (room.value === '13') {
        // Collect submitted "other_" types (5–10 sharing etc.) 
        const otherSharings = this.submittedData
          .filter(data => data.type.startsWith('other_'))
          .map(data => data.type);
        // Disable "Others" ONLY if all possible sharings (5–10) are already submitted
        const allOtherValues = this.roomOtherTypes.map(o => o.value);
        this.disabledRoomMap['13'] = allOtherValues.every(val =>
          otherSharings.includes(val)
        );
      } else {
        // Normal rooms disable if already submitted
        this.disabledRoomMap[room.value] = this.submittedData.some(
          data => data.type === room.value
        );
      }
    });
  }
  toggleRoomType(type: string) {
    const index = this.selectedRoomTypes.indexOf(type);
    if (index > -1) {
      this.selectedRoomTypes.splice(index, 1);
    } else {
      this.selectedRoomTypes.push(type);
    }
  }
  onRoomTypeClicked(roomValue: string, event: Event) {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      if (!this.selectedRoomTypes.includes(roomValue)) {
        this.selectedRoomTypes.push(roomValue);
      }
    } else {
      this.selectedRoomTypes = this.selectedRoomTypes.filter(type => type !== roomValue);
      this.submittedData = this.submittedData.filter(data => data.type !== roomValue);
    }
    this.updateDisabledRoomMap()
  }
  appliedFacilitiesSnapshot: { [key: string]: boolean } = {};
  isApplyToAllActive = false;
  appliedFacilityData: any = {};
  applyToAllRooms() {
    const currentFacilities = {};
    this.pgFacilitiesList.forEach(facility => {
      currentFacilities[facility.key] = this.form.get(facility.key).value;
    });
    this.selectedRoomTypes.forEach(roomType => {
      if (!this.roomFormData[roomType]) {
        this.roomFormData[roomType] = {};
      }
      this.roomFormData[roomType] = {
        ...this.roomFormData[roomType],
        ...currentFacilities
      };
    });
    this.isApplyToAllActive = true;
    this.appliedFacilitiesSnapshot = { ...currentFacilities };
  }
  setupFacilityChangeDetection() {
    this.pgFacilitiesList.forEach(facility => {
      this.form.get(facility.key).valueChanges.subscribe(() => {
        if (this.isApplyToAllActive) {
          const currentValue = this.form.get(facility.key).value;
          if (currentValue !== this.appliedFacilitiesSnapshot[facility.key]) {
            this.isApplyToAllActive = false;
          }
        }
      });
    });
  }
  areAllRoomsSynced(): boolean {
    return this.selectedRoomTypes.every(type => {
      if (type.startsWith('other_')) return true;
      const current = this.roomFormData[type]?.facilities || {};
      return Object.keys(this.appliedFacilitiesSnapshot).every(
        key => current[key] === this.appliedFacilitiesSnapshot[key]
      );
    });
  }
  amenitiesFilled = false;
  selectedAmenities: string[] = [];
  firstFormGroup: FormGroup;
  SecondFormGroup: FormGroup;
  ThirdFormGroup: FormGroup;
  ThirdFormGroupModal: FormGroup;
  FourthFormGroup: FormGroup;
  FifthFormGroup: FormGroup;
  photoForm: FormGroup;
  SeventhFormGroup: FormGroup;
  submitted = false;
  submittedFormSecond = false;
  submittedFormThree = false;
  submittedFormFourth = false;
  submittedFormFifth = false;
  submittedFormSeventh = false;
  CityName: any
  Property_Type_value: any;
  Property_Available_value: any;
  Property_City_value: any;
  Property_Locality_value: any;
  PG_Name_value: any;
  PG_Address_value: any;
  PG_PinCode_value: any;
  Listing_As_value: any;
  Landmarks_value: any;
  PG_Started_Year_value: any;
  PG_Avaliable_for: any;
  Food_Provided_value: any;
  Notice_Period_value: any;
  Best_Suit_For_value: any;
  Parking_Avaliable_value: any;
  Tenants_Must_Return_By_value: any;
  PG_Rules_value = [];
  First_Name_value: any;
  Last_Name_value: any;
  Email_Address_value: any;
  Phone_Number_value: any;
  PG_Food_value = [];
  PG_Food_Charges_value: any;
  Meal_Type_value: any;
  Parking_Type_value: any;
  pgServices_value = [];
  Commercial_Property_Type_value: any;
  Commercial_Property_Name_value: any;
  address: any;
  Commercial_Listing_As_value: any;
  Commercial_Postal_Code_value: any;
  Suited_For_value: any;
  Building_Type_value: any;
  Carpet_Area_value: any;
  carpet_area_type_value = 'sqfeet';
  Property_Status_value: any;
  Furnished_Type_value: any;
  Property_Customizable_value: any;
  Buitl_Up_Area_value: any;
  Buitl_Up_Area_type_value = 'sqfeet';
  Super_Buitl_Up_Area_value: any;
  Super_Buitl_Up_Area_type_value = 'sqfeet';
  Age_Of_Property_value: any;
  Age_Of_Property_Rent_value: any;
  Avaliable_Date_Rent_value: any;
  Possession_Date_value: any;
  Plot_Type_value: any;
  Plot_Length_value: any;
  Plot_Length_type_value = 'Meters(m)';
  Boundary_Wall_value: any;
  Plot_Dimension_value: any;
  Plot_Dimension_type_value = 'sqfeet';
  Plot_Breadth_value: any;
  Plot_Breadth_type_value = 'Meters(m)';
  Property_Facing_value: any;
  Total_Floors_value: any;
  Open_Sides_value: any;
  Any_Construction_Done_value: any;
  Covered_Parking_value: any;
  Washroom_Counts_value: any;
  Max_No_Of_Seats_value: any;
  Private_Washroom_value: any;
  Floor_NO_value: any;
  Floor_Allowed_value: any;
  Corner_Plot_value: any;
  Open_Parking_Count_value: any;
  Parking_Count_value: any;
  Is_Corner_Shop_value: any;
  Total_Cabin_Count_value: any;
  Shop_Facilities_value = []
  Warehouse_Facilities_value = []
  Office_Space_Facilities_value = []
  Plot_Facilities_value = []
  Total_Amount_value: any;
  Security_Deposit_value: any;
  total_lease_amount_value: any;
  Negotiable_value: any;
  Available_From_value: any;
  Lock_In_Period_value: any;
  MaintenanceCharges_Value: any;
  IncludedInRent_Value: any;
  Booking_Token_Amount_value: any;
  RERA_Number_value: any;
  Rent_Per_Month_value: any;
  Rent_Per_Month_ForLease_value: any;
  Rent_Per_Month_Shop_Lease_value: any;
  Rent_Per_Month_Shop_value: any;
  Only_Lease_value: any;
  Only_Lease_Shop_value: any;
  Maintenance_Amount_Plot_value: any;
  Only_Lease_Office_Sale_value: any;
  propertyDescription_value: any;
  seperator = true;
  formValidator() {
    this.firstFormGroup = this.fb.group({
      Property_Type: [''],
      Property_Available: [''],
      Property_City: [Validators.required],
      Property_Locality: ['', [Validators.required, this.validateInput11]],
    });
    this.SecondFormGroup = this.fb.group({
      PG_Name: ['', [Validators.required, this.alphanumericNotOnlyNumbers.bind(this)]],
      PG_Address: ['', [Validators.required, this.alphanumericNotOnlyNumbers.bind(this)]],
      PG_PinCode: ['', [Validators.pattern(/^[0-9]{6}$/)]],
      Listing_As: ['', [Validators.required]],
      PG_Started_Year: [''],
      Commercial_Property_Type: ['', [Validators.required]],
      Commercial_Property_Name: ['', [this.alphanumericNotOnlyNumbers.bind(this)]],
      Commercial_Property_Address: ['', [Validators.required, this.alphanumericNotOnlyNumbers.bind(this)]],
      Commercial_Listing_As: ['', [Validators.required]],
      Commercial_Postal_Code: ['', [Validators.pattern(/^[0-9]{6}$/)]],
      Landmarks: ['', [Validators.required, this.alphanumericNotOnlyNumbers.bind(this)]],
    });
    this.ThirdFormGroup = this.fb.group({
      Suited_For: ['', [Validators.required, this.alphanumericNotOnlyNumbers1.bind(this)]],
      Building_Type: ['', [Validators.required]],
      Carpet_Area: ['', [Validators.required, this.noAlphabetsAllowed.bind(this)]],
      carpet_area_type: ['sqfeet', [Validators.required]],
      Property_Status: ['', [Validators.required]],
      Furnished_Type: ['', [Validators.required]],
      Property_Customizable: ['', [Validators.required]],
      Buitl_Up_Area: ['', [this.noAlphabetsAllowed.bind(this)]],
      Buitl_Up_Area_type: ['sqfeet  ', [Validators.required]],
      Super_Buitl_Up_Area: ['', [this.noAlphabetsAllowed.bind(this)]],
      Super_Buitl_Up_Area_type: ['sqfeet', [Validators.required]],
      Age_Of_Property: ['', [Validators.required]],
      Age_Of_Property_Rent: ['', [Validators.required]],
      Avaliable_Date_Rent: ['', [Validators.required]],
      Possession_Date: ['', [Validators.required, this.futureDateValidator]],
      Plot_Type: ['', [Validators.required]],
      Plot_Length: ['', Validators.pattern(/^\d*$/)],
      Plot_Length_type: ['Meters'],
      Boundary_Wall: ['', [Validators.required]],
      Plot_Dimension: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      Plot_Dimension_type: ['sqfeet', [Validators.required]],
      Plot_Breadth: ['', Validators.pattern(/^\d*$/)],
      Plot_Breadth_type: ['Meters(m)'],
      Property_Facing: ['', [Validators.required]],
    });
    this.ThirdFormGroupModal = this.fb.group({
      roomCount: [''],
      OtherRoomCount: [''],
      rent: ['', Validators.required],
      deposit: ['', Validators.required],
      otherSharingLabel: ['', Validators.required],
      attachedBathroom: [false],
      tableFan: [false],
      television: [false],
      geyser: [false],
      mattress: [false],
      cupboard: [false],
      airConditioner: [false],
      tableChair: [false]
    });
    this.FourthFormGroup = this.fb.group({
      PG_Avaliable_for: ['', [Validators.required]],
      Food_Provided: ['', [Validators.required]],
      Notice_Period: [''],
      Best_Suit_For: ['', [Validators.required]],
      Parking_Avaliable: ['', [Validators.required]],
      Tenants_Must_Return_By: [''],
      PG_Rules: [[]],
      Total_Floors: ['', [Validators.required, this.floorValidator.bind(this)]],
      Floor_NO: ['', [this.floorValidator.bind(this)]],
      Any_Construction_Done: ['', [Validators.required]],
      Open_Sides: ['', [Validators.required, this.onlyNumbersAllowed.bind(this)]],
      Floor_Allowed: ['', [Validators.required, this.onlyNumbersAllowed.bind(this)]],
      Corner_Plot: ['', [Validators.required]],
      Plot_Facilities: [[], Validators.required],
      Covered_Parking: ['', [Validators.required, this.onlyNumbersAllowed.bind(this)]],
      Open_Parking_Count: ['', [Validators.required, this.onlyNumbersAllowed.bind(this)]],
      Washroom_Count: ['', [this.onlyNumbersAllowed.bind(this)]],
      Parking_Count: ['', [Validators.required, this.onlyNumbersAllowed.bind(this)]],
      Warehouse_Facilities: [[], Validators.required],
      Max_No_Of_Seats: ['', [this.onlyNumbersAllowed.bind(this)]],
      Total_Cabin_Count: ['', [this.onlyNumbersAllowed.bind(this)]],
      Office_Space_Facilities: [[], Validators.required],
      Private_Washroom: ['', [this.onlyNumbersAllowed.bind(this)]],
      Is_Corner_Shop: ['', [Validators.required]],
      Shop_Facilities: [[], Validators.required],
    },
      {
        validators: this.floorComparisonValidator
      }
    );
    this.FifthFormGroup = this.fb.group({
      Negotiable: ['', Validators.required],
      Available_From: ['', Validators.required],
      Total_Amount: ['', Validators.required],
      Booking_Token_Amount: ['', Validators.required],
      RERA_Number: [''],
      total_lease_amount: ['', [Validators.required, Validators.min(1000)]],
      Security_Deposit: ['', [Validators.required, Validators.pattern(/^[1-9]\d*$/), Validators.min(1000)]],

      Rent_Per_Month: ['', [Validators.required, Validators.pattern(/^[1-9]\d*$/), Validators.min(1000)]],

      Rent_Per_Month_Shop: ['', [Validators.required, Validators.pattern(/^[1-9]\d*$/), Validators.min(1000)]],
      Rent_Per_Month_ForLease: [''], // Disabled field
      Lock_In_Period: ['', Validators.required],
      MaintenanceCharges: ['', [Validators.required, Validators.pattern(/^[1-9]\d*$/), Validators.min(100)]],

      Maintenance_Amount_Plot: ['', [Validators.required, Validators.pattern(/^[1-9]\d*$/), Validators.min(100)]],


      IncludedInRent: [''],
      Only_Lease: [''],
      Only_Lease_Shop: [''],
      Only_Lease_Office_Sale: [''],
      Parking_Type: ['', Validators.required],
      PG_Food: [[], Validators.required],
      PG_Food_Charges: [''],
      Meal_Type: ['', Validators.required],
      pgServices: [[]],
      commonAmenities: [[], Validators.required]
    });
    this.photoForm = this.fb.group({
      images: [''],
      coverImage: ['', Validators.required],
    });
    this.SeventhFormGroup = this.fb.group({
      // First_Name: ['', [Validators.required, Validators.pattern(/^[A-Za-z ]+$/)]],
      // Last_Name: ['', [Validators.pattern(/^[A-Za-z ]+$/)]],
      // Email_Address: ['', [Validators.pattern(/^[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/)]],
      // Phone_Number: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      propertyDescription: ['', [Validators.required, Validators.pattern(/^(?!\s*$).+/)]]
    });
    this.createForm();
    this.initForm();
  }
  myAsyncValidator(control: AbstractControl) {
    return of(null); // or: return of({ myError: true }) if invalid
  }
  onSubmitOne() {
    if (this.router.url.includes('?Type=PG')) {
      this.Property_Type_value = 'Residential'
      // this.Property_Available_value = 3;
    } else if (this.router.url.includes('?Type=Commercial')) {
      this.Property_Type_value = 'Commercial'
    }
    this.submitted = true;
    if (this.firstFormGroup.invalid) {
      Object.keys(this.firstFormGroup.controls).forEach(key => {
        const control = this.firstFormGroup.get(key);
        if (control?.invalid) {
        }
      });
      return;
    }
    this.CityName = this.locationSelectedId;
    this.Property_Type_value = this.firstFormGroup.value.Property_Type;
    this.Property_Available_value = this.firstFormGroup.value.Property_Available;
    this.Property_City_value = this.firstFormGroup.value.Property_City;
    this.Property_Locality_value = this.firstFormGroup.value.Property_Locality;
    this.dragAndDrop()
    this.goNext();
  }
  get firstForm() {
    return this.firstFormGroup.controls;
  }
  get FourthForm() {
    return this.FourthFormGroup.controls;
  }
  scrollToSection(section: ElementRef) {
    section.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }
  setValidators(fields: string[]) {
    fields.forEach(field => {
      if (
        ['PG_Name', 'PG_Address', 'Landmarks', 'Commercial_Property_Address'].includes(field)
      ) {
        this.SecondFormGroup.get(field)?.setValidators([
          Validators.required,
          this.alphanumericNotOnlyNumbers.bind(this)
        ]);
      } else if (
        ['Commercial_Property_Name'].includes(field)
      ) {
        this.SecondFormGroup.get(field)?.setValidators([
          this.alphanumericNotOnlyNumbers.bind(this)
        ]);
      } else if (['PG_PinCode', 'Commercial_Postal_Code'].includes(field)) {
        this.SecondFormGroup.get(field)?.setValidators([
          Validators.pattern(/^[0-9]{6}$/)
        ]);
      } else {
        this.SecondFormGroup.get(field)?.setValidators([Validators.required]);
      }
      this.SecondFormGroup.get(field)?.updateValueAndValidity();
    });
  }
  clearAllValidators() {
    Object.keys(this.SecondFormGroup.controls).forEach(key => {
      this.SecondFormGroup.get(key)?.clearValidators();
      this.SecondFormGroup.get(key)?.updateValueAndValidity();
    });
  }
  applyConditionalValidation() {
    this.clearAllValidators();
    if (this.Property_Type === 'Residential_Pg') {
      this.setValidators([
        'PG_Name', 'PG_Address', 'PG_PinCode', 'Listing_As',
        'Landmarks'
      ]);
    }
    if (this.Property_Type === 'Commercial') {
      this.setValidators([
        'Commercial_Property_Type', 'Commercial_Property_Name',
        'Commercial_Property_Address', 'Commercial_Listing_As',
        'Commercial_Postal_Code', 'Landmarks'
      ]);
    }
  }
  onSubmitTwo() {
    this.submittedFormSecond = true;
    this.applyConditionalValidation(); // Ensure validation is up to date
    if (this.SecondFormGroup.invalid) return;
    const form = this.SecondFormGroup.value;
    if (this.Property_Type === 'Residential_Pg') {
      this.PG_Name_value = form.PG_Name;
      this.PG_Address_value = form.PG_Address;
      this.PG_PinCode_value = form.PG_PinCode;
      this.Listing_As_value = form.Listing_As;
      this.Landmarks_value = form.Landmarks;
      this.PG_Started_Year_value = form.PG_Started_Year;
    }
    if (this.Property_Type === 'Commercial') {
      this.Commercial_Property_Type_value = form.Commercial_Property_Type;
      this.Commercial_Property_Name_value = form.Commercial_Property_Name;
      this.address = form.Commercial_Property_Address;
      this.Commercial_Listing_As_value = form.Commercial_Listing_As;
      this.Commercial_Postal_Code_value = form.Commercial_Postal_Code;
      this.Landmarks_value = form.Landmarks;
    }
    this.goNext();
  }
  get SecondForm() {
    return this.SecondFormGroup.controls;
  }
  setThirdValidators(fields: string[]) {
    fields.forEach(field => {
      if (['Carpet_Area', 'Plot_Breadth_type', 'Plot_Length_type'].includes(field)) {
        this.ThirdFormGroup.get(field)?.setValidators([
          Validators.required,
          this.noAlphabetsAllowed.bind(this)
        ]);
      } else if (['Buitl_Up_Area'].includes(field)) {
        this.ThirdFormGroup.get(field)?.setValidators([
          this.noAlphabetsAllowed.bind(this)
        ]);
      }
      else if (field === 'Plot_Dimension') {
        this.ThirdFormGroup.get(field)?.setValidators([
          Validators.required,
          Validators.pattern(/^[0-9]+$/) // number x number or number * number
        ]);
      }
      else if (['Plot_Breadth', 'Plot_Length'].includes(field)) {
        this.ThirdFormGroup.get(field)?.setValidators([
          this.noAlphabetsAllowed.bind(this)
        ]);
      } else if (
        ['Suited_For'].includes(field) && this.Commercial_Type == 'others') {

        this.ThirdFormGroup.get(field)?.setValidators([

          Validators.required,

          this.alphanumericNotOnlyNumbers1.bind(this)

        ]);

      }
      else {
        this.ThirdFormGroup.get(field)?.setValidators([Validators.required]);
      }
      this.ThirdFormGroup.get(field)?.updateValueAndValidity();
    });
  }
  clearThirdValidators() {
    Object.keys(this.ThirdFormGroup.controls).forEach(key => {
      this.ThirdFormGroup.get(key)?.clearValidators();
      this.ThirdFormGroup.get(key)?.updateValueAndValidity();
    });
  }
  applyThirdFormValidation() {
    this.clearThirdValidators();
    const type = this.Commercial_Type;
    if (type === 'officeSpace' || type === 'shopShowroom' || type === 'warehouse') {
      this.setThirdValidators(['Suited_For', 'Building_Type', 'Carpet_Area',
        'Furnished_Type', 'Property_Customizable']);
      if (this.commercialOthers == 'others') {
        this.ThirdFormGroup.get('Suited_For')?.setValidators([Validators.required,
        Validators.pattern(/^(?=.*[A-Za-z])[A-Za-z ]+$/)
        ]);
        this.ThirdFormGroup.get('Suited_For')?.updateValueAndValidity();
      }
      if (this.property_for === 'sale') {
        this.setThirdValidators(['Property_Status']);
      }
      if (type === 'officeSpace') {
        this.setThirdValidators(['Buitl_Up_Area']);
      }
      // else {
      //   this.setThirdValidators(['Super_Buitl_Up_Area']);
      // }
    }
    else if (type === 'Plot') {
      this.setThirdValidators(['Plot_Type', 'Boundary_Wall', 'Plot_Dimension', 'Property_Facing']);
      this.ThirdFormGroup.get('Plot_Length')?.setValidators([
        Validators.pattern(/^[1-9]\d*$/)   // only numbers, >0
      ]);
      this.ThirdFormGroup.get('Plot_Length')?.updateValueAndValidity();
      this.ThirdFormGroup.get('Plot_Breadth')?.setValidators([
        Validators.pattern(/^[1-9]\d*$/)   // only numbers, >0
      ]);
      this.ThirdFormGroup.get('Plot_Breadth')?.updateValueAndValidity();
    }
    if (this.property_for === 'rent') {
      this.setThirdValidators(['Age_Of_Property_Rent']);
      this.setThirdValidators(['Avaliable_Date_Rent']);
    }
    if (type === 'Plot' && this.property_for === 'sale') {
      this.setThirdValidators(['Age_Of_Property_Rent']);
    }
    if (this.propertyStatus === 'Ready_To_Move' && this.property_for === 'sale') {
      this.setThirdValidators(['Age_Of_Property']);
    } else if (this.propertyStatus === 'Under_Construction' && this.property_for === 'sale') {
      this.setThirdValidators(['Possession_Date']);
    }
  }
  othersDismissedWithoutSubmit = false;
  onSubmitThree() {
    this.submittedFormThree = true;
    this.applyThirdFormValidation(); // ✅ important
    this.ThirdFormGroup.markAllAsTouched();
    if (this.ThirdFormGroup.invalid) {
      this.logDetailedErrors();
      return;
    }
    const form = this.ThirdFormGroup.value;
    this.Suited_For_value = form.Suited_For;
    this.Building_Type_value = form.Building_Type;
    this.Carpet_Area_value = form.Carpet_Area;
    this.carpet_area_type_value = form.carpet_area_type;
    this.Property_Status_value = form.Property_Status;
    this.Furnished_Type_value = form.Furnished_Type;
    this.Property_Customizable_value = form.Property_Customizable;
    this.Buitl_Up_Area_value = form.Buitl_Up_Area;
    this.Buitl_Up_Area_type_value = form.Buitl_Up_Area_type;
    this.Super_Buitl_Up_Area_value = form.Super_Buitl_Up_Area;
    this.Super_Buitl_Up_Area_type_value = form.Super_Buitl_Up_Area_type;
    this.Age_Of_Property_value = form.Age_Of_Property;
    if (this.property_for === 'rent') {
      this.Age_Of_Property_Rent_value = form.Age_Of_Property_Rent;
      this.Avaliable_Date_Rent_value = form.Avaliable_Date_Rent;

    }
    if (this.Commercial_Type && this.property_for === 'sale') {
      this.Age_Of_Property_Rent_value = form.Age_Of_Property_Rent;
    }
    this.Possession_Date_value = form.Possession_Date;
    this.Plot_Type_value = form.Plot_Type;
    this.Plot_Length_value = form.Plot_Length;
    this.Plot_Length_type_value = form.Plot_Length_type;
    this.Boundary_Wall_value = form.Boundary_Wall;
    this.Plot_Dimension_value = form.Plot_Dimension;
    this.Plot_Dimension_type_value = form.Plot_Dimension_type;
    this.Plot_Breadth_value = form.Plot_Breadth;
    this.Plot_Breadth_type_value = form.Plot_Breadth_type;
    this.Property_Facing_value = form.Property_Facing;
    if (this.ThirdFormGroup.get('Property_Status')?.value === '1') {
      this.Possession_Date_value = '';
    } else if (this.ThirdFormGroup.get('Property_Status')?.value === '2') {
      this.Age_Of_Property_value = '';
    }
    this.goNext();
  }
  private logDetailedErrors() {
    Object.keys(this.ThirdFormGroup.controls).forEach(key => {
      const control = this.ThirdFormGroup.get(key);
      if (control?.errors) {
        console.error(`Field: ${key}`, {
          errors: control.errors,
          value: control.value
        });
      }
    });
  }
  // onCommercialTypeChange(type: string) {
  //   this.Commercial_Type = type;
  //   this.applyThirdFormValidation(); // update validations
  // }
  get ThirdForm() {
    return this.ThirdFormGroup.controls;
  }
  setFourthValidators(fields: string[]) {
    fields.forEach(field => {
      if (
        [
          'Total_Floors',
          'Open_Parking_Count',
          'Covered_Parking',
          'Parking_Count',
          'Floor_Allowed',
          'Open_Sides',
        ].includes(field)
      ) {
        this.FourthFormGroup.get(field)?.setValidators([
          Validators.required,
          this.onlyNumbersAllowed.bind(this)
        ]);
      } else if (
        [
          'Private_Washroom',
          'Washroom_Count',
          'Total_Cabin_Count',
          'Max_No_Of_Seats',
        ].includes(field)
      ) {
        this.FourthFormGroup.get(field)?.setValidators([
          this.onlyNumbersAllowed.bind(this)
        ]);
      } else {
        this.FourthFormGroup.get(field)?.setValidators([Validators.required]);
      }
      this.FourthFormGroup.get(field)?.updateValueAndValidity();
    });
  }
  clearFourthValidators() {
    Object.keys(this.FourthFormGroup.controls).forEach(key => {
      this.FourthFormGroup.get(key)?.clearValidators();
      this.FourthFormGroup.get(key)?.updateValueAndValidity();
    });
  }
  applyFourthFormValidation() {
    this.clearFourthValidators();
    if (this.Property_Type === 'Residential_Pg') {
      this.setFourthValidators([
        'PG_Avaliable_for',
        'Food_Provided',
        'Best_Suit_For',
        'Parking_Avaliable',
      ]);
    }
    if (this.Property_Type === 'Commercial') {
      const type = this.Commercial_Type;
      if (['officeSpace', 'shopShowroom', 'warehouse'].includes(type)) {
        this.setFourthValidators(['Total_Floors']);
      }
      if (type === 'Plot') {
        this.setFourthValidators([
          'Any_Construction_Done',
          'Open_Sides',
          'Floor_Allowed',
          'Corner_Plot',
          'Plot_Facilities'
        ]);
      }
      if (['officeSpace', 'shopShowroom'].includes(type)) {
        this.setFourthValidators(['Covered_Parking', 'Open_Parking_Count']);
      }
      if (type === 'warehouse') {
        this.setFourthValidators(['Washroom_Count', 'Parking_Count', 'Warehouse_Facilities']);
      }
      if (type === 'officeSpace') {
        this.setFourthValidators(['Max_No_Of_Seats', 'Total_Cabin_Count', 'Office_Space_Facilities']);
      }
      if (type === 'shopShowroom') {
        this.setFourthValidators(['Private_Washroom', 'Is_Corner_Shop', 'Shop_Facilities']);
      }
    }
  }
  onSubmitFourth() {
    this.submittedFormFourth = true;
    this.applyFourthFormValidation(); // ✅ Apply conditions
    this.FourthFormGroup.markAllAsTouched();
    if (this.FourthFormGroup.invalid) {
      return;
    }
    const form = this.FourthFormGroup.value;
    if (this.Property_Type === 'Residential_Pg') {
      this.PG_Avaliable_for = form.PG_Avaliable_for;
      this.Food_Provided_value = form.Food_Provided;
      this.Notice_Period_value = form.Notice_Period;
      this.Best_Suit_For_value = form.Best_Suit_For;
      this.Parking_Avaliable_value = form.Parking_Avaliable;
      this.Tenants_Must_Return_By_value = form.Tenants_Must_Return_By;
      this.PG_Rules_value = form.PG_Rules;
    }
    const type = this.Commercial_Type;
    if (['officeSpace', 'shopShowroom', 'warehouse'].includes(type)) {
      this.Total_Floors_value = form.Total_Floors;
      this.Floor_NO_value = form.Floor_NO;
    }
    if (type === 'Plot') {
      this.Any_Construction_Done_value = form.Any_Construction_Done;
      this.Open_Sides_value = form.Open_Sides;
      this.Floor_Allowed_value = form.Floor_Allowed;
      this.Corner_Plot_value = form.Corner_Plot;
      this.Plot_Facilities_value = form.Plot_Facilities;
    }
    if (['officeSpace', 'shopShowroom'].includes(type)) {
      this.Covered_Parking_value = form.Covered_Parking;
      this.Open_Parking_Count_value = form.Open_Parking_Count;
    }
    if (type === 'warehouse') {
      this.Washroom_Counts_value = form.Washroom_Count;
      this.Parking_Count_value = form.Parking_Count;
      this.Warehouse_Facilities_value = form.Warehouse_Facilities;
    }
    if (type === 'officeSpace') {
      this.Max_No_Of_Seats_value = form.Max_No_Of_Seats;
      this.Total_Cabin_Count_value = form.Total_Cabin_Count;
      this.Office_Space_Facilities_value = form.Office_Space_Facilities;
    }
    if (type === 'shopShowroom') {
      this.Private_Washroom_value = form.Private_Washroom;
      this.Is_Corner_Shop_value = form.Is_Corner_Shop;
      this.Shop_Facilities_value = form.Shop_Facilities;
    }

    // this.updateFacilityLabelsCommercial()
    if (this.Property_Type === 'Residential_Pg') {
      this.updateRoomSummaryLabels()
      this.updatePgRuleLabels();
    }

    if (this.Property_Type == 'Commercial') {

      this.updateFacilityLabels();

    }
    this.goNext();
  }
  setFifthValidators(fields: string[]) {
    const minValueFields = [
      'Total_Amount',
      'Security_Deposit',
      'Rent_Per_Month',
      'Rent_Per_Month_Shop',
      'total_lease_amount'
    ];
    const BookingTokenAmount = [
      'Booking_Token_Amount',
    ];
    const threeDigitValue = [
      'Maintenance_Amount_Plot',
      'MaintenanceCharges',
    ];

    // Custom validator that allows 0 but enforces min/max for others
    const customMinMaxValidator = (min: number, max: number) => {
      return (control: any) => {
        const value = control.value;
        if (value === null || value === undefined || value === '') return null; // ignore empty
        if (value === 0) return null; // allow single 0
        if (value < min) return { min: { requiredMin: min, actual: value } };
        if (value > max) return { max: { requiredMax: max, actual: value } };
        return null;
      };
    };

    fields.forEach(field => {
      const control = this.FifthFormGroup.get(field);
      if (control) {
        if (minValueFields.includes(field)) {
          control.setValidators([
            Validators.required,
            customMinMaxValidator(1000, 1000000000)
          ]);
        } else if (threeDigitValue.includes(field)) {
          control.setValidators([
            Validators.required,
            customMinMaxValidator(100, 10000000)
          ]);
        } else if (BookingTokenAmount.includes(field)) {
          control.setValidators([
            customMinMaxValidator(100, 10000000)
          ]);
        } else {
          control.setValidators([Validators.required]);
        }
        control.updateValueAndValidity();
      }
    });
  }
  clearFifthValidators() {
    Object.keys(this.FifthFormGroup.controls).forEach(key => {
      const control = this.FifthFormGroup.get(key);
      if (control) {
        control.clearValidators();
        control.updateValueAndValidity();
      }
    });
  }
  positiveNumberValidator = Validators.pattern(/^[1-9]\d*$/);
  applyFifthFormValidation() {
    this.clearFifthValidators();
    const type = this.Commercial_Type;
    const propertyFor = this.property_for;
    const lease = this.forlease;
    if (
      this.Property_Type === 'Commercial' &&
      ['Plot', 'shopShowroom', 'officeSpace', 'warehouse'].includes(this.Commercial_Type) &&
      ['rent', 'sale'].includes(this.property_for)
    ) {
      this.setFifthValidators(['Negotiable']);
    }
    if (propertyFor === 'sale') {
      if (['shopShowroom', 'officeSpace', 'warehouse', 'Plot'].includes(type)) {
        this.setFifthValidators(['Total_Amount', 'Booking_Token_Amount']);
      }
      if (type === 'Plot') {
        this.setFifthValidators(['Booking_Token_Amount']);
      }
      if (type === 'shopShowroom') {
        this.setFifthValidators(['Booking_Token_Amount']);
      }
    }
    if (propertyFor === 'rent') {
      this.setFifthValidators(['Lock_In_Period']);
      if (type == 'Plot' && propertyFor === 'sale') {
        this.setFifthValidators(['Available_From']);
      }
      if (lease) {
        this.setFifthValidators(['total_lease_amount']);
      } else {
        this.setFifthValidators(['Security_Deposit']);
        if (type === 'Plot') this.setFifthValidators(['Rent_Per_Month']);
        if (['shopShowroom', 'officeSpace', 'warehouse'].includes(type)) {
          this.setFifthValidators(['Rent_Per_Month_Shop']);
        }
      }
      if (type === 'officeSpace') {
        this.setFifthValidators(['MaintenanceCharges']);
      }
      if (['Plot', 'shopShowroom', 'warehouse'].includes(type)) {
        this.setFifthValidators(['Maintenance_Amount_Plot']);
      }
    }
    if (this.Property_Type === 'Residential_Pg' && propertyFor === 'pg') {
      if (this.parkingAvaliable) this.setFifthValidators(['Parking_Type']);
      if (this.foodAvaliable) {
        this.setFifthValidators(['PG_Food', 'Meal_Type']);
      }
      this.setFifthValidators(['commonAmenities']);
    }
  }
  onSubmitFifth() {
    this.submittedFormFifth = true;
    this.applyFifthFormValidation();
    this.FifthFormGroup.markAllAsTouched();
    const isPg = this.Property_Type === 'Residential_Pg' && this.property_for === 'pg';
    const isCommercial = this.Property_Type === 'Commercial';
    const hasAmenity = this.selectedAmenities.length > 0;
    if ((isPg || isCommercial) && !hasAmenity && this.Commercial_Type != 'Plot') {
      this.amenitiesModalError = true;
      this.FifthFormGroup.get('commonAmenities')?.setErrors({ required: true });
      this.FifthFormGroup.get('commonAmenities')?.markAsTouched();
      this.openAmenitiesModal();
      return;
    }
    if (hasAmenity) {
      this.amenitiesModalError = false;
      this.FifthFormGroup.get('commonAmenities')?.setValue(this.selectedAmenities);
      this.FifthFormGroup.get('commonAmenities')?.setErrors(null);
      this.FifthFormGroup.get('commonAmenities')?.updateValueAndValidity();
    }
    if (this.FifthFormGroup.invalid) {
      Object.keys(this.FifthFormGroup.controls).forEach(key => {
        const control = this.FifthFormGroup.get(key);
        if (control?.invalid) {

        }
      });
      return;
    }
    const form = this.FifthFormGroup.value;
    if (isPg) {
      this.PG_Food_value = form.PG_Food;
      this.PG_Food_Charges_value = form.PG_Food_Charges;
      this.Meal_Type_value = form.Meal_Type;
      this.Parking_Type_value = form.Parking_Type;
      this.pgServices_value = form.pgServices;
    }
    const type = this.Commercial_Type;
    const forRent = this.property_for === 'rent';
    const forSale = this.property_for === 'sale';
    if (type === 'shopShowroom' || this.Commercial_Type == 'officeSpace' || this.Commercial_Type == 'warehouse' || this.Commercial_Type == 'Plot' && forSale) {
      this.Total_Amount_value = form.Total_Amount;
      if (this.Total_Amount_value == null || undefined) {
        this.Total_Amount_value = '';
      }
    }
    if ((type === 'Plot' || type === 'shopShowroom' || type === 'warehouse') && forRent) {
      if (!this.forlease) {
        this.Security_Deposit_value = form.Security_Deposit;
        if (type === 'warehouse') {
          this.Rent_Per_Month_Shop_value = form.Rent_Per_Month_Shop;
          this.Maintenance_Amount_Plot_value = form.Maintenance_Amount_Plot;
          this.IncludedInRent_Value = form.IncludedInRent;
        }
      } else {
        this.total_lease_amount_value = form.total_lease_amount;
      }
      this.Lock_In_Period_value = form.Lock_In_Period;
      this.Negotiable_value = form.Negotiable;
      if (type === 'Plot') {
        this.Rent_Per_Month_value = form.Rent_Per_Month;
        this.Rent_Per_Month_ForLease_value = form.Rent_Per_Month_ForLease;
        this.Only_Lease_value = form.Only_Lease;
        this.Maintenance_Amount_Plot_value = form.Maintenance_Amount_Plot;
        this.IncludedInRent_Value = form.IncludedInRent;
      }
      if (type === 'shopShowroom' || type === 'warehouse') {
        this.Rent_Per_Month_Shop_value = form.Rent_Per_Month_Shop;
        this.Only_Lease_Shop_value = form.Only_Lease_Shop;
        this.Maintenance_Amount_Plot_value = form.Maintenance_Amount_Plot;
        this.IncludedInRent_Value = form.IncludedInRent;
      }
    }
    if (this.Commercial_Type == 'Plot' && this.property_for == 'sale') {
      this.Available_From_value = form.Available_From;
    }
    if ((type === 'Plot' || type === 'shopShowroom' || type === 'warehouse') && (forSale)) {
      this.RERA_Number_value = form.RERA_Number;
    }
    if (
      (this.Commercial_Type == 'Plot' ||
        this.Commercial_Type == 'shopShowroom' || this.Commercial_Type == 'warehouse' ||
        this.Commercial_Type == 'officeSpace') &&
      this.property_for === 'sale' &&
      this.Property_Type === 'Commercial'
    ) {
      this.Booking_Token_Amount_value = form.Booking_Token_Amount;
    }
    if (type === 'officeSpace' && forRent) {
      if (!this.forlease) {
        this.Security_Deposit_value = form.Security_Deposit;
        this.Rent_Per_Month_Shop_value = form.Rent_Per_Month_Shop;
      } else {
        this.total_lease_amount_value = form.total_lease_amount;
      }
      this.Lock_In_Period_value = form.Lock_In_Period;
      this.MaintenanceCharges_Value = form.MaintenanceCharges;
      this.IncludedInRent_Value = form.IncludedInRent;
      this.Only_Lease_value = form.Only_Lease;
    }
    if (
      (this.Commercial_Type === 'Plot' || this.Commercial_Type === 'shopShowroom' || this.Commercial_Type === 'officeSpace' || this.Commercial_Type === 'warehouse') &&
      (this.property_for === 'sale' || this.property_for === 'rent') &&
      this.Property_Type === 'Commercial'
    ) {
      this.Negotiable_value = form.Negotiable;
    }
    if (this.FourthFormGroup.get('Parking_Avaliable')?.value === '2') {
      this.Parking_Type_value = '';
    }

    if (this.Only_Lease_value == '1' && (this.Commercial_Type == 'Plot' || this.Commercial_Type == 'officeSpace') && this.property_for == 'rent' && this.Property_Type == 'Commercial') {
      this.Security_Deposit_value = '';
      this.Rent_Per_Month_Shop_value = '';
      this.Rent_Per_Month_value = ''
      this.Rent_Per_Month_ForLease_value = ''
    } else
      if (this.Only_Lease_value == '2' && (this.Commercial_Type == 'Plot' || this.Commercial_Type == 'officeSpace') && this.property_for == 'rent' && this.Property_Type == 'Commercial') {
        this.total_lease_amount_value = '';
      }
    if (this.Only_Lease_Shop_value == '1' && (this.Commercial_Type == 'shopShowroom' || this.Commercial_Type == 'warehouse') && this.property_for == 'rent' && this.Property_Type == 'Commercial') {
      this.Security_Deposit_value = '';
      this.Rent_Per_Month_Shop_value = '';
      this.Rent_Per_Month_value = ''
      this.Rent_Per_Month_ForLease_value = ''
    } else
      if (this.Only_Lease_Shop_value == '2' && (this.Commercial_Type == 'shopShowroom' || this.Commercial_Type == 'warehouse') && this.property_for == 'rent' && this.Property_Type == 'Commercial') {
        this.total_lease_amount_value = '';
      }
    // if (this.IncludedInRent_Value) {
    //   this.IncludedInRent_Value = '1'
    // } else {
    //   this.IncludedInRent_Value = '2'
    // }
    this.updateUniqueSubmittedFacilities();
    this.updatePgServiceLabels()
    this.goNext(); // ✅ Go to the next step
  }
  get FifthForm() {
    return this.FifthFormGroup.controls;
  }
  onSubmitSeventh() {
    this.submittedFormSeventh = true;
    this.SeventhFormGroup.markAllAsTouched();
    if (this.SeventhFormGroup.invalid) {
      Object.keys(this.SeventhFormGroup.controls).forEach(key => {
        const control = this.SeventhFormGroup.get(key);
        if (control?.invalid) {

        }
      });
      return;
    }
    this.First_Name_value = this.SeventhFormGroup.value.First_Name;
    this.Last_Name_value = this.SeventhFormGroup.value.Last_Name;
    this.Email_Address_value = this.SeventhFormGroup.value.Email_Address;
    this.Phone_Number_value = this.SeventhFormGroup.value.Phone_Number;
    this.propertyDescription_value = this.SeventhFormGroup.value.propertyDescription;
    // var number = localStorage.getItem('enquiryNumber')
    // if (number == this.Phone_Number_value) {
    //   localStorage.setItem('enquiryNumber', this.Phone_Number_value);
    // } else {
    //   localStorage.removeItem("loginID");
    //   localStorage.setItem('enquiryNumber', this.Phone_Number_value);
    // }
    this.dimensionType()
    this.updateDisplayRoomTypes();
    this.goNext();
  }
  get SeventhForm() {
    return this.SeventhFormGroup.controls;
  }
  roomCategoryError = false;
  facilityError = false;
  submittedModal = false;
  onSubmitThreeModal() {
    this.submittedModal = true;
    if (this.selectedRoomTypes.length === 0 && this.submittedData.length === 0) {
      this.roomCategoryError = true;
      return;
    }
    this.roomCategoryError = false;
    const existingOtherTypes = this.submittedData
      .filter(data => data.baseType === '13')
      .map(data => data.type); // already submitted other_... IDs
    const newSelectedTypes: string[] = [];
    this.selectedRoomTypes.forEach(type => {
      if (type === '13') {
        const existing = this.selectedRoomTypes.find(t =>
          existingOtherTypes.includes(t)
        );
        if (!existing) {
          const newOtherId = this.generateOtherRoomId();
          newSelectedTypes.push(newOtherId);
        }
      } else {
        newSelectedTypes.push(type);
      }
    });
    this.selectedRoomTypes = newSelectedTypes;
    this.selectedRoomTypes = Array.from(new Set(this.selectedRoomTypes));
    const modalRoomOrder = ['1', '2', '3', '4'];
    this.selectedRoomTypes.sort((a, b) => {
      const indexA = modalRoomOrder.indexOf(a);
      const indexB = modalRoomOrder.indexOf(b);
      if (indexA !== -1 && indexB !== -1) return indexA - indexB;
      if (indexA !== -1) return -1;
      if (indexB !== -1) return 1;
      return 0;
    });
    const unfilledType = this.selectedRoomTypes.find(
      type => !this.submittedData.some(data => data.type === type)
    );
    if (unfilledType) {
      this.openRoomTypeModals(unfilledType);
      this.form.markAllAsTouched();
      const hasFacility = [
        'attachedBathroom', 'geyser', 'mattress', 'cupboard',
        'television', 'tableFan', 'airConditioner', 'tableChair'
      ].some(field => this.form.get(field)?.value);
      this.facilityError = !hasFacility;
      return;
    }
    this.submittedData.forEach(room => {
      if (room.type.startsWith('other_') && room.label === room.type) {
        const match = this.roomOtherTypes.find(item =>
          this.usedOtherSharings.includes(item.value)
        );
        if (match) {
          room.label = match.label;
        }
      }
    });
    this.roomSummaryData = this.submittedData.map(room => {
      let roomValue = '';

      if (room.baseType === '13') {
        const matchedRoom = this.roomOtherTypes.find(item => item.label.trim() === room.label.trim());
        roomValue = matchedRoom ? matchedRoom.value : '';
      } else {
        const matchedRoom = this.roomTypes.find(item => item.label.trim() === room.label.trim());
        roomValue = matchedRoom ? matchedRoom.value : String(room.type || '');
      }

      return {
        roomType: roomValue,
        roomRent: room.rent,
        securityDeposit: room.deposit,
        // ✅ For Others → prefer OtherRoomCount, otherwise use roomCount
        roomCount: room.baseType === '13' ? (room.OtherRoomCount ?? '') : (room.roomCount ?? ''),
        roomFacilities: Object.keys(room.facilities)
          .filter(key => this.pgFacilitiesList.some(f => f.key === key) && room.facilities[key])
      };
    });

    this.updateRoomSummaryLabels()
    this.facilityError = false;
    this.roomCategoryError = false;
    this.submittedModal = false;
    const submittedRoomTypes = this.submittedData.map(d => d.type);
    const unsubmittedRoomTypes = this.selectedRoomTypes.filter(
      type => !this.submittedData.some(data => data.type === type)
    );
    const activeRoom = unsubmittedRoomTypes[0];
    this.minimumRent = this.getMinimumRent(); // Call after submission
    this.submittedData = [...this.submittedData];
    this.getOrderedSubmittedData();
    this.orderedByRoomType = [...this.orderedByRoomType];

    this.goNext();
  }
  roomOrder = [
    'Private Room',
    'Two sharing',
    'Three Sharing',
    'Four Sharing',
    'Five Sharing',
    'Six Sharing',
    'Seven Sharing',
    'Eight Sharing',
    'Nine Sharing',
    'Ten Sharing'
  ];
  sortSubmittedData() {
    const modalRoomOrder = ['1', '2', '3', '4']; // Add '13' if needed
    this.selectedRoomTypes.sort((a, b) => {
      const isOtherA = a.startsWith('other_');
      const isOtherB = b.startsWith('other_');
      if (isOtherA && !isOtherB) return 1;
      if (!isOtherA && isOtherB) return -1;
      const orderA = modalRoomOrder.indexOf(a);
      const orderB = modalRoomOrder.indexOf(b);
      return orderA - orderB;
    });
  }
  sortSelectedRoomTypes() {
    const modalRoomOrder = ['1', '2', '3', '4']; // Add '13' if needed
    this.selectedRoomTypes.sort((a, b) => {
      const isOtherA = a.startsWith('other_');
      const isOtherB = b.startsWith('other_');
      if (isOtherA && !isOtherB) return 1;
      if (!isOtherA && isOtherB) return -1;
      const orderA = modalRoomOrder.indexOf(a);
      const orderB = modalRoomOrder.indexOf(b);
      return orderA - orderB;
    });
  }
  usedOtherSharings: string[] = []; // Tracks disabled "Other" sharing options
  generateOtherRoomId(): string {
    return `other_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
  }
  isOtherRoom(type: string): boolean {
    return type.startsWith('other_') || type === '13'; // '6' is the backend value for Others
  }
  atLeastOneFacilityValidator(form: FormGroup): ValidationErrors | null {
    const hasFacility = this.pgFacilitiesList.some(facility =>
      form.get(facility.key)?.value === true
    );
    return hasFacility ? null : { noFacility: true };
  }
  watchFacilityChanges() {
    this.pgFacilitiesList.forEach(facility => {
      this.form.get(facility.key).valueChanges.subscribe(() => {
        this.checkFacilityConsistency();
      });
    });
  }
  checkFacilityConsistency() {
    if (!this.isApplyToAllActive) return;
    const currentFacilities = {};
    this.pgFacilitiesList.forEach(facility => {
      currentFacilities[facility.key] = this.form.get(facility.key).value;
    });
    const isConsistent = this.pgFacilitiesList.every(facility => {
      return currentFacilities[facility.key] === this.appliedFacilitiesSnapshot[facility.key];
    });
    if (!isConsistent) {
      this.isApplyToAllActive = false;
    }
  }
  formatRupees(controlName: string): void {
    const control = this.form.get(controlName);
    let value = control?.value?.toString().replace(/,/g, '');
    if (!isNaN(value) && value !== '') {
      const formatted = Number(value).toLocaleString('en-IN');
      control?.setValue(formatted, { emitEvent: false });
    }
  }
  // onCheckboxChange(event: any) {
  //   const pgServices = this.FifthFormGroup.get('pgServices') as FormArray;
  //   const value = event.target.value;
  //   if (event.target.checked) {
  //     pgServices.push(new FormControl(value));
  //   } else {
  //     const index = pgServices.controls.findIndex(ctrl => ctrl.value === value);
  //     if (index !== -1) {
  //       pgServices.removeAt(index);
  //     }
  //   }
  //   this.updatePgServiceLabels()
  // }

  onCheckboxChange(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    const value = checkbox.value;
    let currentValues: string[] = this.FifthFormGroup.get('pgServices')?.value || [];
    if (checkbox.checked) {
      if (!currentValues.includes(value)) {
        currentValues = [...currentValues, value];  // add service
      }
    } else {
      currentValues = currentValues.filter(v => v !== value); // remove service
    }
    this.FifthFormGroup.get('pgServices')?.setValue(currentValues);
    this.updatePgServiceLabels();
  }

  isServiceSelected(key: string): boolean {
    return this.FifthFormGroup.get('pgServices')?.value.includes(key);
  }
  foodLabels: string[] = [];
  updateFoodLabels(): void {
    this.foodLabels = this.PG_Food_value.map(key => {
      const item = this.pgFoodList.find(m => m.key === key);
      return item ? item.label : key;
    });
  }
  PG_Food_labels: string[] = [];
  onPGFoodChange(foodKey: string, isChecked: boolean) {
    let currentValue = this.FifthFormGroup.get('PG_Food')?.value || [];
    if (isChecked) {
      if (!currentValue.includes(foodKey)) {
        currentValue = [...currentValue, foodKey];
      }
    } else {
      currentValue = currentValue.filter((f: string) => f !== foodKey);
    }
    this.FifthFormGroup.get('PG_Food')?.setValue(currentValue);
    this.PG_Food_value = currentValue;
    this.PG_Food_labels = this.PG_Food_value.map(foodKey => {
      const meal = this.pgFoodList.find(m => m.key === foodKey);
      return meal ? meal.label : '';
    });
    this.updateFoodLabels();
  }
  amenitiesModalError: boolean = false; // shows error inside modal
  amenitiesTouched: boolean = false; // shows error outside when trying to skip
  amenitiesError: boolean = false;
  saveAmenities() {
    if (this.selectedAmenities.length === 0) {
      this.amenitiesModalError = true;
      this.FifthFormGroup.get('commonAmenities')?.setErrors({ required: true });
      return;
    }
    this.FifthFormGroup.get('commonAmenities')?.setValue(this.selectedAmenities);
    this.FifthFormGroup.get('commonAmenities')?.updateValueAndValidity();
    this.amenitiesFilled = true;
    this.amenitiesError = false;
    this.amenitiesModalError = false;
    this.hideModalAmenities(); // Close modal only when amenities are selected
  }
  showAmenitiesModalError: boolean = false;
  onSubmitAmenityCheck() {
    this.amenitiesError = false;
    this.showAmenitiesModalError = false;
    if (this.selectedAmenities.length === 0) {
      this.amenitiesError = true;
      this.showAmenitiesModalError = true;
      this.showModalAmenities()
      return;
    }
  }
  openAmenitiesModal() {
    this.amenitiesError = false;
    this.amenitiesModalError = false;
    this.showModalAmenities();
  }
  onAmenityChange(event: any): void {
    const value = event.target.value;
    if (event.target.checked) {
      this.selectedAmenities.push(value);
    } else {
      this.selectedAmenities = this.selectedAmenities.filter(item => item !== value);
    }
    // ✅ Just clear error – don't close modal
    if (this.selectedAmenities.length > 0) {
      this.amenitiesModalError = false;
      this.amenitiesTouched = false;
    }
    // this.updateSelectedAmenityLabels()
    if (this.Property_Type == 'Commercial') {
      this.updateSelectedCommercialAmenityLabels()
    } else if (this.Property_Type == 'Residential_Pg') {
      this.updateSelectedPgAmenityLabels()
    }
  }
  onAmenityToggle(amenity: string) {
    const index = this.selectedAmenities.indexOf(amenity);
    if (index === -1) {
      this.selectedAmenities.push(amenity);
    } else {
      this.selectedAmenities.splice(index, 1);
    }
    if (this.selectedAmenities.length > 0) {
      this.amenitiesError = false;
      this.showAmenitiesModalError = false;
    }
  }
  showModalAmenities() {
    const backdrop = document.getElementById('customModalBackdrop');
    if (backdrop) backdrop.style.display = 'block';
    setTimeout(() => {
      ($('#addEditAmenitiesModal') as any).modal({
        backdrop: 'static',
        keyboard: false
      });
    }, 0);
    ($('#addEditAmenitiesModal') as any).modal('show');
    $('body').addClass('modal-open');
  }
  hideModalAmenities() {
    const backdrop = document.getElementById('customModalBackdrop');
    if (backdrop) backdrop.style.display = 'none';
    setTimeout(() => {
      ($('#addEditAmenitiesModal') as any).modal({
        backdrop: 'static',
        keyboard: false
      });
    }, 0);
    ($('#addEditAmenitiesModal') as any).modal('hide');
    $('body').removeClass('modal-open');
  }
  closeModalNewAmenitie() {
    this.hideModalAmenities()
  }

  // onFacilityChange(event: Event) {
  //   const checkbox = event.target as HTMLInputElement;
  //   const value = checkbox.value;
  //   const facilities = this.FourthFormGroup.get('Office_Space_Facilities') as FormArray;
  //   if (facilities) {
  //     if (checkbox.checked) {
  //       facilities.push(this.fb.control(value));
  //     } else {
  //       const index = facilities.controls.findIndex(x => x.value === value);
  //       if (index >= 0) facilities.removeAt(index);
  //     }
  //   }
  // }


  onFacilityChange(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    const value = checkbox.value;

    let currentValues: string[] = this.FourthFormGroup.get('Office_Space_Facilities')?.value || [];

    if (checkbox.checked) {
      if (!currentValues.includes(value)) {
        currentValues = [...currentValues, value];  // add facility
      }
    } else {
      currentValues = currentValues.filter(v => v !== value); // remove facility
      this.removeLabelFromImages(value);

    }

    this.FourthFormGroup.get('Office_Space_Facilities')?.setValue(currentValues);
  }
  // onPgRuleChange(event: Event) {
  //   const checkbox = event.target as HTMLInputElement;
  //   const value = checkbox.value;
  //   const rulesArray = this.FourthFormGroup.get('PG_Rules') as FormArray;
  //   if (rulesArray) {
  //     if (checkbox.checked) {
  //       rulesArray.push(this.fb.control(value));
  //     } else {
  //       const index = rulesArray.controls.findIndex(x => x.value === value);
  //       if (index >= 0) rulesArray.removeAt(index);
  //     }
  //   }
  //   this.updatePgRuleLabels();
  // }

  onPgRuleChange(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    const value = checkbox.value;

    let currentValues: string[] = this.FourthFormGroup.get('PG_Rules')?.value || [];

    if (checkbox.checked) {
      if (!currentValues.includes(value)) {
        currentValues = [...currentValues, value];
      }
    } else {
      currentValues = currentValues.filter(v => v !== value);
    }

    this.FourthFormGroup.get('PG_Rules')?.setValue(currentValues);
    this.updatePgRuleLabels();
  }


  // onPlotFacilityChange(event: Event) {
  //   const checkbox = event.target as HTMLInputElement;
  //   const value = checkbox.value;
  //   const facilities = this.FourthFormGroup.get('Plot_Facilities') as FormArray;
  //   if (facilities) {
  //     if (checkbox.checked) {
  //       facilities.push(this.fb.control(value));
  //     } else {
  //       const index = facilities.controls.findIndex(x => x.value === value);
  //       if (index >= 0) facilities.removeAt(index);
  //     }
  //   }
  // }

  onPlotFacilityChange(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    const value = checkbox.value;

    let currentValues: string[] = this.FourthFormGroup.get('Plot_Facilities')?.value || [];

    if (checkbox.checked) {
      if (!currentValues.includes(value)) {
        currentValues = [...currentValues, value]; // add
      }
    } else {
      currentValues = currentValues.filter(v => v !== value); // remove
      this.removeLabelFromImages(value);

    }

    this.FourthFormGroup.get('Plot_Facilities')?.setValue(currentValues);
  }


  // onShopFacilityChange(event: Event) {
  //   const checkbox = event.target as HTMLInputElement;
  //   const value = checkbox.value;
  //   const facilities = this.FourthFormGroup.get('Shop_Facilities') as FormArray;
  //   if (facilities) {
  //     if (checkbox.checked) {
  //       facilities.push(this.fb.control(value));
  //     } else {
  //       const index = facilities.controls.findIndex(x => x.value === value);
  //       if (index >= 0) facilities.removeAt(index);
  //     }
  //   }
  // }

  onShopFacilityChange(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    const value = checkbox.value;

    let currentValues: string[] = this.FourthFormGroup.get('Shop_Facilities')?.value || [];

    if (checkbox.checked) {
      if (!currentValues.includes(value)) {
        currentValues = [...currentValues, value];  // add facility
      }
    } else {
      currentValues = currentValues.filter(v => v !== value); // remove facility
      this.removeLabelFromImages(value);

    }

    this.FourthFormGroup.get('Shop_Facilities')?.setValue(currentValues);
  }


  // onWarehouseFacilityChange(event: Event) {
  //   const checkbox = event.target as HTMLInputElement;
  //   const value = checkbox.value;
  //   const array = this.FourthFormGroup.get('Warehouse_Facilities') as FormArray;
  //   if (array) {
  //     if (checkbox.checked) {
  //       array.push(this.fb.control(value));
  //     } else {
  //       const index = array.controls.findIndex(x => x.value === value);
  //       if (index >= 0) array.removeAt(index);
  //     }
  //   }
  // }

  onWarehouseFacilityChange(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    const value = checkbox.value;

    let currentValues: string[] = this.FourthFormGroup.get('Warehouse_Facilities')?.value || [];

    if (checkbox.checked) {
      if (!currentValues.includes(value)) {
        currentValues = [...currentValues, value]; // add
      }
    } else {
      currentValues = currentValues.filter(v => v !== value); // remove
      this.removeLabelFromImages(value);

    }

    this.FourthFormGroup.get('Warehouse_Facilities')?.setValue(currentValues);
  }



  photoLabels: { [url: string]: string } = {};
  photoError: boolean = false;
  labelError: boolean = false;
  coverImageUrl: any | null = null;
  coverImageFile: File | null = null; // <-- Added to fix the error
  coverImageError: boolean = false;
  uploadError: string = '';
  allCommonCategories = ['Bathroom', 'Kitchen', 'Common Area', 'Amenities', 'Others'];
  photoTypes: string[] = [];
  isPhotoStepValid: boolean
  validatePhotoStep(): void {
    let isValid = false;
    this.previewUrlsBackend.forEach(img => {
      if (!img.label_IDFK) {
        isValid = true;
      }
    });
    this.isPhotoStepValid = isValid;
    this.photoError = this.previewUrls.length === 0 && this.previewUrlsBackend.length === 0;
    this.labelError = this.previewUrls.some(url => !this.photoLabels[url]);
    this.coverImageError = !this.photoForm.get('coverImage')?.value;
  }


  updatePhotoTypeOptions() {
    const submittedRoomLabels = this.submittedData.map(data => data.label); // From Step 3
    const uniqueRooms = Array.from(new Set(submittedRoomLabels));
    this.photoTypes = [...uniqueRooms, ...this.allCommonCategories];
  }
  onDragOver(event: DragEvent): void {
    event.preventDefault();
    const dropArea = document.getElementById('dropArea');
    dropArea?.classList.add('dragover');
  }
  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    const dropArea = document.getElementById('dropArea');
    dropArea?.classList.remove('dragover');
  }
  onDrop(event: DragEvent): void {
    event.preventDefault();
    const dropArea = document.getElementById('dropArea');
    dropArea?.classList.remove('dragover');
    if (event.dataTransfer?.files) {
      Array.from(event.dataTransfer.files).forEach(file => {
        this.readFile(file);
      });
    }
  }
  onFilesSelected(event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      Array.from(input.files).forEach(file => {
        this.readFile(file);
      });
    }
    this.validatePhotoStep()
  }
  readFile(file: File): void {
    const isValidType = ['image/png', 'image/jpg', 'image/jpeg'].includes(file.type);
    const isValidSize = file.size <= 1 * 1024 * 1024; // 2MB
    if (!isValidType) {
      swal({
        icon: 'error',
        title: 'Invalid Format.',
        text: 'Only JPG, JPEG, or PNG formats are allowed.',
        showConfirmButton: true,
      });
      return;
    }
    if (!isValidSize) {
      swal({
        icon: 'error',
        title: 'Image Size is too big.',
        text: 'File size must be 1MB or less.',
        showConfirmButton: true,
      });
      return;
    }


    // 🔥 Normalize a filename (remove propertyId prefix if present)
    const normalizeName = (name: string) => {
      return name.replace(/^\d+-/, ""); // remove leading digits + dash
    };

    const newFileName = normalizeName(file.name);

    // Collect backend + new uploads
    const backendNames = (this.previewUrlsBackend || []).map((img: any) => normalizeName(img.image_name));
    const newUploadNames = Object.values(this.originalFileNames || {}).map(name => normalizeName(name));

    // Duplicate check
    if ([...backendNames, ...newUploadNames].includes(newFileName)) {

      swal({
        icon: 'warning',
        title: 'Duplicate Image',
        text: `The image "${file.name}" is already uploaded.`,
        showConfirmButton: true,
      });
      return;
    }


    const reader = new FileReader();
    reader.onload = (e: any) => {
      const result = e.target.result;
      if (!this.previewUrls.includes(result)) {
        this.previewUrls.push(result);
        this.galleryImage_Binary.push(file);
        this.originalFileNames[result] = file.name || `image_${Date.now()}`;
        if (!this.coverImageUrl) {
          this.coverImageUrl = result;
          this.coverImageBlob = file;
          this.photoForm.get('coverImage')?.setValue(result); // ✅ properly sync to form
        }
        this.photoLabels[result] = '';
      }
    };
    reader.readAsDataURL(file);
    this.validatePhotoStep()
  }
  originalFileNames: { [base64Url: string]: string } = {};
  get nonCoverImages(): string[] {
    return this.previewUrls.filter(url => url !== this.photoForm.value.coverImage);
  }


  removeImage1(urlToRemove: string): void {
    const index = this.previewUrls.indexOf(urlToRemove);
    if (index > -1) {
      this.previewUrls = this.previewUrls.filter((_, i) => i !== index);
      this.galleryImage_Binary = this.galleryImage_Binary.filter((_, i) => i !== index);
    }
    delete this.photoLabels[urlToRemove];
    const imagesArray = this.photoForm.get('images') as FormArray;
    const formIndex = imagesArray.controls.findIndex(ctrl => ctrl.value === urlToRemove);
    if (formIndex > -1) imagesArray.removeAt(formIndex);
    if (this.photoForm.value.coverImage === urlToRemove) {
      this.photoForm.get('coverImage')?.reset();
    }
    this.validatePhotoStep()
  }

  removeImage(urlToRemove: string): void {
    const index = this.previewUrls.indexOf(urlToRemove);
    if (index > -1) {
      this.previewUrls = this.previewUrls.filter((_, i) => i !== index);
      this.galleryImage_Binary = this.galleryImage_Binary.filter((_, i) => i !== index);
    }

    delete this.photoLabels[urlToRemove];

    // images is now a FormControl holding an array
    const imagesArray = this.photoForm.get('images')?.value as string[];
    if (imagesArray && imagesArray.length) {
      const updatedImages = imagesArray.filter(url => url !== urlToRemove);
      this.photoForm.get('images')?.setValue(updatedImages);
    }

    if (this.photoForm.value.coverImage === urlToRemove) {
      this.photoForm.get('coverImage')?.reset();
    }

    this.validatePhotoStep();
  }




  //   removeImage(urlToRemove: string): void {
  //   const index = this.previewUrls.indexOf(urlToRemove);

  //   if (index > -1) {
  //     // 1. Remove from previewUrls
  //     this.previewUrls = this.previewUrls.filter((_, i) => i !== index);

  //     // 2. Remove from binary array
  //     this.galleryImage_Binary = this.galleryImage_Binary.filter((_, i) => i !== index);
  //   }

  //   // 3. Remove label
  //   delete this.photoLabels[urlToRemove];

  //   // 4. Remove from FormArray
  //   const imagesArray = this.photoForm.get('images') as FormArray;
  //   const formIndex = imagesArray.controls.findIndex(ctrl => ctrl.value === urlToRemove);
  //   if (formIndex > -1) imagesArray.removeAt(formIndex);

  //   // 5. Handle cover image
  //   if (this.photoForm.value.coverImage === urlToRemove) {
  //     if (this.previewUrls.length > 0) {
  //       // ✅ Make first remaining image the new cover
  //       const newCover = this.previewUrls[0];
  //       this.photoForm.get('coverImage')?.setValue(newCover);
  //     } else {
  //       // No images left → reset
  //       this.photoForm.get('coverImage')?.reset();
  //     }
  //   }


  //   // 🔎 Debug
  //   console.log("🗑️ Removed:", urlToRemove);
  //   console.log("📸 Remaining images:", this.previewUrls);
  //   console.log("⭐ Current cover:", this.photoForm.value.coverImage);

  //   // 6. Re-run validation
  //   this.validatePhotoStep();

  // }



  coverImageBlob: any; // <-- Add this property
  galleryimages: File[] = [];
  setCoverImage(url: string): void {
    this.coverImageUrl = url;
    const index = this.previewUrls.indexOf(url);
    this.coverImageBlob = this.galleryImage_Binary[index];
    const selectedFile = this.galleryimages[index];  // ⛔ YOU SAID THIS ERRORS
    if (selectedFile && selectedFile.name) {
      this.coverImageFile = selectedFile; // ✅ Expected to set here
    }
    this.photoForm.get('coverImage')?.setValue(url);
    this.validatePhotoStep()
  }

  // updatePhotoLabel(url: string, label: string): void {
  //   this.photoLabels[url] = label;
  //   this.labelError = false;
  //   this.validatePhotoStep();
  // }


  previewUrlsBackendGallery: any[] = []
  onSubmitPhotos(): void {
    this.validatePhotoStep();
    this.photoError = this.previewUrls.length === 0 && this.previewUrlsBackend.length === 0;
    this.labelError = this.previewUrls.some(url => !this.photoLabels[url]);
    this.coverImageError = !this.photoForm.get('coverImage')?.value;
    // if (this.labelError || this.coverImageError || this.isPhotoStepValid && this.photoError) return;


    if (this.photoError || this.labelError || this.coverImageError || this.isPhotoStepValid) {
      return;
    }

    // this.previewUrlsBackendGallery = this.previewUrlsBackend.filter(img => img.cover_img === '2');
    this.previewUrlsBackendGallery = this.previewUrlsBackend.filter(
      img => img.image_name !== this.coverImageUrl.image_name
    );
    this.setCoverAndGalleryData()
    // ✅ Console how many images are in preview
    // ✅ If you also want to check gallery data
    this.goNext();
  }
  onLabelChange(url: string, value: string): void {
    this.photoLabels[url] = value;
    this.validatePhotoStep()
  }
  handleGlobalDrop(event: DragEvent): void {
    event.preventDefault();
    if (event.dataTransfer?.files) {
      Array.from(event.dataTransfer.files).forEach(file => {
        this.readFile(file);
      });
    }
  }
  coverImageData: any;
  galleryImagesData: any[] = [];
  selectedCoverImage: string = '';


  // setCoverAndGalleryData() {
  //   // Normalize cover image filename
  //   const coverFileName = this.coverImageUrl?.image_name
  //     ? this.coverImageUrl.image_name
  //     : this.getOriginalFilename(this.coverImageUrl);
  //   // 
  //   // Merge only unique images
  //   const seen = new Set<string>();
  //   const allImages = [
  //     ...(this.previewUrlsBackend || []),
  //     ...(this.previewUrls || [])
  //   ].filter(img => {
  //     const imageName = img.image_name || this.getOriginalFilename(img);
  //     if (seen.has(imageName)) return false;
  //     seen.add(imageName);
  //     return true;
  //   });
  //   // Build final gallery payload
  //   this.galleryImagesData = allImages.map(img => {
  //     const imageName = img.image_name || this.getOriginalFilename(img);
  //     const isCover = (imageName === coverFileName);
  //     if (isCover) {
  //       // 
  //     }
  //     return {
  //       image_name: imageName,
  //       labelId: this.photoLabels[img] || img.label_IDFK || '',
  //       cover_img: (imageName === coverFileName) ? "1" : "2"
  //     };
  //   });
  // }


  galleryImagesDataBackend: any[] = [];
  galleryImagesDataNew: any[] = [];


  setCoverAndGalleryData() {
    // Normalize cover image filename
    const coverFileName = this.coverImageUrl?.image_name
      ? this.coverImageUrl.image_name
      : this.getOriginalFilename(this.coverImageUrl);

    const seen = new Set<string>();

    // 🔹 Backend images
    this.galleryImagesDataBackend = (this.previewUrlsBackend || []).map(img => {
      const imageName = img.image_name;
      const imageId = img.imageId;
      return {
        image_id: imageId,
        image_name: imageName,
        labelId: img.label_IDFK || '',
        cover_img: (imageName === coverFileName) ? "1" : "2"
      };
    });

    // 🔹 Frontend (new uploads) images
    this.galleryImagesDataNew = (this.previewUrls || []).map(img => {
      const imageName = this.getOriginalFilename(img);
      return {
        image_name: imageName,
        labelId: this.photoLabels[img] || '',
        cover_img: (imageName === coverFileName) ? "1" : "2"
      };
    });

    // 🔹 Final merged deduplicated gallery
    this.galleryImagesData = [...this.galleryImagesDataBackend, ...this.galleryImagesDataNew]
      .filter(item => {
        if (seen.has(item.image_name)) return false;
        seen.add(item.image_name);
        return true;
      });
  }

  galleryImage_Binary: any = [];
  getOriginalFilename(url: string): string {
    if (this.originalFileNames && this.originalFileNames[url]) {
      return this.originalFileNames[url];
    }
    const fallbackName = `image_${Date.now()}`;
    this.originalFileNames[url] = fallbackName;
    return fallbackName;
  }
  citiess = [];
  selectedLocation: any;
  locationSelectedId: any;
  cityNameReviewValue: any;
  localitys = [];
  isButtonDisabled: boolean = false;
  public autoCompleteData: { [key: string]: Object }[] = [];
  optionsSellLocality;
  filteredOptionsSellLocality: Observable<any>;
  myControlSellLocality = new FormControl();
  options;
  filteredOptions: Observable<any>;
  myControl = new FormControl();
  proptypeid: any;
  ApprovalsLists = [];
  propertyAutoRentLocalityName = '';
  filteredData2: any[] = [];
  currentCity: any;
  BuilderId = 0;
  PropertyId: any;
  TypeID: any;
  propertyAutoName = '';
  private routeSub: Subscription;
  getlocationlist() {
    this.Service.getindividualcity().subscribe(city => {
      this.citiess = city['citys'];
      this.selectedLocation = this.citiess[0]['city'];
    });
  }
  isSelected = false;
  selectionChangeRent(event) {
    const cityName = event.option.value;
    const cityName1 = cityName.toLowerCase();
    var value = this.cityservice.cityfinder(cityName1);
    this.locationSelectedId = value.cityid;
    this.locationSelectedId = value.cityid;
    localStorage.setItem('CityName', cityName1);
    this.cityNameReviewValue = cityName;
    localStorage.setItem('CityID', this.locationSelectedId);
    this.getclickAutoRent(this.locationSelectedId);
    this.onChangeRegionRent();
    this.getPropNameAutoCompleateRent(this.locationSelectedId, this.proptypeid);
    this.propertyAutoRentLocalityName = '';
    this.filteredData1 = [];
  }
  regionList = [];
  getclickAutoRent(cityId) {
    this.Service.getindividualRegionList(cityId).subscribe(localitys => {
      this.regionList = localitys['Zones'];
      this.propertyAutoRentLocalityName = '';
    });
  }
  onChangeRegionRent() {
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
  isAddNewLocBtnDisabled: boolean = true;
  locality_id: any;
  selectedLoc: any;
  filteredData1: any[] = [];
  filteredData3: any[] = [];
  filteredData1length: boolean = false;
  myControlRentLocality = new FormControl();
  optionsRentLocality;
  filteredOptionsRentLocality: Observable<any>;
  LocalityReviewName: any;
  myControlCity = new FormControl('', Validators.required);
  filteredCities: any[] = [];
  onInputChangeRent() {
    this.isAddNewLocBtnDisabled = this.propertyAutoRentLocalityName.length === 0;
    this.locality_id = undefined;
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
  onInputChangecity() {
    this.filteredData3 = this.citiess.filter(item => {
      return item.city.toLowerCase().includes(this.currentCity.toLowerCase());;
    });
  }
  cityValidator(control: AbstractControl) {
    if (!control.value) return null;
    const isValid = this.filteredData3.some(
      city => city.city.toLowerCase() === control.value.toLowerCase()
    );
    return isValid ? null : { invalidCity: true };
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
  onItemSelectRent(selected) {
    this.propertyAutoRentLocalityName = selected.locality_name;
    this.LocalityReviewName = selected.locality_name;
    this.locality_id = selected.locality_IDPK;
    this.selectedLoc = selected.locality_name;
    const match = this.filteredData1.find(locality => locality.locality_name.toLowerCase() === this.propertyAutoRentLocalityName.toLowerCase());
    if (match) {
      this.isButtonDisabled = false;
    } else {
      this.isButtonDisabled = true;
    }
  }
  addNewLoc() {
    this.isButtonDisabled = false
  }
  private _filterCities(value: string): any[] {
    const filterValue = value?.toLowerCase() || '';
    return this.citiess.filter(city => city.city.toLowerCase().includes(filterValue));
  }
  onCitySelected(city: string) {
    this.currentCity = city;
  }
  alphanumericNotOnlyNumbers(control: AbstractControl): ValidationErrors | null {
    const value = control.value?.trim();
    if (!value) return null;
    const onlyNumbers = /^[0-9!@#$%^&*()_+]+$/.test(value);
    const validAlphanumeric = /^[a-zA-Z0-9!@#$%^&*()_+ ]+$/.test(value);
    if (onlyNumbers) return { onlyNumbers: true };
    if (!validAlphanumeric) return { invalidChars: true };
    return null;
  }
  onlyNumbersAllowed(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value === null || value === undefined || value === '') return null;
    const strValue = String(value).trim();
    return /^[0-9]+$/.test(strValue) ? null : { notNumeric: true };
  }



  alphanumericNotOnlyNumbers1(control: AbstractControl): ValidationErrors | null {

    const value = control.value;

    if (!value) return null;  // allow empty



    const trimmed = value.trim();

    if (!trimmed) return { onlySpaces: true }; // reject space-only



    const onlyNumbers = /^[0-9!@#$%^&*()_+]+$/.test(trimmed);

    const validAlphanumeric = /^[a-zA-Z0-9!@#$%^&*()_+ ]+$/.test(trimmed);



    if (onlyNumbers) return { onlyNumbers: true };

    if (!validAlphanumeric) return { invalidChars: true };



    return null;

  }

  floorLessThanTotalValidator(group: AbstractControl): ValidationErrors | null {
    const floor = +group.get('Floor_NO')?.value;
    const total = +group.get('Total_Floors')?.value;
    if (!isNaN(floor) && !isNaN(total) && floor > total) {
      return { floorExceeds: true };
    }
    return null;
  }
  futureDateValidator(control: AbstractControl): ValidationErrors | null {
    const selectedDate = new Date(control.value);
    const today = new Date();
    return selectedDate > today ? null : { notFutureDate: true };
  }
  noAlphabetsAllowed(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;
    const isValid = /^[0-9]*$/.test(value);
    return isValid ? null : { hasAlphabets: true };
  }
  floorValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value === null || value === undefined || value === '') return null; // ✅ Optional field
    return /^[0-9]+$/.test(value) ? null : { notNumeric: true };
  }
  floorComparisonValidator(group: AbstractControl): ValidationErrors | null {
    const total = Number(group.get('Total_Floors')?.value);
    const floor = group.get('Floor_NO')?.value;
    if (floor === null || floor === '') return null; // ✅ Optional
    const floorNum = Number(floor);
    if (!isNaN(total) && !isNaN(floorNum) && floorNum > total) {
      return { floorExceedsTotal: true };
    }
    return null;
  }
  limitToMaxLength(event: Event, max: number) {
    const input = event.target as HTMLInputElement;
    if (input.value.length > max) {
      input.value = input.value.slice(0, max);
    }
  }
  commercialNameValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value?.trim();
    if (!value) return null;
    const onlyNumbers = /^[0-9]+$/.test(value);
    const invalidStart = /^[0-9]/.test(value);
    const validAlphanumeric = /^[a-zA-Z0-9\s]+$/.test(value);
    if (onlyNumbers) return { onlyNumbers: true };
    if (invalidStart) return { startsWithNumber: true };
    if (!validAlphanumeric) return { invalidChars: true };
    return null;
  }
  showRegenerateButton = false;



  descriptionTemplates = [
    (data: any) => `Find comfort in this ${data.roomType} PG accommodation near ${this.Landmarks_value}. With premium amenities and ideal for ${this.BestSuitForLabel} seeking a peaceful and secure environment. Located in a well-connected area, this PG started in ${this.PgStartedYearLabel} is perfect for ${this.PGAvaliableForLabel}. Experience hassle-free living in a space designed to offer convenience, safety, and a clean environment, making it an excellent choice for students or professionals.`,
    (data: any) => `Welcome to this spacious ${data.roomType} PG near ${this.Landmarks_value}. Started in ${this.PgStartedYearLabel}, it’s best suited for ${this.BestSuitForLabel}. Residents enjoy access to top facilities, and the community is friendly and vibrant. This PG is ideal for ${this.PGAvaliableForLabel} looking for a safe and secure place with easy access to essentials. Settle into comfort and enjoy your stay in this thoughtfully designed living space.`,
    (data: any) => `This well-maintained ${data.roomType} PG is located close to ${this.Landmarks_value} and is best suited for ${this.BestSuitForLabel}. Established in ${this.PgStartedYearLabel}, it offers a welcoming and calm environment.Top Amenities and services, making it ideal for ${this.PGAvaliableForLabel}. The PG ensures a clean, spacious, and hassle-free stay for residents, offering all essential comforts in a peaceful neighborhood.`,
    (data: any) => `Enjoy a relaxed lifestyle in this ${data.roomType} PG, built in ${this.PgStartedYearLabel} and located near ${this.Landmarks_value}. This PG is ideal for ${this.PGAvaliableForLabel}, especially ${this.BestSuitForLabel}. With key facilities, this space offers great value in a well-connected neighborhood. Clean interiors and excellent upkeep make it a great place to call home.`,
    (data: any) => `This ${data.roomType} PG accommodation near ${this.Landmarks_value} is tailored for ${this.PGAvaliableForLabel}. With high-quality services , and a clean environment, this PG is ideal for ${this.BestSuitForLabel}. Established in ${this.PgStartedYearLabel}, it offers easy access to local transport and conveniences while ensuring a safe and welcoming atmosphere.`,
    (data: any) => `Stay in this budget-friendly ${data.roomType} PG located near ${this.Landmarks_value}, ideal for ${this.BestSuitForLabel}. It’s open for ${this.PGAvaliableForLabel} and was established in ${this.PgStartedYearLabel}. This PG offers top amenities, ensuring a smooth and worry-free stay. It’s an excellent choice for those seeking long-term comfort and reliability.`,
    (data: any) => `This ${data.roomType} PG, started in ${this.PgStartedYearLabel}, is designed for ${this.PGAvaliableForLabel}. Located at ${this.Landmarks_value}, it offers key amenities and caters well to ${this.BestSuitForLabel}. Its neat layout and quiet setting provide an ideal place to stay in the city. Safe, affordable, and comfortable – just what you need.`,
    (data: any) => `Looking for a clean and calm PG near ${this.Landmarks_value}? This ${data.roomType} is ideal for ${this.PGAvaliableForLabel} and built in ${this.PgStartedYearLabel}. With essential feature, it supports daily comfort and peace of mind. It suits ${this.BestSuitForLabel} who value convenience, hygiene, and community living.`,
    (data: any) => `This ${data.roomType} PG is ideal for ${this.PGAvaliableForLabel} wanting a safe and budget-friendly home. Located near ${this.Landmarks_value}. Started in ${this.PgStartedYearLabel}, the property caters to ${this.BestSuitForLabel} with simple, clean, and efficient living arrangements in a prime location.`,
    (data: any) => `Find a peaceful stay in this ${data.roomType} PG, perfect for ${this.BestSuitForLabel}. Located near ${this.Landmarks_value}, this PG is open to ${this.PGAvaliableForLabel}. It features top Amenities and was established in ${this.PgStartedYearLabel}. If you're seeking a well-maintained property with access to local needs, this one checks all boxes for a long-term stay.`
  ];
  officeTemplates = [
    (data: any) => `Welcome to a professional office space nestled in a prime business district near ${this.Landmarks_value}. Designed within a ${this.BuildingTypeLabel}, this ${this.PropertyStatuslabel} unit is fully ${this.FurnishedTypeLabel} and crafted for efficiency. Ideal for ${this.SuitedForLabel}, this workspace provides a vibrant setting for focused productivity and client interaction. ${data.Property_Customizable_value ? 'Layout customization gives your team room to innovate and operate with ease.' : 'Ready-to-use setup supports instant team onboarding and workflow stability.'} Surrounded by major commercial activity and public transport, the office is perfect for teams seeking high accessibility and brand positioning.`,
    (data: any) => `Step into this modern office setup located close to ${this.Landmarks_value}, designed to support ${this.SuitedForLabel} needs. The property is situated in a ${this.BuildingTypeLabel} and is currently ${this.PropertyStatuslabel}. Interiors are ${this.FurnishedTypeLabel} and built with attention to utility and style. ${data.Property_Customizable_value ? 'Layout flexibility makes it ideal for custom zoning, meeting rooms, and collaborative hubs.' : 'With a clean and predefined design, this office is move-in ready and easy to configure.'} Surrounded by cafes, transport, and tech-friendly facilities, it's a professional haven for ambitious businesses.`,
    (data: any) => `An efficient and elegant office space awaits just minutes from ${this.Landmarks_value}. This ${this.PropertyStatuslabel} commercial space is designed within a ${this.BuildingTypeLabel} setup, offering ${this.FurnishedTypeLabel} interiors and a professional ambiance. ${this.SuitedForLabel} will find this space ideal for meetings, team productivity, and operational efficiency. ${data.Property_Customizable_value ? 'Adapt the space to create a productive flow that mirrors your company structure.' : 'The ready-built format ensures minimal downtime and smoother transitions.'} Make the most of an address that reflects credibility and business strength.`,
    (data: any) => `This well-positioned office property near ${this.Landmarks_value} is an excellent base for ${this.SuitedForLabel}. Situated in a high-rise ${this.BuildingTypeLabel}, the unit is ${this.PropertyStatuslabel} and has ${this.FurnishedTypeLabel} interiors to support diverse working styles. ${data.Property_Customizable_value ? 'Customize the workspace to add creative zones, client lounges, or collaborative corners.' : 'The setup is optimized to begin your work from day one without construction delays.'} With close proximity to corporate services, banking, and transport options, it offers everything your business needs to grow.`,
    (data: any) => `Discover an inspiring workspace near ${this.Landmarks_value}, tailored for ${this.SuitedForLabel}. Housed in a premium ${this.BuildingTypeLabel}, this office is ${this.PropertyStatuslabel} and provides ${this.FurnishedTypeLabel} finishes that blend functionality with design. From boardrooms to workstations, every inch is optimized for efficiency. ${data.Property_Customizable_value ? 'You have the flexibility to shape this space into a dynamic office reflecting your brand’s identity.' : 'With a structured layout, it offers an organized and quick move-in experience.'} Positioned among business hotspots, this space enhances both visibility and operational comfort.`,
    (data: any) => `Situated near ${this.Landmarks_value}, this commercial space is crafted to elevate the working experience for ${this.SuitedForLabel}. Found within a landmark ${this.BuildingTypeLabel}, the unit is ${this.PropertyStatuslabel} and comes with ${this.FurnishedTypeLabel} fit-outs. ${data.Property_Customizable_value ? 'Teams can modify zones, optimize meeting areas, or reconfigure as they scale.' : 'The existing layout fits a variety of departments seamlessly, from HR to Finance.'} The location is dotted with professional services, eateries, and co-located businesses, enabling a balanced and convenient work life.`,
    (data: any) => `Grow your brand from this refined office space near ${this.Landmarks_value}. Located in a modern ${this.BuildingTypeLabel}, it features ${this.FurnishedTypeLabel} interiors and is ${this.PropertyStatuslabel}. Designed with focus and flow in mind, it suits ${this.SuitedForLabel} aiming for performance and presentation. ${data.Property_Customizable_value ? 'You can rework the interiors to support open collaboration or departmental silos.' : 'Utilize the existing zoning for a quick, functional start.'} Excellent connectivity and surrounding commercial synergy make it a long-term asset.`,
    (data: any) => `This contemporary office property offers seamless access to ${this.Landmarks_value}. Ideal for ${this.SuitedForLabel}, it resides in a sophisticated ${this.BuildingTypeLabel}, fully ${this.FurnishedTypeLabel} and currently ${this.PropertyStatuslabel}. The interiors are welcoming, with a professional ambiance suited for internal teams and client meetings alike. ${data.Property_Customizable_value ? 'Flexibility in space planning makes it scalable as your operations grow.' : 'Simple, well-thought-out design means you can focus on execution from day one.'} A perfect blend of aesthetics and accessibility.`,
    (data: any) => `Right around ${this.Landmarks_value}, this workspace is part of a commercial ecosystem built for ${this.SuitedForLabel}. Featuring a ${this.PropertyStatuslabel} status and ${this.FurnishedTypeLabel} layout, the ${this.BuildingTypeLabel} is both inspiring and functional. ${data.Property_Customizable_value ? 'You can shape it into zones for meetings, discussions, or brainstorming.' : 'Use the default layout for immediate onboarding and client coordination.'} Located amidst offices and public transit, it’s built for scale and convenience.`,
    (data: any) => `A smart office space crafted for modern business just near ${this.Landmarks_value}. It’s housed inside a ${this.BuildingTypeLabel}, designed for ${this.SuitedForLabel}, and available in ${this.PropertyStatuslabel} status with ${this.FurnishedTypeLabel} décor. ${data.Property_Customizable_value ? 'The office can be restructured to reflect your workflow and growth plan.' : 'Its ready configuration ensures an efficient start with zero modifications needed.'} Work close to the city’s pulse with this commercial gem.`
  ];
  shopTemplates = [
    (data: any) => `Discover a high-visibility Shop/Showroom in one of the busiest commercial markets. Ideal for ${this.SuitedForLabel}, this ${this.FurnishedTypeLabel} space is ${this.PropertyStatuslabel} and just steps away from ${this.Landmarks_value}. Located in a retail zone known for fashion, food, electronics, and essential services, it’s great for both new and established businesses. Large windows, ample footfall, and signage visibility make it a powerful spot for branding. ${data.Property_Customizable_value ? 'You can adapt the interior layout to suit your display needs.' : 'Move-in ready with existing showroom layout.'} Secure your space in this thriving destination.`,
    (data: any) => `This premium Shop/Showroom sits amidst major retail and residential neighborhoods. The space is ${this.FurnishedTypeLabel}, ${this.PropertyStatuslabel}, and within walking distance of ${this.Landmarks_value}. Ideal for ${this.SuitedForLabel}, it's designed to attract high-volume footfall and offer a strong retail presence. Showcase lifestyle goods, electronics, health services, or fashion. ${data.Property_Customizable_value ? 'Interiors can be modified to enhance customer experience.' : 'Existing configuration allows a quick launch.'} Ideal for retail entrepreneurs seeking impact and visibility.`,
    (data: any) => `Set within a landmark ${this.BuildingTypeLabel}, this Shop/Showroom enjoys massive daily foot traffic and roadside visibility. ${this.PropertyStatuslabel} status, ${this.FurnishedTypeLabel} interiors, and close proximity to ${this.Landmarks_value} make it ideal for ${this.SuitedForLabel}. The property is part of a retail belt known for diverse audiences, from professionals to families. ${data.Property_Customizable_value ? 'You can customize shelves, counters, and walkways.' : 'Available with fixed interior styling, ready for use.'} Perfect for brands ready to expand their footprint in a commercial hub.`,
    (data: any) => `Located in a high-demand commercial pocket, this Shop/Showroom benefits from continuous foot traffic. ${this.PropertyStatuslabel} and ${this.FurnishedTypeLabel}, it suits ${this.SuitedForLabel} looking for brand visibility. Nearby landmarks like ${this.Landmarks_value} and market areas ensure daily walk-ins. ${data.Property_Customizable_value ? 'Custom layouts available to reflect your theme.' : 'You can immediately open doors with its default setup.'} Be it cosmetics, footwear, clinics, or gadgets – this space can scale your retail dream.`,
    (data: any) => `This eye-catching Shop/Showroom is placed near ${this.Landmarks_value}, surrounded by banks, supermarkets, and eateries. Suitable for ${this.SuitedForLabel}, the unit is ${this.PropertyStatuslabel} and ${this.FurnishedTypeLabel}, offering quick setup and convenience. The property sits on a retail street with massive visibility and consistent customer flow. ${data.Property_Customizable_value ? 'Interiors can be designed to enhance engagement.' : 'Move-in ready with optimal racks and layout.'} An excellent choice for aspirational brands or service providers.`,
    (data: any) => `In a location buzzing with retail energy, this ${this.BuildingTypeLabel} Shop/Showroom delivers unmatched exposure. The ${this.FurnishedTypeLabel} setup, ${this.PropertyStatuslabel} handover, and adjacency to ${this.Landmarks_value} make it desirable for ${this.SuitedForLabel}. Be it a boutique, café, or service outlet, this store will attract curious shoppers daily. ${data.Property_Customizable_value ? 'Tailor the interior for product storytelling.' : 'Fixed setup means faster operations.'} Ideal to elevate brand reputation while maximizing conversions.`,
    (data: any) => `Explore a professionally styled Shop/Showroom right next to major crowd-pulling landmarks like ${this.Landmarks_value}. It’s ${this.PropertyStatuslabel}, ${this.FurnishedTypeLabel}, and housed in a busy retail environment. Perfect for ${this.SuitedForLabel}, this space supports multiple product categories and is easily accessible from roads and footpaths. ${data.Property_Customizable_value ? 'Design elements are flexible for customized store branding.' : 'Utilize the current layout for a plug-and-play launch.'} Designed for brands that demand attention.`,
    (data: any) => `Bring your business to a high-potential location featuring this Shop/Showroom in a top commercial cluster. Positioned close to ${this.Landmarks_value}, the unit is ${this.PropertyStatuslabel} and ${this.FurnishedTypeLabel}, appealing to ${this.SuitedForLabel}. Surrounded by premium outlets, parking, and ATMs, this zone sees constant local and transit footfall. ${data.Property_Customizable_value ? 'You can rework the space for experience-driven retail.' : 'Its layout works for instant launch with minimum adjustment.'} A well-aligned choice for retail pioneers.`,
    (data: any) => `Your Shop/Showroom near ${this.Landmarks_value} is ready for business. With a ${this.FurnishedTypeLabel} finish and ${this.PropertyStatuslabel} status, this property is ideal for ${this.SuitedForLabel} seeking solid brand visibility. Located in a walkable, market-friendly district, it invites organic customer flow. ${data.Property_Customizable_value ? 'Design freedom allows creative merchandising setups.' : 'Standard layout accommodates easy merchandise placement.'} From product displays to service counters, every element supports customer engagement.`,
    (data: any) => `Strategically located in a prime commercial zone near ${this.Landmarks_value}, this Shop/Showroom is built for brands that seek growth. ${this.FurnishedTypeLabel} and ${this.PropertyStatuslabel}, the unit caters well to ${this.SuitedForLabel}. It’s surrounded by daily needs stores, eateries, clinics, and branded chains. ${data.Property_Customizable_value ? 'Interior flexibility makes this a canvas for your visual identity.' : 'Go live instantly with a structured design.'} Perfect for retailers aiming to capitalize on strong demand and visibility.`
  ];
  plotTemplates = [
    (data: any) => `Explore this commercial plot near ${this.Landmarks_value}. Featuring ${data.Plot_Dimension_value} dimensions, with ${this.PropertyFacingLabel} facing and ${data.Boundary_Wall_value === '1' ? 'boundary wall present' : 'no boundary wall'}. ${data.Floor_Allowed_value} floors are permitted, making it ideal to build massive. The property is ${this.PropertyStatuslabel} and open for immediate development.`,
    (data: any) => `This commercial plot is well-situated near ${this.Landmarks_value}. The layout faces ${this.PropertyFacingLabel} and offers ${data.Plot_Dimension_value} area with ${data.Floor_Allowed_value} floors approved. ${data.Boundary_Wall_value === '1' ? 'Boundary wall is already constructed.' : 'No boundary enclosure built yet.'} A ${this.PropertyStatuslabel} opportunity perfect for Farming.`,
    (data: any) => `Located near ${this.Landmarks_value}, this  plot is ${this.PropertyStatuslabel} with ${data.Plot_Dimension_value} area. It faces ${this.PropertyFacingLabel} and allows up to ${data.Floor_Allowed_value} floors. ${data.Boundary_Wall_value === '1' ? 'A solid boundary wall is present.' : 'Open plot without boundary.'} Well-suited for various projects.`,
    (data: any) => `Near ${this.Landmarks_value}, this plot offers ${data.Plot_Dimension_value} area, ${this.PropertyFacingLabel} direction, and supports ${data.Floor_Allowed_value} floors. ${data.Boundary_Wall_value === '1' ? 'Boundary wall constructed for security.' : 'No built boundary at present.'} ${this.PropertyStatuslabel} property.`,
    (data: any) => `Discover this strategically placed plot just steps from ${this.Landmarks_value}. It's ${this.PropertyStatuslabel}, measures ${data.Plot_Dimension_value}, and supports ${data.Floor_Allowed_value} floors. With ${data.Boundary_Wall_value === '1' ? 'a surrounding boundary wall' : 'no boundary wall'}, and ${this.PropertyFacingLabel} facing.`,
    (data: any) => `This plot near ${this.Landmarks_value} faces ${this.PropertyFacingLabel} and is ${this.PropertyStatuslabel}. ${data.Plot_Dimension_value} area with ${data.Floor_Allowed_value} floor clearance. ${data.Boundary_Wall_value === '1' ? 'Secured with boundary wall.' : 'Boundary wall not available.'}`,
    (data: any) => `This commercial plot near ${this.Landmarks_value}. ${data.Plot_Dimension_value} of land with ${this.PropertyFacingLabel} direction and allowance for ${data.Floor_Allowed_value} floors. ${this.PropertyStatuslabel} with ${data.Boundary_Wall_value === '1' ? 'boundary constructed.' : 'open plot layout.'}`,
    (data: any) => `An excellent plot opportunity near ${this.Landmarks_value}. It offers ${data.Plot_Dimension_value}, is ${this.PropertyStatuslabel}, and allows ${data.Floor_Allowed_value} floors. ${data.Boundary_Wall_value === '1' ? 'Wall enclosure is complete.' : 'No fencing provided.'} Perfect for new projects.`,
    (data: any) => `Positioned in a fast-developing area near ${this.Landmarks_value}, this plot is ${this.PropertyStatuslabel} with ${data.Plot_Dimension_value} land and ${this.PropertyFacingLabel} entry. ${data.Floor_Allowed_value} floors permitted. ${data.Boundary_Wall_value === '1' ? 'Enclosed with a boundary wall.' : 'Currently without boundary walls.'}`,
    (data: any) => `Looking for a commercial plot? This one near ${this.Landmarks_value} is ${this.PropertyStatuslabel}, allows ${data.Floor_Allowed_value} floors, and spans ${data.Plot_Dimension_value}. It faces ${this.PropertyFacingLabel} and ${data.Boundary_Wall_value === '1' ? 'comes with a secure boundary wall.' : 'does not have any boundary wall.'}`
  ];
  coWorkingTemplates = [
    (data: any) => `Step into a dynamic co-working zone nestled near ${this.Landmarks_value}, ideal for ${this.SuitedForLabel}. This ${this.PropertyStatuslabel} workspace comes with ${this.FurnishedTypeLabel} interiors and a layout built to foster collaboration. Equipped with shared desks, meeting rooms, phone booths, and breakout spaces, it's perfect for agile teams and creative minds. The vibrant environment enhances focus while offering opportunities for networking. Reliable infrastructure and a well-connected location ensure smooth day-to-day operations. Startups, freelancers, and agencies will find this co-working setup incredibly adaptive and inspiring.`,
    (data: any) => `This premium co-working environment near ${this.Landmarks_value} is crafted for ${this.SuitedForLabel}. The facility is ${this.PropertyStatuslabel} and fully ${this.FurnishedTypeLabel}, featuring plug-and-play desks, collaboration zones, coffee corners, and private meeting spaces. Whether you're a team of two or twenty, the design supports flexibility and creativity. The professional ambiance combined with practical infrastructure makes it suitable for modern businesses, creative professionals, and even remote tech units. Set in a well-connected hub, it encourages productivity, growth, and community building.`,
    (data: any) => `Experience productivity at its peak with this thoughtfully designed co-working hub near ${this.Landmarks_value}. Ideal for ${this.SuitedForLabel}, this ${this.FurnishedTypeLabel} setup is ${this.PropertyStatuslabel} and offers everything from ergonomic workstations to high-speed internet, informal lounges to formal meeting areas. It's built for businesses who prioritize connectivity, collaboration, and creativity. Daily access to support services, print zones, cafeteria, and 24/7 entry allows teams to work on their own schedule. The location ensures easy commutes and great networking opportunities.`,
    (data: any) => `Designed to boost innovation, this collaborative co-working space near ${this.Landmarks_value} offers the right mix of functionality and comfort. Suited for ${this.SuitedForLabel}, it features ${this.FurnishedTypeLabel} amenities like hot desks, meeting pods, event spaces, and quiet zones. This ${this.PropertyStatuslabel} unit encourages organic networking and high efficiency. Startups, independent contractors, and growing teams will find a space that evolves with their needs. The strategic location adds value by offering connectivity to business hubs, cafes, and transport access.`,
    (data: any) => `Looking to work smarter? This co-working unit near ${this.Landmarks_value} is the answer. Ideal for ${this.SuitedForLabel}, it features ${this.FurnishedTypeLabel} interiors and is ${this.PropertyStatuslabel}. From team cabins to brainstorming zones, the space is optimized for collaboration and innovation. Onsite pantry, reception, printer access, and professional ambiance support everything a modern business demands. With flexible working hours and excellent internet speed, it helps professionals thrive without the overhead of a traditional office.`,
    (data: any) => `Give your business the edge with this co-working space near ${this.Landmarks_value}. Best suited for ${this.SuitedForLabel}, the facility is ${this.PropertyStatuslabel} and offers ${this.FurnishedTypeLabel} finishes. The floor plan includes modular desks, client meeting rooms, quiet nooks, and casual lounges. Teams can collaborate freely while enjoying flexibility, tech-ready support, and a balanced professional-social culture. Whether you're in design, tech, or consulting, this space adapts to every mode of working.`,
    (data: any) => `Achieve a new level of productivity with this well-equipped co-working space near ${this.Landmarks_value}. It is ${this.PropertyStatuslabel} and ${this.FurnishedTypeLabel}, tailored for ${this.SuitedForLabel}. The layout includes multi-use areas like discussion booths, open desks, and silent corners. The professional setup is designed to promote deep work, team synergy, and client collaboration under one roof. With quick access to cafés, transport, and banking services, the location makes daily work smoother and stress-free.`,
    (data: any) => `If flexibility and community are your priorities, this co-working setup near ${this.Landmarks_value} ticks every box. ${this.FurnishedTypeLabel} and ${this.PropertyStatuslabel}, it’s ideal for ${this.SuitedForLabel}. From curated networking events to ergonomic furniture and real-time IT support, this space is designed for hustle. Open-plan desks, cabins, conference zones, and refreshment areas create a comprehensive office alternative. Perfect for lean teams, startups, or creatives looking to grow in a well-structured workspace.`,
    (data: any) => `Embrace the future of work at this energetic co-working hub close to ${this.Landmarks_value}. It offers ${this.FurnishedTypeLabel} interiors and is ${this.PropertyStatuslabel}, creating a seamless setting for ${this.SuitedForLabel}. Lounge zones, fast Wi-Fi, whiteboards, video conferencing, and more come together in this well-connected, thoughtfully designed space. Professionals can switch between focus zones and collaborative sessions effortlessly. With all essentials under one roof, the environment inspires productivity and creativity equally.`,
    (data: any) => `Position your team in a lively co-working space near ${this.Landmarks_value}. Ideal for ${this.SuitedForLabel}, this ${this.FurnishedTypeLabel} property is ${this.PropertyStatuslabel}. Desks, cabins, shared rooms, and informal lounges coexist in perfect balance. The ambiance supports fast-paced decision-making, creative bursts, and client-ready professionalism. Easy access to nearby restaurants and services makes breaks and post-work hangouts convenient. This space is built for modern professionals who want flexibility without sacrificing professionalism.`
  ];
  warehouseTemplates = [
    (data: any) => `This large warehouse located in ${data.Property_Locality_value} near ${this.Landmarks_value} is designed for fast logistics. With ${this.BuildingTypeLabel} structure and ${this.PropertyStatuslabel} status, it provides ${data.Total_Floors_value} floors and ${data.Parking_Count_value} dedicated parking slots. Ideal for ${this.SuitedForLabel}, the facility allows smooth vehicle access and 24/7 operations. High-clearance ceilings and wide entry points make it perfect for loading docks, pallet systems, and bulk inventory. Situated in a strategic corridor, it ensures easy access to major transportation and supply hubs, reducing last-mile delivery time and improving warehouse-to-store dispatch efficiency.`,
    (data: any) => `Strategically placed in ${data.Property_Locality_value} near ${this.Landmarks_value}, this warehouse is purpose-built for ${this.SuitedForLabel}. Featuring ${this.BuildingTypeLabel} construction and ${this.PropertyStatuslabel} readiness, the property includes ${data.Total_Floors_value} floors and ${data.Parking_Count_value} vehicle bays. From goods stacking to industrial operations, this space supports it all. Strong boundary fencing and well-drained flooring ensure durability and safety. Located close to major transport roads, it helps minimize lead time and supports full-day logistics without delays, making it ideal for fast-scaling supply chains and vendors.`,
    (data: any) => `Available for immediate lease, this ${this.PropertyStatuslabel} warehouse in ${data.Property_Locality_value}, near ${this.Landmarks_value}, offers an ideal logistics base. Featuring ${this.BuildingTypeLabel} design, ${data.Total_Floors_value} floors, and ${data.Parking_Count_value} parking bays, the space is optimized for goods movement, secure storage, and dispatch. It features wide entry gates for containers, clear vertical storage capacity, and uninterrupted loading operations. Best suited for ${this.SuitedForLabel}, the location ensures smooth truck connectivity to highways and regional warehouses, supporting flexible fulfillment schedules.`,
    (data: any) => `Unlock warehousing potential with this ${this.PropertyStatuslabel} unit in ${data.Property_Locality_value}, close to ${this.Landmarks_value}. It spans ${data.Total_Floors_value} floors, offers ${data.Parking_Count_value} slots, and is built with ${this.BuildingTypeLabel} standards. Ideal for ${this.SuitedForLabel}, the space supports eCommerce, FMCG, manufacturing storage, or third-party logistics. The compound includes high-volume loading capacity, security infrastructure, and fire protection provisions. This property is logistics-ready and well-connected to key supply hubs, industrial estates, and business corridors.`,
    (data: any) => `This well-connected warehouse in ${data.Property_Locality_value}, near ${this.Landmarks_value}, is crafted for high-volume warehousing. Featuring ${data.Total_Floors_value} floors and ${data.Parking_Count_value} designated parking spots, it follows a ${this.BuildingTypeLabel} structure and is ${this.PropertyStatuslabel}. Suitable for ${this.SuitedForLabel}, it ensures scalable storage, secure vehicle entry, and operational efficiency. Dock-level loading, proper ventilation, and wide corridors simplify daily dispatches and returns. Whether you're a wholesaler or distributor, this facility meets modern storage and inventory needs.`,
    (data: any) => `Presenting a logistics-ready warehouse in ${data.Property_Locality_value}, minutes away from ${this.Landmarks_value}. This ${this.PropertyStatuslabel} property is constructed in a ${this.BuildingTypeLabel} layout, spread across ${data.Total_Floors_value} levels and ${data.Parking_Count_value} parking bays. Built for ${this.SuitedForLabel}, the space includes ample docking areas, wide truck bays, and easy maneuverability. Power backup and industrial flooring enhance its load capacity. Whether used for raw material storage or order fulfillment, this location supports fast, safe, and systematic logistics workflows.`,
    (data: any) => `Located in the well-networked area of ${data.Property_Locality_value} near ${this.Landmarks_value}, this warehouse provides top-notch storage for ${this.SuitedForLabel}. With ${data.Total_Floors_value} floors and ${data.Parking_Count_value} parking lots, the ${this.PropertyStatuslabel} facility includes tall ceilings, ventilated bays, and robust entry points. Built with ${this.BuildingTypeLabel} strength, it's suited for both cold-chain logistics and dry storage. The road infrastructure supports round-the-clock truck movement, making it a reliable distribution base for regional and last-mile logistics.`,
    (data: any) => `Well-suited for industrial storage, this ${this.BuildingTypeLabel} warehouse in ${data.Property_Locality_value}, near ${this.Landmarks_value}, is ${this.PropertyStatuslabel} and immediately usable. With ${data.Total_Floors_value} usable levels and ${data.Parking_Count_value} on-site parking spaces, the facility accommodates high-rack systems, forklifts, and transport vans. It’s ideal for ${this.SuitedForLabel} needing staging and cross-docking functionality. Its design supports high inbound-outbound movement with minimal delays, contributing to improved operational workflows.`,
    (data: any) => `Warehouse space now available in ${data.Property_Locality_value}, located close to ${this.Landmarks_value}, this ${this.PropertyStatuslabel} unit is constructed with ${this.BuildingTypeLabel} specifications. ${data.Total_Floors_value} floors and ${data.Parking_Count_value} parking spaces support quick vehicle movement. Ideal for ${this.SuitedForLabel}, this space features reinforced flooring, spacious aisles, and power supply for heavy machinery or lighting. It’s best for bulk inventory handling, rapid packaging, or secondary distribution units.`,
    (data: any) => `Located in a fast-developing warehouse cluster at ${data.Property_Locality_value}, near ${this.Landmarks_value}, this facility offers a total of ${data.Total_Floors_value} floors and ${data.Parking_Count_value} parking bays. ${this.PropertyStatuslabel} and designed using ${this.BuildingTypeLabel}, it suits ${this.SuitedForLabel} seeking strong infrastructure and seamless delivery capabilities. With clear span height, dock access, and multiple entry-exit points, this unit helps scale logistics while cutting down delay and damages.`
  ];
  othersTemplates = [
    (data: any) => `Set up your venture in a well-developed commercial unit near ${this.Landmarks_value}. Designed as a ${this.BuildingTypeLabel}, this ${this.PropertyStatuslabel} property offers ${data.Total_Floors_value} functional floors and ${data.Parking_Count_value} parking spots. Perfect for ${this.SuitedForLabel}, such as clinics, coaching centers, or agencies. The layout promotes smooth business operations with a professional look and customer access. Located in a visible zone with easy transport, this space fits startups or expansions aiming for high footfall and service accessibility.`,
    (data: any) => `Discover a flexible-use commercial space close to ${this.Landmarks_value}. This ${this.PropertyStatuslabel} listing with ${data.Total_Floors_value} usable floors and ${data.Parking_Count_value} dedicated parking slots is structured as a ${this.BuildingTypeLabel}. Ideal for ${this.SuitedForLabel}, from private firms and digital startups to clinics or art studios. Located in a busy neighborhood with all essential connectivity and visibility for customer walk-ins or staff travel.`,
    (data: any) => `Unlock your commercial potential near ${this.Landmarks_value}. This multi-purpose space includes ${data.Total_Floors_value} floors, ${data.Parking_Count_value} parking, and a professional ${this.BuildingTypeLabel} layout. ${this.PropertyStatuslabel} and ready for use by ${this.SuitedForLabel}, including consultancies, education hubs, or design studios. Easy access for clients and a smart interior design makes this a go-to pick for varied services.`,
    (data: any) => `Step into this professional commercial unit located just off ${this.Landmarks_value}. Featuring ${data.Total_Floors_value} structured floors, ${data.Parking_Count_value} parking spots, and a ${this.PropertyStatuslabel} status, this ${this.BuildingTypeLabel} layout is perfect for ${this.SuitedForLabel}. Whether you're into consulting, beauty care, or private healthcare, this spot supports operational comfort and visitor convenience.`,
    (data: any) => `Looking for a space with multi-business adaptability? This commercial unit near ${this.Landmarks_value} offers just that. ${data.Total_Floors_value} floors and ${data.Parking_Count_value} parking slots make it suitable for ${this.SuitedForLabel}. The ${this.PropertyStatuslabel} layout and ${this.BuildingTypeLabel} structure ensure usability for everything from studios to legal offices. Great accessibility and smart design add to its appeal.`,
    (data: any) => `Find a solid base for your business near ${this.Landmarks_value}. This commercial listing features ${data.Total_Floors_value} floors, ${data.Parking_Count_value} parking options, and a ${this.PropertyStatuslabel} tag. Structured as a ${this.BuildingTypeLabel}, it's ideal for ${this.SuitedForLabel} such as therapists, engineers, or art spaces. Located in a prime corridor, it ensures easy discovery and smooth functioning.`,
    (data: any) => `Perfect for diverse setups, this commercial unit near ${this.Landmarks_value} brings utility and visibility together. ${this.PropertyStatuslabel} configuration with ${data.Total_Floors_value} floors and ${data.Parking_Count_value} parking slots makes it a good fit for ${this.SuitedForLabel}. The ${this.BuildingTypeLabel} layout is clean, organized, and professional—suitable for fashion, health, or education-based brands.`,
    (data: any) => `Professional-grade commercial space available beside ${this.Landmarks_value}. Built with ${this.BuildingTypeLabel} architecture and ${this.PropertyStatuslabel} condition, the unit supports ${data.Total_Floors_value} floors and includes ${data.Parking_Count_value} dedicated vehicle spaces. Apt for ${this.SuitedForLabel} such as HR firms, boutique agencies, or city service points.`,
    (data: any) => `Kickstart your business journey near ${this.Landmarks_value} with this commercial property. With ${data.Total_Floors_value} levels and ${data.Parking_Count_value} parking spaces, the ${this.BuildingTypeLabel} setup is ${this.PropertyStatuslabel} and crafted for ${this.SuitedForLabel}. It offers a comfortable layout that works for clinics, legal firms, or co-ops, and stands in a well-connected commercial belt.`,
    (data: any) => `Your next business address awaits just steps from ${this.Landmarks_value}. This ${this.PropertyStatuslabel} commercial unit comes with ${data.Total_Floors_value} operational floors and ${data.Parking_Count_value} parking bays. With a clear ${this.BuildingTypeLabel} structure, it’s made for ${this.SuitedForLabel} looking for high visibility, serviceability, and access in one compact location.`
  ];
  generateDescription() {
    const isPG = this.Property_Type?.toLowerCase() === 'residential_pg';
    if (isPG) {
      const rent = this.form?.get('rent')?.value || 'N/A';
      const deposit = this.form?.get('deposit')?.value || 'N/A';
      const roomType = this.currentModalTitle || 'room';
      const foodArray = this.FifthFormGroup?.get('PG_Food')?.value || [];
      const food = Array.isArray(foodArray) ? foodArray.join(', ') : 'Not Provided';
      const facilities = this.form &&
        Object.entries(this.form.value)
          .filter(([_, value]) => value === true)
          .map(([key]) => key)
          .join(', ') || 'basic features';
      const pgData = {
        rent: rent.toLocaleString(),
        deposit: deposit.toLocaleString(),
        roomType,
        food,
        facilities
      };
      const templateIndex = Math.floor(Math.random() * this.descriptionTemplates.length);
      const newDescription = this.descriptionTemplates[templateIndex](pgData);
      this.SeventhFormGroup.get('propertyDescription')?.setValue(newDescription);
    } else {
      const commercialData = {
        type: this.Commercial_Type || 'Commercial Property',
        address: this.address || 'a prime location',
        suitedFor: this.Suited_For_value || 'any business setup',
        furnished: this.Furnished_Type_value || 'semi-furnished',
        status: this.Property_Status_value || 'ready to occupy',
        customizable: this.Property_Customizable_value === 'Yes',
        rera: this.RERA_Number_value || 'N/A'
      };
      let templates = this.othersTemplates;
      switch (this.Commercial_Property_Type_value) {
        case '1': templates = this.officeTemplates; break;
        case '2': templates = this.shopTemplates; break;
        case '3': templates = this.plotTemplates; break;
        case '4': templates = this.coWorkingTemplates; break;
        case '5': templates = this.warehouseTemplates; break;
        case '6': templates = this.othersTemplates; break;
      }
      const templateIndex = Math.floor(Math.random() * templates.length);
      const newDescription = templates[templateIndex](commercialData);
      this.SeventhFormGroup.get('propertyDescription')?.setValue(newDescription);
    }
    this.showRegenerateButton = true;
  }


  selectedUnit = 'sqfeet';
  selectedUnitBuilt = 'sq. ft';
  selectedUnitSuperBuilt = 'sq. ft';
  selectedUnitPlotDimension = 'sqfeet';
  selectedUnitPlotBreadth = 'Meters (m)';
  selectedUnitPlotLength = 'Meters (m)';
  amenitiesListToUse: any[] = [];
  pgAmenitiesList = [];
  pgRulesList = [];
  pgServiceList = [];
  roomTypes = [];
  pgFoodChargesList = [];
  pgListingAsList = [];
  pgMealTypeList = [];
  pgTenantsReturnByList = [];
  pgStartedYearList = [];
  pgAvailableForList = [];
  pgFacilitiesList = [];
  pgNoticePeriodList = [];
  pgBestSuitForList = [];
  roomOtherTypes = [];
  pgFoodList = [];
  Parking = [];
  imageslist = [];
  plotViewList = [];
  PgDataFilters() {
    var param = {
      CityId: ''
    }
    this.Service.postPropNewPg(param).subscribe(list => {

      if (this.Property_Type = 'Residential_Pg') {
        this.pgAmenitiesList = list['pg_AmenitiesList'];
        this.amenitiesListToUse = this.pgAmenitiesList;
      }
      this.pgRulesList = list['pgRulesList'];
      this.pgServiceList = list['pgServiceList'];
      this.pgFacilitiesList = list['pgFacilitiesList'];
      this.roomTypes = list['roomTypes'].map(room => ({
        ...room,
        value: room.value.toString() // Ensure value is a string
      }));
      this.initForm();
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
      this.plotViewList = list['plotViewList'];

      if (list['status'] === 'True') {
        this.getlocationlistPg();
      }
    });
  }
  commercialPropertyTypeList = [];
  commercialListingAsList = [];
  suitedForList = [];
  officeSuitedFor = [];
  warehousesuitedfor = [];
  plotTypeList = [];
  buildingTypeList = [];
  propertyStatusList = [];
  furnishTypeList = [];
  propertyAgeList = [];
  propertyFacingList = [];
  lockInPeriodList = [];
  plotFacilitiesList = [];
  officeFacilitiesList = [];
  shopFacilitiesList = [];
  warehouseFacilitiesList = [];
  commercialAmenitiesList = [];
  commercialDataFilter() {
    var param = {
      CityId: '',
      sale_rent: '',
      typeid: '',
    }
    this.Service.postPropNewCommercial(param).subscribe(list => {



      if (this.Property_Type = 'Commercial') {
        this.commercialAmenitiesList = list['commercial_AmenitiesList'];
        this.amenitiesListToUse = this.commercialAmenitiesList;
      }
      this.commercialPropertyTypeList = list['commercialPropertyTypeList'];
      this.commercialListingAsList = list['commercialListingAsList'];
      this.suitedForList = list['suitedForList'];
      this.officeSuitedFor = list['officeSuitedFor'];
      this.warehousesuitedfor = list['warehousesuitedfor'];
      this.plotTypeList = list['plotTypeList'];
      this.buildingTypeList = list['buildingTypeList'];
      this.propertyStatusList = list['propertyStatusList'];
      this.imageslist = list['imageslist'];
      this.plotViewList = list['plotViewList'];
      this.furnishTypeList = list['furnishTypeList'];
      this.propertyAgeList = list['propertyAgeList'];
      this.propertyFacingList = list['propertyFacingList'];
      this.lockInPeriodList = list['lockInPeriodList'];
      const facilitiesList = list['FacilitiesList'];
      this.officeFacilitiesList = facilitiesList.filter(item => item.property_type === '1');
      this.shopFacilitiesList = facilitiesList.filter(item => item.property_type === '2');
      this.plotFacilitiesList = facilitiesList.filter(item => item.property_type === '3');
      this.warehouseFacilitiesList = facilitiesList.filter(item => item.property_type === '4');


      if (list['status'] === 'True') {
        this.getlocationlistCommercial();
      }

    });
  }
  detailedSubmit = true;
  loadComponent = false;
  otpValidationComponent: any;
  submitionLoader = false;
  UserName;
  LastName;
  UserEmail;
  UserNumber;
  lastUsername: any;
  UserId: any;
  FacilitiesList: any;
  avaliableData: any
  Lease: any
  maintain: any;
  ageOfProperty: any
  rentPerMonth: any
  postProp() {
    this.loginId = localStorage.getItem('loginID');
    if (this.loginId === null || this.loginId === undefined || this.loginId === '') {
      window.location.hash = 'postsellpropnew';
      swal({
        title: 'Almost There!',
        text: 'Are you ready to list your property?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#971b47',
        cancelButtonColor: '#d33',
        confirmButtonText: 'submit'
      }).then((result) => {
        if (result.value === true) {
          this.detailedSubmit = false;
          $('#otpValidate').css('display', 'block')
          $('#clicktest').click();
          if (this.loadComponent == false) {
            this.loadComponent = true;
            import('../otp-validation/otp-validation.module').then(mod => mod.OtpValidationModule).then(otpValidationComponent => {
              this.otpValidationComponent = otpValidationComponent.components['lazy'];
            });
          } else {
            this.loadComponent = false;
          }
        }
      })
    } else {
      if (this.loadComponent == false) {
        swal({
          title: 'Submit Form ?',
          text: 'Your Property will be Listed',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#971b47',
          cancelButtonColor: '#d33',
          confirmButtonText: 'submit!'
        }).then((result) => {
          if (result.value === true) {
            this.detailedSubmit = false;
            this.showModalKey();
            $('#KeyGifLastModal').modal('show');
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
            if (this.locality_id != undefined) {
              this.propertyAutoRentLocalityName = ''
            }
            if (this.locality_id == undefined) {
              this.locality_id = ''
            }
            if (this.Property_Type == 'Residential_Pg') {
              const params = {
                pg_Propid: this.PropertyId,
                User_id: this.UserId,
                Available_for: this.Property_Available_value,
                Propartiy_city: this.CityName,
                locality_id: this.locality_id,
                Propartiy_Locality: this.selectedLoc,
                locality_Requested_pg: this.propertyAutoRentLocalityName,
                Listedby: this.Listing_As_value,
                PG_Name: this.PG_Name_value,
                PG_Address: this.PG_Address_value,
                PG_Pincode: this.PG_PinCode_value,
                Pg_started_in: this.PG_Started_Year_value,
                Landmarks: this.Landmarks_value,
                room_categories: JSON.stringify(this.roomSummaryData),
                pg_type: this.PG_Avaliable_for,
                Bestsuitedfor: this.Best_Suit_For_value,
                parking_available: this.Parking_Avaliable_value,
                notice_peroid: this.Notice_Period_value,
                Tenates_return_by: this.Tenants_Must_Return_By_value,
                PG_rules: this.PG_Rules_value,
                Meals_available: this.PG_Food_value,
                Meals_type: this.Meal_Type_value,
                Food_provided: this.Food_Provided_value,
                Food_charges: this.PG_Food_Charges_value,
                Parking_Type: this.Parking_Type_value,
                PG_Services: this.pgServices_value,
                Amenities: this.selectedAmenities,
                // Firstname: this.First_Name_value,
                // Lastname: this.Last_Name_value,
                // Email_id: this.Email_Address_value,
                // Phone_number: this.Phone_Number_value,
                Description: this.propertyDescription_value,
              };
              this.Service.postPropertyPgUpdate(params).subscribe((responce: any) => {
                if (responce['status'] === 'True') {
                  this.submitionLoader = false;
                  var PropertyID = responce.Data.Property_ID_PG;
                  this.PropertyID = PropertyID;
                  // setTimeout(() => {
                  //   this.closeKeyGifLastModal()
                  // }, 8000);
                  this.photoUpload();
                  window.location.hash = '';
                  // setTimeout(() => {
                  //   swal(
                  //     'Submited!',
                  //     'Your Property Added Successfully',
                  //     'success'
                  //   );
                  // }, 8000);
                  // setTimeout(() => {
                  //   this.router.navigate(['/userauth/sellingprojects/' + this.UserId]);
                  //   setTimeout(() => {
                  //     // window.location.reload();
                  //   }, 1000);
                  // }, 8000);
                }
              });
            } else {
              if (this.Plot_Facilities_value && this.Commercial_Type == 'Plot') {
                this.FacilitiesList = this.Plot_Facilities_value
              }
              if (this.Shop_Facilities_value && this.Commercial_Type == 'shopShowroom') {
                this.FacilitiesList = this.Shop_Facilities_value
              }
              if (this.Office_Space_Facilities_value && this.Commercial_Type == 'officeSpace') {
                this.FacilitiesList = this.Office_Space_Facilities_value
              }
              if (this.Warehouse_Facilities_value && this.Commercial_Type == 'warehouse') {
                this.FacilitiesList = this.Warehouse_Facilities_value
              }
              if (this.Available_From_value && this.Commercial_Type == 'Plot' && this.property_for == 'sale') {
                this.avaliableData = this.datePipe.transform(this.Available_From_value, 'dd-MM-yyyy');
              }
              if (this.Avaliable_Date_Rent_value && this.Property_Type == 'Commercial' && this.property_for == 'rent') {
                this.avaliableData = this.datePipe.transform(this.Avaliable_Date_Rent_value, 'dd-MM-yyyy');
              }
              if (this.Possession_Date_value && this.propertyStatus == 'Under_Construction' && this.property_for == 'sale') {
                this.Possession_Date_value = this.datePipe.transform(this.Possession_Date_value, 'dd-MM-yyyy');
              }

              if (this.Only_Lease_Shop_value && (this.Commercial_Type == 'shopShowroom' || this.Commercial_Type == 'warehouse') && this.property_for == 'rent') {
                this.Lease = this.Only_Lease_Shop_value
                if (this.Only_Lease_Shop_value == 1) {
                  this.IncludedInRent_Value = 2
                }
              }
              if (this.Only_Lease_value && (this.Commercial_Type == 'Plot' || this.Commercial_Type == 'officeSpace') && this.property_for == 'rent') {
                this.Lease = this.Only_Lease_value
                if (this.Only_Lease_value == 1) {
                  this.IncludedInRent_Value = 2
                }
              }

              if (this.Maintenance_Amount_Plot_value && (this.Commercial_Type == 'Plot' || this.Commercial_Type == 'shopShowroom' || this.Commercial_Type == 'warehouse') && this.property_for == 'rent' && this.Property_Type == 'Commercial') {
                this.maintain = this.Maintenance_Amount_Plot_value
              }
              if (this.MaintenanceCharges_Value && this.Commercial_Type == 'officeSpace' && this.property_for == 'rent' && this.Property_Type == 'Commercial') {
                this.maintain = this.MaintenanceCharges_Value
              }

              if (this.Age_Of_Property_Rent_value && this.property_for == 'rent' && (this.Commercial_Type == 'officeSpace' || this.Commercial_Type == 'shopShowroom' || this.Commercial_Type == 'warehouse' || this.Commercial_Type == 'Plot')) {
                this.ageOfProperty = this.Age_Of_Property_Rent_value

              }


              if (this.Age_Of_Property_value && this.propertyStatus == 'Ready_To_Move' && this.property_for == 'sale') {
                this.ageOfProperty = this.Age_Of_Property_value
              }


              if (this.Rent_Per_Month_value && this.Commercial_Type == 'Plot' && this.property_for == 'rent' && !this.forlease && this.Property_Type == 'Commercial') {
                this.rentPerMonth = this.Rent_Per_Month_value
              }
              if (this.Rent_Per_Month_Shop_value && (this.Commercial_Type == 'shopShowroom' || this.Commercial_Type == 'officeSpace' || this.Commercial_Type == 'warehouse') && this.property_for == 'rent' && this.Property_Type == 'Commercial' && !this.forlease) {
                this.rentPerMonth = this.Rent_Per_Month_Shop_value
              }

              if (this.IncludedInRent_Value) {
                this.IncludedInRent_Value = "1"
              } else {
                this.IncludedInRent_Value = "2"
              }
              const paramsCommercial = {
                user_IDFK: this.UserId,
                Propid: this.PropertyId,

                Property_Type: this.Commercial_Property_Type_value,
                available_for: this.Property_Available_value,
                Property_city: this.CityName,
                property_type_commercial: this.Property_Type_value,
                Propartiy_Locality: this.selectedLoc,
                locality_id: this.locality_id,
                locality_Requested: this.propertyAutoRentLocalityName,
                commercial_property: this.Commercial_Property_Name_value,
                your_listing_property_as: this.Commercial_Listing_As_value,
                property_address: this.address,
                postal_code: this.Commercial_Postal_Code_value,
                land_mark: this.Landmarks_value,
                suited_for: this.Suited_For_value,
                building_type: this.Building_Type_value,
                carpet_area: this.Carpet_Area_value,
                carpet_area_type: this.carpet_area_type_value,
                property_status: this.Property_Status_value,
                furnished_type: this.Furnished_Type_value,
                property_customizable: this.Property_Customizable_value,
                built_up_area: this.Buitl_Up_Area_value,
                Buitl_Up_Area_type: this.Buitl_Up_Area_type_value,
                age_of_property_value: this.ageOfProperty,
                possession_date: this.Possession_Date_value,
                total_floors: this.Total_Floors_value,
                your_floor_no: this.Floor_NO_value,
                covered_parking: this.Covered_Parking_value,
                no_of_open_parking: this.Open_Parking_Count_value,
                max_no_of_seats: this.Max_No_Of_Seats_value,
                no_of_cabin: this.Total_Cabin_Count_value,
                total_lease_amount: this.total_lease_amount_value,
                total_amount: this.Total_Amount_value,
                negotiable: this.Negotiable_value,
                first_name: this.First_Name_value,
                last_name: this.Last_Name_value,
                email_address: this.Email_Address_value,
                phone_number: this.Phone_Number_value,
                rent_per_month: this.rentPerMonth,
                lease: this.Lease,
                lock_in_period: this.Lock_In_Period_value,
                available_from: this.avaliableData,
                security_deposit: this.Security_Deposit_value,
                super_built_up_area: this.Super_Buitl_Up_Area_value,
                Super_Buitl_Up_Area_type: this.Super_Buitl_Up_Area_type_value,
                is_corner_shop_value: this.Is_Corner_Shop_value,
                rera_number: this.RERA_Number_value,
                private_washroom: this.Private_Washroom_value,
                booking_token_amount: this.Booking_Token_Amount_value,
                maintenance_charge: this.maintain,
                included_in_rent: this.IncludedInRent_Value,
                plot_dimension: this.Plot_Dimension_value,
                Plot_Dimension_type: this.Plot_Dimension_type_value,
                boundary_wall: this.Boundary_Wall_value,
                any_construction_done: this.Any_Construction_Done_value,
                no_open_sides: this.Open_Sides_value,
                plot_breadth: this.Plot_Breadth_value,
                Plot_Breadth_type: this.Plot_Breadth_type_value,
                plot_length: this.Plot_Length_value,
                Plot_Length_type: this.Plot_Length_type_value,
                property_facing: this.Property_Facing_value,
                corner_plot: this.Corner_Plot_value,
                floor_allowed: this.Floor_Allowed_value,
                plot_type: this.Plot_Type_value,
                no_of_parking: this.Parking_Count_value,
                no_of_washroom: this.Washroom_Counts_value,
                property_description: this.propertyDescription_value,
                Amenities: this.selectedAmenities,
                Facilities: this.FacilitiesList,
              };
              this.Service.postPropertyCommercialUpdate(paramsCommercial).subscribe((responce: any) => {
                if (responce['status'] === 'True') {
                  var PropertyID = responce.Data.property_id_comm;
                  this.PropertyID = PropertyID;
                  this.photoUploadCommercial()
                  // setTimeout(() => {
                  //   this.closeKeyGifLastModal()
                  // }, 8000);
                  // setTimeout(() => {
                  //   swal(
                  //     'Submited!',
                  //     'Your Property Added Successfully',
                  //     'success'
                  //   );
                  // }, 8000);
                }
              });
            }
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
        if (this.locality_id != undefined) {
          this.propertyAutoRentLocalityName = ''
        }
        if (this.locality_id == undefined) {
          this.locality_id = ''
        }
        this.showModalKey();
        $('#KeyGifLastModal').modal('show');
        if (this.Property_Type == 'Residential_Pg') {
          const params = {
            pg_Propid: this.PropertyId,
            User_id: this.UserId,
            Available_for: this.Property_Available_value,
            Propartiy_city: this.CityName,
            Propartiy_Locality: this.selectedLoc,
            locality_id: this.locality_id,
            locality_Requested_pg: this.propertyAutoRentLocalityName,
            Listedby: this.Listing_As_value,
            PG_Name: this.PG_Name_value,
            PG_Address: this.PG_Address_value,
            PG_Pincode: this.PG_PinCode_value,
            Pg_started_in: this.PG_Started_Year_value,
            Landmarks: this.Landmarks_value,
            room_categories: JSON.stringify(this.roomSummaryData),
            pg_type: this.PG_Avaliable_for,
            Bestsuitedfor: this.Best_Suit_For_value,
            parking_available: this.Parking_Avaliable_value,
            notice_peroid: this.Notice_Period_value,
            Tenates_return_by: this.Tenants_Must_Return_By_value,
            PG_rules: this.PG_Rules_value,
            Parking_Type: this.Parking_Type_value,
            Meals_available: this.PG_Food_value,
            Meals_type: this.Meal_Type_value,
            Food_provided: this.Food_Provided_value,
            Food_charges: this.PG_Food_Charges_value,
            PG_Services: this.pgServices_value,
            Amenities: this.selectedAmenities,
            // Firstname: this.First_Name_value,
            // Lastname: this.Last_Name_value,
            // Email_id: this.Email_Address_value,
            // Phone_number: this.Phone_Number_value,
            Description: this.propertyDescription_value,
          };
          this.Service.postPropertyPgUpdate(params).subscribe((responce: any) => {
            if (responce['status'] === 'True') {
              this.submitionLoader = false;
              var PropertyID = responce.Data.Property_ID_PG;
              this.PropertyID = PropertyID;
              this.photoUpload();
              window.location.hash = '';
              // setTimeout(() => {
              //   this.closeKeyGifLastModal()
              // }, 8000);
              // setTimeout(() => {
              //   swal(
              //     'Submited!',
              //     'Your Property Added Successfully',
              //     'success'
              //   );
              // }, 8000);
              // setTimeout(() => {
              //   this.router.navigate(['/userauth/sellingprojects/' + this.UserId]);
              //   setTimeout(() => {
              //     // window.location.reload();
              //   }, 1000);
              // }, 8000);
            }
          });
        } else {
          if (this.Plot_Facilities_value && this.Commercial_Type == 'Plot') {
            this.FacilitiesList = this.Plot_Facilities_value
          }
          if (this.Shop_Facilities_value && this.Commercial_Type == 'shopShowroom') {
            this.FacilitiesList = this.Shop_Facilities_value
          }
          if (this.Office_Space_Facilities_value && this.Commercial_Type == 'officeSpace') {
            this.FacilitiesList = this.Office_Space_Facilities_value
          }
          if (this.Warehouse_Facilities_value && this.Commercial_Type == 'warehouse') {
            this.FacilitiesList = this.Warehouse_Facilities_value
          }
          if (this.Available_From_value && this.Commercial_Type == 'Plot' && this.property_for == 'sale') {
            this.avaliableData = this.datePipe.transform(this.Available_From_value, 'dd-MM-yyyy');
          }
          if (this.Avaliable_Date_Rent_value && this.Property_Type == 'Commercial' && this.property_for == 'rent') {
            this.avaliableData = this.datePipe.transform(this.Avaliable_Date_Rent_value, 'dd-MM-yyyy');
          }
          if (this.Possession_Date_value && this.propertyStatus == 'Under_Construction' && this.property_for == 'sale') {
            this.Possession_Date_value = this.datePipe.transform(this.Possession_Date_value, 'dd-MM-yyyy');
          }

          if (this.Only_Lease_Shop_value && (this.Commercial_Type == 'shopShowroom' || this.Commercial_Type == 'warehouse') && this.property_for == 'rent') {
            this.Lease = this.Only_Lease_Shop_value
            if (this.Only_Lease_Shop_value == 1) {
              this.IncludedInRent_Value = 2
            }
          }
          if (this.Only_Lease_value && (this.Commercial_Type == 'Plot' || this.Commercial_Type == 'officeSpace') && this.property_for == 'rent') {
            this.Lease = this.Only_Lease_value
            if (this.Only_Lease_value == 1) {
              this.IncludedInRent_Value = 2
            }
          }

          if (this.Maintenance_Amount_Plot_value && (this.Commercial_Type == 'Plot' || this.Commercial_Type == 'shopShowroom' || this.Commercial_Type == 'warehouse') && this.property_for == 'rent' && this.Property_Type == 'Commercial') {
            this.maintain = this.Maintenance_Amount_Plot_value
          }
          if (this.MaintenanceCharges_Value && this.Commercial_Type == 'officeSpace' && this.property_for == 'rent' && this.Property_Type == 'Commercial') {
            this.maintain = this.MaintenanceCharges_Value
          }

          if (this.Age_Of_Property_Rent_value && this.property_for == 'rent' && (this.Commercial_Type == 'officeSpace' || this.Commercial_Type == 'shopShowroom' || this.Commercial_Type == 'warehouse' || this.Commercial_Type == 'Plot')) {
            this.ageOfProperty = this.Age_Of_Property_Rent_value

          }
          if (this.Age_Of_Property_value && this.propertyStatus == 'Ready_To_Move' && this.property_for == 'sale') {
            this.ageOfProperty = this.Age_Of_Property_value
          }
          if (this.Rent_Per_Month_value && this.Commercial_Type == 'Plot' && this.property_for == 'rent' && !this.forlease && this.Property_Type == 'Commercial') {
            this.rentPerMonth = this.Rent_Per_Month_value
          }
          if (this.Rent_Per_Month_Shop_value && (this.Commercial_Type == 'shopShowroom' || this.Commercial_Type == 'officeSpace' || this.Commercial_Type == 'warehouse') && this.property_for == 'rent' && this.Property_Type == 'Commercial' && !this.forlease) {
            this.rentPerMonth = this.Rent_Per_Month_Shop_value
          }

          if (this.IncludedInRent_Value) {
            this.IncludedInRent_Value = "1"
          } else {
            this.IncludedInRent_Value = "2"
          }
          const paramsCommercial = {
            user_IDFK: this.UserId,
            Propid: this.PropertyId,
            Property_Type: this.Commercial_Property_Type_value,
            available_for: this.Property_Available_value,
            Property_city: this.CityName,
            property_type_commercial: this.Property_Type_value,
            Propartiy_Locality: this.selectedLoc,
            locality_id: this.locality_id,
            locality_Requested: this.propertyAutoRentLocalityName,
            commercial_property: this.Commercial_Property_Name_value,
            your_listing_property_as: this.Commercial_Listing_As_value,
            property_address: this.address,
            postal_code: this.Commercial_Postal_Code_value,
            land_mark: this.Landmarks_value,
            suited_for: this.Suited_For_value,
            building_type: this.Building_Type_value,
            carpet_area: this.Carpet_Area_value,
            carpet_area_type: this.carpet_area_type_value,
            property_status: this.Property_Status_value,
            furnished_type: this.Furnished_Type_value,
            property_customizable: this.Property_Customizable_value,
            built_up_area: this.Buitl_Up_Area_value,
            Buitl_Up_Area_type: this.Buitl_Up_Area_type_value,
            age_of_property_value: this.ageOfProperty,
            possession_date: this.Possession_Date_value,
            total_floors: this.Total_Floors_value,
            your_floor_no: this.Floor_NO_value,
            covered_parking: this.Covered_Parking_value,
            no_of_open_parking: this.Open_Parking_Count_value,
            max_no_of_seats: this.Max_No_Of_Seats_value,
            no_of_cabin: this.Total_Cabin_Count_value,
            total_lease_amount: this.total_lease_amount_value,
            total_amount: this.Total_Amount_value,
            negotiable: this.Negotiable_value,
            first_name: this.First_Name_value,
            last_name: this.Last_Name_value,
            email_address: this.Email_Address_value,
            phone_number: this.Phone_Number_value,
            age_of_property_rent: this.Age_Of_Property_Rent_value,
            rent_per_month: this.rentPerMonth,
            lease: this.Lease,
            lock_in_period: this.Lock_In_Period_value,
            available_from: this.avaliableData,
            security_deposit: this.Security_Deposit_value,
            super_built_up_area: this.Super_Buitl_Up_Area_value,
            Super_Buitl_Up_Area_type: this.Super_Buitl_Up_Area_type_value,
            is_corner_shop_value: this.Is_Corner_Shop_value,
            rera_number: this.RERA_Number_value,
            private_washroom: this.Private_Washroom_value,
            booking_token_amount: this.Booking_Token_Amount_value,
            maintenance_charge: this.maintain,
            included_in_rent: this.IncludedInRent_Value,
            plot_dimension: this.Plot_Dimension_value,
            Plot_Dimension_type: this.Plot_Dimension_type_value,
            boundary_wall: this.Boundary_Wall_value,
            any_construction_done: this.Any_Construction_Done_value,
            no_open_sides: this.Open_Sides_value,
            plot_breadth: this.Plot_Breadth_value,
            Plot_Breadth_type: this.Plot_Breadth_type_value,
            plot_length: this.Plot_Length_value,
            Plot_Length_type: this.Plot_Length_type_value,
            property_facing: this.Property_Facing_value,
            corner_plot: this.Corner_Plot_value,
            floor_allowed: this.Floor_Allowed_value,
            plot_type: this.Plot_Type_value,
            no_of_parking: this.Parking_Count_value,
            no_of_washroom: this.Washroom_Counts_value,
            property_description: this.propertyDescription_value,
            Amenities: this.selectedAmenities,
            Facilities: this.FacilitiesList,
          };
          this.Service.postPropertyCommercial(paramsCommercial).subscribe((responce: any) => {
            $('#testclick').click();
            if (responce['status'] === 'True') {
              var PropertyID = responce.Data.property_id_comm;
              this.PropertyID = PropertyID;
              this.photoUploadCommercial()
              // setTimeout(() => {
              //   this.closeKeyGifLastModal()
              // }, 8000);
              // swal(
              //   'Submited!',
              //   'Your Property Added Successfully',
              //   'success'
              // );
            }
          });
        }
      }
    }
  }





  photoUpload() {
    if (this.coverImageUrl && this.coverImageUrl.image_name) {

      const formData = new FormData();
      // formDataCover.append('Propid', this.PropertyID);
      // formData.append('cover', this.coverImageUrl);
      // formDataCover.append('Userid', this.UserId);
      // formData.append('label', this.photoLabels[this.coverImageUrl]);

      formData.append('PropID', this.PropertyID);
      formData.append('Userid', this.UserId);

      formData.append('Images_details', JSON.stringify(this.galleryImagesDataBackend));
      formData.append('Images_details_new', JSON.stringify(this.galleryImagesDataNew));


      for (let i = 0; i < this.galleryImage_Binary.length; i++) {
        const imageBlob = this.galleryImage_Binary[i];
        if (imageBlob !== this.coverImageBlob) {
          formData.append('file[]', imageBlob);
        }
      }

      this.Service.uploadFilePGGallaryUpdate(formData).subscribe(response => {
        if (response['status'] === 'True') {
          setTimeout(() => {
            this.closeKeyGifLastModal()
          }, 8500);
          setTimeout(() => {
            swal(
              'Submited!',
              'Your Property Added Successfully',
              'success'
            );
          }, 8500);

          setTimeout(() => {
            this.router.navigate(['/userauth/sellingprojects/' + this.UserId]);
          }, 8500);
        }
      })

    } else {


      const base64String = this.coverImageUrl;
      const mimeMatch = base64String.match(/^data:(image\/[a-zA-Z]+);base64,/);
      const mimeType = mimeMatch ? mimeMatch[1] : 'image/webp'; // fallback to jpeg
      const extension = mimeType.split('/')[1];
      const base64Data = base64String.split(',')[1];
      const binaryData = atob(base64Data);
      const len = binaryData.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryData.charCodeAt(i);
      }
      const fileNameCover = this.originalFileNames[this.coverImageUrl] || `image_${Date.now()}.${extension}`;
      const blob = new Blob([bytes], { type: mimeType });
      const formData = new FormData();
      // formDataCover.append('Propid', this.PropertyID);
      formData.append('cover', blob, fileNameCover);
      // formDataCover.append('Userid', this.UserId);
      formData.append('label', this.photoLabels[this.coverImageUrl]);
      formData.append('PropID', this.PropertyID);
      formData.append('Userid', this.UserId);
      formData.append('Images_details', JSON.stringify(this.galleryImagesDataBackend));
      formData.append('Images_details_new', JSON.stringify(this.galleryImagesDataNew));

      for (let i = 0; i < this.galleryImage_Binary.length; i++) {
        const imageBlob = this.galleryImage_Binary[i];
        if (imageBlob !== this.coverImageBlob) {
          formData.append('file[]', imageBlob);
        }
      }

      this.Service.uploadFilePGGallaryUpdate(formData).subscribe(response => {
        if (response['status'] === 'True') {
          setTimeout(() => {
            this.closeKeyGifLastModal()
          }, 8500);
          setTimeout(() => {
            swal(
              'Submited!',
              'Your Property Added Successfully',
              'success'
            );
          }, 8500);
          setTimeout(() => {
            this.router.navigate(['/userauth/sellingprojects/' + this.UserId]);

          }, 8500);
        }
      })



      // this.Service.uploadFilePGCoverUpdate(formDataCover).subscribe()
    }




  }


  photoUploadCommercial() {
    if (this.coverImageUrl && this.coverImageUrl.image_name) {

      const formData = new FormData();
      // formDataCover.append('Propid', this.PropertyID);
      // formData.append('cover', this.coverImageUrl);
      // formDataCover.append('Userid', this.UserId);
      // formData.append('label', this.photoLabels[this.coverImageUrl]);

      formData.append('PropID', this.PropertyID);
      formData.append('Userid', this.UserId);
      formData.append('Property_Type', this.Commercial_Property_Type_value);

      formData.append('Images_details', JSON.stringify(this.galleryImagesDataBackend));
      formData.append('Images_details_new', JSON.stringify(this.galleryImagesDataNew));

      for (let i = 0; i < this.galleryImage_Binary.length; i++) {
        const imageBlob = this.galleryImage_Binary[i];
        if (imageBlob !== this.coverImageBlob) {
          formData.append('file[]', imageBlob);
        }
      }

      this.Service.uploadFileCommercialGallaryUpdate(formData).subscribe(response => {
        if (response['status'] === 'True') {
          setTimeout(() => {
            this.closeKeyGifLastModal()
          }, 8500);
          setTimeout(() => {
            swal(
              'Submited!',
              'Your Property Added Successfully',
              'success'
            );
          }, 8500);
          setTimeout(() => {
            this.router.navigate(['/userauth/sellingprojects/' + this.UserId]);

          }, 8500);
        }
      })

    } else {


      const base64String = this.coverImageUrl;
      const mimeMatch = base64String.match(/^data:(image\/[a-zA-Z]+);base64,/);
      const mimeType = mimeMatch ? mimeMatch[1] : 'image/webp'; // fallback to jpeg
      const extension = mimeType.split('/')[1];
      const base64Data = base64String.split(',')[1];
      const binaryData = atob(base64Data);
      const len = binaryData.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryData.charCodeAt(i);
      }
      const fileNameCover = this.originalFileNames[this.coverImageUrl] || `image_${Date.now()}.${extension}`;
      const blob = new Blob([bytes], { type: mimeType });
      const formData = new FormData();
      // formDataCover.append('Propid', this.PropertyID);
      formData.append('cover', blob, fileNameCover);
      // formDataCover.append('Userid', this.UserId);
      formData.append('label', this.photoLabels[this.coverImageUrl]);
      formData.append('PropID', this.PropertyID);
      formData.append('Userid', this.UserId);
      formData.append('Property_Type', this.Commercial_Property_Type_value);

      formData.append('Images_details', JSON.stringify(this.galleryImagesDataBackend));
      formData.append('Images_details_new', JSON.stringify(this.galleryImagesDataNew));

      for (let i = 0; i < this.galleryImage_Binary.length; i++) {
        const imageBlob = this.galleryImage_Binary[i];
        if (imageBlob !== this.coverImageBlob) {
          formData.append('file[]', imageBlob);
        }
      }

      this.Service.uploadFileCommercialGallaryUpdate(formData).subscribe(response => {
        if (response['status'] === 'True') {
          setTimeout(() => {
            this.closeKeyGifLastModal()
          }, 8500);
          setTimeout(() => {
            swal(
              'Submited!',
              'Your Property Added Successfully',
              'success'
            );
          }, 8500);
          setTimeout(() => {
            this.router.navigate(['/userauth/sellingprojects/' + this.UserId]);

          }, 8500);
        }
      })



      // this.Service.uploadFilePGCoverUpdate(formDataCover).subscribe()
    }




  }



  pgServiceLabels: string[] = [];
  updatePgServiceLabels(): void {
    this.pgServiceLabels = this.pgServices_value?.map((key: string) => {
      const service = this.pgServiceList.find(item => item.key === key);
      return service ? service.label : key;
    }) || [];
  }
  selectedPgAmenityLabels: string[] = [];
  selectedCommercialAmenityLabels: string[] = [];
  updateSelectedPgAmenityLabels() {
    this.selectedPgAmenityLabels = this.selectedAmenities.map(key => {
      const item = this.pgAmenitiesList?.find(x => x.key === key);
      return item?.label || key;
    });
  }
  updateSelectedCommercialAmenityLabels() {
    this.selectedCommercialAmenityLabels = this.selectedAmenities.map(key => {
      const item = this.commercialAmenitiesList?.find(x => x.key === key);
      return item?.label || key;
    });
  }
  getPgRuleLabels() {
    return this.pgRulesList
      .filter(rule => this.pgRulesList.includes(rule.key))
      .map(rule => rule.label);
  }
  // getAgeOfPropertyRentLabel(): string {
  //   const selected = this.propertyAgeList.find(item => item.key === this.Age_Of_Property_Rent_value);
  //   return selected ? selected.label : '';
  // }
  getOtherSharingLabel(value: string): string {
    const selected = this.roomOtherTypes.find(item => item.value === value);
    return selected ? selected.label : value;
  }
  getRoomLabelByValue(value: string): string {
    const room = [...this.roomTypes, ...this.roomOtherTypes].find(item => item.value === value);
    return room ? room.label : value;
  }
  getMealLabelByKey(key: string): string {
    const meal = this.pgFoodList.find(m => m.key === key);
    return meal ? meal.label : '';
  }
  getParkingTypeLabel(): string {
    const selected = this.Parking?.find(
      item => item.key === this.Parking_Type_value
    );
    return selected ? selected.label : '';
  }
  pgRuleLabels: string[] = [];
  updatePgRuleLabels() {
    this.pgRuleLabels = this.PG_Rules_value.map(key => {
      const rule = this.pgRulesList.find(item => item.key == key);
      return rule ? rule.label : key;
    });
  }
  // officeFacilityLabels: string[] = [];
  // shopFacilityLabels: string[] = [];
  // plotFacilityLabels: string[] = [];
  // warehouseFacilityLabels: string[] = [];
  // updateFacilityLabelsCommercial() {
  //   this.officeFacilityLabels = this.Office_Space_Facilities_value?.map(value => {
  //     const found = this.officeFacilitiesList.find(item => item.value === value);
  //     return found ? found.label : value;
  //   }) || [];
  //   this.shopFacilityLabels = this.Shop_Facilities_value?.map(value => {
  //     const found = this.shopFacilitiesList.find(item => item.value === value);
  //     return found ? found.label : value;
  //   }) || [];
  //   this.plotFacilityLabels = this.Plot_Facilities_value?.map(value => {
  //     const found = this.plotFacilitiesList.find(item => item.value === value);
  //     return found ? found.label : value;
  //   }) || [];
  //   this.warehouseFacilityLabels = this.Warehouse_Facilities_value?.map(value => {
  //     const found = this.warehouseFacilitiesList.find(item => item.value === value);
  //     return found ? found.label : value;
  //   }) || [];
  // }
  propertyTypeList = [
    { "key": "Residential", "label": "Residential" },
    { "key": "Commercial", "label": "Commercial" }
  ]
  onPropertyTypeSelected(typeKey, typeValue) {
    this.Property_Type_value = typeKey;
    this.PropertyTypeLabel = typeValue
    if (typeKey === 'Residential') {
      this.Property_Available_value = ''
      this.Residential();
    } else if (typeKey === 'Commercial') {
      this.Property_Available_value = ''
      this.Commercial();
    }
  }
  getPropertyTypeLabel(): string {
    const selected = this.propertyTypeList.find(item => item.key === this.Property_Type_value);
    return selected ? selected.label : '';
  }
  propertyAvailableList = [
    { "key": 1, "label": "Sale" },
    { "key": 2, "label": "Rent/Lease" },
    { "key": 3, "label": "PG/Hostels", "onlyFor": "Residential_Pg" }
  ]
  getPropertyAvailableLabel() {
    // const selected = this.propertyAvailableList.find(item => item.key === this.Property_Available_value);
    // return selected ? selected.label : '';
  }
  onPropertyAvailableSelected(optionKey: number, Value) {
    this.Property_Available_value = optionKey;
    this.PropertyAvailableLabel = Value;
    if (this.Property_Type_value === 'Residential') {
      if (optionKey === 1) {
        this.router.navigate(['/postproperty'], { queryParams: { Type: 'Sale' } });
      } else if (optionKey === 2) {
        this.router.navigate(['/postproperty'], { queryParams: { Type: 'Rent' } });
      } else if (optionKey === 3) {
        // this.emptyCommercial();
        this.forPG();
      }
    } else {
      if (optionKey === 1) {
        // this.emptyCommercial();
        this.forSale();
      } else if (optionKey === 2) {
        // this.emptyCommercial();
        this.forRent();
      }
    }
  }
  get filteredPropertyAvailableList() {
    return this.propertyAvailableList.filter(opt =>
      opt.onlyFor ? opt.onlyFor === this.Property_Type : true
    );
  }
  commercialOthers: any
  onCommercialTypeSelected(action: string, value, label) {
    if (value == 6) {
      this.commercialOthers = 'others'
    } else {
      this.commercialOthers = ''
    }
    this.Commercial_Property_Type_value = value;
    this.CommercialPropertyTypeLabel = label;
    if (action === 'officeSpace') {
      this.officeSpace();
    } else if (action === 'shopShowroom') {
      this.shopShowroom();
    } else if (action === 'Plot') {
      this.Plot();
    } else if (action === 'warehouse') {
      this.warehouse();
    }
  }
  dimensionType() {
    if (this.Commercial_Type === 'officeSpace') {
      this.Super_Buitl_Up_Area_type_value = ''
      this.Super_Buitl_Up_Area_type_value = ''
      this.Plot_Dimension_type_value = ''
      this.Plot_Breadth_type_value = ''
      this.Plot_Length_type_value = ''
    } else if (this.Commercial_Type === 'shopShowroom') {
      this.Buitl_Up_Area_type_value = '';
      this.Plot_Dimension_type_value = ''
      this.Plot_Breadth_type_value = ''
      this.Plot_Length_type_value = ''
    } else if (this.Commercial_Type === 'Plot') {
      this.Buitl_Up_Area_type_value = ''
      this.carpet_area_type_value = '';
      this.Super_Buitl_Up_Area_type_value = ''
    } else if (this.Commercial_Type === 'warehouse') {
      this.Buitl_Up_Area_type_value = ''
      this.Plot_Dimension_type_value = ''
      this.Plot_Breadth_type_value = ''
      this.Plot_Length_type_value = ''
    }
  }
  // getCommercialPropertyTypeLabel(): string {
  //   const selected = this.commercialPropertyTypeList.find(
  //     item => String(item.key) === String(this.Commercial_Property_Type_value)
  //   );
  //   return selected ? selected.label : '';
  // }
  getPgListingAsLabel(label): any {
    this.PgListingAsLabel = label
    // const selected = this.pgListingAsList.find(item => item.key === this.Listing_As_value);
    // return selected ? selected.label : '';
  }
  getCommercialListingAsLabel(label, key): any {
    this.Commercial_Listing_As_value = key
    this.CommercialListingAsLabel = label
    // const selected = this.commercialListingAsList.find(item => item.key === this.Commercial_Listing_As_value);
    // return selected ? selected.label : '';
  }
  getPgStartedYearLabel(label): any {
    this.PgStartedYearLabel = label
    // const selected = this.pgStartedYearList.find(item => item.key === this.SecondForm.PG_Started_Year.value);
    // return selected ? selected.label : '';
  }
  getSuitedForLabel(label): any {
    this.SuitedForLabel = label
    // const selected = this.suitedForList.find(item => item.key === this.ThirdForm.Suited_For.value);
    // return selected ? selected.label : '';
  }
  // getSuitedForLabelOffice(label): any {
  //   this.SuitedForLabelOffice = label
  //   // const selected = this.suitedForList.find(item => item.key === this.ThirdForm.Suited_For.value);
  //   // return selected ? selected.label : '';
  // }
  // getSuitedForLabelOffice(): any {
  //   // const selected = this.officeSuitedFor.find(item => item.key === this.ThirdForm.Suited_For.value);
  //   // return selected ? selected.label : '';
  // }
  getPlotTypeLabel(label): any {
    this.PlotTypeLabel = label
    // const selected = this.plotTypeList.find(item => item.key === this.ThirdForm.Plot_Type.value);
    // return selected ? selected.label : '';
  }
  getBuildingTypeLabel(label): any {
    this.BuildingTypeLabel = label
    // const selected = this.buildingTypeList.find(item => item.key === this.ThirdForm.Building_Type.value);
    // return selected ? selected.label : '';
  }
  // PropertyStatuslabel: any {
  //   const selected = this.propertyStatusList.find(item => item.key === this.ThirdForm.Property_Status.value);
  //   return selected ? selected.label : '';
  // }
  // getFurnishTypeLabel(label): any {
  // const selected = this.furnishTypeList.find(item => item.key === this.ThirdForm.Furnished_Type.value);
  // return selected ? selected.label : '';
  // }
  getPropertyAgeLabel(): any {
    // const selected = this.propertyAgeList.find(item => item.key === this.ThirdForm.Age_Of_Property.value);
    // return selected ? selected.label : '';
  }
  // PropertyFacingLabel: any {
  //   const selected = this.propertyFacingList.find(item => item.key === this.ThirdForm.Property_Facing.value);
  //   return selected ? selected.label : '';
  // }
  // getPgAvailableForLabel(label): any {
  //   const selected = this.pgAvailableForList.find(item => item.key === this.FourthForm.PG_Avaliable_for.value);
  //   return selected ? selected.label : '';
  // }
  getPgNoticePeriodLabel(label): any {
    this.NoticePeriodlabel = label
    // const selected = this.pgNoticePeriodList.find(item => item.key === this.FourthForm.Notice_Period.value);
    // return selected ? selected.label : '';
  }
  // getPgBestSuitForLabel(label): any {
  //   const selected = this.pgBestSuitForList.find(item => item.key === this.FourthForm.Best_Suit_For.value);
  //   return selected ? selected.label : '';
  // }
  getPgTenantsReturnByLabel(label): any {
    this.TenantsMustReturnByLabel = label
    // const selected = this.pgTenantsReturnByList.find(item => item.key === this.FourthForm.Tenants_Must_Return_By.value);
    // return selected ? selected.label : '';
  }
  getLockInPeriodLabel(label): any {
    this.LockInPeriodLabel = label
    // const selected = this.lockInPeriodList.find(item => item.key === this.FifthForm.Lock_In_Period.value);
    // return selected ? selected.label : '';
  }
  // getPgFoodChargesLabel(): any {
  //   const selected = this.pgFoodChargesList.find(option => option.key === this.PG_Food_Charges_value);
  //   return selected ? selected.label : '';
  // }
  // getPgMealTypeLabel(label): any {
  //   const selected = this.pgMealTypeList.find(item => item.key === this.FifthForm.Meal_Type.value);
  //   return selected ? selected.label : '';
  // }
  pgFoodProvidedOptions = [
    { key: '1', label: 'Yes' },
    { key: '2', label: 'No' }
  ];
  pgParkingOptions = [
    { key: '1', label: 'Yes' },
    { key: '2', label: 'No' }
  ];
  onlyLeaseOptionsList = [
    { key: '1', label: 'Yes' },
    { key: '2', label: 'No' }
  ];
  roomSummaryLabels: { roomType: string, label: string }[] = [];
  private roomTypeMap: { [key: string]: string } = {
    '1': 'Private Room',
    '2': 'Two Sharing',
    '3': 'Three Sharing',
    '4': 'Four Sharing',
    '5': 'Five Sharing',
    '6': 'Six Sharing',
    '7': 'Seven Sharing',
    '8': 'Eight Sharing',
    '9': 'Nine Sharing',
    '10': 'Ten Sharing'
  };
  // Call this whenever `roomSummaryData` changes
  updateRoomSummaryLabels() {
    this.roomSummaryLabels = this.roomSummaryData.map(data => ({
      roomType: data.roomType,
      label: this.roomTypeMap[data.roomType] || data.roomType
    }));
  }
  facilityMap: { [key: string]: string } = {
    '7': 'Water Supply',
    '8': 'Conference Hall',
    '9': 'Electricity Connection',
    '10': 'Sewage Connection',
    '11': 'Gated Security',
    '12': 'Storage Area',
    '13': 'Pantry',
    '14': 'Reception',
    '15': 'Pantry/Cafeteria',
    '16': 'Auditorium',
    '17': 'Shared Washroom',
    '18': 'Private Washroom',
    '19': 'Server Room',
    '20': 'Conference Hall',
    '21': 'Water Supply',
    '22': 'Electricity Connection',
    '23': 'Sewage Connection',
    '24': 'Gated Security',
    '25': 'Street lights',
    '30': 'Water Supply',
    '31': 'Electricity Connection',
    '32': 'Sewage Connection',
    '33': 'Gated Security'
  };
  plotFacilityLabels: { value: string, label: string }[] = [];
  shopFacilityLabels: { value: string, label: string }[] = [];
  warehouseFacilityLabels: { value: string, label: string }[] = [];
  officeFacilityLabels: { value: string, label: string }[] = [];
  // Call this after form/values update
  updateFacilityLabels() {
    if (this.Commercial_Type == 'Plot') {
      this.plotFacilityLabels = this.Plot_Facilities_value.map(f => ({ value: f, label: this.facilityMap[f] || f }));
    }
    if (this.Commercial_Type == 'shopShowroom') {
      this.shopFacilityLabels = this.Shop_Facilities_value.map(f => ({ value: f, label: this.facilityMap[f] || f }));
    }
    if (this.Commercial_Type == 'warehouse') {
      this.warehouseFacilityLabels = this.Warehouse_Facilities_value.map(f => ({ value: f, label: this.facilityMap[f] || f }));
    }
    if (this.Commercial_Type == 'officeSpace') {
      this.officeFacilityLabels = this.Office_Space_Facilities_value.map(f => ({ value: f, label: this.facilityMap[f] || f }));
    }
  }
  emptyResidentialPg() {
    [this.SecondFormGroup, this.FourthFormGroup, this.FifthFormGroup].forEach(formGroup => {
      Object.keys(formGroup.controls).forEach(control => {
        formGroup.get(control)?.clearValidators();
        formGroup.get(control)?.markAsPristine();
        formGroup.get(control)?.markAsUntouched();
      });
    });
    this.PG_Name_value = '';
    this.PG_Address_value = '';
    this.PG_PinCode_value = '';
    this.Listing_As_value = '';
    this.Landmarks_value = '';
    this.PG_Started_Year_value = '';
    this.PG_Avaliable_for = '';
    this.Food_Provided_value = '';
    this.Notice_Period_value = '';
    this.Best_Suit_For_value = '';
    this.Parking_Avaliable_value = '';
    this.Tenants_Must_Return_By_value = '';
    this.PG_Rules_value = [];
    this.First_Name_value = '';
    this.Last_Name_value = '';
    this.Email_Address_value = '';
    this.Phone_Number_value = '';
    this.PG_Food_value = [];
    this.PG_Food_Charges_value = '';
    this.Meal_Type_value = '';
    this.Parking_Type_value = '';
    this.pgServices_value = [];
    this.galleryImagesData = [];
    this.coverImageUrl = '';
    this.submittedData = [];
    this.resetFormArray('selectedAmenities', this.FifthFormGroup);
    this.resetFormArray('pgServices', this.FifthFormGroup);
    const descControl = this.SeventhFormGroup.get('propertyDescription');
    if (descControl) {
      descControl.reset(''); // clears value
      descControl.setValidators([Validators.required, Validators.pattern(/^(?!\s*$).+/)]); // make mandatory again
      descControl.updateValueAndValidity(); // re-apply validation
    }
    localStorage.setItem('coverImageUrl', '');
    this.First_Name_value = ''
    this.Last_Name_value = ''
    this.Email_Address_value = ''
    this.Phone_Number_value = ''
    this.previewUrls = [];
    this.photoForm.get('coverImage')?.reset();
    this.photoLabels = {}
    this.selectedAmenities = []
    this.propertyDescription_value = ''
    this.PropertyAvailableLabel = ''
    this.CommercialListingAsLabel = ''
    this.PgListingAsLabel = ''
    // this.PgStartedYearLabel = ''
    this.CommercialPropertyTypeLabel = ''
    this.SuitedForLabel = ''
    this.SuitedForLabelOffice = ''
    this.BuildingTypeLabel = ''
    this.PropertyStatuslabel = ''
    this.FurnishedTypeLabel = ''
    this.AgeOfPropertyRentLabel = ''
    this.ParkingTypeLabel = ''
    this.LockInPeriodLabel = ''
    this.AgeOfPropertyLabel = ''
    this.PlotTypeLabel = ''
    this.PropertyFacingLabel = ''
    this.PGAvaliableForLabel = ''
    this.NoticePeriodlabel = ''
    this.BestSuitForLabel = ''
    this.PGFoodChargeslabel = ''
    this.MealTypeLabel = ''
    this.TenantsMustReturnByLabel = '';
  }
  emptyCommercial(): void {
    this.SecondFormGroup.reset();
    this.ThirdFormGroup.reset();
    this.FourthFormGroup.reset();
    this.FifthFormGroup.reset();
    [this.SecondFormGroup, this.ThirdFormGroup, this.FourthFormGroup, this.FifthFormGroup].forEach(formGroup => {
      Object.keys(formGroup.controls).forEach(control => {
        formGroup.get(control)?.reset();
        formGroup.get(control)?.clearValidators();
        formGroup.get(control)?.markAsPristine();
        formGroup.get(control)?.markAsUntouched();
        this.ThirdFormGroup.get('carpet_area_type')?.setValue('sqfeet');
        this.ThirdFormGroup.get('Buitl_Up_Area_type')?.setValue('sqfeet');
        this.ThirdFormGroup.get('Super_Buitl_Up_Area_type')?.setValue('sqfeet');
        this.ThirdFormGroup.get('Plot_Dimension_type')?.setValue('sqfeet');
        this.ThirdFormGroup.get('Plot_Breadth_type')?.setValue('Meters(m)');
        this.ThirdFormGroup.get('Plot_Length_type')?.setValue('Meters(m)');
      });
    });
    this.photoForm.get('coverImage')?.reset();
    this.photoLabels = {}
    this.coverImageUrl = ''
    this.previewUrls = [];
    this.submittedData = [];
    this.Commercial_Property_Type_value = '';
    this.Commercial_Property_Name_value = '';
    this.address = '';
    this.Commercial_Listing_As_value = '';
    this.Commercial_Postal_Code_value = '';
    this.Landmarks_value = '';
    this.Suited_For_value = '';
    this.Building_Type_value = '';
    this.Carpet_Area_value = '';
    this.carpet_area_type_value = 'sqfeet';
    this.Property_Status_value = '';
    this.Furnished_Type_value = '';
    this.Property_Customizable_value = '';
    this.Buitl_Up_Area_value = '';
    this.Super_Buitl_Up_Area_value = '';
    this.Age_Of_Property_Rent_value = '';
    this.Avaliable_Date_Rent_value = '';
    this.propertyStatus = ''
    this.Possession_Date_value = '';
    this.Age_Of_Property_value = '';
    this.Plot_Type_value = '';
    this.Plot_Length_value = '';
    this.Boundary_Wall_value = '';
    this.Plot_Dimension_value = '';
    this.Plot_Breadth_value = '';
    this.Property_Facing_value = '';
    this.Total_Floors_value = '';
    this.Open_Sides_value = '';
    this.Any_Construction_Done_value = '';
    this.Covered_Parking_value = '';
    this.Washroom_Counts_value = '';
    this.Max_No_Of_Seats_value = '';
    this.Private_Washroom_value = '';
    this.Floor_NO_value = '';
    this.Floor_Allowed_value = '';
    this.Corner_Plot_value = '';
    this.CommercialListingAsLabel = ''
    this.PgListingAsLabel = ''
    // this.PgStartedYearLabel = ''
    this.CommercialPropertyTypeLabel = ''
    this.SuitedForLabel = ''
    this.SuitedForLabelOffice = ''
    this.BuildingTypeLabel = ''
    this.PropertyStatuslabel = ''
    this.FurnishedTypeLabel = ''
    this.AgeOfPropertyRentLabel = ''
    this.ParkingTypeLabel = ''
    this.LockInPeriodLabel = ''
    this.AgeOfPropertyLabel = ''
    this.PlotTypeLabel = ''
    this.PropertyFacingLabel = ''
    this.PGAvaliableForLabel = ''
    this.NoticePeriodlabel = ''
    this.BestSuitForLabel = ''
    this.PGFoodChargeslabel = ''
    this.MealTypeLabel = ''
    this.TenantsMustReturnByLabel = '';
    if (this.Corner_Plot_value) {
      this.Corner_Plot_value.reset(''); // clears value
      this.Corner_Plot_value.setValidators([Validators.required]); // make mandatory again
      this.Corner_Plot_value.updateValueAndValidity();
    }
    this.Open_Parking_Count_value = '';
    this.Parking_Count_value = '';
    this.Is_Corner_Shop_value = '';
    if (this.Is_Corner_Shop_value) {
      this.Is_Corner_Shop_value.reset(''); // clears value
      this.Is_Corner_Shop_value.setValidators([Validators.required]); // make mandatory again
      this.Is_Corner_Shop_value.updateValueAndValidity();
    }
    this.Total_Cabin_Count_value = '';
    this.Shop_Facilities_value = [];
    this.Warehouse_Facilities_value = [];
    this.Office_Space_Facilities_value = [];
    this.Plot_Facilities_value = [];
    this.FourthFormGroup.get('Corner_Plot')?.setValue('');
    this.FourthFormGroup.get('Is_Corner_Shop')?.setValue('');
    this.resetFormArray('Office_Space_Facilities', this.FourthFormGroup);
    this.resetFormArray('Shop_Facilities', this.FourthFormGroup);
    this.resetFormArray('PG_Rules', this.FourthFormGroup);
    this.resetFormArray('Warehouse_Facilities', this.FourthFormGroup);
    this.resetFormArray('Plot_Facilities', this.FourthFormGroup);
    this.resetFormArray('selectedAmenities', this.FifthFormGroup);
    const descControl = this.SeventhFormGroup.get('propertyDescription');
    if (descControl) {
      descControl.reset(''); // clears value
      descControl.setValidators([Validators.required, Validators.pattern(/^(?!\s*$).+/)]); // make mandatory again
      descControl.updateValueAndValidity(); // re-apply validation
    }
    this.Total_Amount_value = '';
    this.Security_Deposit_value = '';
    this.total_lease_amount_value = '';
    this.Negotiable_value = '';
    this.Available_From_value = '';
    this.Lock_In_Period_value = '';
    this.MaintenanceCharges_Value = '';
    this.IncludedInRent_Value = '';
    this.Booking_Token_Amount_value = '';
    this.RERA_Number_value = '';
    this.Rent_Per_Month_value = '';
    this.Rent_Per_Month_ForLease_value = '';
    this.Rent_Per_Month_Shop_Lease_value = '';
    this.Rent_Per_Month_Shop_value = '';
    this.Only_Lease_value = '';
    this.Only_Lease_Shop_value = '';
    this.Maintenance_Amount_Plot_value = '';
    this.Only_Lease_Office_Sale_value = '';
    this.propertyDescription_value = '';
    this.galleryImagesData = [];
    this.coverImageUrl = '';
    this.submittedData = [];
    localStorage.setItem('coverImageUrl', '');
    this.First_Name_value = ''
    this.Last_Name_value = ''
    this.Email_Address_value = ''
    this.Phone_Number_value = ''
    this.selectedAmenities = []
    this.propertyDescription_value = ''
    const facilities = this.FourthFormGroup.get('Office_Space_Facilities') as FormArray;
    if (facilities) {
      while (facilities.length !== 0) {
        facilities.removeAt(0);
      }
      facilities.setValidators([Validators.required]);
      facilities.updateValueAndValidity();
    }
  }
  emptyCommercialTypes() {
    [this.ThirdFormGroup, this.FourthFormGroup, this.FifthFormGroup].forEach(formGroup => {
      Object.keys(formGroup.controls).forEach(control => {
        formGroup.get(control)?.reset();
        formGroup.get(control)?.clearValidators();
        formGroup.get(control)?.markAsPristine();
        formGroup.get(control)?.markAsUntouched();
        this.ThirdFormGroup.get('carpet_area_type')?.setValue('sqfeet');
        this.ThirdFormGroup.get('Buitl_Up_Area_type')?.setValue('sqfeet');
        this.ThirdFormGroup.get('Super_Buitl_Up_Area_type')?.setValue('sqfeet');
        this.ThirdFormGroup.get('Plot_Dimension_type')?.setValue('sqfeet');
        this.ThirdFormGroup.get('Plot_Breadth_type')?.setValue('Meters(m)');
        this.ThirdFormGroup.get('Plot_Length_type')?.setValue('Meters(m)');
      });
    });
    this.photoForm.get('coverImage')?.reset();
    this.coverImageUrl = ''
    this.previewUrls = [];
    this.Suited_For_value = '';
    this.Building_Type_value = '';
    this.Carpet_Area_value = '';
    this.carpet_area_type_value = 'sqfeet';
    this.photoLabels = {}
    this.selectedAmenities = []
    this.Property_Status_value = '';
    this.Furnished_Type_value = '';
    this.Property_Customizable_value = '';
    this.Buitl_Up_Area_value = '';
    this.Super_Buitl_Up_Area_value = '';
    this.Age_Of_Property_Rent_value = '';
    this.Avaliable_Date_Rent_value = '';
    this.propertyStatus = ''
    this.Possession_Date_value = '';
    this.Age_Of_Property_value = '';
    this.submittedData = [];
    this.Plot_Type_value = '';
    this.Plot_Length_value = '';
    this.Boundary_Wall_value = '';
    this.Plot_Dimension_value = '';
    this.Plot_Breadth_value = '';
    this.Property_Facing_value = '';
    this.Total_Floors_value = '';
    this.Open_Sides_value = '';
    this.Any_Construction_Done_value = '';
    this.Covered_Parking_value = '';
    this.Washroom_Counts_value = '';
    this.Max_No_Of_Seats_value = '';
    this.Private_Washroom_value = '';
    this.Floor_NO_value = '';
    this.Floor_Allowed_value = '';
    this.Corner_Plot_value = '';
    this.CommercialListingAsLabel = ''
    this.PgListingAsLabel = ''
    // this.PgStartedYearLabel = ''
    this.SuitedForLabel = ''
    this.SuitedForLabelOffice = ''
    this.BuildingTypeLabel = ''
    this.PropertyStatuslabel = ''
    this.FurnishedTypeLabel = ''
    this.AgeOfPropertyRentLabel = ''
    this.ParkingTypeLabel = ''
    this.LockInPeriodLabel = ''
    this.AgeOfPropertyLabel = ''
    this.PlotTypeLabel = ''
    this.PropertyFacingLabel = ''
    this.PGAvaliableForLabel = ''
    this.NoticePeriodlabel = ''
    this.BestSuitForLabel = ''
    this.PGFoodChargeslabel = ''
    this.MealTypeLabel = ''
    this.TenantsMustReturnByLabel = '';
    if (this.Corner_Plot_value) {
      this.Corner_Plot_value.reset(''); // clears value
      this.Corner_Plot_value.setValidators([Validators.required]); // make mandatory again
      this.Corner_Plot_value.updateValueAndValidity();
    }
    this.Open_Parking_Count_value = '';
    this.Parking_Count_value = '';
    this.Is_Corner_Shop_value = '';
    if (this.Is_Corner_Shop_value) {
      this.Is_Corner_Shop_value.reset(''); // clears value
      this.Is_Corner_Shop_value.setValidators([Validators.required]); // make mandatory again
      this.Is_Corner_Shop_value.updateValueAndValidity();
    }
    this.Total_Cabin_Count_value = '';
    this.Shop_Facilities_value = [];
    this.Warehouse_Facilities_value = [];
    this.Office_Space_Facilities_value = [];
    this.Plot_Facilities_value = [];
    this.resetFormArray('Office_Space_Facilities', this.FourthFormGroup);
    this.resetFormArray('Shop_Facilities', this.FourthFormGroup);
    this.resetFormArray('PG_Rules', this.FourthFormGroup);
    this.resetFormArray('selectedAmenities', this.FifthFormGroup);
    this.resetFormArray('Warehouse_Facilities', this.FourthFormGroup);
    this.resetFormArray('Plot_Facilities', this.FourthFormGroup);
    const descControl = this.SeventhFormGroup.get('propertyDescription');
    if (descControl) {
      descControl.reset(''); // clears value
      descControl.setValidators([Validators.required, Validators.pattern(/^(?!\s*$).+/)]); // make mandatory again
      descControl.updateValueAndValidity(); // re-apply validation
    }
    this.FourthFormGroup.get('Corner_Plot')?.setValue('');
    this.FourthFormGroup.get('Is_Corner_Shop')?.setValue('');
    this.Total_Amount_value = '';
    this.Security_Deposit_value = '';
    this.total_lease_amount_value = '';
    this.Negotiable_value = '';
    this.Available_From_value = '';
    this.Lock_In_Period_value = '';
    this.MaintenanceCharges_Value = '';
    this.IncludedInRent_Value = '';
    this.Booking_Token_Amount_value = '';
    this.RERA_Number_value = '';
    this.Rent_Per_Month_value = '';
    this.Rent_Per_Month_ForLease_value = '';
    this.Rent_Per_Month_Shop_Lease_value = '';
    this.Rent_Per_Month_Shop_value = '';
    this.Only_Lease_value = '';
    this.Only_Lease_Shop_value = '';
    this.Maintenance_Amount_Plot_value = '';
    this.Only_Lease_Office_Sale_value = '';
    this.propertyDescription_value = '';
    this.galleryImagesData = [];
    this.coverImageUrl = '';
    localStorage.setItem('coverImageUrl', '');
    this.First_Name_value = ''
    this.Last_Name_value = ''
    this.Email_Address_value = ''
    this.Phone_Number_value = ''
    this.propertyDescription_value = ''
  }
  private resetFormArray(controlName: string, formGroup: FormGroup) {
    const facility = formGroup.get(controlName) as FormArray;
    if (facility) {
      while (facility.length !== 0) {
        facility.removeAt(0);
      }
      facility.setValidators([Validators.required]);
      facility.updateValueAndValidity();
    }
  }
  formatWithCommas(value: any): string {
    if (!value) return '';
    const num = value.toString().replace(/,/g, '');
    return Number(num).toLocaleString('en-IN');
  }
  onFormattedNumberInput(event: any, controlName: string) {
    const rawValue = event.target.value.replace(/,/g, '').replace(/\D/g, '');
    const numericValue = rawValue ? parseInt(rawValue, 10) : null;
    this.form.get(controlName)?.setValue(numericValue, { emitEvent: false });
    event.target.value = this.formatWithCommas(numericValue);
  }
  validateInput11(control) {
    const regExp = /^(?=\s*\S)(?=.*[a-zA-Z])[a-zA-Z0-9\s]{3,}$/;
    if (regExp.test(control.value)) {
      return null; // Validation passes
    } else {
      return { invalidInputLoc: true }; // Validation fails
    }
  }
  uniqueSubmittedFacilities: any[] = [];
  private updateUniqueSubmittedFacilities() {
    const allFacilities = new Set<string>();
    this.orderedByRoomType.forEach(data => {
      this.pgFacilitiesList.forEach(facility => {
        if (data.facilities[facility.key]) {
          allFacilities.add(facility.key);
        }
      });
    });
    this.uniqueSubmittedFacilities = this.pgFacilitiesList.filter(facility =>
      allFacilities.has(facility.key)
    );
  }
  fileopening() {
    $('#customFile').click();
  }
  closeKeyGifLastModal() {
    const backdrop = document.getElementById('customModalBackdrop');
    if (backdrop) backdrop.style.display = 'none';
    $('#sam').click();
    document.getElementById('customModalBackdrop').style.display = 'none';
  }
  showModalKey() {
    const backdrop = document.getElementById('customModalBackdrop');
    if (backdrop) backdrop.style.display = 'block';
    ($('#thippesh') as any).modal('show');
    $('body').addClass('modal-open');
  }
  scrollToBottom() {
    const div = this.scrollableDiv.nativeElement;
    div.scrollTo({
      top: div.scrollHeight,
      behavior: 'smooth'
    });
  }
  PgAvaliableFor(value, label) {
    this.PGAvaliableForLabel = label
    this.PG_Avaliable_for = value;
  }
  BestSuitFor(value, label) {
    this.BestSuitForLabel = label
    this.Best_Suit_For_value = value;
  }
  PGFoodCharges(value, label) {
    this.PGFoodChargeslabel = label
    this.PG_Food_Charges_value = value;
  }
  MealType(value, label) {
    this.MealTypeLabel = label
    this.Meal_Type_value = value;
  }
  ParkingType(value, label) {
    this.ParkingTypeLabel = label
    this.Parking_Type_value = value;
  }
  PropertyCustomizable(value) {
    this.Property_Customizable_value = value;
  }
  AgeOfPropertyRent(value, label) {
    this.AgeOfPropertyRentLabel = label
    this.Age_Of_Property_Rent_value = value;
  }
  AgeOfProperty(value, label) {
    this.AgeOfPropertyLabel = label
    this.Age_Of_Property_value = value;
  }
  FurnishedType(value, label) {
    this.FurnishedTypeLabel = label
    this.Furnished_Type_value = value;
  }
  Negotiable(value) {
    this.Negotiable_value = value;
  }
  IsCornerShop(value) {
    this.Is_Corner_Shop_value = value;
    this.FourthFormGroup.value.Is_Corner_Shop = value; // update ngModel variable
    this.FourthFormGroup.patchValue({ Is_Corner_Shop: value }); // update form control
  }
  BoundaryWall(value) {
    this.Boundary_Wall_value = value;
  }
  PropertyFacing(value, label) {
    this.PropertyFacingLabel = label
    this.Property_Facing_value = value;
  }
  AnyConstructionDone(value) {
    this.Any_Construction_Done_value = value;
  }
  CornerPlot(value) {
    this.Corner_Plot_value = value;
  }
  PropertyTypeLabel: any
  PropertyAvailableLabel: any
  CommercialListingAsLabel: any
  PgListingAsLabel: any
  PgStartedYearLabel: any
  CommercialPropertyTypeLabel: any
  SuitedForLabel: any
  SuitedForLabelOffice: any
  BuildingTypeLabel: any
  PropertyStatuslabel: any
  FurnishedTypeLabel: any
  AgeOfPropertyRentLabel: any
  ParkingTypeLabel: any
  LockInPeriodLabel: any
  AgeOfPropertyLabel: any
  PlotTypeLabel: any
  PropertyFacingLabel: any
  PGAvaliableForLabel: any
  NoticePeriodlabel: any
  BestSuitForLabel: any
  PGFoodChargeslabel: any
  MealTypeLabel: any
  TenantsMustReturnByLabel: any;
  // edit
  /** Maps for labels */
  private facilityLabelById = new Map<string, string>();
  private roomLabelByValue = new Map<string, string>();
  private buildLabelMaps(): void {
    if (Array.isArray(this.pgFacilitiesList)) {
      this.pgFacilitiesList.forEach(f =>
        this.facilityLabelById.set(String(f.key).trim(), String(f.label).trim())
      );
    }
    if (Array.isArray(this.roomTypes)) {
      this.roomTypes.forEach(r =>
        this.roomLabelByValue.set(String(r.value).trim(), String(r.label).trim())
      );
    }
    if (Array.isArray(this.roomOtherTypes)) {
      this.roomOtherTypes.forEach(r =>
        this.roomLabelByValue.set(String(r.value).trim(), String(r.label).trim())
      );
    }
  }
  private getRoomLabelByValueSafe(val: string): string {
    return this.roomLabelByValue.get(String(val).trim()) || '';
  }
  private getFacilityLabels(ids: string[] | undefined): string[] {
    if (!Array.isArray(ids)) return [];
    return ids
      .map(id => this.facilityLabelById.get(String(id).trim()))
      .filter((x): x is string => !!x);
  }
  Propdetails: any
  PGRulesvalue: any[]
  PGServicevalue: any[]
  PGAmenitiesvalue: any[]
  CommercialAmenitiesvalue: any[]
  PGFoodvalue: any[]
  pgFacilities: any
  previewUrlsBackend = []
  coverImageBackend: any
  coverImageLink = 'https://img-mb.homes247.in/images/pg_img/cover/';
  roomSummaryDataBackend: any[]

  count: number = 0;


  getlocationlistPg1() {
    this.Service.getindividualcity().subscribe(city => {
      this.citiess = city['citys'];
      this.selectedLocation = this.citiess[0]['city'];
    });
    this.UserId = localStorage.getItem('userID');

    this.routeSub = this.activeroute.params.subscribe(params => {
      this.PropertyId = params['id'];
      this.TypeID = params['typeid'];
      this.Service.getPropDetailsPgById(this.UserId, this.PropertyId, this.TypeID).subscribe(response => {
        if (response['status'] === 'True') {
          this.filterLoader = false

          this.Propdetails = response['Propdetails'];
          this.Residential()
          this.Property_Type_value = 'Residential';
          this.Property_Available_value = this.Propdetails[0]['Available_for'];
          this.propertyAvailableList.forEach(item => {
            if (item.key == this.Property_Available_value) {
              this.PropertyAvailableLabel = item.label
            }
          });
          this.currentCity = this.Propdetails[0]['city_name'];

          this.locationSelectedId = this.Propdetails[0]['city_IDFK'];

          this.selectedLoc = this.Propdetails[0]['locality_name'];

          this.locality_id = this.Propdetails[0]['locality_IDFK'];

          if (this.locality_id != null) {

            this.propertyAutoRentLocalityName = this.selectedLoc

          }

          if (this.locality_id == null) {

            this.propertyAutoRentLocalityName = this.Propdetails[0]['locality_requested'];

          }
          this.forPG();
          this.PG_Name_value = this.Propdetails[0]['PG_Name'];
          this.PG_Address_value = this.Propdetails[0]['location'];
          this.PG_PinCode_value = this.Propdetails[0]['pinCode'];
          this.Listing_As_value = this.Propdetails[0]['listedby'];
          this.pgListingAsList.forEach(item => {
            if (item.key == this.Listing_As_value) {
              this.PgListingAsLabel = item.label
            }
          });
          this.Landmarks_value = this.Propdetails[0]['landmarks'];
          this.PG_Started_Year_value = this.Propdetails[0]['Pg_Operational'];
          this.pgStartedYearList.forEach(item => {
            if (item.key == this.PG_Started_Year_value) {
              this.PgStartedYearLabel = item.label
            }
          });
          this.Best_Suit_For_value = this.Propdetails[0]['Bestsuitedfor'];
          this.pgBestSuitForList.forEach(item => {
            if (item.key == this.Best_Suit_For_value) {
              this.BestSuitForLabel = item.label
            }
          });
          this.Food_Provided_value = this.Propdetails[0]['food_included'];
          if (this.Food_Provided_value == 1) {
            this.foodAvaliable = true;
          } else {
            this.foodAvaliable = false;
          }
          this.Notice_Period_value = this.Propdetails[0]['notice_period'];
          this.pgNoticePeriodList.forEach(item => {
            if (item.key == this.Notice_Period_value) {
              this.NoticePeriodlabel = item.label
            }
          });
          this.Tenants_Must_Return_By_value = this.Propdetails[0]['timeing'];
          this.pgTenantsReturnByList.forEach(item => {
            if (item.key == this.Tenants_Must_Return_By_value) {
              this.TenantsMustReturnByLabel = item.label
            }
          });
          this.Meal_Type_value = this.Propdetails[0]['veg_type'];
          this.pgMealTypeList.forEach(item => {
            if (item.key == this.Meal_Type_value) {
              this.MealTypeLabel = item.label
            }
          });
          this.Parking_Type_value = this.Propdetails[0]['Parking_Type'];
          this.Parking.forEach(item => {
            if (item.key == this.Parking_Type_value) {
              this.ParkingTypeLabel = item.label
            }
          });
          this.propertyDescription_value = this.Propdetails[0]['description'];
          this.First_Name_value = this.Propdetails[0]['user_name '];
          this.Last_Name_value = this.Propdetails[0]['last_name'];
          this.Email_Address_value = this.Propdetails[0]['user_email'];
          this.Phone_Number_value = this.Propdetails[0]['contact_number'];
          this.PG_Avaliable_for = this.Propdetails[0]['pg_type'];
          this.pgAvailableForList.forEach(item => {
            if (item.key == this.PG_Avaliable_for) {
              this.PGAvaliableForLabel = item.label
            }
          });
          this.Parking_Avaliable_value = this.Propdetails[0]['parking_IDPK'];
          if (this.Parking_Avaliable_value == 1) {
            this.parkingAvaliable = true;
          } else {
            this.parkingAvaliable = false;
          }
          this.PG_Food_Charges_value = this.Propdetails[0]['Food_charges'];

          this.pgFoodChargesList.forEach(item => {

            if (item.key == this.PG_Food_Charges_value) {

              this.PGFoodChargeslabel = item.label

            }

          });

          this.PG_Rules_value = this.PGRulesvalue.map(item => item.rules_IDFK);
          this.FourthFormGroup.get('PG_Rules')?.setValue(this.PG_Rules_value);

          this.todayDatySplit = this.Propdetails[0]['created_date'];
          this.onlyDateSplitted = this.todayDatySplit.split(' ');
          this.todayDateUI = this.onlyDateSplitted[0]


          this.pgRuleLabels = this.PG_Rules_value
            .map(key => {
              const matched = this.pgRulesList.find(rule => rule.key === key);
              return matched ? matched.label : null;
            })


          //    for (let i = 0; i < this.PGRulesvalue.length; i++) {
          //   this.PG_Rules_value.push(this.PGRulesvalue[i]['rules_IDFK']);
          //   this.FourthFormGroup.get('PG_Rules')?.setValue(this.PG_Rules_value);
          // }
          this.PGServicevalue = this.Propdetails[0]['service_id'];
          this.pgServices_value = this.PGServicevalue.map(item => item.services_IDFK);
          this.FifthFormGroup.get('pgServices')?.setValue(this.pgServices_value);
          // 



          this.pgServiceLabels = this.pgServices_value
            .map(key => {
              const matched = this.pgServiceList.find(service => service.key === key);
              return matched ? matched.label : null;
            })

          this.PGAmenitiesvalue = this.Propdetails[0]['amenities_id'];
          this.selectedAmenities = this.PGAmenitiesvalue.map(item => item.amenities_IDFK);
          this.updateSelectedPgAmenityLabels()
          // this.roomSummaryDataBackend = this.Propdetails[0]['room_categorysid'];
          // // 
          // this.submittedData = this.roomSummaryDataBackend.map(room => {
          //   const mappedRoom: Room = {
          //     type: room.room_category,
          //     label: this.getRoomLabelByValue(room.room_category),
          //     rent: room.rent_amount,
          //     deposit: room.security_deposit,
          //     roomCount: room.num_room,
          //     facilities: room.facility_ids || {}
          //   };
          //   // 
          //   return mappedRoom;
          // });
          // // 
          const facilities = {};
          this.pgFacilities = this.pgFacilitiesList.forEach(facility => {
            facilities[facility.key] = this.form.get(facility.key)?.value || false;
          });
          // ✅ now that facilities list is ready, build submittedData
          this.roomSummaryDataBackend = this.Propdetails[0]['room_categorysid'] || [];
          this.submittedData = this.roomSummaryDataBackend.map(room => {
            const allFacilityKeys = this.pgFacilitiesList.map(f => f.key);
            const mappedRoom: Room = {
              type: room.room_category || room.baseType,
              label: room.room_type || this.getRoomLabelByValue(room.room_category || room.baseType),
              rent: room.rent_amount || room.rent,
              deposit: room.security_deposit || room.deposit,
              roomCount: room.num_room ?? room.roomCount ?? '',
              facilities: this.FacilitiesBoolean(room.facility_ids || room.facilities),
            };
            if (!['1', '2', '3', '4'].includes(mappedRoom.type)) {
              const matched = this.roomOtherTypes.find(item => item.value === mappedRoom.type);
              if (matched && !this.usedOtherSharings.includes(matched.value)) {
                this.usedOtherSharings.push(matched.value);
              }
            }
            // 
            return mappedRoom;
          });
          // 
          // ✅ Keep order consistent
          this.updateDisabledRoomMap()
          this.updateRoomOtherTypesDisabled();
          this.getOrderedSubmittedData()
          this.updateUniqueSubmittedFacilities()
          this.PGFoodvalue = this.Propdetails[0]?.Meals_available || [];
          this.PG_Food_value = this.PGFoodvalue.map(item => item);
          // // 
          this.FifthFormGroup.get('PG_Food')?.setValue(this.PG_Food_value);

          this.PG_Food_labels = this.PGFoodvalue
            .map(key => {
              const matched = this.pgFoodList.find(m => m.key === key);
              return matched ? matched.label : null;
            })


          // // 
          // this.coverImageBackend = this.Propdetails[0]['pg_coverimage'];
          // this.images = this.Propdetails[0]['images'];
          // this.previewUrlsBackend = this.images;
          // if (this.previewUrlsBackend && this.previewUrlsBackend.length > 0) {
          //   this.photoForm.patchValue({ coverImage: this.previewUrlsBackend[0] }); 
          // }
          // this.coverImageUrl = this.previewUrlsBackend[0];
          // this.Propdetails[0].images.forEach((img: any) => {
          //   (this.Propdetails[0].images || []).forEach((img: any) => {
          //     this.photoLabels[img.image_name] = '1'; 
          //   });
          //   if (img.facility_name) {
          //     // 
          //   }
          // });
          this.images = this.Propdetails[0]['images'];
          this.previewUrlsBackend = this.images;
          if (this.previewUrlsBackend && this.previewUrlsBackend.length > 0) {
            // Look for backend cover image
            const backendCover = this.previewUrlsBackend.find((img: any) => img.cover_img === "1");
            if (backendCover) {
              this.coverImageUrl = backendCover;
              this.photoForm.patchValue({ coverImage: backendCover });
            } else {
              // fallback to first only if backend didn’t mark any
              this.coverImageUrl = this.previewUrlsBackend[0];
              this.photoForm.patchValue({ coverImage: this.previewUrlsBackend[0] });
            }
          }
          if (this.coverImageUrl && this.coverImageUrl.image_name) {

          }
          // reset only once
          this.photoLabels = {};
          (this.Propdetails[0].images || []).forEach((img: any) => {
            // use image_name as key (since it's unique)
            this.photoLabels[img.image_name] = img.label_IDFK || '';
            if (img.facility_name) {
            } else {
            }
          });








          this.onChangeRegionRent();
          // this.updateRoomSummaryLabels()
        }
      })
    })
  }
  officefacilities = []
  shopfacilities = []
  plotfacilities = []
  warehousefacilities = []
  localityBackend: any
  IncludedInRentValueBackend: any


  avaliableDateSplit: any


  getlocationlistCommercial1() {

    this.Service.getindividualcity().subscribe(city => {
      this.citiess = city['citys'];
      this.selectedLocation = this.citiess[0]['city'];
    });
    this.UserId = localStorage.getItem('userID');
    this.routeSub = this.activeroute.params.subscribe(params => {
      this.PropertyId = params['id'];
      this.TypeID = params['typeid'];
      this.Service.getPropDetailsCommercialById(this.UserId, this.PropertyId, this.TypeID).subscribe(response => {
        if (response['status'] === 'True') {
          this.filterLoader = false

          this.Propdetails = response['Propdetails'];

          this.Property_Type_value = 'Commercial';
          this.Commercial();
          this.Property_Available_value = this.Propdetails[0]['available_for'];

          this.propertyAvailableList.forEach(item => {
            if (item.key == this.Property_Available_value) {
              this.PropertyAvailableLabel = item.label
            }
          });

          this.firstFormGroup.get('Property_Available')?.setValue(this.Property_Available_value)
          if (this.Property_Available_value == 1) {
            this.forSale();
          } else if (this.Property_Available_value == 2) {
            this.forRent();
          }
          this.currentCity = this.Propdetails[0]['city_name'];

          this.locationSelectedId = this.Propdetails[0]['city_IDFK'];

          this.selectedLoc = this.Propdetails[0]['locality_name'];

          if (this.selectedLoc != null) {

            this.locality_id = this.Propdetails[0]['locality_IDFK'];

            this.propertyAutoRentLocalityName = this.selectedLoc

          }

          if (this.selectedLoc == null) {

            this.propertyAutoRentLocalityName = this.Propdetails[0]['locality_requested'];

          }


          this.photoForm.get('coverImage')?.setValue(this.coverImageBackend);
          this.Lock_In_Period_value = this.Propdetails[0]['lock_in_period'];
          this.lockInPeriodList.forEach(item => {

            if (item.key == this.Lock_In_Period_value) {

              this.LockInPeriodLabel = item.label

            }

          });

          this.Commercial_Property_Type_value = this.Propdetails[0]['property_type'];
          if (this.Commercial_Property_Type_value == 1) {
            this.officeSpace();
          } else if (this.Commercial_Property_Type_value == 2) {
            this.shopShowroom();
          } else if (this.Commercial_Property_Type_value == 3) {
            this.Plot();
          } else if (this.Commercial_Property_Type_value == 4) {
            this.officeSpace();
          } else if (this.Commercial_Property_Type_value == 5) {
            this.warehouse();
          } else if (this.Commercial_Property_Type_value == 6) {
            this.commercialOthers = 'others'
            this.warehouse();
          }

          this.commercialPropertyTypeList.forEach(item => {
            if (item.key == this.Commercial_Property_Type_value) {
              this.CommercialPropertyTypeLabel = item.label
            }
          });

          this.Commercial_Property_Name_value = this.Propdetails[0]['property_title'];
          this.address = this.Propdetails[0]['address'];
          this.Commercial_Listing_As_value = this.Propdetails[0]['Ownership'];

          this.commercialListingAsList.forEach(item => {
            if (item.key == this.Commercial_Listing_As_value) {
              this.CommercialListingAsLabel = item.label
            }
          });

          this.Commercial_Postal_Code_value = this.Propdetails[0]['pin_code'];
          this.Suited_For_value = this.Propdetails[0]['suited_for'];

          if (this.Commercial_Property_Type_value == 1 || this.Commercial_Property_Type_value == 4) {
            this.officeSuitedFor.forEach(item => {
              if (item.key == this.Suited_For_value) {
                this.SuitedForLabel = item.label
              }
            });
          }
          if (this.Commercial_Property_Type_value == 2) {
            this.suitedForList.forEach(item => {
              if (item.key == this.Suited_For_value) {
                this.SuitedForLabel = item.label
              }
            });
          }
          if (this.Commercial_Property_Type_value == 5 || this.Commercial_Property_Type_value == 6) {
            this.warehousesuitedfor.forEach(item => {
              if (item.key == this.Suited_For_value) {
                this.SuitedForLabel = item.label
              }
            });
          }


          this.Plot_Type_value = this.Propdetails[0]['plot_type'];
          this.plotTypeList.forEach(item => {

            if (item.key == this.Plot_Type_value) {

              this.PlotTypeLabel = item.label

            }

          });
          this.Building_Type_value = this.Propdetails[0]['building_type'];
          this.todayDatySplit = this.Propdetails[0]['created_date'];
          this.onlyDateSplitted = this.todayDatySplit.split(' ');
          this.todayDateUI = this.onlyDateSplitted[0]
          this.buildingTypeList.forEach(item => {
            if (item.key == this.Building_Type_value) {
              this.BuildingTypeLabel = item.label
            }
          });


          this.Landmarks_value = this.Propdetails[0]['landmarks'];
          this.Plot_Length_value = this.Propdetails[0]['plot_length'];
          this.Plot_Length_type_value = this.Propdetails[0]['Plot_Length_type'];
          this.Carpet_Area_value = this.Propdetails[0]['carpet_area'];
          this.carpet_area_type_value = this.Propdetails[0]['carpet_area_type'];
          this.Boundary_Wall_value = this.Propdetails[0]['Boundary_wall'];
          this.Furnished_Type_value = this.Propdetails[0]['furnishing_status'];

          this.furnishTypeList.forEach(item => {
            if (item.key == this.Furnished_Type_value) {
              this.FurnishedTypeLabel = item.label
            }
          });

          this.Plot_Dimension_value = this.Propdetails[0]['dimension'];
          this.Plot_Dimension_type_value = this.Propdetails[0]['dimensiontype'];
          this.Total_Floors_value = this.Propdetails[0]['total_floors'];
          this.Open_Sides_value = this.Propdetails[0]['No_Open_Sides'];
          this.Any_Construction_Done_value = this.Propdetails[0]['Any_Construction_Done'];
          this.Covered_Parking_value = this.Propdetails[0]['parking_covered'];
          this.Max_No_Of_Seats_value = this.Propdetails[0]['seats'];
          // this.Best_Suit_For_value = this.Propdetails[0][''];
          this.Floor_NO_value = this.Propdetails[0]['floor_number'];
          this.Floor_Allowed_value = this.Propdetails[0]['floor_allowed'];
          this.Property_Status_value = this.Propdetails[0]['status'];

          this.propertyStatusList.forEach(item => {
            if (item.key == this.Property_Status_value) {
              this.PropertyStatuslabel = item.label
            }
          });

          this.commercial = true;

          if (this.Property_Status_value == '1') {
            this.propertyStatus = 'Ready_To_Move'
            this.Possession_Date_value = '';
            this.FifthFormGroup.get('Possession_Date')?.reset();
          } else if (this.Property_Status_value == '2') {
            this.propertyStatus = 'Under_Construction'
            this.Age_Of_Property_value = '';
            this.FifthFormGroup.get('Age_of_Property')?.reset();
          }
          this.Corner_Plot_value = this.Propdetails[0]['Corner_plot'];
          this.Open_Parking_Count_value = this.Propdetails[0]['parking_open'];
          this.Parking_Count_value = this.Propdetails[0]['no_of_parking'];
          this.Is_Corner_Shop_value = this.Propdetails[0]['corner_shop_value'];
          this.Total_Cabin_Count_value = this.Propdetails[0]['cabins'];
          this.Total_Amount_value = this.Propdetails[0]['sale_amount'];
          this.Security_Deposit_value = this.Propdetails[0]['rent_deposit'];
          if (this.Commercial_Property_Type_value == 5 || this.Commercial_Property_Type_value == 6) {
            this.total_lease_amount_value = this.Propdetails[0]['sale_lease'];
          } else {
            this.total_lease_amount_value = this.Propdetails[0]['lease_amount'];
          }

          this.Negotiable_value = this.Propdetails[0]['negotiable'];
          this.Booking_Token_Amount_value = this.Propdetails[0]['sale_token'];
          this.RERA_Number_value = this.Propdetails[0]['rera_number'];
          this.Property_Customizable_value = this.Propdetails[0]['customizable'];
          this.Buitl_Up_Area_value = this.Propdetails[0]['built_up_area'];
          this.Buitl_Up_Area_type_value = this.Propdetails[0]['built_up_area_type'];
          this.Plot_Breadth_value = this.Propdetails[0]['plot_breadth'];
          this.Plot_Breadth_type_value = this.Propdetails[0]['Plot_Breadth_type'];
          this.IncludedInRentValueBackend = this.Propdetails[0]['included_in_rent'];
          // When loading backend
          // this.IncludedInRent_Value = '';
          if (this.IncludedInRentValueBackend == 1) {
            this.IncludedInRent_Value = true
          } else {
            this.IncludedInRent_Value = false
          }
          this.Rent_Per_Month_ForLease_value = this.Propdetails[0][''];
          this.Available_From_value = this.Propdetails[0][''];
          if (this.Property_Type == 'Commercial' && this.property_for == 'rent' && (this.Commercial_Type == 'officeSpace' || this.Commercial_Type == 'shopShowroom' || this.Commercial_Type == 'warehouse')) {
            this.Age_Of_Property_Rent_value = this.Propdetails[0]['propertyage'];
            this.propertyAgeList.forEach(item => {
              if (item.key == this.Age_Of_Property_Rent_value) {
                this.AgeOfPropertyRentLabel = item.label
              }
            });
          }
          if (this.Property_Type == 'Commercial' && this.Commercial_Type == 'Plot') {
            this.Age_Of_Property_Rent_value = this.Propdetails[0]['propertyage'];
            this.propertyAgeList.forEach(item => {
              if (item.key == this.Age_Of_Property_Rent_value) {
                this.AgeOfPropertyRentLabel = item.label
              }
            });
          }
          if (this.Property_Status_value == '1' && this.Property_Available_value == '1') {
            this.Age_Of_Property_value = this.Propdetails[0]['propertyage'];
            this.propertyAgeList.forEach(item => {
              if (item.key == this.Age_Of_Property_value) {
                this.AgeOfPropertyLabel = item.label
              }
            });
          }

          if (this.Commercial_Type == 'Plot' && this.property_for == 'rent') {
            this.Security_Deposit_value = this.Propdetails[0]['rent_deposit'];
          }
          this.Super_Buitl_Up_Area_value = this.Propdetails[0]['built_up_area'];
          this.Super_Buitl_Up_Area_type_value = this.Propdetails[0]['built_up_area_type'];

          this.propertyDescription_value = this.Propdetails[0]['description'];
          this.Property_Facing_value = this.Propdetails[0]['Property_facing'];

          this.propertyFacingList.forEach(item => {

            if (item.key == this.Property_Facing_value) {

              this.PropertyFacingLabel = item.label

            }

          });


          this.Washroom_Counts_value = this.Propdetails[0]['washroom'];
          this.Private_Washroom_value = this.Propdetails[0]['washroom'];
          this.First_Name_value = this.Propdetails[0]['user_name'];
          this.Last_Name_value = this.Propdetails[0]['last_name'];
          this.Email_Address_value = this.Propdetails[0]['user_email'];
          this.Phone_Number_value = this.Propdetails[0][''];
          this.Only_Lease_value = this.Propdetails[0]['rent_lease'];
          if (this.Only_Lease_value == 1) {
            this.forlease = true
          }
          this.Only_Lease_Shop_value = this.Propdetails[0]['rent_lease'];
          if (this.Only_Lease_Shop_value == 1) {
            this.forlease = true
          }
          this.Rent_Per_Month_value = this.Propdetails[0]['rent_amount'];
          this.Rent_Per_Month_Shop_value = this.Propdetails[0]['rent_amount'];
          this.Maintenance_Amount_Plot_value = this.Propdetails[0]['Maintenace_charge'];
          this.MaintenanceCharges_Value = this.Propdetails[0]['Maintenace_charge'];

          this.CommercialAmenitiesvalue = this.Propdetails[0]['Amenities'];
          this.selectedAmenities = this.CommercialAmenitiesvalue.map(item => item.key);
          // 
          this.updateSelectedCommercialAmenityLabels()


          if (this.Commercial_Type == 'Plot') {
            // 
            this.plotfacilities = this.Propdetails[0]['Facilities'];
            this.FourthFormGroup.get('Plot_Facilities')?.setValue(this.plotfacilities.map(item => item.id))
          }

          if (this.Commercial_Type == 'officeSpace') {
            this.officefacilities = this.Propdetails[0]['Facilities'];
            this.FourthFormGroup.get('Office_Space_Facilities')?.setValue(this.officefacilities.map(item => item.id))


          }
          if (this.Commercial_Type == 'shopShowroom') {
            this.shopfacilities = this.Propdetails[0]['Facilities'];
            this.FourthFormGroup.get('Shop_Facilities')?.setValue(this.shopfacilities.map(item => item.id))
            // 
          }
          if (this.Commercial_Type == 'warehouse') {
            this.warehousefacilities = this.Propdetails[0]['Facilities'];
            this.FourthFormGroup.get('Warehouse_Facilities')?.setValue(this.warehousefacilities.map(item => item.id))
          }




          this.images = this.Propdetails[0]['images'];
          this.previewUrlsBackend = this.images;
          if (this.previewUrlsBackend && this.previewUrlsBackend.length > 0) {
            // Look for backend cover image
            const backendCover = this.previewUrlsBackend.find((img: any) => img.cover_img === "1");
            if (backendCover) {
              this.coverImageUrl = backendCover;
              this.photoForm.patchValue({ coverImage: backendCover });
            } else {
              // fallback to first only if backend didn’t mark any
              this.coverImageUrl = this.previewUrlsBackend[0];
              this.photoForm.patchValue({ coverImage: this.previewUrlsBackend[0] });
            }
          }
          // reset only once
          this.photoLabels = {};
          (this.Propdetails[0].images || []).forEach((img: any) => {
            // use image_name as key (since it's unique)
            this.photoLabels[img.image_name] = img.label_IDFK || '';
            if (img.facility_name) {
            } else {
            }
          });


          this.onChangeRegionRent();
          if (this.Property_Type == 'Commercial' && this.property_for == 'rent') {
            const backendDateRent = this.Propdetails[0]['available_from'];
            this.Avaliable_Date_Rent_value = backendDateRent.split('-').reverse().join('-');
          }
          if (this.Commercial_Type == 'Plot' && this.property_for == 'sale') {
            const backendDatesale = this.Propdetails[0]['available_from'];
            this.Available_From_value = backendDatesale.split('-').reverse().join('-');
          }
          if (this.propertyStatus == 'Under_Construction' && this.property_for == 'sale') {
            const backendDatePossession = this.Propdetails[0]['possession_date'];
            this.Possession_Date_value = backendDatePossession.split('-').reverse().join('-');
          }
        }
      })
    })
  }



  // FacilitiesBoolean(facilities: any): { [key: string]: boolean } {
  //   const facilityObj: { [key: string]: boolean } = {};
  //   const allFacilityKeys = this.pgFacilitiesList.map(f => f.key);
  //   allFacilityKeys.forEach(key => {
  //     if (Array.isArray(facilities)) {
  //       facilityObj[key] = facilities.includes(key);
  //       // 
  //     } else if (typeof facilities === 'object') {
  //       facilityObj[key] = !!facilities[key];
  //     } else {
  //       facilityObj[key] = false;
  //     }
  //   });
  //   return facilityObj;
  // }
  FacilitiesBoolean(facilities: any): { [key: string]: boolean } {
    const facilityObj: { [key: string]: boolean } = {};
    // 
    // 
    if (!this.pgFacilitiesList || this.pgFacilitiesList.length === 0) {

      return facilityObj;
    }
    const allFacilityKeys = this.pgFacilitiesList.map(f => String(f.key));
    // 
    allFacilityKeys.forEach(key => {
      if (Array.isArray(facilities)) {
        const normalized = facilities.map(f => String(f));
        facilityObj[key] = normalized.includes(key);
      } else if (typeof facilities === 'object' && facilities !== null) {
        facilityObj[key] = !!facilities[key];
      } else {
        facilityObj[key] = false;
      }
    });
    // 
    return facilityObj;
  }
  // deleteGalleryImagesPg(imgId) {  
  //   
  //   const pg_Propid = this.PropertyId
  //   swal({
  //     title: 'Almost There!',
  //     text: 'Are you sure you want to delete this image?',
  //     icon: 'warning',
  //     confirmButtonColor: '#971b47',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Remove',
  //     showCancelButton: true,
  //   }).then((result) => {
  //     if (result.value === true) {
  //       this.Service.deleteGalleryImageByImageIdPG(pg_Propid, imgId).subscribe(response => {
  //         // 
  //         this.images = this.images.filter(img => img.Id !== imgId);
  //       });
  //     }
  //   })
  // }
  // deleteGalleryImagesPg(imgId: string) {

  //   const pg_Propid = this.PropertyId;
  //   swal({
  //     title: 'Almost There!',
  //     text: 'Are you sure you want to delete this image?',
  //     icon: 'warning',
  //     confirmButtonColor: '#971b47',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Remove',
  //     showCancelButton: true,
  //   }).then((result) => {
  //     if (result.value === true) {
  //       this.Service.deleteGalleryImageByImageIdPG(pg_Propid, imgId).subscribe(
  //         (response) => {
  //           // 
  //           // ✅ Remove from arrays used in UI
  //           this.images = this.images.filter(img => img.Id !== imgId);
  //           this.previewUrlsBackend = this.previewUrlsBackend.filter(img => img.Id !== imgId);
  //           this.galleryImagesData = this.galleryImagesData.filter(img => img.image_name !== imgId);
  //           // ✅ Also clear photoLabels for that image
  //           if (this.photoLabels[imgId]) {
  //             delete this.photoLabels[imgId];
  //           }
  //           // ✅ If deleted image was cover → reassign
  //           if (this.coverImageUrl && this.coverImageUrl.Id === imgId) {
  //             if (this.previewUrlsBackend.length > 0) {
  //               this.coverImageUrl = this.previewUrlsBackend[0];
  //               // 
  //             } else {
  //               this.coverImageUrl = null;
  //               // 
  //             }
  //           }
  //           // ✅ Rebuild payload with updated state
  //           this.setCoverAndGalleryData();
  //           // 
  //           // 
  //           // 
  //           // 
  //           this.getlocationlistPg();
  //         },
  //         (error) => {

  //         }
  //       );
  //     }
  //   });
  // }




  deleteGalleryImagesPg(imgId: string) {
    const pg_Propid = this.PropertyId;
    swal({
      title: 'Almost There!',
      text: 'Are you sure you want to delete this image?',
      icon: 'warning',
      confirmButtonColor: '#971b47',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Remove',
      showCancelButton: true,
    }).then((result) => {
      if (result.value === true) {
        this.filterLoader = true

        this.Service.deleteGalleryImageByImageIdPG(pg_Propid, imgId).subscribe(
          (response) => {

            if (response['status'] === 'True') {
              this.filterLoader = false
            }
            // 
            // ✅ Remove from arrays used in UI
            this.images = this.images.filter(img => img.Id !== imgId);
            this.previewUrlsBackend = this.previewUrlsBackend.filter(img => img.imageId !== imgId);
            this.galleryImagesDataBackend = this.galleryImagesDataBackend.filter(img => img.image_name !== imgId);
            // ✅ Rebuild final galleryImagesData
            this.setCoverAndGalleryData();
            // ✅ Also clear photoLabels for that image
            if (this.photoLabels[imgId]) {
              delete this.photoLabels[imgId];
            }
            // ✅ If deleted image was cover → reassign
            if (this.coverImageUrl && this.coverImageUrl.imageId === imgId) {

              if (this.previewUrlsBackend.length > 0) {
                this.coverImageUrl = this.previewUrlsBackend[0];


                this.photoForm.get('coverImage')?.setValue(this.coverImageUrl);
              } else {
                this.coverImageUrl = null;

              }
            }
            // ✅ Rebuild payload with updated state
            this.setCoverAndGalleryData();
            // 
            // 
            // 
            // 
            // this.getlocationlistPg();
          },
          (error) => {
          }
        );
      }
    });
  }




  // deleteGalleryImagesCommercial(imgId: string) {

  //   const pg_Propid = this.PropertyId;

  //   swal({
  //     title: 'Almost There!',
  //     text: 'Are you sure you want to delete this image?',
  //     icon: 'warning',
  //     confirmButtonColor: '#971b47',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Remove',
  //     showCancelButton: true,
  //   }).then((result) => {
  //     if (result.value === true) {
  //       this.Service.deleteGalleryImageByImageIdCommercial(pg_Propid, imgId).subscribe(
  //         (response) => {
  //           // 

  //           // ✅ Remove from arrays used in UI
  //           this.images = this.images.filter(img => img.Id !== imgId);
  //           this.previewUrlsBackend = this.previewUrlsBackend.filter(img => img.Id !== imgId);
  //           this.galleryImagesData = this.galleryImagesData.filter(img => img.image_name !== imgId);

  //           // ✅ Also clear photoLabels for that image
  //           if (this.photoLabels[imgId]) {
  //             delete this.photoLabels[imgId];
  //           }

  //           // ✅ If deleted image was cover → reassign
  //           if (this.coverImageUrl && this.coverImageUrl.Id === imgId) {

  //             if (this.previewUrlsBackend.length > 0) {


  //               this.coverImageUrl = this.previewUrlsBackend[0];
  //               // 
  //             } else {
  //               this.coverImageUrl = null;
  //               // 
  //             }
  //           }

  //           // ✅ Rebuild payload with updated state
  //           this.setCoverAndGalleryData();

  //           // 
  //           // 
  //           // 
  //           // 
  //           this.getlocationlistCommercial();
  //         },
  //         (error) => {

  //         }
  //       );
  //     }
  //   });
  // }



  deleteGalleryImagesCommercial(imgId: string) {
    const pg_Propid = this.PropertyId;
    swal({
      title: 'Almost There!',
      text: 'Are you sure you want to delete this image?',
      icon: 'warning',
      confirmButtonColor: '#971b47',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Remove',
      showCancelButton: true,
    }).then((result) => {
      if (result.value === true) {
        this.filterLoader = true
        this.Service.deleteGalleryImageByImageIdCommercial(pg_Propid, imgId).subscribe(
          (response) => {

            if (response['status'] === 'True') {
              this.filterLoader = false
            }
            // 
            // ✅ Remove from arrays used in UI
            this.images = this.images.filter(img => img.Id !== imgId);
            this.previewUrlsBackend = this.previewUrlsBackend.filter(img => img.imageId !== imgId);
            this.galleryImagesDataBackend = this.galleryImagesDataBackend.filter(img => img.image_name !== imgId);
            // ✅ Rebuild final galleryImagesData
            this.setCoverAndGalleryData();
            // ✅ Also clear photoLabels for that image
            if (this.photoLabels[imgId]) {
              delete this.photoLabels[imgId];
            }
            // ✅ If deleted image was cover → reassign
            // 


            if (this.coverImageUrl && this.coverImageUrl.imageId === imgId) {

              if (this.previewUrlsBackend.length > 0) {
                this.coverImageUrl = this.previewUrlsBackend[0];
                this.photoForm.get('coverImage')?.setValue(this.coverImageUrl);
              } else {
                this.coverImageUrl = null;

              }
            }
            // ✅ Rebuild payload with updated state
            this.setCoverAndGalleryData();

          },





          (error) => {
          }
        );
      }
    });
  }




  filterLoader = true;





  removeLabelFromImages(labelId: string): void {
    // Backend images
    // this.previewUrlsBackend.forEach(img => {
    //   if (img.label_IDFK === labelId) {
    //     img.label_IDFK = ''; // clear the label
    //   }
    // });

    // New uploads
    Object.keys(this.photoLabels).forEach(key => {
      if (this.photoLabels[key] === labelId) {
        this.photoLabels[key] = '';
      }
    });

    this.validatePhotoStep()
  }



  IncludedInRent(val) {

    if (val == 1) {
      this.IncludedInRent_Value = true
    } else {
      this.IncludedInRent_Value = false
    }
  }
















  // ////////////////////////////////////////////////////////////////////////

  getlocationlistCommercial() {
    this.Service.getindividualcity().subscribe(city => {
      this.citiess = city['citys'];
      this.selectedLocation = this.citiess[0]['city'];
    });
    this.UserId = localStorage.getItem('userID');
    this.routeSub = this.activeroute.params.subscribe(params => {
      this.PropertyId = params['id'];
      this.TypeID = params['typeid'];
      this.Service.getPropDetailsCommercialById(this.UserId, this.PropertyId, this.TypeID).subscribe(response => {
        if (response['status'] === 'True') {
          this.filterLoader = false
          this.Propdetails = response['Propdetails'];
          this.Property_Type_value = 'Commercial';
          this.Commercial();
          this.Property_Available_value = this.Propdetails[0]['available_for'];
          this.FourthFormGroup.get('Warehouse_Facilities')?.setValue(this.warehousefacilities.map(item => item.id))
          this.propertyAvailableList.forEach(item => {
            if (item.key == this.Property_Available_value) {
              this.PropertyAvailableLabel = item.label
            }
          });
          this.firstFormGroup.get('Property_Available')?.setValue(this.Property_Available_value)
          if (this.Property_Available_value == 1) {
            this.forSale();
          } else if (this.Property_Available_value == 2) {
            this.forRent();
          }
          this.currentCity = this.Propdetails[0]['city_name'];
          this.locationSelectedId = this.Propdetails[0]['city_IDFK'];
          this.selectedLoc = this.Propdetails[0]['locality_name'];
          if (this.selectedLoc != null) {
            this.locality_id = this.Propdetails[0]['locality_IDFK'];
            this.propertyAutoRentLocalityName = this.selectedLoc
          }
          if (this.selectedLoc == null) {
            this.propertyAutoRentLocalityName = this.Propdetails[0]['locality_requested'];
          }
          this.photoForm.get('coverImage')?.setValue(this.coverImageBackend);
          this.Lock_In_Period_value = this.Propdetails[0]['lock_in_period'];
          this.lockInPeriodList.forEach(item => {
            if (item.key == this.Lock_In_Period_value) {
              this.LockInPeriodLabel = item.label
            }
          });
          this.Commercial_Property_Type_value = this.Propdetails[0]['property_type'];
          if (this.Commercial_Property_Type_value == 1) {
            this.officeSpace();
          } else if (this.Commercial_Property_Type_value == 2) {
            this.shopShowroom();
          } else if (this.Commercial_Property_Type_value == 3) {
            this.Plot();
          } else if (this.Commercial_Property_Type_value == 4) {
            this.officeSpace();
          } else if (this.Commercial_Property_Type_value == 5) {
            this.warehouse();
          } else if (this.Commercial_Property_Type_value == 6) {
            this.commercialOthers = 'others'
            this.warehouse();
          }
          this.commercialPropertyTypeList.forEach(item => {
            if (item.key == this.Commercial_Property_Type_value) {
              this.CommercialPropertyTypeLabel = item.label
            }
          });
          this.Commercial_Property_Name_value = this.Propdetails[0]['property_title'];
          this.address = this.Propdetails[0]['address'];
          this.Commercial_Listing_As_value = this.Propdetails[0]['Ownership'];
          this.commercialListingAsList.forEach(item => {
            if (item.key == this.Commercial_Listing_As_value) {
              this.CommercialListingAsLabel = item.label
            }
          });
          this.Commercial_Postal_Code_value = this.Propdetails[0]['pin_code'];
          this.Suited_For_value = this.Propdetails[0]['suited_for'];
          if (this.Commercial_Property_Type_value == 1 || this.Commercial_Property_Type_value == 4) {
            this.officeSuitedFor.forEach(item => {
              if (item.key == this.Suited_For_value) {
                this.SuitedForLabel = item.label
              }
            });
          }
          if (this.Commercial_Property_Type_value == 2) {
            this.suitedForList.forEach(item => {
              if (item.key == this.Suited_For_value) {
                this.SuitedForLabel = item.label
              }
            });
          }
          if (this.Commercial_Property_Type_value == 5 || this.Commercial_Property_Type_value == 6) {
            this.warehousesuitedfor.forEach(item => {
              if (item.key == this.Suited_For_value) {
                this.SuitedForLabel = item.label
              }
            });
          }
          this.Plot_Type_value = this.Propdetails[0]['plot_type'];
          this.plotTypeList.forEach(item => {
            if (item.key == this.Plot_Type_value) {
              this.PlotTypeLabel = item.label
            }
          });
          this.Building_Type_value = this.Propdetails[0]['building_type'];
          this.buildingTypeList.forEach(item => {
            if (item.key == this.Building_Type_value) {
              this.BuildingTypeLabel = item.label
            }
          });
          this.Landmarks_value = this.Propdetails[0]['landmarks'];
          this.Plot_Length_value = this.Propdetails[0]['plot_length'];
          this.Plot_Length_type_value = this.Propdetails[0]['Plot_Length_type'];
          this.Carpet_Area_value = this.Propdetails[0]['carpet_area'];
          this.carpet_area_type_value = this.Propdetails[0]['carpet_area_type'];
          this.Boundary_Wall_value = this.Propdetails[0]['Boundary_wall'];
          this.Furnished_Type_value = this.Propdetails[0]['furnishing_status'];
          this.todayDatySplit = this.Propdetails[0]['created_date'];
          this.onlyDateSplitted = this.todayDatySplit.split(' ');
          this.todayDateUI = this.onlyDateSplitted[0]
          this.furnishTypeList.forEach(item => {
            if (item.key == this.Furnished_Type_value) {
              this.FurnishedTypeLabel = item.label
            }
          });
          this.Plot_Dimension_value = this.Propdetails[0]['dimension'];
          this.Plot_Dimension_type_value = this.Propdetails[0]['dimensiontype'];
          this.Total_Floors_value = this.Propdetails[0]['total_floors'];
          this.Open_Sides_value = this.Propdetails[0]['No_Open_Sides'];
          this.Any_Construction_Done_value = this.Propdetails[0]['Any_Construction_Done'];
          this.Covered_Parking_value = this.Propdetails[0]['parking_covered'];
          this.Max_No_Of_Seats_value = this.Propdetails[0]['seats'];
          // this.Best_Suit_For_value = this.Propdetails[0][''];
          this.Floor_NO_value = this.Propdetails[0]['floor_number'];
          this.Floor_Allowed_value = this.Propdetails[0]['floor_allowed'];
          this.Property_Status_value = this.Propdetails[0]['status'];
          this.propertyStatusList.forEach(item => {
            if (item.key == this.Property_Status_value) {
              this.PropertyStatuslabel = item.label
            }
          });
          this.commercial = true;
          if (this.Property_Status_value == '1') {
            this.propertyStatus = 'Ready_To_Move'
            this.Possession_Date_value = '';
            this.FifthFormGroup.get('Possession_Date')?.reset();
          } else if (this.Property_Status_value == '2') {
            this.propertyStatus = 'Under_Construction'
            this.Age_Of_Property_value = '';
            this.FifthFormGroup.get('Age_of_Property')?.reset();
          }
          this.Corner_Plot_value = this.Propdetails[0]['Corner_plot'];
          this.Open_Parking_Count_value = this.Propdetails[0]['parking_open'];
          this.Parking_Count_value = this.Propdetails[0]['no_of_parking'];
          this.Is_Corner_Shop_value = this.Propdetails[0]['corner_shop_value'];
          this.Total_Cabin_Count_value = this.Propdetails[0]['cabins'];
          this.Total_Amount_value = this.Propdetails[0]['sale_amount'];
          this.Security_Deposit_value = this.Propdetails[0]['rent_deposit'];
          this.total_lease_amount_value = this.Propdetails[0]['lease_amount'];
          this.Negotiable_value = this.Propdetails[0]['negotiable'];
          this.Booking_Token_Amount_value = this.Propdetails[0]['sale_token'];
          this.RERA_Number_value = this.Propdetails[0]['rera_number'];
          this.Property_Customizable_value = this.Propdetails[0]['customizable'];
          this.Buitl_Up_Area_value = this.Propdetails[0]['built_up_area'];
          this.Buitl_Up_Area_type_value = this.Propdetails[0]['built_up_area_type'];
          this.Plot_Breadth_value = this.Propdetails[0]['plot_breadth'];
          this.Plot_Breadth_type_value = this.Propdetails[0]['Plot_Breadth_type'];
          this.IncludedInRentValueBackend = this.Propdetails[0]['included_in_rent'];
          // When loading backend
          // this.IncludedInRent_Value = '';
          if (this.IncludedInRentValueBackend == 1) {
            this.IncludedInRent_Value = true
          } else {
            this.IncludedInRent_Value = false
          }


          this.Rent_Per_Month_ForLease_value = this.Propdetails[0][''];
          if (this.Property_Type == 'Commercial' && this.property_for == 'rent' && (this.Commercial_Type == 'officeSpace' || this.Commercial_Type == 'shopShowroom' || this.Commercial_Type == 'warehouse')) {
            this.Age_Of_Property_Rent_value = this.Propdetails[0]['propertyage'];
            this.propertyAgeList.forEach(item => {
              if (item.key == this.Age_Of_Property_Rent_value) {
                this.AgeOfPropertyRentLabel = item.label
              }
            });
          }
          if (this.Property_Type == 'Commercial' && this.Commercial_Type == 'Plot') {
            this.Age_Of_Property_Rent_value = this.Propdetails[0]['propertyage'];
            this.propertyAgeList.forEach(item => {
              if (item.key == this.Age_Of_Property_Rent_value) {
                this.AgeOfPropertyRentLabel = item.label
              }
            });
          }
          if (this.Property_Status_value == '1' && this.Property_Available_value == '1') {
            this.Age_Of_Property_value = this.Propdetails[0]['propertyage'];
            this.propertyAgeList.forEach(item => {
              if (item.key == this.Age_Of_Property_value) {
                this.AgeOfPropertyLabel = item.label
              }
            });
          }
          if (this.Commercial_Type == 'Plot' && this.property_for == 'rent') {
            this.Security_Deposit_value = this.Propdetails[0]['rent_deposit'];
          }
          this.Super_Buitl_Up_Area_value = this.Propdetails[0]['built_up_area'];
          this.Super_Buitl_Up_Area_type_value = this.Propdetails[0]['built_up_area_type'];
          this.propertyDescription_value = this.Propdetails[0]['description'];
          this.Property_Facing_value = this.Propdetails[0]['Property_facing'];
          this.propertyFacingList.forEach(item => {
            if (item.key == this.Property_Facing_value) {
              this.PropertyFacingLabel = item.label
            }
          });
          this.Washroom_Counts_value = this.Propdetails[0]['washroom'];
          this.Private_Washroom_value = this.Propdetails[0]['washroom'];
          this.First_Name_value = this.Propdetails[0]['user_name'];
          this.Last_Name_value = this.Propdetails[0]['last_name'];
          this.Email_Address_value = this.Propdetails[0]['user_email'];
          this.Phone_Number_value = this.Propdetails[0][''];
          this.Only_Lease_value = this.Propdetails[0]['rent_lease'];
          if (this.Only_Lease_value == 1) {
            this.forlease = true
          }
          this.Only_Lease_Shop_value = this.Propdetails[0]['rent_lease'];
          if (this.Only_Lease_Shop_value == 1) {
            this.forlease = true
          }
          this.Rent_Per_Month_value = this.Propdetails[0]['rent_amount'];
          this.Rent_Per_Month_Shop_value = this.Propdetails[0]['rent_amount'];
          this.Maintenance_Amount_Plot_value = this.Propdetails[0]['Maintenace_charge'];
          this.MaintenanceCharges_Value = this.Propdetails[0]['Maintenace_charge'];
          this.CommercialAmenitiesvalue = this.Propdetails[0]['Amenities'];
          this.selectedAmenities = this.CommercialAmenitiesvalue.map(item => item.key);
          // 
          this.updateSelectedCommercialAmenityLabels()
          if (this.Commercial_Type == 'Plot') {
            // 
            this.plotfacilities = this.Propdetails[0]['Facilities'];
            this.FourthFormGroup.get('Plot_Facilities')?.setValue(this.plotfacilities.map(item => item.id))
          }
          if (this.Commercial_Type == 'officeSpace') {
            this.officefacilities = this.Propdetails[0]['Facilities'];
            this.FourthFormGroup.get('Office_Space_Facilities')?.setValue(this.officefacilities.map(item => item.id))
          }
          if (this.Commercial_Type == 'shopShowroom') {
            this.shopfacilities = this.Propdetails[0]['Facilities'];
            this.FourthFormGroup.get('Shop_Facilities')?.setValue(this.shopfacilities.map(item => item.id))
            // 
          }
          if (this.Commercial_Type == 'warehouse') {
            this.warehousefacilities = this.Propdetails[0]['Facilities'];
            this.FourthFormGroup.get('Warehouse_Facilities')?.setValue(this.warehousefacilities.map(item => item.id))
          }
          this.images = this.Propdetails[0]['images'];
          this.previewUrlsBackend = this.images;
          if (this.previewUrlsBackend && this.previewUrlsBackend.length > 0) {
            // Look for backend cover image
            const backendCover = this.previewUrlsBackend.find((img: any) => img.cover_img === "1");
            if (backendCover) {
              this.coverImageUrl = backendCover;
              this.photoForm.patchValue({ coverImage: backendCover });
            } else {
              // fallback to first only if backend didn’t mark any
              this.coverImageUrl = this.previewUrlsBackend[0];
              this.photoForm.patchValue({ coverImage: this.previewUrlsBackend[0] });
            }
          }
          // reset only once
          this.photoLabels = {};
          (this.Propdetails[0].images || []).forEach((img: any) => {
            // use image_name as key (since it's unique)
            this.photoLabels[img.image_name] = img.label_IDFK || '';
            if (img.facility_name) {
            } else {
            }
          });
          this.onChangeRegionRent();
          if (this.Property_Type == 'Commercial' && this.property_for == 'rent') {
            const backendDateRent = this.Propdetails[0]['available_from'];
            this.Avaliable_Date_Rent_value = backendDateRent.split('-').reverse().join('-');
          }
          if (this.Commercial_Type == 'Plot' && this.property_for == 'sale') {
            const backendDatesale = this.Propdetails[0]['available_from'];
            this.Available_From_value = backendDatesale.split('-').reverse().join('-');
          }
          if (this.propertyStatus == 'Under_Construction' && this.property_for == 'sale') {
            const backendDatePossession = this.Propdetails[0]['possession_date'];
            this.Possession_Date_value = backendDatePossession.split('-').reverse().join('-');
          }
        }
      })
    })
  }



  getlocationlistPg() {
    this.Service.getindividualcity().subscribe(city => {
      this.citiess = city['citys'];
      this.selectedLocation = this.citiess[0]['city'];
    });
    this.UserId = localStorage.getItem('userID');
    this.routeSub = this.activeroute.params.subscribe(params => {
      this.PropertyId = params['id'];
      this.TypeID = params['typeid'];
      this.Service.getPropDetailsPgById(this.UserId, this.PropertyId, this.TypeID).subscribe(response => {
        if (response['status'] === 'True') {
          this.filterLoader = false
          this.Propdetails = response['Propdetails'];
          this.Residential()
          this.Property_Type_value = 'Residential';
          this.Property_Available_value = this.Propdetails[0]['Available_for'];
          this.firstFormGroup.get('Property_Available').setValue(this.Property_Available_value)
          this.propertyAvailableList.forEach(item => {
            if (item.key == this.Property_Available_value) {
              this.PropertyAvailableLabel = item.label
            }
          });
          this.currentCity = this.Propdetails[0]['city_name'];
          this.locationSelectedId = this.Propdetails[0]['city_IDFK'];
          this.selectedLoc = this.Propdetails[0]['locality_name'];
          this.locality_id = this.Propdetails[0]['locality_IDFK'];
          if (this.locality_id != null) {
            this.propertyAutoRentLocalityName = this.selectedLoc
          }
          if (this.locality_id == null) {
            this.propertyAutoRentLocalityName = this.Propdetails[0]['locality_requested'];
          }

          this.forPG();
          this.PG_Name_value = this.Propdetails[0]['PG_Name'];
          this.PG_Address_value = this.Propdetails[0]['location'];
          this.PG_PinCode_value = this.Propdetails[0]['pinCode'];
          this.Listing_As_value = this.Propdetails[0]['listedby'];
          this.pgListingAsList.forEach(item => {
            if (item.key == this.Listing_As_value) {
              this.PgListingAsLabel = item.label
            }
          });
          this.Landmarks_value = this.Propdetails[0]['landmarks'];
          this.PG_Started_Year_value = this.Propdetails[0]['Pg_Operational'];
          this.pgStartedYearList.forEach(item => {
            if (item.key == this.PG_Started_Year_value) {
              this.PgStartedYearLabel = item.label
            }
          });
          this.Best_Suit_For_value = this.Propdetails[0]['Bestsuitedfor'];
          this.pgBestSuitForList.forEach(item => {
            if (item.key == this.Best_Suit_For_value) {
              this.BestSuitForLabel = item.label
            }
          });
          this.Food_Provided_value = this.Propdetails[0]['food_included'];
          if (this.Food_Provided_value == 1) {
            this.foodAvaliable = true;
          } else {
            this.foodAvaliable = false;
          }
          this.Notice_Period_value = this.Propdetails[0]['notice_period'];
          this.pgNoticePeriodList.forEach(item => {
            if (item.key == this.Notice_Period_value) {
              this.NoticePeriodlabel = item.label
            }
          });
          this.Tenants_Must_Return_By_value = this.Propdetails[0]['timeing'];
          this.pgTenantsReturnByList.forEach(item => {
            if (item.key == this.Tenants_Must_Return_By_value) {
              this.TenantsMustReturnByLabel = item.label
            }
          });
          this.Meal_Type_value = this.Propdetails[0]['veg_type'];
          this.pgMealTypeList.forEach(item => {
            if (item.key == this.Meal_Type_value) {
              this.MealTypeLabel = item.label
            }
          });
          this.Parking_Type_value = this.Propdetails[0]['Parking_Type'];
          this.Parking.forEach(item => {
            if (item.key == this.Parking_Type_value) {
              this.ParkingTypeLabel = item.label
            }
          });
          this.propertyDescription_value = this.Propdetails[0]['description'];
          this.First_Name_value = this.Propdetails[0]['user_name '];
          this.Last_Name_value = this.Propdetails[0]['last_name'];
          this.Email_Address_value = this.Propdetails[0]['user_email'];
          this.Phone_Number_value = this.Propdetails[0]['contact_number'];
          this.PG_Avaliable_for = this.Propdetails[0]['pg_type'];
          this.todayDatySplit = this.Propdetails[0]['created_date'];
          this.onlyDateSplitted = this.todayDatySplit.split(' ');
          this.todayDateUI = this.onlyDateSplitted[0]
          this.pgAvailableForList.forEach(item => {
            if (item.key == this.PG_Avaliable_for) {
              this.PGAvaliableForLabel = item.label
            }
          });
          this.Parking_Avaliable_value = this.Propdetails[0]['parking_IDPK'];
          if (this.Parking_Avaliable_value == 1) {
            this.parkingAvaliable = true;
          } else {
            this.parkingAvaliable = false;
          }
          this.PG_Food_Charges_value = this.Propdetails[0]['Food_charges'];

          this.pgFoodChargesList.forEach(item => {
            if (item.key == this.PG_Food_Charges_value) {
              this.PGFoodChargeslabel = item.label
            }
          });

          this.PGRulesvalue = this.Propdetails[0]['rules_id'];
          this.PG_Rules_value = this.PGRulesvalue.map(item => item.rules_IDFK);
          this.FourthFormGroup.get('PG_Rules')?.setValue(this.PG_Rules_value);
          this.pgRuleLabels = this.PG_Rules_value
            .map(key => {
              const matched = this.pgRulesList.find(rule => rule.key === key);
              return matched ? matched.label : null;
            })
          this.PGServicevalue = this.Propdetails[0]['service_id'];
          this.pgServices_value = this.PGServicevalue.map(item => item.services_IDFK);
          // 
          this.FifthFormGroup.get('pgServices')?.setValue(this.pgServices_value);



          this.pgServiceLabels = this.pgServices_value
            .map(key => {
              const matched = this.pgServiceList.find(service => service.key === key);
              return matched ? matched.label : null;
            })
          // 
          this.PGAmenitiesvalue = this.Propdetails[0]['amenities_id'];
          this.selectedAmenities = this.PGAmenitiesvalue.map(item => item.amenities_IDFK);
          this.updateSelectedPgAmenityLabels()
          // this.roomSummaryDataBackend = this.Propdetails[0]['room_categorysid'];
          // // 
          // this.submittedData = this.roomSummaryDataBackend.map(room => {
          //   const mappedRoom: Room = {
          //     type: room.room_category,
          //     label: this.getRoomLabelByValue(room.room_category),
          //     rent: room.rent_amount,
          //     deposit: room.security_deposit,
          //     roomCount: room.num_room,
          //     facilities: room.facility_ids || {}
          //   };
          //   // 
          //   return mappedRoom;
          // });
          // // 
          const facilities = {};
          this.pgFacilities = this.pgFacilitiesList.forEach(facility => {
            facilities[facility.key] = this.form.get(facility.key)?.value || false;
          });
          // ✅ now that facilities list is ready, build submittedData
          this.roomSummaryDataBackend = this.Propdetails[0]['room_categorysid'] || [];
          this.submittedData = this.roomSummaryDataBackend.map(room => {
            const allFacilityKeys = this.pgFacilitiesList.map(f => f.key);
            const mappedRoom: Room = {
              type: room.room_category || room.baseType,
              label: room.room_type || this.getRoomLabelByValue(room.room_category || room.baseType),
              rent: room.rent_amount || room.rent,
              deposit: room.security_deposit || room.deposit,
              roomCount: room.num_room ?? room.roomCount ?? '',
              facilities: this.FacilitiesBoolean(room.facility_ids || room.facilities),
            };
            if (!['1', '2', '3', '4'].includes(mappedRoom.type)) {
              const matched = this.roomOtherTypes.find(item => item.value === mappedRoom.type);
              if (matched && !this.usedOtherSharings.includes(matched.value)) {
                this.usedOtherSharings.push(matched.value);
              }
            }
            // 
            return mappedRoom;
          });
          // 
          // ✅ Keep order consistent
          this.getOrderedSubmittedData()
          this.updateDisabledRoomMap()
          this.updateRoomOtherTypesDisabled();
          this.updateUniqueSubmittedFacilities()
          this.PGFoodvalue = this.Propdetails[0]?.Meals_available || [];
          this.PG_Food_value = this.PGFoodvalue.map(item => item);
          this.FifthFormGroup.get('PG_Food')?.setValue(this.PG_Food_value);
          this.PG_Food_labels = this.PGFoodvalue
            .map(key => {
              const matched = this.pgFoodList.find(m => m.key === key);
              return matched ? matched.label : null;
            })
          // // 
          // this.coverImageBackend = this.Propdetails[0]['pg_coverimage'];
          // this.images = this.Propdetails[0]['images'];
          // this.previewUrlsBackend = this.images;
          // if (this.previewUrlsBackend && this.previewUrlsBackend.length > 0) {
          //   this.photoForm.patchValue({ coverImage: this.previewUrlsBackend[0] }); 
          // }
          // this.coverImageUrl = this.previewUrlsBackend[0];
          // this.Propdetails[0].images.forEach((img: any) => {
          //   (this.Propdetails[0].images || []).forEach((img: any) => {
          //     this.photoLabels[img.image_name] = '1'; 
          //   });
          //   if (img.facility_name) {
          //     // 
          //   }
          // });
          this.images = this.Propdetails[0]['images'];
          this.previewUrlsBackend = this.images;
          if (this.previewUrlsBackend && this.previewUrlsBackend.length > 0) {
            // Look for backend cover image
            const backendCover = this.previewUrlsBackend.find((img: any) => img.cover_img === "1");
            if (backendCover) {
              this.coverImageUrl = backendCover;
              this.photoForm.patchValue({ coverImage: backendCover });
            } else {
              // fallback to first only if backend didn’t mark any
              this.coverImageUrl = this.previewUrlsBackend[0];
              this.photoForm.patchValue({ coverImage: this.previewUrlsBackend[0] });
            }
          }
          // reset only once
          this.photoLabels = {};
          (this.Propdetails[0].images || []).forEach((img: any) => {
            // use image_name as key (since it's unique)
            this.photoLabels[img.image_name] = img.label_IDFK || '';
            if (img.facility_name) {
            } else {
            }
          });
          this.onChangeRegionRent();
          // this.updateRoomSummaryLabels()
        }
      })
    })
  }


}
