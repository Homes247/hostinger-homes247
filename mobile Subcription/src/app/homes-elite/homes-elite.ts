import { Component, OnDestroy, OnInit, CUSTOM_ELEMENTS_SCHEMA, PLATFORM_ID, Inject } from '@angular/core';
import { ElitedataService } from '../elitedata.service';
import { CommonModule, isPlatformBrowser, Location } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-owl-carousel-o';
import swal from 'sweetalert2';

interface OrderItem {
  label: string;
  amount: number;
}

interface PurchaseBy {
  name: string;
  email: string;
  mobile: string;
}

interface BillingSummary {
  planName: string;
  planPrice: number;
  orderItems: OrderItem[];
  total: number;
  purchaseBy: PurchaseBy;
}


@Component({
  selector: 'app-homes-elite',
  templateUrl: './homes-elite.html',
  styleUrls: ['./homes-elite.css'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    CarouselModule,
  ]
})
export class HomesEliteComponent implements OnInit, OnDestroy {
  otploader: any = true
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
  frquentlyaskedList: any[] = []
  sliderDetailList: any[] = []
  howItWorksList: any[] = []
  id: any;
  sliderDetails: any[] = [];
  howItWorks: any[] = [];
  userSay: any[] = [];
  cardImgPath = 'http://192.168.0.119/right2shout_LIVE/images/usersaysImg/'
  planDetailesImagePath = 'http://192.168.0.119/right2shout_LIVE/images/dataFilterimg/'
  eliteUserName: any;
  eliteUserPlans: any;
  userSelected: any = null;
  selectedPlanId: any;
  mobileImg: any;
  userId: any
  userName: any
  userNumber: any
  userEmail: any

  constructor(public eliteService: ElitedataService, private route: ActivatedRoute,
    private router: Router, private location: Location,
    @Inject(PLATFORM_ID) private platformId: Object,

  ) { }

  currentFragment: any = '1'
  ngOnInit() {

    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        this.currentFragment = fragment
        console.log(this.currentFragment)
      } else {
        this.currentFragment = '1'
        console.log('currentFragment')
        console.log(this.currentFragment)

      }
    });

    //  setTimeout(() => {
    if (isPlatformBrowser(this.platformId)) {
      this.sliderData();
    }
    // }, 10000);
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
    const loginid = localStorage.getItem('loginID');
    if (loginid == '1') {
      this.userId = localStorage.getItem("userID");
      this.userName = localStorage.getItem("userName");
      this.userNumber = localStorage.getItem("userNumber");
      this.userEmail = localStorage.getItem("userEmail");
    }

    if (isPlatformBrowser(this.platformId)) {
      const link1 = document.createElement('link');
      link1.rel = 'stylesheet';
      link1.href =
        'https://d1zt14hr2k4poi.cloudfront.net/version9.0/plugins/ngx-owl-carousel-o/lib/styles/prebuilt-themes/owl.carousel.min.css';

      const link2 = document.createElement('link');
      link2.rel = 'stylesheet';
      link2.href =
        'https://d1zt14hr2k4poi.cloudfront.net/version9.0/plugins/ngx-owl-carousel-o/lib/styles/prebuilt-themes/owl.theme.default.min.css';

      document.head.appendChild(link1);
      document.head.appendChild(link2);
    }
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
  customOptions2: any = {
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
    autoplay: false,
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
  // payment() {
  //   window.location.hash = '#payment';
  //   this.paymentShow = true;
  //   this.elitePlanShow = false;
  //   this.startBrowsingShow = false;
  // }
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
    this.eliteService.sliderData().subscribe(res => {
      this.otploader = true
      if (res['status'] == 'True') {
        this.otploader = false
        var resData = res['sliderData'];
        this.sliderDetailList = resData.sliderDetails;
        this.sliderDetails = resData.sliderDetails[1];
        this.howItWorksList = resData.howItWorks;
        this.howItWorks = resData.howItWorks[1];
        this.userSay = resData.userSay;
        this.frquentlyaskedList = resData.frquentlyasked;
        this.frquentlyasked = resData.frquentlyasked[1];
      }
    })
  }
  selectedUser: string = '';
  selectedUserId: string = '';
  plansList: any[] = [];
  mobileImgElite: any
  relaxDataFilter() {
    this.eliteService.relaxDataFilter().subscribe((res: any) => {
      const resDeta = res.subscriptionDetails;
      // ====================== dropdown data ======================
      this.eliteUserName = resDeta.eliteUserName;
      // ====================== plans data =========================
      this.eliteUserPlans = resDeta.elitePlans;
      // ====================== mobile Img data =========================
      this.mobileImgElite = resDeta.mobileImg;
      // ====================== Default Buyer Plan =================
      const buyerPlan = this.eliteUserPlans.find(
        p => p.eliteUserId == this.currentFragment
      );

      if (buyerPlan) {
        console.log('ghj')
        console.log(buyerPlan);

        this.selectedUser = buyerPlan.eliteUserType;
        this.selectedUserId = buyerPlan.eliteUserId;
        this.plansList = buyerPlan.plans;
        this.mobileImg = this.mobileImgElite[buyerPlan?.eliteUserId]
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
      p => p.eliteUserId == this.selectedUserId
    );
    this.plansList = matchedPlan ? matchedPlan.plans : [];
    this.dropdownVisible = false;
    this.mobileImg = this.mobileImgElite[user?.eliteUserId]
    this.frquentlyasked = this.frquentlyaskedList[this.selectedUserId]
    this.sliderDetails = this.sliderDetailList[this.selectedUserId]
    this.howItWorks = this.howItWorksList[this.selectedUserId]
  }


  selectedPlan(planID: any, selectedUserId: any, selectedUser: any, plan) {
    this.userSelected = planID;
    this.selectedUserId = selectedUserId
    this.selectedUser = selectedUser;
    this.billingSummaryList = plan
    console.log(this.billingSummaryList)
    console.log(this.selectedUserId, this.selectedUser, 'Selected Plan:', this.userSelected);
  }


  paymentFinnal() {
    this.billingShowSummary = true
    this.elitePlanShow = false
  }
  closeBillingSummary() {
    this.billingShowSummary = false
    this.elitePlanShow = true
  }

  payment() {
    const userId = localStorage.getItem('userID');
    const orderData = {
      user_id: this.userId,
      user_number: this.userNumber,
      elite_user_id: this.selectedUserId,
      plan_id: this.userSelected,
    };

    this.eliteService.createOrder(orderData).subscribe({
      next: (res: any) => {
        if (!res.status) {
          swal.fire({ title: 'Failed to create order!', text: 'Please try again.', icon: 'error', showConfirmButton: false, timer: 2000 });

          return;
        }

        const options = {
          key: res.key_id,
          amount: res.amount,
          currency: res.currency,
          name: 'Homes247',
          image: "https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_mobile/images/logo1_1.png",
          description: this.selectedUser + ' Subscription',
          order_id: res.order_id,
          prefill: {
            contact: this.userNumber,
          },
          theme: {
            color: '#971b47'
          },

          handler: (response: any) => {
            const verifyData = {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              user_id: userId,
              user_number: this.userNumber,
              elite_user_id: this.selectedUserId,
              plan_id: this.userSelected,
            };

            this.eliteService.verifyPayment(verifyData).subscribe({
              next: (verifyRes: any) => {
                if (verifyRes.status) {
                  swal.fire({ title: 'Payment Successful!', text: 'Subscription active ', icon: 'success', showConfirmButton: true });

                  this.location.back();
                  //  window.history.back();
                } else {
                  swal.fire({ title: 'Verification failed!', text: 'Please contact support.', icon: 'error', showConfirmButton: false, timer: 2000 });

                }
              },
              error: () => {
                swal.fire({ title: 'Verification error!', text: 'Please contact support.', icon: 'error', showConfirmButton: false, timer: 2000 });
              }
            });
          },

          modal: {
            ondismiss: () => {
              console.log('Popup closed.');
            }
          }
        };

        const rzp = new (window as any).Razorpay(options);
        rzp.on('payment.failed', (response: any) => {
          console.log('Payment failed:', response);
          swal.fire({ title: 'Payment Failed!', text: 'Please try again.', icon: 'error', showConfirmButton: false, timer: 2000 });
        });
        rzp.open();
      },
      error: () => {
        swal.fire({ title: 'Something went wrong!', text: 'Please try again.', icon: 'error', showConfirmButton: false, timer: 1500 });
      }
    });
  }


  billingSummaryList: any = {};
  billingShowSummary: boolean = false

  billingSummary: BillingSummary = {
    planName: 'Relax Max',
    planPrice: 399,
    orderItems: [
      { label: 'Relax max', amount: 399.00 },
      { label: 'GST 18%', amount: 71.82 }
    ],
    total: 472.82,
    purchaseBy: {
      name: 'Ragavendra',
      email: 'example@gmail.com',
      mobile: '+91 - 987643210'
    }
  };
  onBackClick(): void {
    // Handle back navigation
    window.history.back();
  }

  onBuyClick(): void {
    // Handle purchase action
    console.log('Initiating purchase for:', this.billingSummary.planName);
  }

  homesEliteBackBtn() {
    this.location.back();
  }
}