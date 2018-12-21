const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  //入口文件的路径
  entry: "./src/index.tsx",
  output: {
    filename: "bundle.js"
  },
  // 添加需要解析的文件格式
  resolve: {
    extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.json', '.css', '.less']
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'test',
      template: './index.html',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              plugins: [
                ["import", {libraryName: "antd-mobile", style: "css"}, "ant-mobile"],
                ["import", {libraryName: "antd", style: "css"}, "ant"]
              ],
            }
          },
          {
            loader: 'ts-loader',
            options: {
              ignoreDiagnostics: []
            }
          }
        ]
      },
      {
        test: /\.less$/,
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader'
        }, {
          loader: 'less-loader'
        }]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpe?g|gif|woff|svg|eot|ttf)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8192
          }
        }]
      }
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname, "./"),
    inline: true,//实时刷新
    port: 8002, //端口号
    compress: true,
    proxy: {
      "/": {
        // target: process.env.PROXY,
        secure: false,
        bypass: function (req) {
          if (req.headers.accept && req.headers.accept.indexOf("html") !== -1) {
            console.log("Bypass the proxy - " + req.headers.accept)
            return "./index.html"
          }
        }
      }
    }
    // hot: true
  },
  // 启用sourceMap
  devtool: "source-map",
}