import path from 'path';
import webpack from 'webpack';
import mapValues from 'lodash/mapValues';
import isomorphicConfig from './isomorphic';
import IsomorphicPlugin from 'webpack-isomorphic-tools/plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import {
  ANALYZE, NODE_ENV, WEBPACK_OUTPUT_PATH, ASSET_URL, RESOLVE_PATHS,
  APPLICATION_DEV_URL, APPLICATION_STAGING_URL, APPLICATION_PROD_URL,
} from './constants';

const isDev = NODE_ENV === 'development';
const isomorphicPlugin = new IsomorphicPlugin(isomorphicConfig).development(isDev);

const appBaseUrl = () => {
  switch (NODE_ENV) {
    case 'production': return APPLICATION_PROD_URL;
    case 'staging': return APPLICATION_STAGING_URL;
    default: return APPLICATION_DEV_URL;
  }
};

const plugins = [
  isomorphicPlugin,
  new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en|es/),
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': isDev ? JSON.stringify(NODE_ENV) : '"production"',
      'APPLICATION_BASE_URL': JSON.stringify(appBaseUrl()),
    }
  })
];

if (ANALYZE) { plugins.push(new BundleAnalyzerPlugin()); }

export default {
  context: path.resolve(__dirname, '..'),
  entry: {
    vendor: [
      // Vendor CSS
      './client/vendor'
    ],
    app: [
      './client/index'
    ]
  },
  output: {
    path: path.join(__dirname, ('../' + WEBPACK_OUTPUT_PATH)),
    filename: '[name].js',
    publicPath: `${ASSET_URL}/`
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss', '.css'],
    alias: mapValues(RESOLVE_PATHS, (str) => (
      path.join(process.cwd(), ...str.split('/'))
    ))
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx$|\.js$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
          {
            loader: 'eslint-loader',
            options: {
              configFile: './.eslintrc',
            }
          },
        ]
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: isomorphicPlugin.regular_expression('images'),
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240
            }
          }
        ]
      },
      {
        // Load fonts using file-loader
        test: /\.(ttf|eot|woff2?)$/,
        loader: 'file-loader'
      }
    ]
  },
  plugins
};
