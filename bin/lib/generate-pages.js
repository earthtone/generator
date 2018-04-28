const fs = require('fs-extra');

var message = require('./message');
var makeNavList = require('./make-nav-list');
var template = require('./template');
var md = require('./markdown-settings');

function generatePages({ pages, meta, out }){
	try {
		console.log(message.warning('Generating pages...'));
		for(let page of Object.entries(pages)){
			let pageName = page[0].slice(0, page[0].lastIndexOf('.'));
			let metaData = meta.hasOwnProperty(`${pageName}.json`) ? 
				JSON.parse(meta[`${pageName}.json`]) : 
				JSON.parse(meta['defaults.json']);

			metaData.title = metaData.title || pageName;
			let pageContent = page[1];

			console.log(message.success(`Generating ${pageName}.html`));
			fs.writeFileSync(`${out}/${pageName}.html`, template({
				content: { 
					body: md.render(pageContent), 
					nav: makeNavList(pages) 
				}, 
				meta: metaData,
			}));
		}
	} catch(err) {
		console.log(message.error(`Error during page generation: ${err}`));
		process.exit(1);
	}
}

module.exports = generatePages;
