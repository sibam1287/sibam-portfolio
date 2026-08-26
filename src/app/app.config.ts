import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { LucideAngularModule, ArrowRight, Download, Github, Linkedin, Mail, Sun, Moon, Menu, X, ArrowUp, ExternalLink, Sparkles, Send, CheckCircle, MapPin, Phone, Calendar, Quote, ChevronLeft, ChevronRight } from 'lucide-angular';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    importProvidersFrom(LucideAngularModule.pick({ 
      ArrowRight, Download, Github, Linkedin, Mail, Sun, Moon, Menu, X, ArrowUp, ExternalLink, Sparkles, Send, CheckCircle, MapPin, Phone, Calendar, Quote, ChevronLeft, ChevronRight
    }))
  ]
};
