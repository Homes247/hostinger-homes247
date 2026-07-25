import {Component, Inject, PLATFORM_ID, OnInit, ElementRef, ViewChild, HostListener} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {Meta, Title} from '@angular/platform-browser';
import {Subscription} from 'rxjs';
import {City} from '../city/city';
import { DataService } from '../data.service';
import {ActivatedRoute} from '@angular/router';
import {WINDOW} from '@ng-toolkit/universal';
import {Enquiry} from './online-expo';
import NJTimePicker from 'nj-timepicker';
import {CountdownComponent, CountdownEvent} from "ngx-countdown";
declare var $:any;
declare var swal: any;

declare var $: any;
@Component({
  selector: 'app-online-expo',
  templateUrl: './online-expo.component.html',
  styleUrls: ['./online-expo.component.css']
})
export class OnlineExpoComponent implements OnInit {
  @ViewChild('cd', { static: false }) private countdown: CountdownComponent;
  @ViewChild('scrollapiloader') scrollapiloader: ElementRef;
  static citycount: number;
  private routeSub: Subscription;
  projectcount;
  propertylists;
  showLoader: boolean;
  cityapi = new City();
  propertyimage = this.Service.imagesURL + 'uploadPropertyImgs/';
  Date = new Date();
  enquiry = new Enquiry();
  constructor(public Service: DataService,@Inject(PLATFORM_ID) private readonly platformId: Object,
              private activeroute: ActivatedRoute,private titleService: Title,
              private meta: Meta,@Inject(WINDOW) private window: Window) {

              //  Js Calendar
              let node: any = document.createElement('link');
              node.setAttribute('data-lazy-method','interaction');
              node.setAttribute('data-lazy-attributes','href');
              node.setAttribute('data-lazy-href','https://cdn.jsdelivr.net/npm/simple-jscalendar@1.4.4/source/jsCalendar.min.css');
              node.rel = 'stylesheet';
              node.type = 'text/css';
              document.getElementsByTagName('head')[0].appendChild(node);

              let node1: any = document.createElement('script');
              node1.setAttribute('data-lazy-method','interaction');
              node1.setAttribute('data-lazy-attributes','src');
              node1.setAttribute('data-lazy-src','https://cdn.jsdelivr.net/npm/simple-jscalendar@1.4.4/source/jsCalendar.min.js');
              node1.type = 'text/javascript';
              node1.async = true;
              node1.charset = 'utf-8';
              document.getElementsByTagName('head')[0].appendChild(node1);

              let node5: any = document.createElement('script');
              node5.setAttribute('data-lazy-method','interaction');
              node5.setAttribute('data-lazy-attributes','src');
              node5.setAttribute('data-lazy-src','https://cdn.jsdelivr.net/npm/simple-jscalendar@1.4.4/extensions/jsCalendar.datepicker.min.js');
              node5.type = 'text/javascript';
              node5.async = true;
              node5.charset = 'utf-8';
              document.getElementsByTagName('head')[0].appendChild(node5);

              //  Js Calendar
    this.projectcount = [];
    this.propertylists = [];
  }

  ngOnInit() {
    this.metatags();
    this.getcity();
    this.onresize();
    this.mymobilescript();
  }

  metatags() {
    var PAGEID = "22";
    this.Service.getstaticmeta(PAGEID).subscribe(metatag => {
      const metatags = metatag['Pageseo'];
      this.titleService.setTitle(metatags[0].page_title);
      this.meta.updateTag({name: 'description', content: metatags[0].meta_description});
      this.meta.updateTag({property: 'og:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_mobile/images/logo/Homes247_NewWhite_Logo.svg'});
      this.meta.updateTag({property: 'og:title', content: metatags[0].page_title});
      this.meta.updateTag({property: 'og:description', content: metatags[0].meta_description});
      this.Service.createLinkForCanonicalURL();
    })
  }
  loaded = false;
  divreached = false;
  apiload = false;
  FooterComponent: any;
  FloatContact:any;
  innerheader:any;
  @HostListener('window:scroll', ['$event'])
  onWindowScroll(){
    const elementPosition = this.scrollapiloader.nativeElement.offsetTop;
    const scrollPosition = window.pageYOffset;
    let width = this.window.innerWidth;
    if(this.divreached = scrollPosition >= elementPosition)
    {
      import('../float-contact/float-contact.module').then(mod => mod.FloatContactComponentModule).then(FloatContactComponentModule => {
        this.FloatContact = FloatContactComponentModule.components['lazy'];
        this.loaded = true;
      });
      // import('../innerheader/innerheader.module').then(mod => mod.InnerHeaderModule).then(InnerHeaderModule => {
      //   this.innerheader = InnerHeaderModule.components['lazy'];
      //   this.loaded = true;
      // });
    }
  }
  onresize() {
    const width = this.window.innerWidth;
    if (width > 768) {
      $(this.window).scroll(function(){
        if ($(this).scrollTop() > 280) {
          $('#sideform').addClass('sticky');
          $('.jsCalendar').addClass('calendarsticky');
        }
        if ($(this).scrollTop() < 280) {
          $('#sideform').removeClass('sticky');
          $('.jsCalendar').removeClass('calendarsticky');
        }
        if ($(window).scrollTop() >=  $(".footerDiv").offset().top) {
          $('#conatctbutton').addClass('conatctbuttonhide');
      }
      else {
          $('#conatctbutton').removeClass('conatctbuttonhide');
      }
      });
    } else {
    }
  }

  mymobilescript()
  {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    var date = dd + '/' + mm + '/' + yyyy;

    var elements = document.getElementById("mobiledate");
    var minatt = document.createAttribute("data-min");
    minatt.value = date;
    elements.setAttributeNode(minatt);

    // Date after 10 Days
    var n=7; //number of days to add.
    var todaydate=new Date(); //Today's Date
    var requiredDate=new Date(today.getFullYear(),today.getMonth(),today.getDate()+n);
    var day = String(requiredDate.getDate()).padStart(2, '0');
    var month = String(requiredDate.getMonth() + 1).padStart(2, '0');
    var year = requiredDate.getFullYear();
    var tendaysdate = day + '/' + month + '/' + year;

    var elements = document.getElementById("mobiledate");
    var maxatt = document.createAttribute("data-max");
    maxatt.value = tendaysdate;
    elements.setAttributeNode(maxatt);

    // Time Picker Mobile
    const format_mob = document.querySelector('#format_mob');
    var format_mob_picker = new NJTimePicker({
        targetID: 'format_mob',
        autoSave: true,
        texts: {
            header: 'Pick Your Time Slot ( Service Hours - 10 Am to 8 Pm)'
        }
    });
    format_mob_picker.on('save', function (data) {
        if (data.fullResult)
        format_mob.textContent = data.fullResult;
    });
    format_mob_picker.on('ready', function (data) {

      format_mob_picker.setValue({
            hours: 10,
            minutes: 15,
            ampm: 'am'
        });
    });
// Time Picker Mobile
  }

  youtube(){
    $('.online_video_section img').hide();
    var video_wrapper = $('.video_section');
    if(video_wrapper.length){
    video_wrapper.html('<iframe width="100%" height="230" src="https://www.youtube.com/embed/1FQYJjA2Ctw" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
    }
    }

  IsVisible = false;
  ShowHide() {
    this.IsVisible = this.IsVisible ? false : true;
    $('.jsCalendar').addClass('mobilecalendarclass');
  }

  getcity() {
    OnlineExpoComponent.citycount = 0;
    this.routeSub = this.activeroute.params.subscribe(params => {
      // tslint:disable-next-line:prefer-const
      let citiname = 'bangalore';
      this.cityapi.limit = '0';
      this.cityapi.limitrows = '6';
      const limitparam = 0;
      const limitprprtyrows = 6;
      const limitcrawlrows = 5000;
      const param = {
        limit: limitparam,
        limitrows: limitprprtyrows
      };
      const crawlparam = {
        limit: limitparam,
        limitrows: limitcrawlrows,
      };
      this.Service.getexpolisting(citiname, crawlparam).subscribe(countprojects => {
        const projectcount = countprojects['expodetails'];
        this.projectcount = projectcount.length;
      });

      this.Service.getexpolisting(citiname, param).subscribe(lists => {
        const propertylists = lists['expodetails'];
        this.propertylists = propertylists;
        const apicityname = this.propertylists[0].city_name;
        const apinamecity = apicityname.toLowerCase();
      });
    });
  }

  loadMore() {
    this.routeSub = this.activeroute.params.subscribe(params => {
      const citiname = 'bangalore';
      const totalcount = this.projectcount;
      const limit = OnlineExpoComponent.citycount += 6;
      const limitprprtyrows = 6;
      const param = {
        limit,
        limitrows: limitprprtyrows
      };
      const livecount = this.propertylists.length;
      if (livecount < totalcount) {
        return this.Service.getexpolisting(citiname, param).subscribe(propertylists => {
          var lists = propertylists['expodetails'];
          this.propertylists = this.propertylists.concat(lists);
        });
      } else {
        this.showLoader = false;
      }
    });
  }

  connectnow(){
    if ($('#name').val() == "") {
      $('#name').focus().css("border-color", "red").attr('placeholder', 'Please Enter Name');
      return false;
    } else {
      var enameFilter = /^([a-zA-Z]+\s)*[a-zA-Z]+$/;
      if (enameFilter.test($('#name').val())) {
        $('#name').removeAttr("style");
      } else {
        $('#name').focus().css("border-color", "red").attr('placeholder', 'Please enter valid name').val('');
        return false;
      }
    }
  }

  slotbooking()
  {
    if ($('#name').val() == "") {
      $('#name').focus().css("border-color", "red").attr('placeholder', 'Please Enter Name');
      return false;
    } else {
      var enameFilter = /^([a-zA-Z]+\s)*[a-zA-Z]+$/;
      if (enameFilter.test($('#name').val())) {
        $('#name').removeAttr("style");
      } else {
        $('#name').focus().css("border-color", "red").attr('placeholder', 'Please enter valid name').val('');
        return false;
      }
    }
    if ($('#date').val() == "") {
      $('#date').focus().css("border-color", "red").attr('placeholder', 'Please Select the Date');
      return false;
    } else {}

    if ($('#format_12').val() == "") {
      $('#format_12').focus().css("border-color", "red").attr('placeholder', 'Please Select the Time');
      return false;
    } else {}

    if ($('#application').val() == "") {
      // 
      return false;
    } else {}

    if ($('#number').val() == "") {
      $('#number').focus().css("border-color", "red").attr('placeholder', 'Please Enter the Number or UserId');
      return false;
    } else {}

    swal({
      title: 'We Will Intimate you soon!',
      type: 'success',
      showConfirmButton: false,
      timer: 1500
    })
    this.enquiry.date = $('#date').val();
    this.enquiry.time = $('#format_12').val();
    this.enquiry.application = $('#application').val();
    var param = this.enquiry;

    this.Service.virtualcall(param).subscribe((success) => {
      // var status = success.status;
      this.enquiry.name = '';
      this.enquiry.date = '';
      this.enquiry.time = '';
      this.enquiry.mobile = '';
    }, (err) => {
      
    });

  }

  config = {
    allowNumbersOnly: true,
    length: 4,
    isPasswordInput: false,
    disableAutoFocus: true,
    placeholder: '',
    inputStyles: {
      'width':  '50px',
      'height': '50px'
    }
  };
  countdownconfig = {
    leftTime: 30,
    demand: true
  };
  otpexpired = false;
  handleEvent(e: CountdownEvent) {
    if (e.action === 'done'){
      this.otpexpired = true;
    }
  }
  // start()
  // {
  //   this.countdown.begin();
  // }
  // reset()
  // {
  //   this.countdown.restart();
  // }
  onOtpChange(otp) {
    var param = this.enquiry;
    param.otp = otp;
  }
  otploader = false;
  goback()
  {
    $('#modal-container').addClass('out');
    $('body').removeClass('modal-active');
  }
  otpsend()
  {
    if ($('#mobname').val() == "") {
      $('#mobname').focus().css("border-color", "red").attr('placeholder', 'Please Enter Name');
      return false;
    } else {
      var enameFilter = /^([a-zA-Z]+\s)*[a-zA-Z]+$/;
      if (enameFilter.test($('#mobname').val())) {
        $('#mobname').removeAttr("style");
      } else {
        $('#mobname').focus().css("border-color", "red").attr('placeholder', 'Please enter valid name').val('');
        return false;
      }
    }
    if ($('#mobiledate').val() == "") {
      $('#mobiledate').focus().css("border-color", "red").attr('placeholder', 'Please Select the Date');
      return false;
    } else {}

    if ($('#format_mob').val() == "") {
      $('#format_mob').focus().css("border-color", "red").attr('placeholder', 'Please Select the Time');
      return false;
    } else {}

    if ($('#mobapplication').val() == "") {
      // 
      return false;
    } else {}

    if ($('#mobnumber').val() == "") {
      $('#mobnumber').focus().css("border-color", "red").attr('placeholder', 'Please Enter the Number or UserId');
      return false;
    } else {}

    this.otploader = true;
    $('body').addClass('bodyoverlay');
    var param = this.enquiry;
    this.Service.otpsend(param).subscribe((success) => {
      var prestatus = success['Data'];
      var status = prestatus[0].MessageErrorDescription;
      if(status == "Success"){
        this.countdown.begin();
        var buttonId = $('#one').attr('id');
        $('#modal-container').removeAttr('class').addClass(buttonId);
        $('body').addClass('modal-active');
        this.otploader = false;
        $('body').removeClass('bodyoverlay');
      }else{
        swal({
          title: 'Oops Something Error!',
          type: 'error',
          showConfirmButton: false,
          timer: 1500
        })
        this.otploader = false;
        $('body').removeClass('bodyoverlay');
      }
    }, (err) => {
      
    });
  }
  otpvalidate()
  {
    var otplength = 4;
    if ($('#otp').val() == "") {
      swal({
        title: 'Please enter the OTP!',
        type: 'error',
        showConfirmButton: false,
        timer: 1000
      })
      return false;
    }else{
      var liveotpcount = $('#otp').val().length;
      if(liveotpcount < otplength){
        swal({
          title: 'Please enter the valid OTP!',
          type: 'warning',
          showConfirmButton: false,
          timer: 1500
        })
        return false;
      }else{}
    }
    var param = this.enquiry;
    this.otploader = true;
    $('body').addClass('bodyoverlay');
    this.Service.otpvalidcheck(param).subscribe((success) => {
      var status = success['status'];
      if(status == "True"){
        this.getintouch();
        this.countdown.restart();
      }else{
        this.otploader = false;
        $('body').removeClass('bodyoverlay');
        swal({
          title: 'Oops Something Error!',
          text: 'Its Not a valid OTP / OTP Expired!',
          type: 'error',
          showConfirmButton: false,
          timer: 1500
        })
      }
    }, (err) => {
      
    });
  }

  // getintouch() {
  //
  //   const param = this.enquiry;
  //   const pageorgin = 'Contact Us Page';
  //   this.Service.addAboutCall(param, pageorgin).subscribe(success => {
  //     if(success['status'] === 'True'){
  //       this.otploader = false;
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
  //       this.user.otp = '';
  //       $('#btn_reset').click();
  //     }else{
  //
  //     }
  //     // this.user = success;
  //   });
  //
  // }

  getintouch()
  {
    this.enquiry.date = $('#mobiledate').val();
    this.enquiry.time = $('#format_mob').val();
    this.enquiry.application = $('#mobapplication').val();
    var param = this.enquiry;

    this.Service.virtualcall(param).subscribe((success) => {
      // var status = success.status;
      if(success['status'] === 'True'){
        this.otploader = false;
        $('body').removeClass('bodyoverlay');
        swal({
          title: 'OTP Verified',
          text: 'We Will Intimate you soon!',
          type: 'success',
          showConfirmButton: false,
          timer: 2500
        });
        $('#modal-container').addClass('out');
        $('body').removeClass('modal-active');
        this.enquiry.name = '';
        this.enquiry.date = '';
        this.enquiry.time = '';
        this.enquiry.mobile = '';
        $('#btn_reset').click();
        this.IsVisible = false;
      }else{

      }
      this.enquiry.name = '';
      this.enquiry.date = '';
      this.enquiry.time = '';
      this.enquiry.mobile = '';
    }, (err) => {
      
    });
  }

}
