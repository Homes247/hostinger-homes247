import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AllindiaService } from '../allindia.service';
import { CityService } from '../city.service';
declare var $: any;
declare var $: any;
@Component({
  selector: 'app-mat-autocomplete',
  templateUrl: './mat-autocomplete.component.html',
  styleUrls: ['./mat-autocomplete.component.css'],
})
export class MatAutocompleteComponentss implements OnInit {
  Allcities: any;
  IsVisible = true;

  constructor(
    public cityservice: CityService,
    private allindia: AllindiaService,
    private router: Router
  ) { }

  selectedLocation;
  SelectCity = 'Select City';
  citiess: any;
  currentCitySearchNav;
  cityyy: any;
  citynav: any;
  countryExist: any;
  recenthide = false;
  citiesss: any;
  testli_data = [];
  testLi2_data = [];
  RecentCityStorage = [];
  cityid: any;
  searchstring: any;
  navigate: any;
  routerlastValue: any;
  cardvalue: string;
  topCitiesMy = [
    { item: 'Bangalore' },
    { item: 'Hyderabad' },
    { item: 'Chennai' },
    { item: 'Mumbai' },
    { item: 'Kolkata' },
    { item: 'Delhi' },
  ];

  ngOnInit(): void {
    this.getlocationlist();
    this.cardvalue = localStorage.getItem('CityName').toLocaleLowerCase();
    this.citynav = JSON.parse(localStorage.getItem('CityNames'));
    this.selectedLocation = this.SelectCity;
    if (this.citynav == 0) {
      this.recenthide = false;
    } else {
      this.recenthide = true;
    }
    this.RecentCityStorage = this.citynav;
    $('body').addClass('modal-open');
    String.prototype.toLocaleUpperCase = function () {
      return this.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
    };
    $('.head_stick').css('display', 'none');
  }

  selectionChange(event) {
    $('body').removeClass('bodyoverlay');
    $('body').removeClass('modal-open');
    var city = event.target.value.toLowerCase().replace(' ', '-');
    // 
    localStorage.setItem('CityName', city);
    if (this.router.url.indexOf('real-estate-in') > -1) {
      this.routerlastValue = this.router.url.split('-').pop();
      if(this.routerlastValue == city){
        this.router.navigate([city + '/property-sale']);
      }else{
        this.router.navigate(['/real-estate-in-'+ city]);
      }
    } else if(this.router.url.indexOf('property-sale') > -1){
      this.router.navigate([city + '/property-sale']);
    } else if (this.router.url.indexOf('home-for-sale-in-') > -1) {
      this.router.navigate(['/home-for-sale-in-' + city]);
    } else if (this.router.url.indexOf('residential-flats-in-') > -1) {
      this.router.navigate(['/residential-flats-in-' + city + '-for-sale']);
    } else if (this.router.url.indexOf('flats-for-30-lakhs-in') > -1) {
      this.router.navigate(['/fbc/flats-for-30-lakhs-in-' + city]);
    } else if (this.router.url.indexOf('30-lakhs-to-40-lakhs') > -1) {
      this.router.navigate(['/fbc/flats-in-'+ city +'-for-sale-30-lakhs-to-40-lakhs']);
    } else if (this.router.url.indexOf('40-lakhs-to-50-lakhs') > -1) {
      this.router.navigate(['/fbc/flats-in-'+ city +'-for-sale-40-lakhs-to-50-lakhs']);
    } else if (this.router.url.indexOf('50-lakhs-to-60-lakhs') > -1) {
      this.router.navigate(['/fbc/flats-in-'+ city +'-for-sale-50-lakhs-to-60-lakhs']);
    } else if (this.router.url.indexOf('60-lakhs-to-70-lakhs') > -1) {
      this.router.navigate(['/fbc/flats-in-'+ city +'-for-sale-60-lakhs-to-70-lakhs']);
    } else if (this.router.url.indexOf('70-lakhs-to-80-lakhs') > -1) {
      this.router.navigate(['/fbc/flats-in-'+ city +'-for-sale-70-lakhs-to-80-lakhs']);
    } else if (this.router.url.indexOf('80-lakhs-to-90-lakhs') > -1) {
      this.router.navigate(['/fbc/flats-in-'+ city +'-for-sale-80-lakhs-to-90-lakhs']);
    } else if (this.router.url.indexOf('90-lakhs-to-1-crore') > -1) {
      this.router.navigate(['/fbc/flats-in-'+ city +'-for-sale-90-lakhs-to-1-crore']);
    } else if (this.router.url.indexOf('villas-for-sale-in-') > -1) {
      this.router.navigate(['/villas-for-sale-in-' + city]);
    } else if (this.router.url.indexOf('plots-in') > -1) {
      this.router.navigate(['/plots-in-' + city]);
    } else if (this.router.url.indexOf('new-launch-projects') > -1) {
      this.router.navigate(['/new-launch-projects/new-projects-in-' + city]);
    } else if (this.router.url.indexOf('ready-to-move-apartments') > -1) {
      this.router.navigate(['/ready-to-move-apartments/ready-to-move-flats-in-' + city]);
    } else if (this.router.url.indexOf('btc') > -1) {
      this.routerlastValue = this.router.url.split('/btc/')[1];
      var bhk = this.routerlastValue.split('-')[0];
      this.router.navigate(['/btc/' + bhk + '-bhk-flats-in-' + city.replace(' ', '-')]);
    } else if (this.router.url.indexOf('bstc') > -1) {
      this.routerlastValue = this.router.url.split('/bstc/')[1];
      var bhk = this.routerlastValue.split('-')[0];
      this.router.navigate(['/bstc/'+ bhk +'-bhk-ready-to-move-flats-apartments-in-' + city]);
    } else if (this.router.url.indexOf('bstlc') > -1) {
      this.routerlastValue = this.router.url.split('/bstlc/')[1];
      var bhk = this.routerlastValue.split('-')[0];
      this.router.navigate(['/bstc/'+ bhk +'-bhk-ready-to-move-flats-apartments-in-' + city]);
    } else if(this.router.url.indexOf('apartments-in-') > -1){
      this.router.navigate(['/residential-flats-in-' + city + '-for-sale']);
    } else if (this.router.url.indexOf('btlc') > -1){

      this.routerlastValue = this.router.url.split('/btlc/')[1];
      var bhk = this.routerlastValue.split('-')[0];
      this.router.navigate(['/btc/' + bhk + '-bhk-flats-in-' + city.replace(' ', '-')]);
    } else if (this.router.url.indexOf('upcoming-new-launch-properties') > -1){
      this.router.navigate(['/new-launch-projects/new-projects-in-' + city]);
    } else if (this.router.url.indexOf('stlc') > -1){
      this.router.navigate(['/ready-to-move-apartments/ready-to-move-flats-in-' + city]);
    } else if (this.router.url.indexOf('zone') > -1) {
      this.router.navigate([city + '/property-sale']);
    } else if (this.router.url.indexOf('status') > -1){
      this.routerlastValue = this.router.url.split('/').pop();
      this.router.navigate([city + '/status/' + this.routerlastValue]);
    } else if (this.router.url.indexOf('agricultural-land-for-sale') > -1) {
      this.router.navigate(['/agricultural-land-for-sale-in-' + city]);
    } else if (this.router.url.indexOf('/builder/') > -1) {
      this.routerlastValue = this.router.url.split('/builder/')[1];
      this.router.navigate([
        city.replace(' ', '-') + '/builder/' + this.routerlastValue,
      ]);
    } else if (this.router.url.indexOf('projects') > -1) {
      this.router.navigate(['/projects-in-' + city]);
    } else if (this.router.url.indexOf('apartment-projects') > -1) {
      this.router.navigate(['/apartment-projects-in-' + city]);
    } else if (this.router.url.indexOf('/property-for-rent') > -1) {
      this.router.navigate(['/property-for-rent-in-' + city]);
    } else if (this.router.url.indexOf('/rent/house-for-rent-in-') > -1) {
      this.router.navigate(['/rent/house-for-rent-in-' + city]);
    } else if (this.router.url.indexOf('/land-for-rent') > -1) {
      this.router.navigate(['/rent/flats-for-rent-in-' + city]);
    } else if (this.router.url.indexOf('/villas-for-rent-') > -1) {
      this.router.navigate(['/rent/villas-for-rent-in-' + city]);
    } else if (this.router.url.indexOf('flats-for-rent') > -1) {
      this.router.navigate(['/rent/flats-for-rent-in-' + city]);
    }  else {
      // this.cityservice.citybasedrouter(event.target.value);
    }
    this.cityyy = city.toLowerCase();

    let Cityloc;
    if (localStorage.getItem('CityNames')) {
      Cityloc = JSON.parse(localStorage.getItem('CityNames'));
    } else {
      Cityloc = [];
    }

    localStorage.setItem('CityNames', JSON.stringify(Cityloc));
    this.citynav = JSON.parse(localStorage.getItem('CityNames'));
    this.RecentCityStorage = this.citynav;
    const str = city;
    if (Cityloc.indexOf(str) === -1) {
      Cityloc.push(str);
      localStorage.setItem('CityNames', JSON.stringify(Cityloc));
      this.citynav = JSON.parse(localStorage.getItem('CityNames'));
    }
  }

  Selection(event) {
    
    $('body').removeClass('bodyoverlay');
    $('body').removeClass('modal-open');
    this.cardvalue = event.toLocaleLowerCase().replace(' ', '-');
    localStorage.setItem('CityName', event);
    if (this.router.url.indexOf('real-estate-in') > -1) {
      this.routerlastValue = this.router.url.split('-').pop();
      if(this.routerlastValue == this.cardvalue){
        this.router.navigate([this.cardvalue + '/property-sale']);
      }else{
        this.router.navigate(['/real-estate-in-'+ this.cardvalue]);
      }
    } else if (this.router.url.indexOf('property-sale') > -1) {
      this.router.navigate([this.cardvalue + '/property-sale']);
    } else if (this.router.url.indexOf('property-for-rent') > -1) {
      // 
      this.routerlastValue = this.router.url.split('-').pop();
      if(this.routerlastValue == this.cardvalue){
        this.router.navigate(['/rent/house-for-rent-in-' + this.cardvalue]);
      }else{
        this.router.navigate(['/property-for-rent-in-' + this.cardvalue]);
      }
      

    } else if (this.router.url.indexOf('/property/') > -1) {
      this.router.navigate([this.cardvalue + '/property-sale']);
    } else if (this.router.url.indexOf('house-for-rent-in-') > -1) {
      this.router.navigate(['/rent/house-for-rent-in-' + this.cardvalue]);
    } else if (this.router.url.indexOf('home-for-sale-in-') > -1) {
      this.router.navigate(['/home-for-sale-in-' + this.cardvalue]);
    } else if (this.router.url.indexOf('residential-flats-in-') > -1) {
      this.router.navigate([ '/residential-flats-in-' + this.cardvalue + '-for-sale', ]);
    } else if (this.router.url.indexOf('flats-for-30-lakhs-in') > -1) {
      this.router.navigate(['/fbc/flats-for-30-lakhs-in-' + this.cardvalue]);
    } else if (this.router.url.indexOf('30-lakhs-to-40-lakhs') > -1) {
      this.router.navigate(['/fbc/flats-in-'+ this.cardvalue +'-for-sale-30-lakhs-to-40-lakhs']);
    } else if (this.router.url.indexOf('40-lakhs-to-50-lakhs') > -1) {
      this.router.navigate(['/fbc/flats-in-'+ this.cardvalue +'-for-sale-40-lakhs-to-50-lakhs']);
    } else if (this.router.url.indexOf('50-lakhs-to-60-lakhs') > -1) {
      this.router.navigate(['/fbc/flats-in-'+ this.cardvalue +'-for-sale-50-lakhs-to-60-lakhs']);
    } else if (this.router.url.indexOf('60-lakhs-to-70-lakhs') > -1) {
      this.router.navigate(['/fbc/flats-in-'+ this.cardvalue +'-for-sale-60-lakhs-to-70-lakhs']);
    } else if (this.router.url.indexOf('70-lakhs-to-80-lakhs') > -1) {
      this.router.navigate(['/fbc/flats-in-'+ this.cardvalue +'-for-sale-70-lakhs-to-80-lakhs']);
    } else if (this.router.url.indexOf('80-lakhs-to-90-lakhs') > -1) {
      this.router.navigate(['/fbc/flats-in-'+ this.cardvalue +'-for-sale-80-lakhs-to-90-lakhs']);
    } else if (this.router.url.indexOf('90-lakhs-to-1-crore') > -1) {
      this.router.navigate(['/fbc/flats-in-'+ this.cardvalue +'-for-sale-90-lakhs-to-1-crore']);
    }else if (this.router.url.indexOf('villas-for-sale-in-') > -1) {
      this.router.navigate(['/villas-for-sale-in-' + this.cardvalue]);
    } else if (this.router.url.indexOf('plots-in') > -1) {
      this.router.navigate(['/plots-in-' + this.cardvalue]);
    } else if (this.router.url.indexOf('new-launch-projects') > -1) {
      this.router.navigate(['/new-launch-projects/new-projects-in-' + this.cardvalue]);
    } else if (this.router.url.indexOf('ready-to-move-apartments') > -1) {
      this.router.navigate(['/ready-to-move-apartments/ready-to-move-flats-in-' + this.cardvalue]);
    } else if (this.router.url.indexOf('btc') > -1) {
      this.routerlastValue = this.router.url.split('/btc/')[1];
      var bhk = this.routerlastValue.split('-')[0];
      this.router.navigate(['/btc/' + bhk + '-bhk-flats-in-' + this.cardvalue.replace(' ', '-')]);
    } else if (this.router.url.indexOf('bstc') > -1){
      this.routerlastValue = this.router.url.split('/bstc/')[1];
      var bhk = this.routerlastValue.split('-')[0];
      this.router.navigate(['/bstc/' + bhk + '-bhk-ready-to-move-flats-apartments-in-' + this.cardvalue.replace(' ', '-')]);
    } else if (this.router.url.indexOf('bstlc') > -1) {
      this.routerlastValue = this.router.url.split('/bstlc/')[1];
      var bhk = this.routerlastValue.split('-')[0];
      this.router.navigate(['/bstc/'+ bhk +'-bhk-ready-to-move-flats-apartments-in-' + this.cardvalue.replace(' ', '-')]);
    } else if(this.router.url.indexOf('apartments-in-') > -1){
      this.router.navigate(['/residential-flats-in-' + this.cardvalue + '-for-sale']);
    } else if (this.router.url.indexOf('btlc') > -1){
      this.routerlastValue = this.router.url.split('/btlc/')[1];
      var bhk = this.routerlastValue.split('-')[0];
      this.router.navigate(['/btc/' + bhk + '-bhk-flats-in-' + this.cardvalue.replace(' ', '-')]);
    } else if (this.router.url.indexOf('upcoming-new-launch-properties') > -1){
      this.router.navigate(['/new-launch-projects/new-projects-in-' + this.cardvalue.replace(' ', '-')]);
    } else if (this.router.url.indexOf('stlc') > -1){
      this.router.navigate(['/ready-to-move-apartments/ready-to-move-flats-in-' + this.cardvalue]);
    } else if (this.router.url.indexOf('zone') > -1) {
      this.router.navigate([this.cardvalue + '/property-sale']);
    } else if (this.router.url.indexOf('status') > -1){
      this.routerlastValue = this.router.url.split('/').pop();
      this.router.navigate([this.cardvalue + '/status/' + this.routerlastValue]);
    } else if (this.router.url.indexOf('agricultural-land-for-sale') > -1) {
      this.router.navigate(['/agricultural-land-for-sale-in-' + this.cardvalue]);
    } else if (this.router.url.indexOf('projects') > -1) {
      this.router.navigate(['/projects-in-' + this.cardvalue]);
    } else if (this.router.url.indexOf('apartment-projects') > -1) {
      this.router.navigate(['/apartment-projects-in-' + this.cardvalue]);
    } else if (this.router.url.indexOf('/land-for-rent') > -1) {
      this.router.navigate(['/rent/flats-for-rent-in-' + this.cardvalue]);
    } else if (this.router.url.indexOf('villas-for-rent-') > -1) {
      this.router.navigate(['/rent/villas-for-rent-in-' + this.cardvalue]);
    } else if (this.router.url.indexOf('flats-for-rent') > -1) {
      this.router.navigate(['/rent/flats-for-rent' + this.cardvalue]);
    } else if (this.router.url.indexOf('/builder/') > -1) {
      this.routerlastValue = this.router.url.split('/builder/')[1];
      this.router.navigate([
        this.cardvalue.replace(' ', '-') + '/builder/' + this.routerlastValue,
      ]);
    } else {
    // this.cityservice.citybasedrouter(event);
      this.router.navigate(['/real-estate-in-'+ this.cardvalue]);
    }
    let Cityloc;
    if (localStorage.getItem('CityNames')) {
      Cityloc = JSON.parse(localStorage.getItem('CityNames'));
    } else {
      Cityloc = [];
    }
    localStorage.setItem('CityNames', JSON.stringify(Cityloc));
    this.RecentCityStorage = JSON.parse(localStorage.getItem('CityNames'));
    const str = event.toLocaleLowerCase();
    if (Cityloc.indexOf(str) === -1) {
      Cityloc.push(str);
      localStorage.setItem('CityNames', JSON.stringify(Cityloc));
      this.cardvalue = JSON.parse(localStorage.getItem('CityNames'));
    }
  }

  getlocationlist() {
    this.allindia.getlocationlist().subscribe((city: any[]) => {
      this.citiesss = city['locations'];
      this.Allcities = city['locations'];
      for (let i = 0; i < this.topCitiesMy.length; i++) {
        this.Allcities = this.Allcities.filter(
          (item) => item.city !== this.topCitiesMy[i].item
        );
      }
    });
  }

  removeCity(parts: any) {
    // 
    localStorage.removeItem('CityNames');
    this.RecentCityStorage = this.RecentCityStorage.filter(
      (item) => item !== parts
    );
    localStorage.setItem('CityNames', JSON.stringify(this.RecentCityStorage));
    this.citynav = JSON.parse(localStorage.getItem('CityNames'));
    if (this.citynav == 0) {
      this.recenthide = false;
    } else {
      this.recenthide = true;
    }
  }

  isReadMore = true;
  showText() {
    this.isReadMore = !this.isReadMore;
  }

  ShowHidecontact() {
    $('body').removeClass('bodyoverlay');
    $('body').removeClass('modal-open');
    $('.head_stick').css('display', 'block');
    $('.matAuto').css('display', 'none');
    // this.IsVisible = this.IsVisible ? false : true;
  }
}
