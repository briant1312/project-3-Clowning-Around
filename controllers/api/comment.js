const Post = require('../../models/post')
const User = require('../../models/user')
const Comment = require('../../models/comment')


function create(req, res, next){
    Post.findById(req.params.id)
        .then((post) => {
            post.comments.push(req.body)
            return post.save()
        })
        .then((post) => res.json(post)
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


function addLike(req,res,next){
    Post.findById(req.params.id)
        .then((post)=>{ 
            const comment = post.comments.id(req.body.id)
            if (!(comment.likes.includes(req.user._id))){
                comment.likes.push(req.user._id)
                return post.save()
            }
            else {
                res.sendStatus(204)
            }
        })
         .catch(next)
}

function addDislike(req,res,next){
    Post.findById(req.params.id)
        .then((post)=>{ 
            const comment = post.comments.id(req.body.id)
            if (!(comment.dislikes.includes(req.user._id))){
                comment.dislikes.push(req.user._id)
                return post.save()
            }
            else {
                res.sendStatus(204)
            }
        })
         .catch(next)
}

module.exports = {
    create,
    deleteOne,
    update,
    addLike,
    addDislike
}