import { Component, ElementRef, ViewChild, AfterViewInit, DestroyRef, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, ExternalLink, Github, Sparkles } from 'lucide-angular';
import { PORTFOLIO_DATA } from '../../../../core/constants/portfolio-data';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Project } from '../../../../core/models/portfolio.models';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideAngularModule],
  template: `
    <section id="projects" class="projects section" #projectsSection>
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Featured Projects</h2>
        </div>

        <div class="filter-controls" #filters>
          <button 
            *ngFor="let cat of filterCategories" 
            class="filter-btn" 
            [class.active]="activeFilter() === cat"
            (click)="setFilter(cat)">
            {{cat}}
          </button>
        </div>

        <div class="projects-grid" #projectsGrid>
          <div class="project-card glass-card" *ngFor="let project of filteredProjects()" [attr.data-id]="project.id">
            <div class="project-img-wrapper">
              <img *ngIf="!imageErrors[project.id]" [src]="project.image" [alt]="project.title" class="project-img" (error)="onImageError(project.id)">
              
              <!-- Premium Project Fallback Visual -->
              <div *ngIf="imageErrors[project.id] || !project.image" class="project-fallback">
                <div class="fallback-pattern"></div>
                <h3 class="fallback-text">{{project.title.substring(0, 2)}}</h3>
              </div>
              
              <div class="project-overlay"></div>
              
              <div class="project-links">
                <a *ngIf="project.liveUrl && project.liveUrl !== '#'" [href]="project.liveUrl" target="_blank" class="project-link primary" aria-label="Live Demo">
                  <lucide-icon name="external-link" [size]="20"></lucide-icon>
                </a>
              </div>
            </div>
            
            <div class="project-content">
              <div class="title-row">
                <h3 class="project-title">
                  <a [routerLink]="['/project', project.id]">{{project.title}}</a>
                </h3>
                <span class="ai-badge" *ngIf="project.tags.includes('AI')">
                  <lucide-icon name="sparkles" [size]="12"></lucide-icon> AI Powered
                </span>
              </div>
              
              <p class="project-desc">{{project.shortDescription}}</p>
              
              <div class="project-tags">
                <span class="p-tag" *ngFor="let tag of project.tags | slice:0:4">{{tag}}</span>
                <span class="p-tag more" *ngIf="project.tags.length > 4">+{{project.tags.length - 4}}</span>
              </div>
              
              <a [routerLink]="['/project', project.id]" class="view-details">
                View Details
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .projects {
      position: relative;
    }
    .section-header { margin-bottom: 3rem; text-align: center; display: flex; justify-content: center; }
    
    .filter-controls {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 1rem;
      margin-bottom: 4rem;
    }
    .filter-btn {
      padding: 0.6rem 1.5rem;
      border-radius: 9999px;
      border: 1px solid var(--border-color);
      color: var(--text-secondary);
      background: var(--bg-glass);
      backdrop-filter: blur(8px);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      font-weight: 600;
      font-size: 0.95rem;
    }
    .filter-btn:hover {
      color: var(--accent-primary);
      border-color: var(--accent-primary);
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(59, 130, 246, 0.1);
    }
    .filter-btn.active {
      background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
      color: white;
      border-color: transparent;
      box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
    }
    
    .projects-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 2.5rem;
    }
    @media (min-width: 768px) {
      .projects-grid { grid-template-columns: repeat(2, 1fr); }
    }
    @media (min-width: 1024px) {
      .projects-grid { grid-template-columns: repeat(3, 1fr); }
    }
    
    .project-card {
      display: flex;
      flex-direction: column;
      overflow: hidden;
      height: 100%;
    }
    
    .project-img-wrapper {
      position: relative;
      height: 220px;
      overflow: hidden;
      background: var(--bg-secondary);
    }
    
    .project-fallback {
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, var(--bg-primary), var(--bg-secondary));
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: hidden;
    }
    .fallback-pattern {
      position: absolute;
      top: 0; left: 0; width: 100%; height: 100%;
      background-image: radial-gradient(var(--border-color) 2px, transparent 2px);
      background-size: 20px 20px;
      opacity: 0.5;
    }
    .fallback-text {
      font-size: 4rem;
      font-weight: 800;
      color: transparent;
      -webkit-text-stroke: 2px var(--border-color);
      z-index: 2;
      text-transform: uppercase;
      opacity: 0.5;
    }
    
    .project-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .project-card:hover .project-img, .project-card:hover .project-fallback {
      transform: scale(1.08);
    }
    
    .project-overlay {
      position: absolute;
      top: 0; left: 0; width: 100%; height: 100%;
      background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
      opacity: 0;
      transition: opacity 0.4s ease;
    }
    .project-card:hover .project-overlay {
      opacity: 1;
    }
    
    .project-links {
      position: absolute;
      top: 50%; left: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      gap: 1rem;
      z-index: 10;
    }
    .project-link {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 48px; height: 48px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.9);
      color: #0f172a;
      opacity: 0;
      transform: translateY(20px);
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .project-card:hover .project-link { 
      opacity: 1; 
      transform: translateY(0); 
    }
    .project-card:hover .project-link:nth-child(2) {
      transition-delay: 0.1s;
    }
    .project-link:hover { 
      background: var(--accent-primary); 
      color: white; 
      transform: translateY(-5px) !important;
      box-shadow: 0 10px 20px rgba(59, 130, 246, 0.3);
    }
    
    .project-content {
      padding: 1.75rem;
      display: flex;
      flex-direction: column;
      flex-grow: 1;
    }
    .title-row {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 1rem;
      gap: 1rem;
    }
    .project-title { font-size: 1.25rem; font-weight: 700; letter-spacing: -0.02em; }
    .project-title a { color: var(--text-primary); transition: color 0.2s; }
    .project-title a:hover { color: var(--accent-primary); }
    
    .ai-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.25rem;
      font-size: 0.75rem;
      font-weight: 700;
      padding: 0.25rem 0.6rem;
      border-radius: 9999px;
      background: linear-gradient(135deg, var(--accent-secondary), var(--accent-primary));
      color: white;
      white-space: nowrap;
    }
    
    .project-desc {
      color: var(--text-secondary);
      font-size: 0.95rem;
      line-height: 1.6;
      margin-bottom: 1.5rem;
      flex-grow: 1;
    }
    .project-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-bottom: 1.5rem;
    }
    .p-tag {
      font-size: 0.75rem;
      font-weight: 500;
      padding: 0.3rem 0.75rem;
      border-radius: 6px;
      background: var(--bg-secondary);
      color: var(--text-secondary);
      border: 1px solid var(--border-color);
      transition: all 0.2s ease;
    }
    .project-card:hover .p-tag {
      border-color: var(--accent-primary);
      color: var(--accent-primary);
    }
    
    .view-details {
      display: inline-block;
      align-self: flex-start;
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--accent-primary);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      transition: all 0.2s ease;
      position: relative;
    }
    .view-details::after {
      content: '';
      position: absolute;
      bottom: -2px; left: 0; width: 0; height: 2px;
      background: var(--accent-primary);
      transition: width 0.3s ease;
    }
    .view-details:hover { color: var(--accent-secondary); }
    .view-details:hover::after { width: 100%; background: var(--accent-secondary); }
  `]
})
export class ProjectsComponent implements AfterViewInit {
  @ViewChild('projectsSection') projectsSection!: ElementRef;
  @ViewChild('projectsGrid') projectsGrid!: ElementRef;

  allProjects = PORTFOLIO_DATA.projects;
  filterCategories = ['All', 'Java', 'Angular', 'Full Stack', 'AI'];
  activeFilter = signal('All');
  filteredProjects = signal<Project[]>(this.allProjects);
  imageErrors: { [key: string]: boolean } = {};
  
  destroyRef = inject(DestroyRef);
  ctx!: gsap.Context;

  setFilter(category: string) {
    if (typeof window === 'undefined') return;
    this.activeFilter.set(category);
    
    gsap.to('.project-card', {
      scale: 0.9, opacity: 0, duration: 0.3,
      onComplete: () => {
        if (category === 'All') {
          this.filteredProjects.set(this.allProjects);
        } else {
          this.filteredProjects.set(this.allProjects.filter(p => p.tags.includes(category)));
        }
        
        setTimeout(() => {
          gsap.fromTo('.project-card', 
            { scale: 0.9, opacity: 0, y: 20 },
            { scale: 1, opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'back.out(1.5)' }
          );
        }, 50);
      }
    });
  }

  ngAfterViewInit() {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    this.ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: this.projectsSection.nativeElement,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      });

      tl.from('.section-title', { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out' })
        .from('.filter-btn', { y: 20, opacity: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' }, '-=0.2')
        .from('.project-card', {
          y: 50, 
          opacity: 0, 
          duration: 0.8, 
          stagger: 0.15, 
          ease: 'power3.out'
        }, '-=0.4');
    }, this.projectsSection.nativeElement);

    this.destroyRef.onDestroy(() => this.ctx.revert());
  }

  onImageError(projectId: string) {
    this.imageErrors[projectId] = true;
  }
}
