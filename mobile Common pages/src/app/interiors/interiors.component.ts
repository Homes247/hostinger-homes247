import {Component, OnInit, HostListener, Inject} from '@angular/core';
import {WINDOW} from '@ng-toolkit/universal';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Title, Meta} from '@angular/platform-browser';
import {ChartType} from 'chart.js';
import {DataService} from '../data.service';
import {query} from '../buy/innerblog';
import {emiloan} from '../emi/class';
declare var $: any;
declare var swal: any;

declare var $: any;
@Component({
  selector: 'app-interiors',
  templateUrl: './interiors.component.html',
  styleUrls: ['./interiors.component.css']
})
export class InteriorsComponent implements OnInit {

  public doughnutChartType: ChartType = 'doughnut';

  constructor(private titleService: Title,
              private meta: Meta, private router: Router, public Service: DataService,
              @Inject(WINDOW) private window: Window) {
    this.router.events.subscribe((evt) => {
      // trick the Router into believing it's last link wasn't previously loaded
      this.router.navigated = false;
      // if you need to scroll back to top, here is the right place
      window.scrollTo(0, 0);
    });
  }

  ngOnInit() {
    this.metatags();
    this.emidefault();
    this.chartload();
    import('../footer/footer.module').then(mod => mod.FooterModule).then(FooterModule => {
      this.FooterComponent = FooterModule.components['lazy'];
      this.loaded = true;
    });
  }

  metatags() {
    const PAGEID = '11';
    this.Service.getstaticmeta(PAGEID).subscribe(metatags => {
      this.titleService.setTitle(metatags['Pageseo'][0].page_title);
      this.meta.updateTag({name: 'description', content: metatags['Pageseo'][0].meta_description});
      this.meta.updateTag({name: 'keywords', content: metatags['Pageseo'][0].meta_keywords});
      this.meta.updateTag({property: 'og:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_mobile/images/og/home.png'});
      this.meta.updateTag({property: 'og:title', content: metatags['Pageseo'][0].page_title});
      this.meta.updateTag({property: 'og:description', content: metatags['Pageseo'][0].meta_description});
      this.Service.createLinkForCanonicalURL();
    });
  }

  loaded = false;
  FooterComponent: any;
  FloatContact:any;
  innerheader:any;
  
  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    // 
    let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    let max = document.documentElement.scrollHeight;
    if (pos == max) {
  
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

  toggleBtn = false;

  ShowHide() {
    this.toggleBtn = this.toggleBtn ? false : true;
  }

  user = new query();

  letus(namee, mobilenoo, emaill, msg) 
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

    swal({
      title: 'We Will Intimate you soon!',
      type: 'success',
      showConfirmButton: false,
      timer: 1500
    });
    var cityid = '1';
    this.Service.addquery(namee, mobilenoo, emaill, msg, cityid).subscribe((success) => {
      // this.user = success;
    }, (err) => {
      
    });
    this.user.namee = '';
    this.user.mobilenoo = '';
    this.user.emaill = '';
    this.user.msg = '';
  }

  emi = new emiloan();
  monthlyAmount: any;
  interestpayable: any;
  totalAmount: any;
  doughnutChartLabels: any;
  doughnutChartData: any;
  chartColors: any;
  chartOptions: any;

  numericOnly(event): boolean {
    let patt = /^([0-9])$/;
    let result = patt.test(event.key);
    return result;
  }

  emidefault() {
    this.emi.interest = '0';
    this.emi.years = '0';
    this.emi.amount = '0';
    this.totalAmount = '0';
    this.interestpayable = '0';
    this.monthlyAmount = '0';
  }

  chartload() {
    this.doughnutChartLabels = ['Interest', 'Principal'];
    this.chartColors = [{backgroundColor: ['#080808', 'rgba(151,27,71,.8117647058823529)']}];
    this.doughnutChartData = [[0, 9999999],];
    this.chartOptions = {cutoutPercentage: 70};
  };

  getrate() {
    if ($('#loanamount').val() == '0') {
      $('#loanamount').focus().css('border-color', 'red');
      return false;
    } else {
      $('#loanamount').removeAttr('style');
    }
    if ($('#loanyears').val() == '0') {
      $('#loanyears').focus().css('border-color', 'red');
      return false;
    } else {
      $('#loanyears').removeAttr('style');
    }
    if ($('#loaninterest').val() == '0') {
      $('#loaninterest').focus().css('border-color', 'red');
      return false;
    } else {
      $('#loaninterest').removeAttr('style');
    }

    var emiparam = this.emi;
    var loanamt = emiparam.amount;
    var intrest = emiparam.interest;
    var repaytrm = emiparam.years * 12;
    //EMI calculation logic
    var rate1 = (parseFloat(intrest) / 100) / 12;
    var rate = 1 + rate1;
    var interestRate = Math.pow(rate, repaytrm);
    var E1 = loanamt * rate1 * interestRate;
    var E2 = interestRate - 1;
    var EMI = (E1 / E2);
    var total_payable = EMI * repaytrm;
    var total_interest = (total_payable - loanamt);
    //Values to display
    this.monthlyAmount = display2Decimals(EMI);
    this.interestpayable = display2Decimals(total_interest);
    this.totalAmount = display2Decimals(total_payable);

    function display2Decimals(x) {
      return Number(parseFloat(x)).toFixed(2);
    }

    this.doughnutChartData = [
      [total_interest, emiparam.amount],
    ];

  }


}

