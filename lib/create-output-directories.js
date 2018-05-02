const fs = require('fs-extra');
const ora = require('ora');
const chalk = require('chalk');

/**
	*	Create Public HTML Directory 
	*
	* @function
	* @async
	* @param {Object} options
	* @param {String} options.output - Target Project Directory
	* @param {Boolean} options.quiet - Mute console logs
	* @param {Public} options.public - HTML Output Directory (e.g. 'www', 'public', etc)
	* 
	* */
async function createOutputDirectories(options){
	var { output, quiet, public } = options;
	var dirs = ['css', 'img', 'js'];

	var spinner = ora({
		text: `Creating Output Directory`,
		color: 'cyan'
	});

	try{
		await dirs.forEach(dir => {
			let dirName = `${output}/${public}/${dir}`;
			fs.ensureDir(dirName)
				.then(() => {
					if(quiet) return;
					else spinner.text = `Created ${dirName}`;
				});
		});

		await fs.writeFile(`${output}/${public}/css/main.css`, `.slides { width: 100vw; height: 100vh; }`, function(err){
			if(err) throw err;
			if(quiet) return;
			else spinner.text = `Created ${output}/${public}/css/main.css`;
		});
	} catch(err) {
		if(!quiet) spinner.fail(err.message);
		else console.error(chalk.red(err.message));
		process.exit(0);
	} finally {
		if(!quiet)spinner.succeed('Done creating output directory!');
	}
}

module.exports = createOutputDirectories;
