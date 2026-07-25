
// subscription-plan-management.ts

import { CommonModule, Location } from '@angular/common';
import { Component, OnInit, AfterViewInit, HostListener, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ElitedataService } from '../elitedata.service';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import swal from 'sweetalert2';
// ─────────────────────────────────────────────────────────────
// INTERFACES
// ─────────────────────────────────────────────────────────────

export interface Property {
  id: number;
  title: string;
  location: string;
  price: string;
  area: string;
  status: string;
  postedOn: string;
  image: string;
  selected: boolean;
  propertyType?: string;
  size?: string;
  date?: string;
}

export interface BoostProperty {
  id: number;
  title: string;
  location: string;
  image: string;
  budget: number;
  days: number;
  checked: boolean;
  maxDays: number;
  originalTotal?: number;
  originalDays?: number;
  // optional edit fields
  minBudget?: number;
  originalBudget?: number;
  checkboxDisabled?: boolean;
  boostPerDay?: boolean;
  payableAmount?: number;
  budgetError?: boolean; // ← add this
}

export interface AllProperty {
  id: number;
  title: string;
  location: string;
  image: string;
}

export interface BudgetDayTier {
  min: number;
  max: number;
  maxDays: number;
  avgPerDay: number;
}

export interface BoostOrderProperty {
  property_id: number;
  budget_per_day: number;
  duration_days: number;
  total_amount: number;
}

export interface CreateBoostOrderPayload {
  user_id: string | null;
  user_number: string;
  properties: BoostOrderProperty[];
  total_amount: number;
}

export interface CreateBoostOrderResponse {
  status: boolean;
  key_id: string;
  amount: number;
  currency: string;
  order_id: string;
}

export interface VerifyPaymentPayload {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  user_id: string | null;
  user_number: string;
  properties: BoostOrderProperty[];
}

export type PlanTheme = 'relax_max' | 'relax' | 'relax_plus';
export type PropertyStatus = 'active' | 'expired';

export interface PlanThemeConfig {
  color: string;
  bg: string;
  border: string;
  progress: string;
}

export interface Plan {
  title: string;
  theme: PlanTheme;
  typeLabel: string;
  isActive: boolean;
  daysLeft: number;
  validTill: string;
  contactsUsed: number;
  contactsTotal: number;
  remainText: string;
  actionLabel: string;
}

export interface BoostedProperty {
  name: string;
  location: string;
  status: PropertyStatus;
  daysLeft: number;
}

export interface RenewalInfo {
  date: string;
  planName: string;
}

// ─────────────────────────────────────────────────────────────
// BUDGET TIER CONSTANTS
// ─────────────────────────────────────────────────────────────

const BUDGET_DAY_TIERS: BudgetDayTier[] = [
  { min: 150, max: 199, maxDays: 2, avgPerDay: 87 },
  { min: 200, max: 250, maxDays: 3, avgPerDay: 75 },
  { min: 251, max: 350, maxDays: 5, avgPerDay: 60 },
  { min: 351, max: 500, maxDays: 7, avgPerDay: 61 },
  { min: 501, max: 700, maxDays: 12, avgPerDay: 50 },
  { min: 701, max: 1000, maxDays: 15, avgPerDay: 57 },
  { min: 1001, max: 2000, maxDays: 25, avgPerDay: 60 },
  { min: 2001, max: Infinity, maxDays: 30, avgPerDay: 67 },
];

// ─────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────

@Component({
  selector: 'app-subscription-plan-management',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './subscription-plan-management.html',
  styleUrl: './subscription-plan-management.css',
})
export class SubscriptionPlanManagement implements OnInit, AfterViewInit {

  private http = inject(HttpClient);

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private router1: Router,
    private eliteService: ElitedataService,
  ) { }

  // ─── View flags ────────────────────────────────────────────
  // addView    → Manage Plans / Boost Promo screen
  // planView   → Plan management screen
  // propertiesForBoost → Select Properties screen
  // currentPage → 'boost' | 'review' (inside propertiesForBoost flow)
  addView = false;
  planView = false;
  propertiesForBoost = false;
  currentPage: 'boost' | 'review' = 'boost';

  // ─── Auth ──────────────────────────────────────────────────
  userId: any;
  userNumber: any;

  // ─────────────────────────────────────────────────────────────
  // SELECT PROPERTIES SCREEN — existing logic (DO NOT CHANGE)
  // ─────────────────────────────────────────────────────────────

  categories: string[] = ['Buy', 'Rental', 'Pg'];
  activeCategory = 0;
  pillWidth = 0;
  activePillX = 0;
  private readonly TOGGLE_TOTAL_W = 295;
  private readonly TOGGLE_PADDING = 4;


  readonly PRICE_PER_PROPERTY = 19;



  setCategory(index: number): void {
    this.activeCategory = index;
    this.calcPill();
    this.filterProperties();
  }

  filteredProperties: any[] = []
  filterProperties(): void {
    const categoryMap: { [key: number]: number } = { 0: 1, 1: 2, 2: 3 };
    const catId = categoryMap[this.activeCategory];
    this.filteredProperties = this.boostPropertyList.filter(p => p.category_id === catId);
  }
  calcPill(): void {
    const count = this.categories.length;
    const usable = this.TOGGLE_TOTAL_W - this.TOGGLE_PADDING * 2;
    this.pillWidth = usable / count;
    this.activePillX = this.activeCategory * this.pillWidth + this.TOGGLE_PADDING;
  }
  selectedCount = 0;
  toggleSelect(prop: any): void {
    prop.selected = !prop.selected;
    this.selectedCount = this.boostPropertyList.filter(p => p.selected).length;
  }

  // Called when user clicks "Proceed To Configure" on Select Properties screen
  proceedToConfigure(): void {
    const selected = this.boostPropertyList.filter(p => p.selected);
    if (selected.length === 0) {
      swal.fire({ title: 'Please select at least one property to boost!', icon: 'error', showConfirmButton: false, timer: 2000 });
      return;
    }

    this.boostedList = selected.map((p: any) => {
      const newProp: BoostProperty = {
        id: p.property_id,        // ← property_id not id
        title: p.property_name,   // ← property_name not title
        location: p.localityName ? `${p.localityName}, ${p.cityName}` : p.cityName,
        image: p.coverImagePath ?? '',
        budget: 500,
        days: 7,
        checked: false,
        maxDays: 0,
      };
      console.log(newProp)
      console.log(this.boostPropertyList)
      this.updateMaxDays(newProp);
      return newProp;
    });

    this.allProperties = this.boostPropertyList
      .filter((p: any) => !p.selected)
      .map((p: any) => ({
        id: p.property_id,
        title: p.property_name,
        location: p.localityName ? `${p.localityName}, ${p.cityName}` : p.cityName,
        image: p.image ?? '',
      }));

    this.propertiesForBoost = false;
    this.currentPage = 'boost';
    this.showBoostSettings = true;
    this.updateUnboosted(); // ← add this
    this.updateAmounts();   // ← and this 
  }

  // plain variables
  unboostedProperties: AllProperty[] = [];
  subtotalAmount = 0;
  gstAmount = 0;
  totalAmount = 0;

  // methods
  private updateUnboosted(): void {
    const boostedIds = new Set(this.boostedList.map(p => p.id));
    this.unboostedProperties = this.allProperties.filter(p => !boostedIds.has(p.id));
  }

  private updateAmounts(): void {
    this.subtotalAmount = this.boostedList.reduce((sum, p) => {
      console.log(p.title, 'checked:', p.checked, 'budget:', p.budget, 'days:', p.days);
      return sum + (p.checked ? p.budget * p.days : p.budget);
    }, 0);
    console.log('subtotal:', this.subtotalAmount);
    this.gstAmount = Math.round(this.subtotalAmount * 0.18);
    this.totalAmount = this.subtotalAmount + this.gstAmount;
  }


  // helper
  private updateMaxDays(prop: BoostProperty): void {
    if (!this.budgetDayTiers.length) return;
    const tier = this.budgetDayTiers.find(t => prop.budget >= t.min && prop.budget <= t.max);
    prop.maxDays = tier ? tier.maxDays : 30;
  }

  // ─────────────────────────────────────────────────────────────
  // BOOST SETTINGS + REVIEW ORDER — new logic
  // ─────────────────────────────────────────────────────────────

  showBoostSettings = false; // controls boost+review pages visibility

  allProperties: AllProperty[] = [];
  boostedList: BoostProperty[] = [];

  sheetOpen = false;
  sheetSelected: Set<number> = new Set();


  budgetError?: boolean;
  hasEditError = false;

  onBudgetChange(index: number, event: Event): void {
    const input = event.target as HTMLInputElement;
    const budget = parseInt(input.value, 10) || 150;
    const list = this.showEditBoostSettings ? this.editBoostedList : this.boostedList;
    const prop = list[index];
    const minBudget = (prop as any).minBudget ?? 150;
    const originalBudget = (prop as any).originalBudget ?? 0;

    if (this.showEditBoostSettings) {
      const minAllowed = Math.max(originalBudget, minBudget);
      prop.budgetError = budget < minAllowed;
    } else {
      prop.budgetError = budget < minBudget;
    }


    // for both normal and edit mode
    this.hasEditError = this.showEditBoostSettings
      ? this.editBoostedList.some(p => p.budgetError)
      : this.boostedList.some(p => p.budgetError);


    const clampedBudget = Math.max(minBudget, Math.max(originalBudget, budget));
    prop.budget = clampedBudget;

    const tier = this.budgetDayTiers.find(t => clampedBudget >= t.min && clampedBudget <= t.max);
    if (tier && prop.days > tier.maxDays) {
      prop.days = tier.maxDays;
    }
    this.updateMaxDays(prop);
    if (this.showEditBoostSettings) {
      this.updateEditAmounts();
    } else {
      this.updateAmounts();
    }
  }

  // ─── Toast notification ────────────────────────────────────
  toastMessage = '';
  toastType: 'good' | 'warn' | '' = '';
  toastVisible = false;
  private toastTimer: any;
  private toastDebounce: any;

  private showToast(message: string, type: 'good' | 'warn'): void {
    clearTimeout(this.toastDebounce);
    this.toastDebounce = setTimeout(() => {
      clearTimeout(this.toastTimer);
      this.toastMessage = message;
      this.toastType = type;
      this.toastVisible = true;
      this.toastTimer = setTimeout(() => {
        this.toastVisible = false;
      }, 3000);
    }, 1000);
  }

  private checkToast(prop: BoostProperty): void {
    const tier = this.budgetDayTiers.find(t => prop.budget >= t.min && prop.budget <= t.max);
    if (!tier) return;
    if (prop.days >= tier.maxDays) {
      this.showToast('Increase budget for better property visibility.', 'warn');
    } else {
      this.showToast('Your property will be visible to max users.', 'good');
    }
  }

  changeDays(index: number, delta: number): void {
    const list = this.showEditBoostSettings ? this.editBoostedList : this.boostedList;
    const prop = list[index];
    const newDays = prop.days + delta;

    if (newDays < 1) return;
    if (newDays > 30) return;

    const currentTier = this.budgetDayTiers.find(t => prop.budget >= t.min && prop.budget <= t.max);
    if (delta > 0 && currentTier && newDays > currentTier.maxDays) {
      const nextTier = this.budgetDayTiers.find(t => t.min > currentTier.max);
      if (nextTier) {
        prop.budget = prop.budget + nextTier.avgPerDay;
        const minBudget = (prop as any).minBudget ?? 150;
        const originalBudget = (prop as any).originalBudget ?? 0;
        prop.budget = Math.max(prop.budget, minBudget, originalBudget);
      }
    }

    prop.days = newDays;
    this.updateMaxDays(prop);
    if (this.showEditBoostSettings) {
      this.updateEditAmounts();
    } else {
      this.updateAmounts();
    }
    this.checkToast(prop);
  }


  removeProperty(index: number): void {
    if (this.showEditBoostSettings) {
      // edit mode — put back to boostedPropertiesList pool
      this.editBoostedList.splice(index, 1);
      this.updateEditUnboosted();
      this.updateEditAmounts();
    } else {
      // normal mode
      this.boostedList.splice(index, 1);
      const boostedIds = new Set(this.boostedList.map(p => p.id));
      this.allProperties = this.boostPropertyList
        .filter((p: any) => !boostedIds.has(p.property_id))
        .map((p: any) => ({
          id: p.property_id,
          title: p.property_name,
          location: p.localityName ? `${p.localityName}, ${p.cityName}` : p.cityName,
          image: p.coverimage ?? '',
        }));
      this.updateUnboosted();
      this.updateAmounts();
    }
  }
  editUnboostedProperties: any[] = [];

  private updateEditUnboosted(): void {
    const editIds = new Set(this.editBoostedList.map(p => p.id));
    this.editUnboostedProperties = this.boostedPropertiesList.filter(p => !editIds.has(p.property_id));
  }
  openBottomSheet(): void {
    this.sheetSelected.clear();
    this.sheetOpen = true;
  }

  onOverlayClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (target.classList.contains('pb__bs-overlay')) {
      this.sheetOpen = false;
    }
  }

  isSheetSelected(id: number): boolean {
    return this.sheetSelected.has(id);
  }

  toggleSheetSelect(id: number): void {
    if (this.sheetSelected.has(id)) {
      this.sheetSelected.delete(id);
    } else {
      this.sheetSelected.add(id);
    }
  }

  addFromSheet(): void {
    if (this.showEditBoostSettings) {
      this.editUnboostedProperties.forEach(p => {
        if (this.sheetSelected.has(p.property_id)) {
          const isPerDay = p.boostPerDay === 'true' || p.boostPerDay === true;
          const existingBudget = parseFloat(p.boostedPrice) || 0;
          const existingDays = parseInt(p.daysLeft) || 0;
          const minBudget = isPerDay ? 85 : 150;
          const newProp: BoostProperty = {
            id: p.property_id,
            title: p.property_name,
            location: p.localityName ? `${p.localityName}, ${p.cityName}` : p.cityName ?? '',
            image: p.coverImage ?? '',
            budget: Math.max(minBudget, existingBudget),
            days: Math.max(1, existingDays),
            checked: isPerDay,
            checkboxDisabled: isPerDay,
            maxDays: 0,
            originalBudget: existingBudget,
            minBudget: minBudget,
            boostPerDay: isPerDay,
            payableAmount: 0,
          };
          this.updateMaxDays(newProp);
          this.editBoostedList.push(newProp);
        }
      });
      this.sheetSelected.clear();
      this.sheetOpen = false;
      this.updateEditUnboosted();
      this.updateEditAmounts();
    } else {
      // existing normal flow
      this.unboostedProperties.forEach(p => {
        if (this.sheetSelected.has(p.id)) {
          const newProp: BoostProperty = {
            ...p, budget: 500, days: 7, checked: false, maxDays: 0,
          };
          this.updateMaxDays(newProp);
          this.boostedList.push(newProp);
        }
      });
      this.sheetSelected.clear();
      this.sheetOpen = false;
      this.updateUnboosted();
      this.updateAmounts();
    }
  }

  goToReview(): void {


    console.log('editTotalPayable:', this.editTotalPayable, 'currentPage:', this.currentPage, 'showEditBoostSettings:', this.showEditBoostSettings);
    const list = this.showEditBoostSettings ? this.editBoostedList : this.boostedList;
    if (list.length === 0) {
      swal.fire({ title: 'Please add at least one property to boost!', icon: 'error', showConfirmButton: false, timer: 2000 });
      return;
    }

    // edit mode with zero payable — skip review, go directly
    if (this.showEditBoostSettings && this.editTotalPayable === 0) {
      const hasChanges = this.editBoostedList.some(p =>
        p.budget !== p.originalBudget || p.days !== (p as any).originalDays
      );
      if (!hasChanges) {
        swal.fire({ title: 'No changes made!', text: 'Please update budget or days to proceed.', icon: 'warning', showConfirmButton: false, timer: 2500 });
        return;
      }
      this.callBoostWithoutPay(this.editBoostedList);
      return;
    }

    this.currentPage = 'review';
    console.log('after:', this.currentPage);

  }

  backToBoostSettings(): void {
    this.currentPage = 'boost';
  }

  backToSelectProperties(): void {
    this.showBoostSettings = false;
    this.propertiesForBoost = true;
    this.currentPage = 'boost';
  }



  proceedToPayment(): void {
    const orderData: CreateBoostOrderPayload = {
      user_id: this.userId,
      user_number: this.userNumber,
      properties: this.boostedList.map(p => ({
        property_id: p.id,
        budget_per_day: p.budget,
        duration_days: p.days,
        total_amount: p.checked ? p.budget * p.days : p.budget,
        price_per_day: p.checked,
      })),
      total_amount: this.subtotalAmount,
    };

    this.eliteService.createOrder(orderData).subscribe({
      next: (res: any) => {
        if (!res.status) {
          swal.fire({ title: 'Failed to create order. Please try again.', icon: 'error', showConfirmButton: false, timer: 2000 });

          return;
        }

        const options = {
          key: res.key_id,
          amount: res.amount,
          currency: res.currency,
          name: 'Homes247',
          image: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_mobile/images/logo1_1.png',
          description: 'Property Boost',
          order_id: res.order_id,
          prefill: { contact: this.userNumber },
          theme: { color: '#971b47' },
          handler: (response: any) => {
            const verifyData: VerifyPaymentPayload = {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              user_id: this.userId,
              user_number: this.userNumber,
              properties: orderData.properties,
            };

            this.eliteService.verifyPayment(verifyData).subscribe({
              next: (verifyRes: any) => {
                if (verifyRes.status) {
                  swal.fire({ title: 'Payment Successful!', text: 'Your properties are now boosted.', icon: 'success', showConfirmButton: false, timer: 2500 });

                  this.refreshSubscriptions();
                  this.location.back()

                } else {
                  swal.fire({ title: 'Verification failed. Please contact support.', icon: 'error', showConfirmButton: false, timer: 2000 });

                }
              },
              error: () => swal.fire({ title: 'Verification error. Please contact support.', icon: 'error', showConfirmButton: false, timer: 2000 }),
            });
          },

          modal: { ondismiss: () => console.log('Razorpay popup closed.') },
        };

        const rzp = new (window as any).Razorpay(options);
        rzp.on('payment.failed', (response: any) => {
          console.error('Payment failed:', response);
          swal.fire({ title: 'Payment Failed. Please try again.', icon: 'error', showConfirmButton: false, timer: 2000 });

        });
        rzp.open();
      },
      error: () => swal.fire({ title: 'Something went wrong. Please try again.', icon: 'error', showConfirmButton: false, timer: 1500 }),
    });


  }
  // force refresh helper
  private refreshSubscriptions(): void {
    this.userSubscribedPlans = []; // clear cache
    this.subscriptionManagement(); // re-fetch
  }
  // ─────────────────────────────────────────────────────────────
  // MANAGE PLANS SCREEN — existing logic (DO NOT CHANGE)
  // ─────────────────────────────────────────────────────────────

  editBoostedList: any[] = [];
  showEditBoostSettings = false;
  editSubtotalAmount = 0;
  editGstAmount = 0;
  editTotalPayable = 0;

  private updateEditAmounts(): void {
    this.editBoostedList = this.editBoostedList.map(p => {
      const newTotal = p.checked ? p.budget * p.days : p.budget;
      // const originalTotal = p.originalBudget ?? 0;
      const originalTotal = p.originalTotal ?? 0;
      return { ...p, payableAmount: Math.max(0, newTotal - originalTotal) };
    });
    const subtotal = this.editBoostedList.reduce((sum, p) => sum + (p.payableAmount ?? 0), 0);
    this.editSubtotalAmount = subtotal;
    this.editGstAmount = Math.round(subtotal * 0.18);
    this.editTotalPayable = subtotal + this.editGstAmount;
    console.log('editTotalPayable updated:', this.editTotalPayable); // ← add
  }

  readonly nextRenewal: RenewalInfo = {
    date: 'Aug 12, 2025',
    planName: 'Buyer & Tenant Plan',
  };

  readonly plans: Plan[] = [
    {
      title: 'Buyer & Tenant',
      theme: 'relax_max',
      typeLabel: 'Relax Max',
      isActive: true,
      daysLeft: 18,
      validTill: 'Aug 12, 2025',
      contactsUsed: 12,
      contactsTotal: 30,
      remainText: '18 more connections remain.',
      actionLabel: 'Renew Plan',
    },
    {
      title: 'Owner & Seller',
      theme: 'relax',
      typeLabel: 'Relax',
      isActive: true,
      daysLeft: 5,
      validTill: 'Aug 05, 2025',
      contactsUsed: 3,
      contactsTotal: 5,
      remainText: '2 more listing can be added.',
      actionLabel: 'Upgrade Plan',
    },
  ];

  readonly boostedProperties: BoostedProperty[] = [
    { name: '2BHK Apartment', location: 'BTM Layout, Bangalore', status: 'active', daysLeft: 7 },
    { name: '1BHK Villa', location: 'BTM Layout, Bangalore', status: 'active', daysLeft: 2 },
    { name: '1BHK Villa', location: 'BTM Layout, Bangalore', status: 'expired', daysLeft: 0 },
  ];

  userSubscribedPlans: any[] = [];



  getProgress(used: number, total: number): number {
    if (!total) return 0;
    return Math.round((used / total) * 100);
  }

  goBack(): void {
    this.location.back();
  }

  onRenewPlan(plan: Plan): void {
    this.router1.navigate(['/userauth/profile', this.userId], {
      queryParams: { view: 'recharge', eliteId: plan }
    });
  }

  onUpgradePlan(plan: Plan): void {
    console.log('Upgrade plan:', plan.title);
  }
  budgetDayTiers: BudgetDayTier[] = [];
  relaxDataFilter(): void {
    this.eliteService.relaxDataFilter().subscribe((res: any) => {
      const tiersObj = res['subscriptionDetails']['budgetDayTiers'];
      this.budgetDayTiers = Object.values(tiersObj).map((t: any) => ({
        ...t,
        max: t.max === 'Infinity' ? Infinity : t.max // ← fix string "Infinity"
      }));
    });
  }
  // Called from Manage Plans "Add Boost Property" button
  boostPropertyList: any[] = [];
  onAddBoostProperty(): void {
    this.planView = false;
    this.addView = false;
    this.propertiesForBoost = true;
    this.showBoostSettings = false;
    this.activeBoostedView = false;
    this.currentPage = 'boost';

    if (this.boostPropertyList.length > 0) {
      this.filterProperties();
      return; // ← skip API if already loaded
    }

    const param = { 'user_id': this.userId, 'user_number': this.userNumber, 'postType': '1' };

    this.eliteService.boostPropertyList(param).subscribe(res => {
      this.boostPropertyList = res['data'].map((p: any) => ({ ...p, selected: false }));
      this.filterProperties();
    });
  }

  onRenewProperty(prop: BoostedProperty): void {
    console.log('Renew property:', prop.name);
  }

  activePlans: any[] = [];
  pendingPlans: any[] = [];
  userSubscribedPlansExpiry: any = []
  showUpcomingPlans = false;
  totalSubscriptions
  subscriptionManagement(): void {

    // already loaded — skip API
    if (this.userSubscribedPlans.length > 0) return;


    const param = { userId: this.userId, userNumber: this.userNumber };
    this.eliteService.subscriptionManagement(param).subscribe(response => {
      if (response['status'] == 'True') {
        this.userSubscribedPlans = response['data'];
        this.activePlans = this.userSubscribedPlans
          .filter(p => p.subscriptionStatus == 'Active' && p.eliteUserId != '10')
          .map(p => ({ ...p, progressWidth: Math.round((p.usedCredits / p.totalCredits) * 100) }));
        console.log('this')
        console.log(this.activePlans)
        this.pendingPlans = this.userSubscribedPlans
          .filter(p => p.subscriptionStatus == 'pending' && p.eliteUserId != '10')
          .map(p => ({ ...p, progressWidth: Math.round((p.usedCredits / p.totalCredits) * 100) }));
        console.log('this.pendingPlans')
        console.log(this.pendingPlans)
        this.userSubscribedPlansExpiry = response['lastExpiry'];
        this.totalSubscriptions = response['totalSubscriptions'];
      }
    });
  }

  // ─────────────────────────────────────────────────────────────
  // LIFECYCLE
  // ─────────────────────────────────────────────────────────────

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const view = params['view'];
      if (view) {
        this.planView = view === 'planView';
        this.addView = view === 'addView';
        this.propertiesForBoost = view === 'propertiesForBoost';
        this.activeBoostedView = view === 'activeBoostedProperties';
      } else {
        const fragment = this.route.snapshot.fragment;
        this.planView = fragment === 'planView';
        this.addView = fragment === 'addView';
        this.propertiesForBoost = fragment === 'propertiesForBoost';
        this.activeBoostedView = fragment === 'activeBoostedProperties';
      }
      this.showBoostSettings = false;
      this.showEditBoostSettings = false;
      this.userId = localStorage.getItem('userID');
      this.userNumber = localStorage.getItem('userNumber');
      if (this.activeBoostedView) {
        this.loadBoostedProperties();
      }
    });

    this.route.fragment.subscribe(fragment => {
      if (fragment && !this.route.snapshot.queryParams['view']) {
        this.planView = fragment === 'planView';
        this.addView = fragment === 'addView';
        this.propertiesForBoost = fragment === 'propertiesForBoost';
        this.activeBoostedView = fragment === 'activeBoostedProperties';
        this.showBoostSettings = false;
        this.showEditBoostSettings = false;
        this.userId = localStorage.getItem('userID');
        this.userNumber = localStorage.getItem('userNumber');
        if (this.activeBoostedView) {
          this.loadBoostedProperties();
        }
      }
    });



    this.calcPill();
    this.subscriptionManagement();
  }

  ngAfterViewInit(): void {
    this.calcPill();
  }

  @HostListener('window:resize')
  onResize(): void {
    this.calcPill();
  }


  // ─── Active Boosted Properties Screen ──────────────────────
  activeBoostedView = false;
  boostedPropertiesList: any[] = [];
  selectedBoostIds: Set<number> = new Set();
  selectedBoostCount = 0;

  isBoostSelected(id: number): boolean {
    return this.selectedBoostIds.has(id);
  }

  toggleBoostSelect(id: number): void {
    if (this.selectedBoostIds.has(id)) {
      this.selectedBoostIds.delete(id);
    } else {
      this.selectedBoostIds.add(id);
    }
    this.selectedBoostCount = this.selectedBoostIds.size;
  }

  loadBoostedProperties(): void {
    const param = { Userid: this.userId };
    this.eliteService.boostedProperties(param).subscribe(res => {
      this.boostedPropertiesList = res['boostedProperties'];
      console.log(this.boostedPropertiesList)

    });
  }

  onRenewBoostedProperty(prop: any): void {
    // expired property — open edit boost with fresh values
    this.planView = false
    this.selectedBoostIds.clear();
    this.selectedBoostIds.add(prop.property_id);
    this.selectedBoostCount = 1;
    this.proceedToEditBoost();
  }

  proceedToEditBoost(): void {
    const selected = this.boostedPropertiesList.filter(p => this.selectedBoostIds.has(p.property_id));
    // build editBoostedList — coming in next screen implementation
    this.editBoostedList = selected.map((p: any) => {
      const isExpired = p.status === 'expired';
      const existingBudget = isExpired ? 0 : parseFloat(p.boostedPrice) || 0;
      const existingDays = isExpired ? 0 : parseInt(p.daysLeft) || 0;
      const isPerDay = p.boostPerDay === 'true' || p.boostPerDay === true;
      const minBudget = isPerDay ? 85 : 150;
      const originalTotal = isPerDay ? existingBudget * existingDays : existingBudget;

      const prop: BoostProperty = {
        id: p.property_id,
        title: p.property_name,
        location: p.localityName ? `${p.localityName}, ${p.cityName}` : p.cityName ?? '',
        image: p.coverImage ?? '',
        budget: Math.max(minBudget, existingBudget),
        days: Math.max(1, existingDays),
        checked: isPerDay,
        checkboxDisabled: isPerDay,
        maxDays: 0,
        originalBudget: existingBudget,
        originalDays: existingDays,
        minBudget: minBudget,
        boostPerDay: isPerDay,
        payableAmount: 0,
        originalTotal: originalTotal,
      };

      console.log(prop)
      this.updateMaxDays(prop);
      return prop;
    });

    this.activeBoostedView = false;
    this.showEditBoostSettings = true;
    console.log('editBoostedList:', this.editBoostedList); // ← add this
    this.updateEditAmounts();
    console.log('after amounts:', this.editBoostedList[0]?.payableAmount); // ← add this
    this.updateEditUnboosted();
  }
  otploader: boolean = false

  proceedToEditPayment(): void {
    // alert('h')
    const paidProperties = this.editBoostedList.filter(p => (p.payableAmount ?? 0) > 0);
    const freeProperties = this.editBoostedList.filter(p => (p.payableAmount ?? 0) === 0);

    // if all zero — just call boostWithoutPay directly
    if (paidProperties.length === 0) {
      this.callBoostWithoutPay(freeProperties);
      return;
    }

    // has paid properties — go through Razorpay first
    const orderData = {
      user_id: this.userId,
      user_number: this.userNumber,
      properties: paidProperties.map(p => ({
        property_id: p.id,
        new_budget: p.budget,
        new_days: p.days,
        payable_amount: p.payableAmount,
      })),
      total_amount: this.editTotalPayable,
    };

    this.eliteService.createUpgradeOrder(orderData).subscribe({
      next: (res: any) => {
        if (!res.status) {
          swal.fire({ title: 'Failed to create order. Please try again.', icon: 'error', showConfirmButton: false, timer: 2000 });

          return;
        }

        const options = {
          key: res.key_id,
          amount: res.amount,
          currency: res.currency,
          name: 'Homes247',
          image: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/subscription%20management/homesBannerLogo.svg',
          description: 'Property Boost Upgrade',
          order_id: res.order_id,
          prefill: { contact: this.userNumber },
          theme: { color: '#971b47' },
          handler: (response: any) => {
            const verifyData = {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              user_id: this.userId,
              user_number: this.userNumber,
              properties: orderData.properties,
            };

            this.eliteService.verifyPayment(verifyData).subscribe({
              next: (verifyRes: any) => {
                if (verifyRes.status) {
                  // payment success — now handle free ones if any
                  if (freeProperties.length > 0) {
                    this.callBoostWithoutPay(freeProperties, true);
                  } else {
                    swal.fire({ title: 'Boost Upgraded Successfully!', icon: 'success', showConfirmButton: false, timer: 2500 });

                    this.activeBoostedView = true;
                    this.showEditBoostSettings = false;
                    this.loadBoostedProperties();
                  }
                  this.location.back()
                } else {
                  swal.fire({ title: 'Verification failed. Please contact support.', icon: 'error', showConfirmButton: false, timer: 2000 });

                }
              },
              error: () => swal.fire({ title: 'Verification error. Please contact support.', icon: 'error', showConfirmButton: false, timer: 2000 }),
            });
          },
          modal: { ondismiss: () => console.log('Razorpay popup closed.') },
        };

        const rzp = new (window as any).Razorpay(options);
        rzp.on('payment.failed', (response: any) => {
          console.error('Payment failed:', response);
          swal.fire({ title: 'Payment Failed. Please try again.', icon: 'error', showConfirmButton: false, timer: 2000 });

        });
        rzp.open();
      },
      error: () => swal.fire({ title: 'Something went wrong. Please try again.', icon: 'error', showConfirmButton: false, timer: 1500 }),
    });


  }

  private callBoostWithoutPay(properties: BoostProperty[], afterPayment = false): void {
    const payload = {
      user_id: this.userId,
      user_number: this.userNumber,
      properties: properties.map(p => ({
        property_id: p.id,
        new_days: p.days,
        new_budget: p.budget,
      })),
    };

    this.eliteService.boostWithoutPay(payload).subscribe({
      next: (res: any) => {
        if (res.status) {
          swal.fire({ title: afterPayment ? 'Boost Upgraded Successfully!' : 'Boost Updated Successfully!', icon: 'success', showConfirmButton: false, timer: 2500 });

          this.refreshSubscriptions();
          this.activeBoostedView = true;
          this.showEditBoostSettings = false;
          this.loadBoostedProperties();
        } else {
          swal.fire({ title: 'Update failed. Please contact support.', icon: 'error', showConfirmButton: false, timer: 2000 });

        }
      },
      error: () => swal.fire({ title: 'Something went wrong. Please try again.', icon: 'error', showConfirmButton: false, timer: 1500 }),
    });
  }

  backToActiveBoosted(): void {
    this.showEditBoostSettings = false;
    this.activeBoostedView = true;
  }
  onCheckboxChange(index: number): void {
    if (this.showEditBoostSettings) {
      this.updateEditAmounts();
    } else {
      this.updateAmounts();
    }
  }

  goToRecharge(eliteId: number) {
    this.router1.navigate(['/userauth/profile', this.userId], {
      queryParams: { view: 'properties', planID: eliteId }
    });
  }

  xBackBtn() {
    this.location.back()
  }




















}