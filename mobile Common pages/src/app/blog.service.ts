import { DOCUMENT, isPlatformServer } from '@angular/common';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { TransferState, makeStateKey } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable, throwError, of } from 'rxjs';
import { catchError, retry, tap, timeout } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class Blogservice {

  private REST_API_SERVER = 'https://mbapi2.homes247.in/backend/';
  private REST_API_SERVER_Recent_stories = 'https://mbgs.homes247.in/backend/';

  private REST_API_SERVER2 = 'https://api.right2shout.in/backend/';

  private REST_API_SERVER_NEW = 'https://mbapi2.homes247.in/backendoptimized/';
  private REST_API_SERVER_NEW22 = 'https://mbgs.homes247.in/backend/';
  private REST_API_SERVER_NEW2 = 'https://mbgs.homes247.in/backendoptimized/';
  private ImageURL = 'https://img-mb.homes247.in/images/';
  private blogimage = 'https://img-mbgs.homes247.in/images/';
  public ProfileImage = 'https://img-mb.homes247.in/images/userprofile/';
  imagesURL: string;
  blogimageURL: string;

  constructor(
    private httpClient: HttpClient,
    private transferState: TransferState,
    @Inject(DOCUMENT) private doc,
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,

  ) {
    this.imagesURL = this.ImageURL;
    this.blogimageURL = this.blogimage;
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

  getcategoryblogs(id) {
    const options = new HttpParams({
      fromObject: {
        'id': id,
        'source': '2000',
      },
    });
    const request$ = this.httpClient
      .get(this.REST_API_SERVER_NEW22 + 'blogcategories?', { params: options })
      .pipe(retry(0), catchError(this.handleError));

    return this.srv(`cat_blogs_${id}`, request$, []);
  }

  blogdetails(id) {
    const options = new HttpParams({
      fromObject: {
        'id': id,
        'source': '2000',
      }
    });
    const request$ = this.httpClient
      .get(this.REST_API_SERVER_NEW2 + 'blog_details?', { params: options })
      .pipe(retry(0), catchError(this.handleError));

    return this.srv(`blog_det_${id}`, request$, {});
  }

  getBlogsCommentList(id) {
    const options = new HttpParams({
      fromObject: {
        'id': id,
      }
    });
    const request$ = this.httpClient
      .get(this.REST_API_SERVER_NEW + 'blogcommentsbyid?', { params: options })
      .pipe(retry(0), catchError(this.handleError));

    return this.srv(`blog_comm_list_${id}`, request$, []);
  }

  getsimilarblog(Id) {
    const options = new HttpParams({
      fromObject: {
        'id': Id,
        'source': '2000',
      }
    });
    const request$ = this.httpClient
      .get(this.REST_API_SERVER_NEW2 + 'similarblogs?', { params: options })
      .pipe(retry(0), catchError(this.handleError));

    return this.srv(`sim_blog_${Id}`, request$, []);
  }

  getinfographicblog(id) {
    const options = new HttpParams({
      fromObject: {
        'id': id,
      }
    });
    const request$ = this.httpClient
      .get(this.REST_API_SERVER_NEW2 + 'getinfographicbyid?', { params: options })
      .pipe(retry(0), catchError(this.handleError));

    return this.srv(`info_blog_${id}`, request$, {});
  }

  propdetailsinblogads(id) {
    const options = new HttpParams({
      fromObject: {
        'id': id,
      }
    });
    const request$ = this.httpClient
      .get(this.REST_API_SERVER_NEW2 + 'propdetails_blogads?', { params: options })
      .pipe(retry(0), catchError(this.handleError));

    return this.srv(`blog_ads_${id}`, request$, {});
  }

  getblogAuto(blogid) {
    const options = new HttpParams({
      fromObject: {
        'blog_id': blogid,
        'source': '2000',
      }
    });
    const request$ = this.httpClient
      .get(this.REST_API_SERVER_NEW2 + 'blogautocomplete?', { params: options })
      .pipe(retry(0), catchError(this.handleError));

    return this.srv(`blog_auto_${blogid}`, request$, []);
  }

  getBlogslikes(id) {
    const options = new HttpParams()
      .append('id', id);
    const request$ = this.httpClient
      .post(this.REST_API_SERVER2 + 'getlikecount', options)
      .pipe(retry(0), catchError(this.handleError));

    return this.srv(`blog_likes_${id}`, request$, 0);
  }

  getrecentblogs() {
    const options = {
      params: new HttpParams({ fromString: 'source=' + '2000' }),
    };
    const request$ = this.httpClient
      .get(this.REST_API_SERVER_Recent_stories + 'recent_stories?', options)
      .pipe(retry(0), catchError(this.handleError));

    return this.srv(`recent_blogs`, request$, []);
  }

  getpropertyblogtags() {
    const request$ = this.httpClient
      .get(this.REST_API_SERVER_NEW22 + 'blogpropertytags')
      .pipe(retry(0), catchError(this.handleError));

    return this.srv(`blog_tags`, request$, []);
  }

  addlikes(blogid, likecount) {
    const options = new HttpParams()
      .append('likecount', likecount)
      .append('blogid', blogid);
    const request$ = this.httpClient
      .post(this.REST_API_SERVER2 + 'likecountadd', options)
      .pipe(retry(0), catchError(this.handleError));

    return this.srv(`add_like_${blogid}`, request$, null);
  }

  SubscribBlog(param) {
    const options = new HttpParams()
      .append('name', param.name)
      .append('mail', param.mail);
    const request$ = this.httpClient
      .post(this.REST_API_SERVER2 + 'blogsubscribers', options)
      .pipe(retry(0), catchError(this.handleError));

    return this.srv(`sub_blog_${param.mail}`, request$, null);
  }

  updateBlogComment(param) {
    const options = new HttpParams()
      .append('name', param.name)
      .append('mail', param.mail)
      .append('comments', param.comments)
      .append('blog', param.blog)
      .append('blogid', param.blogid);
    const request$ = this.httpClient
      .post(this.REST_API_SERVER2 + 'commentsapproval', options)
      .pipe(retry(0), catchError(this.handleError));

    return this.srv(`up_comm_${param.blogid}`, request$, null);
  }

  getblogcomments(id) {
    const options = new HttpParams()
      .append('id', id);
    const request$ = this.httpClient
      .post(this.REST_API_SERVER2 + 'getcomments', options)
      .pipe(retry(0), catchError(this.handleError));

    return this.srv(`blog_comments_${id}`, request$, []);
  }

  addviews(blogid, viewcount) {
    const options = new HttpParams()
      .append('viewcount', viewcount)
      .append('blogid', blogid);
    const request$ = this.httpClient
      .post(this.REST_API_SERVER2 + 'viewcountadd', options)
      .pipe(retry(0), catchError(this.handleError));

    return this.srv(`add_view_${blogid}`, request$, null);
  }

  Loginwithnum(param) {
    const options = new HttpParams()
      .append('number', param.number)
      .append('username', param.username)
      .append('device_source', param.device_source);

    const request$ = this.httpClient
      .post(this.REST_API_SERVER2 + 'login_withnumber', options)
      .pipe(retry(0), catchError(this.handleError));

    return this.srv(`login_num_${param.number}`, request$, null);
  }

}