import { Component, HostListener, Inject, OnInit, VERSION } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LOCAL_STORAGE, WINDOW } from '@ng-toolkit/universal';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { DataService } from '../data.service';
import { ClipboardService } from 'ngx-clipboard';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService2 } from '../data.service2';
import { Meta, Title } from '@angular/platform-browser';
declare var $: any;

declare var $: any;
@Component({
  selector: 'app-bank-ifsc-details',
  templateUrl: './bank-ifsc-details.component.html',
  styleUrls: ['./bank-ifsc-details.component.css']
})
export class BankIfscDetailsComponent implements OnInit {
  // name = 'Angular ' + VERSION.major;
  selectedlocality:any;
  customOptionsTopProjects: OwlOptions = {
    loop: false,
    autoplay: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    center: false,
    autoplaySpeed: 1000,
    navSpeed: 1000,
    animateIn: 'fadeIn',
    animateOut: 'fadeOut',
    nav: false,
    navText: ['<img src=https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_mobile/images/city-banners/leftarrow.png alt=\'LeftArrow\' class=\'ifsc_page_owl owl-nav owl-prev main_move_left\'>',
      '<img src=https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_mobile/images/city-banners/rightarrow.png alt=\'RightArrow\' class=\'ifsc_page_owl owl-nav owl-next main_move_right\'>'],
    responsive: {
      0: {
        items: 3
      },
      480: {
        items: 3
      },
      700: {
        items: 3
      },
      940: {
        items: 3
      }
    },
  };
  TestingOw2: OwlOptions = {
    loop: false,
    autoplay: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    center: true,
    margin:0,
    autoplaySpeed: 1000,
    navSpeed: 1000,
    animateIn: 'fadeIn',
    animateOut: 'fadeOut',
    nav: false,
    navText: ['<img src="https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_mobile/images/Ifsc-owl-right.png" alt=\'LeftArrow\' class=\'ifsc_page_owl3 owl-nav3 owl-prev3 main_move_left3\'>',
      '<img src="https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_mobile/images/Ifsc-owl-left.png" alt=\'RightArrow\' class=\'ifsc_page_owl3 owl-nav3 owl-next3 main_move_right3\'>'],
    responsive: {
      0: {
        items: 1.5
      },
      600: {
        items: 1.2
      },
      1000: {
        items: 1.2
      }
    }
  };
  TestingOwl3: OwlOptions = {
    loop: false,
    // margin:10,
    nav: true,
    dots: false,
    autoplay: false                                              ,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    center: true,
    navText: ['<img src="https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_mobile/images/Ifsc-owl-right.png" alt=\'LeftArrow\' class=\'ifsc_page_owl4 owl-nav4 owl-prev4 main_move_left4\'>',
      '<img src="https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_mobile/images/Ifsc-owl-left.png" alt=\'RightArrow\' class=\'ifsc_page_owl4 owl-nav4 owl-next4 main_move_right4\'>'],
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 1
      },
      1000: {
        items: 1
      }
    }
  };
  TestingOwl: OwlOptions = {
    loop: false,
    // margin:10,
    nav:false,
    dots: false,
    // autoplay:true,
    autoplayTimeout:3000,
    autoplayHoverPause:true,
    center: true,
    navText: ['<img src="https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_mobile/images/Ifsc-owl-right.png" alt=\'LeftArrow\' class=\'ifsc_page_owl2 owl-nav2 owl-prev2 main_move_left2\'>',
    '<img src="https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_mobile/images/Ifsc-owl-left.png" alt=\'RightArrow\' class=\'ifsc_page_owl2 owl-nav2 owl-next2 main_move_right2\'>'],
    responsive:{
        0:{
            items:3
        },
        600:{
            items:3
        },
        1000:{
            items:3
        }
    }
  };
  
  text1: any;
  propertyimage = this.Service.imagesURL + 'uploadPropertyImgs/';
  private routeSub: Subscription;

changeText: boolean;
  htmlbankname: any;
  current_ifsc: any;
  current_micr: any;
  blogs: any;
  branch: any;
  Trending_Blogs: any;
  Entertainment_blogs: any;
  Meta_bankname: any;
  Meta_details: any;
  Meta_statename: any;
  Meta_cityname: any;
  constructor(
    private clipboardService: ClipboardService,
    @Inject(WINDOW) private window: Window,
    private activeroute: ActivatedRoute,
    public Service: DataService,
    public Service2 :DataService2,
    private router: Router,
    @Inject(LOCAL_STORAGE) private Local_Storage: any,
    private titleService: Title, private meta: Meta,
  ) { 
    this.changeText = false;
  }
  
  registerForm: FormGroup;
  ngOnInit(): void {
    this.GetAllDetailsName();
    // this.getAllindiaBanks();
    this.GetAllStateName();
    this.GetAllCityName();
    this.GetAllBranchName();
    
    this.getAlllocationlist();
    // this.metaseo();
    var giftofspeed = document.createElement('link');
    giftofspeed.rel = 'stylesheet';
    giftofspeed.href = 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/plugins/ngx-owl-carousel-o/lib/styles/prebuilt-themes/owl.carousel.min.css';
    giftofspeed.type = 'text/css';
    var godefer = document.getElementsByTagName('link')[0];
    godefer.parentNode.insertBefore(giftofspeed, godefer);

    var giftofspeed2 = document.createElement('link');
    giftofspeed2.rel = 'stylesheet';
    giftofspeed2.href = 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/plugins/ngx-owl-carousel-o/lib/styles/prebuilt-themes/owl.theme.default.min.css';
    giftofspeed2.type = 'text/css';
    var godefer2 = document.getElementsByTagName('link')[0];
    godefer2.parentNode.insertBefore(giftofspeed2, godefer2);
    this.stickyload();
    $(".result").hover(
      function () {
        $(this).addClass("result_hover");
      },
      function () {
        $(this).removeClass("result_hover");
      }
    );
    this.affordablePropDetails();

  }
  // metaseo(){

  // }
  componentloads = false;

  @HostListener('window:scroll', ['$event'])
  @HostListener('touchstart', ['$event'])
  onWindowScroll() {
    this.Service.mouseenterservice3();
    if (this.componentloads == false) {
      this.componentloads = true;
      this.getAllindiaBanks();
    }
    }
  StateName:any;
  SelectedAllBankingNames:any;
  selectedBanks:any
  // ************* Bank APIs Start  ***************//
  getAllindiaBanks(){
    this.Service2.getallbankingnames().subscribe((allbanklist: any[]) => {
      this.SelectedAllBankingNames = allbanklist['BankDetails'];
    });
  }
  citiess: any;
  getAlllocationlist() {
    this.Service.getlocationlist().subscribe(city => {
      this.citiess = city['locations'];
    });
  }
  GetBankNameNav() {
    var bankName = $('#Bank_Name').val();
    this.Local_Storage.setItem('Bank_Name', bankName);

    if(this.selectedBanks == null){
    }else{
      this.router.navigate(['/all-ifsc-and-micr-code/' + bankName.replace(/\s+/g, '-').toLowerCase()]);
    }
  }
  // ************* Bank APIs End  ***************//

  // ************* State APIs start  ***************//
  Bankname:any
  selectedState:any;
  GetAllStateName(){
    this.routeSub = this.activeroute.params.subscribe(params => {
      var BankName = params['Bankname'].replace(/-/g, ' ');
      this
      this.Bankname = BankName.replace(/\s+/g, '-').toLowerCase()
        var param = {
        Bank : BankName
      };
      this.Service2.IfscFetching(param).subscribe(lists => {
       var State  = lists['BankDetails'];
       this.StateName = State
      });
    })
  }

  GetStateNameNav() {
    var StateName = $('#State_Name').val();
    this.StateName = StateName.replace(/\s+/g, '-').toLowerCase()
    this.Local_Storage.setItem('State_Name', StateName);

    if(this.selectedState == null){
    }else{
      this.router.navigate(['/all-ifsc-and-micr-code/' + this.Bankname+'/'+ this.StateName]);
    }
  }
    // ************* State APIs End  ***************//

  // ************* City APIs start  ***************//
  Cityname:any
  selectedCity:any;
  ApicityName:any;
  Bankname_1:any;
  StateName_1:any;
  GetAllCityName(){
    this.routeSub = this.activeroute.params.subscribe(params => {
      var BankName = params['Bankname'].replace(/-/g, ' ');
      var StateName = params['Statename'].replace(/-/g, ' ');
      this.Bankname_1 = BankName.replace(/\s+/g, '-');;
      this.StateName_1 = StateName.replace(/\s+/g, '-');
        var param = {
        Bank : BankName,
        State: StateName,
        City:  this.Cityname
      };
      this.Service2.IfscFetching(param).subscribe(lists => {
       var City  = lists['BankDetails'];
       this.ApicityName = City
      });
      // 
      // 
    })
  }
  GetCityNameNav() {
    var CityName = $('#City_Name').val();
    this.Cityname = CityName.replace(/\s+/g, '-').toLowerCase()
    this.Local_Storage.setItem('City_Name', CityName);

    if(this.selectedCity == null){
    }else{
      this.router.navigate(['/all-ifsc-and-micr-code/' + this.Bankname_1+'/'+ this.StateName_1 +'/'+ this.Cityname]);
    }
  }
    // ************* City APIs End  ***************//

  // ************* Branch APIs start  ***************//
  Branchname:any
  selectedBranch:any;
  ApiBranchName:any;
  Bankname_2:any;
  StateName_2:any;
  Cityname_2:any;
  GetAllBranchName(){
    this.routeSub = this.activeroute.params.subscribe(params => {
      var BankName = params['Bankname'].replace(/-/g, ' ');
      var StateName = params['Statename'].replace(/-/g, ' ');
      var CityName = params['Cityname'].replace(/-/g, ' ');
      this.Bankname_2 = BankName.replace(/\s+/g, '-');
      this.StateName_2 = StateName.replace(/\s+/g, '-');
      this.Cityname_2 = CityName.replace(/\s+/g, '-');
        var param = {
        Bank : BankName,
        State: StateName,
        City:  CityName,
        Branch : this.Branchname
      };
      this.Service2.IfscFetching(param).subscribe(lists => {
       var Branch  = lists['BankDetails'];
       this.ApiBranchName = Branch;

      var Details  = lists['BankDetails'];
      this.ApiDetails = Details;
      var Branchcode = Details[0]['ifsc'].slice(5);
      this.BranchCode =  Branchcode
      var BranchName = Details[0]['branch']
      this.Local_Storage.setItem('Branch_Name', BranchName);
      });
      // this.Service2.IfscFetching(param).subscribe(lists => {
   
      //  });
    })
  }
  GetBranchNameNav() {
    var BranchName = $('#Branch_Name').val();
    this.Branchname = BranchName.replace(/\s+/g, '-').toLowerCase()
    // this.Local_Storage.setItem('Branch_Name', BranchName);
    // 

    if(this.selectedBranch == null){
    }else{
      this.router.navigate(['/all-ifsc-and-micr-code/' + this.Bankname_2+'/'+ this.StateName_2 +'/'+ this.Cityname_2 +'/'+this.Branchname]);
    }
  }
    // ************* Branch APIs End  ***************//
  // ************* details APIs start  ***************//
  Detailsname:any
  selectedDetails:any;
  ApiDetails:any;
  Bankname_3:any;
  StateName_3:any;
  Cityname_3:any;
  BranchCode:any
  ApiMain_Id_details:any;
  details_Id:any;
  current_Branch_name:any
  GetAllDetailsName(){
    this.routeSub = this.activeroute.params.subscribe(params => {
      var BankName = params['Bankname'].replace(/-/g, ' ');
      var StateName = params['Statename'].replace(/-/g, ' ');
      var Branch = params['Details'].replace(/-/g, ' ');
      var CityName = params['Cityname'].replace(/-/g, ' ');

      String.prototype.toLocaleUpperCase = function () {
        return this.replace(/\w\S*/g, function (txt) {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
      };
      this.Meta_bankname = params['Bankname'].replace(/-/g, ' ').toLocaleUpperCase();
      this.Meta_statename = params['Statename'].replace(/-/g, ' ').toLocaleUpperCase();
      this.Meta_cityname = params['Cityname'].replace(/-/g, ' ').toLocaleUpperCase();
      this.Meta_details = params['Details'].replace(/-/g, ' ').toLocaleUpperCase();

      this.titleService.setTitle('IFSC and MICR Code of ' + this.Meta_bankname + ' ' + this.Meta_details +' | Homes247');
      this.meta.updateTag({
        name: 'description',
        content: 'Details of ' + this.Meta_bankname + ' ' + this.Meta_details + ' IFSC and MICR Code on Homes247'
      });
      this.Service.createLinkForCanonicalURL();


      this.Bankname_2 = BankName.replace(/\s+/g, '-');
      this.StateName_2 = StateName.replace(/\s+/g, '-');
      this.Cityname_2 = CityName.replace(/\s+/g, '-');
      this.branch = Branch.replace(/-/g, ' ');
      this.htmlbankname = BankName;
      //   var param = {
      //   Bank : BankName,
      //   State: StateName,
      //   City:  CityName,

      // };

      
      var id = params['Id']
      // 
      var param1 = {
        Id : id,
      };
      this.details_Id = id;
      this.Service2.IfscIdFetching(param1).subscribe(lists => {
       var Details = lists['BankDetails'];
       this.ApiMain_Id_details = Details;
       this.current_Branch_name = this.ApiMain_Id_details[0]['branch'].toLowerCase();
       this.current_ifsc = this.ApiMain_Id_details[0]['ifsc'];
       this.current_micr = this.ApiMain_Id_details[0]['micr'];
      //  
      });
      
    })
  }
  // GetDetailsNameNav() {
  //   var BranchName = $('#Branch_Name').val();
  //   this.Branchname = BranchName.replace(/\s+/g, '-').toLowerCase()
  //   this.Local_Storage.setItem('Details', BranchName);
  //   // 

  //   if(this.selectedBranch == null){
  //   }else{
  //     this.router.navigate(['/all-ifsc-and-micr-code/' + this.Bankname_2+'/'+ this.StateName_2 +'/'+ this.Cityname_2 +'/'+this.Branchname]);
  //   }
  // }
    // ************* details APIs End  ***************//
    copied:boolean=false;
  getcityname(event) {
    const city = event.target.value;
    
  }
  copyContent() {
    var cookieValue = $('#ifsc').text();
    this.clipboardService.copyFromContent(cookieValue);
    this.copied= true
  }
  readmore() {
    $('.banner_description').css('height', '200px');
    $('.banner_description').css('overflow-y', 'scroll');
    $('.down_arrow').css('display', 'none');
    $('.up_arrow').css('display', 'block');
  }

  readless() {
    $('.banner_description').css('height', '150px');
    $('.banner_description').css('overflow-y', 'hidden');
    $('.down_arrow').css('display', 'block');
    $('.up_arrow').css('display', 'none');
  }
    iconOne = true;
  iconTwo = true;
  iconThree = true;
  iconFour = true;
  iconamenities = true;
  faqMore = false;

  onIconOne() {
    if (this.iconOne === true) {
      this.iconOne = false;
      this.iconTwo = false;
      this.iconamenities = true;
      this.iconThree = true;
      this.iconFour = true;
    } else if (this.iconOne === false) {
      this.iconamenities = true;
      this.iconOne = true;
      this.iconTwo = true;
      this.iconThree = true;
      this.iconFour = true;
    }
  }
  blogimagePath = this.Service.imagesURL + 'stories/';
  affordablePropDetails() {
    const id = '1'
    this.Service2.getcategoryblogs(id).subscribe(blogs => {
    this.Trending_Blogs = blogs['blogcategory'];
    });
    var idd = '18'
    this.Service2.getcategoryblogs(idd).subscribe(blogs => {
    this.Entertainment_blogs = blogs['blogcategory'];
    });
  }
  localitys: any;
  locality = [];
  stickyload() {
    $(this.window).scroll(function () {
      if ($(this).scrollTop() > 10) {
        $('.top_section_mainheader').css('display', 'none');
        // $('.top_section_mainheader').css('transition', '0.3s ease-in-out');
        $('.fixed_section_SubHeader').css('display', 'block');
        $('.fixed_section_SubHeader').addClass('fixed_search');
        $('.fixed_section_SubHeader').css('margin-top', '0px');
        // $('.fixed_section_SubHeader').css('transition', '0.2s ease-in-out');
      } else {
        $('.top_section_mainheader').css('display', 'block');
        // $('.top_section_mainheader').css('transition', '0.3s ease-in-out');
        $('.fixed_section_SubHeader').css('display', 'block');
        $('.fixed_section_SubHeader').css('margin-top', '49px');
        // $('.fixed_section_SubHeader').css('transition', '0.2s ease-in-out');
      }
      if ($(this).scrollTop() > 800) {
        $('#filterId').addClass('filterSelectedDivOnScroll');
        $('#filterId').removeClass('filterSelectedDiv');
      } else {
        $('#filterId').addClass('filterSelectedDiv');
        $('#filterId').removeClass('filterSelectedDivOnScroll');
      }
    });
    // var regionid = '';
    // const cityid = '1'
    // this.Service.getlocality(cityid, regionid).subscribe(localitys => {
    //   this.localitys = localitys['details'];
    // });
  }
  onLocalityChange(event) {
    var text = $("#multi-select").dropdown("get value");
    // this.Filter.Servicelocality = text;
    this.locality = text;
    // 
    // this.showLoader = true;
    // this.sectionFirstResponce = false;
    // // this.getcity();
    // this.Service.mouseenterservice1();
  }
//   mouseEnter(div : string){
//     
//  }

//  mouseLeave(div : string){
//    
//  }
}
