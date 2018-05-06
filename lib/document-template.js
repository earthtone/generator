/* eslint-disable indent */

var default_meta = require('./_defaults.json');
var headElement = require('./document-head');
var navElement = require('./document-nav');

/**
 *	HTML Page Template
 *
 *	@function
 *	@param {Object} props
 *	@param {Object} props.content - HTML Content
 *	@param {String} props.content.body - Body Content
 *	@param {String} props.content.nav - Nav Content
 *
 * */

function pageTemplate(props) {
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
}

module.exports = pageTemplate;
