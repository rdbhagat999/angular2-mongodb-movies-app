var express = require('express');
var router = express.Router();

const config = require('../config/config');

const Movie = require('../models/movie.model.js');

const multer  = require('multer');
const dir = __dirname;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, dir + '/../uploads/movies/');
  },
  filename: function (req, file, cb) {
    //cb(null, Date.now() + file.originalname);
    cb(null, file.originalname);
  }
})

const upload = multer({ storage: storage });
const cpUpload = upload.fields([{ name: 'poster', maxCount: 1 } /* , { name: 'hero_img', maxCount: 1}*/  ]);


// Get all tasks
router.get('/movies', function( req, res, next ) {

	Movie.findAsync({})
	.then( function( movies ) {
		res.json( {success:true, movies:movies} );
	} )
	.catch( next )
	.error( console.error );

});


router.get('/movies/:id', function( req, res, next ){

	Movie.findOneAsync( { _id: req.params.id } )
    .then(function( movie ) {
      res.json( {success:true, movie:movie} );
    })
    .catch( next )
    .error( console.error );

});


router.post('/movies/',  cpUpload, function( req, res, next ){

	var m = new Movie();
	m.title = req.body.title;
	m.year = req.body.year;
	m.description = req.body.description;
	m.poster = req.files.poster[0].filename;
	m.hero_image = 'death_star_image.jpg';
	
  //console.log(typeof req.body.actors)
  actors = req.body.actors.split(",");
   console.log(m);
   for(var i=0; i < actors.length; i++){
      let actor = actors[i];
      m.main_characters.push(actor);
   }

  //res.json(m);

  m.saveAsync()
  .then(function(movie) {
    console.log("success");
    res.json({success: true, movie: movie});
  })
  .catch(function(e) {
    console.log("fail");
    res.json({success: false, error: e});
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
      return res.json( { success: true, movie: updatedMovie } );
    })
    .catch(function(e){
      return res.json( {success: false, error: e} );
    });

});

router.delete('/movies/:id', function( req, res, next ){

	Movie.findByIdAndRemoveAsync(req.params.id)
    .then(function(deletedMovie) {
      res.json({success: false, movie: deletedMovie});
    })
    .catch(function(e) {
      res.json({success: false, error: e});
    });

});

module.exports = router;
