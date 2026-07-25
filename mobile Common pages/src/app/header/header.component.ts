import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
declare var $:any;

declare var $: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  changeText: boolean;
  constructor(private router: Router) {
    this.changeText = false;
   }

  ngOnInit(): void {
    $('.b').hide();
    $('.a').show();
    let windowWidth = $(window).width();
    
    $(window).scroll(function() {
      if ($(this).scrollTop() > 360) {
        $('#homepge_nav').addClass('hme_back');
        $('#refer_li').addClass('scroll_offer');
        $('#refer_li').removeClass('refer_earn');
        $('#top_right').removeClass('top_row_right2');
        $('#top_right').addClass('top_row_right');
        $('.top_row_right_phno_mobile').addClass('addbackground');
        $('#brgr_white').hide();
        $('#brgr_ash').show();
        $('.a').hide();
        $('.b').show();
      }
      if ($(this).scrollTop() < 360) {
        $('#homepge_nav').removeClass('hme_back');
        $('#refer_li').removeClass('scroll_offer');
        $('#refer_li').addClass('refer_earn');
        $('#top_right').removeClass('top_row_right');
        $('#top_right').addClass('top_row_right2');
        $('.top_row_right_phno_mobile').removeClass('addbackground');
        $('#brgr_white').show();
        $('#brgr_ash').hide();
        $('.b').hide();
        $('.a').show();
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
          let hash = this.hash;

          // Using jQuery's animate() method to add smooth page scroll
          // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
          $('html, body').animate({
            scrollTop: $(hash).offset().top
          }, 800, function() {

            // Add hash (#) to URL when done scrolling (default click behavior)
            // window.location.hash = hash;
          });
        }  // End if
      });

      $('#myNavbar2 a').on('click', function(event) {
        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== '') {
          // Prevent default anchor click behavior
          event.preventDefault();

          // Store hash
          let hash = this.hash;

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
          let hash = this.hash;

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

  openNavopen() {
    document.getElementById('mySidenav').style.width = '250px';
  }

  closeNavclose() {
    document.getElementById('mySidenav').style.width = '0';
  }

  clickNavopen() {
    document.getElementById('mySidenavs').style.width = '250px';
  }

  clickNavclose() {
    document.getElementById('mySidenavs').style.width = '0';
  }

}
