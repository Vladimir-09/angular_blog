import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {FbAuthResponse, User} from '../../shared/interfaces';
import {BehaviorSubject, Observable, Subject, throwError} from 'rxjs';
import {environment} from '../../../environments/environment';
import {catchError, tap} from 'rxjs/operators';
import {AppConstants} from './admin.model';


@Injectable({providedIn: 'root'})
export class AuthService {
  public error$: Subject<string> = new Subject<string>();

  public isAuth$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);

  constructor(private http: HttpClient) {
  }

  get token(): string {
    const expDate = new Date(localStorage.getItem(AppConstants.FB_STORAGE_EXP));
    if (new Date() > expDate) {
      this.logout();
      return null;
    }
    return localStorage.getItem(AppConstants.FB_TOKEN);
  }

  login(user: User): Observable<any> {
    user.returnSecureToken = true;
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
      .pipe(
        tap(this.setToken),
        catchError(this.handleError.bind(this))
      );
  }

  logout(): void {
    this.isAuth$.next(false);
    this.setToken(null);
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    const {message} = error.error.error;

    switch (message) {
      case 'INVALID_EMAIL':
        this.error$.next('Неверный email');
        break;
      case 'INVALID_PASSWORD':
        this.error$.next('Неверный пароль');
        break;
      case 'EMAIL_NOT_FOUND':
        this.error$.next('Такого email нет');
        break;
    }

    return throwError(error);
  }

  private setToken(response: FbAuthResponse | null): void {
    console.log(response);
    if (response) {
      const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000);
      localStorage.setItem(AppConstants.FB_TOKEN, response.idToken);
      localStorage.setItem(AppConstants.FB_STORAGE_EXP, expDate.toString());
    } else {
      //this.isAuth$.next(false);
      localStorage.clear();
    }
  }
}
