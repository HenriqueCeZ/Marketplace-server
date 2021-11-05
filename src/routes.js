const express = require('express')
const router = express.Router()
const AuthController = require('./controllers/AuthController')
const UserController = require('./controllers/UserController')
const AdController = require('./controllers/AdController')
const Auth = require('./middlewares/Auth')



router.get("/ping",(req,res) =>{
    res.json({pong:true})
})

router.get('/states',UserController.getStates) // endpoint de listar estados

router.post('/user/signin', AuthController.signin)//endpoint de login
router.post('/user/signup', AuthController.signup)//endpoint de cadastro
router.get('/user/me',Auth.private, UserController.info)//endpoint de lista infor de usuário
router.put('/user/me/:id',Auth.private, UserController.editAction)//endpoint de editar infor do usuário


router.get('/categories', AdController.getCategories)//endpoint de listar categorias
router.post('/ad/add',Auth.private, AdController.addAction)//endpoint de add anuncio
router.get('/ad/list', AdController.getList)//endpoint de listar anuncio
router.get('/ad/item', AdController.getItem)//endpoint de listar informação de um  item específico
router.post('/ad/:id',Auth.private, AdController.editAction)// endpoint de editar infor de anúncio

module.exports = router