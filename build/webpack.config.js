/* eslint-disable */
'use strict'
const path = require('path');
const  fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const StatsPlugin = require('stats-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpack = require("webpack");
const glob = require('glob');

// 按需生成入口js合并
function getEntry(globPath, pathDir) {
  var files = glob.sync(globPath);
  var entries = {},entry, dirname, basename, pathname, extname;
  for (var i = 0; i < files.length; i++) {
      entry = files[i];
      dirname = path.dirname(entry);
      extname = path.extname(entry);
      basename = path.basename(entry, extname);
      pathname = path.join(dirname, basename);
      let key = dirname.replace('src/page/','').replace('/','@')
      entries[key] = './' + entry;
  }
  return entries;
}

let entries = getEntry('src/page/**/*.js', 'src/page/');
//vue-loader 配置
const vueLoaderConfig = {
  transformToRequire: {
    video: 'src',
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  }
}

function resolve (dir) {
  return path.resolve(__dirname, '..', dir)
}

let config = {
  entry: {
    ...entries,
    // app: './src/main.js',
    // vendor:[
    //   "lodash",
    //   "vue",
    //   "moment"
    // ]
  },
  output: {
    filename: './js/[name].[hash].js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: '',
      filename: 'index.html',
      template: 'index.html',
      inject: true,
      chunks: ['home','vendor','common']
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new webpack.ProvidePlugin({
      Vue:['vue/dist/vue.esm.js', 'default'],
      _:['lodash'],
      moment:['moment']
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ],
  //  去除公共引用
  optimization: {
    splitChunks: {
      cacheGroups: {
          common: {
              name: "common",
              chunks: "initial",
              minChunks: 3
          }
      },
      // cacheGroups: {
      //   vendor: {
      //       priority: -10,
      //       chunks: "initial",
      //       name:"vendor"
      //   }
      // }
    }
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        include: [resolve('src')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.scss|css$/,
        use:[
          
          "style-loader",
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "resolve-url-loader",
          "sass-loader?sourceMap",
          // {
          //   "loader":'postcss-loader',
          //   options: {           // 如果没有options这个选项将会报错 No PostCSS Config found
          //     plugins: (loader) => [
          //         // require('autoprefixer')(), //CSS浏览器兼容
          //         // require("postcss-cssnext")(),
          //         // require("css-declaration-sorter")({
          //         //     order: "concentric-css"
          //         // }),
          //         // require("css-mqpacker")(),
          //     ]
          //   }
          // }
        ],
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src')]
      },
      {
        test: /\.(png|jpe?g|gif)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'img/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'media/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|woff|eot|ttf|otf|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'font/[name].[hash:7].[ext]'
        }
      }
    ]
  }
};

if(process.argv.includes('--profile')>0) {
  config.plugins.push(
    new StatsPlugin('stats.json', {
      chunkModules: true
    })
  )
  config.plugins.push(
    new BundleAnalyzerPlugin({
      analyzerMode: 'static'
    })
  )
}

module.exports = config

console.log(entries)
let views = Object.keys(entries)
views.forEach(function(ele){
  if(ele === 'home'){
    return false
  }
  let path = entries[ele].replace('src/','').replace('/entry.js','.html')
  let view = new HtmlWebpackPlugin({
    title: '',
    filename: path,
    template: 'index.html',
    inject: true,
    chunks: ['common', 'vendor', ele],
    chunksSortMode: 'manual'
  })
  module.exports.plugins.push(view)
})
