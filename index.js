import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
// import bcryptjs from "bcryptjs"
import userroute from "./route/user.route.js";
// import bookRoute from "./route/book.route.js"
import bookrouter from "../backend/route/book.route.js";
// import router from "./route/book.route.js";
const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();
const PORT = process.env.PORT || 4000;
const URI = process.env.MongodbURI || 4000;
import  path from "path";

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

//connect to mongodb

try {
  mongoose.connect(URI, { UseNewUrlParser: true, useUnifiedTopology: true });
  console.log("connected mongodb");
} catch (error) {
  console.log("connected  error mongodb", error);
}

// connect router

app.use("/book", bookrouter);
app.use("/user", userroute);

if(process.env.NODE_ENV==="production"){
  const dirPath= path.resolve();
  app.use(express.static("frontend"));
  app.get("*",(req,res)=>{
    res.sendFile(path.resolve(dirPath,"frontend","index.html"))
  })
}

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
