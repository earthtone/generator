![Grayson Logo](assets/Grayson-Logo.png)
***Static Site Generator***

### Installation
```
npm install -g @earthtone/grayson-generator
```

### Usage

Scaffold project directory structure

```
grayson init [project-directory]

```

![sample output](assets/output.png)

Generate HTML files from MD & JSON files

```
grayson gen <project-directory> [output-directory] [pages-directory] [meta-directory]

```

Traverses `pages` directory and `meta` directory for files. Both the source directories and output directories are configurable, but generation defaults to an assumed structure generated during `grayson init`. If no page specific metadata is provided, default values are used. 

EG: The files `/pages/index.md` & `/meta/index.json` yield an `index.html` file output in the `/public` directory. 
