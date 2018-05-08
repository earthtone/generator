const test = require('tape');
const fs = require('fs');
const shell = require('shelljs');

const grayson = `${__dirname}/../cli`;

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
		let actual = fs.readdirSync(`${__dirname}/html`).length;
		let expected = fs.readdirSync(`${__dirname}/md`).length - 1;
		assert.equal(actual, expected, message);
		teardown();
	}

	assert.end();
});

function setup(){
	shell.cd(__dirname);
	shell.cp(`${__dirname}/_demo.json`, `${__dirname}/package.json`);
}

function teardown(){
	var allHtml = shell.find('.').filter(file => file.match(/\.html$/));
	shell.rm(allHtml);

	if(fs.existsSync(`${__dirname}/package.json`)){
		shell.rm(`${__dirname}/package.json`);
	}
}
