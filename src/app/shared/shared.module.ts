import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//modulos necesarios
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

@NgModule({
  imports: [CommonModule, RouterModule, HttpClientModule],
  declarations: [],
  providers: [],
  exports: [],
})
export class SharedModule {}
