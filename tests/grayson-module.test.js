const fs = require('fs');
const isdir = require('is-dir');
const shell = require('shelljs');

const test = require('tape');
const assertHtml = require('assert-html');
const {teardown} = require('./_fixtures');
const grayson = require('../');

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

		let message = 'Writes an output file to a given a destination for given file';
		let actual = fs.existsSync(__dirname + '/html/hello-world.html');
		let expected = true;

		assert.equal(actual, expected, message);
		teardown();
	}

	{
		grayson({ 
			input: __dirname + '/md', 
			output: __dirname + '/html' 
		});

		let message = 'Writes output files to given a destination for given directory';
		let actual = fs.existsSync(__dirname + '/html/gday-world.html');
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
		let actual = fs.readdirSync(__dirname + '/html').filter(file => file !== '.gitkeep').length; 
		let expected = 3;
		assert.equal(actual, expected, message);
		teardown();
	}

	{
		grayson({ 
			input: __dirname + '/md', 
			output: __dirname + '/html',
			mode: 'slides'
		});

		let message = 'Writes one output file for all input files if "mode" property is "slides"';
		let actual = fs.readdirSync(__dirname + '/html').filter(file => file === '.gitkeep').length; 
		let expected = 1;
		assert.equal(actual, expected, message);
		teardown();
	}

	{
		grayson({ 
			input: __dirname + '/md', 
			output: __dirname + '/html',
			mode: 'blog'
		});

		let message = 'Writes an index.html file if "mode" property is "blog"';
		let actual = fs.existsSync(`${__dirname}/html/index.html`);
		let expected = true;
		assert.equal(actual, expected, message);
		teardown();
	}

	{
		grayson({ 
			input: __dirname + '/md', 
			output: __dirname + '/html',
			mode: 'blog'
		});

		let actual = fs.readFileSync(`${__dirname}/html/index.html`).toString();
		let expected = `<!DOCTYPE html>
		<html lang="en">
			<head>
		<title>Head Element</title>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		
		<meta name="description" content="This is a page">
		<meta name="keywords" content="page, sample">
		<meta name="author" content="None">

		

		
	
		

		<link rel="icon" type="image/png" href="img/favicon.png">
	</head>
			<body>
				<nav><a href="/">Home</a><a href="/gday-world.html">gday world</a><a href="/hello-world.html">hello world</a><a href="/wassup-world.html">wassup world</a></nav>
				
			</body>
		</html>
`;

		assertHtml(assert, actual, expected);	
		teardown();
	}
	assert.end();
});
