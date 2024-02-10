/* eslint-disable max-len */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HomeComponent } from './home/home.component';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderComponent } from './header/header.component';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { SocialLoginModule, GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
import { MovieInfoComponent } from './movie-info/movie-info.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { CreateEditMovieComponent } from './admin/create-edit-movie/create-edit-movie.component';
import { MoviesComponent } from './admin/movies/movies.component';
import { UsersComponent } from './admin/users/users.component';
import { AdminScreeningComponent } from './admin/admin-screening/admin-screening.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { CreateScreeningComponent } from './admin/admin-screening/create-screening/create-screening.component';

@NgModule({
  declarations: [
    SidebarComponent,
    HomeComponent,
    HeaderComponent,
    LoginComponent,
    MovieInfoComponent,
    AdminHomeComponent,
    MoviesComponent,
    CreateEditMovieComponent,
    UsersComponent,
    AdminScreeningComponent,
    CreateScreeningComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    RouterModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatOptionModule,
    MatDatepickerModule,
    BrowserAnimationsModule,
    SocialLoginModule,
    GoogleSigninButtonModule
  ],
  exports: [
    SidebarComponent,
    HomeComponent,
    HeaderComponent,
    LoginComponent,
    MovieInfoComponent,
    AdminHomeComponent,
    MoviesComponent,
    CreateEditMovieComponent,
    UsersComponent,
    AdminScreeningComponent,
    CreateScreeningComponent
  ]
})
export class ComponentMasterModule {}
