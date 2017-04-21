var postcss = require('postcss')
var pc_flex = require('postcss-flexibility')
var map = require('multi-stage-sourcemap')
var path = require('path')

module.exports = function (opts) {
  var options = opts || {}

  return function (style) {
    style = this || style
    var filename = style.options.filename

    style.on('end', function (err, css) {
      // configure the options to be passed to autoprefixer
      var process_opts = {
        from: filename,
        to: path.join(
          path.dirname(filename),
          path.basename(filename, path.extname(filename))
        ) + '.css'
      }

      // if there is a stylus sourcemap, ensure autoprefixer also generates one
      if (style.sourcemap) {
        process_opts.map = { annotation: false }
      }

      var res = postcss([pc_flex(options)]).process(css, process_opts)

      if (res.map && style.sourcemap) {
        var combined_map = map.transfer({
          fromSourceMap: res.map.toString(),
          toSourceMap: style.sourcemap
        });

        // then set the combined result as the new sourcemap
        style.sourcemap = JSON.parse(combined_map);
      }

      return res.css
    })
  }
}