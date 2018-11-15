const {resolve} = require('path');
const options = require('./webpack.config');


options.mode = 'development';
options.entry = './example/';

options.output.filename = 'example.js';
options.output.libraryTarget = 'var';
options.output.publicPath = '/docs/';
options.output.path = resolve('docs'),

options.devServer = {
  contentBase: [
    resolve(__dirname, "example"),
  ],
  publicPath: '/docs/'
};

module.exports = options;
