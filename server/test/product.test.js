const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const app = require('../app');
chai.use(chaiHttp);

const Product = require('../models/product');

let dummyGetProduct;
let productIdErr = '5c8f5f7f6469ca284addfd99';

describe('Endpoint testing for Products', function () {

  before(function (done) {
    let firstProduct = {
      product_name: 'first sample product name',
      catalog: 'first sample catalog',
      description: 'first sample description',
      price: 50000,
      stock: 10
    };
    let secondProduct = {
      product_name: 'second sample product name',
      catalog: 'second sample catalog',
      description: 'second sample description',
      price: 150000,
      stock: 10
    };
    Product.insertMany([firstProduct, secondProduct], (err, docs) => {
      if (!err) {
        dummyGetProduct = docs;
        done();
      } else {
        console.log(err);
      }
    });

  });

  after(function (done) {
    Product.deleteMany({}, (err) => {
      if (!err) {
        done();
      } else {
        console.log(err);
      }
    });
  });

  describe('/POST products', function () {

    describe('on success', function () {

      it('should return object with status code 201', function (done) {
        let newProduct = {
          product_name: 'The Book of Narnia',
          catalog: 'Novel',
          description: 'sample description',
          price: 50000,
          stock: 19
        };
        chai
          .request(app)
          .post('/products')
          .send(newProduct)
          .end(function (err, response) {
            expect(err).to.be.null;
            expect(response).to.have.status(201);
            expect(response).to.be.an('object');
            expect(response.body.product).to.have.property('_id');
            expect(response.body.product).to.have.property('product_name');
            expect(response.body.product).to.have.property('catalog');
            expect(response.body.product).to.have.property('description');
            expect(response.body.product).to.have.property('price');
            expect(response.body.product).to.has.property('stock');
            expect(response.body.product.product_name).to.equal(newProduct.product_name);
            expect(response.body.product.catalog).to.equal(newProduct.catalog);
            expect(response.body.product.description).to.equal(newProduct.description);
            expect(response.body.product.price).to.equal(newProduct.price);
            expect(response.body.product.stock).to.equal(newProduct.stock);
            done();
          });
      });

    });

    describe('on error', function () {

      it('should return error message product name cannot be empty with status code 400', function (done) {
        let newProduct = {
          product_name: '',
          catalog: 'sample catalog',
          description: 'sample description',
          price: 50000,
          stock: 19
        };
        chai
          .request(app)
          .post('/products')
          .send(newProduct)
          .end(function (err, response) {
            expect(response).to.have.status(400);
            expect(response.body).to.have.property('product_name');
            expect(response.body.product_name).to.equal('product name cannot be empty');
            done();
          });
      });

      it('should return error message catalog cannot be empty with status code 400', function (done) {
        let newProduct = {
          product_name: 'sample product name',
          catalog: '',
          description: 'sample description',
          price: 50000,
          stock: 19
        };
        chai
          .request(app)
          .post('/products')
          .send(newProduct)
          .end(function (err, response) {
            expect(response).to.have.status(400);
            expect(response.body).to.have.property('catalog');
            expect(response.body.catalog).to.equal('catalog cannot be empty');
            done();
          });
      });

      it('should return error message description cannot be empty with status code 400', function (done) {
        let newProduct = {
          product_name: 'sample product name',
          catalog: 'sample catalog',
          description: '',
          price: 50000,
          stock: 19
        };
        chai
          .request(app)
          .post('/products')
          .send(newProduct)
          .end(function (err, response) {
            expect(response).to.have.status(400);
            expect(response.body).to.have.property('description');
            expect(response.body.description).to.equal('description cannot be empty');
            done();
          });
      });

      it('should return error message please fill out product name, catalog and description with status code 400', function (done) {
        let newProduct = {
          product_name: '',
          catalog: '',
          description: '',
          price: 50000,
          stock: 19
        };
        chai
          .request(app)
          .post('/products')
          .send(newProduct)
          .end(function (err, response) {
            expect(response).to.have.status(400);
            expect(response.body).to.have.property('message');
            expect(response.body.message).to.equal('please fill out product name, catalog and description');
            done();
          });
      });

    });

  });

  describe('/GET products', function () {

    describe('on success', function () {
      it('should return array of products with status code 200', function (done) {
        chai
          .request(app)
          .get('/products')
          .end(function (err, response) {
            expect(err).to.be.null;
            expect(response.body).to.be.an('array');
            expect(response.body[0]).to.have.property('_id');
            expect(response.body[0]).to.have.property('product_name');
            expect(response.body[0]).to.have.property('catalog');
            expect(response.body[0]).to.have.property('description');
            expect(response.body[0]).to.have.property('price');
            expect(response.body[0]).to.have.property('stock');
            expect(response.body[0].product_name).to.equal(dummyGetProduct[0].product_name);
            expect(response.body[0].catalog).to.equal(dummyGetProduct[0].catalog);
            expect(response.body[0].description).to.equal(dummyGetProduct[0].description);
            expect(response.body[0].stock).to.equal(dummyGetProduct[0].stock);
            done();
          });
      });
    });

  });

  describe('/GET/:id products', function () {

    describe('on success', function () {
      it('should return an object with status code 200', function (done) {
        let product = {
          product_name: dummyGetProduct[1].product_name,
          catalog: dummyGetProduct[1].catalog,
          description: dummyGetProduct[1].description,
          price: dummyGetProduct[1].price,
          stock: dummyGetProduct[1].stock
        };
        let productId = dummyGetProduct[1]._id;
        chai
          .request(app)
          .get('/products/' + productId)
          .end(function (err, response) {
            expect(err).to.be.null;
            expect(response).to.be.an('object');
            expect(response.body).to.have.property('_id');
            expect(response.body).to.have.property('product_name');
            expect(response.body).to.have.property('catalog');
            expect(response.body).to.have.property('description');
            expect(response.body).to.have.property('price');
            expect(response.body).to.have.property('stock');
            expect(response.body.product_name).to.equal(product.product_name);
            expect(response.body.catalog).to.equal(product.catalog);
            expect(response.body.description).to.equal(product.description);
            expect(response.body.price).to.equal(product.price);
            expect(response.body.stock).to.equal(product.stock);
            done();
          });
      });
    });

    describe('on error', function () {
      it('should return error message product not found! with status code 404', function (done) {
        chai
          .request(app)
          .get('/products/' + productIdErr)
          .end(function (err, response) {
            expect(response).to.have.status(404);
            expect(response.body).to.have.property('message');
            expect(response.body.message).to.equal('product not found!');
            done();
          });
      });
    });
  });

  describe('/PUT/:id products', function () {

    describe('on success', function () {
      it('should return an object of updated product with status code 200', function (done) {
        // console.log(dummyGetProduct);
        let productId = dummyGetProduct[0]._id;
        let updateProduct = {
          product_name: 'The Book of Narnia',
          catalog: 'Book',
          description: 'book has been updated',
          price: 200000,
          stock: 5
        };
        chai
          .request(app)
          .put('/products/' + productId)
          .send(updateProduct)
          .end(function (err, response) {
            expect(err).to.be.null;
            expect(response.body).to.have.property('product');
            expect(response.body.product).to.have.property('_id');
            expect(response.body.product).to.have.property('product_name');
            expect(response.body.product).to.have.property('catalog');
            expect(response.body.product).to.have.property('description');
            expect(response.body.product).to.have.property('price');
            expect(response.body.product).to.have.property('stock');
            expect(response.body.product.product_name).to.equal(updateProduct.product_name);
            expect(response.body.product.catalog).to.equal(updateProduct.catalog);
            expect(response.body.product.description).to.equal(updateProduct.description);
            expect(response.body.product.price).to.equal(updateProduct.price);
            expect(response.body.product.stock).to.equal(updateProduct.stock);
            expect(response.body).to.have.property('message');
            expect(response.body.message).to.equal('product updated!');
            done();
          });
      });
    });

    describe('on error', function () {
      it('should return error message product not found with status code 404', function (done) {
        let updateProduct = {
          product_name: 'The Book of Narnia',
          catalog: 'Book',
          description: 'book has been updated',
          price: 200000,
          stock: 5
        }
        chai
          .request(app)
          .put('/products/' + productIdErr)
          .send(updateProduct)
          .end(function (err, response) {
            expect(response.body).to.have.property('message');
            expect(response.body.message).to.equal('product not found!');
            done();
          });
      });
    });
  });

  describe('/DELETE/:id products', function () {

    describe('on success', function () {
      it('should return an empty object with status code 200', function (done) {
        let productId = dummyGetProduct[1]._id;
        chai
          .request(app)
          .delete('/products/' + productId)
          .end(function (err, response) {
            expect(err).to.be.null;
            expect(response).to.have.status(200);
            expect(response.body).to.be.an('object');
            expect(response.body).to.have.property('product');
            expect(response.body.product).to.have.property('_id');
            expect(response.body.product).to.have.property('product_name');
            expect(response.body.product).to.have.property('catalog');
            expect(response.body.product).to.have.property('description');
            expect(response.body.product).to.have.property('price');
            expect(response.body.product).to.have.property('stock');
            expect(response.body).to.have.property('message');
            expect(response.body.message).to.equal('product deleted!');
            done();
          });
      });
    });

    describe('on error', function () {
      it('should return error message product not found with status code 404', function (done) {
        chai
          .request(app)
          .delete('/products/' + productIdErr)
          .end(function (err, response) {
            expect(response.body).to.have.property('message');
            expect(response.body.message).to.equal('product not found!');
            done();
          });
      });
    });

  });
  
});