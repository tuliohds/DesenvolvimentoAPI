//Utilizando módulos padrões do node, nesse caso o File System que trabalha com documentos

//import fs from "fs";

/*
//Para Criar um documento(utilizando callbacks):

fs.writeFile("testecriado.txt", "um conteúdo qualquer", function(err){
    if(err){
        console.log(err);
    } else{
        console.log("arquivo escrito com sucesso");
    }
});

*/

/* 
//Para ler um documento(utilizando callbacks):

fs.readFile("testecriado.txt", "utf-8", function(err, data){
    if(err){
        console.log(err);
    } else{
        console.log(data);
    }
});
*/

/* 
//Concatenar um conteúdo em um documento já com conteúdo e depois ler o arquivo(utilizando callbacks):

fs.appendFile("testecriado.txt", " mais um conteúdo", function(err) {
    if(err){
        console.log(err);
    } else{
        fs.readFile("testecriado.txt", "utf-8", function(err, data){
            if(err){
                console.log(err);
            } else{
                console.log(data);
            }
        })
    }
});
*/

/*
//Por definição o Js é assíncrono, porem é possível forçar a sincronia utilizando Sync
//Apesar de parecer mais simples, não é recomendado seu uso já que uns dos trunfos do Js
//é justamente sua assincronia.

try{
    fs.writeFileSync("testecriado.txt", "um conteúdo qualquer síncrono");
    const data = fs.readFileSync("testecriado.txt", "utf-8");
    console.log(data);
} catch(err){
    console.console.log(err);
}
*/

/*
Ultima forma e mais indicada de utilização é através de promises e assincronia, conforme abaixo:
*/
import {promises as fs} from "fs";

init();

async function init() {
    try{
        await fs.writeFile("testecriado.txt", "um conteúdo qualquer síncrono");
        await fs.appendFile("testecriado.txt","\nmais um conteúdo");
        const data = await fs.readFile("testecriado.txt", "utf-8");
        console.log(data);
    } catch(err){
        console.log(err);
    }
}