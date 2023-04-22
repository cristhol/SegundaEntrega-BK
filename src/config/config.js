const { connect } = require("mongoose")
const { productsModel } = require("../models/products.model")
const { cartsModel } = require("../models/carts.model")
require('dotenv').config()
const { ordenes } = require("./ordenes")
const { orderModel } = require("../models/orders.model")


let url = `mongodb+srv://cristholzmann:wDRhWvNen2HNfUdu@cluster0.2smy7qn.mongodb.net/?retryWrites=true&w=majority`



const objConfig = {
    connectDB: async () =>{
        try {
            await connect(url)
            console.log('Base de datos conectada')
        } catch (error) {
            console.log(error)
        }
       
        // insertar las ordenes
        // let result = await orderModel.insertMany(ordenes)

         // solicitar las ordenes
        // let result = await orderModel.find({})
        // console.log(result)


        
    }    
}

module.exports = {
    objConfig
}
