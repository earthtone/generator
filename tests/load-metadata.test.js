const test = require('tape');
const shell = require('shelljs');
const fs = require('fs');
const nanoid = require('nanoid');
const loadMeta = require('../lib/load-metadata');

test('Load Metadata', function(assert){
	{
		let message = 'collects data from a directory of json files';
		let actual = Object.keys(loadMeta(setup(5))).length;
		let expected = 5;
		assert.equal(actual, expected, message);
	}

	{
		let message = 'returns an object';
		let actual = typeof (loadMeta(setup(3)));
		let expected = 'object';
		assert.equal(actual, expected, message);
	}

	teardown();
	assert.end();
});

function setup(ln){
	shell.mkdir('-p', `${__dirname}/test_dir/meta`);

	for(let i = 1; i <= ln; i++){
		fs.writeFileSync(`${__dirname}/test_dir/meta/${i}.json`, JSON.stringify({ id: nanoid() }));	
	}

	return { data: `${__dirname}/test_dir/meta`, quiet: true };
}

function teardown(){
	shell.rm('-rf', `${__dirname}/test_dir`);
}
