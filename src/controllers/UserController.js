const State = require('../models/State')
const User = require('../models/User')
const Category = require('../models/Category')
const Ad = require('../models/Ad')
const {validationResult, matchedData} = require('express-validator')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
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
                const errors = validationResult(req)
                if(!errors.isEmpty()){//verificando se tem algum error no  campo ou se está vazio atraves de errors 
                        res.json({error: errors.mapped()})
                        return
                }
                const data  = matchedData(req)
                const user = await User.findOne({token: data.token})

                let updates = {}
                
                if(data.name){
                        updates.name = data.name;    
                }
                if(data.email){
                        const emailCheck = await User.findOne({email: data.email})
                        if(emailCheck){
                                res.json({error:'E-mail já existente!'})
                                return
                        }
                        updates.email = data.email              
                }
                if(data.state){
                        if(mongoose.Types.ObjectId.isValid(date.state)){
                        const stateCheck = await State.findById(date.state)
                        if(!stateCheck){
                                res.json({error: 'Estado não existe'})
                                return  
                        }
                        updates.state = data.state
                }
        }
                if(data.password){
                        updates.passwordHash = await bcrypt.hash(data.passwordHash,10)

                }

                await User.findOneAndUpdate({token: data.token}, {$set: updates})
                res.json({})
        }       
     
}