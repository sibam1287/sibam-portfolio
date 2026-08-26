import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-visual',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="visual-container glass">
      <!-- Image Layer -->
      <img 
        *ngIf="!imageError && imageUrl" 
        [src]="imageUrl" 
        [alt]="altText" 
        class="profile-img" 
        (error)="onImageError()"
      >
      
      <!-- Premium Fallback Visual Layer -->
      <div *ngIf="imageError || !imageUrl" class="fallback-visual">
        <div class="fallback-bg"></div>
        
        <!-- Abstract Glowing Shapes -->
        <div class="shape shape-1"></div>
        <div class="shape shape-2"></div>
        <div class="shape shape-3"></div>

        <!-- Floating Code Window -->
        <div class="code-window glass-card">
          <div class="window-header">
            <span class="dot red"></span>
            <span class="dot yellow"></span>
            <span class="dot green"></span>
          </div>
          <div class="window-body">
            <div class="code-line w-70"></div>
            <div class="code-line w-90 indent-1"></div>
            <div class="code-line w-50 indent-2 text-primary"></div>
            <div class="code-line w-80 indent-1"></div>
            <div class="code-line w-40"></div>
          </div>
        </div>

        <!-- Floating Tech Badges -->
        <div class="tech-badge java">Java</div>
        <div class="tech-badge spring">Spring</div>
        <div class="tech-badge angular">Angular</div>
        <div class="tech-badge sql">SQL</div>
      </div>
    </div>
  `,
  styles: [`
    .visual-container {
      position: relative;
      width: 100%;
      max-width: 380px;
      margin: 0 auto;
      aspect-ratio: 4/5;
      border-radius: 2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      padding: 1rem;
      box-shadow: 0 20px 40px rgba(0,0,0,0.2);
    }

    .profile-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: top center;
      border-radius: 1.5rem;
      z-index: 10;
      position: relative;
      display: block;
    }

    /* Fallback Visual */
    .fallback-visual {
      position: absolute;
      top: 0; left: 0; width: 100%; height: 100%;
      border-radius: 2rem;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .fallback-bg {
      position: absolute;
      top: 0; left: 0; width: 100%; height: 100%;
      background: linear-gradient(135deg, var(--bg-secondary), var(--bg-primary));
      z-index: 0;
    }

    /* Shapes */
    .shape {
      position: absolute;
      border-radius: 50%;
      filter: blur(40px);
      z-index: 1;
      animation: float 10s infinite ease-in-out alternate;
    }

    .shape-1 {
      width: 250px; height: 250px;
      background: rgba(59, 130, 246, 0.5); /* Blue */
      top: -50px; left: -50px;
    }

    .shape-2 {
      width: 200px; height: 200px;
      background: rgba(139, 92, 246, 0.5); /* Purple */
      bottom: -50px; right: -50px;
      animation-delay: -3s;
    }

    .shape-3 {
      width: 150px; height: 150px;
      background: rgba(6, 182, 212, 0.4); /* Cyan */
      top: 50%; left: 50%;
      transform: translate(-50%, -50%);
      animation: pulse 8s infinite alternate;
    }

    /* Code Window */
    .code-window {
      position: relative;
      z-index: 5;
      width: 65%;
      height: 55%;
      background: var(--bg-glass);
      border-radius: 1rem;
      display: flex;
      flex-direction: column;
      box-shadow: 0 20px 40px rgba(0,0,0,0.2);
      animation: float-slow 8s infinite ease-in-out;
    }

    .window-header {
      padding: 0.75rem 1rem;
      display: flex;
      gap: 0.4rem;
      border-bottom: 1px solid var(--border-color);
    }

    .dot {
      width: 10px; height: 10px;
      border-radius: 50%;
    }
    .red { background: #ef4444; }
    .yellow { background: #f59e0b; }
    .green { background: #10b981; }

    .window-body {
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      flex-grow: 1;
    }

    .code-line {
      height: 8px;
      border-radius: 4px;
      background: var(--text-secondary);
      opacity: 0.3;
    }
    
    .code-line.text-primary {
      background: var(--accent-primary);
      opacity: 0.8;
    }

    .w-40 { width: 40%; }
    .w-50 { width: 50%; }
    .w-70 { width: 70%; }
    .w-80 { width: 80%; }
    .w-90 { width: 90%; }
    
    .indent-1 { margin-left: 10%; }
    .indent-2 { margin-left: 20%; }

    /* Tech Badges */
    .tech-badge {
      position: absolute;
      z-index: 6;
      padding: 0.5rem 1rem;
      border-radius: 1rem;
      font-size: 0.8rem;
      font-weight: 600;
      background: var(--bg-primary);
      color: var(--text-primary);
      box-shadow: 0 10px 20px rgba(0,0,0,0.15);
      border: 1px solid var(--glass-border);
      animation: float-badge 6s infinite ease-in-out alternate;
    }

    .tech-badge.java {
      top: 15%; right: 10%;
      border-left: 3px solid #f89820;
    }
    .tech-badge.spring {
      bottom: 25%; left: 5%;
      border-left: 3px solid #6db33f;
      animation-delay: -2s;
    }
    .tech-badge.angular {
      top: 25%; left: 10%;
      border-left: 3px solid #dd0031;
      animation-delay: -4s;
    }
    .tech-badge.sql {
      bottom: 15%; right: 15%;
      border-left: 3px solid #00758f;
      animation-delay: -1s;
    }

    /* Animations */
    @keyframes float {
      0% { transform: translate(0, 0) scale(1); }
      100% { transform: translate(20px, 30px) scale(1.1); }
    }
    
    @keyframes pulse {
      0% { transform: translate(-50%, -50%) scale(0.8); opacity: 0.5; }
      100% { transform: translate(-50%, -50%) scale(1.2); opacity: 0.8; }
    }

    @keyframes float-slow {
      0% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-15px) rotate(1deg); }
      100% { transform: translateY(0px) rotate(0deg); }
    }

    @keyframes float-badge {
      0% { transform: translateY(0px); }
      100% { transform: translateY(-10px); }
    }
  `]
})
export class ProfileVisualComponent {
  @Input() imageUrl: string = '';
  @Input() altText: string = 'Profile Visual';
  
  imageError: boolean = false;

  onImageError() {
    this.imageError = true;
  }
}
