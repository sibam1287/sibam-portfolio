import { Component, AfterViewInit, ElementRef, ViewChild, inject, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, ArrowUp, Github, Linkedin, Mail } from 'lucide-angular';
import { PORTFOLIO_DATA } from '../../core/constants/portfolio-data';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <footer class="footer" #footerSection>
      <div class="footer-container">
        <div class="footer-content" #footerContent>
          <div class="brand">
            <h3 class="text-gradient">{{profile.name}}</h3>
            <p class="role">{{profile.role}}</p>
            <p class="tagline">Building scalable applications, one line of code at a time.</p>
          </div>
          
          <div class="socials">
            <a *ngFor="let link of socialLinks" [href]="link.url" target="_blank" [attr.aria-label]="link.name" class="social-link">
              <lucide-icon [name]="link.icon" [size]="20"></lucide-icon>
            </a>
          </div>
        </div>
        
        <div class="footer-bottom" #footerBottom>
          <p>&copy; {{currentYear}} {{profile.name}}. All rights reserved.</p>
          <button class="back-to-top" (click)="scrollToTop()" aria-label="Back to top">
            <lucide-icon name="arrow-up" [size]="20"></lucide-icon>
          </button>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background-color: transparent;
      padding: 4rem 0 2rem;
      border-top: 1px solid var(--border-color);
      position: relative;
      overflow: hidden;
    }
    .footer::before {
      content: '';
      position: absolute;
      bottom: 0; left: 0; width: 100%; height: 50%;
      background: linear-gradient(to top, rgba(59, 130, 246, 0.05), transparent);
      z-index: -1;
    }
    .footer-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 2rem;
    }
    .footer-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      margin-bottom: 4rem;
    }
    @media (min-width: 768px) {
      .footer-content {
        flex-direction: row;
        justify-content: space-between;
        text-align: left;
      }
    }
    .brand h3 {
      font-size: 2rem;
      margin-bottom: 0.5rem;
      font-weight: 800;
      letter-spacing: -0.05em;
    }
    .role {
      color: var(--text-primary);
      font-weight: 600;
      font-size: 1.1rem;
      margin-bottom: 1rem;
    }
    .tagline {
      color: var(--text-secondary);
      max-width: 320px;
      line-height: 1.6;
    }
    .socials {
      display: flex;
      gap: 1rem;
      margin-top: 2.5rem;
    }
    @media (min-width: 768px) {
      .socials { margin-top: 0; }
    }
    .social-link {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 48px; height: 48px;
      border-radius: 50%;
      background: var(--bg-glass);
      backdrop-filter: blur(8px);
      color: var(--text-secondary);
      border: 1px solid var(--border-color);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .social-link:hover {
      color: var(--accent-primary);
      border-color: var(--accent-primary);
      transform: translateY(-5px);
      background: rgba(59, 130, 246, 0.1);
      box-shadow: 0 10px 20px rgba(59, 130, 246, 0.15);
    }
    .footer-bottom {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      padding-top: 2rem;
      border-top: 1px solid var(--border-color);
      color: var(--text-secondary);
      font-size: 0.875rem;
      gap: 1.5rem;
    }
    @media (min-width: 768px) {
      .footer-bottom {
        flex-direction: row;
        gap: 0;
      }
    }
    .back-to-top {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 44px; height: 44px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
      color: white;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
    }
    .back-to-top:hover {
      transform: translateY(-5px) scale(1.05);
      box-shadow: 0 10px 25px rgba(59, 130, 246, 0.4);
    }
  `]
})
export class FooterComponent implements AfterViewInit {
  @ViewChild('footerSection') footerSection!: ElementRef;
  @ViewChild('footerContent') footerContent!: ElementRef;
  @ViewChild('footerBottom') footerBottom!: ElementRef;

  profile = PORTFOLIO_DATA.profile;
  socialLinks = PORTFOLIO_DATA.socialLinks;
  currentYear = new Date().getFullYear();
  
  destroyRef = inject(DestroyRef);

  ngAfterViewInit() {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Elements inside footer content
      const brandElements = this.footerContent.nativeElement.querySelector('.brand').children;
      const socialElements = this.footerContent.nativeElement.querySelectorAll('.social-link');

      gsap.from(brandElements, {
        scrollTrigger: {
          trigger: this.footerSection.nativeElement,
          start: 'top 90%',
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out'
      });

      gsap.from(socialElements, {
        scrollTrigger: {
          trigger: this.footerSection.nativeElement,
          start: 'top 90%',
        },
        scale: 0,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out(1.5)',
        delay: 0.3
      });

      gsap.from(this.footerBottom.nativeElement.children, {
        scrollTrigger: {
          trigger: this.footerSection.nativeElement,
          start: 'top 95%',
        },
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: 'power2.out',
        delay: 0.5
      });
    });

    this.destroyRef.onDestroy(() => ctx.revert());
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
