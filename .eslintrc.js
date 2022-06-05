module.exports = {
  root: true,
  env: {
    node: true,
    "vue/setup-compiler-macros": true,//definePorps를 import 하지 않아도 setup 태그 안에서 사용 가능
  },
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended'
  ],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    "no-unused-vars": "off",
    "vue/multi-word-component-names": "off",//이름에 두가지 단어 이상 들어가지 않아도 에러 안뜨게
  }
}
