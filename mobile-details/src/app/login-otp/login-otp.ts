import {
  Component,
  OnInit,
  OnDestroy,
  ViewChildren,
  QueryList,
  ElementRef,
  viewChild,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule } from '@angular/forms';
// import { login, register } from './login';
import { User } from '../home/home';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { CountdownComponent, CountdownEvent } from 'ngx-countdown';
import { NgOtpInputModule } from "ng-otp-input";
declare var $: any;



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, NgOtpInputModule, CountdownComponent],
  templateUrl: './login-otp.html',
  styleUrls: ['./login-otp.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  readonly countdown4 = viewChild<CountdownComponent>('cd4');
  readonly ngOtpInput = viewChild<any>('ngOtpInput');
  constructor(
    //  private authService: SocialAuthService,
    private router: Router,
    public Service: DataService,
    private formBuilder: FormBuilder
  ) { }


  // register = new register();
  // login = new login();
  user = new User();

  // ── Login Screen ────────────────────────────────────────────────────
  phoneNumber = '';

  // ── OTP Sheet ───────────────────────────────────────────────────────
  showOtpSheet = false;
  otp: string[] = ['', '', '', ''];

  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef<HTMLInputElement>>;



  // ── Lifecycle ───────────────────────────────────────────────────────
  ngOnInit(): void { }

  ngOnDestroy(): void {
    // this.clearTimer();
  }

  // ── Phone Input ─────────────────────────────────────────────────────
  onPhoneInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    // Allow digits only
    input.value = input.value.replace(/\D/g, '').slice(0, 10);
    this.phoneNumber = input.value;
  }

  // formatPhone(phone: string): string {
  //   if (!phone || phone.length < 5) return phone;
  //   return phone.slice(0, 5) + ' ' + phone.slice(5);
  // }

  // ── OTP Sheet ───────────────────────────────────────────────────────
  // openOtpSheet(): void {
  //   if (this.phoneNumber.length < 10) return;
  //   this.otp = ['', '', '', ''];
  //   this.showOtpSheet = true;
  //   document.body.style.overflow = 'hidden';
  //   this.startTimer();

  //   // Auto-focus first OTP box after sheet animates in
  //   setTimeout(() => {
  //     const inputs = this.otpInputs.toArray();
  //     if (inputs.length) inputs[0]?.nativeElement.focus();
  //   }, 380);
  // }



  // ── OTP Input Handling ──────────────────────────────────────────────
  // onOtpInput(event: Event, index: number): void {
  //   const input = event.target as HTMLInputElement;
  //   const val = input.value.replace(/\D/g, '').slice(-1);
  //   this.otp[index] = val;
  //   input.value = val;

  //   if (val && index < 3) {
  //     const inputs = this.otpInputs.toArray();
  //     inputs[index + 1]?.nativeElement.focus();
  //   }
  // }

  // onOtpKeyDown(event: KeyboardEvent, index: number): void {
  //   const inputs = this.otpInputs.toArray();

  //   if (event.key === 'Backspace') {
  //     if (this.otp[index]) {
  //       this.otp[index] = '';
  //       (event.target as HTMLInputElement).value = '';
  //     } else if (index > 0) {
  //       this.otp[index - 1] = '';
  //       inputs[index - 1].nativeElement.value = '';
  //       inputs[index - 1].nativeElement.focus();
  //     }
  //     event.preventDefault();
  //   }

  //   if (event.key === 'ArrowLeft' && index > 0) {
  //     inputs[index - 1].nativeElement.focus();
  //   }

  //   if (event.key === 'ArrowRight' && index < 3) {
  //     inputs[index + 1].nativeElement.focus();
  //   }
  // }

  // onOtpPaste(event: ClipboardEvent): void {
  //   event.preventDefault();
  //   const pasted = event.clipboardData?.getData('text') ?? '';
  //   const digits = pasted.replace(/\D/g, '').slice(0, 4);
  //   const inputs = this.otpInputs.toArray();

  //   digits.split('').forEach((digit, i) => {
  //     if (i < 4) {
  //       this.otp[i] = digit;
  //       inputs[i].nativeElement.value = digit;
  //     }
  //   });

  //   const focusIndex = Math.min(digits.length, 3);
  //   inputs[focusIndex]?.nativeElement.focus();
  // }

  // verifyOtp(): void {
  //   const code = this.otp.join('');
  //   if (code.length < 4) return;
  //   console.log('Verifying OTP:', code, 'for', this.phoneNumber);
  //   // TODO: Call your auth service here
  // }

  // ── Resend Timer ────────────────────────────────────────────────────
  // startTimer(): void {
  //   this.resendTimer = 30;
  //   this.clearTimer();
  //   this.timerInterval = setInterval(() => {
  //     if (this.resendTimer > 0) {
  //       this.resendTimer--;
  //     } else {
  //       this.clearTimer();
  //     }
  //   }, 1000);
  // }

  // clearTimer(): void {
  //   if (this.timerInterval) {
  //     clearInterval(this.timerInterval);
  //     this.timerInterval = null;
  //   }
  // }

  // resendOtp() {
  //   if (this.resendTimer > 0) return;
  //   this.otp = ['', '', '', ''];
  //   this.otpInputs.toArray().forEach(i => (i.nativeElement.value = ''));
  //   this.startTimer();
  //   console.log('OTP resent to', this.phoneNumber);
  //   // TODO: Call resend API here

  //   setTimeout(() => {
  //     this.otpInputs.toArray()[0]?.nativeElement.focus();
  //   }, 100);
  // }

  countdownconfig = {
    leftTime: 30,
    demand: true
  };




  // formatTimer(seconds: number): string {
  //   const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  //   const s = (seconds % 60).toString().padStart(2, '0');
  //   return `${m}:${s}`;
  // }



  private async getSwal() {
    const { default: Swal } = await import('sweetalert2');
    return Swal;
  }




  otpsend() {

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
    // if (this.phoneNumber.length < 10) return;
    // Add BEFORE the api call:
    this.showOtpSheet = true;
    document.body.style.overflow = 'hidden';
    $('body').addClass('bodyoverlay');

    this.Service.otpsend(paramNum).subscribe(async (success: { messages }) => {
      var status = success.messages[0].status;
      if (status == 'ENQUEUED') {
        $('.countdown_maindiv').css('display', 'block');  
        $('.otpexpireclass').css('display', 'none');
        this.countdown4()?.begin();    // sheet already open ✅
        $('body').removeClass('bodyoverlay');
      } else {
        this.showOtpSheet = false;     // close sheet if api fails
        document.body.style.overflow = '';
        const Swal = await this.getSwal();
        Swal.fire({ title: 'Oops Something Error!', icon: 'error', showConfirmButton: false, timer: 1500 });
        $('body').removeClass('bodyoverlay');
      }
    });
    return true
  }




  async otpvalidate() {
  var otplength = 4;

  if (!this.user.otp || this.user.otp.length === 0) {
    const Swal = await this.getSwal();
    Swal.fire({ title: 'Please enter the OTP!', icon: 'error', showConfirmButton: false, timer: 1000 });
    return false;
  }

  if (this.user.otp.length < otplength) {
    const Swal = await this.getSwal();
    Swal.fire({ title: 'Please enter the valid OTP!', icon: 'warning', showConfirmButton: false, timer: 1500 });
    return false;
  }

  const paramNum = this.user;
  $('body').addClass('bodyoverlay');

  this.Service.otpvalidcheck(paramNum).subscribe(async (success) => {
    var status = success['status'];
    if (status == 'True') {
      this.onSubmit();
      setTimeout(() => { this.countdown4()?.restart(); }, 0);
    } else {
      $('body').removeClass('bodyoverlay');
      const Swal = await this.getSwal();
      await Swal.fire({
        title: 'Oops Something Error!',
        text: 'Its Not a valid OTP / OTP Expired!',
        icon: 'error',
        showConfirmButton: false,
        timer: 1500
      });
       this.ngOtpInput()?.setValue('');
        this.user.otp = ''
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
  userid
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
      this.user.name = 'guest user'
    }
    var param = {
      number: this.user.number,
      username: this.user.name,
      device_source: this.user.device_source
    }
    this.Service.Loginwithnum(param).subscribe(async (responce) => {
      if (responce['status'] === 'True') {
       
        // this.otploader = false;
        this.closeOtpSheet();
        $('body').removeClass('bodyoverlay');
        const Swal = await this.getSwal();
        Swal.fire({
          title: 'OTP Verified',
          text: 'login Successfully!',
          icon: 'success',
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
        const Swal = await this.getSwal();
        Swal.fire({
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
      this.countdown4()?.restart(); // sheet already open ✅
      $('.otpexpireclass').css('display', 'block');
    }
  }
  closeOtpSheet(): void {
    this.showOtpSheet = false;
    document.body.style.overflow = '';
    this.countdown4()?.restart();
  }

}