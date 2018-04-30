const path = require('path');
const shell = require('shelljs');

function setup(command, callback){
	shell.exec(`mkdir -p ${__dirname}/test_dir`);
	shell.cd(`${__dirname}/test_dir`);
	shell.exec(`node ${__dirname}/../bin/grayson-${command}.js`);

	if(callback){
		callback();
	}
}

function teardown(){
	shell.cd(process.pwd);
	shell.rm('-rf', path.join(__dirname, 'test_dir'));
}

exports.setup = setup;
exports.teardown = teardown;
