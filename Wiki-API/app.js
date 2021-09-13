const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

//Connecting to MONGOOSE
mongoose.connect("mongodb://localhost:27017/WikiDB");

const articleSchema = new mongoose.Schema({
  title: String,
  content: String
});
const Article = mongoose.model("article", articleSchema);

// Using Chainable Route Handlers for REST.
// every http request (get, post, delete, etc) are preceded by a dot (.) to indicate a chain method.
// no semicolon at the end yet since we don't want the chain method to end yet.
app.route("/articles")
.get((req, res)=>{
  Article.find({}, (err, result)=>{
    if (err) {
      console.log("[ERROR][GET][/ARTICLES] ", err);
    } else {
      console.log("[INF][GET][/ARTICLES] ", result);
      res.send(result);
    }
  });
})
.post((req, res)=>{
  const postTitle = req.body.title;
  const postContent = req.body.content;
  console.log("Post Title: ", postTitle);
  console.log("Post Content: ", postContent);

  const newArticle = new Article({
    title: postTitle,
    content: postContent
  });

  newArticle.save((err)=>{
    if (err) {
      console.log("[ERROR][POST][/ARTICLES] ", err);
      res.send(err);
    } else {
      console.log("[INF][POST][/ARTICLES] ", newArticle);
      res.redirect("/articles");
    }
  });
})
.delete((req, res)=>{
  Article.deleteMany({}, (err)=>{
    if (err) {
      console.log("[ERROR][DEL][/ARTICLES] ", err);
      res.send(err);
    } else {
      console.log("[INF][DEL][/ARTICLES] Deleted Article Collection.");
      res.redirect("/articles");
    }
  });
})


// REST GET
app.get("/articles", (req, res)=>{
  Article.find({}, (err, result)=>{
    if (err) {
      console.log("[ERROR][GET][/ARTICLES] ", err);
    } else {
      console.log("[INF][GET][/ARTICLES] ", result);
      res.send(result);
    }
  });
});


// REST POST
app.post("/articles", (req, res)=>{
  const postTitle = req.body.title;
  const postContent = req.body.content;
  console.log("Post Title: ", postTitle);
  console.log("Post Content: ", postContent);

  const newArticle = new Article({
    title: postTitle,
    content: postContent
  });

  newArticle.save((err)=>{
    if (err) {
      console.log("[ERROR][POST][/ARTICLES] ", err);
      res.send(err);
    } else {
      console.log("[INF][POST][/ARTICLES] ", newArticle);
      res.redirect("/articles");
    }
  });
});


// REST Delete
app.delete("/articles", (req, res)=>{
  Article.deleteMany({}, (err)=>{
    if (err) {
      console.log("[ERROR][DEL][/ARTICLES] ", err);
      res.send(err);
    } else {
      console.log("[INF][DEL][/ARTICLES] Deleted Article Collection.");
      res.redirect("/articles");
    }
  });
});


app.listen("3000", ()=>{
  console.log("Listening to Port 3000");
});
