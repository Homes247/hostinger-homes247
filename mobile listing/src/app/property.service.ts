import { DOCUMENT, isPlatformServer } from '@angular/common';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { TransferState, makeStateKey } from '@angular/core';
import { Observable, throwError, of, Subject } from 'rxjs';
import { catchError, retry, tap, timeout, take } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private REST_API_SERVER = 'https://mbapi2.homes247.in/backend/';
  private REST_API_SERVER2 = 'https://api.right2shout.in/backend/';

  private REST_API_SERVER_NEW = 'https://mbapi2.homes247.in/backendoptimized/';
  private ImageURL = 'https://img-mb.homes247.in/images/';
  private AmenitiesImageURL = 'https://img-mb.homes247.in/images/';

  imagesURL: string;
  amenitiesImageURL: string;

  private answers_listners = new Subject<any>();
  private click_listners = new Subject<any>();
  private compareclick_listners1 = new Subject<any>();
  private compareclick_listners2 = new Subject<any>();
  private removeprop_listners = new Subject<any>();
  private comparecloseclick_listners = new Subject<any>();

  constructor(
    private httpClient: HttpClient,
    private transferState: TransferState,
    @Inject(DOCUMENT) private doc,
    @Inject(PLATFORM_ID) private platformId: Object,
    private router : Router

  ) {
    this.imagesURL = this.ImageURL;
    this.amenitiesImageURL = this.AmenitiesImageURL;
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
  //       take(1), // Complete after first emission
  //       timeout(1000), // Hard stop to keep server fast
  //       tap(data => this.transferState.set(STATE_KEY, data)),
  //       catchError(() => of(fallback))
  //     );
  //   }

  //   // 3. Normal browser request
  //   return request;
  // }




  // sam comment
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

  // --- API METHODS ---

  getpropertynew(propId) {
    const options = { params: new HttpParams({ fromObject: { 'propId': propId } }) };
    const request$ = this.httpClient.get(this.REST_API_SERVER_NEW + 'get_propertyByIdnew', options)
      .pipe(retry(0), catchError(this.handleError));
    return this.srv(`prop_new_${propId}`, request$, {});
  }

  getpropertydates(propId) {
    const options = { params: new HttpParams({ fromObject: { 'propId': propId } }) };
    const request$ = this.httpClient.get(this.REST_API_SERVER_NEW + 'get_propertydates', options)
      .pipe(retry(0), catchError(this.handleError));
    return this.srv(`prop_dates_${propId}`, request$, {});
  }

  get_amen_appro_banks(propId) {
    const options = { params: new HttpParams({ fromObject: { 'propId': propId } }) };
    const request$ = this.httpClient.get(this.REST_API_SERVER_NEW + 'get_amen_appr_ban_byid', options)
      .pipe(retry(0), catchError(this.handleError));
    return this.srv(`amen_banks_${propId}`, request$, {});
  }

  getbhkbyid(propId) {
    const options = { params: new HttpParams({ fromObject: { 'propId': propId } }) };
    const request$ = this.httpClient.get(this.REST_API_SERVER_NEW + 'get_propertyidbhk', options)
      .pipe(retry(0), catchError(this.handleError));
    return this.srv(`bhk_${propId}`, request$, []);
  }

  getdescriptionsbyid(propId) {
    const options = { params: new HttpParams({ fromObject: { 'propId': propId } }) };
    const request$ = this.httpClient.get(this.REST_API_SERVER_NEW + 'get_propertyid_descriptions', options)
      .pipe(retry(0), catchError(this.handleError));
    return this.srv(`desc_${propId}`, request$, {});
  }

  reviewfetching(propid) {
    const options = new HttpParams().append('propId', propid);
    const request$ = this.httpClient.post(this.REST_API_SERVER2 + 'getratinglist', options)
      .pipe(retry(0), catchError(this.handleError));
    return this.srv(`rev_list_${propid}`, request$, []);
  }

  getNearByLocalities(localityId) {
    const options = { params: new HttpParams({ fromObject: { 'localityId': localityId } }) };
    const request$ = this.httpClient.get(this.REST_API_SERVER + 'get_similar_loc', options)
      .pipe(retry(0), catchError(this.handleError));
    return this.srv(`near_loc_${localityId}`, request$, []);
  }

  EnqPropertyByBHKs(param, varient, propertyname, cityId) {
    const options = new HttpParams()
      .append('name', param.name).append('number', param.number)
      .append('propertyname', propertyname).append('email', param.mail)
      .append('varient', varient).append('sourcetype', 'Homes247-Mobile').append('cityId', cityId);
    const request$ = this.httpClient.post(this.REST_API_SERVER2 + 'PropertyLeads', options)
      .pipe(retry(0), catchError(this.handleError));
    return this.srv(`enq_bhk_${param.number}`, request$, null);
  }

  addUserSeenProjects(param) {
    const options = new HttpParams().append('userId', param.userid).append('propId', param.propid);
    const request$ = this.httpClient.post(this.REST_API_SERVER2 + 'add_recent_view', options)
      .pipe(retry(0), catchError(this.handleError));
    return this.srv(`add_seen_${param.propid}`, request$, null);
  }

  getpropertyfavparam(propId, userId) {
    const options = { params: new HttpParams({ fromObject: { 'propId': propId, 'userId': userId } }) };
    const request$ = this.httpClient.get(this.REST_API_SERVER + 'get_propertyById', options)
      .pipe(retry(0), catchError(this.handleError));
    return this.srv(`prop_fav_${propId}`, request$, {});
  }

  DiscusQuestionList(param) {
    const options = new HttpParams().append('propId', param.propId);
    const request$ = this.httpClient.post(this.REST_API_SERVER2 + 'getQuestionsList', options)
      .pipe(retry(0), catchError(this.handleError));
    return this.srv(`q_list_${param.propId}`, request$, []);
  }

  DiscusQuestionListById(param) {
    const options = new HttpParams().append('questionId', param.questionId);
    const request$ = this.httpClient.post(this.REST_API_SERVER2 + 'getQuestionsListByQuestionID', options)
      .pipe(retry(0), catchError(this.handleError));
    return this.srv(`q_det_${param.questionId}`, request$, {});
  }

  Postanswer(param) {
    const options = new HttpParams()
      .append('propId', param.propId).append('userId', param.userId)
      .append('userName', param.userName).append('questionId', param.QuestionId)
      .append('userAnswer', param.userAnswer);
    const request$ = this.httpClient.post(this.REST_API_SERVER2 + 'postAnswer', options)
      .pipe(retry(0), catchError(this.handleError));
    return this.srv(`post_a_${param.QuestionId}`, request$, null);
  }

  addfavaourite(param) {
    const options = new HttpParams()
      .append('userId', param.userid).append('propId', param.propid).append('CatagoryId', param.CatagoryId);
    const request$ = this.httpClient.post(this.REST_API_SERVER2 + 'add_Favourite_new', options)
      .pipe(retry(0), catchError(this.handleError));
    return this.srv(`add_fav_${param.propid}`, request$, null);
  }

  Postquestion(param) {
    const options = new HttpParams()
      .append('propId', param.propId).append('userId', param.userId)
      .append('userName', param.userName).append('category', param.category).append('question', param.question);
    const request$ = this.httpClient.post(this.REST_API_SERVER2 + 'postQuestions', options)
      .pipe(retry(0), catchError(this.handleError));
    return this.srv(`post_q_${param.propId}`, request$, null);
  }

  specialformproppage(param, propertyname, varient, proptype, budget, location, cityId) {
    const options = new HttpParams()
      .append('name', param.name).append('number', param.number)
      .append('propertyname', propertyname).append('email', param.mail)
      .append('varient', varient).append('propertytype', proptype)
      .append('budget', budget).append('location', location)
      .append('sourcetype', 'Homes247-Mobile').append('cityId', cityId);
    const request$ = this.httpClient.post(this.REST_API_SERVER2 + 'specialform_proppage', options)
      .pipe(retry(0), catchError(this.handleError));
    return this.srv(`spec_form_${cityId}`, request$, null);
  }

  EnqProperty(param, propertyname, cityId) {
    const options = new HttpParams()
      .append('name', param.name).append('number', param.number)
      .append('email', param.email).append('propertyname', propertyname)
      .append('propertyid', param.propertyid).append('pageorgin', param.pageorgin)
      .append('sourcetype', 'Homes247-Mobile').append('source', param.source)
      .append('cityId', cityId).append('browser', param.browser)
      .append('localityId', param.localityId).append('regionId', param.regionId)
      .append('verification', param.verification);
    const request$ = this.httpClient.post(this.REST_API_SERVER2 + 'PropEnquiry', options)
      .pipe(retry(0), catchError(this.handleError));
    return this.srv(`enq_p_${param.propertyid}`, request$, null);
  }

  getpropertiesByBuilders(propId, builderId) {
    const options = { params: new HttpParams({ fromObject: { 'propId': propId, 'BuilderId': builderId } }) };
    const request$ = this.httpClient.get(this.REST_API_SERVER + 'similarbuilderproperties', options)
      .pipe(retry(0), catchError(this.handleError));
    return this.srv(`builder_props_${builderId}`, request$, []);
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

  Loginwithnum(param) {
    const options = new HttpParams()
      .append('number', param.number).append('username', param.username).append('device_source', param.device_source);
    const request$ = this.httpClient.post(this.REST_API_SERVER2 + 'login_withnumber', options)
      .pipe(retry(0), catchError(this.handleError));
    return this.srv(`login_${param.number}`, request$, null);
  }

  getSeenProjectsListByIds(ids) {
    const request$ = this.httpClient.get(this.REST_API_SERVER + 'propertiesseen?' + 'propIds=' + ids)
      .pipe(retry(0), catchError(this.handleError));
    return this.srv(`seen_list_${ids}`, request$, []);
  }

  getsimilarProp(propId) {
    const options = { params: new HttpParams({ fromObject: { 'propId': propId } }) };
    const request$ = this.httpClient.get(this.REST_API_SERVER + 'similarprop', options)
      .pipe(retry(0), catchError(this.handleError));
    return this.srv(`sim_prop_${propId}`, request$, []);
  }

  addreview(param) {
    const options = new HttpParams()
      .append('userId', param.userid).append('propId', param.propId)
      .append('rating', param.rating).append('review', param.review);
    const request$ = this.httpClient.post(this.REST_API_SERVER2 + 'propertyrating', options)
      .pipe(retry(0), catchError(this.handleError));
    return this.srv(`add_rev_${param.propId}`, request$, null);
  }

  // --- SUBJECT LISTENERS ---

  answerlisten(): Observable<any> { return this.answers_listners.asObservable(); }
  clicklisten(): Observable<any> { return this.click_listners.asObservable(); }
  comparelistenparam1(): Observable<any> { return this.compareclick_listners1.asObservable(); }
  comparelistenparam2(): Observable<any> { return this.compareclick_listners2.asObservable(); }
  removeprop(): Observable<any> { return this.removeprop_listners.asObservable(); }
  compareclose(): Observable<any> { return this.comparecloseclick_listners.asObservable(); }

  answers(filterBy: string) { this.answers_listners.next(filterBy); }
  clickthrough(filterBy: string) { this.click_listners.next(filterBy); }
  compareclickparam1(propid: string) { this.compareclick_listners1.next(propid); }
  compareclickparam2(proptype: string) { this.compareclick_listners2.next(proptype); }
  removeproperty(id: string) { this.removeprop_listners.next(id); }
  comparecloseclick(filterBy: string) { this.comparecloseclick_listners.next(filterBy); }
}