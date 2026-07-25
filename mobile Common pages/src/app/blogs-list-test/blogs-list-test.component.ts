import { DOCUMENT, Location } from '@angular/common';
import { Component, ElementRef, HostListener, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl } from "@angular/forms";
import { DomSanitizer, Meta, SafeHtml, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { WINDOW } from '@ng-toolkit/universal';
import { CountdownComponent } from "ngx-countdown";
import { CarouselComponent, OwlOptions } from 'ngx-owl-carousel-o';
import { Observable, Subject } from 'rxjs';
import { map, startWith } from "rxjs/operators";
import { AllindiaService } from '../allindia.service';
import { Blogservice } from '../blog.service';
import { DataService } from '../data.service';
import { DataService2 } from '../data.service2';
import { FilterService } from '../filter.service';
import { user } from './blog-list';


declare var $: any;
declare var swal: any;

declare var $: any;

@Component({
  selector: 'app-blogs-list-test',
  templateUrl: './blogs-list-test.component.html',
  styleUrls: ['./blogs-list-test.component.css']
})
export class BlogsListTestComponent implements OnInit {

  @ViewChild('cd', { static: false }) private countdown: CountdownComponent;
  @ViewChild('scrollapiloader') scrollapiloader: ElementRef;
  BlogautocompleteComponent: any;

  myControl = new FormControl();
  options;
  filteredOptions: Observable<any>;
  youtubethumbnailimagepath = this.Service.blogimageURL + "youtube/";
  addRoot = this.allindia.imagesURL + 'expertsads/';

  topstoriesloader = true;
  recentblogsloader = true;
  blogsloader = true;
  searchshow = false;
  videoSectionloader: boolean;
  vedioblogs: any;
  categoryurl = '';
  trendingactive = false;
  imageUrls: any;
  ProfileImageNull = this.Service.bloggerImageNull;
  ProfileImage = this.Service.ProfileImageBlog;
  imageUrl: any = 'bloggerProfile.png';
  bloggerId: any;
  loginDropDownOpen = false;
  profileDropDownOpen = false;
  authdetails1: any;
  blogger_name_html: any;
  serviceFormComponent: any;



  trendingblogs: any;
  homeBuyingBlogs: any;
  realEstateNewsBlogs: any;
  InteriorsBlogs: any;
  TechnologyBlogs: any;
  topstories: any;
  recentStories: any;
  // imageUrls: any;
  // ProfileImageNull = this.Service.bloggerImageNull;
  // ProfileImage = this.Service.ProfileImageBlog;
  // imageUrl: any = 'bloggerProfile.png';


  bestoffersOptions1: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    autoplay: false,
    margin: 10,
    animateIn: 'fadeIn',
    animateOut: 'fadeOut',
    navSpeed: 500,
    nav: true,
    navText: ['<img src=https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_mobile_2/images/allIndia/leftArrowBlogsCarousel.svg alt=\'\' style="padding:0px; margin:0px" class=\'owl-nav owl-prev bestoff_left_webstory-icon\'>',
      '<img src=https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_mobile_2/images/allIndia/rightArrowBlogsCarousel.svg alt=\'\' class=\'owl-nav owl-next bestoff_right_webstory-icon\'>'],
    responsive: {
      0: {
        items: 1
      },
      480: {
        items: 1
      },
      700: {
        items: 1
      },
      940: {
        items: 1
      }
    },
  };


  showWebStory = false;
  webStoryPath = this.Service.webStoryImagePath;


  customOptionsWebStory: OwlOptions = {
    loop: true,
    autoplay: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    center: true,
    margin: -40,
    autoplaySpeed: 1000,
    navSpeed: 1000,
    animateIn: 'fadeIn',
    animateOut: 'fadeOut',
    nav: true,
    navText: ['<img src=https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_mobile_2/images/blogsListing/Click_right.png alt=\'LeftArrow\' class=\'owl-nav owl-prev left-icon-blogTest\'>',
      '<img src=https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_mobile_2/images/blogsListing/Click_right.png alt=\'RighttArrow\' class=\'owl-nav owl-prev right-icon-blogTest\'>'],
    responsive: {
      0: {
        items: 1.5
      },
      600: {
        items: 1.2
      },
      1000: {
        items: 1.2
      }
    }
  };








  @ViewChild('webStoryCarousel', { static: false }) webStoryCarousel: CarouselComponent;


  constructor(private titleService: Title,
    private location: Location,
    private meta: Meta,
    private router: Router,
    private _location: Location,
    public Service: DataService,
    public Service2: DataService2,
    private allindia: AllindiaService,
    public Filter: FilterService,
    public BlogService: Blogservice,
    private sanitizer: DomSanitizer,
    @Inject(DOCUMENT) private document,
    // private completerService: CompleterService,
    @Inject(WINDOW) private window: Window
  ) {
  }

  public searchStr: string;

  ngOnInit() {
    this.metatags();
    this.recentblog();
    this.getAuto();

    var giftofspeed = document.createElement('link');
    giftofspeed.rel = 'stylesheet';
    giftofspeed.href = 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/plugins/ngx-owl-carousel-o/lib/styles/prebuilt-themes/owl.carousel.min.css';
    giftofspeed.type = 'text/css';
    var godefer = document.getElementsByTagName('link')[0];
    godefer.parentNode.insertBefore(giftofspeed, godefer);

    var giftofspeed2 = document.createElement('link');
    giftofspeed2.rel = 'stylesheet';
    giftofspeed2.href = 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/plugins/ngx-owl-carousel-o/lib/styles/prebuilt-themes/owl.theme.default.min.css';
    giftofspeed2.type = 'text/css';
    var godefer2 = document.getElementsByTagName('link')[0];
    godefer2.parentNode.insertBefore(giftofspeed2, godefer2);
    var blogid = '1';
    this.Service.webstoryfetch(blogid).subscribe(blogs => {
      if (blogs['status'] == 'True') {

        this.webstories = blogs['webstory'];
        if (this.webstories.length > 0) {

          this.showWebStory = true;
        } else {
          this.showWebStory = false;
        }
        // ));
        this.currentSlide = 0;
        this.generateSchemaFromApi(blogs);
        // all schema.org Article entries
      } else {

      }
    });



    this.footershowhide();

    window.onclick = function (event) {
      if (!event.target.matches('.dropbtn3')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];
          if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
          }
        }
      }
    }


    this.bloggerId = localStorage.getItem("bloggerId");
    if (this.bloggerId == null) {
      this.loginDropDownOpen = true;
    } else {
      this.profileDropDownOpen = true;
    }
    var param3 = {
      bloggerId: this.bloggerId,
    }
    this.Service.getAuthorDetails(param3).subscribe(response => {
      this.authdetails1 = response['blogtype'].BloggerProfile;
      this.blogger_name_html = this.authdetails1[0].name;
      this.imageUrls = this.authdetails1[0].profile;
    })




    this.updateSlide();

    this.addsLoading();


  }
  ReverseMovement = true;


  floorPlanAdds = []
  legalAdds = []
  vastuAdds = []
  homeLoanAdds = []
  interiorAdds = []
  homeInspectionAdds = []
  propertyManagementAdds = []
  realEstateMarketAdds = []

  globalAddsArray = [];

  shuffledArray1 = [];
  shuffledArray2 = [];
  shuffledArray3 = [];

  showGlobalAdds = true;
  showFloorPlanAdds = true;
  showLegalAdds = true;
  showVastuAdds = true;
  showhomeLoanAdds = true;
  showInteriorAdds = true;

  addsLoading() {

    var params = {
      viewpagess: '3',
    };
    this.allindia.getAdds(params).subscribe(responce => {
      let allAddsCategory = responce['expertyinfo'];
      this.floorPlanAdds = allAddsCategory['Floorplan'];
      this.legalAdds = allAddsCategory['Legal'];
      this.vastuAdds = allAddsCategory['Vastu'];
      this.interiorAdds = allAddsCategory['Interior Designers'];
      this.homeLoanAdds = allAddsCategory['Home Loan'];
      this.homeInspectionAdds = allAddsCategory['Home Inspection'];
      this.propertyManagementAdds = allAddsCategory['Property Management'];
      this.realEstateMarketAdds = allAddsCategory['Real Estate Market'];

      let mergedArray = [...this.floorPlanAdds, ...this.legalAdds, ...this.homeInspectionAdds, ...this.propertyManagementAdds, ...this.realEstateMarketAdds, ...this.vastuAdds];
      this.globalAddsArray = mergedArray

      this.shuffleGlobalAdds(this.globalAddsArray)




      const globalAddsArray = this.shuffleArray([...this.globalAddsArray]);

      const chunkSize = Math.ceil(globalAddsArray.length / 3);
      this.shuffledArray1 = globalAddsArray.slice(0, chunkSize);
      this.shuffledArray2 = globalAddsArray.slice(chunkSize, 2 * chunkSize);
      this.shuffledArray3 = globalAddsArray.slice(2 * chunkSize);


      // this.shuffleFloorPlan(this.floorPlanAdds);
      // this.shuffleLegal(this.legalAdds);
      // this.shuffleVastue(this.vastuAdds);
      this.shuffleInterior(this.interiorAdds);
      this.shuffleHomeLoan(this.homeLoanAdds);


      var floorPlanLength = this.floorPlanAdds.length;
      if (floorPlanLength <= 0) {

        this.showFloorPlanAdds = false;
      } else {
        this.showFloorPlanAdds = true;
      }
      var legalLength = this.legalAdds.length;
      if (legalLength <= 0) {

        this.showLegalAdds = false;
      } else {
        this.showLegalAdds = true;
      }
      var vastuLength = this.vastuAdds.length;
      if (vastuLength <= 0) {

        this.showVastuAdds = false;
      } else {
        this.showVastuAdds = true;
      }
      var homeLoanLength = this.homeLoanAdds.length;
      if (homeLoanLength <= 0) {

        this.showhomeLoanAdds = false;
      } else {
        this.showhomeLoanAdds = true;
      }
      var interiorLength = this.interiorAdds.length;
      if (interiorLength <= 0) {

        this.showInteriorAdds = false;
      } else {
        this.showInteriorAdds = true;
      }
    })

  }


  shuffleArray(array: string[]): string[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }


  shuffleGlobalAdds(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    // return a;
    this.globalAddsArray = a;
  }


  shuffleInterior(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    this.interiorAdds = a;
  }
  shuffleHomeLoan(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    this.homeLoanAdds = a;
  }

  clickedService(id) {
    this.Filter.selectedService = id;

    this.Service.mouseenterservice1();

  }












  eventsarrayjoin: any[] = [];
  eventsLD: SafeHtml;
  getSafeHTML(value: {}) {
    const json = value ? JSON.stringify(value, null, 2).replace(/<\/script>/g, '<\\/script>') : ''; // escape / to prevent script tag in JSON
    const html = `<script type="application/ld+json">${json}</script>`;
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  generateSchemaFromApi(apiResponse: any) {
    if (apiResponse?.status === "True" && Array.isArray(apiResponse.webstory)) {
      for (const storyGroup of apiResponse.webstory) {
        const mainStory = storyGroup[0]; // Use the first object in each group

        const schema = {
          "@context": "https://schema.org",
          "@type": "Article",
          "inLanguage": "en",
          "headline": mainStory.top_stories_title,
          "mainEntityOfPage": `https://www.homes247.in/blogs/${mainStory.url_structure}-${mainStory.blog_ID}`,
          "datePublished": mainStory.top_stories_created_seo + "+05:30",
          "dateModified": mainStory.top_stories_created_seo + "+05:30",
          "url": `https://www.homes247.in/blogs/${mainStory.url_structure}-${mainStory.blog_ID}`,
          "image": {
            "@type": "ImageObject",
            "url": `https://img-mbgs.homes247.in/images/webstory/${mainStory.storyimg}`,
            "width": "800",
            "height": "1200"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Homes247",
            "url": "https://www.homes247.in/",
            "logo": {
              "@type": "ImageObject",
              "url": "https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/logo/Homes247_NewBlack_Logo.png",
              "width": "100",
              "height": "100"
            }
          },
          "author": {
            "@type": "Person",
            "url": "https://www.homes247.in/insights/authors/" + mainStory.top_stories_addedBy.toString().toLocaleLowerCase().replace(/\s+/g, '-') + '-' + mainStory.bloggertype + '-' + mainStory.blog_ID,
            "name": mainStory.top_stories_addedBy
          }
        };

        this.eventsarrayjoin.push(schema);
      }
      // Finally sanitize and assign to display in template
      this.eventsLD = this.getSafeHTML(this.eventsarrayjoin);
    }
  }

  onLogOut() {
    localStorage.removeItem("bloggerId");
    location.reload()
    // this.router.navigate(['/blogs'])
  }

  metatags() {
    var PAGEID = '4';
    this.Service.getstaticmeta(PAGEID).subscribe(metatags => {
      this.titleService.setTitle(metatags['Pageseo'][0].page_title);
      this.meta.updateTag({ name: 'description', content: metatags['Pageseo'][0].meta_description });
      this.meta.updateTag({ property: 'og:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_mobile/images/og/guide.jpg' });
      this.meta.updateTag({ property: 'og:title', content: metatags['Pageseo'][0].page_title });
      this.meta.updateTag({ property: 'og:description', content: metatags['Pageseo'][0].meta_description });
      this.Service.createLinkForCanonicalURL();
    });

  }

  loaded = false;
  divreached = false;
  apiload = false;
  FooterComponent: any;
  Mousemovement: boolean = false;
  @HostListener('touchstart', ['$event'])
  @HostListener('touchmove', ['$event'])
  @HostListener('touchend', ['$event'])
  @HostListener('touchcancel', ['$event'])
  onWindowScroll() {
    const elementPosition = this.scrollapiloader.nativeElement.offsetTop;
    const scrollPosition = window.pageYOffset;
    if (this.divreached = scrollPosition >= elementPosition) {
      this.Mousemovement = true;
      this.ReverseMovement = false;
      if (this.apiload == false) {
        this.apiload = true;
        //  this.Service.gettopblogslist().subscribe(trendblogs => {
        //    this.trendingblogs = trendblogs['locations'];
        //  });
        const trendingId = '1';
        this.BlogService.getcategoryblogs(trendingId).subscribe(trendblogs => {
          this.trendingblogs = trendblogs['blogcategory'];
        });
        const homeBuyningId = '4';
        this.BlogService.getcategoryblogs(homeBuyningId).subscribe(homeBuyning => {
          this.homeBuyingBlogs = homeBuyning['blogcategory'];
        });
        const realEstateNewsId = '7';
        this.BlogService.getcategoryblogs(realEstateNewsId).subscribe(realEstateNews => {
          this.realEstateNewsBlogs = realEstateNews['blogcategory'];
        });
        const InteriorsId = '5';
        this.BlogService.getcategoryblogs(InteriorsId).subscribe(Interiors => {
          this.InteriorsBlogs = Interiors['blogcategory'];
        });
        const TechnologyId = '6';
        this.BlogService.getcategoryblogs(TechnologyId).subscribe(Technology => {
          this.TechnologyBlogs = Technology['blogcategory'];
        });
        this.Service.getvedioblogs().subscribe(vedioblog => {
          this.vedioblogs = vedioblog['Blogvideos'];
        });
        // this.Service.getblogslist().subscribe(blogs => {
        //   if (blogs['status'] === 'True'){
        //     this.blogsloader = false;
        //     this.blogs = blogs['locations'];
        //   }else{
        //     this.blogsloader = true;
        //   }
        // });
      }


      import('../blogautocomplete/blogautocomplete.module').then(mod => mod.BlogautocompleteModule).then(BlogautoModule => {
        this.BlogautocompleteComponent = BlogautoModule.components['lazy'];
      });
      import('../service-form/service-form.module').then(mod => mod.serviceFormModule).then(EnquiryFormComponent => {
        this.serviceFormComponent = EnquiryFormComponent.components['lazy'];
      });
      this.Service.mouseenterservice3();
    }
    let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    let max = document.documentElement.scrollHeight;
    if (pos == max) {
      // import('../footer/footer.module').then(mod => mod.FooterModule).then(FooterModule =>{
      //   this.FooterComponent = FooterModule.components['lazy'];
      //   this.loaded = true;
      // });
    }
    if ($(window).scrollTop() >= 300) {
      $('#main-blog').addClass('fixed-header');
    }
    else {
      $('#main-blog').removeClass('fixed-header');
    }
  }
  title: string;
  toLoweUpper(title: string) {
    this.title = title;
  }

  perpageitem: number = 6;
  p: number = 1;
  imagepath = this.Service.blogimageURL + 'stories/';
  user = new user();
  blogs: any;


  footershowhide() {
    var prevScrollpos = window.pageYOffset;
    var isScrolling;
    window.addEventListener('scroll', function (event) {
      var currentScrollPos = window.pageYOffset;
      if (prevScrollpos > currentScrollPos) {
        document.getElementById("footer").style.bottom = "0";
      } else {
        document.getElementById("footer").style.bottom = "-50px";
        $('#fixed-accordion').css('visibility', 'hidden');
      }
      prevScrollpos = currentScrollPos;
      window.clearTimeout(isScrolling);
      isScrolling = setTimeout(function () {
        document.getElementById("footer").style.bottom = "0";
      }, 2000);
      if ($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
        document.getElementById("footer").style.bottom = "0";
      }
    }, false);

    // scroll menu
    $('.video-scroll').click(function () {
      $('#content').animate({
        scrollLeft: "+=50px"
      }, "slow");
    });
    $('.latest-scroll').click(function () {
      $('#content').animate({
        scrollLeft: "+=50px"
      }, "slow");
    });
    $('.real-estate-scroll').click(function () {
      $('#content').animate({
        scrollLeft: "+=100px"
      }, "slow");
    });
    $('.interior-scroll').click(function () {
      $('#content').animate({
        scrollLeft: "+=150px"
      }, "slow");
    });
    $('.technology-scroll').click(function () {
      $('#content').animate({
        scrollLeft: "+=250px"
      }, "slow");
    });
    $('.construction-scroll').click(function () {
      $('#content').animate({
        scrollLeft: "+=300px"
      }, "slow");
    });
    $('.expert-scroll').click(function () {
      $('#content').animate({
        scrollLeft: "+=150px"
      }, "slow");
    });
    $('.diy-scroll').click(function () {
      $('#content').animate({
        scrollLeft: "+=450px"
      }, "slow");
    });
    $('.indian-scroll').click(function () {
      $('#content').animate({
        scrollLeft: "+=550px"
      }, "slow");
    });
  }

  recentblog() {
    this.Service.getrecentblogs().subscribe(recentStories => {
      if (recentStories['status'] === 'True') {
        this.recentblogsloader = false;
        this.recentStories = recentStories['locations'];
      } else {
        this.recentblogsloader = true;
      }
    });


  }

  getAuto() {
    import('../footer/footer.module').then(mod => mod.FooterModule).then(FooterModule => {
      this.FooterComponent = FooterModule.components['lazy'];
    });
    var blogid = '1';
    this.Service2.getblogAuto(blogid).subscribe(myLocalList => {
      this.apioptions(myLocalList['blogautolist']);
    });
  }
  // autocomplete

  apioptions(apivalue) {
    this.options = apivalue;
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => value.length >= 1 ? this._filter(value) : [])
      );
  }

  private _filter(value: string) {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }
  //
  onItemSelect(selected) {
    const blogurl = selected.structure.toLowerCase().replace(/\s+/g, '-');

    const blogid = selected.id;
    if (blogurl.charAt(0) === "-") {
      const finalblogurl = blogurl.replace('-', '');
      // 
      this.router.navigate(['/blogs/' + finalblogurl + '-' + blogid]);
    } else {
      // 
      this.router.navigate(['/blogs/' + blogurl + '-' + blogid]);
    }
  }
  public displayname(value) {
    if (value) {
      return value.name;
    }
  }



  items: any;
  searchs: any;
  public userDetails: any;
  public clients: any;
  private searchTerms = new Subject<string>();
  public top_stories_title = '';
  public flag: boolean = true;
  top_stories_IDPK: any;
  dataRefresher: any;
  placholder = 'search';
  clickNavopen() {
    document.getElementById('mySidenavs').style.width = '250px';
  }

  clickNavclose() {
    document.getElementById('mySidenavs').style.width = '0';
  }
  IsVisiblee = false;
  ShowHide_More() {
    this.IsVisiblee = this.IsVisiblee ? false : true;
  }
  openValidationFrm() {

    var bloggerId = localStorage.getItem('bloggerId');
    if (bloggerId == undefined || null) {
      // this.router.navigate(['insights/authors/login'])
      this.router.navigate(['/free-blogging-site'])
    } else {
      var param3 = {
        bloggerId: bloggerId,
      }
      this.Service.getAuthorDetails(param3).subscribe(response => {
        var authdetails1 = response['blogtype'].BloggerProfile;
        var bloggername = authdetails1[0].name;
        this.router.navigate(['writeblogs/authors/' + bloggername.replace(/\s+/g, '-').toLowerCase() + '/' + bloggerId])
      })
    }
  }
  openValidationFrm1() {
    var bloggerId = localStorage.getItem('bloggerId');
    if (bloggerId == undefined || null) {
      this.router.navigate(['insights/authors/login'])

      // this.router.navigate(['insights/authors/login'], {
      //   queryParams: {
      //     id: "login",
      //   },
      //   queryParamsHandling: 'merge',
      // })

    } else {
      var param3 = {
        bloggerId: bloggerId,
      }
      this.Service.getAuthorDetails(param3).subscribe(response => {
        var authdetails1 = response['blogtype'].BloggerProfile;
        var bloggername = authdetails1[0].name;
        this.router.navigate(['/userblogs/profile/' + bloggername.replace(/\s+/g, '-').toLowerCase() + '-1-' + bloggerId]);
      })
    }
  }
  Onclicksearch() {
    this.searchshow = true;
    $('html,body').animate({
      scrollTop: $(".scrollreach").offset().top
    },
      'slow');
  }



  showPopup = false;
  webStoriesById: any;
  currentSlideById = 0;

  callWebStoryApiID(blogID, webStoryCode) {
    if (webStoryCode !== null) {
      this.showPopup = true;
      $('body').css('overflow', 'hidden')
      var blogid = blogID;
      this.Service.webstoryfetchById(blogid).subscribe(blogs => {
        if (blogs['status'] == 'True') {
          this.webStoriesById = blogs['webstory'];
          // this.webstories = this.webstories.map(group => group.map(item =>
          //   item.storyimg
          // ));
          this.currentSlideById = 0;
          this.updateSlide1();
        } else {

        }
      });
    } else {
      this.showPopup = false;
    }
  }

  closePopup() {
    $('body').css('overflow', 'scroll')

    const popup = this.document.querySelector('.popup-content');
    if (popup) {
      popup.classList.remove('animate-in');
      popup.classList.add('animate-out');
      setTimeout(() => {
        this.showPopup = false;
      }, 300); // match with animation duration
    } else {
      this.showPopup = false;
    }
  }


  webstories: any;

  currentSlide = 0;
  animationTimeout: any;


  updateSlide(): void {
    clearTimeout(this.animationTimeout);
    this.animationTimeout = setTimeout(() => {
      this.nextSlide();
    }, 5000);
  }

  nextSlide(): void {
    const slides = this.webstories[0];

    if (this.currentSlide < slides.length - 1) {
      this.currentSlide++;
      this.updateSlide();
    } else {
      this.currentSlide = 0;
      this.webStoryCarousel.next(); // Move carousel forward
      this.updateSlide();
    }
  }

  prevSlide(): void {
    const slides = this.webstories[0];

    if (this.currentSlide > 0) {
      this.currentSlide--;
    } else {
      this.currentSlide = slides.length - 1;
    }
    this.updateSlide();
  }








  // Only this small function:
  onCarouselChanged(event: any): void {
    // 
    this.currentSlide = 0; // Reset to first web story image

  }


  zoomState = 'zoom-in';


  updateSlide1(): void {
    clearTimeout(this.animationTimeout);
    this.animationTimeout = setTimeout(() => {
      this.nextSlide1();
    }, 5000);
  }

  nextSlide1(): void {
    // Rotate within first group's images for demo, or set active group
    const slides = this.webStoriesById; // or store current group
    this.currentSlideById = (this.currentSlideById + 1) % slides.length;
    this.updateSlide1();
    this.toggleZoomAnimation();
  }

  prevSlide1(): void {
    const slides = this.webStoriesById;
    this.currentSlideById = this.currentSlideById === 0 ? slides.length - 1 : this.currentSlideById - 1;
    this.updateSlide1();
    this.toggleZoomAnimation();
  }


  toggleZoomAnimation() {
    // Reset animation
    this.zoomState = '';
    setTimeout(() => {
      this.zoomState = this.zoomState === 'zoom-in' ? 'zoom-out' : 'zoom-in';
    }, 0);
  }










}
