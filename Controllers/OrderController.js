const Order = require('../Models/OrderModel');
const Cart = require('../Models/CartModel');
const Product = require('../Models/ProductModel');

const placeOrder = async (req, res) => {
  try {
    const userId = req.user.userId;

    const cart = await Cart.findOne({ user: userId }).populate('items.product');

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ error: 'Cart is empty. Cannot place order.' });
    }

    // Prepare order items
    const orderItems = cart.items.map(item => ({
      product: item.product._id,
      quantity: item.quantity
    }));

    const totalAmount = cart.items.reduce((acc, item) => {
      return acc + item.product.price * item.quantity;
    }, 0);

    const order = new Order({
      user: userId,
      products: orderItems,
      totalAmount,
      status: 'pending' // default
    });

    await order.save();

    // Clear cart after order placed
    cart.items = [];
    await cart.save();

    res.status(201).json({
      message: 'Order placed successfully!',
      order
    });

  } catch (err) {
    console.error('Error placing order:', err);
    res.status(500).json({ error: 'Failed to place order' });
  }
};

const getMyOrders = async (req, res) => {
  try {
    const userId = req.user.userId;

    const orders = await Order.find({ user: userId })
      .populate('products.product')
      .sort({ createdAt: -1 });

    res.status(200).json({ orders });
  } catch (err) {
    console.error('Error fetching orders:', err);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

module.exports = {
  placeOrder,
  getMyOrders
};
