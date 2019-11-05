const path = require('path');
module.exports = {
    devtool: 'source-map',

    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'react.bundle.js'
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loader: "babel-loader",
            options: {
                presets: ['@babel/preset-env', '@babel/preset-react'],
                plugins: ["@babel/plugin-proposal-class-properties"]

            }
        },
        {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        },
        {
            test: /\.svg$/,
            loader: 'svg-inline-loader'
        }],

    }
};