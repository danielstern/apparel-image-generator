const { resolve } = require("path");
var nodeExternals = require('webpack-node-externals');


module.exports = {
    target:"node",
    mode: "production",
    externals: [nodeExternals()],
    entry:"./src/index.js",
    output: {
        filename: 'index.js',
        path: resolve(__dirname, "bin")
    },
    node: {
        __dirname: false
    },
    resolve: {
        extensions: ['.js'],
    },
    module: {

        rules: [

            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [

                            '@babel/preset-env',

                        ],
                        "plugins":[

                            "@babel/transform-runtime"

                        ],
                    }
                }
            },
            
        ]

    }
};