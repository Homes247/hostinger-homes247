import { Component, ElementRef, HostListener, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LOCAL_STORAGE, WINDOW } from '@ng-toolkit/universal';
import { CityService } from '../city.service';
import { DataService } from '../data.service';
import { DataService2 } from '../data.service2';
import { enquiry } from '../prop-details-new/class';
import { Title, Meta } from '@angular/platform-browser';
import { CountdownComponent, CountdownEvent } from 'ngx-countdown';
declare var $: any;
declare var swal: any;

declare var $: any;
@Component({
  selector: 'app-expert-details',
  templateUrl: './expert-details.component.html',
  styleUrls: ['./expert-details.component.css']
})
export class ExpertDetailsComponent implements OnInit {
  @ViewChild('cancel') cancel: ElementRef;
  @ViewChild('cd1', { static: false }) private countdown: CountdownComponent;

  imageUrl: any = 'usericon.jpg';
  ProfileImage = this.Service.ExpertImage

  RegistrationForm: FormGroup;
  user = new enquiry();
  allExpertsData: any;
  imageUrls: any;
  dataloader: boolean = false;

  reviewbutton: any;
  loginbutton: any;
  openModal = false;
  otpexpired = false;
  ratingValue = '';
  userDetails = [];
  reviewDetails1: any;
  reviews: any;
  ratingreviews = true;
  totaluserratings: any;
  reviwcount: any;
  averagerating: any;
  numbernan = false;
  fivestarcounts: any;
  fourstarcounts: any;
  threestarcounts: any;
  twostarcounts: any;
  onestarcounts: any;
  FiveStarCountHtml: any;
  FourStarCountHtml: any;
  threeStarCountHtml: any;
  TwoStarCountHtml: any;
  OneStarCountHtml: any;
  expertId: any;

  expertData: any;
  expertName: any;
  contactNumber: any;
  expertDescription: any;
  expertExperience: any;
  expertIn: any;
  expIn: any;
  expertReviews: any;
  contactNumber1: any;
  currentDesignation: any;
  workingIn: any;
  expEmail: any;
  FooterComponent: any;
  Visiblebrochure = false;
  otpValidationComponent: any;
  loadComponent = false;

  constructor(private titleService: Title, private meta: Meta,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public Service: DataService,
    public Service2: DataService2,
    public formBuilder: FormBuilder,
    @Inject(LOCAL_STORAGE) private Local_Storage: any,
    @Inject(WINDOW) private window: Window,
    public cityservice: CityService,
  ) {

    this.Service.mouseenterlistenOtp().subscribe((m: any) => {
      if (this.window.location.hash === '#expertreviews') {
        this.OnCommentUpdate()
      }
    })

  }

  ngOnInit(): void {
    this.dataloads();
    import('../footer/footer.module').then(mod => mod.FooterModule).then(FooterModule => {
      this.FooterComponent = FooterModule.components['lazy'];
      // this.loaded = true;
    });
    this.RegistrationForm = new FormGroup({
      newUserName: new FormControl(''),
      newUserNumber: new FormControl(''),
      // answerData: new FormControl(''),
    });

    // const inputs = ["input1", "input2", "input3", "input4"];
    // inputs.map((id) => {
    //   const input = document.getElementById(id);
    //   addListener(input);
    // });
    // function addListener(input) {
    //   input.addEventListener("keyup", () => {
    //     const code = parseInt(input.value);
    //     if (code >= 0 && code <= 9) {
    //       const n = input.nextElementSibling;
    //       if (n) n.focus();
    //     } else {
    //       input.value = "";
    //     }
    //     const key = input.key; // const {key} = event; ES6+
    //     if (key === "Backspace" || key === "Delete") {
    //       const prev = input.previousElementSibling;
    //       if (prev) prev.focus();
    //     }
    //   });
    // }

    const inputs = ["input1", "input2", "input3", "input4"];

    inputs.map((id) => {
      const input = document.getElementById(id);

      // 👇 FIX: prevents null.addEventListener
      if (input) {
        addListener(input);
      }
    });

    function addListener(input) {
      input.addEventListener("keyup", (event) => {

        const code = parseInt(input.value);

        if (code >= 0 && code <= 9) {
          const n = input.nextElementSibling;
          if (n) n.focus();
        } else {
          input.value = "";
        }
        const key = event.key;

        if (key === "Backspace" || key === "Delete") {
          const prev = input.previousElementSibling;
          if (prev) prev.focus();
        }
      });
    }
    // this.bookSlot();
  }

  dataloads() {
    this.expertId = this.router.url.split('-').pop().match(/[0-9]+/);

    this.Service.getExpertDetails(this.expertId).subscribe(data => {
      this.expertReviews = data['experts_review'];
      this.reviews = this.expertReviews
      this.reviwcount = this.reviews.length;
      if (!this.reviews.length) {
        this.ratingreviews = false;
      } else {
        this.ratingreviews = true;
      }
      const fivestar = '5';
      const fivestarcount = this.reviews.filter((obj) => obj.Rating === fivestar).length;
      this.fivestarcounts = fivestarcount / this.reviwcount * 100;
      this.FiveStarCountHtml = fivestarcount;

      const fourstar = '4';
      const fourstarcount = this.reviews.filter((obj) => obj.Rating === fourstar).length;
      this.fourstarcounts = fourstarcount / this.reviwcount * 100
      this.FourStarCountHtml = fourstarcount;

      const thirdstar = '3';
      const threestarcount = this.reviews.filter((obj) => obj.Rating === thirdstar).length;
      this.threestarcounts = threestarcount / this.reviwcount * 100;
      this.threeStarCountHtml = threestarcount;

      const twostar = '2';
      const twostarcount = this.reviews.filter((obj) => obj.Rating === twostar).length;
      this.twostarcounts = twostarcount / this.reviwcount * 100;
      this.TwoStarCountHtml = twostarcount;

      const onestar = '1';
      const onestarcount = this.reviews.filter((obj) => obj.Rating === onestar).length;
      this.onestarcounts = onestarcount / this.reviwcount * 100;
      this.OneStarCountHtml = onestarcount;

      const totalratings = fivestarcount + fourstarcount + threestarcount + twostarcount + onestarcount;
      this.totaluserratings = totalratings;
      this.averagerating = (Math.round(5 * fivestarcount + 4 * fourstarcount + 3 * threestarcount + 2 * twostarcount + 1 * onestarcount) / totalratings).toFixed(1);
      if (isNaN(parseFloat(this.averagerating))) {
        this.numbernan = true;
        this.averagerating = '0';
        this.totaluserratings = '0';
      }
      this.expertData = data['experts_details'];
      this.expertName = this.expertData[0]['Name']
      this.contactNumber1 = this.expertData[0]['ContactNo'];

      this.expertExperience = this.expertData[0]['Experience'];
      this.currentDesignation = this.expertData[0]['Designation'];
      this.workingIn = this.expertData[0]['WorkingIn'];
      this.expertDescription = this.expertData[0]['Description'];
      this.expIn = this.expertData[0]['ExpertIn'];
      const email = this.expertData[0]['Email'];
      this.expEmail = email.replace(/(\w{3})[\w.-]+@([\w.]+\w)/, "$1***@$2")

      this.imageUrls = this.expertData[0]['profileImg'];

      var stringSplit = this.expIn.split(' ');
      var titleExpIn = stringSplit[0]
      this.expertIn = this.expIn.toLowerCase().replace(/\s+/g, '-');

      var string = this.contactNumber1;
      var replaced = string.slice(0, 3) + string.slice(2).replace(/.(?=...)/g, '*');
      this.contactNumber = replaced

      if (this.router.url.indexOf('expertservices/' + this.expertIn + '-services/' + this.expertIn + '-details-' + this.expertId) > -1) {
        this.titleService.setTitle(this.expertName + ' ' + this.expIn + ' Services - Homes247.in - More Info');
        this.meta.updateTag({
          name: 'description',
          content: 'Our Expert ' + this.expIn + ' Services  just as your vision. Contact now for further information '
        });
        this.Service.createLinkForCanonicalURL();
      }
    })

  }
  @HostListener('window:scroll', ['$event'])
  @HostListener('touchstart', ['$event'])
  onWindowScroll() {
    this.Service.mouseenterservice3();

  }

  bookSlot() {
    var x = document.getElementById("showBookSlot");
    if (x.style.display === "none" || x.style.display === "") {
      x.style.display = "block";
    }
  };
  closeBookSlot() {
    var x = document.getElementById("showBookSlot");
    if (x.style.display === "block" || x.style.display === "") {
      x.style.display = "none";
    }
  };


  formData = {
    name: '',
    number: null,
    dateTime: ''
  };

  onFormSubmit() {
    var userID = this.Local_Storage.getItem("userID");


    if ($('#name').val() == '') {
      $('#name').focus().css('border-color', 'red').attr('placeholder', 'Please Enter Name');
      return false;

    } else {
      var enameFilter = /^([a-zA-Z]+\s)*[a-zA-Z]+$/;
      if (enameFilter.test($('#name').val())) {
        $('#name').removeAttr('style');
      } else {
        $('#name').focus().css('border-color', 'red').attr('placeholder', 'Please enter valid name').val('');
        return false;
      }

    }
    if ($('#number').val() == '') {
      $('#number').focus().css('border-color', 'red').attr('placeholder', 'Please Enter Phone Number');
      return false;
    } else {
      var mobilee1 = /^[0-9]{10}$/;
      if (mobilee1.test($('#number').val())) {
        $('#number').removeAttr('style');
      } else {
        $('#number').focus().css('border-color', 'red').attr('placeholder', 'Please enter valid contact number').val('');
        return false;
      }
    }
    this.dataloader = true;

    if (this.formData.dateTime.length !== 0) {
      var param = {
        name: this.formData.name,
        number: this.formData.number,
        expertId: this.expertId,
        slottime: this.formData.dateTime,
        userId: "1"
      };
      this.Service.bookSlot(param).subscribe(success => {
        this.dataloader = false;

        $('body').removeClass('modal-open');
        $('body').removeAttr('style');
        if (success['status'] === 'True') {
          swal({
            title: 'Slot Booked Successfully',
            text: 'Soon you will get a Call from Homes 247 Representatives.',
            type: 'success',
            showConfirmButton: false,
            timer: 1500
          });
        }
      });
      var toCloseModal = document.getElementById('showBookSlot')
      toCloseModal.style.display = 'none'
      $('.modal-backdrop').removeClass('modal-backdrop');
      // You can perform any further processing with the form data here
    } else {
      swal({
        title: 'Please fill the Valid Details',
        text: 'Some inputs are vacant',
        type: 'error',
        showConfirmButton: false,
        timer: 1500
      });
    }
  }

  readmore() {
    $('.expert-about1').css('height', '330px');
    $('.about_us_banner label').css('top', '20%');
    $('p.expert-about1').css('overflow-y', 'scroll');
    $('p.expert-about1').css('font-weight', '600');
    $('p.expert-about1').css('opacity', '0.6');
    $('.down_arrow').css('display', 'none');
    $('.up_arrow').css('display', 'block');
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
        containerEl.scrollTop =
          containerEl.scrollHeight - containerEl.offsetHeight;
      } else if (target === 'top') {
        containerEl.scrollTop = 0;
      }
    };
    var scrollableDiv = document.getElementById('scrollable');
    scrollToTarget('top', scrollableDiv);
    $('.expert-about1').css('height', '50px');
    $('.about_us_banner label').css('top', '40%');
    $('.about_us_banner label.descrip').css('top', '28%');
    $('p.expert-about1').css('overflow-y', 'hidden');
    $('.down_arrow').css('display', 'block');
    $('.up_arrow').css('display', 'none');
  }


  loader() {
    var x = document.getElementById("showloader");
    if (x.style.display === "none" || x.style.display === "") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  };
  // seeMore() {
  //   var x = document.getElementById("moreView");
  //   if (x.style.display === "none" || x.style.display === "") {
  //     x.style.display = "block";
  //   } else {
  //     x.style.display = "none";
  //   }
  // };

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

  OnCommentUpdate() {
    this.ratingValue = $('#ratingSection input:radio:checked').val();
    // 
    var userID = this.Local_Storage.getItem('userID');


    if (userID === null) {
      window.location.hash = 'expertreviews';
      $('#otpValidate').css('display', 'block')
      if (this.loadComponent == false) {
        this.loadComponent = true;
        import('../otp-validation/otp-validation.module').then(mod => mod.OtpValidationModule).then(OtpValidationModule => {
          this.otpValidationComponent = OtpValidationModule.components['lazy'];
          this.Visiblebrochure = this.Visiblebrochure ? false : true;
          $('.modal-login').css('z-index', '1')
        });
      }




    } else if (this.reviewDetails1 === undefined || this.ratingValue === undefined || this.reviewDetails1 === '') {
      swal({
        title: 'Rating and review should not be blank',
        type: 'error',
        showConfirmButton: false,
        timer: 1500
      });
      // this.reviewDetails1 = '';
      // this.ratingValue = '';
    }

    else {
      // this.openModal = false;
      var param = {
        expert_id: this.expertId,
        user_id: userID,
        user_rating: this.ratingValue,
        user_feedback: this.reviewDetails1
      };
      this.Service.addFeedback(param).subscribe(success => {
        if (success['status'] === 'True') {
          // document.getElementById('reviewModel').style.display = 'none';
          this.reviewDetails1 = '';
          this.ratingValue = '';
          swal({
            title: 'Review Successfully Submitted',
            text: 'Your Comment and Review is under Moderation! We will notify you When Comment is Active.',
            type: 'success',
            showConfirmButton: false,
            timer: 1500
          });
        }
      });
    }
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

    const paramNum = {
      number: this.user.number
    }
    // this.otploader = true;
    $('body').addClass('bodyoverlay');
    this.Service.otpsend(paramNum).subscribe((success) => {
      var prestatus = success['messages'][0].status;
      // var status = prestatus[0].MessageErrorDescription;
      if (prestatus == 'ENQUEUED') {
        this.countdown.begin();
        var buttonId = $('#one').attr('id');
        $('#modal-container').removeAttr('class').addClass(buttonId);
        $('body').addClass('modal-active');
        // this.otploader = false;
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
    var param = this.user;
    // this.otploader = true;
    $('body').addClass('bodyoverlay');
    this.Service.otpvalidcheck(param).subscribe((success) => {
      var status = success['status'];
      if (status == 'True') {
        this.otpUserLoginNewAPI();
        // this.addenquiry();
        // this.otploader = false;
        this.cancel.nativeElement.click();
        $('body').removeClass('modal-open');
        $('body').removeClass('bodyoverlay');
        $('#nameNumberModal').removeClass('modal fade');
        $('body').removeClass('modal-active');
        document.getElementById('nameNumberModal').style.display = 'none';
        this.openModal = false;
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
        // this.user.name = '';
        // this.user.number = '';
        // this.user.otp = '';
        // this.user.email = '';
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
      }
    }, (err) => {

    });
  }

  otpUserLoginNewAPI() {
    if (this.user.name === undefined) {
      this.user.name = 'Guest User';
      var param = this.user;
    } else {
      var param = this.user;
    }
    this.Service.userLoginWithOtpNewAPI(param).subscribe(responce => {
      if (responce['status'] === 'True') {
        this.Local_Storage.setItem('loginID', '1');
        // swal({
        //   title: 'Login successfully',
        //   text: '',
        //   type: 'success',
        //   showConfirmButton: false,
        //   timer: 1500
        // });
        this.logincheck();
        this.userDetails = responce['UserDetails'];
        this.Local_Storage.setItem('userID', this.userDetails[0]['reg_IDPK']);

        var userID = this.Local_Storage.getItem('userID');

        this.openModal = false;
        var param = {
          expert_id: this.expertId,
          user_id: userID,
          user_rating: this.ratingValue,
          user_feedback: this.reviewDetails1
        };
        this.Service.addFeedback(param).subscribe(success => {
          if (success['status'] === 'True') {
            this.reviewDetails1 = '';
            this.ratingValue = '';
            $('body').removeClass('modal-open');
            // const myTimeout = setTimeout(swal, 5000);
            swal({
              title: 'Review Successfully Submitted',
              text: 'Your Comment and Review is under Moderation! We will notify you When Comment is Active.',
              type: 'success',
              showConfirmButton: false,
              timer: 2000
            });
            $('.modal-backdrop').removeClass('modal-backdrop fade show');
            $('body').removeClass('bodyoverlay');
            $('.modal-active').removeClass('modal-active');
            document.getElementById('nameNumberModal').style.display = 'none';
            this.openModal = false;
            // document.getElementById('modal-backdrop').style.display = 'none';

          }
        });
        // Store
        // this.Local_Storage.setItem('userName', this.userDetails[0]['user_name']);
        // this.Local_Storage.setItem('userID', this.userDetails[0]['reg_IDPK']);
        // this.Local_Storage.setItem('userEmail', this.userDetails[0]['user_email']);
        // this.Local_Storage.setItem('userNumber', this.userDetails[0]['number']);
        // Retrieve
        // this.UserName = this.Local_Storage.getItem('userName');
        // this.UserId = this.Local_Storage.getItem('userID');
        // this.UserEmail = this.Local_Storage.getItem('userEmail');
        // this.UserNumber = this.Local_Storage.getItem('userNumber');
        // window.location.href = '/expert-details' +'/'+ this.expertId;
      } else {
      }
    });
  }


  handleEvent(e: CountdownEvent) {
    if (e.action === 'done') {
      this.otpexpired = true;
    }
  }

  logincheck() {
    if ('loginID' in this.Local_Storage) {
      // 
      document.getElementById('nameNumberModal').style.display = 'none';
      this.openModal = false;
      $('body').removeClass('modal-backdrop fade show');
      $('body').removeClass('bodyoverlay');
      $('body').removeClass('modal-active');
      this.reviewbutton = true;
      this.loginbutton = false;
    } else {
      this.reviewbutton = false;
      this.loginbutton = true;
    }
  }

  goback() {
    $('#modal-container').addClass('out');
    $('body').removeClass('modal-active');
  }

  onOtpChange(otp) {
    var param = this.user;
    param.otp = otp;
  }
}
