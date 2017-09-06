import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AccountComponent } from './account/account.component';
import { AdminComponent } from './admin/admin.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { UserEditComponent } from './user-edit/user.component';
import { UserAddComponent } from './user-add/add.component';
import { TimeZoneComponent } from './time-zone/timezone.component';

import { AuthGuardLogin } from './services/auth-guard-login.service';
import { AuthGuardAdmin } from './services/auth-guard-admin.service';
import { AuthGuardAdminOnlyLogin } from './services/auth-guard-login.admin-only-service';

const routes: Routes = [
  
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'account', component: AccountComponent, canActivate: [AuthGuardLogin] },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuardAdmin] },
  { path: 'register', component: RegisterComponent },
  { path: 'edit/:id', component: UserEditComponent },
  { path: 'add', component: UserAddComponent},
  { path: 'timezone', component: TimeZoneComponent, canActivate: [AuthGuardLogin] },
  { path: 'timezone/:id', component: TimeZoneComponent, canActivate: [AuthGuardAdminOnlyLogin] },
  { path: 'notfound', component: NotFoundComponent },
  { path: '**', redirectTo: '/notfound' },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class RoutingModule {}