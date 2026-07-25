import {Component, HostListener, OnInit} from '@angular/core';
import {Location} from '@angular/common';
// import {ServiceService} from '../Service.service';
import {Params, Router, ActivatedRoute} from '@angular/router';
import {Title, Meta} from '@angular/platform-browser';
import {Pipe, PipeTransform} from '@angular/core';
import { DataService } from '../data.service';
import {query} from '../buy/innerblog';
// import {query} from '../innerblog/innerblog';

declare var $: any;
declare var swal: any;

declare var $: any;
@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.css']
})
export class PrivacyComponent implements OnInit {

  constructor(private titleService: Title,
              private meta: Meta,
              private router: Router,
              private _location: Location,
              public Service: DataService,
              private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.metatags();
    // this.semanticjquery();
  }

  metatags() {
    var PAGEID = '6';
    this.Service.getstaticmeta(PAGEID).subscribe(metatags => {
      this.titleService.setTitle(metatags['Pageseo'][0].page_title);
      this.meta.updateTag({name: 'description', content: metatags['Pageseo'][0].meta_description});
      this.meta.updateTag({property: 'og:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_mobile/images/og/privacy.jpg'});
      this.meta.updateTag({property: 'og:title', content: metatags['Pageseo'][0].page_title});
      this.meta.updateTag({property: 'og:description', content: metatags['Pageseo'][0].meta_description});
      this.Service.createLinkForCanonicalURL();
    });
    import('../footer/footer.module').then(mod => mod.FooterModule).then(FooterModule =>{
      this.FooterComponent = FooterModule.components['lazy'];
      this.loaded = true;
    });
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
  
    }

    import('../float-contact/float-contact.module').then(mod => mod.FloatContactComponentModule).then(FloatContactComponentModule => {
      this.FloatContact = FloatContactComponentModule.components['lazy'];
      this.loaded = true;
    });
    // import('../innerheader/innerheader.module').then(mod => mod.InnerHeaderModule).then(InnerHeaderModule => {
    //   this.innerheader = InnerHeaderModule.components['lazy'];
    //   this.loaded = true;
    // });
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

  user = new query();

  letus(namee, mobilenoo, emaill, msg) {
    if ($('#namee').val() == '') {
      $('#namee').focus().css('border-color', 'red').attr('placeholder', 'Please Enter Name');
      return false;
    } else {
      var nameFilter = /^([a-zA-Z]+\s)*[a-zA-Z]+$/;
      if (nameFilter.test($('#namee').val())) {
        $('#namee').removeAttr('style');
      } else {
        $('#namee').focus().css('border-color', 'red').attr('placeholder', 'Please enter valid name').val('');
        return false;
      }
    }

    if ($('#mobilenoo').val() == '') {
      $('#mobilenoo').focus().css('border-color', 'red').attr('placeholder', 'Please Enter Phone Number');
      return false;
    } else {
      var mobileno = /^[0-9]{10}$/;
      if (mobileno.test($('#mobilenoo').val())) {
        $('#mobilenoo').removeAttr('style');
      } else {
        $('#mobilenoo').focus().css('border-color', 'red').attr('placeholder', 'Please enter valid contact number').val('');
        return false;
      }
    }

    if ($('#emaill').val() == '') {
      $('#emaill').focus().css('border-color', 'red').attr('placeholder', 'Please Enter Email-id');
      return false;
    } else {
      var email = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
      if (email.test($('#emaill').val())) {
        $('#emaill').removeAttr('style');
      } else {
        $('#emaill').focus().css('border-color', 'red').attr('placeholder', 'Please enter valid email-id').val('');
        return false;
      }
    }
    swal({
      title: 'We Will Intimate you soon!',
      type: 'success',
      showConfirmButton: false,
      timer: 1500
    });
    var cityid = '1';
    this.Service.addquery(namee, mobilenoo, emaill, msg, cityid).subscribe(user => {
      // this.user = user;
    });
    this.user.namee = '';
    this.user.mobilenoo = '';
    this.user.emaill = '';
    this.user.msg = '';
  }


}
