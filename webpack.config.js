const path = require("path");
const nodeExternals = require("webpack-node-externals");
module.exports = {
  mode: "production",
  entry: {
    app: "./src/main.ts",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    libraryTarget: "commonjs2",
    libraryExport: "default",
  },
  target: "node",
  node: {
    __filename: false,
    __dirname: false,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
      {
        test: /\.md$/i,
        use: "raw-loader",
      },
      {
        test: /\.html$/i,
        use: "raw-loader",
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".json"],
    alias: {
      "@": path.resolve(__dirname, "./src/"),
    },
  },
  externals: [
    // node_modules dependency를 끊는 모듈, 백엔드에서 돌릴 때 npm install --production 필요
    nodeExternals(),
  ],
};
