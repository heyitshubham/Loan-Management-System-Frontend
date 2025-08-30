import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Notification {
  id: number;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  autoClose?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notifications = new BehaviorSubject<Notification[]>([]);
  public notifications$ = this.notifications.asObservable();
  private nextId = 1;

  show(type: 'success' | 'error' | 'info' | 'warning', message: string, autoClose = true): void {
    const notification: Notification = {
      id: this.nextId++,
      type,
      message,
      autoClose
    };

    const currentNotifications = this.notifications.value;
    this.notifications.next([...currentNotifications, notification]);

    if (autoClose) {
      setTimeout(() => {
        this.remove(notification.id);
      }, 5000);
    }
  }

  success(message: string, autoClose = true): void {
    this.show('success', message, autoClose);
  }

  error(message: string, autoClose = true): void {
    this.show('error', message, autoClose);
  }

  info(message: string, autoClose = true): void {
    this.show('info', message, autoClose);
  }

  warning(message: string, autoClose = true): void {
    this.show('warning', message, autoClose);
  }

  remove(id: number): void {
    const currentNotifications = this.notifications.value;
    this.notifications.next(currentNotifications.filter(n => n.id !== id));
  }

  clear(): void {
    this.notifications.next([]);
  }
}