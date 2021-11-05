const State = require('../models/State')
const User = require('../models/User')
const Category = require('../models/Category')
const Ad = require('../models/Ad')

module.exports = {
        getStates: async (req, res) =>{
                let states = await State.find()
                res.json({states})
        },
        info: async (req, res) =>{
           let token = req.query.token
           
           const user = await User.findOne({token})
           const state = await State.findById(user.state)
           const ads = await Ad.find({idUser: user.__id.toString()})
           
           let adList = []
            for(let i in ads){
                   const cat = await Category.findById(ads[i].Category)   
                
                  adList.push({...ads[i], category: cat.slug})   
            }    

           res.json({

                name: user.name,
                email: user.email,
                state: state.name,
                ads: adList

           })

        },
        editAction: async (req, res) =>{

        }       
     
}