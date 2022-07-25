const { ObjectId } = require('mongodb');
const { Database } = require('../database/index');

const { productsUtils } = require('./utils');
const products = 'products'

const getAll = async () => {
    const collection = await Database(products);
    return await collection.find({}).toArray();
}

const getById = async (id) => {
    const collection = await Database(products);
    return await collection.findOne({ _id: ObjectId(id) });
}

const create = async (product) => {
    const collection = await Database(products);
    let result = await collection.insertOne(product)
    return result.insertedId;
}

const generateReport = async (name) => {
    let products = await getAll();
    productsUtils.excelGenerator(products, name, res);
}

//update
const updateProduct = async (id, product) => {
    const collection = await Database(products);
    let result = await collection.findOneAndUpdate(id, product);
    return result
}

//delete
const deleteProduct = async (id) => {

}


module.exports.productService = {
    getAll,
    getById,
    create,
    updateProduct,
    deleteProduct,
    generateReport,
}