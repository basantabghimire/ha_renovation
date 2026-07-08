import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  // Replace these with your actual details
  private sheetId = 'YOUR_SPREADSHEET_ID_HERE'; 
  private sheetName = 'Form Responses 1'; 
  private apiKey = 'YOUR_GOOGLE_CLOUD_API_KEY_HERE'; // Optional but highly recommended for stability

  // Alternative completely free URL format (No API Key required)
  private url = `https://docs.google.com/spreadsheets/d/${this.sheetId}/gviz/tq?tqx=out:json&sheet=${this.sheetName}`;

  constructor(private http: HttpClient) {}

  getReviews(): Observable<any[]> {
    return this.http.get(this.url, { responseType: 'text' }).pipe(
      map(res => {
        // The gviz endpoint returns text wrapped in a function, we must parse out the pure JSON
        const r = res.match(/google\.visualization\.Query\.setResponse\(([\s\S\s]*)\);/);
        if (r && r[1]) {
          const json = JSON.parse(r[1]);
          const rows = json.table.rows;
          
          // Map rows into clean objects depending on your form structure
          return rows.map((row: any) => ({
            timestamp: row.c[0]?.v,
            name: row.c[1]?.v,    // Assuming Column B is Name
            rating: row.c[2]?.v,  // Assuming Column C is Rating
            comment: row.c[3]?.v  // Assuming Column D is Review Comment
          })).reverse(); // Reverse so newest reviews show up first
        }
        return [];
      })
    );
  }
}