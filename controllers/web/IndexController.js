const IndexService = require('../../services/web/IndexService')

const IndexController = {
    getList:async(req,res)=>{
        let result = await IndexService.getList()
        res.send({
            ActionType:"OK",
            data:result
        })
    }
}

module.exports = IndexController