## Baixando Dependências

As dependências necessárias ficam salvas no `package.json`. Para instalar as dependências, utilize os seguintes comandos:

- Express: `npm i express`
- Nodemon: `npm i nodemon --dev`

Após instalar o Nodemon, você precisa criar um script no `package.json`:

```json
"scripts": {
  "dev": "nodemon src/index.js"
}
```

## Metodos HTTP

Os métodos HTTP são utilizados para interagir com o servidor de diversas maneiras:

- GET: Buscar uma informação dentro do servidor.
- POST: Inserir uma informação no servidor.
- PUT: Alterar uma informação no servidor.
- PATCH: Alterar uma informação específica.
- DELETE: Deletar uma informação do servidor.

## Tipos de Parâmetro

Existem três tipos de parâmetros usados nas requisições:

1. Route Params: Servem para identificar um recurso, editá-lo ou deletá-lo. Eles são encapsulados na rota, após a barra.
   
 - /:id

2. Query Params: Utilizados para paginação ou filtragem. São passados na URL após o símbolo de interrogação. 
   
   - ?page=1, 
   - ?size=10, 
   - ?order=asc. 

3. Body Params: Usados para enviar objetos para inserção ou alteração no servidor.