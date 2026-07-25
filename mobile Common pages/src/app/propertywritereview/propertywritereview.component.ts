import { Component, OnInit, Inject, PLATFORM_ID, ElementRef, ViewChild, HostListener } from '@angular/core';
import { WINDOW, LOCAL_STORAGE } from '@ng-toolkit/universal';
import { MessageService } from '../property.service';
import { enquiry } from '../prop-details-new/class';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CountdownComponent, CountdownEvent } from 'ngx-countdown';
import { DataService } from '../data.service';

declare var $: any;
declare var swal: any;

declare var $: any;
@Component({
  selector: 'app-propertywritereview',
  templateUrl: './propertywritereview.component.html',
  styleUrls: ['./propertywritereview.component.css']
})
export class PropertywritereviewComponent implements OnInit {
  @ViewChild('cd1', { static: false }) private countdown: CountdownComponent;

  @ViewChild('cancelreviewmodel') cancelreviewmodel: ElementRef;
  routeSub: any;
  ReviewPageView = true;
  ratingValue: any;
  reviewDetails: any;
  propID: any;
  LoginView = false;
  otploader = false;
  user = new enquiry();
  loginId: any;
  Username: any;
  Usernum: any;
  Useremail: any;
  Userid: any;
  eusernumber: any;
  propName: any;
  timeLeft: number = 10;
  interval;
  otpexpired = false;

  Visiblebrochure = false;
  otpValidationComponent: any;
  loadComponent = false;

  constructor(@Inject(LOCAL_STORAGE) private Local_Storage: any,public Service: DataService,private router: Router,private _messageService: MessageService,
  private activatedRoute: ActivatedRoute) {
    this.ratingValue = '';
    this.reviewDetails = '';

    this.Service.mouseenterlistenOtp().subscribe((m: any) => {
      if(window.location.hash === '#ratingreviewmodal'){
        this.OnCommentUpdate()
      }
    })
   }

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe(params => {

      this.propID = this.router.url.split('-').pop().match(/[0-9]+/);
      
      this._messageService.getpropertynew(this.propID).subscribe(prop => {
        let propDetails = prop['details'];
        this.propName = propDetails[0].propertyName;
      })
    })
  }
  
  close() {
    this.LoginView = false;
  }
  startTimer() {
    this.timeLeft = 10;
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.otpexpired = true;
      }
    },1000)
  }
  countdownconfig = {
    leftTime: 30,
    demand: true,
  };
  handleEvent(e: CountdownEvent) {
    if (e.action === 'done') {
      this.otpexpired = true;
    }
  }
  config = {
    allowNumbersOnly: true,
    length: 4,
    isPasswordInput: false,
    disableAutoFocus: true,
    placeholder: '',
    inputStyles: {
      width: '48px',
      height: '48px',
      'border-radius': '8px',
      border: '1px solid rgba(236, 236, 236, 0.40)',
      background: '#F8F8F8',
    },
  };
  onOtpChange(otp) {
    var param = this.user;
    param.otp = otp;
  }

  showReviewModel() {
    var falsevar = "";
    this._messageService.clickthrough(falsevar);
    this.ReviewPageView = this.ReviewPageView ? false : true;
  }

  removeHashTag() {
    var topPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    window.location.hash = '';
    document.documentElement.scrollTop = topPos;
  }

  goback4() {
    $('#modal-container4').addClass('out');
    $('body').removeClass('modal-active');
  }

  OnCommentUpdate() {
    this.ratingValue = $('#ratingSection input:radio:checked').val();
    var userID = this.Local_Storage.getItem("userID");
    var propid = this.propID;
    var param = {
      userid: userID,
      propId: propid,
      rating: this.ratingValue,
      review: this.reviewDetails
    };
    if (this.reviewDetails === '' || this.ratingValue === undefined) {
      swal({
        title: 'Please Rate & Review this property',
        type: 'error',
        showConfirmButton: false,
        timer: 1500
      });
    } else {
      var loginId = this.Local_Storage.getItem('loginID');
      if (loginId === '1') {
        this._messageService.addreview(param).subscribe(success => {
          if (success['status'] === 'True') {
            swal({
              title: 'Successfully Submitted',
              text: 'Your Comment and Review is under Moderation! We will notify you When Comment is Active.',
              type: 'success',
              showConfirmButton: true
            });
            this.ratingValue = '';
            this.reviewDetails = '';
            window.location.hash = '';
            this.LoginView = false;
            this.ReviewPageView = false;
          }
        });
      } else {
        window.location.hash = 'ratingreviewmodal';
        $('#otpValidate').css('display','block')
        if(this.loadComponent == false){
          this.loadComponent = true;
          import('../otp-validation/otp-validation.module').then(mod => mod.OtpValidationModule).then(OtpValidationModule =>{
            this.otpValidationComponent = OtpValidationModule.components['lazy'];
          this.Visiblebrochure = this.Visiblebrochure ? false : true;
          $('.modal-login').css('z-index', '1')
          });
        }
      }
    }
  }

  loginotpsend() {
    if ($('#loginmobile').val() == '') {
      $('#loginmobile').focus().css('border-color', 'red').attr('placeholder', 'Please Enter Mobile Number');
      return false;
    } else {
      var mobilee = /^[0-9]{10}$/;
      if (mobilee.test($('#loginmobile').val())) {
        $('#loginmobile').removeAttr('style');
      } else {
        $('#loginmobile').focus().css('border-color', 'red').attr('placeholder', 'Please enter valid Mobile number').val('');
        return false;
      }
    }
    const paramNum = {
      number: this.user.number
    };
    this.otploader = true;
    $('body').addClass('bodyoverlay');
    this.Service.otpsend(paramNum).subscribe((success: { messages }) => { 
          var status = success.messages[0].status;
          if (status == 'ENQUEUED') {
        this.countdown.begin();
        this.otpexpired = false;
        this.startTimer();
        var buttonId = $('#one').attr('id');
        $('#modal-container4').removeAttr('class').addClass(buttonId);
        $('body').addClass('modal-active');
        this.otploader = false;
        $('body').removeClass('bodyoverlay');
      } else {
        swal({
          title: 'Oops Something Error!',
          type: 'error',
          showConfirmButton: false,
          timer: 1500
        });
        this.otploader = false;
        $('body').removeClass('bodyoverlay');
      }
    }, (err) => {
    });
  }

  otpvalidatelogin() {
    var otplength = 4;
    if ($('#loginotp').val() == '') {
      swal({
        title: 'Please enter the OTP!',
        type: 'error',
        showConfirmButton: false,
        timer: 1000
      });
      return false;
    } else {
      var liveotpcount = $('#loginotp').val().length;
      if (liveotpcount < otplength) {
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

    const paramNum = this.user;
    this.otploader = true;
    $('body').addClass('bodyoverlay');
    this._messageService.otpvalidcheck(paramNum).subscribe((success) => {
      var status = success['status'];

      if (status == 'True') {
          this.onSubmit();
          this.countdown.restart();

          this.LoginView = false;
      } else {
        this.otploader = false;
        $('body').removeClass('bodyoverlay');
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


  onSubmit() {
    if (this.user.name == undefined) {
      this.user.name = 'guest user';
    }
    var param = {
      number: this.user.number,
      username: this.user.name,
      device_source: this.user.device_source

    };
    this._messageService.Loginwithnum(param).subscribe(responce => {
      if (responce['status'] === 'True') {
        this.Local_Storage.setItem('loginID', '1');
        this.loginId = this.Local_Storage.getItem('loginID');
        this.otploader = false;
        $('body').removeClass('bodyoverlay');
        swal({
          title: 'OTP Verified',
          text: 'login Successfully!',
          type: 'success',
          showConfirmButton: false,
          timer: 2500
        });
        let userdetails = responce['UserDetails'];
        this.Username = userdetails[0].user_name;
        this.Usernum = userdetails[0].number;
        this.Useremail = userdetails[0].user_email;
        this.Userid = userdetails[0].reg_IDPK;
        this.Local_Storage.setItem('userName', this.Username);
        this.Local_Storage.setItem('usernum', this.Usernum);
        this.Local_Storage.setItem('useremail', this.Useremail);
        this.Local_Storage.setItem('userID', this.Userid);
        this.ReviewPageView = false;

          var param1 = {
            userid: this.Userid,
            propId: this.propID,
            rating: this.ratingValue,
            review: this.reviewDetails
          };
          this._messageService.addreview(param1).subscribe(success => {
            if (success['status'] === 'True') {
              swal({
                title: 'Successfully Submitted',
                text: 'Your Comment and Review is under Moderation! We will notify you When Comment is Active.',
                type: 'success',
                showConfirmButton: true
              });
              this.ratingValue = '';
              this.reviewDetails = '';
              window.location.hash = '';
              this.LoginView = false;
              this.ReviewPageView = false;
            } else {
            }
          });

        this.user.number = '';
        this.user.otp = '';
        $('#modal-container4').addClass('out');
        $('body').removeClass('modal-active');
        $('#loginwithotpModel').modal('hide');
        this.eusernumber = '';
      } else {
        swal({
          title: 'Something went wrong!',
          text: 'Its Not a valid OTP',
          type: 'error',
          showConfirmButton: false,
          timer: 1500
        });
      }
    }, (err) => {
      // 
    });
  }

}
