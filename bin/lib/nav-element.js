module.exports = function navElement(list = []){
	return `<nav>
		${list.map(link => `<a href="${link}">${link.slice(link.indexOf('/') + 1, link.indexOf('.')).replace(/-/g, ' ')}</a>`).join('')}
	</nav>`;
}
