/* eslint-disable indent */

var default_meta = require('./default-metadata.json');

module.exports = function generatePage(state){
	var { content } = state;
	var meta = Object.assign({}, default_meta, state.meta);
	
	return `<!DOCTYPE html>
		<html lang="${meta.lang}">
			<head>
				<title>${meta.title}</title>
				<meta charset="${meta.charset}">
				<meta name="viewport" content="${meta.viewport}">
				<meta name="description" content="${meta.description}">
				<meta name="keywords" content="${meta.keywords}">
				<meta name="author" content="${meta.author}">
				${
					meta.hasOwnProperty('extra')
						?meta.extra.length
							? meta.extra.map(value => `<meta ${value}>`)
							: ''
						:''
				}
				<meta name="description" content="${meta.description}">
				${
					meta.hasOwnProperty('stylesheets')
						?meta.stylesheets.length
							?meta.stylesheets.map(value => `<link rel="stylesheet" href="${value}">`).join('\n')
							: ''
						: ''
				}
				<link rel="icon" type="image/png" href="${meta.favicon}">
			</head>
			<body>
				${content}
				
				${
					meta.hasOwnProperty('scripts')
						?meta.scripts.length
							?meta.scripts.map(value => `<script src="${value}"></script>`).join('\n')
							: ''
						: ''
				}
			</body>
		</html>`;
};
