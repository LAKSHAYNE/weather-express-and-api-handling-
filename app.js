const express = require('express');
const app=express();
const https = require('https');
const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
  const city=req.body.city_name;
  const url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=3c4deaf260467d76257d83591a6d128a&units=metric";
  https.get(url,function(response){
    console.log(response.statusCode);
    response.on("data",function(data){
      const weather_data=JSON.parse(data);
      const weather_ico_id=weather_data.weather[0].icon;
      const weather_ico_url="http://openweathermap.org/img/wn/"+weather_ico_id+"@2x.png"
      res.write("<h1>The temp. is"+weather_data.main.temp+"</h1>");
      res.write("<h1>"+weather_data.weather[0].description+"</h1>");
      res.write("<img src="+weather_ico_url+">");
      res.send();
      console.log(weather_data);
      console.log(weather_data.main.temp);
      console.log(weather_data.weather[0].description);
    });
      });
  // res.send(res.statusCode);
});






app.listen(3000,function(){
  console.log("server is running at port 3000");
});
