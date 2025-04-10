import { Routes } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { HeroSectionComponent } from './hero-section/hero-section.component';

import { HomeComponent } from './home/home.component';
import { BlogComponent } from './blog/blog.component';
import { ProjectComponent } from './project/project.component';
import { OfferComponent } from './offer/offer.component';

export const routes: Routes = [
  { path: 'HA-about', component: HeroSectionComponent },
  { path: 'HA-testimonial', component: TestimonialsComponent },
  { path: 'HA-contact', component: ContactComponent },
  { path: 'HA-service', component: OfferComponent },
  { path: 'HA-blog', component: BlogComponent },
  { path: 'HA-renovation', component: HomeComponent },
  { path: 'HA-project', component: ProjectComponent },
  { path: '', redirectTo: '/HA-renovation', pathMatch: 'full' },
];
