// const bodyParser = require("body-parser");
const Serverless = require("@11ty/eleventy/src/Serverless");
const express = require("express");

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
let posts = [];
let id = 1;
const server = express();
// to enable parsing of json bodies for post requests
server.use(express.json());

// TODO: your code to handle requests

server.post("/posts", (req, res) => {
  const { author, title, contents } = req.body;
  if (!author || !title || !contents)
    return res.status(STATUS_USER_ERROR).json({
      error: "No se recibieron los parámetros necesarios para crear el Post",
    });
  const newPost = { ...req.body, id: id++ };
  posts.push(newPost);
  res.send(newPost);
});

server.post("/posts/author/:author", (req, res) => {
  const { title, contents } = req.body;
  const { author } = req.params;
  if (!title || !contents)
    return res.status(STATUS_USER_ERROR).json({
      error: "No se recibieron los parámetros necesarios para crear el Post",
    });

  if (title && contents && author) {
    const newPost = { author: author, ...req.body, id: id++ };
    posts.push(newPost);
    res.json(newPost);
  }
});

server.get("/posts", (req, res) => {
  const { term } = req.query;
  const titleFound = posts.filter(({ title }) => {
    if (title.includes(term)) return true;
  });

  const contentsFound = posts.filter(({ contents }) => {
    if (contents.includes(term)) return true;
  });

  if (titleFound.length > 0) return res.json(titleFound);
  if (contentsFound.length > 0) return res.json(contentsFound);

  res.json(posts);
});

server.get("/posts/:author", (req, res) => {
  const { author } = req.params;
  const findAuthor = posts.filter((element) => element.author === author);

  if (findAuthor.length > 0) return res.json(findAuthor);
  res.status(STATUS_USER_ERROR).json({
    error: "No existe ningun post del autor indicado",
  });
});

server.get("/posts/:author/:title", (req, res) => {
  const { author, title } = req.params;
  const findAuthor = posts.filter((element) => {
    if (element.author === author && element.title === title) return true;
  });

  if (findAuthor.length > 0) return res.json(findAuthor);
  res.status(STATUS_USER_ERROR).json({
    error: "No existe ningun post con dicho titulo y autor indicado",
  });
});

server.put("/posts", (req, res) => {
  const { title, contents, id } = req.body;
  if (title && contents && id){
  const findPost = posts.find((element) => element.id === id);
  if (findPost){
    findPost.title=title;
    findPost.contents= contents;
    res.json(findPost)
  } else {
    res.status(STATUS_USER_ERROR).json({
        error:
          "No se encuentra el id necesario",
      });
  } 
}else {
    res.status(STATUS_USER_ERROR).json({
        error:
          "No se recibieron los parametros",
      });
  }

});

server.delete("/posts", (req, res) => {
    const{id}=req.body
    const postFound= posts.find((e)=>e.id===parseInt(id));
    if (!id || !postFound){ return res.status(STATUS_USER_ERROR).json({
    error: "Mensaje de error"
      });
    }
  posts = posts.filter(e => e.id !== parseInt(id));
res.json({ success: true });
});

server.delete("/author", (req, res) => {
    const{author}=req.body;
    const AuthorFound= posts.find((e)=>e.author===author);
    if (!author || !AuthorFound){ return res.status(STATUS_USER_ERROR).json({
    error: "No existe el autor indicado"
      });
    }
    const delete_authors= [];
  posts = posts.filter(e => {
    if(e.author !==author){
        return true;
    } else {
        delete_authors.push(e)
    }
  });
res.json(delete_authors);
});

module.exports = { posts, server };
