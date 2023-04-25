//Import
const {Router} = require('express');
const cartsRouter = Router();

//Imports de Controllers
const {
    createCart,
    addProductToCart,
    getCartById,
    deleteCartById,
    deleteProductCart,
  } = require('../controllers/cartsController');
  
  cartsRouter.post('/', createCart);
  
  cartsRouter.post('/:id/productos', addProductToCart);
  
  cartsRouter.get('/:id/productos', getCartById);
  
  cartsRouter.delete('/:id/productos', deleteCartById);
  
  cartsRouter.delete('/:id/productos/:idProd', deleteProductCart);

//Export routers
module.exports = cartsRouter;

