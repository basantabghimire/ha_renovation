import { Component, OnInit } from '@angular/core';
import { CommonModule, SlicePipe } from '@angular/common'; // <-- 1. Add SlicePipe here explicitly
import { FormsModule } from '@angular/forms';
import { ReviewService } from '../services/review.service';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [CommonModule, FormsModule, SlicePipe], // <-- 2. Add SlicePipe here too
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  allReviews: any[] = [];
  filteredReviews: any[] = [];
  visibleCount = 16;

  // Filter states
  selectedRating: string = '';
  selectedService: string = '';
  searchText: string = '';

  // Dynamic Service Dropdown List extracted from your actual services
  serviceOptions: string[] = [
  'Basement', 'Kitchen', 'Bathroom', 'Drywall installation', 'Mudding and taping', 
  'Structural Framing', 'Flooring Services', 'Commercial & Retail Space Renovations',
  'Living Space Transformations', 'Roofing', 'Plumbing', 'Deck and fence', 
  'Renovation & Remodeling', 'Whole Home', 'Exterior', 'Other' 
];

  constructor(public reviewService: ReviewService) {}

  ngOnInit(): void {
    this.reviewService.getReviews().subscribe({
      next: (data: any[]) => {
        this.allReviews = data;
        this.applyFilters();
      },
      error: (err: any) => console.error('Error fetching reviews:', err)
    });
  }

applyFilters(): void {
  this.visibleCount = 9; 

  this.filteredReviews = this.allReviews.filter(review => {
    // 1. Rating Filter
    const matchesRating = !this.selectedRating || review.rating.toString() === this.selectedRating;

    // Normalize and clean spreadsheet text strings
    const reviewServicesStr = (review.services || '').toLowerCase();

    // 2. Dropdown Service Filter (Adding .trim() fixes accidental whitespaces)
    const cleanSelectedService = this.selectedService.trim().toLowerCase();
    const matchesServiceDropdown = !this.selectedService || 
      reviewServicesStr.includes(cleanSelectedService);

    // 3. Search Input Filter
    let matchesSearch = true;
    const cleanSearchText = this.searchText.trim().toLowerCase();
    
    if (cleanSearchText !== '') {
      // Split search text by spaces or commas, stripping out words like "and"
      const searchWords = cleanSearchText
        .split(/[\s,]+/)
        .filter(word => word.length > 0 && word !== 'and' && word !== 'or');

      const reviewName = (review.name || '').toLowerCase();
      const reviewComment = (review.comment || '').toLowerCase();

      // Check if every word typed matches somewhere in the client name, services list, or comment
      matchesSearch = searchWords.every(word => 
        reviewName.includes(word) || 
        reviewServicesStr.includes(word) || 
        reviewComment.includes(word)
      );
    }

    return matchesRating && matchesServiceDropdown && matchesSearch;
  });
}

  // 3. Updated function to force Angular to recognize the update
  loadMore(): void {
    this.visibleCount = this.visibleCount + 9;
    // Spreading the array forces Angular's change detection to re-run the template lifecycle
    this.filteredReviews = [...this.filteredReviews]; 
  }
}