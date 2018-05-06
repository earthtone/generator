const test = require('tape');
const headElement = require('../lib/document-head');
const data = require('../lib/_defaults.json');

test('Head Element', function(assert){
	{
		let message = 'outputs a string';
		let actual = typeof headElement(data);
		let expected = 'string';

		assert.equal(actual, expected, message);
	}

	{
		let message = 'interpolates data';
		let	actual = headElement(Object.assign(data, { title: 'Head Element' })).match(/<title>Head Element<\/title>/ig);
		let expected = ['<title>Head Element</title>'];
		assert.deepEqual(actual, expected, message);
	}

	assert.end();
});
