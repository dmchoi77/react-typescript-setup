const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const prod = process.env.NODE_ENV === "production";

module.exports = {
  mode: prod ? "production" : "development",
  // entry 파일 설정
  devtool: prod ? "hidden-source-map" : "eval",
  entry: "./src/index.tsx",
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"],
  },
  // 번들링 될 파일 정보
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    publicPath: "/",
  },

  module: {
    rules: [
      // loader 나열
      {
        // ts, js
        test: /\.(ts|js)x?$/,
        exclude: "/node_module/",
        use: [
          {
            loader: "babel-loader",
          },
        ],
      },
      {
        // css
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        // image
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "Assets/Images/[name].[ext]?[hash]",
            },
          },
        ],
      },
      {
        // font
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "Assets/Fonts/[name].[ext]?[hash]",
            },
          },
        ],
      },
    ],
  },

  devServer: {
    historyApiFallback: true,
    inline: true,
    port: 3000,
    hot: true,
    publicPath: "/",
  },

  plugins: [
    new webpack.ProvidePlugin({
      React: "react",
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
