import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatChipSelectionChange } from '@angular/material/chips';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { DataService } from '../data.service';
declare var swal: any;

declare var $: any;
@Component({
  selector: 'app-rent-edit-property',
  templateUrl: './rent-edit-property.component.html',
  styleUrls: ['./rent-edit-property.component.css']
})
export class RentEditPropertyComponent implements OnInit {
  firstFormGroup: FormGroup;
  NewSubDetailsFormGroup: FormGroup;
  dropdownSettingsMobile = {};
  citiess: any;
  amount: any;
  selectedLocation: any;
  cityId: any;
  reviewcityname: string;
  regionList: any;
  localitys: any;
  locality: any;
  localityData = [];
  reviewlocalityname = [];
  myControl = new FormControl();
  options;
  filteredOptions: Observable<any>;
  bhklist: any;
  bathroomlist: any;
  balconylist: any;
  furnishlist: any;
  Tenantslist: any;
  Ownershiplist: any;
  Propertytypelist: any;
  Doorfacelist: any;
  // Amenitieslist: any;
  Amenitieslist: any[] = [];
  Approvalslist: any;
  // facilitieslist: any;
  facilitieslist: any[] = [];
  // nearbylist: any;
  nearbylist: any[] = []
  parkinglist: any;
  plottypelist: any;
  plotsizelist: any;
  submitted: boolean;
  searchstring: any;
  ShowPlotType: boolean = false;
  ApartmentForm: boolean = true;
  PlotFormGroup: FormGroup;
  ApartmentFormGroup: FormGroup;
  Apartmentsubmitted: boolean;
  NewSubDetailssubmitted: boolean;
  submittedPlot: boolean;
  parkingArray = [];
  reviewparkingArray = [];
  nearbyArray = [];
  reviewnearbyArray = [];
  facilitiesArray = [];
  reviewfacilitiesArray = [];
  approvalsArray = [];
  reviewapprovalsArray = [];
  amenitiesArray = [];
  reviewamenitiesarray = [];
  secondFormGroup: FormGroup;
  secondFormGroupPlot: FormGroup
  submitted2: boolean;
  approvalshow: boolean = true;
  ShowPropertyAge: boolean;
  ShowPossesiondate: boolean;
  propertylist: any;
  ShowOtherSize: boolean = false;
  private routeSub: Subscription;
  propid: any;
  selleditlist: any;
  sellproptype: any;
  sellpropname: any;
  sellownership: any;
  sellcity: any;
  selllocality = [];
  sellregion: any;
  sellbuildingtype: any;
  sellpurpose: string;
  sellpropstatus = '138564';
  sellpropageyear: any;
  sellpropbhk: any;
  sellpropbathroom: any;
  sellpropbalconie: any;
  sellproparea: any;
  sellareatype: any;
  sellpropfurnish: any;
  sellproptotalfloor: any;
  sellpropwhichfloor: any;
  sellcoverpark: any;
  sellopenpark: any;
  sellpropprice: any;
  sellpropwatersupply: any;
  sellproptitle: any;
  sellpropdoorface: any;
  sellpropbrokerage: any;
  sellpropmaintanencecharge: any;
  sellpropaddress: any;
  sellproppostalcode: any;
  sellpropossesion: any;
  sellpropamenities = [];
  sellpropamenitiesarry = [];
  sellpropagemonth: any;
  sellpropapprovals = [];
  sellpropfacilities = [];
  sellpropnearby = [];
  sellpropNeardesc: any;
  sellpropparking: any;
  parkingreviewdata: any;
  sellplottype: any;
  sellplotsize: any;
  sellplotage: any;
  sellpropdesc: any;
  sellpropamenitiesid = [];
  sellpropnearbyid = [];
  sellpropapprovalsid = [];
  sellpropfacilitiesid = [];
  sellpropyear: any;
  sellpropmonth: any;

  isLinear = true;
  secondFormGroup5: FormGroup;
  imageform: FormGroup;
  uploadResponse;

  urls: string[] = [];
  galleryimages: string[] = [];
  CoverImage = [];
  MasterPlanImage = [];
  FloorPlanImage = [];
  submittedImage = false;
  Imageurl: any;
  sellproptypereview: any;
  sellpropbhkreview: any;
  sellpropstatusreview = '138564';
  sellownershipreview: any;
  sellpropfurnishreview: any;
  sellbuildingtypereview: any;
  sellpropparkingreview: any;
  sellpropdoorfacereview: any;
  sellpropbalconiereview: any;
  ShowBrokerageCharge: boolean = false;

  ShowLessPhotos: boolean = true;
  showMorePhotos: boolean = false;
  MorePhotos: boolean = true;
  sellpropapprovalsreview = [];
  sellpropfacilitiesreview = [];
  sellpropnearbyreview = [];
  sellpropamenitiesreview = [];
  sellpropcoverimage: any;
  // masterImageUrl = this.Service.MasterPlan;
  // floorplanImageUrl = this.Service.FloorPlan;
  coverImageUrl = this.Service.RenImages + 'cover/';
  galleryImageUrl = this.Service.RenImages + 'gallery/';
  sellpropgalleryimages: any;
  sellpropmasterimage: any;
  sellpropfloorplan: any;
  newpossesiondate: string;
  reviewlocality: any;
  PropertyId: any;
  UserId: string;
  CoverImg: any;
  FloorplanImg: any;
  MasterImg: any;
  images = [];
  finalamenities = [];
  finalfacilities = [];
  finalapprovals: any;
  finalnearby = [];
  possesiondatenew: any;
  proprent: any;
  propdeposite: any;
  propavailabledate: any;
  proptenant: any;
  tenanttypereview: string;
  // newavailablendate: string;
  newavailablendate;

  sellpropbathroomreview: any;
  availabledate: any;
  showotherwatersupply: boolean = false;
  propbuilderid: any;
  proptypeid: string;

  myControlRentLocality = new FormControl();
  optionsRentLocality;
  filteredOptionsRentLocality: Observable<any>;
  propertyAutoRentLocalityName = '';
  areYouAOwner;
  areYouABroker;
  submitionLoader = false;
  dateCondition: any;
  localityID: any;

  constructor(private router: Router,
    public Service: DataService, private fb: FormBuilder, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getrentcitylist();
    this.getrentfilterdatalist();
    this.editrentproperty();

    this.UserId = localStorage.getItem('userID');
    this.routeSub = this.route.params.subscribe(params => {
      this.PropertyId = params['id'];
    });
    this.dropdownSettingsMobile = {
      singleSelection: true,
      idField: 'ID',
      textField: 'Name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: true,
      limitSelection: 1
    };

    // this.firstFormGroup = this.fb.group({
    //   persontype: ['', Validators.required],
    //   purposetype: ['', Validators.required],
    //   // PropertyAreaType: ['0'],
    //   city: ['', Validators.required],
    //   localities: ['', Validators.required],
    //   // Region: ['', Validators.required],
    //   PropType: ['', Validators.required],
    //   PropertyName: [''],
    //   // fulladdress: [''],
    //   // zip: [''],
    // });

    this.firstFormGroup = new FormGroup({
      persontype: new FormControl('', Validators.required),
      purposetype: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      localities: new FormControl('', Validators.required),
      PropType: new FormControl('', Validators.required),
      PropertyName: new FormControl('', Validators.required),
      PropertyAreaType: new FormControl('', Validators.required),
      fulladdress: new FormControl('', Validators.required),
      requestLocality: new FormControl(''),
      zip: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[0-9]{5,6}$/)
      ]),
    });



    // Plot form
    // this.PlotFormGroup = this.fb.group({
    //   PlotProperty: ['', Validators.required],
    //   PlotPropertySize: ['', Validators.required],
    //   OtherPlotPropertySize: ['',],
    //   // Plotsizetype: ['',],
    //   PlotAge: ['', Validators.required],
    //   propdescription: ['', Validators.required],
    //   plotArea: ['', Validators.required],
    //   plotAreaType: ['sq.feet', Validators.required],
    // });

    this.PlotFormGroup = new FormGroup({
      PlotProperty: new FormControl('', Validators.required),
      // PlotPropertySize: new FormControl('', Validators.required),
      PlotPropertySize: new FormControl('', [Validators.required, Validators.pattern(/^\d+\*\d+$/)]),
      OtherPlotPropertySize: new FormControl(''),
      PlotAge: new FormControl('', Validators.required),
      // propdescription: new FormControl('', Validators.required),
      plotArea: new FormControl('', Validators.required),
      plotAreaType: new FormControl('sq.feet', Validators.required),
      roadFacing: new FormControl('', Validators.required)
    });

    // apartment form
    // this.ApartmentFormGroup = this.fb.group({
    //   // PropStatus: ['',Validators.required],
    //   PropertyAgeyear: ['',],
    //   PropertyAgemonth: [''],
    //   possesiondate: ['',],
    //   Bedroom: ['', Validators.required],
    //   Bathroom: ['', Validators.required],
    //   Balconies: ['', Validators.required],
    //   DoorFacing: ['', Validators.required],
    //   FurnishingStatus: ['', Validators.required],

    //   sealableArea: ['', Validators.required],
    //   sealableAreaSize: ['sq.feet', Validators.required],
    //   // TotalFloor: ['', Validators.required],
    //   // WhichFloor: ['', Validators.required],
    //   // propdescription: ['', Validators.required]
    // });

    this.ApartmentFormGroup = new FormGroup({
      // PropertyAgeyear: new FormControl(''),
      // PropertyAgemonth: new FormControl(''),
      PropertyAgeyear: new FormControl('', Validators.required),
      PropertyAgemonth: new FormControl('', Validators.required),
      Bedroom: new FormControl('', Validators.required),
      Bathroom: new FormControl('', Validators.required),
      Balconies: new FormControl('', Validators.required),
      DoorFacing: new FormControl('', Validators.required),
      FurnishingStatus: new FormControl('', Validators.required),
      sealableArea: new FormControl('', Validators.required),
      sealableAreaSize: new FormControl('sq.feet', Validators.required)
    });




    // this.NewSubDetailsFormGroup = this.fb.group({
    //   Parking: [''],
    //   CoveredParking: ['0', Validators.required],
    //   OpenParking: ['', Validators.required],
    // });

    this.NewSubDetailsFormGroup = new FormGroup({
      Parking: new FormControl(''),
      CoveredParking: new FormControl('0', Validators.required),
      OpenParking: new FormControl('', Validators.required),
    });

    // this.secondFormGroup = this.fb.group({
    //   TotalFloor: ['', Validators.required],
    //   WhichFloor: ['', Validators.required],
    //   MonthlyRent: ['', Validators.required],
    //   MaintenanceCharges: [''],
    //   SecurityDeposite: ['', Validators.required],
    //   Brokerage: [''],
    //   BrokergePrice: ['0'],
    //   WaterSupply: [''],
    //   NearByLandmark: ['',],
    //   NearByLandmarkAddress: [''],
    //   TenantType: ['', Validators.required],
    //   AvailableFromdate: ['', Validators.required],
    //   propdescription: ['', Validators.required]
    // Parking: [''],
    // PropertyTitle: ['',Validators.required],
    // DoorFacing: ['', Validators.required],
    // Amenities: ['',],
    // CoveredParking: ['0', Validators.required],
    // OpenParking: ['', Validators.required],
    // Price: ['',Validators.required],
    // });
    this.secondFormGroupPlot = new FormGroup({
      MonthlyRent: new FormControl('', Validators.required),
      MaintenanceCharges: new FormControl(''),
      SecurityDeposite: new FormControl('', Validators.required),
      Brokerage: new FormControl(''),
      BrokergePrice: new FormControl('0'),
      WaterSupply: new FormControl(''),
      NearByLandmark: new FormControl(''),
      NearByLandmarkAddress: new FormControl(''),
      AvailableFromdate: new FormControl('', Validators.required),
      propdescription: new FormControl('', Validators.required)
    });
    this.secondFormGroup = new FormGroup({
      TotalFloor: new FormControl('', Validators.required),
      WhichFloor: new FormControl('', [Validators.required, this.whichFloorValidator()]),
      MonthlyRent: new FormControl('', Validators.required),
      MaintenanceCharges: new FormControl(''),
      SecurityDeposite: new FormControl('', Validators.required),
      Brokerage: new FormControl(''),
      BrokergePrice: new FormControl('0'),
      WaterSupply: new FormControl(''),
      NearByLandmark: new FormControl(''),
      NearByLandmarkAddress: new FormControl(''),
      TenantType: new FormControl('', Validators.required),
      AvailableFromdate: new FormControl('', Validators.required),
      propdescription: new FormControl('', Validators.required)
    });
    if (this.selleditlist && this.selleditlist.length > 0) {
      this.secondFormGroup.patchValue({
        TotalFloor: this.selleditlist[0]['Totalfloor'] || '0',
        WhichFloor: this.selleditlist[0]['Floor'] || '0'
      });

      setTimeout(() => {
        this.secondFormGroup.get('WhichFloor')?.updateValueAndValidity();
      });
    }

    // Reset WhichFloor only when user changes TotalFloor
    this.secondFormGroup.get('TotalFloor')?.valueChanges.subscribe((val) => {
      if (this.secondFormGroup.get('WhichFloor')?.value) {
        this.secondFormGroup.get('WhichFloor')?.reset(); // Clear
      }

      this.secondFormGroup.get('WhichFloor')?.updateValueAndValidity(); // Revalidate
    });

    // // Reset WhichFloor on TotalFloor change
    // this.secondFormGroup.get('TotalFloor').valueChanges.subscribe(totalFloor => {
    //   this.secondFormGroup.get('WhichFloor').reset();  // Clear WhichFloor
    //   this.secondFormGroup.get('WhichFloor').updateValueAndValidity(); // Revalidate
    // });

    this.secondFormGroup5 = new FormGroup({
      photos: new FormControl(),
      file: new FormControl(),
      coverImage: new FormControl()
    });

    // this.secondFormGroup5 = this.fb.group({
    //   photos: [''],
    //   file: [''],
    //   coverImage: [''],
    //   // cover: [''],
    // master: [''],
    // floorplan: [''],
    // gallery: [''],
    // fileSource: [''],
    // masterPlanImage: [''],
    // floorPlanImage: [''],
    // coverImage2: [''],
    // });


  }


 
  
  get f() {
    return this.firstFormGroup.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.firstFormGroup.invalid) {
      return;
    } else if (this.firstFormGroup.valid) {
      this.locality = this.firstFormGroup.value.localities;
      this.reviewlocality = this.firstFormGroup.value.localities;
    }
  }

  get P() {
    return this.PlotFormGroup.controls;
  }

  onSubmitPlot() {
    this.submittedPlot = true;
    if (this.PlotFormGroup.invalid) {
      return;
    } else if (this.PlotFormGroup.valid) {

    }
  }

  get A() {
    return this.ApartmentFormGroup.controls;
  }

  onSubmitApartment() {
    this.Apartmentsubmitted = true;
    if (this.ApartmentFormGroup.invalid) {
      return;
    } else if (this.ApartmentFormGroup.valid) {

    }
  }

  get N() {
    return this.NewSubDetailsFormGroup.controls;
  }

  onSubmitNewSubDetails() {
    this.NewSubDetailssubmitted = true;
    if (this.NewSubDetailsFormGroup.invalid) {
      return;
    } else if (this.NewSubDetailsFormGroup.valid) {
      // this.sellcoverpark = this.NewSubDetailsFormGroup.value.CoveredParking;
      // this.sellopenpark = this.NewSubDetailsFormGroup.value.OpenParking;
      // this.sellpropparking = this.NewSubDetailsFormGroup.value.Parking;
      // console.log(this.sellpropparking);
    }
  }

  get s() {
    return this.secondFormGroup.controls;
  }

  onSubmit2() {
    this.submitted2 = true;

    if (this.secondFormGroup.invalid) {
      Object.keys(this.secondFormGroup.controls).forEach(key => {
        const control = this.secondFormGroup.get(key);
        if (control?.invalid) {
          console.warn(`❌ ${key} →`, control.errors, '| Value:', control.value);
        }
      });

      return;
    } else if (this.secondFormGroup.valid) {
      this.availabledate = this.secondFormGroup.value.AvailableFromdate;
      // this.Dateconvert(this.availabledate);
    }
  }

  get sp() {
    return this.secondFormGroupPlot.controls;
  }

  onPlotSubmit2() {
    this.submitted2 = true;
    // console.log('1out')
    if (this.secondFormGroupPlot.invalid) {
      // console.log('if')


      Object.keys(this.secondFormGroupPlot.controls).forEach(key => {
        const control = this.secondFormGroupPlot.get(key);
        if (control?.invalid) {
          console.warn(`❌ ${key} →`, control.errors, '| Value:', control.value);
        }
      });


      return;
    } else if (this.secondFormGroupPlot.valid) {
      this.availabledate = this.secondFormGroup.value.AvailableFromdate;
      // this.Dateconvert(this.availabledate);
      // console.log('else')

    }
  }

  get s5() {
    return this.secondFormGroup5.controls;
  }

  onSubmitImage() {
    this.submittedImage = true;
    if (this.secondFormGroup5.invalid) {
      return;
    } else if (this.secondFormGroup5.valid) {
      // this.Imageurl = this.secondFormGroup5.value.coverImage;
    }
  }

  // image DropDown

  // removeImage(i) {
  //   this.urls.splice(i, 1);
  // }

  removeCoverImage(i) {
    this.CoverImage.splice(i, 1);
  }

  masterPlanImageImage(i) {
    this.MasterPlanImage.splice(i, 1);
  }

  FloorPlanImageImage(i) {
    this.FloorPlanImage.splice(i, 1);
  }

  // onCoverSelectFile(event) {
  //   if (event.target.files && event.target.files[0]) {
  //     var reader = new FileReader();
  //     reader.onload = (event: any) => {
  //       this.CoverImage = [];
  //       this.CoverImage.push(event.target.result);
  //     };
  //     reader.readAsDataURL(event.target.files[0]);
  //   }
  //   if (event.target.files.length > 0) {
  //     const file = event.target.files[0];
  //     this.secondFormGroup5.get('cover').setValue(file);
  //   }
  // }
  // COVER IMAGE (update only)
  onCoverSelectFile(event: any) {
    // if (event.target.files && event.target.files[0]) {
    //   const file = event.target.files[0];
    //   const reader = new FileReader();

    //   reader.onload = (e: any) => {
    //     this.CoverImage = [e.target.result];
    //   };

    //   reader.readAsDataURL(file);
    //   this.secondFormGroup5.get('coverImage')?.setValue(file); // don't use patchValue here
    // }

    const file = event.target.files?.[0];
    if (!file) return;

    const allowedTypes = ['image/png', 'image/jpg', 'image/webp', 'image/jpeg'];
    if (!allowedTypes.includes(file.type)) {
      // ;
      swal({
        icon: 'error',
        text: 'Invalid file type. Please upload PNG, WEBP, JPG, or JPEG.',
        showConfirmButton: false,
        timer: 1500
      });
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      // ;
      swal({
        icon: 'error',
        text: 'File too large. Maximum allowed size is 2MB.',
        showConfirmButton: false,
        timer: 1500
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.CoverImage = [e.target.result];
    };
    reader.readAsDataURL(file);
    this.secondFormGroup5.get('coverImage')?.setValue(file);
  }

  // onmasterPlanSelectFile(event) {
  //   if (event.target.files && event.target.files[0]) {
  //     var reader = new FileReader();
  //     reader.onload = (event: any) => {
  //       this.MasterPlanImage = [];
  //       this.MasterPlanImage.push(event.target.result);
  //     };
  //     reader.readAsDataURL(event.target.files[0]);
  //   }
  //   if (event.target.files.length > 0) {
  //     const file = event.target.files[0];
  //     this.secondFormGroup5.get('master').setValue(file);
  //   }
  // }

  // onFloorPlanSelectFile(event) {
  //   if (event.target.files && event.target.files[0]) {
  //     var reader = new FileReader();
  //     reader.onload = (event: any) => {
  //       this.FloorPlanImage = [];
  //       this.FloorPlanImage.push(event.target.result);
  //     };
  //     reader.readAsDataURL(event.target.files[0]);
  //   }
  //   if (event.target.files.length > 0) {
  //     const file = event.target.files[0];
  //     this.secondFormGroup5.get('floorplan').setValue(file);
  //     // console.log("Floorplan - ",file);
  //   }
  // }

  // onSelectFile(event) {
  //   // if (event.target.files && event.target.files[0]) {
  //   // var filesAmount = event.target.files.length;
  //   for (let i = 0; i < event.target.files.length; i++) {
  //     this.galleryimages.push(event.target.files[i]);
  //     var reader = new FileReader();
  //     reader.onload = (event: any) => {
  //       this.urls.push(event.target.result);
  //     };
  //     reader.readAsDataURL(event.target.files[i]);
  //   }
  //   // }
  // }

  coverImageToDelete = false;
  galleryChanged = false;

  // GALLERY IMAGE
  onSelectFile(event: any) {
    // for (let i = 0; i < event.target.files.length; i++) {
    //   const file = event.target.files[i];
    //   this.galleryimages.push(file);
    //   const reader = new FileReader();

    //   reader.onload = (e: any) => {
    //     this.urls.push(e.target.result);
    //   };

    //   reader.readAsDataURL(file);
    // }
    // this.galleryChanged = true; // ✅ Important: enable upload condition


    const allowedTypes = ['image/png', 'image/jpg', 'image/webp', 'image/jpeg'];

    for (let i = 0; i < event.target.files.length; i++) {
      const file = event.target.files[i];

      if (!allowedTypes.includes(file.type)) {
        // ;

        swal({
          icon: 'error',
          text: `Invalid file type: ${file.name}`,
          showConfirmButton: false,
          timer: 1500
        });
        continue;
      }

      if (file.size > 2 * 1024 * 1024) {
        // : ${file.name}`);
        swal({
          icon: 'error',
          text: `File too large (max 2MB): ${file.name}`,
          showConfirmButton: false,
          timer: 1500
        });
        continue;
      }

      this.galleryimages.push(file);

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.urls.push(e.target.result);
      };
      reader.readAsDataURL(file);
    }

    this.galleryChanged = true;
  }

  // onSelectFile2(event, index) {
  //   if (event.target.files && event.target.files[0]) {
  //     var filesAmount = event.target.files.length;
  //     for (let i = 0; i < filesAmount; i++) {
  //       var reader = new FileReader();

  //       reader.onload = (event: any) => {
  //         if (index > -1) {
  //           this.urls.splice(index, 1);
  //         }
  //         this.urls.push(event.target.result);
  //       };
  //       reader.readAsDataURL(event.target.files[index]);
  //     }
  //   }
  // }
  onSelectFile2(event: any, index: number) {
    // if (event.target.files && event.target.files[0]) {
    //   const file = event.target.files[0];
    //   const reader = new FileReader();

    //   reader.onload = (e: any) => {
    //     this.urls[index] = e.target.result;

    //     // If index exists, replace it, else insert
    //     if (index < this.galleryimages.length) {
    //       this.galleryimages[index] = file;
    //     } else {
    //       this.galleryimages.push(file);
    //     }
    //   };

    //   reader.readAsDataURL(file);
    // }



    const file = event.target.files?.[0];
    if (!file) return;

    const allowedTypes = ['image/png', 'image/jpg', 'image/webp', 'image/jpeg'];
    if (!allowedTypes.includes(file.type)) {
      // ;
      swal({
        icon: 'error',
        text: 'Invalid file type. Please upload PNG, WEBP, JPG, or JPEG.',
        showConfirmButton: false,
        timer: 1500
      });
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      // ;
      swal({
        icon: 'error',
        text: 'File too large. Maximum allowed size is 2MB.',
        showConfirmButton: false,
        timer: 1500
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.urls[index] = e.target.result;

      if (index < this.galleryimages.length) {
        this.galleryimages[index] = file;
      } else {
        this.galleryimages.push(file);
      }
    };
    reader.readAsDataURL(file);
  }
  removeImage(i: number) {
    this.galleryimages.splice(i, 1);
    this.urls.splice(i, 1);
    this.galleryChanged = true;
  }
  imagesToDelete: number[] = [];

  // =======================
  // Mark gallery image for later deletion
  markGalleryImageForRemoval(Id: any): void {
    this.images = this.images.filter(img => img.Id !== Id);
    this.imagesToDelete.push(Id);
  }

  onSubmit6() {
    const formData = new FormData();
    formData.append('cover', this.secondFormGroup5.get('cover').value);
    // formData.append('master', this.secondFormGroup5.get('master').value);
    // formData.append('floorplan', this.secondFormGroup5.get('floorplan').value);
    for (var i = 0; i < this.galleryimages.length; i++) {
      formData.append('file[]', this.galleryimages[i]);
    }
    // this.Service.uploadFile(formData).subscribe(
    //   (res) => {
    //     this.uploadResponse = res;
    //       console.log(res);
    //   },
    //   (err) => {
    //     console.log(err);
    //   }
    // );
  }

  // photoUpload() {
  //   if (this.secondFormGroup5.value.cover === '') {
  //   } else {
  //     const formData = new FormData();
  //     formData.append('cover', this.secondFormGroup5.get('cover').value);
  //     formData.append('Propid', this.PropertyId);
  //     formData.append('Userid', this.UserId);
  //     this.Service.updateRentCoverImage(formData).subscribe((res) => {
  //       this.uploadResponse = res;
  //     }, (err) => {
  //       console.log(err);
  //     });
  //   }
  //   // if(this.secondFormGroup5.value.master === ''){
  //   // }else{
  //   //   const formData = new FormData();
  //   //   formData.append('master', this.secondFormGroup5.get('master').value);
  //   //   formData.append('Propid',this.PropertyId);
  //   //   formData.append('Userid',this.UserId);
  //   //   this.Service.updateMasterPlanImage(formData).subscribe((res) => {
  //   //     this.uploadResponse = res;
  //   //     console.log(res);
  //   //   }, (err) => {
  //   //     console.log(err);
  //   //   });
  //   // }
  //   // if(this.secondFormGroup5.value.floorplan === ''){
  //   // }else{
  //   //   const formData = new FormData();
  //   //   formData.append('floorplan', this.secondFormGroup5.get('floorplan').value);
  //   //   formData.append('Propid',this.PropertyId);
  //   //   formData.append('Userid',this.UserId);
  //   //   this.Service.updateFloorplanPlanImage(formData).subscribe((res) => {
  //   //     this.uploadResponse = res;
  //   //     console.log(res);
  //   //   }, (err) => {
  //   //     console.log(err);
  //   //   });
  //   // }
  //   if (this.secondFormGroup5.value.file === '') {
  //   } else {
  //     const formData = new FormData();
  //     for (var i = 0; i < this.galleryimages.length; i++) {
  //       formData.append('file[]', this.galleryimages[i]);
  //     }
  //     formData.append('Propid', this.PropertyId);
  //     formData.append('Userid', this.UserId);
  //     this.Service.updateRentGalleryImage(formData).subscribe((res) => {
  //       this.uploadResponse = res;
  //       console.log(res);
  //     }, (err) => {
  //       console.log(err);
  //     });
  //   }

  //   /* const formData = new FormData();
  //    formData.append('cover', this.secondFormGroup5.get('cover').value);
  //    formData.append('master', this.secondFormGroup5.get('master').value);
  //    formData.append('floorplan', this.secondFormGroup5.get('floorplan').value);
  //    formData.append('PropID',this.PropertyId);
  //    for (var i = 0; i < this.galleryimages.length; i++) {
  //      formData.append("file[]", this.galleryimages[i]);
  //    }
  //    this.Service.uploadFile(formData).subscribe((res) => {
  //      this.uploadResponse = res;
  //      console.log(res);
  //    }, (err) => {
  //      console.log(err);
  //    });*/
  //   this.router.navigate(['/userauth/sellproperties/' + this.UserId]);
  // }
  // photoUpload2() {
  //   const coverControl = this.secondFormGroup5.get('cover');
  //   if (coverControl && coverControl.value !== '') {
  //     const formData = new FormData();
  //     formData.append('cover', coverControl.value);
  //     formData.append('Propid', this.PropertyId);
  //     formData.append('Userid', this.UserId);
  //     this.Service.updateRentCoverImage(formData).subscribe(
  //       (res) => this.uploadResponse = res,
  //       (err) => console.log(err)
  //     );
  //   }

  //   // master
  //   const masterControl = this.secondFormGroup5.get('master');
  //   if (masterControl && masterControl.value !== '') {
  //     const formData = new FormData();
  //     formData.append('master', masterControl.value);
  //     formData.append('Propid', this.PropertyId);
  //     formData.append('Userid', this.UserId);
  //     this.Service.updateMasterPlanImage(formData).subscribe(
  //       (res) => this.uploadResponse = res,
  //       (err) => console.log(err)
  //     );
  //   }

  //   // floorplan
  //   const floorplanControl = this.secondFormGroup5.get('floorplan');
  //   if (floorplanControl && floorplanControl.value !== '') {
  //     const formData = new FormData();
  //     formData.append('floorplan', floorplanControl.value);
  //     formData.append('Propid', this.PropertyId);
  //     formData.append('Userid', this.UserId);
  //     this.Service.updateFloorplanPlanImage(formData).subscribe(
  //       (res) => this.uploadResponse = res,
  //       (err) => console.log(err)
  //     );
  //   }

  //   // gallery file
  //   const fileControl = this.secondFormGroup5.get('file');
  //   if (fileControl && fileControl.value !== '') {
  //     const formData = new FormData();
  //     for (let i = 0; i < this.galleryimages.length; i++) {
  //       formData.append('file[]', this.galleryimages[i]);
  //     }
  //     formData.append('Propid', this.PropertyId);
  //     formData.append('Userid', this.UserId);
  //     this.Service.updateRentGalleryImage(formData).subscribe(
  //       (res) => {
  //         this.uploadResponse = res;
  //         // console.log(res);
  //       },
  //       (err) => console.log(err)
  //     );
  //   }

  //   this.router.navigate(['/userauth/sellproperties/' + this.UserId]);
  // }


  photoUpload() {
    // ✅ COVER IMAGE
    const coverControl = this.secondFormGroup5.get('coverImage');
    if (coverControl && coverControl.value) {
      const formData = new FormData();
      formData.append('cover', coverControl.value);
      formData.append('Propid', this.PropertyId);
      formData.append('Userid', this.UserId);

      this.Service.updateRentCoverImage(formData).subscribe(
        res => this.uploadResponse = res,
        err => console.error('Cover upload failed', err)
      );
    }


    // ✅ GALLERY IMAGE DELETE (only those user removed)
    const deleteRequests = this.imagesToDelete.map(id =>
      this.Service.deleteRentGalleryImageByImageId(id).toPromise()
    );

    // Perform deletions first, then upload gallery if needed
    Promise.all(deleteRequests).then(() => {
      this.imagesToDelete = []; // Clear tracked deletions

      if (this.galleryChanged && this.galleryimages.length > 0) {
        const formData = new FormData();
        this.galleryimages.forEach(file => {
          formData.append('file[]', file);
        });
        formData.append('Propid', this.PropertyId);
        formData.append('Userid', this.UserId);

        this.Service.updateRentGalleryImage(formData).subscribe(
          res => {
            console.log('Gallery uploaded', res);
            // this.router.navigate(['/userauth/sellproperties/' + this.UserId]);
            window.location.href = '/userauth/sellproperties/' + this.UserId;

          },
          err => console.error('Gallery upload failed', err)
        );
      } else {
        // No new gallery uploads
        // this.router.navigate(['/userauth/sellproperties/' + this.UserId]);
        window.location.href = '/userauth/sellproperties/' + this.UserId;

      }
    }).catch(err => {
      console.error('One or more gallery deletions failed', err);
      // this.router.navigate(['/userauth/sellproperties/' + this.UserId]);
      window.location.href = '/userauth/sellproperties/' + this.UserId;

    });
  }

  // masterPlanImageDeleate() {
  //   this.Service.deleteMasterPlanImgByUseIdAndPropId(this.PropertyId, this.UserId).subscribe(response=>{
  //     console.log(response);
  //     this.editsellproperty();
  //   });
  //   }

  //   FloorPlanImageDelete() {
  //     this.Service.deleteFloorPlanImgByUseIdAndPropId(this.PropertyId, this.UserId).subscribe(response=>{
  //       console.log(response);
  //       this.editsellproperty();
  //     });
  //   }

  deleteGalleryImageById(Id: any) {
    this.Service.deleteRentGalleryImageByImageId(Id).subscribe(response => {
      // this.editrentproperty();
    });
  }

  //new  image DropDown Ends

  onReadyToMoveInClick(data) {
    if (data === '138564') {
      this.sellpropstatusreview = 'Ready to move in';
    }
    this.ShowPropertyAge = true;
    this.ShowPossesiondate = false;
  }

  onUnderConstructionClick(data) {
    if (data === '138565') {
      this.sellpropstatusreview = 'Under construction';
    }
    this.ShowPropertyAge = false;
    this.ShowPossesiondate = true;
  }

  Othersize() {
    this.ShowOtherSize = true;
  }

  Onplotsize() {
    this.ShowOtherSize = false;
  }

  // city select
  getrentcitylist() {
    this.Service.getRentcity().subscribe(city => {
      this.citiess = city['citys'];
      this.selectedLocation = this.citiess[0]['city'];
    });

  }

  selectionChange(event) {
    this.propertyAutoRentLocalityName = '';
    // const cityName = event.value;
    this.cityId = event.value;
    // localStorage.setItem('CityName', cityName);
    if (this.cityId === '1') {
      this.reviewcityname = 'Bangalore';
    } else if (this.cityId === '2') {
      this.reviewcityname = 'Hyderabad';
    } else if (this.cityId === '3') {
      this.reviewcityname = 'Chennai';
    } else if (this.cityId === '4') {
      this.reviewcityname = 'Kochi';
    } else if (this.cityId === '5') {
      this.reviewcityname = 'Pune';
    } else if (this.cityId === '6') {
      this.reviewcityname = 'Delhi';
    } else if (this.cityId === '7') {
      this.reviewcityname = 'Kolkata';
    } else if (this.cityId === '8') {
      this.reviewcityname = 'Mumbai';
    } else if (this.cityId === '9') {
      this.reviewcityname = 'Amaravati';
    }
    this.onChangeRegion();
  }

  /*getclickAuto(cityId) {
    this.Service.getRentRegionList(cityId).subscribe(localitys => {
      this.regionList = localitys['Zones'];
    });*/

  // get property details based on city

  //   this.Service.getpropertyonCity(cityId).subscribe(properties => {
  //     this.apioptions(properties['autolist']);
  // });
  // }

  onChangeRegion() {
    const regionid = '';
    this.Service.getRentlocality(this.cityId, regionid).subscribe(localitys => {
      this.localitys = localitys['details'];
      this.apioptionsRentLocality(localitys['details']);
    });
  }

  // apioptionsRentLocality(apivalue) {
  //   this.optionsRentLocality = apivalue;
  //   this.filteredOptionsRentLocality = this.myControlRentLocality.valueChanges.pipe(
  //     startWith(''),
  //     map(value => value.length >= 1 ? this._filterRentLocality(value) : [])
  //   );
  // }

  private _filterRentLocality(value: string) {
    const filterValue = value.toLowerCase();
    return this.optionsRentLocality.filter(option => option.Name.toLowerCase().includes(filterValue));
  }

  onLocalitySelect(eve) {
    this.localityData.push(eve.ID);
    this.locality = this.localityData['0'];
    this.reviewlocality = eve.Name;

    // this.selllocality.push(eve.Name)
  }

  onLocalityDeSelect(event) {
    var index = this.localitys.indexOf(event);
    this.localityData.splice(index, 1);
  }

  onItemSelect(selected) {
    var currentCity = selected.city;
    this.sellpropname = selected.name;
  }

  onItemSelectRent(selected) {
    this.propertyAutoRentLocalityName = selected.Name;
    this.reviewlocalityname = selected.Name;
    this.localityID = selected.ID;
  }

  apioptions(apivalue) {
    this.options = apivalue;
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => value.length >= 1 ? this._filter(value) : [])
      );
  }

  private _filter(value: string) {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  propertyclick(type) {
    this.sellproptypereview = type;
    if (type === 'Plot') {
      this.ShowPlotType = true;
      this.ApartmentForm = false;
      this.proptypeid = '3';
    } else {
      this.ShowPlotType = false;
      this.ApartmentForm = true;
    }
    if (type === 'Apartment') {
      this.proptypeid = '1';
    }
    if (type === 'Villas') {
      this.proptypeid = '2';
    }

    this.Service.getrentpropertyonCity(this.cityId, this.proptypeid).subscribe(properties => {
      this.apioptions(properties['autolist']);
    });
  }

  getrentfilterdatalist() {
    this.Service.getrentfilterslist().subscribe(list => {
      this.bhklist = list['Bhks'];
      this.balconylist = list['Balcony'];
      this.bathroomlist = list['Bathroom'];
      this.furnishlist = list['Furnish'];
      this.Tenantslist = list['Tenants'];
      this.Ownershiplist = list['Ownership'];
      this.Propertytypelist = list['Propertytype'];
      this.Doorfacelist = list['Doorface'];
      this.Approvalslist = list['Approvals'];
      this.Amenitieslist = list['Amenities'];
      this.facilitieslist = list['Facilities'];
      this.nearbylist = list['Nearby'];
      this.parkinglist = list['Parking'];
      this.plottypelist = list['PlotType'];
      this.plotsizelist = list['PlotSize'];

      // Amenitieslist
      for (var i = 0; i < this.Amenitieslist.length; i++) {
        this.Amenitieslist[i].selected = false;
      }


      for (var i = 0; i < this.sellpropamenities.length; i++) {
        this.sellpropamenities[i].selected = true;
        // console.log(this.sellpropamenities)
      }
      const final = this.Amenitieslist.filter(ar => !this.sellpropamenities.find(rm => (rm.id === ar.id)));
      this.finalamenities = final.concat(this.sellpropamenities);
      // ===========================
      //         const allSelected = this.finalamenities.every(option => option.selected);
      // this.finalamenities.forEach(option => {
      //   option.selected = !allSelected;
      // });

      //  facilitities
      for (var i = 0; i < this.facilitieslist.length; i++) {
        this.facilitieslist[i].selected = false;
      }
      for (var i = 0; i < this.sellpropfacilities.length; i++) {
        this.sellpropfacilities[i].selected = true;
      }
      const final2 = this.facilitieslist.filter(ar => !this.sellpropfacilities.find(rm => (rm.id === ar.id)));
      this.finalfacilities = final2.concat(this.sellpropfacilities);
    });
  }

  finalAminitiesArray = [];


  // changeSelectedamenities($event: MatChipSelectionChange, option: any) {
  //   if ($event.selected) {
  //     // Avoid duplicates before push
  //     if (!this.sellpropamenities.find(temp => temp.id === option.id)) {
  //       this.sellpropamenities.push(option);
  //       this.sellpropamenitiesid.push(option.id);
  //       this.sellpropamenitiesreview.push(option.amenities);
  //       this.reviewamenitiesarray.push(option.amenities);
  //       this.amenitiesArray.push(option.id);
  //     } else {
  //       // ;
  //     }
  //   } else {
  //     // Remove from arrays on deselect
  //     this.sellpropamenities = this.sellpropamenities.filter(temp => temp.id !== option.id);
  //     this.sellpropamenitiesid = this.sellpropamenitiesid.filter(id => id !== option.id);
  //     this.sellpropamenitiesreview = this.sellpropamenitiesreview.filter(amenity => amenity !== option.amenities);
  //     this.reviewamenitiesarray = this.reviewamenitiesarray.filter(amenity => amenity !== option.amenities);
  //     this.amenitiesArray = this.amenitiesArray.filter(id => id !== option.id);
  //   }

  //   // Ensure uniqueness
  //   this.finalAminitiesArray = [...new Set(this.sellpropamenitiesid)];
  // }

  changeSelectedamenities(option: any): void {
    const isSelected = this.sellpropamenitiesid.includes(option.id);

    if (!isSelected) {
      this.sellpropamenities.push(option);
      this.sellpropamenitiesid.push(option.id);
      this.sellpropamenitiesreview.push(option.amenities);
      this.reviewamenitiesarray.push(option.amenities);
      this.amenitiesArray.push(option.id);
    } else {
      this.sellpropamenities = this.sellpropamenities.filter(item => item.id !== option.id);
      this.sellpropamenitiesid = this.sellpropamenitiesid.filter(id => id !== option.id);
      this.sellpropamenitiesreview = this.sellpropamenitiesreview.filter(name => name !== option.amenities);
      this.reviewamenitiesarray = this.reviewamenitiesarray.filter(name => name !== option.amenities);
      this.amenitiesArray = this.amenitiesArray.filter(id => id !== option.id);
    }

    this.finalAminitiesArray = [...new Set(this.sellpropamenitiesid)];
    // console.log(this.finalAminitiesArray)
    // console.log(this.sellpropamenitiesreview)
  }


  selectable = true;
  removable = true;

  remove(fruit: string): void {
    const index = this.sellpropamenities.indexOf(fruit);
    this.sellpropamenities.splice(index, 1);
  }

  removeapproval(fruit: string): void {
    const index = this.sellpropapprovals.indexOf(fruit);
    this.sellpropapprovals.splice(index, 1);
  }

  removefacilities(fruit: string): void {
    const index = this.sellpropfacilities.indexOf(fruit);
    this.sellpropfacilities.splice(index, 1);
  }

  removenearby(fruit: string): void {
    const index = this.sellpropnearby.indexOf(fruit);
    this.sellpropnearby.splice(index, 1);
  }

  /*  toggleSelectionapproval(chip: MatChip, option) {
      chip.toggleSelected();
    }
  
    changeSelectedapproval($event: MatChipSelectionChange, option) {
      if (this.sellpropapprovals.find(temp => temp.id === option.id)) {
        //  
      } else {
        this.sellpropapprovals.push(option);
        this.sellpropapprovalsid.push(option.id);
        this.sellpropapprovalsreview.push(option.approvals);
      }
      // console.log($event.selected);
      if ($event.selected === true) {
        this.reviewapprovalsArray.push(option.approvals);
        this.approvalsArray.push(option.id);
      } else if ($event.selected === false) {
        for (var i = 0; i < this.approvalsArray.length; i++) {
          if (this.approvalsArray[i] === option.id) {
            this.approvalsArray.splice(i, 1);
          }
        }
      }
      //  this.GetRentalList();
    }*/

  // toggleSelectionfacilities(chip: MatChip, option) {
  //   chip.toggleSelected();
  // }

  // finalFacilitiesArray = [];
  // changeSelectedfacilities($event: MatChipSelectionChange, option) {
  //   if (this.sellpropfacilities.find(temp => temp.id === option.id)) {
  //     // 
  //   } else {
  //     this.sellpropfacilities.push(option);
  //     this.sellpropfacilitiesid.push(option.id);
  //     this.sellpropfacilitiesreview.push(option.facilities);
  //   }
  //   // console.log($event.selected);
  //   if ($event.selected === true) {
  //     this.reviewfacilitiesArray.push(option.facilities);
  //     this.facilitiesArray.push(option.id);
  //   } else if ($event.selected === false) {
  //     for (var i = 0; i < this.facilitiesArray.length; i++) {
  //       if (this.facilitiesArray[i] === option.id) {
  //         this.facilitiesArray.splice(i, 1);
  //       }
  //     }
  //   }
  //   this.finalFacilitiesArray = this.sellpropfacilitiesid.filter((c, index) => {
  //     return this.sellpropfacilitiesid.indexOf(c) === index;
  //   });
  //   //  this.GetRentalList();
  // }

  // finalFacilitiesArray = [];

  // changeSelectedfacilities($event: MatChipSelectionChange, option: any) {
  //   if ($event.selected) {
  //     // Add only if not already added
  //     if (!this.sellpropfacilities.find(temp => temp.id === option.id)) {
  //       this.sellpropfacilities.push(option);
  //       this.sellpropfacilitiesid.push(option.id);
  //       this.sellpropfacilitiesreview.push(option.facilities);
  //       this.reviewfacilitiesArray.push(option.facilities);
  //       this.facilitiesArray.push(option.id);
  //     }
  //   } else {
  //     // Remove from all arrays
  //     this.sellpropfacilities = this.sellpropfacilities.filter(temp => temp.id !== option.id);
  //     this.sellpropfacilitiesid = this.sellpropfacilitiesid.filter(id => id !== option.id);
  //     this.sellpropfacilitiesreview = this.sellpropfacilitiesreview.filter(fac => fac !== option.facilities);
  //     this.reviewfacilitiesArray = this.reviewfacilitiesArray.filter(fac => fac !== option.facilities);
  //     this.facilitiesArray = this.facilitiesArray.filter(id => id !== option.id);
  //   }

  //   // Ensure unique values
  //   this.finalFacilitiesArray = [...new Set(this.sellpropfacilitiesid)];
  // }




  // toggleSelectionnearby(chip: MatChip, option) {
  //   chip.toggleSelected();
  // }

  finalFacilitiesArray = [];
  changeSelectedfacilities(option: any): void {
    const isSelected = this.sellpropfacilitiesid.includes(option.id);

    if (!isSelected) {
      this.sellpropfacilities.push(option);
      this.sellpropfacilitiesid.push(option.id);
      this.sellpropfacilitiesreview.push(option.facilities);
      this.reviewfacilitiesArray.push(option.facilities);
      this.facilitiesArray.push(option.id);
    } else {
      this.sellpropfacilities = this.sellpropfacilities.filter(temp => temp.id !== option.id);
      this.sellpropfacilitiesid = this.sellpropfacilitiesid.filter(id => id !== option.id);
      this.sellpropfacilitiesreview = this.sellpropfacilitiesreview.filter(fac => fac !== option.facilities);
      this.reviewfacilitiesArray = this.reviewfacilitiesArray.filter(fac => fac !== option.facilities);
      this.facilitiesArray = this.facilitiesArray.filter(id => id !== option.id);
    }

    this.finalFacilitiesArray = [...new Set(this.sellpropfacilitiesid)];
  }
  finalnoOfNearbyArray = [];
  changeSelectednearby($event: MatChipSelectionChange, option) {
    if (this.sellpropnearby.find(temp => temp.id === option.id)) {
      // 
    } else {
      this.sellpropnearby.push(option);
      this.sellpropnearbyid.push(option.id);
      this.sellpropnearbyreview.push(option.nearby);
    }
    // console.log($event.selected);
    if ($event.selected === true) {
      this.reviewnearbyArray.push(option.nearby);
      this.nearbyArray.push(option.id);
    } else if ($event.selected === false) {
      for (var i = 0; i < this.nearbyArray.length; i++) {
        if (this.nearbyArray[i] === option.id) {
          this.nearbyArray.splice(i, 1);
        }
      }
    }
    this.finalnoOfNearbyArray = this.sellpropnearbyid.filter((c, index) => {
      return this.sellpropnearbyid.indexOf(c) === index;
    });
    //  this.GetRentalList();
  }


  //   getreview data
  bhkreview: any;
  balconiereview: any;
  bathroomreview: any;
  furnishreview: any;
  doorfacereview: any;
  plottypereview: any;
  plotsizereview: any;

  getbhkreviewdata(data) {
    this.sellpropbhkreview = data;
  }

  getbathreviewdata(data) {
    this.sellpropbathroomreview = data;
  }

  getbalconiereviewdata(data) {
    this.sellpropbalconiereview = data;
  }

  getfurnishreviewdata(data) {
    this.sellpropfurnishreview = data;
  }

  getfacingreviewdata(data) {
    this.sellpropdoorfacereview = data;
  }

  getplottypereview(data) {
    this.plottypereview = data;
    if (this.plottypereview === 'Independent Plot') {
      this.approvalshow = false;
    } else {
      this.approvalshow = true;
    }
  }

  getplotsizereview(data) {
    this.plotsizereview = data;
  }

  getparkingreviewdata(data) {
    this.sellpropparkingreview = data;
    // 
  }

  onOwnerClick(data) {
    if (data === '654825') {
      this.sellownershipreview = 'Owner';
    }
    this.ShowBrokerageCharge = false;
  }

  onBrokerClick(data) {
    if (data === '654826') {
      this.sellownershipreview = 'Broker';
    }
    this.ShowBrokerageCharge = true;
  }

  getbuildingreviewdata(data) {
    if (data === '14960') {
      this.sellbuildingtypereview = 'Residential';
    } else if (data === '14960') {
      this.sellbuildingtypereview = 'Commercial';
    }
  }

  gettenantreview(data) {
    if (data === '1') {
      this.tenanttypereview = 'Bachelor';
    } else if (data === '2') {
      this.tenanttypereview = 'Family';
    } else if (data === '3') {
      this.tenanttypereview = 'Bachelor/Family';
    }
  }

  otherwatersupply() {
    this.showotherwatersupply = true;
  }

  ShowMorePhotos() {
    this.ShowLessPhotos = false;
    this.showMorePhotos = true;
    this.MorePhotos = false;
  }

  // Dateconvert(date) {
  //   var dateObj = date;
  //   var month = dateObj.getUTCMonth() + 1;
  //   var day = dateObj.getUTCDate() + 1;
  //   var year = dateObj.getUTCFullYear();
  //   const newdate = year + '/' + month + '/' + day;
  //   this.newavailablendate = newdate;
  //   // 
  // }
  // Dateconvert(date: Date | string) {
  //   const dateObj = new Date(date); // support both Date or string input

  //   const year = dateObj.getFullYear();         // Local time
  //   const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // 0-indexed
  //   const day = String(dateObj.getDate()).padStart(2, '0');        // Correct day

  //   this.newavailablendate = `${year}/${month}/${day}`;
  // }
  Dateconvert(date: Date) {
    const dateObj = new Date(date); // just to be safe

    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // months are 0-based
    const day = String(dateObj.getDate()).padStart(2, '0'); // use getDate(), NOT getUTCDate()

    this.newavailablendate = `${year}/${month}/${day}`;
  }

  editrentproperty() {
    const userid = localStorage.getItem('userID');
    this.routeSub = this.route.params.subscribe(params => {
      this.propid = params['id'];
      var param = {
        userid: userid,
        propid: this.propid
      };
      this.Service.editRentproperty(param).subscribe(response => {
        this.selleditlist = response['Propdetails'];
        this.sellproptype = this.selleditlist['0']['TypeID'];
        this.sellproptypereview = this.selleditlist['0']['Type'];
        this.sellpropname = this.selleditlist['0']['Propertyname'];
        this.sellownership = this.selleditlist['0']['OwnershipID'];

        this.sellownershipreview = this.selleditlist['0']['Ownership'];
        if (this.sellownershipreview === 'Agent' || this.sellownershipreview === 'Broker') {
          this.ShowBrokerageCharge = true;
        } else {
          this.ShowBrokerageCharge = false;
        }

        this.sellcity = this.selleditlist['0']['CityID'];
        this.reviewcityname = this.selleditlist['0']['City'];


        // this.reviewlocality = this.selleditlist['0']['Locality'];
        // this.propertyAutoRentLocalityName = this.selleditlist['0']['Locality'];
        // this.locality = this.selleditlist['0']['LocalityID'];


        // this.requested_locality = this.selleditlist[0]['requested_locality'];






        this.reviewlocality = this.selleditlist['0']['Locality'];

        this.requested_locality = this.selleditlist[0]['requested_locality'];
        if (this.requested_locality) {
          // console.log(this.requested_locality, - this.addNewLocality)
          this.addNewLocality = false;
          // console.log(this.requested_locality, - this.addNewLocality)
        }
        this.propertyAutoRentLocalityName = this.requested_locality || this.selleditlist[0]['Locality'] || '';
        this.myControlRentLocality.setValue(this.propertyAutoRentLocalityName);

        if (this.requested_locality) {
          // console.log(this.requested_locality, - this.addNewLocality)
          this.addNewLocality = true;
          // console.log(this.requested_locality, - this.addNewLocality)
        } else if (!this.propertyAutoRentLocalityName) {
          // console.log(!this.propertyAutoRentLocalityName, - this.addNewLocality)
          this.addNewLocality = true;
          // console.log(!this.propertyAutoRentLocalityName, - this.addNewLocality)
        } else {

          const exists = this.optionsRentLocality?.some(
            loc => loc.Name?.toLowerCase() === this.propertyAutoRentLocalityName.toLowerCase()
          );
          this.addNewLocality = !exists;
          this.requested_locality = !exists ? this.propertyAutoRentLocalityName : '';
          // console.log(this.requested_locality, - this.addNewLocality)
          // console.log(!this.propertyAutoRentLocalityName, - this.addNewLocality)
        }

        // Set value into form
        this.firstFormGroup.get('localities')?.setValue(this.propertyAutoRentLocalityName);













        this.sellregion = this.selleditlist['0']['RegionNameID'];
        this.sellbuildingtype = this.selleditlist['0']['BuildingtypeID'];
        this.sellbuildingtypereview = this.selleditlist['0']['Buildingtype'];
        // this.sellpropstatus = NULL;
        this.sellpropstatusreview = this.selleditlist['0']['Status'];
        this.sellpropyear = this.selleditlist['0']['PropertyageYear'];
        if (this.sellpropyear === null) {
          this.sellpropyear = '0';
        } else {
          this.sellpropyear = this.selleditlist[0]['PropertyageYear'];
        }
        this.sellpropmonth = this.selleditlist['0']['PropertyageMonth'];
        if (this.sellpropmonth === null) {
          this.sellpropmonth = '0';
        } else {
          this.sellpropmonth = this.selleditlist[0]['PropertyageMonth'];
        }
        this.sellpropbhk = this.selleditlist['0']['BHKID'];
        this.sellpropbhkreview = this.selleditlist['0']['BHK'];
        this.sellpropbathroom = this.selleditlist['0']['BathroomID'];
        this.sellpropbathroomreview = this.selleditlist['0']['Bathroom'];
        this.sellpropbalconie = this.selleditlist['0']['BalconyID'];
        if (this.sellpropbalconie === null) {
          this.sellpropbalconie = '0';
        } else {
          this.sellpropbalconie = this.selleditlist[0]['BalconyID'];
        }
        this.sellpropbalconiereview = this.selleditlist['0']['Balcony'];
        this.sellproparea = this.selleditlist['0']['Area'];
        this.sellareatype = this.selleditlist['0']['Areatype'];
        this.sellpropfurnish = this.selleditlist['0']['FurnishID'];
        this.sellpropfurnishreview = this.selleditlist['0']['Furnish'];
        this.sellproptotalfloor = this.selleditlist['0']['Totalfloor'];
        if (this.sellproptotalfloor === null) {
          this.sellproptotalfloor = '0';
        } else {
          this.sellproptotalfloor = this.selleditlist[0]['Totalfloor'];
        }
        this.sellpropwhichfloor = this.selleditlist['0']['Floor'];
        if (this.sellpropwhichfloor === null) {
          this.sellpropwhichfloor = '0';
        } else {
          this.sellpropwhichfloor = this.selleditlist[0]['Floor'];
        }
        this.sellcoverpark = this.selleditlist['0']['Coveredparking'];
        if (this.sellcoverpark === null) {
          this.sellcoverpark = '0';
        } else {
          this.sellcoverpark = this.selleditlist['0']['Coveredparking'];
        }
        this.sellopenpark = this.selleditlist['0']['Openparking'];
        if (this.sellopenpark === null) {
          this.sellopenpark = '0';
        } else {
          this.sellopenpark = this.selleditlist['0']['Openparking'];
        }
        this.sellpropprice = this.selleditlist['0']['Price'];
        this.sellpropwatersupply = this.selleditlist['0']['Watersupply'];
        this.sellproptitle = this.selleditlist['0']['Khata'];
        this.sellpropdoorface = this.selleditlist['0']['doorfaceID'];
        this.sellpropdoorfacereview = this.selleditlist['0']['doorface'];
        this.sellpropbrokerage = this.selleditlist['0']['Brokerage'];
        if (this.sellpropbrokerage === null) {
          this.sellpropbrokerage = '0';
        } else {
          this.sellpropbrokerage = this.selleditlist[0]['Brokerage'];
        }
        this.sellpropmaintanencecharge = this.selleditlist['0']['Maintanencecharge'];
        if (this.sellpropmaintanencecharge === null) {
          this.sellpropmaintanencecharge = '0';
        } else {
          this.sellpropmaintanencecharge = this.selleditlist[0]['Maintanencecharge'];
        }
        this.sellpropaddress = this.selleditlist['0']['Address'];
        this.sellproppostalcode = this.selleditlist['0']['Zipcode'];
        //  this.sellpropossesion = this.selleditlist['0']['Possession'];
        this.sellpurpose = '2';
        this.sellpropamenities = this.selleditlist['0']['Amenities'];
        //  this.sellpropapprovals = this.selleditlist['0']['Approvals'];
        this.sellpropfacilities = this.selleditlist['0']['Facilities'];
        this.sellpropnearby = this.selleditlist['0']['Nearby'];
        this.sellpropNeardesc = this.selleditlist['0']['Neardescription'];
        this.sellpropparking = this.selleditlist['0']['ParkingID'];
        this.sellpropparkingreview = this.selleditlist['0']['Parking'];
        this.sellplottype = this.selleditlist['0']['PlottypeID'];
        this.sellplotsize = this.selleditlist['0']['PlotsizeID'];
        if (this.sellplotsize !== "30*40" && this.sellplotsize !== "30*50" && this.sellplotsize !== "30*60" && this.sellplotsize !== "60*90") {
          // )
          this.ShowOtherSize = true

        }
        this.plottypereview = this.selleditlist['0']['Type'];
        this.plotsizereview = this.selleditlist['0']['Plosize'];
        this.sellplotage = this.selleditlist['0']['Plotage'];
        this.sellpropdesc = this.selleditlist['0']['description'];
        this.CoverImg = this.selleditlist['0']['Coverimage'];
        //  this.FloorplanImg = this.selleditlist['0']['Floorplan'];
        //  this.MasterImg = this.selleditlist['0']['Masterimage'];
        this.images = this.selleditlist['0']['images'];

        this.proprent = this.selleditlist['0']['Rent'];
        if (this.proprent === null) {
          this.proprent = '0';
        } else {
          this.proprent = this.selleditlist[0]['Rent'];
        }
        this.propdeposite = this.selleditlist['0']['Deposit'];
        if (this.propdeposite === null) {
          this.propdeposite = '0';
        } else {
          this.propdeposite = this.selleditlist[0]['Deposit'];
        }
        this.newavailablendate = this.selleditlist['0']['Availabledate'];
        this.dateCondition = this.selleditlist['0']['Availabledate'];
        this.proptenant = this.selleditlist['0']['TenantID'];
        this.tenanttypereview = this.selleditlist['0']['Tenant'];
        this.propbuilderid = this.selleditlist['0']['Builderid'];
        if (this.propbuilderid === null) {
          this.propbuilderid = '0';
        } else {
          this.propbuilderid = this.selleditlist[0]['Builderid'];
        }

        // this.getclickAuto(this.sellcity);
        this.Service.getRentlocality(this.sellcity, this.sellregion).subscribe(localitys => {
          this.localitys = localitys['details'];
          this.apioptionsRentLocality(localitys['details']);
        });
        if (this.sellproptypereview === 'Plot') {
          this.ShowPlotType = true;
          this.ApartmentForm = false;
          this.proptypeid = '50403';
        } else {
          this.ShowPlotType = false;
          this.ApartmentForm = true;
        }
        if (this.sellproptypereview === 'Apartment') {
          this.proptypeid = '50401';
        }
        if (this.sellproptypereview === 'Villas') {
          this.proptypeid = '50402';
        }
        this.Service.getrentpropertyonCity(this.sellcity, this.proptypeid).subscribe(properties => {
          this.apioptions(properties['autolist']);
        });

        //this.Dateconvert();

        //  if(this.sellpropstatus == '138564'){
        //   this.ShowPropertyAge = true;
        //   this.ShowPossesiondate = false;
        //  }else if(this.sellpropstatus == '138565'){
        //   this.ShowPossesiondate = true;
        //   this.ShowPropertyAge = false;
        //  }

        if (this.sellownership == '654826') {
          this.ShowBrokerageCharge = true;
        } else if (this.sellownership == '654825') {
          this.ShowBrokerageCharge = false;
        }
        if (this.sellproptype === '3') {
          this.ShowPlotType = true;
          this.ApartmentForm = false;
        } else {
          this.ShowPlotType = false;
          this.ApartmentForm = true;
        }



        // near by

        for (var i = 0; i < this.nearbylist.length; i++) {
          this.nearbylist[i].selected = false;
        }
        for (var i = 0; i < this.sellpropnearby.length; i++) {
          this.sellpropnearby[i].selected = true;
        }
        const final3 = this.nearbylist.filter(ar => !this.sellpropnearby.find(rm => (rm.id === ar.id)));
        this.finalnearby = final3.concat(this.sellpropnearby);

        // approvals

        // for (var i = 0; i < this.Approvalslist.length; i++) {
        //   this.Approvalslist[i].selected = false;
        // }

        // for (var i = 0; i < this.sellpropapprovals.length; i++) {
        //   this.sellpropapprovals[i].selected = true;
        // }
        // const final1 = this.Approvalslist.filter(ar => !this.sellpropapprovals.find(rm => (rm.id === ar.id) ))
        // this.finalapprovals  = final1.concat(this.sellpropapprovals);



        try {
          for (let i = 0; i < this.sellpropamenities.length; i++) {
            this.sellpropamenitiesid.push(this.sellpropamenities[i].id);
            // this.sellpropamenities.push(this.sellpropamenities[i].amenities);
          }
        } catch (error) {
          console.error(error);
        }

        try {
          for (let i = 0; i < this.sellpropapprovals.length; i++) {
            this.sellpropapprovalsid.push(this.sellpropapprovals[i].id);
            // this.sellpropapprovals.push(this.sellpropapprovals[i].approvals);
          }
        } catch (error) {
          console.error(error);
        }

        try {
          for (let i = 0; i < this.sellpropfacilities.length; i++) {
            this.sellpropfacilitiesid.push(this.sellpropfacilities[i].id);
            // this.sellpropfacilities.push(this.sellpropfacilities[i].facilities);
          }
        } catch (error) {
          console.error(error);
        }

        try {
          for (let i = 0; i < this.sellpropnearby.length; i++) {
            this.sellpropnearbyid.push(this.sellpropnearby[i].id);
            // this.sellpropnearbyid.push(this.sellpropnearby[i].nearby);
          }
        } catch (error) {
          console.error(error);
        }

        // get review data
        try {
          for (let i = 0; i < this.sellpropamenities.length; i++) {
            this.sellpropamenitiesreview.push(this.sellpropamenities[i].amenities);
          }
        } catch (error) {
          console.error(error);
        }

        try {
          for (let i = 0; i < this.sellpropapprovals.length; i++) {
            this.sellpropapprovalsreview.push(this.sellpropapprovals[i].approvals);
          }
        } catch (error) {
          console.error(error);
        }

        try {
          for (let i = 0; i < this.sellpropfacilities.length; i++) {
            this.sellpropfacilitiesreview.push(this.sellpropfacilities[i].facilities);
          }
        } catch (error) {
          console.error(error);
        }

        try {
          for (let i = 0; i < this.sellpropnearby.length; i++) {
            this.sellpropnearbyreview.push(this.sellpropnearby[i].nearby);
          }
        } catch (error) {
          console.error(error);
        }
      });
    });
  }

  Updaterentprop() {
    //     console.log(this.newavailablendate)
    //     if (this.dateCondition !== this.newavailablendate) {
    //       this.Dateconvert(this.newavailablendate)
    //     }
    // console.log(this.newavailablendate)
    // console.log(this.newavailablendate); // '2025/7/31'

    if (this.dateCondition !== this.newavailablendate) {
      this.Dateconvert(this.newavailablendate);
    }

    // console.log(this.newavailablendate);

    this.submitionLoader = true;
    if (this.ShowPlotType) {
      this.sellpropparking = '0'
    }
    if (this.requested_locality) {
      this.locality = undefined;
      this.localityID = undefined;
    } else if (this.locality) {
      this.requested_locality = ''
    }


    // 
    const userid = localStorage.getItem('userID');
    this.routeSub = this.route.params.subscribe(params => {
      this.propid = params['id'];
      var param = {
        Userid: userid,
        Propid: this.propid,
        Propertyname: this.sellpropname,
        Price: this.sellpropprice,
        Maintanencecharge: this.sellpropmaintanencecharge,
        Totalfloor: this.sellproptotalfloor,
        Propertyfloor: this.sellpropwhichfloor,
        Doorfacing: this.sellpropdoorface,
        City: this.sellcity,
        Locality: this.locality,
        // Region: this.sellregion,
        PropertyType: this.sellproptype,
        BuildingType: this.sellbuildingtype,
        Status: this.sellpropstatus,
        Furnish: this.sellpropfurnish,
        Ownership: this.sellownership,
        BHK: this.sellpropbhk,
        Address: this.sellpropaddress,
        Description: this.sellpropdesc,
        Bathroom: this.sellpropbathroom,
        Balcony: this.sellpropbalconie,
        Area: this.sellproparea,
        AreaType: this.sellareatype,
        Openparking: this.sellopenpark,
        Coveredparking: this.sellcoverpark,
        Parking: this.sellpropparking,
        PlotSize: this.sellplotsize,
        PlotType: this.sellplottype,
        PlotAge: this.sellplotage,
        Nearby: this.finalnoOfNearbyArray,
        Nearbydetails: this.sellpropNeardesc,
        // Khatatype: this.sellproptitle,
        Watersupply: this.sellpropwatersupply,
        // PossesionDate: this.newpossesiondate,
        PropertyAgeYear: this.sellpropyear,
        PropertyAgeMonth: this.sellpropmonth,
        BrokerageCharge: this.sellpropbrokerage,
        Zipcode: this.sellproppostalcode,
        Amenities: this.finalAminitiesArray,
        Facilities: this.finalFacilitiesArray,
        Availabledate: this.newavailablendate,
        Rent: this.proprent,
        Deposit: this.propdeposite,
        Tenant: this.proptenant,
        BuilderID: this.propbuilderid,
        // Approvals: this.sellpropapprovalsid,
        Locality_requested: this.requested_locality,
        locality_ID: this.localityID
      };
      this.Service.UpdateRentproperty(param).subscribe(response => {
        if (response['status'] === 'True') {
          this.submitionLoader = false;
          swal({
            icon: 'success',
            title: response['message'],
            showConfirmButton: false,
            timer: 1500
          });

          this.photoUpload();
          // 
        } else {
          this.submitionLoader = false;
          swal({
            icon: 'error',
            title: "Something Went Wrong",
            showConfirmButton: false,
            timer: 1500
          });
        }
      });
    });
  }



  whichFloorValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const whichFloor = Number(control.value);
      if (isNaN(whichFloor)) return null;

      const parent = control.parent;
      if (!parent) return null;

      const totalFloor = Number(parent.get('TotalFloor')?.value);
      if (isNaN(totalFloor)) return null;

      return whichFloor <= totalFloor ? null : { floorMismatch: true };
    };
  }
  // =============================================================================
  requested_locality: string = '';
  addNewLocality: boolean = false;




  @ViewChild(MatAutocompleteTrigger) autocompleteTrigger: MatAutocompleteTrigger;
  onInputChangeSell(): void {
    const input = this.propertyAutoRentLocalityName?.trim().toLowerCase() || '';

    // Filter matching localities
    const filtered = this.optionsRentLocality.filter(loc =>
      loc.Name.toLowerCase().includes(input)
    );

    // Update autocomplete list
    this.filteredOptionsRentLocality = of(filtered);

    // Show "Add New" only if input has value AND no matches
    this.addNewLocality = input.length > 0 && filtered.length === 0;

    // Set value in form
    this.firstFormGroup.get('localities')?.setValue(this.propertyAutoRentLocalityName);

    // If no match, set as requested
    this.requested_locality = this.addNewLocality ? this.propertyAutoRentLocalityName : '';
  }



  onItemSelectSell(option: any) {
    this.propertyAutoRentLocalityName = option.Name;
    this.localityID = option.ID;
    this.firstFormGroup.get('localities')?.setValue(option.Name);
    this.addNewLocality = false;
    this.NewLocality = true;
    this.requested_locality = '';
  }
  NewLocality = true;
  submitNewLocality() {
    this.addNewLocality = false;
    this.NewLocality = false;
    // console.log('Submitting new locality:', this.requested_locality);
    // Optional: API call to submit this.requested_locality
  }
  apioptionsRentLocality(apivalue) {
    this.optionsRentLocality = apivalue;

    this.filteredOptionsRentLocality = this.myControlRentLocality.valueChanges.pipe(
      startWith(''),
      map(value => {
        const input = typeof value === 'string' ? value.trim().toLowerCase() : '';
        const filtered = this.optionsRentLocality.filter(loc =>
          loc.Name.toLowerCase().includes(input)
        );

        const exactMatch = this.optionsRentLocality.some(
          loc => loc.Name.toLowerCase() === input
        );

        // Enable/disable addNewLocality mode automatically
        this.addNewLocality = input.length > 0 && !exactMatch;
        this.requested_locality = this.addNewLocality ? value : '';

        // Update form control
        this.firstFormGroup.get('localities')?.setValue(value);

        return filtered;
      })
    );
  }
  displayLocalityName(locality): string {
    return locality?.Name || locality;
  }

}
