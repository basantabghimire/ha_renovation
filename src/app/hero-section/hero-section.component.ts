import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-hero-section',
  imports: [RouterModule],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.css',
})
export class HeroSectionComponent {
  constructor(private router: Router) {}

  goToContact() {
    this.router.navigate(['/HA-Contact']);
  }

  title = 'HA Renovation';
  Intro =
    "Serving the Greater Toronto Area (GTA), HA Renovation is a reliable partner for all your renovation needs. Specializing in comprehensive transformations, they excel in kitchen and bathroom remodeling, living area enhancements, and commercial space renovations, including offices and retail locations. Their basement renovation services are particularly notable, focusing on creating both functional and aesthetically pleasing living spaces. Committed to delivering exceptional craftsmanship and prioritizing customer satisfaction, HA Renovation operates under the principle of 'on time, on budget,' ensuring a smooth and successful project from start to finish.";
  introImage = 'assets/images/introImage.png';
  slogan = 'On Time On Budget';
  contactButton = "Let's talk";
}
