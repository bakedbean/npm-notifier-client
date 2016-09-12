var webpack = require('webpack');
var getConfig = require('hjs-webpack');

var config = getConfig({
  in: 'src/index.js',
  out: 'dist',
  output: {
    path: __dirname + '/dist',
    publicPath: '/'
  },
  clearBeforeBuild: false,
  html: function(context) {
    return {
      'index.html': context.defaultTemplate({
        title: 'NPM Notifier'
        //head: "<link href='https://fonts.googleapis.com/css?family=Noto+Sans:400,700' rel='stylesheet' type='text/css'>"
      })
    }
  },
  port: '8090',
  devServer: {
    hot: true,
    headers: { 'Access-Control-Allow-Origin': '*' }
  }
});

module.exports = config;
