/*var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
*/
var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var Schema = mongoose.Schema;

var MovieSchema = new Schema({
	year: Number,
	title: String,
	main_characters: [String],
	description: String,
	poster: String,
	hero_image: String
});

var Movie = mongoose.model('Movie', MovieSchema);
module.exports = Movie;