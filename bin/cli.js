#!/usr/bin/env node

var ora = require('ora');
var chalk = require('chalk');
var pkg = require('../package.json');
var argv = require('minimist')(process.argv.slice(2));

var init = require('../lib/initialize-project');
var generateSlides = require('../lib/generate-slides');
var generatePages = require('../lib/generate-pages');

var helpMessage = `
Usage:
  $ grayson <command> [arguments] [options]

  Initialize project in a given directory or the current working directory.
  $ grayson init [--output, --quiet]                       

  Generate HTML from an input directory of MD to a given output directory or the current working directory. 
  $ grayson html <input> [--output, --quiet] [options]

Options:
  --help, -h        Output help info
  --version, -v     Output version number
  --quiet, -q       Mute console output

  --input, -i       Source directory (defaults to first argument)
  --output, -o      Target directory (defaults to current directory)

  --pages, -p       Generate 1 HTML file per MD file (*default*)
  --slides, -s      Geneate 1 HTML file for all MD files
  --blog, -b        Geneate 1 HTML file per MD file with an index 
`;

try{
	if(!argv.quiet && argv.q){
		argv.quiet = argv.q;
	}

	if(!argv.output && argv.o){
		argv.output = argv.o;
	}

	if(!argv.input && argv.i){
		argv.input = argv.i;
	}

	if(!argv._.length && argv.v || argv.version){
		console.log(chalk.green(pkg.version));
	}

	if(!argv._.length && argv.h || argv.help){
		console.log(helpMessage);
	}

	if(argv._[0] === 'init'){
		let options = Object.assign({ output: argv._[1] || process.cwd() }, argv);
		init(options);
	}

	if(argv._[0] === 'html'){
		let options = Object.assign({ input: argv._[1], output: process.cwd(), spinner: ora() }, argv);

		if(!options.input){
			throw new Error('No Input Directory Given');
		}

		if(!options.data && options.d){
			options.data = options.d;
		} else if(!options.data && !options.d){
			options.data = `${options.output.slice(0, options.output.lastIndexOf('/'))}/meta`;
		}

		if(argv.slides || argv.s){
			generateSlides(options);
			return;
		}

		generatePages(options);
	}
} catch (err) {
	console.error(chalk.red(err.message));
	process.exit(0);
}
