import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CountdownComponent } from 'ngx-countdown';
import { NgOtpInputModule } from 'ng-otp-input';
import { CityService } from '../city.service';
import { DataService } from '../data.service';
import { FilterService } from '../filter.service';
import { Enquiry } from '../home/home';
import { SafeStorageService } from '../safe-storage.service';
// Swal lazy-loaded

declare var $: any;

@Component({
  selector: 'app-enquiry-form-individual',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgOtpInputModule,
    CountdownComponent
  ],
  templateUrl: './enquiry-form-individual.html',
  styleUrl: './enquiry-form-individual.css'
})
export class EnquiryFormIndividual implements OnInit {

  readonly countdown4 = viewChild<CountdownComponent>('cd4');
  readonly ngOtpInput = viewChild<any>('ngOtpInput');

  enquiry = new Enquiry();

  numberLogIn = true;
  otpValidating = false;
  otploader = false;
  clickCount = 0;

  cityname: any;
  cityid: any;
  pageOrigin: any;
  browser: any;

  contactedRentalarr: any[] = [];

  config = {
    allowNumbersOnly: true,
    length: 4,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      width: '50px',
      height: '50px'
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
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.window = this.doc.defaultView!;
  }

  ngOnInit(): void { }

  loginclose() {
    this.window.location.hash = '';
    $('#otpValidateind').css('display', 'none');
  }

  goback1() {
    $('.OtpDiv').css('display', 'none');
    this.numberLogIn = true;
    this.countdown4().restart();
    this.otpValidating = false;
  }

  otpBasedLogin() {

    if ($('#newUserName').val() == '') {
      $('#newUserName').focus().css('border-color', 'red');
      return false;
    }

    if ($('.InputNumber').val() === '') {
      $('.InputNumber').focus().css('border-color', 'red');
      return false;
    }

    this.otploader = true;
    this.SubmitForm();
  }

  SubmitForm() {
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
    alert(this.pageOrigin)

    const browserInfo = navigator.userAgent;

    if (browserInfo.includes('Chrome')) this.browser = 'Chrome';
    else if (browserInfo.includes('Safari')) this.browser = 'Safari';
    else if (browserInfo.includes('Firefox')) this.browser = 'Firefox';
    else this.browser = 'unknown';

    this.enquiry.localityId = this.Filter.localityid;
    this.enquiry.propertyid = this.Filter.propid;

    const utm_medium = this.route.snapshot.queryParamMap.get('utm_medium');

    if (utm_medium) {
      this.enquiry.source = 'Homes247-Campaign';
      this.enquiry.propertyname = this.Filter.PropertyName + ' && ' + utm_medium;
    } else {
      this.enquiry.source = 'Homes247-Mobile';
      // this.enquiry.propertyname = this.Filter.PropertyName;
    }

    const param = this.enquiry;

    this.Service.individuallistenq(
      param,
      this.pageOrigin,
      this.Filter.PropertyName,
      this.Filter.userIdfk
    ).subscribe(async (success: any) => {

      this.otploader = false;

      if (success?.status === 'True') {

        if (success?.code === "3") {
          this.otpHandle();
        } else {

          $('#otpValidateind').css('display', 'none');

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

  onOtpChange(otp: any) {
    this.enquiry.otp = otp;
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

  async otpvalidate4() {

    if (!this.enquiry.otp || this.enquiry.otp.length < 4) {

       const Swal = await this.getSwal();
      Swal.fire({
        title: 'Enter valid OTP',
        icon: 'warning',
        timer: 1500
      });

      return;
    }

    this.otploader = true;

    this.Service.otpvalidcheck(this.enquiry).subscribe(async (success: any) => {

      if (success.status === 'True') {

        this.enquiry.verification = 2;

        this.SubmitForm();

        this.numberLogIn = true;
        $('.OtpDiv').css('display', 'none');
        $('#otpValidate').css('display', 'none');
        this.otpValidating = false;
        $('#otpValidateind').css('display', 'none');
        this.countdown4().restart();
      } else {
        this.ngOtpInput().setValue('');
        this.otploader = false;

         const Swal = await this.getSwal();
      Swal.fire({
          title: 'Invalid OTP',
          icon: 'error'
        });

      }

    });
  }

  otpBasedLogin1() {

    this.clickCount++;

    const param = { number: this.enquiry.number };
    this.Service.otpsend(param).subscribe(() => {
      this.countdown4().begin();
      this.ngOtpInput().setValue('');

    });
  }

}