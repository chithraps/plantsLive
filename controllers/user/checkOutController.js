const users = require('../../models/userModel')
const products = require('../../models/productModel');
const carts = require('../../models/cartModel')

const loadCheckout = async (req, res) => {
    try {
        const user = req.session.userData;
        if (!user.is_Blocked) {
            const userId = req.session.userData._id;                     
           let totalPrice = 0;
            const userCart = await carts.findOne({ userId }).populate('items.productId')
            const count = userCart.items.length;
            userCart.items.forEach((item) => {
                totalPrice += item.productId.price * item.quantity;
            })
            console.log(totalPrice) 
            const updatedUser = await users.findOne({ _id: userId })
            const addresses = updatedUser.address;
           

            res.render('checkOut', { cart: userCart, count: count, totalPrice, addresses})
        } else {
            req.session.destroy()
            res.redirect('/')
        }
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = {
    loadCheckout
}