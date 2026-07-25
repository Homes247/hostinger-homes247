import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';

declare var $: any;
@Component({
  selector: 'app-property-type-locality',
  templateUrl: './property-type-locality.component.html',
  styleUrls: ['./property-type-locality.component.css']
})
export class PropertyTypeLocalityComponent implements OnInit {
  propertylists: any;
  city = '1'
  propertyimage =  this.dataService.imagesURL + "uploadPropertyImgs/";
  static localitycount: number;
  showLoader = true;
  localtyname: any;
  projectcount: any;
  Date = new Date();
  protype: any;
  innerheader:any;
  loaded=false;
  constructor(private dataService:DataService,private activeroute:ActivatedRoute) { }

  ngOnInit(){
    this.getapartments();
    import('../footer/footer.module').then(mod => mod.FooterModule).then(FooterModule =>{
      this.FooterComponent = FooterModule.components['lazy'];
    });
  }
  FooterComponent: any;
  @HostListener('window:scroll', ['$event'])
  onWindowScroll(){

    // import('../innerheader/innerheader.module').then(mod => mod.InnerHeaderModule).then(InnerHeaderModule => {
    //   this.innerheader = InnerHeaderModule.components['lazy'];
    //   this.loaded = true;
    // });

  }
  getapartments()
  {
    PropertyTypeLocalityComponent.localitycount = 0;
   this.activeroute.params.subscribe(params => {
      var url = params['propertytype-locaname'];
      if(url.indexOf("apartments") >-1){
        this.protype = '50401'
      }
      
      var urlsplit = url.split('-');
      var localityid = url.split('-').pop().match(/[0-9]+/);
      
      var urlstaticremove = url.replace(/apartments-for-sale-in-/g,"");
      var urlhyphenremove = urlstaticremove.replace(/-/g," ");
      var locname = urlhyphenremove;
      String.prototype.toLocaleUpperCase = function () {
        return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
      };
      var locality_name = urlhyphenremove.toLocaleUpperCase();
      this.localtyname = locality_name;
      
    var limitparam = 0;
    var limitprprtyrows = 4;
    var proptype = this.protype
    // var locid = '5';
    var param = {
    limit: limitparam,
    limitrows: limitprprtyrows,
    localityname:locname,
  //  locality: locid,
    proptypeid : proptype
  }
  this.dataService.getCity(this.city, param).subscribe(lists =>{
     this.propertylists = lists['deatils'];
  })
  this.dataService.getprojectscount(this.city, param).subscribe(countprojects=>{
    let projectcount = countprojects['Counts'];
  this.projectcount = projectcount[0].PropertyCounts;
  if(this.projectcount <= 0){
    this.showLoader = false;
  }
  })
})
window.scroll(0,0);
}
loadMore() {
  this.activeroute.params.subscribe(params => {
    var url = params['propertytype-locaname'];
    
    var urlsplit = url.split('-');
    var localityid = url.split('-').pop().match(/[0-9]+/);
    var urlstaticremove = url.replace(/apartments-for-sale-in-/g,"");
    var urlhyphenremove = urlstaticremove.replace(/-/g," ");
    var locname = urlhyphenremove;
    const limit = PropertyTypeLocalityComponent.localitycount+=4;
    let limitprprtyrows = 4;
    var proptype ='50401';
    var locid = '5';
    // var loc = this.locality;
    var param = {
      limit: limit,
      limitrows: limitprprtyrows,
      localityname:locname,
      locality: locid,
      proptypeid : proptype
    }
    this.showLoader = true;
     this.dataService.getCity(this.city, param).subscribe(propertylists => {
      this.propertylists = this.propertylists.concat(propertylists['deatils']);
      this.showLoader = false
      })
      this.dataService.getprojectscount(this.city, param).subscribe(projectcounts=>{
        let projectcount = projectcounts['Counts'];
        this.projectcount = projectcount[0].PropertyCounts;
      })
});
}
}
