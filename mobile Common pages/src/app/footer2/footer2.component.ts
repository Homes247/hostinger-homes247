import { Component, OnInit } from '@angular/core';

declare var $: any;
@Component({
  selector: 'app-footer2',
  templateUrl: './footer2.component.html',
  styleUrls: ['./footer2.component.css']
})
export class FooterComponent2 implements OnInit {

  constructor() { }
  mobileview:boolean;

  ngOnInit() {
    this.onresize();
  }
  onresize()
  {
    var width = window.innerWidth;
    if (width < 420) {
      this.mobileview = true;
    }else{
      this.mobileview = false;
    }
  }

}
