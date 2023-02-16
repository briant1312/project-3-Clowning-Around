const Post = require('../../models/post')
const User = require('../../models/user')
const Comment = require('../../models/comment')


function create(req, res, next){
    Post.findById(req.params.id)
        .then((post) => {
            console.log(post)
            post.comments.push(req.body)
            return post.save()
        })
        .then(() => res.sendStatus(204)
        ) .catch(next)
}


module.exports = {
    create
}