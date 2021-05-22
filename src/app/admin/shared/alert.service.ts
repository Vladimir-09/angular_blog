import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

export type AlertType = 'success' | 'warning' | 'danger';

export interface Alert {
  type: AlertType;
  text: string;
}

@Injectable()
export class AlertService {
  public alert$ = new Subject<Alert>();

  success(text: string) {
    const alert: Alert = {
      type: 'success',
      text: text
    };
    this.alert$.next(alert);
  }

  warning(text: string) {
    this.alert$.next({type: 'warning', text});
  }

  danger(text: string) {
    this.alert$.next({type: 'danger', text});
  }
}
