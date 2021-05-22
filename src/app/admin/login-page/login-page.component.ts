import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../shared/auth.service';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  form: FormGroup;
  submitted = false;
  message: string;

  constructor(
    public auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      if (params['loginAgain']) {
        this.message = 'Пж, введите данные'
      } else if (params['authFailed']){
        this.message = 'Сессия искела введи данные заного'
      }
    });

    this.form = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ]),
    });
  }

  submit(): void{
    console.log(this.form);
    if (this.form.invalid){
      return;
    }

    this.submitted = true;

    const user: { password: any; email: any } = {
      email: this.form.value.email,
      password: this.form.value.password,
    };

    this.auth.login(user).subscribe(() => {
      this.form.reset();
      this.submitted = false;
      this.auth.isAuth$.next(true);
      this.router.navigate(['/admin', 'dashboard']);
    }, () => {
      console.log("ERROR");
      this.submitted = false;
    });
  }
}
