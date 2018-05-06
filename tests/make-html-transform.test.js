const test = require('tape');
const concat = require('concat-stream');
const fromString = require('from2-string');
const assertHTML = require('assert-html');
const makeHTML = require('../lib/make-html-transform');

test('Make HTML Transform', function(assert){
	fromString('# Hello, World!')
		.pipe(makeHTML())
		.pipe(concat(function(buf){
			var actual = buf.toString();
			var expected = '<h1 id="hello-world">Hello, World!</h1>';
			assertHTML(assert, actual, expected);
		}));

	fromString('## Hello, Planet!')
		.pipe(makeHTML())
		.pipe(concat(function(buf){
			var actual = buf.toString();
			var expected = '<h2 id="hello-planet">Hello, Planet!</h2>';
			assertHTML(assert, actual, expected);
		}));

	fromString('- this\n- is an\n- unordered\n- list')
		.pipe(makeHTML())
		.pipe(concat(function(buf){
			var actual = buf.toString().replace(/(^\s|\s$|\n|\t)/ig, '');
			var expected = `<ul>
				<li>this</li>
				<li>is an</li>
				<li>unordered</li>
				<li>list</li>
			</ul>`.replace(/(^\s|\s$|\n|\t)/ig, '');
			assertHTML(assert, actual, expected);
		}));

	fromString(':::\nWrapped in Container Block\n:::')
		.pipe(makeHTML())
		.pipe(concat(function(buf){
			var actual = buf.toString();
			var expected = '<div class="md-container">\n<p>Wrapped in Container Block</p>\n</div>'

			assertHTML(assert,actual, expected);
		}));

	fromString(':::warning\nWrapped in Container Block with Custom Class\n:::')
		.pipe(makeHTML())
		.pipe(concat(function(buf){
			var actual = buf.toString();
			var expected = '<div class="warning">\n<p>Wrapped in Container Block with Custom Class</p>\n</div>'

			assertHTML(assert,actual, expected);
		}));

	fromString('# Custom Header {.custom-class}')
		.pipe(makeHTML())
		.pipe(concat(function(buf){
			var actual = buf.toString();
			var expected = '<h1 id="custom-header" class="custom-class">Custom Header</h1>';

			assertHTML(assert,actual, expected);
		}));

	fromString('## Custom Attribute {data-custom=true}')
		.pipe(makeHTML())
		.pipe(concat(function(buf){
			var actual = buf.toString();
			var expected = '<h2 id="custom-attribute" data-custom="true">Custom Attribute</h2>';

			assertHTML(assert,actual, expected);
		}));

	assert.end();
});
