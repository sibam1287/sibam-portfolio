import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="not-found">
      <div class="content glass">
        <h1 class="text-gradient">404</h1>
        <h2>Page Not Found</h2>
        <p>The page you are looking for does not exist or has been moved.</p>
        <a routerLink="/" class="btn-primary">Return Home</a>
      </div>
    </div>
  `,
  styles: [`
    .not-found {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
    }
    .content {
      text-align: center;
      padding: 4rem 2rem;
      border-radius: 1.5rem;
      max-width: 500px;
      width: 100%;
    }
    h1 {
      font-size: 6rem;
      line-height: 1;
      margin-bottom: 1rem;
    }
    h2 {
      font-size: 2rem;
      margin-bottom: 1rem;
    }
    p {
      color: var(--text-secondary);
      margin-bottom: 2rem;
      font-size: 1.1rem;
    }
  `]
})
export class NotFoundComponent {}
