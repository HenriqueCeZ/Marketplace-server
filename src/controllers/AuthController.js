const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const {validationResult, matchedData} = require('express-validator')
const User = require('../models/User')
const State = require('../models/State')
module.exports = {
        signin: async (req, res) =>{

        },
        signup: async(req, res) =>{
            const errors = validationResult(req)
            if(!errors.isEmpty()){//se errors  não está vazio 
                res.json({error: errors.mapped()})//mostrar erros
                return
            }//caso não tenha error
               const user = await User.findOne({//verificar se email existe
                       email: data.email
               }) 
               if (user) {//se user true
                       res.json({
                               error:{email:{msg:'email já existe'}}
                       })
               }

               //verificando se o estado existe
               if(mongoose.Types.ObjectId.isValid(data.state)){ //verificando se o stateitemid existe
               const stateItem = await State.findById(data.state)//guardando de stado pelo Id em stateItem
               if(!stateItem){// se não tem state item
                res.json({
                       error:{name:{msg:"estado não existe"}}  
                    })
                 }    

                } else{
                        res.json({
                                error:{state:{msg: 'Código de estado inválido'}}
                        })
                }        


                const passwordHash  = await bcrypt.hash(data.password, 10)//crypto na senha do usuário

                const payload = (Date.now()+ Math.random()).toString()//gerando número aleatório e transformando para string passando para o paayload para transformar em token
                const token =  await bcrypt.hash(payload, 10)//encrypt no payload e guardando o token

                const newUser = new User({//instanciando o model com os valores passado
                        name:data.name,
                        email: data.email,
                        passwordHash,
                        token,
                        state: data.state

                })

                await newUser.save();//salvando os valores passado no database
                res.json({token});//retornando um token em json


              
        }


     
}