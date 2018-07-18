import { Injectable } from '@angular/core';

import { MessageService } from './message.service';
import {
  Router,
  Routes,
  NavigationEnd,
  NavigationError,
  NavigationCancel,
  NavigationStart
} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AppRoutingService {
  constructor(private router: Router, private messageService: MessageService) {
    this.messageService.add(
      `Routes: ${JSON.stringify(this.router.config, null, 2)}`
    );

    this.router.events.subscribe(e => {
      if (e instanceof NavigationStart) {
        this.messageService.add(`NavigationStart: Navigate to ${e.url}`);
      } else if (e instanceof NavigationEnd) {
        this.messageService.add(`NavigationEnd: Navigated to ${e.url}`);
      } else if (e instanceof NavigationCancel) {
        this.messageService.add(
          `NavigationCancel: Canceled navigation to ${e.url}, reason: ${
            e.reason
          }`
        );
      } else if (e instanceof NavigationError) {
        this.messageService.add(`NavigationError: ${e.error}`);
      }
    });
  }
}
