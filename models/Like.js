
const mongoose = require("../db");
const schema = new mongoose.Schema({

    isLiked: {
        desc: "is Liked",
        type: Boolean,
        default: false,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Users'
      },
      post: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Posts'
      }
}, {
    strict: true,
    versionKey: false,
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
});

module.exports = mongoose.model('Like', schema);
