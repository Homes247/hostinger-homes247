import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { HttpClient, HttpErrorResponse, HttpParams, } from '@angular/common/http';
import { catchError, retry, shareReplay } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ElitedataService {
  // public hariKrishna = 'http://192.168.0.119:8081/subscription/'


  public hariKrishna = 'http://192.168.0.119/right2shout_LIVE/Subscription_backend/'
  public hariKrishnaBackendoptimized = 'http://192.168.0.119/right2shout_LIVE/backendoptimized/'


  // public hariKrishna = 'https://api.right2shout.in/subscription_backend/'
  // public hariKrishnaBackendoptimized = 'https://api.right2shout.in/backendoptimized/'

  public aiPythonApi = 'https://aisearch.vsnaptechnology.com/api/'

  constructor(private httpClient: HttpClient,
    @Inject(DOCUMENT) private doc
  ) { }


  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    //  window.alert(errorMessage);
    return throwError(errorMessage);
  }

  relaxDataFilter() {
    return this.httpClient
      .get(this.hariKrishna + 'data_filters')
      .pipe(retry(0), catchError(this.handleError));

  }

  sliderData() {
    return this.httpClient
      .get(this.hariKrishna + 'sliderdata_filters')
      .pipe(retry(0), catchError(this.handleError));
  }
  profileCard(number) {
    const options = {
      params: new HttpParams({
        fromObject: {
          'number': number,
        },
      }),
    };
    return this.httpClient.get(this.hariKrishna + 'logincard', options)
      .pipe(retry(0), catchError(this.handleError));
  }

  detailesCard(data: any) {
    const options = {
      params: new HttpParams({
        fromObject: {
          'number': data.number,
          'userId': data.userId,
          'propid': data.propid,
          'category_id': data.category_id,
        },
      }),
    };
    return this.httpClient.get(this.hariKrishna + 'contact', options)
      .pipe(retry(0), catchError(this.handleError));
  }

  createOrder(data: any) {
    return this.httpClient
      .post(this.hariKrishna + 'create_order', data)
      .pipe(retry(0), catchError(this.handleError));
  }

  createUpgradeOrder(data: any) {
    return this.httpClient
      .post(this.hariKrishna + 'upgradePropertyBoost', data)
      .pipe(retry(0), catchError(this.handleError));
  }




  verifyPayment(data: any) {
    return this.httpClient
      .post(this.hariKrishna + 'verify_payment', data)
      .pipe(retry(0), catchError(this.handleError));
  }

  boostWithoutPay(data: any) {
    return this.httpClient
      .post(this.hariKrishna + 'verify_payment', data)
      .pipe(retry(0), catchError(this.handleError));
  }

  transactionDetails(param) {
    const options = {
      params: new HttpParams({
        fromObject: {
          'user_id': param.userID,
          'user_number': param.user_number
        }
      })
    }
    return this.httpClient.get(this.hariKrishna + 'transaction_details', options)
      .pipe(retry(0), catchError(this.handleError));
  }

  subscriptionManagement(param) {
    const option = {
      params: new HttpParams({
        fromObject: {
          'userId': param.userId,
          'userNumber': param.userNumber
        }
      })
    }
    return this.httpClient.get(this.hariKrishna + 'eliteSubscriptionSummary', option).pipe(retry(0), catchError(this.handleError))
  }


  boostedProperties(param) {
    const option = {
      params: new HttpParams({
        fromObject: {
          'Userid': param.Userid,
        }
      })
    }
    return this.httpClient.get(this.hariKrishna + 'boostedProperties', option).pipe(retry(0), catchError(this.handleError))
  }


  getContactedList(userId: any) {
    const options = {
      params: new HttpParams({
        fromObject: {
          'userId': userId,
        },
      }),
    };
    return this.httpClient.get(this.hariKrishnaBackendoptimized + 'get_contacted_list_hari', options)
      .pipe(retry(0), catchError(this.handleError));
  }


  boostPropertyList(param: any) {
    const options = {
      params: new HttpParams({
        fromObject: {
          'user_id': param.user_id,
          'user_number': param.user_number,
          'postType': param.postType
        },
      }),
    };
    return this.httpClient.get(this.hariKrishna + 'boostingPropertyList', options)
      .pipe(retry(0), catchError(this.handleError));
  }


  checkPostPropertyCredits(param) {
    const option = {
      params: new HttpParams({
        fromObject: {
          'userId': param.userId,
          'number': param.number,
          'propertyId': param.propertyId,
          'categoryId': param.categoryId
        },
      }),
    };
    return this.httpClient.get(this.hariKrishna + 'elitePropertyCredits', option).pipe(retry(0), catchError(this.handleError));
  }


  myPreferenceData(param) {
    const option = {
      params: new HttpParams({
        fromObject: {
          'userId': param.userId,
        }
      })
    }
    // return this.httpClient.get(this.hariKrishna + 'getPreference', option).pipe(retry(0), catchError(this.handleError));
    return this.httpClient.get(this.hariKrishna + 'getPreference', option).pipe(retry(0), catchError(this.handleError));
  }


  deleteUserPreference(data: any) {
    return this.httpClient
      .post(this.hariKrishna + 'deletePreference', data)
      .pipe(retry(0), catchError(this.handleError));
  }


  userMyPreference(data: any) {
    const options = toHttpParams(data);
    return this.httpClient
      .post(this.aiPythonApi + 'save_preference', data)
      .pipe(retry(0), catchError(this.handleError));
  }


  // userMyPreferenceEdit(data: any) {
  //   const options = toHttpParams(data);
  //   return this.httpClient
  //     .post(this.aiPythonApi + 'edit_preference', data)
  //     .pipe(retry(0), catchError(this.handleError));
  // }





}


export function toHttpParams(obj: Object): HttpParams {
  let params = new HttpParams();
  if (!obj) return params;
  Object.getOwnPropertyNames(obj).forEach(key => {
    if (obj[key] !== undefined && obj[key] !== null) {
      params = params.set(key, obj[key]);
    }
  });
  return params;
}
