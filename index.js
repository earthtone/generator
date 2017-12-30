#!/usr/bin/env node
var browserify = require('browserify');
var fs = require('fs-extra');
var path = require('path');

var md = require('marked');
var template = require('./lib/template');

var chalk = require('chalk');
var program = require('commander');
var co = require('co');
var prompt = require('co-prompt');

program.arguments('<output>')
	.option('-p, --pages <pages>', 'Directory of Markdown Files to be Ingested')
	.option('-m, --meta <metadata>', 'Directory JSON Metadata')
	.action(function(outPath){
		var pagesPath = program.pages || './pages';
		var metaPath = program.meta || './meta';
		var copyFolders = ['./img', './css', './js'];
		
		if(outPath.match(/\s/ig)){
			outPath = outPath.split(' ').pop();
		}

		console.log(chalk.bold.yellow('Cleaning previous build...'));
		try {
			for(let file of fs.readdirSync(outPath)){
				console.log(chalk.dim.yellow(`removing ${file}`))
				fs.removeSync(path.join(outPath, file));
			}
		} catch(err) {
			console.log(chalk.bold.red(`Error during cleanup: ${err}`));
			process.exit(1);
		}

		var pages = {}, pagesMeta = {};

		console.log(chalk.cyan('Loading pages...'));
		try {
			for(let page of fs.readdirSync(pagesPath)){
				console.log(chalk.dim.cyan(`Loading ${page}`));
				pages[page] = fs.readFileSync(path.join(pagesPath, page), 'utf-8');
			}
		} catch(err) {
			console.log(chalk.bold.red(`Error during loading: ${err}`));
			process.exit(1);
		}

		console.log(chalk.cyan('Loading pages metadata...'));
		try {
			for(let pageMeta of fs.readdirSync(metaPath)){
				console.log(chalk.dim.cyan(`Loading ${pageMeta}`));
				pagesMeta[pageMeta] = fs.readFileSync(path.join(metaPath, pageMeta), 'utf-8');
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
				fs.writeFileSync(path.join(outPath, `${pageName}.html`), template({content: md(pageContent), meta: metaData}));
			}
		} catch(err) {
			console.log(chalk.bold.red(`Error during page generation: ${err}`));
			process.exit(1);
		}

		console.log(chalk.green('Copying folders...'));
		try {
			for(let copyFolder of copyFolders){
				console.log(chalk.dim.green(`Copying ${copyFolder}`));
				fs.copySync(copyFolder, path.join(outPath, copyFolder));
			}
		} catch(err) {
			console.log(chalk.bold.red(`Error during folder copying: ${err}`));
			process.exit(1);
		}

		console.log(chalk.bold.green('Done!'));
	})
	.parse(process.argv);