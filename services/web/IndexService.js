const IndexModule = require('../../models/IndexModel')

const IndexService = {
    getList:async()=>{
        return await IndexModule.find()
    }
}

module.exports = IndexService