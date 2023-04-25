//Import
const {Router} = require('express');
const productsRouter = Router();

const {
    getProducts,
    createProduct,
    getProductById,
    updateProductById,
    deleteProductById,
  } = require('../controllers/productsController');
  
  
  productsRouter.get('/', getProducts);
  
  productsRouter.get('/:id', getProductById);
  
  productsRouter.post('/',  createProduct);
  
  productsRouter.put('/:id', updateProductById);
  
  productsRouter.delete('/:id', deleteProductById);

//Export de routers
module.exports = productsRouter;