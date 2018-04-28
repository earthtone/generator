const fs = require('fs-extra');
const message = require('./message');

function loadPages(pagesPath){
	var pages = {};

	try {
		console.log(message.warning('Loading pages...'));
		for(let page of fs.readdirSync(pagesPath)){
			console.log(message.info(`Loading ${page}`));
			pages[page] = fs.readFileSync(`${pagesPath}/${page}`, 'utf-8');
		}

		return pages;
	} catch(err) {
		console.log(message.error(`Error during loading: ${err.message}`));
		process.exit(1);
	}
}

module.exports = loadPages;
