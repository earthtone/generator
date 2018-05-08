const fs = require('fs');
const shell = require('shelljs');

function setup(){
	shell.cd(__dirname);
	shell.cp(`${__dirname}/_demo.json`, `${__dirname}/package.json`);
}

function teardown(){
	var allHtml = shell.find('.').filter(file => file.match(/\.html$/));

	shell.rm(allHtml);

	if(fs.existsSync(`${__dirname}/hello.md`)){
		shell.rm(`${__dirname}/hello.md`);
	} else if (fs.existsSync(`${process.cwd()}/hello.md`)){
		shell.rm(`${process.cwd()}/hello.md`);	
	}

	if(fs.existsSync(`${__dirname}/package.json`)){
		shell.rm(`${__dirname}/package.json`);
	}
}

exports.setup = setup;
exports.teardown = teardown;
