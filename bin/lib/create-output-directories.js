const fs = require('fs-extra');
const message = require('./message');

async function createOutputDirectories(root_dir){
	var dirs = ['css', 'img', 'js'];
	var main_css = `${root_dir || '.'}/public/css/main.css`;

	await dirs.forEach(dir => {
		let dirName = `${root_dir || '.'}/public/${dir}`;
		fs.ensureDir(dirName)
			.then(() => console.log(message.success(`Created ${dirName}`)))
			.catch(e => console.error(message.error(e.message)));
	});
}

module.exports = createOutputDirectories;
