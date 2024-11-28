 const email = document.querySelector('#ilogin')
 const senha = document.querySelector('#isen')
 const btentrar = document.querySelector('#ienter')
 const formname = document.querySelector('#inome')
 const formidade = document.querySelector('#iidade')
 const formemail= document.querySelector('#iemail')
 const formendereco = document.querySelector('#iendereco')
 const formoutrasinfos = document.querySelector('#ioutras_info')
 const forminteresses = document.querySelector('#iinteresses')
 const formsentimentos = document.querySelector('#isentimentos')
 const formvalores = document.querySelector('#ivalores')
 const btgravar = document.querySelector('#btnGravar')
 const botaoativo = document.querySelector('#iatividade')
 const btncadastro = document.querySelector('#btnovo_colaborador')
 const pesquisar= document.querySelector(".pesquisar")


 
 
 
 const usuario = {
    nome:"junin@gmail.com",
    senha: 123
 }
 btgravar.addEventListener("click", (event) =>{
  debugger
    event.preventDefault() 
     criarUsuario ()

 } )


 
    // Redirecionamento para página home 
function ir(){
   window.location.href="../form_relatoriopage/form_rel.html"
}
 
    // validação da entrada na página de login
function validarCampos(event){
    event.preventDefault()
    let valorEmail = email.value 
    let valorSenha = senha.value 

   if ( valorEmail == "" || valorSenha == "") {
    alert("Por favor preencha os campos de E-mail e Senha") 
    return;
   }
   if (!valorEmail.includes("@") || !valorEmail.endsWith(".com")){
    alert("Por favor, utilize '@' e '.com' no seu campo de E-mail")
    return;
   }
   if (valorEmail == usuario.nome && valorSenha == usuario.senha)
   {

         window.location.href = "../homepage/home.html"      

   } else {alert("Senha ou E-mail inválidos!")}

}
    //Criação de um usuário por meio do formulário
function criarUsuario (){
   debugger
    let valorFname = formname.value
    let valorFidade = formidade.value
    let valorFemail = formemail.value
    let valorFendereco = formendereco.value
    let valorFoutrasinfo = formoutrasinfos.value
    let valorFinteresses = forminteresses.value
    let valorFsentimentos = formsentimentos.value
    let valorFvalor = formvalores.value
    let valorAtivo =  botaoativo.checked?true:false
    

    if ( valorFname == "" || valorFidade =="" || valorFemail == "" ){
        alert("Preencha os campos de E-mail, idade e nome!")
        formname.focus()
        formname.style.border = "3px solid red"
        formidade.style.border = "3px solid red"
        formemail.style.border = "3px solid red"
        return
    }
    
 const colaborador = {
    valorFname,
     valorFidade ,
     valorFemail ,
     valorFendereco,
     valorFoutrasinfo ,
     valorFinteresses,
     valorFsentimentos ,
     valorFvalor ,
     valorAtivo
    
 }
 const colaboradores = JSON.parse(localStorage.getItem("colaboradores"))||[];
 colaboradores.push(colaborador)
 
localStorage.setItem("colaboradores" , JSON.stringify(colaboradores))
alert('usuário criado')

}
// Comando para criar lista do colaborador ( com comando para quebrar e abreviar grandes nomes)
function criarLista (colaborador){
   const lista = document.querySelector(".lista-colaborador")
   const item = document.createElement("li")
   item.innerHTML = `<p><abbr title="${colaborador.valorFname}">${colaborador.valorFname}</abbr> </p> <p><abbr title="${colaborador.valorFemail}">${colaborador.valorFemail}</abbr> </p> <p>${colaborador.valorAtivo?"ativo": "inativo"}</p>`
   lista.appendChild(item)

}
// Comando para carregar a lista 
function carregarLista(){

   const colaboradores = JSON.parse(localStorage.getItem('colaboradores'))||[]
   colaboradores.forEach(colaborador => criarLista(colaborador) );
}
function carregar(){
   carregarLista()
   totalCadastro()
}
// Comando para exibir o número de  presentes num  grupo por determinada característica 
function totalCadastro(){
   const total= document.querySelector("#total")
   const vazio= document.querySelector("#pendente")
   const ativos= document.querySelector("#ativos")
   const colaboradores =  JSON.parse(localStorage.getItem('colaboradores'))
   let numeroColaboradores= colaboradores.length
   let pendentes=0;
   // Conta o número de colaboradores com informações pendentes
   colaboradores.forEach(itens=>{
      if(itens.valorFendereco==""||itens.valorFoutrasinfo==""||itens.valorFsentimentos==""|| itens.valorFvalor==""){
         pendentes = pendentes+1; 
         
      }
         

   });
   // Atribuindo valores para as devidas variáveis 
   const cadastroAtivo=colaboradores.filter(itens=> itens.valorAtivo==true)
   let cadastrosAtivos= cadastroAtivo.length
   vazio.innerHTML=pendentes;
   total.innerHTML= numeroColaboradores;
   ativos.innerHTML= cadastrosAtivos
}

function pesquisarInput(){
   const lista = document.querySelector(".lista-colaborador")
   const  colaboradores= JSON.parse(localStorage.getItem("colaboradores"))
   let valor = pesquisar.value.toLowerCase()
   lista.innerHTML=""
   colaboradores.forEach(colaborador=>{
      if(colaborador.valorFname.toLowerCase().includes(valor)){
         criarLista(colaborador)
      }
   })

}
function imprimir(){
   window.print()
}





