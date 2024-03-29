//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

/*************** SET UP THE SERVER ***************/
// Connect to local mongodb wikiDB
mongoose.connect("mongodb://localhost:27017/wikiDB", {useNewUrlParser: true})

// Create schema 
const articleSchema = {
    title : String,
    content : String
}
// Create model 
const Article = mongoose.model("Article", articleSchema)

/*************** CREATE ROUNTE ***************/
// GET & POST & DELETE (with chaining method)
app.route("/articles")
.get(function(req, res){
    Article.find(function(err, foundArticles){
        if (!err){
            res.send(foundArticles)

        }else{
            res.send(err)
        }
    })
})

.post(function(req, res){
    // console.log(req.body.title)
    // console.log(req.body.content)
    const newArticle = new Article({
        title : req.body.title,
        content : req.body.content
    })
    newArticle.save(function(err){
        if (!err){
            res.send("Successfully added a row!")
        }else{
            res.send(err)
        }
    })
})

.delete(function(req, res){
    Article.deleteMany(
        function(err){
            if(!err){
                res.send("Successfully delete all rows.")
            }else{
                res.send(err)
            }
        }
    )
});

/*************** ROUTE WITH SPECIFIC CONDITION ***************/
app.route("/articles/:articleTitle")
.get(function(req, res){
    Article.findOne(
        {title : req.params.articleTitle} ,
        function(err, foundArticle){
        if (foundArticle){
            res.send(foundArticle)
        }else{
            res.send("No articles matching that title was found.")
        }
    })
})
.put(function(req, res){
    Article.replaceOne(
        {title : req.params.articleTitle}, //search condition
        {title : req.body.title, content : req.body.content}, //replace value
        function(err){
            if (!err){
                res.send("Successfully updated article.")
            }else{
                res.send(err)
            }
        }
    )
})
.patch(function(req, res){
    Article.updateOne(
        {title : req.params.articleTitle}, //search condition
        {$set : req.body}, //replace value
        function(err){
            if (!err){
                res.send("Successfully updated article.")
            }else{
                res.send(err)
            }
        }
    )
}
)
.delete(function(req, res){
    Article.deleteOne(
        {title : req.params.articleTitle},
        function(err){
            if (!err){
                res.send("Successfully deleted article.")
            }else{
                res.send(err)
            }
        }
    )
}
);

app.listen(3000, function() {
  console.log("Server started on port 3000");
});