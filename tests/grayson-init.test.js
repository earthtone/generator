const fs = require('fs');
const test = require('tape');
const { setup, teardown } = require('./fixtures');

test('Grayson Init', function(assert){
	setup('init');

	{
		let message = 'creates `meta` directory';
		let actual = fs.existsSync(`${__dirname}/test_dir/meta`);
		let expected = true;

		assert.equal(actual, expected, message);
	}

	{
		let message = 'creates `markdown` directory';
		let actual = fs.existsSync(`${__dirname}/test_dir/markdown`);
		let expected = true;

		assert.equal(actual, expected, message);
	}

	{
		let message = 'creates `public` directory';
		let actual = fs.existsSync(`${__dirname}/test_dir/public`);
		let expected = true;

		assert.equal(actual, expected, message);
	}

	{
		let message = 'creates `package.json` file';
		let actual = fs.existsSync(`${__dirname}/test_dir/package.json`);
		let expected = true;
		
		assert.equal(actual, expected, message);
	}

	{
		let message = 'creates `meta/defaults.json` file';
		let actual = fs.existsSync(`${__dirname}/test_dir/meta/defaults.json`);
		let expected = true;

		assert.equal(actual, expected, message);
	}
	
	{
		let message = 'creates `public/css/main.css` file';
		let actual = fs.existsSync(`${__dirname}/test_dir/public/css/main.css`);
		let expected = true;

		assert.equal(actual, expected, message);
	}
	teardown();
	assert.end();
});
