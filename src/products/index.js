const express = require('express');
const router = express.Router();
const { productsController } = require('./controller')


module.exports.productsApi = (app) => {
    router
        .get('/', productsController.getProducts)
        .get('/report', productsController.generateReport)
        .get('/:id', productsController.getProductById)
        .post('/', productsController.createProduct)
        //update
        .put('/:id', productsController.updateProduct)
        //delete
        .delete('/:id', productsController.deleteProduct)



    app.use('/api/products', router)

}