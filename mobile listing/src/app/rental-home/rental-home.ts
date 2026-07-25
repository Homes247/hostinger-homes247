import { CommonModule, Location } from '@angular/common';
import { Component, DOCUMENT, HostListener, Inject, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { CityService } from '../city.service';
import { DataService } from '../data.service';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { cleanUrlPipe, customPriceFormatPipe } from '../mainpipe-pipe';
import { Rentheader } from '../rentheader/rentheader';
// import { PipeModule } from '../pipe/pipe.module';
// import { SharedModule } from '../shared/shared.module';
// import { Shared3Module } from '../shared/shared.module3';

declare var $: any;

@Component({
  selector: 'app-rentals',
  templateUrl: './rental-home.html',
  styleUrls: ['./rental-home.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSkeletonLoaderModule,
    Rentheader,
    // SharedModule,
    // Shared3Module,
    // PipeModule,
    cleanUrlPipe,
    // customPriceFormatPipe,
  ],
})
export class RentalHome implements OnInit {
  citiess: any;
  cityid: any;
  selected: any;
  currentCity: any;
  changeText: boolean = false;
  myControl = new FormControl();
  options: any;
  filteredOptions: Observable<any>;
  city = '1';
  searchstring: any;
  blogs: any[] = [];
  blogsloader: boolean = true;
  FooterComponent: any;
  propertylists: any;

  showShortImages = true;
  ImmediatComingSoon = true;
  ImmediateAvailLists = [];
  listarraylength: any;
  propertylistsbyowner: any[] = [];
  propertylistsimmediate: any;
  newlyAdded: any[] = [];
  availabledate: string;
  listarraylength1: any;
  urlcityname: string;
  UserId: any;
  userRentalFavList = [];
  propertyIds = [];

  // private window = window;

  constructor(
    private router: Router,
    private _location: Location,
    public Service: DataService,
    public cityservice: CityService,
    private titleService: Title,
    private meta: Meta,
     @Inject(DOCUMENT) private doc,
  ) { 
    this.window = this.doc.defaultView!;

  }
  window!: Window;

  @HostListener('window:scroll', [])
  onWindowScroll() { }

  ngOnInit() {
    this.dataLoads()
    var value = this.cityservice.cityfinder(this.router.url);
    this.currentCity = value.cityname;
    this.urlcityname = value.cityname.toLowerCase().replace(' ', '-');
    this.titleService.setTitle('Properties for rent in ' + this.urlcityname + '| Flats for rent near me | Homes247.in');
    this.meta.updateTag({
      name: 'description',
      content: 'Real Estate' + this.currentCity +
        ' - Browse best properties for rent in Bangalore - View ✓Bachelor Friendly Properties. ' +
        '✓Owners Listings. Visit Now!'
    });
    this.Service.createLinkForCanonicalURL();

    this.GetRentalownerList();
    this.GetRentalimmediateList();
    this.getNewlyAdded();
    this.getblogs();
    $('body').removeClass('modal-open');

      import('../footer-new-mobile/footer-new-mobile').then(m => {
      this.FooterComponent = m.FooterNewMobile;
    });

    this.getImmediateProp();

    if (window.innerWidth <= 375) {
      this.showShortImages = true;
    } else {
      this.showShortImages = false;
    }
  }
  blogimagePath: any
  coverimage: any
  propertyimage: any
  dataLoads() {
    this.blogimagePath = this.Service.imagesURL + 'stories/';
    this.coverimage = this.Service.RenImages + 'cover/';
    this.propertyimage = this.Service.imagesURL + 'rentals/cover/';
  }

  getImmediateProp() {
    var TodayDate = '';
    var fdate = new Date();
    fdate.setDate(fdate.getDate() + 5);
    var FutureDate = fdate.toISOString().split('T')[0];
    var param = {
      limit: 0,
      limitrows: 6,
      fromdate: TodayDate,
      todate: FutureDate,
    };
    this.Service.getrentalList(this.currentCity, param).subscribe(lists => {
      if (lists['status'] === 'True') {
        this.ImmediateAvailLists = lists['listings'];
        if (this.ImmediateAvailLists.length === 0) {
          this.ImmediatComingSoon = true;
        } else {
          this.ImmediatComingSoon = false;
        }
      }
    });
  }

  storagearr = [];

  isInWishlist1(propertyID: number): boolean {
    if ('userID' in localStorage) {
      this.storagearr = this.propertyIds;
      return this.storagearr.includes(propertyID);
    } else {
      return this.storagearr.includes(propertyID);
    }
  }

  Heart_Transtion1(propertyID: number) {
    const index = this.storagearr?.indexOf(propertyID);
    var loginID = localStorage?.getItem('loginID');
    if (index !== -1) {
      this.storagearr.splice(index, 1);
      if (loginID == '1') {
        const userid = localStorage?.getItem('userID');
        var param = { userid: userid, propid: propertyID, CatagoryId: 3 };
        this.Service.removeFavaourite(param).subscribe(response => { });
      }
    } else {
      this.storagearr.push(propertyID);
      if (loginID == '1') {
        const userid = localStorage?.getItem('userID');
        var param = { userid: userid, propid: propertyID, CatagoryId: 3 };
        this.Service.addfavaourite(param).subscribe(response => { });
      }
    }
    localStorage.setItem('rentalPropertyID', JSON.stringify(this.storagearr));
  }

  shareContent(data: any) {
    if ((window.navigator as any).share) {
      if (data.propertyype != 'Plot') {
        (window.navigator as any).share({
          title: data.PropertyType,
          text: 'Check out this amazing Rental Property!',
          url: 'https://www.homes247.in/rentals/' + data.BHK.toLowerCase().replace(/\s+/g, '-') + '-' + data.PropertyType.toLowerCase().replace(/\s+/g, '-') + '-for-rent-in-' + data.Locality.toLowerCase().replace(/\s+/g, '-') + '-' + data.City.toLowerCase().replace(/\s+/g, '-') + '-at-' + data.PropertyName.toLowerCase().replace(/\s+/g, '-') + '-' + data.PropertyID,
        })
          .then(() => console.log('Shared Successfully'))
          .catch((error: any) => console.error('Error sharing:', error));
      } else {
        (window.navigator as any).share({
          title: data.PropertyType,
          text: 'Check out this amazing Rental Property!',
          url: 'https://www.homes247.in/rentals/' + data.PropertyArea.toLowerCase().replace(/\s+/g, '-') + 'acres-' + data.PropertyType.toLowerCase().replace(/\s+/g, '-') + '-for-rent-in-' + data.Locality.toLowerCase().replace(/\s+/g, '-') + '-' + data.City.toLowerCase().replace(/\s+/g, '-') + '-at-' + data.PropertyName.toLowerCase().replace(/\s+/g, '-') + '-' + data.PropertyID,
        })
          .then(() => console.log('Shared Successfully'))
          .catch((error: any) => console.error('Error sharing:', error));
      }
    }
  }

  getblogs() {
    this.Service.getrecentblogs().subscribe((blogs: any[]) => {
      if (blogs['status'] === 'True') {
        this.blogs = blogs['locations'];
        this.blogsloader = false;
      }
    });
  }

  owneshipComingSoon = true;
  newlyAddedComingSoon = true;

  GetRentalownerList() {
    var limit = '0';
    var limitrows = '4';
    var posted = '654825';
    var param = { limit: limit, limitrows: limitrows, ownership: posted };
    this.Service.getrentalList(this.currentCity, param).subscribe(lists => {
      if (lists['status'] === 'True') {
        let propertylists = lists['listings'];
        this.propertylistsbyowner = propertylists;
        if (this.propertylistsbyowner.length === 0) {
          this.owneshipComingSoon = true;
        } else {
          this.owneshipComingSoon = false;
        }
      }
    });

    if ('userID' in localStorage) {
      this.UserId = localStorage?.getItem('userID');
      if (!('rentalPropertyID' in localStorage)) {
        localStorage.setItem('rentalPropertyID', '[]');
      }
      this.Service.getUserWishListByIdTest(this.UserId, 3).subscribe(userFavList => {
        this.userRentalFavList = userFavList['favouritelist'];
        this.propertyIds = this.userRentalFavList.map(item => item.propertyId) || [];
      });
    } else {
      if ('rentalPropertyID' in localStorage) {
        this.storagearr = JSON.parse(localStorage?.getItem('rentalPropertyID')!);
      } else {
        localStorage.setItem('rentalPropertyID', '[]');
        this.storagearr = JSON.parse(localStorage?.getItem('rentalPropertyID')!);
      }
    }
  }

  GetRentalimmediateList() {
    var fdate = new Date();
    fdate.setDate(fdate.getDate() + 5);
    var limit = '0';
    var limitrows = '4';
    var fromdate = '';
    var todate = fdate.toISOString().split('T')[0];
    this.availabledate = todate;
    var param = { limit: limit, limitrows: limitrows, fromdate: fromdate, todate: todate };
    this.Service.getrentalList(this.urlcityname, param).subscribe(lists => {
      let propertylists = lists['listings'];
      this.propertylistsimmediate = propertylists;
      this.listarraylength1 = this.propertylistsimmediate.length;
    });
  }

  getNewlyAdded() {
    var fdate = new Date();
    fdate.setDate(fdate.getDate() - 15);
    var pastPostedOnDate = fdate.toISOString().split('T')[0];
    var param = { limit: 0, limitrows: 12, fromdatepostdate: pastPostedOnDate };
    this.Service.getrentalList(this.currentCity, param).subscribe(lists => {
      if (lists['status'] === 'True') {
        let propertylists = lists['listings'];
        this.newlyAdded = propertylists;
        if (this.newlyAdded.length === 0) {
          this.newlyAddedComingSoon = true;
        } else {
          this.newlyAddedComingSoon = false;
        }
      }
    });
  }
}