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
    this.visibleCount = 16; 

    this.filteredReviews = this.allReviews.filter(review => {
      const matchesRating = !this.selectedRating || review.rating.toString() === this.selectedRating;
      const matchesService = !this.selectedService || 
        (review.services && review.services.toLowerCase().includes(this.selectedService.toLowerCase()));
      const matchesSearch = !this.searchText || 
        review.name.toLowerCase().includes(this.searchText.toLowerCase()) || 
        (review.comment && review.comment.toLowerCase().includes(this.searchText.toLowerCase()));

      return matchesRating && matchesService && matchesSearch;
    });
  }

  // 3. Updated function to force Angular to recognize the update
  loadMore(): void {
    this.visibleCount = this.visibleCount + 16;
    // Spreading the array forces Angular's change detection to re-run the template lifecycle
    this.filteredReviews = [...this.filteredReviews]; 
  }
}