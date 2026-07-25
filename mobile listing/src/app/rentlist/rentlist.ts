import { CommonModule, isPlatformBrowser, Location } from '@angular/common';
import { AfterViewInit, Component, DOCUMENT, ElementRef, HostListener, Inject, OnDestroy, OnInit, PLATFORM_ID, QueryList, Renderer2, viewChild, ViewChild, ViewChildren, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { MatChipsModule, MatChipOption } from '@angular/material/chips';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CountdownComponent, CountdownEvent } from "ngx-countdown";
import { Observable, Subscription } from 'rxjs';
import { CityService } from '../city.service';
import { DataService } from '../data.service';
import { FilterService } from '../filter.service';
import { Enquiry } from '../home/home';
import { enquiry } from '../prop-details-new/class';
import { SafeStorageService } from '../safe-storage.service';
import { cleanUrlPipe, customPriceFormatPipe } from '../mainpipe-pipe';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
// import { InnerHeader } from '../inner-header/inner-header';
// // Swal lazy-loaded
import { NgOtpInputModule } from 'ng-otp-input';
import { InnerHeadderWithSidenav } from '../inner-headder-with-sidenav/inner-headder-with-sidenav';
import { ElitedataService } from '../elitedata.service';
import { response } from 'express';
import { AdCardsComponent } from "../ad-cards/ad-cards.component";

declare var $: any;

@Component({
  selector: 'app-rentlist',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    // MatChipsModule,
    cleanUrlPipe,
    customPriceFormatPipe,
    InnerHeadderWithSidenav,
    NgxSkeletonLoaderModule,
    NgOtpInputModule,
    CountdownComponent,
    AdCardsComponent
],
  templateUrl: './rentlist.html',
  styleUrl: './rentlist.css',
})
export class Rentlist implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('scrollAnchor', { static: false }) scrollAnchor!: ElementRef;
  @ViewChild('cancel') cancel!: ElementRef;
  readonly countdown4 = viewChild<CountdownComponent>('cd4');
  readonly ngOtpInput = viewChild<any>('ngOtpInput');


  private formatProperty(property: string) {
    return property.replace('-', ' ');
  }
  configs: any[] = [];
  user = new enquiry();
  enquiry = new Enquiry();
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
  IsVisibleEnquery!: boolean;
  plotSelect!: boolean;
  projecttype: any = [];
  Availability: any = [];
  FurnishType: any;
  FilterBYFloors: any;
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
  buildingtype: any;
  RegionType: any;
  zeroprojects = false; selectedAge: any;
  propertyId: any;
  PGprojectcount: any;
  projectcommercialcount: any;
  UserId: any;
  userRentalFavList: any = [];
  propertyIds: any = [];
  storagearrseen: any = [];
  h1Text: any;
  Matautocomplete: any;
  onlyLeased: any = 2;
  limit = 0;
  limitrows = 4;


  metaDB: any = {
    'flats': {
      h1: (city: string) => `Checkout Flats for rent in ${city}`,
      title: (city: string) => `Flats for Rent in ${city} | Affordable Homes & Apartments`,
      desc: (city: string) => `Explore affordable flats for rent in ${city}. Find furnished homes & various property options to suit your needs. Find the perfect rental homes on Homes247 today!`
    },
    'villas': {
      h1: (city: string) => `Villas for Rent in ${city}`,
      title: (city: string) => `Villas for Rent in ${city} - Find the Best Villas | Homes247`,
      desc: (city: string) => `Explore the various types of villas for rent in ${city}. Discover luxurious and affordable villa options for your perfect stay. Browse listings and book today!`
    },
    'land': {
      h1: (city: string) => `Explore Land for Rent in ${city}`,
      title: (city: string) => `Affordable Land for Rent in ${city} | Homes247.in`,
      desc: (city: string) => `Explore a wide range of land for rent in ${city} at Homes247.in. Find the perfect land for commercial or residential purposes with reasonable pricing.`
    },
    'house': {
      h1: (city: string) => `Explore Houses for Rent in ${city}`,
      title: (city: string) => `Affordable Houses for Rent in ${city} | Homes247`,
      desc: (city: string) => `Looking for a house for rent in ${city}? Visit Homes247 for a variety of listings that meet your budget and interests, ranging from affordable to luxurious.`
    },
    'independent-house': {
      h1: (city: string) => `Independent Houses for Rent in ${city}`,
      title: (city: string) => `Independent Houses for Rent in ${city} | Homes247`,
      desc: (city: string) => `Find independent houses for rent in ${city} on Homes247. Explore furnished and semi-furnished options & filter by location, price, and amenities to suit your needs.`
    },

    // Furnishing-specific (flats)
    'furnished-flats': {
      h1: (city: string) => `Furnished Flats for Rent in ${city}`,
      title: (city: string) => `Furnished Flats for Rent in ${city} - Homes247`,
      desc: (city: string) => `Find fully furnished flats for rent in ${city}. Explore 1, 2, 3 BHK apartments with amenities. Check prices, photos, and details. Book now on Homes247!`
    },
    'semi-furnished-flats': {
      h1: (city: string) => `Semi-Furnished Flats for Rent in ${city}`,
      title: (city: string) => `Semi-Furnished Flats for Rent in ${city} - Homes247`,
      desc: (city: string) => `Find semi-furnished flats for rent in ${city}. Explore a wide range of apartments, flats, and houses with amenities like AC, gym, pool, and more.`
    },
    'unfurnished-flats': {
      h1: (city: string) => `Unfurnished Flats for Rent in ${city}`,
      title: (city: string) => `Unfurnished Flats for Rent in ${city} | Homes247`,
      desc: (city: string) => `Find unfurnished flats for rent in ${city} on Homes247. Explore 1BHK, 2BHK, and 3BHK options with various amenities and prices to fit your needs.`
    },

    // Furnishing-specific (villas)
    'furnished-villas': {
      h1: (city: string) => `Furnished Villas for Rent in ${city}`,
      title: (city: string) => `Furnished Villas for Rent in ${city} - Homes247`,
      desc: (city: string) => `Find fully furnished villas for rent in ${city}. Explore luxurious and budget-friendly homes with premium amenities on Homes247.`
    },
    'semi-furnished-villas': {
      h1: (city: string) => `Semi-Furnished Villas for Rent in ${city}`,
      title: (city: string) => `Semi-Furnished Villas for Rent in ${city} - Homes247`,
      desc: (city: string) => `Find semi-furnished villas for rent in ${city}. Discover spacious layouts and premium living spaces on Homes247.`
    },
    'unfurnished-villas': {
      h1: (city: string) => `Unfurnished Villas for Rent in ${city}`,
      title: (city: string) => `Unfurnished Villas for Rent in ${city} | Homes247`,
      desc: (city: string) => `Find unfurnished villas for rent in ${city}. Explore verified listings for affordable and luxurious villas on Homes247.`
    },

    // Owner & No-brokerage (use propertyTypes mapping)
    'owner': {
      h1: (city: string, propertyLabel: string) => `${propertyLabel} for Rent in ${city} - Direct from Owners`,
      title: (city: string, propertyLabel: string) => `${propertyLabel} for Rent in ${city} - Owner Listings | Homes247`,
      desc: (city: string, propertyLabel: string) => `Find ${propertyLabel.toLowerCase()} for rent in ${city} directly from owners. Browse verified listings of ${propertyLabel.toLowerCase()} for rent in ${city}. Book your dream home now.`
    },
    'no-brokerage': {
      h1: (city: string, propertyLabel: string) => `No Brokerage ${propertyLabel} for Rent in ${city}`,
      title: (city: string, propertyLabel: string) => `No Brokerage ${propertyLabel} for Rent in ${city} | Homes247`,
      desc: (city: string, propertyLabel: string) => `Find no brokerage ${propertyLabel.toLowerCase()} for rent in ${city}. Explore a wide range of ${propertyLabel.toLowerCase()} without brokerage. Start your search now on Homes247.`
    },

    // --- BHK ENTRIES ---

    '1-rk-flats': {
      h1: (city: string) => `1-RK flats for Rent in ${city}`,
      title: (city: string) => `1-RK flats for Rent in ${city} | Homes247`,
      desc: (city: string) => `Find 1-RK flats for rent in ${city} on Homes247. Explore a variety of semi-furnished and furnished flats with amenities and locality options.`
    },

    '1-rk-villas': {
      h1: (city: string) => `1-RK villas for Rent in ${city}`,
      title: (city: string) => `1-RK villas for Rent in ${city} | Homes247`,
      desc: (city: string) => `Find 1-RK villas for rent in ${city} on Homes247. Explore a variety of semi-furnished and furnished villas with amenities and locality options.`
    },

    '1-bhk-flats': {
      h1: (city: string) => `1-BHK flats for Rent in ${city}`,
      title: (city: string) => `1-BHK flats for Rent in ${city} | Homes247`,
      desc: (city: string) => `Find 1-BHK flats for rent in ${city} on Homes247. Explore a variety of semi-furnished and furnished flats with amenities and locality options.`
    },

    '1-bhk-villas': {
      h1: (city: string) => `1-BHK villas for Rent in ${city}`,
      title: (city: string) => `1-BHK villas for Rent in ${city} | Homes247`,
      desc: (city: string) => `Find 1-BHK villas for rent in ${city} on Homes247. Explore a variety of semi-furnished and furnished villas with amenities and locality options.`
    },

    '2-bhk-flats': {
      h1: (city: string) => `2-BHK flats for Rent in ${city}`,
      title: (city: string) => `2-BHK flats for Rent in ${city} | Homes247`,
      desc: (city: string) => `Find 2-BHK flats for rent in ${city} on Homes247. Explore a variety of semi-furnished and furnished flats with amenities and locality options.`
    },

    '2-bhk-villas': {
      h1: (city: string) => `2-BHK villas for Rent in ${city}`,
      title: (city: string) => `2-BHK villas for Rent in ${city} | Homes247`,
      desc: (city: string) => `Find 2-BHK villas for rent in ${city} on Homes247. Explore a variety of semi-furnished and furnished villas with amenities and locality options.`
    },

    '3-bhk-flats': {
      h1: (city: string) => `3-BHK flats for Rent in ${city}`,
      title: (city: string) => `3-BHK flats for Rent in ${city} | Homes247`,
      desc: (city: string) => `Find 3-BHK flats for rent in ${city} on Homes247. Explore a variety of semi-furnished and furnished flats with amenities and locality options.`
    },

    '3-bhk-villas': {
      h1: (city: string) => `3-BHK villas for Rent in ${city}`,
      title: (city: string) => `3-BHK villas for Rent in ${city} | Homes247`,
      desc: (city: string) => `Find 3-BHK villas for rent in ${city} on Homes247. Explore a variety of semi-furnished and furnished villas with amenities and locality options.`
    },

    '4-bhk-flats': {
      h1: (city: string) => `4-BHK flats for Rent in ${city}`,
      title: (city: string) => `4-BHK flats for Rent in ${city} | Homes247`,
      desc: (city: string) => `Find 4-BHK flats for rent in ${city} on Homes247. Explore a variety of semi-furnished and furnished flats with amenities and locality options.`
    },

    '4-bhk-villas': {
      h1: (city: string) => `4-BHK villas for Rent in ${city}`,
      title: (city: string) => `4-BHK villas for Rent in ${city} | Homes247`,
      desc: (city: string) => `Find 4-BHK villas for rent in ${city} on Homes247. Explore a variety of semi-furnished and furnished villas with amenities and locality options.`
    },

    '5-bhk-flats': {
      h1: (city: string) => `5-BHK flats for Rent in ${city}`,
      title: (city: string) => `5-BHK flats for Rent in ${city} | Homes247`,
      desc: (city: string) => `Find 5-BHK flats for rent in ${city} on Homes247. Explore a variety of semi-furnished and furnished flats with amenities and locality options.`
    },

    '5-bhk-villas': {
      h1: (city: string) => `5-BHK villas for Rent in ${city}`,
      title: (city: string) => `5-BHK villas for Rent in ${city} | Homes247`,
      desc: (city: string) => `Find 5-BHK villas for rent in ${city} on Homes247. Explore a variety of semi-furnished and furnished villas with amenities and locality options.`
    },

    // ================ FINAL BUDGET META DB (ALL 5 PROPERTY TYPES × ALL 6 RANGES) ================

    'flats-price-under-10000': {
      h1: (city: any) => `Flats for Rent in ${city} Under Rs.10,000`,
      title: (city: any) => `Flats for Rent in ${city} under 10000 - Homes247`,
      desc: (city: any) => `Find affordable flats for rent under Rs.10,000 in ${city} on Homes247. Explore detailed listings, photos, and easy options across various localities.`
    },

    'villas-price-under-10000': {
      h1: (city: any) => `Villas for Rent in ${city} Under Rs.10,000`,
      title: (city: any) => `Villas for Rent in ${city} under 10000 - Homes247`,
      desc: (city: any) => `Discover luxurious villas for rent under Rs.10,000 in ${city}. Explore 100% verified listings of premium villas on Homes247.`
    },

    'independent-house-price-under-10000': {
      h1: (city: any) => `Independent Houses for Rent in ${city} Under Rs.10,000`,
      title: (city: any) => `Independent Houses for Rent in ${city} under 10000 - Homes247`,
      desc: (city: any) => `Find independent houses for rent under Rs.10,000 in ${city}. Explore options in prime locations for a comfortable living experience.`
    },

    'plots-price-under-10000': {
      h1: (city: any) => `Plots for Rent in ${city} Under Rs.10,000`,
      title: (city: any) => `Plots for Rent in ${city} under 10000 - Homes247`,
      desc: (city: any) => `Find plots for rent under Rs.10,000 in ${city}. Get complete details of land specifications & related amenities on Homes247.`
    },

    'house-price-under-10000': {
      h1: (city: any) => `Houses for Rent in ${city} Under Rs.10,000`,
      title: (city: any) => `Houses for Rent in ${city} under 10000 - Homes247`,
      desc: (city: any) => `Explore luxury houses for rent under Rs.10,000 in ${city}. Discover premium homes in top neighborhoods.`
    },

    'flats-price-10000-to-20000': {
      h1: (city: any) => `Flats for Rent in ${city} between Rs.10,000 to Rs.20,000`,
      title: (city: any) => `Flats for Rent in ${city} between Rs.10,000 to Rs.20,000 - Homes247`,
      desc: (city: any) => `Find affordable flats for rent between Rs.10,000 to Rs.20,000 in ${city} on Homes247. Explore detailed listings, photos, and easy options across various localities.`
    },

    'villas-price-10000-to-20000': {
      h1: (city: any) => `Villas for Rent in ${city} between Rs.10,000 to Rs.20,000`,
      title: (city: any) => `Villas for Rent in ${city} between Rs.10,000 to Rs.20,000 - Homes247`,
      desc: (city: any) => `Discover luxurious villas for rent between Rs.10,000 to Rs.20,000 in ${city}. Explore 100% verified listings of premium villas on Homes247.`
    },

    'independent-house-price-10000-to-20000': {
      h1: (city: any) => `Independent Houses for Rent in ${city} between Rs.10,000 to Rs.20,000`,
      title: (city: any) => `Independent Houses for Rent in ${city} between Rs.10k-Rs.20k`,
      desc: (city: any) => `Find independent houses for rent between Rs.10,000 to Rs.20,000 in ${city}. Explore options in prime locations for a comfortable living experience.`
    },

    'plots-price-10000-to-20000': {
      h1: (city: any) => `Plots for Rent in ${city} between Rs.10,000 to Rs.20,000`,
      title: (city: any) => `Plots for Rent in ${city} between Rs.10,000 to Rs.20,000 - Homes247`,
      desc: (city: any) => `Find plots for rent between Rs.10,000 to Rs.20,000 in ${city}. Get complete details of land specifications & related amenities on Homes247.`
    },

    'house-price-10000-to-20000': {
      h1: (city: any) => `Houses for Rent in ${city} between Rs.10,000 to Rs.20,000`,
      title: (city: any) => `Houses for Rent in ${city} between Rs.10,000 to Rs.20,000 - Homes247`,
      desc: (city: any) => `Explore luxury houses for rent between Rs.10,000 to Rs.20,000 in ${city}. Discover premium homes in top neighborhoods.`
    },

    'flats-price-20000-to-30000': {
      h1: (city: any) => `Flats for Rent in ${city} within Rs.20,000 to Rs.30,000`,
      title: (city: any) => `Flats for Rent in ${city} within Rs.20,000 to Rs.30,000 - Homes247`,
      desc: (city: any) => `Find affordable flats for rent within Rs.20,000 to Rs.30,000 in ${city} on Homes247. Explore detailed listings, photos, and easy options across various localities.`
    },

    'villas-price-20000-to-30000': {
      h1: (city: any) => `Villas for Rent in ${city} within Rs.20,000 to Rs.30,000`,
      title: (city: any) => `Villas for Rent in ${city} within Rs.20,000 to Rs.30,000 - Homes247`,
      desc: (city: any) => `Discover luxurious villas for rent within Rs.20,000 to Rs.30,000 in ${city}. Explore 100% verified listings of premium villas on Homes247.`
    },

    'independent-house-price-20000-to-30000': {
      h1: (city: any) => `Independent Houses for Rent in ${city} within Rs.20,000 to Rs.30,000`,
      title: (city: any) => `Independent Houses for Rent in ${city} within Rs.20k-Rs.30k`,
      desc: (city: any) => `Find independent houses for rent within Rs.20,000 to Rs.30,000 in ${city}. Explore options in prime locations for a comfortable living experience.`
    },

    'plots-price-20000-to-30000': {
      h1: (city: any) => `Plots for Rent in ${city} within Rs.20,000 to Rs.30,000`,
      title: (city: any) => `Plots for Rent in ${city} within Rs.20,000 to Rs.30,000 - Homes247`,
      desc: (city: any) => `Find plots for rent within Rs.20,000 to Rs.30,000 in ${city}. Get complete details of land specifications & related amenities on Homes247.`
    },

    'house-price-20000-to-30000': {
      h1: (city: any) => `Houses for Rent in ${city} within Rs.20,000 to Rs.30,000`,
      title: (city: any) => `Houses for Rent in ${city} within Rs.20,000 to Rs.30,000 - Homes247`,
      desc: (city: any) => `Explore luxury houses for rent within Rs.20,000 to Rs.30,000 in ${city}. Discover premium homes in top neighborhoods.`
    },

    'flats-price-30000-to-40000': {
      h1: (city: any) => `Flats for Rent in ${city} from Rs.30,000 to Rs.40,000`,
      title: (city: any) => `Flats for Rent in ${city} from Rs.30000 to Rs.40000 - Homes247`,
      desc: (city: any) => `Find affordable flats for rent from Rs.30000 to Rs.40000 in ${city} on Homes247. Explore detailed listings, photos, and easy options across various localities.`
    },

    'villas-price-30000-to-40000': {
      h1: (city: any) => `Villas for Rent in ${city} from Rs.30,000 to Rs.40,000`,
      title: (city: any) => `Villas for Rent in ${city} from Rs.30000 to Rs.40000 - Homes247`,
      desc: (city: any) => `Discover luxurious villas for rent from Rs.30000 to Rs.40000 in ${city}. Explore 100% verified listings of premium villas on Homes247.`
    },

    'independent-house-price-30000-to-40000': {
      h1: (city: any) => `Independent Houses for Rent in ${city} from Rs.30,000 to Rs.40,000`,
      title: (city: any) => `Independent Houses for Rent in ${city} from Rs.30k-Rs.40k`,
      desc: (city: any) => `Find independent houses for rent from Rs.30000 to Rs.40000 in ${city}. Explore options in prime locations for a comfortable living experience.`
    },

    'plots-price-30000-to-40000': {
      h1: (city: any) => `Plots for Rent in ${city} from Rs.30,000 to Rs.40,000`,
      title: (city: any) => `Plots for Rent in ${city} from Rs.30000 to Rs.40000 - Homes247`,
      desc: (city: any) => `Find plots for rent from Rs.30000 to Rs.40000 in ${city}. Get complete details of land specifications & related amenities on Homes247.`
    },

    'house-price-30000-to-40000': {
      h1: (city: any) => `Houses for Rent in ${city} from Rs.30,000 to Rs.40,000`,
      title: (city: any) => `Houses for Rent in ${city} from Rs.30000 to Rs.40000 - Homes247`,
      desc: (city: any) => `Explore luxury houses for rent from Rs.30000 to Rs.40000 in ${city}. Discover premium homes in top neighborhoods.`
    },

    'flats-price-40000-to-50000': {
      h1: (city: any) => `Flats for Rent in ${city} from Rs.40,000 to Rs.50,000`,
      title: (city: any) => `Flats for Rent in ${city} from Rs.40000 to Rs.50000 - Homes247`,
      desc: (city: any) => `Find affordable flats for rent from Rs.40000 to Rs.50000 in ${city} on Homes247. Explore detailed listings, photos, and easy options across various localities.`
    },

    'villas-price-40000-to-50000': {
      h1: (city: any) => `Villas for Rent in ${city} from Rs.40,000 to Rs.50,000`,
      title: (city: any) => `Villas for Rent in ${city} from Rs.40000 to Rs.50000 - Homes247`,
      desc: (city: any) => `Discover luxurious villas for rent from Rs.40000 to Rs.50000 in ${city}. Explore 100% verified listings of premium villas on Homes247.`
    },

    'independent-house-price-40000-to-50000': {
      h1: (city: any) => `Independent Houses for Rent in ${city} from Rs.40,000 to Rs.50,000`,
      title: (city: any) => `Independent Houses for Rent in ${city} from Rs.40k-Rs.50k - Homes247`,
      desc: (city: any) => `Find independent houses for rent from Rs.40000 to Rs.50000 in ${city}. Explore options in prime locations for a comfortable living experience.`
    },

    'plots-price-40000-to-50000': {
      h1: (city: any) => `Plots for Rent in ${city} from Rs.40,000 to Rs.50,000`,
      title: (city: any) => `Plots for Rent in ${city} from Rs.40000 to Rs.50000 - Homes247`,
      desc: (city: any) => `Find plots for rent from Rs.40000 to Rs.50000 in ${city}. Get complete details of land specifications & related amenities on Homes247.`
    },

    'house-price-40000-to-50000': {
      h1: (city: any) => `Houses for Rent in ${city} from Rs.40,000 to Rs.50,000`,
      title: (city: any) => `Houses for Rent in ${city} from Rs.40000 to Rs.50000 - Homes247`,
      desc: (city: any) => `Explore luxury houses for rent from Rs.40000 to Rs.50000 in ${city}. Discover premium homes in top neighborhoods.`
    },

    'flats-price-above-50000': {
      h1: (city: any) => `Flats for Rent in ${city} above Rs.50000`,
      title: (city: any) => `Flats for Rent in ${city} above Rs.50000 - Homes247`,
      desc: (city: any) => `Find affordable flats for rent above Rs.50000 in ${city} on Homes247. Explore detailed listings, photos, and easy options across various localities.`
    },

    'villas-price-above-50000': {
      h1: (city: any) => `Villas for Rent in ${city} above Rs.50000`,
      title: (city: any) => `Villas for Rent in ${city} above Rs.50000 - Homes247`,
      desc: (city: any) => `Discover luxurious villas for rent above Rs.50000 in ${city}. Explore 100% verified listings of premium villas on Homes247.`
    },

    'independent-house-price-above-50000': {
      h1: (city: any) => `Independent Houses for Rent in ${city} above Rs.50000`,
      title: (city: any) => `Independent Houses for Rent in ${city} above Rs.50000 - Homes247`,
      desc: (city: any) => `Find independent houses for rent above Rs.50000 in ${city}. Explore options in prime locations for a comfortable living experience.`
    },

    'plots-price-above-50000': {
      h1: (city: any) => `Plots for Rent in ${city} above Rs.50000`,
      title: (city: any) => `Plots for Rent in ${city} above Rs.50000 - Homes247`,
      desc: (city: any) => `Find plots for rent above Rs.50000 in ${city}. Get complete details of land specifications & related amenities on Homes247.`
    },

    'house-price-above-50000': {
      h1: (city: any) => `Houses for Rent in ${city} above Rs.50000`,
      title: (city: any) => `Houses for Rent in ${city} above Rs.50000 - Homes247`,
      desc: (city: any) => `Explore luxury houses for rent above Rs.50000 in ${city}. Discover premium homes in top neighborhoods.`
    },




  };


  constructor(
    private activeroute: ActivatedRoute,
    private router: Router,
    private _location: Location,
    public cityservice: CityService,
    public Service: DataService, private titleService: Title, private meta: Meta,
    private fb: FormBuilder,
    private Filter: FilterService,
    private eliteService: ElitedataService,
    private renderer: Renderer2, private elRef: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object,
    private storage: SafeStorageService,
    @Inject(DOCUMENT) private doc,
    private cdr: ChangeDetectorRef,
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
  }
  window!: Window;
  loginidNew: any
  login: boolean = false
  userId: any
  userNumber: any
  contactedList: any
  ngOnInit() {
    this.GetRentalList();
    this.getlocality()
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

  sortShowHide!: boolean;

  ShowHideSort() {
    this.sortShowHide = this.sortShowHide ? false : true;
  }


  private async getSwal() {
    const { default: Swal } = await import('sweetalert2');
    return Swal;
  }






  selectedSortValue: number | null = null;
  onSortChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.selectedSortValue = +value; // Convert string to number and store
    // console.log('Selected Sort Value:', this.selectedSortValue);
    this.GetRentalList();
  }

  // Pradeesh
  isInWishlist(propertyID: number): boolean {
    const userId = this.storage?.getItem('userID');
    if (userId) {
      this.storagearr = this.propertyIds
      // this.storagearr.push(this.userFavListthis.storage);
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
    this.buildConfigs();
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

  calculateDate(daysToAdd: number): string {
    const date = new Date();
    date.setDate(date.getDate() + daysToAdd);
    return date.toISOString().split('T')[0];
  }
  lessDepositeAmt: any;
  LowBudgetData: any;
  area_max: any;
  area_min: any;
  amenityId: any = [];

  // Injects <link rel="preload"> into <head> for first 2 cover images.
  // Eliminates the "resource load delay" in LCP breakdown.
  private preloadFirstCoverImages(propertylists: any[]): void {
    if (!isPlatformBrowser(this.platformId) || !propertylists?.length) return;

    const head = this.doc.head;

    // Remove stale preloads on filter/sort change
    head.querySelectorAll('link[data-rentlist-preload]').forEach((el: any) => el.remove());

    const NO_IMAGE_URL =
      'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_mobile/images/noimage/Updated_No_Image.jpg?width=272&height=160';

    propertylists.slice(0, 2).forEach((item: any, index: number) => {
      const preloadLink = this.doc.createElement('link');
      preloadLink.rel = 'preload';
      preloadLink.as = 'image';
      preloadLink.href = item.Coverimage ? this.coverimage + item.Coverimage : NO_IMAGE_URL;
      preloadLink.setAttribute('fetchpriority', index === 0 ? 'high' : 'auto');
      preloadLink.setAttribute('data-rentlist-preload', 'true');

      if (head.firstChild) {
        head.insertBefore(preloadLink, head.firstChild);
      } else {
        head.appendChild(preloadLink);
      }
    });
  }

  GetRentalList() {
    Rentlist.citycount = -4;

    this.showloader = true;
    this.routeSub = this.activeroute.params.subscribe(params => {
      var citiname = params['house-for-rent-in-:cityname'];
      var indexCity = citiname.split('-').pop()

      var value = this.cityservice.cityfinder(this.router.url);
      this.currentCity = value.cityname;
      var UrlcurrentCity = this.currentCity.toLowerCase().replace(/\s+/g, '-');
      this.city = value.cityname.toLowerCase();
      this.activeroute.queryParamMap.subscribe((params: any) => {
        if (params['params']) {
          if (params['params']) {
            if (params['params']['propertytype']) {
              this.projecttype = params['params']['propertytype'];
            }
            if (params['params']['floorbyid']) {
              this.FilterBYFloors = params['params']['floorbyid'];
            }
            if (params['params']['localityid']) {
              this.localityData = params['params']['localityid'];
            }
            if (params['params']['bedroom']) {
              this.bhkarray = params['params']['bedroom'];
            }
            if (params['params']['bathroom']) {
              this.bathroomarray = params['params']['bathroom'];
            }
            if (params['params']['min']) {
              this.minbudget_IDPK = params['params']['min'];
            }
            if (params['params']['max']) {
              this.maxbudget_IDPK = params['params']['max'];
            }
            if (params['params']['sqftmin']) {
              this.area_min = params['params']['sqftmin'];
            }
            if (params['params']['sqftmax']) {
              this.area_max = params['params']['sqftmax'];
            }
            if (params['params']['balcony']) {
              this.balconyarray = params['params']['balcony'];
            }
            if (params['params']['furnish']) {
              this.FurnishType = params['params']['furnish'];
            }
            if (params['params']['furnish']) {
              this.FurnishType = params['params']['furnish'];
            }
            if (params['params']['postedby']) {
              this.postedBy = params['params']['postedby'];
            }
            if (params['params']['doorfacing']) {
              this.doorfacings = params['params']['doorfacing'];
            }
            if (params['params']['tenants']) {
              this.TenantType = params['params']['tenants'];
            }
            if (params['params']['fromdate']) {
              this.todaydate = params['params']['fromdate'];
            }
            if (params['params']['available']) {
              this.futuredate = params['params']['available'];
            }
            if (params['params']['amenities']) {
              this.amenityId = params['params']['amenities'];
            }
            if (params['params']['propertyage']) {
              this.selectedAge = params['params']['propertyage'];
            }
            if (params['params']['lessDeposite']) {
              this.lessDepositeAmt = params['params']['lessDeposite'];
            }
            if (params['params']['LowBudget']) {
              this.LowBudgetData = params['params']['LowBudget'];
            }
            if (params['params']['leased']) {
              this.onlyLeased = params['params']['leased'];
            }


          }
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
        }
      });

      const propertyTypesMap: { [key: string]: string } = {
        'house': '0',
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
        { urlPart: '?LowBudget=10000', min: '1000', max: '10000', lessDepositeAmt: undefined },
        { urlPart: '?lessDeposite=80000', lessDepositeAmt: '80000', min: undefined, max: undefined },
        { urlPart: '-price-under-10000', min: '1000', max: '10000', lessDepositeAmt: undefined },
        { urlPart: '-price-10000-to-20000', min: '10000', max: '20000', lessDepositeAmt: undefined },
        { urlPart: '-price-20000-to-30000', min: '20000', max: '30000', lessDepositeAmt: undefined },
        { urlPart: '-price-30000-to-40000', min: '30000', max: '40000', lessDepositeAmt: undefined },
        { urlPart: '-price-40000-to-50000', min: '40000', max: '50000', lessDepositeAmt: undefined },
        { urlPart: '-price-above-50000', min: '50000', max: '1500000', lessDepositeAmt: undefined }
      ];


      let isValidUrl = false;

      Object.keys(propertyTypesMap).forEach(type => {
        if (this.router.url.split('&utm_source')[0] === `/rent/${type}-for-rent-in-${UrlcurrentCity}`) {
          if (!this.projecttype.includes(propertyTypesMap[type])) {
            this.projecttype.push(propertyTypesMap[type]);
          }
          isValidUrl = true;
        } else {
          budgetRanges.forEach(range => {
            if (this.router.url.split('&utm_source')[0] === `/rent/${type}-for-rent-in-${UrlcurrentCity}${range.urlPart}`) {
              if (!this.projecttype.includes(propertyTypesMap[type])) {
                this.projecttype.push(propertyTypesMap[type]);
              }
              this.minbudget_IDPK = range.min;
              this.maxbudget_IDPK = range.max;
              this.lessDepositeAmt = range.lessDepositeAmt;
              isValidUrl = true;
            }
          });
        }
      });

      Object.keys(propertyTypesMap1).forEach(type => {
        Object.keys(bhkMap).forEach(bhk => {
          const bhkUrl = `/rent/${bhk}-${type}-for-rent-in-${UrlcurrentCity}`;
          if (this.router.url.split('&utm_source')[0] === bhkUrl) {
            if (!this.projecttype.includes(propertyTypesMap[type])) {
              this.projecttype.push(propertyTypesMap[type]);
            }
            this.bhkarray = [bhkMap[bhk]];
            isValidUrl = true;
          }
        });
      });

      Object.keys(propertyTypesMap1).forEach(type => {
        Object.keys(Furnishing_Type).forEach(furtype => {
          const bhkUrl = `/rent/${furtype}-${type}-for-rent-in-${UrlcurrentCity}`;
          if (this.router.url.split('&utm_source')[0] === bhkUrl) {
            if (!this.projecttype.includes(propertyTypesMap[type])) {
              this.projecttype.push(propertyTypesMap[type]);
            }
            isValidUrl = true;
          }
        });
      });

      Object.keys(propertyTypesMap).forEach(type => {
        const Url = `/rent/no-brokerage-${type}-for-rent-in-${UrlcurrentCity}`;
        const Url2 = `/rent/${type}-for-rent-from-owners-in-${UrlcurrentCity}`;
        if (this.router.url.split('&utm_source')[0] === Url) {
          if (!this.projecttype.includes(propertyTypesMap[type])) {
            this.projecttype.push(propertyTypesMap[type]);
          }
          this.postedBy = '654825';
          isValidUrl = true;
        } else if (this.router.url.split('&utm_source')[0] === Url2) {
          if (!this.projecttype.includes(propertyTypesMap[type])) {
            this.projecttype.push(propertyTypesMap[type]);
          }
          this.postedBy = '654825';
          isValidUrl = true;
        }
      });


      const currentUrl = this.router.url;
      if (currentUrl.includes('?furnish')) {
        isValidUrl = true;
      } else if (currentUrl.includes('?tenants')) {
        isValidUrl = true;
      } else if (currentUrl.includes('?LowBudget')) {
        isValidUrl = true;
      } else if (currentUrl.includes('?immediateAvailDate')) {
        isValidUrl = true;
      } else if (currentUrl.includes('?lessDeposite')) {
        isValidUrl = true;
      } else if (currentUrl.includes('?utm_source')) {
        isValidUrl = true;
      } else if (currentUrl.includes('?propertytype')) {
        isValidUrl = true;
      } else if (currentUrl.includes('?localityid')) {
        isValidUrl = true;
      } else if (currentUrl.includes('?bedroom')) {
        isValidUrl = true;
      } else if (currentUrl.includes('?bathroom')) {
        isValidUrl = true;
      } else if (currentUrl.includes('?min')) {
        isValidUrl = true;
      } else if (currentUrl.includes('?max')) {
        isValidUrl = true;
      } else if (currentUrl.includes('?sqftmin')) {
        isValidUrl = true;
      } else if (currentUrl.includes('?sqftmax')) {
        isValidUrl = true;
      } else if (currentUrl.includes('?balcony')) {
        isValidUrl = true;
      } else if (currentUrl.includes('?furnish')) {
        isValidUrl = true;
      } else if (currentUrl.includes('?postedby')) {
        isValidUrl = true;
      } else if (currentUrl.includes('?doorfacing')) {
        isValidUrl = true;
      } else if (currentUrl.includes('?tenants')) {
        isValidUrl = true;
      } else if (currentUrl.includes('?fromdate')) {
        isValidUrl = true;
      } else if (currentUrl.includes('?available')) {
        isValidUrl = true;
      } else if (currentUrl.includes('?amenities')) {
        isValidUrl = true;
      } else if (currentUrl.includes('?propertyage')) {
        isValidUrl = true;
      } else if (currentUrl.includes('?floorbyid')) {
        isValidUrl = true;
      } else if (currentUrl.includes('?leased')) {
        isValidUrl = true;
      };

      if (!isValidUrl) {
        this.router.navigate(['/404'], { skipLocationChange: true });
      }

      // var limit = 0;
      this.limit = 0;
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
      var floorid = this.FilterBYFloors

      var param = {
        limit: this.limit,
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
        buildingtype: this.buildingtype,
        sort: this.selectedSortValue,
        regionid: this.RegionType,
        depositLimit: this.lessDepositeAmt,
        area_min: this.area_min,
        area_max: this.area_max,
        propertyage: this.selectedAge,
        floorid: this.FilterBYFloors,
        amenityId: this.amenityId,
        only_lease: this.onlyLeased
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
        if (this.projectcount < 4) {
          this.showloader = false;
        }
      })
      this.Service.getrentalList(this.city, param).subscribe((lists: any) => {
        this.otploader = true
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



    });
    const userId = this.storage?.getItem('userID');
    if (userId) {
      this.UserId = this.storage?.getItem('userID');

      if ('rentalPropertyID' in this.storage) {

      } else {
        this.storage.setItem('rentalPropertyID', '[]');
      }

      this.Service.getUserWishListByIdTest(this.UserId, 3).subscribe(userFavList => {
        this.userRentalFavList = userFavList['favouritelist'];
        this.propertyIds = this.userRentalFavList.map((item: any) => item.propertyId) || [];



      });



    } else {
      if ('rentalPropertyID' in this.storage) {
        this.storagearr = JSON.parse(this.storage?.getItem('rentalPropertyID')!);
      } else {
        this.storage.setItem('rentalPropertyID', '[]');
        this.storagearr = JSON.parse(this.storage?.getItem('rentalPropertyID')!);
      }
    }

    if ('rentalSeenPropertyID' in this.storage) {
      this.storagearrseen = JSON.parse(this.storage?.getItem('rentalSeenPropertyID')!);

    } else {
      this.storage.setItem('rentalSeenPropertyID', '[]');
      this.storagearrseen = JSON.parse(this.storage?.getItem('rentalSeenPropertyID')!);
    }

  }

  countApis() {

    var paramInd = {};

    this.Service.getindividualprojectscount(this.city, paramInd).subscribe(projectcounts => {
      let projectcount = projectcounts['Counts'];

      this.propertiescount = projectcount[0].PropertyCounts;
    });

    this.Service.getprojectscount(this.city, paramInd).subscribe((projectcount) => {
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


  // ------------------------Pradeesh-----------------------------


  onScrollOnce: boolean = true
  Mousemovement: boolean = false
  // @HostListener('window:scroll', [])
  @HostListener('touchstart', [])
  onWindowScroll() {

    if (this.onScrollOnce) {
      this.Mousemovement = true
      this.onScrollOnce = false
      this.coverimage = this.Service.RentCoverImage;

      import('../mat-autocomplete-new/mat-autocomplete-new')
        .then(c => {
          this.Matautocomplete = c.MatAutocompleteNew;
        });


    }

  }

  shareContent(data: any) {
    if ((window.navigator as any).share) {
      if (data.propertyype != 'Plot') {
        (window.navigator as any)
          .share({
            title: "Homes247.in",
            text: 'Check out this amazing Property!',
            url: 'https://www.homes247.in/rentals/' + data.BHK.toLowerCase().replace(/\s+/g, '-') + '-' + data.PropertyType.toLowerCase().replace(/\s+/g, '-') + '-for-rent-in-' + data.Locality.toLowerCase().replace(/\s+/g, '-') + '-' + data.City.toLowerCase().replace(/\s+/g, '-') + '-at-' + data.PropertyName.toLowerCase().replace(/\s+/g, '-') + '-' + data.PropertyID, // Your URL here
          })
          .then(() => console.log('Shared Successfully'))
          .catch((error: any) => console.error('Error sharing:', error));

      } else {
        (window.navigator as any)
          .share({
            title: "Homes247.in",
            text: 'Check out this amazing Property!',
            url: 'https://www.homes247.in/rentals/' + data.PropertyArea.toLowerCase().replace(/\s+/g, '-') + 'acres-' + data.PropertyType.toLowerCase().replace(/\s+/g, '-') + '-for-rent-in-' + data.Locality.toLowerCase().replace(/\s+/g, '-') + '-' + data.City.toLowerCase().replace(/\s+/g, '-') + '-at-' + data.PropertyName.toLowerCase().replace(/\s+/g, '-') + '-' + data.PropertyID, // Your URL here
          })
          .then(() => console.log('Shared Successfully'))
          .catch((error: any) => console.error('Error sharing:', error));
      }

    } else {
      console.log('Web Share API not supported on this device.');
    }
  }



  private observer: IntersectionObserver | null = null;

  ngAfterViewInit() {
    this.countApis();
    this.initIntersectionObserver();
    this.onresize();
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
    // if (isPlatformBrowser(this.platformId)) {
    //   $('.head_sticky').css('padding-bottom', '54px');
    // }
    (document.querySelector('.head_sticky') as HTMLElement)?.style.setProperty('padding-bottom', '54px');

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
    this.cdr.detectChanges();



  }



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

  loadMore() {
    // alert('gifbifi')
    this.showloader = true;
    this.routeSub = this.activeroute.params.subscribe(params => {
      let totalcount = this.projectcount;
      const limit = Rentlist.citycount += 4;
      var limitrows = 4;
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
      var floorid = this.FilterBYFloors



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
        buildingtype: this.buildingtype,
        sort: this.selectedSortValue,
        regionid: this.RegionType,
        depositLimit: this.lessDepositeAmt,
        area_min: this.area_min,
        area_max: this.area_max,
        propertyage: this.selectedAge,
        floorid: this.FilterBYFloors,
        only_lease: this.onlyLeased


      }

      let livecount = this.propertylists?.length || 0;
      if (livecount < totalcount) {
        if (isPlatformBrowser(this.platformId)) {
          // $('.search-results').css('padding-bottom', '88px');
        }
        (document.querySelector('.search-results') as HTMLElement)?.style.setProperty('padding-bottom', '88px');
        return this.Service.getrentalList(this.city, param).subscribe(propertylists => {
          var status = propertylists['status'];
          if (status == "False") {
            // alert('hai')
            this.showloader = false;
            if (isPlatformBrowser(this.platformId)) {
              // $('.search-results').css('padding-bottom', '88px');
            }
            (document.querySelector('.search-results') as HTMLElement)?.style.setProperty('padding-bottom', '88px');
          } else {
            // alert('hai')
            // this.propertylists = this.propertylists.concat(propertylists['listings']);
            const newData = propertylists['listings'] || [];

            const uniqueData = newData.filter(
              (newItem: any) =>
                !this.propertylists.some(
                  (oldItem: any) => oldItem.PropertyID === newItem.PropertyID
                )
            );

            this.propertylists = [...this.propertylists, ...uniqueData];
          }
        });
      } else {
        this.showloader = false;
      }
      // this.Service.getRentprojectscount(this.city, param).subscribe(countprojects => {
      //   let projectcount = countprojects['Counts'];
      //   this.projectcount = projectcount[0].PropertyCounts;
      // });
    });
  }



  //  filter function
  ShowHideFilter() {
    this.Service.mouseenterservice5();
    setTimeout(() => {
      if (document.getElementById('FirstCityModal')?.classList.contains('show') || $('#filterModal').hasClass('show') || $('#SecondCityModal').hasClass('show')) {
        // $('.head_stick').css('display', 'none');
        (document.querySelector('.head_stick') as HTMLElement)?.style.setProperty('display', 'none');
      } else {
        // $('.head_stick').css('display', 'block'); // Show again when no modal is open
        (document.querySelector('.head_stick') as HTMLElement)?.style.setProperty('display', 'block');


      }
    }, 300);
    // $('#filterModal').modal('show');
    const modal = (window as any).bootstrap?.Modal.getOrCreateInstance(document.getElementById('filterModal'));
    modal?.show();

    window.scroll(0, 0);

  }




  checkBox: boolean = false;
  contactButton: boolean = false;
  RequestButton: boolean = false;
  resquestImages: boolean = false;
  resquestCall: boolean = false;

  propUserIDFK: any;

  ShowHideEnquery(bhk: any, proptype: any, propname: any, data: any, Localityid: any) {
    this.Homes247NewBlackLogo = true

    this.localityid = Localityid;

    this.propbhk = bhk;
    this.proptype = proptype;
    this.propname = propname;
    this.propUserIDFK = data;
    this.IsVisibleEnquery = this.IsVisibleEnquery ? false : true;



    // $('.form-field__input').removeAttr('style');
    (document.querySelector('.form-field__input') as HTMLElement)?.removeAttribute('style');

    // $('#uname').attr('placeholder', 'Username');
    // $('#uemail').attr('placeholder', 'Email');
    // $('#unumber').attr('placeholder', '+91');
    document.getElementById('uname')?.setAttribute('placeholder', 'Username');
    document.getElementById('uemail')?.setAttribute('placeholder', 'Email');
    document.getElementById('unumber')?.setAttribute('placeholder', '+91');


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
  otpsend() {
    if ($('#uname').val() == "") {
      $('#uname').focus().css('border-bottom', '1px solid red').attr('placeholder', 'Please Enter Name');
      return false;
    }
    else {
      var enameFilter = /^([a-zA-Z]+\s)*[a-zA-Z]+$/;
      if (enameFilter.test($('#uname').val())) {
        $('#uname').removeAttr("style");
      }
      else {
        $('#uname').focus().css('border-bottom', '1px solid red').attr('placeholder', 'Please enter valid name').val('');
        return false;
      }
    }
    if ($('#unumber').val() == "") {
      $('#unumber').focus().css('border-bottom', '1px solid red').attr('placeholder', 'Please Enter Phone Number');
      return false;
    }
    else {
      var mobilee = /^[0-9]{10}$/;
      if (mobilee.test($('#unumber').val())) {
        $('#unumber').removeAttr("style");
      }
      else {
        $('#unumber').focus().css('border-bottom', '1px solid red').attr('placeholder', 'Please enter valid contact number').val('');
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



    this.otploader = true;
    this.SubmitForm();


  }
  countdownconfig = {
    leftTime: 60,
    demand: true
  };
  goback1() {
    $('.OtpDiv').css('display', 'none');
    $('.enqiery').css('display', 'block');
    this.numberLogIn = true;

    // this.countdownconfig = {
    //   leftTime: 60,
    //   demand: true
    // };
    this.countdown4().restart();
    // this.countdown4.begin();
    this.otpValidating = false;

  }
  handleEvent(e: CountdownEvent) {
    if (e.action === 'done') {
      $('.countdown_maindiv').css('display', 'none');
      $('.otpexpireclass').css('display', 'block');
    }
  }

  async onOtpChange(otp: any) {
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
        this.otpUserLoginNewAPI();

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
      // console.log('Connection Failed');
    });
  }


  otpUserLoginNewAPI() {
    if (this.user.name === undefined) {
      this.user.name = 'Guest User';
      var param = this.user;
    } else {
      var param = this.user;
    }
    this.Service.userLoginWithOtpNewAPI(param).subscribe(async responce => {
      if (responce['status'] === 'True') {
        localStorage.setItem('loginID', '1');
        const Swal = await this.getSwal();
        Swal.fire({
          title: 'Login successfully',
          text: '',
          icon: 'success',
          showConfirmButton: false,
          timer: 2000
        });

        this.userDetails = responce['UserDetails'];

        if (typeof (Storage) !== 'undefined') {
          // Store
          localStorage.setItem('userName', this.userDetails[0]['user_name']);
          localStorage.setItem('userID', this.userDetails[0]['reg_IDPK']);
          localStorage.setItem('userEmail', this.userDetails[0]['user_email']);
          localStorage.setItem('userNumber', this.userDetails[0]['number']);
          // Retrieve
          this.UserName = localStorage.getItem('userName');
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
          var param = {
            userid: userid,
            propid: this.seenproparr
          };
          if (this.seenproparr.length === 0) { } else {
            this.Service.addUserSeenProjects(param).subscribe(response => {
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
          let param = {
            userid: userid,
            propid: this.storagearr
          };
          if (this.storagearr.length === 0) { } else {
            this.Service.addfavaourite(param).subscribe(response => {
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
        window.history.back();
        // window.location.href = '/';
        // this.router.navigate(['/postproperty']);
      } else { }
    });
  }

  seenproparr = [];

  async otpHandle() {
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
      // console.log('Connection Failed');
    });
  }


  otpexpired = false;
  userDetails: any = [];
  UserName: any;
  UserEmail: any;
  UserNumber: any;

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
  async otpBasedLogin1() {
    const paramNum = {
      number: this.enquiry.number
    }
    this.countdownconfig = {
      leftTime: 60,
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


      } else {
        const Swal = await this.getSwal();
        Swal.fire({
          title: 'Oops Something Error!',
          icon: 'error',
          showConfirmButton: false,
          timer: 1500
        });
      }
    },
      (err: any) => {
        console.log('Connection Failed');
      });



  }
  Homes247NewBlackLogo: boolean = false

  ShowHideEnquery1(proparea: any, PropertyID: any, propname: any, data: any, Localityid: any, PropertyType: any) {
    this.Homes247NewBlackLogo = true

    this.localityid = Localityid;
    this.proparea = proparea;
    this.propertyId = PropertyID
    // this.propareatype = propareatype;
    this.proptype = PropertyType;
    this.propname = propname;
    this.propUserIDFK = data;

    this.IsVisibleEnquery = this.IsVisibleEnquery ? false : true;
    $('.enqiery').css('display', 'block');
    $('.OtpDiv').css('display', 'none');

    // $('.form-field__input').removeAttr('style');
    (document.querySelector('.form-field__input') as HTMLElement)?.removeAttribute('style');

    // $('#uname').attr('placeholder', 'Username');
    // $('#uemail').attr('placeholder', 'Email');
    // $('#unumber').attr('placeholder', '+91');
    document.getElementById('uname')?.setAttribute('placeholder', 'Username');
    document.getElementById('uemail')?.setAttribute('placeholder', 'Email');
    document.getElementById('unumber')?.setAttribute('placeholder', '+91');


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
  localityid: any;
  contactedRentalarr: any = [];

  async SubmitForm() {
    this.otploader = true;

    var param = this.enquiry;
    this.enquiry.localityId = this.localityid;
    this.enquiry.propertyid = this.propertyId;
    const varient = 'varient';
    if (this.proptype !== 'Plot') {
      var propertyname = this.propname;
      this.propertyenquire = this.proparea + ' ' + this.proptype + '-' + propertyname;
    }
    if (this.proptype === 'Plot') {
      var propertyname = this.propname;
      this.propertyenquire = this.proparea + ' ' + this.proptype + '-' + propertyname;
    }

    this.Service.rentalsenq(param, this.propertyenquire, propertyname, this.propUserIDFK).subscribe(async (success: any) => {
      if (success['status'] === 'True') {
        this.otploader = false;
        if (success['code'] === "3") {
          this.otpHandle();

        } else {
          const Swal = await this.getSwal();
          Swal.fire({
            text: 'We Will Intimate you soon!',
            icon: 'success',
            showConfirmButton: false,
            timer: 2500
          });
          this.IsVisibleEnquery = false;
          if ('contactedRentalPropId' in this.storage) {
            this.contactedRentalarr = JSON.parse(this.storage?.getItem('contactedRentalPropId') || '[]');
          } else {
            this.contactedRentalarr = [];
          }
          if (!this.contactedRentalarr.includes(this.propertyId)) {
            this.contactedRentalarr.push(this.propertyId);
            this.storage.setItem('contactedRentalPropId', JSON.stringify(this.contactedRentalarr));
          }
        }
        $('body').removeClass('bodyoverlay');

        this.enquiry.verification = 1;
      } else {
        this.otploader = false;
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



  // ---Pradeesh---

  // @ViewChildren(MatChipOption) chips!: QueryList<MatChipOption>;
  registerForm!: FormGroup;
  filterShowHide!: boolean;



  onresize() {
    if (window.innerWidth <= 360) {
      this.Tenant = "TENANT TYPE";
      this.availability_text = "AVAILABILITY"
    } else {
      this.Tenant = "PREFERRED TENANT";
      this.availability_text = "AVAILABLE FROM";

    }
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



  transitionEnd(event: any) {
    var dv: any = document.getElementById("floatinglink");
    var dvStyle = dv.getAttribute('style');
    if (dvStyle?.indexOf("translateX(-584%)") > -1) {
      // $('.floating-link').css('width', '216px');
      const fl = this.elRef.nativeElement.querySelector('.floating-link');
      this.renderer.setStyle(fl, 'width', '216px');
      $('.border_div').css('opacity', '1');
      $('#floating_img').css('display', 'none');

    }
  }
  private popupJustOpened = false;
  selectedIndex: number | null = null;
  selectedItem: any = null;
  private clickListener!: () => void;
  showPopup(index: number) {
    // $('.agreementPopup').css('display', 'block');
    const popup = this.elRef.nativeElement.querySelector('.agreementPopup');
    this.renderer.setStyle(popup, 'display', 'block');
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
    // $('.agreementPopup').css('display', 'none');
    const popup = this.elRef.nativeElement.querySelector('.agreementPopup');
    this.renderer.setStyle(popup, 'display', 'none');
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
  }

  // Pradeesh meta data

  citySlug: any;

  furnishingTypes = ['furnished', 'semi-furnished', 'unfurnished'];
  propertyTypes = ['flats', 'villas', 'house', 'independent-house', 'plots'];
  propertyTypes1 = ['flats', 'villas'];
  bhkbased = ['1-rk', '1-bhk', '2-bhk', '3-bhk', '4-bhk', '5-bhk'];
  budgetbased = ['-price-under-10000', '-price-10000-to-20000', '-price-20000-to-30000', '-price-30000-to-40000', '-price-40000-to-50000', '-price-above-50000']

  buildConfigs() {
    const value = this.cityservice.cityfinder(this.router.url);
    this.currentCity = value.cityname;
    const UrlcurrentCity = this.currentCity.toLowerCase().replace(/\s+/g, '-');
    // this.city = value.cityname.toLocaleLowerCase();
    const rawCity = value.cityname.trim();
    // URL slug
    this.citySlug = rawCity.toLowerCase().replace(/\s+/g, '-');
    // Proper case for meta
    this.city = rawCity.charAt(0).toUpperCase() + rawCity.slice(1).toLowerCase();

    // 
    this.configs = [];


    // propertyTypes (city-based)
    this.propertyTypes.forEach(property => {
      const meta = this.metaDB[property] || {
        h1: (c: string) => `${this.formatProperty(property)} for Rent in ${c}`,
        title: (c: string) => `${this.formatProperty(property)} for Rent in ${c} | Homes247`,
        desc: (c: string) => `Find ${this.formatProperty(property)} for rent in ${c} on Homes247.`
      };

      this.configs.push({
        key: `rent/${property}-for-rent-in-${this.citySlug}`,
        h1: meta.h1(this.city),
        title: meta.title(this.city),
        desc: meta.desc(this.city),
        ogTitle: meta.title(this.city),
        ogDesc: meta.desc(this.city)
      });
    });

    // Furnishing Based (Only Flats & Villas)
    this.furnishingTypes.forEach(furnish => {
      this.propertyTypes1.forEach(property => {
        const dbKey = `${furnish}-${property}`;
        const meta = this.metaDB[dbKey];
        if (meta) {
          this.configs.push({
            key: `rent/${dbKey}-for-rent-in-${this.citySlug}`,
            h1: meta.h1(this.city),
            title: meta.title(this.city),
            desc: meta.desc(this.city),
            ogTitle: meta.title(this.city),
            ogDesc: meta.desc(this.city)
          });
        }
      });
    });

    this.propertyTypes1.forEach(property => {
      this.bhkbased.forEach(bhk => {
        const dbKey = `${bhk}-${property}`;   // Example: "1-bhk-flats"
        const meta = this.metaDB[dbKey];

        if (meta) {
          this.configs.push({
            key: `rent/${dbKey}-for-rent-in-${this.citySlug}`,
            h1: meta.h1(this.city),
            title: meta.title(this.city),
            desc: meta.desc(this.city),
            ogTitle: meta.title(this.city),
            ogDesc: meta.desc(this.city)
          });
        }
      });
    });

    // Budget Based (All Property Types)
    this.propertyTypes.forEach(property => {
      this.budgetbased.forEach(budget => {

        // Remove leading "-" from budget to match metaDB keys
        const budgetKey = budget.replace(/^-/, "");
        const dbKey = `${property}-${budgetKey}`;

        const meta = this.metaDB[dbKey] || null;

        const key = `rent/${property}-for-rent-in-${this.citySlug}${budget}`;

        if (meta) {
          this.configs.push({
            key,
            h1: meta.h1(this.city),
            title: meta.title(this.city),
            desc: meta.desc(this.city),
            ogTitle: meta.title(this.city),
            ogDesc: meta.desc(this.city)
          });
        }
      });
    });


    // Owner & No-brokerage for ALL propertyTypes
    this.propertyTypes.forEach(property => {
      const label = this.formatProperty(property);
      // owner
      const ownerMeta = this.metaDB['owner'];
      this.configs.push({
        key: `rent/${property}-for-rent-from-owners-in-${this.citySlug}`,
        h1: ownerMeta.h1(this.city, label),
        title: ownerMeta.title(this.city, label),
        desc: ownerMeta.desc(this.city, label),
        ogTitle: ownerMeta.title(this.city, label),
        ogDesc: ownerMeta.desc(this.city, label)
      });

      // no-brokerage
      const nbMeta = this.metaDB['no-brokerage'];
      this.configs.push({
        key: `rent/no-brokerage-${property}-for-rent-in-${this.citySlug}`,
        h1: nbMeta.h1(this.city, label),
        title: nbMeta.title(this.city, label),
        desc: nbMeta.desc(this.city, label),
        ogTitle: nbMeta.title(this.city, label),
        ogDesc: nbMeta.desc(this.city, label)
      });
    });
    this.updateMetaTags(this.currentCity, this.router.url);
  }

  updateMetaTags(currentCity: string, currentUrl: string) {
    const url = currentUrl;
    this.configs.forEach(cfg => {
      const pattern = cfg.key.replace('*', '([a-zA-Z0-9-]+)');
      const regex = new RegExp(pattern);

      if (regex.test(url)) {
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