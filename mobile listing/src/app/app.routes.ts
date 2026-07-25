import { Routes } from '@angular/router';

export const routes: Routes = [

    {
        path: 'new-about-us', loadComponent: () => import('./new-about-us/new-about-us').then((m) => m.NewAboutUs)
    },


    // -----------------------------commercial lsiting-------------------------------
    {
        path: 'property-for-rent-in-bangalore', loadComponent: () => import('./rental-home/rental-home').then((m) => m.RentalHome)
    },
    { path: 'property-for-rent-in-hyderabad', loadComponent: () => import('./rental-home/rental-home').then((m) => m.RentalHome) },
    { path: 'property-for-rent-in-chennai', loadComponent: () => import('./rental-home/rental-home').then((m) => m.RentalHome) },
    { path: 'property-for-rent-in-kochi', loadComponent: () => import('./rental-home/rental-home').then((m) => m.RentalHome) },
    { path: 'property-for-rent-in-pune', loadComponent: () => import('./rental-home/rental-home').then((m) => m.RentalHome) },
    { path: 'property-for-rent-in-delhi', loadComponent: () => import('./rental-home/rental-home').then((m) => m.RentalHome) },
    { path: 'property-for-rent-in-kolkata', loadComponent: () => import('./rental-home/rental-home').then((m) => m.RentalHome) },
    { path: 'property-for-rent-in-mumbai', loadComponent: () => import('./rental-home/rental-home').then((m) => m.RentalHome) },
    { path: 'property-for-rent-in-goa', loadComponent: () => import('./rental-home/rental-home').then((m) => m.RentalHome) },
    { path: 'property-for-rent-in-gurgaon', loadComponent: () => import('./rental-home/rental-home').then((m) => m.RentalHome) },
    { path: 'property-for-rent-in-mysore', loadComponent: () => import('./rental-home/rental-home').then((m) => m.RentalHome) },
    { path: 'property-for-rent-in-coimbatore', loadComponent: () => import('./rental-home/rental-home').then((m) => m.RentalHome) },
    { path: 'property-for-rent-in-ahmedabad', loadComponent: () => import('./rental-home/rental-home').then((m) => m.RentalHome) },
    { path: 'property-for-rent-in-trivandrum', loadComponent: () => import('./rental-home/rental-home').then((m) => m.RentalHome) },
    { path: 'property-for-rent-in-navi-mumbai', loadComponent: () => import('./rental-home/rental-home').then((m) => m.RentalHome) },
    { path: 'property-for-rent-in-noida', loadComponent: () => import('./rental-home/rental-home').then((m) => m.RentalHome) },
    { path: 'property-for-rent-in-greater-noida', loadComponent: () => import('./rental-home/rental-home').then((m) => m.RentalHome) },
    { path: 'property-for-rent-in-bhubaneshwar', loadComponent: () => import('./rental-home/rental-home').then((m) => m.RentalHome) },
    { path: 'property-for-rent-in-vijayawada', loadComponent: () => import('./rental-home/rental-home').then((m) => m.RentalHome) },
    { path: 'property-for-rent-in-bhopal', loadComponent: () => import('./rental-home/rental-home').then((m) => m.RentalHome) },
    { path: 'property-for-rent-in-indore', loadComponent: () => import('./rental-home/rental-home').then((m) => m.RentalHome) },
    { path: 'property-for-rent-in-vizag', loadComponent: () => import('./rental-home/rental-home').then((m) => m.RentalHome) },
    { path: 'property-for-rent-in-amaravati', loadComponent: () => import('./rental-home/rental-home').then((m) => m.RentalHome) },
    { path: 'property-for-rent-in-thrissur', loadComponent: () => import('./rental-home/rental-home').then((m) => m.RentalHome) },
    { path: 'property-for-rent-in-tirupati', loadComponent: () => import('./rental-home/rental-home').then((m) => m.RentalHome) },
    { path: 'property-for-rent-in-lucknow', loadComponent: () => import('./rental-home/rental-home').then((m) => m.RentalHome) },
    { path: 'property-for-rent-in-nashik', loadComponent: () => import('./rental-home/rental-home').then((m) => m.RentalHome) },
    { path: 'property-for-rent-in-mangalore', loadComponent: () => import('./rental-home/rental-home').then((m) => m.RentalHome) },
    { path: 'property-for-rent-in-nagpur', loadComponent: () => import('./rental-home/rental-home').then((m) => m.RentalHome) },
    { path: 'property-for-rent-in-jaipur', loadComponent: () => import('./rental-home/rental-home').then((m) => m.RentalHome) },
    { path: 'property-for-rent-in-nellore', loadComponent: () => import('./rental-home/rental-home').then((m) => m.RentalHome) },
    { path: 'property-for-rent-in-faridabad', loadComponent: () => import('./rental-home/rental-home').then((m) => m.RentalHome) },
    { path: 'property-for-rent-in-chandigarh', loadComponent: () => import('./rental-home/rental-home').then((m) => m.RentalHome) },
    { path: 'property-for-rent-in-dehradun', loadComponent: () => import('./rental-home/rental-home').then((m) => m.RentalHome) },
    { path: 'property-for-rent-in-ghaziabad', loadComponent: () => import('./rental-home/rental-home').then((m) => m.RentalHome) },
    { path: 'property-for-rent-in-ranchi', loadComponent: () => import('./rental-home/rental-home').then((m) => m.RentalHome) },
    { path: 'property-for-rent-in-agra', loadComponent: () => import('./rental-home/rental-home').then((m) => m.RentalHome) },
    { path: 'property-for-rent-in-durgapur', loadComponent: () => import('./rental-home/rental-home').then((m) => m.RentalHome) },
    { path: 'property-for-rent-in-vizianagaram', loadComponent: () => import('./rental-home/rental-home').then((m) => m.RentalHome) },
    { path: 'property-for-rent-in-patna', loadComponent: () => import('./rental-home/rental-home').then((m) => m.RentalHome) },
    { path: 'property-for-rent-in-surat', loadComponent: () => import('./rental-home/rental-home').then((m) => m.RentalHome) },
    { path: 'property-for-rent-in-guntur', loadComponent: () => import('./rental-home/rental-home').then((m) => m.RentalHome) },
    { path: 'property-for-rent-in-amritsar', loadComponent: () => import('./rental-home/rental-home').then((m) => m.RentalHome) },
    { path: 'property-for-rent-in-aurangabad', loadComponent: () => import('./rental-home/rental-home').then((m) => m.RentalHome) },
    { path: 'property-for-rent-in-guwahati', loadComponent: () => import('./rental-home/rental-home').then((m) => m.RentalHome) },
    { path: 'property-for-rent-in-ludhiana', loadComponent: () => import('./rental-home/rental-home').then((m) => m.RentalHome) },
    { path: 'property-for-rent-in-dharwad', loadComponent: () => import('./rental-home/rental-home').then((m) => m.RentalHome) },
    { path: 'property-for-rent-in-kolhapur', loadComponent: () => import('./rental-home/rental-home').then((m) => m.RentalHome) },
    { path: 'property-for-rent-in-mohali', loadComponent: () => import('./rental-home/rental-home').then((m) => m.RentalHome) },
    { path: 'property-for-rent-in-kanpur', loadComponent: () => import('./rental-home/rental-home').then((m) => m.RentalHome) },
    { path: 'property-for-rent-in-thane', loadComponent: () => import('./rental-home/rental-home').then((m) => m.RentalHome) },
    { path: 'property-for-rent-in-jamshedpur', loadComponent: () => import('./rental-home/rental-home').then((m) => m.RentalHome) },
    { path: 'property-for-rent-in-belgaum', loadComponent: () => import('./rental-home/rental-home').then((m) => m.RentalHome) },
    { path: 'property-for-rent-in-puri', loadComponent: () => import('./rental-home/rental-home').then((m) => m.RentalHome) },
    { path: 'property-for-rent-in-meerut', loadComponent: () => import('./rental-home/rental-home').then((m) => m.RentalHome) },
    { path: 'property-for-rent-in-tiruvannamalai', loadComponent: () => import('./rental-home/rental-home').then((m) => m.RentalHome) },
    { path: 'property-for-rent-in-satara', loadComponent: () => import('./rental-home/rental-home').then((m) => m.RentalHome) },
    { path: 'property-for-rent-in-junagadh', loadComponent: () => import('./rental-home/rental-home').then((m) => m.RentalHome) },
    { path: 'property-for-rent-in-vadodara', loadComponent: () => import('./rental-home/rental-home').then((m) => m.RentalHome) },
    { path: 'property-for-rent-in-palwal', loadComponent: () => import('./rental-home/rental-home').then((m) => m.RentalHome) },
    { path: 'property-for-rent-in-panchkula', loadComponent: () => import('./rental-home/rental-home').then((m) => m.RentalHome) },
    { path: 'property-for-rent-in-panipat', loadComponent: () => import('./rental-home/rental-home').then((m) => m.RentalHome) },
    { path: 'property-for-rent-in-calicut', loadComponent: () => import('./rental-home/rental-home').then((m) => m.RentalHome) },
    { path: 'property-for-rent-in-pathanamthitta', loadComponent: () => import('./rental-home/rental-home').then((m) => m.RentalHome) },
    { path: 'property-for-rent-in-haridwar', loadComponent: () => import('./rental-home/rental-home').then((m) => m.RentalHome) },
    { path: 'property-for-rent-in-solan', loadComponent: () => import('./rental-home/rental-home').then((m) => m.RentalHome) },
    { path: 'property-for-rent-in-burhanpur', loadComponent: () => import('./rental-home/rental-home').then((m) => m.RentalHome) },
    { path: 'property-for-rent-in-raipur', loadComponent: () => import('./rental-home/rental-home').then((m) => m.RentalHome) },
    { path: 'property-for-rent-in-kanchipuram', loadComponent: () => import('./rental-home/rental-home').then((m) => m.RentalHome) },
    { path: 'property-for-rent-in-pondicherry', loadComponent: () => import('./rental-home/rental-home').then((m) => m.RentalHome) },
    { path: 'property-for-rent-in-siliguri', loadComponent: () => import('./rental-home/rental-home').then((m) => m.RentalHome) },
    { path: 'property-for-rent-in-gandhinagar', loadComponent: () => import('./rental-home/rental-home').then((m) => m.RentalHome) },
    { path: 'property-for-rent-in-ajmer', loadComponent: () => import('./rental-home/rental-home').then((m) => m.RentalHome) },
    { path: 'property-for-rent-in-varanasi', loadComponent: () => import('./rental-home/rental-home').then((m) => m.RentalHome) },
    { path: 'property-for-rent-in-mathura', loadComponent: () => import('./rental-home/rental-home').then((m) => m.RentalHome) },
    { path: 'property-for-rent-in-dindigul', loadComponent: () => import('./rental-home/rental-home').then((m) => m.RentalHome) },
    { path: 'property-for-rent-in-rewari', loadComponent: () => import('./rental-home/rental-home').then((m) => m.RentalHome) },
    { path: 'property-for-rent-in-solapur', loadComponent: () => import('./rental-home/rental-home').then((m) => m.RentalHome) },
    { path: 'property-for-rent-in-ratnagiri', loadComponent: () => import('./rental-home/rental-home').then((m) => m.RentalHome) },
    { path: 'property-for-rent-in-shantiniketan', loadComponent: () => import('./rental-home/rental-home').then((m) => m.RentalHome) },
    { path: 'property-for-rent-in-rishikesh', loadComponent: () => import('./rental-home/rental-home').then((m) => m.RentalHome) },
    { path: 'property-for-rent-in-rajkor', loadComponent: () => import('./rental-home/rental-home').then((m) => m.RentalHome) },
    { path: 'property-for-rent-in-hapur', loadComponent: () => import('./rental-home/rental-home').then((m) => m.RentalHome) },
    { path: 'property-for-rent-in-chamarajnagar', loadComponent: () => import('./rental-home/rental-home').then((m) => m.RentalHome) },
    { path: 'property-for-rent-in-gulbarga', loadComponent: () => import('./rental-home/rental-home').then((m) => m.RentalHome) },
    { path: 'property-for-rent-in-alwar', loadComponent: () => import('./rental-home/rental-home').then((m) => m.RentalHome) },
    { path: 'property-for-rent-in-tirunelveli', loadComponent: () => import('./rental-home/rental-home').then((m) => m.RentalHome) },
    { path: 'property-for-rent-in-raigad', loadComponent: () => import('./rental-home/rental-home').then((m) => m.RentalHome) },
    { path: 'property-for-rent-in-rajkot', loadComponent: () => import('./rental-home/rental-home').then((m) => m.RentalHome) },
    { path: 'property-for-rent-in-purba-medinipur', loadComponent: () => import('./rental-home/rental-home').then((m) => m.RentalHome) },
    { path: 'property-for-rent-in-chamarajanagar', loadComponent: () => import('./rental-home/rental-home').then((m) => m.RentalHome) },
    { path: 'property-for-rent-in-sangli', loadComponent: () => import('./rental-home/rental-home').then((m) => m.RentalHome) },
    { path: 'property-for-rent-in-ayodhya', loadComponent: () => import('./rental-home/rental-home').then((m) => m.RentalHome) },
    { path: 'property-for-rent-in-bhiwadi', loadComponent: () => import('./rental-home/rental-home').then((m) => m.RentalHome) },
    { path: 'property-for-rent-in-kottayam', loadComponent: () => import('./rental-home/rental-home').then((m) => m.RentalHome) },
    { path: 'property-for-rent-in-kannur', loadComponent: () => import('./rental-home/rental-home').then((m) => m.RentalHome) },
    { path: 'property-for-rent-in-neemrana', loadComponent: () => import('./rental-home/rental-home').then((m) => m.RentalHome) },
    { path: 'property-for-rent-in-thanjavur', loadComponent: () => import('./rental-home/rental-home').then((m) => m.RentalHome) },
    { path: 'property-for-rent-in-kota', loadComponent: () => import('./rental-home/rental-home').then((m) => m.RentalHome) },
    { path: 'property-for-rent-in-bilaspur', loadComponent: () => import('./rental-home/rental-home').then((m) => m.RentalHome) },
    { path: 'property-for-rent-in-navsari', loadComponent: () => import('./rental-home/rental-home').then((m) => m.RentalHome) },
    { path: 'property-for-rent-in-davanegere', loadComponent: () => import('./rental-home/rental-home').then((m) => m.RentalHome) },
    { path: 'property-for-rent-in-jabalpur', loadComponent: () => import('./rental-home/rental-home').then((m) => m.RentalHome) },
    { path: 'property-for-rent-in-gwalior', loadComponent: () => import('./rental-home/rental-home').then((m) => m.RentalHome) },
    { path: 'property-for-rent-in-ujjain', loadComponent: () => import('./rental-home/rental-home').then((m) => m.RentalHome) },
    { path: 'property-for-rent-in-salem', loadComponent: () => import('./rental-home/rental-home').then((m) => m.RentalHome) },
    { path: 'property-for-rent-in-erode', loadComponent: () => import('./rental-home/rental-home').then((m) => m.RentalHome) },
    { path: 'property-for-rent-in-thoothukudi', loadComponent: () => import('./rental-home/rental-home').then((m) => m.RentalHome) },
    { path: 'property-for-rent-in-bareilly', loadComponent: () => import('./rental-home/rental-home').then((m) => m.RentalHome) },
    { path: 'property-for-rent-in-jhansi', loadComponent: () => import('./rental-home/rental-home').then((m) => m.RentalHome) },
    { path: 'property-for-rent-in-tiruchirappalli', loadComponent: () => import('./rental-home/rental-home').then((m) => m.RentalHome) },
    { path: 'property-for-rent-in-hosur', loadComponent: () => import('./rental-home/rental-home').then((m) => m.RentalHome) },
    { path: 'property-for-rent-in-madurai', loadComponent: () => import('./rental-home/rental-home').then((m) => m.RentalHome) },
    { path: 'property-for-rent-in-namakkal', loadComponent: () => import('./rental-home/rental-home').then((m) => m.RentalHome) },
    { path: 'property-for-rent-in-tiruppur', loadComponent: () => import('./rental-home/rental-home').then((m) => m.RentalHome) },
    { path: 'property-for-rent-in-vellore', loadComponent: () => import('./rental-home/rental-home').then((m) => m.RentalHome) },
    { path: 'property-for-rent-in-viluppuram', loadComponent: () => import('./rental-home/rental-home').then((m) => m.RentalHome) },
    { path: 'property-for-rent-in-koonimedu', loadComponent: () => import('./rental-home/rental-home').then((m) => m.RentalHome) },
    { path: 'property-for-rent-in-theni', loadComponent: () => import('./rental-home/rental-home').then((m) => m.RentalHome) },
    { path: 'property-for-rent-in-kotagiri', loadComponent: () => import('./rental-home/rental-home').then((m) => m.RentalHome) },
    { path: 'property-for-rent-in-krishnagri', loadComponent: () => import('./rental-home/rental-home').then((m) => m.RentalHome) },



    {
        path: 'cml/:commercial-properties-for-sale_rent-in-:localityname-:cityname-:localityid', loadComponent: () => import('./commercial-locality/commercial-locality').then((m) => m.CommercialLocality),
    },

    {
        path: 'pgcl/:pg-for-rent-in-:cityname', loadComponent: () => import('./pg-listing/pg-listing').then((m) => m.PgListing),
    },
    {
        path: 'cll/:commercial-properties-for-sale_rent-in-:cityname', loadComponent: () => import('./commercial-lisiting/commercial-lisiting').then((m) => m.CommercialLisiting),
    },

    {
        path: 'pgll/:pg-for-rent-in-:localityname:-cityname-:id', loadComponent: () => import('./pg-locality/pg-locality').then((m) => m.PgLocality),
    },

    {
        path: 'commercial', loadComponent: () => import('./commercial-home/commercial-home').then((m) => m.CommercialHome),
    },
    {
        path: 'clh/:commercial-properties-in-:cityname', loadComponent: () => import('./commercial-home/commercial-home').then((m) => m.CommercialHome),
    },

    {
        path: 'pg-home', loadComponent: () => import('./pg-home/pg-home').then((m) => m.PgHomeComponent),
    },
    {
        path: 'pg-home/:pg-properties-in-:cityname', loadComponent: () => import('./pg-home/pg-home').then((m) => m.PgHomeComponent),
    },
    {
        path: '404', loadComponent: () => import('./not-found/not-found').then((m) => m.NotFoundComponent),
    },

    // --------------------------individual listing-------------------

    { path: 'projects-in-bangalore', loadComponent: () => import('./individual-city-listing/individual-city-listing').then(m => m.IndividualCityListing) },
    { path: 'projects-in-hyderabad', loadComponent: () => import('./individual-city-listing/individual-city-listing').then(m => m.IndividualCityListing) },
    { path: 'projects-in-chennai', loadComponent: () => import('./individual-city-listing/individual-city-listing').then(m => m.IndividualCityListing) },
    { path: 'projects-in-kochi', loadComponent: () => import('./individual-city-listing/individual-city-listing').then(m => m.IndividualCityListing) },
    { path: 'projects-in-pune', loadComponent: () => import('./individual-city-listing/individual-city-listing').then(m => m.IndividualCityListing) },
    { path: 'projects-in-mumbai', loadComponent: () => import('./individual-city-listing/individual-city-listing').then(m => m.IndividualCityListing) },
    { path: 'projects-in-delhi', loadComponent: () => import('./individual-city-listing/individual-city-listing').then(m => m.IndividualCityListing) },
    { path: 'projects-in-kolkata', loadComponent: () => import('./individual-city-listing/individual-city-listing').then(m => m.IndividualCityListing) },
    { path: 'projects-in-goa', loadComponent: () => import('./individual-city-listing/individual-city-listing').then(m => m.IndividualCityListing) },
    { path: 'projects-in-gurgaon', loadComponent: () => import('./individual-city-listing/individual-city-listing').then(m => m.IndividualCityListing) },
    { path: 'projects-in-mysore', loadComponent: () => import('./individual-city-listing/individual-city-listing').then(m => m.IndividualCityListing) },
    { path: 'projects-in-coimbatore', loadComponent: () => import('./individual-city-listing/individual-city-listing').then(m => m.IndividualCityListing) },
    { path: 'projects-in-ahmedabad', loadComponent: () => import('./individual-city-listing/individual-city-listing').then(m => m.IndividualCityListing) },
    { path: 'projects-in-trivandrum', loadComponent: () => import('./individual-city-listing/individual-city-listing').then(m => m.IndividualCityListing) },
    { path: 'projects-in-navi-mumbai', loadComponent: () => import('./individual-city-listing/individual-city-listing').then(m => m.IndividualCityListing) },
    { path: 'projects-in-noida', loadComponent: () => import('./individual-city-listing/individual-city-listing').then(m => m.IndividualCityListing) },
    { path: 'projects-in-greater-noida', loadComponent: () => import('./individual-city-listing/individual-city-listing').then(m => m.IndividualCityListing) },
    { path: 'projects-in-bhubaneshwar', loadComponent: () => import('./individual-city-listing/individual-city-listing').then(m => m.IndividualCityListing) },
    { path: 'projects-in-vijayawada', loadComponent: () => import('./individual-city-listing/individual-city-listing').then(m => m.IndividualCityListing) },
    { path: 'projects-in-bhopal', loadComponent: () => import('./individual-city-listing/individual-city-listing').then(m => m.IndividualCityListing) },
    { path: 'projects-in-indore', loadComponent: () => import('./individual-city-listing/individual-city-listing').then(m => m.IndividualCityListing) },
    { path: 'projects-in-vizag', loadComponent: () => import('./individual-city-listing/individual-city-listing').then(m => m.IndividualCityListing) },
    { path: 'projects-in-amaravati', loadComponent: () => import('./individual-city-listing/individual-city-listing').then(m => m.IndividualCityListing) },
    { path: 'projects-in-thrissur', loadComponent: () => import('./individual-city-listing/individual-city-listing').then(m => m.IndividualCityListing) },
    { path: 'projects-in-tirupati', loadComponent: () => import('./individual-city-listing/individual-city-listing').then(m => m.IndividualCityListing) },
    { path: 'projects-in-lucknow', loadComponent: () => import('./individual-city-listing/individual-city-listing').then(m => m.IndividualCityListing) },
    { path: 'projects-in-nashik', loadComponent: () => import('./individual-city-listing/individual-city-listing').then(m => m.IndividualCityListing) },
    { path: 'projects-in-mangalore', loadComponent: () => import('./individual-city-listing/individual-city-listing').then(m => m.IndividualCityListing) },
    { path: 'projects-in-nagpur', loadComponent: () => import('./individual-city-listing/individual-city-listing').then(m => m.IndividualCityListing) },
    { path: 'projects-in-jaipur', loadComponent: () => import('./individual-city-listing/individual-city-listing').then(m => m.IndividualCityListing) },
    { path: 'projects-in-nellore', loadComponent: () => import('./individual-city-listing/individual-city-listing').then(m => m.IndividualCityListing) },
    { path: 'projects-in-faridabad', loadComponent: () => import('./individual-city-listing/individual-city-listing').then(m => m.IndividualCityListing) },
    { path: 'projects-in-chandigarh', loadComponent: () => import('./individual-city-listing/individual-city-listing').then(m => m.IndividualCityListing) },
    { path: 'projects-in-dehradun', loadComponent: () => import('./individual-city-listing/individual-city-listing').then(m => m.IndividualCityListing) },
    { path: 'projects-in-ghaziabad', loadComponent: () => import('./individual-city-listing/individual-city-listing').then(m => m.IndividualCityListing) },
    { path: 'projects-in-ranchi', loadComponent: () => import('./individual-city-listing/individual-city-listing').then(m => m.IndividualCityListing) },
    { path: 'projects-in-agra', loadComponent: () => import('./individual-city-listing/individual-city-listing').then(m => m.IndividualCityListing) },
    { path: 'projects-in-durgapur', loadComponent: () => import('./individual-city-listing/individual-city-listing').then(m => m.IndividualCityListing) },
    { path: 'projects-in-vizianagaram', loadComponent: () => import('./individual-city-listing/individual-city-listing').then(m => m.IndividualCityListing) },
    { path: 'projects-in-amritsar', loadComponent: () => import('./individual-city-listing/individual-city-listing').then(m => m.IndividualCityListing) },
    { path: 'projects-in-patna', loadComponent: () => import('./individual-city-listing/individual-city-listing').then(m => m.IndividualCityListing) },
    { path: 'projects-in-surat', loadComponent: () => import('./individual-city-listing/individual-city-listing').then(m => m.IndividualCityListing) },
    { path: 'projects-in-guntur', loadComponent: () => import('./individual-city-listing/individual-city-listing').then(m => m.IndividualCityListing) },
    { path: 'projects-in-aurangabad', loadComponent: () => import('./individual-city-listing/individual-city-listing').then(m => m.IndividualCityListing) },
    { path: 'projects-in-guwahati', loadComponent: () => import('./individual-city-listing/individual-city-listing').then(m => m.IndividualCityListing) },
    { path: 'projects-in-ludhiana', loadComponent: () => import('./individual-city-listing/individual-city-listing').then(m => m.IndividualCityListing) },
    { path: 'projects-in-dharwad', loadComponent: () => import('./individual-city-listing/individual-city-listing').then(m => m.IndividualCityListing) },
    { path: 'projects-in-kolhapur', loadComponent: () => import('./individual-city-listing/individual-city-listing').then(m => m.IndividualCityListing) },
    { path: 'projects-in-mohali', loadComponent: () => import('./individual-city-listing/individual-city-listing').then(m => m.IndividualCityListing) },
    { path: 'projects-in-kanpur', loadComponent: () => import('./individual-city-listing/individual-city-listing').then(m => m.IndividualCityListing) },
    { path: 'projects-in-thane', loadComponent: () => import('./individual-city-listing/individual-city-listing').then(m => m.IndividualCityListing) },
    { path: 'projects-in-jamshedpur', loadComponent: () => import('./individual-city-listing/individual-city-listing').then(m => m.IndividualCityListing) },
    { path: 'projects-in-belgaum', loadComponent: () => import('./individual-city-listing/individual-city-listing').then(m => m.IndividualCityListing) },
    { path: 'projects-in-puri', loadComponent: () => import('./individual-city-listing/individual-city-listing').then(m => m.IndividualCityListing) },
    { path: 'projects-in-meerut', loadComponent: () => import('./individual-city-listing/individual-city-listing').then(m => m.IndividualCityListing) },
    { path: 'projects-in-tiruvannamalai', loadComponent: () => import('./individual-city-listing/individual-city-listing').then(m => m.IndividualCityListing) },
    { path: 'projects-in-satara', loadComponent: () => import('./individual-city-listing/individual-city-listing').then(m => m.IndividualCityListing) },
    { path: 'projects-in-junagadh', loadComponent: () => import('./individual-city-listing/individual-city-listing').then(m => m.IndividualCityListing) },
    { path: 'projects-in-vadodara', loadComponent: () => import('./individual-city-listing/individual-city-listing').then(m => m.IndividualCityListing) },
    { path: 'projects-in-palwal', loadComponent: () => import('./individual-city-listing/individual-city-listing').then(m => m.IndividualCityListing) },
    { path: 'projects-in-panchkula', loadComponent: () => import('./individual-city-listing/individual-city-listing').then(m => m.IndividualCityListing) },
    { path: 'projects-in-panipat', loadComponent: () => import('./individual-city-listing/individual-city-listing').then(m => m.IndividualCityListing) },
    { path: 'projects-in-calicut', loadComponent: () => import('./individual-city-listing/individual-city-listing').then(m => m.IndividualCityListing) },
    { path: 'projects-in-pathanamthitta', loadComponent: () => import('./individual-city-listing/individual-city-listing').then(m => m.IndividualCityListing) },
    { path: 'projects-in-haridwar', loadComponent: () => import('./individual-city-listing/individual-city-listing').then(m => m.IndividualCityListing) },
    { path: 'projects-in-solan', loadComponent: () => import('./individual-city-listing/individual-city-listing').then(m => m.IndividualCityListing) },
    { path: 'projects-in-burhanpur', loadComponent: () => import('./individual-city-listing/individual-city-listing').then(m => m.IndividualCityListing) },
    { path: 'projects-in-raipur', loadComponent: () => import('./individual-city-listing/individual-city-listing').then(m => m.IndividualCityListing) },
    { path: 'projects-in-kanchipuram', loadComponent: () => import('./individual-city-listing/individual-city-listing').then(m => m.IndividualCityListing) },
    { path: 'projects-in-pondicherry', loadComponent: () => import('./individual-city-listing/individual-city-listing').then(m => m.IndividualCityListing) },
    { path: 'projects-in-siliguri', loadComponent: () => import('./individual-city-listing/individual-city-listing').then(m => m.IndividualCityListing) },
    { path: 'projects-in-gandhinagar', loadComponent: () => import('./individual-city-listing/individual-city-listing').then(m => m.IndividualCityListing) },
    { path: 'projects-in-ajmer', loadComponent: () => import('./individual-city-listing/individual-city-listing').then(m => m.IndividualCityListing) },
    { path: 'projects-in-varanasi', loadComponent: () => import('./individual-city-listing/individual-city-listing').then(m => m.IndividualCityListing) },
    { path: 'projects-in-mathura', loadComponent: () => import('./individual-city-listing/individual-city-listing').then(m => m.IndividualCityListing) },
    { path: 'projects-in-dindigul', loadComponent: () => import('./individual-city-listing/individual-city-listing').then(m => m.IndividualCityListing) },
    { path: 'projects-in-rewari', loadComponent: () => import('./individual-city-listing/individual-city-listing').then(m => m.IndividualCityListing) },
    { path: 'projects-in-solapur', loadComponent: () => import('./individual-city-listing/individual-city-listing').then(m => m.IndividualCityListing) },
    { path: 'projects-in-ratnagiri', loadComponent: () => import('./individual-city-listing/individual-city-listing').then(m => m.IndividualCityListing) },
    { path: 'projects-in-shantiniketan', loadComponent: () => import('./individual-city-listing/individual-city-listing').then(m => m.IndividualCityListing) },
    { path: 'projects-in-rishikesh', loadComponent: () => import('./individual-city-listing/individual-city-listing').then(m => m.IndividualCityListing) },
    { path: 'projects-in-rajkor', loadComponent: () => import('./individual-city-listing/individual-city-listing').then(m => m.IndividualCityListing) },
    { path: 'projects-in-hapur', loadComponent: () => import('./individual-city-listing/individual-city-listing').then(m => m.IndividualCityListing) },
    { path: 'projects-in-chamarajnagar', loadComponent: () => import('./individual-city-listing/individual-city-listing').then(m => m.IndividualCityListing) },
    { path: 'projects-in-gulbarga', loadComponent: () => import('./individual-city-listing/individual-city-listing').then(m => m.IndividualCityListing) },
    { path: 'projects-in-alwar', loadComponent: () => import('./individual-city-listing/individual-city-listing').then(m => m.IndividualCityListing) },
    { path: 'projects-in-tirunelveli', loadComponent: () => import('./individual-city-listing/individual-city-listing').then(m => m.IndividualCityListing) },
    { path: 'projects-in-raigad', loadComponent: () => import('./individual-city-listing/individual-city-listing').then(m => m.IndividualCityListing) },
    { path: 'projects-in-rajkot', loadComponent: () => import('./individual-city-listing/individual-city-listing').then(m => m.IndividualCityListing) },
    { path: 'projects-in-purba-medinipur', loadComponent: () => import('./individual-city-listing/individual-city-listing').then(m => m.IndividualCityListing) },
    { path: 'projects-in-chamarajanagar', loadComponent: () => import('./individual-city-listing/individual-city-listing').then(m => m.IndividualCityListing) },
    { path: 'projects-in-sangli', loadComponent: () => import('./individual-city-listing/individual-city-listing').then(m => m.IndividualCityListing) },
    { path: 'projects-in-ayodhya', loadComponent: () => import('./individual-city-listing/individual-city-listing').then(m => m.IndividualCityListing) },
    { path: 'projects-in-bhiwadi', loadComponent: () => import('./individual-city-listing/individual-city-listing').then(m => m.IndividualCityListing) },
    { path: 'projects-in-kottayam', loadComponent: () => import('./individual-city-listing/individual-city-listing').then(m => m.IndividualCityListing) },
    { path: 'projects-in-kannur', loadComponent: () => import('./individual-city-listing/individual-city-listing').then(m => m.IndividualCityListing) },
    { path: 'projects-in-neemrana', loadComponent: () => import('./individual-city-listing/individual-city-listing').then(m => m.IndividualCityListing) },
    { path: 'projects-in-thanjavur', loadComponent: () => import('./individual-city-listing/individual-city-listing').then(m => m.IndividualCityListing) },
    { path: 'projects-in-kota', loadComponent: () => import('./individual-city-listing/individual-city-listing').then(m => m.IndividualCityListing) },
    { path: 'projects-in-bilaspur', loadComponent: () => import('./individual-city-listing/individual-city-listing').then(m => m.IndividualCityListing) },
    { path: 'projects-in-navsari', loadComponent: () => import('./individual-city-listing/individual-city-listing').then(m => m.IndividualCityListing) },
    { path: 'projects-in-davanegere', loadComponent: () => import('./individual-city-listing/individual-city-listing').then(m => m.IndividualCityListing) },
    { path: 'projects-in-jabalpur', loadComponent: () => import('./individual-city-listing/individual-city-listing').then(m => m.IndividualCityListing) },
    { path: 'projects-in-gwalior', loadComponent: () => import('./individual-city-listing/individual-city-listing').then(m => m.IndividualCityListing) },
    { path: 'projects-in-ujjain', loadComponent: () => import('./individual-city-listing/individual-city-listing').then(m => m.IndividualCityListing) },
    { path: 'projects-in-salem', loadComponent: () => import('./individual-city-listing/individual-city-listing').then(m => m.IndividualCityListing) },
    { path: 'projects-in-erode', loadComponent: () => import('./individual-city-listing/individual-city-listing').then(m => m.IndividualCityListing) },
    { path: 'projects-in-thoothukudi', loadComponent: () => import('./individual-city-listing/individual-city-listing').then(m => m.IndividualCityListing) },
    { path: 'projects-in-bareilly', loadComponent: () => import('./individual-city-listing/individual-city-listing').then(m => m.IndividualCityListing) },
    { path: 'projects-in-jhansi', loadComponent: () => import('./individual-city-listing/individual-city-listing').then(m => m.IndividualCityListing) },
    { path: 'projects-in-tiruchirappalli', loadComponent: () => import('./individual-city-listing/individual-city-listing').then(m => m.IndividualCityListing) },
    { path: 'projects-in-hosur', loadComponent: () => import('./individual-city-listing/individual-city-listing').then(m => m.IndividualCityListing) },
    { path: 'projects-in-madurai', loadComponent: () => import('./individual-city-listing/individual-city-listing').then(m => m.IndividualCityListing) },
    { path: 'projects-in-namakkal', loadComponent: () => import('./individual-city-listing/individual-city-listing').then(m => m.IndividualCityListing) },
    { path: 'projects-in-tiruppur', loadComponent: () => import('./individual-city-listing/individual-city-listing').then(m => m.IndividualCityListing) },
    { path: 'projects-in-vellore', loadComponent: () => import('./individual-city-listing/individual-city-listing').then(m => m.IndividualCityListing) },
    { path: 'projects-in-viluppuram', loadComponent: () => import('./individual-city-listing/individual-city-listing').then(m => m.IndividualCityListing) },
    { path: 'projects-in-koonimedu', loadComponent: () => import('./individual-city-listing/individual-city-listing').then(m => m.IndividualCityListing) },
    { path: 'projects-in-theni', loadComponent: () => import('./individual-city-listing/individual-city-listing').then(m => m.IndividualCityListing) },
    { path: 'projects-in-kotagiri', loadComponent: () => import('./individual-city-listing/individual-city-listing').then(m => m.IndividualCityListing) },
    { path: 'projects-in-krishnagri', loadComponent: () => import('./individual-city-listing/individual-city-listing').then(m => m.IndividualCityListing) },

    // ----------------------------Individual Flat listing--------------------------------
    { path: 'apartment-projects-in-bangalore', loadComponent: () => import('./individual-flat-list/individual-flat-list').then(m => m.IndividualFlatList) },
    { path: 'apartment-projects-in-hyderabad', loadComponent: () => import('./individual-flat-list/individual-flat-list').then(m => m.IndividualFlatList) },
    { path: 'apartment-projects-in-chennai', loadComponent: () => import('./individual-flat-list/individual-flat-list').then(m => m.IndividualFlatList) },
    { path: 'apartment-projects-in-kochi', loadComponent: () => import('./individual-flat-list/individual-flat-list').then(m => m.IndividualFlatList) },
    { path: 'apartment-projects-in-pune', loadComponent: () => import('./individual-flat-list/individual-flat-list').then(m => m.IndividualFlatList) },
    { path: 'apartment-projects-in-mumbai', loadComponent: () => import('./individual-flat-list/individual-flat-list').then(m => m.IndividualFlatList) },
    { path: 'apartment-projects-in-delhi', loadComponent: () => import('./individual-flat-list/individual-flat-list').then(m => m.IndividualFlatList) },
    { path: 'apartment-projects-in-kolkata', loadComponent: () => import('./individual-flat-list/individual-flat-list').then(m => m.IndividualFlatList) },
    { path: 'apartment-projects-in-goa', loadComponent: () => import('./individual-flat-list/individual-flat-list').then(m => m.IndividualFlatList) },
    { path: 'apartment-projects-in-gurgaon', loadComponent: () => import('./individual-flat-list/individual-flat-list').then(m => m.IndividualFlatList) },
    { path: 'apartment-projects-in-mysore', loadComponent: () => import('./individual-flat-list/individual-flat-list').then(m => m.IndividualFlatList) },
    { path: 'apartment-projects-in-coimbatore', loadComponent: () => import('./individual-flat-list/individual-flat-list').then(m => m.IndividualFlatList) },
    { path: 'apartment-projects-in-ahmedabad', loadComponent: () => import('./individual-flat-list/individual-flat-list').then(m => m.IndividualFlatList) },
    { path: 'apartment-projects-in-trivandrum', loadComponent: () => import('./individual-flat-list/individual-flat-list').then(m => m.IndividualFlatList) },
    { path: 'apartment-projects-in-navi-mumbai', loadComponent: () => import('./individual-flat-list/individual-flat-list').then(m => m.IndividualFlatList) },
    { path: 'apartment-projects-in-noida', loadComponent: () => import('./individual-flat-list/individual-flat-list').then(m => m.IndividualFlatList) },
    { path: 'apartment-projects-in-greater-noida', loadComponent: () => import('./individual-flat-list/individual-flat-list').then(m => m.IndividualFlatList) },
    { path: 'apartment-projects-in-bhubaneshwar', loadComponent: () => import('./individual-flat-list/individual-flat-list').then(m => m.IndividualFlatList) },
    { path: 'apartment-projects-in-vijayawada', loadComponent: () => import('./individual-flat-list/individual-flat-list').then(m => m.IndividualFlatList) },
    { path: 'apartment-projects-in-bhopal', loadComponent: () => import('./individual-flat-list/individual-flat-list').then(m => m.IndividualFlatList) },
    { path: 'apartment-projects-in-indore', loadComponent: () => import('./individual-flat-list/individual-flat-list').then(m => m.IndividualFlatList) },
    { path: 'apartment-projects-in-vizag', loadComponent: () => import('./individual-flat-list/individual-flat-list').then(m => m.IndividualFlatList) },
    { path: 'apartment-projects-in-amaravati', loadComponent: () => import('./individual-flat-list/individual-flat-list').then(m => m.IndividualFlatList) },
    { path: 'apartment-projects-in-thrissur', loadComponent: () => import('./individual-flat-list/individual-flat-list').then(m => m.IndividualFlatList) },
    { path: 'apartment-projects-in-tirupati', loadComponent: () => import('./individual-flat-list/individual-flat-list').then(m => m.IndividualFlatList) },
    { path: 'apartment-projects-in-lucknow', loadComponent: () => import('./individual-flat-list/individual-flat-list').then(m => m.IndividualFlatList) },
    { path: 'apartment-projects-in-nashik', loadComponent: () => import('./individual-flat-list/individual-flat-list').then(m => m.IndividualFlatList) },
    { path: 'apartment-projects-in-mangalore', loadComponent: () => import('./individual-flat-list/individual-flat-list').then(m => m.IndividualFlatList) },
    { path: 'apartment-projects-in-nagpur', loadComponent: () => import('./individual-flat-list/individual-flat-list').then(m => m.IndividualFlatList) },
    { path: 'apartment-projects-in-jaipur', loadComponent: () => import('./individual-flat-list/individual-flat-list').then(m => m.IndividualFlatList) },
    { path: 'apartment-projects-in-nellore', loadComponent: () => import('./individual-flat-list/individual-flat-list').then(m => m.IndividualFlatList) },
    { path: 'apartment-projects-in-faridabad', loadComponent: () => import('./individual-flat-list/individual-flat-list').then(m => m.IndividualFlatList) },
    { path: 'apartment-projects-in-chandigarh', loadComponent: () => import('./individual-flat-list/individual-flat-list').then(m => m.IndividualFlatList) },
    { path: 'apartment-projects-in-dehradun', loadComponent: () => import('./individual-flat-list/individual-flat-list').then(m => m.IndividualFlatList) },
    { path: 'apartment-projects-in-ghaziabad', loadComponent: () => import('./individual-flat-list/individual-flat-list').then(m => m.IndividualFlatList) },
    { path: 'apartment-projects-in-ranchi', loadComponent: () => import('./individual-flat-list/individual-flat-list').then(m => m.IndividualFlatList) },
    { path: 'apartment-projects-in-agra', loadComponent: () => import('./individual-flat-list/individual-flat-list').then(m => m.IndividualFlatList) },
    { path: 'apartment-projects-in-durgapur', loadComponent: () => import('./individual-flat-list/individual-flat-list').then(m => m.IndividualFlatList) },
    { path: 'apartment-projects-in-vizianagaram', loadComponent: () => import('./individual-flat-list/individual-flat-list').then(m => m.IndividualFlatList) },
    { path: 'apartment-projects-in-amritsar', loadComponent: () => import('./individual-flat-list/individual-flat-list').then(m => m.IndividualFlatList) },
    { path: 'apartment-projects-in-patna', loadComponent: () => import('./individual-flat-list/individual-flat-list').then(m => m.IndividualFlatList) },
    { path: 'apartment-projects-in-surat', loadComponent: () => import('./individual-flat-list/individual-flat-list').then(m => m.IndividualFlatList) },
    { path: 'apartment-projects-in-guntur', loadComponent: () => import('./individual-flat-list/individual-flat-list').then(m => m.IndividualFlatList) },
    { path: 'apartment-projects-in-aurangabad', loadComponent: () => import('./individual-flat-list/individual-flat-list').then(m => m.IndividualFlatList) },
    { path: 'apartment-projects-in-guwahati', loadComponent: () => import('./individual-flat-list/individual-flat-list').then(m => m.IndividualFlatList) },
    { path: 'apartment-projects-in-ludhiana', loadComponent: () => import('./individual-flat-list/individual-flat-list').then(m => m.IndividualFlatList) },
    { path: 'apartment-projects-in-dharwad', loadComponent: () => import('./individual-flat-list/individual-flat-list').then(m => m.IndividualFlatList) },
    { path: 'apartment-projects-in-kolhapur', loadComponent: () => import('./individual-flat-list/individual-flat-list').then(m => m.IndividualFlatList) },
    { path: 'apartment-projects-in-mohali', loadComponent: () => import('./individual-flat-list/individual-flat-list').then(m => m.IndividualFlatList) },
    { path: 'apartment-projects-in-kanpur', loadComponent: () => import('./individual-flat-list/individual-flat-list').then(m => m.IndividualFlatList) },
    { path: 'apartment-projects-in-thane', loadComponent: () => import('./individual-flat-list/individual-flat-list').then(m => m.IndividualFlatList) },
    { path: 'apartment-projects-in-jamshedpur', loadComponent: () => import('./individual-flat-list/individual-flat-list').then(m => m.IndividualFlatList) },
    { path: 'apartment-projects-in-belgaum', loadComponent: () => import('./individual-flat-list/individual-flat-list').then(m => m.IndividualFlatList) },
    { path: 'apartment-projects-in-puri', loadComponent: () => import('./individual-flat-list/individual-flat-list').then(m => m.IndividualFlatList) },
    { path: 'apartment-projects-in-meerut', loadComponent: () => import('./individual-flat-list/individual-flat-list').then(m => m.IndividualFlatList) },
    { path: 'apartment-projects-in-tiruvannamalai', loadComponent: () => import('./individual-flat-list/individual-flat-list').then(m => m.IndividualFlatList) },
    { path: 'apartment-projects-in-satara', loadComponent: () => import('./individual-flat-list/individual-flat-list').then(m => m.IndividualFlatList) },
    { path: 'apartment-projects-in-junagadh', loadComponent: () => import('./individual-flat-list/individual-flat-list').then(m => m.IndividualFlatList) },
    { path: 'apartment-projects-in-vadodara', loadComponent: () => import('./individual-flat-list/individual-flat-list').then(m => m.IndividualFlatList) },
    { path: 'apartment-projects-in-palwal', loadComponent: () => import('./individual-flat-list/individual-flat-list').then(m => m.IndividualFlatList) },
    { path: 'apartment-projects-in-panchkula', loadComponent: () => import('./individual-flat-list/individual-flat-list').then(m => m.IndividualFlatList) },
    { path: 'apartment-projects-in-panipat', loadComponent: () => import('./individual-flat-list/individual-flat-list').then(m => m.IndividualFlatList) },
    { path: 'apartment-projects-in-calicut', loadComponent: () => import('./individual-flat-list/individual-flat-list').then(m => m.IndividualFlatList) },
    { path: 'apartment-projects-in-pathanamthitta', loadComponent: () => import('./individual-flat-list/individual-flat-list').then(m => m.IndividualFlatList) },
    { path: 'apartment-projects-in-haridwar', loadComponent: () => import('./individual-flat-list/individual-flat-list').then(m => m.IndividualFlatList) },
    { path: 'apartment-projects-in-solan', loadComponent: () => import('./individual-flat-list/individual-flat-list').then(m => m.IndividualFlatList) },
    { path: 'apartment-projects-in-burhanpur', loadComponent: () => import('./individual-flat-list/individual-flat-list').then(m => m.IndividualFlatList) },
    { path: 'apartment-projects-in-raipur', loadComponent: () => import('./individual-flat-list/individual-flat-list').then(m => m.IndividualFlatList) },
    { path: 'apartment-projects-in-kanchipuram', loadComponent: () => import('./individual-flat-list/individual-flat-list').then(m => m.IndividualFlatList) },
    { path: 'apartment-projects-in-pondicherry', loadComponent: () => import('./individual-flat-list/individual-flat-list').then(m => m.IndividualFlatList) },
    { path: 'apartment-projects-in-siliguri', loadComponent: () => import('./individual-flat-list/individual-flat-list').then(m => m.IndividualFlatList) },
    { path: 'apartment-projects-in-gandhinagar', loadComponent: () => import('./individual-flat-list/individual-flat-list').then(m => m.IndividualFlatList) },
    { path: 'apartment-projects-in-ajmer', loadComponent: () => import('./individual-flat-list/individual-flat-list').then(m => m.IndividualFlatList) },
    { path: 'apartment-projects-in-varanasi', loadComponent: () => import('./individual-flat-list/individual-flat-list').then(m => m.IndividualFlatList) },
    { path: 'apartment-projects-in-mathura', loadComponent: () => import('./individual-flat-list/individual-flat-list').then(m => m.IndividualFlatList) },
    { path: 'apartment-projects-in-dindigul', loadComponent: () => import('./individual-flat-list/individual-flat-list').then(m => m.IndividualFlatList) },
    { path: 'apartment-projects-in-rewari', loadComponent: () => import('./individual-flat-list/individual-flat-list').then(m => m.IndividualFlatList) },
    { path: 'apartment-projects-in-solapur', loadComponent: () => import('./individual-flat-list/individual-flat-list').then(m => m.IndividualFlatList) },
    { path: 'apartment-projects-in-ratnagiri', loadComponent: () => import('./individual-flat-list/individual-flat-list').then(m => m.IndividualFlatList) },
    { path: 'apartment-projects-in-shantiniketan', loadComponent: () => import('./individual-flat-list/individual-flat-list').then(m => m.IndividualFlatList) },
    { path: 'apartment-projects-in-rishikesh', loadComponent: () => import('./individual-flat-list/individual-flat-list').then(m => m.IndividualFlatList) },
    { path: 'apartment-projects-in-rajkor', loadComponent: () => import('./individual-flat-list/individual-flat-list').then(m => m.IndividualFlatList) },
    { path: 'apartment-projects-in-hapur', loadComponent: () => import('./individual-flat-list/individual-flat-list').then(m => m.IndividualFlatList) },
    { path: 'apartment-projects-in-chamarajnagar', loadComponent: () => import('./individual-flat-list/individual-flat-list').then(m => m.IndividualFlatList) },
    { path: 'apartment-projects-in-gulbarga', loadComponent: () => import('./individual-flat-list/individual-flat-list').then(m => m.IndividualFlatList) },
    { path: 'apartment-projects-in-alwar', loadComponent: () => import('./individual-flat-list/individual-flat-list').then(m => m.IndividualFlatList) },
    { path: 'apartment-projects-in-tirunelveli', loadComponent: () => import('./individual-flat-list/individual-flat-list').then(m => m.IndividualFlatList) },
    { path: 'apartment-projects-in-raigad', loadComponent: () => import('./individual-flat-list/individual-flat-list').then(m => m.IndividualFlatList) },
    { path: 'apartment-projects-in-rajkot', loadComponent: () => import('./individual-flat-list/individual-flat-list').then(m => m.IndividualFlatList) },
    { path: 'apartment-projects-in-purba-medinipur', loadComponent: () => import('./individual-flat-list/individual-flat-list').then(m => m.IndividualFlatList) },
    { path: 'apartment-projects-in-chamarajanagar', loadComponent: () => import('./individual-flat-list/individual-flat-list').then(m => m.IndividualFlatList) },
    { path: 'apartment-projects-in-sangli', loadComponent: () => import('./individual-flat-list/individual-flat-list').then(m => m.IndividualFlatList) },
    { path: 'apartment-projects-in-ayodhya', loadComponent: () => import('./individual-flat-list/individual-flat-list').then(m => m.IndividualFlatList) },
    { path: 'apartment-projects-in-bhiwadi', loadComponent: () => import('./individual-flat-list/individual-flat-list').then(m => m.IndividualFlatList) },
    { path: 'apartment-projects-in-kottayam', loadComponent: () => import('./individual-flat-list/individual-flat-list').then(m => m.IndividualFlatList) },
    { path: 'apartment-projects-in-kannur', loadComponent: () => import('./individual-flat-list/individual-flat-list').then(m => m.IndividualFlatList) },
    { path: 'apartment-projects-in-neemrana', loadComponent: () => import('./individual-flat-list/individual-flat-list').then(m => m.IndividualFlatList) },
    { path: 'apartment-projects-in-thanjavur', loadComponent: () => import('./individual-flat-list/individual-flat-list').then(m => m.IndividualFlatList) },
    { path: 'apartment-projects-in-kota', loadComponent: () => import('./individual-flat-list/individual-flat-list').then(m => m.IndividualFlatList) },
    { path: 'apartment-projects-in-bilaspur', loadComponent: () => import('./individual-flat-list/individual-flat-list').then(m => m.IndividualFlatList) },
    { path: 'apartment-projects-in-navsari', loadComponent: () => import('./individual-flat-list/individual-flat-list').then(m => m.IndividualFlatList) },
    { path: 'apartment-projects-in-davanegere', loadComponent: () => import('./individual-flat-list/individual-flat-list').then(m => m.IndividualFlatList) },
    { path: 'apartment-projects-in-jabalpur', loadComponent: () => import('./individual-flat-list/individual-flat-list').then(m => m.IndividualFlatList) },
    { path: 'apartment-projects-in-gwalior', loadComponent: () => import('./individual-flat-list/individual-flat-list').then(m => m.IndividualFlatList) },
    { path: 'apartment-projects-in-ujjain', loadComponent: () => import('./individual-flat-list/individual-flat-list').then(m => m.IndividualFlatList) },
    { path: 'apartment-projects-in-salem', loadComponent: () => import('./individual-flat-list/individual-flat-list').then(m => m.IndividualFlatList) },
    { path: 'apartment-projects-in-erode', loadComponent: () => import('./individual-flat-list/individual-flat-list').then(m => m.IndividualFlatList) },
    { path: 'apartment-projects-in-thoothukudi', loadComponent: () => import('./individual-flat-list/individual-flat-list').then(m => m.IndividualFlatList) },
    { path: 'apartment-projects-in-bareilly', loadComponent: () => import('./individual-flat-list/individual-flat-list').then(m => m.IndividualFlatList) },
    { path: 'apartment-projects-in-jhansi', loadComponent: () => import('./individual-flat-list/individual-flat-list').then(m => m.IndividualFlatList) },
    { path: 'apartment-projects-in-tiruchirappalli', loadComponent: () => import('./individual-flat-list/individual-flat-list').then(m => m.IndividualFlatList) },
    { path: 'apartment-projects-in-hosur', loadComponent: () => import('./individual-flat-list/individual-flat-list').then(m => m.IndividualFlatList) },
    { path: 'apartment-projects-in-madurai', loadComponent: () => import('./individual-flat-list/individual-flat-list').then(m => m.IndividualFlatList) },
    { path: 'apartment-projects-in-namakkal', loadComponent: () => import('./individual-flat-list/individual-flat-list').then(m => m.IndividualFlatList) },
    { path: 'apartment-projects-in-tiruppur', loadComponent: () => import('./individual-flat-list/individual-flat-list').then(m => m.IndividualFlatList) },
    { path: 'apartment-projects-in-vellore', loadComponent: () => import('./individual-flat-list/individual-flat-list').then(m => m.IndividualFlatList) },
    { path: 'apartment-projects-in-viluppuram', loadComponent: () => import('./individual-flat-list/individual-flat-list').then(m => m.IndividualFlatList) },
    { path: 'apartment-projects-in-koonimedu', loadComponent: () => import('./individual-flat-list/individual-flat-list').then(m => m.IndividualFlatList) },
    { path: 'apartment-projects-in-theni', loadComponent: () => import('./individual-flat-list/individual-flat-list').then(m => m.IndividualFlatList) },
    { path: 'apartment-projects-in-kotagiri', loadComponent: () => import('./individual-flat-list/individual-flat-list').then(m => m.IndividualFlatList) },
    { path: 'apartment-projects-in-krishnagri', loadComponent: () => import('./individual-flat-list/individual-flat-list').then(m => m.IndividualFlatList) },

    // -----------------------individual Plot listing------------------------------
    { path: 'land-projects-in-bangalore', loadComponent: () => import('./individual-plot-list/individual-plot-list').then(m => m.IndividualPlotList) },
    { path: 'land-projects-in-hyderabad', loadComponent: () => import('./individual-plot-list/individual-plot-list').then(m => m.IndividualPlotList) },
    { path: 'land-projects-in-chennai', loadComponent: () => import('./individual-plot-list/individual-plot-list').then(m => m.IndividualPlotList) },
    { path: 'land-projects-in-kochi', loadComponent: () => import('./individual-plot-list/individual-plot-list').then(m => m.IndividualPlotList) },
    { path: 'land-projects-in-pune', loadComponent: () => import('./individual-plot-list/individual-plot-list').then(m => m.IndividualPlotList) },
    { path: 'land-projects-in-mumbai', loadComponent: () => import('./individual-plot-list/individual-plot-list').then(m => m.IndividualPlotList) },
    { path: 'land-projects-in-delhi', loadComponent: () => import('./individual-plot-list/individual-plot-list').then(m => m.IndividualPlotList) },
    { path: 'land-projects-in-kolkata', loadComponent: () => import('./individual-plot-list/individual-plot-list').then(m => m.IndividualPlotList) },
    { path: 'land-projects-in-goa', loadComponent: () => import('./individual-plot-list/individual-plot-list').then(m => m.IndividualPlotList) },
    { path: 'land-projects-in-gurgaon', loadComponent: () => import('./individual-plot-list/individual-plot-list').then(m => m.IndividualPlotList) },
    { path: 'land-projects-in-mysore', loadComponent: () => import('./individual-plot-list/individual-plot-list').then(m => m.IndividualPlotList) },
    { path: 'land-projects-in-coimbatore', loadComponent: () => import('./individual-plot-list/individual-plot-list').then(m => m.IndividualPlotList) },
    { path: 'land-projects-in-ahmedabad', loadComponent: () => import('./individual-plot-list/individual-plot-list').then(m => m.IndividualPlotList) },
    { path: 'land-projects-in-trivandrum', loadComponent: () => import('./individual-plot-list/individual-plot-list').then(m => m.IndividualPlotList) },
    { path: 'land-projects-in-navi-mumbai', loadComponent: () => import('./individual-plot-list/individual-plot-list').then(m => m.IndividualPlotList) },
    { path: 'land-projects-in-noida', loadComponent: () => import('./individual-plot-list/individual-plot-list').then(m => m.IndividualPlotList) },
    { path: 'land-projects-in-greater-noida', loadComponent: () => import('./individual-plot-list/individual-plot-list').then(m => m.IndividualPlotList) },
    { path: 'land-projects-in-bhubaneshwar', loadComponent: () => import('./individual-plot-list/individual-plot-list').then(m => m.IndividualPlotList) },
    { path: 'land-projects-in-vijayawada', loadComponent: () => import('./individual-plot-list/individual-plot-list').then(m => m.IndividualPlotList) },
    { path: 'land-projects-in-bhopal', loadComponent: () => import('./individual-plot-list/individual-plot-list').then(m => m.IndividualPlotList) },
    { path: 'land-projects-in-indore', loadComponent: () => import('./individual-plot-list/individual-plot-list').then(m => m.IndividualPlotList) },
    { path: 'land-projects-in-vizag', loadComponent: () => import('./individual-plot-list/individual-plot-list').then(m => m.IndividualPlotList) },
    { path: 'land-projects-in-amaravati', loadComponent: () => import('./individual-plot-list/individual-plot-list').then(m => m.IndividualPlotList) },
    { path: 'land-projects-in-thrissur', loadComponent: () => import('./individual-plot-list/individual-plot-list').then(m => m.IndividualPlotList) },
    { path: 'land-projects-in-tirupati', loadComponent: () => import('./individual-plot-list/individual-plot-list').then(m => m.IndividualPlotList) },
    { path: 'land-projects-in-lucknow', loadComponent: () => import('./individual-plot-list/individual-plot-list').then(m => m.IndividualPlotList) },
    { path: 'land-projects-in-nashik', loadComponent: () => import('./individual-plot-list/individual-plot-list').then(m => m.IndividualPlotList) },
    { path: 'land-projects-in-mangalore', loadComponent: () => import('./individual-plot-list/individual-plot-list').then(m => m.IndividualPlotList) },
    { path: 'land-projects-in-nagpur', loadComponent: () => import('./individual-plot-list/individual-plot-list').then(m => m.IndividualPlotList) },
    { path: 'land-projects-in-jaipur', loadComponent: () => import('./individual-plot-list/individual-plot-list').then(m => m.IndividualPlotList) },
    { path: 'land-projects-in-nellore', loadComponent: () => import('./individual-plot-list/individual-plot-list').then(m => m.IndividualPlotList) },
    { path: 'land-projects-in-faridabad', loadComponent: () => import('./individual-plot-list/individual-plot-list').then(m => m.IndividualPlotList) },
    { path: 'land-projects-in-chandigarh', loadComponent: () => import('./individual-plot-list/individual-plot-list').then(m => m.IndividualPlotList) },
    { path: 'land-projects-in-dehradun', loadComponent: () => import('./individual-plot-list/individual-plot-list').then(m => m.IndividualPlotList) },
    { path: 'land-projects-in-ghaziabad', loadComponent: () => import('./individual-plot-list/individual-plot-list').then(m => m.IndividualPlotList) },
    { path: 'land-projects-in-ranchi', loadComponent: () => import('./individual-plot-list/individual-plot-list').then(m => m.IndividualPlotList) },
    { path: 'land-projects-in-agra', loadComponent: () => import('./individual-plot-list/individual-plot-list').then(m => m.IndividualPlotList) },
    { path: 'land-projects-in-durgapur', loadComponent: () => import('./individual-plot-list/individual-plot-list').then(m => m.IndividualPlotList) },
    { path: 'land-projects-in-vizianagaram', loadComponent: () => import('./individual-plot-list/individual-plot-list').then(m => m.IndividualPlotList) },
    { path: 'land-projects-in-amritsar', loadComponent: () => import('./individual-plot-list/individual-plot-list').then(m => m.IndividualPlotList) },
    { path: 'land-projects-in-patna', loadComponent: () => import('./individual-plot-list/individual-plot-list').then(m => m.IndividualPlotList) },
    { path: 'land-projects-in-surat', loadComponent: () => import('./individual-plot-list/individual-plot-list').then(m => m.IndividualPlotList) },
    { path: 'land-projects-in-guntur', loadComponent: () => import('./individual-plot-list/individual-plot-list').then(m => m.IndividualPlotList) },
    { path: 'land-projects-in-aurangabad', loadComponent: () => import('./individual-plot-list/individual-plot-list').then(m => m.IndividualPlotList) },
    { path: 'land-projects-in-guwahati', loadComponent: () => import('./individual-plot-list/individual-plot-list').then(m => m.IndividualPlotList) },
    { path: 'land-projects-in-ludhiana', loadComponent: () => import('./individual-plot-list/individual-plot-list').then(m => m.IndividualPlotList) },
    { path: 'land-projects-in-dharwad', loadComponent: () => import('./individual-plot-list/individual-plot-list').then(m => m.IndividualPlotList) },
    { path: 'land-projects-in-kolhapur', loadComponent: () => import('./individual-plot-list/individual-plot-list').then(m => m.IndividualPlotList) },
    { path: 'land-projects-in-mohali', loadComponent: () => import('./individual-plot-list/individual-plot-list').then(m => m.IndividualPlotList) },
    { path: 'land-projects-in-kanpur', loadComponent: () => import('./individual-plot-list/individual-plot-list').then(m => m.IndividualPlotList) },
    { path: 'land-projects-in-thane', loadComponent: () => import('./individual-plot-list/individual-plot-list').then(m => m.IndividualPlotList) },
    { path: 'land-projects-in-jamshedpur', loadComponent: () => import('./individual-plot-list/individual-plot-list').then(m => m.IndividualPlotList) },
    { path: 'land-projects-in-belgaum', loadComponent: () => import('./individual-plot-list/individual-plot-list').then(m => m.IndividualPlotList) },
    { path: 'land-projects-in-puri', loadComponent: () => import('./individual-plot-list/individual-plot-list').then(m => m.IndividualPlotList) },
    { path: 'land-projects-in-meerut', loadComponent: () => import('./individual-plot-list/individual-plot-list').then(m => m.IndividualPlotList) },
    { path: 'land-projects-in-tiruvannamalai', loadComponent: () => import('./individual-plot-list/individual-plot-list').then(m => m.IndividualPlotList) },
    { path: 'land-projects-in-satara', loadComponent: () => import('./individual-plot-list/individual-plot-list').then(m => m.IndividualPlotList) },
    { path: 'land-projects-in-junagadh', loadComponent: () => import('./individual-plot-list/individual-plot-list').then(m => m.IndividualPlotList) },
    { path: 'land-projects-in-vadodara', loadComponent: () => import('./individual-plot-list/individual-plot-list').then(m => m.IndividualPlotList) },
    { path: 'land-projects-in-palwal', loadComponent: () => import('./individual-plot-list/individual-plot-list').then(m => m.IndividualPlotList) },
    { path: 'land-projects-in-panchkula', loadComponent: () => import('./individual-plot-list/individual-plot-list').then(m => m.IndividualPlotList) },
    { path: 'land-projects-in-panipat', loadComponent: () => import('./individual-plot-list/individual-plot-list').then(m => m.IndividualPlotList) },
    { path: 'land-projects-in-calicut', loadComponent: () => import('./individual-plot-list/individual-plot-list').then(m => m.IndividualPlotList) },
    { path: 'land-projects-in-pathanamthitta', loadComponent: () => import('./individual-plot-list/individual-plot-list').then(m => m.IndividualPlotList) },
    { path: 'land-projects-in-haridwar', loadComponent: () => import('./individual-plot-list/individual-plot-list').then(m => m.IndividualPlotList) },
    { path: 'land-projects-in-solan', loadComponent: () => import('./individual-plot-list/individual-plot-list').then(m => m.IndividualPlotList) },
    { path: 'land-projects-in-burhanpur', loadComponent: () => import('./individual-plot-list/individual-plot-list').then(m => m.IndividualPlotList) },
    { path: 'land-projects-in-raipur', loadComponent: () => import('./individual-plot-list/individual-plot-list').then(m => m.IndividualPlotList) },
    { path: 'land-projects-in-kanchipuram', loadComponent: () => import('./individual-plot-list/individual-plot-list').then(m => m.IndividualPlotList) },
    { path: 'land-projects-in-pondicherry', loadComponent: () => import('./individual-plot-list/individual-plot-list').then(m => m.IndividualPlotList) },
    { path: 'land-projects-in-siliguri', loadComponent: () => import('./individual-plot-list/individual-plot-list').then(m => m.IndividualPlotList) },
    { path: 'land-projects-in-gandhinagar', loadComponent: () => import('./individual-plot-list/individual-plot-list').then(m => m.IndividualPlotList) },
    { path: 'land-projects-in-ajmer', loadComponent: () => import('./individual-plot-list/individual-plot-list').then(m => m.IndividualPlotList) },
    { path: 'land-projects-in-varanasi', loadComponent: () => import('./individual-plot-list/individual-plot-list').then(m => m.IndividualPlotList) },
    { path: 'land-projects-in-mathura', loadComponent: () => import('./individual-plot-list/individual-plot-list').then(m => m.IndividualPlotList) },
    { path: 'land-projects-in-dindigul', loadComponent: () => import('./individual-plot-list/individual-plot-list').then(m => m.IndividualPlotList) },
    { path: 'land-projects-in-rewari', loadComponent: () => import('./individual-plot-list/individual-plot-list').then(m => m.IndividualPlotList) },
    { path: 'land-projects-in-solapur', loadComponent: () => import('./individual-plot-list/individual-plot-list').then(m => m.IndividualPlotList) },
    { path: 'land-projects-in-ratnagiri', loadComponent: () => import('./individual-plot-list/individual-plot-list').then(m => m.IndividualPlotList) },
    { path: 'land-projects-in-shantiniketan', loadComponent: () => import('./individual-plot-list/individual-plot-list').then(m => m.IndividualPlotList) },
    { path: 'land-projects-in-rishikesh', loadComponent: () => import('./individual-plot-list/individual-plot-list').then(m => m.IndividualPlotList) },
    { path: 'land-projects-in-rajkor', loadComponent: () => import('./individual-plot-list/individual-plot-list').then(m => m.IndividualPlotList) },
    { path: 'land-projects-in-hapur', loadComponent: () => import('./individual-plot-list/individual-plot-list').then(m => m.IndividualPlotList) },
    { path: 'land-projects-in-chamarajnagar', loadComponent: () => import('./individual-plot-list/individual-plot-list').then(m => m.IndividualPlotList) },
    { path: 'land-projects-in-gulbarga', loadComponent: () => import('./individual-plot-list/individual-plot-list').then(m => m.IndividualPlotList) },
    { path: 'land-projects-in-alwar', loadComponent: () => import('./individual-plot-list/individual-plot-list').then(m => m.IndividualPlotList) },
    { path: 'land-projects-in-tirunelveli', loadComponent: () => import('./individual-plot-list/individual-plot-list').then(m => m.IndividualPlotList) },
    { path: 'land-projects-in-raigad', loadComponent: () => import('./individual-plot-list/individual-plot-list').then(m => m.IndividualPlotList) },
    { path: 'land-projects-in-rajkot', loadComponent: () => import('./individual-plot-list/individual-plot-list').then(m => m.IndividualPlotList) },
    { path: 'land-projects-in-purba-medinipur', loadComponent: () => import('./individual-plot-list/individual-plot-list').then(m => m.IndividualPlotList) },
    { path: 'land-projects-in-chamarajanagar', loadComponent: () => import('./individual-plot-list/individual-plot-list').then(m => m.IndividualPlotList) },
    { path: 'land-projects-in-sangli', loadComponent: () => import('./individual-plot-list/individual-plot-list').then(m => m.IndividualPlotList) },
    { path: 'land-projects-in-ayodhya', loadComponent: () => import('./individual-plot-list/individual-plot-list').then(m => m.IndividualPlotList) },
    { path: 'land-projects-in-bhiwadi', loadComponent: () => import('./individual-plot-list/individual-plot-list').then(m => m.IndividualPlotList) },
    { path: 'land-projects-in-kottayam', loadComponent: () => import('./individual-plot-list/individual-plot-list').then(m => m.IndividualPlotList) },
    { path: 'land-projects-in-kannur', loadComponent: () => import('./individual-plot-list/individual-plot-list').then(m => m.IndividualPlotList) },
    { path: 'land-projects-in-neemrana', loadComponent: () => import('./individual-plot-list/individual-plot-list').then(m => m.IndividualPlotList) },
    { path: 'land-projects-in-thanjavur', loadComponent: () => import('./individual-plot-list/individual-plot-list').then(m => m.IndividualPlotList) },
    { path: 'land-projects-in-kota', loadComponent: () => import('./individual-plot-list/individual-plot-list').then(m => m.IndividualPlotList) },
    { path: 'land-projects-in-bilaspur', loadComponent: () => import('./individual-plot-list/individual-plot-list').then(m => m.IndividualPlotList) },
    { path: 'land-projects-in-navsari', loadComponent: () => import('./individual-plot-list/individual-plot-list').then(m => m.IndividualPlotList) },
    { path: 'land-projects-in-davanegere', loadComponent: () => import('./individual-plot-list/individual-plot-list').then(m => m.IndividualPlotList) },
    { path: 'land-projects-in-jabalpur', loadComponent: () => import('./individual-plot-list/individual-plot-list').then(m => m.IndividualPlotList) },
    { path: 'land-projects-in-gwalior', loadComponent: () => import('./individual-plot-list/individual-plot-list').then(m => m.IndividualPlotList) },
    { path: 'land-projects-in-ujjain', loadComponent: () => import('./individual-plot-list/individual-plot-list').then(m => m.IndividualPlotList) },
    { path: 'land-projects-in-salem', loadComponent: () => import('./individual-plot-list/individual-plot-list').then(m => m.IndividualPlotList) },
    { path: 'land-projects-in-erode', loadComponent: () => import('./individual-plot-list/individual-plot-list').then(m => m.IndividualPlotList) },
    { path: 'land-projects-in-thoothukudi', loadComponent: () => import('./individual-plot-list/individual-plot-list').then(m => m.IndividualPlotList) },
    { path: 'land-projects-in-bareilly', loadComponent: () => import('./individual-plot-list/individual-plot-list').then(m => m.IndividualPlotList) },
    { path: 'land-projects-in-jhansi', loadComponent: () => import('./individual-plot-list/individual-plot-list').then(m => m.IndividualPlotList) },
    { path: 'land-projects-in-tiruchirappalli', loadComponent: () => import('./individual-plot-list/individual-plot-list').then(m => m.IndividualPlotList) },
    { path: 'land-projects-in-hosur', loadComponent: () => import('./individual-plot-list/individual-plot-list').then(m => m.IndividualPlotList) },
    { path: 'land-projects-in-madurai', loadComponent: () => import('./individual-plot-list/individual-plot-list').then(m => m.IndividualPlotList) },
    { path: 'land-projects-in-namakkal', loadComponent: () => import('./individual-plot-list/individual-plot-list').then(m => m.IndividualPlotList) },
    { path: 'land-projects-in-tiruppur', loadComponent: () => import('./individual-plot-list/individual-plot-list').then(m => m.IndividualPlotList) },
    { path: 'land-projects-in-vellore', loadComponent: () => import('./individual-plot-list/individual-plot-list').then(m => m.IndividualPlotList) },
    { path: 'land-projects-in-viluppuram', loadComponent: () => import('./individual-plot-list/individual-plot-list').then(m => m.IndividualPlotList) },
    { path: 'land-projects-in-koonimedu', loadComponent: () => import('./individual-plot-list/individual-plot-list').then(m => m.IndividualPlotList) },
    { path: 'land-projects-in-theni', loadComponent: () => import('./individual-plot-list/individual-plot-list').then(m => m.IndividualPlotList) },
    { path: 'land-projects-in-kotagiri', loadComponent: () => import('./individual-plot-list/individual-plot-list').then(m => m.IndividualPlotList) },
    { path: 'land-projects-in-krishnagri', loadComponent: () => import('./individual-plot-list/individual-plot-list').then(m => m.IndividualPlotList) },

    // ----------------------------------individual villa list-------------------------------------

    { path: 'villa-projects-in-bangalore', loadComponent: () => import('./individual-villa-list/individual-villa-list').then(m => m.IndividualVillaList) },
    { path: 'villa-projects-in-hyderabad', loadComponent: () => import('./individual-villa-list/individual-villa-list').then(m => m.IndividualVillaList) },
    { path: 'villa-projects-in-chennai', loadComponent: () => import('./individual-villa-list/individual-villa-list').then(m => m.IndividualVillaList) },
    { path: 'villa-projects-in-kochi', loadComponent: () => import('./individual-villa-list/individual-villa-list').then(m => m.IndividualVillaList) },
    { path: 'villa-projects-in-pune', loadComponent: () => import('./individual-villa-list/individual-villa-list').then(m => m.IndividualVillaList) },
    { path: 'villa-projects-in-mumbai', loadComponent: () => import('./individual-villa-list/individual-villa-list').then(m => m.IndividualVillaList) },
    { path: 'villa-projects-in-delhi', loadComponent: () => import('./individual-villa-list/individual-villa-list').then(m => m.IndividualVillaList) },
    { path: 'villa-projects-in-kolkata', loadComponent: () => import('./individual-villa-list/individual-villa-list').then(m => m.IndividualVillaList) },
    { path: 'villa-projects-in-goa', loadComponent: () => import('./individual-villa-list/individual-villa-list').then(m => m.IndividualVillaList) },
    { path: 'villa-projects-in-gurgaon', loadComponent: () => import('./individual-villa-list/individual-villa-list').then(m => m.IndividualVillaList) },
    { path: 'villa-projects-in-mysore', loadComponent: () => import('./individual-villa-list/individual-villa-list').then(m => m.IndividualVillaList) },
    { path: 'villa-projects-in-coimbatore', loadComponent: () => import('./individual-villa-list/individual-villa-list').then(m => m.IndividualVillaList) },
    { path: 'villa-projects-in-ahmedabad', loadComponent: () => import('./individual-villa-list/individual-villa-list').then(m => m.IndividualVillaList) },
    { path: 'villa-projects-in-trivandrum', loadComponent: () => import('./individual-villa-list/individual-villa-list').then(m => m.IndividualVillaList) },
    { path: 'villa-projects-in-navi-mumbai', loadComponent: () => import('./individual-villa-list/individual-villa-list').then(m => m.IndividualVillaList) },
    { path: 'villa-projects-in-noida', loadComponent: () => import('./individual-villa-list/individual-villa-list').then(m => m.IndividualVillaList) },
    { path: 'villa-projects-in-greater-noida', loadComponent: () => import('./individual-villa-list/individual-villa-list').then(m => m.IndividualVillaList) },
    { path: 'villa-projects-in-bhubaneshwar', loadComponent: () => import('./individual-villa-list/individual-villa-list').then(m => m.IndividualVillaList) },
    { path: 'villa-projects-in-vijayawada', loadComponent: () => import('./individual-villa-list/individual-villa-list').then(m => m.IndividualVillaList) },
    { path: 'villa-projects-in-bhopal', loadComponent: () => import('./individual-villa-list/individual-villa-list').then(m => m.IndividualVillaList) },
    { path: 'villa-projects-in-indore', loadComponent: () => import('./individual-villa-list/individual-villa-list').then(m => m.IndividualVillaList) },
    { path: 'villa-projects-in-vizag', loadComponent: () => import('./individual-villa-list/individual-villa-list').then(m => m.IndividualVillaList) },
    { path: 'villa-projects-in-amaravati', loadComponent: () => import('./individual-villa-list/individual-villa-list').then(m => m.IndividualVillaList) },
    { path: 'villa-projects-in-thrissur', loadComponent: () => import('./individual-villa-list/individual-villa-list').then(m => m.IndividualVillaList) },
    { path: 'villa-projects-in-tirupati', loadComponent: () => import('./individual-villa-list/individual-villa-list').then(m => m.IndividualVillaList) },
    { path: 'villa-projects-in-lucknow', loadComponent: () => import('./individual-villa-list/individual-villa-list').then(m => m.IndividualVillaList) },
    { path: 'villa-projects-in-nashik', loadComponent: () => import('./individual-villa-list/individual-villa-list').then(m => m.IndividualVillaList) },
    { path: 'villa-projects-in-mangalore', loadComponent: () => import('./individual-villa-list/individual-villa-list').then(m => m.IndividualVillaList) },
    { path: 'villa-projects-in-nagpur', loadComponent: () => import('./individual-villa-list/individual-villa-list').then(m => m.IndividualVillaList) },
    { path: 'villa-projects-in-jaipur', loadComponent: () => import('./individual-villa-list/individual-villa-list').then(m => m.IndividualVillaList) },
    { path: 'villa-projects-in-nellore', loadComponent: () => import('./individual-villa-list/individual-villa-list').then(m => m.IndividualVillaList) },
    { path: 'villa-projects-in-faridabad', loadComponent: () => import('./individual-villa-list/individual-villa-list').then(m => m.IndividualVillaList) },
    { path: 'villa-projects-in-chandigarh', loadComponent: () => import('./individual-villa-list/individual-villa-list').then(m => m.IndividualVillaList) },
    { path: 'villa-projects-in-dehradun', loadComponent: () => import('./individual-villa-list/individual-villa-list').then(m => m.IndividualVillaList) },
    { path: 'villa-projects-in-ghaziabad', loadComponent: () => import('./individual-villa-list/individual-villa-list').then(m => m.IndividualVillaList) },
    { path: 'villa-projects-in-ranchi', loadComponent: () => import('./individual-villa-list/individual-villa-list').then(m => m.IndividualVillaList) },
    { path: 'villa-projects-in-agra', loadComponent: () => import('./individual-villa-list/individual-villa-list').then(m => m.IndividualVillaList) },
    { path: 'villa-projects-in-durgapur', loadComponent: () => import('./individual-villa-list/individual-villa-list').then(m => m.IndividualVillaList) },
    { path: 'villa-projects-in-vizianagaram', loadComponent: () => import('./individual-villa-list/individual-villa-list').then(m => m.IndividualVillaList) },
    { path: 'villa-projects-in-amritsar', loadComponent: () => import('./individual-villa-list/individual-villa-list').then(m => m.IndividualVillaList) },
    { path: 'villa-projects-in-patna', loadComponent: () => import('./individual-villa-list/individual-villa-list').then(m => m.IndividualVillaList) },
    { path: 'villa-projects-in-surat', loadComponent: () => import('./individual-villa-list/individual-villa-list').then(m => m.IndividualVillaList) },
    { path: 'villa-projects-in-guntur', loadComponent: () => import('./individual-villa-list/individual-villa-list').then(m => m.IndividualVillaList) },
    { path: 'villa-projects-in-aurangabad', loadComponent: () => import('./individual-villa-list/individual-villa-list').then(m => m.IndividualVillaList) },
    { path: 'villa-projects-in-guwahati', loadComponent: () => import('./individual-villa-list/individual-villa-list').then(m => m.IndividualVillaList) },
    { path: 'villa-projects-in-ludhiana', loadComponent: () => import('./individual-villa-list/individual-villa-list').then(m => m.IndividualVillaList) },
    { path: 'villa-projects-in-dharwad', loadComponent: () => import('./individual-villa-list/individual-villa-list').then(m => m.IndividualVillaList) },
    { path: 'villa-projects-in-kolhapur', loadComponent: () => import('./individual-villa-list/individual-villa-list').then(m => m.IndividualVillaList) },
    { path: 'villa-projects-in-mohali', loadComponent: () => import('./individual-villa-list/individual-villa-list').then(m => m.IndividualVillaList) },
    { path: 'villa-projects-in-kanpur', loadComponent: () => import('./individual-villa-list/individual-villa-list').then(m => m.IndividualVillaList) },
    { path: 'villa-projects-in-thane', loadComponent: () => import('./individual-villa-list/individual-villa-list').then(m => m.IndividualVillaList) },
    { path: 'villa-projects-in-jamshedpur', loadComponent: () => import('./individual-villa-list/individual-villa-list').then(m => m.IndividualVillaList) },
    { path: 'villa-projects-in-belgaum', loadComponent: () => import('./individual-villa-list/individual-villa-list').then(m => m.IndividualVillaList) },
    { path: 'villa-projects-in-puri', loadComponent: () => import('./individual-villa-list/individual-villa-list').then(m => m.IndividualVillaList) },
    { path: 'villa-projects-in-meerut', loadComponent: () => import('./individual-villa-list/individual-villa-list').then(m => m.IndividualVillaList) },
    { path: 'villa-projects-in-tiruvannamalai', loadComponent: () => import('./individual-villa-list/individual-villa-list').then(m => m.IndividualVillaList) },
    { path: 'villa-projects-in-satara', loadComponent: () => import('./individual-villa-list/individual-villa-list').then(m => m.IndividualVillaList) },
    { path: 'villa-projects-in-junagadh', loadComponent: () => import('./individual-villa-list/individual-villa-list').then(m => m.IndividualVillaList) },
    { path: 'villa-projects-in-vadodara', loadComponent: () => import('./individual-villa-list/individual-villa-list').then(m => m.IndividualVillaList) },
    { path: 'villa-projects-in-palwal', loadComponent: () => import('./individual-villa-list/individual-villa-list').then(m => m.IndividualVillaList) },
    { path: 'villa-projects-in-panchkula', loadComponent: () => import('./individual-villa-list/individual-villa-list').then(m => m.IndividualVillaList) },
    { path: 'villa-projects-in-panipat', loadComponent: () => import('./individual-villa-list/individual-villa-list').then(m => m.IndividualVillaList) },
    { path: 'villa-projects-in-calicut', loadComponent: () => import('./individual-villa-list/individual-villa-list').then(m => m.IndividualVillaList) },
    { path: 'villa-projects-in-pathanamthitta', loadComponent: () => import('./individual-villa-list/individual-villa-list').then(m => m.IndividualVillaList) },
    { path: 'villa-projects-in-haridwar', loadComponent: () => import('./individual-villa-list/individual-villa-list').then(m => m.IndividualVillaList) },
    { path: 'villa-projects-in-solan', loadComponent: () => import('./individual-villa-list/individual-villa-list').then(m => m.IndividualVillaList) },
    { path: 'villa-projects-in-burhanpur', loadComponent: () => import('./individual-villa-list/individual-villa-list').then(m => m.IndividualVillaList) },
    { path: 'villa-projects-in-raipur', loadComponent: () => import('./individual-villa-list/individual-villa-list').then(m => m.IndividualVillaList) },
    { path: 'villa-projects-in-kanchipuram', loadComponent: () => import('./individual-villa-list/individual-villa-list').then(m => m.IndividualVillaList) },
    { path: 'villa-projects-in-pondicherry', loadComponent: () => import('./individual-villa-list/individual-villa-list').then(m => m.IndividualVillaList) },
    { path: 'villa-projects-in-siliguri', loadComponent: () => import('./individual-villa-list/individual-villa-list').then(m => m.IndividualVillaList) },
    { path: 'villa-projects-in-gandhinagar', loadComponent: () => import('./individual-villa-list/individual-villa-list').then(m => m.IndividualVillaList) },
    { path: 'villa-projects-in-ajmer', loadComponent: () => import('./individual-villa-list/individual-villa-list').then(m => m.IndividualVillaList) },
    { path: 'villa-projects-in-varanasi', loadComponent: () => import('./individual-villa-list/individual-villa-list').then(m => m.IndividualVillaList) },
    { path: 'villa-projects-in-mathura', loadComponent: () => import('./individual-villa-list/individual-villa-list').then(m => m.IndividualVillaList) },
    { path: 'villa-projects-in-dindigul', loadComponent: () => import('./individual-villa-list/individual-villa-list').then(m => m.IndividualVillaList) },
    { path: 'villa-projects-in-rewari', loadComponent: () => import('./individual-villa-list/individual-villa-list').then(m => m.IndividualVillaList) },
    { path: 'villa-projects-in-solapur', loadComponent: () => import('./individual-villa-list/individual-villa-list').then(m => m.IndividualVillaList) },
    { path: 'villa-projects-in-ratnagiri', loadComponent: () => import('./individual-villa-list/individual-villa-list').then(m => m.IndividualVillaList) },
    { path: 'villa-projects-in-shantiniketan', loadComponent: () => import('./individual-villa-list/individual-villa-list').then(m => m.IndividualVillaList) },
    { path: 'villa-projects-in-rishikesh', loadComponent: () => import('./individual-villa-list/individual-villa-list').then(m => m.IndividualVillaList) },
    { path: 'villa-projects-in-rajkor', loadComponent: () => import('./individual-villa-list/individual-villa-list').then(m => m.IndividualVillaList) },
    { path: 'villa-projects-in-hapur', loadComponent: () => import('./individual-villa-list/individual-villa-list').then(m => m.IndividualVillaList) },
    { path: 'villa-projects-in-chamarajnagar', loadComponent: () => import('./individual-villa-list/individual-villa-list').then(m => m.IndividualVillaList) },
    { path: 'villa-projects-in-gulbarga', loadComponent: () => import('./individual-villa-list/individual-villa-list').then(m => m.IndividualVillaList) },
    { path: 'villa-projects-in-alwar', loadComponent: () => import('./individual-villa-list/individual-villa-list').then(m => m.IndividualVillaList) },
    { path: 'villa-projects-in-tirunelveli', loadComponent: () => import('./individual-villa-list/individual-villa-list').then(m => m.IndividualVillaList) },
    { path: 'villa-projects-in-raigad', loadComponent: () => import('./individual-villa-list/individual-villa-list').then(m => m.IndividualVillaList) },
    { path: 'villa-projects-in-rajkot', loadComponent: () => import('./individual-villa-list/individual-villa-list').then(m => m.IndividualVillaList) },
    { path: 'villa-projects-in-purba-medinipur', loadComponent: () => import('./individual-villa-list/individual-villa-list').then(m => m.IndividualVillaList) },
    { path: 'villa-projects-in-chamarajanagar', loadComponent: () => import('./individual-villa-list/individual-villa-list').then(m => m.IndividualVillaList) },
    { path: 'villa-projects-in-sangli', loadComponent: () => import('./individual-villa-list/individual-villa-list').then(m => m.IndividualVillaList) },
    { path: 'villa-projects-in-ayodhya', loadComponent: () => import('./individual-villa-list/individual-villa-list').then(m => m.IndividualVillaList) },
    { path: 'villa-projects-in-bhiwadi', loadComponent: () => import('./individual-villa-list/individual-villa-list').then(m => m.IndividualVillaList) },
    { path: 'villa-projects-in-kottayam', loadComponent: () => import('./individual-villa-list/individual-villa-list').then(m => m.IndividualVillaList) },
    { path: 'villa-projects-in-kannur', loadComponent: () => import('./individual-villa-list/individual-villa-list').then(m => m.IndividualVillaList) },
    { path: 'villa-projects-in-neemrana', loadComponent: () => import('./individual-villa-list/individual-villa-list').then(m => m.IndividualVillaList) },
    { path: 'villa-projects-in-thanjavur', loadComponent: () => import('./individual-villa-list/individual-villa-list').then(m => m.IndividualVillaList) },
    { path: 'villa-projects-in-kota', loadComponent: () => import('./individual-villa-list/individual-villa-list').then(m => m.IndividualVillaList) },
    { path: 'villa-projects-in-bilaspur', loadComponent: () => import('./individual-villa-list/individual-villa-list').then(m => m.IndividualVillaList) },
    { path: 'villa-projects-in-navsari', loadComponent: () => import('./individual-villa-list/individual-villa-list').then(m => m.IndividualVillaList) },
    { path: 'villa-projects-in-davanegere', loadComponent: () => import('./individual-villa-list/individual-villa-list').then(m => m.IndividualVillaList) },
    { path: 'villa-projects-in-jabalpur', loadComponent: () => import('./individual-villa-list/individual-villa-list').then(m => m.IndividualVillaList) },
    { path: 'villa-projects-in-gwalior', loadComponent: () => import('./individual-villa-list/individual-villa-list').then(m => m.IndividualVillaList) },
    { path: 'villa-projects-in-ujjain', loadComponent: () => import('./individual-villa-list/individual-villa-list').then(m => m.IndividualVillaList) },
    { path: 'villa-projects-in-salem', loadComponent: () => import('./individual-villa-list/individual-villa-list').then(m => m.IndividualVillaList) },
    { path: 'villa-projects-in-erode', loadComponent: () => import('./individual-villa-list/individual-villa-list').then(m => m.IndividualVillaList) },
    { path: 'villa-projects-in-thoothukudi', loadComponent: () => import('./individual-villa-list/individual-villa-list').then(m => m.IndividualVillaList) },
    { path: 'villa-projects-in-bareilly', loadComponent: () => import('./individual-villa-list/individual-villa-list').then(m => m.IndividualVillaList) },
    { path: 'villa-projects-in-jhansi', loadComponent: () => import('./individual-villa-list/individual-villa-list').then(m => m.IndividualVillaList) },
    { path: 'villa-projects-in-tiruchirappalli', loadComponent: () => import('./individual-villa-list/individual-villa-list').then(m => m.IndividualVillaList) },
    { path: 'villa-projects-in-hosur', loadComponent: () => import('./individual-villa-list/individual-villa-list').then(m => m.IndividualVillaList) },
    { path: 'villa-projects-in-madurai', loadComponent: () => import('./individual-villa-list/individual-villa-list').then(m => m.IndividualVillaList) },
    { path: 'villa-projects-in-namakkal', loadComponent: () => import('./individual-villa-list/individual-villa-list').then(m => m.IndividualVillaList) },
    { path: 'villa-projects-in-tiruppur', loadComponent: () => import('./individual-villa-list/individual-villa-list').then(m => m.IndividualVillaList) },
    { path: 'villa-projects-in-vellore', loadComponent: () => import('./individual-villa-list/individual-villa-list').then(m => m.IndividualVillaList) },
    { path: 'villa-projects-in-viluppuram', loadComponent: () => import('./individual-villa-list/individual-villa-list').then(m => m.IndividualVillaList) },
    { path: 'villa-projects-in-koonimedu', loadComponent: () => import('./individual-villa-list/individual-villa-list').then(m => m.IndividualVillaList) },
    { path: 'villa-projects-in-theni', loadComponent: () => import('./individual-villa-list/individual-villa-list').then(m => m.IndividualVillaList) },
    { path: 'villa-projects-in-kotagiri', loadComponent: () => import('./individual-villa-list/individual-villa-list').then(m => m.IndividualVillaList) },
    { path: 'villa-projects-in-krishnagri', loadComponent: () => import('./individual-villa-list/individual-villa-list').then(m => m.IndividualVillaList) },

    // ----------------------------individual locality listing---------------------------------

    { path: 'buy/:projects-for-sale-in-:localityname-:cityname-:localityid', loadComponent: () => import('./individual-locality-list/individual-locality-list').then(m => m.IndividualLocalityList) },


    // --------------------------individual listing-------------------
    {
        path: 'rental/:flats-for-rent-in-:localityname-:cityname-:id',
        loadComponent: () => import('./rent-locality-listing/rent-locality-listing').then(m => m.RentLocalityListing)
    },

    // ---------------rent listing------------------------------

    //  {
    //     path: 'smart-property-finder', loadComponent: () => import('./ai-property-finder/ai-property-finder').then((m) => m.AiPropertyFinderComponent),
    // },

    {
        path: 'rent/:house-for-rent-in-:cityname',
        loadComponent: () => import('./rentlist/rentlist').then(m => m.Rentlist)
    },
    {
        path: 'rent/:flats-for-rent-in-:cityname',
        loadComponent: () => import('./rentlist/rentlist').then(m => m.Rentlist)
    },
    {
        path: 'rent/:villas-for-rent-in-:cityname',
        loadComponent: () => import('./rentlist/rentlist').then(m => m.Rentlist)
    },
    {
        path: 'rent/:plots-for-rent-in-:cityname',
        loadComponent: () => import('./rentlist/rentlist').then(m => m.Rentlist)
    },
    {
        path: 'rent/:independent-house-for-rent-in-:cityname',
        loadComponent: () => import('./rentlist/rentlist').then(m => m.Rentlist)
    },
    {
        path: 'rent/:flats-for-rent-in-:cityname-price-minprice-maxprice',
        loadComponent: () => import('./rentlist/rentlist').then(m => m.Rentlist)
    },

    // builder locality listing
    {
        path: 'bplc/:buildername-properties-in-:locname-:city-:localityid-:builderid',
        loadComponent: () => import('./builder-locality-new/builder-locality-new').then(m => m.BuilderLocalityNew)
    },
    {
        path: 'baplc/:buildername-affordable-properties-in-:locname-:city-:localityid-:builderid',
        loadComponent: () => import('./builder-locality-new/builder-locality-new').then(m => m.BuilderLocalityNew)
    },
    {
        path: 'batlc/:buildername-affordable-apartments-in-:locname-:city-:localityid-:builderid',
        loadComponent: () => import('./builder-locality-new/builder-locality-new').then(m => m.BuilderLocalityNew)
    },
    {
        path: 'batlc/:buildername-affordable-villas-in-:locname-:city-:localityid-:builderid',
        loadComponent: () => import('./builder-locality-new/builder-locality-new').then(m => m.BuilderLocalityNew)
    },
    {
        path: 'blplc/:buildername-luxury-properties-in-:locname-:city-:localityid-:builderid',
        loadComponent: () => import('./builder-locality-new/builder-locality-new').then(m => m.BuilderLocalityNew)
    },
    {
        path: 'bltlc/:buildername-luxury-apartments-in-:locname-:city-:localityid-:builderid',
        loadComponent: () => import('./builder-locality-new/builder-locality-new').then(m => m.BuilderLocalityNew)
    },
    {
        path: 'bltlc/:buildername-luxury-villas-in-:locname-:city-:localityid-:builderid',
        loadComponent: () => import('./builder-locality-new/builder-locality-new').then(m => m.BuilderLocalityNew)
    },
    {
        path: 'bldtlc/:buildername-apartments-in-:locname-:city-:localityid-:builderid',
        loadComponent: () => import('./builder-locality-new/builder-locality-new').then(m => m.BuilderLocalityNew)
    },
    {
        path: 'bldtlc/:buildername-villas-in-:locname-:city-:localityid-:builderid',
        loadComponent: () => import('./builder-locality-new/builder-locality-new').then(m => m.BuilderLocalityNew)
    },
    {
        path: 'sbplc/:status-:buildername-propeties-in-:city-:localityid-:builderid',
        loadComponent: () => import('./builder-locality-new/builder-locality-new').then(m => m.BuilderLocalityNew)
    },
    {
        path: 'sbtlc/:status-:buildername-apartments-in-:city-:localityid-:builderid',
        loadComponent: () => import('./builder-locality-new/builder-locality-new').then(m => m.BuilderLocalityNew)
    },
    {
        path: 'sbtlc/:status-:buildername-villas-in-:city-:localityid-:builderid',
        loadComponent: () => import('./builder-locality-new/builder-locality-new').then(m => m.BuilderLocalityNew)
    },
    // builder listing
    {
        path: 'bbc/:buildername-properties-under-30-lakhs-in-:city-:builderid',
        loadComponent: () => import('./builder-new/builder-new').then(m => m.BuilderNew)
    },

    {
        path: 'bbc/:buildername-properties-30-lakhs-to-40-lakhs-in-:city-:builderid',
        loadComponent: () => import('./builder-new/builder-new').then(m => m.BuilderNew)
    },

    {
        path: 'bbc/:buildername-properties-40-lakhs-to-50-lakhs-in-:city-:builderid',
        loadComponent: () => import('./builder-new/builder-new').then(m => m.BuilderNew)
    },


    {
        path: 'bbc/:buildername-properties-50-lakhs-to-60-lakhs-in-:city-:builderid',
        loadComponent: () => import('./builder-new/builder-new').then(m => m.BuilderNew)
    },


    {
        path: 'bbc/:buildername-properties-60-lakhs-to-70-lakhs-in-:city-:builderid',
        loadComponent: () => import('./builder-new/builder-new').then(m => m.BuilderNew)
    },


    {
        path: 'bbc/:buildername-properties-70-lakhs-to-80-lakhs-in-:city-:builderid',
        loadComponent: () => import('./builder-new/builder-new').then(m => m.BuilderNew)
    },


    {
        path: 'bbc/:buildername-properties-80-lakhs-to-90-lakhs-in-:city-:builderid',
        loadComponent: () => import('./builder-new/builder-new').then(m => m.BuilderNew)
    },


    {
        path: 'bbc/:buildername-properties-90-lakhs-to-1-crore-in-:city-:builderid',
        loadComponent: () => import('./builder-new/builder-new').then(m => m.BuilderNew)
    },


    {
        path: 'bbc/:buildername-properties-above-1-crore-in-:city-:builderid',
        loadComponent: () => import('./builder-new/builder-new').then(m => m.BuilderNew)
    },


    {
        path: 'spbc/:status-properties-by-:buildername-:city-:builderid',
        loadComponent: () => import('./builder-new/builder-new').then(m => m.BuilderNew)
    },


    {
        path: 'stbc/:status-:proptype-by-:buildername-:city-:builderid',
        loadComponent: () => import('./builder-new/builder-new').then(m => m.BuilderNew)
    },


    {
        path: 'btbc/:bhk-flats-by-:buildername-:city-:builderid',
        loadComponent: () => import('./builder-new/builder-new').then(m => m.BuilderNew)
    },


    {
        path: 'bapc/:buildername-affordable-properties-in-:city-:builderid',
        loadComponent: () => import('./builder-new/builder-new').then(m => m.BuilderNew)
    },


    {
        path: 'blpc/:buildername-luxury-properties-in-:city-:builderid',
        loadComponent: () => import('./builder-new/builder-new').then(m => m.BuilderNew)
    },


    {
        path: 'batc/:buildername-affordable-properties-in-:city-:builderid',
        loadComponent: () => import('./builder-new/builder-new').then(m => m.BuilderNew)
    },


    {
        path: 'batc/:buildername-affordable-apartments-in-:city-:builderid',
        loadComponent: () => import('./builder-new/builder-new').then(m => m.BuilderNew)
    },


    {
        path: 'batc/:buildername-affordable-villas-in-:city-:builderid',
        loadComponent: () => import('./builder-new/builder-new').then(m => m.BuilderNew)
    },


    {
        path: 'bltc/:buildername-luxury-properties-in-:city-:builderid',
        loadComponent: () => import('./builder-new/builder-new').then(m => m.BuilderNew)
    },


    {
        path: 'bltc/:buildername-luxury-apartments-in-:city-:builderid',
        loadComponent: () => import('./builder-new/builder-new').then(m => m.BuilderNew)
    },


    {
        path: 'bltc/:buildername-luxury-villas-in-:city-:builderid',
        loadComponent: () => import('./builder-new/builder-new').then(m => m.BuilderNew)
    },


    {
        path: 'brtc/:buildername-apartments-in-:city-:builderid',
        loadComponent: () => import('./builder-new/builder-new').then(m => m.BuilderNew)
    },


    {
        path: 'brtc/:buildername-villas-in-:city-:builderid',
        loadComponent: () => import('./builder-new/builder-new').then(m => m.BuilderNew)
    },


    {
        path: 'brtc/:buildername-plots-in-:city-:builderid',
        loadComponent: () => import('./builder-new/builder-new').then(m => m.BuilderNew)
    },


    {
        path: ':cityname/builder/:buildername-:builderid',
        loadComponent: () => import('./builder-new/builder-new').then(m => m.BuilderNew)
    },
    // Propetype with locality
    {
        path: 'apartments-in-yeshwanthpur-bangalore',
        loadComponent: () => import('./property-with-locality/property-with-locality').then(m => m.PropertyWithLocality),
    },
    {
        path: 'apartments-in-mysore-road-bangalore',
        loadComponent: () => import('./property-with-locality/property-with-locality').then(m => m.PropertyWithLocality),
    },
    {
        path: 'apartments-in-kanakapura-road-bangalore',
        loadComponent: () => import('./property-with-locality/property-with-locality').then(m => m.PropertyWithLocality),
    },
    {
        path: 'apartments-in-old-madras-road-bangalore',
        loadComponent: () => import('./property-with-locality/property-with-locality').then(m => m.PropertyWithLocality),
    },
    {
        path: 'apartments-in-yelahanka-bangalore',
        loadComponent: () => import('./property-with-locality/property-with-locality').then(m => m.PropertyWithLocality),
    },
    {
        path: 'apartments-in-jakkur-bangalore',
        loadComponent: () => import('./property-with-locality/property-with-locality').then(m => m.PropertyWithLocality),
    },
    {
        path: 'apartments-in-electronic-city-phase-2-bangalore',
        loadComponent: () => import('./property-with-locality/property-with-locality').then(m => m.PropertyWithLocality),
    },
    {
        path: 'apartments-in-electronic-city-phase-1-bangalore',
        loadComponent: () => import('./property-with-locality/property-with-locality').then(m => m.PropertyWithLocality),
    },
    {
        path: 'apartments-in-thanisandra-bangalore',
        loadComponent: () => import('./property-with-locality/property-with-locality').then(m => m.PropertyWithLocality),
    },
    {
        path: 'apartments-in-hennur-road-bangalore',
        loadComponent: () => import('./property-with-locality/property-with-locality').then(m => m.PropertyWithLocality),
    },
    {
        path: 'apartments-in-haralur-road-bangalore',
        loadComponent: () => import('./property-with-locality/property-with-locality').then(m => m.PropertyWithLocality),
    },
    {
        path: 'apartments-in-k-r-puram-bangalore',
        loadComponent: () => import('./property-with-locality/property-with-locality').then(m => m.PropertyWithLocality),
    },
    {
        path: 'apartments-in-bellandur-bangalore',
        loadComponent: () => import('./property-with-locality/property-with-locality').then(m => m.PropertyWithLocality),
    },
    {
        path: 'apartments-in-varthur-bangalore',
        loadComponent: () => import('./property-with-locality/property-with-locality').then(m => m.PropertyWithLocality),
    },
    {
        path: 'apartments-in-koramangala-bangalore',
        loadComponent: () => import('./property-with-locality/property-with-locality').then(m => m.PropertyWithLocality),
    },
    {
        path: 'apartments-in-mahadevapura-bangalore',
        loadComponent: () => import('./property-with-locality/property-with-locality').then(m => m.PropertyWithLocality),
    },
    {
        path: 'apartments-in-marathahalli-bangalore',
        loadComponent: () => import('./property-with-locality/property-with-locality').then(m => m.PropertyWithLocality),
    },
    {
        path: 'apartments-in-electronic-city-bangalore',
        loadComponent: () => import('./property-with-locality/property-with-locality').then(m => m.PropertyWithLocality),
    },
    {
        path: 'apartments-in-whitefield-bangalore',
        loadComponent: () => import('./property-with-locality/property-with-locality').then(m => m.PropertyWithLocality),
    },
    {
        path: 'apartments-in-sarjapur-road-bangalore',
        loadComponent: () => import('./property-with-locality/property-with-locality').then(m => m.PropertyWithLocality),
    },
    {
        path: 'apartments-in-sarjapur-bangalore',
        loadComponent: () => import('./property-with-locality/property-with-locality').then(m => m.PropertyWithLocality),
    },
    {
        path: 'apartments-in-bannerghatta-road-bangalore',
        loadComponent: () => import('./property-with-locality/property-with-locality').then(m => m.PropertyWithLocality),
    },




    {
        path: 'villas-in-kanakapura-road-bangalore',
        loadComponent: () => import('./property-with-locality/property-with-locality').then(m => m.PropertyWithLocality),
    },
    {
        path: 'villas-in-chandapura-bangalore',
        loadComponent: () => import('./property-with-locality/property-with-locality').then(m => m.PropertyWithLocality),
    },
    {
        path: 'villas-in-yelahanka-bangalore',
        loadComponent: () => import('./property-with-locality/property-with-locality').then(m => m.PropertyWithLocality),
    },
    {
        path: 'villas-in-budigere-cross-bangalore',
        loadComponent: () => import('./property-with-locality/property-with-locality').then(m => m.PropertyWithLocality),
    },
    {
        path: 'villas-in-varthur-bangalore',
        loadComponent: () => import('./property-with-locality/property-with-locality').then(m => m.PropertyWithLocality),
    },
    {
        path: 'villas-in-sarjapur-bangalore',
        loadComponent: () => import('./property-with-locality/property-with-locality').then(m => m.PropertyWithLocality),
    },
    {
        path: 'villas-in-electronic-city-bangalore',
        loadComponent: () => import('./property-with-locality/property-with-locality').then(m => m.PropertyWithLocality),
    },
    {
        path: 'villas-in-whitefield-bangalore',
        loadComponent: () => import('./property-with-locality/property-with-locality').then(m => m.PropertyWithLocality),
    },
    {
        path: 'villas-in-sarjapur-road-bangalore',
        loadComponent: () => import('./property-with-locality/property-with-locality').then(m => m.PropertyWithLocality),
    },
    {
        path: 'villas-in-marathahalli-bangalore',
        loadComponent: () => import('./property-with-locality/property-with-locality').then(m => m.PropertyWithLocality),
    },
    {
        path: 'villas-in-bannerghatta-road-bangalore',
        loadComponent: () => import('./property-with-locality/property-with-locality').then(m => m.PropertyWithLocality),
    },

    {
        path: 'plots-in-sarjapur-road-bangalore',
        loadComponent: () => import('./property-with-locality/property-with-locality').then(m => m.PropertyWithLocality),
    },
    {
        path: 'plots-in-electronic-city-bangalore',
        loadComponent: () => import('./property-with-locality/property-with-locality').then(m => m.PropertyWithLocality),
    },
    {
        path: 'plots-in-kanakapura-road-bangalore',
        loadComponent: () => import('./property-with-locality/property-with-locality').then(m => m.PropertyWithLocality),
    },
    {
        path: 'plots-for-sale-in-yelahanka-bangalore',
        loadComponent: () => import('./property-with-locality/property-with-locality').then(m => m.PropertyWithLocality),
    },
    {
        path: 'plots-for-sale-in-whitefield-bangalore',
        loadComponent: () => import('./property-with-locality/property-with-locality').then(m => m.PropertyWithLocality),
    },
    {
        path: 'plots-for-sale-in-varthur-bangalore',
        loadComponent: () => import('./property-with-locality/property-with-locality').then(m => m.PropertyWithLocality),
    },



    // Buy city based listing
    {
        path: 'fbc/:flats-for-30-lakhs-in-city-for-sale', loadComponent: () => import('./city-based-listing/city-based-listing').then((m) => m.CityBasedListing),
    },
    {
        path: 'fbc/:flats-in-city-for-sale-30-lakhs-to-40-lakhs', loadComponent: () => import('./city-based-listing/city-based-listing').then((m) => m.CityBasedListing),
    },
    {
        path: 'fbc/:flats-in-city-for-sale-40-lakhs-to-50-lakhs', loadComponent: () => import('./city-based-listing/city-based-listing').then((m) => m.CityBasedListing),
    },
    {
        path: 'fbc/:flats-in-city-for-sale-50-lakhs-to-60-lakhs', loadComponent: () => import('./city-based-listing/city-based-listing').then((m) => m.CityBasedListing),
    },
    {
        path: 'fbc/:flats-in-city-for-sale-60-lakhs-to-70-lakhs', loadComponent: () => import('./city-based-listing/city-based-listing').then((m) => m.CityBasedListing),
    },
    {
        path: 'fbc/:flats-in-city-for-sale-70-lakhs-to-80-lakhs', loadComponent: () => import('./city-based-listing/city-based-listing').then((m) => m.CityBasedListing),
    },
    {
        path: 'fbc/:flats-in-city-for-sale-80-lakhs-to-90-lakhs', loadComponent: () => import('./city-based-listing/city-based-listing').then((m) => m.CityBasedListing),
    },
    {
        path: 'fbc/:flats-in-city-for-sale-90-lakhs-to-1-crore', loadComponent: () => import('./city-based-listing/city-based-listing').then((m) => m.CityBasedListing),
    },




    {
        path: 'atc/:affordable-flats-in-:cityname', loadComponent: () => import('./city-based-listing/city-based-listing').then((m) => m.CityBasedListing),
    },
    {
        path: 'ltc/:luxury-flats-in-:cityname', loadComponent: () => import('./city-based-listing/city-based-listing').then((m) => m.CityBasedListing),
    },
    {
        path: 'home-for-sale-in-:cityname', loadComponent: () => import('./city-based-listing/city-based-listing').then((m) => m.CityBasedListing),
    },
    {
        path: 'villas-for-sale-in-:cityname', loadComponent: () => import('./city-based-listing/city-based-listing').then((m) => m.CityBasedListing),
    },
    {
        path: 'plots-in-:cityname', loadComponent: () => import('./city-based-listing/city-based-listing').then((m) => m.CityBasedListing),
    },
    {
        path: 'agricultural-land-for-sale-in-:cityname', loadComponent: () => import('./city-based-listing/city-based-listing').then((m) => m.CityBasedListing),
    },
    {
        path: 'bstc/:bhk-:ready-to-move-:propertytype-in-:locality-:city-:localityId', loadComponent: () => import('./city-based-listing/city-based-listing').then((m) => m.CityBasedListing),
    },
    {
        path: 'btac/:bhk-:ready-to-move-:propertytype-in-:locality-:city-:localityId', loadComponent: () => import('./city-based-listing/city-based-listing').then((m) => m.CityBasedListing),
    },
    {
        path: 'btluc/:bhk-:ready-to-move-:propertytype-in-:locality-:city-:localityId', loadComponent: () => import('./city-based-listing/city-based-listing').then((m) => m.CityBasedListing),
    },
    {
        path: 'btc/:bhk-:ready-to-move-:propertytype-in-:locality-:city-:localityId', loadComponent: () => import('./city-based-listing/city-based-listing').then((m) => m.CityBasedListing),
    },
    {
        path: 'ready-to-move-apartments/:status-:propertytype-in-:city', loadComponent: () => import('./city-based-listing/city-based-listing').then((m) => m.CityBasedListing),
    },
    {
        path: 'new-launch-projects/:status-:propertytype-in-:city', loadComponent: () => import('./city-based-listing/city-based-listing').then((m) => m.CityBasedListing),
    },
    {
        path: ':cityname/property-sale', loadComponent: () => import('./city-based-listing/city-based-listing').then((m) => m.CityBasedListing),
    },
    {
        path: 'apc/:affordable-projects-in-:cityname', loadComponent: () => import('./city-based-listing/city-based-listing').then((m) => m.CityBasedListing),
    },
    {
        path: 'lpc/:luxury-projects-in-:cityname', loadComponent: () => import('./city-based-listing/city-based-listing').then((m) => m.CityBasedListing),
    },
    {
        path: ':cityname/status/:statusname-:statusid', loadComponent: () => import('./city-based-listing/city-based-listing').then((m) => m.CityBasedListing),
    },
    {
        path: ':cityname/zone/:zonename-:zoneid', loadComponent: () => import('./city-based-listing/city-based-listing').then((m) => m.CityBasedListing),
    },
    {
        path: ':residential-flats-in-:cityname-for-sale', loadComponent: () => import('./city-based-listing/city-based-listing').then((m) => m.CityBasedListing),
    },















    // locality based listing
    {
        path: 'atlc/:affordable-flats-in-:localityname-:cityname-:localityid', loadComponent: () => import('./locality-based-listing/locality-based-listing').then((m) => m.LocalityBasedListing),
    },
    {
        path: 'ltlc/:luxury-flats-in-:localityname-:cityname-:localityid', loadComponent: () => import('./locality-based-listing/locality-based-listing').then((m) => m.LocalityBasedListing),
    },
    {
        path: 'btlc/:bhk-:propertytype-in-:locality-:cityname-:localityid', loadComponent: () => import('./locality-based-listing/locality-based-listing').then((m) => m.LocalityBasedListing),
    },
    {
        path: 'upcoming-new-launch-properties/:new-projects-in-:locality-:cityname-:localityid', loadComponent: () => import('./locality-based-listing/locality-based-listing').then((m) => m.LocalityBasedListing),
    },
    {
        path: 'bstlc/:bhk-:ready-to-move-:propertytype-in-:locality-:cityname-:localityid', loadComponent: () => import('./locality-based-listing/locality-based-listing').then((m) => m.LocalityBasedListing),
    },
    {
        path: 'btalc/:bhk-:ready-to-move-:propertytype-in-:locality-:cityname-:localityid', loadComponent: () => import('./locality-based-listing/locality-based-listing').then((m) => m.LocalityBasedListing),
    },
    {
        path: 'btllc/:bhk-:ready-to-move-:propertytype-in-:locality-:cityname-:localityid', loadComponent: () => import('./locality-based-listing/locality-based-listing').then((m) => m.LocalityBasedListing),
    },
    {
        path: 'stlc/:status-:propertytype-in-:localityname-:cityname-:localityid', loadComponent: () => import('./locality-based-listing/locality-based-listing').then((m) => m.LocalityBasedListing),
    },
    {
        path: 'aplc/:affordable-projects-in-:-locality-:cityname-:localityid', loadComponent: () => import('./locality-based-listing/locality-based-listing').then((m) => m.LocalityBasedListing),
    },
    {
        path: 'lplc/:luxury-projects-in-:locality-:cityname-:localityid', loadComponent: () => import('./locality-based-listing/locality-based-listing').then((m) => m.LocalityBasedListing),
    },
    {
        path: ':cityname/:staticlocurl-:localityname-:localityid', loadComponent: () => import('./locality-based-listing/locality-based-listing').then((m) => m.LocalityBasedListing),
    },
    {
        path: '',
        loadComponent: () => import('./all-india/all-india').then(m => m.AllIndia)
    },

    // ----------------------rent locality--------------------------


];
