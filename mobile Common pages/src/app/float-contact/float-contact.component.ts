
import {Component, ElementRef, HostListener, Inject, OnInit, ViewChild} from '@angular/core';
import {Enquiry, User} from '../home/home';
import {FormBuilder, FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {CountdownComponent, CountdownEvent} from 'ngx-countdown';
import {DataService} from '../data.service';
import {Meta, Title} from '@angular/platform-browser';
import {Router} from '@angular/router';
import {DOCUMENT, Location} from '@angular/common';
import {WINDOW} from '@ng-toolkit/universal';
import {map, startWith} from 'rxjs/operators';
import {OwlOptions , SlidesOutputData} from 'ngx-owl-carousel-o';
import { CityService } from '../city.service';
declare var $: any;
declare var swal: any;
declare var $: any;
@Component({
  selector: 'app-float-contact',
  templateUrl: './float-contact.component.html',
  styleUrls: ['./float-contact.component.css']
})
export class FloatContactComponent implements OnInit {

  id;
  products = [];
  metas = [];
  citiess: any;
  SelectCity = 'Select City';
  selectedLocation;
  topProperties = [];
  newProperties = [];
  blogs: any;
  propertyname: any;
  cityid: any;
  iconShow = true;
  currentCity = 'Select City';
  imagepath = this.dataService.imagesURL + "cities/";
  propertyimage = this.dataService.imagesURL + "uploadPropertyImgs/";
  blogimagePath = this.dataService.imagesURL + "stories/";
  date: any;
  user = new Enquiry();
  enquiry = new Enquiry();
  blogsloader = true;
  newlaunchesloader = true;
  topprojectsloader = true;

  myControl = new FormControl();
  options;
  filteredOptions: Observable<any>;
  currentCitySearchNav;
  locationSelectedId = '1';


  changeText: boolean;
  // myControl = new FormControl();
  // options;
  // filteredOptions: Observable<any>;
  hidemobile: boolean;
  hidedesktop: boolean;
  // locationSelectedId = '1';
  @ViewChild('cancel') cancel: ElementRef;
  @ViewChild('scrollapiloader') scrollapiloader: ElementRef;
  @ViewChild('cdflot', {static: false}) private countdownflot: CountdownComponent;

  constructor(private dataService: DataService, private _formBuilder: FormBuilder,
              private titleService: Title,
              private meta: Meta, private router: Router,
              private _location: Location, @Inject(DOCUMENT) private doc,
              @Inject(WINDOW) private window: Window,
              public cityservice: CityService
  ) {
    this.router.events.subscribe((evt) => {
      // trick the Router into believing it's last link wasn't previously loaded
      this.router.navigated = false;
      // if you need to scroll back to top, here is the right place
      window.scrollTo(0, 0);
    });
  }

  ngOnInit(): void {
    $(".tile .float").click(function(){
      $(this).html($(this).html() == '<i class="fa fa-times my-float"></i>' ? '<img src="https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_mobile/images/icons/Call-icon.svg" alt="Call-icon.svg">' : '<i class="fa fa-times my-float"></i>');
     $(".tile .soc").toggleClass("pad");
     });
     var value = this.cityservice.cityfinder(this.router.url);
     // this.currentCity = value;
     // this.cityidseo = value.cityid;
     this.cityid = value.cityid;
  }

  
  getenquiry(id, name) {
    this.enquiry.propertyname = name;
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
  countdownconfigflot = {
    leftTime: 30,
    demand: true
  };
  otpexpired = false;

  handleEvent(e: CountdownEvent) {
    if (e.action === 'done') {
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
    var param = this.user;
    param.otp = otp;
  }

  otploader = false;


  goback() {
    $('#flot-modal-container').addClass('out');
    $('body').removeClass('modal-active');
  }

  otpsend1() {
    if ($('#name2').val() == '') {
      $('#name2').focus().css('border-color', 'red').attr('placeholder', 'Please Enter Name');
      return false;
    } else {
      var nameFilter = /^([a-zA-Z]+\s)*[a-zA-Z]+$/;
      if (nameFilter.test($('#name2').val())) {
        $('#name2').removeAttr('style');
      } else {
        $('#name2').focus().css('border-color', 'red').attr('placeholder', 'Please enter valid name').val('');
        return false;
      }
    }
    if ($('#mobile2').val() == '') {
      $('#mobile2').focus().css('border-color', 'red').attr('placeholder', 'Please Enter Phone Number');
      return false;
    } else {
      var mobileno = /^[0-9]{10}$/;
      if (mobileno.test($('#mobile2').val())) {
        $('#mobile2').removeAttr('style');
      } else {
        $('#mobile2').focus().css('border-color', 'red').attr('placeholder', 'Please enter valid contact number').val('');
        return false;
      }
    }
    if ($('#email2').val() === '') {
      $('#email2').focus().css('border-color', 'red').attr('placeholder', 'Please Enter Email-id');
      return false;
    } else {
      var emai = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
      if (emai.test($('#email2').val())) {
        $('#email2').removeAttr('style');
      } else {
        $('#email2').focus().css('border-color', 'red').attr('placeholder', 'Please enter valid email-id').val('');
        return false;
      }
    }
    this.otploader = true;
    this.callback();
    // $('body').addClass('bodyoverlay');
    // var param = this.user;
    // this.dataService.otpsend(param).subscribe((success) => {
    //   var prestatus = success['Data'];
    //   var status = prestatus[0].MessageErrorDescription;
    //   if (status == 'Success') {
    //     this.callback();
    //     this.countdownflot.begin();
    //     var buttonId = $('#flotone').attr('id');
    //     $('#flot-modal-container').removeAttr('class').addClass(buttonId);
    //      $('#myModal_dash').modal('hide');
    //     $('body').addClass('modal-active');
    //     this.otploader = false;
    //     $('body').removeClass('bodyoverlay');
    //   } else {
    //     swal({
    //       title: 'Oops Something Error!',
    //       type: 'error',
    //       showConfirmButton: false,
    //       timer: 1500
    //     });
    //   }
    // }, (err) => {
    //   
    // });
  }

  // otpvalidate() {
  //   var otplength = 4;
  //   if ($('#flototp').val() == '') {
  //     swal({
  //       title: 'Please enter the OTP!',
  //       type: 'error',
  //       showConfirmButton: false,
  //       timer: 1000
  //     });
  //     return false;
  //   } else {
  //     var liveotpcount = $('#flototp').val().length;
  //     if (liveotpcount < otplength) {
  //       swal({
  //         title: 'Please enter the valid OTP!',
  //         type: 'warning',
  //         showConfirmButton: false,
  //         timer: 1500
  //       });
  //       return false;
  //     } else {
  //     }
  //   }
  //   var param = this.user;
  //   this.otploader = true;
  //   $('body').addClass('bodyoverlay');
  //   this.dataService.otpvalidcheck(param).subscribe((success) => {
  //     var status = success['status'];
  //     if (status == 'True') {
  //       this.otploader = false;
  //       $('body').removeClass('bodyoverlay');
  //       swal({
  //         title: 'OTP Verified',
  //         text: 'We Will Intimate you soon!',
  //         type: 'success',
  //         showConfirmButton: false,
  //         timer: 2500
  //       });
  //       $('#flot-modal-container').addClass('out');
  //       $('body').removeClass('modal-active');
  //       this.countdownflot.restart();
  //       this.user.name = '';
  //       this.user.number = '';
  //       this.user.otp = '';
  //       this.user.email = '';
  //       $('#btn_reset').click();
  //       this.cancel.nativeElement.click();
  //     } else {
  //       this.otploader = false;
  //       $('body').removeClass('bodyoverlay');
  //       swal({
  //         title: 'Oops Something Error!',
  //         text: 'Its Not a valid OTP / OTP Expired!',
  //         type: 'error',
  //         showConfirmButton: false,
  //         timer: 1500
  //       });
  //     }
  //   }, (err) => {
  //     
  //   });
  // }

  callback() {
    var param = this.user;
    var pageorgin = 'Floating Form';

    this.dataService.addAboutCall(param, pageorgin, this.cityid).subscribe((success) => {
      var status = success['status'];
      if (status == 'True') {
        this.otploader = false;
        $('body').removeClass('bodyoverlay');
        swal({
          // title: 'OTP Verified',
          text: 'We Will Intimate you soon!',
          type: 'success',
          showConfirmButton: false,
          timer: 2500
        });
        $('#flot-modal-container').addClass('out');
        $('body').removeClass('modal-active');
      } else {
        swal({
          title: 'Ooops!!',
          text: 'OTP Verified But Some Error Occured Please try again!',
          type: 'error',
          showConfirmButton: false,
          timer: 1500
        });
      }
    }, (err) => {
      
    });
  }

  onImageClick(){
    var topPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    window.location.hash = 'floatingcontact';
    document.documentElement.scrollTop = topPos;
  }
}