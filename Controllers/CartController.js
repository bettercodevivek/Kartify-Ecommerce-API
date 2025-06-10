const Cart = require('../Models/CartModel');
const Product = require('../Models/ProductModel');

const addToCart = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { productId, quantity } = req.body;

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    const existingItemIndex = cart.items.findIndex(
      item => item.product.toString() === productId
    );

    if (existingItemIndex !== -1) {
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    cart.updatedAt = new Date();

    await cart.save();

    res.status(200).json({ message: 'Product added to cart', cart });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add to cart' });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { productId } = req.body;

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    cart.items = cart.items.filter(
      item => item.product.toString() !== productId
    );

    cart.updatedAt = new Date();

    await cart.save();

    res.status(200).json({ message: 'Item removed', cart });
  } catch (err) {
    res.status(500).json({ error: 'Failed to remove item' });
  }
};

const updateCartItem = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { productId, quantity } = req.body;

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    const item = cart.items.find(
      item => item.product.toString() === productId
    );

    if (!item) {
      return res.status(404).json({ error: 'Product not found in cart' });
    }

    item.quantity = quantity;
    cart.updatedAt = new Date();

    await cart.save();

    res.status(200).json({ message: 'Cart item updated', cart });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update cart item' });
  }
};

const getCart = async (req, res) => {
  try {
    const userId = req.user.userId;

    const cart = await Cart.findOne({ user: userId }).populate('items.product');

    if (!cart) {
      return res.status(200).json({ cart: { items: [] } });
    }

    res.status(200).json({ cart });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
};

module.exports = {
  addToCart,
  removeFromCart,
  updateCartItem,
  getCart
};
