import { Injectable } from '@angular/core';
import { Notification } from '@interfaces/Notification.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationSubject$ = new BehaviorSubject<Notification | undefined>(undefined);

  setNotification(notification: Notification | undefined) {
    this.notificationSubject$.next(notification);
  }

  getNotification() {
    return this.notificationSubject$;
  }
}
