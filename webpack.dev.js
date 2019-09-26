const common = require('./webpack.common.js')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const Autoprefixer = require('autoprefixer')

module.exports = merge(common, {

  entry: {
    mocha_tests: './test/test.spec.js' // Mocha browser test script
  },
  node: {
    // Mocha: suppress error "Can't resolve 'fs'"
    // https://github.com/webpack-contrib/css-loader/issues/447#issuecomment-285603267
    fs: 'empty'
  },
  watch: true, // watch for changes in any of the resolved files
  devServer: {
    open: true, // Tells dev-server to open the browser after server had been started
    overlay: true, // Shows a full-screen overlay with errors or warnings
    hot: false // update changes without full refresh in the browser
  },
  watchOptions: {
    ignored: /node_modules/,
    aggregateTimeout: 1200 // Add a delay before rebuilding once the first file changed
  },
  mode: 'development', // Stop minify webpack JS bundle
  devtool: 'none', // Simplify outputted bundle code for reader when development
  plugins: [
    new HtmlWebpackPlugin({ // Generate a file dist/index.html
      template: './src/index.html', // Use html source
      filename: './index.html' // Output html file into ./dist
    })
  ],
  module: {
    // Suppress warning from mocha: "Critical dependency: the request of a dependency is an expression"
    // @see https://webpack.js.org/configuration/module/#module-contexts
    exprContextCritical: false,
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'eslint-loader',
        options: {
          // eslint options (if necessary)
        }
      },
      {
        test: /\.(scss|css)$/, // allow scss and css
        use: [
          {
            loader: 'style-loader', // 4. Inject CSS into the DOM
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'css-loader', // 3. Turns CSS into CommonJS
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader', // 2. Process CSS with PostCSS
            options: {
              ident: 'postcss', // Parse CSS and add vendor prefixes
              plugins: [
                new Autoprefixer({
                  grid: false, // Activate CSS Grid polyfill (IE 10-11)
                  overrideBrowserslist: ['> 1%', 'last 2 versions']
                })
              ]
            }
          },
          {
            loader: 'sass-loader', // 1. Turns sass into css
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  }
})
