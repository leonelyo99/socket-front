import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { PageComponent } from './page.component';

const routes: Routes = [
  { path: "", component: PageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageRoutingModule { }
