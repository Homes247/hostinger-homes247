// import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
// import { ActivatedRoute, Params, Router, Resolve } from '@angular/router';
// import {WINDOW, LOCAL_STORAGE} from '@ng-toolkit/universal';
// import { Observable, timer } from 'rxjs';
// import { isPlatformBrowser } from '@angular/common';
// import {DataService} from './data.service';
// import { takeUntil } from 'rxjs/operators';

// @Injectable({
//  providedIn: 'root'
// })
// export class SlowComponentResolverService implements Resolve<any> {
//   routeSub: any;

//  constructor(private service: DataService,private activatedRoute: ActivatedRoute, @Inject(PLATFORM_ID) private platformId: any, @Inject(LOCAL_STORAGE) private Local_Storage: any) { }

//  public resolve(): Observable<any> {
//    if (isPlatformBrowser(this.platformId)) {
//     this.routeSub = this.activatedRoute.params.subscribe(params => {
//       var lasturl = params['propName-:param'];
//       var propid = lasturl.split('-').pop().match(/[0-9]+/);
//       var userid = this.Local_Storage.getItem('userID');
//      return this.service.getpropertyOnyPropDetailPage(propid,userid);
//     });
//    }

//    const watchdog: Observable<number> = timer(500);
//    return Observable.create(subject => {
//     this.routeSub = this.activatedRoute.params.subscribe(params => {
//       var lasturl = params['propName-:param'];
//       var propid = lasturl.split('-').pop().match(/[0-9]+/);
//       var userid = this.Local_Storage.getItem('userID');
//      this.service.getpropertyOnyPropDetailPage(propid,userid).pipe(takeUntil(watchdog)).subscribe(response => {
//        subject.next(response);
//        subject.complete();
//      });
//     });
//      watchdog.subscribe(() => {
//        subject.next(null);
//        subject.complete();
//      });
//    });
//  }
// }
