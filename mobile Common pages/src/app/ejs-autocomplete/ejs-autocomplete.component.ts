import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AllindiaService } from '../allindia.service';
import { CityService } from '../city.service';
import { DataService } from '../data.service';
declare var $: any;
export const myValue = new BehaviorSubject<{ LocalityId: any; locality_name: any }[]>([]);

declare var $: any;
@Component({
  selector: 'app-ejs-autocomplete',
  templateUrl: './ejs-autocomplete.component.html',
  styleUrls: ['./ejs-autocomplete.component.css']
})
export class EjsAutocompleteComponent implements OnInit {
  @ViewChild('componentTrigger2') componentTrigger2: any;
  searchstring: any;
  options;
  filteredOptions: Observable<any>;
  myControl = new FormControl();
  currentCity = 'Select City';

  public autoCompleteData: { [key: string]: Object }[] = [];

  public fields: Object = { groupBy: 'title', value: 'name' };

  public text: string;

  public highlight: Boolean = false;

  public wheretotakecity: Boolean = true;

  public minLength: Number = 2;

  // private isTriggered = false;

  constructor(
    private allindia: AllindiaService,
    private router: Router,
    public cityservice: CityService,
    public Service: DataService,
    public activatedRoute: ActivatedRoute
  ) {
    this.Service.mouseenterlisten4().subscribe(() => {
      this.getAutocomp();
      this.wheretotakecity = true;
    });
    this.Service.mouseenterlisten7().subscribe(data => {
      if (data === 'Buy') {
        this.getAutocomp();
      } else if (data === 'Rent') {
        this.getRentaldata();
      } else if (data === 'PG') {
        this.getRentalPGdata();
      } else if (data === 'Commercial') {
        this.getautoCommercialcomplete();
      }
    });
  }

  ngOnInit(): void {
    this.text = 'Search by Locality';
    this.PageIndex();
  }

  PageIndex() {
    if (this.router.url.indexOf('/property-sale') > -1) {
      this.getAutocomp();
    } else if (this.router.url.indexOf('/real-estate-in') > -1) {
      this.getAutocomp();
    } else if (this.router.url.indexOf('/new-launch-projects/new-projects-in-') > -1) {
      this.getAutocomp();
    } else if (this.router.url.indexOf('/ready-to-move-apartments/ready-to-move-flats-in-') > -1) {
      this.getAutocomp();
    } else if (this.router.url.indexOf('/btc') > -1) {
      this.getAutocomp();
    } else if (this.router.url.indexOf('/bstc') > -1) {
      this.getAutocomp();
    } else if (this.router.url.indexOf('/bstlc') > -1) {
      this.getAutocomp();
    } else if (this.router.url.indexOf('/residential-flats-in') > -1) {
      this.getAutocomp();
    } else if (this.router.url.indexOf('/fbc') > -1) {
      this.getAutocomp();
    } else if (this.router.url.indexOf('/villas-for-sale-in-') > -1) {
      this.getAutocomp();
    } else if (this.router.url.indexOf('/plots-in-') > -1) {
      this.getAutocomp();
    } else if (this.router.url.indexOf('/home-for-sale-in-') > -1) {
      this.getAutocomp();
    } else if (this.router.url.indexOf('/upcoming-new-launch-properties/new-projects-in-') > -1) {
      this.getAutocomp();
    } else if (this.router.url.indexOf('/stlc') > -1) {
      this.getAutocomp();
    } else if (this.router.url.indexOf('/btlc') > -1) {
      this.getAutocomp();
    } else if (this.router.url.indexOf('/builder') > -1) {
      this.getAutocomp();
    } else if (this.router.url.indexOf('/status/') > -1) {
      this.getAutocomp();
    } else if (this.router.url.indexOf('/zone/') > -1) {
      this.getAutocomp();
    } else if (this.router.url.indexOf('/agricultural-land-for-sale-in-') > -1) {
      this.getAutocomp();
    } else if (this.router.url.indexOf('/all-project-walkthrough-videos-in-india') > -1) {
      this.getAutocomp();
    } else if (this.router.url.indexOf('/all-project-reviews-in-india') > -1) {
      this.getAutocomp();
    } else if (this.router.url.indexOf('/pcv') > -1) {
      this.getAutocomp();
    } else if (this.router.url.indexOf('/pclv') > -1) {
      this.getAutocomp();
    } else if (this.router.url.indexOf('/pcr') > -1) {
      this.getAutocomp();
    } else if (this.router.url.indexOf('/pclr') > -1) {
      this.getAutocomp();
    } else if (this.router.url.indexOf('/prd') > -1) {
      this.getAutocomp();
    } else if (this.router.url.indexOf('/pincode') > -1) {
      this.getAutocomp();
    } else if (this.router.url.indexOf('/ifsc') > -1) {
      this.getAutocomp();
    } else if (this.router.url.indexOf('/rent/') > -1) {
      this.getRentaldata();
    } else if (this.router.url.indexOf('/rental/') > -1) {
      this.getRentaldata();
    } else if (this.router.url.indexOf('/rentals/') > -1) {
      this.getRentaldata();
    } else if (this.router.url.indexOf('/property-for-rent-in-') > -1) {
      this.getRentaldata();
    } else if (this.router.url.indexOf('/pgd/') > -1) {
      this.getRentalPGdata();
    } else if (this.router.url.indexOf('/pgcl/') > -1) {
      this.getRentalPGdata();
    } else if (this.router.url.indexOf('/pg-home') > -1) {
      this.getRentalPGdata();
    } else if (this.router.url.indexOf('/commercial') > -1) {
      this.getautoCommercialcomplete();
    } else {
      var value = this.cityservice.cityfinder(this.router.url);
      if (value.cityid === undefined) {
        this.getautocomplete();
      } else {
        this.getAutocomp();
      }
    }
  }
  public handleClose(event: any): void {
    // Prevent closing the dropdown
    event.cancel = true;
  }
  apioptions(apivalue) {
    this.options = apivalue;
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => value.length >= 1 ? this._filter(value) : [])
      );
  }
  private _filter(value: string) {
    const filterValue = value.toLowerCase();
    // 
    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  getautocomplete() {
    this.text = "Search Locality, Builder, Project";
    this.allindia.allindiaAuto().subscribe((myLocalList: any[]) => {
      if (myLocalList['status'] === 'True') {
        this.apioptions(myLocalList['autolist']);
        var All_autocomplete_1 = myLocalList['autolist'];

        this.allindia.allindiaAuto2().subscribe((myLocalList1: any[]) => {
          if (myLocalList1['status'] === 'True') {
            this.apioptions(myLocalList1['autolist']);
            var All_autocomplete_2 = myLocalList1['autolist'];
            this.autoCompleteData = [...All_autocomplete_1, ...All_autocomplete_2];
          }
        });
      }
    });
  }
  getautoCommercialcomplete() {
    this.text = "Search Locality, Builder, Project";
    this.allindia.allindiacommercialAuto().subscribe((myLocalList1: any[]) => {
      if (myLocalList1['status'] === 'True') {
        this.apioptions(myLocalList1['autolist']);
        var All_autocomplete_2 = myLocalList1['autolist'];
        this.autoCompleteData = All_autocomplete_2;
      }
    });
  }
  getRentaldata() {
    this.text = "Search by Locality";

    var value = this.cityservice.cityfinder(this.router.url);
    if (value.cityid === undefined) {
      this.currentCity = 'Bangalore'
      this.cityid = '1';
    } else {
      this.cityid = value.cityid;
      this.currentCity = value.cityname.replace('-', ' ');
    }
    this.allindia.getAuto(this.cityid).subscribe((response: any) => {
      const myLocalList = response.autolist || response.someOtherProperty;
      if (Array.isArray(myLocalList)) {
        const localityList = myLocalList.filter(item => item.type === 'locality_name');
        this.autoCompleteData = localityList as { [key: string]: Object }[];
        // 
      } else {
        // console.error('Expected array not found in response:', response);
      }
    });

  }
  getRentalPGdata() {
    this.text = "Search by Locality";

    var value = this.cityservice.cityfinder(this.router.url);
    if (value.cityid === undefined) {
      this.currentCity = 'Bangalore'
      this.cityid = '1';
    } else {
      this.cityid = value.cityid;
      this.currentCity = value.cityname.replace('-', ' ');
    }
    this.allindia.getPGAuto(this.cityid).subscribe((response: any) => {
      const myLocalList = response.autolist || response.someOtherProperty;
      if (Array.isArray(myLocalList)) {
        // 
        const localityList = myLocalList.filter(item => item.type === 'locality_name');
        this.autoCompleteData = localityList as { [key: string]: Object }[];
        // 
      } else {
      }
    });

  }
  cityid: any;
  private previousCityId: string | null = null; // Track last city ID
  private autoRequestInProgress: boolean = false; // Track active API request

  getAutocomp() {
    // this.text = "Enter a location, builder, project";
    // setTimeout(() => {
    //   this.text = "Enter a location, builder, project";
    // });
    if (this.wheretotakecity == false) {
      var finalcitydata = this.router.url;
    } else {
      var finalcitydata = localStorage.getItem('CityName');
    }
    const value = this.cityservice.cityfinder(finalcitydata);
    if (value.cityid === undefined) {
      this.currentCity = 'Bangalore';
      this.cityid = '1';
    } else {
      this.cityid = value.cityid;
      this.currentCity = value.cityname.replace('-', ' ');
    }

    this.allindia.getAuto(this.cityid).subscribe(myLocalList => {
      this.apioptions(myLocalList?.autolist || []);
      this.autoCompleteData = myLocalList?.autolist || [];
    });
  }


  onItemSelect(selected) {
    var currentCity = selected.city;
    this.getProjectsclick(currentCity, selected);
  }
  selectEvent(event) {
    var currentCity = event.itemData.city;
    var selected = event.itemData;
    this.getProjectsclick(currentCity, selected);

    setTimeout(() => {
      this.componentTrigger2.value = '';
      this.componentTrigger2.dataBind(); // Ensure the component state updates
    }, 100);
  }
  getProjectsclick(currentCity, selected) {
    this.currentCity = currentCity;

    var cityname = currentCity.toLowerCase();
    // this.router.navigate([cityname + '/property-sale']);

    if (selected.type == 'builder_name') {
      var buildname = selected.name;
      this.searchstring = buildname;
      var buildername = buildname.replace(/\s+/g, '-').toLowerCase();
      var buildid = selected.id;
      localStorage.setItem('BuilderName', buildname);
      localStorage.setItem('BuilderId', buildid);

      this.router.navigate([cityname + '/builder/' + buildername + '-' + buildid]);
      $('#FirstCityModal').modal('hide');
      $('#SecondCityModal').modal('hide');
      $('#filterModal').modal('hide');
    } else {
    }
    if (selected.type == 'locality_name') {
      var locname = selected.name;
      this.searchstring = locname;
      var localityname = locname.replace(/\s+/g, '-').toLowerCase();
      const newEntry = { LocalityId: selected.id, locality_name: selected.name };
      const updatedValues = [newEntry];
      myValue.next(updatedValues);
      myValue.next([]);

      var staticlocurl = 'property-sale-in';
      var locid = selected.id;
      localStorage.setItem('LocalityName', locname);
      localStorage.setItem('LocalityId', locid);

      if (this.router.url.indexOf('/rent/') > -1) {
        // this.router.navigate(['rental/house-for-rent-in-' + localityname + '-' + this.currentCity.toLowerCase() + '-' + locid]);
      } else if (this.router.url.indexOf('/rental/') > -1) {
        // this.router.navigate(['rental/house-for-rent-in-' + localityname + '-' + this.currentCity.toLowerCase() + '-' + locid]);
      } else if (this.router.url.indexOf('/rentals/') > -1) {
        // this.router.navigate(['rental/house-for-rent-in-' + localityname + '-' + this.currentCity.toLowerCase() + '-' + locid]);
      } else if (this.router.url.indexOf('/buy/') > -1) {
        this.router.navigate(['/buy/projects-for-sale-in-' + localityname + '-' + this.currentCity.toLowerCase() + '-' + locid]);
      } else if (this.router.url.indexOf('/projects-in-') > -1) {
        this.router.navigate(['/buy/projects-for-sale-in-' + localityname + '-' + this.currentCity.toLowerCase() + '-' + locid]);
      } else {
        $('#FirstCityModal').modal('hide');
        $('#SecondCityModal').modal('hide');
        $('#filterModal').modal('show');
        // this.router.navigate([cityname + '/' + staticlocurl + '-' + localityname + '-' + locid]);
      }

    } else {
    }
    if (selected.type == 'regions') {
      var zone = selected.name;
      this.searchstring = zone;
      var zonename = zone.replace(/\s+/g, '-').toLowerCase();
      var zoneid = selected.id;
      localStorage.setItem('Zone', zone);
      localStorage.setItem('ZoneId', zoneid);

      this.router.navigate([cityname + '/zone/' + zonename + '-' + zoneid]);
      $('#FirstCityModal').modal('hide');
      $('#SecondCityModal').modal('hide');
      $('#filterModal').modal('hide');
    } else {
    }
    if (selected.type == 'status') {
      var status = selected.name;
      this.searchstring = status;
      var statusname = status.replace(/\s+/g, '-').toLowerCase();
      var statusid = selected.id;
      localStorage.setItem('Status', status);
      localStorage.setItem('StatusId', statusid);

      this.router.navigate([cityname + '/status/' + statusname + '-' + statusid]);
      $('#FirstCityModal').modal('hide');
      $('#SecondCityModal').modal('hide');
      $('#filterModal').modal('hide');
    } else {
    }
    if (selected.type == 'PropType') {
      var propertytype = selected.name;
      this.searchstring = propertytype;
      var proptype = propertytype.replace(/\s+/g, '-').toLowerCase();
      var proptypeid = selected.id;
      localStorage.setItem('PropType', propertytype);
      localStorage.setItem('ProptypeId', proptypeid);

      this.router.navigate([cityname + '/sale/' + proptype + '-' + proptypeid]);
      $('#FirstCityModal').modal('hide');
      $('#SecondCityModal').modal('hide');
      $('#filterModal').modal('hide');
    } else {
    }
    if (selected.type == 'reraId') {
      var reraid = selected.id;
      this.searchstring = reraid;
      localStorage.setItem('ReraID', reraid);

      this.router.navigate([cityname + '/property-sale']);
      $('#FirstCityModal').modal('hide');
      $('#SecondCityModal').modal('hide');
      $('#filterModal').modal('hide');
    } else {
    }
    if (selected.type == 'property_name') {
      var propname = selected.name;
      this.searchstring = propname;
      var propurlname = propname.replace(/\s+/g, '-').toLowerCase();
      var propid = selected.id;
      var proplocality = selected.locality;
      var locurlname = proplocality.replace(/\s+/g, '-').toLowerCase();
      localStorage.setItem('PropID', propid);
      localStorage.setItem('PropName', propname);
      localStorage.setItem('CityName', currentCity);
      this.router.navigate([]).then(result => {
        window.open('/property/' + cityname + '/' + locurlname + '/' + propurlname + '-' + propid, '_blank');
      });
      $('#FirstCityModal').modal('hide');
      $('#SecondCityModal').modal('hide');
      $('#filterModal').modal('hide');
    } else {
    }

  }
}
