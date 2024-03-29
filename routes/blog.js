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
    var document = await Blog.findById(blogId).exec();
    if (document) res.render("blog", {document: document});
  } catch (err) {
    console.log("Failed retreiving documents: " + err);
  }
  if (!document) res.sendStatus(404);
});

router.delete("/:blogId/delete", async (req, res) => {
  const blogId = req.params.blogId;
  try {
    const result = await Blog.deleteOne({ _id: blogId });
    // somehow express issues a delete request again for the redirect, luckily i found this stackoverflow post: https://stackoverflow.com/questions/24750169/expressjs-res-redirect-after-delete-request
    //but the above post didnt help our case so we would be redirecting to /api/blogs on the client side
    if (result.acknowledged) res.sendStatus(204);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.get("/:blogId/edit", async (req, res) => {
  const blogId = req.params.blogId;
  try{
    var document = await Blog.findById(blogId).exec();
    if(document) res.render("edit_form", {document: document});
  } catch(err) {
    console.log("Failed retreiving document" + err)
  }
  if(!document) res.sendStatus(404)
});

router.put("/:blogId/edit", async (req, res) => {
  const blogId = req.body.id;
  function calculateTimeToRead(content) {
    let word_cnt = 0;
    for (let i = 0; i < content.length; i++) {
      if (content[i] === " ") word_cnt += 1;
    }
    let time = word_cnt / 200;
    let mins = Math.floor(time);
    let sec = Math.floor((time - mins) * 60);
    return `${mins} min, ${sec} sec`;
  }
  const sanitisedRequestBody = {
    title: escape(req.body.title),
    description: escape(req.body.description),
    content: escape(req.body.content),
    timetoread: calculateTimeToRead(escape(req.body.content)),
  }
  try {
    const updatedDoc = await Blog.findOneAndUpdate({ _id: blogId }, {$set: sanitisedRequestBody} ,{ new: true });
    if(updatedDoc===null) throw new Error("Server had problem finding the document")
    res.sendStatus(200)
  } catch (err) {
    res.send(500)
    console.log(err);
  }
});

export default router;
