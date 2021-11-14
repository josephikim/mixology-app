"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var path_1 = __importDefault(require("path"));
var webpack_merge_1 = require("webpack-merge");
var dotenv_webpack_1 = __importDefault(require("dotenv-webpack"));
var webpack_node_externals_1 = __importDefault(require("webpack-node-externals"));
var html_webpack_plugin_1 = __importDefault(require("html-webpack-plugin"));
var webpack_common_js_1 = __importDefault(require("./webpack.common.js"));
var client = (0, webpack_merge_1.merge)(webpack_common_js_1["default"], {
    name: 'client',
    entry: './src/client/index.tsx',
    devtool: 'inline-source-map',
    output: {
        path: path_1["default"].resolve('./dist'),
        filename: 'bundle.js'
    },
    plugins: [
        new html_webpack_plugin_1["default"]({
            template: path_1["default"].resolve('src/client', 'index.html'),
            filename: 'index.html',
            excludeChunks: ['server']
        }),
        new dotenv_webpack_1["default"]({
            path: path_1["default"].resolve('src/config', '.env.development')
        })
    ]
});
var server = (0, webpack_merge_1.merge)(webpack_common_js_1["default"], {
    name: 'server',
    entry: './src/server/server.ts',
    target: 'node',
    output: {
        path: path_1["default"].resolve('./dist'),
        filename: 'server.js'
    },
    externals: [(0, webpack_node_externals_1["default"])()],
    plugins: [
        new dotenv_webpack_1["default"]({
            path: path_1["default"].resolve('src/config', '.env.development')
        })
    ]
});
var config = [server, client];
exports["default"] = config;
