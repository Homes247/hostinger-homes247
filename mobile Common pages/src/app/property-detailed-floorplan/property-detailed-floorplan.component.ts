import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService2 } from '../data.service2';
import { MessageService } from '../property.service';
import { Location } from '@angular/common';
import { DataService } from '../data.service';
import { Meta, Title } from '@angular/platform-browser';
import { FilterService } from '../filter.service';


declare var $: any;
@Component({
  selector: 'app-property-detailed-floorplan',
  templateUrl: './property-detailed-floorplan.component.html',
  styleUrls: ['./property-detailed-floorplan.component.css']
})
export class PropertyDetailedFloorplanComponent implements OnInit {
  propID:any;
  propertiesDetailsnew: any;
  propName: any;

  floorplans: any;
  showfloorplane: any;
  hidefloorplane: any;

  onebhk = false;
  twobhk = false;
  threebhk = false;
  fourbhk = false;
  fivebhk = false;
  sixbhk = false;
  sevenbhk = false;
  eightbhk = false;
  plots = false;

  start: any;
  endone: any;
  endtwo: any;
  endthree: any;
  endfour: any;
  endfive: any;
  endsix: any;
  endseven: any;
  endeight: any;
  endplots: any;
  reviewcount: any;
  oneBHKVal: any[] = [];
  twoBHKVal: any[] = [];
  threeBHKVal: any[] = [];
  fourBHKVal: any[] = [];
  fiveBHKVal: any[] = [];
  sixBHKVal: any[] = [];
  sevenBHKVal: any[] = [];
  eightBHKVal: any[] = [];
  PLOTSVal: any[] = [];

  hideOneBhkSeeMore: any;
  hideTwoBhkSeeMore: any;
  hideThreeBhkSeeMore: any;
  hideFourBhkSeeMore: any;
  hideFiveBhkSeeMore: any;
  hidesixBhkSeeMore: any;
  hidesevenBhkSeeMore: any;
  hideeightBhkSeeMore: any;
  hidePLOTSValSeeMore: any;
  galleryimages: any;
  imagesLength: any;
  ShowDownloadBrochure: any;
  hideDownloadBrochure: any;
  approvalvalue = false;
  zeroapprovalvalue = false;
  approvals: any;

  uploadBHKImages = this._messageService.imagesURL + 'uploadBHKImgs/';

  floorPlanDetails:any

  reviews: any;
  averagerating: any;
  reviwcount: any;
  totaluserratings: any;
  ratingreviews = true;
  numbernan = false;


  PropertybrochureformComponent: any;
  Visiblebrochure = false;
  localityName: any;
  cityName: any;
  currentTab: any;
  selectedBhk: string;
  tabBhk: string = '';
  LoaclityId: any;
  RegionID: any;

  constructor(private router: Router,public Service2: DataService2,public Service: DataService,private _messageService: MessageService,private activatedRoute: ActivatedRoute,public location: Location,private titleService: Title, private meta: Meta,public Filter: FilterService,) {
    this._messageService.clicklisten().subscribe((m:any) => {
   
      this.Visiblebrochure = false;
    
  });
   }

  ngOnInit(): void {
    this.dataLoads()
  }
  routeSub: any;
  floorplanId:any
  floorPlanArea:any
  showmorerating = false;
  @HostListener('window:scroll', ['$event'])
  @HostListener('touchstart', ['$event'])
  onTouchLoad() {
    this.Service.mouseenterservice3();
  }
  dataLoads(){
    this.activatedRoute.queryParams.subscribe(params => {
      this.currentTab = params['tab'] || 'BHK1'; // Default tab to BHK1 if no query param is present
      if(this.currentTab == 'BHK1'){
          this.selectedBhk = '1 BHK'
      }else if(this.currentTab == 'BHK2'){

        this.selectedBhk = '2 BHK'

      }else if(this.currentTab == 'BHK3'){

        this.selectedBhk = '3 BHK'

      }else if(this.currentTab == 'BHK4'){

        this.selectedBhk = '4 BHK'

      }else if(this.currentTab == 'BHK5'){

        this.selectedBhk = '5 BHK'

      }else if(this.currentTab == 'BHK6'){

        this.selectedBhk = '6 BHK'

      }else if(this.currentTab == 'BHK7'){

        this.selectedBhk = '7 BHK'

      }else if(this.currentTab == 'BHK8'){

        this.selectedBhk = '8 BHK'

      }else if(this.currentTab == 'PLOTS'){

        this.selectedBhk = 'PLOTS'

      }
    });
    this.routeSub = this.activatedRoute.params.subscribe(params => {
      var lasturl = params['propName-in-localityName-propCity-floorplan-overview-floorplanId-propId'];
      const inputString = lasturl
      const parts = inputString.split('-');
      const numberValue = parseInt(parts[parts.length - 2]);
      this.floorplanId = numberValue
     this.propID = this.router.url.split('-').pop().match(/[0-9]+/);
     window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });

        this.Service2.getpropertynew(this.propID).subscribe(data => {
        let datadetails = data['details'];
        this.propertiesDetailsnew = datadetails;
        this.propName = this.propertiesDetailsnew[0]['propertyName'];
        this.localityName = this.propertiesDetailsnew[0]['locality_name'];
        this.LoaclityId = this.propertiesDetailsnew[0]['LoaclityId'];
        this.RegionID = this.propertiesDetailsnew[0]['RegionID'];
        this.cityName = this.propertiesDetailsnew[0]['city_name'];
        this.titleService.setTitle(this.propName +' - Floor Plan | Price Details, '+ this.localityName +', '+ this.cityName);
        this.meta.updateTag({
          name: 'description',
          content: 'Find the detailed floor plan & Price of '+ this.propName +' at Homes247.in. Contact us for more info & free property assistance!.'
        });
        this.Service.createLinkForCanonicalURL();
    });

    this.Service.getPropertyFloorplan(this.floorplanId).subscribe(data => {
      this.floorPlanDetails = data['floorplan'];
      const inputString = this.floorPlanDetails[0].sqft;
      const numericPart = inputString.match(/[\d.]+/);
      this.floorPlanArea = numericPart[0]
          
    })

    //  Review Fetch Starts
    this._messageService.reviewfetching(this.propID).subscribe(response => {
      this.reviews = response['rating'];
      if (!this.reviews.length) {
        this.ratingreviews = false;
      } else {
        this.ratingreviews = true;
      }
      if (this.reviews.length > 3) {
        this.showmorerating = true;
      }
      this.reviewcount = this.reviews.length;
      const fivestar = '5';
      const fivestarcount = this.reviews.filter((obj) => obj.Rating === fivestar).length;
      const fourstar = '4';
      const fourstarcount = this.reviews.filter((obj) => obj.Rating === fourstar).length;
      const thirdstar = '3';
      const threestarcount = this.reviews.filter((obj) => obj.Rating === thirdstar).length;
      const twostar = '2';
      const twostarcount = this.reviews.filter((obj) => obj.Rating === twostar).length;
      const onestar = '1';
      const onestarcount = this.reviews.filter((obj) => obj.Rating === onestar).length;
      const totalratings = fivestarcount + fourstarcount + threestarcount + twostarcount + onestarcount;
      this.totaluserratings = totalratings;
      this.averagerating = (Math.round(5 * fivestarcount + 4 * fourstarcount + 3 * threestarcount + 2 * twostarcount + 1 * onestarcount) / totalratings).toFixed(1);
      if (isNaN(parseFloat(this.averagerating))) {
        this.numbernan = true;
        this.averagerating = '0';
        this.totaluserratings = '0';
      }
     
    });
    //  Review Fetch Ends



    this._messageService.get_amen_appro_banks(this.propID).subscribe(datadetails => {
      let otherdatas = datadetails['details'];
      this.floorplans = otherdatas[0].BHK_Details;
      if (this.floorplans.length != 0) {
        this.showfloorplane = true;
        this.hidefloorplane = false;
      } else {
        this.showfloorplane = false;
        this.hidefloorplane = true;
      }
      if (this.floorplans.find(ob => ob['BHK'] === 'PLOTS')) {
        this.plots = true;
      this.tabBhk = 'PLOTS'
      }
      if (this.floorplans.find(ob => ob['BHK'] === '8 BHK')) {
        this.eightbhk = true;
      this.tabBhk = 'BHK8'
      }
      if (this.floorplans.find(ob => ob['BHK'] === '7 BHK')) {
        this.sevenbhk = true;
      this.tabBhk = 'BHK7'
      }
      if (this.floorplans.find(ob => ob['BHK'] === '6 BHK')) {
        this.sixbhk = true;
      this.tabBhk = 'BHK6'
      }
      if (this.floorplans.find(ob => ob['BHK'] === '5 BHK')) {
        this.fivebhk = true;
      this.tabBhk = 'BHK5'
      }

      if (this.floorplans.find(ob => ob['BHK'] === '4 BHK')) {
        this.fourbhk = true;
      this.tabBhk = 'BHK4'
      }
      if (this.floorplans.find(ob => ob['BHK'] === '3 BHK')) {
        this.threebhk = true;
      this.tabBhk = 'BHK3'
      }
      if (this.floorplans.find(ob => ob['BHK'] === '2 BHK')) {
        this.twobhk = true;
      this.tabBhk = 'BHK2'
      }

    if (this.floorplans.find(ob => ob['BHK'] === '1 BHK')) {
      this.onebhk = true;
      this.tabBhk = 'BHK1'
    }
    
  this.activatedRoute.queryParams.subscribe(params => {
    this.currentTab = params['tab'] ||  this.tabBhk; // Default tab to BHK1 if no query param is present
    if(this.currentTab == 'BHK1'){
        this.selectedBhk = '1 BHK'
    }else if(this.currentTab == 'BHK2'){

      this.selectedBhk = '2 BHK'

    }else if(this.currentTab == 'BHK3'){

      this.selectedBhk = '3 BHK'

    }else if(this.currentTab == 'BHK4'){

      this.selectedBhk = '4 BHK'

    }else if(this.currentTab == 'BHK5'){

      this.selectedBhk = '5 BHK'

    }else if(this.currentTab == 'BHK6'){

      this.selectedBhk = '6 BHK'

    }else if(this.currentTab == 'BHK7'){

      this.selectedBhk = '7 BHK'

    }else if(this.currentTab == 'BHK8'){

      this.selectedBhk = '8 BHK'

    }else if(this.currentTab == 'PLOTS'){

      this.selectedBhk = 'PLOTS'

    }
  });

      this.start = 0;
      this.endone = 3;
      this.endtwo = 3;
      this.endthree = 3;
      this.endfour = 3;
      this.endfive = 3;
      this.endsix = 3;
      this.endseven = 3;
      this.endeight = 3;
      this.endplots = 3;
      for (let i = 0; i < this.floorplans.length; i++) {
        if (this.floorplans[i]['BHK'] === '1 BHK') {
          this.oneBHKVal.push(this.floorplans[i]['BHK']);
        } else if (this.floorplans[i]['BHK'] === '2 BHK') {
          this.twoBHKVal.push(this.floorplans[i]['BHK']);
        } else if (this.floorplans[i]['BHK'] === '3 BHK') {
          this.threeBHKVal.push(this.floorplans[i]['BHK']);
        } else if (this.floorplans[i]['BHK'] === '4 BHK') {
          this.fourBHKVal.push(this.floorplans[i]['BHK']);
        } else if (this.floorplans[i]['BHK'] === '5 BHK') {
          this.fiveBHKVal.push(this.floorplans[i]['BHK']);
        }else if (this.floorplans[i]['BHK'] === '6 BHK') {
          this.sixBHKVal.push(this.floorplans[i]['BHK']);
        }else if (this.floorplans[i]['BHK'] === '7 BHK') {
          this.sevenBHKVal.push(this.floorplans[i]['BHK']);
        }else if (this.floorplans[i]['BHK'] === '8 BHK') {
          this.eightBHKVal.push(this.floorplans[i]['BHK']);
        }else if (this.floorplans[i]['BHK'] === 'PLOTS') {
          this.PLOTSVal.push(this.floorplans[i]['BHK']);
        }
        if (this.oneBHKVal.length <= 3) {
          this.hideOneBhkSeeMore = false;
        } else {
          this.hideOneBhkSeeMore = true;
        }
        if (this.twoBHKVal.length <= 3) {
          this.hideTwoBhkSeeMore = false;
        } else {
          this.hideTwoBhkSeeMore = true;
        }
        if (this.threeBHKVal.length <= 3) {
          this.hideThreeBhkSeeMore = false;
        } else {
          this.hideThreeBhkSeeMore = true;
        }
        if (this.fourBHKVal.length <= 3) {
          this.hideFourBhkSeeMore = false;
        } else {
          this.hideFourBhkSeeMore = true;
        }
        if (this.fiveBHKVal.length <= 3) {
          this.hideFiveBhkSeeMore = false;
        } else {
          this.hideFiveBhkSeeMore = true;
        }
        if (this.sixBHKVal.length <= 3) {
          this.hidesixBhkSeeMore = false;
        } else {
          this.hidesixBhkSeeMore = true;
        }
        if (this.sevenBHKVal.length <= 3) {
          this.hidesevenBhkSeeMore = false;
        } else {
          this.hidesevenBhkSeeMore = true;
        }
        if (this.eightBHKVal.length <= 3) {
          this.hideeightBhkSeeMore = false;
        } else {
          this.hideeightBhkSeeMore = true;
        }
        if (this.PLOTSVal.length <= 3) {
          this.hidePLOTSValSeeMore = false;
        } else {
          this.hidePLOTSValSeeMore = true;
        }
      }
      this.galleryimages = otherdatas[0].images;
      this.imagesLength = otherdatas[0]['images'].length;
      // 
      if (this.imagesLength > '4') {
        this.ShowDownloadBrochure = true;
        this.hideDownloadBrochure = false;
      } else {
        this.ShowDownloadBrochure = false;
        this.hideDownloadBrochure = true;
      }
      this.floorplans = otherdatas[0].BHK_Details;
      if (this.floorplans.length != 0) {
        this.showfloorplane = true;
        this.hidefloorplane = false;
      } else {
        this.showfloorplane = false;
        this.hidefloorplane = true;
      }
      var Approvals_DeatilsLength = this.approvals.length;
      if (Approvals_DeatilsLength.length != 0) {
        this.approvalvalue = true;
        this.zeroapprovalvalue = false;
      } else {
        this.approvalvalue = false;
        this.zeroapprovalvalue = true;
      }
      this.start = 0;
      this.endone = 3;
      this.endtwo = 3;
      this.endthree = 3;
      this.endfour = 3;
      this.endfive = 3;
      this.endsix = 3;
      this.endseven = 3;
      this.endeight = 3;
      this.endplots = 3;
    });

  })
  }

  varient;

onOneBhk(bhk) {
  this.varient = bhk;
  // 
}



floorseemore1() {
  this.endone = 50;
}

floorseemore2() {
  this.endtwo = 50;
}

floorseemore3() {
  this.endthree = 50;
}

floorseemore4() {
  this.endfour = 50;
}

floorseemore5() {
  this.endfive = 50;
}
floorseemore6() {
  this.endsix = 50;
}
floorseemore7() {
  this.endseven = 50;
}
floorseemore8() {
  this.endeight = 50;
}

floorseemoreplots() {
  this.endplots = 50;
}

floorseeless1() {
  this.endone = 3;
}

floorseeless2() {
  this.endtwo = 3;
}

floorseeless3() {
  this.endthree = 3;
}

floorseeless4() {
  this.endfour = 3;
}

floorseeless5() {
  this.endfive = 3;
}

floorseeless6() {
  this.endsix = 3;
}

floorseeless7() {
  this.endseven = 3;
}

floorseeless8() {
  this.endeight = 3;
}

floorseelessplots() {
  this.endplots = 3;
}
onebhkClicked(){
  this.selectedBhk = '1 BHK'
  this.currentTab = 'BHK1';

  this.router.navigate([], {
    relativeTo: this.activatedRoute,
    queryParams: { tab: this.currentTab }, // Update query parameter 'tab' when a tab is clicked
    queryParamsHandling: 'merge' // Merge with existing query parameters
  });
}
twobhkClicked(){
  this.selectedBhk = '2 BHK'
  this.currentTab = 'BHK2';
  this.router.navigate([], {
    relativeTo: this.activatedRoute,
    queryParams: { tab: this.currentTab }, // Update query parameter 'tab' when a tab is clicked
    queryParamsHandling: 'merge' // Merge with existing query parameters
  });

}
threebhkClicked(){
  this.selectedBhk = '3 BHK'
  this.currentTab = 'BHK3';
  this.router.navigate([], {
    relativeTo: this.activatedRoute,
    queryParams: { tab: this.currentTab }, // Update query parameter 'tab' when a tab is clicked
    queryParamsHandling: 'merge' // Merge with existing query parameters
  });

}
fourbhkClicked(){
  this.selectedBhk = '4 BHK'
  this.currentTab = 'BHK4';
  this.router.navigate([], {
    relativeTo: this.activatedRoute,
    queryParams: { tab: this.currentTab }, // Update query parameter 'tab' when a tab is clicked
    queryParamsHandling: 'merge' // Merge with existing query parameters
  });

}
fivebhkClicked(){
  this.selectedBhk = '5 BHK'
  this.currentTab = 'BHK5';
  this.router.navigate([], {
    relativeTo: this.activatedRoute,
    queryParams: { tab: this.currentTab }, // Update query parameter 'tab' when a tab is clicked
    queryParamsHandling: 'merge' // Merge with existing query parameters
  });

}
sixbhkClicked(){
  this.selectedBhk = '6 BHK'
  this.currentTab = 'BHK6';
  this.router.navigate([], {
    relativeTo: this.activatedRoute,
    queryParams: { tab: this.currentTab }, // Update query parameter 'tab' when a tab is clicked
    queryParamsHandling: 'merge' // Merge with existing query parameters
  });

}
sevenbhkClicked(){
  this.selectedBhk = '7 BHK'
  this.currentTab = 'BHK7';
  this.router.navigate([], {
    relativeTo: this.activatedRoute,
    queryParams: { tab: this.currentTab }, // Update query parameter 'tab' when a tab is clicked
    queryParamsHandling: 'merge' // Merge with existing query parameters
  });

}
eightbhkClicked(){
  this.selectedBhk = '8 BHK'
  this.currentTab = 'BHK8';
  this.router.navigate([], {
    relativeTo: this.activatedRoute,
    queryParams: { tab: this.currentTab }, // Update query parameter 'tab' when a tab is clicked
    queryParamsHandling: 'merge' // Merge with existing query parameters
  });

}
plotsbhkClicked(){
  this.selectedBhk = 'Plots'
  this.currentTab = 'PLOTS';
  this.router.navigate([], {
    relativeTo: this.activatedRoute,
    queryParams: { tab: this.currentTab }, // Update query parameter 'tab' when a tab is clicked
    queryParamsHandling: 'merge' // Merge with existing query parameters
  });

}
  IsVisibleBHKcontact = false;

  ShowHide() {
    this.IsVisibleBHKcontact = this.IsVisibleBHKcontact ? false : true;
  }

  updateQueryParams(key: string, value: string): any {
    const queryParams = { ...this.activatedRoute.snapshot.queryParams };

    // Avoid duplicates
    if (queryParams[key] !== value) {
      queryParams[key] = value;
    }

    return queryParams;
  }
enquiryFormComponent: any;
  brochuredownload() {
    // import('../propertybrochureform/propertybrochureform.module').then(mod => mod.PropertybrochureformModule).then(PropertybrochureformModule => {
    //   this.PropertybrochureformComponent = PropertybrochureformModule.components['lazy'];
    // });
    // this.Visiblebrochure = this.Visiblebrochure ? false : true;
    
    this.Filter.PropertyName = this.propName;
    this.Filter.RegionID = this.RegionID;
    this.Filter.localityid = this.LoaclityId;
    this.Filter.propid = this.propID;
    $('#otpValidate').css('display', 'block');

  }

  @HostListener('window:scroll', ['$event'])
  @HostListener('touchstart', ['$event'])
  onWindowScroll() {
      import('../enquiry-form/enquiry-form.module').then(mod => mod.enquiryFormModule).then(enquiryFormModule => {
      this.enquiryFormComponent = enquiryFormModule.components['lazy'];
      $('.modal-login').css('z-index', '99999');
      });
    }

  DownladBrochureHash() {
    var topPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    window.location.hash = 'downloadbrochure';
    document.documentElement.scrollTop = topPos;
  }

  
}
