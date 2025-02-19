const path = require('path');

module.exports = {
  entry: './src/index.js', // our entry file
  output: {
    filename: 'widget.bundle.js', // output bundle
    path: path.resolve(__dirname, 'dist'),
    // Expose your widget as a library (UMD ensures it works in different environments)
    library: 'MyWidget',
    libraryTarget: 'umd',
    globalObject: 'this'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,  // handle both .js and .jsx files
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  mode: 'production' // or 'development' if you prefer
};