import { Component, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LOCAL_STORAGE, WINDOW } from '@ng-toolkit/universal';
import { CountdownComponent, CountdownEvent } from 'ngx-countdown';
import { CityService } from '../city.service';
import { DataService } from '../data.service';
import { FilterService } from '../filter.service';
import { Enquiry } from '../home/home';

declare var $: any;
declare var swal: any;

@Component({
  selector: 'app-enquiry-form-ind',
  templateUrl: './enquiry-form-ind.component.html',
  styleUrls: ['./enquiry-form-ind.component.css']
})
export class EnquiryFormindComponent implements OnInit {
  Visiblebrochure = true;

  RegistrationForm: FormGroup;
  @ViewChild('cd4', { static: false }) private countdown4: CountdownComponent;
  @Output() apiResponse = new EventEmitter<any>();
  @ViewChild('ngOtpInput', { static: false }) ngOtpInput: any;
  otpexpired = false;
  userDetails = [];
  UserName;
  UserId;
  UserEmail;
  UserNumber;
  numberLogIn = true;
  title: any;
  ipAddress: any;
  cityname: any;
  cityid: any;
  pageOrigin: any;
  browser: any;
  enquiry = new Enquiry();
  otpValidating = false;
  otploader = false;

  config = {
    allowNumbersOnly: false,
    length: 4,
    isPasswordInput: false,
    disableAutoFocus: false,
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

  constructor(
    @Inject(WINDOW) private window: Window,
    @Inject(LOCAL_STORAGE) private Local_Storage: any,
    private Filter: FilterService,
    public Service: DataService,
    private router: Router,
    public cityservice: CityService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.RegistrationForm = new FormGroup({
      newUserName: new FormControl(''),
      userNumber: new FormControl(''),
      answerData: new FormControl(''),
    });
    this.Visiblebrochure = true;
  }

  loginclose() {
    this.window.location.hash = '';
    $('#otpValidateind').css('display', 'none');
  }

  goback1() {
    $('.OtpDiv').css('display', 'none');
    this.numberLogIn = true;
    this.countdownconfig = {
      leftTime: 30,
      demand: true
    };
    this.otpValidating = false;

  }

  otpBasedLogin() {
    if ($('#newUserName').val() == '') {
      $('#newUserName').focus().css('border-color', 'red').attr('placeholder', 'Please Enter Name');
      return false;
    } else {
      var enameFilter = /^([a-zA-Z]+\s)*[a-zA-Z]+$/;
      if (enameFilter.test($('#newUserName').val())) {
        $('#newUserName').removeAttr('style');
      } else {
        $('#newUserName').focus().css('border-color', 'red').attr('placeholder', 'Please Enter Valid Name').val('');
        return false;
      }
    }
    if ($('.InputNumber').val() === '') {
      $('.InputNumber').focus().css('border-color', 'red').attr('placeholder', 'Please Enter Phone Number');
      // 
      return false;
    } else {
      var emobileno = /^[0-9]{10}$/;
      if (emobileno.test($('.InputNumber').val())) {
        $('.InputNumber').removeAttr('style');
      } else {
        $('.InputNumber').focus().css('border-color', 'red').attr('placeholder', 'Please enter valid contact number').val('');
        return false;
      }
    }
    this.otploader = true;
    // this.addenquiry();
    this.SubmitForm();
  }
  contactedRentalarr = [];

  SubmitForm() {
    var param = this.enquiry;
    this.enquiry.localityId = this.Filter.localityid;
    this.enquiry.propertyid = this.Filter.propid;

    let browserInfo = navigator.userAgent;
    let browser;

    if (browserInfo.includes('Opera') || browserInfo.includes('Opr')) {
      browser = 'Opera';
    } else if (browserInfo.includes('Edg')) {
      browser = 'Edge';
    } else if (browserInfo.includes('Chrome')) {
      browser = 'Chrome';
    } else if (browserInfo.includes('Safari')) {
      browser = 'Safari';
    } else if (browserInfo.includes('Firefox')) {
      browser = 'Firefox'
    } else {
      browser = 'unknown'
    }
    var utm_medium = this.route.snapshot.queryParamMap.get('utm_medium');
    if (utm_medium) {
      this.enquiry.source = 'Homes247-Campaign'
      this.enquiry.propertyname = this.Filter.PropertyName + ' && ' + utm_medium;

    } else {
      this.enquiry.source = 'Homes247-Mobile'
      this.enquiry.propertyname = this.Filter.PropertyName;

    }
    if (this.Filter.proptype !== 'Plot') {
      var pageOrgin = this.Filter.Bedrooms + '-' + this.Filter.proptype + '-' + this.Filter.PropertyName;
    }
    if (this.Filter.proptype === 'Plot') {
      var pageOrgin = this.Filter.area + ' ' + this.Filter.areatype + '-' + this.Filter.proptype + '-' + this.Filter.PropertyName;
    }

    this.Service.individuallistenq(param, pageOrgin, this.Filter.PropertyName, this.Filter.userIdfk).subscribe(success => {
      if (success['status'] === 'True') {
        this.otploader = false;
        if (success['code'] === "3") {
          this.otpHandle();
        } else {
          $('#otpValidateind').css('display', 'none');
          swal({
            text: 'We Will Intimate you soon!',
            type: 'success',
            showConfirmButton: false,
            timer: 2500
          });
          if ('contactedIndividualPropId' in this.Local_Storage) {
            this.contactedRentalarr = JSON.parse(this.Local_Storage.getItem('contactedIndividualPropId') || '[]');
          } else {
            this.contactedRentalarr = [];
          }
          if (!this.contactedRentalarr.includes(this.Filter.propid)) {
            this.contactedRentalarr.push(this.Filter.propid);
            this.Local_Storage.setItem('contactedIndividualPropId', JSON.stringify(this.contactedRentalarr));
          }
        }
        this.enquiry.verification = 1;
      } else {
        swal({
          type: 'error',
          title: 'Something Went Wrong',
          showConfirmButton: false,
          timer: 1500,
        });
        this.otploader = false;
      }
    });
  }
  // addenquiry() {
  //   var value = this.cityservice.cityfinder(this.router.url);
  //   this.cityname = value.cityname.replace('-', ' ');
  //   this.cityid = value.cityid;

  //   var urlValue = this.cityservice.urlFinder(this.router.url);
  //   this.pageOrigin = urlValue.pageOrigin

  //   let browserInfo = navigator.userAgent;
  //   let browser;

  //   if (browserInfo.includes('Opera') || browserInfo.includes('Opr')) {
  //     browser = 'Opera';
  //   } else if (browserInfo.includes('Edg')) {
  //     browser = 'Edge';
  //   } else if (browserInfo.includes('Chrome')) {
  //     browser = 'Chrome';
  //   } else if (browserInfo.includes('Safari')) {
  //     browser = 'Safari';
  //   } else if (browserInfo.includes('Firefox')) {
  //     browser = 'Firefox'
  //   } else {
  //     browser = 'unknown'
  //   }
  //   var utm_medium = this.route.snapshot.queryParamMap.get('utm_medium');

  //   this.browser = browser
  //   var pageorgin = this.cityname + '_' + this.pageOrigin;
  //   this.otploader = true;
  //   this.enquiry.localityId = this.Filter.localityid;
  //   this.enquiry.regionId = this.Filter.RegionID;

  //   if (utm_medium) {
  //     this.enquiry.source = 'Homes247-Campaign'
  //     this.enquiry.propertyname = this.Filter.PropertyName + ' && ' + utm_medium;

  //   } else {
  //     this.enquiry.source = 'Homes247-Mobile'
  //     this.enquiry.propertyname = this.Filter.PropertyName;

  //   }
  //   var param = this.enquiry;
  //   this.Service.addPropertyCallEnquiry(param, pageorgin, this.cityid, this.browser).subscribe(success => {
  //     if (success['status'] === 'True') {
  //       this.otploader = false;
  //       if (success['code'] === "3") {
  //         this.otpHandle();
  //       } else {
  //       $('#otpValidateind').css('display', 'none');
  //         swal({
  //           text: 'We Will Intimate you soon!',
  //           type: 'success',
  //           showConfirmButton: false,
  //           timer: 2500
  //         });
  //       }
  //       $('body').removeClass('modal-open');
  //     }
  //   });
  // }

  otpHandle() {
    var param = this.enquiry;
    this.Filter.name = param.name;
    this.Filter.number = param.number;
    this.Filter.email = param.email;
    this.Service.otpsend(param).subscribe((success: { messages }) => { 
          var status = success.messages[0].status;
          if (status == 'ENQUEUED') {
        this.numberLogIn = false;
        this.otpValidating = true;
        this.otploader = false;
        $('.OtpDiv').css('display', 'block');
        $('.countdown_maindiv').css('display', 'block');
        $('.otpexpireclass').css('display', 'none');
        this.countdown4.begin();
        this.ngOtpInput.setValue('');
        var buttonId = $('#one').attr('id');
      } else {
        swal({
          title: 'Oops Something Error!',
          type: 'error',
          showConfirmButton: false,
          timer: 1500
        });

      }
    }, (err) => {

    });
  }

  handleEvent(e: CountdownEvent) {
    if (e.action === 'done') {

      $('.countdown_maindiv').css('display', 'none');
      if (this.clickCount == 2) {
        $('.otpexpireclass2').css('display', 'block');
      } else {
        $('.otpexpireclass').css('display', 'block');
      }
    }
  }

  onOtpChange(otp) {
    var param = this.enquiry;
    param.otp = otp;
  }

  otpvalidate4() {
    var otplength = 4;
    if ($('#otp').val() == '') {
      this.ngOtpInput.setValue('');
      swal({
        title: 'Please enter the OTP!',
        type: 'error',
        showConfirmButton: false,
        timer: 1000
      });
      return false;
    } else {
      var liveotpcount = $('#otp').val().length;
      if (liveotpcount < otplength) {

        this.ngOtpInput.setValue('');

        swal({
          title: 'Please enter the valid OTP!',
          type: 'warning',
          showConfirmButton: false,
          timer: 1500
        });
        return false;


      } else {
      }
    }
    this.otploader = true;
    var param = this.enquiry;
    this.Service.otpvalidcheck(param).subscribe((success) => {
      var status = success['status'];
      if (status == 'True') {
        // this.otpUserLoginNewAPI();
        this.enquiry.verification = 2;
        this.SubmitForm();
        this.numberLogIn = true;
        $('.OtpDiv').css('display', 'none');
        $('#otpValidateind').css('display', 'none');
        this.otpValidating = false;
        this.countdown4.restart();
        // swal({
        //   text: 'We Will Intimate you soon!',
        //   type: 'success',
        //   showConfirmButton: false,
        //   timer: 2500
        // });
      } else {
        this.ngOtpInput.setValue('');
        this.otploader = false;
        swal({
          title: 'Oops Something Error!',
          text: 'Its Not a valid OTP / OTP Expired!',
          type: 'error',
          showConfirmButton: false,
          timer: 1500
        });
      }
    }, (err) => {

    });
  }

  clickCount = 0;
  otpBasedLogin1() {
    this.clickCount++;
    const paramNum = {
      number: this.enquiry.number
    }
    this.countdownconfig = {
      leftTime: 30,
      demand: true
    };

    this.ngOtpInput.setValue('');
    this.otploader = true;
    this.Service.otpsend(paramNum).subscribe((success: { messages }) => { 
          var status = success.messages[0].status;
          if (status == 'ENQUEUED') {
        $('.countdown_maindiv').css('display', 'block');
        $('.otpexpireclass').css('display', 'none');
        this.countdown4.begin();
        this.otploader = false;
        // var buttonId = $('#one').attr('id');
        // $('#modal-container').removeAttr('class').addClass(buttonId);
        // $('body').addClass('modal-active');
        // $('body').removeClass('bodyoverlay');
      } else {
        swal({
          title: 'Oops Something Error!',
          type: 'error',
          showConfirmButton: false,
          timer: 1500
        });
        // this.otploader = false;
        // $('body').removeClass('bodyoverlay');
      }
    },
      (err) => {

      });
  }

}
