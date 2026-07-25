import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [

  {
    path: '',
    renderMode: RenderMode.Server
  },
  {
    path: 'fbc/:flats-for-30-lakhs-in-city-for-sale',
    renderMode: RenderMode.Server
  },
  {
    path: 'fbc/:flats-in-city-for-sale-30-lakhs-to-40-lakhs',
    renderMode: RenderMode.Server
  },
  {
    path: 'fbc/:flats-in-city-for-sale-40-lakhs-to-50-lakhs',
    renderMode: RenderMode.Server
  },
  {
    path: 'fbc/:flats-in-city-for-sale-50-lakhs-to-60-lakhs',
    renderMode: RenderMode.Server
  },
  {
    path: 'fbc/:flats-in-city-for-sale-60-lakhs-to-70-lakhs',
    renderMode: RenderMode.Server
  },
  {
    path: 'fbc/:flats-in-city-for-sale-70-lakhs-to-80-lakhs',
    renderMode: RenderMode.Server
  },
  {
    path: 'fbc/:flats-in-city-for-sale-80-lakhs-to-90-lakhs',
    renderMode: RenderMode.Server
  },
  {
    path: 'fbc/:flats-in-city-for-sale-90-lakhs-to-1-crore',
    renderMode: RenderMode.Server
  },
  {
    path: 'atc/:affordable-flats-in-:cityname',
    renderMode: RenderMode.Server
  },
  {
    path: 'ltc/:luxury-flats-in-:cityname',
    renderMode: RenderMode.Server
  },
  {
    path: 'home-for-sale-in-:cityname',
    renderMode: RenderMode.Server
  },
  {
    path: 'villas-for-sale-in-:cityname',
    renderMode: RenderMode.Server
  },
  {
    path: 'plots-in-:cityname',
    renderMode: RenderMode.Server
  },
  {
    path: 'bstc/:bhk-:ready-to-move-:propertytype-in-:locality-:city-:localityId',
    renderMode: RenderMode.Server
  },
  {
    path: 'btac/:bhk-:ready-to-move-:propertytype-in-:locality-:city-:localityId',
    renderMode: RenderMode.Server
  },
  {
    path: 'btluc/:bhk-:ready-to-move-:propertytype-in-:locality-:city-:localityId',
    renderMode: RenderMode.Server
  },
  {
    path: 'btc/:bhk-:ready-to-move-:propertytype-in-:locality-:city-:localityId',
    renderMode: RenderMode.Server
  },
  {
    path: 'ready-to-move-apartments/:status-:propertytype-in-:city',
    renderMode: RenderMode.Server
  },
  {
    path: 'new-launch-projects/:status-:propertytype-in-:city',
    renderMode: RenderMode.Server
  },
  {
    path: ':cityname/property-sale',
    renderMode: RenderMode.Server
  },
  {
    path: 'apc/:affordable-projects-in-:cityname',
    renderMode: RenderMode.Server
  },
  {
    path: 'lpc/:luxury-projects-in-:cityname',
    renderMode: RenderMode.Server
  },
  {
    path: ':cityname/status/:statusname-:statusid',
    renderMode: RenderMode.Server
  },
  {
    path: ':cityname/zone/:zonename-:zoneid',
    renderMode: RenderMode.Server
  },
  {
    path: ':residential-flats-in-:cityname-for-sale',
    renderMode: RenderMode.Server
  },
  {
    path: 'atlc/:affordable-flats-in-:localityname-:cityname-:localityid',
    renderMode: RenderMode.Server
  },
  {
    path: 'ltlc/:luxury-flats-in-:localityname-:cityname-:localityid',
    renderMode: RenderMode.Server
  },
  {
    path: 'btlc/:bhk-:propertytype-in-:locality-:city-:localityId',
    renderMode: RenderMode.Server
  },
  {
    path: 'upcoming-new-launch-properties/:new-projects-in-:locality-:city-:localityId',
    renderMode: RenderMode.Server
  },
  {
    path: 'bstlc/:bhk-:ready-to-move-:propertytype-in-:locality-:city-:localityId',
    renderMode: RenderMode.Server
  },
  {
    path: 'btalc/:bhk-:ready-to-move-:propertytype-in-:locality-:city-:localityId',
    renderMode: RenderMode.Server
  },
  {
    path: 'btllc/:bhk-:ready-to-move-:propertytype-in-:locality-:city-:localityId',
    renderMode: RenderMode.Server
  },
  {
    path: 'stlc/:status-:propertytype-in-:localityname-:city-:localityId',
    renderMode: RenderMode.Server
  },
  {
    path: 'aplc/:affordable-projects-in-:-locality-:cityname-:localityid',
    renderMode: RenderMode.Server
  },
  {
    path: 'lplc/:luxury-projects-in-:locality-:cityname-:localityid',
    renderMode: RenderMode.Server
  },
  {
    path: ':cityname/:staticlocurl-:localityname-:localityid',
    renderMode: RenderMode.Server
  },
  {
    path: 'apartments-in-yeshwanthpur-bangalore',
    renderMode: RenderMode.Server
  },
  {
    path: 'apartments-in-mysore-road-bangalore',
    renderMode: RenderMode.Server
  },
  {
    path: 'apartments-in-kanakapura-road-bangalore',
    renderMode: RenderMode.Server
  },
  {
    path: 'apartments-in-old-madras-road-bangalore',
    renderMode: RenderMode.Server
  },
  {
    path: 'apartments-in-yelahanka-bangalore',
    renderMode: RenderMode.Server
  },
  {
    path: 'apartments-in-jakkur-bangalore',
    renderMode: RenderMode.Server
  },
  {
    path: 'apartments-in-electronic-city-phase-2-bangalore',
    renderMode: RenderMode.Server
  },
  {
    path: 'apartments-in-electronic-city-phase-1-bangalore',
    renderMode: RenderMode.Server
  },
  {
    path: 'apartments-in-thanisandra-bangalore',
    renderMode: RenderMode.Server
  },
  {
    path: 'apartments-in-hennur-road-bangalore',
    renderMode: RenderMode.Server
  },
  {
    path: 'apartments-in-haralur-road-bangalore',
    renderMode: RenderMode.Server
  },
  {
    path: 'apartments-in-k-r-puram-bangalore',
    renderMode: RenderMode.Server
  },
  {
    path: 'apartments-in-bellandur-bangalore',
    renderMode: RenderMode.Server
  },
  {
    path: 'apartments-in-varthur-bangalore',
    renderMode: RenderMode.Server
  },
  {
    path: 'apartments-in-koramangala-bangalore',
    renderMode: RenderMode.Server
  },
  {
    path: 'apartments-in-mahadevapura-bangalore',
    renderMode: RenderMode.Server
  },
  {
    path: 'apartments-in-marathahalli-bangalore',
    renderMode: RenderMode.Server
  },
  {
    path: 'apartments-in-electronic-city-bangalore',
    renderMode: RenderMode.Server
  },
  {
    path: 'apartments-in-whitefield-bangalore',
    renderMode: RenderMode.Server
  },
  {
    path: 'apartments-in-sarjapur-road-bangalore',
    renderMode: RenderMode.Server
  },
  {
    path: 'apartments-in-sarjapur-bangalore',
    renderMode: RenderMode.Server
  },
  {
    path: 'apartments-in-bannerghatta-road-bangalore',
    renderMode: RenderMode.Server
  },

  {
    path: 'villas-in-kanakapura-road-bangalore',
    renderMode: RenderMode.Server
  },
  {
    path: 'villas-in-chandapura-bangalore',
    renderMode: RenderMode.Server
  },
  {
    path: 'villas-in-yelahanka-bangalore',
    renderMode: RenderMode.Server
  },
  {
    path: 'villas-in-budigere-cross-bangalore',
    renderMode: RenderMode.Server
  },
  {
    path: 'villas-in-varthur-bangalore',
    renderMode: RenderMode.Server
  },
  {
    path: 'villas-in-sarjapur-bangalore',
    renderMode: RenderMode.Server
  },
  {
    path: 'villas-in-electronic-city-bangalore',
    renderMode: RenderMode.Server
  },
  {
    path: 'villas-in-whitefield-bangalore',
    renderMode: RenderMode.Server
  },
  {
    path: 'villas-in-sarjapur-road-bangalore',
    renderMode: RenderMode.Server
  },
  {
    path: 'villas-in-marathahalli-bangalore',
    renderMode: RenderMode.Server
  },
  {
    path: 'villas-in-bannerghatta-road-bangalore',
    renderMode: RenderMode.Server
  },

  {
    path: 'plots-in-sarjapur-road-bangalore',
    renderMode: RenderMode.Server
  },
  {
    path: 'plots-in-electronic-city-bangalore',
    renderMode: RenderMode.Server
  },
  {
    path: 'plots-in-kanakapura-road-bangalore',
    renderMode: RenderMode.Server
  },
  {
    path: 'plots-for-sale-in-yelahanka-bangalore',
    renderMode: RenderMode.Server
  },
  {
    path: 'plots-for-sale-in-whitefield-bangalore',
    renderMode: RenderMode.Server
  },
  {
    path: 'plots-for-sale-in-varthur-bangalore',
    renderMode: RenderMode.Server
  },
  {
    path: 'bbc/:buildername-properties-under-30-lakhs-in-:city-:builderid',
    renderMode: RenderMode.Server
  },
  {
    path: 'bbc/:buildername-properties-30-lakhs-to-40-lakhs-in-:city-:builderid',
    renderMode: RenderMode.Server
  },
  {
    path: 'bbc/:buildername-properties-40-lakhs-to-50-lakhs-in-:city-:builderid',
    renderMode: RenderMode.Server
  },
  {
    path: 'bbc/:buildername-properties-50-lakhs-to-60-lakhs-in-:city-:builderid',
    renderMode: RenderMode.Server
  },
  {
    path: 'bbc/:buildername-properties-60-lakhs-to-70-lakhs-in-:city-:builderid',
    renderMode: RenderMode.Server
  },
  {
    path: 'bbc/:buildername-properties-70-lakhs-to-80-lakhs-in-:city-:builderid',
    renderMode: RenderMode.Server
  },
  {
    path: 'bbc/:buildername-properties-80-lakhs-to-90-lakhs-in-:city-:builderid',
    renderMode: RenderMode.Server
  },
  {
    path: 'bbc/:buildername-properties-90-lakhs-to-1-crore-in-:city-:builderid',
    renderMode: RenderMode.Server
  },
  {
    path: 'bbc/:buildername-properties-above-1-crore-in-:city-:builderid',
    renderMode: RenderMode.Server
  },
  {
    path: 'spbc/:status-properties-by-:buildername-:city-:builderid',
    renderMode: RenderMode.Server
  },
  {
    path: 'stbc/:status-:proptype-by-:buildername-:city-:builderid',
    renderMode: RenderMode.Server
  },
  {
    path: 'btbc/:bhk-flats-by-:buildername-:city-:builderid',
    renderMode: RenderMode.Server
  },
  {
    path: 'bapc/:buildername-affordable-properties-in-:city-:builderid',
    renderMode: RenderMode.Server
  },
  {
    path: 'blpc/:buildername-luxury-properties-in-:city-:builderid',
    renderMode: RenderMode.Server
  },
  {
    path: 'batc/:buildername-affordable-properties-in-:city-:builderid',
    renderMode: RenderMode.Server
  },
  {
    path: 'batc/:buildername-affordable-apartments-in-:city-:builderid',
    renderMode: RenderMode.Server
  },
  {
    path: 'batc/:buildername-affordable-villas-in-:city-:builderid',
    renderMode: RenderMode.Server
  },
  {
    path: 'bltc/:buildername-luxury-properties-in-:city-:builderid',
    renderMode: RenderMode.Server
  },
  {
    path: 'bltc/:buildername-luxury-apartments-in-:city-:builderid',
    renderMode: RenderMode.Server
  },
  {
    path: 'bltc/:buildername-luxury-villas-in-:city-:builderid',
    renderMode: RenderMode.Server
  },
  {
    path: 'brtc/:buildername-apartments-in-:city-:builderid',
    renderMode: RenderMode.Server
  },
  {
    path: 'brtc/:buildername-villas-in-:city-:builderid',
    renderMode: RenderMode.Server
  },
  {
    path: 'brtc/:buildername-plots-in-:city-:builderid',
    renderMode: RenderMode.Server
  },
  {
    path: ':cityname/builder/:buildername-:builderid',
    renderMode: RenderMode.Server
  },
  {
    path: 'bplc/:buildername-properties-in-:locname-:city-:localityid-:builderid',
    renderMode: RenderMode.Server
  },
  {
    path: 'baplc/:buildername-affordable-properties-in-:locname-:city-:localityid-:builderid',
    renderMode: RenderMode.Server
  },
  {
    path: 'batlc/:buildername-affordable-apartments-in-:locname-:city-:localityid-:builderid',
    renderMode: RenderMode.Server
  },
  {
    path: 'batlc/:buildername-affordable-villas-in-:locname-:city-:localityid-:builderid',
    renderMode: RenderMode.Server
  },
  {
    path: 'blplc/:buildername-luxury-properties-in-:locname-:city-:localityid-:builderid',
    renderMode: RenderMode.Server
  },
  {
    path: 'bltlc/:buildername-luxury-apartments-in-:locname-:city-:localityid-:builderid',
    renderMode: RenderMode.Server
  },
  {
    path: 'bltlc/:buildername-luxury-villas-in-:locname-:city-:localityid-:builderid',
    renderMode: RenderMode.Server
  },
  {
    path: 'bldtlc/:buildername-apartments-in-:locname-:city-:localityid-:builderid',
    renderMode: RenderMode.Server
  },
  {
    path: 'bldtlc/:buildername-villas-in-:locname-:city-:localityid-:builderid',
    renderMode: RenderMode.Server
  },
  {
    path: 'sbplc/:status-:buildername-propeties-in-:city-:localityid-:builderid',
    renderMode: RenderMode.Server
  },
  {
    path: 'sbtlc/:status-:buildername-apartments-in-:city-:localityid-:builderid',
    renderMode: RenderMode.Server
  },
  {
    path: 'sbtlc/:status-:buildername-villas-in-:city-:localityid-:builderid',
    renderMode: RenderMode.Server
  },

  // ----------------------------rent list------------------------------------

  {
    path: 'rent/:house-for-rent-in-:cityname',
    renderMode: RenderMode.Server
  },
  {
    path: 'rent/:flats-for-rent-in-:cityname',
    renderMode: RenderMode.Server
  },
  {
    path: 'rent/:villas-for-rent-in-:cityname',
    renderMode: RenderMode.Server
  },
  {
    path: 'rent/:plots-for-rent-in-:cityname',
    renderMode: RenderMode.Server
  },
  {
    path: 'rent/:independent-house-for-rent-in-:cityname',
    renderMode: RenderMode.Server
  },
  {
    path: 'rent/:flats-for-rent-in-:cityname-price-minprice-maxprice',
    renderMode: RenderMode.Server
  },
  {
    path: 'cml/:commercial-properties-for-sale_rent-in-:localityname-:cityname-:localityid',
    renderMode: RenderMode.Server
  },
  {
    path: 'cll/:commercial-properties-for-sale_rent-in-:cityname',
    renderMode: RenderMode.Server
  },
  {
    path: 'pgll/:pg-for-rent-in-:localityname:-cityname-:id',
    renderMode: RenderMode.Server
  },
  {
    path: 'commercial',
    renderMode: RenderMode.Server
  },
  {
    path: 'clh/:commercial-properties-in-:cityname',
    renderMode: RenderMode.Server
  },
  {
    path: 'pg-home',
    renderMode: RenderMode.Server
  },
  {
    path: 'pg-home/:pg-properties-in-:cityname',
    renderMode: RenderMode.Server
  },
  {
    path: 'rental/:flats-for-rent-in-:localityname-:cityname-:id',
    renderMode: RenderMode.Server
  },
  {
    path: 'buy/:projects-for-sale-in-:localityname-:cityname-:localityid',
    renderMode: RenderMode.Server
  },
  {
    path: 'pgcl/:pg-for-rent-in-:cityname',
    renderMode: RenderMode.Server
  },

  // {
  //   path: 'smart-property-finder',
  //   renderMode: RenderMode.Server
  // },


  {
    path: '404',
    renderMode: RenderMode.Server
  },
  {
    path: '**',
    renderMode: RenderMode.Server
  }

];
