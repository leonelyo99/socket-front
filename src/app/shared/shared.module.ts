import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth/auth.service';

@NgModule({
  imports: [CommonModule, RouterModule, HttpClientModule],
  declarations: [],
  providers: [AuthService],
  exports: [],
})
export class SharedModule {}
