const {validationResult, matchedData} = require('express-validator')

module.exports = {
        signin: async (req, res) =>{

        },
        signup: async(req, res) =>{
            const errors = validationResult(req)
            if(!errors.isEmpty()){//se errors  não está vazio 
                res.json({error: errors.mapped()})
                return
            }
              res.json({tudocerto:true})  
        }
     
}