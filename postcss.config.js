module.exports = {
	plugins: [
		[
			'postcss-pxtorem',
			{
				rootValue: 37.5,
				propList: ['*'], //设置px要转换成rem的属性值，*表示所有属性的px都转换为rem。
				selectorBlackList: [
					'.ig-', // 要忽略的选择器，.ig- 表示 .ig- 开头的都不会转换
				],
				minPixelValue: 1, // 表示会被转化成rem的最小px，此处写1表示1px以上包括1px都会被转换。
			},
		],
	],
}
