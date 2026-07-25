import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CountdownComponent, CountdownEvent } from 'ngx-countdown';
import { DataService } from '../data.service';
import { User } from '../home/home';
import { Meta, Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ElitedataService } from '../elitedata.service';
import { CommonModule, Location } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgOtpInputModule } from 'ng-otp-input';
import { debounceTime, distinctUntilChanged, Subject, Subscription } from 'rxjs';
import swal from 'sweetalert2';

// declare var swal: any;
declare var $: any;

export interface ContactView {
  contactId: number;
  propertyName: string;
  ownerNameLabel: string;
  formattedPhone: string;
  usedOnLabel: string;
  image: string;
  imageAlt: string;
  searchIndex: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.html',
  styleUrls: ['./profile.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgOtpInputModule,
  ]
})
export class Profile implements OnInit {
  @ViewChild('cd', { static: false }) private countdown: CountdownComponent;
  @ViewChild('cancel') cancel: ElementRef;

  ProfileImage = this.Service.ProfileImage;
  imageUrl: any = 'usericon.jpg';
  registrationForm: FormGroup;

  // ─── View flags ───────────────────────────────────────────────────────────
  mainpageshow = true;
  editprofileshow = false;
  resetpassshow = false;
  myTransactionsShow = false;
  paymentshow = false;
  footerNavShow = true;
  startBrowsingProperties = false;
  rechargeContactShow = false;
  contactedPropertiesShow = false;
  ContactUsageShow = false;
  resetnumbermodal = false;
  otploader = true;
  otpexpired = false;

  // ─── User data ────────────────────────────────────────────────────────────
  user = new User();
  UserId: string;
  userNumber: any;
  username: any;
  usernum: any;
  useremail: any;
  Lname: any;
  imageUrls: any;
  profilePlanCard: any;
  coverImage: string;
  CoverImage = [];
  changesMade = false;
  userEmail: any;
  loginID: any;

  // ─── OTP config ───────────────────────────────────────────────────────────
  config = {
    allowNumbersOnly: true,
    length: 4,
    isPasswordInput: false,
    disableAutoFocus: true,
    placeholder: '',
    inputStyles: { 'width': '50px', 'height': '50px' }
  };
  countdownconfig = { leftTime: 30, demand: true };

  // ─── Plans data ───────────────────────────────────────────────────────────
  userSubscribedPlans: any[] = [];
  buyerTenentPlan: any[] = [];
  ownerSellerPlan: any[] = [];
  selectedPlanDetails: any[] = [];
  rechargeablePlan: any[] = [];
  rechargeablePlanFiltered: any[] = [];
  selectedPlan: any = null;
  rechargeablePlanID: any;
  rechargePlan: any;
  creditPercent = 0;
  validityPercent = 0;
  transactionDetails: any[] = [];

  // ─── Contact history / search ─────────────────────────────────────────────
  contactHistory1: any[] = [];
  allContactViews: ContactView[] = [];
  filteredContactHistory: any[] = [];
  searchText = '';
  planToView: any;
  uploadResponse: any;

  private searchSubject = new Subject<string>();
  private searchSubscription?: Subscription;

  constructor(
    public fb: FormBuilder,
    private Service: DataService,
    private router: Router,
    private titleService: Title,
    private meta: Meta,
    private route: ActivatedRoute,
    private location: Location,
    public eliteService: ElitedataService
  ) { }

  // ─── Lifecycle ────────────────────────────────────────────────────────────

  ngOnInit(): void {
    const savedView = sessionStorage.getItem('activeView');
    if (savedView) {
      this.mainpageshow = false; // ← ADD — no flash
    }
    this.loginID = localStorage.getItem('loginID');
    if (this.loginID != '1') {
      window.location.href = 'https://hostinger.homes247.in/login';
    }

    this.metatags();
    this.coverImage = 'https://img-mr.homes247.in/images/rentals/cover/';

    this.registrationForm = this.fb.group({
      file: [''],
      userName: [''],
      coverImage: [''],
      cover: [''],
      userEmailID: [''],
      userNumber: [''],
      email: [''],
      lastName: [''],
      number: ['']
    });

    this.UserId = localStorage.getItem('userID');
    this.userNumber = localStorage.getItem('userNumber');
    this.checklogin();
    this.updateuserdetails();
    this.relaxDataFilter();

    // Wire up search ONCE here
    this.searchSubscription = this.searchSubject
      .pipe(debounceTime(250), distinctUntilChanged())
      .subscribe((value) => this.applyFilter(value));

    // subscriptionManagement loads plans then restores view — pass true
    this.subscriptionManagement(true);
  }

  ngOnDestroy(): void {
    this.searchSubscription?.unsubscribe();
    this.handledQueryParam = false; // ← add this
    this.apiLoadCount = 0;
  }

  // ─── Meta ─────────────────────────────────────────────────────────────────

  metatags() {
    const PAGEID = '41';
    this.Service.getstaticmeta(PAGEID).subscribe(metatags => {
      this.titleService.setTitle(metatags['Pageseo'][0].page_title);
      this.meta.updateTag({ name: 'description', content: metatags['Pageseo'][0].meta_description });
      this.meta.updateTag({ property: 'og:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_mobile/images/og/about.jpg' });
      this.meta.updateTag({ property: 'og:title', content: metatags['Pageseo'][0].page_title });
      this.meta.updateTag({ property: 'og:description', content: metatags['Pageseo'][0].meta_description });
      this.Service.createLinkForCanonicalURL();
    });
  }

  // ─── Auth / login ─────────────────────────────────────────────────────────

  checklogin() {
    if (this.UserId == null) {
      this.router.navigate(['/login']);
    }
  }

  onLogOut() {
    if (this.router.url.split('?')[0] === '/userauth/profile/' + this.UserId) {
      // this.router.navigate(['/login']);
      localStorage.removeItem('userName');
      localStorage.removeItem('userID');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userNumber');
      localStorage.removeItem('loginID');
      localStorage.removeItem('userLastName');
      window.location.href = 'https://www.homes247.in/login';
    } else if (
      this.router.url.split('?')[0] ===
      '/userauth/wishlist/' + this.UserId
    ) {
      // this.router.navigate(['/login']);
      localStorage.removeItem('userName');
      localStorage.removeItem('userID');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userNumber');
      localStorage.removeItem('loginID');
      localStorage.removeItem('userLastName');
      window.location.href = 'https://www.homes247.in/login';
    } else if (
      this.router.url.split('?')[0] ===
      '/userauth/seenprojects/' + this.UserId
    ) {
      // this.router.navigate(['/login']);
      localStorage.removeItem('userName');
      localStorage.removeItem('userID');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userNumber');
      localStorage.removeItem('loginID');
      localStorage.removeItem('userLastName');
      window.location.href = 'https://www.homes247.in/login';
    } else if (
      this.router.url.split('?')[0] ===
      '/userauth/sellingprojects/' + this.UserId
    ) {
      // this.router.navigate(['/login']);
      localStorage.removeItem('userName');
      localStorage.removeItem('userID');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userNumber');
      localStorage.removeItem('loginID');
      localStorage.removeItem('userLastName');
      window.location.href = 'https://www.homes247.in/login';
    } else {
      localStorage.removeItem('userName');
      localStorage.removeItem('userID');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userNumber');
      localStorage.removeItem('loginID');
      localStorage.removeItem('userLastName');

      location.reload();
    }
  }


  Logout() {
    localStorage.removeItem('userName');
    localStorage.removeItem('userID');
    localStorage.removeItem('useremail');
    localStorage.removeItem('usernum');
    localStorage.removeItem('loginID');
    localStorage.removeItem('userLastName');
    this.router.navigate(['/login']);
  }

  // ─── Profile navigation ───────────────────────────────────────────────────

  Showedit() {
    this.mainpageshow = false;
    this.editprofileshow = true;
    this.resetpassshow = false;
    this.myTransactionsShow = false;
    this.paymentshow = false;
  }

  resetpass() {
    this.mainpageshow = false;
    this.editprofileshow = false;
    this.resetpassshow = true;
    this.myTransactionsShow = false;
    this.paymentshow = false;
  }

  changenum() {
    this.resetnumbermodal = true;
    this.mainpageshow = false;
    this.editprofileshow = false;
    this.myTransactionsShow = false;
    this.paymentshow = false;
  }

  profileback() {
    this.mainpageshow = true;
    this.editprofileshow = false;
    this.resetpassshow = false;
    this.resetnumbermodal = false;
    this.myTransactionsShow = false;
    this.paymentshow = false;
    this.footerNavShow = true;
  }

  payment() {
    this.mainpageshow = false;
    this.editprofileshow = false;
    this.resetpassshow = false;
    this.myTransactionsShow = false;
    this.paymentshow = true;
    this.footerNavShow = false;
  }

  startBrowsing() {
    this.mainpageshow = false;
    this.editprofileshow = false;
    this.resetpassshow = false;
    this.myTransactionsShow = false;
    this.paymentshow = false;
    this.startBrowsingProperties = true;
    this.footerNavShow = false;
  }

  myTransactions() {
    this.mainpageshow = false;
    this.editprofileshow = false;
    this.resetpassshow = false;
    this.myTransactionsShow = true;
    this.paymentshow = false;

    const param = { userID: this.UserId, user_number: this.userNumber };
    this.otploader = true;
    this.eliteService.transactionDetails(param).subscribe(response => {
      if (response['status'] == 'True') {
        this.otploader = false;
        this.transactionDetails = response['data'];
      }
    });
  }

  // ─── Profile update ───────────────────────────────────────────────────────

  updateuserdetails() {
    const userid = localStorage.getItem('userID');
    this.UserId = userid;
    this.Service.getUserDetailsById(this.UserId).subscribe(response => {
      let userdetails = response['UserDetails'];
      this.imageUrls = userdetails[0]['user_profile'];
      this.usernum = userdetails[0].number;
      this.username = userdetails[0].user_name;
      this.Lname = userdetails[0].last_name;
      this.useremail = userdetails[0].user_email;
      // this.profileCard();
    });
  }

  // profileCard() {
  //   const number = this.usernum;
  //   this.eliteService.profileCard(number).subscribe((res: any) => {
  //     if (res['status'] == 'True') {
  //       this.profilePlanCard = res.plans ? [res.plans] : [];
  //       this.otploader = false;
  //     }
  //   });
  // }

  onInputChange() {
    this.changesMade = true;
  }

  onCancel() {
    this.changesMade = false;
    this.username = this.username;
    this.Lname = this.Lname;
    this.useremail = this.useremail;
  }

  UpdateProfile() {
    this.changesMade = false;
    if ($('#fname').val() === '') {
      $('#fname').focus().css('border-color', 'red').attr('placeholder', 'Please Enter First Name');
      return false;
    }
    if ($('#mail').val() == '') {
      $('#mail').focus().css('border-color', 'red').attr('placeholder', 'Please Enter Email-id');
      return false;
    } else {
      var emaill = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
      if (emaill.test($('#mail').val())) {
        $('#mail').removeAttr('style');
      } else {
        $('#mail').focus().css('border-color', 'red').attr('placeholder', 'Please enter valid email').val('');
        return false;
      }
    }

    this.CoverImage = [];
    var param = {
      regid: this.UserId,
      name: this.username,
      lname: this.Lname,
      mail: this.useremail
    };
    this.Service.updateuserdata(param).subscribe(responce => {
      if (responce['status'] === 'True') {
        this.updateuserdetails();
        swal.fire({ title: 'Details Updated Successfully', icon: 'success', showConfirmButton: false, timer: 2000 });
        localStorage.setItem('username', this.username);
      } else {
        swal.fire({ title: 'Something Error Occured', icon: 'error', showConfirmButton: false, timer: 2000 });
      }
    });
  }

  onSubmit() {
    this.changesMade = false;
    if ($('#name').val() === '') {
      $('#name').focus().css('border-color', 'red').attr('placeholder', 'Please Enter the name');
      return false;
    }
    if ($('#emailId').val() === '') {
      $('#emailId').focus().css('border-color', 'red').attr('placeholder', 'Please Enter email');
      return false;
    } else {
      const emailFilter = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if (emailFilter.test($('#emailId').val())) {
        $('#emailId').removeAttr('style');
      } else {
        $('#emailId').focus().css('border-color', 'red').attr('placeholder', 'Please enter valid email').val('');
        return false;
      }
    }

    const regid = this.UserId;
    const name = this.username;
    const lastName = this.registrationForm.value.lastName;
    const email = this.useremail;
    this.Service.updateuserdata1(regid, name, lastName, email).subscribe(responce => {
      if (responce['status'] === 'True') {
        swal.fire({ title: 'Details Updated Successfully', icon: 'success', showConfirmButton: false, timer: 2000 });
        localStorage.setItem('userName', name);
        this.updateuserdetails();
      } else {
        swal.fire({ title: 'Something Error Occured', icon: 'error', showConfirmButton: false, timer: 2000 });
      }
    });
  }

  // ─── Image upload ─────────────────────────────────────────────────────────

  onCoverSelectFile(event: any) {
    if (event.target.files[0].size > 500000) {
      swal.fire({ icon: 'error', title: 'Image Size is too big.', text: 'Image Size should be less than 500kb.', showConfirmButton: true });
    } else {
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
        this.imageUrls = '';
      }
      this.uploadFile();
    }
  }

  uploadFile() {
    this.changesMade = true;
    const formData = new FormData();
    formData.append('profile', this.registrationForm.get('cover').value);
    formData.append('userId', this.UserId);
    this.Service.updatProfileImage(formData).subscribe(responce => {
      this.uploadResponse = responce;
    });
  }

  // ─── OTP ──────────────────────────────────────────────────────────────────

  handleEvent(e: CountdownEvent) {
    if (e.action === 'done') {
      this.otpexpired = true;
    }
  }

  goback() {
    $('#modal-container').addClass('out');
    $('body').removeClass('modal-active');
  }

  onOtpChange(otp: any) {
    var param = this.user;
    param.otp = otp;
  }

  onprofileInputChange() {
    $('#getOtpBtn').removeAttr('disabled');
    $('#getOtpBtn').addClass('updateProfileNumberBtnActive');
    $('#getOtpBtn').removeClass('updateProfileNumberBtn');
  }

  otpsend() {
    if ($('#renumber').val() == '') {
      $('#renumber').focus().css('border-color', 'red').attr('placeholder', 'Please Enter Number');
      return false;
    }
    var param = { number: this.user.number };
    this.Service.CheckNumLogin(param).subscribe((response) => {
      if (response['status'] === '1') {
        swal.fire({ text: 'Mobile Number already exist try with New Number', icon: 'error', showConfirmButton: false, timer: 2500 });
      } else {
        this.otploader = true;
        $('body').addClass('bodyoverlay');
        this.Service.otpsend(param).subscribe((success) => {
          var prestatus = success['messaging_product'];
          if (prestatus == 'whatsapp') {
            this.countdown.begin();
            var buttonId = $('#one').attr('id');
            $('#modal-container').removeAttr('class').addClass(buttonId);
            $('body').addClass('modal-active');
            this.otploader = false;
            $('body').removeClass('bodyoverlay');
          } else {
            swal.fire({ title: 'Oops Something Error!', icon: 'error', showConfirmButton: false, timer: 1500 });
            this.otploader = false;
            $('body').removeClass('bodyoverlay');
          }
        });
      }
    });
  }

  otpvalidate() {
    var otplength = 4;
    if ($('#otp').val() == '') {
      swal.fire({ title: 'Please enter the OTP!', icon: 'error', showConfirmButton: false, timer: 1000 });
      return false;
    } else {
      var liveotpcount = $('#otp').val().length;
      if (liveotpcount < otplength) {
        swal.fire({ title: 'Please enter the valid OTP!', icon: 'warning', showConfirmButton: false, timer: 1500 });
        return false;
      }
    }
    this.otploader = true;
    $('body').addClass('bodyoverlay');
    const paramNum = this.user;
    this.Service.otpvalidcheck(paramNum).subscribe((success) => {
      var status = success['status'];
      if (status == 'True') {
        this.countdown.restart();
      } else {
        this.otploader = false;
        $('body').removeClass('bodyoverlay');
        swal.fire({ title: 'Oops Something Error!', text: 'Its Not a valid OTP / OTP Expired!', icon: 'error', showConfirmButton: false, timer: 1500 });
      }
    });
  }

  // ─── Subscription / Plans ─────────────────────────────────────────────────

  /**
   * restoreAfter=true only when called from ngOnInit.
   * viewPlanDetails calls with false to avoid restoreViewState loop.
   */
  private handledQueryParam = false;

  subscriptionManagement(restoreAfter: boolean = false) {
    const param = { userId: this.UserId, userNumber: this.userNumber };
    this.otploader = true;
    this.eliteService.subscriptionManagement(param).subscribe(response => {
      if (response['status'] == 'True') {
        this.otploader = false;
        this.userSubscribedPlans = response['data'];

        this.buyerTenentPlan = this.userSubscribedPlans.filter(
          res => res.eliteUserId == 1 &&
            (res.subscriptionStatus == 'Active' || res.subscriptionStatus == 'pending')
        );
        this.ownerSellerPlan = this.userSubscribedPlans.filter(
          res => res.eliteUserId == 2 &&
            (res.subscriptionStatus == 'Active' || res.subscriptionStatus == 'pending')
        );

        this.userSubscribedPlans.forEach(plan => {
          if (plan.showContacts && plan.contactsUsed) {
            this.animateCount(plan);
          } else {
            plan.displayCount = 0;
          }
        });

        if (this.userSubscribedPlans.length) {
          this.selectPlanContact(1);
        }

        // handle query param navigation — only non-recharge cases
        // recharge is handled in onApiReady() after both APIs done
        if (!this.handledQueryParam) {
          const params = this.route.snapshot.queryParams;

          if (params['view'] === 'contact' && params['eliteId']) {
            this.handledQueryParam = true;
            this.mainpageshow = false;
            this.ContactUsageShow = true;
            if (params['eliteId'] == 1) this.selectedPlanDetails = this.buyerTenentPlan;
            else if (params['eliteId'] == 2) this.selectedPlanDetails = this.ownerSellerPlan;
            this.selectPlanContact(Number(params['eliteId']));
            return; // ← skip onApiReady, no sessionStorage restore needed

          } else if (params['view'] === 'properties' && params['planID']) {
            this.handledQueryParam = true;
            this.mainpageshow = false;
            this.contactedPropertiesShow = true;
            this.footerNavShow = true;
            this.viewProperties(Number(params['planID']));
            return; // ← skip onApiReady, no sessionStorage restore needed
          }
        }

        // always call onApiReady for:
        // 1. no query param → restoreViewState() from sessionStorage
        // 2. recharge query param → handled inside onApiReady()
        if (restoreAfter) {
          this.onApiReady(); // ← single call, always ✅
        }
      }
    });
  }
  private apiLoadCount = 0;

  private onApiReady() {
    this.apiLoadCount++;
    if (this.apiLoadCount >= 2) {
      const params = this.route.snapshot.queryParams;
      if (params['view'] === 'recharge' && params['eliteId']) {
        this.mainpageshow = false;
        this.rechargeContactShow = true;
        this.footerNavShow = false;

        const planObj = params['eliteId'] == 1
          ? this.buyerRechargeablePlan
          : this.ownerRechargeablePlan;

        const activePlan = this.userSubscribedPlans.find(
          p => p.eliteUserId == params['eliteId']
        );
        const planKey = activePlan?.eliteUserPlanID ?? '1';
        const packObj = planObj[planKey] ?? {};
        this.rechargeablePlanFiltered = Object.values(packObj);
        this.selectedPlan = this.rechargeablePlanFiltered[0] ?? null;
        this.rechargeablePlanID = this.selectedPlan?.rechargeablePlanID ?? null;
        this.rechargePlan = this.selectedPlan?.rechargeablePlan ?? null;
        return;
      }
      this.restoreViewState();
    }
  }

  animateCount(plan: any): void {
    const target = plan.contactsUsed ?? 0;
    const duration = 1500;
    const steps = 40;
    const interval = duration / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += Math.ceil(target / steps);
      if (current >= target) {
        plan.displayCount = target;
        clearInterval(timer);
      } else {
        plan.displayCount = current;
      }
    }, interval);
  }
  buyerRechargeablePlan: any = {};
  ownerRechargeablePlan: any = {};

  relaxDataFilter() {
    this.otploader = true;
    this.eliteService.relaxDataFilter().subscribe((res: any) => {
      if (res['status'] == 'True') {
        this.otploader = false;
        const resDeta = res.subscriptionDetails;
        this.buyerRechargeablePlan = resDeta.buyerRechargeablePlan;
        this.ownerRechargeablePlan = resDeta.ownerRechargeablePlan;
        this.onApiReady();
      }
    });
  }

  selectPlanContact(eliteUserId: number): void {
    this.selectedPlan = this.userSubscribedPlans.find(
      x => x.eliteUserId == eliteUserId
    ) ?? null;

    if (this.selectedPlan) {
      this.creditPercent = this.selectedPlan.totalCredits > 0
        ? ((this.selectedPlan.totalCredits - this.selectedPlan.pendingCredits) / this.selectedPlan.totalCredits) * 100
        : 0;

    const daysLeft = Number(this.selectedPlan.daysLeft ?? this.selectedPlan.planExpiry ?? 0);
      const totalDays = this.selectedPlan.planValidity ?? 30;
      const daysUsed = totalDays - daysLeft;
      this.validityPercent = totalDays > 0 ? Math.min((daysUsed / totalDays) * 100, 100) : 0;
    }
  }

  getPlanClass(planName: string): string {
    const name = (planName ?? '').toLowerCase().replace(/\s+/g, '-');
    if (name === 'relax-plus') return 'relax-plus';
    if (name === 'relax-max') return 'relax-max';
    return 'relax';
  }

  // ─── Plan detail navigation ───────────────────────────────────────────────

  ContactUsageCategory: any
  viewPlanDetails(eliteUserId) {
    this.ContactUsageShow = true;
    this.mainpageshow = false;
    this.rechargeContactShow = false;
    this.saveViewState('ContactUsageShow', { eliteUserId });
    this.ContactUsageCategory = eliteUserId
    // call with false — must NOT trigger restoreViewState again (loop prevention)
    // this.subscriptionManagement(false);
    // assign after call — data may not be ready yet on first call,
    // but subscriptionManagement(false) will refresh buyerTenentPlan/ownerSellerPlan
    // and since we also call this from restoreViewState which runs after data is ready,
    // assignment here handles the normal navigation case
    if (eliteUserId == 1) {
      this.selectedPlanDetails = this.buyerTenentPlan;
    } else if (eliteUserId == 2) {
      this.selectedPlanDetails = this.ownerSellerPlan;
    }

    this.selectPlanContact(eliteUserId);
  }

  rechargeContact(eliteId) {
    this.ContactUsageShow = false;
    this.footerNavShow = false;
    this.rechargeContactShow = true;

    const planObj = eliteId == 1
      ? this.buyerRechargeablePlan
      : this.ownerRechargeablePlan;

    const activePlan = this.userSubscribedPlans.find(p => p.eliteUserId == eliteId);
    const planKey = activePlan?.eliteUserPlanID ?? '1';

    const packObj = planObj[planKey] ?? {};
    this.rechargeablePlanFiltered = Object.values(packObj);

    this.selectedPlan = this.rechargeablePlanFiltered[0] ?? null;
    this.rechargeablePlanID = this.selectedPlan?.rechargeablePlanID ?? null;
    this.rechargePlan = this.selectedPlan?.rechargeablePlan ?? null;
    this.saveViewState('rechargeContactShow', { eliteId });
  }

  selectPlan(plan: any): void {
    console.log(plan)
    this.selectedPlan = plan;
    this.rechargeablePlanID = plan.rechargeablePlanID;
    this.rechargePlan = plan.rechargeablePlan;
  }

  onProceed(): void {
    if (this.selectedPlan) {
      this.RazorPayment();
    }
  }

  // ─── View Properties ──────────────────────────────────────────────────────

  viewProperties(planID) {
    this.ContactUsageShow = false;
    this.contactedPropertiesShow = true;
    this.footerNavShow = true;
    this.planToView = planID;
    this.saveViewState('contactedPropertiesShow', { planID });
    this.searchText = '';
    // this.otploader = true;

    if (planID == 1) {
      this.eliteService.getContactedList(this.UserId).subscribe(res => {
        // if (res['status'] == 'True') {
        // this.otploader = false;
        this.contactHistory1 = res['pro_view'];
        this.allContactViews = this.buildViews(this.contactHistory1);
        this.filteredContactHistory = [...this.allContactViews];
        // }
      });
    } else if (planID == 2) {
      const param = { 'user_id': this.UserId, 'user_number': this.userNumber, 'postType': '' };
      this.eliteService.boostPropertyList(param).subscribe(res => {
        // if (res['status'] == 'True') {
        // this.otploader = false;
        this.contactHistory1 = res['data'];
        this.allContactViews = this.buildBoostViews(this.contactHistory1);
        this.filteredContactHistory = [...this.allContactViews];
        // }
      });
    }
  }

  // ─── Back navigation ──────────────────────────────────────────────────────

  goBackUsedContact() {
    this.ContactUsageShow = false;
    this.mainpageshow = true;
    this.clearViewState();
    this.router.navigate([], { relativeTo: this.route, queryParams: {}, replaceUrl: true });
  }

  goBackExtraContacts() {
    const fromExternal = this.route.snapshot.queryParams['view'] === 'properties';

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {},
      replaceUrl: true
    });

    if (fromExternal) {
      this.location.back();
    } else {
      this.contactedPropertiesShow = false;
      this.ContactUsageShow = true;
      this.saveViewState('ContactUsageShow', { eliteUserId: this.planToView });

      if (this.planToView == 1) {
        this.selectedPlanDetails = this.buyerTenentPlan;
      } else if (this.planToView == 2) {
        this.selectedPlanDetails = this.ownerSellerPlan;
      }
      this.selectPlanContact(Number(this.planToView));
    }
  }

  goBackRechargeContacts() {
    const fromExternal = this.route.snapshot.queryParams['view'] === 'recharge';

    this.router.navigate([], { relativeTo: this.route, queryParams: {}, replaceUrl: true });

    if (fromExternal) {
      this.location.back();
    } else {
      this.rechargeContactShow = false;
      this.ContactUsageShow = true;

      // ← restore selectedPlanDetails based on who opened recharge
      const raw = sessionStorage.getItem('activeViewData');
      const data = raw ? JSON.parse(raw) : null;
      // const eliteUserId = data?.eliteUserId ?? 1;
      const eliteUserId = data?.eliteUserId ?? data?.eliteId ?? 1;

      if (eliteUserId == 1) {
        this.selectedPlanDetails = this.buyerTenentPlan;
      } else if (eliteUserId == 2) {
        this.selectedPlanDetails = this.ownerSellerPlan;
      }

      this.selectPlanContact(eliteUserId);
      this.saveViewState('ContactUsageShow', { eliteUserId });
    }
  }

  // ─── Razorpay ─────────────────────────────────────────────────────────────

  RazorPayment() {
    const userId = localStorage.getItem('userID');
    const orderData = {
      user_id: this.UserId,
      user_number: this.userNumber,
      elite_user_id: this.rechargeablePlanID,
      plan_id: this.rechargePlan,
    };

    this.eliteService.createOrder(orderData).subscribe({

      next: (res: any) => {
        if (!res.status) {
          swal.fire({ title: 'Failed to create order. Please try again.', icon: 'error', showConfirmButton: true });
          return;
        }

        const options = {
          key: res.key_id,
          amount: res.amount,
          currency: res.currency,
          name: 'Homes247',
          image: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_mobile/images/logo1_1.png',
          description: 'Subscription',
          order_id: res.order_id,
          prefill: { contact: this.userNumber },
          theme: { color: '#971b47' },
          handler: (response: any) => {
            const verifyData = {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              user_id: userId,
              user_number: this.userNumber,
              elite_user_id: this.rechargePlan,
              plan_id: this.rechargeablePlanID,
            };
            this.eliteService.verifyPayment(verifyData).subscribe({
              next: (verifyRes: any) => {
                if (verifyRes.status) {
                  swal.fire({ title: 'Payment Successful! Subscription active', icon: 'success', showConfirmButton: true });
                  this.clearViewState();
                  this.router.navigate([`/userauth/profile/${this.UserId}`]);
                } else {
                  swal.fire({ title: 'Verification failed. Please contact support.', icon: 'error', showConfirmButton: true });
                }
              },
              error: () => {
                swal.fire({ title: 'Verification error. Please contact support.', icon: 'error', showConfirmButton: true });
              }
            });
          },
          modal: { ondismiss: () => { } }
        };

        const rzp = new (window as any).Razorpay(options);
        rzp.on('payment.failed', (response: any) => {
          swal.fire({ title: 'Payment Failed. Please try again.', icon: 'error', showConfirmButton: true });
        });
        rzp.open();
      },
      error: () => {
        swal.fire({ title: 'Something went wrong. Please try again.', icon: 'error', showConfirmButton: true });
      }
    });
  }

  // ─── Search ───────────────────────────────────────────────────────────────

  searchContacts(value: string): void {
    this.searchText = value;
    this.searchSubject.next(value.trim().toLowerCase());
  }

  clearSearch(): void {
    this.searchText = '';
    this.searchSubject.next('');
  }

  private applyFilter(term: string): void {
    if (!term) {
      this.filteredContactHistory = [...this.allContactViews];
      return;
    }
    this.filteredContactHistory = this.allContactViews.filter(view =>
      view.searchIndex.includes(term)
    );
  }

  private formatPhoneNumber(mobileNumber: string): string {
    const digits = mobileNumber.replace(/\D/g, '');
    if (digits.length === 10) {
      return `+91 ${digits.substring(0, 5)} ${digits.substring(5)}`;
    }
    return mobileNumber;
  }

  // ─── buildViews (planID == 1 — Contact Used) ─────────────────────────────

  formatUrl(value: any): string {
    return (value || '')
      .toString()
      .trim()
      .toLowerCase()
      .replace(/&/g, 'and')          // & -> and
      .replace(/\./g, '-')           // . -> -
      .replace(/\//g, '-')           // / -> -
      .replace(/\s+/g, '-')          // spaces -> -
      .replace(/[^a-z0-9-]/g, '')    // remove special characters
      .replace(/-+/g, '-')           // remove multiple hyphens
      .replace(/^-|-$/g, '');        // remove leading/trailing hyphens
  }



  propertyViewType: any
  private buildViews(items: any[]): ContactView[] {
    this.propertyViewType = 'contact'
    return items.map((item) => {
      const ownerName = item.owner_details?.owner_name ?? '';
      const mobileNumber = String(item.owner_details?.owner_number ?? '');
      const contactedOn = item.owner_details?.contacted_on ?? '';
      const formattedPhone = this.formatPhoneNumber(mobileNumber);


      const city = this.formatUrl(item.city_name);
      const locality = this.formatUrl(item.locality_name);
      const propertyName = this.formatUrl(item.propertyName);
      const propertyType = this.formatUrl(item.propertyType);
      const areaMax = this.formatUrl(item.area_max);
      const dimension = this.formatUrl(item.dimension);
      const bhk = this.formatUrl(item.BHK);

      let propertyUrl = '';

      if (item.db_category_id == '2') {

        if (propertyType === 'plot') {
          propertyUrl = `https://homes247.in//listings/${areaMax}-${dimension}-${propertyType}-for-sale-in-${locality}-${city}-at-${propertyName}-${item.property_IDPK}`;
        } else {
          propertyUrl = `https://homes247.in//listings/${bhk}-${propertyType}-for-sale-in-${locality}-${city}-at-${propertyName}-${item.property_IDPK}`;
        }

      } else if (item.db_category_id == '3') {

        if (propertyType === 'plot') {
          propertyUrl = `https://homes247.in//rentals/${areaMax}-${dimension}-${propertyType}-for-rent-in-${locality}-${city}-at-${propertyName}-${item.property_IDPK}`;
        } else {
          propertyUrl = `https://homes247.in//rentals/${bhk}-${propertyType}-for-rent-in-${locality}-${city}-at-${propertyName}-${item.property_IDPK}`;
        }

      } else if (item.db_category_id == '4') {

        propertyUrl = item.available_for == '1'
          ? `https://homes247.in//cld/commercial-properties-for-sale-in-${city}-${item.property_IDPK}`
          : `https://homes247.in//cld/commercial-properties-for-rent-in-${city}-${item.property_IDPK}`;

      } else {

        propertyUrl = `https://homes247.in//pgd/pg-for-rent-in-${city}-${item.property_IDPK}`;

      }




      const searchIndex = [
        item.propertyName,
        ownerName,
        mobileNumber,
        formattedPhone
      ].join(' ').toLowerCase();

      return {
        contactId: item.property_IDPK,
        propertyName: item.propertyName,
        ownerNameLabel: `Owner : ${ownerName}`,
        formattedPhone,
        usedOnLabel: `Used On : ${contactedOn}`,
        image: item.coverImagePath ?? '',
        imageAlt: item.propertyName,
        propertyUrl,
        searchIndex
      };
    });
  }

  // ─── buildBoostViews (planID == 2 — Boost Properties) ────────────────────

  private buildBoostViews(items: any[]): ContactView[] {
    this.propertyViewType = 'postProp'
    return items.map((item) => {
      const searchIndex = [
        item.property_name,
        item.localityName,
        item.cityName,
        item.property_type
      ].join(' ').toLowerCase();

      return {
        contactId: item.property_id,
        propertyName: item.property_name,
        ownerNameLabel: (item.localityName ?? '') + ', ' + (item.cityName ?? ''),
        formattedPhone: '',
        usedOnLabel: item.postedDate ?? '',
        image: item.coverImagePath ?? '',
        imageAlt: item.property_name,
        propertyViewType: '2',
        searchIndex
      };
    });
  }

  // ─── Save / Restore view state ────────────────────────────────────────────

  private saveViewState(view: string, data?: any) {
    sessionStorage.setItem('activeView', view);
    if (data) sessionStorage.setItem('activeViewData', JSON.stringify(data));
    else sessionStorage.removeItem('activeViewData');
  }

  private clearViewState() {
    sessionStorage.removeItem('activeView');
    sessionStorage.removeItem('activeViewData');
  }

  private restoreViewState() {
    const view = sessionStorage.getItem('activeView');
    const raw = sessionStorage.getItem('activeViewData');
    const data = raw ? JSON.parse(raw) : null;

    switch (view) {
      case 'ContactUsageShow':
        this.mainpageshow = false;
        this.ContactUsageShow = true;
        // assign directly — data is already loaded since we're inside subscriptionManagement callback
        if (data?.eliteUserId == 1) {
          this.selectedPlanDetails = this.buyerTenentPlan;
        } else if (data?.eliteUserId == 2) {
          this.selectedPlanDetails = this.ownerSellerPlan;
        }
        this.selectPlanContact(Number(data?.eliteUserId ?? 1));
        break;
      case 'contactedPropertiesShow':
        this.mainpageshow = false;
        this.ContactUsageShow = false;
        this.contactedPropertiesShow = true;
        this.footerNavShow = true;
        if (data?.planID) this.viewProperties(data.planID);
        break;
      case 'rechargeContactShow':
        this.mainpageshow = false;
        this.ContactUsageShow = false;
        this.rechargeContactShow = true;
        this.footerNavShow = false;
        if (data?.eliteId) this.rechargeContact(data.eliteId);
        break;
    }
  }
}