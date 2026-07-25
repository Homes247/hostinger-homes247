import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
// import { AppModule } from './app/app.module';

// import { AppBrowserModule } from './app/app.browser.module';
import { environment } from './environments/environment';
import '@angular/compiler';
import { AppModule } from './app/app.module';

if (environment.production) {
  enableProdMode();
}
document.addEventListener('DOMContentLoaded', () => {
  platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch(err => console.error(err));
});
// platformBrowserDynamic().bootstrapModule(AppModule)
//   .catch(err => console.error(err));
// document.addEventListener('DOMContentLoaded', () => {
//   platformBrowserDynamic().bootstrapModule(AppModule)
//   .catch(err => console.error(err));
// });

// function bootstrap() {
//   platformBrowserDynamic().bootstrapModule(AppBrowserModule)
// .catch(err => console.error(err));
// };


// if (document.readyState === 'complete') {
// bootstrap();
// } else {
// document.addEventListener('DOMContentLoaded', bootstrap);
// }
