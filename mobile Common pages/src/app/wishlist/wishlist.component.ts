import { Component, HostListener, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import {Meta, Title} from '@angular/platform-browser';
declare var swal: any;

declare var $: any;
@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  favourite = [];
  showLoader : boolean;
  Date = new Date();
  propertyimage = this.Service.imagesURL + "uploadPropertyImgs/";
  constructor(private Service: DataService,private titleService: Title,
    private meta: Meta) { }
  UserId: any;

  ngOnInit(): void {
    this.metatags();
     this.getfavouritelist();
  }

  metatags() {
    const PAGEID = '42';
    this.Service.getstaticmeta(PAGEID).subscribe(metatags => {
      this.titleService.setTitle(metatags['Pageseo'][0].page_title);
      this.meta.updateTag({name: 'description', content: metatags['Pageseo'][0].meta_description});
      this.meta.updateTag({property: 'og:image', content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_mobile/images/og/about.jpg'});
      this.meta.updateTag({property: 'og:title', content: metatags['Pageseo'][0].page_title});
      this.meta.updateTag({property: 'og:description', content: metatags['Pageseo'][0].meta_description});
      this.Service.createLinkForCanonicalURL();
    });
    import('../footer/footer.module').then(mod => mod.FooterModule).then(FooterModule =>{
      this.FooterComponent = FooterModule.components['lazy'];
      this.loaded = true;
    });
  }

  loaded = false;
  FooterComponent: any;
  @HostListener('window:scroll', ['$event'])
  onWindowScroll(){

  }
  getfavouritelist(){
    this.UserId = localStorage.getItem("userID");
    var param = {
      userid : this.UserId
    }
      this.Service.userfavouritelist(param).subscribe(response => {
      this.favourite = response['favouritelist'];
      if (this.favourite.length !== 0) {
        this.showLoader = false;
      } else if (this.favourite.length === 0) {
        this.showLoader = true;
      }
    });
  }
  removeItem(property,i){
    // const userid = localStorage.getItem("userID");
    // const prop = this.favourite.splice(i, 1);
    // var param = {
    //   userid : userid,
    //   propid : property
    // }
    // this.Service.addfavaourite(param).subscribe();

    swal({
      title: "Are you sure?",
      text: "Your Selected Property will be removed from the Wish List!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes, Remove!",
      closeOnConfirm: false
    }).then((result) => {
      if (result.value) {
        const PropId = property;
        const userid = localStorage.getItem('userID');
        // const index: number = this.wishListing.indexOf(PropId);
        const prop = this.favourite.splice(i, 1);
        var param = {
            userid : userid,
            propid : property
          }
        this.Service.addfavaourite(param).subscribe(response => {
          swal("Removed!", "Your Selected Property has been removed From Wish List.", "success");
        });
      }
    });

  }
}
