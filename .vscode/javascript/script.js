 const email = document.querySelector('#ilogin')
 const senha = document.querySelector('#isen')
 const btentrar = document.querySelector('#ientrar')
 const formname = document.querySelector('#inome')
 const formidade = document.querySelector('#iidade')
 const formemail= document.querySelector('#iemail')
 const formendereco = document.querySelector('#iendereco')
 const formoutrasinfos = document.querySelector('#ioutras_info')
 const forminteresses = document.querySelector('#iinteresses')
 const formsentimentos = document.querySelector('#isentimentos')
 const formvalores = document.querySelector('#ivalores')
 const btgravar = document.querySelector('#btnGravar')
 
 const usuario = {
    nome:"junin@gmail.com",
    senha:123
 }
 btgravar.addEventListener("click", (event) =>{
    debugger;
    event.preventDefault() 
    criarUsuario ()
 } )
//  botão click
 btentrar.addEventListener("click" , (event)=>{
    event.preventDefault()
   
 validarCampos()
 })
//  validar o campo
function validarCampos(){

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
    window.location.href = "./homepage/home.2.html"

         window.location.href = "../homepage/home.2.html"

   }

}
// Validação do login, @ e .com no e-mail e senha.
function criarUsuario (){

    let valorFname = formname.value
    let valorFidade = formidade.value
    let valorFemail = formemail.value
    let valorFendereco = formendereco.value
    let valorFoutrasinfo = formoutrasinfos.value
    let valorFinteresses = forminteresses.value
    let valorFsentimentos = formsentimentos.value
    let valorFvalor = formvalores.value

    if ( valorFname == "" || valorFidade =="" || valorFemail == "" ){
        alert("Preencha os campos de E-mail, idade e nome!")
        formname.focus()
        formname.style.border = "3px solid red"
        formidade.style.border = "3px solid red"
        formemail.style.border = "3px solid red"
    }
 const colaborador = {
    valorFname,
     valorFidade ,
     valorFemail ,
     valorFendereco,
     valorFoutrasinfo ,
     valorFinteresses,
     valorFsentimentos ,
     valorFvalor 
    
 }
localStorage.setItem("colaboradores" , JSON.stringify(colaborador))

}
