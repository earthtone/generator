const fs = require('fs-extra');
const chalk = require('chalk');
const ora = require('ora');

/**
	* Scaffold Target Project Directory
	*
	* @function
	* @async
	* @param {Object} options
	* @param {String} options.output - Target Project Directory
	* @param {Boolean} options.quiet - Mute Console Logs
	* @param {String} options.public - HTML Output Directory (e.g. 'www', 'public', etc)
	* @param {String} options.meta - Metadata Output Directory
	* @param {String} options.markdown - Markdown Output Directory
	* 
	* */

async function createProjectDirectories(options){
	var {output, quiet, public, meta, markdown} = options;
	var default_json = fs.readFileSync(`${__dirname}/_defaults.json`);
	var package_json = fs.readFileSync(`${__dirname}/_package.json`);
	var packageExists = fs.existsSync(`${output}/package.json`);

	var spinner = ora({
		text: 'Creating Project Directories',
		color: 'yellow'
	});

	if(!quiet){
		spinner.start();
	}

	try{
		await [public, meta, markdown].forEach(dir => {
			let dirName = `${output}/${dir}`;
			fs.ensureDir(dirName)
				.then(() => {
					if(quiet) return;
					else spinner.text = `Created ${dirName}`;
				});
		});

		await fs.writeFile(`${output}/${markdown}/index.md`, '# Hello World', function(err) {
			if(err) throw err;
			if(quiet) return;
			else spinner.text = `Created ${output}/${markdown}/index.md`;
		});

		await fs.writeFile(`${output}/${meta}/default.json`, default_json,  function(err){
			if (err) throw err;
			if(quiet) return;
			else spinner.text = `Created ${output}/${meta}/default.json`;
		});

		if(!packageExists){
			if(!quiet) spinner.text = 'No package.json found';
			await fs.writeFile(`${output}/package.json`, package_json, function(err){
				if(err) throw err;
				if(quiet) return;
				else spinner.text = `Created package.json`;
			});
		}
	} catch(err) {
		if(!quiet) spinner.fail(err.message);
		else console.error(chalk.red(err.message));
		process.exit(0);
	} finally {
		if(!quiet) spinner.succeed('Done creating project directory!');
	}
}

module.exports = createProjectDirectories;
