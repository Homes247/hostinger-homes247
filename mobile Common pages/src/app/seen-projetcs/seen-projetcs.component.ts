import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { DataService } from '../data.service';
import { Meta, Title } from '@angular/platform-browser';
// import { PopoverController } from '@ionic/angular';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { enquiry } from '../prop-details-new/class';
import { DataService2 } from '../data.service2';
import { FilterService } from '../filter.service';
import { CityService } from '../city.service';
// import { Share } from '@capacitor/share';
// import { Capacitor } from '@capacitor/core';
import { CountdownComponent, CountdownEvent } from 'ngx-countdown';
import { ProplistingService } from '../proplisting.service';
import { ElitedataService } from '../elitedata.service';
declare var swal: any;
declare var $: any;


declare var $: any;
@Component({
  selector: 'app-seen-projetcs',
  templateUrl: './seen-projetcs.component.html',
  styleUrls: ['./seen-projetcs.component.css']
})
export class SeenProjetcsComponent implements OnInit {
  @ViewChild('contactForm') contactForm;
  @ViewChild('cd4', { static: false }) private countdown4: CountdownComponent;
  @ViewChild('ngOtpInput', { static: false }) ngOtpInput: any;
  showLoader: boolean;
  Date = new Date();
  propertyimage = this.Service.imagesURL + "uploadPropertyImgs/";
  coverImageUrl = this.Service.SellImages + 'cover/';
  coverImageUrlRent = this.Service.RentCoverImage;
  seenproject = [];

  city: any;
  wishListingLength: any;
  UserSeenLength: any;
  UserContactedLength: any;
  alloffersList = [];
  mergerContactedListArrayLength: any;
  user = new enquiry();
  property_id: any;
  zeroprojects = false;
  userDetails = [];
  UserSeenProjects = [];
  UserContactedProjects = [];
  mergerWishlistArray = [];
  mergerSeenListArray = [];
  mergerContactedListArray = [];

  lastname: any;
  imageUrls: any;

  enquiryFormComponent: any;
  WhishlistArray = [];
  seenlistArray = [];
  contactedlistArray = [];
  showMergedWishListLength = false;
  showMergedSeenListLength = false;
  showMergedContactedListLength = false;
  wishListing = [];
  parsedarray = [];

  componentloads = false;
  otpModel1;


  wishListDataDetailsSale = [];
  seenDataDetailsSale = [];
  datadetailsIndividual = [];
  datadetailsRent = [];
  WhishlistIndividualArray = [];
  seenIndividualArray = [];
  seenRentalArray = [];
  WhishlistRentalArray = [];

  contactedDataDetailsSale = [];
  contactedIndividualArray = [];
  contactedRentalArray = [];

  WhishlistCommercialArray = [];
  WhishlistPGArray = [];
  seenCommercialArray = [];
  seenPGArray = [];
  contactedCommercialArray = [];
  contactedPGArray = [];

  commericalImgUrl = 'https://img-mb.homes247.in/images/commerical_img/gallery/';
  pgCoverImgUrl = 'https://img-mb.homes247.in/images/pg_img/gallery/';

  wishListingLength2: number;
  UserSeenLength2: number;
  UserContactedLength2: number;
  PropertyCount: number;
  individualCount: number;
  rentalCount: number;
  pgCount: number;
  commercialCount: number;
  PropertySeenCount: number;
  individualSeenCount: number;
  rentalSeenCount: number;
  commercialSeenCount: number;
  pgSeenCount: number;
  PropertyContactCount: number;
  individualContactCount: number;
  rentalContactCount: number;
  commercialContactCount: number;
  pgContactCount: number;

  @HostListener('touchstart', ['$event'])
  onTouchLoad() {
    this.Service.mouseenterservice3();
    $('.border_div').removeAttr('id');

    // if (this.componentloads == false) {
    //   this.componentloads = true;
    //   // import('../builder-locality3/builder-locality3.module').then(mod => mod.BuilderLocality3Module).then(BuilderLocality3Module => {
    //   //   this.Builder4Component = BuilderLocality3Module.components['lazy'];
    //   // });

    //   import('../enquiry-form/enquiry-form.module').then(mod => mod.enquiryFormModule).then(enquiryFormModule =>{
    //     this.enquiryFormComponent = enquiryFormModule.components['lazy'];
    //   $('.modal-login').css('z-index', '99999');
    //   });
    // }

  }
  constructor(private router: Router,
    // private popoverController: PopoverController,
    private Service: DataService,
    private titleService: Title,
    public Service2: DataService2,
    public Filter: FilterService,
    public cityservice: CityService,
    public propService: ProplistingService,
    private meta: Meta,
    private renderer: Renderer2,
    private eliteService: ElitedataService,
    private el: ElementRef) { }
  UserId: any;


  login: boolean = false
  userId: any
  userNumber: any
  contactedList: any
  contactData: { [key: string]: any } = {};
  elitePropertyId: any = [];


  ngOnInit(): void {
    // this.routerSubscription = this.router.events.subscribe(event => {
    //   if (event instanceof NavigationEnd) {
    //     this.popoverController.dismiss();
    //   }
    // });
    this.UserId = localStorage.getItem('userID');
    if (this.UserId) {
      this.showLoader = true;
    }

    this.metatags();
    // this.getseenprojects();
    this.getUserList();
    this.getUserSeenProjectsById();
    this.getContactedProjectsById()


      ;
    import('../enquiry-form/enquiry-form.module').then(mod => mod.enquiryFormModule).then(enquiryFormModule => {
      this.otpModel1 = enquiryFormModule.components['lazy'];
    });

  }

  //   routerSubscription: Subscription;
  //   ngOnDestroy() {
  //    if (this.routerSubscription) {
  //      this.routerSubscription.unsubscribe();
  //    }
  //  }


  handleRefresh(event) {
    setTimeout(() => {
      this.ngOnInit();
      event.target.complete();
    }, 3000);
  }


  metatags() {
    const PAGEID = '43';
    this.Service.getstaticmeta(PAGEID).subscribe(metatags => {
      this.titleService.setTitle(metatags['Pageseo'][0].page_title);
      this.meta.updateTag({ name: 'description', content: metatags['Pageseo'][0].meta_description });
      this.meta.updateTag({ property: 'og:image', content: 'https://www.homes247.in/assets/images/og/about.jpg' });
      this.meta.updateTag({ property: 'og:title', content: metatags['Pageseo'][0].page_title });
      this.meta.updateTag({ property: 'og:description', content: metatags['Pageseo'][0].meta_description });
      this.Service.createLinkForCanonicalURL();
    });
    import('../footer/footer.module').then(mod => mod.FooterModule).then(FooterModule => {
      this.FooterComponent = FooterModule.components['lazy'];
      this.loaded = true;
    });
  }

  loaded = false;
  FooterComponent: any;
  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {

  }
  //   getseenprojects(){
  //     // this.UserId = localStorage.getItem('userID');
  //     // var param = {
  //     //   userid : this.UserId
  //     // }
  //     //   this.Service.userseenprojects(param).subscribe(response => {
  //     //   this.seenproject = response['recent_view'];
  //     //   if (this.seenproject.length !== 0) {
  //     //     this.showLoader = false;
  //     //   } else if (this.seenproject.length === 0) {
  //     //     this.showLoader = true;
  //     //   }
  //     // });
  //     this.UserId = localStorage.getItem('userID');
  //     var param = {
  //       userid : this.UserId
  //     }
  //     if(!this.UserId){
  //       var seenProperties = JSON.parse(localStorage.getItem('SeenPropertyID') || '[]');

  // // Check if seenProperties is an array before proceeding
  // if (Array.isArray(seenProperties) && seenProperties.length > 0) {
  //   for (let i = 0; i < seenProperties.length; i++) {
  //     this.Service2.getpropertynew(seenProperties[i]).subscribe(data => {
  //       let datadetails = data['details'];
  //       this.seenlistArray = datadetails;
  //       this.mergerSeenListArray.push(...this.seenlistArray);
  //       this.UserSeenLength = this.mergerSeenListArray.length;
  //     });
  //   }
  // } else {
  //   // Handle the case where there are no seen properties or the data is not available
  //   console.log('No seen properties found');
  // }

  // if(this.UserSeenLength === 0){
  //   this.showMergedSeenListLength = false;
  //   }else{
  //   this.showMergedSeenListLength = true;

  //   }
  // this.UserSeenLength = this.mergerSeenListArray.length


  //   }else{
  //   this.Service.userseenprojects(param).subscribe(response => {
  //     this.UserSeenProjects = response['recent_view'];
  //     this.UserSeenLength = this.UserSeenProjects.length

  //     if (this.UserSeenProjects.length !== 0) {
  //       this.showLoader = false;
  //     } else if (this.UserSeenProjects.length === 0) {
  //       this.zeroprojects = true;
  //       // this.showLoader = true;
  //     }
  //   });
  // }

  // }

  // getUserList() {
  //   this.showLoader = true;
  //   this.UserId = localStorage.getItem('userID');
  //   var param = {
  //     userid : this.UserId
  //   }
  //   if(!this.UserId){

  //   // $('.sidebarBg').css('display', 'none');
  //   // $('.wishlist_main_div').css('margin-left', '18.7%');


  //   var Whishlist = JSON.parse(localStorage.getItem('propertyID'));


  //   for (let i = 0; i < Whishlist.length; i++){
  //       // var test = i 
  //       // 
  // this.Service2.getpropertynew(Whishlist[i]).subscribe(data => {
  // let datadetails = data['details'];
  // this.WhishlistArray = datadetails;
  // this.mergerWishlistArray.push(...this.WhishlistArray)
  // this.wishListingLength = this.mergerWishlistArray.length

  // })

  //   }
  // console.log(this.mergerWishlistArray)
  // if(this.wishListingLength === 0){
  // this.showMergedWishListLength = false;
  // }else{
  // this.showMergedWishListLength = true;

  // }
  // this.wishListingLength = this.mergerWishlistArray.length

  //   }else{
  //     // $('.sidebarBg').css('display', 'block');
  //     // $('.wishlist_main_div').css('margin-left', '30.7%');
  //     this.UserId = localStorage.getItem('userID');

  //     this.Service.userfavouritelist(param).subscribe(response => {
  //       this.wishListing = response['favouritelist'];
  //       this.wishListingLength = this.wishListing.length

  //       if (this.wishListing.length !== 0) {
  //         this.showLoader = false;
  //       } else if (this.wishListing.length === 0) {
  //         this.showLoader = true;
  //       }
  //     });
  //   }



  // }

  getUserSeenProjectsById() {
    this.UserId = localStorage.getItem("userID");
    if (!this.UserId) {
      const seenPropSale = JSON.parse(localStorage.getItem('SeenPropertyID')) || [];
      const seenPropIndividual = JSON.parse(localStorage.getItem('individualSeenPropertyID')) || [];
      const seenPropRental = JSON.parse(localStorage.getItem('rentalSeenPropertyID')) || [];
      const seenCommercial = JSON.parse(localStorage.getItem('commercialSeenPropertyData')) || [];
      const seenPG = JSON.parse(localStorage.getItem('pgSeenPropertyID')) || [];
      // Create promises for sale, individual, and rental properties
      const saleRequests1 = seenPropSale.map(id =>
        this.Service.getpropertynewDetails(id).toPromise()
      );

      const individualRequests1 = seenPropIndividual.map(id =>
        this.Service.getindividualpropertydetails(id).toPromise()
      );

      const rentalRequests1 = seenPropRental.map(id =>
        this.Service.getRentalsDetailsById(id).toPromise()
      );

      const commercialRequests1 = seenCommercial.map((item: any) =>
        this.Service.getCommercialDetailsById(item.commercialPropertyID, item.commercialType).toPromise()
      );

      const pGRequests1 = seenPG.map(id =>
        this.Service.getpgDetailsById(id).toPromise()
      );

      // Wait for all requests to complete
      Promise.all([
        Promise.all(saleRequests1),
        Promise.all(individualRequests1),
        Promise.all(rentalRequests1),
        Promise.all(commercialRequests1),
        Promise.all(pGRequests1)
      ]).then(([saleResponses, individualResponses, rentalResponses, commercialResponses, pGResponses]) => {
        // Process responses
        this.seenDataDetailsSale = saleResponses.flatMap(data => data['details']);
        this.seenIndividualArray = individualResponses.flatMap(data => data['propertydetails']);
        this.seenRentalArray = rentalResponses.flatMap(data => data['propertydetails']);
        this.seenCommercialArray = commercialResponses.flatMap(data => data['propertydetails']);
        this.seenPGArray = pGResponses.flatMap(data => data['propertydetails']);

        // Merge arrays
        this.mergerSeenListArray = [
          ...this.seenDataDetailsSale,
          ...this.seenIndividualArray,
          ...this.seenRentalArray,
          ...this.seenCommercialArray,
          ...this.seenPGArray
        ];

        this.PropertySeenCount = this.seenDataDetailsSale.length;
        this.individualSeenCount = this.seenIndividualArray.length;
        this.rentalSeenCount = this.seenRentalArray.length;
        this.commercialSeenCount = this.seenCommercialArray.length;
        this.pgSeenCount = this.seenPGArray.length;


        this.UserSeenLength = this.mergerSeenListArray.length;
      }).catch(error => {
        console.error('Error while fetching seen properties:', error);
      });

    } else {

      this.Service.userseenprojects(this.UserId).subscribe(response => {

        this.UserSeenProjectsUnfiltered = response['recent_view'];
        this.UserSeenProjects = this.UserSeenProjectsUnfiltered;

        const propertyID = [];
        const individualPropertyID = [];
        const rentalPropertyID = [];
        const pgPropertyID = [];
        const commercialPropertyData = [];
        // const commercialPropertyID = [];


        this.UserSeenProjects.forEach((item: any) => {
          switch (item.db_category_id) {
            case "1":
              propertyID.push(item.propertyId);
              break;

            case "2":
              individualPropertyID.push(item.propertyId);
              break;

            case "3":
              rentalPropertyID.push(item.propertyId);
              break;

            case "5":
              pgPropertyID.push(item.propertyId);
              break;

            case "4":
              commercialPropertyData.push({
                commercialPropertyID: item.propertyId,
                commercialType: item.Commerical_Type
              });
              // commercialPropertyID.push(item.propertyId);
              break;
          }
        });


        localStorage.setItem('SeenPropertyID', JSON.stringify(propertyID));
        localStorage.setItem('individualSeenPropertyID', JSON.stringify(individualPropertyID));
        localStorage.setItem('rentalSeenPropertyID', JSON.stringify(rentalPropertyID));
        localStorage.setItem('pgSeenPropertyID', JSON.stringify(pgPropertyID));
        localStorage.setItem('commercialSeenPropertyData', JSON.stringify(commercialPropertyData));
        // localStorage.setItem('commercialSeenPropertyID', JSON.stringify(commercialPropertyID));

        this.PropertySeenCount = propertyID.length;
        this.individualSeenCount = individualPropertyID.length;
        this.rentalSeenCount = rentalPropertyID.length;
        this.commercialSeenCount = commercialPropertyData.length;
        this.pgSeenCount = pgPropertyID.length;

        this.UserSeenLength = this.UserSeenProjects.length;

        if (this.UserSeenProjects.length !== 0) {
          this.showLoader = false;
        } else if (this.UserSeenProjects.length === 0) {
          this.zeroprojects = true;
          this.showLoader = true;
        }
      });
    }
  }
  getContactedProjectsById() {
    if ('contactedPropId' in localStorage) {
    } else {
      localStorage.setItem('contactedPropId', '[]');
    }
    this.UserId = localStorage.getItem("userID");


    if (!this.UserId) {

      const contactedPropSale = JSON.parse(localStorage.getItem('contactedPropId')) || [];
      const contactedPropIndividual = JSON.parse(localStorage.getItem('contactedIndividualPropId')) || [];
      const contactedPropRental = JSON.parse(localStorage.getItem('contactedRentalPropId')) || [];
      const contactedCommercial = JSON.parse(localStorage.getItem('contactedcommercialPropData')) || [];
      const contactedPG = JSON.parse(localStorage.getItem('contactedpgPropID')) || [];

      // Create promises for sale, individual, and rental properties
      const saleRequests2 = contactedPropSale.map(id =>
        this.Service.getpropertynewDetails(id).toPromise()
      );

      const individualRequests2 = contactedPropIndividual.map(id =>
        this.Service.getindividualpropertydetails(id).toPromise()
      );

      const rentalRequests2 = contactedPropRental.map(id =>
        this.Service.getRentalsDetailsById(id).toPromise()
      );

      const commercialRequests2 = contactedCommercial.map((item: any) =>
        this.Service.getCommercialDetailsById(item.commercialPropertyID, item.commercialType).toPromise()
      );

      const pGRequests2 = contactedPG.map(id =>
        this.Service.getpgDetailsById(id).toPromise()
      );


      // Wait for all requests to complete
      Promise.all([
        Promise.all(saleRequests2),
        Promise.all(individualRequests2),
        Promise.all(rentalRequests2),
        Promise.all(commercialRequests2),
        Promise.all(pGRequests2)
      ]).then(([saleResponses, individualResponses, rentalResponses, commercialResponses, pGResponses]) => {
        // Process responses
        this.contactedDataDetailsSale = saleResponses.flatMap(data => data['details']);
        this.contactedIndividualArray = individualResponses.flatMap(data => data['propertydetails']);
        this.contactedRentalArray = rentalResponses.flatMap(data => data['propertydetails']);
        this.contactedCommercialArray = commercialResponses.flatMap(data => data['propertydetails']);
        this.contactedPGArray = pGResponses.flatMap(data => data['propertydetails']);

        // Merge arrays
        this.mergerContactedListArray = [
          ...this.contactedDataDetailsSale,
          ...this.contactedIndividualArray,
          ...this.contactedRentalArray,
          ...this.contactedCommercialArray,
          ...this.contactedPGArray,
        ];

        this.PropertyContactCount = this.contactedDataDetailsSale.length;
        this.individualContactCount = this.contactedIndividualArray.length;
        this.rentalContactCount = this.contactedRentalArray.length;
        this.commercialContactCount = this.contactedCommercialArray.length;
        this.pgContactCount = this.contactedPGArray.length;


        // this.UserSeenLength = this.mergerContactedListArray.length;
        this.mergerContactedListArrayLength = this.mergerContactedListArray.length;
      }).catch(error => {
      });



    } else {

      this.eliteService.getContactedList(this.UserId).subscribe(response => {

        this.UserContactedProjectsUnfiltered = response['pro_view'];
        this.UserContactedProjects = this.UserContactedProjectsUnfiltered;

        const propertyID = [];
        const individualPropertyID = [];
        const rentalPropertyID = [];
        const pgPropertyID = [];
        const commercialPropertyData = [];

        this.UserContactedProjects.forEach((item: any) => {
          switch (item.db_category_id) {
            case "1":
              propertyID.push(item.property_IDPK);
              break;

            case "2":
              individualPropertyID.push(item.property_IDPK);
              break;

            case "3":
              rentalPropertyID.push(item.property_IDPK);
              break;

            case "5":
              pgPropertyID.push(item.property_IDPK);
              break;

            case "4":
              commercialPropertyData.push({
                commercialPropertyID: item.property_IDPK,
                commercialType: item.Commerical_Type
              });
              break;
          }
        });

        this.PropertyContactCount = propertyID.length;
        this.individualContactCount = individualPropertyID.length;
        this.rentalContactCount = rentalPropertyID.length;
        this.pgContactCount = pgPropertyID.length;
        this.commercialContactCount = commercialPropertyData.length;


        this.mergerContactedListArrayLength = this.UserContactedProjects.length

        if (this.UserContactedLength?.length !== 0) {
          this.showLoader = false;
        } else if (this.UserContactedLength?.length === 0) {
          this.zeroprojects = true;
          this.showLoader = true;
        }







     


        const loginid = localStorage.getItem('loginID');
        if (loginid === '1') {
          this.login = true;
          this.userId = localStorage.getItem('userID');
          this.userNumber = localStorage.getItem('userNumber');
          if (response['status'] == "True") {
            this.contactedList = response['pro_view']
            this.elitePropertyId = this.contactedList.map((item: any) => {
              this.contactData[String(item.property_IDPK)] = item.owner_details;
              console.log(this.contactData[String(item.property_IDPK)])
              return item.property_IDPK;
            });
          }
        } else {
          this.login = false;
        }



      });
    }
  }


  getUserList() {
    // this.showLoader = true;
    this.UserId = localStorage.getItem('userID');
    if (!this.UserId) {
      $('.sidebarBg').css('display', 'none');
      $('#mainDiv').removeClass('wishlist_main_div');
      $('#mainDiv').addClass('wishlist_main_divLogin');


      const WhishlistSale = JSON.parse(localStorage.getItem('propertyID')) || [];
      const wishlistRental = JSON.parse(localStorage.getItem('rentalPropertyID')) || [];
      const wishlistIndividual = JSON.parse(localStorage.getItem('individualPropertyID')) || [];
      const wishlistCommercial = JSON.parse(localStorage.getItem('commercialPropertyData')) || [];
      const wishlistPG = JSON.parse(localStorage.getItem('pgPropertyID')) || [];

      const saleRequests = WhishlistSale.map(id =>
        this.Service.getpropertynewDetails(id).toPromise()
      );

      const rentalRequests = wishlistRental.map(id =>
        this.Service.getRentalsDetailsById(id).toPromise()
      );

      const individualRequests = wishlistIndividual.map(id =>
        this.Service.getindividualpropertydetails(id).toPromise()
      );

      const commercialRequests = wishlistCommercial.map((item: any) =>
        this.Service.getCommercialDetailsById(item.commercialPropertyID, item.commercialType).toPromise()
      );

      const pGRequests = wishlistPG.map(id =>
        this.Service.getpgDetailsById(id).toPromise()
      );

      // Wait for all requests to complete
      Promise.all([
        Promise.all(saleRequests),
        Promise.all(rentalRequests),
        Promise.all(individualRequests),
        Promise.all(commercialRequests),
        Promise.all(pGRequests)
      ]).then(([saleResponses, rentalResponses, individualResponses, commercialResponses, pGResponses]) => {
        this.WhishlistArray = saleResponses.flatMap(data => data['details']);
        this.WhishlistRentalArray = rentalResponses.flatMap(data => data['propertydetails']);
        this.WhishlistIndividualArray = individualResponses.flatMap(data => data['propertydetails']);
        this.WhishlistCommercialArray = commercialResponses.flatMap(data => data['propertydetails']);
        this.WhishlistPGArray = pGResponses.flatMap(data => data['propertydetails']);

        this.mergerWishlistArray = [
          ...this.WhishlistArray,
          ...this.WhishlistRentalArray,
          ...this.WhishlistIndividualArray,
          ...this.WhishlistCommercialArray,
          ...this.WhishlistPGArray
        ];

        this.PropertyCount = this.WhishlistArray.length;
        this.individualCount = this.WhishlistIndividualArray.length;
        this.rentalCount = this.WhishlistRentalArray.length;
        this.commercialCount = this.WhishlistCommercialArray.length;
        this.pgCount = this.WhishlistPGArray.length;

        this.wishListingLength = this.mergerWishlistArray.length;
      }).catch(error => {
        console.error('Error while fetching wishlist data:', error);
      });



      // console.log(this.mergerWishlistArray)
      if (this.wishListingLength == 0) {
        this.showMergedWishListLength = false;
      } else {
        this.showMergedWishListLength = true;
      }


    } else {
      $('.sidebarBg').css('display', 'block');
      $('#mainDiv').addClass('wishlist_main_div');
      $('#mainDiv').removeClass('wishlist_main_divLogin');

      this.Service.getUserWishListByIdTest(this.UserId, '').subscribe(response => {

        var status = response['status']
        if (status == 'True') {
          this.showLoader = true;
        }
        this.wishListingUnfiltered = response['favouritelist'];
        this.wishListing = this.wishListingUnfiltered;

        const propertyID = [];
        const individualPropertyID = [];
        const rentalPropertyID = [];
        const pgPropertyID = [];
        const commercialPropertyData = [];
        const commercialPropertyID = [];

        this.wishListing.forEach((item: any) => {
          switch (item.CatagoryId) {
            case "1":
              propertyID.push(item.propertyId);
              break;

            case "2":
              individualPropertyID.push(item.propertyId);
              break;

            case "3":
              rentalPropertyID.push(item.propertyId);
              break;

            case "5":
              pgPropertyID.push(item.propertyId);
              break;

            case "4":
              commercialPropertyData.push({
                commercialPropertyID: item.propertyId,
                commercialType: item.Commerical_Type
              });
              commercialPropertyID.push(item.propertyId);
              break;
          }
        });

        localStorage.setItem('propertyID', JSON.stringify(propertyID));
        localStorage.setItem('individualPropertyID', JSON.stringify(individualPropertyID));
        localStorage.setItem('rentalPropertyID', JSON.stringify(rentalPropertyID));
        localStorage.setItem('pgPropertyID', JSON.stringify(pgPropertyID));
        localStorage.setItem('commercialPropertyData', JSON.stringify(commercialPropertyData));
        localStorage.setItem('commercialPropertyID', JSON.stringify(commercialPropertyID));

        this.PropertyCount = propertyID.length;
        this.individualCount = individualPropertyID.length;
        this.rentalCount = rentalPropertyID.length;
        this.commercialCount = commercialPropertyData.length;
        this.pgCount = pgPropertyID.length;

        this.wishListingLength = this.wishListing.length
        if (this.wishListing.length !== 0) {
          this.showLoader = false;
        } else if (this.wishListing.length === 0) {
          // this.showLoader = true;
        }
      });
    }
  }

  // wishlistaddstorage(id, i, storageBucket) {
  //   const bucketKey = storageBucket === 1 ? 'propertyID'
  //     : storageBucket === 2 ? 'individualPropertyID'
  //       : storageBucket === 3 ? 'rentalPropertyID'
  //         : storageBucket === 4 ? 'commercialPropertyData'
  //           : 'pgPropertyID';

  //   const parseJSON = (str: string | null): any[] => {
  //     try {
  //       return JSON.parse(str || '[]');
  //     } catch {
  //       return [];
  //     }
  //   };

  //   swal({
  //     title: "Are you sure?",
  //     text: "Your Selected Property will be removed from the Wish List!",
  //     type: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#971b47",
  //     confirmButtonText: "Yes, Remove it!",
  //     closeOnConfirm: false
  //   }).then((result) => {
  //     if (result.value) {
  //       const proparray = localStorage.getItem(bucketKey);
  //       let jsonpars = parseJSON(proparray);

  //       this.parsedarray = jsonpars;
  //       this.mergerWishlistArray.splice(i, 1);
  //       this.wishListingLength = this.mergerWishlistArray.length;
  //       this.showMergedWishListLength = this.wishListingLength > 0;

  //       if (storageBucket === 4) {
  //         // special handling for commercialPropertyData
  //         this.parsedarray = this.parsedarray.filter(item => {
  //           // item.commercialPropertyID is an array
  //           return !(item.commercialPropertyID.includes(id.toString()));
  //         });
  //       } else {
  //         // normal case: flat array of IDs
  //         this.parsedarray = this.parsedarray.filter(item => item !== id);
  //       }

  //       localStorage.setItem(bucketKey, JSON.stringify(this.parsedarray));
  //     }
  //   });
  // }
  wishlistaddstorage(id, i, storageBucket) {
    const bucketKey = storageBucket === 1 ? 'propertyID'
      : storageBucket === 2 ? 'individualPropertyID'
        : storageBucket === 3 ? 'rentalPropertyID'
          : storageBucket === 4 ? 'commercialPropertyData'
            : storageBucket === 5 ? 'pgPropertyID' : 'unknownBucket';

    const parseJSON = (str: string | null): any[] => {
      try {
        return JSON.parse(str || '[]');
      } catch {
        return [];
      }
    };

    swal({
      title: "Are you sure?",
      text: "Your Selected Property will be removed from the Wish List!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#971b47",
      confirmButtonText: "Yes, Remove it!",
      closeOnConfirm: false
    }).then((result) => {
      if (result.value) {
        const proparray = localStorage.getItem(bucketKey);
        let jsonpars = parseJSON(proparray);

        this.parsedarray = jsonpars;
        this.mergerWishlistArray.splice(i, 1);
        this.wishListingLength = this.mergerWishlistArray.length;
        this.showMergedWishListLength = this.wishListingLength > 0;

        if (storageBucket === 4) {
          const index = this.storagearr.indexOf(id);

          let existingData = localStorage.getItem('commercialPropertyData');
          let dataArray = existingData ? JSON.parse(existingData) : [];
          dataArray = dataArray.filter(
            (item: any) => item.commercialPropertyID !== id
          );

          if (index !== -1) {
            this.storagearr.splice(index, 1);
          }
          localStorage.setItem('commercialPropertyData', JSON.stringify(dataArray));
          localStorage.setItem('commercialPropertyID', JSON.stringify(this.storagearr));

        } else {
          const index = this.parsedarray.indexOf(this.parsedarray);
          this.parsedarray.splice(index, 1);
          localStorage.setItem(bucketKey, JSON.stringify(this.parsedarray));
        }
        this.getUserList();
      }
    });
  }
  storagearr = [];

  removeFromList(id, i, data) {
    // 
    const bucketKey = data.CatagoryId == 1 ? 'propertyID'
      : data.CatagoryId == 2 ? 'individualPropertyID'
        : data.CatagoryId == 3 ? 'rentalPropertyID'
          : data.CatagoryId == 4 ? 'commercialPropertyData'
            : data.CatagoryId == 5 ? 'pgPropertyID' : 'unknownBucket';

    const parseJSON = (str: string | null): any[] => {
      try {
        return JSON.parse(str || '[]');
      } catch {
        return [];
      }
    };

    swal({
      title: "Are you sure?",
      text: "Your Selected Property will be removed from the Wish List!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#971b47",
      confirmButtonText: "Yes, Remove it!",
      closeOnConfirm: false
    }).then((result) => {
      if (result.value) {
        const proparray = localStorage.getItem(bucketKey);
        let jsonpars = parseJSON(proparray);
        this.parsedarray = jsonpars;

        // Remove from merged wishlist (UI update)
        this.mergerWishlistArray.splice(i, 1);
        this.wishListingLength = this.mergerWishlistArray.length;
        this.showMergedWishListLength = this.wishListingLength > 0;

        // Handle localStorage
        // const storedArr = parseJSON(localStorage.getItem(bucketKey));

        if (data.CatagoryId == 4) {
          // 
          const index = this.storagearr.indexOf(id);

          let existingData = localStorage.getItem('commercialPropertyData');
          let dataArray = existingData ? JSON.parse(existingData) : [];
          dataArray = dataArray.filter(
            (item: any) => item.commercialPropertyID !== id
          );

          if (index !== -1) {
            this.storagearr.splice(index, 1);
          }
          localStorage.setItem('commercialPropertyData', JSON.stringify(dataArray));
          localStorage.setItem('commercialPropertyID', JSON.stringify(this.storagearr));

        }
        else {
          const index = this.parsedarray.indexOf(this.parsedarray);
          this.parsedarray.splice(index, 1);
          localStorage.setItem(bucketKey, JSON.stringify(this.parsedarray));
        }

        // API call
        const param = {
          userid: localStorage.getItem('userID'),
          propid: id,
          CatagoryId: data.CatagoryId
        };

        this.Service.removeFavaourite(param).subscribe(response => {
          swal("Removed!", "Your Selected Property has been removed.", "success");
          if (response['status'] === 'True' || response['status'] === 'False') {
            this.getUserList(); // refresh list either way
          }
        });
      }
    });
  }

  // removeFromList(id, i, data) {
  //   swal({
  //     title: "Are you sure?",
  //     text: "Your Selected Property will be removed from the Wish List!",
  //     type: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#971b47",
  //     confirmButtonText: "Yes, Remove it!",
  //     closeOnConfirm: false
  //   }).then((result) => {
  //     if (result.value) {
  //       const PropId = id;
  //       const userid = localStorage.getItem('userID');
  //       const index: number = this.wishListing.indexOf(PropId);
  //       const prop = this.wishListing.splice(i, 1);
  //       var param = {
  //         userid: userid,
  //         propid: PropId,
  //         CatagoryId: data.CatagoryId
  //       }
  //       this.Service.removeFavaourite(param).subscribe(response => {
  //         swal("Removed!", "Your Selected Property has been removed.", "success");
  //         var status = response['status'];
  //         if (status == 'True') {
  //           this.getUserList()
  //           // 

  //         } else if (status == 'False') {
  //           this.getUserList()
  //           // 
  //         }
  //       });
  //     }
  //   });
  // }



  // removeItem(property,i){
  //   const index: number = this.seenproject.indexOf(property);
  //   this.seenproject.splice(i, 1);
  // }





  onclickshare(data: any) {
    if ((navigator as any).share) {
      let propertyURL = '';

      if (data.CatagoryId == 3) {
        // Rentals
        if (data.propertyType !== 'Plot') {
          propertyURL =
            `${data.BHK.toLowerCase().replace(/\s+/g, '-')}-` +
            `${data.propertyType.toLowerCase().replace(/\s+/g, '-')}-for-rent-in-` +
            `${data.locality_name.toLowerCase().replace(/\s+/g, '-')}-` +
            `${data.city_name.toLowerCase().replace(/\s+/g, '-')}-at-` +
            `${data.propertyName.toLowerCase().replace(/\s+/g, '-')}-` +
            `${data.propertyId}`;
          propertyURL = 'https://www.homes247.in/rentals/' + propertyURL;
        } else {
          propertyURL =
            `${data.area_max.toLowerCase().replace(/\s+/g, '-')}-sq-feet-` +
            `${data.propertyType.toLowerCase().replace(/\s+/g, '-')}-for-rent-in-` +
            `${data.locality_name.toLowerCase().replace(/\s+/g, '-')}-` +
            `${data.city_name.toLowerCase().replace(/\s+/g, '-')}-at-` +
            `${data.propertyName.toLowerCase().replace(/\s+/g, '-')}-` +
            `${data.propertyId}`;
          propertyURL = 'https://www.homes247.in/rentals/' + propertyURL;
        }
      } else if (data.CatagoryId == 2) {
        // Sale
        propertyURL =
          `${data.BHK ? data.BHK.replace(/\s+/g, '-').toLowerCase() + '-' : ''}` +
          `${data.propertyType.replace(/\s+/g, '-').toLowerCase()}-for-sale-in-` +
          `${data.locality_name.replace(/\s+/g, '-').toLowerCase()}-` +
          `${data.city_name.replace(/\s+/g, '-').toLowerCase()}-` +
          `${data.propertyName ? 'at-' + data.propertyName.replace(/\s+/g, '-').toLowerCase() + '-' : ''}` +
          `${data.propertyId}`;
        propertyURL = 'https://www.homes247.in/listings/' + propertyURL;
      }

      (navigator as any)
        .share({
          title: data.propertyName,
          text: 'Check out this amazing property ' + data.propertyName,
          url: propertyURL,
        })
        .then(() => console.log('Shared Successfully'))
        .catch((error: any) => console.error('Error sharing:', error));
    } else {
      console.warn('Web Share API not supported in this browser');
      // fallback: copy link to clipboard or show modal
    }
  }


  async shareContentRent(data: any) {
    try {
      let shareUrl = '';

      if (data.propertyType !== 'Plot') {
        shareUrl =
          'https://www.homes247.in/rentals/' +
          data.BHK.toLowerCase().replace(/\s+/g, '-') +
          '-' +
          data.propertyType.toLowerCase().replace(/\s+/g, '-') +
          '-for-rent-in-' +
          data.locality_name.toLowerCase().replace(/\s+/g, '-') +
          '-' +
          data.city_name.toLowerCase().replace(/\s+/g, '-') +
          '-at-' +
          data.propertyName.toLowerCase().replace(/\s+/g, '-') +
          '-' +
          data.propertyId;
      } else {
        shareUrl =
          'https://www.homes247.in/rentals/' +
          data.area_max.toLowerCase().replace(/\s+/g, '-') +
          '-sq-feet-' +
          data.propertyType.toLowerCase().replace(/\s+/g, '-') +
          '-for-rent-in-' +
          data.locality_name.toLowerCase().replace(/\s+/g, '-') +
          '-' +
          data.city_name.toLowerCase().replace(/\s+/g, '-') +
          '-at-' +
          data.propertyName.toLowerCase().replace(/\s+/g, '-') +
          '-' +
          data.propertyId;
      }

      if ((navigator as any).share) {
        await (navigator as any).share({
          title: data.propertyName,
          text: 'Check out this amazing property! ' + data.propertyName,
          url: shareUrl,
        });
        console.log('Shared successfully');
      } else {
        console.warn('Web Share API not supported in this browser.');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  }


  async shareContentIndivial(data: any) {
    if (!data || !data.propertyId) {
      return;
    }

    const propertyURL =
      `${data.BHK ? data.BHK.replace(/\s+/g, '-').toLowerCase() + '-' : ''}` +
      `${data.propertyType.replace(/\s+/g, '-').toLowerCase()}-for-sale-in-` +
      `${data.locality_name.replace(/\s+/g, '-').toLowerCase()}-` +
      `${data.city_name.replace(/\s+/g, '-').toLowerCase()}-` +
      `${data.propertyName
        ? 'at-' +
        data.propertyName.replace(/\s+/g, '-').toLowerCase() +
        '-'
        : ''
      }` +
      `${data.propertyId}`;

    const fullUrl = 'https://www.homes247.in/listings/' + propertyURL;

    try {
      if ((navigator as any).share) {
        await (navigator as any).share({
          title: data.propertyName,
          text: 'Check out this amazing property! ' + data.propertyName,
          url: fullUrl,
        });
        console.log('Shared successfully');
      } else {
        console.warn('Web Share API not supported in this browser.');
        // fallback → copy to clipboard
        await navigator.clipboard.writeText(fullUrl);
        // ;
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  }


  async shareContentProject(data: any) {
    if (!data || !data.propertyId) {
      return;
    }

    const projectUrl =
      'https://www.homes247.in/property/' +
      data.city_name.toLowerCase().replace(/\s+/g, '-') +
      '/' +
      data.locality_name.toLowerCase().replace(/\s+/g, '-') +
      '/' +
      data.propertyName.toLowerCase().replace(/\s+/g, '-') +
      '-' +
      data.propertyId;

    try {
      if ((navigator as any).share) {
        await (navigator as any).share({
          title: data.propertyName,
          text: 'Check out this amazing property! ' + data.propertyName,
          url: projectUrl,
        });
        console.log('Shared successfully');
      } else {
        console.warn('Web Share API not supported, copying URL instead...');
        await navigator.clipboard.writeText(projectUrl);
        // ;
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  }




  async shareContentRentCont(data: any) {
    if (!data || !data.property_IDPK) {
      return;
    }

    let rentUrl = '';

    if (data.propertyType !== 'Plot') {
      rentUrl =
        'https://www.homes247.in/rentals/' +
        data.BHK.toLowerCase().replace(/\s+/g, '-') +
        '-' +
        data.propertyType.toLowerCase().replace(/\s+/g, '-') +
        '-for-rent-in-' +
        data.locality_name.toLowerCase().replace(/\s+/g, '-') +
        '-' +
        data.city_name.toLowerCase().replace(/\s+/g, '-') +
        '-at-' +
        data.propertyName.toLowerCase().replace(/\s+/g, '-') +
        '-' +
        data.property_IDPK;
    } else {
      rentUrl =
        'https://www.homes247.in/rentals/' +
        data.area_max.toLowerCase().replace(/\s+/g, '-') +
        '-sq-feet-' +
        data.propertyType.toLowerCase().replace(/\s+/g, '-') +
        '-for-rent-in-' +
        data.locality_name.toLowerCase().replace(/\s+/g, '-') +
        '-' +
        data.city_name.toLowerCase().replace(/\s+/g, '-') +
        '-at-' +
        data.propertyName.toLowerCase().replace(/\s+/g, '-') +
        '-' +
        data.property_IDPK;
    }

    try {
      if ((navigator as any).share) {
        await (navigator as any).share({
          title: data.propertyName,
          text: 'Check out this amazing property! ' + data.propertyName,
          url: rentUrl,
        });
        console.log('Shared successfully');
      } else {
        console.warn('Web Share API not supported, copying URL instead...');
        await navigator.clipboard.writeText(rentUrl);
        // ;
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  }


  async shareContentIndivialCont(data: any) {
    if (!data || !data.property_IDPK) {
      return;
    }

    const propertyURL =
      `${data.BHK ? data.BHK.replace(/\s+/g, '-').toLowerCase() + '-' : ''}` +
      `${data.propertyType.replace(/\s+/g, '-').toLowerCase()}-for-sale-in-` +
      `${data.locality_name.replace(/\s+/g, '-').toLowerCase()}-` +
      `${data.city_name.replace(/\s+/g, '-').toLowerCase()}-` +
      `${data.propertyName ? 'at-' + data.propertyName.replace(/\s+/g, '-').toLowerCase() + '-' : ''}` +
      `${data.property_IDPK}`;

    const finalUrl = 'https://www.homes247.in/listings/' + propertyURL;

    try {
      if ((navigator as any).share) {
        await (navigator as any).share({
          title: data.propertyName,
          text: 'Check out this amazing property! ' + data.propertyName,
          url: finalUrl,
        });
        console.log('Shared successfully');
      } else {
        console.warn('Web Share API not supported, copying URL instead...');
        await navigator.clipboard.writeText(finalUrl);
        // ;
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  }


  async shareContentProjectCont(data: any) {
    if (!data || !data.property_IDPK) {
      return;
    }

    const finalUrl =
      'https://www.homes247.in/property/' +
      data.city_name.toLowerCase().replace(/\s+/g, '-') + '/' +
      data.locality_name.toLowerCase().replace(/\s+/g, '-') + '/' +
      data.propertyName.toLowerCase().replace(/\s+/g, '-') + '-' +
      data.property_IDPK;

    try {
      if ((navigator as any).share) {
        await (navigator as any).share({
          title: data.propertyName,
          text: 'Check out this amazing property! ' + data.propertyName,
          url: finalUrl,
        });
        console.log('Shared successfully');
      } else {
        console.warn('Web Share API not supported, copying URL instead...');
        await navigator.clipboard.writeText(finalUrl);
        // ;
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  }



  async shareRentBefore(data: any) {
    if (!data || !data.PropertyID) {
      return;
    }

    let finalUrl = '';

    if (data.PropertyType !== 'Plot') {
      finalUrl =
        'https://www.homes247.in/rentals/' +
        data.BHK.toLowerCase().replace(/\s+/g, '-') + '-' +
        data.PropertyType.toLowerCase().replace(/\s+/g, '-') + '-for-rent-in-' +
        data.Locality.toLowerCase().replace(/\s+/g, '-') + '-' +
        data.City.toLowerCase().replace(/\s+/g, '-') + '-at-' +
        data.PropertyName.toLowerCase().replace(/\s+/g, '-') + '-' +
        data.PropertyID;
    } else {
      finalUrl =
        'https://www.homes247.in/rentals/' +
        data.PropertyArea.toLowerCase().replace(/\s+/g, '-') + '-sq-feet-' +
        data.PropertyType.toLowerCase().replace(/\s+/g, '-') + '-for-rent-in-' +
        data.Locality.toLowerCase().replace(/\s+/g, '-') + '-' +
        data.City.toLowerCase().replace(/\s+/g, '-') + '-at-' +
        data.PropertyName.toLowerCase().replace(/\s+/g, '-') + '-' +
        data.PropertyID;
    }

    try {
      if ((navigator as any).share) {
        await (navigator as any).share({
          title: data.PropertyName,
          text: 'Check out this amazing Property! ' + data.PropertyName,
          url: finalUrl,
        });
        console.log('Shared successfully');
      } else {
        console.warn('Web Share API not supported, copying URL instead...');
        await navigator.clipboard.writeText(finalUrl);
        // ;
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  }


  async shareIndivialBefore(data: any) {
    if (!data || !data.PropertyID) {
      return;
    }

    // Construct property URL
    const propertyURL =
      `${data.BHK ? data.BHK.replace(/\s+/g, '-').toLowerCase() + '-' : ''}` +
      `${data.PropertyType.replace(/\s+/g, '-').toLowerCase()}-for-sale-in-` +
      `${data.Locality.replace(/\s+/g, '-').toLowerCase()}-` +
      `${data.City.replace(/\s+/g, '-').toLowerCase()}-` +
      `${data.PropertyName ? 'at-' + data.PropertyName.replace(/\s+/g, '-').toLowerCase() + '-' : ''}` +
      `${data.PropertyID}`;

    const finalUrl = `https://www.homes247.in/listings/${propertyURL}`;

    try {
      if ((navigator as any).share) {
        await (navigator as any).share({
          title: data.PropertyName,
          text: `Check out this amazing Property! ${data.PropertyName}`,
          url: finalUrl,
        });
        console.log('Shared successfully');
      } else {
        console.warn('Web Share API not supported, copying link instead...');
        await navigator.clipboard.writeText(finalUrl);
        // ;
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  }


  async shareProjectBefore(data: any) {
    if (!data || !data.property_info_IDPK) {
      return;
    }

    // Build project URL
    const finalUrl =
      `https://www.homes247.in/property/` +
      `${data.city_name.toLowerCase().replace(/\s+/g, '-')}/` +
      `${data.locality_name.toLowerCase().replace(/\s+/g, '-')}/` +
      `${data.propertyName.toLowerCase().replace(/\s+/g, '-')}-` +
      `${data.property_info_IDPK}`;

    try {
      if ((navigator as any).share) {
        await (navigator as any).share({
          title: data.propertyName,
          text: `Check out this amazing Property! ${data.propertyName}`,
          url: finalUrl,
        });
        console.log('Shared successfully');
      } else {
        console.warn('Web Share API not supported, copying link instead...');
        await navigator.clipboard.writeText(finalUrl);

      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  }

  async shareCommercialSaleBefore(data: any) {
    if (!data || !data.Property_ID) return;

    const finalUrl =
      'https://www.homes247.in/cld/commercial-properties-for-sale-in-' +
      data.city_name.toLowerCase().replace(/\s+/g, '-') +
      '-' + data.proparty_Type_Id + '-' + data.Property_ID;

    try {
      if ((navigator as any).share) {
        await (navigator as any).share({
          title: data.property_title,
          text: 'Check out this amazing Property! ' + data.property_title,
          url: finalUrl,
        });
        console.log('Shared successfully');
      } else {
        console.warn('Web Share API not supported, copying link instead...');
        await navigator.clipboard.writeText(finalUrl);

      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  }


  async shareCommercialSale(linkData: any, data: any) {
    if (!linkData || !linkData.propertyId || !data?.Commerical_Type) return;

    const finalUrl =
      'https://www.homes247.in/cld/commercial-properties-for-sale-in-' +
      linkData.city_name.toLowerCase().replace(/\s+/g, '-') +
      '-' + data.Commerical_Type +
      '-' + linkData.propertyId;

    try {
      if ((navigator as any).share) {

        await (navigator as any).share({
          title: linkData.propertyName,
          text: 'Check out this amazing Property! ' + linkData.propertyName,
          url: finalUrl,
        });
        console.log('Shared successfully');
      } else {

        console.warn('Web Share API not supported, copying link instead...');
        await navigator.clipboard.writeText(finalUrl);
        // ;
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  }
  async shareCommercialSaleContacted(linkData: any) {
    if (!linkData || !linkData.propertyId || !linkData?.Commerical_Type) return;

    const finalUrl =
      'https://www.homes247.in/cld/commercial-properties-for-sale-in-' +
      linkData.city_name.toLowerCase().replace(/\s+/g, '-') +
      '-' + linkData.commercial_type +
      '-' + linkData.property_IDPK;

    try {
      if ((navigator as any).share) {

        await (navigator as any).share({
          title: linkData.propertyName,
          text: 'Check out this amazing Property! ' + linkData.propertyName,
          url: finalUrl,
        });
        console.log('Shared successfully');
      } else {

        console.warn('Web Share API not supported, copying link instead...');
        await navigator.clipboard.writeText(finalUrl);
        // ;
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  }


  async shareCommercialRentBefore(data: any) {
    if (!data || !data.Property_ID) return;

    const finalUrl =
      'https://www.homes247.in/cld/commercial-properties-for-rent-in-' +
      data.city_name.toLowerCase().replace(/\s+/g, '-') +
      '-' + data.proparty_Type_Id + '-' + data.Property_ID;

    try {
      if ((navigator as any).share) {
        await (navigator as any).share({
          title: data.property_title,
          text: 'Check out this amazing Property! ' + data.property_title,
          url: finalUrl,
        });
        console.log('Shared successfully');
      } else {
        console.warn('Web Share API not supported, copying link instead...');
        await navigator.clipboard.writeText(finalUrl);
        // ;
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  }


  async shareCommercialRent(linkData: any, data: any) {
    if (!linkData || !linkData.propertyId || !data?.Commerical_Type) return;

    const finalUrl =
      'https://www.homes247.in/cld/commercial-properties-for-rent-in-' +
      linkData.city_name.toLowerCase().replace(/\s+/g, '-') +
      '-' + data.Commerical_Type +
      '-' + linkData.propertyId;

    try {
      if ((navigator as any).share) {

        await (navigator as any).share({
          title: linkData.propertyName,
          text: 'Check out this amazing Property! ' + linkData.propertyName,
          url: finalUrl,
        });
        console.log('Shared successfully');
      } else {

        console.warn('Web Share API not supported, copying link instead...');
        await navigator.clipboard.writeText(finalUrl);
        // ;
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  }
  async shareCommercialRentContacted(linkData: any) {
    if (!linkData || !linkData.propertyId || !linkData?.Commerical_Type) return;

    const finalUrl =
      'https://www.homes247.in/cld/commercial-properties-for-rent-in-' +
      linkData.city_name.toLowerCase().replace(/\s+/g, '-') +
      '-' + linkData.commercial_type +
      '-' + linkData.property_IDPK;

    try {
      if ((navigator as any).share) {

        await (navigator as any).share({
          title: linkData.propertyName,
          text: 'Check out this amazing Property! ' + linkData.propertyName,
          url: finalUrl,
        });
        console.log('Shared successfully');
      } else {

        console.warn('Web Share API not supported, copying link instead...');
        await navigator.clipboard.writeText(finalUrl);
        // ;
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  }
  //   async shareCommercialRent(linkData, data) {
  //   try {


  //     await Share.share({
  //       title: linkData.propertyName,
  //       text: 'Check out this amazing Property!' + linkData.propertyName,
  //       url: 'https://www.homes247.in/cld/commercial-properties-for-rent-in-' + linkData.city_name.toLowerCase().replace(/\s+/g, '-') + '-' + data.Commerical_Type + '-' + linkData.propertyId,
  //     });

  //     console.log('Shared successfully');
  //   } catch (error) {
  //     console.error('Error sharing:', error);
  //     // console.log('https://www.homes247.in/cld/commercial-properties-for-rent-in-' + data.city_name.toLowerCase().replace(/\s+/g, '-') +'-'+ data.proparty_Type_Id +'-'+ data.Property_ID);
  //   }
  // }
  // async shareCommercialRentContacted(data) {
  //   try {


  //     await Share.share({
  //       title: data.propertyName,
  //       text: 'Check out this amazing Property!' + data.propertyName,
  //       url: 'https://www.homes247.in/cld/commercial-properties-for-rent-in-' + data.city_name.toLowerCase().replace(/\s+/g, '-') + '-' + data.commercial_type + '-' + data.property_IDPK,
  //     });
  //     console.log('Shared successfully');
  //   } catch (error) {
  //     console.error('Error sharing:', error);
  //     // console.log('https://www.homes247.in/cld/commercial-properties-for-rent-in-' + data.city_name.toLowerCase().replace(/\s+/g, '-') +'-'+ data.proparty_Type_Id +'-'+ data.Property_ID);
  //   }
  // }

  async sharePgBefore(data: any) {
    if (!data || !data.propartyID) return;

    const finalUrl =
      'https://www.homes247.in/pgd/pg-for-rent-in-' +
      data.city_name.toLowerCase().replace(/\s+/g, '-') +
      '-' + data.propartyID;

    try {
      if ((navigator as any).share) {
        await (navigator as any).share({
          title: data.pgName,
          text: 'Check out this amazing PG! ' + data.pgName,
          url: finalUrl,
        });
        console.log('Shared successfully');
      } else {
        console.warn('Web Share API not supported, copying link instead...');
        await navigator.clipboard.writeText(finalUrl);
        // ;
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  }

  async shareContentPG(data: any) {
    if (!data || !data.propertyId) return;

    const finalUrl =
      'https://www.homes247.in/pgd/pg-for-rent-in-' +
      data.city_name.toLowerCase().replace(/\s+/g, '-') +
      '-' + data.propertyId;

    try {

      if ((navigator as any).share) {
        await (navigator as any).share({
          title: data.propertyName,
          text: 'Check out this amazing PG! ' + data.propertyName,
          url: finalUrl,
        });
        console.log('Shared successfully');
      } else {

        console.warn('Web Share API not supported, copying link instead...');
        await navigator.clipboard.writeText(finalUrl);

      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  }

  async shareContentedPG(data: any) {
    if (!data || !data.propertyId) return;

    const finalUrl =
      'https://www.homes247.in/pgd/pg-for-rent-in-' +
      data.city_name.toLowerCase().replace(/\s+/g, '-') +
      '-' + data.property_IDPK;

    try {

      if ((navigator as any).share) {
        await (navigator as any).share({
          title: data.propertyName,
          text: 'Check out this amazing PG! ' + data.propertyName,
          url: finalUrl,
        });
        console.log('Shared successfully');
      } else {

        console.warn('Web Share API not supported, copying link instead...');
        await navigator.clipboard.writeText(finalUrl);
        // ;
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  }

  builderPageNavigate(data) {
    this.router.navigate([data.city_name.toLowerCase().replace(/\s+/g, '-') + '/property-sale'], {
      queryParams: {
        buliderId: data.builderID

      },
      queryParamsHandling: 'merge',
    });
    localStorage.setItem('buliderId', data.builderID);
    localStorage.setItem('isBuilderId', 'true');
  }
  builderPageNavigateBefore(data) {
    this.router.navigate([data.city_name.toLowerCase().replace(/\s+/g, '-') + '/property-sale'], {
      queryParams: {
        buliderId: data.BuilderId

      },
      queryParamsHandling: 'merge',
    });
    localStorage.setItem('buliderId', data.BuilderId);
    localStorage.setItem('isBuilderId', 'true');
  }



  // ---------------------<-- enquery forum -->------------------------------


  //   currentItem: any;

  // getenquiry(id, name, cityId) {
  //   this.cityservice.enquiryFormOpen = true;

  //   this.property_id = id;
  //   this.user.propertyname = name;
  //   this.Filter.PropertyName = name;
  //   this.Filter.selectedCityId = cityId;
  //   this.currentItem = name;

  //   $('#otpValidate').css('display','block');

  // }
  checkBox: boolean = false;
  contactButton: boolean = false;
  RequestButton: boolean = false;
  requestCallback: boolean = false;
  numberLogIn = true;
  otpValidating = false;
  otploader: boolean;


  currentItem: any;

  browser: any;
  cityId: any;
  pageOrigin: any;
  currentCity: any;
  propertyId: any;
  categoryId: any;
  propUserIDPk: any;
  userIdAPI: any;
  contactedSalearr: any;
  contactedRentalarr: any;
  contactedIndividualarr: any;
  localityId: any;
  regionId: any;


  getenquiry(id, name, cityId, data, categoryId) {

    var loginId = localStorage.getItem('loginID');
    if (loginId === '1') {

      if (categoryId == 1) {
        this.propertyId = id;
        this.localityId = data.localityID;
        this.regionId = data.regionid;
      } else if (categoryId == 2) {

        this.userIdAPI = data.userIDFK;
        this.propertyId = id;
        this.localityId = data.localityID;
        this.regionId = data.regionid;

      } else if (categoryId == 3) {
        this.userIdAPI = data.userIDFK;
        this.propertyId = id;
        this.localityId = data.localityID;
        this.regionId = data.regionid;
      } else if (categoryId == 4) {
        // this.userIdAPI = data.userIDFK;
        this.propertyId = id;
        this.localityId = data.localityID;
        // this.regionId = data.regionid;
        // this.cityId = cityId
        // this.currentCity = data.city_name;

      } else {
        // this.userIdAPI = data.userIDFK;
        this.propertyId = id;
        this.localityId = data.localityID;
        // this.regionId = data.regionid;
        // this.cityId = cityId
        // this.currentCity = data.city_name;
      }


      this.user.propertyname = name;
      this.user.localityId = this.localityId;
      this.user.regionId = this.regionId;
      this.user.propertyid = this.propertyId;
      this.Filter.PropertyName = name;
      this.Filter.proptypeid = this.propertyId;
      this.cityId = cityId;
      this.currentCity = data.city_name;
      this.pageOrigin = 'user_profile';
      this.categoryId = categoryId;
      // this.propertyId = id
      this.propUserIDPk = data.Userid;

    } else {

      if (categoryId == 1) {
        this.propertyId = id;
        this.localityId = data.LoaclityId;
        this.regionId = data.RegionID;
        this.cityId = data.cityId
        this.currentCity = data.city_name;

      } else if (categoryId == 2) {

        this.userIdAPI = data.userIDFK;
        this.propertyId = id;
        this.localityId = data.LocalityID;
        // this.regionId = data.regionid;
        this.cityId = data.Cityid
        this.currentCity = data.City;


      } else if (categoryId == 3) {
        this.userIdAPI = data.userIDFK;
        this.propertyId = id;
        this.localityId = data.LocalityId;
        // this.regionId = data.regionid;
        this.cityId = cityId
        this.currentCity = data.City;

      } else if (categoryId == 4) {
        // this.userIdAPI = data.userIDFK;
        this.propertyId = id;
        this.localityId = data.localityid;
        // this.regionId = data.regionid;
        this.cityId = cityId
        this.currentCity = data.city_name;

      } else {
        // this.userIdAPI = data.userIDFK;
        this.propertyId = id;
        this.localityId = data.locality_IDFK;
        // this.regionId = data.regionid;
        this.cityId = cityId
        this.currentCity = data.city;
      }

      this.user.propertyname = name;
      this.user.localityId = this.localityId;
      this.user.regionId = this.regionId;
      this.user.propertyid = this.propertyId;
      this.Filter.PropertyName = name;
      this.Filter.proptypeid = this.propertyId;
      // this.currentCity = data.city_name;
      this.pageOrigin = 'user_profile';
      this.categoryId = categoryId;
      // this.propertyId = id
      // this.propUserIDPk = data.Userid;
    }





    // this.contactForm.present();
    // this.Brochure=false;

    this.contactButton = true
    this.checkBox = true;
    this.requestCallback = true;
    this.RequestButton = false;


  }

  HideEnquery() {
    // this.contactForm.dismiss();
    // $('#contactFormClose').click();
    (document.getElementById('contactFormClose') as HTMLElement).click();

    this.user.name = '';
    this.user.number = '';
    this.user.mail = '';
    this.user.otp = '';
    $('#btn_reset2').click();
    $('#uname').attr('placeholder', 'UserName');
    $('#uemail').attr('placeholder', 'Email Id');
    $('#unumber').attr('placeholder', 'Mobile Number');


    this.numberLogIn = true;
    this.otpValidating = false;
    this.otploader = false;
    $('.OtpDiv').css('display', 'none');
    $('.countdown_maindiv').css('display', 'none');
    $('.otpexpireclass').css('display', 'block');
  }

  otpsend() {
    if ($('#uname').val() === '') {
      $('#uname').focus().css('border-color', 'red').attr('placeholder', 'Please Enter Name');
      return false;
    } else {
      var enameFilter = /^([a-zA-Z]+\s)*[a-zA-Z]+$/;
      if (enameFilter.test($('#uname').val())) {
        $('#uname').removeAttr('style');
      } else {
        $('#uname').focus().css('border-color', 'red').attr('placeholder', 'Please enter valid name').val('');
        return false;
      }
    }

    if ($('#unumber').val() === '') {
      $('#unumber').focus().css('border-color', 'red').attr('placeholder', 'Please Enter Phone Number');
      return false;
    } else {
      var mobilee = /^[0-9]{10}$/;
      if (mobilee.test($('#unumber').val())) {
        $('#unumber').removeAttr('style');
      } else {
        $('#unumber').focus().css('border-color', 'red').attr('placeholder', 'Please enter valid contact number').val('');
        return false;
      }
    }

    if ($('#uemail').val() === '') {
      // $('#uemail').focus().css('border-color', 'red').attr('placeholder', 'Please Enter Email-id');
      // return false;
    } else {
      var emai = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
      if (emai.test($('#uemail').val())) {
        $('#uemail').removeAttr('style');
      } else {
        $('#uemail').focus().css('border-color', 'red').attr('placeholder', 'Please enter valid email-id').val('');
        return false;
      }
    }



    this.otploader = true;
    this.SubmitForm();


  }
  SubmitForm() {
    let browserInfo = navigator.userAgent;
    let browser;

    if (browserInfo.includes('Opera') || browserInfo.includes('Opr')) {
      browser = 'Opera';
    } else if (browserInfo.includes('Edg')) {
      browser = 'Edge';
    } else if (browserInfo.includes('Chrome')) {
      browser = 'Chrome';
    } else if (browserInfo.includes('Safari')) {
      browser = 'Safari';
    } else if (browserInfo.includes('Firefox')) {
      browser = 'Firefox'
    } else {
      browser = 'unknown'
    }


    this.user.propertyname = this.Filter.PropertyName
    var param = this.user;
    this.browser = browser
    this.otploader = true;

    // this.propertyId = this.Filter.propertyID



    var pageorgin = this.pageOrigin;


    if (this.categoryId == 1) {
      this.propService.addPropertyCallEnquiry(param, pageorgin, this.cityId, this.browser).subscribe(success => {
        if (success['status'] === 'True') {
          this.otploader = false;
          if (success['code'] === "3") {
            this.otpHandle();
          } else {
            $('#otpValidate').css('display', 'none');
            // this.loginclose(false) //close button
            this.HideEnquery()
            if (Array.isArray(this.propertyId)) {
              this.propertyId = this.propertyId[0];
            }
            this.propertyId = String(this.propertyId);

            if ('contactedPropId' in localStorage) {
              this.contactedSalearr = JSON.parse(localStorage.getItem('contactedPropId') || '[]');
            } else {
              this.contactedSalearr = [];
            }
            if (!this.contactedSalearr.includes(this.propertyId)) {
              this.contactedSalearr.push(this.propertyId);
              localStorage.setItem('contactedPropId', JSON.stringify(this.contactedSalearr));
            }

            swal({
              text: 'We Will Intimate you soon!',
              type: 'success',
              showConfirmButton: false,
              timer: 2500
            });
            this.user.name = ''
            this.user.number = ''
            this.user.mail = ''
            $('#ename').attr('placeholder', 'Name')
            $('#emobile').attr('placeholder', 'Mobile Number')
            $('#eemail').attr('placeholder', 'Email Id')
            $('.modal_close').click();
            $('body').removeClass('bodyoverlay');

          }
          this.user.verification = 1;

        }
      });
    } else if (this.categoryId == 2) {

      this.Service.individuallistenq(param, pageorgin, this.user.propertyname, this.userIdAPI).subscribe(success => {
        if (success['status'] === 'True') {
          this.otploader = false;

          if (success['code'] === "3") {
            this.otpHandle();
          } else {
            $('#otpValidateind').css('display', 'none');
            $('#btn_reset2').click();
            // this.IsVisibleEnquery = false
            this.HideEnquery()
            if (Array.isArray(this.propertyId)) {
              this.propertyId = this.propertyId[0];
            }
            this.propertyId = String(this.propertyId);

            if ('contactedIndividualPropId' in localStorage) {
              this.contactedIndividualarr = JSON.parse(localStorage.getItem('contactedIndividualPropId') || '[]');
            } else {
              this.contactedIndividualarr = [];
            }
            if (!this.contactedIndividualarr.includes(this.propertyId)) {
              this.contactedIndividualarr.push(this.propertyId);
              localStorage.setItem('contactedIndividualPropId', JSON.stringify(this.contactedIndividualarr));
            }


            swal({
              text: 'We Will Intimate you soon!',
              type: 'success',
              showConfirmButton: false,
              timer: 2500
            });
            this.user.name = ''
            this.user.number = ''
            this.user.mail = ''
            $('#ename').attr('placeholder', 'Name')
            $('#emobile').attr('placeholder', 'Mobile Number')
            $('#eemail').attr('placeholder', 'Email Id')
            $('.modal_close').click();
            $('body').removeClass('bodyoverlay');

          }
          this.user.verification = 1;
        }
      });
    } else if (this.categoryId == 3) {
      this.Service.rentalsenq(param, pageorgin, this.user.propertyname, this.userIdAPI).subscribe(success => {
        if (success['status'] === 'True') {
          this.otploader = false;
          if (success['code'] === "3") {
            this.otpHandle();
          } else {
            $('#otpValidateind').css('display', 'none');
            $('#btn_reset2').click();
            // this.IsVisibleEnquery = false
            this.HideEnquery()

            if (Array.isArray(this.propertyId)) {
              this.propertyId = this.propertyId[0];
            }
            this.propertyId = String(this.propertyId);

            if ('contactedRentalPropId' in localStorage) {
              this.contactedRentalarr = JSON.parse(localStorage.getItem('contactedRentalPropId') || '[]');
            } else {
              this.contactedRentalarr = [];
            }
            if (!this.contactedRentalarr.includes(this.propertyId)) {
              this.contactedRentalarr.push(this.propertyId);
              localStorage.setItem('contactedRentalPropId', JSON.stringify(this.contactedRentalarr));
            }

            swal({
              text: 'We Will Intimate you soon!',
              type: 'success',
              showConfirmButton: false,
              timer: 2500
            });
            this.user.name = ''
            this.user.number = ''
            this.user.mail = ''
            $('#ename').attr('placeholder', 'Name')
            $('#emobile').attr('placeholder', 'Mobile Number')
            $('#eemail').attr('placeholder', 'Email Id')
            $('.modal_close').click();
            $('body').removeClass('bodyoverlay');
          }
          this.user.verification = 1;
        }
      });

    } else if (this.categoryId == 4) {
      // commercialenq(param, pageorgin, cityId, browser) 
      this.Service.commercialenq(param, pageorgin, this.cityId, browser).subscribe(success => {
        if (success['status'] === 'True') {
          this.otploader = false;
          if (success['code'] === "3") {
            this.otpHandle();
          } else {
            $('#otpValidateind').css('display', 'none');
            $('#btn_reset2').click();
            // this.IsVisibleEnquery = false
            this.HideEnquery()

            if (Array.isArray(this.propertyId)) {
              this.propertyId = this.propertyId[0];
            }
            this.propertyId = String(this.propertyId);

            if ('contactedcommercialPropData' in localStorage) {
              this.contactedRentalarr = JSON.parse(localStorage.getItem('contactedcommercialPropData') || '[]');
            } else {
              this.contactedRentalarr = [];
            }
            if (!this.contactedRentalarr.includes(this.propertyId)) {
              this.contactedRentalarr.push(this.propertyId);
              localStorage.setItem('contactedcommercialPropData', JSON.stringify(this.contactedRentalarr));
            }

            swal({
              text: 'We Will Intimate you soon!',
              type: 'success',
              showConfirmButton: false,
              timer: 2500
            });
            this.user.name = ''
            this.user.number = ''
            this.user.mail = ''
            $('#ename').attr('placeholder', 'Name')
            $('#emobile').attr('placeholder', 'Mobile Number')
            $('#eemail').attr('placeholder', 'Email Id')
            $('.modal_close').click();
            $('body').removeClass('bodyoverlay');
          }
          this.user.verification = 1;
        }
      });

    } else if (this.categoryId == 5) {
      // pgenq(param, pageorgin, cityId, browser)
      this.Service.pgenq(param, pageorgin, this.cityId, browser).subscribe(success => {
        if (success['status'] === 'True') {
          this.otploader = false;
          if (success['code'] === "3") {
            this.otpHandle();
          } else {
            $('#otpValidateind').css('display', 'none');
            $('#btn_reset2').click();
            // this.IsVisibleEnquery = false
            this.HideEnquery()

            if (Array.isArray(this.propertyId)) {
              this.propertyId = this.propertyId[0];
            }
            this.propertyId = String(this.propertyId);

            if ('contactedpgPropID' in localStorage) {
              this.contactedRentalarr = JSON.parse(localStorage.getItem('contactedpgPropID') || '[]');
            } else {
              this.contactedRentalarr = [];
            }
            if (!this.contactedRentalarr.includes(this.propertyId)) {
              this.contactedRentalarr.push(this.propertyId);
              localStorage.setItem('contactedpgPropID', JSON.stringify(this.contactedRentalarr));
            }

            swal({
              text: 'We Will Intimate you soon!',
              type: 'success',
              showConfirmButton: false,
              timer: 2500
            });
            this.user.name = ''
            this.user.number = ''
            this.user.mail = ''
            $('#ename').attr('placeholder', 'Name')
            $('#emobile').attr('placeholder', 'Mobile Number')
            $('#eemail').attr('placeholder', 'Email Id')
            $('.modal_close').click();
            $('body').removeClass('bodyoverlay');
          }
          this.user.verification = 1;
        }
      });

    }
  }

  otpHandle() {
    var param = this.user;

    this.Service.otpsend(param).subscribe((success: { messages }) => {
      var status = success.messages[0].status;
      if (status == 'ENQUEUED') {
        this.numberLogIn = false;
        this.otpValidating = true;
        this.otploader = false;
        $('.OtpDiv').css('display', 'block');
        $('.countdown_maindiv').css('display', 'block');
        $('.otpexpireclass').css('display', 'none');
        this.countdown4.begin();
        this.ngOtpInput.setValue('');
        var buttonId = $('#one').attr('id');
      } else {
        swal({
          title: 'Oops Something Error!',
          type: 'error',
          showConfirmButton: false,
          timer: 1500
        });

      }
    }, (err) => {
      console.log('Connection Failed');
    });
  }

  handleEvent(e: CountdownEvent) {
    if (e.action === 'done') {

      $('.countdown_maindiv').css('display', 'none');
      $('.otpexpireclass').css('display', 'block');
    }
  }

  onOtpChange(otp) {
    var param = this.user;
    param.otp = otp;
  }

  otpvalidate4() {
    var otplength = 4;
    if ($('#otp').val() == '') {

      this.ngOtpInput.setValue('');

      swal({
        title: 'Please enter the OTP!',
        type: 'error',
        showConfirmButton: false,
        timer: 1000
      });
      return false;
    } else {
      var liveotpcount = $('#otp').val().length;
      if (liveotpcount < otplength) {

        this.ngOtpInput.setValue('');

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
    var param = this.user;
    this.Service.otpvalidcheck(param).subscribe((success) => {
      var status = success['status'];
      if (status == 'True') {
        // this.otpUserLoginNewAPI();
        this.user.verification = 2;
        this.SubmitForm();
        this.numberLogIn = true;
        $('.OtpDiv').css('display', 'none');
        $('#otpValidateind').css('display', 'none');
        this.otpValidating = false;
        this.countdown4.restart();
        swal({
          text: 'We Will Intimate you soon!',
          type: 'success',
          showConfirmButton: false,
          timer: 2500
        });
      } else {
        this.ngOtpInput.setValue('');

        swal({
          title: 'Oops Something Error!',
          text: 'Its Not a valid OTP / OTP Expired!',
          type: 'error',
          showConfirmButton: false,
          timer: 1500
        });



      }
    }, (err) => {
      // console.log('Connection Failed');
    });
  }

  config = {
    allowNumbersOnly: false,
    length: 4,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      'width': '50px',
      'height': '50px'
    }
  };
  countdownconfig = {
    leftTime: 60,
    demand: true
  };


  goback1() {
    $('.OtpDiv').css('display', 'none');
    this.numberLogIn = true;


    this.countdownconfig = {
      leftTime: 60,
      demand: true
    };
    // this.countdown4.begin();
    this.otpValidating = false;

  }

  otpBasedLogin1() {
    const paramNum = {
      number: this.user.number
    }
    this.countdownconfig = {
      leftTime: 60,
      demand: true
    };
    this.ngOtpInput.setValue('');
    this.otploader = true;
    this.Service.otpsend(paramNum).subscribe((success: { messages }) => {
      var status = success.messages[0].status;
      if (status == 'ENQUEUED') {
        $('.countdown_maindiv').css('display', 'block');
        $('.otpexpireclass').css('display', 'none');
        this.countdown4.begin();
        this.otploader = false;

        // this.loader = false;
        // var buttonId = $('#one').attr('id');
        // $('#modal-container').removeAttr('class').addClass(buttonId);
        // $('body').addClass('modal-active');
        // $('body').removeClass('bodyoverlay');

      } else {
        swal({
          title: 'Oops Something Error!',
          type: 'error',
          showConfirmButton: false,
          timer: 1500
        });
        // this.otploader = false;
        // $('body').removeClass('bodyoverlay');
      }
    },
      (err) => {
        console.log('Connection Failed');
      });
  }

  goBackFromEnq() {
    this.numberLogIn = true;
    this.otpValidating = false;
    this.otploader = false;
    // $('.enqiery').css('display', 'block');
    $('.OtpDiv').css('display', 'none');
    $('.countdown_maindiv').css('display', 'none');
    $('.otpexpireclass').css('display', 'block');

  }

  @HostListener('window:scroll', [])
  onContentScroll() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;

    const element = this.el.nativeElement.querySelector('.propertyTypeBtns');

    if (scrollTop > 0) {
      // this.renderer.setStyle(element, 'position', 'sticky');
      this.renderer.setStyle(element, 'top', '95px');
    } else {
      // this.renderer.setStyle(element, 'position', 'absolute');
      this.renderer.setStyle(element, 'top', '108px');
    }
  }


  projectsClicked = false;
  byIndividualClicked = false;
  rentalClicked = false;
  commercialClicked = false;
  pgClicked = false;
  wishListingUnfiltered = [];
  UserSeenProjectsUnfiltered = [];
  UserContactedProjectsUnfiltered = [];
  onlyProject() {
    this.byIndividualClicked = false;
    this.rentalClicked = false;
    this.commercialClicked = false;
    this.pgClicked = false;
    $('.btnByIndividual').css('border-color', '#B4B4B4');
    $('.btnByIndividual').css('background', '#f4f4f4');
    $('.btnByIndividual').css('color', '#4b4b4b');

    $('.btnRental').css('border-color', '#B4B4B4');
    $('.btnRental').css('background', '#f4f4f4');
    $('.btnRental').css('color', '#4b4b4b');

    $('.btnCommercial').css('border-color', '#B4B4B4');
    $('.btnCommercial').css('background', '#f4f4f4');
    $('.btnCommercial').css('color', '#4b4b4b');

    $('.btnPG').css('border-color', '#B4B4B4');
    $('.btnPG').css('background', '#f4f4f4');
    $('.btnPG').css('color', '#4b4b4b');

    if (this.UserId) {
      if (this.projectsClicked == false) {
        $('.btnProject').css('border-color', '#971b47');
        $('.btnProject').css('background', '#ffecf3');
        $('.btnProject').css('color', '#971b47');
        this.wishListing = this.wishListingUnfiltered.filter(property => property.CatagoryId == 1);
        this.UserSeenProjects = this.UserSeenProjectsUnfiltered.filter(property => property.db_category_id == 1);
        this.UserContactedProjects = this.UserContactedProjectsUnfiltered.filter(property => property.db_category_id == 1);
        this.wishListingLength2 = this.wishListing.length;
        this.UserSeenLength2 = this.UserSeenProjects.length;
        this.UserContactedLength2 = this.UserContactedProjects.length;

        this.projectsClicked = true;
      } else if (this.projectsClicked == true) {
        $('.btnProject').css('border-color', '#B4B4B4');
        $('.btnProject').css('background', '#f4f4f4');
        $('.btnProject').css('color', '#4b4b4b');
        this.wishListing = this.wishListingUnfiltered.filter(property => property.CatagoryId == 1 || property.CatagoryId == 2 || property.CatagoryId == 3 || property.CatagoryId == 4 || property.CatagoryId == 5);
        this.UserSeenProjects = this.UserSeenProjectsUnfiltered.filter(property => property.db_category_id == 1 || property.db_category_id == 2 || property.db_category_id == 3 || property.db_category_id == 4 || property.db_category_id == 5);
        this.UserContactedProjects = this.UserContactedProjectsUnfiltered.filter(property => property.db_category_id == 1 || property.db_category_id == 2 || property.db_category_id == 3 || property.db_category_id == 4 || property.db_category_id == 5);
        this.wishListingLength2 = this.wishListing.length;
        this.UserSeenLength2 = this.UserSeenProjects.length;
        this.UserContactedLength2 = this.UserContactedProjects.length;
      }
    } else {

      if (this.projectsClicked == false) {
        $('.btnProject').css('border-color', '#971b47');
        $('.btnProject').css('background', '#ffecf3');
        $('.btnProject').css('color', '#971b47');
        this.mergerWishlistArray = [
          ...this.WhishlistArray,
        ];
        this.mergerSeenListArray = [
          ...this.seenDataDetailsSale,
        ];
        this.mergerContactedListArray = [
          ...this.contactedDataDetailsSale,
        ];
        this.wishListingLength2 = this.mergerWishlistArray.length;
        this.UserSeenLength2 = this.mergerSeenListArray.length;
        this.UserContactedLength2 = this.mergerContactedListArray.length;

        this.projectsClicked = true;
      } else if (this.projectsClicked == true) {
        $('.btnProject').css('border-color', '#B4B4B4');
        $('.btnProject').css('background', '#f4f4f4');
        $('.btnProject').css('color', '#4b4b4b');
        this.mergerWishlistArray = [
          ...this.WhishlistArray,
          ...this.WhishlistRentalArray,
          ...this.WhishlistIndividualArray,
          ...this.WhishlistCommercialArray,
          ...this.WhishlistPGArray
        ];
        this.mergerSeenListArray = [
          ...this.seenDataDetailsSale,
          ...this.seenIndividualArray,
          ...this.seenRentalArray,
          ...this.seenCommercialArray,
          ...this.seenPGArray
        ];
        this.mergerContactedListArray = [
          ...this.contactedDataDetailsSale,
          ...this.contactedIndividualArray,
          ...this.contactedRentalArray,
          ...this.contactedCommercialArray,
          ...this.contactedPGArray,
        ];
        this.wishListingLength2 = this.mergerWishlistArray.length;
        this.UserSeenLength2 = this.mergerSeenListArray.length;
        this.UserContactedLength2 = this.mergerContactedListArray.length;

      }

    }
  }

  onlyByIndividual() {
    this.projectsClicked = false;
    this.rentalClicked = false;
    this.commercialClicked = false;
    this.pgClicked = false;
    $('.btnProject').css('border-color', '#B4B4B4');
    $('.btnProject').css('background', '#f4f4f4');
    $('.btnProject').css('color', '#4b4b4b');

    $('.btnRental').css('border-color', '#B4B4B4');
    $('.btnRental').css('background', '#f4f4f4');
    $('.btnRental').css('color', '#4b4b4b');

    $('.btnCommercial').css('border-color', '#B4B4B4');
    $('.btnCommercial').css('background', '#f4f4f4');
    $('.btnCommercial').css('color', '#4b4b4b');

    $('.btnPG').css('border-color', '#B4B4B4');
    $('.btnPG').css('background', '#f4f4f4');
    $('.btnPG').css('color', '#4b4b4b');

    if (this.UserId) {
      if (this.byIndividualClicked == false) {
        $('.btnByIndividual').css('border-color', '#971b47');
        $('.btnByIndividual').css('background', '#ffecf3');
        $('.btnByIndividual').css('color', '#971b47');
        this.wishListing = this.wishListingUnfiltered.filter(property => property.CatagoryId == 2);
        this.UserSeenProjects = this.UserSeenProjectsUnfiltered.filter(property => property.db_category_id == 2);
        this.UserContactedProjects = this.UserContactedProjectsUnfiltered.filter(property => property.db_category_id == 2);
        this.wishListingLength2 = this.wishListing.length;
        this.UserSeenLength2 = this.UserSeenProjects.length;
        this.UserContactedLength2 = this.UserContactedProjects.length;


        this.byIndividualClicked = true;
      } else if (this.byIndividualClicked == true) {
        $('.btnByIndividual').css('border-color', '#B4B4B4');
        $('.btnByIndividual').css('background', '#f4f4f4');
        $('.btnByIndividual').css('color', '#4b4b4b');
        this.wishListing = this.wishListingUnfiltered.filter(property => property.CatagoryId == 1 || property.CatagoryId == 2 || property.CatagoryId == 3 || property.CatagoryId == 4 || property.CatagoryId == 5);
        this.UserSeenProjects = this.UserSeenProjectsUnfiltered.filter(property => property.db_category_id == 1 || property.db_category_id == 2 || property.db_category_id == 3 || property.db_category_id == 4 || property.db_category_id == 5);
        this.UserContactedProjects = this.UserContactedProjectsUnfiltered.filter(property => property.db_category_id == 1 || property.db_category_id == 2 || property.db_category_id == 3 || property.db_category_id == 4 || property.db_category_id == 5);
        this.wishListingLength2 = this.wishListing.length;
        this.UserSeenLength2 = this.UserSeenProjects.length;
        this.UserContactedLength2 = this.UserContactedProjects.length;

        this.byIndividualClicked = false;

      }
    } else {
      if (this.byIndividualClicked == false) {
        $('.btnByIndividual').css('border-color', '#971b47');
        $('.btnByIndividual').css('background', '#ffecf3');
        $('.btnByIndividual').css('color', '#971b47');

        this.mergerWishlistArray = [
          ...this.WhishlistIndividualArray,
        ];
        this.mergerSeenListArray = [
          ...this.seenIndividualArray,
        ];
        this.mergerContactedListArray = [
          ...this.contactedIndividualArray,
        ];
        this.wishListingLength2 = this.mergerWishlistArray.length;
        this.UserSeenLength2 = this.mergerSeenListArray.length;
        this.UserContactedLength2 = this.mergerContactedListArray.length;

        this.byIndividualClicked = true;
      } else if (this.byIndividualClicked == true) {
        $('.btnByIndividual').css('border-color', '#B4B4B4');
        $('.btnByIndividual').css('background', '#f4f4f4');
        $('.btnByIndividual').css('color', '#4b4b4b');
        this.mergerWishlistArray = [
          ...this.WhishlistArray,
          ...this.WhishlistRentalArray,
          ...this.WhishlistIndividualArray,
          ...this.WhishlistCommercialArray,
          ...this.WhishlistPGArray
        ];
        this.mergerSeenListArray = [
          ...this.seenDataDetailsSale,
          ...this.seenIndividualArray,
          ...this.seenRentalArray,
          ...this.seenCommercialArray,
          ...this.seenPGArray
        ];
        this.mergerContactedListArray = [
          ...this.contactedDataDetailsSale,
          ...this.contactedIndividualArray,
          ...this.contactedRentalArray,
          ...this.contactedCommercialArray,
          ...this.contactedPGArray,
        ];
        this.wishListingLength2 = this.mergerWishlistArray.length;
        this.UserSeenLength2 = this.mergerSeenListArray.length;
        this.UserContactedLength2 = this.mergerContactedListArray.length;

        this.byIndividualClicked = false;

      }
    }
  }

  onlyRental() {
    this.projectsClicked = false;
    this.byIndividualClicked = false;
    this.commercialClicked = false;
    this.pgClicked = false;

    $('.btnProject').css('border-color', '#B4B4B4');
    $('.btnProject').css('background', '#f4f4f4');
    $('.btnProject').css('color', '#4b4b4b');

    $('.btnByIndividual').css('border-color', '#B4B4B4');
    $('.btnByIndividual').css('background', '#f4f4f4');
    $('.btnByIndividual').css('color', '#4b4b4b');

    $('.btnCommercial').css('border-color', '#B4B4B4');
    $('.btnCommercial').css('background', '#f4f4f4');
    $('.btnCommercial').css('color', '#4b4b4b');

    $('.btnPG').css('border-color', '#B4B4B4');
    $('.btnPG').css('background', '#f4f4f4');
    $('.btnPG').css('color', '#4b4b4b');

    if (this.UserId) {
      if (this.rentalClicked == false) {
        $('.btnRental').css('border-color', '#971b47');
        $('.btnRental').css('background', '#ffecf3');
        $('.btnRental').css('color', '#971b47');
        this.wishListing = this.wishListingUnfiltered.filter(property => property.CatagoryId == 3);
        this.UserSeenProjects = this.UserSeenProjectsUnfiltered.filter(property => property.db_category_id == 3);
        this.UserContactedProjects = this.UserContactedProjectsUnfiltered.filter(property => property.db_category_id == 3);
        this.wishListingLength2 = this.wishListing.length;
        this.UserSeenLength2 = this.UserSeenProjects.length;
        this.UserContactedLength2 = this.UserContactedProjects.length;

        this.rentalClicked = true;
      } else if (this.rentalClicked == true) {
        $('.btnRental').css('border-color', '#B4B4B4');
        $('.btnRental').css('background', '#f4f4f4');
        $('.btnRental').css('color', '#4b4b4b');
        this.wishListing = this.wishListingUnfiltered.filter(property => property.CatagoryId == 1 || property.CatagoryId == 2 || property.CatagoryId == 3 || property.CatagoryId == 4 || property.CatagoryId == 5);
        this.UserSeenProjects = this.UserSeenProjectsUnfiltered.filter(property => property.db_category_id == 1 || property.db_category_id == 2 || property.db_category_id == 3 || property.db_category_id == 4 || property.db_category_id == 5);
        this.UserContactedProjects = this.UserContactedProjectsUnfiltered.filter(property => property.db_category_id == 1 || property.db_category_id == 2 || property.db_category_id == 3 || property.db_category_id == 4 || property.db_category_id == 5);
        this.wishListingLength2 = this.wishListing.length;
        this.UserSeenLength2 = this.UserSeenProjects.length;
        this.UserContactedLength2 = this.UserContactedProjects.length;

        this.rentalClicked = false;

      }
    } else {
      if (this.rentalClicked == false) {
        $('.btnRental').css('border-color', '#971b47');
        $('.btnRental').css('background', '#ffecf3');
        $('.btnRental').css('color', '#971b47');
        this.mergerWishlistArray = [
          ...this.WhishlistRentalArray,
        ];
        this.mergerSeenListArray = [
          ...this.seenRentalArray,
        ];
        this.mergerContactedListArray = [
          ...this.contactedRentalArray,
        ];
        this.wishListingLength2 = this.mergerWishlistArray.length;
        this.UserSeenLength2 = this.mergerSeenListArray.length;
        this.UserContactedLength2 = this.mergerContactedListArray.length;

        this.rentalClicked = true;

      } else if (this.rentalClicked == true) {
        // ;
        $('.btnRental').css('border-color', '#B4B4B4');
        $('.btnRental').css('background', '#f4f4f4');
        $('.btnRental').css('color', '#4b4b4b');
        this.mergerWishlistArray = [
          ...this.WhishlistArray,
          ...this.WhishlistRentalArray,
          ...this.WhishlistIndividualArray,
          ...this.WhishlistCommercialArray,
          ...this.WhishlistPGArray
        ];
        this.mergerSeenListArray = [
          ...this.seenDataDetailsSale,
          ...this.seenIndividualArray,
          ...this.seenRentalArray,
          ...this.seenCommercialArray,
          ...this.seenPGArray
        ];
        this.mergerContactedListArray = [
          ...this.contactedDataDetailsSale,
          ...this.contactedIndividualArray,
          ...this.contactedRentalArray,
          ...this.contactedCommercialArray,
          ...this.contactedPGArray,
        ];
        this.wishListingLength2 = this.mergerWishlistArray.length;
        this.UserSeenLength2 = this.mergerSeenListArray.length;
        this.UserContactedLength2 = this.mergerContactedListArray.length;

        this.rentalClicked = false;

      }
    }

  }

  onlyCommercial() {
    this.projectsClicked = false;
    this.byIndividualClicked = false;
    this.rentalClicked = false;
    this.pgClicked = false;

    $('.btnProject').css('border-color', '#B4B4B4');
    $('.btnProject').css('background', '#f4f4f4');
    $('.btnProject').css('color', '#4b4b4b');

    $('.btnByIndividual').css('border-color', '#B4B4B4');
    $('.btnByIndividual').css('background', '#f4f4f4');
    $('.btnByIndividual').css('color', '#4b4b4b');

    $('.btnRental').css('border-color', '#B4B4B4');
    $('.btnRental').css('background', '#f4f4f4');
    $('.btnRental').css('color', '#4b4b4b');

    $('.btnPG').css('border-color', '#B4B4B4');
    $('.btnPG').css('background', '#f4f4f4');
    $('.btnPG').css('color', '#4b4b4b');

    if (this.UserId) {
      if (this.commercialClicked == false) {
        $('.btnCommercial').css('border-color', '#971b47');
        $('.btnCommercial').css('background', '#ffecf3');
        $('.btnCommercial').css('color', '#971b47');
        this.wishListing = this.wishListingUnfiltered.filter(property => property.CatagoryId == 4);
        this.UserSeenProjects = this.UserSeenProjectsUnfiltered.filter(property => property.db_category_id == 4);
        this.UserContactedProjects = this.UserContactedProjectsUnfiltered.filter(property => property.db_category_id == 4);
        this.wishListingLength2 = this.wishListing.length;
        this.UserSeenLength2 = this.UserSeenProjects.length;
        this.UserContactedLength2 = this.UserContactedProjects.length;

        this.commercialClicked = true;
      } else if (this.commercialClicked == true) {
        $('.btnCommercial').css('border-color', '#B4B4B4');
        $('.btnCommercial').css('background', '#f4f4f4');
        $('.btnCommercial').css('color', '#4b4b4b');
        this.wishListing = this.wishListingUnfiltered.filter(property => property.CatagoryId == 1 || property.CatagoryId == 2 || property.CatagoryId == 3 || property.CatagoryId == 4 || property.CatagoryId == 5);
        this.UserSeenProjects = this.UserSeenProjectsUnfiltered.filter(property => property.db_category_id == 1 || property.db_category_id == 2 || property.db_category_id == 3 || property.db_category_id == 4 || property.db_category_id == 5);
        this.UserContactedProjects = this.UserContactedProjectsUnfiltered.filter(property => property.db_category_id == 1 || property.db_category_id == 2 || property.db_category_id == 3 || property.db_category_id == 4 || property.db_category_id == 5);
        this.wishListingLength2 = this.wishListing.length;
        this.UserSeenLength2 = this.UserSeenProjects.length;
        this.UserContactedLength2 = this.UserContactedProjects.length;


        this.commercialClicked = false;

      }
    } else {
      if (this.commercialClicked == false) {
        $('.btnCommercial').css('border-color', '#971b47');
        $('.btnCommercial').css('background', '#ffecf3');
        $('.btnCommercial').css('color', '#971b47');

        this.mergerWishlistArray = [
          ...this.WhishlistCommercialArray,
        ];
        this.mergerSeenListArray = [
          ...this.seenCommercialArray,
        ];
        this.mergerContactedListArray = [
          ...this.contactedCommercialArray,
        ];
        this.wishListingLength2 = this.mergerWishlistArray.length;
        this.UserSeenLength2 = this.mergerSeenListArray.length;
        this.UserContactedLength2 = this.mergerContactedListArray.length;


        this.commercialClicked = true;
      } else if (this.commercialClicked == true) {
        $('.btnCommercial').css('border-color', '#B4B4B4');
        $('.btnCommercial').css('background', '#f4f4f4');
        $('.btnCommercial').css('color', '#4b4b4b');

        this.mergerWishlistArray = [
          ...this.WhishlistArray,
          ...this.WhishlistRentalArray,
          ...this.WhishlistIndividualArray,
          ...this.WhishlistCommercialArray,
          ...this.WhishlistPGArray
        ];
        this.mergerSeenListArray = [
          ...this.seenDataDetailsSale,
          ...this.seenIndividualArray,
          ...this.seenRentalArray,
          ...this.seenCommercialArray,
          ...this.seenPGArray
        ];
        this.mergerContactedListArray = [
          ...this.contactedDataDetailsSale,
          ...this.contactedIndividualArray,
          ...this.contactedRentalArray,
          ...this.contactedCommercialArray,
          ...this.contactedPGArray,
        ];
        this.wishListingLength2 = this.mergerWishlistArray.length;
        this.UserSeenLength2 = this.mergerSeenListArray.length;
        this.UserContactedLength2 = this.mergerContactedListArray.length;

        this.commercialClicked = false;

      }
    }

  }

  onlyPg() {
    this.projectsClicked = false;
    this.byIndividualClicked = false;
    this.commercialClicked = false;
    this.rentalClicked = false;

    $('.btnProject').css('border-color', '#B4B4B4');
    $('.btnProject').css('background', '#f4f4f4');
    $('.btnProject').css('color', '#4b4b4b');

    $('.btnByIndividual').css('border-color', '#B4B4B4');
    $('.btnByIndividual').css('background', '#f4f4f4');
    $('.btnByIndividual').css('color', '#4b4b4b');

    $('.btnRental').css('border-color', '#B4B4B4');
    $('.btnRental').css('background', '#f4f4f4');
    $('.btnRental').css('color', '#4b4b4b');

    $('.btnCommercial').css('border-color', '#B4B4B4');
    $('.btnCommercial').css('background', '#f4f4f4');
    $('.btnCommercial').css('color', '#4b4b4b');

    if (this.UserId) {
      if (this.pgClicked == false) {
        $('.btnPG').css('border-color', '#971b47');
        $('.btnPG').css('background', '#ffecf3');
        $('.btnPG').css('color', '#971b47');
        this.wishListing = this.wishListingUnfiltered.filter(property => property.CatagoryId == 5);
        this.UserSeenProjects = this.UserSeenProjectsUnfiltered.filter(property => property.db_category_id == 5);
        this.UserContactedProjects = this.UserContactedProjectsUnfiltered.filter(property => property.db_category_id == 5);
        this.wishListingLength2 = this.wishListing.length;
        this.UserSeenLength2 = this.UserSeenProjects.length;
        this.UserContactedLength2 = this.UserContactedProjects.length;

        this.pgClicked = true;
      } else if (this.pgClicked == true) {
        $('.btnPG').css('border-color', '#B4B4B4');
        $('.btnPG').css('background', '#f4f4f4');
        $('.btnPG').css('color', '#4b4b4b');
        this.wishListing = this.wishListingUnfiltered.filter(property => property.CatagoryId == 1 || property.CatagoryId == 2 || property.CatagoryId == 3 || property.CatagoryId == 4 || property.CatagoryId == 5);
        this.UserSeenProjects = this.UserSeenProjectsUnfiltered.filter(property => property.db_category_id == 1 || property.db_category_id == 2 || property.db_category_id == 3 || property.db_category_id == 4 || property.db_category_id == 5);
        this.UserContactedProjects = this.UserContactedProjectsUnfiltered.filter(property => property.db_category_id == 1 || property.db_category_id == 2 || property.db_category_id == 3 || property.db_category_id == 4 || property.db_category_id == 5);
        this.wishListingLength2 = this.wishListing.length;
        this.UserSeenLength2 = this.UserSeenProjects.length;
        this.UserContactedLength2 = this.UserContactedProjects.length;

        this.pgClicked = false;

      }
    } else {
      if (this.pgClicked == false) {
        $('.btnPG').css('border-color', '#971b47');
        $('.btnPG').css('background', '#ffecf3');
        $('.btnPG').css('color', '#971b47');

        this.mergerWishlistArray = [
          ...this.WhishlistPGArray
        ];
        this.mergerSeenListArray = [
          ...this.seenPGArray
        ];
        this.mergerContactedListArray = [
          ...this.contactedPGArray,
        ];
        this.wishListingLength2 = this.mergerWishlistArray.length;
        this.UserSeenLength2 = this.mergerSeenListArray.length;
        this.UserContactedLength2 = this.mergerContactedListArray.length;

        this.pgClicked = true;
      } else if (this.pgClicked == true) {
        $('.btnPG').css('border-color', '#B4B4B4');
        $('.btnPG').css('background', '#f4f4f4');
        $('.btnPG').css('color', '#4b4b4b');

        this.mergerWishlistArray = [
          ...this.WhishlistArray,
          ...this.WhishlistRentalArray,
          ...this.WhishlistIndividualArray,
          ...this.WhishlistCommercialArray,
          ...this.WhishlistPGArray
        ];
        this.mergerSeenListArray = [
          ...this.seenDataDetailsSale,
          ...this.seenIndividualArray,
          ...this.seenRentalArray,
          ...this.seenCommercialArray,
          ...this.seenPGArray
        ];
        this.mergerContactedListArray = [
          ...this.contactedDataDetailsSale,
          ...this.contactedIndividualArray,
          ...this.contactedRentalArray,
          ...this.contactedCommercialArray,
          ...this.contactedPGArray,
        ];
        this.wishListingLength2 = this.mergerWishlistArray.length;
        this.UserSeenLength2 = this.mergerSeenListArray.length;
        this.UserContactedLength2 = this.mergerContactedListArray.length;

        this.pgClicked = false;

      }
    }

  }
}
