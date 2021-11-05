const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const modelSchema = new mongoose.Schema({
    name: String,
    category:String,
    state: String,
    images: [Object],
    dateCreated: Date,
    title: String,
    price: Number,
    priceNegotiable: Boolean,
    description: String,
    views: Number,
    status: String,
})

const modelName = 'Ad'

if(mongoose.connection && mongoose.connection.models[modelName]){
        module.exports = connection.models[modelName]
}else{
    module.exports = mongoose.model(modelName, modelSchema)
}
