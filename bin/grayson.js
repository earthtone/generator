#!/usr/bin/env node

var program = require('commander');

program
	.version('2.0.3')
	.command('init', 'initialize project in pwd')
	.command('gen [options]', 'generate HTML from MD')
	.parse(process.argv);
