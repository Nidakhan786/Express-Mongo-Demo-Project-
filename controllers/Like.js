const Like = require('../models/Like');
const Post = require('../models/Posts');
// Create  a new post
exports.create = (req, res) => {
    // Validate request
    if (!req.body.post || !req.body.user) {
        return res.status(400).send({
            message: "Required field can not be empty"
        });
    }

    // Create a Like
   var postid = req.body.post;
    const like = new Like({
        post: req.body.post,
        isLiked: req.body.isLiked,
        user: req.body.user,
    });
    like.save().then(data => {
    Post.findById(postid).then(response => {response.likes=data.id; response.save();})
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Post."
        });
    });
};