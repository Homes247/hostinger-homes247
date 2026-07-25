import { Component, ElementRef, HostListener, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LOCAL_STORAGE } from '@ng-toolkit/universal';
import { Meta, Title } from '@angular/platform-browser';
import { DataService } from '../data.service';
import { startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ViewChild } from '@angular/core';
import { CountdownComponent, CountdownEvent } from 'ngx-countdown';
import { enquiry } from '../prop-details/class';
import { DataService2 } from '../data.service2';
import { FilterService } from '../filter.service';
declare var $: any;
declare var swal: any;
declare var $: any;
@Component({
  selector: 'app-compare-property',
  templateUrl: './compare-property.component.html',
  styleUrls: ['./compare-property.component.css']
})
export class ComparePropertyComponent implements OnInit {
  @ViewChild('cd', { static: false }) private countdown: CountdownComponent;
  @ViewChild('scrollapiloader') scrollapiloader: ElementRef;
  @ViewChild('cancel') cancel: ElementRef;

  projectLocation: boolean = false;
  propertyLocation: boolean = false;



  compareProperty: any;


  compropid1: any;
  compropid2: any;
  compropid3: any;
  propertiesDetails1: any;
  propertiesDetails2: any;
  propertiesDetails3: any;
  propname1: any;
  buildername1: any;
  possissiondate1: any;
  reraid1: any;
  propstatus1: any;
  propbhk1: any;
  propdimension1: any;
  locname1: any;
  price_min1: any;
  price_max1: any;
  proptype1: any;

  propertyimage: any;

  propertyimage1: any
  // propertyimag12  = this.Service.SellImages + 'cover/';

  propertyimag12: any;
  propimag1: any;
  propimag2: any;
  propimag4: any;
  propname2: any;
  buildername2: any;
  possissiondate2: any;
  reraid2: any;
  propstatus2: any;
  propbhk2: any;
  propdimension2: any;
  locname2: any;
  price_min2: any;
  price_max2: any;
  proptype2: any;
  propimag3: any;
  propname3: any;
  buildername3: any;
  possissiondate3: any;
  reraid3: any;
  propstatus3: any;
  propbhk3: any;
  propdimension3: any;
  locname3: any;
  price_min3: any;
  price_max3: any;
  proptype3: any;
  reviews1: any;
  totaluserratings: any;
  averagerating1: any;
  reviews2: any;
  averagerating2: any;
  averagerating3: any;
  reviews3: any;
  cityname1: any;
  cityname2: any;
  cityname3: any;
  region1: any;
  region2: any;
  region3: any;
  units1: any;
  units2: any;
  units3: any;
  floorplanedetails1: any;
  floorplanedetails2: any;
  floorplanedetails3: any;
  amenities1: any;
  amenities2: any;
  amenities3: any;
  parsedarray = [];
  compareprop1: boolean = true;
  compareloader1: boolean = false;
  compareprop2: boolean = true;
  compareloader2: boolean = false;
  compareprop3: boolean = true;
  compareloader3: boolean = false;
  start: any;
  endone: any;
  citiess: any;
  locationSelectedId: string;
  options: any;
  filteredOptions: Observable<any>;
  myControl = new FormControl();
  selectCity = 'SelectCity';
  selectedLocation = this.selectCity;
  searchstring: any;
  currentCity: any;
  showcomparediv: boolean = false;
  showmaindiv: boolean = true;
  showcomparediv1: boolean = false;
  showcomparediv2: boolean = false;
  showcomparediv3: boolean = false;
  numbernan1: boolean = false;
  numbernan2: boolean = false;
  numbernan3: boolean = false;
  compareStorageArry: any;
  propID: any;
  propid1: any;
  propid2: any;
  compare1: any;
  compare2: any;
  defaltcityselect: boolean = false;
  cityselect: boolean = true;
  selectedcity: any;
  cityname: any;
  defaltcityselectlist: boolean;
  proptypeID: any;
  builderid1: any;
  builderid2: any;
  propstatusid2: any;
  propstatusid1: any;
  regionid2: any;
  regionid1: any;
  locationid1: any;
  locationid2: any;
  user = new enquiry();
  otploader: boolean = false;
  reviewcount2: any;
  reviewcount1: any;
  showratingandreview: boolean;
  showratingandreview1: boolean;
  cityid: any;
  propimag12: any;
  propertyimag123: any;
  reSale1: any;
  reSale2: any;
  propid_Resale_1: any;
  compareShowonimg: boolean = false;
  test: string;
  comparePropType: any;
  AmenitiesProject: boolean = false;
  AmenitiesProperty: boolean = false;
  enquiryPropName: any;
  cityPropId: any;





  constructor(public Service: DataService, private titleService: Title,
    public Service2: DataService2,
    private meta: Meta, @Inject(LOCAL_STORAGE) private Local_Storage: any,
    private router: Router,
    public activatedRoute: ActivatedRoute,
    public Filter: FilterService,


  ) { }

  loaderProperty1: boolean = false;
  compareproperty2: boolean = false;


  imagesellCompare1: boolean = false;
  imagespropertycomp1 = false;
  imagesellCompare2: boolean = false;
  imagespropertycomp2: boolean = false;

  ngOnInit(): void {
    this.metatags();

    if ('ComparePropID' in this.Local_Storage) {
    } else {
      this.Local_Storage.setItem('ComparePropID', '[]');
    }

    if ('ComparePropID' in this.Local_Storage) {

      this.propertyimage = this.Service.imagesURL + "uploadPropertyImgs/";
      // this.imagesellCompare1 = true;
      // this.imagesellCompare2 = true;

      var test = JSON.parse(localStorage.getItem('ComparePropID'));
      // )

      if (test.length == 0) {
        this.imagesellCompare1 = false;
        this.imagesellCompare2 = false;
      } else {
        this.imagesellCompare1 = true;
        this.imagesellCompare2 = true;
      }
      this.Getcomoareprop();
      this.AmenitiesProject = true;
      this.AmenitiesProperty = false;


    } else if ('ComparePropID1_ReSale' in this.Local_Storage) {
      var test = JSON.parse(localStorage.getItem('ComparePropID1_ReSale'));
      // 
      if (test.length == 0) {
        this.imagespropertycomp1 = false;
        this.imagespropertycomp2 = false;

      } else {
        this.imagespropertycomp1 = true;
        this.imagespropertycomp2 = true;
      }
      this.Getcomoareprop1();
      this.AmenitiesProperty = true;
      this.AmenitiesProject = false;



      this.propertyimage = this.Service.SellImages + 'cover/';



    } else {
    }
    this.getlocationlist();
    this.cityname = this.Local_Storage.getItem('cityname');
    this.swal1();
    this.swal2();



  }

  swal1() {
    if (this.loaderProperty1 && this.compareproperty2) {
      swal({
        text: 'Please Add your Property',
        type: 'error',
        showConfirmButton: false,
        timer: 2000
      })
    }

  }

  swal2() {
    if (this.compareloader1 && this.compareloader2) {
      swal({
        text: 'Please Add your Property',
        type: 'error',
        showConfirmButton: false,
        timer: 2000
      })
    }

  }

  metatags() {
    const PAGEID = '37';
    this.Service.getstaticmeta(PAGEID).subscribe(metatags => {
      this.titleService.setTitle(metatags['Pageseo'][0].page_title);
      this.meta.updateTag({ name: 'description', content: metatags['Pageseo'][0].meta_description });
      this.meta.updateTag({ property: 'og:title', content: metatags['Pageseo'][0].page_title });
      this.meta.updateTag({ property: 'og:description', content: metatags['Pageseo'][0].meta_description });
      this.Service.createLinkForCanonicalURL();
    });
  }
  topnewdivreached = false;
  Fixedfooter: any;
  loaded = false;
  componentloads = false;
  enquiryFormComponent: any;
  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    // const elementPosition = this.scrollapiloader.nativeElement.offsetTop;
    // const scrollPosition = window.pageYOffset;
    // if (this.topnewdivreached = scrollPosition >= elementPosition) {
    //   import('../fixedfooter/fixedfooter.module').then(mod => mod.FixedfooterComponentModule).then(FixedfooterComponentModule => {
    //     this.Fixedfooter = FixedfooterComponentModule.components['lazy'];
    //     this.loaded = true;
    //   });
    // }

    if (this.componentloads == false) {
    // 
      this.componentloads = true;
      import('../enquiry-form/enquiry-form.module').then(mod => mod.enquiryFormModule).then(enquiryFormModule => {
        this.enquiryFormComponent = enquiryFormModule.components['lazy'];
        $('.modal-login').css('z-index', '99999');
        // 
      });
    }
  }
  galleryimages: any;
  floorplans: any;
  Amenities: any;
  banks: any;
  approvals: any;
  bhkfilter: any;

  galleryimages1: any;
  floorplans1: any;
  Amenities1: any;
  banks1: any;
  approvals1: any;
  bhkfilter1: any;
  Getcomoareprop() {
    if ('ComparePropID' in this.Local_Storage) {

    } else {
      this.Local_Storage.setItem('ComparePropID', '[]');
    }
    const proparray = this.Local_Storage.getItem('ComparePropID');
    const jsonpars = JSON.parse(proparray);
    this.compareStorageArry = JSON.parse(localStorage.getItem('ComparePropID'));
    var compare1 = this.compareStorageArry[0];
    var compare2 = this.compareStorageArry[1];
    this.compare1 = compare1;
    this.compare2 = compare2;
    if (compare1 == 'undefined' || compare1 == null) {
      this.compareloader1 = true
      this.imagesellCompare1 = false

    } else {
      this.compareloader1 = false
      this.imagesellCompare1 = true

      this.Service2.getpropertynew(compare1).subscribe(prop => {
        let propDetails1 = prop['details'];
        this.propertiesDetails1 = propDetails1;

        this.propimag1 = this.propertiesDetails1[0].images[0].name;
        this.propname1 = this.propertiesDetails1[0]['propertyName'];
        this.propID = this.propertiesDetails1[0]['property_info_IDPK'];
        this.proptypeID = this.propertiesDetails1[0]['propertytypeId'];
        this.Local_Storage.setItem("propid1", this.propID);
        this.propid1 = this.Local_Storage.getItem("propid1");
        this.buildername1 = this.propertiesDetails1[0]['BuilderName'];
        this.builderid1 = this.propertiesDetails1[0]['BuilderId'];
        this.possissiondate1 = this.propertiesDetails1[0]['PossessionDate'];
        this.reraid1 = this.propertiesDetails1[0]['RERA_ID'];
        this.propstatus1 = this.propertiesDetails1[0]['Status'];
        this.propstatusid1 = this.propertiesDetails1[0]['StatusId'];
        this.propbhk1 = this.propertiesDetails1[0]['bhk'];
        this.propdimension1 = this.propertiesDetails1[0]['dimension'];
        this.locname1 = this.propertiesDetails1[0]['locality_name'];
        this.locationid1 = this.propertiesDetails1[0]['LoaclityId'];
        this.cityname1 = this.propertiesDetails1[0]['city_name'];

        this.cityPropId = this.propertiesDetails1[0]['cityId']
        this.price_min1 = this.propertiesDetails1[0]['price_min'];
        this.price_max1 = this.propertiesDetails1[0]['price_max'];
        this.proptype1 = this.propertiesDetails1[0]['propertyType'];
        this.region1 = this.propertiesDetails1[0]['RegionName'];
        this.regionid1 = this.propertiesDetails1[0]['RegionID'];
        this.units1 = this.propertiesDetails1[0]['total_apartments'];
        // this.floorplanedetails1 = this.propertiesDetails1[0].BHK_Deatils;
        // this.amenities1 = this.propertiesDetails1[0].Amenities_Deatils;
      });
      this.Service.reviewfetching(this.compare1).subscribe(response => {
        this.reviews1 = response['rating'];
        this.reviewcount1 = this.reviews1.length;
        const fivestar = '5';
        const fivestarcount = this.reviews1.filter((obj) => obj.Rating === fivestar).length;
        const fourstar = '4';
        const fourstarcount = this.reviews1.filter((obj) => obj.Rating === fourstar).length;
        const thirdstar = '3';
        const threestarcount = this.reviews1.filter((obj) => obj.Rating === thirdstar).length;
        const twostar = '2';
        const twostarcount = this.reviews1.filter((obj) => obj.Rating === twostar).length;
        const onestar = '1';
        const onestarcount = this.reviews1.filter((obj) => obj.Rating === onestar).length;
        const totalratings = fivestarcount + fourstarcount + threestarcount + twostarcount + onestarcount;
        this.averagerating1 = (Math.round(5 * fivestarcount + 4 * fourstarcount + 3 * threestarcount + 2 * twostarcount + 1 * onestarcount) / totalratings).toFixed(1);
        if (isNaN(parseFloat(this.averagerating1))) {
          this.numbernan1 = true;
          this.averagerating1 = '0';
          this.totaluserratings = '0';
        }
      });
      this.Service2.get_amen_appro_banks(this.compare1).subscribe(datadetails => {
        let otherdatas = datadetails['details'];
        this.galleryimages = otherdatas[0].images;
        this.floorplans = otherdatas[0].BHK_Details;
        this.amenities1 = otherdatas[0].Amenities_Details;
        this.banks = otherdatas[0].Bank_Details;
        this.approvals = otherdatas[0].Approvals_Details;
        this.floorplanedetails1 = otherdatas[0].BHK_Details;

      });

    }
    if (compare2 == 'undefined' || compare2 == null) {
      this.compareloader2 = true
      this.imagesellCompare2 = false
    } else {
      this.compareloader2 = false
      this.imagesellCompare2 = true

      this.Service2.getpropertynew(compare2).subscribe(prop => {


        let propDetails2 = prop['details'];
        this.propertiesDetails2 = propDetails2;

        this.propimag2 = this.propertiesDetails2[0].images[0].name;
        this.propname2 = this.propertiesDetails2[0]['propertyName'];
        this.propID = this.propertiesDetails2[0]['property_info_IDPK'];
        this.proptypeID = this.propertiesDetails2[0]['propertytypeId'];
        this.Local_Storage.setItem("propid2", this.propID);
        this.propid2 = this.Local_Storage.getItem("propid2");
        this.buildername2 = this.propertiesDetails2[0]['BuilderName'];
        this.builderid2 = this.propertiesDetails2[0]['BuilderId'];
        this.possissiondate2 = this.propertiesDetails2[0]['PossessionDate'];
        this.reraid2 = this.propertiesDetails2[0]['RERA_ID'];
        this.propstatus2 = this.propertiesDetails2[0]['Status'];
        this.propstatusid2 = this.propertiesDetails2[0]['StatusId'];
        this.propbhk2 = this.propertiesDetails2[0]['bhk'];
        this.propdimension2 = this.propertiesDetails2[0]['dimension'];
        this.locname2 = this.propertiesDetails2[0]['locality_name'];
        this.locationid2 = this.propertiesDetails2[0]['LoaclityId'];
        this.cityname2 = this.propertiesDetails2[0]['city_name'];
        this.price_min2 = this.propertiesDetails2[0]['price_min'];
        this.price_max2 = this.propertiesDetails2[0]['price_max'];
        this.cityPropId = this.propertiesDetails1[0]['cityId']

        this.proptype2 = this.propertiesDetails2[0]['propertyType'];
        this.region2 = this.propertiesDetails2[0]['RegionName'];
        this.regionid2 = this.propertiesDetails2[0]['RegionID'];
        this.units2 = this.propertiesDetails2[0]['total_apartments'];
        // this.floorplanedetails2 = this.propertiesDetails2[0].BHK_Deatils;
        // this.amenities2 = this.propertiesDetails2[0].Amenities_Deatils;
      });
      this.Service.reviewfetching(this.compare2).subscribe(response => {
        this.reviews2 = response['rating'];
        this.reviewcount2 = this.reviews2.length;
        const fivestar = '5';
        const fivestarcount = this.reviews2.filter((obj) => obj.Rating === fivestar).length;
        const fourstar = '4';
        const fourstarcount = this.reviews2.filter((obj) => obj.Rating === fourstar).length;
        const thirdstar = '3';
        const threestarcount = this.reviews2.filter((obj) => obj.Rating === thirdstar).length;
        const twostar = '2';
        const twostarcount = this.reviews2.filter((obj) => obj.Rating === twostar).length;
        const onestar = '1';
        const onestarcount = this.reviews2.filter((obj) => obj.Rating === onestar).length;
        const totalratings = fivestarcount + fourstarcount + threestarcount + twostarcount + onestarcount;
        this.averagerating2 = (Math.round(5 * fivestarcount + 4 * fourstarcount + 3 * threestarcount + 2 * twostarcount + 1 * onestarcount) / totalratings).toFixed(1);
        if (isNaN(parseFloat(this.averagerating2))) {
          this.numbernan2 = true;
          this.averagerating2 = '0';
          this.totaluserratings = '0';
        }
      });

      this.Service2.get_amen_appro_banks(this.compare1).subscribe(datadetails => {
        let otherdatas = datadetails['details'];
        this.galleryimages1 = otherdatas[0].images;
        this.floorplans1 = otherdatas[0].BHK_Details;
        this.amenities2 = otherdatas[0].Amenities_Details;
        this.banks1 = otherdatas[0].Bank_Details;
        this.approvals1 = otherdatas[0].Approvals_Details;
        this.floorplanedetails2 = otherdatas[0].BHK_Details;

      });
    }
  }
  Getcomoareprop1() {
    if ('ComparePropID1_ReSale' in this.Local_Storage) {

    } else {
      this.Local_Storage.setItem('ComparePropID1_ReSale', '[]');
    }
    const proparray = this.Local_Storage.getItem('ComparePropID1_ReSale');
    const jsonpars = JSON.parse(proparray);
    this.compareStorageArry = JSON.parse(localStorage.getItem('ComparePropID1_ReSale'));
    var reSale1 = this.compareStorageArry[0];
    var reSale2 = this.compareStorageArry[1];
    this.reSale1 = reSale1;
    this.reSale2 = reSale2;
    if (reSale1 == 'undefined' || reSale1 == null) {

      this.loaderProperty1 = true;
      this.imagespropertycomp1 = false;


    } else {
      this.loaderProperty1 = false;
      this.imagespropertycomp1 = true;


      this.Service.getindividualpropertydetails(reSale1).subscribe(prop => {

        let propDetails1 = prop['propertydetails'];
        this.compareProperty = propDetails1;
        this.propertiesDetails1 = propDetails1;

        this.propimag12 = this.propertiesDetails1[0]['property_coverimage'];
        this.propname1 = this.propertiesDetails1[0]['PropertyName'];

        this.propID = this.propertiesDetails1[0]['PropertyID'];

        this.proptypeID = this.propertiesDetails1[0]['propertytypeId'];

        this.Local_Storage.setItem("propid_Resale_1", this.propID);
        this.propid_Resale_1 = this.Local_Storage.getItem("propid_Resale_1");

        this.buildername1 = this.propertiesDetails1[0]['BuilderName'];
        this.builderid1 = this.propertiesDetails1[0]['BuilderId'];
        this.possissiondate1 = this.propertiesDetails1[0]['PosessionDate'];
        this.reraid1 = this.propertiesDetails1[0]['RERA_ID'];
        this.propstatus1 = this.propertiesDetails1[0]['Status'];
        this.propstatusid1 = this.propertiesDetails1[0]['StatusId'];
        this.propbhk1 = this.propertiesDetails1[0]['BHK'];
        this.propdimension1 = this.propertiesDetails1[0]['PropertyArea'];
        this.locname1 = this.propertiesDetails1[0]['Locality'];
        this.locationid1 = this.propertiesDetails1[0]['LoaclityId'];
        this.cityname1 = this.propertiesDetails1[0]['City'];
        this.price_min1 = this.propertiesDetails1[0]['Price'];
        this.cityPropId = this.propertiesDetails1[0]['Cityid']

        // this.price_min1 = this.propertiesDetails1[0]['price_min'];
        // this.price_max1 = this.propertiesDetails1[0]['price_max'];
        this.proptype1 = this.propertiesDetails1[0]['PropertyType'];
        this.region1 = this.propertiesDetails1[0]['RegionName'];
        this.regionid1 = this.propertiesDetails1[0]['RegionID'];
        this.units1 = this.propertiesDetails1[0]['total_apartments'];
        // this.floorplanedetails1 = this.propertiesDetails1[0].BHK_Deatils;
        this.amenities1 = this.propertiesDetails1[0].Amenities;

      });
      this.Service.reviewfetching(this.compare1).subscribe(response => {
        this.reviews1 = response['rating'];
        this.reviewcount1 = this.reviews1.length;
        const fivestar = '5';
        const fivestarcount = this.reviews1.filter((obj) => obj.Rating === fivestar).length;
        const fourstar = '4';
        const fourstarcount = this.reviews1.filter((obj) => obj.Rating === fourstar).length;
        const thirdstar = '3';
        const threestarcount = this.reviews1.filter((obj) => obj.Rating === thirdstar).length;
        const twostar = '2';
        const twostarcount = this.reviews1.filter((obj) => obj.Rating === twostar).length;
        const onestar = '1';
        const onestarcount = this.reviews1.filter((obj) => obj.Rating === onestar).length;
        const totalratings = fivestarcount + fourstarcount + threestarcount + twostarcount + onestarcount;
        this.averagerating1 = (Math.round(5 * fivestarcount + 4 * fourstarcount + 3 * threestarcount + 2 * twostarcount + 1 * onestarcount) / totalratings).toFixed(1);
        if (isNaN(parseFloat(this.averagerating1))) {
          this.numbernan1 = true;
          this.averagerating1 = '0';
          this.totaluserratings = '0';
        }
      });
      // this.Service2.get_amen_appro_banks(this.compare1).subscribe(datadetails => {
      //   let otherdatas = datadetails['details'];
      //   this.galleryimages = otherdatas[0].images;
      //   this.floorplans = otherdatas[0].BHK_Details;
      //   this.amenities1 = otherdatas[0].Amenities_Details;
      //   this.banks = otherdatas[0].Bank_Details;
      //   this.approvals = otherdatas[0].Approvals_Details;
      //   this.floorplanedetails1 = otherdatas[0].BHK_Details;
      //   
      // });


    }
    if (reSale2 == 'undefined' || reSale2 == null) {

      this.compareproperty2 = true;
      this.imagespropertycomp2 = false;

    } else {
      this.compareproperty2 = false;
      this.imagespropertycomp2 = true;


      this.Service.getindividualpropertydetails(reSale2).subscribe(prop => {
        let propDetails2 = prop['propertydetails'];
        this.propertiesDetails2 = propDetails2;

        this.propertyimag123 = this.propertiesDetails2[0]['property_coverimage'];

        this.propname2 = this.propertiesDetails2[0]['PropertyName'];
        this.propID = this.propertiesDetails2[0]['PropertyID'];
        this.proptypeID = this.propertiesDetails2[0]['propertytypeId'];
        this.Local_Storage.setItem("propid_Resale_2", this.propID);
        this.propid2 = this.Local_Storage.getItem("propid_Resale_2");
        this.buildername2 = this.propertiesDetails2[0]['BuilderName'];
        this.builderid2 = this.propertiesDetails2[0]['BuilderId'];
        this.possissiondate2 = this.propertiesDetails2[0]['PosessionDate'];
        this.reraid2 = this.propertiesDetails2[0]['RERA_ID'];
        this.propstatus2 = this.propertiesDetails2[0]['Status'];
        this.propstatusid2 = this.propertiesDetails2[0]['StatusId'];
        this.propbhk2 = this.propertiesDetails2[0]['BHK'];
        this.propdimension2 = this.propertiesDetails2[0]['PropertyArea'];
        this.locname2 = this.propertiesDetails2[0]['Locality'];
        this.locationid2 = this.propertiesDetails2[0]['LoaclityId'];
        this.cityname2 = this.propertiesDetails2[0]['City'];
        this.price_min2 = this.propertiesDetails2[0]['Price'];
        this.cityPropId = this.propertiesDetails1[0]['Cityid']

        // this.price_min2 = this.propertiesDetails2[0]['price_min'];
        // this.price_max2 = this.propertiesDetails2[0]['price_max'];
        this.proptype2 = this.propertiesDetails2[0]['PropertyType'];
        this.region2 = this.propertiesDetails2[0]['RegionName'];
        this.regionid2 = this.propertiesDetails2[0]['RegionID'];
        this.units2 = this.propertiesDetails2[0]['total_apartments'];
        // this.floorplanedetails2 = this.propertiesDetails2[0].BHK_Deatils;
        this.amenities2 = this.propertiesDetails2[0].Amenities;
      });
      // this.Service.reviewfetching(this.compare2).subscribe(response => {
      //   this.reviews2 = response['rating'];
      //   this.reviewcount2 = this.reviews2.length;
      //   const fivestar = '5';
      //   const fivestarcount = this.reviews2.filter((obj) => obj.Rating === fivestar).length;
      //   const fourstar = '4';
      //   const fourstarcount = this.reviews2.filter((obj) => obj.Rating === fourstar).length;
      //   const thirdstar = '3';
      //   const threestarcount = this.reviews2.filter((obj) => obj.Rating === thirdstar).length;
      //   const twostar = '2';
      //   const twostarcount = this.reviews2.filter((obj) => obj.Rating === twostar).length;
      //   const onestar = '1';
      //   const onestarcount = this.reviews2.filter((obj) => obj.Rating === onestar).length;
      //   const totalratings = fivestarcount + fourstarcount + threestarcount + twostarcount + onestarcount;
      //   this.averagerating2 = (Math.round(5 * fivestarcount + 4 * fourstarcount + 3 * threestarcount + 2 * twostarcount + 1 * onestarcount) / totalratings).toFixed(1);
      //   if (isNaN(parseFloat(this.averagerating2))) {
      //     this.numbernan2 = true;
      //     this.averagerating2 = '0';
      //     this.totaluserratings = '0';
      //   }
      // });

      // this.Service2.get_amen_appro_banks(this.compare1).subscribe(datadetails => {
      //   let otherdatas = datadetails['details'];
      //   this.galleryimages1 = otherdatas[0].images;
      //   this.floorplans1 = otherdatas[0].BHK_Details;
      //   this.amenities2 = otherdatas[0].Amenities_Details;
      //   this.banks1 = otherdatas[0].Bank_Details;
      //   this.approvals1 = otherdatas[0].Approvals_Details;
      //   this.floorplanedetails2 = otherdatas[0].BHK_Details;
      //   
      // });
    }
  }

  closeprop1(prop) {
    if ('ComparePropID' in this.Local_Storage) {
    } else {
      this.Local_Storage.setItem('ComparePropID', '[]');
    }
    // this.comparePropType = this.Local_Storage.getItem('comparePropType');
    const proparray = this.Local_Storage.getItem('ComparePropID');
    const jsonpars = JSON.parse(proparray);
    const itemToRemoveIndex = jsonpars.indexOf(prop);

    this.parsedarray = JSON.parse(proparray);
    this.parsedarray = this.parsedarray.filter(function (item) {
      return item !== prop;
    })
    this.compareStorageArry = JSON.parse(localStorage.getItem('ComparePropID'));
    if (this.compareStorageArry.length == 1) {
      this.proptypeID = '';
    }
    this.imagesellCompare1 = false;
    this.compareloader1 = true;
    this.swal2();
    this.Local_Storage.setItem("ComparePropID", JSON.stringify(this.parsedarray));
    this.Local_Storage.removeItem("comparePropType1");
  }
  // closeprop23(prop) {
  //   if ('ComparePropID1_ReSale' in this.Local_Storage) {
  //   } else {
  //     this.Local_Storage.setItem('ComparePropID1_ReSale', '[]');
  //   }
  //   const proparray = this.Local_Storage.getItem('ComparePropID1_ReSale');
  //   const jsonpars = JSON.parse(proparray);
  //   const itemToRemoveIndex = jsonpars.indexOf(prop);

  //   this.parsedarray = JSON.parse(proparray);

  //   this.parsedarray = this.parsedarray.filter(function (item) {
  //     return item !== prop;
  //   })
  //   this.compareStorageArry = JSON.parse(localStorage.getItem('ComparePropID1_ReSale'));
  //   if (this.compareStorageArry.length == 1) {
  //     this.proptypeID = '';
  //   }

  //   this.Local_Storage.setItem("ComparePropID", JSON.stringify(this.parsedarray));
  // }

  // another function

  closeprop13(prop) {



    if ('ComparePropID1_ReSale' in this.Local_Storage) {
    } else {
      this.Local_Storage.setItem('ComparePropID1_ReSale', '[]');
    }
    // this.comparePropType = this.Local_Storage.getItem('comparePropType');
    const proparray = this.Local_Storage.getItem('ComparePropID1_ReSale');
    const jsonpars = JSON.parse(proparray);
    const itemToRemoveIndex = jsonpars.indexOf(prop);

    this.parsedarray = JSON.parse(proparray);
    this.parsedarray = this.parsedarray.filter(function (item) {
      return item !== prop;
    })
    this.compareStorageArry = JSON.parse(localStorage.getItem('ComparePropID1_ReSale'));
    if (this.compareStorageArry.length == 1) {
      this.proptypeID = '';
    }
    this.imagespropertycomp1 = false;
    this.swal1();
    this.loaderProperty1 = true;
    this.Local_Storage.setItem("ComparePropID1_ReSale", JSON.stringify(this.parsedarray));
    this.Local_Storage.removeItem("comparePropType_ReSale_1");

  }
  closeprop2(prop) {
    if ('ComparePropID' in this.Local_Storage) {
    } else {
      this.Local_Storage.setItem('ComparePropID', '[]');
    }
    // this.comparePropType = this.Local_Storage.getItem('comparePropType');+
    const proparray = this.Local_Storage.getItem('ComparePropID');
    const jsonpars = JSON.parse(proparray);
    const itemToRemoveIndex = jsonpars.indexOf(prop);

    this.parsedarray = JSON.parse(proparray);

    this.parsedarray = this.parsedarray.filter(function (item) {
      return item !== prop;
    })
    this.compareStorageArry = JSON.parse(localStorage.getItem('ComparePropID'));
    if (this.compareStorageArry.length == 1) {
      this.proptypeID = '';
    }
    this.imagesellCompare2 = false;
    this.compareloader2 = true
    this.swal2();

    this.Local_Storage.setItem("ComparePropID", JSON.stringify(this.parsedarray));
    this.Local_Storage.removeItem("comparePropType2");
  }
  propcom2(prop) {
    if ('ComparePropID1_ReSale' in this.Local_Storage) {
    } else {
      this.Local_Storage.setItem('ComparePropID1_ReSale', '[]');
    }
    // this.comparePropType = this.Local_Storage.getItem('comparePropType');
    const proparray = this.Local_Storage.getItem('ComparePropID1_ReSale');
    const jsonpars = JSON.parse(proparray);
    const itemToRemoveIndex = jsonpars.indexOf(prop);

    this.parsedarray = JSON.parse(proparray);

    this.parsedarray = this.parsedarray.filter(function (item) {
      return item !== prop;
    })
    this.compareStorageArry = JSON.parse(localStorage.getItem('ComparePropID1_ReSale'));
    if (this.compareStorageArry.length == 1) {
      this.proptypeID = '';
    }

    this.compareproperty2 = true;
    this.imagespropertycomp2 = false;
    this.swal1();

    this.Local_Storage.setItem("ComparePropID1_ReSale", JSON.stringify(this.parsedarray));
    this.Local_Storage.removeItem("comparePropType_ReSale_2");


  }


  gotoback() {
    window.history.back();
  }
  getlocationlist() {
    this.Service.getlocationlist().subscribe((city: any[]) => {
      this.citiess = city['locations'];
    });
  }
  getcityname(event) {
    const city = event.target.value;

    this.selectedcity = city;
    this.Service.getlocationlist().subscribe(citys => {
      let citynam = citys['locations'];
      for (let i = 0; i <= citynam.length; i++) {

        if (city == this.citiess[i].city) {
          var cityid = this.citiess[i].id;
          this.getclickAuto(cityid, this.proptypeID);
        }
      }
    });
  }
  getclickAuto(cityid, proptype) {

    if (proptype == null) {
      proptype = '';
      this.Service.getAutocompare(cityid, proptype).subscribe(myLocalList => {
        this.apioptions(myLocalList['autolist']);
      });
    } else {
      this.Service.getAutocompare(cityid, proptype).subscribe(myLocalList => {
        this.apioptions(myLocalList['autolist']);
      });
    }
  }

  // compare property 1 and 2 API connecting 


  getcityname1(event) {
    const city = event.target.value;

    this.selectedcity = city;
    this.Service.getlocationlist().subscribe(citys => {
      let citynam = citys['locations'];
      for (let i = 0; i <= citynam.length; i++) {

        if (city == this.citiess[i].city) {
          var cityid = this.citiess[i].id;
          this.getclickAuto1(cityid, this.proptypeID);
        }
      }
    });
  }
  getclickAuto1(cityid, proptype) {
    if (proptype == null) {
      proptype = '';
      this.Service.getAuto(cityid).subscribe((myLocalList: any[]) => {

        this.apioptions1(myLocalList['autolist']);
      });
    } else {
      this.Service.getAuto(cityid).subscribe((myLocalList: any[]) => {
        this.apioptions1(myLocalList['autolist']);
      });
    }
  }





  apioptions(apivalue) {
    this.options = apivalue;
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => value.length >= 1 ? this._filter(value) : [])
      );
  }


  apioptions1(apivalue1) {
    this.options = apivalue1;
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

  public displayname(value) {
    if (value) {
      return value.name = '';
    }
  }
  onItemSelect(selected) {
    var currentCity = selected.city;
    this.getProjectsclick(currentCity, selected);
  }
  getProjectsclick(currentCity, selected) {
    if (selected.type == "property_name") {
      var propertytype = selected.name;
      this.searchstring = propertytype;
      var proptype = propertytype.replace(/\s+/g, '-').toLowerCase();
      var proptypeid = selected.id;
      this.compropid1 = proptypeid;
      this.showcomparediv1 = false;
      this.showmaindiv = true;
      if ('ComparePropID' in this.Local_Storage) {
      } else {
        this.Local_Storage.setItem('ComparePropID', '[]');
      }
      const proparray = this.Local_Storage.getItem('ComparePropID');
      const jsonpars = JSON.parse(proparray);
      const itemToRemoveIndex = jsonpars.indexOf(this.compropid1);

      this.parsedarray = JSON.parse(proparray);
      if (itemToRemoveIndex == -1) {
        this.parsedarray.push(this.compropid1);
        this.Local_Storage.setItem('ComparePropID', JSON.stringify(this.parsedarray));
      } else {
        //   this.parsedarray = this.parsedarray.filter(function(item) {
        //     return item !== this.compropid1;
        // })
        //  this.compareloader1 = true;
        //  this.compareprop1 = false;
        //   this.Local_Storage.setItem("ComparePropID", JSON.stringify(this.parsedarray));
        this.showcomparediv1 = true;
        this.showmaindiv = false;
        swal({
          text: 'Property Already Added',
          type: 'error',
          showConfirmButton: false,
          timer: 2000
        })
      }
      if ('ComparePropID' in this.Local_Storage) {
        this.Getcomoareprop();

      } else if ('ComparePropID1_ReSale' in this.Local_Storage) {
        this.Getcomoareprop1();
      } else {

      }
    }
  }
  onItemSelect2(selected) {
    var currentCity = selected.city;
    this.getProjectsclick2(currentCity, selected);
  }
  getProjectsclick2(currentCity, selected) {
    if (selected.type == "property_name") {

      var propertytype = selected.name;
      this.searchstring = propertytype;
      var proptype = propertytype.replace(/\s+/g, '-').toLowerCase();
      var proptypeid = selected.id;
      this.compropid2 = proptypeid;
      this.showcomparediv2 = false;
      this.showmaindiv = true;
      if ('ComparePropID' in this.Local_Storage) {
      } else {
        this.Local_Storage.setItem('ComparePropID', '[]');
      }
      const proparray = this.Local_Storage.getItem('ComparePropID');
      const jsonpars = JSON.parse(proparray);
      const itemToRemoveIndex = jsonpars.indexOf(this.compropid2);

      this.parsedarray = JSON.parse(proparray);
      if (itemToRemoveIndex == -1) {
        this.parsedarray.push(this.compropid2);
        this.Local_Storage.setItem('ComparePropID', JSON.stringify(this.parsedarray));
      } else {
        this.showcomparediv2 = true;
        this.showmaindiv = false;
        swal({
          text: 'Property Already Added',
          type: 'error',
          showConfirmButton: false,
          timer: 2000
        })
      }

      if ('ComparePropID' in this.Local_Storage) {
        this.Getcomoareprop();

      } else if ('ComparePropID1_ReSale' in this.Local_Storage) {
        this.Getcomoareprop1();
      } else {

      }

      // this.Getcomoareprop();
      // this.Getcomoareprop1();
    }
  }
  contactseller(selectedPropName) {
    $('#contactseller').modal('show');
    this.enquiryPropName = selectedPropName;
    // 
  }
  gobacktoEdit() {
    $('#modal-container').addClass('out');
    $('body').removeClass('modal-active');
  }
  config = {
    allowNumbersOnly: true,
    length: 4,
    isPasswordInput: false,
    disableAutoFocus: true,
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
  otpexpired = false;
  handleEvent(e: CountdownEvent) {
    if (e.action === 'done') {
      this.otpexpired = true;
    }
  }

  onOtpChange(otp) {
    var param = this.user;
    param.otp = otp;
  }
  otpsend() {
    if ($('#name').val() == "") {
      $('#name').focus().css("border-color", "red").attr('placeholder', 'Please Enter Name');
      return false;
    }
    else {
      var nameFilter = /^([a-zA-Z]+\s)*[a-zA-Z]+$/;
      if (nameFilter.test($('#name').val())) {
        $('#name').removeAttr("style");
      }
      else {
        $('#name').focus().css("border-color", "red").attr('placeholder', 'Please enter valid name').val('');
        return false;
      }
    }

    if ($('#email').val() === '') {
      $('#email').focus().css('border-color', 'red').attr('placeholder', 'Please Enter Email-id');
      return false;
    } else {
      var emai = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
      if (emai.test($('#email').val())) {
        $('#email').removeAttr('style');
      } else {
        $('#email').focus().css('border-color', 'red').attr('placeholder', 'Please enter valid email-id').val('');
        return false;
      }
    }

    if ($('#mobile').val() == "") {
      $('#mobile').focus().css("border-color", "red").attr('placeholder', 'Please Enter Phone Number');
      return false;
    }
    else {
      var mobileno = /^[0-9]{10}$/;
      if (mobileno.test($('#mobile').val())) {
        $('#mobile').removeAttr("style");
      }
      else {
        $('#mobile').focus().css("border-color", "red").attr('placeholder', 'Please enter valid contact number').val('');
        return false;
      }
    }

    this.otploader = true;
    this.getintouch();
    // $('body').addClass('bodyoverlay');
    // var param = this.user;
    // this.Service.otpsend(param).subscribe((success) => {
    //   var prestatus = success['Data'];
    //   var status = prestatus[0].MessageErrorDescription;
    //   if(status == "Success"){
    //     this.getintouch();
    //     this.countdown.begin();
    //     var buttonId = $('#one').attr('id');
    //     $('#modal-container').removeAttr('class').addClass(buttonId);
    //     $('body').addClass('modal-active');
    //     this.otploader = false;
    //     $('body').removeClass('bodyoverlay');
    //     $('#contactseller').modal('hide');
    //   }else{
    //     swal({
    //       title: 'Oops Something Error!',
    //       type: 'error',
    //       showConfirmButton: false,
    //       timer: 1500
    //     })
    //     this.otploader = false;
    //     $('body').removeClass('bodyoverlay');
    //   }
    // }, (err) => {
    //   
    // });
  }

  // otpvalidate()
  // {
  //   var otplength = 4;
  //   if ($('#otp').val() == "") {
  //     swal({
  //       title: 'Please enter the OTP!',
  //       type: 'error',
  //       showConfirmButton: false,
  //       timer: 1000
  //     })
  //     return false;
  //   }else{
  //     var liveotpcount = $('#otp').val().length;
  //     if(liveotpcount < otplength){
  //       swal({
  //         title: 'Please enter the valid OTP!',
  //         type: 'warning',
  //         showConfirmButton: false,
  //         timer: 1500
  //       })
  //       return false;
  //     }else{}
  //   }
  //   var param = this.user;
  //   this.otploader = true;
  //   $('body').addClass('bodyoverlay');
  //   this.Service.otpvalidcheck(param).subscribe((success) => {
  //     var status = success['status'];
  //     if(status == "True")
  //     {
  //       this.otploader = false;
  //       this.cancel.nativeElement.click();
  //       $('body').removeClass('bodyoverlay');
  //       swal({
  //         title: 'OTP Verified',
  //         text: 'We Will Intimate you soon!',
  //         type: 'success',
  //         showConfirmButton: false,
  //         timer: 2500
  //       });
  //       $('#modal-container').addClass('out');
  //       $('body').removeClass('modal-active');
  //       this.user.name = '';
  //       this.user.number = '';
  //       this.user.mail = '';
  //       this.user.otp = '';
  //       $('#btn_reset').click();
  //       this.countdown.restart();
  //     }else{
  //       this.otploader = false;
  //       $('body').removeClass('bodyoverlay');
  //       swal({
  //         title: 'Oops Something Error!',
  //         text: 'Its Not a valid OTP / OTP Expired!',
  //         type: 'error',
  //         showConfirmButton: false,
  //         timer: 1500
  //       })
  //     }
  //   }, (err) => {
  //     
  //   });
  // }

  getintouch() {

    var param = this.user;
    var pageorgin = this.propname1 + "-" + this.cityname + "-Compare Property";
    var pageorgin = this.propname1 + "-" + this.cityname + "-Compare Property";

    this.Service.EnqProperty(param, pageorgin, this.cityPropId).subscribe((success) => {


      if (success['status'] === 'True') {
        this.otploader = false;
        this.cancel.nativeElement.click();
        $('body').removeClass('bodyoverlay');
        swal({
          // title: 'OTP Verified',
          text: 'We Will Intimate you soon!',
          type: 'success',
          showConfirmButton: false,
          timer: 2500
        });
        $('#modal-container').addClass('out');
        $('body').removeClass('modal-active');
        this.user.name = '';
        this.user.number = '';
        this.user.mail = '';
        this.user.otp = '';
        $('#btn_reset').click();
      } else {
        swal({
          type: 'error',
          title: 'Something Went Wrong',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }, (err) => {

    });
  }







  showratingreview1() {
    this.showratingandreview = true;
    this.showratingandreview1 = false;
    this.showmaindiv = false;
  }
  showratingreview2() {
    this.showratingandreview1 = true;
    this.showratingandreview = false;
    this.showmaindiv = false;
  }
  ShowMainpage() {
    this.showmaindiv = true;
    this.showratingandreview = false;
    this.showratingandreview1 = false;
  }
  addcompareproduct1() {
    this.showcomparediv1 = true;
    this.showcomparediv2 = false;
    this.showcomparediv3 = false;
    this.showmaindiv = false;
    this.showratingandreview = false;
    this.showratingandreview1 = false;
    this.compareStorageArry = JSON.parse(localStorage.getItem('ComparePropID'));
    if (this.compareStorageArry.length == 0) {
      this.cityselect = true;
      this.defaltcityselect = false;
      this.defaltcityselectlist = false;
      this.showratingandreview = false;
      this.showratingandreview1 = false;
    } else if (this.selectedcity == null) {
      this.selectedcity = this.cityname;
      this.cityselect = false;
      this.defaltcityselect = false;
      this.defaltcityselectlist = true;
      this.showratingandreview = false;
      this.showratingandreview1 = false;
    } else {
      this.cityselect = false;
      this.defaltcityselect = true;
      this.defaltcityselectlist = false;
      this.showratingandreview = false;
      this.showratingandreview1 = false;
    }
    this.Service.getlocationlist().subscribe(citys => {
      let citynam = citys['locations'];
      for (let i = 0; i <= citynam.length; i++) {

        if (this.selectedcity == this.citiess[i].city) {
          var cityid = this.citiess[i].id;
          this.cityid = this.citiess[i].id;
          this.getclickAuto(cityid, this.proptypeID);
        }
      }
    });
  }


  addcompareproduct2() {
    this.showcomparediv1 = false;
    this.showcomparediv2 = true;
    this.showcomparediv3 = false;
    this.showmaindiv = false;
    this.showratingandreview = false;
    this.showratingandreview1 = false;
    this.compareStorageArry = JSON.parse(localStorage.getItem('ComparePropID'));
    if (this.compareStorageArry.length == 0) {
      this.cityselect = true;
      this.defaltcityselect = false;
      this.defaltcityselectlist = false;
      this.showratingandreview = false;
      this.showratingandreview1 = false;
    } else if (this.selectedcity == null) {
      this.selectedcity = this.cityname;
      this.cityselect = false;
      this.defaltcityselect = false;
      this.defaltcityselectlist = true;
      this.showratingandreview = false;
      this.showratingandreview1 = false;
    } else {
      this.cityselect = false;
      this.defaltcityselect = true;
      this.defaltcityselectlist = false;
      this.showratingandreview = false;
      this.showratingandreview1 = false;
    }
    this.Service.getlocationlist().subscribe(citys => {
      let citynam = citys['locations'];
      for (let i = 0; i <= citynam.length; i++) {

        if (this.selectedcity == this.citiess[i].city) {
          var cityid = this.citiess[i].id;
          this.getclickAuto(cityid, this.proptypeID);
        }
      }
    });
  }

  goback() {
    this.showcomparediv1 = false;
    this.showcomparediv2 = false;
    this.showcomparediv3 = false;
    this.showCompareproperty1 = false;
    this.showCompareproperty2 = false;

    this.showmaindiv = true;
    this.getlocationlist();
  }


  // declaration here
  showCompareproperty1: boolean;
  showCompareproperty2: boolean;


  onItemSelect3(selected) {
    var currentCity = selected.city;
    this.getProjectsclick3(currentCity, selected);
  }
  getProjectsclick3(currentCity, selected) {
    if (selected.type == "property_name") {
      var propertytype = selected.name;
      this.searchstring = propertytype;
      var proptype = propertytype.replace(/\s+/g, '-').toLowerCase();
      var proptypeid = selected.id;
      this.compropid2 = proptypeid;
      this.showcomparediv2 = false;
      this.showmaindiv = true;
      if ('ComparePropID1_ReSale' in this.Local_Storage) {
      } else {
        this.Local_Storage.setItem('ComparePropID1_ReSale', '[]');
      }
      const proparray = this.Local_Storage.getItem('ComparePropID1_ReSale');
      const jsonpars = JSON.parse(proparray);
      const itemToRemoveIndex = jsonpars.indexOf(this.compropid2);

      this.parsedarray = JSON.parse(proparray);
      if (itemToRemoveIndex == -1) {
        this.parsedarray.push(this.compropid2);
        this.Local_Storage.setItem('ComparePropID1_ReSale', JSON.stringify(this.parsedarray));
      } else {
        this.showcomparediv2 = true;
        this.showmaindiv = false;
        swal({
          text: 'Property Already Added',
          type: 'error',
          showConfirmButton: false,
          timer: 2000
        })
      }

      if ('ComparePropID' in this.Local_Storage) {
        this.Getcomoareprop();

      } else if ('ComparePropID1_ReSale' in this.Local_Storage) {
        this.Getcomoareprop1();
      } else {

      }

      // this.Getcomoareprop();
      // this.Getcomoareprop1();
    }
  }

  onItemSelect4(selected) {
    var currentCity = selected.city;
    this.getProjectsclick4(currentCity, selected);
  }
  getProjectsclick4(currentCity, selected) {
    if (selected.type == "property_name") {
      var propertytype = selected.name;
      this.searchstring = propertytype;
      var proptype = propertytype.replace(/\s+/g, '-').toLowerCase();
      var proptypeid = selected.id;
      this.compropid2 = proptypeid;
      this.showcomparediv2 = false;
      this.showmaindiv = true;
      if ('ComparePropID1_ReSale' in this.Local_Storage) {
      } else {
        this.Local_Storage.setItem('ComparePropID1_ReSale', '[]');
      }
      const proparray = this.Local_Storage.getItem('ComparePropID1_ReSale');
      const jsonpars = JSON.parse(proparray);
      const itemToRemoveIndex = jsonpars.indexOf(this.compropid2);

      this.parsedarray = JSON.parse(proparray);
      if (itemToRemoveIndex == -1) {
        this.parsedarray.push(this.compropid2);
        this.Local_Storage.setItem('ComparePropID1_ReSale', JSON.stringify(this.parsedarray));
      } else {
        this.showcomparediv2 = true;
        this.showmaindiv = false;
        swal({
          text: 'Property Already Added',
          type: 'error',
          showConfirmButton: false,
          timer: 2000
        })
      }

      if ('ComparePropID' in this.Local_Storage) {
        this.Getcomoareprop();

      } else if ('ComparePropID1_ReSale' in this.Local_Storage) {
        this.Getcomoareprop1();
      } else {

      }

      // this.Getcomoareprop();
      // this.Getcomoareprop1();
    }
  }

  addResaleProduct1() {

    const page = this.Local_Storage.getItem('page_type');

    if (page == 'All') {

      this.test = "compare"
      this.router.navigate(['/projects-in-' + this.cityname1.toLowerCase()], {
        relativeTo: this.activatedRoute,
        queryParams: { tab: this.test }, // Update query parameter 'tab' when a tab is clicked
        queryParamsHandling: 'merge' // Merge with existing query parameters
      });
    }

    else if (page == 'Allapartment') {

      this.test = "apartment"
      this.router.navigate(['/apartment-projects-in-' + this.cityname1.toLowerCase()], {
        relativeTo: this.activatedRoute,
        queryParams: { tab: this.test }, // Update query parameter 'tab' when a tab is clicked
        queryParamsHandling: 'merge' // Merge with existing query parameters
      });
    }

    else if (page == 'plot') {
      this.test = "plot"
      this.router.navigate(['/land-projects-in-' + this.cityname1.toLowerCase()], {
        relativeTo: this.activatedRoute,
        queryParams: { tab: this.test }, // Update query parameter 'tab' when a tab is clicked
        queryParamsHandling: 'merge' // Merge with existing query parameters
      });
    }

    else if (page == 'Villa') {
      this.test = "Villa"
      this.router.navigate(['/villa-projects-in-' + this.cityname1.toLowerCase()], {
        relativeTo: this.activatedRoute,
        queryParams: { tab: this.test }, // Update query parameter 'tab' when a tab is clicked
        queryParamsHandling: 'merge' // Merge with existing query parameters
      });
    }

  }
  addResaleProduct2() {
    const page = this.Local_Storage.getItem('page_type');

    if (page == 'All') {

      this.test = "compare"
      this.router.navigate(['/projects-in-' + this.cityname1.toLowerCase()], {
        relativeTo: this.activatedRoute,
        queryParams: { tab: this.test }, // Update query parameter 'tab' when a tab is clicked
        queryParamsHandling: 'merge' // Merge with existing query parameters
      });
    }

    else if (page == 'Allapartment') {

      this.test = "apartment"
      this.router.navigate(['/apartment-projects-in-' + this.cityname1.toLowerCase()], {
        relativeTo: this.activatedRoute,
        queryParams: { tab: this.test }, // Update query parameter 'tab' when a tab is clicked
        queryParamsHandling: 'merge' // Merge with existing query parameters
      });
    }
    else if (page == 'plot') {
      this.test = "plot"
      this.router.navigate(['/land-projects-in-' + this.cityname1.toLowerCase()], {
        relativeTo: this.activatedRoute,
        queryParams: { tab: this.test }, // Update query parameter 'tab' when a tab is clicked
        queryParamsHandling: 'merge' // Merge with existing query parameters
      });
    }
    else if (page == 'Villa') {
      this.test = "Villa"
      this.router.navigate(['/villa-projects-in-' + this.cityname1.toLowerCase()], {
        relativeTo: this.activatedRoute,
        queryParams: { tab: this.test }, // Update query parameter 'tab' when a tab is clicked
        queryParamsHandling: 'merge' // Merge with existing query parameters
      });
    }

  }

  propertyNameClick(data) {
    this.Filter.PropertyName = data[0]['propertyName'];
    this.Filter.RegionID = data[0]['RegionID'];
    this.Filter.localityid = data[0]['LoaclityId'];
    this.Filter.propid = data[0]['property_info_IDPK'];
    this.Filter.CityName = data[0]['city_name']
    this.Filter.cityid = data[0]['cityId']
    $('#otpValidate').css('display', 'block');
  }

}

