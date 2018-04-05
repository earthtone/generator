#!/usr/bin/env node

var program = require('commander');

program
	.version('0.2.2')
	.command('init <project-directory>', 'initialize project')
	.command('node', 'initialize current directory as a node project')
	.command('gen [options', 'generate HTML from MD')
	.parse(process.argv);
