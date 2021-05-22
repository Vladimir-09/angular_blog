import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';
import {LoginPageComponent} from '../../login-page/login-page.component';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {

  public  isAuth: boolean = false;

  constructor(
    private router: Router,
    public authService: AuthService,
    ) {}

  ngOnInit(): void {
    this.isAuth = this.authService.isAuthenticated();
    this.authService.isAuth$.subscribe(value => {
      if (value != null){
        this.isAuth = value
      }
    });
  }

  logout(event: Event): void {
    event.preventDefault();
    this.authService.logout();
    this.router.navigate(['/admin', 'login']);
  }
}
