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


 
 
//  Variável com informação para login
 const usuario = {
    nome:"junin@gmail.com",
    senha: 123
 }
//  Dando funcionalidade de coletar as informações do colaborador no botão gravar
 btgravar.addEventListener("click", (event) =>{
    event.preventDefault() 
     criarUsuario ()

 } )

    // Redirecionamento para página relatório 
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
async function criarUsuario (){

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
// Atribuindo os valores coletados para a variável de colaborador
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
const response = await fetch (`https://localhost:7034/api/Colaboradores`, {
   method : 'Post',
   headers : {
      'Content-Type':'application/json'
   },
   body: JSON.stringify(colaborador)
});

alert ('Usuário Criado !')

}


//  const colaboradores = JSON.parse(localStorage.getItem("colaboradores"))||[];
//  colaboradores.push(colaborador)
//  Aviso de que o usuário já está criado (consequentemente armazenado no local storage)
// localStorage.setItem("colaboradores" , JSON.stringify(colaboradores))
// alert('usuário criado')


// Comando para criar lista do colaborador ( com comando para quebrar e abreviar grandes nomes)
function criarLista (colaborador){
   const lista = document.querySelector(".lista-colaborador")
   const item = document.createElement("li")
   item.innerHTML = `<p><abbr title="${colaborador.nome}">${colaborador.nome}</abbr> </p> <p><abbr title="${colaborador.email}">${colaborador.email}</abbr> </p> <p>${colaborador.status?"ativo": "inativo"}  </p> <p>
         <button id="editar">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000" ><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
         </button>
       <button>
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000" m><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/${onclick = alert('CLicou')}></svg>
             </p>
       </button>`
   lista.appendChild(item)
}
// Comando para percorrer e pegar cada array para ser colocado na lista 
async function carregarLista(){
   // const colaboradores = JSON.parse(localStorage.getItem('colaboradores'))||[]
   var response = await fetch ("https://localhost:7034/api/Colaboradores")
   var colaboradores = await response.json()
   colaboradores.forEach(colaborador => criarLista(colaborador) );
  
}
// Comando para recarregar a lista 
async function carregar(){
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
   // Per corre cada array e verifica suas informações e conta o número de colaboradores com informações pendentes
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
// Comando de funcionalidade na barra de pesquisa 
async function pesquisarInput(){ 
   const lista = document.querySelector(".lista-colaborador")
   const response = await fetch ("https://localhost:7034/api/Colaboradores")
   const  colaboradores= await response.json()
   let valor = pesquisar.value.toLowerCase()
   lista.innerHTML=""
   colaboradores.forEach(colaborador=>{
      if(colaborador.nome.toLowerCase().includes(valor)){
         criarLista(colaborador)
      }
   })

}

// Função para imprimir a lista 
function imprimir(){
   window.print()
}
async function deletar(){
const response = await fetch('https://localhost:7034/api/Colaboradores');
if (response.status == 200){
   const obj = await(response.json());
   console.log(obj);
}
}





