const fs = require('fs');
const chalk = require('chalk');

/**
	*	Load Metadata from Directory of JSON Files
	*
	*	@function
	*	@param {Object} options
	*	@param {String} options.input - Path to markdown directory
	*	@param {Object} options.spinner - CLI Spinner
	*	@param {Boolean} options.quiet - Mute Console Logs
	*	
	* */

function loadPages(options) {
	var { input: path, spinner, quiet } = options;
	var pages = {};

	if (!quiet) {
		spinner.text = 'Loading pages...';
		spinner.start();
	}

	try {
		for (let page of fs.readdirSync(path)) {
			if(!quiet) spinner.text = `Loading ${page}`;
			pages[page] = fs.readFileSync(`${path}/${page}`, 'utf-8');
		}
	} catch (err) {
		if (!quiet) spinner.fail(`Error during loading: ${err.message}`);
		else console.error(chalk.red(`Error during loading: ${err.message}`));
		process.exit(1);
	} finally {
		if (!quiet) spinner.succeed('Loaded pages!');
	}

	return pages;
}

module.exports = loadPages;
