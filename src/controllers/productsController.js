//Import de clase

const productManagerMongo = require('../managersDao/productManagerMongo');
const Product = new productManagerMongo(); 

module.exports = {
  createProduct: async (req, res) => {
    try {
      const data = await Product.save(req.body);
      res.status(200).send({
        status: 200,
        data,
        message: 'Product was added successfully',
      });
    } catch (error) {
      res.status(500).send({
        status: 500,
        messages: error.message,
      });
    }
  },
  getProducts: async (req, res) => {
    try {
      const data = await Product.getAll();
      res.status(200).send({
        status: 200,
        data,
        message: 'Products obtained successfully',
      });
    } catch (error) {
      res.status(500).send({
        status: 500,
        messages: error.message,
      });
    }
  },
  getProductById: async (req, res) => {
    const idProduct = req.params.id;
    try {
      const data = await Product.getById(idProduct);
      if (data) {
        res.status(200).send({
          status: 200,
          data,
          message: `Product ${idProduct} obtained successfully`
        });
      } else {
        res.status(404).send({
          status: 404,
          data,
          message: 'Product not founded',
        });
      }
    } catch (error) {
      res.status(500).send({
        status: 500,
        messages: error.message,
      });
    }
  },
  updateProductById: async (req, res) => {
    const idProduct = req.params.id;
    const product = req.body;
    try {
      const data = await Product.updateById(idProduct, product);
      res.status(200).send({
        status: 200,
        data,
        message: 'Product updated successfully',
      });
    } catch (error) {
      res.status(500).send({
        status: 500,
        messages: error.message,
      });
    }
  },
  deleteProductById: async (req, res) => {
    const idProduct = req.params.id;
    try {
      await Product.deleteById(idProduct);
      res.status(200).send({
        status: 200,
        data: {
          id: idProduct,
        },
        message: `Product ${idProduct} deleted successfully`
      });
    } catch (error) {
      res.status(500).send({
        status: 500,
        messages: error.message,
      });
    }
  },
};