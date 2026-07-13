import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // <-- 1. Add FormsModule for input binding
import { ReviewService } from '../services/review.service';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [CommonModule, FormsModule], // <-- 2. Include FormsModule here
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  allReviews: any[] = [];
  filteredReviews: any[] = [];
  
  // Pagination State
  visibleCount = 9;

  // Filter States
  selectedRating: string = '';
  selectedService: string = '';
  searchText: string = '';

  // Dynamic Service Dropdown List extracted from your actual services
  serviceOptions: string[] = [
    'Basement ','Kitchen ', 'Bathroom', 'Drywall installation', 'Mudding and taping', 
    'Structural Framing', 'Flooring Services', 'Commercial & Retail Space Renovations',
    'Living Space Transformations', 'Roofing', 'Plumbing', 'Deck and fence', 
    'Renovation & Remodeling', 'Other' 
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

  // Master method to handle searching, ratings, and project category filters
  applyFilters(): void {
    // Reset pagination to first 9 reviews whenever a filter changes
    this.visibleCount = 9; 

    this.filteredReviews = this.allReviews.filter(review => {
      // 1. Filter by Rating
      const matchesRating = !this.selectedRating || review.rating.toString() === this.selectedRating;

      // 2. Filter by Service Name (checks if the text contains the selected category)
      const matchesService = !this.selectedService || 
        (review.services && review.services.toLowerCase().includes(this.selectedService.toLowerCase()));

      // 3. Filter by Free Text Search (Name or Comment)
      const matchesSearch = !this.searchText || 
        review.name.toLowerCase().includes(this.searchText.toLowerCase()) || 
        (review.comment && review.comment.toLowerCase().includes(this.searchText.toLowerCase()));

      return matchesRating && matchesService && matchesSearch;
    });
  }

  // Executed when clicking "Load More"
  loadMore(): void {
    this.visibleCount += 9;
  }
}