/* eslint-disable */
'use strict'

const path = require('path');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const common = require('./webpack.config.js');


module.exports = merge(common, {
  /*设置相关模式，会自动启用优化的plugin，
  FlagDependencyUsagePlugin, 
  FlagIncludedChunksPlugin, 
  ModuleConcatenationPlugin, 
  NoEmitOnErrorsPlugin, 
  OccurrenceOrderPlugin, 
  SideEffectsFlagPlugin 和 UglifyJsPlugin*/
  // devtool: 'source-map',//每个文件都有独立的sourcemap
  mode: 'production', 
  plugins: [
    new CleanWebpackPlugin(['dist'],
    {
      root: path.resolve(__dirname, '../'), //根目录
      verbose: true, //开启在控制台输出信息
      dry: false,
     }),
    // new UglifyJSPlugin()
    // new webpack.DefinePlugin({
    //   'process.env.NODE_ENV': JSON.stringify('production') //指定环境
    // })
  ]
});