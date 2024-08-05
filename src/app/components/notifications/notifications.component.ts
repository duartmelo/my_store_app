import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Notification } from '@interfaces/Notification.interface';
import { NgbToast } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject } from 'rxjs';
import { NotificationService } from 'services/notification/notification.service';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [NgbToast, CommonModule],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss'
})
export class NotificationsComponent implements OnInit {
  notificationSubject$ = new BehaviorSubject<Notification | undefined>(undefined);

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.notificationSubject$ = this.notificationService.getNotification();
  }
}
