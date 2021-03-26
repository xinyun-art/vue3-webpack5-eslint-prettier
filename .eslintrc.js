module.exports = {
  // 如果想要在不同的目录中使用不同的 .eslintrc, 就需要在该目录中添加如下的配置项：
  // 告诉eslint找.eslintrc配置文件不能往父级查找
  // root: true,
  // 此项是用来提供插件的，插件名称省略了eslint-plugin-，下面这个配置是用来规范vue的
  // plugins: ['vue'],
  extends: [
    // add more generic rulesets here, such as:
    'eslint:recommended', // eslint推荐规则预设
    'plugin:vue/vue3-recommended', // eslint-plugin-vue推荐的适用于vue3的规则预设
    'plugin:prettier/recommended', // disabled eslint的代码格式化规则，将其转交给prettier处理格式化问题。
  ],
  parser: 'vue-eslint-parser',
  // 自定义 parser
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
  },
  rules: {},
}
