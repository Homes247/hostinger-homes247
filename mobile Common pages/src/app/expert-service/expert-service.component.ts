import {Component, HostListener, OnInit} from '@angular/core';
// import {  ServiceService } from '../Service.service';
import {Title, Meta} from '@angular/platform-browser';
// import { query } from '../innerblog/innerblog';
import { DataService } from '../data.service';
import {query} from '../buy/innerblog';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Router } from '@angular/router';
declare var $: any;
declare var swal: any;

declare var $: any;
@Component({
  selector: 'app-expert-service',
  templateUrl: './expert-service.component.html',
  styleUrls: ['./expert-service.component.css']
})
export class ExpertServiceComponent implements OnInit {
  imageUrl = 'usericon.jpg';
  ProfileImage = this.Service.ExpertImage
  mainObj:any={};
  currentURL = '';
  selectedService = ''
  allExpertsData :any;
  allExperts = false;
  Floorplan = false;
  Market = false;
  Vastu = false;
  Legal = false;
  Loans = false;
  Inspection = false;
  Manage = false;
  Interior = false;
  expTypeId: any;
  expertId: any;
  expIn: any;
  expertIn: any;
  isCollapsedMap: { [key: number]: boolean } = {};

  constructor(private titleService: Title,
  private meta: Meta, public Service: DataService,private router: Router,) {
  }
  TestingOwl: OwlOptions = {
    loop: true,
    margin: 10,
    dots: true,
    nav: false,
    autoplay:true,
    autoplayTimeout:5000,
    autoplayHoverPause:true,
    items : 5,
    responsive: {
    0: {
      items: 4
    },

    600: {
      items: 3
    },

    1024: {
      items: 5
    },

    1366: {
      items: 5
    }
  }
  };
  ngOnInit() {
    // this.metatags();
    this.routerActive();
    import('../footer/footer.module').then(mod => mod.FooterModule).then(FooterModule =>{
      this.FooterComponent = FooterModule.components['lazy'];
    });
  }

  // metatags() {
  //   var PAGEID = '12';
  //   this.Service.getstaticmeta(PAGEID).subscribe(metatags => {
  //     this.titleService.setTitle(metatags['Pageseo'][0].page_title);
  //     this.meta.updateTag({name: 'description', content: metatags['Pageseo'][0].meta_description});
  //     this.meta.updateTag({property: 'og:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_mobile/images/og/home.png'});
  //     this.meta.updateTag({property: 'og:title', content: metatags['Pageseo'][0].page_title});
  //     this.meta.updateTag({property: 'og:description', content: metatags['Pageseo'][0].meta_description});
  //     this.Service.createLinkForCanonicalURL();
  //   });
  // }

  FooterComponent: any;
  FloatContact:any;
  innerheader:any;
  @HostListener('window:scroll', ['$event'])
  onWindowScroll(){
    // 
    let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    let max = document.documentElement.scrollHeight;
    if (pos == max){

      import('../float-contact/float-contact.module').then(mod => mod.FloatContactComponentModule).then(FloatContactComponentModule => {
        this.FloatContact = FloatContactComponentModule.components['lazy'];
    
      });
      // import('../innerheader/innerheader.module').then(mod => mod.InnerHeaderModule).then(InnerHeaderModule => {
      //   this.innerheader = InnerHeaderModule.components['lazy'];
      //   this.loaded = true;
      // });
    }
    if ($(window).scrollTop() >=  $(".footerDiv").offset().top) {
      $('#conatctbutton').addClass('conatctbuttonhide');
  }
  else {
      $('#conatctbutton').removeClass('conatctbuttonhide');
  }
  }

  routerActive() {
    this.currentURL = this.router.url.split('?')[0];
    if (this.currentURL === '/expertservices') {

      this.Service.getAllExpertList().subscribe ( (expertList: any[]) => {
        this.allExpertsData = expertList['experts_list']
        this.allExpertsData.forEach((item, index) => {
          this.isCollapsedMap[index] = true;
        });
      });
      // this.selectedService = 'Expert Services'
      this.allExperts = true;
      if (this.router.url.indexOf('expertservices') > -1) {
        this.titleService.setTitle('Unlock Homes247 Full Potential with Our Expert Home Services');
        this.meta.updateTag({
          name: 'description',
          content: 'Discover the Power of Homes247 Expert Services: Our dedicated team of professionals is here to provide top-tier solutions tailored to your unique needs.'
        });
        this.Service.createLinkForCanonicalURL();
      }

    }


     else if (this.currentURL === '/expertservices/floor-plan-experts-1') {
      if (this.router.url.indexOf('expertservices/floor-plan-experts-1') > -1) {
        this.titleService.setTitle('Discover the Perfect Floor Plan: Expert Floor Plan Services for You');
        this.meta.updateTag({
          name: 'description',
          content: 'Our skilled team of designers & architects are dedicated to creating functional & aesthetically pleasing floor plans that match your unique vision'
        });
        this.Service.createLinkForCanonicalURL();
      }
      this.expTypeId = this.router.url.split('-').pop().match(/[0-9]+/);
      var param1 = {
        id: this.expTypeId
      };
      this.Service.getCategoryExpertList(param1).subscribe ( (expertList: any[]) => {
        this.allExpertsData = expertList['experts_list'];

        this.allExpertsData.forEach((item, index) => {
          this.isCollapsedMap[index] = true;
        });
      });
      this.selectedService = 'Floorplan Expert'
      this.Floorplan = true;

    }


     else if (this.currentURL === '/expertservices/market-experts-2') {
      if (this.router.url.indexOf('expertservices/market-experts-2') > -1) {
        this.titleService.setTitle('Consult our Experts for the Best Assistance in the Real Estate Market');
        this.meta.updateTag({
          name: 'description',
          content: 'Real Estate Market Experts can assist you with a range of hassles including determining the current value of the property & More on | Call now.'
        });
        this.Service.createLinkForCanonicalURL();
      }
      this.expTypeId = this.router.url.split('-').pop().match(/[0-9]+/);
      var param1 = {
        id: this.expTypeId
      };
      this.Service.getCategoryExpertList(param1).subscribe ( (expertList: any[]) => {
        this.allExpertsData = expertList['experts_list'];

        this.allExpertsData.forEach((item, index) => {
          this.isCollapsedMap[index] = true;
        });
      });
      this.selectedService = 'market Expert'
      this.Market = true;



    }
     else if (this.currentURL === '/expertservices/vastu-experts-3') {
      if (this.router.url.indexOf('expertservices/vastu-experts-3') > -1) {
        this.titleService.setTitle('Vastu Expert Services: Unlock Positive Energy and Prosperity');
        this.meta.updateTag({
          name: 'description',
          content: 'Enhance Your Life with Vastu Expert Services: Our skilled Vastu consultants bring ancient wisdom that promote positivity, balance, and prosperity. From residential to commercial projects'
        });
        this.Service.createLinkForCanonicalURL();
      }
      this.expTypeId = this.router.url.split('-').pop().match(/[0-9]+/);
      var param1 = {
        id: this.expTypeId
      };
      this.Service.getCategoryExpertList(param1).subscribe ( (expertList: any[]) => {
        this.allExpertsData = expertList['experts_list'];

        this.allExpertsData.forEach((item, index) => {
          this.isCollapsedMap[index] = true;
        });
      });
      this.selectedService = 'vastu Expert'
      this.Vastu = true;
    }


     else if (this.currentURL === '/expertservices/legal-services-4') {
      if (this.router.url.indexOf('expertservices/legal-services-4') > -1) {
        this.titleService.setTitle('Expert Legal Services for Your Peace of Mind: Home Legal Services');
        this.meta.updateTag({
          name: 'description',
          content: 'Trusted Legal Services for Your Every Need: we guide you through the legal process with confidence and assurance. Consult with our legal experts today'
        });
        this.Service.createLinkForCanonicalURL();
      }
      this.expTypeId = this.router.url.split('-').pop().match(/[0-9]+/);
      var param1 = {
        id: this.expTypeId
      };
      this.Service.getCategoryExpertList(param1).subscribe ( (expertList: any[]) => {
        this.allExpertsData = expertList['experts_list'];

        this.allExpertsData.forEach((item, index) => {
          this.isCollapsedMap[index] = true;
        });
      });
      this.selectedService = 'legal Expert'
      this.Legal = true;
    }


     else if (this.currentURL === '/expertservices/home-inspection-services-5') {
      if (this.router.url.indexOf('expertservices/home-inspection-services-5') > -1) {
        this.titleService.setTitle('Comprehensive Home Inspection Services: Find more about your Home');
        this.meta.updateTag({
          name: 'description',
          content: 'Uncover the True Condition of Your Property with Thorough Home Inspection Services: Take the first step towards a secure investment. Schedule your home inspection today'
        });
        this.Service.createLinkForCanonicalURL();
      }
      this.expTypeId = this.router.url.split('-').pop().match(/[0-9]+/);
      var param1 = {
        id: this.expTypeId
      };
      this.Service.getCategoryExpertList(param1).subscribe ( (expertList: any[]) => {
        this.allExpertsData = expertList['experts_list'];

        this.allExpertsData.forEach((item, index) => {
          this.isCollapsedMap[index] = true;
        });
      });
      this.selectedService = 'inspection Expert'
      this.Inspection = true;
    }


    else if (this.currentURL === '/expertservices/property-manage-experts-6') {
      if (this.router.url.indexOf('expertservices/property-manage-experts-6') > -1) {
        this.titleService.setTitle('Effortless Excellence with Managed Services: Streamlining Solutions');
        this.meta.updateTag({
          name: 'description',
          content: 'Optimize Your Operations with Premier Managed Services: Our comprehensive and reliable solutions unparalleled efficiency. '
        });
        this.Service.createLinkForCanonicalURL();
      }
      this.expTypeId = this.router.url.split('-').pop().match(/[0-9]+/);
      var param1 = {
        id: this.expTypeId
      };
      this.Service.getCategoryExpertList(param1).subscribe ( (expertList: any[]) => {
        this.allExpertsData = expertList['experts_list'];

        this.allExpertsData.forEach((item, index) => {
          this.isCollapsedMap[index] = true;
        });
      });
      this.selectedService = 'manage Expert'
      this.Manage = true;
    }


    else if (this.currentURL === '/expertservices/interior-services-7') {
      if (this.router.url.indexOf('expertservices/interior-services-7') > -1) {
        this.titleService.setTitle('Transform Your Space with Premier Interior Services | Homes247');
        this.meta.updateTag({
          name: 'description',
          content: 'Our team of talented interior designers & decorators are dedicated to turning your vision into reality. From concept to completion, Explore our interior services now'
        });
        this.Service.createLinkForCanonicalURL();
      }
      this.expTypeId = this.router.url.split('-').pop().match(/[0-9]+/);
      var param1 = {
        id: this.expTypeId
      };
      this.Service.getCategoryExpertList(param1).subscribe ( (expertList: any[]) => {
        this.allExpertsData = expertList['experts_list'];

        this.allExpertsData.forEach((item, index) => {
          this.isCollapsedMap[index] = true;
        });
      });
      this.selectedService = 'interior Expert'
      this.Interior = true;
    }


    else if (this.currentURL === '/expertservices/loan-services-8') {
      if (this.router.url.indexOf('expertservices/loan-services-8') > -1) {
        this.titleService.setTitle('Unlock Financial Freedom with Our Secure & Reliable Loan Services');
        this.meta.updateTag({
          name: 'description',
          content: 'Empower Your Financial Journey with Trusted Loan Services from best banks & NBFCs: With competitive rates & flexible terms. Explore our wide range of home loan options '
        });
        this.Service.createLinkForCanonicalURL();
      }
      this.expTypeId = this.router.url.split('-').pop().match(/[0-9]+/);
      var param1 = {
        id: this.expTypeId
      };
      this.Service.getCategoryExpertList(param1).subscribe ( (expertList: any[]) => {
        this.allExpertsData = expertList['experts_list'];

        this.allExpertsData.forEach((item, index) => {
          this.isCollapsedMap[index] = true;
        });
      });
      this.selectedService = 'loans Expert'
      this.Loans = true;
    }
  }

  toggleDescription(index: number): void {
    this.isCollapsedMap[index] = !this.isCollapsedMap[index];
  }

  bookNow(value){
    const regexPattern = /([a-zA-Z]+)(\d+)/;
    const matches = value.match(regexPattern);

    if (matches) {
      this.expIn = matches[1];
      this.expertId = parseInt(matches[2]);
    } else {
      
    }
    this.expertIn = this.expIn.toLowerCase();
    this.expertId
    // 
    this.router.navigate(['/expertservices'+ '/'+this.expertIn +'-services/'+ this.expertIn +'-details-' + this.expertId]);
  }

  @HostListener('window:scroll', ['$event'])
  @HostListener('touchstart', ['$event'])
  onWindowScrolls() {
    this.Service.mouseenterservice3();
  }

}
