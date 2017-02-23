import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { JumbotronComponent } from './components/jumbotron/jumbotron.component';
import { MoviesComponent } from './components/movies/movies.component';
import { AddMovieComponent } from './components/movies/add-movie/add-movie.component';
import { EditMovieComponent } from './components/movies/edit-movie/edit-movie.component';
import { MovieDetailsComponent } from './components/movies/movie-details/movie-details.component';
import { ContactComponent } from './components/contact/contact.component';
import { HowItWorksComponent } from './components/how-it-works/how-it-works.component';
import { MoviesService } from './services/movies.service';

const appRoutes: Routes = [
  { path:"", component:HomeComponent },
  { path:"movies", component:MoviesComponent },
  { path:"create", component:AddMovieComponent },
  { path:"edit/:id", component:EditMovieComponent },
  { path:"details/:id", component:MovieDetailsComponent },
  { path:"contact", component:ContactComponent },
  { path:"howitworks", component:HowItWorksComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    JumbotronComponent,
    MoviesComponent,
    AddMovieComponent,
    EditMovieComponent,
    MovieDetailsComponent,
    ContactComponent,
    HowItWorksComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [MoviesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
