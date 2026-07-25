import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {Params, Router, ActivatedRoute} from '@angular/router';
import {Title, Meta} from '@angular/platform-browser';
import { DataService } from '../data.service';
import {enquiry} from './city';
import {CountdownComponent, CountdownEvent} from "ngx-countdown";

declare var $: any;
declare var swal: any;

declare var $: any;
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  @ViewChild('cd', { static: false }) private countdown: CountdownComponent;
  constructor(private router: Router, private titleService: Title,
              private meta: Meta, public Service: DataService) {
    this.router.events.subscribe((evt) => {
      // trick the Router into believing it's last link wasn't previously loaded
      this.router.navigated = false;
      // if you need to scroll back to top, here is the right place
      window.scrollTo(0, 0);
    });
  }

  ngOnInit() {
    this.metatags();
    // this.semanticjquery();
  }

  metatags() {
    var PAGEID = '7';
    this.Service.getstaticmeta(PAGEID).subscribe(metatags => {
      this.titleService.setTitle(metatags['Pageseo'][0].page_title);
      this.meta.updateTag({name: 'description', content: metatags['Pageseo'][0].meta_description});
      this.meta.updateTag({property: 'og:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_mobile/images/og/home.png'});
      this.meta.updateTag({property: 'og:title', content: metatags['Pageseo'][0].page_title});
      this.meta.updateTag({property: 'og:description', content: metatags['Pageseo'][0].meta_description});
      this.Service.createLinkForCanonicalURL();
    });
    import('../footer/footer.module').then(mod => mod.FooterModule).then(FooterModule =>{
      this.FooterComponent = FooterModule.components['lazy'];
      this.loaded = true;
    });
  }
  @HostListener('touchstart', ['$event'])
  @HostListener('window:scroll', ['$event'])
  onWindowScrolls() {
      this.Service.mouseenterservice3();
  }
    checkboxClick2() {
    if ($('#exampleCheck2').is(':checked')) {
      $('#contactButton2').removeAttr('disabled'); //enable input
      $("#contactButton2").addClass("contactButton2Active")
    } else {
      $('#contactButton2').attr('disabled', true); //disable input

      $("#contactButton2").removeClass("contactButton2Active")
      $("#contactButton2").addClass("contactButton2")
    }
  }
  loaded = false;
  FooterComponent: any;
  FloatContact:any;
  innerheader:any;
  
  @HostListener('window:scroll', ['$event'])
  onWindowScroll(){
    // 
    let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    let max = document.documentElement.scrollHeight;
    if (pos == max){

      import('../float-contact/float-contact.module').then(mod => mod.FloatContactComponentModule).then(FloatContactComponentModule => {
        this.FloatContact = FloatContactComponentModule.components['lazy'];
        this.loaded = true;
      });
      // import('../innerheader/innerheader.module').then(mod => mod.InnerHeaderModule).then(InnerHeaderModule => {
      //   this.innerheader = InnerHeaderModule.components['lazy'];
      //   this.loaded = true;
      // });
    }
    if ($(window).scrollTop() >=  $(".footerDiv").offset().top) {
      $('#conatctbutton').addClass('conatctbuttonhide');
  }
  else {
      $('#conatctbutton').removeClass('conatctbuttonhide');
  }
  }

  // semanticjquery() {
  //   $('.ui.dropdown').dropdown({});
  // }


  // user = new enquiry();

  // getintouch() {
  //   if ($('#name').val() === '') {
  //     $('#name').focus().css('border-color', 'red').attr('placeholder', 'Please Enter Name');
  //     return false;
  //   } else {
  //     const nameFilter = /^([a-zA-Z]+\s)*[a-zA-Z]+$/;
  //     if (nameFilter.test($('#name').val())) {
  //       $('#name').removeAttr('style');
  //     } else {
  //       $('#name').focus().css('border-color', 'red').attr('placeholder', 'Please enter valid name').val('');
  //       return false;
  //     }
  //   }
  //
  //   if ($('#mobile').val() === '') {
  //     $('#mobile').focus().css('border-color', 'red').attr('placeholder', 'Please Enter Phone Number');
  //     return false;
  //   } else {
  //     const mobileno = /^[0-9]{10}$/;
  //     if (mobileno.test($('#mobile').val())) {
  //       $('#mobile').removeAttr('style');
  //     } else {
  //       $('#mobile').focus().css('border-color', 'red').attr('placeholder', 'Please enter valid contact number').val('');
  //       return false;
  //     }
  //   }
  //   swal({
  //     title: 'We Will Intimate you soon!',
  //     type: 'success',
  //     showConfirmButton: false,
  //     timer: 1500
  //   });
  //   const param = this.user;
  //   const pageorgin = 'Contact Us Page';
  //   this.Service.addAboutCall(param, pageorgin).subscribe(success => {
  //     // this.user = success;
  //   });
  //   this.user.name = '';
  //   this.user.number = '';
  // }
  user = new enquiry();
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
    $('#modal-container').addClass('out');
    $('body').removeClass('modal-active');
  }
  otpsend()
  {
    if ($('#name').val() === '') {
      $('#name').focus().css('border-color', 'red').attr('placeholder', 'Please Enter Name');
      return false;
    } else {
      const nameFilter = /^([a-zA-Z]+\s)*[a-zA-Z]+$/;
      if (nameFilter.test($('#name').val())) {
        $('#name').removeAttr('style');
      } else {
        $('#name').focus().css('border-color', 'red').attr('placeholder', 'Please enter valid name').val('');
        return false;
      }
    }

    if ($('#mobile').val() === '') {
      $('#mobile').focus().css('border-color', 'red').attr('placeholder', 'Please Enter Phone Number');
      return false;
    } else {
      const mobileno = /^[0-9]{10}$/;
      if (mobileno.test($('#mobile').val())) {
        $('#mobile').removeAttr('style');
      } else {
        $('#mobile').focus().css('border-color', 'red').attr('placeholder', 'Please enter valid contact number').val('');
        return false;
      }
    }

    // if ($('#email').val() === '') {
    //   $('#email').focus().css('border-color', 'red').attr('placeholder', 'Please Enter Email-id');
    //   return false;
    // } else {
    //   var emai = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
    //   if (emai.test($('#email').val())) {
    //     $('#email').removeAttr('style');
    //   } else {
    //     $('#email').focus().css('border-color', 'red').attr('placeholder', 'Please enter valid email-id').val('');
    //     return false;
    //   }
    // }

    this.otploader = true;
    this.getintouch();
    // $('body').addClass('bodyoverlay');
    // var param = this.user;
    // this.Service.otpsend(param).subscribe((success) => {
    //   var prestatus = success['Data'];
    //   var status = prestatus[0].MessageErrorDescription;
    //   if(status == "Success"){
    //     this.getintouch();
    //     this.countdown.begin();
    //     var buttonId = $('#one').attr('id');
    //     $('#modal-container').removeAttr('class').addClass(buttonId);
    //     $('body').addClass('modal-active');
    //     this.otploader = false;
    //     $('body').removeClass('bodyoverlay');
    //   }else{
    //     swal({
    //       title: 'Oops Something Error!',
    //       type: 'error',
    //       showConfirmButton: false,
    //       timer: 1500
    //     })
    //     this.otploader = false;
    //     $('body').removeClass('bodyoverlay');
    //   }
    // }, (err) => {
    //   
    // });
  }
  // otpvalidate()
  // {
  //   var otplength = 4;
  //   if ($('#otp').val() == "") {
  //     swal({
  //       title: 'Please enter the OTP!',
  //       type: 'error',
  //       showConfirmButton: false,
  //       timer: 1000
  //     })
  //     return false;
  //   }else{
  //     var liveotpcount = $('#otp').val().length;
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
  //         title: 'OTP Verified',
  //         text: 'We Will Intimate you soon!',
  //         type: 'success',
  //         showConfirmButton: false,
  //         timer: 2500
  //       });
  //       $('#modal-container').addClass('out');
  //       $('body').removeClass('modal-active');
  //       this.user.name = '';
  //       this.user.number = '';
  //       this.user.email = '';
  //       this.user.otp = '';
  //       $('#btn_reset').click();
  //       this.countdown.restart();
  //     }else{
  //       this.otploader = false;
  //       $('body').removeClass('bodyoverlay');
  //       swal({
  //         title: 'Oops Something Error!',
  //         text: 'Its Not a valid OTP / OTP Expired!',
  //         type: 'error',
  //         showConfirmButton: false,
  //         timer: 1500
  //       })
  //     }
  //   }, (err) => {
  //     
  //   });
  // }

  getintouch() {

    const param = this.user;
    const pageorgin = 'Contact Us Page';
    var cityID = '1';
    this.Service.addAboutCall(param, pageorgin, cityID).subscribe(success => {
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
        $('#modal-container').addClass('out');
        $('body').removeClass('modal-active');
        this.user.name = '';
        this.user.number = '';
        this.user.email = '';
        this.user.otp = '';
        $('#btn_reset').click();
      }else{

      }
     // this.user = success;
    });

  }
}
