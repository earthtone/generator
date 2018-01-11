#!/usr/bin/env node

var chalk = require('chalk');
var program = require('commander');

program
	.version('0.1.0')
	.command('init [directory]', 'initialize project')
	.command('gen [options', 'generate HTML from MD')
	.parse(process.argv);