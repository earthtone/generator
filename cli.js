#!/usr/bin/env node
const fs = require('fs');
const grayson = require('./lib/grayson');
const graysonPkg = require('./package.json');

const defaults = require('./lib/_defaults.json');
const argv = require('minimist')(process.argv.slice(2));
const pkg = fs.existsSync(`${process.cwd()}/package.json`) 
	? require(`${process.cwd()}/package.json`).grayson 
		? require(`${process.cwd()}/package.json`).grayson 
		: {}
	: {};

const helpMessage = `
USAGE:
	$ grayson [options]

OPTIONS:

	--help, -h		Prints this message
	--version, -v	Prints Grayson Version
	--input, -i		Input: Specific MD file or directory of multiple MD files 
	--output, -o	Output: Target directory for generated HTML output
	--mode, -m		Mode: "pages", "slides", "blog" -- defaults to "pages"

MODES:
	Pages: Generate one HTML file per MD file input
	Slides: Outputs one HTML file with all MD content contained in ".slide" element
	Blog: Like pages, with the automatic generation of an "index.html" file if none given
`;

if(argv.version || argv.v){
	console.log(graysonPkg.version);
}

if(argv.help || argv.h){
	console.log(helpMessage);
}

if(!argv.output && argv.o){
	argv.output = argv.o;
}

if(!argv.input && argv.i){
	argv.input = argv.i;
}

if(!argv.mode && argv.m){
	argv.mode = argv.m;
}

const metadata = Object.assign({}, defaults, pkg.metadata);
const options = Object.assign({	input: process.cwd(), output: process.cwd()  }, pkg, argv, { metadata });
grayson(options);
