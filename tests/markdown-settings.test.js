const test = require('ava')
const md = require('../lib/markdown-settings')

test('Markdown Settings', function (assert) {
  {
    let message = 'allows HTML container elements'
    let actual = md.render(md.render(`:::\n*here be dragons*\n:::`)).trim()
    let expected = `<div class="md-container">
<p><em>here be dragons</em></p>
</div>`

    assert.is(actual, expected, message)
  }

  {
    let message = 'allows HTML container elements with optional classes'
    let actual = /class="warning"/.test(md.render(md.render(`:::warning \n*here be dragons*\n:::`)).trim())
    let expected = true
    assert.is(actual, expected, message)
  }

  {
    let message = 'allow adding custom classes'
    let expected = '<h2 class="title" id="hello-world">Hello World</h2>'
    let actual = md.render('## Hello World {.title}').trim()
    assert.is(actual, expected, message)
  }

  {
    let message = 'allow adding custom attributes'
    let expected = '<h2 rel="title" id="hello-world">Hello World</h2>'
    let actual = md.render('## Hello World {rel=title}').trim()
    assert.is(actual, expected, message)
  }
  {
    let message = 'allow adding custom attributes with spaces'
    let expected = '<h2 rel="title with space" id="hello-world">Hello World</h2>'
    let actual = md.render('## Hello World {rel="title with space"}').trim()
    assert.is(actual, expected, message)
  }
})
