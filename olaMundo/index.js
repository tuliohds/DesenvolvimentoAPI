//Ola Mundo utilizando o NODE, para isso basta desenvolver o código em Js
//e após no terminal digitar node index.js
//console.log("Ola mundo!");

//Segundo exemplo onde visa buscas os múltiplos de 3 e 5 ate o numero 1000
const numero = 1000;

//Voce pode testar também buscando a dinamicidade do valor utilizando 
//Argumentos pelo terminal conforme abaixo e no terminal digitando 
//node index.js (VALOR)
//const numero = parseInt(process.argv[2]);
const multiplos = [];

//Testando 
for(let i = 3; i < numero; i++){

    if((i % 3 === 0) || (i % 5 === 0)){
        //adicionando valores no array utilizando push
        multiplos.push(i);
    }
}

console.log(multiplos);