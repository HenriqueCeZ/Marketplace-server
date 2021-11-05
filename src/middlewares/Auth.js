const User = require('../models/User')
module.exports = {

           private: async (req, res, next) =>{ // verificando se o usuário mandou alguma coisa
            if(!req.query.token && !req.body.token){
                res.json({notallowed: true})
                return;
            }
            let token = '';
                if(req.query.token){ //verificando os valores do usuário para ver se tem campo vazio
                    token = req.query.token
                }
                if(req.body.token){
                    token = req.body.token //verificando os valores do usuário para ver se tem campo vazio
                }
                if(token == ''){ //verificando se tem campo vazio
                    res.json({notallowed: true})
                    return;
                }
                const user = await User.findOne({ // fazendo a busca para ver se os valores batem
                    token
                })

                if(!user){//se o user não receber a busca então entra no if
                    res.json({notallowed: true})
                    return;

                }
                next()

           } 





}