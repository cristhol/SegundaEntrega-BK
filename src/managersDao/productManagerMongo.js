const mongoose = require('mongoose');
const productSchema = require('../models/products.model')
const { objConfig } = require("../config/config")

class Product {
  async connectDb() {
    return await objConfig();
  }

  async save(product) {
    try {
      if (!product || typeof product !== 'object') {
        throw Error('You should add an object');
      }
      if (Object.keys(product).length === 0) {
        throw Error("You can't add an empty object");
      }
      await this.connectDb();
      const data = await productSchema.create({ ...product, timestamp: Date.now() });
      
      return data;
    } catch (error) {
      throw Error(error.message);
    }
  }

  async getById(id) {
    try {
      if (!id || typeof id !== 'string') {
        throw Error('Bad Request');
      }
      await this.connectDb();
      const product = await productSchema.findById(id);
      
      return product;
    } catch (error) {
      throw Error(error.message);
    }
  }

  async updateById(id, newProduct) {
    try {
      if (!id || typeof id !== 'string') {
        throw Error('Bad Request');
      }
      await this.connectDb();
      await productSchema.findByIdAndUpdate(id, newProduct);
      
    } catch (error) {
      throw Error(error.message);
    }
  }

  async getAll() {
    try {
      await this.connectDb();
      const products = await productSchema.find({});
      
      return products;
    } catch (error) {
      throw Error(error.message);
    }
  }

  async deleteById(id) {
    try {
      if (!id || typeof id !== 'string') {
        throw Error('Bad request');
      }
      await this.connectDb();
      await productSchema.findByIdAndRemove(id);
      
    } catch (error) {
      throw Error(error.message);
    }
  }
}

module.exports = Product;