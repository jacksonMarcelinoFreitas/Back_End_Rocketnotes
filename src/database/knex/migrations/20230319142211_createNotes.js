// criar tabela
exports.up = knex => knex.schema.createTable("notes", table => {
    table.increments('id');
    table.text('title');
    table.text('description');
    table.integer('user_id').references("id").inTable("users");
    table.timestamp('created_at').default(knex.fn.now()); 
    table.timestamp('updated_at').default(knex.fn.now()); 

});


//deletar tabela
exports.down = knex => knex.schema.dropTable("notes");

//para rodar a migration: npx knex migrate:latest
//depois de configurado o script no package.json: npm run migrate 
