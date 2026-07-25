import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { DataService2 } from '../data.service2';

@Component({
  selector: 'app-pg-sitemap',
  templateUrl: './pg-sitemap.component.html',
  styleUrls: ['./pg-sitemap.component.css']
})
export class PgSitemapComponent implements OnInit {

  completedata: any;
  routeSub: any;
  cityname: any;
  majorcities: any;

  constructor(private dataService: DataService, private Service: DataService2) { }

  ngOnInit(): void {
    this.values();
    this.dataService.createLinkForCanonicalURL();
  }


  values() {
    // var blogid = '1';
    // this.Service.getblogAuto(blogid).subscribe((myLocalList: any[]) => {
    //   this.completedata = myLocalList['blogautolist'];
    // });
    this.dataService.getlocationlist().subscribe((majorcity: any[]) => {
      if ((majorcity['status']) === 'True') {
        this.completedata = majorcity['locations'];
      }
    });
  }


}
