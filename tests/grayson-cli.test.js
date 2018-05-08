const test = require('tape');
const fs = require('fs');
const shell = require('shelljs');

const grayson = `${__dirname}/../cli`;
const { setup,teardown } = require('./_fixtures');

test('Grayson CLI', function(assert){
	{
		fs.writeFileSync('hello.md', '# Hello Filesystem');
		shell.exec(`node ${grayson}`);
		let message = 'defaults input/output to pwd';
		let actual = fs.existsSync('./hello.html');
		let expected = true;
		assert.equal(actual, expected, message);
		teardown();
	}

	{
		setup();
		shell.exec(`node ${grayson} `);
		let message = 'accepts config from package.json';
		let actual = fs.existsSync(`${__dirname}/hello-world.html`);
		let expected = true;
		assert.equal(actual, expected, message);
		teardown();
	}

	{
		setup();
		shell.exec(`node ${grayson} --output ${__dirname}/html`);
		let message =	'accepts command line arguments';
		let actual = fs.readdirSync(`${__dirname}/html`).filter(file => file !== '.gitkeep').length;
		let expected = fs.readdirSync(`${__dirname}/md`).length - 1;
		assert.equal(actual, expected, message);
		teardown();
	}

	assert.end();
});

