const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');


const config = {
  resolve: {
    modules: ['node_modules'],
    extensions: [ '.tsx', '.ts', '.js', '.jsx', '...'],
  },

  entry: {
    main: ['./src/js/scripts.js', './src/scss/styles.scss'],
  },

  output: {
    chunkFilename: 'js/[name].js',
    filename: 'js/[name].js',
    path: path.resolve(__dirname, 'static')
  },

  plugins: [
    new webpack.ProgressPlugin(),
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: [
        'css/**/*',
        '!img/**/*',
      ]
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    }),
    new CopyPlugin([
      {
        from: 'src/images',
        to: 'img',
        test: /\.(jpe?g|png|gif|svg)$/i,
        force: true
      },
    ]),
    new ImageMinimizerPlugin({
      minimizerOptions: {
        plugins: [
          ['gifsicle', { interlaced: true }],
          ['jpegtran', { progressive: true }],
          ['optipng', { optimizationLevel: 5 }],
          [
            'svgo',
            {
              plugins: [
                {
                  removeViewBox: false,
                }
              ]
            }
          ]
        ]
      }
    })
  ],

  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: '[path][name].[ext]',
              outputPath: '../img/'
            }
          }
        ]
      },{
        test: /.(js|jsx)$/,
        loader: 'babel-loader',
        include: [
          path.resolve(__dirname, 'src/js')],

      }, {
        test: /.(scss|css)$/,

        use: [
          {
            loader: MiniCssExtractPlugin.loader
          }, {
            loader: "css-loader",

            options: {
              sourceMap: true,
              url: false
            }
          }, {
            loader: "sass-loader",

            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },

  optimization: {
    minimizer: [new TerserPlugin()],

    splitChunks: {
      cacheGroups: {
        vendors: {
          priority: -10,
          test: /[\\/]node_modules[\\/]/
        }
      },

      chunks: 'async',
      minChunks: 1,
      minSize: 30000,
      name: true
    }
  }
}

module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    config.devtool = 'source-map';
  }

  return config;
};
