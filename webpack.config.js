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
        title: 'NPM Notifier',
        head: "<script>(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');ga('create', 'UA-85986360-1', 'auto');ga('send', 'pageview');</script><meta name='description' content='NPM Package version change notifications' /><link rel='author' href='/humans.txt' /><link href='https://fonts.googleapis.com/css?family=Noto+Sans:400,700' rel='stylesheet' type='text/css'><script src='https://checkout.stripe.com/checkout.js'></script>"
      })
    }
  },
  port: '8090',
  devServer: {
    hot: true,
    headers: { 'Access-Control-Allow-Origin': '*' }
  },
  replace: {
    'config': './config.json'
  }
});

module.exports = config;
