import { Component, ElementRef, ViewChild, AfterViewInit, DestroyRef, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PORTFOLIO_DATA } from '../../../../core/constants/portfolio-data';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="about" class="about section" #aboutSection>
      <div class="container">
        <!-- We removed the generic "About Me" header and replaced it with the requested "THE STORY" layout -->
        
        <div class="about-content">
          <!-- Left side: The Story Text -->
          <div class="about-text-wrapper" #aboutTextWrapper>
            <div class="story-label">
              <span class="line"></span>
              <span class="text">THE STORY</span>
            </div>
            
            <h2 class="story-headline" #headline>
              <span class="gradient-text">I turn ideas into scalable and user-<br>friendly web applications.</span>
            </h2>
            
            <div class="story-body">
              <p #para1></p>
              <p #para2></p>
            </div>
          </div>
          
          <!-- Right side: Stats Grid -->
          <div class="stats-grid" #statsGrid>
            <div class="stat-card glass-card" *ngFor="let stat of stats; let i = index">
              <h3 class="stat-value text-gradient" [attr.data-target]="stat.numericValue">0</h3>
              <p class="stat-label">{{stat.label}}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .about {
      position: relative;
    }
    
    .about-content {
      display: grid;
      grid-template-columns: 1fr;
      gap: 4rem;
    }
    
    @media (min-width: 992px) {
      .about-content { 
        grid-template-columns: 3fr 2fr; 
        align-items: center; 
        gap: 5rem; 
      }
    }
    
    /* The Story Layout */
    .story-label {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 2rem;
    }
    .story-label .line {
      width: 40px;
      height: 1px;
      background: var(--accent-primary);
    }
    .story-label .text {
      color: var(--accent-primary);
      font-size: 0.9rem;
      font-weight: 600;
      letter-spacing: 0.2em;
      text-transform: uppercase;
    }
    
    .story-headline {
      font-size: clamp(2rem, 3.5vw, 2.5rem);
      line-height: 1.3;
      font-weight: 700;
      margin-bottom: 2rem;
      color: var(--text-primary);
    }
    
    .gradient-text {
      background: linear-gradient(90deg, #818cf8, #34d399);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      display: inline-block; /* Helps with clipping */
    }
    
    .story-body p {
      color: var(--text-secondary);
      line-height: 1.8;
      font-size: 1.1rem;
      margin-bottom: 1.5rem;
      min-height: 1.5em; /* Prevents layout shift while typing */
    }
    .story-body p::after {
      content: '|';
      color: var(--accent-primary);
      opacity: 0;
    }
    .story-body p.typing::after {
      animation: blink 0.7s infinite;
      opacity: 1;
    }
    @keyframes blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0; }
    }
    
    /* Stats Grid */
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: clamp(1rem, 2vw, 1.5rem);
    }
    .stat-card {
      padding: 2.5rem 1.5rem;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border: 1px solid var(--border-color);
      border-radius: 1rem;
      background: var(--bg-secondary);
      transition: transform 0.3s ease, border-color 0.3s ease;
    }
    .stat-card:hover {
      transform: translateY(-5px);
      border-color: rgba(139, 92, 246, 0.3);
    }
    .stat-value {
      font-size: clamp(2.5rem, 4vw, 3.5rem);
      font-weight: 800;
      margin-bottom: 0.5rem;
      letter-spacing: -0.05em;
    }
    .stat-label {
      color: var(--text-secondary);
      font-weight: 600;
      font-size: 0.95rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
  `]
})
export class AboutComponent implements AfterViewInit {
  @ViewChild('aboutSection') aboutSection!: ElementRef;
  @ViewChild('aboutTextWrapper') aboutTextWrapper!: ElementRef;
  @ViewChild('headline') headline!: ElementRef;
  @ViewChild('statsGrid') statsGrid!: ElementRef;
  @ViewChild('para1') para1!: ElementRef;
  @ViewChild('para2') para2!: ElementRef;

  destroyRef = inject(DestroyRef);
  ctx!: gsap.Context;

  stats = [
    { value: '2+', numericValue: 2, label: 'Years Experience' },
    { value: '4+', numericValue: 4, label: 'Major Projects' },
    { value: '3', numericValue: 3, label: 'Certifications' },
    { value: '10+', numericValue: 10, label: 'Technologies' }
  ];

  p1Text = "As a Full Stack Developer, I specialize in Java Spring Boot, Angular, Node.js, and PostgreSQL with hands-on experience in real-time production projects, Linux server deployment, API development, and frontend design. I enjoy solving complex technical problems, optimizing application performance, and building modern digital solutions that deliver a seamless user experience.";
  p2Text = "I am continuously learning, exploring new technologies, and improving my skills to create secure, scalable, and high-performing applications.";

  hasTyped = false;

  ngAfterViewInit() {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    this.ctx = gsap.context(() => {
      // Main reveal timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: this.aboutSection.nativeElement,
          start: 'top 55%',
          toggleActions: 'play none none none',
          onEnter: () => {
            if (!this.hasTyped) {
              this.hasTyped = true;
              setTimeout(() => this.typeText(), 400); // Wait for the fade-in animation slightly
            }
          }
        }
      });

      tl.from('.story-label', { x: -30, duration: 0.6, ease: 'power3.out' })
        .from(this.headline.nativeElement, { y: 30, duration: 0.8, ease: 'power3.out' }, '-=0.4')
        .from(this.statsGrid.nativeElement.children, { 
          y: 40, 
          opacity: 0, 
          duration: 0.6, 
          stagger: 0.15,
          ease: 'power3.out'
        }, '-=0.4');

      // Animate numbers
      const statValues = this.statsGrid.nativeElement.querySelectorAll('.stat-value');
      statValues.forEach((el: any) => {
        const target = parseFloat(el.getAttribute('data-target'));
        const hasPlus = this.stats.find(s => s.numericValue === target)?.value.includes('+');
        
        ScrollTrigger.create({
          trigger: el,
          start: 'top 85%',
          onEnter: () => {
            gsap.to(el, {
              innerHTML: target,
              duration: 2,
              ease: 'power2.out',
              snap: { innerHTML: 1 },
              onUpdate: function(this: any) {
                el.innerHTML = Math.round(this.targets()[0].innerHTML) + (hasPlus ? '+' : '');
              }
            });
          }
        });
      });

    }, this.aboutSection.nativeElement);

    this.destroyRef.onDestroy(() => this.ctx.revert());
  }

  typeText() {
    const p1 = this.para1.nativeElement;
    const p2 = this.para2.nativeElement;
    
    let i = 0;
    let j = 0;
    
    p1.classList.add('typing');
    
    const typeInterval1 = setInterval(() => {
      if (i < this.p1Text.length) {
        p1.innerHTML += this.p1Text.charAt(i);
        i++;
      } else {
        clearInterval(typeInterval1);
        p1.classList.remove('typing');
        p2.classList.add('typing');
        
        const typeInterval2 = setInterval(() => {
          if (j < this.p2Text.length) {
            p2.innerHTML += this.p2Text.charAt(j);
            j++;
          } else {
            clearInterval(typeInterval2);
            p2.classList.remove('typing');
          }
        }, 20); // Slightly faster for the second paragraph
      }
    }, 25); // Adjust speed here (lower = faster)
  }
}
