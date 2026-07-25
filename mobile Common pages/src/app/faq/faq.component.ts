import {Component, HostListener, OnInit} from '@angular/core';
// import {  ServiceService } from '../Service.service';
import {Title, Meta} from '@angular/platform-browser';
// import { query } from '../innerblog/innerblog';
import { DataService } from '../data.service';
import {query} from '../buy/innerblog';

declare var $: any;
declare var swal: any;

declare var $: any;
@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {

  iconOne = true;
  iconTwo = true;
  iconThree = true;
  iconFour = true;
  iconFive = true;
  iconSix = true;
  iconSeven = true;
  iconEight = true;
  iconNine = true;
  iconTen = true;
  icon11 = true;
  icon12 = true;
  icon13 = true;
  icon14 = true;
  icon15 = true;
  icon16 = true;
  icon17 = true;
  icon18 = true;
  icon19 = true;
  icon20 = true;

  constructor(private titleService: Title,
              private meta: Meta,
              public Service: DataService) {
  }

  ngOnInit() {
    this.metatags();
    // this.semanticjquery();

  }
  @HostListener('touchstart', ['$event'])
  @HostListener('window:scroll', ['$event'])
  onWindowScrolls() {
      this.Service.mouseenterservice3();
  }
  metatags() {
    var PAGEID = '5';
    this.Service.getstaticmeta(PAGEID).subscribe(metatags => {
      this.titleService.setTitle(metatags['Pageseo'][0].page_title);
      this.meta.updateTag({name: 'description', content: metatags['Pageseo'][0].meta_description});
      this.meta.updateTag({property: 'og:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_mobile/images/og/faq.jpg'});
      this.meta.updateTag({property: 'og:title', content: metatags['Pageseo'][0].page_title});
      this.meta.updateTag({property: 'og:description', content: metatags['Pageseo'][0].meta_description});
      this.Service.createLinkForCanonicalURL();
    });
    import('../footer/footer.module').then(mod => mod.FooterModule).then(FooterModule =>{
      this.FooterComponent = FooterModule.components['lazy'];
      this.loaded = true;
    });
  }

  // semanticjquery() {
  //   $('.ui.dropdown').dropdown({});
  // }

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

  user = new query();


  getintouch(name, email, msg) {
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


    if ($('#email').val() === '') {
      $('#email').focus().css('border-color', 'red').attr('placeholder', 'Please Enter Email-id');
      return false;
    } else {
      const emaill = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
      if (emaill.test($('#email').val())) {
        $('#email').removeAttr('style');
      } else {
        $('#email').focus().css('border-color', 'red').attr('placeholder', 'Please enter valid email-id').val('');
        return false;
      }
    }
    swal({
      title: 'We Will Intimate you soon!',
      type: 'success',
      showConfirmButton: false,
      timer: 1500
    });
    this.Service.addFAQCallBack(name, email, msg).subscribe(user => {
      // this.user = user;
    });
    this.user.name = '';
    this.user.email = '';
    this.user.msg = '';
  }

  onIconOne() {
    if (this.iconOne === true) {
      this.iconOne = false;
      this.iconTwo = false;
      this.iconThree = true;
      this.iconFour = true;
      this.iconFive = true;
      this.iconSix = true;
      this.iconSeven = true;
      this.iconEight = true;
      this.iconNine = true;
      this.iconTen = true;
      this.icon11 = true;
      this.icon12 = true;
      this.icon13 = true;
      this.icon14 = true;
      this.icon15 = true;
      this.icon16 = true;
      this.icon17 = true;
      this.icon18 = true;
      this.icon19 = true;
      this.icon20 = true;
    } else if (this.iconOne === false) {
      this.iconOne = true;
      this.iconTwo = true;
      this.iconThree = true;
      this.iconFour = true;
      this.iconFive = true;
      this.iconSix = true;
      this.iconSeven = true;
      this.iconEight = true;
      this.iconNine = true;
      this.iconTen = true;
      this.icon11 = true;
      this.icon12 = true;
      this.icon13 = true;
      this.icon14 = true;
      this.icon15 = true;
      this.icon16 = true;
      this.icon17 = true;
      this.icon18 = true;
      this.icon19 = true;
      this.icon20 = true;
    }
  }
  onIconTwo() {
    if (this.iconTwo === true) {
      this.iconTwo = false;
      this.iconOne = false;
      this.iconThree = true;
      this.iconFour = true;
      this.iconFive = true;
      this.iconSix = true;
      this.iconSeven = true;
      this.iconEight = true;
      this.iconNine = true;
      this.iconTen = true;
      this.icon11 = true;
      this.icon12 = true;
      this.icon13 = true;
      this.icon14 = true;
      this.icon15 = true;
      this.icon16 = true;
      this.icon17 = true;
      this.icon18 = true;
      this.icon19 = true;
      this.icon20 = true;
    } else if (this.iconTwo === false) {
      this.iconTwo = true;
      this.iconOne = true;
      this.iconThree = true;
      this.iconFour = true;
      this.iconFive = true;
      this.iconSix = true;
      this.iconSeven = true;
      this.iconEight = true;
      this.iconNine = true;
      this.iconTen = true;
      this.icon11 = true;
      this.icon12 = true;
      this.icon13 = true;
      this.icon14 = true;
      this.icon15 = true;
      this.icon16 = true;
      this.icon17 = true;
      this.icon18 = true;
      this.icon19 = true;
      this.icon20 = true;
    }
  }
  onIconThree() {
    if (this.iconThree === true) {
      this.iconThree = false;
      this.iconTwo = true;
      this.iconOne = false;
      this.iconFour = true;
      this.iconFive = true;
      this.iconSix = true;
      this.iconSeven = true;
      this.iconEight = true;
      this.iconNine = true;
      this.iconTen = true;
      this.icon11 = true;
      this.icon12 = true;
      this.icon13 = true;
      this.icon14 = true;
      this.icon15 = true;
      this.icon16 = true;
      this.icon17 = true;
      this.icon18 = true;
      this.icon19 = true;
      this.icon20 = true;
    } else if (this.iconThree === false) {
      this.iconThree = true;
      this.iconTwo = true;
      this.iconOne = true;
      this.iconFour = true;
      this.iconFive = true;
      this.iconSix = true;
      this.iconSeven = true;
      this.iconEight = true;
      this.iconNine = true;
      this.iconTen = true;
      this.icon11 = true;
      this.icon12 = true;
      this.icon13 = true;
      this.icon14 = true;
      this.icon15 = true;
      this.icon16 = true;
      this.icon17 = true;
      this.icon18 = true;
      this.icon19 = true;
      this.icon20 = true;
    }
  }
  onIconFour() {
    if (this.iconFour === true) {
      this.iconFour = false;
      this.iconTwo = true;
      this.iconThree = true;
      this.iconOne = false;
      this.iconFive = true;
      this.iconSix = true;
      this.iconSeven = true;
      this.iconEight = true;
      this.iconNine = true;
      this.iconTen = true;
      this.icon11 = true;
      this.icon12 = true;
      this.icon13 = true;
      this.icon14 = true;
      this.icon15 = true;
      this.icon16 = true;
      this.icon17 = true;
      this.icon18 = true;
      this.icon19 = true;
      this.icon20 = true;
    } else if (this.iconFour === false) {
      this.iconFour = true;
      this.iconTwo = true;
      this.iconThree = true;
      this.iconOne = true;
      this.iconFive = true;
      this.iconSix = true;
      this.iconSeven = true;
      this.iconEight = true;
      this.iconNine = true;
      this.iconTen = true;
      this.icon11 = true;
      this.icon12 = true;
      this.icon13 = true;
      this.icon14 = true;
      this.icon15 = true;
      this.icon16 = true;
      this.icon17 = true;
      this.icon18 = true;
      this.icon19 = true;
      this.icon20 = true;
    }
  }
  onIconFive() {
    if (this.iconFive === true) {
      this.iconFive = false;
      this.iconTwo = true;
      this.iconThree = true;
      this.iconFour = true;
      this.iconOne = false;
      this.iconSix = true;
      this.iconSeven = true;
      this.iconEight = true;
      this.iconNine = true;
      this.iconTen = true;
      this.icon11 = true;
      this.icon12 = true;
      this.icon13 = true;
      this.icon14 = true;
      this.icon15 = true;
      this.icon16 = true;
      this.icon17 = true;
      this.icon18 = true;
      this.icon19 = true;
      this.icon20 = true;
    } else if (this.iconFive === false) {
      this.iconFive = true;
      this.iconTwo = true;
      this.iconThree = true;
      this.iconFour = true;
      this.iconOne = true;
      this.iconSix = true;
      this.iconSeven = true;
      this.iconEight = true;
      this.iconNine = true;
      this.iconTen = true;
      this.icon11 = true;
      this.icon12 = true;
      this.icon13 = true;
      this.icon14 = true;
      this.icon15 = true;
      this.icon16 = true;
      this.icon17 = true;
      this.icon18 = true;
      this.icon19 = true;
      this.icon20 = true;
    }
  }
  onIconSix() {
    if (this.iconSix === true) {
      this.iconSix = false;
      this.iconTwo = true;
      this.iconThree = true;
      this.iconFour = true;
      this.iconFive = true;
      this.iconOne = false;
      this.iconSeven = true;
      this.iconEight = true;
      this.iconNine = true;
      this.iconTen = true;
      this.icon11 = true;
      this.icon12 = true;
      this.icon13 = true;
      this.icon14 = true;
      this.icon15 = true;
      this.icon16 = true;
      this.icon17 = true;
      this.icon18 = true;
      this.icon19 = true;
      this.icon20 = true;
    } else if (this.iconSix === false) {
      this.iconSix = true;
      this.iconTwo = true;
      this.iconThree = true;
      this.iconFour = true;
      this.iconFive = true;
      this.iconOne = true;
      this.iconSeven = true;
      this.iconEight = true;
      this.iconNine = false;
      this.iconTen = true;
      this.icon11 = true;
      this.icon12 = true;
      this.icon13 = true;
      this.icon14 = true;
      this.icon15 = true;
      this.icon16 = true;
      this.icon17 = true;
      this.icon18 = true;
      this.icon19 = true;
      this.icon20 = true;
    }
  }
  onIconSeven() {
    if (this.iconSeven === true) {
      this.iconSeven = false;
      this.iconTwo = true;
      this.iconThree = true;
      this.iconFour = true;
      this.iconFive = true;
      this.iconSix = true;
      this.iconOne = false;
      this.iconEight = true;
      this.iconNine = true;
      this.iconTen = true;
      this.icon11 = true;
      this.icon12 = true;
      this.icon13 = true;
      this.icon14 = true;
      this.icon15 = true;
      this.icon16 = true;
      this.icon17 = true;
      this.icon18 = true;
      this.icon19 = true;
      this.icon20 = true;
    } else if (this.iconSeven === false) {
      this.iconSeven = true;
      this.iconTwo = true;
      this.iconThree = true;
      this.iconFour = true;
      this.iconFive = true;
      this.iconSix = true;
      this.iconOne = true;
      this.iconEight = true;
      this.iconNine = true;
      this.iconTen = true;
      this.icon11 = true;
      this.icon12 = true;
      this.icon13 = true;
      this.icon14 = true;
      this.icon15 = true;
      this.icon16 = true;
      this.icon17 = true;
      this.icon18 = true;
      this.icon19 = true;
      this.icon20 = true;
    }
  }
  onIconEight() {
    if (this.iconEight === true) {
      this.iconEight = false;
      this.iconTwo = true;
      this.iconThree = true;
      this.iconFour = true;
      this.iconFive = true;
      this.iconSix = true;
      this.iconSeven = true;
      this.iconOne = false;
      this.iconNine = true;
      this.iconTen = true;
      this.icon11 = true;
      this.icon12 = true;
      this.icon13 = true;
      this.icon14 = true;
      this.icon15 = true;
      this.icon16 = true;
      this.icon17 = true;
      this.icon18 = true;
      this.icon19 = true;
      this.icon20 = true;
    } else if (this.iconEight === false) {
      this.iconEight = true;
      this.iconTwo = true;
      this.iconThree = true;
      this.iconFour = true;
      this.iconFive = true;
      this.iconSix = true;
      this.iconSeven = true;
      this.iconOne = true;
      this.iconNine = true;
      this.iconTen = true;
      this.icon11 = true;
      this.icon12 = true;
      this.icon13 = true;
      this.icon14 = true;
      this.icon15 = true;
      this.icon16 = true;
      this.icon17 = true;
      this.icon18 = true;
      this.icon19 = true;
      this.icon20 = true;
    }
  }
  onIconNine() {
    if (this.iconNine === true) {
      this.iconNine = false;
      this.iconTwo = true;
      this.iconThree = true;
      this.iconFour = true;
      this.iconFive = true;
      this.iconSix = true;
      this.iconSeven = true;
      this.iconEight = true;
      this.iconOne = false;
      this.iconTen = true;
      this.icon11 = true;
      this.icon12 = true;
      this.icon13 = true;
      this.icon14 = true;
      this.icon15 = true;
      this.icon16 = true;
      this.icon17 = true;
      this.icon18 = true;
      this.icon19 = true;
      this.icon20 = true;
    } else if (this.iconNine === false) {
      this.iconNine = true;
      this.iconTwo = true;
      this.iconThree = true;
      this.iconFour = true;
      this.iconFive = true;
      this.iconSix = true;
      this.iconSeven = true;
      this.iconEight = true;
      this.iconOne = true;
      this.iconTen = true;
      this.icon11 = true;
      this.icon12 = true;
      this.icon13 = true;
      this.icon14 = true;
      this.icon15 = true;
      this.icon16 = true;
      this.icon17 = true;
      this.icon18 = true;
      this.icon19 = true;
      this.icon20 = true;
    }
  }
  onIconTen() {
    if (this.iconTen === true) {
      this.iconNine = true;
      this.iconTwo = true;
      this.iconThree = true;
      this.iconFour = true;
      this.iconFive = true;
      this.iconSix = true;
      this.iconSeven = true;
      this.iconEight = true;
      this.iconOne = false;
      this.iconTen = false;
      this.icon11 = true;
      this.icon12 = true;
      this.icon13 = true;
      this.icon14 = true;
      this.icon15 = true;
      this.icon16 = true;
      this.icon17 = true;
      this.icon18 = true;
      this.icon19 = true;
      this.icon20 = true;
    } else if (this.iconTen === false) {
      this.iconNine = true;
      this.iconTwo = true;
      this.iconThree = true;
      this.iconFour = true;
      this.iconFive = true;
      this.iconSix = true;
      this.iconSeven = true;
      this.iconEight = true;
      this.iconOne = true;
      this.iconTen = true;
      this.icon11 = true;
      this.icon12 = true;
      this.icon13 = true;
      this.icon14 = true;
      this.icon15 = true;
      this.icon16 = true;
      this.icon17 = true;
      this.icon18 = true;
      this.icon19 = true;
      this.icon20 = true;
    }
  }
  onIcon11() {
    if (this.icon11 === true) {
      this.iconNine = true;
      this.iconTwo = true;
      this.iconThree = true;
      this.iconFour = true;
      this.iconFive = true;
      this.iconSix = true;
      this.iconSeven = true;
      this.iconEight = true;
      this.iconOne = false;
      this.iconTen = true;
      this.icon11 = false;
      this.icon12 = true;
      this.icon13 = true;
      this.icon14 = true;
      this.icon15 = true;
      this.icon16 = true;
      this.icon17 = true;
      this.icon18 = true;
      this.icon19 = true;
      this.icon20 = true;
    } else if (this.icon11 === false) {
      this.iconNine = true;
      this.iconTwo = true;
      this.iconThree = true;
      this.iconFour = true;
      this.iconFive = true;
      this.iconSix = true;
      this.iconSeven = true;
      this.iconEight = true;
      this.iconOne = true;
      this.iconTen = true;
      this.icon11 = true;
      this.icon12 = true;
      this.icon13 = true;
      this.icon14 = true;
      this.icon15 = true;
      this.icon16 = true;
      this.icon17 = true;
      this.icon18 = true;
      this.icon19 = true;
      this.icon20 = true;
    }
  }
  onIcon12() {
    if (this.icon12 === true) {
      this.iconNine = true;
      this.iconTwo = true;
      this.iconThree = true;
      this.iconFour = true;
      this.iconFive = true;
      this.iconSix = true;
      this.iconSeven = true;
      this.iconEight = true;
      this.iconOne = false;
      this.iconTen = true;
      this.icon11 = true;
      this.icon12 = false;
      this.icon13 = true;
      this.icon14 = true;
      this.icon15 = true;
      this.icon16 = true;
      this.icon17 = true;
      this.icon18 = true;
      this.icon19 = true;
      this.icon20 = true;
    } else if (this.icon12 === false) {
      this.iconNine = true;
      this.iconTwo = true;
      this.iconThree = true;
      this.iconFour = true;
      this.iconFive = true;
      this.iconSix = true;
      this.iconSeven = true;
      this.iconEight = true;
      this.iconOne = true;
      this.iconTen = true;
      this.icon11 = true;
      this.icon12 = true;
      this.icon13 = true;
      this.icon14 = true;
      this.icon15 = true;
      this.icon16 = true;
      this.icon17 = true;
      this.icon18 = true;
      this.icon19 = true;
      this.icon20 = true;
    }
  }
  onIcon13() {
    if (this.icon13 === true) {
      this.iconNine = true;
      this.iconTwo = true;
      this.iconThree = true;
      this.iconFour = true;
      this.iconFive = true;
      this.iconSix = true;
      this.iconSeven = true;
      this.iconEight = true;
      this.iconOne = false;
      this.iconTen = true;
      this.icon11 = true;
      this.icon12 = true;
      this.icon13 = false;
      this.icon14 = true;
      this.icon15 = true;
      this.icon16 = true;
      this.icon17 = true;
      this.icon18 = true;
      this.icon19 = true;
      this.icon20 = true;
    } else if (this.icon13 === false) {
      this.iconNine = true;
      this.iconTwo = true;
      this.iconThree = true;
      this.iconFour = true;
      this.iconFive = true;
      this.iconSix = true;
      this.iconSeven = true;
      this.iconEight = true;
      this.iconOne = true;
      this.iconTen = true;
      this.icon11 = true;
      this.icon12 = true;
      this.icon13 = true;
      this.icon14 = true;
      this.icon15 = true;
      this.icon16 = true;
      this.icon17 = true;
      this.icon18 = true;
      this.icon19 = true;
      this.icon20 = true;
    }
  }
  onIcon14() {
    if (this.icon14 === true) {
      this.iconNine = true;
      this.iconTwo = true;
      this.iconThree = true;
      this.iconFour = true;
      this.iconFive = true;
      this.iconSix = true;
      this.iconSeven = true;
      this.iconEight = true;
      this.iconOne = false;
      this.iconTen = true;
      this.icon11 = true;
      this.icon12 = true;
      this.icon13 = true;
      this.icon14 = false;
      this.icon15 = true;
      this.icon16 = true;
      this.icon17 = true;
      this.icon18 = true;
      this.icon19 = true;
      this.icon20 = true;
    } else if (this.icon14 === false) {
      this.iconNine = true;
      this.iconTwo = true;
      this.iconThree = true;
      this.iconFour = true;
      this.iconFive = true;
      this.iconSix = true;
      this.iconSeven = true;
      this.iconEight = true;
      this.iconOne = true;
      this.iconTen = true;
      this.icon11 = true;
      this.icon12 = true;
      this.icon13 = true;
      this.icon14 = true;
      this.icon15 = true;
      this.icon16 = true;
      this.icon17 = true;
      this.icon18 = true;
      this.icon19 = true;
      this.icon20 = true;
    }
  }
  onIcon15() {
    if (this.icon15 === true) {
      this.iconNine = true;
      this.iconTwo = true;
      this.iconThree = true;
      this.iconFour = true;
      this.iconFive = true;
      this.iconSix = true;
      this.iconSeven = true;
      this.iconEight = true;
      this.iconOne = false;
      this.iconTen = true;
      this.icon11 = true;
      this.icon12 = true;
      this.icon13 = true;
      this.icon14 = true;
      this.icon15 = false;
      this.icon16 = true;
      this.icon17 = true;
      this.icon18 = true;
      this.icon19 = true;
      this.icon20 = true;
    } else if (this.icon15 === false) {
      this.iconNine = true;
      this.iconTwo = true;
      this.iconThree = true;
      this.iconFour = true;
      this.iconFive = true;
      this.iconSix = true;
      this.iconSeven = true;
      this.iconEight = true;
      this.iconOne = true;
      this.iconTen = true;
      this.icon11 = true;
      this.icon12 = true;
      this.icon13 = true;
      this.icon14 = true;
      this.icon15 = true;
      this.icon16 = true;
      this.icon17 = true;
      this.icon18 = true;
      this.icon19 = true;
      this.icon20 = true;
    }
  }
  onIcon16() {
    if (this.icon16 === true) {
      this.iconNine = true;
      this.iconTwo = true;
      this.iconThree = true;
      this.iconFour = true;
      this.iconFive = true;
      this.iconSix = true;
      this.iconSeven = true;
      this.iconEight = true;
      this.iconOne = false;
      this.iconTen = true;
      this.icon11 = true;
      this.icon12 = true;
      this.icon13 = true;
      this.icon14 = true;
      this.icon15 = true;
      this.icon16 = false;
      this.icon17 = true;
      this.icon18 = true;
      this.icon19 = true;
      this.icon20 = true;
    } else if (this.icon16 === false) {
      this.iconNine = true;
      this.iconTwo = true;
      this.iconThree = true;
      this.iconFour = true;
      this.iconFive = true;
      this.iconSix = true;
      this.iconSeven = true;
      this.iconEight = true;
      this.iconOne = true;
      this.iconTen = true;
      this.icon11 = true;
      this.icon12 = true;
      this.icon13 = true;
      this.icon14 = true;
      this.icon15 = true;
      this.icon16 = true;
      this.icon17 = true;
      this.icon18 = true;
      this.icon19 = true;
      this.icon20 = true;
    }
  }
  onIcon17() {
    if (this.icon17 === true) {
      this.iconNine = true;
      this.iconTwo = true;
      this.iconThree = true;
      this.iconFour = true;
      this.iconFive = true;
      this.iconSix = true;
      this.iconSeven = true;
      this.iconEight = true;
      this.iconOne = false;
      this.iconTen = true;
      this.icon11 = true;
      this.icon12 = true;
      this.icon13 = true;
      this.icon14 = true;
      this.icon15 = true;
      this.icon16 = true;
      this.icon17 = false;
      this.icon18 = true;
      this.icon19 = true;
      this.icon20 = true;
    } else if (this.icon17 === false) {
      this.iconNine = true;
      this.iconTwo = true;
      this.iconThree = true;
      this.iconFour = true;
      this.iconFive = true;
      this.iconSix = true;
      this.iconSeven = true;
      this.iconEight = true;
      this.iconOne = true;
      this.iconTen = true;
      this.icon11 = true;
      this.icon12 = true;
      this.icon13 = true;
      this.icon14 = true;
      this.icon15 = true;
      this.icon16 = true;
      this.icon17 = true;
      this.icon18 = true;
      this.icon19 = true;
      this.icon20 = true;
    }
  }
  onIcon18() {
    if (this.icon18 === true) {
      this.iconNine = true;
      this.iconTwo = true;
      this.iconThree = true;
      this.iconFour = true;
      this.iconFive = true;
      this.iconSix = true;
      this.iconSeven = true;
      this.iconEight = true;
      this.iconOne = false;
      this.iconTen = true;
      this.icon11 = true;
      this.icon12 = true;
      this.icon13 = true;
      this.icon14 = true;
      this.icon15 = true;
      this.icon16 = true;
      this.icon17 = true;
      this.icon18 = false;
      this.icon19 = true;
      this.icon20 = true;
    } else if (this.icon17 === false) {
      this.iconNine = true;
      this.iconTwo = true;
      this.iconThree = true;
      this.iconFour = true;
      this.iconFive = true;
      this.iconSix = true;
      this.iconSeven = true;
      this.iconEight = true;
      this.iconOne = true;
      this.iconTen = true;
      this.icon11 = true;
      this.icon12 = true;
      this.icon13 = true;
      this.icon14 = true;
      this.icon15 = true;
      this.icon16 = true;
      this.icon17 = true;
      this.icon18 = true;
      this.icon19 = true;
      this.icon20 = true;
    }
  }
  onIcon19() {
    if (this.icon19 === true) {
      this.iconNine = true;
      this.iconTwo = true;
      this.iconThree = true;
      this.iconFour = true;
      this.iconFive = true;
      this.iconSix = true;
      this.iconSeven = true;
      this.iconEight = true;
      this.iconOne = false;
      this.iconTen = true;
      this.icon11 = true;
      this.icon12 = true;
      this.icon13 = true;
      this.icon14 = true;
      this.icon15 = true;
      this.icon16 = true;
      this.icon17 = true;
      this.icon18 = true;
      this.icon19 = false;
      this.icon20 = true;
    } else if (this.icon19 === false) {
      this.iconNine = true;
      this.iconTwo = true;
      this.iconThree = true;
      this.iconFour = true;
      this.iconFive = true;
      this.iconSix = true;
      this.iconSeven = true;
      this.iconEight = true;
      this.iconOne = true;
      this.iconTen = true;
      this.icon11 = true;
      this.icon12 = true;
      this.icon13 = true;
      this.icon14 = true;
      this.icon15 = true;
      this.icon16 = true;
      this.icon17 = true;
      this.icon18 = true;
      this.icon19 = true;
      this.icon20 = true;
    }
  }
  onIcon20() {
    if (this.icon20 === true) {
      this.iconNine = true;
      this.iconTwo = true;
      this.iconThree = true;
      this.iconFour = true;
      this.iconFive = true;
      this.iconSix = true;
      this.iconSeven = true;
      this.iconEight = true;
      this.iconOne = false;
      this.iconTen = true;
      this.icon11 = true;
      this.icon12 = true;
      this.icon13 = true;
      this.icon14 = true;
      this.icon15 = true;
      this.icon16 = true;
      this.icon17 = true;
      this.icon18 = true;
      this.icon19 = true;
      this.icon20 = false;
    } else if (this.icon20 === false) {
      this.iconNine = true;
      this.iconTwo = true;
      this.iconThree = true;
      this.iconFour = true;
      this.iconFive = true;
      this.iconSix = true;
      this.iconSeven = true;
      this.iconEight = true;
      this.iconOne = true;
      this.iconTen = true;
      this.icon11 = true;
      this.icon12 = true;
      this.icon13 = true;
      this.icon14 = true;
      this.icon15 = true;
      this.icon16 = true;
      this.icon17 = true;
      this.icon18 = true;
      this.icon19 = true;
      this.icon20 = true;
    }
  }
}
