var fs = require('fs')
var path = require('path')
var stylus = require('stylus')
var flex = require('./../index')
var css = require('css')
var chai = require('chai')
var expect = chai.expect

function tryFile(name, done) {
  var expected_ast = css.parse(fs.readFileSync(path.resolve(__dirname, 'example/' + name + '.css'), 'utf-8'))
  var expected = css.stringify(expected_ast)
  stylus(fs.readFileSync(path.resolve(__dirname, 'example/' + name + '.styl'), 'utf-8'))
    .use(flex())
    .render(function (err, res) {
      if (err) return done(err)
      var generated = css.stringify(css.parse(res))
      expect(generated).to.equal(expected)
      done()
    })
}

describe('basic', function () {
  it('works', function (done) {
    tryFile('basic', done)
  })
})

describe('exclude', function () {
  it('works', function (done) {
    tryFile('exclude-rule', done)
  })
})