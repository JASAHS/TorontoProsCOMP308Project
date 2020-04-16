//model for storing tips
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TipsSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    tip: {
        type: String,
        default: ''
    }
});
mongoose.model('Tips', TipsSchema);