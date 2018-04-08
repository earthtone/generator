const test = require('tape');
const navElement = require('../bin/lib/nav-element');

test('navElement', function(assert){
	{
		let message = 'outputs a string';
		let actual = typeof navElement();
		let expected = 'string';

		assert.equal(actual, expected, message);
	}

	{
		let message = 'removes "/" from text content, but leaves in href if present';
		let actual = /<a href="\/hello.html">hello<\/a>/.test(navElement(['/hello.html']));
		let expected = true;

		assert.equal(actual, expected, message);

		actual = /<a href="hello.html">hello<\/a>/.test(navElement(['hello.html']));
		expected = true;

		assert.equal(actual, expected, message);
	}

	{
		let message = 'removes file extension from text content, but leaves in href';
		let actual = /<a href="\/goodbye.html">goodbye<\/a>/.test(navElement(['/goodbye.html']));
		let expected = true;

		assert.equal(actual, expected, message);
	}

	{
		let message = 'removes "-" from text content, but leaves in href';
		let actual = /<a href="\/hello-world.html">hello world<\/a>/.test(navElement(['/hello-world.html']));
		let expected = true;

		assert.equal(actual, expected, message);
	}

	{
		let message = 'renders "/" as "Home"';
		let actual = /<a href="\/">Home<\/a>/.test(navElement(['/']));
		let expected = true;

		assert.equal(actual, expected, message);
	}

	assert.end();
});
