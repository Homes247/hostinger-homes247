import { CommonModule, DOCUMENT } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Inject, OnInit, Output, PLATFORM_ID, ViewChild, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CountdownComponent } from 'ngx-countdown';
import { NgOtpInputModule } from 'ng-otp-input';
import { CityService } from '../city.service';
import { DataService } from '../data.service';
import { FilterService } from '../filter.service';
import { Enquiry } from '../home/home';
import { SafeStorageService } from '../safe-storage.service';
import Swal from 'sweetalert2';
import { ElitedataService } from '../elitedata.service';


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
  styleUrl: './enquiry-form-individual.css',
  host: { ngSkipHydration: 'true' },

})
export class EnquiryFormIndividual implements OnInit {

  @ViewChild('cd4', { static: false }) private countdown4: CountdownComponent;
  @ViewChild('ngOtpInput', { static: false }) ngOtpInput: any;
  @Output() apiStatus = new EventEmitter<any>();

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
    private cdr: ChangeDetectorRef,
    private Filter: FilterService,
    public Service: DataService,
    public eliteService: ElitedataService,

    private router: Router,
    public cityservice: CityService,
    private route: ActivatedRoute,
    private storage: SafeStorageService,
    @Inject(DOCUMENT) private doc,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.window = this.doc.defaultView!;
  }

  ngOnInit(): void {

  }

  loginclose() {
    this.window.location.hash = '';
    $('#otpValidateind').css('display', 'none');
  }

  goback1() {
    $('.OtpDiv').css('display', 'none');
    this.numberLogIn = true;
    // this.countdownconfig = {
    //   leftTime: 30,
    //   demand: true
    // };
    this.countdown4.restart();

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

    return true
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
    ).subscribe((success: any) => {

      this.otploader = false;
      this.cdr.markForCheck();


      if (success?.status === 'True') {

        if (success?.code === "3") {
          this.otpHandle();
        } else {
          $('#otpValidateind').css('display', 'none');

          //sam
          // this.elitePlanView(this.enquiry.propertyid)
          // Swal.fire({
          //   text: 'We Will Intimate you soon!',
          //   icon: 'success',
          //   showConfirmButton: false,
          //   timer: 2500
          // });

          this.enquiry.number = '';
          this.enquiry.name = '';
        }
      }
    });
  }

  otpHandle() {

    const param = this.enquiry;
    this.Service.otpsend(param).subscribe((success: any) => {
      if (success.messages[0].status === 'ENQUEUED') {

        this.numberLogIn = false;
        this.otpValidating = true;
        this.otploader = false;


        $('.OtpDiv').css('display', 'block');

        this.countdown4?.begin();
        this.ngOtpInput()?.setValue('');

      } else {

        Swal.fire({
          title: 'Error sending OTP',
          icon: 'error'
        });

      }

    });
  }

  onOtpChange(otp: any) {
    this.enquiry.otp = otp;
  }

  handleEvent(e: any) {
    if (e.action === 'done') {
      $('.countdown_maindiv').hide();
      $('.otpexpireclass').show();
    }
  }

  otpvalidate4() {

    if (!this.enquiry.otp || this.enquiry.otp.length < 4) {

      Swal.fire({
        title: 'Enter valid OTP',
        icon: 'warning',
        timer: 1500
      });

      return;
    }


    this.otploader = true;
    this.Service.otpvalidcheck(this.enquiry).subscribe((success: any) => {
      if (success.status === 'True') {
        this.enquiry.verification = 2;
        this.otploader = false;
        this.SubmitForm();

        this.numberLogIn = true;
        this.otpValidating = false;


        //     number: this.enquiry.number,
        // userId: this.Filter.userIdfk,


        var loginId = localStorage.getItem('loginID');
        if (loginId == undefined) {

          var param = {
            number: this.enquiry.number,
            username: this.enquiry.name,
            device_source: 2
          }
          this.Service.Loginwithnum(param).subscribe(responce => {
            let userdetails = responce['UserDetails'];
            var eusername = userdetails[0].user_name;
            var eusernum = userdetails[0].number;
            var euseremail = userdetails[0].user_email;
            var userid = userdetails[0].reg_IDPK;
            localStorage.setItem('userName', eusername);
            localStorage.setItem('usernum', eusernum);
            localStorage.setItem('useremail', euseremail);
            localStorage.setItem('userID', userid);
            localStorage.setItem('loginID', '1');
            // this.elitePlanView(this.enquiry.propertyid);
            this.eliteService.setEnquiryData(this.enquiry.propertyid);
          });
        }


        // this.elitePlanView(this.enquiry.propertyid);

        $('#otpValidateind').css('display', 'none');

      } else {
        this.otploader = false;

        this.enquiry.otp = '';
        this.ngOtpInput.setValue('');
        Swal.fire({
          title: 'Oops Something Error!',
          text: 'Its Not a valid OTP / OTP Expired!',
          showConfirmButton: false,
          icon: 'error',
          timer: 1500
        });




      }

    });
  }

  otpBasedLogin1() {
    this.clickCount++;
    const paramNum = {
      number: this.enquiry.number
    }
    // this.countdownconfig = {
    //   leftTime: 30,
    //   demand: true
    // };

    this.countdown4.restart();

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
        Swal.fire({
          title: 'Oops Something Error!',
          icon: 'error',
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


  // subscription

  elitePlanView(propertyId: string | number) {
    // const exists = this.elitePropertyId.includes(propertyId);
    // if (exists) {
    //   console.log('Duplicate entry — not added');
    //   return;
    // }


    var param = {
      number: this.enquiry.number,
      userId: this.Filter.userIdfk,
      propid: this.enquiry.propertyid,
      category_id: 2
    }
    this.eliteService.detailesCard(param).subscribe(response => {
      if (response['status'] == 'True') {
        // this.eliteService.setEnquiryData(response);
        // this.elitePropertyId.push(propertyId);
        // this.contactData = response['contacteddata'];
        //           this.verificationStatus = 2
      } else {
        this.elitePlan();
      }
    })
  }


  // isEliteOpen = true;
  elitePlan() {
    $('#elitePlanModal').modal('show');
  }
  elitePlanRouter() {
    $('#elitePlanClose').click();
   window.location.href = 'https://hostinger.homes247.in/homes-elite#1';
  }



}