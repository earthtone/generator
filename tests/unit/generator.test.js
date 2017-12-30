const test = require('tape');
const generator = require('../../lib/template');

test('Generator Takes Config Object', function(assert){
	assert.throws(function(){
		generator();
	});
	
	assert.end();
});

test('Generator has Default Meta Values', function(assert){
	var actual = generator({
		content: '<h1>Hello World</h1>'
	});

	assert.ok(actual);
	assert.end();
});

test('Generator Returns String', function(assert){
	var actual = generator({
		content: '<h2>Hello World</h2>'
	});

	assert.equal(typeof actual, 'string');
	assert.end();
});

test('Generator Returns HTML', function(assert){
	var actual = generator({
		content: '<h3>Hello World</h3>'
	});

	assert.ok(actual.match(/\<\!DOCTYPE\shtml\>/ig));
	assert.end();
});
