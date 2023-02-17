const Post = require('../../models/post')
const User = require('../../models/user')
const Comment = require('../../models/comment')


function create(req, res, next){
    Post.findById(req.params.id)
        .then((post) => {
            post.comments.push(req.body)
            return post.save()
        })
        .then(() => res.sendStatus(204)
        ) .catch(next)
}


function deleteOne(req, res, next){
    Post.findById(req.params.id)
        .then((post) => {
           post.comments.id(req.body.id).remove()
            return post.save()
        })
        .then(() => res.sendStatus(204)
        ) .catch(next)
}

function update(req, res, next) {
    Post.findById(req.params.id)
        .then((post) => {
           const comment = post.comments.id(req.body.id)
           comment.text = req.body.text
           return post.save()
        })
        .then((post) => res.status(204).json(post)
        ) .catch(next)
}

async function addLike(req,res){
    const post = await Post.findById(req.params.id)
    if (!(post.comments.likes.includes(req.user._id))){
        return
    }
    else {
    post.updateOne(post.comments.likes.push(req.user._id))
    post.save()
    res.json(post)
    }
}

async function addDislike(req,res){
    const post = await Post.findById(req.params.id)
    if (!(post.comments.dislikes.includes(req.user._id))){
        return
    }
    else {
    post.updateOne(post.comments.dislikes.push(req.user._id))
    post.save()
    res.json(post)
    }
}

module.exports = {
    create,
    deleteOne,
    update,
    addLike,
    addDislike
}