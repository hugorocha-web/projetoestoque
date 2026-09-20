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
let clonecate = document.querySelector('#cate')
let colocarcate = document.querySelector('#categoriashere')
let clonenao = document.querySelector('#naotemnada')
btn1.addEventListener('click', listarProdutos)
let btncategoria = document.querySelector('.btncategorias')
btncategoria.addEventListener('click', pagcategorias)
let pagcate = document.querySelector('#pagcategorias')
let cadascate = document.querySelector("#cadascatebtn")
cadascate.addEventListener('click', addnovacate)
let btnnocacate = document.querySelector("#novacate")
let btncancelarcate = document.querySelector('#cancatebtn')
let clonepro = document.querySelector('#popup-escuroprodutos')
let popuppro = document.querySelector('#popup-produto')
let btnfa = document.querySelector('.fa-x')
btnfa.addEventListener('click', desligar)
function desligar(){
    
clonepro.style.display = 'none'
    

}
clonepro.addEventListener('click', desligar)
popuppro.addEventListener('click', (e)=>{
    
    e.stopPropagation();
})
btncancelarcate.addEventListener('click', ()=>{
    popup.style.display = "none"
})
btnnocacate.addEventListener('click', ()=>{
    popup.style.display= 'flex'
})
let popup = document.querySelector('#popup-escuronova')

function paginicio(){
    paglistarprodutos.style.display = "none"
    inicio.style.display = "block"
    pagcate.style.display = "none"
}
function paglistar(){
    inicio.style.display = "none"
    pagcate.style.display = "none"
    paglistarprodutos.style.display = "block"
    listarProdutos()
    

}
function pagcategorias(){
    console.log('aq')
    inicio.style.display = "none"
    paglistarprodutos.style.display = "none"
    pagcate.style.display = "block"

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
    btn1.classList.add('ativo')
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
            clone.addEventListener('click', async (event)=>{
                let nomeproduto = event.currentTarget.children[1].children[0].textContent
                let dados = await fetch(`http://localhost:3000/produtos/${nomeproduto}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
                let jsonhere = await dados.json()
                clonepro.querySelector('img').src = jsonhere.imagem
                clonepro.querySelector('#tituloproduto').textContent = jsonhere.nome
                let situacao;
                if(jsonhere.estoque >=1){
                    situacao = "em estoque."
                }
                else{
                    situacao = "fora de estoque."
                }
                clonepro.querySelector('#situacaoproduto').textContent = situacao
                clonepro.querySelector('#valorp').textContent = 'R$ '+jsonhere.preco
                clonepro.querySelector('#estoquepro').textContent = "Estoque: "+jsonhere.estoque
                clonepro.querySelector('#catepro').textContent = "Categoria: "+jsonhere.categoria
                clonepro.querySelector('#descricaopro').textContent = jsonhere.descrição
                clonepro.style.display = 'flex'
                
                
            })
            clone.style.display = 'flex'
            clone.querySelector('#titulopro').textContent = jsonInvertido[i].nome
            clone.querySelector('#categoriapro').textContent = jsonInvertido[i].categoria
            clone.querySelector('#precopro').textContent = "R$ " + jsonInvertido[i].preco
            clone.querySelector('#estoquepro').textContent =jsonInvertido[i].estoque
            clone.querySelector('#iconelixo').addEventListener('click', async (event) => {
                event.stopPropagation();
                let nomehere = event.currentTarget.previousElementSibling.previousElementSibling.children[0].textContent
                console.log(nomehere)
                let deletado = await fetch(`http://localhost:3000/produtos/${nomehere}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                
            }) 
                await listarProdutos()
                ultimosProdutos().then(([valor, valor2])=>{
                document.querySelector('#totalp').textContent = valor
                document.querySelector('#totalesto').textContent = valor2
            })



            })
            let situacao;
            if(jsonInvertido[i].estoque >=1){
                situacao = "em estoque."
            }
            else{
                situacao = "fora de estoque."
            }
            clone.querySelector('#situacaopro').textContent = situacao
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
            let situacao;
            if(jsonInvertido[i].estoque >=1){
                situacao = "em estoque."
            }
            else{
                situacao = "fora de estoque."
            }
            clone.querySelector('#situacaopro').textContent = situacao
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
    colocarcate.innerHTML =''

    try {
        
        let dados = await fetch('http://localhost:3000/categorias', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    let dadospro = await fetch('http://localhost:3000/produtos', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        let jsonpro = await dadospro.json()
        let json = await dados.json()
        let contador = 0;
        let select = document.querySelector('#categoria')
        for(let i = 0; i < json.length; i++){
            let clones = clonecate.cloneNode(true)
            clones.querySelector('#nomecate').textContent = json[i].nome
            for(let o = 0; o < jsonpro.length; o++){
                if(jsonpro[o].categoria ===json[i].nome){
                    contador++
                }
            }
            clones.querySelector('.fa-trash').addEventListener('click', async (event)=>{
                let nomehere = event.currentTarget.previousElementSibling.previousElementSibling.textContent
                console.log(nomehere)
                let deletado = await fetch(`http://localhost:3000/categorias/${nomehere}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                
            })
                
                
                location.reload();

                

            })
            clones.querySelector("#quantospro").textContent = contador
            contador= 0;
            clones.style.display = "grid"
            
            colocarcate.appendChild(clones)
            let op = document.createElement("option")
            op.value = json[i].nome
            op.textContent = json[i].nome
            console.log(op)
            select.appendChild(op)
            let botao = document.createElement('button')
            botao.textContent = json[i].nome
            botao.addEventListener('click', async (event)=>{
                btn1.classList.remove('ativo')
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
async function addnovacate() {
    let nomenovacate= document.querySelector('#catenova').value.toLowerCase()
    if(nomenovacate===''){
        return
    }
    console.log('ads')
    
    try{
        let enviar = await fetch('http://localhost:3000/categorias', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nome: nomenovacate,
        })
    })
        popup.style.display = 'none'
        location.reload();
        


    }
    catch(error){
        console.log(error)
    }

}
window.onload = function() {
    btn1.classList.add('ativo')
    carregarCategorias().then((valor)=>{
        document.querySelector('#totalcate').textContent = valor
    })
    paglistarprodutos.style.display = "none"
    pagcate.style.display = "none"
    ultimosProdutos().then(([valor, valor2])=>{
        document.querySelector('#totalp').textContent = valor
        document.querySelector('#totalesto').textContent = valor2
    })
    console.log(totalp, "ola")   
}