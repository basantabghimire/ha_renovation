import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private sheetId = '1RjjA1L5fKj3HRpHN41oMmpvN_C8bVhEZt9YDF6LsXxc'; 
  private sheetName = 'Form Responses 1'; 

  private get url(): string {
    const encodedName = encodeURIComponent(this.sheetName);
    return `https://docs.google.com/spreadsheets/d/${this.sheetId}/gviz/tq?tqx=out:json&sheet=${encodedName}`;
  }

  constructor(private http: HttpClient) {}

  // Helper function to safely extract string values from Google Sheet cells
  private parseCell(cell: any): string {
    if (!cell) return '';
    if (cell.v !== undefined && cell.v !== null) return String(cell.v).trim();
    if (cell.f !== undefined && cell.f !== null) return String(cell.f).trim();
    return '';
  }

  // Helper function to convert Google's "Date(2026,6,10,...)" string into a standard JS Date object
  private parseGoogleDate(dateStr: string): Date | null {
    if (!dateStr || !dateStr.includes('Date')) return null;
    const matches = dateStr.match(/\d+/g);
    if (matches && matches.length >= 3) {
      // Note: Google Sheets months are 0-indexed (January is 0)
      return new Date(Number(matches[0]), Number(matches[1]), Number(matches[2]));
    }
    return null;
  }

  getReviews(): Observable<any[]> {
    return this.http.get(this.url, { responseType: 'text' }).pipe(
      map(res => {
        const r = res.match(/google\.visualization\.Query\.setResponse\(([\s\S\s]*)\);/);
        if (r && r[1]) {
          const json = JSON.parse(r[1]);
          const rows = json.table.rows;
          
          // Filter out the header row safely
          const dataRows = rows.filter((row: any) => row.c && row.c[0] && this.parseCell(row.c[0]) !== 'Timestamp');
          
          return dataRows.map((row: any) => {
            const rawDate = row.c[0]?.v ? String(row.c[0].v) : '';
            
            return {
              timestamp: this.parseGoogleDate(rawDate),  // Now a true JS Date object
              name: this.parseCell(row.c[2]) || 'Anonymous', // Column C
              services: this.parseCell(row.c[3]),           // Column D
              rating: row.c[4]?.v || 5,                      // Column E
              comment: this.parseCell(row.c[11])            // Column L (Feedback text)
            };
          }).reverse(); 
        }
        return [];
      })
    );
  }
}