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
    'plugin:prettier/recommended',
  ],
  parser: 'vue-eslint-parser',
  // 自定义 parser
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
  },
  rules: {
    // override/add rules settings here, such as:
    'vue/no-unused-vars': 'error',
    // 此规则禁用不必要的分号。
    'no-extra-semi': 'off',
    // 该规则强制使用一致的分号
    semi: ['error', 'never'],
    // 该规则强制使用一致的反勾号、双引号或单引号。
    quotes: ['error', 'single'],
    // 该规则旨在强制使用一致的缩进风格。默认是 4个空格。
    indent: ['error', 2],
    // 该规则旨在通过限制代码行的长度来提高代码的可读性和可维护性。
    // 一行的长度为行中的 Unicode 字符的数量。
    'max-len': ['error', { code: 135 }],
    // 这个规则强制在对象和数组字面量中使用一致的拖尾逗号。
    // "always-multiline" 当最后一个元素或属性与闭括号 ] 或 } 在 不同的行时，要求使用拖尾逗号；当在 同一行时，禁止使用拖尾逗号。
    'comma-dangle': ['error', 'always-multiline'],
    // 该规则强制箭头函数单个参数是否要使用圆括号括起来
    // "as-needed"：在可以省略括号的地方强制不使用括号
    'arrow-parens': ['error', 'as-needed'],
    // 此规则在单行元素的内容之前和之后强制换行。
    'vue/singleline-html-element-content-newline': 'off',
    // 限制每行最多能写多少个属性
    'vue/max-attributes-per-line': 'off',
    // 标签自闭合相关设置
    'vue/html-self-closing': [
      'warn',
      {
        html: {
          void: 'always',
          normal: 'always',
          component: 'always',
        },
      },
    ],
  },
}
