#!/usr/bin/env node
const program = require('commander');
const chalk = require('chalk');
const fs = require('fs-extra');
const path = require('path');

var root_dir = process.cwd();
var proj_dir = ['public', 'meta', 'markdown'];
var pub_dir = ['css', 'img', 'js'];

var index_page = `${root_dir || '.'}/markdown/index.md`;
var index_meta = `${root_dir || '.'}/meta/index.json`;
var meta_proto = {
	lang: 'en',
	title: 'Index',
	stylesheets: ['index.css'],
	charset: 'utf-8',
	description: '',
	keywords: '',
	author: '',
	favicon: './img/favicon.png',
	viewport: 'width=device-width, initial-scale=1',
	extra: [],
};

var main_css = `${root_dir || '.'}/public/css/main.css`;
var package_json = fs.readFileSync(`${__dirname}/lib/sample-package.json`);

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

fs.writeFile(index_meta, JSON.stringify(meta_proto), function(err) {
	if (err) {
		console.error(chalk.red(`${err.message}`));
		throw err;
	}
	console.log(chalk.dim.yellow(`Created ${index_meta}`));
});

fs.writeFile(main_css, '', function(err) {
	if (err) {
		console.error(chalk.red(`${err.message}`));
		throw err;
	}
	console.log(chalk.dim.yellow(`Created ${main_css}`));
});

path.exists('package.json', function(exists){
	if(!exists){
		fs.writeFile('package.json', package_json, function(err){
			if(err){
				console.error(chalk.red(`${err.message}`));
				throw err;
			}

			console.log(chalk.dim.yellow(`Copied package.json`));
		});
	}
});

function successMsg(dirName) {
	console.log(chalk.dim.green(`Created ${dirName}`));
}

function errorMsg(err) {
	console.error(chalk.red(`${err.message}`));
}
