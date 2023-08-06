let cep = document.querySelector('#input-cep')
let localidade = document.querySelector("#input-localidade")
let uf = document.querySelector("#input-uf")
let logradouro = document.querySelector("#input-logradouro")
let bairro = document.querySelector("#input-bairro")
let ddd = document.querySelector("#input-ddd")
let regexNumeros = /^\d+$/

const btnSubmit = document.querySelector(".submit-cep").addEventListener('click', getCep)
const btnClear = document.querySelector(".clear").addEventListener('click', clearInputs)


async function getCep() {
  const cepValue = cep.value
  const url = `https://viacep.com.br/ws/${cepValue}/json/`
  const resultRegex = regexNumeros.test(cepValue)

  if(cepValue.length != 8 || resultRegex == false) {
    alert("O CEP deve conter 8 digitos, sendo eles apenas números")
    localidade.value = ""
    uf.value = ""
    logradouro.value = ""
    bairro.value = ""
    ddd.value = ""
    cep.value = ""
    cep.focus()
  } else {
    const dados = await fetch(url)
    const endereco = await dados.json() 

    if(endereco.erro == true) {
      alert("Digite um CEP válido")

      localidade.value = ""
      uf.value = ""
      logradouro.value = ""
      bairro.value = ""
      ddd.value = ""
      cep.value = ""
      cep.focus()
    } else {
      localidade.value = endereco.localidade
      uf.value = endereco.uf
      logradouro.value = endereco.logradouro
      bairro.value = endereco.bairro
      ddd.value = endereco.ddd
    }
  }
}

function clearInputs() {
  localidade.value = ""
  uf.value = ""
  logradouro.value = ""
  bairro.value = ""
  ddd.value = ""
  cep.value = ""
  cep.focus()
}
