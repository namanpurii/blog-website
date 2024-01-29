import express from "express"
import mongoose from "mongoose"
import { fileURLToPath } from "url"
import path, {dirname} from "path"
import blogRoute from "../routes/blog.js"
import { mockBlogs } from "../data.js"

const server = express()

const port = process.env.PORT || 3000 

mongoose.connect(
  "mongodb+srv://blog:<YOUR MONGO ATLAS URI GOES HERE>@cluster0.cjh9kwx.mongodb.net/?retryWrites=true&w=majority"
);

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

//Set EJS as the view engine
server.set("view engine", "ejs")
server.set("views", path.join(__dirname, "..", "views"))

server.use("/api/blog", blogRoute)
server.use(express.urlencoded({ extended: false }))

server.get('/api/blogs', (req, res) =>{
    res.render("index", {mockBlogs: mockBlogs
    }) //renders ../views/index.ejs
})

server.listen(port, ()=>{
    console.log(`Blog server listening on port ${port}`);
})