/**
 *	Make List of Navigation Data
 *
 *	@function
 *	@param {Object} data - Key/Value Pairs
 * @return {Array.<String>} - list of HTML files
 *
 * */
function makeNavList(data = {}) {
	return ['/'].concat(
		Object.keys(data)
			.filter(key => key[0] !== '.')
			.map(key => `/${key.split('.')[0]}.html`),
	);
}

module.exports = makeNavList;
