const ProductService = require('../../services/web/ProductService')

const ProductController = {
    getList:async (req,res)=>{
        const data = await ProductService.getList()

        res.send({
            ActionType:"ok",
            data
        })
    }
}

module.exports  = ProductController