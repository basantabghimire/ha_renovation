import { Component, OnInit } from '@angular/core';
import Offer from '../models/offer';
import { OfferService } from '../services/offer.service';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-offer',
  imports: [NgIf, NgFor],
  templateUrl: './offer.component.html',
  styleUrl: './offer.component.css',
})
export class OfferComponent implements OnInit {
  title = 'Service';

  offers: Offer[] | undefined;
  errorMessage: string | undefined;
  loading: boolean = true;

  constructor(private offerService: OfferService) {}

  ngOnInit(): void {
    this.offerService.getItems().subscribe({
      next: (offers) => {
        this.offers = offers;
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = 'There was an error retrieving the offers.';
        this.loading = false;
      },
    });
  }
}
