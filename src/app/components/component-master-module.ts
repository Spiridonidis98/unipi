/* eslint-disable max-len */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    SidebarComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    // TranslateModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [
    SidebarComponent,
    HomeComponent
  ]
})
export class ComponentMasterModule {}
