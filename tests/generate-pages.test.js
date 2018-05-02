const test = require('tape');
const shell = require('shelljs');
const fs = require('fs');

const generatePages = require('../lib/generate-pages');

test('Generate Pages', function(assert) {
	generatePages(setup(5));

	fs.readdirSync(output_dir).forEach(file => {
		let message = 'generates HTML file';
		let actual = file.match(/\.html$/).length;
		let expected = 1;

		assert.equal(actual, expected, message);
	});

	fs.readdirSync(output_dir).forEach((file, i) => {
		let message = 'generates HTML file for each MD file';
		let actual = file.split('.')[0];
		let expected = fs.readdirSync(input_dir)[i].split('.')[0];

		assert.equal(actual, expected, message);
	});

	teardown();
	assert.end();
});

var output_dir = `${__dirname}/public`;
var input_dir = `${__dirname}/markdown`;
var data_dir = `${__dirname}/meta`;

function setup(ln) {
	shell.mkdir('-p', output_dir);
	shell.mkdir('-p', input_dir);
	shell.mkdir('-p', data_dir);
	shell.cp(`${__dirname}/../lib/_defaults.json`, `${data_dir}/default.json`);

	for (let i = 1; i < ln; i++) {
		fs.writeFileSync(`${input_dir}/${i}.md`, `# Hello ${i}`);
	}

	return {
		output: output_dir,
		input: input_dir,
		data: data_dir,
		quiet: true,
	};
}

function teardown() {
	shell.rm('-rf', output_dir);
	shell.rm('-rf', input_dir);
	shell.rm('-rf', data_dir);
}
