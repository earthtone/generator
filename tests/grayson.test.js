const fs = require('fs');
const isdir = require('is-dir');
const shell = require('shelljs');

const test = require('tape');
const grayson = require('../lib/grayson');

test('Grayson Input', function(assert){
	{
		let message = 'Accepts an MD file and returns a string';
		let actual = typeof grayson({ input: __dirname + '/md/hello-world.md'});
		let expected = 'string';

		assert.equal(actual, expected, message);
	}

	{
		let message = 'Accepts an array (file directory) and returns an array';
		let actual = Array.isArray(grayson({
			input: __dirname + '/md'	
		}));
		let expected = true;

		assert.equal(actual, expected, message);
	}

	{
		grayson({ input: __dirname + '/md' }).forEach(function(item){
			let message = 'Accepts an array (file directory) and returns an array of strings';
			let actual = typeof item;
			let expected = 'string';

			assert.equal(actual, expected, message);
		});
	}

	{
		let message = 'Ignores files without ".md" or ".markdown" extension';
		let actual = grayson({ input: __dirname + '/md' }).length;
		let expected = 3; 

		assert.equal(actual, expected, message);
	}

	assert.end();
});

test('Grayson Output', function(assert) {
	{
		grayson({ 
			input: __dirname + '/md/hello-world.md', 
			output: __dirname + '/html' 
		});

		let message = 'Writes an output file to given a destination for given file';
		let actual = fs.existsSync(__dirname + '/html/hello-world.html');
		let expected = true;

		assert.equal(actual, expected, message + ' for given file');
		teardown();
	}

	{
		grayson({ 
			input: __dirname + '/md', 
			output: __dirname + '/html' 
		});

		let message = 'Writes output files to given a destination for given directory';
		let actual = fs.existsSync(__dirname + '/html/index.html');
		let expected = true;
		assert.equal(actual, expected, message);

		actual = fs.existsSync(__dirname + '/html/wassup-world.html');
		expected = true;
		assert.equal(actual, expected, message);
		teardown();
	}

	{
		grayson({ 
			input: __dirname + '/md', 
			output: __dirname + '/html' 
		});

		let message = 'Writes one output file per input file';
		let actual = fs.readdirSync(__dirname + '/html').length; 
		let expected = 3;
		assert.equal(actual, expected, message);
		teardown();
	}

	{
		grayson({ 
			input: __dirname + '/md', 
			output: __dirname + '/html',
			slides: true
		});

		let message = 'Writes one output file for all input files if given slide option';
		let actual = fs.readdirSync(__dirname + '/html').length; 
		let expected = 1;
		assert.equal(actual, expected, message);
		teardown();
	}
	assert.end();
});

function teardown(){
	shell.rm('-rf', `${__dirname}/html/*`);
}
