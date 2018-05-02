const fs = require('fs');
const chalk = require('chalk');

/**
	*	Load Metadata from Directory of JSON Files
	*
	*	@function
	*	@param {Object} options
	*	@param {String} options.data - Path to metadata directory
	*	@param {Object} options.spinner - CLI Spinner
	*	@param {Boolean} options.quiet - Mute Console Logs
	*	
	* */

function loadData(options){
	var { data: path, spinner, quiet } = options;
	var collection = {};

	if(!quiet) {
		spinner.text = 'Loading data...';
		spinner.start();
	}

	try {
		for(let data of fs.readdirSync(path)){
			if(!quiet) spinner.text = `Loading ${data}`;
			collection[data] = fs.readFileSync(`${path}/${data}`, 'utf-8');
		}
	} catch(err) {
		if(!quiet) spinner.fail(`Error during metadata loading: ${err.message}`);
		else console.error(chalk.red(`Error during metadata loading: ${err.message}`));
		process.exit(1);
	} finally {
		if(!quiet) spinner.succeed( 'Loaded data!');
	}

	return collection;
}

module.exports = loadData;
