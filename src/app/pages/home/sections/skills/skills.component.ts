import { Component, ElementRef, ViewChild, AfterViewInit, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PORTFOLIO_DATA } from '../../../../core/constants/portfolio-data';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="skills" class="skills section" #skillsSection>
      <div class="container">
        <div class="section-header" #sectionHeader>
          <div class="section-label">
            <span class="line"></span>
            <span class="text">2. SKILLS</span>
          </div>
          <h2 class="section-title">Tech Stack</h2>
          <p class="section-subtitle">
            The technologies and tools I use to build scalable, secure, and high-performance applications.
          </p>
        </div>

        <div class="skills-grid" #skillsGrid>
          <div class="skill-category glass-card" *ngFor="let cat of categories; let i = index">
            <div class="category-header">
              <h3 class="category-title text-gradient">{{cat}}</h3>
            </div>
            
            <div class="skill-items">
              <div class="skill-item" *ngFor="let skill of getSkillsByCategory(cat)">
                <div class="skill-icon-wrapper">
                  <i [class]="skill.icon" *ngIf="skill.icon"></i>
                  <i class="devicon-code-plain" *ngIf="!skill.icon"></i> <!-- Fallback -->
                </div>
                <span class="skill-name">{{skill.name}}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Currently Exploring Section -->
        <div class="exploring-section" #exploringSection>
          <h3 class="exploring-title">Currently Exploring</h3>
          <p class="exploring-subtitle">Continuously exploring modern technologies and building practical solutions.</p>
          
          <div class="exploring-chips">
            <div class="exploring-chip glass" *ngFor="let skill of exploringSkills">
              <i [class]="skill.icon"></i>
              <span>{{skill.name}}</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  `,
  styles: [`
    .skills {
      position: relative;
      overflow: hidden; /* For marquee */
    }

    /* Section Header */
    .section-header {
      margin-bottom: clamp(3rem, 6vw, 4rem);
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    
    .section-label {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1rem;
    }
    .section-label .line {
      width: 30px;
      height: 1px;
      background: var(--accent-primary);
    }
    .section-label .text {
      color: var(--accent-primary);
      font-size: 0.85rem;
      font-weight: 600;
      letter-spacing: 0.15em;
      text-transform: uppercase;
    }
    
    .section-title::after {
      display: none; /* Override global style for this specific header */
    }
    
    .section-subtitle {
      color: var(--text-secondary);
      max-width: 600px;
      margin: 0 auto;
      font-size: clamp(1rem, 1.5vw, 1.15rem);
      line-height: 1.6;
    }

    /* Main Grid */
    .skills-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 2rem;
      margin-bottom: 4rem;
    }
    @media (min-width: 768px) {
      .skills-grid { grid-template-columns: repeat(2, 1fr); }
    }
    @media (min-width: 1200px) {
      .skills-grid { grid-template-columns: repeat(4, 1fr); }
    }

    /* Category Card */
    .skill-category {
      padding: clamp(1.25rem, 2.5vw, 2rem);
      display: flex;
      flex-direction: column;
      height: 100%;
      position: relative;
      overflow: hidden;
    }
    
    .skill-category::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      background: radial-gradient(circle at top right, rgba(59, 130, 246, 0.05), transparent 70%);
      opacity: 0;
      transition: opacity 0.4s ease;
      pointer-events: none;
    }
    .skill-category:hover::before {
      opacity: 1;
    }

    .category-header {
      margin-bottom: 1.5rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid var(--border-color);
    }
    
    .category-title {
      font-size: 1.25rem;
      font-weight: 700;
    }

    /* Individual Skills */
    .skill-items {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
      gap: 1rem;
      flex-grow: 1;
      align-content: start;
    }
    
    .skill-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.75rem;
      border-radius: 0.75rem;
      background: rgba(15, 23, 42, 0.03);
      border: 1px solid transparent;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      cursor: default;
    }
    
    :root.dark .skill-item {
      background: rgba(255, 255, 255, 0.03);
    }
    
    .skill-item:hover {
      background: var(--bg-primary);
      border-color: rgba(59, 130, 246, 0.2);
      transform: translateY(-3px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    }
    
    :root.dark .skill-item:hover {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    }
    
    .skill-item:hover .skill-icon-wrapper i {
      transform: scale(1.15);
      filter: drop-shadow(0 0 8px rgba(59, 130, 246, 0.4));
    }
    
    .skill-icon-wrapper {
      width: 28px;
      height: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
    }
    
    .skill-icon-wrapper i {
      transition: transform 0.3s ease, filter 0.3s ease;
    }
    
    .skill-name {
      font-size: 0.85rem;
      font-weight: 500;
      color: var(--text-primary);
    }

    /* Currently Exploring Section */
    .exploring-section {
      text-align: center;
      margin-top: 5rem;
      margin-bottom: 5rem;
      padding: 3rem 2rem;
      border-radius: 1.5rem;
      background: linear-gradient(135deg, rgba(59, 130, 246, 0.03), rgba(139, 92, 246, 0.03));
      border: 1px solid var(--border-color);
      position: relative;
    }
    
    .exploring-title {
      font-size: 1.75rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
      color: var(--text-primary);
    }
    
    .exploring-subtitle {
      color: var(--text-secondary);
      font-size: 0.95rem;
      margin-bottom: 2rem;
    }
    
    .exploring-chips {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 1rem;
    }
    
    .exploring-chip {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.6rem 1.25rem;
      border-radius: 9999px;
      font-weight: 500;
      font-size: 0.9rem;
      color: var(--text-primary);
      border: 1px solid var(--border-color);
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
    }
    
    .exploring-chip::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      background: linear-gradient(90deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1));
      opacity: 0;
      transition: opacity 0.3s ease;
      z-index: 0;
    }
    
    .exploring-chip i, .exploring-chip span {
      position: relative;
      z-index: 1;
    }
    
    .exploring-chip i {
      font-size: 1.1rem;
    }
    
    .exploring-chip:hover {
      border-color: rgba(139, 92, 246, 0.4);
      transform: translateY(-2px);
    }
    .exploring-chip:hover::before {
      opacity: 1;
    }
  `]
})
export class SkillsComponent implements AfterViewInit {
  @ViewChild('skillsSection') skillsSection!: ElementRef;
  @ViewChild('sectionHeader') sectionHeader!: ElementRef;
  @ViewChild('skillsGrid') skillsGrid!: ElementRef;
  @ViewChild('exploringSection') exploringSection!: ElementRef;

  skills = PORTFOLIO_DATA.skills;
  exploringSkills = PORTFOLIO_DATA.currentlyExploring || [];
  categories = ['Backend', 'Frontend', 'Database', 'Tools & Deployment'];
  
  destroyRef = inject(DestroyRef);
  ctx!: gsap.Context;

  getSkillsByCategory(category: string) {
    return this.skills.filter(s => s.category === category);
  }

  ngAfterViewInit() {
    if (typeof window === 'undefined') return;
    
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    gsap.registerPlugin(ScrollTrigger);

    this.ctx = gsap.context(() => {
      
      if (!prefersReducedMotion) {
        // Main Grid Animation
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: this.skillsSection.nativeElement,
            start: 'top 75%',
            toggleActions: 'play none none none'
          }
        });

        // 1. Animate Header
        tl.from(this.sectionHeader.nativeElement, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out'
        });

        // 2. Animate Cards Stagger
        tl.from('.skill-category', {
          y: 50,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'back.out(1.2)'
        }, '-=0.4');

        // 3. Animate Skill Items inside Cards
        tl.from('.skill-item', {
          scale: 0.8,
          opacity: 0,
          duration: 0.4,
          stagger: 0.02,
          ease: 'power2.out'
        }, '-=0.4');
        
        // 4. Animate Exploring Section
        gsap.from(this.exploringSection.nativeElement, {
          scrollTrigger: {
            trigger: this.exploringSection.nativeElement,
            start: 'top 85%'
          },
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out'
        });
        
        gsap.from('.exploring-chip', {
          scrollTrigger: {
            trigger: this.exploringSection.nativeElement,
            start: 'top 85%'
          },
          scale: 0.8,
          opacity: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'back.out(1.5)',
          delay: 0.3
        });
      }
      
    }, this.skillsSection.nativeElement);

    this.destroyRef.onDestroy(() => {
      this.ctx.revert();
    });
  }
}
