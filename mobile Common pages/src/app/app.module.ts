import { DatePipe } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { NgtUniversalModule } from '@ng-toolkit/universal';
import { NgOtpInputModule } from 'ng-otp-input';
import { CountdownModule } from 'ngx-countdown';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GlobalImageFixDirective } from './auto-image-width.directive';
import { PipeModule } from './pipe/pipe.module';
import { UTMService } from './utm.service';
// import { OtpLoginNewComponent } from './otp-login-new/otp-login-new.component';
// import { AuthInitService } from './auth-init.service';
// import { AuthInterceptor } from './auth.interceptor';
// import { SearchDropdownMainCityComponent } from './search-dropdown-main-city/search-dropdown-main-city.component';
// import { MatAutocompleteNewComponent } from './mat-autocomplete-new/mat-autocomplete-new.component';
// export function authInitializer(authInit: AuthInitService) {
//   return authInit.init();
// }
const routes: Routes = [];

@NgModule({
  declarations: [
    AppComponent,
    // OtpLoginNewComponent,

    // SearchDropdownMainCityComponent,
    // MatAutocompleteNewComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserTransferStateModule,   
    // ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    RouterModule.forChild(routes),
    NgtUniversalModule,
    AppRoutingModule,
    HttpClientModule,
    PipeModule,
    BrowserAnimationsModule,
    NgOtpInputModule,
    CountdownModule,
  ],
  exports: [
    RouterModule,
  ],
  providers: [
  //   {
  //   provide: APP_INITIALIZER,
  //   useFactory: authInitializer,
  //   deps: [AuthInitService],
  //   multi: true
  // },
  // { provide: HTTP_INTERCEPTORS, useClass: CsrfInterceptor, multi: true },
  // { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    UTMService,
    GlobalImageFixDirective,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [

        ]
      }
    }, [DatePipe]],
  bootstrap: [AppComponent]
})
export class AppModule { }
