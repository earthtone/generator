module.exports = function navElement(list = []){
	return `<nav>
		${list.map(link => {
				let textContent = link === '/' ? 'Home' : link
					.slice(link.indexOf('/') + 1, link.indexOf('.'))
					.replace(/-/g, ' ');

				return `<a href="${link}">${textContent}</a>`;
			})
			.join('')}
	</nav>`;
}
