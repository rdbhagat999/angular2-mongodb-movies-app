import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Movie } from '../movie';
import { MoviesService } from '../../../services/movies.service';
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit { 

	constructor(
	  private route: ActivatedRoute,
	  private router: Router,
	  private _ms: MoviesService
	) {}

	movie: Movie;

	ngOnInit() {

		//58949dd6734d1d3956c3cbe8

	  /*this.route.params
	    // (+) converts string 'id' to a number
	    .switchMap((params: Params) => this.service.getHero(+params['id']))
	    .subscribe((hero: Hero) => this.hero = hero);*/

	  this.route.params
	    // (+) converts string 'id' to a number
	    .switchMap((params: Params) => this._ms.getMovie(params['id']))
	    .subscribe((data: any) => {

	    	if( data.success == true ){
	    		this.movie = data.movie;
	    	}
	  
	    });


	}




}
