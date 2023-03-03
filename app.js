const bodyParser = require("body-parser");
const express = require("express");
const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html")
})

app.post("/", function(req, res) {

   const query = req.body.cityName;
    const apiKey = process.env.API_TOKEN;
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit+"";

    https.get(url, function(response) {
         console.log(response.statusCode);

        response.on("data", function(data) {
            // console.log(data);  //we get the data in the form of hexadecimal

            const weatherData = JSON.parse(data); //for converting into js objects

            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;

            const imageURL = "http://openweathermap.org/img/wn/"+ icon+"@2x.png"


            res.write("<p>The weather is currently " + weatherDescription+ "</p>");
           res.write("<h1>the temperature in "+query+" is: " + temp +" Celcius</h1>");
           res.write("<img src="+imageURL+">");
            
           res.send();

            
        })
    })

})



























//we can have only one res.send()
//but we can have multiple res.write()
//and a final res.send() to wrap and send all






app.listen(process.env.PORT || 3000, function() {
    console.log("server is running on port 3000");
})











// const object = {
//     name: "shriniket",
//     food: "potato"
// }

// JSON.stringify(object); //for converting a javascript object into string
// console.log(object);


