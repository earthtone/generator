/* eslint-disable indent */
var defaults = require('./_defaults.json');
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
	var metadata = Object.assign({}, defaults, props.metadata);
	return `<!DOCTYPE html>
		<html lang="${metadata.lang}">
			${headElement(metadata)}
			<body>
				${nav ? navElement(nav) : ''}
				${body}
			</body>
		</html>`;
}

module.exports = pageTemplate;
