module.exports = {
    devtool: 'source-map',
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loader: "babel-loader",
            options: {
                presets: ['@babel/preset-env', '@babel/preset-react']
            }
        },
        {
            test:/\.css$/,
            use:['style-loader','css-loader']
        },
        {
            test: /\.svg$/,
            loader: 'svg-inline-loader'
        }]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    }
};