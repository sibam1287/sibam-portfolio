import { Component, ElementRef, ViewChild, AfterViewInit, DestroyRef, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { ContactService } from '../../../../core/services/contact.service';
import { PORTFOLIO_DATA } from '../../../../core/constants/portfolio-data';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LucideAngularModule],
  template: `
    <section id="contact" class="contact section" #contactSection>
      <div class="container">
        <div class="section-header-left">
          <h2 class="section-title">Contact <span>Me</span></h2>
        </div>

        <div class="contact-content">
          <!-- Left Column: Contact Details -->
          <div class="contact-card info-card" #info>
            <p class="intro-text">Let's work together. Send me a message.</p>
            
            <div class="info-list">
              <div class="info-item">
                <div class="icon-box">
                  <lucide-icon name="map-pin" [size]="20"></lucide-icon>
                </div>
                <span>Sector 63, Noida - 201301,<br>Uttar Pradesh, India</span>
              </div>
              
              <div class="info-item">
                <div class="icon-box">
                  <lucide-icon name="phone" [size]="20"></lucide-icon>
                </div>
                <span>+91 7909007315</span>
              </div>
              
              <div class="info-item">
                <div class="icon-box">
                  <lucide-icon name="mail" [size]="20"></lucide-icon>
                </div>
                <span>{{ profile.contactEmail }}</span>
              </div>
              
              <div class="info-item">
                <div class="icon-box">
                  <lucide-icon name="calendar" [size]="20"></lucide-icon>
                </div>
                <span>Freelance Available</span>
              </div>
            </div>

            <div class="contact-socials">
              <a *ngFor="let link of socialLinks" [href]="link.url" target="_blank" class="social-icon-btn" [title]="link.name">
                <lucide-icon [name]="link.icon" [size]="20"></lucide-icon>
              </a>
            </div>
          </div>
          
          <!-- Middle Column: Form -->
          <div class="contact-card form-card" #formWrapper>
            <form *ngIf="!isSuccess()" [formGroup]="contactForm" (ngSubmit)="onSubmit()" class="contact-form">
              <div class="form-row">
                <div class="form-group">
                  <input type="text" id="name" formControlName="name" placeholder="Your Name" [class.error]="isInvalid('name')">
                </div>
                <div class="form-group">
                  <input type="email" id="email" formControlName="email" placeholder="Your Email" [class.error]="isInvalid('email')">
                </div>
              </div>
              
              <div class="form-group">
                <input type="text" id="subject" formControlName="subject" placeholder="Subject" [class.error]="isInvalid('subject')">
              </div>
              
              <div class="form-group">
                <textarea id="message" formControlName="message" rows="6" placeholder="Your Message" [class.error]="isInvalid('message')"></textarea>
              </div>
              
              <div class="btn-container">
                <button type="submit" class="btn-submit" [disabled]="contactForm.invalid || isSubmitting()">
                  <span *ngIf="isSubmitting()" class="spinner"></span>
                  <span>{{ isSubmitting() ? 'Sending...' : 'Send Message' }}</span>
                </button>
              </div>
            </form>
            
            <div class="success-state" *ngIf="isSuccess()">
              <div class="success-icon-wrapper">
                <lucide-icon name="check-circle" [size]="64" class="success-icon"></lucide-icon>
              </div>
              <h3>Message Sent Successfully!</h3>
              <button class="btn-submit outline" (click)="resetForm()">Send Another Message</button>
            </div>
          </div>

          <!-- Right Column: Map -->
          <div class="contact-card map-card" #mapWrapper>
            <iframe 
              [src]="mapUrl" 
              width="100%" 
              height="100%" 
              style="border:0;" 
              allowfullscreen="" 
              loading="lazy" 
              referrerpolicy="no-referrer-when-downgrade">
            </iframe>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .contact {
      position: relative;
    }
    .section-header-left { 
      margin-bottom: 2rem; 
      text-align: left; 
    }
    .section-title {
      font-size: 2.5rem;
      font-weight: 700;
    }
    .section-title span {
      color: var(--accent-primary);
    }
    
    .contact-content {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
    
    @media (min-width: 992px) {
      .contact-content { 
        grid-template-columns: 1fr 1fr 1fr; 
        align-items: stretch;
      }
    }
    
    .contact-card {
      background: var(--bg-secondary);
      border: 1px solid var(--border-color);
      border-radius: 1rem;
      padding: 2rem;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
      transition: border-color 0.3s ease;
    }
    
    .contact-card:hover {
      border-color: rgba(139, 92, 246, 0.3);
    }
    
    /* Left Column Info */
    .intro-text {
      color: var(--text-secondary);
      margin-bottom: 2rem;
      font-size: 1.05rem;
      line-height: 1.5;
    }
    
    .info-list {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
    
    .info-item {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    
    .info-item span {
      color: var(--text-primary);
      font-size: 0.95rem;
      line-height: 1.4;
    }
    
    .icon-box {
      width: 40px;
      height: 40px;
      border-radius: 10px;
      background: rgba(139, 92, 246, 0.15); /* Purple tint */
      color: var(--accent-primary);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    
    .contact-socials {
      margin-top: 2.5rem;
      display: flex;
      gap: 1rem;
    }
    
    .social-icon-btn {
      width: 45px;
      height: 45px;
      border-radius: 50%;
      background: var(--bg-primary);
      border: 1px solid var(--border-color);
      color: var(--text-primary);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .social-icon-btn:hover {
      background: var(--accent-primary);
      color: white;
      border-color: var(--accent-primary);
      transform: translateY(-4px) scale(1.05);
      box-shadow: 0 10px 20px rgba(139, 92, 246, 0.3);
    }
    
    /* Middle Column Form */
    .contact-form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      height: 100%;
    }
    
    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }
    
    .form-group input, .form-group textarea {
      width: 100%;
      padding: 1rem;
      border-radius: 0.5rem;
      border: 1px solid var(--border-color);
      background: var(--bg-primary); /* Darker input bg */
      color: var(--text-primary);
      font-family: inherit;
      font-size: 0.95rem;
      transition: all 0.3s ease;
    }
    
    .form-group textarea {
      resize: vertical;
    }
    
    .form-group input:focus, .form-group textarea:focus {
      outline: none;
      border-color: var(--accent-primary);
    }
    
    .form-group input.error, .form-group textarea.error { border-color: #ef4444; }
    
    .btn-container {
      margin-top: auto;
      display: flex;
      justify-content: center;
      padding-top: 1rem;
    }
    
    .btn-submit {
      background: var(--accent-primary);
      color: white;
      border: none;
      border-radius: 0.5rem;
      padding: 0.8rem 2.5rem;
      font-weight: 600;
      font-size: 1rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      transition: all 0.3s ease;
    }
    
    .btn-submit:hover:not([disabled]) {
      background: var(--accent-secondary);
      transform: translateY(-2px);
      box-shadow: 0 10px 20px rgba(139, 92, 246, 0.2);
    }
    
    .btn-submit[disabled] {
      opacity: 0.7;
      cursor: not-allowed;
    }
    
    .btn-submit.outline {
      background: transparent;
      border: 1px solid var(--accent-primary);
      color: var(--accent-primary);
    }
    
    /* Right Column Map */
    .map-card {
      padding: 0;
      overflow: hidden;
      min-height: 300px;
    }
    
    .spinner {
      width: 18px; height: 18px;
      border: 2px solid rgba(255,255,255,0.3);
      border-top-color: white;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
    @keyframes spin { 100% { transform: rotate(360deg); } }
    
    .success-state {
      display: flex; flex-direction: column; align-items: center; text-align: center; justify-content: center;
      height: 100%; gap: 1.5rem;
      animation: fadeIn 0.5s ease;
    }
    .success-icon-wrapper {
      width: 80px; height: 80px;
      border-radius: 50%;
      background: rgba(16, 185, 129, 0.1);
      display: flex; align-items: center; justify-content: center;
    }
    .success-icon { color: #10b981; }
    .success-state h3 { font-size: 1.5rem; font-weight: 700; color: #10b981; }
    
    @keyframes fadeIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
  `]
})
export class ContactComponent implements AfterViewInit {
  @ViewChild('contactSection') contactSection!: ElementRef;
  @ViewChild('info') info!: ElementRef;
  @ViewChild('formWrapper') formWrapper!: ElementRef;
  @ViewChild('mapWrapper') mapWrapper!: ElementRef;

  profile = PORTFOLIO_DATA.profile;
  socialLinks = PORTFOLIO_DATA.socialLinks;
  
  fb = inject(FormBuilder);
  contactService = inject(ContactService);
  destroyRef = inject(DestroyRef);
  sanitizer = inject(DomSanitizer);
  ctx!: gsap.Context;
  
  // Safe URL for Google Maps embed (Sector 63, Noida)
  mapUrl: SafeResourceUrl;

  contactForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', Validators.required],
    message: ['', [Validators.required, Validators.minLength(10)]]
  });

  isSubmitting = signal(false);
  isSuccess = signal(false);
  
  constructor() {
    this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14008.204558509438!2d77.37580665!3d28.62821155!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce5456ef36d9f%3A0x3b7191b128613608!2sSector%2063%2C%20Noida%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin");
  }

  isInvalid(field: string): boolean {
    const control = this.contactForm.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  onSubmit() {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    this.contactService.sendMessage(this.contactForm.value).subscribe({
      next: () => {
        this.isSubmitting.set(false);
        this.isSuccess.set(true);
      },
      error: () => {
        this.isSubmitting.set(false);
      }
    });
  }

  resetForm() {
    this.contactForm.reset();
    this.isSuccess.set(false);
  }

  ngAfterViewInit() {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    this.ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: this.contactSection.nativeElement,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      });

      tl.from('.section-title', { opacity: 0, y: 30, duration: 0.8, ease: 'power3.out' })
        .from(this.info.nativeElement, { y: 40, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4')
        .from(this.formWrapper.nativeElement, { y: 40, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6')
        .from(this.mapWrapper.nativeElement, { y: 40, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6');
    }, this.contactSection.nativeElement);

    this.destroyRef.onDestroy(() => this.ctx.revert());
  }
}
