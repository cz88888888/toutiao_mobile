module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 数组和对象键值对最后一个逗号， never参数：不能带末尾的逗号, always参数：必须带末尾的逗号，
    // always-multiline：多行模式必须带逗号，单行模式不能带逗号
    "comma-dangle": [0, "always-multiline"],
    //空行最多不能超过2行
    "no-multiple-empty-lines": [1, { "max": 2 }],
    //函数定义时括号前面要不要有空格
    "space-before-function-paren": [0, "always"],
    //缩进风格
    "indent": [0, 4],
    "object-property-newline": [0],
    "eol-last": [0]
  }
}
