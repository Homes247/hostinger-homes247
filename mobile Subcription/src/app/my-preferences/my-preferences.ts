import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ElitedataService } from '../elitedata.service';

type ViewState = 'empty' | 'setup' | 'list';

// Backend sends name and id as two separate fields per property (not merged
// into one object). This table is the ONLY place that pairing lives - if
// backend adds a new field, add one line here, nothing else changes.
const FIELD_PAIRS = [
  { nameKey: 'locality', idKey: 'localityid' },
  { nameKey: 'city', idKey: 'cityId' },
  { nameKey: 'amenities_name', idKey: 'amenities' },
  { nameKey: 'propertyType_name', idKey: 'propertytype' },
  { nameKey: 'bhk_numbers', idKey: 'bedroomId' }
];

// Only the landing PAGE differs per category - base URLs live here.
const CATEGORY_BASE_CONFIG: any = {
  2: {
    // Individual
    base: 'http://192.168.0.185:4000/projects-in-bangalore'
  },
  3: {
    // Rental
    base: 'http://192.168.0.185:4000/rent/house-for-rent-in-bangalore'
  },
  4: {
    // PG
    base: 'http://192.168.0.185:4000/pgcl/pg-for-rent-in-bangalore'
  },
  5: {
    // Commercial - base path depends on Sale vs Lease/Rent.
    // NOTE: no category_id 5 example exists in the current flat response -
    // this uses search_type as a guess until backend confirms the real field.
    dynamicBase: true,
    saleBase: 'http://192.168.0.185:4000/cll/commercial-properties-for-sale-in-bangalore',
    rentBase: 'http://192.168.0.185:4000/cll/commercial-properties-for-rent-in-bangalore'
  }
};

function toArray(val: any): any[] {
  if (val === null || val === undefined || val === '') return [];
  return Array.isArray(val) ? val : [val];
}

function formatBudget(min: any, max: any): string {
  const fmt = (n: number) => (n >= 10000000 ? `₹${(n / 10000000).toFixed(1)}Cr` : `₹${(n / 100000).toFixed(1)}L`);
  if (min != null && max != null) return `${fmt(min)} - ${fmt(max)}`;
  if (max != null) return `Under ${fmt(max)}`;
  if (min != null) return `Above ${fmt(min)}`;
  return '';
}

@Component({
  selector: 'app-my-preferences',
  imports: [CommonModule, FormsModule],
  templateUrl: './my-preferences.html',
  styleUrl: './my-preferences.css',
})
export class MyPreferences implements OnInit {

  view: ViewState = 'empty';

  preferences: any[] = [];

  textareaValue = '';
  notifyWhatsapp = false;
  notifyCall = false;
  editingId: string | null = null;

  loading = false;
  saving = false;

  suggestions: string[] = [];

  constructor(public eliteService: ElitedataService, private location: Location,) { }

  ngOnInit(): void {
    this.dataFilters()
    this.fetchPreferences();
  }
  dataFilters() {
    this.eliteService.relaxDataFilter().subscribe((res: any) => {
      const resDeta = res.subscriptionDetails;
      this.suggestions = resDeta.searchSuggestion

    });
  }
  // ===================== FETCH =====================

  fetchPreferences(): void {
    this.loading = true;
    const userId = localStorage.getItem('userID');
    this.eliteService.myPreferenceData({ userId }).subscribe({
      next: (res: any) => {
        const rawList = res && res.data ? res.data : [];
        this.preferences = rawList.map((item: any) => this.decoratePreference(item));
        this.view = this.preferences.length ? 'list' : 'empty';
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  // Attach pre-computed display rows + redirect URL so the template never
  // calls a function or loops with a helper - it just reads plain arrays.
  private decoratePreference(item: any): any {
    const p = item?.params || {};
    const rows: any[] = [];

    FIELD_PAIRS.forEach(({ nameKey }) => {
      const names = toArray(p[nameKey]);
      if (!names.length) {
        return;
      }
      const text = names.join(', ');
      rows.push({ key: nameKey, text, isLong: text.length > 18 });
    });

    const budgetText = formatBudget(p.min, p.max);
    if (budgetText) {
      rows.push({ key: 'budget', text: budgetText, isLong: false });
    }

    return {
      ...item,
      displayRows: rows,
      redirectUrl: this.buildRedirectUrl(p.category_id, p),
      matchCount: item.propertyCount ?? 0
    };
  }

  // ===================== REDIRECT URL BUILDER =====================

  private buildRedirectUrl(categoryId: any, p: any): string {
    const config = CATEGORY_BASE_CONFIG[categoryId] || CATEGORY_BASE_CONFIG[String(categoryId)];
    if (!config) {
      return '';
    }

    let base = config.base;

    if (config.dynamicBase) {
      base = p.search_type === 'sale' ? config.saleBase : config.rentBase;
    }

    const parts: string[] = [];

    FIELD_PAIRS.forEach(({ idKey }) => {
      const ids = toArray(p[idKey]).filter((v: any) => v !== null && v !== undefined);
      if (ids.length) {
        parts.push(`${idKey.toLowerCase()}=${ids.join(',')}`);
      }
    });

    if (p.min != null) {
      parts.push(`min=${p.min}`);
    }
    if (p.max != null) {
      parts.push(`max=${p.max}`);
    }

    return parts.length ? `${base}?${parts.join('&')}` : base;
  }

  goToListing(url: string): void {
    if (!url) {
      return;
    }
    window.location.href = url;
  }

  // ===================== VIEW NAVIGATION =====================

  get isSaveEnabled(): boolean {
    return this.textareaValue.trim().length > 0;
  }

  goBack(): void {
    this.location.back()
  }

  openCreateFirst(): void {
    this.resetSetupState();
    this.view = 'setup';
  }

  openAddNew(): void {
    this.resetSetupState();
    this.view = 'setup';
  }

  private resetSetupState(): void {
    this.textareaValue = '';
    this.notifyWhatsapp = false;
    this.notifyCall = false;
    this.editingId = null;
  }

  applySuggestion(suggestion: string): void {
    this.textareaValue = suggestion;
  }

  toggleWhatsapp(): void {
    this.notifyWhatsapp = !this.notifyWhatsapp;
  }

  toggleCall(): void {
    this.notifyCall = !this.notifyCall;
  }

  cancelSetup(): void {
    this.view = this.preferences.length ? 'list' : 'empty';
  }

  // ===================== SAVE (CREATE / EDIT) =====================

  // savePreference(): void {
  //   if (!this.isSaveEnabled || this.saving) {
  //     return;
  //   }
  //   const userId = localStorage.getItem('userID');

  //   const payload: any = {
  //     userID: userId,
  //     query: this.textareaValue
  //   };

  //   this.saving = true;

  //   if (this.editingId) {
  //     payload.preferenceId = this.editingId;
  //     this.eliteService.userMyPreferenceEdit(payload).subscribe({
  //       next: () => {
  //         this.saving = false;
  //         this.fetchPreferences();
  //       },
  //       error: () => {
  //         this.saving = false;
  //       }
  //     });
  //   } else {
  //     this.eliteService.userMyPreference(payload).subscribe({
  //       next: () => {
  //         this.saving = false;
  //         this.fetchPreferences();
  //       },
  //       error: () => {
  //         this.saving = false;
  //       }
  //     });
  //   }
  // }


  savePreference(): void {
    if (!this.isSaveEnabled || this.saving) {
      return;
    }
    const userId = localStorage.getItem('userID');

    const payload: any = {
      userID: userId,
      query: this.textareaValue
    };

    if (this.editingId) {
      payload.preferenceId = this.editingId;
    }

    this.saving = true;

    this.eliteService.userMyPreference(payload).subscribe({
      next: () => {
        this.saving = false;
        this.fetchPreferences();
      },
      error: () => {
        this.saving = false;
      }
    });
  }

  editPreference(pref: any): void {
    this.editingId = pref.id;
    this.textareaValue = pref.raw_input;
    this.notifyWhatsapp = !!pref.params?.notifyVia?.whatsapp;
    this.notifyCall = !!pref.params?.notifyVia?.call;
    this.view = 'setup';
  }

  // ===================== DELETE =====================

  deletePreference(pref: any): void {
    const userId = localStorage.getItem('userID');

    const payload: any = {
      userId: userId,
      preferenceId: pref.id
    };

    this.eliteService.deleteUserPreference(payload).subscribe({
      next: () => {
        this.fetchPreferences();
      }
    });
  }
}