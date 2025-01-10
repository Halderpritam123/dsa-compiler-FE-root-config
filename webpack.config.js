const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { merge } = require('webpack-merge');

// Common configuration
const commonConfig = {
  entry: './src/dsaCompiler-root-config.js',
  output: {
    filename: 'dsaCompiler-root-config.js', // Use contenthash for production
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/', // Make sure the publicPath is set correctly
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: false, // Minification handled by mode
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
        isLocal: true, // Set isLocal to `true` for development or `false` for production manually
        orgName: 'dsaCompiler',
        csp: "default-src 'self' https: localhost:*; script-src 'unsafe-inline' 'unsafe-eval' https: localhost:*;" // Development CSP settings
        // For production, change the CSP manually as:
        // csp: "default-src 'self' https:; script-src 'self' https:; connect-src https:; style-src 'self' https:; img-src 'self' https: data:; object-src 'none';"
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
    historyApiFallback: {
      index: '/index.html', // Ensures correct routing in dev mode
    },
    onBeforeSetupMiddleware: function (devServer) {
      devServer.app.get('/dsaCompiler-root-config.js', (req, res) => {
        const filePath = path.join(__dirname, 'dist', 'dsaCompiler-root-config.js');
        res.sendFile(filePath);
      });
    },
    hot: true,
    open: true,
    headers: {
      'Content-Security-Policy': "script-src 'self' 'unsafe-inline' 'unsafe-eval' https: http://localhost:*;",
    },
  },
  devtool: 'eval-source-map', // Source maps for easier debugging
};

// Production configuration
const prodConfig = {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js', // Cache-busting filenames in production
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: true, // Enable minification for production
            },
          },
        ],
      },
    ],
  },
  optimization: {
    minimize: true, // Minify the code in production
  },
};

module.exports = (env) => {
  if (env && env.production) {
    return merge(commonConfig, prodConfig);
  }
  return merge(commonConfig, devConfig);
};
