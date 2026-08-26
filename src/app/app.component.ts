import { Component, inject } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { CustomCursorComponent } from './shared/components/custom-cursor/custom-cursor.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, FooterComponent, LoaderComponent, CustomCursorComponent],
  template: `
    <app-loader></app-loader>
    <app-custom-cursor></app-custom-cursor>
    
    <app-navbar *ngIf="showLayout"></app-navbar>
    <router-outlet></router-outlet>
    <app-footer *ngIf="showLayout"></app-footer>
  `
})
export class AppComponent {
  router = inject(Router);
  showLayout = true;

  constructor() {
    // Hide navbar and footer on 404 page if desired
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.showLayout = !event.urlAfterRedirects.includes('not-found');
    });
  }
}
