import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { RoutingModule } from './routing.module';
import { SharedModule } from './shared/shared.module';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { AuthGuardLogin } from './services/auth-guard-login.service';
import { AuthGuardAdmin } from './services/auth-guard-admin.service';
import { AuthGuardAdminOnlyLogin } from './services/auth-guard-login.admin-only-service';

import { TimeZoneService } from './services/timezone.service';

import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { UserEditComponent } from './user-edit/user.component';
import { UserAddComponent } from './user-add/add.component';
import { TimeZoneComponent } from './time-zone/timezone.component';

import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AccountComponent } from './account/account.component';
import { AdminComponent } from './admin/admin.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { TimezonePickerModule } from 'ng2-timezone-selector';
import { MomentModule } from 'angular2-moment';
import { MomentTimezoneModule } from 'angular-moment-timezone';

@NgModule({
    declarations: [
        AppComponent,
        RegisterComponent,
        LoginComponent,
        LogoutComponent,
        AccountComponent,
        AdminComponent,
        NotFoundComponent,
        UserEditComponent,
        UserAddComponent,
        TimeZoneComponent
    ],
    imports: [
        RoutingModule,
        SharedModule,
        TimezonePickerModule,
        MomentModule,
        MomentTimezoneModule
    ],
    providers: [
        AuthService,
        AuthGuardLogin,
        AuthGuardAdmin,
        AuthGuardAdminOnlyLogin,
        UserService,
        TimeZoneService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    bootstrap: [AppComponent]
})

export class AppModule { }
