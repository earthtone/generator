#!/usr/bin/env node
const createProjectDirectories = require('./lib/create-project-directories');
const createOutputDirectories = require('./lib/create-output-directories');

createProjectDirectories(process.cwd());
createOutputDirectories(process.cwd());

