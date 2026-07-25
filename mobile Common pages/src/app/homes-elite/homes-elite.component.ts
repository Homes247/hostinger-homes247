import { Component, OnDestroy, OnInit, Inject } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { LOCAL_STORAGE, WINDOW } from '@ng-toolkit/universal';
import { ElitedataService } from '../elitedata.service';

@Component({
  selector: 'app-homes-elite',
  templateUrl: './homes-elite.component.html',
  styleUrls: ['./homes-elite.component.css']
})
export class HomesEliteComponent implements OnInit, OnDestroy {

  // cards = [
  //   { text: 'I upgraded to Relax Plus and got access to only verified listings. Saved ₹15,000 in brokerage!', img: '../../assets/images/elite/divya.svg', name: 'Divya M', role: 'Relax Plus' },
  //   { text: 'I upgraded to Relax Plus and got access to only verified listings. Saved ₹20,000 in brokerage!', img: '../../assets/images/elite/divya.svg', name: 'Rahul S', role: 'Relax Plus' },
  //   { text: 'I upgraded to Relax Plus and got access to only verified listings. Saved ₹25,000 in brokerage!', img: '../../assets/images/elite/divya.svg', name: 'Anjali K', role: 'Relax Plus' },
  //   { text: 'I upgraded to Relax Plus and got access to only verified listings. Saved ₹30,000 in brokerage!', img: '../../assets/images/elite/divya.svg', name: 'Arjun P', role: 'Relax Plus' }
  // ];

  currentIndex = 0;
  interval: any;
  paymentShow: boolean = false;
  elitePlanShow: boolean = true;
  startBrowsingShow: boolean = false;
  loginshow = true;
  userlogin = false;
  username: any;
  UserId: any;
  dropdownVisible = false;
  relaxSelected: boolean = false;
  relaxPlusSelected: boolean = false;
  relaxMaxSelected: boolean = false;
  frquentlyasked: any;

  @Inject(LOCAL_STORAGE) private Local_Storage: any; id;
  sliderDetails: any;
  howItWorks: any;
  userSay: any;
  cardImgPath = 'http://192.168.0.120/right2shout_LIVE/images/usersaysImg/'
  planDetailesImagePath = 'http://192.168.0.120/right2shout_LIVE/images/dataFilterimg/'
  eliteUserName: any;
  eliteUserPlans: any;
  userSelected: any = null;
  selectedPlanId: any;
  mobileImg: any;

  constructor(public eliteService: ElitedataService,) { }



  ngOnInit(): void {

    this.sliderData()
    this.relaxDataFilter()
    // this.interval = setInterval(() => {
    //   this.currentIndex = (this.currentIndex + 1) % this.cards.length;
    // }, 3000);

    this.loadDotLottieScript()
      .then(() => {
        console.log('DotLottie Web Component loaded.');
      })
      .catch((error) => {
        console.error(error);
      });
  }

  loadDotLottieScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.type = 'module';
      script.src = 'https://unpkg.com/@lottiefiles/dotlottie-wc@0.6.2/dist/dotlottie-wc.js';
      script.onload = () => resolve();
      script.onerror = () => reject('Failed to load dotlottie-wc script.');
      document.head.appendChild(script);
    });
  }

  ngOnDestroy() {
    if (this.interval) clearInterval(this.interval);
  }

  customOptions2: OwlOptions = {
    loop: true,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: true,
    dots: false,
    nav: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    items: 1
  };

  customOptions = {
    loop: true,
    autoplay: true,
    autoplayTimeout: 3000,
    dots: true,
    nav: false,
    // navText: ['<', '>'],
    responsive: {
      0: { items: 1 },
      600: { items: 2 },
      1000: { items: 3 }
    }
  };

  carouselOptions1 = {
    loop: true,
    margin: 20,
    nav: false,
    dots: false,
    responsive: {
      0: { items: 1.2 },
      768: { items: 2 },
      992: { items: 3 }
    }
  };

  payment() {
    window.location.hash = '#payment';
    this.paymentShow = true;
    this.elitePlanShow = false;
    this.startBrowsingShow = false;
  }
  elitePlan() {
    this.paymentShow = false;
    this.elitePlanShow = true;
    this.startBrowsingShow = false;
    this.relaxMaxSelected = false;
    this.relaxPlusSelected = false;
    this.relaxSelected = false;
  }
  startBrowsing() {
    this.paymentShow = false;
    this.elitePlanShow = false;
    this.startBrowsingShow = true;
    document.body.style.backgroundColor = '#fff';
  }


  Login() {
    const loginid = localStorage.getItem('loginID');
    const username = localStorage.getItem("userName");
    const userid = localStorage.getItem("userID");
    if (loginid === '1') {
      this.userlogin = true;
      this.loginshow = false;
      this.username = username;
      this.UserId = userid;
    }
  }

  Logout() {
    localStorage.clear();
    window.location.reload();
  }


  // ===========================Thippesh edit strat here=====================================
  sliderData() {
    this.eliteService.sliderData().subscribe((res: any) => {
      var resData = res['sliderData'];
      // console.log('Slider Data',resData);

      this.sliderDetails = resData.sliderDetails;
      this.howItWorks = resData.howItWorks;
      this.userSay = resData.userSay;
      this.frquentlyasked = resData.frquentlyasked;
      // console.log(this.sliderDetails);
    })
  }
  selectedUser: string = '';
  selectedUserId: string = '';
  plansList: any[] = [];

  relaxDataFilter() {
    this.eliteService.relaxDataFilter().subscribe((res: any) => {
      const resDeta = res.subscriptionDetails;

      // ====================== dropdown data ======================
      this.eliteUserName = resDeta.eliteUserName;
      // ====================== plans data =========================
      this.eliteUserPlans = resDeta.elitePlans;
      // ====================== mobile Img data =========================
      this.mobileImg = resDeta.mobileImg;
      // console.log(this.mobileImg)
      // ====================== Default Buyer Plan =================
      const buyerPlan = this.eliteUserPlans.find(
        p => p.eliteUserId === '1'
      );

      if (buyerPlan) {
        this.selectedUser = buyerPlan.eliteUserType;
        this.selectedUserId = buyerPlan.eliteUserId;
        this.plansList = buyerPlan.plans;

        console.log('Elite User Plans (Buyer)', this.plansList);
      }
    });
  }


  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }

  // selectEliteUserPlan(plan: any) {
  //   console.log('Selected Plan:', plan);
  //   this.selectedUser = plan.value.eliteUserType;
  //   this.selectedUserId = plan.value.eliteUserId;

  //   //================== Fetch plans based on selected ID==================
  //   const matchedPlan = this.eliteUserPlans.find(
  //     p => p.eliteUserId === this.selectedUserId
  //   );

  //   this.plansList = matchedPlan ? matchedPlan.plans : [];
  //   this.dropdownVisible = false;
  //   console.log('Elite User Plans', this.plansList);
  // }

  selectEliteUserPlan(user: any) {
    this.selectedUser = user.eliteUserType;
    this.selectedUserId = user.eliteUserId;
    //================== Fetch plans based on selected ID==================
    const matchedPlan = this.eliteUserPlans.find(
      p => p.eliteUserId === this.selectedUserId
    );

    this.plansList = matchedPlan ? matchedPlan.plans : [];

    this.dropdownVisible = false;

    console.log('Selected User:', this.selectedUser);
    console.log('Plans:', this.plansList);
  }

  selectedPlan(plan: any) {
    console.log('Selected Plan Details:', plan);

    this.userSelected = plan;
  }




}