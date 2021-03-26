const { merge } = require('webpack-merge')
const common = require('./wp.common')

module.exports = merge(common, {
	mode: 'development',
	/**
	 * 每个模块使用 eval() 执行，并且 source map 转换为 DataUrl 后添加到 eval() 中。初始化 source map 时比较慢，但是会在重新构建时提供比较快的速度，并且生 成实际的文件。行数能够正确映射，因为会映射到原始代码中。它会生成用于开发环境的最佳品质的 source map。
	 */
	devtool: 'eval-source-map',
	/**
	 * webpack-dev-server 为你提供了一个简单的 web server，并且具有 live reloading(实时重新加载) 功能
	 * 告知 dev server，从什么位置查找文件
	 * 以下配置告知 webpack-dev-server，将 dist 目录下的文件 serve 到 localhost:8080（默认，可配置）下。
	 * webpack-dev-server 在编译之后不会写入到任何输出文件。而是将 bundle 文件保留在内存中，然后将它们 serve 到 server 中，就好像它们是挂载在 server 根路径上的真实文件一样。如果你的页面希望在其他不同路径中找到 bundle 文件，则可以通过 dev server 配置中的 publicPath 选项进行修改。
	 * 我们在package.json中添加一个可以直接运行 dev server 的 script： "start": "webpack serve --open"
	 */
	devServer: {
		contentBase: './dist',
		hot: true, // 启用 webpack 的 Hot Module Replacement 功能
		// hotOnly: true, // 启用热模块替换，而无需将页面刷新作为构建失败时的回退。
		// open: true, // 自动打开网页--等同于package.json中配置webpack serve --open
	},
})
