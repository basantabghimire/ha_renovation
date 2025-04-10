import { AfterViewInit, Component, ElementRef } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [RouterModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent implements AfterViewInit {
  constructor(private elementRef: ElementRef, private router: Router) {}
  emailDirect = 'harenovation2@gmail.com';

  getMailToLink(subject: string, body: string) {
    const recipient = 'harenovation2@gmail.com';
    return `mailto:${encodeURIComponent(
      recipient
    )}?subject=${subject}&body=${body}`;
  }
  getGmailLink(subject: string, body: string) {
    const recipient = 'harenovation2@gmail.com';
    return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
      recipient
    )}&su=${subject}&body=${body}`;
  }

  getOutlookLink(subject: string, body: string) {
    const recipient = 'harenovation2@gmail.com';
    const encodedBody = body.replace(/\+/g, '%20'); // Replace '+' with '%20'
    return `https://outlook.live.com/mail/0/deeplink/compose?to=${encodeURIComponent(
      recipient
    )}&subject=${subject}&body=${encodedBody}`;
  }

  ngAfterViewInit() {
    const gmailLink = this.elementRef.nativeElement.querySelector('#gmailLink');
    const outlookLink =
      this.elementRef.nativeElement.querySelector('#outlookLink');
    const yahooLink = this.elementRef.nativeElement.querySelector('#yahooLink');
    const subjectInput = this.elementRef.nativeElement.querySelector(
      '#subjectPlaceholder'
    );
    const bodyInput =
      this.elementRef.nativeElement.querySelector('#bodyPlaceholder');

    if (gmailLink && outlookLink && yahooLink && subjectInput && bodyInput) {
      gmailLink.addEventListener('click', (event: any) => {
        gmailLink.href = this.getGmailLink(
          encodeURIComponent(subjectInput.value),
          encodeURIComponent(bodyInput.value)
        );
      });

      outlookLink.addEventListener('click', (event: any) => {
        outlookLink.href = this.getOutlookLink(
          encodeURIComponent(subjectInput.value),
          encodeURIComponent(bodyInput.value)
        );
      });
    }
  }

  handleReviewFormClick(event: MouseEvent): void {
    event.preventDefault();
    window.open(
      'https://docs.google.com/forms/d/e/1FAIpQLSeMFeeh0qxyCW66ekZn9aGc8I9XvPvi35V_9xUAk4aJMn5v_g/viewform?usp=header',
      '_blank',
      'noopener noreferrer'
    );
  }
}
