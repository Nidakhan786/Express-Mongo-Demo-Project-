
const mongoose = require("../db");
const schema = new mongoose.Schema({
    content: {
        desc: "The post content",
        type: String,
        required: true
    },  
    isActive: {
        desc: "is Active.",
        type: Boolean,
        default: true,
        required: true
    },
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Users'
      }
}, {
    strict: true,
    versionKey: false,
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
});

module.exports = mongoose.model('Posts', schema);
