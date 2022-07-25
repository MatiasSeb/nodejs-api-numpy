const express = require('express');
const debug = require('debug')('app:main');

const { Config } = require('./src/config/index');
const { productsApi } = require('./src/products/index');

const app = express();

app.use(express.json());

//Modulos
productsApi(app);

app.listen(Config.port, () => {
    debug(`Sirviendo en http://localhost:${Config.port}`);
})