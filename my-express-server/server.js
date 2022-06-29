//jshint esversion:6

const express = require("express");
const app = express();


app.get("/", function(req, res){
    res.send("hello")
})

app.get("/contact", function(req, res){
    res.send("Contact me with mail.")
})

app.get("/about", function(req, res){
    res.send("I am a cute girl.")
})

app.listen(3000, function(){
    console.log("Server started in port 3000")
});
