var http = require("http");
var fs = require("fs");
const hostname = "localhost";

const port = 3000;
var beatles = [
  {
    name: "John Lennon",
    birthdate: "09/10/1940",
    profilePic:
      "https://blogs.correiobraziliense.com.br/trilhasonora/wp-content/uploads/sites/39/2020/10/CBNFOT081020100047-550x549.jpg",
  },
  {
    name: "Paul McCartney",
    birthdate: "18/06/1942",
    profilePic:
      "http://gazettereview.com/wp-content/uploads/2016/06/paul-mccartney.jpg",
  },
  {
    name: "George Harrison",
    birthdate: "25/02/1946",
    profilePic:
      "https://canaldosbeatles.files.wordpress.com/2012/02/george-george-harrison-8321345-438-600.jpg",
  },
  {
    name: "Richard Starkey",
    birthdate: "07/08/1940",
    profilePic:
      "http://cp91279.biography.com/BIO_Bio-Shorts_0_Ringo-Starr_SF_HD_768x432-16x9.jpg",
  },
];

//create a server
const server = http.createServer((req, res) => {
  if (req.url === "/api" || req.url === "/api/") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(beatles));
  }
  if (req.url.substring(0, 5) === "/api/" && req.url.length > 5) {
    //url = /api/John%20Lennon
    //req.url.substring(0,5) =/api/
    //req.url.length= 9

    let findBeatle = req.url.split("/").pop(); //John%20Lennon
    let fooundBeatle = beatles.find(
      ({ name }) => findBeatle === encodeURI(name)
    ); //boolean
    if (fooundBeatle) {
      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify(fooundBeatle));
    } else {
      res.writeHead(404, { "content-type": "text/plain" });
      res.end(`Beatle doesn't exist`);
    }
  }
  if (req.url === "/") {
    res.writeHead(200, { "conten-type": "text/html" });
    const index = fs.readFileSync(`${__dirname}/index.html`);
    res.end(index);
  }
  let findBeatle = req.url.split("/").pop(); //John%20Lennon
  let foundBeatle = beatles.find(({ name }) => findBeatle === encodeURI(name)); //boolean
  if (foundBeatle) {
    res.writeHead(200, { "content-type": "text/html" });
    let read = fs.readFileSync(`${__dirname}/template.html`, "utf-8");
    read = read.replace(/{name}/g, foundBeatle.name);
    read = read.replace("{birthdate}", foundBeatle.birthdate);
    read = read.replace("{profilePic}", foundBeatle.profilePic);
    // let finalHTML = replaceData(read,foundBeatle); Other way
  } else {
    res.writeHead(404, { "Content-type": "text-plain" });
    res.end("No existe ese beatle");
  }
});

// const server= http.createServer((req,res)=>{

// // res.setHeader('Content-Type', 'text/html');
// let route="./";
// switch (req.url) {
//   case '/':
//         route+='index.html';

//         res.statusCode=200;
//         break;
//  case '/Paul%20McCartney':
//           route+='./template.html';
//            //Esta es la variable con la que vamos a reemplazar el template

//           res.statusCode=200;
//           break;
//   case '/api':
//     res.writeHead(200,{'Content-Type': 'application/json'})
// // res.write(`<div>${JSON.stringify(beatles)}}</div>`);;
// res.statusCode=200;
// res.end(JSON.stringify(beatles))
//       break;
//  case "/api/John%20Lennon":
//  res.write(`<div>${JSON.stringify(beatles.filter(({name})=>name ==="John Lennon"))}}</div>`);;
// res.statusCode=200;
// case "/api/Paul%2McCartney":
//  res.write(`<div>${JSON.stringify(beatles.filter(({name})=>name ==="Paul McCartney"))}}</div>`);;
// res.statusCode=200;
//   default:
//     res.write(`<div>404 not found</div>`);;

//       res.statusCode= 404;
//       break;
// }
// // fs.readFile(route,(err,data) =>{

// //   if(err){
// //       console.log(err)
// //       res.end();
// //       // HTTP response status codes
// //       //Information responses(100-199)
// //       //Succesful responses (200-299)
// //       //Redirection messages(300-399)
// //       // client error responses (400-499)
// //       // server error responses (500-599)
// //   }else {

// //       res.end(data);
// //   }
// //   });

// });

server.listen(port, hostname, () => {
  console.log(`listening on port ${port}`);
});
