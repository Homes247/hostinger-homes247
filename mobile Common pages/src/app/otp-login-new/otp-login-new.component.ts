import {
  Component,
  OnInit,
  OnDestroy,
  ViewChildren,
  QueryList,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { User } from '../home/home';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { CountdownComponent, CountdownEvent } from 'ngx-countdown';
declare var $: any;
declare var swal: any;

@Component({
  selector: 'app-otp-login-new',
  templateUrl: './otp-login-new.component.html',
  styleUrls: ['./otp-login-new.component.css']
})
export class OtpLoginNewComponent implements OnInit, OnDestroy {

  @ViewChild('cd4') countdown4: CountdownComponent;
  @ViewChild('ngOtpInput') ngOtpInput: any;
  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef<HTMLInputElement>>;

  constructor(
    private router: Router,
    public Service: DataService,
  ) { }

  user = new User();

  phoneNumber = '';
  showOtpSheet = false;
  otp: string[] = ['', '', '', ''];

  ngOnInit(): void { }

  ngOnDestroy(): void { }

  onPhoneInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/\D/g, '').slice(0, 10);
    this.phoneNumber = input.value;
  }

  countdownconfig = {
    leftTime: 30,
    demand: true
  };


  otpsend() {
    if ($('#emobile').val() == "") {
      $('#emobile').focus().css("border-color", "red").attr('placeholder', 'Please Enter Mobile Number');
      return false;
    } else {
      var mobilee = /^[0-9]{10}$/;
      if (mobilee.test($('#emobile').val())) {
        $('#emobile').removeAttr("style");
      } else {
        $('#emobile').focus().css("border-color", "red").attr('placeholder', 'Please enter valid Mobile number').val('');
        return false;
      }
    }

    const paramNum = {
      number: this.user.number
    };

    this.showOtpSheet = true;
    document.body.style.overflow = 'hidden';
    $('body').addClass('bodyoverlay');

    this.Service.otpsend(paramNum).subscribe((success: { messages }) => {
      var status = success.messages[0].status;
      if (status == 'ENQUEUED') {
        $('.countdown_maindiv').css('display', 'block');
        $('.otpexpireclass').css('display', 'none');
        this.countdown4?.begin();
        $('body').removeClass('bodyoverlay');
      } else {
        this.showOtpSheet = false;
        document.body.style.overflow = '';
        swal({ title: 'Oops Something Error!', icon: 'error', showConfirmButton: false, timer: 1500 });
        $('body').removeClass('bodyoverlay');
      }
    });
    return true;
  }

  async otpvalidate() {
    var otplength = 4;

    if (!this.user.otp || this.user.otp.length === 0) {

      swal({ title: 'Please enter the OTP!', icon: 'error', showConfirmButton: false, timer: 1000 });
      return false;
    }

    if (this.user.otp.length < otplength) {

      swal({ title: 'Please enter the valid OTP!', icon: 'warning', showConfirmButton: false, timer: 1500 });
      return false;
    }

    const paramNum = this.user;
    $('body').addClass('bodyoverlay');

    this.Service.otpvalidcheck(paramNum).subscribe((success) => {
      var status = success['status'];
      if (status == 'True') {
        this.onSubmit();
        setTimeout(() => { this.countdown4?.restart(); }, 0);
      } else {
        $('body').removeClass('bodyoverlay');

        swal({
          title: 'Oops Something Error!',
          text: 'Its Not a valid OTP / OTP Expired!',
          icon: 'error',
          showConfirmButton: false,
          timer: 1500
        });
        this.ngOtpInput?.setValue('');
        this.user.otp = '';
      }
    }, (err) => {
      console.log('Connection Failed');
    });
    return true;
  }

  seenproparr = [];
  seenproparr1 = [];
  seenproparr2 = [];
  seenproparr3 = [];
  seenproparr4 = [];
  storagearr = [];
  storagearr1 = [];
  storagearr2 = [];
  storagearr3 = [];
  storagearr4 = [];
  eusernumber: any;
  userid;

  config = {
    allowNumbersOnly: true,
    length: 4,
    isPasswordInput: false,
    disableAutoFocus: true,
    placeholder: '',
    containerClass: 'custom-otp-wrapper'
  };

  onSubmit() {
    if (this.user.name == undefined) {
      this.user.name = 'guest user';
    }
    var param = {
      number: this.user.number,
      username: this.user.name,
      device_source: this.user.device_source
    };
    this.Service.Loginwithnum(param).subscribe((responce) => {
      if (responce['status'] === 'True') {
        this.closeOtpSheet();
        $('body').removeClass('bodyoverlay');

        swal({
          title: 'OTP Verified',
          text: 'login Successfully!',
          type: 'success',
          showConfirmButton: false,
          timer: 2500
        });

        let userdetails = responce['UserDetails'];
        var eusername = userdetails[0].user_name;
        var eusernum = userdetails[0].number;
        var euseremail = userdetails[0].user_email;
        this.userid = userdetails[0].reg_IDPK;
        localStorage.setItem('loginID', '1');
        localStorage.setItem('userName', eusername);
        localStorage.setItem('userNumber', eusernum);
        localStorage.setItem('useremail', euseremail);
        localStorage.setItem('userID', this.userid);

        if ("SeenPropertyID" in localStorage) {
          this.seenproparr = JSON.parse(localStorage.getItem('SeenPropertyID'));
          const userid = localStorage.getItem("userID");
          var param = { userId: userid, propId: this.seenproparr, db_category_id: 1 };
          if (this.seenproparr.length !== 0) {
            this.Service.addUserSeenProjects(param).subscribe(response => {
              if (response['status'] === 'True') { localStorage.setItem("SeenPropertyID", "[]"); }
            });
          }
        }
        if ("individualSeenPropertyID" in localStorage) {
          this.seenproparr1 = JSON.parse(localStorage.getItem('individualSeenPropertyID'));
          const userid = localStorage.getItem("userID");
          var param1 = { userId: userid, propId: this.seenproparr1, db_category_id: 2 };
          if (this.seenproparr1.length !== 0) {
            this.Service.addUserSeenProjects(param1).subscribe(response => {
              if (response['status'] === 'True') { localStorage.setItem("individualSeenPropertyID", "[]"); }
            });
          }
        }
        if ("rentalSeenPropertyID" in localStorage) {
          this.seenproparr3 = JSON.parse(localStorage.getItem('rentalSeenPropertyID'));
          const userid = localStorage.getItem("userID");
          var param2 = { userId: userid, propId: this.seenproparr3, db_category_id: 3 };
          if (this.seenproparr3.length !== 0) {
            this.Service.addUserSeenProjects(param2).subscribe(response => {
              if (response['status'] === 'True') { localStorage.setItem("rentalSeenPropertyID", "[]"); }
            });
          }
        }
        if ("commercialSeenPropertyData" in localStorage) {
          this.seenproparr4 = JSON.parse(localStorage.getItem('commercialSeenPropertyData'));
          const userid = localStorage.getItem("userID");
          var param3 = { userId: userid, propId: this.seenproparr4, db_category_id: 4 };
          if (this.seenproparr4.length !== 0) {
            this.Service.addUserSeenProjects(param3).subscribe(response => {
              if (response['status'] === 'True') { localStorage.setItem("commercialSeenPropertyData", "[]"); }
            });
          }
        }
        if ("pgSeenPropertyID" in localStorage) {
          this.seenproparr = JSON.parse(localStorage.getItem('pgSeenPropertyID'));
          const userid = localStorage.getItem("userID");
          var param4 = { userId: userid, propId: this.seenproparr, db_category_id: 5 };
          if (this.seenproparr.length !== 0) {
            this.Service.addUserSeenProjects(param4).subscribe(response => {
              if (response['status'] === 'True') { localStorage.setItem("pgSeenPropertyID", "[]"); }
            });
          }
        }
        if ("propertyID" in localStorage) {
          this.storagearr = JSON.parse(localStorage.getItem('propertyID'));
          const userid = localStorage.getItem("userID");
          var param5 = { userId: userid, propId: this.storagearr, CatagoryId: 1 };
          if (this.storagearr.length !== 0) {
            this.Service.addfavaourite(param5).subscribe(response => {
              if (response['status'] === 'True') { localStorage.setItem("propertyID", "[]"); }
            });
          }
        }
        if ("individualPropertyID" in localStorage) {
          this.storagearr1 = JSON.parse(localStorage.getItem('individualPropertyID'));
          const userid = localStorage.getItem("userID");
          var param6 = { userId: userid, propId: this.storagearr1, CatagoryId: 2 };
          if (this.storagearr1.length !== 0) {
            this.Service.addfavaourite(param6).subscribe(response => {
              if (response['status'] === 'True') { localStorage.setItem("individualPropertyID", "[]"); }
            });
          }
        }
        if ("rentalPropertyID" in localStorage) {
          this.storagearr2 = JSON.parse(localStorage.getItem('rentalPropertyID'));
          const userid = localStorage.getItem("userID");
          var param7 = { userId: userid, propId: this.storagearr2, CatagoryId: 3 };
          if (this.storagearr2.length !== 0) {
            this.Service.addfavaourite(param7).subscribe(response => {
              if (response['status'] === 'True') { localStorage.setItem("rentalPropertyID", "[]"); }
            });
          }
        }
        if ("commercialPropertyData" in localStorage) {
          this.storagearr3 = JSON.parse(localStorage.getItem('commercialPropertyData'));
          const userid = localStorage.getItem("userID");
          var param8 = { userId: userid, propId: this.storagearr3, CatagoryId: 4 };
          if (this.storagearr3.length !== 0) {
            this.Service.addfavaourite(param8).subscribe(response => {
              if (response['status'] === 'True') { localStorage.setItem("commercialPropertyData", "[]"); }
            });
          }
        }
        if ("pgPropertyID" in localStorage) {
          this.storagearr4 = JSON.parse(localStorage.getItem('pgPropertyID'));
          const userid = localStorage.getItem("userID");
          var param5 = { userId: userid, propId: this.storagearr4, CatagoryId: 5 };
          if (this.storagearr4.length !== 0) {
            this.Service.addfavaourite(param5).subscribe(response => {
              if (response['status'] === 'True') { localStorage.setItem("pgPropertyID", "[]"); }
            });
          }
        }

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
        } else if (this.router.url.indexOf('/postproperty') > -1) {
          $('.login-wrapper').css('display','none')
          this.Service.mouseenterserviceOtp();
        } else {
          window.history.back();
        } 
      } else {
        swal({
          title: 'Something went wrong!', 
          text: 'Its Not a valid OTP',
          icon: 'error',
          showConfirmButton: false,
          timer: 1500
        });
      }
    }, (err) => {
      console.log('Connection Failed');
    });
  }

  otpexpired = false;

  onOtpChange(otp) {
    var param = this.user;
    param.otp = otp;
    if (otp?.length === 4) {
      this.otpvalidate();
    }
  }

  handleEvent(e: CountdownEvent): void {
    if (e.action === 'done') {
      $('.countdown_maindiv').css('display', 'none');
      this.countdown4?.restart();
      $('.otpexpireclass').css('display', 'block');
    }
  }

  closeOtpSheet(): void {
    this.showOtpSheet = false;
    document.body.style.overflow = '';
    this.countdown4?.restart();
  }
}
