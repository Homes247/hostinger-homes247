import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { GlobalImageFixDirective } from './auto-image-width.directive';
import { UTMService } from './utm.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
// import { TokenStoreService } from './auth.service';
declare var $: any;
declare global {
  interface Window { dataLayer: any[]; }
}



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title: any;
  ipAddress: any;
  aiChatHomi: any = true

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private utmService: UTMService,
    private ImageOptimizerService: GlobalImageFixDirective,
    private router: Router,
    private http: HttpClient,
    // private tokenStore: TokenStoreService
  ) {
    this.router.events.subscribe(evt => {
      if (evt instanceof NavigationEnd) {
        if (this.router.url.indexOf('/postproperty') > -1) {
          this.aiChatHomi = false
        } else if (this.router.url.indexOf('/post-property-new') > -1) {
          this.aiChatHomi = false
        } else if (this.router.url.indexOf('/userauth') > -1) {
          this.aiChatHomi = false
        } else {
          this.aiChatHomi = true
        }
      }
    });
  }

  ngOnInit() {
    // if (isPlatformServer(this.platformId)) {
    this.loadExternalResources();
    // }


  // if (!this.tokenStore.getToken('MBGS') && !this.tokenStore.isLoading()) {

  //   this.tokenStore.startLoading();

  //   this.http
  //     .get<any>('https://mbgs.homes247.in/proxy/tokenmbgs', {
  //       withCredentials: true
  //     })
  //     .subscribe({
  //       next: res => {
  //         if (res?.access_token) {
  //           this.tokenStore.setToken('MBGS', res.access_token);
  //         }
  //       },
  //       error: err => {
  //         console.error('Token API failed', err);
  //       }
  //     });
  // }
  }

  private loadExternalResources() {
    let node1: any = document.createElement('script');
    node1.setAttribute('data-lazy-method', 'interaction');
    node1.setAttribute('data-lazy-attributes', 'src');
    node1.setAttribute('data-lazy-src', 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/plugins/sweetalert/sweetalert2.all.min.js');
    node1.type = 'text/javascript';
    node1.async = true;
    node1.charset = 'utf-8';
    document.getElementsByTagName('head')[0].appendChild(node1);

    let node2: any = document.createElement('link');
    node2.setAttribute('data-lazy-method', 'interaction');
    node2.setAttribute('data-lazy-attributes', 'href');
    node2.setAttribute('data-lazy-href', 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/plugins/ngx-owl-carousel-o/lib/styles/prebuilt-themes/owl.carousel.min.css');
    node2.rel = 'stylesheet';
    node2.type = 'text/css';
    document.getElementsByTagName('head')[0].appendChild(node2);

    let node3: any = document.createElement('link');
    node3.setAttribute('data-lazy-method', 'interaction');
    node3.setAttribute('data-lazy-attributes', 'href');
    node3.setAttribute('data-lazy-href', 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/plugins/ngx-owl-carousel-o/lib/styles/prebuilt-themes/owl.theme.default.min.css');
    node3.rel = 'stylesheet';
    node3.type = 'text/css';
    document.getElementsByTagName('head')[0].appendChild(node3);

    // let node5: any = document.createElement('script');
    // node5.setAttribute('data-lazy-method','interaction');
    // node5.setAttribute('data-lazy-attributes','src');
    // node5.setAttribute('data-lazy-src','https://cdn.onesignal.com/sdks/OneSignalSDK.js');
    // node5.type = 'text/javascript';
    // node5.async = true;
    // node5.charset = 'utf-8';
    // document.getElementsByTagName('head')[0].appendChild(node5);

    let node8: any = document.createElement('link');
    node8.setAttribute('data-lazy-method', 'interaction');
    node8.setAttribute('data-lazy-attributes', 'href');
    node8.setAttribute('data-lazy-href', 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/plugins/ej2-autocomplete-latest/ej2-angular-dropdowns/material.css');
    node8.rel = 'stylesheet';
    node8.type = 'text/css';
    document.getElementsByTagName('head')[0].appendChild(node8);

    let node9: any = document.createElement('link');
    node9.setAttribute('data-lazy-method', 'interaction');
    node9.setAttribute('data-lazy-attributes', 'href');
    node9.setAttribute('data-lazy-href', 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/plugins/ej2-autocomplete-latest/material-ej2-inputs/material.css');
    node9.rel = 'stylesheet';
    node9.type = 'text/css';
    document.getElementsByTagName('head')[0].appendChild(node9);

    // let node4: any = document.createElement('link');
    // node4.setAttribute('data-lazy-method','interaction');
    // node4.setAttribute('data-lazy-attributes','href');
    // node4.setAttribute('data-lazy-href','https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css');
    // node4.rel = 'stylesheet';
    // node4.type = 'text/css';
    // document.getElementsByTagName('head')[0].appendChild(node4);

    let node6: any = document.createElement('link');
    node6.setAttribute('data-lazy-method', 'interaction');
    node6.setAttribute('data-lazy-attributes', 'href');
    node6.setAttribute('data-lazy-href', 'https://d1zt14hr2k4poi.cloudfront.net/version2.0/proxima/stylesheet.css');
    node6.rel = 'stylesheet';
    node6.type = 'text/css';
    document.getElementsByTagName('head')[0].appendChild(node6);

    // let node7: any = document.createElement('link');
    // node7.setAttribute('data-lazy-method','interaction');
    // node7.setAttribute('data-lazy-attributes','href');
    // node7.setAttribute('data-lazy-href','https://d1zt14hr2k4poi.cloudfront.net/version9.0/fonts/google-fonts.css');
    // node7.rel = 'stylesheet';
    // node7.type = 'text/css';
    // document.getElementsByTagName('head')[0].appendChild(node7);

    // let node7: any = document.createElement('link');
    // node7.setAttribute('data-lazy-method','interaction');
    // node7.setAttribute('data-lazy-attributes','href');
    // node7.setAttribute('data-lazy-href','https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap');
    // node7.rel = 'stylesheet';
    // node7.type = 'text/css';
    // document.getElementsByTagName('head')[0].appendChild(node7);


    let nodeFont: any = document.createElement('link');
    nodeFont.setAttribute('data-lazy-method', 'interaction');
    nodeFont.setAttribute('data-lazy-attributes', 'href');
    nodeFont.setAttribute('data-lazy-href', 'https://fonts.googleapis.com/css2?family=Playwrite+DE+Grund:wght@100..400&display=swap');
    nodeFont.rel = 'stylesheet';
    nodeFont.type = 'text/css';
    document.getElementsByTagName('head')[0].appendChild(nodeFont);

    // let node7: any = document.createElement('link');
    // node7.setAttribute('href', 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/fonts/google-fonts.css');
    // node7.setAttribute('rel', 'preload stylesheet');
    // node7.type = 'text/css';
    // document.getElementsByTagName('head')[0].appendChild(node7);


    let node10 = document.createElement('link');
    node10.setAttribute('data-lazy-method', 'interaction');
    node10.setAttribute('data-lazy-attributes', 'href');
    node10.setAttribute('data-lazy-href', 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/plugins/angular-material/angular-material.f2d55543cbd384c85038.css');
    node10.rel = 'stylesheet';
    node10.type = 'text/css';
    document.getElementsByTagName('head')[0].appendChild(node10);

    let node11 = document.createElement('script');
    node11.setAttribute('data-lazy-method', 'interaction');
    node11.setAttribute('data-lazy-attributes', 'src');
    node11.setAttribute('data-lazy-src', 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/plugins/js/scripts.d7f808ec824d08cb8275.js');
    node11.type = 'application/javascript';
    node11.async = true;
    node11.charset = 'utf-8';
    document.getElementsByTagName('body')[0].appendChild(node11);

    // let node12 = document.createElement('link');
    // node12.setAttribute('data-lazy-method','interaction');
    // node12.setAttribute('data-lazy-attributes','href');
    // node12.setAttribute('data-lazy-href','https://d1zt14hr2k4poi.cloudfront.net/version9.0/plugins/css/innerheader.css');
    // node12.rel = 'stylesheet';
    // node12.type = 'text/css';
    // document.getElementsByTagName('head')[0].appendChild(node12);

    // let node18 = document.createElement('link');
    // node18.setAttribute('href','https://d1zt14hr2k4poi.cloudfront.net/version9.0/plugins/css/bundlesplit/styles.1946a37a3c8e55f7b032.css');
    // node18.rel = 'stylesheet';
    // node18.type = 'text/css';
    // document.getElementsByTagName('head')[0].appendChild(node18);

    // let node13 = document.createElement('link');
    // node13.setAttribute('href','https://d1zt14hr2k4poi.cloudfront.net/version9.0/plugins/css/bundlesplit/styles01.1946a37a3c8e55f7b032.css');
    // node13.rel = 'stylesheet';
    // node13.type = 'text/css';
    // document.getElementsByTagName('head')[0].appendChild(node13);

    // let node14 = document.createElement('link');
    // node14.setAttribute('href','https://d1zt14hr2k4poi.cloudfront.net/version9.0/plugins/css/bundlesplit/styles02.1946a37a3c8e55f7b032.css');
    // node14.rel = 'stylesheet';
    // node14.type = 'text/css';
    // document.getElementsByTagName('head')[0].appendChild(node14);

    // let node15 = document.createElement('link');
    // node15.setAttribute('href','https://d1zt14hr2k4poi.cloudfront.net/version9.0/plugins/css/bundlesplit/styles03.1946a37a3c8e55f7b032.css');
    // node15.rel = 'stylesheet';
    // node15.type = 'text/css';
    // document.getElementsByTagName('head')[0].appendChild(node15);

    // let node16 = document.createElement('link');
    // node16.setAttribute('href','https://d1zt14hr2k4poi.cloudfront.net/version9.0/plugins/css/bundlesplit/styles04.1946a37a3c8e55f7b032.css');
    // node16.rel = 'stylesheet';
    // node16.type = 'text/css';
    // document.getElementsByTagName('head')[0].appendChild(node16);

    // let node17 = document.createElement('link');
    // node17.setAttribute('href','https://d1zt14hr2k4poi.cloudfront.net/version9.0/plugins/css/bundlesplit/styles05.1946a37a3c8e55f7b032.css');
    // node17.rel = 'stylesheet';
    // node17.type = 'text/css';
    // document.getElementsByTagName('head')[0].appendChild(node17);

    // let node14 = document.createElement('script');
    // node14.setAttribute('data-lazy-method','interaction');
    // node14.setAttribute('data-lazy-attributes','src');
    // node14.setAttribute('data-lazy-src','https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js');
    // node14.type = 'text/javascript';
    // document.getElementsByTagName('head')[0].appendChild(node14);

    // let node15 = document.createElement('script');
    // node15.setAttribute('data-lazy-method','interaction');
    // node15.setAttribute('data-lazy-attributes','src');
    // node15.setAttribute('data-lazy-src','https://cdnjs.cloudflare.com/ajax/libs/lightbox2/2.8.2/js/lightbox.min.js');
    // node15.type = 'text/javascript';
    // document.getElementsByTagName('head')[0].appendChild(node15);

    // this.Service.getIpAddress().subscribe((data: any) => {
    //   this.ipAddress = data.ip;
    //   if(this.ipAddress === '171.76.83.173'){
    //   }else{
    //     $('body').bind('cut copy', function (e) {
    //       this.clipboardData = e.clipboardData ||  e.originalEvent.clipboardData;
    //       this.clipboardData.setData('text/plain', 'Thank you for your Valuable time! Please Try Again!');
    //       e.preventDefault();
    //   });
    //   }
    // }, error => {
    //   console.error('Error fetching IP address', error);
    // });


    // let node110 = document.createElement('link');
    // node110.setAttribute('data-lazy-method','interaction');
    // node110.setAttribute('data-lazy-attributes','href');
    // node110.setAttribute('data-lazy-href','https://cdnjs.cloudflare.com/ajax/libs/noUiSlider/15.6.1/nouislider.min.css');
    // node110.rel = 'stylesheet';
    // node110.type = 'text/css';
    // document.getElementsByTagName('head')[0].appendChild(node110);

    // let node111 = document.createElement('script');
    // node111.setAttribute('data-lazy-method','interaction');
    // node111.setAttribute('data-lazy-attributes','src');
    // node111.setAttribute('data-lazy-src','https://cdnjs.cloudflare.com/ajax/libs/noUiSlider/15.6.1/nouislider.min.js');
    // node111.type = 'application/javascript';
    // node111.async = true;
    // node111.charset = 'utf-8';
    // document.getElementsByTagName('body')[0].appendChild(node111);

    let node: any = document.createElement('script');
    node.src = 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/plugins/js/main.js';
    node.type = 'text/javascript';
    node.async = true;
    node.charset = 'utf-8';
    document.getElementsByTagName('head')[0].appendChild(node);


    var localClear = localStorage.getItem('clearLocal')
    if (localClear == null || localClear == '' || localClear == undefined) {
      localStorage.clear()
      localStorage.setItem('clearLocal', '1');
    }

  }

  aiKeyFramModal: any = false

  aiChatbotOpen() {
    this.aiKeyFramModal = true
  }
}
