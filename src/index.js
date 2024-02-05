import express from "express"
import mongoose from "mongoose"
import { fileURLToPath } from "url"
import path, {dirname} from "path"
import blogRoute from "../routes/blog.js"
import { mockBlogs } from "../data.js"

const server = express()

const port = process.env.PORT || 3000 

mongoose.connect(
  "mongodb+srv://blog:password@cluster0.cjh9kwx.mongodb.net/?retryWrites=true&w=majority"
  // this helps connect to your MongoAtlas Cloud Cluster.
);

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

//Set EJS as the view engine
server.set("view engine", "ejs")
server.set("views", path.join(__dirname, "..", "views"))

server.use(express.urlencoded({ extended: false })) //generally there are errors with parsing post requests at the server-side. This middleware comes handy in that case.
server.use("/api/blog", blogRoute)

server.get('/api/blogs', (req, res) =>{
    res.render("index", {mockBlogs: mockBlogs
    }) //renders ../views/index.ejs
})

server.listen(port, ()=>{
    console.log(`Blog server listening on port ${port}`);
})