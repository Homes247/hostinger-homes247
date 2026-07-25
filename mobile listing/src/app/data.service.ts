import { DOCUMENT, isPlatformServer } from '@angular/common';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID, TransferState, makeStateKey } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, Subject, throwError } from 'rxjs';
import { catchError, retry, shareReplay, tap, timeout, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataService {

  private mouseenter_listners1 = new Subject<any>();
  private mouseenter_listners2 = new Subject<any>();
  private mouseenter_listners3 = new Subject<any>();
  private mouseenter_listners4 = new Subject<any>();
  private mouseenter_listners5 = new Subject<any>();
  private mouseenter_listners6 = new Subject<any>();
  private mouseenter_listners7 = new Subject<any>();
  private mouseenter_listnersOtp = new Subject<any>();
  private mouseenter_listnersOtp2 = new Subject<any>();

  public webStoryImagePath = 'https://img-mbgs.homes247.in/images/webstory/'
  private REST_API_SERVER = 'https://mbapi2.homes247.in/backend/';
  private REST_API_SERVER22 = 'https://mbgs.homes247.in/backend/';
  private individual = 'https://diapi.homes247.in/individuallistbackend/';
  private REST_API_SERVER4 = 'https://mbapi2.homes247.in/backendoptimized/';
  private REST_API_SERVER44 = 'https://mbgs.homes247.in/backendoptimized/';
  private REST_API_SERVER_rentals = 'https://mrapi.homes247.in/rentalbackend/';
  private REST_API_SERVER_rentals_hari = 'http://192.168.0.119/right2shout_LIVE/Rentalbackend/';



  private REST_API_SERVER_Individuallist3 = 'https://miapi.homes247.in/individuallistbackend/';
  private REST_API_SERVER_Individuallist3_hari = 'http://192.168.0.119/right2shout_LIVE/individuallistbackend/';
  private REST_API_SERVER2 = 'https://api.right2shout.in/backend/';
  private REST_API_SERVER3 = 'https://api.right2shout.in/backendoptimized/';
  private REST_API_SERVER_rentals2 = 'https://api.right2shout.in/rentalbackend/';
  private REST_API_SERVER_Individuallist2 = 'https://api.right2shout.in/individuallistbackend/';
  // private REST_API_SERVER5 = 'https://superadmin.homes247.in/backendoptimized/';
  // private REST_API_SERVER_rentals_PostProperty = 'https://superadmin.homes247.in/rentalbackend/';
  // private REST_API_SERVER_Individuallist = 'https://superadmin.homes247.in/individuallistbackend/';

  private Commercial = 'https://mcapi.homes247.in/commercial_backend/';
  private Commercial_hari = 'http://192.168.0.119/right2shout_LIVE/commercial_backend/';


  private Commercial_post = 'https://api.right2shout.in/commercial_backend/';
  private PG = 'https://mpg.homes247.in/pg_backend/';
  private PG_hari = 'http://192.168.0.119/right2shout_LIVE/pg_backend/';


  private PG_post = 'https://api.right2shout.in/pg_backend/';

  public PGImg = 'https://img-mpg.homes247.in/images/pg_img/';
  public commercialImg = 'https://img-mc.homes247.in/images/commerical_img/';
  public ImageURL = 'https://img-mb.homes247.in/images/';
  private imagesURLLamda = 'https://img.homes247.in/images/';
  public blogImageURL = 'https://img-mbgs.homes247.in/images/';
  public ProfileImage = 'https://img-mb.homes247.in/images/userprofile/';
  public ExpertImage = 'https://img-mb.homes247.in/images/expertsProfile/';
  public ProfileImageBlog = 'https://img-mbgs.homes247.in/images/bloggerprofile/';
  public coverImageBlog = 'https://img-mbgs.homes247.in/images/blog_images/';
  public coverImageBlog1 = 'https://img-mbgs.homes247.in/images/stories/';
  public socialMediaImage = 'https://img-mbgs.homes247.in/images/mediaIcons/';
  public bloggerImageNull = 'https://img-mbgs.homes247.in/images/defaultimg/';
  public CoverImagelink = 'https://img-mi.homes247.in/images/individuallistings/cover/';
  public MasterPlanLink = 'https://img-mi.homes247.in/images/individuallistings/master/';
  public FloorPlanlink = 'https://img-mi.homes247.in/images/individuallistings/floorplan/';
  public GalleryImages = 'https://img-mi.homes247.in/images/individuallistings/gallery/';
  public RentCoverImagelink = 'https://img-mr.homes247.in/images/rentals/cover/';
  public RentGalleryImages = 'https://img-mr.homes247.in/images/rentals/gallery/';
  public SellImages = 'https://img-mi.homes247.in/images/individuallistings/';
  public RenImages = 'https://img-mr.homes247.in/images/rentals/';
  private apiUrl = 'https://api.ipify.org?format=json';
  public allCommercialImg = 'https://img-mc.homes247.in/images/';
  public PgCoverImagelink = 'https://img-mr.homes247.in/images/pg_img/gallery/';
  public aisearch = 'https://aisearch.homes247.in/api/smart_search'

  imagesURL: string;
  imagesURLInitial: string;
  blogimageURL: string;
  amenitiesImageURL: string;
  brochuresimages: string;
  brochuresAmenities: string;
  CoverImage: string;
  MasterPlan: string;
  FloorPlan: string;
  GalleryImage: string;
  RentCoverImage: string;
  RentGalleryImage: string;
  imagesURLCommercialAll: string;

  constructor(
    private httpClient: HttpClient,
    private transferState: TransferState,
    @Inject(DOCUMENT) private doc,
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,

  ) {
    this.imagesURL = this.ImageURL;
    this.blogimageURL = this.blogImageURL;
    this.amenitiesImageURL = this.ImageURL;
    this.brochuresimages = this.ImageURL;
    this.brochuresAmenities = this.ImageURL;
    this.CoverImage = this.CoverImagelink;
    this.MasterPlan = this.MasterPlanLink;
    this.FloorPlan = this.FloorPlanlink;
    this.GalleryImage = this.GalleryImages;
    this.RentCoverImage = this.RentCoverImagelink;
    this.RentGalleryImage = this.RentGalleryImages;
    this.imagesURLCommercialAll = this.allCommercialImg;
    this.imagesURLInitial = this.imagesURLLamda
  }

  /**
   * SSR Helper with TransferState
   */
  // private srv<T>(keyName: string, request: Observable<T>, fallback: T): Observable<T> {
  //   const STATE_KEY = makeStateKey<T>(keyName);

  //   // 1. If data exists in TransferState (Browser side), use it and clear it
  //   if (this.transferState.hasKey(STATE_KEY)) {
  //     const savedData = this.transferState.get(STATE_KEY, fallback);
  //     this.transferState.remove(STATE_KEY);
  //     return of(savedData);
  //   }

  //   // 2. If on Server, fetch data and save it into TransferState
  //   if (isPlatformServer(this.platformId)) {
  //     return request.pipe(
  //       take(1),
  //       timeout(1000),
  //       tap(data => this.transferState.set(STATE_KEY, data)),
  //       catchError(() => of(fallback))
  //     );
  //   }

  //   // 3. Normal browser behavior
  //   return request;
  // }

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
        timeout(3000),
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
    if (typeof ErrorEvent !== 'undefined' && error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

  getlocality(param) {
    const options = { params: new HttpParams({ fromObject: { 'cityId': param.cityId, 'zone': param.zone } }) };
    const req = this.httpClient.get(this.REST_API_SERVER + 'get_localities', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`localities_${param.cityId}_${param.zone}`, req, []);
  }

  getlocalityChartData(param) {
    const options = {
      params: new HttpParams({
        fromObject: {
          'localityId': param.localityId,
          'cityId': param.cityId,
          'proptypeId': param.proptypeId
        }
      })
    };
    const req = this.httpClient.get(this.REST_API_SERVER4 + 'get_proptype_pricetrends', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`locality_chart_${param.localityId}_${param.cityId}_${param.proptypeId}`, req, []);
  }
  getTechnologyList(id) {
    const options = { params: new HttpParams({ fromObject: { 'id': id, 'source': '2000' } }) };
    const req = this.httpClient.get(this.REST_API_SERVER22 + 'blogcategories', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`blogcategories_TechnologyList${id}`, req, []);
  }
  addAboutCall(param, pageorgin, cityID) {
    var sourcetype = 'Homes247-Mobile';
    const options = new HttpParams()
      .append('name', param.name)
      .append('number', param.number)
      .append('email', param.email)
      .append('pageorgin', pageorgin)
      .append('sourcetype', sourcetype)
      .append('cityId', cityID);
    return this.httpClient
      .post(this.REST_API_SERVER2 + 'callback', options)
      .pipe(retry(0), catchError(this.handleError));
  }
  getindividualfilterslist() {
    const req = this.httpClient
      .get(this.REST_API_SERVER_Individuallist3 + 'datafilters')
      .pipe(retry(0), catchError(this.handleError));

    return this.srv('individualfilterslist', req, []);
  }

  getUserDetailsById(id) {
    const options = {
      params: new HttpParams({
        fromObject: {
          id: id,
        },
      }),
    };

    const req = this.httpClient
      .get(this.REST_API_SERVER + 'getUserByUserId', options)
      .pipe(retry(0), catchError(this.handleError));

    return this.srv(`getUserDetailsById_${id}`, req, null);
  }

  webstoryfetch(data) {
    const options = { params: new HttpParams({ fromObject: { 'usblogiderId': data } }) };
    const req = this.httpClient.get(this.REST_API_SERVER44 + 'blogwebstory', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`webstory_${data}`, req, []);
  }

  webstoryfetchById(data) {
    const options = { params: new HttpParams({ fromObject: { 'blogid': data } }) };
    const req = this.httpClient.get(this.REST_API_SERVER44 + 'blogwebstory_byid', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`webstory_id_${data}`, req, []);
  }

  getTrendingblogsList(id) {
    const options = { params: new HttpParams({ fromObject: { 'id': id, 'source': '2000' } }) };
    const req = this.httpClient.get(this.REST_API_SERVER22 + 'blogcategories', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`trend_blogs_${id}`, req, []);
  }

  gettopBuildersCommercial() {
    const req = this.httpClient.get(this.REST_API_SERVER4 + 'get_featured_builders_commerical').pipe(retry(0), catchError(this.handleError));
    return this.srv('top_builders_comm', req, []);
  }

  commercialSaleProperties(city, param) {
    const req = this.httpClient.get(this.Commercial + 'listing_hari/' + city + '?', { params: toHttpParams(param) }).pipe(retry(0), catchError(this.handleError));
    return this.srv(`comm_sale_${city}_${param.commercialPropertyType}`, req, []);
  }

  commercialSaleProperties1(param) {
    const req = this.httpClient.get(this.individual + 'get_commercial_sell_details?', { params: toHttpParams(param) }).pipe(retry(0), catchError(this.handleError));
    return this.srv(`comm_sale_ind_${param.cityId}`, req, []);
  }

  commercialSalePropertiesCount(city, param) {
    const req = this.httpClient.get(this.Commercial + 'listing_count/' + city + '?', { params: toHttpParams(param) }).pipe(retry(0), catchError(this.handleError));
    return this.srv(`comm_count_${city}`, req, 0);
  }

  PGRent(city, param) {
    const req = this.httpClient.get(this.PG + 'listing_hari/' + city + '?', { params: toHttpParams(param) }).pipe(retry(0), catchError(this.handleError));
    return this.srv(`pg_rent_${city}`, req, []);
  }

  pgProperties(param) {
    const req = this.httpClient.get(this.PG + 'pg_main_cards_details?', { params: toHttpParams(param) }).pipe(retry(0), catchError(this.handleError));
    return this.srv(`pg_props_${param.cityId}`, req, []);
  }

  PGRentCount(city, param) {
    const req = this.httpClient.get(this.PG + 'listing_count/' + city + '?', { params: toHttpParams(param) }).pipe(retry(0), catchError(this.handleError));
    return this.srv(`pg_count_${city}`, req, 0);
  }

  commercialRentProperties(param) {
    const req = this.httpClient.get(this.REST_API_SERVER_rentals + 'get_commercial_rent_details?', { params: toHttpParams(param) }).pipe(retry(0), catchError(this.handleError));
    return this.srv(`comm_rent_${param.cityId}`, req, []);
  }

  commercialProperties(param) {
    const req = this.httpClient.get(this.Commercial + 'commercial_main_cards_details?', { params: toHttpParams(param) }).pipe(retry(0), catchError(this.handleError));
    return this.srv(`comm_main_${param.cityId}`, req, []);
  }

  getIpAddress(): Observable<any> {
    const req = this.httpClient.get(this.apiUrl);
    return this.srv('ip_addr', req, {});
  }

  public getCareerslist(jobcatid, job_experience_id) {
    const carrerNew = { params: new HttpParams({ fromString: 'jobcatid=' + jobcatid + '&job_experience_id=' + job_experience_id }) };
    const req = this.httpClient.get(this.REST_API_SERVER + 'getcareers?', carrerNew).pipe(retry(0), catchError(this.handleError));
    return this.srv(`careers_${jobcatid}`, req, []);
  }

  public getCareersDetailsById(jobId) {
    const options = { params: new HttpParams({ fromObject: { 'jobid': jobId } }) };
    const req = this.httpClient.get(this.REST_API_SERVER + 'getjobdetails', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`job_det_${jobId}`, req, {});
  }

  submitOption(param) {
    const options = toHttpParams(param);
    const req = this.httpClient.post(this.REST_API_SERVER_rentals2 + 'listing_reports', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`report_${param.propId}`, req, null);
  }

  public getlocationlist() {
    const req = this.httpClient.get(this.REST_API_SERVER + 'get_location').pipe(retry(0), catchError(this.handleError));
    return this.srv('locations', req, []);
  }

  getRegionList(cityId) {
    const options = { params: new HttpParams({ fromObject: { 'cityid': cityId } }) };
    const req = this.httpClient.get(this.REST_API_SERVER + 'getPropertyzone', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`regions_${cityId}`, req, []);
  }

  private autoCache: { [cacheKey: string]: Observable<any> } = {};

  getAuto(city_id: string): Observable<any> {

    const cacheKey = `updatedautocomplete_${city_id}`;

    // ✅ Return cached response
    if (this.autoCache[cacheKey]) {
      return this.autoCache[cacheKey];
    }

    const options = new HttpParams().set('city_id', city_id);

    const apiRequest = this.httpClient.get(
      this.REST_API_SERVER + 'updatedautocomplete?',
      { params: options }
    ).pipe(
      retry(1),
      shareReplay(1),
      catchError((err) => {
        console.error('API error:', err);
        delete this.autoCache[cacheKey]; // allow retry
        return of(null);
      })
    );

    this.autoCache[cacheKey] = apiRequest;

    return apiRequest;
  }
  
  // clearCityCache(city_id: string): void {
  //   const key = `updatedautocomplete${city_id}`;
  //   delete this.autoCache[key];
  // }

  private localityAutoCache: { [cacheKey: string]: Observable<any> } = {};

  getlocalityAuto(city_id: string): Observable<any> {

    const cacheKey = `loc_auto_${city_id}`;

    // ✅ Return cached response
    if (this.localityAutoCache[cacheKey]) {
      return this.localityAutoCache[cacheKey];
    }

    const options = {
      params: new HttpParams().set('city_id', city_id)
    };

    const apiRequest = this.httpClient.get(
      this.REST_API_SERVER + 'locality_autocomplete?',
      options
    ).pipe(
      retry(0),
      shareReplay(1),
      catchError((err) => {
        console.error(err);
        delete this.localityAutoCache[cacheKey]; // allow retry
        return of([]);
      })
    );

    this.localityAutoCache[cacheKey] = apiRequest;

    return apiRequest;
  }

  private localityReverseCache: { [cacheKey: string]: Observable<any> } = {};

  getlocalityreverseAuto(city_id: string): Observable<any> {

    const cacheKey = `loc_rev_${city_id}`;

    // ✅ Return cached response
    if (this.localityReverseCache[cacheKey]) {
      return this.localityReverseCache[cacheKey];
    }

    const options = {
      params: new HttpParams().set('city_id', city_id)
    };

    const apiRequest = this.httpClient.get(
      this.REST_API_SERVER + 'localityreverse_autocomplete?',
      options
    ).pipe(
      retry(0),
      shareReplay(1),
      catchError((err) => {
        console.error(err);
        delete this.localityReverseCache[cacheKey]; // allow retry
        return of([]);
      })
    );

    this.localityReverseCache[cacheKey] = apiRequest;

    return apiRequest;
  }

  private builderCache: { [city_id: string]: Observable<any> } = {};

  getbuilderAuto(city_id: string): Observable<any> {

    const cacheKey = `builder_autocomplete_${city_id}`;

    // ✅ Return cached response
    if (this.builderCache[cacheKey]) {
      return this.builderCache[cacheKey];
    }

    const options = new HttpParams().set('city_id', city_id);

    const apiRequest = this.httpClient.get(
      this.REST_API_SERVER + 'builder_autocomplete?',
      { params: options }
    ).pipe(
      retry(1),
      shareReplay(1),
      catchError((err) => {
        console.error('API error:', err);
        delete this.builderCache[cacheKey]; // allow retry next time
        return of(null);
      })
    );

    this.builderCache[cacheKey] = apiRequest;

    return apiRequest;
  }

  addPropertyCallEnquiry(param, pageorgin, cityId, browser) {
    const options = toHttpParams(param).append('pageorgin', pageorgin).append('sourcetype', 'Homes247-Mobile').append('cityId', cityId).append('browser', browser);
    const req = this.httpClient.post(this.REST_API_SERVER2 + 'PropContactInfo', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`enq_${param.propertyid}`, req, null);
  }

  commercialenq(param, pageorgin, cityId, browser) {
    const options = toHttpParams(param).append('pageorgin', pageorgin).append('sourcetype', 'Homes247-Mobile').append('cityId', cityId).append('browser', browser);
    const req = this.httpClient.post(this.Commercial_post + 'PropContactInfo', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`comm_enq_${param.propertyid}`, req, null);
  }

  pgenq(param, pageorgin, cityId, browser) {
    const options = toHttpParams(param).append('pageorgin', pageorgin).append('sourcetype', 'Homes247-Mobile').append('cityId', cityId).append('browser', browser);
    const req = this.httpClient.post(this.PG_post + 'PropContactInfo', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`pg_enq_${param.propertyid}`, req, null);
  }

  gettopproperties(param) {
    const options = { params: new HttpParams({ fromObject: { 'cityId': param.cityId, 'userId': param.userId } }) };
    const req = this.httpClient.get(this.REST_API_SERVER + 'get_topProperties', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`top_props_${param.cityId}`, req, []);
  }

  getnewproperties(param) {
    const req = this.httpClient.get(this.REST_API_SERVER + 'getnewProperties?', { params: toHttpParams(param) }).pipe(retry(0), catchError(this.handleError));
    return this.srv(`new_props_${param.cityId}`, req, []);
  }

  gettoppropertiesupdated(cityId) {
    const options = { params: new HttpParams({ fromString: 'cityId=' + cityId }) };
    const req = this.httpClient.get(this.REST_API_SERVER + 'gettopProperties?', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`top_props_up_${cityId}`, req, []);
  }

  getNearLocality(localityId) {
    const options = { params: new HttpParams({ fromObject: { 'localityId': localityId } }) };
    const req = this.httpClient.get(this.REST_API_SERVER + 'get_similar_loc', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`near_loc_${localityId}`, req, []);
  }

  getNearlocalities(localityId) {
    const options = { params: new HttpParams({ fromObject: { 'localityId': localityId } }) };
    const req = this.httpClient.get(this.REST_API_SERVER + 'getsimilarloc', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`near_locs_${localityId}`, req, []);
  }

  get_builder_locality(param) {
    const req = this.httpClient.get(this.REST_API_SERVER + 'builderlocality?', { params: toHttpParams(param) }).pipe(retry(0), catchError(this.handleError));
    return this.srv(`builder_loc_${param.builderId}`, req, []);
  }

  getNearbyLocProp(param) {
    const req = this.httpClient.get(this.REST_API_SERVER_rentals + 'get_nearBy_locality', { params: toHttpParams(param) }).pipe(retry(0), catchError(this.handleError));
    return this.srv(`nearby_prop_${param.localityId}`, req, []);
  }

  addfavaourite(param) {
    const options = toHttpParams(param);
    const req = this.httpClient.post(this.REST_API_SERVER2 + 'add_Favourite_new', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`add_fav_${param.propid}`, req, null);
  }

  removeFavaourite(param) {
    const options = toHttpParams(param);
    const req = this.httpClient.post(this.REST_API_SERVER2 + 'remove_Favourite_new', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`rem_fav_${param.propid}`, req, null);
  }

  getpropertynewDetails(propId: any): Observable<any> {
    const options = { params: new HttpParams({ fromObject: { 'propId': propId } }) };
    const req = this.httpClient.get(this.REST_API_SERVER4 + 'get_propertyByIdnew', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`prop_new_det_${propId}`, req, {});
  }

  getUserWishListByIdTest(id, CatagoryId) {
    const options = new HttpParams().append('userId', id).append('CatagoryId', CatagoryId);
    const req = this.httpClient.post(this.REST_API_SERVER3 + 'userfavourite_new', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`wishlist_${id}`, req, []);
  }

  getdeleteuserCommercial(param) {
    const options = toHttpParams(param);
    const req = this.httpClient.post(this.Commercial_post + 'delete_property', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`del_comm_${param.propid}`, req, null);
  }

  getContactedProjects(UserId) {
    const options = { params: new HttpParams({ fromObject: { 'userId': UserId } }) };
    const req = this.httpClient.get(this.REST_API_SERVER3 + 'get_contacted_list', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`contacted_${UserId}`, req, []);
  }

  getDeleteReasonsPG() {
    const req = this.httpClient.get(this.PG + 'delete_reasons').pipe(retry(0), catchError(this.handleError));
    return this.srv('del_reasons_pg', req, []);
  }

  getDeleteReasonsCommercial() {
    const req = this.httpClient.get(this.PG + 'delete_reasons').pipe(retry(0), catchError(this.handleError));
    return this.srv('del_reasons_comm', req, []);
  }

  getrecentblogs() {
    const options = { params: new HttpParams({ fromString: 'source=2000' }) };
    const req = this.httpClient.get(this.REST_API_SERVER22 + 'recent_stories?', options).pipe(retry(0), catchError(this.handleError));
    return this.srv('recent_blogs', req, []);
  }

  gettestimonials() {
    const req = this.httpClient.get(this.REST_API_SERVER + 'get_testimonial').pipe(retry(0), catchError(this.handleError));
    return this.srv('testimonials', req, []);
  }

  getSimilarProp(param) {
    const req = this.httpClient.get(this.REST_API_SERVER_rentals + 'get_similar_prop', { params: toHttpParams(param) }).pipe(retry(0), catchError(this.handleError));
    return this.srv(`sim_prop_${param.currentPropertyId}`, req, []);
  }

  private allindiaAutoCache$: Observable<any> | null = null;
  private allindiaAuto2Cache$: Observable<any> | null = null;

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

  getstaticmeta(PAGEID) {
    const options = { params: new HttpParams({ fromString: 'pageid=' + PAGEID }) };
    const req = this.httpClient.get(this.REST_API_SERVER22 + 'staticseo?', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`static_meta_${PAGEID}`, req, {});
  }

  getNearLocalityRental(param) {
    const options = { params: new HttpParams({ fromObject: { 'localityId': param.localityId } }) };
    const req = this.httpClient.get(this.REST_API_SERVER_rentals + 'get_locality_list_count', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`near_rent_count_${param.localityId}`, req, 0);
  }

  getcityhomepageseo(PAGEID) {
    const options = { params: new HttpParams({ fromString: 'pageid=' + PAGEID }) };
    const req = this.httpClient.get(this.REST_API_SERVER + 'cityhomepageseo?', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`city_hp_seo_${PAGEID}`, req, {});
  }

  getseocitymeta(idcity) {
    const options = { params: new HttpParams({ fromString: 'CityId=' + idcity }) };
    const req = this.httpClient.get(this.REST_API_SERVER + 'cityseo?', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`city_seo_${idcity}`, req, {});
  }

  get_tinyMCE() {
    const req = this.httpClient.get(this.REST_API_SERVER44 + 'get_tinyMCE').pipe(retry(0), catchError(this.handleError));
    return this.srv('tiny_mce', req, null);
  }

  getseocitylistmeta(idcity) {
    const options = { params: new HttpParams({ fromString: 'CityId=' + idcity }) };
    const req = this.httpClient.get(this.REST_API_SERVER + 'citylistingseo?', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`city_list_meta_${idcity}`, req, {});
  }

  getprojectscount(city, param) {
    const req = this.httpClient.get(this.REST_API_SERVER + 'get_counts/' + city + '?', { params: toHttpParams(param) }).pipe(retry(0), catchError(this.handleError));
    return this.srv(`proj_count_${city}`, req, 0);
  }

  getprojectsbudgetcount(param) {
    const req = this.httpClient.get(this.REST_API_SERVER + 'getbudget_counts?', { params: toHttpParams(param) }).pipe(retry(0), catchError(this.handleError));
    return this.srv(`budget_count_${param.locality}`, req, 0);
  }

  getCity(city, param) {
    const req = this.httpClient.get(this.REST_API_SERVER + 'search_new/' + city + '?', { params: toHttpParams(param) }).pipe(retry(0), catchError(this.handleError));
    return this.srv(`search_city_${city}`, req, []);
  }

  getbudgetfilterdata(param) {
    const req = this.httpClient.get(this.REST_API_SERVER + 'budgetsearch?', { params: toHttpParams(param) }).pipe(retry(0), catchError(this.handleError));
    return this.srv(`budget_search_${param.city}`, req, []);
  }

  getcrawlcity(city, param) {
    const options = { params: new HttpParams({ fromString: 'limit=' + param.limit + '&limitrows=' + param.limitrows + '&locality=' + param.locality + '&buliderId=' + param.buliderId + '&regionid=' + param.regionid + '&statusid=' + param.statusid + '&proptypeid=' + param.proptypeid + '&localityname=' + param.localityname }) };
    const req = this.httpClient.get(this.REST_API_SERVER + 'crawlsearch/' + city + '?', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`crawl_${city}`, req, []);
  }

  getbedrooms() {
    const req = this.httpClient.get(this.REST_API_SERVER + 'get_bedrooms').pipe(retry(0), catchError(this.handleError));
    return this.srv('bedrooms', req, []);
  }

  getbudgets() {
    const req = this.httpClient.get(this.REST_API_SERVER + 'get_budget').pipe(retry(0), catchError(this.handleError));
    return this.srv('budgets', req, []);
  }

  getpossissions() {
    const req = this.httpClient.get(this.REST_API_SERVER + 'get_possission').pipe(retry(0), catchError(this.handleError));
    return this.srv('possessions', req, []);
  }

  SubscribBlog(param) {
    const options = new HttpParams().append('name', param.name).append('mail', param.mail);
    const req = this.httpClient.post(this.REST_API_SERVER2 + 'blogsubscribers', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`sub_blog_${param.mail}`, req, null);
  }

  getproptypemeta(typeid, cityid) {
    const options = { params: new HttpParams({ fromString: 'TypeId=' + typeid + '&Cityid=' + cityid }) };
    const req = this.httpClient.get(this.REST_API_SERVER + 'proptypeseo?', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`meta_type_${typeid}_${cityid}`, req, {});
  }

  private localityMetaCache: { [cacheKey: string]: Observable<any> } = {};
  getlocalitymeta(city: string, param: { locid: any }): Observable<any> {
 
    const locidStr = Array.isArray(param.locid) ? param.locid[0] : param.locid;
    const cacheKey = `${city}_${locidStr}`;

    // ✅ If already cached, return it
    if (this.localityMetaCache[cacheKey]) {
      return this.localityMetaCache[cacheKey];
    }

    const options = new HttpParams().set('locid', locidStr);

    const apiRequest = this.httpClient.get(
      this.REST_API_SERVER + 'get_locseotag/' + city + '?',
      { params: options }
    ).pipe(
      retry(0),
      shareReplay(1),
      catchError((err) => {
        console.error('API error:', err);
        delete this.localityMetaCache[cacheKey]; // ✅ allow retry next time
        return of(null);
      })
    );

    this.localityMetaCache[cacheKey] = apiRequest;

    return apiRequest;
  }

  getbuildermeta(city, param) {
    const options = { params: new HttpParams({ fromObject: { buildid: param.buildid, Cityid: param.Cityid } }) };
    const req = this.httpClient.get(this.REST_API_SERVER + 'get_builderseo/' + city + '?', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`meta_builder_${param.buildid}`, req, {});
  }

  getpropstatusmeta(statusid, cityid) {
    const options = { params: new HttpParams({ fromObject: { StatusId: statusid, Cityid: cityid } }) };
    const req = this.httpClient.get(this.REST_API_SERVER + 'propstatusseo?', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`meta_status_${statusid}_${cityid}`, req, {});
  }

  getcityregionmeta(regionid) {
    const options = { params: new HttpParams({ fromObject: { RegionId: regionid } }) };
    return this.httpClient.get(this.REST_API_SERVER + 'cityregionseo?', options).pipe(retry(0), catchError(this.handleError));
    // return this.srv(`meta_region_${regionid}`, req, {});
  }

  getproperty(propId) {
    const options = { params: new HttpParams({ fromObject: { 'propId': propId } }) };
    const req = this.httpClient.get(this.REST_API_SERVER + 'get_propertyById', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`prop_det_${propId}`, req, {});
  }

  getpropertyfavparam(propId, userId) {
    const options = { params: new HttpParams({ fromObject: { 'propId': propId, 'userId': userId } }) };
    const req = this.httpClient.get(this.REST_API_SERVER + 'get_propertyById', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`prop_fav_${propId}`, req, {});
  }

  sarjapuradenquiry(param, LandingName) {
    const options = new HttpParams().append('name', param.name).append('number', param.number).append('pageorgin', LandingName);
    const req = this.httpClient.post(this.REST_API_SERVER2 + 'adcallback', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`ad_enq_${param.number}`, req, null);
  }

  ahadadenquiry(param) {
    const options = new HttpParams().append('name', param.ename).append('number', param.number).append('mail', param.email).append('pageorgin', param.propertyname);
    const req = this.httpClient.post(this.REST_API_SERVER2 + 'ahadadapi', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`ahad_enq_${param.number}`, req, null);
  }

  getOfferslist(param) {
    const req = this.httpClient.get(this.REST_API_SERVER + 'offerslisting/', { params: toHttpParams(param) }).pipe(retry(0), catchError(this.handleError));
    return this.srv('offers_list', req, []);
  }

  getcityofferslist(id) {
    const options = { params: new HttpParams({ fromObject: { 'cityId': id } }) };
    const req = this.httpClient.get(this.REST_API_SERVER + 'getcitywiseoffers', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`city_offers_${id}`, req, []);
  }

  getOffers(city, param) {
    const req = this.httpClient.get(this.REST_API_SERVER + 'offerslisting/' + city + '?', { params: toHttpParams(param) }).pipe(retry(0), catchError(this.handleError));
    return this.srv(`offers_${city}`, req, []);
  }

  getOffersCount(city, param) {
    const req = this.httpClient.get(this.REST_API_SERVER + 'offerscount/' + city + '?', { params: toHttpParams(param) }).pipe(retry(0), catchError(this.handleError));
    return this.srv(`offers_count_${city}`, req, 0);
  }

  public getpricecareerall(): Observable<any> {
    const req = this.httpClient.get('assets/json/carrer.json').pipe(retry(0), catchError(this.handleError));
    return this.srv('careers_json', req, []);
  }

  addcareerCall(formData) {
    const req = this.httpClient.post(this.REST_API_SERVER2 + 'applyjob', formData).pipe(retry(0), catchError(this.handleError));
    return this.srv('apply_job', req, null);
  }

  addFAQCallBack(name, emailid, msg) {
    const options = new HttpParams().append('name', name).append('emailid', emailid).append('msg', msg);
    const req = this.httpClient.post(this.REST_API_SERVER2 + 'faq', options).pipe(retry(0), catchError(this.handleError));
    return this.srv('faq_call', req, null);
  }

  getblogslist() {
    const req = this.httpClient.get(this.REST_API_SERVER + 'blogs').pipe(retry(0), catchError(this.handleError));
    return this.srv('blogs', req, []);
  }

  gettopblogslist() {
    const req = this.httpClient.get(this.REST_API_SERVER22 + 'top_stories').pipe(retry(0), catchError(this.handleError));
    return this.srv('top_blogs', req, []);
  }

  getblogstory(id) {
    const options = { params: new HttpParams({ fromObject: { 'id': id } }) };
    const req = this.httpClient.get(this.REST_API_SERVER + 'stories_deatail_page', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`blog_story_${id}`, req, {});
  }

  getinfographicblog(id) {
    const options = { params: new HttpParams({ fromObject: { 'id': id } }) };
    const req = this.httpClient.get(this.REST_API_SERVER + 'getblog_infographic', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`info_blog_${id}`, req, {});
  }

  getsimilarblog(Id) {
    const options = { params: new HttpParams({ fromObject: { 'id': Id, 'source': '2000' } }) };
    const req = this.httpClient.get(this.REST_API_SERVER + 'similarblogs', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`sim_blog_${Id}`, req, []);
  }

  getcitynewurl(idcity, urlid) {
    const options = { params: new HttpParams({ fromObject: { Cityurl: urlid, Cityid: idcity } }) };
    const req = this.httpClient.get(this.REST_API_SERVER + 'citynewurl?', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`city_url_${idcity}`, req, {});
  }

  getexpolisting(city, param) {
    const req = this.httpClient.get(this.REST_API_SERVER + 'expolisting/' + city + '?', { params: toHttpParams(param) }).pipe(retry(0), catchError(this.handleError));
    return this.srv(`expo_${city}`, req, []);
  }

  public getprice(): Observable<any> {
    const req = this.httpClient.get('assets/json/banglore_price.json').pipe(retry(0), catchError(this.handleError));
    return this.srv('price_blr', req, []);
  }

  public getpricechennai(): Observable<any> {
    const req = this.httpClient.get('assets/json/chennai_price.json').pipe(retry(0), catchError(this.handleError));
    return this.srv('price_chn', req, []);
  }

  public getpricehyb(): Observable<any> {
    const req = this.httpClient.get('assets/json/hyderabad_price.json').pipe(retry(0), catchError(this.handleError));
    return this.srv('price_hyd', req, []);
  }

  public getpricekochi(): Observable<any> {
    const req = this.httpClient.get('assets/json/kochi_price.json').pipe(retry(0), catchError(this.handleError));
    return this.srv('price_koc', req, []);
  }

  public getpricepune(): Observable<any> {
    const req = this.httpClient.get('assets/json/pune_price.json').pipe(retry(0), catchError(this.handleError));
    return this.srv('price_pune', req, []);
  }

  getpropertiesByBuilders(propId, builderId) {
    const options = { params: new HttpParams({ fromObject: { 'propId': propId, 'BuilderId': builderId } }) };
    const req = this.httpClient.get(this.REST_API_SERVER + 'similarbuilderproperties', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`builder_props_${builderId}`, req, []);
  }

  getsimilarProp(propId) {
    const options = { params: new HttpParams({ fromObject: { 'propId': propId } }) };
    const req = this.httpClient.get(this.REST_API_SERVER + 'similarprop', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`sim_prop_p_${propId}`, req, []);
  }

  individuallistenq(param, Exactpage, propname, userid) {
    const options = toHttpParams(param).append('propertyname', propname).append('pageorgin', Exactpage).append('userid', userid).append('sourcetype', 'Homes247-Mobile');
    const req = this.httpClient.post(this.REST_API_SERVER_Individuallist2 + 'individuallistenq', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`ind_enq_${userid}`, req, null);
  }

  rentalsenq(param, Exactpage, propname, userid) {
    const options = toHttpParams(param).append('propertyname', propname).append('pageorgin', Exactpage).append('userid', userid).append('sourcetype', 'Homes247-Mobile');
    const req = this.httpClient.post(this.REST_API_SERVER_rentals2 + 'rentalcallback', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`rent_enq_${userid}`, req, null);
  }

  specialformproppage(param, propertyname, varient, proptype, budget, location, cityId) {
    const options = new HttpParams().append('name', param.name).append('number', param.number).append('propertyname', propertyname).append('email', param.mail).append('varient', varient).append('propertytype', proptype).append('budget', budget).append('location', location).append('sourcetype', 'Homes247-Mobile').append('cityId', cityId);
    const req = this.httpClient.post(this.REST_API_SERVER2 + 'specialform_proppage', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`spec_form_${cityId}`, req, null);
  }

  virtualcall(param) {
    const options = new HttpParams().append('name', param.name).append('date', param.date).append('time', param.time).append('number', param.number).append('application', param.application);
    const req = this.httpClient.post(this.REST_API_SERVER2 + 'virtualcallback', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`v_call_${param.number}`, req, null);
  }

  otpsend(param) {
    const options = new HttpParams().append('number', param.number);
    const req = this.httpClient.post(this.REST_API_SERVER2 + 'asdthyujdllkhjsjkkjhs', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`otp_send_${param.number}`, req, null);
  }

  otpvalidcheck(param) {
    const options = new HttpParams().append('otp', param.otp).append('number', param.number);
    const req = this.httpClient.post(this.REST_API_SERVER2 + 'otpvalidate', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`otp_check_${param.number}`, req, null);
  }

  numbercheck(param) {
    const options = new HttpParams().append('number', param.number);
    const req = this.httpClient.post(this.REST_API_SERVER2 + 'number_validate', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`num_check_${param.number}`, req, null);
  }

  private localityCache: { [cacheKey: string]: Observable<any> } = {};

  getTopLocalities(param: { cityId: string }): Observable<any> {

    const city_id = param.cityId;
    const cacheKey = `toplocalities_${city_id}`;

    // ✅ Return cached response
    if (this.localityCache[cacheKey]) {
      return this.localityCache[cacheKey];
    }

    const apiRequest = this.httpClient.get(
      this.REST_API_SERVER + 'top_localities?',
      { params: toHttpParams(param) }
    ).pipe(
      retry(0),
      shareReplay(1),
      catchError((err) => {
        console.error('API error:', err);
        delete this.localityCache[cacheKey]; // allow retry
        return of(null);
      })
    );

    this.localityCache[cacheKey] = apiRequest;

    return apiRequest;
  }

  getvedioblogs() {
    const options = { params: new HttpParams({ fromString: 'source=2000' }) };
    const req = this.httpClient.get(this.REST_API_SERVER22 + 'blogvideos?', options).pipe(retry(0), catchError(this.handleError));
    return this.srv('video_blogs', req, []);
  }

  getpropertyblogtags() {
    const req = this.httpClient.get(this.REST_API_SERVER + 'blogpropertytags').pipe(retry(0), catchError(this.handleError));
    return this.srv('blog_tags', req, []);
  }

  propdetailsforblogads(id) {
    const options = new HttpParams().append('id', id);
    const req = this.httpClient.post(this.REST_API_SERVER2 + 'propdetailsinblogads', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`blog_ad_p_${id}`, req, {});
  }


  AiGetParams(value) {
    const body = { query: value };
    const req = this.httpClient.post(this.aisearch, body).pipe(retry(0), catchError(this.handleError));
    return this.srv(`aisearch${value}`, req, {});
  }


  getblogCat(id) {
    const options = { params: new HttpParams({ fromObject: { 'id': id, 'source': '2000' } }) };
    const req = this.httpClient.get(this.REST_API_SERVER22 + 'blogcategories', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`blog_cat_${id}`, req, []);
  }

  getcategseometa(id) {
    const options = { params: new HttpParams({ fromString: 'pageid=' + id }) };
    const req = this.httpClient.get(this.REST_API_SERVER + 'blogcategseo?', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`cat_seo_${id}`, req, {});
  }

  updateBlogComment(param) {
    const options = toHttpParams(param);
    const req = this.httpClient.post(this.REST_API_SERVER2 + 'commentsapproval', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`up_blog_comm_${param.blogid}`, req, null);
  }

  getZoneList(param) {
    const options = { params: new HttpParams({ fromObject: { 'cityId': param } }) };
    const req = this.httpClient.get(this.REST_API_SERVER + 'zone', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`zone_det_${param}`, req, {});
  }

  getblogcomments(id) {
    const options = new HttpParams().append('id', id);
    const req = this.httpClient.post(this.REST_API_SERVER2 + 'getcomments', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`blog_comms_${id}`, req, []);
  }

  getBlogslikes(id) {
    const options = new HttpParams().append('id', id);
    const req = this.httpClient.post(this.REST_API_SERVER2 + 'getlikecount', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`blog_likes_${id}`, req, 0);
  }

  addlikes(blogid, likecount) {
    const options = new HttpParams().append('likecount', likecount).append('blogid', blogid);
    const req = this.httpClient.post(this.REST_API_SERVER2 + 'likecountadd', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`add_like_${blogid}`, req, null);
  }

  addviews(blogid, viewcount) {
    const options = new HttpParams().append('viewcount', viewcount).append('blogid', blogid);
    const req = this.httpClient.post(this.REST_API_SERVER2 + 'viewcountadd', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`add_view_${blogid}`, req, null);
  }

  CheckNumSurvey(param) {
    const options = new HttpParams().append('number', param.number);
    const req = this.httpClient.post(this.REST_API_SERVER2 + 'survey_numvalidation', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`check_sur_${param.number}`, req, null);
  }

  addSurvey(param) {
    const options = toHttpParams(param);
    const req = this.httpClient.post(this.REST_API_SERVER2 + 'add_Survey', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`add_sur_${param.number}`, req, null);
  }

  getsurveyList() {
    const req = this.httpClient.get(this.REST_API_SERVER + 'polling_question_list').pipe(retry(0), catchError(this.handleError));
    return this.srv('sur_list', req, []);
  }

  get_polling_list() {
    const req = this.httpClient.get(this.REST_API_SERVER + 'get_polling_list').pipe(retry(0), catchError(this.handleError));
    return this.srv('pol_list', req, []);
  }

  getsurveyListQestionOne(value) {
    const options = new HttpParams().append('value', value);
    const req = this.httpClient.post(this.REST_API_SERVER2 + 'polling_list', options).pipe(retry(0), catchError(this.handleError));
    return this.srv('pol_q1', req, []);
  }

  addNewUserReg(param) {
    const options = toHttpParams(param);
    const req = this.httpClient.post(this.REST_API_SERVER2 + 'add_user_registration', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`reg_${param.number}`, req, null);
  }

  CheckRegEmail(param) {
    const options = new HttpParams().append('email', param.valmail).append('number', param.valnumber);
    const req = this.httpClient.post(this.REST_API_SERVER2 + 'registration_email_validate', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`check_reg_${param.valnumber}`, req, null);
  }

  userLogin(param) {
    const options = new HttpParams().append('email', param.loginmail).append('password', param.loginpass);
    const req = this.httpClient.post(this.REST_API_SERVER2 + 'userLogin', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`login_${param.loginmail}`, req, null);
  }

  CheckNumLogin(param) {
    const options = new HttpParams().append('number', param.number);
    const req = this.httpClient.post(this.REST_API_SERVER2 + 'login_numvalidation', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`check_login_${param.number}`, req, null);
  }

  userLoginWithOtp(param) {
    const options = { params: new HttpParams().set('number', param.number) };
    const req = this.httpClient.get(this.REST_API_SERVER + 'getUserByNumber?', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`login_otp_${param.number}`, req, null);
  }

  forgetPasswordRequest(resetemail: any) {
    const req = this.httpClient.get(this.REST_API_SERVER + 'ResetPasswordLink' + '?email=' + resetemail).pipe(retry(0), catchError(this.handleError));
    return this.srv(`forget_pass_${resetemail}`, req, null);
  }

  updateUserPassword(param) {
    const options = new HttpParams().append('id', param.id).append('password', param.password).append('confirmPassword', param.confirmpassword);
    const req = this.httpClient.post(this.REST_API_SERVER2 + 'updateUserPassword', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`up_pass_${param.id}`, req, null);
  }

  userfavouritelist(param) {
    const options = new HttpParams().append('userId', param.userid);
    const req = this.httpClient.post(this.REST_API_SERVER3 + 'userfavourite_new', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`favs_${param.userid}`, req, []);
  }

  userseenprojects(param) {
    const options = new HttpParams().append('userId', param);
    const req = this.httpClient.post(this.REST_API_SERVER3 + 'userrecentView_new', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`seen_${param}`, req, []);
  }

  updateuserdata(param) {
    const options = new HttpParams().append('id', param.regid).append('name', param.name).append('lastname', param.lname).append('mail', param.mail);
    const req = this.httpClient.post(this.REST_API_SERVER2 + 'updateuser', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`up_user_${param.regid}`, req, null);
  }

  addUserSeenProjects(param) {
    const options = toHttpParams(param);
    const req = this.httpClient.post(this.REST_API_SERVER2 + 'add_recent_view', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`add_seen_${param.propid}`, req, null);
  }

  reviewfetching(propid) {
    const options = new HttpParams().append('propId', propid);
    const req = this.httpClient.post(this.REST_API_SERVER2 + 'getratinglist', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`revs_${propid}`, req, []);
  }

  addreview(param) {
    const options = toHttpParams(param);
    const req = this.httpClient.post(this.REST_API_SERVER2 + 'propertyrating', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`add_rev_${param.propId}`, req, null);
  }

  Loginwithnum(param) {
    const options = new HttpParams().append('number', param.number).append('username', param.username).append('device_source', param.device_source);
    const req = this.httpClient.post(this.REST_API_SERVER2 + 'login_withnumber', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`login_num_${param.number}`, req, null);
  }

  changenumber(param) {
    const options = new HttpParams().append('id', param.id).append('number', param.number);
    const req = this.httpClient.post(this.REST_API_SERVER2 + 'changenumber', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`up_num_${param.id}`, req, null);
  }

  DiscusQuestionList(param) {
    const options = new HttpParams().append('propId', param.propId);
    const req = this.httpClient.post(this.REST_API_SERVER2 + 'getQuestionsList', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`q_list_${param.propId}`, req, []);
  }

  DiscusQuestionListById(param) {
    const options = new HttpParams().append('questionId', param.questionId);
    const req = this.httpClient.post(this.REST_API_SERVER2 + 'getQuestionsListByQuestionID', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`q_id_${param.questionId}`, req, {});
  }

  Postquestion(param) {
    const options = toHttpParams(param);
    const req = this.httpClient.post(this.REST_API_SERVER2 + 'postQuestions', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`post_q_${param.propId}`, req, null);
  }

  Postanswer(param) {
    const options = toHttpParams(param);
    const req = this.httpClient.post(this.REST_API_SERVER2 + 'postAnswer', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`post_a_${param.QuestionId}`, req, null);
  }

  getAutocompare(cityid, proptype) {
    const req = this.httpClient.get(this.REST_API_SERVER + `compareautocomplete?city_id=${cityid}&prop_type=${proptype}`).pipe(retry(0), catchError(this.handleError));
    return this.srv(`comp_auto_${cityid}`, req, []);
  }
  
  getNearByLocalities(localityId) {
    const options = { params: new HttpParams({ fromObject: { 'localityId': localityId } }) };
    const req = this.httpClient.get(this.REST_API_SERVER + 'get_similar_loc', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`near_loc_sim_${localityId}`, req, []);
  }

  getIndividualList(citi, param) {
    const req = this.httpClient.get(this.REST_API_SERVER_Individuallist3 + 'listings_hari/' + citi + '?', { params: toHttpParams(param) }).pipe(retry(0), catchError(this.handleError));
    return this.srv(`ind_listing_${citi}`, req, []);
  }

  getindividualprojectscount(city, param) {
    const req = this.httpClient.get(this.REST_API_SERVER_Individuallist3 + 'listing_counts/' + city + '?', { params: toHttpParams(param) }).pipe(retry(0), catchError(this.handleError));
    return this.srv(`ind_count_${city}`, req, 0);
  }

  getindividualpropertydetails(propId) {
    const options = { params: new HttpParams({ fromObject: { 'propId': propId } }) };
    const req = this.httpClient.get(this.REST_API_SERVER_Individuallist3 + 'get_propertyById', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`ind_p_det_${propId}`, req, {});
  }

  getrentalList(city, param) {
    const req = this.httpClient.get(this.REST_API_SERVER_rentals + 'listings_hari/' + city + '?', { params: toHttpParams(param) }).pipe(retry(0), catchError(this.handleError));
    return this.srv(`rent_listing_${city}`, req, []);
  }

  getRentalsDetailsById(propId) {
    const options = { params: new HttpParams({ fromObject: { propId: propId } }) };
    const req = this.httpClient.get(this.REST_API_SERVER_rentals + 'get_propertyById', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`rent_det_${propId}`, req, {});
  }

  getCommercialDetailsById(propId, commercial_type) {
    const options = { params: new HttpParams({ fromObject: { propid: propId, Commercial_type: commercial_type } }) };
    const req = this.httpClient.get(this.Commercial + 'detailsby_propid?', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`comm_det_${propId}`, req, {});
  }

  getpgDetailsById(propId) {
    const options = { params: new HttpParams({ fromObject: { propid: propId } }) };
    const req = this.httpClient.get(this.PG + 'detailsby_propid?', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`pg_det_id_${propId}`, req, {});
  }

  getrentpropertyonCity(cityId, proptypeid) {
    const options = { params: new HttpParams({ fromObject: { 'city_id': cityId, 'Property_typeid': proptypeid } }) };
    const req = this.httpClient.get(this.REST_API_SERVER_rentals + 'propertyautocomplete', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`rent_auto_${cityId}`, req, []);
  }

  getRentprojectscount(city, param) {
    const req = this.httpClient.get(this.REST_API_SERVER_rentals + 'listing_counts/' + city + '?', { params: toHttpParams(param) }).pipe(retry(0), catchError(this.handleError));
    return this.srv(`rent_count_${city}`, req, 0);
  }

  getpropertyonCity(cityId, proptypeid) {
    const options = { params: new HttpParams({ fromObject: { 'city_id': cityId, 'Property_typeid': proptypeid } }) };
    const req = this.httpClient.get(this.REST_API_SERVER_Individuallist3 + 'propertyautocomplete', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`ind_auto_${cityId}`, req, []);
  }

  getindividualcity() {
    const req = this.httpClient.get(this.REST_API_SERVER_Individuallist3 + 'get_city').pipe(retry(0), catchError(this.handleError));
    return this.srv('ind_cities', req, []);
  }

  getindividualRegionList(cityId) {
    const options = { params: new HttpParams({ fromObject: { 'cityid': cityId } }) };
    const req = this.httpClient.get(this.REST_API_SERVER_Individuallist3 + 'getPropertyzone', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`ind_reg_${cityId}`, req, []);
  }

  getindividuallocality(cityId, regionid) {
    const options = { params: new HttpParams({ fromObject: { 'cityId': cityId, 'zone': regionid } }) };
    const req = this.httpClient.get(this.REST_API_SERVER_Individuallist3 + 'getcity_basedLocation', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`ind_loc_${regionid}`, req, []);
  }

  getRentcity() {
    const req = this.httpClient.get(this.REST_API_SERVER_rentals + 'get_city').pipe(retry(0), catchError(this.handleError));
    return this.srv('rent_cities', req, []);
  }

  getRentRegionList(cityId) {
    const options = { params: new HttpParams({ fromObject: { 'cityid': cityId } }) };
    const req = this.httpClient.get(this.REST_API_SERVER_rentals + 'getPropertyzone', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`rent_reg_${cityId}`, req, []);
  }

  getRentlocality(cityId, regionid) {
    const options = { params: new HttpParams({ fromObject: { 'cityId': cityId, 'zone': regionid } }) };
    const req = this.httpClient.get(this.REST_API_SERVER_rentals + 'getcity_basedLocation', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`rent_loc_${regionid}`, req, []);
  }

  getrentfilterslist() {
    const req = this.httpClient.get(this.REST_API_SERVER_rentals + 'datafilters').pipe(retry(0), catchError(this.handleError));
    return this.srv('rent_filters', req, {});
  }

  private rentFiltersCache: { [cacheKey: string]: Observable<any> } = {};

  getrentfilterslistFilter(cityId: string): Observable<any> {

    const cacheKey = `rent_filters_${cityId}`;

    // ✅ Return cached response
    if (this.rentFiltersCache[cacheKey]) {
      return this.rentFiltersCache[cacheKey];
    }

    const apiRequest = this.httpClient.get(
      this.REST_API_SERVER_rentals + 'datafilters',
      { params: new HttpParams().set('CityId', cityId) }
    ).pipe(
      retry(0),
      shareReplay(1),
      catchError((err) => {
        console.error('API error:', err);
        delete this.rentFiltersCache[cacheKey]; // allow retry
        return of(null);
      })
    );

    this.rentFiltersCache[cacheKey] = apiRequest;

    return apiRequest;
  }


  public uploadFileCommercial(data) {
    const req = this.httpClient.post(this.Commercial_post + 'image_upload_new', data).pipe(retry(0), catchError(this.handleError));
    return this.srv('up_comm_img', req, null);
  }

  public uploadFilePGCover(data) {
    const req = this.httpClient.post(this.PG_post + 'image_upload_new', data).pipe(retry(0), catchError(this.handleError));
    return this.srv('up_pg_img', req, null);
  }

  postPropertyPg(param) {
    const options = toHttpParams(param);
    const req = this.httpClient.post(this.PG_post + 'post_property', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`post_pg_${param.Phone_number}`, req, null);
  }

  postPropertyCommercial(param) {
    const options = toHttpParams(param);
    const req = this.httpClient.post(this.Commercial_post + 'post_property', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`post_comm_${param.phone_number}`, req, null);
  }

  postPropNewPg2() {
    const req = this.httpClient.get(this.PG + 'datafilters').pipe(retry(0), catchError(this.handleError));
    return this.srv('pg_filters', req, {});
  }

  postPropNewCommercial1() {
    const req = this.httpClient.get(this.Commercial + 'datafilters').pipe(retry(0), catchError(this.handleError));
    return this.srv('comm_filters', req, {});
  }

  postPropNewCommercial(value) {
    const req = this.httpClient.get(this.Commercial + 'datafilters?', { params: toHttpParams(value) }).pipe(retry(0), catchError(this.handleError));
    return this.srv(`comm_filters_${value.CityId}`, req, {});
  }

  private filtersCache: { [cacheKey: string]: Observable<any> } = {};

  getFiltersDatalistSaleTest(cityId: string): Observable<any> {

    const cacheKey = `filters_datalist_${cityId}`;

    if (this.filtersCache[cacheKey]) {
      return this.filtersCache[cacheKey];
    }

    const apiRequest = this.httpClient.get(
      this.REST_API_SERVER + 'datafilters',
      { params: new HttpParams().set('CityId', cityId) }
    ).pipe(
      retry(0),
      shareReplay(1),
      catchError((err) => {
        console.error(err);
        delete this.filtersCache[cacheKey];
        return of(null);
      })
    );

    this.filtersCache[cacheKey] = apiRequest;

    return apiRequest;
  }

  postlisting(param) {
    const req = this.httpClient.post(this.REST_API_SERVER_Individuallist2 + 'postpropertytest', toHttpParams(param)).pipe(retry(0), catchError(this.handleError));
    return this.srv(`post_ind_${param.Userid}`, req, null);
  }

  postrentlisting(param) {
    const req = this.httpClient.post(this.REST_API_SERVER_rentals2 + 'postpropertytest', toHttpParams(param)).pipe(retry(0), catchError(this.handleError));
    return this.srv(`post_rent_${param.Userid}`, req, null);
  }

  getuserselllist(param) {
    const options = new HttpParams().append('Userid', param.userid);
    const req = this.httpClient.post(this.REST_API_SERVER_Individuallist2 + 'userlistings', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`user_sell_${param.userid}`, req, []);
  }

  getuserrentlist(param) {
    const options = new HttpParams().append('Userid', param.userid);
    const req = this.httpClient.post(this.REST_API_SERVER_rentals2 + 'userlistings', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`user_rent_${param.userid}`, req, []);
  }

  getuserPGlist(Userid) {
    const options = { params: new HttpParams({ fromObject: { Userid: Userid.userid } }) };
    const req = this.httpClient.get(this.PG + 'userlisting', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`user_pg_${Userid.userid}`, req, []);
  }

  getEnquiredListCommercial(propId) {
    const options = { params: new HttpParams({ fromObject: { 'property_id': propId } }) };
    const req = this.httpClient.get(this.Commercial + 'get_enquired_prop', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`comm_enq_list_${propId}`, req, []);
  }

  postPropertyCommercialUpdate(param) {
    const req = this.httpClient.post(this.Commercial_post + 'update_post_property', toHttpParams(param)).pipe(retry(0), catchError(this.handleError));
    return this.srv(`up_comm_${param.Propid}`, req, null);
  }

  postPropertyPgUpdate(param) {
    const req = this.httpClient.post(this.PG_post + 'update_post_property', toHttpParams(param)).pipe(retry(0), catchError(this.handleError));
    return this.srv(`up_pg_${param.pg_Propid}`, req, null);
  }

  public uploadFilePGGallaryUpdate(data) {
    const req = this.httpClient.post(this.PG_post + 'updategalleryimages', data).pipe(retry(0), catchError(this.handleError));
    return this.srv('up_pg_gal', req, null);
  }

  public uploadFileCommercialGallaryUpdate(data) {
    const req = this.httpClient.post(this.Commercial_post + 'updategalleryimages', data).pipe(retry(0), catchError(this.handleError));
    return this.srv('up_comm_gal', req, null);
  }

  deleteGalleryImageByImageIdPG(propId, imgId) {
    const options = new HttpParams().append('propertyid', propId).append('imageid', imgId);
    const req = this.httpClient.post(this.PG_post + 'delete_gallery_img', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`del_pg_gal_${imgId}`, req, null);
  }

  deleteGalleryImageByImageIdCommercial(propId, imgId) {
    const options = new HttpParams().append('propertyid', propId).append('imageid', imgId);
    const req = this.httpClient.post(this.Commercial_post + 'delete_gallery_img', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`del_comm_gal_${imgId}`, req, null);
  }

  getPropDetailsCommercialById(Userid, Propid, TypeId) {
    const options = { params: new HttpParams({ fromString: `Userid=${Userid}&Propid=${Propid}&typeId=${TypeId}` }) };
    const req = this.httpClient.get(this.Commercial + 'edituserproperty?', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`comm_edit_${Propid}`, req, {});
  }

  getPropDetailsPgById(Userid, Propid, TypeId) {
    const options = { params: new HttpParams({ fromString: `Userid=${Userid}&Propid=${Propid}&typeId=${TypeId}` }) };
    const req = this.httpClient.get(this.PG + 'edituserproperty?', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`pg_edit_${Propid}`, req, {});
  }

  getSimilarPG(param) {
    const options = { params: toHttpParams(param) };
    const req = this.httpClient.get(this.PG + 'pg_similarProperties', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`sim_pg_${param.currentpg_id}`, req, []);
  }

  getNearLocalityPGsCount(param) {
    const options = { params: new HttpParams({ fromObject: { 'locality_IDPK': param.locality_ID } }) };
    const req = this.httpClient.get(this.PG + 'pgnearbycount', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`near_pg_count_${param.locality_ID}`, req, 0);
  }

  getNearbyLocPGs(param) {
    const options = { params: toHttpParams(param) };
    const req = this.httpClient.get(this.PG + 'pg_nearby', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`near_pg_${param.currentpg_id}`, req, []);
  }

  getSimilarCommercialProp(param) {
    const options = { params: toHttpParams(param) };
    const req = this.httpClient.get(this.Commercial + 'commercial_similarProperties', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`sim_comm_${param.prope_id}`, req, []);
  }

  getNearbyLocCommercialProp(param) {
    const options = { params: toHttpParams(param) };
    const req = this.httpClient.get(this.Commercial + 'commercial_nearby', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`near_comm_${param.currentproperty_id}`, req, []);
  }

  getNearLocalityCommercialPropCount(param) {
    const options = { params: new HttpParams({ fromObject: { 'locality_ID': param.localityId } }) };
    const req = this.httpClient.get(this.Commercial + 'commercial_localitycount', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`near_comm_count_${param.localityId}`, req, 0);
  }

  getEnquiredList(propName, enquireFor) {
    const options = { params: new HttpParams({ fromObject: { 'customer_property': propName, 'id_filter': enquireFor } }) };
    const req = this.httpClient.get(this.REST_API_SERVER3 + 'get_enquired_prop', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`enq_list_${propName}`, req, []);
  }

  getEnquiredListPG(pg_ID) {
    const options = { params: new HttpParams({ fromObject: { 'property_id': pg_ID } }) };
    const req = this.httpClient.get(this.PG + 'get_enquired_prop', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`pg_enq_list_${pg_ID}`, req, []);
  }

  activateSalePropByUseIdAndPropId(Userid, Propid) {
    const options = new HttpParams().append('Userid', Userid).append('Propid', Propid);
    const req = this.httpClient.post(this.REST_API_SERVER_Individuallist2 + 'reactiveproperty', options).pipe(retry(3), catchError(this.handleError));
    return this.srv(`act_sale_${Propid}`, req, null);
  }

  activateRentPropByUseIdAndPropId(Userid, Propid) {
    const options = new HttpParams().append('Userid', Userid).append('Propid', Propid);
    const req = this.httpClient.post(this.REST_API_SERVER_rentals2 + 'reactiveproperty', options).pipe(retry(3), catchError(this.handleError));
    return this.srv(`act_rent_${Propid}`, req, null);
  }

  getdeleteuserselllist(param) {
    const options = new HttpParams().append('Userid', param.userid).append('Propid', param.propid);
    const req = this.httpClient.post(this.REST_API_SERVER_Individuallist2 + 'deleteproperty', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`del_sell_${param.propid}`, req, null);
  }

  getdeleteuserPGlist(param) {
    const options = new HttpParams().append('propertyid', param.propid).append('reasonid', param.delReason);
    const req = this.httpClient.post(this.PG_post + 'delete_property', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`del_pg_${param.propid}`, req, null);
  }

  getdeleteuserRentlist(param) {
    const options = new HttpParams().append('Userid', param.userid).append('Propid', param.propid);
    const req = this.httpClient.post(this.REST_API_SERVER_rentals2 + 'deleteproperty', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`del_rent_${param.propid}`, req, null);
  }

  editsellproperty(param) {
    const options = new HttpParams().append('Userid', param.userid).append('Propid', param.propid);
    const req = this.httpClient.post(this.REST_API_SERVER_Individuallist2 + 'edituserproperty', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`edit_sell_${param.propid}`, req, {});
  }

  editRentproperty(param) {
    const options = new HttpParams().append('Userid', param.userid).append('Propid', param.propid);
    const req = this.httpClient.post(this.REST_API_SERVER_rentals2 + 'edituserproperty', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`edit_rent_${param.propid}`, req, {});
  }

  Updatesellproperty(param) {
    const req = this.httpClient.post(this.REST_API_SERVER_Individuallist2 + 'propertyupdate', toHttpParams(param)).pipe(retry(0), catchError(this.handleError));
    return this.srv(`up_sell_${param.Propid}`, req, null);
  }

  UpdateRentproperty(param) {
    const req = this.httpClient.post(this.REST_API_SERVER_rentals2 + 'propertyupdate', toHttpParams(param)).pipe(retry(0), catchError(this.handleError));
    return this.srv(`up_rent_${param.Propid}`, req, null);
  }

  public uploadFile(data) {
    const req = this.httpClient.post(this.REST_API_SERVER_Individuallist2 + 'imageupload', data).pipe(retry(0), catchError(this.handleError));
    return this.srv('up_file_ind', req, null);
  }

  public RentuploadFile(data) {
    const req = this.httpClient.post(this.REST_API_SERVER_rentals2 + 'imageupload', data).pipe(retry(0), catchError(this.handleError));
    return this.srv('up_file_rent', req, null);
  }

  public updateCoverImage(data) {
    const req = this.httpClient.post(this.REST_API_SERVER_Individuallist2 + 'updatecoverimage', data).pipe(retry(0), catchError(this.handleError));
    return this.srv('up_cover_ind', req, null);
  }

  public updateRentCoverImage(data) {
    const req = this.httpClient.post(this.REST_API_SERVER_rentals2 + 'updatecoverimage', data).pipe(retry(0), catchError(this.handleError));
    return this.srv('up_cover_rent', req, null);
  }

  public updateMasterPlanImage(data) {
    const req = this.httpClient.post(this.REST_API_SERVER_Individuallist2 + 'updatemasterplan', data).pipe(retry(0), catchError(this.handleError));
    return this.srv('up_mp_ind', req, null);
  }

  public updateFloorplanPlanImage(data) {
    const req = this.httpClient.post(this.REST_API_SERVER_Individuallist2 + 'updatefloorplan', data).pipe(retry(0), catchError(this.handleError));
    return this.srv('up_fp_ind', req, null);
  }

  public updateGalleryImage(data) {
    const req = this.httpClient.post(this.REST_API_SERVER_Individuallist2 + 'updategalleryimages', data).pipe(retry(0), catchError(this.handleError));
    return this.srv('up_gal_ind', req, null);
  }

  public updateRentGalleryImage(data) {
    const req = this.httpClient.post(this.REST_API_SERVER_rentals2 + 'updategalleryimages', data).pipe(retry(0), catchError(this.handleError));
    return this.srv('up_gal_rent', req, null);
  }

  deleteMasterPlanImgByUseIdAndPropId(Propid, Userid) {
    const options = new HttpParams().append('Userid', Userid).append('Propid', Propid);
    const req = this.httpClient.post(this.REST_API_SERVER_Individuallist2 + 'deletemasterplan', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`del_mp_${Propid}`, req, null);
  }

  deleteFloorPlanImgByUseIdAndPropId(Propid, Userid) {
    const options = new HttpParams().append('Userid', Userid).append('Propid', Propid);
    const req = this.httpClient.post(this.REST_API_SERVER_Individuallist2 + 'deletefloorplan', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`del_fp_${Propid}`, req, null);
  }

  deleteGalleryImageByImageId(id) {
    const options = new HttpParams().append('Imageid', id);
    const req = this.httpClient.post(this.REST_API_SERVER_Individuallist2 + 'deletegallery', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`del_gal_${id}`, req, null);
  }

  deleteRentGalleryImageByImageId(id) {
    const options = new HttpParams().append('Imageid', id);
    const req = this.httpClient.post(this.REST_API_SERVER_rentals2 + 'deletegallery', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`del_rent_gal_${id}`, req, null);
  }

  getApprovalsData(city) {
    const options = new HttpParams().append('Cityid', city);
    const req = this.httpClient.post(this.REST_API_SERVER_Individuallist2 + 'get_approvals', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`approvals_${city}`, req, []);
  }

  landingEnquiry(name, mail, number) {
    const options = new HttpParams().append('name', name).append('mail', mail).append('number', number);
    const req = this.httpClient.post(this.REST_API_SERVER2 + 'landingenquiry', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`landing_${number}`, req, null);
  }

  postPropNewPg(value) {
    const req = this.httpClient.get(this.PG + 'datafilters?', { params: toHttpParams(value) }).pipe(retry(0), catchError(this.handleError));
    return this.srv(`pg_filters_${value.CityId}`, req, {});
  }

  getfields(propId) {
    const options = { params: new HttpParams({ fromObject: { propId: propId } }) };
    const req = this.httpClient.get(this.REST_API_SERVER + 'get_propertyfields', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`fields_${propId}`, req, []);
  }

  getSeenProjectsListByIds(ids) {
    const req = this.httpClient.get(this.REST_API_SERVER + 'propertiesseen?' + 'propIds=' + ids).pipe(retry(0), catchError(this.handleError));
    return this.srv(`seen_list_${ids}`, req, []);
  }

  addPropertyCall(param) {
    const options = new HttpParams().append('name', param.ename).append('number', param.emobile).append('propertyname', param.propertyname);
    const req = this.httpClient.post(this.REST_API_SERVER2 + 'PropContactInfo', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`prop_call_${param.emobile}`, req, null);
  }

  addquery(name, number, email, msg, cityId) {
    const options = new HttpParams().append('name', name).append('number', number).append('email', email).append('msg', msg).append('sourcetype', 'Homes247-Mobile').append('cityId', cityId);
    const req = this.httpClient.post(this.REST_API_SERVER2 + 'querysection', { params: options }).pipe(retry(0), catchError(this.handleError));
    return this.srv(`query_${number}`, req, null);
  }

  addqueryForm(param, cityId) {
    const options = new HttpParams().append('name', param.name).append('number', param.number).append('email', param.email).append('msg', param.msg).append('sourcetype', 'Homes247-Mobile').append('cityId', cityId);
    const req = this.httpClient.post(this.REST_API_SERVER2 + 'querysection', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`query_f_${param.number}`, req, null);
  }

  EnqProperty(param, propertyname, cityId) {
    const options = new HttpParams().append('name', param.name).append('number', param.number).append('propertyname', propertyname).append('email', param.mail).append('sourcetype', 'Homes247-Mobile').append('cityId', cityId);
    const req = this.httpClient.post(this.REST_API_SERVER2 + 'PropEnquiry', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`enq_p_${param.number}`, req, null);
  }

  EnqPropertyByBHKs(param, varient, propertyname, cityId) {
    const options = new HttpParams().append('name', param.name).append('number', param.number).append('propertyname', propertyname).append('email', param.mail).append('varient', varient).append('sourcetype', 'Homes247-Mobile').append('cityId', cityId);
    const req = this.httpClient.post(this.REST_API_SERVER2 + 'PropertyLeads', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`enq_bhk_${param.number}`, req, null);
  }

  getloccitytype(typeid, cityid, locid) {
    const options = { params: new HttpParams({ fromString: `TypeId=${typeid}&Cityid=${cityid}&Locid=${locid}` }) };
    const req = this.httpClient.get(this.REST_API_SERVER + 'proptypelocality?', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`loc_type_${locid}`, req, []);
  }

  // getlocalityproperties(locpropparam) {
  //   const req = this.httpClient.get(this.REST_API_SERVER + 'localityproperties?', { params: toHttpParams(locpropparam) }).pipe(retry(0), catchError(this.handleError));
  //   return this.srv(`loc_props_${locpropparam.locality_id}`, req, []);
  // }


  getlocalityproperties(locpropparam) {
    const req = this.httpClient.get(this.REST_API_SERVER + 'localityproperties?', { params: toHttpParams(locpropparam) }).pipe(retry(0), catchError(this.handleError));
    const key = locpropparam?.locality_id ? `loc_props_${locpropparam.locality_id}` : null;
    return key ? this.srv(key, req, []) : req.pipe(take(1), catchError(() => of([])));
  }



  public getPropertyReviewsVideos(reviewId) {
    const req = this.httpClient.get(this.REST_API_SERVER + 'propertyvideos', { params: toHttpParams(reviewId) }).pipe(retry(0), catchError(this.handleError));
    return this.srv(`rev_vids_${reviewId.propId}`, req, []);
  }

  public getPropertyReviews(reviewProjectId) {
    const req = this.httpClient.get(this.REST_API_SERVER + 'propertyreviews?', { params: toHttpParams(reviewProjectId) }).pipe(retry(0), catchError(this.handleError));
    return this.srv(`rev_list_${reviewProjectId.cityid}`, req, []);
  }

  public getAllExpertList() {
    const req = this.httpClient.get(this.REST_API_SERVER + 'expert_list?').pipe(retry(0), catchError(this.handleError));
    return this.srv('all_experts', req, []);
  }

  public getCategoryExpertList(expId) {
    const req = this.httpClient.get(this.REST_API_SERVER + 'expert_list?', { params: toHttpParams(expId) }).pipe(retry(0), catchError(this.handleError));
    return this.srv(`cat_experts_${expId.id}`, req, []);
  }

  getExpertDetails(propId) {
    const options = { params: new HttpParams({ fromObject: { 'id': propId } }) };
    const req = this.httpClient.get(this.REST_API_SERVER + 'expert_details', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`expert_det_${propId}`, req, {});
  }

  addFeedback(param) {
    const options = toHttpParams(param);
    const req = this.httpClient.post(this.REST_API_SERVER2 + 'insert_feedback', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`feedback_${param.user_id}`, req, null);
  }

  bookSlot(param) {
    const options = toHttpParams(param);
    const req = this.httpClient.post(this.REST_API_SERVER2 + 'book_experts_slot', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`slot_${param.userId}`, req, null);
  }

  updateuserdata1(regid, name, lastname, email) {
    const options = new HttpParams().append('id', regid).append('name', name).append('lastname', lastname).append('mail', email);
    const req = this.httpClient.post(this.REST_API_SERVER2 + 'updateuser', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`up_user_1_${regid}`, req, null);
  }

  userLoginWithOtpNewAPI(param) {
    const options = toHttpParams(param);
    const req = this.httpClient.post(this.REST_API_SERVER2 + 'login_withnumber', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`login_num_${param.number}`, req, null);
  }

  blogCategory() {
    const req = this.httpClient.get(this.REST_API_SERVER44 + 'blogcategory').pipe(retry(0), catchError(this.handleError));
    return this.srv('blog_cats', req, []);
  }

  blogscategorybyauthid(param11) {
    const req = this.httpClient.get(this.REST_API_SERVER44 + 'blogscategorybyauthid', { params: toHttpParams(param11) }).pipe(retry(0), catchError(this.handleError));
    return this.srv(`blog_auth_cats_${param11.bloggerId}`, req, []);
  }

  blogDraftPublish(param3) {
    const req = this.httpClient.get(this.REST_API_SERVER44 + 'blogslistbybloggerid', { params: toHttpParams(param3) }).pipe(retry(0), catchError(this.handleError));
    return this.srv(`blog_drafts_${param3.bloggerId}`, req, []);
  }

  blogPendingTopicList(param3) {
    const req = this.httpClient.get(this.REST_API_SERVER44 + 'requestedtopicslist', { params: toHttpParams(param3) }).pipe(retry(0), catchError(this.handleError));
    return this.srv(`blog_pend_${param3.bloggerId}`, req, []);
  }

  blogApprovedTopicList(param3) {
    const req = this.httpClient.get(this.REST_API_SERVER44 + 'requestedtopicsapprovedlist', { params: toHttpParams(param3) }).pipe(retry(0), catchError(this.handleError));
    return this.srv(`blog_appr_${param3.bloggerId}`, req, []);
  }

  getViewBlogDetail(param3) {
    const req = this.httpClient.get(this.REST_API_SERVER44 + 'editblogcontent', { params: toHttpParams(param3) }).pipe(retry(0), catchError(this.handleError));
    return this.srv(`blog_view_${param3.blogId}`, req, {});
  }

  getBlogTopics(param) {
    const options = new HttpParams().append('blogtypeid', param.blogtypeid);
    const req = this.httpClient.post(this.REST_API_SERVER3 + 'blogtopics', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`blog_topics_${param.blogtypeid}`, req, []);
  }

  setBlogText(param1) {
    const options = toHttpParams(param1);
    const req = this.httpClient.post(this.REST_API_SERVER3 + "/writeblog", options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`write_blog_${param1.bloggerId}`, req, null);
  }

  getAuthorDetails(param) {
    const req = this.httpClient.get(this.REST_API_SERVER44 + 'bloggerprofile', { params: toHttpParams(param) }).pipe(retry(0), catchError(this.handleError));
    return this.srv(`auth_det_${param.bloggerId}`, req, {});
  }

  getpublicBlogList(param) {
    const req = this.httpClient.get(this.REST_API_SERVER44 + 'publicblogslistbybloggerid', { params: toHttpParams(param) }).pipe(retry(0), catchError(this.handleError));
    return this.srv(`pub_blog_${param.bloggerId}`, req, []);
  }

  getpublicBlogListCount(param) {
    const req = this.httpClient.get(this.REST_API_SERVER44 + 'publicblogslistbybloggeridcount', { params: toHttpParams(param) }).pipe(retry(0), catchError(this.handleError));
    return this.srv(`pub_blog_count_${param.bloggerId}`, req, 0);
  }

  postAuthorDetails(paramAuthData) {
    const options = toHttpParams(paramAuthData);
    const req = this.httpClient.post(this.REST_API_SERVER3 + 'editbloggerprofilebyId', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`up_auth_${paramAuthData.bloggerId}`, req, null);
  }

  addBlogTopics(param1) {
    const options = toHttpParams(param1);
    const req = this.httpClient.post(this.REST_API_SERVER3 + "/requesttopics", options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`add_topic_${param1.bloggerId}`, req, null);
  }

  updatebloggermedia(param4) {
    const options = toHttpParams(param4);
    const req = this.httpClient.post(this.REST_API_SERVER3 + 'updatebloggermedia', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`up_media_${param4.bloggerId}`, req, null);
  }

  getbloggerMediaLinks(param4) {
    const req = this.httpClient.get(this.REST_API_SERVER44 + 'blogger_media_link', { params: toHttpParams(param4) }).pipe(retry(0), catchError(this.handleError));
    return this.srv(`media_links_${param4.bloggerId}`, req, []);
  }

  socialLickIcon() {
    const req = this.httpClient.get(this.REST_API_SERVER44 + 'blogger_media_icons').pipe(retry(0), catchError(this.handleError));
    return this.srv('social_icons', req, []);
  }

  public updatProfileImage(data) {
    const req = this.httpClient.post(this.REST_API_SERVER2 + 'userprofileimg', data).pipe(retry(0), catchError(this.handleError));
    return this.srv('up_prof_img', req, null);
  }

  getlocalityReview(param) {
    const options = { params: new HttpParams({ fromObject: { 'localityId': param.localityId } }) };
    const req = this.httpClient.get(this.REST_API_SERVER4 + 'get_locality_review', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`loc_rev_${param.localityId}`, req, []);
  }

  public updatProfileImage1(data) {
    const req = this.httpClient.post(this.REST_API_SERVER3 + 'bloggercoverimg', data).pipe(retry(0), catchError(this.handleError));
    return this.srv('up_auth_cover', req, null);
  }

  public updateBlogCoverImg(data) {
    const req = this.httpClient.post(this.REST_API_SERVER3 + 'addblogcoverimg', data).pipe(retry(0), catchError(this.handleError));
    return this.srv('up_blog_cover', req, null);
  }

  userLoginWithOtpNewAPIBlog(param1) {
    const options = new HttpParams().append('number', param1.number);
    const req = this.httpClient.post(this.REST_API_SERVER3 + 'bloggerlogin_withnumber', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`blog_login_${param1.number}`, req, null);
  }

  public getLocalityReviews(param) {
    const req = this.httpClient.get(this.REST_API_SERVER4 + 'get_locality_reviewbycity?', { params: toHttpParams(param) }).pipe(retry(0), catchError(this.handleError));
    return this.srv(`loc_rev_city_${param.cityId}`, req, []);
  }

  public getLocalityautoComplete(param1) {
    const req = this.httpClient.get(this.REST_API_SERVER + 'locality_overview_autocomplete?', { params: toHttpParams(param1) }).pipe(retry(0), catchError(this.handleError));
    return this.srv(`loc_auto_${param1.city_id}`, req, []);
  }

  addLocalityreview(param) {
    const options = toHttpParams(param);
    const req = this.httpClient.post(this.REST_API_SERVER3 + 'post_locality_review', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`post_loc_rev_${param.localityId}`, req, null);
  }

  getnearByLocProp(propLocId: any) {
    const options = { params: new HttpParams({ fromObject: { 'localityId': propLocId } }) };
    const req = this.httpClient.get(this.REST_API_SERVER4 + 'nearbymoreprojects', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`near_props_${propLocId}`, req, []);
  }

  getnearByRecentlyAddedProp(propLocId: any) {
    const options = { params: new HttpParams({ fromObject: { 'localityId': propLocId } }) };
    const req = this.httpClient.get(this.REST_API_SERVER4 + 'recentlyaddedprojects', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`recent_props_${propLocId}`, req, []);
  }

  getPropertyFloorplan(floorplanId) {
    const options = { params: new HttpParams({ fromObject: { 'bhk_id': floorplanId } }) };
    const req = this.httpClient.get(this.REST_API_SERVER4 + 'get_floorplan_details', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`fp_${floorplanId}`, req, {});
  }

  public getBankLists() {
    const req = this.httpClient.get(this.REST_API_SERVER4 + 'bankslist').pipe(retry(0), catchError(this.handleError));
    return this.srv('bank_list', req, []);
  }

  callForExpertService(param) {
    const options = toHttpParams(param);
    const req = this.httpClient.post(this.REST_API_SERVER3 + 'add_service_inquiry', options).pipe(retry(0), catchError(this.handleError));
    return this.srv(`exp_svc_${param.number}`, req, null);
  }

  componentloader: boolean = false;
  skipQueryUpdate: boolean = false;

  mouseenterlisten1(): Observable<any> {
    return this.mouseenter_listners1.asObservable();
  }
  mouseenterservice1() {
    this.mouseenter_listners1.next('');
  }
  mouseenterlisten2(): Observable<any> {


    return this.mouseenter_listners2.asObservable();
  }
  mouseenterservice2() {

    this.mouseenter_listners2.next('');
  }
  mouseenterlisten3(): Observable<any> {
    return this.mouseenter_listners3.asObservable();
  }
  mouseenterservice3() {

    this.mouseenter_listners3.next('');
  }
  mouseenterlisten4(): Observable<any> {
    return this.mouseenter_listners4.asObservable();
  }
  mouseenterservice4() {

    this.mouseenter_listners4.next('');
  }
  mouseenterlisten5(): Observable<any> {
    return this.mouseenter_listners5.asObservable();
  }
  mouseenterservice5() {

    this.mouseenter_listners5.next('');
  }
  mouseenterlisten6(): Observable<any> {
    return this.mouseenter_listners6.asObservable();
  }
  mouseenterservice6() {

    this.mouseenter_listners6.next('');
  }
  mouseenterlisten7(): Observable<any> {
    return this.mouseenter_listners7.asObservable();
  }
  mouseenterservice7(data: string) {

    this.mouseenter_listners7.next(data);
  }
  mouseenterlistenOtp(): Observable<any> {
    return this.mouseenter_listnersOtp.asObservable();
  }
  mouseenterserviceOtp() {
    this.mouseenter_listnersOtp.next('');
  }
  mouseenterlistenOtp2(): Observable<any> {
    return this.mouseenter_listnersOtp2.asObservable();
  }
  mouseenterserviceOtp2() {
    this.mouseenter_listnersOtp2.next('');
  }

  private queryParamsSource = new BehaviorSubject<string>('');
  queryParams$ = this.queryParamsSource.asObservable();
  updateQueryParamsforcity(queryString: string) { this.queryParamsSource.next(queryString); }
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