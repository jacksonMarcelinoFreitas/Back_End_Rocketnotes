const express = require("express"); 

const app = express(); 

app.get ("/message/:id/:user", (request, response) =>{
    response.send(`
    Mensagem ID: ${request.params.id}. 
    Para o usuário: ${request.params.user}.
    `);

})

app.get("/users", (request, response) => {
    const {page, limit} = request.query; 
    response.send(`Page: ${page}. Mostrar: ${limit}`);
})

const PORT = 8080;
app.listen(PORT, () => console.log(`O servidor está rodando na porta ${PORT}`));
1
/* 
O Express é um framework que permite a estruturacao de servidores 
O Nodemom faz atualizaçao do server assim que é feita alteraçao no código e salvo
Os parametros passados por URL sao mais utilizados para passar dados mais simples

- São dois recursos para a passagem de parametro: params e query
    - Param: para a definicao da rota a possagem de parametros é obrigatoria
    - Query: a passagem do parametro de faz opcional e a rota é criada independente dos parametros passados 

- Desestruturacao:
    - permite a facil extraçao/definicao do conteudo de um objeto/array
        - Forma normal: request.params.id
        - Forma destruturada: const {id} = request.params 
*/

