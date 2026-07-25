import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { DataService2 } from '../data.service2';
import { WINDOW } from '@ng-toolkit/universal';
import { Meta, Title } from '@angular/platform-browser';
import { ServerResponseService_projectreview } from '../server-response-project-review.service';
declare var $: any;


declare var $: any;
@Component({
  selector: 'app-review-project-one',
  templateUrl: './review-project-one.component.html',
  styleUrls: ['./review-project-one.component.css'],
  providers: [ServerResponseService_projectreview]

})

export class ReviewProjectOneComponent implements OnInit {

  p: number = 1;
  currentPropName: any;
  currentLocalityName: any;
  currentPropId: any;
  routeSub: any;
  fivestarcounts: any;
  fourstarcounts: any;
  threestarcounts: any;
  twostarcounts: any;
  onestarcounts: any;

  FiveStarCountHtml: any;
  FourStarCountHtml: any;
  threeStarCountHtml: any;
  TwoStarCountHtml: any;
  OneStarCountHtml: any;

  totaluserratings: any;
  reviwcount: any;
  // reviews: any;

  averagerating: any;
  numbernan = false;
  propertyimage = this.Service2.imagesURL + 'uploadPropertyImgs/';

  ratingreviews = true;
  propDetails: any;
  price_min: any;
  price_max: any;
  currentPropCity: any;
  currentLocalityId: any;
  currentPropName_seo: any;
  Property_Image: any;
  Property_Alt_Tag: any;
  Seo_currentPropName: any;
  PropertywritereviewComponent: any;

  reviews: any[] = []; // Your array of reviews
  displayedReviews: any[] = [];
  initialReviewsToShow = 10; // Number of reviews to show initially
  constructor(private titleService: Title, private meta: Meta, private activatedRoute: ActivatedRoute, private router: Router, public Service: DataService,
    public Service2: DataService2, @Inject(WINDOW) private window: Window, public responseService_Projectreview: ServerResponseService_projectreview,) {
  }

  ngOnInit(): void {
    this.dataloads();

    if (this.router.url.indexOf('?id=writeratingreview') > -1) {
      this.showReviewModel();
    } else {
    }

  }
  loadMoreReviews() {
    const remainingReviews = this.reviews.slice(this.displayedReviews.length);
    const nextReviews = remainingReviews.slice(0, this.initialReviewsToShow);
    this.displayedReviews = this.displayedReviews.concat(nextReviews);
  }
  @HostListener('window:scroll', ['$event'])
  @HostListener('touchstart', ['$event'])
  onTouchLoad() {
    this.Service.mouseenterservice3();
  }
  scrollTop() {
    this.window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
  ReviewPageView = false;
  showReviewModel() {
    $('#modal-fullscreen-xl2').modal('hide');
    if (this.ReviewPageView == false) {
      this.ReviewPageView = true;
      import('../propertywritereview/propertywritereview.module').then(mod => mod.PropertywritereviewModule).then(PropertywritereviewModule => {
        this.PropertywritereviewComponent = PropertywritereviewModule.components['lazy'];
      });
    } else {
      this.ReviewPageView = false;
    }
  }
  WriteRatingAndReview() {
    var topPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    window.location.hash = '?id=writeratingreview';
    document.documentElement.scrollTop = topPos;
  }
  getSeoTitle(shortTitle: string, longTitle: string): string {
    return shortTitle.length <= 60 ? shortTitle : longTitle;
  }
  dataloads() {
    var PropertyId = this.router.url.split('-').pop().match(/[0-9]+/);;
    this.currentPropId = PropertyId;
    this.Service2.getpropertynew(PropertyId).subscribe(data => {
      this.propDetails = data['details'];
      this.currentPropName = this.propDetails[0]['propertyName'];
      this.currentPropCity = this.propDetails[0]['city_name'];
      this.currentLocalityName = this.propDetails[0]['locality_name'];
      this.currentPropName_seo = this.currentPropName.toLowerCase().replace(/\s+/g, '-')
      this.currentLocalityId = this.propDetails[0]['LoaclityId'];
      this.price_min = this.propDetails[0]['price_min'];
      this.price_max = this.propDetails[0]['price_max'];
      this.Property_Image = this.propDetails[0].images[0]['name'];
      this.Property_Alt_Tag = this.propDetails[0].images[0]['alttag'];
      this.Seo_currentPropName = this.currentPropName.replace(/\s+/g, '-').toLowerCase();
      var shortcurrentPropName = this.currentPropName?.split(' ').slice(0, 3).join(' ');

      if (this.router.url.indexOf('/prd/') > -1) {
        this.titleService.setTitle(
          this.getSeoTitle(
            `${this.currentPropName} Reviews and Ratings | Homes247.in`,
            `${shortcurrentPropName} Reviews and Ratings`
          )
        );

        this.meta.updateTag({
          name: 'description',
          content: `Read genuine customer reviews and expert ratings for ${this.currentPropName} projects in ${this.currentLocalityName}. Find your dream home on Homes247.`
        });
        const image = 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_desktop_2/images/Homes247_Newwhite_Logo.webp';
        const url = 'https://www.homes247.in' + this.router.url;

        // Open Graph
        this.meta.updateTag({ property: 'og:title', content: this.currentPropName + ' Reviews & Ratings | Homes247' });
        this.meta.updateTag({ property: 'og:description', content: 'Read ratings & reviews of ' + this.currentPropName + '. Explore genuine homebuyer feedback on builder quality, amenities & construction standards on Homes247.' });
        this.meta.updateTag({ property: 'og:image', content: image });
        this.meta.updateTag({ property: 'og:url', content: url });
        this.meta.updateTag({ property: 'og:type', content: 'website' });

        // Twitter Card
        this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
        this.meta.updateTag({ name: 'twitter:title', content: this.currentPropName + ' Reviews & Ratings | Homes247' });
        this.meta.updateTag({ name: 'twitter:description', content: 'Read ratings & reviews of ' + this.currentPropName + '. Explore genuine homebuyer feedback on builder quality, amenities & construction standards on Homes247.' });
        this.meta.updateTag({ name: 'twitter:image', content: image });


        this.Service.createLinkForCanonicalURL();
      }


      if (this.router.url.indexOf('--') > -1) {
        this.responseService_Projectreview.set301Status(this.currentPropName_seo, this.currentPropId);
      } else if (this.router.url.indexOf('/prd/rating-and-reviews-of-' + this.Seo_currentPropName + '-' + this.currentPropId) > -1) {
      } else {
        this.responseService_Projectreview.set301Status(this.currentPropName_seo, this.currentPropId);
      }



    });

    if (Number(this.currentPropId)) {
    } else if (this.currentPropId.indexOf('?') > -1) {
    } else {
      // this.router.navigate(['/404'], { skipLocationChange: true });
    }


    this.Service.reviewfetching(PropertyId).subscribe(response => {
      this.reviews = response['rating'];
      this.displayedReviews = this.reviews.slice(0, this.initialReviewsToShow);
      this.reviwcount = this.reviews.length;
      if (!this.reviews.length) {
        this.ratingreviews = false;
      } else {
        this.ratingreviews = true;
      }
      const fivestar = '5';
      const fivestarcount = this.reviews.filter((obj) => obj.Rating === fivestar).length;
      this.fivestarcounts = fivestarcount / this.reviwcount * 100;
      this.FiveStarCountHtml = fivestarcount;

      const fourstar = '4';
      const fourstarcount = this.reviews.filter((obj) => obj.Rating === fourstar).length;
      this.fourstarcounts = fourstarcount / this.reviwcount * 100
      this.FourStarCountHtml = fourstarcount;

      const thirdstar = '3';
      const threestarcount = this.reviews.filter((obj) => obj.Rating === thirdstar).length;
      this.threestarcounts = threestarcount / this.reviwcount * 100;
      this.threeStarCountHtml = threestarcount;

      const twostar = '2';
      const twostarcount = this.reviews.filter((obj) => obj.Rating === twostar).length;
      this.twostarcounts = twostarcount / this.reviwcount * 100;
      this.TwoStarCountHtml = twostarcount;

      const onestar = '1';
      const onestarcount = this.reviews.filter((obj) => obj.Rating === onestar).length;
      this.onestarcounts = onestarcount / this.reviwcount * 100;
      this.OneStarCountHtml = onestarcount;

      const totalratings = fivestarcount + fourstarcount + threestarcount + twostarcount + onestarcount;
      this.totaluserratings = totalratings;
      this.averagerating = (Math.round(5 * fivestarcount + 4 * fourstarcount + 3 * threestarcount + 2 * twostarcount + 1 * onestarcount) / totalratings).toFixed(1);
      if (isNaN(parseFloat(this.averagerating))) {
        this.numbernan = true;
        this.averagerating = '0';
        this.totaluserratings = '0';
      }
    });

  }



}
