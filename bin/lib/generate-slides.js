const fs = require('fs-extra');

var message = require('./message');
var makeNavList = require('./make-nav-list');
var template = require('./template');
var md = require('./markdown-settings');

function generateSlides({ pages, meta, out }){
	try {
		console.log(message.warning('Generating slides...'));
		var body = '';

		for(let page of Object.entries(pages)){
			body += md.render(`:::slide\n${page[1]} \n:::`);	
		}

		fs.writeFileSync(`${out}/slides.html`, template({
			content: { body }	
		}));
	} catch(err) {
		console.log(message.error(`Error during page generation: ${err}`));
		process.exit(1);
	}
}

module.exports = generateSlides;
