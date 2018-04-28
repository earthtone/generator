const chalk = require('chalk');

/*
 * 	Log Messages with Colors	
 *
 *	@function
 *	@param {String} message
 *	@return {String} 
 *
 * **/

function success(message){
	return chalk.dim.green(message);
}

function error(message){
	return chalk.red(message);
}

function warning(message){
	return chalk.dim.yellow(message);
}

function info(message){
	return chalk.dim.cyan(message);
}

exports.success = success;
exports.error = error;
exports.warning = warning;
exports.info = info;
