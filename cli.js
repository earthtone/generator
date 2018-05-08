#!/usr/bin/env node
const fs = require('fs');
const grayson = require('./lib/grayson');

const defaults = require('./lib/_defaults.json');
const argv = require('minimist')(process.argv.slice(2));
const pkg = fs.existsSync(`${process.cwd()}/package.json`) 
	? require(`${process.cwd()}/package.json`).grayson 
		? require(`${process.cwd()}/package.json`).grayson 
		: {}
	: {};

const metadata = Object.assign({}, defaults, pkg.metadata);
const options = Object.assign({	input: process.cwd(), output: process.cwd()  }, pkg, argv, { metadata });

grayson(options);
