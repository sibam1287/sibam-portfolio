import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from './sections/hero/hero.component';
import { AboutComponent } from './sections/about/about.component';
import { SkillsComponent } from './sections/skills/skills.component';
import { ExperienceComponent } from './sections/experience/experience.component';
import { ProjectsComponent } from './sections/projects/projects.component';
import { ContactComponent } from './sections/contact/contact.component';
import { SeoService } from '../../core/services/seo.service';
import { PORTFOLIO_DATA } from '../../core/constants/portfolio-data';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, 
    HeroComponent, 
    AboutComponent, 
    SkillsComponent, 
    ExperienceComponent, 
    ProjectsComponent,
    ContactComponent
  ],
  template: `
    <main>
      <app-hero></app-hero>
      <app-about></app-about>
      <app-skills></app-skills>
      <app-experience></app-experience>
      <app-projects></app-projects>
      <app-contact></app-contact>
    </main>
  `
})
export class HomeComponent implements OnInit {
  seo = inject(SeoService);
  
  ngOnInit() {
    this.seo.updateMetadata({
      title: `${PORTFOLIO_DATA.profile.name} | ${PORTFOLIO_DATA.profile.role}`,
      description: PORTFOLIO_DATA.profile.aboutDescription.substring(0, 160) + '...',
    });
    
    // JSON-LD structured data
    this.seo.addJsonLd({
      "@context": "https://schema.org",
      "@type": "Person",
      "name": PORTFOLIO_DATA.profile.name,
      "jobTitle": PORTFOLIO_DATA.profile.role,
      "url": "http://localhost:4200", // Will be replaced by environment URL in real app
      "sameAs": PORTFOLIO_DATA.socialLinks.map(l => l.url)
    });
  }
}
