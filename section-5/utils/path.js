const path = require("path");

module.exports = path.dirname(require.main.filename); // Maximilian uses 'process.mainModule.filename' which is deprecated
