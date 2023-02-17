const Post = require('../../models/post')
const User = require('../../models/user')

async function create(req, res){
    try {
        const post = await Post.create(req.body)
        res.json(post)
    } catch(err) {
        res.status(400).json(err)
    }
}

async function index(req, res) {
	const posts = await Post.find({})
    res.json(posts)
}

async function show(req, res) {
	const post = await Post.findById(req.params.id)
	res.json(post)
}

async function deleteOne(req, res) {
    const post = await Post.findByIdAndDelete(req.params.id)
    res.sendStatus(204)
}

async function update(req, res) {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.json(post)
}

async function createComment(req, res){
    const post = await Post.findById(req.params.id)
    post.updateOne(comments.push(req.body))  
    Post.save()
    res.json(post)
}

async function addLike(req,res){
    const post = await Post.findById(req.params.id)
    if (!(post.likes.includes(req.user._id))){
        post.updateOne(post.likes.push(req.user._id))
        post.save()
        res.json(post)
    }
    else if(post.dislikes.includes(req.user._id)){
        post.updateOne(post.dislikes.remove(req.user._id))
        post.save()
        res.json(post)
    }
    else {
        res.json(post)
    }
}

async function addDislike(req,res){
    const post = await Post.findById(req.params.id)
    if (!(post.dislikes.includes(req.user._id))){
        post.updateOne(post.dislikes.push(req.user._id))
        post.save()
        res.json(post)
    }
    else if(post.likes.includes(req.user._id)){
        post.updateOne(post.likes.remove(req.user._id))
        post.save()
        res.json(post)
    }
    else {
        res.json(post)
    }
}



module.exports = {
    create,
    show,
    index,
    deleteOne,
    update,
    createComment,
    addLike,
    addDislike
}