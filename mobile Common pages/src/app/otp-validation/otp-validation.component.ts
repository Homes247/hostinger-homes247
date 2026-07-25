import { Component, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LOCAL_STORAGE, WINDOW } from '@ng-toolkit/universal';
import { CountdownComponent, CountdownEvent } from 'ngx-countdown';
import { DataService } from '../data.service';
import { enquiry } from '../prop-details-new/class';


declare var $: any;
declare var swal: any;



declare var $: any;
@Component({
  selector: 'app-otp-validation',
  templateUrl: './otp-validation.component.html',
  styleUrls: ['./otp-validation.component.css']
})
export class OtpValidationComponent implements OnInit {
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

  user = new enquiry();
  otpValidating = false;


  constructor(
    @Inject(WINDOW) private window: Window,
    @Inject(LOCAL_STORAGE) private Local_Storage: any,

    public Service: DataService
  ) { }

  ngOnInit(): void {
    this.RegistrationForm = new FormGroup({
      newUserName: new FormControl(''),
      userNumber: new FormControl(''),
      answerData: new FormControl(''),

    });






    // $('#exampleModal').modal('show');
    // document.getElementById('exampleModal').style.display = 'block';
    // $('body').addClass('modal-active');
    this.Visiblebrochure = true;
    if (this.window.location.hash === '#postsellpropnew') {
      this.postpropertylogin();
      // $('.OtpDiv').css('display', 'block');
    } else {
      document.getElementById('otpValidate').style.display = 'block';
    }
    // 
  }




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

  loginclose() {
    this.window.location.hash = '';
    $('#otpValidate').css('display', 'none')
  }

  goback1() {
    $('.OtpDiv').css('display', 'none');
    this.numberLogIn = true;


    this.countdownconfig = {
      leftTime: 30,
      demand: true
    };
    // this.countdown4.begin();
    this.otpValidating = false;

  }
  otploader = false;

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

    var param = this.user;
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

        // this.loader = false;

        // this.otpValidating = true;
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
      // 
    });
  }
  postpropertylogin() {
    this.otploader = true;
    this.UserNumber = localStorage.getItem('enquiryNumber');

    this.user.number = this.UserNumber
    var param = this.user;
    document.getElementById('otpValidate').style.display = 'block';

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

        // this.loader = false;

        // this.otpValidating = true;
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
      // 
    });
  }


  handleEvent(e: CountdownEvent) {
    if (e.action === 'done') {

      $('.countdown_maindiv').css('display', 'none');
      $('.otpexpireclass').css('display', 'block');
    }
  }

  onOtpChange(otp) {
    var param = this.user;
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
    var param = this.user;
    this.Service.otpvalidcheck(param).subscribe((success) => {
      var status = success['status'];
      if (status == 'True') {
        this.otpUserLoginNewAPI();
        //  this.otploader = false;
        this.countdown4.restart();
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
      // 
    });
  }

  otpUserLoginNewAPI() {
    if (this.user.name === undefined) {
      this.user.name = 'Guest User';
      var param = this.user;
    } else {
      var param = this.user;
    }
    this.Service.userLoginWithOtpNewAPI(param).subscribe(responce => {
      if (responce['status'] === 'True') {
        var trueStatus = responce['status']
        this.numberLogIn = true;
        this.otpValidating = false;

        $('.OtpDiv').css('display', 'none');
        this.ngOtpInput.setValue('');

        document.getElementById('otpValidate').style.display = 'none';
        this.Local_Storage.setItem('loginID', '1');
        if (this.window.location.hash === '#postsellpropnew') {
          swal({
            title: 'OTP Verified',
            text: '',
            type: 'success',
            showConfirmButton: false,
            timer: 2000
          });
        } else {
          swal({
            title: 'Login successfully',
            text: '',
            type: 'success',
            showConfirmButton: false,
            timer: 2000
          });
        }

        this.otploader = false;
        this.user.number = ''
        this.user.name = ''



        //  this.apiResponse.emit(trueStatus);

        this.userDetails = responce['UserDetails'];
        var userName = this.userDetails[0]['user_name'];
        var userID = this.userDetails[0]['reg_IDPK'];

        // window.history.back();
        this.userDetails = responce['UserDetails'];
        if (typeof (Storage) !== 'undefined') {
          // Store
          this.Local_Storage.setItem('userName', this.userDetails[0]['user_name']);
          this.Local_Storage.setItem('userID', this.userDetails[0]['reg_IDPK']);
          this.Local_Storage.setItem('userEmail', this.userDetails[0]['user_email']);
          this.Local_Storage.setItem('userNumber', this.userDetails[0]['number']);
          // Retrieve
          this.UserName = this.Local_Storage.getItem('userName');
          this.UserId = this.Local_Storage.getItem('userID');
          this.UserEmail = this.Local_Storage.getItem('userEmail');
          this.UserNumber = this.Local_Storage.getItem('userNumber');

        } else {
          document.getElementById('result').innerHTML = 'Sorry, your browser does not support Web Storage...';
        }
        this.Service.mouseenterserviceOtp();
      } else {
      }
    });

  }


  otpBasedLogin1() {
    const paramNum = {
      number: this.user.number
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
