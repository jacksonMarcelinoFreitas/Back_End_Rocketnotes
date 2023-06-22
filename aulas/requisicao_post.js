const express = require("express"); 
const app = express(); 

app.use(express.json());

app.post("/users", (request, response) => {
    const { name, email, telefone } = request.body;
    // response.send(`Email ${email} Nome ${name} Telefone ${telefone}`);
    response.json({name, email, telefone});
})

const PORT = 8080;
app.listen(PORT, () => console.log(`O servidor está rodando na porta ${PORT}`));


/*
    O navegador por padrão só faz requisiçoes do tipo GET
    Para utilzar os outros métodos é necessário uma ferramenta como o insomnia

    Requisiçao POST
        - os parametros passados estarão em: request.body
        - geralmente para cadastrar

        - formato do post:
            - diversos formatos
            - necessário especificar qual o formato: app.use(express.json());
            - JSON: {"chave":"valor"}

        - formato de resposta:
            - JSON: response.json()
            - send: response.send
                - neste ele vai como html

*/

