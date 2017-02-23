import { Component, OnInit } from '@angular/core';
import { Movie } from './movie';
import { MoviesService } from '../../services/movies.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit { 

	constructor( private _ms:MoviesService, private router: Router ) {

	}

	movies: Movie[] = [];

	ngOnInit() {

		this._ms.getMovies().subscribe( ( movies: Movie[] ) => { 
			//console.log(movies); 
			this.movies = movies;
		} );

	}

	getMovie( movie: Movie ) {

		//console.log(movie);

		this.router.navigate(['movies', movie._id]);

	}

	addMoviePage() {

		this.router.navigate(['movies/create']);

	}



}