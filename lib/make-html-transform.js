const through = require('through2');
const md = require('./markdown-settings');

/**
  * Return HTML from Markdown File 
  *
  * @function
  * @param {String} file - markdown file
  * @returns {String} 
  *
  * */
function makeHTML(){
	return through(function(buf, enc, next){
		next(null, md.render(buf.toString()));
	});
}

module.exports = makeHTML;

