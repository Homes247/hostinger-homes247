import { Component, HostListener, OnInit } from '@angular/core';
import { AllindiaService } from '../allindia.service';

declare var $: any;
declare var swal: any;

declare var $: any;
@Component({
  selector: 'app-all-india-sidenavbar',
  templateUrl: './all-india-sidenavbar.component.html',
  styleUrls: ['./all-india-sidenavbar.component.css']
})
export class AllIndiaSidenavbarComponent implements OnInit {

  citiess: any;
  currentCitySearchNav;
  loginshow = true;
  userlogin = false;
  uploads: any;
  majorcities: any;
  trending: any;
  handpicked:any;
  launched:any;
  currentCity = 'Select City';
  Autocomplete:any;
  loaded = false;

  constructor(
    private allindia :AllindiaService,
  ) { }
  Mousemovement:boolean=false;
 
  // @HostListener('touchstart', ['$event'])
  // @HostListener('touchmove', ['$event'])
  // @HostListener('touchend', ['$event'])
  // @HostListener('touchcancel', ['$event'])
  // handleTouch(event) {
  //   import('../ejs-autocomplete/ejs-autocomplete-module').then(mod => mod.EjsAutocompleteModule).then(EjsAutocompletModule => {
  //     this.Autocomplete = EjsAutocompletModule.components['lazy'];
  //     this.loaded = true;
  //   });
  // }
  ngOnInit(): void {
    this.Login();
    this.semanticjquery();
    this.allindia.getlocationlist().subscribe((city: any[]) => {
      this.citiess = city['locations'];
    });
    this.allindia.getmajorrecentupdatelist().subscribe((recents: any[]) => {
      this.uploads = recents['recentproperties'];
    });
    this.allindia.getmajorcities().subscribe((majorcity: any[]) => {
      this.majorcities = majorcity['locations'];
    });
    // this.allindia.gettrendingprojects().subscribe((trend: any[]) => {
    //   this.trending = trend['Trending'];
    // });
    // this.allindia.getpriorityprojects().subscribe((prior: any[]) => {
    //   this.handpicked = prior['Priority'];
    // });
    // this.allindia.getnewprojects().subscribe((launch: any[]) => {
    //   this.launched = launch['Newprojects'];
    // });
    $('.trigger_button').click(function(e){
      e.stopPropagation();
      $('.dropdown-toggle').dropdown('toggle');
    });

  }
  
openFixedNav() {
    document.getElementById('FixedmySidenavs').style.width = '250px';
}
closeFixedNav() {
  document.getElementById('FixedmySidenavs').style.width = '0';
}
clickNavopen() {
  document.getElementById('mySidenavs').style.width = '250px';
}
clickNavclose() {
  document.getElementById('mySidenavs').style.width = '0';
}
IsVisible = false;
ShowHide_More() {
  this.IsVisible = this.IsVisible ? false : true;
}
tran(n) {
  $("div[data-page="+n+"]").removeClass("closed").addClass("open");
  $("div.open[data-page!="+n+"]").removeClass("open").addClass("closed");
}
semanticjquery() {
  $('.ui.dropdown').dropdown({});
  var windowWidth = $(window).width();
  $(window).scroll(function() {
    if ($(this).scrollTop() > 250) {
      $('#homepge_nav').addClass('hme_back');
      $('#refer_li').addClass('scroll_offer');
      $('#refer_li').removeClass('refer_earn');
      $('#top_right').removeClass('top_row_right2');
      $('#top_right').addClass('top_row_right');
      $('#brgr_white').hide();
      $('#brgr_ash').show();

    }
    if ($(this).scrollTop() < 250) {
      $('#homepge_nav').removeClass('hme_back');
      $('#refer_li').removeClass('scroll_offer');
      $('#refer_li').addClass('refer_earn');
      $('#top_right').removeClass('top_row_right');
      $('#top_right').addClass('top_row_right2');
      $('#brgr_white').show();
      $('#brgr_ash').hide();
    }
    if (windowWidth <= 480) {
      if ($(this).scrollTop() > 250) {

      }
      if ($(this).scrollTop() < 250) {

      }
    }
    if ($(this).scrollTop() > 140) {
      $('.fixed_section_main').css('display', 'block');
      $('.fixed_section_main').addClass('fixed_search');
    } else {
      $('.fixed_section_main').css('display', 'none');
    }
  });

  $(document).ready(function() {
    // Add smooth scrolling on all links inside the navbar
    $('#myNavbar a').on('click', function(event) {
      // Make sure this.hash has a value before overriding default behavior
      if (this.hash !== '') {
        // Prevent default anchor click behavior
        event.preventDefault();

        // Store hash
        var hash = this.hash;

        // Using jQuery's animate() method to add smooth page scroll
        // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
        $('html, body').animate({
          scrollTop: $(hash).offset().top
        }, 800, function() {

          // Add hash (#) to URL when done scrolling (default click behavior)
          window.location.hash = hash;
        });
      }  // End if
    });

    $('#myNavbar2 a').on('click', function(event) {
      // Make sure this.hash has a value before overriding default behavior
      if (this.hash !== '') {
        // Prevent default anchor click behavior
        event.preventDefault();

        // Store hash
        var hash = this.hash;

        // Using jQuery's animate() method to add smooth page scroll
        // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
        $('html, body').animate({
          scrollTop: $(hash).offset().top
        }, 800, function() {

          // Add hash (#) to URL when done scrolling (default click behavior)
          window.location.hash = hash;
        });
      }  // End if
    });

    $('#myNavbarpages a').on('click', function(event) {
      // Make sure this.hash has a value before overriding default behavior
      if (this.hash !== '') {
        // Prevent default anchor click behavior
        event.preventDefault();

        // Store hash
        var hash = this.hash;

        // Using jQuery's animate() method to add smooth page scroll
        // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
        $('html, body').animate({
          scrollTop: $(hash).offset().top
        }, 800, function() {

          // Add hash (#) to URL when done scrolling (default click behavior)
          window.location.hash = hash;
        });
      }  // End if
    });
  });
}
getcityname(event) {
  var city = event.target.value;
  this.allindia.getlocationlist().subscribe((citynam: any[]) => {
    this.citiess = citynam['locations'];
    for (let i = 0; i <= this.citiess.length; i++) {
      try {
        if (city == this.citiess[i].city) {
          var cityid = this.citiess[i].id;
          // this.getclickAuto();
        }
      } catch (e) {
      }
    }
  });
  this.currentCitySearchNav = localStorage.getItem('CityName').toLocaleLowerCase();
}
ngAfterViewInit(): void {
  $('.ui.dropdown').dropdown({});
}
username : any;
UserId : any;
Login(){
  const loginid = localStorage.getItem('loginID');
  const username = localStorage.getItem("userName");
  const userid = localStorage.getItem("userID");
  if(loginid === '1'){
  this.userlogin = true;
  this.loginshow = false;
  this.username = username;
  this.UserId = userid;
  }
}
  showhide(){
    if ($('#fixed-accordion').css('visibility') == 'hidden')
      $('#fixed-accordion').css('visibility','visible');
    else
      $('#fixed-accordion').css('visibility','hidden');
}
accordianshow(){
  $(function() {416.
    var Accordion = function(el, multiple) {
      this.el = el || {};
      this.multiple = multiple || false;
  
      // Variables privadas
      var links = this.el.find('.link');
      // Evento
      links.on('click', {el: this.el, multiple: this.multiple}, this.dropdown)
    }
    Accordion.prototype.dropdown = function(e) {
      var $el = e.data.el;
        const $this = $(this),
        $next = $this.next();
  
      $next.slideToggle();
      $this.parent().toggleClass('open');
  
      if (!e.data.multiple) {
        $el.find('.submenu').not($next).slideUp().parent().removeClass('open');
      };
    }	
    var accordion = new Accordion($('#accordion'), false);
  });
}
getProjectsmain(currentCity) {
  if (this.currentCity === 'Select City') {
    swal({
      title: 'Please Select city',
      type: 'error',
      showConfirmButton: false,
      timer: 1500
    });
  }
}
}
