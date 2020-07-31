import {promises as fs} from "fs";

writeReadJson();

async function writeReadJson() {
    try{
        //escrevendo valores iniciais
        const arrayLivros = ["Hamlet","Bilhoes e Bilhoes","Viagem ate Marte"];
        const obj = {
            livros: arrayLivros
        };
        await fs.writeFile("testecriado.json", JSON.stringify(obj));

        //lendo o arquivo criado
        const data = JSON.parse(await fs.readFile("testecriado.json"));

        //adicionando um conteudo no array
        data.livros.push("O codigo da vinci");

        //sobreescrevendo o arquivo com o conteudo modificado
        await fs.writeFile("testecriado.json", JSON.stringify(data));
    } catch(err){
        console.log(err);
    }
}

