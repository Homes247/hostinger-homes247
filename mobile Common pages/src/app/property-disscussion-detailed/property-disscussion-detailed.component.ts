import { Component, HostListener, Inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService2 } from '../data.service2';
import { MessageService } from '../property.service';
import { FormControl, FormGroup } from '@angular/forms';
import { LOCAL_STORAGE, WINDOW } from '@ng-toolkit/universal';
import {enquiry } from '../prop-details-new/class';
import { Location } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';
import { DataService } from '../data.service';
import { CountdownComponent, CountdownEvent } from 'ngx-countdown';



declare var $: any;
declare var swal: any;

declare var $: any;
@Component({
  selector: 'app-property-disscussion-detailed',
  templateUrl: './property-disscussion-detailed.component.html',
  styleUrls: ['./property-disscussion-detailed.component.css']
})
export class PropertyDisscussionDetailedComponent implements OnInit {
  @ViewChild('cd1', { static: false }) private countdown: CountdownComponent;

  propertiesDetailsnew: any;
  propID:any;
  propName: any;
  zeroanswer = false;
  questionAndAnswerListbyId = [];
  routeSub: any;
  questionId:any
  RegistrationForm: FormGroup;
  user = new enquiry();
  questionTxt: any;
  localityName: any;
  cityName: any;
  otploader = false;
  otpexpired = false;
timeLeft: number = 10;
  interval;



  otpValidationComponent: any;
  Visiblebrochure = false;
  loadComponent = false;



  constructor(private router: Router,public Service2: DataService2,public Service: DataService,private activatedRoute: ActivatedRoute,private _messageService: MessageService,@Inject(LOCAL_STORAGE) private Local_Storage: any,public location: Location,private titleService: Title, private meta: Meta,@Inject(WINDOW) private window: Window) {

    this.Service.mouseenterlistenOtp().subscribe((m: any) => {
      if(this.window.location.hash === '#answerviewmodal'){
        this.onAnswer()
      }
    })
   }

  ngOnInit(): void {
    this.dataLoads()

    this.RegistrationForm = new FormGroup({
      newUserName: new FormControl(''),
      userNumber: new FormControl(''),
      answerData: new FormControl(''),
    });
  }
  @HostListener('window:scroll', ['$event'])
  @HostListener('touchstart', ['$event'])
  onTouchLoad() {
    this.Service.mouseenterservice3();
  }
  dataLoads(){

    this.routeSub = this.activatedRoute.params.subscribe(params => {
      var lasturl = params['propName-in-localityName-propCity-disscussion-forum-details-questionId-propId'];
      const inputString = lasturl
      const parts = inputString.split('-');
      const numberValue = parseInt(parts[parts.length - 2]);
      this.questionId = numberValue
      // var propid = lasturl.split('-').pop().match(/[0-9]+/);
      this.propID = propid;
      var propid = this.router.url.split('-').pop().match(/[0-9]+/);;
      this.propID = propid;

      var param = {
        questionId: this.questionId,
      };
      this._messageService.DiscusQuestionListById(param).subscribe(responce => {
        this.questionAndAnswerListbyId = responce['deatils'];
        this.questionTxt = this.questionAndAnswerListbyId[0]['user_question'];

        this.Service2.getpropertynew(this.propID).subscribe(data => {
          let datadetails = data['details'];
          this.propertiesDetailsnew = datadetails;
          this.propName = this.propertiesDetailsnew[0]['propertyName'];
  
          this.localityName = this.propertiesDetailsnew[0]['locality_name'];
          this.cityName = this.propertiesDetailsnew[0]['city_name'];
          this.titleService.setTitle(this.questionTxt + '-' + this.propName);
          this.meta.updateTag({
            name: 'description',
            content: 'Dive into our discussion forum to explore various answers on Question. For free property assistance and inquiries, contact Homes247.in.'
          });
          this.Service.createLinkForCanonicalURL();
        });
    })


    
    });
  }

  LoginView = false;


  questionidForSubmit: any
  onAnswer() {
    this.questionidForSubmit = this.questionId;
    const userName = this.Local_Storage.getItem("userName");
    const userId = this.Local_Storage.getItem("userID");
    const userAnswer = this.RegistrationForm.value.answerData;
    var param = {
      propId: this.propID,
      userId: userId,
      userName: userName,
      QuestionId: this.questionidForSubmit,
      userAnswer: userAnswer,
    };
    if (this.RegistrationForm.value.answerData === '') {
      swal({
        text: 'Please Type Your Answer',
        type: 'error',
        showConfirmButton: false,
        timer: 2500
      });
    } else {
      var loginId = this.Local_Storage.getItem('loginID');
      if (loginId === '1') {
        // const Uid = this.Local_Storage.getItem("userID");
        // const Uname = this.Local_Storage.getItem("userName");
        // var param1 = {
        //   propId: this.propID,
        //   userId: '1',
        //   userName: userName,
        //   QuestionId: questionid,
        //   userAnswer: this.RegistrationForm.value.useranswer
        // };
        this._messageService.Postanswer(param).subscribe(responce => {
          if (responce['status'] = 'True') {
            swal({
              title: 'Answer Submit',
              text: 'Your answer submitted Successfully!',
              type: 'success',
              showConfirmButton: false,
              timer: 2500
            });
            $('.collapse').collapse('hide');
            this.RegistrationForm.controls.answerData.setValue('');
        window.location.hash = '';

          }
        });
      } 
      else {
        
        window.location.hash = 'answerviewmodal';
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



// startTimer() {
//   this.timeLeft = 10;
//   this.interval = setInterval(() => {
//     if(this.timeLeft > 0) {
//       this.timeLeft--;
//     } else {
//       this.otpexpired = true;
//     }
//   },1000)
// }

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
  countdownconfig = {
    leftTime: 30,
    demand: true,
  };
  handleEvent(e: CountdownEvent) {
    if (e.action === 'done') {
      this.otpexpired = true;
    }
  }
  onOtpChange(otp) {
    var param = this.user;
    param.otp = otp;
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
  otpvalidatelogin() {
    var otplength = 4;
    if ($('#otp').val() == '') {
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
  
        const Uid = this.Local_Storage.getItem("userID");
          const Uname = this.Local_Storage.getItem("userName");
          var paramAns = {
            propId: this.propID,
            userId: Uid,
            userName: Uname,
            QuestionId: this.questionidForSubmit,
            userAnswer: this.RegistrationForm.value.answerData
          };
          this._messageService.Postanswer(paramAns).subscribe(responce => {
            if (responce['status'] = 'True') {
              swal({
                title: 'Answer Submit',
                text: 'Your answer submitted Successfully!',
                type: 'success',
                showConfirmButton: false,
                timer: 2500
              });
            }
            $('.collapse').collapse('hide');
            this.RegistrationForm.controls.answerData.setValue('');
            this.LoginView = false;
          });
  
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




  close() {
    this.LoginView = false;
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
