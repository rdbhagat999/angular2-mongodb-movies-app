import { Injectable } from '@angular/core';
import { Http, Headers, Response, Request, RequestMethod, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Movie } from '../components/movies/movie';

@Injectable()
export class MoviesService {

	constructor( private _http: Http ) {

	}

	baseUrl = 'http://localhost:3000/api/movies';
	//baseUrl = 'http://localhost:3000/api/movies';

	responseData: any;

	getMovies(): Observable<Movie[]> {

		return this._http.get( this.baseUrl ).map( res => res.json() );

	}

	getMovie( id: string ): Observable<Movie> {

		return this._http.get( this.baseUrl + '/' + id ).map( res => res.json() );

	}

	postMovieWithFile (url: string, postData: any, files: File[]) {

	    let headers = new Headers();
	    let formData:FormData = new FormData();
	    formData.append('poster', files[0], files[0].name);
	    // For multiple files
	    // for (let i = 0; i < files.length; i++) {
	    //     formData.append(`files[]`, files[i], files[i].name);
	    // }

	    if(postData !=="" && postData !== undefined && postData !==null){
	      for (var property in postData) {
	          if (postData.hasOwnProperty(property)) {
	              formData.append(property, postData[property]);
	          }
	      }
	    }
	    var returnReponse = new Promise((resolve, reject) => {
	      this._http.post(this.baseUrl + url, formData, {
	        headers: headers
	      }).subscribe(
	          res => {
	            this.responseData = res.json();
	            resolve(this.responseData);
	          },
	          error => {
	            reject(error);
	          }
	      );
	    });
	    return returnReponse;
	  
	}


}