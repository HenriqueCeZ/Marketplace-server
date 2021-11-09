const { v4: uuid } = require('uuid');
const jimp = require('jimp')
const Category = require("../models/Category")
const User = require("../models/User")
const Ad = require("../models/Ad")

const addImage = async (buffer) =>{
        let newName = `${uuid()}.jpg` //gerando um uuid para por na imagem
        let tmpImg = await jimp.read(buffer)//lendo o buffer com o jimp
        tmpImg.cover(500,500).quality(80).write(`./public/media/${newName}`) //.cover redimensiona a imagem em 500 por 500    .quality qualidade da imagem e umw write pra salvar a imagem   
        return newName 
}


module.exports = {
        getCategories: async (req, res) =>{
                const cats = await Category.find()//busca de category, retorna o name e o slug de todas categorias

                let categories = []

                for(let i in cats){
                        categories.push({ //push em json em um vetor com cats na posição i e o slug
                                ...cats[i].doc,
                                img:`${process.env.BASE}/assets/images/${cats[i].slug}.png`
                        })
                }
                res.json({categories})
        },
        addAction: async (req, res) =>{
                let {title, price, priceneg, desc, cat, token} = req.body
                const user = await User.findOne({token}).exec()

                if(!title || !cat){
                        res.json({error: "Titulo e/ou categoria não foram preenchido"})
                        return

                }
                if(price){
                        price = price.replace('.','').replace(',','.').replace('R$','')//TIRANDO O . DOS MILHARES TIRANDO A VIRGURA E SUBSTITUINDO POR PONTO E TIRANDO O R$
                        price = parseFloat(price)
                }else{
                        price = 0
                }
                const newAd = new Ad()
                newAd.status = true
                newAd.idUser = user._id
                newAd.state = user.state
                newAd.dateCreated = new Date()
                newAd.title = title
                newAd.category = cat
                newAd.price = price
                newAd.priceNegotiable = (priceneg == 'true')? true: false
                newAd.description = desc
                newAd.view = 0

                if(req.files && req.files.img){//verifando se mandou imagem
                        if(req.files.img.length == undefined){//verificando se é apenas uma imagem se for entra no if
                                if(['image/jpeg', 'image/jpg','image/png'].includes(req.files.img[i].mimetype)){
                                        let url = await addImage(req.files.img[i].data)
                                        newAd.images.push({
                                                url,
                                                default: false 
                                        }) 
                                }

                        }else{//se for mais de uma imagem então
                                for(let i=0; i< req.files.img.length;i++){
                                        if(['image/jpeg', 'image/jpg','image/png'].includes(req.files.img[i].mimetype)){//verficando o type da imagem
                                                let url = await addImage(req.files.img[i].data) //add
                                                newAd.images.push({
                                                        url,
                                                        default: false 
                                                }) 
                                        }
                                }
                        }
                }
                if(newAd.images.length > 0){
                        newAd.images[0].default = true
                }
                const info = await newAd.save()
                res.json({id: info._id})

        },
        getList: async (req, res) =>{

        },
        getItem: async(req, res) =>{

        },
        editAction:async(req, res) =>{

        },
     
}