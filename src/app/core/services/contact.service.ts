import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  constructor() {}

  sendMessage(data: any): Observable<boolean> {
    // Mock API call for contact form
    // TODO: Integrate EmailJS or actual backend API here
    console.log('Sending message:', data);
    return of(true).pipe(delay(1500));
  }
}
