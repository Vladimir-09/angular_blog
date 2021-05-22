import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {LoginPageComponent} from './login-page/login-page.component';
import {DashboardPageComponent} from './dashboard-page/dashboard-page.component';
import {CreatePageComponent} from './create-page/create-page.component';
import {EditPageComponent} from './edit-page/edit-page.component';
import {AdminLayoutComponent} from './shared/admin-layout/admin-layout.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
import {AuthGuard} from './shared/auth.guard';
import {SearchPipe} from './shared/search.pipe';
import { AlertComponent } from './shared/alert/alert.component';
import {AlertService} from './shared/alert.service';

@NgModule({
  declarations: [
    LoginPageComponent,
    DashboardPageComponent,
    CreatePageComponent,
    EditPageComponent,
    AdminLayoutComponent,
    SearchPipe,
    AlertComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '', component: AdminLayoutComponent, children: [
          {path: '', redirectTo: '/admin/login', pathMatch: 'full'},
          {path: 'login', component: LoginPageComponent},
          {path: 'dashboard', component: DashboardPageComponent, canActivate: [AuthGuard]},
          {path: 'create', component: CreatePageComponent}, //canActivate: [AuthGuard]
          {path: 'post/:id/edit', component: EditPageComponent},//canActivate: [AuthGuard]
        ]
      }
    ])
  ],
  exports: [RouterModule],
  providers: [AuthGuard,AlertService]
})
export class AdminModule {

}
