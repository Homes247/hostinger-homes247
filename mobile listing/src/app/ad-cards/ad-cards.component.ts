import { Component, OnInit } from '@angular/core';
import { AdCardsService } from './ad-cards.service';

interface AdCard {
  titleLine1: string;
  titleLine2: string;
  description?: string;
  image: string;
  buttonText: string;
  category: 'owner' | 'buyer';
   bgImage?: string;
}

@Component({
  selector: 'app-ad-cards',
  templateUrl: './ad-cards.component.html',
  styleUrls: ['./ad-cards.component.css']
})
export class AdCardsComponent implements OnInit {

  readonly rocketIcon = 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/subscription%20management/boostNowRocket.svg';
  readonly arrowIcon = 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/subscription%20management/unlockNowArrow.svg';

  currentAd: AdCard | null = null;

  constructor(private adCardsService: AdCardsService) {}

  ngOnInit(): void {
    this.currentAd = this.adCardsService.getNextAd();
    console.log(this.currentAd )
  }

  onBoostPropertyClick(card: AdCard): void {
    console.log('Boost Property clicked:', card.titleLine1);
  }

  onUnlockNowClick(card: AdCard): void {
    console.log('Unlock clicked:', card.titleLine1);
  }
}