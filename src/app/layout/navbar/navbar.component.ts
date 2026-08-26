import { Component, HostListener, signal, inject, ViewChildren, QueryList, ElementRef, effect, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../core/services/theme.service';
import { LucideAngularModule, Moon, Sun, Menu, X, Download } from 'lucide-angular';
import { PORTFOLIO_DATA } from '../../core/constants/portfolio-data';
import { gsap } from 'gsap';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <header [class.scrolled]="isScrolled()" class="navbar glass">
      <div class="nav-container">
        <a href="#home" class="logo">Sibam<span class="text-gradient">.</span></a>

        <nav class="desktop-nav">
          <a *ngFor="let link of navLinks" [href]="link.url" class="nav-link">{{link.name}}</a>
        </nav>

        <div class="actions">
          <button class="theme-toggle" (click)="toggleTheme()" aria-label="Toggle Theme">
            <lucide-icon [name]="isDarkTheme() ? 'sun' : 'moon'" [size]="20" class="theme-icon"></lucide-icon>
          </button>
          
          <a [href]="resumeUrl" target="_blank" class="btn-primary resume-btn hidden-mobile">
            <lucide-icon name="download" [size]="18"></lucide-icon>
            Resume
          </a>

          <button class="mobile-menu-btn" (click)="toggleMobileMenu()" aria-label="Toggle Menu">
            <lucide-icon [name]="isMobileMenuOpen() ? 'x' : 'menu'" [size]="24"></lucide-icon>
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div class="mobile-menu glass" [class.open]="isMobileMenuOpen()">
        <div class="mobile-nav-items">
          <a *ngFor="let link of navLinks" #mobileLink [href]="link.url" class="mobile-nav-link" (click)="toggleMobileMenu()">
            {{link.name}}
          </a>
          <a [href]="resumeUrl" #mobileLink target="_blank" class="btn-primary resume-btn-mobile" (click)="toggleMobileMenu()">
            <lucide-icon name="download" [size]="18"></lucide-icon>
            Resume
          </a>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .navbar {
      position: fixed;
      top: 0; left: 0; width: 100%;
      z-index: 1000;
      padding: 1.5rem 0;
      background: transparent;
      border-bottom: 1px solid transparent;
      box-shadow: none;
      backdrop-filter: none;
      -webkit-backdrop-filter: none;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .navbar.scrolled {
      padding: 1rem 0;
      background: var(--bg-glass);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border-bottom: 1px solid var(--glass-border);
      box-shadow: var(--card-shadow);
    }
    .nav-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .logo {
      font-family: 'Outfit', sans-serif;
      font-size: 1.5rem;
      font-weight: 800;
      color: var(--text-primary);
      letter-spacing: -0.05em;
    }
    .desktop-nav {
      display: none;
      gap: 2.5rem;
    }
    @media (min-width: 768px) {
      .desktop-nav { display: flex; }
      .mobile-menu-btn { display: none; }
    }
    .nav-link {
      font-weight: 500;
      color: var(--text-secondary);
      transition: color 0.3s ease;
      position: relative;
      padding: 0.5rem 0;
    }
    .nav-link:hover, .nav-link.active {
      color: var(--text-primary);
    }
    .nav-link::after {
      content: '';
      position: absolute;
      bottom: 0; left: 0; width: 0; height: 2px;
      background: linear-gradient(90deg, var(--accent-primary), var(--accent-secondary));
      transition: width 0.3s ease;
      border-radius: 2px;
    }
    .nav-link:hover::after, .nav-link.active::after {
      width: 100%;
    }
    .actions {
      display: flex;
      align-items: center;
      gap: 1.5rem;
    }
    .theme-toggle {
      color: var(--text-primary);
      padding: 0.5rem;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
      border: 1px solid transparent;
    }
    .theme-toggle:hover {
      background: rgba(150, 150, 150, 0.1);
      border-color: var(--border-color);
      transform: rotate(15deg);
    }
    .theme-icon {
      transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .hidden-mobile {
      display: none;
    }
    @media (min-width: 768px) {
      .hidden-mobile { display: inline-flex; }
    }
    .mobile-menu-btn {
      color: var(--text-primary);
    }
    
    /* Mobile Menu */
    .mobile-menu {
      position: fixed;
      top: 0; left: 0; width: 100%; height: 100vh;
      background: var(--bg-primary);
      padding: 6rem 2rem 2rem;
      display: flex;
      flex-direction: column;
      clip-path: circle(0px at top right);
      transition: clip-path 0.5s cubic-bezier(0.4, 0, 0.2, 1);
      z-index: -1;
    }
    .mobile-menu.open {
      clip-path: circle(150% at top right);
    }
    .mobile-nav-items {
      display: flex;
      flex-direction: column;
      gap: 2rem;
      align-items: center;
      margin-top: 2rem;
    }
    .mobile-nav-link {
      font-size: 1.75rem;
      font-weight: 600;
      color: var(--text-primary);
      font-family: 'Outfit', sans-serif;
      opacity: 0;
      transform: translateY(20px);
    }
    .resume-btn-mobile {
      margin-top: 2rem;
      width: 100%;
      max-width: 300px;
      opacity: 0;
      transform: translateY(20px);
    }
  `]
})
export class NavbarComponent {
  themeService = inject(ThemeService);
  isDarkTheme = this.themeService.isDarkTheme;
  
  isScrolled = signal(false);
  isMobileMenuOpen = signal(false);
  
  resumeUrl = PORTFOLIO_DATA.profile.resumeUrl;

  navLinks = [
    { name: 'Home', url: '#home' },
    { name: 'About', url: '#about' },
    { name: 'Skills', url: '#skills' },
    { name: 'Experience', url: '#experience' },
    { name: 'Projects', url: '#projects' },
    { name: 'Contact', url: '#contact' }
  ];

  @ViewChildren('mobileLink') mobileLinks!: QueryList<ElementRef>;

  constructor() {
    effect(() => {
      if (this.isMobileMenuOpen()) {
        document.body.style.overflow = 'hidden';
        if (this.mobileLinks) {
          gsap.to(this.mobileLinks.map(l => l.nativeElement), {
            y: 0,
            opacity: 1,
            duration: 0.4,
            stagger: 0.1,
            ease: 'back.out(1.7)',
            delay: 0.2
          });
        }
      } else {
        document.body.style.overflow = '';
        if (this.mobileLinks) {
          gsap.set(this.mobileLinks.map(l => l.nativeElement), {
            y: 20,
            opacity: 0
          });
        }
      }
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled.set(window.scrollY > 20);
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen.update(val => !val);
  }
}
