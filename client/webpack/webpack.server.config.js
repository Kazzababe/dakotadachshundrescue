const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.config')
const nodeExternals = require('webpack-node-externals')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')

module.exports = merge(baseConfig('development'), {
    entry: './src/server-entry.ts',
    target: 'node',
    output: {
        libraryTarget: 'commonjs2',
    },
    externals: nodeExternals(),
    plugins: [new VueSSRServerPlugin()],
})
