import { Component, OnInit, ViewChild} from '@angular/core';
import { DataService } from '../data.service'
import { CountdownComponent, CountdownConfig, CountdownEvent } from 'ngx-countdown';
import {query} from '../buy/innerblog';

declare var $: any;
declare var swal: any;

declare var $: any;
@Component({
  selector: 'app-footerform',
  templateUrl: './footerform.component.html',
  styleUrls: ['./footerform.component.css']
})
export class FooterformComponent implements OnInit {
  @ViewChild('cd2', { static: false }) private countdown2: CountdownComponent;
  constructor(public Service: DataService) { }

  ngOnInit(): void {
  }
  user = new query();

  config = {
    allowNumbersOnly: true,
    length: 4,
    isPasswordInput: false,
    disableAutoFocus: true,
    placeholder: '',
    inputStyles: {
      'width':  '50px',
      'height': '50px'
    }
  };
  countdownconfig = {
    leftTime: 30,
    demand: true
  };
  otpexpired = false;
  handleEvent(e: CountdownEvent) {
    if (e.action === 'done'){
     this.otpexpired = true;
    }
  }
  // start()
  // {
  //   this.countdown.begin();
  // }
  // reset()
  // {
  //   this.countdown.restart();
  // }
  onOtpChange(otp) {
    var param = this.user;
    param.otp = otp;
  }
  otploader = false;
  goback()
  {
    $('#modal-container2').addClass('out');
    $('body').removeClass('modal-active');
  }
  otpsend2()
  {
    if ($('#namee').val() === '') {
      $('#namee').focus().css('border-color', 'red').attr('placeholder', 'Please Enter Name');
      return false;
    } else {
      const nameFilter = /^([a-zA-Z]+\s)*[a-zA-Z]+$/;
      if (nameFilter.test($('#namee').val())) {
        $('#namee').removeAttr('style');
      } else {
        $('#namee').focus().css('border-color', 'red').attr('placeholder', 'Please enter valid name').val('');
        return false;
      }
    }

    if ($('#mobilenoo').val() === '') {
      $('#mobilenoo').focus().css('border-color', 'red').attr('placeholder', 'Please Enter Phone Number');
      return false;
    } else {
      const mobileno = /^[0-9]{10}$/;
      if (mobileno.test($('#mobilenoo').val())) {
        $('#mobilenoo').removeAttr('style');
      } else {
        $('#mobilenoo').focus().css('border-color', 'red').attr('placeholder', 'Please enter valid contact number').val('');
        return false;
      }
    }

    if ($('#emaill').val() === '') {
      $('#emaill').focus().css('border-color', 'red').attr('placeholder', 'Please Enter Email-id');
      return false;
    } else {
      const email = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
      if (email.test($('#emaill').val())) {
        $('#emaill').removeAttr('style');
      } else {
        $('#emaill').focus().css('border-color', 'red').attr('placeholder', 'Please enter valid email-id').val('');
        return false;
      }
    }

    this.otploader = true;
    this.letus();
    // $('body').addClass('bodyoverlay');
    // var param = this.user;
    // this.Service.otpsend(param).subscribe((success) => {
    //   var prestatus = success['Data'];
    //   var status = prestatus[0].MessageErrorDescription;
    //   if(status == "Success"){
    //     this.letus();
    //     this.countdown2.begin();
    //     var buttonId = $('#one').attr('id');
    //     $('#modal-container2').removeAttr('class').addClass(buttonId);
    //     $('body').addClass('modal-active');
    //     this.otploader = false;
    //     $('body').removeClass('bodyoverlay');
    //   }else{
    //     swal({
    //       title: 'Oops Something Error!',
    //       type: 'error',
    //       showConfirmButton: false,
    //       timer: 1500
    //       })
    //       this.otploader = false;
    //     $('body').removeClass('bodyoverlay');
    //   }
    // }, (err) => {
    //   
    // });
  }
  // otpvalidate2()
  // {
  //   var otplength = 4;
  //   if ($('#otp2').val() == "") {
  //     swal({
  //       title: 'Please enter the OTP!',
  //       type: 'error',
  //       showConfirmButton: false,
  //       timer: 1000
  //     })
  //     return false;
  //   }else{
  //     var liveotpcount = $('#otp2').val().length;
  //     if(liveotpcount < otplength){
  //       swal({
  //         title: 'Please enter the valid OTP!',
  //         type: 'warning',
  //         showConfirmButton: false,
  //         timer: 1500
  //       })
  //       return false;
  //     }else{}
  //   }
  //   var param = this.user;
  //   this.otploader = true;
  //   $('body').addClass('bodyoverlay');
  //   this.Service.otpvalidcheck(param).subscribe((success) => {
  //     var status = success['status'];
  //     if(status == "True"){
  //       this.otploader = false;
  //       $('body').removeClass('bodyoverlay');
  //       swal({
  //     title: 'OTP Verified',
  //     text: 'We Will Intimate you soon!',
  //     type: 'success',
  //     showConfirmButton: false,
  //     timer: 2500
  //     });
  //       $('#modal-container2').addClass('out');
  //       $('body').removeClass('modal-active');
  //       this.user.name = '';
  //       this.user.number = '';
  //       this.user.email = '';
  //       this.user.msg = '';
  //       this.user.otp = '';
  //       $('#btn_reset').click();
  //       this.countdown2.restart();
  //     }else{
  //       this.otploader = false;
  //       $('body').removeClass('bodyoverlay');
  //       swal({
  //         title: 'Oops Something Error!',
  //         text: 'Its Not a valid OTP / OTP Expired!',
  //         type: 'error',
  //         showConfirmButton: false,
  //         timer: 1500
  //         })
  //     }
  //   }, (err) => {
  //     
  //   });
  // }

  letus() {
    var cityid = '1';
    var param = this.user;
    this.Service.addqueryForm(param, cityid).subscribe((success) => {
      // this.user = success;
      if(success['status'] === 'True'){
        this.otploader = false;
        $('body').removeClass('bodyoverlay');
        swal({
      // title: 'OTP Verified',
      text: 'We Will Intimate you soon!',
      type: 'success',
      showConfirmButton: false,
      timer: 2500
      });
        $('#modal-container2').addClass('out');
        $('body').removeClass('modal-active');
        this.user.name = '';
        this.user.number = '';
        this.user.email = '';
        this.user.msg = '';
        this.user.otp = '';
        $('#btn_reset').click();
      }else{
        swal({
          title: 'Something went wrong!',
          type: 'error',
          showConfirmButton: false,
          timer: 1500
        });
      }
    }, (err) => {
      
    });

  }

}
