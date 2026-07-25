// import { Component } from '@angular/core';


// export class AiPropertyFinder {
// goBack() {
// throw new Error('Method not implemented.');
// }
// sliderTxtInput(arg0: string) {
// throw new Error('Method not implemented.');
// }
// dropdownOpen: any;
// isLoading: any;
// suggestions: any;
// askAiInput: any;
// skeletonRows: any;
// activeIndex: any;
// pickSuggestion(_t170: any) {
// throw new Error('Method not implemented.');
// }
// onKeyUp($event: KeyboardEvent) {
// throw new Error('Method not implemented.');
// }
// onFocus() {
// throw new Error('Method not implemented.');
// }
// Run() {
// throw new Error('Method not implemented.');
// }

// }
// ai-property-finder.component.ts
import {
  Component,
  OnInit,
  OnDestroy,
  HostListener,
  ElementRef,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Subscription } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  catchError,
} from 'rxjs/operators';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DataService } from '../data.service';
import { HomeSidenavbar } from '../home-sidenavbar/home-sidenavbar';

// ─── Types ────────────────────────────────────────────────────────────────────

interface SuggestionItem {
  value?: string;
  [key: string]: any;   // dynamic fields — residential & commercial have different shapes
}

interface ApiResponse {
  search_type: string;
  smart_query?: string | null;
  suggestions: { [key: string]: SuggestionItem };
  [key: string]: any;   // top-level fields also vary by search_type
}

interface Suggestion {
  base: string;
  tail: string;
  full: string;
  item: SuggestionItem;
  searchType: string;
}

// ─── URL map ──────────────────────────────────────────────────────────────────
// const BASE_URLS: { [key: string]: string } = {
//   buy: `https://www.homes247.in/${this.matched_token}/property-sale`,
//   rent: `https://www.homes247.in/rent/house-for-rent-in-${this.matched_token}`,
//   pg: `https://www.homes247.in/pgcl/pg-for-rent-in-${this.matched_token}`,
//   commercial_rent: `https://www.homes247.in/cll/commercial-properties-for-rent-in-${this.matched_token}`,
//   commercial_buy: `https://www.homes247.in/cll/commercial-properties-for-sale-in-${this.matched_token}`,
// };



// Keys to always skip when building query params
const SKIP_KEYS = new Set(['value']);


const API_URL = 'https://aisearch.homes247.in/api/smart_search';
const MIN_CHARS = 2;

// ─────────────────────────────────────────────────────────────────────────────
@Component({
  selector: 'app-ai-property-finder',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HomeSidenavbar],
  templateUrl: './ai-property-finder.html',
  styleUrls: ['./ai-property-finder.css'],
})
export class AiPropertyFinderComponent implements OnInit, OnDestroy {


  askAiInput = '';
  dropdownOpen = false;
  isLoading = false;
  suggestions: Suggestion[] = [];
  activeIndex = -1;
  readonly skeletonRows = [1];

  private userCity = '';
  private lastApiResponse: ApiResponse | null = null;
  private keyStream$ = new Subject<string>();
  private sub!: Subscription;

  constructor(
    private DataService: DataService,
    private http: HttpClient,
    private host: ElementRef,
  ) { }

  // ── Lifecycle ─────────────────────────────────────────────────────────────
  ngOnInit(): void {
    this.detectUserCity();

    this.sub = this.keyStream$
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        switchMap((query) => {
          if (!query || query.trim().length < MIN_CHARS) {
            this.isLoading = false;
            this.suggestions = [];
            this.dropdownOpen = false;
            return of(null);
          }
          return this.http
            .post<ApiResponse>(API_URL, {
              query: query.trim(),
              city: this.userCity,
            })
            .pipe(catchError(() => of(null)));
        }),
      )
      .subscribe((res) => {
        this.isLoading = false;
        if (!res) { this.suggestions = []; return; }

        this.lastApiResponse = res;

        const suggestionItems: SuggestionItem[] = Object.values(res.suggestions ?? {});
        this.suggestions = suggestionItems.slice(0, 6).map(item =>
          this.buildSuggestion(item, res.search_type)
        );
        this.dropdownOpen = true;
        // this.dropdownOpen = this.suggestions.length > 0;

        this.matched_token = res['matched_token'];
      });
  }
  matched_token: any = 'bangalore';
  // ─── As a method ──────────────────────────────────────────────────────────────
  getBaseUrl(type: string): string {
    const token = this.matched_token ?? 'bangalore';
    const BASE_URLS: { [key: string]: string } = {
      buy: `https://www.homes247.in/${token.toLowerCase()}/property-sale`,
      rental: `https://www.homes247.in/rent/house-for-rent-in-${token}`,
      pg: `https://www.homes247.in/pgcl/pg-for-rent-in-${token}`,
      commercial_rent: `https://www.homes247.in/cll/commercial-properties-for-rent-in-${token}`,
      commercial_buy: `https://www.homes247.in/cll/commercial-properties-for-sale-in-${token}`,
    };
    return BASE_URLS[type];
  }
  ngOnDestroy(): void { this.sub.unsubscribe(); }

  // ── City Detection — IP-based (works on HTTP + HTTPS) ─────────────────────
  private detectUserCity(): void {
    this.http.get<any>('https://ipapi.co/json/').subscribe({
      next: (data) => {
        this.userCity = data?.city || data?.region || '';
        console.log('[AI Search] City detected:', this.userCity);
      },
      error: () => {
        console.warn('[AI Search] City detection failed, proceeding without city.');
      }
    });
  }

  // ── Input handlers ────────────────────────────────────────────────────────
  onKeyUp(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowDown':
        this.activeIndex = Math.min(this.activeIndex + 1, this.suggestions.length - 1);
        return;
      case 'ArrowUp':
        this.activeIndex = Math.max(this.activeIndex - 1, 0);
        return;
      case 'Enter':
        if (this.activeIndex >= 0 && this.suggestions[this.activeIndex]) {
          this.pickSuggestion(this.suggestions[this.activeIndex]);
        } else {
          this.Run();
        }
        return;
      case 'Escape':
        this.closeDropdown();
        return;
    }

    const val = this.askAiInput;
    // Only trigger loading if the actual value changed
    if (val === this.lastValue) return;
    this.lastValue = val;

    if (val.trim().length >= MIN_CHARS) {
      this.isLoading = true;
      this.dropdownOpen = true;
    }
    this.activeIndex = -1;
    this.keyStream$.next(val);
  }

  private lastValue = '';


  onFocus(): void {
    if (this.suggestions.length > 0) this.dropdownOpen = true;
  }

  pickSuggestion(suggestion: Suggestion): void {
    this.askAiInput = suggestion.full;
    this.closeDropdown();
    this.navigateWithParams(suggestion.searchType, suggestion.item);
  }

  closeDropdown(): void {
    this.dropdownOpen = false;
    this.activeIndex = -1;
  }

  @HostListener('document:click', ['$event'])
  onOutsideClick(e: MouseEvent): void {
    if (!this.host.nativeElement.contains(e.target)) this.closeDropdown();
  }

  // ── Run button ────────────────────────────────────────────────────────────
  Run(): void {
    this.closeDropdown();

    if (this.lastApiResponse) {
      console.log('[AI Search] Run response:', this.lastApiResponse);
      // Build a flat object from top-level response fields (excluding meta keys)
      const topLevel: SuggestionItem = { ...this.lastApiResponse };
      this.navigateWithParams(this.lastApiResponse.search_type, topLevel);
    } else {
      this.DataService.AiGetParams(this.askAiInput).subscribe(() => { });
    }
  }

  sliderTxtInput(value: string): void {
    this.askAiInput = value;
    this.isLoading = true;
    this.dropdownOpen = true;
    this.keyStream$.next(value);
  }

  // ── Navigation ────────────────────────────────────────────────────────────
  private navigateWithParams(searchType: string, item: SuggestionItem): void {
    const baseUrl = this.resolveBaseUrl(searchType);
    const params = this.buildQueryParams(item);
    const queryString = params.toString();
    const finalUrl = queryString ? `${baseUrl}?${queryString}` : baseUrl;
    console.log('[AI Search] Navigating to:', finalUrl);
    window.open(finalUrl, '_blank');
  }

  private resolveBaseUrl(searchType: string): string {
    const type = (searchType ?? '').toLowerCase().trim();
    if (type === 'buy') return this.getBaseUrl('buy');
    if (type === 'rent') return this.getBaseUrl('rent');
    if (type === 'pg') return this.getBaseUrl('pg');
    if (type === 'commercial_rent' || type === 'commercial rent') return this.getBaseUrl('commercial_rent');
    if (type === 'commercial_buy' || type === 'commercial buy') return this.getBaseUrl('commercial_buy');
    if (type.includes('commercial')) return this.getBaseUrl('commercial_buy');
    return this.getBaseUrl('buy');
  }

  /**
   * DYNAMIC query param builder — works for ANY API response shape.
   *
   * Rules:
   *  ✅ Include  — any key with a real value (number, non-empty string, non-empty array)
   *  ❌ Skip     — key named "value" (display text, not a filter param)
   *  ❌ Skip     — null / undefined
   *  ❌ Skip     — empty string ''
   *  ❌ Skip     — empty array []
   *  ❌ Skip     — object values (nested objects are not valid query params)
   *  📋 Arrays  — each element appended as a separate param with the same key
   *               e.g. amenities_name=Gym&amenities_name=Pool
   *               e.g. commercialAmenities=Parking&commercialAmenities=Lift
   */
  private buildQueryParams(item: SuggestionItem): URLSearchParams {
    const params = new URLSearchParams();

    for (const key of Object.keys(item)) {

      // Skip the display text field
      if (SKIP_KEYS.has(key)) continue;

      const val = item[key];

      // Skip null / undefined
      if (val == null) continue;

      // Skip empty string
      if (val === '') continue;

      // Array — append each non-null, non-empty element
      if (Array.isArray(val)) {
        if (val.length === 0) continue;   // skip empty arrays
        val.forEach((element: any) => {
          if (element != null && element !== '') {
            params.append(key, String(element));
          }
        });
        continue;
      }

      // Skip plain objects (nested — not suitable as query params)
      if (typeof val === 'object') continue;

      // Primitive — string or number (include 0 as it's a valid price)
      params.set(key, String(val));
    }

    return params;
  }

  // ── Helpers ───────────────────────────────────────────────────────────────
  private buildSuggestion(item: SuggestionItem, searchType: string): Suggestion {
    const text = item.value ?? '';
    const q = this.askAiInput.trim();
    const idx = q ? text.toLowerCase()?.indexOf(q.toLowerCase()) : -1;
    if (!q || idx === -1) return { base: '', tail: text, full: text, item, searchType };
    const end = idx + q.length;
    return { base: text.slice(0, end), tail: text.slice(end), full: text, item, searchType };
  }

  goBack(): void {
    window.history.back();
  }

}