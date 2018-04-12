const test = require('tape');

const fs = require('fs');
const path = require('path');
const shell = require('shelljs');

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
	
	teardown();
	assert.end();
});

test('Grayson Gen', function(assert){
	setup('init', function(){
		for(let i = 1; i < 5; i++){
			fs.writeFileSync(`${__dirname}/test_dir/markdown/${i}.md`, `# Hello ${i}`);
		}

		shell.exec(`node ${__dirname}/../bin/grayson-gen.js`);
	});
	
	{
		let message = 'creates `.html` files from `.md` files';
		let actual = fs.existsSync(`${__dirname}/test_dir/public/index.html`);
		let expected = true;

		assert.equal(actual, expected, message);
	}
	
	{
		let message = 'creates `.html` file for *each* `.md` file';
		let actual = Object.keys(fs.readdirSync(`${__dirname}/test_dir/public`)).length;
		let expected = 5 + 3; // 5 generated files + 3 initialized directories

		assert.equal(actual, expected, message);
	}

	teardown();
	assert.end();
});

function setup(command, callback){
	shell.exec(`mkdir -p ${__dirname}/test_dir`);
	shell.cd(`${__dirname}/test_dir`);
	shell.exec(`node ${__dirname}/../bin/grayson-${command}.js`);

	if(callback){
		callback();
	}
}

function teardown(){
	shell.cd(process.pwd);
	shell.rm('-rf', path.join(__dirname, 'test_dir'));
}
