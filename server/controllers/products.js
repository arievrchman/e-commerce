const Product = require('../models/product');

module.exports = {
  createProduct(req, res) {
    let img;
    if (req.file) {
      img = req.file.cloudStoragePublicUrl;
    } else {
      img = process.env.NF;
    }
    let newProduct = {
      product_name: req.body.product_name,
      catalog: req.body.catalog,
      description: req.body.description,
      price: req.body.price,
      stock: req.body.stock,
      product_image: img
    };
    Product
      .create(newProduct)
      .then(product => {
        res.status(201).json({
          product,
          message: 'product created'
        });
      })
      .catch(err => {
        let error = err.errors;
        let objError = {};
        if (error.hasOwnProperty('product_name') && error.hasOwnProperty('catalog') && error.hasOwnProperty('description')) {
          res.status(400).json({ message: 'please fill out product name, catalog and description' })
        } else if (error.hasOwnProperty('product_name') || error.hasOwnProperty('catalog') || error.hasOwnProperty('description')) {
          for (const key in error) {
            if (error[key]) {
              objError[key] = error[key].message
            }
          };
          res.status(400).json(objError);
        } else {
          res.status(500).json(err);
        }
      });
  },
  findAllProducts(req, res) {
    Product
      .find({})
      .sort({ created_at: 'desc' })
      .then(products => {
        res.json(products);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  },
  findOneProducts(req, res) {
    Product
      .findById(req.params.id)
      .then(product => {
        if (product) {
          res.status(200).json(product);
        } else {
          res.status(404).json({ message: 'product not found!' });
        }
      })
      .catch(err => {
        res.status(500).json(err);
      })
  },
  updatedProduct(req, res) {
    console.log(req.body);
    let img;
    if (req.file) {
      img = req.file.cloudStoragePublicUrl;
    } else {
      img = process.env.NF;
    }
    let updateProduct = {
      product_name: req.body.product_name,
      catalog: req.body.catalog,
      description: req.body.description,
      price: req.body.price,
      stock: req.body.stock,
      product_image: img
    };
    return Product
      .updateOne(
        { _id: req.params.id }, updateProduct,
        { runValidators: true })
      .then(() => {
        return Product.findById(req.params.id)
      })
      .then(product => {
        if (product) {
          res.status(200).json({
            product,
            message: 'product updated!'
          });
        } else {
          res.status(404).json({ message: 'product not found!' });
        }
      })
      .catch(err => {
        res.status(500).json(err.errors);
      });
  },
  deleteProduct(req, res) {
    Product
      .findByIdAndDelete(req.params.id)
      .then(product => {
        if (product) {
          res.status(200).json({
            product,
            message: 'product deleted!'
          });
        } else {
          res.status(404).json({ message: 'product not found!' });
        }
      })
      .catch(err => {
        res.status(500).json(err);
      });
  }
};
