import { isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, HostListener, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, Meta, SafeHtml, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { LOCAL_STORAGE, WINDOW } from '@ng-toolkit/universal';
import { ChartType } from 'chart.js';
import { CountdownComponent, CountdownEvent } from "ngx-countdown";
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Subscription } from 'rxjs';
import { DataService } from '../data.service';
import { emiloan, enquiry } from './class';
declare var $: any;
declare const google: any;
declare var swal: any;
declare var $: any;
@Component({
  selector: 'app-prop-details',
  templateUrl: './prop-details.component.html',
  styleUrls: ['./prop-details.component.css']
})
export class PropDetailsComponent implements OnInit {
  @ViewChild('cd', { static: false }) private countdown: CountdownComponent;
  @ViewChild('cd2', { static: false }) private countdown2: CountdownComponent;
  @ViewChild('cd3', { static: false }) private countdown3: CountdownComponent;
  @ViewChild('cd4', { static: false }) private countdown4: CountdownComponent;
  @ViewChild('cd5', { static: false }) private countdown5: CountdownComponent;
  @ViewChild('cd6', { static: false }) private countdown6: CountdownComponent;
  @ViewChild('cancel') cancel: ElementRef;
  @ViewChild('cancelreviewmodel') cancelreviewmodel: ElementRef;
  // @ViewChild('restaurantmap') restaurantmap: ElementRef;
  // @ViewChild('schoolmap') schoolmap: ElementRef;
  // @ViewChild('hospitalmap') hospitalmap: ElementRef;
  // @ViewChild('mallmap') mallmap: ElementRef;
  // @ViewChild('bustopmap') bustopmap: ElementRef;
  @ViewChild('scrollapiloader') scrollapiloader: ElementRef;
  public doughnutChartType: ChartType = 'doughnut';

  private _subscription: Subscription;

  onebhk: boolean;
  twobhk: boolean;
  threebhk: boolean;
  fourbhk: boolean;
  fivebhk: boolean;
  plots: boolean;
  seeMoreLess1: boolean = false;
  seeMoreLess2: boolean = false;
  seeMoreLess3: boolean = false;
  seeMoreLess4: boolean = false;
  seeMoreLess5: boolean = false;

  readmoreamenities = true;
  readlessamenities = false;
  public currentActive = 0;
  imageforstructuredata: any;
  locidbread: any;
  builderbread: any;
  builderidbread: any;
  regionbread: any;
  regionidbread: any;
  statusbread: any;
  statusidbread: any;
  image: any;
  alttag: any;
  bhk: any;
  citybread: any;
  localitybread: any;

  latit: number;
  lngit: number;
  lat: number;
  lng: number;
  mapicon: any;
  hidedesktop: boolean;
  userName;
  userEmail;
  reviewDetails;
  ratingValue;
  propidarray = [];
  jsonparse = [];
  addstoragearr: any;
  reviewbutton: any;
  loginbutton: any;
  numbernan = false;
  useremail: any;
  usernumber: any;
  username: any;
  lastname: any;
  userpass: any;
  reuserpass: any;
  showalert = false;
  email: any;
  pass: any;
  Username: any;
  Usernum: any;
  Useremail: any;
  Userid: any;
  mobilenumber: any;
  eusernumber: any;
  loginotp: any;
  reviews: any;
  averagerating: any;
  totaluserratings: any;

  storagearr = [];
  seenproparr = [];
  propStatus = false;
  propPrice = false;
  propLocation = false;
  propHomeLoans = false;
  propLegalApprovals = false;
  propPossession = false;
  propConfiguration = false;
  questionCategory = [];
  showfillanswer = false;
  zeroareafield = false;
  valueareafield = false;
  zeropricefield = false;
  zerodimension = false;
  valuedimension = false;
  nozeroval = false;
  zeroval = false;
  pricefield = false;
  bhkvalue = false;
  zerobhkval = false;
  approvalvalue = false;
  zeroapprovalvalue = false;
  possesionval = false;
  possesionzeroval = false;
  ShowAnswerDiv = false;
  showmainpage = true;
  showratingandreview = false;
  showallratings = false;
  showonlyratings = true;
  showmorerating = false;
  showanswer = false;
  zeroanswer = false;
  readallans = false;
  giveanswer = false;
  emi = new emiloan();
  monthlyAmount: any;
  interestpayable: any;
  totalAmount: any;
  doughnutChartLabels: any;
  doughnutChartData: any;
  chartColors: any;
  chartOptions: any;
  propertyType;
  downArrow = true;
  upperArrow = false;
  hidemobile: boolean;
  propID: any;
  builderId: any;
  propName: any;
  ContactForm: FormGroup;
  AnswerForm: FormGroup;
  submitted = false;
  routeSub: any;
  floatbar: boolean;
  restcount: any;
  schoolcount: any;
  hoscount: any;
  mallcount: any;
  buscount: any;

  apiloaded = false;
  divreached = false;
  loaded = false;
  galleryload = false;
  showLoader = true;
  FooterComponent: any;

  ImageUrl = this.Service.imagesURL + 'uploadPropertyImgs/';
  masterimages = this.Service.imagesURL + 'masterImgs/';
  uploadBHKImages = this.Service.imagesURL + 'uploadBHKImgs/';
  amenitesImages = this.Service.amenitiesImageURL + 'amenites//amenities-new/';
  bankImages = this.Service.imagesURL + "banks/";
  videoimgUrl = 'https://img-mb.homes247.in/images/property_youtube/';
  builderlogo = 'https://img-mb.homes247.in/images/builder/';
  propDetails: any;
  propertiesDetails: any;
  listOfPropertiesFromBuilders: any;
  listOfSimilarProperties: any;
  start: any;
  endone: any;
  endtwo: any;
  endthree: any;
  endfour: any;
  endfive: any;
  endplots: any;
  mapurl: any;
  reviewcount: any;
  question: any;
  questionid: any;
  questionlist: any;
  userquestion: any;
  otherquestion: any;
  useranswer: any;
  answerform: FormGroup;
  loginId: any;

  hideshowcompare: boolean = false;
  compareShowonimg: boolean = false;
  // propertiesDetails: any;
  // image: any;
  // propName: any;
  compareloader1: boolean = true;
  compareloader2: boolean = true;
  compareloader3: boolean = true;
  propertyname1: any;
  propimag1: any;
  propertyname2: any;
  propimag2: any;
  propertyname3: any;
  propimag3: any;
  comparePropType: any;
  compareStorageArry: any;
  // propID: any;
  propid1: any;
  compareprop1: boolean = false;
  compareprop2: boolean = false;
  compareprop3: boolean = false;
  propid2: any;
  propid3: any;
  showselectitem: boolean = false;
  showcomparenow: boolean = false;
  addedShow: boolean = false;
  proptype1: any;
  proptype2: any;
  proptype3: any;
  showadded: boolean = false;
  compareproparray: any;
  cityname: any;
  locationnamelowcase: any;
  Citynamelowcase: any;
  Videoloader: boolean;
  userlocation = '';
  showallquestionansdiv: boolean;
  readallqestionanstextshow: boolean = false;
  apartmentbhkoptions: boolean;
  villabhkoptions: boolean;
  plotareaoptions: boolean;
  Nearbylocalities: any;
  nearbylocationlenght: any;
  showfloorplane: boolean;
  hidefloorplane: boolean;
  oneBHKVal = [];
  twoBHKVal = [];
  threeBHKVal = [];
  fourBHKVal = [];
  fiveBHKVal = [];
  PLOTSVal = [];
  hideOneBhkSeeMore: boolean;
  hideTwoBhkSeeMore: boolean;
  hideThreeBhkSeeMore: boolean;
  hideFourBhkSeeMore: boolean;
  hideFiveBhkSeeMore: boolean;
  hidePLOTSValSeeMore: boolean;
  localstorediv: any;
  UserId: any;
  userfav: any;
  currenturl: any;




  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const elementPosition = this.scrollapiloader.nativeElement.offsetTop;
    const scrollPosition = window.pageYOffset;
    if (this.divreached = scrollPosition >= elementPosition) {
      if (this.apiloaded == false) {
        this.apiloaded = true;
        this.showLoader = false;
        this.galleryload = true;
        let propertyid = this.propID;
        let BuilderID = this.builderId;
        this.Service.getpropertiesByBuilders(propertyid, BuilderID).subscribe(BuilderSimilarproperties => {
          this.listOfPropertiesFromBuilders = BuilderSimilarproperties['BuilderSimilarproperties'];
        });
        this.Service.getsimilarProp(propertyid).subscribe(SimilarProperties => {
          this.listOfSimilarProperties = SimilarProperties['SimilarProperties'];
        });
        const video_wrapper = $('#iFrameBlog');
        if (video_wrapper.length) {
          video_wrapper.html('<iframe width="100%" height="360" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="' + this.mapurl + '"></iframe>');
        }

      }
    }
    if ($(window).scrollTop() >= $('#section1').offset().top + $('#section1').outerHeight() - window.innerHeight && $(window).scrollTop() < $('#section2').offset().top - 250) {
      this.currentActive = 1;
    } else if ($(window).scrollTop() >= $('#section2').offset().top + $('#section2').outerHeight() - window.innerHeight && $(window).scrollTop() < $('#section7').offset().top - 250) {
      this.currentActive = 2;
    } else if ($(window).scrollTop() >= $('#section7').offset().top + $('#section7').outerHeight() - window.innerHeight && $(window).scrollTop() < $('#section3').offset().top - 250) {
      this.currentActive = 7;
    } else if ($(window).scrollTop() >= $('#section3').offset().top + $('#section3').outerHeight() - window.innerHeight && $(window).scrollTop() < $('#section4').offset().top - 250) {
      this.currentActive = 3;
    } else if ($(window).scrollTop() >= $('#section4').offset().top + $('#section4').outerHeight() - window.innerHeight && $(window).scrollTop() < $('#section5').offset().top - 250) {
      this.currentActive = 4;
    } else if ($(window).scrollTop() >= $('#section5').offset().top + $('#section5').outerHeight() - window.innerHeight && $(window).scrollTop() < $('#section11').offset().top - 250) {
      this.currentActive = 5;
    } else if ($(window).scrollTop() >= $('#section11').offset().top + $('#section11').outerHeight() - window.innerHeight && $(window).scrollTop() < $('#section6').offset().top - 250) {
      this.currentActive = 11;
    } else if ($(window).scrollTop() >= $('#section6').offset().top + $('#section6').outerHeight() - window.innerHeight && $(window).scrollTop() < $('#section8').offset().top - 250) {
      this.currentActive = 6;
    } else if ($(window).scrollTop() >= $('#section8').offset().top + $('#section8').outerHeight() - window.innerHeight && $(window).scrollTop() < $('#section9').offset().top - 250) {
      this.currentActive = 8;
    } else if ($(window).scrollTop() >= $('#section9').offset().top + $('#section9').outerHeight() - window.innerHeight && $(window).scrollTop() < $('#section10').offset().top - 250) {
      this.currentActive = 9;
    } else if ($(window).scrollTop() >= $('#section10').offset().top + $('#section10').outerHeight() - window.innerHeight) {
      this.currentActive = 10;
    } else {
      this.currentActive = 0;
    }
  }
  productLD: SafeHtml;
  articleLD: SafeHtml;
  faqLD: SafeHtml;
  videoLD: SafeHtml;
  questionsrandom: any;
  faqs: any;

  constructor(
    private sanitizer: DomSanitizer,
    private titleService: Title,
    private meta: Meta,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public Service: DataService,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(WINDOW) private window: Window,
    @Inject(LOCAL_STORAGE) private Local_Storage: any,
  ) {
    this.userName = '';
    this.userEmail = '';
    this.reviewDetails = '';
    this.ratingValue = '';

    this.listOfPropertiesFromBuilders = [];
    this.listOfSimilarProperties = [];
    this.router.events.subscribe((evt) => {
      // trick the Router into believing it's last link wasn't previously loaded
      this.router.navigated = false;
      // if you need to scroll back to top, here is the right place
      this.window.scrollTo(0, 0);
    });
  }

  // scrollTo(section): void {
  //   document.querySelector('#' + section)
  //   .scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest"});
  // }

  ngOnInit() {
    this.metatags();
    this.getPropDetails();
    this.reviewfetch();
    this.getquestionlist();
    this.addAllSeenProjects();
    this.emidefault();
    this.chartload();
    this.stickyload();
    this.onresize();
    this.getrate();
    this.contactshowhide();
    this.logincheck();
    this.specialfunctions();
    this.currenturl = this.router.url;
    // this.getNearByLocalities();
    this.ContactForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.pattern(/[\w-\.]+@[a-zA-Z_]+?\.[a-zA-Z]+/)]),
      'phone': new FormControl(null, [Validators.required]),
      'firstName': new FormControl(null, [Validators.required]),
    });
    this.AnswerForm = new FormGroup({
      useranswer: new FormControl(),
    });
  }
  scrollTo(section): void {
    document.querySelector('#' + section)
      .scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
    // if(this.currentActive === 1){
    //   $('#section1').addClass('sectionheight');
    // }else if(this.currentActive === 2){
    //   $('#section2').addClass('sectionheight');
    // }else if(this.currentActive === 3){
    //   $('#section3').addClass('sectionheight');
    // }else if(this.currentActive === 4){
    //   $('#section4').addClass('sectionheight');
    // }else if(this.currentActive == 5){
    //   $('#section5').addClass('sectionheight');
    // }else if(this.currentActive === 6){
    //   $('#section6').addClass('sectionheight');
    // }else if(this.currentActive === 7){
    //   $('#section7').addClass('sectionheight');
    // }else if(this.currentActive === 8){
    //   $('#section8').addClass('sectionheight');
    // }else if(this.currentActive === 9){
    //   $('#section9').addClass('sectionheight');
    // }else if(this.currentActive === 10){
    //   $('#section10').addClass('sectionheight');
    // }else if(this.currentActive === 11){
    //   $('#section11').addClass('sectionheight');
    // }else
    // $(window).scroll(function() {
    //   $('#section1').removeClass('sectionheight');
    //   $('#section2').removeClass('sectionheight');
    //   $('#section3').removeClass('sectionheight');
    //   $('#section4').removeClass('sectionheight');
    //   $('#section5').removeClass('sectionheight');
    //   $('#section6').removeClass('sectionheight');
    //   $('#section7').removeClass('sectionheight');
    //   $('#section8').removeClass('sectionheight');
    //   $('#section9').removeClass('sectionheight');
    //   $('#section10').removeClass('sectionheight');
    //   $('#section11').removeClass('sectionheight');
    // });
  }

  metatags() {
    this.routeSub = this.activatedRoute.params.subscribe(params => {
      var lasturl = params['propName-:param'];
      var propid = lasturl.split('-').pop().match(/[0-9]+/);
      this.Service.getproperty(propid).subscribe(meta => {
        let metaDetails = meta['deatils'];
        if (metaDetails[0].seotitle == '') {
          this.titleService.setTitle(metaDetails[0].propertyName + " " + metaDetails[0].locality_name + ", " + metaDetails[0].city_name + " | Price, Reviews & Floorplans | Homes247.in");
          this.meta.updateTag({ name: 'description', content: "Explore " + metaDetails[0].propertyName + " " + metaDetails[0].locality_name + ", " + metaDetails[0].city_name + " Check out the Best " + metaDetails[0].propertyType + ", Download Brochure, Best Price, Amenities, and Exclusive Deals at Homes247.in" });
          this.meta.updateTag({
            property: 'og:image',
            content: this.Service.imagesURL + 'uploadPropertyImgs/' + metaDetails[0].images[0].name
          });
          this.meta.updateTag({ property: 'og:title', content: metaDetails[0].propertyName + " " + metaDetails[0].locality_name + ", " + metaDetails[0].city_name + " | Price, Reviews & Floorplans" });
          this.meta.updateTag({ property: 'og:description', content: "Explore " + metaDetails[0].propertyName + " " + metaDetails[0].locality_name + ", " + metaDetails[0].city_name + " Check out the Best " + metaDetails[0].propertyType + ", Download Brochure, Best Price, Amenities, and Exclusive Deals at Homes247.in" });
        } else if (metaDetails[0].seotitle == null) {
          this.titleService.setTitle(metaDetails[0].propertyName + " " + metaDetails[0].locality_name + ", " + metaDetails[0].city_name + " | Price, Reviews & Floorplans | Homes247.in");
          this.meta.updateTag({ name: 'description', content: "Explore " + metaDetails[0].propertyName + " " + metaDetails[0].locality_name + ", " + metaDetails[0].city_name + " Check out the Best " + metaDetails[0].propertyType + ", Download Brochure, Best Price, Amenities, and Exclusive Deals at Homes247.in" });
          this.meta.updateTag({
            property: 'og:image',
            content: this.Service.imagesURL + 'uploadPropertyImgs/' + metaDetails[0].images[0].name
          });
          this.meta.updateTag({ property: 'og:title', content: metaDetails[0].propertyName + " " + metaDetails[0].locality_name + ", " + metaDetails[0].city_name + " | Price, Reviews & Floorplans" });
          this.meta.updateTag({ property: 'og:description', content: "Explore " + metaDetails[0].propertyName + " " + metaDetails[0].locality_name + ", " + metaDetails[0].city_name + " Check out the Best " + metaDetails[0].propertyType + ", Download Brochure, Best Price, Amenities, and Exclusive Deals at Homes247.in" });
        } else {
          this.titleService.setTitle(metaDetails[0].seotitle);
          this.meta.updateTag({ name: 'description', content: metaDetails[0].seodescription });
          this.meta.updateTag({
            property: 'og:image',
            content: this.Service.imagesURL + 'uploadPropertyImgs/' + metaDetails[0].images[0].name
          });
          this.meta.updateTag({ property: 'og:title', content: metaDetails[0].seotitle });
          this.meta.updateTag({ property: 'og:description', content: metaDetails[0].seodescription });
        }
        this.Service.createLinkForCanonicalURL();
        const productjson = {
          "@context": "https://schema.org/",
          "@type": "RealEstateAgent",
          "name": metaDetails[0].propertyName,
          "image": [
            this.Service.imagesURL + 'uploadPropertyImgs/' + metaDetails[0].images[0].name
          ],
          "telephone": "9164247247",
          "url": "https://www.homes247.in",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": metaDetails[0].locality_name + "," + metaDetails[0].city_name,
            "addressLocality": metaDetails[0].locality_name,
            "postalCode": "560067",
            "addressRegion": metaDetails[0].city_name,
            "addressCountry": "IN"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": this.averagerating,
            "reviewCount": this.totaluserratings
          },
          "priceRange": metaDetails[0].min_price,
          "openingHoursSpecification": [{
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            "opens": "10:00",
            "closes": "18:30"
          },
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Sunday"],
            "opens": "10:00", "closes": "18:00"
          }
          ],
          "ContactPoint": {
            "@type": "ContactPoint",
            "contactType": "sales",
            "telephone": "+91-9164-247-247",
            "areaServed": ["IN", "US", "UK", "AUS", "CAN", "UAE", "SIN"],
            "contactOption": ["HearingImpairedSupported", "TollFree"],
            "availableLanguage": "English"
          }
        }
        this.productLD = this.getSafeHTML(productjson);
        const articlejson = {
          "@context": "https://schema.org/",
          "@type": "Article",
          "url": "https://www.homes247.in" + this.router.url,
          "datePublished": metaDetails[0].publisheddate,
          "dateModified": metaDetails[0].updateddate,
          "headline": metaDetails[0].propertyName,
          "author": {
            "@type": "Person",
            "name": "Priyatham Kumar"
          },
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "https://www.homes247.in" + this.router.url
          },
          "publisher": {
            "@type": "Organization",
            "name": "Homes247",
            "logo": {
              "@type": "ImageObject",
              "url": "https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_mobile/images/logo/logo-blue-orange.png"
            }
          },

          "image": {
            "@type": "ImageObject",
            "url": this.Service.imagesURL + 'uploadPropertyImgs/' + metaDetails[0].images[0].name,
            "width": "710",
            "height": "400"
          },
        }
        this.articleLD = this.getSafeHTML(articlejson);
        const bhkfilter = metaDetails[0]['BHK_Deatils'].map(item => item.BHK).filter((value, index, self) => self.indexOf(value) === index);
        const approvals = metaDetails[0]['Approvals_Deatils'].map(item => item.Name);
        const banks = metaDetails[0]['Bank_Deatils'].map(item => item.Name);
        const faqquestions = {
          "faqresults": [
            {
              "question": 'Where is ' + metaDetails[0].propertyName + ' located?',
              "answer": metaDetails[0].propertyName + ' is located at ' + metaDetails[0].locality_name + ',' + metaDetails[0].city_name + '.'
            },
            {
              "question": 'How many apartments does ' + metaDetails[0].propertyName + ' have?',
              "answer": 'There are ' + metaDetails[0].total_apartments + ' apartments in ' + metaDetails[0].propertyName + '.'
            },
            {
              "question": 'Which are the BHK configurations at ' + metaDetails[0].propertyName + ' ?',
              "answer": 'There are ' + bhkfilter + ' in ' + metaDetails[0].propertyName + '.'
            },
            {
              "question": 'What is the Price of ' + metaDetails[0].propertyName + ' ?',
              "answer": 'The price of ' + metaDetails[0].propertyName + ' ranges from ' + metaDetails[0].price_min + ' to ' + metaDetails[0].price_max + '.'
            },
            {
              "question": 'What is the project status and possession time of ' + metaDetails[0].propertyName + ' ?',
              "answer": metaDetails[0].propertyName + ' Possession Time is ' + metaDetails[0].PossessionDate + ' , and the status is ' + metaDetails[0].Status + '.'
            },
            {
              "question": 'Is ' + metaDetails[0].propertyName + ' RERA Registered?',
              "answer": 'Yes, ' + metaDetails[0].propertyName + ' is RERA Registered.'
            },
            {
              "question": 'Which are the Regulatory Authorities that have approved ' + metaDetails[0].propertyName + ' ?',
              "answer": 'The Approving Authority for ' + metaDetails[0].propertyName + ' are ' + approvals + '.'
            },
            {
              "question": 'Which banks have approved loans for ' + metaDetails[0].propertyName + ' ?',
              "answer": 'These are the approved banks - ' + banks + '.'
            },
          ]
        };
        this.questionsrandom = faqquestions.faqresults;
        this.shuffle(this.questionsrandom);
        this.faqs = this.questionsrandom.slice(0, 3);
        // 
        const faqjson = {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [{
            "@type": "Question",
            "name": this.faqs[0].question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": this.faqs[0].answer
            }
          }, {
            "@type": "Question",
            "name": this.faqs[1].question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": this.faqs[1].answer
            }
          }, {
            "@type": "Question",
            "name": this.faqs[2].question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": this.faqs[2].answer
            }
          }]
        }
        this.faqLD = this.getSafeHTML(faqjson);
        const videojson = {
          "@context": "https://schema.org",
          "@type": "VideoObject",
          "name": metaDetails[0].propertyName + " " + metaDetails[0].locality_name + ", " + metaDetails[0].city_name + " | Price, Reviews & Floorplans | Homes247.in",
          "description": "Explore " + metaDetails[0].propertyName + " " + metaDetails[0].locality_name + ", " + metaDetails[0].city_name + " Check out the Best " + metaDetails[0].propertyType + ", Download Brochure, Best Price, Amenities, and Exclusive Deals at Homes247.in",
          "thumbnailUrl": this.videoimgUrl + metaDetails[0].video_thumbnail,
          "uploadDate": metaDetails[0].updateddate,
          "duration": "PT1M54S",
          "contentUrl": metaDetails[0].video_URL,
          "embedUrl": metaDetails[0].video_URL,
          "interactionStatistic": {
            "@type": "InteractionCounter",
            "interactionType": {
              "@type": "http://schema.org/WatchAction"
            },
            "userInteractionCount": 5647018
          },
          "regionsAllowed": "IN,US,NL,UK,AUS,CAN,UAE,SIN"
        }
        this.videoLD = this.getSafeHTML(videojson);
      })
    });
    import('../footer/footer.module').then(mod => mod.FooterModule).then(FooterModule => {
      this.FooterComponent = FooterModule.components['lazy'];
      this.loaded = true;
    });
  }

  getSafeHTML(value: {}) {
    const json = value ? JSON.stringify(value, null, 2).replace(/<\/script>/g, '<\\/script>') : ''; // escape / to prevent script tag in JSON
    const html = `<script type="application/ld+json">${json}</script>`;
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    // return a;
    this.questionsrandom = a;
  }

  getPropDetails() {
    this.imageforstructuredata = this.ImageUrl.replace("https://img.gs/gzsqchnjxv/full/", "");
    this.routeSub = this.activatedRoute.params.subscribe(params => {
      var cityname = params['cityname'];
      var localityname = params['locality'];
      var lasturl = params['propName-:param'];
      var propid = lasturl.split('-').pop().match(/[0-9]+/);
      this.propID = propid;
      this.Service.getproperty(propid).subscribe(prop => {
        let propDetails = prop['deatils'];
        this.propertiesDetails = propDetails;
        this.image = propDetails[0].images[0].name;
        this.propName = this.propertiesDetails[0]['propertyName'];
        this.propertyType = this.propertiesDetails[0]['propertyType'];
        this.builderId = this.propertiesDetails[0]['BuliderId'];
        if (this.propertyType === 'Apartments') {
          this.apartmentbhkoptions = true;
          this.apartmentselect = true;
          this.propertytypeselected = 'Apartment';
        } else if (this.propertyType === 'Villas') {
          this.villabhkoptions = true;
          this.villaselect = true;
          this.propertytypeselected = 'Villa';
        } else if (this.propertyType === 'Plots') {
          this.plotareaoptions = true;
          this.plotselect = true;
          this.propertytypeselected = 'Plot';
        }
        if (this.propertiesDetails[0]['area_min'] == '0' || this.propertiesDetails[0]['area_max'] == '0') {
          this.zeroareafield = true;
          this.valueareafield = false;
        } else {
          this.valueareafield = true;
          this.zeroareafield = false;
        }
        if (this.propertiesDetails[0]['min_price'] == '0' || this.propertiesDetails[0]['max_price'] == '0') {
          this.pricefield = false;
          this.zeropricefield = true;
        } else {
          this.pricefield = true;
          this.zeropricefield = false;
        }
        if (this.propertiesDetails[0]['dimension'] == '0') {
          this.zerodimension = true;
          this.valuedimension = false;
        } else {
          this.zerodimension = false;
          this.valuedimension = true;
        }
        if (this.propertiesDetails[0]['total_apartments'] == '0') {
          this.zeroval = true;
          this.nozeroval = false;
        } else {
          this.zeroval = false;
          this.nozeroval = true;
        }
        if (this.propertiesDetails[0]['PossessionDate'] == '0') {
          this.possesionval = false;
          this.possesionzeroval = true;
        } else {
          this.possesionval = true;
          this.possesionzeroval = false;
        }
        if (this.propertiesDetails[0]['BHK_Deatils'].length != 0) {
          this.bhkvalue = true;
          this.zerobhkval = false;
          this.showfloorplane = true;
          this.hidefloorplane = false;
        } else {
          this.bhkvalue = false;
          this.zerobhkval = true;
          this.showfloorplane = false;
          this.hidefloorplane = true;
        }
        if (this.propertiesDetails[0]['Approvals_Deatils'].length != 0) {
          this.approvalvalue = true;
          this.zeroapprovalvalue = false;
        } else {
          this.approvalvalue = false;
          this.zeroapprovalvalue = true;
        }
        var apicityname = this.propertiesDetails[0].city_name;
        var apinamecity = apicityname.toLowerCase();
        this.Citynamelowcase = apinamecity
        var apilocalityname = this.propertiesDetails[0].locality_name;
        var apilocality = apilocalityname.replace(/\s+/g, '-').toLowerCase();
        this.locationnamelowcase = apilocality;
        var apipropname = this.propertiesDetails[0].propertyName;
        var apipropertyname = apipropname.replace(/\s+/g, '-').toLowerCase();
        var localityid = this.propertiesDetails[0].LoaclityId;
        this.locidbread = localityid;

        var buildername = this.propertiesDetails[0].BuliderName;
        var builderlower = buildername.replace(/\s+/g, '-').toLowerCase();
        this.builderbread = builderlower;
        this.builderidbread = this.propertiesDetails[0].BuliderId;
        var regioname = this.propertiesDetails[0].RegionName;
        var lowerregion = regioname.replace(/\s+/g, '-').toLowerCase();
        this.regionbread = lowerregion;
        this.regionidbread = this.propertiesDetails[0].RegionID;
        var statusname = this.propertiesDetails[0].Status;
        var lowerstatus = statusname.replace(/\s+/g, '-').toLowerCase();
        this.statusbread = lowerstatus;
        this.statusidbread = this.propertiesDetails[0].StatusId;
        let propidnamejoin = apipropertyname + "-" + propid;
        if (cityname != apinamecity) {
          this.router.navigate(['/property/' + apinamecity + '/' + apilocality + '/' + apipropertyname + "-" + propid]);
        } else if (localityname != apilocality) {
          this.router.navigate(['/property/' + apinamecity + '/' + apilocality + '/' + apipropertyname + "-" + propid]);
        } else if (lasturl != propidnamejoin) {
          this.router.navigate(['/property/' + apinamecity + '/' + apilocality + '/' + apipropertyname + "-" + propid]);
        } else { }
        if (this.propertiesDetails[0].BHK_Deatils.find(ob => ob['BHK'] === '1 BHK')) {
          this.onebhk = true;
        }
        if (this.propertiesDetails[0].BHK_Deatils.find(ob => ob['BHK'] === '2 BHK')) {
          this.twobhk = true;
        }
        if (this.propertiesDetails[0].BHK_Deatils.find(ob => ob['BHK'] === '3 BHK')) {
          this.threebhk = true;
        }
        if (this.propertiesDetails[0].BHK_Deatils.find(ob => ob['BHK'] === '4 BHK')) {
          this.fourbhk = true;
        }
        if (this.propertiesDetails[0].BHK_Deatils.find(ob => ob['BHK'] === '5 BHK')) {
          this.fivebhk = true;
        }
        if (this.propertiesDetails[0].BHK_Deatils.find(ob => ob['BHK'] === 'PLOTS')) {
          this.plots = true;
        }

        this.lat = propDetails[0].latitude * 1;
        this.lng = propDetails[0].longitude * 1;
        this.mapurl = 'https://www.google.com/maps?hl=en&amp;q=' + this.lat + ',' + this.lng + '&amp;t=&amp;z=12&amp;ie=UTF8&amp;iwloc=B&amp;output=embed';
        this.start = 0;
        this.endone = 3;
        this.endtwo = 3;
        this.endthree = 3;
        this.endfour = 3;
        this.endfive = 3;
        this.endplots = 3;
        this.alttag = propDetails[0].images[0].alttag;
        // this.bhk = propDetails[0].BHK_Deatils[0].BHK;
        this.Service.getNearByLocalities(this.locidbread).subscribe(prop => {
          this.Nearbylocalities = prop['details'];
          this.nearbylocationlenght = prop['details'].length;
        });
        for (let i = 0; i < this.propertiesDetails[0]['BHK_Deatils'].length; i++) {
          if (this.propertiesDetails[0]['BHK_Deatils'][i]['BHK'] === '1 BHK') {
            this.oneBHKVal.push(this.propertiesDetails[0]['BHK_Deatils'][i]['BHK']);
          } else if (this.propertiesDetails[0]['BHK_Deatils'][i]['BHK'] === '2 BHK') {
            this.twoBHKVal.push(this.propertiesDetails[0]['BHK_Deatils'][i]['BHK']);
          } else if (this.propertiesDetails[0]['BHK_Deatils'][i]['BHK'] === '3 BHK') {
            this.threeBHKVal.push(this.propertiesDetails[0]['BHK_Deatils'][i]['BHK']);
          } else if (this.propertiesDetails[0]['BHK_Deatils'][i]['BHK'] === '4 BHK') {
            this.fourBHKVal.push(this.propertiesDetails[0]['BHK_Deatils'][i]['BHK']);
          } else if (this.propertiesDetails[0]['BHK_Deatils'][i]['BHK'] === '5 BHK') {
            this.fiveBHKVal.push(this.propertiesDetails[0]['BHK_Deatils'][i]['BHK']);
          } else if (this.propertiesDetails[0]['BHK_Deatils'][i]['BHK'] === 'PLOTS') {
            this.PLOTSVal.push(this.propertiesDetails[0]['BHK_Deatils'][i]['BHK']);
          }
          if (this.oneBHKVal.length <= 3) {
            this.hideOneBhkSeeMore = false;
          } else {
            this.hideOneBhkSeeMore = true;
          }
          if (this.twoBHKVal.length <= 3) {
            this.hideTwoBhkSeeMore = false;
          } else {
            this.hideTwoBhkSeeMore = true;
          }
          if (this.threeBHKVal.length <= 3) {
            this.hideThreeBhkSeeMore = false;
          } else {
            this.hideThreeBhkSeeMore = true;
          }
          if (this.fourBHKVal.length <= 3) {
            this.hideFourBhkSeeMore = false;
          } else {
            this.hideFourBhkSeeMore = true;
          }
          if (this.fiveBHKVal.length <= 3) {
            this.hideFiveBhkSeeMore = false;
          } else {
            this.hideFiveBhkSeeMore = true;
          }
          if (this.PLOTSVal.length <= 3) {
            this.hidePLOTSValSeeMore = false;
          } else {
            this.hidePLOTSValSeeMore = true;
          }
        }
      });
    });
  }
  Explorelocation() {
    this.router.navigate(['/' + this.Citynamelowcase + "/property-sale-in-" + this.locationnamelowcase + "-" + this.locidbread]);
  }
  ExploreNearBylocation(id) {
    this.router.navigate(['/' + this.Citynamelowcase + "/property-sale-in-" + this.locationnamelowcase + "-" + id]);
  }
  ratingreviews = true;
  reviewfetch() {
    this.Service.reviewfetching(this.propID).subscribe(response => {
      this.reviews = response['rating'];
      if (!this.reviews.length) {
        this.ratingreviews = false;
      } else {
        this.ratingreviews = true;
      }
      if (this.reviews.length > 3) {
        this.showmorerating = true;
      }
      this.reviewcount = this.reviews.length;
      //
      const fivestar = '5';
      const fivestarcount = this.reviews.filter((obj) => obj.Rating === fivestar).length;
      const fourstar = '4';
      const fourstarcount = this.reviews.filter((obj) => obj.Rating === fourstar).length;
      const thirdstar = '3';
      const threestarcount = this.reviews.filter((obj) => obj.Rating === thirdstar).length;
      const twostar = '2';
      const twostarcount = this.reviews.filter((obj) => obj.Rating === twostar).length;
      const onestar = '1';
      const onestarcount = this.reviews.filter((obj) => obj.Rating === onestar).length;
      // 
      // 
      // 
      // 
      // 
      const totalratings = fivestarcount + fourstarcount + threestarcount + twostarcount + onestarcount;
      this.totaluserratings = totalratings;
      // 
      // this.averagerating = (5*fivestarcount + 4*fourstarcount + 3*threestarcount + 2*twostarcount + 1*onestarcount) / totalratings;
      this.averagerating = (Math.round(5 * fivestarcount + 4 * fourstarcount + 3 * threestarcount + 2 * twostarcount + 1 * onestarcount) / totalratings).toFixed(1);
      // 
      if (isNaN(parseFloat(this.averagerating))) {
        this.numbernan = true;
        this.averagerating = '0';
        this.totaluserratings = '0';
      }
    });
  }
  // showallRatings(){
  // if(this.reviews.length > 3){
  //   this.showallratings = true;
  //   this.showonlyratings = false;
  //   this.showmorerating = false;
  // }
  // }
  // showlessRatings(){
  //   this.showallratings = false;
  //   this.showonlyratings = true;
  //   this.showmorerating = true;
  //   this.scrollTo('section9');
  // }
  floorseemore1() {
    this.endone = 50;
  }

  floorseemore2() {
    this.endtwo = 50;
  }

  floorseemore3() {
    this.endthree = 50;
  }

  floorseemore4() {
    this.endfour = 50;
  }

  floorseemore5() {
    this.endfive = 50;
  }

  floorseemoreplots() {
    this.endplots = 50;
  }

  floorseeless1() {
    this.endone = 3;
  }

  floorseeless2() {
    this.endtwo = 3;
  }

  floorseeless3() {
    this.endthree = 3;
  }

  floorseeless4() {
    this.endfour = 3;
  }

  floorseeless5() {
    this.endfive = 3;
  }

  floorseelessplots() {
    this.endplots = 3;
  }
  // radha update

  readmore() {
    $(".city_div img").css('filter', "brightness(.2)");
    $(".banner_description").css('height', "330px");
    $(".city_div").css('height', "510px");
    $(".about_us_banner label").css('top', "20%");
    $("p.banner_description").css('overflow-y', "scroll");
    $(".down_arrow").css('display', "none");
    $(".up_arrow").css('display', "block");
  }

  readless() {
    var scrollToTarget = function (target, containerEl) {
      // Moved up here for readability;
      var isElement = target && target.nodeType === 1,
        isNumber = Object.prototype.toString.call(target) === '[object Number]';

      if (isElement) {
        containerEl.scrollTop = target.offsetTop;
      } else if (isNumber) {
        containerEl.scrollTop = target;
      } else if (target === 'bottom') {
        containerEl.scrollTop = containerEl.scrollHeight - containerEl.offsetHeight;
      } else if (target === 'top') {
        containerEl.scrollTop = 0;
      }
    };
    var scrollableDiv = document.getElementById('scrollable');
    scrollToTarget('top', scrollableDiv);
    $(".banner_description").css('height', "200px");
    $(".about_us_banner label").css('top', "40%");
    $(".about_us_banner label.descrip").css('top', "28%");
    $("p.banner_description").css('overflow-y', "hidden");
    $(".down_arrow").css('display', "block");
    $(".up_arrow").css('display', "none");
  }

  IsVisibleBHKcontact = false;
  ShowHide() {
    this.IsVisibleBHKcontact = this.IsVisibleBHKcontact ? false : true;
  }
  IsVisible = false;
  ShowHidecontact() {
    this.IsVisible = this.IsVisible ? false : true;
  }
  closeclick() {
    // throw new Error('Method not implemented.');
  }

  contactshowhide() {
    var prevScrollpos = this.window.pageYOffset;
    this.window.addEventListener('scroll', function (event) {
      var currentScrollPos = this.window.pageYOffset;
      if (prevScrollpos > currentScrollPos) {
        // $('#contact_div').css('display','block')
        $('.prop-head').css('display', 'block')
      } else {
        //$('#contact_div').css('display','none')
        $('.prop-head').css('display', 'none')
      }
      prevScrollpos = currentScrollPos;
      if ($(this.window).scrollTop() >= $('#formsection').offset().top - this.window.innerHeight) {
        $('#contact_div').css('display', 'none')
        $('#topbutton').css('display', 'block')
      } else {
        $('#topbutton').css('display', 'none')
        $('#contact_div').css('display', 'block')
      }
      if ($(this.window).scrollTop() >= $('#section10').offset().top - this.window.innerHeight) {
        $('#contact_div').css('display', 'block')
      }
      if ($(this.window).scrollTop() >= $('.footerDiv').offset().top - this.window.innerHeight) {
        $('#contact_div').css('display', 'none')
      }
    }, false);
    // active submit button
    $(':input[type="submit"]').prop('disabled', true);
    $('#quation').keyup(function () {
      if ($(this).val() != '') {
        $(':input[type="submit"]').prop('disabled', false);
      } else {
        $('input[type="submit"]').attr('disabled', true);
      }
    });
  }

  // radha update


  showShortDesciption = true;
  alterDescriptionText() {
    this.showShortDesciption = !this.showShortDesciption;
    var elem = $('#readbutton').text();
    if (elem === 'Read More') {
      $('#readbutton').text('Read Less');
      $('.disclaimer_text').css('height', '100%');
    } else {
      $('#readbutton').text('Read More');
      $('.disclaimer_text').css('height', '80px');
      this.scrollTo('section12');
    }
  }
  showlocationShortDesciption = true;
  locationDescriptionText() {
    this.showlocationShortDesciption = !this.showlocationShortDesciption;
    var elem = $('#locationbutton').text();
    if (elem === 'Read More') {
      $('#locationbutton').text('Read Less');
      $('.disclaimer_text').css('height', '100%');
    } else {
      $('#locationbutton').text('Read More');
      $('.disclaimer_text').css('height', '80px');
      this.scrollTo('section13');
    }
  }

  //**************** MAP-SECTION-STARTS  ***************//

  // public origin: any;
  // public destination: any;
  // mapReady($event: any) {
  //   this.getrestaurantmap($event);
  //  }
  //  getschoolmap($event: any){
  //   this.schoolmapReady($event);
  //  }
  //  gethospitalmap($event: any){
  //   this.hospitalmapReady($event);
  //  }
  //  getmallmap($event: any){
  //   this.mallmapReady($event);
  //  }
  //  getbusmap($event: any){
  //   this.busmapReady($event);
  //  }

  //  getrestaurantmap(map: any)
  //  {
  //   var markers1 = [];
  //   var infowindow;
  //   var iconBase = 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_mobile_2/images/map/new/';
  //       var icons = {
  //           restaurant: {
  //           icon: iconBase + 'restaurant-icon.png'
  //         }
  //       };
  //       var directionsService = new google.maps.DirectionsService();
  //       var directionsDisplay;
  //         directionsDisplay = new google.maps.DirectionsRenderer({
  //           preserveViewport: true,
  //           polylineOptions: {
  //             strokeColor : 'rgba(151,27,71,.8117647058823529)',
  //             strokeOpacity : 1.0,
  //             strokeWeight : 3
  //           }
  //         });
  //         directionsDisplay.setOptions( { suppressMarkers: true } );
  //         directionsDisplay.setMap(map);
  //         infowindow = new google.maps.InfoWindow();
  //   this.routeSub = this.activatedRoute.params.subscribe(params => {
  //     var cityname = params['cityname'];
  //     var localityname = params['locality'];
  //     this.citybread = cityname;
  //     this.localitybread = localityname;

  //     String.prototype.toLocaleUpperCase = function () {
  //       return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  //     };
  //     var capsname = cityname.toLocaleUpperCase();
  //     if (isPlatformBrowser(this.platformId)) {
  //       this.Local_Storage.setItem('CityName', capsname);
  //    }
  //     var lasturl = params['propName-:param'];
  //     var propid = lasturl.split('-').pop().match(/[0-9]+/);

  //       // this.latit = propDetails[0].latitude * 1;
  //       // this.lngit = propDetails[0].longitude * 1;
  //       var latvar: any = this.Local_Storage.getItem('Latitude');
  //       var longvar: any = this.Local_Storage.getItem('Longitude');
  //       this.latit = latvar * 1;
  //       this.lngit = longvar * 1;
  //       var pyrmont = {lat: this.latit, lng: this.lngit};
  //       this.mapicon = iconBase + 'marker3.png';
  //         var cityCircle = new google.maps.Circle({
  //                     strokeColor: '#2795ee5e',
  //                     strokeOpacity: 0.8,
  //                     strokeWeight: 2,
  //                     fillColor: '#2795ee5e',
  //                     fillOpacity: 0.35,
  //                     map: map,
  //                     center: pyrmont,
  //                     radius: 1500
  //                   });
  //               var service = new google.maps.places.PlacesService(map);
  //               service.nearbySearch({
  //                 location: pyrmont,
  //                 radius: 1500,
  //                 type: ['restaurant']
  //               }, callback1);
  //               function callback1(results, status) {
  //                 if (status === google.maps.places.PlacesServiceStatus.OK) {
  //                 for (var i = 0; i < results.length; i++) {
  //                   createMarker1(results[i]);
  //                       }
  //                 }else {}
  //               }
  //               function createMarker1(place) {
  //                 var latit = place.geometry.location.lat();
  //                 var longit = place.geometry.location.lng();
  //                 var marker1 = new google.maps.Marker({
  //                   map: map,
  //                   position: place.geometry.location,
  //                   icon: icons[place.types[0]].icon
  //                 });
  //                 markers1.push(marker1);
  //                 $('#restaurnt').text(String(markers1.length));
  //                 marker1.addListener('mouseover', function() {
  //                   infowindow.setContent(place.name);
  //                   infowindow.open(map, this);
  //                    calculateAndDisplayRoute(directionsService, directionsDisplay,latit,longit,place,infowindow);
  //                     });
  //                       // FOR_MOBILE
  //                     marker1.addListener('click', function() {
  //                       infowindow.setContent(place.name);
  //                       infowindow.open(map, this);
  //                       calculateAndDisplayRoute(directionsService, directionsDisplay,latit,longit,place,infowindow);
  //                     });
  //                     // FOR_MOBILE
  //                     marker1.addListener('mouseout', function() {
  //                       infowindow.close();
  //                       directionsDisplay.set('directions', null);
  //                   });

  //           function calculateAndDisplayRoute(directionsService, directionsDisplay,latit,longit,place,infowindow)
  //            {
  //             var latvar: any = this.Local_Storage.getItem('Latitude');
  //             var longvar: any = this.Local_Storage.getItem('Longitude');
  //             var latitude = latvar * 1;
  //             var longitude = longvar * 1;

  //               directionsService.route({
  //               origin: {lat: latitude, lng: longitude},  // Haight.
  //               destination: {lat: latit, lng: longit},  // Ocean Beach.
  //               travelMode: google.maps.TravelMode.DRIVING

  //               }, function(response, status) {
  //             if (status == 'OK') {
  //               directionsDisplay.setDirections(response);
  //               computeTotals(response, infowindow);
  //             } else {}
  //           });
  //         }
  //         function computeTotals(result, infowindow) {
  //           var totalDist = 0;
  //           var totalTime = 0;
  //           var myroute = result.routes[0];
  //           for (let i = 0; i < myroute.legs.length; i++) {
  //             totalDist += myroute.legs[i].distance.value;
  //             totalTime += myroute.legs[i].duration.value;
  //           }
  //           totalDist = totalDist / 1000.
  //           infowindow.setContent(infowindow.getContent()+"<br>Total Distance =" + totalDist.toFixed(2) + " Km " + "<br>Travel Time=" + (totalTime/60).toFixed(2) + " Minutes");
  //         }
  //               }
  //   });
  //  }

  //  schoolmapReady(map: any)
  //  {
  //   var markers1 = [];
  //   var infowindow;
  //   var iconBase = 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_mobile_2/images/map/new/';
  //       var icons = {
  //          school: {
  //           icon: iconBase + 'school-icon.png'
  //         }
  //       };
  //       var directionsService = new google.maps.DirectionsService();
  //       var directionsDisplay;
  //         directionsDisplay = new google.maps.DirectionsRenderer({
  //           preserveViewport: true,
  //           polylineOptions: {
  //             strokeColor : 'rgba(151,27,71,.8117647058823529)',
  //             strokeOpacity : 1.0,
  //             strokeWeight : 3
  //           }
  //         });
  //         directionsDisplay.setOptions( { suppressMarkers: true } );
  //         directionsDisplay.setMap(map);
  //         infowindow = new google.maps.InfoWindow();
  //   this.routeSub = this.activatedRoute.params.subscribe(params => {
  //     var cityname = params['cityname'];
  //     var localityname = params['locality'];
  //     this.citybread = cityname;
  //     this.localitybread = localityname;

  //     String.prototype.toLocaleUpperCase = function () {
  //       return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  //     };
  //     var capsname = cityname.toLocaleUpperCase();
  //     if (isPlatformBrowser(this.platformId)) {
  //       this.Local_Storage.setItem('CityName', capsname);
  //    }
  //     var lasturl = params['propName-:param'];
  //     var propid = lasturl.split('-').pop().match(/[0-9]+/);

  //     var latvar: any = this.Local_Storage.getItem('Latitude');
  //       var longvar: any = this.Local_Storage.getItem('Longitude');
  //       this.latit = latvar * 1;
  //       this.lngit = longvar * 1;
  //       var pyrmont = {lat: this.latit, lng: this.lngit};
  //       this.mapicon = iconBase + 'marker3.png';
  //         var cityCircle = new google.maps.Circle({
  //                     strokeColor: '#2795ee5e',
  //                     strokeOpacity: 0.8,
  //                     strokeWeight: 2,
  //                     fillColor: '#2795ee5e',
  //                     fillOpacity: 0.35,
  //                     map: map,
  //                     center: pyrmont,
  //                     radius: 1500
  //                   });
  //               var service = new google.maps.places.PlacesService(map);
  //               service.nearbySearch({
  //                 location: pyrmont,
  //                 radius: 1500,
  //                 type: ['school']
  //               }, callback1);
  //               function callback1(results, status) {
  //                 if (status === google.maps.places.PlacesServiceStatus.OK) {
  //                   // 
  //                 for (var i = 0; i < results.length; i++) {
  //                   createMarker1(results[i]);
  //                       }
  //                 }else {}
  //               }
  //               function createMarker1(place) {
  //                 var latit = place.geometry.location.lat();
  //                 var longit = place.geometry.location.lng();
  //                 var marker1 = new google.maps.Marker({
  //                   map: map,
  //                   position: place.geometry.location,
  //                   icon: icons[place.types[0]].icon
  //                 });
  //                 markers1.push(marker1);
  //                 $('#scool').text(String(markers1.length));

  //                 marker1.addListener('mouseover', function() {
  //                   infowindow.setContent(place.name);
  //                   infowindow.open(map, this);
  //                    calculateAndDisplayRoute(directionsService, directionsDisplay,latit,longit,place,infowindow);
  //                     });
  //                       // FOR_MOBILE
  //                     marker1.addListener('click', function() {
  //                       infowindow.setContent(place.name);
  //                       infowindow.open(map, this);
  //                       calculateAndDisplayRoute(directionsService, directionsDisplay,latit,longit,place,infowindow);
  //                     });
  //                     // FOR_MOBILE
  //                     marker1.addListener('mouseout', function() {
  //                       infowindow.close();
  //                       directionsDisplay.set('directions', null);
  //                   });

  //           function calculateAndDisplayRoute(directionsService, directionsDisplay,latit,longit,place,infowindow)
  //            {
  //               var latvar: any = this.Local_Storage.getItem('Latitude');
  //               var longvar: any = this.Local_Storage.getItem('Longitude');
  //               var latitude = latvar * 1;
  //               var longitude = longvar * 1;
  //               directionsService.route({
  //               origin: {lat: latitude, lng: longitude},  // Haight.
  //               destination: {lat: latit, lng: longit},  // Ocean Beach.
  //               travelMode: google.maps.TravelMode.DRIVING

  //               }, function(response, status) {

  //             if (status == 'OK') {
  //               directionsDisplay.setDirections(response);
  //               computeTotals(response, infowindow);
  //             } else {}
  //           });
  //         }
  //         function computeTotals(result, infowindow) {
  //           var totalDist = 0;
  //           var totalTime = 0;
  //           var myroute = result.routes[0];
  //           for (let i = 0; i < myroute.legs.length; i++) {
  //             totalDist += myroute.legs[i].distance.value;
  //             totalTime += myroute.legs[i].duration.value;
  //           }
  //           totalDist = totalDist / 1000.
  //           infowindow.setContent(infowindow.getContent()+"<br>Total Distance =" + totalDist.toFixed(2) + " Km " + "<br>Travel Time=" + (totalTime/60).toFixed(2) + " Minutes");
  //         }
  //               }
  //   });
  //  }

  //  hospitalmapReady(map: any)
  //  {
  //   var markers1 = [];
  //   var infowindow;
  //   var iconBase = 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_mobile_2/images/map/new/';
  //       var icons = {
  //         hospital: {
  //           icon: iconBase + 'hospital-icon.png'
  //         }
  //       };
  //       var directionsService = new google.maps.DirectionsService();
  //       var directionsDisplay;
  //         directionsDisplay = new google.maps.DirectionsRenderer({
  //           preserveViewport: true,
  //           polylineOptions: {
  //             strokeColor : 'rgba(151,27,71,.8117647058823529)',
  //             strokeOpacity : 1.0,
  //             strokeWeight : 3
  //           }
  //         });
  //         directionsDisplay.setOptions( { suppressMarkers: true } );
  //         directionsDisplay.setMap(map);
  //         infowindow = new google.maps.InfoWindow();
  //   this.routeSub = this.activatedRoute.params.subscribe(params => {
  //     var cityname = params['cityname'];
  //     var localityname = params['locality'];
  //     this.citybread = cityname;
  //     this.localitybread = localityname;

  //     String.prototype.toLocaleUpperCase = function () {
  //       return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  //     };
  //     var capsname = cityname.toLocaleUpperCase();
  //     if (isPlatformBrowser(this.platformId)) {
  //       this.Local_Storage.setItem('CityName', capsname);
  //    }
  //     var lasturl = params['propName-:param'];
  //     var propid = lasturl.split('-').pop().match(/[0-9]+/);
  //     var latvar: any = this.Local_Storage.getItem('Latitude');
  //     var longvar: any = this.Local_Storage.getItem('Longitude');
  //     this.latit = latvar * 1;
  //     this.lngit = longvar * 1;
  //       var pyrmont = {lat: this.latit, lng: this.lngit};
  //       this.mapicon = iconBase + 'marker3.png';
  //         var cityCircle = new google.maps.Circle({
  //                     strokeColor: '#2795ee5e',
  //                     strokeOpacity: 0.8,
  //                     strokeWeight: 2,
  //                     fillColor: '#2795ee5e',
  //                     fillOpacity: 0.35,
  //                     map: map,
  //                     center: pyrmont,
  //                     radius: 1500
  //                   });
  //               var service = new google.maps.places.PlacesService(map);
  //               service.nearbySearch({
  //                 location: pyrmont,
  //                 radius: 1500,
  //                 type: ['hospital']
  //               }, callback1);
  //               function callback1(results, status) {
  //                 if (status === google.maps.places.PlacesServiceStatus.OK) {
  //                   // 
  //                 for (var i = 0; i < results.length; i++) {
  //                   createMarker1(results[i]);
  //                       }
  //                 }else {}
  //               }
  //               function createMarker1(place) {
  //                 var latit = place.geometry.location.lat();
  //                 var longit = place.geometry.location.lng();
  //                 var marker1 = new google.maps.Marker({
  //                   map: map,
  //                   position: place.geometry.location,
  //                   icon: icons[place.types[0]].icon
  //                 });
  //                 markers1.push(marker1);
  //                 $('#hospit').text(String(markers1.length));

  //                 marker1.addListener('mouseover', function() {
  //                   infowindow.setContent(place.name);
  //                   infowindow.open(map, this);
  //                    calculateAndDisplayRoute(directionsService, directionsDisplay,latit,longit,place,infowindow);
  //                     });
  //                       // FOR_MOBILE
  //                     marker1.addListener('click', function() {
  //                       infowindow.setContent(place.name);
  //                       infowindow.open(map, this);
  //                       calculateAndDisplayRoute(directionsService, directionsDisplay,latit,longit,place,infowindow);
  //                     });
  //                     // FOR_MOBILE
  //                     marker1.addListener('mouseout', function() {
  //                       infowindow.close();
  //                       directionsDisplay.set('directions', null);
  //                   });

  //           function calculateAndDisplayRoute(directionsService, directionsDisplay,latit,longit,place,infowindow)
  //            {
  //               var latvar: any = this.Local_Storage.getItem('Latitude');
  //               var longvar: any = this.Local_Storage.getItem('Longitude');
  //               var latitude = latvar * 1;
  //               var longitude = longvar * 1;

  //               directionsService.route({
  //               origin: {lat: latitude, lng: longitude},  // Haight.
  //               destination: {lat: latit, lng: longit},  // Ocean Beach.
  //               travelMode: google.maps.TravelMode.DRIVING

  //               }, function(response, status) {

  //             if (status == 'OK') {
  //               directionsDisplay.setDirections(response);
  //               computeTotals(response, infowindow);
  //             } else {}
  //           });
  //         }
  //         function computeTotals(result, infowindow) {
  //           var totalDist = 0;
  //           var totalTime = 0;
  //           var myroute = result.routes[0];
  //           for (let i = 0; i < myroute.legs.length; i++) {
  //             totalDist += myroute.legs[i].distance.value;
  //             totalTime += myroute.legs[i].duration.value;
  //           }
  //           totalDist = totalDist / 1000.
  //           infowindow.setContent(infowindow.getContent()+"<br>Total Distance =" + totalDist.toFixed(2) + " Km " + "<br>Travel Time=" + (totalTime/60).toFixed(2) + " Minutes");
  //         }
  //               }
  //   });
  //  }

  //  mallmapReady(map: any)
  //  {
  //   var markers1 = [];
  //   var infowindow;
  //   var iconBase = 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_mobile_2/images/map/new/';
  //       var icons = {
  //         shopping_mall: {
  //           icon: iconBase + 'shopping-icon.png'
  //         }
  //       };
  //       var directionsService = new google.maps.DirectionsService();
  //       var directionsDisplay;
  //         directionsDisplay = new google.maps.DirectionsRenderer({
  //           preserveViewport: true,
  //           polylineOptions: {
  //             strokeColor : 'rgba(151,27,71,.8117647058823529)',
  //             strokeOpacity : 1.0,
  //             strokeWeight : 3
  //           }
  //         });
  //         directionsDisplay.setOptions( { suppressMarkers: true } );
  //         directionsDisplay.setMap(map);
  //         infowindow = new google.maps.InfoWindow();
  //   this.routeSub = this.activatedRoute.params.subscribe(params => {
  //     var cityname = params['cityname'];
  //     var localityname = params['locality'];
  //     this.citybread = cityname;
  //     this.localitybread = localityname;

  //     String.prototype.toLocaleUpperCase = function () {
  //       return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  //     };
  //     var capsname = cityname.toLocaleUpperCase();
  //     if (isPlatformBrowser(this.platformId)) {
  //       this.Local_Storage.setItem('CityName', capsname);
  //    }
  //     var lasturl = params['propName-:param'];
  //     var propid = lasturl.split('-').pop().match(/[0-9]+/);

  //       var latvar: any = this.Local_Storage.getItem('Latitude');
  //       var longvar: any = this.Local_Storage.getItem('Longitude');
  //       this.latit = latvar * 1;
  //       this.lngit = longvar * 1;
  //       var pyrmont = {lat: this.latit, lng: this.lngit};
  //       this.mapicon = iconBase + 'marker3.png';
  //         var cityCircle = new google.maps.Circle({
  //                     strokeColor: '#2795ee5e',
  //                     strokeOpacity: 0.8,
  //                     strokeWeight: 2,
  //                     fillColor: '#2795ee5e',
  //                     fillOpacity: 0.35,
  //                     map: map,
  //                     center: pyrmont,
  //                     radius: 1500
  //                   });
  //               var service = new google.maps.places.PlacesService(map);
  //               service.nearbySearch({
  //                 location: pyrmont,
  //                 radius: 1500,
  //                 type: ['shopping_mall']
  //               }, callback1);
  //               function callback1(results, status) {
  //                 if (status === google.maps.places.PlacesServiceStatus.OK) {
  //                   // 
  //                 for (var i = 0; i < results.length; i++) {
  //                   createMarker1(results[i]);
  //                       }
  //                 }else {}
  //               }
  //               function createMarker1(place) {
  //                 var latit = place.geometry.location.lat();
  //                 var longit = place.geometry.location.lng();
  //                 var marker1 = new google.maps.Marker({
  //                   map: map,
  //                   position: place.geometry.location,
  //                   icon: icons[place.types[0]].icon
  //                 });
  //                 markers1.push(marker1);
  //                 $('#shopng').text(String(markers1.length));

  //                 marker1.addListener('mouseover', function() {
  //                   infowindow.setContent(place.name);
  //                   infowindow.open(map, this);
  //                    calculateAndDisplayRoute(directionsService, directionsDisplay,latit,longit,place,infowindow);
  //                     });
  //                       // FOR_MOBILE
  //                     marker1.addListener('click', function() {
  //                       infowindow.setContent(place.name);
  //                       infowindow.open(map, this);
  //                       calculateAndDisplayRoute(directionsService, directionsDisplay,latit,longit,place,infowindow);
  //                     });
  //                     // FOR_MOBILE
  //                     marker1.addListener('mouseout', function() {
  //                       infowindow.close();
  //                       directionsDisplay.set('directions', null);
  //                   });

  //           function calculateAndDisplayRoute(directionsService, directionsDisplay,latit,longit,place,infowindow)
  //            {
  //               var latvar: any = this.Local_Storage.getItem('Latitude');
  //               var longvar: any = this.Local_Storage.getItem('Longitude');
  //               var latitude = latvar * 1;
  //               var longitude = longvar * 1;
  //               directionsService.route({
  //               origin: {lat: latitude, lng: longitude},  // Haight.
  //               destination: {lat: latit, lng: longit},  // Ocean Beach.
  //               travelMode: google.maps.TravelMode.DRIVING

  //               }, function(response, status) {

  //             if (status == 'OK') {
  //               directionsDisplay.setDirections(response);
  //               computeTotals(response, infowindow);
  //             } else {}
  //           });
  //         }
  //         function computeTotals(result, infowindow) {
  //           var totalDist = 0;
  //           var totalTime = 0;
  //           var myroute = result.routes[0];
  //           for (let i = 0; i < myroute.legs.length; i++) {
  //             totalDist += myroute.legs[i].distance.value;
  //             totalTime += myroute.legs[i].duration.value;
  //           }
  //           totalDist = totalDist / 1000.
  //           infowindow.setContent(infowindow.getContent()+"<br>Total Distance =" + totalDist.toFixed(2) + " Km " + "<br>Travel Time=" + (totalTime/60).toFixed(2) + " Minutes");
  //         }
  //               }
  //   });
  //  }
  //  busmapReady(map: any)
  //  {
  //   var markers1 = [];
  //   var infowindow;
  //   var iconBase = 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_mobile_2/images/map/new/';
  //       var icons = {
  //         bus_station: {
  //           icon: iconBase + 'bus-icon.png'
  //         }
  //       };
  //       var directionsService = new google.maps.DirectionsService();
  //       var directionsDisplay;
  //         directionsDisplay = new google.maps.DirectionsRenderer({
  //           preserveViewport: true,
  //           polylineOptions: {
  //             strokeColor : 'rgba(151,27,71,.8117647058823529)',
  //             strokeOpacity : 1.0,
  //             strokeWeight : 3
  //           }
  //         });
  //         directionsDisplay.setOptions( { suppressMarkers: true } );
  //         directionsDisplay.setMap(map);
  //         infowindow = new google.maps.InfoWindow();
  //   this.routeSub = this.activatedRoute.params.subscribe(params => {
  //     var cityname = params['cityname'];
  //     var localityname = params['locality'];
  //     this.citybread = cityname;
  //     this.localitybread = localityname;

  //     String.prototype.toLocaleUpperCase = function () {
  //       return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  //     };
  //     var capsname = cityname.toLocaleUpperCase();
  //     if (isPlatformBrowser(this.platformId)) {
  //       this.Local_Storage.setItem('CityName', capsname);
  //    }
  //     var lasturl = params['propName-:param'];
  //     var propid = lasturl.split('-').pop().match(/[0-9]+/);

  //       var latvar: any = this.Local_Storage.getItem('Latitude');
  //       var longvar: any = this.Local_Storage.getItem('Longitude');
  //       this.latit = latvar * 1;
  //       this.lngit = longvar * 1;
  //       var pyrmont = {lat: this.latit, lng: this.lngit};
  //       this.mapicon = iconBase + 'marker3.png';
  //         var cityCircle = new google.maps.Circle({
  //                     strokeColor: '#2795ee5e',
  //                     strokeOpacity: 0.8,
  //                     strokeWeight: 2,
  //                     fillColor: '#2795ee5e',
  //                     fillOpacity: 0.35,
  //                     map: map,
  //                     center: pyrmont,
  //                     radius: 1500
  //                   });
  //               var service = new google.maps.places.PlacesService(map);
  //               service.nearbySearch({
  //                 location: pyrmont,
  //                 radius: 1500,
  //                 type: ['bus_station']
  //               }, callback1);
  //               function callback1(results, status) {
  //                 if (status === google.maps.places.PlacesServiceStatus.OK) {
  //                   // 
  //                 for (var i = 0; i < results.length; i++) {
  //                   createMarker1(results[i]);
  //                       }
  //                 }else {}
  //               }
  //               function createMarker1(place) {
  //                 var latit = place.geometry.location.lat();
  //                 var longit = place.geometry.location.lng();
  //                 var marker1 = new google.maps.Marker({
  //                   map: map,
  //                   position: place.geometry.location,
  //                   icon: icons[place.types[0]].icon
  //                 });
  //                 markers1.push(marker1);
  //                 $('#busstp').text(String(markers1.length));

  //                 marker1.addListener('mouseover', function() {
  //                   infowindow.setContent(place.name);
  //                   infowindow.open(map, this);
  //                    calculateAndDisplayRoute(directionsService, directionsDisplay,latit,longit,place,infowindow);
  //                     });
  //                       // FOR_MOBILE
  //                     marker1.addListener('click', function() {
  //                       infowindow.setContent(place.name);
  //                       infowindow.open(map, this);
  //                       calculateAndDisplayRoute(directionsService, directionsDisplay,latit,longit,place,infowindow);
  //                     });
  //                     // FOR_MOBILE
  //                     marker1.addListener('mouseout', function() {
  //                       infowindow.close();
  //                       directionsDisplay.set('directions', null);
  //                   });

  //           function calculateAndDisplayRoute(directionsService, directionsDisplay,latit,longit,place,infowindow)
  //            {
  //               var latvar: any = this.Local_Storage.getItem('Latitude');
  //               var longvar: any = this.Local_Storage.getItem('Longitude');
  //               var latitude = latvar * 1;
  //               var longitude = longvar * 1;

  //               directionsService.route({
  //               origin: {lat: latitude, lng: longitude},  // Haight.
  //               destination: {lat: latit, lng: longit},  // Ocean Beach.
  //               travelMode: google.maps.TravelMode.DRIVING

  //               }, function(response, status) {

  //             if (status == 'OK') {
  //               directionsDisplay.setDirections(response);
  //               computeTotals(response, infowindow);
  //             } else {}
  //           });
  //         }
  //         function computeTotals(result, infowindow) {
  //           var totalDist = 0;
  //           var totalTime = 0;
  //           var myroute = result.routes[0];
  //           for (let i = 0; i < myroute.legs.length; i++) {
  //             totalDist += myroute.legs[i].distance.value;
  //             totalTime += myroute.legs[i].duration.value;
  //           }
  //           totalDist = totalDist / 1000.
  //           infowindow.setContent(infowindow.getContent()+"<br>Total Distance =" + totalDist.toFixed(2) + " Km " + "<br>Travel Time=" + (totalTime/60).toFixed(2) + " Minutes");
  //         }
  //               }
  //   });
  //  }

  //**************** MAP-SECTION-ENDS  ***************//



  onresize() {
    if (isPlatformBrowser(this.platformId)) {
      let node3: any = document.createElement('link');
      node3.rel = 'stylesheet';
      node3.href = 'https://d1zt14hr2k4poi.cloudfront.net/version2.0/package/ngx-lightbox/lightbox.css';
      node3.type = 'text/css';
      node3.async = true;
      var godefer = document.getElementsByTagName('link')[0];
      godefer.parentNode.insertBefore(node3, godefer);
      document.getElementsByTagName('head')[0].appendChild(node3);
    }
    let width = this.window.innerWidth;
    if (width < 420) {
      this.hidemobile = false;
      this.floatbar = true;
      this.hidedesktop = true;
    } else {
      this.hidemobile = true;
      this.floatbar = false;
      this.hidedesktop = false;
    }
  }

  stickyload() {
    const windowWidth = $(this.window).width();
    const width = this.window.innerWidth;
    if (width > 200) {
      $(this.window).scroll(function () {

        if ($(this).scrollTop() > 680) {
          $('#sublinks_sticky').addClass('stick1');
          $('#sublinks_sticky').css('display', 'block');
          // $('#section1').css('margin-top', '85px');
        }
        if ($(this).scrollTop() > 100) {
          $('#HeaderId').addClass('HeaderHide');
          $('#HeaderId').removeClass('HeaderShow');
        }
        if ($(this).scrollTop() < 100) {
          $('#HeaderId').addClass('HeaderShow');
          $('#HeaderId').removeClass('HeaderHide');
        }

        if ($(this).scrollTop() >= 100) {
          $('#scrollnavDiv').addClass('fixed-header');
        }
        else {
          $('#scrollnavDiv').removeClass('fixed-header');
        }

        if ($(this).scrollTop() > 300) {
          $('#side_bar_sticky').addClass('stick');
          $('#side_bar_sticky').css('display', 'block');
        }

        if ($(this).scrollTop() < 680) {
          $('#side_bar_sticky').removeClass('stick');
          $('#sublinks_sticky').removeClass('stick1');
          // $('#section1').css('margin-top', '15px');
        }
        if ($(this).scrollTop() > 4110) {
          $('#sublinks_sticky').css('display', 'none');
        }
        if ($(this).scrollTop() > 4100) {
          $('#HideSideBar').addClass('HideSideBar');
        }
        if ($(this).scrollTop() < 4100) {
          $('#HideSideBar').removeClass('HideSideBar');
        }
      });
      // } else {
    }
  }
  scrolltotop() {
    var btn = $('#topbutton');
    btn.on('click', function (e) {
      e.preventDefault();
      $('html, body').animate({ scrollTop: 0 }, '300');
    });
  }

  readtoggle() {
    var elem = $('#readtoggle').text();
    if (elem === 'Read More') {
      $('#readtoggle').text('Read Less');
      $('#prop_desc').css('height', '100%');
    } else {
      $('#readtoggle').text('Read More');
      $('#prop_desc').css('height', '80px');
    }
  }

  onClickArrow() {
    if (this.upperArrow === true) {
      this.downArrow = true;
      this.upperArrow = false;
      this.scrollTo('about-section');
    } else {
      this.upperArrow = true;
      this.downArrow = false;
    }
  }

  numericOnly(event): boolean {
    let patt = /^([0-9])$/;
    let result = patt.test(event.key);
    return result;
  }

  emidefault() {
    this.emi.interest = "5";
    this.emi.years = "5";
    this.emi.amount = "1000000";
    this.totalAmount = "0";
    this.interestpayable = "0";
    this.monthlyAmount = "0";

  }

  chartload() {
    this.doughnutChartLabels = ['Interest', 'Principal'];
    this.chartColors = [
      {
        backgroundColor: ["rgba(151,27,71,.8117647058823529)", "#f8d89f"]
      }
    ];

    this.doughnutChartData = [
      [0, 9999999],
    ];
    this.chartOptions = {
      cutoutPercentage: 70
    };
  }

  getrate() {
    if ($('#loanamount').val() == "0") {
      $('#loanamount').focus().css("border-color", "red");
      return false;
    }
    else {
      $('#loanamount').removeAttr("style");
    }
    if ($('#loanyears').val() == "0") {
      $('#loanyears').focus().css("border-color", "red");
      return false;
    }
    else {
      $('#loanyears').removeAttr("style");
    }
    if ($('#loaninterest').val() == "0") {
      $('#loaninterest').focus().css("border-color", "red");
      return false;
    }
    else {
      $('#loaninterest').removeAttr("style");
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

  // Pie
  public pieChartLabels: string[] = ['Chrome', 'Safari', 'Firefox', 'Internet Explorer', 'Other'];
  public pieChartData: number[] = [50, 50];
  public pieChartType: string = 'pie';

  // events
  public chartClicked(e: any): void {
    // 
  }

  public chartHovered(e: any): void {
    // 
  }

  onchangeSlider() {
    this.getrate();
  }

  user = new enquiry();
  // restaurant = false;
  // school = true;
  // hospital = true;
  // malls = true;
  // bus = true;
  // onClickRestorent() {
  //   this.restaurant = false;
  //   this.school = true;
  //   this.hospital = true;
  //   this.malls = true;
  //   this.bus = true;
  //   }

  //   onSchool() {
  //   this.school = false;
  //   this.restaurant = true;
  //   this.hospital = true;
  //   this.malls = true;
  //   this.bus = true;
  //   }

  // onHospital() {
  //   this.school = true;
  //   this.restaurant = true;
  //   this.hospital = false;
  //   this.malls = true;
  //   this.bus = true;
  // }

  // onMalls() {
  //   this.school = true;
  //   this.restaurant = true;
  //   this.hospital = true;
  //   this.malls = false;
  //   this.bus = true;
  // }

  // onBus() {
  //   this.school = true;
  //   this.restaurant = true;
  //   this.hospital = true;
  //   this.malls = true;
  //   this.bus = false;
  // }

  // SubmitForm() {
  //   if($('#ename').val()=="")
  //         {
  //             $('#ename').focus().css("border-color","red").attr('placeholder','Please Enter Name');
  //             return false;
  //         }
  //     else{
  //               var enameFilter=/^([a-zA-Z]+\s)*[a-zA-Z]+$/;
  //               if(enameFilter.test($('#ename').val()))
  //               {
  //                $('#ename').removeAttr("style");
  //               }
  //              else{
  //                   $('#ename').focus().css("border-color","red").attr('placeholder','Please enter valid name').val('');
  //                   return false;
  //              }
  //          }
  //
  //          if($('#email').val()=="")
  //          {
  //              $('#email').focus().css("border-color","red").attr('placeholder','Please Enter Email-id');
  //              return false;
  //          }
  //         else{
  //            var emaill=/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
  //              if(emaill.test($('#email').val()))
  //              {
  //                  $('#email').removeAttr("style");
  //              }
  //               else{
  //                    $('#email').focus().css("border-color","red").attr('placeholder','Please enter valid email-id').val('');
  //                    return false;
  //               }
  //           }
  //
  //          if($('#emobile').val()=="")
  //          {
  //              $('#emobile').focus().css("border-color","red").attr('placeholder','Please Enter Phone Number');
  //              return false;
  //          }
  //         else{
  //            var mobilee=/^[0-9]{10}$/;
  //              if(mobilee.test($('#emobile').val()))
  //              {
  //                  $('#emobile').removeAttr("style");
  //              }
  //               else{
  //                    $('#emobile').focus().css("border-color","red").attr('placeholder','Please enter valid contact number').val('');
  //                    return false;
  //               }
  //           }
  //
  //           this.Service.EnqProperty(this.ContactForm.value.email, this.ContactForm.value.phone, this.ContactForm.value.firstName, this.propName).subscribe(response => {
  //
  //             if (response[0].status === 'True') {
  //             } else {
  //               swal({
  //                 type: 'error',
  //                 title: 'Something Went Wrong',
  //                 showConfirmButton: false,
  //                 timer: 1500
  //               });
  //             }
  //           });
  //               this.ContactForm.controls['email'].setValue(null);
  //               this.ContactForm.controls['phone'].setValue(null);
  //               this.ContactForm.controls['firstName'].setValue(null);
  //               swal({
  //                 type: 'success',
  //                 title: 'Success Our Seller Will Contact Soon',
  //                 showConfirmButton: false,
  //                 timer: 1500
  //               });
  // }
  // SubmitFormByBhk() {
  //   if($('.floor_nameinput').val()=="")
  //         {
  //             $('.floor_nameinput').focus().css("border-color","red").attr('placeholder','Please Enter Name');
  //             return false;
  //         }
  //     else{
  //             //   var enameFilter=/^([a-zA-Z]+\s)*[a-zA-Z]+$/;
  //             //   if(enameFilter.test($('.floor_nameinput').val()))
  //             //   {
  //             //    $('.floor_nameinput').removeAttr("style");
  //             //   }
  //             //  else{
  //             //       $('.floor_nameinput').focus().css("border-color","red").attr('placeholder','Please enter valid name').val('');
  //             //       return false;
  //             //  }
  //          }
  //          if($('.floor_numinput').val()=="")
  //          {
  //              $('.floor_numinput').focus().css("border-color","red").attr('placeholder','Please Enter Phone Number');
  //              return false;
  //          }
  //         else{
  //            var mobilee=/^[0-9]{10}$/;
  //              if(mobilee.test($('.floor_numinput').val()))
  //              {
  //                  $('.floor_numinput').removeAttr("style");
  //              }
  //               else{
  //                    $('.floor_numinput').focus().css("border-color","red").attr('placeholder','Please enter valid contact number').val('');
  //                    return false;
  //               }
  //           }
  //           swal({
  //             type: 'success',
  //             title: 'Success Our Seller Will Contact Soon',
  //             showConfirmButton: false,
  //             timer: 1500,
  //           });
  //     this.Service.EnqPropertyByBHKs(this.varient, this.ContactForm.value.phone, this.ContactForm.value.firstName, this.propName).subscribe(response => {
  //       if (response['status'] === 'True') {
  //
  //         this.ContactForm.controls['email'].setValue(null);
  //         this.ContactForm.controls['phone'].setValue(null);
  //         this.ContactForm.controls['firstName'].setValue(null);
  //       } else {
  //         swal({
  //           type: 'error',
  //           title: 'Something Went Wrong',
  //           showConfirmButton: false,
  //           timer: 1500,
  //         });
  //       }
  //     });
  //     this.ContactForm.controls['email'].setValue(null);
  //     this.ContactForm.controls['phone'].setValue(null);
  //     this.ContactForm.controls['firstName'].setValue(null);
  //
  //     this.cancel.nativeElement.click();
  //     this.IsVisible = false;
  // }

  iconOne = true;
  iconTwo = true;
  iconThree = true;
  iconFour = true;
  iconFive = true;
  iconSix = true;
  iconSeven = true;
  iconEight = true;
  iconNine = true;
  iconamenities = true;
  faqMore = false;

  onIconOne() {
    if (this.iconOne === true) {
      this.iconOne = false;
      this.iconTwo = false;
      this.iconamenities = true;
      this.iconThree = true;
      this.iconFour = true;
      this.iconFive = true;
      this.iconSix = true;
      this.iconSeven = true;
      this.iconEight = true;
      this.iconNine = true;
    } else if (this.iconOne === false) {
      this.iconamenities = true;
      this.iconOne = true;
      this.iconTwo = true;
      this.iconThree = true;
      this.iconFour = true;
      this.iconFive = true;
      this.iconSix = true;
      this.iconSeven = true;
      this.iconEight = true;
      this.iconNine = true;
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
      this.iconamenities = true;
    } else if (this.iconTwo === false) {
      this.iconamenities = true;
      this.iconTwo = true;
      this.iconOne = true;
      this.iconThree = true;
      this.iconFour = true;
      this.iconFive = true;
      this.iconSix = true;
      this.iconSeven = true;
      this.iconEight = true;
      this.iconNine = true;
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
      this.iconamenities = true;
    } else if (this.iconThree === false) {
      this.iconamenities = true;
      this.iconThree = true;
      this.iconTwo = true;
      this.iconOne = true;
      this.iconFour = true;
      this.iconFive = true;
      this.iconSix = true;
      this.iconSeven = true;
      this.iconEight = true;
      this.iconNine = true;
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
      this.iconamenities = true;
    } else if (this.iconFour === false) {
      this.iconamenities = true;
      this.iconFour = true;
      this.iconTwo = true;
      this.iconThree = true;
      this.iconOne = true;
      this.iconFive = true;
      this.iconSix = true;
      this.iconSeven = true;
      this.iconEight = true;
      this.iconNine = true;
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
      this.iconamenities = true;
    } else if (this.iconFive === false) {
      this.iconamenities = true;
      this.iconFive = true;
      this.iconTwo = true;
      this.iconThree = true;
      this.iconFour = true;
      this.iconOne = true;
      this.iconSix = true;
      this.iconSeven = true;
      this.iconEight = true;
      this.iconNine = true;
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
      this.iconamenities = true;
    } else if (this.iconSix === false) {
      this.iconamenities = true;
      this.iconSix = true;
      this.iconTwo = true;
      this.iconThree = true;
      this.iconFour = true;
      this.iconFive = true;
      this.iconOne = true;
      this.iconSeven = true;
      this.iconEight = true;
      this.iconNine = false;
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
      this.iconamenities = true;
    } else if (this.iconSeven === false) {
      this.iconamenities = true;
      this.iconSeven = true;
      this.iconTwo = true;
      this.iconThree = true;
      this.iconFour = true;
      this.iconFive = true;
      this.iconSix = true;
      this.iconOne = true;
      this.iconEight = true;
      this.iconNine = true;
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
      this.iconamenities = true;
    } else if (this.iconEight === false) {
      this.iconamenities = true;
      this.iconEight = true;
      this.iconTwo = true;
      this.iconThree = true;
      this.iconFour = true;
      this.iconFive = true;
      this.iconSix = true;
      this.iconSeven = true;
      this.iconOne = true;
      this.iconNine = true;
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
      this.iconamenities = true;
    } else if (this.iconNine === false) {
      this.iconamenities = true;
      this.iconNine = true;
      this.iconTwo = true;
      this.iconThree = true;
      this.iconFour = true;
      this.iconFive = true;
      this.iconSix = true;
      this.iconSeven = true;
      this.iconEight = true;
      this.iconOne = true;
    }
  }
  onIconamenity() {
    if (this.iconamenities === true) {
      this.iconamenities = false;
      this.iconNine = true;
      this.iconTwo = true;
      this.iconThree = true;
      this.iconFour = true;
      this.iconFive = true;
      this.iconSix = true;
      this.iconSeven = true;
      this.iconEight = true;
      this.iconOne = false;
    } else if (this.iconamenities === false) {
      this.iconamenities = true;
      this.iconNine = true;
      this.iconTwo = true;
      this.iconThree = true;
      this.iconFour = true;
      this.iconFive = true;
      this.iconSix = true;
      this.iconSeven = true;
      this.iconEight = true;
      this.iconOne = true;
    }
  }
  onFaqSeeMore() {
    this.faqMore = true;
  }

  onFaqSeeLess() {
    this.faqMore = false;
  }

  varient;
  onOneBhk(bhk) {
    this.varient = bhk;

  }
  config = {
    allowNumbersOnly: true,
    length: 4,
    isPasswordInput: false,
    disableAutoFocus: true,
    placeholder: '',
    inputStyles: {
      'width': '50px',
      'height': '50px'
    }
  };
  countdownconfig = {
    leftTime: 30,
    demand: true
  };
  otpexpired = false;
  handleEvent(e: CountdownEvent) {
    if (e.action === 'done') {
      this.otpexpired = true;
    }
  }
  // start()
  // {
  //   this.countdown.begin();
  // }
  // reset()
  // {
  //   this.countdown.restart();
  // }
  onOtpChange(otp) {
    var param = this.user;
    param.otp = otp;
  }
  otploader = false;
  goback() {
    $('#modal-container').addClass('out');
    $('body').removeClass('modal-active');
  }
  goback2() {
    $('#modal-container2').addClass('out');
    $('body').removeClass('modal-active');
  }
  goback3() {
    $('#modal-container3').addClass('out');
    $('body').removeClass('modal-active');
  }
  goback4() {
    $('#modal-container4').addClass('out');
    $('body').removeClass('modal-active');
  }
  goback6() {
    $('#modal-container6').addClass('out');
    $('body').removeClass('modal-active');
  }
  brochuregoback() {
    $('#brochure-modal-container').addClass('out');
    $('body').removeClass('modal-active');
  }

  sentback() {
    this.window.history.back();
  }
  // gotocall(){
  //   this.IsVisible = this.IsVisible ? false : true;
  // }
  // otpsend()
  // {
  //   if ($('#ename').val() == "") {
  //     $('#ename').focus().css("border-color", "red").attr('placeholder', 'Please Enter Name');
  //     return false;
  //   }
  //   else {
  //     var enameFilter = /^([a-zA-Z]+\s)*[a-zA-Z]+$/;
  //     if (enameFilter.test($('#ename').val())) {
  //       $('#ename').removeAttr("style");
  //     }
  //     else {
  //       $('#ename').focus().css("border-color", "red").attr('placeholder', 'Please enter valid name').val('');
  //       return false;
  //     }
  //   }

  //   if ($('#email').val() == "") {
  //     $('#email').focus().css("border-color", "red").attr('placeholder', 'Please Enter Email-id');
  //     return false;
  //   }
  //   else {
  //     var emaill = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
  //     if (emaill.test($('#email').val())) {
  //       $('#email').removeAttr("style");
  //     }
  //     else {
  //       $('#email').focus().css("border-color", "red").attr('placeholder', 'Please enter valid email-id').val('');
  //       return false;
  //     }
  //   }

  //   if ($('#emobile').val() == "") {
  //     $('#emobile').focus().css("border-color", "red").attr('placeholder', 'Please Enter Phone Number');
  //     return false;
  //   }
  //   else {
  //     var mobilee = /^[0-9]{10}$/;
  //     if (mobilee.test($('#emobile').val())) {
  //       $('#emobile').removeAttr("style");
  //     }
  //     else {
  //       $('#emobile').focus().css("border-color", "red").attr('placeholder', 'Please enter valid contact number').val('');
  //       return false;
  //     }
  //   }

  //   this.otploader = true;
  //   this.SubmitForm();
  //   $('body').addClass('bodyoverlay');
  //   var param = this.user;
  //   this.Service.otpsend(param).subscribe((success) => {
  //     var prestatus = success['Data'];
  //     var status = prestatus[0].MessageErrorDescription;
  //     if (status == "Success") {
  //       this.SubmitForm();
  //       this.countdown.begin();
  //       var buttonId = $('#one').attr('id');
  //       $('#modal-container').removeAttr('class').addClass(buttonId);
  //       $('body').addClass('modal-active');
  //       this.otploader = false;
  //       $('body').removeClass('bodyoverlay');
  //     } else {
  //       swal({
  //         title: 'Oops Something Error!',
  //         type: 'error',
  //         showConfirmButton: false,
  //         timer: 1500
  //       })
  //       this.otploader = false;
  //       $('body').removeClass('bodyoverlay');
  //     }
  //   }, (err) => {
  //     
  //   });
  // }
  // otpvalidate() {
  //   var otplength = 4;
  //   if ($('#otp').val() == "") {
  //     swal({
  //       title: 'Please enter the OTP!',
  //       type: 'error',
  //       showConfirmButton: false,
  //       timer: 1000
  //     })
  //     return false;
  //   } else {
  //     var liveotpcount = $('#otp').val().length;
  //     if (liveotpcount < otplength) {
  //       swal({
  //         title: 'Please enter the valid OTP!',
  //         type: 'warning',
  //         showConfirmButton: false,
  //         timer: 1500
  //       })
  //       return false;
  //     } else { }
  //   }
  //   var param = this.user;
  //   this.otploader = true;
  //   $('body').addClass('bodyoverlay');
  //   this.Service.otpvalidcheck(param).subscribe((success) => {
  //     var status = success['status'];
  //     // if (status == "True") {
  //     //   this.otploader = false;
  //     //   this.cancel.nativeElement.click();
  //     //   $('body').removeClass('bodyoverlay');
  //     //   swal({
  //     //     title: 'OTP Verified',
  //     //     text: 'We Will Intimate you soon!',
  //     //     type: 'success',
  //     //     showConfirmButton: false,
  //     //     timer: 2500
  //     //   });
  //     //   $('#modal-container').addClass('out');
  //     //   $('body').removeClass('modal-active');
  //     //   this.user.name = '';
  //     //   this.user.number = '';
  //     //   this.user.mail = '';
  //     //   this.user.otp = '';
  //     //   $('#btn_reset').click();
  //     //   this.countdown.restart();
  //     // } else {
  //     //   this.otploader = false;
  //     //   $('body').removeClass('bodyoverlay');
  //     //   swal({
  //     //     title: 'Oops Something Error!',
  //     //     text: 'Its Not a valid OTP / OTP Expired!',
  //     //     type: 'error',
  //     //     showConfirmButton: false,
  //     //     timer: 1500
  //     //   })
  //     // }
  //   }, (err) => {
  //     
  //   });
  // }

  // SubmitForm() {
  //   var param = this.user;
  //   this.Service.EnqProperty(param, this.propName).subscribe(success => {
  //     if (success['status'] === 'True') {
  //       this.otploader = false;
  //       this.cancel.nativeElement.click();
  //       $('body').removeClass('bodyoverlay');
  //       swal({
  //         title: 'OTP Verified',
  //         text: 'We Will Intimate you soon!',
  //         type: 'success',
  //         showConfirmButton: false,
  //         timer: 2500
  //       });
  //       $('#modal-container').addClass('out');
  //       $('body').removeClass('modal-active');
  //       this.user.name = '';
  //       this.user.number = '';
  //       this.user.mail = '';
  //       this.user.otp = '';
  //       $('#btn_reset').click();
  //     } else {
  //       swal({
  //         type: 'error',
  //         title: 'Something Went Wrong',
  //         showConfirmButton: false,
  //         timer: 1500
  //       });
  //     }
  //   });
  // }

  propenqueryotpsend() {
    if ($('#prop_nameinput').val() == "") {
      $('#prop_nameinput').focus().css("border-color", "red").attr('placeholder', 'Please Enter Name');
      return false;
    }
    else {
      var enameFilter = /^([a-zA-Z]+\s)*[a-zA-Z]+$/;
      if (enameFilter.test($('#prop_nameinput').val())) {
        $('#prop_nameinput').removeAttr("style");
      }
      else {
        $('#prop_nameinput').focus().css("border-color", "red").attr('placeholder', 'Please enter valid name').val('');
        return false;
      }
    }


    if ($('#prop_emailinput').val() === '') {
      $('#prop_emailinput').focus().css('border-color', 'red').attr('placeholder', 'Please Enter Email-id');
      return false;
    } else {
      var emai = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
      if (emai.test($('#prop_emailinput').val())) {
        $('#prop_emailinput').removeAttr('style');
      } else {
        $('#prop_emailinput').focus().css('border-color', 'red').attr('placeholder', 'Please enter valid email-id').val('');
        return false;
      }
    }

    if ($('#prop_numinput').val() == "") {
      $('#prop_numinput').focus().css("border-color", "red").attr('placeholder', 'Please Enter Phone Number');
      return false;
    }
    else {
      var mobilee = /^[0-9]{10}$/;
      if (mobilee.test($('#prop_numinput').val())) {
        $('#prop_numinput').removeAttr("style");
      }
      else {
        $('#prop_numinput').focus().css("border-color", "red").attr('placeholder', 'Please enter valid contact number').val('');
        return false;
      }
    }

    this.otploader = true;
    this.propenqSubmitForm();
    // $('body').addClass('bodyoverlay');
    // var param = this.user;
    // this.Service.otpsend(param).subscribe((success) => {
    //   var prestatus = success['Data'];
    //   var status = prestatus[0].MessageErrorDescription;
    //   if(status == "Success"){
    //     this.propenqSubmitForm();
    //     this.countdown6.begin();
    //     var buttonId = $('#one').attr('id');
    //     $('#modal-container6').removeAttr('class').addClass(buttonId);
    //     $('body').addClass('modal-active');
    //     this.otploader = false;
    //     $('body').removeClass('bodyoverlay');
    //   }else{
    //     swal({
    //       title: 'Oops Something Error!',
    //       type: 'error',
    //       showConfirmButton: false,
    //       timer: 1500
    //     })
    //     this.otploader = false;
    //     $('body').removeClass('bodyoverlay');
    //   }
    // }, (err) => {
    //   
    // });
  }

  // otpvalidate6()
  // {
  //   var otplength = 4;
  //   if ($('#otp6').val() == "") {
  //     swal({
  //       title: 'Please enter the OTP!',
  //       type: 'error',
  //       showConfirmButton: false,
  //       timer: 1000
  //     })
  //     return false;
  //   }else{
  //     var liveotpcount = $('#otp6').val().length;
  //     if(liveotpcount < otplength){
  //       swal({
  //         title: 'Please enter the valid OTP!',
  //         type: 'warning',
  //         showConfirmButton: false,
  //         timer: 1500
  //       })
  //       return false;
  //     }else{}
  //   }
  //   var param = this.user;
  //   this.otploader = true;
  //   $('body').addClass('bodyoverlay');
  //   this.Service.otpvalidcheck(param).subscribe((success) => {
  //     var status = success['status'];
  //     if(status == "True")
  //     {
  //       this.otploader = false;
  //       this.cancel.nativeElement.click();
  //       $('body').removeClass('bodyoverlay');
  //       swal({
  //         title: 'OTP Verified',
  //         text: 'We Will Intimate you soon!',
  //         type: 'success',
  //         showConfirmButton: false,
  //         timer: 2500
  //       });
  //       $('#modal-container6').addClass('out');
  //       $('body').removeClass('modal-active');
  //       this.user.name = '';
  //       this.user.number = '';
  //       this.user.mail = '';
  //       this.user.otp = '';
  //       $('#btn_reset2').click();
  //       this.ShowHidecontact();
  //       this.countdown6.restart();
  //     }else{
  //       this.otploader = false;
  //       $('body').removeClass('bodyoverlay');
  //       swal({
  //         title: 'Oops Something Error!',
  //         text: 'Its Not a valid OTP / OTP Expired!',
  //         type: 'error',
  //         showConfirmButton: false,
  //         timer: 1500
  //       })
  //     }
  //   }, (err) => {
  //     
  //   });
  // }

  propenqSubmitForm() {
    var param = this.user;
    var propNamepluscityname = this.propName + "-" + this.Citynamelowcase;
    //  this.Service.EnqPropertyByBHKs(param, this.varient, this.propName).subscribe(success =>
    //   {
    this.Service.EnqProperty(param, propNamepluscityname).subscribe(success => {
      if (success['status'] === 'True') {
        this.otploader = false;
        this.cancel.nativeElement.click();
        $('body').removeClass('bodyoverlay');
        swal({
          // title: 'OTP Verified',
          text: 'We Will Intimate you soon!',
          type: 'success',
          showConfirmButton: false,
          timer: 2500
        });
        $('#modal-container6').addClass('out');
        $('body').removeClass('modal-active');
        this.user.name = '';
        this.user.number = '';
        this.user.mail = '';
        this.user.otp = '';
        $('#btn_reset2').click();
        this.ShowHidecontact();
      } else {
        swal({
          type: 'error',
          title: 'Something Went Wrong',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  }
  otpsend2() {
    if ($('#floor_nameinput').val() == "") {
      $('#floor_nameinput').focus().css("border-color", "red").attr('placeholder', 'Please Enter Name');
      return false;
    }
    else {
      var enameFilter = /^([a-zA-Z]+\s)*[a-zA-Z]+$/;
      if (enameFilter.test($('#floor_nameinput').val())) {
        $('#floor_nameinput').removeAttr("style");
      }
      else {
        $('#floor_nameinput').focus().css("border-color", "red").attr('placeholder', 'Please enter valid name').val('');
        return false;
      }
    }


    if ($('#floor_emailinput').val() === '') {
      $('#floor_emailinput').focus().css('border-color', 'red').attr('placeholder', 'Please Enter Email-id');
      return false;
    } else {
      var emai = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
      if (emai.test($('#floor_emailinput').val())) {
        $('#floor_emailinput').removeAttr('style');
      } else {
        $('#floor_emailinput').focus().css('border-color', 'red').attr('placeholder', 'Please enter valid email-id').val('');
        return false;
      }
    }

    if ($('#floor_numinput').val() == "") {
      $('#floor_numinput').focus().css("border-color", "red").attr('placeholder', 'Please Enter Phone Number');
      return false;
    }
    else {
      var mobilee = /^[0-9]{10}$/;
      if (mobilee.test($('#floor_numinput').val())) {
        $('#floor_numinput').removeAttr("style");
      }
      else {
        $('#floor_numinput').focus().css("border-color", "red").attr('placeholder', 'Please enter valid contact number').val('');
        return false;
      }
    }

    this.otploader = true;
    this.SubmitFormByBhk();
    // $('body').addClass('bodyoverlay');
    // var param = this.user;
    // this.Service.otpsend(param).subscribe((success) => {
    //   var prestatus = success['Data'];
    //   var status = prestatus[0].MessageErrorDescription;
    //   if(status == "Success"){
    //     this.SubmitFormByBhk();
    //     this.countdown2.begin();
    //     var buttonId = $('#one').attr('id');
    //     $('#modal-container2').removeAttr('class').addClass(buttonId);
    //     $('body').addClass('modal-active');
    //     this.otploader = false;
    //     $('body').removeClass('bodyoverlay');
    //   }else{
    //     swal({
    //       title: 'Oops Something Error!',
    //       type: 'error',
    //       showConfirmButton: false,
    //       timer: 1500
    //     })
    //     this.otploader = false;
    //     $('body').removeClass('bodyoverlay');
    //   }
    // }, (err) => {
    //   
    // });
  }

  // otpvalidate2()
  // {
  //   var otplength = 4;
  //   if ($('#otp2').val() == "") {
  //     swal({
  //       title: 'Please enter the OTP!',
  //       type: 'error',
  //       showConfirmButton: false,
  //       timer: 1000
  //     })
  //     return false;
  //   }else{
  //     var liveotpcount = $('#otp2').val().length;
  //     if(liveotpcount < otplength){
  //       swal({
  //         title: 'Please enter the valid OTP!',
  //         type: 'warning',
  //         showConfirmButton: false,
  //         timer: 1500
  //       })
  //       return false;
  //     }else{}
  //   }
  //   var param = this.user;
  //   this.otploader = true;
  //   $('body').addClass('bodyoverlay');
  //   this.Service.otpvalidcheck(param).subscribe((success) => {
  //     var status = success['status'];
  //     if(status == "True")
  //     {
  //       this.otploader = false;
  //       this.cancel.nativeElement.click();
  //       $('body').removeClass('bodyoverlay');
  //       swal({
  //         title: 'OTP Verified',
  //         text: 'We Will Intimate you soon!',
  //         type: 'success',
  //         showConfirmButton: false,
  //         timer: 2500
  //       });
  //       $('#modal-container2').addClass('out');
  //       $('body').removeClass('modal-active');
  //       this.user.name = '';
  //       this.user.number = '';
  //       this.user.mail = '';
  //       this.user.otp = '';
  //       this.ShowHide();
  //       $('#btn_reset2').click();
  //       this.countdown2.restart();
  //     }else{
  //       this.otploader = false;
  //       $('body').removeClass('bodyoverlay');
  //       swal({
  //         title: 'Oops Something Error!',
  //         text: 'Its Not a valid OTP / OTP Expired!',
  //         type: 'error',
  //         showConfirmButton: false,
  //         timer: 1500
  //       })
  //     }
  //   }, (err) => {
  //     
  //   });
  // }

  SubmitFormByBhk() {
    var param = this.user;
    var propNamepluscityname = this.propName + "-" + this.Citynamelowcase;
    this.Service.EnqPropertyByBHKs(param, this.varient, propNamepluscityname, this.cityd).subscribe(success => {
      //  this.Service.EnqProperty(param,this.propName).subscribe(success => {
      if (success['status'] === 'True') {
        this.otploader = false;
        this.cancel.nativeElement.click();
        $('body').removeClass('bodyoverlay');
        swal({
          // title: 'OTP Verified',
          text: 'We Will Intimate you soon!',
          type: 'success',
          showConfirmButton: false,
          timer: 2500
        });
        $('#modal-container2').addClass('out');
        $('body').removeClass('modal-active');
        this.user.name = '';
        this.user.number = '';
        this.user.mail = '';
        this.user.otp = '';
        this.ShowHide();
        $('#btn_reset2').click();
      } else {
        swal({
          type: 'error',
          title: 'Something Went Wrong',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  }
  brochureotpsend() {
    if ($('.brochure_nameinput').val() == "") {
      $('.brochure_nameinput').focus().css("border-color", "red").attr('placeholder', 'Please Enter Name');
      return false;
    }
    else {
      var enameFilter = /^([a-zA-Z]+\s)*[a-zA-Z]+$/;
      if (enameFilter.test($('.brochure_nameinput').val())) {
        $('.brochure_nameinput').removeAttr("style");
      }
      else {
        $('.brochure_nameinput').focus().css("border-color", "red").attr('placeholder', 'Please enter valid name').val('');
        return false;
      }
    }


    if ($('.brochure_emailinput').val() === '') {
      $('.brochure_emailinput').focus().css('border-color', 'red').attr('placeholder', 'Please Enter Email-id');
      return false;
    } else {
      var emai = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
      if (emai.test($('.brochure_emailinput').val())) {
        $('.brochure_emailinput').removeAttr('style');
      } else {
        $('.brochure_emailinput').focus().css('border-color', 'red').attr('placeholder', 'Please enter valid email-id').val('');
        return false;
      }
    }

    if ($('.brochure_numinput').val() == "") {
      $('.brochure_numinput').focus().css("border-color", "red").attr('placeholder', 'Please Enter Phone Number');
      return false;
    }
    else {
      var mobilee = /^[0-9]{10}$/;
      if (mobilee.test($('.brochure_numinput').val())) {
        $('.brochure_numinput').removeAttr("style");
      }
      else {
        $('.brochure_numinput').focus().css("border-color", "red").attr('placeholder', 'Please enter valid contact number').val('');
        return false;
      }
    }

    this.otploader = true;
    this.brochureSubmitForm();
    // $('body').addClass('bodyoverlay');
    // var param = this.user;
    // this.Service.otpsend(param).subscribe((success) => {
    //   var prestatus = success['Data'];
    //   var status = prestatus[0].MessageErrorDescription;
    //   if(status == "Success"){
    //     this.brochureSubmitForm();
    //     this.countdown5.begin();
    //     var buttonId = $('#one').attr('id');
    //     $('#brochure-modal-container').removeAttr('class').addClass(buttonId);
    //     $('body').addClass('modal-active');
    //     this.otploader = false;
    //     $('body').removeClass('bodyoverlay');
    //   }else{
    //     swal({
    //       title: 'Oops Something Error!',
    //       type: 'error',
    //       showConfirmButton: false,
    //       timer: 1500
    //     })
    //     this.otploader = false;
    //     $('body').removeClass('bodyoverlay');
    //   }
    // }, (err) => {
    //   
    // });
  }

  // brochureotpvalidate()
  // {
  //   var otplength = 4;
  //   if ($('#otp5').val() == "") {
  //     swal({
  //       title: 'Please enter the OTP!',
  //       type: 'error',
  //       showConfirmButton: false,
  //       timer: 1000
  //     })
  //     return false;
  //   }else{
  //     var liveotpcount = $('#otp5').val().length;
  //     if(liveotpcount < otplength){
  //       swal({
  //         title: 'Please enter the valid OTP!',
  //         type: 'warning',
  //         showConfirmButton: false,
  //         timer: 1500
  //       })
  //       return false;
  //     }else{}
  //   }
  //   var param = this.user;
  //   this.otploader = true;
  //   $('body').addClass('bodyoverlay');
  //   this.Service.otpvalidcheck(param).subscribe((success) => {
  //     var status = success['status'];
  //     if(status == "True")
  //     {
  //       this.otploader = false;
  //       this.cancel.nativeElement.click();
  //       $('body').removeClass('bodyoverlay');
  //       swal({
  //         title: 'OTP Verified',
  //         text: 'Thank You For Dowloading the Brochure',
  //         type: 'success',
  //         showConfirmButton: false,
  //         timer: 2500
  //       });
  //       $('#brochure-modal-container').addClass('out');
  //       $('body').removeClass('modal-active');
  //       this.user.name = '';
  //       this.user.number = '';
  //       this.user.mail = '';
  //       this.user.otp = '';
  //       this.router.navigate(["/download-brochure/" + this.propID]);
  //       $('#btn_reset5').click();
  //       this.countdown5.restart();
  //     }else{
  //       this.otploader = false;
  //       $('body').removeClass('bodyoverlay');
  //       swal({
  //         title: 'Oops Something Error!',
  //         text: 'Its Not a valid OTP / OTP Expired!',
  //         type: 'error',
  //         showConfirmButton: false,
  //         timer: 1500
  //       })
  //     }
  //   }, (err) => {
  //     
  //   });
  // }

  brochureSubmitForm() {
    var param = this.user;
    var pageorgin = this.propName + "-Brochure Download-" + this.Citynamelowcase;
    // this.Service.EnqPropertyByBHKs(param, this.varient, this.propName).subscribe(success =>
    this.Service.EnqProperty(param, pageorgin).subscribe(success => {
      if (success['status'] === 'True') {
        this.otploader = false;
        this.cancel.nativeElement.click();
        $('body').removeClass('bodyoverlay');
        swal({
          // title: 'OTP Verified',
          text: 'Thank You For Dowloading the Brochure',
          type: 'success',
          showConfirmButton: false,
          timer: 2500
        });
        $('#brochure-modal-container').addClass('out');
        $('body').removeClass('modal-active');
        this.user.name = '';
        this.user.number = '';
        this.user.mail = '';
        this.user.otp = '';
        this.router.navigate(["/download-brochure/" + this.propID]);
        $('#btn_reset5').click();
      } else {
        swal({
          type: 'error',
          title: 'Something Went Wrong',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  }


  otpsend3() {
    if ($('#name').val() == "") {
      $('#name').focus().css("border-color", "red").attr('placeholder', 'Please Enter Name');
      return false;
    }
    else {
      var nameFilter = /^([a-zA-Z]+\s)*[a-zA-Z]+$/;
      if (nameFilter.test($('#name').val())) {
        $('#name').removeAttr("style");
      }
      else {
        $('#name').focus().css("border-color", "red").attr('placeholder', 'Please enter valid name').val('');
        return false;
      }
    }

    if ($('#email').val() === '') {
      $('#email').focus().css('border-color', 'red').attr('placeholder', 'Please Enter Email-id');
      return false;
    } else {
      var emai = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
      if (emai.test($('#email').val())) {
        $('#email').removeAttr('style');
      } else {
        $('#email').focus().css('border-color', 'red').attr('placeholder', 'Please enter valid email-id').val('');
        return false;
      }
    }

    if ($('#mobile').val() == "") {
      $('#mobile').focus().css("border-color", "red").attr('placeholder', 'Please Enter Phone Number');
      return false;
    }
    else {
      var mobileno = /^[0-9]{10}$/;
      if (mobileno.test($('#mobile').val())) {
        $('#mobile').removeAttr("style");
      }
      else {
        $('#mobile').focus().css("border-color", "red").attr('placeholder', 'Please enter valid contact number').val('');
        return false;
      }
    }

    this.otploader = true;
    this.getintouch();
    // $('body').addClass('bodyoverlay');
    // var param = this.user;
    // this.Service.otpsend(param).subscribe((success) => {
    //   var prestatus = success['Data'];
    //   var status = prestatus[0].MessageErrorDescription;
    //   if(status == "Success"){
    //     this.getintouch();
    //     this.countdown3.begin();
    //     var buttonId = $('#one').attr('id');
    //     $('#modal-container3').removeAttr('class').addClass(buttonId);
    //     $('body').addClass('modal-active');
    //     this.otploader = false;
    //     $('body').removeClass('bodyoverlay');
    //   }else{
    //     swal({
    //       title: 'Oops Something Error!',
    //       type: 'error',
    //       showConfirmButton: false,
    //       timer: 1500
    //     })
    //     this.otploader = false;
    //     $('body').removeClass('bodyoverlay');
    //   }
    // }, (err) => {
    //   
    // });
  }

  // otpvalidate3()
  // {
  //   var otplength = 4;
  //   if ($('#otp3').val() == "") {
  //     swal({
  //       title: 'Please enter the OTP!',
  //       type: 'error',
  //       showConfirmButton: false,
  //       timer: 1000
  //     })
  //     return false;
  //   }else{
  //     var liveotpcount = $('#otp3').val().length;
  //     if(liveotpcount < otplength){
  //       swal({
  //         title: 'Please enter the valid OTP!',
  //         type: 'warning',
  //         showConfirmButton: false,
  //         timer: 1500
  //       })
  //       return false;
  //     }else{}
  //   }
  //   var param = this.user;
  //   this.otploader = true;
  //   $('body').addClass('bodyoverlay');
  //   this.Service.otpvalidcheck(param).subscribe((success) => {
  //     var status = success['status'];
  //     if(status == "True")
  //     {
  //       this.otploader = false;
  //       this.cancel.nativeElement.click();
  //       $('body').removeClass('bodyoverlay');
  //       swal({
  //         title: 'OTP Verified',
  //         text: 'We Will Intimate you soon!',
  //         type: 'success',
  //         showConfirmButton: false,
  //         timer: 2500
  //       });
  //       $('#modal-container3').addClass('out');
  //       $('body').removeClass('modal-active');
  //       this.user.name = '';
  //       this.user.number = '';
  //       this.user.mail = '';
  //       this.user.otp = '';
  //       this.userlocation = '';
  //       $('#btn_reset3').click();
  //       this.countdown3.restart();
  //     }else{
  //       this.otploader = false;
  //       $('body').removeClass('bodyoverlay');
  //       swal({
  //         title: 'Oops Something Error!',
  //         text: 'Its Not a valid OTP / OTP Expired!',
  //         type: 'error',
  //         showConfirmButton: false,
  //         timer: 1500
  //       })
  //     }
  //   }, (err) => {
  //     
  //   });
  // }

  getintouch() {
    var param = this.user;
    var pageorgin = this.propName + "-" + this.Citynamelowcase;
    // var sourcetype = 'Homes247-Mobile'
    this.Service.specialformproppage(param, pageorgin, this.bhkselected, this.propertytypeselected,
      this.selectedPriceRange, this.userlocation).subscribe(success => {
        // this.Service.EnqProperty(param, pageorgin).subscribe((success) => {
        if (success['status'] === 'True') {
          this.otploader = false;
          this.cancel.nativeElement.click();
          $('body').removeClass('bodyoverlay');
          swal({
            // title: 'OTP Verified',
            text: 'We Will Intimate you soon!',
            type: 'success',
            showConfirmButton: false,
            timer: 2500
          });
          $('#modal-container3').addClass('out');
          $('body').removeClass('modal-active');
          this.user.name = '';
          this.user.number = '';
          this.user.mail = '';
          this.user.otp = '';
          this.userlocation = '';
          $('#btn_reset3').click();
        } else {
          swal({
            type: 'error',
            title: 'Something Went Wrong',
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }, (err) => {

      });
  }

  fbshare() {
    var currenturl = this.router.url;
    var shareurl = 'https://facebook.com/sharer/sharer.php?u=https://www.homes247.in' + currenturl;
    this.window.open(shareurl, '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes');
  };
  pintrestshare() {
    var currenturl = this.router.url;
    var shareurl = 'https://pinterest.com/pin/create/button/?url=https://www.homes247.in' + currenturl;
    this.window.open(shareurl, '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes');
  }
  linkedinshare() {
    var currenturl = this.router.url;
    var shareurl = 'https://www.linkedin.com/shareproperty?url=https://www.homes247.in' + currenturl;
    this.window.open(shareurl, '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes');
  }
  whatsupshare() {
    var currenturl = this.router.url;
    var shareurl = 'https://api.whatsapp.com/send?text=I Found this property on Homes247.in :) https://www.homes247.in' + currenturl;
    this.window.open(shareurl, '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes');
  }
  mailshare() {
    var currenturl = this.router.url;
    var shareurl = 'https://mail.google.com/mail/u/0/?view=cm&fs=1&tf=1&to&su=You+will+like+this+property+I+found+on+Homes247.in&body=I+found+this+property+on+Homes247.in+that+may+meet+your+requirements.+Click+the+link+to+view+details:%0Ahttps://www.homes247.in' + currenturl + '/mf408lm3x0l7j5ny&ui=2&tf=1';
    this.window.open(shareurl, '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes');
  }

  parsedarray = [];
  addAllSeenProjects() {
    var userID = this.Local_Storage.getItem("userID");
    // var loginId =  this.Local_Storage.getItem('loginID');
    var param = {
      userid: userID,
      propid: this.propID
    }
    if (this.loginId === '1') {
      this.Service.addUserSeenProjects(param).subscribe(responce => {
      });
    } else {
      var id = this.propID;
      if ('SeenPropertyID' in this.Local_Storage) {
      } else {
        this.Local_Storage.setItem('SeenPropertyID', '[]');
      }
      const proparray = this.Local_Storage.getItem('SeenPropertyID');
      const jsonpars = JSON.parse(proparray);
      const itemToRemoveIndex = jsonpars.indexOf(id);
      this.parsedarray = JSON.parse(proparray);
      if (itemToRemoveIndex == -1) {
        // 
        this.parsedarray.push(id);
        this.Local_Storage.setItem('SeenPropertyID', JSON.stringify(this.parsedarray));
      } else {
        // 
        // this.parsedarray = this.parsedarray.filter(function(item) {
        //   return item !== id;
        // });
        // this.Local_Storage.setItem('SeenPropertyID', JSON.stringify(this.parsedarray));
      }
    }
  }
  logincheck() {
    this.UserId = this.Local_Storage.getItem("userID");
    if ('loginID' in this.Local_Storage) {
      this.reviewbutton = true;
      this.loginbutton = false;
      this.Service.getpropertyfavparam(this.propID, this.UserId).subscribe(prop => {
        let propDetails = prop['deatils'];
        this.userfav = propDetails[0].user_fav;
      });
    } else {
      this.reviewbutton = false;
      this.loginbutton = true;
    }
  }


  OnCommentUpdate() {
    this.ratingValue = $('#ratingSection input:radio:checked').val();
    // 
    var userID = this.Local_Storage.getItem("userID");
    var propid = this.propID;
    var param = {
      userid: userID,
      propId: propid,
      rating: this.ratingValue,
      review: this.reviewDetails
    }
    if (this.reviewDetails === '' || this.ratingValue === undefined) {
      swal({
        title: 'Please Rate & Review this property',
        type: 'error',
        showConfirmButton: false,
        timer: 1500
      });
    } else {
      this.Service.addreview(param).subscribe(success => {
        if (success['status'] === 'True') {
          swal({
            title: 'Successfully Submitted',
            text: 'Your Comment and Review is under Moderation! We will notify you When Comment is Active.',
            type: 'success',
            showConfirmButton: true
          });
          this.cancelreviewmodel.nativeElement.click();
          $('#reviewModel').modal('hide');
          this.ratingValue = '';
          this.reviewDetails = '';
          window.location.hash = '';
        } else {

        }
      });
    }
  }

  slideConfig = {
    'arrows': false,
    'infinite': true,
    autoplaySpeed: 3000,
  };

  slideConfigproperty = {
    "slidesToShow": 1,
    "slidesToScroll": 1,
    "cssEase": 'ease-out',
    "arrows": true,
    "infinite": true,
    "autoplay": true,
    "autoplaySpeed": 3000,
  }

  customOptions: OwlOptions = {
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    autoplay: true,
    autoplaySpeed: 300,
    nav: true,
    navText: ["<img src=https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_mobile/images/mini_banner_left_arrow.png alt='LeftArrow' class='prop_details_owl owl-nav owl-prev main_move_left'>",
      "<img src=https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_mobile/images/mini_banner_right_arrow.png alt='RightArrow' class='prop_details_owl owl-nav owl-next main_move_right'>"],
    responsive: {
      0: {
        items: 1.5
      },
      400: {
        items: 3
      },
      740: {
        items: 3
      },
      940: {
        items: 3
      }
    },

  }
  customvideoGallery: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    autoplay: false,
    autoplaySpeed: 300,
    nav: true,
    navText: ["<img src=https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_mobile/images/mini_banner_left_arrow.png alt='LeftArrow' class='prop_details_owl owl-nav owl-prev main_move_left_gallery'>",
      "<img src=https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_mobile/images/mini_banner_right_arrow.png alt='RightArrow' class='prop_details_owl owl-nav owl-next main_move_right_gallery'>"],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
  };
  customOptionsGallery: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    autoplay: true,
    autoplaySpeed: 300,
    nav: true,
    navText: ["<img src=https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_mobile/images/mini_banner_left_arrow.png alt='LeftArrow' class='prop_details_owl owl-nav owl-prev main_move_left_gallery'>",
      "<img src=https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_mobile/images/mini_banner_right_arrow.png alt='RightArrow' class='prop_details_owl owl-nav owl-next main_move_right_gallery'>"],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
  };
  customOptionsAmenities: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    autoplay: true,
    autoplaySpeed: 300,
    nav: true,
    navText: ["<img src=https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_mobile/images/mini_banner_left_arrow.png alt='LeftArrow' class='prop_details_owl owl-nav owl-prev main_move_left_gallery_Amenities'>",
      "<img src=https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_mobile/images/mini_banner_right_arrow.png alt='RightArrow' class='prop_details_owl owl-nav owl-next main_move_right_gallery_Amenities'>"],
    responsive: {
      0: {
        items: 3
      },
      400: {
        items: 5
      },
      740: {
        items: 10
      },
      940: {
        items: 10
      }
    },
  };
  customOptionsBanks: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    autoplay: true,
    autoplaySpeed: 300,
    nav: true,
    navText: ["<img src=https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_mobile/images/mini_banner_left_arrow.png alt='LeftArrow' class='prop_details_owl owl-nav owl-prev main_move_left_gallery_Banks'>",
      "<img src=https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_mobile/images/mini_banner_right_arrow.png alt='RightArrow' class='prop_details_owl owl-nav owl-next main_move_right_gallery_Banks'>"],
    responsive: {
      0: {
        items: 3
      },
      400: {
        items: 5
      },
      740: {
        items: 10
      },
      940: {
        items: 10
      }
    },
  };

  // radha update
  //  submitreview(){
  //   $('#LoginModel').modal('show');
  //   $('#reviewModel').modal('hide');
  // }
  // showsignup(){
  //   $('#LoginModel').modal('hide');
  //   $('#singupModel').modal('show');
  // }
  // showsignin(){
  //  $('#LoginModel').modal('show');
  //  $('#singupModel').modal('hide');
  //  $('#reviewModel').modal('hide');
  // }
  // backfromsignin(){
  //   $('#loginwithotpModel').modal('show');
  //   $('#LoginModel').modal('hide');
  // }
  // backfromresetpass(){
  //   $('#LoginModel').modal('show');
  //   $('#resetpasswordmodel').modal('hide');
  // }
  // ShowLogimodel(){
  //   $('#loginwithotpModel').modal('show');
  //   $('#LoginModel').modal('hide');
  // }

  // loginwithuser(){
  //   $('#loginwithotpModel').modal('hide');
  //   $('#LoginModel').modal('show');
  // }
  // showrestpassmodel(){
  //   $('#resetpasswordmodel').modal('show');
  //   $('#LoginModel').modal('hide');
  // }
  readlessamenitie() {
    $('.paddingAmenities').addClass('Amenitiesheight');
    this.readlessamenities = false;
    this.readmoreamenities = true;
  }

  showpass() {
    var x = <HTMLInputElement>document.getElementById("password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
    var x = <HTMLInputElement>document.getElementById("repassword");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }
  loginotpsend() {
    if ($('#loginmobile').val() == "") {
      $('#loginmobile').focus().css("border-color", "red").attr('placeholder', 'Please Enter Mobile Number');
      return false;
    }
    else {
      var mobilee = /^[0-9]{10}$/;
      if (mobilee.test($('#loginmobile').val())) {
        $('#loginmobile').removeAttr("style");
      }
      else {
        $('#loginmobile').focus().css("border-color", "red").attr('placeholder', 'Please enter valid Mobile number').val('');
        return false;
      }
    }
    const paramNum = {
      number: this.user.number
    }
    this.otploader = true;
    $('body').addClass('bodyoverlay');
    this.Service.otpsend(paramNum).subscribe((success) => {
      var prestatus = success['Data'];
      var status = prestatus[0].MessageErrorDescription;
      if (status == 'Success') {
        this.countdown4.begin();
        var buttonId = $('#one').attr('id');
        $('#modal-container4').removeAttr('class').addClass(buttonId);
        $('body').addClass('modal-active');
        this.otploader = false;
        $('body').removeClass('bodyoverlay');
      } else {
        swal({
          title: 'Oops Something Error!',
          type: 'error',
          showConfirmButton: false,
          timer: 1500
        });
        this.otploader = false;
        $('body').removeClass('bodyoverlay');
      }
    }, (err) => {

    });
  }

  otpvalidatelogin() {
    var otplength = 4;
    if ($('#loginotp').val() == '') {
      swal({
        title: 'Please enter the OTP!',
        type: 'error',
        showConfirmButton: false,
        timer: 1000
      });
      return false;
    } else {
      var liveotpcount = $('#loginotp').val().length;
      if (liveotpcount < otplength) {
        swal({
          title: 'Please enter the valid OTP!',
          type: 'warning',
          showConfirmButton: false,
          timer: 1500
        });
        return false;
      } else {
      }
    }

    const paramNum = this.user;
    this.otploader = true;
    $('body').addClass('bodyoverlay');
    this.Service.otpvalidcheck(paramNum).subscribe((success) => {
      var status = success['status'];
      if (status == 'True') {
        this.onSubmit();
        this.countdown4.restart();
      } else {
        this.otploader = false;
        $('body').removeClass('bodyoverlay');
        swal({
          title: 'Oops Something Error!',
          text: 'Its Not a valid OTP / OTP Expired!',
          type: 'error',
          showConfirmButton: false,
          timer: 1500
        });
      }
    }, (err) => {

    });
  }

  onSubmit() {
    if (this.user.name == undefined) {
      this.user.name = 'guest user'
    }
    var param = {
      number: this.user.number,
      username: this.user.name,
      device_source: this.user.device_source

    }
    this.Service.Loginwithnum(param).subscribe(responce => {
      if (responce['status'] === 'True') {
        this.Local_Storage.setItem('loginID', '1');
        this.loginId = this.Local_Storage.getItem('loginID');
        //localStorage.setItem('loginID','1');
        this.otploader = false;
        this.cancel.nativeElement.click();
        $('body').removeClass('bodyoverlay');
        swal({
          title: 'OTP Verified',
          text: 'login Successfully!',
          type: 'success',
          showConfirmButton: false,
          timer: 2500
        });
        //  window.location.hash='';
        //  var topPos =  $('#section11').offset().top + $('#section11').outerHeight() - window.innerHeight && $(window).scrollTop()
        if (window.location.hash === '#faqmodal') {
          $('#reviewModel').modal('hide');
          $('#askquationmodel').modal('show');
        } else if (window.location.hash === '#ratingreviewmodal') {
          $('#reviewModel').modal('show');
          $('#askquationmodel').modal('hide');
        }
        let userdetails = responce['UserDetails'];
        this.Username = userdetails[0].user_name;
        this.Usernum = userdetails[0].number;
        this.Useremail = userdetails[0].user_email;
        this.Userid = userdetails[0].reg_IDPK;
        this.Local_Storage.setItem('userName', this.Username);
        this.Local_Storage.setItem('usernum', this.Usernum);
        this.Local_Storage.setItem('useremail', this.Useremail);
        this.Local_Storage.setItem('userID', this.Userid);
        if ("SeenPropertyID" in localStorage) {
          this.seenproparr = JSON.parse(localStorage.getItem('SeenPropertyID'));

          const userid = localStorage.getItem("userID");
          var param = {
            userid: userid,
            propid: this.seenproparr
          }
          if (this.seenproparr.length !== 0) {
            this.Service.addUserSeenProjects(param).subscribe(response => {
              if (response['status'] === 'True') {
                localStorage.setItem("SeenPropertyID", "[]");
              } else {
              }
            });
          }
        }

        if ("propertyID" in localStorage) {
          this.storagearr = JSON.parse(localStorage.getItem('propertyID'));
          const userid = localStorage.getItem("userID");
          var param = {
            userid: userid,
            propid: this.storagearr
          }
          if (this.storagearr.length !== 0) {
            this.Service.addfavaourite(param).subscribe(response => {
              if (response['status'] === 'True') {
                localStorage.setItem("propertyID", "[]");
              } else {
              }
            });
          }
        }
        this.user.number = '';
        this.user.otp = '';
        // this.window.location.reload();
        this.logincheck();
        $('#modal-container4').addClass('out');
        $('body').removeClass('modal-active');
        $('#loginwithotpModel').modal('hide');
        this.eusernumber = '';
      } else {
        swal({
          title: 'Something went wrong!',
          text: 'Its Not a valid OTP',
          type: 'error',
          showConfirmButton: false,
          timer: 1500
        });
      }
    }, (err) => {

    });
  }
  resetemail: any;
  // ResetPass(){
  //   if ($('#remail').val() == "") {
  //     $('#remail').focus().css("border-color", "red").attr('placeholder', 'Please Enter Email-id');
  //     return false;
  //   }
  //   else {
  //     var emaill = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
  //     if (emaill.test($('#remail').val())) {
  //       $('#remail').removeAttr("style");
  //     }
  //     else {
  //       $('#remail').focus().css("border-color", "red").attr('placeholder', 'Please enter valid email').val('');
  //       return false;
  //     }
  //   }
  // let  resetpassemail = this.resetemail
  // this.Service.forgetPasswordRequest(resetpassemail).subscribe((response) =>{
  //   if(response['status'] === 'True'){
  //     swal({
  //       title: 'Reset Password',
  //       text: 'Reset password link has been sent to' + this.resetemail + 'please check',
  //       type: 'success',
  //       showConfirmButton: false,
  //       timer: 2500
  //     });
  //   }else{
  //     swal({
  //       title: 'Reset Password',
  //       text: 'Your email id is not registred with us please enter valid email',
  //       type: 'error',
  //       showConfirmButton: false,
  //       timer: 2500
  //     });
  //   }
  //   this.resetemail = '';
  // });
  // }
  signInWithGoogle() {
    // this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
  // radha update end
  readmoreamenitie() {
    $('.paddingAmenities').removeClass('Amenitiesheight');
    this.readlessamenities = true;
    this.readmoreamenities = false;
  }
  // ShowAllAns(uestionid){
  //   this.ShowAnswerDiv = true;
  //   this.showmainpage = false;
  //   this.getquestionlistbyid(uestionid);
  // }

  OnAskquestion() {
    var loginId = this.Local_Storage.getItem('loginID');
    window.location.hash = 'faqmodal';
    if (loginId === '1') {
      $('#askquationmodel').modal('show');
      $('#loginwithotpModel').modal('hide');
    } else {
      // window.location.hash='#Login';
      $('#askquationmodel').modal('hide');
      $('#loginwithotpModel').modal('show');
    }
  }
  ratingreviewmodal() {
    var loginId = this.Local_Storage.getItem('loginID');
    window.location.hash = 'ratingreviewmodal';
    if (loginId === '1') {
      $('#reviewModel').modal('show');
      $('#loginwithotpModel').modal('hide');
    } else {
      // window.location.hash='#Login';
      $('#reviewModel').modal('hide');
      $('#loginwithotpModel').modal('show');
    }
  }
  closemodal() {
    window.location.hash = '';
  }
  getquestionlist() {
    var param = {
      propId: this.propID,
    }
    this.Service.DiscusQuestionList(param).subscribe(responce => {
      this.question = responce['deatils'];
      if (this.question.length === 0) {
        this.showanswer = false;
        this.zeroanswer = true;
      } else {
        this.showanswer = true;
        this.zeroanswer = false;
      }
      if (this.question.length >= 3) {
        this.readallqestionanstextshow = true;
      }
      // this.questionid = this.question[0]['discussion_question_IDPK'];
      // if(this.question[2]['Answer_Deatils'].length === 0){
      //  this.readallans = false;
      //  this.giveanswer = true;
      // }
      // if(this.question[2]['Answer_Deatils'].length != 0){
      //   this.readallans = true;
      //   this.giveanswer = false;
      //  }
    });
  }
  getquestionlistbyid(qestionid) {
    // this.ShowAnswerDiv = true;
    // this.showmainpage = false;
    // this.showratingandreview = false;
    // this.showallquestionansdiv = false
    var param = {
      questionId: qestionid,
    }
    this.Service.DiscusQuestionListById(param).subscribe(responce => {
      this.questionlist = responce['deatils'];
      this.questionid = this.question[0]['discussion_question_IDPK'];
      if (this.questionlist[0]['Answer_Deatils'].length === 0) {
        this.readallans = false;
        this.giveanswer = true;
      } else {
        this.readallans = true;
        this.giveanswer = false;
      }
    })
  }
  onpropStatus() {
    if (this.propStatus === false) {
      this.propStatus = true;
      this.questionCategory.push('Status');
    } else if (this.propStatus === true) {
      this.propStatus = false;
      for (let i = 0; i < this.questionCategory.length; i++) {
        if (this.questionCategory[i] === 'Status') {
          this.questionCategory.splice(i, 1);
        }
      }
    }
  }
  onPrice() {
    if (this.propPrice === false) {
      this.propPrice = true;
      this.questionCategory.push('Price');
    } else if (this.propPrice === true) {
      this.propPrice = false;
      for (let i = 0; i < this.questionCategory.length; i++) {
        if (this.questionCategory[i] === 'Price') {
          this.questionCategory.splice(i, 1);
        }
      }
    }
  }
  onLocation() {
    if (this.propLocation === false) {
      this.propLocation = true;
      this.questionCategory.push('Location');
    } else if (this.propLocation === true) {
      this.propLocation = false;
      for (let i = 0; i < this.questionCategory.length; i++) {
        if (this.questionCategory[i] === 'Location') {
          this.questionCategory.splice(i, 1);
        }
      }
    }
  }
  onHomeLoans() {
    if (this.propHomeLoans === false) {
      this.propHomeLoans = true;
      this.questionCategory.push('Home Loans');
    } else if (this.propHomeLoans === true) {
      this.propHomeLoans = false;
      for (let i = 0; i < this.questionCategory.length; i++) {
        if (this.questionCategory[i] === 'Home Loans') {
          this.questionCategory.splice(i, 1);
        }
      }
    }
  }
  onLegalApprovals() {
    if (this.propLegalApprovals === false) {
      this.propLegalApprovals = true;
      this.questionCategory.push('Legal Approvals');
    } else if (this.propLegalApprovals === true) {
      this.propLegalApprovals = false;
      for (let i = 0; i < this.questionCategory.length; i++) {
        if (this.questionCategory[i] === 'Legal Approvals') {
          this.questionCategory.splice(i, 1);
        }
      }
    }
  }
  onPossession() {
    if (this.propPossession === false) {
      this.propPossession = true;
      this.questionCategory.push('Possession');
    } else if (this.propPossession === true) {
      this.propPossession = false;
      for (let i = 0; i < this.questionCategory.length; i++) {
        if (this.questionCategory[i] === 'Possession') {
          this.questionCategory.splice(i, 1);
        }
      }
    }
  }
  onConfiguration() {
    if (this.propConfiguration === false) {
      this.propConfiguration = true;
      this.questionCategory.push('Configuration');
    } else if (this.propConfiguration === true) {
      this.propConfiguration = false;
      for (let i = 0; i < this.questionCategory.length; i++) {
        if (this.questionCategory[i] === 'Configuration') {
          this.questionCategory.splice(i, 1);
        }
      }
    }
  }

  SubmitQuation() {
    if ($('#quation').val() == "") {
      $('#quation').focus().css("border-color", "red").attr('placeholder', 'Please Ask your question');
      return false;
    }
    const uid = localStorage.getItem("userID");
    const uname = localStorage.getItem("userName");
    const uquestion = this.userquestion;
    const ucategory = this.questionCategory;
    const othercategory = this.otherquestion;
    if (this.questionCategory.length != 0) {
      var param = {
        propId: this.propID,
        userId: uid,
        userName: uname,
        category: ucategory,
        question: uquestion
      }
      this.Service.Postquestion(param).subscribe(responce => {
        if (responce['status'] = 'True') {
          swal({
            title: 'Question Submit',
            text: 'Your question submitted Successfully!',
            type: 'success',
            showConfirmButton: false,
            timer: 2500
          });
          window.location.hash = '';
        }
      })
    } else if (this.questionCategory.length == 0) {
      var param1 = {
        propId: this.propID,
        userId: uid,
        userName: uname,
        category: othercategory,
        question: uquestion
      }
      this.Service.Postquestion(param1).subscribe(responce => {
        if (responce['status'] = 'True') {
          swal({
            title: 'Question Submit',
            text: 'Your question submitted Successfully!',
            type: 'success',
            showConfirmButton: false,
            timer: 2500
          });
          window.location.hash = '';
        }
      })
    }
    $('#askquationmodel').modal('hide');
    this.userquestion = '';
  }
  SubmitAnswer(questionid) {
    if (this.AnswerForm.value.useranswer === '') {
      swal({
        text: 'please fill the form',
        type: 'error',
        showConfirmButton: false,
        timer: 2500
      });
    } else {
      var loginId = this.Local_Storage.getItem('loginID');
      if (loginId === '1') {
        const Uid = localStorage.getItem("userID");
        const Uname = localStorage.getItem("userName");
        var param = {
          propId: this.propID,
          userId: Uid,
          userName: Uname,
          QuestionId: questionid,
          userAnswer: this.AnswerForm.value.useranswer
        }
        this.Service.Postanswer(param).subscribe(responce => {
          if (responce['status'] = 'True') {
            swal({
              title: 'Answer Submit',
              text: 'Your answer submitted Successfully!',
              type: 'success',
              showConfirmButton: false,
              timer: 2500
            });
          }
          $(".collapse").collapse('hide');
          this.AnswerForm.controls.useranswer.setValue('');
        })
      } else {
        $('#loginwithotpModel').modal('show');
      }
    }
  }
  // showratingreview(){
  //   window.location.hash='#ReviewList';
  //   this.ShowAnswerDiv = false;
  //   this.showmainpage = false;
  //   this.showratingandreview = true;
  //   this.showallquestionansdiv = false;
  //   window.scroll(0,0);
  // }
  // showallquestionans(){
  //   this.ShowAnswerDiv = false;
  //   this.showmainpage = false;
  //   this.showratingandreview = false;
  //   this.showallquestionansdiv = true;
  //    window.scroll(0,0);
  // }
  // ShowMainpage(){
  //   this.ShowAnswerDiv = false;
  //   this.showmainpage = true;
  //   this.showratingandreview = false;
  //   this.showallquestionansdiv = false;
  //   window.scroll(0,0);
  // }
  // backquestionansdiv(){
  //   this.ShowAnswerDiv = false;
  //   this.showmainpage = true;
  //   this.showratingandreview = false;
  //   this.showallquestionansdiv = false;
  //   this.scrollTo('section11');
  // }
  // compare prop

  oncompareshowimgclick(propid, proptype) {
    this.hideshowcompare = true;
    if ('ComparePropID' in this.Local_Storage) {
    } else {
      this.Local_Storage.setItem('ComparePropID', '[]');
    }
    this.comparePropType = this.Local_Storage.getItem('comparePropType1');
    const proparray = this.Local_Storage.getItem('ComparePropID');
    const jsonpars = JSON.parse(proparray);
    this.compareproparray = JSON.parse(localStorage.getItem('ComparePropID'));
    if (this.compareproparray.length >= 2) {
      swal({
        text: 'Upto two properties can compare at a time',
        type: 'error',
        showConfirmButton: false,
        timer: 2000
      })
    }
    else if (this.comparePropType == null) {
      const itemToRemoveIndex = jsonpars.indexOf(propid);
      this.parsedarray = JSON.parse(proparray);

      if (itemToRemoveIndex == -1) {
        this.parsedarray.push(propid);
        this.Local_Storage.setItem('ComparePropID', JSON.stringify(this.parsedarray));
      } else {
        swal({
          text: 'Property Already Added',
          type: 'error',
          showConfirmButton: false,
          timer: 2000
        })
      }
    } else if (this.comparePropType == proptype) {
      const proparray = this.Local_Storage.getItem('ComparePropID');
      const jsonpars = JSON.parse(proparray);
      const itemToRemoveIndex = jsonpars.indexOf(propid);
      this.parsedarray = JSON.parse(proparray);

      if (itemToRemoveIndex == -1) {
        this.parsedarray.push(propid);
        if (this.parsedarray.length === 1) {
          this.showselectitem = true;
          this.showcomparenow = false;
        } else if (this.parsedarray.length >= 2) {
          this.showcomparenow = true;
          this.showselectitem = false;
        }
        this.Local_Storage.setItem('ComparePropID', JSON.stringify(this.parsedarray));
      } else {
        swal({
          text: 'Property Already Added',
          type: 'error',
          showConfirmButton: false,
          timer: 2000
        })
      }
    } else {
      swal({
        text: 'Compare only with same Property Type',
        type: 'error',
        showConfirmButton: false,
        timer: 2000
      })
    }
    this.compareStorageArry = JSON.parse(localStorage.getItem('ComparePropID'));
    var compare1 = this.compareStorageArry[0];
    var compare2 = this.compareStorageArry[1];


    this.Service.getproperty(compare1).subscribe(prop => {
      let propDetails = prop['deatils'];
      this.propertiesDetails = propDetails;
      this.propimag1 = this.propertiesDetails[0].images[0].name;
      this.propertyname1 = this.propertiesDetails[0]['propertyName'];
      this.propid1 = this.propertiesDetails[0]['property_info_IDPK'];
      this.proptype1 = this.propertiesDetails[0]['propertyType'];
      this.cityname = this.propertiesDetails[0]['city_name'];
      this.Local_Storage.setItem("comparePropType1", this.proptype1);
      this.compareloader1 = false;
      this.compareprop1 = true;
    });
    this.Service.getproperty(compare2).subscribe(prop => {
      let propDetails = prop['deatils'];
      this.propertiesDetails = propDetails;
      this.propimag2 = this.propertiesDetails[0].images[0].name;
      this.propertyname2 = this.propertiesDetails[0]['propertyName'];
      this.propid2 = this.propertiesDetails[0]['property_info_IDPK'];
      this.proptype2 = this.propertiesDetails[0]['propertyType'];
      this.cityname = this.propertiesDetails[0]['city_name'];
      this.Local_Storage.setItem("comparePropType2", this.proptype2);
      this.compareloader2 = false;
      this.compareprop2 = true;
    });
  }

  closeprop1(propid1) {
    this.compareproparray = JSON.parse(localStorage.getItem('ComparePropID'));
    if (this.compareproparray.length == 1) {
      this.hideshowcompare = false;
      this.Local_Storage.removeItem("comparePropType1");
    } else {
      this.hideshowcompare = true;
    }
    if ('ComparePropID' in this.Local_Storage) {
    } else {
      this.Local_Storage.setItem('ComparePropID', '[]');
    }
    const proparray = this.Local_Storage.getItem('ComparePropID');
    const jsonpars = JSON.parse(proparray);
    const itemToRemoveIndex = jsonpars.indexOf(propid1);

    this.parsedarray = JSON.parse(proparray);
    {
      this.parsedarray = this.parsedarray.filter(function (item) {
        return item !== propid1;
      })
      this.compareloader1 = true;
      this.compareprop1 = false;
      this.Local_Storage.setItem("ComparePropID", JSON.stringify(this.parsedarray));
    }
  }
  closeprop2(propid2) {
    this.compareproparray = JSON.parse(localStorage.getItem('ComparePropID'));
    if (this.compareproparray.length == 1) {
      this.hideshowcompare = false;
      this.Local_Storage.removeItem("comparePropType1");
    } else {
      this.hideshowcompare = true;
    }
    if ('ComparePropID' in this.Local_Storage) {
    } else {
      this.Local_Storage.setItem('ComparePropID', '[]');
    }
    const proparray = this.Local_Storage.getItem('ComparePropID');
    const jsonpars = JSON.parse(proparray);
    const itemToRemoveIndex = jsonpars.indexOf(propid2);

    this.parsedarray = JSON.parse(proparray);
    {
      this.parsedarray = this.parsedarray.filter(function (item) {
        return item !== propid2;
      })
      this.compareloader2 = true;
      this.compareprop2 = false;
      this.Local_Storage.setItem("ComparePropID", JSON.stringify(this.parsedarray));
    }
  }
  CompareNow() {
    this.router.navigate(["/compare-properties"]);
    this.Local_Storage.setItem("cityname", this.cityname);
  }
  Visiblebrochure = false;
  brochuredownload() {
    this.Visiblebrochure = this.Visiblebrochure ? false : true;
    // this.router.navigate(["/download-brochure/" + this.propID]);
  }
  InVisiblebrochure() {
    this.Visiblebrochure = this.Visiblebrochure ? false : true;
  }
  onebhkselect = false;
  twobhkselect = false;
  threebhkselect = false;
  fourbhkselect = false;
  fivebhkselect = false;
  plotselect = false;
  bhkselected = '';
  onebhkclick() {
    if (this.onebhkselect === true) {
      this.bhkselected = '';
      this.onebhkselect = false;
    } else if (this.onebhkselect === false) {
      this.bhkselected = '1 BHK';
      this.onebhkselect = true;
      this.twobhkselect = false;
      this.threebhkselect = false;
      this.fourbhkselect = false;
      this.fivebhkselect = false;
      this.plotselect = false;
    }
  }
  twobhkclick() {
    if (this.twobhkselect === true) {
      this.bhkselected = '';
      this.twobhkselect = false;
    } else if (this.twobhkselect === false) {
      this.bhkselected = '2 BHK';
      this.onebhkselect = false;
      this.twobhkselect = true;
      this.threebhkselect = false;
      this.fourbhkselect = false;
      this.fivebhkselect = false;
      this.plotselect = false;
    }
  }
  threebhkclick() {
    if (this.threebhkselect === true) {
      this.bhkselected = '';
      this.threebhkselect = false;
    } else if (this.threebhkselect === false) {
      this.bhkselected = '3 BHK';
      this.onebhkselect = false;
      this.twobhkselect = false;
      this.threebhkselect = true;
      this.fourbhkselect = false;
      this.fivebhkselect = false;
      this.plotselect = false;
    }
  }
  fourbhkclick() {
    if (this.fourbhkselect === true) {
      this.bhkselected = '';
      this.fourbhkselect = false;
    } else if (this.fourbhkselect === false) {
      this.bhkselected = '4 BHK';
      this.onebhkselect = false;
      this.twobhkselect = false;
      this.threebhkselect = false;
      this.fourbhkselect = true;
      this.fivebhkselect = false;
      this.plotselect = false;
    }
  }
  fivebhkclick() {
    if (this.fivebhkselect === true) {
      this.bhkselected = '';
      this.fivebhkselect = false;
    } else if (this.fivebhkselect === false) {
      this.bhkselected = '5 BHK';
      this.onebhkselect = false;
      this.twobhkselect = false;
      this.threebhkselect = false;
      this.fourbhkselect = false;
      this.fivebhkselect = true;
      this.plotselect = false;
    }
  }
  plotbhkclick() {
    if (this.plotselect === true) {
      this.bhkselected = '';
      this.plotselect = false;
    } else if (this.plotselect === false) {
      this.bhkselected = '1 BHK';
      this.onebhkselect = false;
      this.twobhkselect = false;
      this.threebhkselect = false;
      this.fourbhkselect = false;
      this.fivebhkselect = false;
      this.plotselect = true;
    }
  }
  thirtytofourtyselect = false;
  thirtytofiftyselect = false;
  thirtytosixtyselect = false;
  fourtytosixtyselect = false;
  thirtytofourtyclick() {
    if (this.thirtytofourtyselect === true) {
      this.bhkselected = '';
      this.thirtytofourtyselect = false;
    } else if (this.thirtytofourtyselect === false) {
      this.bhkselected = '30*40';
      this.thirtytofourtyselect = true;
      this.thirtytofiftyselect = false;
      this.thirtytosixtyselect = false;
      this.fourtytosixtyselect = false;
    }
  }
  thirtytofiftyclick() {
    if (this.thirtytofiftyselect === true) {
      this.bhkselected = '';
      this.thirtytofiftyselect = false;
    } else if (this.thirtytofiftyselect === false) {
      this.bhkselected = '30*50';
      this.thirtytofourtyselect = false;
      this.thirtytofiftyselect = true;
      this.thirtytosixtyselect = false;
      this.fourtytosixtyselect = false;
    }
  }
  thirtytosixtyclick() {
    if (this.thirtytosixtyselect === true) {
      this.bhkselected = '';
      this.thirtytosixtyselect = false;
    } else if (this.thirtytosixtyselect === false) {
      this.bhkselected = '30*60';
      this.thirtytofourtyselect = false;
      this.thirtytofiftyselect = false;
      this.thirtytosixtyselect = true;
      this.fourtytosixtyselect = false;
    }
  }
  fourtytosixtyclick() {
    if (this.fourtytosixtyselect === true) {
      this.bhkselected = '';
      this.fourtytosixtyselect = false;
    } else if (this.fourtytosixtyselect === false) {
      this.bhkselected = '40*60';
      this.thirtytofourtyselect = false;
      this.thirtytofiftyselect = false;
      this.thirtytosixtyselect = false;
      this.fourtytosixtyselect = true;
    }
  }
  apartmentselect = false;
  villaselect = false;
  propertytypeselected = '';
  aprtmentselectclick() {
    this.apartmentbhkoptions = true;
    this.villabhkoptions = false;
    this.plotareaoptions = false
    if (this.apartmentselect === true) {
      this.propertytypeselected = '';
      this.apartmentselect = false;
    } else if (this.apartmentselect === false) {
      this.propertytypeselected = 'Apartment';
      this.apartmentselect = true;
      this.villaselect = false;
      this.plotselect = false;
    }
  }
  villaselectclick() {
    this.villabhkoptions = true;
    this.apartmentbhkoptions = false;
    this.plotareaoptions = false
    if (this.villaselect === true) {
      this.propertytypeselected = '';
      this.villaselect = false;
    } else if (this.villaselect === false) {
      this.propertytypeselected = 'Villa';
      this.apartmentselect = false;
      this.villaselect = true;
      this.plotselect = false;
    }
  }
  plotselectclick() {
    this.villabhkoptions = false;
    this.apartmentbhkoptions = false;
    this.plotareaoptions = true
    if (this.plotselect === true) {
      this.propertytypeselected = '';
      this.plotselect = false;
    } else if (this.plotselect === false) {
      this.propertytypeselected = 'Plot';
      this.apartmentselect = false;
      this.villaselect = false;
      this.plotselect = true;
    }
  }
  Lessthanfiftylac = false;
  FiftytoEightylac = false;
  EightytoOnecr = false;
  Onecr = false;
  selectedPriceRange = '';
  Lessthanfiftylacclick() {
    if (this.Lessthanfiftylac === true) {
      this.selectedPriceRange = '';
      this.Lessthanfiftylac = false;
    } else if (this.Lessthanfiftylac === false) {
      this.selectedPriceRange = '< 50L';
      this.Lessthanfiftylac = true;
      this.FiftytoEightylac = false;
      this.EightytoOnecr = false;
      this.Onecr = false;
    }
  }
  FiftytoEightylacclick() {
    if (this.FiftytoEightylac === true) {
      this.selectedPriceRange = '';
      this.FiftytoEightylac = false;
    } else if (this.FiftytoEightylac === false) {
      this.selectedPriceRange = '50L-80L';
      this.Lessthanfiftylac = false;
      this.FiftytoEightylac = true;
      this.EightytoOnecr = false;
      this.Onecr = false;
    }
  }
  EightytoOnecrclick() {
    if (this.EightytoOnecr === true) {
      this.selectedPriceRange = '';
      this.EightytoOnecr = false;
    } else if (this.EightytoOnecr === false) {
      this.selectedPriceRange = '80L-1Cr';
      this.Lessthanfiftylac = false;
      this.FiftytoEightylac = false;
      this.EightytoOnecr = true;
      this.Onecr = false;
    }
  }
  Onecrclick() {
    if (this.Onecr === true) {
      this.selectedPriceRange = '';
      this.Onecr = false;
    } else if (this.Onecr === false) {
      this.selectedPriceRange = '1Cr +';
      this.Lessthanfiftylac = false;
      this.FiftytoEightylac = false;
      this.EightytoOnecr = false;
      this.Onecr = true;
    }
  }
  hideImage = true;
  youtube(youtubeLink) {
    this.Videoloader = true;
    var video_wrapper = $('.video_section');
    if (video_wrapper.length) {
      video_wrapper.html('<iframe class="embed-responsive-item" width="100%" height="200" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen src="' + youtubeLink + '?autoplay=1"></iframe>');
    }
    $('.video_section').addClass('video_section_afterclick');
    this.Videoloader = false;
    this.hideImage = false;
  }
  popshow() {
    $('[data-toggle="popover"]').popover()
  }

  addwishlist(id) {
    const userid = this.Local_Storage.getItem("userID");
    var param = {
      userid: userid,
      propid: id
    }
    this.Service.addfavaourite(param).subscribe(response => {
    });
  }

  wishlistaddstorage(id) {
    if ("propertyID" in this.Local_Storage) {
    } else {
      this.Local_Storage.setItem("propertyID", "[]");
    }
    const proparray = this.Local_Storage.getItem('propertyID');
    const jsonpars = JSON.parse(proparray);
    const itemToRemoveIndex = jsonpars.indexOf(id);

    this.parsedarray = JSON.parse(proparray);
    if (itemToRemoveIndex == -1) {
      this.parsedarray.push(id);
      this.Local_Storage.setItem("propertyID", JSON.stringify(this.parsedarray));
    } else {
      this.parsedarray = this.parsedarray.filter(function (item) {
        return item !== id
      })
      this.Local_Storage.setItem("propertyID", JSON.stringify(this.parsedarray));
    }
  }

  specialfunctions() {
    if ('userID' in this.Local_Storage) {
      this.localstorediv = false;
    } else {
      this.localstorediv = true;
    }
    if ("propertyID" in this.Local_Storage) {
      this.storagearr = JSON.parse(this.Local_Storage.getItem('propertyID'));
    } else {
      this.Local_Storage.setItem("propertyID", "[]");
      this.storagearr = JSON.parse(this.Local_Storage.getItem('propertyID'));
    }
  }
  showtableformat() {
    $('.hideshow-table').css('display', 'block')
    $('.hideshow-not-table').css('display', 'none')
  }
  hidetableformat() {
    $('.hideshow-table').css('display', 'none')
    $('.hideshow-not-table').css('display', 'block')
  }
  showpricetableformat() {
    $('.showhideprice-nontable').css('display', 'none')
    $('.showhideprice-table').css('display', 'block')
  }
  hidepricetableformat() {
    $('.showhideprice-nontable').css('display', 'block')
    $('.showhideprice-table').css('display', 'none')
  }
  showamenitiestableformat() {
    $('.showhideAmenities-table').css('display', 'block')
    $('.showhideAmenities-nontable').css('display', 'none')
  }
  hideamenitiestableformat() {
    $('.showhideAmenities-table').css('display', 'none')
    $('.showhideAmenities-nontable').css('display', 'block')
  }
  // getNearByLocalities(){
  //   var localityid = this.propertiesDetails[0].LoaclityId;
  //   this.locidbread = localityid;
  //   var nearbylocid = this.locidbread;
  //   
  //   this.Service.getNearByLocalities(nearbylocid).subscribe(prop => {
  //     // let propDetails = prop['deatils'];
  //   });
  // }
  // new radha update

  // start()
  // {
  //   this.countdown.begin();
  // }
  // reset()
  // {
  //   this.countdown.restart();
  // }

  // getintouch()
  // {
  //     if($('#name').val()=="")
  //      {
  //          $('#name').focus().css("border-color","red").attr('placeholder','Please Enter Name');
  //          return false;
  //      }
  //     else
  //     {
  //         var nameFilter=/^([a-zA-Z]+\s)*[a-zA-Z]+$/;
  //         if(nameFilter.test($('#name').val()))
  //            {
  //             $('#name').removeAttr("style");
  //            }
  //         else
  //         {
  //             $('#name').focus().css("border-color","red").attr('placeholder','Please enter valid name').val('');
  //             return false;
  //         }
  //     }
  //
  //     if($('#mobile').val()=="")
  //      {
  //          $('#mobile').focus().css("border-color","red").attr('placeholder','Please Enter Phone Number');
  //          return false;
  //      }
  //     else
  //     {
  //        var mobileno=/^[0-9]{10}$/;
  //          if(mobileno.test($('#mobile').val()))
  //          {
  //              $('#mobile').removeAttr("style");
  //          }
  //           else{
  //                $('#mobile').focus().css("border-color","red").attr('placeholder','Please enter valid contact number').val('');
  //                return false;
  //           }
  //       }
  //       swal({
  //         title: 'We Will Intimate you soon!',
  //         type: 'success',
  //         showConfirmButton: false,
  //         timer: 1500
  //         })
  //        var param = this.user;
  //        var pageorgin = "City Page";
  //
  //         this.Service.addAboutCall(param,pageorgin).subscribe((success) => {
  //               // this.user = success;
  //               // var status = success.status;
  //               this.user.name = '';
  //               this.user.number = '';
  //         }, (err) => {
  //           
  //         });
  //      }


  // save(){
  //   this.ngOnInit();
  //   $('.modal').removeClass('in');
  //
  //   $('#myModal_city').hide();
  //
  //   $('.modal-backdrop').remove();
  //   $('body').removeClass('modal-open');
  //   $('body').css('padding-right',"");
  //  }

}

