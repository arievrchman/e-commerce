const routes = require('express').Router();
const { createProduct, findAllProducts, findOneProducts, updatedProduct, deleteProduct } = require('../controllers/products');
const images = require('../helpers/images');

routes.post('/',
  images.multer.single('image'),
  images.sendUploadToGCS,
  createProduct);
routes.get('/', findAllProducts);
routes.get('/:id', findOneProducts);
routes.put('/:id',
  images.multer.single('image'),
  images.sendUploadToGCS,
  updatedProduct);
routes.delete('/:id', deleteProduct);

module.exports = routes;