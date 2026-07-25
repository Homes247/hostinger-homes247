import {Component, OnInit, ElementRef, ViewChild, PLATFORM_ID, Inject} from '@angular/core';
import {WINDOW} from '@ng-toolkit/universal';
import {DataService} from '../data.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Title, Meta} from '@angular/platform-browser';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {DatePipe, Location} from '@angular/common';
import { DataService2 } from '../data.service2';
declare var $: any;

declare var $: any;
@Component({
  selector: 'app-pdfgenerate',
  templateUrl: './pdfgenerate.component.html',
  styleUrls: ['./pdfgenerate.component.css']
})
export class PdfgenerateComponent implements OnInit {

  onebhk: boolean;
  twobhk: boolean;
  threebhk: boolean;
  fourbhk: boolean;
  fivebhk: boolean;
  plots: boolean;

  seeMoreLess1: boolean = false;
  seeMoreLess2: boolean = false;
  seeMoreLess3: boolean = false;
  seeMoreLess4: boolean = false;
  seeMoreLess5: boolean = false;

  public currentActive = 0;
  base64img: any;
  locidbread: any;
  builderbread: any;
  builderidbread: any;
  regionbread: any;
  regionidbread: any;
  statusbread: any;
  statusidbread: any;
  image: any;
  image1: any;
  image2: any;
  image3: any;
  alttag: any;
  bhk: any;
  citybread: any;
  localitybread: any;
  routeSub: any;
  propID: any;
  propName: any;
  propertyType: any;
  builderId: any;

  latit: number;
  lngit: number;
  lat: number;
  lng: number;
  mapicon: any;
  covertedimage: any;
  listOfPropertiesFromBuilders: any;
  listOfSimilarProperties: any;
  propertiesDetails: any;
  ImageUrl = this.Service.brochuresimages + 'uploadPropertyImgs/';
  masterimages = this.Service.brochuresimages + 'masterImgs/';
  amenitesImages = this.Service.brochuresAmenities + 'amenites/amenities-new/';
  uploadBHKImages = this.Service.brochuresimages + 'uploadBHKImgs/';
  masterImgPath: any;
  PropDescription: string;
  finalDescp: string;

  AmenitieImg1;
  AmenitieName1;
  AmenitieImg2;
  AmenitieName2;
  AmenitieImg3;
  AmenitieName3;
  AmenitieImg4;
  AmenitieName4;
  AmenitieImg5;
  AmenitieName5;
  AmenitieImg6;
  AmenitieName6;
  AmenitieImg7;
  AmenitieName7;
  AmenitieImg8;
  AmenitieName8;
  AmenitieImg9;
  AmenitieName9;
  AmenitieImg10;
  AmenitieName10;
  PropMaxPrice;
  PropMinPrice;
  PropertyType;
  PropertyTotalArea;
  PropertyTotalUnits;
  PropertyPossessionDate;
  PropertyBHKdetails = [];
  PropertyOneBhkArry = [];
  PropertyTwoBhkArry = [];
  PropertyThreeBhkArry = [];
  PropertyFourBhkArry = [];
  PropertyFiveBhkArry = [];
  //1 BHK
  OneBHKFloorImage1 = '';
  OneBHKFloorImage2 = '';
  OneBHKFloorImage3 = '';

  OneBHKBHKData1 = '';
  OneBHKBHKData2 = '';
  OneBHKBHKData3 = '';

  OneBHKAreaData1 = '';
  OneBHKAreaData2 = '';
  OneBHKAreaData3 = '';
  //2 BHK
  TwoBHKFloorImage1 = '';
  TwoBHKFloorImage2 = '';
  TwoBHKFloorImage3 = '';

  TwoBHKBHKData1 = '';
  TwoBHKBHKData2 = '';
  TwoBHKBHKData3 = '';

  TwoBHKAreaData1 = '';
  TwoBHKAreaData2 = '';
  TwoBHKAreaData3 = '';
  //3 BHK
  ThreeBHKFloorImage1 = '';
  ThreeBHKFloorImage2 = '';
  ThreeBHKFloorImage3 = '';

  ThreeBHKBHKData1 = '';
  ThreeBHKBHKData2 = '';
  ThreeBHKBHKData3 = '';

  ThreeBHKAreaData1 = '';
  ThreeBHKAreaData2 = '';
  ThreeBHKAreaData3 = '';
  //4 BHK
  FourBHKFloorImage1 = '';
  FourBHKFloorImage2 = '';
  FourBHKFloorImage3 = '';

  FourBHKBHKData1 = '';
  FourBHKBHKData2 = '';
  FourBHKBHKData3 = '';

  FourBHKAreaData1 = '';
  FourBHKAreaData2 = '';
  FourBHKAreaData3 = '';
  //5 BHK
  FiveBHKFloorImage1 = '';
  FiveBHKFloorImage2 = '';
  FiveBHKFloorImage3 = '';

  FiveBHKBHKData1 = '';
  FiveBHKBHKData2 = '';
  FiveBHKBHKData3 = '';

  FiveBHKAreaData1 = '';
  FiveBHKAreaData2 = '';
  FiveBHKAreaData3 = '';

  constructor(private titleService: Title,
              private meta: Meta,
              private router: Router,
              private _location: Location,
              private activatedRoute: ActivatedRoute,
              public Service: DataService,
              public Service2: DataService2,
              @Inject(PLATFORM_ID) private platformId: Object,
              @Inject(WINDOW) private window: Window,
              public datepipe: DatePipe) {
    this.listOfPropertiesFromBuilders = [];
    this.listOfSimilarProperties = [];
  }

  ngOnInit() 
  {
    this.getPropDetails();
    let node5: any = document.createElement('link');
      node5.rel = 'stylesheet';
      node5.href = 'https://d1zt14hr2k4poi.cloudfront.net/version2.0/proxima/stylesheet.css';
      node5.type = 'text/css';
      node5.async = true;
      var godefer5 = document.getElementsByTagName('link')[0];
      godefer5.parentNode.insertBefore(node5, godefer5);
      document.getElementsByTagName('head')[0].appendChild(node5);
  }

  galleryimages = [];
  Amenities = [];
  floorplans = [];
  getPropDetails() {
    this.routeSub = this.activatedRoute.params.subscribe(params => {
      var cityname = params['cityname'];
      var id = params['id'];
      var localityname = params['locality'];
      var lasturl = id;
      var propid = lasturl.split('-').pop().match(/[0-9]+/);
      this.propID = propid;
      this.Service2.getpropertynew(propid).subscribe(prop => {
        let propDetails = prop['details'];
        this.propertiesDetails = propDetails;
        // this.image = propDetails[0].images[0].name;
        // this.image1 = propDetails[0].images[1].name;
        // this.image2 = propDetails[0].images[2].name;
        // this.image3 = propDetails[0].images[3].name;
        this.masterImgPath = propDetails[0].masterImgPath;
        this.propName = this.propertiesDetails[0]['propertyName'];
        this.propertyType = this.propertiesDetails[0]['propertyType'];
        this.builderId = this.propertiesDetails[0]['BuliderId'];
        var apicityname = this.propertiesDetails[0].city_name;
        var apinamecity = apicityname.toLowerCase();
        var apilocalityname = this.propertiesDetails[0].locality_name;
        var apilocality = apilocalityname.replace(/\s+/g, '-').toLowerCase();
        var apipropname = this.propertiesDetails[0].propertyName;
        var apipropertyname = apipropname.replace(/\s+/g, '-').toLowerCase();
        var localityid = this.propertiesDetails[0].LoaclityId;
        this.locidbread = localityid;
        var buildername = this.propertiesDetails[0].BuilderName;
        var builderlower = buildername.replace(/\s+/g, '-').toLowerCase();
        this.builderbread = builderlower;
        this.builderidbread = this.propertiesDetails[0].BuilderId;
        var regioname = this.propertiesDetails[0].RegionName;
        var lowerregion = regioname.replace(/\s+/g, '-').toLowerCase();
        this.regionbread = lowerregion;
        this.regionidbread = this.propertiesDetails[0].RegionID;
        var statusname = this.propertiesDetails[0].Status;
        var lowerstatus = statusname.replace(/\s+/g, '-').toLowerCase();
        this.statusbread = lowerstatus;
        this.statusidbread = this.propertiesDetails[0].StatusId;
        this.PropDescription = this.propertiesDetails[0].short_description;
        this.finalDescp = this.PropDescription.replace(/[^a-zA-Z ,. ]/g, '');
        // this.AmenitieImg1 = this.propertiesDetails[0].Amenities_Deatils[0].ImgPath;
        // this.AmenitieName1 = this.propertiesDetails[0].Amenities_Deatils[0].Name;
        // this.AmenitieImg2 = this.propertiesDetails[0].Amenities_Deatils[1].ImgPath;
        // this.AmenitieName2 = this.propertiesDetails[0].Amenities_Deatils[1].Name;
        // this.AmenitieImg3 = this.propertiesDetails[0].Amenities_Deatils[2].ImgPath;
        // this.AmenitieName3 = this.propertiesDetails[0].Amenities_Deatils[2].Name;
        // this.AmenitieImg4 = this.propertiesDetails[0].Amenities_Deatils[3].ImgPath;
        // this.AmenitieName4 = this.propertiesDetails[0].Amenities_Deatils[3].Name;
        // this.AmenitieImg5 = this.propertiesDetails[0].Amenities_Deatils[4].ImgPath;
        // this.AmenitieName5 = this.propertiesDetails[0].Amenities_Deatils[4].Name;
        // this.AmenitieImg6 = this.propertiesDetails[0].Amenities_Deatils[5].ImgPath;
        // this.AmenitieName6 = this.propertiesDetails[0].Amenities_Deatils[5].Name;
        // this.AmenitieImg7 = this.propertiesDetails[0].Amenities_Deatils[6].ImgPath;
        // this.AmenitieName7 = this.propertiesDetails[0].Amenities_Deatils[6].Name;
        // this.AmenitieImg8 = this.propertiesDetails[0].Amenities_Deatils[7].ImgPath;
        // this.AmenitieName8 = this.propertiesDetails[0].Amenities_Deatils[7].Name;
        // this.AmenitieImg9 = this.propertiesDetails[0].Amenities_Deatils[8].ImgPath;
        // this.AmenitieName9 = this.propertiesDetails[0].Amenities_Deatils[8].Name;
        // this.AmenitieImg10 = this.propertiesDetails[0].Amenities_Deatils[9].ImgPath;
        // this.AmenitieName10 = this.propertiesDetails[0].Amenities_Deatils[9].Name;

        this.PropMaxPrice = this.propertiesDetails[0]['price_max'];
        this.PropMinPrice = this.propertiesDetails[0]['price_min'];
        this.PropertyType = this.propertiesDetails[0]['propertyType'];
        this.PropertyTotalArea = this.propertiesDetails[0]['dimension'];
        this.PropertyTotalUnits = this.propertiesDetails[0]['total_apartments'];
        let latest_date = this.propertiesDetails[0]['PossessionDate'];
        this.PropertyPossessionDate = this.datepipe.transform(latest_date, 'dd-MM-yyyy');
        // this.PropertyBHKdetails = this.propertiesDetails[0]['BHK_Deatils'];
        // var arrayLength = this.PropertyBHKdetails.length;
        // for (let i = 0; i < this.PropertyBHKdetails.length; i++) {
        //   if (this.PropertyBHKdetails[i]['BHK'] === '1 BHK') {
        //     this.PropertyOneBhkArry.push(this.PropertyBHKdetails[i]);
        //   } else if (this.PropertyBHKdetails[i]['BHK'] === '2 BHK') {
        //     this.PropertyTwoBhkArry.push(this.PropertyBHKdetails[i]);
        //   } else if (this.PropertyBHKdetails[i]['BHK'] === '3 BHK') {
        //     this.PropertyThreeBhkArry.push(this.PropertyBHKdetails[i]);
        //   } else if (this.PropertyBHKdetails[i]['BHK'] === '4 BHK') {
        //     this.PropertyFourBhkArry.push(this.PropertyBHKdetails[i]);
        //   } else if (this.PropertyBHKdetails[i]['BHK'] === '5 BHK') {
        //     this.PropertyFiveBhkArry.push(this.PropertyBHKdetails[i]);
        //   }
        //   if(arrayLength === i+1){
        //     this.convetToPDF();
        //   }
        // }
        this.Service2.get_amen_appro_banks(this.propID).subscribe(datadetails => {
          let otherdatas = datadetails['details'];
          this.galleryimages = otherdatas[0].images;
          this.floorplans = otherdatas[0].BHK_Details;
          this.Amenities = otherdatas[0].Amenities_Details;
          this.image = this.galleryimages[0]?.name || '';
          this.image1 = this.galleryimages[1]?.name || '';
          this.image2 = this.galleryimages[2]?.name || '';
          this.image3 = this.galleryimages[3]?.name || '';

          this.AmenitieImg1 = this.Amenities[0].ImgPath;
          this.AmenitieName1 = this.Amenities[0].Name;
          this.AmenitieImg2 = this.Amenities[1].ImgPath;
          this.AmenitieName2 = this.Amenities[1].Name;
          this.AmenitieImg3 = this.Amenities[2].ImgPath;
          this.AmenitieName3 = this.Amenities[2].Name;
          this.AmenitieImg4 = this.Amenities[3].ImgPath;
          this.AmenitieName4 = this.Amenities[3].Name;
          this.AmenitieImg5 = this.Amenities[4].ImgPath;
          this.AmenitieName5 = this.Amenities[4].Name;
          this.AmenitieImg6 = this.Amenities[5].ImgPath;
          this.AmenitieName6 = this.Amenities[5].Name;
          this.AmenitieImg7 = this.Amenities[6].ImgPath;
          this.AmenitieName7 = this.Amenities[6].Name;
          this.AmenitieImg8 = this.Amenities[7].ImgPath;
          this.AmenitieName8 = this.Amenities[7].Name;
          this.AmenitieImg9 = this.Amenities[8].ImgPath;
          this.AmenitieName9 = this.Amenities[8].Name;
          this.AmenitieImg10 = this.Amenities[9].ImgPath;
          this.AmenitieName10 = this.Amenities[9].Name;

          this.PropertyBHKdetails =  this.floorplans;
          var arrayLength =  this.floorplans.length;
          for (let i = 0; i < this.PropertyBHKdetails.length; i++) {
            if (this.PropertyBHKdetails[i]['BHK'] === '1 BHK') {
              this.PropertyOneBhkArry.push(this.PropertyBHKdetails[i]);
            } else if (this.PropertyBHKdetails[i]['BHK'] === '2 BHK') {
              this.PropertyTwoBhkArry.push(this.PropertyBHKdetails[i]);
            } else if (this.PropertyBHKdetails[i]['BHK'] === '3 BHK') {
              this.PropertyThreeBhkArry.push(this.PropertyBHKdetails[i]);
            } else if (this.PropertyBHKdetails[i]['BHK'] === '4 BHK') {
              this.PropertyFourBhkArry.push(this.PropertyBHKdetails[i]);
            } else if (this.PropertyBHKdetails[i]['BHK'] === '5 BHK') {
              this.PropertyFiveBhkArry.push(this.PropertyBHKdetails[i]);
            }
            if(arrayLength === i+1){
              this.convetToPDF();
            }
          }
        }); 

      });
    });

    /* const img = document.querySelector('#banner_id');
     
     img.addEventListener('load', (event) => {
       const dataUrl = this.getDataUrl(event.currentTarget);
       
       this.covertedimage = dataUrl;
     });*/

  }

  getDataUrl(img) {
    // Create canvas
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Set width and height
    canvas.width = img.width;
    canvas.height = img.height;
    // Draw the image
    ctx.drawImage(img, 0, 0);

    return canvas.toDataURL('image/jpeg');
  }

   convetToPDF() {
    //1BHK
    // for (let i = 0; i < this.PropertyOneBhkArry.length; i++) {
    //   if (this.PropertyOneBhkArry[i] === this.PropertyOneBhkArry[0]) {
    //     this.OneBHKFloorImage1 = this.PropertyOneBhkArry[0]['FloorImage'];
    //     this.OneBHKBHKData1 = this.PropertyOneBhkArry[0]['BHK'];
    //     this.OneBHKAreaData1 = this.PropertyOneBhkArry[0]['Area'];
    //   }
    //   if (this.PropertyOneBhkArry[i] === this.PropertyOneBhkArry[1]) {
    //     this.OneBHKFloorImage2 = this.PropertyOneBhkArry[1]['FloorImage'];
    //     this.OneBHKBHKData2 = this.PropertyOneBhkArry[1]['BHK'];
    //     this.OneBHKAreaData2 = this.PropertyOneBhkArry[1]['Area'];
    //   }
    //   if (this.PropertyOneBhkArry[i] === this.PropertyOneBhkArry[2]) {
    //     this.OneBHKFloorImage3 = this.PropertyOneBhkArry[2]['FloorImage'];
    //     this.OneBHKBHKData3 = this.PropertyOneBhkArry[2]['BHK'];
    //     this.OneBHKAreaData3 = this.PropertyOneBhkArry[2]['Area'];
    //   }
    // }
    //2 BHK
    // for (let i = 0; i < this.PropertyTwoBhkArry.length; i++) {
    //   if (this.PropertyTwoBhkArry[i] === this.PropertyTwoBhkArry[0]) {
    //     this.TwoBHKFloorImage1 = this.PropertyTwoBhkArry[0]['FloorImage'];
    //     this.TwoBHKBHKData1 = this.PropertyTwoBhkArry[0]['BHK'];
    //     this.TwoBHKAreaData1 = this.PropertyTwoBhkArry[0]['Area'];
    //   }
    //   if (this.PropertyTwoBhkArry[i] === this.PropertyTwoBhkArry[1]) {
    //     this.TwoBHKFloorImage2 = this.PropertyTwoBhkArry[1]['FloorImage'];
    //     this.TwoBHKBHKData2 = this.PropertyTwoBhkArry[1]['BHK'];
    //     this.TwoBHKAreaData2 = this.PropertyTwoBhkArry[1]['Area'];
    //   }
    //   if (this.PropertyTwoBhkArry[i] === this.PropertyTwoBhkArry[2]) {
    //     this.TwoBHKFloorImage3 = this.PropertyTwoBhkArry[2]['FloorImage'];
    //     this.TwoBHKBHKData3 = this.PropertyTwoBhkArry[2]['BHK'];
    //     this.TwoBHKAreaData3 = this.PropertyTwoBhkArry[2]['Area'];
    //   }
    // }
    //3 BHK
    // for (let i = 0; i < this.PropertyThreeBhkArry.length; i++) {
    //   if (this.PropertyThreeBhkArry[i] === this.PropertyThreeBhkArry[0]) {
    //     this.ThreeBHKFloorImage1 = this.PropertyThreeBhkArry[0]['FloorImage'];
    //     this.ThreeBHKBHKData1 = this.PropertyThreeBhkArry[0]['BHK'];
    //     this.ThreeBHKAreaData1 = this.PropertyThreeBhkArry[0]['Area'];
    //   }
    //   if (this.PropertyThreeBhkArry[i] === this.PropertyThreeBhkArry[1]) {
    //     this.ThreeBHKFloorImage2 = this.PropertyThreeBhkArry[1]['FloorImage'];
    //     this.ThreeBHKBHKData2 = this.PropertyThreeBhkArry[1]['BHK'];
    //     this.ThreeBHKAreaData2 = this.PropertyThreeBhkArry[1]['Area'];
    //   }
    //   if (this.PropertyThreeBhkArry[i] === this.PropertyThreeBhkArry[2]) {
    //     this.ThreeBHKFloorImage3 = this.PropertyThreeBhkArry[2]['FloorImage'];
    //     this.ThreeBHKBHKData3 = this.PropertyThreeBhkArry[2]['BHK'];
    //     this.ThreeBHKAreaData3 = this.PropertyThreeBhkArry[2]['Area'];
    //   }
    // }
    //4 BHK
    // for (let i = 0; i < this.PropertyFourBhkArry.length; i++) {
    //   if (this.PropertyFourBhkArry[i] === this.PropertyFourBhkArry[0]) {
    //     this.FourBHKFloorImage1 = this.PropertyFourBhkArry[0]['FloorImage'];
    //     this.FourBHKBHKData1 = this.PropertyFourBhkArry[0]['BHK'];
    //     this.FourBHKAreaData1 = this.PropertyFourBhkArry[0]['Area'];
    //   }
    //   if (this.PropertyFourBhkArry[i] === this.PropertyFourBhkArry[1]) {
    //     this.FourBHKFloorImage2 = this.PropertyFourBhkArry[1]['FloorImage'];
    //     this.FourBHKBHKData2 = this.PropertyFourBhkArry[1]['BHK'];
    //     this.FourBHKAreaData2 = this.PropertyFourBhkArry[1]['Area'];
    //   }
    //   if (this.PropertyFourBhkArry[i] === this.PropertyFourBhkArry[2]) {
    //     this.FourBHKFloorImage3 = this.PropertyFourBhkArry[2]['FloorImage'];
    //     this.FourBHKBHKData3 = this.PropertyFourBhkArry[2]['BHK'];
    //     this.FourBHKAreaData3 = this.PropertyFourBhkArry[2]['Area'];
    //   }
    // }
    //5 BHK
    // for (let i = 0; i < this.PropertyFiveBhkArry.length; i++) {
    //   if (this.PropertyFiveBhkArry[i] === this.PropertyFiveBhkArry[0]) {
    //     this.FiveBHKFloorImage1 = this.PropertyFiveBhkArry[0]['FloorImage'];
    //     this.FiveBHKBHKData1 = this.PropertyFiveBhkArry[0]['BHK'];
    //     this.FiveBHKAreaData1 = this.PropertyFiveBhkArry[0]['Area'];
    //   }
    //   if (this.PropertyFiveBhkArry[i] === this.PropertyFiveBhkArry[1]) {
    //     this.FiveBHKFloorImage2 = this.PropertyFiveBhkArry[1]['FloorImage'];
    //     this.FiveBHKBHKData2 = this.PropertyFiveBhkArry[1]['BHK'];
    //     this.FiveBHKAreaData2 = this.PropertyFiveBhkArry[1]['Area'];
    //   }
    //   if (this.PropertyFiveBhkArry[i] === this.PropertyFiveBhkArry[2]) {
    //     this.FiveBHKFloorImage3 = this.PropertyFiveBhkArry[2]['FloorImage'];
    //     this.FiveBHKBHKData3 = this.PropertyFiveBhkArry[2]['BHK'];
    //     this.FiveBHKAreaData3 = this.PropertyFiveBhkArry[2]['Area'];
    //   }
    // }

    var data = document.getElementById('contentToConvert');
    html2canvas(data).then(canvas => {
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;
      var img = new Image();
      const contentDataURL = canvas.toDataURL('image/jpeg');
      img.src = contentDataURL;
      let pdf = new jsPDF('l', 'mm', [300, 170]); // page size of PDF
      var position = 0;

      const imageUrl11 = this.ImageUrl + this.image;
      const fileExtension11 = imageUrl11.split('.').pop().toLowerCase();

      let imageFormat11 = 'JPEG'; // Default format
      // if (fileExtension11 === 'png') {
      //   imageFormat11 = 'PNG';
      // } else if (fileExtension11 === 'jpeg' || fileExtension11 === 'jpg') {
      //   imageFormat11 = 'JPEG';
      // } else if (fileExtension11 === 'webp') {
      //   imageFormat11 = 'WEBP';
      // }
      const imageUrl22 = this.ImageUrl + this.image1;
      const fileExtension22 = imageUrl22.split('.').pop().toLowerCase();

      let imageFormat22 = 'JPEG'; // Default format
      // if (fileExtension22 === 'png') {
      //   imageFormat22 = 'PNG';
      // } else if (fileExtension22 === 'jpeg' || fileExtension22 === 'jpg') {
      //   imageFormat22 = 'JPEG';
      // } else if (fileExtension22 === 'webp') {
      //   imageFormat22 = 'WEBP';
      // }
      //page 0
      pdf.addImage('https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/mobile/brochure/First-page.png', 'PNG', 0, 0, 300, 170);
      pdf.addPage();
      //page 1
      pdf.addImage(this.ImageUrl + this.image, imageFormat11, 0, 0, 300, 170);

      pdf.addImage('https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/mobile/brochure/01.png', 'PNG', 0, 0, 300, 170);
      pdf.setFont('Helvetica', 'bold');
      pdf.setFontSize(45);
      pdf.setTextColor(255, 255, 255);
      var splitTitle = pdf.splitTextToSize(this.propName, 140);
      pdf.text(splitTitle, 160, 70);
      pdf.addPage();

      //page 2
      pdf.addImage(this.ImageUrl + this.image1, imageFormat22, 0, 0, 300, 170);
      pdf.addImage('https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/mobile/brochure/02.png', 'PNG', 0, 0, 300, 170);
      pdf.setFont('Helvetica', 'bold');
      pdf.setFontSize(40);
      pdf.setTextColor(255, 255, 255);
      var splitTitle = pdf.splitTextToSize('About', 140);
      pdf.text(splitTitle, 10, 30);

      pdf.setFont('Helvetica', 'bold');
      pdf.setFontSize(30);
      pdf.setTextColor(255, 255, 255);
      var splitTitle = pdf.splitTextToSize(this.propName, 140);
      pdf.text(splitTitle, 10, 43);

      pdf.setFont('Helvetica', 'normal');
      pdf.setFontSize(16);
      pdf.setTextColor(255, 255, 255);
      var splitTitle = pdf.splitTextToSize(this.finalDescp, 128);
      pdf.text(splitTitle, 10, 55);
      pdf.addPage();

      //page 3
      pdf.addImage(this.ImageUrl + this.image2, imageFormat11, 180, 0, 120, 100);
      pdf.addImage(this.ImageUrl + this.image3, imageFormat22, 0, 70, 120, 100);
      pdf.addImage('https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/mobile/brochure/03.png', 'PNG', 0, 0, 300, 170);
      pdf.setFont('Helvetica', 'bold');
      pdf.setFontSize(30);
      pdf.setTextColor(255, 255, 255);
      pdf.text(this.propName, 10, 30);

      pdf.setFont('Helvetica', 'bold');
      pdf.setFontSize(30);
      pdf.setTextColor(255, 255, 255);
      pdf.text('Overview', 40, 43);

      pdf.setFont('Helvetica', 'bold');
      pdf.setFontSize(15);
      pdf.setTextColor(255, 255, 255);
      pdf.text('Type', 123, 120);
      pdf.setFont('Helvetica', 'bold');
      pdf.setFontSize(15);
      pdf.setTextColor(255, 255, 255);
      pdf.text(this.PropertyType, 123, 130);

      pdf.setFont('Helvetica', 'bold');
      pdf.setFontSize(15);
      pdf.setTextColor(255, 255, 255);
      pdf.text('Price', 170, 120);
      pdf.setFont('Helvetica', 'bold');
      pdf.setFontSize(15);
      pdf.setTextColor(255, 255, 255);
      pdf.text(this.PropMinPrice + '-' + this.PropMaxPrice, 170, 130);

      pdf.setFont('Helvetica', 'bold');
      pdf.setFontSize(15);
      pdf.setTextColor(255, 255, 255);
      pdf.text('Total Area', 220, 120);
      pdf.setFont('Helvetica', 'bold');
      pdf.setFontSize(15);
      pdf.setTextColor(255, 255, 255);
      pdf.text(this.PropertyTotalArea, 220, 130);
      pdf.text('Acres', 230, 130);

      pdf.setFont('Helvetica', 'bold');
      pdf.setFontSize(15);
      pdf.setTextColor(255, 255, 255);
      pdf.text('Total Units', 123, 150);
      pdf.setFont('Helvetica', 'bold');
      pdf.setFontSize(15);
      pdf.setTextColor(255, 255, 255);
      pdf.text(this.PropertyTotalUnits, 123, 160);

      pdf.setFont('Helvetica', 'bold');
      pdf.setFontSize(15);
      pdf.setTextColor(255, 255, 255);
      pdf.text('Possession Date', 170, 150);
      pdf.setFont('Helvetica', 'bold');
      pdf.setFontSize(15);
      pdf.setTextColor(255, 255, 255);
      pdf.text(this.PropertyPossessionDate, 170, 160);
      pdf.addPage();

      //page 4
      
      const imageUrl1 = this.amenitesImages + this.AmenitieImg1;
      const imageUrl2 = this.amenitesImages + this.AmenitieImg2;
      const imageUrl3 = this.amenitesImages + this.AmenitieImg3;
      const imageUrl4 = this.amenitesImages + this.AmenitieImg4;
      const imageUrl5 = this.amenitesImages + this.AmenitieImg5;
      const imageUrl6 = this.amenitesImages + this.AmenitieImg6;
      const imageUrl7 = this.amenitesImages + this.AmenitieImg7;
      const imageUrl8 = this.amenitesImages + this.AmenitieImg8;
      const imageUrl9 = this.amenitesImages + this.AmenitieImg9;
      const imageUrl10 = this.amenitesImages + this.AmenitieImg10;
      const imageUrl111 = this.masterimages + this.masterImgPath;
      // Determine the image format from the URL or file extension
      
      const fileExtension1 = imageUrl1.split('.').pop().toLowerCase();
      const fileExtension2 = imageUrl2.split('.').pop().toLowerCase();
      const fileExtension3 = imageUrl3.split('.').pop().toLowerCase();
      const fileExtension4 = imageUrl4.split('.').pop().toLowerCase();
      const fileExtension5 = imageUrl5.split('.').pop().toLowerCase();
      const fileExtension6 = imageUrl6.split('.').pop().toLowerCase();
      const fileExtension7 = imageUrl7.split('.').pop().toLowerCase();
      const fileExtension8 = imageUrl8.split('.').pop().toLowerCase();
      const fileExtension9 = imageUrl9.split('.').pop().toLowerCase();
      const fileExtension10 = imageUrl10.split('.').pop().toLowerCase();
      const fileExtension111 = imageUrl111.split('.').pop().toLowerCase();

      let imageFormat1 = 'JPEG'; // Default format
      if (fileExtension1 === 'png') {
        imageFormat1 = 'PNG';
      } else if (fileExtension1 === 'jpeg' || fileExtension1 === 'jpg') {
        imageFormat1 = 'JPEG';
      } else if (fileExtension1 === 'webp') {
        imageFormat1 = 'WEBP';
      }

      let imageFormat2 = 'JPEG'; // Default format
      if (fileExtension2 === 'png') {
        imageFormat2 = 'PNG';
      } else if (fileExtension2 === 'jpeg' || fileExtension2 === 'jpg') {
        imageFormat2 = 'JPEG';
      } else if (fileExtension2 === 'webp') {
        imageFormat2 = 'WEBP';
      }

      let imageFormat3 = 'JPEG'; // Default format
      if (fileExtension3 === 'png') {
        imageFormat3 = 'PNG';
      } else if (fileExtension3 === 'jpeg' || fileExtension3 === 'jpg') {
        imageFormat3 = 'JPEG';
      } else if (fileExtension3 === 'webp') {
        imageFormat3 = 'WEBP';
      }

      let imageFormat4 = 'JPEG'; // Default format
      if (fileExtension4 === 'png') {
        imageFormat4 = 'PNG';
      } else if (fileExtension4 === 'jpeg' || fileExtension4 === 'jpg') {
        imageFormat4 = 'JPEG';
      } else if (fileExtension4 === 'webp') {
        imageFormat4 = 'WEBP';
      }

      let imageFormat5 = 'JPEG'; // Default format
      if (fileExtension5 === 'png') {
        imageFormat5 = 'PNG';
      } else if (fileExtension5 === 'jpeg' || fileExtension5 === 'jpg') {
        imageFormat5 = 'JPEG';
      } else if (fileExtension5 === 'webp') {
        imageFormat5 = 'WEBP';
      }

      let imageFormat6 = 'JPEG'; // Default format
      if (fileExtension6 === 'png') {
        imageFormat6 = 'PNG';
      } else if (fileExtension6 === 'jpeg' || fileExtension6 === 'jpg') {
        imageFormat6 = 'JPEG';
      } else if (fileExtension6 === 'webp') {
        imageFormat6 = 'WEBP';
      }

      let imageFormat7 = 'JPEG'; // Default format
      if (fileExtension7 === 'png') {
        imageFormat7 = 'PNG';
      } else if (fileExtension7 === 'jpeg' || fileExtension7 === 'jpg') {
        imageFormat7 = 'JPEG';
      } else if (fileExtension7 === 'webp') {
        imageFormat7 = 'WEBP';
      }

      let imageFormat8 = 'JPEG'; // Default format
      if (fileExtension8 === 'png') {
        imageFormat8 = 'PNG';
      } else if (fileExtension8 === 'jpeg' || fileExtension8 === 'jpg') {
        imageFormat8 = 'JPEG';
      } else if (fileExtension8 === 'webp') {
        imageFormat8 = 'WEBP';
      }

      let imageFormat9 = 'JPEG'; // Default format
      if (fileExtension9 === 'png') {
        imageFormat9 = 'PNG';
      } else if (fileExtension9 === 'jpeg' || fileExtension9 === 'jpg') {
        imageFormat9 = 'JPEG';
      } else if (fileExtension9 === 'webp') {
        imageFormat9 = 'WEBP';
      }
      let imageFormat10 = 'JPEG'; // Default format
      if (fileExtension10 === 'png') {
        imageFormat10 = 'PNG';
      } else if (fileExtension10 === 'jpeg' || fileExtension10 === 'jpg') {
        imageFormat10 = 'JPEG';
      } else if (fileExtension10 === 'webp') {
        imageFormat10 = 'WEBP';
      }
      let imageFormat111 = 'JPEG'; // Default format
      if (fileExtension111 === 'png') {
        imageFormat111 = 'PNG';
      } else if (fileExtension111 === 'jpeg' || fileExtension111 === 'jpg') {
        imageFormat111 = 'JPEG';
      } else if (fileExtension111 === 'webp') {
        imageFormat111 = 'WEBP';
      }


      pdf.addImage('https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/mobile/brochure/11.png', 'PNG', 0, 0, 300, 170);
      pdf.addImage(this.amenitesImages + this.AmenitieImg1, imageFormat1, 39, 38, 35, 35);
      pdf.setFont('Helvetica', 'bold');
      pdf.setFontSize(15);
      pdf.setTextColor(255, 255, 255);
      pdf.text(this.AmenitieName1, 43, 80);

      pdf.addImage(this.amenitesImages + this.AmenitieImg2, imageFormat2, 92, 40, 30, 30);
      pdf.setFont('Helvetica', 'bold');
      pdf.setFontSize(15);
      pdf.setTextColor(255, 255, 255);
      pdf.text(this.AmenitieName2, 85, 80);

      pdf.addImage(this.amenitesImages + this.AmenitieImg3, imageFormat3, 140, 40, 30, 30);
      pdf.setFont('Helvetica', 'bold');
      pdf.setFontSize(15);
      pdf.setTextColor(255, 255, 255);
      pdf.text(this.AmenitieName3, 135, 80);

      pdf.addImage(this.amenitesImages + this.AmenitieImg4, imageFormat4, 190, 40, 30, 30);
      pdf.setFont('Helvetica', 'bold');
      pdf.setFontSize(15);
      pdf.setTextColor(255, 255, 255);
      pdf.text(this.AmenitieName4, 195, 80);

      pdf.addImage(this.amenitesImages + this.AmenitieImg5, imageFormat5, 240, 40, 30, 30);
      pdf.setFont('Helvetica', 'bold');
      pdf.setFontSize(15);
      pdf.setTextColor(255, 255, 255);
      pdf.text(this.AmenitieName5, 245, 80);

      pdf.addImage(this.amenitesImages + this.AmenitieImg6, imageFormat6, 41, 99, 30, 30);
      pdf.setFont('Helvetica', 'bold');
      pdf.setFontSize(15);
      pdf.setTextColor(255, 255, 255);
      pdf.text(this.AmenitieName6, 43, 136);

      pdf.addImage(this.amenitesImages + this.AmenitieImg7, imageFormat7, 92, 98, 30, 30);
      pdf.setFont('Helvetica', 'bold');
      pdf.setFontSize(15);
      pdf.setTextColor(255, 255, 255);
      pdf.text(this.AmenitieName7, 89, 136);

      pdf.addImage(this.amenitesImages + this.AmenitieImg8, imageFormat8, 140, 98, 30, 30);
      pdf.setFont('Helvetica', 'bold');
      pdf.setFontSize(15);
      pdf.setTextColor(255, 255, 255);
      pdf.text(this.AmenitieName8, 137, 136);

      pdf.addImage(this.amenitesImages + this.AmenitieImg9, imageFormat9, 190, 98, 30, 30);
      pdf.setFont('Helvetica', 'bold');
      pdf.setFontSize(15);
      pdf.setTextColor(255, 255, 255);
      pdf.text(this.AmenitieName9, 193, 136);

      pdf.addImage(this.amenitesImages + this.AmenitieImg10, imageFormat10, 240, 98, 30, 30);
      pdf.setFont('Helvetica', 'bold');
      pdf.setFontSize(15);
      pdf.setTextColor(255, 255, 255);
      pdf.text(this.AmenitieName10, 240, 136);

      pdf.setFont('Helvetica', 'bold');
      pdf.setFontSize(30);
      pdf.setTextColor(255, 255, 255);
      pdf.text(this.propName, 95, 15);
      pdf.setFont('Helvetica', 'bold');
      pdf.setFontSize(30);
      pdf.setTextColor(255, 255, 255);
      pdf.text('Amenities', 120, 28);
      pdf.addPage();

      //page 5
      
      pdf.addImage('https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/mobile/brochure/05.png', 'PNG', 0, 0, 300, 170);
      pdf.addImage(this.masterimages + this.masterImgPath, imageFormat111, 50, 38, 200, 115);
      // 
      pdf.setFont('Helvetica', 'bold');
      pdf.setFontSize(30);
      pdf.setTextColor(255, 255, 255);
      pdf.text(this.propName, 95, 15);
      pdf.setFont('Helvetica', 'bold');
      pdf.setFontSize(30);
      pdf.setTextColor(255, 255, 255);
      pdf.text('Master Plan', 120, 28);

      //FloorPlan BHK 1

  
      if (this.PropertyOneBhkArry.length !== 0) {
        pdf.addPage();
        pdf.addImage('https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/mobile/brochure/05.png', 'PNG', 0, 0, 300, 170,undefined,'FAST');
        pdf.setFont('Helvetica', 'bold');
        pdf.setFontSize(30);
        pdf.setTextColor(255, 255, 255);
        pdf.text(this.propName, 95, 15);
        pdf.setFont('Helvetica', 'bold');
        pdf.setFontSize(30);
        pdf.setTextColor(255, 255, 255);
        pdf.text('Floor Plan', 120, 28);

        const imageUrl = this.uploadBHKImages + this.PropertyOneBhkArry[0]['FloorImage'];

        // Determine the image format from the URL or file extension
        let imageFormat = 'JPEG'; // Default format
        const fileExtension = imageUrl.split('.').pop().toLowerCase();
        if (fileExtension === 'png') {
          imageFormat = 'PNG';
        } else if (fileExtension === 'jpeg' || fileExtension === 'jpg') {
          imageFormat = 'JPEG';
        } else if (fileExtension === 'webp') {
          imageFormat = 'WEBP';
        }

        if(this.PropertyOneBhkArry.length == 1){
          pdf.addImage(this.uploadBHKImages + this.PropertyOneBhkArry[0]['FloorImage'], imageFormat, 20, 50, 80, 70,undefined,'FAST');
          pdf.setFont('Helvetica', 'bold');
          pdf.setFontSize(40);
          pdf.setTextColor(255, 255, 255);
          pdf.text(this.PropertyOneBhkArry[0]['BHK'], 30, 140);
          pdf.setFont('Helvetica', 'bold');
          pdf.setFontSize(25);
          pdf.setTextColor(255, 255, 255);
          pdf.text(this.PropertyOneBhkArry[0]['Area'], 33, 155);
        }

        if(this.PropertyOneBhkArry.length == 2){
          pdf.addImage(this.uploadBHKImages + this.PropertyOneBhkArry[0]['FloorImage'], imageFormat, 20, 50, 80, 70,undefined,'FAST');
          pdf.setFont('Helvetica', 'bold');
          pdf.setFontSize(40);
          pdf.setTextColor(255, 255, 255);
          pdf.text(this.PropertyOneBhkArry[0]['BHK'], 30, 140);
          pdf.setFont('Helvetica', 'bold');
          pdf.setFontSize(25);
          pdf.setTextColor(255, 255, 255);
          pdf.text(this.PropertyOneBhkArry[0]['Area'], 33, 155);

          pdf.addImage(this.uploadBHKImages + this.PropertyOneBhkArry[1]['FloorImage'], imageFormat, 110, 50, 80, 70,undefined,'FAST');
          pdf.setFont('Helvetica', 'bold');
          pdf.setFontSize(40);
          pdf.setTextColor(255, 255, 255);
          pdf.text(this.PropertyOneBhkArry[1]['BHK'], 125, 140);
          pdf.setFont('Helvetica', 'bold');
          pdf.setFontSize(25);
          pdf.setTextColor(255, 255, 255);
          pdf.text(this.PropertyOneBhkArry[1]['Area'], 128, 155);
        }
        
        if(this.PropertyOneBhkArry.length >= 3){
          pdf.addImage(this.uploadBHKImages + this.PropertyOneBhkArry[0]['FloorImage'], imageFormat, 20, 50, 80, 70,undefined,'FAST');
          pdf.setFont('Helvetica', 'bold');
          pdf.setFontSize(40);
          pdf.setTextColor(255, 255, 255);
          pdf.text(this.PropertyOneBhkArry[0]['BHK'], 30, 140);
          pdf.setFont('Helvetica', 'bold');
          pdf.setFontSize(25);
          pdf.setTextColor(255, 255, 255);
          pdf.text(this.PropertyOneBhkArry[0]['Area'], 33, 155);

          pdf.addImage(this.uploadBHKImages + this.PropertyOneBhkArry[1]['FloorImage'], imageFormat, 110, 50, 80, 70,undefined,'FAST');
          pdf.setFont('Helvetica', 'bold');
          pdf.setFontSize(40);
          pdf.setTextColor(255, 255, 255);
          pdf.text(this.PropertyOneBhkArry[1]['BHK'], 125, 140);
          pdf.setFont('Helvetica', 'bold');
          pdf.setFontSize(25);
          pdf.setTextColor(255, 255, 255);
          pdf.text(this.PropertyOneBhkArry[1]['Area'], 128, 155);

          pdf.addImage(this.uploadBHKImages + this.PropertyOneBhkArry[2]['FloorImage'], imageFormat, 200, 50, 80, 70,undefined,'FAST');
          pdf.setFont('Helvetica', 'bold');
          pdf.setFontSize(40);
          pdf.setTextColor(255, 255, 255);
          pdf.text(this.PropertyOneBhkArry[2]['BHK'], 215, 140);
          pdf.setFont('Helvetica', 'bold');
          pdf.setFontSize(25);
          pdf.setTextColor(255, 255, 255);
          pdf.text(this.PropertyOneBhkArry[2]['Area'], 219, 155);

        }
      }

      //FloorPlan BHK 2
      if (this.PropertyTwoBhkArry.length !== 0) {
        pdf.addPage();
        pdf.addImage('https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/mobile/brochure/05.png', 'PNG', 0, 0, 300, 170,undefined,'FAST');
        pdf.setFont('Helvetica', 'bold');
        pdf.setFontSize(30);
        pdf.setTextColor(255, 255, 255);
        pdf.text(this.propName, 95, 15);
        pdf.setFont('Helvetica', 'bold');
        pdf.setFontSize(30);
        pdf.setTextColor(255, 255, 255);
        pdf.text('Floor Plan', 120, 28);

        const imageUrl = this.uploadBHKImages + this.PropertyTwoBhkArry[0]['FloorImage'];

        // Determine the image format from the URL or file extension
        let imageFormat = 'JPEG'; // Default format
        const fileExtension = imageUrl.split('.').pop().toLowerCase();
        if (fileExtension === 'png') {
          imageFormat = 'PNG';
        } else if (fileExtension === 'jpeg' || fileExtension === 'jpg') {
          imageFormat = 'JPEG';
        } else if (fileExtension === 'webp') {
          imageFormat = 'WEBP';
        }

        if(this.PropertyTwoBhkArry.length == 1){
          pdf.addImage(this.uploadBHKImages + this.PropertyTwoBhkArry[0]['FloorImage'], imageFormat, 20, 50, 80, 70,undefined,'FAST');
          pdf.setFont('Helvetica', 'bold');
          pdf.setFontSize(40);
          pdf.setTextColor(255, 255, 255);
          pdf.text(this.PropertyTwoBhkArry[0]['BHK'], 30, 140);
          pdf.setFont('Helvetica', 'bold');
          pdf.setFontSize(25);
          pdf.setTextColor(255, 255, 255);
          pdf.text(this.PropertyTwoBhkArry[0]['Area'], 33, 155);
        }
        
        if(this.PropertyTwoBhkArry.length == 2){
          pdf.addImage(this.uploadBHKImages + this.PropertyTwoBhkArry[0]['FloorImage'], imageFormat, 20, 50, 80, 70,undefined,'FAST');
          pdf.setFont('Helvetica', 'bold');
          pdf.setFontSize(40);
          pdf.setTextColor(255, 255, 255);
          pdf.text(this.PropertyTwoBhkArry[0]['BHK'], 30, 140);
          pdf.setFont('Helvetica', 'bold');
          pdf.setFontSize(25);
          pdf.setTextColor(255, 255, 255);
          pdf.text(this.PropertyTwoBhkArry[0]['Area'], 33, 155);

          pdf.addImage(this.uploadBHKImages + this.PropertyTwoBhkArry[1]['FloorImage'], imageFormat, 110, 50, 80, 70,undefined,'FAST');
          pdf.setFont('Helvetica', 'bold');
          pdf.setFontSize(40);
          pdf.setTextColor(255, 255, 255);
          pdf.text(this.PropertyTwoBhkArry[1]['BHK'], 125, 140);
          pdf.setFont('Helvetica', 'bold');
          pdf.setFontSize(25);
          pdf.setTextColor(255, 255, 255);
          pdf.text(this.PropertyTwoBhkArry[1]['Area'], 128, 155);
        }
        
        if(this.PropertyTwoBhkArry.length >= 3){
          pdf.addImage(this.uploadBHKImages + this.PropertyTwoBhkArry[0]['FloorImage'], imageFormat, 20, 50, 80, 70,undefined,'FAST');
          pdf.setFont('Helvetica', 'bold');
          pdf.setFontSize(40);
          pdf.setTextColor(255, 255, 255);
          pdf.text(this.PropertyTwoBhkArry[0]['BHK'], 30, 140);
          pdf.setFont('Helvetica', 'bold');
          pdf.setFontSize(25);
          pdf.setTextColor(255, 255, 255);
          pdf.text(this.PropertyTwoBhkArry[0]['Area'], 33, 155);

          pdf.addImage(this.uploadBHKImages + this.PropertyTwoBhkArry[1]['FloorImage'], imageFormat, 110, 50, 80, 70,undefined,'FAST');
          pdf.setFont('Helvetica', 'bold');
          pdf.setFontSize(40);
          pdf.setTextColor(255, 255, 255);
          pdf.text(this.PropertyTwoBhkArry[1]['BHK'], 125, 140);
          pdf.setFont('Helvetica', 'bold');
          pdf.setFontSize(25);
          pdf.setTextColor(255, 255, 255);
          pdf.text(this.PropertyTwoBhkArry[1]['Area'], 128, 155);

          pdf.addImage(this.uploadBHKImages + this.PropertyTwoBhkArry[2]['FloorImage'], imageFormat, 200, 50, 80, 70,undefined,'FAST');
          pdf.setFont('Helvetica', 'bold');
          pdf.setFontSize(40);
          pdf.setTextColor(255, 255, 255);
          pdf.text(this.PropertyTwoBhkArry[2]['BHK'], 215, 140);
          pdf.setFont('Helvetica', 'bold');
          pdf.setFontSize(25);
          pdf.setTextColor(255, 255, 255);
          pdf.text(this.PropertyTwoBhkArry[2]['Area'], 219, 155); 
        }
        
      }

      //FloorPlan BHK 3
      if (this.PropertyThreeBhkArry.length !== 0) {
        pdf.addPage();
        pdf.addImage('https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/mobile/brochure/05.png', 'PNG', 0, 0, 300, 170,undefined,'FAST');
        pdf.setFont('Helvetica', 'bold');
        pdf.setFontSize(30);
        pdf.setTextColor(255, 255, 255);
        pdf.text(this.propName, 95, 15);
        pdf.setFont('Helvetica', 'bold');
        pdf.setFontSize(30);
        pdf.setTextColor(255, 255, 255);
        pdf.text('Floor Plan', 120, 28);


        const imageUrl = this.uploadBHKImages + this.PropertyThreeBhkArry[0]['FloorImage'];

        // Determine the image format from the URL or file extension
        let imageFormat = 'JPEG'; // Default format
        const fileExtension = imageUrl.split('.').pop().toLowerCase();
        if (fileExtension === 'png') {
          imageFormat = 'PNG';
        } else if (fileExtension === 'jpeg' || fileExtension === 'jpg') {
          imageFormat = 'JPEG';
        } else if (fileExtension === 'webp') {
          imageFormat = 'WEBP';
        }

        if(this.PropertyThreeBhkArry.length == 1){
          pdf.addImage(this.uploadBHKImages + this.PropertyThreeBhkArry[0]['FloorImage'], imageFormat, 20, 50, 80, 70,undefined,'FAST');
          pdf.setFont('Helvetica', 'bold');
          pdf.setFontSize(40);
          pdf.setTextColor(255, 255, 255);
          pdf.text(this.PropertyThreeBhkArry[0]['BHK'], 30, 140);
          pdf.setFont('Helvetica', 'bold');
          pdf.setFontSize(25);
          pdf.setTextColor(255, 255, 255);
          pdf.text(this.PropertyThreeBhkArry[0]['Area'], 31, 155);
        }
        
        if(this.PropertyThreeBhkArry.length == 2){
          pdf.addImage(this.uploadBHKImages + this.PropertyThreeBhkArry[0]['FloorImage'], imageFormat, 20, 50, 80, 70,undefined,'FAST');
          pdf.setFont('Helvetica', 'bold');
          pdf.setFontSize(40);
          pdf.setTextColor(255, 255, 255);
          pdf.text(this.PropertyThreeBhkArry[0]['BHK'], 30, 140);
          pdf.setFont('Helvetica', 'bold');
          pdf.setFontSize(25);
          pdf.setTextColor(255, 255, 255);
          pdf.text(this.PropertyThreeBhkArry[0]['Area'], 31, 155);

          pdf.addImage(this.uploadBHKImages + this.PropertyThreeBhkArry[1]['FloorImage'], imageFormat, 110, 50, 80, 70,undefined,'FAST');
          pdf.setFont('Helvetica', 'bold');
          pdf.setFontSize(40);
          pdf.setTextColor(255, 255, 255);
          pdf.text(this.PropertyThreeBhkArry[1]['BHK'], 125, 140);
          pdf.setFont('Helvetica', 'bold');
          pdf.setFontSize(25);
          pdf.setTextColor(255, 255, 255);
          pdf.text(this.PropertyThreeBhkArry[1]['Area'], 128, 155);
        }
        
        if(this.PropertyThreeBhkArry.length >= 3){
          pdf.addImage(this.uploadBHKImages + this.PropertyThreeBhkArry[0]['FloorImage'], imageFormat, 20, 50, 80, 70,undefined,'FAST');
          pdf.setFont('Helvetica', 'bold');
          pdf.setFontSize(40);
          pdf.setTextColor(255, 255, 255);
          pdf.text(this.PropertyThreeBhkArry[0]['BHK'], 30, 140);
          pdf.setFont('Helvetica', 'bold');
          pdf.setFontSize(25);
          pdf.setTextColor(255, 255, 255);
          pdf.text(this.PropertyThreeBhkArry[0]['Area'], 31, 155);

          pdf.addImage(this.uploadBHKImages + this.PropertyThreeBhkArry[1]['FloorImage'], imageFormat, 110, 50, 80, 70,undefined,'FAST');
          pdf.setFont('Helvetica', 'bold');
          pdf.setFontSize(40);
          pdf.setTextColor(255, 255, 255);
          pdf.text(this.PropertyThreeBhkArry[1]['BHK'], 125, 140);
          pdf.setFont('Helvetica', 'bold');
          pdf.setFontSize(25);
          pdf.setTextColor(255, 255, 255);
          pdf.text(this.PropertyThreeBhkArry[1]['Area'], 128, 155);

          pdf.addImage(this.uploadBHKImages + this.PropertyThreeBhkArry[2]['FloorImage'], imageFormat, 200, 50, 80, 70,undefined,'FAST');
          pdf.setFont('Helvetica', 'bold');
          pdf.setFontSize(40);
          pdf.setTextColor(255, 255, 255);
          pdf.text(this.PropertyThreeBhkArry[2]['BHK'], 215, 140);
          pdf.setFont('Helvetica', 'bold');
          pdf.setFontSize(25);
          pdf.setTextColor(255, 255, 255);
          pdf.text(this.PropertyThreeBhkArry[2]['Area'], 219, 155);

        }
        
      }

      //FloorPlan BHK 4
      if (this.PropertyFourBhkArry.length !== 0) {
        pdf.addPage();
        pdf.addImage('https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/mobile/brochure/05.png', 'PNG', 0, 0, 300, 170,undefined,'FAST');
        pdf.setFont('Helvetica', 'bold');
        pdf.setFontSize(30);
        pdf.setTextColor(255, 255, 255);
        pdf.text(this.propName, 95, 15);
        pdf.setFont('Helvetica', 'bold');
        pdf.setFontSize(30);
        pdf.setTextColor(255, 255, 255);
        pdf.text('Floor Plan', 120, 28);

        const imageUrl = this.uploadBHKImages + this.PropertyFourBhkArry[0]['FloorImage'];

        // Determine the image format from the URL or file extension
        let imageFormat = 'JPEG'; // Default format
        const fileExtension = imageUrl.split('.').pop().toLowerCase();
        if (fileExtension === 'png') {
          imageFormat = 'PNG';
        } else if (fileExtension === 'jpeg' || fileExtension === 'jpg') {
          imageFormat = 'JPEG';
        } else if (fileExtension === 'webp') {
          imageFormat = 'WEBP';
        }

        if(this.PropertyFourBhkArry.length == 1){
          pdf.addImage(this.uploadBHKImages + this.PropertyFourBhkArry[0]['FloorImage'], imageFormat, 20, 50, 80, 70,undefined,'FAST');
          pdf.setFont('Helvetica', 'bold');
          pdf.setFontSize(40);
          pdf.setTextColor(255, 255, 255);
          pdf.text(this.PropertyFourBhkArry[0]['BHK'], 30, 140);
          pdf.setFont('Helvetica', 'bold');
          pdf.setFontSize(25);
          pdf.setTextColor(255, 255, 255);
          pdf.text(this.PropertyFourBhkArry[0]['Area'], 31, 155);
        }

        if(this.PropertyFourBhkArry.length == 2){
          pdf.addImage(this.uploadBHKImages + this.PropertyFourBhkArry[0]['FloorImage'], imageFormat, 20, 50, 80, 70,undefined,'FAST');
          pdf.setFont('Helvetica', 'bold');
          pdf.setFontSize(40);
          pdf.setTextColor(255, 255, 255);
          pdf.text(this.PropertyFourBhkArry[0]['BHK'], 30, 140);
          pdf.setFont('Helvetica', 'bold');
          pdf.setFontSize(25);
          pdf.setTextColor(255, 255, 255);
          pdf.text(this.PropertyFourBhkArry[0]['Area'], 31, 155);

          pdf.addImage(this.uploadBHKImages + this.PropertyFourBhkArry[1]['FloorImage'], imageFormat, 110, 50, 80, 70,undefined,'FAST');
          pdf.setFont('Helvetica', 'bold');
          pdf.setFontSize(40);
          pdf.setTextColor(255, 255, 255);
          pdf.text(this.PropertyFourBhkArry[1]['BHK'], 125, 140);
          pdf.setFont('Helvetica', 'bold');
          pdf.setFontSize(25);
          pdf.setTextColor(255, 255, 255);
          pdf.text(this.PropertyFourBhkArry[1]['Area'], 128, 155);
        }
        
        if(this.PropertyFourBhkArry.length >= 3){
          pdf.addImage(this.uploadBHKImages + this.PropertyFourBhkArry[0]['FloorImage'], imageFormat, 20, 50, 80, 70,undefined,'FAST');
          pdf.setFont('Helvetica', 'bold');
          pdf.setFontSize(40);
          pdf.setTextColor(255, 255, 255);
          pdf.text(this.PropertyFourBhkArry[0]['BHK'], 30, 140);
          pdf.setFont('Helvetica', 'bold');
          pdf.setFontSize(25);
          pdf.setTextColor(255, 255, 255);
          pdf.text(this.PropertyFourBhkArry[0]['Area'], 31, 155);

          pdf.addImage(this.uploadBHKImages + this.PropertyFourBhkArry[1]['FloorImage'], imageFormat, 110, 50, 80, 70,undefined,'FAST');
          pdf.setFont('Helvetica', 'bold');
          pdf.setFontSize(40);
          pdf.setTextColor(255, 255, 255);
          pdf.text(this.PropertyFourBhkArry[1]['BHK'], 125, 140);
          pdf.setFont('Helvetica', 'bold');
          pdf.setFontSize(25);
          pdf.setTextColor(255, 255, 255);
          pdf.text(this.PropertyFourBhkArry[1]['Area'], 128, 155);

          pdf.addImage(this.uploadBHKImages + this.PropertyFourBhkArry[2]['FloorImage'], imageFormat, 200, 50, 80, 70,undefined,'FAST');
          pdf.setFont('Helvetica', 'bold');
          pdf.setFontSize(40);
          pdf.setTextColor(255, 255, 255);
          pdf.text(this.PropertyFourBhkArry[2]['BHK'], 215, 140);
          pdf.setFont('Helvetica', 'bold');
          pdf.setFontSize(25);
          pdf.setTextColor(255, 255, 255);
          pdf.text(this.PropertyFourBhkArry[2]['Area'], 219, 155);
        }
      }

      //FloorPlan BHK 5
      if (this.PropertyFiveBhkArry.length !== 0) {
        pdf.addPage();
        pdf.addImage('https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/mobile/brochure/05.png', 'PNG', 0, 0, 300, 170,undefined,'FAST');
        pdf.setFont('Helvetica', 'bold');
        pdf.setFontSize(30);
        pdf.setTextColor(255, 255, 255);
        pdf.text(this.propName, 95, 15);
        pdf.setFont('Helvetica', 'bold');
        pdf.setFontSize(30);
        pdf.setTextColor(255, 255, 255);
        pdf.text('Floor Plan', 120, 28);

        const imageUrl = this.uploadBHKImages + this.PropertyFiveBhkArry[0]['FloorImage'];

        // Determine the image format from the URL or file extension
        let imageFormat = 'JPEG'; // Default format
        const fileExtension = imageUrl.split('.').pop().toLowerCase();
        if (fileExtension === 'png') {
          imageFormat = 'PNG';
        } else if (fileExtension === 'jpeg' || fileExtension === 'jpg') {
          imageFormat = 'JPEG';
        } else if (fileExtension === 'webp') {
          imageFormat = 'WEBP';
        }
        

        if(this.PropertyFiveBhkArry.length == 1){
          pdf.addImage(this.uploadBHKImages + this.PropertyFiveBhkArry[0]['FloorImage'], imageFormat, 20, 50, 80, 70,undefined,'FAST');
          pdf.setFont('Helvetica', 'bold');
          pdf.setFontSize(40);
          pdf.setTextColor(255, 255, 255);
          pdf.text(this.PropertyFiveBhkArry[0]['BHK'], 30, 140);
          pdf.setFont('Helvetica', 'bold');
          pdf.setFontSize(25);
          pdf.setTextColor(255, 255, 255);
          pdf.text(this.PropertyFiveBhkArry[0]['Area'], 31, 155);
        }
        
        if(this.PropertyFiveBhkArry.length == 2){
          pdf.addImage(this.uploadBHKImages + this.PropertyFiveBhkArry[0]['FloorImage'], imageFormat, 20, 50, 80, 70,undefined,'FAST');
          pdf.setFont('Helvetica', 'bold');
          pdf.setFontSize(40);
          pdf.setTextColor(255, 255, 255);
          pdf.text(this.PropertyFiveBhkArry[0]['BHK'], 30, 140);
          pdf.setFont('Helvetica', 'bold');
          pdf.setFontSize(25);
          pdf.setTextColor(255, 255, 255);
          pdf.text(this.PropertyFiveBhkArry[0]['Area'], 31, 155);

          pdf.addImage(this.uploadBHKImages + this.PropertyFiveBhkArry[1]['FloorImage'], imageFormat, 110, 50, 80, 70,undefined,'FAST');
          pdf.setFont('Helvetica', 'bold');
          pdf.setFontSize(40);
          pdf.setTextColor(255, 255, 255);
          pdf.text(this.PropertyFiveBhkArry[1]['BHK'], 125, 140);
          pdf.setFont('Helvetica', 'bold');
          pdf.setFontSize(25);
          pdf.setTextColor(255, 255, 255);
          pdf.text(this.PropertyFiveBhkArry[1]['Area'], 128, 155);
        }

        if(this.PropertyFiveBhkArry.length >= 3){
          pdf.addImage(this.uploadBHKImages + this.PropertyFiveBhkArry[0]['FloorImage'], imageFormat, 20, 50, 80, 70,undefined,'FAST');
          pdf.setFont('Helvetica', 'bold');
          pdf.setFontSize(40);
          pdf.setTextColor(255, 255, 255);
          pdf.text(this.PropertyFiveBhkArry[0]['BHK'], 30, 140);
          pdf.setFont('Helvetica', 'bold');
          pdf.setFontSize(25);
          pdf.setTextColor(255, 255, 255);
          pdf.text(this.PropertyFiveBhkArry[0]['Area'], 31, 155);

          pdf.addImage(this.uploadBHKImages + this.PropertyFiveBhkArry[1]['FloorImage'], imageFormat, 110, 50, 80, 70,undefined,'FAST');
          pdf.setFont('Helvetica', 'bold');
          pdf.setFontSize(40);
          pdf.setTextColor(255, 255, 255);
          pdf.text(this.PropertyFiveBhkArry[1]['BHK'], 125, 140);
          pdf.setFont('Helvetica', 'bold');
          pdf.setFontSize(25);
          pdf.setTextColor(255, 255, 255);
          pdf.text(this.PropertyFiveBhkArry[1]['Area'], 128, 155);

          pdf.addImage(this.uploadBHKImages + this.PropertyFiveBhkArry[2]['FloorImage'], imageFormat, 200, 50, 80, 70,undefined,'FAST');
          pdf.setFont('Helvetica', 'bold');
          pdf.setFontSize(40);
          pdf.setTextColor(255, 255, 255);
          pdf.text(this.PropertyFiveBhkArry[2]['BHK'], 215, 140);
          pdf.setFont('Helvetica', 'bold');
          pdf.setFontSize(25);
          pdf.setTextColor(255, 255, 255);
          pdf.text(this.PropertyFiveBhkArry[2]['Area'], 219, 155);
        }
      }

      pdf.addPage();
      pdf.addImage('https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/mobile/images/brochure/Last-page.png', 'PNG', 0, 0, 300, 170);
      pdf.save(this.propName+'-Homes247.pdf'); // Generated PDF
      pdf.output('dataurlnewwindow');
      // this._location.back();
    });
  }
}
