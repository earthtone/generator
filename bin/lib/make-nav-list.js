module.exports = function makeNavList(data = {}){
	return ['/'].concat(Object.keys(data)
		.filter(key => key[0] !== '.')
		.map(key => `/${key.split('.')[0]}.html`));
}
