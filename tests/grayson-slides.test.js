const fs = require('fs');
const shell = require('shelljs');
const test = require('tape');

const { setup, teardown } = require('./fixtures');

test('Grayson Slides', function(assert){
	setup('init', function(){
		for(let i = 1; i < 5; i++){
			fs.writeFileSync(`${__dirname}/test_dir/markdown/${i}.md`, `# Hello ${i}`);
		}

		shell.exec(`node ${__dirname}/../bin/grayson-slides.js`);
	});
	
	{
		let message = 'creates one `.html` files from multiple `.md` files';
		let actual = fs.existsSync(`${__dirname}/test_dir/public/slides.html`);
		let expected = true;

		assert.equal(actual, expected, message);
	}
	
	{
		let message = 'does not create `.html` file for *each* `.md` file';
		let actual =fs.readdirSync(`${__dirname}/test_dir/public`).filter(key => key.match(/\.html/)).length;
		let expected = 1; 

		assert.equal(actual, expected, message);
	}

	teardown();
	assert.end();
});
