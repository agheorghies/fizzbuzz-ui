import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './../environments/environment';

export type FizzbuzzSeries = (string | number)[];

@Injectable({
  providedIn: 'root'
})
export class FizzbuzzService {

  constructor(private http: HttpClient) { }

  getSeries(startValue: number, endValue: number): Observable<FizzbuzzSeries> {
    return this.http.get<FizzbuzzSeries>(`${environment.api}/fizzbuzz?begin=${startValue}&end=${endValue}`);
  }
}
