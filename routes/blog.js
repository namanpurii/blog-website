import express from "express"
const router = express.Router()

router.use(express.json()) //to parse any incoming request as JSON -> JS Object

router.get("/:blogId", (req, res) =>{
    const blogId = parseInt(req.params.blogId)
    console.log(blogId)
    res.sendStatus(200)
})

router.delete("/:blogId/delete", (req, res)=>{
    res.status(200).json({msg: `The HTTP method is: ${req.method}`})
}) 

router.put("/:blogId/edit", (req, res)=>{
    res.status(200).json({ msg: `The HTTP method is: ${req.method}` });
})

router.post("/new", (req, res) =>{
    res.sendStatus(201)
})

export default router