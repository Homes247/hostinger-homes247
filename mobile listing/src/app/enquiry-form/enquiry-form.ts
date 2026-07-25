import { Component, EventEmitter, Inject, OnInit, Output, viewChild, ElementRef, InjectionToken, PLATFORM_ID } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, isPlatformBrowser, DOCUMENT } from '@angular/common';

// Third party libs
import { CountdownComponent, CountdownEvent } from 'ngx-countdown';
import { NgOtpInputModule } from 'ng-otp-input';

// Your Services
import { CityService } from '../city.service';
import { DataService } from '../data.service';
import { FilterService } from '../filter.service';
import { Enquiry } from '../home/home';
import { SafeStorageService } from '../safe-storage.service';
// Swal lazy-loaded


declare var $: any;
;

@Component({
  selector: 'app-enquiry-form',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgOtpInputModule, CountdownComponent],
  templateUrl: './enquiry-form.html',
  styleUrl: './enquiry-form.css',
  host: { ngSkipHydration: 'true' }
})
export class EnquiryFormComponent implements OnInit {
  readonly countdown4 = viewChild<CountdownComponent>('cd4');
  readonly ngOtpInput = viewChild<any>('ngOtpInput');

  Visiblebrochure = true;
  RegistrationForm!: FormGroup;

  @Output() apiResponse = new EventEmitter<any>();

  otpexpired = false;
  userDetails = [];
  UserName: any;
  UserId: any;
  UserEmail: any;
  UserNumber: any;
  numberLogIn = true;
  title: any;
  ipAddress: any;
  cityname: any;
  cityid: any;
  pageOrigin: any;
  browser: any;
  Contacting_Values: any;
  enquiry = new Enquiry();
  otpValidating = false;
  otploader = false;
  clickCount = 0;
  contactedRentalarr: any[] = [];
  form!: FormGroup;

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

  countdownconfig = {
    leftTime: 30,
    demand: true
  };
  window!: Window;

  constructor(
    private Filter: FilterService,
    public Service: DataService,
    private router: Router,
    public cityservice: CityService,
    private route: ActivatedRoute,
    private storage: SafeStorageService,
    @Inject(DOCUMENT) private doc,
    @Inject(PLATFORM_ID) private platformId: Object,

  ) {
    this.window = this.doc.defaultView!;

  }

  ngOnInit(): void {
    // this.RegistrationForm = new FormGroup({
    //   newUserName: new FormControl(''),
    //   userNumber: new FormControl(''),
    //   answerData: new FormControl(''),
    // });

    this.Visiblebrochure = true;
  }
  loginclose() {
    this.window.location.hash = '';
    $('#otpValidate').css('display', 'none');
  }

  goback1() {
    if (isPlatformBrowser(this.platformId)) {
      $('.OtpDiv').css('display', 'none');
      this.numberLogIn = true;
      // this.countdownconfig = {
      //   leftTime: 30,
      //   demand: true
      // };
      this.countdown4().restart();
      this.otpValidating = false;
    }

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

    this.addenquiry();
  }


  addenquiry() {
    const value = this.cityservice.cityfinder(this.router.url);

    if (!value.cityname) {
      this.cityname = this.Filter.CityName;
      this.cityid = this.Filter.cityid;
    } else {
      this.cityname = value.cityname.replace('-', ' ');
      this.cityid = value.cityid;
    }

    const urlValue = this.cityservice.urlFinder(this.router.url);
    this.pageOrigin = urlValue.pageOrigin;

    const browserInfo = navigator.userAgent;
    let browserName = 'unknown';

    if (browserInfo.includes('Opera') || browserInfo.includes('Opr')) {
      browserName = 'Opera';
    } else if (browserInfo.includes('Edg')) {
      browserName = 'Edge';
    } else if (browserInfo.includes('Chrome')) {
      browserName = 'Chrome';
    } else if (browserInfo.includes('Safari')) {
      browserName = 'Safari';
    } else if (browserInfo.includes('Firefox')) {
      browserName = 'Firefox';
    }

    const utm_medium = this.route.snapshot.queryParamMap.get('utm_medium');
    this.browser = browserName;

    const pageorgin = this.cityname + '_' + this.pageOrigin;
    this.otploader = true;

    this.enquiry.localityId = this.Filter.localityid;
    this.enquiry.regionId = this.Filter.RegionID;
    this.enquiry.propertyid = this.Filter.propid;

    if (utm_medium) {
      this.enquiry.source = 'Homes247-Campaign';
      this.enquiry.propertyname = this.Filter.PropertyName + ' && ' + utm_medium;
    } else {
      this.enquiry.source = 'Homes247-Mobile';
      this.enquiry.propertyname = this.Filter.PropertyName;
    }

    const param = this.enquiry;


    this.Service
      .addPropertyCallEnquiry(param, pageorgin, this.cityid, this.browser)
      .subscribe(async (success: any) => {

        if (success?.status === 'True') {

          this.otploader = false;

          if (success?.code === "3") {
            this.otpHandle();
          } else {

            $('#otpValidate').css('display', 'none');

            if (this.router.url?.indexOf('#downloadbrochure') > -1) {

               const Swal = await this.getSwal();
      Swal.fire({
                text: 'Thank You For Dowloading the Brochure',
                icon: 'success',
                showConfirmButton: false,
                timer: 2500
              });

              this.router.navigate(['/download-brochure/' + this.Filter.propid]);

            } else {

               const Swal = await this.getSwal();
      Swal.fire({
                text: 'We Will Intimate you soon!',
                icon: 'success',
                showConfirmButton: false,
                timer: 2500
              });

              this.enquiry.number = '';
              this.enquiry.name = '';
            }

            this.contactedRentalarr =
              JSON.parse(this.storage?.getItem('contactedPropId') || '[]');

            if (!this.contactedRentalarr.includes(this.Filter.propid)) {
              this.contactedRentalarr.push(this.Filter.propid);
              this.storage.setItem('contactedPropId',
                JSON.stringify(this.contactedRentalarr));
            }
          }

          $('body').removeClass('modal-open');
          this.enquiry.verification = 1;
        }
      });
  }

 private async getSwal() {
    const { default: Swal } = await import('sweetalert2');
    return Swal;
  }

  otpHandle() {
    var param = this.enquiry;
    this.Filter.name = param.name;
    this.Filter.number = param.number;
    this.Filter.email = param.email;
    this.Service.otpsend(param).subscribe(async (success: any) => {
      if (success.messages[0].status == 'ENQUEUED') {
        this.numberLogIn = false;
        this.otpValidating = true;
        this.otploader = false;
        $('.OtpDiv').css('display', 'block');
        $('.countdown_maindiv').css('display', 'block');
        $('.otpexpireclass').css('display', 'none');

        // Signal-based access to child component
        this.countdown4().begin();
        this.ngOtpInput().setValue('');
      } else {
         const Swal = await this.getSwal();
      Swal.fire({
          title: 'Oops Something Error!',
          icon: 'error',
          showConfirmButton: false,
          timer: 1500
        });
      }
    });
  }

  handleEvent(e: any) {
    if (e.action === 'done') {
      $('.countdown_maindiv').css('display', 'none');
      if (this.clickCount == 2) {
        $('.otpexpireclass2').css('display', 'block');
      } else {
        $('.otpexpireclass').css('display', 'block');
      }
    }
  }

  onOtpChange(otp: any) {
    this.enquiry.otp = otp;
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
      }
    }
    this.otploader = true;
    var param = this.enquiry;
    this.Service.otpvalidcheck(param).subscribe(async (success: any) => {
      var status = success['status'];
      if (status == 'True') {
        this.enquiry.verification = 2;
        this.addenquiry();
        this.numberLogIn = true;
        $('.OtpDiv').css('display', 'none');
        $('#otpValidate').css('display', 'none');
        this.otpValidating = false;
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
    });
    return true;
  }

  otpBasedLogin1() {
    this.clickCount++;
    const paramNum = { number: this.enquiry.number };
    // this.countdownconfig = { leftTime: 30, demand: true };
    this.ngOtpInput().setValue('');
    this.otploader = true;
    this.Service.otpsend(paramNum).subscribe(async (success: any) => {
      if (success.messages[0].status == 'ENQUEUED') {
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
    });
  }
}
