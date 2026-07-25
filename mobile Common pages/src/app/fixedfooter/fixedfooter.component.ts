import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
declare var $: any;
declare var $: any;
@Component({
  selector: 'app-fixedfooter',
  templateUrl: './fixedfooter.component.html',
  styleUrls: ['./fixedfooter.component.css']
})
export class FixedfooterComponent implements OnInit {
  userID: string | null = null;
  homeactive = false;
  videoactive = false;
  searchactive = false;
  moreactive = false;
  categoryurl = '';
  constructor(private router: Router,) { }

  ngOnInit(){
  this.accordianshow();
   this.footershowhide();
  this.activenav();
  this.userID = localStorage.getItem("userID");
  }
  showhide(){
    if ($('#fixed-accordion').css('visibility') == 'hidden')
      $('#fixed-accordion').css('visibility','visible');
    else
      $('#fixed-accordion').css('visibility','hidden');
   }
accordianshow(){
  $(function() {
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
footershowhide(){
  var prevScrollpos = window.pageYOffset;
  var isScrolling;
  window.addEventListener('scroll', function ( event ) {
   var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    // document.getElementById('footer').style.bottom = '0';
    $('.mobile-bottom-nav').css('bottom','0');
  } else {
    // document.getElementById('footer').style.bottom = '-50px';
    $('.mobile-bottom-nav').css('bottom','-50px');
    $('#fixed-accordion').css('visibility','hidden');
  }
     prevScrollpos = currentScrollPos;
    window.clearTimeout( isScrolling );
    isScrolling = setTimeout(function() {
    // document.getElementById('footer').style.bottom = '0';
    $('.mobile-bottom-nav').css('bottom','0');
    }, 650);
    if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
      // document.getElementById('footer').style.bottom = '0';
      $('.mobile-bottom-nav').css('bottom','0');
  }
  }, false);
}
activenav(){
  this.categoryurl = this.router.url;
  if(this.categoryurl == '/'){
    this.homeactive = true;
  }
  if(this.categoryurl == '/offers'){
    this.videoactive = true;
  }
  if(this.categoryurl == '/compare-properties'){
    this.searchactive = true;
  }
}
filterclick(){
  this.router.navigate(['/Filter']);
}
}

