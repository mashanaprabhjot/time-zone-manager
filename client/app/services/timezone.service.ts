import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class TimeZoneService {

    private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8', "x-access-token": (localStorage != null && localStorage != undefined && localStorage.getItem("token") != null && localStorage.getItem("token") != undefined ? localStorage.getItem("token") : "") });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  getTimezones(userId): Observable<any> {
      return this.http.get(`/api/timezones/${userId}`, this.options).map(res => res.json());
  }

  countTimezones(userId): Observable<any> {
      return this.http.get(`/api/timezones/count/${userId}`, this.options).map(res => res.json());
  }

  addTimezone(timezone): Observable<any> {
      return this.http.post('/api/timezone', JSON.stringify(timezone), this.options);
  }

  getTimezone(timezone, userId): Observable<any> {
      return this.http.get(`/api/timezone/${timezone._id}/${userId}`, this.options).map(res => res.json());
  }

  getTimezonebyName(name, userId): Observable<any> {
      return this.http.get(`/api/timezone/getbyname/${name}/${userId}`, this.options).map(res => res.json());
  }

  editTimezone(timezone, userId): Observable<any> {
      return this.http.put(`/api/timezone/${timezone._id}/${userId}`, JSON.stringify(timezone), this.options);
  }

  deleteTimezone(timezone, userId): Observable<any> {
      return this.http.delete(`/api/timezone/${timezone._id}/${userId}`, this.options);
  }
}