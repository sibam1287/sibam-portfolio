import { Component, ElementRef, ViewChild, AfterViewInit, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, ArrowRight, Download, Github, Linkedin, Mail } from 'lucide-angular';
import { PORTFOLIO_DATA } from '../../../../core/constants/portfolio-data';
import { ProfileVisualComponent } from '../../../../shared/components/profile-visual/profile-visual.component';
import { gsap } from 'gsap';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, ProfileVisualComponent],
  template: `
    <section id="home" class="hero section" #heroSection>
      <div class="hero-container container">
        <div class="hero-content">
          <p class="greeting" #greeting>Hi, I'm</p>
          <h1 class="name" #name>
            {{profile.name.split(' ')[0]}} <span class="text-gradient">{{profile.name.split(' ').slice(1).join(' ')}}</span>
          </h1>
          
          <div class="title-container" #titleContainer>
            <h2 class="title">{{currentTitle}}</h2>
          </div>
          
          <p class="description" #description>{{profile.heroDescription}}</p>
          
          <div class="actions" #actions>
            <a href="#projects" class="btn-primary">
              View My Work
              <lucide-icon name="arrow-right" [size]="18" class="arrow-icon"></lucide-icon>
            </a>
            <a [href]="profile.resumeUrl" target="_blank" class="btn-outline">
              <lucide-icon name="download" [size]="18"></lucide-icon>
              Download Resume
            </a>
          </div>
          
          <div class="socials" #socials>
            <a *ngFor="let link of socialLinks" [href]="link.url" target="_blank" [attr.aria-label]="link.name" class="social-icon">
              <lucide-icon [name]="link.icon" [size]="24"></lucide-icon>
            </a>
          </div>
        </div>
        
        <div class="hero-visual-wrapper" #visual>
          <app-profile-visual 
            [imageUrl]="profile.profileImage" 
            altText="Sibam Sahu Profile">
          </app-profile-visual>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero {
      min-height: 100vh;
      display: flex;
      align-items: center;
      padding: clamp(100px, 15vh, 150px) 0 clamp(60px, 10vh, 100px);
    }
    .hero-container {
      display: grid;
      grid-template-columns: 1fr;
      gap: 4rem;
      align-items: center;
    }
    @media (min-width: 992px) {
      .hero-container { 
        grid-template-columns: 1fr 1fr; 
        gap: 2rem;
      }
    }
    .hero-content {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      z-index: 10;
    }
    .greeting {
      font-size: clamp(1.2rem, 3vw, 1.5rem);
      font-weight: 600;
      color: var(--accent-primary);
      margin-bottom: 0.75rem;
      letter-spacing: 0.05em;
      text-transform: uppercase;
    }
    .name {
      font-size: clamp(3.5rem, 8vw, 6rem);
      line-height: 1.1;
      margin-bottom: 1rem;
      font-weight: 800;
      letter-spacing: -0.04em;
    }
    .title-container {
      height: 48px;
      margin-bottom: 2rem;
      display: flex;
      align-items: center;
    }
    .title {
      font-size: clamp(1.5rem, 4vw, 2.5rem);
      color: var(--text-secondary);
      font-weight: 600;
      letter-spacing: -0.02em;
    }
    .description {
      font-size: clamp(1.1rem, 2vw, 1.25rem);
      color: var(--text-secondary);
      line-height: 1.8;
      margin-bottom: 3rem;
      max-width: 540px;
    }
    .actions {
      display: flex;
      flex-wrap: wrap;
      gap: 1.5rem;
      margin-bottom: 3.5rem;
    }
    .arrow-icon {
      transition: transform 0.3s ease;
    }
    .btn-primary:hover .arrow-icon {
      transform: translateX(4px);
    }
    .socials {
      display: flex;
      gap: 1.5rem;
    }
    .social-icon {
      color: var(--text-secondary);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      display: flex;
      align-items: center;
      justify-content: center;
      width: 48px; height: 48px;
      border-radius: 50%;
      background: var(--bg-glass);
      backdrop-filter: blur(8px);
      border: 1px solid var(--border-color);
    }
    .social-icon:hover {
      color: var(--accent-primary);
      border-color: var(--accent-primary);
      transform: translateY(-5px);
      background: rgba(59, 130, 246, 0.1);
      box-shadow: 0 10px 20px rgba(59, 130, 246, 0.15);
    }
    .hero-visual-wrapper {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 5;
    }
  `]
})
export class HeroComponent implements AfterViewInit {
  @ViewChild('heroSection') heroSection!: ElementRef;
  @ViewChild('greeting') greeting!: ElementRef;
  @ViewChild('name') name!: ElementRef;
  @ViewChild('titleContainer') titleContainer!: ElementRef;
  @ViewChild('description') description!: ElementRef;
  @ViewChild('actions') actions!: ElementRef;
  @ViewChild('socials') socials!: ElementRef;
  @ViewChild('visual') visual!: ElementRef;

  profile = PORTFOLIO_DATA.profile;
  socialLinks = PORTFOLIO_DATA.socialLinks;
  currentTitle = this.profile.titles[0];
  
  destroyRef = inject(DestroyRef);

  ngAfterViewInit() {
    this.initAnimations();
    this.startTypingEffect();
  }

  initAnimations() {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      try {
        const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
        
        if (this.greeting?.nativeElement) {
          tl.fromTo(this.greeting.nativeElement, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, delay: 0.2 });
        }
        if (this.name?.nativeElement) {
          tl.fromTo(this.name.nativeElement, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, '-=0.8');
        }
        if (this.titleContainer?.nativeElement) {
          tl.fromTo(this.titleContainer.nativeElement, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, '-=0.8');
        }
        if (this.description?.nativeElement) {
          tl.fromTo(this.description.nativeElement, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, '-=0.8');
        }
        if (this.actions?.nativeElement?.children?.length) {
          tl.fromTo(this.actions.nativeElement.children, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.15 }, '-=0.6');
        }
        if (this.socials?.nativeElement?.children?.length) {
          tl.fromTo(this.socials.nativeElement.children, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.1 }, '-=0.6');
        }
        if (this.visual?.nativeElement) {
          tl.fromTo(this.visual.nativeElement, { scale: 0.95, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.5, ease: 'back.out(1.2)' }, '-=1');
        }
      } catch (e) {
        console.error('Hero animation error:', e);
        // Fallback: forcefully show elements if GSAP crashes
        gsap.set([this.greeting?.nativeElement, this.name?.nativeElement, this.titleContainer?.nativeElement, this.description?.nativeElement, this.actions?.nativeElement, this.socials?.nativeElement, this.visual?.nativeElement], { opacity: 1, y: 0, scale: 1 });
      }
    }, this.heroSection.nativeElement);

    this.destroyRef.onDestroy(() => ctx.revert());
  }

  startTypingEffect() {
    if (typeof window === 'undefined') return;
    
    let i = 0;
    const interval = setInterval(() => {
      // Simple fade out/in effect for title change
      const el = this.titleContainer.nativeElement.querySelector('.title');
      if (el) {
        gsap.to(el, {
          opacity: 0, y: -10, duration: 0.3, onComplete: () => {
            i = (i + 1) % this.profile.titles.length;
            this.currentTitle = this.profile.titles[i];
            gsap.fromTo(el, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4, ease: 'back.out(1.5)' });
          }
        });
      }
    }, 4000);
    this.destroyRef.onDestroy(() => clearInterval(interval));
  }
}
