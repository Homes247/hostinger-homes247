import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CountdownComponent, CountdownEvent } from 'ngx-countdown';
import { DataService } from '../data.service';
import { User } from '../home/home';
import { register } from '../login/login';
import { Meta, Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ElitedataService } from '../elitedata.service';
declare var swal: any;
declare var $: any;
declare var $: any;
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  @ViewChild('cd', { static: false }) private countdown: CountdownComponent;
  @ViewChild('cancel') cancel: ElementRef;
  ProfileImage = this.Service.ProfileImage
  imageUrl: any = 'usericon.jpg';
  registrationForm: FormGroup;
  mainpageshow = true;
  editprofileshow = false;
  resetpassshow = false;
  userresetemail: any;
  username: any;
  usernum: any;
  useremail: any;
  register = new register();
  user = new User();
  UserId: string;
  UserName: any;
  currentURL: any;
  Fname: any;
  Lname: any;
  UserEmail: any;
  lname: any;
  resetnumber: any;
  otploader = false;
  otpexpired = false;
  myTransactionsShow: boolean = false;
  paymentshow: boolean = false;
  footerNavShow: boolean = true;
  startBrowsingProperties: boolean = false;






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
  resetnumbermodal: boolean = false;
  changesMade: boolean = false; // Tracks whether changes have been made or not
  userEmail;
  imageUrls: any;
  profilePlanCard: any;

  constructor(public fb: FormBuilder,
    private Service: DataService,
    private router: Router,
    private titleService: Title,
    private meta: Meta,
    public eliteService: ElitedataService) {
    // this.currentURL = window.location.href;
    // 
  }

  ngOnInit(): void {
    this.metatags();

    this.registrationForm = this.fb.group({
      file: [''],
      userName: [''],
      coverImage: [''],
      cover: [''],
      userEmailID: [''],
      userNumber: [''],
      email: [''],
      lastName: [''],
      number: ['']
    });

    window.location.hash = '';
    this.updateuserdetails();
    this.UserId = localStorage.getItem("userID");
    this.checklogin();
  }

  onInputChange() {
    this.changesMade = true;
  }

  metatags() {
    const PAGEID = '41';
    this.Service.getstaticmeta(PAGEID).subscribe(metatags => {
      this.titleService.setTitle(metatags['Pageseo'][0].page_title);
      this.meta.updateTag({ name: 'description', content: metatags['Pageseo'][0].meta_description });
      this.meta.updateTag({ property: 'og:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_mobile/images/og/about.jpg' });
      this.meta.updateTag({ property: 'og:title', content: metatags['Pageseo'][0].page_title });
      this.meta.updateTag({ property: 'og:description', content: metatags['Pageseo'][0].meta_description });
      this.Service.createLinkForCanonicalURL();
    });
  }

  CoverImage = [];

  onCoverSelectFile(event) {
    if (event.target.files[0].size > 500000) {
      const myElement: HTMLElement = event.target.files[0].size;
      const elementValue = (myElement as HTMLInputElement).value;

      swal({
        icon: 'error',
        title: 'Image Size is too big.',
        text: 'Image Size should be less than 500kb.',
        showConfirmButton: true,
      });

    }
    else {
      if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();
        reader.onload = (event: any) => {
          this.CoverImage = [];
          this.CoverImage.push(event.target.result);
        };
        reader.readAsDataURL(event.target.files[0]);
      }
      if (event.target.files.length > 0) {
        const file = event.target.files[0];
        this.registrationForm.get('cover').setValue(file);
        this.imageUrls = ''
      }
      this.uploadFile();
    }
  }

  uploadResponse;
  uploadFile() {
    this.changesMade = true;
    const formData = new FormData();
    formData.append('profile', this.registrationForm.get('cover').value);
    formData.append('userId', this.UserId);
    this.Service.updatProfileImage(formData).subscribe(responce => {
      this.uploadResponse = responce;

    }, (err) => {

    });
  }

  checklogin() {
    if (this.UserId == null) {
      this.router.navigate(['/login'])
    }
  }
  Showedit() {
    this.mainpageshow = false;
    this.editprofileshow = true;
    this.resetpassshow = false;
    this.myTransactionsShow = false;
    this.paymentshow = false;
  }
  resetpass() {
    this.mainpageshow = false;
    this.editprofileshow = false;
    this.resetpassshow = true;
    this.myTransactionsShow = false;
    this.paymentshow = false;
  }
  changenum() {
    this.resetnumbermodal = true;
    this.mainpageshow = false;
    this.editprofileshow = false;
    this.myTransactionsShow = false;
    this.paymentshow = false;
  }
  profileback() {
    this.mainpageshow = true;
    this.editprofileshow = false;
    this.resetpassshow = false;
    this.resetnumbermodal = false;
    this.myTransactionsShow = false;
    this.paymentshow = false;
    this.footerNavShow = true;
  }

  myTransactions() {
    this.mainpageshow = false;
    this.editprofileshow = false;
    this.resetpassshow = false;
    this.myTransactionsShow = true;
    this.paymentshow = false;
  }


  payment() {
    this.mainpageshow = false;
    this.editprofileshow = false;
    this.resetpassshow = false;
    this.myTransactionsShow = false;
    this.paymentshow = true;
    this.footerNavShow = false;
  }

  startBrowsing() {
    this.mainpageshow = false;
    this.editprofileshow = false;
    this.resetpassshow = false;
    this.myTransactionsShow = false;
    this.paymentshow = false;
    this.startBrowsingProperties = true;
    this.footerNavShow = false;
  }
  // backtofrom(){
  //     window.history.back();
  // }
  UpdateProfile() {
    this.changesMade = false;
    // this.submitted = true;
    if ($('#fname').val() === '') {
      $('#fname').focus().css('border-color', 'red').attr('placeholder', 'Please Enter First Name');
      return false;
    }
    // if ($('#lname').val() === '') {
    //   $('#lname').focus().css('border-color', 'red').attr('placeholder', 'Please Enter Last Name');
    //   return false;
    // }
    if ($('#mail').val() == "") {
      $('#mail').focus().css("border-color", "red").attr('placeholder', 'Please Enter Email-id');
      return false;
    }
    else {
      var emaill = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
      if (emaill.test($('#mail').val())) {
        $('#mail').removeAttr("style");
      }
      else {
        $('#mail').focus().css("border-color", "red").attr('placeholder', 'Please enter valid email').val('');
        return false;
      }
    }

    this.CoverImage = []
    var param = {
      regid: this.UserId,
      name: this.UserName,
      lname: this.Lname,
      mail: this.useremail
    }
    // var regid = this.UserId;
    // var name = this.UserName;

    this.Service.updateuserdata(param).subscribe(responce => {
      if (responce['status'] === 'True') {
        this.updateuserdetails();
        swal({
          title: 'Details Updated Successfully',
          type: 'success',
          showConfirmButton: false,
          timer: 2000
        });
        localStorage.setItem("username", this.UserName);
      } else {
        swal({
          title: 'Something Error Occured',
          type: 'error',
          showConfirmButton: false,
          timer: 2000
        });
      }
    });
  }
  // UpdatePass(){
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
  // let  resetpassemail = this.userresetemail;
  // this.Service.forgetPasswordRequest(resetpassemail).subscribe((response) =>{
  // if(response['status'] === 'True'){
  //   swal({
  //     title: 'Reset Password',
  //     text: 'Reset password link has been sent to' + this.userresetemail + 'please check',
  //     type: 'success',
  //     showConfirmButton: false,
  //     timer: 2500
  //   });
  // }else{
  //   swal({
  //     title: 'Reset Password',
  //     text: 'Your email id is not registred with us please enter valid email',
  //     type: 'error',
  //     showConfirmButton: false,
  //     timer: 2500
  //   });
  // }
  // this.userresetemail = '';
  // });
  // }
  handleEvent(e: CountdownEvent) {
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
    if ($('#renumber').val() == "") {
      $('#renumber').focus().css("border-color", "red").attr('placeholder', 'Please Enter Number');
      return false;
    }
    var param = {
      number: this.user.number
    }
    this.Service.CheckNumLogin(param).subscribe((response) => {
      if (response['status'] === '1') {
        swal({
          text: 'Mobile Number already exist try with New Number',
          type: 'error',
          showConfirmButton: false,
          timer: 2500
        });
      } else {
        this.otploader = true;
        $('body').addClass('bodyoverlay');
        this.Service.otpsend(param).subscribe((success) => {
          var prestatus = success['messaging_product'];
          // var status = prestatus[0].MessageErrorDescription;
          if (prestatus == 'whatsapp') {
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

        });
      }
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
        // this.onSubmit();
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

    });
  }

  onSubmit() {
    this.changesMade = false;
    // this.submitted = true;
    if ($('#name').val() === '') {
      $('#name').focus().css('border-color', 'red').attr('placeholder', 'Please Enter the name');
      return false;
    } else {

    }
    if ($('#emailId').val() === '') {
      $('#emailId').focus().css('border-color', 'red').attr('placeholder', 'Please Enter email');
      return false;
    } else {
      const emailFilter = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if (emailFilter.test($('#emailId').val())) {
        $('#emailId').removeAttr('style');
      } else {
        $('#emailId').focus().css('border-color', 'red').attr('placeholder', 'Please enter valid email').val('');
        return false;
      }
    }

    const regid = this.UserId;
    const name = this.username;
    const lastName = this.registrationForm.value.lastName;
    const email = this.useremail;
    this.Service.updateuserdata1(regid, name, lastName, email).subscribe(responce => {
      if (responce['status'] === 'True') {
        swal({
          title: 'Details Updated Successfully',
          type: 'success',
          showConfirmButton: false,
          timer: 2000
        });
        localStorage.setItem("userName", name);
        this.updateuserdetails();
      } else {
        swal({
          title: 'Something Error Occured',
          type: 'error',
          showConfirmButton: false,
          timer: 2000
        });
      }
    });
  }




  // onSubmit() {
  //   var param = {
  //     id : this.UserId,
  //     number : this.user.number,
  //   }
  //   this.Service.changenumber(param).subscribe(responce => {
  //     if (responce['status'] === 'Success') {
  //       this.otploader = false;
  //       this.cancel.nativeElement.click();
  //       $('body').removeClass('bodyoverlay');
  //       swal({
  //         title: 'Number Update',
  //         text: 'New Number Updated Succussfully!',
  //         type: 'success',
  //         showConfirmButton: false,
  //         timer: 2500
  //       });
  //       $('#modal-container').addClass('out');
  //       $('body').removeClass('modal-active');
  //       // this.user.number = '';
  //     } else {
  //       swal({
  //         title: 'Something went wrong!',
  //         text: 'Its Not a valid OTP',
  //         type: 'error',
  //         showConfirmButton: false,
  //         timer: 1500
  //       });
  //     }
  //   }, (err) => {
  //     
  //   });
  // }
  updateuserdetails() {
    const userid = localStorage.getItem("userID");
    this.UserId = userid;
    this.Service.getUserDetailsById(this.UserId).subscribe(response => {
      let userdetails = response['UserDetails'];
      this.imageUrls = userdetails[0]['user_profile']
      this.usernum = userdetails[0].number;
      this.username = userdetails[0].user_name;
      this.UserName = userdetails[0].user_name;
      this.Lname = userdetails[0].last_name;
      this.lname = userdetails[0].last_name;
      this.useremail = userdetails[0].user_email;
      this.UserEmail = userdetails[0].user_email;
      this.profileCard();
    })
  }

  onCancel() {
    this.changesMade = false;
    this.username = this.UserName;
    this.Lname = this.lname;
    this.useremail = this.UserEmail;
    // this.removeUploadedFile();
  }

  // onCancel(){
  //   this.changesMade = false;
  //  this.UserName = this.username;
  //  this.Lname = this.lname;
  //  this.UserEmail = this.useremail
  // }

  Logout() {
    // localStorage.clear();
    localStorage.removeItem("userName");
    localStorage.removeItem("userID");
    localStorage.removeItem("useremail");
    localStorage.removeItem("usernum");
    localStorage.removeItem("loginID");
    localStorage.removeItem("userLastName");
    this.router.navigate(['/login'])

  }

  onprofileInputChange() {
    $("#getOtpBtn").removeAttr("disabled")
    $("#getOtpBtn").addClass("updateProfileNumberBtnActive")
    $("#getOtpBtn").removeClass("updateProfileNumberBtn")
  }
  // ====================================Thippesh edit start here=====================================================
  profileCard() {
    console.log("12")
    const number = this.usernum;
    // const number = "6363035616";
    this.eliteService.profileCard(number).subscribe((res: any) => {
      this.profilePlanCard = res.plans ? [res.plans] : [];
      console.log(this.profilePlanCard);
    })
  }
}
