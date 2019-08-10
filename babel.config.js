module.exports = {
  presets: [
    '@vue/app'
  ],

  "plugins": [
    ["component", {
      "libraryName": "mint-ui", // 针对特定的库
      "style": true //样式自动引入
    }]
  ]
}
