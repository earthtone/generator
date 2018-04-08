const test = require('tape');
const template = require('../bin/lib/template');

test('Template', function(assert){

	{
		let message = 'requires config object';
		assert.throws(function(){
			template();
		}, Error, message);
	}

	{
		let message = 'has default meta values';
		let actual = template({ content: {body: '<h1> Hello World</h1>' }});
		assert.ok(actual, message);
	}

	{
		let message = 'returns string';
		let actual = typeof template({ content: { body: '<h2>Hello World</h2>' }});
		let expected = 'string';

		assert.equal(actual, expected, message);
	}

	{
		let message = 'returns HTML';
		let actual = template({ content: { body: '<h3>Hello World</h3>' }}).match(/<!DOCTYPE\shtml>/ig);
		let expected = ['<!DOCTYPE html>'];

		assert.deepEqual(actual, expected, message);
	}

	{
		let message = 'renders head element';
		let actual = template({ content: { body: '<h3>Hello World</h3>' }}).match(/<(\/?)head>/ig);
		let expected = ['<head>', '</head>'];

		assert.deepEqual(actual, expected, message);
	}

	{
		let message = 'renders meta values in head element';
		let actual = template({ 
			meta: {
				author: 'Robert Frost'
			},
			content: { 
				body: '<h3>Hello World</h3>' 
			}
		}).match(/<meta name="author" content="Robert Frost">/ig);
		let expected = ['<meta name="author" content="Robert Frost">'];

		assert.deepEqual(actual, expected, message);
	}

	{
		let message = 'renders content body';
		let actual = template({ content: { body: '<h3>Hello World</h3>' }}).match(/<(\/?)h3>/ig);
		let expected = ['<h3>', '</h3>'];

		assert.deepEqual(actual, expected, message);
	}

	{
		let message = 'renders optional nav list';
		let actual = template({ 
			content: { 
				body: '<h3>Hello World</h3>',
				nav: ['/', 'blah.html', 'cool.html']
			}
		}).match(/<(\/?)nav>/ig);

		let expected = ['<nav>','</nav>'];

		assert.deepEqual(actual, expected, message);
	}

	{
		let message = 'renders optional nav list only if present';
		let actual = template({ 
			content: { 
				body: '<h3>Hello World</h3>' 
			}
		}).match(/<nav>/ig);

		assert.notOk(actual, message);
	}

	assert.end();
});
