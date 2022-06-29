const express = require("express")
const bodyParser = require("body-parser")

const app = express()
app.use(bodyParser.urlencoded({extended: true})) // use for parsing html


app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html")
})

app.post("/", function(req, res){
    // console.log(req.body)

    var num1 = Number(req.body.num1)
    var num2 = Number(req.body.num2)
    var result  = num1 + num2

    res.send("The result of the calculation is "+result)
})

app.get("/bmicalculator", function(req, res){
    res.sendFile(__dirname+"/bmiCalculator.html")
})

app.post("/bmicalculator", function(req, res){
    var weight = Number(req.body.weight)
    var height = Number(req.body.height)/100
    var result = weight/(height*height)
    res.send("Ycd our BMI is "+result)
})

app.listen(3000, function(){
    console.log("Server started in port 3000")
});
