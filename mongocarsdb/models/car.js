var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CarSchema = new Schema(
    {
        brand: {type: String, required: true},
        model: {type: String, required: true},
        color: {type: String, required: true},
        year: {type: Number, required: true}
    }
);

// Export model:
module.exports = mongoose.model('Car', CarSchema);