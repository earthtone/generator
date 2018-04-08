/* eslint-disable indent */

var default_meta = require('./_defaults.json');
var headElement = require('./head-element');
var navElement = require('./nav-element');

module.exports = function generatePage(props){
	var { body, nav } = props.content;
	var meta = Object.assign({}, default_meta, props.meta);
	
	return `<!DOCTYPE html>
		<html lang="${meta.lang}">
			${headElement(meta)}
			<body>
				${nav ? navElement(nav) : ''}
				${body}
			</body>
		</html>`;
};
