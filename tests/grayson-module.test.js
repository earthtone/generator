const fs = require('fs')
const path = require('path')

const test = require('ava')
const { teardown } = require('./_fixtures')
const grayson = require('../')

test('Grayson Input', function (assert) {
  {
    let message = 'Accepts an MD file and returns a string'
    let actual = grayson({ input: path.resolve(__dirname, 'md/hello-world.md') })
    let expected = 'string'

    assert.is(typeof actual, expected, message)
  }

  {
    let message = 'Accepts an array (file directory) and returns an array'
    let actual = Array.isArray(grayson({
      input: path.resolve(__dirname, 'md')
    }))
    let expected = true

    assert.is(actual, expected, message)
  }

  grayson({ input: path.resolve(__dirname, 'md') }).forEach(function (item) {
    let message = 'Accepts an array (file directory) and returns an array of strings'
    let actual = typeof item
    let expected = 'string'

    assert.is(actual, expected, message)
  })

  {
    let message = 'Ignores files without ".md" or ".markdown" extension'
    let actual = grayson({ input: path.resolve(__dirname, 'md') }).length
    let expected = 3

    assert.is(actual, expected, message)
  }
})

test('Grayson Output', function (assert) {
  {
    grayson({
      input: path.resolve(__dirname, 'md/hello-world.md'),
      output: path.resolve(__dirname, 'html')
    })

    let message = 'Writes an output file to a given a destination for given file'
    let actual = fs.existsSync(path.resolve(__dirname, 'html/hello-world.html'))
    let expected = true

    assert.is(actual, expected, message)
    teardown()
  }

  {
    grayson({
      input: path.resolve(__dirname, 'md'),
      output: path.resolve(__dirname, 'html')
    })

    let message = 'Writes output files to given a destination for given directory'
    let actual = fs.existsSync(path.resolve(__dirname, 'html/gday-world.html'))
    let expected = true
    assert.is(actual, expected, message)

    actual = fs.existsSync(path.resolve(__dirname, 'html/wassup-world.html'))
    expected = true
    assert.is(actual, expected, message)
    teardown()
  }

  {
    grayson({
      input: path.resolve(__dirname, 'md'),
      output: path.resolve(__dirname, 'html')
    })

    let message = 'Writes one output file per input file'
    let actual = fs.readdirSync(path.resolve(__dirname, 'html')).filter(file => file !== '.gitkeep').length
    let expected = 3
    assert.is(actual, expected, message)
    teardown()
  }

  {
    grayson({
      input: path.resolve(__dirname, 'md'),
      output: path.resolve(__dirname, 'html'),
      mode: 'slides'
    })

    let message = 'Writes one output file for all input files if "mode" property is "slides"'
    let actual = fs.readdirSync(path.resolve(__dirname, 'html')).filter(file => file === '.gitkeep').length
    let expected = 1
    assert.is(actual, expected, message)
    teardown()
  }

  {
    grayson({
      input: path.resolve(__dirname, 'md'),
      output: path.resolve(__dirname, 'html'),
      mode: 'blog'
    })

    let message = 'Writes an index.html file if "mode" property is "blog"'
    let actual = fs.existsSync(`${__dirname}/html/index.html`)
    let expected = true
    assert.is(actual, expected, message)
    teardown()
  }

  {
    grayson({
      input: path.resolve(__dirname, 'md'),
      output: path.resolve(__dirname, 'html'),
      mode: 'blog'
    })

    let actual = fs.readFileSync(`${__dirname}/html/index.html`).toString()

    assert.snapshot(actual)
    teardown()
  }
})
