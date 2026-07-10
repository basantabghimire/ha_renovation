import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // <-- 1. Add this import
import { ReviewService } from '../services/review.service'; // Fixed path based on your folder structure

@Component({
  selector: 'app-review',
  standalone: true,                          // <-- This is implicitly true or explicitly written here
  imports: [CommonModule],                   // <-- 2. Add CommonModule here
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  reviews: any[] = [];

  constructor(public reviewService: ReviewService) {}

  ngOnInit(): void {
    this.reviewService.getReviews().subscribe({
      next: (data: any[]) => this.reviews = data,
      error: (err: any) => console.error('Error fetching reviews:', err)
    });
  }
}