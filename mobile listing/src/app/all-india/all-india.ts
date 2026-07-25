import { Component, ElementRef, HostListener, Inject, OnInit, PLATFORM_ID, ViewChild, VERSION, OnDestroy, AfterViewInit } from '@angular/core';
import { DataService } from '../data.service';
import { CityService } from '../city.service';
import { HomeSidenavbar } from '../home-sidenavbar/home-sidenavbar';
import { CarouselModule, OwlOptions, CarouselComponent } from 'ngx-owl-carousel-o';
import { SafeStorageService } from '../safe-storage.service';
import { cleanUrlPipe, OrderByPipe2, MyFilterunique2, SanitizeHtmlPipe, ReplaceLineBreaksany, PriceFormatterPipe } from '../mainpipe-pipe';
import { FilterService } from '../filter.service';
import { Enquiry, User } from '../home/home';
import { AllindiaService } from '../allindia.service';
import { combineLatest, Observable, Subscription, take, } from 'rxjs';
// import Swal from 'sweetalert2';
import { DomSanitizer, Meta, SafeHtml, Title } from '@angular/platform-browser';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, DOCUMENT, isPlatformBrowser, NgOptimizedImage } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MyJsonLdComponent } from '../my-json-ld/my-json-ld.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { Location } from '@angular/common';
// import { InnerHeader } from '../inner-header/inner-header';




interface Food {
  value: string;
  viewValue: string;
}

interface Car {
  value: string;
  viewValue: string;
}

declare var $: any;

@Component({
  selector: 'app-all-india',
  imports: [HomeSidenavbar, CommonModule, RouterModule, FormsModule, ReactiveFormsModule, cleanUrlPipe, OrderByPipe2, MyFilterunique2, ReplaceLineBreaksany, CarouselModule, NgxSkeletonLoaderModule, MyJsonLdComponent, PriceFormatterPipe],
  templateUrl: './all-india.html',
  styleUrl: './all-india.css',
})

export class AllIndia implements AfterViewInit {
  city = 'Angular ' + VERSION.major;
  @ViewChild('cancel') cancel: ElementRef;
  @ViewChild('scrollapiloader') scrollapiloader: ElementRef;
  @ViewChild('fileInput') fileInput: ElementRef;
  selectedValue: string;
  selectedCar: string;

  foods: Food[] = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' }
  ];

  cars: Car[] = [
    { value: 'volvo', viewValue: 'Volvo' },
    { value: 'saab', viewValue: 'Saab' },
    { value: 'mercedes', viewValue: 'Mercedes' }
  ];
  id;

  LocalBusinessLD: SafeHtml;

  products = [];
  metas = [];
  citiess: any;
  citiesss: any
  SelectCity = 'Select City';
  selectedLocation;
  allBuilders = []
  topProperties = [];
  newProperties = [];
  allSpotlightProp: any[] = [];

  testimonialListing: any;
  blogs: any;
  loginshow = true;
  userlogin = false;
  propertyname: any;
  cityid: any;
  // currentCity = 'Select City';
  menucurrentCity: any;
  searchstring: any;
  repeats = new Array(20); // Adjust count as needed to fill the banner


  // addRoot = this.allindia.ipimagesURL + 'expertsads/';




  registrationForm: FormGroup;

  allExpertsData: any;

  date: any;
  user = new User();
  enquiry = new Enquiry();
  blogsloader = true;
  newlaunchesloader = true;
  topprojectsloader = true;
  myControl = new FormControl();
  options;
  filteredOptions: Observable<any>;
  // currentCitySearchNav;
  // currentCitySearchNavi;
  locationSelectedId = '1';
  changeText: boolean;
  hidemobile: boolean;
  hidedesktop: boolean;
  pageTitleSeo;
  pageDescriptionSeo;
  dateModified;
  majorcities: any;
  uploads: any;
  trending: any;
  featured: any;
  handpicked: any;
  launched: any;
  topsearch: any;
  homeactive = false;
  videoactive = false;
  searchactive = false;
  moreactive = false;
  categoryurl = '';
  allindiasidenav: any;
  cityname: any
  showCities = false;
  testli_data: any[] = [];
  testLi2_data: any[] = [];
  RecentCityStorage = [];
  currentCity: any;
  selected: any;
  blogapiload = true;
  topnewapiload = true;
  // sectionloader = false;
  topnewdivreached = false;
  loaded = false;
  FooterComponent: any;
  Autocomplete: any;
  serviceFormComponent: any;

  Matautocomplete: any;
  Homesidenav: any
  allindia2: any;
  Mousemovement: boolean = false;
  HideMovement: boolean = true;
  cityyy: any;
  citynav: any;
  countryExist: any;
  recenthide = false;
  otpexpired = false;
  otploader = false;

  classnames: any;
  toggle: boolean = true;
  isReadMore = true;

  imageUrls: any;
  CoverImage = [];
  emailId;
  userName;
  userNumber;
  companyName;
  designation;
  experience;
  expertDescription;
  expertID;
  expertTypeId;
  expertType;
  expImgname;
  openRegisterModal = false;

  CityBangalore: any;
  CityHyderabad: any;
  CityChennai: any;
  CityKochi: any;
  CityPune: any;
  CityDelhi: any;
  CityKolkata: any;
  CityMumbai: any;
  majorcities1: any;

  readyToMoveprojectcount: any;
  newLaunchesprojectcount: any;
  affordableprojectcount: any;
  luxuryprojectcount: any;
  interiorAdds = []

  componentloads = false;
  showWebStory = false;
  dropdownVisible = false;


  constructor(
    private router: Router,
    private location: Location,
    public Services: DataService,
    // public Service :AllindiaService,
    @Inject(DOCUMENT) private doc,
    private sanitizer: DomSanitizer,
    private storage: SafeStorageService,
    // private dataService: DataService,
    // private dataService2: DataService2,
    private allindia: AllindiaService,
    public cityservice: CityService,
    private _formBuilder: FormBuilder,
    private titleService: Title,
    private meta: Meta,
    public Filter: FilterService,
    @Inject(PLATFORM_ID) private platformId: Object,

  ) {
    this.window = this.doc.defaultView!;
    this.changeText = false;
    this.router.events.subscribe((evt) => {
      this.router.navigated = false;
      window.scrollTo(0, 0);
    });


  }

  private async getSwal() {
    const { default: Swal } = await import('sweetalert2');
    return Swal;
  }

  window!: Window;

  scrollTo(section) {
    document.querySelector('#' + section)
      .scrollIntoView();
  }

  headerOnScroll = false;

  @HostListener('window:scroll')
  @HostListener('window:touchstart')
  @HostListener('window:touchmove')
  onWindowScroll() {
    const scrollTop = window.scrollY;

    if (scrollTop > 100 && !this.headerOnScroll) {
      this.headerOnScroll = true;
    }

    if (scrollTop <= 100 && this.headerOnScroll) {
      this.headerOnScroll = false;
    }

  }

  private fontLoaded = false;

  loadFontAwesomeOnce() {
    if (this.fontLoaded) return;

    if (!document.querySelector('link[href*="font-awesome"]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css';
      link.media = 'print';
      link.onload = () => {
        link.media = 'all';
        this.fontLoaded = true;
      };
      document.head.appendChild(link);
    } else {
      this.fontLoaded = true;
    }
  }
  ngAfterViewInit(): void {
    import('../mat-autocomplete-new/mat-autocomplete-new')
      .then(c => {
        this.Matautocomplete = c.MatAutocompleteNew;
      });
    this.loadFontAwesomeOnce();
  }

  IsVisible = false;
  ShowHidecontact() {

    // this.router.navigateByUrl(this.router.url.split('?')[0], { replaceUrl: true });

    $('#FirstCityModal').modal('show');
    $('.modal-backdrop').removeClass('modal-backdrop fade show');

    // Show the modal


    // Close the modal
    // $('#selectCityModal').modal('hide');
    // this.IsVisibleMat = true
    $('.matAuto').css('display', 'block');

    // this.IsVisible = this.IsVisible ? false : true;
  }

  @HostListener('touchstart', ['$event'])
  // @HostListener('window:scroll', ['$event'])
  handleTouch(event) {
    // this.webstories.forEach((_, index) => this.updateSlide(index));
    const elementPosition = this.scrollapiloader.nativeElement.offsetTop;
    const scrollPosition = this.window.pageYOffset;
    if (this.topnewdivreached = scrollPosition >= elementPosition) {
      if (this.topnewapiload == true) {
        this.topnewapiload = false;
        const limite = 0;
        const limitrows = 6;
        const status = '50307';
        const proptypeid = '50401';
        var param = {
          limit: limite,
          limitrows: limitrows,
          statusid: status,
          proptypeid: proptypeid

        };
        this.Services.getprojectscount('Bangalore', param).subscribe(countprojects => {
          let projectcount = countprojects['Counts'];
          this.readyToMoveprojectcount = projectcount[0].PropertyCounts;
        });


        const status1 = '50310,50308';
        var param1 = {
          limit: limite,
          limitrows: limitrows,
          statusid: status1,
        };
        this.Services.getprojectscount('Bangalore', param1).subscribe(countprojects => {
          let projectcount = countprojects['Counts'];
          this.newLaunchesprojectcount = projectcount[0].PropertyCounts;
        });



        var param2 = {
          limit: limite,
          limitrows: limitrows,
          proptypeid: proptypeid,
          minprice: '1',
          maxprice: '6'
        };
        this.Services.getprojectscount('Bangalore', param2).subscribe(countprojects => {
          let projectcount = countprojects['Counts'];
          this.affordableprojectcount = projectcount[0].PropertyCounts;
        });


        var param3 = {
          limit: limite,
          limitrows: limitrows,
          proptypeid: proptypeid,
          minprice: '7',
          maxprice: '24'
        };
        this.Services.getprojectscount('Bangalore', param3).subscribe(countprojects => {
          let projectcount = countprojects['Counts'];
          this.luxuryprojectcount = projectcount[0].PropertyCounts;
        });

      }
    }



    this.Mousemovement = true;
    this.HideMovement = false;
    import('../footer-new-mobile/footer-new-mobile').then(m => {
      this.FooterComponent = m.FooterNewMobile;
    });


    // import('../all-india-sidenavbar/all-india-sidenavbar.module').then(mod => mod.AllIndiaSidenavbarComponentModule).then(AllIndiaSidenavbarComponentModule => {
    //   this.allindiasidenav = AllIndiaSidenavbarComponentModule.components['lazy'];
    //   this.loaded = true;
    // });


    if (this.componentloads == false) {
      // ;
      this.componentloads = true;
      this.addsLoading();
      import('../ejs-autocomplete/ejs-autocomplete')
        .then(c => {
          this.Autocomplete = c.EjsAutocomplete;
          this.loaded = true;
        });;
      import('../service-form/service-form.component')
        .then(c => {
          this.serviceFormComponent = c.ServiceFormComponent;
        });
      this.Services.mouseenterservice3();
      this.webstoryfetchApi();
      //       const link = document.createElement('link');

      // link.rel = 'preload';
      // link.as = 'style';
      // link.href =
      //   'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css';

      // link.onload = () => {
      //   link.rel = 'stylesheet';
      // };

      // document.head.appendChild(link);

    }

    if (this.webstories) {
      this.webstories.forEach((_, index) => this.updateSlide(index));
    }

  }

  change() {
    this.toggle = !this.toggle;
  }

  showText() {
    this.isReadMore = !this.isReadMore;
  }
  cardvalue: string;
  Selection() {
    var cardvalue = $("#city").text();
    this.cardvalue = cardvalue.toLocaleLowerCase().replace(' ', '-');
    this.storage.setItem('CityName', this.cardvalue);
    //  
  }

  IsVisiblee = false;
  ShowHide_More() {
    this.IsVisiblee = this.IsVisiblee ? false : true;
  }

  webstories: any;
  currentSlide = 0;
  animationTimeout: any;
  currentSlides: number[] = [];
  animationTimeouts: any[] = [];
  ngOnInit() {
    // this.Homesidenav = HomeSidenavbar;
    this.dataloads();
    this.metatags();
    const preloadLink = document.createElement('link');
    preloadLink.rel = 'preload';
    preloadLink.as = 'image';
    preloadLink.href = 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_mobile/images/allIndiaBG.svg';
    preloadLink.setAttribute('fetchpriority', 'high');
    document.head.appendChild(preloadLink);
    this.getlocationlist();
    this.activenav();
    this.dateModified = new Date();
    this.semanticjquery();
    this.battleInit();
    this.Login();
    this.accordianshow();
    this.id = setInterval(() => {
      this.battleInit();
    }, 1000);

    this.currentCity = this.storage?.getItem('CityName').toLocaleLowerCase();
    //  $('.androidApp').css('display', 'none');
  }
  webStoryPath: string = '';
  imagepath: string = '';
  propertyimage: string = '';
  propertyimage1: string = '';
  blogimagePath: string = '';
  testimonialImage: string = '';
  ImageUrlBuilderLogo: string = '';
  ImageUrl: string = '';
  expertTypImg: string = '';
  builderLogo: string = '';
  addRoot: string = '';

  dataloads() {
    this.webStoryPath = this.Services.webStoryImagePath;
    this.imagepath = this.allindia.imagesURL + 'cities/';
    this.propertyimage = this.allindia.imagesURL + 'uploadPropertyImgs/';
    this.propertyimage1 = this.allindia.imagesURL + 'spotlight_images/';
    this.blogimagePath = this.allindia.imagesURL + 'stories/';
    this.testimonialImage = this.allindia.imagesURL + 'TestimonialImage/';
    this.ImageUrlBuilderLogo = this.allindia.imagesURL + 'builder/';
    this.ImageUrl = this.allindia.imagesURL + 'cities/';
    this.expertTypImg = this.allindia.imagesURL + 'expert_types_img/';
    this.builderLogo = this.allindia.imagesURL + 'builder/';
    this.addRoot = this.allindia.imagesURL + 'expertsads/';
  }


  metatags() {
    var PAGEID = '1';
    this.allindia.getstaticmeta(PAGEID).subscribe((metatags: any[]) => {
      this.metas = metatags['Pageseo'];
      this.titleService.setTitle(this.metas[0].page_title);
      this.meta.updateTag({ name: 'description', content: this.metas[0].meta_description });
      this.pageTitleSeo = this.metas[0].page_title;
      this.pageDescriptionSeo = this.metas[0].meta_description;
    });
    this.allindia.createLinkForCanonicalURL();

    import('../all-india2/all-india2')
      .then(c => {
        this.allindia2 = c.AllIndia2;
      });
    this.topprojectsloader = false;

    $('body').removeClass('modal-open');


  }

  webstoryfetchApi() {

    var blogid = '1';
    this.Services.webstoryfetch(blogid).subscribe(blogs => {
      if (blogs['status'] === 'True') {
        this.webstories = blogs['webstory'];
        if (this.webstories.length > 0) {
          this.showWebStory = true;
        } else {
          this.showWebStory = false;
        }


        // Initialize currentSlides array — one index per webstory group
        this.currentSlides = this.webstories.map(() => 0);

        // Start autoplay for all webstory groups
        // this.webstories.forEach((_, index) => this.updateSlide(index));

        this.generateSchemaFromApi(blogs);
        // all schema.org Article entries 


      } else {
      }
    });

  }


  eventsarrayjoin: any[] = [];
  eventsLD: SafeHtml;

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

  updateSlide(groupIndex: number): void {
    clearTimeout(this.animationTimeouts[groupIndex]);

    this.animationTimeouts[groupIndex] = setTimeout(() => {
      this.nextSlide(groupIndex);
    }, 5000);
  }

  nextSlide(groupIndex: number): void {
    const slides = this.webstories[groupIndex];
    if (this.currentSlides[groupIndex] < slides.length - 1) {
      this.currentSlides[groupIndex]++;
    } else {
      this.currentSlides[groupIndex] = 0;
    }
    this.updateSlide(groupIndex);
  }

  prevSlide(groupIndex: number): void {
    const slides = this.webstories[groupIndex];
    if (this.currentSlides[groupIndex] > 0) {
      this.currentSlides[groupIndex]--;
    } else {
      this.currentSlides[groupIndex] = slides.length - 1;
    }
    this.updateSlide(groupIndex);
  }



  shareProperty(data: any) {
    if ((window.navigator as any).share) {
      (window.navigator as any)
        .share({
          title: 'Checkout this Blog - ',
          text: 'Best Entertainment Blogs',
          url: 'https://www.homes247.in/blogs/' + data.url_structure + '-' + data.blog_ID,
        })
        .then(() => console.log('Shared successfully'))
        .catch((error: any) => console.error('Error sharing:', error));
    } else {
      console.log('Web Share API not supported on this device.');
    }
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







  ngOnDestroy(): void {
    if (this.animationTimeout) {
      // clearTimeout(this.animationTimeout);
      this.animationTimeouts.forEach(timeout => clearTimeout(timeout));
    }

    if (this.id) {
      clearInterval(this.id);
    }
  }


  onCarouselChanged(event: any): void {
    this.currentSlide = 0;

  }


  webStoriesById: any;
  currentSlideById = 0;

  showPopup = false;

  // callWebStoryApiID(blogID){
  //   $('body').css('overflow','hidden')
  //   var blogid = blogID;
  //   this.Services.webstoryfetchById(blogid).subscribe(blogs => {
  //     if (blogs['status'] == 'True') {
  //       this.webStoriesById = blogs['webstory'];
  //       this.showPopup = true;
  //         // this.webstories = this.webstories.map(group => group.map(item =>
  //         //   item.storyimg
  //         // ));
  //         this.currentSlideById = 0;
  //         this.updateSlide1();
  //       } else {
  //         this.showPopup = false;
  //       }
  //     });
  // }
  callWebStoryApiID(blogID) {
    $('body').css('overflow', 'hidden')
    var blogid = blogID;
    this.Services.webstoryfetchById(blogid).subscribe(blogs => {
      if (blogs['status'] == 'True') {
        this.webStoriesById = blogs['webstory'];
        this.showPopup = true;
        this.currentSlideById = 0;
        this.updateSlide1();
      } else {
        this.showPopup = false;
      }
    });
  }

  clickedService(id) {
    this.Filter.selectedService = id;

    $('#myModal_services').css('display', 'block');
    this.Services.mouseenterservice1();

  }

  closePopup() {
    $('body').css('overflow', 'scroll')

    const popup = this.doc.querySelector('.popup-content');
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




  addsLoading() {

    var params = {
      viewpagess: '1',
    };
    this.allindia.getAdds(params).subscribe(responce => {
      let allAddsCategory = responce['expertyinfo'];
      this.interiorAdds = allAddsCategory['Interior Designers'];

      this.shuffleInterior(this.interiorAdds);
    })
  }

  shuffleInterior(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    this.interiorAdds = a;
  }



  tran(n) {
    $("div[data-page=" + n + "]").removeClass("closed").addClass("open");
    $("div.open[data-page!=" + n + "]").removeClass("open").addClass("closed");
  }

  // removeCity(parts: any){
  //    console.log(parts)

  //    this.storage.removeItem('CityNames');

  //    this.RecentCityStorage = this.RecentCityStorage.filter(item => item !== parts);

  //    // save it to the local storage recente search cities -->

  //    this.storage.setItem('CityNames', JSON.stringify(this.RecentCityStorage));


  //   console.log("filtered",this.RecentCityStorage)
  //   
  //    console.log("Deleted",itembyname)


  // }

  username: any;
  UserId: any;
  Login() {
    const loginid = this.storage?.getItem('loginID');

    if (loginid === '1') {
      this.userlogin = true;
      this.username = this.storage?.getItem("userName");
      this.UserId = this.storage?.getItem("userID");
    } else {
      this.userlogin = false;
    }
  }


  Logout() {
    this.storage.clear();
    if (isPlatformBrowser(this.platformId)) {
      window.location.reload();
    }
  }


  // JSON_LD() {
  //   const LocalBusiness = {
  //     "@context": "https://schema.org",
  //     "@type": "Organization",
  //     "name": "Homes247",
  //     "url": "https://www.homes247.in/",
  //     "logo": { "@type": "ImageObject", "url": "https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_mobile/images/Homes247_NewBlack_Logo.png", "width": 600, "height": 60 },
  //     "sameAs": [
  //       "https://www.facebook.com/Homes247.in",
  //       "https://www.twitter.com/homes247_in",
  //       "https://www.youtube.com/channel/UCv6oEM925HtkqUi3yRNDOBQ/",
  //       "https://www.linkedin.com/company/homes247/"
  //     ],
  //     "address": {
  //       "@type": "PostalAddress",
  //       "streetAddress": "21/1, Cunningham Rd, Shivaji Nagar, Bengaluru, Karnataka 560001",
  //       "addressLocality": "Brigade Road",
  //       "addressCountry": "IN",
  //       "addressRegion": "India",
  //       "postalCode": "560025"
  //     },
  //     "contactPoint": [
  //       {
  //         "@type": "ContactPoint",
  //         "telephone": "+91-9164-247-247",
  //         "contactType": "Customer Service",
  //         "areaServed": "India"
  //       }]
  //   }
  //   this.LocalBusinessLD = this.getSafeHTML(LocalBusiness);
  // }
  getSafeHTML(value: {}) {
    const json = value ? JSON.stringify(value, null, 2).replace(/<\/script>/g, '<\\/script>') : ''; // escape / to prevent script tag in JSON
    const html = `<script type="application/ld+json">${json}</script>`;
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
  onresize() {
    const width = this.window.innerWidth;
    if (width > 420) {
      this.hidemobile = true;
      this.hidedesktop = false;
    } else {
      this.hidemobile = false;
      this.hidedesktop = true;
    }
  }

  semanticjquery() {
    // $('.ui.dropdown').dropdown({});
    // var windowWidth = $(window).width();
    $(window).scroll(function () {
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

      if ($(this).scrollTop() > 140) {
        $('.fixed_section_main').css('display', 'block');
        $('.fixed_section_main').addClass('fixed_search');
        $('.Header_parts').addClass('box_shadow');
        $('.Header_parts').css('position', 'fixed');
        $('.Header_parts').css('display', 'block');
        $('.blur').css('display', 'none');

      } else {
        // 
        $('.blur').css('display', 'block');
        $('.Header_parts').removeClass('box_shadow');
        $('.Header_parts').css('display', 'none');
        $('.fixed_section_main').css('display', 'none');
      }
    });

    $(document).ready(function () {
      // Add smooth scrolling on all links inside the navbar
      $('#myNavbar a').on('click', function (event) {
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
          }, 800, function () {

            // Add hash (#) to URL when done scrolling (default click behavior)
            if (isPlatformBrowser(this.platformId)) {
              window.location.hash = hash;
            }

          });
        }  // End if
      });

      $('#myNavbar2 a').on('click', function (event) {
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
          }, 800, function () {

            // Add hash (#) to URL when done scrolling (default click behavior)
            if (isPlatformBrowser(this.platformId)) {
              window.location.hash = hash;
            }

          });
        }  // End if
      });

      $('#myNavbarpages a').on('click', function (event) {
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
          }, 800, function () {

            // Add hash (#) to URL when done scrolling (default click behavior)
            if (isPlatformBrowser(this.platformId)) {
              window.location.hash = hash;
            }

          });
        }  // End if
      });
    });
  }

  clickNavopen() {
    this.doc.getElementById('mySidenavsss').style.width = '250px';
    $('body').css('overflow', 'hidden')
  }

  ShowHide() {
    this.IsVisible = this.IsVisible ? false : true;
  }

  showhide() {
    if ($('#fixed-accordion').css('visibility') == 'hidden')
      $('#fixed-accordion').css('visibility', 'visible');
    else
      $('#fixed-accordion').css('visibility', 'hidden');
  }

  accordianshow() {
    $(function () {
      416.
      var Accordion = function (el, multiple) {
        this.el = el || {};
        this.multiple = multiple || false;

        // Variables privadas
        var links = this.el.find('.link');
        // Evento
        links.on('click', { el: this.el, multiple: this.multiple }, this.dropdown)
      }
      Accordion.prototype.dropdown = function (e) {
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

  activenav() {
    this.categoryurl = this.router.url;
    if (this.categoryurl == '/') {
      this.homeactive = true;
    }
    if (this.categoryurl == '/offers') {
      this.videoactive = true;
    }
    if (this.categoryurl == '/compare-properties') {
      this.searchactive = true;
    }
  }

  filterclick() {
    this.router.navigate(['/Filter']);
  }

  closeAndroidApp() {
    $('.androidApp').css('display', 'none');
  }

  openFixedNav() {
    document.getElementById('FixedmySidenavs').style.width = '250px';
  }
  //   closeFixedNav() {
  //     document.getElementById('FixedmySidenavs').style.width = '0';
  // }
  //   clickNavopen() {
  //     document.getElementById('mySidenavs').style.width = '250px';
  // }
  //   clickNavclose() {
  //     document.getElementById('mySidenavs').style.width = '0';
  // }

  clickNavclose() {
    this.doc.getElementById('mySidenavsss').style.width = '0';
    $('body').css('overflow', 'scroll')

  }

  battleInit() {
    // Remove .active class from the active li, select next li sibling.
    var next = $('ul li.best_price_icon_hover').removeClass('best_price_icon_hover').next('li');
    // Did we reach the last element? Of so: select first sibling
    if (!next.length) {
      next = next.prevObject.siblings(':first');
    }
    // Add .active class to the li next in line.
    next.addClass('best_price_icon_hover');
  }

  shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    this.classnames = a[0];
    $('.slider_section_main').addClass(this.classnames);
  }

  // ngOnDestroy() {
  //   if (this.id) {
  //     clearInterval(this.id);
  //   }
  // }

  getlocationlist() {

    // this.allindia.getlocationlist().subscribe((city: any[]) => {
    //   this.citiess = city['locations'];
    // });

    // this.allindia.getlocationlist().subscribe((city: any[]) => {
    //   this.citiesss = city['locations'];
    // });

    // this.allindia.getmajorrecentupdatelist().subscribe((recents: any[]) => {
    //   this.uploads = recents['recentproperties'];
    // });


    // this.allindia.gettrendingprojects().subscribe((trend: any[]) => {
    //   this.trending = trend['Trending'];
    // });


    // this.allindia.getpriorityprojects().subscribe((prior: any[]) => {
    //   this.handpicked = prior['Priority'];
    // });

    // this.allindia.getnewprojects().subscribe((launch: any[]) => {
    //   this.launched = launch['Newprojects'];
    // });

    // this.allindia.gettestimonials().subscribe(testi => {
    //   if (testi['status'] === 'True') {
    //     this.testimonialListing = testi['testimonial'];
    //   }
    // });
    // this.allindia.getrecentblogs().subscribe((blogs: any[]) => {
    //   if (blogs['status'] === 'True') {
    //     this.blogsloader = false;
    //     this.blogs = blogs['locations'];
    //     this.blogapiload = false;
    //   } else {
    //     this.blogsloader = true;
    //   }
    // });

    this.allindia.getAllExpert().subscribe((expertList: any[]) => {
      this.allExpertsData = expertList['services']
    })

    this.allindia.getmajorcities().subscribe((majorcity: any[]) => {
      this.majorcities = majorcity['locations'];
      this.CityBangalore = this.majorcities[0].propertycount;
      this.CityHyderabad = this.majorcities[1].propertycount;
      this.CityChennai = this.majorcities[2].propertycount;
      this.CityKochi = this.majorcities[3].propertycount;
      this.CityPune = this.majorcities[4].propertycount;
      this.CityDelhi = this.majorcities[5].propertycount;
      this.CityKolkata = this.majorcities[6].propertycount;
      this.CityMumbai = this.majorcities[7].propertycount;
      this.majorcities1 = this.majorcities.filter(function (el) {
        return el.major_cities == 2;
      });
    });



    this.allindia.getSpotLightProp().subscribe((majorcity: any[]) => {
      this.allSpotlightProp = majorcity['projectspotlight'];
    });

    this.allindia.gettopBuilders().subscribe((topBuilders: any[]) => {
      this.allBuilders = topBuilders['builderinfo'];
    })

    // let node4: any = document.createElement('link');
    // node4.setAttribute('href','https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css');
    // node4.rel = 'stylesheet';
    // node4.type = 'text/css';
    // document.getElementsByTagName('head')[0].appendChild(node4);

    this.registrationForm = this._formBuilder.group({
      // file: ['', Validators.required],
      coverImage: ['', Validators.required],
      // cover: ['', Validators.required],
      userName: ['', Validators.required],
      emailId: ['', Validators.required],
      userNumber: ['', Validators.required],
      companyName: ['', Validators.required],
      designation: ['', Validators.required],
      experience: ['', Validators.required],
      expertDescription: ['', Validators.required],
      expertTypeId: ['', Validators.required],
    });

  }

  async apartmentroute() {

    if (this.SelectCity === 'Select City') {
      const Swal = await this.getSwal();
      Swal.fire({
        title: 'Please Select city',
        icon: 'error',
        showConfirmButton: false,
        timer: 1500
      });
    }
  }

  async villasroute() {
    if (this.SelectCity === 'Select City') {
      const Swal = await this.getSwal();
      Swal.fire({
        title: 'Please Select city',
        icon: 'error',
        showConfirmButton: false,
        timer: 1500
      });
    }
  }

  async plotsroute() {
    if (this.SelectCity === 'Select City') {
      const Swal = await this.getSwal();
      Swal.fire({
        title: 'Please Select city',
        icon: 'error',
        showConfirmButton: false,
        timer: 1500
      });
    }
  }


  onChange(event) {
    const id = event.target.value;
    // this.allindia.gettopproperties(id).subscribe((topProperties: any[]) => {
    //   this.topProperties = topProperties['deatils'];
    //   var paramss = {
    //     cityId : id,
    //   };
    //   this.allindia.getnewproperties(paramss).subscribe((newProperties: any[]) => {
    //     this.newProperties = newProperties['deatils'];

    //     if (this.newProperties.length == 0) {
    //       this.newProperties = [];
    //     }
    //   });
    // });
  }

  // selectionChange(event) {
  //   this.cityservice.citybasedrouter(event.target.value);
  //   var city = event.target.value;
  //   this.cityyy = city.toLowerCase();
  // }

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
    // this.currentCitySearchNav = this.storage?.getItem('CityName').toLocaleLowerCase();
  }

  async getProjectsmain(SelectCity) {
    if (this.SelectCity === 'Select City') {
      const Swal = await this.getSwal();
      Swal.fire({
        title: 'Please Select city',
        icon: 'error',
        showConfirmButton: false,
        timer: 1500
      });
    }
  }


  getenquiry(id, name) {
    this.enquiry.propertyname = name;
  }

  config = {
    allowNumbersOnly: true,
    length: 6,
    isPasswordInput: false,
    disableAutoFocus: true,
    placeholder: '',
    inputStyles: {
      'width': '50px',
      'height': '50px'
    }
  };
  countdownconfig = {
    leftTime: 120,
    demand: true
  };

  onOtpChange(otp) {
    var param = this.user;
    param.otp = otp;
  }

  applinkClick() {
    if (isPlatformBrowser(this.platformId)) {
      window.location.hash = 'AppInstallLink';
      window.location.href = 'https://play.google.com/store/apps/details?id=vsnap.homes247.in&showAllReviews=true';
    }
  }



  async onCoverSelectFile(event) {
    if (event.target.files[0].size > 500000) {
      const Swal = await this.getSwal();
      Swal.fire({
        icon: 'error',
        title: 'Image Size is Too Big.',
        text: 'Image Size Should be Less than 500kb.',
        showConfirmButton: true,
      });
      this.fileInput.nativeElement.value = '';
    }
    else {
      if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();
        reader.onload = (event: any) => {
          this.CoverImage = [];
          this.CoverImage.push(event.target.result);
        };
        reader.readAsDataURL(event.target.files[0]);
      }
      if (event.target.files.length > 0) {
        const file = event.target.files[0];
        this.registrationForm.get('cover').setValue(file);
        this.imageUrls = ''
      }
    }
  }

  uploadResponse;
  async onSubmit() {
    if ($('#name').val() === '') {
      $('#name').focus().css('border-color', '#971b47').attr('placeholder', 'Please Enter the name');
      return false;
    } else {

    }
    if ($('#emailId').val() === '') {
      $('#emailId').focus().css('border-color', '#971b47').attr('placeholder', 'Please Enter email');
      return false;
    } else {
      const emailFilter = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if (emailFilter.test($('#emailId').val())) {
        $('#emailId').removeAttr('style');
      } else {
        $('#emailId').focus().css('border-color', '#971b47').attr('placeholder', 'Please enter valid email').val('');
        return false;
      }
    } if ($('#userNumber').val() == "") {
      $('#userNumber').focus().css("border-color", "#971b47").attr('placeholder', 'Please Enter Mobile Number');
      return false;
    }
    else {
      var mobilee = /^[0-9]{10}$/;
      if (mobilee.test($('#userNumber').val())) {
        $('#userNumber').removeAttr("style");
      }
      else {
        $('#userNumber').focus().css("border-color", "#971b47").attr('placeholder', 'Please enter valid Mobile number').val('');
        return false;
      }
    }
    // 
    if (this.experience == undefined) {
      this.experience = ''
    }
    if (this.userNumber == undefined) {
      this.userNumber = ''
    }
    if (this.companyName == undefined) {
      this.companyName = ''
    }
    if (this.designation == undefined) {
      this.designation = ''
    }
    if (this.expertDescription == undefined) {
      this.expertDescription = ''
    }
    if (this.registrationForm.value.expertTypeId == '') {
      this.expertID = '1'
    }
    else {
      this.expertID = this.registrationForm.value.expertTypeId
    }
    const formData = new FormData();
    formData.append('profile', this.registrationForm.get('cover').value);
    formData.append('expert_type', this.expertID);
    formData.append('expert_name', this.userName);
    formData.append('expert_contactno', this.userNumber);
    formData.append('expert_email', this.emailId);
    formData.append('expert_experience', this.experience);
    formData.append('expert_working_company', this.companyName);
    formData.append('expert_current_desg', this.designation);
    formData.append('expert_desc', this.expertDescription);
    if (this.CoverImage.length > 0) {

      this.allindia.registerExpert(formData).subscribe(async responce => {
        if (responce['status'] === 'True') {
          const Swal = await this.getSwal();
          Swal.fire({
            title: 'Details Updated Successfully',
            icon: 'success',
            showConfirmButton: false,
            timer: 2000
          });
          this.registrationForm.get('cover').setValue('')
          this.CoverImage = [];
          this.registrationForm.value.expertTypeId = 'Select Your Expertise'
          this.userName = ''
          this.userNumber = ''
          this.emailId = ''
          this.experience = ''
          this.companyName = ''
          this.designation = ''
          this.expertDescription = ''
          this.openRegisterModal = false;
          $('#example').addClass('out');
          $('body').removeClass('modal-active');
          $('.modal-backdrop').removeClass('modal-backdrop fade show');
          $('body').removeClass('bodyoverlay');
          $('.modal-active').removeClass('modal-active');
          $('body').removeClass('modal-open');
          document.getElementById('example').style.display = 'none';

        } else {
          const Swal = await this.getSwal();
          Swal.fire({
            title: 'Something Error Occured',
            icon: 'error',
            showConfirmButton: false,
            timer: 2000
          });
        }
      })
    } else {
      const Swal = await this.getSwal();
      Swal.fire({
        title: 'Please upload Profile Image',
        icon: 'error',
        showConfirmButton: false,
        timer: 2000
      });
    }
  }

  infoUp = true
  infoDown = false
  expUp = false
  expDown = true

  expertInfo() {
    this.infoUp = this.infoUp ? false : true;
    this.infoDown = this.infoDown ? false : true;

    this.expUp = false;
    this.expDown = true;
  }
  expertExp() {
    this.expUp = this.expUp ? false : true;
    this.expDown = this.expDown ? false : true;

    this.infoUp = false
    this.infoDown = true;
  }

  bestoffersOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    autoplay: true,
    autoplayTimeout: 3000,
    // animateIn: 'fadeIn',
    // animateOut: 'fadeOut',
    // navSpeed: 500,
    nav: false,
    navText: ['<img src=https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_mobile/images/leftarrow.png alt=\'LeftArrow\' class=\'owl-nav owl-prev bestoff_left-icon\'>',
      '<img src=https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_mobile/images/rightarrow.png alt=\'RightArrow\' class=\'owl-nav owl-next bestoff_right-icon\'>'],
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
      },
      // 1200: {
      //   items: 1
      // }
    },
  };
  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }







}