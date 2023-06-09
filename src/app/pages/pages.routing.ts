import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingComponent } from './account-setting/account-setting.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent, data: { titulo: "Dashboard" }},
      { path: 'progress', component: ProgressComponent, data: { titulo: "Progress" } },
      { path: 'grafica1', component: Grafica1Component, data: { titulo: "Grafica" } },
      { path: 'account', component: AccountSettingComponent, data: { titulo: "Account" } },
      { path: 'promises', component: PromesasComponent, data: { titulo: "Promises" } },
      { path: 'rxjs', component: RxjsComponent, data: { titulo: "RxJs" } },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
