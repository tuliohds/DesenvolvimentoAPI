//Modulo para emitir e escutor eventos
import ev from "./events.js";

ev.on("testEvent", () => {
    console.log("Ouviu tambem");
});

ev.emit("testEvent","conteudo conteudo");

