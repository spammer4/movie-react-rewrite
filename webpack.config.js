const HtmlWebPackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");    
const path = require("path");
const webpack = require("webpack");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const { TsConfigPathsPlugin } = require('awesome-typescript-loader');

const plugins = (env) => {
    const allPlugins = ([
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "index.html",
            inject: "head",
          }) ,
          new ScriptExtHtmlWebpackPlugin({
            defaultAttribute: "defer"
          }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            _MDB_API_KEY: JSON.stringify("cfe422613b250f702980a3bbf9e90716"),
            _MDB_MOVIE_URL: JSON.stringify("/movie"),
            _MDB_SEARCH_URL: JSON.stringify("/search"),
            _DEFAULT_MOVIE: 157336, // 766, // 157336,
            _BACKGROUND_URL_PREFIX: JSON.stringify("https://image.tmdb.org/t/p/original"),
            _POSTER_URL_PREFIX: JSON.stringify("https://image.tmdb.org/t/p/w500"),
        }),
        new CopyWebpackPlugin([
            {
                from: "src/images", to: "images"    
            }]),
    ]);

    if (env && env.ANALYSE_BUNDLES) {
        allPlugins.push(new BundleAnalyzerPlugin());
    }
    return allPlugins;
}

module.exports = env => {
    return {
        mode: "development",
        entry: { 
            app: "./src/index.tsx",        
        },
        output: {
            filename: "[name].[hash].js",
            path: path.resolve("dist"),        
        },
        stats: {
            children: false  
        },
        optimization: {
            splitChunks: {
            cacheGroups: {
                node_vendors : {
                    test : /[\\/]node_modules[\\/]/,
                    chunks: 'all',
                    name: 'vendor',
                    priority: 1,
                },                 
            }
            },
        },   
        devServer: {
            port: 8080,
            contentBase: "./dist",
            hot: true,   
            index: "index.html",    
            inline: true,   
            stats: {
                children: false  
            },   
            proxy: {
                "/movie": {
                    target: "https://api.themoviedb.org",
                    "changeOrigin": true,
                    "secure": true,
                    "pathRewrite" : {
                        "^/movie" : "/3/movie",                        
                    },
                    "logLevel": "debug"
                },
                "/search": {
                    target: "https://api.themoviedb.org",
                    "changeOrigin": true,
                    "secure": true,
                    "pathRewrite" : {
                        "^/search": "/3/search/movie"
                    },
                    "logLevel": "debug"
                },                
            }  
        },
        devtool: "source-map",
        resolve: {
            extensions: [".ts",".tsx",".js",".json"],
            plugins: [
                new TsConfigPathsPlugin()
            ]          
        },    
        module: {
            rules: [
                // TSLinter and loader
                { test: /\.tsx?$/, enforce: 'pre',
                    use: [
                        {
                            loader: 'tslint-loader',                        
                        }
                    ]
                },

                { test: /\.tsx?$/, loader: 'awesome-typescript-loader' },

                // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
                { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },

                // Exports HTML as a string and can minimise it, negates the use of CopyWebpackPlugin for 
                // index.html 
                {   test: /\.html$/, use: [ { loader: "html-loader", options: { minimize: true } } ] },

                { test: /\.(s*)css$/, use: [ { loader: "style-loader" }, { loader: "css-loader" }, { loader: "sass-loader" } ] },                 
            ]
        },   
        plugins: plugins(env)
    }
};
