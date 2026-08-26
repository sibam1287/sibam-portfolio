import { Component, ElementRef, ViewChild, AfterViewInit, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { PORTFOLIO_DATA } from '../../../../core/constants/portfolio-data';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <section id="testimonials" class="testimonials section" #testimonialsSection>
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Client Feedback</h2>
          <p class="subtitle">What people say about my work and collaboration.</p>
        </div>

        <div class="testimonials-grid" #testimonialsGrid>
          <div *ngFor="let item of testimonials" class="testimonial-card glass-card">
            <lucide-icon name="quote" class="quote-icon" [size]="48"></lucide-icon>
            <p class="testimonial-text">{{ item.text }}</p>
            <div class="client-info">
              <div class="client-avatar">
                <img [src]="item.avatar" [alt]="item.name" onerror="this.src='assets/images/placeholder-project-1.jpg'">
              </div>
              <div class="client-details">
                <h4>{{ item.name }}</h4>
                <span>{{ item.role }}, {{ item.company }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .testimonials {
      position: relative;
    }
    .section-header { 
      margin-bottom: 4rem; 
      text-align: center; 
      display: flex; 
      flex-direction: column; 
      align-items: center; 
    }
    .subtitle { 
      color: var(--text-secondary); 
      font-size: 1.15rem; 
      max-width: 600px; 
      margin-top: 1rem; 
    }
    
    .testimonials-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 2rem;
    }
    
    @media (min-width: 768px) {
      .testimonials-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
    
    .testimonial-card {
      padding: 2.5rem;
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .testimonial-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
    }
    
    .quote-icon {
      color: var(--accent-primary);
      opacity: 0.2;
      position: absolute;
      top: 1.5rem;
      right: 2rem;
    }
    
    .testimonial-text {
      color: var(--text-primary);
      font-size: 1.1rem;
      line-height: 1.7;
      font-style: italic;
      z-index: 1;
    }
    
    .client-info {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-top: auto;
      padding-top: 1.5rem;
      border-top: 1px solid var(--border-color);
    }
    
    .client-avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      overflow: hidden;
      border: 2px solid var(--accent-secondary);
    }
    
    .client-avatar img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    .client-details h4 {
      font-size: 1.1rem;
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: 0.2rem;
    }
    
    .client-details span {
      font-size: 0.9rem;
      color: var(--text-secondary);
    }
  `]
})
export class TestimonialsComponent implements AfterViewInit {
  @ViewChild('testimonialsSection') testimonialsSection!: ElementRef;
  @ViewChild('testimonialsGrid') testimonialsGrid!: ElementRef;
  
  testimonials = PORTFOLIO_DATA.testimonials;
  
  destroyRef = inject(DestroyRef);
  ctx!: gsap.Context;

  ngAfterViewInit() {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    this.ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: this.testimonialsSection.nativeElement,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      });

      tl.from('.section-title', { opacity: 0, y: 30, duration: 0.8, ease: 'power3.out' })
        .from('.subtitle', { y: 20, opacity: 0, duration: 0.6, ease: 'power2.out' }, '-=0.2')
        .from('.testimonial-card', {
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out'
        }, '-=0.4');
        
    }, this.testimonialsSection.nativeElement);

    this.destroyRef.onDestroy(() => this.ctx.revert());
  }
}
