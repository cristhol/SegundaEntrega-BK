const mongoose = require('mongoose');
const CartSchema = require('../models/carts.model');
const productSchema = require('../models/products.model');
const { objConfig } = require('../config/config');

class Cart {
  async connectDb() {
    return await objConfig();
  }

  async createCart() {
    try {
      await this.connectDb();
      const data = await CartSchema.create({
        products: [],
        timestamp: Date.now(),
      });
      mongoose.disconnect();
      return data;
    } catch (error) {
      throw Error(error.message);
    }
  }

  async addProductToCart(idCart, idProduct) {
    try {
      await this.connectDb();
      const idExist =  await CartSchema.findById(idCart);
      const idExistProduct = await productSchema.findById(idProduct);
      console.log(idCart, idExist);
      console.log(idProduct, idExistProduct);
      if (idExist && idExistProduct) {
        await CartSchema.updateOne({ _id: idCart }, { $push: { products: idProduct } });
        return;
      }
      mongoose.disconnect();
      throw Error('Cart or Product does not exists');
    } catch (error) {
      throw Error(error.message);
    }
  }

  async getCardById(id) {
    try {
      if (!id || typeof id !== 'string') {
        throw Error('Bad Request');
      }
      await this.connectDb();
      const card = await CartSchema.findById(id);
      mongoose.disconnect();
      return card;
    } catch (error) {
      throw Error(error.message);
    }
  }
  async deleteCartById(id) {
    try {
      if (!id || typeof id !== 'string') {
        throw Error('Bad request');
      }
      await this.connectDb();
      await CartSchema.findByIdAndRemove(id);
      mongoose.disconnect();
    } catch (error) {
      throw Error(error.message);
    }
  }
  async deleteProductCart(idCart, idProduct) {
    try {
      console.log(idCart);
      await this.connectDb();
      const cardExist = await CartSchema.findById(idCart);
      console.log(idCart, cardExist);
      if (cardExist) {
        cardExist.products.pull(idProduct);
        await cardExist.save();
        mongoose.disconnect();
        return;
      }
    } catch (error) {
      throw Error(error.message);
    }
  }
}

module.exports = Cart;