let btnAdicionar = document.querySelector('.fa-plus')
let fundoPreto = document.querySelector('.po')
let btncancelar = document.querySelector('#canbtn')
let clonado = document.querySelector('#produto')
let sectionP = document.querySelector('#sectionProdutos')
let btnprodutosadd = document.querySelector('.btnprodutos')
btnprodutosadd.addEventListener('click', paglistar)

let paglistarprodutos = document.querySelector('#paglistarprodutos')
let paglista = document.querySelector('#listadeprodutos')
let inicio = document.querySelector('#inicio')
let btninicio = document.querySelector('.btniniciar')
btninicio.addEventListener('click', paginicio)
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
        console.log(json)
        for(let i = 0; i< json.length; i++){

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
        
        for(let i = 0; i < limite; i++){

            let clone = clonado.cloneNode(true)
            clone.style.display = 'flex'
            clone.querySelector('#titulopro').textContent = json[i].nome
            clone.querySelector('#categoriapro').textContent = json[i].categoria
            clone.querySelector('#precopro').textContent = "R$ " + json[i].preco
            clone.querySelector('#estoquepro').textContent =json[i].estoque
            let img = clone.querySelector('#imgpro')
            img.src = json[i].imagem
            


            sectionP.appendChild(clone)
            


        }
        return json.length;
        


    } 
    catch (error) {
        
        console.log(error)

    }



}
window.onload = function() {
  ultimosProdutos().then((valor)=>{
        document.querySelector('#totalp').textContent = valor
  })
  console.log(totalp)   

};