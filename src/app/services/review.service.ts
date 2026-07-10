import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private sheetId = '1RjjA1L5fKj3HRpHN41oMmpvN_C8bVhEZt9YDF6LsXxc'; // Replace with your actual Google Sheet ID
  private sheetName = 'Form Responses 1'; // Updated to match your sheet tab perfectly

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
          
          // Filter out header row
          const dataRows = rows.filter((row: any) => row.c && row.c[0] && row.c[0].v !== 'Timestamp');
          
          return dataRows.map((row: any) => ({
            timestamp: row.c[0]?.v,
            name: row.c[2]?.v || 'Anonymous',    // Column C: Name
            services: row.c[3]?.v || '',          // Column D: Services 
            rating: row.c[4]?.v || 5,             // Column E: Quality of Workmanship Rating
            comment: row.c[8]?.v || ''            // Adjust this index if you have a specific written comments column later in the sheet
          })).reverse(); 
        }
        return [];
      })
    );
  }
}