import { Component, HostListener, Inject, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataService2 } from '../data.service2';
import { LOCAL_STORAGE, WINDOW } from '@ng-toolkit/universal';
import { MessageService } from '../property.service';
import {enquiry } from '../prop-details-new/class';
import { Location } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { DataService } from '../data.service';
import { CountdownComponent, CountdownEvent } from 'ngx-countdown';



declare var $: any;
declare var swal: any;


declare var $: any;
@Component({
  selector: 'app-property-disscussion-post-question',
  templateUrl: './property-disscussion-post-question.component.html',
  styleUrls: ['./property-disscussion-post-question.component.css']
})
export class PropertyDisscussionPostQuestionComponent implements OnInit {
  @ViewChild('cd1', { static: false }) private countdown: CountdownComponent;

  propertiesDetailsnew: any;
  propID:any;
  propName: any;
  userquestion: any;
  otherquestion: any;

  AskQuestionPageView = false;
  LoginView = false;

  user = new enquiry();
  propOther = false;


  propConfiguration = false;
  questionCategory = [];
  propStatus = false;
  propPrice = false;
  propLocation = false;
  propHomeLoans = false;
  propPossession = false;
  localityName: any;
  cityName: any;

  otpValidationComponent: any;
  Visiblebrochure = false;
  loadComponent = false;

  constructor(private _messageService: MessageService,public location: Location,private router: Router,public Service2: DataService2,public Service: DataService, @Inject(LOCAL_STORAGE) private Local_Storage: any,private titleService: Title, private meta: Meta,@Inject(WINDOW) private window: Window) {
    this.Service.mouseenterlistenOtp().subscribe((m: any) => {
      if(this.window.location.hash === '#haveaquestiontag'){
        this.SubmitQuation()
      }
    })
  }



  ngOnInit(): void {
    var propid = this.router.url.split('-').pop().match(/[0-9]+/);;
    this.propID = propid;
    this.Service2.getpropertynew(this.propID).subscribe(data => {
      let datadetails = data['details'];
      this.propertiesDetailsnew = datadetails;
      this.propName = this.propertiesDetailsnew[0]['propertyName'];
      this.localityName = this.propertiesDetailsnew[0]['locality_name'];
      this.cityName = this.propertiesDetailsnew[0]['city_name'];
      this.titleService.setTitle('Inquiries about '+this.propName +' Property? Ask Now! - Homes247.in');
      this.meta.updateTag({
        name: 'description',
        content: 'Join our '+this.propName+' Discussion Forum to ask questions, share insights, and stay informed about  '+this.propName +' in detail. Start Exploring Now - Homes247.in'
      });
      this.Service.createLinkForCanonicalURL();
    });
  }
  @HostListener('window:scroll', ['$event'])
  @HostListener('touchstart', ['$event'])
  onTouchLoad() {
    this.Service.mouseenterservice3();
  }
  onConfiguration() {
    if (this.propConfiguration === false) {
      this.propConfiguration = true;
      this.questionCategory.push('Configuration');
    } else if (this.propConfiguration === true) {
      this.propConfiguration = false;
      for (let i = 0; i < this.questionCategory.length; i++) {
        if (this.questionCategory[i] === 'Configuration') {
          this.questionCategory.splice(i, 1);
        }
      }
    }
  }

  onpropStatus() {
    if (this.propStatus === false) {
      this.propStatus = true;
      this.questionCategory.push('Status');
    } else if (this.propStatus === true) {
      this.propStatus = false;
      for (let i = 0; i < this.questionCategory.length; i++) {
        if (this.questionCategory[i] === 'Status') {
          this.questionCategory.splice(i, 1);
        }
      }
    }
  }

  onPrice() {
    if (this.propPrice === false) {
      this.propPrice = true;
      this.questionCategory.push('Price');
    } else if (this.propPrice === true) {
      this.propPrice = false;
      for (let i = 0; i < this.questionCategory.length; i++) {
        if (this.questionCategory[i] === 'Price') {
          this.questionCategory.splice(i, 1);
        }
      }
    }
  }

  onLocation() {
    if (this.propLocation === false) {
      this.propLocation = true;
      this.questionCategory.push('Location');
    } else if (this.propLocation === true) {
      this.propLocation = false;
      for (let i = 0; i < this.questionCategory.length; i++) {
        if (this.questionCategory[i] === 'Location') {
          this.questionCategory.splice(i, 1);
        }
      }
    }
  }

  onHomeLoans() {
    if (this.propHomeLoans === false) {
      this.propHomeLoans = true;
      this.questionCategory.push('Home Loans');
    } else if (this.propHomeLoans === true) {
      this.propHomeLoans = false;
      for (let i = 0; i < this.questionCategory.length; i++) {
        if (this.questionCategory[i] === 'Home Loans') {
          this.questionCategory.splice(i, 1);
        }
      }
    }
  }
  close() {
    this.LoginView = false;
  }
  onOtpChange(otp) {
    var param = this.user;
    param.otp = otp;
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
  onPossession() {
    if (this.propPossession === false) {
      this.propPossession = true;
      this.questionCategory.push('Possession');
    } else if (this.propPossession === true) {
      this.propPossession = false;
      for (let i = 0; i < this.questionCategory.length; i++) {
        if (this.questionCategory[i] === 'Possession') {
          this.questionCategory.splice(i, 1);
        }
      }
    }
  }
  onOther() {
    // if (this.propOther === false) {
    //   this.propOther = true;
    // } else if (this.propOther === true) {
    //   this.propOther = false;
    // }
    if (this.propOther === false) {
      this.propOther = true;
      this.questionCategory.push('Other');
    } else if (this.propOther === true) {
      this.propOther = false;
      for (let i = 0; i < this.questionCategory.length; i++) {
        if (this.questionCategory[i] === 'Other') {
          this.questionCategory.splice(i, 1);
        }
      }
    }
  }
  SubmitQuation() {
    if(this.questionCategory.length === 0){
      swal({
        title: 'Please Select Your Question Category',
        type: 'error',
        showConfirmButton: false,
        timer: 2000
      });
    } else if ($('#quation').val() == '') {
      $('#quation').focus().css('border-color', 'red').attr('placeholder', 'Please Ask your question');
      swal({
        text: 'Plaese Type Your Question!',
        type: 'error',
        showConfirmButton: false,
        timer: 2500
      });
      return false;
    } else {
      var loginId = this.Local_Storage.getItem('loginID');
      if (loginId === '1') {

        const uid = this.Local_Storage.getItem("userID");
        const uname = this.Local_Storage.getItem("userName");
        const uquestion = this.userquestion;
        const ucategory = this.questionCategory;
        const othercategory = this.otherquestion;
        if (this.questionCategory.length != 0) {
          var param = {
            propId: this.propID,
            userId: uid,
            userName: uname,
            category: ucategory,
            question: uquestion
          };
          this._messageService.Postquestion(param).subscribe(responce => {
            if (responce['status'] = 'True') {
              swal({
                title: 'Question Submit',
                text: 'Your question submitted Successfully!',
                type: 'success',
                showConfirmButton: false,
                timer: 2500
              });
              window.location.hash = '';
              this.propStatus = false;
              this.propPrice = false;
              this.propLocation = false;
              this.propHomeLoans = false;
              this.propPossession = false;
              this.propOther = false;
              this.propConfiguration = false;
            }
          });
        } else if (this.questionCategory.length == 0) {
          var param1 = {
            propId: this.propID,
            userId: uid,
            userName: uname,
            category: othercategory,
            question: uquestion
          };
          this._messageService.Postquestion(param1).subscribe(responce => {
            if (responce['status'] = 'True') {
              swal({
                title: 'Question Submit',
                text: 'Your question submitted Successfully!',
                type: 'success',
                showConfirmButton: false,
                timer: 2500
              });
              window.location.hash = '';
              this.propStatus = false;
              this.propPrice = false;
              this.propLocation = false;
              this.propHomeLoans = false;
              this.propPossession = false;
              this.propOther = false;
              this.propConfiguration = false;
            }
          });
        }
        // $('#askquationmodel').modal('hide');
        this.userquestion = '';
      } else {
        window.location.hash = 'haveaquestiontag';
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

  otploader = false;
  otpexpired = false;
  timeLeft: number = 10;
    interval;
  
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

  loginotpsend() {
    this.countdownconfig = {
      leftTime: 30,
      demand: true
    };
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
    this.Service.otpsend(paramNum).subscribe((success) => {
    var prestatus = success['messages'][0].status;
      // var status = prestatus[0].MessageErrorDescription;
      if (prestatus == 'ENQUEUED') {
        this.countdown.begin();
        this.otpexpired = false;
        // this.startTimer();
        var buttonId = $('#one').attr('id');
        $('#modal-container').removeAttr('class').addClass(buttonId);
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

  loginId: any;
  Username: any;
  Usernum: any;
  Useremail: any;
  Userid: any;

  onSubmit() {
    this.LoginView = true;
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


        var loginId = this.Local_Storage.getItem('loginID');
      if (loginId === '1') {

        const uid = this.Local_Storage.getItem("userID");
        const uname = this.Local_Storage.getItem("userName");
        const uquestion = this.userquestion;
        const ucategory = this.questionCategory;
        const othercategory = this.otherquestion;
        if (this.questionCategory.length != 0) {
          var param = {
            propId: this.propID,
            userId: uid,
            userName: uname,
            category: ucategory,
            question: uquestion
          };
          this._messageService.Postquestion(param).subscribe(responce => {
            if (responce['status'] = 'True') {
              this.propStatus = false;
              this.propPrice = false;
              this.propLocation = false;
              this.propHomeLoans = false;
              this.propPossession = false;
              this.propOther = false;
              this.propConfiguration = false;
              swal({
                title: 'Question Submit',
                text: 'Your question submitted Successfully!',
                type: 'success',
                showConfirmButton: false,
                timer: 2500
              });
              window.location.hash = '';
            }
          });
        } else if (this.questionCategory.length == 0) {
          var param1 = {
            propId: this.propID,
            userId: uid,
            userName: uname,
            category: othercategory,
            question: uquestion
          };
          this._messageService.Postquestion(param1).subscribe(responce => {
            if (responce['status'] = 'True') {
              this.propStatus = false;
              this.propPrice = false;
              this.propLocation = false;
              this.propHomeLoans = false;
              this.propPossession = false;
              this.propOther = false;
              this.propConfiguration = false;
              swal({
                title: 'Question Submit',
                text: 'Your question submitted Successfully!',
                type: 'success',
                showConfirmButton: false,
                timer: 2500
              });
              window.location.hash = '';
            }
          });
        }
        // $('#askquationmodel').modal('hide');
        this.userquestion = '';
      }



       
  
        const Uid = this.Local_Storage.getItem("userID");
          const Uname = this.Local_Storage.getItem("userName");
          var paramAns = {
            propId: this.propID,
            userId: Uid,
            userName: Uname,
          
          };
          
            this.LoginView = false;
        
  
        this.user.number = '';
        this.user.otp = '';
        $('#modal-container').addClass('out');
        $('body').removeClass('modal-active');
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



  closeModal(){
    this.LoginView = false
    window.location.hash = '';
  }

  goback4() {
    $('#modal-container').addClass('out');
    $('body').removeClass('modal-active');
  }

}
