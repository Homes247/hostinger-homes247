import { Component, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { UtmService } from './utm.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  constructor(private utmService: UtmService,
    private router: Router,
  ) {
    this.router.events.subscribe(evt => {
      if (evt instanceof NavigationEnd) {
        if (this.router.url?.indexOf('/smart-property-finder') > -1) {
          this.aiChatHomi = false
        } else {
          this.aiChatHomi = true
        }
      }
    });
  }


  protected readonly title = signal('Buy_listing_Project');
  aiChatHomi: any = true




  aiKeyFramModal: any = false

  aiChatbotOpen() {
    this.aiKeyFramModal = true
  }
}

