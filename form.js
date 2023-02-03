var express = require("express");
var app = express();
var port = process.env.PORT || 9090;
var mongoose = require("mongoose");
var connection ="mongodb+srv://vrajesh:vrajesh@cluster0.echmcbi.mongodb.net/form";
var mongo = mongoose.connection;
mongoose.set("strictQuery",true);
mongoose.connect(connection).then(function(){
    console.log("mongodb cluster is connected to node server");
}).catch(function(err){
    console.log(err)
});
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/form.html")
});
app.post("/data",(req,res)=>{
    var fname = req.body.username;
    var pword = req.body.password;
    var obj = {
        "Username":fname,
        "Password":pword
    };
    var dat = mongo.collection("userdata").insertOne(obj,function(err){
        if(err){
            res.sendFile(__dirname+"/form.html")
        }
        else{
            res.sendFile(__dirname+"/success.html")
        }
    }); 
});
app.listen(port,function(err){
    if(err){
        console.log(err)
    }
    else{
        console.log("server is running at "+port);
    }
});