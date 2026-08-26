import { ElementRef } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const AnimationUtils = {
  fadeInUp(elements: ElementRef[] | HTMLElement[] | string, delay = 0, stagger = 0.1) {
    return gsap.fromTo(elements, 
      { y: 50, opacity: 0 }, 
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8, 
        ease: 'power3.out',
        delay,
        stagger,
        scrollTrigger: {
          trigger: elements as any,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  },
  
  scaleIn(element: HTMLElement | string, delay = 0) {
    return gsap.fromTo(element,
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, ease: 'power2.out', delay }
    );
  }
};
