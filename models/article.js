const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
    nickname: {
        type: String,
        required: true
    },
    real_name: {
        type: String,
    },
    origin_description: {
        type: String,
    },
    superpowers: {
        type: String,
    },
    catch_phrase: {
        type: String,
    },
    image: {
        type: String,
        default: 'https://www.ncenet.com/wp-content/uploads/2020/04/no-image-png-2.png'
    }
})

module.exports = mongoose.model('Articles', articleSchema)