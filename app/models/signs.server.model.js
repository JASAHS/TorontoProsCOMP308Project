//model for vital signs creation
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SignsSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    bodyTemp: {
        type: Number,
        default: ''
    },
    heartRate: {
        type: Number, default: '',
        trim: true
    },
    bloodPressure: {
        type: Number,
        default: ''
    },
    respiratoryRate: {
        type: Number, default: '',
        trim: true
    },
    creator: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});
mongoose.model('Signs', SignsSchema);
