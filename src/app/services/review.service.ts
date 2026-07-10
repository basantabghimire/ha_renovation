import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private sheetId = '1dj9ahCIsH4CikTL0wDMTix94Ba0QBgY4lULiIRXx0pI'; 
  
  // NOTE: If you haven't renamed your spreadsheet tab to 'Sheet1', 
  // change this back to 'Form Responses 1'
  private sheetName = 'Form Responses 1'; 

  private get url(): string {
    const encodedName = encodeURIComponent(this.sheetName);
    return `https://docs.google.com/spreadsheets/d/${this.sheetId}/gviz/tq?tqx=out:json&sheet=${encodedName}`;
  }

  constructor(private http: HttpClient) {}

  getReviews(): Observable<any[]> {
    return this.http.get(this.url, { responseType: 'text' }).pipe(
      map(res => {
        const r = res.match(/google\.visualization\.Query\.setResponse\(([\s\S\s]*)\);/);
        if (r && r[1]) {
          const json = JSON.parse(r[1]);
          const rows = json.table.rows;
          
          // Using a conditional filter to bypass the first header row if it contains column titles
          const dataRows = rows.filter((row: any) => row.c && row.c[0] && row.c[0].v !== 'Timestamp');
          
          return dataRows.map((row: any) => ({
            timestamp: row.c[0]?.v,
            name: row.c[1]?.v || 'Anonymous',    // Column B
            rating: row.c[2]?.v || 5,             // Column C
            comment: row.c[3]?.v || ''            // Column D
          })).reverse(); 
        }
        return [];
      })
    );
  }
}