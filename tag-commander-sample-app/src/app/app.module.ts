import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { IndexPageComponent } from './index-page/index-page.component';
import { ShopPageComponent } from './shop-page/shop-page.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';

import { NgxTagCommanderModule } from '../../../src/ngx-tag-commander/ngx-tag-commander.module';
import { TagCommanderService } from '../../../src/ngx-tag-commander/tag-commander.service/tag-commander.service';

import {WindowRef} from '../../../src/ngx-tag-commander/tag-commander.service/WindowRef';


const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: IndexPageComponent
  },
  {
    path: 'shop/test',
    component: ShopPageComponent,
    data: {truc : 'bidule'},
  },
  {
    path: 'dashboard',
    component: DashboardPageComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    IndexPageComponent,
    ShopPageComponent,
    DashboardPageComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    AppRoutingModule,
    NgxTagCommanderModule
  ],
  providers: [WindowRef],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(tcService: TagCommanderService) {
    tcService.setDebug(false);
    tcService.addContainer('container_body', '/assets/tag-commander-body.js', 'body');
    tcService.addContainer('container_head', '/assets/tag-commander-head.js', 'head');
  }
}
