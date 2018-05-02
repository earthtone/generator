![Grayson Logo](assets/Grayson-Logo.png)
***HTML Generator***

![ci status](https://travis-ci.org/earthtone/grayson-generator.svg?branch=master)

### Installation
```
npm install -g @earthtone/grayson-generator
```

### Usage

Scaffold project directory structure (defaults to present working directory).

```
grayson ini [target directory]t

```

![sample output](assets/output.png)

Generate HTML from MD & JSON files.

```
grayson html <source directory> [options]

```

### Options

```

  --help, -h        Output help info
  --version, -v     Output version number
  --quiet, -q       Mute console output

  --input, -i       Source directory (defaults to first argument)
  --output, -o      Target directory (defaults to current directory)

  --pages, -p       Generate 1 HTML file per MD file (*default*)
  --slides, -s      Geneate 1 HTML file for all MD files

```

Traverses `markdown` directory and `meta` directory for files. Both the source directories and output directories are configurable, but generation defaults to an assumed structure generated during `grayson init`. If no page specific metadata is provided, default values are used. 

EG: The files `/markdown/index.md` & `/meta/index.json` yield an `index.html` file output in the `/public` directory. Properties given in `/meta/index.json` overwrite any existing defaults.
