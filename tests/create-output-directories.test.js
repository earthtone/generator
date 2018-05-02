const fs = require('fs');
const test = require('tape');
const { setup, teardown } = require('./_fixtures');

const createProjectDirectories = require('../lib/create-project-directories');
const createOutputDirectories = require('../lib/create-output-directories');

test('Create Project Directories', async function(assert) {
	await createProjectDirectories(setup());
	await createOutputDirectories(setup());

	{
		let message = 'creates `public/css` directory';
		let actual = fs.existsSync(`${__dirname}/test_dir/public/css`);
		let expected = true;

		assert.equal(actual, expected, message);
	}

	{
		let message = 'creates `public/js` directory';
		let actual = fs.existsSync(`${__dirname}/test_dir/public/js`);
		let expected = true;

		assert.equal(actual, expected, message);
	}

	{
		let message = 'creates `public/img` directory';
		let actual = fs.existsSync(`${__dirname}/test_dir/public/img`);
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
