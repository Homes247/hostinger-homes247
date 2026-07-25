import { DOCUMENT, isPlatformServer } from '@angular/common';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { TransferState, makeStateKey } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { catchError, retry, tap, timeout, take } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProplistingService {
  public contactLink = 'https://mbapi2.homes247.in/backend/';
  public contactLink2 = 'https://api.right2shout.in/backend/';
  private REST_API_SERVER = 'https://mbapi2.homes247.in/backend/';
  private REST_API_SERVER2 = 'https://api.right2shout.in/backend/';

  private REST_API_SERVER_NEW = 'https://mbapi2.homes247.in/backendoptimized/';
  private REST_API_SERVER_Individuallist = 'https://miapi.homes247.in/individuallistbackend/';
  private ImageURL = 'https://img-mb.homes247.in/images/';
  private imagesURLLamda = 'https://img.homes247.in/images/';
  private blogimage = 'https://img-mbgs.homes247.in/images/';

  imagesURL: string;
  blogimageURL: string;
  imagesURLInitial: string;


  constructor(
    private httpClient: HttpClient,
    private transferState: TransferState,
    @Inject(DOCUMENT) private doc,
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router

  ) {
    this.imagesURL = this.ImageURL;

    this.imagesURLInitial = this.imagesURLLamda;
    this.blogimageURL = this.blogimage;
  }

  /**
   * SSR Helper with TransferState
   */
  // private srv<T>(keyName: string, request: Observable<T>, fallback: any): Observable<T> {
  //   const STATE_KEY = makeStateKey<T>(keyName);

  //   // 1. If data exists in TransferState (Browser side), use it and clear it
  //   if (this.transferState.hasKey(STATE_KEY)) {
  //     const savedData = this.transferState.get(STATE_KEY, fallback);
  //     this.transferState.remove(STATE_KEY); // Clean up after use
  //     return of(savedData);
  //   }

  //   // 2. If on Server, fetch data and save it into TransferState
  //   if (isPlatformServer(this.platformId)) {
  //     return request.pipe(
  //       take(1),
  //       timeout(1000),
  //       tap(data => this.transferState.set(STATE_KEY, data)), // Save data to HTML
  //       catchError(() => of(fallback))
  //     );
  //   }

  //   // 3. Normal browser behavior (fallback if not in state)
  //   return request;
  // }




  // sam coment
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




  // private srv<T>(keyName: string, request: Observable<T>, fallback: T): Observable<T> {
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

  // getCity(city, param) {
  //   const request$ = this.httpClient
  //     .get(this.REST_API_SERVER + 'search_new/' + city + '?', { params: toHttpParams(param) })
  //     .pipe(retry(0), catchError(this.handleError));

  //   return this.srv(`city_search_${city}_${param.locality}`, request$, []);
  // }


  getCity(city, param) {
  const request$ = this.httpClient
    .get(this.REST_API_SERVER + 'search_new/' + city + '?', { params: toHttpParams(param) })
    .pipe(retry(0), catchError(this.handleError));
  const key = param?.locality ? `city_search_${city}_${param.locality}` : `city_search_${city}`;
  return this.srv(key, request$, []);
}


  gettopproperties(cityId) {
    const options = {
      params: new HttpParams({
        fromObject: { 'cityId': cityId },
      }),
    };
    const request$ = this.httpClient.get(this.REST_API_SERVER + 'get_topProperties', options)
      .pipe(retry(0), catchError(this.handleError));

    return this.srv(`top_props_${cityId}`, request$, []);
  }

  getTopLocalities(param) {
    const request$ = this.httpClient
      .get(this.REST_API_SERVER + 'top_localities?', { params: toHttpParams(param) })
      .pipe(retry(0), catchError(this.handleError));

    return this.srv(`top_loc_${param.cityId}`, request$, []);
  }

  getseocitylistmeta(idcity) {
    const options = { params: new HttpParams({ fromString: 'CityId=' + idcity }) };
    const request$ = this.httpClient
      .get(this.REST_API_SERVER + 'citylistingseo?', options)
      .pipe(retry(0), catchError(this.handleError));

    return this.srv(`city_meta_${idcity}`, request$, {});
  }

  getprojectscount(city, param) {
    const request$ = this.httpClient
      .get(this.REST_API_SERVER + 'get_counts/' + city + '?', { params: toHttpParams(param) })
      .pipe(retry(0), catchError(this.handleError));

    return this.srv(`proj_count_${city}_${param.locality}`, request$, 0);
  }

  // getindividualprojectscount(city, param) {
  //   const request$ = this.httpClient
  //     .get(this.REST_API_SERVER_Individuallist + 'listing_counts/' + city + '?', { params: toHttpParams(param) })
  //     .pipe(retry(0), catchError(this.handleError));

  //   return this.srv(`ind_count_${city}_${param.locality}`, request$, 0);
  // }

  getindividualprojectscount(city, param) {
  const req = this.httpClient
    .get(this.REST_API_SERVER_Individuallist + 'listing_counts/' + city + '?', { params: toHttpParams(param) })
    .pipe(retry(0), catchError(this.handleError));
  return this.srv(`ind_count_${city}`, req, 0);
}



  getlocality(param) {
    const request$ = this.httpClient
      .get(this.REST_API_SERVER + 'get_localities?', { params: toHttpParams(param) })
      .pipe(retry(0), catchError(this.handleError));

    return this.srv(`loc_${param.cityId}_${param.zone}`, request$, []);
  }

  addPropertyCall(param) {
    const options = new HttpParams()
      .append('name', param.ename)
      .append('number', param.emobile)
      .append('propertyname', param.propertyname);
    const request$ = this.httpClient.post(this.contactLink2 + 'PropContactInfo', options)
      .pipe(retry(0), catchError(this.handleError));

    return this.srv(`prop_call_${param.emobile}`, request$, null);
  }

  otpsend(param) {
    const options = new HttpParams().append('number', param.number);
    const request$ = this.httpClient.post(this.REST_API_SERVER2 + 'asdthyujdllkhjsjkkjhs', options)
      .pipe(retry(0), catchError(this.handleError));

    return this.srv(`otp_send_${param.number}`, request$, null);
  }

  otpvalidcheck(param) {
    const options = new HttpParams().append('otp', param.otp).append('number', param.number);
    const request$ = this.httpClient.post(this.REST_API_SERVER2 + 'otpvalidate', options)
      .pipe(retry(0), catchError(this.handleError));

    return this.srv(`otp_valid_${param.number}`, request$, null);
  }

  addAboutCall(param, pageorgin, cityID) {
    const options = new HttpParams()
      .append('name', param.name)
      .append('number', param.number)
      .append('email', param.email)
      .append('pageorgin', pageorgin)
      .append('sourcetype', 'Homes247-Mobile')
      .append('cityId', cityID);
    const request$ = this.httpClient.post(this.contactLink2 + 'callback', options)
      .pipe(retry(0), catchError(this.handleError));

    return this.srv(`about_call_${param.number}`, request$, null);
  }

  addfavaourite(param) {
    const options = new HttpParams()
      .append('userId', param.userid)
      .append('propId', param.propid)
      .append('CatagoryId', param.CatagoryId);
    const request$ = this.httpClient.post(this.REST_API_SERVER2 + 'add_Favourite_new', options)
      .pipe(retry(0), catchError(this.handleError));

    return this.srv(`add_fav_${param.propid}`, request$, null);
  }

  getpropertynew(propId) {
    const options = { params: new HttpParams({ fromObject: { 'propId': propId } }) };
    const request$ = this.httpClient.get(this.REST_API_SERVER_NEW + 'get_propertyByIdnew', options)
      .pipe(retry(0), catchError(this.handleError));

    return this.srv(`prop_new_${propId}`, request$, {});
  }

  addPropertyCallEnquiry(param, pageorgin, cityId, browser) {
    const soruce_page_orgin = 'Homes247-Mobile' + '-' + pageorgin;
    const options = new HttpParams()
      .append('name', param.name)
      .append('number', param.number)
      .append('email', param.email)
      .append('propertyname', param.propertyname)
      .append('propertyid', param.propertyid)
      .append('pageorgin', pageorgin)
      .append('sourcetype', soruce_page_orgin)
      .append('source', param.source)
      .append('cityId', cityId)
      .append('browser', browser)
      .append('localityId', param.localityId)
      .append('regionId', param.regionId);
    const request$ = this.httpClient.post(this.contactLink2 + 'PropContactInfo', options)
      .pipe(retry(0), catchError(this.handleError));

    return this.srv(`prop_enq_${param.propertyid}`, request$, null);
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