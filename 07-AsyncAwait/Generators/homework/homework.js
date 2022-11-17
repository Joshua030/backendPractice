const ConsoleLogger = require("@11ty/eleventy/src/Util/ConsoleLogger");

function* fizzBuzzGenerator(max=Infinity) {
  // Tu código acá:
    let number = 1;
    while(number < max +1) {
      if(number % 3 !==0  && number % 5 !==0){
      yield number;
      number++
      }  
      if(number % 3 ===0  && number % 5 ===0){
        yield `Fizz Buzz`;
        number++
      } 
      if(number % 3 ===0){
        yield `Fizz`;
        number++
      } 
     if(number % 5 ===0){
       yield `Buzz`;
       number = number + 1;
     }
    }
}

// function* naturalXNumbersG(x) {
//   let number = 1;
//   while(number < x) {
//       yield number;
//       number = number + 1;
//   }
// }
//var generatorObject = fizzBuzzGenerator(17);

module.exports = fizzBuzzGenerator;
