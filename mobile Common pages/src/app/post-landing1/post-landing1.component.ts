import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Meta, Title} from '@angular/platform-browser';
import { DataService } from '../data.service';
declare var $: any;
declare var swal: any;
declare var $: any;
@Component({
  selector: 'app-post-landing1',
  templateUrl: './post-landing1.component.html',
  styleUrls: ['./post-landing1.component.css']
})
export class PostLanding1Component implements OnInit {

  loginDropDownOpen = false;
  profileDropDownOpen = false;
  submitted = false;
  EnquiryForm: FormGroup;
  otploader = false;
  LoginId: string;
  userID: string;
  constructor( @Inject(PLATFORM_ID) private readonly platformId: Object,
               private Service: DataService,private titleService: Title,
               private meta: Meta,
               private fb: FormBuilder) {
    if (isPlatformBrowser(this.platformId)) {
      const node: any = document.createElement('link');
      node.href = 'https://fonts.googleapis.com/css2?family=Stick+No+Bills&display=swap';
      node.rel = 'stylesheet';
      node.async = true;
      document.getElementsByTagName('head')[0].appendChild(node);

      const node2: any = document.createElement('link');
      node2.href = 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css';
      node2.rel = 'stylesheet';
      node2.async = true;
      document.getElementsByTagName('head')[0].appendChild(node2);
    }
  }

  ngOnInit(): void {
    this.metatags();
    this.EnquiryForm = this.fb.group({
      Name: ['', [Validators.required]],
      Email: ['', [Validators.required]],
      Number: ['', [Validators.required]],
    });
    this.LoginId = localStorage.getItem('loginID');
    this.userID = localStorage.getItem("userID");
    if (this.LoginId === null) {
      this.loginDropDownOpen = true;
    } else if (this.LoginId === '1') {
      this.profileDropDownOpen = true;
    }
    const scrollElements = document.querySelectorAll('.js-scroll');

    const elementInView = (el, dividend = 1) => {
      const elementTop = el.getBoundingClientRect().top;

      return (
        elementTop <=
        (window.innerHeight || document.documentElement.clientHeight) / dividend
      );
    };

    const elementOutofView = (el) => {
      const elementTop = el.getBoundingClientRect().top;

      return (
        elementTop > (window.innerHeight || document.documentElement.clientHeight)
      );
    };

    const displayScrollElement = (element) => {
      element.classList.add('scrolled');
    };

    const hideScrollElement = (element) => {
      element.classList.remove('scrolled');
    };

    const handleScrollAnimation = () => {
      scrollElements.forEach((el) => {
        if (elementInView(el, 1.25)) {
          displayScrollElement(el);
        } else if (elementOutofView(el)) {
          hideScrollElement(el);
        }
      });
    };

    window.addEventListener('scroll', () => {
      handleScrollAnimation();
    });
  }

  metatags() {
    this.titleService.setTitle('Free Classified Ads Posting Sites : Sell or Rent | Homes247.in');
    this.meta.updateTag({
      name: 'description',
      content: "Free Property Listings India: Homes247.in Connects You with Buyers and Tenants . Post your property ads in our free classified ads page and get maximum exposure."
    });
    this.Service.createLinkForCanonicalURL();
    // const PAGEID = '39';
    // this.Service.getstaticmeta(PAGEID).subscribe(metatags => {
    //   this.titleService.setTitle(metatags['Pageseo'][0].page_title);
    //   this.meta.updateTag({name: 'description', content: metatags['Pageseo'][0].meta_description});
    //   this.meta.updateTag({property: 'og:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_mobile/images/og/about.jpg'});
    //   this.meta.updateTag({property: 'og:title', content: metatags['Pageseo'][0].page_title});
    //   this.meta.updateTag({property: 'og:description', content: metatags['Pageseo'][0].meta_description});
    //   this.Service.createLinkForCanonicalURL();
    // });
  }

  getMoreDetails() {
    if ($('#ename').val() === '') {
      $('#ename').focus().css('border-color', 'red').attr('placeholder', 'Please Enter Name');
      return false;
    } else {
      var enameFilter = /^([a-zA-Z]+\s)*[a-zA-Z]+$/;
      if (enameFilter.test($('#ename').val())) {
        $('#ename').removeAttr('style');
      } else {
        $('#ename').focus().css('border-color', 'red').attr('placeholder', 'Please enter valid name').val('');
        return false;
      }
    }
    if ($('#email1').val() == '') {
      $('#email1').focus().css('border-color', 'red').attr('placeholder', 'Please Enter Email-id');
      return false;
    } else {
      var emaill = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
      if (emaill.test($('#email1').val())) {
        $('#email1').removeAttr('style');
      } else {
        $('#email1').focus().css('border-color', 'red').attr('placeholder', 'Please enter valid email-id').val('');
        return false;
      }
    }

    if ($('#emobile').val() === '') {
      $('#emobile').focus().css('border-color', 'red').attr('placeholder', 'Please Enter Phone Number');
      return false;
    } else {
      var emobileno = /^[0-9]{10}$/;
      if (emobileno.test($('#emobile').val())) {
        $('#emobile').removeAttr('style');
      } else {
        $('#emobile').focus().css('border-color', 'red').attr('placeholder', 'Please enter valid contact number').val('');
        return false;
      }
    }
    if (this.EnquiryForm.invalid) {
      return;
    } else if (this.EnquiryForm.valid) {
      this.otploader = true;
      const name = this.EnquiryForm.value.Name;
      const email = this.EnquiryForm.value.Email;
      const number = this.EnquiryForm.value.Number;
      this.Service.landingEnquiry(name, email, number).subscribe(responce => {
        if (responce['message'] === 'successfully added') {
          this.otploader = false;
          this.EnquiryForm.setValue({Name: '', Email: '', Number: ''});
          swal({
            title: 'Post Property Enquiry',
            text: 'We have received your Enquiry, As soon as possible our Agent will touch with you!',
            type: 'success',
            icon: 'success',
            showConfirmButton: false,
            timer: 2500
          });

        }
      });
    }
  }
}
