#!/usr/bin/env node
const program = require('commander');
const chalk = require('chalk');
const fs = require('fs-extra');

program
	.parse(process.argv);

var root_dir = program.args;
var proj_dir = ['public', 'meta', 'pages'];
var pub_dir = ['css', 'img', 'js'];

function successMsg(){
	console.log(chalk.dim.green(`Created ${dirName}`));
}

function errorMsg(err){
	console.error(chalk.red(`${err.message}`));
}

proj_dir.forEach(dir => {
	let dirName = `${root_dir || '.'}/${dir}`;

	fs.ensureDir(dirName)
		.then(successMsg)
		.catch(errorMsg);
});

pub_dir.forEach(dir => {
	let dirName = `${root_dir || '.'}/public/${dir}`;
	fs.ensureDir(dirName)
		.then(successMsg)
		.catch(errorMsg);
});

var index_page = `${root_dir || '.'}/pages/index.md`;
fs.writeFile(index_page, '# Hello World!', function(err){
	if(err){
		console.error(chalk.red(`${err.message}`));
		throw err;
	}
	console.log(chalk.dim.yellow(`Created ${index_page}`));
});

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
	extra: []
};

fs.writeFile(index_meta, JSON.stringify(meta_proto), function(err){
	if(err){
		console.error(chalk.red(`${err.message}`));
		throw err;
	}
	console.log(chalk.dim.yellow(`Created ${index_meta}`));
});

var main_css = `${root_dir || '.'}/public/css/main.css`;
fs.writeFile(main_css, '', function(err){
	if(err){
		console.error(chalk.red(`${err.message}`));
		throw err;
	}
	console.log(chalk.dim.yellow(`Created ${main_css}`));
});

// console.log(chalk.bold.green('Done!'));
