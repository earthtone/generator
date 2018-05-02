const test = require('tape');
const ReadStream = require('read-stream');
const concat = require('concat-stream');

const makeHTML = require('../lib/make-html');

test('Make HTML', function(assert){
	var stream = ReadStream(function onread(push){
		push('# Hello World');	
		push(null);
	});

	stream.pipe(makeHTML()).pipe(concat(function(buff){
		{
			let message = 'returns a string';
			let actual = typeof buff;
			let expected = 'string';

			assert.equal(typeof actual, expected, message);
		}

		{
			let message = 'returns an HTML string';
			let actual = buff.toString().trim();
			let expected = '<h1 id="hello-world">Hello World</h1>';
			assert.equal(actual, expected, message);
		}

		assert.end();
	}));
});
