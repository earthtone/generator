const shell = require('shelljs');
const fs = require('fs');
const test = require('tape');
const loadPages = require('../lib/load-pages');

test('Load Pages', function(assert){
	{
		let message = 'collects MD from a given directory';
		let actual = Object.keys(loadPages(setup(5))).length;
		let expected = 5;
		assert.equal(actual, expected, message);
	}

	{
		let message = 'returns an object';
		let actual = typeof (loadPages(setup(3)));
		let expected = 'object';
		assert.equal(actual, expected, message);
	}

	teardown();
	assert.end();
});

function setup(ln){
	shell.mkdir('-p', `${__dirname}/test_dir/markdown`);

	for(let i = 1; i <= ln; i++){
		fs.writeFileSync(`${__dirname}/test_dir/markdown/${i}.md`, `# Hello ${i}`);	
	}

	return { input: `${__dirname}/test_dir/markdown`, quiet: true };
}

function teardown(){
	shell.rm('-rf', `${__dirname}/test_dir`);
}
