import { Component, EventEmitter, Inject, OnInit, Output, ViewChild, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CountdownComponent, CountdownEvent } from 'ngx-countdown';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgOtpInputModule } from 'ng-otp-input';
import { DataService } from '../data.service';
import { enquiry } from '../prop-details-new/class';
import Swal from 'sweetalert2';
import { SafeStorageService } from '../safe-storage.service';


declare var $: any;
// declare var swal: any;

@Component({
  selector: 'app-otp-validation',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CountdownComponent,
    MatProgressBarModule,
    NgOtpInputModule
  ],
  templateUrl: './otp-validation.component.html',
  styleUrls: ['./otp-validation.component.css']
})
export class OtpValidationComponent implements OnInit {
  Visiblebrochure = true;

  RegistrationForm!: FormGroup;
 @ViewChild('cd4', { static: false }) private countdown4: CountdownComponent;
  @ViewChild('ngOtpInput') ngOtpInput: any;

  otpexpired = false;
  userDetails: any[] = [];
  UserName: any;
  UserId: any;
  UserEmail: any;
  UserNumber: any;
  numberLogIn = true;

  user = new enquiry();
  otpValidating = false;
  otploader = false;

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

  constructor(
    private storage: SafeStorageService,
    @Inject(PLATFORM_ID) private platformId: object,
    public Service: DataService,

  ) { }

  ngOnInit(): void {
    this.RegistrationForm = new FormGroup({
      newUserName: new FormControl(''),
      userNumber: new FormControl(''),
      answerData: new FormControl(''),
    });

    this.Visiblebrochure = true;

    // Safety check for Browser environment
    if (isPlatformBrowser(this.platformId)) {
      if (window.location.hash === '#postsellpropnew') {
        this.postpropertylogin();
      } else {
        const element = document.getElementById('otpValidate');
        if (element) {
          element.style.display = 'block';
        }
      }
    }
  }

  loginclose() {
    window.location.hash = '';
    $('#otpValidate').css('display', 'none');
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
      $('#newUserName').focus().css('border-color', 'red').attr('placeholder', 'Please Enter Name');
      return false;
    } else {
      const enameFilter = /^([a-zA-Z]+\s)*[a-zA-Z]+$/;
      if (enameFilter.test($('#newUserName').val())) {
        $('#newUserName').removeAttr('style');
      } else {
        $('#newUserName').focus().css('border-color', 'red').attr('placeholder', 'Please Enter Valid Name').val('');
        return false;
      }
    }

    if ($('.InputNumber').val() === '') {
      $('.InputNumber').focus().css('border-color', 'red').attr('placeholder', 'Please Enter Phone Number');
      return false;
    } else {
      const emobileno = /^[0-9]{10}$/;
      if (emobileno.test($('.InputNumber').val())) {
        $('.InputNumber').removeAttr('style');
      } else {
        $('.InputNumber').focus().css('border-color', 'red').attr('placeholder', 'Please enter valid contact number').val('');
        return false;
      }
    }

    this.otploader = true;
    const param = this.user;
    this.Service.otpsend(param).subscribe({
      next: (success: any) => {
        if (success.messages[0].status == 'ENQUEUED') {
          this.numberLogIn = false;
          this.otpValidating = true;
          this.otploader = false;
          $('.OtpDiv').css('display', 'block');
          $('.countdown_maindiv').css('display', 'block');
          $('.otpexpireclass').css('display', 'none');
          this.countdown4.begin();
          this.ngOtpInput.setValue('');
        } else {
          this.otploader = false;
          Swal.fire({
            title: 'Oops Something Error!',
            icon: 'error',
            showConfirmButton: false,
            timer: 1500
          });
        }
      },
      error: (err: any) => {
        this.otploader = false;
      }
    });
    return true;
  }

  postpropertylogin() {
    this.otploader = true;
    if (isPlatformBrowser(this.platformId)) {
      this.UserNumber = this.storage.getItem('enquiryNumber');
      this.user.number = this.UserNumber;
    }

    const param = this.user;
    const element = document.getElementById('otpValidate');
    if (element) element.style.display = 'block';

    this.Service.otpsend(param).subscribe({
      next: (success: any) => {
        if (success.messages[0].status == 'ENQUEUED') {
          this.numberLogIn = false;
          this.otpValidating = true;
          this.otploader = false;
          $('.OtpDiv').css('display', 'block');
          $('.countdown_maindiv').css('display', 'block');
          $('.otpexpireclass').css('display', 'none');
          this.countdown4.begin();
          this.ngOtpInput.setValue('');
        } else {
          this.otploader = false;
          Swal.fire({
            title: 'Oops Something Error!',
            icon: 'error',
            showConfirmButton: false,
            timer: 1500
          });
        }
      },
      error: (err: any) => {
        this.otploader = false;
      }
    });
  }

  handleEvent(e: CountdownEvent) {
    if (e.action === 'done') {
      $('.countdown_maindiv').css('display', 'none');
      $('.otpexpireclass').css('display', 'block');
    }
  }

  onOtpChange(otp: any) {
    this.user.otp = otp;
  }

  otpvalidate4() {
    const otplength = 4;
    const otpVal = $('#otp').val();

    if (otpVal == '') {
      this.ngOtpInput.setValue('');
      Swal.fire({
        title: 'Please enter the OTP!',
        icon: 'error',
        showConfirmButton: false,
        timer: 1000
      });
      return false;
    } else {
      const liveotpcount = otpVal.length;
      if (liveotpcount < otplength) {
        this.ngOtpInput.setValue('');
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
    var param = this.user;
    
      this.Service.otpvalidcheck(param).subscribe({
        next: (success: any) => {
          const status = success['status'];
          // console.log('this is success', success);
          if (status == 'True') {
            this.otploader = false;
            // console.log('otploader',this.otploader)
            this.otpUserLoginNewAPI();
            this.countdown4.restart();

          } else {
            this.ngOtpInput.setValue('');
            this.otploader = false;
          Swal.fire({
            title: 'Oops Something Error!',
            text: 'Its Not a valid OTP / OTP Expired!',
            icon: 'error',
            showConfirmButton: false,
            timer: 1500
          });
        }
      },
      error: (err: any) => {
        this.otploader = false;
      }
    });
    return true;
  }

  otpUserLoginNewAPI() {
    if (this.user.name === undefined) {
      this.user.name = 'Guest User';
    }
    const param = this.user;
    this.Service.userLoginWithOtpNewAPI(param).subscribe((responce: any) => {
      if (responce['status'] === 'True') {
        this.numberLogIn = true;
        this.otpValidating = false;
        $('.OtpDiv').css('display', 'none');
        this.ngOtpInput.setValue('');

        const element = document.getElementById('otpValidate');
        if (element) element.style.display = 'none';

        this.storage.setItem('loginID', '1');

        Swal.fire({
          title: window.location.hash === '#postsellpropnew' ? 'OTP Verified' : 'Login successfully',
          text: '',
          icon: 'success',
          showConfirmButton: false,
          timer: 2000
        });

        this.otploader = false;
        this.user.number = '';
        this.user.name = '';

        this.userDetails = responce['UserDetails'];
        if (typeof (Storage) !== 'undefined') {
          this.storage.setItem('userName', this.userDetails[0]['user_name']);
          this.storage.setItem('userID', this.userDetails[0]['reg_IDPK']);
          this.storage.setItem('userEmail', this.userDetails[0]['user_email']);
          this.storage.setItem('userNumber', this.userDetails[0]['number']);

          this.UserName = this.storage.getItem('userName');
          this.UserId = this.storage.getItem('userID');
          this.UserEmail = this.storage.getItem('userEmail');
          this.UserNumber = this.storage.getItem('userNumber');
        }
        this.Service.mouseenterserviceOtp();
      }
    });
  }

   otpBasedLogin1() {
    const paramNum = {
      number: this.user.number
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
}