const test = require('tape');
const isStream = require('../lib/is-stream');

test('Is Stream Utility', function(assert){
	{
		let message = 'returns boolean';
		let actual = isStream(process.stdin);
		let expected = true;
		assert.equal(actual, expected, message);
	}

	[null, undefined, 0, ''].forEach(function(value){
		let message = 'returns "false" if passed falsey value';
		let actual = isStream(value);
		let expected = false;
		assert.equal(actual, expected, message);
	});

	[process.stdin, process.stdout].forEach(function(value){
		let message = 'returns "true" if passed a stream';	
		let actual = isStream(value);
		let expected = true;
		assert.equal(actual, expected, message);
	});	

	[['a', 'b', 'c'], { param: true }, 123, 'string'].forEach(function(value){
		let message = 'returns "false" if passed something other than a stream';
		let actual = isStream(value);
		let expected = false;
		assert.equal(actual, expected, message);
	});

	assert.end();
});
