const express = require("express");
const app = express();
const port = 8080;
const path = require("path");

app.use(express.urlencoded({extended: true}));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));
//database example
let posts = [
    {
        username : "apnacollege",
        content : "I Love Coding",
    },
    {
        username : "amit kumar",
        content : "Hardwork is important to achieve success",
    },
    {
        username : "Shradha khapra",
        content : "i got selected for my 1st internship!",
    }

]



app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts}); //send data to index.ejs file
})
//to get the form page
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
})
//when form is submitted
app.post("/posts",(req,res)=>{
    let {username , content} = req.body;
   posts.push({username,content});
    res.redirect("/posts");
})
app.listen(port,()=>{
    console.log("Listening to port :8080");
});
