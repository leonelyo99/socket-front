import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './services/auth/auth.service';
import { TokenInterceptorService } from './interceptors/token.interceptor.service';
import { LoginGuard } from './services/guards/login.guard';
import { HelperErrorService } from './helpers/errors.service';

@NgModule({
  imports: [CommonModule, RouterModule, HttpClientModule],
  declarations: [],
  providers: [
    AuthService,
    LoginGuard,
    HelperErrorService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
  exports: [],
})
export class SharedModule {}
