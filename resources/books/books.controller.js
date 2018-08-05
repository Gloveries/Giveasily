var generateController = require('../../utils/generateController');
var booksModel = require('./books.model');

module.exports = generateController(booksModel);