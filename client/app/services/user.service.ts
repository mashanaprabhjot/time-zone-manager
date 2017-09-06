import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8', "x-access-token": (localStorage != null && localStorage != undefined && localStorage.getItem("token") != null && localStorage.getItem("token") != undefined ? localStorage.getItem("token") : "") });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) {

  }

  setHeader() {
      this.headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8', "x-access-token": (localStorage != null && localStorage != undefined && localStorage.getItem("token") != null && localStorage.getItem("token") != undefined ? localStorage.getItem("token") : "") });
      this.options = new RequestOptions({ headers: this.headers });
  }
  register(user): Observable<any> {
      
    return this.http.post('/api/user', JSON.stringify(user), this.options);
  }

  login(credentials): Observable<any> {
    return this.http.post('/api/login', JSON.stringify(credentials), this.options);
  }

  getUsers(): Observable<any> {
      return this.http.get('/api/users', this.options).map(res => res.json());
  }
  getUsersOnly(): Observable<any> {
      return this.http.get('/api/usersonly', this.options).map(res => res.json());
  }
  countUsers(): Observable<any> {
      return this.http.get('/api/users/count', this.options).map(res => res.json());
  }

  addUser(user): Observable<any> {
    return this.http.post('/api/user', JSON.stringify(user), this.options);
  }

  getUser(user): Observable<any> {
      return this.http.get(`/api/user/${user._id}`, this.options).map(res => res.json());
  }
  getUserbyEmail(email): Observable<any> {
      return this.http.get(`/api/user/getuserbyemail/${email}`, this.options).map(res => res.json());
  }

  editUser(user): Observable<any> {
    return this.http.put(`/api/user/${user._id}`, JSON.stringify(user), this.options);
  }

  deleteUser(user): Observable<any> {
    return this.http.delete(`/api/user/${user._id}`, this.options);
  }
  
}
