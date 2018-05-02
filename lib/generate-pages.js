const fs = require('fs');
const chalk = require('chalk');

const loadPages = require('./load-pages');
const loadMeta = require('./load-metadata');
const template = require('./template');
const makeNavList = require('./make-nav-list');
const md = require('./markdown-settings');

/**
	* Generate HTML Pages
	*
	* @function
	* @param {Object} options
	* @param {String} options.output - Output Directory
	* @param {Boolean} options.quiet - Mute Console Logs
	* @param {Object} options.spinner - CLI spinner
	* 
	* */


function generatePages(options){
	var { output, quiet, spinner } = options;

	var pages = loadPages(options);
	var meta = loadMeta(options);
	var navList = makeNavList(pages);

	if(!quiet) spinner.start();
	try{
		for(let [key, value] of Object.entries(pages)){
			let fileName = `${output}/${key.slice(0, key.lastIndexOf('.'))}.html`;
			let fileContent	= template({
				content: { nav: navList, body: md.render(value)	},
				meta
			});

			fs.writeFile(fileName, fileContent, function(err){
				if(err) throw err;
				if(!quiet) spinner.text = `Generated ${fileName}`;
			});
		}

	} catch (err) {
		if(!quiet) spinner.fail(`Error generating pages: ${err.message}`); 
		else console.error(chalk.red(`Error generating pages: ${err.message}`));
	} finally {
		if(!quiet) spinner.succeed('Done generating pages in' + output +'!');
	}
}

module.exports = generatePages;
