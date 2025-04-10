import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent implements OnInit {
  contactForm!: FormGroup;
  title = 'Contact';
  name = 'Welcome to HA Renovation';
  email =
    'We specialize in home renovations that blend beauty, functionality, and value.';
  phone = 'assets/images/bannerImage.png';
  service = '';
  wellComeMessage =
    'Welcome to HA-Renovation! We’re here to make your renovation ideas a reality with top-quality work and reliable service. Whether it’s improving your home or updating a commercial space, we’ll deliver great results—on time on budget. Let’s create something incredible!';
  formSubmitted = false;
  submissionStatus: 'idle' | 'success' | 'error' = 'idle';
  recipientEmail = 'contact.harenovation@gmail.com'; // Make sure this is the correct email
  private serviceId = 'service_m8wc9xj'; // Replace with your actual EmailJS service ID
  private templateId = 'template_9whl9s8'; // Replace with your actual EmailJS template ID
  private userId = 'oUd_aKopiTxw5ktMc'; // Replace with your EmailJS user ID
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      serviceSelect: ['', Validators.required],
      message: ['', Validators.required],
    });
    emailjs.init(this.userId); // Initialize EmailJS with your User ID
  }

  onSubmit(): void {
    this.formSubmitted = true;
    if (this.contactForm.valid) {
      const formData = {
        firstName: this.contactForm.value.firstName,
        lastName: this.contactForm.value.lastName,
        email: this.contactForm.value.email,
        phoneNumber: this.contactForm.value.phoneNumber,
        serviceSelect: this.contactForm.value.serviceSelect,
        message: this.contactForm.value.message,
      };

      // Send email using emailjs
      emailjs.send(this.serviceId, this.templateId, formData).then(
        (response) => {
          console.log('SUCCESS!', response); // Log the entire response
          this.submissionStatus = 'success';
          this.contactForm.reset();
          this.formSubmitted = false;
          setTimeout(() => {
            this.submissionStatus = 'idle';
          }, 3000);
        },
        (error) => {
          console.error('FAILED...', error); // Log the entire error object
          this.submissionStatus = 'error';
        }
      );
    } else {
      this.submissionStatus = 'error';
      Object.values(this.contactForm.controls).forEach((control) => {
        control.markAsTouched();
      });
    }
  }
}
