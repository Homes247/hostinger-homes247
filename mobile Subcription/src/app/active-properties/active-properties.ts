import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ElitedataService } from '../elitedata.service';

interface BoostedProperty {
  property_id: number;
  property_name: string;
  city_id: number;
  locality_id: number;
  cityName: string;
  localityName: string;
  bhk: string;
  property_type: string;
  active_status: string;
  category_id: number;
  total_image_count: number;
  square_feet: string | null;
  sharing_type: string | null;
  addBoost: number;
  boosted: boolean;
  expiry_date: string | null;
  coverImage: string;
  coverImagePath: string | null;
  payment_status: string;
}



@Component({
  selector: 'app-active-properties',
  imports: [CommonModule],
  templateUrl: './active-properties.html',
  styleUrl: './active-properties.css',
})
export class ActiveProperties {


  boostedPropertiesList: BoostedProperty[] = [];
  credits: number = 0;
  selectedPropertyIds: Set<number> = new Set();

  // Set these from your auth service / localStorage as needed
  userId: string = '';
  userNumber: string = '';

  isLoading: boolean = false;
  isApiLoading: boolean = false;

  constructor(
    private eliteService: ElitedataService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Pull userId / userNumber from localStorage or your auth service
    this.userId = localStorage.getItem('userID');
    this.userNumber = localStorage.getItem('userNumber');
    this.fetchBoostedProperties();
  }

  // ── Fetch property list ──────────────────────────────────────
  fetchBoostedProperties(): void {
    this.isLoading = true;
    const param = { 'user_id': this.userId, 'user_number': this.userNumber, 'postType': '0' };

    this.eliteService.boostPropertyList(param).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        if (res?.status === 'True') {
          this.boostedPropertiesList = res.data || [];
          this.credits = parseInt(res.credits, 10) || 0;
        }
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  // ── Selection logic ──────────────────────────────────────────
  toggleSelect(propertyId: number): void {
    if (this.selectedPropertyIds.has(propertyId)) {
      this.selectedPropertyIds.delete(propertyId);
    } else {
      this.selectedPropertyIds.add(propertyId);
    }
  }

  isSelected(propertyId: number): boolean {
    return this.selectedPropertyIds.has(propertyId);
  }

  get selectedCount(): number {
    return this.selectedPropertyIds.size;
  }

  // ── Button state ─────────────────────────────────────────────
  get exceedsCredits(): boolean {
    return this.selectedCount > this.credits;
  }

  get buttonLabel(): string {
    if (this.selectedCount === 0) return 'Select Properties';
    return this.exceedsCredits ? 'Buy Extra Credits' : 'Proceed To Verify';
  }

  // ── CTA action ───────────────────────────────────────────────
  onFooterAction(): void {
    if (this.selectedCount === 0) return;

    if (this.exceedsCredits) {
      this.router.navigate(['/homes-elite'], {
        fragment: '1'
      });
      return;
    }

    this.proceedToVerify();
  }

  proceedToVerify(): void {
    const selectedProperties = this.boostedPropertiesList
      .filter(p => this.selectedPropertyIds.has(p.property_id))
      .map(p => ({ property_id: p.property_id, category_id: p.category_id }));
    this.userId = localStorage.getItem('userID');
    this.userNumber = localStorage.getItem('userNumber');
    const param = {
      userId: this.userId,
      number: this.userNumber,
      properties: selectedProperties
    };

    this.isApiLoading = true;
    console.log(param)
    this.eliteService.checkPostPropertyCredits(param).subscribe({
      next: (response: any) => {
        this.isApiLoading = false;
        if (response?.status === 'True' || response?.status === true) {
          this.router.navigate([`/userauth/profile/${this.userId}`]);
        }
        // on failure — left blank as requested
      },
      error: () => {
        this.isApiLoading = false;
        // left blank as requested
      }
    });
  }

  // ── Navigation ───────────────────────────────────────────────
  goBack(): void {
    window.history.back();
  }
}
