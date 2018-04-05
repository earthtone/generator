#!/usr/bin/env node
const chalk = require('chalk');
const fs = require('fs-extra');

var root_dir = process.cwd();
var proj_dir = ['public', 'meta', 'markdown'];
var pub_dir = ['css', 'img', 'js'];

var index_page = `${root_dir || '.'}/markdown/index.md`;
var default_meta = `${root_dir || '.'}/meta/defaults.json`;

var main_css = `${root_dir || '.'}/public/css/main.css`;
var package_json = fs.readFileSync(`${__dirname}/lib/sample-package.json`);
var default_meta_json = fs.readFileSync(`${__dirname}/lib/default-metadata.json`);

proj_dir.forEach(dir => {
	let dirName = `${root_dir || '.'}/${dir}`;
	fs
		.ensureDir(dirName)
		.then(() => successMsg(dirName))
		.catch(errorMsg);
});

pub_dir.forEach(dir => {
	let dirName = `${root_dir || '.'}/public/${dir}`;
	fs
		.ensureDir(dirName)
		.then(() => successMsg(dirName))
		.catch(errorMsg);
});

fs.writeFile(index_page, '# Hello World!', function(err) {
	if (err) {
		console.error(chalk.red(`${err.message}`));
		throw err;
	}
	console.log(chalk.dim.yellow(`Created ${index_page}`));
});

fs.writeFile(default_meta, default_meta_json,  function(err){
	if (err) {
		console.error(chalk.red(`${err.message}`));
		throw err;
	}
	console.log(chalk.dim.yellow(`Created ${default_meta}`));
});

fs.writeFile(main_css, '', function(err) {
	if (err) {
		console.error(chalk.red(`${err.message}`));
		throw err;
	}
	console.log(chalk.dim.yellow(`Created ${main_css}`));
});

var packageExists = fs.existsSync('./package.json');
if(!packageExists){
	fs.writeFile('package.json', package_json, function(err){
		if(err){
			console.error(chalk.red(`${err.message}`));
			throw err;
		}

		console.log(chalk.dim.yellow(`Copied package.json`));
	});
}

function successMsg(dirName) {
	console.log(chalk.dim.green(`Created ${dirName}`));
}

function errorMsg(err) {
	console.error(chalk.red(`${err.message}`));
}
