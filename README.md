![Grayson Logo](assets/Grayson-Logo.png)
***HTML Generator***

![ci status](https://travis-ci.org/earthtone/grayson-generator.svg?branch=master)

### Installation

```sh
npm install -g @earthtone/grayson-generator
```

### Usage

```sh
grayson [options]
```

### Options

```
  --help, -h        Output help info
  --version, -v     Output version number

  --input, -i       Source directory or file (defaults to current directory)
  --output, -o      Target directory (defaults to current directory)

  --mode, -m				Generation mode (defaults to "page")
```

Default options and metadata are overwritten by any options or additional metadata available in a project's `package.json` file via the `grayson` node.

```json
{
	"name": "example-project",
	"version": "1.2.0",
	"description": "Example package.json File",
	"main": "index.js",
	"author": "Joe Schmoe",
	"license": "ISC",
	"grayson": {
		"input": "./md",
		"metadata": {
			"stylesheets": [
				"reset.css",
				"debug.css",
				"main.css"	
			],	
			"scripts": [ "bundle.js" ]
		}	
	}
}
```

Additionally, any options passed in via the command-line, overwrite options passed in via `package.json`.

### Modes

#### Pages

Grayson's default mode presumes input will be a directory path to multiple MD files, and will generate one HTML file per MD file in the target directory. If a single MD file is given as input, Grayson will still generate one HTML file per MD file in the given directory. Each HTML file is prepended with a `<nav>` element, hyperlinked to all other generated HTML output.

#### Blog 

If the `--mode` option is set to "blog", an additional `index.html` file will be generated (if none already exists), with a `<nav>` element.

#### Slides

If the `--mode` option is set to "slides", all MD files are concatenated into a single HTML file, housed in individual `.slide` containers. No `<nav>` element is prepended to the generated document.
