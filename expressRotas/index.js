import express from "express";

const app = express();
//chamando quando precisar passar JSON
app.use(express.json());

//Identifica qual Metodo foi passado
app.all("/testAll",(req,res) => {
    res.send(req.method);
});

//O uso de ? permiti que a rota responda as rotas teste e test, ou seja, sem a ultima letra
app.get("/teste?",(req,res) => {
    res.send("/teste?");
});

//O uso de + permiti que repita a ultima letra indefinidamente
app.get("/teste+",(req,res) => {
    res.send("/teste+");
});

//O uso de * permiti que qlr conteudo seja adicionado entre as palavras
app.get("/one*blue",(req,res) => {
    res.send("/one*blue");
});

//O uso de (conteudo) permiti que qlr conteudo adicionado entre as cerquilhas seja uma variação da nota
//tambem é recebido valor com JSON
app.post("/test(ing)?", (req,res) => {
    console.log(req.body);
    res.send("/test(ing)?");
});

//GET recebendo parametros e exibindo
app.get("/testParam/:id", (req,res) => {
    res.send(req.params.id);
});

//GET recebendo mais de um parametros e permitindo opcionalidade com ?
app.get("/testParam/:id/:a?", (req,res) => {
    res.send(req.params.id + " " + req.params.a);
});

//expressoes regulares tambem funcionam
app.get(/.*red$/, (req,res) => {
    res.send("/.*red$/");
});

//expressoes regulares tambem funcionam
app.get(/.*red$/, (req,res) => {
    res.send("/.*red$/");
});

//recebe valores na url e transforma em dados no formato json
//ex: http://localhost:3000/testQuery?nome=eumesmo&idade=23 
app.get("/testQuery", (req,res) => {
    res.send(req.query);
});

//Uso de NEXT
app.get("/testeMH",(req,res,next) => {
    console.log("Callback 1");
    next();
}, (req,res) => {
    console.log("Callback 2");
    res.end();
});

//Uso de NEXT com arrays
const callback1 = (req,res,next) => {
    console.log("Callback 1");
    next();
};

function callback2 (req,res,next){
    console.log("Callback 2");
    next();
};

const callback3 = (req,res) => {
    console.log("Callback 3");
    res.end();
};

app.get("/testeMHArray", [callback1,callback2,callback3] );

//O uso de route permiti uma resposta peronalizada para qualquer metodo caso desejado
app.route("/testeRoute")
    .get((req,res) => {
        res.send("/testeRoute GET");
    })
    .post((req,res) => {
        res.send("/testeRoute POST");
    })
    .delete((req,res) => {
        res.send("/testeRoute DELETE");
    });

//Inicia o servidor identificado qual numero de porta
app.listen(3000, () => {
    console.log("API started!");
});