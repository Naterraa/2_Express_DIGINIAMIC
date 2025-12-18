const mongoose = require('mongoose');

const computerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Le nom est requis'],
        trim: true
    }
}, {
    timestamps: true,
    collection: 'computers'
});

const Computer = mongoose.model('Computer', computerSchema);

module.exports = Computer;
