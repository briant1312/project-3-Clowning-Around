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
    if(!req.query.page) {
        try {
            const posts = await Post.find({}).populate('owner')
            res.json(posts.reverse())
        } catch (err) {
            res.status(400).json(err)
        }
    } else {
        try {
            const page = (parseInt(req.query.page) || 1) - 1
            const perPage = 10
            const posts = await Post.find()
                .limit(perPage)
                .sort({ $natural: -1 })
                .skip(perPage * page)
                .populate("owner")

            res.json(posts)
        } catch (err) {
            res.status(400).json(err)
        }
    }
}

async function show(req, res) {
	try {
        const post = await Post.findById(req.params.id).populate({
            path: 'comments',
            populate: {path: 'owner'}
        }).populate('owner')
        res.json(post)
    } catch (err) {
        res.status(400).json(err)
    }
}

async function deleteOne(req, res) {
    try {
        const post = await Post.findByIdAndDelete(req.params.id)
        res.sendStatus(204)
    } catch(err) {
        res.status(400).json(err)
    }
}

async function update(req, res) {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.json(post)
    } catch (err) {
        res.status(400).json(err)
    }
}

async function createComment(req, res){
    try {
        const post = await Post.findById(req.params.id)
        post.updateOne(comments.push(req.body))  
        Post.save()
        res.json(post)
    } catch (err) {
        res.status(400).json(err)
    }
}

async function addLike(req,res){
    try {
        const post = await Post.findById(req.params.id)
        if (!(post.likes.includes(req.user._id))){
            post.updateOne(post.likes.push(req.user._id))
            if(post.dislikes.includes(req.user._id)) {
                post.updateOne(post.dislikes.remove(req.user._id))
            }
            post.save()
            res.json(post)
        } else {
            post.updateOne(post.likes.remove(req.user._id))
            post.save()
            res.json(post)
        }
    } catch (err) {
        res.status(400).json(err)
    }
}

async function addDislike(req,res){
    try {
        const post = await Post.findById(req.params.id)
        if (!(post.dislikes.includes(req.user._id))){
            post.updateOne(post.dislikes.push(req.user._id))
            if(post.likes.includes(req.user._id)) {
                post.updateOne(post.likes.remove(req.user._id))
            }
            post.save()
            res.json(post)
        } else {
            post.updateOne(post.dislikes.remove(req.user._id))
            post.save()
            res.json(post)
        }
    } catch(err) {
        res.status(400).json(err)
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
    addDislike,
}