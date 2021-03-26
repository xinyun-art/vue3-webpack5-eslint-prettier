// 刚开始觉得在VsCode中的Prettier-Code formatter插件里配置了一些个人喜欢的规则，那么这里就不用配了。
// 但应该是在.eslintrc.js中配置了prettier并且 优先级比VSCode中配置的高 的关系，所以prettier的默认规则会覆盖掉Prettier-Code formatter插件中配置的规则。
// 所以如果prettier中有些默认的规则你不喜欢的话，需要在这里配置去覆盖prettier默认的规则。
module.exports = {
  printWidth: 135,
  tabWidth: 2,
  semi: false,
  singleQuote: true,
  trailingComma: 'es5',
  arrowParens: 'avoid',
  htmlWhitespaceSensitivity: 'ignore',
  // endOfLine: 'lf',
}
