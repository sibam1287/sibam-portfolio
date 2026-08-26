import { Component, ElementRef, ViewChild, AfterViewInit, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PORTFOLIO_DATA } from '../../../../core/constants/portfolio-data';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="experience" class="experience section" #expSection>
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Professional Experience</h2>
        </div>

        <div class="timeline" #timeline>
          <div class="timeline-line">
            <div class="timeline-line-progress" #timelineProgress></div>
          </div>
          
          <div class="timeline-item" *ngFor="let exp of experiences; let i = index">
            <div class="timeline-dot"></div>
            <div class="timeline-content glass-card">
              <h3 class="role text-gradient">{{exp.role}}</h3>
              <div class="company-row">
                <span class="company">{{exp.company}}</span>
                <span class="duration">{{exp.duration}}</span>
              </div>
              <ul class="responsibilities">
                <li *ngFor="let item of exp.responsibilities">{{item}}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .experience {
      position: relative;
    }
    .section-header { margin-bottom: 4rem; text-align: center; display: flex; justify-content: center; }
    
    .container { max-width: 900px; margin: 0 auto; padding: 0 2rem; }
    
    .timeline {
      position: relative;
      padding-left: 2rem;
    }
    @media (min-width: 768px) {
      .timeline { padding-left: 3rem; }
    }
    .timeline-line {
      position: absolute;
      top: 0; left: 6px;
      height: 100%; width: 2px;
      background: var(--border-color);
      border-radius: 2px;
      overflow: hidden;
    }
    @media (min-width: 768px) {
      .timeline-line { left: 10px; }
    }
    .timeline-line-progress {
      position: absolute;
      top: 0; left: 0; width: 100%; height: 0%;
      background: linear-gradient(to bottom, var(--accent-primary), var(--accent-secondary));
    }
    .timeline-item {
      position: relative;
      margin-bottom: 3.5rem;
    }
    .timeline-item:last-child { margin-bottom: 0; }
    
    .timeline-dot {
      position: absolute;
      left: -2rem; top: 1.5rem;
      width: 14px; height: 14px;
      border-radius: 50%;
      background: var(--bg-primary);
      border: 2px solid var(--accent-primary);
      box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
      z-index: 2;
      transition: all 0.3s ease;
    }
    @media (min-width: 768px) {
      .timeline-dot { left: -3rem; width: 18px; height: 18px; top: 1.25rem; }
    }
    .timeline-item:hover .timeline-dot {
      background: var(--accent-primary);
      transform: scale(1.2);
    }
    .timeline-content {
      padding: clamp(1.5rem, 3vw, 2.5rem);
    }
    
    .role {
      font-size: clamp(1.25rem, 3vw, 1.75rem);
      margin-bottom: 0.75rem;
      font-weight: 700;
    }
    .company-row {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      gap: 1rem;
      margin-bottom: 1.5rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid var(--border-color);
      align-items: center;
    }
    .company {
      font-weight: 600;
      color: var(--text-primary);
      font-size: 1.1rem;
    }
    .duration {
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--text-secondary);
      background: var(--bg-secondary);
      border: 1px solid var(--border-color);
      padding: 0.35rem 1rem;
      border-radius: 9999px;
    }
    .responsibilities {
      list-style-type: disc;
      padding-left: 1.25rem;
      color: var(--text-secondary);
    }
    .responsibilities li {
      margin-bottom: 0.75rem;
      line-height: 1.7;
    }
    .responsibilities li::marker {
      color: var(--accent-primary);
    }
  `]
})
export class ExperienceComponent implements AfterViewInit {
  @ViewChild('expSection') expSection!: ElementRef;
  @ViewChild('timeline') timeline!: ElementRef;
  @ViewChild('timelineProgress') timelineProgress!: ElementRef;

  experiences = PORTFOLIO_DATA.experience;
  
  destroyRef = inject(DestroyRef);
  ctx!: gsap.Context;

  ngAfterViewInit() {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    this.ctx = gsap.context(() => {
      // Header animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: this.expSection.nativeElement,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      });

      tl.from('.section-title', { opacity: 0, y: 30, duration: 0.8, ease: 'power3.out' });
      
      // Progress line animation
      gsap.to(this.timelineProgress.nativeElement, {
        height: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: this.timeline.nativeElement,
          start: 'top 50%',
          end: 'bottom 50%',
          scrub: 0.5
        }
      });

      // Individual items animation
      const items = gsap.utils.toArray('.timeline-item');
      items.forEach((item: any) => {
        gsap.from(item.querySelector('.timeline-content'), {
          scrollTrigger: { 
            trigger: item, 
            start: 'top 80%' 
          },
          x: 50, 
          opacity: 0, 
          duration: 0.8, 
          ease: 'power3.out'
        });
        
        gsap.from(item.querySelector('.timeline-dot'), {
          scrollTrigger: { 
            trigger: item, 
            start: 'top 80%' 
          },
          scale: 0, 
          opacity: 0, 
          duration: 0.5, 
          ease: 'back.out(2)',
          delay: 0.2
        });
      });
    }, this.expSection.nativeElement);

    this.destroyRef.onDestroy(() => this.ctx.revert());
  }
}
