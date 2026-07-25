import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { HomeSidenavbar } from '../home-sidenavbar/home-sidenavbar';
import { FooterNewMobile } from '../footer-new-mobile/footer-new-mobile';
import { DataService } from '../data.service';

@Component({
  selector: 'app-new-about-us',
  templateUrl: './new-about-us.html',
  styleUrl: './new-about-us.css',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HomeSidenavbar,
    FooterNewMobile,
    CarouselModule
  ]
})
export class NewAboutUs implements OnInit {

  // Dynamic Awards List (Industry Recognition)
  awardsList = [
    {
      title: 'AHAD EXCELLENCIA',
      img: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/homes247Awards/AHAD%20EXCELLENCIA.svg'
    },
    {
      title: 'AJMERA REALTY',
      img: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/homes247Awards/AJMERA%20REALTY.svg'
    },
    {
      title: 'ARVIND SMARTSPACES',
      img: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/homes247Awards/ARVIND%20SMARTSPACES.svg'
    },
    {
      title: 'ASSETZ PROPERTY GROUP',
      img: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/homes247Awards/ASSETZ%20PROPERTY%20GROUP.svg'
    },
    {
      title: 'ASSETZ PROPERTY GROUP-1',
      img: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/homes247Awards/ASSETZ%20PROPERTY%20GROUP-1.svg'
    },
    {
      title: 'Casagrand',
      img: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/homes247Awards/Casagrand.svg'
    },
    {
      title: 'COMMONFLOOR',
      img: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/homes247Awards/COMMONFLOOR.svg'
    },
    {
      title: 'COMMONFLOOR-1',
      img: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/homes247Awards/COMMONFLOOR-1.svg'
    },
    {
      title: 'COMMONFLOOR-2',
      img: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/homes247Awards/COMMONFLOOR-2.svg'
    },
    {
      title: 'FRONTIER HEIGHTS',
      img: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/homes247Awards/FRONTIER%20HEIGHTS.svg'
    },
    {
      title: 'IBE',
      img: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/homes247Awards/IBE.svg'
    },
    {
      title: 'PURAVANKARA GROUP',
      img: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/homes247Awards/PURAVANKARA%20GROUP.svg'
    },
    {
      title: 'QUIKR HOMES',
      img: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/homes247Awards/QUIKR%20HOMES.svg'
    },
    {
      title: 'SOBHA DREAM SERIES',
      img: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/homes247Awards/SHOBHA%20DREAM%20SERIES.svg'
    },
    {
      title: 'SILICON INDIA',
      img: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/homes247Awards/SILICON%20INDIA.svg'
    },
    {
      title: 'TIMES BUSINESS AWARD',
      img: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/homes247Awards/TIMES%20BUSINESS%20AWARD.svg'
    },
    {
      title: 'VAISHNAVI GROUP',
      img: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/homes247Awards/VAISHNAVI%20GROUP.svg'
    }
  ];

  // Dynamic Media Spotlight List (In The News)
  mediaList = [
    {
      title: 'Economic Times',
      link: 'https://economictimes.indiatimes.com/industry/services/property-/-cstruction/real-estate-developers-ready-with-festive-offers-hoping-recovery-by-diwali/articleshow/78110437.cms?from=mdr',
      img: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/news/economic-times.jpg'
    },
    {
      title: 'The Week',
      link: 'https://www.theweek.in/wire-updates/business/2020/08/18/pwr24-homes247.in.html',
      img: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/news/the-week.jpg'
    },
    {
      title: 'Times of India',
      link: 'https://timesofindia.indiatimes.com/business/india-business/embracing-technology-to-tackle-covid-19-hurdles-book-a-home-from-home-at-homes247-in/articleshow/76218982.cms',
      img: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/news/times-of-india.jpg'
    },
    {
      title: 'Silicon India',
      link: 'https://realestate.siliconindia.com/vendor/homes247in-techenabled-streamlined-home-buying-for-all-cid-11513.html',
      img: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/news/silicon-india.jpg'
    },
    {
      title: 'YourStory',
      link: 'https://yourstory.com/2020/08/search-settle-homes247-data-tech-home-seeking',
      img: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/news/yourstory.jpg'
    }
  ];

  // Mobile Awards Owl Carousel Options
  awardsOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 500,
    autoplay: true,
    autoplayTimeout: 2500,
    autoplayHoverPause: true,
    center: true,
    margin: 10,
    responsive: {
      0: { items: 2.2 },
      360: { items: 2.5 },
      420: { items: 2.8 }
    },
    nav: false
  };

  // Mobile Media Spotlight Owl Carousel Options
  mediaOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 500,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    margin: 15,

    center: true,
    responsive: {
      0: { items: 1.3 },
      360: { items: 1.4 },
      420: { items: 1.5 }
    },
    nav: false
  };

  constructor(
    private titleService: Title,
    private meta: Meta,
    private router: Router,
    public Service: DataService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('About Us | Homes247.in');
    this.meta.updateTag({ name: 'description', content: 'Learn more about Homes247.in - India\'s premier PropTech platform.' });
    this.loadOwlCss();
  }

  loadOwlCss() {
    const owlCss1 = 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/plugins/ngx-owl-carousel-o/lib/styles/prebuilt-themes/owl.carousel.min.css';
    const owlCss2 = 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/plugins/ngx-owl-carousel-o/lib/styles/prebuilt-themes/owl.theme.default.min.css';

    if (typeof document !== 'undefined') {
      if (!document.querySelector(`link[href="${owlCss1}"]`)) {
        const link1 = document.createElement('link');
        link1.rel = 'stylesheet';
        link1.href = owlCss1;
        document.head.appendChild(link1);
      }
      if (!document.querySelector(`link[href="${owlCss2}"]`)) {
        const link2 = document.createElement('link');
        link2.rel = 'stylesheet';
        link2.href = owlCss2;
        document.head.appendChild(link2);
      }
    }
  }

}
