module.exports = function navElement(list){
	return `<nav>
		${list.map(link => `<a href="${link}">${link.split('.')[0]}</a>`).join('')}
	</nav>`;
}
