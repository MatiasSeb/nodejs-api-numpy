const createError = require('http-errors');
const debug = require('debug')('app:module-products-controller');
const { productService } = require('./services');
const { Response } = require('../common/response');

module.exports.productsController = {

    getProducts: async (req, res) => {
        try {
            let products = await productService.getAll()
            Response.success(res, 200, 'Lista de productos', products)
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },

    getProductById: async (req, res) => {
        try {
            const { params: { _id } } = req;
            let product = await productsService.getById(id);
            if (!product) {
                Response.error(res, new createError.NotFound())
            } else {
                Response.success(res, 200, `Producto por ID: ${id}}`, product)
            }
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },

    createProduct: async (req, res) => {
        try {
            const { body } = req;
            if (!body || Object.keys(body).length === 0) {
                Response.error(res, new createError.BadRequest())
            } else {
                const insertedId = await productsService.create(body);
                Response.success(res, 201, "Producto insertado", insertedId);
            }
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },

    generateReport: async (req, res) => {
        try {
            productsService.generateReport('Inventario', res);
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },

    //update
    updateProduct: (req, res) => {
        try {
            const { params: { _id } } = req;
            const { body } = req;
            if (!body || Object.keys(body).length === 0) {
                Response.error(res, new createError.BadRequest())
            } else {
                const updatedId = await productsService.updateOne(id, body);
                Response.success(res, 201, "Producto actualizado", updatedId);
            }
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },



    //delete
    deleteProduct: async (req, res) => {
        try {
            const { params: { _id } } = req;
            if (!body || Object.keys(body).length === 0) {
                Response.error(res, new createError.BadRequest())
            } else {
                const deletedId = await productsService.deleteOne(id);
                Response.success(res, 201, "Producto eliminado", deletedId);
            }
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    }

}