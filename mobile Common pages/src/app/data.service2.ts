import { DOCUMENT, isPlatformServer } from '@angular/common';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams
} from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { TransferState, makeStateKey } from '@angular/platform-browser';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry, shareReplay, tap, timeout, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataService2 {
  // AWS SERVER CONNECTION
  private REST_API_SERVER = 'https://mbapi2.homes247.in/backendoptimized/';
  private REST_API_SERVER44 = 'https://mbgs.homes247.in/backendoptimized/';
  private REST_API_SERVER4 = 'https://mbgs.homes247.in/backend/';

  private REST_API_SERVER5 = 'https://superadmin.homes247.in/backendoptimized/';
  private REST_API_SERVER2 = 'https://api.right2shout.in/backendoptimized/';

  private ImageURL = 'https://img-mb.homes247.in/images/';
  public ImageURLAmenities = 'https://img-mb.homes247.in/images/';

  imagesURL: string;
  brochuresimages: string;
  brochuresAmenities: string;
  blogimageURL: string;

  constructor(
    private httpClient: HttpClient,
    private transferState: TransferState,
    @Inject(DOCUMENT) private doc,
    @Inject(PLATFORM_ID) private platformId: Object
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

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (typeof ErrorEvent !== 'undefined' && error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

  getpropertynew(propId) {
    const options = { params: new HttpParams({ fromObject: { propId: propId } }) };
    return this.httpClient.get(this.REST_API_SERVER + 'get_propertyByIdnew', options).pipe(retry(0), catchError(this.handleError));
    // return this.srv(`prop_new_${propId}`, req, {});
  }

  getbhkbyid(propId) {
    const options = { params: new HttpParams({ fromObject: { propId: propId } }) };
    const req = this.httpClient.get(this.REST_API_SERVER + 'get_propertyidbhk', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`prop_bhk_${propId}`, req, []);
  }

  getdescriptionsbyid(propId) {
    const options = { params: new HttpParams({ fromObject: { propId: propId } }) };
    const req = this.httpClient.get(this.REST_API_SERVER + 'get_propertyid_descriptions', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`prop_desc_${propId}`, req, {});
  }

  get_amen_appro_banks(propId) {
    const options = { params: new HttpParams({ fromObject: { propId: propId } }) };
    const req = this.httpClient.get(this.REST_API_SERVER + 'get_amen_appr_ban_byid', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`amen_banks_${propId}`, req, {});
  }

  getblogAuto(blogid) {
    const options = { params: new HttpParams({ fromObject: { 'blog_id': blogid, 'source': '2000' } }) };
    const req = this.httpClient.get(this.REST_API_SERVER44 + 'blogautocomplete?', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`blog_auto_${blogid}`, req, []);
  }

  getcategoryblogs(id) {
    const options = { params: new HttpParams({ fromObject: { id: id, 'source': '2000' } }) };
    const req = this.httpClient.get(this.REST_API_SERVER4 + 'blogcategories?', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`cat_blogs_${id}`, req, []);
  }

  blogdetails(id) {
    const options = { params: new HttpParams({ fromObject: { id: id, 'source': '2000' } }) };
    const req = this.httpClient.get(this.REST_API_SERVER44 + 'blog_details?', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`blog_det_${id}`, req, {});
  }

  getBlogsCommentList(id) {
    const options = { params: new HttpParams({ fromObject: { id: id } }) };
    const req = this.httpClient.get(this.REST_API_SERVER44 + 'blogcommentsbyid?', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`blog_comms_${id}`, req, []);
  }

  getsimilarblog(Id) {
    const options = { params: new HttpParams({ fromObject: { id: Id, source: '2000' } }) };
    const req = this.httpClient.get(this.REST_API_SERVER + 'similarblogs?', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`sim_blogs_${Id}`, req, []);
  }

  getinfographicblog(id) {
    const options = { params: new HttpParams({ fromObject: { id: id } }) };
    const req = this.httpClient.get(this.REST_API_SERVER + 'getinfographicbyid?', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`info_blog_${id}`, req, {});
  }

  propdetailsinblogads(id) {
    const options = { params: new HttpParams({ fromObject: { id: id } }) };
    const req = this.httpClient.get(this.REST_API_SERVER + 'propdetails_blogads?', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`blog_ad_prop_${id}`, req, {});
  }

  getBHKWiseDetails(id) {
    const req = this.httpClient.get(this.REST_API_SERVER + 'getbhk_byid?Bhkid=' + id).pipe(retry(0), catchError(this.handleError));
    return this.srv(`bhk_wise_${id}`, req, {});
  }

  private majorCitiesCache$: Observable<any> | null = null;

  public getmajorcities(): Observable<any> {

    // ✅ Return cached response
    if (this.majorCitiesCache$) {
      return this.majorCitiesCache$;
    }

    const apiRequest = this.httpClient.get(
      this.REST_API_SERVER + 'majorcities'
    ).pipe(
      shareReplay(1),
      catchError((err) => {
        console.error(err);
        this.majorCitiesCache$ = null; // allow retry
        return of([]);
      })
    );

    this.majorCitiesCache$ = apiRequest;

    return apiRequest;
  }
  getrecentupdatelist(param) {
    const req = this.httpClient.get(this.REST_API_SERVER + 'recentuploads?', { params: toHttpParams(param) }).pipe(retry(0), catchError(this.handleError));
    return this.srv(`recent_up_${param.cityid}`, req, []);
  }

  private majorRecentCache$: Observable<any> | null = null;

  public getmajorrecentupdatelist(): Observable<any> {

    // ✅ Return cached response
    if (this.majorRecentCache$) {
      return this.majorRecentCache$;
    }

    const apiRequest = this.httpClient.get(
      this.REST_API_SERVER + 'majorrecentuploads'
    ).pipe(
      shareReplay(1),
      catchError((err) => {
        console.error(err);
        this.majorRecentCache$ = null; // allow retry
        return of([]);
      })
    );

    this.majorRecentCache$ = apiRequest;

    return apiRequest;
  }

  private trendingCache: { [cacheKey: string]: Observable<any> } = {};

  gettrendingprojects(param: { cityid: string }): Observable<any> {

    const city_id = param.cityid;
    const cacheKey = `trendingprojects_${city_id}`;

    // ✅ Return cached response
    if (this.trendingCache[cacheKey]) {
      return this.trendingCache[cacheKey];
    }

    const apiRequest = this.httpClient.get(
      this.REST_API_SERVER + 'trendingprojects?',
      { params: toHttpParams(param) }
    ).pipe(
      retry(0),
      shareReplay(1),
      catchError((err) => {
        console.error('API error:', err);
        delete this.trendingCache[cacheKey]; // allow retry
        return of(null);
      })
    );

    this.trendingCache[cacheKey] = apiRequest;

    return apiRequest;
  }

  private priorityProjectsCache: { [cacheKey: string]: Observable<any> } = {};

  getpriorityprojects(param: any): Observable<any> {

    const cacheKey = `prio_proj_${param.cityid}`;

    // ✅ Return cached response
    if (this.priorityProjectsCache[cacheKey]) {
      return this.priorityProjectsCache[cacheKey];
    }

    const apiRequest = this.httpClient.get(
      this.REST_API_SERVER + 'priorityprojects?',
      { params: toHttpParams(param) }
    ).pipe(
      retry(0),
      shareReplay(1),
      catchError((err) => {
        console.error(err);
        delete this.priorityProjectsCache[cacheKey]; // allow retry
        return of([]);
      })
    );

    this.priorityProjectsCache[cacheKey] = apiRequest;

    return apiRequest;
  }

  private featuredProjectsCache: { [cacheKey: string]: Observable<any> } = {};

  getfeaturedprojects(param: any): Observable<any> {

    const cacheKey = `feat_proj_${param.cityid}`;

    // ✅ Return cached response
    if (this.featuredProjectsCache[cacheKey]) {
      return this.featuredProjectsCache[cacheKey];
    }

    const apiRequest = this.httpClient.get(
      this.REST_API_SERVER + 'featuredprojects?',
      { params: toHttpParams(param) }
    ).pipe(
      retry(0),
      shareReplay(1),
      catchError((err) => {
        console.error(err);
        delete this.featuredProjectsCache[cacheKey]; // allow retry
        return of([]);
      })
    );

    this.featuredProjectsCache[cacheKey] = apiRequest;

    return apiRequest;
  }

  private topProjectsCache: { [cacheKey: string]: Observable<any> } = {};

  gettopprojects(param: any): Observable<any> {

    const cacheKey = `top_proj_${param.cityid}`;

    // ✅ Return cached response
    if (this.topProjectsCache[cacheKey]) {
      return this.topProjectsCache[cacheKey];
    }

    const apiRequest = this.httpClient.get(
      this.REST_API_SERVER + 'topprojects?',
      { params: toHttpParams(param) }
    ).pipe(
      retry(0),
      shareReplay(1),
      catchError((err) => {
        console.error(err);
        delete this.topProjectsCache[cacheKey]; // allow retry
        return of([]);
      })
    );

    this.topProjectsCache[cacheKey] = apiRequest;

    return apiRequest;
  }

  getnewprojects(param) {
    const req = this.httpClient.get(this.REST_API_SERVER + 'newprojects?', { params: toHttpParams(param) }).pipe(retry(0), catchError(this.handleError));
    return this.srv(`new_proj_${param.cityid}`, req, []);
  }

  getallbankingnames() {
    const req = this.httpClient.get(this.REST_API_SERVER + 'bankdetails').pipe(retry(0), catchError(this.handleError));
    return this.srv('all_banks', req, []);
  }

  IfscFetching(param) {
    const req = this.httpClient.get(this.REST_API_SERVER + 'bankdetails?', { params: toHttpParams(param) }).pipe(retry(0), catchError(this.handleError));
    return this.srv(`ifsc_${param.Bank}_${param.Branch}`, req, []);
  }

  IfscIdFetching(param) {
    const req = this.httpClient.get(this.REST_API_SERVER + 'bankdetails?', { params: toHttpParams(param) }).pipe(retry(0), catchError(this.handleError));
    return this.srv(`ifsc_id_${param.Id}`, req, []);
  }

  PopularBankFetching(param) {
    const req = this.httpClient.get(this.REST_API_SERVER + 'bankdetails?', { params: toHttpParams(param) }).pipe(retry(0), catchError(this.handleError));
    return this.srv(`pop_bank_${param.popularbank}`, req, []);
  }

  getPinCode(Pincodeparam) {
    const req = this.httpClient.get(this.REST_API_SERVER + 'pincodedetails?', { params: toHttpParams(Pincodeparam) }).pipe(retry(0), catchError(this.handleError));
    return this.srv(`pincode_${Pincodeparam.branch}`, req, []);
  }

  getPinCodeiD(Pincodeparam) {
    const req = this.httpClient.get(this.REST_API_SERVER + 'pincodedetails?', { params: toHttpParams(Pincodeparam) }).pipe(retry(0), catchError(this.handleError));
    return this.srv(`pincode_id_${Pincodeparam.id}`, req, []);
  }

  AllPinCodeFetch() {
    const req = this.httpClient.get(this.REST_API_SERVER + 'pincodedetails').pipe(retry(0), catchError(this.handleError));
    return this.srv('all_pincodes', req, []);
  }

  blogCategory() {
    const req = this.httpClient.get(this.REST_API_SERVER44 + 'blogcategory').pipe(retry(0), catchError(this.handleError));
    return this.srv('blog_cats', req, []);
  }

  blogscategorybyauthid(param11) {
    const req = this.httpClient.get(this.REST_API_SERVER44 + 'blogscategorybyauthid', { params: toHttpParams(param11) }).pipe(retry(0), catchError(this.handleError));
    return this.srv(`auth_blog_cats_${param11.authorId}`, req, []);
  }

  blogDraftPublish(param3) {
    const req = this.httpClient.get(this.REST_API_SERVER44 + 'blogslistbybloggerid', { params: toHttpParams(param3) }).pipe(retry(0), catchError(this.handleError));
    return this.srv(`blog_drafts_${param3.bloggerId}`, req, []);
  }

  blogPendingTopicList(param3) {
    const req = this.httpClient.get(this.REST_API_SERVER44 + 'requestedtopicslist', { params: toHttpParams(param3) }).pipe(retry(0), catchError(this.handleError));
    return this.srv(`blog_pend_${param3.bloggerId}`, req, []);
  }

  getViewBlogDetail(param3) {
    const req = this.httpClient.get(this.REST_API_SERVER44 + 'editblogcontent', { params: toHttpParams(param3) }).pipe(retry(0), catchError(this.handleError));
    return this.srv(`blog_view_det_${param3.blogId}`, req, {});
  }

  getBlogTopics(param) {
    const options = new HttpParams().append('blogtypeid', param.blogtypeid);
    const req = this.httpClient.post(this.REST_API_SERVER2 + 'blogtopics', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`blog_topics_${param.blogtypeid}`, req, []);
  }

  setBlogText(param1) {
    const options = toHttpParams(param1);
    const req = this.httpClient.post(this.REST_API_SERVER2 + "/writeblog", options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`post_blog_${param1.bloggerId}`, req, null);
  }

  getAuthorDetails(param) {
    const req = this.httpClient.get(this.REST_API_SERVER44 + 'bloggerprofile', { params: toHttpParams(param) }).pipe(retry(0), catchError(this.handleError));
    return this.srv(`author_det_${param.bloggerId}`, req, {});
  }

  getpublicBlogList(param) {
    const req = this.httpClient.get(this.REST_API_SERVER44 + 'publicblogslistbybloggerid', { params: toHttpParams(param) }).pipe(retry(0), catchError(this.handleError));
    return this.srv(`pub_blogs_${param.authorId}`, req, []);
  }

  postAuthorDetails(paramAuthData) {
    const options = toHttpParams(paramAuthData);
    const req = this.httpClient.post(this.REST_API_SERVER2 + 'editbloggerprofilebyId', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`up_author_${paramAuthData.authorId}`, req, null);
  }

  addBlogTopics(param1) {
    const options = toHttpParams(param1);
    const req = this.httpClient.post(this.REST_API_SERVER2 + "/requesttopics", options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`add_topic_${param1.bloggerId}`, req, null);
  }

  updatebloggermedia(param4) {
    const options = toHttpParams(param4);
    const req = this.httpClient.post(this.REST_API_SERVER44 + 'updatebloggermedia', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`up_media_${param4.bloggerId}`, req, null);
  }

  getbloggerMediaLinks(param4) {
    const req = this.httpClient.get(this.REST_API_SERVER44 + 'blogger_media_link', { params: toHttpParams(param4) }).pipe(retry(0), catchError(this.handleError));
    return this.srv(`media_links_${param4.bloggerId}`, req, []);
  }

  userLoginWithOtpNewAPIBlog(param1) {
    const options = new HttpParams().append('number', param1.number);
    const req = this.httpClient.post(this.REST_API_SERVER2 + 'bloggerlogin_withnumber', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`blog_login_${param1.number}`, req, null);
  }

  public updatProfileImage(data) {
    const req = this.httpClient.post(this.REST_API_SERVER2 + 'bloggerprofileimg', data).pipe(retry(0), catchError(this.handleError));
    return this.srv('up_prof_img', req, null);
  }

  public updatProfileImage1(data) {
    const req = this.httpClient.post(this.REST_API_SERVER2 + 'bloggercoverimg', data).pipe(retry(0), catchError(this.handleError));
    return this.srv('up_prof_img1', req, null);
  }

  public updateBlogCoverImg(data) {
    const req = this.httpClient.post(this.REST_API_SERVER2 + 'addblogcoverimg', data).pipe(retry(0), catchError(this.handleError));
    return this.srv('up_blog_cover', req, null);
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