const  {checkSchema} = require('express-validator')

module.exports = {
    editAction: checkSchema({//validator de signup

        token:{
            notEmpty: true

        },


        name:{
            optional:true,
            trim: true, 
            notEmpty: true, //tem que tá preenchido
            isLength:{
                option:{
                    min: 2 //minimo de caracter 2
                },
                errorMessage:'Nome precisa ter pelo menos 2 caracteres'
            }
        },
        email:{
            optional: true,
            isEmail:true,
            normalizeEmail: true, //tira espaço e deixa tudo minúsculo pra inserir no banco
            errorMessage: 'E-mail inválido'
        },
        password: {
            optional: true,
            notEmpty: true,
            isLength:{
                min:3
            },
            errorMessage: 'Senha precisa de pelo menos  2 caracteres'
        },
        state:{
              optional: true,
              notEmpty:true,
              errorMessage: 'Estado não preenchido'  

        }
    })
    

}