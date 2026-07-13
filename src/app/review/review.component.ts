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
    'Basement ','Kitchen ', 'Bathroom', 'Drywall installation', 'Mudding and taping', 
    'Structural Framing', 'Flooring Services', 'Commercial & Retail Space Renovations',
    'Living Space Transformations', 'Roofing', 'Plumbing', 'Deck and fence', 
    'Renovation & Remodeling', 'whole Home','Exterior','Other' 
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
    // 1. Rating Filter (Strict match check)
    const matchesRating = !this.selectedRating || review.rating.toString() === this.selectedRating;

    // Normalize the services text from Google Sheets to lowercase
    const reviewServicesStr = (review.services || '').toLowerCase();

    // 2. Dropdown Service Filter (Handles substring matching, e.g., "Kitchen" matches "Kitchen, Bathroom")
    const matchesServiceDropdown = !this.selectedService || 
      reviewServicesStr.includes(this.selectedService.toLowerCase());

    // 3. Search Bar Filter (Allows typing multi-word queries like "kitchen and bathroom" or "deck, fence")
    let matchesSearch = true;
    if (this.searchText.trim() !== '') {
      // Split user search into individual words, filtering out filler words like "and", "or", "&"
      const searchWords = this.searchText
        .toLowerCase()
        .split(/[\s,]+/) // Split by spaces or commas
        .filter(word => word.length > 1 && word !== 'and' && word !== 'or');

      // Check if the review's services, name, or comments contain the search keywords
      const reviewName = (review.name || '').toLowerCase();
      const reviewComment = (review.comment || '').toLowerCase();

      // Every typed keyword must find a match somewhere in the name, services list, or comment
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
    this.visibleCount = this.visibleCount + 16;
    // Spreading the array forces Angular's change detection to re-run the template lifecycle
    this.filteredReviews = [...this.filteredReviews]; 
  }
}