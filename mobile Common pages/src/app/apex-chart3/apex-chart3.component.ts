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
  selector: 'app-apex-chart3',
  templateUrl: './apex-chart3.component.html',
  styleUrls: ['./apex-chart3.component.css']
})
export class ApexChart3Component implements OnInit {

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

  placeName = ''
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
  localityId :any
  localityIdTrends :any
  localityNameTrends :any
  dataPriceChange: any;

  cityId:any
  localityList: any;
  localityListTrends: any;
  yearTrends: any;
  localityValue: any
  RegistrationForm: FormGroup;
  user = new enquiry();
  readyToMoveprojectcount: any;
  newLaunchesprojectcount: any;
  affordableprojectcount: any;
  luxuryprojectcount: any;

  propertyimage = this.Service.imagesURL + 'uploadPropertyImgs/';
  luxuryPropList: any[] = [];
  affordablePropList: any[] = [];
  affordablePropListt= false;
  newNearByLocalityArry = [];
  nearByLocality : any[] = [];
  recentlyAddedProp: any[] = [];

  nearByLocalityLen = false;
  nearByLocprop: any;

  testing = [];
  chartMonths = [];

  showChart = true;
  updatedPrice: any;
  projectcount: any;
  localityPropcount: any;
  community:any
  lifestyle:any
  currentLocalityName:any
  currentPropCity:any
  safety:any
  averageReviewsLoc :any
 topnewdivreached = false;
  topnewapiload = true;

  owner = false;
  tanent = false;
  livedBefore = false;
  broker = false;
  other = false;
  reviewAs:any;
  ratingValue1:any
  ratingValue2:any
  ratingValue3:any
  emailLogIn = false;
  reviewbutton: any;
  loginbutton: any;
  forgetPassEmailData = '';
  timeLeft:number = 10
  interval: any;
  cityname:any
  chartYear: any;
 propTypeId = '50401'
 tooltipPosition = {left: '0px' };
  radialColor: any;
//  isTooltipVisible = false;

  constructor( private activatedRoute: ActivatedRoute,  public Service: DataService, public Service2: DataService2,private router: Router, @Inject(LOCAL_STORAGE) private Local_Storage: any,@Inject(WINDOW) private window: Window, public cityservice: CityService,private titleService: Title, private meta: Meta,public location: Location,) {
     
     }
  // private routeSub: Subscription;

  ngOnInit(): void {
    this.dataloads();
  }
  dataloads() {
    var url = this.router.url;
    // const inputString = url
    //   const parts = inputString.split('-');
    //   const numberValue = parseInt(parts[parts.length - 2]);
    //   var localityid = numberValue;
    //   this.localityId = localityid
    //   this.localityIdTrends = localityid
     
      var Propid =  url.split('-').pop().match(/[0-9]+/);


    this.Service.getRentalsDetailsById(Propid).subscribe(offers => {
      var propdetails = offers['propertydetails'];

      this.cityId = propdetails[0]['Cityid'];
      const localityid = propdetails[0]['LocalityId'];
      const Locality = propdetails[0]['Locality'];
      this.currentLocalityName = Locality;
      const City = propdetails[0]['City'];
      this.currentPropCity = City;
      this.cityId = propdetails[0]['Cityid'];
      this.localityId = localityid
  

    var paramlocality = {
      locid: localityid,
    };
    var currentCity = City
    this.Service.getlocalitymeta(currentCity, paramlocality).subscribe(metatag => {
      let metatags = metatag['Localityseo'];  //gowshik edit//
      this.currentLocalityName = metatags[0].LocalityName;
      this.currentPropCity = metatags[0].city_name;

        this.titleService.setTitle(this.currentLocalityName +', ' + this.currentPropCity + '| Locality Reviews & Insights!');
        this.meta.updateTag({
          name: 'description',
          content: 'Check All about ' + this.currentLocalityName + ', ' + this.currentPropCity + ' through customer reviews. Explore location development, real estate trends, environment, pricing & many more - Homes247.in'
        });
        this.Service.createLinkForCanonicalURL();
   
    })

    this.routeSub1 = this.activatedRoute.params.subscribe(params => {
     
      var paramlocalityid = {
        localityId: localityid,
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


   
        if(this.safety < 30){
          this.radialColor = '#d40000'
        }else if(this.safety >= 30 && this.safety < 75){
          this.radialColor = '#F7E642'
        }else{
          this.radialColor = '#50ab52'
        }
  
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
                  color: "#000",
                  fontSize: "16px"
                },
                value: {
                  offsetY: 5,
                  color: this.radialColor,
                  fontSize: "14px",
                  show: true
                }
              }
            }
          },
          fill: {
            type: "solid",
            colors: [this.radialColor]
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
                  color: "#808480",
                  fontSize: "14px",
                  show: true
                }
              }
            }
          },
          fill: {
            type: "solid",
            colors: ["#808480"]
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
                  color: "#808480",
                  fontSize: "14px",
                  show: true
                }
              }
            }
          },
          fill: {
            type: "solid",
            colors: ["#808480"]
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
        
      const topYear = years?.[0]?.year || null;
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
  })
  }
  showTooltip(event: MouseEvent) {
    this.tooltipPosition = {
      left: `${event.clientX - 40}px`
    };
  
    const sectionArrow = document.querySelector('.section-arrow');
    if (sectionArrow) {
      // Set the custom property to move the tooltip arrow
      (sectionArrow as HTMLElement).style.setProperty('--tooltip-left', `${this.tooltipPosition.left}`);
    }
  }
  radialChart2(event: MouseEvent){
    this.showTooltip(event);

    if(this.lifestyle < 30){
      this.radialColor = '#d40000'
    }else if(this.lifestyle >= 30 && this.lifestyle < 75){
      this.radialColor = '#F7E642'
    }else{
      this.radialColor = '#50ab52'
    }

    $('.faqSeeFont2Safety').css('color','#636363')
    $('.faqSeeFont2Lifestyle').css('color','#000')
    $('.faqSeeFont2Community').css('color','#636363')

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
              color: this.radialColor,
              fontSize: "14px",
              show: true
            }
          }
        }
      },
      fill: {
        type: "solid",
        colors: [this.radialColor]
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
              color: "#808480",
              fontSize: "14px",
              show: true
            }
          }
        }
      },
      fill: {
        type: "solid",
        colors: ["#808480"]
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
              color: "#808480",
              fontSize: "14px",
              show: true
            }
          }
        }
      },
      fill: {
        type: "solid",
        colors: ["#808480"]
      },
      stroke: {
        lineCap: "round"
      }
    };

  }

  radialChart3(event: MouseEvent){
    this.showTooltip(event);

    if(this.community < 30){
      this.radialColor = '#d40000'
    }else if(this.community >= 30 && this.community < 75){
      this.radialColor = '#F7E642'
    }else{
      this.radialColor = '#50ab52'
    }

    $('.faqSeeFont2Safety').css('color','#636363')
    $('.faqSeeFont2Lifestyle').css('color','#636363')
    $('.faqSeeFont2Community').css('color','#000')

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
              color: "#808480",
              fontSize: "14px",
              show: true
            }
          }
        }
      },
      fill: {
        type: "solid",
        colors: ["#808480"]
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
              color: "#808480",
              fontSize: "14px",
              show: true
            }
          }
        }
      },
      fill: {
        type: "solid",
        colors: ["#808480"]
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
              color: this.radialColor,
              fontSize: "14px",
              show: true
            }
          }
        }
      },
      fill: {
        type: "solid",
        colors: [this.radialColor]
      },
      stroke: {
        lineCap: "round"
      }
    };

  }

  radialChart1(event: MouseEvent){
    this.showTooltip(event);

    if(this.safety < 30){
      this.radialColor = '#d40000'
    }else if(this.safety >= 30 && this.safety < 75){
      this.radialColor = '#F7E642'
    }else{
      this.radialColor = '#50ab52'
    }

    $('.faqSeeFont2Safety').css('color','#000')
    $('.faqSeeFont2Lifestyle').css('color','#636363')
    $('.faqSeeFont2Community').css('color','#636363')

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
              color: "#808480",
              fontSize: "14px",
              show: true
            }
          }
        }
      },
      fill: {
        type: "solid",
        colors: ["#808480"]
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
              color: this.radialColor,
              fontSize: "14px",
              show: true
            }
          }
        }
      },
      fill: {
        type: "solid",
        colors: [this.radialColor]
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
              color: "#808480",
              fontSize: "14px",
              show: true
            }
          }
        }
      },
      fill: {
        type: "solid",
        colors: ["#808480"]
      },
      stroke: {
        lineCap: "round"
      }
    };

  }
 
 
 
}
