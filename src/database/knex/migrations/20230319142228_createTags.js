// criar tabela
exports.up = knex => knex.schema.createTable("tags", table => {
    table.increments('id');
    table.text('name').notNullable();
    table.integer('note_id').references("id").inTable("notes").onDelete("CASCADE");
    table.integer('user_id').references("id").inTable("users");
});


//deletar tabela
exports.down = knex => knex.schema.dropTable("tags");

//para rodar a migration: npx knex migrate:latest
//depois de configurado o script no package.json: npm run migrate 
