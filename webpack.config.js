const path = require('path');
const glob = require("glob");
const entries = glob.sync("./dist/**/*.js");

module.exports = {
    entry: entries,
    output: {
        path: path.resolve(__dirname, './public/dist'),
        filename: 'index.js'
    }
};
