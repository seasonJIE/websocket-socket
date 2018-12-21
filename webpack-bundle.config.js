const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  //入口文件的路径
  entry: "./src/index.tsx",
  output: {
    //打包的输出路径
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  // 添加需要解析的文件格式
  resolve: {
    extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.less', '.json', '.css']
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
  devtool: "eval",
}