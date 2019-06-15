const MarkdownIt = require('markdown-it')
const hljs = require('highlight.js')
const attrs = require('markdown-it-attrs')
const containers = require('markdown-it-container')
const namedHeadings = require('markdown-it-named-headings')

module.exports = MarkdownIt({
  html: true,
  highlight: function (s, l) {
    return l && hljs.getLanguage(l) ? hljs.highlight(l, s).value : ''
  }
})
  .use(attrs)
  .use(namedHeadings)
  .use(containers, 'block', {
    validate: function () { return true },
    render: function ([...tokens], idx) {
      if (tokens[idx].type === 'container_block_open') {
        let className = tokens[idx].info.trim() || 'md-container'
        return `<${tokens[idx].tag} class="${className}">\n`
      } else if (tokens[idx].type === 'container_block_close') {
        return `</${tokens[idx].tag}>\n`
      }
    }
  })
