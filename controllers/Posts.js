const Post = require('../models/Posts');
// Create  a new post
exports.create = (req, res) => {
    // Validate request
    if (!req.body.content || !req.body.user) {
        return res.status(400).send({
            message: "Required field can not be empty"
        });
    }

    // Create a Post
    const user = new Post({
        content: req.body.content,
        isActive: req.body.isActive,
        user: req.body.user,
    });
    user.save().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Post."
        });
    });

};
//find all posts
exports.findAll = (req, res) => {
    Post.find().populate('user')
        .then(posts => {
            res.status(200).send(posts);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Error Occured"
            });
        });
};
//find post by user id
exports.findAllPostsByUser = (req, res) => {
    Post.find({ user: req.params.id }).populate('user')
        .then(post => {
            if (!post) {
                return res.status(404).send({
                    message: "posts not found with id " + req.body.user
                });
            }
            res.status(200).send([post]);
            console.log(post);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "posts not found with id "
                });
            }
            return res.status(500).send({
                message: "Error retrieving user with id "
            });
        });
};

//update post
exports.UpdatePost = (req, res) => {
    if ((!req.body.content || !req.body.user)) {
        res.status(400).send({
            message: "required fields cannot be empty"
        });
    }
    Post.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(post => {
        if (!post) {
            return res.status(404).send({
                message: "no posts found"
            })
        }
        res.status(200).send(post);
    }).catch(err => {
        return res.status(404).send({
            message: "error while updating the post"
        })
    })
}

//find post by postid
exports.getSinglePost = (req, res) => {
    Post.findById(req.params.id).then(post => {
        if (!post) {
            return res.status(404).send({
                message: "No post found with this id "
            })
        }
        res.status(200).send(post);
    })
}

// Delete a post with the specified id in the request
exports.delete = (req, res) => {
    Post.findByIdAndRemove(req.params.id)
        .then(post => {
            if (!post) {
                return res.status(404).send({
                    message: "post not found "
                });
            }
            res.send({ message: "post deleted successfully!" });
        }).catch(err => {
            return res.status(500).send({
                message: "Could not delete post "
            });
        });
};
exports.SortAllPostsByID =(req, res) => {
    // console.log("its running")
    // return  res.JSON({message: "hiii "})
    Post.find().populate('user').sort({'content':-1})
    .then(posts => {
        res.status(200).send(posts);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error Occured"
        });
    });

    
};