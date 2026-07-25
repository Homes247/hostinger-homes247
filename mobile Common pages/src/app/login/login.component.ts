import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from "@angular/router";
import { DataService } from '../data.service';
import { login, register } from './login';
// import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { CountdownComponent, CountdownEvent } from 'ngx-countdown';
import { User } from '../home/home';
declare var swal: any;
declare var $: any;
declare var $: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('cd1', { static: false }) private countdown: CountdownComponent;
  @ViewChild('cancel') cancel: ElementRef;
  signin = false;
  signup = false;
  resetpass = false;
  loginOTP = true;
  register = new register();
  login = new login();
  storagearr = [];
  storagearr1 = [];
  storagearr2 = [];
  storagearr3 = [];
  storagearr4 = [];
  seenproparr = [];
  seenproparr1 = [];
  seenproparr2 = [];
  seenproparr3 = [];
  seenproparr4 = [];
  user = new User();
  showalert = false;
  eusernumber: any;
  otp: any;
  otploader = false;
  config = {
    allowNumbersOnly: true,
    length: 4,
    isPasswordInput: false,
    disableAutoFocus: true,
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
  otpexpired = false;
  userdetails: any;
  username: any;
  useremail: any;
  usernum: any;
  eusername: any;
  eusernum: any;
  euseremail: any;
  userid: any;
  cname: any;

  constructor(
    //  private authService: SocialAuthService,
    private router: Router,
    public Service: DataService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
  }
  signInWithGoogle() {
    // this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  // SingUp(){
  //   if ($('#user').val() == "") {
  //     $('#user').focus().css("border-color", "red").attr('placeholder', 'Please Enter First Name');
  //     return false;
  //   }
  //   else {
  //     var enameFilter = /^([a-zA-Z]+\s)*[a-zA-Z]+$/;
  //     if (enameFilter.test($('#user').val())) {
  //       $('#user').removeAttr("style");
  //     }
  //     else {
  //       $('#user').focus().css("border-color", "red").attr('placeholder', 'Please enter valid First name').val('');
  //       return false;
  //     }
  //   }

  //   if ($('#lastname').val() == "") {
  //     $('#lastname').focus().css("border-color", "red").attr('placeholder', 'Please Enter Last Name');
  //     return false;
  //   }

  //   if ($('#mail').val() == "") {
  //     $('#mail').focus().css("border-color", "red").attr('placeholder', 'Please Enter Email-id');
  //     return false;
  //   }
  //   else {
  //     var emaill = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
  //     if (emaill.test($('#mail').val())) {
  //       $('#mail').removeAttr("style");
  //     }
  //     else {
  //       $('#mail').focus().css("border-color", "red").attr('placeholder', 'Please enter valid email').val('');
  //       return false;
  //     }
  //   }

  //   if ($('#mobile').val() == "") {
  //     $('#mobile').focus().css("border-color", "red").attr('placeholder', 'Please Enter Mobile Number');
  //     return false;
  //   }
  //   else {
  //     var mobilee = /^[0-9]{10}$/;
  //     if (mobilee.test($('#mobile').val())) {
  //       $('#mobile').removeAttr("style");
  //     }
  //     else {
  //       $('#mobile').focus().css("border-color", "red").attr('placeholder', 'Please enter valid Mobile number').val('');
  //       return false;
  //     }
  //   }
  //   if ($('#password').val() == "") {
  //     $('#password').focus().css("border-color", "red").attr('placeholder', 'Please Enter Password');
  //     return false;
  //   }
  //   else {
  //     var enameFilter = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{5,10}$/;
  //     if (enameFilter.test($('#password').val())) {
  //       this.showalert = false;
  //     }
  //     else {
  //       this.showalert = true;
  //     }
  //   }

  //   if ($('#repassword').val() == "") {
  //     $('#repassword').focus().css("border-color", "red").attr('placeholder', 'Please confirm password');
  //     return false;
  //   }
  //   else {
  //     if ($('#repassword').val() == $('#password').val()) {
  //       $('#repassword').removeAttr("style");
  //     }
  //     else {
  //       $('#repassword').focus().css("border-color", "red").attr('placeholder', 'Password does not match').val('');
  //       return false;
  //     }
  //   }
  //   var param = { 
  //    valmail : this.register.useremail,
  //    valnumber : this.register.usernumber
  //   }
  //   this.Service.CheckRegEmail(param).subscribe((response) =>{
  //    if(response['status'] === '1'){
  //     swal({
  //       title: 'Duplicate Email',
  //       text: 'email already registerd',
  //       type: 'error',
  //       showConfirmButton: false,
  //       timer: 2500
  //     });
  //    }else{
  //       var param = {
  //   username : this.register.username,
  //   lastname : this.register.lastname,
  //   email : this.register.useremail,
  //   number :this.register.usernumber,
  //   password : this.register.userpass,
  //   confirm_password : this.register.reuserpass
  //   }
  //   this.Service.addNewUserReg(param).subscribe((success) => {
  //     if (success['status'] === 'True'){
  //       swal({
  //         title: 'Success',
  //         text: 'Registartion Succussfull',
  //         type: 'success',
  //         showConfirmButton: false,
  //         timer: 2500
  //       });
  //   }else{
  //     swal({
  //       title: 'Something went wrong!',
  //       type: 'error',
  //       showConfirmButton: false,
  //       timer: 1500
  //     });
  //   }
  //   this.register.username = '';
  //   this.register.lastname = '';
  //   this.register.useremail = '';
  //   this.register.usernumber = '';
  //   this.register.userpass = '';
  //   this.register.reuserpass = '';
  //   this.signin = true;
  //   this.signup = false;
  //   });
  //    }
  //   });
  // }

  // SignIn(){
  //   if ($('#email').val() == "") {
  //     $('#email').focus().css("border-color", "red").attr('placeholder', 'Please Enter Email');
  //     return false;
  //   }
  //   if ($('#epass').val() == "") {
  //     $('#epass').focus().css("border-color", "red").attr('placeholder', 'Please Enter password');
  //     return false;
  //   }
  //   var param = {
  //     loginmail : this.login.email,
  //     loginpass : this.login.pass
  //   }
  //   this.Service.userLogin(param).subscribe((success) => {
  //     if (success['status'] === 'True'){
  //       localStorage.setItem('loginID','1');
  //       swal({
  //         title: 'Success',
  //         text: 'Login Succussfull',
  //         type: 'success',
  //         showConfirmButton: false,
  //         timer: 2500
  //       });
  //       if (typeof (Storage) !== "undefined") {
  //       let userdetails = success['details'];
  //       this.username = userdetails[0].user_name;
  //       this.usernum = userdetails[0].number;
  //       this.useremail = userdetails[0].user_email;
  //       this.userid = userdetails[0].reg_IDPK;
  //       localStorage.setItem('userName', this.username);
  //       localStorage.setItem('usernum', this.usernum);
  //       localStorage.setItem('useremail', this.useremail);
  //       localStorage.setItem('userID', this.userid);

  //       if("SeenPropertyID" in localStorage){
  //         this.seenproparr = JSON.parse(localStorage.getItem('SeenPropertyID'));
  //         console.log(this.seenproparr);
  //         const userid = localStorage.getItem("userID");
  //         var param = {
  //           userid : userid,
  //           propid : this.seenproparr
  //         }
  //         if(this.seenproparr.length !== 0){
  //         this.Service.addUserSeenProjects(param).subscribe(response =>{
  //           if (response['status'] === 'True') {
  //             localStorage.setItem("SeenPropertyID", "[]");
  //           }else{
  //           }
  //         });
  //       }
  //       }

  //       if ("propertyID" in localStorage) {
  //         this.storagearr = JSON.parse(localStorage.getItem('propertyID'));
  //         const userid = localStorage.getItem("userID");
  //         var param = {
  //           userid : userid,
  //           propid : this.storagearr
  //         }
  //         if(this.storagearr.length !== 0){
  //         this.Service.addfavaourite(param).subscribe(response => {
  //           if (response['status'] === 'True') {
  //             localStorage.setItem("propertyID", "[]");
  //           }else{
  //           }
  //         });
  //       }
  //       }

  //     } else {
  //       document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
  //     }
  //       window.history.back();
  //       this.login.email = '';
  //       this.login.pass = '';
  //    }else{
  //     swal({
  //       title: 'invalid',
  //       text: 'Email and password is not valid',
  //       type: 'error',
  //       showConfirmButton: false,
  //       timer: 2500
  //     });
  //    }
  //   });
  // }
  // resetemail : any;
  // ResetPass(){
  //   if ($('#remail').val() == "") {
  //     $('#remail').focus().css("border-color", "red").attr('placeholder', 'Please Enter Email-id');
  //     return false;
  //   }
  //   else {
  //     var emaill = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
  //     if (emaill.test($('#remail').val())) {
  //       $('#remail').removeAttr("style");
  //     }
  //     else {
  //       $('#remail').focus().css("border-color", "red").attr('placeholder', 'Please enter valid email').val('');
  //       return false;
  //     }
  //   }
  // let  resetpassemail = this.resetemail
  // this.Service.forgetPasswordRequest(resetpassemail).subscribe((response) =>{
  //   if(response['status'] === 'True'){
  //     swal({
  //       title: 'Reset Password',
  //       text: 'Reset password link has been sent to' + this.resetemail + 'please check',
  //       type: 'success',
  //       showConfirmButton: false,
  //       timer: 2500
  //     });
  //   }else{
  //     swal({
  //       title: 'Reset Password',
  //       text: 'Your email id is not registred with us please enter valid email',
  //       type: 'error',
  //       showConfirmButton: false,
  //       timer: 2500
  //     });
  //   }
  //   this.resetemail = '';
  // });
  // }


  showpass() {
    var x = <HTMLInputElement>document.getElementById("password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
    var x = <HTMLInputElement>document.getElementById("repassword");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }
  showsignup() {
    this.signup = true;
    this.signin = false;
    this.loginOTP = false;
  }
  showsignin() {
    this.signup = false;
    this.signin = true;
    this.loginOTP = false;
  }
  forgotpassshow() {
    this.resetpass = true;
    this.signin = false;
    this.signup = false;
    this.loginOTP = false;
  }
  signInwithEmail() {
    this.resetpass = false;
    this.signin = true;
    this.signup = false;
    this.loginOTP = false;
  }
  back() {
    this.resetpass = false;
    this.signin = true;
    this.signup = false;
    this.loginOTP = false;
  }
  backfromsignin() {
    this.resetpass = false;
    this.signin = false;
    this.signup = false;
    this.loginOTP = true;
  }
  closesignin() {
    this.router.navigate(['/']);
  }
  closesignup() {
    this.router.navigate(['/']);
  }
  handleEvent(e: CountdownEvent) {
    // 
    if (e.action === 'done') {
      this.otpexpired = true;
    }
  }

  goback() {
    $('#modal-container').addClass('out');
    $('body').removeClass('modal-active');
  }

  onOtpChange(otp) {
    var param = this.user;
    param.otp = otp;
  }
  
  otpsend() {

    if ($('#cname').val() == "") {
      $('#cname').focus().css("border-color", "red").attr('placeholder', 'Please Enter Your Name');
      return false;
    }
    else {
      var cname = /^[A-Za-z ]{2,30}$/;
      if (cname.test($('#cname').val())) {
        $('#cname').removeAttr("style");
      }
      else {
        $('#cname').focus().css("border-color", "red").attr('placeholder', 'Please enter valid Name').val('');
        return false;
      }
    }


    if ($('#emobile').val() == "") {
      $('#emobile').focus().css("border-color", "red").attr('placeholder', 'Please Enter Mobile Number');
      return false;
    }
    else {
      var mobilee = /^[0-9]{10}$/;
      if (mobilee.test($('#emobile').val())) {
        $('#emobile').removeAttr("style");
      }
      else {
        $('#emobile').focus().css("border-color", "red").attr('placeholder', 'Please enter valid Mobile number').val('');
        return false;
      }
    }

    const paramNum = {
      number: this.user.number
    }
    this.otploader = true;
    this.countdownconfig = {
      leftTime: 30,
      demand: true
    };

    $('body').addClass('bodyoverlay');  
    this.Service.otpsend(paramNum).subscribe((success: { messages }) => {
      var status = success.messages[0].status;
      if (status == 'ENQUEUED') {
        this.countdown.begin();
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
      console.log('Connection Failed');
    });
  }

  otpvalidate() {
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
    this.Service.otpvalidcheck(paramNum).subscribe((success) => {
      var status = success['status'];
      if (status == 'True') {
        this.onSubmit();
        this.countdown.restart();
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
      console.log('Connection Failed');
    });
  }

  onSubmit() {
    if (this.user.name == undefined) {
      this.user.name = 'guest user'
    }
    var param = {
      number: this.user.number,
      username: this.user.name,
      device_source: this.user.device_source
    }
    this.Service.Loginwithnum(param).subscribe(responce => {
      if (responce['status'] === 'True') {
        localStorage.setItem('loginID', '1');
        this.otploader = false;
        this.cancel.nativeElement.click();
        $('body').removeClass('bodyoverlay');
        swal({
          title: 'OTP Verified',
          text: 'login Successfully!',
          type: 'success',
          showConfirmButton: false,
          timer: 2500
        });
        let userdetails = responce['UserDetails'];
        this.eusername = userdetails[0].user_name;
        this.eusernum = userdetails[0].number;
        this.euseremail = userdetails[0].user_email;
        this.userid = userdetails[0].reg_IDPK;
        localStorage.setItem('userName', this.eusername);
        localStorage.setItem('usernum', this.eusernum);
        localStorage.setItem('useremail', this.euseremail);
        localStorage.setItem('userID', this.userid);

        if ("SeenPropertyID" in localStorage) {
          this.seenproparr = JSON.parse(localStorage.getItem('SeenPropertyID'));
          const userid = localStorage.getItem("userID");
          var param = {
            userId: userid,
            propId: this.seenproparr,
            db_category_id: 1
          }
          if (this.seenproparr.length !== 0) {
            this.Service.addUserSeenProjects(param).subscribe(response => {
              if (response['status'] === 'True') {
                localStorage.setItem("SeenPropertyID", "[]");
              } else {
              }
            });
          }
        }
        if ("individualSeenPropertyID" in localStorage) {
          this.seenproparr1 = JSON.parse(localStorage.getItem('individualSeenPropertyID'));
          const userid = localStorage.getItem("userID");
          var param1 = {
            userId: userid,
            propId: this.seenproparr1,
            db_category_id: 2
          }
          if (this.seenproparr1.length !== 0) {
            this.Service.addUserSeenProjects(param1).subscribe(response => {
              if (response['status'] === 'True') {
                localStorage.setItem("individualSeenPropertyID", "[]");
              } else {
              }
            });
          }
        }
        if ("rentalSeenPropertyID" in localStorage) {
          this.seenproparr3 = JSON.parse(localStorage.getItem('rentalSeenPropertyID'));
          const userid = localStorage.getItem("userID");
          var param2 = {
            userId: userid,
            propId: this.seenproparr3,
            db_category_id: 3
          }
          if (this.seenproparr3.length !== 0) {
            this.Service.addUserSeenProjects(param2).subscribe(response => {
              if (response['status'] === 'True') {
                localStorage.setItem("rentalSeenPropertyID", "[]");
              } else {
              }
            });
          }
        }
        if ("commercialSeenPropertyData" in localStorage) {
          this.seenproparr4 = JSON.parse(localStorage.getItem('commercialSeenPropertyData'));
          const userid = localStorage.getItem("userID");
          var param3 = {
            userId: userid,
            propId: this.seenproparr4,
            db_category_id: 4
          }
          if (this.seenproparr4.length !== 0) {
            this.Service.addUserSeenProjects(param3).subscribe(response => {
              if (response['status'] === 'True') {
                localStorage.setItem("commercialSeenPropertyData", "[]");
              } else {
              }
            });
          }
        }
        if ("pgSeenPropertyID" in localStorage) {
          this.seenproparr = JSON.parse(localStorage.getItem('pgSeenPropertyID'));
          const userid = localStorage.getItem("userID");
          var param4 = {
            userId: userid,
            propId: this.seenproparr,
            db_category_id: 5
          }
          if (this.seenproparr.length !== 0) {
            this.Service.addUserSeenProjects(param4).subscribe(response => {
              if (response['status'] === 'True') {
                localStorage.setItem("pgSeenPropertyID", "[]");
              } else {
              }
            });
          }
        }

        if ("propertyID" in localStorage) {
          this.storagearr = JSON.parse(localStorage.getItem('propertyID'));
          const userid = localStorage.getItem("userID");
          var param5 = {
            userId: userid,
            propId: this.storagearr,
            CatagoryId: 1
          }
          if (this.storagearr.length !== 0) {
            this.Service.addfavaourite(param5).subscribe(response => {
              if (response['status'] === 'True') {
                localStorage.setItem("propertyID", "[]");
              } else {
              }
            });
          }
        }
        if ("individualPropertyID" in localStorage) {
          this.storagearr1 = JSON.parse(localStorage.getItem('individualPropertyID'));
          const userid = localStorage.getItem("userID");
          var param6 = {
            userId: userid,
            propId: this.storagearr1,
            CatagoryId: 2
          }
          if (this.storagearr1.length !== 0) {
            this.Service.addfavaourite(param6).subscribe(response => {
              if (response['status'] === 'True') {
                localStorage.setItem("individualPropertyID", "[]");
              } else {
              }
            });
          }
        }
        if ("rentalPropertyID" in localStorage) {
          this.storagearr2 = JSON.parse(localStorage.getItem('rentalPropertyID'));
          const userid = localStorage.getItem("userID");
          var param7 = {
            userId: userid,
            propId: this.storagearr2,
            CatagoryId: 3
          }
          if (this.storagearr2.length !== 0) {
            this.Service.addfavaourite(param7).subscribe(response => {
              if (response['status'] === 'True') {
                localStorage.setItem("rentalPropertyID", "[]");
              } else {
              }
            });
          }
        }
        if ("commercialPropertyData" in localStorage) {
          this.storagearr3 = JSON.parse(localStorage.getItem('commercialPropertyData'));
          const userid = localStorage.getItem("userID");
          var param8 = {
            userId: userid,
            propId: this.storagearr3,
            CatagoryId: 4
          }
          if (this.storagearr3.length !== 0) {
            this.Service.addfavaourite(param8).subscribe(response => {
              if (response['status'] === 'True') {
                localStorage.setItem("commercialPropertyData", "[]");
              } else {
              }
            });
          }
        }
        if ("pgPropertyID" in localStorage) {
          this.storagearr4 = JSON.parse(localStorage.getItem('pgPropertyID'));
          const userid = localStorage.getItem("userID");
          var param5 = {
            userId: userid,
            propId: this.storagearr4,
            CatagoryId: 5
          }
          if (this.storagearr4.length !== 0) {
            this.Service.addfavaourite(param5).subscribe(response => {
              if (response['status'] === 'True') {
                localStorage.setItem("pgPropertyID", "[]");
              } else {
              }
            });
          }
        }
        // this.router.navigate(['/postproperty']);
        this.user.number = '';
        this.user.otp = '';
        $('#modal-container').addClass('out');
        $('body').removeClass('modal-active');
        this.eusernumber = '';
        if (this.router.url.indexOf('?id=Profile') > -1) {
          this.router.navigate(['/userauth/profile/' + this.userid]);
        } else if (this.router.url.indexOf('?id=Wishlist') > -1) {
          this.router.navigate(['/userauth/wishlist/'] + this.userid);
        } else if (this.router.url.indexOf('?id=SeenProjects') > -1) {
          this.router.navigate(['/userauth/seenprojects/' + this.userid]);
        } else if (this.router.url.indexOf('?id=Directlogin') > -1) {
          this.router.navigate(['/userauth/profile/' + this.userid]);
        } else {
          window.history.back();
        }
        // window.location.href = '/postproperty';
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
      console.log('Connection Failed');
    });
  }

  //   loginclose() {
  //   // this.window.location.hash = '';
  //   $('.mainbg').css('display', 'none');
  // }
}


