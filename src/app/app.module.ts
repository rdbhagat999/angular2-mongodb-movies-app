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

const appRoutes: Routes = [
  { path:"", component:HomeComponent },
  { path:"movies", component:MoviesComponent },
  { path:"add", component:AddMovieComponent },
  { path:"edit", component:EditMovieComponent },
  { path:"details", component:MovieDetailsComponent },
  { path:"contact", component:ContactComponent }
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
    ContactComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
