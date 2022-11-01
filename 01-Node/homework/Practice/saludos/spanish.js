var saludos = require('../greeting.json')

var greet = function() {
 console.log(saludos.es);
}

module.exports = greet;