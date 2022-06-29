const express = require("express")
const bodyParser = require("body-parser")
const request = require("request")
const https = require("https")

const app = express()
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: true}))

app.get("/", function(req, res){
    res.sendFile(__dirname+"/signup.html")
})

app.post("/", function(req, res){
    const firstName = req.body.FirstName
    const lastName = req.body.LastName
    const email = req.body.Email

    const data = {
        members: [
            {
                email_address: email,
                status : "subscribed",
                merge_fileds:{
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    }

    const jsonData = JSON.stringify(data)

    //make request to Server
    const url =  "https://us17.api.mailchimp.com/3.0/lists/2375f8a0fe"
    const options = {
        method: "post",
        auth: "ruby1:19b5129a5df1d059c0cda4383d2e25fb-us17"
    }

    const request = https.request(url, options, function(response){
        response.on("data", function(data){
            console.log(JSON.parse(data))
        })
    })

    request.write(jsonData)
    request.end()
})

app.listen(3000, function(){
    console.log("Server is running on port 3000")
})

//API Key : 19b5129a5df1d059c0cda4383d2e25fb-us17
//List ID: 2375f8a0fe