const commands = require('./commands');

const print = (Output) => {
    process.stdout.write(Output);
    process.stdout.write('\nprompt > ');
}
// Output un prompt
process.stdout.write('prompt > ');
// El evento stdin 'data' se dispara cuando el user escribe una línea
process.stdin.on('data', (data) => {
  var args = data.toString().trim().split(" "); // remueve la nueva línea
  let cmd = args.shift()
  if(commands[cmd]){
commands[cmd](args,print);
  }else{
    //command not found
    print('CMD not found');
  }
//   if(cmd==='echo'){process.stdout.write(args.join(" ")) 
// }else if (cmd==='ls'){
  
// }else if (cmd==='pwd'){
  
// }

});