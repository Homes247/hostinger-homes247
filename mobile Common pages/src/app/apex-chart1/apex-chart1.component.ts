import { Component, ElementRef, HostListener, Inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { DataService2 } from '../data.service2';
// import { ApexNonAxisChartSeries, ApexPlotOptions, ApexChart, ApexFill, ChartComponent, ApexStroke} from "ng-apexcharts";
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { LOCAL_STORAGE, WINDOW } from '@ng-toolkit/universal';
import { FormControl, FormGroup } from '@angular/forms';
import {enquiry } from '../prop-details-new/class';
import { CountdownComponent } from 'ngx-countdown';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CityService } from '../city.service';
import { Meta, Title } from '@angular/platform-browser';
import { ApexNonAxisChartSeries, ApexPlotOptions, ApexChart, ApexFill, ChartComponent, ApexStroke} from "ng-apexcharts";
import {ApexAxisChartSeries, ApexTitleSubtitle, ApexDataLabels, ApexMarkers, ApexYAxis, ApexXAxis,ApexTooltip} from "ng-apexcharts";

import {ApexGrid} from "ng-apexcharts";
 

declare var $: any;
declare var swal: any;

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  stroke: ApexStroke;
};

export type ChartOptions4 = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};



// export type ChartOptions = {
//   series: ApexNonAxisChartSeries;
//   chart: ApexChart;
//   labels: string[];
//   plotOptions: ApexPlotOptions;
//   fill: ApexFill;
//   stroke: ApexStroke;
// };

declare var $: any;
@Component({
  selector: 'app-apex-chart1',
  templateUrl: './apex-chart1.component.html',
  styleUrls: ['./apex-chart1.component.css']
})
export class ApexChart1Component implements OnInit {

  public series: ApexAxisChartSeries;
  public chart1: ApexChart;
  public dataLabels: ApexDataLabels;
  public markers: ApexMarkers;
  public title: ApexTitleSubtitle;
  public fill: ApexFill;
  public yaxis: ApexYAxis;
  public xaxis: ApexXAxis;
  public tooltip: ApexTooltip;


  @ViewChild('cd4', { static: false }) private countdown4: CountdownComponent;
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions1: Partial<ChartOptions>;
  public chartOptions2: Partial<ChartOptions>;
  public chartOptions3: Partial<ChartOptions>;
  public chartOptions4: Partial<ChartOptions4>;

  placeName = '';
  routeSub1: any;
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
  reviews: any;
  averagerating: any;
  numbernan = false;
  ratingreviews = true;
  routeSub: Subscription;
  reviewLocality: any;
  localityId :any;
  localityIdTrends :any;
  localityNameTrends :any;
  dataPriceChange: any;

  cityId:any;
  localityList: any;
  localityListTrends: any;
  yearTrends: any;
  localityValue: any;
  RegistrationForm: FormGroup;
  user = new enquiry();
  readyToMoveprojectcount: any;
  newLaunchesprojectcount: any;
  affordableprojectcount: any;
  luxuryprojectcount: any;

  propertyimage = this.Service.imagesURL + 'uploadPropertyImgs/';
  luxuryPropList: any[] = [];
  affordablePropList: any[] = [];
  newNearByLocalityArry = [];
  nearByLocality = [];
  recentlyAddedProp: any[] = [];

  nearByLocalityLen = true;
  nearByLocprop: any;

  testing = [];
  chartMonths = [];

  showChart = true;
  updatedPrice: any;
  projectcount: any;
  localityPropcount: any;
  community:any;
  lifestyle:any;
  currentLocalityName:any;
  currentPropCity:any;
  safety:any;
  averageReviewsLoc :any;
  topnewdivreached = false;
  topnewapiload = true;

  owner = false;
  tanent = false;
  livedBefore = false;
  broker = false;
  other = false;
  reviewAs:any;
  ratingValue1:any;
  ratingValue2:any;
  ratingValue3:any;
  emailLogIn = false;
  reviewbutton: any;
  loginbutton: any;
  forgetPassEmailData = '';
  timeLeft:number = 10;
  interval: any;
  cityname:any;
  chartYear: any;
  propTypeId = '50401';
  Visiblebrochure = false;
  otpValidationComponent: any;
  loadComponent = false;
  currentCity: string;

  constructor( private activatedRoute: ActivatedRoute,  public Service: DataService, public Service2: DataService2,private router: Router, @Inject(LOCAL_STORAGE) private Local_Storage: any,@Inject(WINDOW) private window: Window, public cityservice: CityService,private titleService: Title, private meta: Meta,public location: Location,) {

    this.Service.mouseenterlistenOtp().subscribe((m: any) => {
      if(this.window.location.hash === '#ratingreviewmodal'){
        this.submitReview()
      }
    })
     
     }
  // private routeSub: Subscription;

  ngOnInit(): void {
    this.dataloads();

    this.RegistrationForm = new FormGroup({
      newUserName: new FormControl(''),
      userNumber: new FormControl(''),
      answerData: new FormControl(''),
    });
  }
  
  ReverseMovement = true;
  HideMovement = false
  Apex :any;

  @ViewChild('scrollapiloader') scrollapiloader: ElementRef;
 
  @HostListener('touchstart', ['$event'])
  onTouchLoad() {
    this.Service.mouseenterservice3();
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const elementPosition = this.scrollapiloader.nativeElement.offsetTop;
    const scrollPosition = this.window.pageYOffset;
    if (this.topnewdivreached = scrollPosition >= elementPosition) {
      if (this.topnewapiload == true) {
        this.topnewapiload = false;

      // call Featured Collection api here//


      const limite = 0;
      const limitrows = 6;
      const status = '50307';
      const proptypeid = '50401';
      var param = {
        limit: limite,
        limitrows: limitrows,
        statusid: status,
        proptypeid: proptypeid
        
      };
      this.Service.getprojectscount(this.currentPropCity, param).subscribe(countprojects => {
        let projectcount = countprojects['Counts'];
        this.readyToMoveprojectcount = projectcount[0].PropertyCounts;
      });


      const status1 = '50310,50308';
      var param1 = {
        limit: limite,
        limitrows: limitrows,
        statusid: status1, 
      };
      this.Service.getprojectscount(this.currentPropCity, param1).subscribe(countprojects => {
        let projectcount = countprojects['Counts'];
        this.newLaunchesprojectcount = projectcount[0].PropertyCounts;
      });


     
      var param2 = {
        limit: limite,
        limitrows: limitrows,
        proptypeid: proptypeid,
        minprice: '1',
        maxprice: '6'
      };
      this.Service.getprojectscount(this.currentPropCity, param2).subscribe(countprojects => {
        let projectcount = countprojects['Counts'];
        this.affordableprojectcount = projectcount[0].PropertyCounts;
      });


      var param3 = {
        limit: limite,
        limitrows: limitrows,
        proptypeid: proptypeid,
        minprice: '7',
        maxprice: '24'
      };
      this.Service.getprojectscount(this.currentPropCity, param3).subscribe (countprojects => {
        let projectcount = countprojects['Counts'];
        this.luxuryprojectcount = projectcount[0].PropertyCounts;
      });

      // call Featured Collection api here//
    
    }
  }
  }
  
  cancelSubmitReview(){
    this.reviewLocality = ''
    this.other = false;
      this.owner = false;
      this.tanent = false;
      this.livedBefore = false;
      this.broker = false;
      const radioButton = document.getElementById('timing1') as HTMLInputElement;
      const radioButton1 = document.getElementById('timing2') as HTMLInputElement;
      const radioButton2 = document.getElementById('timing3') as HTMLInputElement;
      const radioButton3 = document.getElementById('timing4') as HTMLInputElement;
      const radioButton4 = document.getElementById('timing5') as HTMLInputElement;

      const radioButton5 = document.getElementById('star1match') as HTMLInputElement;
      const radioButton6 = document.getElementById('starmatch2') as HTMLInputElement;
      const radioButton7 = document.getElementById('starmatch3') as HTMLInputElement;
      const radioButton8 = document.getElementById('starmatch4') as HTMLInputElement;
      const radioButton9 = document.getElementById('starmatch5') as HTMLInputElement;

      const radioButton10 = document.getElementById('overall1') as HTMLInputElement;
      const radioButton11 = document.getElementById('overall2') as HTMLInputElement;
      const radioButton12 = document.getElementById('overall3') as HTMLInputElement;
      const radioButton13 = document.getElementById('overall4') as HTMLInputElement;
      const radioButton14 = document.getElementById('overall5') as HTMLInputElement;

// To unmark the radio button
          radioButton.checked = false;
          radioButton1.checked = false;
          radioButton2.checked = false;
          radioButton3.checked = false;
          radioButton4.checked = false;

          radioButton5.checked = false;
          radioButton6.checked = false;
          radioButton7.checked = false;
          radioButton8.checked = false;
          radioButton9.checked = false;

          radioButton10.checked = false;
          radioButton11.checked = false;
          radioButton12.checked = false;
          radioButton13.checked = false;
          radioButton14.checked = false;
  }


  dataloads() {
    // var localityid = this.router.url.split('-').pop().match(/[0-9]+/);
    var url = this.router.url;
    const inputString = url
      const parts = inputString.split('-');
      const numberValue = parseInt(parts[parts.length - 2]);

      if (numberValue.toString() == "NaN") {
        var locality_id =  url.split('-').pop().match(/[0-9]+/);
        this.localityId = locality_id;
        // 
      } else {
        var cityId =  url.split('-').pop().match(/[0-9]+/);
        this.cityId = cityId;
        var localityid = numberValue;
        this.localityId = localityid;
        this.localityIdTrends = localityid;
      }

    var paramlocality = {
      locid: this.localityId,
    };
    var value = this.cityservice.cityfinder(this.router.url);
    this.currentCity = value.cityname;
    var currentCity = this.currentCity;
    this.cityId = value.cityid;

    this.Service.getlocalitymeta(currentCity, paramlocality).subscribe(metatag => {
      let metatags = metatag['Localityseo'];  //gowshik edit//
      this.currentLocalityName = metatags[0].LocalityName;
      this.currentPropCity = metatags[0].city_name;
      this.luxuryPropDetails()
      this.affordablePropDetails()
      this.nearByrecentlyAddedProp()

     
        this.titleService.setTitle("An Overview of " + this.currentLocalityName + ", " + this.currentPropCity + " City | " + this.currentLocalityName + " Reviews and Photos");
        this.meta.updateTag({
          name: 'description',
          content: "Know all about" + this.currentLocalityName + ", " + this.currentPropCity + ": Check " + this.currentLocalityName + " map, photos, reviews, residential places, schools, & hospitals."
        });
        this.Service.createLinkForCanonicalURL();
   
    })



    this.Service.getNearLocality(this.localityId).subscribe(prop => {
      this.nearByLocality = prop['details'];
      for (let i = 0; i < this.nearByLocality.length; i++) {
        this.newNearByLocalityArry.push(this.nearByLocality[i]['locality'][0]);
      }
      if (this.nearByLocality.length === 0) {
        this.nearByLocalityLen = false;
      } else {
        this.nearByLocalityLen = true;
      }
    });

   


    this.routeSub1 = this.activatedRoute.params.subscribe(params => {
     
      var paramlocalityid = {
        localityId: this.localityId,
      };


      this.Service.getlocalityReview(paramlocalityid).subscribe (response => {
        var checkData = response['locality_review'];
        if (checkData.length == 0 ){
          this.numbernan = true;
        }else{

        
        this.reviews = response['locality_review'];
        this.averageReviewsLoc = response['locality_review_avgper'];
        this.community = Math.round(this.averageReviewsLoc.community * 10) / 10;
        this.lifestyle = Math.round(this.averageReviewsLoc.lifestyle * 10) / 10;
        this.safety = Math.round(this.averageReviewsLoc.safety * 10) / 10;


   
  
        this.reviwcount = this.reviews.length;
       
        if (!this.reviews.length) {
          this.ratingreviews = false;
        } else {
          this.ratingreviews = true;
        }
        const fivestar = '5';
        const fivestarcount = this.reviews.filter((obj) => Math.round(obj.avgrating).toString() === fivestar).length;
        this.fivestarcounts = fivestarcount / this.reviwcount * 100;
        this.FiveStarCountHtml = fivestarcount;

        const fourstar = '4';
        const fourstarcount = this.reviews.filter((obj) => Math.round(obj.avgrating).toString() === fourstar).length;
        this.fourstarcounts = fourstarcount / this.reviwcount * 100
      

        this.FourStarCountHtml = fourstarcount;

        const thirdstar = '3';
        const threestarcount = this.reviews.filter((obj) => Math.round(obj.avgrating).toString() === thirdstar).length;
        this.threestarcounts = threestarcount / this.reviwcount * 100;
        this.threeStarCountHtml = threestarcount;

        const twostar = '2';
        const twostarcount = this.reviews.filter((obj) => Math.round(obj.avgrating).toString() === twostar).length;
        this.twostarcounts = twostarcount / this.reviwcount * 100;
        this.TwoStarCountHtml = twostarcount;

        const onestar = '1';
        const onestarcount = this.reviews.filter((obj) => Math.round(obj.avgrating).toString() === onestar).length;
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

        this.chartOptions1 = {
          series: [this.safety],
          chart: {
            height: 100, width:100,
            type: "radialBar",
            toolbar: {
              show: false
            }
          },
          plotOptions: {
            radialBar: {
              startAngle: -135,
              endAngle: 135,
              hollow: {
                margin: 0,
                size: "70%",
                background: "#fff",
                position: "front",
                dropShadow: {
                  enabled: false,
                  top: 3,
                  left: 0,
                  blur: 4,
                  opacity: 0.24
                }
              },
              track: {
                background: "#ececec",
                strokeWidth: "100%",
                margin: 0, // margin is in pixels
                dropShadow: {
                  enabled: false,
                  top: -3,
                  left: 0,
                  blur: 4,
                  opacity: 0.35
                }
              },
              dataLabels: {
                show: true,
                name: {
                  offsetY: -10,
                  show: false,
                  color: "#971b47",
                  fontSize: "16px"
                },
                value: {
                  offsetY: 5,
                  color: "#971b47",
                  fontSize: "12px",
                  show: true
                }
              }
            }
          },
          fill: {
            type: "solid",
            colors: ["#971b47"]
          },
          stroke: {
            lineCap: "round"
          }
        };
        this.chartOptions2 = {
          series: [this.lifestyle],
          chart: {
            height: 100, width:100,
            type: "radialBar",
            toolbar: {
              show: false
            }
          },
          plotOptions: {
            radialBar: {
              startAngle: -135,
              endAngle: 135,
              hollow: {
                margin: 0,
                size: "70%",
                background: "#fff",
                position: "front",
                dropShadow: {
                  enabled: false,
                  top: 3,
                  left: 0,
                  blur: 4,
                  opacity: 0.24
                }
              },
              track: {
                background: "#ececec",
                strokeWidth: "100%",
                margin: 0, // margin is in pixels
                dropShadow: {
                  enabled: false,
                  top: -3,
                  left: 0,
                  blur: 4,
                  opacity: 0.35
                }
              },
              dataLabels: {
                show: true,
                name: {
                  offsetY: -10,
                  show: false,
                  color: "#971b47",
                  fontSize: "16px"
                },
                value: {
                  offsetY: 5,
                  color: "#971b47",
                  fontSize: "12px",
                  show: true
                }
              }
            }
          },
          fill: {
            type: "solid",
            colors: ["#ececec"]
          },
          stroke: {
            lineCap: "round"
          }
        };
        this.chartOptions3 = {
          series: [this.community],
          chart: {
            height: 100, width:100,
            type: "radialBar",
            toolbar: {
              show: false
            }
          },
          plotOptions: {
            radialBar: {
              startAngle: -135,
              endAngle: 135,
              hollow: {
                margin: 0,
                size: "70%",
                background: "#fff",
                position: "front",
                dropShadow: {
                  enabled: false,
                  top: 3,
                  left: 0,
                  blur: 4,
                  opacity: 0.24
                }
              },
              track: {
                background: "#ececec",
                strokeWidth: "100%",
                margin: 0, // margin is in pixels
                dropShadow: {
                  enabled: false,
                  top: -3,
                  left: 0,
                  blur: 4,
                  opacity: 0.35
                }
              },
              dataLabels: {
                show: true,
                name: {
                  offsetY: -10,
                  show: false,
                  color: "#971b47",
                  fontSize: "16px"
                },
                value: {
                  offsetY: 5,
                  color: "#971b47",
                  fontSize: "12px",
                  show: true
                }
              }
            }
          },
          fill: {
            type: "solid",
            colors: ["#ececec"]
          },
          stroke: {
            lineCap: "round"
          }
        };
      }
      var param = {
        localityname: this.currentLocalityName,
        locality: this.localityIdTrends,
      };
      this.Service.getprojectscount(this.currentPropCity, param).subscribe ((countprojects) => {
        let localityPropcount = countprojects['Counts'];
        this.localityPropcount = localityPropcount[0].PropertyCounts;
      }
      );

      var paramChart = {
        cityId: this.cityId,
        localityId: this.localityIdTrends,
        proptypeId: this.propTypeId,
        year : ''
      };

      this.Service.getlocalityChartData(paramChart).subscribe (response => {
        var years = response['proptype_pricetrends']['years'];
        
      const topYear =  years[0].year
      this.chartYear = topYear

      var paramChart1 = {
        cityId: this.cityId,
        localityId: this.localityIdTrends,
        proptypeId: this.propTypeId,
        year : topYear
      };

      this.Service.getlocalityChartData(paramChart1).subscribe (response => {
        var checkData = response['proptype_pricetrends']['pricetrends'];
        this.dataPriceChange = response['proptype_pricetrends']['pricetrends'];
        this.localityListTrends = response['proptype_pricetrends']['locality'];
        this.yearTrends = response['proptype_pricetrends']['years'];      
      
        if(checkData.length !== 0){
        this.testing = []
        this.chartMonths = []
        this.dataPriceChange = ''

        for (let i = 0; i < checkData.length; i++) {
         var dataPrice =  checkData[i].new_price;
         var priceChange =  checkData[i].price_percentage;
         this.dataPriceChange = priceChange
         this.updatedPrice = dataPrice
          this.testing.push(dataPrice)
        }
        for (let i = 0; i < checkData.length; i++) {
          var dataMonth =  checkData[i].lastupdated
          // const month = dataMonth.split(", ")[0];
          this.chartMonths.push(dataMonth);
        }
        this.chartOptions4 = {
          series: [
            {
              name: "Price / sq ft",
              data: this.testing
            }
          ],
          chart: {
            height: 300,
            type: "line",
            zoom: {
              enabled: true
            }
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: "straight",
            colors:["#5d45db"]
          },
          title: {
            text: "Price Trends",
            align: "left",
            style:{
              fontFamily:"Poppins",
              color:"#971b47"
            }
          },
          
          grid: {
            row: {
              colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
              opacity: 0.5
            }
          },
          xaxis: {
            categories: this.chartMonths
          }
        };
      }else{
        this.showChart = false;
      }
      });
      })   
      });
    });

    var params = {
      cityId: this.cityId,
    };

    this.Service.getlocality(params).subscribe(localitys => {
      this.localityList = localitys['details'];
    });
  }

  onLocalityChange(event) {
    this.localityId = event.target.value;
  }
  onLocalityChange1(event) {

    this.localityIdTrends = event.target.value;
    this.localityNameTrends = event.target.options[event.target.selectedIndex].text;
    var param = {
      localityname: this.localityNameTrends,
      locality: this.localityIdTrends,
    };
    this.Service.getprojectscount(this.cityname, param).subscribe ((countprojects) => {
      let localityPropcount = countprojects['Counts'];
      this.localityPropcount = localityPropcount[0].PropertyCounts;
    }
    );
    

    $('.propCatDiv1').css({
      'box-shadow': '0px 0px 12px 0px rgba(0, 0, 0, 0.08)',
      // 'border': 'none',
    });
    $('.propCatDiv2').css({
      'box-shadow': 'none',
      ' border-bottom': '0.1px solid #72727224',
    });
    $('.propCatDiv3').css({
      'box-shadow': 'none',
      ' border-bottom': '0.1px solid #72727224',
    });
    $('.propCatDiv4').css({
      'box-shadow': 'none',
      ' border-bottom': '0.1px solid #72727224',
    });
    // $('#testing').val()
    var paramChart = {
      cityId: this.cityId,
      localityId: this.localityIdTrends,
      proptypeId: '50401',
      year : this.chartYear
    };

    this.Service.getlocalityChartData(paramChart).subscribe(response => {
      this.yearTrends = response['proptype_pricetrends']['years'];
      const topYear =  this.yearTrends[0].year
      this.chartYear = topYear;

      var paramChart = {
        cityId: this.cityId,
        localityId: this.localityIdTrends,
        proptypeId: '50401',
        year : this.chartYear
      };
  
      this.Service.getlocalityChartData(paramChart).subscribe(response => {
        var checkData = response['proptype_pricetrends']['pricetrends'];
        if(checkData.length !== 0){
          this.showChart = true;
  
        this.testing = []
        this.chartMonths = []
        for (let i = 0; i < checkData.length; i++) {
         var dataPrice =  checkData[i].new_price
          this.updatedPrice = dataPrice
          var priceChange =  checkData[i].price_percentage;
          this.dataPriceChange = priceChange
         
          this.testing.push(dataPrice)
        }
  
        for (let i = 0; i < checkData.length; i++) {
          var dataMonth =  checkData[i].lastupdated;
          this.chartMonths.push(dataMonth);
        }

        this.chartOptions4 = {
          series: [
            {
              name: "Price / sq ft",
              data: this.testing
            }
          ],
          chart: {
            height: 300,
            type: "line",
            zoom: {
              enabled: true
            }
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: "straight",
            colors:["#5d45db"]
          },
          title: {
            text: "Price Trends",
            align: "left",
            style:{
              fontFamily:"Poppins",
              color:"#971b47"
            }
          },
          grid: {
            row: {
              colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
              opacity: 0.5
            }
          },
          xaxis: {
            categories: this.chartMonths
          }
        };
      }else{
        this.showChart = false;
      }
      })
    });
  }

  onYearChange(event){
    // $('.propCatDiv1').css({
    //   'box-shadow': '0px 0px 12px 0px rgba(0, 0, 0, 0.08)',
    //   // 'border': 'none',
    // });
    // $('.propCatDiv2').css({
    //   'box-shadow': 'none',
    //   ' border-bottom': '0.1px solid #72727224',
    // });
    // $('.propCatDiv3').css({
    //   'box-shadow': 'none',
    //   ' border-bottom': '0.1px solid #72727224',
    // });
    // $('.propCatDiv4').css({
    //   'box-shadow': 'none',
    //   ' border-bottom': '0.1px solid #72727224',
    // });

    this.chartYear = event.target.value;

    var paramChart = {
      cityId: this.cityId,
      localityId: this.localityIdTrends,
      proptypeId: this.propTypeId,
      year : this.chartYear
    };

    this.Service.getlocalityChartData(paramChart).subscribe(response => {
      var checkData = response['proptype_pricetrends']['pricetrends'];
      if(checkData.length !== 0){
        this.showChart = true;

      this.testing = []
      this.chartMonths = []
      for (let i = 0; i < checkData.length; i++) {
       var dataPrice =  checkData[i].new_price
        this.updatedPrice = dataPrice
        var priceChange =  checkData[i].price_percentage;
        this.dataPriceChange = priceChange
        this.testing.push(dataPrice)
      }
      for (let i = 0; i < checkData.length; i++) {
        var dataMonth =  checkData[i].lastupdated
        // const month = dataMonth.split(", ")[0];
        this.chartMonths.push(dataMonth);
      }
      this.chartOptions4 = {
        series: [
          {
            name: "Price / sq ft",
            data: this.testing
          }
        ],
        chart: {
          height: 300,
          type: "line",
          zoom: {
            enabled: true
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: "straight",
          colors:["#5d45db"]
        },
        title: {
          text: "Price Trends",
          align: "left",
          style:{
            fontFamily:"Poppins",
            color:"#971b47"
          }
        },
        grid: {
          row: {
            colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
            opacity: 0.5
          }
        },
        xaxis: {
          categories: this.chartMonths
        }
      };
    }else{
      this.showChart = false;
    }
    });
  }

  radialChart2(){
    this.chartOptions2 = {
      series: [this.lifestyle],
      chart: {
        height: 100, width:100,
        type: "radialBar",
        toolbar: {
          show: false
        }
      },
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 135,
          hollow: {
            margin: 0,
            size: "70%",
            background: "#fff",
            position: "front",
            dropShadow: {
              enabled: false,
              top: 3,
              left: 0,
              blur: 4,
              opacity: 0.24
            }
          },
          track: {
            background: "#ececec",
            strokeWidth: "100%",
            margin: 0, // margin is in pixels
            dropShadow: {
              enabled: false,
              top: -3,
              left: 0,
              blur: 4,
              opacity: 0.35
            }
          },
          dataLabels: {
            show: true,
            name: {
              offsetY: -10,
              show: false,
              color: "#971b47",
              fontSize: "16px"
            },
            value: {
              offsetY: 5,
              color: "#971b47",
              fontSize: "14px",
              show: true
            }
          }
        }
      },
      fill: {
        type: "solid",
        colors: ["#971b47"]
      },
      stroke: {
        lineCap: "round"
      }
    };

    this.chartOptions1 = {
      series: [this.safety],
      chart: {
        height: 100, width:100,
        type: "radialBar",
        toolbar: {
          show: false
        }
      },
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 135,
          hollow: {
            margin: 0,
            size: "70%",
            background: "#fff",
            position: "front",
            dropShadow: {
              enabled: false,
              top: 3,
              left: 0,
              blur: 4,
              opacity: 0.24
            }
          },
          track: {
            background: "#ececec",
            strokeWidth: "100%",
            margin: 0, // margin is in pixels
            dropShadow: {
              enabled: false,
              top: -3,
              left: 0,
              blur: 4,
              opacity: 0.35
            }
          },
          dataLabels: {
            show: true,
            name: {
              offsetY: -10,
              show: false,
              color: "#971b47",
              fontSize: "16px"
            },
            value: {
              offsetY: 5,
              color: "#971b47",
              fontSize: "14px",
              show: true
            }
          }
        }
      },
      fill: {
        type: "solid",
        colors: ["#ececec"]
      },
      stroke: {
        lineCap: "round"
      }
    };

    this.chartOptions3 = {
      series: [this.community],
      chart: {
        height: 100, width:100,
        type: "radialBar",
        toolbar: {
          show: false
        }
      },
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 135,
          hollow: {
            margin: 0,
            size: "70%",
            background: "#fff",
            position: "front",
            dropShadow: {
              enabled: false,
              top: 3,
              left: 0,
              blur: 4,
              opacity: 0.24
            }
          },
          track: {
            background: "#ececec",
            strokeWidth: "100%",
            margin: 0, // margin is in pixels
            dropShadow: {
              enabled: false,
              top: -3,
              left: 0,
              blur: 4,
              opacity: 0.35
            }
          },
          dataLabels: {
            show: true,
            name: {
              offsetY: -10,
              show: false,
              color: "#971b47",
              fontSize: "16px"
            },
            value: {
              offsetY: 5,
              color: "#971b47",
              fontSize: "14px",
              show: true
            }
          }
        }
      },
      fill: {
        type: "solid",
        colors: ["#ececec"]
      },
      stroke: {
        lineCap: "round"
      }
    };
  }

  radialChart3(){
    this.chartOptions2 = {
      series: [this.lifestyle],
      chart: {
        height: 100, width:100,
        type: "radialBar",
        toolbar: {
          show: false
        }
      },
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 135,
          hollow: {
            margin: 0,
            size: "70%",
            background: "#fff",
            position: "front",
            dropShadow: {
              enabled: false,
              top: 3,
              left: 0,
              blur: 4,
              opacity: 0.24
            }
          },
          track: {
            background: "#ececec",
            strokeWidth: "100%",
            margin: 0, // margin is in pixels
            dropShadow: {
              enabled: false,
              top: -3,
              left: 0,
              blur: 4,
              opacity: 0.35
            }
          },
          dataLabels: {
            show: true,
            name: {
              offsetY: -10,
              show: false,
              color: "#971b47",
              fontSize: "16px"
            },
            value: {
              offsetY: 5,
              color: "#971b47",
              fontSize: "14px",
              show: true
            }
          }
        }
      },
      fill: {
        type: "solid",
        colors: ["#ececec"]
      },
      stroke: {
        lineCap: "round"
      }
    };

    this.chartOptions1 = {
      series: [this.safety],
      chart: {
        height: 100, width:100,
        type: "radialBar",
        toolbar: {
          show: false
        }
      },
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 135,
          hollow: {
            margin: 0,
            size: "70%",
            background: "#fff",
            position: "front",
            dropShadow: {
              enabled: false,
              top: 3,
              left: 0,
              blur: 4,
              opacity: 0.24
            }
          },
          track: {
            background: "#ececec",
            strokeWidth: "100%",
            margin: 0, // margin is in pixels
            dropShadow: {
              enabled: false,
              top: -3,
              left: 0,
              blur: 4,
              opacity: 0.35
            }
          },
          dataLabels: {
            show: true,
            name: {
              offsetY: -10,
              show: false,
              color: "#971b47",
              fontSize: "16px"
            },
            value: {
              offsetY: 5,
              color: "#971b47",
              fontSize: "14px",
              show: true
            }
          }
        }
      },
      fill: {
        type: "solid",
        colors: ["#ececec"]
      },
      stroke: {
        lineCap: "round"
      }
    };

    this.chartOptions3 = {
      series: [this.community],
      chart: {
        height: 100, width:100,
        type: "radialBar",
        toolbar: {
          show: false
        }
      },
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 135,
          hollow: {
            margin: 0,
            size: "70%",
            background: "#fff",
            position: "front",
            dropShadow: {
              enabled: false,
              top: 3,
              left: 0,
              blur: 4,
              opacity: 0.24
            }
          },
          track: {
            background: "#ececec",
            strokeWidth: "100%",
            margin: 0, // margin is in pixels
            dropShadow: {
              enabled: false,
              top: -3,
              left: 0,
              blur: 4,
              opacity: 0.35
            }
          },
          dataLabels: {
            show: true,
            name: {
              offsetY: -10,
              show: false,
              color: "#971b47",
              fontSize: "16px"
            },
            value: {
              offsetY: 5,
              color: "#971b47",
              fontSize: "14px",
              show: true
            }
          }
        }
      },
      fill: {
        type: "solid",
        colors: ["#971b47"]
      },
      stroke: {
        lineCap: "round"
      }
    };
  }

  radialChart1(){
    this.chartOptions2 = {
      series: [this.lifestyle],
      chart: {
        height: 100, width:100,
        type: "radialBar",
        toolbar: {
          show: false
        }
      },
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 135,
          hollow: {
            margin: 0,
            size: "70%",
            background: "#fff",
            position: "front",
            dropShadow: {
              enabled: false,
              top: 3,
              left: 0,
              blur: 4,
              opacity: 0.24
            }
          },
          track: {
            background: "#ececec",
            strokeWidth: "100%",
            margin: 0, // margin is in pixels
            dropShadow: {
              enabled: false,
              top: -3,
              left: 0,
              blur: 4,
              opacity: 0.35
            }
          },
          dataLabels: {
            show: true,
            name: {
              offsetY: -10,
              show: false,
              color: "#971b47",
              fontSize: "16px"
            },
            value: {
              offsetY: 5,
              color: "#971b47",
              fontSize: "14px",
              show: true
            }
          }
        }
      },
      fill: {
        type: "solid",
        colors: ["#ececec"]
      },
      stroke: {
        lineCap: "round"
      }
    };

    this.chartOptions1 = {
      series: [this.safety],
      chart: {
        height: 100, width:100,
        type: "radialBar",
        toolbar: {
          show: false
        }
      },
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 135,
          hollow: {
            margin: 0,
            size: "70%",
            background: "#fff",
            position: "front",
            dropShadow: {
              enabled: false,
              top: 3,
              left: 0,
              blur: 4,
              opacity: 0.24
            }
          },
          track: {
            background: "#ececec",
            strokeWidth: "100%",
            margin: 0, // margin is in pixels
            dropShadow: {
              enabled: false,
              top: -3,
              left: 0,
              blur: 4,
              opacity: 0.35
            }
          },
          dataLabels: {
            show: true,
            name: {
              offsetY: -10,
              show: false,
              color: "#971b47",
              fontSize: "16px"
            },
            value: {
              offsetY: 5,
              color: "#971b47",
              fontSize: "14px",
              show: true
            }
          }
        }
      },
      fill: {
        type: "solid",
        colors: ["#971b47"]
      },
      stroke: {
        lineCap: "round"
      }
    };

    this.chartOptions3 = {
      series: [this.community],
      chart: {
        height: 100, width:100,
        type: "radialBar",
        toolbar: {
          show: false
        }
      },
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 135,
          hollow: {
            margin: 0,
            size: "70%",
            background: "#fff",
            position: "front",
            dropShadow: {
              enabled: false,
              top: 3,
              left: 0,
              blur: 4,
              opacity: 0.24
            }
          },
          track: {
            background: "#ececec",
            strokeWidth: "100%",
            margin: 0, // margin is in pixels
            dropShadow: {
              enabled: false,
              top: -3,
              left: 0,
              blur: 4,
              opacity: 0.35
            }
          },
          dataLabels: {
            show: true,
            name: {
              offsetY: -10,
              show: false,
              color: "#971b47",
              fontSize: "16px"
            },
            value: {
              offsetY: 5,
              color: "#971b47",
              fontSize: "14px",
              show: true
            }
          }
        }
      },
      fill: {
        type: "solid",
        colors: ["#ececec"]
      },
      stroke: {
        lineCap: "round"
      }
    };
  }

  //  question and answer
  Tenant() {
    if (this.tanent === false) {
      this.tanent = true;
      this.owner = false;
      this.livedBefore = false;
      this.broker = false;
      this.other = false;
      this.reviewAs = '2'
    } else if (this.tanent === true) {
      this.tanent = false;
      this.reviewAs = undefined;
      this.owner = false;
      this.livedBefore = false;
      this.broker = false;
      this.other = false;
    }
  }

  Broker() {
    if (this.broker === false) {
      this.broker = true;
      this.owner = false;
      this.tanent = false;
      this.livedBefore = false;
      this.other = false;
      this.reviewAs = '3'
    } else if (this.broker === true) {
      this.broker = false;
      this.reviewAs = undefined;
      this.owner = false;
      this.tanent = false;
      this.livedBefore = false;
      this.other = false;
    }
  }

  LivedBefore() {
    if (this.livedBefore === false) {
      this.livedBefore = true;
      this.owner = false;
      this.tanent = false;
      this.broker = false;
      this.other = false;
      this.reviewAs = '4'
    } else if (this.livedBefore === true) {
      this.livedBefore = false;
      this.reviewAs = undefined;
      this.owner = false;
      this.tanent = false;
      this.broker = false;
      this.other = false;
    }
  }

  Owner() {
    if (this.owner === false) {
      this.owner = true;
      this.tanent = false;
      this.livedBefore = false;
      this.broker = false;
      this.other = false;
      this.reviewAs = '1'
      
    } else if (this.owner === true) {
      this.owner = false;
      this.reviewAs = undefined;
      this.tanent = false;
      this.livedBefore = false;
      this.broker = false;
      this.other = false;
    }
  }

  onOther() {
    if (this.other === false) {
      this.other = true;
      this.owner = false;
      this.tanent = false;
      this.livedBefore = false;
      this.broker = false;
      this.reviewAs = '5'
    } else if (this.other === true) {
      this.other = false;
      this.reviewAs = undefined;
      this.owner = false;
      this.tanent = false;
      this.livedBefore = false;
      this.broker = false;
    }
  }
 
  submitReview() {
    this.ratingValue1 = $('#safety input:radio:checked').val();
   this.ratingValue2 = $('#lifestyle input:radio:checked').val();
   this.ratingValue3 = $('#community input:radio:checked').val();
    
    // this.ratingValue = $('#ratingSection input:radio:checked').val();
    var userID = this.Local_Storage.getItem('userID');
    var userName = this.Local_Storage.getItem('userName');
  
    var param = {
      
      cityId :this.cityId,
      localityId : this.localityId,
      userId : userID,
      userName: userName,
      reviewAs :this.reviewAs,
      safety :this.ratingValue1,
      lifestyle :this.ratingValue2,
      community : this.ratingValue3,
      reviewContent : this.reviewLocality
    };
    if (this.reviewLocality === '' || this.reviewLocality === undefined) {
      swal({
        title: 'Please Rate & Review this Locality',
        type: 'error',
        showConfirmButton: false,
        timer: 1500
      });
    } 
    else if (this.reviewAs == undefined ) {
      swal({
        title: 'Please Select Reviewer Category',
        type: 'error',
        showConfirmButton: false,
        timer: 1500
      });
    }
    else if (this.ratingValue1 == undefined) {
      swal({
        title: 'Please Give All Star Rating',
        type: 'error',
        showConfirmButton: false,
        timer: 1500
      });
    } 
    else if (this.ratingValue2 == undefined ) {
      swal({
        title: 'Please Give All Star Rating',
        type: 'error',
        showConfirmButton: false,
        timer: 1500
      });
    } 
    else if (this.ratingValue3 == undefined ) {
      swal({
        title: 'Please Give All Star Rating',
        type: 'error',
        showConfirmButton: false,
        timer: 1500
      });
    } 
    
    else {
      var loginId = this.Local_Storage.getItem('loginID');
      if (loginId === '1') {
        this.Service.addLocalityreview(param).subscribe(success => {
          if (success['status'] === 'True') {
            swal({
              title: 'Successfully Submitted',
              text: 'Your Comment and Review is under Moderation! We will notify you when Comment is Active.',
              type: 'success',
              showConfirmButton: false,
              timer: 1500
            });
            document.getElementById('exampleModal').style.display = 'none';
            $('body').removeClass('modal-open');
            $('.modal-backdrop').removeClass('modal-backdrop fade show');
            this.reviewLocality = '';
            this.ratingValue1 = '';
            this.ratingValue2 = '';
            this.ratingValue3 = '';
            $('#exampleModal').modal('hide');
            window.location.hash = '';
            // this.cancel.nativeElement.click();
            this.reviewLocality = ''
            this.other = false;
              this.owner = false;
              this.tanent = false;
              this.livedBefore = false;
              this.broker = false;
              const radioButton = document.getElementById('timing1') as HTMLInputElement;
              const radioButton1 = document.getElementById('timing2') as HTMLInputElement;
              const radioButton2 = document.getElementById('timing3') as HTMLInputElement;
              const radioButton3 = document.getElementById('timing4') as HTMLInputElement;
              const radioButton4 = document.getElementById('timing5') as HTMLInputElement;
        
              const radioButton5 = document.getElementById('star1match') as HTMLInputElement;
              const radioButton6 = document.getElementById('starmatch2') as HTMLInputElement;
              const radioButton7 = document.getElementById('starmatch3') as HTMLInputElement;
              const radioButton8 = document.getElementById('starmatch4') as HTMLInputElement;
              const radioButton9 = document.getElementById('starmatch5') as HTMLInputElement;
        
              const radioButton10 = document.getElementById('overall1') as HTMLInputElement;
              const radioButton11 = document.getElementById('overall2') as HTMLInputElement;
              const radioButton12 = document.getElementById('overall3') as HTMLInputElement;
              const radioButton13 = document.getElementById('overall4') as HTMLInputElement;
              const radioButton14 = document.getElementById('overall5') as HTMLInputElement;
        
        // To unmark the radio button
                  radioButton.checked = false;
                  radioButton1.checked = false;
                  radioButton2.checked = false;
                  radioButton3.checked = false;
                  radioButton4.checked = false;
        
                  radioButton5.checked = false;
                  radioButton6.checked = false;
                  radioButton7.checked = false;
                  radioButton8.checked = false;
                  radioButton9.checked = false;
        
                  radioButton10.checked = false;
                  radioButton11.checked = false;
                  radioButton12.checked = false;
                  radioButton13.checked = false;
                  radioButton14.checked = false;
          } else {
            swal({
              title: 'Something Went Wrong',
              type: 'error',
              showConfirmButton: false,
              timer: 1500
            });
          }
        });
      } else {
        window.location.hash = 'ratingreviewmodal';
    $('#otpValidate').css('display','block')
    if(this.loadComponent == false){
      this.loadComponent = true;
      import('../otp-validation/otp-validation.module').then(mod => mod.OtpValidationModule).then(OtpValidationModule =>{
        this.otpValidationComponent = OtpValidationModule.components['lazy'];
      this.Visiblebrochure = this.Visiblebrochure ? false : true;
      $('.modal-login').css('z-index', '1')
      });
    }
        
     
        
      }
    }
  }



  

  config = {
    allowNumbersOnly: false,
    length: 4,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      'width': '50px',
      'height': '50px'
    }
  };
  countdownconfig = {
    leftTime: 30,
    demand: true
  };


  logincheck() {
    if ('loginID' in this.Local_Storage) {
      this.reviewbutton = true;
      this.loginbutton = false;
    } else {
      this.reviewbutton = false;
      this.loginbutton = true;
    }
  }
  numberLogIn = true;
  otpValidating = false;
  forgetPasswordLogin = false;
  createAccount = false;


  backbutton() {
    this.emailLogIn = false;
    this.numberLogIn = true;
    this.otpValidating = false;
    this.forgetPasswordLogin = false;
    this.createAccount = false;
  }

  backbuttonforgetPassword() {
    this.emailLogIn = true;
    this.numberLogIn = false;
    this.otpValidating = false;
    this.forgetPasswordLogin = false;
    this.createAccount = false;
  }

  onforgetPasswordLogin() {
    this.emailLogIn = false;
    this.numberLogIn = false;
    this.otpValidating = false;
    this.forgetPasswordLogin = true;
  }

  onCreateAccount() {
    this.emailLogIn = false;
    this.numberLogIn = false;
    this.otpValidating = false;
    this.forgetPasswordLogin = false;
    this.createAccount = true;
  }

  loginclose() {
    this.window.location.hash = '';
  }

  forgetPassword() {
    if ($('#forgetPassEmail').val() === '') {
      $('#forgetPassEmail').focus().css('border-color', 'red').attr('placeholder', 'Please Enter email');
      return false;
    } else {
      let eforgetPassEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if (eforgetPassEmail.test($('#forgetPassEmail').val())) {
        $('#forgetPassEmail').removeAttr('style');
      } else {
        $('#forgetPassEmail').focus().css('border-color', 'red').attr('placeholder', 'Please enter valid email').val('');
        return false;
      }
    }
    this.Service.forgetPasswordRequest(this.RegistrationForm.value.forgetPassEmailData).subscribe(responce => {
      if (responce['status'] === 'True') {
        swal({
          title: 'Reset Password',
          text: 'Reset password link as be sent to your email please check your email.',
          type: 'success',
          showConfirmButton: false,
          timer: 2000
        });
        // $('#myModal').modal('hide');
        this.backbutton();
        document.getElementById('id01').style.display = 'none';
      } else {
        swal({
          title: 'Reset Password',
          text: 'Your email not registerd with us please enter valid email.',
          type: 'error',
          showConfirmButton: false,
          timer: 2000
        });
      }
    });
  }

  otploader = false;

  otpBasedLogin() {
    if ($('#emobileLogin').val() === '') {
      $('#emobileLogin').focus().css('border-color', 'red').attr('placeholder', 'Please Enter Phone Number');
      return false;
    } else {
      var emobileno = /^[0-9]{10}$/;
      if (emobileno.test($('#emobileLogin').val())) {
        $('#emobileLogin').removeAttr('style');
      } else {
        $('#emobileLogin').focus().css('border-color', 'red').attr('placeholder', 'Please enter valid contact number').val('');
        return false;
      }
    }
    var param = this.user;
    
    
    this.otploader = true;
    this.Service.otpsend(param).subscribe((success) => {
    var prestatus = success['messages'][0].status;
      // var status = prestatus[0].MessageErrorDescription;
      this.otploader = false;
      if (prestatus == 'ENQUEUED') {
        this.emailLogIn = false;
        this.numberLogIn = false;
        this.otpValidating = true;
        this.countdown4.begin();
        var buttonId = $('#one').attr('id');
        this.otploader = false;
      } else {
        swal({
          title: 'Oops Something Error!',
          type: 'error',
          showConfirmButton: false,
          timer: 1500
        });
        this.otploader = false;
      }
    }, (err) => {
      // 
    });
  }



  otpvalidate4() {
    var otplength = 4;
    this.otploader = true;
    if ($('#otp').val() == '') {
      swal({
        title: 'Please enter the OTP!',
        type: 'error',
        showConfirmButton: false,
        timer: 1000
      });
      return false;
    } else {
      var liveotpcount = $('#otp').val().length;
      if (liveotpcount < otplength) {
        swal({
          title: 'Please enter the valid OTP!',
          type: 'warning',
          showConfirmButton: false,
          timer: 1500
        });
        return false;
      } else {
      }
    }
    var param = this.user;
    this.Service.otpvalidcheck(param).subscribe((success) => {
      var status = success['status'];
      if (status == 'True') {
        this.otpUserLoginNewAPI();
        this.countdown4.restart();
      } else {
        swal({
          title: 'Oops Something Error!',
          text: 'Its Not a valid OTP / OTP Expired!',
          type: 'error',
          showConfirmButton: false,
          timer: 1500
        });
      }
    }, (err) => {
      // 
    });
  }
  userDetails = [];

  UserName;
  UserId;
  UserEmail;
  UserNumber;

  username = '';
  lastname = '';
  userRegEmail = '';
  userNumber = '';
  CreatPassword = '';
  ReTypePassword = '';
  otpexpired = false;
  loginEmail = '';
  loginPassword = '';



  
  startTimer() {
    this.timeLeft = 10;
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.otpexpired = true;
      }
    }, 1000);
  }

  onLogin() {
    if ($('#email1').val() === '') {
      $('#email1').focus().css('border-color', 'red').attr('placeholder', 'Please Enter email');
      return false;
    } else {
      let enameFilter = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if (enameFilter.test($('#email1').val())) {
        $('#email1').removeAttr('style');
      } else {
        $('#email1').focus().css('border-color', 'red').attr('placeholder', 'Please enter valid email').val('');
        return false;
      }
    }

    if ($('#password').val() === '') {
      $('#password').focus().css('border-color', 'red').attr('placeholder', 'Please Enter password');
      return false;
    } else {
      let emobileno = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{5,10}$/;
      if (emobileno.test($('#password').val())) {
        $('#password').removeAttr('style');
      } else {
        $('#password').focus().css('border-color', 'red').attr('placeholder', 'Please enter valid password').val('');
        return false;
      }
    }
    const param = {
      loginEmail: this.RegistrationForm.value.loginEmail,
      loginPassword: this.RegistrationForm.value.loginPassword
    };
    this.Service.userLogin(param).subscribe(responce => {
      if (responce['status'] === 'True') {
        document.getElementById('id01').style.display = 'none';
        this.Local_Storage.setItem('loginID', '1');
        swal({
          title: 'Login successfully',
          text: '',
          type: 'success',
          showConfirmButton: false,
          timer: 2000
        });
        this.logincheck();
        this.RegistrationForm.controls.loginEmail.setValue('');
        this.RegistrationForm.controls.loginPassword.setValue('');
        // window.history.back();
        this.userDetails = responce['details'];
        if (typeof (Storage) !== 'undefined') {
          // Store
          this.Local_Storage.setItem('userName', this.userDetails[0]['user_name']);
          this.Local_Storage.setItem('userID', this.userDetails[0]['reg_IDPK']);
          this.Local_Storage.setItem('userEmail', this.userDetails[0]['user_email']);
          this.Local_Storage.setItem('userNumber', this.userDetails[0]['number']);
          // Retrieve
          this.UserName = this.Local_Storage.getItem('userName');
          this.UserId = this.Local_Storage.getItem('userID');
          this.UserEmail = this.Local_Storage.getItem('userEmail');
          this.UserNumber = this.Local_Storage.getItem('userNumber');
        } else {
          document.getElementById('result').innerHTML = 'Sorry, your browser does not support Web Storage...';
        }
      } else {
        swal({
          title: 'Email and Password are Not Valid !',
          type: 'error',
          showConfirmButton: false,
          timer: 2000
        });
      }
    });
  }


  otpUserLoginNewAPI() {
    if (this.user.name === undefined) {
      this.user.name = 'Guest User';
      var param = this.user;
    } else {
      var param = this.user;
    }
    this.Service.userLoginWithOtpNewAPI(param).subscribe(responce => {
      if (responce['status'] === 'True') {
        this.numberLogIn = true;
        this.otpValidating = false;
        this.otploader = false;
        document.getElementById('id01').style.display = 'none';
        this.Local_Storage.setItem('loginID', '1');
        swal({
          title: 'Login successfully',
          text: '',
          type: 'success',
          showConfirmButton: false,
          timer: 2000
        });
        this.userDetails = responce['UserDetails'];
        var userName = this.userDetails[0]['user_name'];
        var userID = this.userDetails[0]['reg_IDPK'];

        if (this.window.location.hash === '#ratingreviewmodal') {
       
         
          var loginId = this.Local_Storage.getItem('loginID');
          if (loginId === '1') {
            var param = {
      
              cityId :this.cityId,
              localityId : this.localityId,
              userId : userID,
              userName: userName,
              reviewAs :this.reviewAs,
              safety :this.ratingValue1,
              lifestyle :this.ratingValue2,
              community : this.ratingValue3,
              reviewContent : this.reviewLocality
            };
            this.Service.addLocalityreview(param).subscribe(success => {
              if (success['status'] === 'True') {
                swal({
                  title: 'Successfully Submitted',
                  text: 'Your Comment and Review is under Moderation! We will notify you when Comment is Active.',
                  type: 'success',
                  showConfirmButton: false,
                  timer: 1500
                });
                document.getElementById('exampleModal').style.display = 'none';
                $('body').removeClass('modal-open');
                $('.modal-backdrop').removeClass('modal-backdrop fade show');
                this.reviewLocality = '';
                this.ratingValue1 = '';
                this.ratingValue2 = '';
                this.ratingValue3 = '';
                this.owner = false;
                this.tanent = false;
                this.livedBefore = false;
                this.broker = false;
                this.other = false;
                $('#exampleModal').modal('hide');
                // this.cancel.nativeElement.click();

                 this.reviewLocality = ''
    this.other = false;
      this.owner = false;
      this.tanent = false;
      this.livedBefore = false;
      this.broker = false;
      const radioButton = document.getElementById('timing1') as HTMLInputElement;
      const radioButton1 = document.getElementById('timing2') as HTMLInputElement;
      const radioButton2 = document.getElementById('timing3') as HTMLInputElement;
      const radioButton3 = document.getElementById('timing4') as HTMLInputElement;
      const radioButton4 = document.getElementById('timing5') as HTMLInputElement;

      const radioButton5 = document.getElementById('star1match') as HTMLInputElement;
      const radioButton6 = document.getElementById('starmatch2') as HTMLInputElement;
      const radioButton7 = document.getElementById('starmatch3') as HTMLInputElement;
      const radioButton8 = document.getElementById('starmatch4') as HTMLInputElement;
      const radioButton9 = document.getElementById('starmatch5') as HTMLInputElement;

      const radioButton10 = document.getElementById('overall1') as HTMLInputElement;
      const radioButton11 = document.getElementById('overall2') as HTMLInputElement;
      const radioButton12 = document.getElementById('overall3') as HTMLInputElement;
      const radioButton13 = document.getElementById('overall4') as HTMLInputElement;
      const radioButton14 = document.getElementById('overall5') as HTMLInputElement;

// To unmark the radio button
          radioButton.checked = false;
          radioButton1.checked = false;
          radioButton2.checked = false;
          radioButton3.checked = false;
          radioButton4.checked = false;

          radioButton5.checked = false;
          radioButton6.checked = false;
          radioButton7.checked = false;
          radioButton8.checked = false;
          radioButton9.checked = false;

          radioButton10.checked = false;
          radioButton11.checked = false;
          radioButton12.checked = false;
          radioButton13.checked = false;
          radioButton14.checked = false;
              } else {
                swal({
                  title: 'Something Went Wrong',
                  type: 'error',
                  showConfirmButton: false,
                  timer: 1500
                });
              }
            });
          } else {
            window.location.hash = 'ratingreviewmodal';
            document.getElementById('id01').style.display = 'block';
          }
          
        }
        this.logincheck();
        // window.history.back();
        this.userDetails = responce['UserDetails'];
        if (typeof (Storage) !== 'undefined') {
          // Store
          this.Local_Storage.setItem('userName', this.userDetails[0]['user_name']);
          this.Local_Storage.setItem('userID', this.userDetails[0]['reg_IDPK']);
          this.Local_Storage.setItem('userEmail', this.userDetails[0]['user_email']);
          this.Local_Storage.setItem('userNumber', this.userDetails[0]['number']);
          // Retrieve
          this.UserName = this.Local_Storage.getItem('userName');
          this.UserId = this.Local_Storage.getItem('userID');
          this.UserEmail = this.Local_Storage.getItem('userEmail');
          this.UserNumber = this.Local_Storage.getItem('userNumber');
         
          // if ('SeenPropertyID' in this.Local_Storage) {
          //   this.seenproparr = JSON.parse(this.Local_Storage.getItem('SeenPropertyID'));
          //   const userid = this.Local_Storage.getItem('userID');
          //   var paramS = {
          //     userid: userid,
          //     propid: this.seenproparr
          //   };
          //   this.Service.addUserSeenProjects(paramS).subscribe(response => {
          //     if (response['status'] === 'True') {
          //       this.Local_Storage.setItem('SeenPropertyID', '[]');
          //     } else {
          //     }
          //   });
          // }

          // if ('propertyID' in this.Local_Storage) {
          //   this.storagearr = JSON.parse(this.Local_Storage.getItem('propertyID'));
          //   const userid = this.Local_Storage.getItem('userID');
          //   var param2 = {
          //     userid: userid,
          //     propid: this.storagearr
          //   };
          //   this.Service.addfavaourite(param2).subscribe(response => {
          //     if (response['status'] === 'True') {
          //       this.Local_Storage.setItem('propertyID', '[]');
          //     } else {
          //     }
          //   });
          // } else {
          // }
        } else {
          document.getElementById('result').innerHTML = 'Sorry, your browser does not support Web Storage...';
        }
      } else {
      }
    });
  }

  otpsend() {
    if ($('#ename').val() == '') {
      $('#ename').focus().css('border-color', 'red').attr('placeholder', 'Please Enter Name');
      return false;
    } else {
      var enameFilter = /^([a-zA-Z]+\s)*[a-zA-Z]+$/;
      if (enameFilter.test($('#ename').val())) {
        $('#ename').removeAttr('style');
      } else {
        $('#ename').focus().css('border-color', 'red').attr('placeholder', 'Please enter valid name').val('');
        return false;
      }
    }

    if ($('#email').val() == '') {
      $('#email').focus().css('border-color', 'red').attr('placeholder', 'Please Enter Email-id');
      return false;
    } else {
      var emaill = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
      if (emaill.test($('#email').val())) {
        $('#email').removeAttr('style');
      } else {
        $('#email').focus().css('border-color', 'red').attr('placeholder', 'Please enter valid email-id').val('');
        return false;
      }
    }

    if ($('#emobile').val() == '') {
      $('#emobile').focus().css('border-color', 'red').attr('placeholder', 'Please Enter Phone Number');
      return false;
    } else {
      var mobilee = /^[0-9]{10}$/;
      if (mobilee.test($('#emobile').val())) {
        $('#emobile').removeAttr('style');
      } else {
        $('#emobile').focus().css('border-color', 'red').attr('placeholder', 'Please enter valid contact number').val('');
        return false;
      }
    }

    this.otploader = true;
    $('body').addClass('bodyoverlay');
  }

  goback() {
    $('#modal-container').addClass('out');
    $('body').removeClass('modal-active');
  }

  onOtpChange(otp) {
    var param = this.user;
    param.otp = otp;
  }

  luxuryPropDetails() {
   
   
    this.cityname = this.currentPropCity.replace('-', ' ');
    const limite = 0;
    const limitrows = 10;
    const min = 13;
    const max = 24;
    let param = {
      limit: limite,
      limitrows: limitrows,
      locality: this.localityId,
      minprice: min,
      maxprice: max,
    };
    this.Service.getCity(this.cityname, param).subscribe((response) => {
      const propertylists = response['deatils'];
      this.luxuryPropList = propertylists;
    });
  }

  affordablePropDetails() {
  
    this.cityname = this.currentPropCity.replace('-', ' ')
    const limite = 0;
    const limitrows = 10;
    const min = 6;
    const max = 9;
    let param = {
      limit: limite,
      limitrows: limitrows,
      locality: this.localityId,
      minprice: min,
      maxprice: max,
    };
    this.Service.getCity(this.cityname, param).subscribe((response) => {
      const propertylists = response['deatils'];
      this.affordablePropList = propertylists;
    });

    this.Service.getnearByLocProp(this.localityId).subscribe((response) => {
      const nearBylocProp = response['moreprojects'];
      this.nearByLocprop = nearBylocProp;
    });
  }

  nearByrecentlyAddedProp() {
    this.Service.getnearByRecentlyAddedProp(this.localityId).subscribe(
      (response) => {
        const recentlyAddedProp = response['recentprojects'];
        this.recentlyAddedProp = recentlyAddedProp;
      }
    );
  }


  customOptionsAffordableProjects: OwlOptions = {
    mouseDrag: true,
    loop: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    autoplay: true,
    autoplaySpeed: 300,
    nav: true,
    navText: ['<img src=https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_mobile/images/mini_banner_left_arrow.png alt=\'LeftArrow\' class=\'prop_details_owl owl-nav owl-prev main_move_left\'>',
      '<img src=https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_mobile/images/mini_banner_right_arrow.png alt=\'RightArrow\' class=\'prop_details_owl owl-nav owl-next main_move_right\'>'],
    responsive: {
      0: {
        items:3
      },
      400: {
        items: 3
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },

  };

  customOptionsLocality: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    autoplay: false,
    autoplaySpeed: 300,
    nav: true,
    navText: ['<img src=https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_mobile/images/mini_banner_left_arrow.png alt=\'LeftArrow\' class=\'locality_review owl-nav owl-prev main_move_left\'>',
    '<img src=https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_mobile/images/mini_banner_right_arrow.png alt=\'RightArrow\' class=\'locality_review owl-nav owl-next main_move_right\'>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 5
      },
      740: {
        items: 5
      },
      940: {
        items: 5
      }
    },
  };

  customOptionsLocality1: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    autoplay: false,
    autoplaySpeed: 300,
    nav: false,
    navText: ['<img src=https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_mobile/images/mini_banner_left_arrow.png alt=\'LeftArrow\' class=\'prop_details_owl owl-nav owl-prev main_move_left_Locality\'>',
      '<img src=https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_mobile/images/mini_banner_right_arrow.png alt=\'RightArrow\' class=\'prop_details_owl owl-nav owl-next main_move_right_Locality\'>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 3
      },
      740: {
        items: 3
      },
      940: {
        items: 3
      }
    },
  };


  Apartment(){

    $('.propCatDiv1').css({
      'box-shadow': '0px 0px 12px 0px rgba(0, 0, 0, 0.08)',
      // 'border': 'none',
    });
    $('.propCatDiv2').css({
      'box-shadow': 'none',
      ' border-bottom': '0.1px solid #72727224',
    });
    $('.propCatDiv3').css({
      'box-shadow': 'none',
      ' border-bottom': '0.1px solid #72727224',
    });
    $('.propCatDiv4').css({
      'box-shadow': 'none',
      ' border-bottom': '0.1px solid #72727224',
    });

    this.propTypeId = '50401'
  
    var paramChart = {
      cityId: this.cityId,
      localityId: this.localityIdTrends,
      proptypeId: this.propTypeId,
      year : this.chartYear
    };

    this.Service.getlocalityChartData(paramChart).subscribe(response => {
      var checkData = response['proptype_pricetrends']['pricetrends'];
      this.yearTrends = response['proptype_pricetrends']['years'];
      if(checkData.length !== 0){
        this.showChart = true;

      this.testing = []
      this.chartMonths = []
      for (let i = 0; i < checkData.length; i++) {
       var dataPrice =  checkData[i].new_price
        this.updatedPrice = dataPrice
        var priceChange =  checkData[i].price_percentage;
        this.dataPriceChange = priceChange
       
        this.testing.push(dataPrice)
      }

      for (let i = 0; i < checkData.length; i++) {
        var dataMonth =  checkData[i].lastupdated
        // const month = dataMonth.split(", ")[0];
        this.chartMonths.push(dataMonth);
      }

   
      

      this.chartOptions4 = {
        series: [
          {
            name: "Price / sq ft",
            data: this.testing
          }
        ],
        chart: {
          height: 300,
          type: "line",
          zoom: {
            enabled: true
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: "straight",
          colors:["#5d45db"]
        },
        title: {
          text: "Price Trends",
          align: "left",
          style:{
            fontFamily:"Poppins",
            color:"#971b47"
          }
        },
        grid: {
          row: {
            colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
            opacity: 0.5
          }
        },
        xaxis: {
          categories: this.chartMonths
        }
      };
    }else{
      this.showChart = false;
    }

    });
  }
  Independent(){

    $('.propCatDiv2').css({
      'box-shadow': '0px 0px 12px 0px rgba(0, 0, 0, 0.08)',
      // 'border': 'none',
    });

    $('.propCatDiv1').css({
      'box-shadow': 'none',
      ' border-bottom': '0.1px solid #72727224',
    });
    $('.propCatDiv3').css({
      'box-shadow': 'none',
      ' border-bottom': '0.1px solid #72727224',
    });
    $('.propCatDiv4').css({
      'box-shadow': 'none',
      ' border-bottom': '0.1px solid #72727224',
    });
    this.propTypeId = '50407'
    var paramChart = {
      cityId: this.cityId,
      localityId: this.localityIdTrends,
      proptypeId: this.propTypeId,
      year : this.chartYear
    };

    this.Service.getlocalityChartData(paramChart).subscribe(response => {
      var checkData = response['proptype_pricetrends']['pricetrends'];
      this.yearTrends = response['proptype_pricetrends']['years'];
      if(checkData.length !== 0){
        this.showChart = true;

      this.testing = []
      this.chartMonths = []
      for (let i = 0; i < checkData.length; i++) {
       var dataPrice =  checkData[i].new_price
        this.updatedPrice = dataPrice
        var priceChange =  checkData[i].price_percentage;
        this.dataPriceChange = priceChange
        this.testing.push(dataPrice)
      }

      for (let i = 0; i < checkData.length; i++) {
        var dataMonth =  checkData[i].lastupdated
        // const month = dataMonth.split(", ")[0];
        this.chartMonths.push(dataMonth);
      }

      
      

      this.chartOptions4 = {
        series: [
          {
            name: "Price / sq ft",
            data: this.testing
          }
        ],
        chart: {
          height: 300,
          type: "line",
          zoom: {
            enabled: true
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: "straight",
          colors:["#ff696d"]
        },
        title: {
          text: "Price Trends",
          align: "left",
          style:{
            fontFamily:"Poppins",
            color:"#971b47"
          }
        },
        grid: {
          row: {
            colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
            opacity: 0.5
          }
        },
        xaxis: {
          categories: this.chartMonths
        }
      };
    }else{
      this.showChart = false;
    }

    });
  }
  Villa(){

    $('.propCatDiv3').css({
      'box-shadow': '0px 0px 12px 0px rgba(0, 0, 0, 0.08)',
      // 'border': 'none',
    });
    $('.propCatDiv1').css({
      'box-shadow': 'none',
      ' border-bottom': '0.1px solid #72727224',
    });
    $('.propCatDiv2').css({
      'box-shadow': 'none',
      ' border-bottom': '0.1px solid #72727224',
    });
    $('.propCatDiv4').css({
      'box-shadow': 'none',
      ' border-bottom': '0.1px solid #72727224',
    });
    this.propTypeId = '50402'
    var paramChart = {
      cityId: this.cityId,
      localityId: this.localityIdTrends,
      proptypeId: this.propTypeId,
      year : this.chartYear
    };

    this.Service.getlocalityChartData(paramChart).subscribe(response => {
      var checkData = response['proptype_pricetrends']['pricetrends'];
      this.yearTrends = response['proptype_pricetrends']['years'];
      if(checkData.length !== 0){
        this.showChart = true;

      this.testing = []
      this.chartMonths = []
      for (let i = 0; i < checkData.length; i++) {
       var dataPrice =  checkData[i].new_price
        this.updatedPrice = dataPrice
        var priceChange =  checkData[i].price_percentage;
        this.dataPriceChange = priceChange
        this.testing.push(dataPrice)
      }

      for (let i = 0; i < checkData.length; i++) {
        var dataMonth =  checkData[i].lastupdated
        // const month = dataMonth.split(", ")[0];
        this.chartMonths.push(dataMonth);
      }

      
      

      this.chartOptions4 = {
        series: [
          {
            name: "Price / sq ft",
            data: this.testing
          }
        ],
        chart: {
          height: 300,
          type: "line",
          zoom: {
            enabled: true
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: "straight",
          colors:["#6cb9ad"]
        },
        title: {
          text: "Price Trends",
          align: "left",
          style:{
            fontFamily:"Poppins",
            color:"#971b47"
          }
        },
        grid: {
          row: {
            colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
            opacity: 0.5
          }
        },
        xaxis: {
          categories: this.chartMonths
        }
      };
    }else{
      this.showChart = false;
    }

    });
  }
  Plot(){
    $('.propCatDiv4').css({
      'box-shadow': '0px 0px 12px 0px rgba(0, 0, 0, 0.08)',
      // 'border': 'none',
    });
    $('.propCatDiv1').css({
      'box-shadow': 'none',
      ' border-bottom': '0.1px solid #72727224',
    });
    $('.propCatDiv2').css({
      'box-shadow': 'none',
      ' border-bottom': '0.1px solid #72727224',
    });
    $('.propCatDiv3').css({
      'box-shadow': 'none',
      ' border-bottom': '0.1px solid #72727224',
    });
    this.propTypeId = '50403'
    var paramChart = {
      cityId: this.cityId,
      localityId: this.localityIdTrends,
      proptypeId: this.propTypeId,
      year : this.chartYear
    };

    this.Service.getlocalityChartData(paramChart).subscribe(response => {
      var checkData = response['proptype_pricetrends']['pricetrends'];
      this.yearTrends = response['proptype_pricetrends']['years'];
      if(checkData.length !== 0){
        this.showChart = true;

      this.testing = []
      this.chartMonths = []
      for (let i = 0; i < checkData.length; i++) {
       var dataPrice =  checkData[i].new_price
        this.updatedPrice = dataPrice
        var priceChange =  checkData[i].price_percentage;
        this.dataPriceChange = priceChange
        this.testing.push(dataPrice)
      }

      for (let i = 0; i < checkData.length; i++) {
        var dataMonth =  checkData[i].lastupdated
        // const month = dataMonth.split(", ")[0];
        this.chartMonths.push(dataMonth);
      }

      
      

      this.chartOptions4 = {
        series: [
          {
            name: "Price / sq ft",
            data: this.testing
          }
        ],
        chart: {
          height: 300,
          type: "line",
          zoom: {
            enabled: true
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: "straight",
          colors:["#edc161"]
        },
        title: {
          text: "Price Trends",
          align: "left",
          style:{
            fontFamily:"Poppins",
            color:"#971b47"
          }
        },
        grid: {
          row: {
            colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
            opacity: 0.5
          }
        },
        xaxis: {
          categories: this.chartMonths
        }
      };
    }else{
      this.showChart = false;
    }

    });
  }


}
