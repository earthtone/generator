/**
 * Nav Element
 *
 * @function
 * @param {Array} list - List of HTML Files
 * @return {String}
 *
 * */
function navElement(list = []) {
	return `<nav>${list.map(link => {
		let textContent = link === '/' ? 'Home' : link.slice(link.indexOf('/') + 1, link.indexOf('.')).replace(/(-|_)/g, ' ');
		return `<a href="${link}">${textContent}</a>`;
	}).join('')}</nav>`;
}

module.exports = navElement;
