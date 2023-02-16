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


module.exports = {
    create,
    deleteOne,
    update
}