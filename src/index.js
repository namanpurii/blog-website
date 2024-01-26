import express from "express"
import { fileURLToPath } from "url"
import path, {dirname} from "path"
import blogRoute from "../routes/blog.js"

const server = express()

const port = process.env.PORT || 3000 

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

//Set EJS as the view engine
server.set("view engine", "ejs")
server.set("views", path.join(__dirname, "..", "views"))

server.use("/api/blog", blogRoute)

server.get('/api/blogs', (req, res) =>{
    res.render("index", {name: "Naman"}) //renders ../views/index.ejs
})

server.listen(port, ()=>{
    console.log(`Blog server listening on port ${port}`);
})