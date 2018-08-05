/* eslint-disable */
'use strict'
const merge = require('webpack-merge');
const common = require('./webpack.config.js');
const webpack = require('webpack');

let remoteHost = "xxg.vifird.com";

// API转发配置
let apiProxy = {
  remote: {
    target: `http://${remoteHost}`,
    bypass: function (req, res, proxyOptions) {
      req.headers['host'] = remoteHost;
    },
    secure: false,
    proxyTimeout: 1000000
  },
  local: {
    target: "http://localhost:8888",
    pathRewrite: {
      "^/api": ""
    },
    secure: false,
    proxyTimeout: 1000000
  }
};

module.exports = merge(common, {
  mode: 'development', //设置相关模式，会自动启用优化的plugin,如NamedChunksPlugin，NamedModulesPlugin
  devtool: 'inline-source-map', //每个文件都有独立的sourcemap
  devServer: {
    contentBase: './dist',
    hot: true,
    port: 9001,
    disableHostCheck: true,
    // open: true,
    overlay: true,
    allowedHosts: [], //白名单
    proxy: {
      "/api": process.env.REMOTE === 'true' ? apiProxy.remote : apiProxy.remote //apiProxy.local
    }
  },
  watchOptions: {
    ignored: ['node_modules']
  },
  plugins: [
    // new webpack.DefinePlugin({
    //   'process.env.NODE_ENV': JSON.stringify('development') //指定环境
    // }),
    new webpack.HotModuleReplacementPlugin() //热替换
  ]
});