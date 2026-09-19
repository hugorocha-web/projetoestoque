import express from 'express'

const app = express()



let produtos = [
    {
        "nome":"caderno", 
        "preço": 23,
        "estoque": 123
    }
]

app.use(express.json())


app.get('/produtos',  async (req, res) =>{
    res.send(produtos)

})


app.post('/produtos', async (req, res) => {


    let produto = req.body
    res.json(produto)
    produtos.push(produto)


})


app.listen(3000, ()=>{

    console.log('rodando na porta 3000')
})
