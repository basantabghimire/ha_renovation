import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import  Offer  from '../models/offer';

@Injectable({
  providedIn: 'root',
})
export class OfferService {
  private offersUrl = 'assets/har-data/har-offer.json'; // Path to your JSON file
  constructor(private http: HttpClient) {}

  getItems(): Observable<Offer[]> {
    return this.http.get<Offer[]>(this.offersUrl);
  }
}
