#!/usr/bin/env node
const program = require('commander');
const chalk = require('chalk');
const fs = require('fs-extra');

var md = require('marked');
var template = require('./lib/template');

program
		// .arguments('<root>')
		.option('-o, --output <output>', 'Directory for HTML output')
		.option('-p, --pages <pages>', 'Directory of Markdown Files to be Ingested')
		.option('-m, --meta <metadata>', 'Directory JSON Metadata')
		.parse(process.argv);


var rootPath = program.args[0];

var outPath = program.output || `${rootPath}/public`;
var pagesPath = program.pages || `${rootPath}/markdown`;
var metaPath = program.meta || `${rootPath}/meta`;
var pages = {}, pagesMeta = {};


console.log(chalk.cyan('Loading pages...'));
try {
	console.log(pagesPath);
	for(let page of fs.readdirSync(pagesPath)){
		console.log(chalk.dim.cyan(`Loading ${page}`));
		pages[page] = fs.readFileSync(`${pagesPath}/${page}`, 'utf-8');
	}
} catch(err) {
	console.log(chalk.bold.red(`Error during loading: ${err}`));
	process.exit(1);
}

console.log(chalk.cyan('Loading pages metadata...'));
try {
	for(let pageMeta of fs.readdirSync(metaPath)){
		console.log(chalk.dim.cyan(`Loading ${pageMeta}`));
		pagesMeta[pageMeta] = fs.readFileSync(`${metaPath}/${pageMeta}`, 'utf-8');
	}
} catch(err) {
	console.log(chalk.bold.red(`Error during metadata loading: ${err}`));
	process.exit(1);
}

console.log(chalk.green('Generating pages...'));
try {
	for(let page of Object.entries(pages)){
		let pageName = page[0].slice(0, page[0].lastIndexOf('.'));
		let metaData = pagesMeta.hasOwnProperty(`${pageName}.json`) ? JSON.parse(pagesMeta[`${pageName}.json`]) : {};
		metaData.title = metaData.title || pageName;
		
		let pageContent = page[1];
		
		console.log(chalk.dim.green(`Generating ${pageName}.html`));

		fs.writeFileSync(`${outPath}/${pageName}.html`, template({content: md(pageContent), meta: metaData}));
	}
} catch(err) {
	console.log(chalk.bold.red(`Error during page generation: ${err}`));
	process.exit(1);
}

console.log(chalk.bold.green('Done!'));
