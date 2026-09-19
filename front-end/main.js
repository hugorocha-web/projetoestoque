let btnAdicionar = document.querySelector('.fa-plus')
let fundoPreto = document.querySelector('.po')
let btncancelar = document.querySelector('#canbtn')
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