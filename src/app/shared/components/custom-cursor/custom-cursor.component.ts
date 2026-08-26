import { Component, HostListener, signal, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-custom-cursor',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (isDesktop() && !prefersReducedMotion()) {
      <div class="cursor-dot" [style.transform]="'translate3d(' + mouseX() + 'px, ' + mouseY() + 'px, 0)'"></div>
      <div class="cursor-outline" [style.transform]="'translate3d(' + outlineX() + 'px, ' + outlineY() + 'px, 0)'" [class.hover]="isHovering()"></div>
    }
  `,
  styles: [`
    .cursor-dot {
      position: fixed;
      top: 0; left: 0;
      width: 8px; height: 8px;
      background-color: var(--accent-primary);
      border-radius: 50%;
      pointer-events: none;
      z-index: 10000;
      transform: translate(-50%, -50%);
    }
    .cursor-outline {
      position: fixed;
      top: -12px; left: -12px;
      width: 32px; height: 32px;
      border: 2px solid rgba(59, 130, 246, 0.5);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      transition: width 0.2s, height 0.2s, border-color 0.2s, top 0.2s, left 0.2s, background-color 0.2s;
    }
    .cursor-outline.hover {
      width: 50px; height: 50px;
      top: -21px; left: -21px;
      border-color: var(--accent-primary);
      background-color: rgba(59, 130, 246, 0.1);
    }
    @media (prefers-reduced-motion: reduce) {
      .cursor-dot, .cursor-outline { display: none; }
    }
  `]
})
export class CustomCursorComponent {
  mouseX = signal(-100);
  mouseY = signal(-100);
  outlineX = signal(-100);
  outlineY = signal(-100);
  isHovering = signal(false);
  isDesktop = signal(true);
  prefersReducedMotion = signal(false);

  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
    if (this.isBrowser) {
      this.checkEnvironment();
      if (!this.prefersReducedMotion() && this.isDesktop()) {
        this.animateOutline();
      }
    }
  }

  private checkEnvironment() {
    this.prefersReducedMotion.set(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    // Simple check for touch devices
    this.isDesktop.set(!window.matchMedia('(hover: none) and (pointer: coarse)').matches);
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!this.isBrowser || this.prefersReducedMotion() || !this.isDesktop()) return;
    
    this.mouseX.set(event.clientX);
    this.mouseY.set(event.clientY);

    // Initial setup to avoid delay on first move
    if (this.outlineX() === -100) {
      this.outlineX.set(event.clientX);
      this.outlineY.set(event.clientY);
    }

    const target = event.target as HTMLElement;
    const isClickable = target.closest('a, button, input, textarea, select, [role="button"]');
    this.isHovering.set(!!isClickable);
  }

  private animateOutline() {
    // Simple spring animation for the outline
    const loop = () => {
      const dx = this.mouseX() - this.outlineX();
      const dy = this.mouseY() - this.outlineY();
      
      this.outlineX.update(x => x + dx * 0.15);
      this.outlineY.update(y => y + dy * 0.15);
      
      requestAnimationFrame(loop);
    };
    loop();
  }
}
