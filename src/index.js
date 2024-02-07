import express from "express";
import mongoose from "mongoose";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import blogRoute from "../routes/blog.js";
// import { mockBlogs } from "../data.js";
import Blog from "../models/blog.js";

const server = express();

const port = process.env.PORT || 3000;

mongoose.connect(
  "mongodb+srv://blog:password@cluster0.cjh9kwx.mongodb.net/?retryWrites=true&w=majority"
  // this helps connect to your MongoAtlas Cloud Cluster.
);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//Set EJS as the view engine
server.set("view engine", "ejs");
server.set("views", path.join(__dirname, "..", "views"));

server.use(express.urlencoded({ extended: false })); //generally there are errors with parsing post requests at the server-side. This middleware comes handy in that case.
server.use("/api/blog", blogRoute);

server.get("/api/blogs", async (req, res) => {
  try {
    const documents = await Blog.find({}).sort({dop: -1});
    res.render("index", { documents: documents }); //renders ../views/index.ejs
  } catch (err) {
    console.error(err);
  }
});

server.listen(port, () => {
  console.log(`Blog server listening on port ${port}`);
});

//Validating connection to database cluster
var conn = mongoose.connection;
conn.on("connected", () => {
  console.log("MongoAtlas Cluster Connected");
});
conn.on("disconnected", () => {
  console.log("MongoAtlas Cluster Disconnected");
});

conn.on("error", console.error.bind(console, "connection error"));
