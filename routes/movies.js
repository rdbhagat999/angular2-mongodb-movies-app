var express = require('express');
var router = express.Router();
var mongoose = require('bluebird').promisifyAll(require('mongoose'))
const config = require('../config/config');

var Movie = require('../models/movie.model.js');

var multer  = require('multer');
var dir = __dirname;

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, dir + '/../client/uploads/movies/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
})

var upload = multer({ storage: storage });
var cpUpload = upload.fields([{ name: 'poster', maxCount: 1 } /* , { name: 'hero_img', maxCount: 1}*/  ]);


// Get all tasks
router.get('/movies', function( req, res, next ) {

	Movie.findAsync({})
	.then( function( movies ) {
		res.json( movies );
	} )
	.catch( next )
	.error( console.error );

});


router.get('/movies/:id', function( req, res, next ){

	Movie.findOneAsync( { _id: req.params.id } )
    .then(function( movie ) {
      res.json( movie );
    })
    .catch( next )
    .error( console.error );

});


router.post( '/movies/', cpUpload, function( req, res, next ){

	var movie = new Movie();
	movie.title = req.body.title;
	movie.year = req.body.year;
	movie.description = req.body.description;
	movie.main_characters = req.body.actors;
	movie.poster = req.files.poster[0].filename;
	movie.hero_image = 'death_star_image.jpg';

  /*console.log(movie);
	res.json(movie);*/

  movie.saveAsync()
  .then(function(movie) {
    console.log("success");
    res.json({'status': 'success', 'movie': movie});
  })
  .catch(function(e) {
    console.log("fail");
    res.json({'status': 'error', 'error': e});
  })
  .error(console.error);

});

router.put('/movies/:id', cpUpload, function( req, res, next ){

	var movie = {};
	movie.title = req.body.title;
	movie.year = req.body.year;
	movie.description = req.body.description;
	movie.main_characters = req.body.main_characters;
	movie.poster = req.files.poster[0].filename;
	movie.hero_image = 'death_star_image.jpg';

	Movie.updateAsync( { _id: req.params.id }, movie )
    .then(function( updatedMovie ) {
      return res.json( { 'status': 'success', 'movie': updatedMovie } );
    })
    .catch(function(e){
      return res.status(400).json( {'status': 'fail', 'error': e} );
    });

});

router.delete('/movies/:id', function( req, res, next ){

	Movie.findByIdAndRemoveAsync(req.params.id)
    .then(function(deletedMovie) {
      res.json({'status': 'success', 'movie': deletedMovie});
    })
    .catch(function(e) {
      res.status(400).json({'status': 'fail', 'error': e});
    });

});

module.exports = router;
