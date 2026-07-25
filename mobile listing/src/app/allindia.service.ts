import { DOCUMENT, isPlatformServer } from '@angular/common';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { TransferState, makeStateKey } from '@angular/core';
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
    private router: Router
  ) {
    this.imagesURL = this.ImageURL;
  }

  /**
   * SSR Helper with TransferState
   */
  // private srv<T>(keyName: string, request: Observable<T>, fallback: any): Observable<T> {
  //   const STATE_KEY = makeStateKey<T>(keyName);

  //   // 1. Browser: check TransferState
  //   if (this.transferState.hasKey(STATE_KEY)) {
  //     const savedData = this.transferState.get(STATE_KEY, fallback);
  //     this.transferState.remove(STATE_KEY);
  //     return of(savedData);
  //   }

  //   // 2. Server: fetch and save
  //   if (isPlatformServer(this.platformId)) {
  //     return request.pipe(
  //       take(1),
  //       timeout(800),
  //       tap(data => this.transferState.set(STATE_KEY, data)),
  //       catchError(() => of(fallback))
  //     );
  //   }

  //   // 3. Normal browser request
  //   return request;
  // }



  // sam
  private srv<T>(keyName: string, request: Observable<T>, fallback: T): Observable<T> {
    const STATE_KEY = makeStateKey<T>(keyName);
    if (this.transferState.hasKey(STATE_KEY)) {
      const savedData = this.transferState.get(STATE_KEY, fallback);
      this.transferState.remove(STATE_KEY);
      return of(savedData);
    }
    if (isPlatformServer(this.platformId)) {
      return request.pipe(
        take(1),
        timeout(1000),
        tap(data => this.transferState.set(STATE_KEY, data)),
        catchError(() => of(fallback))
      );
    }
    return request.pipe(take(1), catchError(() => of(fallback)));
  }



  //   private srv<T>(keyName: string, request: Observable<T>, fallback: T): Observable<T> {
  //   return request.pipe(
  //     take(1),
  //     catchError(() => of(fallback))
  //   );
  // }

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
    if (error.error instanceof ErrorEvent) {
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
    if (!this.allindiaAutoCache$) {
      const req = this.httpClient.get(this.REST_API_SERVER + 'allautocomplete').pipe(shareReplay(1), catchError(this.handleError));
      this.allindiaAutoCache$ = this.srv('all_india_auto', req, []);
    }
    return this.allindiaAutoCache$;
  }

  allindiaAuto2(): Observable<any> {
    if (!this.allindiaAuto2Cache$) {
      const req = this.httpClient.get(this.REST_API_SERVER + 'allautocomplete_2').pipe(shareReplay(1), catchError(this.handleError));
      this.allindiaAuto2Cache$ = this.srv('all_india_auto_2', req, []);
    }
    return this.allindiaAuto2Cache$;
  }

  private Commercial = 'https://mcapi.homes247.in/commercial_backend/';


  allindiacommercialAuto(): Observable<any> {
    if (!this.allindiaAuto3Cache$) {
      const req = this.httpClient.get(this.Commercial + 'allautocomplete').pipe(shareReplay(1), catchError(this.handleError));
      this.allindiaAuto3Cache$ = this.srv('all_comm_auto', req, []);
    }
    return this.allindiaAuto3Cache$;
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

  private autoCache: { [city_id: string]: Observable<any> } = {};
  private apiCallStatus: { [city_id: string]: Subject<any> } = {};
  private lastCityId: string | null = null;

  getAuto(city_id: string): Observable<any> {
    const key = `auto_${city_id}`;
    if (this.lastCityId === city_id) {
      return this.autoCache[key] || of(null);
    }
    if (this.autoCache[key]) {
      return this.autoCache[key];
    }
    if (this.apiCallStatus[key]) {
      return this.apiCallStatus[key].asObservable();
    }

    this.apiCallStatus[key] = new Subject<any>();
    const options = { params: new HttpParams().set('city_id', city_id) };

    // Wrap the inner HTTP request with srv for TransferState
    const coreRequest = this.httpClient.get(this.REST_API_SERVER + 'updatedautocomplete?', options).pipe(
      retry(1),
      shareReplay(1),
      catchError(error => {
        console.error('API Error:', error);
        return of(null);
      })
    );

    const apiRequest = this.srv(key, coreRequest, null);

    this.autoCache[key] = apiRequest;
    this.lastCityId = city_id;
    apiRequest.subscribe(response => {
      this.apiCallStatus[key].next(response);
      this.apiCallStatus[key].complete();
      delete this.apiCallStatus[key];
    });

    return apiRequest;
  }

  private autoCache2: { [city_id: string]: Observable<any> } = {};
  private apiCallStatus2: { [city_id: string]: Subject<any> } = {};
  private lastCityId2: string | null = null;
  private PG = 'https://mpg.homes247.in/pg_backend/';

  getPGAuto(city_id: string): Observable<any> {
    const key = `pg_auto_${city_id}`;
    if (this.lastCityId2 === city_id) {
      return this.autoCache2[key] || of(null);
    }
    if (this.autoCache2[key]) {
      return this.autoCache2[key];
    }
    if (this.apiCallStatus2[key]) {
      return this.apiCallStatus2[key].asObservable();
    }

    this.apiCallStatus2[key] = new Subject<any>();
    const options = { params: new HttpParams().set('city_id', city_id) };

    const coreRequest = this.httpClient.get(this.PG + 'updatedautocomplete?', options).pipe(
      retry(1),
      shareReplay(1),
      catchError(error => {
        console.error('API Error:', error);
        return of(null);
      })
    );

    const apiRequest = this.srv(key, coreRequest, null);

    this.autoCache2[key] = apiRequest;
    this.lastCityId2 = city_id;
    apiRequest.subscribe(response => {
      this.apiCallStatus2[key].next(response);
      this.apiCallStatus2[key].complete();
      delete this.apiCallStatus2[key];
    });

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