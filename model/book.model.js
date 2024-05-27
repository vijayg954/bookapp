import mongoose from "mongoose";

const bookSchema= mongoose.Schema({
    name:String,
    title:String,
    Price:Number,
    category:String,
    image:String
})

const Book= mongoose.model("book", bookSchema)

export default Book