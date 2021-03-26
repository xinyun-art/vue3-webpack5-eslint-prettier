const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const pxtorem = require('postcss-pxtorem')
const ESLintPlugin = require('eslint-webpack-plugin')

console.log('process.env.NODE_ENV 的值是(webpack.config.js)：' + process.env.NODE_ENV)
module.exports = {
  entry: './src/main.js',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    // publicPath: '/',
    /**
     * 自定义输出文件名
     * 默认情况下，asset/resource 模块以 [hash][ext][query] 文件名发送到输出目录。
     * 可以通过在 webpack 配置中设置 output.assetModuleFilename 来修改此模板字符串：
     */
    assetModuleFilename: 'images/[hash][ext][query]',
  },
  module: {
    rules: [
      /**
       * 由于存在一些浏览器无法使用ES6+的新语法，因此需要转换为ES5。
       * 安装所需依赖：npm install babel-loader @babel/core @babel/preset-env -D
       * 如果不想将配置写在配置文件中，可以在根目录创建babel.config.js或者babelrc.js。
       */
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      /**
       * 处理样式
       * webpack默认只能打包commonJS规范的js文件
       * 处理其他文件都需要相对应的处理器进行处理
       * 安装所需依赖：npm install style-loader css-loader sass-loader node-sass -D
       * 注意：loader的配置有很多能优化的地方
       */
      {
        test: /\.css$/,
        /**
         * 多个loader用数组的形式,顺序是从右往左执行,从下到上
           css-loader 会对 @import 和 url() 进行处理，就像 js 解析 import/require() 一样。
           style-loader将css-loader处理过后的css插入到head标签中的style中
         * 但是这种解析的模式都是将样式放入style标签里嵌入到head标签中,有的时候我们希望直接用link标签引入,
           此时我们就需要一个插件(mini-css-extract-plugin)来实现了。
         */
        // use: ['style-loader', 'css-loader'],
        /**
         * css作为单独文件link引入html文件中
         * 利用mini-css-extract-plugin插件我们就可以将css独立成一个文件
         * style-loader就要换成MiniCssExtractPlugin.loader了。
         * 由于在plugins中配置MiniCssExtractPlugin时做了如此配置--filename: 'css/[name].css'，意思是将css输出到css文件夹下。所以css中背景图片的路径就不对了。
         * 因为图片是配置输出到images文件夹下的，打包时css中就会生成这样的背景图片路径：background:url(images/5bef56995595be3fe2d5.jpg)。
         * 但现在把css文件输出在了css文件夹下，背景图片路径在网页中就成了http://127.0.0.1:5500/dist/css/images/5bef56995595be3fe2d5.jpg，导致路径出错。
         * 之前使用style-loader不会出问题是因为css是直接添加到style标签中然后再挂载到head标签下的，所以css代码和images文件夹在同一级目录下。
         * 因此得在MiniCssExtractPlugin.loader的options里配置 publicPath: '../'，这样打包时就会生成background:url(../images/5bef56995595be3fe2d5.jpg)这种路径，所以最终背景图片在网页中的路径就成了http://127.0.0.1:5500/dist/images/5bef56995595be3fe2d5.jpg。
         */
        // 要使用process.env.NODE_ENV需要到package.json scripts里设置cross-env NODE_ENV=YOURENV，注意cross-env是一个跨平台设置环境变量的第三方包
        use: [
          process.env.NODE_ENV !== 'production'
            ? 'style-loader'
            : { loader: MiniCssExtractPlugin.loader, options: { publicPath: '../' } },
          'css-loader',
        ],
      },
      {
        test: /\.scss$/,
        use: [
          process.env.NODE_ENV !== 'production'
            ? 'style-loader'
            : { loader: MiniCssExtractPlugin.loader, options: { publicPath: '../' } },
          'css-loader',
          'postcss-loader',
          process.env.NODE_ENV !== 'production'
            ? 'sass-loader'
            : {
                loader: 'sass-loader',
                options: {
                  /**
                   * 由于在main.js中引入只能使用variables.scss中的样式，无法使用定义在里面的变量、函数这些，故在此全局引入。
                   * 全局引入就意味着在每一个.scss文件中（包括.vue文件中使用了lang="scss"的style标签中）都会引入variables.scss中的代码。
                   * 这里引入了就不要再main.js中再引入了。
                   */
                  additionalData: `@import "./src/assets/styles/variables.scss";`,
                },
              },
        ],
      },
      {
        test: /\.vue$/,
        use: ['vue-loader'],
      },
      /**
       * 处理图片等静态资源
       * 除js文件的其他文件打包，webpack都需要特定的处理器进行处理
       */

      /**
       * asset/resource： 发送一个单独的文件并导出 URL。之前通过使用 file-loader 实现。
       * 所有图片文件都将被发送到输出目录，并且其路径将被注入到 bundle 中。
       */
      // {
      // 	test: /\.(png|svg|jpg|jpeg|gif)$/i,
      // 	type: 'asset/resource',
      // },

      /**
       * asset/inline： 导出一个资源的 data URI。之前通过使用 url-loader 实现。
       * 所有图片文件都将作为 data URI 注入到 bundle 中。
       */
      // {
      // 	test: /\.(png|svg|jpg|jpeg|gif)$/i,
      // 	type: 'asset/inline',
      // },

      /**
       * asset： 在导出一个 data URI 和发送一个单独的文件之间自动选择。之前通过使用 url-loader，并且配置资源体积限制实现。
       * webpack 将按照默认条件，自动地在 resource 和 inline 之间进行选择：小于 8kb 的文件，将会视为 inline 模块类型，否则会被视为 resource 模块类型。
       * 可以通过在 webpack 配置的 module rule 层级中，设置 Rule.parser.dataUrlCondition.maxSize 选项来修改此条件：
       * parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024 // 4kb
          }
         }
       */
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024, // 4kb
          },
        },
      },
      // {
      // 	test: /\.(mp4|ogg|mp3|wav)$/i,
      // 	use: {
      // 		loader: 'url-loader',
      // 		options: {
      // 			limit: 1024,
      // 			fallback: {
      // 				loader: 'file-loader',
      // 				options: {
      // 					name: '[name].[ext]',
      // 				},
      // 			},
      // 		},
      // 	},
      // },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
      title: 'Vue3-WP-CLI',
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: '[id].css',
    }),
    new VueLoaderPlugin(),
    new ESLintPlugin({
      extensions: ['js', 'vue'],
      /**
       * 自动修复。
       * 自从eslint推出--fix命令后，如果觉得eslint格式化规则已经够用的话，其实也可以不用prettier了。
       * 但此项目中是配置了prettier以及一些与prettier相关的eslint插件的。目的是让prettier用于格式化代码，而eslint只用来检测代码质量。
       * 如果VsCode不下载Prettier-Code formatter插件的话，在保存文件时，
       * prettier只能实现发现不符合格式化规则的地方输出报告（因为使用了eslint-plugin-prettier插件，其实报告本质上也是由eslint输出的），无法自动格式化文件，
       * 一个解决办法就是使用--fix命令（配置下方fix:true），这样就能实现在保存文件时，eslint自动修复不符合规范的地方（由eslint使用prettier的规则去修复）。
       * 但这样我个人觉得不是很好，因为eslint使用--fix命令修复会把整个项目能检测到的文件都修复一遍。
       * 所以我还是推荐使用VsCode插件Prettier-Code formatter，配置保存文件时自动使用prettier格式化。
       */
      // fix: true,
    }),
  ],
  optimization: {
    // minimize: true,
    /**
     * 很扯淡~~，很扯淡~~
     * 生产环境下，webpack5也不用手动显示地配置TerserWebpackPlugin（js压缩插件），webpack5自带了,打包后会自动压缩js代码。
     * 在生产环境下，css代码默认不会被压缩，需要手动安装并配置CssMinimizerPlugin。
     * 但就出现了很扯淡的情况，一旦手动配置了CssMinimizerPlugin，默认的js压缩就失效了，就需要手动配置TerserWebpackPlugin（这个插件不用安装，内置有）。
     * 在开发环境下，js、css默认都不会被压缩，需要手动显式配置，并且需要将上面 optimization.minimize置为true。
     */
    minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
    /**
     * 使用 optimization.splitChunks.cacheGroups 选项，所有的 CSS 可以被提取到一个 CSS 文件中。
     * 但在MiniCssExtractPlugin中配置了filename: 'css/[name].css'后，css也是打包到一个css文件中的，而且这里配置的文件名会覆盖MiniCssExtractPlugin中配置的文件名，这块暂时没搞懂。。。
     */
    // splitChunks: {
    // 	cacheGroups: {
    // 		styles: {
    // 			name: 'styles',
    // 			type: 'css/mini-extract',
    // 			// For webpack@4
    // 			// test: /\.css$/,
    // 			chunks: 'all',
    // 			enforce: true,
    // 		},
    // 	},
    // },
  },
}
