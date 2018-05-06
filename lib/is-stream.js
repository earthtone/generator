/**
	* @function
	* @param {Object} maybe - Object to be evaluated
	* @returns {Boolean}
	*
	* */
function isStream(maybe){
	return !!maybe && typeof maybe === 'object' && typeof maybe.pipe === 'function';
}

module.exports = isStream;
