import { CommonModule, DatePipe, isPlatformBrowser, Location, TitleCasePipe } from '@angular/common';
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
import { cleanUrlPipe, customPriceFormatPipe } from '../mainpipe-pipe';
// import { InnerHeader } from '../inner-header/inner-header';
import { SafeStorageService } from '../safe-storage.service';
// Swal lazy-loaded
// import { InnerHeader } from '../inner-header/inner-header';
import { InnerHeadderWithSidenav } from '../inner-headder-with-sidenav/inner-headder-with-sidenav';
import { ElitedataService } from '../elitedata.service';
import { AdCardsComponent } from "../ad-cards/ad-cards.component";
// import { enquiry } from '../prop-details/class';
// import { PipeModule } from '../pipe/pipe.module';
// import { Shared3Module } from '../shared/shared.module3';

// declare var swal: any;
declare var $: any;

@Component({
  selector: 'app-commercial-locality',
  templateUrl: './commercial-locality.html',
  styleUrls: ['./commercial-locality.css'],
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
    InnerHeadderWithSidenav,
    cleanUrlPipe,
    customPriceFormatPipe,
    CountdownComponent,
    AdCardsComponent
],
})
export class CommercialLocality implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('scrollAnchor', { static: false }) scrollAnchor!: ElementRef;
  readonly countdown4 = viewChild<CountdownComponent>('cd4');
  readonly ngOtpInput = viewChild<any>('ngOtpInput')
  @ViewChild('cancel') cancel: ElementRef;

  // user = new enquiry();
  enquiry = new Enquiry();
  public n: number = 1;
  citiess: any;
  cityid: any;
  selected: any;
  currentCity: any;
  changeText: boolean = false;

  filter: boolean = false;
  filterLoader: boolean = false;
  myControl = new FormControl();
  options: any;
  filteredOptions: Observable<any>;
  locationSelectedId = '1';
  searchstring: any;
  blogs: any;
  blogsloader: boolean = true;
  showloader = false;
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
  sale_projectcount: any;
  rent_projectcount: any;
  projectpgcount: any;
  projectrentcount: any;
  propertiescount: any;
  propertylists = [];
  PlotType = [];

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
  Tenant: string = '';
  storagearr: number[] = [];
  availability_text: string = '';
  buildingtype: any;
  RegionType: any;
  zeroprojects = false;
  selectedAge: any;
  propertyId: any;
  currenturl: any;
  commercialPropertiesSale = [];
  topprojectsloader = true;
  cityname: any;
  pageOrigin: any;
  commercialPropertyType = [];
  sale_rent: any;
  TodayDate: any;
  FutureDate: any;
  propertyAgeListvalue: any;
  furnishTypeListvalue = [];
  maxPrice: any;
  minPrice: any;
  buildingTypeListvalue = [];
  commercialtype_ID: any;
  TypeList: any;
  localityName: any;
  Locality_Seo: any;
  PlotTypeList: any;
  BuildingTypeListvalue: any;
  FurnishTypeList: any;
  h1Text: any;
  userRentalFavList = [];
  propertyIds = [];
  Matautocomplete: any;


  // Window and localStorage — replaced from @ng-toolkit/universal
  // private window = window;
  // private storage = localStorage;


   configs = [
    {
      key: 'commercial-properties-in-',
      h1: (city: string, locality: string, id: string) => `Commercial Property in ${locality}, ${city}`,
      title: (city: string, locality: string, id: string) => `Explore Top Commercial Properties in ${locality}, ${city}`,
      desc: (city: string, locality: string, id: string) => ` Discover commercial properties in ${locality}, ${city}.Secure offices, shops & retail spaces for sale & rent with trusted listings on Homes247.`,
      ogTitle: (city: string, locality: string, id: string) => `Explore Top Commercial Properties in ${locality}, ${city}`,
      ogDesc: (city: string, locality: string, id: string) => `Discover commercial properties in ${locality}, ${city}.Secure offices, shops & retail spaces for sale & rent with trusted listings on Homes247.`
    },
    {
      key: 'commercial-properties-for-sale-in-',
      h1: (city: string, locality: string, id: string) => `Buy Commercial Properties in ${locality}, ${city}`,
      title: (city: string, locality: string, id: string) => `Top Commercial Properties for Sale in  ${locality}, ${city}`,
      desc: (city: string, locality: string, id: string) => `Buy commercial properties in ${locality}, ${city}. Discover verified offices, shops & retail spaces for sale with trusted listings on Homes247.`,
      ogTitle: (city: string, locality: string, id: string) => `Top Commercial Properties for Sale in  ${locality}, ${city}`,
      ogDesc: (city: string, locality: string, id: string) => `Buy commercial properties in ${locality}, ${city}. Discover verified offices, shops & retail spaces for sale with trusted listings on Homes247.`
    },
    {
      key: 'commercial-properties-for-rent-in-',
      h1: (city: string, locality: string, id: string) => `Commercial Properties for Rent in  ${locality}, ${city}`,
      title: (city: string, locality: string, id: string) => `Top Commercial Properties for Rent in ${locality}, ${city}`,
      desc: (city: string, locality: string, id: string) => ` Find commercial properties for rent in ${locality}, ${city}. Explore verified shops, offices & retail spaces with trusted listings on Homes247.`,
      ogTitle: (city: string, locality: string, id: string) => `Top Commercial Properties for Rent in ${locality}, ${city}`,
      ogDesc: (city: string, locality: string, id: string) => `Find commercial properties for rent in ${locality}, ${city}. Explore verified shops, offices & retail spaces with trusted listings on Homes247.`
    },
    {
      key: 'commercial-officespace-for-sale-in-',
      h1: (city: string, locality: string, id: string) => `Commercial Office Spaces for Sale in  ${locality}, ${city}`,
      title: (city: string, locality: string, id: string) => `Modern Office Spaces for Sale in ${locality}, ${city}.`,
      desc: (city: string, locality: string, id: string) => `Discover verified commercial office spaces for sale in ${locality}, ${city}.Explore prime locations with trusted listings on Homes247.`,
      ogTitle: (city: string, locality: string, id: string) => `Modern Office Spaces for Sale in ${locality}, ${city}.`,
      ogDesc: (city: string, locality: string, id: string) => `Discover verified commercial office spaces for sale in ${locality}, ${city}.Explore prime locations with trusted listings on Homes247.`
    },
    {
      key: 'commercial-shopshowroom-for-sale-in-',
      h1: (city: string, locality: string, id: string) => `Commercial Shops & Showrooms for Sale in  ${locality}, ${city}`,
      title: (city: string, locality: string, id: string) => `Modern Shops & Showrooms for Sale in ${locality}, ${city}.`,
      desc: (city: string, locality: string, id: string) => `Discover verified commercial shops & showrooms for sale in ${locality}, ${city}.Explore prime locations with trusted listings on Homes247.`,
      ogTitle: (city: string, locality: string, id: string) => `Modern Shops & Showrooms for Sale in ${locality}, ${city}.`,
      ogDesc: (city: string, locality: string, id: string) => `Discover verified commercial shops & showrooms for sale in ${locality}, ${city}.Explore prime locations with trusted listings on Homes247.`
    },
    {
      key: 'commercial-plot-for-sale-in-',
      h1: (city: string, locality: string, id: string) => `Commercial Plots for Sale in  ${locality}, ${city}`,
      title: (city: string, locality: string, id: string) => `Modern Plots for Sale in ${locality}, ${city}.`,
      desc: (city: string, locality: string, id: string) => `Discover verified commercial plots for sale in ${locality}, ${city}.Explore prime locations with trusted listings on Homes247.`,
      ogTitle: (city: string, locality: string, id: string) => `Modern Plots for Sale in ${locality}, ${city}.`,
      ogDesc: (city: string, locality: string, id: string) => `Discover verified commercial plots for sale in ${locality}, ${city}.Explore prime locations with trusted listings on Homes247.`
    },
    {
      key: 'commercial-warehouse-for-sale-in-',
      h1: (city: string, locality: string, id: string) => `Commercial Warehouses for Sale in  ${locality}, ${city}`,
      title: (city: string, locality: string, id: string) => `Modern Warehouses for Sale in ${locality}, ${city}.`,
      desc: (city: string, locality: string, id: string) => `Discover verified commercial warehouses for sale in ${locality}, ${city}.Explore prime locations with trusted listings on Homes247.`,
      ogTitle: (city: string, locality: string, id: string) => `Modern Warehouses for Sale in ${locality}, ${city}.`,
      ogDesc: (city: string, locality: string, id: string) => `Discover verified commercial warehouses for sale in ${locality}, ${city}.Explore prime locations with trusted listings on Homes247.`
    },
    {
      key: 'commercial-officespace-for-rent-lease-in-',
      h1: (city: string, locality: string, id: string) => `Commercial Office Spaces for Rent in ${locality}, ${city}`,
      title: (city: string, locality: string, id: string) => `Office Spaces for Rent or Lease in ${locality}, ${city}`,
      desc: (city: string, locality: string, id: string) => `Find commercial office spaces for rent or lease in ${locality}, ${city}.Explore prime locations with trusted listings on Homes247.`,
      ogTitle: (city: string, locality: string, id: string) => `Office Spaces for Rent or Lease in ${locality}, ${city}`,
      ogDesc: (city: string, locality: string, id: string) => `Find commercial office spaces for rent or lease in ${locality}, ${city}.Explore prime locations with trusted listings on Homes247.`
    },
    {
      key: 'commercial-shopshowroom-for-rent-lease-in-',
      h1: (city: string, locality: string, id: string) => `Commercial Shops & Showrooms for Rent in ${locality}, ${city}`,
      title: (city: string, locality: string, id: string) => `Shops & Showrooms for Rent or Lease in ${locality}, ${city}`,
      desc: (city: string, locality: string, id: string) => `Find commercial shops & showrooms for rent or lease in ${locality}, ${city}.Explore prime locations with trusted listings on Homes247.`,
      ogTitle: (city: string, locality: string, id: string) => `Shops & Showrooms for Rent or Lease in ${locality}, ${city}`,
      ogDesc: (city: string, locality: string, id: string) => `Find commercial shops & showrooms for rent or lease in ${locality}, ${city}.Explore prime locations with trusted listings on Homes247.`
    },
    {
      key: 'commercial-plot-for-rent-lease-in-',
      h1: (city: string, locality: string, id: string) => `Commercial Plots for Rent in ${locality}, ${city}`,
      title: (city: string, locality: string, id: string) => `Plots for Rent or Lease in ${locality}, ${city}`,
      desc: (city: string, locality: string, id: string) => `Find commercial plots for rent or lease in ${locality}, ${city}.Explore prime locations with trusted listings on Homes247.`,
      ogTitle: (city: string, locality: string, id: string) => `Plots for Rent or Lease in ${locality}, ${city}`,
      ogDesc: (city: string, locality: string, id: string) => `Find commercial plots for rent or lease in ${locality}, ${city}.Explore prime locations with trusted listings on Homes247.`
    },
    {
      key: 'commercial-warehouse-for-rent-lease-in-',
      h1: (city: string, locality: string, id: string) => `Commercial Warehouses for Rent in ${locality}, ${city}`,
      title: (city: string, locality: string, id: string) => `Warehouses for Rent or Lease in ${locality}, ${city}`,
      desc: (city: string, locality: string, id: string) => `Find commercial warehouses for rent or lease in ${locality}, ${city}.Explore prime locations with trusted listings on Homes247.`,
      ogTitle: (city: string, locality: string, id: string) => `Warehouses for Rent or Lease in ${locality}, ${city}`,
      ogDesc: (city: string, locality: string, id: string) => `Find commercial warehouses for rent or lease in ${locality}, ${city}.Explore prime locations with trusted listings on Homes247.`
    },
    {
      key: 'commercial-industrial-plot-for-sale-in-',
      h1: (city: string, locality: string, id: string) => `Industrial Plots for Sale in ${locality}, ${city}`,
      title: (city: string, locality: string, id: string) => `Explore Industrial Plots for Sale in ${locality}, ${city}`,
      desc: (city: string, locality: string, id: string) => `Buy industrial plots in ${locality}, ${city}  Explore verified plots at top locations. Explore prime locations with trusted listings on Homes247.`,
      ogTitle: (city: string, locality: string, id: string) => `Explore Industrial Plots for Sale in ${locality}, ${city}`,
      ogDesc: (city: string, locality: string, id: string) => `Buy industrial plots in ${locality}, ${city}  Explore verified plots at top locations. Explore prime locations with trusted listings on Homes247.`
    },
    {
      key: 'commercial-agricultural-plot-for-sale-in-',
      h1: (city: string, locality: string, id: string) => `Agricultural Plots for Sale in ${locality}, ${city}`,
      title: (city: string, locality: string, id: string) => `Explore Agricultural Plots for Sale in ${locality}, ${city}`,
      desc: (city: string, locality: string, id: string) => `Buy agricultural plots in ${locality}, ${city}  Explore verified plots at top locations. Explore prime locations with trusted listings on Homes247.`,
      ogTitle: (city: string, locality: string, id: string) => `Explore Agricultural Plots for Sale in ${locality}, ${city}`,
      ogDesc: (city: string, locality: string, id: string) => `Buy agricultural plots in ${locality}, ${city}  Explore verified plots at top locations. Explore prime locations with trusted listings on Homes247.`
    },
    {
      key: 'commercial-commercial-plot-for-sale-in-',
      h1: (city: string, locality: string, id: string) => `Commercial Plots for Sale in ${locality}, ${city}`,
      title: (city: string, locality: string, id: string) => `Explore Commercial Plots for Sale in ${locality}, ${city}`,
      desc: (city: string, locality: string, id: string) => `Buy commercial plots in ${locality}, ${city}  Explore verified plots at top locations. Explore prime locations with trusted listings on Homes247.`,
      ogTitle: (city: string, locality: string, id: string) => `Explore Commercial Plots for Sale in ${locality}, ${city}`,
      ogDesc: (city: string, locality: string, id: string) => `Buy commercial plots in ${locality}, ${city}  Explore verified plots at top locations. Explore prime locations with trusted listings on Homes247.`
    },
    {
      key: 'commercial-farmhouse-plot-for-sale-in-',
      h1: (city: string, locality: string, id: string) => `Farmhouse Plots for Sale in ${locality}, ${city}`,
      title: (city: string, locality: string, id: string) => `Explore Farmhouse Plots for Sale in ${locality}, ${city}`,
      desc: (city: string, locality: string, id: string) => `Buy farmhouse plots in ${locality}, ${city}  Explore verified plots at top locations. Explore prime locations with trusted listings on Homes247.`,
      ogTitle: (city: string, locality: string, id: string) => `Explore Farmhouse Plots for Sale in ${locality}, ${city}`,
      ogDesc: (city: string, locality: string, id: string) => `Buy farmhouse plots in ${locality}, ${city}  Explore verified plots at top locations. Explore prime locations with trusted listings on Homes247.`
    },
    {
      key: 'commercial-industrial-plot-for-rent-lease-in-',
      h1: (city: string, locality: string, id: string) => `Industrial Plots for Rent or Lease in ${locality}, ${city}`,
      title: (city: string, locality: string, id: string) => `Top Industrial Plots for Rent or Lease in ${locality}, ${city}`,
      desc: (city: string, locality: string, id: string) => `Explore ${locality}, ${city} industrial plots for rent or lease. Verified plots in high-demand zones with trusted listings on Homes247.`,
      ogTitle: (city: string, locality: string, id: string) => `Top Industrial Plots for Rent or Lease in ${locality}, ${city}`,
      ogDesc: (city: string, locality: string, id: string) => `Explore ${locality}, ${city} industrial plots for rent or lease. Verified plots in high-demand zones with trusted listings on Homes247.`
    },
    {
      key: 'commercial-agricultural-plot-for-rent-lease-in-',
      h1: (city: string, locality: string, id: string) => `Agricultural Plots for Rent or Lease in ${locality}, ${city}`,
      title: (city: string, locality: string, id: string) => `Top Agricultural Plots for Rent or Lease in ${locality}, ${city}`,
      desc: (city: string, locality: string, id: string) => `Explore ${locality}, ${city} agricultural plots for rent or lease. Verified plots in high-demand zones with trusted listings on Homes247.`,
      ogTitle: (city: string, locality: string, id: string) => `Top Agricultural Plots for Rent or Lease in ${locality}, ${city}`,
      ogDesc: (city: string, locality: string, id: string) => `Explore ${locality}, ${city} agricultural plots for rent or lease. Verified plots in high-demand zones with trusted listings on Homes247.`
    },
    {
      key: 'commercial-commercial-plot-for-rent-lease-in-',
      h1: (city: string, locality: string, id: string) => `Commercial Plots for Rent or Lease in ${locality}, ${city}`,
      title: (city: string, locality: string, id: string) => `Top Commercial Plots for Rent or Lease in ${locality}, ${city}`,
      desc: (city: string, locality: string, id: string) => `Explore ${locality}, ${city} commercial plots for rent or lease. Verified plots in high-demand zones with trusted listings on Homes247.`,
      ogTitle: (city: string, locality: string, id: string) => `Top Commercial Plots for Rent or Lease in ${locality}, ${city}`,
      ogDesc: (city: string, locality: string, id: string) => `Explore ${locality}, ${city} commercial plots for rent or lease. Verified plots in high-demand zones with trusted listings on Homes247.`
    },
    {
      key: 'commercial-farmhouse-plot-for-rent-lease-in-',
      h1: (city: string, locality: string, id: string) => `Farmhouse Plots for Rent or Lease in ${locality}, ${city}`,
      title: (city: string, locality: string, id: string) => `Top Farmhouse Plots for Rent or Lease in ${locality}, ${city}`,
      desc: (city: string, locality: string, id: string) => `Explore ${locality}, ${city} farmhouse plots for rent or lease. Verified plots in high-demand zones with trusted listings on Homes247.`,
      ogTitle: (city: string, locality: string, id: string) => `Top Farmhouse Plots for Rent or Lease in ${locality}, ${city}`,
      ogDesc: (city: string, locality: string, id: string) => `Explore ${locality}, ${city} farmhouse plots for rent or lease. Verified plots in high-demand zones with trusted listings on Homes247.`
    },
    {
      key: 'commercial-independent-building-for-rent-lease-in-',
      h1: (city: string, locality: string, id: string) => `Commercial Independent Buildings for Rent in ${locality}, ${city}`,
      title: (city: string, locality: string, id: string) => `Top Commercial Independent Buildings for Rent ${locality}, ${city}`,
      desc: (city: string, locality: string, id: string) => `Secure commercial independent buildings for rent or lease in ${locality}, ${city}. Explore prime properties on India's favourite property portal.`,
      ogTitle: (city: string, locality: string, id: string) => `Top Commercial Independent Buildings for Rent ${locality}, ${city}`,
      ogDesc: (city: string, locality: string, id: string) => `Secure commercial independent buildings for rent or lease in ${locality}, ${city}. Explore prime properties on India's favourite property portal.`
    },
    {
      key: 'commercial-shared-building-for-rent-lease-in-',
      h1: (city: string, locality: string, id: string) => `Commercial Shared Buildings for Rent in ${locality}, ${city}`,
      title: (city: string, locality: string, id: string) => `Top Commercial Shared Buildings for Rent ${locality}, ${city}`,
      desc: (city: string, locality: string, id: string) => `Secure commercial shared buildings for rent or lease in ${locality}, ${city}. Explore prime properties on India's favourite property portal.`,
      ogTitle: (city: string, locality: string, id: string) => `Top Commercial Shared Buildings for Rent ${locality}, ${city}`,
      ogDesc: (city: string, locality: string, id: string) => `Secure commercial shared buildings for rent or lease in ${locality}, ${city}. Explore prime properties on India's favourite property portal.`
    },
    {
      key: 'commercial-commercial-complex-for-rent-lease-in-',
      h1: (city: string, locality: string, id: string) => `Commercial Complexes for Rent in ${locality}, ${city}`,
      title: (city: string, locality: string, id: string) => `Top Commercial Complexes for Rent ${locality}, ${city}`,
      desc: (city: string, locality: string, id: string) => `Secure commercial complexes for rent or lease in ${locality}, ${city}. Explore prime properties on India's favourite property portal.`,
      ogTitle: (city: string, locality: string, id: string) => `Top Commercial Complexes for Rent ${locality}, ${city}`,
      ogDesc: (city: string, locality: string, id: string) => `Secure commercial complexes for rent or lease in ${locality}, ${city}. Explore prime properties on India's favourite property portal.`
    },
    {
      key: 'commercial-industrial-building-for-rent-lease-in-',
      h1: (city: string, locality: string, id: string) => `Commercial Industrial Buildings for Rent in ${locality}, ${city}`,
      title: (city: string, locality: string, id: string) => `Top Commercial Industrial Buildings for Rent ${locality}, ${city}`,
      desc: (city: string, locality: string, id: string) => `Secure commercial industrial buildings for rent or lease in ${locality}, ${city}. Explore prime properties on India's favourite property portal.`,
      ogTitle: (city: string, locality: string, id: string) => `Top Commercial Industrial Buildings for Rent ${locality}, ${city}`,
      ogDesc: (city: string, locality: string, id: string) => `Secure commercial industrial buildings for rent or lease in ${locality}, ${city}. Explore prime properties on India's favourite property portal.`
    },
    {
      key: 'commercial-shed-for-rent-lease-in-',
      h1: (city: string, locality: string, id: string) => `Commercial Sheds for Rent in ${locality}, ${city}`,
      title: (city: string, locality: string, id: string) => `Top Commercial Sheds for Rent ${locality}, ${city}`,
      desc: (city: string, locality: string, id: string) => `Secure commercial sheds for rent or lease in ${locality}, ${city}. Explore prime properties on India's favourite property portal.`,
      ogTitle: (city: string, locality: string, id: string) => `Top Commercial Sheds for Rent ${locality}, ${city}`,
      ogDesc: (city: string, locality: string, id: string) => `Secure commercial sheds for rent or lease in ${locality}, ${city}. Explore prime properties on India's favourite property portal.`
    },
    {
      key: 'commercial-independent-building-for-sale-in-',
      h1: (city: string, locality: string, id: string) => `Buy Commercial Independent Buildings in ${locality}, ${city}`,
      title: (city: string, locality: string, id: string) => `Commercial Independent Buildings for Sale in ${locality}, ${city}`,
      desc: (city: string, locality: string, id: string) => `Find the best commercial independent buildings in ${locality}, ${city}. Verified properties in prime areas. Get from India's favourite property portal.`,
      ogTitle: (city: string, locality: string, id: string) => `Commercial Independent Buildings for Sale in ${locality}, ${city}`,
      ogDesc: (city: string, locality: string, id: string) => `Find the best commercial independent buildings in ${locality}, ${city}. Verified properties in prime areas. Get from India's favourite property portal.`
    },
    {
      key: 'commercial-shared-building-for-sale-in-',
      h1: (city: string, locality: string, id: string) => `Buy Commercial Shared Buildings in ${locality}, ${city}`,
      title: (city: string, locality: string, id: string) => `Commercial Shared Buildings for Sale in ${locality}, ${city}`,
      desc: (city: string, locality: string, id: string) => `Find the best commercial shared buildings in ${locality}, ${city}. Verified properties in prime areas. Get from India's favourite property portal.`,
      ogTitle: (city: string, locality: string, id: string) => `Commercial Shared Buildings for Sale in ${locality}, ${city}`,
      ogDesc: (city: string, locality: string, id: string) => `Find the best commercial shared buildings in ${locality}, ${city}. Verified properties in prime areas. Get from India's favourite property portal.`
    },
    {
      key: 'commercial-commercial-complex-for-sale-in-',
      h1: (city: string, locality: string, id: string) => `Buy Commercial Complexes in ${locality}, ${city}`,
      title: (city: string, locality: string, id: string) => `Commercial Complexes for Sale in ${locality}, ${city}`,
      desc: (city: string, locality: string, id: string) => `Find the best commercial complexes in ${locality}, ${city}. Verified properties in prime areas. Get from India's favourite property portal.`,
      ogTitle: (city: string, locality: string, id: string) => `Commercial Complexes for Sale in ${locality}, ${city}`,
      ogDesc: (city: string, locality: string, id: string) => `Find the best commercial complexes in ${locality}, ${city}. Verified properties in prime areas. Get from India's favourite property portal.`
    },
    {
      key: 'commercial-industrial-building-for-sale-in-',
      h1: (city: string, locality: string, id: string) => `Buy Commercial Industrial Buildings in ${locality}, ${city}`,
      title: (city: string, locality: string, id: string) => `Commercial Industrial Buildings for Sale in ${locality}, ${city}`,
      desc: (city: string, locality: string, id: string) => `Find the best commercial industrial buildings in ${locality}, ${city}. Verified properties in prime areas. Get from India's favourite property portal.`,
      ogTitle: (city: string, locality: string, id: string) => `Commercial Industrial Buildings for Sale in ${locality}, ${city}`,
      ogDesc: (city: string, locality: string, id: string) => `Find the best commercial industrial buildings in ${locality}, ${city}. Verified properties in prime areas. Get from India's favourite property portal.`
    },
    {
      key: 'commercial-shed-for-sale-in-',
      h1: (city: string, locality: string, id: string) => `Buy Commercial Sheds in ${locality}, ${city}`,
      title: (city: string, locality: string, id: string) => `Commercial Sheds for Sale in ${locality}, ${city}`,
      desc: (city: string, locality: string, id: string) => `Find the best commercial sheds in ${locality}, ${city}. Verified properties in prime areas. Get from India's favourite property portal.`,
      ogTitle: (city: string, locality: string, id: string) => `Commercial Sheds for Sale in ${locality}, ${city}`,
      ogDesc: (city: string, locality: string, id: string) => `Find the best commercial sheds in ${locality}, ${city}. Verified properties in prime areas. Get from India's favourite property portal.`
    },
    {
      key: 'commercial-furnished-properties-for-sale-in-',
      h1: (city: string, locality: string, id: string) => `Furnished Commercial Properties in ${locality}, ${city}`,
      title: (city: string, locality: string, id: string) => `Top Furnished Commercial Properties for Sale in ${locality}, ${city}`,
      desc: (city: string, locality: string, id: string) => `Invest in furnished commercial properties for sale in ${locality}, ${city}. Verified listings from Homes247 in top locations ready.`,
      ogTitle: (city: string, locality: string, id: string) => `Top Furnished Commercial Properties for Sale in ${locality}, ${city}`,
      ogDesc: (city: string, locality: string, id: string) => `Invest in furnished commercial properties for sale in ${locality}, ${city}. Verified listings from Homes247 in top locations ready.`,
    },
    {
      key: 'commercial-semi-furnish-properties-for-sale-in-',
      h1: (city: string, locality: string, id: string) => `Semi-Furnished Commercial Properties in ${locality}, ${city}`,
      title: (city: string, locality: string, id: string) => `Semi-Furnished Commercial Space for Sale in ${locality}, ${city}`,
      desc: (city: string, locality: string, id: string) => `Invest in semi-furnished commercial properties for sale in ${locality}, ${city}. Verified listings from Homes247 in top locations ready.`,
      ogTitle: (city: string, locality: string, id: string) => `Semi-Furnished Commercial Space for Sale in ${locality}, ${city}`,
      ogDesc: (city: string, locality: string, id: string) => `Invest in semi-furnished commercial properties for sale in ${locality}, ${city}. Verified listings from Homes247 in top locations ready.`,
    },
    {
      key: 'commercial-unfurnish-properties-for-sale-in-',
      h1: (city: string, locality: string, id: string) => `Unfurnished Commercial Properties in ${locality}, ${city}`,
      title: (city: string, locality: string, id: string) => `Unfurnished Commercial Space for Sale in ${locality}, ${city}`,
      desc: (city: string, locality: string, id: string) => `Invest in unfurnished commercial properties for sale in ${locality}, ${city}. Verified listings from Homes247 in locations ready.`,
      ogTitle: (city: string, locality: string, id: string) => `Unfurnished Commercial Space for Sale in ${locality}, ${city}`,
      ogDesc: (city: string, locality: string, id: string) => `Invest in unfurnished commercial properties for sale in ${locality}, ${city}. Verified listings from Homes247 in top locations ready.`,
    },
    {
      key: 'commercial-furnished-properties-for-rent-lease-in-',
      h1: (city: string, locality: string, id: string) => `Furnished Commercial Properties for Rent in  ${locality}, ${city}`,
      title: (city: string, locality: string, id: string) => `Furnished Commercial Space for Rent in ${locality}, ${city}`,
      desc: (city: string, locality: string, id: string) => `${locality}, ${city} furnished commercial properties available for rent or lease. Secure verified listings from Homes247 in top locations`,
      ogTitle: (city: string, locality: string, id: string) => `Furnished Commercial Space for Rent in ${locality}, ${city}`,
      ogDesc: (city: string, locality: string, id: string) => `${locality}, ${city} furnished commercial properties available for rent or lease. Secure verified listings from Homes247 in top locations`,
    },
    {
      key: 'commercial-semi-furnish-properties-for-rent-lease-in-',
      h1: (city: string, locality: string, id: string) => `Semi-Furnished Commercial Properties for Rent in  ${locality}, ${city}`,
      title: (city: string, locality: string, id: string) => `Semi-Furnished Commercial Space for Rent in ${locality}, ${city}`,
      desc: (city: string, locality: string, id: string) => `${locality}, ${city} semi-furnished commercial properties available for rent or lease. Secure verified listings from Homes247 in top locations`,
      ogTitle: (city: string, locality: string, id: string) => `Semi-Furnished Commercial Space for Rent in ${locality}, ${city}`,
      ogDesc: (city: string, locality: string, id: string) => `${locality}, ${city} semi-furnished commercial properties available for rent or lease. Secure verified listings from Homes247 in top locations`,
    },
    {
      key: 'commercial-unfurnish-properties-for-rent-lease-in-',
      h1: (city: string, locality: string, id: string) => `Unfurnished Commercial Properties for Rent in  ${locality}, ${city}`,
      title: (city: string, locality: string, id: string) => `Unfurnished Commercial Space for Rent in ${locality}, ${city}`,
      desc: (city: string, locality: string, id: string) => `${locality}, ${city} unfurnished commercial properties available for rent or lease. Secure verified listings from Homes247 in top locations`,
      ogTitle: (city: string, locality: string, id: string) => `Unfurnished Commercial Space for Rent in ${locality}, ${city}`,
      ogDesc: (city: string, locality: string, id: string) => `${locality}, ${city} unfurnished commercial properties available for rent or lease. Secure verified listings from Homes247 in top locations`,
    }
  ];

  currentLocality = '';
  currentLocalityId = '';

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
    private storage: SafeStorageService,
    @Inject(DOCUMENT) private doc,
    @Inject(PLATFORM_ID) private platformId: Object,
  private eliteService: ElitedataService,



  ) {
    this.window = this.doc.defaultView!;

    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    this.router.events.subscribe((evt) => {
      this.router.navigated = false;
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
    // this.dataLoads()
    var value = this.cityservice.cityfinder(this.router.url);
    this.currentCity = value.cityname;
    var localityid = this.router.url.split('-').pop().match(/[0-9]+/);
    this.localityid = localityid;
    // ✅ SSR fix — extract localityName from URL before API responds
    const urlParts = this.router.url.split('/').pop() || '';
    const citySlug = (this.currentCity || 'bangalore').toLowerCase().replace(/\s+/g, '-');
    this.localityName = urlParts
      .replace(/-\d+$/, '')
      .replace(new RegExp(`-${citySlug}$`), '')
      .replace(/-/g, ' ')
      .replace(/\b\w/g, c => c.toUpperCase())
      .trim();

  
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

      // this.getfilterdatalist();
      this.onresize();

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
    // import('../footer/footer.module').then(mod => mod.FooterModule).then(FooterModule => {
    //   this.FooterComponent = FooterModule.components['lazy'];
    // });
    $('.head_sticky').css('padding-bottom', '54px');
    const storedProperties = localStorage?.getItem('commercialPropertyID');
    this.storagearr = storedProperties ? JSON.parse(storedProperties) : [];
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
    if ('userID' in localStorage) {
      this.storagearr = this.propertyIds;
      return this.storagearr.includes(propertyID);
    } else {
      return this.storagearr.includes(propertyID);
    }
  }

  Heart_Transtion(propertyID: number, commercial_type: any) {
    const index = this.storagearr?.indexOf(propertyID);
    var loginID = localStorage?.getItem('loginID');
    if (index !== -1) {
      this.storagearr.splice(index, 1);
      if (loginID == '1') {
        const userid = localStorage?.getItem('userID');
        var param = { userid: userid, propid: propertyID, CatagoryId: 4 };
        this.Service.removeFavaourite(param).subscribe(response => { });
      }
    } else {
      this.storagearr.push(propertyID);
      if (loginID == '1') {
        const userid = localStorage?.getItem('userID');
        var param = { userid: userid, propid: propertyID, CatagoryId: 4 };
        this.Service.addfavaourite(param).subscribe(response => { });
      }
    }
    let existingData = localStorage?.getItem('commercialPropertyData');
    let dataArray = existingData ? JSON.parse(existingData) : [];
    if (index === -1) {
      const finalObject = { commercialPropertyID: propertyID, commercialType: commercial_type };
      dataArray.push(finalObject);
    } else {
      dataArray = dataArray.filter((item: any) => item.commercialPropertyID !== propertyID);
    }
    localStorage.setItem('commercialPropertyData', JSON.stringify(dataArray));
    localStorage.setItem('commercialPropertyID', JSON.stringify(this.storagearr));
  }

  metatags() {
    const url = this.router.url;
    this.configs.forEach(cfg => {
      if (url.includes(cfg.key)) {
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
  selectedOption: any = '';
  posessionId: any;

  GetRentalList() {
    this.otploader = true

    CommercialLocality.citycount = -4;
    this.showloader = true;
    this.routeSub = this.activeroute.params.subscribe(params => {
      var url = params['commercial-properties-for-sale_rent-in-:localityname-:cityname-:localityid'];
      var localityid = url.split('-').pop().match(/[0-9]+/);
      this.locality = localityid;
      var value = this.cityservice.cityfinder(this.router.url);
      this.currentCity = value.cityname;
      this.city = value.cityname.toLowerCase();

      this.activeroute.queryParamMap.subscribe((params) => {
        if (params['params']) {
          if (params['params']['buildingtype']) {
            this.buildingTypeListvalue = params['params']['buildingtype'];
          }
          if (params['params']['furnishstatus']) {
            this.furnishTypeListvalue = params['params']['furnishstatus'];
          }
          if (params['params']['Plotage']) {
            this.propertyAgeListvalue = params['params']['Plotage'];
          }
          if (params['params']['possessionId']) {
            this.posessionId = params['params']['possessionId'];
            this.selectedOption = this.posessionId.length ? this.posessionId[0] : null;
            if (this.selectedOption == 1) {
              this.TodayDate = '2020-01-01';
              var fdate = new Date(); fdate.setDate(fdate.getDate() + 5);
              this.FutureDate = fdate.toISOString().split('T')[0];
            } else if (this.selectedOption == 6) {
              this.TodayDate = new Date().toISOString().split('T')[0];
              var fdate = new Date(); fdate.setDate(fdate.getDate() + 15);
              this.FutureDate = fdate.toISOString().split('T')[0];
            } else if (this.selectedOption == 12) {
              this.TodayDate = new Date().toISOString().split('T')[0];
              var fdate = new Date(); fdate.setDate(fdate.getDate() + 30);
              this.FutureDate = fdate.toISOString().split('T')[0];
            } else if (this.selectedOption == 24) {
              var fdate = new Date(); fdate.setDate(fdate.getDate() + 30);
              this.TodayDate = fdate.toISOString().split('T')[0];
              this.FutureDate = '';
            } else {
              this.TodayDate = '';
              this.FutureDate = '';
            }
          }
          if (params['params']['Propertype']) { this.commercialPropertyType = params['params']['Propertype']; }
          if (params['params']['min']) { this.minPrice = params['params']['min']; }
          if (params['params']['max']) { this.maxPrice = params['params']['max']; }
          if (params['params']['localityId']) { this.locality = params['params']['localityId']; }
        }
      });

      let isValidUrl = false;

      if (this.router.url?.indexOf('commercial-properties-for-sale-in') > -1) {
        this.sale_rent = 1;
      } else if (this.router.url?.indexOf('commercial-properties-for-rent-in') > -1) {
        this.sale_rent = 2;
      }
      this.Service.postPropNewCommercial1().subscribe(list => {
        this.otploader = true
        if (list['status'] === 'True') {
          this.TypeList = list['commercialPropertyTypeList'];
          this.PlotTypeList = list['plotTypeList'];
          this.BuildingTypeListvalue = list['buildingTypeList'];
          this.FurnishTypeList = list['furnishTypeList'];
          this.otploader = false

          if (this.router.url?.indexOf('commercial-properties-in') > -1) {
            this.TypeList.forEach(type => { this.commercialPropertyType.push(type.key); });
            this.sale_rent = '';
          }

          const sale_rent = [
            { urlPart: 'sale', value: '1' },
            { urlPart: 'rent-lease', value: '2' },
          ];

          sale_rent.forEach(type2 => {
            this.TypeList.forEach(type => {
              const Url = `/cml/commercial-${type.action.toLowerCase().replace(/\s+/g, '-')}-for-${type2.urlPart}-in-${this.localityName}-${this.city}-${this.locality}`;
              if (this.router.url.split('&utm_source')[0] === Url) {
                if (!this.commercialPropertyType.includes(type.key)) { this.commercialPropertyType.push(type.key); }
                this.sale_rent = type2.value;
                isValidUrl = true;
              }
            });
          });

          sale_rent.forEach(type2 => {
            this.PlotTypeList.slice(0, -1).forEach(type => {
              const Url = `/cml/commercial-${type.label.toLowerCase().replace(/\s+/g, '-')}-for-${type2.urlPart}-in-${this.localityName}-${this.city}-${this.locality}`;
              if (this.router.url.split('&utm_source')[0] === Url) {
                if (!this.PlotType.includes(type.key)) { this.PlotType.push(type.key); this.commercialPropertyType.push(3); }
                this.sale_rent = type2.value;
                isValidUrl = true;
              }
            });
          });

          sale_rent.forEach(type2 => {
            this.BuildingTypeListvalue.slice(0, -2).forEach(type => {
              const Url = `/cml/commercial-${type.label.toLowerCase().replace(/\s+/g, '-')}-for-${type2.urlPart}-in-${this.localityName}-${this.city}-${this.locality}`;
              if (this.router.url.split('&utm_source')[0] === Url) {
                if (!this.buildingTypeListvalue.includes(type.key)) { this.buildingTypeListvalue.push(type.key); this.commercialPropertyType.push(1, 2, 4, 5, 6); }
                this.sale_rent = type2.value;
                isValidUrl = true;
              }
            });
          });

          sale_rent.forEach(type2 => {
            this.FurnishTypeList.forEach(type => {
              const Url = `/cml/commercial-${type.label.toLowerCase().replace(/\s+/g, '-')}-properties-for-${type2.urlPart}-in-${this.localityName}-${this.city}-${this.locality}`;
              if (this.router.url.split('&utm_source')[0] === Url) {
                if (!this.furnishTypeListvalue.includes(type.key)) { this.furnishTypeListvalue.push(type.key); this.commercialPropertyType.push(1, 2, 4, 5, 6); }
                this.sale_rent = type2.value;
                isValidUrl = true;
              }
            });
          });

          const currentUrl = this.router.url;
          if (currentUrl.includes('cml/commercial-properties-for-sale-in-')) { isValidUrl = true; }
          else if (currentUrl.includes('cml/commercial-properties-for-rent-in-')) { isValidUrl = true; }
          else if (currentUrl.includes('/cml/commercial-properties-in-')) { isValidUrl = true; }

          if (!isValidUrl) {
            this.router.navigate(['/404'], { skipLocationChange: true });
          }

          var limit = limit;
          var limitrows = limitrows;
          var param = {
            limit: limit, limitrows: limitrows,
            commerical_type: this.commercialPropertyType, locality: this.locality,
            sale_rent: this.sale_rent, todate: this.TodayDate, fromdate: this.FutureDate,
            area_max: this.area_max, area_min: this.area_min, Property_Age: this.propertyAgeListvalue,
            Furnishing: this.furnishTypeListvalue, maxprice: this.maxPrice, minprice: this.minPrice,
            Building_type: this.buildingTypeListvalue, plotType: this.PlotType,
            userId: this.storage?.getItem('userID')
          };
          var sale_param = { ...param, sale_rent: 1 };
          var rent_param = { ...param, sale_rent: 2 };
          this.otploader = true

          this.Service.commercialSaleProperties(this.city, param).subscribe((topProperty: any[]) => {
            if (topProperty['status'] === 'True') {
              this.propertylists = topProperty['details'];
              if (this.propertylists.length <= 0) {
                this.zeroprojects = true
              }
              this.otploader = false
              this.topprojectsloader = false;
            } else {
              this.topprojectsloader = true;
            }
          });

          var paramInd = {};
          this.Service.getindividualprojectscount(this.city, paramInd).subscribe(projectcounts => {
            this.propertiescount = projectcounts['Counts'][0].PropertyCounts;
          });
          this.Service.getprojectscount(this.city, paramInd).subscribe((projectcount) => {
            this.projectcount_city = projectcount['Counts'][0].PropertyCounts;
          });
          this.Service.commercialSalePropertiesCount(this.city, param).subscribe(countprojects => {
            this.projectcount = countprojects['Counts'][0].PropertyCounts;
          });
          // this.Service.commercialSalePropertiesCount(this.city, sale_param).subscribe(countprojects => {
          //   this.sale_projectcount = countprojects['Counts'][0].PropertyCounts;
          // });
          // this.Service.commercialSalePropertiesCount(this.city, rent_param).subscribe(countprojects => {
          //   this.rent_projectcount = countprojects['Counts'][0]?.PropertyCounts;
          // });

          var param1 = {};
          this.Service.getRentprojectscount(this.city, param1).subscribe(countprojects => {
            this.projectrentcount = countprojects['Counts'][0].PropertyCounts;
          });

          var param2 = {};
          this.Service.PGRentCount(this.city, param2).subscribe(countprojects => {
            this.projectpgcount = countprojects['Counts'][0].PropertyCounts;
          });

          this.updateSelectedChips();
        }
      });
    });

    if ('userID' in localStorage) {
      this.UserId = localStorage?.getItem('userID');
      if (!('commercialPropertyID' in localStorage)) {
        localStorage.setItem('commercialPropertyID', '[]');
      }
      this.Service.getUserWishListByIdTest(this.UserId, 4).subscribe(userFavList => {
        this.userRentalFavList = userFavList['favouritelist'];
        this.propertyIds = this.userRentalFavList.map(item => item.propertyId) || [];
      });
    } else {
      if ('commercialPropertyID' in localStorage) {
        this.storagearr = JSON.parse(localStorage?.getItem('commercialPropertyID')!);
      } else {
        localStorage.setItem('commercialPropertyID', '[]');
        this.storagearr = JSON.parse(localStorage?.getItem('commercialPropertyID')!);
      }
    }
  }
  Mousemovement:boolean = false
  onScrollOnce:boolean = true
  enquiryFormComponent: any
  @HostListener('window:scroll', [])
  @HostListener('touchstart', [])
  onWindowScroll() {

    
    if (this.onScrollOnce) {
      this.Mousemovement = true
      this.onScrollOnce = false

    this.coverimage = this.Service.commercialImg + 'gallery/';
    
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

  shareContent(data: any, type: any) {
    if ((window.navigator as any).share) {
      (window.navigator as any).share({
        title: 'Checkout this Property - ' + data.PropertyName,
        text: 'Check out ' + 'Test',
        url: 'https://www.homes247.in/cld/commercial-properties-for-' + type + '-in-' + data.city_name.toLowerCase() + '-' + data.commercial_type + '-' + data.property_IDFK,
      })
        .then(() => console.log('Shared successfully'))
        .catch((error: any) => console.error('Error sharing:', error));
    } else {
      console.log('Web Share API not supported on this device.');
    }
  }

  private observer: IntersectionObserver | null = null;
  coverimage: any = 'https://img.homes247.in/images/commerical_img/gallery/'
  // dataLoads() {


  // }
  ngAfterViewInit() {

    import('../mat-autocomplete-new/mat-autocomplete-new')
      .then(c => {
        this.Matautocomplete = c.MatAutocompleteNew;
      });
    setTimeout(() => this.centerActiveButton(), 80);
    this.initIntersectionObserver();


  }

  private initIntersectionObserver() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { this.loadMore(); }
      });
    });
    if (this.scrollAnchor) { this.observer.observe(this.scrollAnchor.nativeElement); }
  }

  loadMore() {
    this.showloader = true;
    this.routeSub = this.activeroute.params.subscribe(params => {
      let totalcount = this.projectcount;
      const limit = CommercialLocality.citycount += 4;
      var limitrows = 4;
      var param = {
        limit: limit, limitrows: limitrows,
        commerical_type: this.commercialPropertyType, locality: this.locality,
        sale_rent: this.sale_rent, todate: this.TodayDate, fromdate: this.FutureDate,
        area_max: this.area_max, area_min: this.area_min, Property_Age: this.propertyAgeListvalue,
        Furnishing: this.furnishTypeListvalue, maxprice: this.maxPrice, minprice: this.minPrice,
        Building_type: this.buildingTypeListvalue, plotType: this.PlotType,
        userId: this.storage?.getItem('userID')
      };
      let livecount = this.propertylists?.length || 0;
      if (livecount < totalcount) {
        return this.Service.commercialSaleProperties(this.city, param).subscribe(propertylists => {
          var status = propertylists['status'];
          if (status == 'False') {
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

  ShowHideEnquery(data: any) {
    this.localityid = data.locality_ID;
    this.proptype = data.Building_Type;
    this.propname = data.property_title;
    this.propUserIDFK = data.userIDFK;
    this.commercialtype_ID = data.commercial_type;
    this.propertyId = data.property_IDFK;
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
  @ViewChild('scrollPart', { read: ElementRef }) scrollPart!: ElementRef<HTMLElement>;

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
    this.localityid = data.locality_IDFK;
    this.proptype = data.Building_Type;
    this.propname = data.property_title;
    this.propUserIDFK = data.userIDFK;
    this.commercialtype_ID = data.commercial_type;
    this.propertyId = data.property_IDFK;
    this.cityid = data.city_IDFK;
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
  contactedRentalarr = [];

  SubmitForm() {
    this.otploader = true;
    this.enquiry.propertyname = this.propname;
    this.enquiry.propertyid = this.propertyId;
    this.enquiry.regionId = '';
    this.enquiry.localityId = this.localityid;
    var cityid = this.cityId;
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
    this.Service.commercialenq(param, pageorgin, cityid, browser).subscribe(async success => {
      if (success['status'] === 'True') {
        this.otploader = false;
        if (success['code'] === '3') {
          this.otpHandle();
        } else {
           const Swal = await this.getSwal();
      Swal.fire({ text: 'We Will Intimate you soon!', icon: 'success', showConfirmButton: false, timer: 2500 });
          const index = this.storagearr?.indexOf(this.propertyId);
          if (index === -1) { this.storagearr.push(this.propertyId); }
          let existingData = localStorage?.getItem('contactedcommercialPropData');
          let dataArray = existingData ? JSON.parse(existingData) : [];
          const existingIndex = dataArray.findIndex((item: any) => item.commercialPropertyID === this.propertyId);
          if (existingIndex === -1) {
            dataArray.push({ commercialPropertyID: this.propertyId, commercialType: this.commercialtype_ID });
          } else {
            dataArray[existingIndex].commercialType = this.commercialtype_ID;
          }
          localStorage.setItem('contactedcommercialPropData', JSON.stringify(dataArray));
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
    if (width < 1080) { this.filterShowHide = true; }
    else { this.filterShowHide = false; }
  }

  onReset() {
    this.chips.forEach(chip => chip.selected = false);
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

  propertyNameClick(PropertyName: any, RegionID: any, localityid: any, PropertyID: any) {
    this.SelectedPropName = PropertyName;
    this.Filter.PropertyName = PropertyName;
    this.Filter.RegionID = RegionID;
    this.Filter.localityid = localityid;
    this.Filter.propid = PropertyID;
    $('#otpValidate').css('display', 'block');
  }

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

  stickyload() {
    $(this.window).scroll(function () {
      if ($(this).scrollTop() > 60) {
        $('.sale_rent_header').css({ 'position': 'fixed', 'z-index': '9999', 'top': '89px', 'left': '0', 'width': '100vw', 'margin-left': 'calc(-50vw + 50%)', 'background-color': '#ffffff', 'padding': '4px 19px' });
        $('.breadcrumb').css('margin-top', '50px');
      } else {
        $('.sale_rent_header').css({ 'position': 'relative', 'top': '0', 'left': '0', 'width': '100vw', 'margin-left': 'calc(-50vw + 50%)', 'background-color': '#ffffff', 'padding': '4px 19px' });
        $('.breadcrumb').css('margin-top', '10px');
      }
    });
  }




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
      category_id: 4
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