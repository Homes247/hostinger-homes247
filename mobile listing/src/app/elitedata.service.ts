import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { HttpClient, HttpErrorResponse, HttpParams, } from '@angular/common/http';
import { catchError, retry, shareReplay } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ElitedataService {


  // public hariKrishna = 'https://api.right2shout.in/subscription_backend/'
  // public hariKrishnaBackendoptimized = 'https://api.right2shout.in/backendoptimized/'

  public hariKrishna = 'https://api.right2shout.in/subscription_backend/'
  public hariKrishnaBackendoptimized = 'https://api.right2shout.in/backendoptimized/'

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



}
