const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')

module.exports = mode => ({
    mode,
    output: {
        path: path.join(process.cwd(), 'dist'),
        publicPath: '/dist/',
        filename: '[name].[chunkhash].js',
    },
    plugins: [new VueLoaderPlugin()],
    resolve: {
        modules: [path.resolve(__dirname, '/src'), 'node_modules/'],
        descriptionFiles: ['package.json'],
        extensions: ['.ts', '.js', '.vue'],
        alias: {
            '@': path.join(process.cwd(), 'src'),
        },
    },
    module: {
        rules: [
            {
                test: /\.s?css$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    {
                        loader: 'sass-loader',
                    },
                ],
            },
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    compilerOptions: {
                        preserveWhitespace: false,
                    },
                },
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]',
                },
            },
        ],
    },
})
