import { Component, OnInit, OnDestroy, ViewChild, PLATFORM_ID, Inject, ChangeDetectorRef } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable, Subject, combineLatest } from 'rxjs';
import { distinctUntilChanged, map, startWith, takeUntil, throttleTime } from 'rxjs/operators';
import { SafeStorageService } from '../safe-storage.service';

// Services
import { AllindiaService } from '../allindia.service';
import { CityService } from '../city.service';
import { DataService } from '../data.service';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

declare var $: any;

export const myValue = new Subject<{
  LocalityId: any;
  locality_name: any
}[]>();

@Component({
  selector: 'app-ejs-autocomplete',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './ejs-autocomplete.html',
  styleUrl: './ejs-autocomplete.css',
})
export class EjsAutocomplete implements OnInit, OnDestroy {

  searchstring: any;
  options: any[] = [];
  filteredOptions: Observable<any[]>;
  myControl = new FormControl();
  currentCity = 'Select City';
  cityid: any;

  public autoCompleteData: AutoCompleteItem[] = [];
  public text: string;
  public wheretotakecity: Boolean = true;
  empty: any;

  private optionsSubject = new BehaviorSubject<any[]>([]);
  private destroy$ = new Subject<void>();
  private previousCityId: string | null = null;
  private autoRequestInProgress: boolean = false;

  constructor(
    private allindia: AllindiaService,
    private router: Router,
    public cityservice: CityService,
    public Service: DataService,
    public activatedRoute: ActivatedRoute,
    private cd: ChangeDetectorRef,
    private storage: SafeStorageService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.Service.mouseenterlisten4()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.getAutocomp();
        this.wheretotakecity = true;
      });

    this.Service.mouseenterlisten7()
      .pipe(
        throttleTime(300),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe((data: string) => {
        if (data === 'Buy') {
          this.getAutocomp();
        } else if (data === 'Rent') {
          this.getRentaldata();
        } else if (data === 'Resale') {
          this.getResaledata();
        } else if (data === 'PG') {
          this.getRentalPGdata();
        } else if (data === 'Commercial') {
          this.getRentaldata();
        }
      });
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.text = 'Search by Locality';

      this.filteredOptions = combineLatest([
        this.myControl.valueChanges.pipe(startWith('')),
        this.optionsSubject
      ]).pipe(
        takeUntil(this.destroy$),
        map(([value, options]) => {
          const filterValue =
            typeof value === 'string'
              ? value.toLowerCase()
              : value?.name.toLowerCase() ?? '';

          if (filterValue.length < 2) {
            return [];
          }

          const result = options.filter(option =>
            option.name.toLowerCase().startsWith(filterValue)
          );

          this.empty = result.length === 0;
          return result;
        })
      );
      this.PageIndex();
    }
  }

  displayLocality(item: any): string {
    return item?.locality_name || '';
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  PageIndex() {

    const url = this.router.url;

    const buyRoutes = [
      '/property-sale', '/real-estate-in', '/new-launch-projects/new-projects-in-',
      '/ready-to-move-apartments/ready-to-move-flats-in-', '/btc', '/bstc', '/bstlc',
      '/residential-flats-in', '/fbc', '/villas-for-sale-in-', '/plots-in-',
      '/home-for-sale-in-', '/upcoming-new-launch-properties/new-projects-in-',
      '/stlc', '/btlc', '/builder', '/status/', '/zone/',
      '/agricultural-land-for-sale-in-', '/all-project-walkthrough-videos-in-india',
      '/all-project-reviews-in-india', '/pcv', '/pclv', '/pcr', '/pclr',
      '/prd', '/pincode', '/ifsc'
    ];

    const rentRoutes = ['/rent/', '/rental/', '/rentals/', '/property-for-rent-in-'];

    const resaleRoutes = ['/projects-in-', '/apartment-projects-in-', '/villa-projects-in-', '/land-projects-in-', '/buy/'];

    const pgRoutes = ['/pgd/', '/pgcl/', '/pg-home'];

    const commercialRoutes = ['/cll/', '/cml/', '/commercial'];

    if (buyRoutes.some(route => url?.indexOf(route) > -1)) {
      this.getAutocomp();
    } else if (rentRoutes.some(route => url?.indexOf(route) > -1)) {
      this.getRentaldata();
    } else if (resaleRoutes.some(route => url?.indexOf(route) > -1)) {
      this.getResaledata();
    } else if (pgRoutes.some(route => url?.indexOf(route) > -1)) {
      this.getRentalPGdata();
    } else if (commercialRoutes.some(route => url?.indexOf(route) > -1)) {
      this.getRentaldata();
    } else {
      const value = this.cityservice.cityfinder(url);
      if (value.cityid === undefined) {
        this.getautocomplete();
      } else {
        this.getAutocomp();
      }
    }
  }

  apioptions(apivalue: any[]) {
    this.options = apivalue;
    this.optionsSubject.next(apivalue);
  }

  private _filter(value: string): any[] {
    const filterValue = value.toLowerCase();
    const result = this.options.filter(option =>
      option.name.toLowerCase().startsWith(filterValue)
    );
    this.empty = result.length === 0;
    return result;
  }

  getautocomplete() {
    this.text = "Search Locality, Builder, Project";
    this.allindia.allindiaAuto().subscribe((myLocalList: any[]) => {
      if (myLocalList['status'] === 'True') {
        const All_autocomplete_1 = myLocalList['autolist'];

        this.allindia.allindiaAuto2().subscribe((myLocalList1: any[]) => {
          if (myLocalList1['status'] === 'True') {
            const All_autocomplete_2 = myLocalList1['autolist'];
            const combined = [...All_autocomplete_1, ...All_autocomplete_2];
            this.autoCompleteData = combined;
            this.apioptions(combined);
          }
        });
      }
    });
  }

  // getautoCommercialcomplete() {
  //   // alert('commercial');
  //   this.text = "Search Locality, Builder, Project";

  //   const value = this.cityservice.cityfinder(this.router.url);
  //   if (value.cityid === undefined) {
  //     this.currentCity = 'Bangalore';
  //     this.cityid = '1';
  //   } else {
  //     this.cityid = value.cityid;
  //     this.currentCity = value.cityname.replace('-', ' ');
  //   }

  //   this.allindia.allindiacommercialAuto().subscribe((res: any) => {
  //     if (res && res.status === 'True') {
  //         // alert('commercial auto');
  //       const list = res.autolist || [];
  //       const filteredList = list.filter(item =>
  //         item.type === 'locality_name' ||
  //         item.type === 'builder_name' ||
  //         item.type === 'project_name'
  //       );

  //       this.autoCompleteData = [...filteredList];
  //       console.log(this.autoCompleteData);
        
  //       this.apioptions(this.autoCompleteData);
  //       this.cd.detectChanges();
  //     }
  //   });
  // }

  getRentaldata() {
    this.text = "Search by Locality";

    const value = this.cityservice.cityfinder(this.router.url);
    if (value.cityid === undefined) {
      this.currentCity = 'Bangalore';
      this.cityid = '1';
    } else {
      this.cityid = value.cityid;
      this.currentCity = value.cityname.replace('-', ' ');
    }

    this.allindia.getAuto(this.cityid).subscribe((response: any) => {
      const myLocalList = response.autolist || [];
      if (Array.isArray(myLocalList)) {
        const localityList = myLocalList.filter(item => item.type === 'locality_name');
        this.autoCompleteData = localityList;
        this.apioptions(localityList);
        this.cd.detectChanges();
      }
    });
  }

  getResaledata() {
    this.text = "Search by Locality";

    const value = this.cityservice.cityfinder(this.router.url);
    if (value.cityid === undefined) {
      this.currentCity = 'Bangalore';
      this.cityid = '1';
    } else {
      this.cityid = value.cityid;
      this.currentCity = value.cityname.replace('-', ' ');
    }

    this.allindia.getAuto(this.cityid).subscribe((response: any) => {
      const myLocalList = response.autolist || [];
      if (Array.isArray(myLocalList)) {
        const localityList = myLocalList.filter(item => item.type === 'locality_name');
        this.autoCompleteData = localityList;
        this.apioptions(localityList);
        this.cd.detectChanges();
      }
    });
  }

  getRentalPGdata() {
    this.text = "Search by Locality";

    const value = this.cityservice.cityfinder(this.router.url);
    if (value.cityid === undefined) {
      this.currentCity = 'Bangalore';
      this.cityid = '1';
    } else {
      this.cityid = value.cityid;
      this.currentCity = value.cityname.replace('-', ' ');
    }

    this.allindia.getPGAuto(this.cityid).subscribe((response: any) => {
      const myLocalList = response.autolist || [];
      if (Array.isArray(myLocalList)) {
        const localityList = myLocalList.filter(item => item.type === 'locality_name');
        this.autoCompleteData = localityList;
        this.apioptions(localityList);
        this.cd.detectChanges();
      }
    });
  }

  getAutocomp() {
    const finalcitydata = this.wheretotakecity == false
      ? this.router.url
      : this.storage?.getItem('CityName');

    const value = this.cityservice.cityfinder(finalcitydata);
    if (value.cityid === undefined) {
      this.currentCity = 'Bangalore';
      this.cityid = '1';
    } else {
      this.cityid = value.cityid;
      this.currentCity = value.cityname.replace('-', ' ');
    }

    this.allindia.getAuto(this.cityid).subscribe(myLocalList => {
      const list = myLocalList?.autolist || [];
      this.autoCompleteData = list;
      this.apioptions(list);
      this.cd.detectChanges();
    });
  }

  onItemSelect(selected: any) {
    const currentCity = selected.city;
    this.getProjectsclick(currentCity, selected);
  }

  onOptionSelected(event: any) {
    const selected = event.option.value;
    const currentCity = selected.city;
    this.getProjectsclick(currentCity, selected);

    setTimeout(() => {
      this.myControl.setValue('');
    }, 100);
  }

  getProjectsclick(currentCity: any, selected: any) {
    this.currentCity = currentCity;
    const cityname = currentCity.toLowerCase();

    if (selected.type == 'builder_name') {
      const buildname = selected.name;
      this.searchstring = buildname;
      const buildername = buildname.replace(/\s+/g, '-').toLowerCase();
      const buildid = selected.id;
      this.storage.setItem('BuilderName', buildname);
      this.storage.setItem('BuilderId', buildid);

      this.router.navigate([cityname + '/builder/' + buildername + '-' + buildid]);
      $('#FirstCityModal').modal('hide');
      $('#SecondCityModal').modal('hide');
      $('#filterModal').modal('hide');
    }

    if (selected.type == 'locality_name') {
      const locname = selected.name;
      this.searchstring = locname;
      const localityname = locname.replace(/\s+/g, '-').toLowerCase();
      const newEntry = { LocalityId: selected.id, locality_name: selected.name };
      myValue.next([newEntry]);

      const locid = selected.id;
      this.storage.setItem('LocalityName', locname);
      this.storage.setItem('LocalityId', locid);

      const url = this.router.url;
      if (url?.indexOf('/rent/') > -1) {
      } else if (url?.indexOf('/rental/') > -1) {
      } else if (url?.indexOf('/rentals/') > -1) {
      } else if (url?.indexOf('/buy/') > -1) {
        // this.router.navigate(['/buy/projects-for-sale-in-' + localityname + '-' + cityname + '-' + locid]);
      } else if (url?.indexOf('/projects-in-') > -1) {
        // this.router.navigate(['/buy/projects-for-sale-in-' + localityname + '-' + cityname + '-' + locid]);
      } else {
        $('#FirstCityModal').modal('hide');
        $('#SecondCityModal').modal('hide');
        $('#filterModal').modal('show');
      }
    }

    if (selected.type == 'regions') {
      const zone = selected.name;
      this.searchstring = zone;
      const zonename = zone.replace(/\s+/g, '-').toLowerCase();
      const zoneid = selected.id;
      this.storage.setItem('Zone', zone);
      this.storage.setItem('ZoneId', zoneid);

      this.router.navigate([cityname + '/zone/' + zonename + '-' + zoneid]);
      $('#FirstCityModal').modal('hide');
      $('#SecondCityModal').modal('hide');
      $('#filterModal').modal('hide');
    }

    if (selected.type == 'status') {
      const status = selected.name;
      this.searchstring = status;
      const statusname = status.replace(/\s+/g, '-').toLowerCase();
      const statusid = selected.id;
      this.storage.setItem('Status', status);
      this.storage.setItem('StatusId', statusid);

      this.router.navigate([cityname + '/status/' + statusname + '-' + statusid]);
      $('#FirstCityModal').modal('hide');
      $('#SecondCityModal').modal('hide');
      $('#filterModal').modal('hide');
    }

    if (selected.type == 'PropType') {
      const propertytype = selected.name;
      this.searchstring = propertytype;
      const proptype = propertytype.replace(/\s+/g, '-').toLowerCase();
      const proptypeid = selected.id;
      this.storage.setItem('PropType', propertytype);
      this.storage.setItem('ProptypeId', proptypeid);

      this.router.navigate([cityname + '/sale/' + proptype + '-' + proptypeid]);
      $('#FirstCityModal').modal('hide');
      $('#SecondCityModal').modal('hide');
      $('#filterModal').modal('hide');
    }

    if (selected.type == 'reraId') {
      const reraid = selected.id;
      this.searchstring = reraid;
      this.storage.setItem('ReraID', reraid);

      this.router.navigate([cityname + '/property-sale']);
      $('#FirstCityModal').modal('hide');
      $('#SecondCityModal').modal('hide');
      $('#filterModal').modal('hide');
    }

    if (selected.type == 'property_name') {
      const propname = selected.name;
      this.searchstring = propname;
      const propurlname = propname.replace(/\s+/g, '-').toLowerCase();
      const propid = selected.id;
      const proplocality = selected.locality;
      const locurlname = proplocality.replace(/\s+/g, '-').toLowerCase();
      this.storage.setItem('PropID', propid);
      this.storage.setItem('PropName', propname);
      this.storage.setItem('CityName', currentCity);

      this.router.navigate([]).then(() => {
        window.open('/property/' + cityname + '/' + locurlname + '/' + propurlname + '-' + propid, '_blank');
      });
      $('#FirstCityModal').modal('hide');
      $('#SecondCityModal').modal('hide');
      $('#filterModal').modal('hide');
    }
  }
}