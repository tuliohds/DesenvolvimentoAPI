import {promises as fs} from "fs";

/*
Baixar os arquivos Cidades.json e Estados.json do seguinte 
link (https://github.com/felipefdl/cidades-estados-brasil-json) e coloca-los 
dentro do seu projeto. O arquivo Estados.json possui uma listagem com todos 
os estados do Brasil, cada um representado por um ID. No arquivo Cidades.json 
estão listadas todas as cidades do Brasil, com seu respectivo estado representando 
pelo ID fazendo referência ao arquivo Estados.json.
*/

init();

async function init() {
  //await criandoestados();
  //await retornaQtdCidades('SP');
  await retornaEstadoComMaiorOuMenorCidades(false);
  //await retornaMaiorOuMenorNomeCidades(true);
  //await getBiggerOrSmallerNameCities(true);
  //await getBiggerOrSmallerNameCities(false);
  //await getBiggerOrSmallerCityName(true);
  //await getBiggerOrSmallerCityName(false);

}

async function criandoestados() {
    try{
        //lendo o arquivo criado
        const estados = JSON.parse(await fs.readFile("Estados.json"));
        const cidades = JSON.parse(await fs.readFile("Cidades.json"));

        for (let estado of estados) {
            const stateCities = cidades.filter((city) => city.Estado === estado.ID);
            await fs.writeFile(
                `./estados/${estado.Sigla}.json`,
                JSON.stringify(stateCities,2,4)
              );
        }

    } catch(err){
        console.log(err);
    }
}

async function retornaQtdCidades(uf) {
    const data = await fs.readFile(`./estados/${uf}.json`);
    const cities = JSON.parse(data);
    console.log(cities.length);
    return cities.length;
}

async function retornaEstadoComMaiorOuMenorCidades(more) {
    const states = JSON.parse(await fs.readFile("Estados.json"));
    const list = [];
  
    for (let state of states) {
      const count = await retornaQtdCidades(state.Sigla);
      list.push({ uf: state.Sigla, count });
    }
  
    list.sort((a, b) => {
      if (a.count < b.count) return 1;
      else if (a.count > b.count) return -1;
      else return 0;
    });
  
    const result = [];
    if (more) {
      list
        .slice(0, 5)
        .forEach((item) => result.push(item.uf + ' - ' + item.count));
    } else {
      list.slice(-5).forEach((item) => result.push(item.uf + ' - ' + item.count));
    }
  
    console.log(result);
}

async function retornaMaiorOuMenorNomeCidades(bigger) {
    const states = JSON.parse(await fs.readFile("Estados.json"));
    const result = [];
  
    for (let state of states) {
      let city;
      if (bigger) {
        city = await getBiggerName(state.Sigla);
      } else {
        city = await getSmallerName(state.Sigla);
      }
  
      result.push(city.Nome + ' - ' + state.Sigla);
    }
    console.log(result);
}

async function getBiggerName(uf) {
const cities = JSON.parse(await fs.readFile(`./estados/${uf}.json`));
let result;

cities.forEach((city) => {
    if (!result) result = city;
    else if (city.Nome.length > result.Nome.length) result = city;
    else if (
    city.Nome.length === result.Nome.length &&
    city.Nome.toLowerCase() < result.Nome.toLowerCase()
    )
    result = city;
});

return result;
}
  
async function getSmallerName(uf) {
    const cities = JSON.parse(await fs.readFile(`./estados/${uf}.json`));
    let result;
  
    cities.forEach((city) => {
      if (!result) result = city;
      else if (city.Nome.length < result.Nome.length) result = city;
      else if (
        city.Nome.length === result.Nome.length &&
        city.Nome.toLowerCase() < result.Nome.toLowerCase()
      )
        result = city;
    });
  
    return result;
}

async function getStatesWithMoreOrLessCities(more) {
    const states = JSON.parse(await fs.readFile('Estados.json'));
    const list = [];
  
    for (let state of states) {
      const count = await getCitiesCount(state.Sigla);
      list.push({ uf: state.Sigla, count });
    }
  
    list.sort((a, b) => {
      if (a.count < b.count) return 1;
      else if (a.count > b.count) return -1;
      else return 0;
    });
  
    const result = [];
    if (more) {
      list
        .slice(0, 5)
        .forEach((item) => result.push(item.uf + ' - ' + item.count));
    } else {
      list.slice(-5).forEach((item) => result.push(item.uf + ' - ' + item.count));
    }
  
    console.log(result);
}

async function getBiggerOrSmallerNameCities(bigger) {
    const states = JSON.parse(await fs.readFile('Estados.json'));
    const result = [];
  
    for (let state of states) {
      let city;
      if (bigger) {
        city = await getBiggerName(state.Sigla);
      } else {
        city = await getSmallerName(state.Sigla);
      }
  
      result.push(city.Nome + ' - ' + state.Sigla);
    }
    console.log(result);
}

async function getBiggerOrSmallerCityName(bigger) {
    const states = JSON.parse(await fs.readFile('Estados.json'));
    const list = [];
    for (let state of states) {
      let city;
      if (bigger) {
        city = await getBiggerName(state.Sigla);
      } else {
        city = await getSmallerName(state.Sigla);
      }
      list.push({ name: city.Nome, uf: state.Sigla });
    }
    const result = list.reduce((prev, current) => {
      if (bigger) {
        if (prev.name.length > current.name.length) return prev;
        else if (prev.name.length < current.name.length) return current;
        else
          return prev.name.toLowerCase() < current.name.toLowerCase()
            ? prev
            : current;
      } else {
        if (prev.name.length < current.name.length) return prev;
        else if (prev.name.length > current.name.length) return current;
        else
          return prev.name.toLowerCase() < current.name.toLowerCase()
            ? prev
            : current;
      }
    });
    console.log(result.name + ' - ' + result.uf);
}