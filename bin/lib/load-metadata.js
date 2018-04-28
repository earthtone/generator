const fs = require('fs-extra');
const message = require('./message');

function loadMetadata(metaPath){
	var meta = {};

	try {
		console.log(message.warning('Loading pages metadata...'));
		for(let pageMeta of fs.readdirSync(metaPath)){
			console.log(message.info(`Loading ${pageMeta}`));
			meta[pageMeta] = fs.readFileSync(`${metaPath}/${pageMeta}`, 'utf-8');
		}

		return meta;
	} catch(err) {
		console.log(message.error(`Error during metadata loading: ${err.message}`));
		process.exit(1);
	}
}

module.exports = loadMetadata;
