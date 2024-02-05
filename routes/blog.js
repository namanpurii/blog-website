import express from "express"
import Blog from "../models/blog.js";

const router = express.Router()
router.use(express.json()) //to parse any incoming request as JSON -> JS Object

router.get("/new", (req, res) => {
  res.render("form");
});

router.post("/new", async (req, res) =>{
    let blog = new Blog({
        title: req.body.title,
        description: req.body.description,
        content: req.body.content,
    })
    try{
        blog = await blog.save() //saves to a collection you created in your MongoAtlas Dashboard.
        res.redirect(`http://localhost:3000/api/blog/${blog._id}`);
    } catch(err) {
        console.log(err)
        res.render("form", {blog: blog})
    }
})

router.get("/:blogId", (req, res) =>{
    const blogId = parseInt(req.params.blogId)
    // console.log(blogId)
    res.sendStatus(200)
})

router.delete("/:blogId/delete", (req, res)=>{
    res.status(200).json({msg: `The HTTP method is: ${req.method}`})
}) 

router.put("/:blogId/edit", (req, res)=>{
    res.status(200).json({ msg: `The HTTP method is: ${req.method}` });
})


export default router