let fs = require('fs');

module.exports = {
echo: (args,print)=>{
    print(args.join(" "))
},
 date: (args,print)=>{
    print(Date())
 },
 ls: (args,print)=>{
    fs.readdir('.',(err, data)=>{
       if(err)throw  err;
       print(data.join('\n'))
    })
 },
 pwd: (args,print)=>{
 print(process.cwd());
 },
 cat: (args,print)=>{
   fs.readFile(args[0],'utf8',(err,data)=>{
    if(err) throw err;
   print(data);
   }) 
 },
 head: (args,print)=>{
    fs.readFile(args[0],'utf8',(err,data)=>{
     if(err) throw err;
    print(data.split('\n').splice(0,args[1]).join('\n'));
    }) 
  },
  tale: (args,print)=>{
    fs.readFile(args[0],'utf8',(err,data)=>{
     if(err) throw err;
    print(data.split('\n').splice(-args[1]).join('\n'));
    }) 
  },
}