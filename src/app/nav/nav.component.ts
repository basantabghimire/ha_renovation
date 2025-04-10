import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav',
  imports: [RouterModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent {
  constructor(private router: Router) {}

  // goToAbout() {
  //   this.router.navigate(['/HA-about']);
  // }

  goToTestimonial() {
    this.router.navigate(['/HA-testimonial']);
  }

  goToContact() {
    this.router.navigate(['/HA-contact']);
  }

  goToService() {
    this.router.navigate(['/HA-service']);
  }
}
