import { AfterViewInit, Component, Inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IndividualDetailsComponent } from "./individual-detail/individual-detail";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit, AfterViewInit {
  // protected readonly title = signal('Common-details-project');

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit() {
    this.loadExternalResources();
  }
  ngAfterViewInit(): void {
    this.openPopup()
  }
  private loadExternalResources() {

    const node2 = document.createElement('link');
    node2.rel = 'stylesheet';
    node2.type = 'text/css';
    node2.href = 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/plugins/ngx-owl-carousel-o/lib/styles/prebuilt-themes/owl.carousel.min.css';
    document.head.appendChild(node2);

    const node3 = document.createElement('link');
    node3.rel = 'stylesheet';
    node3.type = 'text/css';
    node3.href = 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/plugins/ngx-owl-carousel-o/lib/styles/prebuilt-themes/owl.theme.default.min.css';
    document.head.appendChild(node3);

  }



  shouldRender = false;

  private closing = false;


  readonly topImage =
    'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/subscription%20management/readyPropertyGoLive.svg';
  readonly completePaymentIcon =
    'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/subscription%20management/completePaymentIcon.svg';
  readonly rightArrowIcon =
    'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/subscription%20management/planRightArrow.svg';


  openPopup(): void {
    this.closing = false;
    this.shouldRender = true;
    // this.showPopup = false;
    this.lockBodyScroll();

  }

  closePopup(): void {
    this.closing = true;
    this.shouldRender = false
    this.unlockBodyScroll();
  }

  /** Bound to (transitionend) on the sheet in the template */
  onSheetTransitionEnd(): void {
    if (this.closing) {
      this.closing = false;
      this.shouldRender = false;
    }
  }

  completePayment(): void {
    // this.completePaymentClick.emit();
  }

  viewProperty(): void {
    // this.viewPropertyClick.emit();
  }

  private lockBodyScroll(): void {
    document.body.style.overflow = 'hidden';
  }

  private unlockBodyScroll(): void {
    document.body.style.overflow = '';
  }
  test() {
    console.log('Button clicked');
  }
}

