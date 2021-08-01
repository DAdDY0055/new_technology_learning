module.exports = {
  // 実行の起点となるファイルの指定
  entry: './entry.js',

  // 出力に関する設定
  output: {
    filename: 'output.js'
  },

  module: {
    rules: [
      // babel-loader
      {
        loader: 'babel-loader',
        test: /\.js$/,
        options: {
          presets: ['@babel/preset-react']
        }
      }
    ]
  }
};