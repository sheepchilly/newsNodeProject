const ProductModule = require('../../models/ProductModel')

const ProductService = {
    getList:async ()=>{
        return ProductModule.find()
    }
}

module.exports =  ProductService