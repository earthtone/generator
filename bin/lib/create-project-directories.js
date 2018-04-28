const fs = require('fs-extra');
const message = require('./message');


async function createProjectDirectories(root_dir, proj_dirs = ['public', 'meta', 'markdown']){
	var index_page = `${root_dir || '.'}/markdown/index.md`;
	var default_meta = fs.readFileSync(`${__dirname}/_defaults.json`);
	var default_meta_json = `${root_dir || '.'}/meta/defaults.json`;
	var package_json = fs.readFileSync(`${__dirname}/_package.json`);
	var packageExists = fs.existsSync('./package.json');

	await proj_dirs.forEach(dir => {
		let dirName = `${root_dir || '.'}/${dir}`;
		fs.ensureDir(dirName)
			.then(() => message.success(`Created ${__dirname}`))
			.catch(e => message.error(e.message));;
	});

	await fs.writeFile(index_page, '# Hello World', function(err) {
		if(err) throw err;
		console.log(message.success(`Created ${index_page}`));
	});

	await fs.writeFile(default_meta_json, default_meta,  function(err){
		if (err) throw err;
		console.log(message.success(`Created ${default_meta_json}`));
	});

	if(!packageExists){
		await fs.writeFile('package.json', package_json, function(err){
			if(err) throw err;
			console.log(message.success(`Created package.json`));
		});
	}
}

module.exports = createProjectDirectories;
