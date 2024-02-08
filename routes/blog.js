import express from "express";
import Blog from "../models/blog.js";
import escape from "validator/lib/escape.js";

const router = express.Router();
router.use(express.json()); //to parse any incoming request as JSON -> JS Object

router.get("/new", (req, res) => {
  res.render("form");
});

router.post("/new", async (req, res) => {
  let blog = new Blog({ 
    //sanitize input entered by the user
    title: escape(req.body.title), 
    description: escape(req.body.description), 
    content: escape(req.body.content), 
  });
  try {
    blog = await blog.save(); //saves to a collection you created in your MongoAtlas Dashboard.
    res.redirect(`http://localhost:3000/api/blog/${blog._id}`);
  } catch (err) {
    console.log(err);
    res.render("form", { blog: blog });
  }
});

router.get("/:blogId", async (req, res) => {
  const blogId = req.params.blogId
  try {
    const document = await Blog.findById(blogId).exec();
    if (document) {
      res.render("blog", {document: document});
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.log("Failed retreiving documents" + err);
    res.sendStatus(500);
  }
  // res.sendStatus(200);
});

router.delete("/:blogId/delete", (req, res) => {
  res.status(200).json({ msg: `The HTTP method is: ${req.method}` });
});

router.put("/:blogId/edit", (req, res) => {
  res.status(200).json({ msg: `The HTTP method is: ${req.method}` });
});

export default router;
