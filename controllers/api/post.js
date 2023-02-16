const Post = require('../../models/post')
const user = require('../../models/user')

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


module.exports = {
    create,
    show,
    index,
    deleteOne,
    update
}