import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FundService {
  constructor(private http: HttpClient) {}

  getFunds(): Observable<any> {
    return this.http.get(`${environment.fundUrl}`);
  }
}
