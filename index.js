const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const {v4:uuidv4}= require("uuid");
const methodoverride = require("method-override");





app.use(methodoverride("_method")); 
app.use(express.urlencoded({extended: true}));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));
//database example
let posts = [
    {
        id:uuidv4(),
        username : "apnacollege",
        content : "I Love Coding",
    },
    {
        id:uuidv4(),
        username : "amit kumar",
        content : "Hardwork is important to achieve success",
    },
    {
        id:uuidv4(),
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
//when form will submit
app.post("/posts",(req,res)=>{
    let {username , content} = req.body;
    let id = uuidv4();
    posts.push({id,username,content});
    res.redirect("/posts");
});

 app.get("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p)=>id === p.id);
//     console.log(post);    
 res.render("show.ejs",{post});//here post in which store the data and pass the data show.ejs page

 
 });
//patch is used to update the specific post 
app.patch("/posts/:id",(req,res)=>{
let {id}= req.params;
let newContent = req.body.content;
let post = posts.find((p)=>id === p.id);
post.content = newContent;
console.log(post);
console.log(id);
res.redirect("/posts");
});

//edit request
app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post = posts.find((p)=>id===p.id);
    res.render("edit.ejs",{post});
})
//delete request
app.delete("/posts/:id",(req,res)=>{
    let {id}= req.params;
     posts = posts.filter((p)=>id !==p.id); // delete the particular data
   res.redirect("/posts");
});
app.listen(port,()=>{
    console.log("Listening to port :8080");
});
