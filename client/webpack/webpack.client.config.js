const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');

module.exports = merge(baseConfig('development'), {
    entry: './src/client-entry.ts',
    target: 'web',
    plugins: [new VueSSRClientPlugin()],
});
