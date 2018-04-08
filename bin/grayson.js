#!/usr/bin/env node

var program = require('commander');

program
	.version('2.0.3')
	.command('init', 'initialize project in pwd')
	.command('gen [options]', 'generate HTML from MD')
	.option('-o, --output <output>', 'Directory for HTML output')
	.option('-p, --pages <pages>', 'Directory of Markdown Files to be Ingested')
	.option('-m, --meta <metadata>', 'Directory JSON Metadata')
	.parse(process.argv);
