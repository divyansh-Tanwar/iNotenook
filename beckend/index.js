const connectToMongoose=require("./db/mongoose");
const express=require("express");
const app=express();
//connecting to mongoose
connectToMongoose();
//handling requests

//we dont want to code requests handling in the index.js so we will do request handling in different file then use in index.js
app.use("/api/auth",require("./routes/auth"));
app.use("/api/notes",require("./routes/notes"));









app.listen("3000",function(){
    console.log("listening on port 3000");
})