const ProductModule = require("../../models/ProductModel")

const ProductService = {
    add:async({title,introduction,detail,cover,editTime})=>{
        return await ProductModule.create({
            title,introduction,detail,cover,editTime
        })
    },
    updateList:async ({title,introduction,detail,cover,editTime,_id})=>{
        if(cover){
            return await ProductModule.updateOne({_id},{title,introduction,detail,cover,editTime})
        }else{
            return await ProductModule.updateOne({_id},{title,introduction,detail,editTime})
        }
    },

    getList:async({id})=>{
        return await id? ProductModule.find({_id:id}) : ProductModule.find()
    },

    delList:async({_id})=>{
        return await ProductModule.deleteOne({_id})
    }
}

module.exports = ProductService