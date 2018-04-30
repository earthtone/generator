#!/usr/bin/env node
const program = require('commander');

const message = require('./lib/message');

var loadPages = require('./lib/load-pages');
var loadMeta = require('./lib/load-metadata');
var generateSlides = require('./lib/generate-slides');

program
	.option('-o, --output <output>', 'Directory for HTML output')
	.option('-p, --pages <pages>', 'Directory of Markdown Files to be Ingested')
	.option('-m, --meta <metadata>', 'Directory JSON Metadata')
	.parse(process.argv);

var rootPath = process.cwd();
var pagesPath = program.pages || `${rootPath}/markdown`;
var metaPath = program.meta || `${rootPath}/meta`;

var out = program.output || `${rootPath}/public`;
var pages = loadPages(pagesPath);
var meta = loadMeta(metaPath);

generateSlides({ pages, meta, out });
console.log(message.success('Done!'));
