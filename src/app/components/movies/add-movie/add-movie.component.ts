import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName  } from '@angular/forms';
import { Movie } from '../movie';
import { MoviesService } from '../../../services/movies.service';
import { Router } from '@angular/router';
import 'rxjs/add/operator/debounceTime';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent implements OnInit { 

	constructor( private _ms:MoviesService, private _fm:FlashMessagesService, private router: Router, private fb: FormBuilder ) {

	}

	movie: Movie;

	addMovieForm: FormGroup;

	uploadFile:any = null;
	posterImageError: string = "";

	submitted: boolean = false;

	loader: boolean = true;

	get actors(): FormArray {
        return <FormArray>this.addMovieForm.get('actors');
    }


	ngOnInit(): void {

		this.buildForm();
		this.addActors();
	}

	buildForm(): void {

		this.addMovieForm = this.fb.group({

			title: ['', [
				Validators.required,
				Validators.minLength(4),
				Validators.maxLength(60)
				]
			],

			description: ['', [
				Validators.required,
				Validators.minLength(15),
				Validators.maxLength(900)
			]],

			year: ['', [
				Validators.required,
				Validators.minLength(4),
				Validators.maxLength(4)
			]],

			actors: this.fb.array([
			]),

			poster: ['', []]

		});

		this.loader = false;
		this.posterImageError = "";

		this.addMovieForm.valueChanges
			.debounceTime(900)
	      	.subscribe(data => this.onValueChanged(data));

		this.onValueChanged(); // (re)set validation messages now

	}

	addActors() {
		this.actors.push(new FormControl());
    }

	onValueChanged(data?: any) {

		if (!this.addMovieForm) { return; }

		const form = this.addMovieForm;

		for (const field in this.formErrors) {
			// clear previous error message (if any)
			this.formErrors[field] = '';
			const control = form.get(field);
			if (control && control.dirty && !control.valid) {
				const messages = this.validationMessages[field];
				for (const key in control.errors) {
					this.formErrors[field] += messages[key] + ' ';
				}
			}
		}

	}

	onFileChange( event ){
		this.uploadFile = event.srcElement.files;
    	console.log(this.uploadFile);
	}

	onSubmit( ) {

		let file = this.uploadFile;
		console.log(file);

		if( file == null ){

			this.posterImageError = "Poster image is required";
			this._fm.show('Poster image required', {cssClass:'alert-danger', timeout:3000});
	        return false;

		}else{

			this.loader = true;

			this.movie = this.addMovieForm.value;

			this.submitted = true;

			console.log(this.movie);

			this._ms.postMovieWithFile('', this.movie, file).then( result => {

				this.loader = false;
				
		        console.log(result);
		        this._fm.show('Movie successfully saved.', {cssClass:'alert-success', timeout:3000});
		        this.router.navigate(['movies'])
		    },
		    err => {

		    	this.loader = false;
		    	this._fm.show('Something went wrong! Please try again.', {cssClass:'alert-danger', timeout:3000});
		    
		    });

		}

		

	}

	formErrors = {
		'title': '',
		'year': '',
		'description': ''
	};

	validationMessages = {
		'title': {
			'required': 'Title is required.',
			'minlength': 'Title must be at least 4 characters long.',
			'maxlength': 'Title cannot be more than 60 characters long.'
		},
		'year': {
			'required': 'Year is required.',
			'minlength': 'Year must be at least 4 characters long.',
			'maxlength': 'Year cannot be more than 4 characters long.'
		},
		'description': {
			'required': 'Description is required.',
			'minlength': 'Description must be at least 15 characters long.',
			'maxlength': 'Description cannot be more than 900 characters long.'
		}
	};



}
