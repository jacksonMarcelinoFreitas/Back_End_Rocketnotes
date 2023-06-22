// criar tabela
exports.up = knex => knex.schema.createTable("links", table => {
    table.increments('id');
    table.text('url').notNullable();
    table.integer('note_id').references("id").inTable("notes").onDelete("CASCADE");
    table.timestamp('created_at').default(knex.fn.now()); 
});


//deletar tabela
exports.down = knex => knex.schema.dropTable("links");

//para rodar a migration: npx knex migrate:latest
//depois de configurado o script no package.json: npm run migrate 
