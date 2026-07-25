import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AllindiaService } from '../allindia.service';
import { DataService } from '../data.service';
import { DataService2 } from '../data.service2';
import { MessageService } from '../property.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { FilterService } from '../filter.service';
// Swal lazy-loaded
import { SafeStorageService } from '../safe-storage.service';
import { cleanUrlPipe, MyFilterunique, OrderByPipe,} from '../mainpipe-pipe';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MyJsonLdComponent } from '../my-json-ld/my-json-ld.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

declare var $: any;


@Component({
  selector: 'app-all-india2',
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, cleanUrlPipe, NgxSkeletonLoaderModule,MyFilterunique,OrderByPipe],
  animations: [
    trigger('heartState', [
      state('inactive', style({
        backgroundPosition: '0px 0px',
        transitionDuration: '0s'
      })),
      state('active', style({
        backgroundPosition: '-2800px 0px',
        transitionDuration: '1s'
      })),
      transition('inactive <=> active', animate('1s steps(28)'))
    ])
  ],
  templateUrl: './all-india2.html',
  styleUrl: './all-india2.css',
})
export class AllIndia2 implements OnInit {


  localstorediv: any;
  storagearr = [];


  componentloads = false;

  @ViewChild('scrollapiloader') scrollapiloader: ElementRef;
  topProperties = [];

  blogapiload = true;
  blogsloader = true;
  topprojectsloader = true;
  sectionloader = false;
  blogs: any;
  testimonialListing: any;

  // addRoot = this.allindia.ipimagesURL + 'expertsads/';



  Fixedfooter: any;
  homeactive = false;
  videoactive = false;
  searchactive = false;
  moreactive = false;
  categoryurl = '';
  allindiasidenav: any;
  trendingBlogs: any;
  userfav: any;

  homeLoanAdds = []
  floorPlanAdds = []
  globalAddsArray = [];
  legalAdds = []
  vastuAdds = []
  homeInspectionAdds = []
  propertyManagementAdds = []
  realEstateMarketAdds = []



  constructor(private storage: SafeStorageService,
    private allindia: AllindiaService, private router: Router, private Service: DataService2, private dataService: DataService, private _messageService: MessageService, @Inject(PLATFORM_ID) private platformId: Object,

    public Filter: FilterService,

  ) {


  }



  ngOnInit(): void {
    this.dataloads();
    this.inistialLoad();
  }

  propertyimage: string = '';
  blogimagePath: string = '';
  testimonialImage: string = '';
  addRoot: string = '';

  dataloads() {
    this.propertyimage = this.allindia.imagesURL + 'uploadPropertyImgs/';
    this.blogimagePath = this.allindia.imagesURL + 'stories/';
    this.testimonialImage = this.allindia.imagesURL + 'TestimonialImage/';
    this.addRoot = this.allindia.imagesURL + 'expertsads/';
  }

  clickedService(id) {
    this.Filter.selectedService = id;

    $('#myModal_services').css('display', 'block');

    this.dataService.mouseenterservice1();

  }

  addsLoading() {

    var params = {
      viewpagess: '1',
    };
    this.allindia.getAdds(params).subscribe(responce => {
      let allAddsCategory = responce['expertyinfo'];
      this.homeLoanAdds = allAddsCategory['Home Loan'];
      this.floorPlanAdds = allAddsCategory['Floorplan'];
      this.legalAdds = allAddsCategory['Legal'];
      this.vastuAdds = allAddsCategory['Vastu'];
      this.homeInspectionAdds = allAddsCategory['Home Inspection'];
      this.propertyManagementAdds = allAddsCategory['Property Management'];
      this.realEstateMarketAdds = allAddsCategory['Real Estate Market'];

      let mergedArray = [...this.floorPlanAdds, ...this.legalAdds, ...this.homeInspectionAdds, ...this.propertyManagementAdds, ...this.realEstateMarketAdds, ...this.vastuAdds];
      this.globalAddsArray = mergedArray

      this.shuffleGlobalAdds(this.globalAddsArray)

      this.shuffleHomeLoan(this.homeLoanAdds);

    })
  }
  shuffleHomeLoan(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    this.homeLoanAdds = a;
  }


  shuffleGlobalAdds(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    // return a;
    this.globalAddsArray = a;
  }
  //

  inistialLoad() {
    // if (this.blogapiload == true) {
    this.sectionloader = true;
       const userId = this.storage?.getItem('userID');
    if (userId) {
      this.localstorediv = false;
    } else {
      this.localstorediv = true;
    }

    if ('propertyID' in this.storage) {
      this.storagearr = JSON.parse(this.storage?.getItem('propertyID'));
    } else {
      this.storage.setItem('propertyID', '[]');
      this.storagearr = JSON.parse(this.storage?.getItem('propertyID'));
    }

    this.allindia.getrecentblogs().subscribe((blogs: any[]) => {
      if (blogs['status'] === 'True') {
        this.blogsloader = false;
        this.blogs = blogs['locations'];
        this.blogapiload = false;
      } else {
        this.blogsloader = true;
      }
    });
    this.allindia.gettestimonials().subscribe(testi => {
      if (testi['status'] === 'True') {
        this.testimonialListing = testi['testimonial'];
      }

    });
    const trendingId = '1';
    this.Service.getcategoryblogs(trendingId).subscribe(responce => {
      if (responce['status'] === 'True') {
        this.trendingBlogs = responce['blogcategory'];
      }
    });
    // }
    this.categoryurl = this.router.url;
    if (this.categoryurl == '/') {
      this.homeactive = true;
    }
    if (this.categoryurl == '/offers') {
      this.videoactive = true;
    }
    if (this.categoryurl == '/compare-properties') {
      this.searchactive = true;
    }
    this.UserId = this.storage?.getItem("userID");

    var param = {
      cityId: '1',
      userId: this.UserId,
    }

    this.dataService.gettopproperties(param).subscribe((topProperty: any[]) => {
      if (topProperty['status'] === 'True') {
        this.topprojectsloader = false;
        this.topProperties = topProperty['deatils'];
      } else {
        this.topprojectsloader = true;
      }
    });
  }

  whishLishId: any

  parsedarray = [];
  wishlistaddstorage(id) {
    this.whishLishId = id
    if ('propertyID' in this.storage) {
    } else {
      this.storage.setItem('propertyID', '[]');
    }
    const proparray = this.storage?.getItem('propertyID');
    const jsonpars = JSON.parse(proparray);
    const itemToRemoveIndex = jsonpars?.indexOf(id);

    this.parsedarray = JSON.parse(proparray);
    if (itemToRemoveIndex == -1) {
      this.parsedarray.push(id);
      this.storage.setItem('propertyID', JSON.stringify(this.parsedarray));
    } else {
      this.parsedarray = this.parsedarray.filter(function (item) {
        return item !== id;
      });
      this.storage.setItem('propertyID', JSON.stringify(this.parsedarray));
    }
  }

  UserId: any;

  addwishlist(id) {
    const userid = this.storage?.getItem("userID");
    var param = {
      userid: userid,
      propid: id
    };
    this._messageService.addfavaourite(param).subscribe(response => {
    });
  }

  // Add Wishlish property carousel functionality End //


  onclickshare(locProp) {
    // this.toggle = !this.toggle;
    if ((window.navigator as any).share) {
      (window.navigator as any)
        .share({
          title: locProp.propertyName,
          text: 'Check out this amazing property ' + locProp.propertyName,
          url: 'https://www.homes247.in' + '/property/' + locProp.city_name.toLowerCase().replace(/\s+/g, '-') + '/' + locProp.locality_name.toLowerCase().replace(/\s+/g, '-') + '' + locProp.propertyName.toLowerCase().replace(/\s+/g, '-') + '-' + locProp.property_info_IDPK,
        })
        .then(() => console.log('Shared successfully'))
        .catch((error: any) => console.error('Error sharing:', error));
    } else {
      console.log('Web Share API not supported on this device.');
    }
  }


  @HostListener('touchstart', [])
  @HostListener('window:scroll', [])
  onWindowScroll() {

       import('../fixed-footer/fixed-footer')
        .then(c => {
          this.Fixedfooter = c.FixedFooter;
        });

    if (this.componentloads == false) {
      this.componentloads = true;

      this.addsLoading()
    }
  }
  showhide() {
    if ($('#fixed-accordion').css('visibility') == 'hidden')
      $('#fixed-accordion').css('visibility', 'visible');
    else
      $('#fixed-accordion').css('visibility', 'hidden');
  }

}
