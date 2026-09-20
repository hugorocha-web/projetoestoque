import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

const app = express()


//primeiro iniciar o mongoose
process.loadEnvFile()
mongoose.connect(process.env.MONGODB_URI)
.then(()=> console.log('banco conectado com sucesso'))
//agora conectei o bando e adicionei o then 
.catch((error)=> console.log('erro ao conectar o banco', error))

//isso cria um formato de arquivo pro banco
const produtoSchema = new mongoose.Schema({
    nome: {type: String, required: true},
    preco: {type: Number, required: true},
    estoque: {type: Number, required: true},
    categoria: {type: String, required: true},
    descrição: {type: String, required: true},
    imagem: {type: String, required: true}
}, {timestamps: true}
)

const categoriaSchema = new mongoose.Schema({
    nome: {type: String, required: true},
}, {timestamps: true}
)
const Categoria = mongoose.model('Categoria', categoriaSchema)

//criei o produto agora é mandar pra ele modelar
const Produto = mongoose.model('Produto', produtoSchema)



app.use(cors())
app.use(express.json())

app.get('/categorias', async (req, res)=>{
    let categoria = await Categoria.find()
    res.json(categoria)
})

app.post('/categorias', async (req, res)=>{
    try {
        let novacategoria= req.body
        let nova = await Categoria.create(novacategoria)
        res.json(nova)
    }
    catch(error){
        console.log(error)
    }

})

app.get('/produtos',  async (req, res) =>{
    let produtos = await Produto.find()
    res.json(produtos)

})

app.put('/produtos:id', async (req, res) => {
    



})

app.post('/produtos', async (req, res) => {


    try {
        let novoproduto= req.body
        let produtoNovo = await Produto.create(novoproduto)
        res.json(produtoNovo)
    }
    catch(error){
        console.log(error)
    }


})


app.listen(3000, ()=>{

    console.log('rodando na porta 3000')
})
