module.exports = function makeNavList(data = {}){
	return ['/'].concat(Object.keys(data).map(key => `/${key.split('.')[0]}.html`));
}
