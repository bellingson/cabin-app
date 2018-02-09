import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ServiceWorkerModule } from '@angular/service-worker';

import { environment } from '../environments/environment';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { FormsModule } from '@angular/forms';

import {cabinRoutes} from "./app.router";

import { AppComponent } from './app.component';

import {SharedModule} from "./shared/shared.module";
import {UserService} from "./testing/user/user.service";
import {AuthService} from "./testing/user/auth.service";
import {TestService} from "./testing/face-test/test.service";
import {AdminGuard} from "./admin/admin.guard";
import {AuthInterceptor} from "./testing/user/auth.interceptor";
import {ClearComponent} from "./clear.component";

@NgModule({
  declarations: [
    AppComponent,
    ClearComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    FormsModule,
    HttpClientModule,
    cabinRoutes
  ],
  providers: [UserService,
              AuthService,
              TestService,
              { provide: LocationStrategy, useClass: HashLocationStrategy },
              AdminGuard,
              { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true, }
            ],
  bootstrap: [AppComponent]
})
export class AppModule { }
