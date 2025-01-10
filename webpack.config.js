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
        isLocal: process.env.NODE_ENV === 'development',
        orgName: 'dsaCompiler',
      },
      meta: {
        'Content-Security-Policy': {
          'http-equiv': 'Content-Security-Policy',
          content: "script-src 'self' 'unsafe-inline' 'unsafe-eval' http://localhost:* http:;",
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
  },
  // Source maps for easier debugging
  devtool: 'eval-source-map',
};

// Production configuration
const prodConfig = {
  mode: 'production',
  output: {
    filename: 'dsaCompiler-root-config.js', // Remove contenthash for predictable filename
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/', // Ensure correct routing in production
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
  // Optimization settings for production
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
