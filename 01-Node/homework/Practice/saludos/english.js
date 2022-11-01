var saludos = require('../greeting.json')

var greet = function() {
 console.log(saludos.en);
}

module.exports = greet;