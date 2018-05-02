#!/usr/bin/env node

const createProjectDirectories = require('./create-project-directories');
const createOutputDirectories = require('./create-output-directories');


/**
	* Initialize Target Project Directory
	*
	* @function
	* @async
	* @param {Object} options
	* @param {String} options.output - Target Project Directory
	*
	* */

async function initializeProject(options){
	if(!options.output && !options.o){
		throw new Error('No output directory given');
	}

	let opt = Object.assign({ public: 'public', meta: 'meta', markdown: 'markdown'}, options);

	await	createProjectDirectories(opt);
	await	createOutputDirectories(opt);
}

module.exports = initializeProject;
