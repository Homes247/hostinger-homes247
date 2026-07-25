import { NavigationEnd, Router, RouterModule, RouterOutlet } from '@angular/router';
import { UtmService } from './utm.service';
import { Component, OnInit, OnDestroy, output } from '@angular/core';
import { ElitedataService } from './elitedata.service';
// import { ReadyPropertyPopupService } from './ready-property-popup.service';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  constructor(private utmService: UtmService, private eliteService: ElitedataService, private router: Router,
  ) {
    this.router.events.subscribe(evt => {
      if (evt instanceof NavigationEnd) {
        if (this.router.url?.indexOf('/active-properties') > -1 || this.router.url?.indexOf('/homes-elite') > -1) {
        } else {
          this.boostPropertyList = true
        }
      }
    });
  }

  UserId: any
  userNumber: any
  boostPropertyList: boolean = false

  ngOnInit() {


      this.UserId = localStorage.getItem('userID');
      this.userNumber = localStorage.getItem('userNumber');
      const param = { 'user_id': this.UserId, 'user_number': this.userNumber, 'postType': '0' };
      this.eliteService.boostPropertyList(param).subscribe(res => {
        if (res['status'] == 'True' && this.boostPropertyList)  {
          this.shouldRender = true
        }
      })
    

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
    console.log('fghjk')
  }

  private lockBodyScroll(): void {
    document.body.style.overflow = 'hidden';
  }

  private unlockBodyScroll(): void {
    document.body.style.overflow = '';
  }


}

