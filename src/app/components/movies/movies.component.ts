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

	movies: any = [];

	loader: boolean = false;

	ngOnInit() {

		this.loader = true;

		this._ms.getMovies().subscribe( ( data: any ) => { 

			if( data.success == true ){

				console.log(data.movies); 
				this.movies = data.movies;
			}

			this.loader = false;

		} );

	}

	getMovie( movie: Movie ) {

		console.log(movie);

		this.router.navigate(['details', movie._id]);

	}

	addMoviePage() {

		this.router.navigate(['create']);

	}



}