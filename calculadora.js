'use strict'

const display = document.getElementById('display')
const numeros = document.querySelectorAll('[id*=tecla]') //  *= vai pegar todos os IDs que contenham 'tecla' 
const operadores = document.querySelectorAll('[id*=operador]') //  *= vai pegar todos os IDs que contenham 'operador' 

let novoNumero = true
let operador
let numeroAnterior

const operacaoPendente = () => operador != undefined

const calcular = () => {
    if (operacaoPendente()) {
        const numeroAtual = parseFloat(display.textContent.replace(',', '.'))
        novoNumero = true  // Antes de calcular ele precisa limpar a tela
        const resultado = eval(`${numeroAnterior}${operador}${numeroAtual}`)  // IF simplificado
        atualizarDisplay(resultado)
    }
}

const atualizarDisplay = (texto) => {
    if (novoNumero) {
        display.textContent = texto.toLocaleString('BR')  // Se for um novo numero, ele não vai concatenar, ele vai limpar a tela
        novoNumero = false 
    } else {
        display.textContent += texto.toLocaleString('BR') // Se não for um novo numero ele vai concatenar
    }
}

const inserirNumero = (evento) => atualizarDisplay(evento.target.textContent)
numeros.forEach(numero => numero.addEventListener('click', inserirNumero))

const selecionarOperador = (evento) => {
    if(!novoNumero) {  // Esse IF vai servir para impedir de ter duas operações seguidas
        calcular()
        novoNumero = true
        operador = evento.target.textContent // Armazenar operador
        numeroAnterior = parseFloat(display.textContent.replace(',', '.')) // Armazenar numero anterior
    }
}
operadores.forEach(operador => operador.addEventListener('click', selecionarOperador))

const ativarIgual = () => {
    calcular()
    operador = undefined // Zerar o operador
} 
document.getElementById('igual').addEventListener('click', ativarIgual)

const limparDisplay = () => {display.textContent = undefined}
document.getElementById('limparDisplay').addEventListener('click', limparDisplay)

const limparCalculo = () => {
    limparDisplay()
    operador = undefined
    novoNumero = true
    numeroAnterior = undefined
}
document.getElementById('limparCalculo').addEventListener('click', limparCalculo)

const removerUltimoNumero = () => display.textContent = display.textContent.slice(0, -1)  // Remover o ultimo numero
document.getElementById('backspace').addEventListener('click', removerUltimoNumero)

const inverterSinal = () => {
    novoNumero = true
    atualizarDisplay(display.textContent * -1)
}
document.getElementById('inverter').addEventListener('click', inverterSinal)

const existeDecimal = () => display.textContent.indexOf(',') != -1 // Procurar se tem virgula nessa string na posição diferente de -1
const existeValor = () => display.textContent.length > 0 
const inserirDecimal = () => {
    if(!existeDecimal()) {
        if(existeValor()) {
            atualizarDisplay(',')
        } else {
            atualizarDisplay('0, ')
        }
    }
}
document.getElementById('decimal').addEventListener('click', inserirDecimal)

const mapaTeclado = {
    '0'         :   'tecla0',
    '1'         :   'tecla1',
    '2'         :   'tecla2',
    '3'         :   'tecla3',
    '4'         :   'tecla4',
    '5'         :   'tecla5',
    '6'         :   'tecla6',
    '7'         :   'tecla7',
    '8'         :   'tecla8',
    '9'         :   'tecla9',
    '/'         :   'operadorDividir',
    '*'         :   'operadorMultiplicar',
    '+'         :   'operadorAdicionar',
    '-'         :   'operadorSubtrair',
    '='         :   'igual',
    'Enter'     :   'igual',
    'Backspace' :   'backspace',
    'Delete'    :   'limparDisplay',
    'Escape'    :   'limparCalculo',
    ','         :   'decimal'
}

const mapearTeclado = (evento) => {
    const tecla = evento.key
    const teclaPermitida = () => Object.keys(mapaTeclado).indexOf(tecla) != -1  // Varrer todo o objeto mapaTeclado para ver se a tecla digitada existe nesse objeto
    // O indexOf retorna -1 quando não existe e diferente de -1 quando existe
    if(teclaPermitida()) document.getElementById(mapaTeclado[tecla]).click()
}
document.addEventListener('keydown', mapearTeclado)
