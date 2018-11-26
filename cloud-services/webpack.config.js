const slsw = require("serverless-webpack");
const nodeExternals = require("webpack-node-externals");
const entry = Object.assign(slsw.lib.entries, { babel: '@babel/polyfill' })

module.exports = {
  entry,
  target: "node",
  // Generate sourcemaps for proper error messages
  devtool: 'source-map',
  // Since 'aws-sdk' is not compatible with webpack,
  // we exclude all node dependencies
  externals: [nodeExternals({ whitelist: ['user-service', 'graphql-api', 'group-service', 'service-components', 'question', 'ml-hclust', 'express-server', 'deployment-config'] })],
  mode: slsw.lib.webpack.isLocal ? "development" : "production",
  optimization: {
    // We no not want to minimize our code.
    minimize: false
  },
  performance: {
    // Turn off size warnings for entry points
    hints: false
  },
  // Run babel on all .js files and skip those in node_modules
  module: {
    rules: [
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: "javascript/auto",
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        include: __dirname,
        exclude: /node_modules/,
        query:
          {
            presets:[
              ['@babel/preset-env',
                {
                  "useBuiltIns": "entry"
                }
              ], '@babel/preset-react']
            }
          }
    ]
  }
};
