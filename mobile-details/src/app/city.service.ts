import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class CityService {
  cityId: string;
  currentCity: string;
  pageOrigin: string

  constructor(@Inject(DOCUMENT) private doc, private router: Router, private meta: Meta,) {
  }


  public urlFinder(url) {

    if (url.indexOf('/property-sale-in') > -1) {
      this.pageOrigin = 'Locality_Property_Sale'

    } else if (url.indexOf('/residential-flats-in') > -1) {
      this.pageOrigin = 'Residential_Flats'

    } else if (url.indexOf('/agricultural-land-for-sale-in') > -1) {
      this.pageOrigin = 'Aggriculture_Land_Sale'

    } else if (url.indexOf('/villas-for-sale-in') > -1) {
      this.pageOrigin = 'Villas_Sale'

    } else if (url.indexOf('/plots-in') > -1) {
      this.pageOrigin = 'Plots_Sale'

    } else if (url.indexOf('/home-for-sale-in') > -1) {
      this.pageOrigin = 'Home_Sale'

    } else if (url.indexOf('/new-launch-projects') > -1) {
      this.pageOrigin = 'New_Launch_Projects'

    } else if (url.indexOf('/ready-to-move-apartments') > -1) {
      this.pageOrigin = 'Ready_To_Move_Apartments'

    } else if (url.indexOf('/bstc') > -1) {
      this.pageOrigin = 'bstc'

    } else if (url.indexOf('/btc') > -1) {
      this.pageOrigin = 'btc'

    } else if (url.indexOf('/fbc') > -1) {
      this.pageOrigin = 'fbc'

    } else if (url.indexOf('/btlc') > -1) {
      this.pageOrigin = 'btlc'

    } else if (url.indexOf('/upcoming-new-launch-properties') > -1) {
      this.pageOrigin = 'Upcoming_New_Launch_Properties'

    } else if (url.indexOf('/bstlc') > -1) {
      this.pageOrigin = 'bstlc'

    } else if (url.indexOf('/stlc') > -1) {
      this.pageOrigin = 'stlc'

    } else if (url.indexOf('/property-sale') > -1) {
      this.pageOrigin = 'Main_City'

    } else if (url.indexOf('/bbc') > -1) {
      this.pageOrigin = 'bbc'

    } else if (url.indexOf('/bapc') > -1) {
      this.pageOrigin = 'bapc'

    } else if (url.indexOf('/blpc') > -1) {
      this.pageOrigin = 'blpc'

    } else if (url.indexOf('/batc') > -1) {
      this.pageOrigin = 'batc'

    } else if (url.indexOf('/bltc') > -1) {
      if (url.indexOf('luxury-apartments-in') > -1) {
        this.pageOrigin = 'bltc_apartment'
      } else if (url.indexOf('luxury-villas-in') > -1) {
        this.pageOrigin = 'bltc_villas'
      }

    } else if (url.indexOf('/baplc') > -1) {
      this.pageOrigin = 'baplc'

    } else if (url.indexOf('/batlc') > -1) {
      this.pageOrigin = 'batlc'

    } else if (url.indexOf('/blplc') > -1) {
      this.pageOrigin = 'blplc'

    } else if (url.indexOf('/bltlc') > -1) {
      this.pageOrigin = 'bltlc'

    } else if (url.indexOf('/spbc') > -1) {
      this.pageOrigin = 'spbc'

    } else if (url.indexOf('/stbc') > -1) {
      this.pageOrigin = 'stbc'

    } else if (url.indexOf('/btbc') > -1) {
      if (url.indexOf('bhk-flats-by') > -1) {
        this.pageOrigin = 'btbc_flats'
      } else if (url.indexOf('bhk-villas-by') > -1) {
        this.pageOrigin = 'btbc_villas'
      }

    } else if (url.indexOf('/brtc') > -1) {
      if (url.indexOf('apartments-in') > -1) {
        this.pageOrigin = 'brtc_apartments'
      } else if (url.indexOf('villas-in') > -1) {
        this.pageOrigin = 'brtc_villas'
      } else if (url.indexOf('plots-in') > -1) {
        this.pageOrigin = 'brtc_plots'
      }

    } else if (url.indexOf('/bplc') > -1) {
      this.pageOrigin = 'bplc'

    } else if (url.indexOf('/bldtlc') > -1) {
      this.pageOrigin = 'bldtlc'

    } else if (url.indexOf('/sbplc') > -1) {
      this.pageOrigin = 'sbplc'

    } else if (url.indexOf('/sbtlc') > -1) {
      this.pageOrigin = 'sbtlc'

    } else if (url.indexOf('/atc') > -1) {
      this.pageOrigin = 'atc'

    } else if (url.indexOf('/atlc') > -1) {
      this.pageOrigin = 'atlc'

    } else if (url.indexOf('/btac') > -1) {
      if (url.indexOf('bhk-affordable-flats') > -1) {
        this.pageOrigin = 'btac_affordable_flats'
      } else if (url.indexOf('bhk-affordable-villas') > -1) {
        this.pageOrigin = 'btac_affordable_villas'
      }

    } else if (url.indexOf('/btalc') > -1) {
      if (url.indexOf('bhk-affordable-flats') > -1) {
        this.pageOrigin = 'btalc_affordable_flats'
      } else if (url.indexOf('bhk-affordable-villas') > -1) {
        this.pageOrigin = 'btalc_affordable_villas'
      }

    } else if (url.indexOf('/btluc') > -1) {
      if (url.indexOf('bhk-luxury-flats') > -1) {
        this.pageOrigin = 'btluc_luxury_flats'
      } else if (url.indexOf('bhk-luxury-villas') > -1) {
        this.pageOrigin = 'btluc_luxury_villas'
      }

    } else if (url.indexOf('/btllc') > -1) {
      if (url.indexOf('bhk-luxury-flats') > -1) {
        this.pageOrigin = 'btllc_luxury_flats'
      } else if (url.indexOf('bhk-luxury-villas') > -1) {
        this.pageOrigin = 'btllc_luxury_villas'
      }

    } else if (url.indexOf('/ltc') > -1) {
      this.pageOrigin = 'ltc'

    } else if (url.indexOf('/ltlc') > -1) {
      this.pageOrigin = 'ltlc'

    } else if (url.indexOf('/apc') > -1) {
      this.pageOrigin = 'apc'

    } else if (url.indexOf('/aplc') > -1) {
      this.pageOrigin = 'aplc'

    } else if (url.indexOf('/lpc') > -1) {
      this.pageOrigin = 'lpc'

    } else if (url.indexOf('/lplc') > -1) {
      this.pageOrigin = 'lplc'

    } else if (url.indexOf('/status') > -1) {
      if (url.indexOf('up-coming') > -1) {
        this.pageOrigin = 'status_up_coming'
      } else if (url.indexOf('new-launch') > -1) {
        this.pageOrigin = 'status_new_launch'
      } else if (url.indexOf('under-construction') > -1) {
        this.pageOrigin = 'status_under_construction'
      } else if (url.indexOf('ready-to-move') > -1) {
        this.pageOrigin = 'status_ready_to_move'
      }

    } else if (url.indexOf('/zone') > -1) {
      this.pageOrigin = 'property_zone'

    } else if (url.indexOf('/project') > -1) {
      this.pageOrigin = 'project_bhk_listing'

    } else if (url.indexOf('/apartments-in') > -1) {
      this.pageOrigin = 'proptype_with_locality'

    } else if (url.indexOf('/villas-in') > -1) {
      this.pageOrigin = 'proptype_with_locality'

    } else if (url.indexOf('/plots-in-') > -1) {
      this.pageOrigin = 'proptype_with_locality'

    } else if (url.indexOf('/ready-to-move-flats-in-') > -1) {
      this.pageOrigin = 'proptype_with_status'

    } else if (url.indexOf('/under-construction-projects-in-') > -1) {
      this.pageOrigin = 'proptype_with_status'

    } else if (url.indexOf('/upcoming-projects-in-') > -1) {
      this.pageOrigin = 'proptype_with_status'

    } else if (url.indexOf('/userauth') > -1) {
      this.pageOrigin = 'useruth'

    } else {
      this.pageOrigin = this.router.url
    }


    let params = {
      pageOrigin: this.pageOrigin
    }
    return params;
  }





  public cityfinder(url) {
    if (url === 'reset') {
      this.cityId = null;
      this.currentCity = null;
      return { cityname: null, cityid: null };
    }
    if (url.indexOf('bangalore') > -1) {
      this.cityId = '1';
      this.currentCity = 'Bangalore';
      this.meta.updateTag({
        property: 'og:image',
        content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_mobile_3/assets/images/og/bangalore.png'
      });
    } else if (url.indexOf('hyderabad') > -1) {
      this.cityId = '2';
      this.currentCity = 'Hyderabad';
      this.meta.updateTag({
        property: 'og:image',
        content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_mobile_3/assets/images/og/hyderabad.png'
      });
    } else if (url.indexOf('chennai') > -1) {
      this.cityId = '3';
      this.currentCity = 'Chennai';
      this.meta.updateTag({
        property: 'og:image',
        content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_mobile_3/assets/images/og/chennai.png'
      });
    } else if (url.indexOf('kochi') > -1) {
      this.cityId = '4';
      this.currentCity = 'Kochi';
      this.meta.updateTag({
        property: 'og:image',
        content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_mobile_3/assets/images/og/kochi.png'
      });
    } else if (url.indexOf('pune') > -1) {
      this.cityId = '5';
      this.currentCity = 'Pune';
      this.meta.updateTag({
        property: 'og:image',
        content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_mobile_3/assets/images/og/pune.png'
      });
    } else if (url.indexOf('delhi') > -1) {
      this.cityId = '6';
      this.currentCity = 'Delhi';
      this.meta.updateTag({
        property: 'og:image',
        content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_mobile_3/assets/images/city-banners/delhi.jpg'
      });
    } else if (url.indexOf('kolkata') > -1) {
      this.cityId = '7';
      this.currentCity = 'Kolkata';
      this.meta.updateTag({
        property: 'og:image',
        content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_mobile_3/assets/images/city-banners/kolkata.jpg'
      });
    } else if (url.indexOf('goa') > -1) {
      this.cityId = '9';
      this.currentCity = 'Goa';
    } else if (url.indexOf('gurgaon') > -1) {
      this.cityId = '10';
      this.currentCity = 'Gurgaon';
    } else if (url.indexOf('mysore') > -1) {
      this.cityId = '11';
      this.currentCity = 'Mysore';
    } else if (url.indexOf('coimbatore') > -1) {
      this.cityId = '12';
      this.currentCity = 'Coimbatore';
    } else if (url.indexOf('ahmedabad') > -1) {
      this.cityId = '13';
      this.currentCity = 'Ahmedabad';
    } else if (url.indexOf('trivandrum') > -1) {
      this.cityId = '14';
      this.currentCity = 'Trivandrum';
    } else if (url.indexOf('navi') > -1) {
      this.cityId = '15';
      this.currentCity = 'Navi mumbai';
    } else if (url.indexOf('mumbai') > -1) {
      this.cityId = '8';
      this.currentCity = 'Mumbai';
      this.meta.updateTag({
        property: 'og:image',
        content: 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_mobile_3/assets/images/city-banners/mumbai.jpg'
      });
    } else if (url.indexOf('greater') > -1) {
      this.cityId = '17';
      this.currentCity = 'Greater noida';
    } else if (url.indexOf('noida') > -1) {
      this.cityId = '16';
      this.currentCity = 'Noida';
    } else if (url.indexOf('bhubaneshwar') > -1) {
      this.cityId = '20';
      this.currentCity = 'Bhubaneshwar';
    } else if (url.indexOf('vijayawada') > -1) {
      this.cityId = '21';
      this.currentCity = 'Vijayawada';
    } else if (url.indexOf('bhopal') > -1) {
      this.cityId = '22';
      this.currentCity = 'Bhopal';
    } else if (url.indexOf('indore') > -1) {
      this.cityId = '23';
      this.currentCity = 'Indore';
    } else if (url.indexOf('vizag') > -1) {
      this.cityId = '24';
      this.currentCity = 'Vizag';
    } else if (url.indexOf('amaravati') > -1) {
      this.cityId = '25';
      this.currentCity = 'Amaravati';
    } else if (url.indexOf('thrissur') > -1) {
      this.cityId = '26';
      this.currentCity = 'Thrissur';
    } else if (url.indexOf('tirupati') > -1) {
      this.cityId = '27';
      this.currentCity = 'Tirupati';
    } else if (url.indexOf('lucknow') > -1) {
      this.cityId = '28';
      this.currentCity = 'Lucknow';
    } else if (url.indexOf('nashik') > -1) {
      this.cityId = '29';
      this.currentCity = 'Nashik';
    } else if (url.indexOf('mangalore') > -1) {
      this.cityId = '30';
      this.currentCity = 'Mangalore';
    } else if (url.indexOf('jaipur') > -1) {
      this.cityId = '32';
      this.currentCity = 'Jaipur';
    } else if (url.indexOf('nagpur') > -1) {
      this.cityId = '31';
      this.currentCity = 'Nagpur';
    } else if (url.indexOf('nellore') > -1) {
      this.cityId = '33';
      this.currentCity = 'Nellore';
    } else if (url.indexOf('faridabad') > -1) {
      this.cityId = '34';
      this.currentCity = 'Faridabad';
    } else if (url.indexOf('chandigarh') > -1) {
      this.cityId = '35';
      this.currentCity = 'Chandigarh';
    } else if (url.indexOf('dehradun') > -1) {
      this.cityId = '36';
      this.currentCity = 'Dehradun';
    } else if (url.indexOf('ghaziabad') > -1) {
      this.cityId = '37';
      this.currentCity = 'Ghaziabad';
    } else if (url.indexOf('ranchi') > -1) {
      this.cityId = '38';
      this.currentCity = 'Ranchi';
    } else if (url.indexOf('agra') > -1) {
      this.cityId = '39';
      this.currentCity = 'Agra'
    } else if (url.indexOf('durgapur') > -1) {
      this.cityId = '40';
      this.currentCity = 'Durgapur'
    } else if (url.indexOf('vizianagaram') > -1) {
      this.cityId = '41';
      this.currentCity = 'Vizianagaram'
    }
    else if (url.indexOf('amritsar') > -1) {
      this.cityId = '42';
      this.currentCity = 'Amritsar'
    }
    else if (url.indexOf('patna') > -1) {
      this.cityId = '43';
      this.currentCity = 'Patna'
    }
    else if (url.indexOf('surat') > -1) {
      this.cityId = '44';
      this.currentCity = 'Surat'
    }
    else if (url.indexOf('guntur') > -1) {
      this.cityId = '45';
      this.currentCity = 'Guntur'
    }
    else if (url.indexOf('aurangabad') > -1) {
      this.cityId = '46';
      this.currentCity = 'Aurangabad'
    }
    else if (url.indexOf('guwahati') > -1) {
      this.cityId = '47';
      this.currentCity = 'Guwahati'
    }
    else if (url.indexOf('ludhiana') > -1) {
      this.cityId = '48';
      this.currentCity = 'Ludhiana'
    }
    else if (url.indexOf('dharwad') > -1) {
      this.cityId = '49';
      this.currentCity = 'Dharwad'
    }
    else if (url.indexOf('kolhapur') > -1) {
      this.cityId = '50';
      this.currentCity = 'Kolhapur';
    }
    else if (url.indexOf('mohali') > -1) {
      this.cityId = '51';
      this.currentCity = 'Mohali';
    }
    else if (url.indexOf('kanpur') > -1) {
      this.cityId = '52';
      this.currentCity = 'Kanpur';
    }
    else if (url.indexOf('thane') > -1) {
      this.cityId = '53';
      this.currentCity = 'Thane';
    }
    else if (url.indexOf('jamshedpur') > -1) {
      this.cityId = '54';
      this.currentCity = 'Jamshedpur';
    }
    else if (url.indexOf('belgaum') > -1) {
      this.cityId = '55';
      this.currentCity = 'Belgaum';
    }
    else if (url.indexOf('puri') > -1) {
      this.cityId = '56';
      this.currentCity = 'Puri';
    }
    else if (url.indexOf('meerut') > -1) {
      this.cityId = '57';
      this.currentCity = 'Meerut';
    }
    else if (url.indexOf('tiruvannamalai') > -1) {
      this.cityId = '58';
      this.currentCity = 'Tiruvannamalai';
    }
    else if (url.indexOf('satara') > -1) {
      this.cityId = '59';
      this.currentCity = 'Satara';
    }
    else if (url.indexOf('junagadh') > -1) {
      this.cityId = '60';
      this.currentCity = 'Junagadh';
    }
    else if (url.indexOf('vadodara') > -1) {
      this.cityId = '61';
      this.currentCity = 'Vadodara';
    }
    else if (url.indexOf('palwal') > -1) {
      this.cityId = '62';
      this.currentCity = 'Palwal';
    }
    else if (url.indexOf('panchkula') > -1) {
      this.cityId = '63';
      this.currentCity = 'Panchkula';
    }
    else if (url.indexOf('panipat') > -1) {
      this.cityId = '64';
      this.currentCity = 'Panipat';
    }
    else if (url.indexOf('calicut') > -1) {
      this.cityId = '65';
      this.currentCity = 'Calicut';
    }
    else if (url.indexOf('pathanamthitta') > -1) {
      this.cityId = '66';
      this.currentCity = 'Pathanamthitta'
    }
    else if (url.indexOf('haridwar') > -1) {
      this.cityId = '67';
      this.currentCity = 'Haridwar';
    }
    else if (url.indexOf('solan') > -1) {
      this.cityId = '68';
      this.currentCity = 'Solan';
    }
    else if (url.indexOf('burhanpur') > -1) {
      this.cityId = '69';
      this.currentCity = 'Burhanpur';
    }
    else if (url.indexOf('raipur') > -1) {
      this.cityId = '70';
      this.currentCity = 'Raipur';
    }
    else if (url.indexOf('kanchipuram') > -1) {
      this.cityId = '71';
      this.currentCity = 'Kanchipuram'
    }
    else if (url.indexOf('pondicherry') > -1) {
      this.cityId = '72';
      this.currentCity = 'Pondicherry';
    }
    else if (url.indexOf('siliguri') > -1) {
      this.cityId = '73';
      this.currentCity = 'Siliguri';
    }
    else if (url.indexOf('gandhinagar') > -1) {
      this.cityId = '74';
      this.currentCity = 'Gandhinagar';
    }
    else if (url.indexOf('ajmer') > -1) {
      this.cityId = '75';
      this.currentCity = 'Ajmer';
    }
    else if (url.indexOf('varanasi') > -1) {
      this.cityId = '76';
      this.currentCity = 'Varanasi';
    }
    else if (url.indexOf('mathura') > -1) {
      this.cityId = '77';
      this.currentCity = 'Mathura';
    }
    else if (url.indexOf('dindigul') > -1) {
      this.cityId = '78';
      this.currentCity = 'Dindigul';
    }
    else if (url.indexOf('rewari') > -1) {
      this.cityId = '79';
      this.currentCity = 'Rewari';
    }
    else if (url.indexOf('solapur') > -1) {
      this.cityId = '80';
      this.currentCity = 'Solapur';
    }
    else if (url.indexOf('ratnagiri') > -1) {
      this.cityId = '81';
      this.currentCity = 'Ratnagiri';
    }
    else if (url.indexOf('purba') > -1) {
      this.cityId = '82';
      this.currentCity = 'Purba medinipur';
    }
    else if (url.indexOf('shantiniketan') > -1) {
      this.cityId = '83';
      this.currentCity = 'Shantiniketan';
    }
    else if (url.indexOf('rishikesh') > -1) {
      this.cityId = '84';
      this.currentCity = 'Rishikesh';
    }
    else if (url.indexOf('rajkot') > -1) {
      this.cityId = '85';
      this.currentCity = 'Rajkot';
    }
    else if (url.indexOf('hapur') > -1) {
      this.cityId = '86';
      this.currentCity = 'Hapur';
    }
    else if (url.indexOf('chamarajanagar') > -1) {
      this.cityId = '87';
      this.currentCity = 'Chamarajanagar';
    }
    else if (url.indexOf('gulbarga') > -1) {
      this.cityId = '88';
      this.currentCity = 'Gulbarga';
    }
    else if (url.indexOf('alwar') > -1) {
      this.cityId = '89';
      this.currentCity = 'Alwar';
    }
    else if (url.indexOf('tirunelveli') > -1) {
      this.cityId = '90';
      this.currentCity = 'Tirunelveli';
    }
    else if (url.indexOf('raigad') > -1) {
      this.cityId = '91';
      this.currentCity = 'Raigad';
    }
    else if (url.indexOf('sangli') > -1) {
      this.cityId = '92';
      this.currentCity = 'Sangli';
    }
    else if (url.indexOf('ayodhya') > -1) {
      this.cityId = '93';
      this.currentCity = 'Ayodhya';
    }
    else if (url.indexOf('bhiwadi') > -1) {
      this.cityId = '94';
      this.currentCity = 'Bhiwadi';
    }
    else if (url.indexOf('kottayam') > -1) {
      this.cityId = '95';
      this.currentCity = 'Kottayam';
    }
    else if (url.indexOf('kannur') > -1) {
      this.cityId = '96';
      this.currentCity = 'Kannur';
    }
    else if (url.indexOf('neemrana') > -1) {
      this.cityId = '97';
      this.currentCity = 'Neemrana';
    }

    else if (url.indexOf('thanjavur') > -1) {
      this.cityId = '98';
      this.currentCity = 'Thanjavur';
    }
    else if (url.indexOf('kota') > -1) {
      this.cityId = '99';
      this.currentCity = 'Kota';
    }
    else if (url.indexOf('bilaspur') > -1) {
      this.cityId = '100';
      this.currentCity = 'Bilaspur';
    }
    else if (url.indexOf('navsari') > -1) {
      this.cityId = '102';
      this.currentCity = 'Navsari';
    }
    else if (url.indexOf('davanegere') > -1) {
      this.cityId = '103';
      this.currentCity = 'Davanegere';
    }
    else if (url.indexOf('jabalpur') > -1) {
      this.cityId = '104';
      this.currentCity = 'Jabalpur';
    }
    else if (url.indexOf('gwalior') > -1) {
      this.cityId = '105';
      this.currentCity = 'Gwalior';
    }
    else if (url.indexOf('ujjain') > -1) {
      this.cityId = '106';
      this.currentCity = 'Ujjain';
    }
    else if (url.indexOf('salem') > -1) {
      this.cityId = '107';
      this.currentCity = 'Salem';
    }
    else if (url.indexOf('erode') > -1) {
      this.cityId = '108';
      this.currentCity = 'Erode';
    }
    else if (url.indexOf('thoothukudi') > -1) {
      this.cityId = '109';
      this.currentCity = 'Thoothukudi';
    }
    else if (url.indexOf('bareilly') > -1) {
      this.cityId = '110';
      this.currentCity = 'Bareilly';
    }
    else if (url.indexOf('jhansi') > -1) {
      this.cityId = '111';
      this.currentCity = 'Jhansi';
    }
    else if (url.indexOf('tiruchirappalli') > -1) {
      this.cityId = '112';
      this.currentCity = 'Tiruchirappalli';
    } else if (url.indexOf('hosur') > -1) {
      this.cityId = '113';
      this.currentCity = 'Hosur';
    }

    else if (url.indexOf('madurai') > -1) {
      this.cityId = '114';
      this.currentCity = 'Madurai';
    }
    else if (url.indexOf('namakkal') > -1) {
      this.cityId = '115';
      this.currentCity = 'Namakkal';
    }
    else if (url.indexOf('tiruppur') > -1) {
      this.cityId = '116';
      this.currentCity = 'Tiruppur';
    }
    else if (url.indexOf('vellore') > -1) {
      this.cityId = '117';
      this.currentCity = 'Vellore';
    }
    else if (url.indexOf('viluppuram') > -1) {
      this.cityId = '118';
      this.currentCity = 'Viluppuram';
    }
    else if (url.indexOf('koonimedu') > -1) {
      this.cityId = '119';
      this.currentCity = 'Koonimedu';
    }
    else if (url.indexOf('theni') > -1) {
      this.cityId = '120';
      this.currentCity = 'Theni';
    }
    else if (url.indexOf('kotagiri') > -1) {
      this.cityId = '121';
      this.currentCity = 'Kotagiri';
    }
    else if (url.indexOf('krishnagri') > -1) {
      this.cityId = '122';
      this.currentCity = 'Krishnagri';
    }


    let params = {
      cityname: this.currentCity,
      cityid: this.cityId
    }
    return params;
  }


  public citybasedrouter(city: any) {
    if (city === 'Bangalore') {
      this.router.navigate(['/real-estate-in-bangalore']);
    } else if (city === 'Hyderabad') {
      this.router.navigate(['/real-estate-in-hyderabad']);
    } else if (city === 'Chennai') {
      this.router.navigate(['/real-estate-in-chennai']);
    } else if (city === 'Kochi') {
      this.router.navigate(['/real-estate-in-kochi']);
    } else if (city === 'Pune') {
      this.router.navigate(['/real-estate-in-pune']);
    } else if (city === 'Mumbai') {
      this.router.navigate(['/real-estate-in-mumbai']);
    } else if (city === 'Delhi') {
      this.router.navigate(['/real-estate-in-delhi']);
    } else if (city === 'Kolkata') {
      this.router.navigate(['/real-estate-in-kolkata']);
    } else if (city === 'Goa') {
      this.router.navigate(['/real-estate-in-goa']);
    } else if (city === 'Gurgaon') {
      this.router.navigate(['/real-estate-in-gurgaon']);
    } else if (city === 'Mysore') {
      this.router.navigate(['/real-estate-in-mysore']);
    } else if (city === 'Coimbatore') {
      this.router.navigate(['/real-estate-in-coimbatore']);
    } else if (city === 'Ahmedabad') {
      this.router.navigate(['/real-estate-in-ahmedabad']);
    } else if (city === 'Trivandrum') {
      this.router.navigate(['/real-estate-in-trivandrum']);
    } else if (city === 'Navi Mumbai') {
      this.router.navigate(['/real-estate-in-navi-mumbai']);
    } else if (city === 'Noida') {
      this.router.navigate(['/real-estate-in-noida']);
      localStorage.setItem('CityName', 'Noida');
    } else if (city === 'Greater Noida') {
      this.router.navigate(['/real-estate-in-greater-noida']);
      localStorage.setItem('CityName', 'Greater Noida');
    } else if (city === 'Bhubaneshwar') {
      this.router.navigate(['/real-estate-in-bhubaneshwar']);
      localStorage.setItem('CityName', 'Bhubaneshwar');
    } else if (city === 'Vijayawada') {
      this.router.navigate(['/real-estate-in-vijayawada']);
      localStorage.setItem('CityName', 'Vijayawada');
    } else if (city === 'Bhopal') {
      this.router.navigate(['/real-estate-in-bhopal']);
      localStorage.setItem('CityName', 'Bhopal');
    } else if (city === 'Indore') {
      this.router.navigate(['/real-estate-in-indore']);
      localStorage.setItem('CityName', 'Indore');
    } else if (city === 'Vizag') {
      this.router.navigate(['/real-estate-in-vizag']);
    } else if (city === 'Amaravati') {
      this.router.navigate(['/real-estate-in-amaravati']);
    } else if (city === 'Thrissur') {
      this.router.navigate(['/real-estate-in-thrissur']);
    } else if (city === 'Tirupati') {
      this.router.navigate(['/real-estate-in-tirupati']);
    } else if (city === 'Lucknow') {
      this.router.navigate(['/real-estate-in-lucknow']);
    } else if (city === 'Nashik') {
      this.router.navigate(['/real-estate-in-nashik']);
    } else if (city === 'Mangalore') {
      this.router.navigate(['/real-estate-in-mangalore']);
    } else if (city === 'Nagpur') {
      this.router.navigate(['/real-estate-in-nagpur']);
    } else if (city === 'Jaipur') {
      this.router.navigate(['/real-estate-in-jaipur']);
    } else if (city === 'Nellore') {
      this.router.navigate(['/real-estate-in-nellore']);
    } else if (city === 'Faridabad') {
      this.router.navigate(['/real-estate-in-faridabad']);
    } else if (city === 'Chandigarh') {
      this.router.navigate(['/real-estate-in-chandigarh']);
    } else if (city === 'Dehradun') {
      this.router.navigate(['/real-estate-in-dehradun']);
    } else if (city === 'Ghaziabad') {
      this.router.navigate(['/real-estate-in-ghaziabad']);
    } else if (city === 'Ranchi') {
      this.router.navigate(['/real-estate-in-ranchi']);
    } else if (city === 'Agra') {
      this.router.navigate(['/real-estate-in-agra']);
    } else if (city === 'Durgapur') {
      this.router.navigate(['/real-estate-in-durgapur']);
    } else if (city === 'Vizianagaram') {
      this.router.navigate(['/real-estate-in-vizianagaram']);
    } else if (city === 'Amritsar') {
      this.router.navigate(['/real-estate-in-amritsar']);
    } else if (city === 'Patna') {
      this.router.navigate(['/real-estate-in-patna']);
    } else if (city === 'Surat') {
      this.router.navigate(['/real-estate-in-surat']);
    } else if (city === 'Guntur') {
      this.router.navigate(['/real-estate-in-guntur']);
    } else if (city === 'Aurangabad') {
      this.router.navigate(['/real-estate-in-aurangabad']);
    } else if (city === 'Guwahati') {
      this.router.navigate(['/real-estate-in-guwahati']);
    } else if (city === 'Ludhiana') {
      this.router.navigate(['/real-estate-in-ludhiana']);
    } else if (city === 'Dharwad') {
      this.router.navigate(['/real-estate-in-dharwad']);
    } else if (city === 'Kolhapur') {
      this.router.navigate(['/real-estate-in-kolhapur']);
    } else if (city === 'Mohali') {
      this.router.navigate(['/real-estate-in-mohali']);
    } else if (city === 'Kanpur') {
      this.router.navigate(['/real-estate-in-kanpur']);
    } else if (city === 'Thane') {
      this.router.navigate(['/real-estate-in-thane']);
    } else if (city === 'Jamshedpur') {
      this.router.navigate(['/real-estate-in-jamshedpur']);
    } else if (city === 'Belgaum') {
      this.router.navigate(['/real-estate-in-belgaum']);
    } else if (city === 'puri') {
      this.router.navigate(['/real-estate-in-puri']);
    } else if (city === 'Meerut') {
      this.router.navigate(['/real-estate-in-meerut']);
    } else if (city === 'Tiruvannamalai') {
      this.router.navigate(['/real-estate-in-tiruvannamalai']);
    }
    else if (city === 'Satara') {
      this.router.navigate(['/real-estate-in-satara']);
    }
    else if (city === 'Junagadh') {
      this.router.navigate(['/real-estate-in-junagadh']);
    }
    else if (city === 'Vadodara') {
      this.router.navigate(['/real-estate-in-vadodara']);
    }
    else if (city === 'Palwal') {
      this.router.navigate(['/real-estate-in-palwal']);
    }
    else if (city === 'Panchkula') {
      this.router.navigate(['/real-estate-in-panchkula']);
    }
    else if (city === 'Panipat') {
      this.router.navigate(['/real-estate-in-panipat']);
    }
    else if (city === 'Calicut') {
      this.router.navigate(['/real-estate-in-calicut']);
    }
    else if (city === 'Pathanamthitta') {
      this.router.navigate(['/real-estate-in-pathanamthitta']);
    }
    else if (city === 'Haridwar') {
      this.router.navigate(['/real-estate-in-haridwar']);
    }
    else if (city === 'Solan') {
      this.router.navigate(['/real-estate-in-solan']);
    }
    else if (city === 'Burhanpur') {
      this.router.navigate(['/real-estate-in-burhanpur']);
    }
    else if (city === 'Raipur') {
      this.router.navigate(['/real-estate-in-raipur']);
    }
    else if (city === 'Kanchipuram') {
      this.router.navigate(['/real-estate-in-kanchipuram']);
    }
    else if (city === 'Pondicherry') {
      this.router.navigate(['/real-estate-in-pondicherry']);
    }
    else if (city === 'Siliguri') {
      this.router.navigate(['/real-estate-in-siliguri']);
    }
    else if (city === 'Gandhinagar') {
      this.router.navigate(['/real-estate-in-gandhinagar']);
    }
    else if (city === 'Ajmer') {
      this.router.navigate(['/real-estate-in-ajmer']);
    }
    else if (city === 'Varanasi') {
      this.router.navigate(['/real-estate-in-varanasi']);
    }
    else if (city === 'Mathura') {
      this.router.navigate(['/real-estate-in-mathura']);
    }
    else if (city === 'Dindigul') {
      this.router.navigate(['/real-estate-in-dindigul']);
    }
    else if (city === 'Rewari') {
      this.router.navigate(['/real-estate-in-rewari']);
    }
    else if (city === 'Solapur') {
      this.router.navigate(['/real-estate-in-solapur']);
    }
    else if (city === 'Ratnagiri') {
      this.router.navigate(['/real-estate-in-ratnagiri']);
    }
    else if (city === 'Purba') {
      this.router.navigate(['/real-estate-in-purba-medinipur']);
    }
    else if (city === 'Shantiniketan') {
      this.router.navigate(['/real-estate-in-shantiniketan']);
    }
    else if (city === 'Rishikesh') {
      this.router.navigate(['/real-estate-in-rishikesh']);
    }
    else if (city === 'Rajkot') {
      this.router.navigate(['/real-estate-in-rajkot']);
    }
    else if (city === 'Hapur') {
      this.router.navigate(['/real-estate-in-hapur']);
    }
    else if (city === 'Chamarajanagar') {
      this.router.navigate(['/real-estate-in-chamarajanagar']);
    }
    else if (city === 'Gulbarga') {
      this.router.navigate(['/real-estate-in-gulbarga']);
    }
    else if (city === 'Alwar') {
      this.router.navigate(['/real-estate-in-alwar']);
    }
    else if (city === 'Tirunelveli') {
      this.router.navigate(['/real-estate-in-tirunelveli']);
    }
    else if (city === 'Raigad') {
      this.router.navigate(['/real-estate-in-raigad']);
    }
    else if (city === 'Sangli') {
      this.router.navigate(['/real-estate-in-sangli']);
    }
    else if (city === 'Ayodhya') {
      this.router.navigate(['/real-estate-in-ayodhya']);
    }
    else if (city === 'Bhiwadi') {
      this.router.navigate(['/real-estate-in-bhiwadi']);
    }
    else if (city === 'Kottayam') {
      this.router.navigate(['/real-estate-in-kottayam']);
    }
    else if (city === 'Kannur') {
      this.router.navigate(['/real-estate-in-kannur']);
    }
    else if (city === 'Neemrana') {
      this.router.navigate(['/real-estate-in-neemrana']);
    }


    else if (city === 'Thanjavur') {
      this.router.navigate(['/real-estate-in-thanjavur']);
    }
    else if (city === 'Kota') {
      this.router.navigate(['/real-estate-in-kota']);
    }
    else if (city === 'Bilaspur') {
      this.router.navigate(['/real-estate-in-bilaspur']);
    }
    else if (city === 'Navsari') {
      this.router.navigate(['/real-estate-in-navsari']);
    }
    else if (city === 'Davanegere') {
      this.router.navigate(['/real-estate-in-davanegere']);
    }
    else if (city === 'Jabalpur') {
      this.router.navigate(['/real-estate-in-jabalpur']);
    }
    else if (city === 'Gwalior') {
      this.router.navigate(['/real-estate-in-gwalior']);
    }
    else if (city === 'Ujjain') {
      this.router.navigate(['/real-estate-in-ujjain']);
    }
    else if (city === 'Salem') {
      this.router.navigate(['/real-estate-in-salem']);
    }
    else if (city === 'Erode') {
      this.router.navigate(['/real-estate-in-erode']);
    }
    else if (city === 'Thoothukud') {
      this.router.navigate(['/real-estate-in-thoothukud']);
    }
    else if (city === 'Bareilly') {
      this.router.navigate(['/real-estate-in-bareilly']);
    }
    else if (city === 'Jhansi') {
      this.router.navigate(['/real-estate-in-jhansi']);
    } else if (city === 'Tiruchirappalli') {
      this.router.navigate(['/real-estate-in-tiruchirappalli']);
    } else if (city === 'Hosur') {
      this.router.navigate(['/real-estate-in-hosur']);
    } else if (city === 'Madurai') {
      this.router.navigate(['/real-estate-in-madurai']);
    } else if (city === 'Namakkal') {
      this.router.navigate(['/real-estate-in-namakkal']);
    } else if (city === 'Tiruppur') {
      this.router.navigate(['/real-estate-in-tiruppur']);
    } else if (city === 'Vellore') {
      this.router.navigate(['/real-estate-in-vellore']);
    } else if (city === 'Viluppuram') {
      this.router.navigate(['/real-estate-in-viluppuram']);
    } else if (city === 'Koonimedu') {
      this.router.navigate(['/real-estate-in-koonimedu']);
    } else if (city === 'Theni') {
      this.router.navigate(['/real-estate-in-theni']);
    } else if (city === 'Kotagiri') {
      this.router.navigate(['/real-estate-in-kotagiri']);
    } else if (city === 'Krishnagri') {
      this.router.navigate(['/real-estate-in-krishnagri']);
    }
    localStorage.setItem('CityName', city);
  }




  public citybasedrouterRentals(city) {
    if (city === 'Bangalore') {
      this.router.navigate(['/property-for-rent-in-bangalore']);
    } else if (city === 'Hyderabad') {
      this.router.navigate(['/property-for-rent-in-hyderabad']);
    } else if (city === 'Chennai') {
      this.router.navigate(['/property-for-rent-in-chennai']);
    } else if (city === 'Kochi') {
      this.router.navigate(['/property-for-rent-in-kochi']);
    } else if (city === 'Pune') {
      this.router.navigate(['/property-for-rent-in-pune']);
    } else if (city === 'Mumbai') {
      this.router.navigate(['/property-for-rent-in-mumbai']);
    } else if (city === 'Delhi') {
      this.router.navigate(['/property-for-rent-in-delhi']);
    } else if (city === 'Kolkata') {
      this.router.navigate(['/property-for-rent-in-kolkata']);
    } else if (city === 'Goa') {
      this.router.navigate(['/property-for-rent-in-goa']);
    } else if (city === 'Gurgaon') {
      this.router.navigate(['/property-for-rent-in-gurgaon']);
    } else if (city === 'Mysore') {
      this.router.navigate(['/property-for-rent-in-mysore']);
    } else if (city === 'Coimbatore') {
      this.router.navigate(['/property-for-rent-in-coimbatore']);
    } else if (city === 'Ahmedabad') {
      this.router.navigate(['/property-for-rent-in-ahmedabad']);
    } else if (city === 'Trivandrum') {
      this.router.navigate(['/property-for-rent-in-trivandrum']);
    } else if (city === 'Navi Mumbai') {
      this.router.navigate(['/property-for-rent-in-navi-mumbai']);
    } else if (city === 'Noida') {
      this.router.navigate(['/property-for-rent-in-noida']);
      localStorage.setItem('CityName', 'Noida');
    } else if (city === 'Greater Noida') {
      this.router.navigate(['/property-for-rent-in-greater-noida']);
      localStorage.setItem('CityName', 'Greater Noida');
    } else if (city === 'Bhubaneshwar') {
      this.router.navigate(['/property-for-rent-in-bhubaneshwar']);
      localStorage.setItem('CityName', 'Bhubaneshwar');
    } else if (city === 'Vijayawada') {
      this.router.navigate(['/property-for-rent-in-vijayawada']);
      localStorage.setItem('CityName', 'Vijayawada');
    } else if (city === 'Bhopal') {
      this.router.navigate(['/property-for-rent-in-bhopal']);
      localStorage.setItem('CityName', 'Bhopal');
    } else if (city === 'Indore') {
      this.router.navigate(['/property-for-rent-in-indore']);
      localStorage.setItem('CityName', 'Indore');
    } else if (city === 'Vizag') {
      this.router.navigate(['/property-for-rent-in-vizag']);
    } else if (city === 'Amaravati') {
      this.router.navigate(['/property-for-rent-in-amaravati']);
    } else if (city === 'Thrissur') {
      this.router.navigate(['/property-for-rent-in-thrissur']);
    } else if (city === 'Tirupati') {
      this.router.navigate(['/property-for-rent-in-tirupati']);
    } else if (city === 'Lucknow') {
      this.router.navigate(['/property-for-rent-in-lucknow']);
    } else if (city === 'Nashik') {
      this.router.navigate(['/property-for-rent-in-nashik']);
    } else if (city === 'Mangalore') {
      this.router.navigate(['/property-for-rent-in-mangalore']);
    } else if (city === 'Nagpur') {
      this.router.navigate(['/property-for-rent-in-nagpur']);
    } else if (city === 'Jaipur') {
      this.router.navigate(['/property-for-rent-in-jaipur']);
    } else if (city === 'Nellore') {
      this.router.navigate(['/property-for-rent-in-nellore']);
    } else if (city === 'Faridabad') {
      this.router.navigate(['/property-for-rent-in-faridabad']);
    } else if (city === 'Chandigarh') {
      this.router.navigate(['/property-for-rent-in-chandigarh']);
    } else if (city === 'Dehradun') {
      this.router.navigate(['/property-for-rent-in-dehradun']);
    } else if (city === 'Ghaziabad') {
      this.router.navigate(['/property-for-rent-in-ghaziabad']);
    } else if (city === 'Ranchi') {
      this.router.navigate(['/property-for-rent-in-ranchi']);
    } else if (city === 'Agra') {
      this.router.navigate(['/property-for-rent-in-agra']);
    } else if (city === 'Durgapur') {
      this.router.navigate(['/property-for-rent-in-durgapur']);
    } else if (city === 'Vizianagaram') {
      this.router.navigate(['/property-for-rent-in-vizianagaram']);
    } else if (city === 'Amritsar') {
      this.router.navigate(['/property-for-rent-in-amritsar']);
    } else if (city === 'Patna') {
      this.router.navigate(['/property-for-rent-in-patna']);
    } else if (city === 'Surat') {
      this.router.navigate(['/property-for-rent-in-surat']);
    } else if (city === 'Guntur') {
      this.router.navigate(['/property-for-rent-in-guntur']);
    } else if (city === 'Aurangabad') {
      this.router.navigate(['/property-for-rent-in-aurangabad']);
    } else if (city === 'Guwahati') {
      this.router.navigate(['/property-for-rent-in-guwahati']);
    } else if (city === 'Ludhiana') {
      this.router.navigate(['/property-for-rent-in-ludhiana']);
    } else if (city === 'Dharwad') {
      this.router.navigate(['/property-for-rent-in-dharwad']);
    } else if (city === 'Kolhapur') {
      this.router.navigate(['/property-for-rent-in-kolhapur']);
    } else if (city === 'Mohali') {
      this.router.navigate(['/property-for-rent-in-mohali']);
    } else if (city === 'Kanpur') {
      this.router.navigate(['/property-for-rent-in-kanpur']);
    } else if (city === 'Thane') {
      this.router.navigate(['/property-for-rent-in-thane']);
    } else if (city === 'Jamshedpur') {
      this.router.navigate(['/property-for-rent-in-jamshedpur']);
    } else if (city === 'Belgaum') {
      this.router.navigate(['/property-for-rent-in-belgaum']);
    } else if (city === 'Puri') {
      this.router.navigate(['/property-for-rent-in-puri']);
    } else if (city === 'Hosur') {
      this.router.navigate(['/property-for-rent-in-hosur']);
    } else if (city === 'Madurai') {
      this.router.navigate(['/property-for-rent-in-madurai']);
    } else if (city === 'Namakkal') {
      this.router.navigate(['/property-for-rent-in-namakkal']);
    } else if (city === 'Tiruppur') {
      this.router.navigate(['/property-for-rent-in-tiruppur']);
    } else if (city === 'Vellore') {
      this.router.navigate(['/property-for-rent-in-vellore']);
    } else if (city === 'Viluppuram') {
      this.router.navigate(['/property-for-rent-in-viluppuram']);
    } else if (city === 'Koonimedu') {
      this.router.navigate(['/property-for-rent-in-koonimedu']);
    } else if (city === 'Theni') {
      this.router.navigate(['/property-for-rent-in-theni']);
    } else if (city === 'Kotagiri') {
      this.router.navigate(['/property-for-rent-in-kotagiri']);
    } else if (city === 'Krishnagri') {
      this.router.navigate(['/property-for-rent-in-krishnagri']);
    }
    localStorage.setItem('CityName', city);
  }

}