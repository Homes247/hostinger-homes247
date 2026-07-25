import { Injectable } from '@angular/core';

interface AdCard {
  titleLine1: string;
  titleLine2: string;
  description?: string;
  image: string;
  buttonText: string;
  category: 'owner' | 'buyer';
  bgImage?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AdCardsService {

  readonly baseImagePath = 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/subscription%20management/';

  private ownerBoostCards: AdCard[] = [
    {
      titleLine1: 'Boost Smart.',
      titleLine2: 'Sell Faster.',
      image: this.baseImagePath + 'boostSmartSpeaker.svg',
      buttonText: 'Boost Property',
      category: 'owner',
      bgImage: this.baseImagePath + 'addBackgroundOne.svg',
    },
    {
      titleLine1: 'More Visibility.',
      titleLine2: 'Better Results.',
      image: this.baseImagePath + 'moreVisibilitySpeaker.svg',
      buttonText: 'Boost Property',
      category: 'owner',
      bgImage: this.baseImagePath + 'addBackgroundOne.svg',
    },
    {
      titleLine1: 'Put Your Property In The',
      titleLine2: 'Spotlight',
      image: this.baseImagePath + 'propertySpotlight.svg',
      buttonText: 'Boost Property',
      category: 'owner',
      bgImage: this.baseImagePath + 'addBackgroundTwo.svg',
    },
    {
      titleLine1: 'Climb Higher.',
      titleLine2: 'Get Noticed.',
      image: this.baseImagePath + 'climbHigherHome.svg',
      buttonText: 'Boost Property',
      category: 'owner',
      bgImage: this.baseImagePath + 'addBackgroundThree.svg',
    }
  ];

  private buyerPremiumCards: AdCard[] = [
    {
      titleLine1: 'Unlock Owner',
      titleLine2: 'Contacts.',
      description: 'Connect directly with property owners and get faster responses.',
      image: this.baseImagePath + 'unlockOwnerContacts.svg',
      buttonText: 'Unlock Now',
      category: 'buyer'
    },
    {
      titleLine1: 'Track Viewed',
      titleLine2: 'Properties.',
      description: "Keep track of all the properties you've viewed in one place.",
      image: this.baseImagePath + 'trackViewedProperty.svg',
      buttonText: 'Unlock Now',
      category: 'buyer'
    },
    {
      titleLine1: 'Find Exactly',
      titleLine2: 'What You Want.',
      description: 'Use premium filters to find the perfect home faster & save time.',
      image: this.baseImagePath + 'finfWtYouWant.svg',
      buttonText: 'Get Early Access',
      category: 'buyer'
    },
    {
      titleLine1: 'Smart Match',
      titleLine2: 'Suggestions.',
      description: 'Get AI powered property suggestions that match your needs.',
      image: this.baseImagePath + 'smartMatchSuggestions.svg',
      buttonText: 'Get Early Access',
      category: 'buyer'
    }
  ];

  private shuffledAdPool: AdCard[] = [];
  private adIndex = 0;

  constructor() {
    this.buildAlternatingShuffledPool();
  }

  private shuffleArray(arr: AdCard[]): AdCard[] {
    const shuffled = [...arr];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  private buildAlternatingShuffledPool(): void {
    const shuffledOwner = this.shuffleArray(this.ownerBoostCards);
    const shuffledBuyer = this.shuffleArray(this.buyerPremiumCards);

    const pool: AdCard[] = [];
    const maxLen = Math.max(shuffledOwner.length, shuffledBuyer.length);

    for (let i = 0; i < maxLen; i++) {
      if (i < shuffledOwner.length) pool.push(shuffledOwner[i]);
      if (i < shuffledBuyer.length) pool.push(shuffledBuyer[i]);
    }

    this.shuffledAdPool = pool;
  }

  // Called by each component instance — shared index across all
  getNextAd(): AdCard {
    // When all 8 ads are exhausted, reshuffle and start fresh
    if (this.adIndex >= this.shuffledAdPool.length) {
      this.buildAlternatingShuffledPool();
      this.adIndex = 0;
    }
    const ad = this.shuffledAdPool[this.adIndex];
    this.adIndex++;
    return ad;
  }

  // Call this when listing page is destroyed or refreshed
  resetPool(): void {
    this.adIndex = 0;
    this.buildAlternatingShuffledPool();
  }
}
