import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (isLoading()) {
      <div class="loader-overlay" [class.fade-out]="isFadingOut()">
        <div class="loader-content">
          <div class="logo-mark">
            <span class="bracket">&lt;</span>
            <span class="initials">SS</span>
            <span class="bracket">/&gt;</span>
          </div>
          <div class="loading-bar-container">
            <div class="loading-bar"></div>
          </div>
        </div>
      </div>
    }
  `,
  styles: [`
    .loader-overlay {
      position: fixed;
      top: 0; left: 0; width: 100vw; height: 100vh;
      background-color: var(--bg-primary);
      z-index: 9999;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), visibility 0.6s;
    }
    .loader-overlay.fade-out {
      opacity: 0;
      visibility: hidden;
    }
    .loader-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.5rem;
    }
    .logo-mark {
      font-size: 3.5rem;
      font-family: 'Outfit', sans-serif;
      font-weight: 800;
      display: flex;
      align-items: center;
      gap: 0.25rem;
      letter-spacing: -0.05em;
    }
    .bracket {
      color: var(--accent-primary);
      opacity: 0;
      animation: fadeIn 0.5s ease forwards;
    }
    .initials {
      background: linear-gradient(135deg, var(--text-primary), var(--text-secondary));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      opacity: 0;
      transform: translateY(10px);
      animation: slideUpFade 0.6s ease forwards 0.3s;
    }
    .loading-bar-container {
      width: 120px;
      height: 2px;
      background: var(--border-color);
      border-radius: 2px;
      overflow: hidden;
      opacity: 0;
      animation: fadeIn 0.5s ease forwards 0.6s;
    }
    .loading-bar {
      height: 100%;
      width: 0%;
      background: linear-gradient(90deg, var(--accent-primary), var(--accent-secondary));
      border-radius: 2px;
      animation: progress 1.2s cubic-bezier(0.77, 0, 0.175, 1) forwards 0.8s;
    }
    @keyframes fadeIn {
      to { opacity: 1; }
    }
    @keyframes slideUpFade {
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes progress {
      0% { width: 0%; }
      50% { width: 70%; }
      100% { width: 100%; }
    }
  `]
})
export class LoaderComponent implements OnInit {
  isLoading = signal(true);
  isFadingOut = signal(false);

  ngOnInit() {
    // Total animation time is roughly 2s
    setTimeout(() => {
      this.isFadingOut.set(true);
      setTimeout(() => this.isLoading.set(false), 600);
    }, 2200);
  }
}
