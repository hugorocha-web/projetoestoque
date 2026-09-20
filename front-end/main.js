let btnAdicionar = document.querySelector('.fa-plus')
let fundoPreto = document.querySelector('.po')
let btncancelar = document.querySelector('#canbtn')
let clonado = document.querySelector('#produto')
let sectionP = document.querySelector('#sectionProdutos')
let btnprodutosadd = document.querySelector('.btnprodutos')
btnprodutosadd.addEventListener('click', paglistar)
let btnvertodos = document.querySelector('#btnvertodos')
let paglistarprodutos = document.querySelector('#paglistarprodutos')
let paglista = document.querySelector('#listadeprodutos')
let inicio = document.querySelector('#inicio')
let btninicio = document.querySelector('.btniniciar')
btnvertodos.addEventListener('click', paglistar)
btninicio.addEventListener('click', paginicio)
let btn1 = document.querySelector('.a11')
let btns = document.querySelector('#btns')
let clonenao = document.querySelector('#naotemnada')
btn1.addEventListener('click', listarProdutos)
function paginicio(){
    paglistarprodutos.style.display = "none"
    inicio.style.display = "block"
}
function paglistar(){
    inicio.style.display = "none"
    paglistarprodutos.style.display = "block"
    listarProdutos()
    

}
btncancelar.addEventListener('click', ()=>{

    if(fundoPreto.classList.contains('ligado')){
        fundoPreto.classList.remove('ligado')
    }
})

btnAdicionar.addEventListener('click', ()=>{
    console.log('aq')
    console.log(fundoPreto)
    fundoPreto.classList.toggle('ligado')



})

let btncadastrar = document.querySelector('#cadasbtn')
btncadastrar.addEventListener('click', criarProduto)
async function criarProduto() {
    let nome = document.querySelector('#nomep').value
    
    let preco = document.querySelector('#precop').value

    let estoque = document.querySelector('#catep').value

    let categoria = document.querySelector('#categoria').value

    let descrição = document.querySelector('#descp').value

    let imagem = document.querySelector('#imgp').value

    if(nome === '' || preco === '' || estoque === '' || categoria === '' || descrição === '' || imagem === ''){
        return
    }
    try {
        
        let enviar = await fetch('http://localhost:3000/produtos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nome: nome,
            preco: preco,
            estoque: estoque,
            categoria: categoria,
            descrição: descrição,
            imagem: imagem
        })
    })
        if(fundoPreto.classList.contains('ligado')){
            fundoPreto.classList.remove('ligado')
        }
        listarProdutos()
        carregarCategorias().then((valor)=>{
        document.querySelector('#totalcate').textContent = valor
        })
        ultimosProdutos().then(([valor, valor2])=>{
            document.querySelector('#totalp').textContent = valor
            document.querySelector('#totalesto').textContent = valor2
        })


    } 
    catch (error) {
        
        console.log(error)
        

    }
    



}

async function listarProdutos() {
    paglista.textContent = ''
    try {
        
        let dados = await fetch('http://localhost:3000/produtos', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        let json = await dados.json()
        let jsonInvertido = [...json].reverse(); 
        console.log(json)
        for(let i = 0; i< json.length; i++){

            let clone = clonado.cloneNode(true)
            console.log(clone)
            clone.style.display = 'flex'
            clone.querySelector('#titulopro').textContent = jsonInvertido[i].nome
            clone.querySelector('#categoriapro').textContent = jsonInvertido[i].categoria
            clone.querySelector('#precopro').textContent = "R$ " + jsonInvertido[i].preco
            clone.querySelector('#estoquepro').textContent =jsonInvertido[i].estoque
            let img = clone.querySelector('#imgpro')
            img.src = jsonInvertido[i].imagem
            


            paglista.appendChild(clone)


        }


    } 
    catch (error) {
        
        console.log(error)

    }



}
async function ultimosProdutos() {
    sectionP.textContent = ''
    try {
        
        let dados = await fetch('http://localhost:3000/produtos', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        let json = await dados.json()
        let limite = Math.min(json.length, 4)
        console.log(limite)
        let cont=0;
        console.log(json)
        let jsonInvertido = [...json].reverse(); 
        console.log(jsonInvertido)
        for(let i = 0; i < json.length; i++){
            if(json[i].estoque >= 1){
                console.log(json[i].nome)
                cont++
            }
        }
        for(let i = 0; i < limite; i++){
            
            let clone = clonado.cloneNode(true)
            clone.style.display = 'flex'
            clone.querySelector('#titulopro').textContent = jsonInvertido[i].nome
            clone.querySelector('#categoriapro').textContent = jsonInvertido[i].categoria
            clone.querySelector('#precopro').textContent = "R$ " + jsonInvertido[i].preco
            clone.querySelector('#estoquepro').textContent =jsonInvertido[i].estoque
            let img = clone.querySelector('#imgpro')
            img.src = jsonInvertido[i].imagem
            


            sectionP.appendChild(clone)
            


        }
        return [json.length, cont];
        


    } 
    catch (error) {
        
        console.log(error)

    }



}
async function carregarCategorias() {
    try {
        
        let dados = await fetch('http://localhost:3000/categorias', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        let json = await dados.json()
        let select = document.querySelector('#categoria')
        for(let i = 0; i < json.length; i++){
            let op = document.createElement("option")
            op.value = json[i].nome
            op.textContent = json[i].nome
            console.log(op)
            select.appendChild(op)
            let botao = document.createElement('button')
            botao.textContent = json[i].nome
            botao.addEventListener('click', async (event)=>{
                paglista.textContent = ''
                try {
                    
                    let dados = await fetch('http://localhost:3000/produtos', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })
                    let json = await dados.json()
                    console.log(json)
                    let cont = 0;
                    for(let i = 0; i< json.length; i++){
                        if(json[i].categoria ===event.target.textContent){
                            cont++

                            let clone = clonado.cloneNode(true)
                            console.log(clone)
                            clone.style.display = 'flex'
                            clone.querySelector('#titulopro').textContent = json[i].nome
                            clone.querySelector('#categoriapro').textContent = json[i].categoria
                            clone.querySelector('#precopro').textContent = "R$ " + json[i].preco
                            clone.querySelector('#estoquepro').textContent =json[i].estoque
                            let img = clone.querySelector('#imgpro')
                            img.src = json[i].imagem
                            


                            paglista.appendChild(clone)
                            
                           
                        }
                        
                    }
                    if(!cont >=1){
                        let clone = clonenao.cloneNode(true)
                        clone.style.display = "block"
                        paglista.appendChild(clone)
                    }
                    


                } 
                catch (error) {
                    
                    console.log(error)

                }



            }
            )
            btns.appendChild(botao)
            
            


        }
        console.log(select)
        return json.length
        


    } 
    catch (error) {
        
        console.log(error)

    }


}
window.onload = function() {
    carregarCategorias().then((valor)=>{
        document.querySelector('#totalcate').textContent = valor
    })
    paglistarprodutos.style.display = "none"
    ultimosProdutos().then(([valor, valor2])=>{
        document.querySelector('#totalp').textContent = valor
        document.querySelector('#totalesto').textContent = valor2
    })
    console.log(totalp, "ola")   

};