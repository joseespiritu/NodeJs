import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiDataService {

  constructor(private http: HttpClient) { }

  host = 'http://localhost:2020';

  getJson() {
    const _URL = this.host+'/api/fromoracle';
    return this.http.get(_URL);
  }

}
