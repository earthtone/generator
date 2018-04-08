/* eslint-disable indent */

var default_meta = require('./_defaults.json');
var headElement = require('./head-element');

module.exports = function generatePage(state){
	var { content } = state;
	var meta = Object.assign({}, default_meta, state.meta);
	
	return `<!DOCTYPE html>
		<html lang="${meta.lang}">
			${headElement(meta)}
			<body>
				${content}
			</body>
		</html>`;
};
