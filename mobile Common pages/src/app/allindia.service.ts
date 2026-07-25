import { DOCUMENT, isPlatformServer } from '@angular/common';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { TransferState, makeStateKey } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable, of, Subject, throwError } from 'rxjs';
import { catchError, retry, shareReplay, tap, timeout, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AllindiaService {
  private REST_API_SERVERS = 'https://mbapi2.homes247.in/backendoptimized/';
  private REST_API_SERVER = 'https://mbapi2.homes247.in/backend/';
  private REST_API_SERVER_Recent_stories = 'https://mbgs.homes247.in/backend/';

  private REST_API_SERVER3 = 'https://superadmin.homes247.in/backend/';
  private ImageURL = 'https://img-mb.homes247.in/images/';

  imagesURL: string;

  constructor(
    private httpClient: HttpClient,
    private transferState: TransferState,
    @Inject(DOCUMENT) private doc,
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
  ) {
    this.imagesURL = this.ImageURL;
  }

  /**
   * SSR Helper with TransferState
   */
  private srv<T>(
    keyName: string,
    request: Observable<T>,
    fallback: any
  ): Observable<T> {

    const STATE_KEY = makeStateKey<T>(keyName);

    // Browser side
    if (this.transferState.hasKey(STATE_KEY)) {
      const savedData = this.transferState.get(STATE_KEY, fallback);
      this.transferState.remove(STATE_KEY);
      return of(savedData);
    }

    // 🚀 SERVER → DO NOT BLOCK
    if (isPlatformServer(this.platformId)) {
      return of(fallback);   // ✅ THIS IS IMPORTANT
    }

    // Browser API call
    return request;
  }

  createLinkForCanonicalURL() {

    const domain = 'https://www.homes247.in';

    let link: HTMLLinkElement = this.doc.querySelector("link[rel='canonical']") || this.doc.createElement('link');

    link.setAttribute('rel', 'canonical');

    // Use router URL instead of document.URL
    let path = this.router.url;

    // Remove query params & hash
    if (path.includes('?') || path.includes('#')) {
      path = path.split('?')[0].split('#')[0];
    }

    const finalUrl = domain + path;

    link.setAttribute('href', finalUrl);

    this.doc.head.appendChild(link);
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (typeof ErrorEvent !== 'undefined' && error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

  getstaticmeta(PAGEID) {
    const options = {
      params: new HttpParams({ fromString: 'pageid=' + PAGEID }),
    };
    const req = this.httpClient.get(this.REST_API_SERVER + 'staticseo?', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`static_meta_${PAGEID}`, req, {});
  }

  getrecentblogs() {
    const options = {
      params: new HttpParams({ fromString: 'source=2000' }),
    };
    const req = this.httpClient.get(this.REST_API_SERVER_Recent_stories + 'recent_stories?', options).pipe(retry(0), catchError(this.handleError));
    return this.srv('recent_blogs', req, []);
  }

  gettestimonials() {
    const req = this.httpClient.get(this.REST_API_SERVER + 'get_testimonial').pipe(retry(0), catchError(this.handleError));
    return this.srv('testimonials', req, []);
  }

  private allindiaAutoCache$: Observable<any> | null = null;
  private allindiaAuto2Cache$: Observable<any> | null = null;
  private allindiaAuto3Cache$: Observable<any> | null = null;


  allindiaAuto(): Observable<any> {
    if (this.allindiaAutoCache$) {
      return this.allindiaAutoCache$;
    }

    const apiRequest = this.httpClient.get(
      this.REST_API_SERVER + 'allautocomplete'
    ).pipe(
      shareReplay(1),
      catchError((err) => {
        console.error('API error:', err);
        this.allindiaAutoCache$ = null; // allow retry
        return of([]);
      })
    );

    this.allindiaAutoCache$ = apiRequest;

    return apiRequest;
  }

  allindiaAuto2(): Observable<any> {
    if (this.allindiaAuto2Cache$) {
      return this.allindiaAuto2Cache$;
    }

    const apiRequest = this.httpClient.get(
      this.REST_API_SERVER + 'allautocomplete_2'
    ).pipe(
      shareReplay(1),
      catchError((err) => {
        console.error('API error:', err);
        this.allindiaAuto2Cache$ = null; // allow retry
        return of([]);
      })
    );

    this.allindiaAuto2Cache$ = apiRequest;

    return apiRequest;
  }



private Commercial = 'https://mcapi.homes247.in/commercial_backend/';

allindiacommercialAuto(): Observable<any> {

  // ✅ Return cached response
  if (this.allindiaAuto3Cache$) {
    return this.allindiaAuto3Cache$;
  }

  const apiRequest = this.httpClient.get(
    this.Commercial + 'allautocomplete'
  ).pipe(
    shareReplay({ bufferSize: 1, refCount: false }),

    catchError((err) => {
      console.error('API Error:', err);
      this.allindiaAuto3Cache$ = null; // allow retry
      return of([]);
    })
  );

  this.allindiaAuto3Cache$ = apiRequest;

  return apiRequest;
}

  public getlocationlist() {
    const req = this.httpClient.get(this.REST_API_SERVER + 'get_location').pipe(retry(0), catchError(this.handleError));
    return this.srv('loc_list', req, []);
  }

  gettopproperties(cityId) {
    const options = {
      params: new HttpParams({ fromObject: { 'cityId': cityId } }),
    };
    const req = this.httpClient.get(this.REST_API_SERVER + 'get_topProperties', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`top_props_${cityId}`, req, []);
  }

  private autoCache: { [cacheKey: string]: Observable<any> } = {};

  getAuto(city_id: string): Observable<any> {

    const cacheKey = `auto_${city_id}`;

    // ✅ Return cached observable (prevents duplicate calls)
    if (this.autoCache[cacheKey]) {
      return this.autoCache[cacheKey];
    }

    const apiRequest = this.httpClient.get(
      this.REST_API_SERVER + 'updatedautocomplete?',
      { params: new HttpParams().set('city_id', city_id) }
    ).pipe(
      retry(1),

      // ✅ THIS is the key for duplicate prevention
      shareReplay({ bufferSize: 1, refCount: false }),

      catchError((err) => {
        console.error('API Error:', err);
        delete this.autoCache[cacheKey]; // allow retry
        return of(null);
      })
    );

    // ✅ Store immediately BEFORE subscribe happens
    this.autoCache[cacheKey] = apiRequest;

    return apiRequest;
  }

  private autoCache2: { [cacheKey: string]: Observable<any> } = {};
  private PG = 'https://mpg.homes247.in/pg_backend/';

  getPGAuto(city_id: string): Observable<any> {

    const cacheKey = `pg_auto_${city_id}`;

    // ✅ Return cached observable (prevents duplicate calls)
    if (this.autoCache2[cacheKey]) {
      return this.autoCache2[cacheKey];
    }

    const apiRequest = this.httpClient.get(
      this.PG + 'updatedautocomplete?',
      { params: new HttpParams().set('city_id', city_id) }
    ).pipe(
      retry(1),

      // ✅ Prevent duplicate API calls
      shareReplay({ bufferSize: 1, refCount: false }),

      catchError((err) => {
        console.error('API Error:', err);
        delete this.autoCache2[cacheKey]; // allow retry
        return of(null);
      })
    );

    // ✅ Store before execution
    this.autoCache2[cacheKey] = apiRequest;

    return apiRequest;
  }
  getmajorcities() {
    const req = this.httpClient.get(this.REST_API_SERVERS + 'majorcities').pipe(retry(0), catchError(this.handleError));
    return this.srv('major_cities', req, []);
  }

  getmajorrecentupdatelist() {
    const req = this.httpClient.get(this.REST_API_SERVERS + 'majorrecentuploads').pipe(retry(0), catchError(this.handleError));
    return this.srv('major_recent', req, []);
  }

  gettrendingprojects(param) {
    const req = this.httpClient.get(this.REST_API_SERVER + 'trendingprojects?', { params: toHttpParams(param) }).pipe(retry(0), catchError(this.handleError));
    return this.srv(`trend_proj_${param.cityid}`, req, []);
  }

  getpriorityprojects(param) {
    const req = this.httpClient.get(this.REST_API_SERVER + 'priorityprojects?', { params: toHttpParams(param) }).pipe(retry(0), catchError(this.handleError));
    return this.srv(`prio_proj_${param.cityid}`, req, []);
  }

  getnewprojects(param) {
    const req = this.httpClient.get(this.REST_API_SERVER + 'newprojects?', { params: toHttpParams(param) }).pipe(retry(0), catchError(this.handleError));
    return this.srv(`new_proj_${param.cityid}`, req, []);
  }

  gettopBuilders() {
    const req = this.httpClient.get(this.REST_API_SERVERS + 'get_featured_builders').pipe(retry(0), catchError(this.handleError));
    return this.srv('top_builders', req, []);
  }

  registerExpert(data) {
    const req = this.httpClient.post(this.REST_API_SERVER3 + 'hire_experts', data).pipe(retry(0), catchError(this.handleError));
    return this.srv('reg_expert', req, null);
  }

  public getAllExpert() {
    const req = this.httpClient.get(this.REST_API_SERVER + 'expert_services?').pipe(retry(0), catchError(this.handleError));
    return this.srv('all_experts', req, []);
  }

  getSpotLightProp() {
    const req = this.httpClient.get(this.REST_API_SERVERS + 'get_projectspotlight').pipe(retry(0), catchError(this.handleError));
    return this.srv('spotlight_prop', req, []);
  }

  getSpotLightCityProp(param) {
    const req = this.httpClient.get(this.REST_API_SERVERS + 'get_projectspotlight', { params: toHttpParams(param) }).pipe(retry(0), catchError(this.handleError));
    return this.srv(`spotlight_city_${param.cityId}`, req, []);
  }

  public getAdds(params) {
    const options = { params: new HttpParams({ fromObject: { 'viewpage': params.viewpagess } }) };
    const req = this.httpClient.get(this.REST_API_SERVERS + 'get_experty_ad', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`ads_${params.viewpagess}`, req, []);
  }
}

export function toHttpParams(obj: Object): HttpParams {
  let params = new HttpParams();
  if (!obj) return params;
  Object.getOwnPropertyNames(obj).forEach(key => {
    if (obj[key] !== undefined && obj[key] !== null) {
      params = params.set(key, obj[key]);
    }
  });
  return params;
}