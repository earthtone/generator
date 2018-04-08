const test = require('tape');
const makeNavList = require('../bin/lib/make-nav-list');

test('Make Nav List', function(assert){
	{
		let message = 'outputs an array';
		let actual = Array.isArray(makeNavList());
		let expected = true;

		assert.equal(actual, expected, message);
	}

	{
		let message = 'first argument is "/"';
		let actual = makeNavList()[0];
		let expected = '/';

		assert.equal(actual, expected, message);
	}

	{
		let message = 'appends array from keys of given object';
		let actual = makeNavList(setup(3)).length;
		let expected = 3 + 1;

		assert.equal(actual, expected, message);
	}

	{
		let message = 'transforms object keys from ".md" to ".html"';
		let actual = makeNavList(setup(5));
		let expected = ['/', '/1.html', '/2.html', '/3.html', '/4.html', '/5.html'];

		assert.deepEqual(actual, expected, message);
	}

	assert.end();
});


function setup(ln){
	var o = {};

	for(let i = 1; i <= ln; i++){
		o[`${i}.md`] = `# Hello, ${i}!`;
	}

	return o;
}


