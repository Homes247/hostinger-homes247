import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { DataService } from '../data.service';
import { Meta, Title } from '@angular/platform-browser';

import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Clipboard } from '@angular/cdk/clipboard';

// import { ToastController } from '@ionic/angular';
// import { Share } from '@capacitor/share';
import { enquiry } from '../prop-details-new/class';

declare var $: any;
declare var swal: any;

@Component({
  selector: 'app-sell-properties',
  templateUrl: './sell-properties.component.html',
  styleUrls: ['./sell-properties.component.css']
})
export class SellPropertiesComponent implements OnInit {
  showLoader: boolean;
  Date = new Date();
  // propertyimage = this.Service.imagesURL + "uploadPropertyImgs/";
  sellproject = [];
  deletestatus: any;
  rentproject: any;
  UserId: any;
  rentshowLoader: boolean;


  // @ViewChild('fileInput') el: ElementRef;
  imageUrl: any = 'usericon.jpg';
  // ProfileImage = this.ServiceIndvi.ProfileImage
  editFile: boolean = true;
  removeUpload: boolean = false;
  submitted: boolean;
  registrationForm: FormGroup;
  username;
  userEmail;
  userNumber;
  email;
  LoginId;
  city: any;
  alloffersList = [];
  property_id: any;
  zeroprojects = false;
  userDetails = [];
  UserSeenProjects = [];
  userListSale = [];
  userListSaleUnfiltered = [];
  userListRent = [];
  userListRentUnfiltered = [];
  mergedSellRent = [];
  coverImageUrl = 'https://img-mb.homes247.in/images/individuallistings/cover/';
  // coverImageUrl = this.Service.individualImgTest + 'cover/';
  coverImageUrlRent = 'https://img-mb.homes247.in/images/rentals/cover/';
  commericalImgUrl = 'https://img-mb.homes247.in/images/commerical_img/gallery/';
  pgCoverImgUrl = 'https://img-mb.homes247.in/images/pg_img/gallery/';

  lastname: any;
  imageUrls: any;
  enquiryFor: any;
  propIdDelete: any;
  selectedOthers = false;
  delReasonApi: any;
  selectedReasonBtn = false;
  deleteApiSale = false;
  deleteApiRent = false;
  deleteApiPG = false;
  deleteApiCommercial = false;
  user = new enquiry();
  usernameDisplay;
  lastnameDisplay;
  deleteReasons = [];
  userListPGUnfiltered = [];
  userListPG = [];
  commercial_type: any;

  constructor(private Service: DataService, private titleService: Title,
    private meta: Meta, private router: Router,
    private clipboard: Clipboard,
    private renderer: Renderer2, private el: ElementRef
    // private toastController: ToastController
  ) {
  }

  propertyimage = this.Service.SellImages + 'cover/';
  rentpropertyimage = this.Service.RenImages + 'cover/';

  ngOnInit(): void {
    this.metatags();
    // this.getsellproperties();
    // this.getrentproperties();

    this.getUserList();
    $('body').removeClass('modal-open');
  }



  async onclickshare(data: any) {
    try {

      const clean = (val: string) =>
        val?.replace(/(\r\n|\n|\r)/gm, '').trim().toLowerCase().replace(/\s+/g, '-') || '';

      let url: string;

      if (data.Type !== 'Plot') {
        url = `https://www.homes247.in/listings/${clean(data.BHK)}-${clean(data.Type)}-for-sale-in-${clean(data.Locality)}-${clean(data.City)}-at-${clean(data.Propertyname)}-${data.PropertyID}`;
      } else {
        url = `https://www.homes247.in/listings/${clean(data.Area)}-${clean(data.Areatype)}-${clean(data.Type)}-for-sale-in-${clean(data.Locality)}-${clean(data.City)}-at-${clean(data.Propertyname)}-${data.PropertyID}`;
      }

      if ((navigator as any).share) {

        await (navigator as any).share({
          title: data.Propertyname,
          text: `Check out this amazing Property - ${data.Propertyname}`,
          url: url,
        });
      } else {

        await navigator.clipboard.writeText(url);
        ;
      }
    } catch (error) {
    }
  }


  async onclickRentShare(data: any) {
    try {

      const clean = (val: string) =>
        val?.replace(/(\r\n|\n|\r)/gm, '')    // Remove line breaks
          .trim()                             // Trim whitespace
          .toLowerCase()                      // Lowercase
          .replace(/\s+/g, '-') || '';        // Replace spaces with hyphens

      let url: string;

      if (data.Type !== 'Plot') {
        url = `https://www.homes247.in/rentals/${clean(data.BHK)}-${clean(data.Type)}-for-rent-in-${clean(data.Locality)}-${clean(data.City)}-at-${clean(data.Propertyname)}-${data.PropertyID}`;
      } else {
        url = `https://www.homes247.in/rentals/${clean(data.Area)}-${clean(data.Areatype)}-${clean(data.Type)}-for-rent-in-${clean(data.Locality)}-${clean(data.City)}-at-${clean(data.Propertyname)}-${data.PropertyID}`;
      }

      if ((navigator as any).share) {

        await (navigator as any).share({
          title: data.Propertyname,
          text: `Check out this amazing Property - ${data.Propertyname}`,
          url: url,
        });
      } else {

        await navigator.clipboard.writeText(url);
        ;
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  }


  async onclickPGShare(data: any) {
    try {

      const clean = (val: string) =>
        val?.replace(/(\r\n|\n|\r)/gm, '')    // Remove line breaks
          .trim()                             // Trim whitespace
          .toLowerCase()                      // Lowercase
          .replace(/\s+/g, '-') || '';        // Replace spaces with hyphens

      const url = `https://www.homes247.in/pgd/pg-for-rent-in-${clean(data.city_name)}-${data.pg_ID}`;

      if ((navigator as any).share) {

        await (navigator as any).share({
          title: data.pg_name,
          text: `Check out this amazing PG accommodation! - ${data.pg_name}`,
          url: url,
        });
      } else {

        await navigator.clipboard.writeText(url);
        ;
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  }


  async commericalRentShare(data: any) {
    try {

      const clean = (val: string) =>
        val?.replace(/(\r\n|\n|\r)/gm, '')    // Remove line breaks
          .trim()                             // Trim whitespace
          .toLowerCase()                      // Lowercase
          .replace(/\s+/g, '-') || '';        // Replace spaces with hyphens

      const url = `https://www.homes247.in/cld/commercial-properties-for-rent-in-${clean(data.City)}-${data.commerical_id}-${data.PropertyID}`;

      if ((navigator as any).share) {

        await (navigator as any).share({
          title: data.Propertyname,
          text: `Check out this amazing Property - ${data.Propertyname}`,
          url: url,
        });
      } else {

        await navigator.clipboard.writeText(url);
        ;
      }
    } catch (error) {
    }
  }


  async commericalSaleShare(data: any) {
    try {

      const clean = (val: string) =>
        val?.replace(/(\r\n|\n|\r)/gm, '')    // Remove line breaks
          .trim()                             // Trim whitespace
          .toLowerCase()                      // Lowercase
          .replace(/\s+/g, '-') || '';        // Replace spaces with hyphens

      const url = `https://www.homes247.in/cld/commercial-properties-for-sale-in-${clean(data.City)}-${data.commerical_id}-${data.PropertyID}`;

      if ((navigator as any).share) {

        await (navigator as any).share({
          title: data.Propertyname,
          text: `Check out this amazing Property - ${data.Propertyname}`,
          url: url,
        });
      } else {

        await navigator.clipboard.writeText(url);
        ;
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  }

  metatags() {
    const PAGEID = '44';
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


  @HostListener('window:scroll', [])
  onContentScroll() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;

    const element = this.el.nativeElement.querySelector('.propertyTypeBtns');

    if (scrollTop > 0) {
      this.renderer.setStyle(element, 'position', 'sticky');
      this.renderer.setStyle(element, 'top', '98px');
    } else {
      this.renderer.setStyle(element, 'position', 'absolute');
      this.renderer.setStyle(element, 'top', '108px');
    }
  }

  getUserList() {
    this.showLoader = true;
    this.UserId = localStorage.getItem('userID');

    var param = {
      userid: this.UserId
    };


    this.Service.getuserselllist(param).subscribe(offers => {
      // console.log(offers);
      this.userListSaleUnfiltered = offers['Userlistings'];
      this.userListSaleUnfiltered.sort().reverse();
      this.userListSale = this.userListSaleUnfiltered.filter(property => property.Deletion == '0')


      this.UserId = localStorage.getItem('userID');
      this.Service.getuserrentlist(param).subscribe(offers => {
        // console.log(offers);
        this.userListRentUnfiltered = offers['Userlistings'];
        this.userListRentUnfiltered.sort().reverse();
        this.userListRent = this.userListRentUnfiltered.filter(property => property.Deletion == '0')

        this.Service.getuserPGlist(param).subscribe(offers => {


          this.userListPGUnfiltered = offers['Userlistings'];
          this.userListPGUnfiltered.sort().reverse();
          this.userListPG = this.userListPGUnfiltered.filter(property => property.Deletion == '0');
          // this.userListPG = this.userListPGUnfiltered

          this.mergedSellRent = [
            ...this.userListSaleUnfiltered.filter(property => property.Deletion == '1'),
            ...this.userListRentUnfiltered.filter(apartment => apartment.Deletion == '1'),
            ...this.userListPGUnfiltered.filter(pg => pg.Deletion == '1')
          ];

          // this.mergedSellRent = merged
          // console.log('mergedArray ' + JSON.stringify(this.mergedSellRent));
        });
        // const merged = [...this.userListRent, ...this.userList]
      });

    });
  }

  reActivateSaleProperty(propId) {
    swal({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#971b47',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, activate it!'
    }).then((result) => {
      if (result.value === true) {
        this.Service.activateSalePropByUseIdAndPropId(this.UserId, propId).subscribe(response => {
          // console.log(response);
          if (response['message'] === 'Data Successfully Removed') {
            swal(
              'Reactivated!',
              'Your Project has been activated again.',
              'success'
            );
            this.getUserList();
          }
        });
      }
    });
  }
  reActivateRentProperty(propId) {
    swal({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#971b47',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, activate it!'
    }).then((result) => {
      if (result.value === true) {
        this.Service.activateRentPropByUseIdAndPropId(this.UserId, propId).subscribe(response => {
          // console.log(response);
          if (response['message'] === 'Data Successfully Removed') {
            swal(
              'Reactivated!',
              'Your Project has been activated again.',
              'success'
            );
            this.getUserList();
          }
        });
      }
    });
  }

  // deletePropertyRent(propId) {
  //   const userid = localStorage.getItem('userID');
  //   const param = {
  //     userid: userid,
  //     propid: propId
  //   };
  //   swal({
  //     title: 'Are you sure?',
  //     text: 'You won\'t be able to revert this!',
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#971b47',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Yes, delete it!'
  //   }).then((result) => {
  //     if (result.value === true) {
  //       this.Service.getdeleteuserRentlist(param).subscribe(response => {
  //         // console.log(response);
  //         if (response['message'] === 'Data Successfully Removed') {
  //           swal(
  //             'Deleted!',
  //             'Your Project has been deleted.',
  //             'success'
  //           );
  //           this.getUserList();
  //         }
  //       });
  //     }
  //   });
  // }

  enquiredBhkOrPlot: any;
  enquiredPropType: any;
  enqLocality: any;
  rentSalePG: any;
  allEnquiries = [];



  enquiries(data, rentSalePG) {
    if (data.Type === 'Plot') {
      this.enquiredBhkOrPlot = data.Plottype_Name
    } else {
      this.enquiredBhkOrPlot = data.BHK
    }

    this.enquiredPropType = data.Type
    this.enqLocality = data.Locality

    if (rentSalePG == 'sale') {
      this.rentSalePG = 'Sale'
      this.enquiryFor = 1
    } else if (rentSalePG == 'rent') {
      this.rentSalePG = 'Rent'
      this.enquiryFor = 2
    }
    var propName = data.Propertyname
    // 

    this.Service.getEnquiredList(propName, this.enquiryFor).subscribe(response => {
      this.allEnquiries = response['Propdetails'];
    })
  }
    enquiriesCommercial(data, rentSalePG) {
    // if (data.Type === 'Plot') {
      this.enquiredBhkOrPlot = data.Propertyname;
    // } else {
      // this.enquiredBhkOrPlot = data.commerical_type;
    // }

    this.enquiredPropType = data.Type;
    this.enqLocality = data.Locality;

    if (rentSalePG == 'sale') {
      this.rentSalePG = 'Sale';
      this.enquiryFor = 1;
    } else if (rentSalePG == 'rent') {
      this.rentSalePG = 'Rent';
      this.enquiryFor = 2;
    }
    var propId= data.PropertyID;
    // ;

    this.Service.getEnquiredListCommercial(propId).subscribe(response => {
      this.allEnquiries = response['Propdetails'];
    })
  }
  enquiriesPG(data) {

    var pg_ID = data.pg_ID;
    this.rentSalePG = 'PG';
    this.enquiredBhkOrPlot = data.pg_name;
    this.enquiredPropType = data.pg_for;
    this.enqLocality = data.locality_name;

    // 

    this.Service.getEnquiredListPG(pg_ID).subscribe(response => {
      this.allEnquiries = response['Propdetails'];
    })
  }


  copyContent(number: string) {
    // this.clipboard.copy(number);
    // ;
    if ((navigator as any).clipboard) {
      (navigator as any).clipboard.writeText(number).then(() => {
      })
    }
  }

  copyContentEmail(email: string) {
    // this.clipboard.copy(email);
    // ;
    if ((navigator as any).clipboard) {
      (navigator as any).clipboard.writeText(email).then(() => {
      })
    }
  }


  getenquiry(id, name) {
    this.property_id = id;
    this.user.propertyname = name;

  }

  getUserById() {
    this.UserId = localStorage.getItem('userID');
    this.Service.getUserDetailsById(this.UserId).subscribe(response => {
      this.userDetails = response['UserDetails'];
      this.username = this.userDetails[0]['user_name'];
      this.lastname = this.userDetails[0]['last_name'];
      this.usernameDisplay = this.userDetails[0]['user_name'];
      this.lastnameDisplay = this.userDetails[0]['last_name'];
      this.userEmail = this.userDetails[0]['user_email'];
      this.email = this.userDetails[0]['user_email'];
      this.userNumber = this.userDetails[0]['number'];
      this.imageUrls = this.userDetails[0]['user_profile']

      if (this.usernameDisplay == undefined && this.lastnameDisplay == undefined) {

        this.lastnameDisplay = 'User';
      }
      if (this.usernameDisplay == undefined) {

        this.usernameDisplay = 'Guest';
      }
    });
  }

  selectedOption: any | null = null;
  selectedOptionOther: any | null = null;

  @ViewChild('deleteModal') deleteModal;

  deleteProperty(data, selectedDeletBtn) {
    // 
    // this.deleteModal.present();
    this.deleteReasons = data.deleteReasons
    this.propIdDelete = data.PropertyID
    if (selectedDeletBtn == 'Sale') {
      this.deleteApiSale = true;
      this.deleteApiRent = false;
      this.deleteApiPG = false;
      this.deleteApiCommercial = false;
    } else if (selectedDeletBtn == 'Rent') {
      this.deleteApiRent = true;
      this.deleteApiSale = false;
      this.deleteApiPG = false;
      this.deleteApiCommercial = false;
    } else if (selectedDeletBtn == 'PG') {
      this.deleteApiPG = true;
      this.deleteApiSale = false;
      this.deleteApiRent = false;
      this.deleteApiCommercial = false;
      // Fetch delete reasons for PG
      this.Service.getDeleteReasonsPG().subscribe((response: any) => {
        // console.log(response);
        this.deleteReasons = response;

        this.propIdDelete = data.pg_ID;
      });

    } else if (selectedDeletBtn == 'Commercial') {
      this.deleteApiCommercial = true;
      this.deleteApiSale = false;
      this.deleteApiRent = false;
      this.deleteApiPG = false;
      // Fetch delete reasons for Commercial
      this.Service.getDeleteReasonsCommercial().subscribe((response: any) => {
        // console.log(response);
        this.deleteReasons = response;

        this.propIdDelete = data.PropertyID;
        this.commercial_type = data.commerical_value_type;
      });


    }

  }



  onSelectionChange() {
    this.selectedOthers = false; // Reset "Other" when a predefined reason is selected
    $('.btn_style1').css('background', '#971b47');
    this.selectedReasonBtn = true;


  }

  onSelectionOther() {
    this.selectedOthers = true; // Enable the "Other" textarea
    this.selectedOptionOther = ''; // Clear previous value for "Other"
    this.selectedReasonBtn = false;
    $('.btn_style1').css('background', '#cbcbcb');
    // this.selectedReasonBtn = true;
    // $('.btn_style1').css('background','#971b47');
  }

  onInputChangeReason() {
    if (this.selectedOptionOther.length >= 10) {
      this.selectedReasonBtn = true;
      $('.btn_style1').css('background', '#971b47');
    } else {
      this.selectedReasonBtn = false;
      $('.btn_style1').css('background', '#cbcbcb');
    }
  }



  submitForm() {


    swal({
      title: 'Are you sure?',
      text: 'Your Property will get Inactive!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#971b47',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirm!'
    }).then((result) => {


      // 



      if (result.value === true) {

        const selectedReason = this.selectedOthers
          ? this.selectedOptionOther
          : this.selectedOption;


        if (this.selectedOthers) {

          if ($('#selectOtherReasonTxt').val() === '') {
            $('#selectOtherReasonTxt').focus().css('border-color', 'red').attr('placeholder', 'Please Enter Your Reason');
            return false;
          } else {
            const nameFilter = /^(?=.*[a-zA-Z])(?=.*[^\s])[a-zA-Z0-9\s\S]{3,}$/m;
            if (nameFilter.test($('#selectOtherReasonTxt').val())) {
              $('#selectOtherReasonTxt').removeAttr('style');
            } else {
              $('#selectOtherReasonTxt').focus().css('border-color', 'red').attr('placeholder', 'Please Enter Your Valid Reason').val('');
              return false;
            }
          }






          this.delReasonApi = selectedReason
        } else {
          this.delReasonApi = selectedReason
        }

        var deleteReason = this.delReasonApi
        // 
        // $('#delPropModal .close').click()
        const userid = localStorage.getItem('userID');
        const param = {
          userid: userid,
          propid: this.propIdDelete,
          delReason: deleteReason
        };


        if (this.deleteApiSale) {

          this.Service.getdeleteuserselllist(param).subscribe(response => {
            if (response['message'] === 'Data Successfully Removed') {


              // Clear the textarea
              $('textarea').val('');

              this.selectedReasonBtn = false;
              this.selectedOption = ''
              $('.btn_style1').css('background', '#cbcbcb');
              this.selectedOthers = false;

              $('input[type="radio"]').prop('checked', false);
              $('#delPropModal .close').click()

              swal(
                'Deleted!',
                'Your Project is now Inactive.',
                'success'
              );

              this.getUserList();
            }
          });
        } else if (this.deleteApiRent) {
          this.Service.getdeleteuserRentlist(param).subscribe(response => {
            if (response['message'] === 'Data Successfully Removed') {


              // Clear the textarea
              $('textarea').val('');

              this.selectedReasonBtn = false;
              this.selectedOption = ''

              $('.btn_style1').css('background', '#cbcbcb');
              this.selectedOthers = false;
              $('input[type="radio"]').prop('checked', false);
              $('#delPropModal .close').click()


              swal(
                'Deleted!',
                'Your Project is now Inactive.',
                'success'
              );
              this.getUserList();
            }
          });
        } else if (this.deleteApiPG) {
          const param = {
            userid: userid,
            propid: this.propIdDelete,
            delReason: deleteReason
          };
          this.Service.getdeleteuserPGlist(param).subscribe(response => {
            if (response['message'] === 'Property deleted successfully') {


              // Clear the textarea
              $('textarea').val('');

              this.selectedReasonBtn = false;
              this.selectedOption = ''

              $('.btn_style1').css('background', '#cbcbcb');
              this.selectedOthers = false;
              $('input[type="radio"]').prop('checked', false);
              $('#delPropModal .close').click()

              swal(
                'Deleted!',
                'Your Project is now Inactive.',
                'success'
              );
              this.getUserList();
            }
          });
        } else if (this.deleteApiCommercial) {
          const param = {
            userid: userid,
            propid: this.propIdDelete,
            delReason: deleteReason,
            commercial_type: this.commercial_type
          };
          this.Service.getdeleteuserCommercial(param).subscribe(response => {
            if (response['message'] === 'Property deleted successfully') {


              // Clear the textarea
              $('textarea').val('');

              this.selectedReasonBtn = false;
              this.selectedOption = ''

              $('.btn_style1').css('background', '#cbcbcb');
              this.selectedOthers = false;
              $('input[type="radio"]').prop('checked', false);
              $('#delPropModal .close').click()


              swal(
                'Deleted!',
                'Your Project is now Inactive.',
                'success'
              );
              this.getUserList();
            }
          });
        }
      }
    });
  }

  approvedClicked = false;
  reviewClicked = false;
  rejectClicked = false;




  onTabClick(event: any) {
    const tabIndex = event.index;  // Gives you the index of the clicked tab
    // ;
    // 
    if (tabIndex == 3) {
      $('.propertyTypeBtns').css('visibility', 'hidden');
      $('.tabGap').css('margin-top', '0px');
    } else {
      $('.propertyTypeBtns').css('visibility', 'visible');
      $('.tabGap').css('margin-top', '47px');


    }
    // Your custom logic for the click event
  }
  onlyApproved() {
    this.reviewClicked = false;
    this.rejectClicked = false;
    $('.btnReview').css('border-color', '#B4B4B4');
    $('.btnReview').css('background', '#f4f4f4');
    $('.btnReview').css('color', '#4b4b4b');

    $('.btnReject').css('border-color', '#B4B4B4');
    $('.btnReject').css('background', '#f4f4f4');
    $('.btnReject').css('color', '#4b4b4b');

    if (this.approvedClicked == false) {
      $('.btnApproved').css('border-color', '#971b47');
      $('.btnApproved').css('background', '#ffecf3');
      $('.btnApproved').css('color', '#971b47');

      this.userListSale = this.userListSaleUnfiltered.filter(property => property.Verification == '0')
      this.userListRent = this.userListRentUnfiltered.filter(property => property.Verification == '0')
      this.userListPG = this.userListPGUnfiltered.filter(property => property.Verification == '0');
      this.approvedClicked = true;
    } else if (this.approvedClicked == true) {
      $('.btnApproved').css('border-color', '#B4B4B4');
      $('.btnApproved').css('background', '#f4f4f4');
      $('.btnApproved').css('color', '#4b4b4b');
      this.userListSale = this.userListSaleUnfiltered.filter(property => property.Verification == '0' || property.Verification == '1' || property.Verification == '2')
      this.userListRent = this.userListRentUnfiltered.filter(property => property.Verification == '0' || property.Verification == '1' || property.Verification == '2')
      this.userListPG = this.userListPGUnfiltered.filter(property => property.Verification == '0' || property.Verification == '1' || property.Verification == '2')
      this.approvedClicked = false;

    }

  }
  onlyUnderReview() {
    this.approvedClicked = false;
    this.rejectClicked = false;

    $('.btnApproved').css('border-color', '#B4B4B4');
    $('.btnApproved').css('background', '#f4f4f4');
    $('.btnApproved').css('color', '#4b4b4b');

    $('.btnReject').css('border-color', '#B4B4B4');
    $('.btnReject').css('background', '#f4f4f4');
    $('.btnReject').css('color', '#4b4b4b');


    if (this.reviewClicked == false) {
      $('.btnReview').css('border-color', '#971b47');
      $('.btnReview').css('background', '#ffecf3');
      $('.btnReview').css('color', '#971b47');

      this.userListSale = this.userListSaleUnfiltered.filter(property => property.Verification == '1')
      this.userListRent = this.userListRentUnfiltered.filter(property => property.Verification == '1')
      this.userListPG = this.userListPGUnfiltered.filter(property => property.Verification == '1');


      this.reviewClicked = true;
    } else if (this.reviewClicked == true) {
      $('.btnReview').css('border-color', '#B4B4B4');
      $('.btnReview').css('background', '#f4f4f4');
      $('.btnReview').css('color', '#4b4b4b');
      this.userListSale = this.userListSaleUnfiltered.filter(property => property.Verification == '0' || property.Verification == '1' || property.Verification == '2')
      this.userListRent = this.userListRentUnfiltered.filter(property => property.Verification == '0' || property.Verification == '1' || property.Verification == '2')
      this.userListPG = this.userListPGUnfiltered.filter(property => property.Verification == '0' || property.Verification == '1' || property.Verification == '2')
      this.reviewClicked = false;

    }

  }

  onlyRejected() {
    this.approvedClicked = false;
    this.reviewClicked = false;

    $('.btnApproved').css('border-color', '#B4B4B4');
    $('.btnApproved').css('background', '#f4f4f4');
    $('.btnApproved').css('color', '#4b4b4b');

    $('.btnReview').css('border-color', '#B4B4B4');
    $('.btnReview').css('background', '#f4f4f4');
    $('.btnReview').css('color', '#4b4b4b');

    if (this.rejectClicked == false) {
      $('.btnReject').css('border-color', '#971b47');
      $('.btnReject').css('background', '#ffecf3');
      $('.btnReject').css('color', '#971b47');

      this.userListSale = this.userListSaleUnfiltered.filter(property => property.Verification == '2')
      this.userListRent = this.userListRentUnfiltered.filter(property => property.Verification == '2')
      this.userListPG = this.userListPGUnfiltered.filter(property => property.Verification == '2')
      this.rejectClicked = true;
    } else if (this.rejectClicked == true) {
      $('.btnReject').css('border-color', '#B4B4B4');
      $('.btnReject').css('background', '#f4f4f4');
      $('.btnReject').css('color', '#4b4b4b');
      this.userListSale = this.userListSaleUnfiltered.filter(property => property.Verification == '0' || property.Verification == '1' || property.Verification == '2')
      this.userListRent = this.userListRentUnfiltered.filter(property => property.Verification == '0' || property.Verification == '1' || property.Verification == '2')
      this.userListPG = this.userListPGUnfiltered.filter(property => property.Verification == '0' || property.Verification == '1' || property.Verification == '2')
      this.rejectClicked = false;

    }

  }


}
