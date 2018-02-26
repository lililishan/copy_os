/** Modules */
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

/**
 * Envga
 * Get npm lifecycle event to identify the environment
 */
var ENV = process.env.npm_lifecycle_event;
var isTest = ENV === 'test' || ENV === 'test-watch';
var isProd = ENV === 'build' || ENV === 'analyze';;
var isAnalyze = ENV === 'analyze'
/** Root module of our app */
var rootModule = 'Starter';

module.exports = (function makeWebpackConfig() {
  /**
   * Port
   * This is default port for dev server
   */
  var port = 4008;
  // var ip = '192.168.0.213'

  /**
   * Config
   * Reference: http://webpack.github.io/docs/configuration.html
   * This is the object where all configuration gets set
   */
  var config = {};
  config.node = {
    child_process: 'empty',
    fs: 'empty'

  }
  config.resolve = {
    modulesDirectories: ['node_modules', './'],
    alias: {
      'npm': __dirname + '/node_modules'

    },
    extensions: ['', '.js', '.html', '.css', '.styl']
  };
  /**
   * Entry
   * Reference: http://webpack.github.io/docs/configuration.html#entry
   * Should be an empty object if it's generating a test build
   * Karma will set this when it's a test build
   */
  config.entry = isTest ? {} : {
    app: ['babel-polyfill', './src/app.js'],
    vendor: ['angular', 'angular-ui-router', 'angular-drag-and-drop-lists',
      'angular-ivh-treeview', 'angular-tooltips', 'angular-h-sweetalert',
      'angular-sanitize', 'angular-moment-picker',
      'ng-file-upload/dist/ng-file-upload.min', 'echarts/dist/echarts']
  };

  /**
   * Output
   * Reference: http://webpack.github.io/docs/configuration.html#output
   * Should be an empty object if it's generating a test build
   * Karma will handle setting it up for you when it's a test build
   */
  config.output = isTest ? {} : {
    path: __dirname + '/build',  /** Absolute output directory */

    /**
     * Output path from the view of the page
     * Uses webpack-dev-server in development 
     * '+ip+':'
     */
    publicPath: isProd ? '/rmos/' : 'http://localhost:' + port + '/',


    /**
     * Filename for entry points
     * Only adds hash in build mode
     */
    filename: isProd ? '[name].[hash].js' : '[name].bundle.js',

    /**
     * Filename for non-entry points
     * Only adds hash in build mode
     */
    chunkFilename: isProd ? '[name].[hash].js' : '[name].bundle.js'
  };

  /**
   * Devtool
   * Reference: http://webpack.github.io/docs/configuration.html#devtool
   * Type of sourcemap to use per build type
   */
  if (isTest) {
    config.devtool = 'inline-source-map';
  }
  if (isProd) {
    // config.devtool = 'source-map';
  }

  if (!isTest && !isProd) {
    config.devtool = 'eval-source-map';
  }

  /**
   * Loaders
   * Reference: http://webpack.github.io/docs/configuration.html#module-loaders
   * List: http://webpack.github.io/docs/list-of-loaders.html
   * This handles most of the magic responsible for converting modules
   */

  /** Initialize module */
  config.node = {
    child_process: 'empty',
    fs: 'empty'
  }
  config.module = {
    preLoaders: [],
    loaders: [
      {
        test: /\.json/,
        loader: 'json'
      },
      {
        /**
         * JS LOADER
         * Reference: https://github.com/babel/babel-loader
         * Transpile .js files using babel-loader
         * Compiles ES6 and ES7 into ES5 code
         */
        test: /\.js$/,

        loaders: ['ng-annotate?add=true', 'babel'],

        // loaders: ['ng-annotate', 'babel'],
        exclude: /node_modules/
      }, {
        /**
         * CSS LOADER
         * Reference: https://github.com/webpack/css-loader
         * Allow loading css through js
         * Compiles ES6 and ES7 into ES5 code
         *
         * Reference: https://github.com/postcss/postcss-loader
         * Postprocess your css with PostCSS plugins
         */
        test: /\.scss$/,

        /**
         * CSS LOADER
         * Reference: https://github.com/webpack/extract-text-webpack-plugin
         * Extract css files in production builds
         * Compiles ES6 and ES7 into ES5 code
         *
         * Reference: https://github.com/webpack/style-loader
         * Use style-loader in development.
         */
        loader: isTest ? 'null' : ExtractTextPlugin.extract('style', 'css?sourceMap!postcss')
      },
      {
        test: /\.styl$/,
        loader: ExtractTextPlugin.extract(
          'style-loader',
          'css-loader?sourceMap!stylus?sourceMap'
        )

      }, {
        test: /\.css/,
        loader: ExtractTextPlugin.extract(
          'style-loader',
          'css-loader?sourceMap'
        )
      }, {

        /**
         * ASSET LOADER
         * Reference: https://github.com/webpack/file-loader
         * Copy png, jpg, jpeg, gif, svg, woff, woff2, ttf, eot files to output
         * Rename the file using the asset hash
         * Pass along the updated reference to your code
         * You can add here any file extension you want to get copied to your output
         */
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
        loader: 'file'
      }, {

        /**
         * HTML LOADER
         * Reference: https://github.com/webpack/raw-loader
         * Allow loading html through js
         */
        test: /\.html$/i,
        loader: 'html',
        exclude: /node_modules/
      }, {

        /**
         * JADE LOADER
         * Reference: https://github.com/webpack/jade-loader
         * Allow loading jade through js
         */
        include: /\.(pug|jade)/,
        // pass options to pug as a query ('pug-html-loader?pretty')
        loaders: ['html-loader', 'pug-html-loader?exports=false']
      }]
  };

  /**
   * ISPARTA LOADER
   * Reference: https://github.com/ColCh/isparta-instrumenter-loader
   * Instrument JS files with Isparta for subsequent code coverage reporting
   * Skips node_modules and files that end with .spec.js and .e2e.js
   */
  if (isTest) {
    config.module.preLoaders.push({
      test: /\.js$/,
      exclude: [
        /node_modules/,
        /\.spec\.js$/,
        /\.e2e\.js$/
      ],
      loader: 'isparta-instrumenter'
    });
  }

  /**
   * PostCSS
   * Reference: https://github.com/postcss/autoprefixer-core
   * Add vendor prefixes and other operations to your css
   */
  // config.postcss = function (bundler) {
  //   return [
  //     require('postcss-import')({ addDependencyTo: bundler }),
  //     require('postcss-inline-comment')(),
  //     require('postcss-hexrgba'),
  //     require('postcss-size'),
  //     require('precss')(),
  //     require('postcss-functions')({
  //       functions: {}
  //     }),
  //     require('css-mqpacker')(),
  //     require('postcss-discard-comments/build/index')(),
  //     require('autoprefixer')({
  //       browsers: ['last 2 version']
  //     })
  //   ];
  // };

  /**
   * Plugins
   * Reference: http://webpack.github.io/docs/configuration.html#plugins
   * List: http://webpack.github.io/docs/list-of-plugins.html
   */
  config.plugins = [
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
  ];
  config.plugins.push(new webpack.ProvidePlugin({
    "moment": 'moment',
    "window.moment": 'moment'
  }))
  //   new HtmlWebpackPlugin({
  //     favicon: 'src/favicon.png',
  //     title: 'Custom template using Handlebars',
  //     template: 'src/index.jade',
  //     inject: 'body'
  //   }),
  /** Skip rendering index.html in test mode */
  if (!isTest) {

    /**
     * Reference: https://github.com/ampedandwired/html-webpack-plugin
     * Render index.html
     */
    config.plugins.push(
      new HtmlWebpackPlugin({
        // favicon: 'src/so_icon.png',
        template: './src/index.jade',
        inject: 'body'
      }),

      /**
       * Reference: https://github.com/webpack/extract-text-webpack-plugin
       * Extract css files
       * Disabled when in test mode or not in build mode
       */
      new ExtractTextPlugin('[name].[hash].css', { disable: !isProd })
    );
  }

  /** Add build specific plugins */
  if (isProd) {
    config.plugins.push(
      /**
       * Reference: http://webpack.github.io/docs/list-of-plugins.html#noerrorsplugin
       * Only emit files when there are no errors
       */
      new webpack.NoErrorsPlugin(),

      /**
       * 不去加载不用的locale
       * https://github.com/moment/moment/issues/2517
       * 减少200kb
       */
      new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en|zh-cn/),

      /**
       * Reference: http://webpack.github.io/docs/list-of-plugins.html#dedupeplugin
       * Dedupe modules in the output
       */
      new webpack.optimize.DedupePlugin(),

      /**
      * Reference: http://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
      * Minify all javascript, switch loaders to minimizing mode
      */
      new webpack.optimize.UglifyJsPlugin(),

      /**
      * Reference: https://github.com/kevlened/copy-webpack-plugin
      * Copy assets from the public folder
      */
      new CopyWebpackPlugin([{
        from: __dirname + '/src/common/components/chart-map/json/province',
        to: __dirname + '/build/province'
      }]),

      /**
       * https://github.com/lodash/lodash-webpack-plugin
       */
      new LodashModuleReplacementPlugin({
        'collections': true,
        'paths': true
      })

    );
  }

  if (isAnalyze) {
    config.plugins.push(new BundleAnalyzerPlugin())
  }


  /**
   * Dev server configuration
   * Reference: http://webpack.github.io/docs/configuration.html#devserver
   * Reference: http://webpack.github.io/docs/webpack-dev-server.html
   */
  config.devServer = {
    // contentBase: './src/assets',
    contentBase: __dirname + '/src/common/components/chart-map/json',
    stats: 'minimal',
    port: port,
    // host:ip,
    proxy: {
      '/rap/*': {
        target: 'http://192.168.0.30/mockjsdata/33/',
        pathRewrite: {
          '^/rap': ''
        },
        changeOrigin: true,
        secure: false
      },
      '/api/*': {
        target: 'http://front.dev.rmos.com/',
        changeOrigin: true,
        secure: false,
      },
    }
  };

  return config;
})();
