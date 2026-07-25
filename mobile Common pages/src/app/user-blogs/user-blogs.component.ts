import { DataService2 } from './../data.service2';
import { Component, ElementRef, OnInit, Inject, ViewChild, HostListener } from '@angular/core';
import { DataService } from '../data.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { enquiry } from '../prop-details-new/class';
import { CountdownComponent, CountdownEvent } from 'ngx-countdown';
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Location } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { WINDOW } from '@ng-toolkit/universal';


declare var swal: any;
declare var $: any;
declare var tinymce: any;


declare var $: any;
@Component({
  selector: 'app-user-blogs',
  templateUrl: './user-blogs.component.html',
  styleUrls: ['./user-blogs.component.css']
})
export class UserBlogsComponent implements OnInit {
  @ViewChild('cd1', { static: false }) private countdown: CountdownComponent;
  @ViewChild('cancel') cancel: ElementRef;
  @ViewChild('fileInput') fileInput: ElementRef;
  Mousemovement: boolean = false;
  showLoader = true;


  userLogined = true;
  notLogedIn = false;
  loader = false;
  static blogsCount: number;
  blogLoginForm: FormGroup;
  user = new enquiry();
  otpexpired = false;
  blogDetailslength = false;
  draftBlogDetailslength = false;
  pendingBlogDetailslength = false;
  authdetails: any;
  designation: any;
  blogDetails: any;
  blogDetailsLong: any;
  allTopics: any;
  allApprovedTopics: any;
  blogDetails1: any;
  profileDropDownOpen = false;
  loginDropDownOpen = false;
  notUploaded = true;
  iconChecked = false;
  blogViewSection = false;
  blogPendingSection = true;
  textareaValue = '';
  editViewBlog = false;
  talkAbtInputValue = ''
  locationInputValue = ''
  authBioInputValue = ''
  bioForm: FormGroup;
  registrationForm: FormGroup;
  registrationForm1: FormGroup;
  linkForm: FormGroup;
  registrationForm2: FormGroup;
  CoverImage = [];
  CoverImage1 = [];
  State_Name = [];
  draftPublishList = [];
  UserId;
  userDetails: any;
  username: any;
  lastUsername: any;
  ProfileImage = this.Service.ProfileImageBlog;
  blogCoverImage = this.Service.coverImageBlog;
  blogCoverImage1 = this.Service.coverImageBlog1;
  socialMediaImage = this.Service.socialMediaImage;
  ProfileImageNull = this.Service.bloggerImageNull;
  imageUrls: any;
  afterlogin_imageUrls: any;
  mediaImageUrls: any;
  imageUrl: any = 'bloggerProfile.png';
  coverImageUrl: any = 'bloggerCover.png';
  noImgUrl: any = 'NoBlogImage.jpg'
  showDraftProfile = true;
  showAbout = false;
  bloggerId: any;
  blogCount: any;
  blogCount1 = true;

  blogCoverImgUrls: any;
  profileCoverImgUrls: any;
  blogCoverImgUrls2: any;
  date: any;
  authdetails1: any;
  username1: any
  date1: any;
  authLocation: any;
  authNameInputValue = ''
  socialLinkInputValue = ''
  authDesignationInputValue = ''
  draftBlogDetails: any;
  pendingBlogDetails: any;
  viewBlogDetails: any;
  noBlogsTxt = false;
  blogId: any;
  categoryName: any;
  topicName: any;
  categoryId: any;
  topicId: any;
  lStoreTextAreaContent: string;
  showAuthBio: any;
  showAuthTalksAbt: any;
  searchTerm: string = '';
  pendingBlogDetails1: any;
  draftBlogDetails1: any;
  private routeSub: Subscription;
  blogCatName: any;
  blogCategoryId: any;
  selectedImageIndex: number;
  inputValues: any;
  allIconList: any;
  iconId: any;
  allIconList1: any;
  mediaImageUrls1: any;
  // blogAuthName: any;
  BlogtypeId: any;
  projectcount: any;
  uploadResponse;
  uploadResponse1;
  txtAreaLngth = false;
  openInputLink = false;
  uploadResponse2;
  CoverImage2 = [];
  blogger_name: any;
  blogger_name_html: any;
  blogger_name_1: any;
  blogger_name_2: any;
  myControl = new FormControl();
  filteredOptions: Observable<any>;
  options;
  public text: string = "Search Blogs";
  bloggertype: any;
  zeroprojects = false;
  activeTab: string;
  private preventBack = false;

  tinyMceApi;


  constructor(
    private router: Router,
    public Service: DataService,
    public Service2: DataService2,
    public fb: FormBuilder,
    private activeroute: ActivatedRoute,
    private location: Location,
    @Inject(WINDOW) private window: Window,
    private titleService: Title, private meta: Meta,) {
    //  this.overrideBackButton();
  }

  ngOnInit() {
    this.updateBlogDetails();
    this.socialMediaFunction();
    this.InitialLoad();
    this.getAuto();
    // Subscribe to route params to get the active tab
    this.activeroute.queryParams.subscribe(params => {
      this.activeTab = params['tab'] || 'blog'; // Default to 'blog' if no tab is specified
    });
  }

  // private overrideBackButton() {
  //   history.pushState(null, document.title, window.location.href);
  //   window.onpopstate = () => {
  //     if (!this.preventBack) {
  //       const confirmed = confirm("You may lose unsaved data. Are you sure you want to go back?");
  //       if (!confirmed) {
  //         history.pushState(null, document.title, window.location.href);
  //         return;
  //       }
  //     }
  //     this.preventBack = false;
  //   };
  // }

  // @HostListener('window:beforeunload', ['$event'])
  // onBeforeUnload(event) {
  //   this.preventBack = true;
  // }


  // Function to set the active tab and update the URL
  setActiveTab(tab: string): void {
    this.activeTab = tab;
    this.router.navigate([], {
      relativeTo: this.activeroute,
      queryParams: { tab: tab }, // Update the query parameter
      queryParamsHandling: 'merge' // Keep existing query parameters
    });
  }



  public displayname(value) {
    if (value) {
      return value.name;
    }
  }
  showReason: any

  removeBackdrop(authData: any) {
    this.showReason = authData.remarks;
  }

  getAuto() {
    var blogid = '1';
    this.Service2.getblogAuto(blogid).subscribe(myLocalList => {
      this.apioptions(myLocalList['blogautolist']);
    });
  }
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
    // return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
    const filtered = this.options.filter(option => option.name.toLowerCase().includes(filterValue));
    return filtered.length > 0 ? filtered : [{ name: 'No Blogs Matched' }];
  }



  onItemSelect(selected) {
    const blogurl = selected.url.toLowerCase().replace(/\s+/g, '-');
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
  topicLength = false;
  approvedtopicLength = false;
  updateBlogDetails() {
    this.Mousemovement = true;

    UserBlogsComponent.blogsCount = 6;
    this.bloggerId = this.router.url.split('-').pop().match(/[0-9]+/);

    this.routeSub = this.activeroute.params.subscribe(params => {

      var lasturl = this.router.url
      const inputString = lasturl;
      const parts = inputString.split('-');
      const authtypeid = parseInt(parts[parts.length - 2]);
      const categoryid = parseInt(parts[parts.length - 3])
      this.BlogtypeId = authtypeid;
      if (categoryid.toString() == "NaN") {
        this.blogCategoryId = '';
      } else {
        this.blogCategoryId = categoryid;
      }


      var param = {
        bloggerId: this.bloggerId,
        bloggerType: this.BlogtypeId,
        limit: 0,
        limitrows: 12,
        catId: this.blogCategoryId
      }
      this.showLoader = true;

      this.Service.getpublicBlogList(param).subscribe(response => {
        this.blogDetails1 = response['blogtopic'];
        var status = response['status'];
        if (status == "False") {
          this.blogDetailslength = true;

        } else {
          this.showLoader = false;

        }
        this.blogDetails = this.blogDetails1;
        // 
        this.profileCoverImgUrls = this.blogDetails1[0].profilecoverimage;
        this.imageUrls = this.blogDetails1[0].profile;
        this.blogCount = this.blogDetails1.length;
        if (this.blogCount = []) {
          this.blogCount = 'No Blogs'
        }

      });

      var param2 = {
        bloggerId: this.bloggerId,
        bloggerType: this.BlogtypeId,
        catId: this.blogCategoryId
      }

      this.Service.getpublicBlogListCount(param2).subscribe(countprojects => {
        let projectcount = countprojects['blogscount'];
        this.projectcount = projectcount[0].counts;

        if (this.projectcount <= 0) {
          this.showLoader = false;
          this.zeroprojects = true;
        }
        if (this.projectcount > 0) {
          this.zeroprojects = false;
        }
      });

      var param3 = {
        bloggerId: this.bloggerId,
      }

      this.Service.blogscategorybyauthid(param3).subscribe((allCategoryList: any[]) => {
        this.State_Name = allCategoryList['blogtopic'];
      })


      var bloggerId = localStorage.getItem('bloggerId');
      var param5 = {
        bloggerId: bloggerId,
      }

      this.Service.getAuthorDetails(param5).subscribe(response => {
        var profile = response['blogtype'].BloggerProfile;
        this.afterlogin_imageUrls = profile[0].profile;

      })

      this.Service.getAuthorDetails(param3).subscribe(response => {
        this.authdetails1 = response['blogtype'].BloggerProfile;
        this.blogger_name = this.authdetails1[0].name.replace(/\s+/g, '-').toLowerCase();
        this.blogger_name_html = this.authdetails1[0].name;
        this.date = this.authdetails1[0].date;
        this.designation = this.authdetails1[0].desginaion;
        this.authLocation = this.authdetails1[0].place;
        this.imageUrls = this.authdetails1[0].profile;
        this.profileCoverImgUrls = this.authdetails1[0].coverimg;
        this.talkAbtInputValue = this.authdetails1[0].talksabout
        this.locationInputValue = this.authdetails1[0].place
        this.authBioInputValue = this.authdetails1[0].bio
        this.authNameInputValue = this.authdetails1[0].name
        this.authDesignationInputValue = this.authdetails1[0].desginaion;
        this.bloggertype = this.authdetails1[0].bloggerType;

        this.titleService.setTitle(this.blogger_name_html + ' - Blogs | Homes247.in');
        this.meta.updateTag({
          name: 'description',
          content: 'Explore ' + this.blogger_name_html + ' ' + this.projectcount + '+ captivating blogs on Homes247.in. Uncover the latest real estate trends, insights, and much more. Get ready to be hooked!'
        });
        this.Service.createLinkForCanonicalURL();

      })
      if (this.router.url.indexOf('/userblogs/profile/') > -1) {
        var param4 = {
          bloggerId: this.bloggerId,
          bloggerType: this.BlogtypeId,
        }

        this.Service.blogDraftPublish(param4).subscribe((allCategoryList: any[]) => {
          var array = allCategoryList['blogtopic'];
          this.blogger_name_1 = array[0].bloggerName.replace(/\s+/g, '-').toLowerCase();

          var status = allCategoryList['status'];
          if (status == "False") {
            this.blogDetailslength = true;
            this.draftBlogDetailslength = true;
            this.pendingBlogDetailslength = true;
          }
          this.blogDetails1 = array.filter(function (el) {
            return el.status == 1;
          });
          // 
          this.blogCount = array.length
          if (array.length < 0) {
            this.blogDetails = this.blogDetails1;

          } else {

          }


          // this.blogCount = this.blogDetails.length
          if (array.length == 0) {
            this.blogDetailslength = true;
          }

          this.draftBlogDetails1 = array.filter(function (el) {
            return el.status == 3;
          });
          // 

          this.draftBlogDetails = this.draftBlogDetails1;
          if (this.draftBlogDetails.length == 0) {
            this.draftBlogDetailslength = true;
            // 

          }

          this.pendingBlogDetails1 = array.filter(function (el) {
            return el.status == 4 || el.status == 2;
          });
          this.pendingBlogDetails = this.pendingBlogDetails1;
          if (this.pendingBlogDetails.length == 0) {
            this.pendingBlogDetailslength = true;
          }
        })
        this.Service.blogPendingTopicList(param4).subscribe((allCategoryList: any[]) => {
          this.allTopics = allCategoryList['blogtopic'];
          if (!this.allTopics) {
            this.topicLength = true;
          }
        });
        this.Service.blogApprovedTopicList(param4).subscribe((allCategoryList: any[]) => {
          this.allApprovedTopics = allCategoryList['blogtopic'];
          if (!this.allApprovedTopics) {
            this.approvedtopicLength = true;
          }
        });
      }
    })
  }



  InitialLoad() {
    var bloggerId = localStorage.getItem('bloggerId');
    if (this.router.url.indexOf('userblogs') > -1) {
      this.showDraftProfile = true;
      this.profileDropDownOpen = true;
      this.showAbout = false;
      if (this.bloggerId == bloggerId) {

      } else {
        localStorage.removeItem('bloggerId');
        this.router.navigate(['/insights/authors/login'])
      }
    }
    else {
      this.showDraftProfile = false;
      this.showAbout = true;
      this.loginDropDownOpen = true;
      this.profileDropDownOpen = false;
    }

    if (this.router.url.indexOf('insights/authors/login') > -1) {
      var bloggerId = localStorage.getItem('bloggerId');
      if (bloggerId == undefined || null) {
        this.notLogedIn = true;
        this.userLogined = false;
        this.loginDropDownOpen = true;
      } else {
        this.loginDropDownOpen = false;
        this.profileDropDownOpen = true;
        this.router.navigate(['/userblogs/profile/' + this.blogger_name + '-' + this.bloggertype + '-' + this.bloggerId])
      }
    } else {
    }

    if (this.router.url.indexOf('/blogs/author/') > -1) {
      var bloggerId = localStorage.getItem('bloggerId');
      if (bloggerId == undefined || null) {
        this.loginDropDownOpen = true;
        this.profileDropDownOpen = false;

      } else {
        this.profileDropDownOpen = true;
        this.loginDropDownOpen = false;
      }


    }
    if (this.router.url.indexOf('/userblogs/profile/') > -1) {
      var bloggerId = localStorage.getItem('bloggerId');
      // if (bloggerId == undefined || null) {
      //   this.router.navigate(['/insights/authors/login'])
      // } else {
      // }
    } else {
    }

    this.registrationForm = this.fb.group({
      file: [''],
      coverImage: [''],
      cover: [''],
    });
    this.registrationForm1 = this.fb.group({
      file: [''],
      coverImage1: [''],
      cover1: [''],
    });
    this.registrationForm2 = this.fb.group({
      file: [''],
      coverImage2: [''],
      cover2: [''],
    });

    var enameFilter = /^([a-zA-Z]+\s)*[a-zA-Z]+$/;
    if (enameFilter.test($('#priofileNameinputId').val())) {
      this.bioForm = this.fb.group({
        textAreaBio: '',
        talksAbout: this.talkAbtInputValue,
        locationAuth: this.locationInputValue,
        authName: this.authNameInputValue,
        authDesignation: this.authDesignationInputValue,
      });
    } else {
      // swal({
      //   title: 'Enter Valid Name!',
      //   type: 'error',
      //   showConfirmButton: false,
      //   timer: 1500
      // });
    }

    this.linkForm = this.fb.group({
      linksAuth: '',
    });

    this.blogLoginForm = new FormGroup({
      newUserNumber: new FormControl(''),
    });

    this.blogId = this.router.url.split('/').pop().match(/[0-9]+/);
    this.routeSub = this.activeroute.params.subscribe(params => {
      this.blogger_name_1 = params['bloggerName'];
      if (this.router.url.indexOf('userblogs') > -1) {
        if (this.router.url.indexOf('/userblogs/manage/' + this.blogger_name_1 + '/' + this.blogId + '-' + this.bloggerId) > -1) {
          $('.modal-backdrop').remove();
          $('body').removeClass('modal-open');
          this.loader = true;
          this.userLogined = false;
          this.blogViewSection = true;
          var param3 = {
            blogId: this.blogId,
          }

          this.Service.getViewBlogDetail(param3).subscribe((allCategoryList: any[]) => {
            this.viewBlogDetails = allCategoryList['blogcontent'];
          });

          this.loader = false;


          this.Service.getViewBlogDetail(param3).subscribe((allCategoryList: any[]) => {
            this.viewBlogDetails = allCategoryList['blogcontent'];
          });

        } else if (this.router.url.indexOf('userblogs/editblog/' + this.blogger_name_1 + '/' + this.blogId + '-' + this.bloggerId) > -1) {
          this.loader = true;



          var param3 = {
            blogId: this.blogId,
          }
          this.Service.getViewBlogDetail(param3).subscribe((allCategoryList: any[]) => {
            this.viewBlogDetails = allCategoryList['blogcontent'];
            this.categoryName = this.viewBlogDetails[0].category;
            this.topicName = this.viewBlogDetails[0].topic;
            this.textareaValue = this.viewBlogDetails[0].content;
            this.viewEditBlog(this.textareaValue)
            this.categoryId = this.viewBlogDetails[0].catId;
            this.topicId = this.viewBlogDetails[0].topicId;
          });
          this.loader = false;
          this.userLogined = false;

        } else {
        }
      } else {
      }
    })
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

    var bloggerId = localStorage.getItem('bloggerId');
    if (bloggerId == undefined || null) {
      this.loginDropDownOpen = true;
    } else {
      this.loginDropDownOpen = false;
      this.profileDropDownOpen = true;
    }
  }

  socialMediaFunction() {

    if (this.bloggerId == undefined || null) {
      this.bloggerId = this.bloggerId
    } else {
    }

    var param5 = {
      bloggerId: this.bloggerId,
      iconId: ''
    }
    this.Service.getbloggerMediaLinks(param5).subscribe((allCategoryList: any[]) => {
      this.allIconList1 = allCategoryList['bloggerLinks'];
      this.allIconList = allCategoryList['bloggerIcon'];
      this.mediaImageUrls = this.allIconList;
    });
  }
  otpBasedLogin1() {

    // this.countdown.begin();
    // 
    this.loader = true;
    this.countdownconfig = {
      leftTime: 30,
      demand: true
    };

    const paramNum = {
      number: this.user.number
    }
    this.Service.otpsend(paramNum).subscribe((success) => {
      var prestatus = success['messages'][0].status;
      // var status = prestatus[0].MessageErrorDescription;
      if (prestatus == 'ENQUEUED') {
        this.loader = false;
        this.otpexpired = false;
        this.countdown.begin();
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

      });


  }
  otpBasedLogin() {
    if ($('#emobileLogin').val() == "") {
      $('#emobileLogin').focus().css("border-color", "red").attr('placeholder', 'Please Enter Mobile Number');
      return false;
    }
    else {
      var mobilee = /^[0-9]{10}$/;
      if (mobilee.test($('#emobileLogin').val())) {
        $('#emobileLogin').removeAttr("style");
      }
      else {
        $('#emobileLogin').focus().css("border-color", "red").attr('placeholder', 'Please enter valid Mobile number').val('');
        return false;
      }
    }
    this.loader = true;


    const paramNum = {
      number: this.user.number
    }
    // this.otploader = true;
    $('body').addClass('bodyoverlay');
    this.Service.otpsend(paramNum).subscribe((success) => {
      var prestatus = success['messages'][0].status;
      // var status = prestatus[0].MessageErrorDescription;
      if (prestatus == 'ENQUEUED') {
        this.loader = false;

        this.countdown.begin();
        var buttonId = $('#one').attr('id');
        $('#modal-container').removeAttr('class').addClass(buttonId);
        $('body').addClass('modal-active');
        $('body').removeClass('bodyoverlay');

      } else {
        swal({
          title: 'Oops Something Error!',
          type: 'error',
          showConfirmButton: false,
          timer: 1500
        });
        // this.otploader = false;
        $('body').removeClass('bodyoverlay');
      }
    },
      (err) => {

      });
  }

  otpvalidate() {
    var otplength = 4;
    if ($('#otp').val() == '') {
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
    this.loader = true;

    var param = this.user;
    $('body').addClass('bodyoverlay');
    this.Service.otpvalidcheck(param).subscribe((success) => {
      var status = success['status'];
      if (status == 'True') {
        this.loader = false;

        this.otpUserLoginNewAPI();
        // this.addenquiry();
        // this.otploader = false;
        // this.cancel.nativeElement.click();
        $('body').removeClass('modal-open');
        $('body').removeClass('bodyoverlay');
        $('#nameNumberModal').removeClass('modal fade');
        $('body').removeClass('modal-active');
        document.getElementById('nameNumberModal').style.display = 'none';
        // this.notLogedIn = false;
        swal({
          title: 'OTP Verified',
          text: 'We Will Intimate you soon!',
          type: 'success',
          showConfirmButton: false,
          timer: 2500
        });
        $('#modal-container').addClass('out');
        $('body').removeClass('modal-active');
        $('.modal-backdrop').removeClass('modal-backdrop fade show');
        $('body').removeClass('bodyoverlay');
        $('.modal-active').removeClass('modal-active');
        document.getElementById('nameNumberModal').style.display = 'none';
        $('#btn_reset').click();
        this.countdown.restart();

      } else {
        // this.otploader = false;
        $('body').removeClass('bodyoverlay');
        swal({
          title: 'Oops Something Error!',
          text: 'Its Not a valid OTP / OTP Expired!',
          type: 'error',
          showConfirmButton: false,
          timer: 1500
        });
        this.loader = false;

      }
    }, (err) => {

    });
  }

  otpUserLoginNewAPI() {

    var param1 = {
      number: this.user.number
    }
    this.Service.userLoginWithOtpNewAPIBlog(param1).subscribe(responce => {
      if (responce['status'] === 'True') {
        // this.Local_Storage.setItem('loginID', '1');
        swal({
          title: 'Validated successfully',
          text: '',
          type: 'success',
          showConfirmButton: false,
          timer: 1500
        });
        this.userDetails = responce['BloggerDetails'];
        localStorage.setItem('bloggerId', this.userDetails[0]['bloggerId']);
        var bloggerName = this.userDetails[0]['blogger_name'].toLowerCase().replace(/\s+/g, '-');
        var bloggerId = this.userDetails[0]['bloggerId'];
        this.bloggertype = this.userDetails[0]['bloggerType'];
        this.router.navigate(['/userblogs/profile/' + bloggerName + '-' + this.bloggertype + '-' + bloggerId]);

        $('#modal-container').addClass('out');
        //
        // if (this.router.url.indexOf('id=login') > -1) {

        // } else {
        //   this.notLogedIn = false;
        //   this.userLogined = true;
        //   // this.location.back();
        //   this.router.navigate(['/writeblogs/authors/' + bloggerName + '/' + bloggerId])
        // }

        $('body').removeClass('modal');
        $('.modal-backdrop').removeClass('modal-backdrop fade show');
        $('body').removeClass('bodyoverlay');
        $('.modal-active').removeClass('modal-active');
      } else {
      }
    });
  }

  handleEvent(e: CountdownEvent) {
    if (e.action === 'done') {
      this.otpexpired = true;
    }
  }

  goback() {
    $('#modal-container').addClass('out');
    $('body').removeClass('modal-active');
    this.countdownconfig = {
      leftTime: 30,
      demand: true
    };
    this.countdown.begin();
  }

  onOtpChange(otp) {
    var param = this.user;
    param.otp = otp;
  }

  config = {
    allowNumbersOnly: true,
    length: 4,
    isPasswordInput: false,
    disableAutoFocus: true,
    placeholder: '',
    inputStyles: {
      width: '48px',
      height: '48px',
      'border-radius': '8px',
      border: '1px solid rgba(236, 236, 236, 0.40)',
      background: '#F8F8F8',
    },
  };

  countdownconfig = {
    leftTime: 30,
    demand: true
  };

  openValidationFrm() {

    var bloggerId = localStorage.getItem('bloggerId');
    if (bloggerId == undefined || null) {
      // this.notLogedIn = true;
      // this.userLogined = false;
      this.loginDropDownOpen = true;
      this.router.navigate(['writeblogs/authors/guest-blogger/1'])
    } else {
      var param3 = {
        bloggerId: bloggerId,
      }
      this.Service.getAuthorDetails(param3).subscribe(response => {
        this.authdetails1 = response['blogtype'].BloggerProfile;
        var bloggername = this.authdetails1[0].name;

        this.loginDropDownOpen = false;
        this.profileDropDownOpen = true;
        this.router.navigate(['writeblogs/authors/' + bloggername.replace(/\s+/g, '-').toLowerCase() + '/' + bloggerId])
      })
    }
  }
  openValidationFrm1() {
    var bloggerId = localStorage.getItem('bloggerId');
    if (bloggerId == undefined || null) {
      this.notLogedIn = true;
      this.userLogined = false;
      this.loginDropDownOpen = true;
      this.router.navigate(['insights/authors/login'])
      // , {
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
        this.authdetails1 = response['blogtype'].BloggerProfile;
        var bloggername = this.authdetails1[0].name;
        var bloggertype = this.authdetails1[0].bloggerType;

        this.loginDropDownOpen = false;
        this.profileDropDownOpen = true;
        this.router.navigate(['/userblogs/profile/' + bloggername.replace(/\s+/g, '-').toLowerCase() + '-' + bloggertype + '-' + bloggerId]);
      })
    }
  }

  onCoverSelectFile(event) {
    if (event.target.files[0].size > 500000) {
      swal({
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
      this.uploadFile();
    }
  }

  onCoverSelectFile1(event) {
    if (event.target.files[0].size > 500000) {
      swal({
        icon: 'error',
        title: 'Image Size is too big.',
        text: 'Image Size should be less than 500kb.',
        showConfirmButton: true,
      });
    }
    else {
      if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();
        reader.onload = (event: any) => {
          this.CoverImage1 = [];
          this.CoverImage1.push(event.target.result);

        };
        reader.readAsDataURL(event.target.files[0]);
      }
      if (event.target.files.length > 0) {
        const file = event.target.files[0];
        this.registrationForm1.get('cover1').setValue(file);
        this.profileCoverImgUrls = [];
        $('#coverimagehide').css('display', 'none');
      }
      this.uploadFile1();
    }
  }

  onBlogCoverSelectFile1(event) {
    if (event.target.files[0].size > 500000) {
      swal({
        icon: 'error',
        title: 'Image Size is too big.',
        text: 'Image Size should be less than 500kb.',
        showConfirmButton: true,
      });
      this.fileInput.nativeElement.value = '';

    }
    else {
      if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();
        reader.onload = (event: any) => {
          this.CoverImage2 = [];
          this.CoverImage2.push(event.target.result);


        };
        reader.readAsDataURL(event.target.files[0]);
      }
      if (event.target.files.length > 0) {
        const file = event.target.files[0];
        this.registrationForm2.get('cover2').setValue(file);
        this.blogCoverImgUrls2 = ''
        $('#publishBtnId').removeAttr('disabled');
        $("#publishBtnId").removeClass("publishButton1")
        $("#publishBtnId").addClass("publishButtonActive")
      }
      this.notUploaded = false;
    }
  }

  uploadFile() {
    // this.changesMade = true;
    const formData = new FormData();
    formData.append('profile', this.registrationForm.get('cover').value);
    formData.append('bloggerId', this.bloggerId);
    this.Service.updatProfileImage(formData).subscribe(responce => {
      this.uploadResponse = responce;

    }, (err) => {

    });
  }

  uploadFile1() {
    // this.changesMade = true;
    const formData = new FormData();
    formData.append('coverimg', this.registrationForm1.get('cover1').value);
    formData.append('bloggerId', this.bloggerId);
    this.Service.updatProfileImage1(formData).subscribe(responce => {
      this.uploadResponse1 = responce;

    }, (err) => {

    });
  }

  forWordCount() {

    this.textareaValue = localStorage.getItem('blog-autosave-draft');
    var myElement = document.querySelector('.tox-statusbar__wordcount');
    var htmlText = myElement.textContent;

    const myString: string = htmlText;
    const regex: RegExp = /\d+/;
    const matchArray: RegExpMatchArray | null = myString.match(regex);
    if (this.textareaValue == null) {
      swal({
        title: 'Please write content and Proceed',
        type: 'warning',
        showConfirmButton: false,
        timer: 1500
      });
    } else {
      if (matchArray && parseInt(matchArray[0], 10) >= 300) {
        this.txtAreaLngth = true;
      } else {
        swal({
          title: 'Minimum 300 Words are Required',
          type: 'warning',
          showConfirmButton: false,
          timer: 1500
        });
        this.txtAreaLngth = false;

      }
    }
  }






  catSelected(blogCatName, blogCategoryId,) {
    $(".categoryBox").addClass("categoryBox1")

    var blogCatNames = blogCatName;

    this.blogCategoryId = blogCategoryId;

    this.router.navigate(['/insights/authors/' + blogCatNames.toLowerCase().replace(/\s+/g, '-') + '/' + this.blogger_name + '-' + blogCategoryId + '-' + this.BlogtypeId + '-' + this.bloggerId])


  }

  allCategory() {

    this.router.navigate(['/insights/authors/' + this.blogger_name + '-' + this.BlogtypeId + '-' + this.bloggerId])

  }

  trueClear = false;
  nonTrueClear = false;
  cardDropDown = false;
  openBlogDropDown() {
    // this.cardDropDown = true;
    this.cardDropDown = this.cardDropDown ? false : true;
    if (this.cardDropDown == true) {
      $('.fa-angle-down').css('display', 'none');
      $('.fa-angle-up').css('display', 'block');
    } else {
      $('.fa-angle-up').css('display', 'none');
      $('.fa-angle-down').css('display', 'block');
    }

  }
  p: number = 1;
  scrollTop() {
    this.window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  selectImage(mediaId, mediaName) {
    this.linkName = mediaName
    // localStorage.setItem('mediaIcon', mediaId);
    this.iconId = mediaId
    this.loader = true;

    var param3 = {
      bloggerId: this.bloggerId,
      iconId: mediaId,
    }
    this.Service.getbloggerMediaLinks(param3).subscribe((allCategoryList: any[]) => {
      var idUrl = allCategoryList['link'][0];
      this.loader = false;


      if (idUrl == undefined) {
        this.inputValues = [];

      } else {

        this.inputValues = idUrl.mediaLink;
        if (this.inputValues != '') {
          this.trueClear = true;
          this.nonTrueClear = false;
        } else {
          this.trueClear = false;
          this.nonTrueClear = true;
        }
      }
    });

    this.openInputLink = true;
  }

  clearNumInput2() {
    if (this.inputValues !== '') {
      this.inputValues = ''
    }
  }

  clearNumInput1() {
    if (this.inputValues !== '') {
      this.inputValues = ''
      var param = {
        bloggerId: this.bloggerId,
        mediaId: this.iconId,
        mediaLink: ''
      }

      this.Service.updatebloggermedia(param).subscribe((allCategoryList: any[]) => {
        var status = allCategoryList['status'];
        if (status == "True") {
          this.socialMediaFunction();
        }
      });
      swal({
        title: 'Link Removed Successfully',
        type: 'success',
        showConfirmButton: false,
        timer: 1500
      });
    } else {
      swal({
        title: 'No Link to Remove',
        type: 'warning',
        showConfirmButton: false,
        timer: 1500
      });
    }
  }

  linkName = ''

  addValue() {
    this.loader = true;
    var param = {
      bloggerId: this.bloggerId,
      mediaId: this.iconId,
      mediaLink: this.inputValues
    }

    if (this.iconId == '1') {
      if (this.inputValues.indexOf('https://www.facebook.com') > -1) {
        this.Service.updatebloggermedia(param).subscribe((allCategoryList: any[]) => {
          var status = allCategoryList['status'];
          if (status == "True") {
            this.socialMediaFunction();
            this.openInputLink = false;
          }
        });
        swal({
          title: 'Facebook Link Added Successfully',
          type: 'success',
          showConfirmButton: false,
          timer: 1500
        });
      } else {
        swal({
          title: 'Please Give Valid Facebook Link',
          type: 'warning',
          showConfirmButton: false,
          timer: 2500
        });
      }

    }
    if (this.iconId == '2') {
      if (this.inputValues.indexOf('https://www.linkedin.com/') > -1) {
        this.Service.updatebloggermedia(param).subscribe((allCategoryList: any[]) => {
          var status = allCategoryList['status'];
          if (status == "True") {
            this.socialMediaFunction();
            this.openInputLink = false;
          }
        });
        swal({
          title: 'Linkedin Link Added Successfully',
          type: 'success',
          showConfirmButton: false,
          timer: 1500
        });
      } else {
        swal({
          title: 'Please Give Valid Linkedin Link',
          type: 'warning',
          showConfirmButton: false,
          timer: 2500
        });
      }
    }
    if (this.iconId == '3') {
      if (this.inputValues.indexOf('https://www.twitter.com/') > -1) {
        this.Service.updatebloggermedia(param).subscribe((allCategoryList: any[]) => {
          var status = allCategoryList['status'];
          if (status == "True") {
            this.socialMediaFunction();
            this.openInputLink = false;
          }
        });
        swal({
          title: 'Twitter Link Added Successfully',
          type: 'success',
          showConfirmButton: false,
          timer: 1500
        });
      } else {
        swal({
          title: 'Please Give Valid Twitter Link',
          type: 'warning',
          showConfirmButton: false,
          timer: 2500
        });
      }
    }
    if (this.iconId == '4') {
      if (this.inputValues.indexOf('https://www.medium.com/') > -1) {
        this.Service.updatebloggermedia(param).subscribe((allCategoryList: any[]) => {
          var status = allCategoryList['status'];
          if (status == "True") {
            this.socialMediaFunction();
            this.openInputLink = false;
          }
        });
        swal({
          title: 'Medium Link Added Successfully',
          type: 'success',
          showConfirmButton: false,
          timer: 1500
        });
      } else {
        swal({
          title: 'Please Give Valid Medium Link',
          type: 'warning',
          showConfirmButton: false,
          timer: 2500
        });
      }
    }



    // this.openInputLink = false;
    this.loader = false;
  }



  openViewBlog(data) {
    var bloggerId = localStorage.getItem('bloggerId');

    this.userLogined = false;
    this.blogViewSection = true;
    this.blogId = data;

    this.router.navigate(['userblogs/manage/' + this.blogger_name + '/' + data + '-' + bloggerId])
  }

  viewBack() {
    this.blogViewSection = false;
    // this.blogPendingSection = true;
    this.userLogined = true;

  }

  viewEditBlog(content) {
    localStorage.setItem('blog-autosave-draft', content);
    // var bloggerId = localStorage.getItem('bloggerId');
    this.router.navigate(['/userblogs/editblog/' + this.blogger_name_1 + '/' + this.blogId + '-' + this.bloggerId])
    this.loader = true;

    this.Service.get_tinyMCE().subscribe(responce => {
      if (responce['status'] === 'True') {
        var get_tinyMCE = responce['tinymce'][0].tinyMCE_API;
        this.tinyMceApi = get_tinyMCE;




        let node: any = document.createElement('script');
        node.src = 'https://cdn.tiny.cloud/1/' + this.tinyMceApi + '/tinymce/6/tinymce.min.js';
        node.type = 'text/javascript';
        node.charset = 'utf-8';
        document.getElementsByTagName('head')[0].appendChild(node);
        node.onload = () => {
          let node2: any = document.createElement('script');
          node2.src = 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_mobile_2/tinymce.js';
          node2.type = 'text/javascript';
          node2.charset = 'utf-8';
          document.getElementsByTagName('head')[0].appendChild(node2);
        }
      }
    });
    this.loader = false;

    this.blogViewSection = false;

    this.editViewBlog = true;


  }
  saveBlogDraft() {
    this.lStoreTextAreaContent = localStorage.getItem("blog-autosave-draft");
    var myElement = document.querySelector('.tox-statusbar__wordcount');
    var htmlText = myElement.textContent;

    const myString: string = htmlText;
    const regex: RegExp = /\d+/;
    const matchArray: RegExpMatchArray | null = myString.match(regex);

    if (this.lStoreTextAreaContent == null) {
      swal({
        title: 'Minimum 20 Words are Required',
        type: 'warning',
        showConfirmButton: false,
        timer: 1500
      });
    } else {
      if (matchArray && parseInt(matchArray[0], 10) >= 20) {
        var param1 = {
          bloggerId: this.bloggerId,
          topic: this.topicId,
          category: this.categoryId,
          content: this.lStoreTextAreaContent,
          draft: '3'
        };

        this.Service.setBlogText(param1).subscribe(lists => {
          var status = lists['status'];
          if (status == 'True' && this.CoverImage2.length > 0) {
            this.uploadFile2();
            $(".modal-backdrop").removeClass("modal-backdrop fade show");
            $('body').removeClass('modal-open');
          }
          else if (status == 'True') {

            $(".modal-backdrop").removeClass("modal-backdrop fade show");
            $('body').removeClass('modal-open');

            // Set query parameter
            const navigationExtrasDraft: NavigationExtras = {
              queryParams: { tab: 'draft' }
            };

            // Construct the URL
            const url = '/userblogs/profile/' + this.blogger_name + '-' + this.bloggertype + '-' + this.bloggerId;

            this.router.navigate([url], navigationExtrasDraft);
          } else {
          }
        })
        localStorage.removeItem('blog-autosave-draft');
        localStorage.removeItem('blog-autosave-time');
        tinymce.remove();
        tinymce.init({
          autosave: false,
        });
        swal({
          title: 'Saved as Draft',
          // text: 'We Will Intimate you soon!',
          type: 'success',
          showConfirmButton: false,
          timer: 1500
        });

      } else {
        swal({
          title: 'Minimum 20 Words are Required',
          type: 'warning',
          showConfirmButton: false,
          timer: 1500
        });
      }

    }

  }

  rePostBlog() {
    this.lStoreTextAreaContent = localStorage.getItem("blog-autosave-draft");
    var param1 = {
      bloggerId: this.bloggerId,
      topic: this.topicId,
      category: this.categoryId,
      content: this.lStoreTextAreaContent,
      draft: '4'
    };

    this.Service.setBlogText(param1).subscribe(lists => {
      var State = lists['blogtopic'];
      var status = lists['status'];
      this.blogId = lists['blogId'];
      if (status == 'True') {
        this.uploadFile2();
      }
    })

    swal({
      title: 'Blog Post Requested',
      text: 'We Will Intimate you soon as your blog is approved and published!',
      type: 'success',
      showConfirmButton: false,
      timer: 1500
    });

    localStorage.removeItem('blog-autosave-draft');
    tinymce.remove();
    tinymce.init({
      autosave: false,
    });
    // localStorage.removeItem('catId');
    // localStorage.removeItem('topicId');
    // this.router.navigate(['/userblogs/profile/' + this.blogger_name + '-1-' + this.bloggerId])

  }

  rePostBlog1() {
    this.lStoreTextAreaContent = localStorage.getItem("blog-autosave-draft");
    var myElement = document.querySelector('.tox-statusbar__wordcount');
    var htmlText = myElement.textContent;

    const myString: string = htmlText;
    const regex: RegExp = /\d+/;
    const matchArray: RegExpMatchArray | null = myString.match(regex);

    if (matchArray && parseInt(matchArray[0], 10) >= 300) {
      var param1 = {
        bloggerId: this.bloggerId,
        topic: this.topicId,
        category: this.categoryId,
        content: this.lStoreTextAreaContent,
        draft: '4'
      };

      this.Service.setBlogText(param1).subscribe(lists => {
        this.blogId = lists['blogId'];
      })

      swal({
        title: 'Blog Post Requested',
        text: 'We Will Intimate you soon as your blog is approved and published!',
        type: 'success',
        showConfirmButton: false,
        timer: 1500
      });
      localStorage.removeItem('blog-autosave-draft');
      tinymce.remove();
      tinymce.init({
        autosave: false,
      });
      this.router.navigate(['/userblogs/profile/' + this.blogger_name + '-' + this.bloggertype + '-' + this.bloggerId])
    } else {
      swal({
        title: 'Minimum 300 Words are Required',
        // text: 'We Will Intimate you soon!',
        type: 'warning',
        showConfirmButton: false,
        timer: 1500
      });

    }
  }

  uploadFile2() {
    // this.changesMade = true;
    const formData = new FormData();
    formData.append('blogcoverimg', this.registrationForm2.get('cover2').value);
    formData.append('bloggerId', this.bloggerId);
    formData.append('blogId', this.blogId)
    this.Service.updateBlogCoverImg(formData).subscribe(responce => {
      this.uploadResponse2 = responce;

      if (responce['status'] == 'True') {

        const navigationExtrasPending: NavigationExtras = {
          queryParams: { tab: 'pending' }
        };
        // this.router.navigate(['/userblogs/profile/' + this.blogger_name + '-'+this.bloggertype+'-' + this.bloggerId])
        const url = '/userblogs/profile/' + this.blogger_name + '-' + this.bloggertype + '-' + this.bloggerId;

        this.router.navigate([url], navigationExtrasPending);
      } else {
        swal({
          title: 'Error ! Try Re-Submiting',
          // text: 'We Will Intimate you soon!',
          type: 'warning',
          showConfirmButton: false,
          timer: 1500
        });
      }
    }, (err) => {

    });
  }

  onSubmit() {
    this.loader = true;
    var enameFilter = /^([a-zA-Z]+\s)*[a-zA-Z]+$/;
    if (enameFilter.test($('#priofileNameinputId').val())) {
      var paramAuthData = {
        bloggerId: this.bloggerId,
        bloggerName: this.bioForm.value.authName,
        bloggerPlace: this.bioForm.value.locationAuth,
        bloggerBio: this.bioForm.value.textAreaBio,
        desgination: this.bioForm.value.authDesignation,
        talksabout: this.bioForm.value.talksAbout,
      }
      this.Service.postAuthorDetails(paramAuthData).subscribe(response => {
        var status = response['status'];
        if (status == "True") {
          this.loader = false;
          swal({
            title: 'success',
            text: 'Profile Updated Successfully',
            type: 'success',
            showConfirmButton: false,
            timer: 2500
          });
          var param3 = {
            bloggerId: this.bloggerId,
          }
          this.Service.getAuthorDetails(param3).subscribe(response => {
            this.authdetails1 = response['blogtype'].BloggerProfile;
            this.blogger_name_html = this.authdetails1[0].name;
            this.date = this.authdetails1[0].date;
            this.designation = this.authdetails1[0].desginaion;
            this.authLocation = this.authdetails1[0].place;
          })

          $('#profileSubmitBtn').attr('disabled', true);
          $("#profileSubmitBtn").removeClass("bioSubmitActive")
          $("#profileSubmitBtn").addClass("bioSubmit")

        } else {

        }

      })
    } else {
      swal({
        title: 'Enter Valid Name!',
        type: 'error',
        showConfirmButton: false,
        timer: 1500
      });
    }


  }

  clearNumInput() {
    this.user.number = ''
  }


  // myFunction() {
  //   document.getElementById("myDropdown").classList.toggle("show");
  // }

  onLogOut() {
    localStorage.removeItem("bloggerId");
    this.router.navigate([], {
      queryParams: {
        id: "",
      },
      queryParamsHandling: 'merge',
    });
    this.router.navigate(['/blogs'])
  }

  onprofileInputChange() {
    $("#profileSubmitBtn").removeAttr("disabled")
    $("#profileSubmitBtn").addClass("bioSubmitActive")
  }

  cancelBioEdit() {
    $('#profileSubmitBtn').attr('disabled', true);
    $("#profileSubmitBtn").removeClass("bioSubmitActive");
    this.talkAbtInputValue = this.authdetails1[0].talksabout;
    this.locationInputValue = this.authdetails1[0].place;
    this.authBioInputValue = this.authdetails1[0].bio;
    this.authNameInputValue = this.authdetails1[0].name;
    this.authDesignationInputValue = this.authdetails1[0].desginaion;
    this.openInputLink = false;
  }



  blogTopicSelectWrite(categoryName, topicName, categoryId, topicId) {
    this.router.navigate(['writeblogs/editor/' + this.blogger_name + '/' + categoryName.toLowerCase().replace(/\s+/g, '-') + '/' + topicName.toLowerCase().replace(/\s+/g, '-') + '/' + this.bloggerId + '/' + categoryId + '/' + topicId])
    localStorage.removeItem('blog-autosave-draft');
    localStorage.removeItem('blog-autosave-time');
  }


  loadMore() {
    // this.showLoader = true;
    // this.categoryId = this.Local_Storage.getItem('blogCategoryId')
    this.routeSub = this.activeroute.params.subscribe(params => {

      String.prototype.toLocaleUpperCase = function () {
        return this.replace(/\w\S*/g, function (txt) {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
      };
      var loopcount = 0;
      for (loopcount = 0; loopcount <= 5; loopcount++) {
        let totalcount = this.projectcount;
        const limit = UserBlogsComponent.blogsCount += 1;
        let limitprprtyrows = 2;


     

        var param = {
          bloggerId: this.bloggerId,
          bloggerType: this.BlogtypeId,
          limit: limit,
          limitrows: limitprprtyrows,
          catId: this.blogCategoryId
        }
        let livecount = this.blogDetails.length;


        if (livecount < totalcount) {
          this.showLoader = true;

          this.Service.getpublicBlogList(param).subscribe(response => {
            var status = response['status'];
            if (status == "False") {
              this.showLoader = false;
              this.zeroprojects = true;
            } else {
              this.blogDetails = this.blogDetails.concat(response['blogtopic']);
            }
          });
        } else {
          this.showLoader = false;
          this.zeroprojects = true;
        }
      }
    });
  }
}
