const fs = require('fs-extra');
const chalk = require('chalk');

const loadPages = require('./load-pages');
const loadMeta = require('./load-metadata');
var template = require('./template');
var md = require('./markdown-settings');

/**
 * Generate an HTML Page
 *
 * @function
 * @param {Object} options
 * @param {String} options.output - Output Directory
 * @param {Boolean} options.quiet - Mute Console Logs
 * @param {Object} options.spinner - CLI spinner
 *
 * */

function generateSlides(options) {
	var { output, quiet, spinner } = options;

	var pages = loadPages(options);
	var meta = loadMeta(options);

	if (!quiet) {
		spinner.start();
		spinner.text = 'Generating slides...';
	}

	try {
		var body = '';

		for (let page of Object.entries(pages)) {
			body += md.render(`:::slide\n${page[1]} \n:::`);
		}

		fs.writeFileSync(
			`${output}/slides.html`,
			template({ content: { meta, body } }),
		);
	} catch (err) {
		if (!quiet) spinner.fail(`Error during page generation: ${err}`);
		console.error(chalk.red(`Error during page generation: ${err}`));
		process.exit(1);
	} finally {
		if (!quiet) spinner.succeed('Generated slides!');
	}

	return;
}

module.exports = generateSlides;
