import { Component, HostListener, Inject, OnInit, ViewChild } from '@angular/core';
import { DataService2 } from '../data.service2';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { CityService } from '../city.service';
import { LOCAL_STORAGE,WINDOW} from '@ng-toolkit/universal';
import { MessageService } from '../property.service';
import { FormControl, FormGroup } from '@angular/forms';
import {enquiry } from '../prop-details-new/class';
import { Location } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';
import {ServerResponseService_forum} from '../server-response-propertydetails.service'
import { CountdownComponent, CountdownEvent } from 'ngx-countdown';


declare var $: any;
declare var swal: any;

declare var $: any;
@Component({
  selector: 'app-property-disscussion-main',
  templateUrl: './property-disscussion-main.component.html',
  styleUrls: ['./property-disscussion-main.component.css'],
  providers: [ServerResponseService_forum],

})
export class PropertyDisscussionMainComponent implements OnInit {
  @ViewChild('cd1', { static: false }) private countdown: CountdownComponent;

  localityName: any;
  cityName: any;
  loadComponent = false;


  constructor(public Service2: DataService2,private router: Router,public responseService: ServerResponseService_forum,@Inject(LOCAL_STORAGE) private Local_Storage: any,public Service: DataService,public cityservice: CityService,@Inject(WINDOW) private window: Window,private _messageService: MessageService,public location: Location,private titleService: Title, private meta: Meta,) {
    this.Service.mouseenterlistenOtp().subscribe((m: any) => {
      if(this.window.location.hash === '#answerviewmodal'){
        this.onAnswer(this.questionidForSubmit)
      }
    })
   }
  Amenities: any;
  propID:any;
  propertiesDetailsnew: any;
  currentCity: any;
  cityname = '';
  cityid: any;
  otploader = false;
  propName: any;
  RegistrationForm: FormGroup;
  user = new enquiry();
  otpValidationComponent: any;
  Visiblebrochure = false;

  ngOnInit(): void {
    this.dataLoads()
    this.getquestionlist()
    this.RegistrationForm = new FormGroup({
      newUserName: new FormControl(''),
      userNumber: new FormControl(''),
      answerData: new FormControl(''),
    });
    
  }
  question: any;
  showanswer = false;
  zeroanswer = false;
  readallqestionanstextshow: boolean = false;
  isCollapsed: boolean[] = [];
  toggleCollapse(index: number): void {
    this.isCollapsed[index] = !this.isCollapsed[index];
  }


  LoginView = false;

  @HostListener('window:scroll', ['$event'])
  @HostListener('touchstart', ['$event'])
  onTouchLoad() {
    this.Service.mouseenterservice3();
  }
  questionidForSubmit: any
  onAnswer(questionid) {
    this.questionidForSubmit = questionid;
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
          }
        });
      } 
      else {
        // swal({
        //   title: 'Something Went Wrong Please Try Again!',
        //   type: 'error',
        //   showConfirmButton: false,
        //   timer: 2000
        // });
        // this.LoginView = true;
        // this.showmainpage = false;
        // $('#modal-fullscreen-xl1').modal('hide');
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

  closeModal(){
    this.LoginView = false
    window.location.hash = '';
  }

  getquestionlist() {
    var param = {
      propId: this.propID,
    };
    this._messageService.DiscusQuestionList(param).subscribe(responce => {
      this.question = responce['deatils'];
      if (this.question.length === 0) {
        this.showanswer = false;
        this.zeroanswer = true;
      } else {
        this.showanswer = true;
        this.zeroanswer = false;
      }
      if (this.question.length >= 3) {
        this.readallqestionanstextshow = true;
      }
    });
  }
  questionid: any;

  getquestionListById(id) {
    this._messageService.answers(id);
    var param = {
      questionId: id,
    };
    this._messageService.DiscusQuestionListById(param).subscribe(responce => {
      this.question = responce['deatils'];
      this.questionid = this.question[0]['discussion_question_IDPK'];
      if (this.question[0]['Answer_Deatils'].length === 0) {
        // this.readallans = false;
        // this.giveanswer = true;
      } else {
        // this.readallans = true;
        // this.giveanswer = false;
      }
    });
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
  dataLoads(){
    var propid = this.router.url.split('-').pop().match(/[0-9]+/);;
      this.propID = propid;
      this.Service2.getpropertynew(this.propID).subscribe(data => {
        let datadetails = data['details'];
        this.propertiesDetailsnew = datadetails;
        this.propName = this.propertiesDetailsnew[0]['propertyName'];

        this.localityName = this.propertiesDetailsnew[0]['locality_name'];
        this.cityName = this.propertiesDetailsnew[0]['city_name'];


        var propName = this.propertiesDetailsnew[0]['propertyName'].toLowerCase().replace(/\s+/g, '-');
        var cityName = this.propertiesDetailsnew[0]['city_name'].toLowerCase().replace(/\s+/g, '-');;
        var localityName = this.propertiesDetailsnew[0]['locality_name'].toLowerCase().replace(/\s+/g, '-');

        var urlstructure1 = '/dfl/'+propName+'-in-'+localityName+'-'+cityName+'-disscussion-forum-list-'+propid

        if (this.router.url.indexOf(urlstructure1) > -1) {
        } else{
          this.responseService.set301Status(propName,localityName,cityName,propid);
        }

        this.titleService.setTitle(this.propName +' - Join the Discussion Forum');
        this.meta.updateTag({
          name: 'description',
          content: 'Join the discussion forum for  '+this.propName+' and discuss any doubts or queries you may have. Engage with others and gain valuable insights about your potential new home!'
        });
        this.Service.createLinkForCanonicalURL();
    });
  }

otpexpired = false;
timeLeft: number = 10;
  interval;

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
  goback4() {
    $('#modal-container').addClass('out');
    $('body').removeClass('modal-active');
  }

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
}
