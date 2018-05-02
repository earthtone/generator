const shell = require('shelljs');
var output = `${__dirname}/test_dir`;

exports.setup = function(options) {
	shell.mkdir('-p', output);
	return Object.assign({
		output,
		data: `${output}/meta`,
		public: 'public',
		meta: 'meta',
		markdown: 'markdown',
		quiet: true,
	}, options);
};

exports.teardown = function() {
	shell.rm('-rf', output);
};
