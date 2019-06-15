/* eslint-disable indent */

/**
 * @function
 * @param {Object} meta - Metadata
 * @return {String}
 *
 * */

function headElement (meta) {
  return `<head>
    <title>${meta.title}</title>
    <meta charset="${meta.charset}">
    <meta name="viewport" content="${meta.viewport}">
    
    <meta name="description" content="${meta.description}">
    <meta name="keywords" content="${meta.keywords}">
    <meta name="author" content="${meta.author}">

    ${
      meta.hasOwnProperty('extra')
        ? meta.extra.length ? meta.extra.map(value => `<meta ${value}>`) : ''
        : ''
    }

    ${
      meta.hasOwnProperty('stylesheets')
        ? meta.stylesheets.length
          ? meta.stylesheets
              .map(value => `<link rel="stylesheet" href="${value}">`)
              .join('\n')
          : ''
        : ''
    }
  
    ${
      meta.hasOwnProperty('scripts')
        ? meta.scripts.length
          ? meta.scripts
              .map(value => `<script src="${value}"></script>`)
              .join('\n')
          : ''
        : ''
    }

    <link rel="icon" type="image/png" href="${meta.favicon}">
  </head>`
}

module.exports = headElement
