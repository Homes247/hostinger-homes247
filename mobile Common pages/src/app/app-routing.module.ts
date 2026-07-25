import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  // { path: '', redirectTo: '/', pathMatch: 'full' },
  // { path: 'home', component: HomeComponent },
  // { path: 'about', component: AboutComponent },

  { path: '404', loadChildren: () => import('./not-found/not-found.module').then(m => m.NotFoundModule) },
  { path: '410', loadChildren: () => import('./not-found-410/not-found-410.module').then(m => m.NotFoundModule410) },

  { path: 'download-brochure/:id', loadChildren: () => import('./pdfgenerate/pdfgenerate.module').then(m => m.PdfgenerateModule) },

  {
    path: 'city-overview/:city-overview',
    loadChildren: () => import('./city-home/city-home.module').then(m => m.CityHomeModule)
  },
  {
    path: 'builder-overview/:builder-city-overview-id',

    loadChildren: () => import('./sitemap-builder-overview/sitemap-builder-overview.module').then(m => m.SitemapBuilderOverviewModule)
  },
  { path: 'homes-elite', loadChildren: () => import('./homes-elite/homes-elite.module').then(m => m.HomesEliteModule) },

  // ############################### IFSC BANK SECTION ############################### 
  { path: 'find-ifsc-code', loadChildren: () => import('./bank-main/bank-main.module').then(m => m.BankMainModule) },
  { path: 'find-ifsc-code/:alphabet', loadChildren: () => import('./bank-main/bank-main.module').then(m => m.BankMainModule) },
  { path: 'all-ifsc-and-micr-code/:Bankname', loadChildren: () => import('./bank-state/bank-state.module').then(m => m.BankStateModule) },
  { path: 'all-ifsc-and-micr-code/:Bankname/:Statename', loadChildren: () => import('./bank-city/bank-city.module').then(m => m.IfscCityModule) },
  { path: 'all-ifsc-and-micr-code/:Bankname/:Statename/:Cityname', loadChildren: () => import('./bank-ifsc-branch/bank-ifsc-branch.module').then(m => m.IfscBranchModule) },
  { path: 'all-ifsc-and-micr-code/:Bankname/:Statename/:Cityname/:Details/:Id', loadChildren: () => import('./bank-ifsc-details/bank-ifsc-details.mdule').then(m => m.IfscDetailsModule) },

  // { path: 'ifsc/all-ifsc-and-micr-code/:Bankname/:Statename/:Cityname/:Id', loadChildren: () => import('./bank-ifsc-details/bank-ifsc-details.mdule').then(m => m.IfscDetailsModule) }, 
  // ############################### IFSC BANK SECTION ############################### 


  // Pin Code Routing 

  { path: 'find-pincode', loadChildren: () => import('./pincode-main/pincode-main.module').then(m => m.PincodModule) },
  { path: 'find-all-pincodes/:State_Name', loadChildren: () => import('./pin-code1/pin-code1.module').then(m => m.Pincod1Module) },
  { path: 'find-all-pincodes/:State_Name/:City_Name', loadChildren: () => import('./pin-code2/pin-code2.module').then(m => m.Pincode2Module) },
  { path: 'find-all-pincodes/:State_Name/:City_Name/:Taluk_Name', loadChildren: () => import('./pin-code3/pin-code3.module').then(m => m.Pincode3Module) },
  { path: 'pincode/:State_Name/:City_Name/:Taluk_Name/:Branch_Name/:Id', loadChildren: () => import('./pin-code4/pin-code4.module').then(m => m.Pincode4Module) },

  // Pin Code Routing 

  { path: 'all-project-walkthrough-videos-in-india', loadChildren: () => import('./review-project-videos/review-project-videos.module').then(m => m.ReviewProjectVideosModule) },
  { path: 'pcv/:project-walkthrough-videos-in-:cityname', loadChildren: () => import('./review-project-videos/review-project-videos.module').then(m => m.ReviewProjectVideosModule) },
  { path: 'pclv/:project-walkthrough-videos-in-:loclityname-:cityname-:localityId', loadChildren: () => import('./review-project-videos/review-project-videos.module').then(m => m.ReviewProjectVideosModule) },


  { path: 'all-project-reviews-in-india', loadChildren: () => import('./reviewpage-projects/reviewpage-projects.module').then(m => m.ReviewPageProjectsModule) },
  { path: 'pcr/:project-reviews-in-:cityname', loadChildren: () => import('./reviewpage-projects/reviewpage-projects.module').then(m => m.ReviewPageProjectsModule) },
  { path: 'pclr/:project-reviews-in-:loclityname-:cityname-:localityId', loadChildren: () => import('./reviewpage-projects/reviewpage-projects.module').then(m => m.ReviewPageProjectsModule) },
  { path: 'prd/:rating-and-reviews-of-:propName-:propID', loadChildren: () => import('./review-project-one/review-project-one.module').then(m => m.ReviewProjectOneModule) },
  { path: 'samLogin', loadChildren: () => import('./otp-login-new/otp-login-new.moduel').then(m => m.OtpLoginNewModule) },

  { path: 'all-locality-reviews-in-india', loadChildren: () => import('./reviewpage-localities/reviewpage-localities.module').then(m => m.ReviewPageLocalitiesModule) },
  { path: 'lcr/:locality-reviews-in-:cityname', loadChildren: () => import('./reviewpage-localities/reviewpage-localities.module').then(m => m.ReviewPageLocalitiesModule) },
  { path: 'lrd/:rating-and-reviews-of-:localityName-:locaId-:cityId', loadChildren: () => import('./review-locality-one/review-locality-one.module').then(m => m.ReviewLocalityOneModule) },
  // {path: 'lrd/:rating-and-reviews-of-:localityName-:locaId-:cityId', loadChildren:()=> import('./review-locality-one/review-locality-one.module').then(m=> m.ReviewLocalityOneModule)}, 
  {
    path: 'locality-overview/:locality-in-:city-overview-:id-:cityId',
    loadChildren: () => import('./locality-overview/locality-overview.module').then(m => m.LocalityOverviewModule)
  },



  // ############################### WEBSITE SITEMAP PAGES STARTS ###############################

  { path: 'all-cities-in-india', loadChildren: () => import('./sitemap/sitemap.module').then(m => m.SitemapModule) },
  { path: 'all-cities-in-india/:default', loadChildren: () => import('./sitemap/sitemap.module').then(m => m.SitemapModule) },
  { path: 'all-localities-by-city', loadChildren: () => import('./sitemap-all-localitiesbycity/sitemap-all-localitiesbycity.module').then(m => m.SitemapAllLocalitiesbycityModule) },
  { path: 'all-localities-by-city/:default', loadChildren: () => import('./sitemap-all-localitiesbycity/sitemap-all-localitiesbycity.module').then(m => m.SitemapAllLocalitiesbycityModule) },
  { path: 'all-localities-by-city/:city/:id', loadChildren: () => import('./sitemap_city/sitemap_city.module').then(m => m.SitemapCityModule) },
  { path: 'all-localities-by-city/:city/:default/:id', loadChildren: () => import('./sitemap_city/sitemap_city.module').then(m => m.SitemapCityModule) },
  { path: 'all-builders-by-city', loadChildren: () => import('./sitemap-all-buildersbycity/sitemap-all-buildersbycity.module').then(m => m.SitemapAllBuildersbycityModule) },
  { path: 'all-builders-by-city/:default', loadChildren: () => import('./sitemap-all-buildersbycity/sitemap-all-buildersbycity.module').then(m => m.SitemapAllBuildersbycityModule) },
  { path: 'all-builders-by-city/:city/:id', loadChildren: () => import('./sitemap_builders/sitemap_builders.module').then(m => m.SitemapBuildersModule) },
  { path: 'all-builders-by-city/:city/:default/:id', loadChildren: () => import('./sitemap_builders/sitemap_builders.module').then(m => m.SitemapBuildersModule) },
  { path: 'blogsitemap', loadChildren: () => import('./sitemap_blogs/sitemap_blogs.module').then(m => m.SitemapblogsModule) },
  { path: 'rentalsitemap', loadChildren: () => import('./sitemap_rental/sitemap_rental.module').then(m => m.SitemaprentalModule) },
  { path: 'commercialsitemap', loadChildren: () => import('./sitemap-commercial/sitemap-commercial.module').then(m => m.SitemapCommercialModule) },
  { path: 'all-localities-by-commercial-city/:city/:id', loadChildren: () => import('./sitemap-commercial-locality/sitemap-commercial-locality.module').then(m => m.SitemapCommercialLocalityModule) },
  { path: 'all-localities-by-commercial-city/:city/:default/:id', loadChildren: () => import('./sitemap-commercial-locality/sitemap-commercial-locality.module').then(m => m.SitemapCommercialLocalityModule) },
  { path: 'pgsitemap', loadChildren: () => import('./pg-sitemap/pg-sitemap.module').then(m => m.PgSitemapModule) },
  { path: 'all-localities-by-pg-city/:city/:id', loadChildren: () => import('./pg-locality-sitemap/pg-locality-sitemap.module').then(m => m.PgLocalitySitemapModule) },
  { path: 'all-localities-by-pg-city/:city/:default/:id', loadChildren: () => import('./pg-locality-sitemap/pg-locality-sitemap.module').then(m => m.PgLocalitySitemapModule) },

  // ############################### WEBSITE SITEMAP PAGES ENDS ###############################



  // ############################### CITY HOMEPAGE CATEGORY STARTS ###############################

  { path: 'real-estate-in-bangalore', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'real-estate-in-hyderabad', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'real-estate-in-chennai', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'real-estate-in-kochi', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'real-estate-in-pune', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'real-estate-in-mumbai', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'real-estate-in-delhi', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'real-estate-in-kolkata', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'real-estate-in-goa', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'real-estate-in-gurgaon', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'real-estate-in-mysore', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'real-estate-in-coimbatore', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'real-estate-in-ahmedabad', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'real-estate-in-trivandrum', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'real-estate-in-navi-mumbai', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'real-estate-in-noida', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'real-estate-in-greater', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'real-estate-in-bhubaneshwar', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'real-estate-in-vijayawada', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'real-estate-in-bhopal', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'real-estate-in-indore', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'real-estate-in-vizag', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'real-estate-in-amaravati', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'real-estate-in-thrissur', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'real-estate-in-tirupati', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'real-estate-in-lucknow', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'real-estate-in-nashik', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'real-estate-in-mangalore', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'real-estate-in-nagpur', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'real-estate-in-jaipur', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'real-estate-in-nellore', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'real-estate-in-faridabad', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'real-estate-in-chandigarh', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'real-estate-in-dehradun', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'real-estate-in-ghaziabad', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'real-estate-in-ranchi', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'real-estate-in-agra', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'real-estate-in-durgapur', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'real-estate-in-vizianagaram', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'real-estate-in-amritsar', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'real-estate-in-patna', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'real-estate-in-surat', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'real-estate-in-guntur', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'real-estate-in-aurangabad', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'real-estate-in-guwahati', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'real-estate-in-ludhiana', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'real-estate-in-dharwad', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'real-estate-in-kolhapur', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'real-estate-in-mohali', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'real-estate-in-kanpur', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'real-estate-in-thane', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'real-estate-in-jamshedpur', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'real-estate-in-belgaum', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'real-estate-in-puri', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'real-estate-in-meerut', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'real-estate-in-tiruvannamalai', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'real-estate-in-satara', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'real-estate-in-junagadh', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'real-estate-in-vadodara', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'real-estate-in-palwal', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'real-estate-in-panchkula', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'real-estate-in-panipat', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'real-estate-in-calicut', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'real-estate-in-pathanamthitta', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'real-estate-in-haridwar', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'real-estate-in-solan', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'real-estate-in-burhanpur', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'real-estate-in-raipur', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'real-estate-in-kanchipuram', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'real-estate-in-pondicherry', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'real-estate-in-siliguri', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'real-estate-in-gandhinagar', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'real-estate-in-ajmer', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'real-estate-in-varanasi', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'real-estate-in-mathura', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'real-estate-in-dindigul', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'real-estate-in-rewari', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'real-estate-in-solapur', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'real-estate-in-ratnagiri', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'real-estate-in-purba-medinipur', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'real-estate-in-shantiniketan', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'real-estate-in-rishikesh', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'real-estate-in-rajkot', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'real-estate-in-hapur', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'real-estate-in-chamarajanagar', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'real-estate-in-gulbarga', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'real-estate-in-alwar', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'real-estate-in-tirunelveli', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'real-estate-in-raigad', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'real-estate-in-sangli', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'real-estate-in-greater-noida', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'real-estate-in-ayodhya', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'real-estate-in-bhiwadi', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'real-estate-in-kottayam', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'real-estate-in-kannur', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'real-estate-in-neemrana', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'real-estate-in-thanjavur', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'real-estate-in-kota', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'real-estate-in-bilaspur', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'real-estate-in-navsari', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'real-estate-in-davanegere', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'real-estate-in-jabalpur', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'real-estate-in-gwalior', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'real-estate-in-ujjain', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'real-estate-in-salem', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'real-estate-in-erode', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'real-estate-in-thoothukudi', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'real-estate-in-bareilly', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'real-estate-in-jhansi', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'real-estate-in-tiruchirappalli', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'real-estate-in-hosur', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'real-estate-in-madurai', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'real-estate-in-namakkal', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'real-estate-in-tiruppur', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'real-estate-in-vellore', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'real-estate-in-viluppuram', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'real-estate-in-koonimedu', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'real-estate-in-theni', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'real-estate-in-kotagiri', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'real-estate-in-krishnagri', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },

  // ############################### CITY HOMEPAGE CATEGORY ENDS ###############################

  // ############################### STATIC PAGES CATEGORY STARTS ###############################

  { path: 'awards', loadChildren: () => import('./award/award.module').then(m => m.AwardModule) },
  { path: 'happy-customers', loadChildren: () => import('./testimonial/testimonial.module').then(m => m.TestimonialModule) },
  { path: 'aboutus', loadChildren: () => import('./about/about.module').then(m => m.AboutModule) },
  // { path: 'offers', loadChildren: () => import('./bestoffers/bestoffers.module').then(m => m.BestoffersModule), },
  // { path: 'buy', loadChildren: () => import('./buy/buy.module').then(m => m.BuyModule), },
  // { path: 'buyers-guide', loadChildren: () => import('./buyers/buyers.module').then(m => m.BuyersModule), },
  // { path: 'careers', loadChildren: () => import('./careers/careers.module').then(m => m.CareersModule), },
  // ########################### Angular 20 #####################################
  // { path: 'careers', loadChildren: () => import('./careers-home-page/careers-home-page.module').then(m => m.CareersHomeModule), },
  // { path: 'careers/:details-:jobId', loadChildren: () => import('./career-details/career-details.module').then(m => m.CareersDetailsModule), },
  // ############################# Angular 20 ##################################
  { path: 'contactus', loadChildren: () => import('./contact/contactus.module').then(m => m.ContactModule), },
  // { path: 'calculator', loadChildren: () => import('./emi/emi.module').then(m => m.EmiModule), },
  // { path: 'events', loadChildren: () => import('./event/event.module').then(m => m.EventModule), },
  { path: 'expertservices', loadChildren: () => import('./expert-service/expert-service.module').then(m => m.ExpertServiceModule), },
  { path: 'expertservices/floor-plan-experts-1', loadChildren: () => import('./expert-service/expert-service.module').then(m => m.ExpertServiceModule), },
  { path: 'expertservices/market-experts-2', loadChildren: () => import('./expert-service/expert-service.module').then(m => m.ExpertServiceModule), },
  { path: 'expertservices/vastu-experts-3', loadChildren: () => import('./expert-service/expert-service.module').then(m => m.ExpertServiceModule), },
  { path: 'expertservices/legal-services-4', loadChildren: () => import('./expert-service/expert-service.module').then(m => m.ExpertServiceModule), },
  { path: 'expertservices/home-inspection-services-5', loadChildren: () => import('./expert-service/expert-service.module').then(m => m.ExpertServiceModule), },
  { path: 'expertservices/property-manage-experts-6', loadChildren: () => import('./expert-service/expert-service.module').then(m => m.ExpertServiceModule), },
  { path: 'expertservices/interior-services-7', loadChildren: () => import('./expert-service/expert-service.module').then(m => m.ExpertServiceModule), },
  { path: 'expertservices/loan-services-8', loadChildren: () => import('./expert-service/expert-service.module').then(m => m.ExpertServiceModule), },
  { path: 'expertservices/:expIn/:expDetails-:expertId', loadChildren: () => import('./expert-details/expert-details.module').then(m => m.ExpertDetailsModule), },
  { path: 'faq', loadChildren: () => import('./faq/faq.module').then(m => m.FaqModule), },
  // { path: 'homeloan', loadChildren: () => import('./homeloan/homeloan.module').then(m => m.HomeloanModule), },
  // { path: 'homes-on-wheels', loadChildren: () => import('./homes-on-wheels/homes-on-wheels.module').then(m => m.HomesOnWheelsModule), },
  // { path: 'interior', loadChildren: () => import('./interiors/interiors.module').then(m => m.InteriorsModule), },
  // { path: 'latest-trends', loadChildren: () => import('./latest-trends/latest-trends.module').then(m => m.LatestTrendsModule), },
  // { path: 'price-trends', loadChildren: () => import('./price-trends/price-trends.module').then(m => m.PriceTrendsModule), },
  { path: 'policy', loadChildren: () => import('./privacy/privacy.module').then(m => m.PrivacyModule), },
  // { path: 'rera', loadChildren: () => import('./rera/rera.module').then(m => m.ReraModule), },
  // { path: 'vaastu', loadChildren: () => import('./vaastu/vaastu.module').then(m => m.VaastuModule), },
  { path: 'compare-properties', loadChildren: () => import('./compare-property/compare-property.module').then(m => m.ComparePropertyModule) },
  { path: 'online-property-and-home-buying', loadChildren: () => import('./online-expo/online-expo.module').then(m => m.OnlineExpoModule) },
  { path: 'how-to-post-property-free-for-rent-sale', loadChildren: () => import('./post-property-guidelines/post-property-guidelines.module').then(m => m.PostPropertyGuidelinesModule), },
  { path: 'post-property-free-rent-sale', loadChildren: () => import('./post-property-landing/post-property-landing.module').then(m => m.PostPropertyLandingModule), },
  { path: 'free-classified-ads-posting-sites', loadChildren: () => import('./post-landing1/post-landing1.module').then(m => m.PostLanding1Module), },
  { path: 'free-property-ads-posting-site', loadChildren: () => import('./post-landing2/post-landing2.module').then(m => m.PostLanding2Module), },

  // ############################### STATIC PAGES CATEGORY STARTS ###############################

  // ############################### RENT URL CATEGORY STARTS ###############################

  //  ############################### Category 1 ###############################

  // { path: 'property-for-rent-in-bangalore', loadChildren: () => import('./rentals/rent.module').then(m => m.RentalsModule) },
  // { path: 'property-for-rent-in-hyderabad', loadChildren: () => import('./rentals/rent.module').then(m => m.RentalsModule) },
  // { path: 'property-for-rent-in-chennai', loadChildren: () => import('./rentals/rent.module').then(m => m.RentalsModule) },
  // { path: 'property-for-rent-in-kochi', loadChildren: () => import('./rentals/rent.module').then(m => m.RentalsModule) },
  // { path: 'property-for-rent-in-pune', loadChildren: () => import('./rentals/rent.module').then(m => m.RentalsModule) },
  // { path: 'property-for-rent-in-delhi', loadChildren: () => import('./rentals/rent.module').then(m => m.RentalsModule) },
  // { path: 'property-for-rent-in-kolkata', loadChildren: () => import('./rentals/rent.module').then(m => m.RentalsModule) },
  // { path: 'property-for-rent-in-mumbai', loadChildren: () => import('./rentals/rent.module').then(m => m.RentalsModule) },
  // { path: 'property-for-rent-in-goa', loadChildren: () => import('./rentals/rent.module').then(m => m.RentalsModule) },
  // { path: 'property-for-rent-in-gurgaon', loadChildren: () => import('./rentals/rent.module').then(m => m.RentalsModule) },
  // { path: 'property-for-rent-in-mysore', loadChildren: () => import('./rentals/rent.module').then(m => m.RentalsModule) },
  // { path: 'property-for-rent-in-coimbatore', loadChildren: () => import('./rentals/rent.module').then(m => m.RentalsModule) },
  // { path: 'property-for-rent-in-ahmedabad', loadChildren: () => import('./rentals/rent.module').then(m => m.RentalsModule) },
  // { path: 'property-for-rent-in-trivandrum', loadChildren: () => import('./rentals/rent.module').then(m => m.RentalsModule) },
  // { path: 'property-for-rent-in-navi-mumbai', loadChildren: () => import('./rentals/rent.module').then(m => m.RentalsModule) },
  // { path: 'property-for-rent-in-noida', loadChildren: () => import('./rentals/rent.module').then(m => m.RentalsModule) },
  // { path: 'property-for-rent-in-greater-noida', loadChildren: () => import('./rentals/rent.module').then(m => m.RentalsModule) },
  // { path: 'property-for-rent-in-bhubaneshwar', loadChildren: () => import('./rentals/rent.module').then(m => m.RentalsModule) },
  // { path: 'property-for-rent-in-vijayawada', loadChildren: () => import('./rentals/rent.module').then(m => m.RentalsModule) },
  // { path: 'property-for-rent-in-bhopal', loadChildren: () => import('./rentals/rent.module').then(m => m.RentalsModule) },
  // { path: 'property-for-rent-in-indore', loadChildren: () => import('./rentals/rent.module').then(m => m.RentalsModule) },
  // { path: 'property-for-rent-in-vizag', loadChildren: () => import('./rentals/rent.module').then(m => m.RentalsModule) },
  // { path: 'property-for-rent-in-amaravati', loadChildren: () => import('./rentals/rent.module').then(m => m.RentalsModule) },
  // { path: 'property-for-rent-in-thrissur', loadChildren: () => import('./rentals/rent.module').then(m => m.RentalsModule) },
  // { path: 'property-for-rent-in-tirupati', loadChildren: () => import('./rentals/rent.module').then(m => m.RentalsModule) },
  // { path: 'property-for-rent-in-lucknow', loadChildren: () => import('./rentals/rent.module').then(m => m.RentalsModule) },
  // { path: 'property-for-rent-in-nashik', loadChildren: () => import('./rentals/rent.module').then(m => m.RentalsModule) },
  // { path: 'property-for-rent-in-mangalore', loadChildren: () => import('./rentals/rent.module').then(m => m.RentalsModule) },
  // { path: 'property-for-rent-in-nagpur', loadChildren: () => import('./rentals/rent.module').then(m => m.RentalsModule) },
  // { path: 'property-for-rent-in-jaipur', loadChildren: () => import('./rentals/rent.module').then(m => m.RentalsModule) },
  // { path: 'property-for-rent-in-nellore', loadChildren: () => import('./rentals/rent.module').then(m => m.RentalsModule) },
  // { path: 'property-for-rent-in-faridabad', loadChildren: () => import('./rentals/rent.module').then(m => m.RentalsModule) },
  // { path: 'property-for-rent-in-chandigarh', loadChildren: () => import('./rentals/rent.module').then(m => m.RentalsModule) },
  // { path: 'property-for-rent-in-dehradun', loadChildren: () => import('./rentals/rent.module').then(m => m.RentalsModule) },
  // { path: 'property-for-rent-in-ghaziabad', loadChildren: () => import('./rentals/rent.module').then(m => m.RentalsModule) },
  // { path: 'property-for-rent-in-ranchi', loadChildren: () => import('./rentals/rent.module').then(m => m.RentalsModule) },
  // { path: 'property-for-rent-in-agra', loadChildren: () => import('./rentals/rent.module').then(m => m.RentalsModule) },
  // { path: 'property-for-rent-in-durgapur', loadChildren: () => import('./rentals/rent.module').then(m => m.RentalsModule) },
  // { path: 'property-for-rent-in-vizianagaram', loadChildren: () => import('./rentals/rent.module').then(m => m.RentalsModule) },
  // { path: 'property-for-rent-in-patna', loadChildren: () => import('./rentals/rent.module').then(m => m.RentalsModule) },
  // { path: 'property-for-rent-in-surat', loadChildren: () => import('./rentals/rent.module').then(m => m.RentalsModule) },
  // { path: 'property-for-rent-in-guntur', loadChildren: () => import('./rentals/rent.module').then(m => m.RentalsModule) },
  // { path: 'property-for-rent-in-amritsar', loadChildren: () => import('./rentals/rent.module').then(m => m.RentalsModule) },
  // { path: 'property-for-rent-in-aurangabad', loadChildren: () => import('./rentals/rent.module').then(m => m.RentalsModule) },
  // { path: 'property-for-rent-in-guwahati', loadChildren: () => import('./rentals/rent.module').then(m => m.RentalsModule) },
  // { path: 'property-for-rent-in-ludhiana', loadChildren: () => import('./rentals/rent.module').then(m => m.RentalsModule) },
  // { path: 'property-for-rent-in-dharwad', loadChildren: () => import('./rentals/rent.module').then(m => m.RentalsModule) },
  // { path: 'property-for-rent-in-kolhapur', loadChildren: () => import('./rentals/rent.module').then(m => m.RentalsModule) },
  // { path: 'property-for-rent-in-mohali', loadChildren: () => import('./rentals/rent.module').then(m => m.RentalsModule) },
  // { path: 'property-for-rent-in-kanpur', loadChildren: () => import('./rentals/rent.module').then(m => m.RentalsModule) },
  // { path: 'property-for-rent-in-thane', loadChildren: () => import('./rentals/rent.module').then(m => m.RentalsModule) },
  // { path: 'property-for-rent-in-jamshedpur', loadChildren: () => import('./rentals/rent.module').then(m => m.RentalsModule) },
  // { path: 'property-for-rent-in-belgaum', loadChildren: () => import('./rentals/rent.module').then(m => m.RentalsModule) },
  // { path: 'property-for-rent-in-puri', loadChildren: () => import('./rentals/rent.module').then(m => m.RentalsModule) },
  // { path: 'property-for-rent-in-meerut', loadChildren: () => import('./rentals/rent.module').then(m => m.RentalsModule) },
  // { path: 'property-for-rent-in-tiruvannamalai', loadChildren: () => import('./rentals/rent.module').then(m => m.RentalsModule) },
  // { path: 'property-for-rent-in-satara', loadChildren: () => import('./rentals/rent.module').then(m => m.RentalsModule) },
  // { path: 'property-for-rent-in-junagadh', loadChildren: () => import('./rentals/rent.module').then(m => m.RentalsModule) },
  // { path: 'property-for-rent-in-vadodara', loadChildren: () => import('./rentals/rent.module').then(m => m.RentalsModule) },
  // { path: 'property-for-rent-in-palwal', loadChildren: () => import('./rentals/rent.module').then(m => m.RentalsModule) },
  // { path: 'property-for-rent-in-panchkula', loadChildren: () => import('./rentals/rent.module').then(m => m.RentalsModule) },
  // { path: 'property-for-rent-in-panipat', loadChildren: () => import('./rentals/rent.module').then(m => m.RentalsModule) },
  // { path: 'property-for-rent-in-calicut', loadChildren: () => import('./rentals/rent.module').then(m => m.RentalsModule) },
  // { path: 'property-for-rent-in-pathanamthitta', loadChildren: () => import('./rentals/rent.module').then(m => m.RentalsModule) },
  // { path: 'property-for-rent-in-haridwar', loadChildren: () => import('./rentals/rent.module').then(m => m.RentalsModule) },
  // { path: 'property-for-rent-in-solan', loadChildren: () => import('./rentals/rent.module').then(m => m.RentalsModule) },
  // { path: 'property-for-rent-in-burhanpur', loadChildren: () => import('./rentals/rent.module').then(m => m.RentalsModule) },
  // { path: 'property-for-rent-in-raipur', loadChildren: () => import('./rentals/rent.module').then(m => m.RentalsModule) },
  // { path: 'property-for-rent-in-kanchipuram', loadChildren: () => import('./rentals/rent.module').then(m => m.RentalsModule) },
  // { path: 'property-for-rent-in-pondicherry', loadChildren: () => import('./rentals/rent.module').then(m => m.RentalsModule) },
  // { path: 'property-for-rent-in-siliguri', loadChildren: () => import('./rentals/rent.module').then(m => m.RentalsModule) },
  // { path: 'property-for-rent-in-gandhinagar', loadChildren: () => import('./rentals/rent.module').then(m => m.RentalsModule) },
  // { path: 'property-for-rent-in-ajmer', loadChildren: () => import('./rentals/rent.module').then(m => m.RentalsModule) },
  // { path: 'property-for-rent-in-varanasi', loadChildren: () => import('./rentals/rent.module').then(m => m.RentalsModule) },
  // { path: 'property-for-rent-in-mathura', loadChildren: () => import('./rentals/rent.module').then(m => m.RentalsModule) },
  // { path: 'property-for-rent-in-dindigul', loadChildren: () => import('./rentals/rent.module').then(m => m.RentalsModule) },
  // { path: 'property-for-rent-in-rewari', loadChildren: () => import('./rentals/rent.module').then(m => m.RentalsModule) },
  // { path: 'property-for-rent-in-solapur', loadChildren: () => import('./rentals/rent.module').then(m => m.RentalsModule) },
  // { path: 'property-for-rent-in-ratnagiri', loadChildren: () => import('./rentals/rent.module').then(m => m.RentalsModule) },
  // { path: 'property-for-rent-in-shantiniketan', loadChildren: () => import('./rentals/rent.module').then(m => m.RentalsModule) },
  // { path: 'property-for-rent-in-rishikesh', loadChildren: () => import('./rentals/rent.module').then(m => m.RentalsModule) },
  // { path: 'property-for-rent-in-rajkor', loadChildren: () => import('./rentals/rent.module').then(m => m.RentalsModule) },
  // { path: 'property-for-rent-in-hapur', loadChildren: () => import('./rentals/rent.module').then(m => m.RentalsModule) },
  // { path: 'property-for-rent-in-chamarajnagar', loadChildren: () => import('./rentals/rent.module').then(m => m.RentalsModule) },
  // { path: 'property-for-rent-in-gulbarga', loadChildren: () => import('./rentals/rent.module').then(m => m.RentalsModule) },
  // { path: 'property-for-rent-in-alwar', loadChildren: () => import('./rentals/rent.module').then(m => m.RentalsModule) },
  // { path: 'property-for-rent-in-tirunelveli', loadChildren: () => import('./rentals/rent.module').then(m => m.RentalsModule) },
  // { path: 'property-for-rent-in-raigad', loadChildren: () => import('./rentals/rent.module').then(m => m.RentalsModule) },
  // { path: 'property-for-rent-in-rajkot', loadChildren: () => import('./rentals/rent.module').then(m => m.RentalsModule) },
  // { path: 'property-for-rent-in-purba-medinipur', loadChildren: () => import('./rentals/rent.module').then(m => m.RentalsModule) },
  // { path: 'property-for-rent-in-chamarajanagar', loadChildren: () => import('./rentals/rent.module').then(m => m.RentalsModule) },
  // { path: 'property-for-rent-in-sangli', loadChildren: () => import('./rentals/rent.module').then(m => m.RentalsModule) },
  // { path: 'property-for-rent-in-ayodhya', loadChildren: () => import('./rentals/rent.module').then(m => m.RentalsModule) },
  // { path: 'property-for-rent-in-bhiwadi', loadChildren: () => import('./rentals/rent.module').then(m => m.RentalsModule) },
  // { path: 'property-for-rent-in-kottayam', loadChildren: () => import('./rentals/rent.module').then(m => m.RentalsModule) },
  // { path: 'property-for-rent-in-kannur', loadChildren: () => import('./rentals/rent.module').then(m => m.RentalsModule) },
  // { path: 'property-for-rent-in-neemrana', loadChildren: () => import('./rentals/rent.module').then(m => m.RentalsModule) },
  // { path: 'property-for-rent-in-thanjavur', loadChildren: () => import('./rentals/rent.module').then(m => m.RentalsModule) },
  // { path: 'property-for-rent-in-kota', loadChildren: () => import('./rentals/rent.module').then(m => m.RentalsModule) },
  // { path: 'property-for-rent-in-bilaspur', loadChildren: () => import('./rentals/rent.module').then(m => m.RentalsModule) },
  // { path: 'property-for-rent-in-navsari', loadChildren: () => import('./rentals/rent.module').then(m => m.RentalsModule) },
  // { path: 'property-for-rent-in-davanegere', loadChildren: () => import('./rentals/rent.module').then(m => m.RentalsModule) },
  // { path: 'property-for-rent-in-jabalpur', loadChildren: () => import('./rentals/rent.module').then(m => m.RentalsModule) },
  // { path: 'property-for-rent-in-gwalior', loadChildren: () => import('./rentals/rent.module').then(m => m.RentalsModule) },
  // { path: 'property-for-rent-in-ujjain', loadChildren: () => import('./rentals/rent.module').then(m => m.RentalsModule) },
  // { path: 'property-for-rent-in-salem', loadChildren: () => import('./rentals/rent.module').then(m => m.RentalsModule) },
  // { path: 'property-for-rent-in-erode', loadChildren: () => import('./rentals/rent.module').then(m => m.RentalsModule) },
  // { path: 'property-for-rent-in-thoothukudi', loadChildren: () => import('./rentals/rent.module').then(m => m.RentalsModule) },
  // { path: 'property-for-rent-in-bareilly', loadChildren: () => import('./rentals/rent.module').then(m => m.RentalsModule) },
  // { path: 'property-for-rent-in-jhansi', loadChildren: () => import('./rentals/rent.module').then(m => m.RentalsModule) },
  // { path: 'property-for-rent-in-tiruchirappalli', loadChildren: () => import('./rentals/rent.module').then(m => m.RentalsModule) },
  // { path: 'property-for-rent-in-hosur', loadChildren: () => import('./rentals/rent.module').then(m => m.RentalsModule) },
  // { path: 'property-for-rent-in-madurai', loadChildren: () => import('./rentals/rent.module').then(m => m.RentalsModule) },
  // { path: 'property-for-rent-in-namakkal', loadChildren: () => import('./rentals/rent.module').then(m => m.RentalsModule) },
  // { path: 'property-for-rent-in-tiruppur', loadChildren: () => import('./rentals/rent.module').then(m => m.RentalsModule) },
  // { path: 'property-for-rent-in-vellore', loadChildren: () => import('./rentals/rent.module').then(m => m.RentalsModule) },
  // { path: 'property-for-rent-in-viluppuram', loadChildren: () => import('./rentals/rent.module').then(m => m.RentalsModule) },
  // { path: 'property-for-rent-in-koonimedu', loadChildren: () => import('./rentals/rent.module').then(m => m.RentalsModule) },
  // { path: 'property-for-rent-in-theni', loadChildren: () => import('./rentals/rent.module').then(m => m.RentalsModule) },
  // { path: 'property-for-rent-in-kotagiri', loadChildren: () => import('./rentals/rent.module').then(m => m.RentalsModule) },
  // { path: 'property-for-rent-in-krishnagri', loadChildren: () => import('./rentals/rent.module').then(m => m.RentalsModule) },
  //  ############################### Category 1 ###############################

  //  ############################### Category 2 ###############################

  // { path: 'rent/:house-for-rent-in-:cityname', loadChildren: () => import('./rentlist/rentlist.module').then(m => m.RentlistModule) },

  // { path: 'rent/:flats-for-rent-in-:cityname', loadChildren: () => import('./rentlist/rentlist.module').then(m => m.RentlistModule) },

  // { path: 'rent/:villas-for-rent-in-:cityname', loadChildren: () => import('./rentlist/rentlist.module').then(m => m.RentlistModule) },

  // { path: 'rent/:plots-for-rent-in-:cityname', loadChildren: () => import('./rentlist/rentlist.module').then(m => m.RentlistModule) },

  // { path: 'rent/:independent-house-for-rent-in-:cityname', loadChildren: () => import('./rentlist/rentlist.module').then(m => m.RentlistModule) },

  // { path: 'rent/:flats-for-rent-in-:cityname-price-minprice-maxprice', loadChildren: () => import('./rentlist/rentlist.module').then(m => m.RentlistModule) },



  //  ############################### Category 5 ###############################

  //  ############################### Category 6 ###############################

  // { path: 'rentals/:bhk-:propertytype-for-rent-in-:locality-:cityname-:propname-:id', loadChildren: () => import('./rentdetails/rentdetails.module').then(m => m.RentdetailsModule) },
  // { path: 'rental/:flats-for-rent-in-:localityname-:cityname-:id', loadChildren: () => import('./rent-flats-locality/rent-flats-locality.module').then(m => m.RentFlatsLocalityModule) },



  // { path: 'commercial', loadChildren: () => import('./commercial/commercial.module').then(m => m.commercialModule) },
  // { path: 'commercial/:commercial-properties-for-sale_rent-in-:cityname', loadChildren: () => import('./commercial-lisiting/commercial-listing.module').then(m => m.CommercialLisitingModule) },
  // { path: 'commercialdetails/:commercial-properties-for-sale_rent-in-:cityname-:typeid-:id', loadChildren: () => import('./commercial-details/commercial-details.module').then(m => m.CommercialDetailsModule) },

  // { path: 'commercial', loadChildren: () => import('./commercial/commercial.module').then(m => m.commercialModule) },
  // { path: 'clh/:commercial-properties-in-:cityname', loadChildren: () => import('./commercial/commercial.module').then(m => m.commercialModule) },
  // { path: 'cll/:commercial-properties-for-sale_rent-in-:cityname', loadChildren: () => import('./commercial-lisiting/commercial-listing.module').then(m => m.CommercialLisitingModule) },
  // { path: 'cml/:commercial-properties-for-sale_rent-in-:localityname-:cityname-:localityid', loadChildren: () => import('./commercial-locality/commercial-locality.module').then(m => m.commerciallocalityModule) },
  // { path: 'cld/:commercial-properties-for-sale_rent-in-:cityname-:typeid-:id', loadChildren: () => import('./commercial-details/commercial-details.module').then(m => m.CommercialDetailsModule) },

  // { path: 'pg-home', loadChildren: () => import('./pg-home/pg-home.module').then(m => m.PgHomeModule) },
  // { path: 'pg/:pg-for-rent-in-:cityname', loadChildren: () => import('./pg-listing/pg-listing.module').then(m => m.PgListingModule) },
  // { path: 'pgdetails/:pg-for-rent-in-cityname-:id', loadChildren: () => import('./pg-details/pg-details.module').then(m => m.PGDetailsModule) },

  // { path: 'pg-home', loadChildren: () => import('./pg-home/pg-home.module').then(m => m.PgHomeModule) },
  // { path: 'pg-home/:pg-properties-in-:cityname', loadChildren: () => import('./pg-home/pg-home.module').then(m => m.PgHomeModule) },
  // { path: 'pgcl/:pg-for-rent-in-:cityname', loadChildren: () => import('./pg-listing/pg-listing.module').then(m => m.PgListingModule) },
  // { path: 'pgll/:pg-for-rent-in-:localityname:-cityname-:id', loadChildren: () => import('./pg-locality/pg-locality.module').then(m => m.pgLocalityModule) },
  // { path: 'pgd/:pg-for-rent-in-cityname-:id', loadChildren: () => import('./pg-details/pg-details.module').then(m => m.PGDetailsModule) },

  //  ############################### Category 6 ###############################

  // ############################### RENT URL CATEGORY ENDS ###############################

  // ############################### INDIVIDUAL LISTING SECTIONS STARTS ###############################

  //  ############################### Category 1 ###############################

  // { path: 'projects-in-bangalore', loadChildren: () => import('./individual-city-list/individual-city-list.module').then(m => m.IndividualCityListModule) },
  // { path: 'projects-in-hyderabad', loadChildren: () => import('./individual-city-list/individual-city-list.module').then(m => m.IndividualCityListModule) },
  // { path: 'projects-in-chennai', loadChildren: () => import('./individual-city-list/individual-city-list.module').then(m => m.IndividualCityListModule) },
  // { path: 'projects-in-kochi', loadChildren: () => import('./individual-city-list/individual-city-list.module').then(m => m.IndividualCityListModule) },
  // { path: 'projects-in-pune', loadChildren: () => import('./individual-city-list/individual-city-list.module').then(m => m.IndividualCityListModule) },
  // { path: 'projects-in-mumbai', loadChildren: () => import('./individual-city-list/individual-city-list.module').then(m => m.IndividualCityListModule) },
  // { path: 'projects-in-delhi', loadChildren: () => import('./individual-city-list/individual-city-list.module').then(m => m.IndividualCityListModule) },
  // { path: 'projects-in-kolkata', loadChildren: () => import('./individual-city-list/individual-city-list.module').then(m => m.IndividualCityListModule) },
  // { path: 'projects-in-goa', loadChildren: () => import('./individual-city-list/individual-city-list.module').then(m => m.IndividualCityListModule) },
  // { path: 'projects-in-gurgaon', loadChildren: () => import('./individual-city-list/individual-city-list.module').then(m => m.IndividualCityListModule) },
  // { path: 'projects-in-mysore', loadChildren: () => import('./individual-city-list/individual-city-list.module').then(m => m.IndividualCityListModule) },
  // { path: 'projects-in-coimbatore', loadChildren: () => import('./individual-city-list/individual-city-list.module').then(m => m.IndividualCityListModule) },
  // { path: 'projects-in-ahmedabad', loadChildren: () => import('./individual-city-list/individual-city-list.module').then(m => m.IndividualCityListModule) },
  // { path: 'projects-in-trivandrum', loadChildren: () => import('./individual-city-list/individual-city-list.module').then(m => m.IndividualCityListModule) },
  // { path: 'projects-in-navi-mumbai', loadChildren: () => import('./individual-city-list/individual-city-list.module').then(m => m.IndividualCityListModule) },
  // { path: 'projects-in-noida', loadChildren: () => import('./individual-city-list/individual-city-list.module').then(m => m.IndividualCityListModule) },
  // { path: 'projects-in-greater-noida', loadChildren: () => import('./individual-city-list/individual-city-list.module').then(m => m.IndividualCityListModule) },
  // { path: 'projects-in-bhubaneshwar', loadChildren: () => import('./individual-city-list/individual-city-list.module').then(m => m.IndividualCityListModule) },
  // { path: 'projects-in-vijayawada', loadChildren: () => import('./individual-city-list/individual-city-list.module').then(m => m.IndividualCityListModule) },
  // { path: 'projects-in-bhopal', loadChildren: () => import('./individual-city-list/individual-city-list.module').then(m => m.IndividualCityListModule) },
  // { path: 'projects-in-indore', loadChildren: () => import('./individual-city-list/individual-city-list.module').then(m => m.IndividualCityListModule) },
  // { path: 'projects-in-vizag', loadChildren: () => import('./individual-city-list/individual-city-list.module').then(m => m.IndividualCityListModule) },
  // { path: 'projects-in-amaravati', loadChildren: () => import('./individual-city-list/individual-city-list.module').then(m => m.IndividualCityListModule) },
  // { path: 'projects-in-thrissur', loadChildren: () => import('./individual-city-list/individual-city-list.module').then(m => m.IndividualCityListModule) },
  // { path: 'projects-in-tirupati', loadChildren: () => import('./individual-city-list/individual-city-list.module').then(m => m.IndividualCityListModule) },
  // { path: 'projects-in-lucknow', loadChildren: () => import('./individual-city-list/individual-city-list.module').then(m => m.IndividualCityListModule) },
  // { path: 'projects-in-nashik', loadChildren: () => import('./individual-city-list/individual-city-list.module').then(m => m.IndividualCityListModule) },
  // { path: 'projects-in-mangalore', loadChildren: () => import('./individual-city-list/individual-city-list.module').then(m => m.IndividualCityListModule) },
  // { path: 'projects-in-nagpur', loadChildren: () => import('./individual-city-list/individual-city-list.module').then(m => m.IndividualCityListModule) },
  // { path: 'projects-in-jaipur', loadChildren: () => import('./individual-city-list/individual-city-list.module').then(m => m.IndividualCityListModule) },
  // { path: 'projects-in-nellore', loadChildren: () => import('./individual-city-list/individual-city-list.module').then(m => m.IndividualCityListModule) },
  // { path: 'projects-in-faridabad', loadChildren: () => import('./individual-city-list/individual-city-list.module').then(m => m.IndividualCityListModule) },
  // { path: 'projects-in-chandigarh', loadChildren: () => import('./individual-city-list/individual-city-list.module').then(m => m.IndividualCityListModule) },
  // { path: 'projects-in-dehradun', loadChildren: () => import('./individual-city-list/individual-city-list.module').then(m => m.IndividualCityListModule) },
  // { path: 'projects-in-ghaziabad', loadChildren: () => import('./individual-city-list/individual-city-list.module').then(m => m.IndividualCityListModule) },
  // { path: 'projects-in-ranchi', loadChildren: () => import('./individual-city-list/individual-city-list.module').then(m => m.IndividualCityListModule) },
  // { path: 'projects-in-agra', loadChildren: () => import('./individual-city-list/individual-city-list.module').then(m => m.IndividualCityListModule) },
  // { path: 'projects-in-durgapur', loadChildren: () => import('./individual-city-list/individual-city-list.module').then(m => m.IndividualCityListModule) },
  // { path: 'projects-in-vizianagaram', loadChildren: () => import('./individual-city-list/individual-city-list.module').then(m => m.IndividualCityListModule) },
  // { path: 'projects-in-amritsar', loadChildren: () => import('./individual-city-list/individual-city-list.module').then(m => m.IndividualCityListModule) },
  // { path: 'projects-in-patna', loadChildren: () => import('./individual-city-list/individual-city-list.module').then(m => m.IndividualCityListModule) },
  // { path: 'projects-in-surat', loadChildren: () => import('./individual-city-list/individual-city-list.module').then(m => m.IndividualCityListModule) },
  // { path: 'projects-in-guntur', loadChildren: () => import('./individual-city-list/individual-city-list.module').then(m => m.IndividualCityListModule) },
  // { path: 'projects-in-aurangabad', loadChildren: () => import('./individual-city-list/individual-city-list.module').then(m => m.IndividualCityListModule) },
  // { path: 'projects-in-guwahati', loadChildren: () => import('./individual-city-list/individual-city-list.module').then(m => m.IndividualCityListModule) },
  // { path: 'projects-in-ludhiana', loadChildren: () => import('./individual-city-list/individual-city-list.module').then(m => m.IndividualCityListModule) },
  // { path: 'projects-in-dharwad', loadChildren: () => import('./individual-city-list/individual-city-list.module').then(m => m.IndividualCityListModule) },
  // { path: 'projects-in-kolhapur', loadChildren: () => import('./individual-city-list/individual-city-list.module').then(m => m.IndividualCityListModule) },
  // { path: 'projects-in-mohali', loadChildren: () => import('./individual-city-list/individual-city-list.module').then(m => m.IndividualCityListModule) },
  // { path: 'projects-in-kanpur', loadChildren: () => import('./individual-city-list/individual-city-list.module').then(m => m.IndividualCityListModule) },
  // { path: 'projects-in-thane', loadChildren: () => import('./individual-city-list/individual-city-list.module').then(m => m.IndividualCityListModule) },
  // { path: 'projects-in-jamshedpur', loadChildren: () => import('./individual-city-list/individual-city-list.module').then(m => m.IndividualCityListModule) },
  // { path: 'projects-in-belgaum', loadChildren: () => import('./individual-city-list/individual-city-list.module').then(m => m.IndividualCityListModule) },
  // { path: 'projects-in-puri', loadChildren: () => import('./individual-city-list/individual-city-list.module').then(m => m.IndividualCityListModule) },
  // { path: 'projects-in-meerut', loadChildren: () => import('./individual-city-list/individual-city-list.module').then(m => m.IndividualCityListModule) },
  // { path: 'projects-in-tiruvannamalai', loadChildren: () => import('./individual-city-list/individual-city-list.module').then(m => m.IndividualCityListModule) },
  // { path: 'projects-in-satara', loadChildren: () => import('./individual-city-list/individual-city-list.module').then(m => m.IndividualCityListModule) },
  // { path: 'projects-in-junagadh', loadChildren: () => import('./individual-city-list/individual-city-list.module').then(m => m.IndividualCityListModule) },
  // { path: 'projects-in-vadodara', loadChildren: () => import('./individual-city-list/individual-city-list.module').then(m => m.IndividualCityListModule) },
  // { path: 'projects-in-palwal', loadChildren: () => import('./individual-city-list/individual-city-list.module').then(m => m.IndividualCityListModule) },
  // { path: 'projects-in-panchkula', loadChildren: () => import('./individual-city-list/individual-city-list.module').then(m => m.IndividualCityListModule) },
  // { path: 'projects-in-panipat', loadChildren: () => import('./individual-city-list/individual-city-list.module').then(m => m.IndividualCityListModule) },
  // { path: 'projects-in-calicut', loadChildren: () => import('./individual-city-list/individual-city-list.module').then(m => m.IndividualCityListModule) },
  // { path: 'projects-in-pathanamthitta', loadChildren: () => import('./individual-city-list/individual-city-list.module').then(m => m.IndividualCityListModule) },
  // { path: 'projects-in-haridwar', loadChildren: () => import('./individual-city-list/individual-city-list.module').then(m => m.IndividualCityListModule) },
  // { path: 'projects-in-solan', loadChildren: () => import('./individual-city-list/individual-city-list.module').then(m => m.IndividualCityListModule) },
  // { path: 'projects-in-burhanpur', loadChildren: () => import('./individual-city-list/individual-city-list.module').then(m => m.IndividualCityListModule) },
  // { path: 'projects-in-raipur', loadChildren: () => import('./individual-city-list/individual-city-list.module').then(m => m.IndividualCityListModule) },
  // { path: 'projects-in-kanchipuram', loadChildren: () => import('./individual-city-list/individual-city-list.module').then(m => m.IndividualCityListModule) },
  // { path: 'projects-in-pondicherry', loadChildren: () => import('./individual-city-list/individual-city-list.module').then(m => m.IndividualCityListModule) },
  // { path: 'projects-in-siliguri', loadChildren: () => import('./individual-city-list/individual-city-list.module').then(m => m.IndividualCityListModule) },
  // { path: 'projects-in-gandhinagar', loadChildren: () => import('./individual-city-list/individual-city-list.module').then(m => m.IndividualCityListModule) },
  // { path: 'projects-in-ajmer', loadChildren: () => import('./individual-city-list/individual-city-list.module').then(m => m.IndividualCityListModule) },
  // { path: 'projects-in-varanasi', loadChildren: () => import('./individual-city-list/individual-city-list.module').then(m => m.IndividualCityListModule) },
  // { path: 'projects-in-mathura', loadChildren: () => import('./individual-city-list/individual-city-list.module').then(m => m.IndividualCityListModule) },
  // { path: 'projects-in-dindigul', loadChildren: () => import('./individual-city-list/individual-city-list.module').then(m => m.IndividualCityListModule) },
  // { path: 'projects-in-rewari', loadChildren: () => import('./individual-city-list/individual-city-list.module').then(m => m.IndividualCityListModule) },
  // { path: 'projects-in-solapur', loadChildren: () => import('./individual-city-list/individual-city-list.module').then(m => m.IndividualCityListModule) },
  // { path: 'projects-in-ratnagiri', loadChildren: () => import('./individual-city-list/individual-city-list.module').then(m => m.IndividualCityListModule) },
  // { path: 'projects-in-shantiniketan', loadChildren: () => import('./individual-city-list/individual-city-list.module').then(m => m.IndividualCityListModule) },
  // { path: 'projects-in-rishikesh', loadChildren: () => import('./individual-city-list/individual-city-list.module').then(m => m.IndividualCityListModule) },
  // { path: 'projects-in-rajkor', loadChildren: () => import('./individual-city-list/individual-city-list.module').then(m => m.IndividualCityListModule) },
  // { path: 'projects-in-hapur', loadChildren: () => import('./individual-city-list/individual-city-list.module').then(m => m.IndividualCityListModule) },
  // { path: 'projects-in-chamarajnagar', loadChildren: () => import('./individual-city-list/individual-city-list.module').then(m => m.IndividualCityListModule) },
  // { path: 'projects-in-gulbarga', loadChildren: () => import('./individual-city-list/individual-city-list.module').then(m => m.IndividualCityListModule) },
  // { path: 'projects-in-alwar', loadChildren: () => import('./individual-city-list/individual-city-list.module').then(m => m.IndividualCityListModule) },
  // { path: 'projects-in-tirunelveli', loadChildren: () => import('./individual-city-list/individual-city-list.module').then(m => m.IndividualCityListModule) },
  // { path: 'projects-in-raigad', loadChildren: () => import('./individual-city-list/individual-city-list.module').then(m => m.IndividualCityListModule) },
  // { path: 'projects-in-rajkot', loadChildren: () => import('./individual-city-list/individual-city-list.module').then(m => m.IndividualCityListModule) },
  // { path: 'projects-in-purba-medinipur', loadChildren: () => import('./individual-city-list/individual-city-list.module').then(m => m.IndividualCityListModule) },
  // { path: 'projects-in-chamarajanagar', loadChildren: () => import('./individual-city-list/individual-city-list.module').then(m => m.IndividualCityListModule) },
  // { path: 'projects-in-sangli', loadChildren: () => import('./individual-city-list/individual-city-list.module').then(m => m.IndividualCityListModule) },
  // { path: 'projects-in-ayodhya', loadChildren: () => import('./individual-city-list/individual-city-list.module').then(m => m.IndividualCityListModule) },
  // { path: 'projects-in-bhiwadi', loadChildren: () => import('./individual-city-list/individual-city-list.module').then(m => m.IndividualCityListModule) },
  // { path: 'projects-in-kottayam', loadChildren: () => import('./individual-city-list/individual-city-list.module').then(m => m.IndividualCityListModule) },
  // { path: 'projects-in-kannur', loadChildren: () => import('./individual-city-list/individual-city-list.module').then(m => m.IndividualCityListModule) },
  // { path: 'projects-in-neemrana', loadChildren: () => import('./individual-city-list/individual-city-list.module').then(m => m.IndividualCityListModule) },
  // { path: 'projects-in-thanjavur', loadChildren: () => import('./individual-city-list/individual-city-list.module').then(m => m.IndividualCityListModule) },
  // { path: 'projects-in-kota', loadChildren: () => import('./individual-city-list/individual-city-list.module').then(m => m.IndividualCityListModule) },
  // { path: 'projects-in-bilaspur', loadChildren: () => import('./individual-city-list/individual-city-list.module').then(m => m.IndividualCityListModule) },
  // { path: 'projects-in-navsari', loadChildren: () => import('./individual-city-list/individual-city-list.module').then(m => m.IndividualCityListModule) },
  // { path: 'projects-in-davanegere', loadChildren: () => import('./individual-city-list/individual-city-list.module').then(m => m.IndividualCityListModule) },
  // { path: 'projects-in-jabalpur', loadChildren: () => import('./individual-city-list/individual-city-list.module').then(m => m.IndividualCityListModule) },
  // { path: 'projects-in-gwalior', loadChildren: () => import('./individual-city-list/individual-city-list.module').then(m => m.IndividualCityListModule) },
  // { path: 'projects-in-ujjain', loadChildren: () => import('./individual-city-list/individual-city-list.module').then(m => m.IndividualCityListModule) },
  // { path: 'projects-in-salem', loadChildren: () => import('./individual-city-list/individual-city-list.module').then(m => m.IndividualCityListModule) },
  // { path: 'projects-in-erode', loadChildren: () => import('./individual-city-list/individual-city-list.module').then(m => m.IndividualCityListModule) },
  // { path: 'projects-in-thoothukudi', loadChildren: () => import('./individual-city-list/individual-city-list.module').then(m => m.IndividualCityListModule) },
  // { path: 'projects-in-bareilly', loadChildren: () => import('./individual-city-list/individual-city-list.module').then(m => m.IndividualCityListModule) },
  // { path: 'projects-in-jhansi', loadChildren: () => import('./individual-city-list/individual-city-list.module').then(m => m.IndividualCityListModule) },
  // { path: 'projects-in-tiruchirappalli', loadChildren: () => import('./individual-city-list/individual-city-list.module').then(m => m.IndividualCityListModule) },
  // { path: 'projects-in-hosur', loadChildren: () => import('./individual-city-list/individual-city-list.module').then(m => m.IndividualCityListModule) },
  // { path: 'projects-in-madurai', loadChildren: () => import('./individual-city-list/individual-city-list.module').then(m => m.IndividualCityListModule) },
  // { path: 'projects-in-namakkal', loadChildren: () => import('./individual-city-list/individual-city-list.module').then(m => m.IndividualCityListModule) },
  // { path: 'projects-in-tiruppur', loadChildren: () => import('./individual-city-list/individual-city-list.module').then(m => m.IndividualCityListModule) },
  // { path: 'projects-in-vellore', loadChildren: () => import('./individual-city-list/individual-city-list.module').then(m => m.IndividualCityListModule) },
  // { path: 'projects-in-viluppuram', loadChildren: () => import('./individual-city-list/individual-city-list.module').then(m => m.IndividualCityListModule) },
  // { path: 'projects-in-koonimedu', loadChildren: () => import('./individual-city-list/individual-city-list.module').then(m => m.IndividualCityListModule) },
  // { path: 'projects-in-theni', loadChildren: () => import('./individual-city-list/individual-city-list.module').then(m => m.IndividualCityListModule) },
  // { path: 'projects-in-kotagiri', loadChildren: () => import('./individual-city-list/individual-city-list.module').then(m => m.IndividualCityListModule) },
  // { path: 'projects-in-krishnagri', loadChildren: () => import('./individual-city-list/individual-city-list.module').then(m => m.IndividualCityListModule) },



  //  ############################### Category 1 ###############################

  //  ############################### Category 2 ###############################

  // { path: 'apartment-projects-in-bangalore', loadChildren: () => import('./individual-flats-list/individual-flats.module').then(m => m.IndividualFlatsListModule) },
  // { path: 'apartment-projects-in-hyderabad', loadChildren: () => import('./individual-flats-list/individual-flats.module').then(m => m.IndividualFlatsListModule) },
  // { path: 'apartment-projects-in-chennai', loadChildren: () => import('./individual-flats-list/individual-flats.module').then(m => m.IndividualFlatsListModule) },
  // { path: 'apartment-projects-in-kochi', loadChildren: () => import('./individual-flats-list/individual-flats.module').then(m => m.IndividualFlatsListModule) },
  // { path: 'apartment-projects-in-pune', loadChildren: () => import('./individual-flats-list/individual-flats.module').then(m => m.IndividualFlatsListModule) },
  // { path: 'apartment-projects-in-mumbai', loadChildren: () => import('./individual-flats-list/individual-flats.module').then(m => m.IndividualFlatsListModule) },
  // { path: 'apartment-projects-in-delhi', loadChildren: () => import('./individual-flats-list/individual-flats.module').then(m => m.IndividualFlatsListModule) },
  // { path: 'apartment-projects-in-kolkata', loadChildren: () => import('./individual-flats-list/individual-flats.module').then(m => m.IndividualFlatsListModule) },
  // { path: 'apartment-projects-in-goa', loadChildren: () => import('./individual-flats-list/individual-flats.module').then(m => m.IndividualFlatsListModule) },
  // { path: 'apartment-projects-in-gurgaon', loadChildren: () => import('./individual-flats-list/individual-flats.module').then(m => m.IndividualFlatsListModule) },
  // { path: 'apartment-projects-in-mysore', loadChildren: () => import('./individual-flats-list/individual-flats.module').then(m => m.IndividualFlatsListModule) },
  // { path: 'apartment-projects-in-coimbatore', loadChildren: () => import('./individual-flats-list/individual-flats.module').then(m => m.IndividualFlatsListModule) },
  // { path: 'apartment-projects-in-ahmedabad', loadChildren: () => import('./individual-flats-list/individual-flats.module').then(m => m.IndividualFlatsListModule) },
  // { path: 'apartment-projects-in-trivandrum', loadChildren: () => import('./individual-flats-list/individual-flats.module').then(m => m.IndividualFlatsListModule) },
  // { path: 'apartment-projects-in-navi-mumbai', loadChildren: () => import('./individual-flats-list/individual-flats.module').then(m => m.IndividualFlatsListModule) },
  // { path: 'apartment-projects-in-noida', loadChildren: () => import('./individual-flats-list/individual-flats.module').then(m => m.IndividualFlatsListModule) },
  // { path: 'apartment-projects-in-greater-noida', loadChildren: () => import('./individual-flats-list/individual-flats.module').then(m => m.IndividualFlatsListModule) },
  // { path: 'apartment-projects-in-bhubaneshwar', loadChildren: () => import('./individual-flats-list/individual-flats.module').then(m => m.IndividualFlatsListModule) },
  // { path: 'apartment-projects-in-vijayawada', loadChildren: () => import('./individual-flats-list/individual-flats.module').then(m => m.IndividualFlatsListModule) },
  // { path: 'apartment-projects-in-bhopal', loadChildren: () => import('./individual-flats-list/individual-flats.module').then(m => m.IndividualFlatsListModule) },
  // { path: 'apartment-projects-in-indore', loadChildren: () => import('./individual-flats-list/individual-flats.module').then(m => m.IndividualFlatsListModule) },
  // { path: 'apartment-projects-in-vizag', loadChildren: () => import('./individual-flats-list/individual-flats.module').then(m => m.IndividualFlatsListModule) },
  // { path: 'apartment-projects-in-amaravati', loadChildren: () => import('./individual-flats-list/individual-flats.module').then(m => m.IndividualFlatsListModule) },
  // { path: 'apartment-projects-in-thrissur', loadChildren: () => import('./individual-flats-list/individual-flats.module').then(m => m.IndividualFlatsListModule) },
  // { path: 'apartment-projects-in-tirupati', loadChildren: () => import('./individual-flats-list/individual-flats.module').then(m => m.IndividualFlatsListModule) },
  // { path: 'apartment-projects-in-lucknow', loadChildren: () => import('./individual-flats-list/individual-flats.module').then(m => m.IndividualFlatsListModule) },
  // { path: 'apartment-projects-in-nashik', loadChildren: () => import('./individual-flats-list/individual-flats.module').then(m => m.IndividualFlatsListModule) },
  // { path: 'apartment-projects-in-mangalore', loadChildren: () => import('./individual-flats-list/individual-flats.module').then(m => m.IndividualFlatsListModule) },
  // { path: 'apartment-projects-in-nagpur', loadChildren: () => import('./individual-flats-list/individual-flats.module').then(m => m.IndividualFlatsListModule) },
  // { path: 'apartment-projects-in-jaipur', loadChildren: () => import('./individual-flats-list/individual-flats.module').then(m => m.IndividualFlatsListModule) },
  // { path: 'apartment-projects-in-nellore', loadChildren: () => import('./individual-flats-list/individual-flats.module').then(m => m.IndividualFlatsListModule) },
  // { path: 'apartment-projects-in-faridabad', loadChildren: () => import('./individual-flats-list/individual-flats.module').then(m => m.IndividualFlatsListModule) },
  // { path: 'apartment-projects-in-chandigarh', loadChildren: () => import('./individual-flats-list/individual-flats.module').then(m => m.IndividualFlatsListModule) },
  // { path: 'apartment-projects-in-dehradun', loadChildren: () => import('./individual-flats-list/individual-flats.module').then(m => m.IndividualFlatsListModule) },
  // { path: 'apartment-projects-in-ghaziabad', loadChildren: () => import('./individual-flats-list/individual-flats.module').then(m => m.IndividualFlatsListModule) },
  // { path: 'apartment-projects-in-ranchi', loadChildren: () => import('./individual-flats-list/individual-flats.module').then(m => m.IndividualFlatsListModule) },
  // { path: 'apartment-projects-in-agra', loadChildren: () => import('./individual-flats-list/individual-flats.module').then(m => m.IndividualFlatsListModule) },
  // { path: 'apartment-projects-in-durgapur', loadChildren: () => import('./individual-flats-list/individual-flats.module').then(m => m.IndividualFlatsListModule) },
  // { path: 'apartment-projects-in-vizianagaram', loadChildren: () => import('./individual-flats-list/individual-flats.module').then(m => m.IndividualFlatsListModule) },
  // { path: 'apartment-projects-in-amritsar', loadChildren: () => import('./individual-flats-list/individual-flats.module').then(m => m.IndividualFlatsListModule) },
  // { path: 'apartment-projects-in-patna', loadChildren: () => import('./individual-flats-list/individual-flats.module').then(m => m.IndividualFlatsListModule) },
  // { path: 'apartment-projects-in-surat', loadChildren: () => import('./individual-flats-list/individual-flats.module').then(m => m.IndividualFlatsListModule) },
  // { path: 'apartment-projects-in-guntur', loadChildren: () => import('./individual-flats-list/individual-flats.module').then(m => m.IndividualFlatsListModule) },
  // { path: 'apartment-projects-in-aurangabad', loadChildren: () => import('./individual-flats-list/individual-flats.module').then(m => m.IndividualFlatsListModule) },
  // { path: 'apartment-projects-in-guwahati', loadChildren: () => import('./individual-flats-list/individual-flats.module').then(m => m.IndividualFlatsListModule) },
  // { path: 'apartment-projects-in-ludhiana', loadChildren: () => import('./individual-flats-list/individual-flats.module').then(m => m.IndividualFlatsListModule) },
  // { path: 'apartment-projects-in-dharwad', loadChildren: () => import('./individual-flats-list/individual-flats.module').then(m => m.IndividualFlatsListModule) },
  // { path: 'apartment-projects-in-kolhapur', loadChildren: () => import('./individual-flats-list/individual-flats.module').then(m => m.IndividualFlatsListModule) },
  // { path: 'apartment-projects-in-mohali', loadChildren: () => import('./individual-flats-list/individual-flats.module').then(m => m.IndividualFlatsListModule) },
  // { path: 'apartment-projects-in-kanpur', loadChildren: () => import('./individual-flats-list/individual-flats.module').then(m => m.IndividualFlatsListModule) },
  // { path: 'apartment-projects-in-thane', loadChildren: () => import('./individual-flats-list/individual-flats.module').then(m => m.IndividualFlatsListModule) },
  // { path: 'apartment-projects-in-jamshedpur', loadChildren: () => import('./individual-flats-list/individual-flats.module').then(m => m.IndividualFlatsListModule) },
  // { path: 'apartment-projects-in-belgaum', loadChildren: () => import('./individual-flats-list/individual-flats.module').then(m => m.IndividualFlatsListModule) },
  // { path: 'apartment-projects-in-puri', loadChildren: () => import('./individual-flats-list/individual-flats.module').then(m => m.IndividualFlatsListModule) },
  // { path: 'apartment-projects-in-meerut', loadChildren: () => import('./individual-flats-list/individual-flats.module').then(m => m.IndividualFlatsListModule) },
  // { path: 'apartment-projects-in-tiruvannamalai', loadChildren: () => import('./individual-flats-list/individual-flats.module').then(m => m.IndividualFlatsListModule) },
  // { path: 'apartment-projects-in-satara', loadChildren: () => import('./individual-flats-list/individual-flats.module').then(m => m.IndividualFlatsListModule) },
  // { path: 'apartment-projects-in-junagadh', loadChildren: () => import('./individual-flats-list/individual-flats.module').then(m => m.IndividualFlatsListModule) },
  // { path: 'apartment-projects-in-vadodara', loadChildren: () => import('./individual-flats-list/individual-flats.module').then(m => m.IndividualFlatsListModule) },
  // { path: 'apartment-projects-in-palwal', loadChildren: () => import('./individual-flats-list/individual-flats.module').then(m => m.IndividualFlatsListModule) },
  // { path: 'apartment-projects-in-panchkula', loadChildren: () => import('./individual-flats-list/individual-flats.module').then(m => m.IndividualFlatsListModule) },
  // { path: 'apartment-projects-in-panipat', loadChildren: () => import('./individual-flats-list/individual-flats.module').then(m => m.IndividualFlatsListModule) },
  // { path: 'apartment-projects-in-calicut', loadChildren: () => import('./individual-flats-list/individual-flats.module').then(m => m.IndividualFlatsListModule) },
  // { path: 'apartment-projects-in-pathanamthitta', loadChildren: () => import('./individual-flats-list/individual-flats.module').then(m => m.IndividualFlatsListModule) },
  // { path: 'apartment-projects-in-haridwar', loadChildren: () => import('./individual-flats-list/individual-flats.module').then(m => m.IndividualFlatsListModule) },
  // { path: 'apartment-projects-in-solan', loadChildren: () => import('./individual-flats-list/individual-flats.module').then(m => m.IndividualFlatsListModule) },
  // { path: 'apartment-projects-in-burhanpur', loadChildren: () => import('./individual-flats-list/individual-flats.module').then(m => m.IndividualFlatsListModule) },
  // { path: 'apartment-projects-in-raipur', loadChildren: () => import('./individual-flats-list/individual-flats.module').then(m => m.IndividualFlatsListModule) },
  // { path: 'apartment-projects-in-kanchipuram', loadChildren: () => import('./individual-flats-list/individual-flats.module').then(m => m.IndividualFlatsListModule) },
  // { path: 'apartment-projects-in-pondicherry', loadChildren: () => import('./individual-flats-list/individual-flats.module').then(m => m.IndividualFlatsListModule) },
  // { path: 'apartment-projects-in-siliguri', loadChildren: () => import('./individual-flats-list/individual-flats.module').then(m => m.IndividualFlatsListModule) },
  // { path: 'apartment-projects-in-gandhinagar', loadChildren: () => import('./individual-flats-list/individual-flats.module').then(m => m.IndividualFlatsListModule) },
  // { path: 'apartment-projects-in-ajmer', loadChildren: () => import('./individual-flats-list/individual-flats.module').then(m => m.IndividualFlatsListModule) },
  // { path: 'apartment-projects-in-varanasi', loadChildren: () => import('./individual-flats-list/individual-flats.module').then(m => m.IndividualFlatsListModule) },
  // { path: 'apartment-projects-in-mathura', loadChildren: () => import('./individual-flats-list/individual-flats.module').then(m => m.IndividualFlatsListModule) },
  // { path: 'apartment-projects-in-dindigul', loadChildren: () => import('./individual-flats-list/individual-flats.module').then(m => m.IndividualFlatsListModule) },
  // { path: 'apartment-projects-in-rewari', loadChildren: () => import('./individual-flats-list/individual-flats.module').then(m => m.IndividualFlatsListModule) },
  // { path: 'apartment-projects-in-solapur', loadChildren: () => import('./individual-flats-list/individual-flats.module').then(m => m.IndividualFlatsListModule) },
  // { path: 'apartment-projects-in-ratnagiri', loadChildren: () => import('./individual-flats-list/individual-flats.module').then(m => m.IndividualFlatsListModule) },
  // { path: 'apartment-projects-in-shantiniketan', loadChildren: () => import('./individual-flats-list/individual-flats.module').then(m => m.IndividualFlatsListModule) },
  // { path: 'apartment-projects-in-rishikesh', loadChildren: () => import('./individual-flats-list/individual-flats.module').then(m => m.IndividualFlatsListModule) },
  // { path: 'apartment-projects-in-rajkor', loadChildren: () => import('./individual-flats-list/individual-flats.module').then(m => m.IndividualFlatsListModule) },
  // { path: 'apartment-projects-in-hapur', loadChildren: () => import('./individual-flats-list/individual-flats.module').then(m => m.IndividualFlatsListModule) },
  // { path: 'apartment-projects-in-chamarajnagar', loadChildren: () => import('./individual-flats-list/individual-flats.module').then(m => m.IndividualFlatsListModule) },
  // { path: 'apartment-projects-in-gulbarga', loadChildren: () => import('./individual-flats-list/individual-flats.module').then(m => m.IndividualFlatsListModule) },
  // { path: 'apartment-projects-in-alwar', loadChildren: () => import('./individual-flats-list/individual-flats.module').then(m => m.IndividualFlatsListModule) },
  // { path: 'apartment-projects-in-tirunelveli', loadChildren: () => import('./individual-flats-list/individual-flats.module').then(m => m.IndividualFlatsListModule) },
  // { path: 'apartment-projects-in-raigad', loadChildren: () => import('./individual-flats-list/individual-flats.module').then(m => m.IndividualFlatsListModule) },
  // { path: 'apartment-projects-in-rajkot', loadChildren: () => import('./individual-flats-list/individual-flats.module').then(m => m.IndividualFlatsListModule) },
  // { path: 'apartment-projects-in-purba-medinipur', loadChildren: () => import('./individual-flats-list/individual-flats.module').then(m => m.IndividualFlatsListModule) },
  // { path: 'apartment-projects-in-chamarajanagar', loadChildren: () => import('./individual-flats-list/individual-flats.module').then(m => m.IndividualFlatsListModule) },
  // { path: 'apartment-projects-in-sangli', loadChildren: () => import('./individual-flats-list/individual-flats.module').then(m => m.IndividualFlatsListModule) },
  // { path: 'apartment-projects-in-ayodhya', loadChildren: () => import('./individual-flats-list/individual-flats.module').then(m => m.IndividualFlatsListModule) },
  // { path: 'apartment-projects-in-bhiwadi', loadChildren: () => import('./individual-flats-list/individual-flats.module').then(m => m.IndividualFlatsListModule) },
  // { path: 'apartment-projects-in-kottayam', loadChildren: () => import('./individual-flats-list/individual-flats.module').then(m => m.IndividualFlatsListModule) },
  // { path: 'apartment-projects-in-kannur', loadChildren: () => import('./individual-flats-list/individual-flats.module').then(m => m.IndividualFlatsListModule) },
  // { path: 'apartment-projects-in-neemrana', loadChildren: () => import('./individual-flats-list/individual-flats.module').then(m => m.IndividualFlatsListModule) },
  // { path: 'apartment-projects-in-thanjavur', loadChildren: () => import('./individual-flats-list/individual-flats.module').then(m => m.IndividualFlatsListModule) },
  // { path: 'apartment-projects-in-kota', loadChildren: () => import('./individual-flats-list/individual-flats.module').then(m => m.IndividualFlatsListModule) },
  // { path: 'apartment-projects-in-bilaspur', loadChildren: () => import('./individual-flats-list/individual-flats.module').then(m => m.IndividualFlatsListModule) },
  // { path: 'apartment-projects-in-navsari', loadChildren: () => import('./individual-flats-list/individual-flats.module').then(m => m.IndividualFlatsListModule) },
  // { path: 'apartment-projects-in-davanegere', loadChildren: () => import('./individual-flats-list/individual-flats.module').then(m => m.IndividualFlatsListModule) },
  // { path: 'apartment-projects-in-jabalpur', loadChildren: () => import('./individual-flats-list/individual-flats.module').then(m => m.IndividualFlatsListModule) },
  // { path: 'apartment-projects-in-gwalior', loadChildren: () => import('./individual-flats-list/individual-flats.module').then(m => m.IndividualFlatsListModule) },
  // { path: 'apartment-projects-in-ujjain', loadChildren: () => import('./individual-flats-list/individual-flats.module').then(m => m.IndividualFlatsListModule) },
  // { path: 'apartment-projects-in-salem', loadChildren: () => import('./individual-flats-list/individual-flats.module').then(m => m.IndividualFlatsListModule) },
  // { path: 'apartment-projects-in-erode', loadChildren: () => import('./individual-flats-list/individual-flats.module').then(m => m.IndividualFlatsListModule) },
  // { path: 'apartment-projects-in-thoothukudi', loadChildren: () => import('./individual-flats-list/individual-flats.module').then(m => m.IndividualFlatsListModule) },
  // { path: 'apartment-projects-in-bareilly', loadChildren: () => import('./individual-flats-list/individual-flats.module').then(m => m.IndividualFlatsListModule) },
  // { path: 'apartment-projects-in-jhansi', loadChildren: () => import('./individual-flats-list/individual-flats.module').then(m => m.IndividualFlatsListModule) },
  // { path: 'apartment-projects-in-tiruchirappalli', loadChildren: () => import('./individual-flats-list/individual-flats.module').then(m => m.IndividualFlatsListModule) },
  // { path: 'apartment-projects-in-hosur', loadChildren: () => import('./individual-flats-list/individual-flats.module').then(m => m.IndividualFlatsListModule) },
  // { path: 'apartment-projects-in-madurai', loadChildren: () => import('./individual-flats-list/individual-flats.module').then(m => m.IndividualFlatsListModule) },
  // { path: 'apartment-projects-in-namakkal', loadChildren: () => import('./individual-flats-list/individual-flats.module').then(m => m.IndividualFlatsListModule) },
  // { path: 'apartment-projects-in-tiruppur', loadChildren: () => import('./individual-flats-list/individual-flats.module').then(m => m.IndividualFlatsListModule) },
  // { path: 'apartment-projects-in-vellore', loadChildren: () => import('./individual-flats-list/individual-flats.module').then(m => m.IndividualFlatsListModule) },
  // { path: 'apartment-projects-in-viluppuram', loadChildren: () => import('./individual-flats-list/individual-flats.module').then(m => m.IndividualFlatsListModule) },
  // { path: 'apartment-projects-in-koonimedu', loadChildren: () => import('./individual-flats-list/individual-flats.module').then(m => m.IndividualFlatsListModule) },
  // { path: 'apartment-projects-in-theni', loadChildren: () => import('./individual-flats-list/individual-flats.module').then(m => m.IndividualFlatsListModule) },
  // { path: 'apartment-projects-in-kotagiri', loadChildren: () => import('./individual-flats-list/individual-flats.module').then(m => m.IndividualFlatsListModule) },
  // { path: 'apartment-projects-in-krishnagri', loadChildren: () => import('./individual-flats-list/individual-flats.module').then(m => m.IndividualFlatsListModule) },
  //  ############################### Category 2 ###############################

  //  ############################### Category 3 ###############################

  // { path: 'land-projects-in-bangalore', loadChildren: () => import('./individual-plot-list/individual-plot-list.module').then(m => m.IndividualPlotListModule) },
  // { path: 'land-projects-in-hyderabad', loadChildren: () => import('./individual-plot-list/individual-plot-list.module').then(m => m.IndividualPlotListModule) },
  // { path: 'land-projects-in-chennai', loadChildren: () => import('./individual-plot-list/individual-plot-list.module').then(m => m.IndividualPlotListModule) },
  // { path: 'land-projects-in-kochi', loadChildren: () => import('./individual-plot-list/individual-plot-list.module').then(m => m.IndividualPlotListModule) },
  // { path: 'land-projects-in-pune', loadChildren: () => import('./individual-plot-list/individual-plot-list.module').then(m => m.IndividualPlotListModule) },
  // { path: 'land-projects-in-mumbai', loadChildren: () => import('./individual-plot-list/individual-plot-list.module').then(m => m.IndividualPlotListModule) },
  // { path: 'land-projects-in-delhi', loadChildren: () => import('./individual-plot-list/individual-plot-list.module').then(m => m.IndividualPlotListModule) },
  // { path: 'land-projects-in-kolkata', loadChildren: () => import('./individual-plot-list/individual-plot-list.module').then(m => m.IndividualPlotListModule) },
  // { path: 'land-projects-in-goa', loadChildren: () => import('./individual-plot-list/individual-plot-list.module').then(m => m.IndividualPlotListModule) },
  // { path: 'land-projects-in-gurgaon', loadChildren: () => import('./individual-plot-list/individual-plot-list.module').then(m => m.IndividualPlotListModule) },
  // { path: 'land-projects-in-mysore', loadChildren: () => import('./individual-plot-list/individual-plot-list.module').then(m => m.IndividualPlotListModule) },
  // { path: 'land-projects-in-coimbatore', loadChildren: () => import('./individual-plot-list/individual-plot-list.module').then(m => m.IndividualPlotListModule) },
  // { path: 'land-projects-in-ahmedabad', loadChildren: () => import('./individual-plot-list/individual-plot-list.module').then(m => m.IndividualPlotListModule) },
  // { path: 'land-projects-in-trivandrum', loadChildren: () => import('./individual-plot-list/individual-plot-list.module').then(m => m.IndividualPlotListModule) },
  // { path: 'land-projects-in-navi-mumbai', loadChildren: () => import('./individual-plot-list/individual-plot-list.module').then(m => m.IndividualPlotListModule) },
  // { path: 'land-projects-in-noida', loadChildren: () => import('./individual-plot-list/individual-plot-list.module').then(m => m.IndividualPlotListModule) },
  // { path: 'land-projects-in-greater-noida', loadChildren: () => import('./individual-plot-list/individual-plot-list.module').then(m => m.IndividualPlotListModule) },
  // { path: 'land-projects-in-bhubaneshwar', loadChildren: () => import('./individual-plot-list/individual-plot-list.module').then(m => m.IndividualPlotListModule) },
  // { path: 'land-projects-in-vijayawada', loadChildren: () => import('./individual-plot-list/individual-plot-list.module').then(m => m.IndividualPlotListModule) },
  // { path: 'land-projects-in-bhopal', loadChildren: () => import('./individual-plot-list/individual-plot-list.module').then(m => m.IndividualPlotListModule) },
  // { path: 'land-projects-in-indore', loadChildren: () => import('./individual-plot-list/individual-plot-list.module').then(m => m.IndividualPlotListModule) },
  // { path: 'land-projects-in-vizag', loadChildren: () => import('./individual-plot-list/individual-plot-list.module').then(m => m.IndividualPlotListModule) },
  // { path: 'land-projects-in-amaravati', loadChildren: () => import('./individual-plot-list/individual-plot-list.module').then(m => m.IndividualPlotListModule) },
  // { path: 'land-projects-in-thrissur', loadChildren: () => import('./individual-plot-list/individual-plot-list.module').then(m => m.IndividualPlotListModule) },
  // { path: 'land-projects-in-tirupati', loadChildren: () => import('./individual-plot-list/individual-plot-list.module').then(m => m.IndividualPlotListModule) },
  // { path: 'land-projects-in-lucknow', loadChildren: () => import('./individual-plot-list/individual-plot-list.module').then(m => m.IndividualPlotListModule) },
  // { path: 'land-projects-in-nashik', loadChildren: () => import('./individual-plot-list/individual-plot-list.module').then(m => m.IndividualPlotListModule) },
  // { path: 'land-projects-in-mangalore', loadChildren: () => import('./individual-plot-list/individual-plot-list.module').then(m => m.IndividualPlotListModule) },
  // { path: 'land-projects-in-nagpur', loadChildren: () => import('./individual-plot-list/individual-plot-list.module').then(m => m.IndividualPlotListModule) },
  // { path: 'land-projects-in-jaipur', loadChildren: () => import('./individual-plot-list/individual-plot-list.module').then(m => m.IndividualPlotListModule) },
  // { path: 'land-projects-in-nellore', loadChildren: () => import('./individual-plot-list/individual-plot-list.module').then(m => m.IndividualPlotListModule) },
  // { path: 'land-projects-in-faridabad', loadChildren: () => import('./individual-plot-list/individual-plot-list.module').then(m => m.IndividualPlotListModule) },
  // { path: 'land-projects-in-chandigarh', loadChildren: () => import('./individual-plot-list/individual-plot-list.module').then(m => m.IndividualPlotListModule) },
  // { path: 'land-projects-in-dehradun', loadChildren: () => import('./individual-plot-list/individual-plot-list.module').then(m => m.IndividualPlotListModule) },
  // { path: 'land-projects-in-ghaziabad', loadChildren: () => import('./individual-plot-list/individual-plot-list.module').then(m => m.IndividualPlotListModule) },
  // { path: 'land-projects-in-ranchi', loadChildren: () => import('./individual-plot-list/individual-plot-list.module').then(m => m.IndividualPlotListModule) },
  // { path: 'land-projects-in-agra', loadChildren: () => import('./individual-plot-list/individual-plot-list.module').then(m => m.IndividualPlotListModule) },
  // { path: 'land-projects-in-durgapur', loadChildren: () => import('./individual-plot-list/individual-plot-list.module').then(m => m.IndividualPlotListModule) },
  // { path: 'land-projects-in-vizianagaram', loadChildren: () => import('./individual-plot-list/individual-plot-list.module').then(m => m.IndividualPlotListModule) },
  // { path: 'land-projects-in-amritsar', loadChildren: () => import('./individual-plot-list/individual-plot-list.module').then(m => m.IndividualPlotListModule) },
  // { path: 'land-projects-in-patna', loadChildren: () => import('./individual-plot-list/individual-plot-list.module').then(m => m.IndividualPlotListModule) },
  // { path: 'land-projects-in-surat', loadChildren: () => import('./individual-plot-list/individual-plot-list.module').then(m => m.IndividualPlotListModule) },
  // { path: 'land-projects-in-guntur', loadChildren: () => import('./individual-plot-list/individual-plot-list.module').then(m => m.IndividualPlotListModule) },
  // { path: 'land-projects-in-aurangabad', loadChildren: () => import('./individual-plot-list/individual-plot-list.module').then(m => m.IndividualPlotListModule) },
  // { path: 'land-projects-in-guwahati', loadChildren: () => import('./individual-plot-list/individual-plot-list.module').then(m => m.IndividualPlotListModule) },
  // { path: 'land-projects-in-ludhiana', loadChildren: () => import('./individual-plot-list/individual-plot-list.module').then(m => m.IndividualPlotListModule) },
  // { path: 'land-projects-in-dharwad', loadChildren: () => import('./individual-plot-list/individual-plot-list.module').then(m => m.IndividualPlotListModule) },
  // { path: 'land-projects-in-kolhapur', loadChildren: () => import('./individual-plot-list/individual-plot-list.module').then(m => m.IndividualPlotListModule) },
  // { path: 'land-projects-in-mohali', loadChildren: () => import('./individual-plot-list/individual-plot-list.module').then(m => m.IndividualPlotListModule) },
  // { path: 'land-projects-in-kanpur', loadChildren: () => import('./individual-plot-list/individual-plot-list.module').then(m => m.IndividualPlotListModule) },
  // { path: 'land-projects-in-thane', loadChildren: () => import('./individual-plot-list/individual-plot-list.module').then(m => m.IndividualPlotListModule) },
  // { path: 'land-projects-in-jamshedpur', loadChildren: () => import('./individual-plot-list/individual-plot-list.module').then(m => m.IndividualPlotListModule) },
  // { path: 'land-projects-in-belgaum', loadChildren: () => import('./individual-plot-list/individual-plot-list.module').then(m => m.IndividualPlotListModule) },
  // { path: 'land-projects-in-puri', loadChildren: () => import('./individual-plot-list/individual-plot-list.module').then(m => m.IndividualPlotListModule) },
  // { path: 'land-projects-in-meerut', loadChildren: () => import('./individual-plot-list/individual-plot-list.module').then(m => m.IndividualPlotListModule) },
  // { path: 'land-projects-in-tiruvannamalai', loadChildren: () => import('./individual-plot-list/individual-plot-list.module').then(m => m.IndividualPlotListModule) },
  // { path: 'land-projects-in-satara', loadChildren: () => import('./individual-plot-list/individual-plot-list.module').then(m => m.IndividualPlotListModule) },
  // { path: 'land-projects-in-junagadh', loadChildren: () => import('./individual-plot-list/individual-plot-list.module').then(m => m.IndividualPlotListModule) },
  // { path: 'land-projects-in-vadodara', loadChildren: () => import('./individual-plot-list/individual-plot-list.module').then(m => m.IndividualPlotListModule) },
  // { path: 'land-projects-in-palwal', loadChildren: () => import('./individual-plot-list/individual-plot-list.module').then(m => m.IndividualPlotListModule) },
  // { path: 'land-projects-in-panchkula', loadChildren: () => import('./individual-plot-list/individual-plot-list.module').then(m => m.IndividualPlotListModule) },
  // { path: 'land-projects-in-panipat', loadChildren: () => import('./individual-plot-list/individual-plot-list.module').then(m => m.IndividualPlotListModule) },
  // { path: 'land-projects-in-calicut', loadChildren: () => import('./individual-plot-list/individual-plot-list.module').then(m => m.IndividualPlotListModule) },
  // { path: 'land-projects-in-pathanamthitta', loadChildren: () => import('./individual-plot-list/individual-plot-list.module').then(m => m.IndividualPlotListModule) },
  // { path: 'land-projects-in-haridwar', loadChildren: () => import('./individual-plot-list/individual-plot-list.module').then(m => m.IndividualPlotListModule) },
  // { path: 'land-projects-in-solan', loadChildren: () => import('./individual-plot-list/individual-plot-list.module').then(m => m.IndividualPlotListModule) },
  // { path: 'land-projects-in-burhanpur', loadChildren: () => import('./individual-plot-list/individual-plot-list.module').then(m => m.IndividualPlotListModule) },
  // { path: 'land-projects-in-raipur', loadChildren: () => import('./individual-plot-list/individual-plot-list.module').then(m => m.IndividualPlotListModule) },
  // { path: 'land-projects-in-kanchipuram', loadChildren: () => import('./individual-plot-list/individual-plot-list.module').then(m => m.IndividualPlotListModule) },
  // { path: 'land-projects-in-pondicherry', loadChildren: () => import('./individual-plot-list/individual-plot-list.module').then(m => m.IndividualPlotListModule) },
  // { path: 'land-projects-in-siliguri', loadChildren: () => import('./individual-plot-list/individual-plot-list.module').then(m => m.IndividualPlotListModule) },
  // { path: 'land-projects-in-gandhinagar', loadChildren: () => import('./individual-plot-list/individual-plot-list.module').then(m => m.IndividualPlotListModule) },
  // { path: 'land-projects-in-ajmer', loadChildren: () => import('./individual-plot-list/individual-plot-list.module').then(m => m.IndividualPlotListModule) },
  // { path: 'land-projects-in-varanasi', loadChildren: () => import('./individual-plot-list/individual-plot-list.module').then(m => m.IndividualPlotListModule) },
  // { path: 'land-projects-in-mathura', loadChildren: () => import('./individual-plot-list/individual-plot-list.module').then(m => m.IndividualPlotListModule) },
  // { path: 'land-projects-in-dindigul', loadChildren: () => import('./individual-plot-list/individual-plot-list.module').then(m => m.IndividualPlotListModule) },
  // { path: 'land-projects-in-rewari', loadChildren: () => import('./individual-plot-list/individual-plot-list.module').then(m => m.IndividualPlotListModule) },
  // { path: 'land-projects-in-solapur', loadChildren: () => import('./individual-plot-list/individual-plot-list.module').then(m => m.IndividualPlotListModule) },
  // { path: 'land-projects-in-ratnagiri', loadChildren: () => import('./individual-plot-list/individual-plot-list.module').then(m => m.IndividualPlotListModule) },
  // { path: 'land-projects-in-shantiniketan', loadChildren: () => import('./individual-plot-list/individual-plot-list.module').then(m => m.IndividualPlotListModule) },
  // { path: 'land-projects-in-rishikesh', loadChildren: () => import('./individual-plot-list/individual-plot-list.module').then(m => m.IndividualPlotListModule) },
  // { path: 'land-projects-in-rajkor', loadChildren: () => import('./individual-plot-list/individual-plot-list.module').then(m => m.IndividualPlotListModule) },
  // { path: 'land-projects-in-hapur', loadChildren: () => import('./individual-plot-list/individual-plot-list.module').then(m => m.IndividualPlotListModule) },
  // { path: 'land-projects-in-chamarajnagar', loadChildren: () => import('./individual-plot-list/individual-plot-list.module').then(m => m.IndividualPlotListModule) },
  // { path: 'land-projects-in-gulbarga', loadChildren: () => import('./individual-plot-list/individual-plot-list.module').then(m => m.IndividualPlotListModule) },
  // { path: 'land-projects-in-alwar', loadChildren: () => import('./individual-plot-list/individual-plot-list.module').then(m => m.IndividualPlotListModule) },
  // { path: 'land-projects-in-tirunelveli', loadChildren: () => import('./individual-plot-list/individual-plot-list.module').then(m => m.IndividualPlotListModule) },
  // { path: 'land-projects-in-raigad', loadChildren: () => import('./individual-plot-list/individual-plot-list.module').then(m => m.IndividualPlotListModule) },
  // { path: 'land-projects-in-rajkot', loadChildren: () => import('./individual-plot-list/individual-plot-list.module').then(m => m.IndividualPlotListModule) },
  // { path: 'land-projects-in-purba-medinipur', loadChildren: () => import('./individual-plot-list/individual-plot-list.module').then(m => m.IndividualPlotListModule) },
  // { path: 'land-projects-in-chamarajanagar', loadChildren: () => import('./individual-plot-list/individual-plot-list.module').then(m => m.IndividualPlotListModule) },
  // { path: 'land-projects-in-sangli', loadChildren: () => import('./individual-plot-list/individual-plot-list.module').then(m => m.IndividualPlotListModule) },
  // { path: 'land-projects-in-ayodhya', loadChildren: () => import('./individual-plot-list/individual-plot-list.module').then(m => m.IndividualPlotListModule) },
  // { path: 'land-projects-in-bhiwadi', loadChildren: () => import('./individual-plot-list/individual-plot-list.module').then(m => m.IndividualPlotListModule) },
  // { path: 'land-projects-in-kottayam', loadChildren: () => import('./individual-plot-list/individual-plot-list.module').then(m => m.IndividualPlotListModule) },
  // { path: 'land-projects-in-kannur', loadChildren: () => import('./individual-plot-list/individual-plot-list.module').then(m => m.IndividualPlotListModule) },
  // { path: 'land-projects-in-neemrana', loadChildren: () => import('./individual-plot-list/individual-plot-list.module').then(m => m.IndividualPlotListModule) },
  // { path: 'land-projects-in-thanjavur', loadChildren: () => import('./individual-plot-list/individual-plot-list.module').then(m => m.IndividualPlotListModule) },
  // { path: 'land-projects-in-kota', loadChildren: () => import('./individual-plot-list/individual-plot-list.module').then(m => m.IndividualPlotListModule) },
  // { path: 'land-projects-in-bilaspur', loadChildren: () => import('./individual-plot-list/individual-plot-list.module').then(m => m.IndividualPlotListModule) },
  // { path: 'land-projects-in-navsari', loadChildren: () => import('./individual-plot-list/individual-plot-list.module').then(m => m.IndividualPlotListModule) },
  // { path: 'land-projects-in-davanegere', loadChildren: () => import('./individual-plot-list/individual-plot-list.module').then(m => m.IndividualPlotListModule) },
  // { path: 'land-projects-in-jabalpur', loadChildren: () => import('./individual-plot-list/individual-plot-list.module').then(m => m.IndividualPlotListModule) },
  // { path: 'land-projects-in-gwalior', loadChildren: () => import('./individual-plot-list/individual-plot-list.module').then(m => m.IndividualPlotListModule) },
  // { path: 'land-projects-in-ujjain', loadChildren: () => import('./individual-plot-list/individual-plot-list.module').then(m => m.IndividualPlotListModule) },
  // { path: 'land-projects-in-salem', loadChildren: () => import('./individual-plot-list/individual-plot-list.module').then(m => m.IndividualPlotListModule) },
  // { path: 'land-projects-in-erode', loadChildren: () => import('./individual-plot-list/individual-plot-list.module').then(m => m.IndividualPlotListModule) },
  // { path: 'land-projects-in-thoothukudi', loadChildren: () => import('./individual-plot-list/individual-plot-list.module').then(m => m.IndividualPlotListModule) },
  // { path: 'land-projects-in-bareilly', loadChildren: () => import('./individual-plot-list/individual-plot-list.module').then(m => m.IndividualPlotListModule) },
  // { path: 'land-projects-in-jhansi', loadChildren: () => import('./individual-plot-list/individual-plot-list.module').then(m => m.IndividualPlotListModule) },
  // { path: 'land-projects-in-tiruchirappalli', loadChildren: () => import('./individual-plot-list/individual-plot-list.module').then(m => m.IndividualPlotListModule) },
  // { path: 'land-projects-in-hosur', loadChildren: () => import('./individual-plot-list/individual-plot-list.module').then(m => m.IndividualPlotListModule) },
  // { path: 'land-projects-in-madurai', loadChildren: () => import('./individual-plot-list/individual-plot-list.module').then(m => m.IndividualPlotListModule) },
  // { path: 'land-projects-in-namakkal', loadChildren: () => import('./individual-plot-list/individual-plot-list.module').then(m => m.IndividualPlotListModule) },
  // { path: 'land-projects-in-tiruppur', loadChildren: () => import('./individual-plot-list/individual-plot-list.module').then(m => m.IndividualPlotListModule) },
  // { path: 'land-projects-in-vellore', loadChildren: () => import('./individual-plot-list/individual-plot-list.module').then(m => m.IndividualPlotListModule) },
  // { path: 'land-projects-in-viluppuram', loadChildren: () => import('./individual-plot-list/individual-plot-list.module').then(m => m.IndividualPlotListModule) },
  // { path: 'land-projects-in-koonimedu', loadChildren: () => import('./individual-plot-list/individual-plot-list.module').then(m => m.IndividualPlotListModule) },
  // { path: 'land-projects-in-theni', loadChildren: () => import('./individual-plot-list/individual-plot-list.module').then(m => m.IndividualPlotListModule) },
  // { path: 'land-projects-in-kotagiri', loadChildren: () => import('./individual-plot-list/individual-plot-list.module').then(m => m.IndividualPlotListModule) },
  // { path: 'land-projects-in-krishnagri', loadChildren: () => import('./individual-plot-list/individual-plot-list.module').then(m => m.IndividualPlotListModule) },
  //  ############################### Category 3 ###############################

  //  ############################### Category 4 ###############################

  // { path: 'villa-projects-in-bangalore', loadChildren: () => import('./individual-villa-list/individual-villa-list.module').then(m => m.IndividualVillaListModule) },
  // { path: 'villa-projects-in-hyderabad', loadChildren: () => import('./individual-villa-list/individual-villa-list.module').then(m => m.IndividualVillaListModule) },
  // { path: 'villa-projects-in-chennai', loadChildren: () => import('./individual-villa-list/individual-villa-list.module').then(m => m.IndividualVillaListModule) },
  // { path: 'villa-projects-in-kochi', loadChildren: () => import('./individual-villa-list/individual-villa-list.module').then(m => m.IndividualVillaListModule) },
  // { path: 'villa-projects-in-pune', loadChildren: () => import('./individual-villa-list/individual-villa-list.module').then(m => m.IndividualVillaListModule) },
  // { path: 'villa-projects-in-mumbai', loadChildren: () => import('./individual-villa-list/individual-villa-list.module').then(m => m.IndividualVillaListModule) },
  // { path: 'villa-projects-in-delhi', loadChildren: () => import('./individual-villa-list/individual-villa-list.module').then(m => m.IndividualVillaListModule) },
  // { path: 'villa-projects-in-kolkata', loadChildren: () => import('./individual-villa-list/individual-villa-list.module').then(m => m.IndividualVillaListModule) },
  // { path: 'villa-projects-in-goa', loadChildren: () => import('./individual-villa-list/individual-villa-list.module').then(m => m.IndividualVillaListModule) },
  // { path: 'villa-projects-in-gurgaon', loadChildren: () => import('./individual-villa-list/individual-villa-list.module').then(m => m.IndividualVillaListModule) },
  // { path: 'villa-projects-in-mysore', loadChildren: () => import('./individual-villa-list/individual-villa-list.module').then(m => m.IndividualVillaListModule) },
  // { path: 'villa-projects-in-coimbatore', loadChildren: () => import('./individual-villa-list/individual-villa-list.module').then(m => m.IndividualVillaListModule) },
  // { path: 'villa-projects-in-ahmedabad', loadChildren: () => import('./individual-villa-list/individual-villa-list.module').then(m => m.IndividualVillaListModule) },
  // { path: 'villa-projects-in-trivandrum', loadChildren: () => import('./individual-villa-list/individual-villa-list.module').then(m => m.IndividualVillaListModule) },
  // { path: 'villa-projects-in-navi-mumbai', loadChildren: () => import('./individual-villa-list/individual-villa-list.module').then(m => m.IndividualVillaListModule) },
  // { path: 'villa-projects-in-noida', loadChildren: () => import('./individual-villa-list/individual-villa-list.module').then(m => m.IndividualVillaListModule) },
  // { path: 'villa-projects-in-greater-noida', loadChildren: () => import('./individual-villa-list/individual-villa-list.module').then(m => m.IndividualVillaListModule) },
  // { path: 'villa-projects-in-bhubaneshwar', loadChildren: () => import('./individual-villa-list/individual-villa-list.module').then(m => m.IndividualVillaListModule) },
  // { path: 'villa-projects-in-vijayawada', loadChildren: () => import('./individual-villa-list/individual-villa-list.module').then(m => m.IndividualVillaListModule) },
  // { path: 'villa-projects-in-bhopal', loadChildren: () => import('./individual-villa-list/individual-villa-list.module').then(m => m.IndividualVillaListModule) },
  // { path: 'villa-projects-in-indore', loadChildren: () => import('./individual-villa-list/individual-villa-list.module').then(m => m.IndividualVillaListModule) },
  // { path: 'villa-projects-in-vizag', loadChildren: () => import('./individual-villa-list/individual-villa-list.module').then(m => m.IndividualVillaListModule) },
  // { path: 'villa-projects-in-amaravati', loadChildren: () => import('./individual-villa-list/individual-villa-list.module').then(m => m.IndividualVillaListModule) },
  // { path: 'villa-projects-in-thrissur', loadChildren: () => import('./individual-villa-list/individual-villa-list.module').then(m => m.IndividualVillaListModule) },
  // { path: 'villa-projects-in-tirupati', loadChildren: () => import('./individual-villa-list/individual-villa-list.module').then(m => m.IndividualVillaListModule) },
  // { path: 'villa-projects-in-lucknow', loadChildren: () => import('./individual-villa-list/individual-villa-list.module').then(m => m.IndividualVillaListModule) },
  // { path: 'villa-projects-in-nashik', loadChildren: () => import('./individual-villa-list/individual-villa-list.module').then(m => m.IndividualVillaListModule) },
  // { path: 'villa-projects-in-mangalore', loadChildren: () => import('./individual-villa-list/individual-villa-list.module').then(m => m.IndividualVillaListModule) },
  // { path: 'villa-projects-in-nagpur', loadChildren: () => import('./individual-villa-list/individual-villa-list.module').then(m => m.IndividualVillaListModule) },
  // { path: 'villa-projects-in-jaipur', loadChildren: () => import('./individual-villa-list/individual-villa-list.module').then(m => m.IndividualVillaListModule) },
  // { path: 'villa-projects-in-nellore', loadChildren: () => import('./individual-villa-list/individual-villa-list.module').then(m => m.IndividualVillaListModule) },
  // { path: 'villa-projects-in-faridabad', loadChildren: () => import('./individual-villa-list/individual-villa-list.module').then(m => m.IndividualVillaListModule) },
  // { path: 'villa-projects-in-chandigarh', loadChildren: () => import('./individual-villa-list/individual-villa-list.module').then(m => m.IndividualVillaListModule) },
  // { path: 'villa-projects-in-dehradun', loadChildren: () => import('./individual-villa-list/individual-villa-list.module').then(m => m.IndividualVillaListModule) },
  // { path: 'villa-projects-in-ghaziabad', loadChildren: () => import('./individual-villa-list/individual-villa-list.module').then(m => m.IndividualVillaListModule) },
  // { path: 'villa-projects-in-ranchi', loadChildren: () => import('./individual-villa-list/individual-villa-list.module').then(m => m.IndividualVillaListModule) },
  // { path: 'villa-projects-in-agra', loadChildren: () => import('./individual-villa-list/individual-villa-list.module').then(m => m.IndividualVillaListModule) },
  // { path: 'villa-projects-in-durgapur', loadChildren: () => import('./individual-villa-list/individual-villa-list.module').then(m => m.IndividualVillaListModule) },
  // { path: 'villa-projects-in-vizianagaram', loadChildren: () => import('./individual-villa-list/individual-villa-list.module').then(m => m.IndividualVillaListModule) },
  // { path: 'villa-projects-in-amritsar', loadChildren: () => import('./individual-villa-list/individual-villa-list.module').then(m => m.IndividualVillaListModule) },
  // { path: 'villa-projects-in-patna', loadChildren: () => import('./individual-villa-list/individual-villa-list.module').then(m => m.IndividualVillaListModule) },
  // { path: 'villa-projects-in-surat', loadChildren: () => import('./individual-villa-list/individual-villa-list.module').then(m => m.IndividualVillaListModule) },
  // { path: 'villa-projects-in-guntur', loadChildren: () => import('./individual-villa-list/individual-villa-list.module').then(m => m.IndividualVillaListModule) },
  // { path: 'villa-projects-in-aurangabad', loadChildren: () => import('./individual-villa-list/individual-villa-list.module').then(m => m.IndividualVillaListModule) },
  // { path: 'villa-projects-in-guwahati', loadChildren: () => import('./individual-villa-list/individual-villa-list.module').then(m => m.IndividualVillaListModule) },
  // { path: 'villa-projects-in-ludhiana', loadChildren: () => import('./individual-villa-list/individual-villa-list.module').then(m => m.IndividualVillaListModule) },
  // { path: 'villa-projects-in-dharwad', loadChildren: () => import('./individual-villa-list/individual-villa-list.module').then(m => m.IndividualVillaListModule) },
  // { path: 'villa-projects-in-kolhapur', loadChildren: () => import('./individual-villa-list/individual-villa-list.module').then(m => m.IndividualVillaListModule) },
  // { path: 'villa-projects-in-mohali', loadChildren: () => import('./individual-villa-list/individual-villa-list.module').then(m => m.IndividualVillaListModule) },
  // { path: 'villa-projects-in-kanpur', loadChildren: () => import('./individual-villa-list/individual-villa-list.module').then(m => m.IndividualVillaListModule) },
  // { path: 'villa-projects-in-thane', loadChildren: () => import('./individual-villa-list/individual-villa-list.module').then(m => m.IndividualVillaListModule) },
  // { path: 'villa-projects-in-jamshedpur', loadChildren: () => import('./individual-villa-list/individual-villa-list.module').then(m => m.IndividualVillaListModule) },
  // { path: 'villa-projects-in-belgaum', loadChildren: () => import('./individual-villa-list/individual-villa-list.module').then(m => m.IndividualVillaListModule) },
  // { path: 'villa-projects-in-puri', loadChildren: () => import('./individual-villa-list/individual-villa-list.module').then(m => m.IndividualVillaListModule) },
  // { path: 'villa-projects-in-meerut', loadChildren: () => import('./individual-villa-list/individual-villa-list.module').then(m => m.IndividualVillaListModule) },
  // { path: 'villa-projects-in-tiruvannamalai', loadChildren: () => import('./individual-villa-list/individual-villa-list.module').then(m => m.IndividualVillaListModule) },
  // { path: 'villa-projects-in-satara', loadChildren: () => import('./individual-villa-list/individual-villa-list.module').then(m => m.IndividualVillaListModule) },
  // { path: 'villa-projects-in-junagadh', loadChildren: () => import('./individual-villa-list/individual-villa-list.module').then(m => m.IndividualVillaListModule) },
  // { path: 'villa-projects-in-vadodara', loadChildren: () => import('./individual-villa-list/individual-villa-list.module').then(m => m.IndividualVillaListModule) },
  // { path: 'villa-projects-in-palwal', loadChildren: () => import('./individual-villa-list/individual-villa-list.module').then(m => m.IndividualVillaListModule) },
  // { path: 'villa-projects-in-panchkula', loadChildren: () => import('./individual-villa-list/individual-villa-list.module').then(m => m.IndividualVillaListModule) },
  // { path: 'villa-projects-in-panipat', loadChildren: () => import('./individual-villa-list/individual-villa-list.module').then(m => m.IndividualVillaListModule) },
  // { path: 'villa-projects-in-calicut', loadChildren: () => import('./individual-villa-list/individual-villa-list.module').then(m => m.IndividualVillaListModule) },
  // { path: 'villa-projects-in-pathanamthitta', loadChildren: () => import('./individual-villa-list/individual-villa-list.module').then(m => m.IndividualVillaListModule) },
  // { path: 'villa-projects-in-haridwar', loadChildren: () => import('./individual-villa-list/individual-villa-list.module').then(m => m.IndividualVillaListModule) },
  // { path: 'villa-projects-in-solan', loadChildren: () => import('./individual-villa-list/individual-villa-list.module').then(m => m.IndividualVillaListModule) },
  // { path: 'villa-projects-in-burhanpur', loadChildren: () => import('./individual-villa-list/individual-villa-list.module').then(m => m.IndividualVillaListModule) },
  // { path: 'villa-projects-in-raipur', loadChildren: () => import('./individual-villa-list/individual-villa-list.module').then(m => m.IndividualVillaListModule) },
  // { path: 'villa-projects-in-kanchipuram', loadChildren: () => import('./individual-villa-list/individual-villa-list.module').then(m => m.IndividualVillaListModule) },
  // { path: 'villa-projects-in-pondicherry', loadChildren: () => import('./individual-villa-list/individual-villa-list.module').then(m => m.IndividualVillaListModule) },
  // { path: 'villa-projects-in-siliguri', loadChildren: () => import('./individual-villa-list/individual-villa-list.module').then(m => m.IndividualVillaListModule) },
  // { path: 'villa-projects-in-gandhinagar', loadChildren: () => import('./individual-villa-list/individual-villa-list.module').then(m => m.IndividualVillaListModule) },
  // { path: 'villa-projects-in-ajmer', loadChildren: () => import('./individual-villa-list/individual-villa-list.module').then(m => m.IndividualVillaListModule) },
  // { path: 'villa-projects-in-varanasi', loadChildren: () => import('./individual-villa-list/individual-villa-list.module').then(m => m.IndividualVillaListModule) },
  // { path: 'villa-projects-in-mathura', loadChildren: () => import('./individual-villa-list/individual-villa-list.module').then(m => m.IndividualVillaListModule) },
  // { path: 'villa-projects-in-dindigul', loadChildren: () => import('./individual-villa-list/individual-villa-list.module').then(m => m.IndividualVillaListModule) },
  // { path: 'villa-projects-in-rewari', loadChildren: () => import('./individual-villa-list/individual-villa-list.module').then(m => m.IndividualVillaListModule) },
  // { path: 'villa-projects-in-solapur', loadChildren: () => import('./individual-villa-list/individual-villa-list.module').then(m => m.IndividualVillaListModule) },
  // { path: 'villa-projects-in-ratnagiri', loadChildren: () => import('./individual-villa-list/individual-villa-list.module').then(m => m.IndividualVillaListModule) },
  // { path: 'villa-projects-in-shantiniketan', loadChildren: () => import('./individual-villa-list/individual-villa-list.module').then(m => m.IndividualVillaListModule) },
  // { path: 'villa-projects-in-rishikesh', loadChildren: () => import('./individual-villa-list/individual-villa-list.module').then(m => m.IndividualVillaListModule) },
  // { path: 'villa-projects-in-rajkor', loadChildren: () => import('./individual-villa-list/individual-villa-list.module').then(m => m.IndividualVillaListModule) },
  // { path: 'villa-projects-in-hapur', loadChildren: () => import('./individual-villa-list/individual-villa-list.module').then(m => m.IndividualVillaListModule) },
  // { path: 'villa-projects-in-chamarajnagar', loadChildren: () => import('./individual-villa-list/individual-villa-list.module').then(m => m.IndividualVillaListModule) },
  // { path: 'villa-projects-in-gulbarga', loadChildren: () => import('./individual-villa-list/individual-villa-list.module').then(m => m.IndividualVillaListModule) },
  // { path: 'villa-projects-in-alwar', loadChildren: () => import('./individual-villa-list/individual-villa-list.module').then(m => m.IndividualVillaListModule) },
  // { path: 'villa-projects-in-tirunelveli', loadChildren: () => import('./individual-villa-list/individual-villa-list.module').then(m => m.IndividualVillaListModule) },
  // { path: 'villa-projects-in-raigad', loadChildren: () => import('./individual-villa-list/individual-villa-list.module').then(m => m.IndividualVillaListModule) },
  // { path: 'villa-projects-in-rajkot', loadChildren: () => import('./individual-villa-list/individual-villa-list.module').then(m => m.IndividualVillaListModule) },
  // { path: 'villa-projects-in-purba-medinipur', loadChildren: () => import('./individual-villa-list/individual-villa-list.module').then(m => m.IndividualVillaListModule) },
  // { path: 'villa-projects-in-chamarajanagar', loadChildren: () => import('./individual-villa-list/individual-villa-list.module').then(m => m.IndividualVillaListModule) },
  // { path: 'villa-projects-in-sangli', loadChildren: () => import('./individual-villa-list/individual-villa-list.module').then(m => m.IndividualVillaListModule) },
  // { path: 'villa-projects-in-ayodhya', loadChildren: () => import('./individual-villa-list/individual-villa-list.module').then(m => m.IndividualVillaListModule) },
  // { path: 'villa-projects-in-bhiwadi', loadChildren: () => import('./individual-villa-list/individual-villa-list.module').then(m => m.IndividualVillaListModule) },
  // { path: 'villa-projects-in-kottayam', loadChildren: () => import('./individual-villa-list/individual-villa-list.module').then(m => m.IndividualVillaListModule) },
  // { path: 'villa-projects-in-kannur', loadChildren: () => import('./individual-villa-list/individual-villa-list.module').then(m => m.IndividualVillaListModule) },
  // { path: 'villa-projects-in-neemrana', loadChildren: () => import('./individual-villa-list/individual-villa-list.module').then(m => m.IndividualVillaListModule) },
  // { path: 'villa-projects-in-thanjavur', loadChildren: () => import('./individual-villa-list/individual-villa-list.module').then(m => m.IndividualVillaListModule) },
  // { path: 'villa-projects-in-kota', loadChildren: () => import('./individual-villa-list/individual-villa-list.module').then(m => m.IndividualVillaListModule) },
  // { path: 'villa-projects-in-bilaspur', loadChildren: () => import('./individual-villa-list/individual-villa-list.module').then(m => m.IndividualVillaListModule) },
  // { path: 'villa-projects-in-navsari', loadChildren: () => import('./individual-villa-list/individual-villa-list.module').then(m => m.IndividualVillaListModule) },
  // { path: 'villa-projects-in-davanegere', loadChildren: () => import('./individual-villa-list/individual-villa-list.module').then(m => m.IndividualVillaListModule) },
  // { path: 'villa-projects-in-jabalpur', loadChildren: () => import('./individual-villa-list/individual-villa-list.module').then(m => m.IndividualVillaListModule) },
  // { path: 'villa-projects-in-gwalior', loadChildren: () => import('./individual-villa-list/individual-villa-list.module').then(m => m.IndividualVillaListModule) },
  // { path: 'villa-projects-in-ujjain', loadChildren: () => import('./individual-villa-list/individual-villa-list.module').then(m => m.IndividualVillaListModule) },
  // { path: 'villa-projects-in-salem', loadChildren: () => import('./individual-villa-list/individual-villa-list.module').then(m => m.IndividualVillaListModule) },
  // { path: 'villa-projects-in-erode', loadChildren: () => import('./individual-villa-list/individual-villa-list.module').then(m => m.IndividualVillaListModule) },
  // { path: 'villa-projects-in-thoothukudi', loadChildren: () => import('./individual-villa-list/individual-villa-list.module').then(m => m.IndividualVillaListModule) },
  // { path: 'villa-projects-in-bareilly', loadChildren: () => import('./individual-villa-list/individual-villa-list.module').then(m => m.IndividualVillaListModule) },
  // { path: 'villa-projects-in-jhansi', loadChildren: () => import('./individual-villa-list/individual-villa-list.module').then(m => m.IndividualVillaListModule) },
  // { path: 'villa-projects-in-tiruchirappalli', loadChildren: () => import('./individual-villa-list/individual-villa-list.module').then(m => m.IndividualVillaListModule) },
  // { path: 'villa-projects-in-hosur', loadChildren: () => import('./individual-villa-list/individual-villa-list.module').then(m => m.IndividualVillaListModule) },
  // { path: 'villa-projects-in-madurai', loadChildren: () => import('./individual-villa-list/individual-villa-list.module').then(m => m.IndividualVillaListModule) },
  // { path: 'villa-projects-in-namakkal', loadChildren: () => import('./individual-villa-list/individual-villa-list.module').then(m => m.IndividualVillaListModule) },
  // { path: 'villa-projects-in-tiruppur', loadChildren: () => import('./individual-villa-list/individual-villa-list.module').then(m => m.IndividualVillaListModule) },
  // { path: 'villa-projects-in-vellore', loadChildren: () => import('./individual-villa-list/individual-villa-list.module').then(m => m.IndividualVillaListModule) },
  // { path: 'villa-projects-in-viluppuram', loadChildren: () => import('./individual-villa-list/individual-villa-list.module').then(m => m.IndividualVillaListModule) },
  // { path: 'villa-projects-in-koonimedu', loadChildren: () => import('./individual-villa-list/individual-villa-list.module').then(m => m.IndividualVillaListModule) },
  // { path: 'villa-projects-in-theni', loadChildren: () => import('./individual-villa-list/individual-villa-list.module').then(m => m.IndividualVillaListModule) },
  // { path: 'villa-projects-in-kotagiri', loadChildren: () => import('./individual-villa-list/individual-villa-list.module').then(m => m.IndividualVillaListModule) },
  // { path: 'villa-projects-in-krishnagri', loadChildren: () => import('./individual-villa-list/individual-villa-list.module').then(m => m.IndividualVillaListModule) },
  //  ############################### Category 4 ###############################

  //  ############################### Category 5 ###############################

  // { path: 'buy/:projects-for-sale-in-:localityname-:cityname-:localityid', loadChildren: () => import('./individual-locality-list/individual-locality-list.module').then(m => m.IndividualLocalityListModule) },
  // { path: 'listings/:individualproperty', loadChildren: () => import('./individual-details/individual-details.module').then(m => m.IndividualDetailsModule) },

  //  ############################### Category 5 ###############################

  // ************************************************************** INDIVIDUAL LISTING SECTIONS ENDS **************************************************************

  // ############################### BLOG PAGE SECTIONS STARTS ###############################
  // 

  // { path: 'blogs', loadChildren: () => import('./blogs-list/blogs-list.module').then(m => m.BlogsListModule) },

  // ######################## Angular 20 ############################
  // { path: 'articles/web-stories', loadChildren: () => import('./blog-listing-webstory/blog-listing-webstory.module').then(m => m.BlogListingWebstoryModule) },
  // { path: 'articles/video-blogs', loadChildren: () => import('./blogs-video/blogs-video.module').then(m => m.BlogsVideoModule) },
  // { path: 'articles/expert-opinions-on-indian-realestate-16', loadChildren: () => import('./experts-blogs/experts-blogs.module').then(m => m.ExpertblogsModule) },
  // { path: 'articles/tips-for-buying-a-house-4', loadChildren: () => import('./blog-category/blog-category-module').then(m => m.BlogsCategoryModule) },
  // { path: 'articles/top-real-estate-news-7', loadChildren: () => import('./blog-category/blog-category-module').then(m => m.BlogsCategoryModule) },
  // { path: 'articles/our-trending-blogs-1', loadChildren: () => import('./blog-category/blog-category-module').then(m => m.BlogsCategoryModule) },
  // { path: 'articles/our-latest-updates-2', loadChildren: () => import('./blog-category/blog-category-module').then(m => m.BlogsCategoryModule) },
  // { path: 'articles/interior-design-ideas-5', loadChildren: () => import('./blog-category/blog-category-module').then(m => m.BlogsCategoryModule) },
  // { path: 'articles/technology-blogs-6', loadChildren: () => import('./blog-category/blog-category-module').then(m => m.BlogsCategoryModule) },
  // { path: 'articles/vastu-shastra-tips-8', loadChildren: () => import('./blog-category/blog-category-module').then(m => m.BlogsCategoryModule) },
  // { path: 'articles/healthy-lifestyle-blogs-9', loadChildren: () => import('./blog-category/blog-category-module').then(m => m.BlogsCategoryModule) },
  // { path: 'articles/modern-construction-techniques-10', loadChildren: () => import('./blog-category/blog-category-module').then(m => m.BlogsCategoryModule) },
  // { path: 'articles/health-fitness-blogs-11', loadChildren: () => import('./blog-category/blog-category-module').then(m => m.BlogsCategoryModule) },
  // { path: 'articles/diy-decor-ideas-12', loadChildren: () => import('./blog-category/blog-category-module').then(m => m.BlogsCategoryModule) },
  // { path: 'articles/finance-loan-taxes-13', loadChildren: () => import('./blog-category/blog-category-module').then(m => m.BlogsCategoryModule) },
  // { path: 'articles/most-popular-news-14', loadChildren: () => import('./blog-category/blog-category-module').then(m => m.BlogsCategoryModule) },
  // { path: 'articles/indian-realestate-articles-17', loadChildren: () => import('./blog-category/blog-category-module').then(m => m.BlogsCategoryModule) },
  // { path: 'articles/popular-indian-festivals-15', loadChildren: () => import('./blog-category/blog-category-module').then(m => m.BlogsCategoryModule) },
  // ######################## Angular 20 ############################
  // { path: 'blogs/:url-:id', loadChildren: () => import('./blogs-details/blogs-details.module').then(m => m.BlogsDetailsModule), },

  // { path: 'blogs/experts-voice/:url-:id', loadChildren: () => import('./expert-blog-details/expert-blog-details-module').then(m => m.ExpertDetailsModule), },

  // ######################## Angular 20 ############################
  // { path: 'blogs/:url-:id', loadChildren: () => import('./blogs-details-webstory/blogs-details-webstory.module').then(m => m.BlogsDetailsWebstoryModule) },
  // ######################## Angular 20 ############################

  { path: 'free-blogging-site', loadChildren: () => import('./blog-landing/blog-landing.module').then(m => m.BlogLandingModule) },
  { path: 'blogs', loadChildren: () => import('./blogs-list-test/blogs-list-test.module').then(m => m.BlogsListTestModule) },
  
  // ############################### BLOG PAGE SECTIONS ENDS ###############################

  // ############################### LOGIN SESSION URLS STARTS ###############################

  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  { path: 'userauth/wishlist/:id', loadChildren: () => import('./seen-projetcs/seen-projetcs.module').then(m => m.SeenProjetcsModule) },
  // { path: 'userauth/wishlist/:id', loadChildren: () => import('./wishlist/wishlist.module').then(m => m.WishlistModule) },
  { path: 'userauth/seenprojects/:id', loadChildren: () => import('./seen-projetcs/seen-projetcs.module').then(m => m.SeenProjetcsModule) },
  { path: 'seenprojects', loadChildren: () => import('./seen-projetcs/seen-projetcs.module').then(m => m.SeenProjetcsModule) },
  // { path: 'userauth/profile/:id', loadChildren: () => import('./profile/profile.module').then(m => m.profileModule) },
  { path: 'reset/password/:id', loadChildren: () => import('./reset-password/reset-password.module').then(m => m.ResetPasswordModule) },
  // { path: 'postproperty', loadChildren: () => import('./postproperty/postproperty.module').then(m => m.PostpropertyModule) },
  { path: 'postproperty', loadChildren: () => import('./post-property1/post-property1.module').then(m => m.PostProperty1Module) },
  { path: 'post-property-new', loadChildren: () => import('./post-property-new/post-property-new.module').then(m => m.PostPropertyNewModule), },
  { path: 'userauth/postpropertynewedit/:typeid/:id', loadChildren: () => import('./post-property-new-edit/post-property-new-edit.module').then(m => m.PostPropertyNewEditModule), },
  { path: 'userauth/sellproperties/:id', loadChildren: () => import('./sell-properties/sell-properties.module').then(m => m.SellPropertiesModule) },
  { path: 'editsellproperties/:id', loadChildren: () => import('./sell-edit-property/sell-edit-property.module').then(m => m.SellEditPropertyModule) },
  { path: 'editrentproperties/:id', loadChildren: () => import('./rent-edit-property/rent-edit-property.module').then(m => m.RentEditPropertyModule) },
  { path: 'userauth/rentalsprojectsedit/:id', loadChildren: () => import('./rent-edit-property/rent-edit-property.module').then(m => m.RentEditPropertyModule) },
  { path: 'userauth/sellingprojects/:id', loadChildren: () => import('./sell-properties/sell-properties.module').then(m => m.SellPropertiesModule), },
  { path: 'userauth/sellingprojectsedit/:id', loadChildren: () => import('./sell-edit-property/sell-edit-property.module').then(m => m.SellEditPropertyModule), },




  { path: 'writeblogs/authors/:bloggerName/:bloggerId', loadChildren: () => import('./write-blogs/write-blogs.module').then(m => m.WriteBlogsModule) },
  { path: 'writeblogs/authors/:bloggerName/:categoryName/:bloggerId/:categoryId', loadChildren: () => import('./write-blogs/write-blogs.module').then(m => m.WriteBlogsModule) },
  { path: 'writeblogs/authors/:bloggerName/:categoryName/:topicName/:bloggerId/:categoryId/:topicId', loadChildren: () => import('./write-blogs/write-blogs.module').then(m => m.WriteBlogsModule) },
  { path: 'writeblogs/editor/:bloggerName/:categoryName/:topicName/:bloggerId/:categoryId/:topicId', loadChildren: () => import('./write-blogs/write-blogs.module').then(m => m.WriteBlogsModule) },

  { path: 'insights/authors/:bloggerName-:bloggertypeId-:bloggerId', loadChildren: () => import('./user-blogs/user-blogs.module').then(m => m.UserBlogsModule) },
  { path: 'insights/authors/:blogCatName/:bloggerName-:blogCatId-:bloggertypeId-:bloggerId', loadChildren: () => import('./user-blogs/user-blogs.module').then(m => m.UserBlogsModule), },
  { path: 'insights/authors/login', loadChildren: () => import('./user-blogs/user-blogs.module').then(m => m.UserBlogsModule) },

  { path: 'userblogs/profile/:bloggerName-:bloggertypeId-:bloggerId', loadChildren: () => import('./user-blogs/user-blogs.module').then(m => m.UserBlogsModule), },
  { path: 'userblogs/manage/:bloggerName/:blogId-:bloggerId', loadChildren: () => import('./user-blogs/user-blogs.module').then(m => m.UserBlogsModule), },
  { path: 'userblogs/editblog/:bloggerName/:blogId-:bloggerId', loadChildren: () => import('./user-blogs/user-blogs.module').then(m => m.UserBlogsModule), },
  // ############################### LOGIN SESSION URLS ENDS ###############################

  // ############################### UNUSED URLS STARTS ###############################

  // {
  //   path: 'properties-in-sarjapur-road-bangalore',
  //   loadChildren: () => import('./advertise/advertise.module').then(m => m.AdvertiseModule),
  // },
  // {
  //   path: 'ahad-excellencia-sarjapur-road-bangalore',
  //   loadChildren: () => import('./ahad-excellencia/ahad-excellencia.module').then(m => m.AhadExcellenciaModule),
  // },

  // {
  //   path: 'dsr-waterscape-bangalore',
  //   loadChildren: () => import('./prop-static/prop-static.module').then(m => m.PropStaticModule),
  // },
  // {
  //   path: 'gr-regent-park-bangalore',
  //   loadChildren: () => import('./prop-static/prop-static.module').then(m => m.PropStaticModule),
  // },
  // {
  //   path: 'azven-breathe-bangalore',
  //   loadChildren: () => import('./prop-static/prop-static.module').then(m => m.PropStaticModule),
  // },
  // {
  //   path: 'lybiana-avila-bangalore',
  //   loadChildren: () => import('./prop-static/prop-static.module').then(m => m.PropStaticModule),
  // },

  // ############################### UNUSED URLS ENDS ###############################

  // ############################### MAIN WEBSITE PAGES STARTS ###############################

  // ############################### CATEGORY 1 ###############################

  // { path: 'residential-flats-in-bangalore-for-sale', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },
  // { path: 'residential-flats-in-hyderabad-for-sale', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },
  // { path: 'residential-flats-in-chennai-for-sale', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },
  // { path: 'residential-flats-in-kochi-for-sale', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },
  // { path: 'residential-flats-in-pune-for-sale', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },
  // { path: 'residential-flats-in-mumbai-for-sale', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },
  // { path: 'residential-flats-in-delhi-for-sale', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },
  // { path: 'residential-flats-in-kolkata-for-sale', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },
  // { path: 'residential-flats-in-goa-for-sale', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },
  // { path: 'residential-flats-in-gurgaon-for-sale', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },
  // { path: 'residential-flats-in-mysore-for-sale', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },
  // { path: 'residential-flats-in-coimbatore-for-sale', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },
  // { path: 'residential-flats-in-ahmedabad-for-sale', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },
  // { path: 'residential-flats-in-trivandrum-for-sale', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },
  // { path: 'residential-flats-in-navi-mumbai-for-sale', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },
  // { path: 'residential-flats-in-noida-for-sale', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },
  // { path: 'residential-flats-in-greater-noida-for-sale', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },
  // { path: 'residential-flats-in-bhubaneshwar-for-sale', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },
  // { path: 'residential-flats-in-vijayawada-for-sale', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },
  // { path: 'residential-flats-in-bhopal-for-sale', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },
  // { path: 'residential-flats-in-indore-for-sale', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },
  // { path: 'residential-flats-in-vizag-for-sale', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },
  // { path: 'residential-flats-in-amaravati-for-sale', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },
  // { path: 'residential-flats-in-thrissur-for-sale', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },
  // { path: 'residential-flats-in-tirupati-for-sale', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },
  // { path: 'residential-flats-in-lucknow-for-sale', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },
  // { path: 'residential-flats-in-nashik-for-sale', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },
  // { path: 'residential-flats-in-mangalore-for-sale', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },
  // { path: 'residential-flats-in-nagpur-for-sale', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },
  // { path: 'residential-flats-in-jaipur-for-sale', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },
  // { path: 'residential-flats-in-nellore-for-sale', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },
  // { path: 'residential-flats-in-faridabad-for-sale', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },
  // { path: 'residential-flats-in-chandigarh-for-sale', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },
  // { path: 'residential-flats-in-dehradun-for-sale', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },
  // { path: 'residential-flats-in-ghaziabad-for-sale', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },
  // { path: 'residential-flats-in-ranchi-for-sale', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },
  // { path: 'residential-flats-in-agra-for-sale', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },
  // { path: 'residential-flats-in-durgapur-for-sale', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },
  // { path: 'residential-flats-in-vizianagaram-for-sale', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },
  // { path: 'residential-flats-in-amritsar-for-sale', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },
  // { path: 'residential-flats-in-patna-for-sale', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },
  // { path: 'residential-flats-in-surat-for-sale', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },
  // { path: 'residential-flats-in-guntur-for-sale', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },
  // { path: 'residential-flats-in-aurangabad-for-sale', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },
  // { path: 'residential-flats-in-guwahati-for-sale', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },
  // { path: 'residential-flats-in-ludhiana-for-sale', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },
  // { path: 'residential-flats-in-dharwad-for-sale', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },
  // { path: 'residential-flats-in-kolhapur-for-sale', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },
  // { path: 'residential-flats-in-mohali-for-sale', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },
  // { path: 'residential-flats-in-kanpur-for-sale', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },
  // { path: 'residential-flats-in-thane-for-sale', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },
  // { path: 'residential-flats-in-jamshedpur-for-sale', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },
  // { path: 'residential-flats-in-belgaum-for-sale', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },
  // { path: 'residential-flats-in-puri-for-sale', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },
  // { path: 'residential-flats-in-meerut-for-sale', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },
  // { path: 'residential-flats-in-tiruvannamalai-for-sale', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },
  // { path: 'residential-flats-in-satara-for-sale', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },
  // { path: 'residential-flats-in-junagadh-for-sale', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },
  // { path: 'residential-flats-in-vadodara-for-sale', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },
  // { path: 'residential-flats-in-palwal-for-sale', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },
  // { path: 'residential-flats-in-panchkula-for-sale', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },
  // { path: 'residential-flats-in-panipat-for-sale', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },
  // { path: 'residential-flats-in-calicut-for-sale', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },
  // { path: 'residential-flats-in-pathanamthitta-for-sale', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },
  // { path: 'residential-flats-in-haridwar-for-sale', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },
  // { path: 'residential-flats-in-solan-for-sale', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },
  // { path: 'residential-flats-in-burhanpur-for-sale', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },
  // { path: 'residential-flats-in-raipur-for-sale', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },
  // { path: 'residential-flats-in-kanchipuram-for-sale', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },
  // { path: 'residential-flats-in-pondicherry-for-sale', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },
  // { path: 'residential-flats-in-siliguri-for-sale', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },
  // { path: 'residential-flats-in-gandhinagar-for-sale', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },
  // { path: 'residential-flats-in-ajmer-for-sale', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },
  // { path: 'residential-flats-in-varanasi-for-sale', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },
  // { path: 'residential-flats-in-mathura-for-sale', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },
  // { path: 'residential-flats-in-dindigul-for-sale', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },
  // { path: 'residential-flats-in-rewari-for-sale', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },
  // { path: 'residential-flats-in-solapur-for-sale', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },
  // { path: 'residential-flats-in-ratnagiri-for-sale', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },
  // { path: 'residential-flats-in-shantiniketan-for-sale', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },
  // { path: 'residential-flats-in-rishikesh-for-sale', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },
  // { path: 'residential-flats-in-rajkor-for-sale', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },
  // { path: 'residential-flats-in-hapur-for-sale', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },
  // { path: 'residential-flats-in-chamarajnagar-for-sale', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },
  // { path: 'residential-flats-in-gulbarga-for-sale', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },
  // { path: 'residential-flats-in-alwar-for-sale', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },
  // { path: 'residential-flats-in-tirunelveli-for-sale', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },
  // { path: 'residential-flats-in-raigad-for-sale', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },
  // { path: 'residential-flats-in-rajkot-for-sale', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },
  // { path: 'residential-flats-in-chamarajanagar-for-sale', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },
  // { path: 'residential-flats-in-sangli-for-sale', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },
  // { path: 'residential-flats-in-purba-medinipur-for-sale', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },
  // { path: 'residential-flats-in-ayodhya-for-sale', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },
  // { path: 'residential-flats-in-bhiwadi-for-sale', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },
  // { path: 'residential-flats-in-kottayam-for-sale', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },
  // { path: 'residential-flats-in-kannur-for-sale', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },
  // { path: 'residential-flats-in-neemrana-for-sale', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },
  // { path: 'residential-flats-in-thanjavur-for-sale', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },
  // { path: 'residential-flats-in-kota-for-sale', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },
  // { path: 'residential-flats-in-bilaspur-for-sale', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },
  // { path: 'residential-flats-in-navsari-for-sale', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },
  // { path: 'residential-flats-in-davanegere-for-sale', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },
  // { path: 'residential-flats-in-jabalpur-for-sale', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },
  // { path: 'residential-flats-in-gwalior-for-sale', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },
  // { path: 'residential-flats-in-ujjain-for-sale', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },
  // { path: 'residential-flats-in-salem-for-sale', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },
  // { path: 'residential-flats-in-erode-for-sale', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },
  // { path: 'residential-flats-in-thoothukudi-for-sale', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },
  // { path: 'residential-flats-in-bareilly-for-sale', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },
  // { path: 'residential-flats-in-jhansi-for-sale', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },
  // { path: 'residential-flats-in-tiruchirappalli-for-sale', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },
  // { path: 'residential-flats-in-hosur-for-sale', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },
  // { path: 'residential-flats-in-madurai-for-sale', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },
  // { path: 'residential-flats-in-namakkal-for-sale', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },
  // { path: 'residential-flats-in-tiruppur-for-sale', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },
  // { path: 'residential-flats-in-vellore-for-sale', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },
  // { path: 'residential-flats-in-viluppuram-for-sale', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },
  // { path: 'residential-flats-in-koonimedu-for-sale', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },
  // { path: 'residential-flats-in-theni-for-sale', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },
  // { path: 'residential-flats-in-kotagiri-for-sale', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },
  // { path: 'residential-flats-in-krishnagri-for-sale', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },



  // { path: 'fbc/:flats-for-30-lakhs-in-city', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },
  // { path: 'fbc/:flats-in-city-for-sale-30-lakhs-to-40-lakhs', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },
  // { path: 'fbc/:flats-in-city-for-sale-40-lakhs-to-50-lakhs', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },
  // { path: 'fbc/:flats-in-city-for-sale-50-lakhs-to-60-lakhs', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },
  // { path: 'fbc/:flats-in-city-for-sale-60-lakhs-to-70-lakhs', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },
  // { path: 'fbc/:flats-in-city-for-sale-70-lakhs-to-80-lakhs', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },
  // { path: 'fbc/:flats-in-city-for-sale-80-lakhs-to-90-lakhs', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },
  // { path: 'fbc/:flats-in-city-for-sale-90-lakhs-to-1-crore', loadChildren: () => import('./residence-for-sale/residence.module').then(m => m.ResidenceModule) },


  //  ############################### CITY BASED LISTING OLD ROUTES - TO BE REMOVED LATER  ###############################
  // { path: 'fbc/:flats-for-30-lakhs-in-city-for-sale', loadChildren: () => import('./city-based-listing/city-based-listing.module').then(m => m.CityBasedListingModule) },
  // { path: 'fbc/:flats-in-city-for-sale-30-lakhs-to-40-lakhs', loadChildren: () => import('./city-based-listing/city-based-listing.module').then(m => m.CityBasedListingModule) },
  // { path: 'fbc/:flats-in-city-for-sale-40-lakhs-to-50-lakhs', loadChildren: () => import('./city-based-listing/city-based-listing.module').then(m => m.CityBasedListingModule) },
  // { path: 'fbc/:flats-in-city-for-sale-50-lakhs-to-60-lakhs', loadChildren: () => import('./city-based-listing/city-based-listing.module').then(m => m.CityBasedListingModule) },
  // { path: 'fbc/:flats-in-city-for-sale-60-lakhs-to-70-lakhs', loadChildren: () => import('./city-based-listing/city-based-listing.module').then(m => m.CityBasedListingModule) },
  // { path: 'fbc/:flats-in-city-for-sale-70-lakhs-to-80-lakhs', loadChildren: () => import('./city-based-listing/city-based-listing.module').then(m => m.CityBasedListingModule) },
  // { path: 'fbc/:flats-in-city-for-sale-80-lakhs-to-90-lakhs', loadChildren: () => import('./city-based-listing/city-based-listing.module').then(m => m.CityBasedListingModule) },
  // { path: 'fbc/:flats-in-city-for-sale-90-lakhs-to-1-crore', loadChildren: () => import('./city-based-listing/city-based-listing.module').then(m => m.CityBasedListingModule) },


  // ############################### CITY BASED LISTING NEW ROUTES ###############################
  // { path: 'fbc/:flats-for-30-lakhs-in-city-for-sale', loadChildren: () => import('./city-based-listing-new/city-based-listing-new.module').then(m => m.CityBasedListingNewModule) },
  // { path: 'fbc/:flats-in-city-for-sale-30-lakhs-to-40-lakhs', loadChildren: () => import('./city-based-listing-new/city-based-listing-new.module').then(m => m.CityBasedListingNewModule) },
  // { path: 'fbc/:flats-in-city-for-sale-40-lakhs-to-50-lakhs', loadChildren: () => import('./city-based-listing-new/city-based-listing-new.module').then(m => m.CityBasedListingNewModule) },
  // { path: 'fbc/:flats-in-city-for-sale-50-lakhs-to-60-lakhs', loadChildren: () => import('./city-based-listing-new/city-based-listing-new.module').then(m => m.CityBasedListingNewModule) },
  // { path: 'fbc/:flats-in-city-for-sale-60-lakhs-to-70-lakhs', loadChildren: () => import('./city-based-listing-new/city-based-listing-new.module').then(m => m.CityBasedListingNewModule) },
  // { path: 'fbc/:flats-in-city-for-sale-70-lakhs-to-80-lakhs', loadChildren: () => import('./city-based-listing-new/city-based-listing-new.module').then(m => m.CityBasedListingNewModule) },
  // { path: 'fbc/:flats-in-city-for-sale-80-lakhs-to-90-lakhs', loadChildren: () => import('./city-based-listing-new/city-based-listing-new.module').then(m => m.CityBasedListingNewModule) },
  // { path: 'fbc/:flats-in-city-for-sale-90-lakhs-to-1-crore', loadChildren: () => import('./city-based-listing-new/city-based-listing-new.module').then(m => m.CityBasedListingNewModule) },



  // ############################### CATEGORY 1 ###############################


  // ################################ Builder Old Routes - To Be Removed Later ###############################
  // { path: 'bbc/:buildername-properties-under-30-lakhs-in-city-builderid', loadChildren: () => import('./builder/builder.module').then(m => m.BuilderModule) },
  // { path: 'bbc/:buildername-properties-30-lakhs-to-40-lakhs-in-city-builderid', loadChildren: () => import('./builder/builder.module').then(m => m.BuilderModule) },
  // { path: 'bbc/:buildername-properties-40-lakhs-to-50-lakhs-in-city-builderid', loadChildren: () => import('./builder/builder.module').then(m => m.BuilderModule) },
  // { path: 'bbc/:buildername-properties-50-lakhs-to-60-lakhs-in-city-builderid', loadChildren: () => import('./builder/builder.module').then(m => m.BuilderModule) },
  // { path: 'bbc/:buildername-properties-60-lakhs-to-70-lakhs-in-city-builderid', loadChildren: () => import('./builder/builder.module').then(m => m.BuilderModule) },
  // { path: 'bbc/:buildername-properties-70-lakhs-to-80-lakhs-in-city-builderid', loadChildren: () => import('./builder/builder.module').then(m => m.BuilderModule) },
  // { path: 'bbc/:buildername-properties-80-lakhs-to-90-lakhs-in-city-builderid', loadChildren: () => import('./builder/builder.module').then(m => m.BuilderModule) },
  // { path: 'bbc/:buildername-properties-90-lakhs-to-1-crore-in-city-builderid', loadChildren: () => import('./builder/builder.module').then(m => m.BuilderModule) },
  // { path: 'bbc/:buildername-properties-above-1-crore-in-city-builderid', loadChildren: () => import('./builder/builder.module').then(m => m.BuilderModule) },
  // { path: 'spbc/:status-properties-by-:buildername-:city-:builderid', loadChildren: () => import('./builder/builder.module').then(m => m.BuilderModule) },
  // { path: 'stbc/:status-:proptype-by-:buildername-:city-:builderid', loadChildren: () => import('./builder/builder.module').then(m => m.BuilderModule) },
  // { path: 'btbc/:bhk-flats-by-:buildername-:city-:builderid', loadChildren: () => import('./builder/builder.module').then(m => m.BuilderModule) },
  // { path: 'bapc/:buildername-affordable-properties-in-:city-:builderid', loadChildren: () => import('./builder/builder.module').then(m => m.BuilderModule) },
  // { path: 'blpc/:buildername-luxury-properties-in-:city-:builderid', loadChildren: () => import('./builder/builder.module').then(m => m.BuilderModule) },
  // // { path: 'batc/:buildername-affordable-properties-in-:city-:builderid', loadChildren: () => import('./builder/builder.module').then(m => m.BuilderModule) },
  // { path: 'batc/:buildername-affordable-apartments-in-:city-:builderid', loadChildren: () => import('./builder/builder.module').then(m => m.BuilderModule) },
  // { path: 'batc/:buildername-affordable-villas-in-:city-:builderid', loadChildren: () => import('./builder/builder.module').then(m => m.BuilderModule) },
  // // { path: 'bltc/:buildername-luxury-properties-in-:city-:builderid', loadChildren: () => import('./builder/builder.module').then(m => m.BuilderModule) },
  // { path: 'bltc/:buildername-luxury-apartments-in-:city-:builderid', loadChildren: () => import('./builder/builder.module').then(m => m.BuilderModule) },
  // { path: 'bltc/:buildername-luxury-villas-in-:city-:builderid', loadChildren: () => import('./builder/builder.module').then(m => m.BuilderModule) },
  // { path: 'brtc/:buildername-apartments-in-:city-:builderid', loadChildren: () => import('./builder/builder.module').then(m => m.BuilderModule) },
  // { path: 'brtc/:buildername-villas-in-:city-:builderid', loadChildren: () => import('./builder/builder.module').then(m => m.BuilderModule) },
  // { path: 'brtc/:buildername-plots-in-:city-:builderid', loadChildren: () => import('./builder/builder.module').then(m => m.BuilderModule) },

  // ################################ Builder New Routes - To Be Used ###############################
  // { path: 'bbc/:buildername-properties-under-30-lakhs-in-city-builderid', loadChildren: () => import('./builder-new/builder-new.module').then(m => m.BuilderModuleNewComponent) },
  // { path: 'bbc/:buildername-properties-30-lakhs-to-40-lakhs-in-city-builderid', loadChildren: () => import('./builder-new/builder-new.module').then(m => m.BuilderModuleNewComponent) },
  // { path: 'bbc/:buildername-properties-40-lakhs-to-50-lakhs-in-city-builderid', loadChildren: () => import('./builder-new/builder-new.module').then(m => m.BuilderModuleNewComponent) },
  // { path: 'bbc/:buildername-properties-50-lakhs-to-60-lakhs-in-city-builderid', loadChildren: () => import('./builder-new/builder-new.module').then(m => m.BuilderModuleNewComponent) },
  // { path: 'bbc/:buildername-properties-60-lakhs-to-70-lakhs-in-city-builderid', loadChildren: () => import('./builder-new/builder-new.module').then(m => m.BuilderModuleNewComponent) },
  // { path: 'bbc/:buildername-properties-70-lakhs-to-80-lakhs-in-city-builderid', loadChildren: () => import('./builder-new/builder-new.module').then(m => m.BuilderModuleNewComponent) },
  // { path: 'bbc/:buildername-properties-80-lakhs-to-90-lakhs-in-city-builderid', loadChildren: () => import('./builder-new/builder-new.module').then(m => m.BuilderModuleNewComponent) },
  // { path: 'bbc/:buildername-properties-90-lakhs-to-1-crore-in-city-builderid', loadChildren: () => import('./builder-new/builder-new.module').then(m => m.BuilderModuleNewComponent) },
  // { path: 'bbc/:buildername-properties-above-1-crore-in-city-builderid', loadChildren: () => import('./builder-new/builder-new.module').then(m => m.BuilderModuleNewComponent) },


  // { path: 'spbc/:status-properties-by-:buildername-:city-:builderid', loadChildren: () => import('./builder-new/builder-new.module').then(m => m.BuilderModuleNewComponent) },
  // { path: 'stbc/:status-:proptype-by-:buildername-:city-:builderid', loadChildren: () => import('./builder-new/builder-new.module').then(m => m.BuilderModuleNewComponent) },
  // { path: 'btbc/:bhk-flats-by-:buildername-:city-:builderid', loadChildren: () => import('./builder-new/builder-new.module').then(m => m.BuilderModuleNewComponent) },
  // { path: 'bapc/:buildername-affordable-properties-in-:city-:builderid', loadChildren: () => import('./builder-new/builder-new.module').then(m => m.BuilderModuleNewComponent) },
  // { path: 'blpc/:buildername-luxury-properties-in-:city-:builderid', loadChildren: () => import('./builder-new/builder-new.module').then(m => m.BuilderModuleNewComponent) },
  // // { path: 'batc/:buildername-affordable-properties-in-:city-:builderid', loadChildren: () => import('./builder-new/builder-new.module').then(m => m.BuilderModuleNewComponent) },
  // { path: 'batc/:buildername-affordable-apartments-in-:city-:builderid', loadChildren: () => import('./builder-new/builder-new.module').then(m => m.BuilderModuleNewComponent) },
  // { path: 'batc/:buildername-affordable-villas-in-:city-:builderid', loadChildren: () => import('./builder-new/builder-new.module').then(m => m.BuilderModuleNewComponent) },
  // // { path: 'bltc/:buildername-luxury-properties-in-:city-:builderid', loadChildren: () => import('./builder-new/builder-new.module').then(m => m.BuilderModuleNewComponent) },
  // { path: 'bltc/:buildername-luxury-apartments-in-:city-:builderid', loadChildren: () => import('./builder-new/builder-new.module').then(m => m.BuilderModuleNewComponent) },
  // { path: 'bltc/:buildername-luxury-villas-in-:city-:builderid', loadChildren: () => import('./builder-new/builder-new.module').then(m => m.BuilderModuleNewComponent) },
  // { path: 'brtc/:buildername-apartments-in-:city-:builderid', loadChildren: () => import('./builder-new/builder-new.module').then(m => m.BuilderModuleNewComponent) },
  // { path: 'brtc/:buildername-villas-in-:city-:builderid', loadChildren: () => import('./builder-new/builder-new.module').then(m => m.BuilderModuleNewComponent) },
  // { path: 'brtc/:buildername-plots-in-:city-:builderid', loadChildren: () => import('./builder-new/builder-new.module').then(m => m.BuilderModuleNewComponent) },
  // End of Builder Routes


  // ################################ Builder Locality Old Routes - To Be Removed Later ###############################
  // { path: 'bplc/:buildername-properties-in-:locname-:city-:localityid-:builderid', loadChildren: () => import('./builder-locality/builder-locality.module').then(m => m.BuilderLocalityModule) },
  // { path: 'baplc/:buildername-affordable-properties-in-:locname-:city-:localityid-:builderid', loadChildren: () => import('./builder-locality/builder-locality.module').then(m => m.BuilderLocalityModule) },
  // { path: 'batlc/:buildername-affordable-apartments-in-:locname-:city-:localityid-:builderid', loadChildren: () => import('./builder-locality/builder-locality.module').then(m => m.BuilderLocalityModule) },
  // { path: 'batlc/:buildername-affordable-villas-in-:locname-:city-:localityid-:builderid', loadChildren: () => import('./builder-locality/builder-locality.module').then(m => m.BuilderLocalityModule) },
  // { path: 'blplc/:buildername-luxury-properties-in-:locname-:city-:localityid-:builderid', loadChildren: () => import('./builder-locality/builder-locality.module').then(m => m.BuilderLocalityModule) },
  // { path: 'bltlc/:buildername-luxury-apartments-in-:locname-:city-:localityid-:builderid', loadChildren: () => import('./builder-locality/builder-locality.module').then(m => m.BuilderLocalityModule) },
  // { path: 'bltlc/:buildername-luxury-villas-in-:locname-:city-:localityid-:builderid', loadChildren: () => import('./builder-locality/builder-locality.module').then(m => m.BuilderLocalityModule) },
  // { path: 'bldtlc/:buildername-apartments-in-:locname-:city-:localityid-:builderid', loadChildren: () => import('./builder-locality/builder-locality.module').then(m => m.BuilderLocalityModule) },
  // { path: 'bldtlc/:buildername-villas-in-:locname-:city-:localityid-:builderid', loadChildren: () => import('./builder-locality/builder-locality.module').then(m => m.BuilderLocalityModule) },
  // { path: 'sbplc/:status-:buildername-propeties-in-:city-:localityid-:builderid', loadChildren: () => import('./builder-locality/builder-locality.module').then(m => m.BuilderLocalityModule) },
  // { path: 'sbtlc/:status-:buildername-apartments-in-:city-:localityid-:builderid  ', loadChildren: () => import('./builder-locality/builder-locality.module').then(m => m.BuilderLocalityModule) },
  // { path: 'sbtlc/:status-:buildername-villas-in-:city-:localityid-:builderid  ', loadChildren: () => import('./builder-locality/builder-locality.module').then(m => m.BuilderLocalityModule) },

  // ################################ Builder Locality New Routes - To Be Used ###############################
  // { path: 'bplc/:buildername-properties-in-:locname-:city-:localityid-:builderid', loadChildren: () => import('./builder-locality-new/builder-locality-new.module').then(m => m.BuilderLocalityNewModule) },
  // { path: 'baplc/:buildername-affordable-properties-in-:locname-:city-:localityid-:builderid', loadChildren: () => import('./builder-locality-new/builder-locality-new.module').then(m => m.BuilderLocalityNewModule) },
  // { path: 'batlc/:buildername-affordable-apartments-in-:locname-:city-:localityid-:builderid', loadChildren: () => import('./builder-locality-new/builder-locality-new.module').then(m => m.BuilderLocalityNewModule) },
  // { path: 'batlc/:buildername-affordable-villas-in-:locname-:city-:localityid-:builderid', loadChildren: () => import('./builder-locality-new/builder-locality-new.module').then(m => m.BuilderLocalityNewModule) },
  // { path: 'blplc/:buildername-luxury-properties-in-:locname-:city-:localityid-:builderid', loadChildren: () => import('./builder-locality-new/builder-locality-new.module').then(m => m.BuilderLocalityNewModule) },
  // { path: 'bltlc/:buildername-luxury-apartments-in-:locname-:city-:localityid-:builderid', loadChildren: () => import('./builder-locality-new/builder-locality-new.module').then(m => m.BuilderLocalityNewModule) },
  // { path: 'bltlc/:buildername-luxury-villas-in-:locname-:city-:localityid-:builderid', loadChildren: () => import('./builder-locality-new/builder-locality-new.module').then(m => m.BuilderLocalityNewModule) },
  // { path: 'bldtlc/:buildername-apartments-in-:locname-:city-:localityid-:builderid', loadChildren: () => import('./builder-locality-new/builder-locality-new.module').then(m => m.BuilderLocalityNewModule) },
  // { path: 'bldtlc/:buildername-villas-in-:locname-:city-:localityid-:builderid', loadChildren: () => import('./builder-locality-new/builder-locality-new.module').then(m => m.BuilderLocalityNewModule) },
  // { path: 'sbplc/:status-:buildername-propeties-in-:city-:localityid-:builderid', loadChildren: () => import('./builder-locality-new/builder-locality-new.module').then(m => m.BuilderLocalityNewModule) },
  // { path: 'sbtlc/:status-:buildername-apartments-in-:city-:localityid-:builderid  ', loadChildren: () => import('./builder-locality-new/builder-locality-new.module').then(m => m.BuilderLocalityNewModule) },
  // { path: 'sbtlc/:status-:buildername-villas-in-:city-:localityid-:builderid  ', loadChildren: () => import('./builder-locality-new/builder-locality-new.module').then(m => m.BuilderLocalityNewModule) },



  // ############################### CATEGORY 2 ###############################

  // { path: 'atc/:affordable-flats-in-:cityname', loadChildren: () => import('./affordable-city/affordable-city.module').then(m => m.AffordableCityModule) },

  // ############################### City Based Listing Old Routes - To Be Removed Later ###############################
  // { path: 'atc/:affordable-flats-in-:cityname', loadChildren: () => import('./city-based-listing/city-based-listing.module').then(m => m.CityBasedListingModule) },
  // ############################### City Based Listing New Routes ###############################
  // { path: 'atc/:affordable-flats-in-:cityname', loadChildren: () => import('./city-based-listing-new/city-based-listing-new.module').then(m => m.CityBasedListingNewModule) },



  // { path: 'atlc/:affordable-flats-in-:localityname-:cityname-:localityid', loadChildren: () => import('./affordable-city/affordable-city.module').then(m => m.AffordableCityModule) },


  // ############################### Locality Based Listing Old Routes - To Be Removed Later ###############################
  // { path: 'atlc/:affordable-flats-in-:localityname-:cityname-:localityid', loadChildren: () => import('./locality-based-listing/locality-based-listing.module').then(m => m.LocalityBasedListingModule) },
  // ############################### Locality Based Listing New Routes ###############################
  // { path: 'atlc/:affordable-flats-in-:localityname-:cityname-:localityid', loadChildren: () => import('./locality-based-listing-new/locality-based-listing-new.module').then(m => m.LocalityBasedListingNewModule) },

  // { path: 'ltc/:luxury-flats-in-:cityname', loadChildren: () => import('./luxury-city/luxury-city.module').then(m => m.LuxuryCityModule) },


  //  ############################### City Based Listing Old Routes - To Be Removed Later ###############################
  // { path: 'ltc/:luxury-flats-in-:cityname', loadChildren: () => import('./city-based-listing/city-based-listing.module').then(m => m.CityBasedListingModule) },
  // ############################### City Based Listing New Routes ###############################
  // { path: 'ltc/:luxury-flats-in-:cityname', loadChildren: () => import('./city-based-listing-new/city-based-listing-new.module').then(m => m.CityBasedListingNewModule) },



  // { path: 'ltlc/:luxury-flats-in-:localityname-:cityname-:localityid', loadChildren: () => import('./luxury-city/luxury-city.module').then(m => m.LuxuryCityModule) },

  // ############################### Locality Based Listing Old Routes - To Be Removed Later ###############################
  // { path: 'ltlc/:luxury-flats-in-:localityname-:cityname-:localityid', loadChildren: () => import('./locality-based-listing/locality-based-listing.module').then(m => m.LocalityBasedListingModule) },
  // ############################### Locality Based Listing New Routes ###############################
  // { path: 'ltlc/:luxury-flats-in-:localityname-:cityname-:localityid', loadChildren: () => import('./locality-based-listing-new/locality-based-listing-new.module').then(m => m.LocalityBasedListingNewModule) },

  // { path: 'home-for-sale-in-bangalore', loadChildren: () => import('./house/house.module').then(m => m.HouseModule) },
  // { path: 'home-for-sale-in-hyderabad', loadChildren: () => import('./house/house.module').then(m => m.HouseModule) },
  // { path: 'home-for-sale-in-chennai', loadChildren: () => import('./house/house.module').then(m => m.HouseModule) },
  // { path: 'home-for-sale-in-kochi', loadChildren: () => import('./house/house.module').then(m => m.HouseModule) },
  // { path: 'home-for-sale-in-pune', loadChildren: () => import('./house/house.module').then(m => m.HouseModule) },
  // { path: 'home-for-sale-in-mumbai', loadChildren: () => import('./house/house.module').then(m => m.HouseModule) },
  // { path: 'home-for-sale-in-delhi', loadChildren: () => import('./house/house.module').then(m => m.HouseModule) },
  // { path: 'home-for-sale-in-kolkata', loadChildren: () => import('./house/house.module').then(m => m.HouseModule) },
  // { path: 'home-for-sale-in-goa', loadChildren: () => import('./house/house.module').then(m => m.HouseModule) },
  // { path: 'home-for-sale-in-gurgaon', loadChildren: () => import('./house/house.module').then(m => m.HouseModule) },
  // { path: 'home-for-sale-in-mysore', loadChildren: () => import('./house/house.module').then(m => m.HouseModule) },
  // { path: 'home-for-sale-in-coimbatore', loadChildren: () => import('./house/house.module').then(m => m.HouseModule) },
  // { path: 'home-for-sale-in-ahmedabad', loadChildren: () => import('./house/house.module').then(m => m.HouseModule) },
  // { path: 'home-for-sale-in-trivandrum', loadChildren: () => import('./house/house.module').then(m => m.HouseModule) },
  // { path: 'home-for-sale-in-navi-mumbai', loadChildren: () => import('./house/house.module').then(m => m.HouseModule) },
  // { path: 'home-for-sale-in-noida', loadChildren: () => import('./house/house.module').then(m => m.HouseModule) },
  // { path: 'home-for-sale-in-greater-noida', loadChildren: () => import('./house/house.module').then(m => m.HouseModule) },
  // { path: 'home-for-sale-in-bhubaneshwar', loadChildren: () => import('./house/house.module').then(m => m.HouseModule) },
  // { path: 'home-for-sale-in-vijayawada', loadChildren: () => import('./house/house.module').then(m => m.HouseModule) },
  // { path: 'home-for-sale-in-bhopal', loadChildren: () => import('./house/house.module').then(m => m.HouseModule) },
  // { path: 'home-for-sale-in-indore', loadChildren: () => import('./house/house.module').then(m => m.HouseModule) },
  // { path: 'home-for-sale-in-vizag', loadChildren: () => import('./house/house.module').then(m => m.HouseModule) },
  // { path: 'home-for-sale-in-amaravati', loadChildren: () => import('./house/house.module').then(m => m.HouseModule) },
  // { path: 'home-for-sale-in-thrissur', loadChildren: () => import('./house/house.module').then(m => m.HouseModule) },
  // { path: 'home-for-sale-in-tirupati', loadChildren: () => import('./house/house.module').then(m => m.HouseModule) },
  // { path: 'home-for-sale-in-lucknow', loadChildren: () => import('./house/house.module').then(m => m.HouseModule) },
  // { path: 'home-for-sale-in-nashik', loadChildren: () => import('./house/house.module').then(m => m.HouseModule) },
  // { path: 'home-for-sale-in-nagpur', loadChildren: () => import('./house/house.module').then(m => m.HouseModule) },
  // { path: 'home-for-sale-in-mangalore', loadChildren: () => import('./house/house.module').then(m => m.HouseModule) },
  // { path: 'home-for-sale-in-jaipur', loadChildren: () => import('./house/house.module').then(m => m.HouseModule) },
  // { path: 'home-for-sale-in-nellore', loadChildren: () => import('./house/house.module').then(m => m.HouseModule) },
  // { path: 'home-for-sale-in-faridabad', loadChildren: () => import('./house/house.module').then(m => m.HouseModule) },
  // { path: 'home-for-sale-in-chandigarh', loadChildren: () => import('./house/house.module').then(m => m.HouseModule) },
  // { path: 'home-for-sale-in-dehradun', loadChildren: () => import('./house/house.module').then(m => m.HouseModule) },
  // { path: 'home-for-sale-in-ghaziabad', loadChildren: () => import('./house/house.module').then(m => m.HouseModule) },
  // { path: 'home-for-sale-in-ranchi', loadChildren: () => import('./house/house.module').then(m => m.HouseModule) },
  // { path: 'home-for-sale-in-agra', loadChildren: () => import('./house/house.module').then(m => m.HouseModule) },
  // { path: 'home-for-sale-in-durgapur', loadChildren: () => import('./house/house.module').then(m => m.HouseModule) },
  // { path: 'home-for-sale-in-vizianagaram', loadChildren: () => import('./house/house.module').then(m => m.HouseModule) },
  // { path: 'home-for-sale-in-amritsar', loadChildren: () => import('./house/house.module').then(m => m.HouseModule) },
  // { path: 'home-for-sale-in-patna', loadChildren: () => import('./house/house.module').then(m => m.HouseModule) },
  // { path: 'home-for-sale-in-surat', loadChildren: () => import('./house/house.module').then(m => m.HouseModule) },
  // { path: 'home-for-sale-in-guntur', loadChildren: () => import('./house/house.module').then(m => m.HouseModule) },
  // { path: 'home-for-sale-in-aurangabad', loadChildren: () => import('./house/house.module').then(m => m.HouseModule) },
  // { path: 'home-for-sale-in-guwahati', loadChildren: () => import('./house/house.module').then(m => m.HouseModule) },
  // { path: 'home-for-sale-in-dharwad', loadChildren: () => import('./house/house.module').then(m => m.HouseModule) },
  // { path: 'home-for-sale-in-kolhapur', loadChildren: () => import('./house/house.module').then(m => m.HouseModule) },
  // { path: 'home-for-sale-in-mohali', loadChildren: () => import('./house/house.module').then(m => m.HouseModule) },
  // { path: 'home-for-sale-in-kanpur', loadChildren: () => import('./house/house.module').then(m => m.HouseModule) },
  // { path: 'home-for-sale-in-thane', loadChildren: () => import('./house/house.module').then(m => m.HouseModule) },
  // { path: 'home-for-sale-in-jamshedpur', loadChildren: () => import('./house/house.module').then(m => m.HouseModule) },
  // { path: 'home-for-sale-in-belgaum', loadChildren: () => import('./house/house.module').then(m => m.HouseModule) },
  // { path: 'home-for-sale-in-puri', loadChildren: () => import('./house/house.module').then(m => m.HouseModule) },
  // { path: 'home-for-sale-in-meerut', loadChildren: () => import('./house/house.module').then(m => m.HouseModule) },
  // { path: 'home-for-sale-in-tiruvannamalai', loadChildren: () => import('./house/house.module').then(m => m.HouseModule) },
  // { path: 'home-for-sale-in-satara', loadChildren: () => import('./house/house.module').then(m => m.HouseModule) },
  // { path: 'home-for-sale-in-junagadh', loadChildren: () => import('./house/house.module').then(m => m.HouseModule) },
  // { path: 'home-for-sale-in-vadodara', loadChildren: () => import('./house/house.module').then(m => m.HouseModule) },
  // { path: 'home-for-sale-in-palwal', loadChildren: () => import('./house/house.module').then(m => m.HouseModule) },
  // { path: 'home-for-sale-in-panchkula', loadChildren: () => import('./house/house.module').then(m => m.HouseModule) },
  // { path: 'home-for-sale-in-panipat', loadChildren: () => import('./house/house.module').then(m => m.HouseModule) },
  // { path: 'home-for-sale-in-calicut', loadChildren: () => import('./house/house.module').then(m => m.HouseModule) },
  // { path: 'home-for-sale-in-pathanamthitta', loadChildren: () => import('./house/house.module').then(m => m.HouseModule) },
  // { path: 'home-for-sale-in-haridwar', loadChildren: () => import('./house/house.module').then(m => m.HouseModule) },
  // { path: 'home-for-sale-in-solan', loadChildren: () => import('./house/house.module').then(m => m.HouseModule) },
  // { path: 'home-for-sale-in-burhanpur', loadChildren: () => import('./house/house.module').then(m => m.HouseModule) },
  // { path: 'home-for-sale-in-raipur', loadChildren: () => import('./house/house.module').then(m => m.HouseModule) },
  // { path: 'home-for-sale-in-kanchipuram', loadChildren: () => import('./house/house.module').then(m => m.HouseModule) },
  // { path: 'home-for-sale-in-pondicherry', loadChildren: () => import('./house/house.module').then(m => m.HouseModule) },
  // { path: 'home-for-sale-in-siliguri', loadChildren: () => import('./house/house.module').then(m => m.HouseModule) },
  // { path: 'home-for-sale-in-gandhinagar', loadChildren: () => import('./house/house.module').then(m => m.HouseModule) },
  // { path: 'home-for-sale-in-ajmer', loadChildren: () => import('./house/house.module').then(m => m.HouseModule) },
  // { path: 'home-for-sale-in-varanasi', loadChildren: () => import('./house/house.module').then(m => m.HouseModule) },
  // { path: 'home-for-sale-in-mathura', loadChildren: () => import('./house/house.module').then(m => m.HouseModule) },
  // { path: 'home-for-sale-in-dindigul', loadChildren: () => import('./house/house.module').then(m => m.HouseModule) },
  // { path: 'home-for-sale-in-rewari', loadChildren: () => import('./house/house.module').then(m => m.HouseModule) },
  // { path: 'home-for-sale-in-solapur', loadChildren: () => import('./house/house.module').then(m => m.HouseModule) },
  // { path: 'home-for-sale-in-ratnagiri', loadChildren: () => import('./house/house.module').then(m => m.HouseModule) },
  // { path: 'home-for-sale-in-shantiniketan', loadChildren: () => import('./house/house.module').then(m => m.HouseModule) },
  // { path: 'home-for-sale-in-rishikesh', loadChildren: () => import('./house/house.module').then(m => m.HouseModule) },
  // { path: 'home-for-sale-in-rajkor', loadChildren: () => import('./house/house.module').then(m => m.HouseModule) },
  // { path: 'home-for-sale-in-hapur', loadChildren: () => import('./house/house.module').then(m => m.HouseModule) },
  // { path: 'home-for-sale-in-chamarajnagar', loadChildren: () => import('./house/house.module').then(m => m.HouseModule) },
  // { path: 'home-for-sale-in-gulbarga', loadChildren: () => import('./house/house.module').then(m => m.HouseModule) },
  // { path: 'home-for-sale-in-alwar', loadChildren: () => import('./house/house.module').then(m => m.HouseModule) },
  // { path: 'home-for-sale-in-tirunelveli', loadChildren: () => import('./house/house.module').then(m => m.HouseModule) },
  // { path: 'home-for-sale-in-raigad', loadChildren: () => import('./house/house.module').then(m => m.HouseModule) },
  // { path: 'home-for-sale-in-rajkot', loadChildren: () => import('./house/house.module').then(m => m.HouseModule) },
  // { path: 'home-for-sale-in-purba-medinipur', loadChildren: () => import('./house/house.module').then(m => m.HouseModule) },
  // { path: 'home-for-sale-in-ludhiana', loadChildren: () => import('./house/house.module').then(m => m.HouseModule) },
  // { path: 'home-for-sale-in-chamarajanagar', loadChildren: () => import('./house/house.module').then(m => m.HouseModule) },
  // { path: 'home-for-sale-in-sangli', loadChildren: () => import('./house/house.module').then(m => m.HouseModule) },
  // { path: 'home-for-sale-in-ayodhya', loadChildren: () => import('./house/house.module').then(m => m.HouseModule) },
  // { path: 'home-for-sale-in-bhiwadi', loadChildren: () => import('./house/house.module').then(m => m.HouseModule) },
  // { path: 'home-for-sale-in-kottayam', loadChildren: () => import('./house/house.module').then(m => m.HouseModule) },
  // { path: 'home-for-sale-in-kannur', loadChildren: () => import('./house/house.module').then(m => m.HouseModule) },
  // { path: 'home-for-sale-in-neemrana', loadChildren: () => import('./house/house.module').then(m => m.HouseModule) },
  // { path: 'home-for-sale-in-thanjavur', loadChildren: () => import('./house/house.module').then(m => m.HouseModule) },
  // { path: 'home-for-sale-in-kota', loadChildren: () => import('./house/house.module').then(m => m.HouseModule) },
  // { path: 'home-for-sale-in-bilaspur', loadChildren: () => import('./house/house.module').then(m => m.HouseModule) },
  // { path: 'home-for-sale-in-navsari', loadChildren: () => import('./house/house.module').then(m => m.HouseModule) },
  // { path: 'home-for-sale-in-davanegere', loadChildren: () => import('./house/house.module').then(m => m.HouseModule) },
  // { path: 'home-for-sale-in-jabalpur', loadChildren: () => import('./house/house.module').then(m => m.HouseModule) },
  // { path: 'home-for-sale-in-gwalior', loadChildren: () => import('./house/house.module').then(m => m.HouseModule) },
  // { path: 'home-for-sale-in-ujjain', loadChildren: () => import('./house/house.module').then(m => m.HouseModule) },
  // { path: 'home-for-sale-in-salem', loadChildren: () => import('./house/house.module').then(m => m.HouseModule) },
  // { path: 'home-for-sale-in-erode', loadChildren: () => import('./house/house.module').then(m => m.HouseModule) },
  // { path: 'home-for-sale-in-thoothukudi', loadChildren: () => import('./house/house.module').then(m => m.HouseModule) },
  // { path: 'home-for-sale-in-bareilly', loadChildren: () => import('./house/house.module').then(m => m.HouseModule) },
  // { path: 'home-for-sale-in-jhansi', loadChildren: () => import('./house/house.module').then(m => m.HouseModule) },
  // { path: 'home-for-sale-in-tiruchirappalli', loadChildren: () => import('./house/house.module').then(m => m.HouseModule) },
  // { path: 'home-for-sale-in-hosur', loadChildren: () => import('./house/house.module').then(m => m.HouseModule) },
  // { path: 'home-for-sale-in-madurai', loadChildren: () => import('./house/house.module').then(m => m.HouseModule) },
  // { path: 'home-for-sale-in-namakkal', loadChildren: () => import('./house/house.module').then(m => m.HouseModule) },
  // { path: 'home-for-sale-in-tiruppur', loadChildren: () => import('./house/house.module').then(m => m.HouseModule) },
  // { path: 'home-for-sale-in-vellore', loadChildren: () => import('./house/house.module').then(m => m.HouseModule) },
  // { path: 'home-for-sale-in-viluppuram', loadChildren: () => import('./house/house.module').then(m => m.HouseModule) },
  // { path: 'home-for-sale-in-koonimedu', loadChildren: () => import('./house/house.module').then(m => m.HouseModule) },
  // { path: 'home-for-sale-in-theni', loadChildren: () => import('./house/house.module').then(m => m.HouseModule) },
  // { path: 'home-for-sale-in-kotagiri', loadChildren: () => import('./house/house.module').then(m => m.HouseModule) },
  // { path: 'home-for-sale-in-krishnagri', loadChildren: () => import('./house/house.module').then(m => m.HouseModule) },


  //  ############################### City Based Listing Old Routes - To Be Removed Later ###############################
  // { path: 'home-for-sale-in-:cityname', loadChildren: () => import('./city-based-listing/city-based-listing.module').then(m => m.CityBasedListingModule) },
  // ############################### City Based Listing New Routes ###############################
  // { path: 'home-for-sale-in-:cityname', loadChildren: () => import('./city-based-listing-new/city-based-listing-new.module').then(m => m.CityBasedListingNewModule) },


  // ############################### CATEGORY 2 ###############################

  // ############################### CATEGORY 3 ###############################

  // { path: 'villas-for-sale-in-bangalore', loadChildren: () => import('./villa/villa.module').then(m => m.VillaModule) },
  // { path: 'villas-for-sale-in-hyderabad', loadChildren: () => import('./villa/villa.module').then(m => m.VillaModule) },
  // { path: 'villas-for-sale-in-chennai', loadChildren: () => import('./villa/villa.module').then(m => m.VillaModule) },
  // { path: 'villas-for-sale-in-kochi', loadChildren: () => import('./villa/villa.module').then(m => m.VillaModule) },
  // { path: 'villas-for-sale-in-pune', loadChildren: () => import('./villa/villa.module').then(m => m.VillaModule) },
  // { path: 'villas-for-sale-in-mumbai', loadChildren: () => import('./villa/villa.module').then(m => m.VillaModule) },
  // { path: 'villas-for-sale-in-delhi', loadChildren: () => import('./villa/villa.module').then(m => m.VillaModule) },
  // { path: 'villas-for-sale-in-kolkata', loadChildren: () => import('./villa/villa.module').then(m => m.VillaModule) },
  // { path: 'villas-for-sale-in-goa', loadChildren: () => import('./villa/villa.module').then(m => m.VillaModule) },
  // { path: 'villas-for-sale-in-gurgaon', loadChildren: () => import('./villa/villa.module').then(m => m.VillaModule) },
  // { path: 'villas-for-sale-in-mysore', loadChildren: () => import('./villa/villa.module').then(m => m.VillaModule) },
  // { path: 'villas-for-sale-in-coimbatore', loadChildren: () => import('./villa/villa.module').then(m => m.VillaModule) },
  // { path: 'villas-for-sale-in-ahmedabad', loadChildren: () => import('./villa/villa.module').then(m => m.VillaModule) },
  // { path: 'villas-for-sale-in-trivandrum', loadChildren: () => import('./villa/villa.module').then(m => m.VillaModule) },
  // { path: 'villas-for-sale-in-navi-mumbai', loadChildren: () => import('./villa/villa.module').then(m => m.VillaModule) },
  // { path: 'villas-for-sale-in-noida', loadChildren: () => import('./villa/villa.module').then(m => m.VillaModule) },
  // { path: 'villas-for-sale-in-greater-noida', loadChildren: () => import('./villa/villa.module').then(m => m.VillaModule) },
  // { path: 'villas-for-sale-in-bhubaneshwar', loadChildren: () => import('./villa/villa.module').then(m => m.VillaModule) },
  // { path: 'villas-for-sale-in-vijayawada', loadChildren: () => import('./villa/villa.module').then(m => m.VillaModule) },
  // { path: 'villas-for-sale-in-bhopal', loadChildren: () => import('./villa/villa.module').then(m => m.VillaModule) },
  // { path: 'villas-for-sale-in-indore', loadChildren: () => import('./villa/villa.module').then(m => m.VillaModule) },
  // { path: 'villas-for-sale-in-vizag', loadChildren: () => import('./villa/villa.module').then(m => m.VillaModule) },
  // { path: 'villas-for-sale-in-amaravati', loadChildren: () => import('./villa/villa.module').then(m => m.VillaModule) },
  // { path: 'villas-for-sale-in-thrissur', loadChildren: () => import('./villa/villa.module').then(m => m.VillaModule) },
  // { path: 'villas-for-sale-in-tirupati', loadChildren: () => import('./villa/villa.module').then(m => m.VillaModule) },
  // { path: 'villas-for-sale-in-lucknow', loadChildren: () => import('./villa/villa.module').then(m => m.VillaModule) },
  // { path: 'villas-for-sale-in-nashik', loadChildren: () => import('./villa/villa.module').then(m => m.VillaModule) },
  // { path: 'villas-for-sale-in-mangalore', loadChildren: () => import('./villa/villa.module').then(m => m.VillaModule) },
  // { path: 'villas-for-sale-in-nagpur', loadChildren: () => import('./villa/villa.module').then(m => m.VillaModule) },
  // { path: 'villas-for-sale-in-jaipur', loadChildren: () => import('./villa/villa.module').then(m => m.VillaModule) },
  // { path: 'villas-for-sale-in-nellore', loadChildren: () => import('./villa/villa.module').then(m => m.VillaModule) },
  // { path: 'villas-for-sale-in-faridabad', loadChildren: () => import('./villa/villa.module').then(m => m.VillaModule) },
  // { path: 'villas-for-sale-in-chandigarh', loadChildren: () => import('./villa/villa.module').then(m => m.VillaModule) },
  // { path: 'villas-for-sale-in-dehradun', loadChildren: () => import('./villa/villa.module').then(m => m.VillaModule) },
  // { path: 'villas-for-sale-in-ghaziabad', loadChildren: () => import('./villa/villa.module').then(m => m.VillaModule) },
  // { path: 'villas-for-sale-in-ranchi', loadChildren: () => import('./villa/villa.module').then(m => m.VillaModule) },
  // { path: 'villas-for-sale-in-agra', loadChildren: () => import('./villa/villa.module').then(m => m.VillaModule) },
  // { path: 'villas-for-sale-in-durgapur', loadChildren: () => import('./villa/villa.module').then(m => m.VillaModule) },
  // { path: 'villas-for-sale-in-vizianagaram', loadChildren: () => import('./villa/villa.module').then(m => m.VillaModule) },
  // { path: 'villas-for-sale-in-amritsar', loadChildren: () => import('./villa/villa.module').then(m => m.VillaModule) },
  // { path: 'villas-for-sale-in-patna', loadChildren: () => import('./villa/villa.module').then(m => m.VillaModule) },
  // { path: 'villas-for-sale-in-surat', loadChildren: () => import('./villa/villa.module').then(m => m.VillaModule) },
  // { path: 'villas-for-sale-in-guntur', loadChildren: () => import('./villa/villa.module').then(m => m.VillaModule) },
  // { path: 'villas-for-sale-in-aurangabad', loadChildren: () => import('./villa/villa.module').then(m => m.VillaModule) },
  // { path: 'villas-for-sale-in-guwahati', loadChildren: () => import('./villa/villa.module').then(m => m.VillaModule) },
  // { path: 'villas-for-sale-in-dharwad', loadChildren: () => import('./villa/villa.module').then(m => m.VillaModule) },
  // { path: 'villas-for-sale-in-kolhapur', loadChildren: () => import('./villa/villa.module').then(m => m.VillaModule) },
  // { path: 'villas-for-sale-in-mohali', loadChildren: () => import('./villa/villa.module').then(m => m.VillaModule) },
  // { path: 'villas-for-sale-in-kanpur', loadChildren: () => import('./villa/villa.module').then(m => m.VillaModule) },
  // { path: 'villas-for-sale-in-thane', loadChildren: () => import('./villa/villa.module').then(m => m.VillaModule) },
  // { path: 'villas-for-sale-in-jamshedpur', loadChildren: () => import('./villa/villa.module').then(m => m.VillaModule) },
  // { path: 'villas-for-sale-in-belgaum', loadChildren: () => import('./villa/villa.module').then(m => m.VillaModule) },
  // { path: 'villas-for-sale-in-puri', loadChildren: () => import('./villa/villa.module').then(m => m.VillaModule) },
  // { path: 'villas-for-sale-in-meerut', loadChildren: () => import('./villa/villa.module').then(m => m.VillaModule) },
  // { path: 'villas-for-sale-in-tiruvannamalai', loadChildren: () => import('./villa/villa.module').then(m => m.VillaModule) },
  // { path: 'villas-for-sale-in-satara', loadChildren: () => import('./villa/villa.module').then(m => m.VillaModule) },
  // { path: 'villas-for-sale-in-junagadh', loadChildren: () => import('./villa/villa.module').then(m => m.VillaModule) },
  // { path: 'villas-for-sale-in-vadodara', loadChildren: () => import('./villa/villa.module').then(m => m.VillaModule) },
  // { path: 'villas-for-sale-in-palwal', loadChildren: () => import('./villa/villa.module').then(m => m.VillaModule) },
  // { path: 'villas-for-sale-in-panchkula', loadChildren: () => import('./villa/villa.module').then(m => m.VillaModule) },
  // { path: 'villas-for-sale-in-panipat', loadChildren: () => import('./villa/villa.module').then(m => m.VillaModule) },
  // { path: 'villas-for-sale-in-calicut', loadChildren: () => import('./villa/villa.module').then(m => m.VillaModule) },
  // { path: 'villas-for-sale-in-pathanamthitta', loadChildren: () => import('./villa/villa.module').then(m => m.VillaModule) },
  // { path: 'villas-for-sale-in-haridwar', loadChildren: () => import('./villa/villa.module').then(m => m.VillaModule) },
  // { path: 'villas-for-sale-in-solan', loadChildren: () => import('./villa/villa.module').then(m => m.VillaModule) },
  // { path: 'villas-for-sale-in-burhanpur', loadChildren: () => import('./villa/villa.module').then(m => m.VillaModule) },
  // { path: 'villas-for-sale-in-raipur', loadChildren: () => import('./villa/villa.module').then(m => m.VillaModule) },
  // { path: 'villas-for-sale-in-kanchipuram', loadChildren: () => import('./villa/villa.module').then(m => m.VillaModule) },
  // { path: 'villas-for-sale-in-pondicherry', loadChildren: () => import('./villa/villa.module').then(m => m.VillaModule) },
  // { path: 'villas-for-sale-in-siliguri', loadChildren: () => import('./villa/villa.module').then(m => m.VillaModule) },
  // { path: 'villas-for-sale-in-gandhinagar', loadChildren: () => import('./villa/villa.module').then(m => m.VillaModule) },
  // { path: 'villas-for-sale-in-ajmer', loadChildren: () => import('./villa/villa.module').then(m => m.VillaModule) },
  // { path: 'villas-for-sale-in-varanasi', loadChildren: () => import('./villa/villa.module').then(m => m.VillaModule) },
  // { path: 'villas-for-sale-in-mathura', loadChildren: () => import('./villa/villa.module').then(m => m.VillaModule) },
  // { path: 'villas-for-sale-in-dindigul', loadChildren: () => import('./villa/villa.module').then(m => m.VillaModule) },
  // { path: 'villas-for-sale-in-rewari', loadChildren: () => import('./villa/villa.module').then(m => m.VillaModule) },
  // { path: 'villas-for-sale-in-solapur', loadChildren: () => import('./villa/villa.module').then(m => m.VillaModule) },
  // { path: 'villas-for-sale-in-ratnagiri', loadChildren: () => import('./villa/villa.module').then(m => m.VillaModule) },
  // { path: 'villas-for-sale-in-shantiniketan', loadChildren: () => import('./villa/villa.module').then(m => m.VillaModule) },
  // { path: 'villas-for-sale-in-rishikesh', loadChildren: () => import('./villa/villa.module').then(m => m.VillaModule) },
  // { path: 'villas-for-sale-in-rajkor', loadChildren: () => import('./villa/villa.module').then(m => m.VillaModule) },
  // { path: 'villas-for-sale-in-hapur', loadChildren: () => import('./villa/villa.module').then(m => m.VillaModule) },
  // { path: 'villas-for-sale-in-chamarajnagar', loadChildren: () => import('./villa/villa.module').then(m => m.VillaModule) },
  // { path: 'villas-for-sale-in-gulbarga', loadChildren: () => import('./villa/villa.module').then(m => m.VillaModule) },
  // { path: 'villas-for-sale-in-alwar', loadChildren: () => import('./villa/villa.module').then(m => m.VillaModule) },
  // { path: 'villas-for-sale-in-tirunelveli', loadChildren: () => import('./villa/villa.module').then(m => m.VillaModule) },
  // { path: 'villas-for-sale-in-raigad', loadChildren: () => import('./villa/villa.module').then(m => m.VillaModule) },
  // { path: 'villas-for-sale-in-rajkot', loadChildren: () => import('./villa/villa.module').then(m => m.VillaModule) },
  // { path: 'villas-for-sale-in-purba-medinipur', loadChildren: () => import('./villa/villa.module').then(m => m.VillaModule) },
  // { path: 'villas-for-sale-in-ludhiana', loadChildren: () => import('./villa/villa.module').then(m => m.VillaModule) },
  // { path: 'villas-for-sale-in-chamarajanagar', loadChildren: () => import('./villa/villa.module').then(m => m.VillaModule) },
  // { path: 'villas-for-sale-in-sangli', loadChildren: () => import('./villa/villa.module').then(m => m.VillaModule) },
  // { path: 'villas-for-sale-in-ayodhya', loadChildren: () => import('./villa/villa.module').then(m => m.VillaModule) },
  // { path: 'villas-for-sale-in-bhiwadi', loadChildren: () => import('./villa/villa.module').then(m => m.VillaModule) },
  // { path: 'villas-for-sale-in-kottayam', loadChildren: () => import('./villa/villa.module').then(m => m.VillaModule) },
  // { path: 'villas-for-sale-in-kannur', loadChildren: () => import('./villa/villa.module').then(m => m.VillaModule) },
  // { path: 'villas-for-sale-in-neemrana', loadChildren: () => import('./villa/villa.module').then(m => m.VillaModule) },
  // { path: 'villas-for-sale-in-thanjavur', loadChildren: () => import('./villa/villa.module').then(m => m.VillaModule) },
  // { path: 'villas-for-sale-in-kota', loadChildren: () => import('./villa/villa.module').then(m => m.VillaModule) },
  // { path: 'villas-for-sale-in-bilaspur', loadChildren: () => import('./villa/villa.module').then(m => m.VillaModule) },
  // { path: 'villas-for-sale-in-navsari', loadChildren: () => import('./villa/villa.module').then(m => m.VillaModule) },
  // { path: 'villas-for-sale-in-davanegere', loadChildren: () => import('./villa/villa.module').then(m => m.VillaModule) },
  // { path: 'villas-for-sale-in-jabalpur', loadChildren: () => import('./villa/villa.module').then(m => m.VillaModule) },
  // { path: 'villas-for-sale-in-gwalior', loadChildren: () => import('./villa/villa.module').then(m => m.VillaModule) },
  // { path: 'villas-for-sale-in-ujjain', loadChildren: () => import('./villa/villa.module').then(m => m.VillaModule) },
  // { path: 'villas-for-sale-in-salem', loadChildren: () => import('./villa/villa.module').then(m => m.VillaModule) },
  // { path: 'villas-for-sale-in-erode', loadChildren: () => import('./villa/villa.module').then(m => m.VillaModule) },
  // { path: 'villas-for-sale-in-thoothukudi', loadChildren: () => import('./villa/villa.module').then(m => m.VillaModule) },
  // { path: 'villas-for-sale-in-bareilly', loadChildren: () => import('./villa/villa.module').then(m => m.VillaModule) },
  // { path: 'villas-for-sale-in-jhansi', loadChildren: () => import('./villa/villa.module').then(m => m.VillaModule) },
  // { path: 'villas-for-sale-in-tiruchirappalli', loadChildren: () => import('./villa/villa.module').then(m => m.VillaModule) },
  // { path: 'villas-for-sale-in-hosur', loadChildren: () => import('./villa/villa.module').then(m => m.VillaModule) },
  // { path: 'villas-for-sale-in-madurai', loadChildren: () => import('./villa/villa.module').then(m => m.VillaModule) },
  // { path: 'villas-for-sale-in-namakkal', loadChildren: () => import('./villa/villa.module').then(m => m.VillaModule) },
  // { path: 'villas-for-sale-in-tiruppur', loadChildren: () => import('./villa/villa.module').then(m => m.VillaModule) },
  // { path: 'villas-for-sale-in-vellore', loadChildren: () => import('./villa/villa.module').then(m => m.VillaModule) },
  // { path: 'villas-for-sale-in-viluppuram', loadChildren: () => import('./villa/villa.module').then(m => m.VillaModule) },
  // { path: 'villas-for-sale-in-koonimedu', loadChildren: () => import('./villa/villa.module').then(m => m.VillaModule) },
  // { path: 'villas-for-sale-in-theni', loadChildren: () => import('./villa/villa.module').then(m => m.VillaModule) },
  // { path: 'villas-for-sale-in-kotagiri', loadChildren: () => import('./villa/villa.module').then(m => m.VillaModule) },
  // { path: 'villas-for-sale-in-krishnagri', loadChildren: () => import('./villa/villa.module').then(m => m.VillaModule) },


  // ############################### City Based Listing Old Routes - To Be Removed Later ###############################
  // { path: 'villas-for-sale-in-:cityname', loadChildren: () => import('./city-based-listing/city-based-listing.module').then(m => m.CityBasedListingModule) },
  // ############################### City Based Listing New Routes ###############################
  // { path: 'villas-for-sale-in-:cityname', loadChildren: () => import('./city-based-listing-new/city-based-listing-new.module').then(m => m.CityBasedListingNewModule) },


  // ############################### CATEGORY 3 ###############################

  // ############################### CATEGORY 4 ###############################

  // { path: 'plots-in-bangalore', loadChildren: () => import('./plot/plot.module').then(m => m.PlotModule) },
  // { path: 'plots-in-hyderabad', loadChildren: () => import('./plot/plot.module').then(m => m.PlotModule) },
  // { path: 'plots-in-chennai', loadChildren: () => import('./plot/plot.module').then(m => m.PlotModule) },
  // { path: 'plots-in-kochi', loadChildren: () => import('./plot/plot.module').then(m => m.PlotModule) },
  // { path: 'plots-in-pune', loadChildren: () => import('./plot/plot.module').then(m => m.PlotModule) },
  // { path: 'plots-in-mumbai', loadChildren: () => import('./plot/plot.module').then(m => m.PlotModule) },
  // { path: 'plots-in-delhi', loadChildren: () => import('./plot/plot.module').then(m => m.PlotModule) },
  // { path: 'plots-in-kolkata', loadChildren: () => import('./plot/plot.module').then(m => m.PlotModule) },
  // { path: 'plots-in-goa', loadChildren: () => import('./plot/plot.module').then(m => m.PlotModule) },
  // { path: 'plots-in-gurgaon', loadChildren: () => import('./plot/plot.module').then(m => m.PlotModule) },
  // { path: 'plots-in-mysore', loadChildren: () => import('./plot/plot.module').then(m => m.PlotModule) },
  // { path: 'plots-in-coimbatore', loadChildren: () => import('./plot/plot.module').then(m => m.PlotModule) },
  // { path: 'plots-in-ahmedabad', loadChildren: () => import('./plot/plot.module').then(m => m.PlotModule) },
  // { path: 'plots-in-trivandrum', loadChildren: () => import('./plot/plot.module').then(m => m.PlotModule) },
  // { path: 'plots-in-navi-mumbai', loadChildren: () => import('./plot/plot.module').then(m => m.PlotModule) },
  // { path: 'plots-in-noida', loadChildren: () => import('./plot/plot.module').then(m => m.PlotModule) },
  // { path: 'plots-in-greater-noida', loadChildren: () => import('./plot/plot.module').then(m => m.PlotModule) },
  // { path: 'plots-in-bhubaneshwar', loadChildren: () => import('./plot/plot.module').then(m => m.PlotModule) },
  // { path: 'plots-in-vijayawada', loadChildren: () => import('./plot/plot.module').then(m => m.PlotModule) },
  // { path: 'plots-in-bhopal', loadChildren: () => import('./plot/plot.module').then(m => m.PlotModule) },
  // { path: 'plots-in-indore', loadChildren: () => import('./plot/plot.module').then(m => m.PlotModule) },
  // { path: 'plots-in-vizag', loadChildren: () => import('./plot/plot.module').then(m => m.PlotModule) },
  // { path: 'plots-in-amaravati', loadChildren: () => import('./plot/plot.module').then(m => m.PlotModule) },
  // { path: 'plots-in-thrissur', loadChildren: () => import('./plot/plot.module').then(m => m.PlotModule) },
  // { path: 'plots-in-tirupati', loadChildren: () => import('./plot/plot.module').then(m => m.PlotModule) },
  // { path: 'plots-in-lucknow', loadChildren: () => import('./plot/plot.module').then(m => m.PlotModule) },
  // { path: 'plots-in-nashik', loadChildren: () => import('./plot/plot.module').then(m => m.PlotModule) },
  // { path: 'plots-in-nagpur', loadChildren: () => import('./plot/plot.module').then(m => m.PlotModule) },
  // { path: 'plots-in-mangalore', loadChildren: () => import('./plot/plot.module').then(m => m.PlotModule) },
  // { path: 'plots-in-jaipur', loadChildren: () => import('./plot/plot.module').then(m => m.PlotModule) },
  // { path: 'plots-in-nellore', loadChildren: () => import('./plot/plot.module').then(m => m.PlotModule) },
  // { path: 'plots-in-faridabad', loadChildren: () => import('./plot/plot.module').then(m => m.PlotModule) },
  // { path: 'plots-in-chandigarh', loadChildren: () => import('./plot/plot.module').then(m => m.PlotModule) },
  // { path: 'plots-in-dehradun', loadChildren: () => import('./plot/plot.module').then(m => m.PlotModule) },
  // { path: 'plots-in-ghaziabad', loadChildren: () => import('./plot/plot.module').then(m => m.PlotModule) },
  // { path: 'plots-in-ranchi', loadChildren: () => import('./plot/plot.module').then(m => m.PlotModule) },
  // { path: 'plots-in-agra', loadChildren: () => import('./plot/plot.module').then(m => m.PlotModule) },
  // { path: 'plots-in-durgapur', loadChildren: () => import('./plot/plot.module').then(m => m.PlotModule) },
  // { path: 'plots-in-vizianagaram', loadChildren: () => import('./plot/plot.module').then(m => m.PlotModule) },
  // { path: 'plots-in-amritsar', loadChildren: () => import('./plot/plot.module').then(m => m.PlotModule) },
  // { path: 'plots-in-patna', loadChildren: () => import('./plot/plot.module').then(m => m.PlotModule) },
  // { path: 'plots-in-surat', loadChildren: () => import('./plot/plot.module').then(m => m.PlotModule) },
  // { path: 'plots-in-guntur', loadChildren: () => import('./plot/plot.module').then(m => m.PlotModule) },
  // { path: 'plots-in-aurangabad', loadChildren: () => import('./plot/plot.module').then(m => m.PlotModule) },
  // { path: 'plots-in-guwahati', loadChildren: () => import('./plot/plot.module').then(m => m.PlotModule) },
  // { path: 'plots-in-dharwad', loadChildren: () => import('./plot/plot.module').then(m => m.PlotModule) },
  // { path: 'plots-in-kolhapur', loadChildren: () => import('./plot/plot.module').then(m => m.PlotModule) },
  // { path: 'plots-in-mohali', loadChildren: () => import('./plot/plot.module').then(m => m.PlotModule) },
  // { path: 'plots-in-kanpur', loadChildren: () => import('./plot/plot.module').then(m => m.PlotModule) },
  // { path: 'plots-in-thane', loadChildren: () => import('./plot/plot.module').then(m => m.PlotModule) },
  // { path: 'plots-in-jamshedpur', loadChildren: () => import('./plot/plot.module').then(m => m.PlotModule) },
  // { path: 'plots-in-belgaum', loadChildren: () => import('./plot/plot.module').then(m => m.PlotModule) },
  // { path: 'plots-in-puri', loadChildren: () => import('./plot/plot.module').then(m => m.PlotModule) },
  // { path: 'plots-in-meerut', loadChildren: () => import('./plot/plot.module').then(m => m.PlotModule) },
  // { path: 'plots-in-tiruvannamalai', loadChildren: () => import('./plot/plot.module').then(m => m.PlotModule) },
  // { path: 'plots-in-satara', loadChildren: () => import('./plot/plot.module').then(m => m.PlotModule) },
  // { path: 'plots-in-junagadh', loadChildren: () => import('./plot/plot.module').then(m => m.PlotModule) },
  // { path: 'plots-in-vadodara', loadChildren: () => import('./plot/plot.module').then(m => m.PlotModule) },
  // { path: 'plots-in-palwal', loadChildren: () => import('./plot/plot.module').then(m => m.PlotModule) },
  // { path: 'plots-in-panchkula', loadChildren: () => import('./plot/plot.module').then(m => m.PlotModule) },
  // { path: 'plots-in-panipat', loadChildren: () => import('./plot/plot.module').then(m => m.PlotModule) },
  // { path: 'plots-in-calicut', loadChildren: () => import('./plot/plot.module').then(m => m.PlotModule) },
  // { path: 'plots-in-pathanamthitta', loadChildren: () => import('./plot/plot.module').then(m => m.PlotModule) },
  // { path: 'plots-in-haridwar', loadChildren: () => import('./plot/plot.module').then(m => m.PlotModule) },
  // { path: 'plots-in-solan', loadChildren: () => import('./plot/plot.module').then(m => m.PlotModule) },
  // { path: 'plots-in-burhanpur', loadChildren: () => import('./plot/plot.module').then(m => m.PlotModule) },
  // { path: 'plots-in-raipur', loadChildren: () => import('./plot/plot.module').then(m => m.PlotModule) },
  // { path: 'plots-in-kanchipuram', loadChildren: () => import('./plot/plot.module').then(m => m.PlotModule) },
  // { path: 'plots-in-pondicherry', loadChildren: () => import('./plot/plot.module').then(m => m.PlotModule) },
  // { path: 'plots-in-siliguri', loadChildren: () => import('./plot/plot.module').then(m => m.PlotModule) },
  // { path: 'plots-in-gandhinagar', loadChildren: () => import('./plot/plot.module').then(m => m.PlotModule) },
  // { path: 'plots-in-ajmer', loadChildren: () => import('./plot/plot.module').then(m => m.PlotModule) },
  // { path: 'plots-in-varanasi', loadChildren: () => import('./plot/plot.module').then(m => m.PlotModule) },
  // { path: 'plots-in-mathura', loadChildren: () => import('./plot/plot.module').then(m => m.PlotModule) },
  // { path: 'plots-in-dindigul', loadChildren: () => import('./plot/plot.module').then(m => m.PlotModule) },
  // { path: 'plots-in-rewari', loadChildren: () => import('./plot/plot.module').then(m => m.PlotModule) },
  // { path: 'plots-in-solapur', loadChildren: () => import('./plot/plot.module').then(m => m.PlotModule) },
  // { path: 'plots-in-ratnagiri', loadChildren: () => import('./plot/plot.module').then(m => m.PlotModule) },
  // { path: 'plots-in-shantiniketan', loadChildren: () => import('./plot/plot.module').then(m => m.PlotModule) },
  // { path: 'plots-in-rishikesh', loadChildren: () => import('./plot/plot.module').then(m => m.PlotModule) },
  // { path: 'plots-in-rajkor', loadChildren: () => import('./plot/plot.module').then(m => m.PlotModule) },
  // { path: 'plots-in-hapur', loadChildren: () => import('./plot/plot.module').then(m => m.PlotModule) },
  // { path: 'plots-in-chamarajnagar', loadChildren: () => import('./plot/plot.module').then(m => m.PlotModule) },
  // { path: 'plots-in-gulbarga', loadChildren: () => import('./plot/plot.module').then(m => m.PlotModule) },
  // { path: 'plots-in-alwar', loadChildren: () => import('./plot/plot.module').then(m => m.PlotModule) },
  // { path: 'plots-in-tirunelveli', loadChildren: () => import('./plot/plot.module').then(m => m.PlotModule) },
  // { path: 'plots-in-raigad', loadChildren: () => import('./plot/plot.module').then(m => m.PlotModule) },
  // { path: 'plots-in-rajkot', loadChildren: () => import('./plot/plot.module').then(m => m.PlotModule) },
  // { path: 'plots-in-purba-medinipur', loadChildren: () => import('./plot/plot.module').then(m => m.PlotModule) },
  // { path: 'plots-in-ludhiana', loadChildren: () => import('./plot/plot.module').then(m => m.PlotModule) },
  // { path: 'plots-in-chamarajanagar', loadChildren: () => import('./plot/plot.module').then(m => m.PlotModule) },
  // { path: 'plots-in-sangli', loadChildren: () => import('./plot/plot.module').then(m => m.PlotModule) },
  // { path: 'plots-in-ayodhya', loadChildren: () => import('./plot/plot.module').then(m => m.PlotModule) },
  // { path: 'plots-in-bhiwadi', loadChildren: () => import('./plot/plot.module').then(m => m.PlotModule) },
  // { path: 'plots-in-kottayam', loadChildren: () => import('./plot/plot.module').then(m => m.PlotModule) },
  // { path: 'plots-in-kannur', loadChildren: () => import('./plot/plot.module').then(m => m.PlotModule) },
  // { path: 'plots-in-neemrana', loadChildren: () => import('./plot/plot.module').then(m => m.PlotModule) },
  // { path: 'plots-in-thanjavur', loadChildren: () => import('./plot/plot.module').then(m => m.PlotModule) },
  // { path: 'plots-in-kota', loadChildren: () => import('./plot/plot.module').then(m => m.PlotModule) },
  // { path: 'plots-in-bilaspur', loadChildren: () => import('./plot/plot.module').then(m => m.PlotModule) },
  // { path: 'plots-in-navsari', loadChildren: () => import('./plot/plot.module').then(m => m.PlotModule) },
  // { path: 'plots-in-davanegere', loadChildren: () => import('./plot/plot.module').then(m => m.PlotModule) },
  // { path: 'plots-in-jabalpur', loadChildren: () => import('./plot/plot.module').then(m => m.PlotModule) },
  // { path: 'plots-in-gwalior', loadChildren: () => import('./plot/plot.module').then(m => m.PlotModule) },
  // { path: 'plots-in-ujjain', loadChildren: () => import('./plot/plot.module').then(m => m.PlotModule) },
  // { path: 'plots-in-salem', loadChildren: () => import('./plot/plot.module').then(m => m.PlotModule) },
  // { path: 'plots-in-erode', loadChildren: () => import('./plot/plot.module').then(m => m.PlotModule) },
  // { path: 'plots-in-thoothukudi', loadChildren: () => import('./plot/plot.module').then(m => m.PlotModule) },
  // { path: 'plots-in-bareilly', loadChildren: () => import('./plot/plot.module').then(m => m.PlotModule) },
  // { path: 'plots-in-jhansi', loadChildren: () => import('./plot/plot.module').then(m => m.PlotModule) },
  // { path: 'plots-in-tiruchirappalli', loadChildren: () => import('./plot/plot.module').then(m => m.PlotModule) },
  // { path: 'plots-in-hosur', loadChildren: () => import('./plot/plot.module').then(m => m.PlotModule) },
  // { path: 'plots-in-madurai', loadChildren: () => import('./plot/plot.module').then(m => m.PlotModule) },
  // { path: 'plots-in-namakkal', loadChildren: () => import('./plot/plot.module').then(m => m.PlotModule) },
  // { path: 'plots-in-tiruppur', loadChildren: () => import('./plot/plot.module').then(m => m.PlotModule) },
  // { path: 'plots-in-vellore', loadChildren: () => import('./plot/plot.module').then(m => m.PlotModule) },
  // { path: 'plots-in-viluppuram', loadChildren: () => import('./plot/plot.module').then(m => m.PlotModule) },
  // { path: 'plots-in-koonimedu', loadChildren: () => import('./plot/plot.module').then(m => m.PlotModule) },
  // { path: 'plots-in-theni', loadChildren: () => import('./plot/plot.module').then(m => m.PlotModule) },
  // { path: 'plots-in-kotagiri', loadChildren: () => import('./plot/plot.module').then(m => m.PlotModule) },
  // { path: 'plots-in-krishnagri', loadChildren: () => import('./plot/plot.module').then(m => m.PlotModule) },

  // ############################### City Based Listing Old Routes - To Be Removed Later ###############################
  // { path: 'plots-in-:cityname', loadChildren: () => import('./city-based-listing/city-based-listing.module').then(m => m.CityBasedListingModule) },
  // ############################### City Based Listing New Routes ###############################
  // { path: 'plots-in-:cityname', loadChildren: () => import('./city-based-listing-new/city-based-listing-new.module').then(m => m.CityBasedListingNewModule) },

  // ############################### CATEGORY 4 ###############################

  // ############################### Agriculatural Land COMBO STARTS ###############################

  // { path: 'agricultural-land-for-sale-in-bangalore', loadChildren: () => import('./agriculture-farm/agriculture-farm.module').then(m => m.AgricultureFarmModule) },
  // { path: 'agricultural-land-for-sale-in-hyderabad', loadChildren: () => import('./agriculture-farm/agriculture-farm.module').then(m => m.AgricultureFarmModule) },
  // { path: 'agricultural-land-for-sale-in-chennai', loadChildren: () => import('./agriculture-farm/agriculture-farm.module').then(m => m.AgricultureFarmModule) },
  // { path: 'agricultural-land-for-sale-in-kochi', loadChildren: () => import('./agriculture-farm/agriculture-farm.module').then(m => m.AgricultureFarmModule) },
  // { path: 'agricultural-land-for-sale-in-pune', loadChildren: () => import('./agriculture-farm/agriculture-farm.module').then(m => m.AgricultureFarmModule) },
  // { path: 'agricultural-land-for-sale-in-mumbai', loadChildren: () => import('./agriculture-farm/agriculture-farm.module').then(m => m.AgricultureFarmModule) },
  // { path: 'agricultural-land-for-sale-in-delhi', loadChildren: () => import('./agriculture-farm/agriculture-farm.module').then(m => m.AgricultureFarmModule) },
  // { path: 'agricultural-land-for-sale-in-kolkata', loadChildren: () => import('./agriculture-farm/agriculture-farm.module').then(m => m.AgricultureFarmModule) },
  // { path: 'agricultural-land-for-sale-in-goa', loadChildren: () => import('./agriculture-farm/agriculture-farm.module').then(m => m.AgricultureFarmModule) },
  // { path: 'agricultural-land-for-sale-in-gurgaon', loadChildren: () => import('./agriculture-farm/agriculture-farm.module').then(m => m.AgricultureFarmModule) },
  // { path: 'agricultural-land-for-sale-in-mysore', loadChildren: () => import('./agriculture-farm/agriculture-farm.module').then(m => m.AgricultureFarmModule) },
  // { path: 'agricultural-land-for-sale-in-coimbatore', loadChildren: () => import('./agriculture-farm/agriculture-farm.module').then(m => m.AgricultureFarmModule) },
  // { path: 'agricultural-land-for-sale-in-ahmedabad', loadChildren: () => import('./agriculture-farm/agriculture-farm.module').then(m => m.AgricultureFarmModule) },
  // { path: 'agricultural-land-for-sale-in-trivandrum', loadChildren: () => import('./agriculture-farm/agriculture-farm.module').then(m => m.AgricultureFarmModule) },
  // { path: 'agricultural-land-for-sale-in-navi-mumbai', loadChildren: () => import('./agriculture-farm/agriculture-farm.module').then(m => m.AgricultureFarmModule) },
  // { path: 'agricultural-land-for-sale-in-noida', loadChildren: () => import('./agriculture-farm/agriculture-farm.module').then(m => m.AgricultureFarmModule) },
  // { path: 'agricultural-land-for-sale-in-greater-noida', loadChildren: () => import('./agriculture-farm/agriculture-farm.module').then(m => m.AgricultureFarmModule) },
  // { path: 'agricultural-land-for-sale-in-bhubaneshwar', loadChildren: () => import('./agriculture-farm/agriculture-farm.module').then(m => m.AgricultureFarmModule) },
  // { path: 'agricultural-land-for-sale-in-vijayawada', loadChildren: () => import('./agriculture-farm/agriculture-farm.module').then(m => m.AgricultureFarmModule) },
  // { path: 'agricultural-land-for-sale-in-bhopal', loadChildren: () => import('./agriculture-farm/agriculture-farm.module').then(m => m.AgricultureFarmModule) },
  // { path: 'agricultural-land-for-sale-in-indore', loadChildren: () => import('./agriculture-farm/agriculture-farm.module').then(m => m.AgricultureFarmModule) },
  // { path: 'agricultural-land-for-sale-in-vizag', loadChildren: () => import('./agriculture-farm/agriculture-farm.module').then(m => m.AgricultureFarmModule) },
  // { path: 'agricultural-land-for-sale-in-amaravati', loadChildren: () => import('./agriculture-farm/agriculture-farm.module').then(m => m.AgricultureFarmModule) },
  // { path: 'agricultural-land-for-sale-in-thrissur', loadChildren: () => import('./agriculture-farm/agriculture-farm.module').then(m => m.AgricultureFarmModule) },
  // { path: 'agricultural-land-for-sale-in-tirupati', loadChildren: () => import('./agriculture-farm/agriculture-farm.module').then(m => m.AgricultureFarmModule) },
  // { path: 'agricultural-land-for-sale-in-lucknow', loadChildren: () => import('./agriculture-farm/agriculture-farm.module').then(m => m.AgricultureFarmModule) },
  // { path: 'agricultural-land-for-sale-in-nashik', loadChildren: () => import('./agriculture-farm/agriculture-farm.module').then(m => m.AgricultureFarmModule) },
  // { path: 'agricultural-land-for-sale-in-nagpur', loadChildren: () => import('./agriculture-farm/agriculture-farm.module').then(m => m.AgricultureFarmModule) },
  // { path: 'agricultural-land-for-sale-in-mangalore', loadChildren: () => import('./agriculture-farm/agriculture-farm.module').then(m => m.AgricultureFarmModule) },
  // { path: 'agricultural-land-for-sale-in-jaipur', loadChildren: () => import('./agriculture-farm/agriculture-farm.module').then(m => m.AgricultureFarmModule) },
  // { path: 'agricultural-land-for-sale-in-nellore', loadChildren: () => import('./agriculture-farm/agriculture-farm.module').then(m => m.AgricultureFarmModule) },
  // { path: 'agricultural-land-for-sale-in-faridabad', loadChildren: () => import('./agriculture-farm/agriculture-farm.module').then(m => m.AgricultureFarmModule) },
  // { path: 'agricultural-land-for-sale-in-chandigarh', loadChildren: () => import('./agriculture-farm/agriculture-farm.module').then(m => m.AgricultureFarmModule) },
  // { path: 'agricultural-land-for-sale-in-dehradun', loadChildren: () => import('./agriculture-farm/agriculture-farm.module').then(m => m.AgricultureFarmModule) },
  // { path: 'agricultural-land-for-sale-in-ghaziabad', loadChildren: () => import('./agriculture-farm/agriculture-farm.module').then(m => m.AgricultureFarmModule) },
  // { path: 'agricultural-land-for-sale-in-ranchi', loadChildren: () => import('./agriculture-farm/agriculture-farm.module').then(m => m.AgricultureFarmModule) },
  // { path: 'agricultural-land-for-sale-in-agra', loadChildren: () => import('./agriculture-farm/agriculture-farm.module').then(m => m.AgricultureFarmModule) },
  // { path: 'agricultural-land-for-sale-in-durgapur', loadChildren: () => import('./agriculture-farm/agriculture-farm.module').then(m => m.AgricultureFarmModule) },
  // { path: 'agricultural-land-for-sale-in-vizianagaram', loadChildren: () => import('./agriculture-farm/agriculture-farm.module').then(m => m.AgricultureFarmModule) },
  // { path: 'agricultural-land-for-sale-in-amritsar', loadChildren: () => import('./agriculture-farm/agriculture-farm.module').then(m => m.AgricultureFarmModule) },
  // { path: 'agricultural-land-for-sale-in-patna', loadChildren: () => import('./agriculture-farm/agriculture-farm.module').then(m => m.AgricultureFarmModule) },
  // { path: 'agricultural-land-for-sale-in-surat', loadChildren: () => import('./agriculture-farm/agriculture-farm.module').then(m => m.AgricultureFarmModule) },
  // { path: 'agricultural-land-for-sale-in-guntur', loadChildren: () => import('./agriculture-farm/agriculture-farm.module').then(m => m.AgricultureFarmModule) },
  // { path: 'agricultural-land-for-sale-in-aurangabad', loadChildren: () => import('./agriculture-farm/agriculture-farm.module').then(m => m.AgricultureFarmModule) },
  // { path: 'agricultural-land-for-sale-in-guwahati', loadChildren: () => import('./agriculture-farm/agriculture-farm.module').then(m => m.AgricultureFarmModule) },
  // { path: 'agricultural-land-for-sale-in-dharwad', loadChildren: () => import('./agriculture-farm/agriculture-farm.module').then(m => m.AgricultureFarmModule) },
  // { path: 'agricultural-land-for-sale-in-kolhapur', loadChildren: () => import('./agriculture-farm/agriculture-farm.module').then(m => m.AgricultureFarmModule) },
  // { path: 'agricultural-land-for-sale-in-mohali', loadChildren: () => import('./agriculture-farm/agriculture-farm.module').then(m => m.AgricultureFarmModule) },
  // { path: 'agricultural-land-for-sale-in-kanpur', loadChildren: () => import('./agriculture-farm/agriculture-farm.module').then(m => m.AgricultureFarmModule) },
  // { path: 'agricultural-land-for-sale-in-thane', loadChildren: () => import('./agriculture-farm/agriculture-farm.module').then(m => m.AgricultureFarmModule) },
  // { path: 'agricultural-land-for-sale-in-jamshedpur', loadChildren: () => import('./agriculture-farm/agriculture-farm.module').then(m => m.AgricultureFarmModule) },
  // { path: 'agricultural-land-for-sale-in-belgaum', loadChildren: () => import('./agriculture-farm/agriculture-farm.module').then(m => m.AgricultureFarmModule) },
  // { path: 'agricultural-land-for-sale-in-puri', loadChildren: () => import('./agriculture-farm/agriculture-farm.module').then(m => m.AgricultureFarmModule) },
  // { path: 'agricultural-land-for-sale-in-meerut', loadChildren: () => import('./agriculture-farm/agriculture-farm.module').then(m => m.AgricultureFarmModule) },
  // { path: 'agricultural-land-for-sale-in-tiruvannamalai', loadChildren: () => import('./agriculture-farm/agriculture-farm.module').then(m => m.AgricultureFarmModule) },
  // { path: 'agricultural-land-for-sale-in-satara', loadChildren: () => import('./agriculture-farm/agriculture-farm.module').then(m => m.AgricultureFarmModule) },
  // { path: 'agricultural-land-for-sale-in-junagadh', loadChildren: () => import('./agriculture-farm/agriculture-farm.module').then(m => m.AgricultureFarmModule) },
  // { path: 'agricultural-land-for-sale-in-vadodara', loadChildren: () => import('./agriculture-farm/agriculture-farm.module').then(m => m.AgricultureFarmModule) },
  // { path: 'agricultural-land-for-sale-in-palwal', loadChildren: () => import('./agriculture-farm/agriculture-farm.module').then(m => m.AgricultureFarmModule) },
  // { path: 'agricultural-land-for-sale-in-panchkula', loadChildren: () => import('./agriculture-farm/agriculture-farm.module').then(m => m.AgricultureFarmModule) },
  // { path: 'agricultural-land-for-sale-in-panipat', loadChildren: () => import('./agriculture-farm/agriculture-farm.module').then(m => m.AgricultureFarmModule) },
  // { path: 'agricultural-land-for-sale-in-calicut', loadChildren: () => import('./agriculture-farm/agriculture-farm.module').then(m => m.AgricultureFarmModule) },
  // { path: 'agricultural-land-for-sale-in-pathanamthitta', loadChildren: () => import('./agriculture-farm/agriculture-farm.module').then(m => m.AgricultureFarmModule) },
  // { path: 'agricultural-land-for-sale-in-haridwar', loadChildren: () => import('./agriculture-farm/agriculture-farm.module').then(m => m.AgricultureFarmModule) },
  // { path: 'agricultural-land-for-sale-in-solan', loadChildren: () => import('./agriculture-farm/agriculture-farm.module').then(m => m.AgricultureFarmModule) },
  // { path: 'agricultural-land-for-sale-in-burhanpur', loadChildren: () => import('./agriculture-farm/agriculture-farm.module').then(m => m.AgricultureFarmModule) },
  // { path: 'agricultural-land-for-sale-in-raipur', loadChildren: () => import('./agriculture-farm/agriculture-farm.module').then(m => m.AgricultureFarmModule) },
  // { path: 'agricultural-land-for-sale-in-kanchipuram', loadChildren: () => import('./agriculture-farm/agriculture-farm.module').then(m => m.AgricultureFarmModule) },
  // { path: 'agricultural-land-for-sale-in-pondicherry', loadChildren: () => import('./agriculture-farm/agriculture-farm.module').then(m => m.AgricultureFarmModule) },
  // { path: 'agricultural-land-for-sale-in-siliguri', loadChildren: () => import('./agriculture-farm/agriculture-farm.module').then(m => m.AgricultureFarmModule) },
  // { path: 'agricultural-land-for-sale-in-gandhinagar', loadChildren: () => import('./agriculture-farm/agriculture-farm.module').then(m => m.AgricultureFarmModule) },
  // { path: 'agricultural-land-for-sale-in-ajmer', loadChildren: () => import('./agriculture-farm/agriculture-farm.module').then(m => m.AgricultureFarmModule) },
  // { path: 'agricultural-land-for-sale-in-varanasi', loadChildren: () => import('./agriculture-farm/agriculture-farm.module').then(m => m.AgricultureFarmModule) },
  // { path: 'agricultural-land-for-sale-in-mathura', loadChildren: () => import('./agriculture-farm/agriculture-farm.module').then(m => m.AgricultureFarmModule) },
  // { path: 'agricultural-land-for-sale-in-dindigul', loadChildren: () => import('./agriculture-farm/agriculture-farm.module').then(m => m.AgricultureFarmModule) },
  // { path: 'agricultural-land-for-sale-in-rewari', loadChildren: () => import('./agriculture-farm/agriculture-farm.module').then(m => m.AgricultureFarmModule) },
  // { path: 'agricultural-land-for-sale-in-solapur', loadChildren: () => import('./agriculture-farm/agriculture-farm.module').then(m => m.AgricultureFarmModule) },
  // { path: 'agricultural-land-for-sale-in-ratnagiri', loadChildren: () => import('./agriculture-farm/agriculture-farm.module').then(m => m.AgricultureFarmModule) },
  // { path: 'agricultural-land-for-sale-in-shantiniketan', loadChildren: () => import('./agriculture-farm/agriculture-farm.module').then(m => m.AgricultureFarmModule) },
  // { path: 'agricultural-land-for-sale-in-rishikesh', loadChildren: () => import('./agriculture-farm/agriculture-farm.module').then(m => m.AgricultureFarmModule) },
  // { path: 'agricultural-land-for-sale-in-rajkor', loadChildren: () => import('./agriculture-farm/agriculture-farm.module').then(m => m.AgricultureFarmModule) },
  // { path: 'agricultural-land-for-sale-in-hapur', loadChildren: () => import('./agriculture-farm/agriculture-farm.module').then(m => m.AgricultureFarmModule) },
  // { path: 'agricultural-land-for-sale-in-chamarajnagar', loadChildren: () => import('./agriculture-farm/agriculture-farm.module').then(m => m.AgricultureFarmModule) },
  // { path: 'agricultural-land-for-sale-in-gulbarga', loadChildren: () => import('./agriculture-farm/agriculture-farm.module').then(m => m.AgricultureFarmModule) },
  // { path: 'agricultural-land-for-sale-in-alwar', loadChildren: () => import('./agriculture-farm/agriculture-farm.module').then(m => m.AgricultureFarmModule) },
  // { path: 'agricultural-land-for-sale-in-tirunelveli', loadChildren: () => import('./agriculture-farm/agriculture-farm.module').then(m => m.AgricultureFarmModule) },
  // { path: 'agricultural-land-for-sale-in-raigad', loadChildren: () => import('./agriculture-farm/agriculture-farm.module').then(m => m.AgricultureFarmModule) },
  // { path: 'agricultural-land-for-sale-in-rajkot', loadChildren: () => import('./agriculture-farm/agriculture-farm.module').then(m => m.AgricultureFarmModule) },
  // { path: 'agricultural-land-for-sale-in-purba-medinipur', loadChildren: () => import('./agriculture-farm/agriculture-farm.module').then(m => m.AgricultureFarmModule) },
  // { path: 'agricultural-land-for-sale-in-ludhiana', loadChildren: () => import('./agriculture-farm/agriculture-farm.module').then(m => m.AgricultureFarmModule) },
  // { path: 'agricultural-land-for-sale-in-chamarajanagar', loadChildren: () => import('./agriculture-farm/agriculture-farm.module').then(m => m.AgricultureFarmModule) },
  // { path: 'agricultural-land-for-sale-in-sangli', loadChildren: () => import('./agriculture-farm/agriculture-farm.module').then(m => m.AgricultureFarmModule) },
  // { path: 'agricultural-land-for-sale-in-ayodhya', loadChildren: () => import('./agriculture-farm/agriculture-farm.module').then(m => m.AgricultureFarmModule) },
  // { path: 'agricultural-land-for-sale-in-bhiwadi', loadChildren: () => import('./agriculture-farm/agriculture-farm.module').then(m => m.AgricultureFarmModule) },
  // { path: 'agricultural-land-for-sale-in-kottayam', loadChildren: () => import('./agriculture-farm/agriculture-farm.module').then(m => m.AgricultureFarmModule) },
  // { path: 'agricultural-land-for-sale-in-kannur', loadChildren: () => import('./agriculture-farm/agriculture-farm.module').then(m => m.AgricultureFarmModule) },
  // { path: 'agricultural-land-for-sale-in-neemrana', loadChildren: () => import('./agriculture-farm/agriculture-farm.module').then(m => m.AgricultureFarmModule) },
  // { path: 'agricultural-land-for-sale-in-thanjavur', loadChildren: () => import('./agriculture-farm/agriculture-farm.module').then(m => m.AgricultureFarmModule) },
  // { path: 'agricultural-land-for-sale-in-kota', loadChildren: () => import('./agriculture-farm/agriculture-farm.module').then(m => m.AgricultureFarmModule) },
  // { path: 'agricultural-land-for-sale-in-bilaspur', loadChildren: () => import('./agriculture-farm/agriculture-farm.module').then(m => m.AgricultureFarmModule) },
  // { path: 'agricultural-land-for-sale-in-navsari', loadChildren: () => import('./agriculture-farm/agriculture-farm.module').then(m => m.AgricultureFarmModule) },
  // { path: 'agricultural-land-for-sale-in-davanegere', loadChildren: () => import('./agriculture-farm/agriculture-farm.module').then(m => m.AgricultureFarmModule) },
  // { path: 'agricultural-land-for-sale-in-jabalpur', loadChildren: () => import('./agriculture-farm/agriculture-farm.module').then(m => m.AgricultureFarmModule) },
  // { path: 'agricultural-land-for-sale-in-gwalior', loadChildren: () => import('./agriculture-farm/agriculture-farm.module').then(m => m.AgricultureFarmModule) },
  // { path: 'agricultural-land-for-sale-in-ujjain', loadChildren: () => import('./agriculture-farm/agriculture-farm.module').then(m => m.AgricultureFarmModule) },
  // { path: 'agricultural-land-for-sale-in-salem', loadChildren: () => import('./agriculture-farm/agriculture-farm.module').then(m => m.AgricultureFarmModule) },
  // { path: 'agricultural-land-for-sale-in-erode', loadChildren: () => import('./agriculture-farm/agriculture-farm.module').then(m => m.AgricultureFarmModule) },
  // { path: 'agricultural-land-for-sale-in-thoothukudi', loadChildren: () => import('./agriculture-farm/agriculture-farm.module').then(m => m.AgricultureFarmModule) },
  // { path: 'agricultural-land-for-sale-in-bareilly', loadChildren: () => import('./agriculture-farm/agriculture-farm.module').then(m => m.AgricultureFarmModule) },
  // { path: 'agricultural-land-for-sale-in-jhansi', loadChildren: () => import('./agriculture-farm/agriculture-farm.module').then(m => m.AgricultureFarmModule) },
  // { path: 'agricultural-land-for-sale-in-tiruchirappalli', loadChildren: () => import('./agriculture-farm/agriculture-farm.module').then(m => m.AgricultureFarmModule) },
  // { path: 'agricultural-land-for-sale-in-hosur', loadChildren: () => import('./agriculture-farm/agriculture-farm.module').then(m => m.AgricultureFarmModule) },
  // { path: 'agricultural-land-for-sale-in-madurai', loadChildren: () => import('./agriculture-farm/agriculture-farm.module').then(m => m.AgricultureFarmModule) },
  // { path: 'agricultural-land-for-sale-in-namakkal', loadChildren: () => import('./agriculture-farm/agriculture-farm.module').then(m => m.AgricultureFarmModule) },
  // { path: 'agricultural-land-for-sale-in-tiruppur', loadChildren: () => import('./agriculture-farm/agriculture-farm.module').then(m => m.AgricultureFarmModule) },
  // { path: 'agricultural-land-for-sale-in-vellore', loadChildren: () => import('./agriculture-farm/agriculture-farm.module').then(m => m.AgricultureFarmModule) },
  // { path: 'agricultural-land-for-sale-in-viluppuram', loadChildren: () => import('./agriculture-farm/agriculture-farm.module').then(m => m.AgricultureFarmModule) },
  // { path: 'agricultural-land-for-sale-in-koonimedu', loadChildren: () => import('./agriculture-farm/agriculture-farm.module').then(m => m.AgricultureFarmModule) },
  // { path: 'agricultural-land-for-sale-in-theni', loadChildren: () => import('./agriculture-farm/agriculture-farm.module').then(m => m.AgricultureFarmModule) },
  // { path: 'agricultural-land-for-sale-in-kotagiri', loadChildren: () => import('./agriculture-farm/agriculture-farm.module').then(m => m.AgricultureFarmModule) },
  // { path: 'agricultural-land-for-sale-in-krishnagri', loadChildren: () => import('./agriculture-farm/agriculture-farm.module').then(m => m.AgricultureFarmModule) },


  // ############################### City Based Listing Old Routes - To Be Removed Later ###############################
  // { path: 'agricultural-land-for-sale-in-:cityname', loadChildren: () => import('./city-based-listing/city-based-listing.module').then(m => m.CityBasedListingModule) },
  // ############################### City Based Listing New Routes ###############################
  // { path: 'agricultural-land-for-sale-in-:cityname', loadChildren: () => import('./city-based-listing-new/city-based-listing-new.module').then(m => m.CityBasedListingNewModule) },



  // ############################### Agriculatural Land LOCALITY COMBO ENDS ###############################

  // ############################### CATEGORY 5 ###############################

  //  { path: 'propertyold/:cityname/:locality/:propName-:param', loadChildren: () => import('./prop-details/prop-details.module').then(m => m.PropDetailsModule), },
  // { path: 'property/:cityname/:locality/:propName-:param', loadChildren: () => import('./prop-details-new/prop-details-new.module').then(m => m.PropDetailsNewModule), },

  { path: 'pas/:propName-:in-:localityName-:propCity-:amenities-:propId', loadChildren: () => import('./property-amenities/property-amenities.module').then(m => m.PropertyAmenitiesModule) },

  { path: 'fpl/:propName-:in-:localityName-:propCity-:floorplans-:propId', loadChildren: () => import('./property-floorplans/property-floorplans.module').then(m => m.PropertyFloorplanModule) },

  { path: 'fpd/:propName-in-localityName-propCity-floorplan-overview-floorplanId-propId', loadChildren: () => import('./property-detailed-floorplan/property-detailed-floorplan.module').then(m => m.PropertyDetailedFloorplanModule) },

  { path: 'pbd/:propName-:in-:localityName-:propCity-:brochure-download-:propId', loadChildren: () => import('./property-brochure-floorplans/property-brochure-floorplans.module').then(m => m.PropertyBrochureFloorplansModule) },
  { path: 'dfl/:propName-:in-:localityName-:propCity-:disscussion-forum-list-:propId', loadChildren: () => import('./property-disscussion-main/property-disscussion-main.module').then(m => m.PropertyDisscussionMainModule) },

  { path: 'dfd/:propName-in-localityName-propCity-disscussion-forum-details-questionId-propId', loadChildren: () => import('./property-disscussion-detailed/property-disscussion-detailed.module').then(m => m.PropertyDisscussionDetailedModule) },

  { path: 'dfq/:propName-in-:localityName-:propCity-:disscussion-forum-question-:propId', loadChildren: () => import('./property-disscussion-post-question/property-disscussion-post-question.module').then(m => m.PropertyDisscussionPostQuestionModule) },

  { path: 'pgv/:propName-:in-:localityName-:propCity-:photo-gallery-:propId', loadChildren: () => import('./property-gallery/property-gallery.module').then(m => m.PropertyGallerynModule) },
  { path: 'plm/:propName-:in-:localityName-:propCity-:location-map-:propId', loadChildren: () => import('./property-location/property-location.module').then(m => m.PropertyLocationModule) },

  // ############################### CATEGORY 5 ###############################

  // ############################### URL COMBO SECTION KEYWORD BASED STARTS ###############################

  // ############################### PROJECT BASED LISTINGS ###############################

  { path: 'bhkdetails/:bhk-:size-:proptype-:locality-:cityname-:propid', loadChildren: () => import('./project-bhk-details/project-bhk-details.module').then(m => m.ProjectBhkDetailsModule) },
  { path: 'project/:propname-for-sale-in-:cityname-:propid', loadChildren: () => import('./project-bhk-listing/project-bhk-listing.module').then(m => m.ProjectBhkListingModule) },

  // ############################### PROJECT BASED LISTINGS ###############################

  // ############################### BHK PROPERTYTYPE LOCALITY CITY LISTINGS ###############################


  // { path: 'btlc/:bhk-:propertytype-in-:locality-:city-:localityId', loadChildren: () => import('./bhk-with-locality/bhk-with-locality.module').then(m => m.BhkWithLocalityModule) },

  // ############################### locality Based Listing Old Routes - To Be Removed Later ###############################
  // { path: 'btlc/:bhk-:propertytype-in-:locality-:city-:localityId', loadChildren: () => import('./locality-based-listing/locality-based-listing.module').then(m => m.LocalityBasedListingModule) },
  // ############################### locality Based Listing New Routes ###############################
  // { path: 'btlc/:bhk-:propertytype-in-:locality-:city-:localityId', loadChildren: () => import('./locality-based-listing-new/locality-based-listing-new.module').then(m => m.LocalityBasedListingNewModule) },

  // ############################### BHK PROPERTYTYPE LOCALITY CITY LISTINGS ###############################

  // ############################### NEW PROJECT LOCALITY CITY ###############################

  // { path: 'upcoming-new-launch-properties/:new-projects-in-:locality-:city-:localityId', loadChildren: () => import('./newproject-locality-city/newproject-locality-city.module').then(m => m.NewprojectLocalityCityModule) },


  // ############################### Locality Based Listing Old Routes - To Be Removed Later ###############################
  // { path: 'upcoming-new-launch-properties/:new-projects-in-:locality-:city-:localityId', loadChildren: () => import('./locality-based-listing/locality-based-listing.module').then(m => m.LocalityBasedListingModule) },
  // ############################### Locality Based Listing New Routes ###############################
  // { path: 'upcoming-new-launch-properties/:new-projects-in-:locality-:city-:localityId', loadChildren: () => import('./locality-based-listing-new/locality-based-listing-new.module').then(m => m.LocalityBasedListingNewModule) },

  // ############################### NEW PROJECT LOCALITY CITY ###############################

  // ############################### BHK STATUS TYPE LOCALITY CITY ###############################

  // { path: 'bstlc/:bhk-:ready-to-move-:propertytype-in-:locality-:city-:localityId', loadChildren: () => import('./bhk-status-type-locality-city/bhk-status-type-locality-city.module').then(m => m.BhkStatusTypeLocalityCityModule) },


  // ############################### Locality Based Listing Old Routes - To Be Removed Later ###############################
  // { path: 'bstlc/:bhk-:ready-to-move-:propertytype-in-:locality-:city-:localityId', loadChildren: () => import('./locality-based-listing/locality-based-listing.module').then(m => m.LocalityBasedListingModule) },
  // ############################### Locality Based Listing New Routes ###############################
  // { path: 'bstlc/:bhk-:ready-to-move-:propertytype-in-:locality-:city-:localityId', loadChildren: () => import('./locality-based-listing-new/locality-based-listing-new.module').then(m => m.LocalityBasedListingNewModule) },

  // ############################### BHK STATUS TYPE LOCALITY CITY ###############################

  // ############################### BHK STATUS TYPE CITY ###############################

  // { path: 'bstc/:bhk-:ready-to-move-:propertytype-in-:locality-:city-:localityId', loadChildren: () => import('./bhk-status-type-locality-city/bhk-status-type-locality-city.module').then(m => m.BhkStatusTypeLocalityCityModule) },



  // ############################### City Based Listing Old Routes - To Be Removed Later ############################### 
  // { path: 'bstc/:bhk-:ready-to-move-:propertytype-in-:locality-:city-:localityId', loadChildren: () => import('./city-based-listing/city-based-listing.module').then(m => m.CityBasedListingModule) },
  // ############################### City Based Listing new Routes ###############################
  // { path: 'bstc/:bhk-:ready-to-move-:propertytype-in-:locality-:city-:localityId', loadChildren: () => import('./city-based-listing-new/city-based-listing-new.module').then(m => m.CityBasedListingNewModule) },





  // { path: 'btalc/:bhk-:ready-to-move-:propertytype-in-:locality-:city-:localityId', loadChildren: () => import('./bhk-status-type-locality-city/bhk-status-type-locality-city.module').then(m => m.BhkStatusTypeLocalityCityModule) },

  // ############################### Locality Based Listing Old Routes - To Be Removed Later ###############################
  // { path: 'btalc/:bhk-:ready-to-move-:propertytype-in-:locality-:city-:localityId', loadChildren: () => import('./locality-based-listing/locality-based-listing.module').then(m => m.LocalityBasedListingModule) },
  // ############################### Locality Based Listing New Routes ###############################
  // { path: 'btalc/:bhk-:ready-to-move-:propertytype-in-:locality-:city-:localityId', loadChildren: () => import('./locality-based-listing-new/locality-based-listing-new.module').then(m => m.LocalityBasedListingNewModule) },

  // { path: 'btac/:bhk-:ready-to-move-:propertytype-in-:locality-:city-:localityId', loadChildren: () => import('./bhk-status-type-locality-city/bhk-status-type-locality-city.module').then(m => m.BhkStatusTypeLocalityCityModule) },

  // ############################### City Based Listing Old Routes - To Be Removed Later ############################### 
  // { path: 'btac/:bhk-:ready-to-move-:propertytype-in-:locality-:city-:localityId', loadChildren: () => import('./city-based-listing/city-based-listing.module').then(m => m.CityBasedListingModule) },
  // ############################### City Based Listing new Routes ###############################
  // { path: 'btac/:bhk-:ready-to-move-:propertytype-in-:locality-:city-:localityId', loadChildren: () => import('./city-based-listing-new/city-based-listing-new.module').then(m => m.CityBasedListingNewModule) },

  // { path: 'btllc/:bhk-:ready-to-move-:propertytype-in-:locality-:city-:localityId', loadChildren: () => import('./bhk-status-type-locality-city/bhk-status-type-locality-city.module').then(m => m.BhkStatusTypeLocalityCityModule) },

  // ############################### Locality Based Listing Old Routes - To Be Removed Later ###############################
  // { path: 'btllc/:bhk-:ready-to-move-:propertytype-in-:locality-:city-:localityId', loadChildren: () => import('./locality-based-listing/locality-based-listing.module').then(m => m.LocalityBasedListingModule) },
  // ############################### Locality Based Listing New Routes ###############################
  // { path: 'btllc/:bhk-:ready-to-move-:propertytype-in-:locality-:city-:localityId', loadChildren: () => import('./locality-based-listing-new/locality-based-listing-new.module').then(m => m.LocalityBasedListingNewModule) },

  // { path: 'btluc/:bhk-:ready-to-move-:propertytype-in-:locality-:city-:localityId', loadChildren: () => import('./bhk-status-type-locality-city/bhk-status-type-locality-city.module').then(m => m.BhkStatusTypeLocalityCityModule) },


  // ############################### City Based Listing Old Routes - To Be Removed Later ############################### 
  // { path: 'btluc/:bhk-:ready-to-move-:propertytype-in-:locality-:city-:localityId', loadChildren: () => import('./city-based-listing/city-based-listing.module').then(m => m.CityBasedListingModule) },
  // ############################### City Based Listing new Routes ###############################
  // { path: 'btluc/:bhk-:ready-to-move-:propertytype-in-:locality-:city-:localityId', loadChildren: () => import('./city-based-listing-new/city-based-listing-new.module').then(m => m.CityBasedListingNewModule) },
  // ############################### BHK STATUS TYPE CITY ###############################

  // ############################### BHK TYPE CITY ###############################

  // { path: 'btc/:bhk-:ready-to-move-:propertytype-in-:locality-:city-:localityId', loadChildren: () => import('./bhk-status-type-locality-city/bhk-status-type-locality-city.module').then(m => m.BhkStatusTypeLocalityCityModule) },

  // ############################### City Based Listing Old Routes - To Be Removed Later ############################### 
  // { path: 'btc/:bhk-:ready-to-move-:propertytype-in-:locality-:city-:localityId', loadChildren: () => import('./city-based-listing/city-based-listing.module').then(m => m.CityBasedListingModule) },
  // ############################### City Based Listing new Routes ###############################
  // { path: 'btc/:bhk-:ready-to-move-:propertytype-in-:locality-:city-:localityId', loadChildren: () => import('./city-based-listing-new/city-based-listing-new.module').then(m => m.CityBasedListingNewModule) },

  // ############################### BHK TYPE CITY ###############################

  // ############################### PROPSTATUS AND PROPTYPE WITH LOCALITY ###############################

  // { path: 'stlc/:status-:propertytype-in-:localityname-:city-:localityId', loadChildren: () => import('./propstatus-and-proptype-with-locality/propstatus-and-proptype-with-locality.module').then(m => m.PropstatusAndProptypeWithLocalityModule) },
  // ############################### Locality Based Listing Old Routes - To Be Removed Later ###############################
  // { path: 'stlc/:status-:propertytype-in-:localityname-:city-:localityId', loadChildren: () => import('./locality-based-listing/locality-based-listing.module').then(m => m.LocalityBasedListingModule) },
  // ############################### Locality Based Listing New Routes ###############################
  // { path: 'stlc/:status-:propertytype-in-:localityname-:city-:localityId', loadChildren: () => import('./locality-based-listing-new/locality-based-listing-new.module').then(m => m.LocalityBasedListingNewModule) },

  // ############################### PROPSTATUS AND PROPTYPE WITH LOCALITY ###############################

  // ############################### PROPSTATUS PROPTYPE CITY ###############################

  // { path: 'ready-to-move-apartments/:status-:propertytype-in-:city', loadChildren: () => import('./propstatus-proptype-city/propstatus-proptype-city.module').then(m => m.PropstatusProptypeCityModule) },


  // ############################### City Based Listing Old Routes - To Be Removed Later ############################### 
  // { path: 'ready-to-move-apartments/:status-:propertytype-in-:city', loadChildren: () => import('./city-based-listing/city-based-listing.module').then(m => m.CityBasedListingModule) },
  // ############################### City Based Listing new Routes ###############################
  // { path: 'ready-to-move-apartments/:status-:propertytype-in-:city', loadChildren: () => import('./city-based-listing-new/city-based-listing-new.module').then(m => m.CityBasedListingNewModule) },

  // ############################### PROPSTATUS PROPTYPE CITY ###############################

  // #################################### NEW PROJECT CITY ####################################

  // { path: 'new-launch-projects/:status-:propertytype-in-:city', loadChildren: () => import('./propstatus-proptype-city/propstatus-proptype-city.module').then(m => m.PropstatusProptypeCityModule) },


  // ############################### City Based Listing Old Routes - To Be Removed Later ############################### 
  // { path: 'new-launch-projects/:status-:propertytype-in-:city', loadChildren: () => import('./city-based-listing/city-based-listing.module').then(m => m.CityBasedListingModule) },
  // ############################### City Based Listing new Routes ###############################
  // { path: 'new-launch-projects/:status-:propertytype-in-:city', loadChildren: () => import('./city-based-listing-new/city-based-listing-new.module').then(m => m.CityBasedListingNewModule) },
  // #################################### NEW PROJECT CITY ####################################

  // ############################### Locality Overview Page ############################### 


  // ############################### Locality Overview Page ############################### 


  // ############################### URL COMBO SECTION KEYWORD BASED ENDS ###############################

  // ############################### MAIN WEBSITE PAGES ENDS ###############################

  // ############################### WEBSITE MAIN LISTING PAGES STARTS ###############################

  // { path: ':cityname/property-sale', loadChildren: () => import('./city/city.module').then(m => m.CityModule) },

  // ############################### City Based Listing Old Routes - To Be Removed Later ############################### 
  // { path: ':cityname/property-sale', loadChildren: () => import('./city-based-listing/city-based-listing.module').then(m => m.CityBasedListingModule) },
  // ############################### City Based Listing new Routes ###############################
  // { path: ':cityname/property-sale', loadChildren: () => import('./city-based-listing-new/city-based-listing-new.module').then(m => m.CityBasedListingNewModule) },

  // { path: 'apc/:affordable-projects-in-:cityname', loadChildren: () => import('./affordable-project/affordable-project.module').then(m => m.AffordableProjectModule) },


  // ############################### City Based Listing Old Routes - To Be Removed Later ############################### 
  // { path: 'apc/:affordable-projects-in-:cityname', loadChildren: () => import('./city-based-listing/city-based-listing.module').then(m => m.CityBasedListingModule) },
  // ############################### City Based Listing new Routes ###############################
  // { path: 'apc/:affordable-projects-in-:cityname', loadChildren: () => import('./city-based-listing-new/city-based-listing-new.module').then(m => m.CityBasedListingNewModule) },

  // { path: 'aplc/:affordable-projects-in-:-locality-:cityname-:localityid', loadChildren: () => import('./affordable-project/affordable-project.module').then(m => m.AffordableProjectModule) },


  // ############################### Locality Based Listing Old Routes - To Be Removed Later ###############################
  // { path: 'aplc/:affordable-projects-in-:-locality-:cityname-:localityid', loadChildren: () => import('./locality-based-listing/locality-based-listing.module').then(m => m.LocalityBasedListingModule) },
  // ############################### Locality Based Listing New Routes ###############################
  // { path: 'aplc/:affordable-projects-in-:-locality-:cityname-:localityid', loadChildren: () => import('./locality-based-listing-new/locality-based-listing-new.module').then(m => m.LocalityBasedListingNewModule) },

  // { path: 'lpc/:luxury-projects-in-:cityname', loadChildren: () => import('./luxury-project/luxury-project.module').then(m => m.LuxuryProjectModule) },


  // ############################### City Based Listing Old Routes - To Be Removed Later ###############################
  // { path: 'lpc/:luxury-projects-in-:cityname', loadChildren: () => import('./city-based-listing/city-based-listing.module').then(m => m.CityBasedListingModule) },
  // ############################### City Based Listing new Routes ###############################
  // { path: 'lpc/:luxury-projects-in-:cityname', loadChildren: () => import('./city-based-listing-new/city-based-listing-new.module').then(m => m.CityBasedListingNewModule) },


  // ################################ Locality Based Listing Old Routes - To Be Removed Later ###############################
  // { path: 'lplc/:luxury-projects-in-:locality-:cityname-:localityid', loadChildren: () => import('./locality-based-listing/locality-based-listing.module').then(m => m.LocalityBasedListingModule) },
  // ################################ Locality Based Listing New Routes ###############################
  // { path: 'lplc/:luxury-projects-in-:locality-:cityname-:localityid', loadChildren: () => import('./locality-based-listing-new/locality-based-listing-new.module').then(m => m.LocalityBasedListingNewModule) },


  // { path: 'lplc/:luxury-projects-in-:locality-:cityname-:localityid', loadChildren: () => import('./luxury-project/luxury-project.module').then(m => m.LuxuryProjectModule) },

  { path: ':cityname/sale/:proptypename-:proptypeid', loadChildren: () => import('./property-type/property-type.module').then(m => m.PropertyTypeModule) },

  // { path: ':cityname/:staticlocurl-:localityname-:localityid', loadChildren: () => import('./locality/locality.module').then(m => m.LocalityModule) },


  // ############################### Locality Based Listing Old Routes - To Be Removed Later ###############################
  // { path: ':cityname/:staticlocurl-:localityname-:localityid', loadChildren: () => import('./locality-based-listing/locality-based-listing.module').then(m => m.LocalityBasedListingModule) },
  // ############################### Locality Based Listing New Routes ###############################
  // { path: ':cityname/:staticlocurl-:localityname-:localityid', loadChildren: () => import('./locality-based-listing-new/locality-based-listing-new.module').then(m => m.LocalityBasedListingNewModule) },



  // ################################ Builder Old Routes - To Be Removed Later ###############################
  // { path: ':cityname/builder/:buildername-:builderid', loadChildren: () => import('./builder/builder.module').then(m => m.BuilderModule) },

  // ################################ Builder New Routes - To Be Used ###############################
  // { path: ':cityname/builder/:buildername-:builderid', loadChildren: () => import('./builder-new/builder-new.module').then(m => m.BuilderModuleNewComponent) },






  // { path: ':cityname/status/:statusname-:statusid', loadChildren: () => import('./propertystatus/propertystatus.module').then(m => m.StatusModule) },
  // { path: ':cityname/zone/:zonename-:zoneid', loadChildren: () => import('./propertyzone/propertyzone.module').then(m => m.ZoneModule) },


  // ############################### City Based Listing Old Routes - To Be Removed Later ############################### 
  // { path: ':cityname/status/:statusname-:statusid', loadChildren: () => import('./city-based-listing/city-based-listing.module').then(m => m.CityBasedListingModule) },
  // { path: ':cityname/zone/:zonename-:zoneid', loadChildren: () => import('./city-based-listing/city-based-listing.module').then(m => m.CityBasedListingModule) },
  // ############################### City Based Listing new Routes ###############################
  // { path: ':cityname/status/:statusname-:statusid', loadChildren: () => import('./city-based-listing-new/city-based-listing-new.module').then(m => m.CityBasedListingNewModule) },
  // { path: ':cityname/zone/:zonename-:zoneid', loadChildren: () => import('./city-based-listing-new/city-based-listing-new.module').then(m => m.CityBasedListingNewModule) },




  // ############################### WEBSITE MAIN LISTING PAGES ENDS ###############################

  // ############################### PRIORITY SEO FRIENDLY URLS COMBO FOR HIGH SEARCH VOLUME KEYWORDS STARTS ###############################

  // ############################### APARTMENTS WITH LOCALITY COMBO STARTS ###############################

  // { path: 'apartments-in-yeshwanthpur-bangalore', loadChildren: () => import('./proptype-with-locality/proptype-with-locality.module').then(m => m.ProptypeWithLocalityModule) },
  // { path: 'apartments-in-mysore-road-bangalore', loadChildren: () => import('./proptype-with-locality/proptype-with-locality.module').then(m => m.ProptypeWithLocalityModule) },
  // { path: 'apartments-in-kanakapura-road-bangalore', loadChildren: () => import('./proptype-with-locality/proptype-with-locality.module').then(m => m.ProptypeWithLocalityModule) },
  // { path: 'apartments-in-old-madras-road-bangalore', loadChildren: () => import('./proptype-with-locality/proptype-with-locality.module').then(m => m.ProptypeWithLocalityModule) },
  // { path: 'apartments-in-yelahanka-bangalore', loadChildren: () => import('./proptype-with-locality/proptype-with-locality.module').then(m => m.ProptypeWithLocalityModule) },
  // { path: 'apartments-in-jakkur-bangalore', loadChildren: () => import('./proptype-with-locality/proptype-with-locality.module').then(m => m.ProptypeWithLocalityModule) },
  // { path: 'apartments-in-electronic-city-phase-2-bangalore', loadChildren: () => import('./proptype-with-locality/proptype-with-locality.module').then(m => m.ProptypeWithLocalityModule) },
  // { path: 'apartments-in-electronic-city-phase-1-bangalore', loadChildren: () => import('./proptype-with-locality/proptype-with-locality.module').then(m => m.ProptypeWithLocalityModule) },
  // { path: 'apartments-in-thanisandra-bangalore', loadChildren: () => import('./proptype-with-locality/proptype-with-locality.module').then(m => m.ProptypeWithLocalityModule) },
  // { path: 'apartments-in-hennur-road-bangalore', loadChildren: () => import('./proptype-with-locality/proptype-with-locality.module').then(m => m.ProptypeWithLocalityModule) },
  // { path: 'apartments-in-haralur-road-bangalore', loadChildren: () => import('./proptype-with-locality/proptype-with-locality.module').then(m => m.ProptypeWithLocalityModule) },
  // { path: 'apartments-in-k-r-puram-bangalore', loadChildren: () => import('./proptype-with-locality/proptype-with-locality.module').then(m => m.ProptypeWithLocalityModule) },
  // { path: 'apartments-in-bellandur-bangalore', loadChildren: () => import('./proptype-with-locality/proptype-with-locality.module').then(m => m.ProptypeWithLocalityModule) },
  // { path: 'apartments-in-varthur-bangalore', loadChildren: () => import('./proptype-with-locality/proptype-with-locality.module').then(m => m.ProptypeWithLocalityModule) },
  // { path: 'apartments-in-koramangala-bangalore', loadChildren: () => import('./proptype-with-locality/proptype-with-locality.module').then(m => m.ProptypeWithLocalityModule) },
  // { path: 'apartments-in-mahadevapura-bangalore', loadChildren: () => import('./proptype-with-locality/proptype-with-locality.module').then(m => m.ProptypeWithLocalityModule) },
  // { path: 'apartments-in-marathahalli-bangalore', loadChildren: () => import('./proptype-with-locality/proptype-with-locality.module').then(m => m.ProptypeWithLocalityModule) },
  // { path: 'apartments-in-electronic-city-bangalore', loadChildren: () => import('./proptype-with-locality/proptype-with-locality.module').then(m => m.ProptypeWithLocalityModule) },
  // { path: 'apartments-in-whitefield-bangalore', loadChildren: () => import('./proptype-with-locality/proptype-with-locality.module').then(m => m.ProptypeWithLocalityModule) },
  // { path: 'apartments-in-sarjapur-road-bangalore', loadChildren: () => import('./proptype-with-locality/proptype-with-locality.module').then(m => m.ProptypeWithLocalityModule) },
  // { path: 'apartments-in-sarjapur-bangalore', loadChildren: () => import('./proptype-with-locality/proptype-with-locality.module').then(m => m.ProptypeWithLocalityModule) },
  // { path: 'apartments-in-bannerghatta-road-bangalore', loadChildren: () => import('./proptype-with-locality/proptype-with-locality.module').then(m => m.ProptypeWithLocalityModule) },

  // ############################### APARTMENTS WITH LOCALITY COMBO ENDS ###############################

  // ############################### VILLAS WITH LOCALITY COMBO STARTS ###############################

  // { path: 'villas-in-kanakapura-road-bangalore', loadChildren: () => import('./proptype-with-locality/proptype-with-locality.module').then(m => m.ProptypeWithLocalityModule) },
  // { path: 'villas-in-chandapura-bangalore', loadChildren: () => import('./proptype-with-locality/proptype-with-locality.module').then(m => m.ProptypeWithLocalityModule) },
  // { path: 'villas-in-yelahanka-bangalore', loadChildren: () => import('./proptype-with-locality/proptype-with-locality.module').then(m => m.ProptypeWithLocalityModule) },
  // { path: 'villas-in-budigere-cross-bangalore', loadChildren: () => import('./proptype-with-locality/proptype-with-locality.module').then(m => m.ProptypeWithLocalityModule) },
  // { path: 'villas-in-varthur-bangalore', loadChildren: () => import('./proptype-with-locality/proptype-with-locality.module').then(m => m.ProptypeWithLocalityModule) },
  // { path: 'villas-in-sarjapur-bangalore', loadChildren: () => import('./proptype-with-locality/proptype-with-locality.module').then(m => m.ProptypeWithLocalityModule) },
  // { path: 'villas-in-electronic-city-bangalore', loadChildren: () => import('./proptype-with-locality/proptype-with-locality.module').then(m => m.ProptypeWithLocalityModule) },
  // { path: 'villas-in-whitefield-bangalore', loadChildren: () => import('./proptype-with-locality/proptype-with-locality.module').then(m => m.ProptypeWithLocalityModule) },
  // { path: 'villas-in-sarjapur-road-bangalore', loadChildren: () => import('./proptype-with-locality/proptype-with-locality.module').then(m => m.ProptypeWithLocalityModule) },
  // { path: 'villas-in-marathahalli-bangalore', loadChildren: () => import('./proptype-with-locality/proptype-with-locality.module').then(m => m.ProptypeWithLocalityModule) },
  // { path: 'villas-in-bannerghatta-road-bangalore', loadChildren: () => import('./proptype-with-locality/proptype-with-locality.module').then(m => m.ProptypeWithLocalityModule) },

  // ############################### VILLAS WITH LOCALITY COMBO ENDS ###############################

  // ############################### PLOTS WITH LOCALITY COMBO ENDS ###############################

  // { path: 'plots-in-sarjapur-road-bangalore', loadChildren: () => import('./proptype-with-locality/proptype-with-locality.module').then(m => m.ProptypeWithLocalityModule) },
  // { path: 'plots-in-electronic-city-bangalore', loadChildren: () => import('./proptype-with-locality/proptype-with-locality.module').then(m => m.ProptypeWithLocalityModule) },
  // { path: 'plots-in-kanakapura-road-bangalore', loadChildren: () => import('./proptype-with-locality/proptype-with-locality.module').then(m => m.ProptypeWithLocalityModule) },
  // { path: 'plots-for-sale-in-yelahanka-bangalore', loadChildren: () => import('./proptype-with-locality/proptype-with-locality.module').then(m => m.ProptypeWithLocalityModule) },
  // { path: 'plots-for-sale-in-whitefield-bangalore', loadChildren: () => import('./proptype-with-locality/proptype-with-locality.module').then(m => m.ProptypeWithLocalityModule) },
  // { path: 'plots-for-sale-in-varthur-bangalore', loadChildren: () => import('./proptype-with-locality/proptype-with-locality.module').then(m => m.ProptypeWithLocalityModule) },

  // ############################### PLOTS WITH LOCALITY COMBO ENDS ###############################

  // ############################### PROPERTY STATUS WITH CITY STARTS ###############################

  { path: 'ready-to-move-flats-in-bangalore', loadChildren: () => import('./proptype-with-status/proptype-with-status.module').then(m => m.ProptypeWithStatusModule) },
  { path: 'under-construction-projects-in-bangalore', loadChildren: () => import('./proptype-with-status/proptype-with-status.module').then(m => m.ProptypeWithStatusModule) },
  { path: 'upcoming-projects-in-bangalore', loadChildren: () => import('./proptype-with-status/proptype-with-status.module').then(m => m.ProptypeWithStatusModule) },

  // ############################### PROPERTY STATUS WITH CITY ENDS ###############################

  // ############################### City Based Listing Old Routes - To Be Removed Later ############################### 
  // { path: ':residential-flats-in-:cityname-for-sale', loadChildren: () => import('./city-based-listing/city-based-listing.module').then(m => m.CityBasedListingModule) },.
  // ############################### City Based Listing new Routes ###############################
  // { path: ':residential-flats-in-:cityname-for-sale', loadChildren: () => import('./city-based-listing-new/city-based-listing-new.module').then(m => m.CityBasedListingNewModule) },

  // ############################### PRIORITY SEO FRIENDLY URLS COMBO FOR HIGH SEARCH VOLUME KEYWORDS ENDS ###############################


  // { path: '', loadChildren: () => import('./all-india/all-india.module').then(m => m.AllIndiaModule) },

  { path: '**', loadChildren: () => import('./not-found/not-found.module').then(m => m.NotFoundModule) },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { initialNavigation: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
