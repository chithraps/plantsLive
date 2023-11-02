const mongoose = require('mongoose')

const wishListSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    products: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'products',
            required: true,
        }        
    },
    ],
});

const wishList = mongoose.model('wishList', wishListSchema);

module.exports = wishList;