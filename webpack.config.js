const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { merge } = require('webpack-merge');

// Common configuration
const commonConfig = {
  entry: './src/dsaCompiler-root-config.js',
  output: {
    filename: 'dsaCompiler-root-config.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/', // Ensure proper publicPath for production
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: false, // Handled separately for production
            },
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      template: 'src/index.ejs',
      templateParameters: {
        isLocal: 'development',
        orgName: 'dsaCompiler',
      },
      meta: {
        'Content-Security-Policy': {
          'http-equiv': 'Content-Security-Policy',
          content: "script-src 'self' 'unsafe-inline' 'unsafe-eval' http://localhost:* https:;",
        },
      },
    }),
  ],
};

// Development configuration
const devConfig = {
  mode: 'development',
  devServer: {
    static: path.join(__dirname, 'src'),
    port: 9000,
    historyApiFallback: true, // Ensure correct routing for SPA in dev mode
    onBeforeSetupMiddleware: (devServer) => {
      devServer.app.get('/dsaCompiler-root-config.js', (req, res) => {
        const filePath = path.join(__dirname, 'dist', 'dsaCompiler-root-config.js');
        res.sendFile(filePath);
      });
    },
    hot: true,
    open: true,
  },
  devtool: 'eval-source-map', // Source maps for easier debugging
};

// Production configuration
const prodConfig = {
  mode: 'production',
  output: {
    filename: 'dsaCompiler-root-config.[contenthash].js', // Use content hash for caching
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/', // Ensure proper routing for production
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: true, // Minify HTML in production
            },
          },
        ],
      },
    ],
  },
  optimization: {
    minimize: true, // Minify JS in production
    splitChunks: {
      chunks: 'all', // Optimize and split vendor bundles
    },
  },
  devtool: 'source-map', // High-quality source maps for production
};

module.exports = (env) => {
  if (env && env.production) {
    return merge(commonConfig, prodConfig);
  }
  return merge(commonConfig, devConfig);
};
