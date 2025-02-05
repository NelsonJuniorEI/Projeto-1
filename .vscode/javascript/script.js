const email = document.querySelector('#ilogin')
const senha = document.querySelector('#isen')
const btentrar = document.querySelector('#ienter')
const formname = document.querySelector('#inome')
const formidade = document.querySelector('#iidade')
const formemail = document.querySelector('#iemail')
const formendereco = document.querySelector('#iendereco')
const formoutrasinfos = document.querySelector('#ioutras_info')
const forminteresses = document.querySelector('#iinteresses')
const formsentimentos = document.querySelector('#isentimentos')
const formvalores = document.querySelector('#ivalores')
const btgravar = document.querySelector('#btnGravar')
const botaoativo = document.querySelector('#iatividade')
const btncadastro = document.querySelector('#btnovo_colaborador')
const pesquisar = document.querySelector(".pesquisar")
const editnome = document.querySelector('#enome')
const editidade = document.querySelector('#eidade')
const editemail = document.querySelector('#eemail')
const editendereco = document.querySelector('#eendereco')
const editoutrasinfos = document.querySelector('#eoutras_info')
const editinteresses = document.querySelector('#einteresses')
const editsentimentos = document.querySelector('#esentimentos')
const editvalores = document.querySelector('#evalores')
const editstatus = document.querySelector('#eatividade')
const btnalterar = document.querySelector('.btnsalvar')





//  login infos
const usuario = {
   nome: "junin@gmail.com",
   senha: 123
}

//  botão criar usuário
btgravar.addEventListener("click", (event) => {
   event.preventDefault()
   criarUsuario()

})

// Redirecionamento relatório 
function ir() {
   window.location.href = "../form_relatoriopage/form_rel.html"
}

// validação de login
function validarCampos(event) {
   event.preventDefault()
   let valorEmail = email.value
   let valorSenha = senha.value

   if (valorEmail == "" || valorSenha == "") {
      alert("Por favor preencha os campos de E-mail e Senha")
      return;
   }
   if (!valorEmail.includes("@") || !valorEmail.endsWith(".com")) {
      alert("Por favor, utilize '@' e '.com' no seu campo de E-mail")
      return;
   }
   if (valorEmail == usuario.nome && valorSenha == usuario.senha) {

      window.location.href = "../homepage/home.html"

   } else { alert("Senha ou E-mail inválidos!") }

}
// formulário
async function criarUsuario() {
   let valorFname = formname.value
   let valorFidade = formidade.value
   let valorFemail = formemail.value
   let valorFendereco = formendereco.value
   let valorFoutrasinfo = formoutrasinfos.value
   let valorFinteresses = forminteresses.value
   let valorFsentimentos = formsentimentos.value
   let valorFvalor = formvalores.value
   let valorAtivo = botaoativo.checked ? 1 : 0
   if (valorFname == "" || valorFidade == "" || valorFemail == "") {
      alert("Preencha os campos de E-mail, idade e nome!")
      formname.focus()
      formname.style.border = "3px solid red"
      formidade.style.border = "3px solid red"
      formemail.style.border = "3px solid red"
      return
   }
   // Atribuindo os valores coletados para a variável de colaborador
   const colaborador = {
      nome: valorFname,
      idade: valorFidade,
      email: valorFemail,
      endereço: valorFendereco,
      outrasInfos: valorFoutrasinfo,
      interesses: valorFinteresses,
      sentimentos: valorFsentimentos,
      valores: valorFvalor,
      status: valorAtivo

   }

   try {

      const response = await fetch(`https://localhost:7034/api/Colaboradores`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(colaborador),
      });
      if (!response.ok) {
         const error = await response.json()
         throw new Error(error.mensage || 'Erro de cadastro')
      }
      alert('Usuário Criado !')
   } catch (error) {
      console.error('Erro ao cadastrar colaborador', error)
   }
}

// lista do colaborador
function criarLista(colaborador) {
   const lista = document.querySelector(".lista-colaborador")
   const item = document.createElement("li")
   item.innerHTML = `<p><abbr title="${colaborador.nome}">${colaborador.nome}</abbr> </p> <p><abbr title="${colaborador.email}">${colaborador.email}</abbr> </p> <p>${colaborador.status ? "Ativo" : "Inativo"}  </p> 
         <div id="btns">
            <button id="editar">
               <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000" ><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
            </button>
                   <button id="lixeira">
             <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000" m><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
                </p>
                   </button>
                    </div>`
   const btnexcluir = item.querySelector("#lixeira")
   btnexcluir.addEventListener("click", (event) => {
      event.preventDefault
      excluir(colaborador)
      item.remove()
   })

   const btneditar = item.querySelector("#editar")
   btneditar.addEventListener("click", (event) => {
      event.preventDefault
      redirecionaredit(colaborador)
   })



   lista.appendChild(item)
}
//excluir
async function excluir(colaborador) {

   try {
      const response = await fetch(`https://localhost:7034/api/Colaboradores/${colaborador.colaboradorId}`, {
         method: 'DELETE',
      });
      if (!response.ok) {
         throw new Error(error)
      }
      alert('Usuário Excluido!')
   }
   catch (error) {
      console.error('Erro ao excluir Colaborador', error)
   }
}

//editar
async function editar(event) {
   event.preventDefault()
   let url = new URL(window.location.href)
   const parametro = url.searchParams;
   let Id = Number.parseInt(parametro.get("id"))
   let colaboradorId = Id
   let nome = editnome.value
   let idade = Number.parseInt(editidade.value)
   let email = editemail.value
   let endereço = editendereco.value
   let outrasInfos = editoutrasinfos.value
   let interesses = editinteresses.value
   let sentimentos = editsentimentos.value
   let valores = editvalores.value
   let status = editstatus.checked ? 1 : 0
   const colaborador = {
      colaboradorId,
      nome,
      idade,
      email,
      endereço,
      outrasInfos,
      interesses,
      sentimentos,
      valores,
      status
   }

   try {
      const response = await fetch(`https://localhost:7034/api/Colaboradores/${Id}`, {
         method: 'PUT',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(colaborador),
      });
      if (!response.ok) {
         throw new Error(error || 'Erro de edição')
      }
      alert('Usuário Editado!')
   }
   catch (error) {
      console.error('Erro ao editar Colaborador', error)
   }
   window.location.href = "../cadastropage/cadastro.html"
}

//carrega usuário editado
async function carregaredit() {
   const url = new URL(window.location.href)
   const parametro = url.searchParams;
   let id = Number.parseInt(parametro.get("id"))

   try {
      const resposta = await fetch(`https://localhost:7034/api/Colaboradores/${id}`)
      if (!resposta.ok) {
         throw new Error(error || 'Erro de edição')
      }
      const colaborador = await resposta.json()
      editnome.value = colaborador.nome
      editidade.value = colaborador.idade
      editemail.value = colaborador.email
      editendereco.value = colaborador.endereço
      editoutrasinfos.value = colaborador.outrasInfos
      editinteresses.value = colaborador.interesses
      editsentimentos.value = colaborador.sentimentos
      editvalores.value = colaborador.valores
      editstatus.value = colaborador.status
   }
   catch (error) {
      console.error('Erro ao editar Colaborador', error)
   }
}

//redireciona para editpage
function redirecionaredit(colaborador) {
   id = colaborador.colaboradorId
   window.location.href = "../edit_page/editpage.html?id=" + id
}

async function carregarLista() {
   var response = await fetch("https://localhost:7034/api/Colaboradores/")
   var colaboradores = await response.json()
   colaboradores.forEach(colaborador => criarLista(colaborador));
}

async function carregar() {
   carregarLista()
   totalCadastro()
}

async function totalCadastro() {
   var response = await fetch("https://localhost:7034/api/Colaboradores")
   var colaboradores = await response.json()
   let pendente = 0;
   colaboradores.forEach(itens => {
      if (itens.endereço == "" || itens.outrasInfos == "" || itens.sentimentos == "" || itens.valores == "") {
         pendente = pendente + 1;
      }
   });

   const totalcolaboradores = colaboradores.length
   const colaboradortotalativo = colaboradores.filter(item => item.status == 1).length
   const totalpendentes = pendente
   const total = document.querySelector("#total")
   const vazio = document.querySelector("#pendente")
   const ativos = document.querySelector("#ativos")
   // Atribuindo valores para as devidas variáveis
   vazio.innerHTML = totalpendentes;
   total.innerHTML = totalcolaboradores;
   ativos.innerHTML = colaboradortotalativo;
}

async function pesquisarInput() {
   const lista = document.querySelector(".lista-colaborador")
   const response = await fetch("https://localhost:7034/api/Colaboradores")
   const colaboradores = await response.json()
   let valor = pesquisar.value.toLowerCase()
   lista.innerHTML = ""
   colaboradores.forEach(colaborador => {
      if (colaborador.nome.toLowerCase().includes(valor)) {
         criarLista(colaborador)
      }
   })
}

function imprimir() {
   window.print()
}

async function deletar() {
   const response = await fetch('https://localhost:7034/api/Colaboradores');
   if (response.status == 200) {
      const obj = await (response.json());
      console.log(obj);
   }
}






