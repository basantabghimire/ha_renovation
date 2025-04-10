import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { OfferComponent } from "../offer/offer.component";
import { TestimonialsComponent } from "../testimonials/testimonials.component";


@Component({
  selector: 'app-home',
  imports: [RouterModule, OfferComponent, TestimonialsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(private router: Router) {}

  goToContact() {
    this.router.navigate(['/HA-Contact']);
  }

  title = 'HA Renovation';
  description =
    'We specialize in renovations that blend quality, functionality, and value.';
  homePageImage = 'assets/images/homeImage.svg';
  homePageImage1 = 'assets/images/homeImage1.png';
  slogan = 'On Time On Budget';
  contactButton = "Let's talk";
}
