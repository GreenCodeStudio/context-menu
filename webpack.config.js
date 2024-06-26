import path from 'path';
import CopyPlugin from "copy-webpack-plugin";
import {dirname} from 'path';
import {fileURLToPath} from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
export default {
    entry: {
        index: './src/index.js',
        style: './src/contextMenu.scss',
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        library: {
            type: "module",
        },
    },
    module: {
        rules: [
            {
                test: /i18n\.xml$/,
                use: ["@green-code-studio/internationalization/i18nWebpackLoader"]
            },
            {
                test: /\.mpts$/,
                use: ["mpts-loader"]
            },{
                test: /\.scss$/,
                use: [
                    "css-loader", // translates CSS into CommonJS
                    "sass-loader" // compiles Sass to CSS, using Node Sass by default
                ]

            }
        ]
    },
    experiments: {
        outputModule: true,
    },
}
